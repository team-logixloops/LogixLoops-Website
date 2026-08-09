import nodemailer from "nodemailer";
import { TEMPLATES } from "@/lib/mail/templates";
import { SITE_URL } from "@/lib/seo";

/**
 * POST /api/notify, the SMTP handoff behind the interactive demos.
 *
 * nodemailer opens a real socket, so this has to run on the Node runtime; the
 * edge runtime has no `net`.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ── abuse control ───────────────────────────────────────────────────────────
 *
 * This endpoint is reachable by anyone who loads a marketing page, so the
 * limits below are the price of having it at all. They are deliberately in
 * memory: the counters reset when the instance recycles, and a horizontally
 * scaled deployment enforces them per instance rather than globally. That is
 * weaker than Redis but strictly better than nothing, and the global hourly cap
 * bounds the worst case per instance anyway. If this ever grows past a demo,
 * move `hits` to a shared store, the call sites do not change.
 */
const WINDOW_MS = 60 * 60 * 1000;
const PER_IP = 3;
const PER_RECIPIENT = 2;
const MIN_DWELL_MS = 4000;

const hits = new Map(); // key -> number[] (timestamps)

function take(key, limit) {
  const now = Date.now();
  const fresh = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  if (fresh.length >= limit) {
    hits.set(key, fresh);
    return false;
  }
  fresh.push(now);
  hits.set(key, fresh);
  return true;
}

/** Drop expired buckets so a long-lived instance does not grow unbounded. */
function sweep() {
  const now = Date.now();
  for (const [key, stamps] of hits) {
    const fresh = stamps.filter((t) => now - t < WINDOW_MS);
    if (fresh.length === 0) hits.delete(key);
    else hits.set(key, fresh);
  }
}

function clientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

/* RFC 5322 in full is not worth it here, this rejects everything that would
 * make nodemailer throw, and the address has to be real to be useful anyway. */
const EMAIL_RE = /^[^\s@,;<>"]+@[^\s@,;<>".]+\.[a-z]{2,}$/i;

let transporter;

/** Built once per instance, nodemailer pools the connection across sends. */
function getTransporter() {
  if (transporter) return transporter;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD;
  if (!user || !pass) return null;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    // 587 is STARTTLS: connect in the clear, then upgrade. `secure: true` is
    // for implicit TLS on 465 and fails the handshake on 587.
    secure: false,
    requireTLS: true,
    auth: { user, pass },
    pool: true,
    maxConnections: 1,
    maxMessages: 20,
  });

  return transporter;
}

const fail = (status, message) =>
  Response.json({ ok: false, error: message }, { status });

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return fail(400, "Malformed request.");
  }

  const { template, to, payload, website, startedAt } = body || {};

  // Honeypot: a real form leaves this hidden field empty; scripted submissions
  // fill every input they find. Answer 200 so a bot learns nothing from it.
  if (typeof website === "string" && website.trim() !== "") {
    return Response.json({ ok: true, queued: true });
  }

  // A human reads the form before submitting it. Sub-4s means a script.
  const dwell = Date.now() - Number(startedAt || 0);
  if (!Number.isFinite(dwell) || dwell < MIN_DWELL_MS) {
    return fail(429, "That was too quick, give the form a moment and try again.");
  }

  const spec = TEMPLATES[template];
  if (!spec) return fail(400, "Unknown message type.");

  const recipient = String(to || "").trim().toLowerCase();
  if (!EMAIL_RE.test(recipient) || recipient.length > 254) {
    return fail(400, "That does not look like an email address.");
  }

  sweep();

  const globalCap = Number(process.env.DEMO_MAIL_HOURLY_CAP || 40);
  if (!take("__global__", globalCap)) {
    return fail(429, "The demo mailer has hit its hourly ceiling. Try again later.");
  }
  if (!take(`ip:${clientIp(request)}`, PER_IP)) {
    return fail(429, "You have sent a few of these already. Try again in an hour.");
  }
  if (!take(`to:${recipient}`, PER_RECIPIENT)) {
    return fail(429, "That address has already received this. Check the inbox, and spam.");
  }

  const transport = getTransporter();
  if (!transport) {
    return fail(
      503,
      "The mailer is not configured on this deployment. Set SMTP_USER and SMTP_APP_PASSWORD."
    );
  }

  // Every value that reaches the message goes through the template's own
  // coercion first, see the security note in lib/mail/templates.js.
  const parsed = spec.parse(payload || {});
  const runId = `run_${Math.random().toString(36).slice(2, 8)}`;
  const message = spec.build({ runId, ...parsed }, { siteUrl: SITE_URL });

  try {
    const info = await transport.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: recipient,
      bcc: process.env.SMTP_AUDIT_BCC || undefined,
      subject: message.subject,
      html: message.html,
      text: message.text,
      attachments: message.attachments,
    });

    return Response.json({
      ok: true,
      // The demos print this in their run log, it is the real SMTP message id,
      // which is what makes the send verifiable rather than merely claimed.
      messageId: info.messageId,
      accepted: info.accepted?.length || 0,
      response: info.response,
    });
  } catch (error) {
    // The SMTP error text can name the account and the auth failure mode, so it
    // stays server-side. The caller gets something it can render.
    console.error("[api/notify] send failed:", error);
    return fail(502, "The mail server rejected the message. Nothing was sent.");
  }
}
