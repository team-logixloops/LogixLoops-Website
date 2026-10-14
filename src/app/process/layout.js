import { KIT_STEPS } from "@/data/infrastructure";
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
  title: "How We Work: Loops, Process and Delivery",
  description:
    "How a LogixLoops Loop runs in five steps, from picking a Loop to 30 days of The Tune-Up after launch, plus the eight-phase engineering method behind bigger builds.",
  path: "/process",
  keywords: [
    "website design process",
    "how a website project works",
    "web development process",
    "software development process",
    "agile delivery process",
  ],
});

export default function ProcessLayout({ children }) {
  // The kit steps are ordered and procedural, which is exactly what HowTo
  // describes. Built from the array the top of the page renders.
  const howTo = generateHowToSchema({
    name: "How a LogixLoops Loop runs",
    description:
      "The five steps every LogixLoops Loop follows, from picking a Loop to 30 days of improvements after launch.",
    steps: KIT_STEPS.map((step) => ({
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
          "How a LogixLoops Loop runs",
          "/process",
          ["h1", "h2", "h3"]
        )}
      />
      {children}
    </>
  );
}
