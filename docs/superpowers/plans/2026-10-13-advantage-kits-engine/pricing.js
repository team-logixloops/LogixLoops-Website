/**
 * Price formatting for kits, add-ons and plans.
 *
 * Both currencies always appear together. The studio sells to India and
 * abroad, and a visitor should never have to convert. INR is grouped the
 * Indian way (₹1,20,000), USD the international way ($1,500).
 */

const usd = new Intl.NumberFormat("en-US");
const inr = new Intl.NumberFormat("en-IN");

export const formatUsd = (amount) => `$${usd.format(amount)}`;
export const formatInr = (amount) => `₹${inr.format(amount)}`;

/** For chips and cards: "$1,500 · ₹60,000", or "$150/mo · ₹6,000/mo". */
export function formatPrice(price) {
  const suffix = price.per === "month" ? "/mo" : "";
  return `${formatUsd(price.usd)}${suffix} · ${formatInr(price.inr)}${suffix}`;
}

/** For running text: "$1,500 (₹60,000)", or "$150 (₹6,000) a month". */
export function formatPriceProse(price) {
  const base = `${formatUsd(price.usd)} (${formatInr(price.inr)})`;
  return price.per === "month" ? `${base} a month` : base;
}

/** The cheapest of anything carrying a `price`, compared in USD. */
export function cheapest(items) {
  return items.reduce((low, item) => (item.price.usd < low.price.usd ? item : low));
}
