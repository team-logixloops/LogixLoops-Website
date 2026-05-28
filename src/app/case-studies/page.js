"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader, Button } from "@/components/ui";
import { FadeInUp } from "@/components/motion";
import { CASE_STUDIES } from "@/data/caseStudies";

const CATEGORIES = ["All Projects", "FinTech", "HealthTech", "Logistics", "Enterprise"];

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const caseStudiesList = Object.values(CASE_STUDIES);

  const filteredStudies = caseStudiesList.filter(study => 
    activeCategory === "All Projects" || study.industry === activeCategory
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Case Studies Hero */}
      <section className="pt-40 pb-stack-lg px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto text-center relative">
        <div className="absolute inset-0 z-[-1] bg-ambient-glow-violet pointer-events-none opacity-40"></div>
        <FadeInUp>
          <SectionHeader 
            overline="Enterprise Archive"
            title="Strategic Transformations"
            description="Explore our record of major infrastructure deployments. Real metrics, true scalability, and measurable business outcomes."
            alignment="center"
          />
        </FadeInUp>
      </section>

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
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto mb-stack-xl min-h-[500px]">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter"
        >
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((study) => (
              <motion.div
                key={study.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                className="group relative border border-outline-variant/30 rounded-xl overflow-hidden bg-surface-container-lowest/60 backdrop-blur-[24px] shadow-glass-elevated hover:shadow-[0_20px_40px_rgba(70,72,212,0.08)] hover:-translate-y-1 hover:border-primary/20 flex flex-col"
              >
                <div className="absolute inset-0 border-t border-l border-white/40 pointer-events-none rounded-xl z-20"></div>
                
                {/* Hero Image / Mockup */}
                <div className="h-48 overflow-hidden relative bg-surface-variant flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={study.heroImage} 
                    alt={study.heroImageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex gap-2 mb-4">
                    <span className="text-[10px] font-label text-primary bg-primary/10 px-2 py-1 rounded tracking-widest uppercase">
                      {study.industry}
                    </span>
                  </div>
                  <h3 className="font-display text-headline-md text-on-surface mb-2 text-xl">{study.title}</h3>
                  <p className="font-body text-body-md text-on-surface-variant mb-6 line-clamp-2">{study.shortDescription}</p>
                  
                  <div className="mt-auto flex justify-between items-center pt-4 border-t border-outline-variant/20">
                    <span className="font-display text-sm font-semibold text-on-surface">
                      {study.metrics[0].prefix}{study.metrics[0].value} {study.metrics[0].label}
                    </span>
                    <Button 
                      href={`/case-studies/${study.slug}`} 
                      variant="text" 
                      icon="arrow_outward" 
                      iconPosition="right" 
                      className="px-0 text-outline-variant group-hover:text-primary"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 4. Final CTA */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl text-center border-t border-outline-variant/20">
        <div className="py-20 px-8 border border-outline-variant/30 rounded-2xl bg-surface-container-lowest/60 backdrop-blur-2xl shadow-glass-elevated relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
          <h2 className="font-display text-display-lg text-on-surface mb-6 relative z-10">Architect your next breakthrough.</h2>
          <Button href="/contact" size="lg" className="relative z-10 shadow-lg">
            Consult Our Engineers
          </Button>
        </div>
      </section>
    </div>
  );
}
