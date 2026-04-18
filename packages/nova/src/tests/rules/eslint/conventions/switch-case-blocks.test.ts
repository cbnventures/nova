import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { SwitchCaseBlocks } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintConventionsSwitchCaseBlocksRuleTester } from '../../../../types/tests/rules/eslint/conventions/switch-case-blocks.test.d.ts';

/**
 * Tests - Rules - ESLint - Conventions - Switch Case Blocks.
 *
 * @since 0.13.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintConventionsSwitchCaseBlocksRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('switchCaseBlocks', SwitchCaseBlocks['rule'], {
  valid: [
    {
      code: 'switch (x) { case 1: { break; } default: { break; } }',
    },
    {
      code: 'switch (x) { case 1: { console.log("a"); break; } case 2: { break; } default: { break; } }',
    },
    {
      code: 'switch (x) { default: { break; } }',
    },
    {
      code: 'switch (x) { case 1: case 2: { break; } default: { break; } }',
    },
    {
      code: 'switch (x) { case 1: { break; } }',
      options: [{
        ignoreFiles: [],
        requireDefault: false,
      }],
    },
    {
      code: 'switch (x) { case 1: console.log("a"); break; }',
      options: [{
        ignoreFiles: ['ignored-file.ts'],
        requireDefault: true,
      }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: 'switch (x) { case 1: console.log("a"); break; default: { break; } }',
      errors: [{ messageId: 'requireBlock' }],
    },
    {
      code: 'switch (x) { default: console.log("a"); break; }',
      errors: [{ messageId: 'requireBlock' }],
    },
    {
      code: 'switch (x) { case 1: { break; } case 2: console.log("b"); break; default: { break; } }',
      errors: [{ messageId: 'requireBlock' }],
    },
    {
      code: 'switch (x) { case 1: { break; } }',
      errors: [{ messageId: 'requireDefault' }],
    },
    {
      code: 'switch (x) { case 1: { break; } case 2: { break; } }',
      errors: [{ messageId: 'requireDefault' }],
    },
  ],
});
