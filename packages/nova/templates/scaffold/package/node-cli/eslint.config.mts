import {
  dxCodeStyle,
  dxIgnore,
  langJavascript,
  langTypescript,
  runtimeNode,
} from '@cbnventures/nova/presets/eslint';
import { novaRules } from '@cbnventures/nova/rules/eslint';

/**
 * ESLint Configuration.
 *
 * Composes Nova's Node.js and TypeScript contracts for the CLI.
 *
 * @since 0.0.0
 */
export default [
  ...dxIgnore,
  ...dxCodeStyle,
  ...langJavascript,
  ...langTypescript,
  ...runtimeNode,
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
          './tsconfig.source.json',
          './tsconfig.config.json',
          './tsconfig.tests.json',
        ],
      },
    },
  },
  ...novaRules,
  {
    name: 'source-entrypoint-overrides',
    files: ['src/index.ts'],
    rules: {
      'n/hashbang': 'off',
    },
  },
];
