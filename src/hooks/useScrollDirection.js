"use client";

import { useState, useEffect } from "react";

/**
 * Detects scroll direction for navbar show/hide behavior.
 * Returns "up" | "down" | null
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [prevScroll, setPrevScroll] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const threshold = 10;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setIsAtTop(currentScroll < 20);

      if (Math.abs(currentScroll - prevScroll) < threshold) return;

      setScrollDirection(currentScroll > prevScroll ? "down" : "up");
      setPrevScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScroll]);

  return { scrollDirection, isAtTop };
}
