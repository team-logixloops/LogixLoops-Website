"use client";

import { SectionHeader } from "@/components/ui";
import HowItWorks from "@/components/ui/HowItWorks";
import { KIT_STEPS } from "@/data/infrastructure";

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
          overline="How it works"
          title="How A Loop Runs"
          description="Five steps, the same for every Loop. Each one ends with something you can see and approve, so nothing arrives as a surprise, and the last one is 30 days of making it better with real data."
          overlineClassName="text-brand-steel"
          titleClassName="text-on-surface"
          descriptionClassName="text-on-surface-variant"
        />
      </div>

      <HowItWorks features={KIT_STEPS} />
    </section>
  );
}
