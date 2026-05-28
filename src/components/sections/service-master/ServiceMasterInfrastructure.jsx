"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, FadeInLeft, FadeInRight } from "@/components/motion";

export default function ServiceMasterInfrastructure({ infrastructure }) {
  if (!infrastructure || infrastructure.length === 0) return null;

  return (
    <section className="py-stack-2xl bg-surface-container-lowest/50 border-y border-outline-variant/30 overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
        
        <FadeInLeft className="space-y-stack-sm pr-0 lg:pr-stack-md">
          <SectionHeader 
            overline="Ecosystem Support"
            title="Subscription & Product Infrastructure"
            description="We build the critical operational systems that power recurring revenue, usage metering, and lifecycle management."
          />

          <div className="flex flex-col gap-6 mt-8">
            {infrastructure.map((infra, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white/60 backdrop-blur-md border border-outline-variant/30 rounded-xl hover:shadow-md transition-all group">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-surface flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    {i === 0 ? "payments" : i === 1 ? "insights" : "person_add"}
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
          
          {/* Abstract Dashboard/Billing Mockup */}
          <div className="relative w-full max-w-md h-[500px] bg-surface-container border border-outline-variant/50 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.1)] overflow-hidden z-20 flex flex-col hover:scale-[1.02] transition-transform duration-700">
            {/* Header */}
            <div className="h-16 border-b border-outline-variant/30 bg-surface/50 backdrop-blur-md flex items-center px-6 justify-between">
              <div className="w-24 h-4 bg-on-surface-variant/20 rounded-full" />
              <div className="w-8 h-8 rounded-full bg-primary/20" />
            </div>
            
            {/* Content */}
            <div className="flex-1 p-6 space-y-6">
              {/* MRR Metric */}
              <div className="w-full bg-white/80 rounded-xl border border-outline-variant/30 p-5 shadow-sm">
                <div className="w-20 h-3 bg-on-surface-variant/20 rounded-full mb-3" />
                <div className="w-32 h-8 bg-primary/20 rounded-lg mb-4" />
                <div className="w-full h-12 bg-surface-variant/50 rounded flex items-end gap-1 px-2 pt-2">
                  <div className="w-1/6 h-[40%] bg-primary/30 rounded-t" />
                  <div className="w-1/6 h-[60%] bg-primary/40 rounded-t" />
                  <div className="w-1/6 h-[50%] bg-primary/30 rounded-t" />
                  <div className="w-1/6 h-[80%] bg-primary/60 rounded-t" />
                  <div className="w-1/6 h-[70%] bg-primary/50 rounded-t" />
                  <div className="w-1/6 h-[100%] bg-primary/80 rounded-t" />
                </div>
              </div>

              {/* Recent Subscriptions */}
              <div className="w-full bg-white/80 rounded-xl border border-outline-variant/30 p-5 shadow-sm space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
                  <div className="w-1/2 h-3 bg-on-surface-variant/30 rounded-full" />
                  <div className="w-1/4 h-3 bg-secondary/30 rounded-full" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-1/2 h-3 bg-on-surface-variant/20 rounded-full" />
                  <div className="w-1/4 h-3 bg-primary/20 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          
        </FadeInRight>

      </div>
    </section>
  );
}
