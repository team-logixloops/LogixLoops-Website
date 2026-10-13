/**
 * Pit Crew: the monthly maintenance and support plans.
 *
 * Plans are not kits. They have no fixed end, so they live on the Pit Crew
 * line page and on /pricing rather than at /kits/<slug>. Prices are "from"
 * figures, like every price on the site.
 */
export const PLANS = [
  {
    slug: "essentials",
    name: "Essentials",
    price: { usd: 150, inr: 6000, per: "month" },
    summary: "Keeps a website safe, backed up and working.",
    includes: [
      "Hosting set up and monitored in your account",
      "Monthly updates and security patches",
      "Daily backups with a tested restore",
      "Uptime monitoring with alerts",
      "2 hours of small changes a month",
      "A short monthly report",
    ],
    terms: "Month to month. 30 days' notice to stop.",
  },
  {
    slug: "growth",
    name: "Growth",
    price: { usd: 500, inr: 20000, per: "month" },
    summary: "For a website that should get better every month, not just stay up.",
    includes: [
      "Everything in Essentials",
      "8 hours of changes and improvements a month",
      "Speed and Core Web Vitals checks",
      "Search Console and AI visibility tracking",
      "A monthly call to plan what comes next",
    ],
    terms: "Month to month. 30 days' notice to stop.",
  },
  {
    slug: "squad",
    name: "Squad",
    price: { usd: 4000, inr: 250000, per: "month" },
    summary: "A reserved team for a product that changes every week.",
    includes: [
      "A reserved team sized to your product",
      "Two-week sprints with a working demo at the end of each",
      "Direct access to the team in Slack or WhatsApp",
      "Releases, monitoring and on-call handled for you",
    ],
    terms: "Three-month minimum, then month to month.",
  },
];

export const getAllPlans = () => PLANS;
export const getPlanBySlug = (slug) => PLANS.find((plan) => plan.slug === slug) || null;
