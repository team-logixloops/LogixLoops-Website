# Homepage copy — rewrite

Positioning: the studio founders and CTOs call when a live product has outgrown
the way it was built. Everything below is written to be checkable. Nothing
claims a number we cannot show, and the one composite story is labelled as one.

---

## 1. Hero

**Overline:** Senior engineering studio · Jaipur · India, US, UK, UAE

# We fix the systems you're scared to touch.

Founders come to us with a product that works and a codebase that no longer
does: deploys nobody wants to run on a Friday, a schema three pivots deep, one
engineer who understands billing. We make it stable, documented and safe to
change — then hand you every line of code, every key and every decision, and
leave.

- Senior engineers only. Nobody learns on your production database.
- Every consequential choice recorded as a decision record, so the reasoning
  outlives whoever wrote it — including us.

**Your unfair advantage: a system that survives its own success, and holds up
in the room where it's diligenced.**

**Primary CTA:** Book 45 minutes with a senior engineer
**Secondary CTA:** Read a decision record we actually shipped

**Under the buttons:** No sales call. You leave with a written architecture
brief you can use even if you never hire us.

---

## 2. Why teams like yours choose LogixLoops

> **Not shipped as a section.** A page that announces it is the right choice is
> already losing that argument, so this material is distributed instead of
> declared — the reader should arrive at the conclusion without being handed
> it. Where each point landed:
>
> | Point | Lives in |
> |---|---|
> | Stops breaking when it grows | Hero pillar 1, Hardening step |
> | You stop being on-call | Hardening step, ADR card checklist |
> | You own all of it | Hero pillar 3, Handover step |
> | You talk to the engineer | Hero CTA button, closing CTA |
> | Decisions written down | Hero h1 → the ADR card section |
> | Security story ready | Hero pillar 2 |
>
> The copy below is kept as the source the shipped lines were cut from, and as
> the brief for sales decks and outbound, where declaring it *is* the format.

*Section intro:* Six things change once we're in the codebase. Each one is
something you'll notice, not something we believe about ourselves.

**Your product stops breaking when it grows.**
We find the ceiling before your traffic does — load-tested against modelled
peak, then broken on purpose to see what fails first, and how loudly.

**You stop being the on-call engineer.**
Runbooks for the failures we know about, alerts that fire on symptoms your
users feel, and a pipeline that rolls back in one run. The 3am page should
reach someone with a document, not you and your memory.

**You own all of it, the day we finish.**
Source, infrastructure, pipelines, credentials, IP. No proprietary wrapper you
have to keep paying for, no repository we hold, no clause that makes leaving
expensive. Our exit is designed before the work starts.

**You talk to the engineer who will do the work.**
The person on your first call is the person reading your code the following
week. There is no account manager translating between you and a delivery team
you've never met.

**Every consequential decision is written down — with the option that lost.**
Architecture decision records: what was chosen, what was rejected, and why.
When your next hire asks why the database looks like that, the answer is in the
repository instead of in a Slack thread nobody can find.

**Your security story is ready before the questionnaire is.**
Zero-trust by default: least privilege, secrets out of code, tenant isolation
enforced at the database rather than remembered in application logic. The first
enterprise deal shouldn't trigger a six-week scramble.

---

## 3. Who we're for — and who we're not

> **Not shipped as a section either.** Qualification reads as gatekeeping when
> it's a heading and as confidence when it's a clause. The hero paragraph does
> the same work in six words — *"live SaaS and B2B products that have outgrown
> the way they were built"* — and a founder who isn't that self-selects out
> without being told to. The "who we're not" half moved into the closing CTA:
> *"if we are not the right fit we will say so on the call."*

We do our best work with SaaS and B2B teams who already have a live product,
real customers, and a system that has quietly become harder to change than it
was to build. Usually there's revenue, an accumulating list of things nobody
wants to touch, and a board conversation coming about whether it will hold.

We're not the cheapest quote you'll get, and we don't do throwaway prototypes,
staff-augmentation-by-the-seat, or five-day MVPs. If speed at any cost is the
requirement, someone else is a better fit — and we'll say so on the call rather
than after the contract.

---

## 4. How we work

Six phases. For each one: what it addresses, what you keep, and what it takes
off the table. The full eight-stage version lives on the process page.

**1. Discovery — before anyone describes the system to us**
We read the code and the infrastructure first, then compare it to how you
believe it works. That gap is usually where the outages live.
*You walk away with:* a written map of the system, the constraints stated as
constraints, and success reduced to a number someone will be measured on.
*Risk removed:* you stop paying for work aimed at the wrong problem.

**2. Architecture — the decisions, and the ones we rejected**
Service boundaries drawn along the seams of the data, not the org chart. Every
consequential choice gets a decision record.
*You walk away with:* an architecture you can hand to an auditor, a new hire,
or a technical due-diligence team, with the trade-offs written down.
*Risk removed:* no more decisions whose reasoning left with the person who made
them.

**3. Design — workflows, walked by the people who run them**
Complex screens get prototyped and driven by someone who'll use them daily,
before they're built.
*You walk away with:* tokens and components, not a folder of screenshots.
*Risk removed:* the expensive rework that starts with "this isn't how the team
actually does it."

**4. Engineering — two-week sprints against a backlog you rank**
Trunk-based, feature-flagged, reviewed. You set priority; we tell you the cost
and what it displaces.
*You walk away with:* running software every two weeks — not a status deck.
*Risk removed:* you always know where the project is, because you can use it.

**5. Hardening — we break it before your users do**
Load tests against modelled peak, dependencies killed deliberately, failure
paths exercised.
*You walk away with:* known limits, tuned alerts, and runbooks for the failures
we caused on purpose.
*Risk removed:* the first time a dependency dies is never in production.

**6. Handover — the part most studios leave vague**
Progressive rollout, one-run rollback, telemetry from the first release. Then
the repository, the runbooks, the infrastructure and the keys.
*You walk away with:* a system your own team can operate without us, and a
written record of why it is the way it is.
*Risk removed:* the lock-in that turns a vendor into a dependency.

---

## 5. Two decisions, and what they cost or saved

### Tenant isolation, written down before it was enforced

**The situation.** A multi-tenant SaaS on shared Postgres, with tenant filtering
applied in application code. Enterprise prospects had started asking for the
isolation guarantee in writing, and the honest answer was that it held as long
as every query remembered to include the filter.

**The decision.** Row-level security, with the tenant ID forced at the
connection rather than passed by the application. Every query runs under a
tenant role. A missing policy fails closed instead of quietly returning
somebody else's data.

**What we rejected, and why.** A schema per tenant — migrations become O(n) and
each new customer slows every release. A database per tenant — clean, and the
cost curve breaks the business model well before the customer count does.

**What it changed for the founder.** The isolation guarantee became something
they could put in a contract instead of a caveat. Security questionnaires stopped
being engineering projects. And because the boundary is in the database, moving
a single large tenant onto dedicated infrastructure later is a migration, not a
rewrite.

*This is ADR-0014 in the repository. The full text is on the SaaS platforms
page.*

### A deploy pipeline nobody wanted to run

*Composite of engagements we've run, described as a pattern rather than
attributed to a client.*

**The situation.** Releases went out by hand, on a good day, by one person, and
never on a Friday. Rollback meant redeploying an older commit and hoping the
migrations were reversible. Shipping had become a risk decision instead of a
routine one.

**The decision.** One pipeline, one command, one path to production: migrations
separated from deploys and made forward-compatible, releases gated behind
feature flags, and a rollback that runs to completion in a single step.
Telemetry on the release itself, so a bad deploy announces itself rather than
being discovered by a customer.

**What it changed for the founder.** Deploys stopped being events. The team
shipped smaller changes more often, which is the only reliable way to make
failures small. And the release process became something a new engineer could
run in their first week — because it's documented, and because it's the same
every time.

---

## 6. The numbers we'll stand behind

| | |
|---|---|
| **2 wks** | to working software you can use |
| **8** | engineering practices, every one documented on `/process` |
| **100%** | of the code, infrastructure and IP is yours |
| **1 day** | to reply, every enquiry |

*Two counts you can verify on this site, and two commitments you can hold us
to. We'd rather sign those than report a statistic you can't check.*

---

## 7. Call to action

## Bring us the part you've been avoiding.

Forty-five minutes with a senior engineer — the one who'd do the work, not a
salesperson. Tell us what's fragile. You'll leave with a written architecture
brief: what we'd change first, what we'd leave alone, and what it would cost to
be wrong.

It's yours to keep and act on, with us or without us. And if we're not the
right fit, we'll tell you on the call.

**Primary CTA:** Book the 45 minutes
**Secondary CTA:** See how we work

**Reassurance line:** Based in Jaipur, working with teams in India, the US, the
UK and the UAE. We reply within one business day.

---

## Implementation notes

**Metadata**

- Title: `LogixLoops | Senior Software Engineering Studio in Jaipur`
- Description: *We fix fragile, overgrown SaaS and B2B systems. Senior
  engineers, decisions documented, full handover. Jaipur-based, working with
  teams in India, the US, the UK and the UAE.*

**Internal links to place in body copy** (one per section, in prose, not as a
link farm):

| Section | Anchor text | Target |
|---|---|---|
| Hero secondary CTA | a decision record we actually shipped | `/services/saas-platforms` |
| Why us — ownership | designed before the work starts | `/pricing` |
| Who we're for | already have a live product | `/case-studies` |
| How we work intro | the full eight-stage version | `/process` |
| Case study 1 | ADR-0014 | `/services/saas-platforms` |
| Case study 2 | one pipeline, one command | `/services/cloud-devops` |
| Numbers band | every one documented | `/process` |
| Final CTA secondary | See how we work | `/process` |

**What shipped, and where**

| File | Change |
|---|---|
| `HeroSection.jsx` | h1 is now *"We fix the [Systems / Deploys / Migrations / Integrations] you're scared to touch."* Rotating-word mechanic unchanged. Paragraph is problem-first and still carries category, services and the four markets. Tagline moved below the paragraph as its own line. Pillar details reframed as outcomes. Primary button names the length and who's on the call. |
| `ProcessSection.jsx` | All six step descriptions rewritten to end on the artefact the client keeps. |
| `CtaBanner.jsx` | Added *"and if we are not the right fit we will say so on the call."* Site-wide, deliberately. |
| `StatsSection.jsx` | Reveal-clipping fix only, no copy change. |

Sections 5 and 6 of this document have no home on the page yet. The tenant
isolation story is already told by the ADR card in
`FeaturedSolutionsSection.jsx`; the pipeline story and the numbers table are
unplaced.

**Content-quality checks applied**

- No duplicate blocks: the "how we work" step text is a shorter, distinct
  rewrite of the process page, not a copy of it.
- No thin sections: every heading carries at least two sentences of substance.
- Reading level: short sentences, concrete nouns, no "end-to-end", "digital
  transformation", or "cutting-edge".
- Every claim maps to something already promised elsewhere on the site
  (handover, ADRs, sprint cadence, reply time) so the copy and the delivery
  commitments can't drift.
