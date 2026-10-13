import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { LINES } from "@/data/lines";

/*
 * Navbar, Footer and the services grid are client components. Anything they
 * import ships to every page's JavaScript, so they must reach the lines
 * through the small index, never through lines.js, which pulls in the whole
 * kit catalogue to build its FAQ answers.
 */
const CLIENT_REACHABLE = ["src/lib/constants.js", "src/components/sections/services/ServicesInertiaGrid.jsx"];

test("client-reachable modules use the line index, not the full lines module", () => {
  for (const file of CLIENT_REACHABLE) {
    assert.ok(!readFileSync(file, "utf8").includes('"@/data/lines"'), `${file} imports @/data/lines`);
  }
});

test("faq.js, imported by client pages, never pulls in the kit catalogue", () => {
  const source = readFileSync("src/data/faq.js", "utf8");
  assert.ok(!source.includes('"@/data/kits"'), "faq.js imports @/data/kits");
  assert.ok(!source.includes('"@/data/lines"'), "faq.js imports @/data/lines");
});

test("the contact form gets its kit names as props, not from the catalogue", () => {
  for (const file of ["src/app/contact/ContactForm.jsx", "src/app/contact/ContactFormFromLink.jsx"]) {
    const source = readFileSync(file, "utf8");
    for (const heavy of ['"@/data/kits"', '"@/data/lines"']) assert.ok(!source.includes(heavy), `${file} imports ${heavy}`);
  }
});

test("the line index imports nothing", () => {
  assert.ok(existsSync("src/data/line-index.js"), "src/data/line-index.js is missing");
  assert.ok(!/^import /m.test(readFileSync("src/data/line-index.js", "utf8")));
});

test("lines.js carries every field of the line index unchanged", async () => {
  const { LINE_INDEX } = await import("@/data/line-index");
  assert.deepEqual(LINES.map((line) => line.slug), LINE_INDEX.map((entry) => entry.slug));
  LINE_INDEX.forEach((entry, i) => {
    for (const [key, value] of Object.entries(entry)) assert.equal(LINES[i][key], value, `${entry.slug}.${key}`);
  });
});
