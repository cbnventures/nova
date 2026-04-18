import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireExplicitReturn } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintConventionsRequireExplicitReturnRuleTester } from '../../../../types/tests/rules/eslint/conventions/require-explicit-return.test.d.ts';

/**
 * Tests - Rules - ESLint - Conventions - Require Explicit Return.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintConventionsRequireExplicitReturnRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireExplicitReturn', RequireExplicitReturn['rule'], {
  valid: [
    {
      code: 'function greet(name) { console.log(name); return; }',
    },
    {
      code: 'const save = (user) => { db.insert(user); return; };',
    },
    {
      code: 'function add(a, b) { return a + b; }',
    },
    {
      code: 'const double = (n) => n * 2;',
    },
    {
      code: 'function empty() {}',
    },
    {
      code: 'const fn = () => {};',
    },
    {
      code: 'function poll() { while (true) { if (done) { return result; } } }',
    },
    {
      code: 'function find() { for (const item of items) { if (item.match) { return item; } } return null; }',
    },
    {
      code: 'function greet(name) { console.log(name); }',
      options: [{
        ignoreFiles: ['ignored-file.ts'],
        excludeArrowFunctions: false,
        excludeConstructors: false,
        excludeSetters: false,
      }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: 'function greet(name) { console.log(name); }',
      errors: [{ messageId: 'requireExplicitReturn' }],
    },
    {
      code: 'const save = (user) => { db.insert(user); };',
      errors: [{ messageId: 'requireExplicitReturn' }],
    },
    {
      code: 'const fn = function() { doWork(); };',
      errors: [{ messageId: 'requireExplicitReturn' }],
    },
  ],
});
