import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoComplexArrowConcise } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintFormattingNoComplexArrowConciseRuleTester } from '../../../../types/tests/rules/eslint/formatting/no-complex-arrow-concise.test.d.ts';

/**
 * Tests - Rules - ESLint - Formatting - No Complex Arrow Concise.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintFormattingNoComplexArrowConciseRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noComplexArrowConcise', NoComplexArrowConcise['rule'], {
  valid: [
    {
      code: 'const doubled = items.map((n) => n * 2);',
    },
    {
      code: 'const names = users.map((user) => user.name);',
    },
    {
      code: 'const isValid = (x) => x > 0;',
    },
    {
      code: 'const upper = (s) => s.trim().toUpperCase();',
    },
    {
      code: 'const names = (items) => items.map((item) => item.name);',
    },
    {
      code: 'const names = (items) => { return items.filter((item) => item.active).map((item) => item.name); };',
    },
    {
      code: 'const names = (items) => items.filter((item) => item.active).map((item) => item.name);',
      options: [{
        ignoreFiles: ['ignored-file.ts'], maxNestedArrows: 1, maxChainLength: 2,
      }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: 'const names = (items) => items.filter((item) => item.active).map((item) => item.name);',
      errors: [{ messageId: 'tooManyNestedArrows' }],
    },
    {
      code: 'const slug = (input) => input.trim().toLowerCase().split(" ");',
      errors: [{ messageId: 'tooLongChain' }],
    },
  ],
});
