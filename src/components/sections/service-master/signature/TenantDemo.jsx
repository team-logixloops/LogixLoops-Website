"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { accent } from "../tokens";
import { downloadFile } from "@/lib/demo-mail";
import { DemoPanel, DemoControls, DemoButton, DemoLabel, DemoConsole, DemoSlider } from "./demo-shell";
import {
  TABLE_NAMES,
  TENANTS,
  billing,
  consume,
  createBucket,
  parseQuery,
  refill,
  runQuery,
} from "./lib/tenant-runtime";

/**
 * The tenant sandbox on /services/saas-platforms.
 *
 * One runtime, three customers, and a console you can actually attack. Type a
 * query that reaches for another tenant's rows and the policy engine stops it
 *, not with a canned "denied" animation, but by running your predicate
 * alongside the isolation predicate the engine appends, and returning what is
 * left. Which is nothing.
 *
 * The rate limiter is a real token bucket, so hammering it drains the burst
 * capacity, produces 429s, and then recovers at the refill rate while you
 * watch. Upgrading the plan mid-flight changes the capacity of the bucket that
 * is already draining.
 */

const SUGGESTIONS = [
  "select * from consignments",
  "select id, status from consignments where status = 'in_transit'",
  "select * from consignments where tenant_id = 'helio'",
  "select * from patient_records",
  "select id, amount_gbp from invoices where amount_gbp > 10000",
  "delete from invoices",
];

/**
 * Burst size and spacing, derived from the tenant's own bucket rather than
 * fixed. A flat 24 requests never drained Northwind's 40-token burst, it
 * refilled faster than the burst spent it, so the button produced a tidy row
 * of 200s and demonstrated nothing. The burst has to out-run capacity *plus*
 * whatever refills during it, or the limiter is not being shown at all.
 */
const HAMMER_GAP_MS = 20;

function hammerPlan(bucket) {
  const seconds = (count) => (count * HAMMER_GAP_MS) / 1000;
  // Solve count > capacity + refill × duration, then add headroom so the tail
  // of the burst is visibly rejected rather than only just clipping.
  const breakEven = bucket.capacity / (1 - (bucket.refillPerSecond * HAMMER_GAP_MS) / 1000);
  const count = Math.min(60, Math.ceil(breakEven * 1.35));
  return { count, duration: seconds(count) };
}

export default function TenantDemo({ color }) {
  const a = accent(color);

  const [tenantId, setTenantId] = useState(TENANTS[0].id);
  const tenant = TENANTS.find((t) => t.id === tenantId);

  const [sql, setSql] = useState(SUGGESTIONS[0]);
  const [result, setResult] = useState(null);
  const [audit, setAudit] = useState([]);
  const [seatDelta, setSeatDelta] = useState(0);

  const [bucket, setBucket] = useState(() => createBucket(tenant.limits));
  const [traffic, setTraffic] = useState([]);
  const [hammering, setHammering] = useState(false);
  const hammerTimers = useRef([]);

  const money = useCallback(
    (value) =>
      new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: 0,
      }).format(value),
    []
  );

  /* Switching tenant swaps the whole session: new claim, new bucket, new
     entitlements. Nothing carries over, that is the isolation boundary, and
     doing it in the handler rather than an effect keeps it a single render. */
  const switchTenant = (next) => {
    if (next.id === tenantId) return;
    hammerTimers.current.forEach(clearTimeout);
    hammerTimers.current = [];
    setTenantId(next.id);
    setBucket(createBucket(next.limits));
    setTraffic([]);
    setHammering(false);
    setResult(null);
    setSeatDelta(0);
  };

  /* The bucket refills from elapsed time; this interval only re-renders the
     meter. Stopping it would not lose tokens, it would just stop showing them. */
  useEffect(() => {
    const id = setInterval(() => setBucket((b) => refill(b)), 250);
    return () => clearInterval(id);
  }, []);

  useEffect(() => () => hammerTimers.current.forEach(clearTimeout), []);

  const execute = (statement) => {
    const source = statement ?? sql;
    const parsed = parseQuery(source);

    if (!parsed.ok) {
      const failure = { ok: false, error: parsed.error, syntax: true };
      setResult(failure);
      setAudit((prev) => [
        { tenant: tenant.id, sql: source, outcome: "rejected", detail: parsed.error, at: stamp() },
        ...prev,
      ].slice(0, 40));
      return;
    }

    // Every read spends a token. A limiter that only guards writes is not a
    // limiter, reads are what actually saturate a shared database.
    const spend = consume(bucket);
    setBucket(spend.bucket);
    if (!spend.allowed) {
      const throttled = {
        ok: false,
        error: `429 Too Many Requests, retry in ${spend.retryAfterMs}ms`,
        throttled: true,
      };
      setResult(throttled);
      setAudit((prev) => [
        { tenant: tenant.id, sql: source, outcome: "throttled", detail: "bucket empty", at: stamp() },
        ...prev,
      ].slice(0, 40));
      return;
    }

    const run = runQuery(tenant, parsed.query);
    setResult(run);
    setAudit((prev) => [
      {
        tenant: tenant.id,
        sql: source,
        outcome: run.ok ? "ok" : run.denied ? "denied" : "error",
        detail: run.ok ? `${run.stats.returned} rows` : run.error,
        at: stamp(),
      },
      ...prev,
    ].slice(0, 40));
  };

  /** Fire a burst at the limiter and record what each request got back. */
  const hammer = () => {
    if (hammering) return;
    setHammering(true);
    setTraffic([]);
    hammerTimers.current.forEach(clearTimeout);
    hammerTimers.current = [];

    const { count } = hammerPlan(bucket);
    let working = bucket;

    for (let i = 0; i < count; i += 1) {
      hammerTimers.current.push(
        setTimeout(() => {
          const outcome = consume(working);
          working = outcome.bucket;
          setBucket(outcome.bucket);
          setTraffic((prev) => [
            ...prev,
            { i: i + 1, status: outcome.status, remaining: outcome.remaining },
          ]);
          if (i === count - 1) setHammering(false);
        }, i * HAMMER_GAP_MS)
      );
    }
  };

  const bill = billing(tenant, seatDelta);
  const bucketPct = (bucket.tokens / bucket.capacity) * 100;
  const rejected = traffic.filter((t) => t.status === 429).length;

  return (
    <DemoPanel>
      <DemoControls>
        <DemoLabel>Session</DemoLabel>
        {TENANTS.map((t) => (
          <DemoButton
            key={t.id}
            color={color}
            active={t.id === tenantId}
            onClick={() => switchTenant(t)}
          >
            {t.name}
          </DemoButton>
        ))}
        <span className="ml-auto font-mono text-[11px] text-on-surface-variant">
          app.tenant_id = <span className={a.text}>&apos;{tenant.id}&apos;</span>
        </span>
      </DemoControls>

      {/* ── session header ── */}
      <div className="flex flex-wrap items-center gap-4 border-b border-outline-variant/30 px-4 py-4 md:px-6">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl font-display text-white transition-colors duration-500"
          style={{ background: `hsl(${tenant.hue} 62% 42%)` }}
        >
          {tenant.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-heading text-body-md text-on-surface">{tenant.name}</p>
          <p className="font-body text-body-sm text-on-surface-variant">
            {tenant.plan} · {tenant.region} · {tenant.isolation}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tenant.features.map((feature) => (
            <span
              key={feature}
              className={cn(
                "rounded-full px-2.5 py-1 font-label text-[10px] uppercase tracking-widest",
                a.soft,
                a.text
              )}
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-5 p-4 md:p-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        {/* ── query console ── */}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="rounded-2xl border border-outline-variant/30 bg-surface p-4">
            <p className="mb-2 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
              Query console, read-only role
            </p>
            <textarea
              rows={2}
              value={sql}
              spellCheck={false}
              onChange={(e) => setSql(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) execute();
              }}
              className="w-full resize-none rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-3 font-mono text-[12px] leading-relaxed text-on-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <DemoButton color={color} active onClick={() => execute()}>
                Run
              </DemoButton>
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                ⌘/Ctrl + Enter
              </span>
              <span className="ml-auto font-mono text-[10px] text-on-surface-variant">
                {TABLE_NAMES.join(" · ")}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setSql(suggestion);
                    execute(suggestion);
                  }}
                  className="rounded-full border border-outline-variant/40 px-2.5 py-1 font-mono text-[10px] text-on-surface-variant transition-colors hover:border-outline-variant hover:text-on-surface"
                >
                  {suggestion.length > 44 ? `${suggestion.slice(0, 42)}…` : suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* ── result ── */}
          <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest">
            {!result && (
              <p className="p-5 font-body text-body-sm leading-relaxed text-on-surface-variant">
                Run something. Then try the third suggestion, it asks for another customer&apos;s
                rows, and you will see exactly what the engine does with it.
              </p>
            )}

            {result && !result.ok && (
              <div className="p-5">
                <p
                  className={cn(
                    "mb-2 font-mono text-[12px]",
                    result.denied ? "text-on-surface" : "text-error"
                  )}
                >
                  {result.error}
                </p>
                {result.hint && (
                  <p className="font-body text-body-sm leading-relaxed text-on-surface-variant">
                    {result.hint}
                  </p>
                )}
                {result.policy && (
                  <div className="mt-4 rounded-xl border border-outline-variant/40 bg-surface p-3">
                    <p className="mb-1 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                      Policy that fired · {result.policy.name}
                    </p>
                    <p className={cn("font-mono text-[11px]", a.text)}>{result.policy.sql}</p>
                    <p className="mt-2 font-body text-body-sm text-on-surface-variant">
                      {result.policy.note}
                    </p>
                  </div>
                )}
              </div>
            )}

            {result?.ok && (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse font-mono text-[11px]">
                    <thead>
                      <tr className="border-b border-outline-variant/30">
                        {result.columns.map((c) => (
                          <th key={c} className="p-2.5 text-left font-normal text-on-surface-variant">
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.rows.map((row, i) => (
                        <tr key={i} className="border-b border-outline-variant/20 last:border-0">
                          {result.columns.map((c) => (
                            <td key={c} className="p-2.5 text-on-surface">
                              {String(row[c])}
                            </td>
                          ))}
                        </tr>
                      ))}
                      {result.rows.length === 0 && (
                        <tr>
                          <td
                            colSpan={result.columns.length}
                            className="p-4 text-center text-on-surface-variant"
                          >
                            0 rows
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-outline-variant/30 p-4">
                  <p className="mb-2 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                    Query plan
                  </p>
                  <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-on-surface-variant">
                    {result.plan.join("\n")}
                  </pre>
                  <p className="mt-3 font-body text-body-sm text-on-surface-variant">
                    {result.stats.scanned} rows in the table ·{" "}
                    <span className={a.text}>{result.stats.afterPolicy} survived isolation</span> ·{" "}
                    {result.stats.returned} returned.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── right rail ── */}
        <div className="flex min-w-0 flex-col gap-4">
          {/* Rate limiter */}
          <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
            <div className="mb-3 flex items-baseline justify-between">
              <p className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
                Token bucket
              </p>
              <span className="font-mono text-[11px] text-on-surface-variant">
                {Math.floor(bucket.tokens)}/{bucket.capacity} · +{bucket.refillPerSecond}/s
              </span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-outline-variant/25">
              <span
                className={cn(
                  "block h-full rounded-full transition-[width] duration-200",
                  bucketPct < 15 ? "bg-error" : a.dot
                )}
                style={{ width: `${bucketPct}%` }}
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <DemoButton color={color} active onClick={hammer} disabled={hammering}>
                {hammering ? "Firing…" : `Fire ${hammerPlan(bucket).count} requests`}
              </DemoButton>
              {traffic.length > 0 && (
                <span
                  className={cn(
                    "font-label text-label-caps uppercase tracking-widest",
                    rejected ? "text-error" : a.text
                  )}
                >
                  {rejected} × 429
                </span>
              )}
            </div>

            {traffic.length > 0 && (
              <div className="mt-3 flex gap-[3px]">
                {traffic.map((hit) => (
                  <span
                    key={hit.i}
                    title={`#${hit.i} → ${hit.status} (${hit.remaining} left)`}
                    className={cn(
                      "h-6 flex-1 rounded-sm",
                      hit.status === 429 ? "bg-error" : a.dot
                    )}
                  />
                ))}
              </div>
            )}

            <p className="mt-3 font-body text-body-sm leading-relaxed text-on-surface-variant">
              {tenant.plan} gets a burst of {bucket.capacity} and {bucket.refillPerSecond}/s
              sustained. Switch to Atlas and fire again, the same button produces a very different
              graph, because the plan is the bucket.
            </p>
          </div>

          {/* Billing */}
          <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
            <p className="mb-3 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
              Seats and billing
            </p>
            <DemoSlider
              label="Seats"
              value={seatDelta}
              min={-Math.min(tenant.seats, 200)}
              max={200}
              step={5}
              onChange={setSeatDelta}
              format={(v) => (v > 0 ? `+${v}` : String(v))}
            />
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 font-body text-body-sm">
              <dt className="text-on-surface-variant">Seats</dt>
              <dd className="text-right font-mono text-[11px] text-on-surface">{bill.seats}</dd>
              <dt className="text-on-surface-variant">MRR</dt>
              <dd className={cn("text-right font-mono text-[11px]", a.text)}>{money(bill.mrr)}</dd>
              <dt className="text-on-surface-variant">Proration ({bill.remainingDays}d left)</dt>
              <dd
                className={cn(
                  "text-right font-mono text-[11px]",
                  bill.proration < 0 ? "text-error" : "text-on-surface"
                )}
              >
                {bill.proration === 0 ? ". " : money(bill.proration)}
              </dd>
            </dl>
          </div>

          {/* Audit */}
          <div className="flex min-h-0 flex-col gap-2">
            <DemoConsole title={`Audit log · ${audit.length} entries`} className="max-h-52">
              {audit.length === 0 && <p>Nothing yet. Every attempt lands here, denials included.</p>}
              {audit.map((entry, i) => (
                <p key={i} className="truncate">
                  <span
                    className={cn(
                      entry.outcome === "ok"
                        ? a.text
                        : entry.outcome === "denied"
                          ? "text-on-surface"
                          : "text-error"
                    )}
                  >
                    {entry.at} {entry.outcome.padEnd(9)}
                  </span>
                  {entry.tenant} · {entry.detail}
                </p>
              ))}
            </DemoConsole>

            {audit.length > 0 && (
              <DemoButton
                color={color}
                onClick={() =>
                  downloadFile(
                    "logixloops-tenant-audit.json",
                    JSON.stringify({ tenant: tenant.id, entries: audit }, null, 2),
                    "application/json"
                  )
                }
              >
                Export audit log
              </DemoButton>
            )}
          </div>
        </div>
      </div>

      <p className="px-6 pb-6 font-body text-body-md leading-relaxed text-on-surface-variant">
        One deployment, one release train, three customers who cannot see each other. The isolation
        predicate is appended by the engine on every read, so{" "}
        <span className={a.text}>a forgotten `where` clause is not a data breach</span>, it is just
        a query that returns your own rows.
      </p>
    </DemoPanel>
  );
}

/** hh:mm:ss for the audit log. */
function stamp() {
  return new Date().toTimeString().slice(0, 8);
}
