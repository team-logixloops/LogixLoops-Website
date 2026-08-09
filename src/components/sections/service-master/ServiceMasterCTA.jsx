"use client";

import Link from "next/link";
import { FadeInUp } from "@/components/motion";
import { cn } from "@/lib/utils";
import { accent } from "./tokens";

export default function ServiceMasterCTA({ service }) {
  if (!service) return null;
  const a = accent(service.color);

  return (
    <section className="py-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto mb-stack-xl">
      <FadeInUp>
        <div className="relative overflow-hidden rounded-3xl border border-outline-variant/30 bg-white/60 backdrop-blur-[24px] p-8 sm:p-12 md:p-20 flex flex-col items-center text-center shadow-glass">
          <div className={cn("absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl", a.glow)} />

          {/*
            Oversized fox bled off the left edge as texture. The knockout
            variant, not `logo-fox.svg`, that one paints an opaque white
            plate under the mark, which at this size would punch a white
            rectangle through the panel's glass.
            eslint-disable-next-line @next/next/no-img-element
          */}
          <img
            src="/brand/logo-fox-knockout.svg"
            alt=""
            aria-hidden="true"
            width={948}
            height={746}
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute -left-16 -bottom-12 h-[130%] w-auto max-w-none opacity-[0.05] select-none"
          />

          <h2 className="relative font-display text-headline-lg-mobile md:text-display-lg text-on-surface mb-6 max-w-3xl tracking-tight text-balance">
            Ready to build with {service.shortTitle}?
          </h2>
          <p className="relative font-body text-body-lg text-on-surface-variant mb-10 max-w-2xl leading-relaxed">
            Partner with LogixLoops to engineer platforms that hold up under enterprise load.
          </p>
          <Link
            href="/contact"
            className={cn(
              "relative inline-block text-on-primary px-10 py-5 rounded-lg font-label text-label-caps uppercase tracking-widest shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all bg-gradient-to-r",
              a.gradient
            )}
          >
            Get Started
          </Link>
        </div>
      </FadeInUp>
    </section>
  );
}
