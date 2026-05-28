/**
 * LOGIXLOOPS — Careers & Talent Data Layer
 */

export const HIRING_PROCESS = [
  {
    step: "01",
    title: "Application Review",
    description: "We review your experience for engineering maturity. No automated resume scanners.",
    icon: "assignment"
  },
  {
    step: "02",
    title: "Technical Screen",
    description: "A 45-minute conversation with a Lead Engineer discussing architecture and trade-offs. No leetcode tricks.",
    icon: "code"
  },
  {
    step: "03",
    title: "System Design Session",
    description: "A collaborative 90-minute whiteboard session. We design a scalable, real-world system together.",
    icon: "account_tree"
  },
  {
    step: "04",
    title: "Culture & Leadership",
    description: "Meet the founders and team leads to ensure alignment on our async, autonomous work culture.",
    icon: "handshake"
  }
];

export const OPEN_ROLES = [
  {
    id: "sr-backend-go",
    title: "Senior Backend Engineer (Go)",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-Time",
    description: "Architect and scale our low-latency financial event-streaming microservices.",
    requirements: ["5+ years Go experience", "Kafka / Event-driven architectures", "Kubernetes expertise"]
  },
  {
    id: "lead-cloud-architect",
    title: "Lead Cloud Architect",
    department: "Infrastructure",
    location: "Remote (US/EU)",
    type: "Full-Time",
    description: "Design multi-region active-active cloud topologies and zero-trust security meshes.",
    requirements: ["AWS Certified Solutions Architect", "Terraform & IaC mastery", "Multi-tenant SaaS experience"]
  },
  {
    id: "sr-frontend-react",
    title: "Senior Frontend Engineer (React/Next.js)",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-Time",
    description: "Build immersive, WebGL-accelerated data visualization dashboards for enterprise clients.",
    requirements: ["Deep React internals knowledge", "Framer Motion / Complex CSS", "Performance profiling"]
  },
  {
    id: "ai-systems-engineer",
    title: "AI Systems Engineer",
    department: "Machine Learning",
    location: "Remote (US/EU)",
    type: "Full-Time",
    description: "Deploy and orchestrate open-source LLMs into high-availability production environments.",
    requirements: ["Python / PyTorch", "Vector databases (Pinecone, Milvus)", "Triton / TensorRT"]
  }
];

export const CULTURE_PILLARS = [
  {
    title: "Asynchronous by Default",
    description: "We believe deep work requires uninterrupted focus. Meetings are a last resort, not a default.",
    icon: "schedule"
  },
  {
    title: "Immutable Documentation",
    description: "If it's not written down, it doesn't exist. We heavily utilize ADRs and internal RFCs.",
    icon: "menu_book"
  },
  {
    title: "Radical Candor",
    description: "Code reviews are strict but empathetic. We critique the code, never the engineer.",
    icon: "forum"
  }
];
