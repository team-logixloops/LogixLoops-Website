"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isEmbedded } from "@/lib/embed";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives Lenis smooth scroll and keeps GSAP's ScrollTrigger in sync with it.
 *
 * Responsiveness-first: Lenis is skipped on touch/coarse-pointer devices and
 * on `prefers-reduced-motion`. Native touch scroll is already smooth and
 * hijacking it with a rAF-driven scroller costs battery/perf and fights
 * momentum scrolling on phones. GSAP's ScrollTrigger still works fine
 * against native scroll, so section reveal animations are unaffected either
 * way. Desktop mouse/trackpad users get the eased Lenis scroll.
 */
export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Embedded copies of the site (the device frame and the browser shell on
    // /services/[slug]) scroll from the outer page's wheel handler, which
    // writes `scrollTop` directly. Lenis owns that property from its own rAF
    // loop and would fight every write.
    if (isCoarsePointer || prefersReducedMotion || isEmbedded()) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      // `lerp`, not `duration`. Duration mode re-derives an eased tween from
      // every wheel event, so a burst of them stacks up as a long tail of
      // catch-up movement, which is the "heavy, still moving after I stopped"
      // feel. A per-frame lerp settles in ~250ms and tracks the wheel.
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    /*
     * `ScrollTrigger.refresh()` re-measures every trigger on the page and
     * re-runs every pin, so it is one of the most expensive things this site
     * can do. Firing it straight from a ResizeObserver on <body> meant any
     * width change fired it, and, worse, any refresh that itself nudged the
     * body's box fired it again.
     *
     * So: height changes only (a hover that reflows a footer link must not
     * cost a full refresh), coalesced to one call on an idle frame.
     */
    let refreshTimer;
    let lastHeight = document.body.offsetHeight;
    const resizeObserver = new ResizeObserver(() => {
      const height = document.body.offsetHeight;
      if (Math.abs(height - lastHeight) < 2) return;
      lastHeight = height;
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    resizeObserver.observe(document.body);

    // Exposed so things like the navbar's mega-menu / mobile menu can pause
    // scrolling. Lenis drives scroll via its own rAF loop and ignores
    // `document.body.style.overflow` entirely.
    window.lenis = lenis;

    return () => {
      clearTimeout(refreshTimer);
      resizeObserver.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return children;
}
