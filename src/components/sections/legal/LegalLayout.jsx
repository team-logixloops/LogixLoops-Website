"use client";

import { useState, useEffect } from "react";
import { FadeInUp, FadeIn } from "@/components/motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function LegalLayout({ title, effectiveDate, description, sections, summary, children }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");

  /*
   * Two things were wrong with this and both of them stuttered the scroll.
   *
   * The listener was not `passive`, so the browser had to wait to find out
   * whether it would call `preventDefault` before it could scroll at all,
   * on every event. And it read `offsetTop`/`offsetHeight` for every section
   * inside the handler, which forces a synchronous layout each time, again on
   * every event, on a page with a dozen-odd sections.
   *
   * Now: passive, coalesced to one pass per frame, and the geometry is
   * measured once and re-measured only when the document can have changed.
   */
  useEffect(() => {
    let frame = 0;
    let bounds = [];

    const measure = () => {
      bounds = sections
        .map(({ id }) => {
          const element = document.getElementById(id);
          if (!element) return null;
          return { id, top: element.offsetTop, bottom: element.offsetTop + element.offsetHeight };
        })
        .filter(Boolean);
    };

    const update = () => {
      frame = 0;
      const position = window.scrollY + 150; // Offset for fixed header
      // Last match wins, so a position inside overlapping boxes resolves to
      // the section furthest down the page.
      let current = null;
      for (const section of bounds) {
        if (position >= section.top && position < section.bottom) current = section.id;
      }
      if (current) setActiveSection(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [sections]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    const top = element.offsetTop - 100; // Offset for navbar
    // Lenis owns the scroll position from its own rAF loop, so a native
    // `behavior: "smooth"` animation gets overwritten on the very next frame
    // and the jump reads as broken. Ask the scroller that is actually driving.
    if (window.lenis) window.lenis.scrollTo(top);
    else window.scrollTo({ top, behavior: "smooth" });
    setActiveSection(id);
  };

  return (
    <main className="relative z-10 overflow-hidden bg-surface pb-stack-xl">
      {/* Muted Premium Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-surface-container-lowest to-surface opacity-80" />
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="pt-[160px] pb-16 px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
        <FadeInUp>
          <div className="max-w-3xl">
            {/*
              Legal text gets printed, PDF'd and pasted into email far more
              than the rest of the site, and it travels without the navbar
              when it does. The lockup at the head of the document is what
              keeps a stray page of terms attributable.
              eslint-disable-next-line @next/next/no-img-element
            */}
            <img
              src="/brand/logo-horizontal.svg"
              alt="LogixLoops"
              width={2058}
              height={483}
              className="h-9 w-auto object-contain object-left mb-8"
            />
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-outline-variant/30 bg-surface-container-lowest/50 backdrop-blur-md mb-6">
              <span className="material-symbols-outlined text-[16px] text-primary">gavel</span>
              <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
                Legal Documentation
              </span>
            </div>
            {/* `display-md` is not a token. The mobile size came from nowhere
                and the heading fell back to the browser default until `md:`
                took over at 768px; `display-lg` is now fluid, so one class
                covers the whole range. */}
            <h1 className="font-display text-display-lg text-on-surface mb-6 tracking-tight">
              {title}
            </h1>
            <p className="font-body text-body-lg text-on-surface-variant leading-relaxed mb-6">
              {description}
            </p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-outline-variant uppercase tracking-wider">Effective Date:</span>
              <span className="font-label text-sm text-on-surface">{effectiveDate}</span>
            </div>

            {/* Plain-language summary. The clauses below are necessarily
                dense. This is the short version, and it is what most readers
                came for. The full text still governs. */}
            {summary?.length > 0 && (
              <div className="cipher-lens mt-10 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/60 backdrop-blur-xl p-6 md:p-8">
                <h2 className="font-display text-headline-md text-on-surface mb-4">
                  The short version
                </h2>
                <ul className="flex flex-col gap-3">
                  {summary.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[18px] mt-0.5 text-primary">
                        check
                      </span>
                      <span className="font-body text-body-md text-on-surface-variant">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="font-body text-body-sm text-outline-variant mt-6">
                  This summary is for readability only. The full terms below are
                  what actually apply.
                </p>
              </div>
            )}
          </div>
        </FadeInUp>
      </section>

      {/* Content Section with Sticky Sidebar */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto border-t border-outline-variant/30 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-gutter relative">
          
          {/* Sticky Sidebar */}
          <FadeIn className="hidden lg:block lg:col-span-3">
            <div className="sticky top-[120px]">
              <h2 className="font-label text-xs text-outline-variant uppercase tracking-widest mb-6">
                Contents
              </h2>
              <nav className="flex flex-col gap-1 border-l-2 border-outline-variant/20">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={(e) => scrollToSection(e, section.id)}
                    className={cn(
                      "text-left py-2 px-4 font-body text-sm transition-colors border-l-2 -ml-[2px]",
                      activeSection === section.id
                        ? "border-primary text-primary font-medium bg-primary/5"
                        : "border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline-variant"
                    )}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
              
              <div className="dispatch mt-12 p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/50 backdrop-blur-sm shadow-glass">
                <span data-dispatch className="material-symbols-outlined text-primary mb-3 text-[24px] block w-fit">contact_support</span>
                <h3 className="font-label text-sm text-on-surface mb-2">Legal Inquiries</h3>
                <p className="font-body text-xs text-on-surface-variant mb-4 leading-relaxed">
                  For any questions regarding our terms, policies, or legal agreements, please reach out.
                </p>
                <Link href="/contact" className="font-label text-[10px] text-primary hover:text-secondary uppercase tracking-widest transition-colors flex items-center gap-1 w-fit group">
                  Contact Legal <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Legal Content Body */}
          <div className="lg:col-span-9 max-w-4xl">
            <div className="legal-content-wrapper space-y-12">
              {children}
            </div>
            
            <div className="mt-16 pt-8 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="font-body text-sm text-on-surface-variant">
                End of {title}.
              </p>
              <Link href="/contact" className="px-4 py-2 rounded-lg border border-outline-variant/40 hover:border-primary/50 text-sm font-label text-on-surface transition-colors shadow-sm">
                Request Clarification
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
