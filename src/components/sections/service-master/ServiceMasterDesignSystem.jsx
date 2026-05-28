"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

export default function ServiceMasterDesignSystem({ designSystem }) {
  if (!designSystem || designSystem.length === 0) return null;

  return (
    <section className="py-stack-2xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto border-t border-outline-variant/30">
      <FadeInUp>
        <SectionHeader 
          overline="System Architecture"
          title="Design System Ecosystem"
          description="We engineer scalable UI architectures where every pixel is governed by semantic tokens, ensuring perfect consistency from Figma to React."
          centered
        />
      </FadeInUp>

      {/* Abstract Design System Visual */}
      <FadeInUp className="mt-stack-xl max-w-5xl mx-auto relative h-[400px] md:h-[500px] bg-surface-container rounded-3xl border border-outline-variant/30 p-8 overflow-hidden flex flex-col md:flex-row items-center justify-center gap-8">
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        {/* Core Tokens */}
        <div className="relative z-10 flex-1 w-full flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-full bg-primary shadow-sm" />
            <div className="w-10 h-10 rounded-full bg-secondary shadow-sm" />
            <div className="w-10 h-10 rounded-full bg-tertiary shadow-sm" />
          </div>
          <div className="bg-white/60 backdrop-blur-md border border-outline-variant/50 rounded-xl p-4 font-mono text-[10px] text-on-surface-variant flex flex-col gap-2">
            <div>--color-primary: #004ac6;</div>
            <div>--spacing-gutter: 24px;</div>
            <div>--radius-xl: 12px;</div>
          </div>
          <div className="font-label text-label-caps tracking-widest text-on-surface mt-2">1. Design Tokens</div>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex text-primary/30">
          <span className="material-symbols-outlined text-4xl">arrow_forward</span>
        </div>

        {/* UI Primitives */}
        <div className="relative z-10 flex-1 w-full flex flex-col gap-4 items-center">
          <div className="w-full bg-white/60 backdrop-blur-md border border-outline-variant/50 rounded-xl p-4 flex flex-col gap-3">
            <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium hover:scale-[0.98] transition-transform">Primary Button</button>
            <button className="w-full bg-surface-container text-on-surface border border-outline-variant/30 py-2 rounded-lg text-sm font-medium">Secondary Outline</button>
          </div>
          <div className="font-label text-label-caps tracking-widest text-on-surface mt-2">2. UI Primitives</div>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex text-primary/30">
          <span className="material-symbols-outlined text-4xl">arrow_forward</span>
        </div>

        {/* Composed Layout */}
        <div className="relative z-10 flex-[1.5] w-full flex flex-col gap-4">
          <div className="w-full h-40 bg-white/80 backdrop-blur-xl border border-outline-variant/50 rounded-xl p-4 flex flex-col gap-3 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex gap-3 items-center border-b border-outline-variant/30 pb-2">
              <div className="w-8 h-8 rounded-full bg-primary/10" />
              <div className="w-24 h-2 bg-on-surface-variant/20 rounded-full" />
            </div>
            <div className="flex-1 flex flex-col justify-end gap-2">
              <div className="w-full h-2 bg-on-surface-variant/10 rounded-full" />
              <div className="w-2/3 h-2 bg-on-surface-variant/10 rounded-full" />
            </div>
          </div>
          <div className="font-label text-label-caps tracking-widest text-on-surface mt-2 text-right">3. Composed Experience</div>
        </div>
        
      </FadeInUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-stack-md">
        {designSystem.map((sys, i) => (
          <StaggerItem key={i}>
            <div className="bg-white/60 backdrop-blur-[24px] border border-outline-variant/30 p-8 rounded-xl h-full hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all">
              <h3 className="font-display text-headline-md text-xl mb-4 text-on-surface flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" /> {sys.title}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {sys.desc}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
