"use client";

import { FadeInUp } from "@/components/motion";

export default function ServicesCoreHero() {
  return (
    <section className="text-center py-stack-lg max-w-4xl mx-auto pt-[140px]">
      <FadeInUp>
        <h1 className="font-display text-display-xl text-on-surface mb-stack-md tracking-tight leading-[1.1]">
          Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Atmospheres.</span>
        </h1>
        <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg leading-relaxed">
          We design and build high-performance digital ecosystems for enterprise leaders. Precision craftsmanship meets visionary technology.
        </p>
      </FadeInUp>
    </section>
  );
}
