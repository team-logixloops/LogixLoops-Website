"use client";

import { SectionHeader, GlassCard, Button } from "@/components/ui";
import { FadeInUp, FadeInLeft, StaggerContainer, StaggerItem } from "@/components/motion";
import { SECURITY_PROTOCOLS } from "@/data/infrastructure";

export default function SecurityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Security Hero */}
      <section className="pt-40 pb-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto text-center relative overflow-hidden">
        <div className="absolute inset-0 z-[-1] bg-ambient-glow-violet pointer-events-none opacity-30"></div>
        <FadeInUp>
          <span className="font-label text-label-caps text-error tracking-widest uppercase mb-4 block">
            Trust & Compliance
          </span>
          <h1 className="font-display text-display-xl text-on-surface mb-stack-sm max-w-4xl mx-auto tracking-tight">
            Enterprise <span className="text-primary">Trust Infrastructure</span>
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg">
            Security is not a feature; it is the absolute baseline. We engineer compliance-ready, zero-trust architectures designed to withstand catastrophic failures and active threat vectors.
          </p>
        </FadeInUp>
      </section>

      {/* 2. Security Systems (Protocols) */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto pb-stack-xl">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {SECURITY_PROTOCOLS.map((protocol, idx) => (
            <StaggerItem key={idx}>
              <div className="p-8 border border-outline-variant/30 rounded-xl bg-surface-container-lowest/60 backdrop-blur-2xl shadow-glass-elevated hover:shadow-[0_20px_40px_rgba(70,72,212,0.06)] transition-all h-full flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute inset-0 border-t border-l border-white/40 pointer-events-none rounded-xl"></div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">{protocol.icon}</span>
                </div>
                <h3 className="font-display text-headline-md text-on-surface mb-3">{protocol.title}</h3>
                <p className="font-body text-body-md text-on-surface-variant">{protocol.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 3. DevSecOps & Observability Dashboard */}
      <section className="bg-surface-container-low py-stack-xl border-y border-outline-variant/20 relative">
        <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
          <SectionHeader 
            overline="DevSecOps"
            title="Infrastructure Transparency"
            description="Continuous integration must mean continuous security. Our pipelines run automated vulnerability scans and immutable audit logging before every deployment."
            alignment="center"
          />

          <FadeInUp delay={0.2} className="mt-stack-lg">
            {/* Mock Observability Dashboard */}
            <div className="max-w-4xl mx-auto rounded-2xl bg-inverse-surface border border-outline/30 overflow-hidden shadow-2xl relative">
              {/* Dashboard Header */}
              <div className="h-12 bg-on-surface border-b border-outline/20 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-error"></div>
                <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                <div className="w-3 h-3 rounded-full bg-[#00c853]"></div>
                <div className="ml-4 font-mono text-[10px] text-outline-variant uppercase tracking-widest">Global Security Telemetry</div>
              </div>
              
              {/* Dashboard Body */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Uptime Stat */}
                 <div className="bg-on-surface/50 rounded-lg p-6 border border-outline/20">
                   <div className="font-label text-label-caps text-outline-variant mb-2">System Uptime (30d)</div>
                   <div className="font-display text-headline-lg text-[#00c853]">99.999%</div>
                 </div>

                 {/* Active Threats Blocked */}
                 <div className="bg-on-surface/50 rounded-lg p-6 border border-outline/20">
                   <div className="font-label text-label-caps text-outline-variant mb-2">Threats Mitigated</div>
                   <div className="font-display text-headline-lg text-primary">14.2k</div>
                 </div>

                 {/* Encryption Status */}
                 <div className="bg-on-surface/50 rounded-lg p-6 border border-outline/20 flex flex-col justify-center items-center">
                   <span className="material-symbols-outlined text-[#00c853] text-[40px] mb-2">lock</span>
                   <div className="font-mono text-xs text-[#00c853]">AES-256 SECURED</div>
                 </div>
                 
                 {/* Live Log Stream */}
                 <div className="md:col-span-3 bg-on-surface/80 rounded-lg p-4 border border-outline/20 font-mono text-[10px] text-outline-variant h-32 overflow-hidden flex flex-col justify-end space-y-1">
                    <div><span className="text-primary">[INFO]</span> 2026-10-14 14:02:11 - Automated Dependency Scan Passed</div>
                    <div><span className="text-primary">[INFO]</span> 2026-10-14 14:02:15 - Image Signed via Docker Notary</div>
                    <div><span className="text-tertiary">[WARN]</span> 2026-10-14 14:03:00 - Rate Limit Triggered: Gateway Edge EU-Central</div>
                    <div><span className="text-[#00c853]">[PASS]</span> 2026-10-14 14:03:02 - Zero-Trust Auth Validated. Pipeline green.</div>
                    <div className="animate-pulse"><span className="text-primary">[INFO]</span> Waiting for next event...</div>
                 </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* 4. Final CTA */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl text-center">
        <div className="py-20 px-8 border border-outline-variant/30 rounded-2xl bg-surface-container-lowest/60 backdrop-blur-2xl shadow-glass-elevated relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
          <h2 className="font-display text-display-lg text-on-surface mb-6 relative z-10">Secure your digital perimeter.</h2>
          <p className="font-body text-body-lg text-on-surface-variant max-w-xl mx-auto mb-8 relative z-10">Ensure your infrastructure meets elite compliance and reliability standards.</p>
          <Button href="/contact" size="lg" className="relative z-10 shadow-lg">
            Schedule a Security Audit
          </Button>
        </div>
      </section>
    </div>
  );
}
