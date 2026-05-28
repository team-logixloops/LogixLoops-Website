"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

export default function ServiceMasterCloudArchitecture({ cloudArchitecture }) {
  if (!cloudArchitecture || cloudArchitecture.length === 0) return null;

  return (
    <section className="py-stack-2xl bg-surface-container-low/30 border-y border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop">
        <FadeInUp>
          <SectionHeader 
            overline="Cloud Topography"
            title="Cloud Architecture Ecosystem"
            description="We design fault-tolerant, multi-region cloud environments that dynamically scale resources to match your real-time enterprise demands."
            centered
          />
        </FadeInUp>

        {/* Abstract Cloud Architecture Visual */}
        <FadeInUp className="mt-stack-xl max-w-5xl mx-auto relative h-[400px] md:h-[500px] bg-surface-container-highest/20 rounded-3xl border border-outline-variant/30 p-8 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-tertiary/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-12">
            
            {/* Edge / Gateway */}
            <div className="flex-1 w-full bg-white/70 backdrop-blur-xl border border-outline-variant/50 rounded-2xl p-6 shadow-sm flex flex-col items-center group hover:scale-[1.02] transition-transform">
              <div className="w-16 h-16 rounded-full bg-tertiary/10 flex items-center justify-center mb-4 relative">
                <span className="material-symbols-outlined text-tertiary text-3xl">public</span>
                <div className="absolute -inset-2 border border-tertiary/20 rounded-full animate-[spin_15s_linear_infinite]" />
              </div>
              <h4 className="font-label text-label-caps text-on-surface tracking-widest uppercase mb-1">API Gateway</h4>
              <p className="text-xs text-on-surface-variant text-center">Global Edge Network</p>
            </div>

            {/* Connection */}
            <div className="hidden md:flex flex-col items-center justify-center w-16 relative">
              <div className="w-full h-px bg-outline-variant/50 relative">
                <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-tertiary -translate-y-1/2 animate-[ping_2s_infinite]" />
              </div>
              <div className="absolute w-full flex justify-between px-2 text-[10px] text-on-surface-variant font-label uppercase">
                <span>WAF</span>
                <span>TLS</span>
              </div>
            </div>

            {/* Microservices Cluster */}
            <div className="flex-[2] w-full bg-white/70 backdrop-blur-xl border border-outline-variant/50 rounded-2xl p-6 shadow-sm hover:scale-[1.02] transition-transform flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              </div>
              
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">view_module</span>
              </div>
              <h4 className="font-label text-label-caps text-on-surface tracking-widest uppercase mb-4">Kubernetes Cluster</h4>
              
              <div className="flex gap-2 w-full justify-center">
                {[1, 2, 3].map((pod) => (
                  <div key={pod} className="flex-1 max-w-[60px] aspect-square rounded-lg bg-surface-container border border-outline-variant/30 flex items-center justify-center relative">
                    <span className="material-symbols-outlined text-on-surface-variant text-sm">memory</span>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-green-400 rounded-full opacity-70" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-on-surface-variant text-center mt-4">Auto-scaling Node Group</p>
            </div>

            {/* Connection */}
            <div className="hidden md:flex flex-col items-center justify-center w-16 relative">
              <div className="w-full h-px bg-outline-variant/50 relative">
                 <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-primary -translate-y-1/2 animate-[ping_2s_infinite]" style={{animationDelay: '1s'}} />
              </div>
            </div>

            {/* Distributed DB */}
            <div className="flex-1 w-full bg-white/70 backdrop-blur-xl border border-outline-variant/50 rounded-2xl p-6 shadow-sm flex flex-col items-center group hover:scale-[1.02] transition-transform">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-secondary text-3xl">dns</span>
              </div>
              <h4 className="font-label text-label-caps text-on-surface tracking-widest uppercase mb-1">Persistence</h4>
              <p className="text-xs text-on-surface-variant text-center">Multi-AZ Database</p>
            </div>

          </div>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-stack-md">
          {cloudArchitecture.map((arch, i) => (
            <StaggerItem key={i}>
              <div className="bg-white/60 backdrop-blur-md border border-outline-variant/30 p-8 rounded-xl h-full hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all">
                <h3 className="font-display text-headline-md text-xl mb-4 text-on-surface flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary" /> {arch.title}
                </h3>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  {arch.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
