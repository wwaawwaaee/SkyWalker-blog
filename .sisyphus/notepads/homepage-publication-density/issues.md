# Issues

## 2026-04-30 Task: start-work
- No active issues at session start.

## 2026-05-01 Task 1: verification tooling
- `lsp_diagnostics` for `src/pages/index.astro` could not run because the configured `oxlint` LSP server is not installed in this environment (`Command not found: oxlint`). Build verification was used as the compiler check.
- Playwright browser QA could not run because the MCP could not find Chrome at `C:\Users\Administrator\AppData\Local\Google\Chrome\Application\chrome.exe`; no screenshot was captured.

## 2026-05-01 Task 2: verification tooling
- `lsp_diagnostics` for `src/pages/index.astro` is still blocked by missing `oxlint` (`Command not found: oxlint`). `npm run build` and Playwright desktop/mobile QA passed after the scoped CSS changes.
