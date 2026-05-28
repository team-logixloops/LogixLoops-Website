"use client";

import { FadeInLeft, FadeInRight } from "@/components/motion";

export default function AboutPhilosophy() {
  return (
    <section className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop grid-cols-1 md:grid-cols-2 gap-gutter items-center py-stack-xl">
      <FadeInLeft className="order-2 md:order-1 bg-white/70 backdrop-blur-[24px] border border-white/30 shadow-sm p-8 rounded-2xl relative group">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2f-ewL0vtK3F9yQR0CaKv7DDWzp4olrIemRV0RqSylGD6fqZ2QKexe3h-sPE1SgM0epNQtaCYOcxYJdorLSjNiRZkB4It3vHu8aY1Rqxw6UjV8OlTy68V4WVWTvs5shignNDK6sa3SMmG4ppNUGbGE_526FgyxNefYj8--5Z3xGef_Nto80p27leN1oXXYXCV0pwtDVxzF7kHu0-B0ruxDaIlF7ZobWxq8yHftWQqNT_XFCIWXvlawvlbYueteXX_6OZAMMR6CLXs" 
          alt="Modern corporate architecture"
          className="w-full h-64 object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-700"
        />
      </FadeInLeft>

      <FadeInRight className="order-1 md:order-2 space-y-stack-sm pl-0 md:pl-12">
        <h2 className="font-display text-headline-lg text-on-surface">The LogixLoops Narrative</h2>
        <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
          Founded on the principle that true enterprise agility requires structural perfection, LogixLoops emerged from a collective of systems architects dissatisfied with the status quo. We don't just write code; we engineer atmospheric digital environments.
        </p>
        <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
          Our approach marries clinical precision with premium craftsmanship, ensuring that every interface, every API, and every data pipeline operates with the quiet power of a finely tuned machine.
        </p>
      </FadeInRight>
    </section>
  );
}
