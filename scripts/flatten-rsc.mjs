// Next 16 exports segment payloads at out/<route>/__next.a/b/__PAGE__.txt but the client requests
// out/<route>/__next.a.b.__PAGE__.txt. Copy each to the requested name so static hosts answer 200.
import { copyFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const out = "out";
const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

for (const file of walk(out)) {
  const rel = relative(out, file).split(sep);
  const i = rel.findIndex((s) => s.startsWith("__next.") && statSync(join(out, ...rel.slice(0, rel.indexOf(s) + 1))).isDirectory());
  if (i < 0) continue;
  const flat = rel.slice(i).join(".");
  copyFileSync(file, join(out, ...rel.slice(0, i), flat));
}
