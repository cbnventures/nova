import { fileURLToPath } from 'node:url';

import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireJsdocSince } from '../../../../rules/eslint/index.js';

import type {
  Tests_Rules_Eslint_Jsdoc_RequireJsdocSince_RuleTester,
  Tests_Rules_Eslint_Jsdoc_RequireJsdocSince_ValidFilename,
  Tests_Rules_Eslint_Jsdoc_RequireJsdocSince_ZeroVersionFilename,
} from '../../../../types/tests/rules/eslint/jsdoc/require-jsdoc-since.test.d.ts';

/**
 * Tests - Rules - ESLint - JSDoc - Require JSDoc Since.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: Tests_Rules_Eslint_Jsdoc_RequireJsdocSince_RuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

// Derived from this test file's own URL so the rule resolves the live packages/nova/package.json version on any machine.
const validFilename: Tests_Rules_Eslint_Jsdoc_RequireJsdocSince_ValidFilename = fileURLToPath(import.meta.url);

// Points into the zero-version fixture so the rule resolves fixtures/zero-version/package.json (version 0.0.0).
const zeroVersionFilename: Tests_Rules_Eslint_Jsdoc_RequireJsdocSince_ZeroVersionFilename = fileURLToPath(new URL('fixtures/zero-version/stub.ts', import.meta.url));

ruleTester.run('requireJsdocSince', RequireJsdocSince['rule'], {
  valid: [

    // JSDoc with @since UNRELEASED (sentinel for new unreleased code).
    {
      code: [
        '/**',
        ' * My class.',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'class MyClass {}',
      ].join('\n'),
      filename: validFilename,
    },

    // JSDoc with @since at or below the current package version.
    {
      code: [
        '/**',
        ' * My class.',
        ' *',
        ' * @since 0.19.0',
        ' */',
        'class MyClass {}',
      ].join('\n'),
      filename: validFilename,
    },

    // JSDoc with @since older than package version with trailing prose.
    {
      code: [
        '/**',
        ' * My class.',
        ' *',
        ' * @since 0.18.0 backported note',
        ' */',
        'class MyClass {}',
      ].join('\n'),
      filename: validFilename,
    },

    // JSDoc with @since UNRELEASED sentinel followed by trailing prose.
    {
      code: [
        '/**',
        ' * My class.',
        ' *',
        ' * @since UNRELEASED finalize before release',
        ' */',
        'class MyClass {}',
      ].join('\n'),
      filename: validFilename,
    },

    // JSDoc with @deprecated UNRELEASED sentinel.
    {
      code: [
        '/**',
        ' * My class.',
        ' *',
        ' * @since 0.18.0',
        ' * @deprecated UNRELEASED',
        ' */',
        'class MyClass {}',
      ].join('\n'),
      filename: validFilename,
    },

    // JSDoc with @deprecated UNRELEASED sentinel followed by trailing prose.
    {
      code: [
        '/**',
        ' * My class.',
        ' *',
        ' * @since 0.18.0',
        ' * @deprecated UNRELEASED Use bar instead.',
        ' */',
        'class MyClass {}',
      ].join('\n'),
      filename: validFilename,
    },

    // JSDoc with @deprecated at or below the package version.
    {
      code: [
        '/**',
        ' * My class.',
        ' *',
        ' * @since 0.18.0',
        ' * @deprecated 0.18.0',
        ' */',
        'class MyClass {}',
      ].join('\n'),
      filename: validFilename,
    },

    // JSDoc with @since tag on a class (no filename -- the rule resolves the live packages/nova/package.json version, so 0.15.0 passes validation).
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
        ' * @since 0.15.0',
        ' */',
        'enum MyEnum { A, B }',
      ].join('\n'),
    },

    // 0.0.0 package: value validation is skipped; a far-future @since is accepted.
    {
      code: [
        '/**',
        ' * My class.',
        ' *',
        ' * @since 99.0.0',
        ' */',
        'class MyClass {}',
      ].join('\n'),
      filename: zeroVersionFilename,
    },

    // @since on an exported class (covered via ExportNamedDeclaration).
    {
      code: [
        '/**',
        ' * My class.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'export class MyClass {}',
      ].join('\n'),
    },

    // @since on an exported const (covered via ExportNamedDeclaration).
    {
      code: [
        '/**',
        ' * My const.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'export const MY_CONST = 1;',
      ].join('\n'),
    },

    // @since UNRELEASED on an exported type alias.
    {
      code: [
        '/**',
        ' * My type.',
        ' *',
        ' * @since UNRELEASED',
        ' */',
        'export type MyType = string;',
      ].join('\n'),
    },

    // Re-export list has no declaration, so a leading JSDoc block is not checked.
    {
      code: [
        'const foo = 1;',
        '/**',
        ' * Re-export foo.',
        ' */',
        'export { foo };',
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

    // @since version greater than package version. Uses 99.0.0 with the live-version fixture so it stays above any real nova version across release bumps. (The 0.0.0 fixture would skip validation and accept it -- see the valid 99.0.0 case above.)
    {
      code: [
        '/**',
        ' * My class.',
        ' *',
        ' * @since 99.0.0',
        ' */',
        'class MyClass {}',
      ].join('\n'),
      filename: validFilename,
      errors: [{ messageId: 'invalidSinceVersion' }],
    },

    // @since version far greater than package version.
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @since 0.99.0',
        ' */',
        'function myFunction() {}',
      ].join('\n'),
      filename: validFilename,
      errors: [{ messageId: 'invalidSinceVersion' }],
    },

    // @since with a malformed value (not UNRELEASED and not semver).
    {
      code: [
        '/**',
        ' * My type.',
        ' *',
        ' * @since banana',
        ' */',
        'type MyType = string;',
      ].join('\n'),
      filename: validFilename,
      errors: [{ messageId: 'invalidSinceVersion' }],
    },

    // @since present but with no value (bare tag) -> invalidSinceVersion.
    {
      code: [
        '/**',
        ' * My class.',
        ' *',
        ' * @since',
        ' */',
        'class MyClass {}',
      ].join('\n'),
      filename: validFilename,
      errors: [{ messageId: 'invalidSinceVersion' }],
    },

    // @deprecated with a version greater than package version. 99.0.0 stays above any real nova version, so this holds across release bumps while @since 0.18.0 remains a valid past version.
    {
      code: [
        '/**',
        ' * My class.',
        ' *',
        ' * @since 0.18.0',
        ' * @deprecated 99.0.0',
        ' */',
        'class MyClass {}',
      ].join('\n'),
      filename: validFilename,
      errors: [{ messageId: 'invalidDeprecatedVersion' }],
    },

    // @deprecated with a malformed value (not UNRELEASED and not semver).
    {
      code: [
        '/**',
        ' * My class.',
        ' *',
        ' * @since 0.18.0',
        ' * @deprecated banana',
        ' */',
        'class MyClass {}',
      ].join('\n'),
      filename: validFilename,
      errors: [{ messageId: 'invalidDeprecatedVersion' }],
    },

    // @deprecated present but with no value (bare tag) -> invalidDeprecatedVersion.
    {
      code: [
        '/**',
        ' * My class.',
        ' *',
        ' * @since 0.18.0',
        ' * @deprecated',
        ' */',
        'class MyClass {}',
      ].join('\n'),
      filename: validFilename,
      errors: [{ messageId: 'invalidDeprecatedVersion' }],
    },

    // export class with a JSDoc block missing @since (now caught via ExportNamedDeclaration).
    {
      code: [
        '/**',
        ' * My class.',
        ' */',
        'export class MyClass {}',
      ].join('\n'),
      errors: [{ messageId: 'requireSinceTag' }],
    },

    // export const with a JSDoc block missing @since.
    {
      code: [
        '/**',
        ' * My const.',
        ' */',
        'export const MY_CONST = 1;',
      ].join('\n'),
      errors: [{ messageId: 'requireSinceTag' }],
    },

    // export function with a JSDoc block missing @since.
    {
      code: [
        '/**',
        ' * My function.',
        ' */',
        'export function myFunction() {}',
      ].join('\n'),
      errors: [{ messageId: 'requireSinceTag' }],
    },

    // export const with an @since value greater than the package version.
    {
      code: [
        '/**',
        ' * My const.',
        ' *',
        ' * @since 0.99.0',
        ' */',
        'export const MY_CONST = 1;',
      ].join('\n'),
      filename: validFilename,
      errors: [{ messageId: 'invalidSinceVersion' }],
    },
  ],
});
