import { getLineBySlug } from "@/data/lines";
import { getAllCaseStudies } from "@/data/caseStudies";
import { startingFrom } from "@/lib/pricing";
import KitHero from "@/components/sections/kits/KitHero";
import KitIncludes from "@/components/sections/kits/KitIncludes";
import KitFit from "@/components/sections/kits/KitFit";
import KitSteps from "@/components/sections/kits/KitSteps";
import KitAddOns from "@/components/sections/kits/KitAddOns";
import UnderTheHood from "@/components/sections/kits/UnderTheHood";
import PromiseStrip from "@/components/sections/kits/PromiseStrip";
import StudioCta from "@/components/sections/kits/StudioCta";
import RelatedKits from "@/components/sections/kits/RelatedKits";
import { linkFaqs } from "@/components/sections/kits/KitLinkedText";
import { relatedKits } from "@/lib/kit-links";
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

/* A Loop (a kit in the data) at /loops/<slug>. Rendered by
   ../[slug]/page.js, which serves lines and Loops from one URL tree. */
export function kitMetadata(kit) {
  return buildMetadata({
    title: kit.metaTitle,
    description: `${kit.metaDescription} ${startingFrom(kit.price)}.`,
    path: `/loops/${kit.slug}`,
    keywords: [kit.keyword, kit.name, `${kit.name} price`],
  });
}

export default function KitView({ kit }) {
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
          { label: "Loops", path: "/loops" },
          { label: kit.name, path: `/loops/${kit.slug}` },
        ])}
      />

      <KitHero kit={kit} line={line} />
      <KitIncludes items={kit.includes} color={line.color} kitSlug={kit.slug} />
      <KitFit fitFor={kit.fitFor} notFor={kit.notFor} color={line.color} kitSlug={kit.slug} />
      <KitSteps steps={kit.steps} color={line.color} />
      <KitAddOns addOns={kit.addOns} color={line.color} />
      <UnderTheHood points={kit.underTheHood} demo={kit.demo} color={line.color} />
      {studies.length > 0 && (
        <ServiceMasterRelatedWork studies={studies} color={line.color} title="Built with this Loop" />
      )}
      <ServiceMasterFAQ faqs={linkFaqs(kit.faqs, kit.slug)} color={line.color} />
      <RelatedKits kits={relatedKits(kit)} />
      <PromiseStrip />
      <StudioCta
        heading={`Start your ${kit.name}`}
        body="Tell us what you are building. The first call is with the people who would build it."
        primary={{ href: `/contact?kit=${kit.slug}`, label: "Start this Loop" }}
        secondary={{ href: "/loops", label: "See every Loop" }}
      />
    </main>
  );
}
