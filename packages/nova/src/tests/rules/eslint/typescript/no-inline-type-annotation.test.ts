import tsParser from '@typescript-eslint/parser';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoInlineTypeAnnotation } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintTypescriptNoInlineTypeAnnotationRuleTester } from '../../../../types/tests/rules/eslint/typescript/no-inline-type-annotation.test.d.ts';

/**
 * Tests - Rules - ESLint - TypeScript - No Inline Type Annotation.
 *
 * @since 0.14.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintTypescriptNoInlineTypeAnnotationRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parser: tsParser,
  },
});

ruleTester.run('noInlineTypeAnnotation', NoInlineTypeAnnotation['rule'], {
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

    // VariableDeclarator: top-level declarations are allowed.
    {
      code: 'const items = [1, 2, 3];',
    },

    // VariableDeclarator: for...of loop variables are allowed.
    {
      code: 'function f() { for (const item of items) {} }',
    },

    // VariableDeclarator: for loop index variables are allowed.
    {
      code: 'function f() { for (let i = 0; i < 10; i += 1) {} }',
    },

    // VariableDeclarator: ignored files.
    {
      code: 'function f() { const x = getValue(); }',
      options: [{ ignoreFiles: ['ignored.ts'] }],
      filename: '/path/to/ignored.ts',
    },

    // VariableDeclarator: already has a type annotation.
    {
      code: 'function f() { const x: MyType = getValue(); }',
    },

    // VariableDeclarator: destructuring is skipped.
    {
      code: 'function f() { const { a, b } = getValue(); }',
    },

    // TSAsExpression: as const — allowed.
    {
      code: 'function f() { const x: MyType = \'left\' as const; }',
    },

    // TSAsExpression: as NamedType (no generic args) — allowed.
    {
      code: 'function f() { const x: MyType = getValue() as SomeType; }',
    },

    // TSAsExpression: as NamedType<T> where T is enclosing type param — allowed (dependency).
    {
      code: 'function f<T>() { const x: MyType = getValue() as SomeType<T>; }',
    },

    // TSAsExpression: as Record<string, unknown> in .d.ts file — skipped.
    {
      code: 'function f() { const x: MyType = getValue() as Record<string, unknown>; }',
      filename: 'src/types/shared.d.ts',
    },

    // TSAsExpression: as Record<string, unknown> in ignored file — skipped.
    {
      code: 'function f() { const x: MyType = getValue() as Record<string, unknown>; }',
      options: [{ ignoreFiles: ['ignored.ts'] }],
      filename: '/path/to/ignored.ts',
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
      errors: [
        { messageId: 'useNamedType' },
        { messageId: 'useNamedType' },
      ],
    },

    // VariableDeclarator: const inside function body without type annotation.
    {
      code: 'function f() { const x = getValue(); }',
      errors: [{ messageId: 'requireTypeAnnotation' }],
    },

    // VariableDeclarator: let inside function body without type annotation.
    {
      code: 'function f() { let x = getValue(); }',
      errors: [{ messageId: 'requireTypeAnnotation' }],
    },

    // VariableDeclarator: inside arrow function.
    {
      code: 'const f = () => { const x = getValue(); };',
      errors: [{ messageId: 'requireTypeAnnotation' }],
    },

    // TSAsExpression: as Record<string, unknown> — concrete generic args.
    {
      code: 'function f() { const x: MyType = getValue() as Record<string, unknown>; }',
      errors: [{ messageId: 'useNamedType' }],
    },

    // TSAsExpression: as Map<string, number> — concrete generic args.
    {
      code: 'function f() { const x: MyType = getValue() as Map<string, number>; }',
      errors: [{ messageId: 'useNamedType' }],
    },

    // TSAsExpression: as { name: string } — inline object type (2 errors: the object literal + the inner `: string`).
    {
      code: 'function f() { const x: MyType = getValue() as { name: string }; }',
      errors: [
        { messageId: 'useNamedType' },
        { messageId: 'useNamedType' },
      ],
    },

    // TSAsExpression: as string[] — inline array type.
    {
      code: 'function f() { const x: MyType = getValue() as string[]; }',
      errors: [{ messageId: 'useNamedType' }],
    },

    // TSAsExpression: as (string | number) — inline union type.
    {
      code: 'function f() { const x: MyType = getValue() as (string | number); }',
      errors: [{ messageId: 'useNamedType' }],
    },
  ],
});
