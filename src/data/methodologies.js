/**
 * LOGIXLOOPS: Software development lifecycle models
 *
 * Source data for the /process page's methodology explorer. Each model
 * carries a `shape`, which is what `LifecycleDiagram` draws: the geometry is
 * the argument. Waterfall is a line because it only goes one way; the V is
 * folded because every design level has a test level facing it; Scrum is a
 * ring because it has no end; DevOps is a lemniscate because build and
 * operate feed each other forever.
 *
 * `stance` is our own position, not a property of the model:
 *   core, used on every engagement
 *   selective, used when a specific signal calls for it
 */
export const SDLC_MODELS = [
  {
    id: "waterfall",
    name: "Waterfall",
    era: "1970 · Royce",
    icon: "waterfall_chart",
    tagline: "One pass, gated.",
    shape: "linear",
    stance: "selective",
    summary:
      "Every phase is finished, signed off and frozen before the next one starts. The plan is written once, up front, and the project's job is to execute it faithfully.",
    stages: ["Requirements", "Design", "Build", "Verify", "Maintain"],
    strengths: [
      "Scope, cost and date can be fixed in a contract before work begins",
      "Documentation is a deliverable, not an afterthought",
      "Every gate leaves a signed artefact, so the trail is auditable",
      "Fits fixed-bid procurement and public-sector tendering",
    ],
    risks: [
      "Working software appears last, so the first honest feedback is also the most expensive",
      "A requirement that was wrong in month one stays wrong until acceptance testing",
      "Change control turns adversarial, every correction becomes a variation order",
      "Testing gets compressed into whatever time the build overran by",
    ],
    bestFor:
      "Externally fixed scope: regulatory rewrites, contractual integrations, migrations with an immovable cutover.",
    verdict:
      "We run it only where the requirement genuinely cannot move. Even then the build behind the gate stays iterative, the plan is fixed, the way we hit it is not.",
  },
  {
    id: "v-model",
    name: "V-Model",
    era: "1980s · Verification & Validation",
    icon: "rule",
    tagline: "Every design level has a test facing it.",
    shape: "vmodel",
    stance: "selective",
    summary:
      "Waterfall folded in half. Each design activity on the way down is paired with the test level that proves it on the way up, and that test is written when the design is, not after the code exists.",
    stages: [
      "Requirements",
      "System Design",
      "Module Design",
      "Unit Test",
      "Integration",
      "Acceptance",
    ],
    strengths: [
      "Coverage is designed rather than discovered, every specification has a named proof",
      "Traceability falls out of the process, which is exactly what auditors ask for",
      "Defects are attributed to a design level, so the fix lands at the right altitude",
    ],
    risks: [
      "Inherits Waterfall's rigidity: the V has no return path",
      "Heavy documentation cost for products whose requirements are still hypotheses",
      "Slow to a first release, and the first release is where learning starts",
    ],
    bestFor:
      "Safety- and compliance-critical software, medical, avionics, payments, anything a regulator inspects line by line.",
    verdict:
      "We take the pairing, not the rigidity. Acceptance criteria are written alongside the requirement, before the sprint that implements it. Same discipline, no frozen plan.",
  },
  {
    id: "spiral",
    name: "Spiral",
    era: "1986 · Boehm",
    icon: "cyclone",
    tagline: "Spend on the biggest unknown first.",
    shape: "spiral",
    stance: "selective",
    summary:
      "Risk-driven. Each loop names the largest remaining unknown, builds the cheapest artefact that resolves it, and only then releases budget for the next loop outward.",
    stages: ["Objectives", "Risk Analysis", "Prototype", "Evaluate", "Commit"],
    strengths: [
      "Kills expensive unknowns while changing course is still cheap",
      "Budget is released per loop, so a failing premise stops the spend early",
      "Prototypes are explicitly disposable, so nobody ends up defending one",
    ],
    risks: [
      "Needs real risk-assessment skill; done badly it is just slow Waterfall",
      "Open-ended by construction, which makes it hard to quote as a fixed price",
      "Nobody knows the loop count at the start, including you",
    ],
    bestFor:
      "Work whose hardest question is technical rather than functional: novel ML systems, high-throughput data platforms, unproven third-party integrations.",
    verdict:
      "Our discovery phase is a Spiral in all but name, timeboxed spikes against the two or three assumptions that would invalidate the architecture, run before any production code exists.",
  },
  {
    id: "agile",
    name: "Agile / Scrum",
    era: "2001 · Agile Manifesto",
    icon: "autorenew",
    tagline: "Fixed cadence, moving scope.",
    shape: "cycle",
    stance: "core",
    summary:
      "Scope is a living backlog rather than a signed document. Work is pulled into fixed-length sprints, and every sprint ends with something demonstrable plus an explicit invitation to change direction.",
    stages: ["Backlog", "Sprint Plan", "Build", "Demo", "Retro"],
    strengths: [
      "Feedback arrives every two weeks instead of every two quarters",
      "Priority can change at any sprint boundary at no contractual cost",
      "Forecasts come from measured throughput rather than from optimism",
      "Retrospectives make the process itself something the team is allowed to fix",
    ],
    risks: [
      "Without a scope ceiling, 'agile' quietly becomes a licence for drift",
      "Ceremony overhead is real, run badly, a team loses a day a week to meetings",
      "Long-horizon architecture gets deferred until deferring it is expensive",
      "Requires a genuinely available product owner. This is the usual failure point",
    ],
    bestFor:
      "Product work where the requirement is a hypothesis: new platforms, user-facing systems, anything with a real user to learn from.",
    verdict:
      "Our default. Two-week sprints, one accountable product owner on your side, a demo at the end of every iteration. It is the only model where the cost of being wrong stays bounded to a fortnight.",
  },
  {
    id: "kanban",
    name: "Kanban",
    era: "Toyota Production System · software from 2007",
    icon: "view_kanban",
    tagline: "Flow, capped work in progress.",
    shape: "lanes",
    stance: "core",
    summary:
      "Continuous flow instead of iterations. Work is visualised on a board, in-progress work is capped per column, and the governing metric is cycle time rather than story points.",
    stages: ["Backlog", "Ready", "In Progress", "Review", "Done"],
    strengths: [
      "No sprint boundary to wait for, urgent work starts the moment capacity frees",
      "WIP limits force bottlenecks into the open instead of letting them hide inside 'in progress'",
      "Cycle time and throughput are measured directly, so forecasting needs no estimation ritual",
      "Close to zero ceremony overhead",
    ],
    risks: [
      "No natural cadence for review, so feedback has to be scheduled deliberately",
      "Weak at coordinating a large, dated release across several teams",
      "Drifts into a permanent queue with no goal unless someone owns the board",
    ],
    bestFor:
      "Unbounded arriving work: production support, maintenance retainers, platform teams, incident-heavy operations.",
    verdict:
      "Everything post-launch runs on Kanban. Support and hardening work arrives unpredictably, and forcing it into sprints buys you either idle capacity or broken commitments.",
  },
  {
    id: "devops",
    name: "DevOps / Continuous Delivery",
    era: "2009 · Debois, Allspaw & Hammond",
    icon: "all_inclusive",
    tagline: "The pipeline is a product.",
    shape: "infinity",
    stance: "core",
    summary:
      "Not a replacement for Agile, its delivery half. Every change is releasable, the pipeline is owned and versioned like application code, and the loop closes with production telemetry feeding the next plan.",
    stages: [
      "Plan",
      "Code",
      "Build",
      "Test",
      "Release",
      "Deploy",
      "Operate",
      "Observe",
    ],
    strengths: [
      "Release becomes a non-event: small, frequent, reversible",
      "Recovery time collapses, because rollback is one pipeline run",
      "Operational feedback reaches the people who wrote the code, unfiltered",
      "Infrastructure changes get the same review as application changes",
    ],
    risks: [
      "Real upfront automation investment before any of it pays back",
      "Needs genuine test coverage, continuous delivery without it just ships defects faster",
      "It is a culture, not a toolchain. Buying the tools alone changes nothing",
    ],
    bestFor:
      "Anything with an operational lifetime, which in practice means everything we ship.",
    verdict:
      "Non-negotiable on every engagement. Trunk-based development, automated gates, zero-downtime deploys, and an observability baseline that ships with release one rather than after outage one.",
  },
];

/**
 * The read → choice mapping. This is the part clients actually want: not
 * "we are agile", but what makes us pick something else.
 */
export const SELECTION_SIGNALS = [
  {
    icon: "gavel",
    signal: "A regulator or a contract owns the requirement",
    read: "The specification is not ours to renegotiate, and someone will audit the trail.",
    choose: "V-Model assurance over an Agile core",
    why: "Acceptance criteria are authored with the requirement and traced to a named test, so evidence is a by-product of building rather than a scramble before the audit.",
  },
  {
    icon: "science",
    signal: "The hardest unknown is technical, not functional",
    read: "We know what it should do. We do not yet know whether the architecture can do it at this volume.",
    choose: "Spiral spikes before commitment",
    why: "A two-week disposable prototype that disproves an architecture is the cheapest artefact on the whole project. Committing a delivery team to it first is the most expensive.",
  },
  {
    icon: "groups",
    signal: "Real users exist and can be observed",
    read: "The requirement is a hypothesis, and there is a fast way to test it.",
    choose: "Scrum on a two-week cadence",
    why: "Every sprint boundary is a free chance to change direction. Any model with a longer feedback loop is paying more for the same information.",
  },
  {
    icon: "inbox",
    signal: "Work arrives unpredictably and never ends",
    read: "There is no release to plan toward, there is a queue, and it refills.",
    choose: "Kanban with hard WIP limits",
    why: "Sprint commitments and unplanned incidents cannot both be honoured. Flow metrics tell you what the queue actually costs; velocity on interrupted sprints tells you nothing.",
  },
  {
    icon: "event_available",
    signal: "The cutover date is immovable and scope is known",
    read: "Migration, decommission, or a compliance deadline with a hard edge.",
    choose: "A Waterfall plan with an iterative build behind it",
    why: "The plan has to be fixed because the date is. The construction inside it does not, so we keep sprint demos and CI running under a gated schedule.",
  },
  {
    icon: "all_inclusive",
    signal: "The system has to stay up while it changes",
    read: "There are users on it right now, and there will be during the next deploy.",
    choose: "Continuous delivery, unconditionally",
    why: "Deployment risk scales with batch size. Small reversible releases are the only mechanism that makes a change window boring, and boring is the target.",
  },
];

/**
 * The blend we actually ship. Four lifecycle stages, each governed by the
 * model that is strongest there rather than by one model applied everywhere.
 */
export const OUR_BLEND = [
  {
    stage: "Discovery",
    model: "Spiral",
    icon: "cyclone",
    detail:
      "Risk-first. Timeboxed spikes against the assumptions that would invalidate the architecture, before a delivery team is committed.",
  },
  {
    stage: "Delivery",
    model: "Scrum",
    icon: "autorenew",
    detail:
      "Two-week sprints, demonstrable increment every time, backlog re-ranked at every boundary by a single accountable owner.",
  },
  {
    stage: "Assurance",
    model: "V-Model pairing",
    icon: "rule",
    detail:
      "Every requirement ships with the test that proves it, authored at the same time. Traceability is a by-product, not a phase.",
  },
  {
    stage: "Operations",
    model: "Kanban + CD",
    icon: "view_kanban",
    detail:
      "Flow-based support with WIP limits, riding a trunk-based pipeline that makes every deploy small, gated and reversible.",
  },
];

/** The commitments that cost us work, listed because they are the useful part. */
export const PROCESS_ANTIPATTERNS = [
  {
    title: "Scrum with no product owner",
    detail:
      "If nobody on your side can rank the backlog and accept work inside the sprint, the ceremony is theatre. We will ask for the person before we quote the cadence.",
  },
  {
    title: "Fixed-bid work sold as agile",
    detail:
      "Fixed scope, fixed price and fixed date is a Waterfall contract. We will name it as one rather than promise flexibility the commercial terms forbid.",
  },
  {
    title: "Continuous delivery without tests",
    detail:
      "A pipeline with no meaningful coverage is a machine for shipping defects at speed. Coverage comes first, automation second.",
  },
  {
    title: "Observability retrofitted after the incident",
    detail:
      "Tracing, metrics and structured logs ship with the first release. Instrumenting a system while it is on fire is the most expensive time to do it.",
  },
];
