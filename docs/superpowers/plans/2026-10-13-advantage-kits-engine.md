# Advantage Kits Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the eight-practice services model with six lines and thirteen wave 1 Advantage Kits: data, line pages, kit pages, the `/kits` catalogue, redirects, navigation, schema, sitemap and a generated `llms.txt`.

**Architecture:** All kit, line and plan content lives in three data files (`src/data/kits.js`, `lines.js`, `plans.js`), with prices formatted by one helper (`src/lib/pricing.js`). Pages, cards, schema, sitemap and `llms.txt` all read from those files, so a price or slug changes in exactly one place. Line pages reuse the `/services/[slug]` route and the parts of the `ServiceMaster*` spine that still fit. Kit pages are a new `/kits/[slug]` route built from small section components.

**Tech Stack:** Next.js 16.2.6 App Router (JavaScript, no TypeScript), React 19, Tailwind CSS 4, Node 24 built-in test runner (`node --test`) with no new dependencies.

**Spec:** `docs/superpowers/specs/2026-10-13-advantage-kits-repositioning-design.md`

**Plan assets:** `docs/superpowers/plans/2026-10-13-advantage-kits-engine/` holds the full, pre-validated content files this plan copies into `src/`: `pricing.js`, `plans.js`, `kits.js`, `lines.js` and `brand-voice-and-search.md`. Read them as part of reviewing this plan. Every summary, meta title and meta description in them was checked against the rules in Task 3 before the plan was written.

**Scope of this plan:** spec phases 1, 2 and the structural half of 3 (`/kits`, navigation, footer). Not in this plan, and covered by later plans: copy rewrites of Home, `/pricing`, About, Work, Process, FAQ and Contact; location pages; the `/claude-rank` audit and fix pass; wave 2 kits and blog cost guides.

## Global Constraints

- Next.js is 16.2.6 and differs from older versions. `params` is a Promise (`const { slug } = await params`). Read `node_modules/next/dist/docs/01-app/` for any API not shown in this plan before using it.
- No new dependencies. Tests use `node --test`.
- No em-dash (U+2014) in any site content: copy, data files, metadata, `llms.txt`. En-dashes inside numeric ranges (`3–4 weeks`) are fine.
- Banned vocabulary in content: elite, world-class, cutting-edge, best-in-class, unparalleled, unprecedented, seamless(ly), hyper-*, revolutionise, leverage, synergy, luxury, atmospheric, immersive, bespoke, holistic, journey, solution(s), "in today's fast-paced world".
- Every price shown on a page comes from `src/data/kits.js` or `src/data/plans.js` through `src/lib/pricing.js`. Never type a price into a component.
- A line's memorable name (Engine, Spark, Glow-Up, Spotlight, Autopilot, Pit Crew) never appears without its plain label nearby. Titles, H1s and schema lead with the plain label for line pages and with the kit name for kit pages.
- No question-phrased section headings under a hero. Questions live only in FAQ accordions. Section headings are short declarative labels.
- Top-level routes open on `PageHero` followed by `PageSurface`. Detail routes (`/services/[slug]`, `/kits/[slug]`) keep compact heroes.
- Card hovers must match what the card means, using the vocabulary in `src/app/globals.css`: `level-gauge` for a priced quantity, `rule-draw` for a declaration, `dispatch` for something that sends you somewhere, `cipher-lens` for a denser layer underneath. If none fits, no hover.
- No `backdrop-blur` on content cards; use an opaque `bg-surface-container-lowest/85` panel. No new large `blur-*` layers.
- Do not add new custom CSS classes. Use Tailwind utilities and the existing hooks above.
- Line slugs: `web-and-app-development`, `branding`, `website-redesign`, `seo-and-ai-search`, `ai-automation`, `maintenance-and-support`.
- Kit slugs (wave 1): `business-website`, `online-store`, `mvp`, `mobile-app`, `brand-identity`, `brand-launch`, `website-glow-up`, `speed`, `seo-foundation`, `ai-visibility`, `whatsapp-ai`, `ai-assistant`, `workflow-automation`.
- Kit summaries 40–60 words; meta titles at most 47 characters (the root template prepends `LogixLoops | `); meta descriptions 70–160 characters after any appended price.
- Shell: commands assume Git Bash from the repo root `E:\LogixLoops-Website`. Do not leave the shell in `src/`: a project hook treats `src/hooks/` as a plugin folder and blocks file writes.
- Commits end with the trailer:
  `Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>`

## Review Focus

These are the inputs a real visitor or crawler will hit that unit tests cannot reach. Each has a check in the smoke script (`scripts/smoke.mjs`) added by the task that owns the code:

1. **A mistyped or retired URL.** `/kits/not-a-kit` and `/services/not-a-line` must return 404, not a crash or an empty page. Old practice URLs with a query string (`/services/web-development?ref=x`) must 308 to the new line and keep the query. Owner: Tasks 7 and 9.
2. **A kit or line with nothing to prove yet.** A kit with no client work (`mobile-app`) must not render an empty "Built with this kit" heading; a line with no studies (`branding`) must not render "Work built with these kits". Owner: Tasks 7 and 9.
3. **A phone-width visitor.** At 360px, price chips such as `$10,000 · ₹5,00,000`, long kit names and the line chip in the kit hero must wrap without horizontal scroll. Owner: Task 14, manual check in the browser.
4. **A crawler reading structured data.** Kit pages must emit `Service` with `priceSpecification` in USD and INR, `HowTo` and `FAQPage`; the Rich Results Test must report them valid. Owner: Task 9 (smoke) and Task 14 (manual Rich Results Test).
5. **The mega-menu with fewer items.** Services now has six children (was eight) and two new top-level links without dropdowns (Kits, Pricing). Keyboard focus, the mobile menu and the hover preview images must still work. Owner: Task 11, manual check.

---

## File map

**Create**
- `test/alias-hooks.mjs`: resolves `@/` and extensionless imports for `node --test`.
- `test/helpers/voice.mjs`: banned words, em-dash check, copy-string walker, word count.
- `test/harness.test.mjs`, `test/pricing.test.mjs`, `test/content.test.mjs`, `test/case-studies.test.mjs`, `test/schema.test.mjs`, `test/redirects.test.mjs`, `test/sitemap.test.mjs`, `test/navigation.test.mjs`, `test/llms.test.mjs`
- `scripts/smoke.mjs`: post-build HTTP checks against `next start`.
- `src/lib/pricing.js`, `src/lib/llms.js`
- `src/data/plans.js`, `src/data/kits.js`, `src/data/lines.js`
- `src/components/sections/kits/`: `KitCard.jsx`, `PlanCard.jsx`, `PromiseStrip.jsx`, `StudioCta.jsx`, `UnderTheHood.jsx`, `LineHero.jsx`, `KitHero.jsx`, `KitIncludes.jsx`, `KitFit.jsx`, `KitSteps.jsx`, `KitAddOns.jsx`
- `src/app/kits/page.js`, `src/app/kits/opengraph-image.js`
- `src/app/kits/[slug]/page.js`, `src/app/kits/[slug]/opengraph-image.js`, `src/app/kits/[slug]/loading.js`
- `src/app/llms.txt/route.js`

**Modify**
- `package.json` (test script), `next.config.mjs` (redirects)
- `docs/brand-voice-and-search.md` (replaced)
- `src/lib/constants.js`, `src/lib/schema.js`
- `src/data/caseStudies.js`
- `src/app/services/[slug]/page.js`, `src/app/services/[slug]/opengraph-image.js`, `src/app/services/page.js`, `src/app/services/opengraph-image.js`
- `src/app/page.js`, `src/app/not-found.js`, `src/app/sitemap.js`
- `src/app/work/[slug]/page.js`, `src/app/work/[slug]/opengraph-image.js`
- `src/components/ui/Breadcrumbs.jsx`
- `src/components/layout/Navbar.jsx`
- `src/components/sections/services/ServicesInertiaGrid.jsx`
- `src/components/sections/home/FeaturedWorkSection.jsx`
- `src/components/sections/service-master/ServiceMasterSignature.jsx`, `ServiceMasterProblems.jsx`, `ServiceMasterFAQ.jsx`, `ServiceMasterRelatedWork.jsx`

**Delete**
- `public/llms.txt` (replaced by the generated route)
- `src/data/services.js`
- `src/components/sections/case-study/ReferenceBuildNotice.jsx`
- `src/components/sections/service-master/`: `ServiceMasterHero.jsx`, `ServiceMasterCapabilities.jsx`, `ServiceMasterTech.jsx`, `ServiceMasterProcess.jsx`, `ServiceMasterSolutions.jsx`, `ServiceMasterMetrics.jsx`, `ServiceMasterCaseStudy.jsx`, `ServiceMasterCTA.jsx`
- `src/components/sections/home/`: `TestimonialsSection.jsx`, `FeaturedCaseStudySection.jsx`, `TrustedBySection.jsx`, `PricingSnapshotSection.jsx`, `ServicesBento.jsx`

---

### Task 0: Branch

- [ ] **Step 1: Create the working branch**

```bash
git checkout -b feat/advantage-kits
git status --short
```

Expected: `Switched to a new branch 'feat/advantage-kits'`. The only untracked paths should be `hover.md` (not ours, leave it alone) and the spec and plan files under `docs/superpowers/`.

- [ ] **Step 2: Commit the spec and plan**

```bash
git add docs/superpowers/specs/2026-10-13-advantage-kits-repositioning-design.md docs/superpowers/plans/2026-10-13-advantage-kits-engine.md docs/superpowers/plans/2026-10-13-advantage-kits-engine/
git commit -m "docs: advantage kits repositioning spec and engine plan

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 1: Test harness

**Files:**
- Create: `test/alias-hooks.mjs`
- Create: `test/harness.test.mjs`
- Modify: `package.json` (`scripts`)

**Interfaces:**
- Produces: `npm test` runs every `test/**/*.test.mjs` with `@/…` and extensionless relative imports resolved the way Next resolves them. Later tasks only add test files.

- [ ] **Step 1: Write the failing test**

Create `test/harness.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { BRAND } from "@/lib/constants";

test("app modules load through the @/ alias", () => {
  assert.equal(BRAND.name, "LogixLoops");
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test`
Expected: FAIL with `npm error Missing script: "test"`.

- [ ] **Step 3: Add the resolve hook and the script**

Create `test/alias-hooks.mjs`:

```js
/**
 * Lets `node --test` load the app's own modules the way Next does: resolves
 * the `@/` alias from jsconfig.json, and the extensionless relative imports
 * (`./constants`) that Node's ESM loader otherwise rejects.
 */
import { registerHooks } from "node:module";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SRC = fileURLToPath(new URL("../src", import.meta.url));

function withExtension(file) {
  if (path.extname(file)) return file;
  for (const candidate of [`${file}.js`, path.join(file, "index.js")]) {
    if (existsSync(candidate)) return candidate;
  }
  return file;
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const file = withExtension(path.join(SRC, specifier.slice(2)));
      return nextResolve(pathToFileURL(file).href, context);
    }
    if (specifier.startsWith(".") && context.parentURL?.startsWith("file:")) {
      const parentDir = path.dirname(fileURLToPath(context.parentURL));
      const file = withExtension(path.resolve(parentDir, specifier));
      return nextResolve(pathToFileURL(file).href, context);
    }
    return nextResolve(specifier, context);
  },
});
```

In `package.json`, add a `test` script after `lint`:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --import ./test/alias-hooks.mjs --test \"test/**/*.test.mjs\""
  },
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npm test`
Expected: `ℹ pass 1`, `ℹ fail 0`.

- [ ] **Step 5: Commit**

```bash
git add test/alias-hooks.mjs test/harness.test.mjs package.json
git commit -m "test: add node --test harness with @/ alias resolution

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Price formatting

**Files:**
- Create: `src/lib/pricing.js` (copy of the plan asset)
- Test: `test/pricing.test.mjs`

**Interfaces:**
- Produces:
  - `formatUsd(amount: number) => string` → `"$1,500"`
  - `formatInr(amount: number) => string` → `"₹1,20,000"` (Indian grouping)
  - `formatPrice(price: {usd, inr, per?}) => string` → `"$1,500 · ₹60,000"`, or `"$150/mo · ₹6,000/mo"` when `per === "month"`
  - `formatPriceProse(price) => string` → `"$1,500 (₹60,000)"`, or `"$150 (₹6,000) a month"`
  - `cheapest(items: Array<{price}>) => item` (lowest `price.usd`)

- [ ] **Step 1: Write the failing test**

Create `test/pricing.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { cheapest, formatInr, formatPrice, formatPriceProse, formatUsd } from "@/lib/pricing";

test("USD uses international grouping", () => {
  assert.equal(formatUsd(1500), "$1,500");
  assert.equal(formatUsd(15000), "$15,000");
});

test("INR uses Indian lakh grouping", () => {
  assert.equal(formatInr(6000), "₹6,000");
  assert.equal(formatInr(120000), "₹1,20,000");
  assert.equal(formatInr(250000), "₹2,50,000");
});

test("formatPrice shows both currencies, with /mo for monthly prices", () => {
  assert.equal(formatPrice({ usd: 1500, inr: 60000 }), "$1,500 · ₹60,000");
  assert.equal(formatPrice({ usd: 150, inr: 6000, per: "month" }), "$150/mo · ₹6,000/mo");
});

test("formatPriceProse reads naturally in a sentence", () => {
  assert.equal(formatPriceProse({ usd: 1500, inr: 60000 }), "$1,500 (₹60,000)");
  assert.equal(formatPriceProse({ usd: 150, inr: 6000, per: "month" }), "$150 (₹6,000) a month");
});

test("cheapest picks the lowest USD price", () => {
  const items = [{ price: { usd: 900 } }, { price: { usd: 600 } }, { price: { usd: 1200 } }];
  assert.equal(cheapest(items).price.usd, 600);
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test`
Expected: FAIL with `Cannot find module` for `src/lib/pricing.js`.

- [ ] **Step 3: Add the implementation**

```bash
cp docs/superpowers/plans/2026-10-13-advantage-kits-engine/pricing.js src/lib/pricing.js
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npm test`
Expected: all tests pass (6 total).

- [ ] **Step 5: Commit**

```bash
git add src/lib/pricing.js test/pricing.test.mjs
git commit -m "feat: add USD and INR price formatting for kits and plans

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Voice rules, plans and kits data

**Files:**
- Replace: `docs/brand-voice-and-search.md` (copy of the plan asset)
- Create: `test/helpers/voice.mjs`
- Create: `src/data/plans.js`, `src/data/kits.js` (copies of the plan assets)
- Test: `test/content.test.mjs`

**Interfaces:**
- Consumes: `formatPrice` (Task 2).
- Produces:
  - `KITS: Kit[]`, `getAllKits() => Kit[]`, `getKitBySlug(slug) => Kit | null`, `getKitsByLine(lineSlug) => Kit[]`
  - `Kit = { slug, line, name, promise, summary, price: {usd, inr}, priceNote?, timeline, keyword, metaTitle, metaDescription, includes: string[], fitFor: string[], notFor: string[], steps: {title, desc}[], addOns: {name, price}[], underTheHood: string[], demo: string | null, work: string[], faqs: {q, a}[] }`
  - `PLANS: Plan[]`, `getAllPlans()`, `getPlanBySlug(slug) => Plan | null`
  - `Plan = { slug, name, price: {usd, inr, per: "month"}, summary, includes: string[], terms }`
  - From `test/helpers/voice.mjs`: `voiceProblems(text) => string[]`, `copyStrings(value) => [path, text][]`, `wordCount(text) => number`

- [ ] **Step 1: Write the voice helper**

Create `test/helpers/voice.mjs`:

```js
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
  if (text.includes("\u2014")) found.push("em-dash");
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
```

- [ ] **Step 2: Write the failing content test**

Create `test/content.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { KITS, getKitBySlug, getKitsByLine } from "@/data/kits";
import { PLANS, getPlanBySlug } from "@/data/plans";
import { getAllCaseStudies } from "@/data/caseStudies";
import { formatPrice } from "@/lib/pricing";
import { copyStrings, voiceProblems, wordCount } from "./helpers/voice.mjs";

export const LINE_SLUGS = [
  "web-and-app-development",
  "branding",
  "website-redesign",
  "seo-and-ai-search",
  "ai-automation",
  "maintenance-and-support",
];

const DEMOS = [
  "ViewportDemo",
  "PhoneScrollDemo",
  "TenantDemo",
  "InferenceDemo",
  "WorkflowDemo",
  "TokensDemo",
  "PipelineDemo",
  "ArchitectureDemo",
];

const wholePositive = (n) => Number.isInteger(n) && n > 0;
const voiceReport = (value) =>
  copyStrings(value).flatMap(([path, text]) => voiceProblems(text).map((p) => `${path}: ${p}`));

test("kit slugs are unique and every kit names a known line", () => {
  const slugs = KITS.map((kit) => kit.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const kit of KITS) assert.ok(LINE_SLUGS.includes(kit.line), `${kit.slug}: unknown line ${kit.line}`);
});

test("lookups find kits and plans, and return null for unknown slugs", () => {
  assert.equal(getKitBySlug("mvp").name, "MVP Kit");
  assert.equal(getKitBySlug("not-a-kit"), null);
  assert.equal(getKitsByLine("branding").length, 2);
  assert.equal(getPlanBySlug("squad").name, "Squad");
  assert.equal(getPlanBySlug("not-a-plan"), null);
});

test("every price is a positive whole number in both currencies", () => {
  const prices = [
    ...KITS.map((kit) => [kit.slug, kit.price]),
    ...KITS.flatMap((kit) => kit.addOns.map((addOn) => [`${kit.slug} / ${addOn.name}`, addOn.price])),
    ...PLANS.map((plan) => [plan.slug, plan.price]),
  ];
  for (const [where, price] of prices) {
    assert.ok(wholePositive(price.usd) && wholePositive(price.inr), `${where}: ${JSON.stringify(price)}`);
  }
});

test("plans bill monthly and kits are one-off", () => {
  for (const plan of PLANS) assert.equal(plan.price.per, "month", plan.slug);
  for (const kit of KITS) assert.equal(kit.price.per, undefined, kit.slug);
});

test("kit summaries are answer-first leads of 40 to 60 words", () => {
  for (const kit of KITS) {
    const words = wordCount(kit.summary);
    assert.ok(words >= 40 && words <= 60, `${kit.slug}: ${words} words`);
  }
});

test("kit meta titles fit after the 'LogixLoops | ' template", () => {
  for (const kit of KITS) assert.ok(kit.metaTitle.length <= 47, `${kit.slug}: ${kit.metaTitle.length} chars`);
});

test("kit meta descriptions stay within 70-160 characters with the price appended", () => {
  for (const kit of KITS) {
    const description = `${kit.metaDescription} From ${formatPrice(kit.price)}.`;
    assert.ok(description.length >= 70 && description.length <= 160, `${kit.slug}: ${description.length} chars`);
  }
});

test("every kit ends with The Loop", () => {
  for (const kit of KITS) assert.equal(kit.steps.at(-1).title, "The Loop", kit.slug);
});

test("demo keys name a real signature demo", () => {
  for (const kit of KITS) assert.ok(kit.demo === null || DEMOS.includes(kit.demo), `${kit.slug}: ${kit.demo}`);
});

test("related work points at real case studies", () => {
  const studies = new Set(getAllCaseStudies().map((study) => study.slug));
  for (const kit of KITS) {
    for (const slug of kit.work) assert.ok(studies.has(slug), `${kit.slug}: unknown study ${slug}`);
  }
});

test("kit and plan copy follows the voice rules", () => {
  assert.deepEqual(voiceReport({ KITS, PLANS }), []);
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npm test`
Expected: FAIL with `Cannot find module` for `src/data/kits.js`.

- [ ] **Step 4: Add the data files and the voice doc**

```bash
cp docs/superpowers/plans/2026-10-13-advantage-kits-engine/plans.js src/data/plans.js
cp docs/superpowers/plans/2026-10-13-advantage-kits-engine/kits.js src/data/kits.js
cp docs/superpowers/plans/2026-10-13-advantage-kits-engine/brand-voice-and-search.md docs/brand-voice-and-search.md
```

- [ ] **Step 5: Run it to verify it passes**

Run: `npm test`
Expected: all tests pass. If a meta length or word count fails, shorten or lengthen that one string in `src/data/kits.js` and the plan asset together, then rerun.

- [ ] **Step 6: Commit**

```bash
git add test/helpers/voice.mjs test/content.test.mjs src/data/plans.js src/data/kits.js docs/brand-voice-and-search.md
git commit -m "feat: add Advantage Kits and Pit Crew plan data with voice rules

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Lines data

**Files:**
- Create: `src/data/lines.js` (copy of the plan asset)
- Modify: `test/content.test.mjs` (append)

**Interfaces:**
- Consumes: `getKitBySlug` (Task 3), `getPlanBySlug` (Task 3), `formatPriceProse` (Task 2).
- Produces:
  - `LINES: Line[]`, `getAllLines() => Line[]`, `getLineBySlug(slug) => Line | null`
  - `Line = { slug, name, label, icon, color: "primary"|"secondary"|"tertiary", art, navImage, pitch, summary, metaTitle, metaDescription, keywords: string[], problems: {title, desc}[], underTheHood: string[], faqs: {q, a}[] }`

- [ ] **Step 1: Append the failing tests**

In `test/content.test.mjs`, change the pricing import to
`import { formatPrice, formatPriceProse } from "@/lib/pricing";`
and add these imports under the existing ones:

```js
import { existsSync } from "node:fs";
import { LINES, getLineBySlug } from "@/data/lines";
import { FAQS, HOME_FAQS, PRICING_FAQS, SERVICES_FAQS } from "@/data/faq";
```

Append to the end of `test/content.test.mjs`:

```js
test("lines.js defines exactly the six line slugs, in order", () => {
  assert.deepEqual(LINES.map((line) => line.slug), LINE_SLUGS);
  assert.equal(getLineBySlug("branding").name, "Spark");
  assert.equal(getLineBySlug("not-a-line"), null);
});

test("every line except Pit Crew sells at least one kit", () => {
  for (const line of LINES) {
    if (line.slug === "maintenance-and-support") continue;
    assert.ok(getKitsByLine(line.slug).length > 0, line.slug);
  }
});

test("line art and nav images exist on disk", () => {
  for (const line of LINES) {
    assert.ok(existsSync(`public${line.art}`), line.art);
    assert.ok(existsSync(`public${line.navImage}`), line.navImage);
  }
});

test("line summaries are 40 to 60 words and meta fits the limits", () => {
  for (const line of LINES) {
    const words = wordCount(line.summary);
    assert.ok(words >= 40 && words <= 60, `${line.slug}: ${words} words`);
    assert.ok(line.metaTitle.length <= 47, `${line.slug}: title ${line.metaTitle.length}`);
    const d = line.metaDescription.length;
    assert.ok(d >= 70 && d <= 160, `${line.slug}: description ${d}`);
  }
});

test("line FAQ answers quote the live kit and plan prices", () => {
  const engineCost = getLineBySlug("web-and-app-development").faqs[0].a;
  assert.ok(engineCost.includes(formatPriceProse(getKitBySlug("business-website").price)));
  const pitCrewCost = getLineBySlug("maintenance-and-support").faqs[0].a;
  assert.ok(pitCrewCost.includes(formatPriceProse(getPlanBySlug("squad").price)));
});

test("no FAQ question appears on two URLs", () => {
  const questions = [
    ...KITS.flatMap((kit) => kit.faqs.map((faq) => faq.q)),
    ...LINES.flatMap((line) => line.faqs.map((faq) => faq.q)),
    ...[FAQS, HOME_FAQS, PRICING_FAQS, SERVICES_FAQS].flat().map((faq) => faq.question),
  ].map((q) => q.trim().toLowerCase());
  const repeated = questions.filter((q, i) => questions.indexOf(q) !== i);
  assert.deepEqual(repeated, []);
});

test("line copy follows the voice rules", () => {
  assert.deepEqual(voiceReport({ LINES }), []);
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test`
Expected: FAIL with `Cannot find module` for `src/data/lines.js`.

- [ ] **Step 3: Add the data file**

```bash
cp docs/superpowers/plans/2026-10-13-advantage-kits-engine/lines.js src/data/lines.js
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/data/lines.js test/content.test.mjs
git commit -m "feat: add the six service lines with plain labels and FAQs

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Case studies are client work, tagged with kits

All five case studies are real clients (`demo: false`). This task removes the reference-build machinery and records which kit each project used, so kit pages can show proof.

**Files:**
- Modify: `src/data/caseStudies.js` (five `demo: false,` lines)
- Modify: `src/app/work/[slug]/page.js` (import line 9, line 33, lines 84–88, lines 126–131)
- Modify: `src/app/work/[slug]/opengraph-image.js` (eyebrow)
- Modify: `src/lib/schema.js` (`generateCaseStudySchema` and its doc comment)
- Delete: `src/components/sections/case-study/ReferenceBuildNotice.jsx`
- Test: `test/case-studies.test.mjs`

**Interfaces:**
- Consumes: `KITS`, `getKitBySlug` (Task 3).
- Produces: every case study record has `kits: string[]` (kit slugs) and no `demo` key. `generateCaseStudySchema(study)` returns `Article` when `publishedAt` is set, else `CreativeWork`, never with `creativeWorkStatus`.

- [ ] **Step 1: Write the failing test**

Create `test/case-studies.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { getAllCaseStudies } from "@/data/caseStudies";
import { KITS, getKitBySlug } from "@/data/kits";
import { generateCaseStudySchema } from "@/lib/schema";

test("every case study is client work tagged with the kits it used", () => {
  for (const study of getAllCaseStudies()) {
    assert.equal("demo" in study, false, `${study.slug} still has demo`);
    assert.ok(Array.isArray(study.kits) && study.kits.length > 0, `${study.slug} has no kits`);
    for (const slug of study.kits) {
      const kit = getKitBySlug(slug);
      assert.ok(kit, `${study.slug}: unknown kit ${slug}`);
      assert.ok(kit.work.includes(study.slug), `${slug}.work is missing ${study.slug}`);
    }
  }
});

test("kits only claim work that names them back", () => {
  const bySlug = new Map(getAllCaseStudies().map((study) => [study.slug, study]));
  for (const kit of KITS) {
    for (const slug of kit.work) assert.ok(bySlug.get(slug).kits.includes(kit.slug), `${slug}.kits is missing ${kit.slug}`);
  }
});

test("case study schema never describes client work as a reference build", () => {
  for (const study of getAllCaseStudies()) {
    const node = generateCaseStudySchema(study);
    assert.equal(node.creativeWorkStatus, undefined, study.slug);
    assert.equal(node["@type"], study.publishedAt ? "Article" : "CreativeWork", study.slug);
  }
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test`
Expected: FAIL, `sire-media still has demo`.

- [ ] **Step 3: Tag the case studies**

In `src/data/caseStudies.js`, replace each study's `demo: false,` line. Use the slug line above it to target each one:

| Find | Replace with |
|---|---|
| `slug: "sire-media",\n    demo: false,` | `slug: "sire-media",\n    kits: ["business-website"],` |
| `slug: "building-bites",\n    demo: false,` | `slug: "building-bites",\n    kits: ["online-store"],` |
| `slug: "clubin-nightlife",\n    demo: false,` | `slug: "clubin-nightlife",\n    kits: ["mvp"],` |
| `slug: "bouldspace-architecture",\n    demo: false,` | `slug: "bouldspace-architecture",\n    kits: ["business-website"],` |
| `slug: "adinath-finserv",\n    demo: false,` | `slug: "adinath-finserv",\n    kits: ["business-website"],` |

- [ ] **Step 4: Remove the reference-build branches**

In `src/app/work/[slug]/page.js`:
- Delete the import `import ReferenceBuildNotice from "@/components/sections/case-study/ReferenceBuildNotice";`
- Replace `type: study.demo ? "website" : "article",` with `type: "article",`
- Delete this block under the hero metrics:

```jsx
              {study.demo && (
                <p className="font-label text-label-caps uppercase tracking-widest text-secondary mb-4">
                  Design targets, not measured results
                </p>
              )}
```

- Delete this block and its comment:

```jsx
      {/* The disclosure, immediately under the hero */}
      {study.demo && (
        <section className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop relative z-10">
          <ReferenceBuildNotice />
        </section>
      )}
```

In `src/app/work/[slug]/opengraph-image.js`, replace
`eyebrow: study.demo ? \`Reference Build · ${study.industry}\` : \`Client Work · ${study.industry}\`,`
with
`eyebrow: \`Client Work · ${study.industry}\`,`

In `src/lib/schema.js`, replace the whole doc comment above `generateCaseStudySchema` and the function itself with:

```js
/**
 * A client case study. A record with a `publishedAt` date becomes `Article`
 * and is eligible for article rich results. An undated record falls back to
 * `CreativeWork`, because a fabricated date is worse than no date.
 */
export const generateCaseStudySchema = (study) => {
  const published = study.publishedAt
    ? new Date(study.publishedAt).toISOString()
    : null;

  return {
    "@context": "https://schema.org",
    "@type": published ? "Article" : "CreativeWork",
    ...(published && { datePublished: published, dateModified: published }),
    headline: `Engineering the ${study.title}`,
    name: `Engineering the ${study.title}`,
    description: study.shortDescription,
    ...(study.industry && { about: study.industry }),
    ...(published && study.industry && { articleSection: study.industry }),
    image: study.heroImage ? [study.heroImage] : undefined,
    author: { "@id": `${BASE_URL}/#organization` },
    publisher: PUBLISHER,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/work/${study.slug}`,
    },
  };
};
```

Delete the notice component:

```bash
git rm src/components/sections/case-study/ReferenceBuildNotice.jsx
```

- [ ] **Step 5: Confirm nothing else reads `demo` on a study**

Run: `grep -rn "study\.demo\|\.demo &&\|ReferenceBuildNotice" src`
Expected: no output.

- [ ] **Step 6: Run tests and lint**

Run: `npm test && npm run lint`
Expected: all tests pass; lint reports no errors.

- [ ] **Step 7: Commit**

```bash
git add -A src/data/caseStudies.js src/app/work src/lib/schema.js src/components/sections/case-study test/case-studies.test.mjs
git commit -m "refactor: treat every case study as client work and tag the kits used

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Brand entity, promises and kit schema

**Files:**
- Modify: `src/lib/constants.js` (`BRAND.description`, `BRAND.definition`, `BRAND_TOPICS`; add `PROMISES`)
- Modify: `src/lib/schema.js` (imports, `hasOfferCatalog`, new `generateKitSchema`)
- Test: `test/schema.test.mjs`

**Interfaces:**
- Consumes: `KITS` (Task 3), `PLANS` (Task 3).
- Produces:
  - `PROMISES: {icon, title, detail, usual}[]` (six) from `@/lib/constants`
  - `generateKitSchema(kit) => object`: a `Service` node with `offers.priceSpecification` in USD and INR
  - `kitUrl(kit) => string`: `https://logixloops.in/kits/<slug>`
  - The Organization node's `hasOfferCatalog` named `"Advantage Kits"`, listing every kit and plan.

- [ ] **Step 1: Write the failing test**

Create `test/schema.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { generateKitSchema, generateOrganizationSchema } from "@/lib/schema";
import { BRAND, PROMISES } from "@/lib/constants";
import { KITS, getKitBySlug } from "@/data/kits";
import { PLANS } from "@/data/plans";

const ENTITY =
  "LogixLoops is a brand, technology and growth studio based in Jaipur, India. It sells fixed-scope Advantage Kits with published starting prices for websites, apps, branding, SEO and AI search visibility, and AI automation, for businesses in India, the US, the UK and the UAE.";

const catalog = () => generateOrganizationSchema().hasOfferCatalog;

test("the entity definition is the one in the spec", () => {
  assert.equal(BRAND.definition, ENTITY);
  assert.equal(generateOrganizationSchema().description, ENTITY);
});

test("the offer catalogue lists every kit and plan", () => {
  assert.equal(catalog().name, "Advantage Kits");
  assert.equal(catalog().itemListElement.length, KITS.length + PLANS.length);
});

test("kit offers carry their page URL and a from-price in both currencies", () => {
  const mvp = catalog().itemListElement.find((offer) => offer.itemOffered.name === "MVP Kit");
  assert.equal(mvp.url, "https://logixloops.in/kits/mvp");
  assert.deepEqual(
    mvp.priceSpecification.map((spec) => [spec.priceCurrency, spec.minPrice]),
    [["USD", 8000], ["INR", 400000]]
  );
});

test("plan offers are marked as monthly", () => {
  const squad = catalog().itemListElement.find((offer) => offer.itemOffered.name === "Pit Crew Squad plan");
  for (const spec of squad.priceSpecification) {
    assert.equal(spec["@type"], "UnitPriceSpecification");
    assert.equal(spec.unitText, "MONTH");
  }
});

test("a kit's Service node points at its page and carries its price", () => {
  const node = generateKitSchema(getKitBySlug("whatsapp-ai"));
  assert.equal(node["@type"], "Service");
  assert.equal(node.url, "https://logixloops.in/kits/whatsapp-ai");
  assert.equal(node.provider["@id"], "https://logixloops.in/#organization");
  assert.equal(node.offers.priceSpecification[0].minPrice, 1200);
});

test("knowsAbout covers the new lines", () => {
  const topics = generateOrganizationSchema().knowsAbout;
  for (const topic of ["Brand identity design", "Generative engine optimisation", "WhatsApp Business automation", "Website maintenance"]) {
    assert.ok(topics.includes(topic), topic);
  }
});

test("six promises, each with the usual-agency contrast", () => {
  assert.equal(PROMISES.length, 6);
  for (const promise of PROMISES) assert.ok(promise.icon && promise.title && promise.detail && promise.usual, promise.title);
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test`
Expected: FAIL. `generateKitSchema` is not exported and the definition differs.

- [ ] **Step 3: Update the brand constants**

In `src/lib/constants.js`, inside `BRAND`, replace the `description` and `definition` values:

```js
  description:
    "A brand, tech and growth studio in Jaipur. Websites, apps, branding, SEO and AI visibility, and AI automation, sold as kits with published prices.",
  // One-sentence entity definition. Used in schema and in llms.txt, so it is
  // written to be quoted verbatim by an answer engine. Must match
  // docs/brand-voice-and-search.md word for word.
  definition:
    "LogixLoops is a brand, technology and growth studio based in Jaipur, India. It sells fixed-scope Advantage Kits with published starting prices for websites, apps, branding, SEO and AI search visibility, and AI automation, for businesses in India, the US, the UK and the UAE.",
```

Replace the `BRAND_TOPICS` array:

```js
export const BRAND_TOPICS = [
  "Web development",
  "Website design",
  "Mobile app development",
  "Ecommerce development",
  "MVP development",
  "Brand identity design",
  "Logo design",
  "Website redesign",
  "Website speed optimisation",
  "Search engine optimisation",
  "Generative engine optimisation",
  "AI search visibility",
  "WhatsApp Business automation",
  "AI chatbots",
  "AI agents",
  "Workflow automation",
  "Website maintenance",
  "Next.js development",
  "React Native development",
];
```

Add after `BRAND_TOPICS`:

```js
/* ─── The six promises ───
 * Every kit carries all six. Each one is the opposite of a common agency
 * habit, which is what `usual` records: the home page sets the two side by
 * side, and kit pages show the promise alone. */
export const PROMISES = [
  {
    icon: "sell",
    title: "Price on the box",
    detail: "Every kit has a published starting price, a fixed scope and a timeline.",
    usual: "Prices hidden behind a quote request",
  },
  {
    icon: "hub",
    title: "One studio",
    detail: "Brand, tech and growth on one team, in one thread.",
    usual: "Three vendors who blame each other",
  },
  {
    icon: "all_inclusive",
    title: "The Loop",
    detail: "For 30 days after launch we measure, fix and tune with real data.",
    usual: "Ship the project and disappear",
  },
  {
    icon: "travel_explore",
    title: "Built to be found",
    detail: "Every build ships ready for Google and AI search.",
    usual: "A good-looking site nobody finds",
  },
  {
    icon: "key",
    title: "Yours from day one",
    detail: "Domain, code, designs and accounts are created in your name.",
    usual: "Your domain and code held in the agency's name",
  },
  {
    icon: "forum",
    title: "Talk to the builders",
    detail: "The people on the call are the people doing the work.",
    usual: "A senior pitch, then a junior team",
  },
];
```

- [ ] **Step 4: Add kit schema and the kit catalogue**

In `src/lib/schema.js`, change the constants import (line 7) from
`import { BRAND, BRAND_TOPICS, SERVICES } from "./constants";`
to:

```js
import { BRAND, BRAND_TOPICS } from "./constants";
import { KITS } from "@/data/kits";
import { PLANS } from "@/data/plans";
```

Directly after the `BASE_URL` constant, add:

```js
const ORG_REF = { "@id": `${BASE_URL}/#organization` };

/**
 * A "from" price in both currencies. Monthly prices say so through
 * `unitText`, so an assistant never reads $150 a month as $150 once.
 */
const priceSpecification = (price) =>
  [
    ["USD", price.usd],
    ["INR", price.inr],
  ].map(([priceCurrency, minPrice]) => ({
    "@type": price.per === "month" ? "UnitPriceSpecification" : "PriceSpecification",
    priceCurrency,
    minPrice,
    ...(price.per === "month" && { unitText: "MONTH" }),
  }));

const offer = ({ name, description, url, price }) => ({
  "@type": "Offer",
  url,
  priceSpecification: priceSpecification(price),
  itemOffered: { "@type": "Service", name, description, url, provider: ORG_REF },
});

export const kitUrl = (kit) => `${BASE_URL}/kits/${kit.slug}`;
```

In `generateOrganizationSchema`, replace the `hasOfferCatalog` property and its comment with:

```js
    // Every kit and plan as an offer with its price. This is the node an
    // assistant enumerates when asked what LogixLoops sells and for how much,
    // and it can answer without crawling a single kit page.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Advantage Kits",
      itemListElement: [
        ...KITS.map((kit) =>
          offer({ name: kit.name, description: kit.summary, url: kitUrl(kit), price: kit.price })
        ),
        ...PLANS.map((plan) =>
          offer({
            name: `Pit Crew ${plan.name} plan`,
            description: plan.summary,
            url: `${BASE_URL}/services/maintenance-and-support`,
            price: plan.price,
          })
        ),
      ],
    },
```

After `generateServiceSchema`, add:

```js
/**
 * One kit as a `Service` with its starting price. The page also emits HowTo
 * (the steps) and FAQPage, built from the same record.
 */
export const generateKitSchema = (kit) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: kit.name,
  description: kit.summary,
  serviceType: kit.keyword,
  url: kitUrl(kit),
  provider: ORG_REF,
  areaServed: BRAND.servesMarkets.map((name) => ({ "@type": "Country", name })),
  offers: {
    "@type": "Offer",
    url: kitUrl(kit),
    priceSpecification: priceSpecification(kit.price),
  },
});
```

- [ ] **Step 5: Run tests and lint**

Run: `npm test && npm run lint`
Expected: all tests pass, no lint errors.

- [ ] **Step 6: Commit**

```bash
git add src/lib/constants.js src/lib/schema.js test/schema.test.mjs
git commit -m "feat: new entity definition, six promises and priced kit schema

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Line pages and redirects

Rebuilds `/services/[slug]` on the six lines, redirects the eight retired practice URLs and removes the old services data. Also adds the shared section components that kit pages reuse in Task 9.

**Files:**
- Create: `src/components/sections/kits/KitCard.jsx`, `PlanCard.jsx`, `PromiseStrip.jsx`, `StudioCta.jsx`, `UnderTheHood.jsx`, `LineHero.jsx`
- Modify: `src/components/ui/Breadcrumbs.jsx`
- Modify: `src/components/sections/service-master/ServiceMasterSignature.jsx`, `ServiceMasterProblems.jsx`, `ServiceMasterFAQ.jsx`, `ServiceMasterRelatedWork.jsx`
- Replace: `src/app/services/[slug]/page.js`, `src/app/services/[slug]/opengraph-image.js`
- Modify: `next.config.mjs`
- Create: `scripts/smoke.mjs`
- Delete: `src/data/services.js` and eight `ServiceMaster*` components (listed in Step 9)
- Test: `test/redirects.test.mjs`

**Interfaces:**
- Consumes: `LINES`, `getAllLines`, `getLineBySlug` (Task 4); `getKitsByLine` (Task 3); `getAllPlans` (Task 3); `cheapest`, `formatPrice` (Task 2); `PROMISES` (Task 6); case study `kits` (Task 5).
- Produces (used by Tasks 9 and 10):
  - `<KitCard kit color />`, `<PlanCard plan />`, `<PromiseStrip />`
  - `<StudioCta heading body primary={{href, label}} secondary?={{href, label}} />`
  - `<UnderTheHood points demo? />`
  - `<Breadcrumbs current? />`: `current` overrides the label of the last crumb
  - `<ServiceMasterSignature demo />`: `demo` is a component name such as `"ViewportDemo"`
  - `<ServiceMasterProblems problems color overline? title? description? />`
  - `<ServiceMasterFAQ faqs color title? description? />`
  - `<ServiceMasterRelatedWork color studies? overline? title? description? />`
  - `scripts/smoke.mjs` with a `CHECKS` array that later tasks extend.

- [ ] **Step 1: Write the failing redirect test**

Create `test/redirects.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import nextConfig from "../next.config.mjs";
import { LINES } from "@/data/lines";
import { KITS } from "@/data/kits";

export const RETIRED = {
  "web-development": "web-and-app-development",
  "mobile-apps": "web-and-app-development",
  "saas-platforms": "web-and-app-development",
  "enterprise-software": "web-and-app-development",
  "cloud-devops": "web-and-app-development",
  "ui-ux-design": "website-redesign",
  "ai-ml-solutions": "ai-automation",
  "automation-systems": "ai-automation",
};

test("every retired practice URL redirects permanently to its line", async () => {
  const redirects = await nextConfig.redirects();
  for (const [old, line] of Object.entries(RETIRED)) {
    const rule = redirects.find((r) => r.source === `/services/${old}`);
    assert.ok(rule, `no redirect for ${old}`);
    assert.equal(rule.destination, `/services/${line}`);
    assert.equal(rule.permanent, true);
    assert.ok(LINES.some((l) => l.slug === line), `${line} is not a live line`);
  }
});

test("no redirect shadows a live line or kit page", async () => {
  const sources = new Set((await nextConfig.redirects()).map((r) => r.source));
  for (const line of LINES) assert.ok(!sources.has(`/services/${line.slug}`), line.slug);
  for (const kit of KITS) assert.ok(!sources.has(`/kits/${kit.slug}`), kit.slug);
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test`
Expected: FAIL, `no redirect for web-development`.

- [ ] **Step 3: Add the redirects**

In `next.config.mjs`, inside `redirects()`, add after the existing `/careers` rule:

```js
      // The eight practice pages became six lines on 2026-10-13. Each old URL
      // lands on the line that now owns its work, so rankings and inbound
      // links carry over. See docs/superpowers/specs/ for the mapping.
      ...Object.entries({
        "web-development": "web-and-app-development",
        "mobile-apps": "web-and-app-development",
        "saas-platforms": "web-and-app-development",
        "enterprise-software": "web-and-app-development",
        "cloud-devops": "web-and-app-development",
        "ui-ux-design": "website-redesign",
        "ai-ml-solutions": "ai-automation",
        "automation-systems": "ai-automation",
      }).map(([from, to]) => ({
        source: `/services/${from}`,
        destination: `/services/${to}`,
        permanent: true,
      })),
```

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 4: Adapt the shared pieces**

`src/components/ui/Breadcrumbs.jsx`: change the signature to `export default function Breadcrumbs({ current } = {}) {` and, inside the `pathSegments.map`, right after `formattedSegment` is computed, add:

```js
          // Slugs make poor labels ("Seo And Ai Search"), so a page can name
          // its own last crumb.
          const label = isLast && current ? current : formattedSegment;
```

Then render `{label}` instead of `{formattedSegment}` in both the `<span>` and the `<Link>` branches.

`src/components/sections/service-master/ServiceMasterSignature.jsx`: rename the eight keys of `DEMOS` to the component names, leaving titles and descriptions as they are:

| Old key | New key |
|---|---|
| `"mobile-apps"` | `PhoneScrollDemo` |
| `"web-development"` | `ViewportDemo` |
| `"ai-ml-solutions"` | `InferenceDemo` |
| `"cloud-devops"` | `PipelineDemo` |
| `"enterprise-software"` | `ArchitectureDemo` |
| `"saas-platforms"` | `TenantDemo` |
| `"automation-systems"` | `WorkflowDemo` |
| `"ui-ux-design"` | `TokensDemo` |

Change the comment above `DEMOS` to:

```js
/**
 * Hands-on demos, keyed by component name. Kits name the one that shows what
 * they build (`kit.demo`), and it renders under "Under the hood".
 */
```

and the component head to:

```js
export default function ServiceMasterSignature({ demo: key }) {
  const demo = DEMOS[key];
  if (!demo) return null;
```

`ServiceMasterProblems.jsx`: change the signature and the `SectionHeader` props:

```jsx
export default function ServiceMasterProblems({
  problems,
  color,
  overline = "The problem",
  title = "What this fixes",
  description = "The situations people usually bring to us.",
}) {
```

```jsx
        <SectionHeader overline={overline} title={title} description={description} />
```

`ServiceMasterFAQ.jsx`: change the signature and the `SectionHeader` props, and drop the old comment about the h2:

```jsx
export default function ServiceMasterFAQ({
  faqs,
  color,
  title = "Before you start",
  description = "Short answers to what people ask before they start. Anything else, ask us on the call.",
}) {
```

```jsx
        <SectionHeader overline="Questions" title={title} description={description} />
```

`ServiceMasterRelatedWork.jsx`: replace the doc comment, signature and header copy:

```jsx
/**
 * Client work as server-rendered links, so the crawler follows them from
 * every line and kit page. Pass `studies` to show only the relevant ones.
 */
export default function ServiceMasterRelatedWork({
  color,
  studies = getAllCaseStudies(),
  overline = "Proof",
  title = "Client work",
  description = "Live projects for real clients: what we built, and why.",
}) {
  if (!studies.length) return null;
```

Remove the old `const studies = getAllCaseStudies();` and `if (!studies.length) return null;` lines, and render `{overline}`, `{title}` and `{description}` in place of `Selected Work`, `Engagements behind this practice` and the old paragraph.

- [ ] **Step 5: Create the shared kit components**

`src/components/sections/kits/KitCard.jsx`:

```jsx
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/pricing";
import { accent } from "@/components/sections/service-master/tokens";

/**
 * A kit as a card. The whole card links to the kit, and the price is what a
 * reader compares across cards, so it takes `level-gauge` (a quantity).
 */
export default function KitCard({ kit, color }) {
  const a = accent(color);

  return (
    <Link
      href={`/kits/${kit.slug}`}
      className="level-gauge group flex h-full flex-col rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/85 p-6 md:p-8 transition-colors duration-300 hover:border-primary/30"
    >
      <h3 className="font-display text-xl text-on-surface mb-2">{kit.name}</h3>
      <p className="font-body text-body-md text-on-surface-variant mb-6 flex-1 first-letter:uppercase">
        {kit.promise}
      </p>
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-outline-variant/30 pt-4">
        <span className={cn("font-display text-lg font-semibold", a.text)}>
          From {formatPrice(kit.price)}
        </span>
        <span className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
          {kit.timeline}
        </span>
      </div>
    </Link>
  );
}
```

`src/components/sections/kits/PlanCard.jsx`:

```jsx
import { Button } from "@/components/ui";
import { formatPrice } from "@/lib/pricing";

/** A Pit Crew plan. A monthly price is a quantity, so `level-gauge`. */
export default function PlanCard({ plan }) {
  return (
    <div className="level-gauge flex h-full flex-col rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/85 p-6 md:p-8">
      <h3 className="font-display text-xl text-on-surface mb-1">{plan.name}</h3>
      <p className="font-display text-lg font-semibold text-primary mb-3">From {formatPrice(plan.price)}</p>
      <p className="font-body text-body-md text-on-surface-variant mb-6">{plan.summary}</p>
      <ul className="mb-6 flex flex-1 flex-col gap-3">
        {plan.includes.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[18px] mt-0.5 text-primary" aria-hidden="true">
              check
            </span>
            <span className="font-body text-body-sm text-on-surface">{item}</span>
          </li>
        ))}
      </ul>
      <p className="border-t border-outline-variant/30 pt-4 mb-4 font-body text-body-sm text-on-surface-variant">
        {plan.terms}
      </p>
      <Button href={`/contact?plan=${plan.slug}`} variant="outline" className="w-full justify-center">
        Start {plan.name}
      </Button>
    </div>
  );
}
```

`src/components/sections/kits/PromiseStrip.jsx`:

```jsx
import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { PROMISES } from "@/lib/constants";
import { SECTION } from "@/components/sections/service-master/tokens";

/**
 * The six promises every kit carries. Each card is a declaration, so it
 * takes `rule-draw`; `overflow-hidden` keeps the drawn rule inside the
 * rounded corners.
 */
export default function PromiseStrip() {
  return (
    <section className={SECTION}>
      <FadeInUp>
        <SectionHeader
          overline="Every kit, every time"
          title="Six things you can hold us to"
          description="These come with every kit, whatever it costs."
        />
      </FadeInUp>
      <StaggerContainer className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
        {PROMISES.map((promise) => (
          <StaggerItem key={promise.title}>
            <div className="rule-draw h-full overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/85 p-6 md:p-8">
              <span className="material-symbols-outlined mb-4 block text-[28px] text-primary" aria-hidden="true">
                {promise.icon}
              </span>
              <h3 className="font-display text-xl text-on-surface mb-2">{promise.title}</h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">{promise.detail}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
```

`src/components/sections/kits/StudioCta.jsx`:

```jsx
import { Button } from "@/components/ui";
import { FadeInUp } from "@/components/motion";

/**
 * The closing call to action on line and kit pages. It sends you somewhere,
 * so it takes `dispatch`: the rail draws down the left edge and the primary
 * label nudges forward on hover.
 */
export default function StudioCta({ heading, body, primary, secondary }) {
  return (
    <section className="py-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto mb-stack-xl">
      <FadeInUp>
        <div className="dispatch relative flex flex-col items-center rounded-3xl border border-outline-variant/30 bg-surface-container-lowest/85 p-8 text-center shadow-glass sm:p-12 md:p-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-fox-knockout.svg"
            alt=""
            aria-hidden="true"
            width={948}
            height={746}
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute -left-16 -bottom-12 h-[130%] w-auto max-w-none opacity-[0.05] select-none"
          />
          <h2 className="relative mb-6 max-w-3xl font-display text-headline-lg-mobile md:text-display-lg text-on-surface tracking-tight text-balance">
            {heading}
          </h2>
          <p className="relative mb-10 max-w-2xl font-body text-body-lg text-on-surface-variant leading-relaxed">
            {body}
          </p>
          <div className="relative flex flex-col gap-4 sm:flex-row">
            <Button href={primary.href} size="lg" icon="arrow_forward" iconPosition="right">
              <span data-dispatch>{primary.label}</span>
            </Button>
            {secondary && (
              <Button href={secondary.href} variant="ghost" size="lg">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </FadeInUp>
    </section>
  );
}
```

`src/components/sections/kits/UnderTheHood.jsx`:

```jsx
import Link from "next/link";
import ServiceMasterSignature from "@/components/sections/service-master/ServiceMasterSignature";
import { SECTION } from "@/components/sections/service-master/tokens";

/**
 * The technical half of a line or kit page, closed by default so the plain
 * half stays the page. It is literally a denser layer underneath, so the
 * panel takes `cipher-lens`. A kit's hands-on demo renders after it.
 */
export default function UnderTheHood({ points, demo }) {
  if (!points?.length) return null;

  return (
    <>
      <section className={SECTION}>
        <details className="cipher-lens group rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/85 p-6 md:p-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
            <h2 className="font-display text-headline-md text-on-surface">
              Under the hood
              <span className="mt-1 block font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
                For technical readers
              </span>
            </h2>
            <span
              className="material-symbols-outlined text-on-surface-variant transition-transform duration-300 group-open:rotate-180"
              aria-hidden="true"
            >
              expand_more
            </span>
          </summary>
          <ul className="mt-6 flex flex-col gap-3">
            {points.map((point) => (
              <li key={point} className="flex gap-3 font-body text-body-md text-on-surface-variant">
                <span className="font-mono text-primary" aria-hidden="true">
                  ›
                </span>
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-body text-body-sm text-on-surface-variant">
            More on <Link href="/technology" className="text-primary underline-offset-4 hover:underline">the stack we build on</Link>{" "}
            and <Link href="/security" className="text-primary underline-offset-4 hover:underline">how we handle security</Link>.
          </p>
        </details>
      </section>
      {demo && <ServiceMasterSignature demo={demo} />}
    </>
  );
}
```

`src/components/sections/kits/LineHero.jsx`:

```jsx
import { FadeInUpImmediate } from "@/components/motion";
import { Button } from "@/components/ui";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";
import { accent } from "@/components/sections/service-master/tokens";

/**
 * Compact detail-route hero for a line. The H1 is the plain label, because
 * that is what people search for; the memorable name sits in the chip above
 * it, so the two are never apart.
 */
export default function LineHero({ line, fromLabel }) {
  const a = accent(line.color);

  return (
    <section className="relative px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto pt-[120px] pb-stack-lg">
      <div className="grid w-full grid-cols-1 items-center gap-gutter lg:grid-cols-12">
        <FadeInUpImmediate className="lg:col-span-7">
          <Breadcrumbs current={line.label} />
          <span className="mt-4 mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-lowest/85 px-3 py-1.5">
            <span className={cn("material-symbols-outlined text-[16px]", a.text)} aria-hidden="true">
              {line.icon}
            </span>
            <span className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
              {line.name}
            </span>
          </span>
          <h1 className="mb-4 font-display text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight leading-[1.05] text-balance">
            {line.label}
          </h1>
          <p className={cn("mb-6 font-display text-headline-lg-mobile md:text-headline-md text-transparent bg-clip-text bg-gradient-to-r", a.gradient)}>
            {line.pitch}
          </p>
          <p className="mb-6 max-w-2xl font-body text-body-lg text-on-surface-variant leading-relaxed">{line.summary}</p>
          <p className="mb-8 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">{fromLabel}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href={`/contact?line=${line.slug}`} size="lg" icon="arrow_forward" iconPosition="right">
              Start a project
            </Button>
            <Button href="/kits" variant="ghost" size="lg">
              See every kit
            </Button>
          </div>
        </FadeInUpImmediate>
        <div className="relative hidden aspect-square items-center justify-center rounded-3xl border border-outline-variant/30 bg-surface-container-lowest/85 lg:col-span-5 lg:flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={line.art} alt="" width={64} height={64} className="h-auto w-[46%] select-none" draggable={false} />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Replace the line page**

Replace `src/app/services/[slug]/page.js` entirely:

```jsx
import { notFound } from "next/navigation";
import { getAllLines, getLineBySlug } from "@/data/lines";
import { getKitsByLine } from "@/data/kits";
import { getAllPlans } from "@/data/plans";
import { getAllCaseStudies } from "@/data/caseStudies";
import { cheapest, formatPrice } from "@/lib/pricing";
import { SectionHeader } from "@/components/ui";
import LineHero from "@/components/sections/kits/LineHero";
import KitCard from "@/components/sections/kits/KitCard";
import PlanCard from "@/components/sections/kits/PlanCard";
import UnderTheHood from "@/components/sections/kits/UnderTheHood";
import PromiseStrip from "@/components/sections/kits/PromiseStrip";
import StudioCta from "@/components/sections/kits/StudioCta";
import ServiceMasterProblems from "@/components/sections/service-master/ServiceMasterProblems";
import ServiceMasterRelatedWork from "@/components/sections/service-master/ServiceMasterRelatedWork";
import ServiceMasterFAQ from "@/components/sections/service-master/ServiceMasterFAQ";
import { SECTION } from "@/components/sections/service-master/tokens";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import {
  generateBreadcrumbSchema,
  generateFaqSchema,
  generateItemListSchema,
  generateServiceSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

/* Pit Crew sells monthly plans rather than kits. */
const PLANS_LINE = "maintenance-and-support";

// Every line is known at build time. Anything else is a 404, not a render.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllLines().map((line) => ({ slug: line.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const line = getLineBySlug(slug);
  if (!line) return {};

  return buildMetadata({
    title: line.metaTitle,
    description: line.metaDescription,
    path: `/services/${line.slug}`,
    keywords: line.keywords,
  });
}

export default async function LinePage({ params }) {
  const { slug } = await params;
  const line = getLineBySlug(slug);
  if (!line) notFound();

  const isPlans = line.slug === PLANS_LINE;
  const offers = isPlans ? getAllPlans() : getKitsByLine(line.slug);
  const fromLabel = `${isPlans ? "Plans" : "Kits"} from ${formatPrice(cheapest(offers).price)}`;
  const offerSlugs = new Set(offers.map((offer) => offer.slug));
  const studies = isPlans
    ? []
    : getAllCaseStudies().filter((study) => study.kits.some((kit) => offerSlugs.has(kit)));

  return (
    <main className="relative z-10 overflow-x-clip">
      <SchemaMarkup
        schema={generateServiceSchema({
          title: line.label,
          shortDescription: line.summary,
          slug: line.slug,
          serviceType: line.label,
        })}
      />
      {!isPlans && (
        <SchemaMarkup
          schema={generateItemListSchema({
            name: `${line.name}: ${line.label} kits`,
            items: offers.map((kit) => ({ name: kit.name, description: kit.summary, path: `/kits/${kit.slug}` })),
          })}
        />
      )}
      <SchemaMarkup schema={generateFaqSchema(line.faqs.map((faq) => ({ question: faq.q, answer: faq.a })))} />
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Services", path: "/services" },
          { label: line.label, path: `/services/${line.slug}` },
        ])}
      />

      <LineHero line={line} fromLabel={fromLabel} />
      <ServiceMasterProblems problems={line.problems} color={line.color} />

      <section className={SECTION}>
        <SectionHeader
          overline={isPlans ? `${line.name} plans` : `${line.name} kits`}
          title={isPlans ? "Pick a plan" : "Pick a kit"}
          description={
            isPlans
              ? "Every plan is monthly and priced up front."
              : "A fixed scope, a timeline and a starting price on every one."
          }
        />
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
          {isPlans
            ? offers.map((plan) => <PlanCard key={plan.slug} plan={plan} />)
            : offers.map((kit) => <KitCard key={kit.slug} kit={kit} color={line.color} />)}
        </div>
      </section>

      {studies.length > 0 && (
        <ServiceMasterRelatedWork studies={studies} color={line.color} title="Work built with these kits" />
      )}
      <UnderTheHood points={line.underTheHood} />
      <ServiceMasterFAQ faqs={line.faqs} color={line.color} />
      <PromiseStrip />
      <StudioCta
        heading={`Start with ${line.name}`}
        body={line.pitch}
        primary={{ href: `/contact?line=${line.slug}`, label: "Start a project" }}
        secondary={{ href: "/kits", label: "See every kit" }}
      />
    </main>
  );
}
```

Replace `src/app/services/[slug]/opengraph-image.js` entirely:

```js
import { ogCard, clampSubtitle, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { LINES } from "@/data/lines";

// `alt` is a static export, so it cannot carry the line name. The card does.
export const alt = "A LogixLoops service line.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return LINES.map((line) => ({ slug: line.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const line = LINES.find((entry) => entry.slug === slug);

  // The route 404s on an unknown slug before this runs, but the image handler
  // is a separate entry point and has to stand on its own.
  if (!line) {
    return ogCard({
      eyebrow: "Services",
      title: "Brand, build and growth.",
      subtitle: "Web and app development, branding, redesign, SEO and AI visibility, AI automation and maintenance.",
    });
  }

  return ogCard({
    eyebrow: `${line.name} · Services`,
    title: line.label,
    subtitle: clampSubtitle(line.pitch),
  });
}
```

- [ ] **Step 7: Create the smoke script**

Create `scripts/smoke.mjs`:

```js
/**
 * Post-build smoke checks. Run against a production server:
 *
 *   npm run build
 *   npx next start -p 3100
 *   node scripts/smoke.mjs http://localhost:3100
 *
 * Redirects are not followed, so a check can assert on the 308 itself.
 * React splits adjacent text nodes with comments in server HTML, so checks
 * match whole values ("$1,500 · ₹60,000"), never "From $1,500".
 */
const base = process.argv[2] || "http://localhost:3000";

const CHECKS = [
  // Line pages
  { path: "/services/web-and-app-development", status: 200, includes: ["Engine", "Business Website Kit", "$1,500 · ₹60,000", "Work built with these kits", '"@type":"Service"'] },
  { path: "/services/branding", status: 200, includes: ["Spark", "Brand Identity Kit"], excludes: ["Work built with these kits"] },
  { path: "/services/maintenance-and-support", status: 200, includes: ["Pit Crew", "Essentials", "$150/mo · ₹6,000/mo"] },
  { path: "/services/ai-automation", status: 200, includes: ["Autopilot", "WhatsApp AI Kit", "Under the hood"] },
  { path: "/services/not-a-line", status: 404 },
  // Retired practice URLs
  { path: "/services/web-development", status: 308, location: "/services/web-and-app-development" },
  { path: "/services/ui-ux-design", status: 308, location: "/services/website-redesign" },
  { path: "/services/ai-ml-solutions", status: 308, location: "/services/ai-automation" },
  { path: "/services/web-development?ref=nav", status: 308, location: "/services/web-and-app-development?ref=nav" },
];

let failed = 0;
for (const check of CHECKS) {
  const res = await fetch(base + check.path, { redirect: "manual" });
  const problems = [];
  if (res.status !== check.status) problems.push(`status ${res.status}, expected ${check.status}`);
  if (check.location) {
    const location = res.headers.get("location") || "";
    if (!location.endsWith(check.location)) problems.push(`location "${location}"`);
  }
  if (check.includes || check.excludes) {
    const html = await res.text();
    for (const text of check.includes ?? []) if (!html.includes(text)) problems.push(`missing "${text}"`);
    for (const text of check.excludes ?? []) if (html.includes(text)) problems.push(`unexpected "${text}"`);
  }
  console.log(`${problems.length ? "FAIL" : "ok  "} ${check.path}${problems.length ? `: ${problems.join("; ")}` : ""}`);
  if (problems.length) failed += 1;
}
process.exit(failed ? 1 : 0);
```

- [ ] **Step 8: Find what else still reads the old services data**

Run: `grep -rln "@/data/services\|ServiceMaster\(Hero\|Capabilities\|Tech\|Process\|Solutions\|Metrics\|CaseStudy\|CTA\)" src`
Expected: only the eight `ServiceMaster*` files themselves. If any other file is listed, update it to the new components before deleting.

- [ ] **Step 9: Delete the retired data and components**

```bash
git rm src/data/services.js \
  src/components/sections/service-master/ServiceMasterHero.jsx \
  src/components/sections/service-master/ServiceMasterCapabilities.jsx \
  src/components/sections/service-master/ServiceMasterTech.jsx \
  src/components/sections/service-master/ServiceMasterProcess.jsx \
  src/components/sections/service-master/ServiceMasterSolutions.jsx \
  src/components/sections/service-master/ServiceMasterMetrics.jsx \
  src/components/sections/service-master/ServiceMasterCaseStudy.jsx \
  src/components/sections/service-master/ServiceMasterCTA.jsx
```

- [ ] **Step 10: Test, lint, build and smoke-check**

Run: `npm test && npm run lint && npm run build`
Expected: tests pass, lint clean, build succeeds and lists `/services/[slug]` with the six line slugs.

Start the server in the background: `npx next start -p 3100`. Then run:
`node scripts/smoke.mjs http://localhost:3100`
Expected: every line prints `ok`. Stop the server afterwards.

- [ ] **Step 11: Commit**

```bash
git add -A next.config.mjs scripts/smoke.mjs test/redirects.test.mjs src/app/services/\[slug\] src/components/sections/kits src/components/sections/service-master src/components/ui/Breadcrumbs.jsx src/data
git commit -m "feat: rebuild service pages as six lines and redirect retired practices

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: Retire the SERVICES constant

The `/services` index, its grid, the 404 page, the home ItemList, the sitemap and the home "Capabilities" tiles all still read `SERVICES` or link to retired practices.

**Files:**
- Modify: `src/lib/constants.js` (delete `SERVICES`)
- Modify: `src/components/sections/services/ServicesInertiaGrid.jsx` (`TILES`, image `src`)
- Modify: `src/app/services/page.js`, `src/app/services/opengraph-image.js`
- Modify: `src/app/not-found.js`, `src/app/page.js`, `src/app/sitemap.js`
- Modify: `src/components/sections/home/FeaturedWorkSection.jsx` (`WORK_ITEMS`)
- Test: `test/sitemap.test.mjs`

**Interfaces:**
- Consumes: `LINES` (Task 4), `getKitsByLine`, `getAllPlans`, `cheapest`, `formatPrice`, `RETIRED` (exported by `test/redirects.test.mjs`, Task 7).
- Produces: no module exports `SERVICES`; the sitemap lists the six line URLs.

- [ ] **Step 1: Write the failing test**

Create `test/sitemap.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import sitemap from "@/app/sitemap";
import * as constants from "@/lib/constants";
import { LINES } from "@/data/lines";
import { RETIRED } from "./redirects.test.mjs";

const paths = () => sitemap().map((entry) => entry.url.replace("https://logixloops.in", ""));

test("the sitemap lists every line and no retired practice", () => {
  for (const line of LINES) assert.ok(paths().includes(`/services/${line.slug}`), line.slug);
  for (const old of Object.keys(RETIRED)) assert.ok(!paths().includes(`/services/${old}`), old);
});

test("the old SERVICES list is gone", () => {
  assert.equal("SERVICES" in constants, false);
});
```

Importing `RETIRED` from another test file also registers its tests in this run. That is harmless, because `node --test` runs each file in its own process.

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test`
Expected: FAIL, `web-and-app-development` is missing from the sitemap.

- [ ] **Step 3: Switch every consumer to LINES**

`src/lib/constants.js`: delete the `/* ─── Services Overview Data ─── */` comment and the whole `export const SERVICES = [...]` array.

`src/app/sitemap.js`: replace `import { SERVICES } from "@/lib/constants";` with `import { LINES } from "@/data/lines";`, and the service routes block with:

```js
  // Line pages
  const serviceRoutes = LINES.map((line) => ({
    url: `${baseUrl}/services/${line.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));
```

`src/app/page.js`: replace `import { SERVICES } from "@/lib/constants";` with `import { LINES } from "@/data/lines";`, and the ItemList schema with:

```jsx
      <SchemaMarkup
        schema={generateItemListSchema({
          name: "LogixLoops service lines",
          items: LINES.map((line) => ({
            name: line.label,
            description: line.summary,
            path: `/services/${line.slug}`,
          })),
        })}
      />
```

`src/app/not-found.js`: replace the `SERVICES` import with `import { LINES } from "@/data/lines";`, and the list body with:

```jsx
            {LINES.map((line) => (
              <li key={line.slug}>
                <Link
                  href={`/services/${line.slug}`}
                  className="font-body text-body-md text-on-surface-variant hover:text-primary transition-colors"
                >
                  {line.label}
                </Link>
              </li>
            ))}
```

`src/components/sections/services/ServicesInertiaGrid.jsx`: replace the `SERVICES` import and `TILES` with:

```js
import { LINES } from "@/data/lines";

/* 3x3: the six lines, then the kits, pricing and a closing call to action. */
const TILES = [
  ...LINES.map((line) => ({ key: line.slug, label: line.label, href: `/services/${line.slug}`, art: line.art })),
  { key: "kits", label: "All Advantage Kits", href: "/kits", art: "/services/saas-platforms.svg" },
  { key: "pricing", label: "Pricing", href: "/pricing", art: "/services/enterprise-software.svg" },
  { key: "start-a-project", label: "Start a Project", href: "/contact", art: "/services/start-a-project.svg" },
];
```

and change the tile image `src={\`/services/${tile.key}.svg\`}` to `src={tile.art}`.

`src/app/services/opengraph-image.js`: replace `alt` and the card:

```js
export const alt = "LogixLoops services: six lines, sold as kits with published prices.";
```

```js
  return ogCard({
    eyebrow: "Services",
    title: "Six lines. One studio.",
    subtitle:
      "Web and app development, branding, redesign, SEO and AI visibility, AI automation and maintenance, sold as kits.",
  });
```

`src/app/services/page.js`:
- Replace `import { SERVICES } from "@/lib/constants";` with:

```js
import { LINES } from "@/data/lines";
import { getKitsByLine } from "@/data/kits";
import { getAllPlans } from "@/data/plans";
import { cheapest, formatPrice } from "@/lib/pricing";

/* The cheapest way into a line, for the directory cards. */
const fromPrice = (line) => {
  const offers = getKitsByLine(line.slug);
  return formatPrice(cheapest(offers.length ? offers : getAllPlans()).price);
};
```

- Replace `SERVICES_DESCRIPTION` and the `metadata` call:

```js
const SERVICES_DESCRIPTION =
  "Web and app development, branding, website redesign, SEO and AI visibility, AI automation and maintenance, sold as kits with published prices.";

export const metadata = buildMetadata({
  title: "Services: Web, App, Branding, SEO and AI",
  description: SERVICES_DESCRIPTION,
  path: "/services",
  keywords: [
    "digital agency services",
    "web and app development company",
    "branding agency",
    "website redesign services",
    "SEO and AI search optimization",
    "AI automation agency",
    "website maintenance services",
  ],
});
```

- In the collection schema, change `name: "Engineering Services"` to `name: "LogixLoops services"` and its `items` to:

```js
          items: LINES.map((line) => ({
            name: line.label,
            description: line.summary,
            path: `/services/${line.slug}`,
          })),
```

- Replace the hero header text (eyebrow stays "Services"):

```jsx
            <h1 className="font-display text-display-lg-mobile md:text-display-xl text-on-surface tracking-tight leading-[1.05] mb-stack-sm">
              Six ways to get your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                unfair advantage.
              </span>
            </h1>
```

```jsx
            <p className="font-body text-body-lg text-on-surface-variant">
              Web and app development, branding, website redesign, SEO and AI search visibility, AI and automation, and maintenance plans. Each line is sold as kits with published prices. Scroll to bring the grid home, then pick the one closest to what you need.
            </p>
```

- Replace the directory heading and intro:

```jsx
            The six, in plain text
```

```jsx
            Each line links to its kits, with what is included and what it
            costs. Most businesses start with one kit and add another later.
```

- Replace the directory list body `{SERVICES.map((service) => ( ... ))}` with the same `<li>`/`<Link>` card structure, reading from `line`:

```jsx
          {LINES.map((line) => (
            <li key={line.slug}>
              <Link
                href={`/services/${line.slug}`}
                className="glow-sweep group flex flex-col h-full rounded-2xl border border-outline-variant/30 bg-white/75 p-6 shadow-glass transition-[transform,background-color,border-color] duration-300 ease-out hover:-translate-y-1 hover:bg-white/95 hover:border-primary/30 motion-reduce:transform-none"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5 transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                  <span className="material-symbols-outlined text-[22px]">{line.icon}</span>
                </span>
                <span className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant mb-1">
                  {line.name}
                </span>
                <h3 className="font-display text-headline-md text-on-surface mb-3 transition-colors duration-300 group-hover:text-primary">
                  {line.label}
                </h3>
                <p className="font-body text-body-sm text-on-surface-variant mb-5 flex-1">{line.pitch}</p>
                <span className="font-label text-[11px] uppercase tracking-widest text-primary">
                  From {fromPrice(line)}
                </span>
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-primary text-[18px] mt-5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none"
                >
                  arrow_forward
                </span>
              </Link>
            </li>
          ))}
```

- Change the grid wrapper class `xl:grid-cols-4` to `xl:grid-cols-3`, so six cards make two rows of three. Update the comment above the section that says "Four across, two deep" to "Three across, two deep".

`src/components/sections/home/FeaturedWorkSection.jsx`: in `WORK_ITEMS`, change the four entries' `id`, `title` and `href` (images unchanged):

| Old id | New `id` | New `title` | New `href` |
|---|---|---|---|
| `enterprise-software` | `engine` | `Web & App Development` | `/services/web-and-app-development` |
| `ai-ml` | `autopilot` | `AI & Automation` | `/services/ai-automation` |
| `cloud-devops` | `spotlight` | `SEO & AI Search` | `/services/seo-and-ai-search` |
| `ui-ux-design` | `spark` | `Branding & Identity` | `/services/branding` |

- [ ] **Step 4: Confirm nothing reads SERVICES or links to a retired practice**

Run: `grep -rnw "SERVICES" src` and `grep -rn "/services/\(web-development\|mobile-apps\|saas-platforms\|ai-ml-solutions\|automation-systems\|cloud-devops\|ui-ux-design\|enterprise-software\)" src --include=*.js --include=*.jsx | grep -v "signature/\|ServicesBento\|FeaturedSolutionsSection.jsx:28"`
Expected: no output from either. Doc comments in the signature demos and the not-yet-deleted `ServicesBento` (Task 12) may still mention old paths.

- [ ] **Step 5: Test, lint, build**

Run: `npm test && npm run lint && npm run build`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add -A src/lib/constants.js src/app src/components test/sitemap.test.mjs
git commit -m "refactor: read the six lines everywhere the eight services were listed

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 9: Kit pages

**Files:**
- Create: `src/components/sections/kits/KitHero.jsx`, `KitIncludes.jsx`, `KitFit.jsx`, `KitSteps.jsx`, `KitAddOns.jsx`
- Create: `src/app/kits/[slug]/page.js`, `src/app/kits/[slug]/opengraph-image.js`, `src/app/kits/[slug]/loading.js`
- Modify: `scripts/smoke.mjs` (`CHECKS`)

**Interfaces:**
- Consumes: `getAllKits`, `getKitBySlug` (Task 3); `getLineBySlug` (Task 4); `generateKitSchema` (Task 6); `generateHowToSchema`, `generateFaqSchema`, `generateBreadcrumbSchema` (existing); `UnderTheHood`, `PromiseStrip`, `StudioCta`, `ServiceMasterRelatedWork`, `ServiceMasterFAQ`, `Breadcrumbs current` (Task 7).
- Produces: `/kits/<slug>` for the 13 wave 1 kits.

- [ ] **Step 1: Add the failing smoke checks**

Append to the `CHECKS` array in `scripts/smoke.mjs`:

```js
  // Kit pages
  { path: "/kits/brand-identity", status: 200, includes: ["Brand Identity Kit", "$1,000 · ₹45,000", "2–3 weeks", "The Loop", "Under the hood", "Build a Design System", '"@type":"Service"', '"@type":"HowTo"', '"@type":"FAQPage"', '"priceCurrency":"INR"'] },
  { path: "/kits/business-website", status: 200, includes: ["Built with this kit", "Sire Media"] },
  { path: "/kits/mobile-app", status: 200, includes: ["Take the Signal Away"], excludes: ["Built with this kit"] },
  { path: "/kits/whatsapp-ai", status: 200, includes: ["Plus Meta&#x27;s message charges"] },
  { path: "/kits/not-a-kit", status: 404 },
```

React escapes `'` as `&#x27;` in server HTML, which is why the WhatsApp check is written that way.

- [ ] **Step 2: Build, run the smoke script, and confirm the kit checks fail**

Run: `npm run build`, start `npx next start -p 3100` in the background, then `node scripts/smoke.mjs http://localhost:3100`.
Expected: the line checks print `ok`; every `/kits/...` check prints `FAIL` with status 404. Stop the server.

- [ ] **Step 3: Create the kit section components**

`src/components/sections/kits/KitHero.jsx`:

```jsx
import Link from "next/link";
import { FadeInUpImmediate } from "@/components/motion";
import { Button } from "@/components/ui";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/pricing";
import { accent } from "@/components/sections/service-master/tokens";

/**
 * Compact detail-route hero. The H1 is the kit name and its plain promise,
 * the lead is the answer-first summary, and price and timeline sit in the
 * first screen because they are the first two things a buyer looks for.
 */
export default function KitHero({ kit, line }) {
  const a = accent(line.color);

  return (
    <section className="relative px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto pt-[120px] pb-stack-lg">
      <FadeInUpImmediate className="max-w-3xl">
        <Breadcrumbs current={kit.name} />
        <Link
          href={`/services/${line.slug}`}
          className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-lowest/85 px-3 py-1.5 transition-colors hover:border-primary/30"
        >
          <span className={cn("material-symbols-outlined text-[16px]", a.text)} aria-hidden="true">
            {line.icon}
          </span>
          <span className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
            {line.name} · {line.label}
          </span>
        </Link>
        <h1 className="mt-6 mb-6 font-display text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight leading-[1.05] text-balance">
          {kit.name}:{" "}
          <span className={cn("text-transparent bg-clip-text bg-gradient-to-r", a.gradient)}>{kit.promise}</span>
        </h1>
        <p className="mb-8 font-body text-body-lg text-on-surface-variant leading-relaxed">{kit.summary}</p>
        <dl className="mb-8 flex flex-wrap gap-3">
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest/85 px-4 py-3">
            <dt className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant">From</dt>
            <dd className={cn("font-display text-xl font-semibold", a.text)}>{formatPrice(kit.price)}</dd>
          </div>
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest/85 px-4 py-3">
            <dt className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant">Timeline</dt>
            <dd className="font-display text-xl font-semibold text-on-surface">{kit.timeline}</dd>
          </div>
        </dl>
        {kit.priceNote && (
          <p className="-mt-4 mb-8 font-body text-body-sm text-on-surface-variant">{kit.priceNote}.</p>
        )}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href={`/contact?kit=${kit.slug}`} size="lg" icon="arrow_forward" iconPosition="right">
            Start this kit
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Ask a question first
          </Button>
        </div>
      </FadeInUpImmediate>
    </section>
  );
}
```

`src/components/sections/kits/KitIncludes.jsx`:

```jsx
import { SectionHeader } from "@/components/ui";
import { FadeInUp } from "@/components/motion";
import { cn } from "@/lib/utils";
import { SECTION, accent } from "@/components/sections/service-master/tokens";

/** The deliverables, as a checklist. Read, not handled, so no hover. */
export default function KitIncludes({ items, color }) {
  const a = accent(color);

  return (
    <section className={SECTION}>
      <FadeInUp>
        <SectionHeader overline="What's in the kit" title="Everything included in the price" align="left" />
      </FadeInUp>
      <ul className="grid max-w-4xl grid-cols-1 gap-x-gutter gap-y-4 md:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className={cn("material-symbols-outlined text-[20px] mt-0.5", a.text)} aria-hidden="true">
              check_circle
            </span>
            <span className="font-body text-body-md text-on-surface">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

`src/components/sections/kits/KitFit.jsx`:

```jsx
import { cn } from "@/lib/utils";
import { SECTION, accent } from "@/components/sections/service-master/tokens";

function FitList({ title, items, icon, iconClass }) {
  return (
    <div>
      <h2 className="mb-6 font-display text-headline-md text-on-surface">{title}</h2>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className={cn("material-symbols-outlined text-[20px] mt-0.5", iconClass)} aria-hidden="true">
              {icon}
            </span>
            <span className="font-body text-body-md text-on-surface">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Who the kit is for, and who it is not for. The second list is the honest
 * one, and it points the reader at the kit that does fit.
 */
export default function KitFit({ fitFor, notFor, color }) {
  const a = accent(color);

  return (
    <section className={SECTION}>
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
        <FitList title="Right for you if" items={fitFor} icon="check_circle" iconClass={a.text} />
        <FitList title="Not the right kit if" items={notFor} icon="do_not_disturb_on" iconClass="text-on-surface-variant" />
      </div>
    </section>
  );
}
```

`src/components/sections/kits/KitSteps.jsx`:

```jsx
import { SectionHeader } from "@/components/ui";
import { FadeInUp } from "@/components/motion";
import { cn } from "@/lib/utils";
import { SECTION, accent, pad } from "@/components/sections/service-master/tokens";

/**
 * The kit's steps in order. A sequence is read, not handled, so no hover.
 * The Loop is set apart from the rest because it is the step most studios
 * do not have.
 */
export default function KitSteps({ steps, color }) {
  const a = accent(color);

  return (
    <section className={SECTION}>
      <FadeInUp>
        <SectionHeader overline="How it runs" title="From kick-off to The Loop" align="left" />
      </FadeInUp>
      <ol className="flex max-w-3xl flex-col gap-4">
        {steps.map((step, i) => {
          const isLoop = i === steps.length - 1;
          return (
            <li
              key={step.title}
              className={cn(
                "flex gap-5 rounded-2xl border p-6",
                isLoop ? cn(a.ring, a.soft) : "border-outline-variant/30 bg-surface-container-lowest/85"
              )}
            >
              <span
                className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-label text-label-caps", a.soft, a.text)}
                aria-hidden="true"
              >
                {isLoop ? <span className="material-symbols-outlined text-[20px]">all_inclusive</span> : pad(i)}
              </span>
              <div>
                <h3 className="mb-1 font-display text-xl text-on-surface">{step.title}</h3>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">{step.desc}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
```

`src/components/sections/kits/KitAddOns.jsx`:

```jsx
import { SectionHeader } from "@/components/ui";
import { FadeInUp } from "@/components/motion";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/pricing";
import { SECTION, accent } from "@/components/sections/service-master/tokens";

/** Optional extras, each priced, as a plain ruled list. */
export default function KitAddOns({ addOns, color }) {
  if (!addOns?.length) return null;
  const a = accent(color);

  return (
    <section className={SECTION}>
      <FadeInUp>
        <SectionHeader
          overline="Add-ons"
          title="Add only what you need"
          description="Priced up front, like the kit itself."
          align="left"
        />
      </FadeInUp>
      <ul className="max-w-3xl divide-y divide-outline-variant/30 border-y border-outline-variant/30">
        {addOns.map((addOn) => (
          <li key={addOn.name} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <span className="font-body text-body-md text-on-surface">{addOn.name}</span>
            <span className={cn("whitespace-nowrap font-display text-base font-semibold", a.text)}>
              + {formatPrice(addOn.price)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: Create the kit route**

`src/app/kits/[slug]/page.js`:

```jsx
import { notFound } from "next/navigation";
import { getAllKits, getKitBySlug } from "@/data/kits";
import { getLineBySlug } from "@/data/lines";
import { getAllCaseStudies } from "@/data/caseStudies";
import { formatPrice } from "@/lib/pricing";
import KitHero from "@/components/sections/kits/KitHero";
import KitIncludes from "@/components/sections/kits/KitIncludes";
import KitFit from "@/components/sections/kits/KitFit";
import KitSteps from "@/components/sections/kits/KitSteps";
import KitAddOns from "@/components/sections/kits/KitAddOns";
import UnderTheHood from "@/components/sections/kits/UnderTheHood";
import PromiseStrip from "@/components/sections/kits/PromiseStrip";
import StudioCta from "@/components/sections/kits/StudioCta";
import ServiceMasterRelatedWork from "@/components/sections/service-master/ServiceMasterRelatedWork";
import ServiceMasterFAQ from "@/components/sections/service-master/ServiceMasterFAQ";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import {
  generateBreadcrumbSchema,
  generateFaqSchema,
  generateHowToSchema,
  generateKitSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

// Every kit is known at build time. Anything else is a 404, not a render.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllKits().map((kit) => ({ slug: kit.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const kit = getKitBySlug(slug);
  if (!kit) return {};

  return buildMetadata({
    title: kit.metaTitle,
    description: `${kit.metaDescription} From ${formatPrice(kit.price)}.`,
    path: `/kits/${kit.slug}`,
    keywords: [kit.keyword, kit.name, `${kit.name} price`],
  });
}

export default async function KitPage({ params }) {
  const { slug } = await params;
  const kit = getKitBySlug(slug);
  if (!kit) notFound();

  const line = getLineBySlug(kit.line);
  const studies = getAllCaseStudies().filter((study) => kit.work.includes(study.slug));

  return (
    <main className="relative z-10 overflow-x-clip">
      <SchemaMarkup schema={generateKitSchema(kit)} />
      <SchemaMarkup
        schema={generateHowToSchema({
          name: `How the ${kit.name} runs`,
          description: kit.summary,
          steps: kit.steps.map((step) => ({ name: step.title, text: step.desc })),
        })}
      />
      <SchemaMarkup schema={generateFaqSchema(kit.faqs.map((faq) => ({ question: faq.q, answer: faq.a })))} />
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Kits", path: "/kits" },
          { label: kit.name, path: `/kits/${kit.slug}` },
        ])}
      />

      <KitHero kit={kit} line={line} />
      <KitIncludes items={kit.includes} color={line.color} />
      <KitFit fitFor={kit.fitFor} notFor={kit.notFor} color={line.color} />
      <KitSteps steps={kit.steps} color={line.color} />
      <KitAddOns addOns={kit.addOns} color={line.color} />
      <UnderTheHood points={kit.underTheHood} demo={kit.demo} />
      {studies.length > 0 && (
        <ServiceMasterRelatedWork studies={studies} color={line.color} title="Built with this kit" />
      )}
      <ServiceMasterFAQ faqs={kit.faqs} color={line.color} />
      <PromiseStrip />
      <StudioCta
        heading={`Start your ${kit.name}`}
        body="Tell us what you are building. The first call is with the people who would build it."
        primary={{ href: `/contact?kit=${kit.slug}`, label: "Start this kit" }}
        secondary={{ href: "/kits", label: "See every kit" }}
      />
    </main>
  );
}
```

`src/app/kits/[slug]/opengraph-image.js`:

```js
import { ogCard, clampSubtitle, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { KITS } from "@/data/kits";
import { getLineBySlug } from "@/data/lines";
import { formatPrice } from "@/lib/pricing";

export const alt = "A LogixLoops Advantage Kit.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return KITS.map((kit) => ({ slug: kit.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const kit = KITS.find((entry) => entry.slug === slug);

  if (!kit) {
    return ogCard({
      eyebrow: "Advantage Kits",
      title: "Pick a kit. See the price first.",
      subtitle: "Websites, stores, apps, branding, SEO, AI visibility and automation.",
    });
  }

  const line = getLineBySlug(kit.line);
  return ogCard({
    eyebrow: `${line.name} · ${line.label}`,
    title: kit.name,
    subtitle: clampSubtitle(`From ${formatPrice(kit.price)}, ${kit.timeline}. ${kit.summary}`),
  });
}
```

`src/app/kits/[slug]/loading.js`:

```bash
cp "src/app/services/[slug]/loading.js" "src/app/kits/[slug]/loading.js"
```

Then rename the function in the copy from `ServiceLoading` to `KitLoading`.

- [ ] **Step 5: Test, lint, build and smoke-check**

Run: `npm test && npm run lint && npm run build`
Expected: all pass; the build lists `/kits/[slug]` with 13 paths.

Start `npx next start -p 3100` in the background, then run `node scripts/smoke.mjs http://localhost:3100`.
Expected: every check prints `ok`. Stop the server.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/kits src/app/kits scripts/smoke.mjs
git commit -m "feat: add Advantage Kit pages with price, steps, add-ons and schema

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 10: The /kits catalogue

**Files:**
- Create: `src/app/kits/page.js`, `src/app/kits/opengraph-image.js`
- Modify: `scripts/smoke.mjs` (`CHECKS`)

**Interfaces:**
- Consumes: `getAllLines` (Task 4), `getAllKits`, `getKitsByLine` (Task 3), `getAllPlans` (Task 3), `KitCard`, `PlanCard`, `PromiseStrip`, `StudioCta` (Task 7), `PageHero`, `PageSurface`, `generateCollectionPageSchema`, `generateBreadcrumbSchema` (existing).
- Produces: `/kits`.

- [ ] **Step 1: Add the failing smoke check**

Append to `CHECKS` in `scripts/smoke.mjs`:

```js
  // Kit catalogue
  { path: "/kits", status: 200, includes: ["Advantage Kits are fixed-scope packages", "Business Website Kit", "Workflow Automation Kit", "Essentials", '"@type":"CollectionPage"'] },
```

The check matches the lead, not the heading: `PageHero` animates its heading word by word, so "Pick a kit." is not one contiguous string in the HTML.

- [ ] **Step 2: Build, smoke, confirm it fails**

Run: `npm run build`, start `npx next start -p 3100` in the background, then `node scripts/smoke.mjs http://localhost:3100`.
Expected: `FAIL /kits: status 404`. Everything else `ok`. Stop the server.

- [ ] **Step 3: Create the page and its card**

`src/app/kits/page.js`:

```jsx
import Link from "next/link";
import PageHero from "@/components/sections/shared/PageHero";
import PageSurface from "@/components/sections/shared/PageSurface";
import { Button } from "@/components/ui";
import KitCard from "@/components/sections/kits/KitCard";
import PlanCard from "@/components/sections/kits/PlanCard";
import PromiseStrip from "@/components/sections/kits/PromiseStrip";
import StudioCta from "@/components/sections/kits/StudioCta";
import { SECTION } from "@/components/sections/service-master/tokens";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { getAllLines, getLineBySlug } from "@/data/lines";
import { getAllKits, getKitsByLine } from "@/data/kits";
import { getAllPlans } from "@/data/plans";
import { generateBreadcrumbSchema, generateCollectionPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const KITS_DESCRIPTION =
  "Fixed-scope packages for websites, online stores, apps, branding, SEO, AI visibility and automation, each with a published starting price and timeline.";

/* Answer-first: what a kit is, what it covers, and why the price is here. */
const LEAD =
  "Advantage Kits are fixed-scope packages from LogixLoops for websites, online stores, apps, branding, SEO and AI visibility, and AI automation. Each kit lists what you get, how long it takes and a starting price in dollars and rupees, so you know the cost before the first call.";

export const metadata = buildMetadata({
  title: "Advantage Kits: Web, App, Brand and AI Packages",
  description: KITS_DESCRIPTION,
  path: "/kits",
  keywords: [
    "website packages",
    "website development packages India",
    "branding packages",
    "SEO packages",
    "AI chatbot packages",
    "app development packages",
    "digital packages for small business",
  ],
});

function LineHeading({ id, eyebrow, title, pitch, href, linkLabel }) {
  return (
    <div className="mb-stack-lg flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <span className="mb-3 block font-label text-label-caps uppercase tracking-widest text-primary">{eyebrow}</span>
        <h2 id={id} className="mb-3 font-display text-headline-lg-mobile md:text-headline-lg text-on-surface">
          {title}
        </h2>
        <p className="font-body text-body-lg text-on-surface-variant">{pitch}</p>
      </div>
      <Link href={href} className="inline-flex items-center gap-1 whitespace-nowrap font-body text-body-md text-primary">
        {linkLabel}
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          arrow_forward
        </span>
      </Link>
    </div>
  );
}

export default function KitsPage() {
  const lines = getAllLines().filter((line) => getKitsByLine(line.slug).length > 0);
  const pitCrew = getLineBySlug("maintenance-and-support");

  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Kits", path: "/kits" },
        ])}
      />
      <SchemaMarkup
        schema={generateCollectionPageSchema({
          name: "Advantage Kits",
          description: KITS_DESCRIPTION,
          path: "/kits",
          items: getAllKits().map((kit) => ({
            name: kit.name,
            description: kit.summary,
            path: `/kits/${kit.slug}`,
          })),
        })}
      />

      <PageHero
        preset="pricing"
        eyebrow="Advantage Kits"
        title="Pick a kit."
        accent="See the price first."
        lead={LEAD}
        cue="Browse the kits"
      >
        <Button href="/contact" variant="ghost" size="lg">
          Not sure which? Ask us
        </Button>
      </PageHero>

      <PageSurface>
        {lines.map((line) => (
          <section key={line.slug} aria-labelledby={`line-${line.slug}`} className={SECTION}>
            <LineHeading
              id={`line-${line.slug}`}
              eyebrow={line.name}
              title={line.label}
              pitch={line.pitch}
              href={`/services/${line.slug}`}
              linkLabel={`More about ${line.name}`}
            />
            <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
              {getKitsByLine(line.slug).map((kit) => (
                <KitCard key={kit.slug} kit={kit} color={line.color} />
              ))}
            </div>
          </section>
        ))}

        <section aria-labelledby="line-maintenance-and-support" className={SECTION}>
          <LineHeading
            id="line-maintenance-and-support"
            eyebrow={pitCrew.name}
            title={pitCrew.label}
            pitch={pitCrew.pitch}
            href={`/services/${pitCrew.slug}`}
            linkLabel={`More about ${pitCrew.name}`}
          />
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
            {getAllPlans().map((plan) => (
              <PlanCard key={plan.slug} plan={plan} />
            ))}
          </div>
        </section>

        <PromiseStrip />
        <StudioCta
          heading="Not sure which kit fits?"
          body="Tell us what you are trying to do. We will point you at the right kit, or tell you plainly if none of them fit."
          primary={{ href: "/contact", label: "Ask the people who build it" }}
        />
      </PageSurface>
    </>
  );
}
```

`src/app/kits/opengraph-image.js`:

```js
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "LogixLoops Advantage Kits: fixed-scope packages with published prices.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Advantage Kits",
    title: "Pick a kit. See the price first.",
    subtitle: "Websites, stores, apps, branding, SEO, AI visibility and automation, each with a published starting price.",
  });
}
```

- [ ] **Step 4: Lint, build and smoke-check**

Run: `npm run lint && npm run build`, start `npx next start -p 3100` in the background, then `node scripts/smoke.mjs http://localhost:3100`.
Expected: every check prints `ok`. Stop the server.

- [ ] **Step 5: Commit**

```bash
git add src/app/kits/page.js src/app/kits/opengraph-image.js scripts/smoke.mjs
git commit -m "feat: add the /kits catalogue grouped by line

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 11: Navigation, footer and sitemap

**Files:**
- Modify: `src/lib/constants.js` (`NAV_LINKS`, `FOOTER_LINKS`)
- Modify: `src/components/layout/Navbar.jsx` (two CTA links, lines ~299–302 and ~529–533, and the comment at ~432)
- Modify: `src/app/sitemap.js`
- Test: `test/navigation.test.mjs`; modify `test/sitemap.test.mjs`

**Interfaces:**
- Consumes: `LINES` (Task 4), `KITS` (Task 3).
- Produces: top-level nav `Services, Kits, Work, Pricing, Company`; Services children are the six lines; the sitemap lists `/kits` and every kit.

- [ ] **Step 1: Write the failing tests**

Create `test/navigation.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { FOOTER_LINKS, NAV_LINKS } from "@/lib/constants";
import { LINES } from "@/data/lines";

test("top-level navigation is Services, Kits, Work, Pricing, Company", () => {
  assert.deepEqual(NAV_LINKS.map((link) => link.label), ["Services", "Kits", "Work", "Pricing", "Company"]);
  assert.equal(NAV_LINKS.find((link) => link.label === "Kits").href, "/kits");
  assert.equal(NAV_LINKS.find((link) => link.label === "Pricing").href, "/pricing");
});

test("the Services menu lists the six lines, each with a preview image that exists", () => {
  const services = NAV_LINKS.find((link) => link.label === "Services");
  assert.deepEqual(services.children.map((child) => child.href), LINES.map((line) => `/services/${line.slug}`));
  for (const child of services.children) {
    assert.ok(existsSync(`public${child.image}`), child.image);
    assert.ok(child.description.startsWith(LINES.find((l) => child.href.endsWith(l.slug)).name), child.label);
  }
});

test("Company no longer duplicates the top-level Pricing link", () => {
  const company = NAV_LINKS.find((link) => link.label === "Company");
  assert.ok(!company.children.some((child) => child.href === "/pricing"));
});

test("footer service links point at live line pages or the catalogue", () => {
  const live = new Set([...LINES.map((line) => `/services/${line.slug}`), "/kits"]);
  for (const link of FOOTER_LINKS.services) assert.ok(live.has(link.href), link.href);
});
```

Append to `test/sitemap.test.mjs`:

```js
import { KITS } from "@/data/kits";

test("the sitemap lists the catalogue and every kit", () => {
  assert.ok(paths().includes("/kits"));
  for (const kit of KITS) assert.ok(paths().includes(`/kits/${kit.slug}`), kit.slug);
});
```

(Move the new `import` to the top of the file with the other imports.)

- [ ] **Step 2: Run them to verify they fail**

Run: `npm test`
Expected: FAIL. The navigation labels differ and `/kits` is missing from the sitemap.

- [ ] **Step 3: Update navigation and footer data**

In `src/lib/constants.js`, add `import { LINES } from "@/data/lines";` under the existing `CASE_STUDIES` import.

Replace the navigation comment (the "Trimmed to 4 top-level items" block) with:

```js
/* ─── Navigation ───
 * Five top-level items. Kits and Pricing sit at the top level because
 * published prices are the studio's main difference, and a visitor should
 * reach them in one click. Pricing therefore leaves the Company menu, so no
 * destination appears twice. */
```

Replace the `Services` entry of `NAV_LINKS` with the following, and insert Kits after it and Pricing after Work:

```js
  {
    label: "Services",
    href: "/services",
    hasDropdown: true,
    // The plain label is the link, because it is what people scan for. The
    // memorable name leads the description, so the two still appear together.
    children: LINES.map((line) => ({
      label: line.label,
      href: `/services/${line.slug}`,
      icon: line.icon,
      description: `${line.name}. ${line.pitch}`,
      image: line.navImage,
    })),
  },
  {
    label: "Kits",
    href: "/kits",
  },
```

```js
  {
    label: "Pricing",
    href: "/pricing",
  },
```

In the `Company` children, delete the `Pricing` entry.

Replace `FOOTER_LINKS.services` and the Pricing label in `FOOTER_LINKS.resources`:

```js
  services: [
    ...LINES.map((line) => ({ label: line.label, href: `/services/${line.slug}` })),
    { label: "All kits", href: "/kits" },
  ],
```

```js
    { label: "Pricing", href: "/pricing" },
```

- [ ] **Step 4: Point the navbar button at the kits**

In `src/components/layout/Navbar.jsx`, change both primary CTA links (desktop and mobile) from `href="/contact"` with text `Get Started` to `href="/kits"` with text `Browse the kits`. In the comment around line 432, replace the words `"Get Started"` with `"Browse the kits"`. Leave the comment block about the removed Contact entry in `constants.js` unchanged; Contact stays reachable from the footer and every kit page.

- [ ] **Step 5: Add kits to the sitemap**

In `src/app/sitemap.js`, add `import { KITS } from "@/data/kits";`, add `"/kits",` to `staticRoutes` after `"/services"`, and add after `serviceRoutes`:

```js
  // Kit pages
  const kitRoutes = KITS.map((kit) => ({
    url: `${baseUrl}/kits/${kit.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));
```

and include `...kitRoutes` in the returned array after `...serviceRoutes`.

- [ ] **Step 6: Test, lint, build**

Run: `npm test && npm run lint && npm run build`
Expected: all pass.

- [ ] **Step 7: Check the menu by hand**

Run `npx next start -p 3100` and open `http://localhost:3100` in a browser:
- Desktop: hover Services; six items, each preview image loads. Tab through the top bar; Kits and Pricing take focus and have no dropdown arrow.
- Mobile width (DevTools, 390px): open the menu; Services expands to six lines; Kits and Pricing are plain links; the button reads "Browse the kits".

Stop the server.

- [ ] **Step 8: Commit**

```bash
git add src/lib/constants.js src/components/layout/Navbar.jsx src/app/sitemap.js test/navigation.test.mjs test/sitemap.test.mjs
git commit -m "feat: navigation and sitemap for the six lines and the kits

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 12: Remove dead home sections

Five home sections are imported nowhere and two of them carry fabricated content (a "CTO, Nexus Financial" testimonial and the old "Nexus Global Logistics" study).

**Files:**
- Delete: `src/components/sections/home/TestimonialsSection.jsx`, `FeaturedCaseStudySection.jsx`, `TrustedBySection.jsx`, `PricingSnapshotSection.jsx`, `ServicesBento.jsx`

- [ ] **Step 1: Confirm nothing imports them**

Run: `grep -rn "TestimonialsSection\|FeaturedCaseStudySection\|TrustedBySection\|PricingSnapshotSection\|ServicesBento" src --include=*.js --include=*.jsx | grep -v "^src/components/sections/home/\(TestimonialsSection\|FeaturedCaseStudySection\|TrustedBySection\|PricingSnapshotSection\|ServicesBento\)\.jsx"`
Expected: no output.

- [ ] **Step 2: Delete them**

```bash
git rm src/components/sections/home/TestimonialsSection.jsx \
  src/components/sections/home/FeaturedCaseStudySection.jsx \
  src/components/sections/home/TrustedBySection.jsx \
  src/components/sections/home/PricingSnapshotSection.jsx \
  src/components/sections/home/ServicesBento.jsx
```

- [ ] **Step 3: Lint and build**

Run: `npm run lint && npm run build`
Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: delete unmounted home sections that carried fabricated content

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 13: Generated llms.txt

The hand-written `public/llms.txt` still lists the deleted reference builds at dead `/case-studies/...` URLs. It is replaced by a route that builds the file from the same data the pages render, so it cannot drift again.

**Files:**
- Create: `src/lib/llms.js`, `src/app/llms.txt/route.js`
- Delete: `public/llms.txt`
- Test: `test/llms.test.mjs`

**Interfaces:**
- Consumes: `BRAND`, `PROMISES` (Task 6), `getAllLines` (Task 4), `getKitsByLine`, `getAllPlans` (Task 3), `getAllCaseStudies`, `getAllPosts` (existing), `formatPrice` (Task 2).
- Produces: `buildLlmsTxt() => string` from `@/lib/llms`; `GET /llms.txt` serving it as `text/plain`.

- [ ] **Step 1: Write the failing test**

Create `test/llms.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { buildLlmsTxt } from "@/lib/llms";
import { BRAND } from "@/lib/constants";
import { LINES } from "@/data/lines";
import { KITS } from "@/data/kits";
import { formatPrice } from "@/lib/pricing";
import { voiceProblems } from "./helpers/voice.mjs";
import { RETIRED } from "./redirects.test.mjs";

const text = buildLlmsTxt();

test("llms.txt opens with the entity definition", () => {
  assert.ok(text.startsWith("# LogixLoops\n"));
  assert.ok(text.includes(BRAND.definition));
});

test("llms.txt links every line, and every kit with its live price", () => {
  for (const line of LINES) assert.ok(text.includes(`https://logixloops.in/services/${line.slug}`), line.slug);
  for (const kit of KITS) {
    assert.ok(text.includes(`https://logixloops.in/kits/${kit.slug}`), kit.slug);
    assert.ok(text.includes(formatPrice(kit.price)), `${kit.slug} price`);
  }
});

test("llms.txt carries no retired URL", () => {
  assert.ok(!text.includes("/case-studies"));
  for (const old of Object.keys(RETIRED)) assert.ok(!text.includes(`/services/${old}`), old);
});

test("llms.txt follows the voice rules", () => {
  assert.deepEqual(voiceProblems(text), []);
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test`
Expected: FAIL with `Cannot find module` for `src/lib/llms.js`.

- [ ] **Step 3: Write the generator and the route**

`src/lib/llms.js`:

```js
/**
 * llms.txt, built from the same records the pages render, so the summary an
 * answer engine reads cannot disagree with the site it describes. Served by
 * src/app/llms.txt/route.js.
 *
 * Case studies are listed by title and industry only: their long
 * descriptions are client-facing copy that has not been through the voice
 * rules yet.
 */
import { BRAND, PROMISES } from "@/lib/constants";
import { getAllLines } from "@/data/lines";
import { getKitsByLine } from "@/data/kits";
import { getAllPlans } from "@/data/plans";
import { getAllCaseStudies } from "@/data/caseStudies";
import { getAllPosts } from "@/data/blog";
import { formatPrice } from "@/lib/pricing";

const SITE = "https://logixloops.in";

function lineSection(line) {
  const kits = getKitsByLine(line.slug);
  const items = kits.length
    ? kits.map(
        (kit) => `- [${kit.name}](${SITE}/kits/${kit.slug}): from ${formatPrice(kit.price)}, ${kit.timeline}. ${kit.summary}`
      )
    : getAllPlans().map(
        (plan) => `- **${plan.name} plan:** from ${formatPrice(plan.price)}. ${plan.summary} ${plan.terms}`
      );

  return [`## ${line.name}: ${line.label}`, "", `${line.summary} [More](${SITE}/services/${line.slug})`, "", ...items, ""];
}

export function buildLlmsTxt() {
  return [
    "# LogixLoops",
    "",
    `> ${BRAND.definition}`,
    "",
    `Tagline: "${BRAND.tagline}."`,
    "",
    "## What LogixLoops is",
    "",
    "- **Type:** Independent brand, technology and growth studio (ProfessionalService).",
    `- **Base:** ${BRAND.addressDisplay}. Works remotely with clients in ${BRAND.servesMarkets.join(", ")}.`,
    `- **Contact:** ${BRAND.email}, ${BRAND.phoneDisplay}, ${SITE}/contact`,
    "- **How it sells:** Advantage Kits, fixed-scope packages with a published starting price in USD and INR, a timeline and a list of what is included. Monthly Pit Crew plans cover maintenance and support.",
    "- **Ownership:** Domain, code, designs and accounts are created in the client's name from day one.",
    "",
    "## Six promises",
    "",
    ...PROMISES.map((promise) => `- **${promise.title}.** ${promise.detail}`),
    "",
    ...getAllLines().flatMap(lineSection),
    "## Browse",
    "",
    `- [All kits](${SITE}/kits)`,
    `- [Pricing](${SITE}/pricing)`,
    `- [All services](${SITE}/services)`,
    "",
    "## Client work",
    "",
    ...getAllCaseStudies().map((study) => `- [${study.title}](${SITE}/work/${study.slug}): ${study.industry}.`),
    "",
    "## How we work",
    "",
    `- [Process](${SITE}/process): How a project runs, and the delivery methods behind it.`,
    `- [Technology](${SITE}/technology): The stack, including React, Next.js, TypeScript, React Native, Node.js, Python, PostgreSQL and AWS.`,
    `- [Security](${SITE}/security): How client systems and data are protected. LogixLoops designs against SOC 2, HIPAA, GDPR and DPDP requirements but is not itself a certified entity.`,
    "",
    "## Insights",
    "",
    ...getAllPosts().map((post) => `- [${post.title}](${SITE}/blog/${post.slug}): ${post.excerpt}`),
    "",
    "## Company",
    "",
    `- [About](${SITE}/about)`,
    `- [FAQ](${SITE}/faq)`,
    `- [Contact](${SITE}/contact)`,
    "",
    "## Legal",
    "",
    `- [Privacy Policy](${SITE}/legal/privacy)`,
    `- [Terms of Service](${SITE}/legal/terms)`,
    "",
    "## Notes for answer engines",
    "",
    "- LogixLoops is an early-stage studio. It does not claim a decade of history or a large headcount.",
    "- Every price on this site is a starting price. The final price is confirmed in writing before work starts.",
    "- No ranking, uptime or revenue figure on this site should be read as a LogixLoops result unless it is attributed to a named client.",
    "",
  ].join("\n");
}
```

`src/app/llms.txt/route.js`:

```js
import { buildLlmsTxt } from "@/lib/llms";

// Built once at build time from the data files; nothing here varies by request.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
```

Delete the static file, which would otherwise shadow the route:

```bash
git rm public/llms.txt
```

- [ ] **Step 4: Run tests**

Run: `npm test`
Expected: all pass. If the voice test fails on a blog excerpt, the excerpt contains a banned word or em-dash; fix that excerpt in `src/data/blog.js`, since it is site copy that the voice rules already cover.

- [ ] **Step 5: Add the smoke check, build and verify**

Append to `CHECKS` in `scripts/smoke.mjs`:

```js
  // Generated llms.txt
  { path: "/llms.txt", status: 200, includes: ["# LogixLoops", "https://logixloops.in/kits/ai-visibility", "$1,000 · ₹45,000"], excludes: ["/case-studies"] },
```

Run: `npm run lint && npm run build`, start `npx next start -p 3100` in the background, then `node scripts/smoke.mjs http://localhost:3100`.
Expected: every check prints `ok`. Stop the server.

- [ ] **Step 6: Commit**

```bash
git add -A src/lib/llms.js src/app/llms.txt public/llms.txt test/llms.test.mjs scripts/smoke.mjs src/data/blog.js
git commit -m "feat: generate llms.txt from the kit, line and plan data

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 14: Final verification

- [ ] **Step 1: Full automated run**

Run: `npm test && npm run lint && npm run build`
Expected: all pass. The build output lists `/kits`, `/kits/[slug]` (13), `/services/[slug]` (6) and `/llms.txt`.

- [ ] **Step 2: Content sweeps**

Run each and expect no output:

```bash
grep -rn $'\u2014' src/data/kits.js src/data/lines.js src/data/plans.js src/lib/llms.js src/components/sections/kits
grep -rniw "reference build" src
grep -rn "/case-studies/" src
```

- [ ] **Step 3: Smoke the production build**

Start `npx next start -p 3100` in the background, then run `node scripts/smoke.mjs http://localhost:3100`.
Expected: every check prints `ok`.

- [ ] **Step 4: Manual checks (Review Focus 3, 4 and 5)**

With the server still running:
- Open `/kits/mobile-app` and `/services/web-and-app-development` at 360px wide in DevTools. Nothing scrolls horizontally; the price chips and the line chip wrap cleanly.
- Paste the HTML of `http://localhost:3100/kits/brand-identity` (view-source) into Google's Rich Results Test (code mode). Expected: Service, HowTo, FAQPage and BreadcrumbList detected, no errors.
- Open "Under the hood" on `/kits/brand-identity` and move the pointer over it: the cipher-lens layer appears under the pointer. The Tokens demo below it works.
- Run a Lighthouse mobile pass on `/` and `/kits/business-website` and compare with `main`: no category drops by more than 5 points.

Stop the server.

- [ ] **Step 5: Report**

Summarise for the owner: what shipped, the test and smoke results, and the open items from spec section 11 (final prices, team facts, client permissions, Squad and The Loop). Note what the next plans cover: page copy rewrites (Home, Pricing, About, Work, Process, FAQ, Contact), location pages, the `/claude-rank` audit and fix pass, then wave 2 kits and blog cost guides.
