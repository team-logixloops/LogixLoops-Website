import { notFound } from "next/navigation";
import { getAllServices, getServiceBySlug } from "@/data/services";

import ServiceMasterHero from "@/components/sections/service-master/ServiceMasterHero";
import ServiceMasterSignature from "@/components/sections/service-master/ServiceMasterSignature";
import ServiceMasterProblems from "@/components/sections/service-master/ServiceMasterProblems";
import ServiceMasterCapabilities from "@/components/sections/service-master/ServiceMasterCapabilities";
import ServiceMasterTech from "@/components/sections/service-master/ServiceMasterTech";
import ServiceMasterProcess from "@/components/sections/service-master/ServiceMasterProcess";
import ServiceMasterSolutions from "@/components/sections/service-master/ServiceMasterSolutions";
import ServiceMasterMetrics from "@/components/sections/service-master/ServiceMasterMetrics";
import ServiceMasterCaseStudy from "@/components/sections/service-master/ServiceMasterCaseStudy";
import ServiceMasterFAQ from "@/components/sections/service-master/ServiceMasterFAQ";
import ServiceMasterRelatedWork from "@/components/sections/service-master/ServiceMasterRelatedWork";
import ServiceMasterCTA from "@/components/sections/service-master/ServiceMasterCTA";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import {
  generateFaqSchema,
  generateBreadcrumbSchema,
  generateServiceSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };

  return buildMetadata({
    // Some data titles already carry a noun ("UI/UX Design Services"), so no
    // suffix here, the root layout template appends the brand.
    title: service.title,
    // `summary` is hero copy, deliberately short, and all eight land under the
    // 70-char meta-description floor. The full `description` paragraph is real
    // prose at the right length once clamped.
    description: service.description || service.summary,
    path: `/services/${service.id}`,
  });
}

/**
 * Every service renders the identical section spine, only the accent colour
 * and the copy differ. The one deliberate exception is ServiceMasterSignature,
 * which swaps in a hands-on demo of what that specific practice builds.
 * Everything else belongs in the data file, not in a per-service section.
 */
export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const color = service.color;

  // Service data stores FAQs as { q, a }; the schema helper expects
  // { question, answer }.
  const faqSchema = generateFaqSchema(
    service.faqs?.map((faq) => ({ question: faq.q, answer: faq.a }))
  );

  return (
    <main className="relative z-10 overflow-x-clip">
      <SchemaMarkup
        schema={generateServiceSchema({
          title: service.title,
          // The full paragraph, not `summary`. `summary` is a hero fragment,
          // and this string is what an answer engine quotes when asked what
          // the practice is. A six-word fragment answers nothing.
          shortDescription: service.description || service.summary,
          slug: service.id,
          serviceType: service.title,
        })}
      />
      <SchemaMarkup schema={faqSchema} />
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Services", path: "/services" },
          { label: service.title, path: `/services/${service.id}` },
        ])}
      />

      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="flex flex-col">
        <ServiceMasterHero service={service} />
        <ServiceMasterSignature service={service} />
        <ServiceMasterProblems problems={service.problems} color={color} />
        <ServiceMasterCapabilities capabilities={service.capabilities} color={color} />
        <ServiceMasterTech technologies={service.technologies} color={color} />
        <ServiceMasterProcess workflow={service.workflow} color={color} />
        <ServiceMasterSolutions solutions={service.solutions} color={color} />
        <ServiceMasterMetrics metrics={service.metrics} color={color} />
        <ServiceMasterCaseStudy caseStudy={service.caseStudyPreview} color={color} />
        <ServiceMasterFAQ faqs={service.faqs} color={color} />
        <ServiceMasterRelatedWork color={color} />
        <ServiceMasterCTA service={service} />
      </div>
    </main>
  );
}
