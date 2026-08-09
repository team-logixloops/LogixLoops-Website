"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ENGINEERING_WORKFLOW } from "@/data/infrastructure";

gsap.registerPlugin(ScrollTrigger);

/**
 * ProcessTimeline, the eight-phase engagement, told by scrolling it.
 *
 * Two things are tied to the scrollbar and nothing else is:
 *
 *   The rail is *followed*, a gradient line whose scaleY tracks scroll
 *   progress through the list, so the reader can see how much of the
 *   engagement is behind them without counting cards.
 *
 *   Each phase is *triggered*, it lights its node, comes up from its resting
 *   dim state, and reports itself to the sticky index on the left while it
 *   owns the middle of the viewport. Scrolling back up un-reports it, so the
 *   index is always describing what is actually being read.
 *
 * The index is the only piece of React state involved. Progress is written
 * straight to a transform by GSAP rather than through a setState on every
 * scroll frame, a per-frame React render is the usual way a section like
 * this ends up costing more than it is worth.
 *
 * Everything degrades cleanly: under `prefers-reduced-motion` the rail is
 * drawn full, every phase is marked active, and the section becomes an
 * ordinary readable list. With JS off it already is one, the markup renders
 * complete and nothing here hides content before animating it in.
 */
export default function ProcessTimeline() {
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const railRef = useRef(null);
  const meterRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const list = listRef.current;
    if (!root || !list) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phases = gsap.utils.toArray("[data-phase]", root);

    if (reduced) {
      phases.forEach((phase) => phase.classList.add("is-active"));
      gsap.set([railRef.current, meterRef.current], { scaleY: 1, scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // The rail and the index meter are the same measurement drawn twice, so
      // they share one trigger rather than two that could drift apart.
      const drawn = { rail: railRef.current, meter: meterRef.current };
      Object.entries(drawn).forEach(([key, el]) => {
        if (!el) return;
        gsap.fromTo(
          el,
          key === "rail" ? { scaleY: 0 } : { scaleX: 0 },
          {
            ...(key === "rail" ? { scaleY: 1 } : { scaleX: 1 }),
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top 72%",
              end: "bottom 65%",
              scrub: 0.4,
            },
          }
        );
      });

      phases.forEach((phase, index) => {
        gsap.from(phase, {
          y: 44,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: phase, start: "top 88%", once: true },
        });

        ScrollTrigger.create({
          trigger: phase,
          // Ends before the card leaves, not as it leaves: the next phase
          // should take the index over while this one is still on screen,
          // otherwise the readout blanks between cards.
          start: "top 62%",
          end: "bottom 42%",
          toggleClass: { targets: phase, className: "is-active" },
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  /** Jump to a phase from the index. Goes through Lenis when it is driving
   *  the page, since a native `scrollIntoView` fights its rAF loop and lands
   *  in the wrong place. */
  const goToPhase = (phase) => {
    const target = document.getElementById(`phase-${phase}`);
    if (!target) return;
    if (window.lenis) {
      window.lenis.scrollTo(target, { offset: -140 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const active = ENGINEERING_WORKFLOW[activeIndex];

  return (
    <div
      ref={rootRef}
      className="mt-stack-xl grid gap-gutter lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-16"
    >
      {/* ── Sticky index ───────────────────────────────────────────────────
          Desktop only. It exists to answer "where am I in this" without
          scrolling back, which is a question a phone user resolves by
          scrolling anyway, and a sticky panel on a short viewport costs
          more screen than it returns. */}
      <aside className="hidden lg:block" aria-hidden="true">
        <div className="sticky top-28">
          <p className="font-label text-label-caps uppercase tracking-widest text-outline">
            Phase
          </p>
          <p className="mt-2 font-display text-display-lg leading-none text-primary">
            {active.phase}
            <span className="text-outline-variant"> / 08</span>
          </p>
          <h3 className="mt-4 font-heading text-headline-md text-on-surface">
            {active.title}
          </h3>
          <p className="mt-2 font-label text-label-caps uppercase tracking-widest text-secondary">
            {active.governedBy}
          </p>

          {/* Progress meter, the same scroll measurement as the rail. */}
          <div className="mt-6 h-px w-full bg-outline-variant/50">
            <div
              ref={meterRef}
              style={{ transform: "scaleX(0)" }}
              className="h-px w-full origin-left bg-gradient-to-r from-primary to-secondary"
            />
          </div>

          <ol className="mt-6 space-y-1">
            {ENGINEERING_WORKFLOW.map((step, index) => (
              <li key={step.phase}>
                <button
                  type="button"
                  onClick={() => goToPhase(step.phase)}
                  className={`group flex w-full items-center gap-3 rounded-md py-1.5 pr-2 text-left transition-colors duration-300 ${
                    index === activeIndex
                      ? "text-on-surface"
                      : "text-outline hover:text-on-surface-variant"
                  }`}
                >
                  <span
                    className={`h-px transition-all duration-500 ${
                      index === activeIndex
                        ? "w-8 bg-primary"
                        : "w-4 bg-outline-variant group-hover:w-6"
                    }`}
                  />
                  <span className="font-label text-label-sm uppercase tracking-widest">
                    {step.phase}
                  </span>
                  <span className="truncate font-body text-body-sm">
                    {step.title}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      {/* ── The phases ──────────────────────────────────────────────────── */}
      <ol ref={listRef} className="relative pl-12 md:pl-16">
        {/* Track and drawn rail sit at the same x so the second appears to
            fill the first rather than to sit beside it. */}
        <span
          aria-hidden="true"
          className="absolute left-[15px] top-3 bottom-3 w-px bg-outline-variant/50"
        />
        <span
          ref={railRef}
          aria-hidden="true"
          style={{ transform: "scaleY(0)" }}
          className="pt-rail absolute left-[15px] top-3 bottom-3 w-px origin-top"
        />

        {ENGINEERING_WORKFLOW.map((step) => (
          <li
            key={step.phase}
            id={`phase-${step.phase}`}
            data-phase
            className="relative scroll-mt-32 pb-stack-lg last:pb-0"
          >
            <span
              aria-hidden="true"
              className="pt-node absolute left-[9px] top-8 h-3 w-3 rounded-full bg-outline-variant ring-4 ring-surface-container-low"
            />

            <article className="pt-body glow-sweep rounded-2xl border border-outline-variant/40 bg-surface-container-lowest/70 p-6 shadow-glass backdrop-blur-xl md:p-8">
              <header className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="font-poster text-display-lg leading-none text-primary/20">
                  {step.phase}
                </span>
                <h3 className="flex-1 font-heading text-headline-md text-on-surface">
                  {step.title}
                </h3>
                <span
                  className="material-symbols-outlined icon-md text-outline-variant"
                  aria-hidden="true"
                >
                  {step.icon}
                </span>
              </header>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-outline-variant/30 py-3">
                <span className="font-label text-label-caps uppercase tracking-widest text-secondary">
                  {step.governedBy}
                </span>
                <span className="font-label text-label-sm uppercase tracking-widest text-outline">
                  {step.cadence}
                </span>
              </div>

              <p className="mt-4 font-body text-body-md text-on-surface-variant">
                {step.detail}
              </p>

              <p className="mt-5 font-label text-label-sm uppercase tracking-widest text-outline">
                Hands off
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {step.deliverables.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-outline-variant/50 bg-surface-container-low/60 px-3 py-1 font-label text-label-sm text-on-surface-variant"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {/* The exit condition, not a summary. A phase that cannot state
                  what has to be true before the next one starts is a label,
                  not a gate. */}
              <p className="mt-5 flex gap-2 font-body text-body-sm text-on-surface-variant">
                <span
                  className="material-symbols-outlined mt-0.5 shrink-0 text-[18px] text-tertiary"
                  aria-hidden="true"
                >
                  flag
                </span>
                <span>
                  <span className="font-label uppercase tracking-widest text-tertiary">
                    Exit gate ·{" "}
                  </span>
                  {step.exit}
                </span>
              </p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
