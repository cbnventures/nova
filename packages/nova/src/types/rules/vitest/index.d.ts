import type { Shared_TypeDeclarationDtsMapping } from '../../shared.d.ts';

/**
 * Rules - Vitest - Index - Dotenv Resolved Config.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_DotenvResolvedConfig_RootDir = string;

export type Rules_Vitest_Index_DotenvResolvedConfig_EnvPaths = string[];

export type Rules_Vitest_Index_DotenvResolvedConfig_Enable = Rules_Vitest_Index_SuiteEnable<Rules_Vitest_Index_DotenvToggleKey>;

export type Rules_Vitest_Index_DotenvResolvedConfig = {
  rootDir: Rules_Vitest_Index_DotenvResolvedConfig_RootDir;
  envPaths: Rules_Vitest_Index_DotenvResolvedConfig_EnvPaths;
  enable: Rules_Vitest_Index_DotenvResolvedConfig_Enable;
};

/**
 * Rules - Vitest - Index - Dotenv Suite Config.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_DotenvSuiteConfig_RootDir = string;

export type Rules_Vitest_Index_DotenvSuiteConfig_EnvPaths = string[];

export type Rules_Vitest_Index_DotenvSuiteConfig_Enable = Rules_Vitest_Index_SuiteEnable<Rules_Vitest_Index_DotenvToggleKey>;

export type Rules_Vitest_Index_DotenvSuiteConfig = {
  rootDir?: Rules_Vitest_Index_DotenvSuiteConfig_RootDir;
  envPaths?: Rules_Vitest_Index_DotenvSuiteConfig_EnvPaths;
  enable: Rules_Vitest_Index_DotenvSuiteConfig_Enable;
};

/**
 * Rules - Vitest - Index - Dotenv Toggle Key.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_DotenvToggleKey = 'values-double-quoted';

/**
 * Rules - Vitest - Index - Frontmatter Resolved Config.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_FrontmatterResolvedConfig_RequiredFields = string[];

export type Rules_Vitest_Index_FrontmatterResolvedConfig_RequiredBlogFields = string[];

export type Rules_Vitest_Index_FrontmatterResolvedConfig_ContentDirs = string[];

export type Rules_Vitest_Index_FrontmatterResolvedConfig_BlogDir = string;

export type Rules_Vitest_Index_FrontmatterResolvedConfig_IndexSlug = string | null;

export type Rules_Vitest_Index_FrontmatterResolvedConfig_PlaceholderSentinel = string | undefined;

export type Rules_Vitest_Index_FrontmatterResolvedConfig_PlaceholderBodyPrefix = string | undefined;

export type Rules_Vitest_Index_FrontmatterResolvedConfig_RootDir = string;

export type Rules_Vitest_Index_FrontmatterResolvedConfig_Files = string[];

export type Rules_Vitest_Index_FrontmatterResolvedConfig = {
  requiredFields: Rules_Vitest_Index_FrontmatterResolvedConfig_RequiredFields;
  requiredBlogFields: Rules_Vitest_Index_FrontmatterResolvedConfig_RequiredBlogFields;
  contentDirs: Rules_Vitest_Index_FrontmatterResolvedConfig_ContentDirs;
  blogDir: Rules_Vitest_Index_FrontmatterResolvedConfig_BlogDir;
  indexSlug: Rules_Vitest_Index_FrontmatterResolvedConfig_IndexSlug;
  placeholderSentinel: Rules_Vitest_Index_FrontmatterResolvedConfig_PlaceholderSentinel;
  placeholderBodyPrefix: Rules_Vitest_Index_FrontmatterResolvedConfig_PlaceholderBodyPrefix;
  rootDir: Rules_Vitest_Index_FrontmatterResolvedConfig_RootDir;
  files: Rules_Vitest_Index_FrontmatterResolvedConfig_Files;
};

/**
 * Rules - Vitest - Index - Frontmatter Suite Config.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_FrontmatterSuiteConfig_RequiredFields = string[];

export type Rules_Vitest_Index_FrontmatterSuiteConfig_RequiredBlogFields = string[];

export type Rules_Vitest_Index_FrontmatterSuiteConfig_ContentDirs = string[];

export type Rules_Vitest_Index_FrontmatterSuiteConfig_BlogDir = string;

export type Rules_Vitest_Index_FrontmatterSuiteConfig_IndexSlug = string | null;

export type Rules_Vitest_Index_FrontmatterSuiteConfig_PlaceholderSentinel = string;

export type Rules_Vitest_Index_FrontmatterSuiteConfig_PlaceholderBodyPrefix = string;

export type Rules_Vitest_Index_FrontmatterSuiteConfig_RootDir = string;

export type Rules_Vitest_Index_FrontmatterSuiteConfig_Enable = Rules_Vitest_Index_SuiteEnable<Rules_Vitest_Index_FrontmatterToggleKey>;

export type Rules_Vitest_Index_FrontmatterSuiteConfig = {
  requiredFields: Rules_Vitest_Index_FrontmatterSuiteConfig_RequiredFields;
  requiredBlogFields?: Rules_Vitest_Index_FrontmatterSuiteConfig_RequiredBlogFields;
  contentDirs?: Rules_Vitest_Index_FrontmatterSuiteConfig_ContentDirs;
  blogDir?: Rules_Vitest_Index_FrontmatterSuiteConfig_BlogDir;
  indexSlug?: Rules_Vitest_Index_FrontmatterSuiteConfig_IndexSlug;
  placeholderSentinel?: Rules_Vitest_Index_FrontmatterSuiteConfig_PlaceholderSentinel;
  placeholderBodyPrefix?: Rules_Vitest_Index_FrontmatterSuiteConfig_PlaceholderBodyPrefix;
  rootDir?: Rules_Vitest_Index_FrontmatterSuiteConfig_RootDir;
  enable: Rules_Vitest_Index_FrontmatterSuiteConfig_Enable;
};

/**
 * Rules - Vitest - Index - Frontmatter Toggle Key.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_FrontmatterToggleKey =
  | 'frontmatter-present'
  | 'frontmatter-closed'
  | 'required-fields-present-docs'
  | 'required-fields-present-blog'
  | 'id-matches-filename'
  | 'description-not-placeholder'
  | 'keywords-not-placeholder'
  | 'keywords-not-empty'
  | 'tags-not-placeholder'
  | 'tags-not-empty'
  | 'placeholder-pages-warn-not-fail';

/**
 * Rules - Vitest - Index - Link Resolved Config.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_LinkResolvedConfig_ProjectRoot = string;

export type Rules_Vitest_Index_LinkResolvedConfig_ContentDirsDocs = string;

export type Rules_Vitest_Index_LinkResolvedConfig_ContentDirsBlog = string | undefined;

export type Rules_Vitest_Index_LinkResolvedConfig_ContentDirs = {
  docs: Rules_Vitest_Index_LinkResolvedConfig_ContentDirsDocs;
  blog?: Rules_Vitest_Index_LinkResolvedConfig_ContentDirsBlog;
};

export type Rules_Vitest_Index_LinkResolvedConfig_DocsRouteBasePath = string;

export type Rules_Vitest_Index_LinkResolvedConfig_BlogRouteBasePath = string;

export type Rules_Vitest_Index_LinkResolvedConfig_CategoryRouteSkipPrefix = string;

export type Rules_Vitest_Index_LinkResolvedConfig_FileExtensions = string[];

export type Rules_Vitest_Index_LinkResolvedConfig = {
  projectRoot: Rules_Vitest_Index_LinkResolvedConfig_ProjectRoot;
  contentDirs: Rules_Vitest_Index_LinkResolvedConfig_ContentDirs;
  docsRouteBasePath: Rules_Vitest_Index_LinkResolvedConfig_DocsRouteBasePath;
  blogRouteBasePath: Rules_Vitest_Index_LinkResolvedConfig_BlogRouteBasePath;
  categoryRouteSkipPrefix: Rules_Vitest_Index_LinkResolvedConfig_CategoryRouteSkipPrefix;
  fileExtensions: Rules_Vitest_Index_LinkResolvedConfig_FileExtensions;
};

/**
 * Rules - Vitest - Index - Link Suite Config.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_LinkSuiteConfig_ProjectRoot = string;

export type Rules_Vitest_Index_LinkSuiteConfig_ContentDirsDocs = string;

export type Rules_Vitest_Index_LinkSuiteConfig_ContentDirsBlog = string;

export type Rules_Vitest_Index_LinkSuiteConfig_ContentDirs = {
  docs: Rules_Vitest_Index_LinkSuiteConfig_ContentDirsDocs;
  blog?: Rules_Vitest_Index_LinkSuiteConfig_ContentDirsBlog;
};

export type Rules_Vitest_Index_LinkSuiteConfig_DocsRouteBasePath = string;

export type Rules_Vitest_Index_LinkSuiteConfig_BlogRouteBasePath = string;

export type Rules_Vitest_Index_LinkSuiteConfig_CategoryRouteSkipPrefix = string;

export type Rules_Vitest_Index_LinkSuiteConfig_FileExtensions = string[];

export type Rules_Vitest_Index_LinkSuiteConfig_Enable = Rules_Vitest_Index_SuiteEnable<Rules_Vitest_Index_LinkToggleKey>;

export type Rules_Vitest_Index_LinkSuiteConfig = {
  projectRoot?: Rules_Vitest_Index_LinkSuiteConfig_ProjectRoot;
  contentDirs?: Rules_Vitest_Index_LinkSuiteConfig_ContentDirs;
  docsRouteBasePath?: Rules_Vitest_Index_LinkSuiteConfig_DocsRouteBasePath;
  blogRouteBasePath?: Rules_Vitest_Index_LinkSuiteConfig_BlogRouteBasePath;
  categoryRouteSkipPrefix?: Rules_Vitest_Index_LinkSuiteConfig_CategoryRouteSkipPrefix;
  fileExtensions?: Rules_Vitest_Index_LinkSuiteConfig_FileExtensions;
  enable: Rules_Vitest_Index_LinkSuiteConfig_Enable;
};

/**
 * Rules - Vitest - Index - Link Toggle Key.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_LinkToggleKey =
  | 'link-internal-doc-target-exists'
  | 'link-internal-doc-anchor-exists'
  | 'link-internal-blog-target-exists'
  | 'link-internal-blog-anchor-exists'
  | 'link-self-anchor-exists'
  | 'link-skip-external-and-code-blocks';

/**
 * Rules - Vitest - Index - Markdown Table Resolved Config.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_MarkdownTableResolvedConfig_ContentDirs = string[];

export type Rules_Vitest_Index_MarkdownTableResolvedConfig_RootDir = string;

export type Rules_Vitest_Index_MarkdownTableResolvedConfig_FileExtensions = string[];

export type Rules_Vitest_Index_MarkdownTableResolvedConfig = {
  contentDirs: Rules_Vitest_Index_MarkdownTableResolvedConfig_ContentDirs;
  rootDir: Rules_Vitest_Index_MarkdownTableResolvedConfig_RootDir;
  fileExtensions: Rules_Vitest_Index_MarkdownTableResolvedConfig_FileExtensions;
};

/**
 * Rules - Vitest - Index - Markdown Table Suite Config.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_MarkdownTableSuiteConfig_ContentDirs = string[];

export type Rules_Vitest_Index_MarkdownTableSuiteConfig_RootDir = string;

export type Rules_Vitest_Index_MarkdownTableSuiteConfig_FileExtensions = string[];

export type Rules_Vitest_Index_MarkdownTableSuiteConfig_Enable = Rules_Vitest_Index_SuiteEnable<Rules_Vitest_Index_MarkdownTableToggleKey>;

export type Rules_Vitest_Index_MarkdownTableSuiteConfig = {
  contentDirs?: Rules_Vitest_Index_MarkdownTableSuiteConfig_ContentDirs;
  rootDir?: Rules_Vitest_Index_MarkdownTableSuiteConfig_RootDir;
  fileExtensions?: Rules_Vitest_Index_MarkdownTableSuiteConfig_FileExtensions;
  enable: Rules_Vitest_Index_MarkdownTableSuiteConfig_Enable;
};

/**
 * Rules - Vitest - Index - Markdown Table Toggle Key.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_MarkdownTableToggleKey = 'tables-match-markdowntable-output';

/**
 * Rules - Vitest - Index - Suite Base Config.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_SuiteBaseConfig_RootDir = string;

export type Rules_Vitest_Index_SuiteBaseConfig<ToggleKey extends string> = {
  rootDir?: Rules_Vitest_Index_SuiteBaseConfig_RootDir;
  enable: Rules_Vitest_Index_SuiteEnable<ToggleKey>;
};

/**
 * Rules - Vitest - Index - Suite Enable.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_SuiteEnable<ToggleKey extends string> = 'all' | ToggleKey[];

/**
 * Rules - Vitest - Index - Terminology Resolved Config.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_TerminologyResolvedConfig_ContentDirs = string[];

export type Rules_Vitest_Index_TerminologyResolvedConfig_TerminologyPath = string;

export type Rules_Vitest_Index_TerminologyResolvedConfig_ExpectedBase = string;

export type Rules_Vitest_Index_TerminologyResolvedConfig_RootDir = string;

export type Rules_Vitest_Index_TerminologyResolvedConfig_ComponentName = string;

export type Rules_Vitest_Index_TerminologyResolvedConfig_Files = string[];

export type Rules_Vitest_Index_TerminologyResolvedConfig = {
  contentDirs: Rules_Vitest_Index_TerminologyResolvedConfig_ContentDirs;
  terminologyPath: Rules_Vitest_Index_TerminologyResolvedConfig_TerminologyPath;
  expectedBase: Rules_Vitest_Index_TerminologyResolvedConfig_ExpectedBase;
  rootDir: Rules_Vitest_Index_TerminologyResolvedConfig_RootDir;
  componentName: Rules_Vitest_Index_TerminologyResolvedConfig_ComponentName;
  files: Rules_Vitest_Index_TerminologyResolvedConfig_Files;
};

/**
 * Rules - Vitest - Index - Terminology Suite Config.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_TerminologySuiteConfig_ContentDirs = string[];

export type Rules_Vitest_Index_TerminologySuiteConfig_TerminologyPath = string;

export type Rules_Vitest_Index_TerminologySuiteConfig_ExpectedBase = string;

export type Rules_Vitest_Index_TerminologySuiteConfig_RootDir = string;

export type Rules_Vitest_Index_TerminologySuiteConfig_ComponentName = string;

export type Rules_Vitest_Index_TerminologySuiteConfig_Enable = Rules_Vitest_Index_SuiteEnable<Rules_Vitest_Index_TerminologyToggleKey>;

export type Rules_Vitest_Index_TerminologySuiteConfig = {
  contentDirs?: Rules_Vitest_Index_TerminologySuiteConfig_ContentDirs;
  terminologyPath?: Rules_Vitest_Index_TerminologySuiteConfig_TerminologyPath;
  expectedBase?: Rules_Vitest_Index_TerminologySuiteConfig_ExpectedBase;
  rootDir?: Rules_Vitest_Index_TerminologySuiteConfig_RootDir;
  componentName?: Rules_Vitest_Index_TerminologySuiteConfig_ComponentName;
  enable: Rules_Vitest_Index_TerminologySuiteConfig_Enable;
};

/**
 * Rules - Vitest - Index - Terminology Toggle Key.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_TerminologyToggleKey =
  | 'terminology-title-attr-present'
  | 'terminology-to-attr-present'
  | 'terminology-children-nonempty'
  | 'terminology-to-points-to-base'
  | 'terminology-anchor-resolves'
  | 'terminology-component-validation';

/**
 * Rules - Vitest - Index - Type Declaration Resolved Config.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_TypeDeclarationResolvedConfig_PackageRoot = string;

export type Rules_Vitest_Index_TypeDeclarationResolvedConfig_TypeRoots = string[];

export type Rules_Vitest_Index_TypeDeclarationResolvedConfig_StandaloneTypeFiles = string[];

export type Rules_Vitest_Index_TypeDeclarationResolvedConfig_Mapping = Shared_TypeDeclarationDtsMapping;

export type Rules_Vitest_Index_TypeDeclarationResolvedConfig = {
  packageRoot: Rules_Vitest_Index_TypeDeclarationResolvedConfig_PackageRoot;
  typeRoots: Rules_Vitest_Index_TypeDeclarationResolvedConfig_TypeRoots;
  standaloneTypeFiles: Rules_Vitest_Index_TypeDeclarationResolvedConfig_StandaloneTypeFiles;
  mapping: Rules_Vitest_Index_TypeDeclarationResolvedConfig_Mapping;
};

/**
 * Rules - Vitest - Index - Type Declaration Suite Config.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_TypeDeclarationSuiteConfig_PackageRoot = string;

export type Rules_Vitest_Index_TypeDeclarationSuiteConfig_TypeRoots = string[];

export type Rules_Vitest_Index_TypeDeclarationSuiteConfig_StandaloneTypeFiles = string[];

export type Rules_Vitest_Index_TypeDeclarationSuiteConfig_Mapping = Shared_TypeDeclarationDtsMapping;

export type Rules_Vitest_Index_TypeDeclarationSuiteConfig_Enable = Rules_Vitest_Index_SuiteEnable<Rules_Vitest_Index_TypeDeclarationToggleKey>;

export type Rules_Vitest_Index_TypeDeclarationSuiteConfig = {
  packageRoot?: Rules_Vitest_Index_TypeDeclarationSuiteConfig_PackageRoot;
  typeRoots?: Rules_Vitest_Index_TypeDeclarationSuiteConfig_TypeRoots;
  standaloneTypeFiles?: Rules_Vitest_Index_TypeDeclarationSuiteConfig_StandaloneTypeFiles;
  mapping?: Rules_Vitest_Index_TypeDeclarationSuiteConfig_Mapping;
  enable: Rules_Vitest_Index_TypeDeclarationSuiteConfig_Enable;
};

/**
 * Rules - Vitest - Index - Type Declaration Toggle Key.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Index_TypeDeclarationToggleKey =
  | 'inspector-cross-section-references'
  | 'inspector-section-alphabetical'
  | 'inspector-first-come-first-serve-order'
  | 'inspector-object-property-types'
  | 'inspector-section-coverage'
  | 'inspector-variable-type-symmetry'
  | 'inspector-identifier-vs-filename'
  | 'inspector-filename-validation'
  | 'inspector-standalone-type-files';
