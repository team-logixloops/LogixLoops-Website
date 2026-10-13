import test from "node:test";
import assert from "node:assert/strict";
import { KITS, getKitBySlug, getKitsByLine } from "@/data/kits";
import { PLANS, getPlanBySlug } from "@/data/plans";
import { getAllCaseStudies } from "@/data/caseStudies";
import { formatPrice } from "@/lib/pricing";
import { copyStrings, voiceProblems, wordCount } from "./helpers/voice.mjs";

export const LINE_SLUGS = [
  "web-and-app-development",
  "branding",
  "website-redesign",
  "seo-and-ai-search",
  "ai-automation",
  "maintenance-and-support",
];

const DEMOS = [
  "ViewportDemo",
  "PhoneScrollDemo",
  "TenantDemo",
  "InferenceDemo",
  "WorkflowDemo",
  "TokensDemo",
  "PipelineDemo",
  "ArchitectureDemo",
];

const wholePositive = (n) => Number.isInteger(n) && n > 0;
const voiceReport = (value) =>
  copyStrings(value).flatMap(([path, text]) => voiceProblems(text).map((p) => `${path}: ${p}`));

test("kit slugs are unique and every kit names a known line", () => {
  const slugs = KITS.map((kit) => kit.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const kit of KITS) assert.ok(LINE_SLUGS.includes(kit.line), `${kit.slug}: unknown line ${kit.line}`);
});

test("lookups find kits and plans, and return null for unknown slugs", () => {
  assert.equal(getKitBySlug("mvp").name, "MVP Kit");
  assert.equal(getKitBySlug("not-a-kit"), null);
  assert.equal(getKitsByLine("branding").length, 2);
  assert.equal(getPlanBySlug("squad").name, "Squad");
  assert.equal(getPlanBySlug("not-a-plan"), null);
});

test("every price is a positive whole number in both currencies", () => {
  const prices = [
    ...KITS.map((kit) => [kit.slug, kit.price]),
    ...KITS.flatMap((kit) => kit.addOns.map((addOn) => [`${kit.slug} / ${addOn.name}`, addOn.price])),
    ...PLANS.map((plan) => [plan.slug, plan.price]),
  ];
  for (const [where, price] of prices) {
    assert.ok(wholePositive(price.usd) && wholePositive(price.inr), `${where}: ${JSON.stringify(price)}`);
  }
});

test("plans bill monthly and kits are one-off", () => {
  for (const plan of PLANS) assert.equal(plan.price.per, "month", plan.slug);
  for (const kit of KITS) assert.equal(kit.price.per, undefined, kit.slug);
});

test("kit summaries are answer-first leads of 40 to 60 words", () => {
  for (const kit of KITS) {
    const words = wordCount(kit.summary);
    assert.ok(words >= 40 && words <= 60, `${kit.slug}: ${words} words`);
  }
});

test("kit meta titles fit after the 'LogixLoops | ' template", () => {
  for (const kit of KITS) assert.ok(kit.metaTitle.length <= 47, `${kit.slug}: ${kit.metaTitle.length} chars`);
});

test("kit meta descriptions stay within 70-160 characters with the price appended", () => {
  for (const kit of KITS) {
    const description = `${kit.metaDescription} From ${formatPrice(kit.price)}.`;
    assert.ok(description.length >= 70 && description.length <= 160, `${kit.slug}: ${description.length} chars`);
  }
});

test("every kit ends with The Loop", () => {
  for (const kit of KITS) assert.equal(kit.steps.at(-1).title, "The Loop", kit.slug);
});

test("demo keys name a real signature demo", () => {
  for (const kit of KITS) assert.ok(kit.demo === null || DEMOS.includes(kit.demo), `${kit.slug}: ${kit.demo}`);
});

test("related work points at real case studies", () => {
  const studies = new Set(getAllCaseStudies().map((study) => study.slug));
  for (const kit of KITS) {
    for (const slug of kit.work) assert.ok(studies.has(slug), `${kit.slug}: unknown study ${slug}`);
  }
});

test("kit and plan copy follows the voice rules", () => {
  assert.deepEqual(voiceReport({ KITS, PLANS }), []);
});
