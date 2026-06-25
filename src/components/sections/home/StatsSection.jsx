"use client";

import { StaggerContainer, StaggerItem, FadeInUp } from "@/components/motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { cn } from "@/lib/utils";

const STATS = [
  { value: 100, unit: "%", label: "Client Delivery Success", accent: "primary", prefix: "" },
  { value: 0, unit: "", label: "Technical Debt Tolerated", accent: "secondary", prefix: "" },
  { value: 60, unit: "fps", label: "Guaranteed UI Performance", accent: "tertiary", prefix: "" },
  { value: 99.9, unit: "%", label: "SLA Uptime Standards", accent: "primary", prefix: "", isFloat: true },
];

export default function StatsSection() {
  return (
    <section className="container-site py-stack-lg border-y border-outline-variant/20 relative bg-surface-container-lowest/40 backdrop-blur-md">
      <FadeInUp>
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-2 md:gap-x-8 lg:gap-gutter lg:divide-x divide-outline-variant/20">
          {STATS.map((stat, i) => (
            <StaggerItem key={i} className="flex flex-col items-center text-center px-4 pt-6 sm:pt-0 first:pt-0">
              <div className="font-display text-[32px] sm:text-[48px] md:text-[56px] text-on-surface leading-none font-bold mb-2 flex items-baseline">
                {stat.prefix && <span className="text-headline-md font-heading text-primary mr-1">{stat.prefix}</span>}
                
                {/* The AnimatedCounter currently only does integers well, so for floats we just display them or use a custom implementation */}
                {stat.isFloat ? (
                  <span>{stat.value}</span>
                ) : (
                  <AnimatedCounter value={stat.value} />
                )}
                
                {stat.unit && <span className="text-headline-md font-heading text-primary ml-1">{stat.unit}</span>}
              </div>
              <div className={cn(
                "font-body text-xs sm:text-sm md:text-body-md font-medium text-on-surface-variant relative inline-block",
                "after:content-[''] after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-1 after:rounded-full",
                stat.accent === "primary" ? "after:bg-primary" :
                stat.accent === "secondary" ? "after:bg-secondary" : "after:bg-tertiary"
              )}>
                {stat.label}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </FadeInUp>
    </section>
  );
}
