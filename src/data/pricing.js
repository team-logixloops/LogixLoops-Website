/**
 * LOGIXLOOPS — Elite Pricing Data Layer
 */

export const ELITE_TIERS = [
  {
    id: "starter",
    title: "Starter",
    description: "Core framework validation for early-stage deployments.",
    price: "$2k",
    period: "/mo",
    features: ["Base API access", "Standard telemetry", "48h support SLA"],
    cta: "Select Starter",
    highlighted: false
  },
  {
    id: "growth",
    title: "Growth",
    description: "Accelerated deployment cycles for scaling operations.",
    price: "$5k",
    period: "/mo",
    features: ["Advanced load balancing", "Real-time metrics", "12h support SLA", "Dedicated success manager"],
    cta: "Select Growth",
    highlighted: true
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "Full-scale operational control and compliance.",
    price: "$12k",
    period: "/mo",
    features: ["Multi-region deployment", "Custom security policies", "2h critical SLA", "Quarterly business reviews"],
    cta: "Select Enterprise",
    highlighted: false
  },
  {
    id: "custom",
    title: "Custom",
    description: "Bespoke architectural solutions.",
    price: "Let's Talk",
    period: "",
    features: ["On-premise options", "Legacy system integration", "White-glove migration", "Dedicated engineering pod"],
    cta: "Contact Sales",
    highlighted: false,
    isCustom: true
  }
];

export const TECHNICAL_SPECS = [
  {
    category: "Core Infrastructure",
    specs: [
      { name: "API Request Limit", starter: "1M / month", growth: "10M / month", enterprise: "100M / month", custom: "Unlimited" },
      { name: "Compute Nodes", starter: "Shared", growth: "Dedicated Cluster", enterprise: "Multi-Region", custom: "Custom Topology" },
      { name: "Data Retention", starter: "30 Days", growth: "90 Days", enterprise: "1 Year", custom: "Indefinite" },
    ]
  },
  {
    category: "Security & Compliance",
    specs: [
      { name: "Encryption at Rest", starter: "check", growth: "check", enterprise: "check", custom: "check" },
      { name: "SSO / SAML", starter: "-", growth: "check", enterprise: "check", custom: "check" },
      { name: "Compliance Certifications", starter: "-", growth: "SOC2 Type II", enterprise: "SOC2, HIPAA, GDPR", custom: "Custom Audits" },
    ]
  },
  {
    category: "Support Levels",
    specs: [
      { name: "Response Time SLA", starter: "48 Hours", growth: "12 Hours", enterprise: "2 Hours", custom: "15 Minutes" },
      { name: "Support Channels", starter: "Email Only", growth: "Email & Chat", enterprise: "24/7 Phone & Chat", custom: "Direct Slack Channel" },
      { name: "Account Management", starter: "-", growth: "Pooled CSM", enterprise: "Dedicated CSM", custom: "Strategic Account Director" },
    ]
  }
];

export const DEPLOYMENT_TIMELINES = [
  {
    tier: "Starter",
    timeline: "Instant Access",
    color: "outline-variant",
    bgClass: "bg-surface-container-lowest",
    borderClass: "border-outline-variant/30",
    steps: [
      { icon: "key", text: "API Key Provisioning" },
      { icon: "construction", text: "Basic Sandbox Setup" },
      { icon: "menu_book", text: "Self-serve Documentation" }
    ]
  },
  {
    tier: "Growth",
    timeline: "1-3 Days",
    color: "primary",
    bgClass: "bg-primary/5",
    borderClass: "border-primary/30",
    steps: [
      { icon: "phone_in_talk", text: "Kickoff Call" },
      { icon: "dns", text: "Cluster Configuration" },
      { icon: "vpn_key", text: "SSO Integration" }
    ]
  },
  {
    tier: "Enterprise",
    timeline: "2-4 Weeks",
    color: "secondary",
    bgClass: "bg-surface-container-lowest",
    borderClass: "border-outline-variant/30",
    steps: [
      { icon: "gpp_good", text: "Security Audit Review" },
      { icon: "public", text: "Multi-Region Setup" },
      { icon: "moving", text: "Data Migration Plan" }
    ]
  },
  {
    tier: "Custom",
    timeline: "Tailored Timeline",
    color: "secondary",
    bgClass: "bg-surface-container-lowest",
    borderClass: "border-outline-variant/30",
    steps: [
      { icon: "architecture", text: "Architectural Discovery" },
      { icon: "build", text: "Custom Build Phases" },
      { icon: "flag", text: "Phased Rollout" }
    ]
  }
];
