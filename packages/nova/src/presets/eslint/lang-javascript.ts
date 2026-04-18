import tseslint from 'typescript-eslint';

import type { PresetsEslintLangJavascriptConfigConfig } from '../../types/presets/eslint/lang-javascript.d.ts';

/**
 * Presets - ESLint - Lang JavaScript - Config.
 *
 * Enables typescript-eslint parser for all JS and JSX files so
 * Nova custom rules can run on JavaScript sources with full AST support.
 *
 * @since 0.11.0
 */
const config: PresetsEslintLangJavascriptConfigConfig = [
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
        project: true,
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
