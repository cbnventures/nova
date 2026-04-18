import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoRawTextInCode } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintFormattingNoRawTextInCodeRuleTester } from '../../../../types/tests/rules/eslint/formatting/no-raw-text-in-code.test.d.ts';

/**
 * Tests - Rules - ESLint - Formatting - No Raw Text In Code.
 *
 * @since 0.13.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintFormattingNoRawTextInCodeRuleTester = new RuleTester({
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

ruleTester.run('noRawTextInCode', NoRawTextInCode['rule'], {
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
    {
      code: '<code>raw text</code>;',
      options: [{ ignoreFiles: ['ignored-file.tsx'] }],
      filename: '/path/to/ignored-file.tsx',
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
