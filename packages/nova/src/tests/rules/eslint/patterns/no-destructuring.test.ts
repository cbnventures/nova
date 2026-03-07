import { test } from 'node:test';

import { RuleTester } from '@typescript-eslint/rule-tester';

import { noDestructuring } from '@/rules/eslint/index.js';

/**
 * No destructuring.
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

ruleTester.run('noDestructuring', noDestructuring, {
  valid: [
    {
      code: 'items.map((item) => item.name);',
    },
    {
      code: 'for (const [key, entry] of Object.entries(obj)) {}',
    },
    {
      code: 'const config = getConfig();',
    },
    {
      code: 'const { name } = config;',
      options: [{
        functionParams: true,
        callbackParams: true,
        forOfLoops: true,
        variableDeclarations: false,
        assignmentExpressions: true,
      }],
    },
    {
      code: 'items.map(({ name }) => name);',
      options: [{
        functionParams: true,
        callbackParams: false,
        forOfLoops: true,
        variableDeclarations: true,
        assignmentExpressions: true,
      }],
    },
    {
      code: 'for (const [key, value] of grouped) {}',
      options: [{
        functionParams: true,
        callbackParams: true,
        forOfLoops: false,
        variableDeclarations: true,
        assignmentExpressions: true,
      }],
    },
  ],
  invalid: [
    {
      code: 'items.map(({ name }) => name);',
      errors: [{ messageId: 'noDestructuringCallback' }],
    },
    {
      code: 'items.filter(([a, b]) => a > b);',
      errors: [{ messageId: 'noDestructuringCallback' }],
    },
    {
      code: 'for (const [key, value] of grouped) {}',
      errors: [{ messageId: 'noDestructuringForOf' }],
    },
    {
      code: 'for (const { name } of items) {}',
      errors: [{ messageId: 'noDestructuringForOf' }],
    },
    {
      code: 'const { name } = config;',
      errors: [{ messageId: 'noDestructuringVariable' }],
    },
    {
      code: 'const [first, second] = items;',
      errors: [{ messageId: 'noDestructuringVariable' }],
    },
    {
      code: 'let name; ({ name } = config);',
      errors: [{ messageId: 'noDestructuringAssignment' }],
    },
  ],
});
