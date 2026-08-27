"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, ExpandingPanels } from "@/components/ui";
import PageHero from "@/components/sections/shared/PageHero";
import PageSurface from "@/components/sections/shared/PageSurface";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { CASE_STUDIES } from "@/data/caseStudies";
import { generateBreadcrumbSchema, generateCollectionPageSchema } from "@/lib/schema";

const COLLECTION_DESCRIPTION =
  "Verified technical case studies and software engineering architectures delivered by LogixLoops: constraints, solutions, and measurable outcomes.";

export default function WorkPage() {
  const caseStudiesList = Object.values(CASE_STUDIES);
  
  // Dynamically extract unique industries from active case studies
  const availableIndustries = Array.from(new Set(caseStudiesList.map(study => study.industry)));
  const categories = ["All Projects", ...availableIndustries];

  const [activeCategory, setActiveCategory] = useState("All Projects");

  const filteredStudies = caseStudiesList.filter(study => 
    activeCategory === "All Projects" || study.industry === activeCategory
  );

  // Group work items into rows of up to 4 cards
  const CHUNK_SIZE = 4;
  const numRows = Math.ceil(filteredStudies.length / CHUNK_SIZE);
  const studyRows = Array.from({ length: numRows }, (_, rowIndex) => 
    filteredStudies.slice(rowIndex * CHUNK_SIZE, rowIndex * CHUNK_SIZE + CHUNK_SIZE)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Work", path: "/work" },
        ])}
      />
      <SchemaMarkup
        schema={generateCollectionPageSchema({
          name: "Work",
          description: COLLECTION_DESCRIPTION,
          path: "/work",
          items: caseStudiesList.map((study) => ({
            name: study.title,
            description: study.shortDescription,
            path: `/work/${study.slug}`,
          })),
        })}
      />

      {/* 1. Work Hero */}
      <PageHero
        preset="caseStudies"
        eyebrow="Work"
        title="Engineering Impact,"
        accent="proven in production."
        lead="Explore our real client engagements: the legacy bottlenecks we dismantled, the resilient architectures we engineered, and the measurable performance outcomes delivered."
        cue="Selected Work"
      />

      <PageSurface>
        {/* 2. Work Showcase & Category Filters */}
        <section
          aria-labelledby="work-grid"
          className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto mb-stack-xl min-h-[500px]"
        >
          {/* Header block */}
          <div className="max-w-3xl mb-8">
            <h2
              id="work-grid"
              className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface mb-3"
            >
              Architected for Performance & Scale
            </h2>
            <p className="font-body text-body-md text-on-surface-variant">
              Every engagement starts with identifying core technical constraints, defining bespoke architecture, and executing with uncompromising precision. We build modern, robust digital platforms that drive measurable growth.
            </p>
          </div>

          {/* Category Filter Tabs in a completely new dedicated line */}
          {categories.length > 2 && (
            <div className="w-full flex flex-wrap items-center gap-2 sm:gap-3 mb-stack-lg border-b border-outline-variant/20 pb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-5 py-2 rounded-full font-label text-sm transition-all duration-300 ${
                    activeCategory === category 
                      ? "text-primary shadow-sm font-medium" 
                      : "text-on-surface-variant hover:text-primary bg-surface-container-lowest/60 border border-outline-variant/50 hover:border-primary/50"
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
          )}

          {/* Staggered Multi-Row Accordion Panels (4 in a row, staggered default active card) */}
          <div className="flex flex-col gap-8 w-full">
            {studyRows.map((rowItems, rowIndex) => {
              // Stagger default expanded item across rows (0th on Row 1, 1st on Row 2, 2nd on Row 3, 3rd on Row 4, 0th on Row 5, etc.)
              const targetActiveIndex = rowIndex % CHUNK_SIZE;
              const defaultIndex = Math.min(targetActiveIndex, rowItems.length - 1);

              return (
                <ExpandingPanels
                  key={`work-row-${rowIndex}-${activeCategory}`}
                  label={`Published work row ${rowIndex + 1}`}
                  defaultActiveIndex={defaultIndex}
                  items={rowItems.map((study) => ({
                    id: study.slug,
                    href: `/work/${study.slug}`,
                    title: study.title,
                    description: study.shortDescription,
                    image: study.cardImage || study.heroImage,
                    imageAlt: study.heroImageAlt,
                    eyebrow: study.industry,
                    meta: `${study.metrics[0].prefix}${study.metrics[0].value} ${study.metrics[0].label}`,
                  }))}
                />
              );
            })}
          </div>
        </section>

        {/* 3. Final CTA */}
        <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl text-center border-t border-outline-variant/20">
          <div className="dispatch py-20 px-8 border border-outline-variant/30 rounded-2xl bg-surface-container-lowest/60 backdrop-blur-2xl shadow-glass-elevated relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
            <h2 className="font-display text-display-lg text-on-surface mb-6 relative z-10">Ready to engineer your digital platform?</h2>
            <p className="font-body text-body-lg text-on-surface-variant max-w-xl mx-auto mb-8 relative z-10">
              Partner with LogixLoops to build robust, scalable architectures and bespoke software solutions tailored to your growth goals.
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
