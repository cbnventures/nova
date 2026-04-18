import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireTypeNaming } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintTypescriptRequireTypeNamingRuleTester } from '../../../../types/tests/rules/eslint/typescript/require-type-naming.test.d.ts';

/**
 * Tests - Rules - ESLint - TypeScript - Require Type Naming.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintTypescriptRequireTypeNamingRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireTypeNaming', RequireTypeNaming['rule'], {
  valid: [
    {
      code: 'export type CliUtilityChangelogContext = string;',
      filename: '/project/src/types/cli/utility/changelog.d.ts',
    },
    {
      code: 'export type CliUtilityChangelogReturns = void;',
      filename: '/project/src/types/cli/utility/changelog.d.ts',
    },
    {
      code: 'export type MyType = string;',
      filename: '/project/src/not-a-dts-file.ts',
    },
    {
      code: 'export type BadName = string;',
      filename: '/project/src/types/cli/utility/changelog.d.ts',
      options: [{ ignoreFiles: ['changelog.d.ts'] }],
    },

    // PascalCase filename — MDXComponents normalized to ThemeMdxComponents.
    {
      code: 'export type ThemeMdxComponentsOverrides = string;',
      filename: '/project/src/types/theme/MDXComponents.d.ts',
    },

    // PascalCase filename — single word stays PascalCase.
    {
      code: 'export type ThemeLayoutConfig = string;',
      filename: '/project/src/types/theme/Layout.d.ts',
    },
  ],
  invalid: [
    {
      code: 'export type BadName = string;',
      filename: '/project/src/types/cli/utility/changelog.d.ts',
      errors: [{ messageId: 'typeNamingPrefix' }],
    },
    {
      code: 'export type WrongPrefix = void;',
      filename: '/project/src/types/rules/eslint/formatting/require-padding-lines.d.ts',
      errors: [{ messageId: 'typeNamingPrefix' }],
    },

    // PascalCase filename — raw MDX uppercase should be rejected.
    {
      code: 'export type ThemeMDXComponentsOverrides = string;',
      filename: '/project/src/types/theme/MDXComponents.d.ts',
      errors: [{ messageId: 'typeNamingPrefix' }],
    },
  ],
});
