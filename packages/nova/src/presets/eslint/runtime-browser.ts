import globals from 'globals';

import type { Presets_Eslint_RuntimeBrowser_Config } from '../../types/presets/eslint/runtime-browser.d.ts';

/**
 * Presets - ESLint - Runtime Browser - Config.
 *
 * Declares the standard browser runtime globals for JavaScript and TypeScript
 * sources without changing Nova's language or style rules.
 *
 * @since 0.11.0
 */
const config: Presets_Eslint_RuntimeBrowser_Config = [{
  name: 'nova/runtime-browser',
  files: [
    '**/*.js',
    '**/*.ts',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.mjs',
    '**/*.mts',
  ],
  languageOptions: {
    globals: globals.browser,
  },
}];

export default config;
