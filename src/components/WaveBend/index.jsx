"use client";

import { useEffect, useId, useRef, useState } from "react";
import useWaveBend from "./useWaveBend";
import { isEmbedded } from "@/lib/embed";
import { GAP, MAX_VELOCITY, LOOP, IMAGE_SIZE } from "./config";

/**
 * Which branch to render, and, critically, when GSAP is allowed to touch it.
 *
 * `useWaveBend` pins its container with ScrollTrigger, and a pin physically
 * reparents that node into a GSAP-generated spacer. The original code mounted
 * the motion tree with GSAP already enabled, then decided from a mount effect
 * that a narrow or touch viewport should get the simplified tree instead. React
 * went to remove nodes GSAP had moved out from under it and threw
 * `NotFoundError: Failed to execute 'removeChild'`; the error boundary caught
 * it by blanking the whole page. It reproduced on every viewport under 768px,
 * every phone, and in every embedded copy of the site.
 *
 * The fix is to invert the order rather than to race it. `mode` is `null` until
 * the client has measured, and GSAP stays off for that first commit. Only a
 * resolved `full` turns the pin on, and by then the tree it pins is the tree
 * that stays for the life of the page. Resolving to `simple` unmounts markup
 * that was never pinned, which is an ordinary React removal.
 *
 * Deciding earlier is not an option worth taking: during hydration React
 * commits the server snapshot, and runs layout effects, before it can re-read
 * anything client-side, so any scheme that enables the pin on first commit has
 * the same race. Deciding *later* costs one commit and nothing else. The server
 * markup is unchanged, so the section still reserves its full height on desktop
 * and there is no new layout shift.
 */
const readSimplified = () =>
  isEmbedded() ||
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
  window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;

/**
 * Wave Bend Content, a horizontal track of text/image segments that
 * travels along an SVG path as the user scrolls (progress) and bends the
 * path into a sinusoid the faster they scroll (velocity), springing back
 * to a straight line at rest.
 *
 * `segments` comes entirely from props, this component only lays out
 * whatever it's given:
 *   { type: "text", content: string } | { type: "image", src: string, alt: string }
 *
 * `prefers-reduced-motion`, small or touch screens, and embedded copies of the
 * site all skip the pin/morph/ScrollTrigger machinery entirely and render the
 * same content as a plain flex row in normal document flow. The server always
 * emits the motion markup, it cannot measure a viewport, and the swap happens
 * client-side after mount, which is a normal post-hydration re-render, not a
 * mismatch. See the note above for why GSAP must not be armed before it.
 */
export default function WaveBend({
  segments,
  gap = GAP,
  maxVelocity = MAX_VELOCITY,
  loop = LOOP,
  className,
}) {
  const uid = useId().replace(/:/g, "");
  const lineId = `wb-line-${uid}`;
  const waveId = `wb-wave-${uid}`;
  const clipId = `wb-clip-${uid}`;

  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const lineRef = useRef(null);
  const waveRef = useRef(null);
  const segmentRefs = useRef([]);
  segmentRefs.current = [];

  /* Pin + per-frame morph + point-sampling is heavy, skipped on small and
     touch screens, under `prefers-reduced-motion`, and inside an embedded copy
     of the site, where a 300vh pinned section in a 393px device frame would be
     nonsense as well as expensive. */
  const [mode, setMode] = useState(null); // null → undecided, then "full" | "simple"
  const simplified = mode === "simple";

  useWaveBend({
    containerRef,
    pinRef,
    lineRef,
    waveRef,
    segmentRefs,
    segments,
    // Off while `mode` is still null. Nothing is pinned until we know the
    // pinned tree is the one that stays, see the note above.
    enabled: mode === "full",
    gap,
    maxVelocity,
    loop,
  });

  // The measurement genuinely belongs in an effect: it reads `matchMedia` and
  // the framing of the document, neither of which exists during render, and it
  // must not run before the first commit or it reintroduces the race above.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(readSimplified() ? "simple" : "full");
  }, []);

  if (simplified) {
    return (
      <section
        className={`bg-surface-container-low py-20 sm:py-28 ${className || ""}`}
        aria-label="LogixLoops engineering philosophy"
      >
        <div className="container-site flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {segments.map((segment, i) =>
            segment.type === "text" ? (
              <p
                key={i}
                className="font-display font-extrabold text-on-surface text-2xl sm:text-3xl"
              >
                {segment.content}
              </p>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={segment.src}
                alt={segment.alt || ""}
                width={64}
                height={64}
                className="h-16 w-16 rounded-2xl bg-primary-fixed p-3"
              />
            )
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative bg-surface-container-low ${className || ""}`}
      style={{
        background:
          "radial-gradient(55% 65% at 50% 45%, rgba(55,140,231,0.20) 0%, rgba(40,104,198,0.10) 45%, rgba(241,246,253,0) 75%), #f1f6fd",
      }}
      aria-label="LogixLoops engineering philosophy"
    >
      <div ref={pinRef} className="h-[300vh]">
        <div
          ref={containerRef}
          className="h-screen w-full overflow-hidden flex items-center justify-center"
        >
          <svg
            width="2577"
            height="391"
            viewBox="0 0 2577 391"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-auto max-w-none flex-shrink-0"
            style={{ height: "clamp(220px, 32vw, 391px)" }}
          >
            <defs>
              <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                <rect width="1" height="1" rx=".08" ry=".08" />
              </clipPath>
            </defs>
            <path
              ref={lineRef}
              id={lineId}
              d="M0 195H644H1288H1932H2576"
              stroke="none"
              fill="none"
            />
            <path
              ref={waveRef}
              id={waveId}
              d="M0.21875 190.5C0.21875 190.5 382.004 0.5 644.219 0.5C906.434 0.5 1051.3 78.1239 1288.22 190.5C1531.72 306 1668.87 390.5 1932.22 390.5C2195.57 390.5 2576.22 190.5 2576.22 190.5"
              stroke="#FFF"
              fill="none"
              opacity="0"
            />
            <g id={`wb-track-${uid}`}>
              {segments.map((segment, i) =>
                segment.type === "text" ? (
                  <text
                    key={i}
                    ref={(el) => (segmentRefs.current[i] = el)}
                    className="font-display font-extrabold"
                    fill="#081D4A"
                    fontSize="135"
                  >
                    <textPath href={`#${lineId}`} textAnchor="start">
                      {segment.content}
                    </textPath>
                  </text>
                ) : (
                  <image
                    key={i}
                    ref={(el) => (segmentRefs.current[i] = el)}
                    href={segment.src}
                    height={IMAGE_SIZE}
                    clipPath={`url(#${clipId})`}
                    preserveAspectRatio="xMidYMid slice"
                    role="img"
                    // `aria-label` alone, no nested <title>: an SVG <title>
                    // element is indistinguishable from the document <title>
                    // to anything parsing the raw HTML, so these were being
                    // concatenated onto the home page's title tag.
                    aria-label={segment.alt || ""}
                    style={{ backgroundColor: "#d7e7fb" }}
                  />
                )
              )}
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
