import { Button } from "@/components/ui";
import { FadeInUp } from "@/components/motion";

/**
 * The closing call to action on line and kit pages. It sends you somewhere,
 * so it takes `dispatch`: the rail draws down the left edge and the primary
 * label nudges forward on hover.
 */
export default function StudioCta({ heading, body, primary, secondary }) {
  return (
    <section className="py-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto mb-stack-xl">
      <FadeInUp>
        <div className="dispatch relative flex flex-col items-center rounded-3xl border border-outline-variant/30 bg-surface-container-lowest/85 p-8 text-center shadow-glass sm:p-12 md:p-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-fox-knockout.svg"
            alt=""
            aria-hidden="true"
            width={948}
            height={746}
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute -left-16 -bottom-12 h-[130%] w-auto max-w-none opacity-[0.05] select-none"
          />
          <h2 className="relative mb-6 max-w-3xl font-display text-headline-lg-mobile md:text-display-lg text-on-surface tracking-tight text-balance">
            {heading}
          </h2>
          <p className="relative mb-10 max-w-2xl font-body text-body-lg text-on-surface-variant leading-relaxed">
            {body}
          </p>
          <div className="relative flex flex-col gap-4 sm:flex-row">
            <Button href={primary.href} size="lg" icon="arrow_forward" iconPosition="right">
              <span data-dispatch>{primary.label}</span>
            </Button>
            {secondary && (
              <Button href={secondary.href} variant="ghost" size="lg">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </FadeInUp>
    </section>
  );
}
