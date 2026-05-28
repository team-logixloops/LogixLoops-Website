"use client";

import { FadeInLeft, FadeInRight } from "@/components/motion";

export default function AboutDesignPhilosophy() {
  return (
    <section className="bg-surface-container-lowest/50 py-stack-2xl border-y border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
        
        <FadeInLeft className="space-y-stack-sm order-2 lg:order-1 pr-0 lg:pr-stack-md">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-outline-variant/30 bg-surface/50 backdrop-blur-md mb-2">
            <span className="material-symbols-outlined text-[16px] text-secondary">architecture</span>
            <span className="font-label text-label-caps text-on-surface-variant uppercase tracking-widest">
              UX & Technology
            </span>
          </div>
          
          <h2 className="font-display text-headline-lg text-on-surface">
            The Intersection of <span className="text-secondary">Precision</span> and Aesthetics
          </h2>
          
          <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
            We believe that robust backend architecture is meaningless without an equally refined user interface. Our product thinking philosophy demands a perfect equilibrium between complex engineering and cognitive ease.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {[
              "Scalable Design Systems", 
              "Product Thinking", 
              "Long-Term Maintainability", 
              "Cognitive Load Reduction"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 bg-white/60 border border-white/40 p-4 rounded-xl shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="font-body text-body-md font-semibold text-on-surface">{item}</span>
              </li>
            ))}
          </ul>
        </FadeInLeft>

        <FadeInRight className="order-1 lg:order-2 relative h-[500px] rounded-2xl overflow-hidden bg-white/70 backdrop-blur-[24px] border border-white/40 shadow-lg p-6 flex flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-primary/5 z-0 pointer-events-none" />
          
          {/* Abstract UI representation */}
          <div className="relative z-10 w-full h-1/2 flex items-end justify-center pb-6 border-b border-outline-variant/30">
            <div className="flex gap-4 items-end h-full w-full max-w-sm">
              <div className="w-1/3 bg-primary/20 rounded-t-xl animate-pulse h-1/3" />
              <div className="w-1/3 bg-secondary/30 rounded-t-xl animate-pulse h-3/4" style={{ animationDelay: "1s" }} />
              <div className="w-1/3 bg-primary/40 rounded-t-xl animate-pulse h-full" style={{ animationDelay: "2s" }} />
            </div>
          </div>
          
          <div className="relative z-10 pt-6">
            <h3 className="font-display text-headline-md text-on-surface mb-2">Design Systems</h3>
            <p className="font-body text-body-md text-on-surface-variant">
              Centralized tokens, reusable components, and strict governance to ensure brand consistency at scale.
            </p>
          </div>
        </FadeInRight>

      </div>
    </section>
  );
}
