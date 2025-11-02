import {
  dxCodeStyle,
  dxIgnore,
  envNode,
  langTypescript,
} from './src/presets/eslint/index.mjs';
import { noLoggerDev } from './src/rules/eslint/index.js';

export default [
  ...dxIgnore,
  ...dxCodeStyle,
  ...langTypescript,
  ...envNode,
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
