import { SectionHeader } from "@/components/ui";
import { FadeInUp } from "@/components/motion";
import { PROMISES } from "@/lib/constants";

/**
 * The six promises against the habit each one replaces, as a real table.
 * A two-column comparison is the format answer engines lift most readily,
 * and the rows come from PROMISES, so they match every kit page word for word.
 */
export default function ComparisonSection() {
  return (
    <section className="relative z-10 px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl border-t border-outline-variant/30">
      <FadeInUp>
        <SectionHeader
          overline="Your unfair advantage"
          title="The usual agency vs LogixLoops"
          description="Six habits that make agency projects slow, expensive and hard to leave, and what every LogixLoops kit does instead."
        />
      </FadeInUp>
      {/* Phones get one card per promise: three columns at 360px meant
          sideways scrolling through a table to read one sentence. */}
      <ul className="flex flex-col gap-4 md:hidden">
        {PROMISES.map((promise) => (
          <li
            key={promise.title}
            className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/85 p-5"
          >
            <p className="mb-3 flex items-center gap-3 font-display text-lg text-on-surface">
              <span className="material-symbols-outlined text-[22px] text-primary" aria-hidden="true">
                {promise.icon}
              </span>
              {promise.title}
            </p>
            <p className="mb-2 font-body text-body-sm text-on-surface-variant">
              <span className="font-label text-label-caps uppercase tracking-widest">The usual agency: </span>
              {promise.usual}
            </p>
            <p className="font-body text-body-md text-on-surface">
              <span className="font-label text-label-caps uppercase tracking-widest text-primary">LogixLoops: </span>
              {promise.detail}
            </p>
          </li>
        ))}
      </ul>
      {/* From tablet up, a real table. It keeps a 640px floor, so a narrow
          window scrolls inside this box; `no-scrollbar` stops a swipe past its
          right edge being handed to the browser as a back-navigation. */}
      <div
        tabIndex={0}
        role="region"
        aria-label="The usual agency compared with LogixLoops, scrolls horizontally"
        className="hidden md:block overflow-x-auto no-scrollbar rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/85"
      >
        <table className="w-full min-w-[640px] border-collapse">
          <caption className="sr-only">How LogixLoops differs from the usual agency</caption>
          <thead>
            <tr className="border-b border-outline-variant/30">
              <th scope="col" className="p-4 md:p-6 text-left font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
                &nbsp;
              </th>
              <th scope="col" className="p-4 md:p-6 text-left font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
                The usual agency
              </th>
              <th scope="col" className="p-4 md:p-6 text-left font-label text-label-caps uppercase tracking-widest text-primary">
                LogixLoops
              </th>
            </tr>
          </thead>
          <tbody className="font-body text-body-md">
            {PROMISES.map((promise) => (
              <tr key={promise.title} className="border-b border-outline-variant/20 last:border-0">
                <th scope="row" className="p-4 md:p-6 align-top text-left">
                  <span className="flex items-center gap-3 font-display text-lg text-on-surface">
                    <span className="material-symbols-outlined text-[22px] text-primary" aria-hidden="true">
                      {promise.icon}
                    </span>
                    {promise.title}
                  </span>
                </th>
                <td className="p-4 md:p-6 align-top text-on-surface-variant">{promise.usual}</td>
                <td className="p-4 md:p-6 align-top text-on-surface">{promise.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
