"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/* The ladder. Each row's bottom word is the next row's top word, so rolling
   every row up by one line moves the whole stair up a step — the blank at the
   top and the blank at the bottom are what give it somewhere to go.

   Same shape as the reference's INFINITE → PROGRESS → INNOVATION ladder, with
   the six words this studio actually uses. */
const DEFAULT_LINES = [
  { top: " ", bottom: "PLATFORMS" },
  { top: "PLATFORMS", bottom: "PRODUCTS" },
  { top: "PRODUCTS", bottom: "PIPELINES" },
  { top: "PIPELINES", bottom: "SYSTEMS" },
  { top: "SYSTEMS", bottom: "OWNERSHIP" },
  { top: "OWNERSHIP", bottom: "LOGIXLOOPS" },
  { top: "LOGIXLOOPS", bottom: " " },
];

/**
 * LayeredText — the isometric stair of words.
 *
 * The geometry is the reference component's, untouched: alternating rows
 * carry `skew(60deg, -30deg) scaleY(0.66667)` and `skew(0deg, -30deg)
 * scaleY(1.33333)`, each row steps sideways from the centre one, and each row
 * is a two-line window clipped to one line tall. That pair of skews is what
 * makes the rows read as the top and side faces of one extruded block rather
 * than as seven separate lines.
 *
 * The animation is the reference's too — every paragraph travels up exactly
 * one line, `duration: 0.8`, `ease: power2.out`, `stagger: 0.08`.
 *
 * The single change is what starts it. The original waited for `mouseenter`
 * and reversed on `mouseleave`; a preloader has no pointer to wait for, so the
 * same timeline runs on a clock: `yoyo` is the reverse, `repeat: -1` is the
 * next hover, and `repeatDelay` is the pause a hand would have left between
 * them.
 *
 * Sizes are CSS variables on the reference's own ratios (72:60 type to line,
 * 35 of step per 60 of line), fluid between the phone and desktop values it
 * shipped with. The roll is `yPercent: -100` of a paragraph whose height *is*
 * the line, so the travel stays exactly one line at every size without the
 * breakpoint check the original did in JS.
 */
export default function LayeredText({
  lines = DEFAULT_LINES,
  /** Seconds the stair rests at each end before reversing. */
  hold = 0.9,
  /** Set false for `prefers-reduced-motion` — the stair renders, still. */
  animate = true,
  className = "",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!animate || !containerRef.current) return;

    const paragraphs = containerRef.current.querySelectorAll("p");
    if (!paragraphs.length) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: hold });
    /* -100% of the paragraph's own height, and its height is one line. The
       original hard-coded -60 / -35 off `window.innerWidth`; this is the same
       distance, expressed so it survives every viewport in between. */
    tl.to(paragraphs, {
      yPercent: -100,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
    });

    return () => tl.kill();
  }, [lines, hold, animate]);

  const centerIndex = Math.floor(lines.length / 2);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`font-body font-black uppercase antialiased select-none ${className}`}
      style={{
        /* The reference's 60px / 30px line pair, interpolated instead of
           snapping at 768px — and pulled in at both ends because the skew
           throws paint well outside the layout box. Measured: at 60px the
           stair reached within 11px of the wordmark on a 1440×900 screen, and
           at 30px it bled 5px past the left edge of a 360px phone. */
        "--lt-line": "clamp(26px, 4.2vw, 56px)",
        // 72:60, the reference's type-to-line ratio.
        "--lt-size": "calc(var(--lt-line) * 1.2)",
        // 35:60, its step-to-line ratio.
        "--lt-shift": "calc(var(--lt-line) * 0.5833)",
        fontSize: "var(--lt-size)",
        letterSpacing: "-0.028em",
      }}
    >
      <ul className="m-0 flex list-none flex-col items-center p-0">
        {lines.map((line, index) => {
          const isEven = index % 2 === 0;
          const distance = Math.abs(index - centerIndex) / centerIndex;

          return (
            <li
              key={index}
              className="relative overflow-hidden"
              style={{
                height: "var(--lt-line)",
                transform: `translateX(calc(var(--lt-shift) * ${
                  index - centerIndex
                })) skew(${
                  isEven ? "60deg, -30deg" : "0deg, -30deg"
                }) scaleY(${isEven ? "0.66667" : "1.33333"})`,
                // The one thing added to the reference's row styling: rows
                // fall away from the middle, so the block has a focal point
                // instead of seven equally loud lines.
                color: index === centerIndex ? "#2868c6" : "#081d4a",
                opacity: 1 - distance * 0.55,
              }}
            >
              {[line.top, line.bottom].map((word, slot) => (
                <p
                  key={slot}
                  className="m-0 whitespace-nowrap align-top"
                  style={{
                    height: "var(--lt-line)",
                    lineHeight: "calc(var(--lt-line) - 5px)",
                    paddingInline: "calc(var(--lt-line) * 0.25)",
                  }}
                >
                  {word}
                </p>
              ))}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
