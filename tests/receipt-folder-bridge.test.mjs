import assert from "node:assert/strict";
import test from "node:test";

import { installReceiptFolderBridge } from "../src/lib/receiptFolderBridge.js";

// A stand-in page holding one portal frame, recording what is posted back to it.
function page({ withPicker = true } = {}) {
  const posted = [];
  const frame = { postMessage: (message, origin) => posted.push({ message, origin }) };
  const listeners = [];
  const win = {
    document: { querySelectorAll: () => [{ contentWindow: frame }] },
    addEventListener: (type, fn) => listeners.push(fn),
    removeEventListener: () => {},
  };
  globalThis.window = { showDirectoryPicker: withPicker ? async () => ({ name: "ATLAS Claim Receipts" }) : undefined };
  installReceiptFolderBridge(win);
  const send = async (event) => { for (const fn of listeners) await fn(event); };
  return { frame, posted, send };
}

test("only the portal, in a frame on this page, gets an answer", async () => {
  const { frame, posted, send } = page();
  const message = { type: "cls-receipt-folder", op: "unknown-op", requestId: "r1", brand: "vals" };
  await send({ origin: "https://evil.example", source: frame, data: message });
  await send({ origin: "https://portal.completelawsupport.com", source: { postMessage() {} }, data: message });
  await send({ origin: "https://portal.completelawsupport.com", source: frame, data: { type: "something-else" } });
  assert.equal(posted.length, 0);

  await send({ origin: "https://portal.completelawsupport.com", source: frame, data: message });
  assert.equal(posted.length, 1);
  assert.equal(posted[0].origin, "https://portal.completelawsupport.com", "answered only to the portal");
  assert.equal(posted[0].message.type, "cls-receipt-folder:reply");
  assert.equal(posted[0].message.requestId, "r1");
});

test("a browser without the folder picker is told to use Chrome", async () => {
  const { frame, posted, send } = page({ withPicker: false });
  await send({ origin: "https://portal.completelawsupport.com", source: frame, data: { type: "cls-receipt-folder", op: "status", requestId: "r2", brand: "vals" } });
  assert.equal(posted[0].message.ok, false);
  assert.match(posted[0].message.error, /Chrome/);
});
