"use client";

import { SectionHeader, GlassCard, Badge, Button } from "@/components/ui";
import { FadeInUp, FadeInLeft, StaggerContainer, StaggerItem } from "@/components/motion";
import { HIRING_PROCESS, OPEN_ROLES, CULTURE_PILLARS } from "@/data/careers";

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Careers Hero */}
      <section className="pt-40 pb-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto text-center relative overflow-hidden w-full">
        <div className="absolute inset-0 z-[-1] bg-ambient-glow-cyan pointer-events-none opacity-30"></div>
        <FadeInUp>
          <span className="font-label text-label-caps text-secondary tracking-widest uppercase mb-4 block">
            Elite Engineering
          </span>
          <h1 className="font-display text-display-xl text-on-surface mb-stack-sm max-w-4xl mx-auto tracking-tight">
            Build the <span className="text-primary">Impossible</span>
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg">
            We are a collective of systems architects, cloud engineers, and product designers solving the most complex scalability challenges for global enterprises.
          </p>
          <Button href="#open-roles" size="lg" icon="arrow_downward" iconPosition="right">View Open Roles</Button>
        </FadeInUp>
      </section>

      {/* 2. Engineering Culture Pillars */}
      <section className="bg-surface-container-low py-stack-xl border-y border-outline-variant/20">
        <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
          <SectionHeader 
            overline="Our Philosophy"
            title="Engineering Culture"
            description="We reject corporate bureaucracy. We prioritize deep work, asynchronous communication, and absolute technical excellence."
            alignment="center"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-stack-lg">
            {CULTURE_PILLARS.map((pillar, idx) => (
              <StaggerItem key={idx}>
                <GlassCard padding="lg" className="h-full border border-outline-variant/30 hover:border-primary/30 transition-colors text-center">
                  <span className="material-symbols-outlined text-secondary text-[40px] mb-6 block">{pillar.icon}</span>
                  <h3 className="font-display text-headline-md text-on-surface text-xl mb-3">{pillar.title}</h3>
                  <p className="font-body text-body-md text-on-surface-variant">{pillar.description}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 3. Hiring Process Timeline */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
           <div>
             <FadeInLeft>
               <SectionHeader 
                  overline="The Gauntlet"
                  title="How We Hire"
                  description="We don't do trick questions or live coding puzzles. We evaluate architectural thinking, system design, and your ability to communicate complex trade-offs."
               />
             </FadeInLeft>
           </div>
           
           <div className="relative border-l border-outline/20 ml-4 space-y-12 pb-8">
              {HIRING_PROCESS.map((step, idx) => (
                <FadeInUp key={idx} delay={idx * 0.1}>
                  <div className="relative pl-12">
                    <div className="absolute w-8 h-8 rounded-full bg-surface-container-lowest border border-primary -left-[17px] top-0 shadow-[0_0_10px_rgba(0,74,198,0.3)] flex items-center justify-center font-mono text-[10px] text-primary">
                      {step.step}
                    </div>
                    <h3 className="font-display text-headline-md text-on-surface text-xl mb-2">{step.title}</h3>
                    <p className="font-body text-body-md text-on-surface-variant">{step.description}</p>
                  </div>
                </FadeInUp>
              ))}
           </div>
        </div>
      </section>

      {/* 4. Open Roles */}
      <section id="open-roles" className="bg-surface py-stack-xl border-t border-outline-variant/20 relative">
        <div className="absolute inset-0 bg-ambient-glow-blue opacity-20 pointer-events-none"></div>
        <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto relative z-10">
          <SectionHeader 
            overline="Join the Team"
            title="Open Positions"
            description="We are currently hiring remote-first engineers across North America and Europe."
            alignment="center"
          />

          <div className="mt-stack-lg flex flex-col gap-4 max-w-4xl mx-auto">
            {OPEN_ROLES.map(role => (
              <GlassCard key={role.id} padding="lg" className="border border-outline-variant/40 hover:border-primary/50 transition-colors group cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="subtle" className="text-xs bg-surface-container">{role.department}</Badge>
                      <Badge variant="subtle" className="text-xs bg-surface-container">{role.location}</Badge>
                      <Badge variant="subtle" className="text-xs bg-surface-container">{role.type}</Badge>
                    </div>
                    <h3 className="font-display text-headline-md text-on-surface text-2xl mb-2 group-hover:text-primary transition-colors">{role.title}</h3>
                    <p className="font-body text-body-md text-on-surface-variant mb-4">{role.description}</p>
                    <div className="font-mono text-xs text-outline-variant">Requires: {role.requirements.join(" • ")}</div>
                  </div>
                  <div className="shrink-0">
                    <Button variant="outline" icon="arrow_forward" iconPosition="right">Apply Now</Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
