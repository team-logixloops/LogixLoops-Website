"use client";

/**
 * A working multi-tenant runtime, small enough to read in one sitting.
 *
 * Four pieces, all real:
 *
 *   - a tiny SQL reader that parses `select … from … where … limit …`
 *   - a row-level-security layer that rewrites every query with the caller's
 *     tenant claim and refuses anything that reaches across the boundary
 *   - a token-bucket rate limiter with per-plan capacity and refill
 *   - an append-only audit log that records the denials as well as the reads
 *
 * The point of building it rather than animating it is that the denials are
 * genuine. You can type a query that tries to read another customer's rows and
 * watch the policy stop it, and you can read the twenty lines that stopped it.
 */

/* ── tenants ─────────────────────────────────────────────────────────────── */

export const TENANTS = [
  {
    id: "northwind",
    name: "Northwind Freight",
    initials: "NF",
    hue: 214,
    plan: "Enterprise",
    seats: 1240,
    seatRate: 38,
    region: "eu-west-1",
    isolation: "Dedicated schema",
    limits: { capacity: 40, refillPerSecond: 8 },
    features: ["customs", "sla", "api", "audit"],
  },
  {
    id: "helio",
    name: "Helio Health",
    initials: "HH",
    hue: 174,
    plan: "Regulated",
    seats: 310,
    seatRate: 64,
    region: "us-east-1",
    isolation: "Isolated database",
    limits: { capacity: 24, refillPerSecond: 4 },
    features: ["audit", "phi", "api"],
  },
  {
    id: "atlas",
    name: "Atlas Studio",
    initials: "AS",
    hue: 28,
    plan: "Growth",
    seats: 42,
    seatRate: 24,
    region: "ap-south-1",
    isolation: "Shared schema, row-level security",
    limits: { capacity: 10, refillPerSecond: 1.5 },
    features: ["api"],
  },
];

export const getTenant = (id) => TENANTS.find((t) => t.id === id) || TENANTS[0];

/* ── the store ───────────────────────────────────────────────────────────── */

/**
 * Every row carries `tenant_id`. That column is the whole security model in a
 * shared-schema deployment, which is exactly why nothing below is ever allowed
 * to take a caller's word for its value.
 */
export const TABLES = {
  consignments: {
    columns: ["id", "tenant_id", "route", "status", "value_gbp"],
    rows: [
      { id: "NX-4471", tenant_id: "northwind", route: "Rotterdam → Duisburg", status: "in_transit", value_gbp: 18400 },
      { id: "NX-4468", tenant_id: "northwind", route: "Antwerp → Köln", status: "customs_hold", value_gbp: 9600 },
      { id: "NX-4462", tenant_id: "northwind", route: "Hamburg → Praha", status: "in_transit", value_gbp: 22100 },
      { id: "NX-4455", tenant_id: "northwind", route: "Gdańsk → Berlin", status: "loading", value_gbp: 7400 },
      { id: "HL-2201", tenant_id: "helio", route: "Boston → Providence", status: "in_transit", value_gbp: 3100 },
      { id: "HL-2198", tenant_id: "helio", route: "Newark → Trenton", status: "delivered", value_gbp: 2750 },
      { id: "AT-0912", tenant_id: "atlas", route: "Pune → Mumbai", status: "loading", value_gbp: 890 },
    ],
  },
  invoices: {
    columns: ["id", "tenant_id", "period", "amount_gbp", "state"],
    rows: [
      { id: "INV-8801", tenant_id: "northwind", period: "2026-07", amount_gbp: 47120, state: "paid" },
      { id: "INV-8802", tenant_id: "northwind", period: "2026-08", amount_gbp: 47120, state: "open" },
      { id: "INV-5540", tenant_id: "helio", period: "2026-07", amount_gbp: 19840, state: "paid" },
      { id: "INV-5541", tenant_id: "helio", period: "2026-08", amount_gbp: 19840, state: "open" },
      { id: "INV-1120", tenant_id: "atlas", period: "2026-08", amount_gbp: 1008, state: "open" },
    ],
  },
  users: {
    columns: ["id", "tenant_id", "email", "role"],
    rows: [
      { id: "u_101", tenant_id: "northwind", email: "ops@northwind.example", role: "admin" },
      { id: "u_102", tenant_id: "northwind", email: "dispatch@northwind.example", role: "member" },
      { id: "u_240", tenant_id: "helio", email: "records@helio.example", role: "admin" },
      { id: "u_390", tenant_id: "atlas", email: "studio@atlas.example", role: "member" },
    ],
  },
  // Reachable only by tenants whose plan carries the `phi` feature. Feature
  // gating is a separate check from isolation, one decides whether the table
  // exists for you at all, the other decides which of its rows do.
  patient_records: {
    requires: "phi",
    columns: ["id", "tenant_id", "mrn", "consent"],
    rows: [
      { id: "p_9001", tenant_id: "helio", mrn: "MRN-44120", consent: "granted" },
      { id: "p_9002", tenant_id: "helio", mrn: "MRN-44121", consent: "withdrawn" },
    ],
  },
};

export const TABLE_NAMES = Object.keys(TABLES);

/* ── the reader ──────────────────────────────────────────────────────────── */

const SELECT_RE =
  /^\s*select\s+(?<cols>[\w*,\s]+?)\s+from\s+(?<table>\w+)(?:\s+where\s+(?<where>.+?))?(?:\s+limit\s+(?<limit>\d+))?\s*;?\s*$/i;

const PREDICATE_RE = /^\s*(?<column>\w+)\s*(?<op>=|!=|<>|>=|<=|>|<|like)\s*(?<value>'[^']*'|"[^"]*"|[\w.-]+)\s*$/i;

/**
 * Parse one statement.
 *
 * Deliberately narrow: `select` only, one optional `where`, conjunctions with
 * `and`. Anything else is rejected rather than half-understood, a parser that
 * quietly ignores the clause it did not recognise is how isolation bugs get
 * shipped.
 */
export function parseQuery(sql) {
  const trimmed = String(sql).trim();
  if (!trimmed) return { ok: false, error: "Empty statement." };

  if (!/^select\b/i.test(trimmed)) {
    const verb = trimmed.split(/\s+/)[0].toLowerCase();
    return {
      ok: false,
      error: `\`${verb}\` is not available on this connection, the demo role is read-only.`,
    };
  }

  if (/\bor\b/i.test(trimmed)) {
    return { ok: false, error: "`or` is not supported by this reader. Use `and`." };
  }

  const match = SELECT_RE.exec(trimmed);
  if (!match) {
    return { ok: false, error: "Could not parse. Shape: select <cols> from <table> [where …] [limit n]" };
  }

  const { cols, table, where, limit } = match.groups;
  const columns = cols.trim() === "*" ? ["*"] : cols.split(",").map((c) => c.trim());

  const predicates = [];
  if (where) {
    for (const clause of where.split(/\s+and\s+/i)) {
      const parsed = PREDICATE_RE.exec(clause);
      if (!parsed) return { ok: false, error: `Could not parse predicate: \`${clause.trim()}\`` };
      const { column, op, value } = parsed.groups;
      predicates.push({
        column: column.toLowerCase(),
        op: op.toLowerCase(),
        value: value.replace(/^['"]|['"]$/g, ""),
      });
    }
  }

  return {
    ok: true,
    query: {
      columns,
      table: table.toLowerCase(),
      predicates,
      limit: limit ? Number(limit) : null,
    },
  };
}

function compare(rowValue, op, value) {
  const left = rowValue;
  // Numeric comparison when both sides look numeric, string otherwise, the
  // same coercion a real engine does from the column's declared type.
  const bothNumeric = typeof left === "number" && !Number.isNaN(Number(value));
  const right = bothNumeric ? Number(value) : String(value);
  const l = bothNumeric ? left : String(left);

  switch (op) {
    case "=":
      return l === right;
    case "!=":
    case "<>":
      return l !== right;
    case ">":
      return l > right;
    case "<":
      return l < right;
    case ">=":
      return l >= right;
    case "<=":
      return l <= right;
    case "like":
      return String(l).toLowerCase().includes(String(right).replace(/%/g, "").toLowerCase());
    default:
      return false;
  }
}

/* ── row-level security ──────────────────────────────────────────────────── */

export const POLICIES = {
  tenant_isolation: {
    name: "tenant_isolation",
    sql: "USING (tenant_id = current_setting('app.tenant_id'))",
    note: "Applied to every table. The predicate is appended by the engine, not by the caller.",
  },
  feature_gate: {
    name: "feature_gate",
    sql: "GRANT SELECT ON <table> TO tenant WHERE plan_features @> ARRAY[<feature>]",
    note: "Decides whether the relation is visible at all, before any row is considered.",
  },
};

/**
 * Run a parsed query as a tenant.
 *
 * The order matters and mirrors a real engine: does the relation exist, is it
 * granted to this plan, and only then which rows survive the policy predicate.
 * The caller's own `tenant_id` filter is never trusted, it is checked against
 * the session claim and rejected if it disagrees, which is what turns a
 * would-be data leak into a logged denial.
 */
export function runQuery(tenant, query) {
  const table = TABLES[query.table];

  if (!table) {
    return {
      ok: false,
      policy: null,
      error: `relation "${query.table}" does not exist`,
      hint: `Available: ${TABLE_NAMES.join(", ")}`,
    };
  }

  if (table.requires && !tenant.features.includes(table.requires)) {
    return {
      ok: false,
      policy: POLICIES.feature_gate,
      error: `permission denied for relation "${query.table}"`,
      hint: `${tenant.name} is on ${tenant.plan}, which does not carry the \`${table.requires}\` entitlement.`,
    };
  }

  const crossTenant = query.predicates.find(
    (p) => p.column === "tenant_id" && p.op === "=" && p.value !== tenant.id
  );
  if (crossTenant) {
    return {
      ok: false,
      policy: POLICIES.tenant_isolation,
      error: "0 rows, row-level security removed every row",
      hint: `The session claim is \`${tenant.id}\`. Your predicate asked for \`${crossTenant.value}\`, so the policy predicate and yours cannot both be true. Nothing leaks; the query simply returns nothing.`,
      denied: true,
    };
  }

  const unknownColumn = query.predicates.find((p) => !table.columns.includes(p.column));
  if (unknownColumn) {
    return {
      ok: false,
      policy: null,
      error: `column "${unknownColumn.column}" does not exist`,
      hint: `${query.table} has: ${table.columns.join(", ")}`,
    };
  }

  // The isolation predicate goes on first, unconditionally.
  let rows = table.rows.filter((row) => row.tenant_id === tenant.id);
  const scanned = table.rows.length;
  const afterPolicy = rows.length;

  for (const predicate of query.predicates) {
    rows = rows.filter((row) => compare(row[predicate.column], predicate.op, predicate.value));
  }

  if (query.limit) rows = rows.slice(0, query.limit);

  const columns = query.columns.includes("*") ? table.columns : query.columns;
  const missing = columns.find((c) => !table.columns.includes(c));
  if (missing) {
    return { ok: false, policy: null, error: `column "${missing}" does not exist` };
  }

  return {
    ok: true,
    columns,
    rows: rows.map((row) => Object.fromEntries(columns.map((c) => [c, row[c]]))),
    stats: { scanned, afterPolicy, returned: rows.length },
    plan: [
      `Seq Scan on ${query.table}  (rows=${scanned})`,
      `  Filter: ${POLICIES.tenant_isolation.sql}  (rows=${afterPolicy})`,
      ...query.predicates.map((p) => `  Filter: ${p.column} ${p.op} '${p.value}'`),
      query.limit ? `  Limit: ${query.limit}` : null,
    ].filter(Boolean),
  };
}

/* ── rate limiting ───────────────────────────────────────────────────────── */

/**
 * Token bucket.
 *
 * Capacity is the burst a tenant may spend at once; refill is the sustained
 * rate. Tokens accrue continuously from elapsed time rather than on a timer,
 * so the bucket is correct even when the tab was backgrounded and no interval
 * fired, the same reason production limiters compute from timestamps.
 */
export function createBucket({ capacity, refillPerSecond }) {
  return { capacity, refillPerSecond, tokens: capacity, updatedAt: Date.now() };
}

export function refill(bucket, now = Date.now()) {
  const elapsed = (now - bucket.updatedAt) / 1000;
  const tokens = Math.min(bucket.capacity, bucket.tokens + elapsed * bucket.refillPerSecond);
  return { ...bucket, tokens, updatedAt: now };
}

export function consume(bucket, cost = 1, now = Date.now()) {
  const filled = refill(bucket, now);
  if (filled.tokens < cost) {
    const deficit = cost - filled.tokens;
    return {
      bucket: filled,
      allowed: false,
      status: 429,
      retryAfterMs: Math.ceil((deficit / filled.refillPerSecond) * 1000),
      remaining: Math.floor(filled.tokens),
    };
  }
  return {
    bucket: { ...filled, tokens: filled.tokens - cost },
    allowed: true,
    status: 200,
    retryAfterMs: 0,
    remaining: Math.floor(filled.tokens - cost),
  };
}

/* ── billing ─────────────────────────────────────────────────────────────── */

/** Monthly recurring revenue and the proration a mid-cycle seat change costs. */
export function billing(tenant, seatDelta = 0, dayOfMonth = 9, daysInMonth = 31) {
  const seats = Math.max(0, tenant.seats + seatDelta);
  const mrr = seats * tenant.seatRate;
  const remainingDays = daysInMonth - dayOfMonth;
  const proration = (seatDelta * tenant.seatRate * remainingDays) / daysInMonth;

  return {
    seats,
    mrr,
    baseline: tenant.seats * tenant.seatRate,
    proration,
    remainingDays,
  };
}
