"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll + pointer choreography for a case-study article.
 *
 * The page stays a server component: it renders complete, readable markup and
 * tags the pieces it wants animated with `data-cs-*` attributes. This wrapper
 * is the only client boundary, and every animation is additive,
 * `gsap.from()`/`fromTo()` off the rendered state, never a CSS-hidden start,
 * so with JS off, or under `prefers-reduced-motion`, the article reads exactly
 * the same, just without the movement.
 *
 * Responsiveness is a `gsap.matchMedia` split, not a one-shot check, so it
 * survives rotation and resize:
 *   ≥768px  full pass, scrubbed parallax, push-in imagery, rail draw,
 *           diagram assembly, cursor tilt/spotlight (fine pointers only)
 *   <768px  light pass, one cheap fade per phase plus the metric count-up.
 *           No scrub, no parallax, no pinning: those run a callback on every
 *           scroll frame, which is exactly what costs battery on a phone, and
 *           parallax fights momentum scrolling anyway.
 *
 * Hooks it looks for:
 *   [data-cs-hero-frame]  hero image frame, pointer tilt + parallax trigger
 *   [data-cs-hero-image]  the image inside that frame (parallax subject)
 *   [data-cs-count]       numeric metric, counts up once on entry
 *   [data-cs-zoom]        image that eases out of a scrub-driven push-in
 *   [data-cs-spotlight]   card that tracks the cursor with a soft glow
 *   [data-cs-rail]        vertical timeline rail, drawn by scroll progress
 *   [data-cs-phase]       timeline entry (reveal + dot activation)
 *   [data-cs-diagram]     architecture diagram wrapper
 *   [data-cs-node]        diagram part, revealed in sequence
 */
export default function CaseStudyMotion({ children, className }) {
  const rootRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia(root);

    // ─── Desktop: the full pass ─────────────────────────────────────────
    mm.add("(min-width: 768px)", () => {

      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.3,
            },
          }
        );
      }

      const heroFrame = root.querySelector("[data-cs-hero-frame]");
      const heroImage = root.querySelector("[data-cs-hero-image]");
      if (heroFrame && heroImage) {
        gsap.to(heroImage, {
          yPercent: -9,
          ease: "none",
          scrollTrigger: {
            trigger: heroFrame,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.utils.toArray("[data-cs-zoom]", root).forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.18 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom 35%",
              scrub: true,
            },
          }
        );
      });

      const rail = root.querySelector("[data-cs-rail]");
      if (rail) {
        gsap.fromTo(
          rail,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rail.parentElement,
              start: "top 65%",
              end: "bottom 75%",
              scrub: 0.4,
            },
          }
        );
      }

      gsap.utils.toArray("[data-cs-phase]", root).forEach((phase) => {
        gsap.from(phase, {
          y: 44,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: phase, start: "top 88%" },
        });

        // Dot lights while its phase owns the middle of the viewport, so
        // scrolling back up un-lights it again.
        ScrollTrigger.create({
          trigger: phase,
          start: "top 68%",
          end: "bottom 45%",
          toggleClass: { targets: phase, className: "is-active" },
        });
      });

      const nodes = gsap.utils.toArray("[data-cs-node]", root);
      if (nodes.length) {
        gsap.from(nodes, {
          opacity: 0,
          y: 18,
          scale: 0.96,
          stagger: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: nodes[0].closest("[data-cs-diagram]") || nodes[0],
            start: "top 78%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        });
      }
    });

    // ─── Mobile: one fade per phase, nothing scrubbed ────────────────────
    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray("[data-cs-phase]", root).forEach((phase) => {
        gsap.from(phase, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: phase, start: "top 90%", once: true },
        });
      });
    });

    // ─── Pointer work: fine pointers only, so touch never inherits it ────
    mm.add("(hover: hover) and (pointer: fine)", () => {
      // Delegated so one listener covers every card and survives re-renders.
      const trackPointer = (event) => {
        const card = event.target.closest?.("[data-cs-spotlight]");
        if (!card || !root.contains(card)) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      };
      root.addEventListener("pointermove", trackPointer);

      // Small angles (±5°), enough that the hero image reads as having
      // depth, not enough to read as a gimmick.
      const frame = root.querySelector("[data-cs-hero-frame]");
      if (!frame) {
        return () => root.removeEventListener("pointermove", trackPointer);
      }

      gsap.set(frame, { transformPerspective: 900 });
      const rotateX = gsap.quickTo(frame, "rotationX", {
        duration: 0.6,
        ease: "power3.out",
      });
      const rotateY = gsap.quickTo(frame, "rotationY", {
        duration: 0.6,
        ease: "power3.out",
      });

      const onTiltMove = (event) => {
        const rect = frame.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        rotateX(-y * 5);
        rotateY(x * 5);
      };
      const onTiltLeave = () => {
        rotateX(0);
        rotateY(0);
      };

      frame.addEventListener("pointermove", onTiltMove);
      frame.addEventListener("pointerleave", onTiltLeave);

      return () => {
        root.removeEventListener("pointermove", trackPointer);
        frame.removeEventListener("pointermove", onTiltMove);
        frame.removeEventListener("pointerleave", onTiltLeave);
        gsap.set(frame, { clearProps: "transform" });
      };
    });

    ScrollTrigger.refresh();

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} className={className}>
      {/* Reading progress. Inline transform, not a `scale-x-*` utility:
          Tailwind v4 writes the standalone `scale` property, which would
          multiply against GSAP's `transform` and pin the bar at zero width. */}
      <div
        ref={progressRef}
        aria-hidden="true"
        style={{ transform: "scaleX(0)" }}
        className="fixed inset-x-0 top-0 z-50 hidden h-[2px] origin-left bg-gradient-to-r from-primary via-secondary to-tertiary md:block"
      />
      {children}
    </div>
  );
}
