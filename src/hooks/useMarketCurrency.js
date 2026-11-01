"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Which market's prices a visitor sees where only one currency fits: the
 * Loop builder and the contact form. Everywhere else both prices show.
 *
 * A saved choice wins; otherwise an Indian time zone means rupees and
 * anything else means dollars. The server always renders rupees, the home
 * market, and React swaps after hydration without a mismatch because this
 * reads through `useSyncExternalStore` with a server snapshot.
 *
 * Storage can be missing or throw (private windows, blocked site data), so a
 * choice also lives in memory for the rest of the visit.
 */
const KEY = "ll-currency";
const EVENT = "ll-currency-change";
const INDIA_ZONES = ["Asia/Kolkata", "Asia/Calcutta"];

let chosen = null;

const isCurrency = (value) => value === "inr" || value === "usd";

function read() {
  if (chosen) return chosen;
  try {
    const saved = window.localStorage.getItem(KEY);
    if (isCurrency(saved)) return saved;
  } catch {}
  try {
    return INDIA_ZONES.includes(Intl.DateTimeFormat().resolvedOptions().timeZone) ? "inr" : "usd";
  } catch {
    return "inr";
  }
}

function subscribe(onChange) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useMarketCurrency() {
  const currency = useSyncExternalStore(subscribe, read, () => "inr");
  const setCurrency = useCallback((next) => {
    if (!isCurrency(next)) return;
    chosen = next;
    try {
      window.localStorage.setItem(KEY, next);
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return [currency, setCurrency];
}
