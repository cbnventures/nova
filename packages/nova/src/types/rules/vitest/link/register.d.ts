import type {
  Rules_Vitest_Index_LinkSuiteConfig,
  Rules_Vitest_Index_LinkToggleKey,
} from '../index.d.ts';

/**
 * Rules - Vitest - Link - Register - Register Link Suite.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Link_Register_RegisterLinkSuite_Config = Rules_Vitest_Index_LinkSuiteConfig;

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Returns = void;

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_ProjectRoot = string;

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_ContentDirs_Docs = string;

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_ContentDirs_Blog = string | undefined;

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_ContentDirs = {
  docs: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_ContentDirs_Docs;
  blog?: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_ContentDirs_Blog;
};

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_DocsRouteBasePath = string;

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_BlogRouteBasePath = string;

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_CategoryRouteSkipPrefix = string;

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_FileExtensions = string[];

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Enable = 'all' | Rules_Vitest_Index_LinkToggleKey[];

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Resolved_ProjectRoot = string;

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Resolved_ContentDirs_Docs = string;

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Resolved_ContentDirs_Blog = string | undefined;

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Resolved_ContentDirs = {
  docs: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Resolved_ContentDirs_Docs;
  blog?: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Resolved_ContentDirs_Blog;
};

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Resolved_DocsRouteBasePath = string;

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Resolved_BlogRouteBasePath = string;

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Resolved_CategoryRouteSkipPrefix = string;

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Resolved_FileExtensions = string[];

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Resolved = {
  projectRoot: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Resolved_ProjectRoot;
  contentDirs: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Resolved_ContentDirs;
  docsRouteBasePath: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Resolved_DocsRouteBasePath;
  blogRouteBasePath: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Resolved_BlogRouteBasePath;
  categoryRouteSkipPrefix: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Resolved_CategoryRouteSkipPrefix;
  fileExtensions: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Resolved_FileExtensions;
};

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Files = string[];

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Index_ExistingPaths = Set<string>;

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Index_BlogPaths = Set<string>;

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Index_IdPaths = Set<string>;

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Index_FileHeadings = Map<string, Set<string>>;

export type Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Index = {
  existingPaths: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Index_ExistingPaths;
  blogPaths: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Index_BlogPaths;
  idPaths: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Index_IdPaths;
  fileHeadings: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Index_FileHeadings;
};
