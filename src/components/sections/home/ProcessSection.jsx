"use client";

import { SectionHeader } from "@/components/ui";
import HowItWorks from "@/components/ui/HowItWorks";
import { HOME_PROCESS_STEPS } from "@/data/infrastructure";

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="relative py-20 sm:py-28"
      style={{
        background:
          "radial-gradient(30% 80% at 0% 70%, #dcecfd 0%, #e9f0fa 22.92%, #f1f6fd 42.71%, #f7faff 88.54%)",
      }}
    >
      <div className="container-site mb-4">
        <SectionHeader
          overline="Methodology"
          title="How An Engagement Runs"
          description="The short version of our eight-phase delivery process. Each phase has a condition that has to be true before the next one is allowed to start, which is the whole trick, and the reason nothing arrives as a surprise in month four."
          overlineClassName="text-brand-steel"
          titleClassName="text-on-surface"
          descriptionClassName="text-on-surface-variant"
        />
      </div>

      <HowItWorks features={HOME_PROCESS_STEPS} />
    </section>
  );
}
