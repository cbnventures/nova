import { test } from 'node:test';

import { RuleTester } from '@typescript-eslint/rule-tester';

import { noRegexLiteralFlags } from '@/rules/eslint/index.js';

/**
 * No regex literal flags.
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

ruleTester.run('noRegexLiteralFlags', noRegexLiteralFlags, {
  valid: [
    {
      code: 'const pattern = /hello/;',
    },
    {
      code: 'const pattern = /^test$/;',
    },
    {
      code: 'const pattern = /[a-z]/;',
    },
    {
      code: 'new RegExp(pattern, "g");',
    },
  ],
  invalid: [
    {
      code: 'const pattern = /hello/g;',
      errors: [{ messageId: 'noRegexFlags' }],
    },
    {
      code: 'const pattern = /hello/i;',
      errors: [{ messageId: 'noRegexFlags' }],
    },
    {
      code: 'const pattern = /hello/gi;',
      errors: [{ messageId: 'noRegexFlags' }],
    },
    {
      code: 'const pattern = /hello/m;',
      errors: [{ messageId: 'noRegexFlags' }],
    },
  ],
});
