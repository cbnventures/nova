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
 * @since 0.15.0
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
          './tsconfig.config.json',
          './tsconfig.plugin.json',
          './tsconfig.theme.json',
          './tsconfig.worker.json',
          './tsconfig.cli.json',
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
      '@cbnventures/nova/no-explicit-any': [
        'error',
        {
          ignoreFiles: ['src/types/theme/NavbarItem/index.d.ts'],
        },
      ],
      '@cbnventures/nova/no-regex-literals': [
        'error',
        {
          ignoreFiles: [],
          regexFile: './src/lib/regex.ts',
        },
      ],
      '@cbnventures/nova/no-shared-type-import': [
        'error',
        {
          ignoreFiles: [],
          sharedFiles: ['./src/types/shared.d.ts'],
        },
      ],
      '@cbnventures/nova/require-jsdoc-body': [
        'error',
        {
          ignoreFiles: [
            './eslint.config.mts',
            './vitest.config.mts',
          ],
          maxLines: 3,
          maxWidth: 90,
          minLines: 2,
          skipDirectories: [
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
            './eslint.config.mts',
            './vitest.config.mts',
            './vitest.setup.ts',
            './src/index.ts',
          ],
          knownNames: {},
          stripDirectories: ['types'],
        },
      ],
      '@cbnventures/nova/require-jsdoc-presence': [
        'error',
        {
          ignoreFiles: [
            './bin/theme-nova.mjs',
            './eslint.config.mts',
            './vitest.config.mts',
          ],
          skipDirectories: [
            'tests',
            'types',
          ],
        },
      ],
      '@cbnventures/nova/require-naming-convention': [
        'error',
        {
          classDeclaration: 'PascalCase',
          classMethod: 'camelCase',
          classProperty: 'camelCase',
          constant: 'UPPER_SNAKE_CASE',
          enum: 'PascalCase',
          enumMember: 'PascalCase',
          function: 'camelCase',
          ignoreFiles: ['./src/theme/Layout/Provider/index.tsx'],
          interface: 'PascalCase',
          parameter: 'camelCase',
          reactComponent: 'PascalCase',
          typeAlias: 'UnderscorePascalCase',
          variable: 'camelCase',
        },
      ],
    },
  },
];
