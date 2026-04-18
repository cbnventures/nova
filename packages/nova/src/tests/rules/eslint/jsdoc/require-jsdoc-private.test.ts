import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireJsdocPrivate } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintJsdocRequireJsdocPrivateRuleTester } from '../../../../types/tests/rules/eslint/jsdoc/require-jsdoc-private.test.d.ts';

/**
 * Tests - Rules - ESLint - JSDoc - Require JSDoc Private.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintJsdocRequireJsdocPrivateRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireJsdocPrivate', RequireJsdocPrivate['rule'], {
  valid: [

    // Private method with @private tag.
    {
      code: [
        'class MyClass {',
        '  /**',
        '   * My method.',
        '   *',
        '   * @private',
        '   *',
        '   * @since 0.15.0',
        '   */',
        '  private myMethod() {}',
        '}',
      ].join('\n'),
    },

    // Public method (no @private needed).
    {
      code: [
        'class MyClass {',
        '  /**',
        '   * My method.',
        '   *',
        '   * @since 0.15.0',
        '   */',
        '  public myMethod() {}',
        '}',
      ].join('\n'),
    },

    // Private property with @private tag.
    {
      code: [
        'class MyClass {',
        '  /**',
        '   * My property.',
        '   *',
        '   * @private',
        '   *',
        '   * @since 0.15.0',
        '   */',
        '  private myProperty = 5;',
        '}',
      ].join('\n'),
    },

    // Private member without JSDoc (should not report).
    {
      code: [
        'class MyClass {',
        '  private myMethod() {}',
        '}',
      ].join('\n'),
    },

    // Public member without @private (OK).
    {
      code: [
        'class MyClass {',
        '  /**',
        '   * My method.',
        '   *',
        '   * @since 0.15.0',
        '   */',
        '  myMethod() {}',
        '}',
      ].join('\n'),
    },

    // LAST: ignoreFiles test.
    {
      code: [
        'class MyClass {',
        '  /**',
        '   * Missing private tag.',
        '   *',
        '   * @since 0.15.0',
        '   */',
        '  private myMethod() {}',
        '}',
      ].join('\n'),
      options: [{ ignoreFiles: ['ignored-file.ts'] }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [

    // Private method without @private tag.
    {
      code: [
        'class MyClass {',
        '  /**',
        '   * My method.',
        '   *',
        '   * @since 0.15.0',
        '   */',
        '  private myMethod() {}',
        '}',
      ].join('\n'),
      output: [
        'class MyClass {',
        '  /**',
        '   * My method.',
        '   *',
        '   * @private',
        '   *',
        '   * @since 0.15.0',
        '   */',
        '  private myMethod() {}',
        '}',
      ].join('\n'),
      errors: [{ messageId: 'requirePrivateTag' }],
    },

    // Private property without @private tag.
    {
      code: [
        'class MyClass {',
        '  /**',
        '   * My property.',
        '   *',
        '   * @since 0.15.0',
        '   */',
        '  private myProperty = 5;',
        '}',
      ].join('\n'),
      output: [
        'class MyClass {',
        '  /**',
        '   * My property.',
        '   *',
        '   * @private',
        '   *',
        '   * @since 0.15.0',
        '   */',
        '  private myProperty = 5;',
        '}',
      ].join('\n'),
      errors: [{ messageId: 'requirePrivateTag' }],
    },
  ],
});
