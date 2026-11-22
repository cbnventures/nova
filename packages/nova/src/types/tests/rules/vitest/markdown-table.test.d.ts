import type { MarkdownTable } from '../../../../toolkit/index.js';
import type { Shared_ActiveVitest_Factory } from '../../../shared.d.ts';

/**
 * Tests - Rules - Vitest - Markdown Table.
 *
 * @since 0.20.0
 */
export type Tests_Rules_Vitest_MarkdownTable_FixtureRoot = string;

export type Tests_Rules_Vitest_MarkdownTable_DocsDir = string;

export type Tests_Rules_Vitest_MarkdownTable_GoodTable = MarkdownTable;

export type Tests_Rules_Vitest_MarkdownTable_BadRootDir = string;

export type Tests_Rules_Vitest_MarkdownTable_BadIts = Shared_ActiveVitest_Factory[];

export type Tests_Rules_Vitest_MarkdownTable_BadSentinel_Describe = (name: string, factory: Shared_ActiveVitest_Factory) => void;

export type Tests_Rules_Vitest_MarkdownTable_BadSentinel_It = (name: string, factory: Shared_ActiveVitest_Factory) => void;

export type Tests_Rules_Vitest_MarkdownTable_BadSentinel = {
  describe: Tests_Rules_Vitest_MarkdownTable_BadSentinel_Describe;
  it: Tests_Rules_Vitest_MarkdownTable_BadSentinel_It;
};

export type Tests_Rules_Vitest_MarkdownTable_BadFactory = Shared_ActiveVitest_Factory | undefined;
