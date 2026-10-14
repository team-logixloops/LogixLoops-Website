import Link from "next/link";
import { cn } from "@/lib/utils";
import { CURRENCY_NOTE, PRICE_TERMS_HREF, PRICE_TERMS_NOTE } from "@/lib/pricing";

/**
 * The small print that travels with every price list: every figure is a
 * starting price, and which currency is whose. It links to the pricing
 * section of the Terms, so "starting from" is backed by something a buyer
 * can read. `children` follows the terms link, for a page's own next step.
 */
export default function PriceNote({ className, children }) {
  return (
    <p className={cn("font-body text-body-sm text-on-surface-variant", className)}>
      {PRICE_TERMS_NOTE} {CURRENCY_NOTE}{" "}
      <Link href={PRICE_TERMS_HREF} className="text-primary underline-offset-4 hover:underline">
        Read the pricing terms
      </Link>
      .{children && <> {children}</>}
    </p>
  );
}
