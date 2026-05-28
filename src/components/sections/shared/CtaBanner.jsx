"use client";

import { Button } from "@/components/ui";
import { FadeInUp } from "@/components/motion";

export default function CtaBanner() {
  return (
    <section className="container-site py-stack-2xl relative overflow-hidden">
      <FadeInUp>
        <div className="relative rounded-[2.5rem] p-stack-xl md:p-stack-2xl text-center overflow-hidden border border-primary/20 shadow-glass-elevated group">
          {/* Immersive Background */}
          <div className="absolute inset-0 bg-surface-container-highest/30 z-0" />
          
          {/* Animated Gradients */}
          <div className="absolute top-[-50%] left-[-20%] w-[70%] h-[200%] bg-gradient-to-r from-primary/30 to-secondary/30 blur-[100px] animate-pulse-glow z-0 pointer-events-none group-hover:scale-110 transition-transform duration-[2s]" />
          <div className="absolute bottom-[-50%] right-[-20%] w-[60%] h-[200%] bg-gradient-to-l from-secondary/20 to-tertiary/20 blur-[120px] animate-pulse-glow z-0 pointer-events-none group-hover:scale-110 transition-transform duration-[3s]" style={{animationDelay: '1s'}} />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            {/* Trust Indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest/50 backdrop-blur-md border border-white/20 mb-8 shadow-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
              <span className="font-label text-label-sm text-on-surface tracking-widest uppercase font-semibold">
                Enterprise Grade Security & Scale
              </span>
            </div>

            <h2 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface mb-6 leading-tight tracking-tight">
              Ready to engineer your next <br className="hidden md:block" />
              <span className="text-gradient-primary">strategic advantage?</span>
            </h2>
            
            <p className="font-body text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
              Schedule a technical consultation with our senior architects to discuss your digital transformation objectives and blueprint your roadmap.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
              <Button href="/contact" size="lg" className="w-full sm:w-auto px-10 shadow-btn-primary-lg text-[16px] h-14">
                START CONSULTATION
              </Button>
              <Button href="/services" variant="ghost" size="lg" className="w-full sm:w-auto px-10 bg-surface-container-lowest/40 backdrop-blur-md hover:bg-surface-container-lowest/80 text-[16px] h-14" icon="arrow_forward" iconPosition="right">
                VIEW CAPABILITIES
              </Button>
            </div>
          </div>
        </div>
      </FadeInUp>
    </section>
  );
}
