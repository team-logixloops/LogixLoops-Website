"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";
import { SECTION, CARD, accent } from "./tokens";

export default function ServiceMasterMetrics({ metrics, color }) {
  if (!metrics?.length) return null;
  const a = accent(color);

  return (
    <section className={SECTION}>
      <FadeInUp>
        <SectionHeader
          overline="Benchmarks"
          title="Engineering Targets"
          description="The service levels we architect and load-test against."
        />
      </FadeInUp>

      <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-gutter mt-stack-lg">
        {metrics.map((metric) => (
          <StaggerItem key={metric.label}>
            <div className={cn(CARD, a.hover, "text-center p-6")}>
              <div
                className={cn(
                  "font-display text-headline-lg-mobile md:text-headline-lg mb-2 tracking-tight break-words",
                  a.text
                )}
              >
                {metric.value}
              </div>
              <div className="font-label text-label-caps text-on-surface-variant uppercase tracking-widest">
                {metric.label}
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
