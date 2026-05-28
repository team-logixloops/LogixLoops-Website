"use client";

import { SectionHeader, GlassCard } from "@/components/ui";
import { FadeInUp, FadeInRight } from "@/components/motion";
import { useRef } from "react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "LogixLoops completely overhauled our legacy systems. Their engineers delivered a scalable microservices architecture that decreased our server costs by 40% while improving performance.",
    author: "Sarah Jenkins",
    role: "CTO, Nexus Financial",
    initials: "SJ",
  },
  {
    quote: "The strategic clarity they bring is unmatched. They didn't just write code; they partnered with us to define the architectural blueprint for our new AI-driven product suite.",
    author: "David Chen",
    role: "VP Engineering, Synapse Health",
    initials: "DC",
  },
  {
    quote: "Working with LogixLoops feels like having an elite internal engineering team. Their delivery velocity and commitment to code quality sets a new benchmark in the industry.",
    author: "Elena Rodriguez",
    role: "Director of Product, Vertex Logistics",
    initials: "ER",
  },
  {
    quote: "When we needed to scale our platform to support 5 million concurrent users, LogixLoops was the only team we trusted. Their DevOps expertise is world-class.",
    author: "Marcus Thorne",
    role: "Head of Infrastructure, Stratos Cloud",
    initials: "MT",
  }
];

export default function TestimonialsSection() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section className="container-site py-stack-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-stack-lg gap-6">
        <FadeInUp className="flex-1">
          <SectionHeader 
            overline="Partnerships"
            title="Client Perspectives" 
            description="Hear from technology leaders who have partnered with LogixLoops to architect their enterprise future."
          />
        </FadeInUp>
        
        {/* Carousel Controls */}
        <FadeInRight className="flex gap-4">
          <button 
            onClick={scrollLeft}
            className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface hover:text-primary"
            aria-label="Previous testimonials"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button 
            onClick={scrollRight}
            className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface hover:text-primary"
            aria-label="Next testimonials"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </FadeInRight>
      </div>

      <div className="relative w-full">
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 -mx-margin-x-mobile px-margin-x-mobile md:-mx-margin-x-desktop md:px-margin-x-desktop scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="snap-start shrink-0 w-[85vw] sm:w-[400px] flex"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <GlassCard padding="lg" hover="lift" className="w-full flex flex-col h-full bg-surface-container-lowest/60">
                <span className="material-symbols-outlined text-primary/30 text-[40px] mb-4">
                  format_quote
                </span>
                <p className="font-body text-body-lg text-on-surface mb-8 flex-grow leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-outline-variant/20">
                  <div className="w-12 h-12 rounded-full bg-surface-dim border border-outline-variant/30 text-on-surface-variant flex items-center justify-center font-label text-label-caps font-bold tracking-wider">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-heading text-body-lg font-semibold text-on-surface">
                      {testimonial.author}
                    </div>
                    <div className="font-body text-body-sm text-on-surface-variant">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
