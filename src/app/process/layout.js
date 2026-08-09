import { ENGINEERING_WORKFLOW } from "@/data/infrastructure";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import {
  generateBreadcrumbSchema,
  generateHowToSchema,
  generateSpeakableSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

// The page itself is a Client Component (motion wrappers), so metadata and the
// JSON-LD both live here, schema has to be server-rendered to be seen.
export const metadata = buildMetadata({
  title: "Our Software Development Process",
  description:
    "The eight-phase LogixLoops delivery lifecycle: discovery, architecture, UX, sprint engineering, QA, CI/CD, observability and scale, each with a stated exit condition.",
  path: "/process",
  keywords: [
    "software development process",
    "software development lifecycle models",
    "agile delivery process",
    "scrum kanban spiral v-model",
    "architecture decision records",
  ],
});

export default function ProcessLayout({ children }) {
  // The workflow is genuinely ordered and procedural, which is exactly what
  // HowTo describes, and what makes it eligible for step-based rich results.
  const howTo = generateHowToSchema({
    name: "The LogixLoops engineering delivery process",
    description:
      "How LogixLoops takes an enterprise software engagement from discovery through to production scale.",
    steps: ENGINEERING_WORKFLOW.map((step) => ({
      name: step.title,
      text: step.description,
    })),
  });

  return (
    <>
      <SchemaMarkup schema={howTo} />
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Process", path: "/process" },
        ])}
      />
      <SchemaMarkup
        schema={generateSpeakableSchema(
          "Our Engineering Process",
          "/process",
          ["h1", "h2", "h3"]
        )}
      />
      {children}
    </>
  );
}
