import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoDestructuring } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintSyntaxNoDestructuringRuleTester } from '../../../../types/tests/rules/eslint/syntax/no-destructuring.test.d.ts';

/**
 * Tests - Rules - ESLint - Syntax - No Destructuring.
 *
 * @since 0.14.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintSyntaxNoDestructuringRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noDestructuring', NoDestructuring['rule'], {
  valid: [
    {
      code: 'items.map((item) => item.name);',
    },
    {
      code: 'const config = getConfig();',
    },
    {
      code: 'const { name } = config;',
      options: [{
        ignoreFiles: [],
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
        ignoreFiles: [],
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
        ignoreFiles: [],
        functionParams: true,
        callbackParams: true,
        forOfLoops: false,
        variableDeclarations: true,
        assignmentExpressions: true,
      }],
    },
    {
      code: 'const { name } = config;',
      options: [{
        ignoreFiles: ['ignored-file.ts'],
        functionParams: true,
        callbackParams: true,
        forOfLoops: true,
        variableDeclarations: true,
        assignmentExpressions: true,
      }],
      filename: '/path/to/ignored-file.ts',
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
      code: 'for (const [key, entry] of Object.entries(obj)) {}',
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
