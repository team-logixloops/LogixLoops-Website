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
    assert.equal(rule.destination, `/services/${line}`);
    assert.equal(rule.permanent, true);
    assert.ok(LINES.some((l) => l.slug === line), `${line} is not a live line`);
  }
});

test("no redirect shadows a live line or kit page", async () => {
  const sources = new Set((await nextConfig.redirects()).map((r) => r.source));
  for (const line of LINES) assert.ok(!sources.has(`/services/${line.slug}`), line.slug);
  for (const kit of KITS) assert.ok(!sources.has(`/kits/${kit.slug}`), kit.slug);
});
