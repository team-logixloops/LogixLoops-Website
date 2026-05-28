"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, FadeInLeft, FadeInRight } from "@/components/motion";

export default function ServiceMasterUX({ uxExperience }) {
  if (!uxExperience || uxExperience.length === 0) return null;

  return (
    <section className="py-stack-2xl bg-surface-container-lowest/50 border-y border-outline-variant/30 overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
        
        <FadeInLeft className="order-2 lg:order-1 relative h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-tertiary/10 to-primary/5 rounded-3xl z-0 pointer-events-none" />
          
          {/* Abstract Mobile UI Flows */}
          <div className="relative w-64 h-[500px] bg-surface-container border-4 border-outline-variant/50 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] overflow-hidden z-20 -rotate-6 hover:rotate-0 transition-transform duration-700">
            {/* Notch */}
            <div className="absolute top-0 w-full h-8 flex justify-center items-end pb-1">
              <div className="w-1/3 h-4 bg-on-surface-variant/20 rounded-b-xl" />
            </div>
            
            {/* App Content */}
            <div className="p-6 pt-16 space-y-4">
              <div className="w-full h-32 bg-primary/20 rounded-2xl animate-pulse" />
              <div className="w-3/4 h-6 bg-surface-variant rounded-lg" />
              <div className="w-1/2 h-4 bg-surface-variant rounded-lg" />
              
              <div className="space-y-3 pt-6">
                <div className="w-full h-16 bg-surface rounded-xl shadow-sm border border-outline-variant/30 flex items-center px-4 gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/20" />
                  <div className="w-1/2 h-4 bg-surface-variant rounded" />
                </div>
                <div className="w-full h-16 bg-surface rounded-xl shadow-sm border border-outline-variant/30 flex items-center px-4 gap-3">
                  <div className="w-8 h-8 rounded-full bg-tertiary/20" />
                  <div className="w-1/2 h-4 bg-surface-variant rounded" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Background blurred device */}
          <div className="absolute right-0 top-10 w-64 h-[500px] bg-surface-container/50 backdrop-blur-md border border-outline-variant/30 rounded-[3rem] shadow-lg overflow-hidden z-10 rotate-6 translate-x-12 opacity-50 blur-sm">
            <div className="p-6 pt-16 space-y-4">
              <div className="w-full h-48 bg-secondary/20 rounded-2xl" />
              <div className="w-full h-12 bg-surface-variant rounded-xl" />
            </div>
          </div>
        </FadeInLeft>

        <FadeInRight className="order-1 lg:order-2 space-y-stack-sm pr-0 lg:pr-stack-md">
          <SectionHeader 
            overline="Experience Design"
            title="UX & Product Experience"
            description="We engineer intuitive, conversion-focused mobile interfaces that guide users effortlessly from onboarding to daily engagement."
          />

          <div className="flex flex-col gap-6 mt-8">
            {uxExperience.map((ux, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white/60 backdrop-blur-md border border-outline-variant/30 rounded-xl hover:shadow-md transition-all group">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-surface flex items-center justify-center text-on-surface-variant group-hover:text-tertiary group-hover:bg-tertiary/10 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    {i === 0 ? "conversion_path" : i === 1 ? "accessibility_new" : "animation"}
                  </span>
                </div>
                <div>
                  <h4 className="font-display text-headline-md text-lg mb-1 text-on-surface">{ux.title}</h4>
                  <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                    {ux.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeInRight>

      </div>
    </section>
  );
}
