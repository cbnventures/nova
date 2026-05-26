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
export type LibTranslationsApplyParamsThemeConfig = Record<string, unknown>;

export type LibTranslationsApplyParamsTranslationFiles = TranslationFile[];

export type LibTranslationsApplyParams = {
  themeConfig: LibTranslationsApplyParamsThemeConfig;
  translationFiles: LibTranslationsApplyParamsTranslationFiles;
};

export type LibTranslationsApplyReturns = Record<string, unknown>;

export type LibTranslationsApplyThemeConfig = LibTranslationsApplyParamsThemeConfig;

export type LibTranslationsApplyTranslationFiles = LibTranslationsApplyParamsTranslationFiles;

export type LibTranslationsApplyClonedThemeConfig = Record<string, unknown>;

export type LibTranslationsApplyFilesByPath = Map<string, TranslationFileContent>;

export type LibTranslationsApplyNavbarTranslations = TranslationFileContent | undefined;

export type LibTranslationsApplyNavbarValue = Record<string, unknown> | undefined;

export type LibTranslationsApplyBlogTranslations = TranslationFileContent | undefined;

export type LibTranslationsApplyBlogValue = Record<string, unknown> | undefined;

export type LibTranslationsApplyAnnouncementBarTranslations = TranslationFileContent | undefined;

export type LibTranslationsApplyAnnouncementBarValue = Record<string, unknown> | undefined;

export type LibTranslationsApplyErrorPagesTranslations = TranslationFileContent | undefined;

export type LibTranslationsApplyErrorPagesValue = Record<string, unknown> | undefined;

export type LibTranslationsApplyFooterTranslations = TranslationFileContent | undefined;

export type LibTranslationsApplyFooterValue = Record<string, unknown> | undefined;

/**
 * Lib - Translations - Apply Announcement Bar.
 *
 * @since 0.18.0
 */
export type LibTranslationsApplyAnnouncementBarAnnouncementBar = Record<string, unknown>;

export type LibTranslationsApplyAnnouncementBarTranslationsParam = TranslationFileContent;

export type LibTranslationsApplyAnnouncementBarReturns = void;

export type LibTranslationsApplyAnnouncementBarMessage = TranslationMessage | undefined;

/**
 * Lib - Translations - Apply Blog.
 *
 * @since 0.18.0
 */
export type LibTranslationsApplyBlogBlog = Record<string, unknown>;

export type LibTranslationsApplyBlogTranslationsParam = TranslationFileContent;

export type LibTranslationsApplyBlogReturns = void;

export type LibTranslationsApplyBlogLayout = Record<string, unknown> | undefined;

export type LibTranslationsApplyBlogHeadingMessage = TranslationMessage | undefined;

export type LibTranslationsApplyBlogDescriptionMessage = TranslationMessage | undefined;

/**
 * Lib - Translations - Apply Error Pages.
 *
 * @since 0.18.0
 */
export type LibTranslationsApplyErrorPagesErrorPages = Record<string, unknown>;

export type LibTranslationsApplyErrorPagesTranslationsParam = TranslationFileContent;

export type LibTranslationsApplyErrorPagesReturns = void;

export type LibTranslationsApplyErrorPagesNotFound = Record<string, unknown> | undefined;

export type LibTranslationsApplyErrorPagesMessage = TranslationMessage | undefined;

export type LibTranslationsApplyErrorPagesErrorPageContent = Record<string, unknown> | undefined;

export type LibTranslationsApplyErrorPagesError = Record<string, unknown> | undefined;

/**
 * Lib - Translations - Apply Footer.
 *
 * @since 0.18.0
 */
export type LibTranslationsApplyFooterFooter = Record<string, unknown>;

export type LibTranslationsApplyFooterTranslationsParam = TranslationFileContent;

export type LibTranslationsApplyFooterReturns = void;

export type LibTranslationsApplyFooterLayout = Record<string, unknown> | undefined;

export type LibTranslationsApplyFooterLayoutSlot = Record<string, unknown>;

export type LibTranslationsApplyFooterMessage = TranslationMessage | undefined;

export type LibTranslationsApplyFooterSections = Record<string, unknown> | undefined;

export type LibTranslationsApplyFooterSectionLinks = Record<string, unknown>[];

export type LibTranslationsApplyFooterSectionLink = Record<string, unknown>;

export type LibTranslationsApplyFooterCta = unknown;

export type LibTranslationsApplyFooterCtaObject = Record<string, unknown>;

/**
 * Lib - Translations - Apply Navbar.
 *
 * @since 0.18.0
 */
export type LibTranslationsApplyNavbarNavbar = Record<string, unknown>;

export type LibTranslationsApplyNavbarTranslationsParam = TranslationFileContent;

export type LibTranslationsApplyNavbarReturns = void;

export type LibTranslationsApplyNavbarItems = Record<string, unknown>[] | undefined;

export type LibTranslationsApplyNavbarItem = Record<string, unknown>;

export type LibTranslationsApplyNavbarMessage = TranslationMessage | undefined;

export type LibTranslationsApplyNavbarChildren = Record<string, unknown>[] | undefined;

export type LibTranslationsApplyNavbarChild = Record<string, unknown>;

/**
 * Lib - Translations - Extract.
 *
 * @since 0.18.0
 */
export type LibTranslationsExtractParamsThemeConfig = Record<string, unknown>;

export type LibTranslationsExtractParams = {
  themeConfig: LibTranslationsExtractParamsThemeConfig;
};

export type LibTranslationsExtractReturns = TranslationFile[];

export type LibTranslationsExtractThemeConfig = LibTranslationsExtractParamsThemeConfig;

export type LibTranslationsExtractResult = TranslationFile[];

export type LibTranslationsExtractNavbarContent = TranslationFileContent | undefined;

export type LibTranslationsExtractBlogContent = TranslationFileContent | undefined;

export type LibTranslationsExtractAnnouncementBarContent = TranslationFileContent | undefined;

export type LibTranslationsExtractErrorPagesContent = TranslationFileContent | undefined;

export type LibTranslationsExtractFooterContent = TranslationFileContent | undefined;

/**
 * Lib - Translations - Extract Announcement Bar.
 *
 * @since 0.18.0
 */
export type LibTranslationsExtractAnnouncementBarAnnouncementBar = unknown;

export type LibTranslationsExtractAnnouncementBarReturns = TranslationFileContent | undefined;

export type LibTranslationsExtractAnnouncementBarConfig = Record<string, unknown>;

export type LibTranslationsExtractAnnouncementBarContentValue = unknown;

/**
 * Lib - Translations - Extract Blog.
 *
 * @since 0.18.0
 */
export type LibTranslationsExtractBlogBlog = unknown;

export type LibTranslationsExtractBlogReturns = TranslationFileContent | undefined;

export type LibTranslationsExtractBlogConfig = Record<string, unknown>;

export type LibTranslationsExtractBlogLayout = unknown;

export type LibTranslationsExtractBlogLayoutConfig = Record<string, unknown>;

export type LibTranslationsExtractBlogFileContent = TranslationFileContent;

export type LibTranslationsExtractBlogHeadingValue = unknown;

export type LibTranslationsExtractBlogDescriptionValue = unknown;

/**
 * Lib - Translations - Extract Error Pages.
 *
 * @since 0.18.0
 */
export type LibTranslationsExtractErrorPagesErrorPages = unknown;

export type LibTranslationsExtractErrorPagesReturns = TranslationFileContent | undefined;

export type LibTranslationsExtractErrorPagesConfig = Record<string, unknown>;

export type LibTranslationsExtractErrorPagesFileContent = TranslationFileContent;

export type LibTranslationsExtractErrorPagesNotFound = unknown;

export type LibTranslationsExtractErrorPagesNotFoundConfig = Record<string, unknown>;

export type LibTranslationsExtractErrorPagesNotFoundTitle = unknown;

export type LibTranslationsExtractErrorPagesNotFoundDescription = unknown;

export type LibTranslationsExtractErrorPagesNotFoundBackHomeLabel = unknown;

export type LibTranslationsExtractErrorPagesErrorPageContent = unknown;

export type LibTranslationsExtractErrorPagesErrorPageContentConfig = Record<string, unknown>;

export type LibTranslationsExtractErrorPagesErrorPageContentTitle = unknown;

export type LibTranslationsExtractErrorPagesErrorPageContentRetryLabel = unknown;

export type LibTranslationsExtractErrorPagesError = unknown;

export type LibTranslationsExtractErrorPagesErrorConfig = Record<string, unknown>;

export type LibTranslationsExtractErrorPagesErrorRetryLabel = unknown;

/**
 * Lib - Translations - Extract Footer.
 *
 * @since 0.18.0
 */
export type LibTranslationsExtractFooterFooter = unknown;

export type LibTranslationsExtractFooterReturns = TranslationFileContent | undefined;

export type LibTranslationsExtractFooterConfig = Record<string, unknown>;

export type LibTranslationsExtractFooterFileContent = TranslationFileContent;

export type LibTranslationsExtractFooterLayout = unknown;

export type LibTranslationsExtractFooterLayoutEntries = [string, Record<string, unknown>][];

export type LibTranslationsExtractFooterLayoutEntry = [string, Record<string, unknown>];

export type LibTranslationsExtractFooterLayoutSlot = string;

export type LibTranslationsExtractFooterLayoutSlotConfig = Record<string, unknown>;

export type LibTranslationsExtractFooterLayoutTitleValue = unknown;

export type LibTranslationsExtractFooterSections = unknown;

export type LibTranslationsExtractFooterSectionEntries = [string, Record<string, unknown>[]][];

export type LibTranslationsExtractFooterSectionEntry = [string, Record<string, unknown>[]];

export type LibTranslationsExtractFooterSectionName = string;

export type LibTranslationsExtractFooterSectionLinks = Record<string, unknown>[];

export type LibTranslationsExtractFooterSectionLink = Record<string, unknown>;

export type LibTranslationsExtractFooterSectionLinkLabelValue = unknown;

export type LibTranslationsExtractFooterCta = unknown;

export type LibTranslationsExtractFooterCtaObject = Record<string, unknown>;

export type LibTranslationsExtractFooterCtaLabelValue = unknown;

export type LibTranslationsExtractFooterCopyrightValue = unknown;

/**
 * Lib - Translations - Extract Navbar.
 *
 * @since 0.18.0
 */
export type LibTranslationsExtractNavbarNavbar = unknown;

export type LibTranslationsExtractNavbarReturns = TranslationFileContent | undefined;

export type LibTranslationsExtractNavbarConfig = Record<string, unknown>;

export type LibTranslationsExtractNavbarItems = unknown;

export type LibTranslationsExtractNavbarFileContent = TranslationFileContent;

export type LibTranslationsExtractNavbarItem = Record<string, unknown>;

export type LibTranslationsExtractNavbarLabelValue = unknown;

export type LibTranslationsExtractNavbarChildren = unknown;

export type LibTranslationsExtractNavbarChild = Record<string, unknown>;

export type LibTranslationsExtractNavbarChildLabelValue = unknown;
