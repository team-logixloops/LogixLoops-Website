"use client";

import { SectionHeader, GlassCard, Button } from "@/components/ui";
import { FadeInUp, FadeInLeft, StaggerContainer, StaggerItem } from "@/components/motion";
import { ENGINEERING_WORKFLOW } from "@/data/infrastructure";

export default function ProcessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Process Hero */}
      <section className="pt-40 pb-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto text-center relative overflow-hidden">
        <div className="absolute inset-0 z-[-1] bg-ambient-glow-cyan pointer-events-none opacity-40"></div>
        <FadeInUp>
          <span className="font-label text-label-caps text-secondary tracking-widest uppercase mb-4 block">
            Methodology
          </span>
          <h1 className="font-display text-display-xl text-on-surface mb-stack-sm max-w-4xl mx-auto tracking-tight">
            Elite Engineering <span className="text-primary">Operations</span>
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg">
            Delivering enterprise-scale software requires more than just code. It demands a rigorous, highly structured operational methodology designed to eliminate risk and ensure absolute predictability.
          </p>
        </FadeInUp>
      </section>

      {/* 2. Engineering Workflow Timeline */}
      <section className="bg-surface-container-low py-stack-xl border-y border-outline-variant/20">
        <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
          <SectionHeader 
            overline="The Lifecycle"
            title="Execution Workflow"
            description="Our battle-tested 8-step engineering lifecycle. From initial strategic discovery to global scaling."
            alignment="center"
          />
          
          <div className="mt-stack-xl max-w-3xl mx-auto relative border-l border-outline/20 ml-4 md:ml-12 space-y-16 pb-8">
            {ENGINEERING_WORKFLOW.map((step, idx) => (
              <FadeInLeft key={idx} delay={idx * 0.1}>
                <div className="relative pl-12">
                  {/* Glowing Node */}
                  <div className="absolute w-6 h-6 rounded-full bg-surface-container-lowest border-2 border-primary -left-[13px] top-1 shadow-[0_0_15px_rgba(0,74,198,0.5)] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  </div>
                  
                  <span className="font-label text-label-caps text-primary uppercase tracking-widest mb-2 block">
                    Phase {step.phase}
                  </span>
                  <h3 className="font-display text-headline-md text-on-surface mb-3 flex items-center gap-3">
                    {step.title}
                    <span className="material-symbols-outlined text-outline-variant">{step.icon}</span>
                  </h3>
                  <p className="font-body text-body-md text-on-surface-variant">
                    {step.description}
                  </p>
                </div>
              </FadeInLeft>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Collaboration Standards */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl">
        <FadeInUp>
          <div className="text-center mb-stack-lg">
            <h2 className="font-display text-display-lg text-on-surface mb-4">Enterprise Transparency</h2>
            <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Total visibility into our sprint cycles. We integrate directly into your organizational cadence.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <StaggerItem>
            <GlassCard padding="lg" className="h-full border border-outline-variant/30 hover:border-primary/30 transition-colors">
              <span className="material-symbols-outlined text-secondary text-[32px] mb-4">sync</span>
              <h3 className="font-display text-headline-md text-on-surface text-xl mb-2">Agile Sprints</h3>
              <p className="font-body text-body-sm text-on-surface-variant">Strict 2-week iterations with demonstrable deliverables, ensuring constant momentum and course correction flexibility.</p>
            </GlassCard>
          </StaggerItem>
          
          <StaggerItem>
            <GlassCard padding="lg" className="h-full border border-outline-variant/30 hover:border-primary/30 transition-colors">
              <span className="material-symbols-outlined text-secondary text-[32px] mb-4">dashboard</span>
              <h3 className="font-display text-headline-md text-on-surface text-xl mb-2">Live Dashboards</h3>
              <p className="font-body text-body-sm text-on-surface-variant">Real-time access to JIRA/Linear boards. Watch tickets move through the pipeline with zero obfuscation.</p>
            </GlassCard>
          </StaggerItem>

          <StaggerItem>
            <GlassCard padding="lg" className="h-full border border-outline-variant/30 hover:border-primary/30 transition-colors">
              <span className="material-symbols-outlined text-secondary text-[32px] mb-4">description</span>
              <h3 className="font-display text-headline-md text-on-surface text-xl mb-2">Immutable Docs</h3>
              <p className="font-body text-body-sm text-on-surface-variant">Every architectural decision is cataloged via ADRs (Architecture Decision Records) for future compliance and handoffs.</p>
            </GlassCard>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* 4. Delivery Standards Metrics */}
      <section className="bg-surface py-stack-xl border-t border-outline-variant/20 relative">
        <div className="absolute inset-0 bg-ambient-glow-violet opacity-30 pointer-events-none"></div>
        <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter border border-white/40 shadow-glass-elevated bg-surface-container-lowest/60 backdrop-blur-2xl rounded-2xl p-8">
            <div className="text-center">
              <div className="font-display text-display-lg text-primary mb-2">100%</div>
              <div className="font-label text-label-caps text-on-surface-variant uppercase">SLA Compliance</div>
            </div>
            <div className="text-center">
              <div className="font-display text-display-lg text-primary mb-2">2 Wks</div>
              <div className="font-label text-label-caps text-on-surface-variant uppercase">Sprint Cycles</div>
            </div>
            <div className="text-center">
              <div className="font-display text-display-lg text-primary mb-2">Zero</div>
              <div className="font-label text-label-caps text-on-surface-variant uppercase">Downtime Deploys</div>
            </div>
            <div className="text-center">
              <div className="font-display text-display-lg text-primary mb-2">24/7</div>
              <div className="font-label text-label-caps text-on-surface-variant uppercase">Incident Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl text-center">
        <div className="py-20 px-8 border border-outline-variant/30 rounded-2xl bg-surface-container-lowest/60 backdrop-blur-2xl shadow-glass-elevated relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
          <h2 className="font-display text-display-lg text-on-surface mb-6 relative z-10">Execute with precision.</h2>
          <p className="font-body text-body-lg text-on-surface-variant max-w-xl mx-auto mb-8 relative z-10">Adopt the engineering processes used by industry leaders.</p>
          <Button href="/contact" size="lg" className="relative z-10 shadow-lg">
            Consult Our Operations Team
          </Button>
        </div>
      </section>
    </div>
  );
}
