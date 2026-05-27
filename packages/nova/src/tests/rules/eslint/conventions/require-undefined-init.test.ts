import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireUndefinedInit } from '../../../../rules/eslint/index.js';

import type { Tests_Rules_Eslint_Conventions_RequireUndefinedInit_RuleTester } from '../../../../types/tests/rules/eslint/conventions/require-undefined-init.test.d.ts';

/**
 * Tests - Rules - ESLint - Conventions - Require Undefined Init.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: Tests_Rules_Eslint_Conventions_RequireUndefinedInit_RuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireUndefinedInit', RequireUndefinedInit['rule'], {
  valid: [
    {
      code: 'let name = undefined;',
    },
    {
      code: 'let count = 0;',
    },
    {
      code: 'const items = [];',
    },
    {
      code: 'let name = "default";',
    },
    {
      code: 'for (const item of items) {}',
    },
    {
      code: 'for (const key in obj) {}',
    },
    {
      code: 'let name;',
      options: [{ ignoreFiles: ['ignored-file.ts'] }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: 'let name;',
      output: 'let name = undefined;',
      errors: [{ messageId: 'requireUndefinedInit' }],
    },
    {
      code: 'let count;',
      output: 'let count = undefined;',
      errors: [{ messageId: 'requireUndefinedInit' }],
    },
    {
      code: 'let user;',
      output: 'let user = undefined;',
      errors: [{ messageId: 'requireUndefinedInit' }],
    },
  ],
});
