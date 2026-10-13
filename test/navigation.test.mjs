import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { FOOTER_LINKS, NAV_LINKS } from "@/lib/constants";
import { LINES } from "@/data/lines";

test("top-level navigation is Services, Kits, Work, Pricing, Company", () => {
  assert.deepEqual(NAV_LINKS.map((link) => link.label), ["Services", "Kits", "Work", "Pricing", "Company"]);
  assert.equal(NAV_LINKS.find((link) => link.label === "Kits").href, "/kits");
  assert.equal(NAV_LINKS.find((link) => link.label === "Pricing").href, "/pricing");
});

test("the Services menu lists the six lines, each with a preview image that exists", () => {
  const services = NAV_LINKS.find((link) => link.label === "Services");
  assert.deepEqual(services.children.map((child) => child.href), LINES.map((line) => `/services/${line.slug}`));
  for (const child of services.children) {
    assert.ok(existsSync(`public${child.image}`), child.image);
    assert.ok(child.description.startsWith(LINES.find((l) => child.href.endsWith(l.slug)).name), child.label);
  }
});

test("Company no longer duplicates the top-level Pricing link", () => {
  const company = NAV_LINKS.find((link) => link.label === "Company");
  assert.ok(!company.children.some((child) => child.href === "/pricing"));
});

test("footer service links point at live line pages or the catalogue", () => {
  const live = new Set([...LINES.map((line) => `/services/${line.slug}`), "/kits"]);
  for (const link of FOOTER_LINKS.services) assert.ok(live.has(link.href), link.href);
});
