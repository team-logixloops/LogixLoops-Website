import Link from "next/link";
import ServiceMasterSignature from "@/components/sections/service-master/ServiceMasterSignature";
import { SECTION } from "@/components/sections/service-master/tokens";

/**
 * The technical half of a line or kit page, closed by default so the plain
 * half stays the page. It is literally a denser layer underneath, so the
 * panel takes `cipher-lens`. A kit's hands-on demo renders after it.
 *
 * The heading sits outside <summary>: inside it, screen readers flatten it
 * into the toggle's label and it drops out of the heading outline.
 */
export default function UnderTheHood({ points, demo, color }) {
  if (!points?.length) return null;

  return (
    <>
      <section className={SECTION}>
        <div className="cipher-lens rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/85 p-6 md:p-8">
          <h2 className="font-display text-headline-md text-on-surface">
            Under the hood
            <span className="mt-1 block font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
              For technical readers
            </span>
          </h2>
          <details className="group mt-4">
            {/* `list-none` hides the marker everywhere except Safari, which
                draws its own through ::-webkit-details-marker. */}
            <summary className="flex w-fit cursor-pointer list-none items-center gap-2 font-body text-body-md text-primary [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Show the technical details</span>
              <span className="hidden group-open:inline">Hide the technical details</span>
              <span
                className="material-symbols-outlined text-[20px] transition-transform duration-300 group-open:rotate-180"
                aria-hidden="true"
              >
                expand_more
              </span>
            </summary>
            <ul className="mt-6 flex flex-col gap-3">
              {points.map((point) => (
                <li key={point} className="flex gap-3 font-body text-body-md text-on-surface-variant">
                  <span className="font-mono text-primary" aria-hidden="true">
                    ›
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-body text-body-sm text-on-surface-variant">
              More on{" "}
              <Link href="/technology" className="text-primary underline-offset-4 hover:underline">
                the stack we build on
              </Link>{" "}
              and{" "}
              <Link href="/security" className="text-primary underline-offset-4 hover:underline">
                how we handle security
              </Link>
              .
            </p>
          </details>
        </div>
      </section>
      {demo && <ServiceMasterSignature demo={demo} color={color} />}
    </>
  );
}
