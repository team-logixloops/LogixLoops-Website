"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * LOGIXLOOPS: Flip Card
 *
 * Two faces on one card, turned in depth. The front carries the thing you
 * scan for; the back carries the detail you only want once you have found it.
 *
 * Both faces are always rendered and neither is hidden from assistive
 * technology, so the back's content is in the reading order whether or not
 * the card has ever been turned. The flip is a way to *look* at content that
 * is already present, not a gate in front of it, which is what makes it
 * legitimate on a page whose bios matter.
 *
 * Three ways in, because hover alone strands touch users:
 *   - pointer hover (CSS, fine pointers only)
 *   - keyboard focus (CSS, `:focus-within` on the control)
 *   - tap or click, which pins the card open until it is tapped again
 *
 * The pinned state wins over hover so a pointer user can click to hold a card
 * open and read at their own pace. Reduced motion swaps the rotation for a
 * crossfade, turning a plane in depth is a common motion-sickness trigger.
 * Presentation lives in `globals.css` under `.flip-card`.
 *
 * @param {object} props
 * @param {React.ReactNode} props.front
 * @param {React.ReactNode} props.back
 * @param {string} props.label     Accessible name for the toggle.
 * @param {string} [props.className]
 */
export default function FlipCard({ front, back, label, className }) {
  const [pinned, setPinned] = useState(null);

  return (
    <div
      // `null` until the card is first used, so the CSS hover rule is free to
      // drive it. Once a reader has tapped, the attribute takes over in both
      // directions and hover stops fighting the choice they made.
      data-flipped={pinned === null ? undefined : String(pinned)}
      className={cn("flip-card relative", className)}
    >
      <div className="flip-card__inner">
        <div className="flip-card__face flip-card__face--front">{front}</div>
        <div className="flip-card__face flip-card__face--back">{back}</div>
      </div>

      {/* The control is the whole card face rather than a corner button: a
          card-sized target is what a touch user expects to be able to press,
          and a 44px button floating over a portrait would sit on someone's
          face. It is a real <button> so it is focusable, announces its
          pressed state, and responds to Enter and Space for free. */}
      <button
        type="button"
        aria-pressed={pinned === true}
        aria-label={label}
        onClick={() => setPinned((current) => !current)}
        className="absolute inset-0 z-10 rounded-[inherit] cursor-pointer"
      />
    </div>
  );
}
