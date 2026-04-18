import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoBooleanVarForIf } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintPatternsNoBooleanVarForIfRuleTester } from '../../../../types/tests/rules/eslint/patterns/no-boolean-var-for-if.test.d.ts';

/**
 * Tests - Rules - ESLint - Patterns - No Boolean Var For If.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintPatternsNoBooleanVarForIfRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noBooleanVarForIf', NoBooleanVarForIf['rule'], {
  valid: [
    {
      code: [
        'if (a === true && b === false) {',
        '  doSomething();',
        '}',
      ].join('\n'),
    },
    {
      code: [
        'const isValid = a === true && b === false;',
        'console.log(isValid);',
        'if (isValid) {}',
      ].join('\n'),
    },
    {
      code: [
        'const isValid = getValue();',
        'if (isValid) {}',
      ].join('\n'),
    },
    {
      code: [
        'let isValid = a === true && b === false;',
        'if (isValid) {}',
      ].join('\n'),
    },
    {
      code: [
        'const isValid = a === true && b === false;',
        'if (isValid) {}',
      ].join('\n'),
      options: [{ ignoreFiles: ['ignored-file.ts'] }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: [
        'const isValid = a === true && b === false;',
        'if (isValid) {}',
      ].join('\n'),
      errors: [{ messageId: 'noBooleanVarForIf' }],
    },
    {
      code: [
        'const shouldProcess = x > 0 || y > 0;',
        'if (shouldProcess) {}',
      ].join('\n'),
      errors: [{ messageId: 'noBooleanVarForIf' }],
    },
  ],
});
