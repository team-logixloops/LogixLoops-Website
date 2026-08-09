"use client";

import { useEffect } from "react";
import { isEmbedded } from "@/lib/embed";

/**
 * Stamps `data-embed="1"` on <html> when this document is the copy running
 * inside a demo's iframe, so purely presentational trimming can happen in CSS
 * (see the `[data-embed="1"]` rules in globals.css) instead of threading a
 * prop through server components that have no way to detect it.
 *
 * The attribute is written in an effect, after hydration, which is why the
 * server and the client agree on the markup either way.
 */
export default function EmbedFlag() {
  useEffect(() => {
    if (!isEmbedded()) return;
    const root = document.documentElement;
    root.dataset.embed = "1";
    return () => {
      delete root.dataset.embed;
    };
  }, []);

  return null;
}
