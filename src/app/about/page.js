import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from "@/components/motion";
import { FlipCard, Button, SectionHeader, ScrollTimeline } from "@/components/ui";
import PageHero from "@/components/sections/shared/PageHero";
import PageSurface from "@/components/sections/shared/PageSurface";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { BRAND, PROMISES } from "@/lib/constants";
import { KIT_STEPS } from "@/data/infrastructure";

/* The six promises as flip cards: the promise on the face, the habit it
   replaces on the back. Both read from PROMISES, so they match the home page
   table and every kit page word for word. */
const TONES = ["text-primary", "text-secondary", "text-tertiary"];

/* How a kit runs, on the horizontal rail. `marker` reads as a stage label
   rather than a bare number so the rail still makes sense read aloud. */
const KIT_RAIL = KIT_STEPS.map((step, i) => ({
  id: step.title.toLowerCase().replace(/[^a-z]+/g, "-"),
  marker: `Step 0${i + 1}`,
  title: step.title,
  icon: step.icon,
  body: step.meta,
}));

const ABOUT_DESCRIPTION =
  "LogixLoops is a brand, technology and growth studio in Jaipur. Who builds your Loop, why the loop is in our name, and the six promises every Loop carries.";

export const metadata = buildMetadata({
  // Not "About LogixLoops": the root template already prefixes the brand, so
  // that rendered as "LogixLoops | About LogixLoops". Not a bare "About"
  // either, which rendered as an 18-character title and gave the SERP nothing
  // past the brand to match on.
  title: "About: Brand, Tech and Growth Studio, Jaipur",
  description: ABOUT_DESCRIPTION,
  path: "/about",
  keywords: [
    "LogixLoops",
    "digital agency in Jaipur",
    "website design company Jaipur",
    "branding and web studio India",
    "brand, tech and growth studio",
  ],
});

export default function AboutPage() {
  return (
    <main className="relative z-10 overflow-x-clip bg-surface">
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "About", path: "/about" },
        ])}
      />
      {/* AboutPage rather than plain WebPage, the subtype is what tells a
          search or answer engine this is the page describing the entity. */}
      <SchemaMarkup
        schema={generateWebPageSchema({
          type: "AboutPage",
          name: "About LogixLoops",
          description: ABOUT_DESCRIPTION,
          path: "/about",
          speakable: ["h1", "h2"],
        })}
      />
      {/* Ambient Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <div className="flex flex-col">
        {/* 1. Narrative Hero, the calmest field on the site: wide bands, the
            slowest drift. This page is people and history, so the ground under
            it should read as settled rather than as something in motion. */}
        {/* The lead is the entity definition, word for word, then the one
            claim a buyer most wants answered: who actually does the work. */}
        <PageHero
          preset="about"
          eyebrow="Who we are"
          title="One studio."
          accent="Brand, tech and growth."
          lead={`${BRAND.definition} No junior bench, no account manager relaying messages: the people you meet on the first call are the people who design, build and grow what you buy.`}
          cue="Why the loop"
        />

        <PageSurface>
          {/* 2. Why the loop is in the name */}
          <section className="py-stack-xl border-t border-outline-variant/30 bg-surface-container-lowest relative">
            <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
                <FadeInLeft>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4 block">Why the loop</span>
                  <h2 className="font-display text-display-lg text-on-surface mb-6 leading-tight">
                    Most projects end at launch. That is when the real work starts.
                  </h2>
                  <p className="font-body text-body-lg text-on-surface-variant mb-6">
                    Launch day is when real customers start telling you what
                    works, and it is exactly when most agencies send the final
                    invoice and move on. We built the studio around the loop
                    instead: build, launch, measure, improve. That is why
                    everything we sell is called a Loop, and why every Loop
                    ends with The Tune-Up: 30 days of watching real usage,
                    fixing what turns up and tuning with data, before we hand
                    everything over.
                  </p>
                  <p className="font-body text-body-lg text-on-surface-variant">
                    It is also why brand, technology and growth sit in one team.
                    A logo, a website and a search plan made by three vendors
                    rarely add up. Made together, each one makes the others
                    work harder, and you have one thread to follow instead of
                    three people to chase.
                  </p>
                </FadeInLeft>
                <FadeInRight className="relative flex justify-center">
                  <div className="w-full aspect-square max-w-[500px] rounded-full border border-primary/20 flex items-center justify-center relative bg-surface">
                    <div className="absolute inset-4 rounded-full border border-secondary/20 flex items-center justify-center animate-[spin_60s_linear_infinite]"></div>
                    <div className="absolute inset-12 rounded-full border border-tertiary/20 flex items-center justify-center animate-[spin_40s_linear_infinite_reverse]"></div>
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary shadow-glass-elevated flex items-center justify-center">
                      <span className="material-symbols-outlined icon-xl text-white">all_inclusive</span>
                    </div>
                  </div>
                </FadeInRight>
              </div>
            </div>
          </section>

          {/* 3. The six promises */}
          <section className="py-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
            <SectionHeader 
              overline="Six promises"
              title="Six things you can hold us to"
              description="Every Loop carries all six, whatever it costs. Each one is the opposite of a habit that makes agency projects slow, expensive or hard to leave. Turn a card to see the habit it replaces."
              alignment="center"
            />
          
            {/* Six promises, six cards that turn. The promise is what a reader
                scans for and it stays on the face at all times; the habit it
                replaces is on the back.

                Both faces render, see `ui/FlipCard.jsx`, so the paragraphs
                are still in the markup, still in the reading order, and still
                reachable by tap and by keyboard. The flip changes which one is
                facing you, not which one exists. */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mt-16">
              {PROMISES.map((promise, i) => (
                <StaggerItem key={promise.title} className="h-full">
                  <FlipCard
                    label={`${promise.title}, see the habit it replaces`}
                    className="h-full min-h-[380px] md:min-h-[330px] rounded-xl"
                    front={
                      /* Opaque rather than `glass-panel`. `backdrop-filter`
                         inside a `preserve-3d` subtree is unreliable. Safari
                         in particular flattens the parent to apply it, which
                         collapses the flip into a fade. A near-solid surface
                         costs nothing here: these cards sit on a plain
                         section ground with nothing behind them to refract. */
                      <div className="h-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest/90 shadow-glass p-8 md:p-10 flex flex-col justify-between gap-6">
                        <span
                          className={`material-symbols-outlined icon-lg ${TONES[i % TONES.length]}`}
                        >
                          {promise.icon}
                        </span>
                        <div>
                          <h3 className="font-display text-headline-md text-on-surface mb-3">
                            {promise.title}
                          </h3>
                          <p className="font-body text-body-sm text-on-surface-variant">
                            {promise.detail}
                          </p>
                        </div>
                        <span
                          aria-hidden="true"
                          className="font-label text-label-caps uppercase tracking-widest text-primary/70"
                        >
                          Turn for the usual way
                        </span>
                      </div>
                    }
                    back={
                      <div className="h-full rounded-xl border border-primary/20 bg-[linear-gradient(150deg,#0b2352,#081d4a_60%,#0a3f57)] p-8 md:p-10 flex flex-col justify-center">
                        <span className="font-label text-label-caps uppercase tracking-widest text-secondary-fixed-dim mb-4 block">
                          The usual agency
                        </span>
                        <p className="font-display text-headline-md text-white mb-4">
                          {promise.usual}.
                        </p>
                        <p className="font-body text-body-md text-white/85 leading-relaxed">
                          With LogixLoops: {promise.detail[0].toLowerCase() + promise.detail.slice(1)}
                        </p>
                      </div>
                    }
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          {/* 4. How a kit runs */}
          <section className="py-stack-xl border-y border-outline-variant/30 bg-surface-container-low">
            <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
              {/* A route, so it runs left to right across the full width, on
                  the same rail the pipeline on /security uses. Horizontal
                  because these are terse markers; the full step text is on
                  /process. See `ui/ScrollTimeline.jsx`. */}
              <FadeInLeft className="max-w-2xl mb-stack-lg">
                <h2 className="font-display text-display-lg text-on-surface mb-6">No surprises after you pay.</h2>
                <p className="font-body text-body-lg text-on-surface-variant">
                  Every Loop runs the same five steps on a published timeline. You see progress every week, and nothing outside the Loop&apos;s scope starts without a written price you have approved.
                </p>
              </FadeInLeft>

              {/* Revealed on the vertical axis, not the horizontal one. An
                  x-transform on the wrapper of a horizontal scroller means the
                  scroller is being measured mid-slide, and on a narrow screen
                  it pushes content past the viewport edge while it runs. */}
              <FadeInUp>
                <ScrollTimeline
                  orientation="horizontal"
                  label="How a Loop runs"
                  items={KIT_RAIL}
                />
              </FadeInUp>
            </div>
          </section>

          {/* 5. CTA */}
          <section className="py-[160px] px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 rounded-[40px] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
          
            <FadeInUp className="relative z-10">
              <span className="material-symbols-outlined icon-xl text-primary mb-6">rocket_launch</span>
              <h2 className="font-display text-display-xl text-on-surface mb-6 tracking-tight">
                Still reading? Let&apos;s talk.
              </h2>
              {/* `text-body-xl` was not a token, the class generated nothing and
                  this paragraph has been rendering at the browser default 16px
                  the whole time. `body-lg` is the largest size the scale has. */}
              <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
                Tell us what you need. We will point you at the right Loop, with its price, or say plainly if none of them fit. We are small on purpose, so we take on a handful of projects at a time and tell you when yours would have to wait.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="lg" icon="arrow_forward">Start a project</Button>
                <Button href="/loops" variant="outline" size="lg">Browse the Loops</Button>
              </div>
            </FadeInUp>
          </section>
        </PageSurface>
      </div>
    </main>
  );
}
