import {
  dxCodeStyle,
  dxIgnore,
  langTypescript,
  runtimeNode,
} from './src/presets/eslint/index.js';
import { novaRules } from './src/rules/eslint/index.js';

/**
 * ESLint Configuration.
 *
 * @since 0.11.0
 */
export default [
  ...dxIgnore,
  ...dxCodeStyle,
  ...langTypescript,
  ...runtimeNode,
  {
    name: 'custom-ignores',
    ignores: ['./templates/**'],
  },
  {
    name: 'custom-tsconfig',
    languageOptions: {
      parserOptions: {
        project: [
          './tsconfig.config.json',
          './tsconfig.source.json',
          './tsconfig.tests.json',
        ],
      },
    },
  },
  ...novaRules,
  {
    name: 'custom-nova-rules',
    rules: {
      '@cbnventures/nova/no-multiline-strings': [
        'error',
        {
          allowEscapeSequences: false,
          ignoreFiles: [
            './src/tests/cli/utility/run-scripts.test.ts',
            './src/tests/cli/utility/transpile.test.ts',
            './src/tests/cli/utility/type-check.test.ts',
            './src/tests/lib/regex.test.ts',
            './src/tests/lib/utility.test.ts',
            './src/tests/rules/eslint/conventions/no-default-export-declaration.test.ts',
            './src/tests/rules/eslint/formatting/no-multiline-strings.test.ts',
            './src/tests/rules/eslint/formatting/require-padding-lines.test.ts',
            './src/tests/toolkit/cli-header.test.ts',
            './src/tests/toolkit/markdown-table.test.ts',
          ],
        },
      ],
      '@cbnventures/nova/no-regex-literals': [
        'error',
        {
          ignoreFiles: [],
          regexFile: './src/lib/regex.ts',
        },
      ],
      '@cbnventures/nova/no-rest-params': [
        'error',
        {
          allow: [],
          ignoreFiles: ['*/toolkit/logger.ts'],
        },
      ],
      '@cbnventures/nova/no-script-url': [
        'error',
        {
          allowedPatterns: [],
          ignoreFiles: [
            './src/rules/eslint/safety/no-script-url.ts',
            './src/tests/rules/eslint/safety/no-script-url.test.ts',
          ],
        },
      ],
      '@cbnventures/nova/no-shared-type-import': [
        'error',
        {
          ignoreFiles: [],
          sharedFiles: ['./src/types/shared.d.ts'],
        },
      ],
      '@cbnventures/nova/no-template-curly-in-string': [
        'error',
        {
          ignoreFiles: [
            './src/tests/rules/eslint/formatting/no-multiline-strings.test.ts',
            './src/tests/rules/eslint/formatting/no-ternary-in-template-literal.test.ts',
            './src/tests/rules/eslint/patterns/no-template-curly-in-string.test.ts',
          ],
        },
      ],
      '@cbnventures/nova/require-jsdoc-body': [
        'error',
        {
          diamond: true,
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
          ],
          knownNames: {},
          stripDirectories: ['types'],
        },
      ],
      '@cbnventures/nova/require-jsdoc-presence': [
        'error',
        {
          ignoreFiles: [
            './bin/nova.mjs',
            './eslint.config.mts',
            './vitest.config.mts',
            './vitest.setup.ts',
          ],
          skipDirectories: [
            'tests',
            'types',
          ],
        },
      ],
    },
  },
];
