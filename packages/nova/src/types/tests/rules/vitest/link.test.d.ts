import type { Shared_ActiveVitest_Factory } from '../../../shared.d.ts';

/**
 * Tests - Rules - Vitest - Link.
 *
 * @since 0.20.0
 */
export type Tests_Rules_Vitest_Link_FixtureRoot = string;

export type Tests_Rules_Vitest_Link_DocsDir = string;

export type Tests_Rules_Vitest_Link_ResolvedConfig_ProjectRoot = string;

export type Tests_Rules_Vitest_Link_ResolvedConfig_ContentDirs_Docs = string;

export type Tests_Rules_Vitest_Link_ResolvedConfig_ContentDirs_Blog = string | undefined;

export type Tests_Rules_Vitest_Link_ResolvedConfig_ContentDirs = {
  docs: Tests_Rules_Vitest_Link_ResolvedConfig_ContentDirs_Docs;
  blog?: Tests_Rules_Vitest_Link_ResolvedConfig_ContentDirs_Blog;
};

export type Tests_Rules_Vitest_Link_ResolvedConfig_DocsRouteBasePath = string;

export type Tests_Rules_Vitest_Link_ResolvedConfig_BlogRouteBasePath = string;

export type Tests_Rules_Vitest_Link_ResolvedConfig_CategoryRouteSkipPrefix = string;

export type Tests_Rules_Vitest_Link_ResolvedConfig_FileExtensions = string[];

export type Tests_Rules_Vitest_Link_ResolvedConfig = {
  projectRoot: Tests_Rules_Vitest_Link_ResolvedConfig_ProjectRoot;
  contentDirs: Tests_Rules_Vitest_Link_ResolvedConfig_ContentDirs;
  docsRouteBasePath: Tests_Rules_Vitest_Link_ResolvedConfig_DocsRouteBasePath;
  blogRouteBasePath: Tests_Rules_Vitest_Link_ResolvedConfig_BlogRouteBasePath;
  categoryRouteSkipPrefix: Tests_Rules_Vitest_Link_ResolvedConfig_CategoryRouteSkipPrefix;
  fileExtensions: Tests_Rules_Vitest_Link_ResolvedConfig_FileExtensions;
};

export type Tests_Rules_Vitest_Link_GoodFiles = string[];

export type Tests_Rules_Vitest_Link_GoodIndex_ExistingPaths = Set<string>;

export type Tests_Rules_Vitest_Link_GoodIndex_BlogPaths = Set<string>;

export type Tests_Rules_Vitest_Link_GoodIndex_IdPaths = Set<string>;

export type Tests_Rules_Vitest_Link_GoodIndex_FileHeadings = Map<string, Set<string>>;

export type Tests_Rules_Vitest_Link_GoodIndex = {
  existingPaths: Tests_Rules_Vitest_Link_GoodIndex_ExistingPaths;
  blogPaths: Tests_Rules_Vitest_Link_GoodIndex_BlogPaths;
  idPaths: Tests_Rules_Vitest_Link_GoodIndex_IdPaths;
  fileHeadings: Tests_Rules_Vitest_Link_GoodIndex_FileHeadings;
};

export type Tests_Rules_Vitest_Link_OverviewHeadings = Set<string> | undefined;

export type Tests_Rules_Vitest_Link_BadFiles = string[];

export type Tests_Rules_Vitest_Link_BadIndex_ExistingPaths = Set<string>;

export type Tests_Rules_Vitest_Link_BadIndex_BlogPaths = Set<string>;

export type Tests_Rules_Vitest_Link_BadIndex_IdPaths = Set<string>;

export type Tests_Rules_Vitest_Link_BadIndex_FileHeadings = Map<string, Set<string>>;

export type Tests_Rules_Vitest_Link_BadIndex = {
  existingPaths: Tests_Rules_Vitest_Link_BadIndex_ExistingPaths;
  blogPaths: Tests_Rules_Vitest_Link_BadIndex_BlogPaths;
  idPaths: Tests_Rules_Vitest_Link_BadIndex_IdPaths;
  fileHeadings: Tests_Rules_Vitest_Link_BadIndex_FileHeadings;
};

export type Tests_Rules_Vitest_Link_BadIts = Map<string, Shared_ActiveVitest_Factory>;

export type Tests_Rules_Vitest_Link_BadSentinel_Describe = (name: string, factory: Shared_ActiveVitest_Factory) => void;

export type Tests_Rules_Vitest_Link_BadSentinel_It = (name: string, factory: Shared_ActiveVitest_Factory) => void;

export type Tests_Rules_Vitest_Link_BadSentinel = {
  describe: Tests_Rules_Vitest_Link_BadSentinel_Describe;
  it: Tests_Rules_Vitest_Link_BadSentinel_It;
};

export type Tests_Rules_Vitest_Link_OverviewFactory = Shared_ActiveVitest_Factory | undefined;

export type Tests_Rules_Vitest_Link_BrokenFactory = Shared_ActiveVitest_Factory | undefined;
