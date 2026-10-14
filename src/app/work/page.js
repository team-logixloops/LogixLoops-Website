"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, ExpandingPanels } from "@/components/ui";
import PageHero from "@/components/sections/shared/PageHero";
import PageSurface from "@/components/sections/shared/PageSurface";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { CASE_STUDIES } from "@/data/caseStudies";
import { STUDIO_PROJECTS } from "@/data/projects";
import ProjectDetailModal from "@/components/sections/work/ProjectDetailModal";
import { generateBreadcrumbSchema, generateCollectionPageSchema } from "@/lib/schema";

const COLLECTION_DESCRIPTION =
  "Websites, online stores and apps LogixLoops has built for real clients, each linked to the kit it would start from today, with its price.";

export default function WorkPage() {
  const caseStudiesList = Object.values(CASE_STUDIES);
  
  // State for project detail modal
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Group studio projects into rows of up to 4 cards
  const projectNumRows = Math.ceil(STUDIO_PROJECTS.length / CHUNK_SIZE);
  const projectRows = Array.from({ length: projectNumRows }, (_, rowIndex) =>
    STUDIO_PROJECTS.slice(rowIndex * CHUNK_SIZE, rowIndex * CHUNK_SIZE + CHUNK_SIZE)
  );

  const handleOpenProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

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
        title="Real client builds,"
        accent="and the kits behind them."
        lead="Websites, stores and apps we have built for real businesses, from a creator agency and an architecture firm to a D2C snack brand and a nightlife app. Each project links to the kit it would start from today, with its price."
        cue="Selected Work"
      />

      <PageSurface>
        {/* 2. Case Studies Showcase & Category Filters */}
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
              Client work
            </h2>
            <p className="font-body text-body-md text-on-surface-variant">
              Every project here is live for a real business. Open one to see the problem, what we built and how, and the kit you would start from to get something similar.
            </p>
          </div>

          {/* Category Filter Tabs in a dedicated line */}
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

        {/* 3. Studio Projects Section (Below Case Studies & Above CTA) */}
        <section
          aria-labelledby="projects-grid"
          className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto mb-stack-xl pt-stack-xl border-t border-outline-variant/20"
        >
          {/* Header block */}
          <div className="max-w-3xl mb-8">
            <span className="font-label text-label-caps text-secondary tracking-widest uppercase mb-3 block">
              Studio projects
            </span>
            <h2
              id="projects-grid"
              className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface mb-3"
            >
              What we build for ourselves
            </h2>
            <p className="font-body text-body-md text-on-surface-variant">
              Alongside client work we build our own tools and prototypes, including AI voice agents and automation experiments. They are where new kits start. Open any card for the technical breakdown.
            </p>
          </div>

          {/* Project Expanding Cards (chunked in rows of 4) */}
          <div className="flex flex-col gap-8 w-full">
            {projectRows.map((rowProjects, rowIndex) => {
              const targetActiveIndex = rowIndex % CHUNK_SIZE;
              const defaultIndex = Math.min(targetActiveIndex, rowProjects.length - 1);

              return (
                <ExpandingPanels
                  key={`project-row-${rowIndex}`}
                  label={`Studio projects row ${rowIndex + 1}`}
                  defaultActiveIndex={defaultIndex}
                  items={rowProjects.map((project) => ({
                    id: project.id,
                    title: project.title,
                    shortTitle: project.shortTitle,
                    spineTitle: project.shortTitle || project.title,
                    description: project.shortDescription,
                    eyebrow: project.eyebrow,
                    meta: project.meta,
                    gradient: project.gradient,
                    gradientStyle: project.gradientStyle,
                    onClick: () => handleOpenProjectModal(project),
                  }))}
                />
              );
            })}
          </div>
        </section>

        {/* 4. Final CTA */}
        <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl text-center border-t border-outline-variant/20">
          <div className="dispatch py-20 px-8 border border-outline-variant/30 rounded-2xl bg-surface-container-lowest/60 backdrop-blur-2xl shadow-glass-elevated relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
            <h2 className="font-display text-display-lg text-on-surface mb-6 relative z-10">Want something like this?</h2>
            <p className="font-body text-body-lg text-on-surface-variant max-w-xl mx-auto mb-8 relative z-10">
              Every project here started from a need a kit now covers. Pick the closest kit and see its price, or tell us what you need.
            </p>
            <div className="relative z-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/kits" size="lg" className="shadow-lg">
                Browse the kits
              </Button>
              <Button href="/contact" variant="ghost" size="lg">
                Start a project
              </Button>
            </div>
          </div>
        </section>
      </PageSurface>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
