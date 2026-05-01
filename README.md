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

## Inline Blog Images

Place article images under `public/img/blog/<post-slug>/` and reference them from Markdown with the public path:

```md
![Descriptive alt text](/img/blog/my-post/image.webp "Visible caption")
```

- Use clear alt text for accessibility; the optional Markdown title becomes the visible caption below a standalone image.
- Omit the title when no caption is needed: `![Alt text](/img/blog/my-post/image.webp)`.
- Prefer `webp` or `jpg`, and keep image dimensions/file sizes reasonable for fast page loads.
- For complex custom layouts, raw HTML `<figure>` markup can still be used inside a blog post.

## Cover Image Guidance

To avoid layout breakage from incompatible image sizes, keep cover images close to these aspect ratios:

- Blog preview covers: `16:9`
  - Recommended sizes: `1600x900`, `1280x720`, `1920x1080`
- Publication covers: `4:5.4`
  - Recommended sizes: `1200x1620`, `1000x1350`, `800x1080`

Practical advice:

- Keep important text or faces near the center of the image
- Leave some safe margin around the edges
- Avoid placing key content too close to the border
- The site uses `object-fit: cover`, so oversized images will be cropped rather than stretched

Suggested file formats:

- `webp` for most cases
- `jpg` for photos
- `png` for UI screenshots or illustrations that need sharper edges

Suggested naming examples:

```text
public/img/covers/blog-my-post.webp
public/img/covers/publication-paper-01.webp
```

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
