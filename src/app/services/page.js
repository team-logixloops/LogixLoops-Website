import Link from "next/link";
import ServicesInertiaGrid from "@/components/sections/services/ServicesInertiaGrid";
import { FadeInUpImmediate } from "@/components/motion";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { LINES } from "@/data/lines";
import { getKitsByLine } from "@/data/kits";
import { getAllPlans } from "@/data/plans";
import { cheapest, formatPrice } from "@/lib/pricing";
import { SERVICES_FAQS } from "@/data/faq";
import {
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  generateFaqSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

/* The cheapest way into a line, for the directory cards. */
const fromPrice = (line) => {
  const offers = getKitsByLine(line.slug);
  return formatPrice(cheapest(offers.length ? offers : getAllPlans()).price);
};

const SERVICES_DESCRIPTION =
  "Web and app development, branding, website redesign, SEO and AI visibility, AI automation and maintenance, sold as kits with published prices.";

export const metadata = buildMetadata({
  title: "Services: Web, App, Branding, SEO and AI",
  description: SERVICES_DESCRIPTION,
  path: "/services",
  keywords: [
    "digital agency services",
    "web and app development company",
    "branding agency",
    "website redesign services",
    "SEO and AI search optimization",
    "AI automation agency",
    "website maintenance services",
  ],
});

export default function ServicesOverviewPage() {
  return (
    <main className="min-h-[calc(100svh-120px)] pt-[120px] pb-stack-xl max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop flex flex-col gap-stack-lg relative z-10">
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Services", path: "/services" },
        ])}
      />
      <SchemaMarkup
        schema={generateFaqSchema(
          SERVICES_FAQS.map((faq) => ({
            question: faq.question,
            answer: faq.answer,
          }))
        )}
      />
      {/* The six lines as an enumerable list, an answer engine can read the
          directory without crawling all six detail routes. */}
      <SchemaMarkup
        schema={generateCollectionPageSchema({
          name: "LogixLoops services",
          description: SERVICES_DESCRIPTION,
          path: "/services",
          items: LINES.map((line) => ({
            name: line.label,
            description: line.summary,
            path: `/services/${line.slug}`,
          })),
        })}
      />

      {/* Two full viewports on one scroll: the headline below, with the nine
          tiles drifting around it, then the grid they settle into. The header
          delays here and INTRO_DELAY in ServicesInertiaGrid are a matched
          pair, heading lands, then the tiles fade up around it. */}
      <ServicesInertiaGrid>
        <header className="relative z-10 text-center max-w-2xl mx-auto pointer-events-none">
          <FadeInUpImmediate>
            <span className="font-label text-label-caps tracking-widest uppercase text-primary mb-4 block">
              Services
            </span>
          </FadeInUpImmediate>
          <FadeInUpImmediate delay={0.12}>
            <h1 className="font-display text-display-lg-mobile md:text-display-xl text-on-surface tracking-tight leading-[1.05] mb-stack-sm">
              Six ways to get your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                unfair advantage.
              </span>
            </h1>
          </FadeInUpImmediate>
          <FadeInUpImmediate delay={0.24}>
            <p className="font-body text-body-lg text-on-surface-variant">
              Web and app development, branding, website redesign, SEO and AI search visibility, AI and automation, and maintenance plans. Each line is sold as kits with published prices. Scroll to bring the grid home, then pick the one closest to what you need.
            </p>
          </FadeInUpImmediate>
        </header>
      </ServicesInertiaGrid>

      {/* The constellation above carries the six links, but nothing else,
          a tile is an icon and a title. This directory is where each line
          gets described: the pitch and starting price an answer engine
          quotes, and the plain scannable list a keyboard or reduced-motion
          visitor reaches without scrubbing a pinned stage. Three across, two
          deep. */}
      <section
        aria-labelledby="services-directory"
        className="border-t border-outline-variant/30 pt-stack-lg"
      >
        <div className="max-w-2xl mb-stack-lg">
          <h2
            id="services-directory"
            className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4"
          >
            The six, in plain text
          </h2>
          <p className="font-body text-body-lg text-on-surface-variant">
            Each line links to its kits, with what is included and what it
            costs. Most businesses start with one kit and add another later.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-gutter">
          {LINES.map((line) => (
            <li key={line.slug}>
              {/* `glow-sweep` is the shared hover treatment (globals.css): a
                  1px conic ring that travels the border, over the card's own
                  glass. It masks itself out on coarse pointers, so the tap
                  state on mobile stays clean. */}
              <Link
                href={`/services/${line.slug}`}
                /* No `backdrop-blur` here, deliberately, and this is why the
                   grid used to drag while you scrolled it. Eight cards each
                   carrying a 24px backdrop filter means eight sample-and-blur
                   passes, and because `AmbientGlows` is a *fixed* layer, what
                   sits behind each card changes on every single scroll frame,
                   so none of those passes can ever be cached. The cards sit on
                   a near-white surface, so an opaque tint reads the same. */
                className="glow-sweep group flex flex-col h-full rounded-2xl border border-outline-variant/30 bg-white/75 p-6 shadow-glass transition-[transform,background-color,border-color] duration-300 ease-out hover:-translate-y-1 hover:bg-white/95 hover:border-primary/30 motion-reduce:transform-none"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5 transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                  <span className="material-symbols-outlined text-[22px]">
                    {line.icon}
                  </span>
                </span>
                <span className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant mb-1">
                  {line.name}
                </span>
                <h3 className="font-display text-headline-md text-on-surface mb-3 transition-colors duration-300 group-hover:text-primary">
                  {line.label}
                </h3>
                <p className="font-body text-body-sm text-on-surface-variant mb-5 flex-1">
                  {line.pitch}
                </p>
                <span className="font-label text-[11px] uppercase tracking-widest text-primary">
                  From {fromPrice(line)}
                </span>
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-primary text-[18px] mt-5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none"
                >
                  arrow_forward
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* This block is the visible half of the FAQPage schema emitted above,
          the markup and the rendered answers have to match, so it cannot be
          dropped while the schema stands. It is also where the directory hands
          off to /process, /technology and /case-studies. */}
      <section
        aria-labelledby="services-faq"
        className="border-t border-outline-variant/30 pt-stack-lg"
      >
        <h2
          id="services-faq"
          className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface mb-stack-lg max-w-2xl"
        >
          Not sure which one you need?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {SERVICES_FAQS.map((faq) => (
            <div
              key={faq.id}
              className="glow-sweep rounded-2xl border border-outline-variant/30 bg-white/60 backdrop-blur-[24px] p-6 md:p-8 shadow-glass transition-[background-color,border-color] duration-300 hover:bg-white/85 hover:border-primary/25"
            >
              <h3 className="font-display text-headline-md text-on-surface mb-3">
                {faq.question}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <p className="font-body text-body-md text-on-surface-variant mt-stack-lg max-w-2xl">
          See{" "}
          <Link href="/process" className="text-primary hover:underline">
            how we run delivery
          </Link>
          , the{" "}
          <Link href="/technology" className="text-primary hover:underline">
            stack behind every build
          </Link>
          , or{" "}
          <Link href="/work" className="text-primary hover:underline">
            our work in production
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
