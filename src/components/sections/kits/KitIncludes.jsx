import { SectionHeader } from "@/components/ui";
import { FadeInUp } from "@/components/motion";
import { cn } from "@/lib/utils";
import { SECTION, accent } from "@/components/sections/service-master/tokens";
import KitLinkedText from "./KitLinkedText";

/** The deliverables, as a checklist. Read, not handled, so no hover. */
export default function KitIncludes({ items, color, kitSlug }) {
  const a = accent(color);

  return (
    <section className={SECTION}>
      <FadeInUp>
        <SectionHeader overline="What's in the Loop" title="Everything included in the price" align="left" />
      </FadeInUp>
      <ul className="grid max-w-4xl grid-cols-1 gap-x-gutter gap-y-4 md:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className={cn("material-symbols-outlined text-[20px] mt-0.5", a.text)} aria-hidden="true">
              check_circle
            </span>
            <span className="font-body text-body-md text-on-surface">
              <KitLinkedText text={item} except={kitSlug} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
