import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../src/lib/portalSession.js", import.meta.url), "utf8");

test("after the password, the website hands over to the portal's code page and back", () => {
  assert.match(source, /\/two-step-sign-in\?return_to=/);
  assert.match(source, /`\$\{origin\}\/client-login`/);
  // Both the sign-in and the "who is signed in" check follow the portal's two-step answer.
  assert.equal((source.match(/if \(body\.twoStep\) return goToTwoStep\(\);/g) || []).length, 2);
});
