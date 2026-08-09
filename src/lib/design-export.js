/**
 * renderDesignExport, turns a token set into one standalone HTML document.
 *
 * This single function is the whole point of the ui-ux-design demo. It backs
 * three surfaces at once:
 *
 *   - the editor's live preview  (rendered into an iframe via `srcdoc`)
 *   - the Download button        (the same string, wrapped in a Blob)
 *   - the emailed export         (the same string, as an attachment)
 *
 * Because all three read this one function, what you see in the preview is
 * byte-for-byte what lands on disk. A preview built from React components
 * styled "to match" would drift from the exported file the first time either
 * side changed; there is nothing here to drift.
 *
 * The output has no build step, no external stylesheet, and no script. Every
 * visual decision resolves from the custom properties in `:root`, which is
 * the argument the demo is making.
 */

const FONT_STACKS = {
  grotesque:
    "'Bricolage Grotesque', 'Segoe UI', -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
  geometric: "'Futura', 'Century Gothic', 'Avenir Next', 'Segoe UI', Helvetica, Arial, sans-serif",
  serif: "'Iowan Old Style', 'Palatino Linotype', Georgia, 'Times New Roman', serif",
  mono: "'JetBrains Mono', 'SF Mono', Menlo, Consolas, 'Courier New', monospace",
};

export const FONT_OPTIONS = [
  { id: "grotesque", label: "Grotesque" },
  { id: "geometric", label: "Geometric" },
  { id: "serif", label: "Serif" },
  { id: "mono", label: "Mono" },
];

export const DENSITY_OPTIONS = [
  { id: "comfortable", label: "Comfortable" },
  { id: "compact", label: "Compact" },
];

export const DEFAULT_TOKENS = {
  hue: 232,
  radius: 16,
  space: 20,
  scaleStep: 125,
  dark: false,
  font: "grotesque",
  density: "comfortable",
};

/** Modular type scale, every step is the previous one times `ratio`. */
function typeScale(ratio) {
  const base = 16;
  return {
    xs: +(base / ratio ** 1.5).toFixed(2),
    sm: +(base / ratio ** 0.5).toFixed(2),
    md: base,
    lg: +(base * ratio).toFixed(2),
    xl: +(base * ratio ** 2).toFixed(2),
    xxl: +(base * ratio ** 3).toFixed(2),
  };
}

/**
 * The token layer. Kept as data rather than a string so the editor can show a
 * live token inspector built from the same source the stylesheet is built from.
 */
export function buildTokens(input = {}) {
  const t = { ...DEFAULT_TOKENS, ...input };
  const ratio = t.scaleStep / 100;
  const scale = typeScale(ratio);
  const densityFactor = t.density === "compact" ? 0.7 : 1;
  const s = (mult) => `${Math.round(t.space * mult * densityFactor)}px`;

  const light = {
    "--surface": "#ffffff",
    "--surface-2": `hsl(${t.hue} 32% 97%)`,
    "--surface-3": `hsl(${t.hue} 28% 94%)`,
    "--ink": `hsl(${t.hue} 46% 14%)`,
    "--ink-2": `hsl(${t.hue} 16% 42%)`,
    "--line": `hsl(${t.hue} 24% 88%)`,
    "--shadow": `hsl(${t.hue} 40% 20% / 0.08)`,
  };

  const dark = {
    "--surface": `hsl(${t.hue} 18% 11%)`,
    "--surface-2": `hsl(${t.hue} 16% 15%)`,
    "--surface-3": `hsl(${t.hue} 14% 20%)`,
    "--ink": `hsl(${t.hue} 22% 96%)`,
    "--ink-2": `hsl(${t.hue} 12% 68%)`,
    "--line": `hsl(${t.hue} 12% 27%)`,
    "--shadow": "hsl(0 0% 0% / 0.4)",
  };

  return {
    ...(t.dark ? dark : light),
    "--accent": `hsl(${t.hue} 68% ${t.dark ? 62 : 46}%)`,
    "--accent-ink": t.dark ? `hsl(${t.hue} 40% 10%)` : "#ffffff",
    "--accent-soft": `hsl(${t.hue} 68% ${t.dark ? 62 : 46}% / 0.14)`,
    "--positive": `hsl(152 58% ${t.dark ? 58 : 34}%)`,
    "--warning": `hsl(28 82% ${t.dark ? 62 : 44}%)`,
    "--radius-sm": `${Math.round(t.radius * 0.5)}px`,
    "--radius": `${t.radius}px`,
    "--radius-lg": `${Math.round(t.radius * 1.6)}px`,
    "--radius-pill": "999px",
    "--space-1": s(0.25),
    "--space-2": s(0.5),
    "--space-3": s(0.75),
    "--space-4": s(1),
    "--space-6": s(1.5),
    "--space-8": s(2),
    "--space-12": s(3),
    "--font": FONT_STACKS[t.font] || FONT_STACKS.grotesque,
    "--text-xs": `${scale.xs}px`,
    "--text-sm": `${scale.sm}px`,
    "--text-md": `${scale.md}px`,
    "--text-lg": `${scale.lg}px`,
    "--text-xl": `${scale.xl}px`,
    "--text-xxl": `${scale.xxl}px`,
    "--track-tight": `${(-0.02 * scale.xxl).toFixed(2)}px`,
  };
}

/** Group the flat token map for the editor's inspector panel. */
export const TOKEN_GROUPS = [
  { name: "Colour", match: (k) => /accent|surface|ink|line|positive|warning|shadow/.test(k) },
  { name: "Radius", match: (k) => k.startsWith("--radius") },
  { name: "Spacing", match: (k) => k.startsWith("--space") },
  { name: "Type", match: (k) => k.startsWith("--text") || k === "--font" || k === "--track-tight" },
];

function tokenBlock(tokens) {
  return Object.entries(tokens)
    .map(([k, v]) => `      ${k}: ${v};`)
    .join("\n");
}

/**
 * Everything below `:root` is written once and never parameterised. That is
 * deliberate, it is the proof: no component rule mentions a colour, a radius,
 * or a size directly, so moving one token moves the entire document.
 */
export function renderDesignExport(input = {}) {
  const t = { ...DEFAULT_TOKENS, ...input };
  const tokens = buildTokens(t);

  return `<!doctype html>
<html lang="en" data-theme="${t.dark ? "dark" : "light"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Design System. LogixLoops export</title>
<style>
  /* ── Token layer ──────────────────────────────────────────────────────
     The only place a raw value appears. Every rule below reads from here. */
  :root {
${tokenBlock(tokens)}
  }

  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--surface-2);
    color: var(--ink);
    font-family: var(--font);
    font-size: var(--text-md);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  .wrap { max-width: 880px; margin: 0 auto; padding: var(--space-8) var(--space-4); }

  .eyebrow {
    margin: 0 0 var(--space-2) 0;
    font-size: var(--text-xs);
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 700;
  }
  h1 {
    margin: 0 0 var(--space-3) 0;
    font-size: var(--text-xxl);
    line-height: 1.1;
    letter-spacing: var(--track-tight);
    font-weight: 700;
  }
  h2 {
    margin: 0 0 var(--space-4) 0;
    font-size: var(--text-lg);
    line-height: 1.25;
    font-weight: 650;
  }
  .lede { margin: 0 0 var(--space-8) 0; font-size: var(--text-lg); color: var(--ink-2); max-width: 46ch; }
  .muted { color: var(--ink-2); }

  .card {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    box-shadow: 0 2px 8px var(--shadow);
  }
  .stack > * + * { margin-top: var(--space-6); }
  .grid { display: grid; gap: var(--space-4); grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    border: 1px solid transparent;
    border-radius: var(--radius-pill);
    padding: var(--space-3) var(--space-6);
    font: inherit;
    font-size: var(--text-sm);
    font-weight: 650;
    letter-spacing: .04em;
    cursor: pointer;
    background: var(--accent);
    color: var(--accent-ink);
  }
  .btn--ghost { background: transparent; color: var(--accent); border-color: var(--line); }
  .btn--soft { background: var(--accent-soft); color: var(--accent); }

  .chip {
    display: inline-block;
    border-radius: var(--radius-pill);
    padding: var(--space-1) var(--space-3);
    font-size: var(--text-xs);
    font-weight: 650;
    letter-spacing: .1em;
    text-transform: uppercase;
    background: var(--accent-soft);
    color: var(--accent);
  }
  .chip--positive { background: color-mix(in srgb, var(--positive) 16%, transparent); color: var(--positive); }
  .chip--warning { background: color-mix(in srgb, var(--warning) 18%, transparent); color: var(--warning); }

  .field { display: block; }
  .field span {
    display: block;
    margin-bottom: var(--space-2);
    font-size: var(--text-xs);
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--ink-2);
    font-weight: 650;
  }
  .field input, .field select {
    width: 100%;
    background: var(--surface-2);
    border: 1px solid var(--line);
    border-radius: var(--radius);
    padding: var(--space-3) var(--space-4);
    color: var(--ink);
    font: inherit;
    font-size: var(--text-sm);
  }
  .field input:focus-visible, .field select:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  table { width: 100%; border-collapse: collapse; font-size: var(--text-sm); }
  th, td { text-align: left; padding: var(--space-3) 0; border-bottom: 1px solid var(--line); }
  th { font-size: var(--text-xs); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-2); }
  td:last-child, th:last-child { text-align: right; }

  .meter { height: var(--space-2); border-radius: var(--radius-pill); background: var(--surface-3); overflow: hidden; }
  .meter > i { display: block; height: 100%; border-radius: var(--radius-pill); background: var(--accent); }

  .swatches { display: flex; flex-wrap: wrap; gap: var(--space-2); }
  .swatch { width: var(--space-12); height: var(--space-12); border-radius: var(--radius); border: 1px solid var(--line); }

  footer { margin-top: var(--space-12); font-size: var(--text-xs); color: var(--ink-2); }
</style>
</head>
<body>
  <div class="wrap stack">

    <header>
      <p class="eyebrow">Design system export</p>
      <h1>One token layer, every surface.</h1>
      <p class="lede">Nothing on this page was styled by hand. Each component reads the custom properties at the top of the stylesheet, move one and the whole document moves with it.</p>
      <p><button class="btn">Primary action</button> <button class="btn btn--soft">Secondary</button> <button class="btn btn--ghost">Tertiary</button></p>
    </header>

    <section class="card">
      <h2>Palette</h2>
      <div class="swatches">
        <span class="swatch" style="background:var(--accent)"></span>
        <span class="swatch" style="background:var(--accent-soft)"></span>
        <span class="swatch" style="background:var(--surface)"></span>
        <span class="swatch" style="background:var(--surface-2)"></span>
        <span class="swatch" style="background:var(--surface-3)"></span>
        <span class="swatch" style="background:var(--positive)"></span>
        <span class="swatch" style="background:var(--warning)"></span>
      </div>
      <p class="muted" style="margin-bottom:0">Every swatch is derived from a single hue token, so a rebrand is one number.</p>
    </section>

    <section class="grid">
      <div class="card">
        <p class="eyebrow">Status</p>
        <p><span class="chip">Live</span> <span class="chip chip--positive">Healthy</span> <span class="chip chip--warning">Degraded</span></p>
      </div>
      <div class="card">
        <p class="eyebrow">Utilisation</p>
        <div class="meter"><i style="width:68%"></i></div>
        <p class="muted" style="margin-bottom:0;font-size:var(--text-sm)">68% of provisioned capacity</p>
      </div>
      <div class="card">
        <p class="eyebrow">Type scale</p>
        <p style="font-size:var(--text-xl);line-height:1.1;margin:0">Aa</p>
        <p class="muted" style="margin-bottom:0;font-size:var(--text-sm)">${(t.scaleStep / 100).toFixed(3)}× modular ratio</p>
      </div>
    </section>

    <section class="card">
      <h2>Form</h2>
      <div class="grid">
        <label class="field"><span>Full name</span><input value="Avery Chen"></label>
        <label class="field"><span>Work email</span><input value="avery@northwind.example"></label>
        <label class="field"><span>Plan</span><select><option>Growth</option><option>Enterprise</option></select></label>
      </div>
    </section>

    <section class="card">
      <h2>Data</h2>
      <table>
        <thead><tr><th>Environment</th><th>Region</th><th>Requests</th></tr></thead>
        <tbody>
          <tr><td>Production</td><td>eu-west-1</td><td>4.2M</td></tr>
          <tr><td>Staging</td><td>eu-west-1</td><td>318K</td></tr>
          <tr><td>Preview</td><td>us-east-1</td><td>26K</td></tr>
        </tbody>
      </table>
    </section>

    <footer>
      Generated by the design-system demo at logixloops.in/services/ui-ux-design,
      ${t.dark ? "dark" : "light"} theme, ${t.radius}px radius, ${t.space}px base spacing, ${t.density} density.
    </footer>
  </div>
</body>
</html>`;
}
