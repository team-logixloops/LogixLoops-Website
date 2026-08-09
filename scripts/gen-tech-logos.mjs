/**
 * LOGIXLOOPS — tech logo generator
 *
 * Emits `src/data/tech-logos.js` from the `simple-icons` devDependency, so the
 * app ships flat path strings and carries no icon library at runtime. Eighteen
 * glyphs is a few kB of `d` attributes; the package is 3,400 icons.
 *
 * Run from the repo root:  node scripts/gen-tech-logos.mjs
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import * as si from "simple-icons";

// [export key, label]. The labels mirror TECH_ECOSYSTEMS in
// src/data/infrastructure.js; the order here is the order round the path, and
// it interleaves the four ecosystems so no stretch of the curve is all
// database or all cloud.
//
// Two names from TECH_ECOSYSTEMS have no glyph here: simple-icons removed the
// AWS and OpenAI marks after trademark requests, and redrawing them by hand is
// exactly the thing those requests were about. Kafka and Snowflake take their
// slots — both are already on the /technology page, so the band still reads as
// a subset of the grid below it rather than a different list.
const WANTED = [
  ["siReact", "React"],
  ["siNodedotjs", "Node.js"],
  ["siApachekafka", "Apache Kafka"],
  ["siPostgresql", "PostgreSQL"],
  ["siNextdotjs", "Next.js"],
  ["siGo", "Go"],
  ["siKubernetes", "Kubernetes"],
  ["siRedis", "Redis"],
  ["siTypescript", "TypeScript"],
  ["siPython", "Python"],
  ["siDocker", "Docker"],
  ["siMongodb", "MongoDB"],
  ["siTailwindcss", "Tailwind CSS"],
  ["siGraphql", "GraphQL"],
  ["siTerraform", "Terraform"],
  ["siTensorflow", "TensorFlow"],
  ["siSnowflake", "Snowflake"],
  ["siVercel", "Vercel"],
  ["siCloudflare", "Cloudflare"],
];

const missing = WANTED.filter(([key]) => !si[key]).map(([key]) => key);
if (missing.length) {
  console.error(`Missing simple-icons exports: ${missing.join(", ")}`);
  process.exit(1);
}

const entries = WANTED.map(([key, label]) => {
  const icon = si[key];
  // Simple-icons marks are single-path today, but pull *every* `d` rather
  // than assuming one — a multi-path glyph would otherwise render truncated
  // with no error to say so.
  const paths = [...icon.svg.matchAll(/<path\s+d="([^"]+)"/g)].map((m) => m[1]);
  if (!paths.length) throw new Error(`No path data for ${key}`);
  return { name: label, slug: icon.slug, paths };
});

const body = entries
  .map(
    (e) =>
      `  {\n` +
      `    name: ${JSON.stringify(e.name)},\n` +
      `    slug: ${JSON.stringify(e.slug)},\n` +
      `    paths: [\n${e.paths.map((p) => `      ${JSON.stringify(p)},`).join("\n")}\n    ],\n` +
      `  },`
  )
  .join("\n");

const out = `/**
 * LOGIXLOOPS — Tech stack glyphs
 *
 * GENERATED FILE — do not hand-edit. Run \`node scripts/gen-tech-logos.mjs\`
 * to regenerate from the \`simple-icons\` devDependency.
 *
 * Every mark is a monochrome 24x24 glyph rendered with \`fill="currentColor"\`,
 * so the logos take their colour from the surrounding theme rather than
 * dragging eighteen competing brand palettes onto a page built out of one
 * navy. Trademarks belong to their respective owners; these are nominative
 * references to the stack we build on.
 *
 * @typedef {object} TechLogo
 * @property {string} name Display name, used as the accessible label.
 * @property {string} slug simple-icons slug, stable across regenerations.
 * @property {string[]} paths \`d\` attributes, drawn into a 0 0 24 24 viewBox.
 *
 * @type {TechLogo[]}
 */
export const TECH_LOGOS = [
${body}
];

export default TECH_LOGOS;
`;

const target = resolve(process.cwd(), "src/data/tech-logos.js");
writeFileSync(target, out);
console.log(`Wrote ${entries.length} logos to ${target}`);
