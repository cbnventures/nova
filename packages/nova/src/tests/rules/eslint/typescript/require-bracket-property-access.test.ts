import { join } from 'path';

import tsParser from '@typescript-eslint/parser';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireBracketPropertyAccess } from '../../../../rules/eslint/index.js';

import type {
  TestsRulesEslintTypescriptRequireBracketPropertyAccessCurrentDirectory,
  TestsRulesEslintTypescriptRequireBracketPropertyAccessRuleTester,
  TestsRulesEslintTypescriptRequireBracketPropertyAccessTsconfigRootDirectory,
} from '../../../../types/tests/rules/eslint/typescript/require-bracket-property-access.test.d.ts';

/**
 * Tests - Rules - ESLint - TypeScript - Require Bracket Property Access.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const currentDirectory: TestsRulesEslintTypescriptRequireBracketPropertyAccessCurrentDirectory = process.cwd();
const tsconfigRootDirectory: TestsRulesEslintTypescriptRequireBracketPropertyAccessTsconfigRootDirectory = join(currentDirectory, 'src', 'tests');

const ruleTester: TestsRulesEslintTypescriptRequireBracketPropertyAccessRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parser: tsParser,
    parserOptions: {
      projectService: {
        allowDefaultProject: ['*.ts'],
      },
      tsconfigRootDir: tsconfigRootDirectory,
    },
  },
});

ruleTester.run('requireBracketPropertyAccess', RequireBracketPropertyAccess['rule'], {
  valid: [

    // Bracket notation on plain object — allowed.
    {
      code: 'type Config = { name: string }; const config: Config = { name: "test" }; const x = config[\'name\'];',
    },

    // Method call — dot notation allowed.
    {
      code: 'const arr = [1, 2]; arr.push(3);',
    },

    // Built-in property — dot notation allowed.
    {
      code: 'const arr = [1, 2]; const x = arr.length;',
    },

    // String built-in — dot notation allowed.
    {
      code: 'const s = "hello"; const x = s.length;',
    },

    // Class member — dot notation allowed.
    {
      code: 'class Foo { name = "test"; } const f = new Foo(); const x = f.name;',
    },

    // Private field — dot notation allowed.
    {
      code: 'class Bar { #secret = 1; get value() { return this.#secret; } }',
    },

    // Ignored file — dot notation allowed.
    {
      code: 'type Config = { name: string }; const config: Config = { name: "test" }; const x = config.name;',
      options: [{
        allowedProperties: [], ignoreFiles: ['ignored.ts'],
      }],
      filename: 'ignored.ts',
    },

    // Allowed property — dot notation allowed.
    {
      code: 'type Config = { name: string }; const config: Config = { name: "test" }; const x = config.name;',
      options: [{
        allowedProperties: ['name'], ignoreFiles: [],
      }],
    },

    // Computed access — already bracket.
    {
      code: 'type Config = { name: string }; const config: Config = { name: "test" }; const key = "name"; const x = config[key];',
    },
  ],
  invalid: [

    // Plain object dot access — should use bracket.
    {
      code: 'type Config = { name: string }; const config: Config = { name: "test" }; const x = config.name;',
      errors: [{ messageId: 'requireBracketAccess' }],
      output: 'type Config = { name: string }; const config: Config = { name: "test" }; const x = config[\'name\'];',
    },

    // Interface dot access — should use bracket.
    {
      code: 'interface Settings { timeout: number; } const s: Settings = { timeout: 100 }; const x = s.timeout;',
      errors: [{ messageId: 'requireBracketAccess' }],
      output: 'interface Settings { timeout: number; } const s: Settings = { timeout: 100 }; const x = s[\'timeout\'];',
    },
  ],
});
