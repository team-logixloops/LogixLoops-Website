import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const CONTACT_DESCRIPTION =
  "Talk to a LogixLoops engineer in Jaipur about your platform, timeline and scale. Every enquiry is read by an engineer and answered within one business day.";

// The page itself is a Client Component (stateful form), so metadata lives here.
export const metadata = buildMetadata({
  title: "Contact Us",
  description: CONTACT_DESCRIPTION,
  path: "/contact",
  keywords: [
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
