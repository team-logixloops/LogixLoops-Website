"use client";

import { StaggerContainer, StaggerItem } from "@/components/motion";
import { SELECTION_SIGNALS } from "@/data/methodologies";

/**
 * SelectionSignals, the decision rule, stated as signal → reading → choice.
 *
 * The methodology explorer above this describes six models fairly. This is the
 * part that is actually useful to a client: what we look at in the first week
 * that decides which of them governs their engagement. Each card is one
 * observable signal, what we take it to mean, and what we do about it.
 */
export default function SelectionSignals() {
  return (
    <StaggerContainer className="grid gap-gutter md:grid-cols-2 xl:grid-cols-3">
      {SELECTION_SIGNALS.map((signal) => (
        <StaggerItem key={signal.signal}>
          <article className="glow-sweep flex h-full flex-col rounded-2xl border border-outline-variant/40 bg-surface-container-lowest/70 p-6 shadow-glass backdrop-blur-xl">
            <span
              className="material-symbols-outlined icon-md text-secondary"
              aria-hidden="true"
            >
              {signal.icon}
            </span>

            <h3 className="mt-4 font-heading text-body-lg text-on-surface">
              {signal.signal}
            </h3>

            <p className="mt-2 font-body text-body-sm text-outline">
              {signal.read}
            </p>

            {/* The choice, given its own rule so it reads as the conclusion of
                the card rather than as its third paragraph. */}
            <p className="mt-4 border-t border-outline-variant/40 pt-4">
              <span className="block font-label text-label-sm uppercase tracking-widest text-outline">
                We run
              </span>
              <span className="mt-1 block font-heading text-body-md text-primary">
                {signal.choose}
              </span>
            </p>

            <p className="mt-3 font-body text-body-sm text-on-surface-variant">
              {signal.why}
            </p>
          </article>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
