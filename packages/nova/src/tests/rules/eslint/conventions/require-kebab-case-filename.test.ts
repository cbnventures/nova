import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireKebabCaseFilename } from '../../../../rules/eslint/index.js';

import type { Tests_Rules_Eslint_Conventions_RequireKebabCaseFilename_RuleTester } from '../../../../types/tests/rules/eslint/conventions/require-kebab-case-filename.test.d.ts';

/**
 * Tests - Rules - ESLint - Conventions - Require Kebab Case Filename.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: Tests_Rules_Eslint_Conventions_RequireKebabCaseFilename_RuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireKebabCaseFilename', RequireKebabCaseFilename['rule'], {
  valid: [
    {
      code: 'const x = 1;',
      filename: '/path/to/my-component.ts',
    },
    {
      code: 'const x = 1;',
      filename: '/path/to/index.ts',
    },
    {
      code: 'const x = 1;',
      filename: '/path/to/my-utils.test.ts',
    },
    {
      code: 'const x = 1;',
      filename: '/path/to/my-types.d.ts',
    },
    {
      code: 'const x = 1;',
      filename: '/path/to/config.mjs',
    },
    {
      code: 'const x = 1;',
      filename: '/path/to/MyComponent.ts',
      options: [{
        extraExtensions: [], ignoreFiles: ['MyComponent.ts'],
      }],
    },
    {
      code: 'const x = 1;',
      filename: '/path/to/my-component.vue',
      options: [{
        extraExtensions: ['.vue'], ignoreFiles: [],
      }],
    },
  ],
  invalid: [
    {
      code: 'const x = 1;',
      filename: '/path/to/MyComponent.ts',
      errors: [{ messageId: 'requireKebabCase' }],
    },
    {
      code: 'const x = 1;',
      filename: '/path/to/my_component.ts',
      errors: [{ messageId: 'requireKebabCase' }],
    },
    {
      code: 'const x = 1;',
      filename: '/path/to/myComponent.tsx',
      errors: [{ messageId: 'requireKebabCase' }],
    },
    {
      code: 'const x = 1;',
      filename: '/path/to/MyComponent.vue',
      options: [{
        extraExtensions: ['.vue'], ignoreFiles: [],
      }],
      errors: [{ messageId: 'requireKebabCase' }],
    },
  ],
});
