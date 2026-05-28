"use client";

import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

const ACHIEVEMENTS = [
  { value: "99.9%", label: "System Uptime" },
  { value: "40+", label: "Enterprise Systems" },
  { value: "$2B", label: "Revenue Enabled" },
  { value: "24/7", label: "Global Monitoring" }
];

export default function AboutVision() {
  return (
    <section className="py-stack-lg border-y border-outline-variant/30 relative bg-surface-container-lowest/50">
      <div className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-gutter text-center">
          {ACHIEVEMENTS.map((item, i) => (
            <StaggerItem key={i}>
              <div className="space-y-2 group">
                <div className="font-display text-display-lg text-primary group-hover:scale-105 transition-transform duration-300">
                  {item.value}
                </div>
                <div className="font-label text-label-caps text-on-surface-variant uppercase tracking-widest">
                  {item.label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
