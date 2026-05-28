"use client";

import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

export default function ServiceMasterMetrics({ metrics }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="py-stack-xl bg-surface-container-lowest/50 border-y border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop flex flex-col md:flex-row gap-stack-lg items-center">
        <FadeInUp className="md:w-1/3">
          <h2 className="font-display text-headline-lg text-on-surface mb-4">Performance & Scalability</h2>
          <p className="font-body text-body-md text-on-surface-variant">
            We engineer for absolute reliability. Our architectures are load-tested and optimized to ensure milliseconds of latency even under intense enterprise workloads.
          </p>
        </FadeInUp>
        
        <StaggerContainer className="md:w-2/3 grid grid-cols-2 gap-gutter w-full">
          {metrics.map((metric, i) => (
            <StaggerItem key={i}>
              <div className="bg-white/60 backdrop-blur-md border border-outline-variant/30 p-6 rounded-xl hover:bg-white/80 transition-colors shadow-sm text-center">
                <div className="font-display text-display-md text-primary mb-2 font-bold tracking-tight">
                  {metric.value}
                </div>
                <div className="font-label text-label-caps text-on-surface-variant uppercase tracking-widest">
                  {metric.label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
