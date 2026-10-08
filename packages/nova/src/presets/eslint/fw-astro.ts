import * as astroParser from 'astro-eslint-parser';
import astroPlugin from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import type { Presets_Eslint_FwAstro_Config } from '../../types/presets/eslint/fw-astro.d.ts';

/**
 * Presets - ESLint - FW Astro - Config.
 *
 * Integrates Astro's parser, processor, framework globals, and recommended
 * correctness rules without importing Astro's complete opinionated preset.
 *
 * @since 0.21.0
 */
const config: Presets_Eslint_FwAstro_Config = [
  {
    name: 'nova/fw-astro/ignored-files',
    ignores: ['**/.astro/**'],
  },
  {
    name: 'nova/fw-astro/components',
    files: ['**/*.astro'],
    languageOptions: {
      globals: {
        ...globals.node,
        Astro: 'readonly',
        Fragment: 'readonly',
      },
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
      },
      sourceType: 'module',
    },
    plugins: {
      astro: astroPlugin,
    },
    processor: astroPlugin.processors['astro'],
    rules: {
      'astro/missing-client-only-directive-value': ['error'],
      'astro/no-conflict-set-directives': ['error'],
      'astro/no-deprecated-astro-canonicalurl': ['error'],
      'astro/no-deprecated-astro-fetchcontent': ['error'],
      'astro/no-deprecated-astro-resolve': ['error'],
      'astro/no-deprecated-getentrybyslug': ['error'],
      'astro/no-unused-define-vars-in-style': ['error'],
      'astro/valid-compile': ['error'],
    },
  },
];

export default config;
