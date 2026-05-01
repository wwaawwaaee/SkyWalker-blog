# Homepage Publication Density Task 1 Evidence

Date: 2026-05-01

## Build

- Command: `npm run build`
- Working directory: `D:\vscode-project\git-project\blog`
- Result: passed; Astro built 8 pages and generated `/index.html`.

## Selector checks

- Source check: `src/pages/index.astro` has no matches for `publication-(paper-cover|placeholder|stack|main|back)`.
- Build output check: `dist/index.html` has no matches for `publication-(paper-cover|placeholder|stack|main|back)`.
- Build output contains the new compact list hook `homepage-publication-list` / `homepage-publication-item`.

## Browser QA

- Atlas installed the Playwright Chrome browser in the local environment after the initial missing-browser failure.
- Preview URL: `http://127.0.0.1:4321/`
- Page loaded with status/title: `SkyWalker Blog`.
- `.publication-section` browser DOM checks:
  - `homepage-publication-item` rows: `1` (current content has 1 non-draft publication and 1 draft placeholder).
  - `homepage-publication-list`: present.
  - `a[href="/publication"]`: present.
  - `.publication-paper-cover`: absent.
  - `.publication-placeholder`: absent.
  - `.publication-stack`: absent.
  - Unsafe visible tokens (`undefined`, `null`, `N/A`): absent.
- Browser console errors: `0`.
- Screenshot captured through Playwright as `task-1-publication-list-desktop.png` in the Playwright MCP output area; direct write into repo evidence path was denied by Playwright allowed-root restrictions.
