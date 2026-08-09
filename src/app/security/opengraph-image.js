import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "LogixLoops trust and security: zero-trust architecture, encryption standards, SOC 2 and HIPAA readiness.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Trust & Security",
    title: "Nothing is trusted by default.",
    subtitle:
      "Zero-trust architecture, encryption standards, SOC 2 and HIPAA readiness, and an audit trail for every action.",
  });
}
