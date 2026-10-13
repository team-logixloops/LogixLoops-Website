import Link from "next/link";
import { FadeInUpImmediate } from "@/components/motion";
import { Button } from "@/components/ui";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/pricing";
import { accent } from "@/components/sections/service-master/tokens";

/**
 * Compact detail-route hero. The H1 is the kit name and its plain promise,
 * the lead is the answer-first summary, and price and timeline sit in the
 * first screen because they are the first two things a buyer looks for.
 */
export default function KitHero({ kit, line }) {
  const a = accent(line.color);

  return (
    <section className="relative px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto pt-[120px] pb-stack-lg">
      <FadeInUpImmediate className="max-w-3xl">
        <Breadcrumbs current={kit.name} />
        <Link
          href={`/services/${line.slug}`}
          className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-lowest/85 px-3 py-1.5 transition-colors hover:border-primary/30"
        >
          <span className={cn("material-symbols-outlined text-[16px]", a.text)} aria-hidden="true">
            {line.icon}
          </span>
          <span className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
            {line.name} · {line.label}
          </span>
        </Link>
        <h1 className="mt-6 mb-6 font-display text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight leading-[1.05] text-balance">
          {kit.name}:{" "}
          <span className={cn("text-transparent bg-clip-text bg-gradient-to-r", a.gradient)}>{kit.promise}</span>
        </h1>
        <p className="mb-8 font-body text-body-lg text-on-surface-variant leading-relaxed">{kit.summary}</p>
        <dl className="mb-8 flex flex-wrap gap-3">
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest/85 px-4 py-3">
            <dt className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant">From</dt>
            <dd className={cn("font-display text-xl font-semibold", a.text)}>{formatPrice(kit.price)}</dd>
          </div>
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest/85 px-4 py-3">
            <dt className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant">Timeline</dt>
            <dd className="font-display text-xl font-semibold text-on-surface">{kit.timeline}</dd>
          </div>
        </dl>
        {kit.priceNote && (
          <p className="-mt-4 mb-8 font-body text-body-sm text-on-surface-variant">{kit.priceNote}.</p>
        )}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href={`/contact?kit=${kit.slug}`} size="lg" icon="arrow_forward" iconPosition="right">
            Start this kit
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Ask a question first
          </Button>
        </div>
      </FadeInUpImmediate>
    </section>
  );
}
