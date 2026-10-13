import { FAQS } from "@/data/faq";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import {
  generateBreadcrumbSchema,
  generateFaqSchema,
  generateSpeakableSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

// The page itself is a Client Component (accordion state), so metadata and the
// FAQPage JSON-LD both live here, schema has to be server-rendered to be seen.
export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Kits and pricing, delivery timelines, technology stack, security posture, who owns the code, and what happens if you want to leave. Answered directly.",
  path: "/faq",
  keywords: [
    "software development agency FAQ",
    "who owns the code software agency",
    "fixed price vs retainer software development",
    "minimum software development engagement",
    "hire a software development team",
  ],
});

export default function FaqLayout({ children }) {
  const schema = generateFaqSchema(
    FAQS.map((faq) => ({ question: faq.question, answer: faq.answer }))
  );

  return (
    <>
      <SchemaMarkup schema={schema} />
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "FAQ", path: "/faq" },
        ])}
      />
      <SchemaMarkup
        schema={generateSpeakableSchema(
          "Frequently Asked Questions",
          "/faq",
          ["h1", "h2", "h3"]
        )}
      />
      {children}
    </>
  );
}
