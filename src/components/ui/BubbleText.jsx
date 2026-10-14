"use client";

import { Fragment, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * LOGIXLOOPS: Bubble Text
 *
 * A label that thickens under the cursor and tapers off either side of it, so
 * the pointer appears to be pressing into the word rather than lighting it.
 * Used on the footer link columns, where there are forty-odd links in four
 * lists and a per-link colour change gives the eye nothing to track.
 *
 * The weight ramp is driven by distance from the hovered character, not by
 * which character is hovered, which is what makes it read as one continuous
 * deformation instead of a single letter popping.
 *
 * Same accessibility contract as [TextRoll]: the per-character spans are
 * `aria-hidden` and the real label is rendered once, visually hidden. Letters
 * in the accessibility tree would have a screen reader spell out every footer
 * link and would strip the anchor text a crawler reads.
 *
 * Weight is animated through `font-variation-settings` rather than
 * `font-weight` so it interpolates smoothly on the variable font instead of
 * snapping between the static cuts. The character boxes are fixed at the
 * resting width so the line does not reflow as the ramp moves across it.
 *
 * @param {object} props
 * @param {string} props.text
 * @param {string} [props.className]
 */
export default function BubbleText({ text, className }) {
  const [hovered, setHovered] = useState(null);

  // Characters are numbered across the whole label, spaces included, so the
  // ramp runs on from one word into the next.
  const words = String(text ?? "").split(" ").map((word) => [...word]);
  const starts = words.map((_, i) => words.slice(0, i).reduce((sum, word) => sum + word.length + 1, 0));

  const glyph = (character, index) => (
    <span
      key={index}
      onMouseEnter={() => setHovered(index)}
      // Distance is what the stylesheet ramps on. `-1` parks the whole
      // word at rest, which is also what it renders as before hydration
      // and with JS off.
      data-distance={hovered === null ? -1 : Math.min(Math.abs(hovered - index), 3)}
      className="bubble-text__ch"
    >
      {character}
    </span>
  );

  return (
    <span
      onMouseLeave={() => setHovered(null)}
      className={cn("bubble-text", className)}
    >
      <span className="sr-only">{text}</span>

      {/* Each word is one unbreakable run. Every letter is an inline-block,
          and a line may break between any two of them, which split long
          labels mid-word in the narrow footer columns ("Developm / ent").
          The plain spaces between runs are the only break points. */}
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            {i > 0 && " "}
            <span className="whitespace-nowrap">
              {word.map((character, j) => glyph(character, starts[i] + j))}
            </span>
          </Fragment>
        ))}
      </span>
    </span>
  );
}
