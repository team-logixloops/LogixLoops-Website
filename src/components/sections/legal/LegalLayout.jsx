"use client";

import { useState, useEffect } from "react";
import { FadeInUp, FadeIn } from "@/components/motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function LegalLayout({ title, effectiveDate, description, sections, children }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for fixed header
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            // We intentionally don't break here to ensure the last visible section becomes active
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for navbar
        behavior: "smooth"
      });
      setActiveSection(id);
    }
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-outline-variant/30 bg-surface-container-lowest/50 backdrop-blur-md mb-6">
              <span className="material-symbols-outlined text-[16px] text-primary">gavel</span>
              <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
                Legal Documentation
              </span>
            </div>
            <h1 className="font-display text-display-md md:text-display-lg text-on-surface mb-6 tracking-tight">
              {title}
            </h1>
            <p className="font-body text-body-lg text-on-surface-variant leading-relaxed mb-6">
              {description}
            </p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-outline-variant uppercase tracking-wider">Effective Date:</span>
              <span className="font-label text-sm text-on-surface">{effectiveDate}</span>
            </div>
          </div>
        </FadeInUp>
      </section>

      {/* Content Section with Sticky Sidebar */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto border-t border-outline-variant/30 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-gutter relative">
          
          {/* Sticky Sidebar */}
          <FadeIn className="hidden lg:block lg:col-span-3">
            <div className="sticky top-[120px]">
              <h3 className="font-label text-xs text-outline-variant uppercase tracking-widest mb-6">
                Contents
              </h3>
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
              
              <div className="mt-12 p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/50 backdrop-blur-sm shadow-glass">
                <span className="material-symbols-outlined text-primary mb-3 text-[24px]">contact_support</span>
                <h4 className="font-label text-sm text-on-surface mb-2">Legal Inquiries</h4>
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
