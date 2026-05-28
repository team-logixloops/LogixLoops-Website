/**
 * LOGIXLOOPS — Utility Helpers
 */

/**
 * Merge class names — filters falsy values and joins.
 * Lightweight alternative to clsx/classnames.
 * @param  {...(string|false|null|undefined)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format a number to a compact string.
 * e.g., 1500 -> "1.5K"
 * @param {number} num
 * @returns {string}
 */
export function formatCompact(num) {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(num);
}

/**
 * Clamp a value between min and max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Create a URL-friendly slug from a string.
 * @param {string} str
 * @returns {string}
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
