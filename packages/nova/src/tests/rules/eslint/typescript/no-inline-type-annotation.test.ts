import { test } from 'node:test';

import tsParser from '@typescript-eslint/parser';
import { RuleTester } from '@typescript-eslint/rule-tester';

import { noInlineTypeAnnotation } from '@/rules/eslint/index.js';

/**
 * No inline type annotation.
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
    parser: tsParser,
  },
});

ruleTester.run('noInlineTypeAnnotation', noInlineTypeAnnotation, {
  valid: [
    {
      code: 'const entries: RunnerParseEntries = [];',
    },
    {
      code: 'const entries: string[] = [];',
      filename: 'src/types/shared.d.ts',
    },
    {
      code: 'let x: string | undefined;',
      filename: 'src/types/cli/runner.d.ts',
    },
    {
      code: 'function f(x: MyType): ReturnType {}',
    },
  ],
  invalid: [
    {
      code: 'const entries: string[] = [];',
      errors: [{ messageId: 'useNamedType' }],
    },
    {
      code: 'let x: string | undefined;',
      errors: [{ messageId: 'useNamedType' }],
    },
    {
      code: 'const m: Map<string, number> = new Map();',
      errors: [{ messageId: 'useNamedType' }],
    },
    {
      code: 'const name: string = \'\';',
      errors: [{ messageId: 'useNamedType' }],
    },
    {
      code: 'const x: { name: string } = { name: \'test\' };',
      errors: [{ messageId: 'useNamedType' }],
    },
  ],
});
