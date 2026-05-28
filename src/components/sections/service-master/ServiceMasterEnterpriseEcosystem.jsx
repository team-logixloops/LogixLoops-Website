"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

export default function ServiceMasterEnterpriseEcosystem({ enterpriseEcosystem }) {
  if (!enterpriseEcosystem || enterpriseEcosystem.length === 0) return null;

  return (
    <section className="py-stack-2xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto border-t border-outline-variant/30">
      <FadeInUp>
        <SectionHeader 
          overline="System Architecture"
          title="Enterprise Systems Ecosystem"
          description="We unify disconnected operations into a single, highly cohesive digital environment, breaking down data silos to provide true enterprise visibility."
          centered
        />
      </FadeInUp>

      {/* Abstract Enterprise Ecosystem Visual */}
      <FadeInUp className="mt-stack-xl max-w-5xl mx-auto relative h-[450px] md:h-[600px] bg-surface-container rounded-3xl border border-outline-variant/30 p-4 md:p-8 overflow-hidden flex flex-col items-center justify-center">
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-surface-container to-surface-container pointer-events-none" />
        
        {/* Core Operations API (Center) */}
        <div className="relative z-20 w-32 h-32 md:w-48 md:h-48 rounded-full bg-white/80 backdrop-blur-xl border-2 border-primary/20 shadow-[0_0_40px_rgba(0,74,198,0.1)] flex flex-col items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-primary/30 animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-secondary/20 animate-[spin_15s_linear_infinite_reverse]" />
          <span className="material-symbols-outlined text-primary text-4xl mb-2">hub</span>
          <span className="font-label text-[10px] md:text-xs tracking-widest uppercase text-on-surface text-center leading-tight">Core API<br/>Gateway</span>
        </div>

        {/* Orbiting Systems (Data Lake, ERP, CRM, Micro-Frontends) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          {/* Orbit Path 1 */}
          <div className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full border border-outline-variant/50 border-dashed animate-[spin_60s_linear_infinite]" />
          
          {/* Data Lake Node */}
          <div className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full animate-[spin_60s_linear_infinite]">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-outline-variant/50 rounded-xl p-3 shadow-md flex items-center gap-2 animate-[spin_60s_linear_infinite_reverse]">
               <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-sm">water</span>
               </div>
               <div className="hidden md:block">
                 <p className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">Storage</p>
                 <p className="font-headline-md text-sm text-on-surface leading-tight">Data Lake</p>
               </div>
            </div>
          </div>

          {/* Micro-Frontends Node */}
          <div className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full animate-[spin_60s_linear_infinite]" style={{ animationDelay: '-30s' }}>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-outline-variant/50 rounded-xl p-3 shadow-md flex items-center gap-2 animate-[spin_60s_linear_infinite_reverse]" style={{ animationDelay: '-30s' }}>
               <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-sm">dashboard_customize</span>
               </div>
               <div className="hidden md:block">
                 <p className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">UI Layer</p>
                 <p className="font-headline-md text-sm text-on-surface leading-tight">Micro-Frontends</p>
               </div>
            </div>
          </div>

          {/* Orbit Path 2 */}
          <div className="absolute w-[360px] h-[360px] md:w-[550px] md:h-[550px] rounded-full border border-outline-variant/30 border-dashed animate-[spin_40s_linear_infinite_reverse]" />
          
          {/* Analytics Node */}
           <div className="absolute w-[360px] h-[360px] md:w-[550px] md:h-[550px] rounded-full animate-[spin_40s_linear_infinite_reverse]">
            <div className="absolute top-1/2 -left-6 -translate-y-1/2 bg-white/90 backdrop-blur-md border border-outline-variant/50 rounded-xl p-3 shadow-md flex items-center gap-2 animate-[spin_40s_linear_infinite]">
               <div className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-sm">insert_chart</span>
               </div>
               <div className="hidden md:block">
                 <p className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">Reporting</p>
                 <p className="font-headline-md text-sm text-on-surface leading-tight">Analytics</p>
               </div>
            </div>
          </div>

           {/* Integrations Node */}
           <div className="absolute w-[360px] h-[360px] md:w-[550px] md:h-[550px] rounded-full animate-[spin_40s_linear_infinite_reverse]" style={{ animationDelay: '-20s' }}>
            <div className="absolute top-1/2 -right-6 -translate-y-1/2 bg-white/90 backdrop-blur-md border border-outline-variant/50 rounded-xl p-3 shadow-md flex items-center gap-2 animate-[spin_40s_linear_infinite]" style={{ animationDelay: '-20s' }}>
               <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-fixed-variant">
                  <span className="material-symbols-outlined text-sm">extension</span>
               </div>
               <div className="hidden md:block">
                 <p className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">External</p>
                 <p className="font-headline-md text-sm text-on-surface leading-tight">Integrations</p>
               </div>
            </div>
          </div>
        </div>

      </FadeInUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-stack-md">
        {enterpriseEcosystem.map((sys, i) => (
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
