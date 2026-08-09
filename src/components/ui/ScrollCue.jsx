"use client";

/**
 * LOGIXLOOPS: Scroll cue
 *
 * A full-viewport hero has one problem a short hero does not: nothing on
 * screen proves there is a page under it. This is the proof.
 *
 * Drawn in the same vocabulary as the contour fields behind the heroes, a
 * measured hairline with a marker travelling down it, the way a depth gauge
 * reads, not a bouncing chevron. It is decoration for sighted users only, so
 * it is `aria-hidden` and never focusable; the page below is reachable by
 * keyboard and by screen reader without it.
 *
 * The travel animation is CSS, not GSAP: it is an idle loop with no relation
 * to scroll position, and running it through the ScrollTrigger ticker would
 * cost a tween for something a keyframe does for free. `prefers-reduced-
 * motion` freezes the marker at the top of the rule (see `globals.css`), the
 * cue stays legible, it just stops moving.
 *
 * The bottom offset clears `PageSurface`'s overlap. The sheet below a hero is
 * pulled up over its last 3.5vh, and a cue sitting at a flat `bottom-6` was
 * landing underneath it, the label survived, the rule it labels did not, so
 * every page opened with a caps word floating on a seam for no evident
 * reason.
 */
export default function ScrollCue({ label = "Scroll", className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-[calc(3.5vh+max(1.25rem,env(safe-area-inset-bottom)))] z-[2] flex flex-col items-center gap-3 ${className}`}
    >
      {label && (
        <span className="font-label text-[0.625rem] leading-none tracking-[0.3em] uppercase text-on-surface-variant/70">
          {label}
        </span>
      )}
      <span className="relative block h-9 w-px overflow-hidden bg-outline-variant/70">
        <span className="scroll-cue-marker absolute inset-x-0 top-0 block h-3 bg-primary" />
      </span>
    </div>
  );
}
