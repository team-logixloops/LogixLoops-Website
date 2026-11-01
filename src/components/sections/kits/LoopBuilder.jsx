"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, SectionHeader } from "@/components/ui";
import { FadeInUp } from "@/components/motion";
import { cn } from "@/lib/utils";
import { useMarketCurrency } from "@/hooks/useMarketCurrency";
import { buildHref, builds, formatAmount, matchingBuild, quote } from "@/lib/loop-builder";
import { SECTION, accent } from "@/components/sections/service-master/tokens";
import PriceNote from "./PriceNote";
import LoopRing from "./LoopRing";
import CurrencySwitch from "./CurrencySwitch";

/** A figure that changes in place: the old one lifts out, the new one rises in. */
function Figure({ value, className }) {
  return (
    <span className={cn("relative inline-flex overflow-hidden", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "60%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-60%", opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * One of the three ready-made builds. A price card, so it takes the
 * `level-gauge` hover from the hover vocabulary: the bar fills like a
 * quantity, which is what a price is.
 */
function BuildCard({ build, loop, currency, active, onPick }) {
  const q = quote(loop, build.addOns, currency);
  const featured = build.id === "recommended";
  const money = (n) => formatAmount(n, currency);

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onPick(build.addOns)}
      className={cn(
        "level-gauge group relative flex h-full flex-col rounded-2xl border p-6 text-left transition-[border-color,background-color,box-shadow,translate] duration-300",
        featured && "sm:-translate-y-3 shadow-lg shadow-primary/10",
        active
          ? "border-primary bg-primary/[0.06]"
          : featured
            ? "border-primary/40 bg-surface-container-lowest"
            : "border-outline-variant/40 bg-surface-container-lowest/85 hover:border-primary/30"
      )}
    >
      {featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-primary to-tertiary px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-widest text-white">
          Our pick
        </span>
      )}
      <span className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant">{build.label}</span>
      <span className="mt-1 font-body text-body-sm text-on-surface-variant">{build.note}</span>

      <span className="mt-5 flex items-baseline gap-2">
        <span className="font-display text-headline-md font-semibold text-on-surface">{money(q.total)}</span>
        {q.saving > 0 && (
          <s className="font-body text-sm text-on-surface-variant/70 decoration-1">{money(q.separately)}</s>
        )}
      </span>

      <span className="mt-3 flex flex-wrap items-center gap-2">
        {q.saving > 0 ? (
          <span className="rounded-full bg-tertiary/10 px-2.5 py-1 font-label text-[11px] font-semibold text-tertiary">
            Flat {money(q.saving)} off
          </span>
        ) : (
          <span className="rounded-full bg-surface-container px-2.5 py-1 font-label text-[11px] font-semibold text-on-surface-variant">
            Starting from
          </span>
        )}
        <span className="font-body text-xs text-on-surface-variant">
          {build.addOns.length ? `Loop + ${build.addOns.length} add-on${build.addOns.length > 1 ? "s" : ""}` : "The Loop on its own"}
        </span>
      </span>

      <span className="mt-auto pt-5 font-body text-xs text-on-surface-variant">
        Start with <span className="font-semibold text-on-surface">{money(q.deposit)}</span>
      </span>
    </button>
  );
}

/**
 * Build your Loop: the add-ons section, turned into the place a buyer prices
 * their own project.
 *
 * Three ready-made builds sit above a live builder. They run most expensive
 * first so the full build anchors the other two (see `builds`), and the
 * builder opens on the recommended one. That is a default, not a purchase:
 * nothing is charged here, every piece is visible and one tap removes it, and
 * the form shows the build again before anything is sent.
 *
 * The only discount is the real one, add-ons cost less taken with the Loop
 * than ordered later, and the struck-through figure is what those same pieces
 * cost bought separately. No timers, no "only N left", no invented list price.
 *
 * `loop` is the slice of the kit record this needs, built on the server so the
 * catalogue stays out of the client bundle.
 */
export default function LoopBuilder({ loop, color }) {
  const [currency, setCurrency] = useMarketCurrency();
  const [picked, setPicked] = useState(loop.recommended);
  const a = accent(color);
  const q = quote(loop, picked, currency);
  const active = matchingBuild(loop, picked);
  const money = (n) => formatAmount(n, currency);

  const toggle = (name) =>
    setPicked((current) => (current.includes(name) ? current.filter((n) => n !== name) : [...current, name]));

  return (
    <section id="build" className={cn(SECTION, "scroll-mt-24")}>
      <FadeInUp>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            overline="Build your Loop"
            title="Pick a build, or make your own"
            description="Add-ons taken with the Loop cost less than adding them after launch, because we plan and build them in the same run."
            align="left"
            className="mb-0"
          />
          <CurrencySwitch currency={currency} onChange={setCurrency} className="self-start md:self-auto" />
        </div>
      </FadeInUp>

      {/* Ready-made builds, most expensive first. */}
      <div className="mt-stack-lg grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4 lg:gap-6">
        {builds(loop).map((build) => (
          <BuildCard
            key={build.id}
            build={build}
            loop={loop}
            currency={currency}
            active={active === build.id}
            onPick={setPicked}
          />
        ))}
      </div>

      {/* The live builder. */}
      <div className="mt-stack-lg grid grid-cols-1 items-center gap-10 rounded-3xl border border-outline-variant/40 bg-surface-container-lowest/85 p-6 shadow-sm md:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex flex-col items-center">
          <LoopRing loop={loop} picked={picked} currency={currency} color={color} className="mx-auto">
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
              {active === "complete" ? "Loop closed" : "Your Loop"}
            </span>
            <Figure value={money(q.total)} className="mt-1 font-display text-display-sm font-semibold text-on-surface" />
            {q.saving > 0 ? (
              <span className="mt-2 rounded-full bg-tertiary/10 px-2.5 py-1 font-label text-[11px] font-semibold text-tertiary">
                Flat {money(q.saving)} off
              </span>
            ) : (
              <span className="mt-2 font-label text-[11px] text-on-surface-variant">Starting price</span>
            )}
          </LoopRing>
          <p className="mt-4 text-center font-body text-body-sm text-on-surface-variant">
            {loop.timeline} for the Loop. {loop.includesCount} things included before any add-on.
          </p>
        </div>

        <div>
          <ul className="divide-y divide-outline-variant/30 border-y border-outline-variant/30">
            <li className="flex items-center gap-4 py-4">
              <span className={cn("flex h-6 w-6 flex-none items-center justify-center rounded-md text-white", a.dot)}>
                <span className="material-symbols-outlined text-[16px]">check</span>
              </span>
              <span className="flex-1 font-body text-body-md font-medium text-on-surface">{loop.name}</span>
              <span className="whitespace-nowrap font-display text-base font-semibold text-on-surface">{money(loop.price[currency])}</span>
            </li>
            {loop.addOns.map((addOn) => {
              const on = picked.includes(addOn.name);
              return (
                <li key={addOn.name}>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    onClick={() => toggle(addOn.name)}
                    className="group flex w-full items-center gap-4 py-4 text-left"
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 flex-none items-center justify-center rounded-md border transition-colors duration-300",
                        on ? "border-primary bg-primary text-white" : "border-outline-variant bg-surface-container-lowest text-transparent group-hover:border-primary/60"
                      )}
                    >
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </span>
                    <span className={cn("flex-1 font-body text-body-md transition-colors", on ? "text-on-surface" : "text-on-surface-variant")}>
                      {addOn.name}
                    </span>
                    <span className={cn("whitespace-nowrap font-display text-base font-semibold transition-colors", on ? a.text : "text-on-surface-variant")}>
                      + {money(addOn.price[currency])}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <dl className="mt-6 space-y-2 font-body text-body-sm">
            {q.saving > 0 && (
              <>
                <div className="flex justify-between text-on-surface-variant">
                  <dt>Bought separately</dt>
                  <dd><s className="decoration-1">{money(q.separately)}</s></dd>
                </div>
                <div className="flex justify-between text-tertiary">
                  <dt>Taken with the Loop</dt>
                  <dd className="font-semibold">− {money(q.saving)}</dd>
                </div>
              </>
            )}
            <div className="flex items-baseline justify-between pt-2">
              <dt className="font-label text-label-caps uppercase tracking-widest text-on-surface">Your Loop</dt>
              <dd><Figure value={money(q.total)} className="font-display text-headline-md font-semibold text-on-surface" /></dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-body text-body-sm text-on-surface-variant">
              Start with <span className="font-semibold text-on-surface">{money(q.deposit)}</span>. The rest at launch.
            </p>
            <Button href={buildHref(loop, picked, currency)} size="lg" icon="arrow_forward" iconPosition="right">
              Send this build
            </Button>
          </div>
        </div>
      </div>

      <PriceNote className="mt-6 max-w-3xl" />
    </section>
  );
}
