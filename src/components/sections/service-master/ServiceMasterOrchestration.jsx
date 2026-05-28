"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

export default function ServiceMasterOrchestration({ orchestrationEcosystem }) {
  if (!orchestrationEcosystem || orchestrationEcosystem.length === 0) return null;

  return (
    <section className="py-stack-2xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto border-t border-outline-variant/30">
      <FadeInUp>
        <SectionHeader 
          overline="Workflow Engine"
          title="Workflow Orchestration Ecosystem"
          description="We engineer connected logic systems that trigger instantly, execute flawlessly, and integrate seamlessly across your enterprise stack."
          centered
        />
      </FadeInUp>

      {/* Abstract Orchestration Flow Diagram */}
      <FadeInUp className="mt-stack-xl max-w-4xl mx-auto relative bg-surface-container rounded-3xl border border-outline-variant/30 p-8 md:p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Triggers */}
          <div className="flex-1 flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-2xl bg-white/60 backdrop-blur-md border border-outline-variant/50 shadow-sm flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform relative">
              <span className="material-symbols-outlined text-primary">webhook</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse" />
            </div>
            <span className="font-label text-label-caps tracking-widest text-on-surface mb-1">Triggers</span>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Event Received</span>
          </div>

          {/* Flow Arrow */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="w-full h-px bg-gradient-to-r from-primary/50 to-secondary/50 relative">
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary animate-ping" />
            </div>
          </div>

          {/* Logic Engine */}
          <div className="flex-1 flex flex-col items-center text-center group">
            <div className="w-20 h-20 rounded-full bg-white/60 backdrop-blur-md border-2 border-secondary/20 shadow-md flex items-center justify-center mb-4 group-hover:scale-105 transition-transform relative">
              <span className="material-symbols-outlined text-secondary text-3xl">account_tree</span>
              <svg className="absolute inset-0 w-full h-full -rotate-90 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" className="text-secondary/30" />
              </svg>
            </div>
            <span className="font-label text-label-caps tracking-widest text-on-surface mb-1">Logic Engine</span>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Evaluation</span>
          </div>

          {/* Flow Arrow */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="w-full h-px bg-gradient-to-r from-secondary/50 to-primary/50 relative">
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-secondary animate-ping" style={{ animationDelay: '500ms' }} />
            </div>
          </div>

          {/* Execution */}
          <div className="flex-1 flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-2xl bg-white/60 backdrop-blur-md border border-outline-variant/50 shadow-sm flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform">
              <span className="material-symbols-outlined text-primary">api</span>
            </div>
            <span className="font-label text-label-caps tracking-widest text-on-surface mb-1">Execution</span>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Data Mutated</span>
          </div>
        </div>
      </FadeInUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-stack-md">
        {orchestrationEcosystem.map((eco, i) => (
          <StaggerItem key={i}>
            <div className="bg-white/60 backdrop-blur-[24px] border border-outline-variant/30 p-8 rounded-xl h-full hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all">
              <h3 className="font-display text-headline-md text-xl mb-4 text-on-surface flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" /> {eco.title}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {eco.desc}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
