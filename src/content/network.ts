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
  platforms?: Partial<Record<LineId, [number, number]>>;
};

// Hand-laid octilinear geometry in a 1200 x 680 viewBox. The title panel
// (x 32-520, y 32-340) and the legend (x 960-1180, y 270-656) sit over empty
// map regions, so no track or label may enter those boxes.
export const VIEWBOX = { w: 1200, h: 680 };

export const lines: Line[] = [
  {
    id: "P",
    name: "Integrations & reliability",
    kind: "ELMO Software",
    color: "#0a6cc0",
    href: "/work/elmo-software/",
    stations: ["react", "typescript", "nestjs", "php", "symfony", "aws", "cypress", "jest", "jenkins", "terraform"],
    path: [[832, 56], [832, 512], [736, 608], [304, 608]],
    badge: [832, 22],
  },
  {
    id: "D",
    name: "Commerce & mobile",
    kind: "Yondu",
    color: "#13924a",
    href: "/work/yondu/",
    stations: ["vue", "nuxt", "bootstrapvue", "react-native", "azure"],
    path: [[624, 304], [624, 368], [656, 400], [736, 400], [736, 568]],
    badge: [624, 268],
  },
  {
    id: "M",
    name: "Commerce & APIs",
    kind: "Futuristech",
    color: "#e98300",
    href: "/work/futuristech/",
    stations: ["react", "nextjs", "vue", "laravel", "php", "mysql", "postgresql", "mongodb", "aws", "gcp"],
    path: [[704, 624], [864, 624], [912, 576], [912, 480], [864, 432], [576, 432], [544, 400], [544, 336], [576, 304], [688, 304], [736, 256], [736, 184], [808, 112], [808, 56]],
    badge: [772, 56],
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
    path: [[736, 224], [768, 224], [800, 256], [872, 256], [904, 224], [904, 112], [936, 80], [1120, 80]],
    badge: [1158, 80],
  },
];

export const stations: Station[] = [
  { id: "react", label: "React", x: 820, y: 80, label_at: [850, 85], anchor: "start", marker: { w: 48, h: 22 }, platforms: { P: [832, 80], M: [808, 80] } },
  { id: "nextjs", label: "Next.js", x: 736, y: 224, label_at: [718, 229], anchor: "end", marker: "ring" },
  { id: "typescript", label: "TypeScript", x: 832, y: 256, label_at: [814, 285], anchor: "end", marker: "ring" },
  { id: "vue", label: "Vue", x: 624, y: 304, label_at: [606, 285], anchor: "end", marker: "ring" },
  { id: "nuxt", label: "Nuxt", x: 624, y: 344, label_at: [606, 349], anchor: "end", marker: "dot" },
  { id: "bootstrapvue", label: "BootstrapVue", x: 704, y: 400, label_at: [704, 379], anchor: "middle", marker: "dot" },
  { id: "react-native", label: "React Native", x: 736, y: 464, label_at: [718, 469], anchor: "end", marker: "dot" },
  { id: "azure", label: "Azure", x: 736, y: 536, label_at: [718, 541], anchor: "end", marker: "dot" },
  { id: "nestjs", label: "NestJS", x: 832, y: 328, label_at: [814, 333], anchor: "end", marker: "dot" },
  { id: "laravel", label: "Laravel", x: 608, y: 432, label_at: [608, 411], anchor: "middle", marker: "dot" },
  { id: "php", label: "PHP", x: 832, y: 432, label_at: [850, 411], anchor: "start", marker: "ring" },
  { id: "symfony", label: "Symfony", x: 832, y: 480, label_at: [814, 485], anchor: "end", marker: "dot" },
  { id: "postgresql", label: "PostgreSQL", x: 912, y: 568, label_at: [894, 573], anchor: "end", marker: "dot" },
  { id: "mysql", label: "MySQL", x: 912, y: 512, label_at: [894, 517], anchor: "end", marker: "dot" },
  { id: "mongodb", label: "MongoDB", x: 832, y: 624, label_at: [832, 654], anchor: "middle", marker: "dot" },
  { id: "gcp", label: "GCP", x: 752, y: 624, label_at: [752, 654], anchor: "middle", marker: "dot" },
  { id: "aws", label: "AWS", x: 704, y: 616, label_at: [704, 664], anchor: "middle", marker: { w: 22, h: 48 }, platforms: { P: [704, 608], M: [704, 624] } },
  { id: "cypress", label: "Cypress", x: 648, y: 608, label_at: [648, 638], anchor: "middle", marker: "dot" },
  { id: "jest", label: "Jest", x: 568, y: 608, label_at: [568, 638], anchor: "middle", marker: "dot" },
  { id: "jenkins", label: "Jenkins", x: 456, y: 608, label_at: [456, 638], anchor: "middle", marker: "dot" },
  { id: "terraform", label: "Terraform", x: 344, y: 608, label_at: [344, 638], anchor: "middle", marker: "dot" },
  { id: "proxmox", label: "Proxmox", x: 920, y: 312, label_at: [920, 343], anchor: "middle", marker: "dot" },
  { id: "cloudflare", label: "Cloudflare", x: 1040, y: 80, label_at: [1040, 63], anchor: "middle", marker: "dot" },
  { id: "here", label: "You are here", x: 1120, y: 80, label_at: [1120, 109], anchor: "middle", marker: "here" },
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

export function stationPoint(id: string, line: LineId): [number, number] {
  const station = stationById(id);
  return station.platforms?.[line] ?? [station.x, station.y];
}

export function roundedPath(points: [number, number][], radius = 27) {
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const l01 = Math.hypot(x1 - x0, y1 - y0);
    const l12 = Math.hypot(x2 - x1, y2 - y1);
    const ux = (x1 - x0) / l01, uy = (y1 - y0) / l01;
    const vx = (x2 - x1) / l12, vy = (y2 - y1) / l12;
    const angle = Math.acos(Math.max(-1, Math.min(1, ux * vx + uy * vy)));
    if (angle < 0.000001) continue;
    // Circular fillets need angle-dependent cutbacks; equal cuts distort 45° bends.
    const tangent = Math.tan(angle / 2);
    const cut = Math.min(radius * tangent, l01 / 2, l12 / 2);
    const r = cut / tangent;
    const ax = x1 - ux * cut, ay = y1 - uy * cut;
    const bx = x1 + vx * cut, by = y1 + vy * cut;
    const sweep = ux * vy - uy * vx > 0 ? 1 : 0;
    d += ` L${ax.toFixed(2)} ${ay.toFixed(2)} A${r.toFixed(2)} ${r.toFixed(2)} 0 0 ${sweep} ${bx.toFixed(2)} ${by.toFixed(2)}`;
  }
  const [xn, yn] = points[points.length - 1];
  return `${d} L${xn} ${yn}`;
}
