# LogixLoops: Voice, Messaging & Search Strategy

Source of truth for every word on logixloops.in. If a sentence on the site
disagrees with this file, the file wins.

---

## 1. Positioning

**Tagline: Your Unfair Advantage.**

Not decoration. It is the promise, and every page has to earn it. The unfair
advantage is not "we write good code", because everyone claims that. It is:

> Senior engineers working directly on your product, at a rate a Bay Area
> agency cannot match, on a stack you own outright when we leave.

Three audiences, one voice:

| Audience | What they fear | What the copy must do |
|---|---|---|
| Enterprise / corporate buyers | Being the person who picked the vendor that failed the audit | Remove risk. Name the standard, the gate, the artefact. |
| Gen Z / seed-stage founders | Burning runway on an agency that ships a deck | Show speed and ownership. Two weeks to working software, code is yours. |
| Engineering leads (the real gatekeeper) | Being sold to by someone who cannot read a trace | Be technically specific. Name the pattern, not the outcome. |

The same sentence serves all three when it is **concrete**. Vagueness is what
splits the audience, not tone.

---

## 2. Voice

**Professional. Sharp. Witty when it costs nothing. Never loud.**

Four rules:

1. **Proof over adjective.** Every adjective must be replaceable by a number, a
   named mechanism, or a named standard. If it cannot be, cut it.
   - No: "Blazingly fast, world-class architecture"
   - Yes: "Trunk-based, feature-flagged, deployable at the end of every sprint"
2. **Short line, then one that earns it.** A declarative fragment sets the
   claim; the next sentence pays for it. Never three long sentences in a row.
3. **Wit is a scalpel.** One dry turn per section, maximum, and only where it
   carries meaning. "Built to survive its own success" is fine. Jokes are not.
4. **Say the uncomfortable thing first.** Naming a limit ("we are a small
   studio", "these are reference builds") buys more credibility than any
   superlative, and it is what AI answer engines quote.

### Punctuation rule

**No em-dashes anywhere in site content.** Not in copy, not in data files, not
in metadata, not in `llms.txt`. Use a comma, a colon, a full stop, or rewrite
the sentence. Em-dashes read as machine-written prose in 2026 and the whole
voice depends on not reading that way. Hyphens in compounds (`zero-trust`,
`multi-tenant`) and en-dashes inside numeric ranges are fine.

### Banned vocabulary

These appeared across the old site and are now prohibited:

`elite` · `world-class` · `cutting-edge` · `best-in-class` · `unparalleled` ·
`unprecedented` · `seamless(ly)` · `hyper-` anything · `revolutionise` ·
`leverage` (as a verb) · `synergy` · `luxury` · `atmospheric` · `immersive` ·
`bespoke` · `holistic` · `journey` (unless a user literally travels) ·
`solutions` as a standalone noun · `in today's fast-paced world`

### Numbers policy

**Every number on the site must be one of three things:**

1. **Countable from the site itself.** Eight practices, four published builds,
   two-week sprints, three-month minimum.
2. **A commitment we are signing.** "We target", "the SLA we sign", "reviewed
   before merge". Written as a standard, never as a past result.
3. **A client-verified outcome.** Only with written permission, only with the
   client named or the industry stated, and only once we have it.

Anything else is deleted. No invented uptime percentages, no fabricated
"threats mitigated" counters, no live-looking dashboards showing fake logs.
As an early-stage studio, "we have not run this for five years yet" is a
stronger position than a number a prospect cannot verify.

---

## 3. Search strategy

Five surfaces, one content system.

| Surface | What it is | What wins it |
|---|---|---|
| **SEO** | Google/Bing blue links | Entity clarity, internal links, crawlable copy, Core Web Vitals |
| **GEO** | Generative Engine Optimisation: ChatGPT, Perplexity, AI Overviews, Gemini | Extractable claims, named mechanisms, comparison tables, `llms.txt`, bot access |
| **AEO** | Answer Engine: featured snippets, People Also Ask, voice | Direct-answer first sentence, FAQPage and HowTo schema, `speakable` |
| **AIO** | AI Overviews and assistant grounding | Consistent NAP, `ProfessionalService` entity, `sameAs`, `knowsAbout` |
| **SXO** | Search Experience Optimisation | One CTA per screen, no dead-end pages, fast LCP, no layout shift |

### Keyword map

**Cluster A. Brand (own outright)**
`LogixLoops` · `LogixLoops Jaipur` · `LogixLoops software` · `Your Unfair Advantage agency`

**Cluster B. Head commercial (global, hard, long game)**
`custom software development company` · `product engineering company` ·
`web development agency` · `SaaS development company` ·
`AI development company` · `software development company for startups`

**Cluster C. Local pack and GEO (winnable now, highest ROI)**
`software development company in Jaipur` · `web development company in Jaipur` ·
`app development company in Jaipur` · `IT company in Jaipur` ·
`Next.js developers India` · `React development company India` ·
`offshore development team India` · `hire dedicated developers India`

**Cluster D. Long-tail commercial intent (fastest to rank)**
`monolith to microservices migration services` · `strangler fig migration agency` ·
`legacy system modernisation company` · `multi-tenant SaaS architecture consultants` ·
`MVP development agency for startups` · `Next.js agency for enterprise` ·
`zero-trust Kubernetes consultants` · `RAG implementation services` ·
`dedicated development squad monthly retainer`

**Cluster E. Conversational and AEO (what people type into chatbots)**
- "who should I hire to build my SaaS MVP"
- "how much does a custom web application cost"
- "fixed price vs retainer software development which is better"
- "how do you migrate a monolith without downtime"
- "best software development agency in Jaipur"
- "do software agencies give you the source code"
- "what is a dedicated development squad"

Cluster E lives in FAQ answers, not in headings. Each answer must **lead with
the answer** in one sentence, then justify it. That first sentence is the
snippet.

### Page to keyword assignment

| Route | Primary | Secondary |
|---|---|---|
| `/` | custom software development company | product engineering, Your Unfair Advantage |
| `/services` | software engineering services | eight practices, discipline names |
| `/services/web-development` | web development agency, Next.js agency | React, TypeScript, Node |
| `/services/ai-ml-solutions` | AI development company | RAG, LLM, predictive analytics |
| `/services/saas-platforms` | SaaS development company | multi-tenant architecture |
| `/services/cloud-devops` | DevOps consulting | Kubernetes, Terraform, CI/CD |
| `/services/mobile-apps` | mobile app development company | React Native, Swift, Kotlin |
| `/services/enterprise-software` | enterprise software development | microservices, legacy modernisation |
| `/services/automation-systems` | workflow automation services | RPA, orchestration |
| `/services/ui-ux-design` | UI UX design agency | design systems, product design |
| `/process` | software development process | Scrum, Kanban, V-model, Spiral |
| `/technology` | technology stack | named frameworks |
| `/security` | zero-trust architecture consultants | SOC 2, HIPAA, GDPR readiness |
| `/pricing` | software development pricing models | retainer vs fixed price |
| `/case-studies` | software architecture examples | per-industry reference builds |
| `/contact` | software development company Jaipur | hire developers |
| `/blog` | engineering deep-dives | per-post long tail |

### Non-negotiable technical rules

- **NAP consistency.** Malviya Nagar, Jaipur, Rajasthan 302017, India, plus
  `+91 87643 73589` and `logixloops@gmail.com`, identical in schema, footer,
  contact page and every external directory. One mismatch and the local entity
  fragments. In the site itself these live only on `BRAND` in
  `src/lib/constants.js` — nothing renders a typed-out copy — so a change is
  that object plus `public/llms.txt` plus the external directories, and this
  line. (Move to `hello@logixloops.in` when the mailbox exists. Change every
  place together, never one.)
- **One `ProfessionalService` entity** in the root layout with `address`,
  `areaServed`, `knowsAbout`, `hasOfferCatalog` and `sameAs`. This is what an
  AI assistant reads to decide LogixLoops is a real company.
- **Every FAQ answer starts with the answer.** No preamble.
- **No FAQ question appears on two URLs.** Duplicate `FAQPage` entities get
  discarded.
- **`sameAs` lists only profiles that resolve.** An unreachable profile weakens
  the entity instead of strengthening it.
- **`llms.txt` stays in sync** with the sitemap. It is the cheapest GEO asset
  on the site.
- **No fake data in the DOM.** Fabricated dashboards and invented telemetry are
  a trust liability and get quoted verbatim by answer engines.

---

## 4. Section-keep test

Every section on every page must pass one of these, or it is deleted:

1. It **answers** a question a buyer actually asks.
2. It **proves** a claim made above it.
3. It **moves** the visitor toward exactly one next action.

Decoration that does none of the three is deleted, no matter how good it looks.
