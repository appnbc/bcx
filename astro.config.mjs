import { defineConfig } from 'astro/config';

// On GitHub Pages the workflow sets SITE_URL and BASE_PATH (e.g. "/portfolio" for a project repo).
// Locally both are unset and the site is served from the root.
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || '/',
  outDir: process.env.OUT_DIR || './dist',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
