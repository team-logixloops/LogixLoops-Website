import { ogCard, clampSubtitle, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { KITS } from "@/data/kits";
import { getLineBySlug } from "@/data/lines";
import { formatPrice } from "@/lib/pricing";

export const alt = "A LogixLoops Advantage Kit.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return KITS.map((kit) => ({ slug: kit.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const kit = KITS.find((entry) => entry.slug === slug);

  if (!kit) {
    return ogCard({
      eyebrow: "Advantage Kits",
      title: "Pick a kit. See the price first.",
      subtitle: "Websites, stores, apps, branding, SEO, AI visibility and automation.",
    });
  }

  const line = getLineBySlug(kit.line);
  return ogCard({
    eyebrow: `${line.name} · ${line.label}`,
    title: kit.name,
    subtitle: clampSubtitle(`From ${formatPrice(kit.price)}, ${kit.timeline}. ${kit.summary}`),
  });
}
