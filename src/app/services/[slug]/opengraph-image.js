import { ogCard, clampSubtitle, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { SERVICES } from "@/lib/constants";

// `alt` is a static export, so it cannot carry the service name. It stays
// generic; the card itself carries the specifics.
export const alt = "A LogixLoops engineering service.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const service = SERVICES.find((entry) => entry.slug === slug);

  // The route itself 404s on an unknown slug before this runs, but the image
  // handler is a separate entry point and has to stand on its own.
  if (!service) {
    return ogCard({
      eyebrow: "Services",
      title: "Engineering services.",
      subtitle: "Enterprise software, AI and ML, web, mobile, cloud, SaaS, automation, UI/UX.",
    });
  }

  return ogCard({
    eyebrow: "Service",
    title: service.title,
    subtitle: clampSubtitle(service.shortDescription),
  });
}
