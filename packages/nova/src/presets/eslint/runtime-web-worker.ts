import globals from 'globals';

import type { Presets_Eslint_RuntimeWebWorker_Config } from '../../types/presets/eslint/runtime-web-worker.d.ts';

/**
 * Presets - ESLint - Runtime Web Worker - Config.
 *
 * Declares Web Worker globals for JavaScript and TypeScript sources.
 * Runtime-specific application rules remain owned by the consumer.
 *
 * @since 0.11.0
 */
const config: Presets_Eslint_RuntimeWebWorker_Config = [{
  name: 'nova/runtime-web-worker',
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
