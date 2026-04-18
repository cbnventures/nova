import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireJsdocHierarchy } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintJsdocRequireJsdocHierarchyRuleTester } from '../../../../types/tests/rules/eslint/jsdoc/require-jsdoc-hierarchy.test.d.ts';

/**
 * Tests - Rules - ESLint - JSDoc - Require JSDoc Hierarchy.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintJsdocRequireJsdocHierarchyRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireJsdocHierarchy', RequireJsdocHierarchy['rule'], {
  valid: [

    // Correct class hierarchy.
    {
      code: [
        '/**',
        ' * CLI - Utility - Changelog.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'class CliUtilityChangelog {}',
      ].join('\n'),
      filename: '/project/src/cli/utility/changelog.ts',
    },

    // Correct method hierarchy.
    {
      code: [
        '/**',
        ' * CLI - Utility - Changelog.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'class CliUtilityChangelog {',
        '  /**',
        '   * CLI - Utility - Changelog - Run.',
        '   *',
        '   * @since 0.15.0',
        '   */',
        '  run() {}',
        '}',
      ].join('\n'),
      filename: '/project/src/cli/utility/changelog.ts',
    },

    // Correct constructor hierarchy.
    {
      code: [
        '/**',
        ' * CLI - Utility - Changelog.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'class CliUtilityChangelog {',
        '  /**',
        '   * CLI - Utility - Changelog - Constructor.',
        '   *',
        '   * @since 0.15.0',
        '   */',
        '  constructor() {}',
        '}',
      ].join('\n'),
      filename: '/project/src/cli/utility/changelog.ts',
    },

    // No JSDoc on class (should not report).
    {
      code: 'class MyClass {}',
      filename: '/project/src/cli/utility/changelog.ts',
    },

    // No JSDoc on method (should not report).
    {
      code: [
        'class MyClass {',
        '  run() {}',
        '}',
      ].join('\n'),
      filename: '/project/src/cli/utility/changelog.ts',
    },

    // Correct function declaration hierarchy.
    {
      code: [
        '/**',
        ' * Lib - Utility - Current Timestamp.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function currentTimestamp() {}',
      ].join('\n'),
      filename: '/project/src/lib/utility.ts',
    },

    // Correct variable declaration hierarchy.
    {
      code: [
        '/**',
        ' * Lib - Regex - Pattern Code Block.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'const PATTERN_CODE_BLOCK = /test/;',
      ].join('\n'),
      filename: '/project/src/lib/regex.ts',
    },

    // Correct nested variable inside function.
    {
      code: [
        '/**',
        ' * Lib - Utility - Current Timestamp.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function currentTimestamp() {',
        '  /**',
        '   * Lib - Utility - Current Timestamp - Pad Left.',
        '   *',
        '   * @since 0.15.0',
        '   */',
        '  const padLeft = (n) => String(n);',
        '}',
      ].join('\n'),
      filename: '/project/src/lib/utility.ts',
    },

    // Correct describe with dot notation (ClassName.method).
    {
      code: [
        '/**',
        ' * Tests - CLI - Utility - Changelog - Run.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'describe("CliUtilityChangelog.run", () => {});',
      ].join('\n'),
      filename: '/project/src/tests/cli/utility/changelog.test.ts',
    },

    // Correct describe with UPPER_SNAKE (dedup against path).
    {
      code: [
        '/**',
        ' * Tests - Lib - Regex - Pattern Digits.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'describe("LIB_REGEX_PATTERN_DIGITS", () => {});',
      ].join('\n'),
      filename: '/project/src/tests/lib/regex.test.ts',
    },

    // Correct describe with plain string.
    {
      code: [
        '/**',
        ' * Tests - Lib - Regex - Character Patterns.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'describe("character patterns", () => {});',
      ].join('\n'),
      filename: '/project/src/tests/lib/regex.test.ts',
    },

    // Correct describe.skip with dot notation.
    {
      code: [
        '/**',
        ' * Tests - CLI - Utility - Changelog - Run.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'describe.skip("CliUtilityChangelog.run", () => {});',
      ].join('\n'),
      filename: '/project/src/tests/cli/utility/changelog.test.ts',
    },

    // Non-describe expression statement (assignment) uses file path only.
    {
      code: [
        '/**',
        ' * Tests - Lib - Utility.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'RuleTester.afterAll = afterAll;',
      ].join('\n'),
      filename: '/project/src/tests/lib/utility.test.ts',
    },

    // Function without JSDoc (should not report).
    {
      code: 'function myFunction() {}',
      filename: '/project/src/lib/utility.ts',
    },

    // Variable without JSDoc (should not report).
    {
      code: 'const MY_CONST = 42;',
      filename: '/project/src/lib/utility.ts',
    },

    // Expression without JSDoc (should not report).
    {
      code: 'test("something", () => {});',
      filename: '/project/src/tests/lib/utility.test.ts',
    },

    // Correct class hierarchy with custom knownNames.
    {
      code: [
        '/**',
        ' * CLI - Utility - MyApp.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'class CliUtilityMyapp {}',
      ].join('\n'),
      options: [{
        anchorDirectories: ['src'], ignoreFiles: [], knownNames: { myapp: 'MyApp' }, stripDirectories: ['types'],
      }],
      filename: '/project/src/cli/utility/myapp.ts',
    },

    // Correct hierarchy using custom anchorDirectories with 'utils'.
    {
      code: [
        '/**',
        ' * Getters - Get Footer Links - Get Footer Links.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function getFooterLinks() {}',
      ].join('\n'),
      options: [{
        anchorDirectories: [
          'src',
          'utils',
        ],
        ignoreFiles: [],
        knownNames: {},
        stripDirectories: ['types'],
      }],
      filename: '/project/utils/getters/get-footer-links.ts',
    },

    // Correct hierarchy for class using custom anchorDirectories with 'utils'.
    {
      code: [
        '/**',
        ' * Getters - Get Footer Links.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'export class GettersGetFooterLinks {}',
      ].join('\n'),
      options: [{
        anchorDirectories: [
          'src',
          'utils',
        ],
        ignoreFiles: [],
        knownNames: {},
        stripDirectories: ['types'],
      }],
      filename: '/project/utils/getters/get-footer-links.ts',
    },

    // Correct hierarchy for file at root with no anchor directory.
    {
      code: [
        '/**',
        ' * Sidebars.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function sidebars() {}',
      ].join('\n'),
      options: [{
        anchorDirectories: ['src'], ignoreFiles: [], knownNames: {}, stripDirectories: ['types'],
      }],
      filename: '/project/sidebars.ts',
    },

    // Correct hierarchy with custom stripDirectories filtering 'internal'.
    {
      code: [
        '/**',
        ' * Lib - Utility.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'class LibUtility {}',
      ].join('\n'),
      options: [{
        anchorDirectories: ['src'],
        ignoreFiles: [],
        knownNames: {},
        stripDirectories: [
          'types',
          'internal',
        ],
      }],
      filename: '/project/src/lib/internal/utility.ts',
    },

    // LAST: ignoreFiles test.
    {
      code: [
        '/**',
        ' * Wrong summary.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'class MyClass {}',
      ].join('\n'),
      options: [{
        anchorDirectories: ['src'], ignoreFiles: ['ignored-file.ts'], knownNames: {}, stripDirectories: ['types'],
      }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [

    // Wrong class hierarchy summary.
    {
      code: [
        '/**',
        ' * Wrong summary.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'class CliUtilityChangelog {}',
      ].join('\n'),
      output: [
        '/**',
        ' * CLI - Utility - Changelog.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'class CliUtilityChangelog {}',
      ].join('\n'),
      filename: '/project/src/cli/utility/changelog.ts',
      errors: [{ messageId: 'hierarchyMismatch' }],
    },

    // Wrong method hierarchy summary.
    {
      code: [
        '/**',
        ' * CLI - Utility - Changelog.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'class CliUtilityChangelog {',
        '  /**',
        '   * Wrong method summary.',
        '   *',
        '   * @since 0.15.0',
        '   */',
        '  run() {}',
        '}',
      ].join('\n'),
      output: [
        '/**',
        ' * CLI - Utility - Changelog.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'class CliUtilityChangelog {',
        '  /**',
        '   * CLI - Utility - Changelog - Run.',
        '   *',
        '   * @since 0.15.0',
        '   */',
        '  run() {}',
        '}',
      ].join('\n'),
      filename: '/project/src/cli/utility/changelog.ts',
      errors: [{ messageId: 'hierarchyMismatch' }],
    },

    // Wrong function declaration hierarchy.
    {
      code: [
        '/**',
        ' * Current Timestamp.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function currentTimestamp() {}',
      ].join('\n'),
      output: [
        '/**',
        ' * Lib - Utility - Current Timestamp.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function currentTimestamp() {}',
      ].join('\n'),
      filename: '/project/src/lib/utility.ts',
      errors: [{ messageId: 'hierarchyMismatch' }],
    },

    // Wrong variable declaration hierarchy.
    {
      code: [
        '/**',
        ' * Pattern - Code block.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'const PATTERN_CODE_BLOCK = /test/;',
      ].join('\n'),
      output: [
        '/**',
        ' * Lib - Regex - Pattern Code Block.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'const PATTERN_CODE_BLOCK = /test/;',
      ].join('\n'),
      filename: '/project/src/lib/regex.ts',
      errors: [{ messageId: 'hierarchyMismatch' }],
    },

    // Wrong describe hierarchy (dot notation).
    {
      code: [
        '/**',
        ' * Wrong summary.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'describe("CliUtilityChangelog.run", () => {});',
      ].join('\n'),
      output: [
        '/**',
        ' * Tests - CLI - Utility - Changelog - Run.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'describe("CliUtilityChangelog.run", () => {});',
      ].join('\n'),
      filename: '/project/src/tests/cli/utility/changelog.test.ts',
      errors: [{ messageId: 'hierarchyMismatch' }],
    },

    // Wrong describe hierarchy (UPPER_SNAKE with dedup).
    {
      code: [
        '/**',
        ' * Wrong summary.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'describe("LIB_REGEX_PATTERN_DIGITS", () => {});',
      ].join('\n'),
      output: [
        '/**',
        ' * Tests - Lib - Regex - Pattern Digits.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'describe("LIB_REGEX_PATTERN_DIGITS", () => {});',
      ].join('\n'),
      filename: '/project/src/tests/lib/regex.test.ts',
      errors: [{ messageId: 'hierarchyMismatch' }],
    },

    // Wrong describe hierarchy (plain string).
    {
      code: [
        '/**',
        ' * Wrong summary.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'describe("character patterns", () => {});',
      ].join('\n'),
      output: [
        '/**',
        ' * Tests - Lib - Regex - Character Patterns.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'describe("character patterns", () => {});',
      ].join('\n'),
      filename: '/project/src/tests/lib/regex.test.ts',
      errors: [{ messageId: 'hierarchyMismatch' }],
    },

    // Wrong nested variable hierarchy (missing parent function).
    {
      code: [
        '/**',
        ' * Lib - Utility - Current Timestamp.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function currentTimestamp() {',
        '  /**',
        '   * Wrong summary.',
        '   *',
        '   * @since 0.15.0',
        '   */',
        '  const padLeft = (n) => String(n);',
        '}',
      ].join('\n'),
      output: [
        '/**',
        ' * Lib - Utility - Current Timestamp.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function currentTimestamp() {',
        '  /**',
        '   * Lib - Utility - Current Timestamp - Pad Left.',
        '   *',
        '   * @since 0.15.0',
        '   */',
        '  const padLeft = (n) => String(n);',
        '}',
      ].join('\n'),
      filename: '/project/src/lib/utility.ts',
      errors: [{ messageId: 'hierarchyMismatch' }],
    },

    // Wrong non-describe expression statement hierarchy.
    {
      code: [
        '/**',
        ' * Wrong summary.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'RuleTester.afterAll = afterAll;',
      ].join('\n'),
      output: [
        '/**',
        ' * Tests - Lib - Nova Config.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'RuleTester.afterAll = afterAll;',
      ].join('\n'),
      filename: '/project/src/tests/lib/nova-config.test.ts',
      errors: [{ messageId: 'hierarchyMismatch' }],
    },

    // Wrong class hierarchy with custom knownNames (autofix uses custom name).
    {
      code: [
        '/**',
        ' * Wrong summary.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'class CliUtilityMyapp {}',
      ].join('\n'),
      output: [
        '/**',
        ' * CLI - Utility - MyApp.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'class CliUtilityMyapp {}',
      ].join('\n'),
      options: [{
        anchorDirectories: ['src'], ignoreFiles: [], knownNames: { myapp: 'MyApp' }, stripDirectories: ['types'],
      }],
      filename: '/project/src/cli/utility/myapp.ts',
      errors: [{ messageId: 'hierarchyMismatch' }],
    },
  ],
});
