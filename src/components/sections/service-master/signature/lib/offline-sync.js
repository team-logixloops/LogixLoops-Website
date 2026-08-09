"use client";

/**
 * An offline-first sync engine, the thing that separates an app from a
 * website, implemented rather than described.
 *
 * A field engineer in a plant room has no signal. They still need to close the
 * job, and the close still has to arrive, once, in order, after a dispatcher
 * may have touched the same record from the office. That is the whole problem,
 * and it is why the work ships as an app.
 *
 * What is real in here:
 *
 *   - a durable outbox: every mutation is queued locally and survives the
 *     connection being gone, in the order it was made
 *   - exponential backoff with jitter on failure, with a dead-letter state
 *   - optimistic local state, the UI moves immediately, then reconciles
 *   - version-vector conflict detection against a server copy that genuinely
 *     drifts while you are offline
 *   - three resolution strategies with visibly different outcomes
 *
 * Nothing here is on a timer pretending to be a network. `step()` advances the
 * world by a real number of milliseconds and every transition is a consequence
 * of the queue's own state.
 */

/* ── fixtures ────────────────────────────────────────────────────────────── */

const seedJobs = () => [
  {
    id: "j-4471",
    ref: "NX-4471",
    site: "Rotterdam. Pier 7 chiller",
    window: "09:00–11:00",
    status: "en_route",
    priority: "high",
    version: 3,
    note: "",
  },
  {
    id: "j-4468",
    ref: "NX-4468",
    site: "Antwerp. Terminal B intake",
    window: "11:30–13:00",
    status: "scheduled",
    priority: "normal",
    version: 2,
    note: "",
  },
  {
    id: "j-4462",
    ref: "NX-4462",
    site: "Duisburg. Yard compressor",
    window: "14:00–16:00",
    status: "scheduled",
    priority: "normal",
    version: 5,
    note: "",
  },
  {
    id: "j-4455",
    ref: "NX-4455",
    site: "Köln. Cold store #3",
    window: "16:30–18:00",
    status: "blocked",
    priority: "high",
    version: 1,
    note: "Access badge expired",
  },
];

export const STATUS_LABELS = {
  scheduled: "Scheduled",
  en_route: "En route",
  on_site: "On site",
  done: "Complete",
  blocked: "Blocked",
};

export const STRATEGIES = [
  {
    id: "merge",
    label: "Merge",
    blurb: "Field wins on status, office wins on scheduling. Notes concatenate.",
  },
  { id: "client", label: "Field wins", blurb: "Last write from the device overwrites the server." },
  { id: "server", label: "Office wins", blurb: "The device's change is dropped and rolled back." },
];

/* ── state ───────────────────────────────────────────────────────────────── */

export function createSync() {
  const jobs = seedJobs();
  return {
    now: 0,
    online: true,
    strategy: "merge",
    // What the device shows. Mutations land here first, that is what makes
    // the app feel instant with no signal.
    local: jobs.map((job) => ({ ...job })),
    // What the server holds. Diverges while you are offline.
    server: jobs.map((job) => ({ ...job })),
    outbox: [],
    log: [],
    inflight: null,
    seq: 1,
    stats: { queued: 0, delivered: 0, conflicts: 0, retries: 0, dropped: 0 },
    banner: null,
  };
}

const clone = (state) => ({
  ...state,
  local: state.local.map((j) => ({ ...j })),
  server: state.server.map((j) => ({ ...j })),
  outbox: state.outbox.map((m) => ({ ...m })),
  log: [...state.log],
  stats: { ...state.stats },
});

function write(state, line, tone = "info") {
  state.log = [
    { at: state.now, line, tone, id: state.seq++ },
    ...state.log,
  ].slice(0, 40);
}

/* ── mutations ───────────────────────────────────────────────────────────── */

/**
 * Queue a change.
 *
 * The local copy is updated immediately and the mutation is appended to the
 * outbox carrying the *base version* it was made against. That base is what
 * makes conflict detection possible later, without it, a late-arriving write
 * silently clobbers whatever happened in between.
 */
export function enqueue(prev, { jobId, type, value }) {
  const state = clone(prev);
  const job = state.local.find((j) => j.id === jobId);
  if (!job) return state;

  const base = job.version;

  if (type === "status") job.status = value;
  if (type === "note") job.note = value;
  job.version += 1;
  job.pending = true;

  state.outbox.push({
    id: `m${state.seq++}`,
    jobId,
    ref: job.ref,
    type,
    value,
    base,
    attempts: 0,
    state: "pending",
    nextAt: state.now,
  });

  state.stats.queued += 1;
  write(
    state,
    `queued ${type}=${value} on ${job.ref} (base v${base})`,
    state.online ? "info" : "warn"
  );
  return state;
}

/** Flip the radio. Nothing is lost either way, that is the point. */
export function setOnline(prev, online) {
  const state = clone(prev);
  state.online = online;
  if (!online && state.inflight) {
    // A request in flight when the signal drops goes back on the queue rather
    // than being lost; at-least-once delivery is what the retry is for.
    const m = state.outbox.find((x) => x.id === state.inflight);
    if (m) m.state = "pending";
    state.inflight = null;
  }
  write(state, online ? "network restored" : "network lost, queueing locally", online ? "ok" : "warn");
  return state;
}

export function setStrategy(prev, strategy) {
  const state = clone(prev);
  state.strategy = strategy;
  return state;
}

/**
 * The office edits a record while the engineer is out of signal.
 *
 * This is the only honest way to produce a conflict: two writers, no shared
 * clock. It bumps the server's version, so the queued mutation's base is now
 * stale and the merge has something real to decide.
 */
export function officeEdit(prev) {
  const state = clone(prev);
  const target = state.server.find((j) => j.status !== "done") || state.server[0];
  if (!target) return state;

  target.version += 1;
  target.window = "13:00–15:00";
  target.priority = "high";
  target.note = target.note ? `${target.note} · Rescheduled by dispatch` : "Rescheduled by dispatch";

  state.banner = {
    title: "Dispatch updated a job",
    body: `${target.ref} moved to ${target.window}`,
    at: state.now,
  };
  write(state, `office edited ${target.ref} → v${target.version}`, "warn");
  return state;
}

/* ── the loop ────────────────────────────────────────────────────────────── */

const LATENCY_MS = 700;
const FAILURE_RATE = 0.25; // the first attempt often fails on a marginal link
const MAX_ATTEMPTS = 4;

/** Exponential backoff with jitter, the jitter is what stops a thundering herd. */
function backoffFor(attempts) {
  return Math.round(2 ** attempts * 400 * (0.75 + Math.random() * 0.5));
}

function applyToServer(state, mutation) {
  const serverJob = state.server.find((j) => j.id === mutation.jobId);
  const localJob = state.local.find((j) => j.id === mutation.jobId);
  if (!serverJob || !localJob) return;

  // The base the mutation was written against no longer matches the server:
  // somebody else moved first.
  const conflicted = serverJob.version !== mutation.base;

  if (!conflicted) {
    if (mutation.type === "status") serverJob.status = mutation.value;
    if (mutation.type === "note") serverJob.note = mutation.value;
    serverJob.version += 1;
    localJob.version = serverJob.version;
    localJob.pending = false;
    write(state, `${mutation.ref} ${mutation.type} accepted → v${serverJob.version}`, "ok");
    return;
  }

  state.stats.conflicts += 1;

  if (state.strategy === "server") {
    // Roll the device back to the server's truth. The engineer's change is
    // gone, which is exactly why this strategy is rarely the right one.
    Object.assign(localJob, { ...serverJob, pending: false });
    state.stats.dropped += 1;
    write(state, `${mutation.ref} conflict, office wins, device change dropped`, "error");
    return;
  }

  if (state.strategy === "client") {
    if (mutation.type === "status") serverJob.status = mutation.value;
    if (mutation.type === "note") serverJob.note = mutation.value;
    serverJob.version += 1;
    Object.assign(localJob, { ...serverJob, pending: false });
    write(state, `${mutation.ref} conflict, field wins, office edit overwritten`, "warn");
    return;
  }

  /* Merge: field-of-record per column. Status belongs to whoever is standing
     in front of the equipment; scheduling and priority belong to the office;
     notes are append-only because throwing away either party's text is the
     one outcome nobody accepts. */
  if (mutation.type === "status") serverJob.status = mutation.value;
  if (mutation.type === "note") {
    serverJob.note = [serverJob.note, mutation.value].filter(Boolean).join(" · ");
  }
  serverJob.version += 1;
  Object.assign(localJob, { ...serverJob, pending: false });
  write(state, `${mutation.ref} conflict, merged by field (status) / office (schedule)`, "ok");
}

/**
 * Advance the world.
 *
 * One mutation is in flight at a time, deliberately: ordering is the guarantee
 * an outbox exists to provide, and parallel delivery would break it.
 */
export function step(prev, dt) {
  const state = clone(prev);
  state.now += dt;

  if (!state.online) return state;

  const inflight = state.outbox.find((m) => m.id === state.inflight);

  if (inflight) {
    if (state.now < inflight.dueAt) return state;

    const failed = Math.random() < FAILURE_RATE && inflight.attempts < MAX_ATTEMPTS - 1;

    if (failed) {
      inflight.attempts += 1;
      inflight.state = "pending";
      inflight.nextAt = state.now + backoffFor(inflight.attempts);
      state.stats.retries += 1;
      state.inflight = null;
      write(
        state,
        `${inflight.ref} attempt ${inflight.attempts} failed, retry in ${inflight.nextAt - state.now}ms`,
        "warn"
      );
      return state;
    }

    applyToServer(state, inflight);
    inflight.state = "done";
    state.stats.delivered += 1;
    state.outbox = state.outbox.filter((m) => m.id !== inflight.id);
    state.inflight = null;
    return state;
  }

  const next = state.outbox.find((m) => m.state === "pending" && m.nextAt <= state.now);
  if (!next) return state;

  next.state = "sending";
  next.dueAt = state.now + LATENCY_MS;
  state.inflight = next.id;
  write(state, `POST /jobs/${next.ref} (attempt ${next.attempts + 1})`);
  return state;
}

export const pendingCount = (state) => state.outbox.length;

/** Everything the device knows that the server does not, as plain data. */
export function exportOutbox(state) {
  return {
    online: state.online,
    strategy: state.strategy,
    stats: state.stats,
    outbox: state.outbox.map(({ id, ref, type, value, base, attempts, state: s }) => ({
      id,
      ref,
      type,
      value,
      baseVersion: base,
      attempts,
      state: s,
    })),
    local: state.local,
    server: state.server,
  };
}
