import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "LogixLoops services: six lines, sold as kits with published prices.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Services",
    title: "Six lines. One studio.",
    subtitle:
      "Web and app development, branding, redesign, SEO and AI visibility, AI automation and maintenance, sold as kits.",
  });
}
