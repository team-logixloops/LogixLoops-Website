import { buildMetadata } from "@/lib/seo";

// ISR: Regenerate edge cache every hour (3600 seconds)
// This applies to the /work index and all /work/[slug] dynamic routes.
export const revalidate = 3600;

// The index page is a Client Component (filter state), so its metadata lives
// here. /work/[slug] overrides this with its own generateMetadata.
export const metadata = {
  ...buildMetadata({
    title: "Work",
    description:
      "Explore verified software engineering case studies, digital platforms, and architectural transformations delivered by LogixLoops.",
    path: "/work",
    keywords: [
      "software engineering portfolio",
      "digital platform engineering",
      "Next.js production platforms",
      "high performance web applications",
      "client work",
    ],
  }),
  title: {
    default: "Work",
    template: "LogixLoops | %s",
  },
};

export default function WorkLayout({ children }) {
  return <>{children}</>;
}
