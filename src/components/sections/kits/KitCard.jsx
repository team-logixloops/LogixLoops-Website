import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/pricing";
import { accent } from "@/components/sections/service-master/tokens";

/**
 * A kit as a card. The whole card links to the kit, and the price is what a
 * reader compares across cards, so it takes `level-gauge` (a quantity).
 */
export default function KitCard({ kit, color }) {
  const a = accent(color);

  return (
    <Link
      href={`/kits/${kit.slug}`}
      className="level-gauge flex h-full flex-col rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/85 p-6 md:p-8 transition-colors duration-300 hover:border-primary/30"
    >
      <h3 className="font-display text-xl text-on-surface mb-2">{kit.name}</h3>
      <p className="font-body text-body-md text-on-surface-variant mb-6 flex-1 first-letter:uppercase">
        {kit.promise}
      </p>
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-outline-variant/30 pt-4">
        <span className={cn("font-display text-lg font-semibold", a.text)}>
          From {formatPrice(kit.price)}
        </span>
        <span className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
          {kit.timeline}
        </span>
      </div>
      {/* A third-party cost that is not in the price travels with it. */}
      {kit.priceNote && (
        <p className="mt-2 font-body text-body-sm text-on-surface-variant">{kit.priceNote}.</p>
      )}
    </Link>
  );
}
