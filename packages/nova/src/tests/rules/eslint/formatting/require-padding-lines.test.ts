import { test } from 'node:test';

import { RuleTester } from '@typescript-eslint/rule-tester';

import { requirePaddingLines } from '@/rules/eslint/index.js';

/**
 * Require padding lines.
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

ruleTester.run('requirePaddingLines', requirePaddingLines, {
  valid: [
    {
      code: 'process.exitCode = 1;\n\nreturn;',
    },
    {
      code: 'const x = 1;\n\nfor (const item of items) {}',
    },
    {
      code: 'await fn();\n\nconst x = 1;',
    },
    {
      code: 'const x = 1;\n\nawait fn();',
    },
    {
      code: 'fn();\n\nawait bar();',
    },
    {
      code: 'process.exitCode = 1;\nreturn;',
      options: [{
        exitCodeBeforeReturn: false,
        beforeLoops: true,
        bareAwait: true,
        betweenOperations: true,
        betweenSwitchCases: true,
      }],
    },
    {
      code: 'const x = 1;\nfor (const item of items) {}',
      options: [{
        exitCodeBeforeReturn: true,
        beforeLoops: false,
        bareAwait: true,
        betweenOperations: true,
        betweenSwitchCases: true,
      }],
    },
    {
      code: 'await fn();\nconst x = 1;',
      options: [{
        exitCodeBeforeReturn: true,
        beforeLoops: true,
        bareAwait: false,
        betweenOperations: true,
        betweenSwitchCases: true,
      }],
    },
    {
      code: 'fn();\nawait bar();',
      options: [{
        exitCodeBeforeReturn: true,
        beforeLoops: true,
        bareAwait: true,
        betweenOperations: false,
        betweenSwitchCases: true,
      }],
    },
    {
      code: 'for (const a of items) {}\nfor (const b of items) {}',
    },
    {
      code: 'switch (x) {\n  case 1: {\n    fn();\n    break;\n  }\n\n  case 2: {\n    fn();\n    break;\n  }\n}',
    },
    {
      code: 'switch (x) {\n  case 1:\n  case 2: {\n    fn();\n    break;\n  }\n}',
    },
    {
      code: 'switch (x) {\n  case 1:\n  case 2: {\n    fn();\n    break;\n  }\n\n  default: {\n    fn();\n    break;\n  }\n}',
    },
    {
      code: 'switch (x) {\n  case 1: {\n    fn();\n    break;\n  }\n  case 2: {\n    fn();\n    break;\n  }\n}',
      options: [{
        exitCodeBeforeReturn: true,
        beforeLoops: true,
        bareAwait: true,
        betweenOperations: true,
        betweenSwitchCases: false,
      }],
    },
  ],
  invalid: [
    {
      code: 'function f() { process.exitCode = 1;\nreturn; }',
      errors: [{ messageId: 'exitCodeBeforeReturn' }],
    },
    {
      code: 'const x = 1;\nfor (const item of items) {}',
      errors: [{ messageId: 'beforeLoops' }],
    },
    {
      code: 'async function f() { await fn();\nconst x = 1; }',
      errors: [{ messageId: 'bareAwait' }],
    },
    {
      code: 'async function f() { const x = 1;\nawait fn(); }',
      errors: [{ messageId: 'bareAwait' }],
    },
    {
      code: 'fn();\nawait bar();',
      errors: [{ messageId: 'betweenOperations' }],
    },
    {
      code: 'fn();\nbar();',
      errors: [{ messageId: 'betweenOperations' }],
    },
    {
      code: 'switch (x) {\n  case 1: {\n    fn();\n    break;\n  }\n  case 2: {\n    fn();\n    break;\n  }\n}',
      errors: [{ messageId: 'betweenSwitchCases' }],
    },
    {
      code: 'switch (x) {\n  case 1: {\n    fn();\n    break;\n  }\n  case 2: {\n    fn();\n    break;\n  }\n  default: {\n    fn();\n    break;\n  }\n}',
      errors: [
        { messageId: 'betweenSwitchCases' },
        { messageId: 'betweenSwitchCases' },
      ],
    },
  ],
});
