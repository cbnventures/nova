import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireJsdocParamAlignment } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintJsdocRequireJsdocParamAlignmentRuleTester } from '../../../../types/tests/rules/eslint/jsdoc/require-jsdoc-param-alignment.test.d.ts';

/**
 * Tests - Rules - ESLint - JSDoc - Require JSDoc Param Alignment.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintJsdocRequireJsdocParamAlignmentRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireJsdocParamAlignment', RequireJsdocParamAlignment['rule'], {
  valid: [

    // Aligned @param tags.
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} name    - Name.',
        ' * @param {number} age     - Age.',
        ' * @param {string} address - Address.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(name, age, address) {}',
      ].join('\n'),
    },

    // Single @param (no alignment needed).
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

    // No @param tags.
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
        ' * @param {string} name - Name.',
        ' * @param {number} age - Age.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(name, age) {}',
      ].join('\n'),
      options: [{ ignoreFiles: ['ignored-file.ts'] }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [

    // Misaligned @param tags (different dash positions).
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} name - Name.',
        ' * @param {number} age - Age.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(name, age) {}',
      ].join('\n'),
      output: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} name - Name.',
        ' * @param {number} age  - Age.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(name, age) {}',
      ].join('\n'),
      errors: [{ messageId: 'paramAlignment' }],
    },

    // Misaligned @param tags (different type end positions).
    {
      code: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string} name - Name.',
        ' * @param {Map<string, number>} items - Items.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(name, items) {}',
      ].join('\n'),
      output: [
        '/**',
        ' * My function.',
        ' *',
        ' * @param {string}              name  - Name.',
        ' * @param {Map<string, number>} items - Items.',
        ' *',
        ' * @since 0.15.0',
        ' */',
        'function myFunction(name, items) {}',
      ].join('\n'),
      errors: [{ messageId: 'paramAlignment' }],
    },
  ],
});
