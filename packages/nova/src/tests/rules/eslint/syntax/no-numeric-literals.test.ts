import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoNumericLiterals } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintSyntaxNoNumericLiteralsRuleTester } from '../../../../types/tests/rules/eslint/syntax/no-numeric-literals.test.d.ts';

/**
 * Tests - Rules - ESLint - Syntax - No Numeric Literals.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintSyntaxNoNumericLiteralsRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noNumericLiterals', NoNumericLiterals['rule'], {
  valid: [
    {
      code: 'const count = 42;',
    },
    {
      code: 'const ratio = 3.14;',
    },
    {
      code: 'const mask = parseInt("FF", 16);',
    },
    {
      code: 'const flags = parseInt("1010", 2);',
    },
    {
      code: 'const perms = parseInt("755", 8);',
    },
    {
      code: 'const mask = 0xFF;',
      options: [{
        ignoreFiles: [],
        allowHex: true,
        allowBinary: false,
        allowOctal: false,
      }],
    },
    {
      code: 'const flags = 0b1010;',
      options: [{
        ignoreFiles: [],
        allowHex: false,
        allowBinary: true,
        allowOctal: false,
      }],
    },
    {
      code: 'const perms = 0o755;',
      options: [{
        ignoreFiles: [],
        allowHex: false,
        allowBinary: false,
        allowOctal: true,
      }],
    },
    {
      code: 'const mask = 0xFF;',
      options: [{
        ignoreFiles: ['ignored-file.ts'],
        allowHex: false,
        allowBinary: false,
        allowOctal: false,
      }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: 'const mask = 0xFF;',
      errors: [{ messageId: 'noNumericLiteral' }],
    },
    {
      code: 'const flags = 0b1010;',
      errors: [{ messageId: 'noNumericLiteral' }],
    },
    {
      code: 'const perms = 0o755;',
      errors: [{ messageId: 'noNumericLiteral' }],
    },
    {
      code: 'const color = 0x1A2B3C;',
      errors: [{ messageId: 'noNumericLiteral' }],
    },
  ],
});
