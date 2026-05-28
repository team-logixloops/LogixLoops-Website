"use client";

import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

export default function AboutMission() {
  return (
    <section className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop py-stack-xl space-y-stack-md">
      <div className="text-center max-w-3xl mx-auto space-y-stack-sm">
        <FadeInUp>
          <h2 className="font-display text-headline-lg text-on-surface">The North Star</h2>
        </FadeInUp>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <StaggerItem>
          <div className="bg-white/70 backdrop-blur-[24px] border border-white/30 p-10 rounded-2xl flex flex-col gap-6 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden group h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
            <h3 className="font-display text-headline-md text-on-surface">Our Mission</h3>
            <p className="font-body text-body-md text-on-surface-variant">
              To architect digital foundations that provide unparalleled stability and foresight for global enterprises.
            </p>
          </div>
        </StaggerItem>
        
        <StaggerItem>
          <div className="bg-white/70 backdrop-blur-[24px] border border-white/30 p-10 rounded-2xl flex flex-col gap-6 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden group h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <span className="material-symbols-outlined text-secondary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
            <h3 className="font-display text-headline-md text-on-surface">Our Vision</h3>
            <p className="font-body text-body-md text-on-surface-variant">
              A future where complex technology is rendered with effortless clarity, enabling leaders to navigate uncertainty with precision.
            </p>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
