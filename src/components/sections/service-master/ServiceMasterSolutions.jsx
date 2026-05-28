"use client";

import { SectionHeader, GlassCard } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

export default function ServiceMasterSolutions({ solutions }) {
  if (!solutions || solutions.length === 0) return null;

  return (
    <section className="py-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
      <FadeInUp>
        <SectionHeader 
          overline="Deliverables"
          title="Featured Solutions"
          description="We engineer bespoke platforms tailored to your operational requirements."
          centered
        />
      </FadeInUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-stack-xl">
        {solutions.map((sol, i) => (
          <StaggerItem key={i}>
            <GlassCard padding="lg" className="h-full group hover:border-primary/30 transition-colors">
              <div className="w-full h-48 bg-surface-container-high rounded-lg mb-6 overflow-hidden relative">
                {/* Simulated Dashboard UI */}
                <div className="absolute inset-2 bg-surface rounded shadow-sm border border-outline-variant/20 flex flex-col p-3 group-hover:scale-105 transition-transform duration-500">
                  <div className="flex justify-between items-center mb-4 border-b border-outline-variant/20 pb-2">
                    <div className="w-1/3 h-2 bg-outline-variant/30 rounded" />
                    <div className="w-6 h-6 rounded-full bg-primary/20" />
                  </div>
                  <div className="flex gap-2 mb-2 h-1/2">
                    <div className="w-2/3 bg-secondary/10 rounded border border-secondary/20" />
                    <div className="w-1/3 flex flex-col gap-2">
                      <div className="h-1/2 bg-primary/10 rounded border border-primary/20" />
                      <div className="h-1/2 bg-tertiary/10 rounded border border-tertiary/20" />
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="font-display text-headline-md text-lg mb-2 text-on-surface">{sol.title}</h3>
              <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                {sol.desc}
              </p>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
