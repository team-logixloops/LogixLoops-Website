import { notFound } from "next/navigation";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/data/caseStudies";
import { SectionHeader, Button, Badge, GlassCard } from "@/components/ui";
import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from "@/components/motion";
import Link from "next/link";

import Breadcrumbs from "@/components/ui/Breadcrumbs";

export async function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  
  if (!study) {
    return { title: "Case Study Not Found | LogixLoops" };
  }

  return {
    title: `${study.title} Case Study | LogixLoops`,
    description: study.shortDescription,
  };
}

export default async function CaseStudyDetailPage({ params }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const { sections } = study;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Transformation Hero */}
      <section className="pt-32 pb-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto relative z-10">
        {/* Ambient Background Glows */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-secondary-fixed/30 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[-1]"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-7 flex flex-col gap-stack-sm">
            <div className="mb-4">
              <Breadcrumbs />
            </div>
            <FadeInUp>
              <span className="font-label text-label-caps text-secondary tracking-widest uppercase mb-4 block">
                {study.industry} Sector
              </span>
              <h1 className="font-display text-display-xl text-on-surface mb-6 leading-tight">
                Engineering the {study.title}
              </h1>
              <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mb-8">
                {study.shortDescription}
              </p>
              
              <div className="flex flex-wrap gap-8 pt-4">
                {study.metrics.map((metric, idx) => (
                  <div key={idx} className="flex flex-col border-l-2 border-secondary/30 pl-4">
                    <span className="font-display text-display-lg-mobile text-primary">
                      {metric.prefix}{metric.value}<span className="text-headline-md">{metric.suffix}</span>
                    </span>
                    <span className="font-body text-body-md text-on-surface-variant">{metric.label}</span>
                  </div>
                ))}
              </div>
            </FadeInUp>
          </div>
          
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            <FadeInRight>
              <div className="absolute inset-0 bg-secondary/10 blur-2xl rounded-full transform scale-110 pointer-events-none"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={study.heroImage} 
                alt={study.heroImageAlt}
                className="relative rounded-xl border border-white/40 shadow-glass-elevated w-full object-cover aspect-[4/3] glass-panel"
              />
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* 2 & 3. Client Challenge & Operational Problems */}
      {sections.challenge && (
        <section className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop py-stack-xl">
          <FadeInUp>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center bg-surface-container-low/50 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/40 shadow-glass-elevated">
              <div>
                <h2 className="font-display text-display-lg text-on-surface mb-6">{sections.challenge.title}</h2>
                <p className="font-body text-body-lg text-on-surface-variant mb-6">
                  {sections.challenge.content}
                </p>
                <ul className="space-y-4">
                  {sections.challenge.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary mt-1">warning</span>
                      <span className="font-body text-body-md text-on-surface-variant">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative w-full h-[300px] rounded-xl overflow-hidden glass-panel bg-surface-bright flex items-center justify-center shadow-inner mt-8 md:mt-0">
                {sections.challenge.image && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img 
                    src={sections.challenge.image} 
                    alt={sections.challenge.imageAlt}
                    className="w-full h-full object-cover opacity-80"
                  />
                )}
              </div>
            </div>
          </FadeInUp>
        </section>
      )}

      {/* 4. Research & Discovery */}
      {sections.discovery && (
        <section className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop py-stack-xl">
          <div className="text-center mb-16">
            <FadeInUp>
              <h2 className="font-display text-display-lg text-on-surface">{sections.discovery.title}</h2>
              <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-4">{sections.discovery.description}</p>
            </FadeInUp>
          </div>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {sections.discovery.insights.map((insight, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-surface/60 backdrop-blur-2xl p-8 rounded-xl border border-white/50 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform duration-300 h-full">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-${insight.color}/10`}>
                    <span className={`material-symbols-outlined text-${insight.color}`}>{insight.icon}</span>
                  </div>
                  <h3 className="font-display text-headline-md text-on-surface mb-3">{insight.title}</h3>
                  <p className="font-body text-body-md text-on-surface-variant">{insight.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}

      {/* 7. Engineering Implementation (Cadence) */}
      {sections.engineering && (
        <section className="bg-surface-container-low py-stack-xl mt-stack-lg border-y border-outline-variant/30">
          <div className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop">
            <FadeInUp>
              <h2 className="font-display text-display-lg text-on-surface mb-12 border-b border-outline-variant/30 pb-6">{sections.engineering.title}</h2>
            </FadeInUp>
            
            <div className="relative border-l border-outline/20 ml-6 pl-8 space-y-16">
              {sections.engineering.phases.map((phase, idx) => (
                <FadeInLeft key={idx} delay={idx * 0.1}>
                  <div className="relative">
                    <div className={`absolute w-4 h-4 rounded-full bg-surface border-2 border-${phase.color} -left-[40px] top-1.5 shadow-[0_0_10px_rgba(70,72,212,0.4)]`}></div>
                    <h3 className="font-display text-headline-lg-mobile text-on-surface mb-2">{phase.title}</h3>
                    <p className="font-body text-body-md text-on-surface-variant max-w-3xl">{phase.description}</p>
                  </div>
                </FadeInLeft>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5, 8, 9. Architecture & Tech Ecosystem */}
      {sections.architecture && (
        <section className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop py-stack-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
            <div>
              <FadeInLeft>
                <SectionHeader 
                  overline="System Topology"
                  title={sections.architecture.title}
                  description={sections.architecture.content}
                />
                
                <div className="mt-8">
                  <h4 className="font-display text-headline-md text-on-surface mb-4">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map(tech => (
                      <Badge key={tech} variant="subtle">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </FadeInLeft>
            </div>
            
            <div className="relative h-[400px] w-full rounded-2xl bg-inverse-surface overflow-hidden p-8 shadow-2xl flex items-center justify-center">
              <FadeInRight className="w-full h-full relative">
                {/* Abstract Architecture CSS Diagram */}
                <div className="absolute inset-0 flex flex-col justify-between py-12 px-8">
                  {/* API Gateway */}
                  <div className="w-full h-12 border-2 border-primary/50 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-mono text-sm">
                    EDGE API GATEWAY
                  </div>
                  
                  {/* Connecting lines */}
                  <div className="flex justify-between px-16 h-12">
                    <div className="w-px h-full bg-primary/30"></div>
                    <div className="w-px h-full bg-primary/30"></div>
                    <div className="w-px h-full bg-primary/30"></div>
                  </div>
                  
                  {/* Microservices */}
                  <div className="flex justify-between gap-4">
                    <div className="flex-1 h-16 border border-secondary/50 rounded bg-secondary/10 flex items-center justify-center text-secondary font-mono text-xs text-center">AUTH</div>
                    <div className="flex-1 h-16 border border-secondary/50 rounded bg-secondary/10 flex items-center justify-center text-secondary font-mono text-xs text-center">ROUTING</div>
                    <div className="flex-1 h-16 border border-secondary/50 rounded bg-secondary/10 flex items-center justify-center text-secondary font-mono text-xs text-center">DATA</div>
                  </div>
                  
                  {/* Connecting lines */}
                  <div className="flex justify-center h-12">
                    <div className="w-px h-full bg-tertiary/30"></div>
                  </div>
                  
                  {/* Database */}
                  <div className="w-full h-12 border-2 border-tertiary/50 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary font-mono text-sm">
                    DISTRIBUTED CLUSTER
                  </div>
                </div>
              </FadeInRight>
            </div>
          </div>
        </section>
      )}

      {/* 14. Related Solutions & 15. Final CTA */}
      <section className="bg-surface-container-lowest pt-stack-xl border-t border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop pb-stack-lg">
          <div className="flex justify-between items-end mb-8">
            <h3 className="font-display text-headline-md text-on-surface">Explore Related Archives</h3>
            <Link href="/case-studies" className="text-primary hover:text-secondary transition-colors font-label text-label-caps uppercase tracking-widest flex items-center gap-1">
              View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto pb-stack-xl">
          <div className="bg-gradient-to-br from-surface-container-low to-surface border border-white/50 rounded-2xl p-12 text-center shadow-glass-elevated relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full transform scale-150 pointer-events-none"></div>
            <h2 className="font-display text-display-xl text-on-surface mb-6 relative z-10">Ready to Engineer Your Success?</h2>
            <p className="font-body text-body-lg text-on-surface-variant mb-8 max-w-2xl mx-auto relative z-10">
              Partner with LogixLoops to transform your technical debt into a competitive advantage.
            </p>
            <Button href="/contact" size="lg" className="relative z-10 shadow-lg">
              Start Your Transformation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
