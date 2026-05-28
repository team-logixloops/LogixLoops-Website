"use client";

import { FadeInLeft, FadeInRight } from "@/components/motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const FEATURED_SERVICES = [
  {
    id: "enterprise-software",
    overline: "Core Expertise",
    title: "Enterprise Software",
    description: "Architecting robust, scalable platforms that serve as the central nervous system for modern corporations. We focus on high availability, stringent security, and seamless legacy integration.",
    icon: "domain",
    color: "primary",
    tags: ["Java", "C# .NET", "Microservices", "Kubernetes"],
    phases: [
      "Phase 1: Deep System Audit & Blueprinting",
      "Phase 2: Modular Architecture Design",
      "Phase 3: Iterative Deployment & Scaling"
    ],
    buttonText: "Explore Enterprise Capabilities",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWcyvqzetU4LMYjMV0vQ78etwUQPej5W5PIknyNm5u83rw59mfrbY9ZItOBQOGldt_nghQGuaOksHMMIZgBlz8o8iEZEIXIWT0DjaUMAlOZU1d3bTAc_l9L21h4NKj0_RcP4CW7bEHfErYoC9KbTuRMm6-6FJRgDpV3ry9G-3X9puMxpboo9-jUVsV2W59lp-0aYlQ2_qc4AYRbfc8sxYO2_UFqmiYlmuxkvXzleaIySkRurAPD28ke86kB_saCNkIZbt6Sm_Qhlxo",
    reverse: false
  },
  {
    id: "ai-ml-solutions",
    overline: "Advanced Intelligence",
    title: "AI & ML Solutions",
    description: "Injecting cognitive capabilities into your existing workflows. We build predictive models and automated reasoning systems that turn vast datasets into actionable, real-time foresight.",
    icon: "psychology",
    color: "secondary",
    tags: ["TensorFlow", "PyTorch", "NLP", "Computer Vision"],
    phases: [
      "Phase 1: Data Structuring & Sanctification",
      "Phase 2: Algorithmic Training & Tuning",
      "Phase 3: Ecosystem Integration"
    ],
    buttonText: "Discover AI Models",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCS_zrfMgYx-pW-tS5hTc-8m4MglEXKPTeDz5VKG9pRDSo25Prud6YiN2OZ5OPBCWZUEuEdSONxZjSoWcBccsz_6JiMwd3kyDjohcpWsPd1MpcTtUk2DUy7Y8GybvAPU4hXpmV_SEEeSDSHaLhPrDqhR5d_TzknLE-hC4Vz8NEbqhrd6B5_Sl1tbrX4AOvqK0ipw6vJXvixgJ7Tj9fSDMsulfyOf_-2Jd-iDAHxjmJO4D9IntU5M-k5VZXNPbK6YmM6tFYl4vicQIuS",
    reverse: true
  }
];

export default function FeaturedServices() {
  return (
    <div className="flex flex-col gap-stack-xl">
      {FEATURED_SERVICES.map((service, index) => {
        const isReverse = service.reverse;

        const TextContent = () => (
          <div className={cn("flex flex-col gap-stack-md", isReverse ? "pl-0 lg:pl-stack-lg order-1 lg:order-2" : "pr-0 lg:pr-stack-lg order-1")}>
            <div className={cn("flex items-center gap-base", service.color === "primary" ? "text-primary" : "text-secondary")}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{service.icon}</span>
              <span className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant">{service.overline}</span>
            </div>
            
            <h2 className="font-display text-headline-lg text-on-surface">{service.title}</h2>
            
            <p className="font-body text-body-md text-on-surface-variant">
              {service.description}
            </p>
            
            <div className="flex flex-wrap gap-base mt-2">
              {service.tags.map(tag => (
                <span key={tag} className="bg-surface-container text-on-surface-variant px-3 py-1 rounded-full font-label text-label-caps uppercase">
                  {tag}
                </span>
              ))}
            </div>
            
            <ul className="flex flex-col gap-3 mt-4">
              {service.phases.map(phase => (
                <li key={phase} className="flex items-start gap-3">
                  <span className={cn("material-symbols-outlined text-sm mt-1", service.color === "primary" ? "text-secondary" : "text-primary")}>
                    check_circle
                  </span>
                  <span className="font-body text-body-md text-on-surface">{phase}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-4">
              <Link href={`/services/${service.id}`} className="px-6 py-3 border border-outline-variant/50 bg-surface/50 backdrop-blur-md rounded-lg font-body text-body-md text-primary hover:bg-surface-container transition-all flex items-center gap-2 w-fit">
                {service.buttonText} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        );

        const ImageContent = () => (
          <div className={cn("relative h-[500px] rounded-xl border-t border-l border-white/40 border-b border-r border-outline-variant/30 bg-surface-container-low/30 backdrop-blur-[24px] shadow-sm overflow-hidden flex items-center justify-center group", isReverse ? "order-2 lg:order-1" : "order-2")}>
            <div className={cn("absolute inset-0 z-0", service.color === "primary" ? "bg-gradient-to-br from-primary/5 to-transparent" : "bg-gradient-to-tr from-secondary/10 to-transparent")} />
            <img 
              src={service.image} 
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
        );

        return (
          <section key={service.id} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
            {isReverse ? (
              <>
                <FadeInRight className="order-2 lg:order-1"><ImageContent /></FadeInRight>
                <FadeInLeft className="order-1 lg:order-2"><TextContent /></FadeInLeft>
              </>
            ) : (
              <>
                <FadeInLeft className="order-1"><TextContent /></FadeInLeft>
                <FadeInRight className="order-2"><ImageContent /></FadeInRight>
              </>
            )}
          </section>
        );
      })}
    </div>
  );
}
