import test from "node:test";
import assert from "node:assert/strict";
import { KITS } from "@/data/kits";
import { PLANS } from "@/data/plans";
import { LINES } from "@/data/lines";
import { CONTACT_TOPICS, contactPicks } from "@/lib/contact-picks";

const picks = contactPicks();

test("every kit, plan and line link to /contact preselects a known topic", () => {
  const all = [
    ...KITS.map((kit) => picks.kit[kit.slug]),
    ...PLANS.map((plan) => picks.plan[plan.slug]),
    ...LINES.map((line) => picks.line[line.slug]),
  ];
  for (const pick of all) {
    assert.ok(pick, "missing pick");
    assert.ok(CONTACT_TOPICS.includes(pick.topic), `${pick.label}: ${pick.topic}`);
  }
});

test("a kit link names the kit and files it under its line", () => {
  assert.deepEqual(picks.kit["whatsapp-ai"], { label: "WhatsApp AI Loop", topic: "AI & Automation" });
  assert.deepEqual(picks.plan.growth, { label: "Growth plan", topic: "Maintenance & Support Plans" });
});

test("the form offers every line plus a way out", () => {
  assert.deepEqual(CONTACT_TOPICS, [...LINES.map((line) => line.label), "Not sure yet"]);
});

test("picks are plain data that can cross to a client component", () => {
  assert.deepEqual(JSON.parse(JSON.stringify(picks)), picks);
});
