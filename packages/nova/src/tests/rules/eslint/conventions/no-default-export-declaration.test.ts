import tsParser from '@typescript-eslint/parser';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoDefaultExportDeclaration } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintConventionsNoDefaultExportDeclarationRuleTester } from '../../../../types/tests/rules/eslint/conventions/no-default-export-declaration.test.d.ts';

/**
 * Tests - Rules - ESLint - Conventions - No Default Export Declaration.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintConventionsNoDefaultExportDeclarationRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parser: tsParser,
  },
});

ruleTester.run('noDefaultExportDeclaration', NoDefaultExportDeclaration['rule'], {
  valid: [

    // Separate default export — allowed.
    {
      code: 'function Foo() {}\nexport default Foo;',
    },

    // Named export — allowed.
    {
      code: 'export function foo() {}',
    },

    // Named class export — allowed.
    {
      code: 'export class Bar {}',
    },

    // Default export of identifier — allowed.
    {
      code: 'const config = {};\nexport default config;',
    },

    // Default export of anonymous arrow — allowed.
    {
      code: 'export default () => {};',
    },

    // Ignored file — allowed.
    {
      code: 'export default function Foo() {}',
      options: [{ ignoreFiles: ['ignored.ts'] }],
      filename: 'ignored.ts',
    },
  ],
  invalid: [

    // Default export function declaration — should separate.
    {
      code: 'export default function Foo() {}',
      errors: [{ messageId: 'noDefaultExportDeclaration' }],
      output: 'function Foo() {}\nexport default Foo;\n',
    },

    // Default export class declaration — should separate.
    {
      code: 'export default class Bar {}',
      errors: [{ messageId: 'noDefaultExportDeclaration' }],
      output: 'class Bar {}\nexport default Bar;\n',
    },
  ],
});
