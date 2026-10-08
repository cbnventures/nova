import globals from 'globals';

import type { Presets_Eslint_RuntimeEdge_Config } from '../../types/presets/eslint/runtime-edge.d.ts';

/**
 * Presets - ESLint - Runtime Edge - Config.
 *
 * Declares Web Worker-compatible globals for edge runtimes without exposing
 * Node.js-only or browser-window-only APIs.
 *
 * @since 0.11.0
 */
const config: Presets_Eslint_RuntimeEdge_Config = [{
  name: 'nova/runtime-edge',
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
