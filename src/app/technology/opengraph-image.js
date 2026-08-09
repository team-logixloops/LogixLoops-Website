import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "The LogixLoops technology stack: React, Next.js, Node.js, Go, PostgreSQL, Kubernetes, AWS and GCP.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Technology",
    title: "The stack we build on.",
    subtitle:
      "React, Next.js, Node.js, Go, PostgreSQL, Docker, Kubernetes, Terraform, AWS and GCP. All open source.",
  });
}
