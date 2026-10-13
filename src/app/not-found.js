import Link from "next/link";
import { LINES } from "@/data/lines";
import { KITS } from "@/data/kits";
import { LogoPuzzle } from "@/components/ui";

// Next's built-in 404 shipped a 167-char meta description and no internal
// links. A 404 still gets crawled, it should route people somewhere useful.
export const metadata = {
  title: "Page Not Found",
  description:
    "That page does not exist. Browse LogixLoops services, kits with published prices, client work and insights instead.",
  // No `noindex` here on purpose: this route is served with a 404 status, which
  // already keeps it out of the index. A meta robots tag on top of that adds
  // nothing and makes the page look deliberately suppressed to auditing tools.
  alternates: { canonical: "/404" },
};

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-[70vh] px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto pt-stack-xl pb-stack-xl">
      {/*
        Two columns so the copy has something to sit beside, a lone 404
        headline leaves the right half of a wide screen empty. The puzzle is
        decoration with a purpose: it ends in a link home. Everything a
        visitor actually needs is in the link columns underneath, which do
        not depend on the puzzle rendering at all.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg lg:gap-gutter items-center mb-stack-xl">
        <div className="lg:col-span-5">
          <span className="font-label text-label-caps text-primary uppercase tracking-widest mb-4 block">
            Error 404
          </span>
          <h1 className="font-display text-display-lg-mobile md:text-display-xl text-on-surface tracking-tight mb-6">
            We could not find that page.
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant">
            The URL may be mistyped, or the page may have moved. Everything
            below is still where you left it, and the mark on the right came
            apart in the process.
          </p>
        </div>

        <div className="lg:col-span-7">
          <LogoPuzzle />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <section aria-labelledby="nf-pages">
          <h2
            id="nf-pages"
            className="font-label text-label-caps text-on-surface uppercase tracking-widest mb-4"
          >
            Main pages
          </h2>
          <ul className="flex flex-col gap-2">
            {[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { href: "/kits", label: "Advantage Kits" },
              { href: "/pricing", label: "Pricing" },
              { href: "/work", label: "Selected work" },
              { href: "/blog", label: "Insights" },
              { href: "/process", label: "Our process" },
              { href: "/faq", label: "Frequently asked questions" },
              { href: "/contact", label: "Contact us" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-body text-body-md text-on-surface-variant hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="nf-services">
          <h2
            id="nf-services"
            className="font-label text-label-caps text-on-surface uppercase tracking-widest mb-4"
          >
            Services
          </h2>
          <ul className="flex flex-col gap-2">
            {LINES.map((line) => (
              <li key={line.slug}>
                <Link
                  href={`/services/${line.slug}`}
                  className="font-body text-body-md text-on-surface-variant hover:text-primary transition-colors"
                >
                  {line.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="nf-kits">
          <h2
            id="nf-kits"
            className="font-label text-label-caps text-on-surface uppercase tracking-widest mb-4"
          >
            Kits
          </h2>
          <ul className="flex flex-col gap-2">
            {KITS.map((kit) => (
              <li key={kit.slug}>
                <Link
                  href={`/kits/${kit.slug}`}
                  className="font-body text-body-md text-on-surface-variant hover:text-primary transition-colors"
                >
                  {kit.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
