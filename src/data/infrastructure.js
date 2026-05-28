/**
 * LOGIXLOOPS — Infrastructure & Engineering Data Layer
 * Provides data for the /process, /technology, and /security ecosystems.
 */

export const ENGINEERING_WORKFLOW = [
  {
    phase: "01",
    title: "Discovery & Strategic Alignment",
    description: "Deep technical audits of existing legacy systems, establishing KPIs, and defining the architectural North Star.",
    icon: "radar"
  },
  {
    phase: "02",
    title: "System Architecture",
    description: "Mapping data topologies, defining microservices boundaries, and selecting the optimal tech stack for massive scalability.",
    icon: "account_tree"
  },
  {
    phase: "03",
    title: "UX & Product Systems",
    description: "Wireframing complex workflows to reduce cognitive load for enterprise users. High-fidelity prototyping.",
    icon: "design_services"
  },
  {
    phase: "04",
    title: "Sprint Engineering",
    description: "Agile execution in strict 2-week intervals. Immutable code reviews and test-driven development (TDD).",
    icon: "code_blocks"
  },
  {
    phase: "05",
    title: "QA & Reliability Testing",
    description: "Automated end-to-end testing, chaos engineering, and rigorous load testing against simulated peak traffic.",
    icon: "fact_check"
  },
  {
    phase: "06",
    title: "CI/CD & DevOps",
    description: "Zero-downtime deployment pipelines using container orchestration and immutable infrastructure patterns.",
    icon: "rocket_launch"
  },
  {
    phase: "07",
    title: "Monitoring & Observability",
    description: "Implementing distributed tracing and real-time metric dashboards for total system visibility.",
    icon: "troubleshoot"
  },
  {
    phase: "08",
    title: "Scaling & Optimization",
    description: "Continuous profiling of production performance, optimizing database queries and caching layers.",
    icon: "trending_up"
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
