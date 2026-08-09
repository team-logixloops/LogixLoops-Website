"use client";

import { GlassCard, Badge, Button } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
import PageHero from "@/components/sections/shared/PageHero";
import PageSurface from "@/components/sections/shared/PageSurface";
import TechStackPath from "@/components/sections/technology/TechStackPath";
import { TECH_ECOSYSTEMS } from "@/data/infrastructure";

export default function TechnologyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Technology Hero, the busiest field on the site, and the only one
          that reaches for the teal outside the logo's own family. This is the
          page about the parts that come from elsewhere. */}
      <PageHero
        preset="technology"
        eyebrow="Infrastructure"
        title="A short stack,"
        accent="chosen once."
        lead="We standardised on a small set of tools and stopped relitigating it every project. React, Next.js and TypeScript on the front. Node.js or Go behind them. Postgres, Kubernetes, Terraform. All open source, all boring, all still here in five years."
        cue="The stack"
        // The stack in motion, in the hero itself: it fills the dead space
        // under the lead, and it states the page's subject before the copy
        // has finished making the claim. The grid below then says it plainly.
        band={<TechStackPath />}
      />

      <PageSurface>

        {/* 2. Tech Stack Ecosystems Grid */}
        <section
          aria-labelledby="tech-stack"
          className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto pb-stack-xl"
        >
          {/* The h2 exists because the cards below are h3s and the page would
              otherwise jump h1 → h3. It is a section label, not an answer block:
              the ecosystems themselves are the answer, and a paragraph
              summarising them ahead of time only delays reaching them. */}
          <div className="max-w-2xl mb-stack-lg">
            <h2
              id="tech-stack"
              className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4"
            >
              The stack we build on
            </h2>
            {/* One paragraph of substance under the h2, because this is the
                passage that answers "what technology stack does LogixLoops
                use", the query the page exists to win, and a bare label
                answers nothing. */}
            <p className="font-body text-body-lg text-on-surface-variant">
              Every tool here is open source or an industry-standard managed
              service. There is no LogixLoops runtime, no proprietary framework,
              and nothing you would have to keep paying us for. If you replace
              us tomorrow, the next team recognises everything in the repository.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {TECH_ECOSYSTEMS.map((stack, idx) => (
              <StaggerItem key={idx}>
                <GlassCard 
                  padding="lg" 
                  className="stack-compile h-full border border-outline-variant/30 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden"
                >
                  {/* Refractive Ambient Glow */}
                  <div className={`absolute -right-20 -bottom-20 w-64 h-64 bg-${stack.color}/10 blur-3xl rounded-full transition-transform duration-700 group-hover:scale-150`}></div>
                
                  <h3 className="font-display text-headline-md text-on-surface mb-6 relative z-10">{stack.category}</h3>
                
                  <div data-stack className="flex flex-wrap gap-3 relative z-10">
                    {stack.technologies.map(tech => (
                      <Badge key={tech} variant="subtle" className="text-sm px-3 py-1.5 shadow-sm border-white/40 bg-surface-container-lowest/80 backdrop-blur-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* 4. What we deliberately do not reach for.
            This slot held a 400px abstract flowchart: two device icons, a box
            labelled API GATEWAY, three boxes labelled AUTH / DATA / AI, and
            some dashed curves. It described no system in particular, proved
            nothing, and could have been dropped onto any agency site on earth
            without editing a word. Deleted.
            A list of refusals replaced it. It is the section a technical buyer
            actually reads on a stack page, because anyone will tell you what
            they use and almost nobody will tell you what they avoid. It is
            also the passage most likely to be quoted back when somebody asks
            an assistant how LogixLoops makes technology decisions. */}
        <section
          aria-labelledby="tech-refusals"
          className="bg-surface-container-low py-stack-xl border-y border-outline-variant/20"
        >
          <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
            <div className="max-w-2xl mb-stack-lg">
              <span className="font-label text-label-caps tracking-widest uppercase text-brand-steel mb-4 block">
                Selection rules
              </span>
              <h2
                id="tech-refusals"
                className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4"
              >
                And what we don&apos;t reach for
              </h2>
              <p className="font-body text-body-lg text-on-surface-variant">
                Anyone will list the tools they like. The more useful list is
                the one they avoid, and why, because that is the list that
                tells you what your codebase will look like in three years.
              </p>
            </div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {[
                {
                  title: "Microservices on day one",
                  body: "A distributed system is a debugging tax you pay forever. We start with a well-bounded modular monolith and split the parts that genuinely need to scale or deploy independently. Most products never need the second step.",
                },
                {
                  title: "Frameworks younger than the project",
                  body: "If a library will not plausibly be maintained for as long as you intend to run the product, it is a migration you have scheduled without noticing. Boring, widely-adopted tools cost less over five years than exciting ones cost in year two.",
                },
                {
                  title: "Proprietary runtimes and lock-in",
                  body: "Nothing we build depends on a LogixLoops package, a private registry, or a platform you cannot leave. The whole stack is open source or a standard managed service, so replacing us is a staffing decision rather than a rewrite.",
                },
                {
                  title: "A model where a query would do",
                  body: "A great deal of what gets sold as AI is a SQL query, a rules engine, or a well-indexed search. We reach for a model when the problem is genuinely probabilistic, and when it is, we say what it costs per call before you commit.",
                },
              ].map((item) => (
                <StaggerItem key={item.title}>
                  <GlassCard padding="lg" className="glow-sweep h-full border border-outline-variant/30">
                    <h3 className="font-display text-headline-md text-on-surface mb-3">
                      {item.title}
                    </h3>
                    <p className="font-body text-body-md text-on-surface-variant">
                      {item.body}
                    </p>
                  </GlassCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* 5. Engineering Standards */}
        <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl">
          <FadeInUp>
            <div className="text-center mb-stack-lg">
              <h2 className="font-display text-display-lg text-on-surface mb-4">How the code is kept honest</h2>
              <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                Three things that run automatically, on every change, whether or not anyone is watching.
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            <StaggerItem>
               <div className="rule-draw border-t-2 border-primary pt-6">
                  <h3 className="font-display text-headline-md text-on-surface mb-3">Maintainability</h3>
                  <p className="font-body text-body-md text-on-surface-variant">Typed end to end in TypeScript or Go, linted on commit, and held to a coverage threshold the pipeline enforces. A change that drops below it does not merge, so nobody has to remember to care.</p>
               </div>
            </StaggerItem>
            <StaggerItem>
               <div className="rule-draw border-t-2 border-secondary pt-6">
                  <h3 className="font-display text-headline-md text-on-surface mb-3">Reproducibility</h3>
                  <p className="font-body text-body-md text-on-surface-variant">Containerised with Docker, described in Terraform, orchestrated by Kubernetes where the load justifies it. The environment is a file in the repository, not knowledge in somebody&apos;s head.</p>
               </div>
            </StaggerItem>
            <StaggerItem>
               <div className="rule-draw border-t-2 border-tertiary pt-6">
                  <h3 className="font-display text-headline-md text-on-surface mb-3">Observability</h3>
                  <p className="font-body text-body-md text-on-surface-variant">Tracing, metrics and structured logs ship with the first release rather than after the first outage. Alerts fire on user-visible harm, not on a CPU graph nobody agreed on.</p>
               </div>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* 6. Final CTA */}
        <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto pb-stack-xl text-center">
          <div className="dispatch py-20 px-8 border border-outline-variant/30 rounded-2xl bg-surface-container-lowest/60 backdrop-blur-2xl shadow-glass-elevated relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
            <h2 className="font-display text-display-lg text-on-surface mb-6 relative z-10">Inherited a stack you did not choose?</h2>
            <p className="font-body text-body-lg text-on-surface-variant max-w-xl mx-auto mb-8 relative z-10">Send us the repository and the pain. You get a written read on what is worth keeping, what is quietly costing you, and what order to fix it in.</p>
            <Button href="/contact" size="lg" className="relative z-10 shadow-lg" icon="arrow_forward" iconPosition="right">
              Get a stack review
            </Button>
          </div>
        </section>
      </PageSurface>
    </div>
  );
}
