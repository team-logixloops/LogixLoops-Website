import test from "node:test";
import assert from "node:assert/strict";
import { CARD } from "@/components/sections/service-master/tokens";

test("line and kit page cards are opaque panels, not backdrop blurs", () => {
  assert.ok(!CARD.includes("backdrop-blur"), CARD);
  assert.ok(CARD.includes("bg-surface-container-lowest/85"), CARD);
});
