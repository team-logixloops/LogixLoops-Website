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
      duration: 1.2,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh());
    resizeObserver.observe(document.body);

    // Exposed so things like the navbar's mega-menu / mobile menu can pause
    // scrolling. Lenis drives scroll via its own rAF loop and ignores
    // `document.body.style.overflow` entirely.
    window.lenis = lenis;

    return () => {
      resizeObserver.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return children;
}
