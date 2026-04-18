import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequirePaddingLines } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintFormattingRequirePaddingLinesRuleTester } from '../../../../types/tests/rules/eslint/formatting/require-padding-lines.test.d.ts';

/**
 * Tests - Rules - ESLint - Formatting - Require Padding Lines.
 *
 * @since 0.14.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintFormattingRequirePaddingLinesRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requirePaddingLines', RequirePaddingLines['rule'], {
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
        ignoreFiles: [],
        exitCodeBeforeReturn: false,
        beforeLineComment: true,
        beforeLoops: true,
        bareAwait: true,
        betweenOperations: true,
        betweenSwitchCases: true,
      }],
    },
    {
      code: 'const x = 1;\nfor (const item of items) {}',
      options: [{
        ignoreFiles: [],
        exitCodeBeforeReturn: true,
        beforeLineComment: true,
        beforeLoops: false,
        bareAwait: true,
        betweenOperations: true,
        betweenSwitchCases: true,
      }],
    },
    {
      code: 'await fn();\nconst x = 1;',
      options: [{
        ignoreFiles: [],
        exitCodeBeforeReturn: true,
        beforeLineComment: true,
        beforeLoops: true,
        bareAwait: false,
        betweenOperations: true,
        betweenSwitchCases: true,
      }],
    },
    {
      code: 'fn();\nawait bar();',
      options: [{
        ignoreFiles: [],
        exitCodeBeforeReturn: true,
        beforeLineComment: true,
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
        ignoreFiles: [],
        exitCodeBeforeReturn: true,
        beforeLineComment: true,
        beforeLoops: true,
        bareAwait: true,
        betweenOperations: true,
        betweenSwitchCases: false,
      }],
    },
    {
      code: 'fn();\nfn();',
    },
    {
      code: 'ok(a);\nok(b);\nok(c);',
    },
    {
      code: 'process.stdout.write(a);\nprocess.stdout.write(b);',
    },
    {
      code: 'async function f() { await fn();\nawait fn(); }',
    },
    {
      code: 'fn();\nawait bar();',
      options: [{
        ignoreFiles: ['ignored-file.ts'], exitCodeBeforeReturn: true, beforeLineComment: true, beforeLoops: true, bareAwait: true, betweenOperations: true, betweenSwitchCases: true,
      }],
      filename: '/path/to/ignored-file.ts',
    },

    // Line comment with blank line before — allowed.
    {
      code: 'const x = 1;\n\n// comment\nconst y = 2;',
    },

    // Line comment after opening brace — allowed.
    {
      code: '{\n// comment\nconst x = 1;\n}',
    },

    // Consecutive line comments — allowed.
    {
      code: '// first\n// second\nconst x = 1;',
    },

    // Trailing comment on code line — allowed.
    {
      code: 'const x = 1; // inline comment\nconst y = 2;',
    },
  ],
  invalid: [

    // Line comment without blank line before — should add one.
    {
      code: 'const x = 1;\n// comment\nconst y = 2;',
      output: 'const x = 1;\n\n// comment\nconst y = 2;',
      errors: [{ messageId: 'beforeLineComment' }],
    },
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
      code: 'process.stdout.write(a);\nprocess.stderr.write(b);',
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
