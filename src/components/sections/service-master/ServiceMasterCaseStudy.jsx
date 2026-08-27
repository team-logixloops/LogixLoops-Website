"use client";

import Link from "next/link";
import { FadeInUp } from "@/components/motion";
import { cn } from "@/lib/utils";
import { SECTION, CARD, accent } from "./tokens";

export default function ServiceMasterCaseStudy({ caseStudy, color }) {
  if (!caseStudy) return null;
  const a = accent(color);

  return (
    <section className={SECTION}>
      <FadeInUp>
        <div className={cn(CARD, "p-8 md:p-12 max-w-4xl mx-auto")}>
          <span
            className={cn(
              "font-label text-label-caps uppercase tracking-widest mb-6 block",
              a.text
            )}
          >
            Featured Work
          </span>
          <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
            {caseStudy.client}
          </h2>
          <p className="font-body text-body-lg text-on-surface-variant mb-8 leading-relaxed">
            {caseStudy.result}
          </p>
          <Link
            href="/work"
            className={cn(
              "font-body text-body-md inline-flex items-center gap-2 w-fit hover:gap-3 transition-all",
              a.text
            )}
          >
            Explore our work
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </FadeInUp>
    </section>
  );
}
