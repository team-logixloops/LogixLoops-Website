import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const SECURITY_DESCRIPTION =
  "Zero-trust architecture, AES-256 and TLS 1.3, six pipeline gates before production, and what LogixLoops will and will not claim about SOC 2, HIPAA and ISO 27001.";

// The page itself is a Client Component (motion wrappers), so metadata lives here.
export const metadata = buildMetadata({
  title: "Trust & Security",
  description: SECURITY_DESCRIPTION,
  path: "/security",
  keywords: [
    "zero-trust architecture consultants",
    "SOC 2 ready software development",
    "HIPAA compliant application development",
    "GDPR compliant architecture",
    "secure software development lifecycle",
  ],
});

export default function SecurityLayout({ children }) {
  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Trust & Security", path: "/security" },
        ])}
      />
      <SchemaMarkup
        schema={generateWebPageSchema({
          name: "Trust & Security",
          description: SECURITY_DESCRIPTION,
          path: "/security",
          speakable: ["h1", "h2"],
        })}
      />
      {children}
    </>
  );
}
