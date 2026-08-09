"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem, Parallax } from "@/components/motion";
import PageHero from "@/components/sections/shared/PageHero";
import PageSurface from "@/components/sections/shared/PageSurface";
import { PRICING_FAQS } from "@/data/faq";

const STARTING_PRICES = [
  {
    title: "Web Platform",
    price: "Scoped",
    description: "A web application with real users, real data, and somebody's revenue running through it.",
    icon: "web",
    features: ["Next.js and React front end", "Node.js or Go behind it", "Database design, not just a schema", "Third-party integrations"]
  },
  {
    title: "Mobile Application",
    price: "By complexity",
    description: "iOS and Android, built offline-first because the network is not your user's problem.",
    icon: "smartphone",
    features: ["React Native, Swift or Kotlin", "Both stores, submitted by us", "Offline sync designed first", "Hardware and biometric access"]
  },
  {
    title: "AI Integration",
    price: "By data",
    description: "The pipeline, the evaluation set and the fallback, not just the model call.",
    icon: "psychology",
    features: ["RAG over your own documents", "Predictive models with an eval set", "Data pipeline architecture", "Cost per call, quoted upfront"]
  },
  {
    title: "Legacy Modernisation",
    price: "By phase",
    description: "Moving off a system you cannot switch off, without switching it off.",
    icon: "domain",
    features: ["Strangler Fig migration", "Service extraction, one at a time", "Cloud architecture and IaC", "A reserved delivery squad"]
  }
];

const COST_DRIVERS = [
  { title: "Technical complexity", description: "How hard the problem genuinely is. Throughput, consistency requirements, and whether the interesting part is the algorithm or the plumbing around it.", icon: "architecture" },
  { title: "Integration surface", description: "Every system we have to talk to that we do not control. This is the single most underestimated line in software estimates, every time.", icon: "cable" },
  { title: "Deadline pressure", description: "A compressed timeline means parallel tracks and more coordination overhead per unit of output. Speed is buyable. It is just not free.", icon: "speed" }
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Ambient background glows. Two layers at different rates, the lower
          one moves faster, because a single parallax layer reads as a bug
          (something slid) while two at different speeds read as depth. */}
      <Parallax
        amount={6}
        className="absolute top-0 left-1/4 w-[800px] max-w-full h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"
      />
      <Parallax
        amount={12}
        className="absolute bottom-1/4 right-0 w-[800px] max-w-full h-[800px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10"
      />

      {/* 1. Pricing Hero, fewest contour lines on the site. A page whose job
          is to help someone make a decision gets the quietest ground.

          The emphasis moved from "Project" to the second sentence. The gradient
          used to land on the mechanism (how it is priced) while the claim that
          actually matters, what it is worth, sat unstyled beside it. */}
      <PageHero
        preset="pricing"
        eyebrow="Engagement models"
        title="No tiers."
        accent="No mystery invoices."
        lead="The same feature list costs wildly different amounts depending on what it has to plug into, which is why nobody honest can put a price on this page. What we can do is show you the two ways to engage, what drives the number, and exactly when you get a firm one."
        cue="What drives cost"
      />

      <PageSurface>
        {/* 2. Baseline Estimates Grid */}
        <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto mb-stack-xl relative z-10 w-full">
          <h2 className="font-display text-headline-md text-center text-on-surface mb-12 font-bold tracking-tight">What people usually come to us for</h2>
        
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {STARTING_PRICES.map((item, idx) => (
              <StaggerItem key={idx} className="relative z-10">
                <div className="level-gauge h-full p-8 flex flex-col rounded-2xl transition-all duration-300 bg-surface-container-lowest/60 backdrop-blur-xl border border-outline-variant/30 hover:shadow-[0_30px_60px_-12px_rgba(0,23,75,0.1)] hover:border-primary/20 hover:-translate-y-2 group">
                
                  <div className="w-12 h-12 rounded-xl bg-surface-variant flex items-center justify-center text-on-surface mb-6 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>

                  <div className="mb-6 pb-6 border-b border-outline-variant/30">
                    <h3 className="font-display text-[22px] leading-[1.3] mb-2 font-semibold text-on-surface md:min-h-[3.6rem]">{item.title}</h3>
                    <p className="font-body text-sm text-on-surface-variant md:min-h-[5rem]">{item.description}</p>

                    <div className="mt-6">
                      <span className="font-label text-[11px] text-on-surface-variant uppercase tracking-widest block mb-1">Priced</span>
                      <span className="font-display text-headline-md tracking-tighter text-primary font-semibold leading-tight">{item.price}</span>
                    </div>
                  </div>

                  <ul className="flex-grow space-y-3 mb-8">
                    {item.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[18px] mt-0.5 text-primary">check</span>
                        <span className="font-body text-sm text-on-surface-variant">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-4">
                     <Button 
                       href="/contact" 
                       variant="outline"
                       className="w-full justify-center group-hover:border-primary group-hover:text-primary"
                     >
                       Get this scoped
                     </Button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <p className="text-center font-body text-sm text-on-surface-variant mt-8 max-w-2xl mx-auto">
            Final figures come out of technical discovery and architectural mapping, and are based on your requirements rather than on a template. Nobody is asked to commit to a number before they have seen the brief it is attached to.
          </p>
        </section>

        {/* 3. Cost Drivers */}
        <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto mb-stack-xl relative z-10 w-full pt-12">
          <div className="bg-surface-container-lowest/40 backdrop-blur-md border border-outline-variant/20 rounded-3xl p-10 md:p-16 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[80px] pointer-events-none -z-10"></div>
           
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
               <div className="lg:col-span-5">
                 <h2 className="font-display text-headline-lg text-on-surface mb-6 font-bold tracking-tight">Three things move the number</h2>
                 <p className="font-body text-body-lg text-on-surface-variant mb-8">
                   Not the feature count. Every quote we send breaks down against these three, so you can see which one is expensive and decide whether you want to pay for it.
                 </p>
                 <Button href="/contact" variant="primary">Get a written quote</Button>
               </div>
             
               <div className="lg:col-span-7 grid gap-6">
                 {COST_DRIVERS.map((driver, idx) => (
                   <FadeInUp key={idx} delay={idx * 0.1}>
                     <div className="level-gauge flex gap-4 p-6 rounded-2xl bg-surface/50 border border-outline-variant/30 hover:border-primary/30 transition-colors">
                       <div className="w-12 h-12 shrink-0 rounded-full bg-surface-container flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined">{driver.icon}</span>
                       </div>
                       <div>
                         <h3 className="font-display text-xl text-on-surface font-semibold mb-2">{driver.title}</h3>
                         <p className="font-body text-sm text-on-surface-variant">{driver.description}</p>
                       </div>
                     </div>
                   </FadeInUp>
                 ))}
               </div>
             </div>
          </div>
        </section>

        {/* 4. Engagement Models, concrete commitments, not price tags. */}
        <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto mb-stack-xl relative z-10 w-full">
          <div className="max-w-2xl mb-stack-lg">
            <h2 className="font-display text-headline-lg text-on-surface mb-6 font-bold tracking-tight">
              Two ways to engage
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant">
              Pick by how much of the problem is already understood. Both carry
              the same delivery commitments, and both end with you owning
              everything.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/60 backdrop-blur-xl p-8">
              <h3 className="font-display text-[22px] text-on-surface font-semibold mb-3">
                Dedicated Squad
              </h3>
              <p className="font-body text-body-md text-on-surface-variant mb-6">
                A standing team billed on a flat monthly retainer. You get fixed
                capacity and velocity with no hourly timesheets. Best when the
                roadmap is long and the requirements will keep moving.
              </p>
              <ul className="space-y-3">
                {[
                  "Integrated into your Jira/Linear and Slack/Teams",
                  "Attends your standups as one team",
                  "Three-month minimum, rolling thereafter",
                  "Capacity is reserved, not shared across clients",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[18px] mt-0.5 text-primary">check</span>
                    <span className="font-body text-sm text-on-surface-variant">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/60 backdrop-blur-xl p-8">
              <h3 className="font-display text-[22px] text-on-surface font-semibold mb-3">
                Scoped Programme
              </h3>
              <p className="font-body text-body-md text-on-surface-variant mb-6">
                A fixed figure against a written architecture brief, delivered in
                phases. Best when the outcome is well defined, a migration, a
                launch, a compliance deadline.
              </p>
              <ul className="space-y-3">
                {[
                  "Quote fixed for the scope described in the brief",
                  "Phased delivery with defined acceptance per phase",
                  "Change requests re-priced explicitly, never absorbed silently",
                  "Typical enterprise transformation runs 6–12 months",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[18px] mt-0.5 text-primary">check</span>
                    <span className="font-body text-sm text-on-surface-variant">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-md p-8">
            <h3 className="font-display text-[22px] text-on-surface font-semibold mb-4">
              Included in every engagement
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Working software every two weeks from Sprint 1",
                "Architecture documentation and decision records",
                "Test coverage and CI/CD pipelines",
                "Open-source stack, no proprietary runtime",
                "100% IP, source, and infrastructure ownership on handover",
                "Production handover with runbooks",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[18px] mt-0.5 text-primary">check</span>
                  <span className="font-body text-sm text-on-surface-variant">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4b. Side-by-side comparison. A table beats two prose columns for the
            "which one do I pick" question, and it is the format AI answer
            engines quote most readily. */}
        <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto mb-stack-xl relative z-10 w-full">
          <h2 className="font-display text-headline-lg text-on-surface mb-stack-lg font-bold tracking-tight max-w-2xl">
            Side by side
          </h2>

          {/* The table has a 640px floor, so below that it has to scroll inside
              this box. `no-scrollbar` stops a swipe past its right edge from
              being handed to the browser as a back-navigation. */}
          <div
            tabIndex={0}
            role="region"
            aria-label="Engagement model comparison, scrolls horizontally"
            className="overflow-x-auto no-scrollbar rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/60 backdrop-blur-xl"
          >
            <table className="w-full border-collapse min-w-[640px]">
              <caption className="sr-only">
                Comparison of LogixLoops Dedicated Squad and Scoped Programme
                engagement models
              </caption>
              <thead>
                <tr className="border-b border-outline-variant/30">
                  <th scope="col" className="text-left font-label text-label-caps uppercase tracking-widest text-on-surface-variant p-6">
                    &nbsp;
                  </th>
                  <th scope="col" className="text-left font-display text-[20px] text-on-surface font-semibold p-6">
                    Dedicated Squad
                  </th>
                  <th scope="col" className="text-left font-display text-[20px] text-on-surface font-semibold p-6">
                    Scoped Programme
                  </th>
                </tr>
              </thead>
              <tbody className="font-body text-body-md">
                {[
                  ["Billing", "Flat monthly retainer", "Fixed price against a written brief"],
                  ["Best for", "Long roadmaps, moving requirements", "A defined outcome or deadline"],
                  ["Minimum", "Three months, rolling after", "Scoped per phase"],
                  ["Scope changes", "Absorbed into the next sprint", "Re-priced explicitly"],
                  ["Team", "Reserved capacity, not shared", "Assigned per phase"],
                  ["Typical length", "Ongoing", "Six to twelve months"],
                ].map(([label, squad, programme]) => (
                  <tr key={label} className="border-b border-outline-variant/20 last:border-0">
                    <th scope="row" className="text-left align-top font-label text-label-caps uppercase tracking-widest text-on-surface-variant p-6 whitespace-nowrap">
                      {label}
                    </th>
                    <td className="align-top text-on-surface-variant p-6">{squad}</td>
                    <td className="align-top text-on-surface-variant p-6">{programme}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Pricing FAQ, mirrored into FAQPage schema from pricing/layout.js. */}
        <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto mb-stack-xl relative z-10 w-full">
          <h2 className="font-display text-headline-lg text-on-surface mb-stack-lg font-bold tracking-tight max-w-2xl">
            Pricing questions, answered
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRICING_FAQS.map((faq) => (
              <div
                key={faq.id}
                className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/60 backdrop-blur-xl p-8"
              >
                <h3 className="font-display text-xl text-on-surface font-semibold mb-3">
                  {faq.question}
                </h3>
                <p className="font-body text-body-md text-on-surface-variant">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <p className="font-body text-body-md text-on-surface-variant mt-stack-lg max-w-2xl">
            More on{" "}
            <Link href="/process" className="text-primary hover:underline">
              how we run delivery
            </Link>
            , or see the{" "}
            <Link href="/faq" className="text-primary hover:underline">
              full FAQ
            </Link>
            .
          </p>
        </section>
      </PageSurface>
    </div>
  );
}
