import test from "node:test";
import assert from "node:assert/strict";
import { KITS, getKitBySlug } from "@/data/kits";
import {
  CURRENCIES,
  addOnKey,
  addOnSaving,
  buildHref,
  builds,
  formatPerDay,
  matchingBuild,
  perDay,
  pickedFromKeys,
  quote,
} from "@/lib/loop-builder";

const website = getKitBySlug("business-website");

test("every Loop recommends a strict subset of its own add-ons", () => {
  for (const kit of KITS) {
    const names = kit.addOns.map((a) => a.name);
    assert.ok(kit.recommended?.length > 0, `${kit.slug}: no recommended add-ons`);
    assert.ok(kit.recommended.length < names.length, `${kit.slug}: recommended is the complete build`);
    for (const name of kit.recommended) assert.ok(names.includes(name), `${kit.slug}: ${name}`);
  }
});

test("add-on keys are unique within each Loop", () => {
  for (const kit of KITS) {
    const keys = kit.addOns.map((a) => addOnKey(a.name));
    assert.equal(new Set(keys).size, keys.length, kit.slug);
  }
  assert.equal(addOnKey("Social media Loop: templates and profile assets"), "social-media-loop-templates-and-profile-assets");
});

test("the saving is a fifth of the add-ons, on a round step, and nothing without add-ons", () => {
  assert.equal(addOnSaving([], "inr"), 0);
  assert.equal(addOnSaving([{ price: { inr: 5000, usd: 150 } }, { price: { inr: 5000, usd: 150 } }], "inr"), 2000);
  assert.equal(addOnSaving([{ price: { inr: 5000, usd: 150 } }, { price: { inr: 5000, usd: 150 } }], "usd"), 50);
  // A single small add-on rounds to nothing rather than to an odd figure.
  assert.equal(addOnSaving([{ price: { inr: 1500, usd: 40 } }], "usd"), 0);
});

test("a quote adds the picked add-ons, takes the saving off and halves for the deposit", () => {
  const q = quote(website, ["Copywriting for every page", "Second language"], "inr");
  assert.equal(q.base, 15000);
  assert.equal(q.separately, 25000);
  assert.equal(q.saving, 2000);
  assert.equal(q.total, 23000);
  assert.equal(q.deposit, 11500);
});

test("a quote ignores add-ons the Loop does not offer", () => {
  assert.deepEqual(quote(website, ["Free yacht"], "usd"), quote(website, [], "usd"));
  assert.equal(quote(website, [], "usd").total, website.price.usd);
});

test("no build anywhere costs more than buying its parts separately, or less than the Loop", () => {
  for (const kit of KITS) {
    for (const build of builds(kit)) {
      for (const currency of CURRENCIES) {
        const q = quote(kit, build.addOns, currency);
        assert.ok(q.total <= q.separately, `${kit.slug} ${build.id} ${currency}`);
        assert.ok(q.total >= kit.price[currency], `${kit.slug} ${build.id} ${currency}`);
      }
    }
  }
});

test("builds run most expensive first, with the starting price last", () => {
  for (const kit of KITS) {
    const totals = builds(kit).map((b) => quote(kit, b.addOns, "inr").total);
    assert.deepEqual([...totals].sort((a, b) => b - a), totals, kit.slug);
    assert.equal(totals.at(-1), kit.price.inr, kit.slug);
  }
});

test("matchingBuild names a ready-made build regardless of order, and null for a custom one", () => {
  assert.equal(matchingBuild(website, []), "loop");
  assert.equal(matchingBuild(website, [...website.recommended].reverse()), "recommended");
  assert.equal(matchingBuild(website, website.addOns.map((a) => a.name)), "complete");
  assert.equal(matchingBuild(website, ["Second language"]), null);
});

test("a build's contact link round-trips its add-ons and currency", () => {
  const picked = ["Copywriting for every page", "Extra page"];
  const href = buildHref(website, picked, "usd");
  assert.equal(href, "/contact?kit=business-website&add=extra-page,copywriting-for-every-page&cur=usd");
  const params = new URL(href, "https://logixloops.in").searchParams;
  assert.deepEqual(pickedFromKeys(website, params.get("add")), ["Extra page", "Copywriting for every page"]);
  assert.equal(buildHref(website, [], "inr"), "/contact?kit=business-website&add=&cur=inr");
  assert.deepEqual(pickedFromKeys(website, "nope,extra-page"), ["Extra page"]);
  assert.deepEqual(pickedFromKeys(website, null), []);
});

test("per-day framing rounds up and stops once the figure is no longer small", () => {
  assert.equal(perDay(2500, "inr"), 83);
  assert.equal(perDay(75, "usd"), 2.5);
  assert.equal(perDay(75000, "inr"), null);
  assert.equal(perDay(2000, "usd"), null);
  assert.equal(formatPerDay(2.5, "usd"), "$2.50");
  assert.equal(formatPerDay(83, "inr"), "₹83");
});
