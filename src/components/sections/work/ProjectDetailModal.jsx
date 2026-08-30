"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui";

/**
 * LOGIXLOOPS: Project Detail Modal
 * Full-featured interactive dialog showcasing in-depth architectural highlights,
 * business impact, and tech stack for LogixLoops studio projects.
 * Rendered via React Portal at document.body with fixed header/footer and
 * dedicated scrollable content body with Lenis scroll lock.
 */
export default function ProjectDetailModal({ project, isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body, html, and Lenis smooth scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Pause Lenis global smooth scroller
    const lenis = window.lenis;
    if (lenis) {
      lenis.stop?.();
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.lenis?.start?.();
    };
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset scroll to top whenever a new project is opened
  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [isOpen, project]);

  if (!mounted || !project) return null;

  const { fullDetails } = project;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-3 md:py-3 md:px-6 overflow-hidden"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Box with pinned Header, scrollable Body, and pinned Footer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.08 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl md:max-w-6xl h-[96vh] max-h-[96vh] flex flex-col rounded-2xl border border-white/20 bg-surface-container-lowest shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-10 overflow-hidden"
          >
            {/* Pinned Header Bar with Gradient */}
            <div
              className="shrink-0 relative p-6 sm:p-8 border-b border-outline-variant/20 overflow-hidden"
              style={{
                background:
                  project.gradientStyle ||
                  "linear-gradient(135deg, #090d16 0%, #1e1b4b 100%)",
              }}
            >
              {/* Glowing decorative ambient light */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/30 blur-[90px] rounded-full pointer-events-none" />

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-label uppercase tracking-widest text-primary-fixed bg-primary/20 border border-primary/40 backdrop-blur-md mb-2 sm:mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {project.eyebrow}
                  </span>
                  <h2 className="font-display text-headline-md sm:text-headline-lg text-white leading-tight">
                    {project.title}
                  </h2>
                  {fullDetails?.tagline && (
                    <p className="font-body text-body-sm sm:text-body-md text-white/80 mt-1 sm:mt-2 max-w-2xl">
                      {fullDetails.tagline}
                    </p>
                  )}
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-105 active:scale-95 shrink-0 focus-visible:outline-none cursor-pointer"
                  aria-label="Close dialog"
                >
                  <span className="material-symbols-outlined text-[20px] block">
                    close
                  </span>
                </button>
              </div>
            </div>

            {/* Scrollable Content Body with Independent Scroll & Touch/Wheel Isolation */}
            <div
              ref={contentRef}
              data-lenis-prevent="true"
              className="flex-1 min-h-0 overflow-y-auto p-6 sm:p-8 md:p-10 space-y-8 text-on-surface bg-surface-container-lowest [overscroll-behavior:contain]"
            >
              {/* 1. What it does */}
              {fullDetails?.whatItDoes && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-primary font-display text-headline-sm">
                    <span className="material-symbols-outlined text-[22px]">
                      psychology
                    </span>
                    <h3>What It Does</h3>
                  </div>
                  <p className="font-body text-body-md text-on-surface-variant leading-relaxed bg-surface-container-low/50 p-5 sm:p-6 rounded-xl border border-outline-variant/30">
                    {fullDetails.whatItDoes}
                  </p>
                </div>
              )}

              {/* 2. Why it matters */}
              {fullDetails?.whyItMatters && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-secondary font-display text-headline-sm">
                    <span className="material-symbols-outlined text-[22px]">
                      trending_up
                    </span>
                    <h3>Why It Matters</h3>
                  </div>
                  <p className="font-body text-body-md text-on-surface-variant leading-relaxed bg-surface-container-low/50 p-5 sm:p-6 rounded-xl border border-outline-variant/30">
                    {fullDetails.whyItMatters}
                  </p>
                </div>
              )}

              {/* What it controls (optional) */}
              {fullDetails?.whatItControls && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-tertiary font-display text-headline-sm">
                    <span className="material-symbols-outlined text-[22px]">
                      terminal
                    </span>
                    <h3>Infrastructure & Control Plane</h3>
                  </div>
                  <p className="font-body text-body-md text-on-surface-variant leading-relaxed bg-surface-container-low/50 p-5 sm:p-6 rounded-xl border border-outline-variant/30">
                    {fullDetails.whatItControls}
                  </p>
                </div>
              )}

              {/* Benchmark Results (optional) */}
              {fullDetails?.results && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-primary font-display text-headline-sm">
                    <span className="material-symbols-outlined text-[22px]">
                      leaderboard
                    </span>
                    <h3>Benchmark & Performance Metrics</h3>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-low/60 p-4 sm:p-6">
                    {fullDetails.results.metrics && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                        {fullDetails.results.metrics.map((m, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-lg bg-surface-container-high/60 border border-outline-variant/30 text-center"
                          >
                            <span className="text-xs font-label uppercase tracking-wider text-on-surface-variant block mb-1">
                              {m.label}
                            </span>
                            <span className="text-xl sm:text-2xl font-display font-bold text-primary tabular-nums">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    {fullDetails.results.notes && (
                      <p className="text-xs sm:text-sm font-body text-on-surface-variant leading-relaxed border-t border-outline-variant/20 pt-3">
                        {fullDetails.results.notes}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* 3. Technical Highlights */}
              {fullDetails?.technicalHighlights && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary font-display text-headline-sm">
                    <span className="material-symbols-outlined text-[22px]">
                      memory
                    </span>
                    <h3>Technical Highlights</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {fullDetails.technicalHighlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl border border-outline-variant/30 bg-surface-container-low/60 flex flex-col gap-2 hover:border-primary/40 transition-colors"
                      >
                        <div className="flex items-center gap-2 text-primary">
                          <span className="material-symbols-outlined text-[20px]">
                            {highlight.icon || "check_circle"}
                          </span>
                          <h4 className="font-display text-sm font-semibold text-on-surface">
                            {highlight.title}
                          </h4>
                        </div>
                        <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Tech Stack & Use Cases */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-outline-variant/20">
                {/* Tech Stack */}
                {fullDetails?.technologies && (
                  <div>
                    <h4 className="font-label text-label-caps uppercase tracking-wider text-on-surface-variant mb-3">
                      Pipeline Architecture & Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {fullDetails.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-mono bg-surface-container-high border border-outline-variant/40 text-on-surface"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Target Use Cases */}
                {fullDetails?.useCases && (
                  <div>
                    <h4 className="font-label text-label-caps uppercase tracking-wider text-on-surface-variant mb-3">
                      Target Deployments & Use Cases
                    </h4>
                    <ul className="space-y-1.5">
                      {fullDetails.useCases.map((useCase, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Pinned Footer CTA */}
            <div className="shrink-0 p-5 sm:p-6 md:p-8 bg-surface-container-low border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-display text-sm font-semibold text-on-surface">
                  Interested in deploying an autonomous voice pipeline?
                </p>
                <p className="font-body text-xs text-on-surface-variant">
                  We engineer bespoke conversational AI and real-time streaming pipelines.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full font-label text-xs uppercase tracking-wider text-on-surface-variant hover:text-on-surface border border-outline-variant/40 hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Close
                </button>
                <Button
                  href="/contact"
                  size="sm"
                  className="flex-1 sm:flex-initial whitespace-nowrap shadow-md"
                >
                  Discuss This Solution
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
