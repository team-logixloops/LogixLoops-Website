"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useMarketCurrency } from "@/hooks/useMarketCurrency";
import { pickedFromKeys } from "@/lib/loop-builder";
import ContactForm from "./ContactForm";

/**
 * Reads the link that brought the visitor here, so "Start this Loop" or
 * "Send this build" lands on a form that already knows what they picked:
 *
 *   ?kit=<slug>[&add=<key>,<key>][&cur=inr|usd]   a Loop, from its page or builder
 *   ?plan=<slug>                                   a maintenance plan
 *   ?line=<slug>                                   a line; its Loops are listed first
 *
 * With `kit` but no `add`, nobody chose a build, so the form starts from the
 * recommended one. An empty `add=` is the Loop on its own.
 *
 * Rendered inside <Suspense> with a plain <ContactForm> as the fallback, so
 * the static HTML still carries a working form; the key remounts it once the
 * query is known.
 */
export default function ContactFormFromLink({ catalogue, reach }) {
  const params = useSearchParams();
  const [, setCurrency] = useMarketCurrency();
  const cur = params.get("cur");

  // A builder link says which market's prices the visitor was looking at.
  useEffect(() => {
    if (cur) setCurrency(cur);
  }, [cur, setCurrency]);

  const loop = catalogue.lines.flatMap((line) => line.loops).find((l) => l.slug === params.get("kit"));
  const plan = catalogue.plans.items.find((p) => p.slug === params.get("plan"));
  const line = params.get("line");

  const initial = loop
    ? { choice: `loop:${loop.slug}`, picked: params.has("add") ? pickedFromKeys(loop, params.get("add")) : loop.recommended }
    : plan
      ? { choice: `plan:${plan.slug}` }
      : {};

  const ordered = line
    ? { ...catalogue, lines: [...catalogue.lines].sort((a, b) => (b.slug === line) - (a.slug === line)) }
    : catalogue;

  return <ContactForm key={initial.choice ?? line ?? "none"} catalogue={ordered} reach={reach} initial={initial} />;
}
