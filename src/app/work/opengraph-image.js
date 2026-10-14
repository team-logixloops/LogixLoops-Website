import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "LogixLoops client work: websites, online stores and apps built for real businesses, with the Loops behind them.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Selected Work",
    title: "Real client builds.",
    subtitle:
      "Websites, stores and apps for real businesses, each linked to the Loop it would start from today.",
  });
}
