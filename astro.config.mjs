// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.eskewselectrical.com',
  output: 'static', // pages are prerendered; the contact API route opts out with `prerender = false`
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/api/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
