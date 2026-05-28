"use client";

import { StaggerContainer, StaggerItem, FadeInUp } from "@/components/motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { cn } from "@/lib/utils";

const STATS = [
  { value: 450, unit: "+", label: "Enterprise Systems Delivered", accent: "primary", prefix: "" },
  { value: 99.99, unit: "%", label: "Guaranteed SLA Uptime", accent: "secondary", prefix: "", isFloat: true },
  { value: 400, unit: "%", label: "Automation Efficiency Gain", accent: "tertiary", prefix: "+" },
  { value: 2.4, unit: "B", label: "Client Revenue Enabled", accent: "primary", prefix: "$", isFloat: true },
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
