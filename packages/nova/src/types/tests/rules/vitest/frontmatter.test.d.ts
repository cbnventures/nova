import type { Shared_ActiveVitest_Factory } from '../../../shared.d.ts';

/**
 * Tests - Rules - Vitest - Frontmatter.
 *
 * @since 0.20.0
 */
export type Tests_Rules_Vitest_Frontmatter_FixtureRoot = string;

export type Tests_Rules_Vitest_Frontmatter_DocsDir = string;

/**
 * Tests - Rules - Vitest - Frontmatter - Frontmatter Closed - Fails A File Whose Only Later Triple Dash Is Inside A Line.
 *
 * @since 0.50.0
 */
export type Tests_Rules_Vitest_Frontmatter_FrontmatterClosed_FailsAFileWhoseOnlyLaterTripleDashIsInsideALine_Its = Shared_ActiveVitest_Factory[];

export type Tests_Rules_Vitest_Frontmatter_FrontmatterClosed_FailsAFileWhoseOnlyLaterTripleDashIsInsideALine_Sentinel_Describe = (name: string, factory: Shared_ActiveVitest_Factory) => void;

export type Tests_Rules_Vitest_Frontmatter_FrontmatterClosed_FailsAFileWhoseOnlyLaterTripleDashIsInsideALine_Sentinel_It = (name: string, factory: Shared_ActiveVitest_Factory) => void;

export type Tests_Rules_Vitest_Frontmatter_FrontmatterClosed_FailsAFileWhoseOnlyLaterTripleDashIsInsideALine_Sentinel = {
  describe: Tests_Rules_Vitest_Frontmatter_FrontmatterClosed_FailsAFileWhoseOnlyLaterTripleDashIsInsideALine_Sentinel_Describe;
  it: Tests_Rules_Vitest_Frontmatter_FrontmatterClosed_FailsAFileWhoseOnlyLaterTripleDashIsInsideALine_Sentinel_It;
};

export type Tests_Rules_Vitest_Frontmatter_FrontmatterClosed_FailsAFileWhoseOnlyLaterTripleDashIsInsideALine_ClosedRoot = string;

export type Tests_Rules_Vitest_Frontmatter_FrontmatterClosed_FailsAFileWhoseOnlyLaterTripleDashIsInsideALine_ClosedFactory = Shared_ActiveVitest_Factory | undefined;

export type Tests_Rules_Vitest_Frontmatter_FrontmatterClosed_FailsAFileWhoseOnlyLaterTripleDashIsInsideALine_UnclosedFactory = Shared_ActiveVitest_Factory | undefined;

/**
 * Tests - Rules - Vitest - Frontmatter - Split Frontmatter - Keeps Fields After A Value That Contains A Triple Dash.
 *
 * @since 0.21.0
 */
export type Tests_Rules_Vitest_Frontmatter_SplitFrontmatter_KeepsFieldsAfterAValueThatContainsATripleDash_SplitFrontmatter = string;

export type Tests_Rules_Vitest_Frontmatter_SplitFrontmatter_KeepsFieldsAfterAValueThatContainsATripleDash_SplitBody = string;

export type Tests_Rules_Vitest_Frontmatter_SplitFrontmatter_KeepsFieldsAfterAValueThatContainsATripleDash_Split = {
  frontmatter: Tests_Rules_Vitest_Frontmatter_SplitFrontmatter_KeepsFieldsAfterAValueThatContainsATripleDash_SplitFrontmatter;
  body: Tests_Rules_Vitest_Frontmatter_SplitFrontmatter_KeepsFieldsAfterAValueThatContainsATripleDash_SplitBody;
} | null;
