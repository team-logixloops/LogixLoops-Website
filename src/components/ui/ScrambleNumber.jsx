"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Slot-machine digit scramble: random digits cycle, then lock into place
 * left-to-right until they settle on the real value. Triggers once when
 * scrolled into view. Non-digit characters (letters, punctuation) pass
 * through untouched so it works inline with strings like "4096".
 */
export default function ScrambleNumber({ value, duration = 1.2, className }) {
  const target = String(value);
  const [display, setDisplay] = useState(target);
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }

    setDisplay(target.replace(/[0-9]/g, "0"));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;
        observer.disconnect();

        const digits = target.split("");
        const totalFrames = Math.round(duration * 30);
        let frame = 0;

        const interval = setInterval(() => {
          frame++;
          const revealCount = Math.floor((frame / totalFrames) * digits.length);
          setDisplay(
            digits
              .map((ch, i) => {
                if (i < revealCount || !/[0-9]/.test(ch)) return ch;
                return Math.floor(Math.random() * 10).toString();
              })
              .join("")
          );

          if (frame >= totalFrames) {
            setDisplay(target);
            clearInterval(interval);
          }
        }, 1000 / 30);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
