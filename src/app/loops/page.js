import Link from "next/link";
import PageHero from "@/components/sections/shared/PageHero";
import PageSurface from "@/components/sections/shared/PageSurface";
import { Button } from "@/components/ui";
import KitCard from "@/components/sections/kits/KitCard";
import PlanCard from "@/components/sections/kits/PlanCard";
import PromiseStrip from "@/components/sections/kits/PromiseStrip";
import StudioCta from "@/components/sections/kits/StudioCta";
import KitLinkedText from "@/components/sections/kits/KitLinkedText";
import PriceNote from "@/components/sections/kits/PriceNote";
import { SECTION } from "@/components/sections/service-master/tokens";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { getAllLines, getLineBySlug } from "@/data/lines";
import { getAllKits, getKitsByLine } from "@/data/kits";
import { getAllPlans } from "@/data/plans";
import { SERVICES_FAQS } from "@/data/faq";
import { generateBreadcrumbSchema, generateCollectionPageSchema, generateFaqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

/*
 * /loops: everything LogixLoops sells, on one page. It replaced both
 * /services (the six groups) and /kits (the catalogue), which said the same
 * thing twice; both old URLs redirect here.
 */

const LOOPS_DESCRIPTION =
  "Website, app, branding, SEO, AI and automation packages from LogixLoops, called Loops, each with a fixed scope, a timeline and a published starting price.";

/* Answer-first: what a Loop is, what it covers, and why the price is here. */
const LEAD =
  "Loops are fixed-scope service packages from LogixLoops for websites, online stores, apps, branding, SEO and AI visibility, and AI automation. Each Loop lists what you get, how long it takes and a starting price, so you know the cost before the first call.";

export const metadata = buildMetadata({
  title: "Loops: Website, App, Branding and AI Packages",
  description: LOOPS_DESCRIPTION,
  path: "/loops",
  keywords: [
    "website design packages",
    "website development packages India",
    "branding packages",
    "SEO packages",
    "AI chatbot packages",
    "app development packages",
    "digital services for small business",
    "web and app development services",
  ],
});

function LineHeading({ id, eyebrow, title, pitch, href, linkLabel }) {
  return (
    <div className="mb-stack-lg flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <span className="mb-3 block font-label text-label-caps uppercase tracking-widest text-primary">{eyebrow}</span>
        <h2 id={id} className="mb-3 font-display text-headline-lg-mobile md:text-headline-lg text-on-surface">
          {title}
        </h2>
        <p className="font-body text-body-lg text-on-surface-variant">{pitch}</p>
      </div>
      <Link href={href} className="inline-flex items-center gap-1 whitespace-nowrap font-body text-body-md text-primary">
        {linkLabel}
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          arrow_forward
        </span>
      </Link>
    </div>
  );
}

export default function LoopsPage() {
  const lines = getAllLines().filter((line) => getKitsByLine(line.slug).length > 0);
  const maintenance = getLineBySlug("maintenance-and-support");
  const plans = getAllPlans();

  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Loops", path: "/loops" },
        ])}
      />
      <SchemaMarkup
        schema={generateCollectionPageSchema({
          name: "Loops by LogixLoops",
          description: LOOPS_DESCRIPTION,
          path: "/loops",
          items: getAllKits().map((kit) => ({
            name: kit.name,
            description: kit.summary,
            path: `/loops/${kit.slug}`,
          })),
        })}
      />
      <SchemaMarkup
        schema={generateFaqSchema(SERVICES_FAQS.map((faq) => ({ question: faq.question, answer: faq.answer })))}
      />

      <PageHero
        preset="pricing"
        eyebrow="Loops"
        title="Pick a Loop."
        accent="See the price first."
        lead={LEAD}
        cue="Browse the Loops"
      >
        <Button href="/contact" variant="ghost" size="lg">
          Not sure which? Ask us
        </Button>
      </PageHero>

      <PageSurface>
        {lines.map((line) => (
          <section key={line.slug} aria-labelledby={`line-${line.slug}`} className={SECTION}>
            <LineHeading
              id={`line-${line.slug}`}
              eyebrow={`${getKitsByLine(line.slug).length} Loops`}
              title={line.label}
              pitch={line.pitch}
              href={`/loops/${line.slug}`}
              linkLabel="Details and FAQs"
            />
            <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
              {getKitsByLine(line.slug).map((kit) => (
                <KitCard key={kit.slug} kit={kit} color={line.color} />
              ))}
            </div>
          </section>
        ))}

        <section aria-labelledby="line-maintenance-and-support" className={SECTION}>
          <LineHeading
            id="line-maintenance-and-support"
            eyebrow={`${plans.length} monthly plans`}
            title={maintenance.label}
            pitch={maintenance.pitch}
            href={`/loops/${maintenance.slug}`}
            linkLabel="Details and FAQs"
          />
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.slug} plan={plan} />
            ))}
          </div>
          <PriceNote className="mt-6">
            <Link href="/pricing" className="text-primary underline-offset-4 hover:underline">
              See the full price list
            </Link>
            .
          </PriceNote>
        </section>

        {/* The visible half of the FAQPage schema above; the two must match. */}
        <section aria-labelledby="loops-faq" className={SECTION}>
          <h2
            id="loops-faq"
            className="mb-stack-lg max-w-2xl font-display text-headline-lg-mobile md:text-headline-lg text-on-surface"
          >
            Not sure which one you need?
          </h2>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
            {SERVICES_FAQS.map((faq) => (
              <div
                key={faq.id}
                className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/85 p-6 md:p-8"
              >
                <h3 className="mb-3 font-display text-headline-md text-on-surface">{faq.question}</h3>
                <p className="font-body text-body-md text-on-surface-variant">
                  <KitLinkedText text={faq.answer} />
                </p>
              </div>
            ))}
          </div>
          <p className="mt-stack-lg max-w-2xl font-body text-body-md text-on-surface-variant">
            See{" "}
            <Link href="/process" className="text-primary hover:underline">
              how a Loop runs
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

        <PromiseStrip />
        <StudioCta
          heading="Not sure which Loop fits?"
          body="Tell us what you are trying to do. We will point you at the right Loop, or tell you plainly if none of them fit."
          primary={{ href: "/contact", label: "Ask the people who build it" }}
          secondary={{ href: "/pricing", label: "See the full price list" }}
        />
      </PageSurface>
    </>
  );
}
