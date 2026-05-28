"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

export default function ServiceMasterProcess({ workflow }) {
  if (!workflow || workflow.length === 0) return null;

  return (
    <section className="py-stack-2xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto relative">
      <FadeInUp>
        <SectionHeader 
          overline="Methodology"
          title="Architecture & Development Process"
          description="A rigorous, phased approach to engineering enterprise digital systems."
          centered
        />
      </FadeInUp>

      <div className="mt-stack-xl relative max-w-4xl mx-auto">
        <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-px bg-outline-variant/30 -translate-x-1/2" />
        
        <StaggerContainer className="flex flex-col gap-12">
          {workflow.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <StaggerItem key={i} className="relative flex flex-col md:flex-row items-start md:items-center w-full w-[85vw] sm:w-[60vw] shrink-0 snap-center md:w-auto md:shrink">
                {/* Timeline node */}
                <div className="absolute left-[24px] md:left-1/2 w-4 h-4 rounded-full bg-primary -translate-x-1/2 z-10 border-4 border-surface shadow-[0_0_0_4px_rgba(37,99,235,0.1)]" />
                
                {/* Content */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 flex flex-col ${isEven ? "md:pr-16 md:items-end md:text-right" : "md:ml-auto md:pl-16 md:items-start md:text-left"}`}>
                  <div className="bg-white/60 backdrop-blur-md border border-outline-variant/30 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow w-full">
                    <span className="font-label text-label-caps text-primary mb-2 block tracking-widest uppercase">Phase {step.phase}</span>
                    <h3 className="font-display text-headline-md text-lg mb-2 text-on-surface">{step.title}</h3>
                    <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
