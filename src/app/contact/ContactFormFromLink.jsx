"use client";

import { useSearchParams } from "next/navigation";
import ContactForm from "./ContactForm";

/**
 * Reads `?kit=`, `?plan=` or `?line=` from the link that brought the visitor
 * here, so "Start this kit" lands on a form that already knows which kit.
 * `picks` is built on the server from the catalogue and passed in, which
 * keeps the catalogue itself out of this bundle.
 *
 * Rendered inside <Suspense> with a plain <ContactForm> as the fallback, so
 * the static HTML still carries a working form; the key remounts it once the
 * query is known.
 */
export default function ContactFormFromLink({ topics, picks }) {
  const params = useSearchParams();
  const pick =
    picks.kit[params.get("kit")] || picks.plan[params.get("plan")] || picks.line[params.get("line")] || null;

  return <ContactForm key={pick?.label ?? "none"} topics={topics} pick={pick} />;
}
