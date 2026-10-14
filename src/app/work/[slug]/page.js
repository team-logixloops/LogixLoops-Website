import { notFound } from "next/navigation";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/data/caseStudies";
import { getKitBySlug } from "@/data/kits";
import { getLineBySlug } from "@/data/lines";
import KitCard from "@/components/sections/kits/KitCard";
import { SectionHeader, Button, Badge } from "@/components/ui";
import { FadeInUp, FadeInUpImmediate, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from "@/components/motion";
import Link from "next/link";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CaseStudyMotion from "@/components/sections/case-study/CaseStudyMotion";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateCaseStudySchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

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
    return { title: "Work Not Found" };
  }

  return buildMetadata({
    title: `${study.title} | Work`,
    description: study.shortDescription,
    path: `/work/${study.slug}`,
    type: "article",
    keywords: [
      study.industry,
      study.transformationType,
      ...study.technologies,
    ],
  });
}

export default async function WorkDetailPage({ params }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const { sections } = study;
  // The kits closest to what this project was, so a reader can buy the same.
  const closestKits = study.kits.map((kitSlug) => getKitBySlug(kitSlug)).filter(Boolean);

  return (
    <CaseStudyMotion className="flex flex-col min-h-screen overflow-x-clip">
      <SchemaMarkup schema={generateCaseStudySchema(study)} />
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Work", path: "/work" },
          { label: study.title, path: `/work/${study.slug}` },
        ])}
      />

      {/* 1. Transformation Hero */}
      <section className="pt-32 pb-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto relative z-10">
        {/* Ambient Background Glows */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-secondary-fixed/30 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[-1]"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-7 flex flex-col gap-stack-sm">
            <div className="mb-4">
              <Breadcrumbs />
            </div>
            <FadeInUpImmediate>
              <span className="font-label text-label-caps text-secondary tracking-widest uppercase mb-4 block">
                {study.industry}
              </span>
              <h1 className="font-display text-display-xl text-on-surface mb-6 leading-tight">
                Building the {study.title}
              </h1>
              <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mb-8">
                {study.shortDescription}
              </p>

              <div className="flex flex-wrap gap-8 pt-4">
                {study.metrics.map((metric, idx) => (
                  <div key={idx} className="flex flex-col border-l-2 border-secondary/30 pl-4">
                    <span className="font-display text-display-lg-mobile text-primary tabular-nums">
                      {metric.prefix}{metric.value}{metric.suffix}
                    </span>
                    <span className="font-body text-body-md text-on-surface-variant">{metric.label}</span>
                  </div>
                ))}
              </div>
            </FadeInUpImmediate>
          </div>
          
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            <FadeInUpImmediate delay={0.15}>
              <div className="absolute inset-0 bg-secondary/10 blur-2xl rounded-full transform scale-110 pointer-events-none"></div>
              {/* Frame tilts toward the cursor; the image inside drifts on scroll */}
              <div
                data-cs-hero-frame
                className="relative rounded-xl overflow-hidden border border-white/40 shadow-glass-elevated glass-panel aspect-[4/3] will-change-transform"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  width={1600}
                  height={900}
                  data-cs-hero-image
                  src={study.heroImage}
                  alt={study.heroImageAlt}
                  className="w-full h-full object-cover scale-110 will-change-transform"
                />
              </div>
            </FadeInUpImmediate>
          </div>
        </div>
      </section>

      {/* 2 & 3. The brief and the constraints */}
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
                    width={1200}
                    height={800}
                    data-cs-zoom
                    src={sections.challenge.image}
                    alt={sections.challenge.imageAlt}
                    className="w-full h-full object-cover opacity-80 will-change-transform"
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
          
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {sections.discovery.insights.map((insight, idx) => (
              <StaggerItem key={idx}>
                <div
                  data-cs-spotlight
                  className="cs-spotlight bg-surface/60 backdrop-blur-2xl p-8 rounded-xl border border-white/50 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:border-primary/25 transition-[translate,border-color,box-shadow] duration-300 h-full"
                >
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
          <div className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <FadeInUp>
                  <span className="font-label text-label-caps text-secondary tracking-widest uppercase mb-3 block">
                    Build Sequence
                  </span>
                  <h2 className="font-display text-display-lg text-on-surface mb-8 lg:mb-0 border-b lg:border-b-0 border-outline-variant/30 pb-6 lg:pb-0">
                    {sections.engineering.title}
                  </h2>
                </FadeInUp>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="relative pl-8 sm:pl-10 space-y-14 sm:space-y-20">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-outline-variant/40" aria-hidden="true"></div>
                <div
                  data-cs-rail
                  aria-hidden="true"
                  className="cs-rail absolute left-0 top-0 bottom-0 w-px will-change-transform"
                ></div>

                {sections.engineering.phases.map((phase, idx) => (
                  <div key={idx} data-cs-phase className="relative">
                    <span
                      aria-hidden="true"
                      className="cs-dot absolute -left-[calc(2rem+6px)] sm:-left-[calc(2.5rem+6px)] top-2 w-3 h-3 rounded-full bg-outline-variant ring-4 ring-surface-container-low"
                    ></span>
                    <span className="font-label text-label-caps text-on-surface-variant/70 tracking-widest uppercase mb-2 block">
                      {String(idx + 1).padStart(2, "0")} / {String(sections.engineering.phases.length).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-headline-lg-mobile text-on-surface mb-2">{phase.title}</h3>
                    <p className="font-body text-body-md text-on-surface-variant max-w-3xl">{phase.description}</p>
                  </div>
                ))}
              </div>
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
                  <h3 className="font-display text-headline-md text-on-surface mb-4">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map(tech => (
                      <Badge key={tech} variant="subtle">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </FadeInLeft>
            </div>
            
            <div className="relative h-[340px] sm:h-[400px] w-full rounded-2xl bg-inverse-surface overflow-hidden p-4 sm:p-8 shadow-2xl flex items-center justify-center">
              <FadeInRight className="w-full h-full relative">
                <div data-cs-diagram className="absolute inset-0 flex flex-col justify-between py-6 sm:py-12 px-2 sm:px-8">
                  <div data-cs-node className="w-full h-12 border-2 border-primary/50 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-mono text-xs sm:text-sm">
                    EDGE API GATEWAY
                  </div>

                  <div data-cs-node className="flex justify-between px-8 sm:px-16 h-8 sm:h-12">
                    <div className="w-px h-full bg-primary/30"></div>
                    <div className="w-px h-full bg-primary/30"></div>
                    <div className="w-px h-full bg-primary/30"></div>
                  </div>

                  <div data-cs-node className="flex justify-between gap-2 sm:gap-4">
                    <div className="flex-1 h-14 sm:h-16 border border-secondary/50 rounded bg-secondary/10 flex items-center justify-center text-secondary font-mono text-[10px] sm:text-xs text-center">AUTH</div>
                    <div className="flex-1 h-14 sm:h-16 border border-secondary/50 rounded bg-secondary/10 flex items-center justify-center text-secondary font-mono text-[10px] sm:text-xs text-center">ROUTING</div>
                    <div className="flex-1 h-14 sm:h-16 border border-secondary/50 rounded bg-secondary/10 flex items-center justify-center text-secondary font-mono text-[10px] sm:text-xs text-center">DATA</div>
                  </div>

                  <div data-cs-node className="flex justify-center h-8 sm:h-12">
                    <div className="w-px h-full bg-tertiary/30"></div>
                  </div>

                  <div data-cs-node className="w-full h-12 border-2 border-tertiary/50 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary font-mono text-xs sm:text-sm">
                    DISTRIBUTED CLUSTER
                  </div>
                </div>
              </FadeInRight>
            </div>
          </div>
        </section>
      )}

      {/* 14. Bottom Section: Live Project Link, Related Solutions & Final CTA */}
      <section className="bg-surface-container-lowest pt-stack-xl border-t border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop pb-stack-lg">
          {/* Dedicated Live Website Link Card at bottom */}
          {study.liveUrl && (
            <div className="mb-12 p-8 md:p-10 rounded-2xl border border-outline-variant/30 bg-surface-container-low/60 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-glass">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-label text-label-caps uppercase tracking-wider text-secondary">
                    Live Production Project
                  </span>
                </div>
                <h3 className="font-display text-headline-lg-mobile md:text-headline-md text-on-surface">
                  Experience {study.title} Live
                </h3>
                <p className="font-body text-body-md text-on-surface-variant max-w-xl mt-1">
                  Explore the live website and platform in production at <span className="font-mono text-primary">{study.liveUrl}</span>
                </p>
              </div>

              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-label text-label-caps uppercase tracking-wider text-white bg-primary hover:bg-primary/90 shadow-glass transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              >
                <span>Visit Live Website</span>
                <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
              </a>
            </div>
          )}

          {closestKits.length > 0 && (
            <div className="mb-12">
              <h3 className="font-display text-headline-md text-on-surface mb-2">The kit closest to this project</h3>
              <p className="font-body text-body-md text-on-surface-variant mb-6 max-w-2xl">
                What this build would start from today, with its price, timeline and everything it includes.
              </p>
              <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
                {closestKits.map((kit) => (
                  <KitCard key={kit.slug} kit={kit} color={getLineBySlug(kit.line).color} />
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-end mb-8">
            <h3 className="font-display text-headline-md text-on-surface">More Projects</h3>
            <Link href="/work" className="text-primary hover:text-secondary transition-colors font-label text-label-caps uppercase tracking-widest flex items-center gap-1">
              View All Work <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto pb-stack-xl">
          <div className="bg-gradient-to-br from-surface-container-low to-surface border border-white/50 rounded-2xl p-12 text-center shadow-glass-elevated relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full transform scale-150 pointer-events-none"></div>
            <h2 className="font-display text-display-xl text-on-surface mb-6 relative z-10">Want something like this?</h2>
            <p className="font-body text-body-lg text-on-surface-variant mb-8 max-w-2xl mx-auto relative z-10">
              Start from the kit closest to this project, or tell us what you need and we will point you at the right one.
            </p>
            <div className="relative z-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                href={closestKits.length ? `/contact?kit=${closestKits[0].slug}` : "/contact"}
                size="lg"
                className="shadow-lg"
              >
                Start a project
              </Button>
              <Button href="/kits" variant="ghost" size="lg">
                Browse the kits
              </Button>
            </div>
          </div>
        </div>
      </section>
    </CaseStudyMotion>
  );
}
