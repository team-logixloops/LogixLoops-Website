"use client";

import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { OUR_BLEND, PROCESS_ANTIPATTERNS } from "@/data/methodologies";

/**
 * MethodologyBlend, what we actually run, and what we refuse to.
 *
 * Four stages, each governed by the model that is strongest at that stage
 * rather than by one model stretched across all four. The refusals are on the
 * same page deliberately: a process page that only lists what a firm is
 * willing to do says nothing, because no firm lists the opposite.
 */
export default function MethodologyBlend() {
  return (
    <>
      <StaggerContainer className="grid gap-gutter sm:grid-cols-2 xl:grid-cols-4">
        {OUR_BLEND.map((entry, index) => (
          <StaggerItem key={entry.stage}>
            <article className="glow-sweep flex h-full flex-col rounded-2xl border border-outline-variant/40 bg-surface-container-lowest/70 p-6 shadow-glass backdrop-blur-xl">
              <span className="font-label text-label-sm uppercase tracking-widest text-outline">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                className="material-symbols-outlined icon-md mt-3 text-primary"
                aria-hidden="true"
              >
                {entry.icon}
              </span>

              <h3 className="mt-4 font-heading text-headline-md text-on-surface">
                {entry.stage}
              </h3>
              <p className="mt-1 font-label text-label-caps uppercase tracking-widest text-secondary">
                {entry.model}
              </p>
              <p className="mt-3 font-body text-body-sm text-on-surface-variant">
                {entry.detail}
              </p>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeInUp>
        <div className="mt-stack-lg rounded-2xl border border-outline-variant/40 bg-surface-container-low/50 p-6 backdrop-blur-xl md:p-10">
          <h3 className="font-heading text-headline-md text-on-surface">
            Four things we will not do
          </h3>
          <p className="mt-2 max-w-2xl font-body text-body-md text-on-surface-variant">
            Each of these has cost us work. They are here because the
            constraints a firm holds to are more informative than the services
            it lists.
          </p>

          <ul className="mt-stack-md grid gap-gutter md:grid-cols-2">
            {PROCESS_ANTIPATTERNS.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span
                  className="material-symbols-outlined mt-0.5 shrink-0 text-[20px] text-error"
                  aria-hidden="true"
                >
                  block
                </span>
                <span>
                  <span className="block font-heading text-body-md text-on-surface">
                    {item.title}
                  </span>
                  <span className="mt-1 block font-body text-body-sm text-on-surface-variant">
                    {item.detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </FadeInUp>
    </>
  );
}
