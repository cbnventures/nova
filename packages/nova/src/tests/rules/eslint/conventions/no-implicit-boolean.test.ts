import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoImplicitBoolean } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintConventionsNoImplicitBooleanRuleTester } from '../../../../types/tests/rules/eslint/conventions/no-implicit-boolean.test.d.ts';

/**
 * Tests - Rules - ESLint - Conventions - No Implicit Boolean.
 *
 * @since 0.14.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintConventionsNoImplicitBooleanRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noImplicitBoolean', NoImplicitBoolean['rule'], {
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
    {
      code: 'if (await pathExists(p) === true) {}',
    },
    {
      code: 'const result = items.includes(x) === false;',
    },
    {
      code: 'arr.filter((item) => item.active === false);',
    },
    {
      code: 'if (value) {}',
      options: [{ ignoreFiles: ['ignored-file.ts'] }],
      filename: '/path/to/ignored-file.ts',
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
    {
      code: 'if (await pathExists(p)) {}',
      errors: [{ messageId: 'requireExplicitCheck' }],
    },
    {
      code: 'if (!await pathExists(p)) {}',
      errors: [{ messageId: 'requireExplicitCheck' }],
    },
    {
      code: 'const result = !items.includes(x);',
      errors: [{ messageId: 'requireExplicitCheck' }],
    },
    {
      code: 'arr.filter((item) => !item.active);',
      errors: [{ messageId: 'requireExplicitCheck' }],
    },
    {
      code: 'return !getValue();',
      errors: [{ messageId: 'requireExplicitCheck' }],
    },
  ],
});
