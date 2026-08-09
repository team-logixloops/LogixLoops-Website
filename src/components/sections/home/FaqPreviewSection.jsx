"use client";

import { SectionHeader, Accordion, Button } from "@/components/ui";
import { FadeInUp } from "@/components/motion";
import { HOME_FAQS } from "@/data/faq";

export default function FaqPreviewSection() {
  return (
    <section className="container-site py-stack-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg items-start">
        <div className="lg:col-span-4 flex flex-col justify-start">
          <FadeInUp>
            <SectionHeader
              overline="Before you ask"
              title="The Questions That Actually Decide It"
              description="Timeline, stack, support, scope changes, scale. The five that come up on every first call, answered here so the call can start somewhere more interesting."
              align="left"
            />
            <div className="mt-8">
              <Button href="/faq" variant="outline" icon="arrow_forward" iconPosition="right">
                Read every answer
              </Button>
            </div>
          </FadeInUp>
        </div>
        
        <div className="lg:col-span-8">
          <FadeInUp delay={0.2}>
            <Accordion
              items={HOME_FAQS}
              variant="bordered"
              defaultOpenIndex={0}
            />
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
