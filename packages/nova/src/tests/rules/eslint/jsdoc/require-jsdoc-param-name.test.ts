import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireJsdocParamName } from '../../../../rules/eslint/index.js';

import type { Tests_Rules_Eslint_Jsdoc_RequireJsdocParamName_RuleTester } from '../../../../types/tests/rules/eslint/jsdoc/require-jsdoc-param-name.test.d.ts';

/**
 * Tests - Rules - ESLint - JSDoc - Require JSDoc Param Name.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: Tests_Rules_Eslint_Jsdoc_RequireJsdocParamName_RuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireJsdocParamName', RequireJsdocParamName['rule'], {
  valid: [

    // Correct param description for simple name.
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} name - Name.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(name) {}',
      ].join('\n'),
    },

    // Correct param description for camelCase name.
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} packageDir - Package dir.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(packageDir) {}',
      ].join('\n'),
    },

    // Correct param description for multi-word camelCase.
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} myLongVariableName - My long variable name.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(myLongVariableName) {}',
      ].join('\n'),
    },

    // Leading underscore marks an unused parameter but is not part of its description.
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} _context - Context.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(_context) {}',
      ].join('\n'),
    },

    // Optional parameter brackets are not part of the description.
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} [defaultOptions] - Default options.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(defaultOptions) {}',
      ].join('\n'),
    },

    // No JSDoc (should not report).
    {
      code: 'function myFunction(name) {}',
    },

    // JSDoc without @param (should not report).
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

    // LAST: ignoreFiles test.
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} name - Wrong description.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(name) {}',
      ].join('\n'),
      options: [{ ignoreFiles: ['ignored-file.ts'] }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [

    // Wrong description for simple param.
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} name - The user name.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(name) {}',
      ].join('\n'),
      output: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} name - Name.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(name) {}',
      ].join('\n'),
      errors: [{ messageId: 'paramDescriptionMismatch' }],
    },

    // Wrong description for camelCase param.
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} packageDir - The package directory.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(packageDir) {}',
      ].join('\n'),
      output: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} packageDir - Package dir.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(packageDir) {}',
      ].join('\n'),
      errors: [{ messageId: 'paramDescriptionMismatch' }],
    },

    // Missing trailing period.
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} name - Name',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(name) {}',
      ].join('\n'),
      output: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} name - Name.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(name) {}',
      ].join('\n'),
      errors: [{ messageId: 'paramDescriptionMismatch' }],
    },

    // Swapped param descriptions must each be rewritten at their own position.
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} paramA - Param b.',
        ' * @param {string} paramB - Param a.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(paramA, paramB) {}',
      ].join('\n'),
      output: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} paramA - Param a.',
        ' * @param {string} paramB - Param b.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(paramA, paramB) {}',
      ].join('\n'),
      errors: [
        { messageId: 'paramDescriptionMismatch' },
        { messageId: 'paramDescriptionMismatch' },
      ],
    },

    // Leading underscore is removed before deriving the description.
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} _context - _context.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(_context) {}',
      ].join('\n'),
      output: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} _context - Context.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(_context) {}',
      ].join('\n'),
      errors: [{ messageId: 'paramDescriptionMismatch' }],
    },

    // Optional parameter brackets are removed before deriving the description.
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} [defaultOptions] - [default options].',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(defaultOptions) {}',
      ].join('\n'),
      output: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} [defaultOptions] - Default options.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(defaultOptions) {}',
      ].join('\n'),
      errors: [{ messageId: 'paramDescriptionMismatch' }],
    },

    // Cyclic (three-way) param descriptions must each be rewritten at their own position.
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} paramA - Param b.',
        ' * @param {string} paramB - Param c.',
        ' * @param {string} paramC - Param a.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(paramA, paramB, paramC) {}',
      ].join('\n'),
      output: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} paramA - Param a.',
        ' * @param {string} paramB - Param b.',
        ' * @param {string} paramC - Param c.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(paramA, paramB, paramC) {}',
      ].join('\n'),
      errors: [
        { messageId: 'paramDescriptionMismatch' },
        { messageId: 'paramDescriptionMismatch' },
        { messageId: 'paramDescriptionMismatch' },
      ],
    },
  ],
});
