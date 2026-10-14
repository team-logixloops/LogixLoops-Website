import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "How a LogixLoops kit runs: pick a kit, kick-off, build, launch and 30 days of The Loop, plus the engineering method behind bigger builds.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Process",
    title: "How a kit runs.",
    subtitle:
      "Pick a kit, kick-off, build, launch, then 30 days of The Loop. Every step ends with something you can approve.",
  });
}
