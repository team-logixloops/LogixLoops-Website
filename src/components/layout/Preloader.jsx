"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import LayeredText from "@/components/ui/LayeredText";
import { isEmbedded } from "@/lib/embed";
import { PRELOADER_ID, PRELOADER_SESSION_KEY } from "./preloader-gate";

const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/* Two lengths, because the two occasions are not the same. The first hit of a
   session is the one that has to carry the brand and cover a cold cache; every
   later return to the homepage is a beat, not an introduction.

   Both are timed against the stair rather than picked round: one full step
   takes 0.8s plus 6 × 0.08s of stagger = 1.28s, so the wipe starts in the beat
   where the stair is resting on a completed step, never mid-roll. */
const OPENING_MS = 2000;
const RETURN_MS = 1400;

/* Ceiling on the wait for `window.load`. A single stalled font or third-party
   image must never be able to hold the door shut. */
const LOAD_GRACE_MS = 2200;

/* Module scope, so it survives the mount → unmount → remount that Strict Mode
   performs in development. Without it the second mount reads back the flag the
   first mount just wrote and concludes the preloader has already been seen,
   which kills the opening on every dev reload of a non-home route. */
let coldLoadDecision = null;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Preloader — the layered-word slab that covers the site while it settles.
 *
 * It runs on two occasions:
 *
 *   1. The first page of a tab's session, whatever route that is.
 *   2. Every arrival at the homepage after that, including client-side
 *      navigation back to it.
 *
 * Anything else — a second article, a refresh of a deep page, a visitor who
 * asked for reduced motion — gets nothing, and gets it without a flash: the
 * inline gate above removes the overlay from the paint before React is even
 * awake.
 *
 * While it is up, scroll is locked at both layers that can move the page:
 * Lenis, which drives its own rAF loop and ignores `overflow: hidden`, and
 * native scroll for the touch and reduced-motion paths where Lenis is absent.
 */
export default function Preloader() {
  const pathname = usePathname();
  // `armed` is the server's answer: render the overlay, decide on the client.
  const [phase, setPhase] = useState("armed");

  // True until the first client-side navigation of this mount — i.e. while
  // this is still the document the browser actually loaded.
  const [isColdLoad, setIsColdLoad] = useState(true);
  const [lastPath, setLastPath] = useState(pathname);

  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const barRef = useRef(null);

  /* Every later arrival at the homepage re-arms it.
   *
   * Adjusted during render rather than from an effect: the overlay has to be
   * in the tree in the same commit as the new route, or the incoming page
   * paints for a frame before the cover lands on it. */
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setIsColdLoad(false);
    if (pathname === "/" && !isEmbedded() && !prefersReducedMotion()) {
      setPhase("running");
    }
  }

  /* Mount: resolve the server's optimistic overlay into a real decision,
     before the browser paints. */
  useIsoLayoutEffect(() => {
    if (coldLoadDecision === null) {
      let seen = null;
      try {
        seen = sessionStorage.getItem(PRELOADER_SESSION_KEY);
      } catch {
        // Private-mode Safari and hardened profiles throw on access. Treat an
        // unreadable store as "never seen" — one extra opening beats a crash.
      }

      // An embedded copy is a demo of the site running inside the site. A
      // second preloader inside a 393px device frame is noise, and the frame's
      // own document already finished loading before it was ever shown.
      coldLoadDecision =
        !prefersReducedMotion() &&
        !isEmbedded() &&
        !(seen && window.location.pathname !== "/");

      try {
        sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
      } catch {}
    }

    setPhase(coldLoadDecision ? "running" : "done");
  }, []);

  /* The run itself: lock, wait, wipe. */
  useEffect(() => {
    if (phase !== "running") return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    // The gate script may have hidden this node on a previous route; a
    // re-arm has to undo that.
    overlay.style.display = "";

    window.lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const hold = isColdLoad ? OPENING_MS : RETURN_MS;

    gsap.set(overlay, { yPercent: 0 });
    gsap.set(contentRef.current, { opacity: 1, y: 0 });
    const bar = gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: hold / 1000, ease: "power1.inOut" }
    );

    let cancelled = false;
    let exit;

    const startExit = () => {
      if (cancelled) return;
      exit = gsap.timeline({ onComplete: () => setPhase("done") });
      exit
        .to(contentRef.current, {
          opacity: 0,
          y: -28,
          duration: 0.38,
          ease: "power2.in",
        })
        .to(
          overlay,
          { yPercent: -100, duration: 0.78, ease: "power4.inOut" },
          "-=0.14"
        );
    };

    const minimum = new Promise((resolve) => setTimeout(resolve, hold));
    /* Only the first paint of a session waits on assets; a client-side return
       to the homepage has nothing left to load. */
    const loaded =
      !isColdLoad || document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) =>
            window.addEventListener("load", resolve, { once: true })
          );
    const ceiling = new Promise((resolve) =>
      setTimeout(resolve, hold + LOAD_GRACE_MS)
    );

    Promise.race([Promise.all([minimum, loaded]), ceiling]).then(startExit);

    return () => {
      cancelled = true;
      bar.kill();
      exit?.kill();
      document.body.style.overflow = previousOverflow;
      window.lenis?.start();
    };
  }, [phase, isColdLoad]);

  return (
    <>
      {phase !== "done" && (
        <div
          id={PRELOADER_ID}
          ref={overlayRef}
          /*
           * The gate script hides this element during HTML parse, before React
           * attaches. React then hydrates, finds a `style` attribute the server
           * never sent, and reports a mismatch.
           *
           * That is the same situation `<html>` and `<body>` already carry this
           * flag for, and for the same reason: something outside React's
           * knowledge legitimately mutated the DOM ahead of hydration. React
           * does not patch the difference, which is exactly what is wanted, the
           * hide has to survive, so the only thing the warning was reporting
           * was correct behaviour.
           *
           * The flag is shallow. It forgives this element's own attributes and
           * nothing inside it, so a genuine mismatch in the overlay's contents
           * still surfaces.
           */
          suppressHydrationWarning
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#f7faff]"
        >
          {/* Two soft brand washes, the same atmospheric layer the site sits
              on, so the reveal is a continuation rather than a cut. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[10%] top-[-15%] h-[55vmax] w-[55vmax] rounded-full opacity-70 blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, rgba(55,140,231,0.16) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[12%] bottom-[-18%] h-[50vmax] w-[50vmax] rounded-full opacity-70 blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, rgba(40,104,198,0.14) 0%, transparent 70%)",
            }}
          />

          {/* The stack and the wordmark do not share a flex column.
              A leaning block paints outside the box the page reserved for it,
              so a `gap` between the two is a promise the layout cannot keep —
              which is how the stack came to sit on top of the wordmark. The
              stack owns the centre, the wordmark is pinned to the floor, and
              the space between them is viewport height rather than a gap
              measured against a box that lies. */}
          <div
            ref={contentRef}
            className="relative flex h-full w-full flex-col items-center justify-center px-6"
          >
            <LayeredText animate={phase === "running"} />

            <div className="absolute inset-x-0 bottom-[max(2.5rem,8vh)] flex flex-col items-center gap-3">
              <div className="h-px w-[min(240px,60vw)] overflow-hidden bg-outline-variant/60">
                <div
                  ref={barRef}
                  className="h-full w-full origin-left bg-gradient-to-r from-primary to-secondary"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
              <p className="font-label text-label-sm uppercase tracking-[0.28em] text-brand-steel">
                LogixLoops
              </p>
            </div>
          </div>

          <span className="sr-only" role="status">
            Loading LogixLoops
          </span>
        </div>
      )}
    </>
  );
}
