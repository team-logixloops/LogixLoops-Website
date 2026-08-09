import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "LogixLoops engineering insights: deep technical dives from the team that ships the systems.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Insights",
    title: "Engineering insights.",
    subtitle:
      "Monolith migration, LLM orchestration, and zero-trust Kubernetes, written by the engineers who shipped it.",
  });
}
