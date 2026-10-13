import test from "node:test";
import assert from "node:assert/strict";
import { BRAND } from "@/lib/constants";

test("app modules load through the @/ alias", () => {
  assert.equal(BRAND.name, "LogixLoops");
});
