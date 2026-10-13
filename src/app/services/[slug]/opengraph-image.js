import { ogCard, clampSubtitle, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { LINES } from "@/data/lines";

// `alt` is a static export, so it cannot carry the line name. The card does.
export const alt = "A LogixLoops service line.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return LINES.map((line) => ({ slug: line.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const line = LINES.find((entry) => entry.slug === slug);

  // The route 404s on an unknown slug before this runs, but the image handler
  // is a separate entry point and has to stand on its own.
  if (!line) {
    return ogCard({
      eyebrow: "Services",
      title: "Brand, build and growth.",
      subtitle: "Web and app development, branding, redesign, SEO and AI visibility, AI automation and maintenance.",
    });
  }

  return ogCard({
    eyebrow: `${line.name} · Services`,
    title: line.label,
    subtitle: clampSubtitle(line.pitch),
  });
}
