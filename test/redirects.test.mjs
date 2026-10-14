import test from "node:test";
import assert from "node:assert/strict";
import nextConfig from "../next.config.mjs";
import { LINES } from "@/data/lines";
import { KITS } from "@/data/kits";
import { RETIRED } from "./helpers/retired.mjs";

test("every retired practice URL redirects permanently to its line", async () => {
  const redirects = await nextConfig.redirects();
  for (const [old, line] of Object.entries(RETIRED)) {
    const rule = redirects.find((r) => r.source === `/services/${old}`);
    assert.ok(rule, `no redirect for ${old}`);
    assert.equal(rule.destination, `/loops/${line}`);
    assert.equal(rule.permanent, true);
    assert.ok(LINES.some((l) => l.slug === line), `${line} is not a live line`);
  }
});

test("no redirect shadows a live line or Loop page", async () => {
  const sources = (await nextConfig.redirects()).map((r) => r.source);
  assert.ok(!sources.some((source) => source === "/loops" || source.startsWith("/loops/")));
});

test("every old /services and /kits URL redirects to /loops in one hop", async () => {
  const redirects = await nextConfig.redirects();
  const find = (source) => redirects.find((r) => r.source === source);
  assert.equal(find("/services").destination, "/loops");
  assert.equal(find("/services/:slug").destination, "/loops/:slug");
  assert.equal(find("/kits").destination, "/loops");
  assert.equal(find("/kits/:slug").destination, "/loops/:slug");
  for (const rule of redirects) {
    assert.ok(rule.permanent, rule.source);
    // One hop: no destination is itself a redirect source.
    assert.ok(!redirects.some((other) => other.source === rule.destination), `${rule.source} chains`);
  }
  // The specific practice rules must win over the general /services/:slug one.
  const firstGeneral = redirects.findIndex((r) => r.source === "/services/:slug");
  for (const old of Object.keys(RETIRED)) {
    assert.ok(redirects.findIndex((r) => r.source === `/services/${old}`) < firstGeneral, old);
  }
});
