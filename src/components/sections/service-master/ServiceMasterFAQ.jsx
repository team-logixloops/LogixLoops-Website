"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";
import { SECTION, CARD, accent } from "./tokens";

export default function ServiceMasterFAQ({ faqs, color }) {
  if (!faqs?.length) return null;
  const a = accent(color);

  return (
    <section className={SECTION}>
      <FadeInUp>
        {/* The h2 labels the section; the real questions are the h3s below it,
            which is where the answers a reader came for actually live. It used
            to be phrased as a question too, which made the page read as a
            question about a list of questions. */}
        <SectionHeader
          overline="Clarity"
          title="Before you start"
          description="Every engagement begins with a written architecture brief covering scope, stack, and delivery phases. You keep full ownership of the code, working software ships every two weeks from the first sprint, and nothing is built on a proprietary runtime you would have to keep paying for."
        />
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
