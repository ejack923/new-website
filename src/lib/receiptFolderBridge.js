// Lets the portal, shown in a frame on these pages, pick up ATLAS claim receipts from a
// folder on this computer (Emma, 26 Oct 2026: Documents\ATLAS Claim Receipts).
//
// Chrome will not open a folder picker inside a frame from another site, so the portal's
// Claim receipts folder (emma-frontend, src/lib/receiptFolder.js) asks this page instead:
//   status - is a folder linked, and may it be read without asking?
//   link   - choose the folder (Chrome's folder picker), and remember it
//   files  - the PDFs in it (and one level of folders inside it)
//   unlink - forget the folder
//
// The same four requests with kind "cms" are for the portal's Court listings page (Emma,
// 7 Nov 2026): a separate folder (Downloads for Emma) where the CMS Portal hearings list is
// downloaded, answered with only the spreadsheets saved there in the last week.
//
// It answers only the portal (portal.completelawsupport.com), only a frame on this page, and
// only with PDFs (or, for kind "cms", recent spreadsheets) from the folder Emma chose. What is kept in this browser is the folder
// itself - a handle Chrome gives the page, not a copy of anything in it.

const PORTAL_ORIGIN = "https://portal.completelawsupport.com";
const TYPE = "cls-receipt-folder";
const DB_NAME = "cls-claim-receipt-folder";
const STORE = "kv";

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function idb(mode, fn) {
  const db = await openDb();
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, mode);
      const request = fn(tx.objectStore(STORE));
      tx.oncomplete = () => resolve(request?.result);
      tx.onerror = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}

// A firm name of letters only, so it cannot be used to reach another key.
const keyFor = (brand) => `folder:${String(brand || "").replace(/[^a-z]/gi, "").slice(0, 10) || "none"}`;

async function listPdfs(handle) {
  const files = [];
  const walk = async (dir, depth) => {
    for await (const entry of dir.values()) {
      if (entry.kind === "file" && /\.pdf$/i.test(entry.name)) files.push(await entry.getFile());
      else if (entry.kind === "directory" && depth < 1) await walk(entry, depth + 1);
    }
  };
  await walk(handle, 0);
  return files;
}

// Recent spreadsheets at the top of the folder only, newest first (Downloads is big).
const CMS_RECENT_MS = 7 * 24 * 60 * 60 * 1000;
async function listRecentSpreadsheets(handle) {
  const files = [];
  const since = Date.now() - CMS_RECENT_MS;
  for await (const entry of handle.values()) {
    if (entry.kind !== "file" || !/\.(xlsx|xls|csv)$/i.test(entry.name)) continue;
    const file = await entry.getFile();
    if (file.lastModified >= since) files.push(file);
  }
  return files.sort((a, b) => b.lastModified - a.lastModified).slice(0, 10);
}

const FOLDER_KINDS = {
  receipts: { key: keyFor, pickerId: "atlas-claim-receipts", startIn: "documents", list: listPdfs },
  cms: { key: () => "cms-folder", pickerId: "cms-hearings", startIn: "downloads", list: listRecentSpreadsheets },
};

async function handleRequest(op, data) {
  if (typeof window.showDirectoryPicker !== "function") throw new Error("This browser cannot link a folder. Use Chrome.");
  const kindName = data.kind === "cms" ? "cms" : "receipts";
  const kind = FOLDER_KINDS[kindName];
  const reply = await answer(op, data, kind);
  return kindName === "cms" ? { ...reply, kind: "cms" } : reply;
}

async function answer(op, data, kind) {
  const key = kind.key(data.brand);
  if (op === "status") {
    const handle = await idb("readonly", (store) => store.get(key)).catch(() => null);
    if (!handle) return { linked: false };
    const permission = await handle.queryPermission({ mode: "read" }).catch(() => "prompt");
    return { linked: true, name: handle.name, permission };
  }
  if (op === "link") {
    const handle = await window.showDirectoryPicker({ id: kind.pickerId, mode: "read", startIn: kind.startIn });
    await idb("readwrite", (store) => store.put(handle, key));
    return { linked: true, name: handle.name, permission: "granted" };
  }
  if (op === "files") {
    const handle = await idb("readonly", (store) => store.get(key));
    if (!handle) throw new Error("No folder is linked.");
    let permission = await handle.queryPermission({ mode: "read" });
    if (permission !== "granted" && data.interactive) permission = await handle.requestPermission({ mode: "read" });
    if (permission !== "granted") return { permission, files: [] };
    return { permission, files: await kind.list(handle) };
  }
  if (op === "unlink") {
    await idb("readwrite", (store) => store.delete(key));
    return { linked: false };
  }
  throw new Error("Unknown request.");
}

export function installReceiptFolderBridge(win = window) {
  const onMessage = async (event) => {
    if (event.origin !== PORTAL_ORIGIN) return;
    const data = event.data;
    if (!data || data.type !== TYPE || typeof data.requestId !== "string") return;
    // Only the portal shown in a frame on this page.
    const frames = [...win.document.querySelectorAll("iframe")].map((frame) => frame.contentWindow);
    if (!frames.includes(event.source)) return;
    let reply;
    try {
      reply = { ok: true, ...(await handleRequest(data.op, data)) };
    } catch (error) {
      reply = { ok: false, error: error?.name === "AbortError" ? "No folder was chosen." : error?.message || "The folder could not be read." };
    }
    event.source.postMessage({ type: `${TYPE}:reply`, requestId: data.requestId, ...reply }, PORTAL_ORIGIN);
  };
  win.addEventListener("message", onMessage);
  return () => win.removeEventListener("message", onMessage);
}
