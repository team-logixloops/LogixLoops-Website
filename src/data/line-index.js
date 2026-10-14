/**
 * The six lines, reduced to what navigation needs: slug, label, icon,
 * colour, art and pitch. A line has one name, its plain label. Loop is the
 * only branded word on the site.
 *
 * Kept apart from lines.js on purpose, and it must import nothing. Navbar,
 * Footer and the services grid are client components, so whatever they import
 * ships to every page. lines.js reads the kit catalogue to build its FAQ
 * answers; reaching it from the nav would put every kit on every page.
 */
export const LINE_INDEX = [
  {
    slug: "web-and-app-development",
    label: "Web & App Development",
    icon: "rocket_launch",
    color: "primary",
    art: "/lines/web-and-app-development.svg",
    navImage: "/nav/web-development.webp",
    pitch: "We build the thing your business runs on: websites, online stores, apps and custom software.",
  },
  {
    slug: "branding",
    label: "Branding & Identity",
    icon: "auto_awesome",
    color: "secondary",
    art: "/lines/branding.svg",
    navImage: "/nav/ui-ux-design.webp",
    pitch: "How people see you: your logo, your look and the way you sound.",
  },
  {
    slug: "website-redesign",
    label: "Website Redesign & Upgrades",
    icon: "auto_fix_high",
    color: "tertiary",
    art: "/lines/website-redesign.svg",
    navImage: "/nav/saas-platforms.webp",
    pitch: "A makeover for what you already have: faster, better looking, and better at turning visitors into customers.",
  },
  {
    slug: "seo-and-ai-search",
    label: "SEO & AI Search Visibility",
    icon: "travel_explore",
    color: "primary",
    art: "/lines/seo-and-ai-search.svg",
    navImage: "/nav/ai-ml-solutions.webp",
    pitch: "Get found on Google, and named in the answers ChatGPT and other AI assistants give.",
  },
  {
    slug: "ai-automation",
    label: "AI & Automation",
    icon: "smart_toy",
    color: "secondary",
    art: "/lines/ai-automation.svg",
    navImage: "/nav/automation-systems.webp",
    pitch: "Work that runs itself: WhatsApp AI agents, website chatbots and automations between your tools.",
  },
  {
    slug: "maintenance-and-support",
    label: "Maintenance & Support Plans",
    icon: "build",
    color: "tertiary",
    art: "/lines/maintenance-and-support.svg",
    navImage: "/nav/cloud-devops.webp",
    pitch: "We keep your website or app fast, safe and up to date, every month.",
  },
];
