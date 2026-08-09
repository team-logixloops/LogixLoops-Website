import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "LogixLoops engineering services: eight practices across web, mobile, SaaS, AI, and cloud.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Services",
    title: "Eight engineering practices.",
    subtitle:
      "Enterprise software, AI and ML, web, mobile, cloud and DevOps, SaaS, automation, UI/UX.",
  });
}
