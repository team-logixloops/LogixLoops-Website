"use client";

import { FadeInLeft, FadeInRight } from "@/components/motion";

export default function AboutHero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center min-h-[80vh] pt-[140px] pb-stack-xl max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop relative z-10">
      <FadeInLeft className="md:col-span-7 space-y-stack-md z-10">
        <h1 className="font-display text-display-xl text-on-surface leading-[1.05] tracking-tight">
          Engineering the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Enterprise Intelligence</span>
        </h1>
        <p className="font-body text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          We build resilient, scalable digital architectures that empower visionary leaders to transform complexity into strategic advantage.
        </p>
      </FadeInLeft>

      <FadeInRight className="md:col-span-5 relative h-full min-h-[400px]">
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[24px] border border-white/30 rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.04)] transform md:translate-x-12 md:-translate-y-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-10 pointer-events-none" />
          <img 
            width={1200}
            height={900}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB55ku6Conor5aS5dtWmFo7Q0W5wBu4-ZlmFY0jZj_YUnNmWVXQ5ygQk4LNGtuMXthVXKW1MCsRCO6Xi6ROfDcT79f2dXdy39WRwUfk7WWW5fz897-9EsbS57KC4vwTqO0rFvZ1a5lSc_-Ofa2PEw6HAI73lN4kb6Ybv7Qd3CEWdYcGcSrpNCzY_9BGV8JQxQFKmbNPw-xG6FBJ08gJwn5g6J4tGKoI4K-7x5Bojz3HG1iY-f_Nv9V-kN9ONSFo93DWCFKSF_VM2XId" 
            alt="Abstract architectural concept"
            className="w-full h-full object-cover opacity-90 mix-blend-overlay"
          />
        </div>
      </FadeInRight>
    </section>
  );
}
