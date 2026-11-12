import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://azola-krweqe.azola-krweqe.workers.dev',
  output: 'static',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
