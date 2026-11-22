import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireMultilineConditions } from '../../../../rules/eslint/index.js';

import type { Tests_Rules_Eslint_Formatting_RequireMultilineConditions_RuleTester } from '../../../../types/tests/rules/eslint/formatting/require-multiline-conditions.test.d.ts';

/**
 * Tests - Rules - ESLint - Formatting - Require Multiline Conditions.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: Tests_Rules_Eslint_Formatting_RequireMultilineConditions_RuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireMultilineConditions', RequireMultilineConditions['rule'], {
  valid: [
    {
      code: 'if (a === true && b === false) {}',
    },
    {
      code: 'if (a === true) {}',
    },
    {
      code: [
        'if (',
        '  a === true',
        '  && b === false',
        '  && c === true',
        ') {}',
      ].join('\n'),
    },
    {
      code: 'if (a === true && b === false && c === true) {}',
      options: [{
        ignoreFiles: ['ignored-file.ts'],
        maxInline: 2,
      }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: 'if (a === true && b === false && c === true) {}',
      errors: [{ messageId: 'requireMultiline' }],
    },
    {
      code: [
        'if (',
        '  a === true',
        '  && b === false && c === true',
        ') {}',
      ].join('\n'),
      errors: [{ messageId: 'requireMultiline' }],
    },
  ],
});
