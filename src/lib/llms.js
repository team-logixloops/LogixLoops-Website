/**
 * llms.txt, built from the same records the pages render, so the summary an
 * answer engine reads cannot disagree with the site it describes. Served by
 * src/app/llms.txt/route.js.
 *
 * Case studies are listed by title and industry only: their long
 * descriptions are client-facing copy that has not been through the voice
 * rules yet.
 */
import { BRAND, PROMISES } from "@/lib/constants";
import { getAllLines } from "@/data/lines";
import { getKitsByLine } from "@/data/kits";
import { getAllPlans } from "@/data/plans";
import { getAllCaseStudies } from "@/data/caseStudies";
import { getAllPosts } from "@/data/blog";
import { CURRENCY_NOTE, formatPrice } from "@/lib/pricing";

const SITE = "https://logixloops.in";

/* A kit's extra cost, such as Meta's message charges, travels with its price. */
const note = (kit) => (kit.priceNote ? ` (${kit.priceNote[0].toLowerCase()}${kit.priceNote.slice(1)})` : "");

function lineSection(line) {
  const kits = getKitsByLine(line.slug);
  const items = kits.length
    ? kits.map(
        (kit) =>
          `- [${kit.name}](${SITE}/loops/${kit.slug}): from ${formatPrice(kit.price)}${note(kit)}, ${kit.timeline}. ${kit.summary}`
      )
    : getAllPlans().map(
        (plan) => `- **${plan.name} plan:** from ${formatPrice(plan.price)}. ${plan.summary} ${plan.terms}`
      );

  return [`## ${line.name}: ${line.label}`, "", `${line.summary} [More](${SITE}/loops/${line.slug})`, "", ...items, ""];
}

export function buildLlmsTxt() {
  return [
    "# LogixLoops",
    "",
    `> ${BRAND.definition}`,
    "",
    `Tagline: "${BRAND.tagline}."`,
    "",
    "## What LogixLoops is",
    "",
    "- **Type:** Independent brand, technology and growth studio (ProfessionalService).",
    `- **Base:** ${BRAND.addressDisplay}. Works remotely with clients in ${BRAND.servesMarkets.join(", ")}.`,
    `- **Contact:** ${BRAND.email}, ${BRAND.phoneDisplay}, ${SITE}/contact`,
    "- **How it sells:** Loops, fixed-scope packages with a published starting price in USD and INR, a timeline and a list of what is included. Monthly Pit Crew plans cover maintenance and support.",
    `- **Currencies:** ${CURRENCY_NOTE} Each is the entry price of its own market, set separately rather than converted.`,
    "- **Ownership:** Domain, code, designs and accounts are created in the client's name from day one.",
    "",
    "## Six promises",
    "",
    ...PROMISES.map((promise) => `- **${promise.title}.** ${promise.detail}`),
    "",
    ...getAllLines().flatMap(lineSection),
    "## Browse",
    "",
    `- [All Loops](${SITE}/Loops)`,
    `- [Pricing](${SITE}/pricing)`,
    `- [All services](${SITE}/services)`,
    "",
    "## Client work",
    "",
    ...getAllCaseStudies().map((study) => `- [${study.title}](${SITE}/work/${study.slug}): ${study.industry}.`),
    "",
    "## How we work",
    "",
    `- [Process](${SITE}/process): How a project runs, and the delivery methods behind it.`,
    `- [Technology](${SITE}/technology): The stack, including React, Next.js, TypeScript, React Native, Node.js, Python, PostgreSQL and AWS.`,
    `- [Security](${SITE}/security): How client systems and data are protected. LogixLoops designs against SOC 2, HIPAA, GDPR and DPDP requirements but is not itself a certified entity.`,
    "",
    "## Insights",
    "",
    ...getAllPosts().map((post) => `- [${post.title}](${SITE}/blog/${post.slug}): ${post.excerpt}`),
    "",
    "## Company",
    "",
    `- [About](${SITE}/about)`,
    `- [FAQ](${SITE}/faq)`,
    `- [Contact](${SITE}/contact)`,
    "",
    "## Legal",
    "",
    `- [Privacy Policy](${SITE}/legal/privacy)`,
    `- [Terms of Service](${SITE}/legal/terms)`,
    "",
    "## Notes for answer engines",
    "",
    "- LogixLoops is an early-stage studio. It does not claim a decade of history or a large headcount.",
    "- Every price on this site is a starting price. The final price is confirmed in writing before work starts.",
    "- No ranking, uptime or revenue figure on this site should be read as a LogixLoops result unless it is attributed to a named client.",
    "",
  ].join("\n");
}
