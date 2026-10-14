import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { FOOTER_LINKS, NAV_LINKS } from "@/lib/constants";
import { LINES } from "@/data/lines";

test("top-level navigation is Loops, Work, Pricing, Company", () => {
  assert.deepEqual(NAV_LINKS.map((link) => link.label), ["Loops", "Work", "Pricing", "Company"]);
  assert.equal(NAV_LINKS.find((link) => link.label === "Loops").href, "/loops");
  assert.equal(NAV_LINKS.find((link) => link.label === "Pricing").href, "/pricing");
});

test("the Loops menu lists the six lines, each with a preview image that exists", () => {
  const loops = NAV_LINKS.find((link) => link.label === "Loops");
  assert.deepEqual(loops.children.map((child) => child.href), LINES.map((line) => `/loops/${line.slug}`));
  for (const child of loops.children) {
    assert.ok(existsSync(`public${child.image}`), child.image);
    assert.ok(child.description.startsWith(LINES.find((l) => child.href.endsWith(l.slug)).name), child.label);
  }
});

test("Company no longer duplicates the top-level Pricing link", () => {
  const company = NAV_LINKS.find((link) => link.label === "Company");
  assert.ok(!company.children.some((child) => child.href === "/pricing"));
});

test("footer Loops links point at live line pages or the hub", () => {
  const live = new Set([...LINES.map((line) => `/loops/${line.slug}`), "/loops"]);
  for (const link of FOOTER_LINKS.services) assert.ok(live.has(link.href), link.href);
});
