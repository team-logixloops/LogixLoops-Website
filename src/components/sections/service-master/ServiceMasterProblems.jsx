"use client";

import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

export default function ServiceMasterProblems({ problems, color }) {
  if (!problems || problems.length === 0) return null;

  return (
    <section className="py-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto border-t border-outline-variant/30">
      <FadeInUp>
        <h2 className="font-display text-headline-md text-on-surface mb-stack-md text-center">Overcoming Engineering Hurdles</h2>
      </FadeInUp>
      
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-12">
        {problems.map((prob, i) => (
          <StaggerItem key={i}>
            <div className="bg-white/60 backdrop-blur-[24px] border border-white/80 p-8 rounded-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 h-full group">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-colors",
                i === 0 ? "bg-primary/10 text-primary group-hover:bg-primary/20" : 
                i === 1 ? "bg-secondary/10 text-secondary group-hover:bg-secondary/20" : 
                "bg-tertiary/10 text-tertiary group-hover:bg-tertiary/20"
              )}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {i === 0 ? "architecture" : i === 1 ? "speed" : "group"}
                </span>
              </div>
              <h3 className="font-display text-headline-md text-xl mb-4 text-on-surface">{prob.title || prob}</h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {prob.desc || prob}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
