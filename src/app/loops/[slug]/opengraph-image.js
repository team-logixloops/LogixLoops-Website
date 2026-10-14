import { ogCard, clampSubtitle, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { KITS } from "@/data/kits";
import { LINES, getLineBySlug } from "@/data/lines";
import { formatPrice } from "@/lib/pricing";

// `alt` is a static export, so it cannot carry the Loop or line name. The card does.
export const alt = "A LogixLoops Loop: a fixed-scope service package with a published price.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return [...LINES, ...KITS].map(({ slug }) => ({ slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;

  const line = LINES.find((entry) => entry.slug === slug);
  if (line) {
    return ogCard({
      eyebrow: `${line.name} · Loops`,
      title: line.label,
      subtitle: clampSubtitle(line.pitch),
    });
  }

  const kit = KITS.find((entry) => entry.slug === slug);
  if (kit) {
    const kitLine = getLineBySlug(kit.line);
    return ogCard({
      eyebrow: `${kitLine.name} · ${kitLine.label}`,
      title: kit.name,
      subtitle: clampSubtitle(`From ${formatPrice(kit.price)}, ${kit.timeline}. ${kit.summary}`),
    });
  }

  // The route 404s on an unknown slug before this runs, but the image handler
  // is a separate entry point and has to stand on its own.
  return ogCard({
    eyebrow: "Loops",
    title: "Pick a Loop. See the price first.",
    subtitle: "Websites, stores, apps, branding, SEO, AI visibility and automation.",
  });
}
