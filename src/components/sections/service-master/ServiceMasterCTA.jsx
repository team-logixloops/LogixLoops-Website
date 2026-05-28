"use client";

import { FadeInUp } from "@/components/motion";
import Link from "next/link";

export default function ServiceMasterCTA({ service }) {
  if (!service) return null;

  return (
    <section className="py-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto mb-stack-xl relative overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-container to-secondary opacity-10" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-5" />
      
      <FadeInUp>
        <div className="relative z-10 bg-white/60 backdrop-blur-[24px] p-12 md:p-20 flex flex-col items-center text-center shadow-[0_20px_40px_rgba(0,0,0,0.08)] rounded-3xl border border-white/50">
          <h2 className="font-display text-headline-md md:text-display-lg text-on-surface mb-6 max-w-3xl tracking-tight">
            Ready to Build the Future of {service.shortTitle || service.title}?
          </h2>
          <p className="font-body text-body-lg text-on-surface-variant mb-10 max-w-2xl leading-relaxed">
            Partner with LogixLoops to engineer digital platforms that drive enterprise growth and define industry standards.
          </p>
          <Link href="/contact" className="inline-block bg-gradient-to-br from-primary-container to-secondary text-on-primary px-10 py-5 rounded-lg font-label text-label-caps uppercase tracking-widest shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all">
            Get Started
          </Link>
        </div>
      </FadeInUp>
    </section>
  );
}
