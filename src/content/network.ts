export type LineId = "P" | "D" | "M" | "N" | "H" | "S";

export type Line = {
  id: LineId;
  name: string;
  kind: string;
  color: string;
  href: string;
  sample?: boolean;
  stations: string[];
  path: [number, number][];
  badge: [number, number];
};

export type Station = {
  id: string;
  label: string;
  x: number;
  y: number;
  label_at: [number, number];
  anchor: "start" | "middle" | "end";
  marker: "dot" | "ring" | "here" | { w: number; h: number };
};

// Hand-laid octilinear geometry in a 1200 x 680 viewBox. The title panel
// (x 32-520, y 32-340) and the legend (x 960-1180, y 270-656) sit over empty
// map regions, so no track or label may enter those boxes.
export const VIEWBOX = { w: 1200, h: 680 };

export const lines: Line[] = [
  {
    id: "P",
    name: "Payments ledger",
    kind: "Fintech sample",
    color: "#0a6cc0",
    href: "/work/payments-ledger/",
    sample: true,
    stations: ["react", "nextjs", "typescript", "nestjs", "postgresql"],
    path: [[760, 64], [760, 432], [720, 472], [680, 472]],
    badge: [760, 28],
  },
  {
    id: "D",
    name: "Dispatch console",
    kind: "Logistics sample",
    color: "#13924a",
    href: "/work/dispatch-console/",
    sample: true,
    stations: ["vue", "nuxt", "typescript", "php", "mysql"],
    path: [[576, 232], [840, 232], [880, 272], [880, 472]],
    badge: [540, 232],
  },
  {
    id: "M",
    name: "Monolith split",
    kind: "Edtech sample",
    color: "#e98300",
    href: "/work/monolith-split/",
    sample: true,
    stations: ["php", "nestjs", "postgresql"],
    path: [[880, 392], [680, 392], [680, 472]],
    badge: [916, 392],
  },
  {
    id: "N",
    name: "Notifly",
    kind: "Android app",
    color: "#7443e6",
    href: "/notifly/",
    stations: ["kotlin", "compose", "classifier", "room"],
    path: [[72, 416], [248, 416], [328, 496], [560, 496]],
    badge: [34, 416],
  },
  {
    id: "H",
    name: "Homelab",
    kind: "Proxmox",
    color: "#cf2e26",
    href: "/homelab/",
    stations: ["proxmox", "immich", "n8n", "beszel", "dozzle"],
    path: [[920, 312], [920, 56]],
    badge: [920, 22],
  },
  {
    id: "S",
    name: "This site",
    kind: "Next.js",
    color: "#94602a",
    href: "/homelab/#this-site",
    stations: ["typescript", "nextjs", "cloudflare", "here"],
    path: [[776, 232], [776, 120], [808, 88], [1120, 88]],
    badge: [1158, 88],
  },
];

export const stations: Station[] = [
  { id: "react", label: "React", x: 760, y: 64, label_at: [742, 69], anchor: "end", marker: "dot" },
  { id: "nextjs", label: "Next.js", x: 768, y: 144, label_at: [738, 149], anchor: "end", marker: { w: 40, h: 22 } },
  { id: "typescript", label: "TypeScript", x: 768, y: 232, label_at: [800, 214], anchor: "start", marker: { w: 40, h: 22 } },
  { id: "vue", label: "Vue", x: 576, y: 232, label_at: [576, 211], anchor: "middle", marker: "dot" },
  { id: "nuxt", label: "Nuxt", x: 664, y: 232, label_at: [664, 211], anchor: "middle", marker: "dot" },
  { id: "nestjs", label: "NestJS", x: 760, y: 392, label_at: [742, 381], anchor: "end", marker: "ring" },
  { id: "postgresql", label: "PostgreSQL", x: 680, y: 472, label_at: [680, 503], anchor: "middle", marker: "ring" },
  { id: "php", label: "PHP", x: 880, y: 392, label_at: [862, 421], anchor: "end", marker: "ring" },
  { id: "mysql", label: "MySQL", x: 880, y: 472, label_at: [862, 477], anchor: "end", marker: "dot" },
  { id: "proxmox", label: "Proxmox", x: 920, y: 312, label_at: [920, 343], anchor: "middle", marker: "dot" },
  { id: "cloudflare", label: "Cloudflare", x: 1040, y: 88, label_at: [1040, 71], anchor: "middle", marker: "dot" },
  { id: "here", label: "You are here", x: 1120, y: 88, label_at: [1120, 117], anchor: "middle", marker: "here" },
  { id: "immich", label: "Immich", x: 920, y: 248, label_at: [938, 253], anchor: "start", marker: "dot" },
  { id: "n8n", label: "n8n", x: 920, y: 184, label_at: [938, 189], anchor: "start", marker: "dot" },
  { id: "beszel", label: "Beszel", x: 920, y: 120, label_at: [938, 125], anchor: "start", marker: "dot" },
  { id: "dozzle", label: "Dozzle", x: 920, y: 56, label_at: [938, 61], anchor: "start", marker: "dot" },
  { id: "kotlin", label: "Kotlin", x: 72, y: 416, label_at: [72, 396], anchor: "middle", marker: "dot" },
  { id: "compose", label: "Compose Multiplatform", x: 200, y: 416, label_at: [200, 396], anchor: "middle", marker: "dot" },
  { id: "classifier", label: "On-device classifier", x: 400, y: 496, label_at: [400, 526], anchor: "middle", marker: "dot" },
  { id: "room", label: "Room + SQLCipher", x: 560, y: 496, label_at: [560, 526], anchor: "middle", marker: "dot" },
];

export const stationLines = (stationId: string) =>
  lines.filter((l) => l.stations.includes(stationId)).map((l) => l.id);

export const lineById = (id: LineId) => lines.find((l) => l.id === id)!;

export const stationById = (id: string) => stations.find((s) => s.id === id)!;

export function roundedPath(points: [number, number][], radius = 22) {
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const l01 = Math.hypot(x1 - x0, y1 - y0);
    const l12 = Math.hypot(x2 - x1, y2 - y1);
    const r = Math.min(radius, l01 / 2, l12 / 2);
    const ax = x1 - ((x1 - x0) / l01) * r;
    const ay = y1 - ((y1 - y0) / l01) * r;
    const bx = x1 + ((x2 - x1) / l12) * r;
    const by = y1 + ((y2 - y1) / l12) * r;
    d += ` L${ax.toFixed(1)} ${ay.toFixed(1)} Q${x1} ${y1} ${bx.toFixed(1)} ${by.toFixed(1)}`;
  }
  const [xn, yn] = points[points.length - 1];
  return `${d} L${xn} ${yn}`;
}
