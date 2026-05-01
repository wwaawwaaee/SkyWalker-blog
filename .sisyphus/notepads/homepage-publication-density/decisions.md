# Decisions

## 2026-04-30 Task: start-work
- Homepage Publication list shows latest 4 non-draft publication entries sorted by `pubDate` descending.
- Homepage Publication must be no-cover/no-placeholder and compact text-first.
- Blog count remains existing latest 4; only visual footprint is reduced.
- Verification uses `npm run build` plus browser visual/interaction QA; no new test/lint/typecheck infra.
- No commits unless the user explicitly requests commits.
