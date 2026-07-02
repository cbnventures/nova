import type {
  Rules_Vitest_Index_LinkResolvedConfig,
  Rules_Vitest_Index_LinkToggleKey,
} from '../index.d.ts';

/**
 * Rules - Vitest - Link - Rules - Build Link Index.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Link_Rules_BuildLinkIndex_Config = Rules_Vitest_Index_LinkResolvedConfig;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_Index_ExistingPaths = Set<string>;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_Index_BlogPaths = Set<string>;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_Index_IdPaths = Set<string>;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_Index_FileHeadings = Map<string, Set<string>>;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_Index = {
  existingPaths: Rules_Vitest_Link_Rules_BuildLinkIndex_Index_ExistingPaths;
  blogPaths: Rules_Vitest_Link_Rules_BuildLinkIndex_Index_BlogPaths;
  idPaths: Rules_Vitest_Link_Rules_BuildLinkIndex_Index_IdPaths;
  fileHeadings: Rules_Vitest_Link_Rules_BuildLinkIndex_Index_FileHeadings;
};

export type Rules_Vitest_Link_Rules_BuildLinkIndex_Files = string[];

export type Rules_Vitest_Link_Rules_BuildLinkIndex_Returns = Promise<Rules_Vitest_Link_Rules_BuildLinkIndex_Index>;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_DocsDir = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_DocPrefix = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_ExistingPaths = Set<string>;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_BlogPaths = Set<string>;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_IdPaths = Set<string>;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_FileHeadings = Map<string, Set<string>>;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_DocRelativePath = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_DocWithoutExt = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_IndexSuffix = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_FilePath = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_Content = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_IdMatch = RegExpExecArray | null;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_Id = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_Dir = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_IdPath = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_HeadingFilePath = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_HeadingContent = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_Headings = Set<string>;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_MatchCapture = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_Anchor = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_SelfWithoutExt = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_DocMapRelativePath = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_DocMapWithoutExt = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_DocIndexSuffix = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_DocIdMatch = RegExpExecArray | null;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_DocId = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_DocDir = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_DocIdPath = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_SlugMatch = RegExpExecArray | null;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_BlogSlug = string;

export type Rules_Vitest_Link_Rules_BuildLinkIndex_BlogFileName = string;

/**
 * Rules - Vitest - Link - Rules - Collect Prose Links.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Link_Rules_CollectProseLinks_Content = string;

export type Rules_Vitest_Link_Rules_CollectProseLinks_Returns = string[];

export type Rules_Vitest_Link_Rules_CollectProseLinks_Prose = string;

export type Rules_Vitest_Link_Rules_CollectProseLinks_Hrefs = string[];

export type Rules_Vitest_Link_Rules_CollectProseLinks_Href = string;

/**
 * Rules - Vitest - Link - Rules - Internal Blog Anchor Exists.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Config = Rules_Vitest_Index_LinkResolvedConfig;

export type Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Files = string[];

export type Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Index_ExistingPaths = Set<string>;

export type Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Index_BlogPaths = Set<string>;

export type Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Index_IdPaths = Set<string>;

export type Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Index_FileHeadings = Map<string, Set<string>>;

export type Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Index = {
  existingPaths: Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Index_ExistingPaths;
  blogPaths: Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Index_BlogPaths;
  idPaths: Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Index_IdPaths;
  fileHeadings: Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Index_FileHeadings;
};

export type Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Enable = 'all' | Rules_Vitest_Index_LinkToggleKey[];

export type Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Returns = Promise<void>;

export type Rules_Vitest_Link_Rules_InternalBlogAnchorExists_BlogPrefix = string;

export type Rules_Vitest_Link_Rules_InternalBlogAnchorExists_FilePath = string;

export type Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Content = string;

export type Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Hrefs = string[];

export type Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Failures = string[];

export type Rules_Vitest_Link_Rules_InternalBlogAnchorExists_PathPartValue = string;

export type Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Anchor = string;

export type Rules_Vitest_Link_Rules_InternalBlogAnchorExists_BlogPath = string;

export type Rules_Vitest_Link_Rules_InternalBlogAnchorExists_HeadingsLookup = Set<string> | undefined;

/**
 * Rules - Vitest - Link - Rules - Internal Blog Target Exists.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Link_Rules_InternalBlogTargetExists_Config = Rules_Vitest_Index_LinkResolvedConfig;

export type Rules_Vitest_Link_Rules_InternalBlogTargetExists_Files = string[];

export type Rules_Vitest_Link_Rules_InternalBlogTargetExists_Index_ExistingPaths = Set<string>;

export type Rules_Vitest_Link_Rules_InternalBlogTargetExists_Index_BlogPaths = Set<string>;

export type Rules_Vitest_Link_Rules_InternalBlogTargetExists_Index_IdPaths = Set<string>;

export type Rules_Vitest_Link_Rules_InternalBlogTargetExists_Index_FileHeadings = Map<string, Set<string>>;

export type Rules_Vitest_Link_Rules_InternalBlogTargetExists_Index = {
  existingPaths: Rules_Vitest_Link_Rules_InternalBlogTargetExists_Index_ExistingPaths;
  blogPaths: Rules_Vitest_Link_Rules_InternalBlogTargetExists_Index_BlogPaths;
  idPaths: Rules_Vitest_Link_Rules_InternalBlogTargetExists_Index_IdPaths;
  fileHeadings: Rules_Vitest_Link_Rules_InternalBlogTargetExists_Index_FileHeadings;
};

export type Rules_Vitest_Link_Rules_InternalBlogTargetExists_Enable = 'all' | Rules_Vitest_Index_LinkToggleKey[];

export type Rules_Vitest_Link_Rules_InternalBlogTargetExists_Returns = Promise<void>;

export type Rules_Vitest_Link_Rules_InternalBlogTargetExists_BlogPrefix = string;

export type Rules_Vitest_Link_Rules_InternalBlogTargetExists_FilePath = string;

export type Rules_Vitest_Link_Rules_InternalBlogTargetExists_Content = string;

export type Rules_Vitest_Link_Rules_InternalBlogTargetExists_Hrefs = string[];

export type Rules_Vitest_Link_Rules_InternalBlogTargetExists_Failures = string[];

export type Rules_Vitest_Link_Rules_InternalBlogTargetExists_PathPartValue = string;

export type Rules_Vitest_Link_Rules_InternalBlogTargetExists_BlogPath = string;

/**
 * Rules - Vitest - Link - Rules - Internal Doc Anchor Exists.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Link_Rules_InternalDocAnchorExists_Config = Rules_Vitest_Index_LinkResolvedConfig;

export type Rules_Vitest_Link_Rules_InternalDocAnchorExists_Files = string[];

export type Rules_Vitest_Link_Rules_InternalDocAnchorExists_Index_ExistingPaths = Set<string>;

export type Rules_Vitest_Link_Rules_InternalDocAnchorExists_Index_BlogPaths = Set<string>;

export type Rules_Vitest_Link_Rules_InternalDocAnchorExists_Index_IdPaths = Set<string>;

export type Rules_Vitest_Link_Rules_InternalDocAnchorExists_Index_FileHeadings = Map<string, Set<string>>;

export type Rules_Vitest_Link_Rules_InternalDocAnchorExists_Index = {
  existingPaths: Rules_Vitest_Link_Rules_InternalDocAnchorExists_Index_ExistingPaths;
  blogPaths: Rules_Vitest_Link_Rules_InternalDocAnchorExists_Index_BlogPaths;
  idPaths: Rules_Vitest_Link_Rules_InternalDocAnchorExists_Index_IdPaths;
  fileHeadings: Rules_Vitest_Link_Rules_InternalDocAnchorExists_Index_FileHeadings;
};

export type Rules_Vitest_Link_Rules_InternalDocAnchorExists_Enable = 'all' | Rules_Vitest_Index_LinkToggleKey[];

export type Rules_Vitest_Link_Rules_InternalDocAnchorExists_Returns = Promise<void>;

export type Rules_Vitest_Link_Rules_InternalDocAnchorExists_DocPrefix = string;

export type Rules_Vitest_Link_Rules_InternalDocAnchorExists_FilePath = string;

export type Rules_Vitest_Link_Rules_InternalDocAnchorExists_Content = string;

export type Rules_Vitest_Link_Rules_InternalDocAnchorExists_Hrefs = string[];

export type Rules_Vitest_Link_Rules_InternalDocAnchorExists_Failures = string[];

export type Rules_Vitest_Link_Rules_InternalDocAnchorExists_PathPartValue = string;

export type Rules_Vitest_Link_Rules_InternalDocAnchorExists_Anchor = string;

export type Rules_Vitest_Link_Rules_InternalDocAnchorExists_DocPath = string;

export type Rules_Vitest_Link_Rules_InternalDocAnchorExists_SkipPrefix = string;

export type Rules_Vitest_Link_Rules_InternalDocAnchorExists_HeadingsLookup = Set<string> | undefined;

/**
 * Rules - Vitest - Link - Rules - Internal Doc Target Exists.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Link_Rules_InternalDocTargetExists_Config = Rules_Vitest_Index_LinkResolvedConfig;

export type Rules_Vitest_Link_Rules_InternalDocTargetExists_Files = string[];

export type Rules_Vitest_Link_Rules_InternalDocTargetExists_Index_ExistingPaths = Set<string>;

export type Rules_Vitest_Link_Rules_InternalDocTargetExists_Index_BlogPaths = Set<string>;

export type Rules_Vitest_Link_Rules_InternalDocTargetExists_Index_IdPaths = Set<string>;

export type Rules_Vitest_Link_Rules_InternalDocTargetExists_Index_FileHeadings = Map<string, Set<string>>;

export type Rules_Vitest_Link_Rules_InternalDocTargetExists_Index = {
  existingPaths: Rules_Vitest_Link_Rules_InternalDocTargetExists_Index_ExistingPaths;
  blogPaths: Rules_Vitest_Link_Rules_InternalDocTargetExists_Index_BlogPaths;
  idPaths: Rules_Vitest_Link_Rules_InternalDocTargetExists_Index_IdPaths;
  fileHeadings: Rules_Vitest_Link_Rules_InternalDocTargetExists_Index_FileHeadings;
};

export type Rules_Vitest_Link_Rules_InternalDocTargetExists_Enable = 'all' | Rules_Vitest_Index_LinkToggleKey[];

export type Rules_Vitest_Link_Rules_InternalDocTargetExists_Returns = Promise<void>;

export type Rules_Vitest_Link_Rules_InternalDocTargetExists_DocPrefix = string;

export type Rules_Vitest_Link_Rules_InternalDocTargetExists_FilePath = string;

export type Rules_Vitest_Link_Rules_InternalDocTargetExists_Content = string;

export type Rules_Vitest_Link_Rules_InternalDocTargetExists_Hrefs = string[];

export type Rules_Vitest_Link_Rules_InternalDocTargetExists_Failures = string[];

export type Rules_Vitest_Link_Rules_InternalDocTargetExists_PathPartValue = string;

export type Rules_Vitest_Link_Rules_InternalDocTargetExists_DocPath = string;

export type Rules_Vitest_Link_Rules_InternalDocTargetExists_SkipPrefix = string;

/**
 * Rules - Vitest - Link - Rules - Link Content Dirs.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Link_Rules_LinkContentDirs_Config = Rules_Vitest_Index_LinkResolvedConfig;

export type Rules_Vitest_Link_Rules_LinkContentDirs_Returns = string[];

export type Rules_Vitest_Link_Rules_LinkContentDirs_Dirs = string[];

/**
 * Rules - Vitest - Link - Rules - Self Anchor Exists.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Link_Rules_SelfAnchorExists_Config = Rules_Vitest_Index_LinkResolvedConfig;

export type Rules_Vitest_Link_Rules_SelfAnchorExists_Files = string[];

export type Rules_Vitest_Link_Rules_SelfAnchorExists_Index_ExistingPaths = Set<string>;

export type Rules_Vitest_Link_Rules_SelfAnchorExists_Index_BlogPaths = Set<string>;

export type Rules_Vitest_Link_Rules_SelfAnchorExists_Index_IdPaths = Set<string>;

export type Rules_Vitest_Link_Rules_SelfAnchorExists_Index_FileHeadings = Map<string, Set<string>>;

export type Rules_Vitest_Link_Rules_SelfAnchorExists_Index = {
  existingPaths: Rules_Vitest_Link_Rules_SelfAnchorExists_Index_ExistingPaths;
  blogPaths: Rules_Vitest_Link_Rules_SelfAnchorExists_Index_BlogPaths;
  idPaths: Rules_Vitest_Link_Rules_SelfAnchorExists_Index_IdPaths;
  fileHeadings: Rules_Vitest_Link_Rules_SelfAnchorExists_Index_FileHeadings;
};

export type Rules_Vitest_Link_Rules_SelfAnchorExists_Enable = 'all' | Rules_Vitest_Index_LinkToggleKey[];

export type Rules_Vitest_Link_Rules_SelfAnchorExists_Returns = Promise<void>;

export type Rules_Vitest_Link_Rules_SelfAnchorExists_FilePath = string;

export type Rules_Vitest_Link_Rules_SelfAnchorExists_Content = string;

export type Rules_Vitest_Link_Rules_SelfAnchorExists_Hrefs = string[];

export type Rules_Vitest_Link_Rules_SelfAnchorExists_Failures = string[];

export type Rules_Vitest_Link_Rules_SelfAnchorExists_Anchor = string;

export type Rules_Vitest_Link_Rules_SelfAnchorExists_CurrentPath = string;

export type Rules_Vitest_Link_Rules_SelfAnchorExists_HeadingsLookup = Set<string> | undefined;

/**
 * Rules - Vitest - Link - Rules - Skip External And Code Blocks.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Link_Rules_SkipExternalAndCodeBlocks_Enable = 'all' | Rules_Vitest_Index_LinkToggleKey[];

export type Rules_Vitest_Link_Rules_SkipExternalAndCodeBlocks_Returns = void;

export type Rules_Vitest_Link_Rules_SkipExternalAndCodeBlocks_Sample = string;

export type Rules_Vitest_Link_Rules_SkipExternalAndCodeBlocks_Hrefs = string[];

/**
 * Rules - Vitest - Link - Rules - Strip Prose.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Link_Rules_StripProse_Content = string;

export type Rules_Vitest_Link_Rules_StripProse_Returns = string;

export type Rules_Vitest_Link_Rules_StripProse_Lines = string[];

export type Rules_Vitest_Link_Rules_StripProse_InCodeBlock = boolean;

export type Rules_Vitest_Link_Rules_StripProse_ProseLines = string[];
