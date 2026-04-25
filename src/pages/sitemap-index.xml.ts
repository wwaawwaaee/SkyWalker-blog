import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

const staticPages = ['/', '/about/', '/blog/', '/publication/', '/404.html', '/feed.xml'];

export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const urls = [
    ...staticPages.map((path) => ({
      loc: new URL(path, site).toString(),
    })),
    ...posts.map((post) => ({
      loc: new URL(`/blog/${post.slug}/`, site).toString(),
      lastmod: (post.data.updatedDate ?? post.data.pubDate).toISOString(),
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>\n    <loc>${url.loc}</loc>${url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ''}\n  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
