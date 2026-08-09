"use client";

import Link from "next/link";
import { FadeInLeft, FadeInRight } from "@/components/motion";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";
import { accent } from "./tokens";

export default function ServiceMasterHero({ service }) {
  if (!service) return null;

  const a = accent(service.color);

  return (
    <section className="relative flex items-center overflow-hidden px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto pt-[120px] pb-stack-xl min-h-[70vh]">
      <div
        className={cn(
          "absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[100px] -z-10 pointer-events-none opacity-50",
          a.glow
        )}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter w-full relative z-10 items-center">
        <FadeInLeft className="lg:col-span-7 flex flex-col justify-center">
          <Breadcrumbs />

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-outline-variant/30 bg-surface/50 backdrop-blur-md mb-6 w-fit mt-4">
            <span className={cn("material-symbols-outlined text-[16px]", a.text)}>
              {service.icon}
            </span>
            <span className="font-label text-label-caps text-on-surface-variant uppercase tracking-widest">
              {service.shortTitle}
            </span>
          </div>

          <h1 className="font-display text-display-lg-mobile md:text-display-lg lg:text-display-xl text-on-surface mb-6 tracking-tight leading-[1.05] text-balance">
            {service.title}
          </h1>

          <p
            className={cn(
              "font-display text-headline-lg-mobile md:text-headline-lg mb-6 text-transparent bg-clip-text bg-gradient-to-r",
              a.gradient
            )}
          >
            {service.summary}
          </p>

          <p className="font-body text-body-lg text-on-surface-variant mb-10 max-w-2xl leading-relaxed">
            {service.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className={cn(
                "px-8 py-4 rounded-lg font-label text-label-caps uppercase tracking-widest text-on-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:scale-[0.98] transition-transform text-center bg-gradient-to-r",
                a.gradient
              )}
            >
              Consult an Architect
            </Link>
            <Link
              href="/case-studies"
              className="bg-white/60 backdrop-blur-[24px] border border-white/80 text-on-surface px-8 py-4 rounded-lg font-label text-label-caps uppercase tracking-widest hover:bg-white/80 transition-all text-center"
            >
              View Portfolio
            </Link>
          </div>
        </FadeInLeft>

        <FadeInRight className="lg:col-span-5 relative hidden lg:block">
          <div className="relative aspect-square w-full rounded-3xl border border-outline-variant/30 bg-white/60 backdrop-blur-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.06)] flex items-center justify-center overflow-hidden">
            <div className={cn("absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl", a.glow)} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/services/${service.id}.svg`}
              alt=""
              width={64}
              height={64}
              className="relative w-[46%] h-auto select-none"
              draggable={false}
            />
          </div>
        </FadeInRight>
      </div>
    </section>
  );
}
