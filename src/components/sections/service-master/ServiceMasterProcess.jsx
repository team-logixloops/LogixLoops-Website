"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/components/ui";
import { FadeInUp } from "@/components/motion";
import { cn } from "@/lib/utils";
import { SECTION, accent } from "./tokens";

/**
 * Height of the strip each stuck card keeps visible once the next one parks
 * under it: enough for the number badge and the phase title, nothing more.
 * Card N sticks PEEK px below card N-1, so the phases read top-to-bottom as a
 * growing deck instead of piling onto the same spot.
 */
const PEEK = 64;
const TOP_BASE = 88;

/**
 * The phases are a real sequence, so they get a real sequential device: each
 * card sticks, the next parks just under it, and the deck grows downward.
 *
 * Cards here are OPAQUE on purpose, the shared CARD token is translucent
 * glass, and stacked glass lets six cards' text bleed through each other.
 *
 * Desktop only. On phones the cards are a plain list: a sticky deck there
 * costs a scroll-linked repaint per frame on the weakest hardware, and tall
 * cards on a short viewport leave nothing to stack against anyway.
 */
export default function ServiceMasterProcess({ workflow, color }) {
  const a = accent(color);
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !workflow?.length) return;

    const heavyMotionOk = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)"
    ).matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!heavyMotionOk || reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Settle in on first approach. The tween targets the inner card, never
      // the sticky <li>, transforming the sticky box itself fights the stick.
      gsap.utils.toArray("[data-phase-card]").forEach((card) => {
        gsap.from(card, {
          y: 28,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        });
      });
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [workflow]);

  if (!workflow?.length) return null;

  return (
    <section className={SECTION}>
      <FadeInUp>
        <SectionHeader
          overline="Methodology"
          title="How We Deliver"
          description="Six phases, in order. Each one closes before the next opens."
        />
      </FadeInUp>

      <div ref={rootRef} className="mt-stack-lg max-w-3xl mx-auto md:pb-[16vh]">
        <ol className="flex flex-col gap-4 md:gap-[24vh]">
          {workflow.map((step, i) => (
            <li
              key={step.phase}
              className="md:sticky"
              /* Ignored while the card is static on mobile. */
              style={{ top: `${TOP_BASE + i * PEEK}px` }}
            >
              <div
                data-phase-card
                className={cn(
                  "glow-sweep rounded-2xl border border-outline-variant/40 p-5 md:p-6",
                  /* Opaque, see the note above the component. */
                  "bg-surface-container-lowest shadow-[0_12px_32px_-12px_rgba(8,29,74,0.18)]"
                )}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-label text-label-caps tracking-widest",
                      a.soft,
                      a.text
                    )}
                  >
                    {step.phase}
                  </span>
                  <h3 className="font-heading text-headline-md text-xl text-on-surface">
                    {step.title}
                  </h3>
                </div>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed mt-3 md:pl-14">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
