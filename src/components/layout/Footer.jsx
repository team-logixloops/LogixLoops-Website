import Link from "next/link";
import { BRAND, FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { BubbleText } from "@/components/ui";
import { RuixenGradientFooter } from "@/components/ui/RuixenGradientFooter";
import SocialIcon, { SOCIAL_BRAND_COLORS } from "@/components/ui/SocialIcon";

export default function Footer() {
  return (
    <RuixenGradientFooter
      // 30vh of glow meant ~16vh of clearance beneath the last line even at
      // 0.55, still a visible void under the footer. The band only needs to
      // read as a wash off the floor of the page, not as a third of a screen.
      gradientHeight="14vh"
      className="w-full bg-surface-container-lowest border-t border-outline-variant/30 relative z-10 mt-auto"
    >
      <div className="container-site py-stack-xl">
        {/* ── Main Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-gutter">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4">
            {/*
              The lockup, fox + wordmark, no tagline.

              Not `logo-full.svg`, which bakes the tagline in at 6% of its
              height: at any width the fox looks right at, that lands around a
              6px cap height with 0.7px stems, and sub-pixel strokes get eaten
              by antialiasing. That was the holes. The tagline lives in the
              bottom bar as live text instead, where it renders crisp.
            */}
            <Link href="/" className="inline-block mb-6 group w-52">
              <img
                src="/brand/logo-lockup.svg"
                alt={BRAND.name}
                width={1312}
                height={1029}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="font-body text-body-md text-on-surface-variant mb-6 max-w-xs">
              {BRAND.description}
            </p>

            {/* Social Links.
                Each button carries its platform's own hex as a CSS variable,
                so one rule handles all three: neutral at rest, the real brand
                colour on hover and on keyboard focus. Driving it from a
                variable rather than per-platform classes also keeps the
                colours out of Tailwind's scan, they are data, not design
                tokens, and they don't belong in the palette. */}
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  style={{ "--brand": SOCIAL_BRAND_COLORS[social.label] }}
                  className="group w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-[color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-surface-container-lowest hover:text-[var(--brand)] focus-visible:text-[var(--brand)] hover:shadow-glass"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon label={social.label} className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Column */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="font-label text-label-caps text-on-surface uppercase tracking-widest mb-5">
              Company
            </h2>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-label={link.label}
                    className="font-body text-body-md text-on-surface-variant hover:text-secondary transition-colors"
                  >
                    <BubbleText text={link.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="font-label text-label-caps text-on-surface uppercase tracking-widest mb-5">
              Resources
            </h2>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-label={link.label}
                    className="font-body text-body-md text-on-surface-variant hover:text-secondary transition-colors"
                  >
                    <BubbleText text={link.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="font-label text-label-caps text-on-surface uppercase tracking-widest mb-5">
              Services
            </h2>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-label={link.label}
                    className="font-body text-body-md text-on-surface-variant hover:text-secondary transition-colors"
                  >
                    <BubbleText text={link.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="font-label text-label-caps text-on-surface uppercase tracking-widest mb-5">
              Legal
            </h2>
            <div className="flex flex-col gap-3">
              {FOOTER_LINKS.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-label={link.label}
                  className="font-body text-body-sm text-on-surface-variant hover:text-secondary transition-colors"
                >
                  <BubbleText text={link.label} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-12 pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-body-sm text-on-surface-variant">
            {BRAND.copyright}
          </p>
          {/* The mark's own tagline, set in the artwork's steel. This is the
              only place it appears, it used to sit under the lockup above
              as well, and a tagline said twice in one footer is a tagline
              nobody reads. */}
          <p className="font-body text-body-sm font-medium tracking-wide text-brand-steel">
            {BRAND.logoTagline}
          </p>
        </div>
      </div>
    </RuixenGradientFooter>
  );
}
