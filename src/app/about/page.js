import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from "@/components/motion";
import { GlassCard, Button, SectionHeader } from "@/components/ui";

export const metadata = {
  title: "About Us | LogixLoops",
  description: "Learn about our elite engineering collective and our philosophy on building resilient digital ecosystems.",
};

export default function AboutPage() {
  return (
    <main className="relative z-10 overflow-hidden bg-surface">
      {/* Ambient Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <div className="flex flex-col">
        {/* 1. Narrative Hero */}
        <section className="pt-[160px] pb-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto text-center relative w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
          <FadeInUp>
            <h1 className="font-display text-display-xl lg:text-[80px] leading-[1.1] text-on-surface mb-8 tracking-tight">
              We Engineer the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Digital Future.</span>
            </h1>
            <p className="font-body text-body-xl text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
              LogixLoops is an elite collective of systems architects, product designers, and full-stack engineers. We exist to transform technical debt into competitive advantage and scale ambitious ideas into resilient realities.
            </p>
          </FadeInUp>
        </section>

        {/* 2 & 3. Philosophy & Vision / Why LogixLoops Exists */}
        <section className="py-stack-xl border-t border-outline-variant/30 bg-surface-container-lowest relative">
          <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
              <FadeInLeft>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4 block">The Axiom</span>
                <h2 className="font-display text-display-lg text-on-surface mb-6 leading-tight">
                  Technology should accelerate human potential, not hinder it.
                </h2>
                <p className="font-body text-body-lg text-on-surface-variant mb-6">
                  Most enterprise software fails not because of bad code, but because of misaligned architecture. We observed a widening gap between visionary business goals and the fragile technical foundations built to support them.
                </p>
                <p className="font-body text-body-lg text-on-surface-variant">
                  LogixLoops was formed to bridge this gap. We reject the "ship it fast and fix it later" paradigm. We believe in precision engineering, operational maturity, and building systems that endure.
                </p>
              </FadeInLeft>
              <FadeInRight className="relative flex justify-center">
                <div className="w-full aspect-square max-w-[500px] rounded-full border border-primary/20 flex items-center justify-center relative bg-surface">
                  <div className="absolute inset-4 rounded-full border border-secondary/20 flex items-center justify-center animate-[spin_60s_linear_infinite]"></div>
                  <div className="absolute inset-12 rounded-full border border-tertiary/20 flex items-center justify-center animate-[spin_40s_linear_infinite_reverse]"></div>
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary shadow-glass-elevated flex items-center justify-center">
                    <span className="material-symbols-outlined text-[48px] text-white">architecture</span>
                  </div>
                </div>
              </FadeInRight>
            </div>
          </div>
        </section>

        {/* 4 & 5. Engineering Mindset & Product Philosophy */}
        <section className="py-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
          <SectionHeader 
            overline="Methodology"
            title="The LogixLoops Standard"
            description="Our engineering culture is defined by rigorous systems thinking and uncompromising aesthetic standards."
            alignment="center"
          />
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-16">
            <StaggerItem>
              <GlassCard padding="xl" hover="glow" className="h-full border border-outline-variant/50">
                <span className="material-symbols-outlined text-[32px] text-primary mb-6">security</span>
                <h3 className="font-display text-headline-md text-on-surface mb-4">Zero-Trust Architecture</h3>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  We build with an assumption of breach. Every microservice, every API endpoint, and every data pipeline is heavily fortified. Security is not an afterthought; it is the fundamental blueprint of our engineering process.
                </p>
              </GlassCard>
            </StaggerItem>
            <StaggerItem>
              <GlassCard padding="xl" hover="glow" className="h-full border border-outline-variant/50">
                <span className="material-symbols-outlined text-[32px] text-secondary mb-6">speed</span>
                <h3 className="font-display text-headline-md text-on-surface mb-4">Performance as a Feature</h3>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  Milliseconds dictate conversion rates. Our systems are highly optimized for edge delivery, utilizing advanced caching tiers, progressive rendering, and database query optimizations to ensure frictionless execution.
                </p>
              </GlassCard>
            </StaggerItem>
            <StaggerItem>
              <GlassCard padding="xl" hover="glow" className="h-full border border-outline-variant/50">
                <span className="material-symbols-outlined text-[32px] text-tertiary mb-6">design_services</span>
                <h3 className="font-display text-headline-md text-on-surface mb-4">Frictionless UX</h3>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  Enterprise software does not have to be ugly. We apply consumer-grade UX standards to B2B platforms, utilizing soft-light aesthetics, cinematic motion, and cognitive load reduction to make complex systems intuitive.
                </p>
              </GlassCard>
            </StaggerItem>
            <StaggerItem>
              <GlassCard padding="xl" hover="glow" className="h-full border border-outline-variant/50">
                <span className="material-symbols-outlined text-[32px] text-primary mb-6">all_inclusive</span>
                <h3 className="font-display text-headline-md text-on-surface mb-4">Resilient Scalability</h3>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  We engineer architectures that survive hyper-growth. By leveraging distributed cloud primitives and event-driven data models, our platforms seamlessly scale from thousands to millions of concurrent operations.
                </p>
              </GlassCard>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* 6. Operational Standards */}
        <section className="py-stack-xl border-y border-outline-variant/30 bg-surface-container-low">
          <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-xl items-center">
              <div>
                <FadeInLeft>
                  <h2 className="font-display text-display-lg text-on-surface mb-6">Predictable Execution.</h2>
                  <p className="font-body text-body-lg text-on-surface-variant">
                    Chaos is the enemy of delivery. We operate on a deeply refined agile cadence, ensuring total transparency, predictable sprint velocity, and continuous integration pipelines that guarantee zero-downtime deployments.
                  </p>
                </FadeInLeft>
              </div>
              <div className="relative pl-8 border-l border-outline/20 space-y-12">
                {[
                  { phase: "01", title: "Discovery & Topology", desc: "Mapping the architectural boundaries and business imperatives." },
                  { phase: "02", title: "Prototype & Validation", desc: "Validating user flows and API contracts before heavy engineering." },
                  { phase: "03", title: "Iterative Engineering", desc: "Test-driven development loops with continuous stakeholder visibility." },
                  { phase: "04", title: "Hardening & Scale", desc: "Pen-testing, load balancing, and production readiness certification." }
                ].map((step, idx) => (
                  <FadeInRight key={idx} delay={idx * 0.1} className="relative">
                    <div className="absolute w-3 h-3 rounded-full bg-primary -left-[38px] top-2 shadow-[0_0_10px_rgba(0,74,198,0.5)]"></div>
                    <span className="font-mono text-sm text-primary mb-2 block">PHASE {step.phase}</span>
                    <h3 className="font-display text-headline-md text-on-surface mb-2">{step.title}</h3>
                    <p className="font-body text-body-md text-on-surface-variant">{step.desc}</p>
                  </FadeInRight>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 9 & 10. Long-Term Vision & CTA */}
        <section className="py-[160px] px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 rounded-[40px] pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
          
          <FadeInUp className="relative z-10">
            <span className="material-symbols-outlined text-[48px] text-primary mb-6">rocket_launch</span>
            <h2 className="font-display text-display-xl text-on-surface mb-6 tracking-tight">
              Ready to Engineer Your Legacy?
            </h2>
            <p className="font-body text-body-xl text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
              Join the ranks of enterprises that trust LogixLoops to build their most critical digital infrastructure. Let's architect the next decade of your growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" size="lg" icon="arrow_forward">Start a Consultation</Button>
              <Button href="/case-studies" variant="outline" size="lg">View Our Work</Button>
            </div>
          </FadeInUp>
        </section>
      </div>
    </main>
  );
}
