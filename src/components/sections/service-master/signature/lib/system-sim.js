"use client";

/**
 * A discrete-event simulator for a small service topology.
 *
 * Requests are objects with a real lifetime. They arrive on a Poisson process,
 * wait in per-service queues, occupy a concurrency slot for a sampled service
 * time, and record a span at each hop. Nothing is tweened: when the graph shows
 * a queue backing up it is because there are more request objects in an array
 * than there are slots to run them, and the p99 climbs because the samples in
 * the latency window got worse.
 *
 * That distinction is the whole reason to build it. An animation can show you a
 * queue. Only a simulation lets you kill a node and watch the retry storm it
 * causes make the outage worse, and then watch a circuit breaker turn that
 * back into a fast, cheap failure.
 *
 * The model is the standard one: each service is a multi-server queue (M/M/c),
 * so utilisation, queue depth, and wait time relate the way Little's Law says
 * they should. Push arrivals past aggregate capacity and latency does not
 * degrade linearly, it goes to the moon. Which is exactly the lesson.
 */

/* ── topology ────────────────────────────────────────────────────────────── */

export const NODES = [
  {
    id: "gateway",
    name: "API gateway",
    layer: "Integration",
    concurrency: 64,
    serviceMs: 3,
    detail: "Auth, rate limit, routing",
  },
  {
    id: "orders",
    name: "Order service",
    layer: "Domain",
    concurrency: 24,
    serviceMs: 16,
    detail: "Lifecycle rules, entitlements",
  },
  {
    id: "pricing",
    name: "Pricing engine",
    layer: "Domain",
    concurrency: 10,
    serviceMs: 28,
    detail: "Contract rates, surcharges",
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    layer: "Data",
    concurrency: 8,
    serviceMs: 9,
    detail: "Primary, synchronous commit",
  },
];

export const PATH = ["gateway", "orders", "pricing", "postgres"];

export const DEFAULTS = {
  rps: 120,
  retries: 2,
  queueLimit: 200, // bulkhead: per-node queue ceiling before shedding
  breaker: false,
  bulkhead: false,
  down: null,
};

/* ── sampling ────────────────────────────────────────────────────────────── */

/** Exponential service times, the memoryless assumption behind M/M/c. */
function sampleService(mean) {
  return -Math.log(1 - Math.random()) * mean;
}

/** Poisson arrivals: the count in a window of `dt` at rate `rps`. */
function samplePoisson(lambda) {
  if (lambda <= 0) return 0;
  // Knuth. Fine at these rates; a normal approximation would be needed well
  // above lambda ≈ 30 per step, which this never reaches at 20 steps/second.
  const limit = Math.exp(-lambda);
  let k = 0;
  let product = Math.random();
  while (product > limit) {
    k += 1;
    product *= Math.random();
  }
  return k;
}

/* ── state ───────────────────────────────────────────────────────────────── */

export function createSystem(config = {}) {
  return {
    config: { ...DEFAULTS, ...config },
    now: 0,
    nextId: 1,
    nodes: Object.fromEntries(
      NODES.map((node) => [
        node.id,
        { ...node, queue: [], running: [], completed: 0, rejected: 0, errors: 0 },
      ])
    ),
    // Latency samples, newest last. Bounded so percentiles reflect the recent
    // past rather than everything since the page loaded.
    samples: [],
    traces: [],
    counters: { arrived: 0, completed: 0, failed: 0, shed: 0, retried: 0, shortCircuited: 0 },
    breaker: { state: "closed", openedAt: 0, failures: 0, successes: 0, probes: 0 },
    history: [],
  };
}

/* ── circuit breaker ─────────────────────────────────────────────────────── */

const BREAKER = {
  failureThreshold: 8, // consecutive-ish failures in the rolling count
  cooldownMs: 2500,
  probeSuccessesToClose: 4,
};

function updateBreaker(state, dt) {
  const b = state.breaker;
  if (!state.config.breaker) {
    // Turning it off mid-run must not leave a latched-open breaker behind.
    if (b.state !== "closed") Object.assign(b, { state: "closed", failures: 0, successes: 0 });
    return;
  }

  if (b.state === "open" && state.now - b.openedAt >= BREAKER.cooldownMs) {
    b.state = "half-open";
    b.successes = 0;
    b.probes = 0;
  }
  if (b.state === "closed" && b.failures >= BREAKER.failureThreshold) {
    b.state = "open";
    b.openedAt = state.now;
    b.failures = 0;
  }
  if (b.state === "half-open" && b.successes >= BREAKER.probeSuccessesToClose) {
    b.state = "closed";
    b.failures = 0;
  }
  // Failures decay so a long-past blip cannot trip the breaker later.
  b.failures = Math.max(0, b.failures - dt * 0.002);
}

/**
 * Should this request be let through?
 *
 * Open: no, fail immediately and cheaply, which is the entire value. Half-open
 * lets a trickle through to find out whether the dependency recovered.
 */
function breakerAllows(state) {
  const b = state.breaker;
  if (!state.config.breaker || b.state === "closed") return true;
  if (b.state === "open") return false;
  b.probes += 1;
  return b.probes % 4 === 0;
}

/* ── the step ────────────────────────────────────────────────────────────── */

/**
 * Advance the simulation by `dt` milliseconds of simulated time.
 *
 * Mutates and returns the same state object. That is a deliberate choice: at a
 * few hundred live request objects per step, cloning the world every frame
 * would spend more time in the allocator than in the model.
 */
export function step(state, dt) {
  const { config } = state;
  state.now += dt;

  updateBreaker(state, dt);

  /* ── arrivals ── */
  const arrivals = samplePoisson((config.rps * dt) / 1000);
  for (let i = 0; i < arrivals; i += 1) {
    state.counters.arrived += 1;

    if (!breakerAllows(state)) {
      state.counters.shortCircuited += 1;
      state.counters.failed += 1;
      continue;
    }

    admit(state, {
      id: state.nextId++,
      startedAt: state.now,
      hop: 0,
      attempts: 0,
      spans: [],
      enqueuedAt: state.now,
    });
  }

  /* ── service ── */
  for (const nodeId of PATH) {
    const node = state.nodes[nodeId];
    const isDown = config.down === nodeId;

    // Start whatever fits in the free slots.
    while (node.running.length < node.concurrency && node.queue.length > 0) {
      const request = node.queue.shift();
      request.waitedMs = state.now - request.enqueuedAt;
      request.remaining = sampleService(node.serviceMs);
      node.running.push(request);
    }

    // Advance the in-flight work.
    for (let i = node.running.length - 1; i >= 0; i -= 1) {
      const request = node.running[i];
      request.remaining -= dt;
      if (request.remaining > 0) continue;

      node.running.splice(i, 1);
      request.spans.push({
        node: nodeId,
        wait: Math.round(request.waitedMs),
        service: Math.round(node.serviceMs),
      });

      if (isDown) {
        node.errors += 1;
        fail(state, request);
        continue;
      }

      node.completed += 1;
      request.hop += 1;

      if (request.hop >= PATH.length) finish(state, request);
      else admit(state, request);
    }

    // A downed node cannot even serve an error quickly for queued work, the
    // queue is what fills up while callers keep retrying into it.
    if (isDown) {
      while (node.queue.length > 0) {
        const request = node.queue.shift();
        node.errors += 1;
        request.spans.push({ node: nodeId, wait: Math.round(state.now - request.enqueuedAt), service: 0, failed: true });
        fail(state, request);
      }
    }
  }

  /* ── sample the world for the charts ── */
  state.history.push({
    t: state.now,
    inFlight: PATH.reduce((sum, id) => sum + state.nodes[id].running.length, 0),
    queued: PATH.reduce((sum, id) => sum + state.nodes[id].queue.length, 0),
    p99: percentile(state.samples, 99),
  });
  if (state.history.length > 240) state.history.shift();

  return state;
}

/** Put a request on its next node's queue, or shed it if the bulkhead is full. */
function admit(state, request) {
  const nodeId = PATH[request.hop];
  const node = state.nodes[nodeId];

  if (state.config.bulkhead && node.queue.length >= state.config.queueLimit) {
    node.rejected += 1;
    state.counters.shed += 1;
    state.counters.failed += 1;
    return;
  }

  request.enqueuedAt = state.now;
  node.queue.push(request);
}

/**
 * A failed hop retries with exponential backoff, and that is the trap.
 *
 * Retries are individually sensible and collectively catastrophic: every client
 * responding to a failure by trying again multiplies load on the thing that is
 * already failing. Watching the arrival rate climb while a node is down is the
 * clearest argument for a breaker there is.
 */
function fail(state, request) {
  request.attempts += 1;
  state.breaker.failures += 1;

  if (request.attempts <= state.config.retries) {
    state.counters.retried += 1;
    // Backoff is modelled by re-queueing at the same hop; the wait shows up in
    // the span, so the trace makes the cost of the retry visible.
    request.hop = Math.max(0, request.hop);
    admit(state, request);
    return;
  }

  state.counters.failed += 1;
  if (state.breaker.state === "half-open") state.breaker.successes = 0;
  recordTrace(state, request, false);
}

function finish(state, request) {
  const latency = state.now - request.startedAt;
  state.counters.completed += 1;
  state.breaker.successes += 1;
  state.breaker.failures = Math.max(0, state.breaker.failures - 1);

  state.samples.push(latency);
  if (state.samples.length > 400) state.samples.shift();

  recordTrace(state, request, true, latency);
}

function recordTrace(state, request, ok, latency = null) {
  state.traces.unshift({
    id: request.id,
    ok,
    latency: latency == null ? null : Math.round(latency),
    attempts: request.attempts,
    spans: request.spans,
  });
  if (state.traces.length > 12) state.traces.pop();
}

/* ── readouts ────────────────────────────────────────────────────────────── */

export function percentile(samples, p) {
  if (!samples.length) return null;
  const sorted = [...samples].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length));
  return Math.round(sorted[index]);
}

export function stats(state) {
  const { counters } = state;
  const total = counters.completed + counters.failed;
  return {
    p50: percentile(state.samples, 50),
    p95: percentile(state.samples, 95),
    p99: percentile(state.samples, 99),
    inFlight: PATH.reduce((sum, id) => sum + state.nodes[id].running.length, 0),
    queued: PATH.reduce((sum, id) => sum + state.nodes[id].queue.length, 0),
    errorRate: total ? counters.failed / total : 0,
    ...counters,
  };
}

/** Utilisation per node, offered load against slots, the saturation signal. */
export function nodeLoad(state, nodeId) {
  const node = state.nodes[nodeId];
  return {
    ...node,
    utilisation: node.running.length / node.concurrency,
    depth: node.queue.length,
  };
}

/**
 * Freeze the mutable world into plain data for rendering.
 *
 * The simulator mutates one state object in place for speed, which is exactly
 * what a React render must never read from. The loop calls this once per frame
 * and hands the result to `setState`, so the component only ever renders from
 * an immutable snapshot and the model stays free to churn.
 */
export function snapshot(state) {
  return {
    stats: stats(state),
    // Scalars only. Spreading the node would hand the render live references
    // to the queue and in-flight arrays, which the next step mutates.
    nodes: Object.fromEntries(
      PATH.map((id) => {
        const node = state.nodes[id];
        return [
          id,
          {
            id,
            name: node.name,
            layer: node.layer,
            detail: node.detail,
            concurrency: node.concurrency,
            serviceMs: node.serviceMs,
            inFlight: node.running.length,
            depth: node.queue.length,
            utilisation: node.running.length / node.concurrency,
            errors: node.errors,
            rejected: node.rejected,
          },
        ];
      })
    ),
    bins: histogram(state.samples),
    sampleCount: state.samples.length,
    p99: percentile(state.samples, 99),
    traces: state.traces.map((trace) => ({ ...trace, spans: [...trace.spans] })),
    breakerState: state.breaker.state,
    config: { ...state.config },
  };
}

/** Histogram buckets over the live latency window. */
export function histogram(samples, buckets = 22) {
  if (!samples.length) return [];
  const max = Math.max(...samples);
  const width = Math.max(1, max / buckets);
  const bins = Array.from({ length: buckets }, (_, i) => ({
    from: Math.round(i * width),
    to: Math.round((i + 1) * width),
    count: 0,
  }));
  for (const sample of samples) {
    const index = Math.min(buckets - 1, Math.floor(sample / width));
    bins[index].count += 1;
  }
  return bins;
}
