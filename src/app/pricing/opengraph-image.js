import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "LogixLoops pricing and engagement models: dedicated squads on retainer, scoped programmes on a fixed brief.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Pricing",
    title: "How engagements are priced.",
    subtitle:
      "Dedicated squads on monthly retainer, scoped programmes on a fixed brief, and what drives the number.",
  });
}
