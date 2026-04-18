import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoAwaitInLoop } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintPatternsNoAwaitInLoopRuleTester } from '../../../../types/tests/rules/eslint/patterns/no-await-in-loop.test.d.ts';

/**
 * Tests - Rules - ESLint - Patterns - No Await In Loop.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintPatternsNoAwaitInLoopRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noAwaitInLoop', NoAwaitInLoop['rule'], {
  valid: [
    {
      code: 'async function f() { const results = await Promise.all(urls.map((url) => fetch(url))); }',
    },
    {
      code: 'async function f() { await fetch("/api"); }',
    },
    {
      code: 'async function f() { for (const item of items) { const fn = async () => { await fetch(item); }; } }',
    },

    // Explicit: allowForOf is true.
    {
      code: 'async function f() { for (const url of urls) { const response = await fetch(url); } }',
      options: [{
        ignoreFiles: [],
        allowForOf: true,
        allowWhile: false,
        allowForIn: false,
        allowFor: false,
      }],
    },

    // Explicit: allowWhile is true.
    {
      code: 'async function f() { while (true) { await sleep(1000); } }',
      options: [{
        ignoreFiles: [],
        allowForOf: false,
        allowWhile: true,
        allowForIn: false,
        allowFor: false,
      }],
    },

    // Explicit: allowWhile is true (do-while).
    {
      code: 'async function f() { do { await sleep(1000); } while (true); }',
      options: [{
        ignoreFiles: [],
        allowForOf: false,
        allowWhile: true,
        allowForIn: false,
        allowFor: false,
      }],
    },

    // Explicit: allowFor is true.
    {
      code: 'async function f() { for (let i = 0; i < 10; i++) { await doWork(i); } }',
      options: [{
        ignoreFiles: [],
        allowForOf: false,
        allowWhile: false,
        allowForIn: false,
        allowFor: true,
      }],
    },

    // Explicit: allowForIn is true.
    {
      code: 'async function f() { for (const key in obj) { await doWork(key); } }',
      options: [{
        ignoreFiles: [],
        allowForOf: false,
        allowWhile: false,
        allowForIn: true,
        allowFor: false,
      }],
    },
    {
      code: 'async function f() { for (let i = 0; i < 10; i++) { await doWork(i); } }',
      options: [{
        ignoreFiles: ['ignored-file.ts'],
        allowForOf: false,
        allowWhile: false,
        allowForIn: false,
        allowFor: false,
      }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [

    // Default: allowFor is false.
    {
      code: 'async function f() { for (let i = 0; i < 10; i++) { await doWork(i); } }',
      errors: [{ messageId: 'noAwaitInLoop' }],
    },

    // Default: allowForIn is false.
    {
      code: 'async function f() { for (const key in obj) { await doWork(key); } }',
      errors: [{ messageId: 'noAwaitInLoop' }],
    },

    // Default: allowForOf is false.
    {
      code: 'async function f() { for (const url of urls) { const response = await fetch(url); } }',
      errors: [{ messageId: 'noAwaitInLoop' }],
    },

    // Default: allowWhile is false.
    {
      code: 'async function f() { while (true) { await sleep(1000); } }',
      errors: [{ messageId: 'noAwaitInLoop' }],
    },

    // Default: allowWhile is false (do-while).
    {
      code: 'async function f() { do { await sleep(1000); } while (true); }',
      errors: [{ messageId: 'noAwaitInLoop' }],
    },

    // Explicit: allowForOf is false.
    {
      code: 'async function f() { for (const url of urls) { const response = await fetch(url); } }',
      options: [{
        ignoreFiles: [],
        allowForOf: false,
        allowWhile: true,
        allowForIn: false,
        allowFor: false,
      }],
      errors: [{ messageId: 'noAwaitInLoop' }],
    },

    // Explicit: allowWhile is false.
    {
      code: 'async function f() { while (true) { await sleep(1000); } }',
      options: [{
        ignoreFiles: [],
        allowForOf: true,
        allowWhile: false,
        allowForIn: false,
        allowFor: false,
      }],
      errors: [{ messageId: 'noAwaitInLoop' }],
    },

    // Explicit: allowWhile is false (do-while).
    {
      code: 'async function f() { do { await sleep(1000); } while (true); }',
      options: [{
        ignoreFiles: [],
        allowForOf: true,
        allowWhile: false,
        allowForIn: false,
        allowFor: false,
      }],
      errors: [{ messageId: 'noAwaitInLoop' }],
    },
  ],
});
