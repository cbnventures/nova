import {
  dxCodeStyle,
  dxIgnore,
  langJavascript,
  langTypescript,
  runtimeBrowser,
  runtimeNode,
} from '@cbnventures/nova/presets/eslint';
import { novaRules } from '@cbnventures/nova/rules/eslint';

/**
 * ESLint Configuration.
 *
 * Composes Nova's Node.js and TypeScript contracts for the plugin.
 *
 * @since 0.0.0
 */
export default [
  ...dxIgnore,
  ...dxCodeStyle,
  ...langJavascript,
  ...langTypescript,
  ...runtimeNode,
  ...runtimeBrowser.map((config) => ({
    ...config,
    files: ['homebridge-ui/public/**/*.js'],
    name: 'custom-ui-browser',
  })),
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
