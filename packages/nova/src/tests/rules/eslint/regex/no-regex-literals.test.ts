import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoRegexLiterals } from '../../../../rules/eslint/index.js';

import type { Tests_Rules_Eslint_Regex_NoRegexLiterals_RuleTester } from '../../../../types/tests/rules/eslint/regex/no-regex-literals.test.d.ts';

/**
 * Tests - Rules - ESLint - Regex - No Regex Literals.
 *
 * @since 0.13.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: Tests_Rules_Eslint_Regex_NoRegexLiterals_RuleTester = new RuleTester({
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

    // RegExp constructor with a shared constant's source (allowed reference).
    {
      code: 'new RegExp(PATTERN_SLUG.source, "g");',
    },

    // RegExp constructor with a dynamic concatenated pattern (cannot be a static constant, allowed).
    {
      code: 'new RegExp("^" + PATTERN_SLUG + "$");',
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

    // RegExp constructor with an inline string pattern.
    {
      code: 'const pattern = new RegExp("^abc$");',
      errors: [{ messageId: 'noRegexLiteralWithoutFile' }],
    },

    // RegExp call (no new) with an inline string pattern.
    {
      code: 'const pattern = RegExp("^abc$");',
      errors: [{ messageId: 'noRegexLiteralWithoutFile' }],
    },

    // RegExp constructor with a static template pattern.
    {
      code: 'const pattern = new RegExp(`^abc$`);',
      errors: [{ messageId: 'noRegexLiteralWithoutFile' }],
    },

    // RegExp constructor inline string with regexFile configured but in wrong file.
    {
      code: 'const pattern = new RegExp("^abc$");',
      options: [{
        ignoreFiles: [],
        regexFile: 'src/lib/regex.ts',
      }],
      filename: 'not-regex-file.ts',
      errors: [{ messageId: 'noRegexLiteralWithFile' }],
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
