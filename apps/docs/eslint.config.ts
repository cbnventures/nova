import {
  dxCodeStyle,
  dxIgnore,
  fwDocusaurus,
  langMdx,
  langTypescript,
} from '@cbnventures/nova/presets/eslint';
import { noLoggerDev } from '@cbnventures/nova/rules/eslint';

export default [
  ...dxIgnore,
  ...dxCodeStyle,
  ...langMdx,
  ...langTypescript,
  ...fwDocusaurus,
  {
    name: 'custom-rules',
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      '**/*.mts',
    ],
    plugins: {
      '@cbnventures/nova': {
        rules: {
          'no-logger-dev': noLoggerDev,
        },
      },
    },
    rules: {
      // Warn whenever "Logger.dev" is used so dev-only statements stay noisy and get removed before release.
      '@cbnventures/nova/no-logger-dev': ['warn'],
    },
  },
];
