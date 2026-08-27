import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "LogixLoops client work: digital platforms, architectures, and production systems engineered.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Selected Work",
    title: "Engineering in production.",
    subtitle:
      "Client platforms and custom digital systems: the constraints, the architecture, the outcomes.",
  });
}
