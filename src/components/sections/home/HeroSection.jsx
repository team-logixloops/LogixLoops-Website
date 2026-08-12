"use client";

import { Button } from "@/components/ui";
import ConstellationGrid from "@/components/ui/ConstellationGrid";
import RotatingWord from "@/components/ui/RotatingWord";
import { FadeInUpImmediate, HeroExit } from "@/components/motion";

// Each has to read grammatically in "We fix the ___ you're scared to touch",
// and each should name a different scar rather than being four synonyms for
// "system". A CTO recognises all four immediately, which is the job: the
// heading has to describe their week, not our capability.
const HEADLINE_WORDS = ["Systems", "Deploys", "Migrations", "Integrations"];

// Three commitments, not three adjectives. The third used to be "High
// Performance / Measured, not asserted". True, but every agency claims speed.
// Ownership is the one a prospect can check against the contract, and the only
// one of the three a competitor is unlikely to match.
//
// The second line of each is the outcome, not the mechanism. "Nothing trusted
// by default" describes how we work; "your security answers ready before the
// questionnaire" describes the morning the founder stops dreading.
const pillars = [
  {
    icon: "architecture",
    label: "Scalable Architecture",
    detail: "Load-tested to its ceiling before your traffic finds it",
  },
  {
    icon: "security",
    label: "Zero-Trust Security",
    detail: "Your security answers ready before the questionnaire is",
  },
  {
    icon: "lock_open_right",
    label: "Total Ownership",
    detail: "Source, infra and IP, yours at handover",
  },
];

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
              <span className="block">We fix the</span>
              {/* Wrapped rather than passed `block`: RotatingWord's own box is
                  `inline-flex` so it hugs the word, and two display utilities
                  on one element resolve by stylesheet order, not by the order
                  they appear in the class list. */}
              <span className="block">
                <RotatingWord words={HEADLINE_WORDS} />
              </span>
              {/* The tagline used to close the h1, and the reasoning for that
                  still holds: it is the only three words on this site anyone
                  repeats. What changed is what the first line is worth. A
                  founder whose deploys are frightening does not scan for a
                  studio that builds platforms; every studio builds platforms.
                  They scan for someone who names the thing they are avoiding.
                  So the h1 buys recognition and the tagline moves four lines
                  down, where it is still in the hero, still above the fold,
                  and now lands as the payoff rather than the pitch. */}
              <span className="block">you&apos;re scared to touch.</span>
            </h1>
          </FadeInUpImmediate>

          <FadeInUpImmediate delay={0.2}>
            {/* This paragraph is the search snippet, and the passage an answer
                engine quotes when asked what LogixLoops is. So it names the
                category, the base, the reach and the work, with no adjective
                a reader cannot check.

                It also has to finish the sentence the h1 starts, which is why
                it is two sentences and not four: the heading names the fear,
                this names who we are and what leaves with the client. The
                tagline is not glossed here. If the hero has to explain what
                an unfair advantage is, the hero has not shown one. */}
            <p className="font-body text-body-md sm:text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
              LogixLoops is a senior software engineering studio in Jaipur,
              working with teams in India, the US, the UK and the UAE.
              Founders bring us live SaaS and B2B products that have outgrown
              the way they were built, web platforms, mobile apps, cloud
              pipelines and AI systems, and leave owning something stable,
              documented and safe to change.
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
              <Button
                href="/contact"
                size="lg"
                className="px-8 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_16px_-4px_rgba(40,104,198,0.4)]"
                icon="arrow_forward"
                iconPosition="right"
              >
                {/* Names the length and who is on the call. "Discovery call"
                    is what every agency's button says and commits to nothing;
                    this one tells the reader what they are agreeing to before
                    they click, which is the same argument the button is
                    making about how we work. */}
                Book 45 minutes with an engineer
              </Button>
              {/* Points at /process, not /case-studies. For a studio this
                  young the method is the stronger evidence: the published
                  builds are reference architectures, and sending a sceptical
                  reader to them first invites the one question we would rather
                  answer on our own terms. */}
              <Button
                href="/process"
                variant="ghost"
                size="lg"
                className="px-8 rounded-full"
              >
                See how we work
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
                {pillars.map(({ icon, label, detail }) => (
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
