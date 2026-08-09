"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";
import { SECTION, CARD, CARD_PAD, accent, pad } from "./tokens";

export default function ServiceMasterCapabilities({ capabilities, color }) {
  if (!capabilities?.length) return null;
  const a = accent(color);

  return (
    <section className={SECTION}>
      <FadeInUp>
        <SectionHeader
          overline="Core Expertise"
          title="Engineering Capabilities"
          description="The disciplines our teams own end to end on every engagement."
        />
      </FadeInUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-stack-lg">
        {capabilities.map((capability, i) => (
          <StaggerItem key={capability.title}>
            <div className={cn(CARD, CARD_PAD, a.hover, "flex gap-5")}>
              <span
                className={cn(
                  "font-label text-label-caps tracking-widest shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full",
                  a.soft,
                  a.text
                )}
              >
                {pad(i)}
              </span>
              <div>
                <h3 className="font-heading text-headline-md text-xl mb-3 text-on-surface">
                  {capability.title}
                </h3>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  {capability.desc}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
