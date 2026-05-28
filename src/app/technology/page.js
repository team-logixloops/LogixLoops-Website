"use client";

import { SectionHeader, GlassCard, Badge, Button } from "@/components/ui";
import { FadeInUp, FadeInLeft, StaggerContainer, StaggerItem } from "@/components/motion";
import { TECH_ECOSYSTEMS } from "@/data/infrastructure";

export default function TechnologyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Technology Hero */}
      <section className="pt-40 pb-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto text-center relative overflow-hidden">
        <div className="absolute inset-0 z-[-1] bg-ambient-glow-blue pointer-events-none opacity-40"></div>
        <FadeInUp>
          <span className="font-label text-label-caps text-secondary tracking-widest uppercase mb-4 block">
            Infrastructure
          </span>
          <h1 className="font-display text-display-xl text-on-surface mb-stack-sm max-w-4xl mx-auto tracking-tight">
            Engineering <span className="text-primary">Ecosystems</span>
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg">
            We don't just build apps; we construct scalable technology platforms. Explore the modern, high-performance stacks powering our enterprise transformations.
          </p>
        </FadeInUp>
      </section>

      {/* 2. Tech Stack Ecosystems Grid */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto pb-stack-xl">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {TECH_ECOSYSTEMS.map((stack, idx) => (
            <StaggerItem key={idx}>
              <GlassCard 
                padding="lg" 
                className="h-full border border-outline-variant/30 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Refractive Ambient Glow */}
                <div className={`absolute -right-20 -bottom-20 w-64 h-64 bg-${stack.color}/10 blur-3xl rounded-full transition-transform duration-700 group-hover:scale-150`}></div>
                
                <h3 className="font-display text-headline-md text-on-surface mb-6 relative z-10">{stack.category}</h3>
                
                <div className="flex flex-wrap gap-3 relative z-10">
                  {stack.technologies.map(tech => (
                    <Badge key={tech} variant="subtle" className="text-sm px-3 py-1.5 shadow-sm border-white/40 bg-surface-container-lowest/80 backdrop-blur-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 3. Integration & Architecture Flowchart Visual */}
      <section className="bg-surface-container-low py-stack-xl border-y border-outline-variant/20">
        <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
          <SectionHeader 
            overline="Seamless Flow"
            title="Integration Systems"
            description="Our architectures are designed as highly decoupled microservices connected by resilient, event-driven integration meshes."
            alignment="center"
          />

          <div className="mt-stack-lg max-w-4xl mx-auto h-[400px] rounded-2xl bg-inverse-surface overflow-hidden relative shadow-glass-elevated flex items-center justify-center p-8">
             {/* Abstract CSS Flowchart */}
             <div className="absolute inset-0 flex items-center justify-between px-8 md:px-24">
                {/* Client Nodes */}
                <div className="flex flex-col gap-6">
                  <div className="w-16 h-16 rounded-xl border border-primary/40 bg-primary/10 flex items-center justify-center shadow-[0_0_15px_rgba(0,74,198,0.2)]">
                    <span className="material-symbols-outlined text-primary">smartphone</span>
                  </div>
                  <div className="w-16 h-16 rounded-xl border border-primary/40 bg-primary/10 flex items-center justify-center shadow-[0_0_15px_rgba(0,74,198,0.2)]">
                    <span className="material-symbols-outlined text-primary">desktop_windows</span>
                  </div>
                </div>

                {/* API Gateway */}
                <div className="w-32 h-64 border-2 border-secondary/50 rounded-xl bg-secondary/10 flex flex-col items-center justify-center gap-4 relative z-10 backdrop-blur-md">
                   <span className="material-symbols-outlined text-secondary text-[40px]">router</span>
                   <span className="font-label text-label-caps text-secondary text-[10px] text-center">API<br/>GATEWAY</span>
                </div>

                {/* Microservices */}
                <div className="flex flex-col gap-4">
                  <div className="w-32 h-16 rounded border border-tertiary/40 bg-tertiary/10 flex items-center justify-center font-label text-label-caps text-tertiary text-[10px]">
                    AUTH SERVICE
                  </div>
                  <div className="w-32 h-16 rounded border border-tertiary/40 bg-tertiary/10 flex items-center justify-center font-label text-label-caps text-tertiary text-[10px]">
                    DATA ENGINE
                  </div>
                  <div className="w-32 h-16 rounded border border-tertiary/40 bg-tertiary/10 flex items-center justify-center font-label text-label-caps text-tertiary text-[10px]">
                    AI INFERENCE
                  </div>
                </div>
             </div>

             {/* Connection Lines */}
             <div className="absolute inset-0 pointer-events-none opacity-20">
               {/* Just visual lines rendered via absolute positioning to tie nodes together */}
               <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
                 <path d="M 120 130 C 250 130, 250 200, 320 200" stroke="#b4c5ff" strokeWidth="2" fill="none" strokeDasharray="4 4"/>
                 <path d="M 120 270 C 250 270, 250 200, 320 200" stroke="#b4c5ff" strokeWidth="2" fill="none" strokeDasharray="4 4"/>
                 
                 <path d="M 450 200 C 550 200, 550 100, 600 100" stroke="#c0c1ff" strokeWidth="2" fill="none"/>
                 <path d="M 450 200 C 550 200, 550 200, 600 200" stroke="#c0c1ff" strokeWidth="2" fill="none"/>
                 <path d="M 450 200 C 550 200, 550 300, 600 300" stroke="#c0c1ff" strokeWidth="2" fill="none"/>
               </svg>
             </div>
          </div>
        </div>
      </section>

      {/* 4. Engineering Standards */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl">
        <FadeInUp>
          <div className="text-center mb-stack-lg">
            <h2 className="font-display text-display-lg text-on-surface mb-4">Engineering Standards</h2>
            <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Our codebases are built for longevity. We strictly adhere to principles that guarantee maintainability across scaling developer teams.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <StaggerItem>
             <div className="border-t-2 border-primary pt-6">
                <h3 className="font-display text-headline-md text-on-surface mb-3">Maintainability</h3>
                <p className="font-body text-body-md text-on-surface-variant">Strict linting, comprehensive type safety (TypeScript/Go), and mandatory test coverage thresholds ensure technical debt is never accumulated.</p>
             </div>
          </StaggerItem>
          <StaggerItem>
             <div className="border-t-2 border-secondary pt-6">
                <h3 className="font-display text-headline-md text-on-surface mb-3">Scalability</h3>
                <p className="font-body text-body-md text-on-surface-variant">Containerized deployments via Docker and orchestration via Kubernetes ensures systems elastically absorb traffic spikes globally.</p>
             </div>
          </StaggerItem>
          <StaggerItem>
             <div className="border-t-2 border-tertiary pt-6">
                <h3 className="font-display text-headline-md text-on-surface mb-3">Observability</h3>
                <p className="font-body text-body-md text-on-surface-variant">Integration of Prometheus, Grafana, and Datadog for granular, real-time distributed tracing and predictive anomaly detection.</p>
             </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* 5. Final CTA */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto pb-stack-xl text-center">
        <div className="py-20 px-8 border border-outline-variant/30 rounded-2xl bg-surface-container-lowest/60 backdrop-blur-2xl shadow-glass-elevated relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
          <h2 className="font-display text-display-lg text-on-surface mb-6 relative z-10">Future-Ready Innovation</h2>
          <p className="font-body text-body-lg text-on-surface-variant max-w-xl mx-auto mb-8 relative z-10">Is your infrastructure prepared for scale? Let our architects evaluate your technical strategy.</p>
          <Button href="/contact" size="lg" className="relative z-10 shadow-lg" icon="arrow_forward" iconPosition="right">
            Audit Your Stack
          </Button>
        </div>
      </section>
    </div>
  );
}
