# bsumatra.dev

Portfolio site for Baldwin John Sumatra, senior full-stack engineer. The home page is a transit-style network map: each line is a project, each station a technology, and trains run the lines, stopping and pulsing at every station.

Live: https://bsumatra.dev (Worker URL: https://bsumatra-dev.zer01ne2wo.workers.dev)

## Quick start

Requires Node 24+.

```sh
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static export to `out/` |
| `npm start` | Serve `out/` locally |
| `npm run typecheck` | `tsc --noEmit` |

## Where things live

| Path | Contents |
| --- | --- |
| `src/content/network.ts` | Map geometry: lines, stations, viewBox. Edit here to add a line or station. |
| `src/content/site.ts` | Case-study copy for `/work/[slug]` |
| `src/content/systems.ts` | Homelab services list |
| `src/components/NetworkMap.tsx` | Hero map, legend, train and station-pulse animations |
| `src/app/` | Routes: `/`, `/work/[slug]`, `/notifly`, `/homelab` |
| `public/_headers` | Cache headers for hashed `/_next/static` assets |
| `PRODUCT.md`, `DESIGN.md` | Product brief and design system |

Train timing is set by `SPEED`, `DWELL` and `PULSE` at the top of `NetworkMap.tsx`. With `prefers-reduced-motion: reduce`, trains stay parked.

## Deploy

The site is a static export (`output: "export"` in `next.config.ts`) served as a Cloudflare Worker with static assets. `wrangler.jsonc` points the Worker at `out/` and binds the `bsumatra.dev` custom domain.

```sh
npm run build
npx wrangler deploy
```

First time on a machine: `npx wrangler login`.

Keep `wrangler.jsonc` in the repo. Without it, `wrangler deploy` auto-configures the project for OpenNext (server-rendered Next.js), rewriting `package.json` and `next.config.ts`. If that happens, revert those changes with git.

### Automatic deploys

Deploys run through the Cloudflare Workers Builds Git integration (Workers & Pages, then `bsumatra-dev`, then Settings, then Builds). Pushes to `main` deploy to production. Other branches and PRs get preview URLs.

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Non-production branch deploy command: `npx wrangler preview` (needs the `previews` block in `wrangler.jsonc`)
