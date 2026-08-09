import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "The LogixLoops engineering process: eight phases from strategic discovery to global scale-out.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Process",
    title: "Eight phases, discovery to scale.",
    subtitle:
      "Strategic discovery, architecture, engineering, hardening, and global scale-out.",
  });
}
