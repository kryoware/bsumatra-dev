---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/notifly/page.tsx","src/app/homelab/page.tsx","src/app/work/[slug]/page.tsx"]
---

## Scope

Home page of bsumatra.dev (`/`), plus detail routes that inherit its world: `/notifly`, `/homelab`, `/work/[slug]` (three sample case studies). Mode: Persuade.

- Audience: hiring managers and recruiters first; contract clients and homelab peers second.
- Job: decide this is a senior full-stack engineer worth emailing.
- Action: Email (mailto), working in the first viewport and at the close.
- Proof: Notifly (real), the homelab (real, shown as a showcase; the site itself is served by Cloudflare Workers), sample case studies (labeled, NDA-shaped).
- Constraints: NDA rules and photo privacy from PRODUCT.md; feels wrong if it reads as a generic dev template, hacker cosplay, a résumé page, or hobbies drowning the engineer.

## Direction contract

THESIS: The career drawn as a rail network: every build is a line, every technology a station, and the lines cross where skills interchange (React and Vue meet at TypeScript). It refuses the category default of a hero over a skill-logo grid and three project cards; the map is the skill grid, made to route.

OWN-WORLD: White enamel ground, ink-black type, one saturated color per line with a letter roundel named for its build (P, D, M, N, H, S). Interchanges are white and ink-outlined: capsules where lines run in parallel (Next.js, TypeScript), rings where lines cross or meet (NestJS, PHP, PostgreSQL, Proxmox). Ordinary stops are small white ink-ringed dots, the Tokyo Metro convention, chosen over London ticks because the dots also anchor the strip maps on detail pages. Sample lines are drawn as under-construction track (dashed) and say so in the legend. Overpass (a highway-signage face) in heavy weights for system titles, regular for body. Square signage panels, 0 radius except roundels and capsules.

STORY: The visitor reads a name and an offer on the map's title panel, sees the stack routed through real builds, follows one line (hover highlights its route, click rides it to a detail page), learns that client work runs under NDA with stack and scale shown and names withheld, sees the homelab line and the S line that carried this page from Cloudflare's edge, and emails from the terminus.

FIRST VIEWPORT: Full-width network map is the page's ground. Top-left title panel set into an empty map region: name as the system title (two lines max), an offer line under 20 words, an ink Email signage button. Bottom-right legend panel lists the lines with roundels and doubles as navigation; it carries the one NDA line and the under-construction key. No split hero, no stats, no eyebrow. Mobile: title panel and Email first, the map in a horizontal pan frame below, then the legend as tappable line rows.

FORM: Transit diagram (Manila LRT/MRT and Tokyo Metro route maps), #1 on the re-roll grounded list, chosen by the user as the pick card over the assigned #3; seed d1a8621a, reroll 1.

SIGNATURE INTERACTION: Line routing. Hovering or focusing a line, its legend row, or its roundel dims every other line and the stations it does not serve; hovering a station lights every line through it. Detail pages open with that line's strip map (the in-train door strip) as the header.

MOTION GRAMMAR: Two authored moments, both on the map: on first load the lines draw along their routes in legend order with an exponential ease-out, then trains run out and back on every line with a station pulse on arrival (pausable from the legend, paused off-screen, absent under reduced motion, where the map is static from the start). Everything else is state transitions on hover and focus; no scroll-triggered entrances.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Build path

Code-led this session. The recorded default in `.impeccable/config.json` is comp (the user chose comp-first with Google Stitch, never Figma). No Stitch tool was connected and Figma is ruled out, so no comp could be generated; this was stated to the user before the direction round, and the user asked to "just see something". The config keeps `comp` for future sessions once Stitch is connected. After the finish review the user was asked directly and answered "Accept code-built" (keep this build as the approved version; comp-first stays the default for future pages).

## Unresolved

- Real contact channels (email placeholder is hello@bsumatra.dev); real case studies; owner photos replacing stock.
