# Hero Constellation + Unique Font + Site-wide Lenis/GSAP Smooth Scroll

## Context

LogixLoops marketing site (Next.js 16.2.6 app router, JS/JSX only — no TypeScript, no shadcn CLI convention, Tailwind v4, framer-motion). Design system: Material Design 3 color tokens (`primary #004ac6`, `secondary #4648d4`, `tertiary #943700`), `font-display`/`font-heading` = Plus Jakarta Sans, `font-body`/`font-label` = Inter, defined in `tailwind.config.js` + loaded via `next/font/google` in `src/app/layout.js`.

User supplied a standalone canvas component (`constellation-grid.tsx`) — an animated particle/node mesh with cursor-reactive physics — and asked to:
1. Integrate it into the homepage hero.
2. Adopt a distinctive, non-default display font.
3. Add Lenis + GSAP smooth scroll, applied site-wide, starting with the hero.

Full visual redesign of every page is out of scope for this pass — explicitly deferred to follow-up work (confirmed with user).

## Component Integration Decisions

- **No shadcn CLI init.** Repo already has a hand-rolled `src/components/ui/` system with its own `cn()` helper (`src/lib/utils.js`), Material Design 3 tokens, and established components (Button, GlassCard, Badge, etc). Running `shadcn init` would scaffold a conflicting/duplicate structure. The existing folder already fulfills shadcn's organizational purpose.
- **No TypeScript.** Repo has `jsconfig.json`, not `tsconfig.json`, and zero `.ts`/`.tsx` files. Component is ported to `src/components/ui/ConstellationGrid.jsx` (logic unchanged, JSX not TSX) rather than introducing the only TS file in the codebase.
- **No lucide-react.** Component is canvas-only, draws no icons/SVG glyphs — dependency not needed.

## Hero Redesign

- `ConstellationGrid.jsx`: port as-is functionally (spring-mass node physics, cursor shockwave repulsion, connection-line rendering, hex-coordinate readout on proximity), but:
  - Drop the `prefers-color-scheme` media-query sync — site has no dark/light toggle system. Canvas is fixed to the dark palette (deliberate design choice, not theme-dependent).
  - Recolor: background near-black (`#05070a`), node/line color stays neutral white-ish, but the cyan accent (`56, 189, 248`) is replaced with the site's brand blue/indigo (`primary #004ac6` / `secondary #4648d4`) for the near-cursor highlight, radar rings, and hex labels — ties the effect to LogixLoops' existing brand identity instead of a generic cyan.
  - Drop the built-in `<h1>`/overlay copy from the demo file — the real hero keeps its own copy layout (see below), canvas is purely the background layer.
- `HeroSection.jsx` rebuild:
  - Remove the animated blob-mesh background and the fake dashboard-mockup/floating-cards right column (both replaced by the canvas).
  - `ConstellationGrid` becomes an absolutely-positioned full-bleed background (`absolute inset-0 z-0`).
  - Left-column copy (headline, subhead, CTA, "Core Engineering Pillars") restyled for the dark background: white/light text, headline keeps the gradient-accent span but shifted to work on dark (light-to-accent gradient), pillars/icons recolored for contrast.
  - Layout simplifies to a single centered/left-aligned column (no more `lg:grid-cols-2` fake-mockup half) since the mockup card is gone — copy sits over the full-width canvas.
  - Headline uses the new display font (below).

## Font

- Add `Bricolage Grotesque` (variable, confirmed present in this Next version's `next/font/google` catalog) via `next/font/google` in `layout.js`, exposed as `--font-bricolage`.
- `tailwind.config.js`: repoint `fontFamily.display` and `fontFamily.heading` from Plus Jakarta Sans to Bricolage Grotesque. This token is referenced 173 times across 68 files, so every headline site-wide re-fonts in one change — satisfies "redesign complete site" for typography without touching each file.
- Plus Jakarta Sans import removed from `layout.js` (no longer referenced once the token is repointed — confirm no direct `font-plus-jakarta` var usage elsewhere before deleting).
- Inter remains `font-body`/`font-label`, unchanged.

## Lenis + GSAP Smooth Scroll (site-wide)

- Add dependencies: `gsap`, `lenis`.
- New `src/components/motion/SmoothScrollProvider.jsx` (client component): initializes `Lenis`, drives it off `requestAnimationFrame`, syncs to `gsap.ticker` and `ScrollTrigger.update`, sets `gsap.ticker.lagSmoothing(0)`. Mounted once in `layout.js` wrapping `children`.
- Rather than editing the 49 files that consume `src/components/motion/MotionWrappers.jsx`, its internals are swapped from framer-motion `whileInView` variants to GSAP `ScrollTrigger`-driven reveals, keeping the exact same exported API: `FadeInUp`, `FadeInUpImmediate`, `FadeInLeft`, `FadeInRight`, `FadeIn`, `ScaleIn`, `StaggerContainer`, `StaggerItem`. Every existing call site across every page picks up GSAP scroll-linked animation + Lenis smooth scroll automatically, no per-file changes, minimal regression surface.
- Framer-motion is **not** removed from the project — it stays for non-scroll micro-interactions (Button magnetic pull/tap, hero entrance motion not tied to scroll position).
- `html`/`body` overflow/scroll-behavior in `globals.css` reviewed for conflicts with Lenis (Lenis manages scroll itself; `data-scroll-behavior="smooth"` on `<html>` in `layout.js` should be removed to avoid double-smoothing).

## Explicitly Out of Scope (this pass)

- Visual redesign of any section/page other than the Hero.
- Any dark/light theme toggle system.
- Removing framer-motion.

## Testing

- `npm run dev`, visually verify: hero canvas renders, cursor interaction works, no console errors, headline uses new font, page scroll feels Lenis-smooth, a couple of below-fold sections (e.g. StatsSection, ProcessSection) still reveal correctly on scroll via the refactored MotionWrappers.
- Spot-check 2–3 other pages (e.g. `/about`, `/services`) to confirm MotionWrappers refactor didn't break their existing reveal animations.
- `npm run build` to confirm no type/lint/build breakage.
