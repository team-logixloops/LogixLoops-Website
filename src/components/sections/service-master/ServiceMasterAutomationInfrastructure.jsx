"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, FadeInLeft, FadeInRight } from "@/components/motion";

export default function ServiceMasterAutomationInfrastructure({ automationInfrastructure }) {
  if (!automationInfrastructure || automationInfrastructure.length === 0) return null;

  return (
    <section className="py-stack-2xl bg-surface-container-lowest/50 border-y border-outline-variant/30 overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
        
        <FadeInLeft className="space-y-stack-sm pr-0 lg:pr-stack-md">
          <SectionHeader 
            overline="Event-Driven Resilience"
            title="AI-Powered Automation Infrastructure"
            description="We build event-driven automation architectures designed to handle millions of transactions with perfect observability and zero dropped payloads."
          />

          <div className="flex flex-col gap-6 mt-8">
            {automationInfrastructure.map((infra, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white/60 backdrop-blur-md border border-outline-variant/30 rounded-xl hover:shadow-md transition-all group">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-surface flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    {i === 0 ? "dns" : i === 1 ? "history" : "troubleshoot"}
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
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-surface/0 to-surface/0 pointer-events-none rounded-full blur-3xl opacity-70" />
          
          {/* Automation Infrastructure Diagram Mockup */}
          <div className="relative w-full max-w-md bg-surface-container border border-outline-variant/50 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.1)] overflow-hidden z-20 flex flex-col hover:scale-[1.02] transition-transform duration-700">
            {/* Header */}
            <div className="h-16 border-b border-outline-variant/30 bg-surface/50 backdrop-blur-md flex items-center px-6 justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <div className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Worker Online</div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">terminal</span>
            </div>
            
            {/* Content */}
            <div className="flex-1 p-6 space-y-4">
              {/* Event Bus Node */}
              <div className="w-full bg-white/80 rounded-xl border border-outline-variant/30 p-4 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">hub</span>
                </div>
                <div>
                  <div className="font-label text-xs uppercase tracking-wider text-on-surface-variant mb-1">Event Bus</div>
                  <div className="w-24 h-2 bg-on-surface-variant/10 rounded-full" />
                </div>
                <div className="ml-auto w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              </div>

              {/* Connecting Path */}
              <div className="w-full flex justify-center py-2 relative">
                <div className="w-1 h-8 bg-gradient-to-b from-primary/30 to-secondary/30 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-secondary rounded-full" />
              </div>

              {/* Durable Execution Node */}
              <div className="w-full bg-white/80 rounded-xl border border-outline-variant/30 p-4 shadow-sm flex items-center gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <span className="material-symbols-outlined text-[100px]">storage</span>
                </div>
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center z-10">
                  <span className="material-symbols-outlined text-secondary">memory</span>
                </div>
                <div className="z-10">
                  <div className="font-label text-xs uppercase tracking-wider text-on-surface-variant mb-1">State Engine</div>
                  <div className="flex gap-1">
                    <div className="w-4 h-1 bg-green-400 rounded-full" />
                    <div className="w-4 h-1 bg-green-400 rounded-full" />
                    <div className="w-4 h-1 bg-green-400 rounded-full" />
                    <div className="w-4 h-1 bg-surface-variant rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
              
              {/* Connecting Path */}
              <div className="w-full flex justify-center py-2 relative">
                <div className="w-1 h-8 bg-gradient-to-b from-secondary/30 to-tertiary/30 rounded-full" />
              </div>

              {/* External Service Node */}
              <div className="w-full bg-white/80 rounded-xl border border-outline-variant/30 p-4 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary">cloud_sync</span>
                </div>
                <div>
                  <div className="font-label text-xs uppercase tracking-wider text-on-surface-variant mb-1">External API</div>
                  <div className="w-20 h-2 bg-on-surface-variant/10 rounded-full" />
                </div>
                <div className="ml-auto w-4 h-4 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)] animate-pulse" />
              </div>

            </div>
          </div>
          
        </FadeInRight>

      </div>
    </section>
  );
}
