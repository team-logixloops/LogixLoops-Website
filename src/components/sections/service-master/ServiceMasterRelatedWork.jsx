import Link from "next/link";
import { cn } from "@/lib/utils";
import { getAllCaseStudies } from "@/data/caseStudies";
import { SECTION, CARD, CARD_PAD, accent } from "./tokens";

/**
 * Deliberately a Server Component with plain <Link>s. The case-study detail
 * pages were reachable only from the /case-studies index, the nav mega-menu
 * that lists them renders on hover, so those hrefs never appear in the HTML.
 * This section puts them in the server-rendered markup of all eight service
 * pages, which is the internal-linking the crawler actually follows.
 */
export default function ServiceMasterRelatedWork({ color }) {
  const studies = getAllCaseStudies();
  if (!studies.length) return null;

  const a = accent(color);

  return (
    <section className={SECTION}>
      <div className="mb-stack-lg max-w-2xl">
        <span
          className={cn(
            "font-label text-label-caps uppercase tracking-widest mb-4 block",
            a.text
          )}
        >
          Selected Work
        </span>
        <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
          Engagements behind this practice
        </h2>
        <p className="font-body text-body-lg text-on-surface-variant">
          Full technical write-ups, the constraint we inherited, the architecture
          we chose, and what it measured after launch.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {studies.map((study) => (
          <Link
            key={study.slug}
            href={`/case-studies/${study.slug}`}
            className={cn(CARD, CARD_PAD, a.hover, "group flex flex-col")}
          >
            <span className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant mb-3">
              {study.industry}
            </span>
            {/* No `group-hover:${a.text}`. Tailwind cannot resolve an
                interpolated class name at build time. */}
            <h3 className="font-display text-headline-md text-on-surface mb-3">
              {study.title}
            </h3>
            <p className="font-body text-body-sm text-on-surface-variant mb-6 flex-1">
              {study.shortDescription}
            </p>
            <span
              className={cn(
                "font-body text-body-sm inline-flex items-center gap-2 w-fit group-hover:gap-3 transition-all",
                a.text
              )}
            >
              Read the case study
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
