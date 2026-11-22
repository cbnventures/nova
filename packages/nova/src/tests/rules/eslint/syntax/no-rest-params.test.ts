import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoRestParams } from '../../../../rules/eslint/index.js';

import type { Tests_Rules_Eslint_Syntax_NoRestParams_RuleTester } from '../../../../types/tests/rules/eslint/syntax/no-rest-params.test.d.ts';

/**
 * Tests - Rules - ESLint - Syntax - No Rest Params.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: Tests_Rules_Eslint_Syntax_NoRestParams_RuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noRestParams', NoRestParams['rule'], {
  valid: [
    {
      code: 'function log(message, level, context) { console.log(message); }',
    },
    {
      code: 'class Logger { static info(...messages) { console.log(...messages); } }',
      options: [{
        ignoreFiles: [],
        allow: ['Logger.*'],
      }],
    },
    {
      code: 'class Util { static merge(...objects) { return Object.assign({}, ...objects); } }',
      options: [{
        ignoreFiles: [],
        allow: ['Util.merge'],
      }],
    },
    {
      code: 'function log(...args) { console.log(...args); }',
      options: [{
        ignoreFiles: [],
        allow: ['log'],
      }],
    },
    {
      code: 'class Logger { static customize() { return { info(...messages) { console.log(...messages); } }; } }',
      options: [{
        ignoreFiles: [],
        allow: ['Logger.*'],
      }],
    },
    {
      code: 'function log(...args) { console.log(...args); }',
      options: [{
        ignoreFiles: ['ignored-file.ts'],
        allow: [],
      }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: 'class Logger { static info(...messages) { console.log(...messages); } }',
      errors: [{ messageId: 'noRestParams' }],
    },
    {
      code: 'function log(...args) { console.log(args); }',
      errors: [{ messageId: 'noRestParams' }],
    },
    {
      code: 'const sum = (...numbers) => { return numbers.reduce((a, b) => a + b, 0); };',
      errors: [{ messageId: 'noRestParams' }],
    },
    {
      code: 'class Logger { static info(...messages) { console.log(...messages); } }',
      options: [{
        ignoreFiles: [],
        allow: ['Printer.*'],
      }],
      errors: [{ messageId: 'noRestParams' }],
    },
    {
      code: 'class Util { static merge(...objects) { return Object.assign({}, ...objects); } }',
      options: [{
        ignoreFiles: [],
        allow: ['Util.format'],
      }],
      errors: [{ messageId: 'noRestParams' }],
    },
  ],
});
