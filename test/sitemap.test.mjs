import test from "node:test";
import assert from "node:assert/strict";
import sitemap from "@/app/sitemap";
import * as constants from "@/lib/constants";
import { LINES } from "@/data/lines";
import { KITS } from "@/data/kits";
import { RETIRED } from "./redirects.test.mjs";

const paths = () => sitemap().map((entry) => entry.url.replace("https://logixloops.in", ""));

test("the sitemap lists every line and no retired practice", () => {
  for (const line of LINES) assert.ok(paths().includes(`/services/${line.slug}`), line.slug);
  for (const old of Object.keys(RETIRED)) assert.ok(!paths().includes(`/services/${old}`), old);
});

test("the old SERVICES list is gone", () => {
  assert.equal("SERVICES" in constants, false);
});

test("the sitemap lists the catalogue and every kit", () => {
  assert.ok(paths().includes("/kits"));
  for (const kit of KITS) assert.ok(paths().includes(`/kits/${kit.slug}`), kit.slug);
});
