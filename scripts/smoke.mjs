/**
 * Post-build smoke checks. Run against a production server:
 *
 *   npm run build
 *   npx next start -p 3100
 *   node scripts/smoke.mjs http://localhost:3100
 *
 * Redirects are not followed, so a check can assert on the 308 itself.
 * React splits adjacent text nodes with comments in server HTML, so checks
 * match whole values ("$500 · ₹15,000"), never "From $500".
 */
const base = process.argv[2] || "http://localhost:3000";

const CHECKS = [
  // Line pages, now under /loops
  { path: "/loops/web-and-app-development", status: 200, includes: ["Engine", "Business Website Loop", "$500 · ₹15,000", "Work built with these Loops", "Prices in ₹ are for businesses in India", '"@type":"Service"'] },
  { path: "/loops/branding", status: 200, includes: ["Spark", "Brand Identity Loop"], excludes: ["Work built with these Loops"] },
  { path: "/loops/maintenance-and-support", status: 200, includes: ["Pit Crew", "Essentials", "$75/mo · ₹2,500/mo"] },
  { path: "/loops/ai-automation", status: 200, includes: ["Autopilot", "WhatsApp AI Loop", "Under the hood"] },
  { path: "/loops/not-a-line", status: 404 },
  // Old URLs: one hop to /loops, query kept
  { path: "/services", status: 308, location: "/loops" },
  { path: "/services/branding", status: 308, location: "/loops/branding" },
  { path: "/kits", status: 308, location: "/loops" },
  { path: "/kits/mvp", status: 308, location: "/loops/mvp" },
  { path: "/services/web-development", status: 308, location: "/loops/web-and-app-development" },
  { path: "/services/ui-ux-design", status: 308, location: "/loops/website-redesign" },
  { path: "/services/ai-ml-solutions", status: 308, location: "/loops/ai-automation" },
  { path: "/services/web-development?ref=nav", status: 308, location: "/loops/web-and-app-development?ref=nav" },
  // Loop pages
  { path: "/loops/brand-identity", status: 200, includes: ["Brand Identity Loop", "$400 · ₹10,000", "2–3 weeks", "Pairs well with", 'href="/loops/brand-launch"', "The Tune-Up", "Under the hood", "Build a Design System", '"@type":"Service"', '"@type":"HowTo"', '"@type":"FAQPage"', '"priceCurrency":"INR"'], excludes: ["Brand Identity Kit"] },
  { path: "/loops/business-website", status: 200, includes: ["Built with this Loop", "Sire Media"] },
  { path: "/loops/mobile-app", status: 200, includes: ["Take the Signal Away"], excludes: ["Built with this Loop"] },
  { path: "/loops/whatsapp-ai", status: 200, includes: ["Plus Meta&#x27;s message charges", "Prices in ₹ are for businesses in India"] },
  { path: "/loops/website-glow-up", status: 200, includes: ['href="/loops/seo-foundation"', 'href="/loops/business-website"'] },
  { path: "/loops/not-a-loop", status: 404 },
  // The hub. Matches the lead, not the heading: PageHero animates its heading
  // word by word, so "Pick a Loop." is not one string in the HTML.
  { path: "/loops", status: 200, includes: ["Loops are fixed-scope service packages", "Business Website Loop", "Workflow Automation Loop", "Essentials", '"@type":"CollectionPage"', '"@type":"FAQPage"', "Not sure which one you need?", "Plus Meta&#x27;s message charges", 'href="/pricing"', 'href="/loops/business-website"'] },
  // Price list
  { path: "/pricing", status: 200, includes: ["Every Loop and its starting price", 'href="/loops/mvp"', 'href="/loops/speed"', "Prices in ₹ are for businesses in India", "Are the Loop prices fixed?", '"@type":"FAQPage"'], excludes: ["No tiers", "Dedicated Squad", "Scoped Programme"] },
  // Links into the catalogue from home, work, contact and the 404
  { path: "/", status: 200, includes: ['href="/loops"', 'href="/loops/branding"', 'href="/pricing"', "Browse the Loops", "is one Loop away.", "The usual agency vs LogixLoops", 'href="/loops/brand-launch"', 'href="/work/sire-media"', '"name":"Pick a Loop"'], excludes: ["scared to touch", "Book 45 minutes", "Every Decision, Written Down", 'href="/kits', 'href="/services"', 'href="/services/branding"'] },
  // Company pages
  { path: "/about", status: 200, includes: ["Why the loop", "everything we sell is called a Loop", "Six things you can hold us to", "Prices hidden behind a quote request", 'href="/loops"'], excludes: ["Zero-Trust Architecture", "The Axiom"] },
  { path: "/process", status: 200, includes: ["Five steps, from pick to The Tune-Up", "The engineering method behind bigger builds", '"name":"Pick a Loop"'], excludes: ["Book a discovery call"] },
  { path: "/work", status: 200, includes: ["Websites, stores and apps we have built for real businesses", "Client work", 'href="/loops"'], excludes: ["bespoke", "Ready to engineer"] },
  { path: "/work/sire-media", status: 200, includes: ["The Loop closest to this project", 'href="/loops/business-website"', 'href="/contact?kit=business-website"'], excludes: ["bespoke"] },
  { path: "/contact", status: 200, includes: ["Web &amp; App Development", "Not sure yet", "Tell us what you", 'href="/loops"'], excludes: ["Enterprise Web App", "Team Augmentation", "breaking."] },
  { path: "/not-a-page", status: 404, includes: ['href="/loops"', 'href="/loops/mvp"'] },
  // Generated llms.txt
  { path: "/llms.txt", status: 200, includes: ["# LogixLoops", "https://logixloops.in/loops/ai-visibility", "$500 · ₹15,000", "Prices in ₹ are for businesses in India", "service packages called Loops"], excludes: ["/case-studies", "/kits/", "/services/"] },
];

let failed = 0;
for (const check of CHECKS) {
  const res = await fetch(base + check.path, { redirect: "manual" });
  const problems = [];
  if (res.status !== check.status) problems.push(`status ${res.status}, expected ${check.status}`);
  if (check.location) {
    const location = res.headers.get("location") || "";
    if (!location.endsWith(check.location)) problems.push(`location "${location}"`);
  }
  if (check.includes || check.excludes) {
    const html = await res.text();
    for (const text of check.includes ?? []) if (!html.includes(text)) problems.push(`missing "${text}"`);
    for (const text of check.excludes ?? []) if (html.includes(text)) problems.push(`unexpected "${text}"`);
  }
  console.log(`${problems.length ? "FAIL" : "ok  "} ${check.path}${problems.length ? `: ${problems.join("; ")}` : ""}`);
  if (problems.length) failed += 1;
}
process.exit(failed ? 1 : 0);
