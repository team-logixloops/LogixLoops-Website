import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "LogixLoops case studies: trading, healthcare, logistics, and identity platforms re-engineered.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Case Studies",
    title: "Strategic transformations.",
    subtitle:
      "Trading, healthcare, logistics, and identity platforms: the constraints, the architecture, the outcomes.",
  });
}
