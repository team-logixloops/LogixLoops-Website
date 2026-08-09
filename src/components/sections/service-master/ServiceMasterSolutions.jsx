"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";
import { SECTION, CARD, CARD_PAD, accent } from "./tokens";

export default function ServiceMasterSolutions({ solutions, color }) {
  if (!solutions?.length) return null;
  const a = accent(color);

  return (
    <section className={SECTION}>
      <FadeInUp>
        <SectionHeader
          overline="Deliverables"
          title="What You Get"
          description="The systems we ship most often within this practice."
        />
      </FadeInUp>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter mt-stack-lg">
        {solutions.map((solution) => (
          <StaggerItem key={solution.title}>
            <div className={cn(CARD, CARD_PAD, a.hover)}>
              <span className={cn("block h-1 w-12 rounded-full mb-6", a.dot)} />
              <h3 className="font-heading text-headline-md text-xl mb-3 text-on-surface">
                {solution.title}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {solution.desc}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
