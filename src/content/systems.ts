import type { Stop } from "@/components/transit";

export const notiflyPipeline: Stop[] = [
  { name: "Bank or e-wallet notification", note: "GCash, Maya, BPI and more" },
  { name: "Allow-listed app?", branch: "No: ignored. Only the app and the reason are logged." },
  { name: "On-device parser and classifier", branch: "No amount found: no transaction. It never guesses." },
  { name: "Needs review", note: "A draft, kept apart from your balance" },
  { name: "Confirmed", note: "Only now does the balance move" },
];

export const notiflyStack: Stop[] = [
  { name: "Kotlin", note: "2.4" },
  { name: "Compose Multiplatform", note: "1.13" },
  { name: "On-device classifier", note: "About 124 KB" },
  { name: "Room + SQLCipher", note: "Encrypted ledger" },
];

export const requestPath: Stop[] = [
  { name: "This site", note: "Next.js, exported as static files" },
  { name: "Cloudflare Workers", note: "Serves those files from the edge" },
  { name: "You", note: "Reading this" },
];

export const services = [
  { name: "Immich", does: "My photo library, self-hosted. The camera roll lands here, not in someone else's cloud." },
  { name: "n8n", does: "Workflow automation, self-hosted." },
  { name: "Beszel", does: "Lightweight monitoring for the box and its containers." },
  { name: "Dozzle", does: "Live container logs in the browser." },
];
