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
 * Lints the Node.js helper that delegates lifecycle commands to Gradle.
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
          './tsconfig.scripts.json',
          './tsconfig.tests.json',
        ],
      },
    },
  },
  ...novaRules,
];
