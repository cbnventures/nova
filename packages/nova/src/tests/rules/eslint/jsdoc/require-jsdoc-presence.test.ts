import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireJsdocPresence } from '../../../../rules/eslint/index.js';

import type { Tests_Rules_Eslint_Jsdoc_RequireJsdocPresence_RuleTester } from '../../../../types/tests/rules/eslint/jsdoc/require-jsdoc-presence.test.d.ts';

/**
 * Tests - Rules - ESLint - JSDoc - Require JSDoc Presence.
 *
 * @since 0.21.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: Tests_Rules_Eslint_Jsdoc_RequireJsdocPresence_RuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireJsdocPresence', RequireJsdocPresence['rule'], {
  valid: [

    // Documented class.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * Body prose describing why this exists.',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'class Foo {}',
      ].join('\n'),
    },

    // Documented function.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * Body prose describing why this exists.',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'function foo() {}',
      ].join('\n'),
    },

    // Documented exported class (covered once via ExportNamedDeclaration).
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * Body prose describing why this exists.',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'export class Foo {}',
      ].join('\n'),
    },

    // Documented module-level arrow-function const.
    {
      code: [
        '/**',
        ' * Do Thing.',
        ' *',
        ' * Body prose describing why this exists.',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'const doThing = () => {};',
      ].join('\n'),
    },

    // Documented method inside a documented class.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * Body prose describing why this exists.',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'class Foo {',
        '  /**',
        '   * Foo - Bar.',
        '   *',
        '   * Body prose describing why this exists.',
        '   *',
        '   * @since UNRELEASED',
        '   */',
        '  bar() {}',
        '}',
      ].join('\n'),
    },

    // Ambient declaration is skipped (no implementation to document).
    {
      code: 'declare function foo(): void;',
    },

    // Local const inside a documented function is not a documentable symbol.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * Body prose describing why this exists.',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'function foo() {',
        '  const localValue = 1;',
        '',
        '  return localValue;',
        '}',
      ].join('\n'),
    },

    // Documented nested arrow-const helper inside a documented function.
    {
      code: [
        '/**',
        ' * Outer.',
        ' *',
        ' * Body prose describing why this exists.',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'function outer() {',
        '  /**',
        '   * Outer - Helper.',
        '   *',
        '   * Body prose describing why this exists.',
        '   *',
        '   * @since UNRELEASED',
        '   */',
        '  const helper = () => {};',
        '',
        '  return helper;',
        '}',
      ].join('\n'),
    },

    // Declaration files (.d.ts) are skipped; their type aliases use the section-header convention.
    {
      code: 'export type Foo = string;',
      filename: '/path/to/nova-config.d.ts',
    },

    // LAST: ignoreFiles skips an otherwise undocumented symbol.
    {
      code: 'class Foo {}',
      options: [{
        ignoreFiles: ['ignored-file.ts'],
        skipDirectories: [],
      }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [

    // Undocumented class.
    {
      code: 'class Foo {}',
      errors: [{ messageId: 'missingJsdoc' }],
    },

    // Undocumented function.
    {
      code: 'function foo() {}',
      errors: [{ messageId: 'missingJsdoc' }],
    },

    // Undocumented module-level arrow-function const.
    {
      code: 'const doThing = () => {};',
      errors: [{ messageId: 'missingJsdoc' }],
    },

    // Undocumented exported class (reported once, not twice).
    {
      code: 'export class Foo {}',
      errors: [{ messageId: 'missingJsdoc' }],
    },

    // Undocumented method inside a documented class.
    {
      code: [
        '/**',
        ' * Foo.',
        ' *',
        ' * Body prose describing why this exists.',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'class Foo {',
        '  bar() {}',
        '}',
      ].join('\n'),
      errors: [{ messageId: 'missingJsdoc' }],
    },

    // Undocumented nested function declaration inside a documented function.
    {
      code: [
        '/**',
        ' * Outer.',
        ' *',
        ' * Body prose describing why this exists.',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'function outer() {',
        '  function inner() {}',
        '',
        '  return inner;',
        '}',
      ].join('\n'),
      errors: [{ messageId: 'missingJsdoc' }],
    },

    // Undocumented nested arrow-const helper inside a documented function.
    {
      code: [
        '/**',
        ' * Outer.',
        ' *',
        ' * Body prose describing why this exists.',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'function outer() {',
        '  const helper = () => {};',
        '',
        '  return helper;',
        '}',
      ].join('\n'),
      errors: [{ messageId: 'missingJsdoc' }],
    },
  ],
});
