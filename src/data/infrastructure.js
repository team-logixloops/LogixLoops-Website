/**
 * LOGIXLOOPS: Infrastructure & Engineering Data Layer
 * Provides data for the /process, /technology, and /security ecosystems.
 */

/**
 * The eight phases of a LOGIXLOOPS engagement.
 *
 * Each phase carries the lifecycle model that governs it (`governedBy`), the
 * cadence it runs at, the artefacts it hands to the next phase, and the
 * condition that has to be true before it is allowed to. The /process
 * scrollytelling timeline reads all of it; the shorter `description` is what
 * survives on small screens.
 */
export const ENGINEERING_WORKFLOW = [
  {
    phase: "01",
    title: "Discovery & Strategic Alignment",
    description: "Deep technical audits of existing legacy systems, establishing KPIs, and defining the architectural North Star.",
    icon: "radar",
    governedBy: "Spiral, risk-first",
    cadence: "2–3 weeks",
    detail:
      "We start from the assumptions that would be most expensive to be wrong about, not from the feature list. Legacy systems are read rather than described to us, constraints are written down as constraints, and success is reduced to numbers somebody is willing to be measured on.",
    deliverables: ["System audit", "KPI baseline", "Risk register", "North-star architecture brief"],
    exit: "Every architecture-invalidating assumption has been tested or explicitly accepted.",
  },
  {
    phase: "02",
    title: "System Architecture",
    description: "Mapping data topologies, defining microservices boundaries, and selecting the optimal tech stack for massive scalability.",
    icon: "account_tree",
    governedBy: "Spiral → gated design",
    cadence: "1–2 weeks",
    detail:
      "Service boundaries are drawn along the seams of the data, not the org chart. Every consequential choice, datastore, transport, consistency model, deployment topology, is recorded as an ADR with the alternatives that lost and the reason they lost.",
    deliverables: ["Topology diagram", "Service boundary map", "ADR set", "Stack decision record"],
    exit: "Load, failure and scaling behaviour are modelled before implementation begins.",
  },
  {
    phase: "03",
    title: "UX & Product Systems",
    description: "Wireframing complex workflows to reduce cognitive load for enterprise users. High-fidelity prototyping.",
    icon: "design_services",
    governedBy: "Iterative prototyping",
    cadence: "2 weeks, overlapping build",
    detail:
      "Enterprise interfaces fail on cognitive load long before they fail on aesthetics. Complex workflows are prototyped and put in front of the people who will run them daily, and the design system is built as tokens and components rather than as screens.",
    deliverables: ["Workflow wireframes", "Interactive prototype", "Design token set", "Component inventory"],
    exit: "The critical path has been walked by a real operator without a facilitator explaining it.",
  },
  {
    phase: "04",
    title: "Sprint Engineering",
    description: "Agile execution in strict 2-week intervals. Immutable code reviews and test-driven development (TDD).",
    icon: "code_blocks",
    governedBy: "Scrum. 2-week sprints",
    cadence: "Continuous, demoed fortnightly",
    detail:
      "Two-week sprints against a backlog your product owner ranks. Trunk-based development, tests written with the requirement rather than after it, and no merge without review. Every sprint ends in a demo of running software, not a status deck.",
    deliverables: ["Shippable increment", "Sprint demo", "Updated burn-down", "Reviewed, tested code"],
    exit: "The increment is deployable to production at the end of every sprint, whether or not it is deployed.",
  },
  {
    phase: "05",
    title: "QA & Reliability Testing",
    description: "Automated end-to-end testing, chaos engineering, and rigorous load testing against simulated peak traffic.",
    icon: "fact_check",
    governedBy: "V-Model pairing",
    cadence: "Per sprint + release hardening",
    detail:
      "Every requirement was paired with its verification when it was written, so this phase executes a plan rather than inventing one. Load tests run against modelled peak, and failure is injected deliberately, the first time a dependency dies should never be in production.",
    deliverables: ["Automated E2E suite", "Load & soak reports", "Chaos experiment results", "Traceability matrix"],
    exit: "Performance and failure behaviour are known quantities with numbers attached.",
  },
  {
    phase: "06",
    title: "CI/CD & DevOps",
    description: "Zero-downtime deployment pipelines using container orchestration and immutable infrastructure patterns.",
    icon: "rocket_launch",
    governedBy: "Continuous delivery",
    cadence: "Every merge",
    detail:
      "The pipeline is treated as a product with its own tests. Infrastructure is declared in code and reviewed like application code, releases are progressive, and rollback is a single pipeline run rather than an incident procedure.",
    deliverables: ["Automated pipeline", "Infrastructure as code", "Progressive rollout config", "Rollback runbook"],
    exit: "A deploy is boring, reversible and requires nobody to be awake for it.",
  },
  {
    phase: "07",
    title: "Monitoring & Observability",
    description: "Implementing distributed tracing and real-time metric dashboards for total system visibility.",
    icon: "troubleshoot",
    governedBy: "DevOps feedback loop",
    cadence: "From release one",
    detail:
      "Tracing, metrics and structured logs ship with the first release, not after the first outage. Alerts are attached to service level objectives rather than to raw thresholds, so the pager fires on user-visible harm instead of on noise.",
    deliverables: ["Distributed tracing", "SLO definitions", "Alert routing", "Live dashboards"],
    exit: "Any production question can be answered from telemetry without adding code.",
  },
  {
    phase: "08",
    title: "Scaling & Optimization",
    description: "Continuous profiling of production performance, optimizing database queries and caching layers.",
    icon: "trending_up",
    governedBy: "Kanban, flow-based",
    cadence: "Continuous, WIP-capped",
    detail:
      "Post-launch work arrives unpredictably, so it runs as flow rather than in sprints. Production is profiled continuously, and optimisation is driven by what the traces say costs the most, never by what looks slow in a code review.",
    deliverables: ["Profiling reports", "Query & cache optimisation", "Capacity plan", "Cycle-time metrics"],
    exit: "Cost and latency curves are understood ahead of the next order of magnitude of load.",
  }
];

export const TECH_ECOSYSTEMS = [
  {
    category: "Frontend & UI Systems",
    color: "primary",
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "WebGL"]
  },
  {
    category: "Backend & Microservices",
    color: "secondary",
    technologies: ["Node.js", "Go", "Python", "GraphQL", "gRPC", "Kafka"]
  },
  {
    category: "Cloud & Infrastructure",
    color: "tertiary",
    technologies: ["AWS", "Kubernetes", "Docker", "Terraform", "Cloudflare", "Vercel"]
  },
  {
    category: "Data & AI Orchestration",
    color: "primary",
    technologies: ["PostgreSQL", "Redis", "MongoDB", "TensorFlow", "OpenAI", "Snowflake"]
  }
];

export const SECURITY_PROTOCOLS = [
  {
    id: "rbac",
    title: "Identity & Access (RBAC)",
    description: "Zero-trust federation using strictly enforced Role-Based Access Controls and continuous authentication.",
    icon: "admin_panel_settings"
  },
  {
    id: "encryption",
    title: "End-to-End Encryption",
    description: "AES-256 encryption at rest and TLS 1.3 in transit. Bring Your Own Key (BYOK) architecture support.",
    icon: "enhanced_encryption"
  },
  {
    id: "compliance",
    title: "Compliance Readiness",
    description: "Architectures designed to meet SOC 2 Type II, HIPAA, GDPR, and ISO 27001 strict regulatory requirements.",
    icon: "policy"
  },
  {
    id: "dr",
    title: "Disaster Recovery",
    description: "Geographically distributed redundancies with sub-minute Recovery Time Objectives (RTO).",
    icon: "backup"
  }
];

/**
 * The stages every change passes through on its way to production.
 *
 * Told as a horizontal sequence on /security because that is what it is, a
 * pipeline something travels along, left to right, with a gate at each stage
 * that can stop it. The copy states no control the page did not already
 * claim: the scan, the signing, the zero-trust validation and the immutable
 * audit log are the four events the telemetry panel below it reports.
 */
export const DELIVERY_PIPELINE = [
  {
    id: "commit",
    marker: "Stage 01",
    title: "Commit",
    icon: "commit",
    body: "Every change enters through a pull request against a protected branch. No direct pushes, and no merge without a review from someone who did not write it.",
    meta: "Gate, review approved",
  },
  {
    id: "static",
    marker: "Stage 02",
    title: "Static analysis",
    icon: "rule",
    body: "Linting, type checks and secret scanning run before a build is attempted, so a leaked credential is caught at the point it was introduced rather than in production.",
    meta: "Gate, no secrets, no type errors",
  },
  {
    id: "dependencies",
    marker: "Stage 03",
    title: "Dependency scan",
    icon: "policy",
    body: "An automated vulnerability scan runs across the full dependency tree, transitive packages included. A known critical stops the pipeline rather than raising a ticket.",
    meta: "Gate, no known criticals",
  },
  {
    id: "signing",
    marker: "Stage 04",
    title: "Image signing",
    icon: "verified",
    body: "The built image is signed and its digest recorded, so what reaches the cluster is provably the artefact that passed the gates above and not a rebuild of it.",
    meta: "Gate, signature verified",
  },
  {
    id: "policy",
    marker: "Stage 05",
    title: "Policy validation",
    icon: "shield_lock",
    body: "Zero-trust authentication and least-privilege policies are validated against the target environment before any traffic moves, so a misconfigured role fails here instead of at runtime.",
    meta: "Gate, policy matches environment",
  },
  {
    id: "release",
    marker: "Stage 06",
    title: "Release & audit",
    icon: "rocket_launch",
    body: "Rollout is progressive and reversible, and every action taken by a person or a pipeline is written to an immutable audit log. Who deployed what, and when, is a query rather than a memory.",
    meta: "Recorded, immutable audit trail",
  },
];

/**
 * How a kit runs: the five steps every kit follows, in plain words.
 *
 * Read by the home page (cards plus HowTo schema), /about (the rail) and the
 * top of /process (the rail plus HowTo schema). One array, so the three pages
 * and their markup cannot describe different processes. Each step says what
 * happens and, in `meta`, what you can hold us to at the end of it.
 *
 * It lives in the data layer rather than beside the cards that render it: a
 * `"use client"` module's exports reach the server as client references, not
 * values, so a server page building HowTo from it would get a proxy.
 */
export const KIT_STEPS = [
  {
    title: "Pick a kit",
    description:
      "Choose the kit closest to what you need, or tell us the goal and we point you at one. Every kit page shows the starting price, the timeline and exactly what is included.",
    icon: "checklist",
    meta: "Price and scope published",
    colorTheme: "primary",
  },
  {
    title: "Kick-off",
    description:
      "One call with the people who will build it to agree goals, content and dates. You get the final price in writing, including any add-ons, before any work starts.",
    icon: "forum",
    meta: "Written price before work starts",
    colorTheme: "secondary",
  },
  {
    title: "Build",
    description:
      "We design first and build second, on a private preview link you can open any time. You see progress every week and approve the design before it is built.",
    icon: "construction",
    meta: "Progress every week",
    colorTheme: "tertiary",
  },
  {
    title: "Launch",
    description:
      "We go live on your domain, in accounts created in your name, then run speed and search checks and submit the site to Google and Bing where the kit includes it.",
    icon: "rocket_launch",
    meta: "Yours from day one",
    colorTheme: "primary",
  },
  {
    title: "The Loop",
    description:
      "For 30 days after launch we watch real usage, fix what turns up and make one round of improvements based on the data. Then we hand everything over with a recorded walkthrough.",
    icon: "all_inclusive",
    meta: "30 days after launch",
    colorTheme: "secondary",
  },
];
