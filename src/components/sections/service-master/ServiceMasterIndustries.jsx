"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

const DEFAULT_INDUSTRIES = [
  { name: "SaaS & Software", icon: "cloud" },
  { name: "FinTech", icon: "account_balance" },
  { name: "Healthcare", icon: "health_and_safety" },
  { name: "Logistics", icon: "local_shipping" },
  { name: "E-Commerce", icon: "shopping_cart" },
  { name: "AI Startups", icon: "psychology" }
];

export default function ServiceMasterIndustries() {
  return (
    <section className="py-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto border-t border-outline-variant/30">
      <FadeInUp>
        <SectionHeader 
          overline="Sectors"
          title="Industries Served"
          description="We adapt our architectures to meet the rigorous compliance and operational demands of specific verticals."
          centered
        />
      </FadeInUp>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-gutter mt-stack-xl max-w-4xl mx-auto">
        {DEFAULT_INDUSTRIES.map((ind, i) => (
          <StaggerItem key={i}>
            <div className="flex flex-col items-center justify-center p-6 bg-white/50 backdrop-blur-md rounded-2xl border border-outline-variant/30 hover:bg-surface hover:shadow-sm transition-all group">
              <span className="material-symbols-outlined text-3xl text-on-surface-variant mb-3 group-hover:text-primary transition-colors">
                {ind.icon}
              </span>
              <span className="font-label text-label-caps uppercase tracking-widest text-on-surface text-center">
                {ind.name}
              </span>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
