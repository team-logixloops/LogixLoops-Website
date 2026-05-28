"use client";

import { SectionHeader, GlassCard, IconBox } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const BENTO_SERVICES = [
  {
    id: "enterprise",
    title: "Enterprise Software",
    description: "Mission-critical systems designed for high availability, compliance, and extreme scale across distributed environments.",
    icon: "domain",
    color: "primary",
    href: "/services/enterprise-software",
    colSpan: "lg:col-span-2 lg:row-span-2",
    size: "lg"
  },
  {
    id: "ai",
    title: "AI & ML",
    description: "Predictive intelligence and generative models seamlessly integrated into your core business workflows.",
    icon: "memory",
    color: "secondary",
    href: "/services/ai-ml-solutions",
    colSpan: "lg:col-span-2 lg:row-span-1",
    size: "md"
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    description: "Resilient infrastructure and fluid CI/CD.",
    icon: "cloud_sync",
    color: "tertiary",
    href: "/services/cloud-devops",
    colSpan: "lg:col-span-1 lg:row-span-1",
    size: "sm"
  },
  {
    id: "saas",
    title: "SaaS Platforms",
    description: "End-to-end multi-tenant architectures.",
    icon: "auto_awesome",
    color: "primary",
    href: "/services/saas-platforms",
    colSpan: "lg:col-span-1 lg:row-span-1",
    size: "sm"
  },
  {
    id: "automation",
    title: "Automation Systems",
    description: "RPA and workflow orchestration to eliminate operational bottlenecks and reduce human error.",
    icon: "smart_toy",
    color: "secondary",
    href: "/services/automation-systems",
    colSpan: "lg:col-span-2 lg:row-span-1",
    size: "md"
  },
  {
    id: "web",
    title: "Web Development",
    description: "High-performance web apps.",
    icon: "devices",
    color: "primary",
    href: "/services/web-development",
    colSpan: "lg:col-span-1 lg:row-span-1",
    size: "sm"
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    description: "Native & cross-platform luxury UX.",
    icon: "smartphone",
    color: "tertiary",
    href: "/services/mobile-apps",
    colSpan: "lg:col-span-1 lg:row-span-1",
    size: "sm"
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    description: "We craft immersive digital luxury and intuitive interfaces that reduce friction and elevate brand perception.",
    icon: "draw",
    color: "secondary",
    href: "/services/ui-ux-design",
    colSpan: "lg:col-span-4 lg:row-span-1",
    size: "md"
  },
];

export default function ServicesBento() {
  return (
    <section className="container-site py-stack-2xl">
      <FadeInUp>
        <SectionHeader 
          overline="Our Capabilities"
          title="Engineering Disciplines" 
          description="A comprehensive suite of elite technical capabilities, covering the entire spectrum of modern digital transformation."
        />
      </FadeInUp>

      <StaggerContainer className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-gutter mt-stack-lg auto-rows-[minmax(180px,_auto)] pb-8 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
        {BENTO_SERVICES.map((service) => (
          <StaggerItem key={service.id} className={cn(service.colSpan, "w-[85vw] sm:w-[60vw] shrink-0 snap-center md:w-auto md:shrink")}>
            <Link href={service.href} className="block h-full group">
              <GlassCard 
                hover="glow" 
                padding={service.size === "lg" ? "xl" : "lg"} 
                className="h-full transition-all duration-500 group-hover:-translate-y-1"
                overlay={
                  <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-0",
                    service.color === "primary" ? "bg-gradient-to-br from-primary to-transparent" :
                    service.color === "secondary" ? "bg-gradient-to-br from-secondary to-transparent" :
                    "bg-gradient-to-br from-tertiary to-transparent"
                  )} />
                }
              >

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-auto pb-4">
                    <IconBox icon={service.icon} color={service.color} size={service.size === "sm" ? "md" : "lg"} />
                  </div>
                  <h3 className={cn(
                    "font-heading text-on-surface group-hover:text-primary transition-colors duration-300",
                    service.size === "lg" ? "text-display-lg-mobile lg:text-display-lg" : 
                    service.size === "md" ? "text-headline-md" : "text-body-lg font-bold"
                  )}>
                    {service.title}
                  </h3>
                  <p className={cn(
                    "font-body text-on-surface-variant mt-2",
                    service.size === "sm" ? "text-body-sm" : "text-body-md"
                  )}>
                    {service.description}
                  </p>
                  
                  {/* Hover Arrow */}
                  <div className="absolute top-6 right-6 opacity-0 translate-x-2 -translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">arrow_outward</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
