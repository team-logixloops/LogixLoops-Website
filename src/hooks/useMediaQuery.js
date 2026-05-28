"use client";

import { useState, useEffect } from "react";

/**
 * Media query hook.
 * @param {string} query - e.g., "(min-width: 768px)"
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    let mounted = true;
    const media = window.matchMedia(query);
    
    // Asynchronous check to prevent synchronous React cascade
    if (mounted && matches !== media.matches) {
      setTimeout(() => {
        if (mounted) setMatches(media.matches);
      }, 0);
    }

    const listener = (e) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
