import globals from 'globals';

import type { Presets_Eslint_RuntimeServiceWorker_Config } from '../../types/presets/eslint/runtime-service-worker.d.ts';

/**
 * Presets - ESLint - Runtime Service Worker - Config.
 *
 * Declares Service Worker globals for JavaScript and TypeScript sources.
 * Runtime-specific application rules remain owned by the consumer.
 *
 * @since 0.11.0
 */
const config: Presets_Eslint_RuntimeServiceWorker_Config = [{
  name: 'nova/runtime-service-worker',
  files: [
    '**/*.js',
    '**/*.ts',
    '**/*.mjs',
    '**/*.mts',
  ],
  languageOptions: {
    globals: globals.serviceworker,
  },
}];

export default config;
