"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader, Button } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
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
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 font-body text-body-md text-on-surface-variant pr-12">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
      {/* 1. FAQ Hero */}
      <section className="pt-40 pb-stack-lg px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto text-center relative overflow-hidden w-full">
        <div className="absolute inset-0 z-[-1] bg-ambient-glow-cyan pointer-events-none opacity-20"></div>
        <FadeInUp>
          <span className="font-label text-label-caps text-secondary tracking-widest uppercase mb-4 block">
            Knowledge Base
          </span>
          <h1 className="font-display text-display-xl text-on-surface mb-stack-sm max-w-4xl mx-auto tracking-tight">
            Clarity & <span className="text-primary">Logistics</span>
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg">
            Answers to common questions regarding our engagement models, technical infrastructure, and enterprise compliance standards.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">search</span>
            <input 
              type="text" 
              placeholder="Search for answers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-full py-4 pl-12 pr-6 font-body text-on-surface focus:outline-none focus:border-primary shadow-glass-elevated"
            />
          </div>
        </FadeInUp>
      </section>

      {/* 2. FAQ Accordion System */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto pb-stack-xl w-full flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Categories Sidebar */}
        <div className="lg:w-1/4 shrink-0">
          <div className="sticky top-32">
            <h4 className="font-label text-label-caps text-on-surface uppercase tracking-widest mb-6">Categories</h4>
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
                 <StaggerItem key={faq.id}>
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
                <span className="material-symbols-outlined text-outline-variant text-[40px] mb-4">search_off</span>
                <h3 className="font-display text-xl text-on-surface mb-2">No answers found</h3>
                <p className="font-body text-on-surface-variant">Try adjusting your search terms or contact us directly.</p>
             </div>
           )}
        </div>
      </section>

      {/* 3. Final Support CTA */}
      <section className="bg-surface-container-low py-stack-xl border-t border-outline-variant/20">
        <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto text-center">
           <h3 className="font-display text-headline-md text-on-surface mb-4">Still have questions?</h3>
           <p className="font-body text-body-lg text-on-surface-variant max-w-xl mx-auto mb-8">
             Our solutions architects are available to discuss your specific infrastructure and compliance requirements.
           </p>
           <Button href="/contact" size="lg" icon="forum" iconPosition="left">
             Talk to an Architect
           </Button>
        </div>
      </section>
    </div>
  );
}
