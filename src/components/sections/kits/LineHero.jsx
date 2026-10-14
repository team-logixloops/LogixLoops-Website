import { FadeInUpImmediate } from "@/components/motion";
import { Button } from "@/components/ui";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";
import { accent } from "@/components/sections/service-master/tokens";

/**
 * Compact detail-route hero for a line. The H1 is the plain label, because
 * that is what people search for; the memorable name sits in the chip above
 * it, so the two are never apart.
 */
export default function LineHero({ line, fromLabel }) {
  const a = accent(line.color);

  return (
    <section className="relative px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto pt-[120px] pb-stack-lg">
      <div className="grid w-full grid-cols-1 items-center gap-gutter lg:grid-cols-12">
        <FadeInUpImmediate className="lg:col-span-7">
          <Breadcrumbs current={line.label} />
          <span className="mt-4 mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-lowest/85 px-3 py-1.5">
            <span className={cn("material-symbols-outlined text-[16px]", a.text)} aria-hidden="true">
              {line.icon}
            </span>
            <span className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
              {line.name}
            </span>
          </span>
          <h1 className="mb-4 font-display text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight leading-[1.05] text-balance">
            {line.label}
          </h1>
          <p
            className={cn(
              "mb-6 font-display text-headline-lg-mobile md:text-headline-md text-transparent bg-clip-text bg-gradient-to-r",
              a.gradient
            )}
          >
            {line.pitch}
          </p>
          <p className="mb-6 max-w-2xl font-body text-body-lg text-on-surface-variant leading-relaxed">{line.summary}</p>
          <p className="mb-8 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">{fromLabel}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href={`/contact?line=${line.slug}`} size="lg" icon="arrow_forward" iconPosition="right">
              Start a project
            </Button>
            <Button href="/loops" variant="ghost" size="lg">
              See every Loop
            </Button>
          </div>
        </FadeInUpImmediate>
        <div className="relative hidden aspect-square items-center justify-center rounded-3xl border border-outline-variant/30 bg-surface-container-lowest/85 lg:col-span-5 lg:flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={line.art} alt="" width={64} height={64} className="h-auto w-[46%] select-none" draggable={false} />
        </div>
      </div>
    </section>
  );
}
