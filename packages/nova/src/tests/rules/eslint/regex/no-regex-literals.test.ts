import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoRegexLiterals } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintRegexNoRegexLiteralsRuleTester } from '../../../../types/tests/rules/eslint/regex/no-regex-literals.test.d.ts';

/**
 * Tests - Rules - ESLint - Regex - No Regex Literals.
 *
 * @since 0.13.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintRegexNoRegexLiteralsRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noRegexLiterals', NoRegexLiterals['rule'], {
  valid: [

    // Non-regex literal (string).
    {
      code: 'const x = "hello";',
    },

    // Non-regex literal (RegExp constructor).
    {
      code: 'new RegExp(PATTERN_SLUG, "g");',
    },

    // Regex literal in the designated regexFile.
    {
      code: 'const pattern = /test/;',
      options: [{
        ignoreFiles: [],
        regexFile: 'src/lib/regex.ts',
      }],
      filename: '/project/src/lib/regex.ts',
    },

    // Regex literal in an ignoreFiles entry.
    {
      code: 'const pattern = /test/;',
      options: [{
        ignoreFiles: ['allowed-file.ts'],
        regexFile: '',
      }],
      filename: 'allowed-file.ts',
    },

    // LAST: ignoreFiles test.
    {
      code: 'const pattern = /test/;',
      options: [{
        ignoreFiles: ['ignored-file.ts'],
        regexFile: '',
      }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [

    // Regex literal without regexFile configured.
    {
      code: 'const pattern = /hello/;',
      errors: [{ messageId: 'noRegexLiteralWithoutFile' }],
    },

    // Regex literal in match call without regexFile configured.
    {
      code: '"test".match(/pattern/);',
      errors: [{ messageId: 'noRegexLiteralWithoutFile' }],
    },

    // Regex literal with regexFile configured but in wrong file.
    {
      code: 'const pattern = /test/;',
      options: [{
        ignoreFiles: [],
        regexFile: 'src/lib/regex.ts',
      }],
      filename: 'not-regex-file.ts',
      errors: [{ messageId: 'noRegexLiteralWithFile' }],
    },

    // Regex literal with ignoreFiles but in wrong file.
    {
      code: 'const pattern = /test/;',
      options: [{
        ignoreFiles: ['other-file.ts'],
        regexFile: '',
      }],
      filename: 'not-allowed.ts',
      errors: [{ messageId: 'noRegexLiteralWithoutFile' }],
    },
  ],
});
