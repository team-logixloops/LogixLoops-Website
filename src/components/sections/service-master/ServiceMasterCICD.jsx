"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, FadeInLeft, FadeInRight } from "@/components/motion";

export default function ServiceMasterCICD({ cicdInfrastructure }) {
  if (!cicdInfrastructure || cicdInfrastructure.length === 0) return null;

  return (
    <section className="py-stack-2xl bg-surface-container-lowest/50 border-y border-outline-variant/30 overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
        
        <FadeInLeft className="space-y-stack-sm pr-0 lg:pr-stack-md">
          <SectionHeader 
            overline="Deployment Automation"
            title="CI/CD & Deployment Infrastructure"
            description="We build robust, automated delivery pipelines that guarantee zero-downtime releases, instant rollbacks, and ironclad deployment consistency."
          />

          <div className="flex flex-col gap-6 mt-8">
            {cicdInfrastructure.map((cicd, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white/60 backdrop-blur-md border border-outline-variant/30 rounded-xl hover:shadow-md transition-all group">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-surface flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    {i === 0 ? "integration_instructions" : i === 1 ? "inventory_2" : "rocket_launch"}
                  </span>
                </div>
                <div>
                  <h4 className="font-display text-headline-md text-lg mb-1 text-on-surface">{cicd.title}</h4>
                  <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                    {cicd.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeInLeft>

        <FadeInRight className="relative h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-surface/0 to-surface/0 pointer-events-none rounded-full blur-3xl opacity-70" />
          
          {/* CI/CD Pipeline Dashboard Mockup */}
          <div className="relative w-full max-w-md bg-inverse-surface border border-outline-variant/20 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.2)] overflow-hidden z-20 flex flex-col hover:scale-[1.02] transition-transform duration-700">
            {/* Header */}
            <div className="h-14 border-b border-white/10 bg-black/20 flex items-center px-4 justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-primary text-sm">commit</span>
                <span className="font-label text-xs text-on-secondary-container tracking-wide font-mono">deploy-prod-v2.1.0</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-sm">more_horiz</span>
            </div>
            
            {/* Pipeline Content */}
            <div className="flex-1 p-6 space-y-6">
              
              {/* Build Stage */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mt-1 shrink-0 relative">
                  <span className="material-symbols-outlined text-green-400 text-sm">check</span>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-10 bg-green-500/30" />
                </div>
                <div className="flex-1 bg-white/5 rounded-lg border border-white/10 p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-label text-xs uppercase tracking-wider text-on-secondary-container">Build & Test</span>
                    <span className="text-xs font-mono text-on-surface-variant">0m 45s</span>
                  </div>
                  <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-green-400 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Security Scan Stage */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mt-1 shrink-0 relative">
                  <span className="material-symbols-outlined text-green-400 text-sm">check</span>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-10 bg-primary/30" />
                </div>
                <div className="flex-1 bg-white/5 rounded-lg border border-white/10 p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-label text-xs uppercase tracking-wider text-on-secondary-container">Security Scan</span>
                    <span className="text-xs font-mono text-on-surface-variant">1m 12s</span>
                  </div>
                  <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-green-400 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Deploy Stage */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center mt-1 shrink-0">
                  <span className="material-symbols-outlined text-primary text-sm animate-spin">sync</span>
                </div>
                <div className="flex-1 bg-primary/10 rounded-lg border border-primary/30 p-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-label text-xs uppercase tracking-wider text-primary">Blue/Green Deploy</span>
                    <span className="text-xs font-mono text-primary animate-pulse">Running...</span>
                  </div>
                  <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-primary rounded-full relative">
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <div className="flex-1 bg-black/40 rounded p-1.5 text-center">
                      <span className="text-[9px] text-on-surface-variant font-mono uppercase block">Traffic Blue</span>
                      <span className="text-xs text-on-secondary-container font-mono">30%</span>
                    </div>
                    <div className="flex-1 bg-primary/20 rounded p-1.5 text-center border border-primary/30">
                      <span className="text-[9px] text-primary font-mono uppercase block">Traffic Green</span>
                      <span className="text-xs text-primary font-mono">70%</span>
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
