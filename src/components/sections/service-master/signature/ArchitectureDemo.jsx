"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { accent } from "../tokens";
import { downloadFile } from "@/lib/demo-mail";
import { DemoPanel, DemoControls, DemoButton, DemoLabel, DemoSlider, DemoToggle, DemoConsole } from "./demo-shell";
import { DEFAULTS, NODES, PATH, createSystem, snapshot, step } from "./lib/system-sim";

/**
 * The load simulator on /services/enterprise-software.
 *
 * The old demo was an accordion of layers. This one runs the system: requests
 * arrive on a Poisson process, queue at each service, and complete or fail, and
 * every number on screen is computed from those request objects. See
 * lib/system-sim.js.
 *
 * The interesting part is not that it draws a graph, it is what happens when
 * you turn the dial past capacity, or kill the pricing engine and watch retries
 * make the outage worse before the breaker turns it into a fast failure. Those
 * behaviours emerge from the model; none of them are scripted.
 *
 * The loop runs on `requestAnimationFrame` with a fixed simulated timestep, so
 * simulated time advances at the same rate whether the tab is rendering at
 * 120Hz or 30, and a backgrounded tab resumes without a spike of catch-up.
 */

const TICK_MS = 25; // simulated milliseconds per step
const MAX_STEPS_PER_FRAME = 4; // clamp so a stalled tab cannot spiral

export default function ArchitectureDemo({ color }) {
  const a = accent(color);

  /* The simulator mutates one object in place, a render must never read it.
     The loop publishes an immutable snapshot instead, and every number below
     comes from that. `view` is therefore the only thing render touches. */
  const system = useRef(null);
  const [view, setView] = useState(() => snapshot(createSystem()));

  const [running, setRunning] = useState(false);
  const [rps, setRps] = useState(DEFAULTS.rps);
  const [retries, setRetries] = useState(DEFAULTS.retries);
  const [breaker, setBreaker] = useState(false);
  const [bulkhead, setBulkhead] = useState(false);
  const [down, setDown] = useState(null);
  const [selectedTrace, setSelectedTrace] = useState(null);

  /* Config lives on the sim object so the loop always reads current values
     without the loop having to be torn down and rebuilt on every change. */
  useEffect(() => {
    if (!system.current) system.current = createSystem();
    Object.assign(system.current.config, { rps, retries, breaker, bulkhead, down });
  }, [rps, retries, breaker, bulkhead, down]);

  useEffect(() => {
    if (!running) return undefined;
    if (!system.current) system.current = createSystem();

    let frame;
    let last = performance.now();

    const loop = (now) => {
      const elapsed = now - last;
      last = now;
      const steps = Math.min(MAX_STEPS_PER_FRAME, Math.max(1, Math.round(elapsed / TICK_MS)));
      for (let i = 0; i < steps; i += 1) step(system.current, TICK_MS);
      setView(snapshot(system.current));
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  const reset = () => {
    const fresh = createSystem({ rps, retries, breaker, bulkhead, down });
    system.current = fresh;
    setSelectedTrace(null);
    setView(snapshot(fresh));
  };

  const s = view.stats;
  const bins = view.bins;
  const peak = Math.max(1, ...bins.map((b) => b.count));
  const breakerState = view.breakerState;

  /* Aggregate capacity: the slowest stage decides the ceiling, so this is the
     number the RPS dial should be read against. */
  const ceiling = Math.min(
    ...NODES.map((node) => Math.round((node.concurrency / node.serviceMs) * 1000))
  );
  const saturated = rps > ceiling;

  return (
    <DemoPanel>
      <DemoControls>
        <DemoButton color={color} active={running} onClick={() => setRunning((v) => !v)}>
          {running ? "Pause" : "Run traffic"}
        </DemoButton>
        <DemoButton color={color} onClick={reset}>
          Reset
        </DemoButton>
        <DemoSlider
          label="Load"
          value={rps}
          min={10}
          max={600}
          step={10}
          onChange={setRps}
          format={(v) => `${v}/s`}
        />
        <DemoSlider label="Retries" value={retries} min={0} max={4} onChange={setRetries} />
        <DemoToggle color={color} checked={breaker} onChange={setBreaker} label="Circuit breaker" />
        <DemoToggle color={color} checked={bulkhead} onChange={setBulkhead} label="Bulkhead" />
      </DemoControls>

      <div className="grid gap-5 p-4 md:p-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        {/* ── topology ── */}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
                Request path
              </p>
              <p className="font-mono text-[11px] text-on-surface-variant">
                capacity ≈ <span className={saturated ? "text-error" : a.text}>{ceiling}/s</span> ·
                offered {rps}/s
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {PATH.map((nodeId, i) => {
                const node = view.nodes[nodeId];
                const isDown = down === nodeId;
                const hot = node.utilisation > 0.85;
                return (
                  <div key={nodeId}>
                    <div
                      className={cn(
                        "rounded-2xl border p-3 transition-colors",
                        isDown
                          ? "border-error/50 bg-error/5"
                          : hot
                            ? "border-tertiary/50 bg-tertiary/5"
                            : "border-outline-variant/30 bg-surface"
                      )}
                    >
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-label text-label-caps tracking-widest",
                            isDown ? "bg-error/10 text-error" : cn(a.soft, a.text)
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-heading text-body-sm text-on-surface">
                            {node.name}{" "}
                            <span className="font-body text-[11px] text-on-surface-variant">
                              · {node.layer}
                            </span>
                          </p>
                          <p className="font-body text-[11px] text-on-surface-variant">
                            {node.detail} · {node.concurrency} slots · {node.serviceMs}ms
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setDown(isDown ? null : nodeId)}
                          className={cn(
                            "shrink-0 rounded-full border px-3 py-1 font-label text-[10px] uppercase tracking-widest transition-colors",
                            isDown
                              ? "border-error/50 bg-error/10 text-error"
                              : "border-outline-variant/40 text-on-surface-variant hover:text-on-surface"
                          )}
                        >
                          {isDown ? "Down, restore" : "Kill"}
                        </button>
                      </div>

                      {/* Slots and queue depth, straight off the model. */}
                      <div className="mt-2.5 flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-outline-variant/25">
                          <span
                            className={cn(
                              "block h-full rounded-full transition-[width] duration-150",
                              isDown ? "bg-error" : hot ? "bg-tertiary" : a.dot
                            )}
                            style={{ width: `${Math.min(100, node.utilisation * 100)}%` }}
                          />
                        </div>
                        <span className="w-32 shrink-0 text-right font-mono text-[10px] text-on-surface-variant">
                          {node.inFlight}/{node.concurrency} · q{node.depth}
                        </span>
                      </div>
                    </div>

                    {i < PATH.length - 1 && (
                      <span
                        className={cn(
                          "mx-auto my-1 block h-3 w-px",
                          node.depth > 20 ? "bg-error" : "bg-outline-variant/40"
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Latency histogram, real samples, real percentiles */}
          <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
                Latency distribution · {view.sampleCount} samples
              </p>
              <p className="font-mono text-[11px] text-on-surface-variant">
                p50 <span className="text-on-surface">{fmt(s.p50)}</span> · p95{" "}
                <span className="text-on-surface">{fmt(s.p95)}</span> · p99{" "}
                <span className={s.p99 > 1000 ? "text-error" : a.text}>{fmt(s.p99)}</span>
              </p>
            </div>

            <div className="flex h-24 items-end gap-[2px]">
              {bins.map((bin, i) => (
                <span
                  key={i}
                  title={`${bin.from}–${bin.to}ms · ${bin.count}`}
                  className={cn("flex-1 rounded-sm transition-[height] duration-150", a.dot)}
                  style={{ height: `${Math.max(2, (bin.count / peak) * 100)}%` }}
                />
              ))}
              {bins.length === 0 && (
                <span className="font-body text-body-sm text-on-surface-variant">
                  No completed requests yet, press Run traffic.
                </span>
              )}
            </div>

            {bins.length > 0 && (
              <div className="mt-1 flex justify-between font-mono text-[10px] text-on-surface-variant">
                <span>{bins[0].from}ms</span>
                <span>{bins[bins.length - 1].to}ms</span>
              </div>
            )}
          </div>
        </div>

        {/* ── right rail ── */}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Metric label="Completed" value={s.completed.toLocaleString()} accent={a} />
            <Metric
              label="Error rate"
              value={`${(s.errorRate * 100).toFixed(1)}%`}
              accent={a}
              bad={s.errorRate > 0.02}
            />
            <Metric label="In flight" value={s.inFlight} accent={a} />
            <Metric label="Queued" value={s.queued} accent={a} bad={s.queued > 100} />
          </div>

          {/* Breaker */}
          <div
            className={cn(
              "rounded-2xl border p-4 transition-colors",
              breakerState === "open"
                ? "border-error/50 bg-error/5"
                : breakerState === "half-open"
                  ? "border-tertiary/50 bg-tertiary/5"
                  : "border-outline-variant/30 bg-surface-container-lowest"
            )}
          >
            <div className="flex items-baseline justify-between">
              <p className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
                Circuit breaker
              </p>
              <span
                className={cn(
                  "font-mono text-[11px]",
                  breakerState === "closed" ? a.text : breakerState === "open" ? "text-error" : "text-tertiary"
                )}
              >
                {breaker ? breakerState : "disabled"}
              </span>
            </div>
            <p className="mt-2 font-body text-body-sm leading-relaxed text-on-surface-variant">
              {!breaker &&
                "Off. Kill a node and every failed call still costs a full timeout, then retries multiply it."}
              {breaker && breakerState === "closed" && "Closed, traffic flowing, failures being counted."}
              {breaker &&
                breakerState === "open" &&
                "Open, failing fast without touching the dependency. Cheap failure beats slow failure."}
              {breaker &&
                breakerState === "half-open" &&
                "Half-open, letting a trickle through to find out whether it recovered."}
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 font-body text-body-sm">
              <Fact label="Retried hops" value={s.retried.toLocaleString()} />
              <Fact label="Short-circuited" value={s.shortCircuited.toLocaleString()} />
              <Fact label="Shed (bulkhead)" value={s.shed.toLocaleString()} bad={s.shed > 0} />
              <Fact label="Failed" value={s.failed.toLocaleString()} bad={s.failed > 0} />
            </dl>
          </div>

          {/* Traces */}
          <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
            <p className="mb-3 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
              Recent traces, click one
            </p>
            <div className="flex flex-wrap gap-1.5">
              {view.traces.map((trace) => (
                <button
                  key={trace.id}
                  type="button"
                  onClick={() => setSelectedTrace(trace)}
                  className={cn(
                    "rounded-full border px-2.5 py-1 font-mono text-[10px] transition-colors",
                    trace.ok
                      ? "border-outline-variant/40 text-on-surface-variant hover:text-on-surface"
                      : "border-error/40 text-error"
                  )}
                >
                  #{trace.id} {trace.ok ? `${trace.latency}ms` : "failed"}
                </button>
              ))}
              {view.traces.length === 0 && (
                <p className="font-body text-body-sm text-on-surface-variant">
                  Nothing yet.
                </p>
              )}
            </div>

            {selectedTrace && (
              <div className="mt-4 border-t border-outline-variant/30 pt-3">
                <p className="mb-2 font-mono text-[11px] text-on-surface">
                  #{selectedTrace.id} ·{" "}
                  {selectedTrace.ok ? `${selectedTrace.latency}ms` : "failed"} ·{" "}
                  {selectedTrace.attempts} attempt{selectedTrace.attempts === 1 ? "" : "s"}
                </p>
                <Waterfall trace={selectedTrace} accent={a} />
              </div>
            )}
          </div>

          <DemoConsole title="Model" className="max-h-32">
            <p>arrivals ~ Poisson(λ = {rps}/s)</p>
            <p>service ~ Exponential(mean per node)</p>
            <p>queueing = M/M/c per service, FIFO</p>
            <p>bulkhead limit = {DEFAULTS.queueLimit} per queue {bulkhead ? "(armed)" : "(off)"}</p>
            <p>
              window p99 = {fmt(view.p99)} over last {view.sampleCount} samples
            </p>
          </DemoConsole>

          <DemoButton
            color={color}
            disabled={!view.traces.length}
            onClick={() =>
              downloadFile(
                "logixloops-trace.json",
                JSON.stringify(
                  {
                    config: view.config,
                    stats: s,
                    topology: NODES,
                    traces: view.traces,
                  },
                  null,
                  2
                ),
                "application/json"
              )
            }
          >
            Export traces
          </DemoButton>
        </div>
      </div>

      <p className="px-6 pb-6 font-body text-body-md leading-relaxed text-on-surface-variant">
        {down ? (
          <>
            <span className="text-error">{view.nodes[down].name} is down.</span> Watch the retry count
            climb, every client responding sensibly to a failure is collectively hammering the thing
            that is already broken.{" "}
            {breaker
              ? "The breaker has turned that into a cheap, fast failure."
              : "Arm the circuit breaker and watch that stop."}
          </>
        ) : saturated ? (
          <>
            You are offering {rps}/s into a system whose slowest stage tops out near {ceiling}/s.{" "}
            <span className={a.text}>Latency is not degrading linearly</span>, queues grow without
            bound, and p99 is where you see it first.
          </>
        ) : (
          <>
            Every layer is replaceable on its own schedule, but only if you know where it saturates.
            Push the load past{" "}
            <span className={a.text}>{ceiling}/s</span>, or kill a node, and the model shows you
            exactly which stage gives first.
          </>
        )}
      </p>
    </DemoPanel>
  );
}

/* ── pieces ──────────────────────────────────────────────────────────────── */

const fmt = (ms) => (ms == null ? ". " : `${ms}ms`);

function Metric({ label, value, accent: a, bad }) {
  return (
    <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-3">
      <p className={cn("font-display text-xl leading-none", bad ? "text-error" : a.text)}>{value}</p>
      <p className="mt-1 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
        {label}
      </p>
    </div>
  );
}

function Fact({ label, value, bad }) {
  return (
    <>
      <dt className="text-on-surface-variant">{label}</dt>
      <dd className={cn("text-right font-mono text-[11px]", bad ? "text-error" : "text-on-surface")}>
        {value}
      </dd>
    </>
  );
}

/** Per-span waterfall, wait then service, laid out on the request's own clock. */
function Waterfall({ trace, accent: a }) {
  const total = Math.max(
    1,
    trace.spans.reduce((sum, span) => sum + span.wait + span.service, 0)
  );

  /* Start offsets, computed up front. A running cursor mutated inside the map
     would be a render-time reassignment, and the compiler is right to object,
     the value each row reads would depend on the order React chose to run in. */
  const offsets = trace.spans.reduce(
    (acc, span) => [...acc, acc[acc.length - 1] + span.wait + span.service],
    [0]
  );

  return (
    <div className="flex flex-col gap-1.5">
      {trace.spans.map((span, i) => {
        const left = (offsets[i] / total) * 100;
        const waitPct = (span.wait / total) * 100;
        const servicePct = (span.service / total) * 100;

        return (
          <div key={i} className="flex items-center gap-2">
            <span className="w-16 shrink-0 truncate font-mono text-[10px] text-on-surface-variant">
              {span.node}
            </span>
            <div className="relative h-3 flex-1 rounded-full bg-outline-variant/20">
              <span
                className="absolute top-0 h-full rounded-l-full bg-outline-variant/60"
                style={{ left: `${left}%`, width: `${Math.max(0.5, waitPct)}%` }}
                title={`queued ${span.wait}ms`}
              />
              <span
                className={cn("absolute top-0 h-full rounded-r-full", span.failed ? "bg-error" : a.dot)}
                style={{ left: `${left + waitPct}%`, width: `${Math.max(0.5, servicePct)}%` }}
                title={`service ${span.service}ms`}
              />
            </div>
            <span className="w-20 shrink-0 text-right font-mono text-[10px] text-on-surface-variant">
              {span.wait}+{span.service}ms
            </span>
          </div>
        );
      })}
    </div>
  );
}
