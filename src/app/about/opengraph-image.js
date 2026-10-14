import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "About LogixLoops: a brand, technology and growth studio in Jaipur that sells fixed-scope Loops with published prices.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "About",
    title: "One studio. Brand, tech and growth.",
    subtitle:
      "Loops with published prices, built by the people you talk to, and 30 days of The Tune-Up after every launch.",
  });
}
