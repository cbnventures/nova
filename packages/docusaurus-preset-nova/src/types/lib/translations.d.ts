import type {
  TranslationFile,
  TranslationFileContent,
  TranslationMessage,
} from '@docusaurus/types';

/**
 * Lib - Translations - Apply.
 *
 * @since 0.18.0
 */
export type Lib_Translations_Runner_Apply_Params_ThemeConfig = Record<string, unknown>;

export type Lib_Translations_Runner_Apply_Params_TranslationFiles = TranslationFile[];

export type Lib_Translations_Runner_Apply_Params = {
  themeConfig: Lib_Translations_Runner_Apply_Params_ThemeConfig;
  translationFiles: Lib_Translations_Runner_Apply_Params_TranslationFiles;
};

export type Lib_Translations_Runner_Apply_Returns = Record<string, unknown>;

export type Lib_Translations_Runner_Apply_ThemeConfig = Lib_Translations_Runner_Apply_Params_ThemeConfig;

export type Lib_Translations_Runner_Apply_TranslationFiles = Lib_Translations_Runner_Apply_Params_TranslationFiles;

export type Lib_Translations_Runner_Apply_ClonedThemeConfig = Record<string, unknown>;

export type Lib_Translations_Runner_Apply_FilesByPath = Map<string, TranslationFileContent>;

export type Lib_Translations_Runner_ApplyNavbar_Translations = TranslationFileContent | undefined;

export type Lib_Translations_Runner_ApplyNavbar_Value = Record<string, unknown> | undefined;

export type Lib_Translations_Runner_ApplyBlog_Translations = TranslationFileContent | undefined;

export type Lib_Translations_Runner_ApplyBlog_Value = Record<string, unknown> | undefined;

export type Lib_Translations_Runner_ApplyAnnouncementBar_Translations = TranslationFileContent | undefined;

export type Lib_Translations_Runner_ApplyAnnouncementBar_Value = Record<string, unknown> | undefined;

export type Lib_Translations_Runner_ApplyErrorPages_Translations = TranslationFileContent | undefined;

export type Lib_Translations_Runner_ApplyErrorPages_Value = Record<string, unknown> | undefined;

export type Lib_Translations_Runner_ApplyFooter_Translations = TranslationFileContent | undefined;

export type Lib_Translations_Runner_ApplyFooter_Value = Record<string, unknown> | undefined;

/**
 * Lib - Translations - Apply Announcement Bar.
 *
 * @since 0.18.0
 */
export type Lib_Translations_Runner_ApplyAnnouncementBar_AnnouncementBar = Record<string, unknown>;

export type Lib_Translations_Runner_ApplyAnnouncementBar_TranslationsParam = TranslationFileContent;

export type Lib_Translations_Runner_ApplyAnnouncementBar_Returns = void;

export type Lib_Translations_Runner_ApplyAnnouncementBar_Message = TranslationMessage | undefined;

/**
 * Lib - Translations - Apply Blog.
 *
 * @since 0.18.0
 */
export type Lib_Translations_Runner_ApplyBlog_Blog = Record<string, unknown>;

export type Lib_Translations_Runner_ApplyBlog_TranslationsParam = TranslationFileContent;

export type Lib_Translations_Runner_ApplyBlog_Returns = void;

export type Lib_Translations_Runner_ApplyBlog_Layout = Record<string, unknown> | undefined;

export type Lib_Translations_Runner_ApplyBlog_HeadingMessage = TranslationMessage | undefined;

export type Lib_Translations_Runner_ApplyBlog_DescriptionMessage = TranslationMessage | undefined;

/**
 * Lib - Translations - Apply Error Pages.
 *
 * @since 0.18.0
 */
export type Lib_Translations_Runner_ApplyErrorPages_ErrorPages = Record<string, unknown>;

export type Lib_Translations_Runner_ApplyErrorPages_TranslationsParam = TranslationFileContent;

export type Lib_Translations_Runner_ApplyErrorPages_Returns = void;

export type Lib_Translations_Runner_ApplyErrorPages_NotFound = Record<string, unknown> | undefined;

export type Lib_Translations_Runner_ApplyErrorPages_Message = TranslationMessage | undefined;

export type Lib_Translations_Runner_ApplyErrorPages_ErrorPageContent = Record<string, unknown> | undefined;

export type Lib_Translations_Runner_ApplyErrorPages_Error = Record<string, unknown> | undefined;

/**
 * Lib - Translations - Apply Footer.
 *
 * @since 0.18.0
 */
export type Lib_Translations_Runner_ApplyFooter_Footer = Record<string, unknown>;

export type Lib_Translations_Runner_ApplyFooter_TranslationsParam = TranslationFileContent;

export type Lib_Translations_Runner_ApplyFooter_Returns = void;

export type Lib_Translations_Runner_ApplyFooter_Layout = Record<string, unknown> | undefined;

export type Lib_Translations_Runner_ApplyFooter_LayoutSlot = Record<string, unknown>;

export type Lib_Translations_Runner_ApplyFooter_Message = TranslationMessage | undefined;

export type Lib_Translations_Runner_ApplyFooter_Sections = Record<string, unknown> | undefined;

export type Lib_Translations_Runner_ApplyFooter_SectionLinks = Record<string, unknown>[];

export type Lib_Translations_Runner_ApplyFooter_SectionLink = Record<string, unknown>;

export type Lib_Translations_Runner_ApplyFooter_Cta = unknown;

export type Lib_Translations_Runner_ApplyFooter_CtaObject = Record<string, unknown>;

/**
 * Lib - Translations - Apply Navbar.
 *
 * @since 0.18.0
 */
export type Lib_Translations_Runner_ApplyNavbar_Navbar = Record<string, unknown>;

export type Lib_Translations_Runner_ApplyNavbar_TranslationsParam = TranslationFileContent;

export type Lib_Translations_Runner_ApplyNavbar_Returns = void;

export type Lib_Translations_Runner_ApplyNavbar_Items = Record<string, unknown>[] | undefined;

export type Lib_Translations_Runner_ApplyNavbar_Item = Record<string, unknown>;

export type Lib_Translations_Runner_ApplyNavbar_Message = TranslationMessage | undefined;

export type Lib_Translations_Runner_ApplyNavbar_Children = Record<string, unknown>[] | undefined;

export type Lib_Translations_Runner_ApplyNavbar_Child = Record<string, unknown>;

/**
 * Lib - Translations - Extract.
 *
 * @since 0.18.0
 */
export type Lib_Translations_Runner_Extract_Params_ThemeConfig = Record<string, unknown>;

export type Lib_Translations_Runner_Extract_Params = {
  themeConfig: Lib_Translations_Runner_Extract_Params_ThemeConfig;
};

export type Lib_Translations_Runner_Extract_Returns = TranslationFile[];

export type Lib_Translations_Runner_Extract_ThemeConfig = Lib_Translations_Runner_Extract_Params_ThemeConfig;

export type Lib_Translations_Runner_Extract_Result = TranslationFile[];

export type Lib_Translations_Runner_ExtractNavbar_Content = TranslationFileContent | undefined;

export type Lib_Translations_Runner_ExtractBlog_Content = TranslationFileContent | undefined;

export type Lib_Translations_Runner_ExtractAnnouncementBar_Content = TranslationFileContent | undefined;

export type Lib_Translations_Runner_ExtractErrorPages_Content = TranslationFileContent | undefined;

export type Lib_Translations_Runner_ExtractFooter_Content = TranslationFileContent | undefined;

/**
 * Lib - Translations - Extract Announcement Bar.
 *
 * @since 0.18.0
 */
export type Lib_Translations_Runner_ExtractAnnouncementBar_AnnouncementBar = unknown;

export type Lib_Translations_Runner_ExtractAnnouncementBar_Returns = TranslationFileContent | undefined;

export type Lib_Translations_Runner_ExtractAnnouncementBar_Config = Record<string, unknown>;

export type Lib_Translations_Runner_ExtractAnnouncementBar_ContentValue = unknown;

/**
 * Lib - Translations - Extract Blog.
 *
 * @since 0.18.0
 */
export type Lib_Translations_Runner_ExtractBlog_Blog = unknown;

export type Lib_Translations_Runner_ExtractBlog_Returns = TranslationFileContent | undefined;

export type Lib_Translations_Runner_ExtractBlog_Config = Record<string, unknown>;

export type Lib_Translations_Runner_ExtractBlog_Layout = unknown;

export type Lib_Translations_Runner_ExtractBlog_LayoutConfig = Record<string, unknown>;

export type Lib_Translations_Runner_ExtractBlog_FileContent = TranslationFileContent;

export type Lib_Translations_Runner_ExtractBlog_HeadingValue = unknown;

export type Lib_Translations_Runner_ExtractBlog_DescriptionValue = unknown;

/**
 * Lib - Translations - Extract Error Pages.
 *
 * @since 0.18.0
 */
export type Lib_Translations_Runner_ExtractErrorPages_ErrorPages = unknown;

export type Lib_Translations_Runner_ExtractErrorPages_Returns = TranslationFileContent | undefined;

export type Lib_Translations_Runner_ExtractErrorPages_Config = Record<string, unknown>;

export type Lib_Translations_Runner_ExtractErrorPages_FileContent = TranslationFileContent;

export type Lib_Translations_Runner_ExtractErrorPages_NotFound = unknown;

export type Lib_Translations_Runner_ExtractErrorPages_NotFoundConfig = Record<string, unknown>;

export type Lib_Translations_Runner_ExtractErrorPages_NotFoundTitle = unknown;

export type Lib_Translations_Runner_ExtractErrorPages_NotFoundDescription = unknown;

export type Lib_Translations_Runner_ExtractErrorPages_NotFoundBackHomeLabel = unknown;

export type Lib_Translations_Runner_ExtractErrorPages_ErrorPageContent = unknown;

export type Lib_Translations_Runner_ExtractErrorPages_ErrorPageContentConfig = Record<string, unknown>;

export type Lib_Translations_Runner_ExtractErrorPages_ErrorPageContentTitle = unknown;

export type Lib_Translations_Runner_ExtractErrorPages_ErrorPageContentRetryLabel = unknown;

export type Lib_Translations_Runner_ExtractErrorPages_Error = unknown;

export type Lib_Translations_Runner_ExtractErrorPages_ErrorConfig = Record<string, unknown>;

export type Lib_Translations_Runner_ExtractErrorPages_ErrorRetryLabel = unknown;

/**
 * Lib - Translations - Extract Footer.
 *
 * @since 0.18.0
 */
export type Lib_Translations_Runner_ExtractFooter_Footer = unknown;

export type Lib_Translations_Runner_ExtractFooter_Returns = TranslationFileContent | undefined;

export type Lib_Translations_Runner_ExtractFooter_Config = Record<string, unknown>;

export type Lib_Translations_Runner_ExtractFooter_FileContent = TranslationFileContent;

export type Lib_Translations_Runner_ExtractFooter_Layout = unknown;

export type Lib_Translations_Runner_ExtractFooter_LayoutEntries = [string, Record<string, unknown>][];

export type Lib_Translations_Runner_ExtractFooter_LayoutEntry = [string, Record<string, unknown>];

export type Lib_Translations_Runner_ExtractFooter_LayoutSlot = string;

export type Lib_Translations_Runner_ExtractFooter_LayoutSlotConfig = Record<string, unknown>;

export type Lib_Translations_Runner_ExtractFooter_LayoutTitleValue = unknown;

export type Lib_Translations_Runner_ExtractFooter_Sections = unknown;

export type Lib_Translations_Runner_ExtractFooter_SectionEntries = [string, Record<string, unknown>[]][];

export type Lib_Translations_Runner_ExtractFooter_SectionEntry = [string, Record<string, unknown>[]];

export type Lib_Translations_Runner_ExtractFooter_SectionName = string;

export type Lib_Translations_Runner_ExtractFooter_SectionLinks = Record<string, unknown>[];

export type Lib_Translations_Runner_ExtractFooter_SectionLink = Record<string, unknown>;

export type Lib_Translations_Runner_ExtractFooter_SectionLinkLabelValue = unknown;

export type Lib_Translations_Runner_ExtractFooter_Cta = unknown;

export type Lib_Translations_Runner_ExtractFooter_CtaObject = Record<string, unknown>;

export type Lib_Translations_Runner_ExtractFooter_CtaLabelValue = unknown;

export type Lib_Translations_Runner_ExtractFooter_CopyrightValue = unknown;

/**
 * Lib - Translations - Extract Navbar.
 *
 * @since 0.18.0
 */
export type Lib_Translations_Runner_ExtractNavbar_Navbar = unknown;

export type Lib_Translations_Runner_ExtractNavbar_Returns = TranslationFileContent | undefined;

export type Lib_Translations_Runner_ExtractNavbar_Config = Record<string, unknown>;

export type Lib_Translations_Runner_ExtractNavbar_Items = unknown;

export type Lib_Translations_Runner_ExtractNavbar_FileContent = TranslationFileContent;

export type Lib_Translations_Runner_ExtractNavbar_Item = Record<string, unknown>;

export type Lib_Translations_Runner_ExtractNavbar_LabelValue = unknown;

export type Lib_Translations_Runner_ExtractNavbar_Children = unknown;

export type Lib_Translations_Runner_ExtractNavbar_Child = Record<string, unknown>;

export type Lib_Translations_Runner_ExtractNavbar_ChildLabelValue = unknown;
