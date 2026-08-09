"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  /*
   * ─── Landing at the top, on every arrival ───
   *
   * Two separate things were putting the reader in the middle of a page.
   *
   * A reload restores the previous scroll offset by default, and this site
   * cannot honour that: the document's height is not known until fonts have
   * swapped, images have decoded and every pinned ScrollTrigger has claimed
   * its spacer, so the browser restores an offset measured against a page
   * that no longer exists. `scrollRestoration = "manual"` opts out. It also
   * opts out for the back button, which is the deliberate trade: landing at
   * the top of a page that has re-laid-out is better than landing at an
   * arbitrary point in it.
   *
   * A client-side navigation is the other one, and it is specific to running
   * a smooth scroller. Next does scroll the window to the top, but Lenis
   * holds its own `animatedScroll` and writes it back on the very next frame,
   * so the new route immediately snapped to wherever the old one had been
   * left. It has to be told directly, and told to jump rather than animate,
   * hence `immediate`.
   */
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const lenis = window.lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);

    // Triggers were measured against the previous route's document. Nothing
    // on the new one is in the place they think it is.
    ScrollTrigger.refresh();
  }, [pathname]);

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
      /*
       * `lerp`, not `duration`. Duration mode re-derives an eased tween from
       * every wheel event, so a burst of them stacks into a long tail of
       * catch-up movement, the "heavy, still moving after I stopped" feel.
       * A per-frame lerp always chases one target and cannot stack.
       *
       * 0.09 is the glide. Higher reads as stiff, the scroller arrives almost
       * with the wheel and there is no ease to feel; much lower and it floats
       * away from the input. This is also the only knob that changes how
       * scrolling *feels* as opposed to how fast it runs, so if it ever needs
       * retuning, tune this and not the animations.
       */
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      // Native momentum on touch is already smooth and better than anything
      // a rAF loop can fake; syncing it just fights the platform.
      syncTouch: false,
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
