"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { accent } from "../tokens";
import { IPhoneMockup, iphoneSpec } from "@/components/ui/iphone-mockup";
import { downloadFile } from "@/lib/demo-mail";
import {
  DemoPanel,
  DemoControls,
  DemoButton,
  DemoLabel,
  DemoToggle,
  DemoSegmented,
  DemoConsole,
  DemoEmailForm,
} from "./demo-shell";
import {
  STATUS_LABELS,
  STRATEGIES,
  createSync,
  enqueue,
  exportOutbox,
  officeEdit,
  setOnline,
  setStrategy,
  step,
} from "./lib/offline-sync";

/**
 * The app on /services/mobile-apps.
 *
 * The web-development page already puts this site inside a phone, so this one
 * answers the question that actually decides whether a business needs an app at
 * all: what happens with no signal.
 *
 * Everything below runs a real offline-sync engine (lib/offline-sync.js), a
 * durable outbox, optimistic local writes, exponential backoff with jitter,
 * and version-vector conflict detection against a server copy that genuinely
 * drifts while the device is offline. Cut the network and keep working; the
 * screen responds instantly because the write landed locally. Restore it and
 * watch the queue drain in order, with whatever the office changed in the
 * meantime resolved by the strategy you picked.
 *
 * A browser tab cannot do this. That is the argument, and it is running rather
 * than being asserted.
 */

const TICK_MS = 120;
const MAX_FRAME_HEIGHT = 580;

const STATUS_FLOW = {
  scheduled: "en_route",
  en_route: "on_site",
  on_site: "done",
  blocked: "en_route",
  done: "done",
};

export default function PhoneScrollDemo({ color }) {
  const a = accent(color);

  const [sync, setSync] = useState(createSync);
  const [tab, setTab] = useState("jobs");
  const [noteFor, setNoteFor] = useState(null);
  const [draft, setDraft] = useState("");
  const [scale, setScale] = useState(0.6);

  const stageRef = useRef(null);
  const spec = iphoneSpec("15-pro");
  const outerWidth = spec.w + spec.bezel * 2;
  const outerHeight = spec.h + spec.bezel * 2;

  /* Fit the device to whatever room the panel has. The frame is scaled, not
     resized, so the app inside lays out against a true 393px viewport. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const observer = new ResizeObserver(() =>
      setScale(Math.min(stage.clientWidth / outerWidth, MAX_FRAME_HEIGHT / outerHeight, 1))
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, [outerWidth, outerHeight]);

  /* The engine's clock. Runs regardless of connection state, the queue has to
     keep ageing so backoff timers mean something. */
  useEffect(() => {
    const id = setInterval(() => setSync((s) => step(s, TICK_MS)), TICK_MS);
    return () => clearInterval(id);
  }, []);

  // Push banners are transient, like the real thing.
  useEffect(() => {
    if (!sync.banner) return undefined;
    const id = setTimeout(() => setSync((s) => ({ ...s, banner: null })), 3800);
    return () => clearTimeout(id);
  }, [sync.banner]);

  const advance = (job) =>
    setSync((s) => enqueue(s, { jobId: job.id, type: "status", value: STATUS_FLOW[job.status] }));

  const saveNote = () => {
    if (!noteFor || draft.trim().length === 0) return;
    setSync((s) => enqueue(s, { jobId: noteFor, type: "note", value: draft.trim() }));
    setDraft("");
    setNoteFor(null);
  };

  const queued = sync.outbox.length;
  const strategy = STRATEGIES.find((s) => s.id === sync.strategy);

  return (
    <DemoPanel>
      <DemoControls>
        <DemoToggle
          color={color}
          checked={!sync.online}
          onChange={(v) => setSync((s) => setOnline(s, !v))}
          label="Airplane mode"
        />
        <DemoButton color={color} onClick={() => setSync(officeEdit)}>
          Office edits a job
        </DemoButton>
        <DemoSegmented
          color={color}
          label="On conflict"
          value={sync.strategy}
          options={STRATEGIES.map((s) => ({ id: s.id, label: s.label }))}
          onChange={(id) => setSync((s) => setStrategy(s, id))}
        />
        <DemoLabel>
          {queued} queued · {sync.stats.delivered} delivered
        </DemoLabel>
      </DemoControls>

      <div className="grid gap-6 p-4 md:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-8">
        {/* ── the device ── */}
        <div ref={stageRef} className="flex justify-center">
          <div style={{ width: outerWidth * scale, height: outerHeight * scale }}>
            <IPhoneMockup
              model="15-pro"
              color="natural-titanium"
              scale={scale}
              screenBg="#0b1220"
              frameStyle={
                !sync.online
                  ? { boxShadow: "0 0 0 3px rgba(186,26,26,.45), 0 18px 40px rgba(0,0,0,.4)" }
                  : undefined
              }
            >
              <div className="relative flex h-full w-full flex-col bg-[#0b1220] text-white">
                {/* Status bar */}
                <div className="flex shrink-0 items-center justify-between px-5 pb-1 pt-1">
                  <span className="font-label text-[11px] tracking-wide">9:41</span>
                  <span className="flex items-center gap-1">
                    {sync.online ? (
                      <>
                        <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
                        <span className="material-symbols-outlined text-[14px]">wifi</span>
                      </>
                    ) : (
                      <span className="material-symbols-outlined text-[14px] text-red-400">
                        airplanemode_active
                      </span>
                    )}
                    <span className="material-symbols-outlined text-[14px]">battery_full_alt</span>
                  </span>
                </div>

                {/* Push banner */}
                {sync.banner && (
                  <div className="absolute inset-x-3 top-3 z-30 rounded-2xl bg-white/12 p-3 backdrop-blur-xl">
                    <p className="font-label text-[10px] uppercase tracking-widest text-white/60">
                      Dispatch
                    </p>
                    <p className="font-heading text-[13px]">{sync.banner.title}</p>
                    <p className="font-body text-[11px] text-white/70">{sync.banner.body}</p>
                  </div>
                )}

                {/* App bar */}
                <div className="flex shrink-0 items-center justify-between px-4 pb-3 pt-2">
                  <div>
                    <p className="font-label text-[10px] uppercase tracking-widest text-white/50">
                      Today · 4 jobs
                    </p>
                    <p className="font-heading text-[17px]">Field Service</p>
                  </div>
                  <span
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-2.5 py-1 font-label text-[9px] uppercase tracking-widest",
                      sync.online ? "bg-emerald-400/15 text-emerald-300" : "bg-red-400/15 text-red-300"
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full", sync.online ? "bg-emerald-400" : "bg-red-400")} />
                    {sync.online ? (queued ? "Syncing" : "Synced") : "Offline"}
                  </span>
                </div>

                {/* Outbox strip, the honest bit of chrome most apps hide */}
                {queued > 0 && (
                  <div className="mx-4 mb-2 shrink-0 rounded-xl bg-white/8 px-3 py-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label text-[9px] uppercase tracking-widest text-white/60">
                        Outbox · {queued}
                      </span>
                      <span className="font-mono text-[10px] text-white/50">
                        {sync.inflight ? "sending…" : sync.online ? "waiting" : "held"}
                      </span>
                    </div>
                    <div className="mt-1.5 flex gap-1">
                      {sync.outbox.slice(0, 12).map((m) => (
                        <span
                          key={m.id}
                          className={cn(
                            "h-1 flex-1 rounded-full",
                            m.state === "sending" ? "bg-emerald-400" : m.attempts > 0 ? "bg-amber-400" : "bg-white/30"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Job list */}
                <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto px-4 pb-2">
                  <div className="flex flex-col gap-2">
                    {sync.local.map((job) => (
                      <div
                        key={job.id}
                        className={cn(
                          "rounded-2xl border p-3 transition-colors",
                          job.pending ? "border-amber-400/40 bg-white/8" : "border-white/10 bg-white/5"
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-heading text-[13px]">{job.ref}</p>
                            <p className="truncate font-body text-[11px] text-white/60">{job.site}</p>
                          </div>
                          <span className="shrink-0 font-mono text-[9px] text-white/40">v{job.version}</span>
                        </div>

                        <div className="mt-2 flex items-center justify-between gap-2">
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 font-label text-[9px] uppercase tracking-widest",
                              job.status === "done"
                                ? "bg-emerald-400/15 text-emerald-300"
                                : job.status === "blocked"
                                  ? "bg-red-400/15 text-red-300"
                                  : "bg-white/10 text-white/70"
                            )}
                          >
                            {STATUS_LABELS[job.status]}
                          </span>
                          <span className="font-mono text-[10px] text-white/40">{job.window}</span>
                        </div>

                        {job.note && (
                          <p className="mt-2 border-t border-white/10 pt-2 font-body text-[10px] text-white/60">
                            {job.note}
                          </p>
                        )}

                        <div className="mt-2 flex gap-2">
                          <button
                            type="button"
                            onClick={() => advance(job)}
                            disabled={job.status === "done"}
                            className="flex-1 rounded-full bg-white/12 py-1.5 font-label text-[9px] uppercase tracking-widest disabled:opacity-35"
                          >
                            {job.status === "done" ? "Closed" : `Mark ${STATUS_LABELS[STATUS_FLOW[job.status]]}`}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setNoteFor(job.id);
                              setDraft("");
                            }}
                            className="rounded-full bg-white/12 px-3 py-1.5 font-label text-[9px] uppercase tracking-widest"
                          >
                            Note
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Note sheet */}
                {noteFor && (
                  <div className="absolute inset-x-0 bottom-0 z-30 rounded-t-3xl border-t border-white/15 bg-[#111a2c] p-4">
                    <span className="mx-auto mb-3 block h-1 w-10 rounded-full bg-white/25" />
                    <p className="mb-2 font-label text-[10px] uppercase tracking-widest text-white/60">
                      Add a note
                    </p>
                    <textarea
                      rows={2}
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="Compressor cycling, replaced contactor…"
                      className="w-full resize-none rounded-xl border border-white/15 bg-white/5 p-2 font-body text-[12px] text-white placeholder:text-white/35 focus:outline-none"
                    />
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setNoteFor(null)}
                        className="flex-1 rounded-full bg-white/10 py-2 font-label text-[10px] uppercase tracking-widest"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={saveNote}
                        className="flex-1 rounded-full bg-white py-2 font-label text-[10px] uppercase tracking-widest text-[#0b1220]"
                      >
                        Save offline
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </IPhoneMockup>
          </div>
        </div>

        {/* ── side rail ── */}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Queued" value={queued} accent={a} warn={queued > 0} />
            <Stat label="Delivered" value={sync.stats.delivered} accent={a} />
            <Stat label="Retries" value={sync.stats.retries} accent={a} warn={sync.stats.retries > 0} />
            <Stat label="Conflicts" value={sync.stats.conflicts} accent={a} warn={sync.stats.conflicts > 0} />
          </div>

          <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
            <p className="mb-2 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
              Conflict policy · {strategy.label}
            </p>
            <p className="font-body text-body-sm leading-relaxed text-on-surface-variant">
              {strategy.blurb}
            </p>
            <p className="mt-3 font-body text-body-sm leading-relaxed text-on-surface-variant">
              Go offline, change a job, press{" "}
              <span className={a.text}>Office edits a job</span>, then come back online. Both writers
              moved; the policy decides who keeps what.
            </p>
          </div>

          <DemoSegmented
            color={color}
            label="Pane"
            value={tab}
            options={[
              { id: "jobs", label: "Server" },
              { id: "outbox", label: "Outbox" },
              { id: "log", label: "Log" },
            ]}
            onChange={setTab}
          />

          {tab === "jobs" && (
            <DemoConsole title="Server copy, what the office sees" className="max-h-56">
              {sync.server.map((job) => {
                const local = sync.local.find((l) => l.id === job.id);
                const diverged = local && (local.status !== job.status || local.version !== job.version);
                return (
                  <p key={job.id} className={diverged ? "text-error" : undefined}>
                    {job.ref} v{job.version} {job.status}
                    {diverged ? `  ← device: v${local.version} ${local.status}` : ""}
                  </p>
                );
              })}
            </DemoConsole>
          )}

          {tab === "outbox" && (
            <DemoConsole title="Durable outbox, survives the signal" className="max-h-56">
              {sync.outbox.length === 0 && <p>Empty. Every write has been acknowledged.</p>}
              {sync.outbox.map((m) => (
                <p key={m.id} className={m.attempts > 0 ? "text-tertiary" : undefined}>
                  {m.ref} {m.type}={m.value} base=v{m.base} attempts={m.attempts} {m.state}
                </p>
              ))}
            </DemoConsole>
          )}

          {tab === "log" && (
            <DemoConsole title="Sync log" className="max-h-56">
              {sync.log.length === 0 && <p>Idle.</p>}
              {sync.log.map((entry) => (
                <p
                  key={entry.id}
                  className={
                    entry.tone === "ok"
                      ? "text-on-surface"
                      : entry.tone === "warn"
                        ? "text-tertiary"
                        : entry.tone === "error"
                          ? "text-error"
                          : undefined
                  }
                >
                  <span className="opacity-50">{(entry.at / 1000).toFixed(1)}s</span> {entry.line}
                </p>
              ))}
            </DemoConsole>
          )}

          <div className="flex flex-wrap gap-2">
            <DemoButton
              color={color}
              onClick={() =>
                downloadFile(
                  "logixloops-outbox.json",
                  JSON.stringify(exportOutbox(sync), null, 2),
                  "application/json"
                )
              }
            >
              Export state
            </DemoButton>
            <DemoButton color={color} onClick={() => setSync(createSync())}>
              Reset
            </DemoButton>
          </div>

          <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
            <p className="mb-2 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
              Want the write-up?
            </p>
            <DemoEmailForm
              color={color}
              template="mobile-preview"
              payload={() => ({ path: "/loops" })}
              cta="Email it"
              stacked
              hint="A real message over SMTP. One send, no list, nothing stored."
            />
          </div>
        </div>
      </div>

      <p className="px-6 pb-6 font-body text-body-md leading-relaxed text-on-surface-variant">
        Turn on airplane mode and keep working, the screen answers instantly because the write
        landed on the device first, and the outbox holds it in order until there is a network to
        take it.{" "}
        <span className={a.text}>That is the whole case for an app instead of a browser tab</span>,
        and it is the part that is genuinely hard to build.
      </p>
    </DemoPanel>
  );
}

function Stat({ label, value, accent: a, warn }) {
  return (
    <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-3">
      <p className={cn("font-display text-xl leading-none", warn ? "text-error" : a.text)}>{value}</p>
      <p className="mt-1 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
        {label}
      </p>
    </div>
  );
}
