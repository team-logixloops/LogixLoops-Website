"use client";

import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "inr", label: "₹ India" },
  { value: "usd", label: "$ Elsewhere" },
];

/**
 * Two markets, two price lists, so the switch names the market rather than
 * the currency alone: a buyer in Dubai should not read "₹" as an option that
 * applies to them.
 */
export default function CurrencySwitch({ currency, onChange, className }) {
  return (
    <div
      role="radiogroup"
      aria-label="Show prices for"
      className={cn("inline-flex rounded-full border border-outline-variant/50 bg-surface-container-lowest p-1", className)}
    >
      {OPTIONS.map((option) => {
        const on = currency === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full px-4 py-1.5 font-label text-xs font-semibold tracking-wide transition-colors duration-300",
              on ? "bg-on-surface text-white" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
