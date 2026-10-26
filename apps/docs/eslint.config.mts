import {
  dxCodeStyle,
  dxIgnore,
  fwDocusaurus,
  langMdx,
  langTypescript,
  novaRules,
} from '@cbnventures/nova/presets/eslint';

/**
 * ESLint Configuration.
 *
 * @since 0.11.0
 */
export default [
  ...dxIgnore,
  ...dxCodeStyle,
  ...langMdx,
  ...langTypescript,
  ...fwDocusaurus,
  {
    name: 'custom-ignores',
    ignores: [],
  },
  {
    name: 'custom-tsconfig',
    languageOptions: {
      parserOptions: {
        project: [
          './tsconfig.app.json',
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
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      '**/*.mts',
    ],
    rules: {
      '@cbnventures/nova/no-regex-literals': [
        'error',
        {
          ignoreFiles: [],
          regexFile: './src/lib/regex.ts',
        },
      ],
      '@cbnventures/nova/require-jsdoc-body': [
        'error',
        {
          ignoreFiles: [
            './docusaurus.config.ts',
            './eslint.config.mts',
            './sidebars.ts',
            './vitest.config.mts',
          ],
          maxLines: 3,
          maxWidth: 90,
          minLines: 2,
          skipDirectories: [
            'styles',
            'tests',
            'types',
          ],
        },
      ],
      '@cbnventures/nova/require-jsdoc-hierarchy': [
        'error',
        {
          anchorDirectories: [
            'src',
            'utils',
          ],
          ignoreFiles: [
            './docusaurus.config.ts',
            './eslint.config.mts',
            './sidebars.ts',
            './vitest.config.mts',
            './vitest.setup.ts',
          ],
          knownNames: {},
          stripDirectories: ['types'],
        },
      ],
      '@cbnventures/nova/require-jsdoc-presence': [
        'error',
        {
          ignoreFiles: [
            './docusaurus.config.ts',
            './eslint.config.mts',
            './sidebars.ts',
            './vitest.config.mts',
          ],
          skipDirectories: [
            'tests',
            'types',
          ],
        },
      ],
      '@cbnventures/nova/require-kebab-case-filename': [
        'error',
        {
          extraExtensions: [],
          ignoreFiles: [
            './docusaurus.config.ts',
            './eslint.config.mts',
            './vitest.config.mts',
            './vitest.setup.ts',
          ],
        },
      ],
    },
  },
];
