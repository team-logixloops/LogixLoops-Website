import { SectionHeader } from "@/components/ui";
import { FadeInUp } from "@/components/motion";
import { cn } from "@/lib/utils";
import { SECTION, accent, pad } from "@/components/sections/service-master/tokens";

/**
 * The kit's steps in order. A sequence is read, not handled, so no hover.
 * The Loop is set apart from the rest because it is the step most studios
 * do not have.
 */
export default function KitSteps({ steps, color }) {
  const a = accent(color);

  return (
    <section className={SECTION}>
      <FadeInUp>
        <SectionHeader overline="How it runs" title="From kick-off to The Loop" align="left" />
      </FadeInUp>
      <ol className="flex max-w-3xl flex-col gap-4">
        {steps.map((step, i) => {
          const isLoop = i === steps.length - 1;
          return (
            <li
              key={step.title}
              className={cn(
                "flex gap-5 rounded-2xl border p-6",
                isLoop ? cn(a.ring, a.soft) : "border-outline-variant/30 bg-surface-container-lowest/85"
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-label text-label-caps",
                  a.soft,
                  a.text
                )}
                aria-hidden="true"
              >
                {isLoop ? <span className="material-symbols-outlined text-[20px]">all_inclusive</span> : pad(i)}
              </span>
              <div>
                <h3 className="mb-1 font-display text-xl text-on-surface">{step.title}</h3>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">{step.desc}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
