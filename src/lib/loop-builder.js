/**
 * The arithmetic behind "Build your Loop": a Loop, the add-ons a visitor
 * picks, and what that build costs in one market's currency.
 *
 * Add-ons taken with the Loop cost less than the same add-ons ordered after
 * launch, because they are scoped, designed and built in the same run. That
 * difference is the only discount on the site and it is a real one: an add-on
 * ordered later is charged at its listed price, so "bought separately" is a
 * price a buyer would actually pay, not a list price invented to be struck
 * through.
 *
 * The saving is shown as a flat amount ("Flat ₹2,000 off"), not a percentage.
 * Above about 100 a flat figure reads as the bigger saving, below it a
 * percentage does (Berger's Rule of 100), and every add-on here is above 100
 * in both currencies.
 *
 * Nothing in here formats for a page except `formatAmount`; components own
 * the wording.
 */
import { formatInr, formatUsd } from "@/lib/pricing";

export const CURRENCIES = ["inr", "usd"];

/** Share of the add-ons' listed price taken off when they come with the Loop. */
export const ADD_ON_SAVING_RATE = 0.2;

/* Savings land on round figures, so the flat amount reads as a decision, not
   as the output of a formula. */
const SAVING_STEP = { inr: 500, usd: 25 };

/* Per-day framing only while the daily figure still feels small. The effect
   reverses at large amounts (Gourville 2003): "$11.50 a day" sells worse than
   "$4,200 a year", so a big monthly plan keeps its monthly price only. */
const PER_DAY_LIMIT = { inr: 500, usd: 10 };

const sum = (items, currency) => items.reduce((total, item) => total + item.price[currency], 0);

/** "₹1,20,000" or "$1,500", whole amounts only. */
export const formatAmount = (amount, currency) =>
  currency === "inr" ? formatInr(amount) : formatUsd(amount);

/** URL-safe key for an add-on, unique within its Loop. */
export const addOnKey = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * What taking these add-ons with the Loop saves: the rate, to the nearest
 * step. A single small add-on can round to nothing, and then the page shows
 * no saving rather than an odd one.
 */
export function addOnSaving(addOns, currency) {
  const step = SAVING_STEP[currency];
  return Math.round((sum(addOns, currency) * ADD_ON_SAVING_RATE) / step) * step;
}

/**
 * A build's price. `picked` holds add-on names; unknown names are ignored, so
 * a stale link can never price something the Loop does not offer.
 *
 * `deposit` is the half paid to start, from the payment terms in the FAQ:
 * half to start, half at launch.
 */
export function quote(kit, picked, currency) {
  const addOns = kit.addOns.filter((addOn) => picked.includes(addOn.name));
  const base = kit.price[currency];
  const separately = base + sum(addOns, currency);
  const saving = addOnSaving(addOns, currency);
  const total = separately - saving;
  return { base, addOns, separately, saving, total, deposit: Math.round(total / 2) };
}

/**
 * The three ready-made builds, most expensive first.
 *
 * Descending on purpose: the first price a buyer reads becomes the reference
 * for the rest, so the full build makes the recommended one look like the
 * sensible middle and the starting price look like a floor rather than the
 * offer (Suk, Lee and Lichtenstein 2012). The recommended build sits in the
 * middle, which is the position people pick when unsure.
 */
export function builds(kit) {
  return [
    { id: "complete", label: "Complete", note: "Every add-on included", addOns: kit.addOns.map((a) => a.name) },
    { id: "recommended", label: "Recommended", note: "What we would build for most", addOns: kit.recommended },
    { id: "loop", label: "Just the Loop", note: "The starting price", addOns: [] },
  ];
}

/** Which ready-made build a set of picks matches, or null for a custom one. */
export function matchingBuild(kit, picked) {
  const key = (names) => [...names].sort().join("|");
  return builds(kit).find((build) => key(build.addOns) === key(picked))?.id ?? null;
}

/**
 * The contact link for a build: `/contact?kit=<slug>&add=<key>,<key>&cur=inr`.
 * Add-ons travel as keys rather than names so the link stays readable. `add`
 * is present even when empty: a link with no `add` at all (a plain "Start
 * this Loop") means no build was chosen, which the form treats differently
 * from a build of the Loop on its own.
 */
export function buildHref(kit, picked, currency) {
  const keys = kit.addOns.filter((a) => picked.includes(a.name)).map((a) => addOnKey(a.name));
  const params = new URLSearchParams({ kit: kit.slug, add: keys.join(","), cur: currency });
  return `/contact?${params.toString().replace(/%2C/g, ",")}`;
}

/** The add-on names an `add=` parameter names, ignoring keys this Loop lacks. */
export function pickedFromKeys(kit, param) {
  const keys = (param ?? "").split(",").filter(Boolean);
  return kit.addOns.filter((a) => keys.includes(addOnKey(a.name))).map((a) => a.name);
}

/**
 * A monthly price as a daily one, rounded up so the claim is always true
 * ("under ₹83 a day"). Null once the daily figure stops sounding small.
 */
export function perDay(monthly, currency) {
  const daily = (monthly * 12) / 365;
  if (daily >= PER_DAY_LIMIT[currency]) return null;
  return currency === "inr" ? Math.ceil(daily) : Math.ceil(daily * 2) / 2;
}

/** "₹83" or "$2.50": per-day figures can carry cents, prices never do. */
export const formatPerDay = (amount, currency) =>
  currency === "usd" && !Number.isInteger(amount) ? `$${amount.toFixed(2)}` : formatAmount(amount, currency);
