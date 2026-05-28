/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ─────────────────────────────────────────────
       * COLOR SYSTEM
       * Material Design 3 token names from DESIGN.md
       * ───────────────────────────────────────────── */
      colors: {
        // Surfaces
        surface: {
          DEFAULT: "#faf8ff",
          dim: "#d9d9e5",
          bright: "#faf8ff",
          container: {
            lowest: "#ffffff",
            low: "#f3f3fe",
            DEFAULT: "#ededf9",
            high: "#e7e7f3",
            highest: "#e1e2ed",
          },
          variant: "#e1e2ed",
          tint: "#0053db",
        },
        background: "#faf8ff",

        // On-surface (text)
        "on-surface": {
          DEFAULT: "#191b23",
          variant: "#434655",
        },
        "on-background": "#191b23",

        // Primary
        primary: {
          DEFAULT: "#004ac6",
          container: "#2563eb",
          fixed: {
            DEFAULT: "#dbe1ff",
            dim: "#b4c5ff",
          },
        },
        "on-primary": {
          DEFAULT: "#ffffff",
          container: "#eeefff",
          fixed: {
            DEFAULT: "#00174b",
            variant: "#003ea8",
          },
        },

        // Secondary
        secondary: {
          DEFAULT: "#4648d4",
          container: "#6063ee",
          fixed: {
            DEFAULT: "#e1e0ff",
            dim: "#c0c1ff",
          },
        },
        "on-secondary": {
          DEFAULT: "#ffffff",
          container: "#fffbff",
          fixed: {
            DEFAULT: "#07006c",
            variant: "#2f2ebe",
          },
        },

        // Tertiary (accent/warm)
        tertiary: {
          DEFAULT: "#943700",
          container: "#bc4800",
          fixed: {
            DEFAULT: "#ffdbcd",
            dim: "#ffb596",
          },
        },
        "on-tertiary": {
          DEFAULT: "#ffffff",
          container: "#ffede6",
          fixed: {
            DEFAULT: "#360f00",
            variant: "#7d2d00",
          },
        },

        // Error
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
          DEFAULT: "#737686",
          variant: "#c3c6d7",
        },

        // Inverse
        inverse: {
          surface: "#2e3039",
          "on-surface": "#f0f0fb",
          primary: "#b4c5ff",
        },
      },

      /* ─────────────────────────────────────────────
       * FONT FAMILIES
       * Plus Jakarta Sans = headlines/display
       * Inter = body/labels/UI
       * ───────────────────────────────────────────── */
      fontFamily: {
        display: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        heading: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        label: ["var(--font-inter)", "system-ui", "sans-serif"],
      },

      /* ─────────────────────────────────────────────
       * FONT SIZE SCALE
       * Semantic size tokens with built-in line-height,
       * letter-spacing, and font-weight
       * ───────────────────────────────────────────── */
      fontSize: {
        // Display — hero headlines
        "display-xl": ["72px", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "700" }],
        "display-lg": ["56px", { lineHeight: "1.15", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-lg-mobile": ["40px", { lineHeight: "1.15", fontWeight: "700" }],

        // Headline — section titles
        "headline-lg": ["40px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-lg-mobile": ["28px", { lineHeight: "1.2", fontWeight: "600" }],
        "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "600" }],

        // Body
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
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
        "stack-sm": "12px",
        "stack-md": "24px",
        "stack-lg": "48px",
        "stack-xl": "80px",
        "stack-2xl": "120px",
        gutter: "24px",
        "margin-x-mobile": "20px",
        "margin-x-tablet": "40px",
        "margin-x-desktop": "64px",
        "container-max": "1280px",
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
        glass: "0 20px 40px rgba(0, 0, 0, 0.04)",
        "glass-hover": "0 20px 40px rgba(70, 72, 212, 0.08)",
        "glass-elevated": "0 30px 60px rgba(0, 0, 0, 0.08)",
        "btn-primary": "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        "btn-primary-lg": "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 4px 16px rgba(0, 74, 198, 0.25)",
        "input-inner": "inset 0 2px 4px rgba(0, 0, 0, 0.02)",
        glow: "0 0 10px rgba(70, 72, 212, 0.4)",
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
    },
  },
  plugins: [],
};
