import {
  dxCodeStyle,
  dxIgnore,
  fwAstro,
  langJavascript,
  langTypescript,
  runtimeBrowser,
} from '@cbnventures/nova/presets/eslint';
import { novaRules } from '@cbnventures/nova/rules/eslint';

/**
 * ESLint Configuration.
 *
 * Composes Nova's browser, TypeScript, and Astro framework contracts.
 *
 * @since 0.0.0
 */
export default [
  ...dxIgnore,
  ...dxCodeStyle,
  ...langJavascript,
  ...langTypescript,
  ...fwAstro,
  ...runtimeBrowser,
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
        project: [
          './tsconfig.config.json',
          './tsconfig.tests.json',
        ],
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
            './astro.config.mjs',
            './eslint.config.mts',
            './vitest.config.mts',
          ],
        },
      ],
    },
  },
];
