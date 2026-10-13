import Link from "next/link";
import { LINES } from "@/data/lines";
import { getKitsByLine } from "@/data/kits";
import { getAllPlans } from "@/data/plans";
import { cheapest, formatPrice } from "@/lib/pricing";

/* The cheapest way into a line, for the directory cards. */
const fromPrice = (line) => {
  const offers = getKitsByLine(line.slug);
  return formatPrice(cheapest(offers.length ? offers : getAllPlans()).price);
};

/**
 * The six lines as plain cards, each with its pitch and the cheapest way in.
 * Shared by /services and the home page, so both link every line with the
 * same live starting price.
 */
export default function LineDirectory() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-gutter">
      {LINES.map((line) => (
        <li key={line.slug}>
          {/* `glow-sweep` is the shared hover treatment (globals.css): a
              1px conic ring that travels the border, over the card's own
              glass. It masks itself out on coarse pointers, so the tap
              state on mobile stays clean. */}
          <Link
            href={`/services/${line.slug}`}
            /* No `backdrop-blur` here, deliberately, and this is why the
               grid used to drag while you scrolled it. Each card carrying a
               24px backdrop filter means one sample-and-blur pass per card,
               and because `AmbientGlows` is a *fixed* layer, what sits
               behind each card changes on every single scroll frame, so
               none of those passes can ever be cached. The cards sit on a
               near-white surface, so an opaque tint reads the same. */
            className="glow-sweep group flex flex-col h-full rounded-2xl border border-outline-variant/30 bg-white/75 p-6 shadow-glass transition-[transform,background-color,border-color] duration-300 ease-out hover:-translate-y-1 hover:bg-white/95 hover:border-primary/30 motion-reduce:transform-none"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5 transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
              <span className="material-symbols-outlined text-[22px]">{line.icon}</span>
            </span>
            <span className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant mb-1">
              {line.name}
            </span>
            <h3 className="font-display text-headline-md text-on-surface mb-3 transition-colors duration-300 group-hover:text-primary">
              {line.label}
            </h3>
            <p className="font-body text-body-sm text-on-surface-variant mb-5 flex-1">{line.pitch}</p>
            <span className="font-label text-[11px] uppercase tracking-widest text-primary">
              From {fromPrice(line)}
            </span>
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-primary text-[18px] mt-5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none"
            >
              arrow_forward
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
