import { test } from 'node:test';

import { RuleTester } from '@typescript-eslint/rule-tester';

import { noAssignThenReturn } from '@/rules/eslint/index.js';

/**
 * No assign then return.
 *
 * @since 1.0.0
 */
RuleTester.afterAll = () => {};
RuleTester.describe = test;
RuleTester.it = test;

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noAssignThenReturn', noAssignThenReturn, {
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
      code: 'function f() { const a = 1; const b = 2; return b; }',
    },
  ],
  invalid: [
    {
      code: 'function f() { const filtered = items.filter((item) => item > 0); return filtered; }',
      errors: [{ messageId: 'returnDirectly' }],
    },
    {
      code: 'function f() { const result = getValue(); return result; }',
      errors: [{ messageId: 'returnDirectly' }],
    },
  ],
});
