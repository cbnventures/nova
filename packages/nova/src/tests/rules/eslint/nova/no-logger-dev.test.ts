import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoLoggerDev } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintNovaNoLoggerDevRuleTester } from '../../../../types/tests/rules/eslint/nova/no-logger-dev.test.d.ts';

/**
 * Tests - Rules - ESLint - Nova - No Logger Dev.
 *
 * @since 0.13.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintNovaNoLoggerDevRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noLoggerDev', NoLoggerDev['rule'], {
  valid: [
    {
      code: 'Logger.info("hello");',
    },
    {
      code: 'Logger.debug("hello");',
    },
    {
      code: 'Logger.warn("hello");',
    },
    {
      code: 'Logger.error("hello");',
    },
    {
      code: 'Logger.customize({ name: "test" }).info("hello");',
    },
    {
      code: 'Logger.customize({ name: "test" }).debug("hello");',
    },
    {
      code: 'someObject.dev("not a logger");',
    },
    {
      code: 'other.dev();',
    },
    {
      code: 'Logger.dev("debug message");',
      options: [{ ignoreFiles: ['ignored.ts'] }],
      filename: '/path/to/ignored.ts',
    },
  ],
  invalid: [
    {
      code: 'Logger.dev("debug message");',
      errors: [{ messageId: 'removeDev' }],
    },
    {
      code: 'Logger.customize({ name: "test" }).dev("debug");',
      errors: [{ messageId: 'removeDev' }],
    },
    {
      code: 'const log = Logger.customize({ name: "test" }); log.dev("debug");',
      errors: [{ messageId: 'removeDev' }],
    },
  ],
});
