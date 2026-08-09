"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * LOGIXLOOPS: Scroll choreography
 *
 * `MotionWrappers` handles arrival: something enters the viewport, it fades
 * up, it is done. That is the right default and most of the site should keep
 * using it. These three are the exceptions, motion that stays tied to the
 * scrollbar for as long as you are looking at it, used sparingly so it still
 * counts for something when it appears.
 *
 * All three ride the same Lenis-driven ScrollTrigger loop the rest of the
 * site uses (see `SmoothScrollProvider`), so nothing here installs a second
 * scroll listener.
 *
 * Every effect degrades the same way, in this order:
 *   `prefers-reduced-motion` → the end state, drawn immediately, no trigger.
 *   coarse pointer           → reduced travel, since phone viewports are
 *                              short and the same displacement reads as a
 *                              much larger proportion of the screen.
 */

const isReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/*
 * A mobile condition AND its complement, always.
 *
 * `gsap.matchMedia().add()` runs its callback only when one of the listed
 * conditions matches — `active && func(...)` in GSAP's source. Each of the
 * three wrappers below listed nothing but a `(max-width: …)` query, so above
 * that width the callback never ran and the effect did not exist, and below
 * it the effect was the only thing applying an `opacity: 0` start state. The
 * second query is never read; it exists so the callback runs at every width.
 */
const MOBILE_QUERIES = {
  isMobile: "(max-width: 767px)",
  isWide: "(min-width: 768px)",
};

const REVEAL_QUERIES = {
  isMobile: "(max-width: 639px)",
  isWide: "(min-width: 640px)",
};

/**
 * A scrubbed reveal whose window has collapsed can never reach progress 1, so
 * anything it faded in from zero would stay invisible forever. That is a real
 * failure this site shipped, see the note in `MotionWrappers`. Any effect that
 * starts from `opacity: 0` gets this guard.
 */
const settleIfUnscrollable = (target) => (self) => {
  if (self.end - self.start >= 1) return;
  self.kill(false);
  gsap.set(target, { clearProps: "transform,opacity,willChange" });
};

/**
 * Parallax, moves a decorative layer against the scroll direction.
 *
 * Deliberately restricted to background and ornament. Parallaxing body copy
 * makes it harder to read and is a common trigger for motion sickness, so
 * this is never wrapped around text you are expected to follow.
 *
 * `amount` is in percent of the element's own height. Keep it small: past
 * about 15 the layer visibly desyncs from the content it sits behind and the
 * depth illusion inverts into an error.
 */
export function Parallax({ children, className, amount = 10, ...props }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || isReduced()) return;

    const mm = gsap.matchMedia();

    mm.add(
      MOBILE_QUERIES,
      (context) => {
        const { isMobile } = context.conditions;
        const tween = gsap.fromTo(
          el,
          { yPercent: -amount * (isMobile ? 0.4 : 1) },
          {
            yPercent: amount * (isMobile ? 0.4 : 1),
            ease: "none",
            scrollTrigger: {
              // The parent, not the element: a layer that has been pushed
              // out of its own box by the tween would otherwise re-trigger
              // against its displaced position.
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
        return () => tween.scrollTrigger?.kill();
      }
    );

    return () => mm.revert();
  }, [amount]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }} {...props}>
      {children}
    </div>
  );
}

/**
 * SplitHeadline, reveals a heading a word at a time.
 *
 * Split by word, not by character. Character splitting needs GSAP's SplitText
 * (a paid Club plugin this project does not license), produces one DOM node
 * per letter, and, the part that actually matters, breaks the heading into
 * fragments that screen readers announce individually. Word spans keep every
 * word a real text node, so the heading is still one readable string to
 * assistive tech and to crawlers.
 *
 * The markup is rendered on the server exactly as it animates, so there is no
 * DOM surgery on mount and no flash of unsplit text.
 *
 * Reserve this for short headings. Past roughly eight words the stagger
 * outlives the reader's patience and the last words arrive after they have
 * already started reading the first.
 */
export function SplitHeadline({
  text,
  /* Trailing phrase that carries the emphasis colour. Modelled as a separate
     prop rather than letting callers pass JSX, because the component has to
     be able to walk the heading word by word, arbitrary children would mean
     parsing a React tree to find the text in it. */
  accent,
  accentClassName = "text-primary",
  as: Tag = "h1",
  className,
  delay = 0,
  /* `once: false` replays whenever the heading re-enters. Off by default,
     a heading that re-animates every time you scroll back up reads as a bug. */
  once = true,
  ...props
}) {
  const ref = useRef(null);
  const words = [
    ...String(text).split(" ").filter(Boolean).map((w) => ({ w, accent: false })),
    ...(accent ? String(accent).split(" ").filter(Boolean).map((w) => ({ w, accent: true })) : []),
  ];

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll("[data-word]");
    if (!targets.length) return;

    if (isReduced()) {
      gsap.set(targets, { yPercent: 0, opacity: 1 });
      return;
    }

    const tween = gsap.fromTo(
      targets,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        delay,
        // expo.out front-loads the movement, so the words settle rather than
        // coasting, power2 left them feeling like they were still arriving.
        ease: "expo.out",
        stagger: 0.055,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once,
          // This is the `h1` of every interior page, and it starts at
          // `opacity: 0`. A heading that fails to reveal is a blank page, so
          // it does not get to depend on a scroll position being reached:
          // if the window is already behind us at refresh, play it now.
          // `self.animation`, not the `tween` const: ScrollTrigger can fire
          // this synchronously while it is still being constructed, before
          // the binding exists.
          onRefresh: (self) => {
            if (self.isActive || self.progress > 0) return;
            if (self.scroll() >= self.start) self.animation?.progress(1);
          },
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text, accent, delay, once]);

  return (
    <Tag ref={ref} className={className} {...props}>
      {words.map(({ w, accent: isAccent }, i) => (
        // The outer span is the clipping window the word rises into. It is
        // `inline-block` with bottom padding because descenders (g, y, p)
        // otherwise get shaved off by the `overflow: hidden`.
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <span
            data-word
            className={`inline-block will-change-transform${isAccent ? ` ${accentClassName}` : ""}`}
          >
            {w}
          </span>
          {/* A real space, outside the clip, so the heading's text content
              still reads as a normal sentence when copied or spoken. */}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

/**
 * HeroExit, the handoff out of a full-viewport hero.
 *
 * Every hero on the site now owns a whole screen, which creates a transition
 * that did not exist when they were 200px tall: the moment the reader leaves
 * one. Left alone that moment is just a screenful of content sliding up and
 * off, and the sheet below arrives with no relationship to what it replaced.
 *
 * This ties the hero's own copy to the scrollbar for the length of that
 * departure, it lifts, shrinks slightly, and dims to nothing by the time the
 * sheet has covered two thirds of the screen. Paired with `PageSurface`'s
 * negative top margin, the sheet reads as sliding over a hero that is
 * receding rather than one that is merely scrolling away.
 *
 * This is the only scrub-linked effect that touches body copy anywhere on the
 * site, and it is allowed to because the copy is on its way out of view: by
 * the time it has moved far enough to be hard to read, it is nearly gone.
 *
 * `scrub` is a number, not `true`. A hard-linked scrub inherits every jitter
 * in the wheel input; 0.4s of catch-up smooths that without the tween ever
 * feeling detached from the scrollbar.
 */
export function HeroExit({ children, className, ...props }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || isReduced()) return;

    // The hero section itself, not this wrapper. The wrapper is what the
    // tween moves, so triggering on it would measure a box that the effect is
    // in the middle of displacing.
    const section = el.closest("[data-hero]") ?? el.parentElement ?? el;

    const mm = gsap.matchMedia();

    mm.add(MOBILE_QUERIES, (context) => {
      const { isMobile } = context.conditions;

      const tween = gsap.to(el, {
        // Phones show the same displacement across a much shorter viewport,
        // and their address bar is already consuming part of it.
        yPercent: isMobile ? -12 : -22,
        scale: isMobile ? 1 : 0.95,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // `bottom 25%`, not `bottom 60%`. Ending at 60% gave the departure
          // only about a third of a viewport of scroll, over a Lenis flick
          // that is one frame of movement and then it is gone, which is the
          // same reason the old reveals read as nothing happening.
          end: "bottom 25%",
          scrub: 0.4,
        },
      });

      return () => tween.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform, opacity" }}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * ScrubReveal, a reveal that stays tied to the scrollbar.
 *
 * `MotionWrappers` plays a reveal and is done with it. This one runs across a
 * window of scroll, so the reader is driving it: stop, and it stops. That is
 * the whole difference, and it is why this is reserved for the one element in
 * a section that is worth making someone feel they uncovered, a lead image,
 * a headline block, a stat row. Applied to everything it stops meaning
 * anything and starts feeling like the page is fighting the scroll.
 *
 * The window ends at `end`, deliberately short of the element reaching the
 * middle of the screen. A reveal still finishing while you are reading it is
 * the failure mode here.
 */
export function ScrubReveal({
  children,
  className,
  /* Travel in pixels. Bigger than the 24px `FadeInUp` default on purpose,
     across a scrub window, small travel is indistinguishable from no effect. */
  distance = 72,
  ...props
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isReduced()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const mm = gsap.matchMedia();

    mm.add(REVEAL_QUERIES, (context) => {
      const { isMobile } = context.conditions;

      const tween = gsap.fromTo(
        el,
        { opacity: 0, y: distance * (isMobile ? 0.45 : 1) },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            // `clamp()` keeps both ends inside the scrollable range, so an
            // element near the foot of a short page compresses its window
            // instead of never reaching the end of it and sitting there
            // half-revealed.
            start: "clamp(top 100%)",
            end: "clamp(top 40%)",
            scrub: 0.5,
            onRefresh: settleIfUnscrollable(el),
          },
        }
      );

      return () => tween.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, [distance]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform, opacity" }} {...props}>
      {children}
    </div>
  );
}

/**
 * MaskReveal, wipes content in behind a moving edge.
 *
 * Uses `clip-path` rather than animating width or height, so the browser
 * never re-lays-out the subtree mid-animation; the element occupies its final
 * box the entire time and only the visible region changes. That also means it
 * is safe to wrap around images without causing layout shift.
 */
export function MaskReveal({
  children,
  className,
  direction = "left",
  duration = 0.9,
  delay = 0,
  ...props
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isReduced()) {
      gsap.set(el, { clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    const from = {
      left: "inset(0% 100% 0% 0%)",
      right: "inset(0% 0% 0% 100%)",
      up: "inset(100% 0% 0% 0%)",
      down: "inset(0% 0% 100% 0%)",
    }[direction] ?? "inset(0% 100% 0% 0%)";

    const tween = gsap.fromTo(
      el,
      { clipPath: from },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration,
        delay,
        ease: "power3.inOut",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [direction, duration, delay]);

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}
