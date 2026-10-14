import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Site-wide Open Graph / Twitter card image, generated at build time.
 * Route segments below inherit this unless they define their own.
 */
export const alt =
  "LogixLoops: Your Unfair Advantage. Brand, web, app and AI studio in Jaipur, selling kits with published prices.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Satori has no network and no access to `/public` URLs, so the mark has to
 * be inlined as a data URI. The PNG rather than the SVG: Satori's SVG
 * support doesn't cover the traced fox's fill rules, and this export comes
 * off the same curves the SVG ships, so it cannot drift from the vectors.
 *
 * Read at module scope, this runs once per build, not once per request.
 */
const lockup = readFileSync(
  join(process.cwd(), "public/brand/png/logo-horizontal-1024.png")
).toString("base64");
const LOCKUP_SRC = `data:image/png;base64,${lockup}`;

export default function OpengraphImage() {
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

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* The tagline carries the card, not a category label. A share in a
              Slack channel gets about one second of attention, and "Your
              Unfair Advantage" is the only three words on this site anyone
              repeats. The category line underneath is what makes the card
              legible to a crawler with no context. */}
          <div
            style={{
              display: "flex",
              fontSize: 96,
              lineHeight: 1.02,
              color: "#081d4a",
              letterSpacing: "-0.03em",
            }}
          >
            Your Unfair Advantage.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#336baf",
              lineHeight: 1.35,
            }}
          >
            Brand · Websites · Apps · SEO &amp; AI search · Automation
          </div>
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
    { ...size }
  );
}
