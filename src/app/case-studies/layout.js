import { buildMetadata } from "@/lib/seo";

// ISR: Regenerate edge cache every hour (3600 seconds)
// This applies to the /case-studies index and all /case-studies/[slug] dynamic routes.
export const revalidate = 3600;

// The index page is a Client Component (filter state), so its metadata lives
// here. /case-studies/[slug] overrides this with its own generateMetadata.
// A bare string title here would shadow the root layout's title template for
// /case-studies/[slug], stripping the brand suffix off every detail page.
export const metadata = {
  ...buildMetadata({
    title: "Reference Builds",
    description:
      "Four reference builds: trading, healthcare, logistics and enterprise identity. The constraint, the architecture we would choose, and the alternatives we would rule out.",
    path: "/case-studies",
    keywords: [
      "software architecture examples",
      "microservices architecture case study",
      "multi-tenant SaaS architecture",
      "zero-trust identity architecture",
      "software engineering portfolio",
    ],
  }),
  title: {
    default: "Reference Builds",
    template: "%s | LogixLoops",
  },
};

export default function CaseStudiesLayout({ children }) {
  return <>{children}</>;
}
