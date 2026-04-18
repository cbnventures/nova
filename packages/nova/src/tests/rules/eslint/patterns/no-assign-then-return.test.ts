import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoAssignThenReturn } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintPatternsNoAssignThenReturnRuleTester } from '../../../../types/tests/rules/eslint/patterns/no-assign-then-return.test.d.ts';

/**
 * Tests - Rules - ESLint - Patterns - No Assign Then Return.
 *
 * @since 0.14.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintPatternsNoAssignThenReturnRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noAssignThenReturn', NoAssignThenReturn['rule'], {
  valid: [
    {
      code: 'function f() { return items.filter((item) => item > 0); }',
    },
    {
      code: 'function f() { const filtered = items.filter((item) => item > 0); doSomething(filtered); return filtered; }',
    },
    {
      code: 'function f() { let result = 0; result = 1; return result; }',
    },
    {
      code: 'function f() { const filtered = items.filter((item) => item > 0); return filtered; }',
      options: [{ ignoreFiles: ['ignored-file.ts'] }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: 'function f() { const a = 1; const b = 2; return b; }',
      output: 'function f() { const a = 1;  return 2; }',
      errors: [{ messageId: 'returnDirectly' }],
    },
    {
      code: 'function f() { const filtered = items.filter((item) => item > 0); return filtered; }',
      output: 'function f() {  return items.filter((item) => item > 0); }',
      errors: [{ messageId: 'returnDirectly' }],
    },
    {
      code: 'function f() { const result = getValue(); return result; }',
      output: 'function f() {  return getValue(); }',
      errors: [{ messageId: 'returnDirectly' }],
    },
  ],
});
