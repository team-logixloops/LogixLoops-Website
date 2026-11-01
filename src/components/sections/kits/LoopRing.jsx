"use client";

import { cn } from "@/lib/utils";

const SIZE = 240;
const R = 100;
const STROKE = 16;
const C = 2 * Math.PI * R;
const GAP = 0.018 * C;
/* A small add-on next to a big Loop would otherwise be a sliver no one can
   see change. Every piece gets at least this share of the ring. */
const MIN_SHARE = 0.07;

const TONE = {
  primary: "stroke-primary",
  secondary: "stroke-secondary",
  tertiary: "stroke-tertiary",
};

/* Add-ons step through the brand's blue family so neighbouring pieces stay
   distinguishable without a legend. */
const ADD_ON_TONES = ["stroke-secondary", "stroke-tertiary-container", "stroke-primary-container", "stroke-tertiary"];

function shares(prices) {
  const total = prices.reduce((a, b) => a + b, 0) || 1;
  const raw = prices.map((p) => Math.max(MIN_SHARE, p / total));
  const norm = raw.reduce((a, b) => a + b, 0);
  return raw.map((s) => s / norm);
}

/**
 * The build drawn as a loop: the Loop itself is the first arc, each add-on
 * the next, sized by its listed price. Picked pieces draw in; the rest stay as
 * a faint track, so a partial build reads as an open loop and the full build
 * closes it. The ring says nothing the list beside it does not, which is why
 * it is `aria-hidden`; it exists to make the build feel like one object.
 *
 * Arcs are dash segments on stacked circles, and the draw-in is a transition
 * on `stroke-dasharray`, so no layout or JavaScript animation is involved.
 */
/* Sizes as a prop, not a caller's `max-w-*`: `cn` is a plain join, so a
   second max-width class would lose or win on CSS source order alone. */
const WIDTHS = { lg: "max-w-[17rem]", sm: "max-w-[10rem]" };

export default function LoopRing({ loop, picked, currency, color = "primary", size = "lg", className, children }) {
  const pieces = [
    { key: "loop", price: loop.price[currency], on: true, tone: TONE[color] ?? TONE.primary },
    ...loop.addOns.map((addOn, i) => ({
      key: addOn.name,
      price: addOn.price[currency],
      on: picked.includes(addOn.name),
      tone: ADD_ON_TONES[i % ADD_ON_TONES.length],
    })),
  ];
  const parts = shares(pieces.map((p) => p.price));

  let start = 0;
  const arcs = pieces.map((piece, i) => {
    const len = parts[i] * C;
    // Round caps add half the stroke at each end, so the dash is shortened by
    // one stroke width and shifted by half of one to keep the gaps even.
    const dash = Math.max(0.01, len - GAP - STROKE);
    const arc = { ...piece, dash, offset: -(start + GAP / 2 + STROKE / 2) };
    start += len;
    return arc;
  });

  const closed = pieces.every((p) => p.on);

  return (
    <div className={cn("relative aspect-square w-full", WIDTHS[size], className)}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full -rotate-90" aria-hidden="true">
        {arcs.map((arc) => (
          <circle
            key={`track-${arc.key}`}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${arc.dash} ${C}`}
            strokeDashoffset={arc.offset}
            className="stroke-outline-variant/50"
          />
        ))}
        {arcs.map((arc) => (
          <circle
            key={`fill-${arc.key}`}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${arc.on ? arc.dash : 0} ${C}`}
            strokeDashoffset={arc.offset}
            className={cn(
              arc.tone,
              "transition-[stroke-dasharray,stroke-dashoffset,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none",
              !arc.on && "opacity-0"
            )}
          />
        ))}
        {/* The closing glow: only when every piece is in. A soft ring, not a
            blur filter, so it costs nothing to show or hide. */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          strokeWidth={STROKE + 14}
          className={cn(
            "stroke-secondary/10 transition-opacity duration-700 motion-reduce:transition-none",
            closed ? "opacity-100" : "opacity-0"
          )}
        />
      </svg>
      <div className={cn("absolute inset-0 flex flex-col items-center justify-center text-center", size === "lg" ? "px-10" : "px-4")}>{children}</div>
    </div>
  );
}
