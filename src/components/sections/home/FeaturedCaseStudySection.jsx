"use client";

import { SectionHeader, GlassCard, Button, Badge } from "@/components/ui";
import { FadeInUp, FadeInLeft, FadeInRight } from "@/components/motion";
import { motion } from "framer-motion";

export default function FeaturedCaseStudySection() {
  return (
    <section className="container-site py-stack-2xl">
      <FadeInUp>
        <SectionHeader 
          overline="Featured Work"
          title="Transforming Global Logistics" 
          description="How we engineered a predictive routing and supply chain analytics platform for a Fortune 500 logistics provider."
        />
      </FadeInUp>

      <div className="mt-stack-lg relative rounded-[2rem] overflow-hidden bg-surface-container-low border border-outline-variant/30">
        <div className="absolute top-0 right-0 w-[60%] h-[100%] bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        
        <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Context & Metrics */}
          <div className="p-stack-lg lg:p-stack-xl flex flex-col justify-center relative z-10">
            <FadeInLeft>
              <div className="flex gap-2 mb-6">
                <Badge variant="accent">Cloud Architecture</Badge>
                <Badge variant="subtle">AI Routing</Badge>
              </div>
              <h3 className="font-display text-display-lg-mobile text-on-surface mb-4 leading-tight">
                Nexus Global Logistics
              </h3>
              <p className="font-body text-body-lg text-on-surface-variant mb-8">
                Legacy systems were creating routing inefficiencies costing millions. We deployed a highly decoupled microservices architecture with an integrated machine learning engine that optimized routing in real-time.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="border-l-2 border-primary pl-4">
                  <div className="font-display text-headline-lg text-primary leading-none mb-1">32%</div>
                  <div className="font-body text-body-sm text-on-surface-variant">Reduction in Transit Time</div>
                </div>
                <div className="border-l-2 border-secondary pl-4">
                  <div className="font-display text-headline-lg text-secondary leading-none mb-1">99.9%</div>
                  <div className="font-body text-body-sm text-on-surface-variant">System Availability</div>
                </div>
              </div>

              <Button href="/work" icon="arrow_forward" iconPosition="right">
                Explore Selected Work
              </Button>
            </FadeInLeft>
          </div>

          {/* Right: Dashboard Preview Mockup */}
          <div className="relative h-[400px] lg:h-auto overflow-hidden bg-surface-container-highest/20 lg:rounded-l-[2rem] flex items-center justify-end p-8">
            <FadeInRight className="w-full h-full relative" delay={0.2}>
               <motion.div 
                 whileHover={{ scale: 1.02 }}
                 transition={{ duration: 0.5 }}
                 className="absolute right-[-10%] top-[10%] w-[110%] h-[110%] bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-2xl overflow-hidden flex flex-col"
               >
                 <div className="h-10 bg-inverse-surface w-full flex items-center px-4 border-b border-white/10">
                   <div className="flex gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                     <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                     <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                   </div>
                 </div>
                 <div className="flex-1 p-6 flex flex-col gap-4">
                   <div className="h-8 w-1/3 bg-surface-dim rounded-md mb-2" />
                   <div className="flex gap-4 h-24">
                     <div className="flex-1 rounded-lg bg-primary/10 border border-primary/20" />
                     <div className="flex-1 rounded-lg bg-surface-container" />
                     <div className="flex-1 rounded-lg bg-surface-container" />
                   </div>
                   <div className="flex-1 rounded-lg bg-surface-container w-full relative overflow-hidden">
                     {/* Map lines abstraction */}
                     <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                       <path d="M10,50 Q30,20 50,50 T90,50" fill="none" stroke="#2868c6" strokeWidth="2" strokeDasharray="4 4" />
                       <circle cx="10" cy="50" r="3" fill="#2868c6" />
                       <circle cx="50" cy="50" r="3" fill="#2868c6" />
                       <circle cx="90" cy="50" r="3" fill="#2868c6" />
                     </svg>
                   </div>
                 </div>
               </motion.div>
            </FadeInRight>
          </div>
        </div>
      </div>
    </section>
  );
}
