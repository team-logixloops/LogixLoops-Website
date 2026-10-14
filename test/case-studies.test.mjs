import test from "node:test";
import assert from "node:assert/strict";
import { getAllCaseStudies } from "@/data/caseStudies";
import { KITS, getKitBySlug } from "@/data/kits";
import { generateCaseStudySchema } from "@/lib/schema";
import { copyStrings, voiceProblems } from "./helpers/voice.mjs";

test("every case study is client work tagged with the kits it used", () => {
  for (const study of getAllCaseStudies()) {
    assert.equal("demo" in study, false, `${study.slug} still has demo`);
    assert.ok(Array.isArray(study.kits) && study.kits.length > 0, `${study.slug} has no kits`);
    for (const slug of study.kits) {
      const kit = getKitBySlug(slug);
      assert.ok(kit, `${study.slug}: unknown kit ${slug}`);
      assert.ok(kit.work.includes(study.slug), `${slug}.work is missing ${study.slug}`);
    }
  }
});

test("kits only claim work that names them back", () => {
  const bySlug = new Map(getAllCaseStudies().map((study) => [study.slug, study]));
  for (const kit of KITS) {
    for (const slug of kit.work) assert.ok(bySlug.get(slug).kits.includes(kit.slug), `${slug}.kits is missing ${kit.slug}`);
  }
});

test("case study schema never describes client work as a reference build", () => {
  for (const study of getAllCaseStudies()) {
    const node = generateCaseStudySchema(study);
    assert.equal(node.creativeWorkStatus, undefined, study.slug);
    assert.equal(node["@type"], study.publishedAt ? "Article" : "CreativeWork", study.slug);
  }
});

test("case study copy follows the voice rules", () => {
  const problems = getAllCaseStudies().flatMap((study) =>
    copyStrings(study).flatMap(([path, text]) => voiceProblems(text).map((p) => `${study.slug} ${path}: ${p}`))
  );
  assert.deepEqual(problems, []);
});
