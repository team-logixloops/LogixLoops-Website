"use client";

import React from "react";
import { SectionHeader, GlassCard, Button } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { ELITE_TIERS, TECHNICAL_SPECS, DEPLOYMENT_TIMELINES } from "@/data/pricing";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* 1. Pricing Hero */}
      <section className="pt-40 pb-stack-lg px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto text-center relative z-10 w-full">
        <FadeInUp>
          <h1 className="font-display text-display-xl text-on-surface mb-stack-md max-w-4xl mx-auto tracking-tight">
            Engineered for <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">Scale</span>.<br/>Priced for Clarity.
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg leading-relaxed">
            Select the atmospheric engineering tier that matches your deployment velocity. Transparent architectural investments with zero hidden friction.
          </p>
        </FadeInUp>
      </section>

      {/* 2. Elite Pricing Tiers Bento Grid */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto mb-stack-xl relative z-10 w-full">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {ELITE_TIERS.map((tier, idx) => (
            <StaggerItem key={tier.id} className={tier.highlighted ? "lg:-mt-4 lg:mb-4 relative z-10" : "relative z-0"}>
              <div 
                className={`h-full p-8 flex flex-col rounded-2xl transition-all duration-300 relative ${
                  tier.highlighted 
                    ? "bg-surface-container-lowest border-0 shadow-[0_24px_48px_-12px_rgba(0,74,198,0.15)] ring-1 ring-primary/30" 
                    : tier.isCustom
                      ? "bg-on-surface/5 border border-on-surface/10 hover:shadow-[0_30px_60px_-12px_rgba(0,23,75,0.1)] hover:-translate-y-2"
                      : "bg-surface-container-lowest/60 backdrop-blur-xl border border-outline-variant/30 hover:shadow-[0_30px_60px_-12px_rgba(0,23,75,0.1)] hover:border-primary/20 hover:-translate-y-2"
                }`}
              >
                {/* Highlight Elements */}
                {tier.highlighted && (
                  <>
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary rounded-t-2xl"></div>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1.5 rounded-full font-label text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-primary/30 whitespace-nowrap">
                      Recommended
                    </div>
                  </>
                )}

                <div className={`mb-6 pb-6 border-b ${tier.highlighted ? "border-primary/20 mt-2" : "border-outline-variant/30"}`}>
                  <h3 className={`font-display text-[28px] mb-2 font-semibold ${tier.highlighted ? "text-primary" : "text-on-surface"}`}>{tier.title}</h3>
                  <p className="font-body text-sm text-on-surface-variant h-10">{tier.description}</p>
                  
                  <div className={`mt-6 flex items-baseline gap-1 ${tier.isCustom ? 'h-[58px] items-center' : ''}`}>
                    {tier.isCustom ? (
                       <span className="font-display text-[32px] text-on-surface font-semibold">{tier.price}</span>
                    ) : (
                      <>
                        <span className={`font-display text-[48px] tracking-tighter ${tier.highlighted ? "text-primary" : "text-on-surface"}`}>{tier.price}</span>
                        <span className="font-body text-sm text-on-surface-variant font-medium">{tier.period}</span>
                      </>
                    )}
                  </div>
                </div>

                <ul className="flex-grow space-y-4 mb-8">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <span className={`material-symbols-outlined text-[20px] mt-0.5 ${tier.highlighted ? "text-primary filled" : tier.isCustom ? "text-on-surface" : "text-outline-variant"}`}>check_circle</span>
                      <span className={`font-body text-sm ${tier.highlighted ? "text-on-surface font-medium" : "text-on-surface-variant"}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4">
                   <Button 
                     href="/contact" 
                     variant={tier.highlighted ? "primary" : tier.isCustom ? "solid" : "outline"}
                     className={`w-full justify-center ${tier.highlighted ? "shadow-xl shadow-primary/20" : tier.isCustom ? "bg-on-surface text-surface-container-lowest hover:bg-on-surface/90 shadow-lg" : ""}`}
                   >
                     {tier.cta}
                   </Button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 3. Feature Comparison Matrix */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto mb-stack-xl relative z-10 w-full">
        <h2 className="font-display text-[40px] text-center text-on-surface mb-12 font-bold tracking-tight">Technical Specifications</h2>
        
        <FadeInUp>
          <div className="overflow-x-auto rounded-2xl bg-surface-container-lowest/60 backdrop-blur-xl border border-outline-variant/30 shadow-[0_10px_30px_rgba(0,0,0,0.02)] p-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-5 font-label text-[12px] text-on-surface-variant uppercase tracking-widest w-[25%] font-semibold border-b border-outline-variant/20">Capabilities</th>
                  <th className="p-5 font-display text-lg text-on-surface text-center w-[18.75%] border-b border-outline-variant/20">Starter</th>
                  <th className="p-5 font-display text-lg text-primary text-center w-[18.75%] bg-primary/[0.02] rounded-t-xl border-b border-primary/10">Growth</th>
                  <th className="p-5 font-display text-lg text-on-surface text-center w-[18.75%] border-b border-outline-variant/20">Enterprise</th>
                  <th className="p-5 font-display text-lg text-on-surface text-center w-[18.75%] border-b border-outline-variant/20">Custom</th>
                </tr>
              </thead>
              <tbody>
                {TECHNICAL_SPECS.map((section, idx) => (
                  <React.Fragment key={idx}>
                    {/* Category Header */}
                    <tr>
                      <td colSpan={5} className="pt-8 pb-4">
                        <span className="font-label text-[11px] text-primary bg-primary/5 px-3 py-1.5 uppercase tracking-[0.15em] font-bold rounded-lg inline-block">
                          {section.category}
                        </span>
                      </td>
                    </tr>
                    
                    {/* Spec Rows */}
                    {section.specs.map((spec, sIdx) => {
                      const isLast = sIdx === section.specs.length - 1;
                      return (
                        <tr key={sIdx} className="group hover:bg-surface-container-lowest hover:shadow-sm transition-all duration-200">
                          <td className={`p-5 font-body text-sm text-on-surface font-medium group-hover:scale-[1.01] transition-transform ${isLast ? '' : 'border-b border-outline-variant/10'}`}>
                            {spec.name}
                          </td>
                          <td className={`p-5 font-body text-sm text-on-surface-variant text-center ${isLast ? '' : 'border-b border-outline-variant/10'}`}>
                            {spec.starter === 'check' ? <span className="material-symbols-outlined text-outline-variant text-[20px]">check</span> : spec.starter}
                          </td>
                          <td className={`p-5 font-body text-sm text-primary font-medium text-center bg-primary/[0.02] ${isLast ? 'rounded-b-xl' : 'border-b border-primary/10'}`}>
                            {spec.growth === 'check' ? <span className="material-symbols-outlined text-primary text-[20px] font-bold">check</span> : spec.growth}
                          </td>
                          <td className={`p-5 font-body text-sm text-on-surface-variant text-center ${isLast ? '' : 'border-b border-outline-variant/10'}`}>
                            {spec.enterprise === 'check' ? <span className="material-symbols-outlined text-on-surface text-[20px]">check</span> : spec.enterprise}
                          </td>
                          <td className={`p-5 font-body text-sm text-on-surface-variant text-center ${isLast ? '' : 'border-b border-outline-variant/10'}`}>
                            {spec.custom === 'check' ? <span className="material-symbols-outlined text-on-surface text-[20px]">check</span> : spec.custom}
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </FadeInUp>
      </section>

      {/* 4. Implementation Roadmap */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto mb-stack-xl relative z-10 w-full">
        <h2 className="font-display text-[40px] text-center text-on-surface mb-12 font-bold tracking-tight">Implementation Roadmap</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[45px] left-10 right-10 h-[2px] bg-outline-variant/20 z-0"></div>
          
          {DEPLOYMENT_TIMELINES.map((phase, idx) => (
            <FadeInUp key={idx} delay={idx * 0.1}>
              <div className={`p-8 rounded-2xl border transition-transform duration-300 hover:shadow-lg relative z-10 h-full ${
                phase.tier === 'Growth' 
                  ? 'bg-gradient-to-b from-primary/5 to-surface-container-lowest border-primary/20 shadow-[0_10px_30px_rgba(0,74,198,0.05)] transform md:-translate-y-2' 
                  : 'bg-surface-container-lowest/80 backdrop-blur-md border-outline-variant/30 hover:-translate-y-1'
              }`}>
                {/* Timeline node dot */}
                <div className={`w-4 h-4 rounded-full border-4 border-white absolute -top-2 md:-top-[25px] left-8 shadow-sm ${
                  phase.tier === 'Growth' ? 'bg-primary shadow-primary/40 w-5 h-5 -top-2.5 md:-top-[27px]' : 'bg-outline-variant'
                }`}></div>
                
                <h4 className={`font-display text-[22px] mb-1 font-semibold ${phase.tier === 'Growth' ? 'text-primary' : 'text-on-surface'}`}>
                  {phase.tier}
                </h4>
                <p className={`font-label text-[12px] uppercase tracking-wider mb-6 font-semibold ${phase.tier === 'Growth' ? 'text-primary font-bold' : 'text-outline-variant'}`}>
                  {phase.timeline}
                </p>
                
                <ul className="space-y-3">
                  {phase.steps.map((step, sIdx) => (
                    <li key={sIdx} className={`flex items-center gap-3 text-[14px] ${phase.tier === 'Growth' ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}>
                      <span className={`material-symbols-outlined text-[16px] ${phase.tier === 'Growth' ? 'text-primary' : 'text-outline-variant'}`}>
                        {step.icon}
                      </span>
                      {step.text}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInUp>
          ))}
        </div>
      </section>
    </div>
  );
}
