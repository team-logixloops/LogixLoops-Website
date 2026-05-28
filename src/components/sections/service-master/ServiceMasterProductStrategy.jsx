"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, FadeInLeft, FadeInRight } from "@/components/motion";

export default function ServiceMasterProductStrategy({ productStrategy }) {
  if (!productStrategy || productStrategy.length === 0) return null;

  return (
    <section className="py-stack-2xl bg-surface-container-lowest/50 border-y border-outline-variant/30 overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
        
        <FadeInLeft className="space-y-stack-sm pr-0 lg:pr-stack-md">
          <SectionHeader 
            overline="Strategic Intelligence"
            title="Research & Product Strategy"
            description="We eliminate guesswork through rigorous behavioral analysis, heatmapping, and iterative testing, ensuring your product solves real problems."
          />

          <div className="flex flex-col gap-6 mt-8">
            {productStrategy.map((strategy, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white/60 backdrop-blur-md border border-outline-variant/30 rounded-xl hover:shadow-md transition-all group">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-surface flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    {i === 0 ? "psychology" : i === 1 ? "account_tree" : "trending_up"}
                  </span>
                </div>
                <div>
                  <h4 className="font-display text-headline-md text-lg mb-1 text-on-surface">{strategy.title}</h4>
                  <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                    {strategy.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeInLeft>

        <FadeInRight className="relative h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-surface/0 to-surface/0 pointer-events-none rounded-full blur-3xl opacity-70" />
          
          {/* Research & Strategy Visual Mockup */}
          <div className="relative w-full max-w-md bg-surface-container border border-outline-variant/50 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.1)] overflow-hidden z-20 flex flex-col hover:scale-[1.02] transition-transform duration-700">
            {/* Header */}
            <div className="h-16 border-b border-outline-variant/30 bg-surface/50 backdrop-blur-md flex items-center px-6 justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant">monitoring</span>
                <div className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Behavioral Analytics</div>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-outline-variant" />
                <div className="w-2 h-2 rounded-full bg-outline-variant" />
                <div className="w-2 h-2 rounded-full bg-outline-variant" />
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 p-6 space-y-6 relative">
              
              {/* Heatmap Simulation */}
              <div className="w-full bg-white/80 rounded-xl border border-outline-variant/30 p-4 shadow-sm relative overflow-hidden h-40">
                <div className="absolute top-2 left-4 w-24 h-4 bg-on-surface-variant/10 rounded" />
                <div className="absolute top-10 left-4 w-1/2 h-2 bg-on-surface-variant/5 rounded" />
                <div className="absolute top-14 left-4 w-1/3 h-2 bg-on-surface-variant/5 rounded" />
                
                {/* Simulated Heat Spots */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-red-500/20 rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-4 left-1/3 w-20 h-20 bg-yellow-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
                
                <div className="absolute bottom-4 right-4 bg-primary text-white text-[10px] px-2 py-1 rounded shadow-lg font-label uppercase tracking-widest flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">ads_click</span>
                  High Engagement
                </div>
              </div>

              {/* Journey Map */}
              <div className="w-full">
                <h5 className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-3">User Journey Funnel</h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-on-surface-variant w-8">100%</span>
                    <div className="flex-1 h-2 bg-on-surface-variant/10 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-primary" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-on-surface-variant w-8">75%</span>
                    <div className="flex-1 h-2 bg-on-surface-variant/10 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-primary/80" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-on-surface-variant w-8">42%</span>
                    <div className="flex-1 h-2 bg-on-surface-variant/10 rounded-full overflow-hidden">
                      <div className="w-[42%] h-full bg-secondary" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </FadeInRight>

      </div>
    </section>
  );
}
