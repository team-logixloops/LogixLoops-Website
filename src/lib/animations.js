/**
 * LOGIXLOOPS: Framer Motion Animation Variants
 *
 * Centralized animation presets for consistent motion across the site.
 * All durations, easings, and behaviors are defined here to prevent
 * per-component drift.
 */

/* ─── Easings ─── */
export const easings = {
  premium: [0.22, 1, 0.36, 1],
  bounceSoft: [0.22, 1, 0.36, 1], // Neutralized bounce for cinematic stability
  smooth: [0.43, 0.13, 0.23, 0.96],
  decelerate: [0.0, 0.0, 0.2, 1],
};

/* ─── Entry Animations ─── */

/** Fade in from below, default section/card reveal */
export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easings.premium },
  },
};

/** Fade in from above */
export const fadeInDown = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easings.premium },
  },
};

/** Fade in from left */
export const fadeInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easings.premium },
  },
};

/** Fade in from right */
export const fadeInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easings.premium },
  },
};

/** Simple opacity fade */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easings.premium },
  },
};

/** Scale + fade for modals/overlays */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: easings.premium },
  },
};

/* ─── Stagger Containers ─── */

/** Parent container for staggered children */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** Slower stagger for hero sections */
export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

/* ─── Interactive Micro-animations ─── */

/** Button press, scale down */
export const tapScale = { scale: 0.98 };

/** Button deep press */
export const tapScaleDeep = { scale: 0.96 };

/** Card lift on hover */
export const hoverLift = {
  y: -4,
  transition: { duration: 0.3, ease: easings.premium },
};

/** Subtle float on hover */
export const hoverFloat = {
  y: -2,
  transition: { duration: 0.3, ease: easings.premium },
};

/* ─── Navbar Animations ─── */

/** Navbar slide up (hide on scroll down) */
export const navHide = {
  y: -100,
  transition: { duration: 0.3, ease: easings.decelerate },
};

/** Navbar slide down (show on scroll up) */
export const navShow = {
  y: 0,
  transition: { duration: 0.3, ease: easings.decelerate },
};

/* ─── Page Transitions ─── */

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easings.premium },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: easings.premium },
  },
};

/* ─── Accordion / Collapse ─── */

export const accordionContent = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: easings.premium },
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: easings.premium },
  },
};

/* ─── Mobile Menu ─── */

export const mobileMenuOverlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const mobileMenuPanel = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.35, ease: easings.decelerate },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.25, ease: easings.premium },
  },
};

/* ─── Viewport Trigger Defaults ─── */

/** Standard viewport config, animate once when 20% visible */
export const viewportOnce = {
  once: true,
  amount: 0.2,
};

/** Generous viewport for hero sections */
export const viewportHero = {
  once: true,
  amount: 0.1,
};
