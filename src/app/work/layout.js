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
      "Websites, online stores and apps LogixLoops has built for real clients in India, each linked to the Loop it would start from today, with its price.",
    path: "/work",
    keywords: [
      "website design portfolio",
      "web design agency portfolio India",
      "ecommerce website examples",
      "Next.js websites",
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
