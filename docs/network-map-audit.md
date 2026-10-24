# Network map audit — 2026-10-24

## Findings recorded before repair

- **P1, implementation integrity:** résumé-backed work stacks expanded while the hand-laid map kept the sample-era memberships. Eight technologies were missing: Symfony, Cypress, Jest, Jenkins, BootstrapVue, React Native, Laravel and MongoDB. Hero Teams did not connect to PHP; Futuristech did not connect to React, Next.js or Vue. This made the map contradict the detailed work pages.
- **P2, interaction/motion:** station and badge entrance animations retained their opacity with `fill-mode: both`, overriding the later dimmed state. Hover/focus could dim tracks while leaving unrelated skill names at full prominence.
- **P2, accessibility:** the decorative SVG is hidden from assistive technology and the alternative Lines navigation named employers/projects without their skills. Relationships were only available visually.
- **P3, geometry:** Next.js and TypeScript used inherited capsules between tracks while route memberships had changed. Shared stations should now sit on the tracks of every line they actually serve.

## Repair direction

Reuse `lines`, `stations`, the SVG renderer, `stationLines`, and the Web Animations API train runtime. Extend the existing 1200 × 680 diagram; retain its empty title/legend regions, six colors, native horizontal pan, train controls and reduced-motion alternative. Match professional line membership to each published work stack. Shared technologies become actual junctions. Existing trains visit every declared stop; their pulses come from the same path.

The focal sequence remains route drawing followed by train journeys. Focus/hover feedback must reflect current membership after the entrance finishes. No animation dependency or per-frame React state is needed. Regression coverage checks stack membership, rendered path distance, focus states, keyboard access, pause/resume and reduced motion.

## Resolution and health assessment

All four findings above are addressed. Eight stations were added, all published work-stack technologies are connected to the correct professional line, and five shared technologies are actual interchanges. Backwards-only entrance fill releases opacity to the current highlight state. The accessible HTML navigation now carries each route's complete station list. Labels were spaced to avoid both other labels and unrelated markers.

Scoped assessment: **16/20, Good**. This is an implementation audit, not a WCAG certification or a hardware performance benchmark.

- Accessibility **3/4**: keyboard line focus, accessible skill names, skip navigation and reduced-motion checks pass; actual screen readers remain untested.
- Performance **3/4**: retained startup-only path sampling and existing Web Animations API runtime; no new dependency or per-frame React work. Pause/resume passes; no hardware frame-time profiling performed.
- Responsive design **3/4**: inspected desktop/mobile screenshots and validated widths 320, 390, 768 and 1440px without document overflow. Native diagram panning is retained; physical touch gestures were not tested in this pass.
- Theming **3/4**: inspected both themes and verified SVG label fill uses the same themed ink as body text; no full-site contrast certification claimed. Intentional dimming communicates a relationship without removing the HTML navigation.
- Implementation integrity **4/4**: all published professional stacks match line memberships; all 38 line/station relationships and their pulses are within 1.5 viewBox units of their rendered paths. No label-label or label-marker collisions in the measured diagram.

## Verification

- Production build/static export, TypeScript and `git diff --check` pass.
- `node --test scripts/network.test.mjs`: **5 tests pass**, covering complete professional stack membership, unique identities, valid references, no orphan stations, circular-arc radius/direction, octilinear run lengths, and distinct shared-station platforms. Node 24's built-in TypeScript stripping runs the existing `.ts` data directly, without adding dependencies.
- Installed **Zen 1.23.4b**, Gecko 158.0.1: **48 assertions pass** against the fresh static export, using an isolated headless profile. Includes company/location updates, Yondu's corrected role, removed education/spoken-language content, expanded stack layouts, requested crossing order, absence of the removed dotted connector, rotated React/AWS capsule proportions and radii, marker/pulse path distance, label/marker collisions, PHP's two-employer hover state, ELMO Software keyboard focus, accessible skills, themed ink, navigation, content, pause/resume, reduced motion, and responsive overflow checks.
- Screenshot inspection covers desktop in both themes and the 390px mobile layout. Local artifacts: `C:/Users/kryoware/AppData/Local/Temp/portfolio-map-zen-evidence/` (`results.json`, `zen-desktop.png`, `zen-desktop-dark.png`, `zen-mobile.png`, `zen-mobile-work.png`). The desktop filenames identify the two captures; the initial system theme determines which is light or dark.
- The mechanical detector scan for each refinement reported one warning (currently `src/app/globals.css:433`): `transition: width`. It is a false positive matching the existing SVG **stroke-width** transition, which does not animate layout width. No confirmed detector issues remain.
- `DESIGN.md` and its `.impeccable/design.json` sidecar were merged with the actual station, interchange, opacity and accessible-legend rules. Route color descriptions now identify real professional work. The sidecar's duplicated sample train controls were reduced to the one control the implementation has.
- No current critique snapshot was available for this component. No unrelated product-context or surface-brief drift was repaired.

## Research-driven geometry follow-up

The first repair established correct membership but did not establish convincing route structure. [Primary-source research](transit-map-research.md) identified quadratic cutbacks, overlapping blue/orange departures and short reversing approaches as the underlying design problems.

The follow-up uses a long blue spine, a vertical orange database run, and an eastward site route. All bends are real circular SVG arcs at radius 27 (three 9-unit strokes); no authored bend needs a reduced radius. React has two route-specific platform positions within its capsule, 24 units apart. Paper casing clarifies non-transfer crossings. Train motion uses the same final arc paths and starts at the first stop even during its delayed entrance. Existing ordinary circular terminal stops are retained rather than adding a conflicting operator's terminal symbols.

Labels at Vue, TypeScript and PHP sit clear of the route strokes as well as unrelated markers. The geometry follow-up retains all 28 stations and 33 line/station relationships. Full source attribution, the distinction between standards and observations, and research limits are in the linked note. Static operator maps are not a specification for physical train dynamics.

The requested crossing refinement paints red H after brown S and green D after orange M, independently of the legend order and draw timing. The temporary dotted Room/Laravel link was removed in the subsequent refinement, together with its CSS and accessible description. Zen guards the crossing order and the connector's absence.

The company/cloud update expands the network to 32 stations and 38 relationships: AWS is shared by ELMO/Futuristech with separate blue/orange platforms; Terraform belongs to ELMO, Azure to Yondu and GCP to Futuristech. ELMO's canonical route is `/work/elmo-software/`; the old route is preserved by two static-asset redirect rules, tested with Cloudflare's local runtime. Company locations now use plain secondary metadata rather than boxed tags, and Yondu's role is Mid Frontend Developer. A separate [NDA disclosure audit](nda-content-audit.md) flags employer-linked technical details for review without claiming that their publication is permitted.

AWS is a 22×48 vertical counterpart of React's 48×22 capsule. The renderer now calculates radius from the shorter dimension, preserving an 11-unit radius and straight sides in both orientations; the former height-based radius caused an oval. The AWS label is centered beneath the station. Route positions and per-line platforms are unchanged.

## Metadata, promotion and strip readability follow-up

Middle dots now have a centered 1.4em inline box in company/date metadata, city/Remote metadata and freelance names, including BAI / GRUPBAI. Padding alone did not produce enough visible clearance in the first Zen screenshots. The employer/date fragments are wrapped as one inline group so the flex metadata container cannot stack the dot by itself.

ELMO's promotion is a separate two-stop career strip: Mid Full Stack Software Engineer (Jun 2022–2023), then Senior Full Stack Software Engineer (2023–Present, promoted). It appears on both the homepage and ELMO detail page. The current-role fact remains concise, and the technical summary no longer carries the promotion sentence. No month is invented for the 2023 change.

Shared horizontal strips now use at most five columns, with 32px between rows and no connector extending beyond a row's last station. ELMO and Futuristech each render two rows of five; Yondu remains one row of five. Short Notifly and homelab lists retain equal-width columns. Mobile strips and explicitly vertical contribution/pipeline lists remain vertical.

Validation: production build and type checking passed; all five network tests passed. Installed Zen 1.23.4b passed **61 checks**, including separator geometry, metadata grouping, separate dated roles, five-item rows, stopped row-end tracks, all detail routes, viewport overflow, theme persistence, train motion and reduced motion. Screenshots were inspected together at desktop and mobile sizes, followed by one correction batch and one confirmation pass. Added captures in the existing local evidence directory: `zen-desktop-work.png`, `zen-desktop-freelance.png`, `zen-desktop-elmo.png`, `zen-desktop-career.png`, `zen-mobile-career.png` and `zen-mobile-freelance.png`.

The shared preview twice returned `Preview automation snapshot timed out after 15000ms.` Verification continued in the user-requested installed Zen browser. The detector reported only the existing SVG stroke-width false positive at CSS line 433. These revisions remain local; Safari, physical devices and screen readers were not tested.

## Freelance chronology follow-up

The homepage experience list now includes all three dated freelance engagements, ordered by end date alongside the company roles. Umá / iFarms (Jan–Mar 2021) appears between Yondu and Futuristech. BAI / GRUPBAI (Jun–Jul 2020) and retail/queueing work (Dec 2018–Feb 2019) explicitly say Alongside Futuristech, matching their overlap with the supplied company dates. No engagement dates were extended and no continuous freelance period was inferred.

Compact freelance rows reuse the existing route title, metadata and keyboard-focus behavior, and link to stable anchors on the original detailed project rows. The main list is now an ordered list with an accessible chronology label. There are no new map lines, stations or project claims.

The production build, including TypeScript and static export, passed. Zen 1.23.4b passed **67 checks**, adding exact company/freelance order, the 2021 placement, concurrent-work labels and all three detail-anchor links to the previous coverage. Desktop and mobile captures (`zen-desktop-freelance-timeline.png` and `zen-mobile-freelance-timeline.png` in the existing evidence directory) show the inserted entry between company roles. The detector still reports only the known SVG stroke-width false positive. Revisions remain local and uncommitted; Safari and physical devices remain untested.

## Collapsed career timeline follow-up

The homepage now has one connected, compact career timeline. Six native details/summary entries start collapsed; each exposes dates, employer/client, role and a brief summary. Expansion reveals company location, ELMO's 2023 promotion and work-page links, or the original freelance description. The duplicate freelance board and homepage company technology strips were removed. Full work pages, five-item technology rows, original dates and concurrent freelance labels remain intact. Existing freelance anchors resolve to the unified timeline or the relevant row.

The production build, including TypeScript and static export, passed. Zen 1.23.4b passed **76 checks**, covering initial collapsed state, visible briefs, chronology and concurrent labels, expanded metadata/promotion, all freelance anchors, mouse/Enter/Space disclosure control, work-page navigation and expanded overflow at 1440/768/390/320px. Desktop captures in both themes and mobile collapsed/expanded captures were inspected in one batch. Current evidence includes `zen-desktop-timeline.png`, `zen-desktop-timeline-theme-2.png`, `zen-mobile-work.png`, `zen-mobile-timeline.png` and `zen-mobile-expanded-timeline.png` in the existing local evidence directory. The tall mobile element capture shows the lower timeline; the work viewport capture covers the upper entries.

No dependencies or client JavaScript were added. Obsolete route CSS was removed; detail-page career styles remain in use. The detector reports only the existing stroke-width false positive at CSS line 433. Changes remain local; Safari, physical devices, screen readers and Lighthouse performance scoring were not checked.

## Reproduce

```powershell
node --test scripts/network.test.mjs
npm run build
npm run typecheck
python -m http.server 4173 --bind 127.0.0.1 --directory out
```

In another terminal:

```powershell
python scripts/validate-zen.py --driver C:/Users/kryoware/AppData/Local/Temp/portfolio-geckodriver/geckodriver.exe --url http://127.0.0.1:4173 --evidence C:/Users/kryoware/AppData/Local/Temp/portfolio-map-zen-evidence
```

No production deployment is part of this verification. Physical phones, Safari, screen readers and hardware performance profiling remain untested. The diagram covers the selected technologies published in work-page stacks, not every tool mentioned in prose or freelance history.
