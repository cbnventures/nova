import { test } from 'node:test';

import { RuleTester } from '@typescript-eslint/rule-tester';

import { noRawTextInCode } from '@/rules/eslint/index.js';

/**
 * No raw text in code.
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
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run('noRawTextInCode', noRawTextInCode, {
  valid: [
    {
      code: '<code>{"Array<string>"}</code>;',
    },
    {
      code: '<code>{variable}</code>;',
    },
    {
      code: '<span>raw text is fine here</span>;',
    },
    {
      code: '<div>raw text in div</div>;',
    },
    {
      code: '<pre>raw text in pre</pre>;',
    },
  ],
  invalid: [
    {
      code: '<code>raw text</code>;',
      errors: [{ messageId: 'noRawText' }],
    },
    {
      code: '<code>Array&lt;string&gt;</code>;',
      errors: [{ messageId: 'noRawText' }],
    },
  ],
});
