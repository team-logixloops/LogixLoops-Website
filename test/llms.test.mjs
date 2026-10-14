import test from "node:test";
import assert from "node:assert/strict";
import { buildLlmsTxt } from "@/lib/llms";
import { BRAND } from "@/lib/constants";
import { LINES } from "@/data/lines";
import { KITS } from "@/data/kits";
import { CURRENCY_NOTE, formatPrice } from "@/lib/pricing";
import { voiceProblems } from "./helpers/voice.mjs";
import { RETIRED } from "./helpers/retired.mjs";

const text = buildLlmsTxt();

test("llms.txt opens with the entity definition", () => {
  assert.ok(text.startsWith("# LogixLoops\n"));
  assert.ok(text.includes(BRAND.definition));
});

test("llms.txt links every line, and every kit with its live price", () => {
  for (const line of LINES) assert.ok(text.includes(`https://logixloops.in/loops/${line.slug}`), line.slug);
  for (const kit of KITS) {
    assert.ok(text.includes(`https://logixloops.in/loops/${kit.slug}`), kit.slug);
    assert.ok(text.includes(formatPrice(kit.price)), `${kit.slug} price`);
  }
});

test("llms.txt carries each kit's price note and says which currency applies where", () => {
  for (const kit of KITS.filter((k) => k.priceNote)) {
    assert.ok(text.toLowerCase().includes(kit.priceNote.toLowerCase()), `${kit.slug} price note`);
  }
  assert.ok(text.includes(CURRENCY_NOTE));
});

test("llms.txt carries no retired URL", () => {
  assert.ok(!text.includes("/case-studies"));
  for (const old of Object.keys(RETIRED)) assert.ok(!text.includes(`/services/${old}`), old);
});

test("llms.txt follows the voice rules", () => {
  assert.deepEqual(voiceProblems(text), []);
});
