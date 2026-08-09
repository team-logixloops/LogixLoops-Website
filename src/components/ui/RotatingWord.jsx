"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * RotatingWord, swaps one word of a headline on a timer.
 *
 * Two things make this harder than a crossfade:
 *
 * 1. The words are different widths, so the rest of the line would jump on
 *    every swap. `layout` on the wrapper animates the box between widths and
 *    the following words slide instead of snapping.
 * 2. Enter and exit have to overlap, or the line collapses to zero width
 *    mid-swap. `mode="popLayout"` pulls the outgoing word out of flow so both
 *    can occupy the box at once.
 *
 * Under `prefers-reduced-motion` the word still changes, the rotation is the
 * content, not the decoration, but it cuts rather than travels.
 */
export default function RotatingWord({
  words,
  interval = 2600,
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (words.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval
    );
    return () => clearInterval(id);
  }, [words.length, interval]);

  const word = words[index];

  const variants = reduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0, position: "absolute" },
      }
    : {
        enter: { y: "0.9em", opacity: 0, filter: "blur(8px)" },
        center: { y: "0em", opacity: 1, filter: "blur(0px)" },
        exit: {
          y: "-0.9em",
          opacity: 0,
          filter: "blur(8px)",
          position: "absolute",
        },
      };

  return (
    <motion.span
      layout
      // `align-bottom` + `overflow-hidden`: the words travel a full em, and
      // without the clip the outgoing one is briefly visible above the cap
      // height, overlapping the line above.
      className={`relative inline-flex overflow-hidden align-bottom ${className}`}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Announced as one live region rather than as three mounting and
          unmounting nodes, so a screen reader reads "Future" → "Backbone"
          instead of re-reading the whole heading each rotation. */}
      <span className="sr-only" aria-live="polite">
        {word}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          aria-hidden="true"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
