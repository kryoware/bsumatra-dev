# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js with TypeScript, static export (`output: 'export'`). The owner chose this over an offered Astro recommendation so that the site's own code demonstrates React/Next.js skill. Build output is plain static files that any web server on the homelab can serve.

Hosting: self-hosted on the owner's homelab, served through a CDN or tunnel (e.g. Cloudflare Tunnel) so the home IP stays hidden and the site survives traffic spikes. Domain: `bsumatra.dev` (owned).

## Users

Mixed audience, weighted toward hiring:

- **Primary:** recruiters, engineering managers, and tech leads evaluating the owner for a full-time senior full-stack role.
- **Secondary:** founders or agencies looking for a contract or freelance full-stack engineer.
- **Secondary:** engineering peers and the homelab community, visiting for write-ups and projects.

## Product Purpose

The personal portfolio of Baldwin John Sumatra, a Senior Full Stack Software Engineer whose professional work is under NDA. It exists to prove senior-level skill without showing client code, names, or internals. (Inferred, unconfirmed) Success means a hiring visitor leaves convinced of seniority and breadth, and a technical visitor finds enough real substance to trust it.

## Positioning

The owner covers both major frontend ecosystems (React/Next.js and Vue/Nuxt), the backend (NestJS, PHP), databases (MySQL, PostgreSQL), and TypeScript throughout, plus hands-on server and network administration through a personal homelab. Outside work hours they also ship a native Android app (Kotlin, Compose Multiplatform) with its own on-device ML classifier. The site itself runs on the homelab, so the infrastructure skill is demonstrated by the hosting, not only claimed.

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

**Skill set (evidenced by Notifly source):** Kotlin, Android, Compose Multiplatform, Room/SQLCipher, Python (scikit-learn classifier training).

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

**Notifly (hobby project, facts from its README):**
- Tagline: "Every ping, checked." A personal finance tracker for Android that turns bank and e-wallet notifications into a ledger, and never counts a transaction until the user confirms it. Inspired by Samsung's Notistar.
- Built-in parsing for GCash, Maya and BPI, plus a bundled on-device classifier for other apps. Parsed items wait in a *Needs review* queue and never move the confirmed balance until confirmed. Never guesses an amount.
- Private by design: notification text is parsed on-device, offline, no account or server.
- Also: ledger, accounts and transfer detection, budgets and bill reminders, insights, notification log, CSV import/export, app lock, four palettes in light/dark, phone and tablet layouts, accessibility (state never shown by colour alone, font scale, reduced motion).
- Stack: Kotlin 2.4, Compose Multiplatform 1.13, Android 8.0+ (API 26), Room + SQLCipher, Koin, Glance widgets.
- Classifier: character TF-IDF + logistic regression, int8-quantized, about 124 KB, Kotlin inference with no ML runtime. Prototype trained on synthetic examples plus 23 reviewed notifications; its test score does not establish real-world accuracy.
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
3. **The infrastructure is part of the proof.** Self-hosting on the homelab is a claim the site demonstrates by existing.
4. **Serve the skim and the deep read.** (Inferred, unconfirmed.) A hiring visitor should grasp seniority and stack in seconds; an engineer should be able to go deep.
5. **A person, not a résumé.** Interests (Gunpla, coffee, gaming, photography) are part of who the owner is and belong on the site.
