"use client";

import React from "react";
import { GlassCard, Button } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

const STARTING_PRICES = [
  {
    title: "Enterprise Web Platforms",
    price: "Custom Scope",
    description: "Scalable, high-performance web applications built for complexity and volume.",
    icon: "web",
    features: ["Custom React/Next.js Frontend", "Secure Node.js/Go Backend", "Database Architecture", "Basic 3rd-Party Integrations"]
  },
  {
    title: "Native Mobile Applications",
    price: "Complexity Based",
    description: "Premium iOS and Android experiences engineered for zero latency.",
    icon: "smartphone",
    features: ["React Native / Swift / Kotlin", "App Store Deployment", "Offline Capabilities", "Complex Animations"]
  },
  {
    title: "AI & ML Integrations",
    price: "Data Dependent",
    description: "Intelligent systems tailored to automate your specific operational workflows.",
    icon: "psychology",
    features: ["Custom LLM Workflows", "Predictive Analytics", "Data Pipeline Architecture", "API Orchestration"]
  },
  {
    title: "Complete Digital Transformation",
    price: "Bespoke Estimate",
    description: "End-to-end infrastructure overhaul for established organizations scaling up.",
    icon: "domain",
    features: ["Legacy Code Strangling", "Microservices Migration", "Enterprise Cloud Architecture", "Dedicated Engineering Team"]
  }
];

const COST_DRIVERS = [
  { title: "Technical Complexity", description: "The architectural demands, algorithm complexity, and required system throughput.", icon: "architecture" },
  { title: "Integration Density", description: "The number of third-party APIs, legacy systems, and external databases we must sync with.", icon: "cable" },
  { title: "Delivery Timeline", description: "Accelerated timelines require parallel engineering tracks and intensive resource allocation.", icon: "speed" }
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* 1. Pricing Hero */}
      <section className="pt-40 pb-stack-lg px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto text-center relative z-10 w-full">
        <FadeInUp>
          <span className="font-label text-label-caps text-secondary tracking-widest uppercase mb-4 block">
            Investment Structure
          </span>
          <h1 className="font-display text-display-xl text-on-surface mb-stack-md max-w-4xl mx-auto tracking-tight">
            Priced by <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">Project</span>.<br/>Valued by Impact.
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg leading-relaxed">
            We don't sell generic subscription tiers. We engineer bespoke software solutions. Your investment is calculated precisely based on the architectural scope, complexity, and velocity of your specific project.
          </p>
        </FadeInUp>
      </section>

      {/* 2. Baseline Estimates Grid */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto mb-stack-xl relative z-10 w-full">
        <h2 className="font-display text-[32px] text-center text-on-surface mb-12 font-bold tracking-tight">Baseline Engineering Estimates</h2>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {STARTING_PRICES.map((item, idx) => (
            <StaggerItem key={idx} className="relative z-10">
              <div className="h-full p-8 flex flex-col rounded-2xl transition-all duration-300 bg-surface-container-lowest/60 backdrop-blur-xl border border-outline-variant/30 hover:shadow-[0_30px_60px_-12px_rgba(0,23,75,0.1)] hover:border-primary/20 hover:-translate-y-2 group">
                
                <div className="w-12 h-12 rounded-xl bg-surface-variant flex items-center justify-center text-on-surface mb-6 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>

                <div className="mb-6 pb-6 border-b border-outline-variant/30">
                  <h3 className="font-display text-[22px] mb-2 font-semibold text-on-surface">{item.title}</h3>
                  <p className="font-body text-sm text-on-surface-variant h-12">{item.description}</p>
                  
                  <div className="mt-6">
                    <span className="font-label text-[11px] text-outline-variant uppercase tracking-widest block mb-1">Investment Level</span>
                    <span className="font-display text-[32px] tracking-tighter text-primary font-semibold leading-tight">{item.price}</span>
                  </div>
                </div>

                <ul className="flex-grow space-y-3 mb-8">
                  {item.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[18px] mt-0.5 text-primary">check</span>
                      <span className="font-body text-sm text-on-surface-variant">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4">
                   <Button 
                     href="/contact" 
                     variant="outline"
                     className="w-full justify-center group-hover:border-primary group-hover:text-primary"
                   >
                     Scope Your Project
                   </Button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <p className="text-center font-body text-sm text-on-surface-variant mt-8 max-w-2xl mx-auto">
          * Final investments are determined after a rigorous technical discovery and architectural mapping phase based exclusively on your specific project requirements.
        </p>
      </section>

      {/* 3. Cost Drivers */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto mb-stack-xl relative z-10 w-full pt-12">
        <div className="bg-surface-container-lowest/40 backdrop-blur-md border border-outline-variant/20 rounded-3xl p-10 md:p-16 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[80px] pointer-events-none -z-10"></div>
           
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
             <div className="lg:col-span-5">
               <h2 className="font-display text-[40px] text-on-surface mb-6 font-bold tracking-tight">How We Calculate Your Investment</h2>
               <p className="font-body text-body-lg text-on-surface-variant mb-8">
                 We reject arbitrary pricing. Every quote we provide is backed by a meticulous architectural breakdown of the hours, elite talent, and infrastructure required to execute your vision flawlessly.
               </p>
               <Button href="/contact" variant="primary">Request a Custom Quote</Button>
             </div>
             
             <div className="lg:col-span-7 grid gap-6">
               {COST_DRIVERS.map((driver, idx) => (
                 <FadeInUp key={idx} delay={idx * 0.1}>
                   <div className="flex gap-4 p-6 rounded-2xl bg-surface/50 border border-outline-variant/30 hover:border-primary/30 transition-colors">
                     <div className="w-12 h-12 shrink-0 rounded-full bg-surface-container flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">{driver.icon}</span>
                     </div>
                     <div>
                       <h3 className="font-display text-xl text-on-surface font-semibold mb-2">{driver.title}</h3>
                       <p className="font-body text-sm text-on-surface-variant">{driver.description}</p>
                     </div>
                   </div>
                 </FadeInUp>
               ))}
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
