// Tuning constants for WaveBend, change behavior here, not in useWaveBend.js.

export const GAP = 120; // px between segments along the path
export const IMAGE_SIZE = 220; // rendered height of image segments; width derives from natural aspect
export const MAX_VELOCITY = 3000; // scroll velocity (px/s) that maps to full bend depth
export const BEND_DURATION = 0.6; // seconds for the bend to ease toward its target (and spring back)
export const IDLE_VELOCITY_THRESHOLD = 50; // |velocity| below this is treated as "stopped" -> bend springs to 0
export const IDLE_TIMEOUT = 120; // ms of no scroll update before forcing a spring-back
export const SCRUB = 1;
export const LOOP = false; // false = single-pass sentence reading, true = infinite marquee wrap
export const RESIZE_DEBOUNCE = 200;
