import {
  strictEqual,
  throws,
} from 'node:assert/strict';
import {
  dirname,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';

import { RuleTester } from '@typescript-eslint/rule-tester';
import { Linter } from '@typescript-eslint/utils/ts-eslint';
import { afterAll, describe, it } from 'vitest';

import { NoRegexLiterals } from '../../../../rules/eslint/index.js';

import type {
  Tests_Rules_Eslint_Regex_NoRegexLiterals_NoRegexLiteralsConfiguration_AcceptsARelativeExistingFile_Messages,
  Tests_Rules_Eslint_Regex_NoRegexLiterals_NoRegexLiteralsConfiguration_KeepsAnEmptyPathQuiet_Messages,
  Tests_Rules_Eslint_Regex_NoRegexLiterals_NoRegexLiteralsConfiguration_RejectsAConfiguredDirectory_RegexFile,
  Tests_Rules_Eslint_Regex_NoRegexLiterals_NoRegexLiteralsConfiguration_RejectsAMissingConfiguredFile_RegexFile,
  Tests_Rules_Eslint_Regex_NoRegexLiterals_RegexFilePath,
  Tests_Rules_Eslint_Regex_NoRegexLiterals_RuleTester,
  Tests_Rules_Eslint_Regex_NoRegexLiterals_TestDirectory,
  Tests_Rules_Eslint_Regex_NoRegexLiterals_TestFilePath,
  Tests_Rules_Eslint_Regex_NoRegexLiterals_VerifyWithRegexFile_Linter,
  Tests_Rules_Eslint_Regex_NoRegexLiterals_VerifyWithRegexFile_RegexFile,
  Tests_Rules_Eslint_Regex_NoRegexLiterals_VerifyWithRegexFile_Returns,
} from '../../../../types/tests/rules/eslint/regex/no-regex-literals.test.d.ts';

/**
 * Tests - Rules - ESLint - Regex - No Regex Literals.
 *
 * @since 0.13.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const testFilePath: Tests_Rules_Eslint_Regex_NoRegexLiterals_TestFilePath = fileURLToPath(import.meta.url);
const testDirectory: Tests_Rules_Eslint_Regex_NoRegexLiterals_TestDirectory = dirname(testFilePath);
const regexFilePath: Tests_Rules_Eslint_Regex_NoRegexLiterals_RegexFilePath = resolve(testDirectory, '../../../../lib/regex.ts');

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
        regexFile: regexFilePath,
      }],
      filename: regexFilePath,
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
        regexFile: regexFilePath,
      }],
      filename: 'not-regex-file.ts',
      errors: [{ messageId: 'noRegexLiteralWithFile' }],
    },

    // Regex literal with regexFile configured but in wrong file.
    {
      code: 'const pattern = /test/;',
      options: [{
        ignoreFiles: [],
        regexFile: regexFilePath,
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

/**
 * Tests - Rules - ESLint - Regex - No Regex Literals - Verify With Regex File.
 *
 * Runs the rule through ESLint with a controlled working directory so configuration
 * path validation can be exercised independently from syntax violation reporting.
 *
 * @param {Tests_Rules_Eslint_Regex_NoRegexLiterals_VerifyWithRegexFile_RegexFile} regexFile - Regex file.
 *
 * @returns {Tests_Rules_Eslint_Regex_NoRegexLiterals_VerifyWithRegexFile_Returns}
 *
 * @since 0.26.0
 */
function verifyWithRegexFile(regexFile: Tests_Rules_Eslint_Regex_NoRegexLiterals_VerifyWithRegexFile_RegexFile): Tests_Rules_Eslint_Regex_NoRegexLiterals_VerifyWithRegexFile_Returns {
  const linter: Tests_Rules_Eslint_Regex_NoRegexLiterals_VerifyWithRegexFile_Linter = new Linter({
    configType: 'flat',
    cwd: testDirectory,
  });

  return linter.verify('const value = "text";', [{
    files: ['**/*.js'],
    plugins: {
      '@cbnventures/nova': {
        rules: {
          'no-regex-literals': NoRegexLiterals['rule'],
        },
      },
    },
    rules: {
      '@cbnventures/nova/no-regex-literals': [
        'error',
        {
          ignoreFiles: [],
          regexFile,
        },
      ],
    },
  }], {
    filename: 'source.js',
  });
}

/**
 * Tests - Rules - ESLint - Regex - No Regex Literals - NoRegexLiterals Configuration.
 *
 * @since 0.26.0
 */
describe('noRegexLiterals configuration', () => {
  it('keeps an empty path quiet', () => {
    const messages: Tests_Rules_Eslint_Regex_NoRegexLiterals_NoRegexLiteralsConfiguration_KeepsAnEmptyPathQuiet_Messages = verifyWithRegexFile('');

    strictEqual(messages.length, 0);

    return;
  });

  it('accepts a relative existing file', () => {
    const messages: Tests_Rules_Eslint_Regex_NoRegexLiterals_NoRegexLiteralsConfiguration_AcceptsARelativeExistingFile_Messages = verifyWithRegexFile('../../../../lib/regex.ts');

    strictEqual(messages.length, 0);

    return;
  });

  it('rejects a missing configured file', () => {
    const regexFile: Tests_Rules_Eslint_Regex_NoRegexLiterals_NoRegexLiteralsConfiguration_RejectsAMissingConfiguredFile_RegexFile = 'missing-regex.ts';

    throws(() => {
      verifyWithRegexFile(regexFile);

      return;
    });

    return;
  });

  it('rejects a configured directory', () => {
    const regexFile: Tests_Rules_Eslint_Regex_NoRegexLiterals_NoRegexLiteralsConfiguration_RejectsAConfiguredDirectory_RegexFile = '.';

    throws(() => {
      verifyWithRegexFile(regexFile);

      return;
    });

    return;
  });

  return;
});
