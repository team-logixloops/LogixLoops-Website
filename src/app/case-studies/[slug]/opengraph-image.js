import { ogCard, clampSubtitle, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/data/caseStudies";

// `alt` is a static export, so it cannot carry the study title. It stays
// generic; the card itself carries the specifics.
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
      eyebrow: "Case Studies",
      title: "Strategic transformations.",
      subtitle: "Platforms re-engineered: the constraints, the architecture, the outcomes.",
    });
  }

  // A share card is often the only thing a reader sees, so the reference-build
  // disclosure has to survive onto it. Calling a demo record a "Case Study" in
  // the eyebrow would overclaim in exactly the place the page takes care not
  // to. The flag lives on the record, so promoting one to real client work
  // relabels its card with it.
  return ogCard({
    eyebrow: study.demo ? `Reference Build · ${study.industry}` : `Case Study · ${study.industry}`,
    title: study.title,
    subtitle: clampSubtitle(study.shortDescription),
  });
}
