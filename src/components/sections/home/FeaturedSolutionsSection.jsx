"use client";

import { SectionHeader, GlassCard, Button } from "@/components/ui";
import { FadeInUp, FadeInLeft, FadeInRight } from "@/components/motion";
import { motion } from "framer-motion";

export default function FeaturedSolutionsSection() {
  return (
    <section className="container-site py-stack-2xl relative overflow-hidden">
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-xl items-center relative z-10">
        
        {/* Left: Content */}
        <div className="order-2 lg:order-1 flex flex-col justify-center">
          <FadeInLeft>
            <SectionHeader 
              overline="Platform Architecture"
              title="Next-Generation Enterprise Ecosystems" 
              description="We build fully integrated digital environments. From predictive AI workflows and real-time analytics to automated CI/CD pipelines, our solutions are engineered for unprecedented scale."
            />
            <div className="mt-8 flex flex-col gap-4">
              {[
                "High-frequency data processing & analytics",
                "Machine learning predictive workflows",
                "Automated zero-downtime deployment pipelines",
                "Microservices-based decoupled architectures"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[14px] text-primary">check</span>
                  </div>
                  <span className="font-body text-body-md text-on-surface-variant">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-stack-md">
              <Button href="/solutions" icon="arrow_forward" iconPosition="right">
                Explore Full Platforms
              </Button>
            </div>
          </FadeInLeft>
        </div>

        {/* Right: Layered Mockups / Motion Depth */}
        <div className="order-1 lg:order-2 relative h-[500px] w-full">
          <FadeInRight className="absolute inset-0">
            {/* Base Container */}
            <motion.div 
              className="absolute right-0 top-[10%] w-[85%] h-[80%] rounded-2xl bg-gradient-to-br from-surface-container-high to-surface border border-outline-variant/30 shadow-2xl overflow-hidden"
            >
              {/* Fake Code / Terminal Area */}
              <div className="w-full h-8 bg-inverse-surface/90 flex items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-error" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              </div>
              <div className="p-6 bg-inverse-surface h-full font-mono text-[12px] leading-relaxed text-[#A78BFA] opacity-80">
                <div>import {"{"} defineStrategy {"}"} from '@logixloops/core';</div>
                <div className="mt-2 text-[#34D399]">const system = defineStrategy({"{"}</div>
                <div className="ml-4 text-inverse-on-surface">nodes: 4096,</div>
                <div className="ml-4 text-inverse-on-surface">resilience: 'maximum',</div>
                <div className="ml-4 text-inverse-on-surface">ai_engine: 'generative_v4',</div>
                <div className="text-[#34D399]">{"}"});</div>
                <div className="mt-4 text-[#FBBF24]">await system.deploy();</div>
              </div>
            </motion.div>

            {/* Floating UI Card 1 (Analytics) */}
            <motion.div 
              animate={{ y: [-15, 10, -15] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[5%] top-[15%] w-[60%] h-[40%] z-20"
            >
              <GlassCard variant="elevated" padding="md" className="h-full border-white/40 shadow-glass-elevated">
                <div className="font-heading text-body-sm font-semibold mb-4">Live Traffic Flow</div>
                <div className="flex h-[60%] items-end gap-2">
                  {[40, 70, 45, 90, 65, 85, 100, 50].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-primary to-primary/30 rounded-t-sm" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Floating UI Card 2 (AI Node) */}
            <motion.div 
              animate={{ y: [15, -10, 15] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[5%] left-[15%] w-[70%] z-30"
            >
              <GlassCard variant="elevated" padding="md" className="border-white/50 shadow-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary animate-spin" style={{ animationDuration: '3s' }}>
                    sync
                  </span>
                </div>
                <div>
                  <div className="font-display text-body-lg font-bold text-on-surface">Predictive Model Training</div>
                  <div className="font-body text-body-sm text-on-surface-variant flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    Epoch 402 / 500 completed
                  </div>
                </div>
              </GlassCard>
            </motion.div>

          </FadeInRight>
        </div>

      </div>
    </section>
  );
}
