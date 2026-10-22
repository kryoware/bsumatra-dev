// Dev-only capture: node capture.mjs <url> <out.png> <width> <height> [mobile] [fullpage]
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [url, out, w, h, mobile, full] = process.argv.slice(2);
const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const port = 9300 + Math.floor(Math.random() * 500);
const profile = mkdtempSync(join(tmpdir(), "cap-"));
const proc = spawn(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    target = list.find((t) => t.type === "page");
  } catch {}
  if (!target) await sleep(200);
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg.result ?? msg.error);
    pending.delete(msg.id);
  }
});
const send = (method, params = {}) =>
  new Promise((r) => {
    pending.set(++id, r);
    ws.send(JSON.stringify({ id, method, params }));
  });

const isMobile = mobile === "1";
await send("Emulation.setDeviceMetricsOverride", { width: +w, height: +h, deviceScaleFactor: 1, mobile: isMobile });
if (isMobile) await send("Emulation.setTouchEmulationEnabled", { enabled: true });
await send("Page.enable");
await send("Page.navigate", { url });
await sleep(1500);
await send("Runtime.evaluate", { expression: "window.scrollTo(0, document.documentElement.scrollHeight)" });
await sleep(1200);
await send("Runtime.evaluate", { expression: "window.scrollTo(0, 0)" });
await sleep(2500);
const metrics = await send("Runtime.evaluate", {
  expression: "JSON.stringify({sw: document.documentElement.scrollWidth, sh: document.documentElement.scrollHeight, iw: innerWidth})",
  returnByValue: true,
});
const m = JSON.parse(metrics.result.value);
const params = { format: "png" };
if (full === "1") {
  params.captureBeyondViewport = true;
  params.clip = { x: 0, y: 0, width: +w, height: m.sh, scale: 1 };
}
const shot = await send("Page.captureScreenshot", params);
writeFileSync(out, Buffer.from(shot.data, "base64"));
console.log(JSON.stringify({ out, ...m }));
ws.close();
proc.kill();
process.exit(0);
