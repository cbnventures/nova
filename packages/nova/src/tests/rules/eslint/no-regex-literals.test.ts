import { test } from 'node:test';

import { RuleTester } from '@typescript-eslint/rule-tester';

import { noRegexLiterals } from '@/rules/eslint/index.js';

/**
 * No regex literals.
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

ruleTester.run('noRegexLiterals', noRegexLiterals, {
  valid: [
    {
      code: 'const x = "hello";',
    },
    {
      code: 'new RegExp(PATTERN_SLUG, "g");',
    },
    {
      code: 'const pattern = /test/;',
      options: [{ allowedFiles: ['allowed-file.ts'] }],
      filename: 'allowed-file.ts',
    },
    {
      code: 'const pattern = /test/;',
      options: [{ allowedFiles: ['src/lib/regex.ts'] }],
      filename: '/project/src/lib/regex.ts',
    },
  ],
  invalid: [
    {
      code: 'const pattern = /hello/;',
      errors: [{ messageId: 'noRegexLiteral' }],
    },
    {
      code: '"test".match(/pattern/);',
      errors: [{ messageId: 'noRegexLiteral' }],
    },
    {
      code: 'const pattern = /test/;',
      options: [{ allowedFiles: ['other-file.ts'] }],
      filename: 'not-allowed.ts',
      errors: [{ messageId: 'noRegexLiteral' }],
    },
  ],
});
