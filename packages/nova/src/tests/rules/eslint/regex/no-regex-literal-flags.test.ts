import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoRegexLiteralFlags } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintRegexNoRegexLiteralFlagsRuleTester } from '../../../../types/tests/rules/eslint/regex/no-regex-literal-flags.test.d.ts';

/**
 * Tests - Rules - ESLint - Regex - No Regex Literal Flags.
 *
 * @since 0.13.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintRegexNoRegexLiteralFlagsRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noRegexLiteralFlags', NoRegexLiteralFlags['rule'], {
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
    {
      code: 'const pattern = /hello/g;',
      options: [{ ignoreFiles: ['ignored.ts'] }],
      filename: '/path/to/ignored.ts',
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
