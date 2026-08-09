"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const STAGGER = 0.035;

/**
 * LOGIXLOOPS: Text Roll
 *
 * A label whose letters roll up one after another to reveal an identical set
 * arriving from below. Used on the primary navigation, where every item is a
 * single short word and the stagger is legible; a long string turns the effect
 * into a wave and reads as noise.
 *
 * The two letter stacks are `aria-hidden` and the real label is rendered once,
 * visually hidden. This is not decoration: split letters in the accessibility
 * tree make a screen reader announce the navigation as "S e r v i c e s", one
 * character at a time, and leave every internal link on the site with shredded
 * anchor text. The hidden label is what the crawler and the screen reader
 * actually read.
 *
 * `center` staggers outward from the middle of the word instead of
 * left-to-right, which suits a centred item where the eye starts in the
 * middle.
 *
 * Under `prefers-reduced-motion` the roll is dropped entirely and the resting
 * text is left in place; the link still has its colour change to answer with.
 *
 * @param {object} props
 * @param {string} props.children      The label. Must be a plain string.
 * @param {boolean} [props.center]
 * @param {string} [props.className]
 */
export default function TextRoll({ children, className, center = false }) {
  const reduced = useReducedMotion();
  const text = String(children ?? "");

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const letters = [...text];
  const delayFor = (index) =>
    center
      ? STAGGER * Math.abs(index - (letters.length - 1) / 2)
      : STAGGER * index;

  // A space between two `inline-block` spans collapses, so it is carried as a
  // non-breaking space. Without this every multi-word label closes up.
  const glyph = (character) => (character === " " ? " " : character);

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      whileFocus="hovered"
      className={cn("relative inline-block overflow-hidden leading-none", className)}
    >
      <span className="sr-only">{text}</span>

      <span aria-hidden="true" className="block">
        {letters.map((character, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
            transition={{ ease: "easeInOut", delay: delayFor(index) }}
          >
            {glyph(character)}
          </motion.span>
        ))}
      </span>

      <span aria-hidden="true" className="absolute inset-0 block">
        {letters.map((character, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
            transition={{ ease: "easeInOut", delay: delayFor(index) }}
          >
            {glyph(character)}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}
