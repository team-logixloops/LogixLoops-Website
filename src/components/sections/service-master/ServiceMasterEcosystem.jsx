"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

export default function ServiceMasterEcosystem({ aiEcosystem }) {
  if (!aiEcosystem || aiEcosystem.length === 0) return null;

  return (
    <section className="py-stack-2xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto border-t border-outline-variant/30">
      <FadeInUp>
        <SectionHeader 
          overline="Ecosystem"
          title="AI Workflow Ecosystem"
          description="We engineer seamless data pipelines that convert fragmented business data into high-dimensional intelligence."
          centered
        />
      </FadeInUp>

      {/* Abstract Ecosystem Flow Diagram */}
      <FadeInUp className="mt-stack-xl max-w-4xl mx-auto relative bg-surface-container rounded-3xl border border-outline-variant/30 p-8 md:p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Ingestion */}
          <div className="flex-1 flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-2xl bg-white/60 backdrop-blur-md border border-outline-variant/50 shadow-sm flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform">
              <span className="material-symbols-outlined text-secondary">database</span>
            </div>
            <span className="font-label text-label-caps tracking-widest text-on-surface mb-1">Raw Data</span>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Ingestion</span>
          </div>

          {/* Flow Arrow */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="w-full h-px bg-gradient-to-r from-secondary/50 to-primary/50 relative">
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-secondary animate-ping" />
            </div>
          </div>

          {/* Embeddings */}
          <div className="flex-1 flex flex-col items-center text-center group">
            <div className="w-20 h-20 rounded-full bg-white/60 backdrop-blur-md border-2 border-primary/20 shadow-md flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-primary text-3xl">scatter_plot</span>
            </div>
            <span className="font-label text-label-caps tracking-widest text-on-surface mb-1">Vector DB</span>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Embeddings</span>
          </div>

          {/* Flow Arrow */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="w-full h-px bg-gradient-to-r from-primary/50 to-secondary/50 relative">
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary animate-ping" style={{ animationDelay: '500ms' }} />
            </div>
          </div>

          {/* Inference */}
          <div className="flex-1 flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-2xl bg-white/60 backdrop-blur-md border border-outline-variant/50 shadow-sm flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform">
              <span className="material-symbols-outlined text-secondary">psychology</span>
            </div>
            <span className="font-label text-label-caps tracking-widest text-on-surface mb-1">Inference</span>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Action</span>
          </div>
        </div>
      </FadeInUp>

      <StaggerContainer className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid grid-cols-1 md:grid-cols-3 gap-gutter mt-stack-md">
        {aiEcosystem.map((eco, i) => (
          <StaggerItem key={i}>
            <div className="bg-white/60 backdrop-blur-[24px] border border-outline-variant/30 p-8 rounded-xl h-full hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all">
              <h3 className="font-display text-headline-md text-xl mb-4 text-on-surface flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary" /> {eco.title}
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
