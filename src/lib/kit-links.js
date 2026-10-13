/**
 * Internal links between kits, worked out from the copy itself.
 *
 * Kit copy already names other kits ("see the Online Store Kit"). These
 * helpers turn those names into links and pick each kit page's suggestions,
 * so a new mention in kits.js links itself with no extra field to maintain.
 * Server-only: it reads the whole catalogue.
 */
import { KITS } from "@/data/kits";

const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/* Longest first, so a longer name always wins over one it contains. */
const MENTION = new RegExp(
  `(${KITS.map((kit) => kit.name)
    .sort((a, b) => b.length - a.length)
    .map(escape)
    .join("|")})`
);

/**
 * Splits `text` into plain parts and kit names. A kit name carries the href
 * of its page, except the kit named in `except`, which is the page you are on.
 */
export function kitMentions(text, { except } = {}) {
  return text
    .split(MENTION)
    .filter(Boolean)
    .map((part) => {
      const kit = KITS.find((candidate) => candidate.name === part);
      return kit && kit.slug !== except ? { text: part, href: `/kits/${kit.slug}` } : { text: part };
    });
}

/** Everything a kit says about itself, where another kit might be named. */
const copyOf = (kit) => [...kit.notFor, ...kit.fitFor, ...kit.includes, ...kit.faqs.map((faq) => faq.a)].join(" ");

/* The line a buyer usually needs next: a new brand needs a website, a
   redesigned site needs to be found, a found site needs to convert. */
const NEXT_LINE = {
  "web-and-app-development": "branding",
  branding: "web-and-app-development",
  "website-redesign": "seo-and-ai-search",
  "seo-and-ai-search": "website-redesign",
  "ai-automation": "web-and-app-development",
};

/**
 * The kits a kit page suggests: first the ones its own copy names, in
 * catalogue order, then the rest of its line, then the line usually needed
 * next.
 */
export function relatedKits(kit, limit = 3) {
  const copy = copyOf(kit);
  const others = KITS.filter((other) => other !== kit);
  const named = others.filter((other) => copy.includes(other.name));
  const sameLine = others.filter((other) => other.line === kit.line);
  const nextLine = others.filter((other) => other.line === NEXT_LINE[kit.line]);
  return [...new Set([...named, ...sameLine, ...nextLine])].slice(0, limit);
}
