"use client";

import { SectionHeader, GlassCard, Button } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

const PRICING_TIERS = [
  {
    name: "Starter",
    description: "For emerging startups needing solid architectural foundations.",
    price: "$15k - $25k",
    features: ["System Architecture Design", "Core API Development", "Basic Cloud Setup", "Standard Support"],
    popular: false,
    cta: "Start Project"
  },
  {
    name: "Growth",
    description: "Scale your application with advanced features and robust infrastructure.",
    price: "$25k - $50k",
    features: ["Microservices Architecture", "Advanced CI/CD Pipeline", "AI Integration Setup", "Priority Support"],
    popular: true,
    cta: "Scale Now"
  },
  {
    name: "Professional",
    description: "Enterprise-grade engineering for complex digital ecosystems.",
    price: "$50k - $120k",
    features: ["Multi-Cloud Topography", "Predictive ML Workflows", "High-Availability SLA", "Dedicated Tech Lead"],
    popular: false,
    cta: "Consult Engineering"
  },
  {
    name: "Enterprise",
    description: "Dedicated elite teams for long-term strategic transformation.",
    price: "Custom",
    features: ["Full Digital Transformation", "Custom AI/ML Core", "Zero-Downtime Guarantee", "24/7 Enterprise Support"],
    popular: false,
    cta: "Contact Sales"
  }
];

export default function PricingSnapshotSection() {
  return (
    <section className="container-site py-stack-2xl relative">
      <div className="absolute top-[10%] right-[10%] w-[30%] h-[40%] rounded-full bg-tertiary/10 blur-[120px] pointer-events-none" />

      <FadeInUp>
        <SectionHeader 
          overline="Investment"
          title="Transparent Scaling" 
          description="Strategic pricing models aligned with your growth trajectory. No hidden fees, just pure engineering value."
          centered
        />
      </FadeInUp>

      <StaggerContainer className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-stack-xl relative z-10">
        {PRICING_TIERS.map((tier, index) => (
          <StaggerItem key={index} className="flex w-[85vw] sm:w-[60vw] shrink-0 snap-center md:w-auto md:shrink">
            <GlassCard 
              padding="lg" 
              className={cn(
                "w-full flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-2",
                tier.popular ? "border-primary/50 shadow-glass-hover bg-surface-container-low" : "border-outline-variant/30"
              )}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-on-primary font-label text-[10px] tracking-widest uppercase px-3 py-1 rounded-bl-lg font-bold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="font-heading text-headline-md text-on-surface mb-2">{tier.name}</h3>
                <p className="font-body text-body-sm text-on-surface-variant min-h-[40px]">{tier.description}</p>
              </div>
              
              <div className="mb-8 border-b border-outline-variant/20 pb-6">
                <span className="font-display text-display-lg-mobile lg:text-headline-lg font-bold text-on-surface">
                  {tier.price}
                </span>
                {tier.price !== "Custom" && <span className="text-on-surface-variant font-body text-body-md ml-1">avg</span>}
              </div>
              
              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px] shrink-0">check_circle</span>
                    <span className="font-body text-body-sm text-on-surface-variant">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto pt-4">
                <Button 
                  href="/pricing" 
                  variant={tier.popular ? "primary" : "outline"} 
                  className="w-full justify-center"
                >
                  {tier.cta}
                </Button>
              </div>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
