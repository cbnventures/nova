import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireMultilineConditions } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintFormattingRequireMultilineConditionsRuleTester } from '../../../../types/tests/rules/eslint/formatting/require-multiline-conditions.test.d.ts';

/**
 * Tests - Rules - ESLint - Formatting - Require Multiline Conditions.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintFormattingRequireMultilineConditionsRuleTester = new RuleTester({
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
      code: [
        'const result =',
        '  a === true',
        '  && b === false',
        '  && c === true;',
      ].join('\n'),
    },
    {
      code: 'const x = a ?? b;',
    },
    {
      code: [
        'const x =',
        '  a',
        '  ?? b',
        '  ?? c;',
      ].join('\n'),
    },
    {
      code: 'if (a === true && b === false && c === true) {}',
      options: [{
        ignoreFiles: ['ignored-file.ts'], maxInline: 2,
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
      code: 'return a === true || b === false || c === true;',
      errors: [{ messageId: 'requireMultiline' }],
    },
    {
      code: 'const x = a === true && b === false && c === true;',
      errors: [{ messageId: 'requireMultiline' }],
    },
    {
      code: 'const y = a === true || b === false || c === true || d === false ? 1 : 0;',
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
    {
      code: 'const x = a ?? b ?? c;',
      errors: [{ messageId: 'requireMultiline' }],
    },
  ],
});
