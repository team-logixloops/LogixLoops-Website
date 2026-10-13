import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const CONTACT_DESCRIPTION =
  "Talk to LogixLoops in Jaipur about a website, app, brand, SEO or AI project. Every enquiry is read by the people who would build it and answered within one business day.";

// Metadata and the page-level JSON-LD for /contact live here.
export const metadata = buildMetadata({
  title: "Contact Us",
  description: CONTACT_DESCRIPTION,
  path: "/contact",
  keywords: [
    "website design company in Jaipur",
    "software development company in Jaipur",
    "hire software developers Jaipur",
    "web development company Jaipur contact",
    "software agency India contact",
  ],
});

export default function ContactLayout({ children }) {
  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Contact", path: "/contact" },
        ])}
      />
      <SchemaMarkup
        schema={generateWebPageSchema({
          type: "ContactPage",
          name: "Contact LogixLoops",
          description: CONTACT_DESCRIPTION,
          path: "/contact",
        })}
      />
      {children}
    </>
  );
}
