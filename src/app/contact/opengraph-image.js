import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "Contact LogixLoops: every enquiry is read by an engineer and answered within one business day.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Contact",
    title: "Talk to an architect.",
    subtitle:
      "Not a salesperson. Every enquiry is read by an engineer and answered within one business day.",
  });
}
