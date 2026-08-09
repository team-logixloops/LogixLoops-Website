"use client";

// Ruixen Gradient Footer, a normal footer that sits at the bottom of the
// page. Its content reads first; the blurred glow is pinned to the bottom
// of the viewport and stretches up from the floor over the last stretch of
// scroll, hitting full height exactly when you reach the end of the page.
// One inline <svg>, no canvas, no giant scroll spacer.

import { useEffect, useId, useRef } from "react";

const VBW = 1271;
const VBH = 599;

// LogixLoops brand stops, floor (0) → top (1). The footer sits on a light
// surface, so the glow rises *out* of saturation rather than into it: brand
// royal at the floor, up through the fox's blue, then the cyan accent, then
// pale, then gone. Reversed from the old dark-footer ordering, on white a
// near-black floor reads as a bruise, not as depth.
const LOGIXLOOPS_STOPS = [
  { offset: 0, color: "#2868c6" },
  { offset: 0.25, color: "#378ce7" },
  { offset: 0.45, color: "#5ba5ef" },
  { offset: 0.62, color: "#8fdce7" },
  { offset: 0.78, color: "#cdf0f5" },
  { offset: 0.9, color: "#e8f1fc" },
  { offset: 1, color: "#378ce700" },
];

// Height curve: a gentle power falloff, giving the flatter, pyramid-like rise of
// the original footer (short edges, tallest middle).
function bellHeights(n, peak, valley) {
  const out = [];
  const mid = (n - 1) / 2;
  for (let i = 0; i < n; i++) {
    const t = mid === 0 ? 0 : Math.abs(i - mid) / mid; // 0 center → 1 edge
    const eased = 1 - Math.pow(t, 1.24);
    out.push(peak * VBH * (valley + (1 - valley) * eased));
  }
  return out;
}

const clamp01 = (v) => Math.max(0, Math.min(1, v));

export function RuixenGradientFooter({
  children,
  gradientHeight = "30vh",
  minReveal = 0.045,
  bars = 9,
  blur = 15,
  peak = 0.98,
  valley = 0.55,
  stops = LOGIXLOOPS_STOPS,
  className,
  style,
}) {
  const uid = useId().replace(/:/g, "");
  const bandRef = useRef(null);

  /*
   * The reveal is written straight to the node's transform, never to state.
   *
   * This used to `setProgress` on every scroll event, which re-rendered the
   * whole footer, its four link columns and every per-character span in them,
   * on every frame of every scroll on every page. That is what a "heavy"
   * scroll near the bottom of the page was.
   *
   * The height is also cached rather than read per scroll: `offsetHeight` on
   * a fixed element forces a synchronous layout, and reading it mid-scroll
   * turns one paint into a layout-then-paint.
   */
  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;
    const doc = el.ownerDocument;
    const win = doc.defaultView ?? window;

    let bandHeight = el.offsetHeight || 1;
    let frame = 0;

    const write = () => {
      frame = 0;
      const left =
        doc.documentElement.scrollHeight - win.innerHeight - win.scrollY;
      const t = clamp01((bandHeight - left) / bandHeight);
      const progress = minReveal + (1 - minReveal) * t;
      el.style.transform = `scaleY(${progress.toFixed(4)})`;
    };

    // Coalesced to one write per frame: wheel and Lenis both emit scroll
    // faster than the compositor paints.
    const onScroll = () => {
      if (!frame) frame = win.requestAnimationFrame(write);
    };

    const onResize = () => {
      bandHeight = el.offsetHeight || 1;
      onScroll();
    };

    write();
    win.addEventListener("scroll", onScroll, { passive: true });
    win.addEventListener("resize", onResize, { passive: true });
    return () => {
      if (frame) win.cancelAnimationFrame(frame);
      win.removeEventListener("scroll", onScroll);
      win.removeEventListener("resize", onResize);
    };
  }, [minReveal]);

  const colW = VBW / bars;

  return (
    <footer
      className={className}
      style={{
        /*
         * Clearance for the glow, at a fraction of the glow's own height,
         * not the full height, which is what this used to reserve.
         *
         * The band is `position: fixed`, so this padding buys nothing but
         * separation between the last line of content and the saturated
         * floor of the gradient. Reserving all 30vh left a third of a screen
         * of blank page under the footer. The gradient's top third is nearly
         * transparent, so 0.55 clears the part that would actually compete
         * with text.
         */
        paddingBottom: `calc(${gradientHeight} * 0.55)`,
        ...style,
      }}
    >
      {children}

      <div
        ref={bandRef}
        aria-hidden
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          height: gradientHeight,
          pointerEvents: "none",
          transformOrigin: "bottom",
          transform: `scaleY(${minReveal})`,
          willChange: "transform",
          // Nothing outside this band can be affected by it, so the browser
          // does not need to consider the rest of the page when it repaints.
          contain: "layout paint style",
        }}
      >
        <svg
          style={{ height: "100%", width: "100%", display: "block" }}
          viewBox={`0 0 ${VBW} ${VBH}`}
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`grad-${uid}`} x1="0" y1="1" x2="0" y2="0">
              {stops.map((s, i) => (
                <stop key={i} offset={s.offset} stopColor={s.color} />
              ))}
            </linearGradient>
            <filter id={`blur-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={blur} />
            </filter>
          </defs>
          {/* One filter region for the whole bell, not one per bar. A
              Gaussian is rasterised per filtered element, so nine <g>s each
              carrying the same blur meant nine full-size blur passes every
              time the band re-rasterised. The bars overlap anyway (1.23 ×
              column width), so blurring them as one group is also what the
              glow was always meant to look like. */}
          <g filter={`url(#blur-${uid})`}>
            {bellHeights(bars, peak, valley).map((barH, i) => (
              <rect
                key={i}
                x={i * colW}
                y={VBH - barH}
                width={colW * 1.23}
                height={barH}
                fill={`url(#grad-${uid})`}
              />
            ))}
          </g>
        </svg>
      </div>
    </footer>
  );
}
