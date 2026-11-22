import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoOptionalChaining } from '../../../../rules/eslint/index.js';

import type { Tests_Rules_Eslint_Syntax_NoOptionalChaining_RuleTester } from '../../../../types/tests/rules/eslint/syntax/no-optional-chaining.test.d.ts';

/**
 * Tests - Rules - ESLint - Syntax - No Optional Chaining.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: Tests_Rules_Eslint_Syntax_NoOptionalChaining_RuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noOptionalChaining', NoOptionalChaining['rule'], {
  valid: [
    {
      code: 'const name = user !== undefined ? user.name : undefined;',
    },
    {
      code: 'const name = inputName ?? "default";',
    },
    {
      code: 'const name = user?.name;',
      options: [{ ignoreFiles: ['ignored-file.ts'] }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [{
    code: 'const name = user?.name;',
    errors: [{ messageId: 'noOptionalChaining' }],
  }],
});
