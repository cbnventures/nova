import cloudflare from '@astrojs/cloudflare';
import { defineConfig } from 'astro/config';

/**
 * Astro - Config.
 *
 * Configures Cloudflare server rendering.
 * Keeps generated output in Nova's standard build directory.
 *
 * @since 0.0.0
 */
const config = defineConfig({
  adapter: cloudflare(),
  outDir: './build',
  output: 'server',
});

export default config;
