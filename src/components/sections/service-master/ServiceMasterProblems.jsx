"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";
import { SECTION, CARD, CARD_PAD, accent, pad } from "./tokens";

export default function ServiceMasterProblems({ problems, color }) {
  if (!problems?.length) return null;
  const a = accent(color);

  return (
    <section className={SECTION}>
      <FadeInUp>
        <SectionHeader
          overline="Challenges"
          title="What We Solve"
          description="The recurring engineering hurdles this practice is built to remove."
        />
      </FadeInUp>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter mt-stack-lg">
        {problems.map((problem, i) => (
          <StaggerItem key={problem.title}>
            <div className={cn(CARD, CARD_PAD, a.hover)}>
              <span
                className={cn(
                  "font-label text-label-caps tracking-widest mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full",
                  a.soft,
                  a.text
                )}
              >
                {pad(i)}
              </span>
              <h3 className="font-heading text-headline-md text-xl mb-3 text-on-surface">
                {problem.title}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {problem.desc}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
