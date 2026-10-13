import { notFound } from "next/navigation";
import { getAllLines, getLineBySlug } from "@/data/lines";
import { getKitsByLine } from "@/data/kits";
import { getAllPlans } from "@/data/plans";
import { getAllCaseStudies } from "@/data/caseStudies";
import { cheapest, formatPrice } from "@/lib/pricing";
import { SectionHeader } from "@/components/ui";
import LineHero from "@/components/sections/kits/LineHero";
import KitCard from "@/components/sections/kits/KitCard";
import PlanCard from "@/components/sections/kits/PlanCard";
import UnderTheHood from "@/components/sections/kits/UnderTheHood";
import PromiseStrip from "@/components/sections/kits/PromiseStrip";
import StudioCta from "@/components/sections/kits/StudioCta";
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

// Every line is known at build time. Anything else is a 404, not a render.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllLines().map((line) => ({ slug: line.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const line = getLineBySlug(slug);
  if (!line) return {};

  return buildMetadata({
    title: line.metaTitle,
    description: line.metaDescription,
    path: `/services/${line.slug}`,
    keywords: line.keywords,
  });
}

export default async function LinePage({ params }) {
  const { slug } = await params;
  const line = getLineBySlug(slug);
  if (!line) notFound();

  const isPlans = line.slug === PLANS_LINE;
  const offers = isPlans ? getAllPlans() : getKitsByLine(line.slug);
  const fromLabel = `${isPlans ? "Plans" : "Kits"} from ${formatPrice(cheapest(offers).price)}`;
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
            name: `${line.name}: ${line.label} kits`,
            items: offers.map((kit) => ({ name: kit.name, description: kit.summary, path: `/kits/${kit.slug}` })),
          })}
        />
      )}
      <SchemaMarkup schema={generateFaqSchema(line.faqs.map((faq) => ({ question: faq.q, answer: faq.a })))} />
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Services", path: "/services" },
          { label: line.label, path: `/services/${line.slug}` },
        ])}
      />

      <LineHero line={line} fromLabel={fromLabel} />
      <ServiceMasterProblems problems={line.problems} color={line.color} />

      <section className={SECTION}>
        <SectionHeader
          overline={isPlans ? `${line.name} plans` : `${line.name} kits`}
          title={isPlans ? "Pick a plan" : "Pick a kit"}
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
      </section>

      {studies.length > 0 && (
        <ServiceMasterRelatedWork studies={studies} color={line.color} title="Work built with these kits" />
      )}
      <UnderTheHood points={line.underTheHood} />
      <ServiceMasterFAQ faqs={line.faqs} color={line.color} />
      <PromiseStrip />
      <StudioCta
        heading={`Start with ${line.name}`}
        body={line.pitch}
        primary={{ href: `/contact?line=${line.slug}`, label: "Start a project" }}
        secondary={{ href: "/kits", label: "See every kit" }}
      />
    </main>
  );
}
