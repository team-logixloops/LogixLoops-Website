"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

export default function ServiceMasterFAQ({ faqs }) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto border-t border-outline-variant/30">
      <div className="flex flex-col md:flex-row gap-stack-lg">
        <FadeInUp className="md:w-1/3">
          <SectionHeader 
            overline="Clarity"
            title="Common Inquiries"
            description="Transparent answers regarding our engineering standards and operational methodologies."
          />
        </FadeInUp>
        
        <StaggerContainer className="md:w-2/3 flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <StaggerItem key={i}>
              <div className="bg-white/60 backdrop-blur-md border border-outline-variant/30 p-6 rounded-xl hover:shadow-sm transition-shadow">
                <h4 className="font-display text-headline-md text-lg mb-3 text-on-surface flex items-start gap-3">
                  <span className="text-secondary shrink-0">Q.</span> {faq.q}
                </h4>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed pl-7 border-l-2 border-primary/20">
                  {faq.a}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
