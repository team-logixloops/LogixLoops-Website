"use client";

import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const REMAINING_SERVICES = [
  {
    id: "web-development",
    title: "Web Development",
    description: "High-performance, immersive web applications built on modern JavaScript frameworks.",
    icon: "code",
    color: "primary",
    tags: ["React", "Next.js"]
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    description: "Native and cross-platform mobile experiences that feel seamlessly integrated with the device hardware.",
    icon: "smartphone",
    color: "secondary",
    tags: ["Swift", "Flutter"]
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Resilient infrastructure provisioning and continuous integration pipelines for zero-downtime deployments.",
    icon: "cloud",
    color: "primary",
    tags: ["AWS", "Docker"]
  },
  {
    id: "saas-platforms",
    title: "SaaS Platforms",
    description: "Multi-tenant architecture design for scalable software-as-a-service products.",
    icon: "layers",
    color: "secondary",
    tags: ["Multi-tenant", "Stripe API"]
  },
  {
    id: "automation-systems",
    title: "Automation Systems",
    description: "Streamlining complex business logic through custom RPA and workflow automation orchestration.",
    icon: "settings_motion_mode",
    color: "primary",
    tags: ["RPA", "Python"]
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "Atmospheric engineering of digital interfaces, focusing on optical refraction and refined minimalism.",
    icon: "design_services",
    color: "secondary",
    tags: ["Figma", "Design Systems"]
  }
];

export default function ServicesCoreGrid() {
  return (
    <section className="mt-stack-xl pt-stack-xl border-t border-outline-variant/30">
      <FadeInUp>
        <h3 className="font-display text-headline-md text-on-surface mb-stack-lg text-center">
          Comprehensive Digital Ecosystem
        </h3>
      </FadeInUp>
      
      <StaggerContainer className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-gutter">
        {REMAINING_SERVICES.map((service) => (
          <StaggerItem key={service.id}>
            <div className={cn(
              "p-8 rounded-xl border-t border-l border-white/60 border-b border-r border-outline-variant/40 bg-surface/60 backdrop-blur-[24px] shadow-sm transition-colors group relative overflow-hidden h-full flex flex-col",
              service.color === "primary" ? "hover:border-primary/30" : "hover:border-secondary/30"
            )}>
              <div className={cn(
                "absolute -right-10 -top-10 w-32 h-32 rounded-full blur-2xl transition-all",
                service.color === "primary" ? "bg-primary/5 group-hover:bg-primary/10" : "bg-secondary/5 group-hover:bg-secondary/10"
              )} />
              
              <span className={cn(
                "material-symbols-outlined text-3xl mb-4 block",
                service.color === "primary" ? "text-primary" : "text-secondary"
              )} style={{ fontVariationSettings: "'FILL' 1" }}>
                {service.icon}
              </span>
              
              <h4 className="font-display text-headline-lg-mobile text-on-surface mb-2">{service.title}</h4>
              <p className="font-body text-body-md text-on-surface-variant mb-6 flex-1">{service.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {service.tags.map(tag => (
                  <span key={tag} className="font-label text-label-caps text-outline border border-outline-variant rounded px-2 py-1 uppercase">
                    {tag}
                  </span>
                ))}
              </div>
              
              <Link href={`/services/${service.id}`} className={cn(
                "font-body text-body-md flex items-center gap-1 transition-colors mt-auto",
                service.color === "primary" ? "text-primary group-hover:text-secondary" : "text-primary group-hover:text-secondary"
              )}>
                Learn More <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
