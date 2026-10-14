/**
 * Price formatting for kits, add-ons and plans.
 *
 * Both currencies always appear together, but they are not conversions of
 * each other. Each is the entry price of its own market: rupees for
 * businesses in India, US dollars for everyone else. CURRENCY_NOTE says so
 * wherever prices are listed, and the prose form names India outright.
 * INR is grouped the Indian way (₹1,20,000), USD the international way
 * ($1,500).
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

/** For headings and meta: "Starting from $500 · ₹15,000". Every price is a floor. */
export const startingFrom = (price) => `Starting from ${formatPrice(price)}`;

/**
 * What "starting from" means, shown with every price list and backed by the
 * pricing section of the Terms (PRICE_TERMS_HREF).
 */
export const PRICE_TERMS_NOTE =
  "All prices are starting prices for the scope listed on each Loop. Your final price depends on your project and is confirmed in a written quote before work starts. Taxes such as GST are extra.";

export const PRICE_TERMS_HREF = "/legal/terms#pricing";

/** Shown wherever prices are listed, because the two are set separately. */
export const CURRENCY_NOTE = "Prices in ₹ are for businesses in India. Prices in $ apply everywhere else.";

/** For running text: "$1,500 (₹60,000 in India)", or "$150 (₹6,000 in India) a month". */
export function formatPriceProse(price) {
  const base = `${formatUsd(price.usd)} (${formatInr(price.inr)} in India)`;
  return price.per === "month" ? `${base} a month` : base;
}

/** The cheapest of anything carrying a `price`, compared in USD. */
export function cheapest(items) {
  return items.reduce((low, item) => (item.price.usd < low.price.usd ? item : low));
}
