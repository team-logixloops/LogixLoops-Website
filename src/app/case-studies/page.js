"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, ExpandingPanels } from "@/components/ui";
import { FadeInUp } from "@/components/motion";
import PageHero from "@/components/sections/shared/PageHero";
import PageSurface from "@/components/sections/shared/PageSurface";
import ReferenceBuildNotice from "@/components/sections/case-study/ReferenceBuildNotice";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { CASE_STUDIES } from "@/data/caseStudies";
import { generateBreadcrumbSchema, generateCollectionPageSchema } from "@/lib/schema";

const CATEGORIES = ["All Projects", "FinTech", "HealthTech", "Logistics", "Enterprise"];

// The route's metadata lives in layout.js because this is a Client Component,
// but the JSON-LD belongs on the index alone, layout.js also wraps
// /case-studies/[slug], which carries its own page-level schema. Client
// components are still server-rendered, so this reaches the crawler.
const COLLECTION_DESCRIPTION =
  "Four reference builds: trading, healthcare, logistics and enterprise identity. The constraint, the architecture we would choose, and the alternatives we would rule out.";

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const caseStudiesList = Object.values(CASE_STUDIES);

  const filteredStudies = caseStudiesList.filter(study => 
    activeCategory === "All Projects" || study.industry === activeCategory
  );

  return (
    <div className="flex flex-col min-h-screen">
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Case Studies", path: "/case-studies" },
        ])}
      />
      <SchemaMarkup
        schema={generateCollectionPageSchema({
          name: "Case Studies",
          description: COLLECTION_DESCRIPTION,
          path: "/case-studies",
          items: caseStudiesList.map((study) => ({
            name: study.title,
            description: study.shortDescription,
            path: `/case-studies/${study.slug}`,
          })),
        })}
      />

      {/* 1. Case Studies Hero, was the last hand-rolled hero on the site, a
          `pt-40` block with an ambient glow behind it. It is `PageHero` now,
          on the steepest field of the eight: contours crowd where a surface
          changes fastest, and this is the page about systems that were moved
          a long way in a short time. */}
      <PageHero
        preset="caseStudies"
        eyebrow="Reference builds"
        title="Architecture,"
        accent="shown in full."
        lead="Four systems, worked through end to end: the constraint, the architecture we would choose, the alternatives we would rule out and why. These are reference builds rather than client engagements, and we say so on every one of them."
        cue="The archive"
      />

      <PageSurface>
        {/* 2. Industry Filtering System */}
        <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto mb-stack-lg">
          <FadeInUp delay={0.1}>
            <div className="flex flex-wrap justify-center gap-4">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-6 py-2 rounded-full font-label text-sm transition-all duration-300 ${
                    activeCategory === category 
                      ? "text-primary shadow-sm" 
                      : "text-on-surface-variant hover:text-primary bg-surface-container-lowest/50 border border-outline-variant/50 hover:border-primary/50"
                  }`}
                >
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 rounded-full border border-primary bg-primary/5"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              ))}
            </div>
          </FadeInUp>
        </section>

        {/* 3. Case Studies Grid */}
        <section
          aria-labelledby="case-studies-grid"
          className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto mb-stack-xl min-h-[500px]"
        >
          {/* The h2 is here because the cards below are h3s and the page would
              otherwise jump h1 → h3. What it labels is the shape every write-up
              follows, which is worth one line, not the three paragraphs that
              used to stand between the filters and the work itself. */}
          {/* Above the grid, not below it. A disclosure a reader meets after
              they have already formed an impression is not a disclosure. */}
          <ReferenceBuildNotice variant="index" className="mb-stack-lg" />

          <div className="max-w-2xl mb-stack-lg">
            <h2
              id="case-studies-grid"
              className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4"
            >
              Every write-up, same shape
            </h2>
            <p className="font-body text-body-md text-on-surface-variant">
              The constraint and what it costs. The architecture we would choose
              instead, and the two or three alternatives we would rule out,
              named, with the reason they lose. Then the trade the decision
              makes, because every architecture is a trade and the ones that
              claim otherwise are hiding it.
            </p>
            {/* A case study is a defined term here, and the counts are the kind
                of concrete, quotable detail an AI answer engine will lift. Both
                also carry the page past the 300-word floor a crawler treats as
                the line between an index and a thin page. */}
            <p className="font-body text-body-md text-on-surface-variant mt-4">
              Four are published here, across four industries: financial
              trading, healthcare, logistics and enterprise identity. They are
              written the way we write an architecture brief on a real
              engagement, which is the point. This is the document you would
              receive after discovery, in the format you would receive it.
            </p>
            <p className="font-body text-body-md text-on-surface-variant mt-4">
              When client work replaces them, the standard is the same one we
              would want applied to us. A name only with written permission,
              otherwise the industry and the date. Figures only where the client
              has confirmed them. Nothing that reads as a measured result unless
              somebody measured it.
            </p>
          </div>

          {/* The archive as a rail rather than a card grid. Four studies is a
              small enough set that they can each hold a picture at size, which
              a three-across grid of 192px thumbnails could not, and the
              filter above drives the same list, so narrowing to one industry
              simply leaves fewer panels on the rail.

              Every title, description and headline metric stays in the DOM at
              all times; only the layout responds to the pointer. See
              `ui/ExpandingPanels.jsx`. */}
          <ExpandingPanels
            label="Published case studies"
            items={filteredStudies.map((study) => ({
              id: study.slug,
              href: `/case-studies/${study.slug}`,
              title: study.title,
              description: study.shortDescription,
              image: study.heroImage,
              imageAlt: study.heroImageAlt,
              eyebrow: study.industry,
              meta: `${study.metrics[0].prefix}${study.metrics[0].value} ${study.metrics[0].label}`,
            }))}
          />
        </section>

        {/* 4. Final CTA */}
        <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl text-center border-t border-outline-variant/20">
          <div className="dispatch py-20 px-8 border border-outline-variant/30 rounded-2xl bg-surface-container-lowest/60 backdrop-blur-2xl shadow-glass-elevated relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
            <h2 className="font-display text-display-lg text-on-surface mb-6 relative z-10">Want one of these written for your system?</h2>
            <p className="font-body text-body-lg text-on-surface-variant max-w-xl mx-auto mb-8 relative z-10">
              That is what discovery produces. Same format, your constraints,
              and it is yours to keep whether or not you hire us.
            </p>
            <Button href="/contact" size="lg" className="relative z-10 shadow-lg">
              Book a discovery call
            </Button>
          </div>
        </section>
      </PageSurface>
    </div>
  );
}
