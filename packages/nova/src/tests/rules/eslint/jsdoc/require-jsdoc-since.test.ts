import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireJsdocSince } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintJsdocRequireJsdocSinceRuleTester } from '../../../../types/tests/rules/eslint/jsdoc/require-jsdoc-since.test.d.ts';

/**
 * Tests - Rules - ESLint - JSDoc - Require JSDoc Since.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintJsdocRequireJsdocSinceRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireJsdocSince', RequireJsdocSince['rule'], {
  valid: [

    // JSDoc with @since tag on a class.
    {
      code: [
        '/**',
        ' * My class.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'class MyClass {}',
      ].join('\n'),
    },

    // JSDoc with @since tag on a function.
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction() {}',
      ].join('\n'),
    },

    // No JSDoc at all (should not report).
    {
      code: 'class MyClass {}',
    },

    // No JSDoc on a function.
    {
      code: 'function myFunction() {}',
    },

    // JSDoc with @since on a type alias.
    {
      code: [
        '/**',
        ' * My type.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'type MyType = string;',
      ].join('\n'),
    },

    // JSDoc with @since on an interface.
    {
      code: [
        '/**',
        ' * My interface.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'interface MyInterface {}',
      ].join('\n'),
    },

    // JSDoc with @since on an enum.
    {
      code: [
        '/**',
        ' * My enum.',
        ' *',
        ' * @since 2.0.0',
        ' */',
        'enum MyEnum { A, B }',
      ].join('\n'),
    },

    // LAST: ignoreFiles test.
    {
      code: [
        '/**',
        ' * Missing since.',
        ' */',
        'class MyClass {}',
      ].join('\n'),
      options: [{ ignoreFiles: ['ignored-file.ts'] }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [

    // JSDoc without @since on a class.
    {
      code: [
        '/**',
        ' * My class.',
        ' */',
        'class MyClass {}',
      ].join('\n'),
      errors: [{ messageId: 'requireSinceTag' }],
    },

    // JSDoc without @since on a function.
    {
      code: [
        '/**',
        ' * My function.',
        ' */',
        'function myFunction() {}',
      ].join('\n'),
      errors: [{ messageId: 'requireSinceTag' }],
    },

    // JSDoc without @since on a type alias.
    {
      code: [
        '/**',
        ' * My type.',
        ' */',
        'type MyType = string;',
      ].join('\n'),
      errors: [{ messageId: 'requireSinceTag' }],
    },

    // JSDoc without @since on an interface.
    {
      code: [
        '/**',
        ' * My interface.',
        ' */',
        'interface MyInterface {}',
      ].join('\n'),
      errors: [{ messageId: 'requireSinceTag' }],
    },

    // JSDoc without @since on an enum.
    {
      code: [
        '/**',
        ' * My enum.',
        ' */',
        'enum MyEnum { A, B }',
      ].join('\n'),
      errors: [{ messageId: 'requireSinceTag' }],
    },
  ],
});
