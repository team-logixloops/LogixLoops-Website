import { cn } from "@/lib/utils";
import { SECTION, accent } from "@/components/sections/service-master/tokens";

function FitList({ title, items, icon, iconClass }) {
  return (
    <div>
      <h2 className="mb-6 font-display text-headline-md text-on-surface">{title}</h2>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className={cn("material-symbols-outlined text-[20px] mt-0.5", iconClass)} aria-hidden="true">
              {icon}
            </span>
            <span className="font-body text-body-md text-on-surface">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Who the kit is for, and who it is not for. The second list is the honest
 * one, and it points the reader at the kit that does fit.
 */
export default function KitFit({ fitFor, notFor, color }) {
  const a = accent(color);

  return (
    <section className={SECTION}>
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
        <FitList title="Right for you if" items={fitFor} icon="check_circle" iconClass={a.text} />
        <FitList title="Not the right kit if" items={notFor} icon="do_not_disturb_on" iconClass="text-on-surface-variant" />
      </div>
    </section>
  );
}
