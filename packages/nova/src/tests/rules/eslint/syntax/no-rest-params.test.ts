import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoRestParams } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintSyntaxNoRestParamsRuleTester } from '../../../../types/tests/rules/eslint/syntax/no-rest-params.test.d.ts';

/**
 * Tests - Rules - ESLint - Syntax - No Rest Params.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintSyntaxNoRestParamsRuleTester = new RuleTester({
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
      code: 'function merge(objects) { return Object.assign({}, ...objects); }',
    },
    {
      code: 'const sum = (numbers) => { return numbers.reduce((a, b) => a + b, 0); };',
    },
    {
      code: 'class Logger { static info(...messages) { console.log(...messages); } }',
      options: [{
        ignoreFiles: [],
        allow: ['Logger.*'],
      }],
    },
    {
      code: 'class Logger { static warn(...messages) { console.warn(...messages); } }',
      options: [{
        ignoreFiles: [],
        allow: ['Logger.*'],
      }],
    },
    {
      code: 'class Logger { static error(...messages) { console.error(...messages); } }',
      options: [{
        ignoreFiles: [],
        allow: ['Logger.*'],
      }],
    },
    {
      code: 'class Logger { static debug(...messages) { console.debug(...messages); } }',
      options: [{
        ignoreFiles: [],
        allow: ['Logger.*'],
      }],
    },
    {
      code: 'class Logger { static dev(...messages) { console.log(...messages); } }',
      options: [{
        ignoreFiles: [],
        allow: ['Logger.*'],
      }],
    },
    {
      code: 'class MyLogger { static info(...messages) { console.log(...messages); } }',
      options: [{
        ignoreFiles: [],
        allow: ['MyLogger.*'],
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
      code: 'class Logger { static info(...messages) { console.log(...messages); } }',
      options: [{
        ignoreFiles: [],
        allow: [],
      }],
      errors: [{ messageId: 'noRestParams' }],
    },
    {
      code: 'function log(...args) { console.log(args); }',
      errors: [{ messageId: 'noRestParams' }],
    },
    {
      code: 'function merge(...objects) { return Object.assign({}, ...objects); }',
      errors: [{ messageId: 'noRestParams' }],
    },
    {
      code: 'const sum = (...numbers) => { return numbers.reduce((a, b) => a + b, 0); };',
      errors: [{ messageId: 'noRestParams' }],
    },
    {
      code: 'class Printer { static print(...args) { console.log(...args); } }',
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
    {
      code: 'class Printer { static customize() { return { info(...messages) { console.log(...messages); } }; } }',
      errors: [{ messageId: 'noRestParams' }],
    },
  ],
});
