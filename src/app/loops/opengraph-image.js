import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "LogixLoops Loops: fixed-scope packages with published prices.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Loops",
    title: "Pick a Loop. See the price first.",
    subtitle: "Websites, stores, apps, branding, SEO, AI visibility and automation, each with a published starting price.",
  });
}
