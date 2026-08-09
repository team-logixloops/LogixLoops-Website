"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { accent } from "../tokens";
import { downloadFile } from "@/lib/demo-mail";
import {
  DemoPanel,
  DemoControls,
  DemoButton,
  DemoLabel,
  DemoToggle,
  DemoSlider,
  DemoConsole,
} from "./demo-shell";

/**
 * The delivery pipeline on /services/cloud-devops.
 *
 * Each stage owns its own log lines, its own duration, and its own failure
 * mode, and any of them can be armed to fail. The canary stage is the one that
 * matters: it watches a simulated error rate against an SLO and decides for
 * itself whether to promote or roll back, so raising the error-budget slider
 * past the threshold produces a rollback without anyone scripting one.
 */

const STAGES = [
  {
    id: "build",
    name: "Build",
    detail: "Container image built and signed",
    ms: 1100,
    lines: (ctx) => [
      `#1 [internal] load build definition from Dockerfile`,
      `#7 [builder 4/6] RUN npm ci --omit=dev`,
      `#12 exporting layers  ${ctx.layers} written, ${ctx.cached} cached`,
      `#13 pushing ${ctx.image}`,
      `cosign: signed ${ctx.digest}`,
    ],
    failure: "npm ci failed: lockfile out of sync with package.json",
  },
  {
    id: "test",
    name: "Test",
    detail: "Unit, integration, and contract suites",
    ms: 1400,
    lines: (ctx) => [
      `jest: 418 passed, 0 failed (12.4s)`,
      `pact: 6 consumer contracts verified against ${ctx.image}`,
      `coverage: 87.2% lines, gate is 80%`,
    ],
    failure: "contract test failed: orders→pricing v3 removed field `surcharge`",
  },
  {
    id: "scan",
    name: "Scan",
    detail: "SBOM diff and CVE gate",
    ms: 900,
    lines: () => [
      `syft: 412 packages catalogued`,
      `grype: 0 critical, 0 high, 3 medium, 11 low`,
      `sbom diff vs previous: 4 added, 1 upgraded, 0 removed`,
    ],
    failure: "gate failed: CVE-2026-3311 (critical) in transitive dependency",
  },
  {
    id: "canary",
    name: "Canary",
    detail: "5% of traffic, health checks watched",
    ms: 1800,
    lines: (ctx) => [
      `routing 5% of traffic to ${ctx.digest.slice(0, 19)}`,
      `p95 latency 214ms (baseline 208ms)`,
      `error rate ${ctx.errorRate.toFixed(2)}% over 90s window, SLO is ${ctx.slo.toFixed(2)}%`,
    ],
    failure: "health check failed: error rate breached the SLO",
  },
  {
    id: "promote",
    name: "Promote",
    detail: "Full rollout, previous revision retained",
    ms: 1000,
    lines: (ctx) => [
      `scaling ${ctx.digest.slice(0, 19)} to 100%`,
      `previous revision kept warm for instant rollback`,
      `deploy marker sent to observability`,
    ],
    failure: "rollout stalled: insufficient capacity in eu-west-1",
  },
];

/** Deterministic-looking digest so the log reads like a real one. */
function makeContext(errorRate, slo) {
  const hex = Array.from({ length: 12 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
  return {
    image: `ghcr.io/logixloops/orders:2026.08.${Math.floor(Math.random() * 40) + 1}`,
    digest: `sha256:${hex}${hex.split("").reverse().join("")}`,
    layers: 8 + Math.floor(Math.random() * 4),
    cached: 3 + Math.floor(Math.random() * 5),
    errorRate,
    slo,
  };
}

export default function PipelineDemo({ color }) {
  const a = accent(color);

  const [armed, setArmed] = useState(null); // stage id set to fail
  const [errorRate, setErrorRate] = useState(0.4);
  const [slo, setSlo] = useState(1.0);
  const [running, setRunning] = useState(false);
  const [current, setCurrent] = useState(-1);
  const [outcome, setOutcome] = useState("idle"); // idle | running | released | rolled-back
  const [results, setResults] = useState({});
  const [log, setLog] = useState([]);
  const [duration, setDuration] = useState(0);

  const timers = useRef([]);
  const logRef = useRef(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  const wait = (ms) =>
    new Promise((resolve) => {
      timers.current.push(setTimeout(resolve, ms));
    });

  const write = (line, tone = "info") =>
    setLog((prev) => [...prev, { line, tone, at: new Date().toTimeString().slice(0, 8) }]);

  const run = async () => {
    if (running) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];

    setRunning(true);
    setOutcome("running");
    setResults({});
    setLog([]);
    setDuration(0);

    const started = Date.now();
    const ctx = makeContext(errorRate, slo);
    write(`pipeline started · ${ctx.image}`);

    for (let i = 0; i < STAGES.length; i += 1) {
      const stage = STAGES[i];
      setCurrent(i);
      setResults((prev) => ({ ...prev, [stage.id]: "running" }));
      write(`── ${stage.name.toLowerCase()} ──`);

      const lines = stage.lines(ctx);
      for (const line of lines) {
        await wait(stage.ms / (lines.length + 1));
        write(line);
      }

      // The canary decides for itself: the SLO comparison is a real branch on
      // two numbers you control, not a switch that says "now fail".
      const canaryBreached = stage.id === "canary" && ctx.errorRate > ctx.slo;
      const failed = armed === stage.id || canaryBreached;

      if (failed) {
        setResults((prev) => ({ ...prev, [stage.id]: "failed" }));
        write(stage.failure, "error");

        if (stage.id === "canary" || stage.id === "promote") {
          write("draining canary traffic back to the previous revision", "warn");
          await wait(500);
          for (let j = 0; j < i; j += 1) {
            setResults((prev) => ({ ...prev, [STAGES[j].id]: "reverted" }));
          }
          write("rollback complete, no user-visible outage, no pager", "ok");
          setOutcome("rolled-back");
        } else {
          write("pipeline halted before anything reached production", "ok");
          setOutcome("rolled-back");
        }

        setDuration(Date.now() - started);
        setCurrent(-1);
        setRunning(false);
        return;
      }

      setResults((prev) => ({ ...prev, [stage.id]: "passed" }));
    }

    write("released with zero downtime", "ok");
    setOutcome("released");
    setDuration(Date.now() - started);
    setCurrent(-1);
    setRunning(false);
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setRunning(false);
    setCurrent(-1);
    setOutcome("idle");
    setResults({});
    setLog([]);
    setDuration(0);
  };

  const toneClass = {
    info: "text-on-surface-variant",
    ok: "text-on-surface",
    warn: "text-tertiary",
    error: "text-error",
  };

  const canaryWillBreach = errorRate > slo;

  return (
    <DemoPanel>
      <DemoControls>
        <DemoButton color={color} active onClick={run} disabled={running}>
          {running ? "Deploying…" : "Run deploy"}
        </DemoButton>
        <DemoButton color={color} onClick={reset} disabled={running || outcome === "idle"}>
          Reset
        </DemoButton>
        <DemoSlider
          label="Canary errors"
          value={errorRate}
          min={0}
          max={4}
          step={0.1}
          onChange={setErrorRate}
          format={(v) => `${v.toFixed(1)}%`}
        />
        <DemoSlider
          label="SLO"
          value={slo}
          min={0.2}
          max={4}
          step={0.1}
          onChange={setSlo}
          format={(v) => `${v.toFixed(1)}%`}
        />
      </DemoControls>

      <div className="grid gap-5 p-4 md:p-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* ── stages ── */}
        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <DemoLabel>Arm a failure</DemoLabel>
            {STAGES.map((stage) => (
              <button
                key={stage.id}
                type="button"
                disabled={running}
                onClick={() => setArmed(armed === stage.id ? null : stage.id)}
                className={cn(
                  "rounded-full border px-2.5 py-1 font-label text-[10px] uppercase tracking-widest transition-colors disabled:opacity-40",
                  armed === stage.id
                    ? "border-error/50 bg-error/10 text-error"
                    : "border-outline-variant/40 text-on-surface-variant hover:text-on-surface"
                )}
              >
                {stage.name}
              </button>
            ))}
          </div>

          <ol className="flex flex-col gap-2">
            {STAGES.map((stage, i) => {
              const state = results[stage.id] || (current === i ? "running" : "pending");
              return (
                <li
                  key={stage.id}
                  className={cn(
                    "flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border p-4 transition-colors",
                    state === "pending" && "border-outline-variant/30 bg-surface/40 opacity-60",
                    state === "running" && cn("bg-surface", a.ring),
                    state === "passed" && "border-outline-variant/30 bg-surface",
                    state === "failed" && "border-error/40 bg-error/5",
                    state === "reverted" && "border-outline-variant/30 bg-surface/60"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-label text-label-caps tracking-widest",
                      state === "failed" ? "bg-error/10 text-error" : cn(a.soft, a.text)
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="font-heading text-body-md text-on-surface">{stage.name}</p>
                    <p className="font-body text-body-sm text-on-surface-variant">{stage.detail}</p>
                  </div>

                  <span
                    className={cn(
                      "ml-[52px] font-label text-label-caps uppercase tracking-widest sm:ml-0",
                      state === "failed" ? "text-error" : "text-on-surface-variant"
                    )}
                  >
                    {state === "pending" && "queued"}
                    {state === "running" && "running"}
                    {state === "passed" && "passed"}
                    {state === "failed" && "failed"}
                    {state === "reverted" && "reverted"}
                  </span>
                </li>
              );
            })}
          </ol>

          <div
            className={cn(
              "rounded-2xl border p-4 transition-colors",
              canaryWillBreach ? "border-error/40 bg-error/5" : "border-outline-variant/30 bg-surface-container-lowest"
            )}
          >
            <p className="font-body text-body-sm leading-relaxed text-on-surface-variant">
              Canary gate:{" "}
              <span className={canaryWillBreach ? "text-error" : a.text}>
                {errorRate.toFixed(1)}% observed vs {slo.toFixed(1)}% budget
              </span>{" "}
 {canaryWillBreach ? "this run will roll itself back." : "this run will promote."}{" "}
              Nothing scripts that outcome; the stage compares the two numbers you set.
            </p>
          </div>
        </div>

        {/* ── log ── */}
        <div className="flex min-w-0 flex-col gap-3">
          <DemoConsole
            title={`Build log${duration ? ` · ${(duration / 1000).toFixed(1)}s` : ""}`}
            className="max-h-[420px]"
            ref={logRef}
          >
            {log.length === 0 && (
              <p>Idle, arm a stage or push the canary past its budget, then run the deploy.</p>
            )}
            {log.map((entry, i) => (
              <p key={i} className={toneClass[entry.tone]}>
                <span className="opacity-50">{entry.at}</span> {entry.line}
              </p>
            ))}
          </DemoConsole>

          {log.length > 0 && !running && (
            <DemoButton
              color={color}
              onClick={() =>
                downloadFile(
                  `logixloops-deploy-${outcome}.log`,
                  log.map((entry) => `${entry.at}  ${entry.line}`).join("\n"),
                  "text/plain;charset=utf-8"
                )
              }
            >
              Download build log
            </DemoButton>
          )}

          <p className="font-body text-body-md leading-relaxed text-on-surface-variant">
            {outcome === "idle" &&
              "Five stages, each with its own gate. Arm one to fail, or leave them alone and move the error budget instead."}
            {outcome === "running" && "Deploying, traffic is still served by the previous revision."}
            {outcome === "released" && (
              <>
                Released with <span className={a.text}>zero downtime</span> in{" "}
                {(duration / 1000).toFixed(1)}s. The previous revision stays warm, so rollback is a
                routing change rather than a rebuild.
              </>
            )}
            {outcome === "rolled-back" && (
              <>
                Stopped before it reached anyone.{" "}
                <span className={a.text}>That is the whole return on a pipeline</span>, the failure
                cost you {(duration / 1000).toFixed(1)} seconds, not an incident.
              </>
            )}
          </p>
        </div>
      </div>
    </DemoPanel>
  );
}
