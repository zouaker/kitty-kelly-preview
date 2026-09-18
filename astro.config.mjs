import { defineConfig } from 'astro/config';
export default defineConfig({
 output: 'static',
 trailingSlash: 'always',
 site: process.env.PUBLIC_SITE_URL || 'https://zouaker.github.io',
 base: process.env.PUBLIC_BASE_PATH || '/',
});

