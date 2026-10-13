import { Button } from "@/components/ui";
import { formatPrice } from "@/lib/pricing";

/** A Pit Crew plan. A monthly price is a quantity, so `level-gauge`. */
export default function PlanCard({ plan }) {
  return (
    <div className="level-gauge flex h-full flex-col rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/85 p-6 md:p-8">
      <h3 className="font-display text-xl text-on-surface mb-1">{plan.name}</h3>
      <p className="font-display text-lg font-semibold text-primary mb-3">From {formatPrice(plan.price)}</p>
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
      <Button href={`/contact?plan=${plan.slug}`} variant="outline" className="w-full justify-center">
        Start {plan.name}
      </Button>
    </div>
  );
}
