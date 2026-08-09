/**
 * Server-owned email templates for the /services/[slug] signature demos.
 *
 * SECURITY MODEL: read before adding a template.
 *
 * These demos live on a public marketing page, which makes /api/notify a
 * ready-made spam relay unless the body is locked down. So it is:
 *
 *   1. The recipient is only ever the address the visitor typed into the form.
 *      There is no `to` list, no cc, no forwarding.
 *   2. No visitor-supplied *text* reaches the message. Every template declares
 *      a `parse` function that coerces the incoming payload into primitives,
 *      integers, booleans, and values drawn from fixed enums. A free-text field
 *      is not accepted anywhere, so there is no payload an abuser could put in
 *      front of a stranger's eyes.
 *   3. Whatever prose exists is a constant in this file.
 *
 * That is stricter than escaping. Escaping stops HTML injection but still lets
 * someone mail arbitrary sentences to arbitrary addresses; a closed value space
 * stops both.
 */

import { renderDesignExport } from "../design-export";

/* ── shared chrome ───────────────────────────────────────────────────────── */

const BRAND = {
  name: "LogixLoops",
  ink: "#081d4a",
  muted: "#4a5a75",
  accent: "#2b4fa8",
  line: "#dfe4ee",
  surface: "#f6f7fb",
};

/** Wrap body HTML in a table-based shell that survives Outlook and Gmail. */
function shell({ preheader, heading, intro, bodyHtml, footNote }) {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${BRAND.surface};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.surface};padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid ${BRAND.line};border-radius:16px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <tr><td style="padding:28px 32px 0 32px;">
          <p style="margin:0 0 20px 0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:${BRAND.accent};font-weight:600;">${BRAND.name}</p>
          <h1 style="margin:0 0 12px 0;font-size:22px;line-height:1.3;color:${BRAND.ink};font-weight:700;">${heading}</h1>
          <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:${BRAND.muted};">${intro}</p>
        </td></tr>
        <tr><td style="padding:0 32px;">${bodyHtml}</td></tr>
        <tr><td style="padding:24px 32px 30px 32px;">
          <p style="margin:0;font-size:12px;line-height:1.6;color:${BRAND.muted};border-top:1px solid ${BRAND.line};padding-top:16px;">
            ${footNote} You received this because someone entered this address into an interactive demo on logixloops.in. It is a one-off message, there is no list, and nothing further will be sent.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function row(label, value) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};font-size:13px;color:${BRAND.muted};">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};font-size:13px;color:${BRAND.ink};text-align:right;font-weight:600;">${value}</td>
  </tr>`;
}

function table(rows) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows.join("")}</table>`;
}

function button(href, label) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 4px 0;"><tr>
    <td style="border-radius:999px;background:${BRAND.accent};">
      <a href="${href}" style="display:inline-block;padding:13px 26px;font-size:13px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:#ffffff;text-decoration:none;">${label}</a>
    </td></tr></table>`;
}

/* ── coercion helpers ────────────────────────────────────────────────────── */

const int = (v, min, max, fallback) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
};

const oneOf = (v, allowed, fallback) => (allowed.includes(v) ? v : fallback);

const bool = (v) => v === true || v === "true";

/* ── template 1: automation workflow receipt ─────────────────────────────── */

/**
 * The automation demo runs a five-node graph. The node copy is fixed here so
 * the visitor cannot author the sentences that land in the recipient's inbox,
 * they only choose which scenario ran.
 */
const WORKFLOW_SCENARIOS = [
  {
    id: "invoice",
    label: "Invoice intake",
    amount: "£2,480.00",
    reference: "PO-88213",
    route: "Auto-approved, under the £10,000 human-review threshold",
  },
  {
    id: "escalation",
    label: "Invoice intake",
    amount: "£14,900.00",
    reference: "PO-88240",
    route: "Held for approval, over the £10,000 human-review threshold",
  },
  {
    id: "retry",
    label: "Invoice intake",
    amount: "£640.00",
    reference: "PO-88251",
    route: "Auto-approved after 2 retries. ERP returned 503 twice",
  },
];

const WORKFLOW_STEPS = [
  "Trigger, document received on the shared inbox",
  "Extract, totals, dates, and PO number parsed",
  "Branch, approval policy evaluated",
  "Post, written to the ledger with retry and backoff",
  "Notify, this email",
];

/* ── template 3: mobile preview link ─────────────────────────────────────── */

/** Only real, indexable routes. A visitor cannot smuggle an off-site URL. */
const PREVIEW_ROUTES = [
  "/",
  "/services",
  "/case-studies",
  "/process",
  "/technology",
  "/pricing",
  "/about",
  "/contact",
  "/faq",
];

/* ── registry ────────────────────────────────────────────────────────────── */

export const TEMPLATES = {
  /** automation-systems, the Notify node of the workflow graph. */
  "workflow-receipt": {
    parse(payload = {}) {
      const scenario =
        WORKFLOW_SCENARIOS.find((s) => s.id === payload.scenario) || WORKFLOW_SCENARIOS[0];
      return { scenario, runId: payload.runId };
    },
    build({ scenario, runId }) {
      const rows = table([
        row("Document", scenario.label),
        row("Reference", scenario.reference),
        row("Amount", scenario.amount),
        row("Run", runId),
      ]);

      const steps = `<p style="margin:22px 0 8px 0;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:${BRAND.muted};font-weight:600;">Run log</p>
        <ol style="margin:0;padding-left:18px;font-size:13px;line-height:1.9;color:${BRAND.ink};">
          ${WORKFLOW_STEPS.map((s) => `<li>${s}</li>`).join("")}
        </ol>
        <p style="margin:16px 0 0 0;font-size:13px;line-height:1.6;color:${BRAND.muted};">${scenario.route}.</p>`;

      return {
        subject: `Workflow ${runId} completed, ${scenario.label}`,
        html: shell({
          preheader: `${scenario.label} processed automatically.`,
          heading: "Your workflow run completed",
          intro:
            "You fired the trigger on the automation demo. The graph ran end to end and its final node sent this, a real message from a real SMTP handoff, not a mock inbox.",
          bodyHtml: rows + steps,
          footNote: "This is the same notify step that posts to Slack or Teams in a live deployment.",
        }),
      };
    },
  },

  /** ui-ux-design, export of the tokens the visitor set in the editor. */
  "design-export": {
    parse(payload = {}) {
      return {
        hue: int(payload.hue, 0, 360, 232),
        radius: int(payload.radius, 0, 40, 16),
        space: int(payload.space, 4, 64, 20),
        scaleStep: int(payload.scaleStep, 100, 140, 125),
        dark: bool(payload.dark),
        font: oneOf(payload.font, ["grotesque", "geometric", "serif", "mono"], "grotesque"),
        density: oneOf(payload.density, ["comfortable", "compact"], "comfortable"),
      };
    },
    build(tokens) {
      const html = renderDesignExport(tokens);
      const rows = table([
        row("Accent hue", `${tokens.hue}°`),
        row("Corner radius", `${tokens.radius}px`),
        row("Base spacing", `${tokens.space}px`),
        row("Type scale", `${(tokens.scaleStep / 100).toFixed(3)}×`),
        row("Typeface", tokens.font),
        row("Density", tokens.density),
        row("Theme", tokens.dark ? "dark" : "light"),
      ]);

      return {
        subject: "Your design system export",
        html: shell({
          preheader: "The tokens you set, exported as a standalone HTML file.",
          heading: "Your design system export",
          intro:
            "Attached is the page you just built in the editor, one self-contained HTML file with the token layer at the top of its stylesheet. Open it anywhere; it has no dependencies.",
          bodyHtml: rows,
          footNote: "Change a token in the attached file and every component below it follows.",
        }),
        attachments: [
          {
            filename: "logixloops-design-system.html",
            content: html,
            contentType: "text/html; charset=utf-8",
          },
        ],
      };
    },
  },

  /** mobile-apps, link to the route the visitor was browsing in the frame. */
  "mobile-preview": {
    parse(payload = {}) {
      return { path: oneOf(payload.path, PREVIEW_ROUTES, "/") };
    },
    build({ path }, { siteUrl }) {
      const href = `${siteUrl}${path === "/" ? "" : path}`;
      return {
        subject: "Open this on your phone",
        html: shell({
          preheader: "The page you were previewing in the device frame.",
          heading: "Open this on your phone",
          intro:
            "You were browsing our site inside a device frame on desktop. Here is the same page, tap through and compare it against the frame you just used.",
          bodyHtml:
            button(href, "Open the page") +
            `<p style="margin:14px 0 0 0;font-size:12px;color:${BRAND.muted};word-break:break-all;">${href}</p>`,
          footNote: "Same build, same code path, nothing about it is a mobile-only variant.",
        }),
      };
    },
  },
};

export const TEMPLATE_IDS = Object.keys(TEMPLATES);
export { WORKFLOW_SCENARIOS, PREVIEW_ROUTES };
