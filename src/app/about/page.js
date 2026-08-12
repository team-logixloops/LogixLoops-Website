import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from "@/components/motion";
import { FlipCard, Button, SectionHeader, ScrollTimeline } from "@/components/ui";
import PageHero from "@/components/sections/shared/PageHero";
import PageSurface from "@/components/sections/shared/PageSurface";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

/* The four standards, lifted out of the markup so the front and back of each
   card are written next to each other rather than 40 lines apart. `summary` is
   new, a one-line version that holds the card face, so the section still
   scans without anyone touching it. `detail` is the paragraph that was
   previously the whole card. */
const STANDARDS = [
  {
    icon: "security",
    tone: "text-primary",
    title: "Zero-Trust Architecture",
    summary: "Built on the assumption that something has already been breached.",
    detail:
      "No request is trusted because of where it came from. Calls between services are authenticated and encrypted even when they never leave your network, credentials are short-lived, and a compromised container reaches only what it was explicitly granted. Security is the first architectural decision, not the last review before launch.",
  },
  {
    icon: "speed",
    tone: "text-secondary",
    title: "Performance as a Feature",
    summary: "Milliseconds are a product decision, not an optimisation pass.",
    detail:
      "Performance budgets are set before the first component is written, and a change that breaks one does not merge. Edge caching, progressive rendering and query-level tuning are part of the build, not a rescue mission in month six. We measure on a mid-range Android on a slow network, because that is what most of your users are holding.",
  },
  {
    icon: "design_services",
    tone: "text-tertiary",
    title: "Interfaces That Survive Real Data",
    summary: "Consumer-grade standards, applied to dense B2B systems.",
    detail:
      "Enterprise software does not have to be ugly, but pretty is not the test. The test is a table with forty thousand rows and a column that someone else's export tool filled with nulls. We prototype against realistic data volumes and put the critical path in front of somebody who will run it daily before we commit to it.",
  },
  {
    icon: "all_inclusive",
    tone: "text-primary",
    title: "Architecture You Can Grow Into",
    summary: "Designed for the next order of magnitude, not the last one.",
    detail:
      "Over-engineering for scale you do not have is as expensive as ignoring it. We design for the load you can credibly forecast, make the seams explicit so the parts under pressure can be replaced independently, and write down where the ceiling is, so the day you approach it, it is a planned piece of work rather than an outage.",
  },
];

/* The four phases of a LogixLoops delivery. `marker` reads as a stage label
   rather than a bare number so the rail still makes sense read aloud, where
   "01" on its own says nothing. */
const DELIVERY_PHASES = [
  {
    id: "discovery",
    marker: "Phase 01",
    title: "Discovery & Topology",
    icon: "radar",
    body: "Mapping the architectural boundaries and business imperatives.",
  },
  {
    id: "prototype",
    marker: "Phase 02",
    title: "Prototype & Validation",
    icon: "draw",
    body: "Validating user flows and API contracts before heavy engineering.",
  },
  {
    id: "engineering",
    marker: "Phase 03",
    title: "Iterative Engineering",
    icon: "code_blocks",
    body: "Test-driven development loops with continuous stakeholder visibility.",
  },
  {
    id: "hardening",
    marker: "Phase 04",
    title: "Hardening & Scale",
    icon: "shield_lock",
    body: "Pen-testing, load balancing, and production readiness certification.",
  },
];

const ABOUT_DESCRIPTION =
  "LogixLoops is a senior software studio in Jaipur working with clients in India, the US, the UK and the UAE. How we are structured, and what every build is held to.";

export const metadata = buildMetadata({
  // Not "About LogixLoops": the root template already prefixes the brand, so
  // that rendered as "LogixLoops | About LogixLoops". Not a bare "About"
  // either, which rendered as an 18-character title and gave the SERP nothing
  // past the brand to match on.
  title: "About the Studio",
  description: ABOUT_DESCRIPTION,
  path: "/about",
  keywords: [
    "LogixLoops",
    "software development studio Jaipur",
    "senior software engineers India",
    "boutique software agency",
    "offshore development team India",
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
        {/* "An elite collective of systems architects" was the old lead. It
            described a company three times our size and said nothing a
            competitor could not say. Small, senior and in Jaipur is the actual
            position, and it is the one that wins, because it is also the
            answer to "who will really be writing my code". */}
        <PageHero
          preset="about"
          eyebrow="Who we are"
          title="Senior team."
          accent="Deliberately."
          lead="LogixLoops is a senior software engineering studio in Jaipur, working with clients in India, the US, the UK and the UAE. No junior bench, no account manager relaying messages. The people you meet on the first call are the people who write the code."
          cue="The axiom"
        />

        <PageSurface>
          {/* 2 & 3. Philosophy & Vision / Why LogixLoops Exists */}
          <section className="py-stack-xl border-t border-outline-variant/30 bg-surface-container-lowest relative">
            <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
                <FadeInLeft>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4 block">The Axiom</span>
                  <h2 className="font-display text-display-lg text-on-surface mb-6 leading-tight">
                    Software rarely fails because someone wrote a bad function.
                  </h2>
                  <p className="font-body text-body-lg text-on-surface-variant mb-6">
                    It fails because a boundary was drawn in the wrong place in
                    month one and nobody could afford to move it by month nine.
                    By then the fix is not a refactor, it is a rewrite, and the
                    rewrite is why you are reading an agency&apos;s about page.
                  </p>
                  <p className="font-body text-body-lg text-on-surface-variant">
                    That is the work we set up to do. Get the architecture right
                    early, write down why, and ship in increments small enough
                    that being wrong is survivable. &ldquo;Ship it fast and fix
                    it later&rdquo; is not a philosophy, it is a loan, and the
                    interest is paid by whoever inherits the codebase.
                  </p>
                </FadeInLeft>
                <FadeInRight className="relative flex justify-center">
                  <div className="w-full aspect-square max-w-[500px] rounded-full border border-primary/20 flex items-center justify-center relative bg-surface">
                    <div className="absolute inset-4 rounded-full border border-secondary/20 flex items-center justify-center animate-[spin_60s_linear_infinite]"></div>
                    <div className="absolute inset-12 rounded-full border border-tertiary/20 flex items-center justify-center animate-[spin_40s_linear_infinite_reverse]"></div>
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary shadow-glass-elevated flex items-center justify-center">
                      <span className="material-symbols-outlined icon-xl text-white">architecture</span>
                    </div>
                  </div>
                </FadeInRight>
              </div>
            </div>
          </section>

          {/* 4 & 5. Engineering Mindset & Product Philosophy */}
          <section className="py-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
            <SectionHeader 
              overline="Standards"
              title="Four things we will not trade away"
              description="Architected before it is coded. Tested as it is written. Documented as it ships. Handed over as open-source code you own outright. Everything else on a project is negotiable; these four are what you are actually buying."
              alignment="center"
            />
          
            {/* Four standards, four cards that turn. The name of a standard is
                what a reader scans for and it stays on the face at all times;
                the paragraph arguing it is on the back, which is where the
                detail belongs on a page that is already four screens of prose.

                Both faces render, see `ui/FlipCard.jsx`, so the paragraphs
                are still in the markup, still in the reading order, and still
                reachable by tap and by keyboard. The flip changes which one is
                facing you, not which one exists. */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-16">
              {STANDARDS.map((standard) => (
                <StaggerItem key={standard.title} className="h-full">
                  <FlipCard
                    label={`${standard.title}, read the detail`}
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
                          className={`material-symbols-outlined icon-lg ${standard.tone}`}
                        >
                          {standard.icon}
                        </span>
                        <div>
                          <h3 className="font-display text-headline-md text-on-surface mb-3">
                            {standard.title}
                          </h3>
                          <p className="font-body text-body-sm text-on-surface-variant">
                            {standard.summary}
                          </p>
                        </div>
                        <span
                          aria-hidden="true"
                          className="font-label text-label-caps uppercase tracking-widest text-primary/70"
                        >
                          Turn for the detail
                        </span>
                      </div>
                    }
                    back={
                      <div className="h-full rounded-xl border border-primary/20 bg-[linear-gradient(150deg,#0b2352,#081d4a_60%,#0a3f57)] p-8 md:p-10 flex flex-col justify-center">
                        <span className="font-label text-label-caps uppercase tracking-widest text-secondary-fixed-dim mb-4 block">
                          {standard.title}
                        </span>
                        <p className="font-body text-body-md text-white/85 leading-relaxed">
                          {standard.detail}
                        </p>
                      </div>
                    }
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          {/* 6. Operational Standards */}
          <section className="py-stack-xl border-y border-outline-variant/30 bg-surface-container-low">
            <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
              {/* The four phases were a dotted list squeezed into the right
                  half of a two-column block, four short steps sharing a
                  column with nothing to do with them. They are a delivery
                  route, so they run left to right across the full width now,
                  on the same rail the pipeline on /security uses.

                  Horizontal rather than vertical because these four are terse
                  markers of a route rather than an argument to read; the
                  vertical variant is kept for sequences whose steps carry
                  prose. See `ui/ScrollTimeline.jsx`. */}
              <FadeInLeft className="max-w-2xl mb-stack-lg">
                <h2 className="font-display text-display-lg text-on-surface mb-6">No surprises in month four.</h2>
                <p className="font-body text-body-lg text-on-surface-variant">
                  Four phases, and each one ends on a condition rather than on a date in a plan. You see running software every two weeks from the first sprint, so if we are heading somewhere wrong you find out in a fortnight, not in a status report six months in.
                </p>
              </FadeInLeft>

              {/* Revealed on the vertical axis, not the horizontal one. An
                  x-transform on the wrapper of a horizontal scroller means the
                  scroller is being measured mid-slide, and on a narrow screen
                  it pushes content past the viewport edge while it runs. */}
              <FadeInUp>
                <ScrollTimeline
                  orientation="horizontal"
                  label="Delivery phases"
                  items={DELIVERY_PHASES}
                />
              </FadeInUp>
            </div>
          </section>

          {/* 9 & 10. Long-Term Vision & CTA */}
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
                We are small, which means we take on a handful of engagements at a time and are honest when yours is not one we are the right studio for. Either way you get a straight answer, and a written brief you keep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="lg" icon="arrow_forward">Book a discovery call</Button>
                <Button href="/process" variant="outline" size="lg">See how we work</Button>
              </div>
            </FadeInUp>
          </section>
        </PageSurface>
      </div>
    </main>
  );
}
