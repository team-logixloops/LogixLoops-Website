"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, FadeInLeft, FadeInRight } from "@/components/motion";

export default function ServiceMasterMLInfrastructure({ mlInfrastructure }) {
  if (!mlInfrastructure || mlInfrastructure.length === 0) return null;

  return (
    <section className="py-stack-2xl bg-surface-container-lowest/50 border-y border-outline-variant/30 overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
        
        <FadeInLeft className="space-y-stack-sm pr-0 lg:pr-stack-md">
          <SectionHeader 
            overline="MLOps"
            title="Machine Learning Infrastructure"
            description="We build maintainable ML architectures that scale inference capabilities securely across distributed cloud environments."
          />

          <div className="flex flex-col gap-6 mt-8">
            {mlInfrastructure.map((infra, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white/60 backdrop-blur-md border border-outline-variant/30 rounded-xl hover:shadow-md transition-all group">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-surface flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    {i === 0 ? "memory" : i === 1 ? "route" : "troubleshoot"}
                  </span>
                </div>
                <div>
                  <h4 className="font-display text-headline-md text-lg mb-1 text-on-surface">{infra.title}</h4>
                  <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                    {infra.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeInLeft>

        <FadeInRight className="relative h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-surface/0 to-surface/0 pointer-events-none rounded-full blur-3xl opacity-70" />
          
          {/* ML Infrastructure Diagram Mockup */}
          <div className="relative w-full max-w-md bg-surface-container border border-outline-variant/50 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.1)] overflow-hidden z-20 flex flex-col hover:scale-[1.02] transition-transform duration-700">
            {/* Header */}
            <div className="h-16 border-b border-outline-variant/30 bg-surface/50 backdrop-blur-md flex items-center px-6 justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <div className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Cluster Active</div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">terminal</span>
            </div>
            
            {/* Content */}
            <div className="flex-1 p-6 space-y-4">
              {/* Training Node */}
              <div className="w-full bg-white/80 rounded-xl border border-outline-variant/30 p-4 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">developer_board</span>
                </div>
                <div>
                  <div className="w-24 h-3 bg-on-surface-variant/20 rounded-full mb-2" />
                  <div className="w-32 h-2 bg-on-surface-variant/10 rounded-full" />
                </div>
                <div className="ml-auto w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              </div>

              {/* Connecting Path */}
              <div className="w-full flex justify-center py-2">
                <div className="w-1 h-8 bg-gradient-to-b from-primary/30 to-secondary/30 rounded-full" />
              </div>

              {/* Inference API */}
              <div className="w-full bg-white/80 rounded-xl border border-outline-variant/30 p-4 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">api</span>
                </div>
                <div>
                  <div className="w-20 h-3 bg-on-surface-variant/20 rounded-full mb-2" />
                  <div className="w-24 h-2 bg-on-surface-variant/10 rounded-full" />
                </div>
                <div className="ml-auto flex flex-col gap-1">
                  <div className="w-8 h-1 bg-green-400 rounded-full" />
                  <div className="w-8 h-1 bg-green-400 rounded-full" />
                  <div className="w-8 h-1 bg-green-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          
        </FadeInRight>

      </div>
    </section>
  );
}
