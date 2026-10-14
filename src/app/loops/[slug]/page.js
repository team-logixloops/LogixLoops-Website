import { notFound } from "next/navigation";
import { getAllLines, getLineBySlug } from "@/data/lines";
import { getAllKits, getKitBySlug } from "@/data/kits";
import LineView, { lineMetadata } from "./line-view";
import KitView, { kitMetadata } from "./kit-view";

/*
 * One URL tree for everything sold: /loops/<line> for each of the six groups
 * and /loops/<loop> for each Loop. Line and Loop slugs never collide (a test
 * holds that), so one dynamic segment can serve both.
 */

// Every line and Loop is known at build time. Anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...getAllLines(), ...getAllKits()].map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const line = getLineBySlug(slug);
  if (line) return lineMetadata(line);
  const kit = getKitBySlug(slug);
  return kit ? kitMetadata(kit) : {};
}

export default async function LoopsSlugPage({ params }) {
  const { slug } = await params;
  const line = getLineBySlug(slug);
  if (line) return <LineView line={line} />;
  const kit = getKitBySlug(slug);
  if (!kit) notFound();
  return <KitView kit={kit} />;
}
