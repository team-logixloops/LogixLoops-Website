"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { accordionContent } from "@/lib/animations";

/**
 * Accordion — Expandable FAQ / content panel with Framer animation.
 *
 * Props:
 *  - items: Array of { question, answer } or { title, content }
 *  - allowMultiple: boolean — allow multiple panels open at once
 *  - variant: "glass" | "bordered" | "minimal"
 */
const variantClasses = {
  glass: "glass-panel rounded-lg overflow-hidden",
  bordered: "border border-outline-variant/30 rounded-lg bg-surface-container-lowest overflow-hidden",
  minimal: "border-b border-outline-variant/20",
};

export default function Accordion({
  items = [],
  allowMultiple = false,
  variant = "glass",
  className,
}) {
  const [openIndices, setOpenIndices] = useState([]);

  const toggle = (index) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndices((prev) =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  const isOpen = (index) => openIndices.includes(index);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, index) => (
        <div key={index} className={variantClasses[variant]}>
          {/* Trigger */}
          <button
            className={cn(
              "w-full flex justify-between items-center p-6 text-left transition-colors group",
              isOpen(index)
                ? "text-primary"
                : "text-on-surface hover:text-primary"
            )}
            onClick={() => toggle(index)}
            aria-expanded={isOpen(index)}
          >
            <span className="font-heading text-body-lg font-semibold pr-4">
              {item.question || item.title}
            </span>
            <motion.span
              animate={{ rotate: isOpen(index) ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="material-symbols-outlined text-on-surface-variant flex-shrink-0"
            >
              expand_more
            </motion.span>
          </button>

          {/* Content */}
          <AnimatePresence initial={false}>
            {isOpen(index) && (
              <motion.div
                key="content"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={accordionContent}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 font-body text-body-md text-on-surface-variant border-t border-outline-variant/20 pt-4">
                  {item.answer || item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
