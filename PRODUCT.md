# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js with TypeScript, static export (`output: 'export'`). The owner chose this over an offered Astro recommendation so that the site's own code demonstrates React/Next.js skill. Build output is plain static files.

Hosting (confirmed at launch): Cloudflare Workers static assets, deployed with wrangler, so the site never runs on the homelab and visiting it opens no path into the home network. Domain: `bsumatra.dev` (owned).

## Users

Mixed audience, weighted toward hiring:

- **Primary:** recruiters, engineering managers, and tech leads evaluating the owner for a full-time senior full-stack role.
- **Secondary:** founders or agencies looking for a contract or freelance full-stack engineer.
- **Secondary:** engineering peers and the homelab community, visiting for write-ups and projects.

## Product Purpose

The personal portfolio of Baldwin John Sumatra, a Senior Full Stack Software Engineer whose professional work is under NDA. It exists to prove senior-level skill without showing client code, names, or internals. (Inferred, unconfirmed) Success means a hiring visitor leaves convinced of seniority and breadth, and a technical visitor finds enough real substance to trust it.

## Positioning

The owner covers both major frontend ecosystems (React/Next.js and Vue/Nuxt), the backend (NestJS, PHP), databases (MySQL, PostgreSQL), and TypeScript throughout, plus hands-on server and network administration through a personal homelab. Outside work hours they also ship a native Android app (Kotlin, Compose Multiplatform) with its own on-device ML classifier. The homelab is shown as its own build; the site itself is served from Cloudflare's edge.

## Operating Context

- (Inferred, unconfirmed) Hiring visitors skim fast, checking stack, seniority, and whether the work looks real.
- (Inferred, unconfirmed) Technical visitors read deeper: case-study reasoning, homelab architecture, hobby-project code.
- Personal side: coffee, tech, gaming, Gundam / Gunpla / model kits, amateur photography. These are confirmed interests the owner wants represented.

## Capabilities and Constraints

**Identity (confirmed):**
- Name: Baldwin John Sumatra.
- Working professionally since 2017.
- Based in the Philippines.
- Open to full-time and contract work; prefers remote.
- Working hours currently overlap Sydney time.
- LinkedIn: https://www.linkedin.com/in/baldwin-john-sumatra-3556881a5/

**Skill set (confirmed by owner):** React, Vue, NestJS, Next.js, Nuxt, PHP, MySQL, PostgreSQL, TypeScript; server and network administration (homelab).

**Skill set (evidenced by Notifly source):** Kotlin, Android, Compose Multiplatform, Room/SQLCipher, Python (classifier training).

**NDA rules for client work:**
- Never: client or employer names, code, screenshots of client systems, or internal details.
- Allowed: industry (e.g. "fintech"), system scale (users, traffic, data volume), and ballpark outcomes.

**Proof channels chosen by the owner:**
1. Anonymized case studies (problem, constraints, approach, outcome) within the NDA rules above. Real details not yet supplied; the owner asked for placeholder case studies for now.
2. Homelab showcase (details below).
3. Hobby projects: currently private on GitHub; the owner will clean up and publish selected repos, or they get written about without code. First one: Notifly (below).

Not chosen: making the portfolio's own repo a proof piece. Whether the site repo is public is undecided.

**Homelab (confirmed):**
- Hardware: a single PC in a closet.
- Hypervisor: Proxmox.
- Services: Beszel (server monitoring), Dozzle (container logs), Immich (self-hosted photo library), n8n (workflow automation).
- Network: TP-Link Omada managed setup; multi-WAN bonding with OpenMPTCProuter.

**Notifly (hobby project, facts from its README, PRODUCT.md and docs/CLASSIFIER_MODEL.md; synced 2026-10-25 at v0.12.0):**
- Tagline: "Every ping, checked." A personal finance tracker for Android that turns bank and e-wallet notifications into a ledger, and never counts a transaction until the user confirms it. Inspired by Samsung's Notistar (owner-confirmed; not in current Notifly docs).
- On-device rules find amount and direction for any allow-listed app; release builds add a bundled on-device classifier. A guided catalog suggests GCash, Maya, BPI, BDO, UnionBank, Shopee, Lazada and Grab. Shared screenshots and receipts are OCR'd on-device into drafts. Notifications from apps that are not allow-listed are dropped and nothing is stored. Transfers between the user's own accounts are the one exception to review. Parsed items wait in a *Needs review* queue and never move the confirmed balance until confirmed. Never guesses an amount.
- Private by design: notification text is parsed on-device, offline, no account or server. Privacy policy: https://notifly.bsumatra.dev/docs/PRIVACY/ (the README's /privacy link serves the landing page).
- Also: ledger, accounts and transfer detection, budgets and bills, debts, savings goals, insights, opt-in reminders, home-screen widgets, notification log, CSV import/export, encrypted backup and restore, demo mode, app lock (PIN or biometrics), four palettes plus wallpaper colours in light/dark, phone, tablet and foldable layouts, accessibility (state never shown by colour alone, font scale, reduced motion).
- Stack: Kotlin 2.4, Compose Multiplatform 1.13, Android 8.0+ (API 26), Room + SQLCipher, DataStore, Koin, Glance widgets, Tesseract4Android OCR, opt-in Sentry.
- Classifier: character 3–5 gram TF-IDF + logistic regression, int8 weights, 122,777 bytes (about 123 KB, format v3, release 2026-10-20), Kotlin inference with no ML runtime. 0.8 threshold. Prototype trained on synthetic examples and a small manually verified sample; its threshold and held-out scores do not establish real-world accuracy. 82 regression cases.
- Status: pre-release, not on the Play Store, cloud sync not configured. License AGPL-3.0. Repo currently private.

**Security and privacy constraints:**
- Anything that exposes the homelab (live status, diagrams, hostnames) must not reveal the home IP, internal addressing, or attack surface.
- Every published photo has EXIF/GPS metadata stripped (enforced at build time).
- Homelab, desk, and screen photos are checked for visible IPs, hostnames, device labels, or serial numbers before publishing.

**Open, owner to supply:**
- Email address (site uses the placeholder hello@bsumatra.dev). GitHub link github.com/kryoware is taken from the Notifly README, not yet confirmed by the owner.
- Real case-study material: industry, scale, problem, role, approach, outcome figures.
- Which other hobby repos will be published.

## Evidence on Hand

- **Photography:** owner has their own photography, coffee / everyday, homelab / desk, and Gunpla shots, not yet delivered. Until then the owner asked for free stock photos as stand-ins; every stock image is a placeholder to be replaced, and none may be captioned as the owner's own build, rig, or photo.
- **Case studies:** placeholders at the owner's request. Every sample case study, metric, and industry must be visibly labeled as a sample until replaced with real material.
- **Notifly:** real project, facts above. Brand marks exist in its repo (`docs/brand/marks.png`).
- **Absent, never fabricate as real:** public repos, testimonials, employer or client names, certifications, Play Store availability, Notifly accuracy claims, or any number the owner has not provided.

## Product Principles

1. **Proof without disclosure.** Every skill claim points to something a visitor can see or verify (homelab, published repos, specific case-study reasoning), and none of it breaks an NDA.
2. **Real over decorative.** Use the owner's own photography and real system details. Stand-ins are labeled and tracked until replaced; no invented metrics presented as real.
3. **The infrastructure is part of the proof.** The homelab is shown through real system details, and the site's own route (static export to Cloudflare Workers) is stated as it really runs, never routed through the homelab.
4. **Serve the skim and the deep read.** (Inferred, unconfirmed.) A hiring visitor should grasp seniority and stack in seconds; an engineer should be able to go deep.
5. **A person, not a résumé.** Interests (Gunpla, coffee, gaming, photography) are part of who the owner is and belong on the site.
