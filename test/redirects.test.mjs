import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
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

/* A Next.js redirect source as a regex: `:param` is one segment, `:param*` any. */
const sourcePattern = (source) =>
  new RegExp(
    `^${source
      .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
      .replace(/:\w+\*/g, ".*")
      .replace(/:\w+/g, "[^/]+")}$`
  );

const publicFiles = (dir = "public") =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? publicFiles(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`.slice("public".length)]
  );

// Redirects run before public/ is served, so a broad rule such as
// /services/:slug silently 404s any file that sits under /services/.
test("no redirect shadows a file in public/", async () => {
  const patterns = (await nextConfig.redirects()).map((r) => [r.source, sourcePattern(r.source)]);
  for (const file of publicFiles()) {
    const hit = patterns.find(([, pattern]) => pattern.test(file));
    assert.ok(!hit, `${file} is redirected by ${hit?.[0]}`);
  }
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
