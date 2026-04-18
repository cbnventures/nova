import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireJsdocBody } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintJsdocRequireJsdocBodyRuleTester } from '../../../../types/tests/rules/eslint/jsdoc/require-jsdoc-body.test.d.ts';

/**
 * Tests - Rules - ESLint - JSDoc - Require JSDoc Body.
 *
 * Validates that the require-jsdoc-body rule correctly enforces body paragraphs
 * in JSDoc blocks, including minLines and maxLines bounds.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintJsdocRequireJsdocBodyRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireJsdocBody', RequireJsdocBody['rule'], {
  valid: [

    // JSDoc with 2-line body (meets minLines: 2 default).
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * Processes input data and returns the result.',
        ' * Used by the CLI to handle user commands.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction() {}',
      ].join('\n'),
    },

    // JSDoc with 3-line body (meets maxLines: 3 default).
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * Processes input data and returns the result.',
        ' * Used by the CLI to handle user commands.',
        ' * Called during the build pipeline.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction() {}',
      ].join('\n'),
    },

    // No JSDoc (should not report).
    {
      code: 'function myFunction() {}',
    },

    // Regular block comment (not JSDoc).
    {
      code: '/* Regular comment */',
    },

    // skipDirectories: skip files in types directory.
    {
      code: [
        '/**',
        ' * My type.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'export type MyType = string;',
      ].join('\n'),
      options: [{
        ignoreFiles: [],
        maxLines: 3,
        maxWidth: 80,
        minLines: 2,
        skipDirectories: ['types'],
      }],
      filename: '/path/to/types/my-type.d.ts',
    },

    // skipDirectories: skip files in tests directory.
    {
      code: [
        '/**',
        ' * My test.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myTest() {}',
      ].join('\n'),
      options: [{
        ignoreFiles: [],
        maxLines: 3,
        maxWidth: 80,
        minLines: 2,
        skipDirectories: ['tests'],
      }],
      filename: '/path/to/tests/my-test.test.ts',
    },

    // skipDirectories: skip files in styles directory.
    {
      code: [
        '/**',
        ' * My style.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'export const myStyle = {};',
      ].join('\n'),
      options: [{
        ignoreFiles: [],
        maxLines: 3,
        maxWidth: 80,
        minLines: 2,
        skipDirectories: ['styles'],
      }],
      filename: '/path/to/styles/homepage.ts',
    },

    // LAST: ignoreFiles test.
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction() {}',
      ].join('\n'),
      options: [{
        ignoreFiles: ['ignored-file.ts'],
        maxLines: 3,
        maxWidth: 80,
        minLines: 2,
        skipDirectories: [],
      }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [

    // Missing body paragraph.
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction() {}',
      ].join('\n'),
      errors: [{ messageId: 'requireBodyDescription' }],
    },

    // Body too short (default minLines: 2, has 1).
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * One line only.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction() {}',
      ].join('\n'),
      errors: [{ messageId: 'bodyTooShort' }],
    },

    // Body too long (default maxLines: 3, has 4).
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * First line of body.',
        ' * Second line of body.',
        ' * Third line of body.',
        ' * Fourth line of body.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction() {}',
      ].join('\n'),
      errors: [{ messageId: 'bodyTooLong' }],
    },

    // skipDirectories empty: .d.ts file missing body reports.
    {
      code: [
        '/**',
        ' * My type.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'export type MyType = string;',
      ].join('\n'),
      options: [{
        ignoreFiles: [],
        maxLines: 3,
        maxWidth: 80,
        minLines: 2,
        skipDirectories: [],
      }],
      filename: '/path/to/types/my-type.d.ts',
      errors: [{ messageId: 'requireBodyDescription' }],
    },

    // Body line too wide (default maxWidth: 80).
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * This is a very long line that exceeds the maximum width of eighty characters allowed by the rule configuration.',
        ' * Second line of body.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction() {}',
      ].join('\n'),
      errors: [{ messageId: 'bodyLineTooWide' }],
    },
  ],
});
