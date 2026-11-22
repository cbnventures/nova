import {
  dxCodeStyle,
  dxIgnore,
  langJavascript,
  langTypescript,
  novaRules,
  runtimeNode,
} from '@cbnventures/nova/presets/eslint';

/**
 * ESLint Configuration.
 *
 * Lints the Node.js SPK tooling and its tests; DSM lifecycle scripts remain
 * portable POSIX shell sources.
 *
 * @since UNRELEASED
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
  {
    name: 'custom-javascript-rules',
    files: [
      '**/*.js',
      '**/*.mjs',
    ],
    rules: {
      '@cbnventures/nova/no-inline-type-annotation': 'off',
    },
  },
  {
    name: 'custom-dsm-desktop',
    files: ['src/ui/**/*.js'],
    languageOptions: {
      sourceType: 'script',
      globals: {
        _T: 'readonly',
        _TT: 'readonly',
        Ext: 'readonly',
        SYNO: 'readonly',
      },
    },
  },
  {
    name: 'custom-nova-rules',
    rules: {
      '@cbnventures/nova/no-regex-literals': [
        'error',
        {
          ignoreFiles: [],
          regexFile: './scripts/regex.mjs',
        },
      ],
    },
  },
];
