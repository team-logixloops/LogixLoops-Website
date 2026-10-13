/**
 * Post-build smoke checks. Run against a production server:
 *
 *   npm run build
 *   npx next start -p 3100
 *   node scripts/smoke.mjs http://localhost:3100
 *
 * Redirects are not followed, so a check can assert on the 308 itself.
 * React splits adjacent text nodes with comments in server HTML, so checks
 * match whole values ("$1,500 · ₹60,000"), never "From $1,500".
 */
const base = process.argv[2] || "http://localhost:3000";

const CHECKS = [
  // Line pages
  { path: "/services/web-and-app-development", status: 200, includes: ["Engine", "Business Website Kit", "$1,500 · ₹60,000", "Work built with these kits", '"@type":"Service"'] },
  { path: "/services/branding", status: 200, includes: ["Spark", "Brand Identity Kit"], excludes: ["Work built with these kits"] },
  { path: "/services/maintenance-and-support", status: 200, includes: ["Pit Crew", "Essentials", "$150/mo · ₹6,000/mo"] },
  { path: "/services/ai-automation", status: 200, includes: ["Autopilot", "WhatsApp AI Kit", "Under the hood"] },
  { path: "/services/not-a-line", status: 404 },
  // Retired practice URLs
  { path: "/services/web-development", status: 308, location: "/services/web-and-app-development" },
  { path: "/services/ui-ux-design", status: 308, location: "/services/website-redesign" },
  { path: "/services/ai-ml-solutions", status: 308, location: "/services/ai-automation" },
  { path: "/services/web-development?ref=nav", status: 308, location: "/services/web-and-app-development?ref=nav" },
  // Kit pages
  { path: "/kits/brand-identity", status: 200, includes: ["Brand Identity Kit", "$1,000 · ₹45,000", "2–3 weeks", "The Loop", "Under the hood", "Build a Design System", '"@type":"Service"', '"@type":"HowTo"', '"@type":"FAQPage"', '"priceCurrency":"INR"'] },
  { path: "/kits/business-website", status: 200, includes: ["Built with this kit", "Sire Media"] },
  { path: "/kits/mobile-app", status: 200, includes: ["Take the Signal Away"], excludes: ["Built with this kit"] },
  { path: "/kits/whatsapp-ai", status: 200, includes: ["Plus Meta&#x27;s message charges"] },
  { path: "/kits/not-a-kit", status: 404 },
  // Kit catalogue. Matches the lead, not the heading: PageHero animates its
  // heading word by word, so "Pick a kit." is not one string in the HTML.
  { path: "/kits", status: 200, includes: ["Advantage Kits are fixed-scope packages", "Business Website Kit", "Workflow Automation Kit", "Essentials", '"@type":"CollectionPage"'] },
  // Generated llms.txt
  { path: "/llms.txt", status: 200, includes: ["# LogixLoops", "https://logixloops.in/kits/ai-visibility", "$1,000 · ₹45,000"], excludes: ["/case-studies"] },
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
