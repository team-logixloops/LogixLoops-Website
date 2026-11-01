import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/pricing";
import { formatPerDay, perDay } from "@/lib/loop-builder";

/**
 * A maintenance plan. A monthly price is a quantity, so `level-gauge`.
 *
 * Small monthly prices also show as a daily figure ("under $2.50 a day"),
 * which makes an ongoing cost feel like the small recurring thing it is
 * (Gourville's pennies-a-day). Only while the daily figure is small: past
 * that the framing works against the price, so the reserved team keeps its
 * monthly price alone. The recommended plan carries the same "Our pick" mark
 * as the recommended Loop build.
 */
export default function PlanCard({ plan }) {
  const dailyUsd = perDay(plan.price.usd, "usd");
  const dailyInr = perDay(plan.price.inr, "inr");

  return (
    <div
      className={cn(
        "level-gauge relative flex h-full flex-col rounded-2xl border bg-surface-container-lowest/85 p-6 md:p-8",
        plan.recommended ? "border-primary/40 shadow-lg shadow-primary/10" : "border-outline-variant/30"
      )}
    >
      {plan.recommended && (
        <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-primary to-tertiary px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-widest text-white">
          Our pick
        </span>
      )}
      <h3 className="font-display text-xl text-on-surface mb-1">{plan.name}</h3>
      <p className="mb-3">
        <span className="block font-body text-body-sm text-on-surface-variant">Starting from</span>
        <span className="font-display text-lg font-semibold text-primary">{formatPrice(plan.price)}</span>
        {dailyUsd && dailyInr && (
          <span className="mt-1 block font-body text-body-sm text-on-surface-variant">
            Under {formatPerDay(dailyUsd, "usd")} a day ({formatPerDay(dailyInr, "inr")} in India)
          </span>
        )}
      </p>
      <p className="font-body text-body-md text-on-surface-variant mb-6">{plan.summary}</p>
      <ul className="mb-6 flex flex-1 flex-col gap-3">
        {plan.includes.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[18px] mt-0.5 text-primary" aria-hidden="true">
              check
            </span>
            <span className="font-body text-body-sm text-on-surface">{item}</span>
          </li>
        ))}
      </ul>
      <p className="border-t border-outline-variant/30 pt-4 mb-4 font-body text-body-sm text-on-surface-variant">
        {plan.terms}
      </p>
      <Button href={`/contact?plan=${plan.slug}`} variant={plan.recommended ? "solid" : "outline"} className="w-full justify-center">
        Start {plan.name}
      </Button>
    </div>
  );
}
