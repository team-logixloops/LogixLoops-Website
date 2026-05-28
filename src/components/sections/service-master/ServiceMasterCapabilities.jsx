"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

export default function ServiceMasterCapabilities({ capabilities }) {
  if (!capabilities || capabilities.length === 0) return null;

  return (
    <section className="py-stack-2xl bg-surface-container-lowest/50 border-y border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop">
        <FadeInUp>
          <SectionHeader 
            overline="Core Expertise"
            title="Engineering Capabilities"
            description="We build robust, maintainable systems that scale effortlessly from day one."
          />
        </FadeInUp>
        
        <StaggerContainer className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-stack-md mt-stack-xl">
          {capabilities.map((cap, i) => (
            <StaggerItem key={i}>
              <div className="flex gap-4 p-6 rounded-2xl hover:bg-surface/50 transition-colors border border-transparent hover:border-outline-variant/30 group">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-surface border border-outline-variant/30 flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors shadow-sm">
                  <span className="material-symbols-outlined">
                    {i === 0 ? "web" : i === 1 ? "dns" : i === 2 ? "layers" : "api"}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-headline-md text-xl mb-2 text-on-surface">{cap.title}</h3>
                  <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
