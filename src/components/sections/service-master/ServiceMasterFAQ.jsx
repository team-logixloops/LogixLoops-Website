"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";
import { SECTION, CARD, accent } from "./tokens";

export default function ServiceMasterFAQ({
  faqs,
  color,
  title = "Before you start",
  description = "Short answers to what people ask before they start. Anything else, ask us on the call.",
}) {
  if (!faqs?.length) return null;
  const a = accent(color);

  return (
    <section className={SECTION}>
      <FadeInUp>
        <SectionHeader overline="Questions" title={title} description={description} />
      </FadeInUp>

      <StaggerContainer className="flex flex-col gap-4 mt-stack-lg max-w-3xl mx-auto">
        {faqs.map((faq) => (
          <StaggerItem key={faq.q}>
            <div className={cn(CARD, a.hover, "p-6")}>
              <h3 className="font-heading text-headline-md text-lg mb-3 text-on-surface">
                {faq.q}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {faq.a}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
