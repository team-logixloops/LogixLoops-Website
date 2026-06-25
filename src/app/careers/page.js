"use client";

import { FadeInUp } from "@/components/motion";

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-[-1] bg-ambient-glow-cyan pointer-events-none opacity-20"></div>
      <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <section className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto text-center relative w-full min-h-[80vh]">
        <FadeInUp>
          <span className="font-label text-label-caps text-secondary tracking-widest uppercase mb-6 block">
            Elite Engineering
          </span>
          <h1 className="font-display text-display-xl text-on-surface mb-8 max-w-4xl mx-auto tracking-tight">
            Our Roster is <span className="text-primary">Currently Full</span>
          </h1>
          
          <div className="max-w-2xl mx-auto p-1 relative group mt-12">
            {/* Animated border glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-700 animate-gradient-xy"></div>
            
            {/* Glass Card */}
            <div className="relative bg-surface-container-lowest/40 backdrop-blur-2xl border border-outline-variant/30 rounded-3xl p-10 md:p-16 shadow-glass-elevated">
              <span className="material-symbols-outlined text-[48px] text-primary mb-6 block">
                group_off
              </span>
              <h2 className="font-display text-headline-lg text-on-surface mb-4">
                No Active Openings
              </h2>
              <p className="font-body text-body-lg text-on-surface-variant mb-10 leading-relaxed">
                LogixLoops is a tightly-knit, boutique engineering collective. We currently have no open positions, but we are always interested in connecting with exceptional systems architects, cloud engineers, and product designers for future opportunities.
              </p>
              
              <a 
                href="mailto:logixloops@gmail.com" 
                className="btn-primary inline-flex items-center gap-2 font-label text-label-caps px-8 py-4 rounded-full uppercase tracking-widest"
              >
                <span>Submit Your Portfolio</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>
          </div>
        </FadeInUp>
      </section>
    </div>
  );
}
