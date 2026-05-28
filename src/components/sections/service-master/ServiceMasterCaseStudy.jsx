"use client";

import { FadeInUp } from "@/components/motion";
import Link from "next/link";

export default function ServiceMasterCaseStudy({ caseStudy }) {
  if (!caseStudy) return null;

  return (
    <section className="py-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
      <FadeInUp>
        <div className="bg-surface-container rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-lg border border-outline-variant/30 group">
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <span className="font-label text-label-caps text-secondary mb-4 uppercase tracking-widest block">Featured Case Study</span>
            <h3 className="font-display text-headline-lg text-on-surface mb-4">{caseStudy.client}</h3>
            <p className="font-body text-body-lg text-on-surface-variant mb-8 leading-relaxed">
              {caseStudy.result}
            </p>
            <Link href="/case-studies" className="text-primary font-body text-body-md font-semibold inline-flex items-center gap-2 w-fit hover:gap-3 transition-all">
              Read the Full Case Study <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="md:w-1/2 relative min-h-[300px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-surface-container to-transparent z-10" />
            <img 
              src={caseStudy.image} 
              alt={caseStudy.client} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
          </div>
        </div>
      </FadeInUp>
    </section>
  );
}
