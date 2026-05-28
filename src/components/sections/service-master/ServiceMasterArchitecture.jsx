"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

export default function ServiceMasterArchitecture({ architectureSystems }) {
  if (!architectureSystems || architectureSystems.length === 0) return null;

  return (
    <section className="py-stack-2xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto border-t border-outline-variant/30">
      <FadeInUp>
        <SectionHeader 
          overline="Core Systems"
          title="Multi-Tenant Architecture"
          description="We build modular, cloud-native infrastructures that guarantee absolute data isolation while allowing infinite horizontal scale."
          centered
        />
      </FadeInUp>

      {/* Abstract Architecture Diagram */}
      <FadeInUp className="mt-stack-xl max-w-4xl mx-auto relative h-64 md:h-80 bg-surface-container rounded-3xl border border-outline-variant/30 p-8 flex flex-col justify-between overflow-hidden group">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Top layer (Client/API Gateway) */}
        <div className="relative z-10 w-3/4 max-w-md mx-auto bg-white/80 backdrop-blur-md p-4 rounded-xl border border-outline-variant/50 shadow-sm flex items-center justify-center gap-3">
          <span className="material-symbols-outlined text-primary">router</span>
          <span className="font-label text-label-caps tracking-widest text-on-surface">Global API Gateway</span>
        </div>

        {/* Lines connecting layers */}
        <div className="absolute top-20 left-1/2 w-px h-16 bg-gradient-to-b from-primary/50 to-transparent -translate-x-1/2" />
        
        {/* Middle layer (Microservices) */}
        <div className="relative z-10 grid grid-cols-3 gap-4 w-full">
          <div className="bg-surface/90 backdrop-blur-sm p-4 rounded-xl border border-outline-variant/30 text-center shadow-sm group-hover:-translate-y-2 transition-transform duration-500">
            <span className="material-symbols-outlined text-secondary mb-2 block">dns</span>
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Auth Service</span>
          </div>
          <div className="bg-surface/90 backdrop-blur-sm p-4 rounded-xl border border-outline-variant/30 text-center shadow-sm group-hover:-translate-y-2 transition-transform duration-500 delay-100">
            <span className="material-symbols-outlined text-primary mb-2 block">account_balance_wallet</span>
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Billing Engine</span>
          </div>
          <div className="bg-surface/90 backdrop-blur-sm p-4 rounded-xl border border-outline-variant/30 text-center shadow-sm group-hover:-translate-y-2 transition-transform duration-500 delay-200">
            <span className="material-symbols-outlined text-tertiary mb-2 block">analytics</span>
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Telemetry</span>
          </div>
        </div>

        {/* Bottom layer (Data) */}
        <div className="absolute bottom-[-20%] left-1/2 w-3/4 h-32 bg-primary/5 rounded-[100%] blur-[40px] -translate-x-1/2" />
        <div className="relative z-10 w-2/3 max-w-sm mx-auto bg-surface-container-highest p-3 rounded-t-2xl border-t border-x border-outline-variant/50 flex items-center justify-center gap-3 mt-auto">
          <span className="material-symbols-outlined text-on-surface-variant">storage</span>
          <span className="font-label text-label-caps tracking-widest text-on-surface-variant">Isolated Data Shards</span>
        </div>
      </FadeInUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-stack-md">
        {architectureSystems.map((sys, i) => (
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
