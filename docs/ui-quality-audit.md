# UI quality audit — 2026-10-25

Implementation integrity: **pass**. The transit diagram, route colors, square signage, native career disclosures and shared theme tokens remain coherent. This audit led directly into the requested harden, polish and document passes; no replacement visual world or dependency was added.

## Health score

| Dimension | Before | After | Evidence and limit |
| --- | --- | --- | --- |
| Accessibility | 2/4 | 3/4 | Fixed navigation contrast during highlighting; keyboard navigation, disclosures, theme names and reduced motion checked. No screen-reader certification. |
| Performance | 3/4 | 3/4 | Static export, lazy photos and animation cleanup preserved; removed one transition. No performance trace. |
| Responsive design | 3/4 | 3/4 | Zen viewport checks at 1440, 768, 390 and 320px; no horizontal document overflow, including expanded entries. Physical touch untested. |
| Theming | 4/4 | 4/4 | Light/dark switching, persistence and theme-aware map labels pass. |
| Implementation integrity | 3/4 | 4/4 | Updated stale browser selectors and design documentation; detector finding reviewed in context. |
| **Total** | **15/20** | **17/20 — Good** | Scoped engineering assessment, not a WCAG certification or performance benchmark. |

## Findings and resolutions

No P0 findings. One P1 and three P2 findings; all addressed in this pass.

### P1 — Navigation labels lose contrast during map highlighting

- Location: `src/app/globals.css`, `.legend__row[data-dim]`; `src/components/NetworkMap.tsx`, legend links.
- Category: accessibility. Hovering a station or focusing a route reduced other live navigation links to 35% opacity. They were still actionable, not disabled.
- Evidence: Zen computed opacity was `0.35`. Compositing the secondary text tokens over paper yields approximately **1.81:1 light / 2.26:1 dark**, below the 4.5:1 normal-text threshold (WCAG 1.4.3).
- Resolution (`polish`): remove legend dimming and its unused data attribute. Keep the existing underline for hover/focus and dim the decorative map only. Fully opaque secondary text yields **8.46:1 light / 9.89:1 dark**.
- Regression: keyboard and pointer highlighting must leave every legend link at opacity 1.

### P2 — Reduced motion leaves train graphics on the map

- Location: `src/app/globals.css`, reduced-motion media query; `NetworkMap` animation effect.
- Category: implementation integrity / accessibility preference. JavaScript correctly skips animation, but carriage graphics remain visible at their default route positions despite the documented train-free static presentation.
- Resolution (`harden`): hide the train/pulse layer alongside the motion control under the existing preference. Route paths, labels and navigation remain visible.
- Regression: reduced-motion browser preference hides every train layer and creates no train animations. This was a presentation mismatch, not evidence that reduced-motion users were receiving animated trains.

### P2 — Browser regression checks target an obsolete timeline

- Location: `scripts/validate-zen.py`, timeline selectors and promotion assertion.
- Category: implementation integrity. The suite stopped before testing interactions because `.career__stop` no longer existed. Its promotion copy also predated the supplied September date.
- Resolution (`harden`): target current card rows and native disclosures; preserve all original behavior checks and update the expected promotion copy. No production timeline implementation was changed by this audit.

### P2 — Design references describe stale behavior

- Location: `DESIGN.md` and `.impeccable/design.json`.
- Category: implementation integrity. Documentation instructed future work to dim navigation; the component preview still linked to `/work/hero-teams/`.
- Resolution (`document`): record full-opacity navigation and train-free reduced motion; correct the preview link and its keyboard underline. Merge the current timeline's September promotion, event-only years and 136px time column while preserving the existing creative direction and palette.

## Verification

- Production build, TypeScript checking, static export and postbuild processing passed. Next reports the existing ignored parent-directory lockfile notice.
- Five Node network tests passed (`node --test scripts/network.test.mjs`).
- Installed Zen 1.23.4b / Gecko 158 passed **79 browser assertions** against the static export. Coverage includes all five detail routes, direct and client navigation, six collapsed career entries, Enter/Space expansion, freelance anchors, theme persistence, skill relationships, map geometry, pause/resume, reduced motion and four viewport widths.
- Desktop/mobile and light/dark captures were collected together; desktop map and mobile timeline captures were visually inspected. Local evidence: `.git/impeccable-79a34/` (not committed).
- Impeccable detector ran once on changed UI files. Its sole warning, `layout-transition` at the existing `stroke-width` transition, is a false match for layout `width`; no layout-width animation was added.
- The suspected invisible contact focus ring was rejected: rendered light-theme outline was paper against ink, supplied by the existing `.terminus a:focus-visible` rule.
- The shared preview twice returned `Preview automation snapshot timed out after 15000ms.` Verification used the repository's existing Selenium/Zen workflow instead.

The working tree already contained timeline/content edits, and further timeline refinements appeared during the pass. Those changes were preserved; the final export was rebuilt to include them. They are not attributed to this audit. The original 79-check run excluded concurrent Notifly website link additions; the closure run below includes them.

## Cavecrew closure verification

- Cavecrew reviewer and investigator (`gpt-6-luna`, reasoning effort `medium`) confirmed all four findings are resolved, with no unresolved production issue.
- Cavecrew builder added 12 browser assertions covering homepage and Notifly detail website links, accessible names, and detail-page overflow at 1440, 768, 390 and 320px.
- On the current tree, `npm run build` passed, including TypeScript, static export and postbuild; `node --test scripts/network.test.mjs` passed **5/5**; and Zen 1.23.4b / Gecko 158 passed **91 browser checks** against the static export at `http://127.0.0.1:4176`. `git diff --check` passed.
- Evidence: `.git/impeccable-af5b/final/results.json`. External destination uptime was not verified.

## Preserved strengths and remaining checks

Native details/summary behavior, visible skip links, descriptive route names, system-theme fallback, storage-error handling, animation cancellation, offscreen pausing, lazy stock photos with disclosure, and static hosting remain intact. The recurring defect was extending decorative map dimming into readable navigation; the shared fix keeps those concerns separate without a new component.

Not checked: Safari/Chromium in this session, physical phones or foldables, synthesized touch gestures, screen readers, 200% text scaling, forced colors, offline/no-JavaScript behavior, and performance profiling. The site has no forms, remote data loading or user-generated datasets, so no speculative validation, loading states or localization framework was introduced.

For remaining device coverage, run `$impeccable audit` on the target hardware, address observed defects with `$impeccable harden`, and finish with `$impeccable polish`.
