import { PRICING_FAQS } from "@/data/faq";
import { KITS } from "@/data/kits";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import {
  generateBreadcrumbSchema,
  generateFaqSchema,
  generateWebPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { cheapest, formatPriceProse } from "@/lib/pricing";

/* The lowest starting price is read from the catalogue, so the snippet in
   search results can never quote a price the page no longer shows. */
const PRICING_DESCRIPTION = `Starting prices for every LogixLoops Loop and plan: websites, stores, apps, branding, SEO, AI visibility and automation. Loops from ${formatPriceProse(cheapest(KITS).price)}.`;

export const metadata = buildMetadata({
  title: "Pricing: Website, App, Branding and SEO Costs",
  description: PRICING_DESCRIPTION,
  path: "/pricing",
  keywords: [
    "website design price",
    "website development cost India",
    "app development cost",
    "branding package price",
    "SEO package price",
    "AI chatbot price",
    "website maintenance plan price",
  ],
});

// The FAQPage and WebPage JSON-LD for /pricing live here, beside the metadata.
export default function PricingLayout({ children }) {
  const schema = generateFaqSchema(
    PRICING_FAQS.map((faq) => ({ question: faq.question, answer: faq.answer }))
  );

  return (
    <>
      <SchemaMarkup schema={schema} />
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Pricing", path: "/pricing" },
        ])}
      />
      <SchemaMarkup
        schema={generateWebPageSchema({
          name: "LogixLoops pricing",
          description: PRICING_DESCRIPTION,
          path: "/pricing",
          speakable: ["h1", "h2"],
        })}
      />
      {children}
    </>
  );
}
