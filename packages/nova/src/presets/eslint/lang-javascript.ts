import tseslint from 'typescript-eslint';

import type { Presets_Eslint_LangJavascript_Config } from '../../types/presets/eslint/lang-javascript.d.ts';

/**
 * Presets - ESLint - Lang JavaScript - Config.
 *
 * Enables the typescript-eslint parser for all JS and JSX files so Nova
 * custom rules can run without requiring JavaScript files in a TSConfig.
 *
 * @since 0.11.0
 */
const config: Presets_Eslint_LangJavascript_Config = [
  {
    name: 'nova/lang-javascript',
    files: [
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: false,
      },
    },
  },
  {
    name: 'nova/lang-javascript/overrides',
    files: [
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    rules: {
      // Disable the TypeScript-aware unused-vars rule for JS files since the standard rule handles it.
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];

export default config;
