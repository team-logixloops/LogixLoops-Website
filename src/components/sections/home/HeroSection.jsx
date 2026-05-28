"use client";

import { Button, GlassCard } from "@/components/ui";
import { FadeInLeft, FadeInRight } from "@/components/motion";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] pt-[140px] pb-stack-2xl overflow-hidden flex items-center">
      {/* Animated Blobs (Mesh BG) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-multiply filter blur-2xl">
        <motion.div 
          animate={{ x: [0, 30, -20, 0], y: [0, -50, 20, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[0%] -left-4 w-72 h-72 rounded-full bg-blue-300" 
        />
        <motion.div 
          animate={{ x: [0, 30, -20, 0], y: [0, -50, 20, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[0%] -right-4 w-72 h-72 rounded-full bg-indigo-300" 
        />
        <motion.div 
          animate={{ x: [0, 30, -20, 0], y: [0, -50, 20, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -bottom-8 left-20 w-72 h-72 rounded-full bg-purple-300" 
        />
      </div>

      <div className="container-site relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Copy & CTA */}
          <div className="flex flex-col gap-8 max-w-2xl text-left">
            <FadeInLeft delay={0.1}>
              <h1 className="font-display text-display-lg-mobile md:text-display-xl text-on-surface leading-[1.05] tracking-tight">
                Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Future</span> of Enterprise Intelligence
              </h1>
            </FadeInLeft>

            <FadeInLeft delay={0.2}>
              <p className="font-body text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                LogixLoops delivers high-performance digital solutions through strategic engineering, AI integration, and tactical design for the world's most ambitious brands.
              </p>
            </FadeInLeft>

            <FadeInLeft delay={0.3}>
              <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                <Button href="/solutions" size="lg" className="px-8 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_16px_-4px_rgba(0,74,198,0.4)]" icon="arrow_forward" iconPosition="right">
                  Get Started
                </Button>
              </div>
            </FadeInLeft>

            {/* Engineering Pillars */}
            <FadeInLeft delay={0.4}>
              <div className="mt-4 pt-8 border-t border-outline-variant/30">
                <p className="text-sm text-on-surface-variant mb-4 font-medium">Core Engineering Pillars</p>
                <div className="flex flex-wrap items-center gap-6 text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">architecture</span>
                    <span className="font-body text-sm font-medium">Scalable Architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">security</span>
                    <span className="font-body text-sm font-medium">Zero-Trust Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">speed</span>
                    <span className="font-body text-sm font-medium">High Performance</span>
                  </div>
                </div>
              </div>
            </FadeInLeft>
          </div>

          {/* Right Column: Visual System */}
          <div className="relative h-[600px] hidden lg:block perspective-1000">
            <FadeInRight delay={0.2} className="absolute inset-0">
              
              {/* Main Dashboard Mockup */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[340px] z-20"
              >
                <GlassCard padding="none" className="w-full h-full p-4 border border-white/90 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] bg-white/70 backdrop-blur-[20px] rounded-2xl flex flex-col">
                  {/* Fake UI Header */}
                  <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-3 mb-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="text-xs text-on-surface-variant font-medium ml-2">Intelligence Core AI</div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-surface-container-low rounded-xl p-3 border border-white/50">
                      <div className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Efficiency</div>
                      <div className="text-xl font-bold text-primary">99.9%</div>
                    </div>
                    <div className="bg-surface-container-low rounded-xl p-3 border border-white/50">
                      <div className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Processing</div>
                      <div className="text-xl font-bold text-secondary">1.2ms</div>
                    </div>
                    <div className="bg-surface-container-low rounded-xl p-3 border border-white/50">
                      <div className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Uptime</div>
                      <div className="text-xl font-bold text-primary">100%</div>
                    </div>
                  </div>

                  {/* Fake Graph */}
                  <div className="h-32 bg-surface-container-low rounded-xl border border-white/50 p-3 relative overflow-hidden flex-1">
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/20 to-transparent" />
                    <svg className="w-full h-full absolute inset-0 p-3" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path className="stroke-primary animate-pulse" d="M0,80 Q20,20 40,60 T80,40 T100,10" fill="none" strokeWidth="2" />
                    </svg>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Floating Card 1: AI Node */}
              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-0 w-48 z-30"
              >
                <GlassCard padding="none" className="p-4 rounded-xl border border-white/90 bg-white/70 backdrop-blur-[20px] shadow-lg transform rotate-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-sm">memory</span>
                    </div>
                    <div className="text-sm font-bold text-on-surface">Neural Link</div>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary w-3/4 h-full rounded-full relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(0,74,198,0.8)]" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Floating Card 2: Security */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 -left-10 w-56 z-30"
              >
                <GlassCard padding="none" className="p-4 rounded-xl border border-white/90 bg-white/70 backdrop-blur-[20px] shadow-lg transform -rotate-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-sm">shield_lock</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-on-surface">Secure Protocol</div>
                      <div className="text-xs text-on-surface-variant">Active monitoring</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-primary bg-primary/10 px-2 py-1 rounded-md w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Encrypted
                  </div>
                </GlassCard>
              </motion.div>

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-30" viewBox="0 0 600 600">
                <path className="stroke-primary" d="M100,200 C300,200 300,400 500,400" fill="none" strokeDasharray="4 4" strokeWidth="1" />
                <circle className="fill-primary" cx="100" cy="200" r="3" />
                <circle className="fill-primary animate-pulse" cx="500" cy="400" r="3" />
              </svg>

            </FadeInRight>
          </div>

        </div>
      </div>
    </section>
  );
}
