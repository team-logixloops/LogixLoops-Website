/**
 * The voice rules from docs/brand-voice-and-search.md, as code. Content tests
 * walk every copy string in the data files through `voiceProblems`.
 */

export const BANNED = [
  /\belite\b/i,
  /\bworld-class\b/i,
  /\bcutting-edge\b/i,
  /\bbest-in-class\b/i,
  /\bunparalleled\b/i,
  /\bunprecedented\b/i,
  /\bseamless(ly)?\b/i,
  /\bhyper-\w+/i,
  /\brevolutioni[sz]/i,
  /\bleverag(e|es|ed|ing)\b/i,
  /\bsynerg/i,
  /\bluxury\b/i,
  /\batmospheric\b/i,
  /\bimmersive\b/i,
  /\bbespoke\b/i,
  /\bholistic\b/i,
  /\bjourney\b/i,
  /\bsolutions?\b/i,
  /in today's fast-paced world/i,
];

/** Keys whose values are identifiers or asset paths, not copy. */
const NOT_COPY = new Set(["slug", "line", "icon", "color", "art", "navImage", "demo", "work", "kits", "href"]);

export function voiceProblems(text) {
  const found = [];
  if (text.includes("—")) found.push("em-dash");
  for (const pattern of BANNED) {
    if (pattern.test(text)) found.push(`banned word ${pattern.source}`);
  }
  return found;
}

/** Every copy string inside `value`, as [path, text] pairs. */
export function copyStrings(value, path = "") {
  if (typeof value === "string") return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((item, i) => copyStrings(item, `${path}[${i}]`));
  if (value && typeof value === "object") {
    return Object.entries(value)
      .filter(([key]) => !NOT_COPY.has(key))
      .flatMap(([key, item]) => copyStrings(item, path ? `${path}.${key}` : key));
  }
  return [];
}

export const wordCount = (text) => text.trim().split(/\s+/).length;
