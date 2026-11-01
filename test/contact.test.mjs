import test from "node:test";
import assert from "node:assert/strict";
import { KITS } from "@/data/kits";
import { PLANS } from "@/data/plans";
import { LINES } from "@/data/lines";
import { contactCatalogue } from "@/lib/contact-picks";

const catalogue = contactCatalogue();
const loops = catalogue.lines.flatMap((line) => line.loops);

test("the form offers every Loop exactly once, under its own line", () => {
  assert.deepEqual(loops.map((l) => l.slug).sort(), KITS.map((k) => k.slug).sort());
  for (const kit of KITS) {
    const line = LINES.find((l) => l.slug === kit.line);
    const group = catalogue.lines.find((g) => g.slug === kit.line);
    assert.ok(group.loops.some((l) => l.slug === kit.slug), kit.slug);
    assert.equal(group.label, line.label);
  }
});

test("each Loop carries what the form needs to price a build", () => {
  const whatsapp = loops.find((l) => l.slug === "whatsapp-ai");
  assert.equal(whatsapp.name, "WhatsApp AI Loop");
  assert.equal(whatsapp.line, "AI & Automation");
  assert.ok(whatsapp.addOns.length > 0);
  assert.ok(whatsapp.recommended.length > 0);
  assert.ok(whatsapp.price.inr > 0 && whatsapp.price.usd > 0);
});

test("the plans are offered under the maintenance line, and no Loop is", () => {
  assert.deepEqual(catalogue.plans.items.map((p) => p.slug), PLANS.map((p) => p.slug));
  assert.equal(catalogue.plans.items.find((p) => p.slug === "growth").name, "Growth plan");
  assert.ok(!catalogue.lines.some((g) => g.slug === catalogue.plans.slug));
});

test("the catalogue is plain data that can cross to a client component", () => {
  assert.deepEqual(JSON.parse(JSON.stringify(catalogue)), catalogue);
});
