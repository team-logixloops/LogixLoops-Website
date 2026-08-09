import Link from "next/link";
import { ScrollTimeline } from "@/components/ui";
import { FadeInUp } from "@/components/motion";
import ContactForm from "./ContactForm";

// Server Component. Everything below the form is server-rendered so the page
// ships real crawlable copy, it used to be a single "use client" route and
// reached the crawler with ~59 words of content.
const ENGAGEMENT_STEPS = [
  {
    id: "discovery-call",
    marker: "Step 01",
    icon: "forum",
    title: "Discovery call",
    body: "Forty-five minutes with a senior engineer, not a salesperson. We map what you have, what it costs you today, and where it breaks under load.",
    meta: "Within one business day",
  },
  {
    id: "technical-scope",
    marker: "Step 02",
    icon: "architecture",
    title: "Technical scope",
    body: "We return a written architecture brief: proposed stack, service boundaries, integration surface, delivery phases, and the risks we can see from here.",
    meta: "Written brief, yours to keep",
  },
  {
    id: "sprint-one",
    marker: "Step 03",
    icon: "rocket_launch",
    title: "Sprint one",
    body: "Engagements start with a two-week sprint that ships working software. You review real output before committing to the full programme.",
    meta: "Two weeks, working software",
  },
];

export default function ContactPage() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      {/*
        Watermark rather than a second lockup: the navbar is showing the mark
        30px above this, so what the page wants here is texture, not another
        signature. Knockout variant so the fur stays transparent.
        eslint-disable-next-line @next/next/no-img-element
      */}
      <img
        src="/brand/logo-fox-knockout.svg"
        alt=""
        aria-hidden="true"
        width={948}
        height={746}
        className="pointer-events-none select-none absolute -right-32 top-24 w-[720px] max-w-none opacity-[0.045] -z-10 hidden lg:block"
      />
      <main className="flex-grow pt-[120px] pb-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg lg:gap-gutter">

          {/* Left Column: Context & Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <FadeInUp>
                <header className="mb-8">
                  <h1 className="font-display text-display-xl text-on-surface mb-4 tracking-tight">
                    Tell us what&apos;s <span className="text-primary">breaking.</span>
                  </h1>
                  <p className="font-body text-body-lg text-on-surface-variant max-w-md">
                    Or what you want to build. Either way you reach an engineer, the first conversation is technical rather than commercial, and you leave with a written brief you keep.
                  </p>
                </header>
              </FadeInUp>

              {/* Compact Contact Detail Cards */}
              <FadeInUp delay={0.1}>
                {/* The cards below carry h3 labels; without this h2 the page
                    jumped straight from h1 to h3. */}
                <h2 className="font-label text-label-caps text-on-surface uppercase tracking-widest mb-4">
                  Reach us directly
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  <a href="mailto:logixloops@gmail.com" className="dispatch bg-surface-container-lowest/40 backdrop-blur-md border border-outline-variant/30 p-4 rounded-xl flex flex-col gap-3 group hover:bg-surface-container-lowest hover:border-primary/40 transition-all duration-300">
                    <div data-dispatch className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[16px] filled">mail</span>
                    </div>
                    <div>
                      <h3 className="font-label text-[10px] text-outline-variant tracking-widest uppercase mb-0.5">Email</h3>
                      <p className="font-body text-sm text-on-surface font-medium group-hover:text-primary transition-colors">logixloops@gmail.com</p>
                    </div>
                  </a>

                  <a href="tel:+919216185861" className="dispatch bg-surface-container-lowest/40 backdrop-blur-md border border-outline-variant/30 p-4 rounded-xl flex flex-col gap-3 group hover:bg-surface-container-lowest hover:border-primary/40 transition-all duration-300">
                    <div data-dispatch className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[16px] filled">call</span>
                    </div>
                    <div>
                      <h3 className="font-label text-[10px] text-outline-variant tracking-widest uppercase mb-0.5">Support</h3>
                      <p className="font-body text-sm text-on-surface font-medium group-hover:text-primary transition-colors">+91 92161 85861</p>
                    </div>
                  </a>

                  <a href="https://wa.me/919216185861" target="_blank" rel="noopener noreferrer" className="dispatch sm:col-span-2 bg-primary/5 backdrop-blur-md border border-primary/20 p-4 rounded-xl flex items-center justify-between group hover:bg-primary/10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[16px]">forum</span>
                      </div>
                      <div>
                        <h3 className="font-body text-sm text-on-surface font-medium group-hover:text-primary transition-colors">Priority WhatsApp</h3>
                        <p className="font-body text-xs text-on-surface-variant">Direct line to solutions team</p>
                      </div>
                    </div>
                    <span data-dispatch className="material-symbols-outlined text-primary text-[18px]">arrow_forward</span>
                  </a>
                </div>
              </FadeInUp>
            </div>

            {/* Bottom Row: Socials & Location inline */}
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-outline-variant/30 pt-6">
              {/* The LinkedIn button next to this one pointed at `#`. A social
                  link that goes nowhere on the contact page is worse than one
                  fewer icon, so it is gone until the profile exists. Add it
                  back here, in `SOCIAL_LINKS`, and in the schema `sameAs` on
                  the same day. */}
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/logixloops.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-surface-container-lowest/50 text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all group shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                  <span className="font-body text-xs font-medium">Instagram</span>
                </a>
              </div>

              {/* Both facts, together. The city is what a local search matches
                  against; the markets are what stops a prospect in London
                  assuming we only work in Rajasthan. */}
              <div className="flex flex-col items-start sm:items-end gap-1">
                <div className="flex items-center gap-1.5 bg-surface-variant/30 px-3 py-1.5 rounded-lg border border-outline-variant/30 shadow-sm">
                  <span className="material-symbols-outlined text-primary text-[14px] filled">location_on</span>
                  <span className="font-body text-xs font-semibold text-on-surface">Jaipur, Rajasthan, India</span>
                </div>
                <span className="font-body text-[11px] text-on-surface-variant">
                  Working with teams in India, the US, the UK and the UAE
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-step Form */}
          <div className="lg:col-span-7 flex flex-col">
            <ContactForm />
          </div>
        </div>

        {/* What happens after you submit, server-rendered, because the three
            steps below are the strongest argument on the page for sending the
            form and they should not depend on JavaScript. */}
        <section
          aria-labelledby="what-happens-next"
          className="mt-stack-xl pt-stack-lg border-t border-outline-variant/30"
        >
          <div className="max-w-2xl mb-stack-lg">
            <h2
              id="what-happens-next"
              className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4"
            >
              What happens next
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant">
              Every enquiry is read by an engineer. We reply within one business day,
              and the first conversation is technical, not commercial.
            </p>
          </div>

          {/* Three columns became a vertical rail. These steps are separated
              by *time*, a call, then a brief, then a sprint, and reading
              down a rail is how time is read. Side by side they were three
              equal cards with no order implied beyond a small number in the
              corner, and on anything narrower than `lg` they stacked into
              exactly this shape anyway, just without the rail joining them.

              Vertical is also the orientation this site reserves for a
              sequence whose steps carry an argument, as against the
              horizontal pipeline on /security. Nothing here is revealed by
              the animation: every step is in the server HTML, which is the
              whole reason this block is not a client component. */}
          <ScrollTimeline
            label="What happens after you send an enquiry"
            items={ENGAGEMENT_STEPS}
          />

          <p className="font-body text-body-md text-on-surface-variant mt-stack-lg max-w-2xl">
            Not ready for a call? Read{" "}
            <Link href="/process" className="text-primary hover:underline">
              how we run an engagement
            </Link>
            , browse{" "}
            <Link href="/case-studies" className="text-primary hover:underline">
              our case studies
            </Link>
            , or check the{" "}
            <Link href="/faq" className="text-primary hover:underline">
              frequently asked questions
            </Link>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
