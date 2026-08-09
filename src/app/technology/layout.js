import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const TECHNOLOGY_DESCRIPTION =
  "React, Next.js, TypeScript, Node.js, Go, PostgreSQL, AWS, Kubernetes and Terraform: the stack LogixLoops standardises on, and the four things we deliberately avoid.";

// The page itself is a Client Component (motion wrappers), so metadata lives here.
export const metadata = buildMetadata({
  title: "Technology Stack",
  description: TECHNOLOGY_DESCRIPTION,
  path: "/technology",
  keywords: [
    "Next.js development agency",
    "React development company",
    "Node.js development",
    "Kubernetes consultants",
    "Terraform infrastructure as code",
    "open source technology stack",
  ],
});

export default function TechnologyLayout({ children }) {
  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Technology", path: "/technology" },
        ])}
      />
      <SchemaMarkup
        schema={generateWebPageSchema({
          name: "Technology Stack",
          description: TECHNOLOGY_DESCRIPTION,
          path: "/technology",
          speakable: ["h1", "h2"],
        })}
      />
      {children}
    </>
  );
}
