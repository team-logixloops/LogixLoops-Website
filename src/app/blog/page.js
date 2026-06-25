"use client";

import Link from "next/link";
import { FadeInUp } from "@/components/motion";

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-[-1] bg-ambient-glow-cyan pointer-events-none opacity-20"></div>
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <section className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto text-center relative w-full min-h-[80vh]">
        <FadeInUp>
          <span className="font-label text-label-caps text-secondary tracking-widest uppercase mb-6 block">
            The Hub
          </span>
          <h1 className="font-display text-display-xl text-on-surface mb-8 max-w-4xl mx-auto tracking-tight">
            Engineering <span className="text-primary">Insights</span>
          </h1>
          
          <div className="max-w-2xl mx-auto p-1 relative group mt-12">
            {/* Animated border glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-700 animate-gradient-xy"></div>
            
            {/* Glass Card */}
            <div className="relative bg-surface-container-lowest/40 backdrop-blur-2xl border border-outline-variant/30 rounded-3xl p-10 md:p-16 shadow-glass-elevated">
              <span className="material-symbols-outlined text-[48px] text-primary mb-6 block">
                architecture
              </span>
              <h2 className="font-display text-headline-lg text-on-surface mb-4">
                Launching Soon
              </h2>
              <p className="font-body text-body-lg text-on-surface-variant mb-10 leading-relaxed">
                We are meticulously crafting a library of deep technical dives, architectural patterns, and operational philosophies. Our engineering insights hub is currently under construction.
              </p>
              
              <Link 
                href="/contact" 
                className="btn-primary inline-flex items-center gap-2 font-label text-label-caps px-8 py-4 rounded-full uppercase tracking-widest"
              >
                <span>Partner With Us</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </FadeInUp>
      </section>
    </div>
  );
}
