import Link from "next/link";
import PageHero from "@/components/sections/shared/PageHero";
import PageSurface from "@/components/sections/shared/PageSurface";
import { SectionHeader } from "@/components/ui";
import PlanCard from "@/components/sections/kits/PlanCard";
import PromiseStrip from "@/components/sections/kits/PromiseStrip";
import StudioCta from "@/components/sections/kits/StudioCta";
import { SECTION } from "@/components/sections/service-master/tokens";
import { getAllLines } from "@/data/lines";
import { getKitsByLine } from "@/data/kits";
import { getAllPlans } from "@/data/plans";
import { PRICING_FAQS } from "@/data/faq";
import { CURRENCY_NOTE, formatInr, formatUsd } from "@/lib/pricing";

/*
 * The price list. Server-rendered from the kit and plan records, so every
 * figure here is the one the kit page, the card, the schema and llms.txt
 * show. /kits sells the kits one card at a time; this page is the table a
 * buyer compares, and the terms that sit behind every price.
 */

const LEAD =
  "Every LogixLoops kit has a published starting price, a fixed scope and a timeline. Prices in rupees are for businesses in India, and prices in US dollars apply everywhere else. The price only moves if the scope does, and you approve that in writing first.";

/* What makes a project cost more than its kit's starting price. Each is a
   statement of policy, so the cards take `rule-draw`. */
const PRICE_MOVERS = [
  {
    icon: "add_circle",
    title: "More of it",
    description:
      "More pages, products, screens or automations than the kit includes. Each kit page prices its add-ons, so you can see the cost before you ask.",
  },
  {
    icon: "cable",
    title: "Things we connect to",
    description:
      "Systems outside the kit, such as an ERP, a booking engine or older software. We price each connection in writing once we have seen it.",
  },
  {
    icon: "speed",
    title: "A tighter deadline",
    description:
      "Launching faster than the kit's timeline means more people at once. It is possible, and the quote says exactly what it adds.",
  },
];

const TH = "text-left font-label text-label-caps uppercase tracking-widest text-on-surface-variant p-4 md:p-6";
const TD = "align-top p-4 md:p-6";

function PriceTable({ line }) {
  const kits = getKitsByLine(line.slug);

  return (
    <div className="mb-stack-lg">
      <h3 className="mb-4 font-display text-headline-md text-on-surface">
        <Link href={`/services/${line.slug}`} className="hover:text-primary transition-colors">
          {line.label}
        </Link>
        <span className="ml-3 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
          {line.name}
        </span>
      </h3>
      {/* The table has a 640px floor, so below that it scrolls inside this
          box. `no-scrollbar` stops a swipe past its right edge from being
          handed to the browser as a back-navigation. */}
      <div
        tabIndex={0}
        role="region"
        aria-label={`${line.label} prices, scrolls horizontally`}
        className="overflow-x-auto no-scrollbar rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/85"
      >
        <table className="w-full min-w-[640px] border-collapse">
          <caption className="sr-only">Starting prices for LogixLoops {line.label} kits</caption>
          <thead>
            <tr className="border-b border-outline-variant/30">
              <th scope="col" className={TH}>Kit</th>
              <th scope="col" className={TH}>Timeline</th>
              <th scope="col" className={TH}>From, international</th>
              <th scope="col" className={TH}>From, India</th>
            </tr>
          </thead>
          <tbody className="font-body text-body-md">
            {kits.map((kit) => (
              <tr key={kit.slug} className="border-b border-outline-variant/20 last:border-0">
                <th scope="row" className={`${TD} text-left font-normal`}>
                  <Link
                    href={`/kits/${kit.slug}`}
                    className="font-display text-lg text-on-surface hover:text-primary transition-colors"
                  >
                    {kit.name}
                  </Link>
                  <span className="mt-1 block text-body-sm text-on-surface-variant first-letter:uppercase">
                    {kit.promise}
                  </span>
                  {kit.priceNote && (
                    <span className="mt-1 block text-body-sm text-on-surface-variant">{kit.priceNote}.</span>
                  )}
                </th>
                <td className={`${TD} whitespace-nowrap text-on-surface-variant`}>{kit.timeline}</td>
                <td className={`${TD} whitespace-nowrap font-display text-lg font-semibold text-primary`}>
                  {formatUsd(kit.price.usd)}
                </td>
                <td className={`${TD} whitespace-nowrap font-display text-lg font-semibold text-primary`}>
                  {formatInr(kit.price.inr)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const lines = getAllLines().filter((line) => getKitsByLine(line.slug).length > 0);

  return (
    <>
      <PageHero
        preset="pricing"
        eyebrow="Pricing"
        title="Prices on the box."
        accent="No quote to wait for."
        lead={LEAD}
        cue="See every price"
      />

      <PageSurface>
        <section aria-labelledby="price-list" className={SECTION}>
          <div className="max-w-2xl mb-stack-lg">
            <h2
              id="price-list"
              className="mb-4 font-display text-headline-lg-mobile md:text-headline-lg text-on-surface"
            >
              Every kit and its starting price
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant">
              {CURRENCY_NOTE} Each kit page lists exactly what the price includes, the add-ons and their prices.
            </p>
          </div>
          {lines.map((line) => (
            <PriceTable key={line.slug} line={line} />
          ))}
        </section>

        <section aria-labelledby="plans" className={SECTION}>
          <div className="max-w-2xl mb-stack-lg">
            <h2 id="plans" className="mb-4 font-display text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Monthly Pit Crew plans
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant">
              For after launch: updates, fixes, speed and search work, or a reserved team.{" "}
              <Link href="/services/maintenance-and-support" className="text-primary underline-offset-4 hover:underline">
                More about Pit Crew
              </Link>
              .
            </p>
          </div>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
            {getAllPlans().map((plan) => (
              <PlanCard key={plan.slug} plan={plan} />
            ))}
          </div>
        </section>

        <section className={SECTION}>
          <SectionHeader
            overline="Above the starting price"
            title="Three things move the number"
            description="A kit's price covers its listed scope. Only these make it higher, and each one is quoted in writing before work starts."
          />
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            {PRICE_MOVERS.map((mover) => (
              <div
                key={mover.title}
                className="rule-draw h-full overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/85 p-6 md:p-8"
              >
                <span className="material-symbols-outlined mb-4 block text-[28px] text-primary" aria-hidden="true">
                  {mover.icon}
                </span>
                <h3 className="font-display text-xl text-on-surface mb-2">{mover.title}</h3>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">{mover.description}</p>
              </div>
            ))}
          </div>
        </section>

        <PromiseStrip />

        {/* Mirrored into FAQPage schema from pricing/layout.js. */}
        <section aria-labelledby="pricing-faq" className={SECTION}>
          <h2
            id="pricing-faq"
            className="mb-stack-lg max-w-2xl font-display text-headline-lg-mobile md:text-headline-lg text-on-surface"
          >
            Pricing questions, answered
          </h2>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
            {PRICING_FAQS.map((faq) => (
              <div
                key={faq.id}
                className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/85 p-6 md:p-8"
              >
                <h3 className="mb-3 font-display text-xl text-on-surface">{faq.question}</h3>
                <p className="font-body text-body-md text-on-surface-variant">{faq.answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-stack-lg max-w-2xl font-body text-body-md text-on-surface-variant">
            More on{" "}
            <Link href="/kits" className="text-primary hover:underline">
              what each kit includes
            </Link>
            ,{" "}
            <Link href="/process" className="text-primary hover:underline">
              how a project runs
            </Link>
            , or the{" "}
            <Link href="/faq" className="text-primary hover:underline">
              full FAQ
            </Link>
            .
          </p>
        </section>

        <StudioCta
          heading="Not sure which kit you need?"
          body="Tell us what you are trying to do. We will point you at the right kit, or tell you plainly if none of them fit."
          primary={{ href: "/contact", label: "Ask the people who build it" }}
          secondary={{ href: "/kits", label: "Browse the kits" }}
        />
      </PageSurface>
    </>
  );
}
