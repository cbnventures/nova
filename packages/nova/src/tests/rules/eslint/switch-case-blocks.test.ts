import { test } from 'node:test';

import { RuleTester } from '@typescript-eslint/rule-tester';

import { switchCaseBlocks } from '@/rules/eslint/index.js';

/**
 * Switch case blocks.
 *
 * @since 1.0.0
 */
RuleTester.afterAll = () => {};
RuleTester.describe = test;
RuleTester.it = test;

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('switchCaseBlocks', switchCaseBlocks, {
  valid: [
    {
      code: 'switch (x) { case 1: { break; } }',
    },
    {
      code: 'switch (x) { case 1: { console.log("a"); break; } case 2: { break; } }',
    },
    {
      code: 'switch (x) { default: { break; } }',
    },
    {
      code: 'switch (x) { case 1: case 2: { break; } }',
    },
  ],
  invalid: [
    {
      code: 'switch (x) { case 1: console.log("a"); break; }',
      errors: [{ messageId: 'requireBlock' }],
    },
    {
      code: 'switch (x) { default: console.log("a"); break; }',
      errors: [{ messageId: 'requireBlock' }],
    },
    {
      code: 'switch (x) { case 1: { break; } case 2: console.log("b"); break; }',
      errors: [{ messageId: 'requireBlock' }],
    },
  ],
});
