import { PRICING_FAQS } from "@/data/faq";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import {
  generateBreadcrumbSchema,
  generateFaqSchema,
  generateWebPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const PRICING_DESCRIPTION =
  "How LogixLoops scopes and prices work: dedicated squads on monthly retainer, scoped programmes on a fixed brief, and what drives the final number.";

// The page itself is a Client Component (motion wrappers), so metadata and the
// FAQPage JSON-LD both live here, schema has to be server-rendered to be seen.
export const metadata = buildMetadata({
  title: "Pricing & Engagement Models",
  description: PRICING_DESCRIPTION,
  path: "/pricing",
});

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
          name: "Pricing & Engagement Models",
          description: PRICING_DESCRIPTION,
          path: "/pricing",
          speakable: ["h1", "h2"],
        })}
      />
      {children}
    </>
  );
}
