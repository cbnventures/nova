import {
  dxCodeStyle,
  dxIgnore,
  langJavascript,
  langTypescript,
  runtimeBrowser,
  toolVite,
} from '@cbnventures/nova/presets/eslint';
import { novaRules } from '@cbnventures/nova/rules/eslint';

import frameworkPreset from './config/eslint-framework.mts';

/**
 * ESLint Configuration.
 *
 * Composes Nova's browser, TypeScript, and Vite tool contracts.
 *
 * @since 0.0.0
 */
export default [
  ...dxIgnore,
  ...dxCodeStyle,
  ...langJavascript,
  ...langTypescript,
  ...runtimeBrowser,
  ...toolVite,
  ...frameworkPreset,
  {
    name: 'custom-tsconfig',
    files: [
      '**/*.cts',
      '**/*.mts',
      '**/*.ts',
      '**/*.tsx',
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  },
  ...novaRules,
  {
    name: 'custom-nova-rules',
    files: [
      '**/*.cjs',
      '**/*.cts',
      '**/*.js',
      '**/*.jsx',
      '**/*.mjs',
      '**/*.mts',
      '**/*.ts',
      '**/*.tsx',
    ],
    rules: {
      '@cbnventures/nova/require-kebab-case-filename': [
        'error',
        {
          extraExtensions: [],
          ignoreFiles: [
            './eslint.config.mts',
            './svelte.config.js',
            './vite.config.mts',
            './vitest.config.mts',
          ],
        },
      ],
    },
  },
];
