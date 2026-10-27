import node from '@astrojs/node';
import { defineConfig } from 'astro/config';

/**
 * Astro - Config.
 *
 * Configures standalone Node.js server rendering.
 * Keeps generated output in Nova's standard build directory.
 *
 * @since 0.0.0
 */
const config = defineConfig({
  adapter: node({
    mode: 'standalone',
  }),
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  outDir: './build',
  output: 'server',
});

export default config;
