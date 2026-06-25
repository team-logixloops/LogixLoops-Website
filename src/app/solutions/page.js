"use client";

import { SectionHeader, GlassCard, Button, Badge } from "@/components/ui";
import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from "@/components/motion";
import { motion } from "framer-motion";
import { CASE_STUDIES } from "@/data/caseStudies";
import { SOLUTIONS_ECOSYSTEMS, INDUSTRY_SOLUTIONS } from "@/data/solutions";

export default function SolutionsPage() {
  const caseStudiesList = Object.values(CASE_STUDIES);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Solutions Hero */}
      <section className="pt-40 pb-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto text-center relative">
        <div className="absolute inset-0 z-[-1] bg-ambient-glow-blue pointer-events-none opacity-50"></div>
        <FadeInUp>
          <h1 className="font-display text-display-xl text-on-surface mb-stack-sm max-w-4xl mx-auto tracking-tight">
            Our Engineering <span className="text-primary">Impact</span>
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg">
            Translating complex technical challenges into scalable, high-performance enterprise solutions. Explore how we re-engineer digital ecosystems for industry leaders.
          </p>
        </FadeInUp>
        
        {/* Metric Grid */}
        <FadeInUp delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter border border-outline-variant/30 rounded-xl p-8 bg-surface-container-lowest/50 backdrop-blur-xl shadow-glass-elevated relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
            <div>
              <div className="font-display text-display-lg text-primary mb-2">100%</div>
              <div className="font-label text-label-caps text-on-surface-variant uppercase">Client Delivery Success</div>
            </div>
            <div>
              <div className="font-display text-display-lg text-primary mb-2">0</div>
              <div className="font-label text-label-caps text-on-surface-variant uppercase">Tech Debt Tolerated</div>
            </div>
            <div>
              <div className="font-display text-display-lg text-primary mb-2">60fps</div>
              <div className="font-label text-label-caps text-on-surface-variant uppercase">Guaranteed UI Performance</div>
            </div>
            <div>
              <div className="font-display text-display-lg text-primary mb-2">99.9%</div>
              <div className="font-label text-label-caps text-on-surface-variant uppercase">SLA Uptime Standards</div>
            </div>
          </div>
        </FadeInUp>
      </section>

      {/* 2. Featured Ecosystems */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl border-t border-outline-variant/20">
        <SectionHeader 
          overline="Core Capabilities"
          title="Featured Ecosystems"
          description="We do not build simple applications. We architect comprehensive, resilient ecosystems designed to serve as the operational backbone for enterprise scale."
          alignment="center"
        />
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-stack-lg">
          {SOLUTIONS_ECOSYSTEMS.map((eco) => (
            <StaggerItem key={eco.id}>
              <GlassCard variant="elevated" padding="lg" className="h-full border-white/40 shadow-glass-elevated group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-[24px]">{eco.icon}</span>
                </div>
                <h3 className="font-display text-headline-md text-on-surface mb-4">{eco.title}</h3>
                <p className="font-body text-body-md text-on-surface-variant">{eco.description}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 3. Industry Solutions */}
      <section className="bg-surface-container-low py-stack-xl">
        <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
          <SectionHeader 
            overline="Vertical Expertise"
            title="Industry Solutions"
            description="Deep domain intelligence applied to highly specific operational challenges."
          />
          
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-stack-lg">
            {INDUSTRY_SOLUTIONS.map((ind) => (
              <StaggerItem key={ind.id}>
                <div className="border border-outline-variant/30 rounded-xl p-6 bg-surface-container-lowest h-full hover:border-primary/30 transition-colors">
                  <h4 className="font-display text-headline-md text-on-surface mb-4 text-xl">{ind.label}</h4>
                  <div className="mb-4">
                    <span className="font-label text-label-caps text-error uppercase mb-1 block">Challenge</span>
                    <p className="font-body text-body-sm text-on-surface-variant">{ind.challenges}</p>
                  </div>
                  <div>
                    <span className="font-label text-label-caps text-primary uppercase mb-1 block">Outcome</span>
                    <p className="font-body text-body-sm text-on-surface-variant">{ind.outcomes}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 4. Transformation Before/After */}
      <section className="bg-surface py-stack-xl border-y border-outline-variant/30 relative">
        <div className="absolute inset-0 z-0 bg-ambient-glow-violet opacity-30 pointer-events-none"></div>
        <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto relative z-10">
          <div className="text-center mb-stack-lg">
            <h2 className="font-display text-display-lg text-on-surface mb-4">Transformation Engineered</h2>
            <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto">Witness the shift from fragmented legacy systems to cohesive, high-performance digital environments.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-outline-variant/30 rounded-xl overflow-hidden shadow-glass-elevated bg-surface-container-lowest">
            {/* Legacy State */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-outline-variant/30 relative">
              <div className="absolute top-4 left-4 bg-error-container text-on-error-container font-label text-[10px] px-2 py-1 rounded tracking-widest uppercase">Legacy State</div>
              <div className="h-64 mt-6 border border-outline-variant/20 bg-surface-variant rounded flex items-center justify-center grayscale opacity-60">
                <span className="font-body text-on-surface-variant">Fragmented UI Representation</span>
              </div>
              <div className="mt-6">
                <ul className="space-y-3 font-body text-sm text-on-surface-variant">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-error text-sm">close</span> High operational friction</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-error text-sm">close</span> Disconnected data silos</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-error text-sm">close</span> 4.2s average load time</li>
                </ul>
              </div>
            </div>
            
            {/* Modern State */}
            <div className="p-8 relative bg-surface-container-lowest/50 backdrop-blur-md">
              <div className="absolute top-4 left-4 bg-primary/10 text-primary font-label text-[10px] px-2 py-1 rounded tracking-widest uppercase">Modernized State</div>
              <div className="h-64 mt-6 border border-primary/20 bg-white rounded shadow-sm flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-primary/5"></div>
                <span className="font-display text-headline-md text-primary relative z-10">Unified Architecture</span>
              </div>
              <div className="mt-6">
                <ul className="space-y-3 font-body text-sm text-on-surface">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check</span> Streamlined user workflows</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check</span> Centralized AI data lake</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check</span> 0.4s average load time</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl text-center">
        <div className="py-20 px-8 border border-outline-variant/30 rounded-2xl bg-surface-container-lowest/60 backdrop-blur-2xl shadow-glass-elevated relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
          <h2 className="font-display text-display-lg text-on-surface mb-6 relative z-10">Ready to engineer your future?</h2>
          <p className="font-body text-body-lg text-on-surface-variant max-w-xl mx-auto mb-8 relative z-10">Partner with LogixLoops to build robust, scalable solutions that command industry leadership.</p>
          <Button href="/contact" size="lg" className="relative z-10 shadow-lg" icon="arrow_forward" iconPosition="right">
            Start Your Success Story
          </Button>
        </div>
      </section>
    </div>
  );
}
