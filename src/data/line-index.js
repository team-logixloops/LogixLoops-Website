/**
 * The six lines, reduced to what navigation needs: slug, name, plain label,
 * icon, colour, art and pitch.
 *
 * Kept apart from lines.js on purpose, and it must import nothing. Navbar,
 * Footer and the services grid are client components, so whatever they import
 * ships to every page. lines.js reads the kit catalogue to build its FAQ
 * answers; reaching it from the nav would put every kit on every page.
 */
export const LINE_INDEX = [
  {
    slug: "web-and-app-development",
    name: "Engine",
    label: "Web & App Development",
    icon: "rocket_launch",
    color: "primary",
    art: "/services/web-development.svg",
    navImage: "/nav/web-development.webp",
    pitch: "We build the thing your business runs on: websites, online stores, apps and custom software.",
  },
  {
    slug: "branding",
    name: "Spark",
    label: "Branding & Identity",
    icon: "auto_awesome",
    color: "secondary",
    art: "/services/ui-ux-design.svg",
    navImage: "/nav/ui-ux-design.webp",
    pitch: "How people see you: your logo, your look and the way you sound.",
  },
  {
    slug: "website-redesign",
    name: "Glow-Up",
    label: "Website Redesign & Upgrades",
    icon: "auto_fix_high",
    color: "tertiary",
    art: "/services/mobile-apps.svg",
    navImage: "/nav/saas-platforms.webp",
    pitch: "A makeover for what you already have: faster, better looking, and better at turning visitors into customers.",
  },
  {
    slug: "seo-and-ai-search",
    name: "Spotlight",
    label: "SEO & AI Search Visibility",
    icon: "travel_explore",
    color: "primary",
    art: "/services/ai-ml-solutions.svg",
    navImage: "/nav/ai-ml-solutions.webp",
    pitch: "Get found on Google, and named in the answers ChatGPT and other AI assistants give.",
  },
  {
    slug: "ai-automation",
    name: "Autopilot",
    label: "AI & Automation",
    icon: "smart_toy",
    color: "secondary",
    art: "/services/automation-systems.svg",
    navImage: "/nav/automation-systems.webp",
    pitch: "Work that runs itself: WhatsApp AI agents, website chatbots and automations between your tools.",
  },
  {
    slug: "maintenance-and-support",
    name: "Pit Crew",
    label: "Maintenance & Support Plans",
    icon: "build",
    color: "tertiary",
    art: "/services/cloud-devops.svg",
    navImage: "/nav/cloud-devops.webp",
    pitch: "We keep your website or app fast, safe and up to date, every month.",
  },
];
