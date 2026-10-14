"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = "power3.out";

/**
 * Where a reveal starts: as the element's top crosses 92% of the viewport,
 * which is the moment it first appears at the bottom of the screen. Wrapped
 * in `clamp()` so a trigger near the end of a short page is pulled back
 * inside the scrollable range rather than sitting past it, unreachable.
 */
const START = "clamp(top 92%)";

/** Drop everything GSAP wrote, leaving the element in its natural state. */
const clearReveal = (targets) => gsap.set(targets, { clearProps: "transform,opacity,willChange" });

/*
 * Both a mobile and a non-mobile condition, deliberately.
 *
 * `gsap.matchMedia().add()` only calls its callback when at least one listed
 * condition matches. With a single `(max-width: …)` condition, wide screens
 * never ran the callback and had no reveals at all. The second query is
 * never read. It is there so the callback runs.
 */
const REVEAL_QUERIES = {
  isMobile: "(max-width: 639px)",
  isWide: "(min-width: 640px)",
};

/**
 * Core scroll-reveal hook backing every wrapper below.
 *
 * One short, played reveal, the moment an element enters the viewport. It
 * used to be scrubbed: progress tied to the scrollbar across a window from
 * the bottom of the screen to 38% from the top, with 96px of travel. That
 * meant a section heading only settled once it had been scrolled almost to
 * the top of the screen, so headings sat low and faded while the reader was
 * already trying to read them. It looked broken, and it was reported as such.
 *
 * Now the element rises 32px (14px on phones) and fades in over 0.7s as soon
 * as it appears, finishing while it is still in the lower half of the screen.
 * Each reveal runs once and then retires: the trigger is killed and the inline
 * `transform`/`opacity` cleared, so nothing stays on its own compositing layer
 * or is recalculated on later scroll frames.
 *
 * If the element is already past the start when the page loads (a reload
 * halfway down, a link to an anchor), ScrollTrigger plays it immediately, so
 * nothing can be left invisible. `prefers-reduced-motion` skips animation
 * entirely.
 */
function useScrollReveal(ref, { from, duration = 0.7, delay = 0 } = {}) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: "transform" });
      return;
    }

    const mm = gsap.matchMedia();

    mm.add(REVEAL_QUERIES, (context) => {
      const { isMobile } = context.conditions;
      const travel = (v) => (v === undefined ? undefined : v * (isMobile ? 0.45 : 1));

      const tween = gsap.fromTo(
        el,
        { opacity: 0, x: travel(from.x), y: travel(from.y), scale: from.scale },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          // Capped so a long chain of delays never holds content back.
          delay: Math.min(delay, 0.3),
          ease: EASE,
          scrollTrigger: { trigger: el, start: START, once: true },
          onComplete: () => {
            tween.scrollTrigger?.kill();
            clearReveal(el);
          },
        }
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [ref, from.x, from.y, from.scale, duration, delay]);
}

export function FadeInUp({ children, className, delay = 0, ...props }) {
  const ref = useRef(null);
  useScrollReveal(ref, { from: { y: 32 }, delay });
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
  useScrollReveal(ref, { from: { x: -48 } });
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}

export function FadeInRight({ children, className, ...props }) {
  const ref = useRef(null);
  useScrollReveal(ref, { from: { x: 48 } });
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
  useScrollReveal(ref, { from: { scale: 0.94 }, duration: 0.5 });
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

    mm.add(REVEAL_QUERIES, (context) => {
      const { isMobile } = context.conditions;
      const distance = isMobile ? 14 : 32;

      // Played as the grid enters, items a beat apart, the whole group done
      // in well under a second. `slow` widens the beat.
      const tween = gsap.fromTo(
        items,
        { opacity: 0, y: distance },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: EASE,
          stagger: slow ? 0.12 : 0.07,
          scrollTrigger: { trigger: el, start: START, once: true },
          onComplete: () => {
            tween.scrollTrigger?.kill();
            clearReveal(items);
          },
        }
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
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
