"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";
import TextRoll from "@/components/ui/TextRoll";
import { mobileMenuOverlay, mobileMenuPanel } from "@/lib/animations";

/**
 * A hairline at the top of the viewport showing how far down the document
 * you are. It replaces the native scrollbar, which globals.css hides.
 *
 * Written straight to `transform` from a scroll listener, no React state, so
 * scrolling never triggers a render of the navbar and its mega-menu.
 */
function ScrollProgressBar() {
  const bar = useRef(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      // A page shorter than the viewport has no progress to report; showing a
      // permanently full bar would just be a blue line across the top.
      const p = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 z-[70] h-[3px] pointer-events-none"
    >
      <div
        ref={bar}
        className="h-full w-full origin-left bg-gradient-to-r from-primary via-secondary to-tertiary"
        style={{ transform: "scaleX(0)", willChange: "transform" }}
      />
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  /*
   * Two thresholds, not one. `isAtTop` flipped at a single 20px boundary, so
   * resting the page anywhere near it made the bar oscillate between its two
   * states, a 500ms transition restarting every few pixels reads as jitter,
   * not as animation. It has to travel to 48px to condense and back under
   * 12px to expand.
   */
  const [condensed, setCondensed] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCondensed((prev) => (prev ? y > 12 : y > 48));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const dropdownTimeout = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock scroll when the mobile menu or the desktop mega-menu is open.
  // `document.body.style.overflow` alone doesn't stop Lenis (it drives
  // scroll via its own rAF loop, independent of body overflow), so pause
  // it directly too.
  useEffect(() => {
    const locked = mobileOpen || Boolean(dropdownOpen);
    document.body.style.overflow = locked ? "hidden" : "";
    const lenis = window.lenis;
    if (lenis) {
      if (locked) lenis.stop?.();
      else lenis.start?.();
    }
    return () => {
      document.body.style.overflow = "";
      window.lenis?.start?.();
    };
  }, [mobileOpen, dropdownOpen]);

  // Warm the browser cache for every mega-menu image so the hover crossfade
  // never waits on a network fetch. These are full-bleed 2400px sources, so
  // the whole set is heavy, hold it until the main thread is idle and mark
  // it low priority so it never competes with the page's own LCP work.
  useEffect(() => {
    const warm = () => {
      NAV_LINKS.forEach((link) => {
        link.children?.forEach((child) => {
          if (!child.image) return;
          const img = new window.Image();
          img.fetchPriority = "low";
          img.decoding = "async";
          img.src = child.image;
        });
      });
    };

    const idle = window.requestIdleCallback;
    if (idle) {
      const handle = idle(warm, { timeout: 3000 });
      return () => window.cancelIdleCallback?.(handle);
    }
    const timer = setTimeout(warm, 2000);
    return () => clearTimeout(timer);
  }, []);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleDropdownEnter = (label) => {
    clearTimeout(dropdownTimeout.current);
    setDropdownOpen((prev) => {
      if (prev !== label) setPreviewIndex(0);
      return label;
    });
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(null), 200);
  };

  return (
    <>
      {/* Reading progress, pinned to the very top edge of the viewport. It
          sits above the bar rather than inside it so it stays a clean
          full-bleed hairline once the bar pulls in and rounds off. */}
      <ScrollProgressBar />

      {/*
        Two layers: a fixed positioning shell that gains side padding as you
        scroll, and the bar itself inside it. Insetting via padding on the
        shell keeps the bar a plain full-width flex row and lets it pull in
        from both edges into a floating island.

        Everything that changes between the two states is an interpolatable
        length or colour. That is the whole trick to it being smooth:

        - No `max-width` toggle. It used to go `max-w-6xl` ⇄ `max-w-none`, and
          `none` is not a length, so the width could not be interpolated and
          snapped instead. The island's inset now comes purely from the
          shell's padding.
        - The border is 1px on all four sides in both states, with only the
          colours changing. Going `border-b` ⇄ `border` altered the box's
          dimensions mid-transition and nudged the contents.
        - The inner row keeps explicit padding values in both states rather
          than swapping the `container-site` class in and out, which changed
          max-width, margins and padding all at once, discretely.
      */}
      <div
        className={cn(
          "fixed top-0 inset-x-0 z-[60] transition-[padding] duration-500 ease-premium",
          condensed ? "px-3 sm:px-5 pt-3" : "px-0 pt-0"
        )}
      >
        <nav
          className={cn(
            "border border-solid transition-[background-color,border-color,box-shadow,border-radius] duration-500 ease-premium",
            condensed
              ? "rounded-full border-outline-variant/50 bg-surface/85 shadow-glass-elevated"
              : "rounded-none border-transparent border-b-outline-variant/20 bg-surface/60 shadow-glass"
          )}
          style={{ backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)" }}
        >
          <div
            className={cn(
              "flex justify-between items-center mx-auto max-w-container-max",
              "transition-[height,padding] duration-500 ease-premium",
              condensed
                ? "h-16 px-5 sm:px-7"
                : "h-20 px-margin-x-mobile md:px-margin-x-tablet lg:px-margin-x-desktop"
            )}
          >
          {/* ── Brand ── */}
          <Link
            href="/"
            className="flex items-center group mr-auto lg:mr-12 xl:mr-16 shrink-0"
          >
            {/*
              Composed from the fox and the wordmark as two files rather than
              using `logo-horizontal.svg`, so the wordmark can collapse on its
              own and leave the fox behind. A single lockup could only be
              crossfaded against a second image, which reads as a swap; this
              reads as the name folding away.

              The gap and the relative sizes are measured off the real lockup
              (fox 614×484, wordmark 1312×241, gap 132 at a 483 height), so
              the composed version matches the artwork instead of
              approximating it.

              Plain <img>, not next/image: these are SVGs, which the image
              optimiser refuses to touch without `dangerouslyAllowSVG` and
              would gain nothing from. The logo is above the fold on every
              route and is the LCP candidate on most, so it loads eagerly.
            */}
            <img
              src="/brand/logo-fox.svg"
              alt=""
              aria-hidden="true"
              width={948}
              height={746}
              fetchPriority="high"
              decoding="async"
              className={cn(
                "w-auto object-contain transition-[height] duration-300 ease-premium",
                condensed ? "h-9" : "h-10"
              )}
            />
            <span
              className={cn(
                "overflow-hidden transition-[width,opacity,margin] duration-300 ease-premium",
                condensed ? "w-0 opacity-0 ml-0" : "w-[110px] opacity-100 ml-[11px]"
              )}
            >
              <img
                src="/brand/logo-wordmark.svg"
                alt={BRAND.name}
                width={1312}
                height={241}
                fetchPriority="high"
                decoding="async"
                className="h-5 w-[110px] max-w-none object-contain"
              />
            </span>
          </Link>

          {/* ── Desktop Links ── */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.hasDropdown && handleDropdownEnter(link.label)}
                onMouseLeave={() => link.hasDropdown && handleDropdownLeave()}
              >
                <Link
                  href={link.href}
                  aria-label={link.label}
                  className={cn(
                    "font-body text-body-md px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 whitespace-nowrap",
                    "focus-visible:shadow-[0_0_0_2px_#f7faff,0_0_0_4px_rgba(40,104,198,0.45)]",
                    isActive(link.href)
                      ? "text-primary relative after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-secondary after:rounded-full"
                      : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low/50"
                  )}
                >
                  <TextRoll>{link.label}</TextRoll>
                  {link.hasDropdown && (
                    <span
                      className={cn(
                        "material-symbols-outlined text-[18px] transition-transform duration-200",
                        dropdownOpen === link.label && "rotate-180"
                      )}
                    >
                      keyboard_arrow_down
                    </span>
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="btn-primary font-label text-label-caps px-6 py-2.5 rounded-full flex items-center justify-center uppercase tracking-widest whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>

          {/* ── Mobile Actions ── */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              className="relative flex items-center justify-center w-[44px] h-[44px] text-on-surface"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <span className={cn("absolute w-6 h-[2px] bg-current rounded-full transition-all duration-300", mobileOpen ? "rotate-45" : "-translate-y-2")} />
              <span className={cn("absolute w-6 h-[2px] bg-current rounded-full transition-all duration-300", mobileOpen ? "opacity-0 scale-x-0" : "opacity-100")} />
              <span className={cn("absolute w-6 h-[2px] bg-current rounded-full transition-all duration-300", mobileOpen ? "-rotate-45" : "translate-y-2")} />
            </button>
          </div>
        </div>

        {/* ── Desktop Mega Menu ── */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              key={dropdownOpen}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
              onMouseEnter={() => handleDropdownEnter(dropdownOpen)}
              onMouseLeave={handleDropdownLeave}
              className={cn(
                "hidden lg:block absolute top-full left-0 w-full border-outline-variant/20 bg-surface/95 shadow-glass-elevated overflow-hidden",
                // Detached from a rounded island vs. flush under a full-width
                // bar: square and butted up in one case, inset with its own
                // radius in the other.
                condensed ? "mt-2 rounded-3xl border" : "border-t"
              )}
              style={{ backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)" }}
            >
              {(() => {
                const activeLink = NAV_LINKS.find((l) => l.label === dropdownOpen);
                if (!activeLink?.children) return null;
                const active = activeLink.children[previewIndex] ?? activeLink.children[0];
                return (
                  <div className="relative h-[440px] w-full overflow-hidden">
                    {/* All images pre-mounted (loaded already); crossfade is a
                        pure opacity flip, so switching is instant. */}
                    {activeLink.children.map((child, i) => (
                      <img
                        width={2400}
                        height={880}
                        key={child.image}
                        src={child.image}
                        alt=""
                        decoding="async"
                        draggable={false}
                        className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-150 ease-out"
                        style={{ opacity: i === previewIndex ? 1 : 0 }}
                      />
                    ))}

                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    <div className="relative h-full container-site flex items-center">
                      <ul className="grid gap-1 w-full max-w-sm">
                        {activeLink.children.map((child, i) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-label={child.label}
                              onMouseEnter={() => setPreviewIndex(i)}
                              onFocus={() => setPreviewIndex(i)}
                              style={{ "--roll-accent": "#ffffff" }}
                              className={cn(
                                "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors font-body text-body-md",
                                previewIndex === i
                                  ? "bg-white/15 text-white"
                                  : "text-white/70 hover:bg-white/10 hover:text-white"
                              )}
                            >
                              <span className="material-symbols-outlined text-[20px] shrink-0">
                                {child.icon}
                              </span>
                              <TextRoll>{child.label}</TextRoll>
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {active.description && (
                        <div className="hidden xl:block absolute bottom-8 right-0 max-w-sm text-right pr-2">
                          <p className="font-display text-white text-2xl">{active.label}</p>
                          <p className="font-body text-white/75 text-sm mt-2">{active.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
        </nav>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              variants={mobileMenuOverlay}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-40 bg-on-surface/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              variants={mobileMenuPanel}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "fixed right-0 w-full sm:w-[400px] z-50 glass-elevated flex flex-col border-l border-outline-variant/30 bg-surface/95",
                /* `dvh`, not `vh`. On mobile Safari and Chrome `100vh` is the
                   viewport with the browser chrome retracted, a height the
                   page does not actually have until you scroll. The panel was
                   therefore taller than the visible area and its "Get Started"
                   button, the last thing in it, sat underneath the URL bar. */
                condensed ? "top-[76px] h-[calc(100dvh-76px)]" : "top-20 h-[calc(100dvh-5rem)]"
              )}
            >
              {/* Links */}
              <nav className="flex-1 px-6 pt-6 pb-8 overflow-y-auto">
                <div className="flex flex-col gap-2">
                  {NAV_LINKS.map((link) => (
                    <div key={link.label}>
                      {link.hasDropdown ? (
                        <div
                          className={cn(
                            "w-full flex items-center justify-between rounded-xl transition-colors",
                            mobileExpanded === link.label || isActive(link.href)
                              ? "bg-primary/5 border border-primary/20"
                              : "hover:bg-surface-container-low border border-transparent"
                          )}
                        >
                          <Link
                            href={link.href}
                            aria-label={link.label}
                            className={cn(
                              "flex-1 py-3 pl-4 font-display text-xl md:text-2xl transition-colors",
                              isActive(link.href) ? "text-primary" : "text-on-surface hover:text-primary"
                            )}
                            onClick={() => setMobileOpen(false)}
                          >
                            <TextRoll>{link.label}</TextRoll>
                          </Link>
                          <button
                            onClick={() => setMobileExpanded(prev => prev === link.label ? null : link.label)}
                            className={cn(
                              "p-3 pr-4 flex items-center justify-center transition-colors",
                              mobileExpanded === link.label ? "text-primary" : "text-on-surface hover:text-primary"
                            )}
                            aria-label={`Toggle ${link.label} dropdown`}
                          >
                            <span className={cn(
                              "material-symbols-outlined transition-transform duration-300",
                              mobileExpanded === link.label && "rotate-180"
                            )}>
                              expand_more
                            </span>
                          </button>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          aria-label={link.label}
                          className={cn(
                            "block py-3 px-4 rounded-xl font-display text-xl md:text-2xl transition-colors border border-transparent",
                            isActive(link.href)
                              ? "text-primary bg-primary/5 border-primary/20"
                              : "text-on-surface hover:text-primary hover:bg-surface-container-low"
                          )}
                          onClick={() => setMobileOpen(false)}
                        >
                          <TextRoll>{link.label}</TextRoll>
                        </Link>
                      )}

                      {/* Mobile sub-links */}
                      <AnimatePresence>
                        {link.hasDropdown && link.children && mobileExpanded === link.label && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden ml-4 flex flex-col gap-1 border-l-2 border-outline-variant/30 mt-2"
                          >
                            <div className="pt-2 pb-2 pl-4 flex flex-col gap-2">
                              {link.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  aria-label={child.label}
                                  className="flex items-center gap-3 py-2 text-body-md text-on-surface-variant hover:text-primary transition-colors font-body"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  <span className="material-symbols-outlined text-[20px]">
                                    {child.icon}
                                  </span>
                                  <TextRoll>{child.label}</TextRoll>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Mobile CTA */}
                <div className="mt-10">
                  <Link
                    href="/contact"
                    className="btn-primary w-full text-center font-label text-label-caps py-4 rounded-full uppercase tracking-widest flex items-center justify-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
