/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ─────────────────────────────────────────────
       * BREAKPOINTS
       * Tailwind's five defaults, plus the two ends they leave unattended.
       * Fluid tokens carry most of the load, so these exist only for the
       * places where the *layout* itself has to reflow (column counts,
       * showing/hiding a column) rather than merely resize.
       *
       * `xs` at 400px separates the 320–399 band — iPhone SE, Galaxy Fold
       * outer screen — from ordinary phones, which is where two-up grids
       * stop fitting. `3xl` at 1920px is where the 1280px container starts
       * looking marooned on a wide monitor.
       * ───────────────────────────────────────────── */
      screens: {
        xs: "400px",
        "3xl": "1920px",
      },

      /* ─────────────────────────────────────────────
       * COLOR SYSTEM
       * Material Design 3 token names, derived from the four colours
       * `scripts/brand/build.py` measured off the logo artwork. The raw
       * values live in `public/brand/tokens.json`; `brand.*` below mirrors
       * them exactly and every other token is a tint, shade or neighbour
       * of one of them. Nothing in here is picked by eye.
       * ───────────────────────────────────────────── */
      colors: {
        /* The measured marks themselves. Use these when a value has to be
           the logo's colour — a rule beside the tagline, an SVG that sits
           against the fox. Everywhere else prefer the semantic tokens, so
           a future palette change lands in one place. */
        brand: {
          navy: "#081D4A",
          blue: "#378CE7",
          royal: "#2868C6",
          steel: "#336BAF",
        },

        // Surfaces — near-white, tinted toward brand blue rather than the
        // violet the previous palette used.
        surface: {
          DEFAULT: "#f7faff",
          dim: "#dde5f2",
          bright: "#ffffff",
          container: {
            lowest: "#ffffff",
            low: "#f1f6fd",
            DEFAULT: "#e9f0fa",
            high: "#e1eaf7",
            highest: "#d8e4f4",
          },
          variant: "#dce4f2",
          tint: "#2868c6",
        },
        background: "#f7faff",

        // On-surface (text) — navy for anything that carries weight, a
        // desaturated steel-grey for supporting copy.
        "on-surface": {
          DEFAULT: "#081d4a",
          variant: "#4a5a75",
        },
        "on-background": "#081d4a",

        // Primary — brand royal. Buttons, links, focus rings.
        primary: {
          DEFAULT: "#2868c6",
          container: "#378ce7",
          fixed: {
            DEFAULT: "#d7e7fb",
            dim: "#a8cbf5",
          },
        },
        "on-primary": {
          DEFAULT: "#ffffff",
          container: "#eaf3fe",
          fixed: {
            DEFAULT: "#081d4a",
            variant: "#1b4e9e",
          },
        },

        // Secondary — brand blue. Accents, gradients, active states.
        secondary: {
          DEFAULT: "#378ce7",
          container: "#5ba5ef",
          fixed: {
            DEFAULT: "#dcecfd",
            dim: "#b3d6f8",
          },
        },
        "on-secondary": {
          DEFAULT: "#ffffff",
          container: "#f4faff",
          fixed: {
            DEFAULT: "#06224f",
            variant: "#2668b0",
          },
        },

        // Tertiary — teal-cyan. The one hue not taken from the mark, kept
        // inside the fox's blue family so status and data UI has somewhere
        // to go that isn't another shade of the primary.
        tertiary: {
          DEFAULT: "#0e7c8b",
          container: "#12a0b2",
          fixed: {
            DEFAULT: "#cdf0f5",
            dim: "#8fdce7",
          },
        },
        "on-tertiary": {
          DEFAULT: "#ffffff",
          container: "#eafafc",
          fixed: {
            DEFAULT: "#00323a",
            variant: "#0a6070",
          },
        },

        // Error — left alone. Red has to read as red.
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
        },
        "on-error": {
          DEFAULT: "#ffffff",
          container: "#93000a",
        },

        // Outline
        outline: {
          DEFAULT: "#7a8aa5",
          variant: "#c3d0e4",
        },

        // Inverse — the depicted-dark surfaces: phone screens, code
        // terminals, browser chrome in the mockups. Navy, not neutral grey.
        inverse: {
          surface: "#0b1e3f",
          "on-surface": "#eaf1fb",
          primary: "#a8cbf5",
        },
      },

      /* ─────────────────────────────────────────────
       * FONT FAMILIES
       * Plus Jakarta Sans = headlines/display
       * Inter = body/labels/UI
       * ───────────────────────────────────────────── */
      fontFamily: {
        display: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        heading: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        label: ["var(--font-inter)", "system-ui", "sans-serif"],
        poster: ["var(--font-oswald)", "system-ui", "sans-serif"],
      },

      /* ─────────────────────────────────────────────
       * FONT SIZE SCALE
       * Semantic size tokens with built-in line-height,
       * letter-spacing, and font-weight
       * ───────────────────────────────────────────── */
      /* Fluid, not stepped. Every size interpolates across the whole viewport
       * range instead of snapping at a breakpoint, so widths nobody has
       * measured — 344px foldables, 3440px ultrawides — land somewhere
       * sensible by construction rather than by having been special-cased.
       *
       * Each clamp is written as `clamp(min, rem + vw, max)`. The rem term is
       * what keeps browser zoom and user font-size settings working: a pure
       * `vw` middle term ignores them, which fails WCAG 1.4.4. The min/max
       * ends are the values these tokens already shipped at, so nothing
       * changes at the two anchor widths — only the path between them.
       *
       * Anchors: 360px (min end) → 1440px (max end).
       */
      fontSize: {
        // Display — hero headlines. 40px @360 → 72px @1440.
        "display-xl": ["clamp(2.5rem, 1.833rem + 2.963vw, 4.5rem)", { lineHeight: "1.08", letterSpacing: "-0.04em", fontWeight: "700" }],
        // 32px @360 → 56px @1440.
        "display-lg": ["clamp(2rem, 1.5rem + 2.222vw, 3.5rem)", { lineHeight: "1.12", letterSpacing: "-0.03em", fontWeight: "700" }],
        // Kept: still referenced where a heading is deliberately pinned small.
        "display-lg-mobile": ["40px", { lineHeight: "1.15", fontWeight: "700" }],

        // 28px @360 → 44px @1440. The step between a section title and a page
        // title, for headings that lead a panel rather than a route.
        "display-sm": ["clamp(1.75rem, 1.417rem + 1.481vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],

        // Headline — section titles. 28px @360 → 40px @1440.
        "headline-lg": ["clamp(1.75rem, 1.5rem + 1.111vw, 2.5rem)", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-lg-mobile": ["28px", { lineHeight: "1.2", fontWeight: "600" }],
        // 24px @360 → 32px @1440.
        "headline-md": ["clamp(1.5rem, 1.333rem + 0.741vw, 2rem)", { lineHeight: "1.3", fontWeight: "600" }],

        // Body. 16px @360 → 18px @1440; the small end never drops below 16px
        // because iOS Safari zooms the page on focus for anything under it.
        "body-lg": ["clamp(1rem, 0.958rem + 0.185vw, 1.125rem)", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "1.5", fontWeight: "400" }],

        // Label
        "label-caps": ["12px", { lineHeight: "1.2", letterSpacing: "0.1em", fontWeight: "600" }],
        "label-sm": ["11px", { lineHeight: "1.2", letterSpacing: "0.08em", fontWeight: "600" }],
      },

      /* ─────────────────────────────────────────────
       * SPACING SYSTEM
       * 8px base grid + semantic tokens
       * ───────────────────────────────────────────── */
      spacing: {
        base: "8px",
        /* Vertical rhythm is fluid on the same 360→1440 anchors as the type
         * scale, so headings and the space around them grow together. When
         * only the type scaled, large headings on a 390px phone sat in
         * desktop-sized gaps and the page read as half-empty. */
        "stack-sm": "clamp(0.5rem, 0.417rem + 0.37vw, 0.75rem)",   // 8 → 12
        "stack-md": "clamp(1rem, 0.833rem + 0.741vw, 1.5rem)",     // 16 → 24
        "stack-lg": "clamp(2rem, 1.667rem + 1.481vw, 3rem)",       // 32 → 48
        "stack-xl": "clamp(3rem, 2.333rem + 2.963vw, 5rem)",       // 48 → 80
        "stack-2xl": "clamp(4rem, 2.833rem + 5.185vw, 7.5rem)",    // 64 → 120
        gutter: "clamp(1rem, 0.833rem + 0.741vw, 1.5rem)",         // 16 → 24
        /* Fixed values retained: these are referenced where a specific gutter
         * has to match a sibling's, and `.container-site` in globals.css is
         * the fluid path for page padding. */
        "margin-x-mobile": "20px",
        "margin-x-tablet": "40px",
        "margin-x-desktop": "64px",
        "container-max": "1280px",
        "container-wide": "1440px",
      },

      /* ─────────────────────────────────────────────
       * BORDER RADIUS
       * ───────────────────────────────────────────── */
      borderRadius: {
        DEFAULT: "0.5rem",
        sm: "0.25rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
        full: "9999px",
      },

      /* ─────────────────────────────────────────────
       * SHADOWS
       * Extremely diffused, low-opacity
       * ───────────────────────────────────────────── */
      boxShadow: {
        glass: "0 20px 40px rgba(8, 29, 74, 0.05)",
        "glass-hover": "0 20px 40px rgba(40, 104, 198, 0.10)",
        "glass-elevated": "0 30px 60px rgba(8, 29, 74, 0.10)",
        "btn-primary": "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        "btn-primary-lg": "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 4px 16px rgba(40, 104, 198, 0.25)",
        "input-inner": "inset 0 2px 4px rgba(8, 29, 74, 0.03)",
        glow: "0 0 10px rgba(55, 140, 231, 0.4)",
      },

      /* ─────────────────────────────────────────────
       * BACKDROP BLUR
       * ───────────────────────────────────────────── */
      backdropBlur: {
        glass: "24px",
        nav: "40px",
      },

      /* ─────────────────────────────────────────────
       * TRANSITIONS
       * ───────────────────────────────────────────── */
      transitionTimingFunction: {
        "bounce-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "ease-premium": "cubic-bezier(0.25, 0.4, 0.25, 1)",
      },

      /* ─────────────────────────────────────────────
       * KEYFRAME ANIMATIONS
       * ───────────────────────────────────────────── */
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        }
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
        slideDown: "slideDown 3s linear infinite",
      },

      /* ─────────────────────────────────────────────
       * PROSE (article body)
       *
       * The article body used `prose-invert`, which is the plugin's
       * dark-background variant: body copy at #d1d5db and bold at #fff. On
       * this palette the page behind it is #f7faff, so emphasised words were
       * white-on-near-white and the rest of the paragraph was a flat grey
       * that belongs to no token here. Colour comes from the semantic tokens
       * instead, so the body reads as the same navy/steel pair as the rest
       * of the site and bold text is the darkest thing in the paragraph
       * rather than the lightest.
       * ───────────────────────────────────────────── */
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.on-surface.variant"),
            "--tw-prose-headings": theme("colors.on-surface.DEFAULT"),
            "--tw-prose-lead": theme("colors.on-surface.variant"),
            "--tw-prose-links": theme("colors.primary.DEFAULT"),
            "--tw-prose-bold": theme("colors.on-surface.DEFAULT"),
            "--tw-prose-counters": theme("colors.on-surface.variant"),
            "--tw-prose-bullets": theme("colors.primary.DEFAULT"),
            "--tw-prose-hr": theme("colors.outline.variant"),
            "--tw-prose-quotes": theme("colors.on-surface.DEFAULT"),
            "--tw-prose-quote-borders": theme("colors.primary.DEFAULT"),
            "--tw-prose-captions": theme("colors.on-surface.variant"),
            "--tw-prose-kbd": theme("colors.on-surface.DEFAULT"),
            "--tw-prose-code": theme("colors.primary.DEFAULT"),
            "--tw-prose-pre-code": theme("colors.inverse.on-surface"),
            "--tw-prose-pre-bg": theme("colors.inverse.surface"),
            "--tw-prose-th-borders": theme("colors.outline.variant"),
            "--tw-prose-td-borders": theme("colors.outline.variant"),

            /* Inline code gets a tinted chip. The plugin's default quotes it
               with literal backticks, which read as stray characters next to
               a background-filled span. */
            code: {
              backgroundColor: theme("colors.surface.container.low"),
              padding: "0.15em 0.4em",
              borderRadius: theme("borderRadius.sm"),
              fontWeight: "500",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },

            /* …and loses all of it inside a code block, where the dark
               surface is the background and per-token chips would fight it. */
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
              fontWeight: "inherit",
              color: "inherit",
            },
          },
        },
      }),
    },
  },
  plugins: [],
};
