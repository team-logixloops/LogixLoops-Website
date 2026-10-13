import test from "node:test";
import assert from "node:assert/strict";
import { cheapest, formatInr, formatPrice, formatPriceProse, formatUsd } from "@/lib/pricing";

test("USD uses international grouping", () => {
  assert.equal(formatUsd(1500), "$1,500");
  assert.equal(formatUsd(15000), "$15,000");
});

test("INR uses Indian lakh grouping", () => {
  assert.equal(formatInr(6000), "₹6,000");
  assert.equal(formatInr(120000), "₹1,20,000");
  assert.equal(formatInr(250000), "₹2,50,000");
});

test("formatPrice shows both currencies, with /mo for monthly prices", () => {
  assert.equal(formatPrice({ usd: 1500, inr: 60000 }), "$1,500 · ₹60,000");
  assert.equal(formatPrice({ usd: 150, inr: 6000, per: "month" }), "$150/mo · ₹6,000/mo");
});

test("formatPriceProse reads naturally in a sentence", () => {
  assert.equal(formatPriceProse({ usd: 1500, inr: 60000 }), "$1,500 (₹60,000)");
  assert.equal(formatPriceProse({ usd: 150, inr: 6000, per: "month" }), "$150 (₹6,000) a month");
});

test("cheapest picks the lowest USD price", () => {
  const items = [{ price: { usd: 900 } }, { price: { usd: 600 } }, { price: { usd: 1200 } }];
  assert.equal(cheapest(items).price.usd, 600);
});
