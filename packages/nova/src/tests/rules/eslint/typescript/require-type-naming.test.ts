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

    // Next.js catch-all route segment — unwrapped to "not-found".
    {
      code: 'export type AppNotFoundLayoutProps = string;',
      filename: '/project/src/types/app/[...not-found]/layout.d.ts',
    },
    // Next.js dynamic segment.
    {
      code: 'export type AppIdProfileReturns = void;',
      filename: '/project/src/types/app/[id]/profile.d.ts',
    },
    // Next.js optional catch-all.
    {
      code: 'export type AppSlugPageProps = string;',
      filename: '/project/src/types/app/[[...slug]]/page.d.ts',
    },
    // Next.js route group — contributes to hierarchy.
    {
      code: 'export type AppMarketingLandingProps = string;',
      filename: '/project/src/types/app/(marketing)/landing.d.ts',
    },
    // Next.js parallel route — contributes to hierarchy.
    {
      code: 'export type AppModalSettingsProps = string;',
      filename: '/project/src/types/app/@modal/settings.d.ts',
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

    // Catch-all with wrong prefix — should error.
    {
      code: 'export type WrongPrefix = string;',
      filename: '/project/src/types/app/[...not-found]/layout.d.ts',
      errors: [{ messageId: 'typeNamingPrefix' }],
    },

    // Digit-leading directory — dedicated diagnostic, prefix is never valid.
    {
      code: 'export type _2faAuth = string;',
      filename: '/project/src/types/2fa/auth.d.ts',
      errors: [{
        messageId: 'invalidIdentifierPrefix',
        data: {
          segment: '2fa',
          prefix: '2faAuth',
        },
      }],
    },
  ],
});
