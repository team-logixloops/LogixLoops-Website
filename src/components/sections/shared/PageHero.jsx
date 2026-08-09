"use client";

import { SplitHeadline, FadeInUpImmediate, HeroExit } from "@/components/motion";
import { ScrollCue } from "@/components/ui";
import FieldBackdrop from "@/components/webgl/FieldBackdrop";

/**
 * LOGIXLOOPS: Interior page hero
 *
 * Six routes were each hand-rolling the same block: `pt-40 pb-stack-xl`, a
 * centred column, a caps eyebrow, an `h1` with a coloured trailing phrase,
 * and a lead paragraph. Same structure, six slightly different sets of
 * spacing values, and each one had to be edited separately whenever the
 * pattern changed. It is one component now.
 *
 * What it adds beyond deduplication:
 *
 *   - A `ShaderField` tuned per route (see `webgl/presets.js`), faded out at
 *     the bottom edge so the hero hands off to the next band rather than
 *     stopping at a visible seam.
 *   - The heading arrives word by word instead of as one fading block, which
 *     is the only page-load choreography on an interior page, everything
 *     below it stays on the quiet `FadeInUp` default.
 *
 * Everything in here uses `FadeInUpImmediate`, not `FadeInUp`. The scrolled
 * variant is scrub-linked across a window running from the bottom edge of the
 * viewport up to 38%, correct below the fold, and wrong here, because hero
 * copy sits around the middle of the screen at rest and would therefore load
 * at partial progress. A lead paragraph rendering at 70% opacity until the
 * reader scrolls is not a reveal, it is a bug.
 *
 * It holds a full viewport. Interior heroes used to be a padding value
 * (`pt-40 pb-stack-xl`) and were therefore as tall as whatever copy they
 * happened to contain, a two-line lead produced a shorter hero than a
 * three-line one, so no two pages opened the same way and none of them
 * matched the home page, which has always been full-height. The height is
 * `100svh` minus the navbar rather than `100svh`, because the layout already
 * offsets `main` by the bar; the full value overflowed by exactly that
 * amount and pushed the scroll cue off screen.
 *
 * The exit is `HeroExit` and the arrival of what follows is `PageSurface`;
 * the two are designed against each other and a hero used without a surface
 * below it will hand off to a hard edge.
 */
export default function PageHero({
  /* Short caps label above the heading. Says what kind of page this is. */
  eyebrow,
  /* Leading, unemphasised words of the `h1`. */
  title,
  /* Trailing phrase, set in the brand colour. Optional. */
  accent,
  /* One paragraph. Kept to a single sentence or two, this is the passage a
     search snippet quotes. */
  lead,
  /* Which tuning of the contour field to run behind it. */
  preset = "home",
  /* Buttons or anything else that belongs under the lead. */
  children,
  /* A full-bleed element under the copy, a moving band, a strip of art.
     Rendered outside `HeroExit` on purpose: the copy scrubs away on scroll
     and a band that left with it would be a band nobody finishes reading.
     It also escapes the centred container, so it can run edge to edge. */
  band,
  /* Overline colour, so a page can tie its eyebrow to its own accent
     (security's is `text-error`, everything else uses the secondary). */
  eyebrowClassName = "text-secondary",
  /* Label under the scroll marker. Pass `null` to drop the cue entirely,
     appropriate only where the hero is not the first thing on the page. */
  cue = "Scroll",
  className = "",
}) {
  return (
    <section
      // Read by `HeroExit` to find the box it should measure its scrub window
      // against. It cannot use its own wrapper: that is the element the tween
      // is displacing.
      data-hero
      className={`relative w-full min-h-[calc(100svh-5rem)] overflow-hidden flex flex-col items-center justify-center py-stack-xl ${className}`}
    >
      <FieldBackdrop preset={preset} fade="bottom" />

      <HeroExit className="container-site relative z-10 text-center">
        {eyebrow && (
          <FadeInUpImmediate>
            <span
              className={`font-label text-label-caps tracking-widest uppercase mb-4 block ${eyebrowClassName}`}
            >
              {eyebrow}
            </span>
          </FadeInUpImmediate>
        )}

        <SplitHeadline
          as="h1"
          text={title}
          accent={accent}
          className="font-display text-display-xl text-on-surface mb-stack-sm max-w-4xl mx-auto tracking-tight text-balance"
        />

        {lead && (
          <FadeInUpImmediate delay={0.25}>
            <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto text-pretty">
              {lead}
            </p>
          </FadeInUpImmediate>
        )}

        {children && (
          <FadeInUpImmediate delay={0.35}>
            <div className="mt-stack-md flex flex-wrap items-start justify-center gap-3 sm:gap-4">
              {children}
            </div>
          </FadeInUpImmediate>
        )}
      </HeroExit>

      {band && <div className="relative z-10 w-full mt-stack-md">{band}</div>}

      {/* Outside `HeroExit` so it holds still while the copy above it leaves.
          A cue that fades out with the content is telling you to scroll at
          exactly the moment you already are. */}
      {cue && <ScrollCue label={cue} />}
    </section>
  );
}
