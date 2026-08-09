"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";
import { SECTION, accent } from "./tokens";

export default function ServiceMasterTech({ technologies, color }) {
  if (!technologies?.length) return null;
  const a = accent(color);

  return (
    <section className={SECTION}>
      <FadeInUp>
        <SectionHeader
          overline="Stack"
          title="Technology Ecosystem"
          description="The production-grade tooling we standardise on for this practice."
        />
      </FadeInUp>

      <StaggerContainer className="flex flex-wrap justify-center gap-4 mt-stack-lg max-w-4xl mx-auto">
        {technologies.map((tech) => (
          <StaggerItem key={tech}>
            <div
              className={cn(
                "px-6 py-3 bg-white/60 backdrop-blur-md border border-outline-variant/30 rounded-full font-label text-label-caps uppercase tracking-widest text-on-surface transition-colors cursor-default shadow-sm",
                a.hover
              )}
            >
              {tech}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
