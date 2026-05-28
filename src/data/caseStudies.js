/**
 * LOGIXLOOPS — Case Studies Data Layer
 * Provides centralized, highly-structured enterprise transformation data.
 */

export const CASE_STUDIES = {
  "nexus-global-trading": {
    slug: "nexus-global-trading",
    title: "Nexus Global Trading Platform",
    client: "Nexus Global Logistics & Finance",
    industry: "FinTech",
    transformationType: "Microservices Architecture & Low-Latency Engines",
    shortDescription: "Complete re-architecture of a legacy trading system, introducing microservices and real-time AI predictive modeling to handle millions of transactions per second.",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6ihbOLbKZ8wZKf-Z8h26XdDeUn4PiuCnOCs7WbtFNd3xIlYSqOZGnKQGZqgeE5-hlbaFhs71XiUevO-Oe9pXaBf5KKNRismY9uuoTEJtUUGT7CQXf1DrtP-U6jKqN_903KAiUSZMPdjmwND4C1s9i98zWJQ_jBdy7Wt1vuylz_b6JopzBdH8LZSXLWs1TzeVoZoi2B2pJ0-RHWzIeWsLv5vveEStPOH4qsKlikAMYJ1OvjyCF86ZrKTbqJE6HaGG3cT8C3mCNOstV",
    heroImageAlt: "Complex, modern trading platform dashboard on a sleek monitor with cyan and indigo data visualizations.",
    technologies: ["Go", "Kafka", "Redis", "React", "Kubernetes"],
    featured: true,
    metrics: [
      { value: "0.02ms", label: "Execution Latency", prefix: "", suffix: "" },
      { value: "99.99%", label: "System Uptime", prefix: "", suffix: "" },
      { value: "3.5x", label: "Throughput Increase", prefix: "", suffix: "" }
    ],
    sections: {
      challenge: {
        title: "The Fragmentation Bottleneck",
        content: "Nexus encountered critical scaling limitations with their decade-old infrastructure. Siloed databases across international data centers led to unacceptable latency spikes during high-volatility market events, risking institutional client trust and significant financial slippage.",
        points: [
          "Inconsistent data synchronization across regional nodes.",
          "Monolithic architecture hindering rapid feature deployment."
        ],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmKksvvC2O-65fbc9BqjtHW1f02szTn-9EWUZOj8Wr8NPjuN_46x23HQEhaKmfXa-2T34EnJBhWoAYPRsv5-Wn_XxxOX3w7AHp2VfEt9nDy461HL6Ve2oODHwdOWtU9nN1bU3c2APLpqsACzAVnJzAkdSAMEelunLIscOQSlBQmyeWa-RhW9SZx_MjyYE9BuZ_ou-IqpV3WN-1vgfSix3c4HVOhmIKAIodu-A4UbEvoeLxT-SA91c8UPej2sQuDY2VTdanBMUxRAoT",
        imageAlt: "Abstract, stylized technical architecture diagram showing fragmented, siloed data systems."
      },
      discovery: {
        title: "Strategic Discovery",
        description: "Mapping the complex topography of high-frequency trading requirements to define a resilient, forward-looking architectural blueprint.",
        insights: [
          {
            icon: "memory",
            title: "Compute Proximity",
            description: "Analyzed edge computing viable locations to minimize physical distance between transaction origins and matching engines.",
            color: "secondary"
          },
          {
            icon: "data_object",
            title: "Event-Driven Flow",
            description: "Identified the necessity for an asynchronous, event-driven mesh to decouple services and ensure fault isolation.",
            color: "primary"
          },
          {
            icon: "security",
            title: "Zero-Trust Protocol",
            description: "Mandated granular, role-based access controls and pervasive encryption without introducing processing overhead.",
            color: "tertiary"
          }
        ]
      },
      engineering: {
        title: "Engineering Cadence",
        phases: [
          {
            title: "Phase 1: Microservices Deconstruction",
            description: "Strangling the monolith by selectively extracting high-load components (order routing, market data feeds) into scalable Go-based microservices.",
            color: "secondary"
          },
          {
            title: "Phase 2: In-Memory Data Grid",
            description: "Implementing a distributed, clustered cache architecture to hold hot market state, guaranteeing sub-millisecond retrieval times.",
            color: "primary"
          },
          {
            title: "Phase 3: Resiliency & Chaos Testing",
            description: "Rigorous automated fault injection across all environments to validate automated failover and zero-data-loss recovery protocols.",
            color: "tertiary"
          }
        ]
      },
      architecture: {
        title: "Stateless Edge Architecture",
        content: "To achieve true resilience, we decoupled the monolithic order management system into independent edge-deployable nodes. Using Kafka as the central nervous system, we ensured that trade executions were processed asynchronously but accurately recorded via event sourcing."
      }
    }
  },
  "aura-patient-portal": {
    slug: "aura-patient-portal",
    title: "Aura Patient Portal",
    client: "Aura Health Systems",
    industry: "HealthTech",
    transformationType: "IoT Medical Integration & Secure Cloud",
    shortDescription: "Unified patient experience application integrating IoT medical devices with secure, HIPAA-compliant cloud storage.",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzMYeZ1zQrVeeUim0rpeUeSmk0e4Ci2t-lFduFq98Z5kSEV4Jb1wxIKnmV0VPzfdhTyZLEmUkVhUGuGipvZFrH6OW9MmijAt8WUgl5dT-GISv_v_VZG7dcqknv0TGd-5WO7Ml_N3yXNpJQ-GbMS_ULSwRPIPr1xpGHPAfAFfVb7n-prE7SUgL5n6m3aI2UH2FzQk2p97wc3ZJ0uInX0gMqTOLkgRQUHRn2bP_ajSZ9PdKnFsZK-9S5cpQfL2EgWaqX-wq5Cp7a3w8m",
    heroImageAlt: "Medical professional holding a sleek, modern tablet displaying patient health analytics.",
    technologies: ["React Native", "Node.js", "GraphQL", "AWS HIPAA Cloud", "PostgreSQL"],
    featured: true,
    metrics: [
      { value: "65%", label: "Engagement Increase", prefix: "+", suffix: "" },
      { value: "0", label: "Compliance Breaches", prefix: "", suffix: "" },
      { value: "1.2M", label: "Active Users", prefix: "", suffix: "" }
    ],
    sections: {
      challenge: {
        title: "Disjointed Patient Journeys",
        content: "Aura Health's ecosystem consisted of 12 separate patient-facing applications. IoT vitals monitors were unable to sync with electronic health records in real-time, resulting in severe clinical blind spots.",
        points: [
          "Fragmented data architecture spanning three legacy vendors.",
          "High patient drop-off due to poor mobile UX."
        ],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmKksvvC2O-65fbc9BqjtHW1f02szTn-9EWUZOj8Wr8NPjuN_46x23HQEhaKmfXa-2T34EnJBhWoAYPRsv5-Wn_XxxOX3w7AHp2VfEt9nDy461HL6Ve2oODHwdOWtU9nN1bU3c2APLpqsACzAVnJzAkdSAMEelunLIscOQSlBQmyeWa-RhW9SZx_MjyYE9BuZ_ou-IqpV3WN-1vgfSix3c4HVOhmIKAIodu-A4UbEvoeLxT-SA91c8UPej2sQuDY2VTdanBMUxRAoT",
        imageAlt: "Complex healthcare data silo visualization."
      },
      discovery: {
        title: "Human-Centered Engineering",
        description: "Balancing strict medical compliance with an elegant, consumer-grade digital experience.",
        insights: [
          {
            icon: "health_and_safety",
            title: "HIPAA Mapping",
            description: "Auditing every data touchpoint to ensure end-to-end encryption at rest and in transit.",
            color: "secondary"
          },
          {
            icon: "devices_other",
            title: "IoT Aggregation",
            description: "Designing a robust MQTT broker system to normalize data from varied wearable devices.",
            color: "primary"
          },
          {
            icon: "psychology_alt",
            title: "Cognitive Load Reduction",
            description: "Simplifying complex clinical data into digestible, actionable patient insights.",
            color: "tertiary"
          }
        ]
      },
      engineering: {
        title: "Engineering Cadence",
        phases: [
          {
            title: "Phase 1: API Consolidation",
            description: "Wrapping legacy EHR systems in a unified, modern GraphQL layer to streamline frontend requests.",
            color: "secondary"
          },
          {
            title: "Phase 2: Real-time Telemetry",
            description: "Deploying secure WebSockets and MQTT brokers to handle high-frequency biometric data streams.",
            color: "primary"
          },
          {
            title: "Phase 3: Cross-Platform Native App",
            description: "Releasing a unified React Native application with deep iOS HealthKit and Android Health Connect integration.",
            color: "tertiary"
          }
        ]
      },
      architecture: {
        title: "Compliant Data Fabric",
        content: "By centralizing the ingestion of all third-party IoT telemetry into a strictly controlled AWS secure enclave, we created a single source of truth for both clinicians and patients, completely eliminating data reconciliation errors."
      }
    }
  },
  "optiroute-command-center": {
    slug: "optiroute-command-center",
    title: "OptiRoute Command Center",
    client: "Global Freight Systems",
    industry: "Logistics",
    transformationType: "AI-Driven Supply Chain Orchestration",
    shortDescription: "AI-driven supply chain visualization tool predicting bottlenecks before they occur and dynamically rerouting fleets.",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZvmvrZfhsNbfdKzh6YP0cb3wmwsjKz7k1BVA_LVySLiBce4SD3CsOhjapSQhXMQQ2CnlDvUxR9GB8oIL36dWUY7Sfzo1KxEa_iP_RKhahpR6grlia04nkB1N4c2mOh3_eWMQVQvkeRXIlXpxR-DP5en4Vj1dneXG0pwtSQwu4Pd18tASE8AcCh1PJhSROB5Cnle5ljY8TEXiu9LSB9iYBrNbY_-Ypg2iAEMKaKNlQoCczibZPLo1JiQoFA3MnZFFjnfWI3v_V0q1V",
    heroImageAlt: "A top-down perspective of a team collaborating around digital tablets showcasing logistics software.",
    technologies: ["Python", "TensorFlow", "React", "Mapbox GL", "AWS IoT"],
    featured: true,
    metrics: [
      { value: "30%", label: "Cost Reduction", prefix: "", suffix: "" },
      { value: "22M", label: "Miles Saved", prefix: "", suffix: "" },
      { value: "98%", label: "Prediction Accuracy", prefix: "", suffix: "" }
    ],
    sections: {
      challenge: {
        title: "Reactive Fleet Operations",
        content: "Operating a fleet of 10,000+ vehicles globally, GFS was paralyzed by unpredictable weather, traffic events, and manual routing processes. Dispatchers were reacting to crises rather than anticipating them.",
        points: [
          "Manual routing leading to massive fuel inefficiencies.",
          "Inability to process real-time weather and traffic telemetry at scale."
        ],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmKksvvC2O-65fbc9BqjtHW1f02szTn-9EWUZOj8Wr8NPjuN_46x23HQEhaKmfXa-2T34EnJBhWoAYPRsv5-Wn_XxxOX3w7AHp2VfEt9nDy461HL6Ve2oODHwdOWtU9nN1bU3c2APLpqsACzAVnJzAkdSAMEelunLIscOQSlBQmyeWa-RhW9SZx_MjyYE9BuZ_ou-IqpV3WN-1vgfSix3c4HVOhmIKAIodu-A4UbEvoeLxT-SA91c8UPej2sQuDY2VTdanBMUxRAoT",
        imageAlt: "Abstract chaotic global logistics map."
      },
      discovery: {
        title: "Predictive Foundations",
        description: "Moving from a reactive monitoring state to a proactive, AI-driven prediction model.",
        insights: [
          {
            icon: "route",
            title: "Geospatial Analysis",
            description: "Integrating high-performance vector mapping and routing algorithms capable of handling millions of nodes.",
            color: "secondary"
          },
          {
            icon: "insights",
            title: "Machine Learning Models",
            description: "Training neural networks on 5 years of historical traffic, weather, and seasonal delay data.",
            color: "primary"
          },
          {
            icon: "speed",
            title: "Real-time Telematics",
            description: "Establishing a low-latency pipeline to ingest live vehicle diagnostics every 3 seconds.",
            color: "tertiary"
          }
        ]
      },
      engineering: {
        title: "Engineering Cadence",
        phases: [
          {
            title: "Phase 1: Data Pipeline Construction",
            description: "Building robust Kinesis streams to ingest, clean, and standardize telematics data from diverse truck hardware.",
            color: "secondary"
          },
          {
            title: "Phase 2: AI Model Deployment",
            description: "Implementing TensorFlow Serving clusters to execute real-time inference and route scoring.",
            color: "primary"
          },
          {
            title: "Phase 3: Dispatcher UI Integration",
            description: "Developing a highly performant, WebGL-accelerated command center dashboard for global dispatchers.",
            color: "tertiary"
          }
        ]
      },
      architecture: {
        title: "The Predictive Neural Mesh",
        content: "By layering machine learning inference directly on top of real-time geospatial streaming data, OptiRoute acts as a living system. It recalculates the optimal global state of the fleet every 60 seconds, dispatching micro-corrections to drivers seamlessly."
      }
    }
  },
  "core-identity-framework": {
    slug: "core-identity-framework",
    title: "Core Identity Framework",
    client: "OmniCorp Enterprise Solutions",
    industry: "Enterprise",
    transformationType: "Zero-Trust Security Infrastructure",
    shortDescription: "A centralized, zero-trust authentication protocol deployed across 50+ global corporate subsidiaries.",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQHoCZ_5_lPRuG5JxozpWfBLrawGk-XQtTX9e9SSqz4CfMl5csBptT7QI1rvgGWOz61M1QyCSbXycnr2NifglQXfHNtxUnDBx8YBDP8tqisZ7BMmSRkbkSuQa50KTio_38Ld5woGsyZ5bz3K_AKafh5u3xRxbYTeFGMTqYyxGUTvY59NdaqEzafbRjbi0HBVVIY2jBbM1A0OTweLaQEY1qlWsisVahJLVRRl0U3alj9PWrZy6cyxtgh6hymcATP9JnneJoAoCDjtQX",
    heroImageAlt: "A detailed view of a programmer's workstation featuring multiple frameless monitors.",
    technologies: ["Node.js", "OAuth 2.0", "Redis", "Docker", "Terraform"],
    featured: true,
    metrics: [
      { value: "0", label: "Security Breaches", prefix: "", suffix: "" },
      { value: "50+", label: "Subsidiaries Onboarded", prefix: "", suffix: "" },
      { value: "2M+", label: "Daily Auth Events", prefix: "", suffix: "" }
    ],
    sections: {
      challenge: {
        title: "The Identity Sprawl",
        content: "Following years of rapid acquisitions, OmniCorp possessed 18 distinct active directory domains. Employees required an average of 6 distinct credentials to perform their daily roles, resulting in massive shadow IT and critical security vulnerabilities.",
        points: [
          "Severely compromised perimeter security due to password fatigue.",
          "Inability to quickly offboard ex-employees across all systems."
        ],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmKksvvC2O-65fbc9BqjtHW1f02szTn-9EWUZOj8Wr8NPjuN_46x23HQEhaKmfXa-2T34EnJBhWoAYPRsv5-Wn_XxxOX3w7AHp2VfEt9nDy461HL6Ve2oODHwdOWtU9nN1bU3c2APLpqsACzAVnJzAkdSAMEelunLIscOQSlBQmyeWa-RhW9SZx_MjyYE9BuZ_ou-IqpV3WN-1vgfSix3c4HVOhmIKAIodu-A4UbEvoeLxT-SA91c8UPej2sQuDY2VTdanBMUxRAoT",
        imageAlt: "Abstract fragmented identity nodes visualization."
      },
      discovery: {
        title: "Federation & Unification",
        description: "Designing a centralized authority that trusts no one by default, regardless of network position.",
        insights: [
          {
            icon: "key",
            title: "Identity Federation",
            description: "Mapping disparate Active Directory and LDAP schemas into a single, unified GraphQL identity graph.",
            color: "secondary"
          },
          {
            icon: "policy",
            title: "Adaptive Risk Policies",
            description: "Implementing AI scoring that evaluates IP, device posture, and behavior before granting access.",
            color: "primary"
          },
          {
            icon: "cable",
            title: "Seamless OIDC Integration",
            description: "Ensuring all internal tools and external SaaS apps could plug into the system via standard OpenID Connect.",
            color: "tertiary"
          }
        ]
      },
      engineering: {
        title: "Engineering Cadence",
        phases: [
          {
            title: "Phase 1: The Core Broker",
            description: "Establishing the central Identity Provider (IdP) capable of handling 5,000 auth requests per second globally.",
            color: "secondary"
          },
          {
            title: "Phase 2: Legacy Bridging",
            description: "Deploying secure reverse-proxies in front of legacy on-premise applications incapable of modern SAML/OIDC.",
            color: "primary"
          },
          {
            title: "Phase 3: Rollout & Deprecation",
            description: "A meticulously orchestrated, zero-downtime migration of 45,000 employees over a single weekend.",
            color: "tertiary"
          }
        ]
      },
      architecture: {
        title: "Distributed Zero-Trust Authority",
        content: "By deploying lightweight identity gateways at the edge via a globally distributed Kubernetes cluster, we minimized authentication latency while ensuring that every single network request is explicitly validated and signed."
      }
    }
  }
};

export function getAllCaseStudies() {
  return Object.values(CASE_STUDIES);
}

export function getCaseStudyBySlug(slug) {
  return CASE_STUDIES[slug] || null;
}
