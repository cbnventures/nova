import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireJsdocReturns } from '../../../../rules/eslint/index.js';

import type { Tests_Rules_Eslint_Jsdoc_RequireJsdocReturns_RuleTester } from '../../../../types/tests/rules/eslint/jsdoc/require-jsdoc-returns.test.d.ts';

/**
 * Tests - Rules - ESLint - JSDoc - Require JSDoc Returns.
 *
 * @since 0.21.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: Tests_Rules_Eslint_Jsdoc_RequireJsdocReturns_RuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireJsdocReturns', RequireJsdocReturns['rule'], {
  valid: [

    // Type-only @returns.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @returns {R}',
        ' */',
        'function foo() {}',
      ].join('\n'),
    },

    // Type-guard alias in @returns.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @returns {Foo_TypeGuard}',
        ' */',
        'function foo() {}',
      ].join('\n'),
    },

    // Generic type with commas in @returns.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @returns {Record<string, number>}',
        ' */',
        'function foo() {}',
      ].join('\n'),
    },

    // No @returns tag at all.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'class Foo {}',
      ].join('\n'),
    },

    // No JSDoc block.
    {
      code: 'class Foo {}',
    },

    // LAST: ignoreFiles skips an otherwise invalid @returns.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @returns {R} extra description',
        ' */',
        'function foo() {}',
      ].join('\n'),
      options: [{ ignoreFiles: ['ignored-file.ts'] }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [

    // @returns with a trailing description.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @returns {R} the result',
        ' */',
        'function foo() {}',
      ].join('\n'),
      errors: [{ messageId: 'returnsTypeOnly' }],
    },

    // @returns with a trailing period.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @returns {R}.',
        ' */',
        'function foo() {}',
      ].join('\n'),
      errors: [{ messageId: 'returnsTypeOnly' }],
    },

    // @returns without braces.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @returns void',
        ' */',
        'function foo() {}',
      ].join('\n'),
      errors: [{ messageId: 'returnsTypeOnly' }],
    },

    // Bare @returns with no type.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @returns',
        ' */',
        'function foo() {}',
      ].join('\n'),
      errors: [{ messageId: 'returnsTypeOnly' }],
    },
  ],
});
