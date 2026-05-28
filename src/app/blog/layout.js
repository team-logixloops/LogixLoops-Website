// ISR: Regenerate edge cache every hour (3600 seconds)
// This applies to the /blog index and all /blog/[slug] dynamic routes.
export const revalidate = 3600;

export default function BlogLayout({ children }) {
  return <>{children}</>;
}
