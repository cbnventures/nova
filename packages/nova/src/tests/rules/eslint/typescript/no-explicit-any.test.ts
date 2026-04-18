import tsParser from '@typescript-eslint/parser';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoExplicitAny } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintTypescriptNoExplicitAnyRuleTester } from '../../../../types/tests/rules/eslint/typescript/no-explicit-any.test.d.ts';

/**
 * Tests - Rules - ESLint - TypeScript - No Explicit Any.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintTypescriptNoExplicitAnyRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parser: tsParser,
  },
});

ruleTester.run('noExplicitAny', NoExplicitAny['rule'], {
  valid: [
    {
      code: 'const x: unknown = getValue();',
    },
    {
      code: 'const x: string = "hello";',
    },
    {
      code: 'function f(x: unknown): void {}',
    },
    {
      code: 'const items: string[] = [];',
    },
    {
      code: 'const x: any = getValue();',
      options: [{ ignoreFiles: ['ignored.ts'] }],
      filename: '/path/to/ignored.ts',
    },
  ],
  invalid: [
    {
      code: 'const x: any = getValue();',
      errors: [{ messageId: 'noExplicitAny' }],
    },
    {
      code: 'function f(x: any): void {}',
      errors: [{ messageId: 'noExplicitAny' }],
    },
    {
      code: 'const items: any[] = [];',
      errors: [{ messageId: 'noExplicitAny' }],
    },
    {
      code: 'function f(): any { return null; }',
      errors: [{ messageId: 'noExplicitAny' }],
    },
  ],
});
