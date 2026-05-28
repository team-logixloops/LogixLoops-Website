"use client";

import { SectionHeader, GlassCard } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

const PROCESS_STEPS = [
  {
    title: "Discovery",
    desc: "Deep architectural audit and requirements gathering.",
  },
  {
    title: "Strategy",
    desc: "Defining technology stacks, cloud topography, and scalability roadmap.",
  },
  {
    title: "Design",
    desc: "Prototyping premium user experiences and system data flows.",
  },
  {
    title: "Engineering",
    desc: "Agile, high-velocity sprints building resilient core architectures.",
  },
  {
    title: "QA & Optimization",
    desc: "Rigorous load testing, security audits, and performance tuning.",
  },
  {
    title: "Launch & Scaling",
    desc: "Zero-downtime deployment and continuous telemetry monitoring.",
  },
];

export default function ProcessSection() {
  return (
    <section className="container-site py-stack-2xl relative">
      <div className="absolute top-[30%] left-[-5%] w-[40%] h-[50%] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />

      <FadeInUp>
        <SectionHeader 
          overline="Methodology"
          title="Strategic Engineering Process" 
          description="A meticulous 6-stage lifecycle prioritizing architectural predictability, extreme security, and uncompromising quality."
          centered
        />
      </FadeInUp>

      <div className="mt-stack-xl max-w-5xl mx-auto relative">
        {/* Continuous background line for desktop */}
        <div className="hidden md:block absolute top-[28px] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0" />
        
        <StaggerContainer className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-y-stack-lg md:gap-x-gutter">
          {PROCESS_STEPS.map((step, index) => (
            <StaggerItem key={index} className="relative z-10 w-[85vw] sm:w-[60vw] shrink-0 snap-center md:w-auto md:shrink">
              <div className="flex flex-col md:items-center text-left md:text-center group">
                <div className="w-14 h-14 rounded-full bg-surface-container-lowest border-2 border-primary/20 shadow-glow flex items-center justify-center font-display font-bold text-headline-md text-primary mb-6 relative group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                  <span className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <span className="relative z-10">0{index + 1}</span>
                </div>
                <h3 className="font-heading text-body-lg font-semibold text-on-surface mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="font-body text-body-sm text-on-surface-variant max-w-xs">
                  {step.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
