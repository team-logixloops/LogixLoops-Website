"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

export default function ServiceMasterTech({ technologies }) {
  if (!technologies || technologies.length === 0) return null;

  return (
    <section className="py-stack-xl max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop border-t border-outline-variant/30">
      <FadeInUp>
        <SectionHeader 
          overline="Stack"
          title="Technology Ecosystem"
          description="We leverage enterprise-grade technologies to build resilient, scalable infrastructure."
          centered
        />
      </FadeInUp>

      <StaggerContainer className="flex flex-wrap justify-center gap-4 mt-stack-xl max-w-4xl mx-auto">
        {technologies.map((tech, i) => (
          <StaggerItem key={i}>
            <div className="px-6 py-3 bg-white/60 backdrop-blur-md border border-outline-variant/30 rounded-full font-label text-label-caps uppercase tracking-widest text-on-surface hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all cursor-default shadow-sm">
              {tech}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
