import globals from 'globals';

import type { Presets_Eslint_RuntimeCloudflareWorkers_Config } from '../../types/presets/eslint/runtime-cloudflare-workers.d.ts';

/**
 * Presets - ESLint - Runtime Cloudflare Workers - Config.
 *
 * Declares the Worker runtime globals available to Cloudflare Worker source
 * files. Project-specific bindings remain typed by the consumer.
 *
 * @since 0.11.0
 */
const config: Presets_Eslint_RuntimeCloudflareWorkers_Config = [{
  name: 'nova/runtime-cloudflare-workers',
  files: [
    '**/*.js',
    '**/*.ts',
    '**/*.mjs',
    '**/*.mts',
  ],
  languageOptions: {
    globals: globals.worker,
  },
}];

export default config;
