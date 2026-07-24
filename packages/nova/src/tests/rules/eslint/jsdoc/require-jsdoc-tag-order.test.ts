import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireJsdocTagOrder } from '../../../../rules/eslint/index.js';

import type { Tests_Rules_Eslint_Jsdoc_RequireJsdocTagOrder_RuleTester } from '../../../../types/tests/rules/eslint/jsdoc/require-jsdoc-tag-order.test.d.ts';

/**
 * Tests - Rules - ESLint - JSDoc - Require JSDoc Tag Order.
 *
 * @since 0.21.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: Tests_Rules_Eslint_Jsdoc_RequireJsdocTagOrder_RuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireJsdocTagOrder', RequireJsdocTagOrder['rule'], {
  valid: [

    // Canonical private method: @param group, @private, @returns, @since.
    {
      code: [
        '/**',
        ' * Foo - Bar.',
        ' *',
        ' * Does a thing worth documenting here in the body prose.',
        ' *',
        ' * @param {A} a - A.',
        ' * @param {B} b - B.',
        ' *',
        ' * @private',
        ' *',
        ' * @returns {R}',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'class Foo {}',
      ].join('\n'),
    },

    // Public method: @param group, @returns, @since (no @private).
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @param {A} a - A.',
        ' *',
        ' * @returns {R}',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'class Foo {}',
      ].join('\n'),
    },

    // No parameters: @returns, @since.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @returns {R}',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'class Foo {}',
      ].join('\n'),
    },

    // Minimal: @since only.
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

    // @since then @deprecated (deprecated is the last group).
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @since UNRELEASED',
        ' *',
        ' * @deprecated UNRELEASED',
        ' */',
        'class Foo {}',
      ].join('\n'),
    },

    // No JSDoc block at all (nothing to order).
    {
      code: 'class Foo {}',
    },

    // LAST: ignoreFiles skips an otherwise out-of-order block.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @private',
        ' *',
        ' * @param {A} a - A.',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'class Foo {}',
      ].join('\n'),
      options: [{ ignoreFiles: ['ignored-file.ts'] }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [

    // @private before the @param group.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @private',
        ' *',
        ' * @param {A} a - A.',
        ' *',
        ' * @returns {R}',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'class Foo {}',
      ].join('\n'),
      errors: [{ messageId: 'tagOrder' }],
      output: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @param {A} a - A.',
        ' *',
        ' * @private',
        ' *',
        ' * @returns {R}',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'class Foo {}',
      ].join('\n'),
    },

    // @returns before the @param group.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @returns {R}',
        ' *',
        ' * @param {A} a - A.',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'class Foo {}',
      ].join('\n'),
      errors: [{ messageId: 'tagOrder' }],
      output: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @param {A} a - A.',
        ' *',
        ' * @returns {R}',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'class Foo {}',
      ].join('\n'),
    },

    // @deprecated before @since.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @deprecated UNRELEASED',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'class Foo {}',
      ].join('\n'),
      errors: [{ messageId: 'tagOrder' }],
      output: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @since UNRELEASED',
        ' *',
        ' * @deprecated UNRELEASED',
        ' */',
        'class Foo {}',
      ].join('\n'),
    },

    // Missing blank line between the @param group and @private.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @param {A} a - A.',
        ' * @private',
        ' *',
        ' * @returns {R}',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'class Foo {}',
      ].join('\n'),
      errors: [{ messageId: 'tagSpacing' }],
      output: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @param {A} a - A.',
        ' *',
        ' * @private',
        ' *',
        ' * @returns {R}',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'class Foo {}',
      ].join('\n'),
    },

    // Blank line between two @param lines.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @param {A} a - A.',
        ' *',
        ' * @param {B} b - B.',
        ' *',
        ' * @returns {R}',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'class Foo {}',
      ].join('\n'),
      errors: [{ messageId: 'tagSpacing' }],
      output: [
        '/**',
        ' * Foo.',
        ' *',
        ' * @param {A} a - A.',
        ' * @param {B} b - B.',
        ' *',
        ' * @returns {R}',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'class Foo {}',
      ].join('\n'),
    },

    // Indented class-member block: blank separators must match the block's indent.
    {
      code: [
        'class Foo {',
        '  /**',
        '   * Foo - Bar.',
        '   *',
        '   * @private',
        '   *',
        '   * @param {A} a - A.',
        '   *',
        '   * @returns {R}',
        '   *',
        '   * @since UNRELEASED',
        '   */',
        '  bar() {}',
        '}',
      ].join('\n'),
      errors: [{ messageId: 'tagOrder' }],
      output: [
        'class Foo {',
        '  /**',
        '   * Foo - Bar.',
        '   *',
        '   * @param {A} a - A.',
        '   *',
        '   * @private',
        '   *',
        '   * @returns {R}',
        '   *',
        '   * @since UNRELEASED',
        '   */',
        '  bar() {}',
        '}',
      ].join('\n'),
    },
  ],
});
