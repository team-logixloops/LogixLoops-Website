import { ogCard, clampSubtitle, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/data/caseStudies";

export const alt = "A LogixLoops engineering build.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllCaseStudies().map((study) => ({ slug: study.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return ogCard({
      eyebrow: "Selected Work",
      title: "Strategic transformations.",
      subtitle: "Platforms engineered: the constraints, the architecture, the outcomes.",
    });
  }

  return ogCard({
    eyebrow: `Client Work · ${study.industry}`,
    title: study.title,
    subtitle: clampSubtitle(study.shortDescription),
  });
}
