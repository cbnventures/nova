import { test } from 'node:test';

import { RuleTester } from '@typescript-eslint/rule-tester';

import { noImplicitBoolean } from '@/rules/eslint/index.js';

/**
 * No implicit boolean.
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

ruleTester.run('noImplicitBoolean', noImplicitBoolean, {
  valid: [
    {
      code: 'if (value !== undefined) {}',
    },
    {
      code: 'if (Array.isArray(x) === false) {}',
    },
    {
      code: '(isDryRun === true) ? a : b;',
    },
    {
      code: 'if (a !== undefined && b === true) {}',
    },
    {
      code: 'while (items.length > 0) {}',
    },
    {
      code: 'if (fn() === false) {}',
    },
  ],
  invalid: [
    {
      code: 'if (value) {}',
      errors: [{ messageId: 'requireExplicitCheck' }],
    },
    {
      code: 'if (!value) {}',
      errors: [{ messageId: 'requireExplicitCheck' }],
    },
    {
      code: 'while (items.length) {}',
      errors: [{ messageId: 'requireExplicitCheck' }],
    },
    {
      code: 'if (value && other) {}',
      errors: [
        { messageId: 'requireExplicitCheck' },
        { messageId: 'requireExplicitCheck' },
      ],
    },
    {
      code: 'do {} while (flag)',
      errors: [{ messageId: 'requireExplicitCheck' }],
    },
    {
      code: 'if (!Array.isArray(x)) {}',
      errors: [{ messageId: 'requireExplicitCheck' }],
    },
    {
      code: '(isDryRun) ? a : b;',
      errors: [{ messageId: 'requireExplicitCheck' }],
    },
    {
      code: 'if (!fn()) {}',
      errors: [{ messageId: 'requireExplicitCheck' }],
    },
    {
      code: 'if (getValue()) {}',
      errors: [{ messageId: 'requireExplicitCheck' }],
    },
  ],
});
