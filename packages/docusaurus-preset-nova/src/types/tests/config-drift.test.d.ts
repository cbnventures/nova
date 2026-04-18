import type { OptionsPluginOptions } from '../options.d.ts';

/**
 * Tests - Config Drift - ConfigDrift ValidateOptions.
 *
 * @since 0.15.0
 */
export type TestsConfigDriftValidatedResult = OptionsPluginOptions;

export type TestsConfigDriftJoiSchemaValidate = (value: unknown) => TestsConfigDriftJoiSchemaValidateResult;

export type TestsConfigDriftJoiSchema = {
  validate: TestsConfigDriftJoiSchemaValidate;
};

export type TestsConfigDriftJoiSchemaValidateResultValue = unknown;

export type TestsConfigDriftJoiSchemaValidateResult = {
  value: TestsConfigDriftJoiSchemaValidateResultValue;
  error?: Error;
};

export type TestsConfigDriftPresetValue = string;

export type TestsConfigDriftOverrides = OptionsPluginOptions['overrides'];

export type TestsConfigDriftOverridesColorsPrimary = string | undefined;

export type TestsConfigDriftOverridesColorsAccent = string | undefined;

export type TestsConfigDriftOverridesColorsNeutral = string | undefined;

export type TestsConfigDriftOverridesFontsDisplay = string | undefined;

export type TestsConfigDriftOverridesFontsBody = string | undefined;

export type TestsConfigDriftOverridesFontsCode = string | undefined;

export type TestsConfigDriftOverridesShapeRadius = string | undefined;

export type TestsConfigDriftOverridesShapeDensity = string | undefined;

export type TestsConfigDriftOverridesDepthCards = string | undefined;

export type TestsConfigDriftOverridesDepthCodeBlocks = string | undefined;

export type TestsConfigDriftOverridesMotionSpeed = string | undefined;

export type TestsConfigDriftOverridesMotionStaggeredReveals = boolean | undefined;

export type TestsConfigDriftOverridesMotionHoverEffects = boolean | undefined;

export type TestsConfigDriftOverridesNavbar = string | undefined;

export type TestsConfigDriftOverridesFooter = string | undefined;

export type TestsConfigDriftPlugins = OptionsPluginOptions['plugins'];

export type TestsConfigDriftPluginsDocs = Record<string, unknown> | undefined;

export type TestsConfigDriftPluginsBlog = Record<string, unknown> | false | undefined;

export type TestsConfigDriftPluginsPages = Record<string, unknown> | false | undefined;

export type TestsConfigDriftPluginsSitemap = Record<string, unknown> | false | undefined;

export type TestsConfigDriftAnalytics = OptionsPluginOptions['analytics'];

export type TestsConfigDriftAnalyticsGtmContainerId = string;

export type TestsConfigDriftProgressBar = boolean | Record<string, unknown>;

export type TestsConfigDriftSearch = OptionsPluginOptions['search'];

export type TestsConfigDriftSearchLanguage = string[];

export type TestsConfigDriftSearchIndexDocs = boolean;

export type TestsConfigDriftSearchIndexBlog = boolean;

export type TestsConfigDriftSearchIndexPages = boolean;

export type TestsConfigDriftSearchHashed = boolean;

export type TestsConfigDriftSearchResultLimits = number;

export type TestsConfigDriftSearchHighlightSearchTermsOnTargetPage = boolean;

export type TestsConfigDriftSearchBarShortcutKeymap = string;

export type TestsConfigDriftSearchFuzzyMatchingDistance = number;

export type TestsConfigDriftSearchIgnorePatterns = string[];

export type TestsConfigDriftSearchDocsRouteBasePath = string;

/**
 * Tests - Config Drift - ConfigDrift ValidateThemeConfig.
 *
 * @since 0.15.0
 */
export type TestsConfigDriftThemeConfigValidatedResult = Record<string, unknown>;

export type TestsConfigDriftThemeConfigJoiSchemaValidate = (value: unknown) => TestsConfigDriftThemeConfigJoiSchemaValidateResult;

export type TestsConfigDriftThemeConfigJoiSchema = {
  validate: TestsConfigDriftThemeConfigJoiSchemaValidate;
};

export type TestsConfigDriftThemeConfigJoiSchemaValidateResultValue = unknown;

export type TestsConfigDriftThemeConfigJoiSchemaValidateResult = {
  value: TestsConfigDriftThemeConfigJoiSchemaValidateResultValue;
  error?: Error;
};

export type TestsConfigDriftThemeConfigSite = Record<string, unknown>;

export type TestsConfigDriftThemeConfigSiteTitle = string;

export type TestsConfigDriftThemeConfigSiteLogo = Record<string, unknown>;

export type TestsConfigDriftThemeConfigSiteLogoAlt = string;

export type TestsConfigDriftThemeConfigSiteLogoSrc = string;

export type TestsConfigDriftThemeConfigSiteLogoSrcDark = string | undefined;

export type TestsConfigDriftThemeConfigSiteLogoHref = string | undefined;

export type TestsConfigDriftThemeConfigSiteLogoWordmark = string | undefined;

export type TestsConfigDriftThemeConfigSiteLogoWordmarkDark = string | undefined;

export type TestsConfigDriftThemeConfigSiteLogoTitle = string | undefined;

export type TestsConfigDriftThemeConfigSiteImage = string;

export type TestsConfigDriftThemeConfigSiteMetadata = unknown[];

export type TestsConfigDriftThemeConfigColorMode = Record<string, unknown>;

export type TestsConfigDriftThemeConfigColorModeDefaultMode = string;

export type TestsConfigDriftThemeConfigColorModeDisableSwitch = boolean;

export type TestsConfigDriftThemeConfigNavbar = Record<string, unknown>;

export type TestsConfigDriftThemeConfigNavbarHideOnScroll = boolean;

export type TestsConfigDriftThemeConfigNavbarItems = unknown[];

export type TestsConfigDriftThemeConfigDocs = Record<string, unknown>;

export type TestsConfigDriftThemeConfigDocsVersionPersistence = string;

export type TestsConfigDriftThemeConfigDocsSidebar = Record<string, unknown>;

export type TestsConfigDriftThemeConfigDocsSidebarHideable = boolean;

export type TestsConfigDriftThemeConfigDocsSidebarAutoCollapseCategories = boolean;

export type TestsConfigDriftThemeConfigBlog = Record<string, unknown>;

export type TestsConfigDriftThemeConfigBlogSidebar = Record<string, unknown>;

export type TestsConfigDriftThemeConfigBlogSidebarGroupByYear = boolean;

export type TestsConfigDriftThemeConfigBlogLayout = Record<string, unknown>;

export type TestsConfigDriftThemeConfigBlogLayoutHeading = string;

export type TestsConfigDriftThemeConfigBlogLayoutDescription = string;

export type TestsConfigDriftThemeConfigBlogShare = Record<string, unknown>;

export type TestsConfigDriftThemeConfigBlogSharePlatforms = string[];

export type TestsConfigDriftThemeConfigTableOfContents = Record<string, unknown>;

export type TestsConfigDriftThemeConfigTableOfContentsMinHeadingLevel = number;

export type TestsConfigDriftThemeConfigTableOfContentsMaxHeadingLevel = number;

export type TestsConfigDriftThemeConfigAnnouncementBar = Record<string, unknown>;

export type TestsConfigDriftThemeConfigAnnouncementBarId = string;

export type TestsConfigDriftThemeConfigAnnouncementBarContent = string;

export type TestsConfigDriftThemeConfigAnnouncementBarBackgroundColor = string | undefined;

export type TestsConfigDriftThemeConfigAnnouncementBarTextColor = string | undefined;

export type TestsConfigDriftThemeConfigAnnouncementBarIsCloseable = boolean;

export type TestsConfigDriftThemeConfigFooter = Record<string, unknown>;

export type TestsConfigDriftThemeConfigFooterCta = string | undefined;
