import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { KITS } from "@/data/kits";
import { cheapest, formatPrice } from "@/lib/pricing";

export const alt =
  "LogixLoops pricing: published starting prices for every kit and monthly plan, in rupees for India and US dollars everywhere else.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Pricing",
    title: "Prices on the box.",
    subtitle: `Websites, apps, branding, SEO and AI, each with a published starting price. Kits from ${formatPrice(cheapest(KITS).price)}.`,
  });
}
