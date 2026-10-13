# Advantage Kits: LogixLoops Repositioning Design

Date: 2026-10-13
Status: Draft, awaiting review

## 1. Goal

Turn logixloops.in from a heavy "senior engineers who rescue fragile systems"
site into a **brand, tech and growth studio** that sells **fixed-scope kits with
published starting prices**, readable by non-technical buyers on top and by
engineers underneath, and built to rank across many keyword clusters in Google,
Bing and AI answer engines (ChatGPT, Perplexity, Gemini, AI Overviews).

Success looks like:

- A non-technical founder understands what LogixLoops sells, what it costs and
  what to click within 10 seconds on any page.
- An engineering lead can still find the depth (stack, security, process) one
  click or one section down.
- Every kit, line, market and cost question has exactly one URL that owns it.
- AI assistants describe LogixLoops with the new entity definition, not the old
  one, and not as "Logicloops IT Private Limited".

## 2. Decisions already made

| Decision | Choice |
|---|---|
| Market | Built in India, sold globally. Global voice, India and Jaipur kept as winnable local surfaces. |
| Kit pricing | Every kit shows a "from" price in USD and INR, plus scope and timeline. Add-ons priced separately. |
| UVP | Brand, build and growth from one studio, sold as kits with public prices. Everything is yours, and it is built to be found. |
| Naming system | A memorable name always paired with a plain label. The plain label is what titles, H1s and schema carry. |
| Tagline | "Your Unfair Advantage" stays. Kits are called **Advantage Kits**. |

### Six lines

| Name | Plain label | URL | One-line pitch |
|---|---|---|---|
| Engine | Web & App Development | `/services/web-and-app-development` | We build the thing your business runs on: websites, apps, stores, software. |
| Spark | Branding & Identity | `/services/branding` | How people see you: logo, look, voice. |
| Glow-Up | Website Redesign & Upgrades | `/services/website-redesign` | A makeover for what you already have: faster, better looking, sells more. |
| Spotlight | SEO & AI Search Visibility | `/services/seo-and-ai-search` | Get found on Google, and in ChatGPT's answers. |
| Autopilot | AI & Automation | `/services/ai-automation` | Work that runs itself: WhatsApp AI, chatbots, automations. |
| Pit Crew | Maintenance & Support Plans | `/services/maintenance-and-support` | We keep it fast, safe and updated every month. |

### Promises every kit carries

These six go on the home page as a comparison against the usual agency
pattern, and on every kit page as the fixed footer of "what you get".

1. **Price on the box.** Published "from" price, scope and timeline.
2. **One studio.** Brand, tech and growth on one team, one thread.
3. **The Loop.** 30 days after launch: measure with real data, fix, run one
   round of tune-ups, hand over. (Approved with the UVP section on 2026-10-13.)
4. **Built to be found.** Every build ships search-ready and AI-ready: speed,
   schema, sitemap, `llms.txt`, Search Console and Bing Webmaster set up.
5. **Yours from day one.** Domain, hosting, code, design files and accounts are
   created in the client's name. (Approved with the UVP section on 2026-10-13.)
6. **You talk to the builders.** The people on the call do the work.

## 3. Kit catalogue

Prices below are **proposals** set from 2026 India and global market ranges
(research sources in section 12). The owner sets the final figures before the
copy phase; the data model takes them from one file, so changing them is a
one-line edit each. INR is priced for the Indian market, not converted from USD.

> **Superseded 2026-10-14.** The owner chose entry-level starting prices:
> each kit now starts at the basic price of its own market, INR for
> businesses in India and USD everywhere else, with scope trimmed to match
> (fewer pages, products, screens or automations at the starting price; the
> rest are add-ons). `src/data/kits.js` and `src/data/plans.js` are the
> source of truth; the figures in the tables below are historical. Examples:
> Business Website $500 · ₹15,000, Brand Identity $400 · ₹10,000, Speed
> $250 · ₹8,000, Mobile App $5,000 · ₹1,50,000, Essentials $75/mo · ₹2,500/mo.

Wave 1 ships at launch. Wave 2 follows once wave 1 is live and indexed.

### Engine: Web & App Development

| Kit | Slug | Owns keyword | From | Timeline | Wave |
|---|---|---|---|---|---|
| Business Website Kit | `business-website` | business website development package | $1,500 · ₹60,000 | 3–4 wks | 1 |
| Online Store Kit | `online-store` | ecommerce website development cost | $3,000 · ₹1,20,000 | 4–6 wks | 1 |
| MVP Kit | `mvp` | MVP development for startups | $8,000 · ₹4,00,000 | 6–8 wks | 1 |
| Mobile App Kit | `mobile-app` | mobile app development cost | $10,000 · ₹5,00,000 | 8–12 wks | 1 |
| SaaS Kit | `saas` | SaaS development company | $15,000 · ₹8,00,000 | 10–14 wks | 2 |
| Custom Software Kit | `custom-software` | custom CRM / dashboard / internal tool development | $6,000 · ₹3,00,000 | 6–10 wks | 2 |
| Rescue Kit | `rescue` | fix legacy software, app rescue, monolith migration | $2,500 · ₹1,25,000 | 2 wk audit + plan | 2 |
| Cloud & DevOps Kit | `cloud-devops` | cloud and DevOps setup services | $3,000 · ₹1,50,000 | 2–4 wks | 2 |

### Spark: Branding & Identity

| Kit | Slug | Owns keyword | From | Timeline | Wave |
|---|---|---|---|---|---|
| Brand Identity Kit | `brand-identity` | brand identity design package, logo and branding price | $1,000 · ₹45,000 | 2–3 wks | 1 |
| Brand Launch Kit (flagship bundle: identity + business website + social kit + Google Business Profile) | `brand-launch` | branding and website package for new business | $3,000 · ₹1,30,000 (below the sum of its parts, as its FAQ claims) | 5–6 wks | 1 |
| Pitch Deck Kit | `pitch-deck` | pitch deck design service | $700 · ₹30,000 | 1–2 wks | 2 |
| Social Brand Kit | `social-media-brand` | social media branding kit, Instagram templates | $500 · ₹22,000 | 1–2 wks | 2 |

### Glow-Up: Website Redesign & Upgrades

| Kit | Slug | Owns keyword | From | Timeline | Wave |
|---|---|---|---|---|---|
| Website Glow-Up Kit | `website-glow-up` | website redesign cost, website makeover package | $2,000 · ₹80,000 | 3–5 wks | 1 |
| Speed Kit | `speed` | website speed optimization service, Core Web Vitals fix | $600 · ₹25,000 | 1–2 wks | 1 |
| Conversion Kit | `conversion` | conversion rate optimization service, UX audit | $1,200 · ₹50,000 | 3 wks | 2 |
| App Glow-Up Kit | `app-glow-up` | app UI UX redesign service | $3,000 · ₹1,25,000 | 4–6 wks | 2 |

### Spotlight: SEO & AI Search Visibility

| Kit | Slug | Owns keyword | From | Timeline | Wave |
|---|---|---|---|---|---|
| SEO Foundation Kit | `seo-foundation` | SEO setup package, technical SEO audit and fix | $800 · ₹35,000 | 2–3 wks | 1 |
| AI Visibility Kit | `ai-visibility` | GEO services, AI search optimization, get my business on ChatGPT | $1,000 · ₹45,000 | 2–3 wks | 1 |
| Local Visibility Kit | `local-visibility` | Google Business Profile optimization service, local SEO | $400 · ₹18,000 | 1–2 wks | 2 |
| Content Engine (monthly) | `content-engine` | SEO content writing service monthly | $700/mo · ₹30,000/mo | rolling | 2 |

AI Visibility Kit is the signature kit. logixloops.in itself is the live proof,
and the kit page says so with the measured results once there are any.

### Autopilot: AI & Automation

| Kit | Slug | Owns keyword | From | Timeline | Wave |
|---|---|---|---|---|---|
| WhatsApp AI Kit | `whatsapp-ai` | WhatsApp chatbot for business, WhatsApp AI agent | $1,200 · ₹50,000 + Meta message charges | 2–3 wks | 1 |
| AI Assistant Kit | `ai-assistant` | AI chatbot for website trained on your data | $1,800 · ₹75,000 | 3–4 wks | 1 |
| Workflow Automation Kit | `workflow-automation` | business workflow automation services, n8n / Zapier | $900 · ₹40,000 | 2–3 wks | 1 |
| Custom AI Agent Kit | `ai-agent` | custom AI agent development, AI voice agent | $5,000 · ₹2,50,000 | 6–8 wks | 2 |

### Pit Crew: Maintenance & Support Plans (monthly)

| Plan | Slug | Owns keyword | From | Wave |
|---|---|---|---|---|
| Essentials | `essentials` | website maintenance plan price | $150/mo · ₹6,000/mo | 1 |
| Growth | `growth` | website maintenance and SEO monthly | $500/mo · ₹20,000/mo | 1 |
| Squad | `squad` | dedicated development team monthly | $4,000/mo · ₹2,50,000/mo, 3-month minimum | 1 |

Plans live on the Pit Crew line page and on `/pricing`, not as `/kits/*` pages.

## 4. Information architecture

### New and changed routes

| Route | Status | Audience | Purpose |
|---|---|---|---|
| `/` | Rewrite | Non-tech first | Entity, UVP, six lines, featured kits, proof |
| `/services` | Rewrite | Mixed | Six lines overview (keeps `ServicesInertiaGrid` stage) |
| `/services/[line]` | New data, reused template | Mixed | Line page: what it is, kits in it, proof, "Under the hood", FAQ |
| `/kits` | New | Non-tech | Full catalogue grouped by line (server-rendered sections, no client filter), prices visible |
| `/kits/[kit]` | New | Non-tech top, tech bottom | Commercial landing page per kit |
| `/pricing` | Rewrite | Non-tech | Every kit and plan with prices, add-ons, what moves the price |
| `/work` | Edit | Mixed | Real client work tagged with the kits used; lab projects below |
| `/locations/jaipur` | New | Local | Jaipur and India local intent |
| `/locations/usa`, `/locations/uk`, `/locations/uae` | New | Global | Market pages |
| `/about` | Rewrite | Non-tech | Who builds it, why loops, the six promises |
| `/process` | Restructure | Mixed | Top: how a kit runs (plain). Bottom: existing methodology (tech) |
| `/technology`, `/security` | Light edit | Tech | Kept as the engineering-depth pages, linked from "Under the hood" |
| `/faq` | Rewrite | Mixed | New questions, one URL per question |
| `/contact` | Edit | All | Form gains a "Which kit?" select |
| `/blog` | Extend | Mixed | Existing deep-dives stay; cost guides added (section 7) |

### Redirects (308, in `next.config.mjs`)

| Old | New |
|---|---|
| `/services/web-development` | `/services/web-and-app-development` |
| `/services/mobile-apps` | `/services/web-and-app-development` |
| `/services/saas-platforms` | `/services/web-and-app-development` |
| `/services/enterprise-software` | `/services/web-and-app-development` |
| `/services/cloud-devops` | `/services/web-and-app-development` |
| `/services/ui-ux-design` | `/services/website-redesign` |
| `/services/ai-ml-solutions` | `/services/ai-automation` |
| `/services/automation-systems` | `/services/ai-automation` |

Old slugs point at line pages, not at wave 2 kits, so no redirect target is
ever missing. When a wave 2 kit ships, its old slug can be repointed to the kit.

### Navigation

Five top-level items: **Services** (mega-menu: six lines, each with name +
plain label), **Kits**, **Work**, **Pricing**, **Company** (About, Process,
Technology, Security, FAQ, Blog). Primary button: "Browse the kits".

Pricing moves to the top level because published prices are now the main
differentiator.

## 5. Page templates

All full-viewport heroes keep the PageHero + PageSurface contract. Detail
routes (`/kits/[kit]`, `/services/[line]`) keep compact heroes like the current
detail routes.

**No question-phrased section headings.** AEO is carried by the hero lead
sentence (answer-first), FAQ accordions, schema and declarative headings, never
by "What is X?" `h2` blocks under the hero. (Standing user decision.)

### Kit page `/kits/[kit]`

1. **Hero.** H1 = `<Kit name>: <plain promise>`, e.g. "Brand Identity Kit: logo,
   colours and brand guidelines for a new business". Lead = a 40–60 word
   answer-first summary: what you get, for whom, timeline, from price. Price
   and timeline chips. CTAs: "Start this kit" and "Ask a question".
2. **What's in the kit.** Deliverables checklist in plain words.
3. **Right for you if / not right if.** Honest fit, both lists.
4. **How it runs.** Week-by-week steps ending in The Loop (HowTo schema).
5. **Add-ons.** Each with its own price.
6. **Under the hood.** Collapsed by default, labelled for technical readers:
   stack, standards, what is tested, links to `/technology` and `/security`.
   Mounts an existing signature demo where one fits (mapping below).
7. **Proof.** Client work that used this kit, from `caseStudies.js`.
8. **FAQ.** 4–6 kit-specific questions, answer-first, accordion.
9. **Six promises strip + CTA.**

Signature demo reuse: `ViewportDemo` → Business Website, Speed. `PhoneScrollDemo`
→ Mobile App. `TenantDemo` → SaaS. `InferenceDemo` → AI Assistant.
`WorkflowDemo` → Workflow Automation. `TokensDemo` → Brand Identity.
`PipelineDemo` → Cloud & DevOps. `ArchitectureDemo` → Rescue. Kits with no fit
render no demo.

### Line page `/services/[line]`

Hero (name + plain label, answer-first lead), the problems this line solves in
plain words, kits in this line as priced cards, related work, "Under the hood",
FAQ, CTA. Replaces the current eight-service spine; the
`ServiceMaster*` components are reused where they fit and retired where they
do not.

### Location page `/locations/[market]`

Must carry content unique to that market so it is not a doorway page: time-zone
overlap and meeting hours, currency and invoicing, the privacy law that
applies (DPDP for India, UK GDPR, US state laws, UAE PDPL), payment methods,
the kits that market buys most, and relevant client work. Jaipur adds the
physical address, map and Google Business Profile link.

## 6. Home page

1. **Hero.**
   - H1, three fixed lines with the rotating word alone on line two:
     "Your next / [Brand · Website · Store · App · AI Agent] / comes in a kit."
   - Lead: "LogixLoops is a brand, tech and growth studio in Jaipur, building
     for businesses in India, the US, the UK and the UAE. Pick a kit, see the
     price upfront, and own everything we make."
   - CTAs: "Browse the kits" (`/kits`), "Talk to the people who build it" (`/contact`).
   - Three hero cards: **Price on the box** / **Yours from day one** /
     **Built to be found**.
2. **Marquee:** Your Unfair Advantage · Engine · Spark · Glow-Up · Spotlight · Autopilot · Pit Crew.
3. **WaveBend:** "We Build Brands [icon] That Get Found [icon] And Keep Growing".
4. **Six lines** grid, each card: name, plain label, one-line pitch, "from" price of its cheapest kit.
5. **Featured kits:** Brand Launch, Business Website, AI Visibility, WhatsApp AI, Website Glow-Up, MVP.
6. **Work:** the five client builds with the kits each used.
7. **The usual agency vs LogixLoops:** the six promises as a comparison table.
   Tables are among the formats AI answers lift most often.
8. **How a kit runs:** Pick, Kick-off, Build, Launch, The Loop (HowTo schema).
9. **FAQ preview, CTA banner.**

Home metadata title: "LogixLoops | Brand, Web, App & AI Studio in Jaipur".

## 7. Search strategy

### Entity definition (used verbatim in schema, `llms.txt`, About, footer)

> LogixLoops is a brand, technology and growth studio based in Jaipur, India.
> It sells fixed-scope Advantage Kits with published starting prices for
> websites, apps, branding, SEO and AI search visibility, and AI automation,
> for businesses in India, the US, the UK and the UAE.

### Keyword clusters and ownership

One primary keyword per URL. Line pages own the category head term, kit pages
own the "package / price / cost" and specific variant, blog posts own the
informational question. This prevents line and kit pages competing for the
same query.

- **A. Brand:** LogixLoops, LogixLoops Jaipur, LogixLoops kits, Advantage Kits.
- **B. Global head terms (long game):** branding agency, web development company,
  app development company, website redesign services, SEO agency, AI automation
  agency, GEO agency, digital studio. Owned by line pages.
- **C. Local (winnable now):** website development company in Jaipur, branding
  agency in Jaipur, app development company in Jaipur, SEO company in Jaipur,
  digital agency in Jaipur, IT company in Jaipur. Owned by `/locations/jaipur` and home.
- **D. Kit commercial long-tail (fastest wins):** the "owns keyword" column in section 3.
- **E. Global outsourcing:** hire web developers from India, outsource app
  development to India, offshore development team India, branding agency for
  UAE startups, web development company for UK small business. Owned by market pages.
- **F. Cost and how-to questions (AEO and blog):** how much does a website cost
  in 2026, logo design cost, app development cost in India, how to get my
  business mentioned by ChatGPT, what is GEO, WhatsApp AI agent cost, website
  maintenance cost, agency vs freelancer. Each becomes one blog cost guide or
  one FAQ answer, never both.

Search volumes were not available during research. Clusters must be checked in
Google Keyword Planner and, after launch, against Search Console queries;
wave 2 order follows the real data.

### On-site rules

- Every page's lead sentence answers the page's primary query in 40–60 words.
- Every price on the site is real and matches the kit data file.
- Schema: `ProfessionalService` + `Organization` entity with the new definition;
  `OfferCatalog` of kits with `Offer` + `PriceSpecification` (USD and INR,
  `minPrice`); `Service` per line and kit; `FAQPage`; `HowTo` on kit pages and
  home; `BreadcrumbList` everywhere.
- `llms.txt` generated at build time by a route (`src/app/llms.txt/route.js`) from the same line, kit and plan data the pages render, replacing the hand-written `public/llms.txt`, so it stays in sync with the sitemap by construction.
- Sitemap includes lines, kits, locations; `lastModified` from content dates,
  not build time.
- Voice rules from `docs/brand-voice-and-search.md` continue: no em-dashes in
  site content, banned vocabulary, numbers policy. Client metrics (e.g. Sire
  Media's campaign count) are always attributed to the client.
- Top half of every page in plain English (aim for reading age 12–14). Technical
  depth lives in "Under the hood", `/technology`, `/security`, `/process`
  bottom half and blog deep-dives.
- Line names never appear without their plain label nearby.

### Off-site work (owner's side, not code)

The site can win the on-page half. Ranking at the top also needs:

1. Google Business Profile verified and matching the site's NAP exactly.
2. Google Search Console and Bing Webmaster Tools, with the sitemap submitted.
   ChatGPT search draws on Bing's index.
3. Listings on Clutch, GoodFirms and DesignRush with matching NAP.
4. Reviews from the five clients on Google and Clutch.
5. A "Built by LogixLoops" credit link on client sites, where clients agree.
6. Written permission from clients to publish their metrics and quotes.
7. A monthly check of the same 20 buyer prompts in ChatGPT, Perplexity, Gemini
   and Claude, logged so changes are visible.

## 8. Content and data model

- `src/data/lines.js`: six lines (name, plain label, slug, pitch, problems,
  under-the-hood content, FAQs).
- `src/data/kits.js`: all kits (line, slug, name, plain promise, summary,
  prices `{ usd, inr, unit }`, timeline, deliverables, fit / not fit, steps,
  add-ons, under-the-hood, demo key, FAQs, related case-study slugs, wave).
- `src/data/plans.js`: Pit Crew plans.
- `src/lib/constants.js`: `BRAND.description`, `BRAND.definition`,
  `BRAND_TOPICS`, `NAV_LINKS`, `FOOTER_LINKS`, `SERVICES` replaced by line data.
- `src/data/services.js` retired once line pages read from `lines.js`.
- `src/data/caseStudies.js`: hype and banned words stripped, each study gains
  `kits: [...]`, client metrics attributed.
- `src/data/projects.js`: em-dashes and emoji removed from titles; presented as
  the studio's lab work, linked to Autopilot and Engine kits they prove.
- `docs/brand-voice-and-search.md`: rewritten for the new positioning first,
  since every later copy decision answers to it.

### Deletions (files only, no reachable URL is lost)

- `src/data/services.js`, once line pages read from `lines.js`.
- Unmounted home sections carrying fabricated content: `TestimonialsSection`,
  `FeaturedCaseStudySection`, `TrustedBySection`, `PricingSnapshotSection`,
  `ServicesBento`.
- `ReferenceBuildNotice` and the `demo` branches in `work/[slug]` and
  `lib/schema.js`: every case study is now real client work (`demo: false`).
- `ServiceMaster*` components that the line and kit templates do not reuse,
  decided during phase 2.

## 9. Delivery phases

The implementation plan breaks into these phases, each shippable:

1. **Foundation:** voice doc rewrite, data files (lines, kits, plans), constants, redirects.
2. **Kit and line templates** with wave 1 data.
3. **Home, navigation, footer, `/kits`, `/pricing`.**
4. **About, Work, Process, FAQ, Contact,** light edits to Technology and Security.
5. **Location pages.**
6. **Search pass:** schema, sitemap, `llms.txt`, metadata, then `/claude-rank:rank-audit`
   and `/claude-rank:rank-fix` over the new build.
7. **Wave 2 kits and blog cost guides,** ordered by Search Console data.

## 10. Verification

- `npm run build` and `npm run lint` pass.
- Grep over `src/` and `public/llms.txt`: no em-dashes in content strings, no
  banned vocabulary, no "reference build" or `/case-studies` leftovers.
- Every old `/services/*` URL returns 308 to its mapped line page.
- Every kit price rendered on a page equals the value in `kits.js`.
- Rich Results Test passes for a kit page, a line page and home.
- Sitemap and `llms.txt` list the same routes.
- Lighthouse on home and one kit page: no regression against current scores.
- `/claude-rank:rank-audit` run before and after phase 6, results compared.

## 11. Facts to confirm before the copy phase

1. Final kit prices (section 3 figures are proposals).
2. Team: is it still four people, and who covers brand design and growth work?
3. Which clients allow their name, metrics and a quote to be published.
4. Whether The Loop (defined for kits) also applies when a client starts on a Pit Crew Squad plan.

## 12. Research sources

- Productized service definition and kit examples: manyrequests.com/blog/productized-service-business-model, naloseed.com/pricing, webpopdesign.com/starter-websites
- India website cost ranges 2026: hostinger.com/in/tutorials/website-cost, fuzen.io/posts/website-development-cost-in-india, upgrowth.in/website-design-cost-guide-in-india
- GEO and AEO practice: yotpo.com/blog/chatgpt-seo-geo-tips, leapd.ai (how ChatGPT, AI Overviews and Perplexity source information), techtimes.com GEO 2026 guide
- WhatsApp Business AI launch in India, May 2026: medianews4u.com
- Jaipur competitor landscape: clutch.co/in/agencies/digital-marketing/jaipur
- AEO agencies in India: goodfirms.co/company/inceptise, onecity.co.in/Services
