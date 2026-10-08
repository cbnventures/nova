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
  outDir: './build',
  output: 'server',
});

export default config;
