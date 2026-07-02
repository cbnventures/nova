import type {
  Rules_Vitest_Index_MarkdownTableSuiteConfig,
  Rules_Vitest_Index_MarkdownTableToggleKey,
} from '../index.d.ts';

/**
 * Rules - Vitest - Markdown Table - Register - Register Markdown Table Suite.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_Config = Rules_Vitest_Index_MarkdownTableSuiteConfig;

export type Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_Returns = void;

export type Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_ContentDirs = string[];

export type Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_RootDir = string;

export type Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_FileExtensions = string[];

export type Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_Enable = 'all' | Rules_Vitest_Index_MarkdownTableToggleKey[];

export type Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_Resolved_ContentDirs = string[];

export type Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_Resolved_RootDir = string;

export type Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_Resolved_FileExtensions = string[];

export type Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_Resolved = {
  contentDirs: Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_Resolved_ContentDirs;
  rootDir: Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_Resolved_RootDir;
  fileExtensions: Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_Resolved_FileExtensions;
};
