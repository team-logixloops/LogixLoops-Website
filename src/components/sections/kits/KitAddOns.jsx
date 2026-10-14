import { SectionHeader } from "@/components/ui";
import { FadeInUp } from "@/components/motion";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/pricing";
import { SECTION, accent } from "@/components/sections/service-master/tokens";

/** Optional extras, each priced, as a plain ruled list. */
export default function KitAddOns({ addOns, color }) {
  if (!addOns?.length) return null;
  const a = accent(color);

  return (
    <section className={SECTION}>
      <FadeInUp>
        <SectionHeader
          overline="Add-ons"
          title="Add only what you need"
          description="Priced up front, like the Loop itself."
          align="left"
        />
      </FadeInUp>
      <ul className="max-w-3xl divide-y divide-outline-variant/30 border-y border-outline-variant/30">
        {addOns.map((addOn) => (
          <li key={addOn.name} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <span className="font-body text-body-md text-on-surface">{addOn.name}</span>
            <span className={cn("whitespace-nowrap font-display text-base font-semibold", a.text)}>
              + {formatPrice(addOn.price)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
