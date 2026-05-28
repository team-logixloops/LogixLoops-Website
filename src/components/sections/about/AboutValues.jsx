"use client";

import { SectionHeader, GlassCard } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

const VALUES = [
  {
    title: "Uncompromising Quality",
    desc: "We do not ship 'good enough'. We ship exceptional. Every line of code, every pixel, and every pipeline is audited for excellence.",
    number: "01"
  },
  {
    title: "Strategic Foresight",
    desc: "We anticipate the needs of tomorrow. Our systems are engineered to scale elastically, avoiding the trap of technical debt.",
    number: "02"
  },
  {
    title: "Radical Transparency",
    desc: "Trust is the currency of enterprise partnerships. We communicate proactively, providing clear visibility into architecture and progress.",
    number: "03"
  },
  {
    title: "Continuous Evolution",
    desc: "Technology waits for no one. We are obsessed with remaining at the bleeding edge of AI, cloud infrastructure, and software design.",
    number: "04"
  }
];

export default function AboutValues() {
  return (
    <section className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop py-stack-xl">
      <FadeInUp>
        <SectionHeader 
          overline="Principles"
          title="Core Values"
          description="The non-negotiable standards that govern our engineering and business decisions."
        />
      </FadeInUp>

      <StaggerContainer className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid grid-cols-1 md:grid-cols-2 gap-gutter mt-stack-xl">
        {VALUES.map((value, i) => (
          <StaggerItem key={i}>
            <GlassCard padding="lg" className="h-full flex gap-6 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all">
              <div className="font-display text-display-lg text-primary/20 shrink-0 select-none">
                {value.number}
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <h3 className="font-display text-headline-md text-on-surface">{value.title}</h3>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  {value.desc}
                </p>
              </div>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
