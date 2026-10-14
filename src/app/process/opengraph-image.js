import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "How a LogixLoops Loop runs: pick a Loop, kick-off, build, launch and 30 days of The Tune-Up, plus the engineering method behind bigger builds.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Process",
    title: "How a Loop runs.",
    subtitle:
      "Pick a Loop, kick-off, build, launch, then 30 days of The Tune-Up. Every step ends with something you can approve.",
  });
}
