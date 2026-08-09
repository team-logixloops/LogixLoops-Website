/**
 * LOGIXLOOPS: Open Graph card template
 *
 * One card design, filled per route. Every segment's `opengraph-image.js`
 * calls `ogCard()` with its own eyebrow, title, and subtitle, so a link to
 * /pricing shares as a pricing card rather than as the generic site card.
 *
 * Twitter needs no parallel `twitter-image.js` files: Next falls
 * `twitter:image` back to the resolved Open Graph image when the route does
 * not declare its own.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/** Shared by every segment: re-exported from each opengraph-image.js. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Satori has no network and no access to `/public` URLs, so the mark has to
 * be inlined as a data URI. The PNG rather than the SVG: Satori's SVG support
 * doesn't cover the traced fox's fill rules, and this export comes off the
 * same curves the SVG ships, so it cannot drift from the vectors.
 *
 * Read at module scope, so this runs once per build rather than once per
 * card, even though fifteen route segments import it.
 */
const lockup = readFileSync(
  join(process.cwd(), "public/brand/png/logo-horizontal-1024.png")
).toString("base64");
const LOCKUP_SRC = `data:image/png;base64,${lockup}`;

/**
 * Title size by length. A card is read at thumbnail scale in a Slack channel
 * or a LinkedIn feed, so the headline wants to be as large as it can be
 * without wrapping past three lines: fixed at 96px, "Enforcing Zero-Trust in
 * Multi-Tenant Kubernetes" overflows the frame and gets clipped.
 */
function titleSize(title) {
  const length = title.length;
  if (length <= 22) return 96;
  if (length <= 38) return 78;
  if (length <= 58) return 62;
  return 50;
}

/**
 * Renders the shared card.
 *
 * @param {object} input
 * @param {string} input.eyebrow   Section label, e.g. "Case Study". Uppercased.
 * @param {string} input.title     The headline. Keep it under ~70 characters.
 * @param {string} [input.subtitle] One supporting line, clipped at 3 lines.
 */
export function ogCard({ eyebrow, title, subtitle }) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #ffffff 0%, #f1f6fd 55%, #dcecfd 100%)",
          padding: "80px",
        }}
      >
        {/* The mark itself, not the name typed out in whatever face Satori
            happens to fall back to. 1024×242 source, halved. */}
        <img src={LOCKUP_SRC} width={512} height={121} alt="" />

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                fontSize: 26,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#12a0b2",
              }}
            >
              {eyebrow}
            </div>
          ) : null}

          <div
            style={{
              display: "flex",
              fontSize: titleSize(title),
              lineHeight: 1.05,
              color: "#081d4a",
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>

          {subtitle ? (
            <div
              style={{
                display: "flex",
                fontSize: 30,
                color: "#336baf",
                lineHeight: 1.35,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            height: "10px",
            width: "260px",
            borderRadius: "999px",
            background: "linear-gradient(90deg, #2868c6 0%, #12a0b2 100%)",
          }}
        />
      </div>
    ),
    { ...OG_SIZE }
  );
}

/**
 * Card subtitles are read at a glance, so they run shorter than a meta
 * description. Cuts on a word boundary and only ellipsizes what it cut.
 */
export function clampSubtitle(text, max = 110) {
  const clean = String(text ?? "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, "")}…`;
}
