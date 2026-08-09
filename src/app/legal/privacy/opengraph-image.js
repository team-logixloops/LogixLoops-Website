import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "LogixLoops privacy policy: what we collect, how it is stored and protected, and your rights over it.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Legal",
    title: "Privacy Policy",
    subtitle:
      "What we collect, how it is stored and protected, who it is shared with, and your rights over it.",
  });
}
