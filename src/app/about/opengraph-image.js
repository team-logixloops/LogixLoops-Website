import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "About LogixLoops: systems architects, product designers, and full-stack engineers.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "About",
    title: "We engineer the digital future.",
    subtitle:
      "Systems architects, product designers, and full-stack engineers turning technical debt into advantage.",
  });
}
