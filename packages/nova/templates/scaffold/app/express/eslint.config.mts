import {
  dxCodeStyle,
  dxIgnore,
  fwExpressjs,
  langJavascript,
  langTypescript,
  runtimeNode,
} from '@cbnventures/nova/presets/eslint';
import { novaRules } from '@cbnventures/nova/rules/eslint';

/**
 * ESLint Configuration.
 *
 * Composes Nova's Node.js, TypeScript, and Express contracts.
 *
 * @since 0.0.0
 */
export default [
  ...dxIgnore,
  ...dxCodeStyle,
  ...langJavascript,
  ...langTypescript,
  ...fwExpressjs,
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
];
