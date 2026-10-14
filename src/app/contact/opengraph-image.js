import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "Contact LogixLoops: every enquiry is read by the people who would build it and answered within one business day.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Contact",
    title: "Tell us what you need.",
    subtitle:
      "Talk to the people who would build it. You leave the first call with the right Loop and a written price.",
  });
}
