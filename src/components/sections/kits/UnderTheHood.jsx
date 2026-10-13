import Link from "next/link";
import ServiceMasterSignature from "@/components/sections/service-master/ServiceMasterSignature";
import { SECTION } from "@/components/sections/service-master/tokens";

/**
 * The technical half of a line or kit page, closed by default so the plain
 * half stays the page. It is literally a denser layer underneath, so the
 * panel takes `cipher-lens`. A kit's hands-on demo renders after it.
 */
export default function UnderTheHood({ points, demo, color }) {
  if (!points?.length) return null;

  return (
    <>
      <section className={SECTION}>
        <details className="cipher-lens group rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/85 p-6 md:p-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
            <h2 className="font-display text-headline-md text-on-surface">
              Under the hood
              <span className="mt-1 block font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
                For technical readers
              </span>
            </h2>
            <span
              className="material-symbols-outlined text-on-surface-variant transition-transform duration-300 group-open:rotate-180"
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
      </section>
      {demo && <ServiceMasterSignature demo={demo} color={color} />}
    </>
  );
}
