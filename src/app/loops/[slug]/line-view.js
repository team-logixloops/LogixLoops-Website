import Link from "next/link";
import { getKitsByLine } from "@/data/kits";
import { getAllPlans } from "@/data/plans";
import { getAllCaseStudies } from "@/data/caseStudies";
import { CURRENCY_NOTE, cheapest, formatPrice } from "@/lib/pricing";
import { SectionHeader } from "@/components/ui";
import LineHero from "@/components/sections/kits/LineHero";
import KitCard from "@/components/sections/kits/KitCard";
import PlanCard from "@/components/sections/kits/PlanCard";
import UnderTheHood from "@/components/sections/kits/UnderTheHood";
import PromiseStrip from "@/components/sections/kits/PromiseStrip";
import StudioCta from "@/components/sections/kits/StudioCta";
import { linkFaqs } from "@/components/sections/kits/KitLinkedText";
import ServiceMasterProblems from "@/components/sections/service-master/ServiceMasterProblems";
import ServiceMasterRelatedWork from "@/components/sections/service-master/ServiceMasterRelatedWork";
import ServiceMasterFAQ from "@/components/sections/service-master/ServiceMasterFAQ";
import { SECTION } from "@/components/sections/service-master/tokens";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import {
  generateBreadcrumbSchema,
  generateFaqSchema,
  generateItemListSchema,
  generateServiceSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

/* Pit Crew sells monthly plans rather than kits. */
const PLANS_LINE = "maintenance-and-support";

/* A line (one of the six groups) at /loops/<line>. Rendered by
   ../[slug]/page.js, which serves lines and Loops from one URL tree. */
export function lineMetadata(line) {
  return buildMetadata({
    title: line.metaTitle,
    description: line.metaDescription,
    path: `/loops/${line.slug}`,
    keywords: line.keywords,
  });
}

export default function LineView({ line }) {
  const isPlans = line.slug === PLANS_LINE;
  const offers = isPlans ? getAllPlans() : getKitsByLine(line.slug);
  const fromLabel = `${isPlans ? "Plans" : "Loops"} from ${formatPrice(cheapest(offers).price)}`;
  const offerSlugs = new Set(offers.map((offer) => offer.slug));
  const studies = isPlans
    ? []
    : getAllCaseStudies().filter((study) => study.kits.some((kit) => offerSlugs.has(kit)));

  return (
    <main className="relative z-10 overflow-x-clip">
      <SchemaMarkup
        schema={generateServiceSchema({
          title: line.label,
          shortDescription: line.summary,
          slug: line.slug,
          serviceType: line.label,
        })}
      />
      {!isPlans && (
        <SchemaMarkup
          schema={generateItemListSchema({
            name: `${line.name}: ${line.label} Loops`,
            items: offers.map((kit) => ({ name: kit.name, description: kit.summary, path: `/loops/${kit.slug}` })),
          })}
        />
      )}
      <SchemaMarkup schema={generateFaqSchema(line.faqs.map((faq) => ({ question: faq.q, answer: faq.a })))} />
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Loops", path: "/loops" },
          { label: line.label, path: `/loops/${line.slug}` },
        ])}
      />

      <LineHero line={line} fromLabel={fromLabel} />
      <ServiceMasterProblems problems={line.problems} color={line.color} />

      <section className={SECTION}>
        <SectionHeader
          overline={`${line.name} · ${line.label}`}
          title={isPlans ? "Pick a plan" : "Pick a Loop"}
          description={
            isPlans
              ? "Every plan is monthly and priced up front."
              : "A fixed scope, a timeline and a starting price on every one."
          }
        />
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
          {isPlans
            ? offers.map((plan) => <PlanCard key={plan.slug} plan={plan} />)
            : offers.map((kit) => <KitCard key={kit.slug} kit={kit} color={line.color} />)}
        </div>
        <p className="mt-6 font-body text-body-sm text-on-surface-variant">
          {CURRENCY_NOTE}{" "}
          <Link href="/pricing" className="text-primary underline-offset-4 hover:underline">
            See every Loop and plan with its price
          </Link>
          .
        </p>
      </section>

      {studies.length > 0 && (
        <ServiceMasterRelatedWork studies={studies} color={line.color} title="Work built with these Loops" />
      )}
      <UnderTheHood points={line.underTheHood} />
      <ServiceMasterFAQ faqs={linkFaqs(line.faqs)} color={line.color} />
      <PromiseStrip />
      <StudioCta
        heading={`Start with ${line.name}: ${line.label}`}
        body={line.pitch}
        primary={{ href: `/contact?line=${line.slug}`, label: "Start a project" }}
        secondary={{ href: "/loops", label: "See every Loop" }}
      />
    </main>
  );
}
