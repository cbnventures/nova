import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoUseBeforeDefine } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintPatternsNoUseBeforeDefineRuleTester } from '../../../../types/tests/rules/eslint/patterns/no-use-before-define.test.d.ts';

/**
 * Tests - Rules - ESLint - Patterns - No Use Before Define.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintPatternsNoUseBeforeDefineRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noUseBeforeDefine', NoUseBeforeDefine['rule'], {
  valid: [
    {
      code: 'const y = 5; const x = y + 1;',
    },
    {
      code: [
        'function apple() { banana(); }',
        'function banana() { cherry(); }',
        'function cherry() { return "done"; }',
      ].join('\n'),
      options: [{
        classes: true,
        functions: false,
        ignoreFiles: [],
        types: true,
        variables: true,
      }],
    },
    {
      code: 'let name = "Alice"; console.log(name);',
    },
    {
      code: 'const items = [1, 2]; const first = items[0];',
    },
    {
      code: 'const x = y + 1; const y = 5;',
      options: [{
        ignoreFiles: ['ignored-file.ts'],
        variables: true,
        functions: false,
        classes: false,
        types: false,
      }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: 'const x = y + 1; const y = 5;',
      errors: [{ messageId: 'noUseBeforeDefine' }],
    },
    {
      code: 'console.log(name); let name = "Alice";',
      errors: [{ messageId: 'noUseBeforeDefine' }],
    },
    {
      code: [
        'function apple() { banana(); }',
        'function banana() { return "done"; }',
      ].join('\n'),
      errors: [{ messageId: 'noUseBeforeDefine' }],
    },
  ],
});
