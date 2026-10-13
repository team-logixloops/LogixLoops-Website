import test from "node:test";
import assert from "node:assert/strict";
import { KITS, getKitBySlug } from "@/data/kits";
import { LINES } from "@/data/lines";
import { SERVICES_FAQS } from "@/data/faq";
import { kitMentions, relatedKits } from "@/lib/kit-links";

test("a kit named in running text becomes a link to its page", () => {
  assert.deepEqual(kitMentions("Selling online: see the Online Store Kit"), [
    { text: "Selling online: see the " },
    { text: "Online Store Kit", href: "/kits/online-store" },
  ]);
});

test("a kit never links to itself, and plain text stays one part", () => {
  assert.deepEqual(kitMentions("The MVP Kit uses the same stack", { except: "mvp" }), [
    { text: "The " },
    { text: "MVP Kit" },
    { text: " uses the same stack" },
  ]);
  assert.deepEqual(kitMentions("No kits here"), [{ text: "No kits here" }]);
});

test("every 'X Kit' named in kit, line and services copy is a real kit", () => {
  const names = new Set(KITS.map((kit) => kit.name));
  const copy = [
    ...KITS.flatMap((kit) => [...kit.notFor, ...kit.fitFor, ...kit.includes, ...kit.faqs.map((faq) => faq.a)]),
    ...LINES.flatMap((line) => line.faqs.map((faq) => faq.a)),
    ...SERVICES_FAQS.map((faq) => faq.answer),
  ];
  for (const text of copy) {
    for (const [, name] of text.matchAll(/((?:[A-Z][\w-]*\s)+Kit)\b/g)) {
      const bare = name.replace(/^(The|Our|A|An)\s/, "");
      assert.ok(names.has(bare), `"${bare}" is not a kit, in: ${text.slice(0, 60)}`);
    }
  }
});

test("every kit page suggests two or three other kits, never itself", () => {
  for (const kit of KITS) {
    const related = relatedKits(kit);
    assert.ok(related.length >= 2 && related.length <= 3, `${kit.slug}: ${related.length}`);
    assert.ok(!related.includes(kit), kit.slug);
    assert.equal(new Set(related).size, related.length, kit.slug);
  }
});

test("kits named in a kit's own copy come first in its suggestions", () => {
  const related = relatedKits(getKitBySlug("business-website")).map((kit) => kit.slug);
  assert.deepEqual(related.slice(0, 2), ["online-store", "mvp"]);
});
