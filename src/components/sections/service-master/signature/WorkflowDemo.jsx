"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { accent } from "../tokens";
import { sendDemoMail, downloadFile } from "@/lib/demo-mail";
import { DemoPanel, DemoControls, DemoButton, DemoLabel, DemoConsole } from "./demo-shell";

/**
 * The automation graph on /services/automation-systems.
 *
 * Four of the five nodes are simulated. The fifth is not: `Notify` posts to
 * /api/notify, which opens an SMTP connection and sends a real message to the
 * address in the field. The run log prints the message id the mail server
 * returned, which is the difference between a demo that says it sent an email
 * and one you can go and check.
 *
 * What the visitor supplies is an address and a scenario id, never any of the
 * words in the message. The body is authored server-side in
 * lib/mail/templates.js precisely so a public form cannot become a way to put
 * arbitrary text in front of a stranger. The security note there has the rest.
 */

const SCENARIOS = [
  {
    id: "invoice",
    label: "Standard",
    summary: "£2,480 invoice, under the approval threshold",
    branch: "amount £2,480, auto path",
    retries: 0,
  },
  {
    id: "escalation",
    label: "Escalation",
    summary: "£14,900 invoice, over the approval threshold",
    branch: "amount £14,900, routed to a human approver",
    retries: 0,
  },
  {
    id: "retry",
    label: "Flaky ERP",
    summary: "£640 invoice, ledger returns 503 twice",
    branch: "amount £640, auto path",
    retries: 2,
  },
];

const NODES = [
  { id: "trigger", name: "Trigger", detail: "Invoice email lands in the shared inbox" },
  { id: "extract", name: "Extract", detail: "OCR pulls totals, dates, and PO number" },
  { id: "branch", name: "Branch", detail: "Approval policy decides the path" },
  { id: "post", name: "Post", detail: "Write to the ledger, retry with backoff" },
  { id: "notify", name: "Notify", detail: "Send the confirmation, real SMTP" },
];

const STEP_MS = 650;

export default function WorkflowDemo({ color }) {
  const a = accent(color);

  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [address, setAddress] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [active, setActive] = useState(-1);
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);
  const [runs, setRuns] = useState(0);
  const [nodeState, setNodeState] = useState({});

  const timers = useRef([]);
  // Stamped on mount, not during render, render stays pure and the value is
  // only read when the form is submitted.
  const mountedAt = useRef(0);
  const logRef = useRef(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Keep the newest line visible without yanking the page around.
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  const write = (line, tone = "info") =>
    setLog((prev) => [...prev, { line, tone, at: new Date().toTimeString().slice(0, 8) }]);

  const wait = (ms) =>
    new Promise((resolve) => {
      timers.current.push(setTimeout(resolve, ms));
    });

  const fire = async () => {
    if (running) return;

    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(true);
    setLog([]);
    setNodeState({});
    setActive(0);

    const runId = `run_${Math.random().toString(36).slice(2, 8)}`;
    write(`${runId} started · scenario "${scenario.id}"`);

    /* ── trigger ── */
    setActive(0);
    await wait(STEP_MS);
    setNodeState((s) => ({ ...s, trigger: "ok" }));
    write("trigger, webhook received, payload 14.2 KB");

    /* ── extract ── */
    setActive(1);
    await wait(STEP_MS);
    setNodeState((s) => ({ ...s, extract: "ok" }));
    write("extract. 3 fields parsed, 1 low-confidence (supplier name)");

    /* ── branch ── */
    setActive(2);
    await wait(STEP_MS);
    setNodeState((s) => ({ ...s, branch: "ok" }));
    write(`branch, ${scenario.branch}`);

    /* ── post, with the retry path where the scenario asks for it ── */
    setActive(3);
    for (let attempt = 1; attempt <= scenario.retries; attempt += 1) {
      await wait(STEP_MS * 0.7);
      setNodeState((s) => ({ ...s, post: "retry" }));
      write(`post. ERP returned 503, backoff ${2 ** attempt * 250}ms (attempt ${attempt})`, "warn");
    }
    await wait(STEP_MS);
    setNodeState((s) => ({ ...s, post: "ok" }));
    write(`post, ledger write ok (attempt ${scenario.retries + 1})`);

    /* ── notify: this one leaves the browser ── */
    setActive(4);
    const recipient = address.trim();

    if (!recipient) {
      setNodeState((s) => ({ ...s, notify: "skipped" }));
      write("notify, no recipient configured, step skipped", "warn");
    } else {
      write(`notify. POST /api/notify → ${recipient}`);
      try {
        const result = await sendDemoMail({
          template: "workflow-receipt",
          to: recipient,
          payload: { scenario: scenario.id },
          startedAt: mountedAt.current,
          website: honeypot,
        });
        setNodeState((s) => ({ ...s, notify: "ok" }));
        write(`notify. 250 accepted · ${result.messageId}`, "ok");
        write(`notify, ${result.response || "queued by the mail server"}`, "ok");
      } catch (error) {
        setNodeState((s) => ({ ...s, notify: "failed" }));
        write(`notify, send failed: ${error.message}`, "error");
      }
    }

    write(`${runId} finished`);
    setActive(-1);
    setRunning(false);
    setRuns((r) => r + 1);
  };

  const toneClass = {
    info: "text-on-surface-variant",
    ok: "text-on-surface",
    warn: "text-tertiary",
    error: "text-error",
  };

  const stateBadge = {
    ok: { label: "ok", className: "text-on-surface" },
    retry: { label: "retrying", className: "text-tertiary" },
    skipped: { label: "skipped", className: "text-on-surface-variant" },
    failed: { label: "failed", className: "text-error" },
  };

  return (
    <DemoPanel>
      <DemoControls>
        <DemoLabel>Scenario</DemoLabel>
        {SCENARIOS.map((option) => (
          <DemoButton
            key={option.id}
            color={color}
            active={option.id === scenario.id}
            onClick={() => setScenario(option)}
            disabled={running}
          >
            {option.label}
          </DemoButton>
        ))}
        <DemoLabel>
          {runs} completed run{runs === 1 ? "" : "s"}
        </DemoLabel>
      </DemoControls>

      <div className="grid gap-5 p-4 md:p-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* ── the graph ── */}
        <div className="flex min-w-0 flex-col gap-3">
          {NODES.map((node, i) => {
            const state = nodeState[node.id];
            const badge = state ? stateBadge[state] : null;
            const isActive = active === i;

            return (
              <div key={node.id}>
                <div
                  className={cn(
                    "rounded-2xl border p-4 transition-all duration-300",
                    isActive
                      ? cn("scale-[1.01] bg-surface shadow-md", a.ring)
                      : state === "failed"
                        ? "border-error/40 bg-error/5"
                        : "border-outline-variant/30 bg-surface/50"
                  )}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-label text-label-caps tracking-widest transition-colors",
                        isActive ? cn(a.dot, "text-on-primary") : cn(a.soft, a.text)
                      )}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-heading text-body-md text-on-surface">
                        {node.name}
                        {node.id === "notify" && (
                          <span className={cn("ml-2 font-label text-[10px] uppercase tracking-widest", a.text)}>
                            live
                          </span>
                        )}
                      </p>
                      <p className="font-body text-body-sm leading-relaxed text-on-surface-variant">
                        {node.detail}
                      </p>
                    </div>
                    {badge && (
                      <span
                        className={cn(
                          "shrink-0 font-label text-[10px] uppercase tracking-widest",
                          badge.className
                        )}
                      >
                        {badge.label}
                      </span>
                    )}
                  </div>
                </div>

                {i < NODES.length - 1 && (
                  <span
                    className={cn(
                      "mx-auto my-1 block h-4 w-px transition-colors",
                      active > i ? a.dot : "bg-outline-variant/40"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ── recipient + log ── */}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="rounded-2xl border border-outline-variant/30 bg-surface p-4">
            <p className="mb-1 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
              Where should the Notify node send?
            </p>
            <p className="mb-3 font-body text-body-sm leading-relaxed text-on-surface-variant">
              {scenario.summary}. Leave it blank to run the graph without sending.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <label htmlFor="wf-email" className="sr-only">
                Email address
              </label>
              <input
                id="wf-email"
                type="email"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
                disabled={running}
                className="min-w-0 flex-1 rounded-full border border-outline-variant/40 bg-surface-container-lowest px-4 py-2 font-body text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-60"
              />
              {/* Honeypot, see demo-shell for why it is positioned this way. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"
              />
              <DemoButton color={color} active onClick={fire} disabled={running}>
                {running ? "Running…" : "Fire trigger"}
              </DemoButton>
            </div>

            <p className="mt-3 font-body text-body-sm leading-relaxed text-on-surface-variant">
              One message, no list, nothing stored. The body is written on the server, this form
              chooses a scenario, not the words.
            </p>
          </div>

          <DemoConsole title="Run log" className="max-h-72" ref={logRef}>
            {log.length === 0 && (
              <p>Idle, fire the trigger to watch an event travel the graph and leave the browser.</p>
            )}
            {log.map((entry, i) => (
              <p key={i} className={toneClass[entry.tone]}>
                <span className="opacity-50">{entry.at}</span>{" "}
                <span className={a.text}>›</span> {entry.line}
              </p>
            ))}
          </DemoConsole>

          {log.length > 0 && !running && (
            <DemoButton
              color={color}
              onClick={() =>
                downloadFile(
                  "logixloops-workflow-run.log",
                  log.map((entry) => `${entry.at}  ${entry.line}`).join("\n"),
                  "text/plain;charset=utf-8"
                )
              }
            >
              Download run log
            </DemoButton>
          )}
        </div>
      </div>

      <p className="px-6 pb-6 font-body text-body-md leading-relaxed text-on-surface-variant">
        Four of these nodes are a simulation. The fifth opened a socket to a mail server and came
        back with an id, <span className={a.text}>go and check the inbox</span>. That is the
        difference between a workflow diagram and a workflow.
      </p>
    </DemoPanel>
  );
}
