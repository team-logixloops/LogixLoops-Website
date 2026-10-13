import { SectionHeader } from "@/components/ui";
import { FadeInUp } from "@/components/motion";
import { SECTION } from "@/components/sections/service-master/tokens";
import { getLineBySlug } from "@/data/lines";
import KitCard from "./KitCard";

/**
 * Other kits worth a look from this one, as ordinary kit cards. The list comes
 * from `relatedKits`, so it follows whatever the kit's own copy points at.
 */
export default function RelatedKits({ kits }) {
  if (!kits?.length) return null;

  return (
    <section className={SECTION}>
      <FadeInUp>
        <SectionHeader
          overline="Pairs well with"
          title="Kits people take next"
          description="Most businesses start with one kit and add another when it pays off. These are the usual next steps from this one."
        />
      </FadeInUp>
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
        {kits.map((kit) => (
          <KitCard key={kit.slug} kit={kit} color={getLineBySlug(kit.line).color} />
        ))}
      </div>
    </section>
  );
}
