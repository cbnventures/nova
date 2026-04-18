import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireTernaryParens } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintFormattingRequireTernaryParensRuleTester } from '../../../../types/tests/rules/eslint/formatting/require-ternary-parens.test.d.ts';

/**
 * Tests - Rules - ESLint - Formatting - Require Ternary Parens.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintFormattingRequireTernaryParensRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireTernaryParens', RequireTernaryParens['rule'], {
  valid: [
    {
      code: 'const x = (a === true) ? 1 : 0;',
    },
    {
      code: 'const x = (a > b) ? "yes" : "no";',
    },
    {
      code: 'const x = (a === true && b === false) ? 1 : 0;',
    },
    {
      code: 'const x = a ? 1 : 0;',
      options: [{ ignoreFiles: ['ignored-file.ts'] }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: 'const x = a ? 1 : 0;',
      output: 'const x = (a) ? 1 : 0;',
      errors: [{ messageId: 'requireTernaryParens' }],
    },
    {
      code: 'const x = a === true ? 1 : 0;',
      output: 'const x = (a === true) ? 1 : 0;',
      errors: [{ messageId: 'requireTernaryParens' }],
    },
    {
      code: 'const x = a > b ? "yes" : "no";',
      output: 'const x = (a > b) ? "yes" : "no";',
      errors: [{ messageId: 'requireTernaryParens' }],
    },
  ],
});
