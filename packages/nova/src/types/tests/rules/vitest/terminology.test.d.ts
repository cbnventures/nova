/**
 * Tests - Rules - Vitest - Terminology.
 *
 * @since 0.20.0
 */
export type Tests_Rules_Vitest_Terminology_FixtureRoot = string;

export type Tests_Rules_Vitest_Terminology_DocsDir = string;

export type Tests_Rules_Vitest_Terminology_QuickstartDir = string;

export type Tests_Rules_Vitest_Terminology_TerminologyPath = string;

export type Tests_Rules_Vitest_Terminology_BadRootDir = string;

export type Tests_Rules_Vitest_Terminology_ResolvedConfig_ContentDirs = string[];

export type Tests_Rules_Vitest_Terminology_ResolvedConfig_TerminologyPath = string;

export type Tests_Rules_Vitest_Terminology_ResolvedConfig_ExpectedBase = string;

export type Tests_Rules_Vitest_Terminology_ResolvedConfig_RootDir = string;

export type Tests_Rules_Vitest_Terminology_ResolvedConfig_ComponentName = string;

export type Tests_Rules_Vitest_Terminology_ResolvedConfig_Files = string[];

export type Tests_Rules_Vitest_Terminology_ResolvedConfig = {
  contentDirs: Tests_Rules_Vitest_Terminology_ResolvedConfig_ContentDirs;
  terminologyPath: Tests_Rules_Vitest_Terminology_ResolvedConfig_TerminologyPath;
  expectedBase: Tests_Rules_Vitest_Terminology_ResolvedConfig_ExpectedBase;
  rootDir: Tests_Rules_Vitest_Terminology_ResolvedConfig_RootDir;
  componentName: Tests_Rules_Vitest_Terminology_ResolvedConfig_ComponentName;
  files: Tests_Rules_Vitest_Terminology_ResolvedConfig_Files;
};

export type Tests_Rules_Vitest_Terminology_GoodAnchors = Set<string>;

export type Tests_Rules_Vitest_Terminology_BadAnchors = Set<string>;
