/**
 * What the contact form offers: every Loop grouped under its line, the
 * maintenance plans, and a way out for anyone who is not sure yet. Built on
 * the server and passed to the form as plain data, so the form never imports
 * the catalogue.
 *
 * A link into the form names what to preselect: `?kit=<slug>` (with `add=`
 * and `cur=` when it comes from the Loop builder), `?plan=<slug>` or
 * `?line=<slug>`. See ContactFormFromLink.
 */
import { KITS } from "@/data/kits";
import { LINES, getLineBySlug } from "@/data/lines";
import { PLANS } from "@/data/plans";

const PLANS_LINE = "maintenance-and-support";

/** The option for an enquiry that does not start from any Loop or plan. */
export const NOT_SURE = "Not sure yet";

/** The slice of a Loop the form needs: enough to price a build, no copy. */
const loopForForm = (kit, line) => ({
  slug: kit.slug,
  name: kit.name,
  line: line.label,
  price: kit.price,
  timeline: kit.timeline,
  addOns: kit.addOns,
  recommended: kit.recommended,
});

export function contactCatalogue() {
  const plansLine = getLineBySlug(PLANS_LINE);
  return {
    lines: LINES.filter((line) => line.slug !== PLANS_LINE).map((line) => ({
      slug: line.slug,
      label: line.label,
      color: line.color,
      loops: KITS.filter((kit) => kit.line === line.slug).map((kit) => loopForForm(kit, line)),
    })),
    plans: {
      slug: plansLine.slug,
      label: plansLine.label,
      items: PLANS.map((plan) => ({ slug: plan.slug, name: `${plan.name} plan`, line: plansLine.label, price: plan.price })),
    },
  };
}
