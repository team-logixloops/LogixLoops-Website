import Link from "next/link";
import { kitMentions } from "@/lib/kit-links";

/**
 * Copy with every kit it names turned into a link to that kit. `except` is
 * the kit whose page this is, which stays plain text. Server-only, because
 * the lookup reads the whole catalogue; a client component takes the
 * rendered result as a prop.
 */
export default function KitLinkedText({ text, except }) {
  return kitMentions(text, { except }).map((part, i) =>
    part.href ? (
      <Link key={i} href={part.href} className="text-primary underline-offset-4 hover:underline">
        {part.text}
      </Link>
    ) : (
      part.text
    )
  );
}

/** FAQ entries with their answers linked, ready for ServiceMasterFAQ. */
export const linkFaqs = (faqs, except) =>
  faqs.map((faq) => ({ ...faq, a: <KitLinkedText text={faq.a} except={except} /> }));
