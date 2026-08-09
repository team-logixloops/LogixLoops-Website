/**
 * LOGIXLOOPS: Case Studies Data Layer
 *
 * ───────────────────────────────────────────────────────────────────────────
 * READ THIS BEFORE EDITING
 *
 * Every record here currently carries `demo: true`, and that flag is load
 * bearing. It means: this is a **reference build**, an architecture we
 * designed, can defend line by line, and have written up against a
 * representative brief. It is not a record of a paid client engagement.
 *
 * The flag changes three things automatically:
 *   1. `generateCaseStudySchema` emits `CreativeWork` with a
 *      `disambiguatingDescription` saying so, rather than `Article`, which
 *      would assert to Google and to every answer engine that this is
 *      reportage about real client work.
 *   2. The index and the detail page both render a visible notice.
 *   3. `metrics` are read as design targets, and are written as such.
 *
 * The previous version of this file did none of that while publishing
 * "1.2M Active Users", "22M Miles Saved", "0 Compliance Breaches" and a
 * 45,000-employee weekend migration. Those are the kind of figures a
 * prospect's procurement team asks for a reference on, and an AI assistant
 * repeats with a citation. Removed.
 *
 * TO PROMOTE A RECORD TO A REAL CASE STUDY:
 *   - set `demo: false`
 *   - add `publishedAt` (an ISO date, required, and never invented)
 *   - set `client` to the real name if you have written permission, or leave
 *     the industry-only descriptor if you do not
 *   - replace `metrics` with figures the client has signed off on, and change
 *     the labels from targets to outcomes
 * The layout, the schema and the index all handle the rest.
 * ───────────────────────────────────────────────────────────────────────────
 */

export const CASE_STUDIES = {
  "nexus-global-trading": {
    slug: "nexus-global-trading",
    demo: true,
    title: "Nexus Global Trading Platform",
    // Not a client. The brief this architecture answers.
    client: "Reference brief: institutional trading desk",
    industry: "FinTech",
    transformationType: "Microservices Architecture & Low-Latency Engines",
    shortDescription:
      "A reference build: how we would take a decade-old trading system off a shared database and onto an event-sourced, edge-deployed architecture without pausing the market.",
    heroImage: "/case-studies/nexus-global-trading.webp",
    heroImageAlt:
      "Complex, modern trading platform dashboard on a sleek monitor with cyan and indigo data visualizations.",
    technologies: ["Go", "Kafka", "Redis", "React", "Kubernetes"],
    featured: true,
    // Design targets, not measured results. Each one is a number we would
    // commit to in an architecture brief and then test against.
    metrics: [
      { value: "< 5ms", label: "p99 order-path target", prefix: "", suffix: "" },
      { value: "3 AZ", label: "Active-active by design", prefix: "", suffix: "" },
      { value: "100%", label: "Trades replayable from the log", prefix: "", suffix: "" },
    ],
    sections: {
      challenge: {
        title: "The Fragmentation Bottleneck",
        content:
          "The brief: a trading platform that had outgrown infrastructure written a decade ago. Regional databases in separate data centres that never quite agreed with each other, and latency that spiked exactly when the market did, which is the only time it matters.",
        points: [
          "Regional nodes drifting out of sync under write pressure.",
          "A monolith where every release is a market-hours risk.",
        ],
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDmKksvvC2O-65fbc9BqjtHW1f02szTn-9EWUZOj8Wr8NPjuN_46x23HQEhaKmfXa-2T34EnJBhWoAYPRsv5-Wn_XxxOX3w7AHp2VfEt9nDy461HL6Ve2oODHwdOWtU9nN1bU3c2APLpqsACzAVnJzAkdSAMEelunLIscOQSlBQmyeWa-RhW9SZx_MjyYE9BuZ_ou-IqpV3WN-1vgfSix3c4HVOhmIKAIodu-A4UbEvoeLxT-SA91c8UPej2sQuDY2VTdanBMUxRAoT",
        imageAlt:
          "Abstract, stylized technical architecture diagram showing fragmented, siloed data systems.",
      },
      discovery: {
        title: "Where The Risk Actually Is",
        description:
          "Three questions we would settle before drawing a single service boundary, because getting any of them wrong is a rewrite rather than a refactor.",
        insights: [
          {
            icon: "memory",
            title: "Compute Proximity",
            description:
              "How much of the latency budget is physics? Distance between order origin and matching engine sets the floor, and no amount of application tuning moves it.",
            color: "secondary",
          },
          {
            icon: "data_object",
            title: "Event-Driven Flow",
            description:
              "An asynchronous mesh so services fail in isolation. If market data stalls, order routing does not go down with it.",
            color: "primary",
          },
          {
            icon: "security",
            title: "Zero-Trust Protocol",
            description:
              "Per-service authorisation and encryption on internal hops, designed so the check costs microseconds rather than milliseconds.",
            color: "tertiary",
          },
        ],
      },
      engineering: {
        title: "Build Sequence",
        phases: [
          {
            title: "Phase 1: Microservices Deconstruction",
            description:
              "Strangle the monolith. Extract the highest-load paths first, order routing and market data, into Go services behind the existing gateway, so traffic moves incrementally and any step is reversible.",
            color: "secondary",
          },
          {
            title: "Phase 2: In-Memory Data Grid",
            description:
              "A clustered cache holding hot market state, so the read path never touches disk. The consistency model is chosen explicitly here and recorded as an ADR, because it is the decision everything downstream inherits.",
            color: "primary",
          },
          {
            title: "Phase 3: Resiliency & Chaos Testing",
            description:
              "Kill nodes on purpose, in every environment, before production does it for us. Failover and zero-data-loss recovery are validated as tests rather than assumed as properties.",
            color: "tertiary",
          },
        ],
      },
      architecture: {
        title: "Stateless Edge Architecture",
        content:
          "Order management decomposed into independent, edge-deployable nodes with Kafka as the spine. Executions process asynchronously but are recorded via event sourcing, so the ledger is the log, and any state in the system can be rebuilt by replaying it.",
      },
    },
  },

  "aura-patient-portal": {
    slug: "aura-patient-portal",
    demo: true,
    title: "Aura Patient Portal",
    client: "Reference brief: multi-site healthcare provider",
    industry: "HealthTech",
    transformationType: "IoT Medical Integration & Secure Cloud",
    shortDescription:
      "A reference build: consolidating a dozen patient-facing apps into one portal, with IoT vitals arriving over MQTT and a HIPAA-shaped control set designed in from the start.",
    heroImage: "/case-studies/aura-patient-portal.webp",
    heroImageAlt:
      "Medical professional holding a sleek, modern tablet displaying patient health analytics.",
    technologies: ["React Native", "Node.js", "GraphQL", "AWS", "PostgreSQL"],
    featured: true,
    metrics: [
      { value: "AES-256", label: "At rest, TLS 1.3 in transit", prefix: "", suffix: "" },
      { value: "MQTT", label: "Device ingest, normalised at the broker", prefix: "", suffix: "" },
      { value: "HIPAA", label: "Designed to the control set", prefix: "", suffix: "" },
    ],
    sections: {
      challenge: {
        title: "Disjointed Patient Journeys",
        content:
          "The brief: twelve separate patient-facing applications from three legacy vendors, and vitals monitors that could not reach the health record in anything close to real time. The clinical blind spot is not a UX problem. It is a data architecture problem wearing a UX problem's clothes.",
        points: [
          "Three vendor schemas, none of which agree on what a patient is.",
          "Device telemetry arriving hours after it was clinically useful.",
        ],
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDmKksvvC2O-65fbc9BqjtHW1f02szTn-9EWUZOj8Wr8NPjuN_46x23HQEhaKmfXa-2T34EnJBhWoAYPRsv5-Wn_XxxOX3w7AHp2VfEt9nDy461HL6Ve2oODHwdOWtU9nN1bU3c2APLpqsACzAVnJzAkdSAMEelunLIscOQSlBQmyeWa-RhW9SZx_MjyYE9BuZ_ou-IqpV3WN-1vgfSix3c4HVOhmIKAIodu-A4UbEvoeLxT-SA91c8UPej2sQuDY2VTdanBMUxRAoT",
        imageAlt: "Complex healthcare data silo visualization.",
      },
      discovery: {
        title: "Compliance And Comprehension",
        description:
          "Regulated software fails in two directions: it leaks, or nobody can use it. Both are design problems, and both get settled before build.",
        insights: [
          {
            icon: "health_and_safety",
            title: "Data Touchpoint Mapping",
            description:
              "Every point where identifiable data is created, moved or stored, written down first. You cannot encrypt a path you have not found.",
            color: "secondary",
          },
          {
            icon: "devices_other",
            title: "IoT Aggregation",
            description:
              "An MQTT broker normalising output from wearables that each disagree about units, sampling rate and what 'now' means.",
            color: "primary",
          },
          {
            icon: "psychology_alt",
            title: "Cognitive Load Reduction",
            description:
              "Clinical data reduced to what a patient can act on. The hard part is deciding what not to show, and that is a clinical decision rather than a design one.",
            color: "tertiary",
          },
        ],
      },
      engineering: {
        title: "Build Sequence",
        phases: [
          {
            title: "Phase 1: API Consolidation",
            description:
              "Wrap the legacy record systems in one GraphQL layer. The vendors keep disagreeing underneath; the client applications stop having to know about it.",
            color: "secondary",
          },
          {
            title: "Phase 2: Real-time Telemetry",
            description:
              "WebSockets and an MQTT broker for high-frequency biometric streams, with backpressure handled at the edge so a chatty device cannot take the ingest path down.",
            color: "primary",
          },
          {
            title: "Phase 3: Cross-Platform Native App",
            description:
              "One React Native application with real HealthKit and Health Connect integration. Offline-first, because hospital corridors are where mobile signal goes to die.",
            color: "tertiary",
          },
        ],
      },
      architecture: {
        title: "Compliant Data Fabric",
        content:
          "All third-party device telemetry lands in a single controlled enclave before anything reads it. One source of truth for clinicians and patients, and one place where access, retention and audit are enforced rather than three.",
      },
    },
  },

  "optiroute-command-center": {
    slug: "optiroute-command-center",
    demo: true,
    title: "OptiRoute Command Center",
    client: "Reference brief: national freight operator",
    industry: "Logistics",
    transformationType: "AI-Driven Supply Chain Orchestration",
    shortDescription:
      "A reference build: streaming telematics into a routing model that re-optimises the whole fleet on a fixed cycle, and a dispatcher console that can draw ten thousand vehicles without dropping frames.",
    heroImage: "/case-studies/optiroute-command-center.webp",
    heroImageAlt:
      "A top-down perspective of a team collaborating around digital tablets showcasing logistics software.",
    technologies: ["Python", "TensorFlow", "React", "Mapbox GL", "AWS IoT"],
    featured: true,
    metrics: [
      { value: "60s", label: "Full fleet re-optimisation cycle", prefix: "", suffix: "" },
      { value: "3s", label: "Telematics ingest interval", prefix: "", suffix: "" },
      { value: "WebGL", label: "10k+ vehicles on one canvas", prefix: "", suffix: "" },
    ],
    sections: {
      challenge: {
        title: "Reactive Fleet Operations",
        content:
          "The brief: a fleet in the tens of thousands, routed by hand, reacting to weather and traffic after they have already cost the day. Dispatchers were not short of data. They were short of a system that could act on it inside the window where acting still helps.",
        points: [
          "Manual routing, and fuel spend nobody could attribute.",
          "Live weather and traffic feeds arriving faster than anyone could read them.",
        ],
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDmKksvvC2O-65fbc9BqjtHW1f02szTn-9EWUZOj8Wr8NPjuN_46x23HQEhaKmfXa-2T34EnJBhWoAYPRsv5-Wn_XxxOX3w7AHp2VfEt9nDy461HL6Ve2oODHwdOWtU9nN1bU3c2APLpqsACzAVnJzAkdSAMEelunLIscOQSlBQmyeWa-RhW9SZx_MjyYE9BuZ_ou-IqpV3WN-1vgfSix3c4HVOhmIKAIodu-A4UbEvoeLxT-SA91c8UPej2sQuDY2VTdanBMUxRAoT",
        imageAlt: "Abstract chaotic global logistics map.",
      },
      discovery: {
        title: "Predictive Foundations",
        description:
          "Prediction is the easy half. The hard half is a pipeline that can feed it and a console a dispatcher will actually trust at 6am.",
        insights: [
          {
            icon: "route",
            title: "Geospatial Analysis",
            description:
              "Vector mapping and routing over a graph large enough that the algorithm choice, not the hardware, sets the response time.",
            color: "secondary",
          },
          {
            icon: "insights",
            title: "Model Scope",
            description:
              "Historical traffic, weather and seasonal delay as features, plus an honest read on where a model beats a well-tuned heuristic, which is less often than it is sold.",
            color: "primary",
          },
          {
            icon: "speed",
            title: "Real-time Telematics",
            description:
              "A low-latency path for live vehicle diagnostics on a few-second interval, sized for the whole fleet reporting at once rather than for the average.",
            color: "tertiary",
          },
        ],
      },
      engineering: {
        title: "Build Sequence",
        phases: [
          {
            title: "Phase 1: Data Pipeline Construction",
            description:
              "Ingest, clean and standardise telematics from truck hardware of a dozen vintages. Most of the work in any AI project is here, and pretending otherwise is how AI projects fail.",
            color: "secondary",
          },
          {
            title: "Phase 2: Model Deployment",
            description:
              "Inference serving with route scoring on the live path, versioned so a model can be rolled back exactly like code, because eventually one will need to be.",
            color: "primary",
          },
          {
            title: "Phase 3: Dispatcher Console",
            description:
              "A WebGL-accelerated command centre. Ten thousand moving markers is a rendering problem before it is a product problem, and it is solved at the canvas rather than in React.",
            color: "tertiary",
          },
        ],
      },
      architecture: {
        title: "The Predictive Mesh",
        content:
          "Inference layered directly over streaming geospatial data, recalculating the optimal fleet state on a fixed cycle and dispatching micro-corrections. Fixed cycle rather than event-triggered on purpose: a system that re-routes drivers unpredictably is one drivers stop following.",
      },
    },
  },

  "core-identity-framework": {
    slug: "core-identity-framework",
    demo: true,
    title: "Core Identity Framework",
    client: "Reference brief: acquisitive enterprise group",
    industry: "Enterprise",
    transformationType: "Zero-Trust Security Infrastructure",
    shortDescription:
      "A reference build: one zero-trust identity authority federating a group's inherited directories, so offboarding somebody takes one action instead of eighteen.",
    heroImage: "/case-studies/core-identity-framework.webp",
    heroImageAlt:
      "A detailed view of a programmer's workstation featuring multiple frameless monitors.",
    technologies: ["Node.js", "OAuth 2.0", "OIDC", "Redis", "Terraform"],
    featured: true,
    metrics: [
      { value: "5k/s", label: "Auth throughput target", prefix: "", suffix: "" },
      { value: "OIDC", label: "Federation across legacy directories", prefix: "", suffix: "" },
      { value: "0", label: "Standing long-lived credentials", prefix: "", suffix: "" },
    ],
    sections: {
      challenge: {
        title: "The Identity Sprawl",
        content:
          "The brief: a group that had acquired its way into eighteen directory domains, where an average employee needed six sets of credentials to do their job. Password fatigue is not a user education problem at that point. It is an architecture producing shadow IT on purpose.",
        points: [
          "Perimeter security defeated by the people it was protecting.",
          "No single action that reliably removes a leaver from everything.",
        ],
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDmKksvvC2O-65fbc9BqjtHW1f02szTn-9EWUZOj8Wr8NPjuN_46x23HQEhaKmfXa-2T34EnJBhWoAYPRsv5-Wn_XxxOX3w7AHp2VfEt9nDy461HL6Ve2oODHwdOWtU9nN1bU3c2APLpqsACzAVnJzAkdSAMEelunLIscOQSlBQmyeWa-RhW9SZx_MjyYE9BuZ_ou-IqpV3WN-1vgfSix3c4HVOhmIKAIodu-A4UbEvoeLxT-SA91c8UPej2sQuDY2VTdanBMUxRAoT",
        imageAlt: "Abstract fragmented identity nodes visualization.",
      },
      discovery: {
        title: "Federation & Unification",
        description:
          "A central authority that trusts nothing by default, including itself, and that can be adopted one system at a time, because a big-bang identity cutover is how companies lose a Monday.",
        insights: [
          {
            icon: "key",
            title: "Identity Federation",
            description:
              "Mapping directory and LDAP schemas that disagree about what a person is into one identity graph, with the conflicts resolved explicitly rather than by last-write-wins.",
            color: "secondary",
          },
          {
            icon: "policy",
            title: "Adaptive Risk Policies",
            description:
              "Scoring on IP, device posture and behaviour before granting access, plus a documented answer for what happens when the score is wrong, which is the part most designs skip.",
            color: "primary",
          },
          {
            icon: "cable",
            title: "Standards, Not Adapters",
            description:
              "Everything speaks OpenID Connect. Anything that cannot is put behind a proxy that can, so there is exactly one integration pattern to maintain.",
            color: "tertiary",
          },
        ],
      },
      engineering: {
        title: "Build Sequence",
        phases: [
          {
            title: "Phase 1: The Core Broker",
            description:
              "A central identity provider sized for group-wide peak rather than average, because auth load is a Monday-morning spike, and an identity service that degrades under it takes everything else with it.",
            color: "secondary",
          },
          {
            title: "Phase 2: Legacy Bridging",
            description:
              "Reverse proxies in front of on-premise applications that will never speak SAML or OIDC, so the estate can migrate without waiting for its oldest system.",
            color: "primary",
          },
          {
            title: "Phase 3: Rollout & Deprecation",
            description:
              "Directory by directory, with the old path live until the new one has carried real traffic. Rollback stays available at every step, and the legacy domain is switched off last.",
            color: "tertiary",
          },
        ],
      },
      architecture: {
        title: "Distributed Zero-Trust Authority",
        content:
          "Lightweight identity gateways at the edge over a distributed cluster, so authentication latency does not track distance from head office. Every request is explicitly validated and signed, including the ones already inside the network, which are the ones that matter.",
      },
    },
  },
};

export function getAllCaseStudies() {
  return Object.values(CASE_STUDIES);
}

export function getCaseStudyBySlug(slug) {
  return CASE_STUDIES[slug] || null;
}
