import { test } from 'node:test';

import { RuleTester } from '@typescript-eslint/rule-tester';

import { noTernaryInTemplateLiteral } from '@/rules/eslint/index.js';

/**
 * No ternary in template literal.
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

ruleTester.run('noTernaryInTemplateLiteral', noTernaryInTemplateLiteral, {
  valid: [
    {
      code: '`text ${label}`;',
    },
    {
      code: '`text ${fn()}`;',
    },
    {
      code: '`plain text`;',
    },
    {
      code: '`text ${a + b}`;',
    },
  ],
  invalid: [
    {
      code: '`text ${x ? \'a\' : \'b\'}`;',
      errors: [{ messageId: 'noTernaryInTemplate' }],
    },
    {
      code: '`${a ? b : c} and ${d ? e : f}`;',
      errors: [
        { messageId: 'noTernaryInTemplate' },
        { messageId: 'noTernaryInTemplate' },
      ],
    },
  ],
});
