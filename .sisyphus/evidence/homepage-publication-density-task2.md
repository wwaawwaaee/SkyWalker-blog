# Homepage Publication Density Task 2 Evidence

Date: 2026-05-01

## Build

- Command: `npm run build`
- Working directory: `D:\vscode-project\git-project\blog`
- Result: passed; Astro built 8 pages and generated `/index.html`.

## Desktop Playwright QA (`1440x900`)

- URL: `http://127.0.0.1:4321/`
- Blog post row count: `3` (current content has 3 non-draft blog posts).
- Blog row heights: `90px`, `90px`, `90px`.
- `.section-header` margin-bottom: `8.8px` (`0.55rem`).
- `.publication-header` margin-bottom: `8.8px` (`0.55rem`).
- Blog h2 computed font-size: `20.48px`.
- Preview elements present: `.preview-stage` and `.preview-image`.
- Hover/focus check: second `.post-row` changed preview title/date/excerpt/href from `一个在互联网上的锚点` to `克制与复杂`.
- Horizontal overflow: none (`scrollWidth === clientWidth === 1440`).
- Browser console errors: `0`.
- Screenshot captured through Playwright as `task-2-blog-hover-desktop.png` in the Playwright MCP output area.

## Mobile Playwright QA (`390x844`)

- Effective viewport content width: `375px`.
- Horizontal overflow: none (`documentElement.scrollWidth === clientWidth === 375`; `body.scrollWidth === body.clientWidth === 375`).
- Publication section text present and readable by DOM check.
- Blog section text present and readable by DOM check.
- Mobile row heights: `117px`, `98px`, `98px`.
- Preview elements present: `.preview-stage` and `.preview-image`.
- Browser console errors: `0`.
- Screenshot captured through Playwright as `task-2-mobile-compact.png` in the Playwright MCP output area.

## Environment Notes

- `lsp_diagnostics` remains unavailable because configured `oxlint` is not installed.
- Screenshots could not be written directly into this repo path by Playwright MCP because allowed roots are restricted; screenshot artifacts are available in the MCP output area.
