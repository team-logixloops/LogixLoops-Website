/**
 * What the contact form offers, and what each "Start this kit", "Start
 * <plan>" and "Start a project" link preselects. Built on the server and
 * passed to the form as plain data, so the form never imports the catalogue.
 */
import { KITS } from "@/data/kits";
import { LINES, getLineBySlug } from "@/data/lines";
import { PLANS } from "@/data/plans";

const PLANS_LINE = "maintenance-and-support";

/** Step one of the form: the six lines, plus a way out. */
export const CONTACT_TOPICS = [...LINES.map((line) => line.label), "Not sure yet"];

/** `{ kit, plan, line }`, each keyed by slug, to `{ label, topic }`. */
export function contactPicks() {
  const topicOf = (lineSlug) => getLineBySlug(lineSlug).label;

  return {
    kit: Object.fromEntries(KITS.map((kit) => [kit.slug, { label: kit.name, topic: topicOf(kit.line) }])),
    plan: Object.fromEntries(
      PLANS.map((plan) => [plan.slug, { label: `${plan.name} plan`, topic: topicOf(PLANS_LINE) }])
    ),
    line: Object.fromEntries(LINES.map((line) => [line.slug, { label: line.label, topic: line.label }])),
  };
}
