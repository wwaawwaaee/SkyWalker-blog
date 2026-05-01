import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeImageFigures from './src/lib/rehype-image-figures.mjs';

export default defineConfig({
  site: 'https://sky.axono.org',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeImageFigures],
  },
});
