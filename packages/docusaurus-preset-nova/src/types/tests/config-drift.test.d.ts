import type { Options_PluginOptions } from '../options.d.ts';

/**
 * Tests - Config Drift - ConfigDrift ValidateOptions.
 *
 * @since 0.15.0
 */
export type Tests_ConfigDrift_ValidatedResult = Options_PluginOptions;

export type Tests_ConfigDrift_JoiSchema_Validate = (value: unknown) => Tests_ConfigDrift_JoiSchemaValidateResult;

export type Tests_ConfigDrift_JoiSchema = {
  validate: Tests_ConfigDrift_JoiSchema_Validate;
};

export type Tests_ConfigDrift_JoiSchemaValidateResult_Value = unknown;

export type Tests_ConfigDrift_JoiSchemaValidateResult = {
  value: Tests_ConfigDrift_JoiSchemaValidateResult_Value;
  error?: Error;
};

export type Tests_ConfigDrift_PresetValue = string;

export type Tests_ConfigDrift_Overrides = Options_PluginOptions['overrides'];

export type Tests_ConfigDrift_OverridesColorsPrimary = Options_PluginOptions['overrides']['colors']['primary'];

export type Tests_ConfigDrift_OverridesColorsSecondary = Options_PluginOptions['overrides']['colors']['secondary'];

export type Tests_ConfigDrift_OverridesFontsDisplay = string | undefined;

export type Tests_ConfigDrift_OverridesFontsBody = string | undefined;

export type Tests_ConfigDrift_OverridesFontsCode = string | undefined;

export type Tests_ConfigDrift_OverridesNavbar = string | undefined;

export type Tests_ConfigDrift_OverridesFooter = string | undefined;

export type Tests_ConfigDrift_Plugins = Options_PluginOptions['plugins'];

export type Tests_ConfigDrift_PluginsDocs = Record<string, unknown> | undefined;

export type Tests_ConfigDrift_PluginsBlog = Record<string, unknown> | false | undefined;

export type Tests_ConfigDrift_PluginsPages = Record<string, unknown> | false | undefined;

export type Tests_ConfigDrift_PluginsSitemap = Record<string, unknown> | false | undefined;

export type Tests_ConfigDrift_Analytics = Options_PluginOptions['analytics'];

export type Tests_ConfigDrift_AnalyticsGtmContainerId = string;

export type Tests_ConfigDrift_ProgressBar = boolean | Record<string, unknown>;

export type Tests_ConfigDrift_Search = Options_PluginOptions['search'];

export type Tests_ConfigDrift_SearchLanguage = string[];

export type Tests_ConfigDrift_SearchIndexDocs = boolean;

export type Tests_ConfigDrift_SearchIndexBlog = boolean;

export type Tests_ConfigDrift_SearchIndexPages = boolean;

export type Tests_ConfigDrift_SearchHashed = boolean;

export type Tests_ConfigDrift_SearchResultLimits = number;

export type Tests_ConfigDrift_SearchHighlightSearchTermsOnTargetPage = boolean;

export type Tests_ConfigDrift_SearchBarShortcutKeymap = string;

export type Tests_ConfigDrift_SearchFuzzyMatchingDistance = number;

export type Tests_ConfigDrift_SearchIgnorePatterns = string[];

export type Tests_ConfigDrift_SearchDocsRouteBasePath = string;

/**
 * Tests - Config Drift - ConfigDrift ValidateThemeConfig.
 *
 * @since 0.15.0
 */
export type Tests_ConfigDrift_ThemeConfigValidatedResult = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigJoiSchema_Validate = (value: unknown) => Tests_ConfigDrift_ThemeConfigJoiSchemaValidateResult;

export type Tests_ConfigDrift_ThemeConfigJoiSchema = {
  validate: Tests_ConfigDrift_ThemeConfigJoiSchema_Validate;
};

export type Tests_ConfigDrift_ThemeConfigJoiSchemaValidateResult_Value = unknown;

export type Tests_ConfigDrift_ThemeConfigJoiSchemaValidateResult = {
  value: Tests_ConfigDrift_ThemeConfigJoiSchemaValidateResult_Value;
  error?: Error;
};

export type Tests_ConfigDrift_ThemeConfigSite = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigSiteTitle = string;

export type Tests_ConfigDrift_ThemeConfigSiteLogo = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigSiteLogoAlt = string;

export type Tests_ConfigDrift_ThemeConfigSiteLogoSrc = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigSiteLogoSrcLight = string | undefined;

export type Tests_ConfigDrift_ThemeConfigSiteLogoSrcDark = string | undefined;

export type Tests_ConfigDrift_ThemeConfigSiteLogoHref = string | undefined;

export type Tests_ConfigDrift_ThemeConfigSiteLogoWordmark = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigSiteLogoWordmarkLight = string | undefined;

export type Tests_ConfigDrift_ThemeConfigSiteLogoWordmarkDark = string | undefined;

export type Tests_ConfigDrift_ThemeConfigSiteLogoTitle = string | undefined;

export type Tests_ConfigDrift_ThemeConfigSiteImage = string;

export type Tests_ConfigDrift_ThemeConfigSiteMetadata = unknown[];

export type Tests_ConfigDrift_ThemeConfigColorMode = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigColorModeDefaultMode = string;

export type Tests_ConfigDrift_ThemeConfigColorModeDisableSwitch = boolean;

export type Tests_ConfigDrift_ThemeConfigNavbar = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigNavbarHideOnScroll = boolean;

export type Tests_ConfigDrift_ThemeConfigNavbarItems = unknown[];

export type Tests_ConfigDrift_ThemeConfigDocs = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigDocsVersionPersistence = string;

export type Tests_ConfigDrift_ThemeConfigDocsSidebar = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigDocsSidebarHideable = boolean;

export type Tests_ConfigDrift_ThemeConfigDocsSidebarAutoCollapseCategories = boolean;

export type Tests_ConfigDrift_ThemeConfigBlog = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigBlogSidebar = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigBlogSidebarGroupByYear = boolean;

export type Tests_ConfigDrift_ThemeConfigBlogLayout = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigBlogLayoutHeading = string;

export type Tests_ConfigDrift_ThemeConfigBlogLayoutDescription = string;

export type Tests_ConfigDrift_ThemeConfigBlogShare = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigBlogSharePlatforms = string[];

export type Tests_ConfigDrift_ThemeConfigTableOfContents = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigTableOfContentsMinHeadingLevel = number;

export type Tests_ConfigDrift_ThemeConfigTableOfContentsMaxHeadingLevel = number;

export type Tests_ConfigDrift_ThemeConfigAnnouncementBar = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigAnnouncementBarId = string;

export type Tests_ConfigDrift_ThemeConfigAnnouncementBarContent = string;

export type Tests_ConfigDrift_ThemeConfigAnnouncementBarBackgroundColor = string | undefined;

export type Tests_ConfigDrift_ThemeConfigAnnouncementBarTextColor = string | undefined;

export type Tests_ConfigDrift_ThemeConfigAnnouncementBarIsCloseable = boolean;

export type Tests_ConfigDrift_ThemeConfigErrorPages = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigErrorPagesNotFound = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigErrorPagesNotFoundTitle = string;

export type Tests_ConfigDrift_ThemeConfigErrorPagesNotFoundDescription = string;

export type Tests_ConfigDrift_ThemeConfigErrorPagesNotFoundBackHomeLabel = string;

export type Tests_ConfigDrift_ThemeConfigErrorPagesNotFoundBackHomeHref = string;

export type Tests_ConfigDrift_ThemeConfigErrorPagesErrorPageContent = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigErrorPagesErrorPageContentTitle = string;

export type Tests_ConfigDrift_ThemeConfigErrorPagesErrorPageContentRetryLabel = string;

export type Tests_ConfigDrift_ThemeConfigErrorPagesError = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigErrorPagesErrorRetryLabel = string;

export type Tests_ConfigDrift_ThemeConfigFooter = Record<string, unknown>;

export type Tests_ConfigDrift_ThemeConfigFooterCta = string | Tests_ConfigDrift_ThemeConfigFooterCtaObject | undefined;

export type Tests_ConfigDrift_ThemeConfigFooterCtaObject_Label = string;

export type Tests_ConfigDrift_ThemeConfigFooterCtaObject_Href = string;

export type Tests_ConfigDrift_ThemeConfigFooterCtaObject = {
  label: Tests_ConfigDrift_ThemeConfigFooterCtaObject_Label;
  href: Tests_ConfigDrift_ThemeConfigFooterCtaObject_Href;
};
