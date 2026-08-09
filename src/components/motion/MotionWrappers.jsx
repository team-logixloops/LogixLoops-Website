"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = "power3.out";

/**
 * The failure mode a scrubbed reveal has and a one-shot reveal does not: an
 * element near the bottom of the document may never rise far enough up the
 * viewport to reach the end of its scroll window, because the page runs out of
 * scroll first. Its tween stops at partial progress and the element is left
 * permanently half-faded, on a final CTA, exactly the element that must not
 * be.
 *
 * `clamp()` is ScrollTrigger's own answer to this and is what every trigger
 * below wraps its start and end in. It pulls a computed position back inside
 * the scrollable range instead of letting it sit past the end, so the window
 * compresses on a short page rather than going unreachable.
 *
 * The first attempt at this was a hand-rolled `onRefresh` that killed any
 * trigger whose end lay past `maxScroll` and snapped the element to its final
 * state. It was worse than the problem: `onRefresh` fires on the very first
 * measurement, before images have loaded and while the document is still
 * shorter than it will end up, so on a slow connection it could decide half
 * the page was unreachable and kill every reveal on it. A trigger that
 * disables itself based on a measurement taken too early is indistinguishable
 * from no animation at all.
 */
const clamp = (position) => `clamp(${position})`;

/**
 * Core scroll-reveal hook backing every wrapper below. Every reveal on the
 * site runs through here, so this is the one place that decides what
 * "scrolling down the page" feels like.
 *
 * It is scroll-linked, not fire-and-forget. The previous version played a
 * 24px / 0.6s fade the moment an element crossed 88% of the viewport, which
 * on paper is a reveal and in practice was invisible: under Lenis' 1.2s ease
 * the tween had finished before the element reached anywhere the reader was
 * looking, and 24px of travel is below the threshold at which movement
 * registers as movement at all. The site had scroll animation everywhere and
 * read as having none.
 *
 * Now the reader drives it. `scrub` ties progress to scrollbar position across
 * a window that opens as the element crosses the bottom edge of the viewport
 * and closes when it reaches the upper third, stop scrolling and the reveal
 * stops with you, scroll back and it runs backwards.
 *
 * That window is deliberately long. A 20%-of-viewport window sounds
 * scroll-linked and is not: a normal wheel gesture crosses it inside a single
 * flick, so the element still snaps into place and the effect is invisible
 * again for exactly the reason the old one was. Roughly two thirds of a
 * viewport is the point where the reveal is unmistakably being driven rather
 * than played, and travel is up from 24px to 96px to match, across a long
 * window, small displacement reads as nothing happening.
 *
 * `scrub: 0.55` rather than `true`: hard-linking inherits every jitter in a
 * wheel or trackpad, and just over half a second of catch-up removes that
 * without the element ever feeling detached from the scroll.
 *
 * `ease` is deliberately absent from the scrubbed tween. An easing curve on a
 * scrubbed animation makes a constant scroll speed produce a varying visual
 * speed, which reads as the page lagging rather than as a curve.
 *
 * Responsive and reduced-motion behaviour is unchanged: `gsap.matchMedia`
 * cuts travel under 640px, and `prefers-reduced-motion` skips animation
 * entirely, content is simply present.
 */
function useScrollReveal(
  ref,
  {
    from,
    /* Retained so existing call sites keep type-checking and reading
       sensibly, but a scrubbed tween takes its duration from the scroll
       window, not from a clock. Used only on the reduced-travel fallback
       paths below. */
    duration = 0.6,
    /* Delay on a scrubbed tween would mean "start further down the window",
       which is what `stagger` already expresses more clearly. Kept in the
       signature, call sites pass it, and folded into the start offset. */
    delay = 0,
  } = {}
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: "transform" });
      return;
    }

    const mm = gsap.matchMedia();

    mm.add(
      { isMobile: "(max-width: 639px)" },
      (context) => {
        const { isMobile } = context.conditions;
        const scaleDown = (v) => (v === undefined ? undefined : v * (isMobile ? 0.45 : 1));

        const fromVars = {
          opacity: 0,
          x: scaleDown(from.x),
          y: scaleDown(from.y),
          scale: from.scale,
        };

        // A call site's `delay` becomes a later entry point into the scroll
        // window, so staggered groups still resolve in order. Capped so a
        // long chain of delays can't push an element's reveal past the point
        // where it is already being read.
        const startPct = 100 - Math.min(delay, 0.5) * 10;

        const tween = gsap.fromTo(el, fromVars, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: clamp(`top ${startPct}%`),
            end: clamp("top 38%"),
            scrub: 0.55,
          },
        });

        return () => tween.scrollTrigger?.kill();
      }
    );

    return () => mm.revert();
  }, [ref, from.x, from.y, from.scale, duration, delay]);
}

export function FadeInUp({ children, className, delay = 0, ...props }) {
  const ref = useRef(null);
  useScrollReveal(ref, { from: { y: 96 }, delay });
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}

/** Fade in from below, no viewport trigger, plays immediately (hero/above-fold) */
export function FadeInUpImmediate({ children, className, delay = 0, ...props }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, delay, ease: EASE }
    );
    return () => tween.kill();
  }, [delay]);
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}

export function FadeInLeft({ children, className, ...props }) {
  const ref = useRef(null);
  useScrollReveal(ref, { from: { x: -110 } });
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}

export function FadeInRight({ children, className, ...props }) {
  const ref = useRef(null);
  useScrollReveal(ref, { from: { x: 110 } });
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}

export function FadeIn({ children, className, ...props }) {
  const ref = useRef(null);
  useScrollReveal(ref, { from: {}, duration: 0.5 });
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}

export function ScaleIn({ children, className, ...props }) {
  const ref = useRef(null);
  useScrollReveal(ref, { from: { scale: 0.88 }, duration: 0.4 });
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}

/**
 * Stagger container, animates direct `StaggerItem` children in sequence
 * as a group when the container enters the viewport.
 */
export function StaggerContainer({ children, className, slow = false, ...props }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(":scope > [data-stagger-item]");
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const mm = gsap.matchMedia();

    mm.add({ isMobile: "(max-width: 639px)" }, (context) => {
      const { isMobile } = context.conditions;
      const distance = isMobile ? 44 : 104;

      // Under `scrub`, `stagger` stops being a delay in seconds and becomes a
      // share of the scroll window: the last item finishes at the end of the
      // window and every item before it is offset backwards from there. The
      // grid assembles as you scroll rather than dealing itself out on a
      // timer you have no control over. `slow` widens the offset between
      // items, which is the same intent it always had.
      const tween = gsap.fromTo(
        items,
        { opacity: 0, y: distance },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          stagger: { each: slow ? 0.25 : 0.12, from: "start" },
          scrollTrigger: {
            trigger: el,
            start: clamp("top 100%"),
            // Wider than a single element's window: a grid occupies more of
            // the screen than one block, so it needs more scroll to resolve
            // without the last row arriving after the first row is read.
            end: clamp("top 25%"),
            scrub: 0.55,
          },
        }
      );

      return () => tween.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, [slow]);

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}

/** Stagger item, must be a direct child of StaggerContainer */
export function StaggerItem({ children, className, ...props }) {
  return (
    <div data-stagger-item className={className} {...props}>
      {children}
    </div>
  );
}
