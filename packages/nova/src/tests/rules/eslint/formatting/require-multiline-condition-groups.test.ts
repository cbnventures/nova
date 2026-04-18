import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireMultilineConditionGroups } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintFormattingRequireMultilineConditionGroupsRuleTester } from '../../../../types/tests/rules/eslint/formatting/require-multiline-condition-groups.test.d.ts';

/**
 * Tests - Rules - ESLint - Formatting - Require Multiline Condition Groups.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintFormattingRequireMultilineConditionGroupsRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireMultilineConditionGroups', RequireMultilineConditionGroups['rule'], {
  valid: [
    {
      code: [
        'if (',
        '  (',
        '    a',
        '    && b',
        '  )',
        '  || (',
        '    c',
        '    && d',
        '  )',
        ') {}',
      ].join('\n'),
    },
    {
      code: 'if (a && b && c) {}',
    },
    {
      code: 'if (a && b) {}',
    },
    {
      code: [
        'a || (',
        '  b',
        '  && c',
        ')',
      ].join('\n'),
    },
    {
      code: [
        'if (',
        '  (',
        '    a',
        '    && b',
        '  ) ||',
        '  (',
        '    c',
        '    && d',
        '  )',
        ') {}',
      ].join('\n'),
      options: [{
        ignoreFiles: [], groupStyle: 'operator-after-close',
      }],
    },
    {
      code: [
        'if (',
        '  (',
        '    a',
        '    && b',
        '  ) || (',
        '    c',
        '    && d',
        '  )',
        ') {}',
      ].join('\n'),
      options: [{
        ignoreFiles: [], groupStyle: 'operator-inline',
      }],
    },
    {
      code: 'if ((a && b) || (c && d)) {}',
      options: [{
        ignoreFiles: ['ignored-file.ts'], groupStyle: 'operator-before-open',
      }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: 'if ((a && b) || (c && d)) {}',
      errors: [
        { messageId: 'requireGroupMultiline' },
        { messageId: 'requireGroupMultiline' },
      ],
    },
    {
      code: [
        '(a && b)',
        '|| (',
        '  c',
        '  && d',
        ')',
      ].join('\n'),
      errors: [{ messageId: 'requireGroupMultiline' }],
    },
    {
      code: '(a && b && c) || d',
      errors: [{ messageId: 'requireGroupMultiline' }],
    },
    {
      code: [
        'if (',
        '  (',
        '    a',
        '    && b',
        '  ) || (',
        '    c',
        '    && d',
        '  )',
        ') {}',
      ].join('\n'),
      errors: [{ messageId: 'requireGroupStyle' }],
    },
    {
      code: [
        'if (',
        '  (',
        '    a',
        '    && b',
        '  )',
        '  || (',
        '    c',
        '    && d',
        '  )',
        ') {}',
      ].join('\n'),
      options: [{
        ignoreFiles: [], groupStyle: 'operator-after-close',
      }],
      errors: [{ messageId: 'requireGroupStyle' }],
    },
  ],
});
