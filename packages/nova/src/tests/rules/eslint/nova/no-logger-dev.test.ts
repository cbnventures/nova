import { test } from 'node:test';

import { RuleTester } from '@typescript-eslint/rule-tester';

import { noLoggerDev } from '@/rules/eslint/index.js';

/**
 * No logger dev.
 *
 * @since 1.0.0
 */
RuleTester.afterAll = () => {};
RuleTester.describe = test;
RuleTester.it = test;

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noLoggerDev', noLoggerDev, {
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
