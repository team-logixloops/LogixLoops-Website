/**
 * Shared layout + accent tokens for the /services/[slug] section spine.
 * Every section imports from here so all service pages render identically,
 * only the accent colour and the copy change between them.
 */

export const SECTION =
  "py-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto border-t border-outline-variant/30";

/**
 * Padding is deliberately NOT in here. `cn` is a plain join with no
 * tailwind-merge, so a later `p-6` would lose to a baked-in `p-8` on CSS
 * source order alone. Every consumer sets its own padding.
 */
/* Opaque, not glass: content cards carry no backdrop-blur (perf budget). */
export const CARD =
  "h-full rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/85 shadow-sm transition-colors";

/** Default card padding, comfortable on desktop, tighter on phones. */
export const CARD_PAD = "p-6 md:p-8";

/* Static class strings. Tailwind cannot resolve `text-${color}` at build time. */
const ACCENTS = {
  primary: {
    text: "text-primary",
    soft: "bg-primary/10",
    ring: "border-primary/30",
    hover: "hover:border-primary/30",
    dot: "bg-primary",
    gradient: "from-primary to-secondary",
    glow: "bg-primary/10",
  },
  secondary: {
    text: "text-secondary",
    soft: "bg-secondary/10",
    ring: "border-secondary/30",
    hover: "hover:border-secondary/30",
    dot: "bg-secondary",
    gradient: "from-secondary to-primary",
    glow: "bg-secondary/10",
  },
  tertiary: {
    text: "text-tertiary",
    soft: "bg-tertiary/10",
    ring: "border-tertiary/30",
    hover: "hover:border-tertiary/30",
    dot: "bg-tertiary",
    gradient: "from-tertiary to-primary",
    glow: "bg-tertiary/10",
  },
};

export const accent = (color) => ACCENTS[color] || ACCENTS.primary;

export const pad = (i) => String(i + 1).padStart(2, "0");
