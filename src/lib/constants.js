/**
 * LOGIXLOOPS — Site Constants
 *
 * Single source of truth for navigation, services, metadata,
 * and content that is shared across components.
 */

/* ─── Brand ─── */
export const BRAND = {
  name: "LogixLoops",
  tagline: "Strategic Engineering",
  description:
    "Pioneering resilient enterprise architecture through strategic engineering and tactical design.",
  email: "hello@logixloops.com",
  phone: "+1 800 LOGIX (56449)",
  location: "San Francisco, CA",
  copyright: `© ${new Date().getFullYear()} LogixLoops IT Solutions. All rights reserved.`,
};

/* ─── Navigation ─── */
export const NAV_LINKS = [
  {
    label: "Services",
    href: "/services",
    hasDropdown: true,
    children: [
      { label: "Enterprise Software", href: "/services/enterprise-software", icon: "domain" },
      { label: "AI & ML Solutions", href: "/services/ai-ml-solutions", icon: "psychology" },
      { label: "Web Development", href: "/services/web-development", icon: "code" },
      { label: "Mobile Apps", href: "/services/mobile-apps", icon: "smartphone" },
      { label: "Cloud & DevOps", href: "/services/cloud-devops", icon: "cloud" },
      { label: "SaaS Platforms", href: "/services/saas-platforms", icon: "layers" },
      { label: "Automation Systems", href: "/services/automation-systems", icon: "settings_motion_mode" },
      { label: "UI/UX Design", href: "/services/ui-ux-design", icon: "design_services" },
    ],
  },
  { label: "Solutions", href: "/solutions" },
  { label: "Case Studies", href: "/case-studies" },
  {
    label: "Company",
    href: "/about",
    hasDropdown: true,
    children: [
      { label: "About Us", href: "/about", icon: "corporate_fare" },
      { label: "Our Process", href: "/process", icon: "account_tree" },
      { label: "Technology", href: "/technology", icon: "memory" },
      { label: "Security", href: "/security", icon: "security" },
      { label: "Careers", href: "/careers", icon: "work" },
      { label: "Pricing", href: "/pricing", icon: "payments" },
      { label: "FAQ", href: "/faq", icon: "help" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/* ─── Footer Link Groups ─── */
export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Process", href: "/process" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Enterprise Software", href: "/services/enterprise-software" },
    { label: "AI & ML Solutions", href: "/services/ai-ml-solutions" },
    { label: "Cloud & DevOps", href: "/services/cloud-devops" },
    { label: "Web Development", href: "/services/web-development" },
    { label: "All Services", href: "/services" },
  ],
  resources: [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Engineering Blog", href: "/blog" },
    { label: "Technology Stack", href: "/technology" },
    { label: "Trust & Security", href: "/security" },
    { label: "Pricing & Tiers", href: "/pricing" },
    { label: "FAQ & Support", href: "/faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
  ],
};

/* ─── Social Links ─── */
export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#", icon: "work" },
  { label: "Instagram", href: "#", icon: "photo_camera" },
  { label: "GitHub", href: "#", icon: "code" },
];

/* ─── Services Overview Data ─── */
export const SERVICES = [
  {
    slug: "enterprise-software",
    title: "Enterprise Software",
    icon: "domain",
    color: "primary",
    shortDescription: "Architecting robust, scalable platforms that serve as the central nervous system for modern corporations.",
    tags: ["Java", "C# .NET", "Microservices", "Kubernetes"],
  },
  {
    slug: "ai-ml-solutions",
    title: "AI & ML Solutions",
    icon: "psychology",
    color: "secondary",
    shortDescription: "Injecting cognitive capabilities into your existing workflows with predictive models and automated reasoning.",
    tags: ["TensorFlow", "PyTorch", "NLP", "Computer Vision"],
  },
  {
    slug: "web-development",
    title: "Web Development",
    icon: "code",
    color: "primary",
    shortDescription: "High-performance, immersive web applications built on modern JavaScript frameworks.",
    tags: ["React", "Next.js", "TypeScript", "Node.js"],
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    icon: "smartphone",
    color: "secondary",
    shortDescription: "Native and cross-platform mobile experiences that feel seamlessly integrated with device hardware.",
    tags: ["Swift", "Flutter", "React Native", "Kotlin"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    icon: "cloud",
    color: "primary",
    shortDescription: "Resilient infrastructure provisioning and continuous integration pipelines for zero-downtime deployments.",
    tags: ["AWS", "Docker", "Kubernetes", "Terraform"],
  },
  {
    slug: "saas-platforms",
    title: "SaaS Platforms",
    icon: "layers",
    color: "secondary",
    shortDescription: "Multi-tenant architecture design for scalable software-as-a-service products.",
    tags: ["Multi-tenant", "Stripe API", "Auth0", "PostgreSQL"],
  },
  {
    slug: "automation-systems",
    title: "Automation Systems",
    icon: "settings_motion_mode",
    color: "primary",
    shortDescription: "Streamlining complex business logic through custom RPA and workflow automation orchestration.",
    tags: ["RPA", "Python", "n8n", "Zapier"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    icon: "design_services",
    color: "secondary",
    shortDescription: "Atmospheric engineering of digital interfaces, focusing on optical refraction and refined minimalism.",
    tags: ["Figma", "Design Systems", "Prototyping", "Research"],
  },
];
