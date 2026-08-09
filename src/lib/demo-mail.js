"use client";

/**
 * Client half of the demo mailer.
 *
 * The demos never build a message, they name a template and hand over a small
 * bag of primitives. Everything the recipient reads is authored server-side in
 * lib/mail/templates.js, which is what keeps a public form off the open-relay
 * list. See the security note there.
 */

/**
 * @param {object}  args
 * @param {string}  args.template  template id registered in lib/mail/templates
 * @param {string}  args.to        recipient, the address the visitor typed
 * @param {object} [args.payload]  template-specific primitives
 * @param {number}  args.startedAt Date.now() from when the form was mounted
 * @param {string} [args.website]  honeypot value; leave as the field's value
 */
export async function sendDemoMail({ template, to, payload, startedAt, website = "" }) {
  const response = await fetch("/api/notify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ template, to, payload, startedAt, website }),
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    /* A proxy or a crash can return HTML; fall through to the status check. */
  }

  if (!response.ok || !data.ok) {
    throw new Error(data.error || `Send failed (${response.status}).`);
  }

  return data;
}

/** Trigger a real file download from a string. Used by the export demos. */
export function downloadFile(filename, contents, type = "text/html;charset=utf-8") {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Revoking synchronously races the download in Safari; a tick is enough.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
