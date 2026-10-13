import { notFound } from "next/navigation";
import { getAllKits, getKitBySlug } from "@/data/kits";
import { getLineBySlug } from "@/data/lines";
import { getAllCaseStudies } from "@/data/caseStudies";
import { formatPrice } from "@/lib/pricing";
import KitHero from "@/components/sections/kits/KitHero";
import KitIncludes from "@/components/sections/kits/KitIncludes";
import KitFit from "@/components/sections/kits/KitFit";
import KitSteps from "@/components/sections/kits/KitSteps";
import KitAddOns from "@/components/sections/kits/KitAddOns";
import UnderTheHood from "@/components/sections/kits/UnderTheHood";
import PromiseStrip from "@/components/sections/kits/PromiseStrip";
import StudioCta from "@/components/sections/kits/StudioCta";
import ServiceMasterRelatedWork from "@/components/sections/service-master/ServiceMasterRelatedWork";
import ServiceMasterFAQ from "@/components/sections/service-master/ServiceMasterFAQ";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import {
  generateBreadcrumbSchema,
  generateFaqSchema,
  generateHowToSchema,
  generateKitSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

// Every kit is known at build time. Anything else is a 404, not a render.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllKits().map((kit) => ({ slug: kit.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const kit = getKitBySlug(slug);
  if (!kit) return {};

  return buildMetadata({
    title: kit.metaTitle,
    description: `${kit.metaDescription} From ${formatPrice(kit.price)}.`,
    path: `/kits/${kit.slug}`,
    keywords: [kit.keyword, kit.name, `${kit.name} price`],
  });
}

export default async function KitPage({ params }) {
  const { slug } = await params;
  const kit = getKitBySlug(slug);
  if (!kit) notFound();

  const line = getLineBySlug(kit.line);
  const studies = getAllCaseStudies().filter((study) => kit.work.includes(study.slug));

  return (
    <main className="relative z-10 overflow-x-clip">
      <SchemaMarkup schema={generateKitSchema(kit)} />
      <SchemaMarkup
        schema={generateHowToSchema({
          name: `How the ${kit.name} runs`,
          description: kit.summary,
          steps: kit.steps.map((step) => ({ name: step.title, text: step.desc })),
        })}
      />
      <SchemaMarkup schema={generateFaqSchema(kit.faqs.map((faq) => ({ question: faq.q, answer: faq.a })))} />
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Kits", path: "/kits" },
          { label: kit.name, path: `/kits/${kit.slug}` },
        ])}
      />

      <KitHero kit={kit} line={line} />
      <KitIncludes items={kit.includes} color={line.color} />
      <KitFit fitFor={kit.fitFor} notFor={kit.notFor} color={line.color} />
      <KitSteps steps={kit.steps} color={line.color} />
      <KitAddOns addOns={kit.addOns} color={line.color} />
      <UnderTheHood points={kit.underTheHood} demo={kit.demo} color={line.color} />
      {studies.length > 0 && (
        <ServiceMasterRelatedWork studies={studies} color={line.color} title="Built with this kit" />
      )}
      <ServiceMasterFAQ faqs={kit.faqs} color={line.color} />
      <PromiseStrip />
      <StudioCta
        heading={`Start your ${kit.name}`}
        body="Tell us what you are building. The first call is with the people who would build it."
        primary={{ href: `/contact?kit=${kit.slug}`, label: "Start this kit" }}
        secondary={{ href: "/kits", label: "See every kit" }}
      />
    </main>
  );
}
