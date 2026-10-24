# Résumé content findings — 2026-10-23

## Sources and reconciliation (recorded before implementation)
- Read all paragraphs of `BSUMATRA JOBSTREET Resume.docx` and both pages of `Resume.pdf`.
- Both agree: Futuristech Aug 2017–Dec 2020; Yondu May 2021–Jun 2022; Hero Teams Jun 2022–Present. Use explicit dates, not computed tenure strings.
- Prefer DOCX's Senior Full Stack Software Engineer title and added Hero Teams integration, ETL, credential, notification and SDK responsibilities. PDF's less specific Fullstack Developer title is not a separate role.
- Umá is one project: PDF identifies iFarms and Jan–Mar 2021; DOCX groups it under freelance.
- BAI is one project: use PDF's explicit GRUPBAI Logistics Jun–Jul 2020 dates. DOCX groups BAI with Jan–Mar 2021 freelance work without separate project dates. This remains an owner-confirmable discrepancy, not another engagement.
- PDF adds Dec 2018–Feb 2019 freelance retail and bank queueing projects. These overlap employment; do not add their durations to total experience.
- Education: use PDF's specific BS Information Technology, Holy Child College of Davao, Apr 2019. DOCX's broader degree label and 2019 completion are compatible.
- Discard DOCX's `Summary Test` placeholder and PDF's dated per-skill year counts.
- Both provide the same email; replace the site's explicitly placeholder address. Do not publish the phone number or original résumé files.

## Current site findings and intended changes
- Three explicitly labeled sample stories contain invented employers' industries, metrics and outcomes. Replace with factual Hero Teams, Yondu and Futuristech experience summaries; do not turn résumé duties into measured impact, ISO certification, leadership claims or invented architectural decisions.
- Reuse `caseStudies`, route cards, detail template, map lines, StripMap and existing typography. Simplify detail fields to employer, dates, role and contributions because sources do not establish case-study constraints/outcomes.
- Update homepage, detail metadata, network legend/links and shared navigation consistently. Add concise freelance and education coverage and a direct work shortcut in the hero.
- Preserve existing Notifly/homelab content and in-progress layout changes. Existing availability is not confirmed by these résumés.
- Old sample URLs will be replaced by meaningful professional-work URLs; static hosting has no configured redirects.
- Existing dirty files at baseline: `.impeccable/design.json`, `DESIGN.md`, `src/app/globals.css`, `src/app/homelab/page.tsx`, `src/app/layout.tsx`, `src/app/page.tsx`; `.playwright-cli/` and `docs/` already exist. Preserve them.

## Validation plan
- TypeScript and production static export.
- Actual installed Zen (`C:/Program Files/Zen Browser/zen.exe`) with an isolated automation profile: desktop/mobile layout, all work routes, navigation, theme, train pause/resume, keyboard and reduced motion.
- Record exact version, results, screenshots and limitations after testing. Do not substitute a stock Firefox run for Zen.
## First Zen pass
- Installed Zen is 1.23.4b, Gecko 158.0.1. Selenium's automatic driver selection misread Zen's version as Firefox 1; using an explicit geckodriver resolves launch.
- All normal-motion assertions passed. Reduced-motion test incorrectly waited for a visible pause control; existing CSS intentionally hides it. Correct the test, not that behavior.
- Zen window dimensions differ from content viewport dimensions. Adjust window size using measured innerWidth/innerHeight before responsive assertions.
- Screenshot inspection: the longer Experience navigation label wraps awkwardly at very narrow widths, and a standalone text-link adds excessive hero spacing. Use Work in navigation and group the hero actions compactly.
- Wait for map entrance animations before screenshots so intermediate frames are not mistaken for missing map content.
- Follow-up source verification caught encoding damage to separator and copyright characters introduced by Windows' default text decoding. Restored UTF-8 text and added a browser assertion for encoding artifacts.


## Final validation — 2026-10-24
- Production build/static export and TypeScript check passed after normalizing doubled CR line endings in the homepage and root layout. The cleanup has no semantic source changes.
- Installed Zen 1.23.4b (Gecko 158.0.1), using an isolated headless Selenium profile, passed all 29 assertions against the fresh static export.
- Checks cover employment/freelance/education content, supplied email links, removal of fictional sample copy, encoding, all three work routes through client navigation and direct refresh, Notifly and homelab routes, theme persistence, train pause/resume, keyboard skip navigation, and reduced motion.
- Viewport widths 1440, 768, 390 and 320px passed document-overflow and visible work-shortcut assertions.
- Evidence: `C:/Users/kryoware/AppData/Local/Temp/portfolio-zen-evidence/results.json` and desktop/mobile PNGs alongside it. These artifacts stay local.
- This supersedes the responsive audit's earlier notes about untested Firefox-family rendering and remaining sample work/contact placeholders. Physical devices, Safari, screen readers and performance profiling remain untested.
