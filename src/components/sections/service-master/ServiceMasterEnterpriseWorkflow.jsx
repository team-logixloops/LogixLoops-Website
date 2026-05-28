"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, FadeInLeft, FadeInRight } from "@/components/motion";

export default function ServiceMasterEnterpriseWorkflow({ enterpriseWorkflow }) {
  if (!enterpriseWorkflow || enterpriseWorkflow.length === 0) return null;

  return (
    <section className="py-stack-2xl bg-surface-container-lowest/50 border-y border-outline-variant/30 overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
        
        <FadeInLeft className="space-y-stack-sm pr-0 lg:pr-stack-md">
          <SectionHeader 
            overline="Operational Backbone"
            title="Operational Workflow Infrastructure"
            description="We digitize and automate your most complex business processes, creating a standardized operational rhythm that scales effortlessly."
          />

          <div className="flex flex-col gap-6 mt-8">
            {enterpriseWorkflow.map((workflow, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white/60 backdrop-blur-md border border-outline-variant/30 rounded-xl hover:shadow-md transition-all group">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-surface flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    {i === 0 ? "alt_route" : i === 1 ? "visibility" : "security"}
                  </span>
                </div>
                <div>
                  <h4 className="font-display text-headline-md text-lg mb-1 text-on-surface">{workflow.title}</h4>
                  <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                    {workflow.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeInLeft>

        <FadeInRight className="relative h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-surface/0 to-surface/0 pointer-events-none rounded-full blur-3xl opacity-70" />
          
          {/* Workflow Architecture Visual Mockup */}
          <div className="relative w-full max-w-md bg-surface-container border border-outline-variant/50 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.1)] overflow-hidden z-20 flex flex-col hover:scale-[1.02] transition-transform duration-700">
            {/* Header */}
            <div className="h-16 border-b border-outline-variant/30 bg-white/50 backdrop-blur-md flex items-center px-6 justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">mediation</span>
                <span className="font-headline-md text-sm text-on-surface">Process Orchestrator</span>
              </div>
              <div className="bg-green-500/10 text-green-700 px-2 py-1 rounded text-[10px] font-label uppercase tracking-widest flex items-center gap-1 border border-green-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Active
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 p-6 space-y-4 bg-white/30 relative">
              
              {/* Trigger Node */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary z-10">
                  <span className="material-symbols-outlined text-sm">input</span>
                </div>
                <div className="flex-1 bg-white border border-outline-variant/30 p-3 rounded-lg shadow-sm">
                  <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Trigger</p>
                  <p className="text-sm font-headline-md text-on-surface">Order Received (ERP)</p>
                </div>
              </div>

              {/* Connecting Line */}
              <div className="absolute left-[43px] top-[72px] bottom-[72px] w-0.5 bg-outline-variant/50 z-0">
                 <div className="w-full h-1/3 bg-primary/50 animate-[slideDown_3s_linear_infinite]" />
              </div>

              {/* Logic Node */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary z-10">
                  <span className="material-symbols-outlined text-sm">call_split</span>
                </div>
                <div className="flex-1 bg-white border border-outline-variant/30 p-3 rounded-lg shadow-sm">
                  <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Logic Gate</p>
                  <p className="text-sm font-headline-md text-on-surface">Validate Inventory</p>
                </div>
              </div>

              {/* Action Nodes (Parallel) */}
              <div className="pl-14 space-y-3 relative z-10">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-tertiary/10 border border-tertiary/20 flex items-center justify-center text-tertiary shrink-0">
                    <span className="material-symbols-outlined text-sm">local_shipping</span>
                  </div>
                  <div className="flex-1 bg-white border border-outline-variant/30 p-2.5 rounded-lg shadow-sm flex justify-between items-center">
                    <span className="text-xs text-on-surface font-medium">Logistics API</span>
                    <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-primary-fixed-dim/20 border border-primary-fixed-dim/30 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-sm">payments</span>
                  </div>
                  <div className="flex-1 bg-white border border-outline-variant/30 p-2.5 rounded-lg shadow-sm flex justify-between items-center">
                    <span className="text-xs text-on-surface font-medium">Finance Ledger</span>
                    <span className="material-symbols-outlined text-outline-variant text-sm animate-spin">sync</span>
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
