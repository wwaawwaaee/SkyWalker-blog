# SkyWalker Blog

Astro-based static blog with a lightweight writing workflow.

## Scripts

- `npm run dev` - start the local development server
- `npm run build` - build the production site into `dist/`
- `npm run preview` - preview the production build locally

## Writing Workflow

Create new posts in `src/content/blog/`.

Example frontmatter:

```md
---
title: Shipping Small Websites
description: Notes on building and publishing fast-moving static sites.
pubDate: 2026-04-01
draft: false
---
```

The blog index and static post pages are generated automatically from the content collection.

Additional publishing outputs:

- RSS feed: `/feed.xml`
- Sitemap: `/sitemap-index.xml`

## Launch Checklist

- Update `src/consts.ts` with your site title and description
- Replace placeholder text on the pages with your real content
- Add your real contact details to `src/pages/contact.astro`
- Confirm `astro.config.mjs` and `CNAME` match your real domain
- Push to `main` to deploy with GitHub Pages

## Deployment

This repo is configured for GitHub Pages through `.github/workflows/deploy.yml`.
