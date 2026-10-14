import test from "node:test";
import assert from "node:assert/strict";
import sitemap from "@/app/sitemap";
import * as constants from "@/lib/constants";
import { LINES } from "@/data/lines";
import { CATALOGUE_UPDATED, KITS } from "@/data/kits";
import { getAllPosts } from "@/data/blog";
import { RETIRED } from "./helpers/retired.mjs";

const paths = () => sitemap().map((entry) => entry.url.replace("https://logixloops.in", ""));

test("the sitemap lists every line and no retired practice", () => {
  for (const line of LINES) assert.ok(paths().includes(`/loops/${line.slug}`), line.slug);
  for (const old of Object.keys(RETIRED)) assert.ok(!paths().some((p) => p.endsWith(`/${old}`)), old);
  assert.ok(!paths().some((p) => p.startsWith("/services") || p.startsWith("/kits")), "old /services or /kits URL in sitemap");
});

test("the old SERVICES list is gone", () => {
  assert.equal("SERVICES" in constants, false);
});

test("the sitemap lists the catalogue and every kit", () => {
  assert.ok(paths().includes("/loops"));
  for (const kit of KITS) assert.ok(paths().includes(`/loops/${kit.slug}`), kit.slug);
  assert.equal(new Set(paths()).size, paths().length, "duplicate sitemap URL");
});

test("sitemap dates are content dates, never the build time", () => {
  const known = new Set([CATALOGUE_UPDATED, ...getAllPosts().map((post) => post.updatedAt || post.isoDate)].map((d) => new Date(d).getTime()));
  for (const entry of sitemap()) {
    if (entry.lastModified === undefined) continue;
    assert.ok(known.has(new Date(entry.lastModified).getTime()), `${entry.url}: ${entry.lastModified}`);
  }
  const kit = sitemap().find((entry) => entry.url.endsWith(`/loops/${KITS[0].slug}`));
  assert.equal(new Date(kit.lastModified).getTime(), new Date(CATALOGUE_UPDATED).getTime());
});
