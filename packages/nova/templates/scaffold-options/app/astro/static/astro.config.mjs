import { defineConfig } from 'astro/config';

/**
 * Astro - Config.
 *
 * Configures a static Astro application.
 * Keeps generated output in Nova's standard build directory.
 *
 * @since 0.0.0
 */
const config = defineConfig({
  outDir: './build',
  output: 'static',
});

export default config;
