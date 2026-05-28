// ISR: Regenerate edge cache every hour (3600 seconds)
// This applies to the /case-studies index and all /case-studies/[slug] dynamic routes.
export const revalidate = 3600;

export default function CaseStudiesLayout({ children }) {
  return <>{children}</>;
}
