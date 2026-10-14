import test from "node:test";
import assert from "node:assert/strict";
import { generateKitSchema, generateOrganizationSchema } from "@/lib/schema";
import { BRAND, PROMISES } from "@/lib/constants";
import { KITS, getKitBySlug } from "@/data/kits";
import { PLANS } from "@/data/plans";

const ENTITY =
  "LogixLoops is a brand, technology and growth studio based in Jaipur, India. It sells fixed-scope service packages called Loops, with published starting prices, for websites, apps, branding, SEO and AI search visibility, and AI automation, for businesses in India, the US, the UK and the UAE.";

const catalog = () => generateOrganizationSchema().hasOfferCatalog;

test("the entity definition is the one in the spec", () => {
  assert.equal(BRAND.definition, ENTITY);
  assert.equal(generateOrganizationSchema().description, ENTITY);
});

test("the offer catalogue lists every kit and plan", () => {
  assert.equal(catalog().name, "Loops by LogixLoops");
  assert.equal(catalog().itemListElement.length, KITS.length + PLANS.length);
});

test("kit offers carry their page URL and a from-price in both currencies", () => {
  const mvp = catalog().itemListElement.find((offer) => offer.itemOffered.name === "MVP Loop");
  assert.equal(mvp.url, "https://logixloops.in/loops/mvp");
  const { usd, inr } = getKitBySlug("mvp").price;
  assert.deepEqual(
    mvp.priceSpecification.map((spec) => [spec.priceCurrency, spec.minPrice]),
    [["USD", usd], ["INR", inr]]
  );
});

test("plan offers are marked as monthly", () => {
  const squad = catalog().itemListElement.find((offer) => offer.itemOffered.name === "Squad plan");
  for (const spec of squad.priceSpecification) {
    assert.equal(spec["@type"], "UnitPriceSpecification");
    assert.equal(spec.unitText, "MONTH");
  }
});

test("a kit's Service node points at its page and carries its price", () => {
  const node = generateKitSchema(getKitBySlug("whatsapp-ai"));
  assert.equal(node["@type"], "Service");
  assert.equal(node.url, "https://logixloops.in/loops/whatsapp-ai");
  assert.equal(node.provider["@id"], "https://logixloops.in/#organization");
  assert.equal(node.offers.priceSpecification[0].minPrice, getKitBySlug("whatsapp-ai").price.usd);
});

test("a kit's Service node and its catalogue offer share one @id", () => {
  for (const kit of KITS) {
    const node = generateKitSchema(kit);
    assert.equal(node["@id"], `https://logixloops.in/loops/${kit.slug}#service`, kit.slug);
    const listed = catalog().itemListElement.find((offer) => offer.itemOffered.name === kit.name);
    assert.equal(listed.itemOffered["@id"], node["@id"], kit.slug);
  }
});

test("knowsAbout covers the new lines", () => {
  const topics = generateOrganizationSchema().knowsAbout;
  for (const topic of ["Brand identity design", "Generative engine optimisation", "WhatsApp Business automation", "Website maintenance"]) {
    assert.ok(topics.includes(topic), topic);
  }
});

test("six promises, each with the usual-agency contrast", () => {
  assert.equal(PROMISES.length, 6);
  for (const promise of PROMISES) assert.ok(promise.icon && promise.title && promise.detail && promise.usual, promise.title);
});
