"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { mobileMenuOverlay, mobileMenuPanel } from "@/lib/animations";

export default function Navbar() {
  const pathname = usePathname();
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const dropdownTimeout = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleDropdownEnter = (label) => {
    clearTimeout(dropdownTimeout.current);
    setDropdownOpen(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(null), 200);
  };

  const navHidden = scrollDirection === "down" && !isAtTop && !mobileOpen;

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 w-full z-[60] border-b shadow-glass transition-colors duration-300",
          isAtTop
            ? "bg-surface/60 border-white/10"
            : "bg-surface/75 border-white/20"
        )}
        style={{ backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)" }}
        animate={{ y: navHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
      >
        <div className="container-site flex justify-between items-center h-20">
          {/* ── Brand ── */}
          <Link
            href="/"
            className="flex items-center group mr-auto lg:mr-12 xl:mr-16 shrink-0"
          >
            <Image 
              src="/logixloops_logo.png" 
              alt={`${BRAND.name} Logo`} 
              width={180} 
              height={48} 
              className="h-10 w-auto object-contain"
              priority
            />
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
                  className={cn(
                    "font-body text-body-md px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 whitespace-nowrap",
                    isActive(link.href)
                      ? "text-primary relative after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-secondary after:rounded-full"
                      : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low/50"
                  )}
                >
                  {link.label}
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

                {/* ── Dropdown ── */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {dropdownOpen === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 glass-elevated rounded-xl p-2 z-50"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface hover:bg-surface-container-low hover:text-primary transition-colors font-body text-body-md"
                          >
                            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                              {child.icon}
                            </span>
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* ── Desktop Search & CTA ── */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={() => window.dispatchEvent(new Event("open-command-menu"))}
              className="flex items-center gap-3 px-3 py-1.5 rounded-full border border-outline-variant/30 hover:border-primary/50 hover:bg-surface-container-low transition-colors text-on-surface-variant group whitespace-nowrap cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] group-hover:text-primary transition-colors">search</span>
              <span className="font-body text-sm mr-2 group-hover:text-primary transition-colors">Search...</span>
              <span className="font-mono text-[10px] bg-surface-container-high px-1.5 py-0.5 rounded border border-outline-variant/50 flex items-center">⌘K</span>
            </button>

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
              onClick={() => window.dispatchEvent(new Event("open-command-menu"))}
              className="p-2.5 text-on-surface hover:text-primary transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] cursor-pointer"
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-[24px]">search</span>
            </button>
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
      </motion.nav>

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
              className="fixed top-20 right-0 h-[calc(100vh-5rem)] w-full sm:w-[400px] z-50 glass-elevated flex flex-col border-l border-outline-variant/30 bg-surface/95"
            >
              {/* Links */}
              <nav className="flex-1 px-6 pt-6 pb-8 overflow-y-auto">
                <div className="flex flex-col gap-2">
                  {NAV_LINKS.map((link) => (
                    <div key={link.label}>
                      {link.hasDropdown ? (
                        <button
                          className={cn(
                            "w-full flex items-center justify-between py-3 px-4 rounded-xl font-display text-xl md:text-2xl transition-colors",
                            mobileExpanded === link.label || isActive(link.href)
                              ? "text-primary bg-primary/5 border border-primary/20"
                              : "text-on-surface hover:text-primary hover:bg-surface-container-low border border-transparent"
                          )}
                          onClick={() => setMobileExpanded(prev => prev === link.label ? null : link.label)}
                        >
                          {link.label}
                          <span className={cn(
                            "material-symbols-outlined transition-transform duration-300",
                            mobileExpanded === link.label && "rotate-180"
                          )}>
                            expand_more
                          </span>
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className={cn(
                            "block py-3 px-4 rounded-xl font-display text-xl md:text-2xl transition-colors border border-transparent",
                            isActive(link.href)
                              ? "text-primary bg-primary/5 border-primary/20"
                              : "text-on-surface hover:text-primary hover:bg-surface-container-low"
                          )}
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
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
                                  className="flex items-center gap-3 py-2 text-body-md text-on-surface-variant hover:text-primary transition-colors font-body"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  <span className="material-symbols-outlined text-[20px]">
                                    {child.icon}
                                  </span>
                                  {child.label}
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
