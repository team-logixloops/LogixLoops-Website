"use client";

import { Button } from "@/components/ui";
import ConstellationGrid from "@/components/ui/ConstellationGrid";
import RotatingWord from "@/components/ui/RotatingWord";
import { FadeInUpImmediate, HeroExit } from "@/components/motion";
import { PROMISES } from "@/lib/constants";

// Each has to read in "Your next ___ is one Loop away", and together they cover
// the lines a first-time visitor is most likely to be shopping for: a brand, a
// website, a store, an app and an AI agent.
const HEADLINE_WORDS = ["Brand", "Website", "Store", "App", "AI Agent"];

// Three of the six promises, the three a buyer can check before paying: the
// price is on the page, the accounts are in their name, and the site is set up
// to be found. Read from PROMISES so the wording matches every kit page.
const PILLARS = ["Price on the box", "Yours from day one", "Built to be found"].map((title) =>
  PROMISES.find((promise) => promise.title === title)
);

export default function HeroSection() {
  return (
    // The section colour is flat and matches the value `ConstellationGrid`
    // fills its canvas with, so nothing seams if the canvas is still mounting.
    <section
      id="home-hero"
      // Read by `HeroExit` to find the box its scrub window measures against.
      data-hero
      // `100svh` minus the navbar, not `100svh`. The layout already offsets
      // `main` by the bar's height, so a full-viewport hero was always taller
      // than the space left for it, which is what pushed the pillars off the
      // bottom of the screen.
      className="relative w-full min-h-[calc(100svh-5rem)] overflow-hidden flex items-center bg-[#f2f7fe]"
    >
      {/* Constellation canvas, sized to this section via ResizeObserver */}
      <div className="absolute inset-0 z-0">
        <ConstellationGrid />
      </div>

      {/* Soft-dissolve the canvas texture into whatever sits below. That is
          the marquee band, so the fade resolves to `surface-container-low`
          and not `surface`, landing on a lighter colour than the next
          section is what produced the pale stripe across the boundary. */}
      <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-surface-container-low to-transparent pointer-events-none z-[1]" />

      {/* The section centres its content, so vertical rhythm comes from the
          gaps below rather than from a large fixed `pt-*` fighting the
          centring. */}
      <HeroExit className="container-site relative z-10 w-full py-10 sm:py-12">
        <div className="flex flex-col gap-5 sm:gap-7 max-w-2xl text-left">
          <FadeInUpImmediate delay={0.1}>
            {/*
              Three fixed lines, with the rotating word alone on the second.

              Inline, the word was reflowing the whole heading: "Velocity" fit
              two lines where "Architecture" needed three, so every rotation
              moved the body copy, the button and the pillars down the page
              and back. Giving the word its own line makes the line count
              constant no matter which word is showing, the heading's height
              never changes, and nothing below it moves.

              It also reads better. The swap is the only thing in motion, so
              it isn't competing with words shuffling around it.
            */}
            <h1 className="font-display text-[clamp(2.25rem,4.6vw,3.75rem)] text-on-surface leading-[1.08] tracking-tight">
              <span className="block">Your next</span>
              {/* Wrapped rather than passed `block`: RotatingWord's own box is
                  `inline-flex` so it hugs the word, and two display utilities
                  on one element resolve by stylesheet order, not by the order
                  they appear in the class list. */}
              <span className="block">
                <RotatingWord words={HEADLINE_WORDS} />
              </span>
              <span className="block">is one Loop away.</span>
            </h1>
          </FadeInUpImmediate>

          <FadeInUpImmediate delay={0.2}>
            {/* Two sentences. The first is the entity definition in plain
                words, base and markets included, because it is what an
                answer engine quotes; the second is the offer. */}
            <p className="font-body text-body-md sm:text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
              LogixLoops is a brand, tech and growth studio in Jaipur,
              building for businesses in India, the US, the UK and the UAE.
              Pick a Loop, see the price upfront, and own everything we make.
            </p>
          </FadeInUpImmediate>

          <FadeInUpImmediate delay={0.3}>
            {/*
              Two CTAs with genuinely different jobs, not one button repeated.
              A visitor arrives in one of two states, ready to talk, or still
              deciding, and a lone "Get Started" only serves the first. The
              second button is the evidence route.

              `items-start` rather than a stretched row: these are wrapped in
              the magnetic effect's inline-block shell, so letting them stretch
              would make the pull effect drag a full-width slab around.
            */}
            <div className="flex flex-wrap items-start gap-3 sm:gap-4">
              {/* The kits lead: a fixed scope with a published price answers
                  "what will this cost?" before the reader has to ask. */}
              <Button
                href="/loops"
                size="lg"
                className="px-8 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_16px_-4px_rgba(40,104,198,0.4)]"
                icon="arrow_forward"
                iconPosition="right"
              >
                Browse the Loops
              </Button>
              <Button
                href="/contact"
                variant="ghost"
                size="lg"
                className="px-8 rounded-full"
              >
                Talk to the people who build it
              </Button>
            </div>
          </FadeInUpImmediate>

          <FadeInUpImmediate delay={0.4}>
            <div className="pt-5 sm:pt-6 border-t border-outline-variant">
              <p className="font-label text-label-caps text-brand-steel uppercase tracking-widest mb-4">
                What you get, every time
              </p>
              {/*
                Cards rather than a row of icon+label pairs. Three claims set
                in the same weight as body copy read as a caption; giving each
                its own surface makes them read as three things the company
                stands behind. The second line is what earns the extra space,
                a bare "Zero-Trust Security" is a noun, not a promise.
              */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PILLARS.map(({ icon, title: label, detail }) => (
                  <div
                    key={label}
                    className="group relative overflow-hidden rounded-xl border border-outline-variant/60 bg-surface-container-lowest/70 backdrop-blur-md p-3.5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glass-hover"
                  >
                    {/* Wipes up from the floor of the card on hover. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-primary/10 to-transparent transition-[height] duration-300 group-hover:h-full"
                    />
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                      <span className="material-symbols-outlined text-[18px]">
                        {icon}
                      </span>
                    </span>
                    <p className="relative mt-2.5 font-body text-sm font-semibold text-on-surface">
                      {label}
                    </p>
                    <p className="relative mt-1 font-body text-xs text-on-surface-variant leading-snug">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUpImmediate>
        </div>
      </HeroExit>
    </section>
  );
}
