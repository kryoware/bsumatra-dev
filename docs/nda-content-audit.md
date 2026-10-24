# Portfolio confidentiality / NDA content audit

Reviewed 24 October 2026. **Potential disclosure risks were found; an actual breach cannot be determined from the website content alone.** No signed NDA, employment agreement, client agreement, publicity policy, governing-law clause, or written publication approval was supplied.

## Scope and basis

Reviewed `src/content/site.ts`, the homepage, all three work-page templates, map labels/relationships, metadata, Notifly and homelab pages, and the public asset inventory. This is an editorial disclosure review, not a legal opinion or a forensic secrets scan. The company/location/cloud updates were explicitly supplied by the owner and have been implemented; that instruction does not establish permission under a third-party agreement.

WIPO distinguishes protected confidential information from general knowledge and experience, and notes that an otherwise public collection of elements can have a confidential combination. Contract and employment rules can also matter. The relevant question is therefore the permitted disclosure of **this association of company, client, project and technical detail**, not whether a technology name is public. [WIPO, Guide to Trade Secrets, Part III §§1.2, 1.3 and 4](https://www.wipo.int/web-publications/wipo-guide-to-trade-secrets-and-innovation/en/part-iii-basics-of-trade-secret-protection.html).

An NDA's defined information, exceptions, permitted purpose, disclosure permissions and duration must be checked in the actual contract; these vary. Trade-secret criteria alone are not a contract-compliance test. [Queensland Government, Confidentiality agreements](https://www.business.qld.gov.au/running-business/risk/ip/ip-kit/browse-ip-topics/confidentiality-agreements).

## Findings, highest review priority first

### 1. Named freelance clients plus internal implementation details — priority: high

`src/content/site.ts`, `freelanceWork`, publishes **Umá · iFarms** and **BAI · GRUPBAI Logistics**, dates, and an attributable combination of internal apps, AWS EC2/RDS/S3 resources, GraphQL, NativeScript-Vue, Pusher and Apollo Subscriptions. Client identity, the existence of the engagement and details of an internal system could each be restricted. Their presence in a résumé is not proof of public-portfolio permission.

Safer alternatives, if naming/detail permission is absent:

- “B2B platform — Built APIs and web/mobile applications.”
- “Logistics applications — Developed customer-facing and operational applications.”

The generic retail/queueing entry is less identifying, but its particular combination of kiosks, queue displays, teller app, dates and domain could still identify a project. No violation is established by that possibility.

### 2. ELMO Software's internal systems and security/compliance context — priority: high

The ELMO entry links a named organization to a microservices platform, payroll/HR/workforce/identity-provider integrations, ETL, event-driven email, API credential management, authentication/authorization, SDKs, test tooling and CI. These are implementation details; some could be non-public even when the products themselves are public. The page contains descriptions of credential management, **not actual credentials**.

The security/coverage work “to support ISO compliance requirements” deserves separate review. It does not claim certification, but may disclose internal compliance work or priorities. Do not infer permission from a general public certification announcement.

Safer summary: “Developing API integrations and automated tests for business software.”

Safer contributions: “Built backend features and integrations; strengthened automated testing and code quality.”

Confirm that “ELMO Software” is the correct public attribution and that naming the relationship is allowed, especially if any engagement involves another contracting party. The requested rename was applied without asserting an additional legal relationship.

### 3. Employer-linked cloud and infrastructure tooling — priority: medium

The requested **AWS + Terraform / ELMO**, **Azure / Yondu**, and **AWS + GCP / Futuristech** associations now appear in work-page stacks and the interactive map. A map, its accessible labels, and metadata are disclosures just as prose is. Generic skill names are less specific than account IDs, diagrams or configurations, but their employer-specific combination can still require permission.

No cloud account identifiers, IP addresses, credentials or configuration files are added by this change. If employer-specific infrastructure is restricted, keep cloud skills in a general personal skills list rather than attributing them to a company. Adding the same information to a map does not anonymize it.

### 4. Yondu's unnamed client/project fingerprint — priority: medium

The entry states four e-commerce frontends, their exact roles, SSR versus SPA choices, and an insurance application on Android/iOS. A client name is absent, but domain, dates, application surfaces and technology can identify an engagement in combination.

Safer summary: “Built web and mobile applications, focusing on usability, rendering and performance.”

### 5. Futuristech's platform and integration inventory — priority: medium

The entry associates the employer with Reaction Commerce, Shopify, databases, payment/POS/notification/driver-tracking APIs and mobile frameworks. These are generally named public products or techniques; their use in a particular engagement may be confidential. There are no measured client outcomes, customer records or internal URLs in this entry.

Safer summary: “Built e-commerce applications and APIs, including third-party service integrations.”

### 6. Basic employment facts, locations and personal projects — comparatively lower review priority

Names, dates, role titles and the supplied Sydney/Remote, Taguig/Remote and Davao locations are ordinary résumé facts. They are not automatically cleared: an agreement may restrict relationship publicity. No home address or precise office location is supplied by the new tags.

Notifly and homelab content is presented as personal work. No employer-specific materials were identified there in this review. That assessment assumes the owner is entitled to disclose the work and has not used protected employer code, datasets or documents. Notification parsing detail on a personally owned project is not itself evidence of an employment-NDA breach.

## Publication surfaces and limits

- Work pages, map relationships, accessible link text, page titles and exported HTML all expose the relevant associations. Approval or anonymization must cover all of them consistently.
- The old `/work/hero-teams/` URL is retained as a redirect to `/work/elmo-software/`. That preserves links, but the mapping is observable. Renaming a page does not retract prior public content, caches or repository history.
- `docs/`, `PRODUCT.md` and design notes are not copied into this site's static public asset directory. If the Git repository is public, those files and history are a separate publication surface. Historical résumé findings still contain original names and details; this audit does not rewrite historical records or erase history.
- No employer/client code, proprietary screenshots, customer data, named integration customers, internal hostnames, concrete vulnerabilities, or actual credentials were identified in the reviewed page text/assets. This is not an assurance about files outside that scope.

## Recommended disposition

Keep the requested factual edits, and review the high-priority passages against the applicable confidentiality/publicity clauses and any written permission before publishing them. Genericize client/internal-system descriptions when permission cannot be established. Written employer/client clearance or advice from counsel familiar with the actual agreements can resolve the uncertainty.

The audit intentionally **does not silently remove or rewrite** the flagged professional and freelance descriptions. It provides the exact areas to review and concise alternatives; the site must not claim to be “NDA-safe” or “NDA-compliant” on the strength of this audit.

## Validation

Production build/static export, TypeScript and five map regression tests pass. Installed Zen 1.23.4b passes 46 assertions, including company/location content, removal of education/spoken-language copy, expanded stacks, all 38 line/station relationships and pulses, labels, navigation, themes, motion controls and responsive overflow checks. Desktop themes, mobile work content and the ELMO detail page were visually inspected.

Cloudflare Wrangler 4.152.0's local static-assets runtime parsed both legacy redirect rules; each old URL returned 301 to `/work/elmo-software/`, and the canonical page returned 200 with the new employer name. The export contains no old work-page directory and does not expose `docs/` as web assets. This does not determine confidentiality compliance or repository privacy. These checks were completed locally before deployment.
