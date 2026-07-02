import type {
  Rules_Vitest_Index_FrontmatterResolvedConfig,
  Rules_Vitest_Index_FrontmatterToggleKey,
} from '../index.d.ts';

/**
 * Rules - Vitest - Frontmatter - Rules - Description Not Placeholder.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Config = Rules_Vitest_Index_FrontmatterResolvedConfig;

export type Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Enable = 'all' | Rules_Vitest_Index_FrontmatterToggleKey[];

export type Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Returns = Promise<void>;

export type Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Sentinel = string | undefined;

export type Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Files = string[];

export type Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_IsBlogPost = boolean;

export type Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_FilePath = string;

export type Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Content = string;

export type Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Split_Frontmatter = string;

export type Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Split_Body = string;

export type Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Split = {
  frontmatter: Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Split_Frontmatter;
  body: Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Split_Body;
} | null;

export type Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Frontmatter = string;

export type Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Body = string;

export type Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_DescMatch = RegExpExecArray | null;

export type Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Failures = string[];

export type Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_IsPlaceholder = boolean;

/**
 * Rules - Vitest - Frontmatter - Rules - Frontmatter Closed.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_Config = Rules_Vitest_Index_FrontmatterResolvedConfig;

export type Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_Enable = 'all' | Rules_Vitest_Index_FrontmatterToggleKey[];

export type Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_Returns = Promise<void>;

export type Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_Files = string[];

export type Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_FilePath = string;

export type Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_Content = string;

export type Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_EndIndex = number;

/**
 * Rules - Vitest - Frontmatter - Rules - Frontmatter Present.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_Config = Rules_Vitest_Index_FrontmatterResolvedConfig;

export type Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_Enable = 'all' | Rules_Vitest_Index_FrontmatterToggleKey[];

export type Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_Returns = Promise<void>;

export type Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_Files = string[];

export type Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_FilePath = string;

export type Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_Content = string;

/**
 * Rules - Vitest - Frontmatter - Rules - Id Matches Filename.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Config = Rules_Vitest_Index_FrontmatterResolvedConfig;

export type Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Enable = 'all' | Rules_Vitest_Index_FrontmatterToggleKey[];

export type Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Returns = Promise<void>;

export type Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Files = string[];

export type Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_IsBlogPost = boolean;

export type Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_FilePath = string;

export type Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Content = string;

export type Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Split_Frontmatter = string;

export type Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Split_Body = string;

export type Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Split = {
  frontmatter: Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Split_Frontmatter;
  body: Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Split_Body;
} | null;

export type Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Frontmatter = string;

export type Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Body = string;

export type Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_FileExt = string;

export type Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_FileName = string;

export type Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_IdMatch = RegExpExecArray | null;

export type Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Failures = string[];

export type Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Id = string;

export type Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_ExpectedId = string;

export type Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_IsPlaceholder = boolean;

/**
 * Rules - Vitest - Frontmatter - Rules - Is Blog File.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Frontmatter_Rules_IsBlogFile_FilePath = string;

export type Rules_Vitest_Frontmatter_Rules_IsBlogFile_BlogDir = string;

export type Rules_Vitest_Frontmatter_Rules_IsBlogFile_Returns = boolean;

export type Rules_Vitest_Frontmatter_Rules_IsBlogFile_BlogPrefix = string;

/**
 * Rules - Vitest - Frontmatter - Rules - Is Placeholder Page.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Frontmatter_Rules_IsPlaceholderPage_Body = string;

export type Rules_Vitest_Frontmatter_Rules_IsPlaceholderPage_Config = Rules_Vitest_Index_FrontmatterResolvedConfig;

export type Rules_Vitest_Frontmatter_Rules_IsPlaceholderPage_Enable = 'all' | Rules_Vitest_Index_FrontmatterToggleKey[];

export type Rules_Vitest_Frontmatter_Rules_IsPlaceholderPage_Returns = boolean;

/**
 * Rules - Vitest - Frontmatter - Rules - Keywords Not Empty.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Config = Rules_Vitest_Index_FrontmatterResolvedConfig;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Enable = 'all' | Rules_Vitest_Index_FrontmatterToggleKey[];

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Returns = Promise<void>;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Files = string[];

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_IsBlogPost = boolean;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_FilePath = string;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Content = string;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Split_Frontmatter = string;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Split_Body = string;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Split = {
  frontmatter: Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Split_Frontmatter;
  body: Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Split_Body;
} | null;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Frontmatter = string;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_KeywordsIndex = number;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Failures = string[];

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_AfterKeywords = string;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_KeywordLines = string[];

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Lines = string[];

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Line = string | undefined;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_IsPlaceholder = boolean;

/**
 * Rules - Vitest - Frontmatter - Rules - Keywords Not Placeholder.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Config = Rules_Vitest_Index_FrontmatterResolvedConfig;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Enable = 'all' | Rules_Vitest_Index_FrontmatterToggleKey[];

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Returns = Promise<void>;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Sentinel = string | undefined;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Files = string[];

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_IsBlogPost = boolean;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_FilePath = string;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Content = string;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Split_Frontmatter = string;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Split_Body = string;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Split = {
  frontmatter: Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Split_Frontmatter;
  body: Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Split_Body;
} | null;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Frontmatter = string;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Body = string;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_KeywordsIndex = number;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Failures = string[];

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_AfterKeywords = string;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_KeywordLines = string[];

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Lines = string[];

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Line = string | undefined;

export type Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_IsPlaceholder = boolean;

/**
 * Rules - Vitest - Frontmatter - Rules - Required Fields Present Blog.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Config = Rules_Vitest_Index_FrontmatterResolvedConfig;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Enable = 'all' | Rules_Vitest_Index_FrontmatterToggleKey[];

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Returns = Promise<void>;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Files = string[];

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_IsBlogPost = boolean;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_FilePath = string;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Content = string;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Split_Frontmatter = string;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Split_Body = string;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Split = {
  frontmatter: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Split_Frontmatter;
  body: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Split_Body;
} | null;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Frontmatter = string;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Failures = string[];

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_FieldSource = string;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_FieldRegex = RegExp;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_IsPlaceholder = boolean;

/**
 * Rules - Vitest - Frontmatter - Rules - Required Fields Present Docs.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Config = Rules_Vitest_Index_FrontmatterResolvedConfig;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Enable = 'all' | Rules_Vitest_Index_FrontmatterToggleKey[];

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Returns = Promise<void>;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Files = string[];

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_IsBlogPost = boolean;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_FilePath = string;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Content = string;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Split_Frontmatter = string;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Split_Body = string;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Split = {
  frontmatter: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Split_Frontmatter;
  body: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Split_Body;
} | null;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Frontmatter = string;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Failures = string[];

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_FieldSource = string;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_FieldRegex = RegExp;

export type Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_IsPlaceholder = boolean;

/**
 * Rules - Vitest - Frontmatter - Rules - Split Frontmatter.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_Content = string;

export type Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_Returns_Frontmatter = string;

export type Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_Returns_Body = string;

export type Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_Returns = {
  frontmatter: Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_Returns_Frontmatter;
  body: Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_Returns_Body;
} | null;

export type Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_EndIndex = number;

export type Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_Frontmatter = string;

export type Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_Body = string;

/**
 * Rules - Vitest - Frontmatter - Rules - Tags Not Empty.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Config = Rules_Vitest_Index_FrontmatterResolvedConfig;

export type Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Enable = 'all' | Rules_Vitest_Index_FrontmatterToggleKey[];

export type Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Returns = Promise<void>;

export type Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Files = string[];

export type Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_FilePath = string;

export type Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Content = string;

export type Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Split_Frontmatter = string;

export type Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Split_Body = string;

export type Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Split = {
  frontmatter: Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Split_Frontmatter;
  body: Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Split_Body;
} | null;

export type Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Frontmatter = string;

export type Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_TagsIndex = number;

export type Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Failures = string[];

export type Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_AfterTags = string;

export type Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_TagLines = string[];

export type Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_TagSplitLines = string[];

export type Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_TagSplitLine = string | undefined;

export type Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_IsPlaceholder = boolean;

/**
 * Rules - Vitest - Frontmatter - Rules - Tags Not Placeholder.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Config = Rules_Vitest_Index_FrontmatterResolvedConfig;

export type Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Enable = 'all' | Rules_Vitest_Index_FrontmatterToggleKey[];

export type Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Returns = Promise<void>;

export type Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Sentinel = string | undefined;

export type Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Files = string[];

export type Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_FilePath = string;

export type Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Content = string;

export type Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Split_Frontmatter = string;

export type Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Split_Body = string;

export type Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Split = {
  frontmatter: Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Split_Frontmatter;
  body: Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Split_Body;
} | null;

export type Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Frontmatter = string;

export type Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Body = string;

export type Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_TagsIndex = number;

export type Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Failures = string[];

export type Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_AfterTags = string;

export type Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_TagLines = string[];

export type Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_TagSplitLines = string[];

export type Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_TagSplitLine = string | undefined;

export type Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_IsPlaceholder = boolean;
