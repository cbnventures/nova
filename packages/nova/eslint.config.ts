import {
  dxCodeStyle,
  dxIgnore,
  envNode,
  langTypescript,
} from './src/presets/eslint/index.mjs';
import {
  noLoggerDev,
  noRegexLiteralFlags,
  noRegexLiterals,
  switchCaseBlocks,
} from './src/rules/eslint/index.js';

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
          'no-regex-literal-flags': noRegexLiteralFlags,
          'no-regex-literals': noRegexLiterals,
          'switch-case-blocks': switchCaseBlocks,
        },
      },
    },
    rules: {
      // Warn whenever "Logger.dev" is used so dev-only statements stay noisy and get removed before release.
      '@cbnventures/nova/no-logger-dev': ['warn'],

      // Ban flags on regex literals so callers choose flags at the call site via new RegExp(pattern, flags).
      '@cbnventures/nova/no-regex-literal-flags': ['error'],

      // Ban inline regex literals so patterns are centralized in a shared patterns file.
      '@cbnventures/nova/no-regex-literals': ['error', {
        allowedFiles: ['regex.ts'],
      }],

      // Enforce wrapping switch case bodies in braces to keep declarations scoped and avoid fallthrough surprises.
      '@cbnventures/nova/switch-case-blocks': ['error'],
    },
  },
];
