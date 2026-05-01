# Learnings

## 2026-04-30 Task: start-work
- Plan selected: `.sisyphus/plans/homepage-publication-density.md`.
- Target site: Astro 4 static site at `D:\vscode-project\git-project\blog`.
- Primary expected source file for implementation tasks: `src/pages/index.astro`.
- User intent: content-density small-step homepage refinement, not a redesign.
- Preserve interactions: particle background, theme toggle, spotlight/tilt, Blog hover preview/right preview stage.

## 2026-05-01 Task 1: homepage publication latest-4 list
- Homepage publications now derive from non-draft `publicationEntries` sorted by `pubDate` descending, then `publicationEntries.slice(0, 4)`.
- Compact homepage rows use `homepage-publication-list` and `homepage-publication-item`; title links prefer `officialLink`, then `blogLink`, otherwise plain text.
- Keep row metadata assembled as an array before joining with ` · ` to avoid dangling separators when `venue` or `venueDetail` is absent.
- `npm run build` passed after the change, and generated `dist/index.html` contains no homepage cover/placeholder selectors.

## 2026-05-01 Task 1 retry: publication footer link
- Added the missing non-empty homepage Publication footer link: `.homepage-publication-footer a[href="/publication"]` with visible text `查看全部发表`.
- Empty-state `/publication` link remains unchanged; `npm run build` passed after the retry fix.

## 2026-05-01 Task 2: homepage publication/blog density
- Kept Task 2 scoped to `src/pages/index.astro` styles only; no homepage markup or preview JavaScript needed to change.
- Homepage section headers are compacted with `.section-header { margin-bottom: 0.55rem; }`, `.publication-header` no longer expands beyond that, and Publication/Blog h2 titles use `clamp(1.05rem, 1.5vw, 1.28rem)`.
- Blog row compaction required both smaller row metrics and grid stretch control: `.post-list { align-self: start; }` prevents the left list rows from stretching to match the right preview column on desktop, yielding 90px rows at 1440px.
- Mobile overflow was caused by min-content sizing in nested grids, not by the compact row values; scoped `min-width: 0` guards on homepage main children, writing-stage/list/row/body, and preview-stage children keep the 390px layout within the viewport.
- Final Playwright checks passed: desktop hover/focus of the second `.post-row` updates preview title/date/excerpt/href; mobile has no horizontal scroll and Publication/Blog sections remain readable.

## 2026-05-01 Task 3: final QA evidence
- `npm run build` evidence saved to `.sisyphus/evidence/task-3-build.log`; build passed and produced 8 pages.
- Astro preview used `http://127.0.0.1:4323/` because ports 4321 and 4322 were already occupied.
- Screenshots were captured with Playwright and copied into `.sisyphus/evidence/task-3-home-desktop.png`, `.sisyphus/evidence/task-3-home-tablet.png`, and `.sisyphus/evidence/task-3-home-mobile.png`.
- DOM checks at desktop/tablet/mobile found no horizontal overflow, no Publication cover/placeholder/stack elements, no unsafe `undefined`/`null`/`N/A` text, and the particle canvas remained mounted.
- Desktop hover/focus regression passed: preview changed from `一个在互联网上的锚点` to `克制与复杂` and console errors stayed at 0.
- Task 3 visual review caught and fixed a mobile-only overlap: desktop `.home-sidebar { max-height: 38vh; }` persisted after the mobile static layout, so `max-height: none` was added inside `@media (max-width: 960px)`; recheck at 390x844 confirmed sidebar/quote overlap is false.
