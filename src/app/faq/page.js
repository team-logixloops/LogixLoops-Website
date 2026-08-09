"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui";
import { StaggerContainer, StaggerItem } from "@/components/motion";
import PageHero from "@/components/sections/shared/PageHero";
import PageSurface from "@/components/sections/shared/PageSurface";
import { FAQS, FAQ_CATEGORIES } from "@/data/faq";

// Reusable Accordion Component
const Accordion = ({ faq, isOpen, onToggle }) => {
  return (
    <div className="border-b border-outline-variant/30">
      <button 
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <h3 className="font-display text-lg text-on-surface group-hover:text-primary transition-colors pr-8">
          {faq.question}
        </h3>
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? "bg-primary border-primary text-white" : "border-outline-variant/50 text-on-surface-variant group-hover:border-primary/50"}`}>
          <motion.span 
            className="material-symbols-outlined text-[20px]"
            animate={{ rotate: isOpen ? 180 : 0 }}
          >
            expand_more
          </motion.span>
        </div>
      </button>
      
      {/* Always mounted, collapsed by height. Conditionally rendering the
          answer meant none of them existed in the server HTML, the whole FAQ
          page shipped 128 crawlable words while claiming six Q&A pairs in its
          FAQPage schema. `hidden` stays off so the text is always extractable;
          `inert` keeps collapsed content out of tab order. */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
        inert={!isOpen}
      >
        <div className="pb-6 font-body text-body-md text-on-surface-variant pr-12">
          {faq.answer}
        </div>
      </motion.div>
    </div>
  );
};

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState(null);

  // Filter Logic
  const filteredFaqs = FAQS.filter(faq => {
    const matchesCategory = activeCategory === "All Categories" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. FAQ Hero, the most open field on the site alongside pricing:
          five wide bands, slow drift. A reference page should not have a busy
          floor under the thing you are trying to scan. */}
      <PageHero
        preset="faq"
        eyebrow="Knowledge base"
        title="Straight answers."
        accent="First sentence."
        lead="Engagement models, timelines, stack, security posture, IP ownership, and what happens if you want to leave. Every answer here leads with the answer, because nobody reads a FAQ for the build-up."
        cue="Browse"
      >
        {/* Search */}
        <div className="w-full max-w-xl mx-auto relative">
          <label htmlFor="faq-search" className="sr-only">
            Search questions
          </label>
          <span
            aria-hidden="true"
            className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none"
          >
            search
          </span>
          <input
            id="faq-search"
            type="search"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-full py-4 pl-12 pr-6 font-body text-body-md text-on-surface focus:outline-none focus:border-primary shadow-glass-elevated"
          />
        </div>
      </PageHero>

      <PageSurface>
        {/* 2. FAQ Accordion System */}
        <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto pb-stack-xl w-full flex flex-col lg:flex-row gap-12 lg:gap-24">
        
          {/* Categories Sidebar */}
          <div className="lg:w-1/4 shrink-0">
            <div className="sticky top-32">
              <h2 className="font-label text-label-caps text-on-surface uppercase tracking-widest mb-6">Categories</h2>
              <div className="flex flex-col gap-2">
                {FAQ_CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setOpenId(null);
                    }}
                    className={`text-left px-4 py-3 rounded-lg font-body text-sm transition-all ${
                      activeCategory === category
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-on-surface-variant hover:bg-surface-container"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ List */}
          <div className="lg:w-3/4">
             {filteredFaqs.length > 0 ? (
               <StaggerContainer key={activeCategory + searchQuery} className="flex flex-col">
                 {filteredFaqs.map((faq, idx) => (
                   <StaggerItem key={faq.id} className="rule-draw rule-draw--under">
                     <Accordion 
                       faq={faq} 
                       isOpen={openId === faq.id} 
                       onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                     />
                   </StaggerItem>
                 ))}
               </StaggerContainer>
             ) : (
               <div className="py-12 text-center border border-outline-variant/30 rounded-xl bg-surface-container-lowest">
                  <span className="material-symbols-outlined text-outline-variant icon-lg mb-4">search_off</span>
                  <h3 className="font-display text-xl text-on-surface mb-2">No answers found</h3>
                  <p className="font-body text-on-surface-variant">Try adjusting your search terms or contact us directly.</p>
               </div>
             )}
          </div>
        </section>

        {/* 3. Final Support CTA */}
        <section className="bg-surface-container-low py-stack-xl border-t border-outline-variant/20">
          <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto text-center">
             <h3 className="font-display text-headline-md text-on-surface mb-4">Question not here?</h3>
             <p className="font-body text-body-lg text-on-surface-variant max-w-xl mx-auto mb-8">
               Ask it directly. Every enquiry is read by an engineer and answered within one business day, and the first conversation is technical rather than commercial.
             </p>
             <Button href="/contact" size="lg" icon="forum" iconPosition="left">
               Ask an engineer
             </Button>
          </div>
        </section>
      </PageSurface>
    </div>
  );
}
