"use client";

import { SectionHeader, GlassCard, Button } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
import PageHero from "@/components/sections/shared/PageHero";
import PageSurface from "@/components/sections/shared/PageSurface";
import ProcessTimeline from "@/components/sections/process/ProcessTimeline";
import MethodologyExplorer from "@/components/sections/process/MethodologyExplorer";
import SelectionSignals from "@/components/sections/process/SelectionSignals";
import MethodologyBlend from "@/components/sections/process/MethodologyBlend";

export default function ProcessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Process Hero, ruled contours, high band count, low warp. This
          page is a sequence, so its field reads as a measured drawing rather
          than as weather. */}
      <PageHero
        preset="process"
        eyebrow="Methodology"
        title="Eight phases."
        accent="Eight exit conditions."
        lead="Most software development processes are a list of nouns on a slide. Ours names the lifecycle model governing each phase, what that phase hands to the next one, and the condition that has to be true before it is allowed to. That last part is the whole method."
        cue="The lifecycle"
      />

      <PageSurface>
        {/* 2. Engineering workflow, scrollytelling timeline. The rail follows
            the scrollbar, each phase lights as it takes the viewport, and the
            sticky index reports which one is being read. */}
        <section className="bg-surface-container-low py-stack-xl border-y border-outline-variant/20">
          <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
            <SectionHeader
              overline="The Lifecycle"
              title="Discovery to scale, in eight phases"
              description="From reading your existing system to profiling the one that replaced it. Each phase names the model that governs it, the artefacts it produces, and the gate at the end of it."
              align="center"
            />

            <ProcessTimeline />
          </div>
        </section>

        {/* 3. The models themselves. A process page that only describes its own
            method is asking to be taken on faith; this one shows the field it
            was chosen from, including the models we mostly do not use. */}
        <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl">
          <FadeInUp>
            <SectionHeader
              overline="Lifecycle Models"
              title="Six ways to build software"
              description="Waterfall, the V-Model, Spiral, Scrum, Kanban and continuous delivery are not competing brands, they are different answers to the question of when you are allowed to be wrong. Pick a model and the diagram redraws to its actual shape."
              align="center"
            />
          </FadeInUp>

          <MethodologyExplorer />
        </section>

        {/* 4. The decision rule behind the explorer above. */}
        <section className="bg-surface-container-low py-stack-xl border-y border-outline-variant/20">
          <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
            <FadeInUp>
              <SectionHeader
                overline="Selection Logic"
                title="Why we choose what we choose"
                description="Six signals we read in the first fortnight of an engagement, and what each one changes about how the work is run."
                align="center"
              />
            </FadeInUp>

            <SelectionSignals />
          </div>
        </section>

        {/* 5. The composite we actually ship, and the refusals that define it. */}
        <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl">
          <FadeInUp>
            <SectionHeader
              overline="Our Method"
              title="One engagement, four governing models"
              description="No single lifecycle is strongest everywhere. We run each stage under the model that is best at it, and keep the seams between them explicit."
              align="center"
            />
          </FadeInUp>

          <MethodologyBlend />
        </section>

        {/* 6. Collaboration Standards */}
        <section className="bg-surface-container-low py-stack-xl border-y border-outline-variant/20">
          <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
            <FadeInUp>
              <div className="text-center mb-stack-lg">
                <h2 className="font-display text-display-lg text-on-surface mb-4">You watch it happen</h2>
                <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                  We work inside your board, your channels and your standups. There is no weekly summary email standing between you and the actual state of the work.
                </p>
              </div>
            </FadeInUp>

            {/* 1 → 2 → 3. Going straight from one column to three at 768px gave
                each card ~213px of width, narrower than the text inside it needs
 for the whole tablet range. Three-across now waits for 1024. */}
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              <StaggerItem>
                <GlassCard padding="lg" className="glow-sweep h-full border border-outline-variant/30">
                  <span className="material-symbols-outlined text-secondary icon-md mb-4">sync</span>
                  <h3 className="font-display text-headline-md text-on-surface text-xl mb-2">Two-week sprints</h3>
                  <p className="font-body text-body-sm text-on-surface-variant">Every one ends in a demo of running software. If we are building the wrong thing, you find out fourteen days after we start doing it.</p>
                </GlassCard>
              </StaggerItem>

              <StaggerItem>
                <GlassCard padding="lg" className="glow-sweep h-full border border-outline-variant/30">
                  <span className="material-symbols-outlined text-secondary icon-md mb-4">dashboard</span>
                  <h3 className="font-display text-headline-md text-on-surface text-xl mb-2">Your board, not ours</h3>
                  <p className="font-body text-body-sm text-on-surface-variant">We work in your Jira or Linear instance. Nothing gets copied into a private tracker and summarised for you afterwards.</p>
                </GlassCard>
              </StaggerItem>

              <StaggerItem>
                <GlassCard padding="lg" className="glow-sweep h-full border border-outline-variant/30">
                  <span className="material-symbols-outlined text-secondary icon-md mb-4">description</span>
                  <h3 className="font-display text-headline-md text-on-surface text-xl mb-2">Decisions on the record</h3>
                  <p className="font-body text-body-sm text-on-surface-variant">Each consequential choice becomes an ADR: what we picked, what we rejected, and why. The reasoning outlives the people who had it.</p>
                </GlassCard>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* 7. Delivery Standards Metrics */}
        <section className="bg-surface py-stack-xl relative">
          <div className="absolute inset-0 ambient-glow-royal opacity-30 pointer-events-none"></div>
          <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto relative z-10">
            {/* Four cadences, not four statistics.
                This band used to read "100% SLA Compliance, 2 Wks, Zero
                Downtime Deploys, 24/7 Incident Response". Three of those four
                were unverifiable, and the fourth, round-the-clock incident
                response, is something a studio should only advertise
                where a signed support agreement actually says it.
                What is here now is how the work runs, which is true on day one
                of every engagement and is what the page is about anyway. */}
            <div className="level-gauge grid grid-cols-2 md:grid-cols-4 gap-gutter border border-white/40 shadow-glass-elevated bg-surface-container-lowest/85 rounded-2xl p-8">
              <div className="text-center">
                <div className="font-display text-display-lg text-primary mb-2">8</div>
                <div className="font-label text-label-caps text-on-surface-variant uppercase">Phases, each with a gate</div>
              </div>
              <div className="text-center">
                <div className="font-display text-display-lg text-primary mb-2">2 wks</div>
                <div className="font-label text-label-caps text-on-surface-variant uppercase">Between demos</div>
              </div>
              <div className="text-center">
                <div className="font-display text-display-lg text-primary mb-2">1</div>
                <div className="font-label text-label-caps text-on-surface-variant uppercase">Pipeline run to roll back</div>
              </div>
              <div className="text-center">
                <div className="font-display text-display-lg text-primary mb-2">0</div>
                <div className="font-label text-label-caps text-on-surface-variant uppercase">Merges without review</div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Final CTA */}
        <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl text-center">
          <div className="dispatch py-20 px-8 border border-outline-variant/30 rounded-2xl bg-surface-container-lowest/85 shadow-glass-elevated relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
            <h2 className="font-display text-display-lg text-on-surface mb-6 relative z-10">Run your next build this way.</h2>
            <p className="font-body text-body-lg text-on-surface-variant max-w-xl mx-auto mb-8 relative z-10">Bring us the system and the deadline. We will tell you which of these models fits it, and where the risk actually is.</p>
            <Button href="/contact" size="lg" className="relative z-10 shadow-lg">
              Book a discovery call
            </Button>
          </div>
        </section>
      </PageSurface>
    </div>
  );
}
