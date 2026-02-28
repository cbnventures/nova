import {
  dxCodeStyle,
  dxIgnore,
  fwDocusaurus,
  langMdx,
  langTypescript,
} from '@cbnventures/nova/presets/eslint';
import {
  noLoggerDev,
  noRawTextInCode,
  noRegexLiteralFlags,
  noRegexLiterals,
  switchCaseBlocks,
} from '@cbnventures/nova/rules/eslint';

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
      '@cbnventures/nova/no-regex-literals': ['error'],

      // Enforce wrapping switch case bodies in braces to keep declarations scoped and avoid fallthrough surprises.
      '@cbnventures/nova/switch-case-blocks': ['error'],
    },
  },
  {
    name: 'custom-rules/mdx',
    files: [
      '**/*.mdx',
    ],
    plugins: {
      '@cbnventures/nova': {
        rules: {
          'no-raw-text-in-code': noRawTextInCode,
        },
      },
    },
    rules: {
      // Ban unwrapped text inside <code> elements to prevent MDX from parsing special characters as JSX.
      '@cbnventures/nova/no-raw-text-in-code': ['error'],
    },
  },
];
