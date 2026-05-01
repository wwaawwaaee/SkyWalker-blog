# Homepage Publication Density Refresh

## TL;DR
> **Summary**: Convert the homepage Publication area from a single cover-heavy feature block into a compact latest-4 text list, and reduce homepage Blog/Publication header and row density while preserving existing visual interactions.
> **Deliverables**:
> - Homepage Publication latest-4 no-cover compact list
> - Smaller homepage Publication/Blog headers and denser Blog rows
> - Preserved particle background, blog hover preview, right-side preview stage, spotlight/tilt behavior
> - `npm run build` plus agent-executed desktop/mobile visual QA evidence
> **Effort**: Short
> **Parallel**: NO
> **Critical Path**: Task 1 → Task 2 → Task 3 → Final Verification Wave

## Context

### Original Request
用户希望根据个人网站 `D:\vscode-project\git-project\blog` 的当前情况规划修改方案。后续确认的方向是：内容信息优先、小步优化、保留现有视觉交互，重点修改首页展示部分。

### Interview Summary
- 用户选择优先级：内容信息。
- 用户选择改造尺度：小步优化。
- 用户确认视觉交互基本保留：粒子背景、hover preview、spotlight/tilt 不作为本次移除目标。
- 用户要求：主页 Publication 改为无封面栏的极简样式，接近 About 致谢中提到的研究者主页的信息密度。
- 用户要求：主页 Publication 和 Blog 的标题栏/字体整体缩小，让用户一次性看到更多文献/条目。
- 用户选择：主页 Publication 默认展示最新 4 条。
- 用户选择验证策略：`npm run build` + agent 视觉 QA，不新增 test/lint/typecheck 基建。

### Metis Review (gaps addressed)
- 明确 Blog 条目数量保持现状：继续使用现有 `latestPosts.slice(0, 4)`，只降低视觉占用。
- 明确 Homepage Publication 行字段：title 必显；authors、venue、venueDetail、date、officialLink、blogLink 按存在条件渲染；不显示 cover；不显示 abstract；description 最多作为一行简介，缺失时不渲染。
- 明确首页 Publication 不做年份分组，因为只显示最新 4 条。
- 明确 publication 作者和标题允许自然换行；桌面端保持紧凑，移动端优先可读，不强制截断造成信息丢失。
- 明确 CSS 尺度目标：减少 header margin、标题字号、post row padding/min-height/gap；避免“凭感觉变小”。
- 明确禁止范围蔓延：不新增搜索、过滤、分页、schema、依赖、测试/lint/typecheck 基建、publication 详情页或整体重构。

## Work Objectives

### Core Objective
在 `src/pages/index.astro` 中完成首页信息密度小步优化：Publication 从单篇带封面展示改成最新 4 条极简文字列表；Blog 保留现有 hover 封面预览交互但缩小标题栏、字号、行高和间距。

### Deliverables
- `src/pages/index.astro` 中 publication query/derived data 支持 latest 4 non-draft entries。
- 首页 Publication section 移除 cover column 与 decorative placeholder stacks，改为 no-cover compact list。
- 首页 Blog section 保留当前 4 篇列表和右侧 preview stage，但 row/header 更紧凑。
- CSS 更新仅作用于 homepage 相关类，避免影响 `src/pages/publication/index.astro`。
- Agent evidence：build log、desktop/tablet/mobile screenshots、hover preview 验证记录。

### Definition of Done (verifiable conditions with commands)
- `npm run build` 在 `D:\vscode-project\git-project\blog` 中退出码为 `0`。
- 启动本地预览后，首页 Publication section 在至少 4 条非 draft publication 时渲染 4 条；少于 4 条时渲染全部可用条目且不报错。
- 首页 Publication section 不出现 publication cover `<img>`、`publication-paper-cover`、`publication-placeholder`、paper stack 装饰。
- 首页 Blog hover preview 在桌面端 hover/focus 不同行时仍更新图片、日期、标题、excerpt 和 href。
- `1440x900`、`1024x768`、`390x844` 三种 viewport 无水平 overflow、无文字重叠、无 `undefined`/`null`/空分隔符。

### Must Have
- 保留 `BaseLayout`、`Navigation`、`ParticleBackground`、theme toggle、spotlight/tilt 行为。
- 保留 Blog section 的右侧 preview card 和 hover/focus 更新脚本。
- Publication sort：按 `pubDate` 降序，过滤 `draft: true`，slice 最新 4 条。
- Homepage Publication 行必须使用现有 collection schema 字段，不修改 `src/content/config.ts`。
- Optional fields defensive render：缺字段时不渲染对应行、链接或分隔符。
- CSS 使用 homepage-scoped class 或仅在 `src/pages/index.astro` scoped style 内修改。

### Must NOT Have (guardrails, AI slop patterns, scope boundaries)
- MUST NOT redesign 整个首页。
- MUST NOT 移除粒子背景、theme toggle、spotlight/tilt、Blog hover preview、右侧 preview stage。
- MUST NOT 新增 React/Vue/Svelte、UI 框架、动画库或任何新依赖。
- MUST NOT 新增 search/filter/pagination/year grouping/tags/publication detail route。
- MUST NOT 修改 `src/content/config.ts` schema。
- MUST NOT 修改 `src/pages/publication/index.astro`，除非发现选择器冲突且只做最小隔离修复。
- MUST NOT 新增 test/lint/typecheck infra 或 CI workflow 变更。
- MUST NOT 新增装饰性 publication cover、paper stack、图标、badge-heavy layout。
- MUST NOT 修改 content markdown 文件；本次只改展示层。

## Verification Strategy
> ZERO HUMAN INTERVENTION - all verification is agent-executed.
- Test decision: none new; use existing Astro build via `npm run build`.
- QA policy: Every task has agent-executed scenarios.
- Evidence: `.sisyphus/evidence/task-{N}-{slug}.{ext}`
- Browser QA: use Playwright or equivalent browser automation against local dev/preview server.

## Execution Strategy

### Parallel Execution Waves
> Target: 5-8 tasks per wave. <3 per wave (except final) = under-splitting.
> Extract shared dependencies as Wave-1 tasks for max parallelism.

Wave 1: Task 1 publication data/layout foundation
Wave 2: Task 2 Blog/header density styling
Wave 3: Task 3 verification and responsive QA hardening

### Dependency Matrix (full, all tasks)
- Task 1: no dependencies; blocks Task 2 only where shared section header CSS decisions overlap; blocks Task 3.
- Task 2: blocked by Task 1 for shared homepage style context; blocks Task 3.
- Task 3: blocked by Task 1 and Task 2.
- F1-F4: blocked by all implementation tasks.

### Agent Dispatch Summary (wave → task count → categories)
- Wave 1 → 1 task → `visual-engineering`
- Wave 2 → 1 task → `visual-engineering`
- Wave 3 → 1 task → `unspecified-high`
- Final Verification → 4 review tasks → oracle / unspecified-high / unspecified-high / deep

## TODOs
> Implementation + Test = ONE task. Never separate.
> EVERY task MUST have: Agent Profile + Parallelization + QA Scenarios.

- [x] 1. Replace homepage Publication feature block with latest-4 compact text list

  **What to do**:
  1. Edit `src/pages/index.astro` only.
  2. Keep the existing publication collection query filtering `!data.draft` and sorting descending by `pubDate`.
  3. Add a derived array named exactly `homepagePublications` or equivalent clear local name: `publicationEntries.slice(0, 4)`.
  4. Keep `publicationCount` for the count badge if still useful, but the homepage list must render from latest 4 entries, not only `latestPublication`.
  5. Replace lines `94-132` style structure with a compact no-cover list:
     - Keep section wrapper `<section class="content-card publication-section">`.
     - Keep section header at `src/pages/index.astro:86-92`, but make its typography compact in CSS.
     - Remove homepage rendering of `.publication-paper-cover`, cover `<img>`, `.publication-placeholder`, `.publication-stack`, `.publication-main`, `.publication-back-*`.
     - Render a list container, recommended class: `.homepage-publication-list`.
     - Render each entry as article/row, recommended class: `.homepage-publication-item`.
     - Row fields:
       - Title: always render, link to `officialLink` if present, else `blogLink` if present, else plain text.
       - Authors: render only if `item.data.authors.length > 0`, join with ` · `.
       - Venue/date metadata: date year or full zh-CN date plus venue/venueDetail only when present; avoid dangling separators.
       - Description: render only if present; constrain to one compact line on desktop using CSS line clamp if feasible, natural wrap on mobile if needed.
       - Links: render `博客解读` and/or `官方链接` only when present; if neither exists, no link group.
     - Empty state: if `publicationCount === 0`, keep concise existing empty-state copy but remove cover/placeholder visuals.
     - Add one footer link: `查看全部发表` linking to `/publication`.
  6. Do not implement year grouping, filters, search, cards, icons, badges, abstracts, cover fallbacks, or new data fields.
  7. Use `src/pages/publication/index.astro:19-35` only as a text-list pattern reference, not as a wholesale copy.

  **Must NOT do**:
  - Do not modify `src/content/config.ts`.
  - Do not modify `src/pages/publication/index.astro`.
  - Do not render any publication cover image on homepage.
  - Do not introduce `undefined`, `null`, `N/A`, empty separators, or placeholder text.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` - Reason: bounded Astro markup + CSS layout change with visual density requirements.
  - Skills: `[]` - No special skill required; use existing Astro/CSS patterns.
  - Omitted: [`frontend-ui-ux`] - Not loading unless available/needed; this is not a full redesign.

  **Parallelization**: Can Parallel: NO | Wave 1 | Blocks: [2, 3] | Blocked By: []

  **References** (executor has NO interview context - be exhaustive):
  - Pattern: `src/pages/index.astro:30-35` - current publication query, count, latestPublication derivation.
  - Pattern: `src/pages/index.astro:85-132` - current homepage Publication section to replace/compact.
  - Pattern: `src/pages/publication/index.astro:19-35` - existing text-only publication list pattern.
  - API/Type: `src/content/config.ts:15-30` - publication fields and optional fields.
  - Reference: `src/content/about/index.md:25-31` - acknowledged researcher references that motivate minimal academic style.
  - External: `https://zhaochenyang20.github.io/Chayenne/` - pure text/link publication list reference.
  - External: `https://jiaxuanzou0714.github.io/publications/` - dense title/authors/venue/link publication reference.
  - External: `https://huanranchen.github.io/` - high-density academic homepage publication/work reference.

  **Acceptance Criteria** (agent-executable only):
  - [ ] `src/pages/index.astro` contains a latest-4 homepage publication array derived from non-draft publications sorted by `pubDate` descending.
  - [ ] Homepage Publication section renders no `.publication-paper-cover`, no homepage publication cover `<img>`, and no `.publication-placeholder`/`.publication-stack` markup.
  - [ ] Homepage Publication section renders up to 4 compact publication rows and a `/publication` link.
  - [ ] Optional fields render conditionally with no visible `undefined`, `null`, dangling `·`, empty link group, or blank metadata row.
  - [ ] `npm run build` exits `0`.

  **QA Scenarios** (MANDATORY - task incomplete without these):
  ```
  Scenario: Homepage shows compact latest-4 publication list
    Tool: Playwright + Bash
    Steps: Run `npm run build`; start local preview with `npm run preview`; open `/`; locate `.publication-section`; count `.homepage-publication-item` rows or the final implemented row selector.
    Expected: Build exits 0; if at least 4 non-draft publications exist, exactly 4 rows render; if fewer exist, all available rows render; section includes link href `/publication`; no cover image or placeholder stack exists inside `.publication-section`.
    Evidence: .sisyphus/evidence/task-1-publication-list-desktop.png and .sisyphus/evidence/task-1-build.log

  Scenario: Optional publication metadata is safe
    Tool: Playwright
    Steps: Open `/`; inspect `.publication-section` visible text and anchors; check for text tokens `undefined`, `null`, `N/A`; check there are no empty anchors and no metadata line ending with dangling `·`.
    Expected: No unsafe placeholder tokens, no empty links, no dangling separators, no blank metadata rows.
    Evidence: .sisyphus/evidence/task-1-publication-list-metadata.txt
  ```

  **Commit**: NO | Message if user explicitly requests commit: `refactor(home): compact publication preview` | Files: [`src/pages/index.astro`]

- [x] 2. Reduce homepage Publication and Blog visual footprint while preserving interactions

  **What to do**:
  1. Edit `src/pages/index.astro` scoped `<style>` only unless markup hooks from Task 1 require tiny class additions.
  2. Compact shared section headers:
     - Reduce `.section-header` margin from current `0.8rem` to about `0.45rem-0.6rem`.
     - Ensure `.publication-header` does not override with a larger margin than shared compact target.
     - Add/adjust homepage `h2` styles so Publication and Blog section titles are clearly smaller than before; target around `clamp(1.05rem, 1.5vw, 1.28rem)` unless global styles already set a smaller value.
  3. Compact Publication list styling from Task 1:
     - Row padding target: about `0.55rem 0`.
     - Row gap target: about `0.45rem-0.65rem`.
     - Title line-height target: about `1.25-1.35`.
     - Metadata font target: about `0.78rem-0.86rem`.
     - Use subtle borders only; no card-heavy background, image, icon, or badge treatment.
  4. Compact Blog list while preserving structure:
     - Keep `latestPosts.slice(0, 4)` unchanged.
     - Keep `.writing-stage` two-column desktop layout and `.preview-stage-wrap`/`.preview-stage` behavior.
     - Reduce `.post-list` gap from `1rem` to about `0.65rem-0.75rem`.
     - Reduce `.post-row` min-height from `118px` to about `84px-96px`.
     - Reduce `.post-row` padding from `1rem 1.05rem` to about `0.7rem 0.8rem`.
     - Reduce `.post-row` grid date column from `140px` to about `112px-124px` on desktop.
     - Reduce `.post-row-meta` from `0.84rem` to about `0.74rem-0.78rem`.
     - Reduce post title/excerpt visual weight without hiding the excerpt entirely.
  5. Preserve Blog hover preview script selectors and DOM hooks:
     - `.latest-posts-section`
     - `.post-row`
     - `data-preview-index`
     - `.preview-stage`
     - `.preview-image`
     - `.preview-date`
     - `.preview-title`
     - `.preview-excerpt`
  6. Preserve responsive behavior at `max-width: 960px`, `768px`, `560px`; adjust only if compact styles create overflow.

  **Must NOT do**:
  - Do not remove `.preview-stage-wrap`, `.preview-stage`, `.preview-cover`, `.preview-image`, `.preview-content`, or hover/focus event handling.
  - Do not change Blog post count.
  - Do not hide Blog descriptions entirely.
  - Do not alter global `src/styles/global.css` unless absolutely necessary; prefer homepage scoped styles.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` - Reason: typography, spacing, and responsive CSS changes with interaction preservation.
  - Skills: `[]` - No special skill required.
  - Omitted: [`ai-slop-remover`] - Not needed unless review flags over-engineered CSS.

  **Parallelization**: Can Parallel: NO | Wave 2 | Blocks: [3] | Blocked By: [1]

  **References** (executor has NO interview context - be exhaustive):
  - Pattern: `src/pages/index.astro:135-177` - current Blog section markup to preserve.
  - Pattern: `src/pages/index.astro:182-240` - hover preview script selectors and behavior to preserve.
  - Pattern: `src/pages/index.astro:399-429` - current section header/publication header/badge styles.
  - Pattern: `src/pages/index.astro:493-637` - current Blog row layout, gaps, min-height, metadata, title/excerpt styles.
  - Pattern: `src/pages/index.astro:654-744` - preview stage and ghost cards to preserve.
  - Pattern: `src/pages/index.astro:757-822` - current responsive breakpoints to preserve/adapt.

  **Acceptance Criteria** (agent-executable only):
  - [ ] Homepage Publication and Blog section headers are smaller and use less vertical margin than before using explicit CSS changes.
  - [ ] Blog still renders 4 latest post rows from existing logic.
  - [ ] Blog `.post-row` min-height/padding/gap are reduced to compact targets.
  - [ ] Blog hover/focus preview still updates visible preview title/date/excerpt/href when moving between rows.
  - [ ] No horizontal overflow at `1440x900`, `1024x768`, or `390x844`.
  - [ ] `npm run build` exits `0`.

  **QA Scenarios** (MANDATORY - task incomplete without these):
  ```
  Scenario: Desktop Blog interaction preserved after compacting
    Tool: Playwright + Bash
    Steps: Run `npm run build`; start local preview; open `/` at 1440x900; record preview title; hover/focus the second `.post-row`; read `.preview-title`, `.preview-date`, `.preview-excerpt`, and `.preview-stage[href]`.
    Expected: Preview values change to the second post; `.preview-stage` remains visible; `.preview-cover img` remains visible; no console errors from the hover script.
    Evidence: .sisyphus/evidence/task-2-blog-hover-desktop.png and .sisyphus/evidence/task-2-blog-hover.txt

  Scenario: Compact layout remains readable on mobile
    Tool: Playwright
    Steps: Open `/` at 390x844; inspect `.publication-section` and `.latest-posts-section`; measure document scroll width vs viewport width; capture screenshot.
    Expected: No horizontal overflow; Publication rows are readable; Blog rows stack according to existing responsive rules; no text overlap; preview behavior degrades no worse than existing touch/mobile behavior.
    Evidence: .sisyphus/evidence/task-2-mobile-compact.png
  ```

  **Commit**: NO | Message if user explicitly requests commit: `style(home): tighten publication and blog density` | Files: [`src/pages/index.astro`]

- [x] 3. Final implementation QA hardening and evidence capture

  **What to do**:
  1. Run `npm run build` from `D:\vscode-project\git-project\blog` and save output to `.sisyphus/evidence/task-3-build.log`.
  2. Start `npm run preview` or `npm run dev` for browser checks.
  3. Use Playwright/browser automation to verify the homepage at these viewports:
     - `1440x900`
     - `1024x768`
     - `390x844`
  4. Capture screenshots:
     - `.sisyphus/evidence/task-3-home-desktop.png`
     - `.sisyphus/evidence/task-3-home-tablet.png`
     - `.sisyphus/evidence/task-3-home-mobile.png`
  5. Capture a text evidence file `.sisyphus/evidence/task-3-dom-checks.txt` containing:
     - Publication row count.
     - Whether `.publication-paper-cover`, `.publication-placeholder`, `.publication-stack` exist inside `.publication-section`.
     - Whether `undefined`/`null`/`N/A` are visible in homepage body text.
     - Blog preview initial title and title after hover/focus on another row.
     - Scroll width and viewport width for all three viewports.
  6. If QA fails, fix only within the established scope and rerun Task 3 evidence capture.

  **Must NOT do**:
  - Do not accept “looks okay” without screenshots and DOM/text assertions.
  - Do not broaden scope to lint/test/typecheck infrastructure.
  - Do not ask the user to manually verify during this task.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` - Reason: hands-on build/browser QA and possible small hardening fixes.
  - Skills: `[]` - Use browser automation and shell commands already available.
  - Omitted: [`git-master`] - Do not commit unless execution workflow explicitly requests commits.

  **Parallelization**: Can Parallel: NO | Wave 3 | Blocks: [F1, F2, F3, F4] | Blocked By: [1, 2]

  **References** (executor has NO interview context - be exhaustive):
  - Command: `package.json` scripts - `npm run build`, `npm run preview`.
  - Pattern: `.github/workflows/deploy.yml` - deployment already builds with npm; no workflow change required.
  - QA target: `src/pages/index.astro` - only expected source file changed.

  **Acceptance Criteria** (agent-executable only):
  - [ ] `.sisyphus/evidence/task-3-build.log` exists and shows successful build exit.
  - [ ] Desktop/tablet/mobile screenshots exist at specified evidence paths.
  - [ ] DOM checks evidence file exists and confirms no removed publication visual elements remain in homepage Publication section.
  - [ ] DOM checks evidence confirms no unsafe optional metadata text and no horizontal overflow.
  - [ ] DOM checks evidence confirms Blog hover preview updates.

  **QA Scenarios** (MANDATORY - task incomplete without these):
  ```
  Scenario: Full build and multi-viewport homepage verification
    Tool: Bash + Playwright
    Steps: Run `npm run build`; start preview; visit `/` at 1440x900, 1024x768, 390x844; capture screenshots and DOM check file.
    Expected: Build succeeds; screenshots captured; no horizontal overflow; compact Publication and Blog sections visible; no removed homepage publication cover/placeholder elements remain.
    Evidence: .sisyphus/evidence/task-3-build.log, .sisyphus/evidence/task-3-home-desktop.png, .sisyphus/evidence/task-3-home-tablet.png, .sisyphus/evidence/task-3-home-mobile.png, .sisyphus/evidence/task-3-dom-checks.txt

  Scenario: Regression guard for preserved interactions
    Tool: Playwright
    Steps: On desktop viewport, assert `.preview-stage`, `.preview-image`, `.post-row[data-preview-index]`, and `.particle-canvas` or equivalent particle background canvas still exist; hover/focus second blog row.
    Expected: Blog preview content updates; particle background remains mounted; no JavaScript console error related to preview script.
    Evidence: .sisyphus/evidence/task-3-interaction-regression.txt
  ```

  **Commit**: NO | Message if user explicitly requests commit: `test(home): verify compact homepage layout` | Files: [`.sisyphus/evidence/*` only if evidence is intentionally tracked]

## Final Verification Wave (MANDATORY — after ALL implementation tasks)
> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.
> **Do NOT auto-proceed after verification. Wait for user's explicit approval before marking work complete.**
> **Never mark F1-F4 as checked before getting user's okay.** Rejection or user feedback -> fix -> re-run -> present again -> wait for okay.
- [x] F1. Plan Compliance Audit — oracle
  - Verify implementation changed only intended scope, especially `src/pages/index.astro`.
  - Verify no forbidden additions: dependencies, schema changes, tests/lint/typecheck infra, publication routes, search/filter/year grouping.
  - Verify all user decisions are reflected: latest 4, no-cover Publication, compact Blog/Publication, interactions preserved.
- [x] F2. Code Quality Review — unspecified-high
  - Review Astro markup for conditional rendering safety, no duplicated unsafe separators, no inaccessible empty anchors.
  - Review CSS for homepage-scoped selectors and no accidental publication index regression.
  - Review JavaScript preview selectors were preserved.
- [x] F3. Real Manual QA — unspecified-high (+ playwright if UI)
  - Re-run browser QA at `1440x900`, `1024x768`, `390x844`.
  - Produce independent screenshots and hover interaction notes.
  - Confirm no horizontal overflow and no console errors.
- [x] F4. Scope Fidelity Check — deep
  - Compare final result to user intent: content information, small-step optimization, minimalist academic publication density.
  - Confirm visual interactions remain and no full redesign occurred.
  - Confirm plan evidence is sufficient for user review.

## Commit Strategy
- Do not create commits unless the user explicitly requests commits.
- Preferred execution commit messages if commits are requested by the user/execution protocol:
  1. `refactor(home): compact publication preview` for Task 1.
  2. `style(home): tighten publication and blog density` for Task 2.
  3. Evidence files normally should not be committed unless repository convention includes `.sisyphus/evidence`; if committed, use `test(home): verify compact homepage layout`.
- Do not commit secrets, generated `dist/`, or unrelated files.
- Do not push unless user explicitly requests.

## Success Criteria
- Homepage Publication is a no-cover, latest-4 compact academic text list.
- Homepage Blog remains interactive but consumes less vertical space.
- Existing visual identity remains: particle background, hover preview, spotlight/tilt, theme behavior.
- `npm run build` succeeds.
- Desktop/tablet/mobile QA evidence exists and passes.
- No scope creep: no new dependencies, schema changes, routes, test/lint/typecheck infra, or full redesign.
