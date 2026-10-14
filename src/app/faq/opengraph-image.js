import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "LogixLoops FAQ: Loops and pricing, timelines, engineering standards, security, IP ownership, support.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "FAQ",
    title: "Answers, in plain words.",
    subtitle:
      "Loops and pricing, delivery timelines, engineering standards, security posture, IP ownership, support.",
  });
}
