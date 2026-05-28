"use client";

import { SectionHeader, GlassCard } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

const MINDSETS = [
  {
    title: "System-First Engineering",
    desc: "We don't build isolated features. We engineer holistic, interconnected systems designed for exponential scale and long-term maintainability.",
    icon: "account_tree"
  },
  {
    title: "AI-Native Workflows",
    desc: "Artificial intelligence is not an add-on. It is a fundamental layer of our architecture, optimizing both our development process and the final product.",
    icon: "memory"
  },
  {
    title: "Enterprise Reliability",
    desc: "Code that fails is code that costs. We adhere to rigorous automated testing and zero-downtime deployment pipelines to ensure absolute stability.",
    icon: "verified_user"
  }
];

export default function AboutMindset() {
  return (
    <section className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop py-stack-2xl relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <FadeInUp>
        <SectionHeader 
          overline="Philosophy"
          title="The Engineering Mindset"
          description="A ruthless commitment to performance, automation, and architectural integrity."
          centered
        />
      </FadeInUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-stack-xl relative z-10">
        {MINDSETS.map((mindset, i) => (
          <StaggerItem key={i} className={i === 1 ? "md:-translate-y-8" : ""}>
            <GlassCard variant="elevated" padding="xl" className="h-full flex flex-col items-center text-center group hover:border-primary/40 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-3xl text-primary">{mindset.icon}</span>
              </div>
              <h3 className="font-display text-headline-md text-on-surface mb-4">{mindset.title}</h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {mindset.desc}
              </p>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
