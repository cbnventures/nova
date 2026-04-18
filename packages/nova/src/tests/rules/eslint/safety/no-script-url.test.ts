import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoScriptUrl } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintSafetyNoScriptUrlRuleTester } from '../../../../types/tests/rules/eslint/safety/no-script-url.test.d.ts';

/**
 * Tests - Rules - ESLint - Safety - No Script URL.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintSafetyNoScriptUrlRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noScriptUrl', NoScriptUrl['rule'], {
  valid: [
    {
      code: 'const href = "javascript:void(0)";',
      options: [{
        allowedPatterns: ['javascript:void(0)'],
        ignoreFiles: [],
      }],
    },
    {
      code: 'const href = "#";',
    },
    {
      code: 'const href = "/some-path";',
    },
    {
      code: 'const count = 42;',
    },
    {
      code: 'const text = "This is a javascript tutorial.";',
    },
    {
      code: 'const href = "javascript:alert(\'XSS\')";',
      options: [{
        allowedPatterns: ['javascript:void(0)'], ignoreFiles: ['ignored.ts'],
      }],
      filename: '/path/to/ignored.ts',
    },
  ],
  invalid: [
    {
      code: 'const href = "javascript:alert(\'XSS\')";',
      errors: [{ messageId: 'noScriptUrl' }],
    },
    {
      code: 'const href = "javascript:doSomething()";',
      errors: [{ messageId: 'noScriptUrl' }],
    },
    {
      code: 'const href = "javascript:history.back()";',
      errors: [{ messageId: 'noScriptUrl' }],
    },
    {
      code: 'const href = "JavaScript:void(1)";',
      errors: [{ messageId: 'noScriptUrl' }],
    },
  ],
});
