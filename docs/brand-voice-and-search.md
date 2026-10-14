# LogixLoops: Voice, Messaging & Search Strategy

Source of truth for every word on logixloops.in. If a sentence on the site
disagrees with this file, the file wins. Design record:
`docs/superpowers/specs/2026-10-13-advantage-Loops-repositioning-design.md`.

---

## 1. Positioning

**Tagline: Your Unfair Advantage.**

LogixLoops is a brand, tech and growth studio in Jaipur, selling to India and
the world. The unfair advantage is the combination:

> Brand, build and growth from one studio, sold as Loops with public prices.
> Everything is yours, and it is built to be found.

The name does work too. Agencies sell one-off projects; LogixLoops sells
**Loops**: fixed-scope packages that run build, launch, measure, improve. Every
Loop ends with **The Tune-Up**: 30 days of measuring, fixing and tuning with
real data.

**Naming (2026-10-14).** The product noun is **Loop**, capitalised, never
"Loop" or "package" in visible copy: "Business Website Loop", "every Loop",
"Pick a Loop". "Package" is still used where search needs it: page titles,
meta descriptions, keywords and the entity definition ("service packages
called Loops"). In code and data the record is still a `kit` (`src/data/kits.js`,
`KitCard`); that is an internal name only.

### Entity definition

Used verbatim in schema, `llms.txt`, About and anywhere an assistant might
quote what LogixLoops is:

> LogixLoops is a brand, technology and growth studio based in Jaipur, India.
> It sells fixed-scope service packages called Loops, with published starting
> prices, for websites, apps, branding, SEO and AI search visibility, and AI
> automation, for businesses in India, the US, the UK and the UAE.

### Six lines

Every line has a name people remember and a plain label search engines read.
**The two always appear together.** Titles, H1s and schema lead with the
plain label.

| Name | Plain label | URL |
|---|---|---|
| Engine | Web & App Development | `/loops/web-and-app-development` |
| Spark | Branding & Identity | `/loops/branding` |
| Glow-Up | Website Redesign & Upgrades | `/loops/website-redesign` |
| Spotlight | SEO & AI Search Visibility | `/loops/seo-and-ai-search` |
| Autopilot | AI & Automation | `/loops/ai-automation` |
| Pit Crew | Maintenance & Support Plans | `/loops/maintenance-and-support` |

Lines and Loops share one URL tree: `/loops` is the hub, `/loops/<line>` a
line, `/loops/<loop>` a Loop (slugs never collide). The old `/services` and
`/kits` URLs 308-redirect there. Data: Loops are `src/data/kits.js`, plans
`src/data/plans.js`, lines `src/data/lines.js`.

### Six promises

Each one is the opposite of a common agency habit. They appear on every Loop
page and as a comparison on the home page. Data: `PROMISES` in
`src/lib/constants.js`.

1. **Price on the box.** Published starting price, scope and timeline.
2. **One studio.** Brand, tech and growth on one team, one thread.
3. **The Tune-Up.** 30 days after launch to measure, fix and tune.
4. **Built to be found.** Every build ships ready for Google and AI search.
5. **Yours from day one.** Domain, code, designs and accounts in the client's name.
6. **Talk to the builders.** The people on the call do the work.

---

## 2. Audiences

| Reader | What they need from a page |
|---|---|
| Business owners and founders who are not technical | What it is, what it costs, how long it takes, what to click. In the first screen. |
| Startup founders | Speed, ownership and a clear path from first version to growth. |
| Engineering leads checking our work | Named tools, standards and trade-offs, without having to ask. |

**Plain on top, depth underneath.** The top half of every page is written for
the first reader, at a reading age of about 12 to 14. Technical depth lives in
"Under the hood" sections, `/technology`, `/security`, the lower half of
`/process`, and blog deep-dives. Nobody should have to read a stack list to
find out what we sell.

---

## 3. Voice

**Clear. Specific. Warm. Never loud.**

1. **Proof over adjective.** Every adjective must be replaceable by a number,
   a named thing or a named standard. If it cannot be, cut it.
   - No: "Blazing-fast, world-class websites"
   - Yes: "Checked on a mid-range Android phone before launch"
2. **Answer first.** The first sentence of a page, a Loop summary or an FAQ
   answer answers the question. The rest earns it.
3. **Short line, then one that pays for it.** Never three long sentences in a row.
4. **Say the uncomfortable thing first.** "Nobody can guarantee the first
   position on Google" buys more trust than any superlative, and it is what
   AI answer engines quote.
5. **Wit is a scalpel.** One light turn per section at most, and only where it
   carries meaning.

### Headings

No question-phrased section headings ("What is X?") under a hero. Questions
belong in FAQ accordions. Section headings are short declarative labels
("Everything included in the price", "Pick a Loop").

### Punctuation

**No em-dashes anywhere in site content**: copy, data files, metadata,
`llms.txt`. Use a comma, colon or full stop, or rewrite. Hyphens in compounds
(`fixed-scope`) and en-dashes in numeric ranges (`3–4 weeks`) are fine.

### Banned vocabulary

`elite` · `world-class` · `cutting-edge` · `best-in-class` · `unparalleled` ·
`unprecedented` · `seamless(ly)` · `hyper-` anything · `revolutionise` ·
`leverage` · `synergy` · `luxury` · `atmospheric` · `immersive` · `bespoke` ·
`holistic` · `journey` · `solution` / `solutions` · `in today's fast-paced world`

`test/helpers/voice.mjs` enforces this list over every data file.

### Numbers and prices

Every number on the site is one of:

1. **Countable from the site itself.** Six lines, 13 Loops, 30-day Tune-Up.
2. **A commitment we sign.** Written as a standard: "we target", "included".
3. **A client-verified outcome.** Only with written permission, and always
   attributed to the client, never presented as our own figure.

**Every price comes from the data files.** No price is typed into a page or
a component. FAQ answers that quote prices build them from the Loop and plan
records. All prices are "from" prices, shown in USD and INR together.

---

## 4. Search strategy

| Surface | What wins it |
|---|---|
| SEO (Google, Bing) | Entity clarity, one keyword per URL, internal links, Core Web Vitals |
| GEO (ChatGPT, Perplexity, Gemini, AI Overviews) | Answer-first summaries, named facts, comparison tables, `llms.txt`, Bing indexing |
| AEO (snippets, People Also Ask, voice) | Direct first sentences, FAQPage and HowTo schema |
| Local | Identical NAP everywhere, Google Business Profile, `/locations/jaipur` |

### Keyword ownership

One primary keyword per URL. **Line pages own the category head term, Loop
pages own the "package / price / cost" variant, blog posts own the
informational question.** A line page and a Loop page never compete for the
same query. Each Loop's owned keyword is its `keyword` field.

Clusters:

- **Brand:** LogixLoops, LogixLoops Jaipur, LogixLoops Loops.
- **Global head terms (line pages):** branding agency, web development
  company, app development company, website redesign services, SEO agency,
  AI automation agency, GEO agency.
- **Local (location page and home):** website development company in
  Jaipur, branding agency in Jaipur, app development company in Jaipur, SEO
  company in Jaipur, digital agency in Jaipur.
- **Loop long-tail (Loop pages):** the `keyword` field of each Loop.
- **Global outsourcing (market pages):** hire web developers from India,
  outsource app development to India, branding agency for UAE startups.
- **Cost and how-to questions (FAQ answers and blog):** how much does a
  website cost, logo design cost, how to get my business mentioned by
  ChatGPT, what is GEO. Each question lives in exactly one place.

### Non-negotiable technical rules

- **NAP consistency.** Malviya Nagar, Jaipur, Rajasthan 302017, India, plus
  `+91 87643 73589` and `logixloops@gmail.com`, identical in schema, footer,
  contact page and every external directory. In the site these live only on
  `BRAND` in `src/lib/constants.js`.
- **One `ProfessionalService` entity** in the root layout, with the entity
  definition above and an `OfferCatalog` of every Loop and plan with prices.
- **Every FAQ answer starts with the answer.**
- **No FAQ question appears on two URLs.** `test/content.test.mjs` checks it.
- **`sameAs` lists only profiles that resolve.**
- **`llms.txt` stays in sync with the sitemap.** `test/llms.test.mjs` checks
  the lines and Loops.
- **No fake data in the DOM.**

---

## 5. Section-keep test

Every section on every page must pass one of these, or it is deleted:

1. It **answers** a question a buyer actually asks.
2. It **proves** a claim made above it.
3. It **moves** the visitor toward exactly one next action.
