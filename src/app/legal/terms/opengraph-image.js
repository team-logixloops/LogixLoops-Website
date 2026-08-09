import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "LogixLoops terms and conditions governing use of its services, platforms, deliverables, and IP.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Legal",
    title: "Terms & Conditions",
    subtitle:
      "The rules governing use of LogixLoops services, platforms, deliverables, and intellectual property.",
  });
}
