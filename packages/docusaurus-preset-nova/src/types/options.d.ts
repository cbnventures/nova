import type {
  SharedHexColor,
  SharedPreset,
  SharedPresetDepthCards,
  SharedPresetDepthCodeBlocks,
  SharedPresetFontsBody,
  SharedPresetFontsCode,
  SharedPresetFontsDisplay,
  SharedPresetFooter,
  SharedPresetLogo,
  SharedPresetMotionHoverEffects,
  SharedPresetMotionSpeed,
  SharedPresetMotionStaggeredReveals,
  SharedPresetName,
  SharedPresetNavbar,
  SharedPresetShapeDensity,
  SharedPresetShapeRadius,
} from './shared.d.ts';

export type OptionsPluginOptionsPreset = SharedPresetName;

export type OptionsPluginOptionsOverridesColorsPrimary = SharedHexColor | undefined;

export type OptionsPluginOptionsOverridesColorsAccent = SharedHexColor | undefined;

export type OptionsPluginOptionsOverridesColorsNeutral = SharedHexColor | undefined;

export type OptionsPluginOptionsOverridesColors = {
  primary: OptionsPluginOptionsOverridesColorsPrimary;
  accent: OptionsPluginOptionsOverridesColorsAccent;
  neutral: OptionsPluginOptionsOverridesColorsNeutral;
};

export type OptionsPluginOptionsOverridesFontsDisplay = SharedPresetFontsDisplay | undefined;

export type OptionsPluginOptionsOverridesFontsBody = SharedPresetFontsBody | undefined;

export type OptionsPluginOptionsOverridesFontsCode = SharedPresetFontsCode | undefined;

export type OptionsPluginOptionsOverridesFonts = {
  display: OptionsPluginOptionsOverridesFontsDisplay;
  body: OptionsPluginOptionsOverridesFontsBody;
  code: OptionsPluginOptionsOverridesFontsCode;
};

export type OptionsPluginOptionsOverridesShapeRadius = SharedPresetShapeRadius | undefined;

export type OptionsPluginOptionsOverridesShapeDensity = SharedPresetShapeDensity | undefined;

export type OptionsPluginOptionsOverridesShape = {
  radius: OptionsPluginOptionsOverridesShapeRadius;
  density: OptionsPluginOptionsOverridesShapeDensity;
};

export type OptionsPluginOptionsOverridesDepthCards = SharedPresetDepthCards | undefined;

export type OptionsPluginOptionsOverridesDepthCodeBlocks = SharedPresetDepthCodeBlocks | undefined;

export type OptionsPluginOptionsOverridesDepth = {
  cards: OptionsPluginOptionsOverridesDepthCards;
  codeBlocks: OptionsPluginOptionsOverridesDepthCodeBlocks;
};

export type OptionsPluginOptionsOverridesMotionSpeed = SharedPresetMotionSpeed | undefined;

export type OptionsPluginOptionsOverridesMotionStaggeredReveals = SharedPresetMotionStaggeredReveals | undefined;

export type OptionsPluginOptionsOverridesMotionHoverEffects = SharedPresetMotionHoverEffects | undefined;

export type OptionsPluginOptionsOverridesMotion = {
  speed: OptionsPluginOptionsOverridesMotionSpeed;
  staggeredReveals: OptionsPluginOptionsOverridesMotionStaggeredReveals;
  hoverEffects: OptionsPluginOptionsOverridesMotionHoverEffects;
};

export type OptionsPluginOptionsOverridesNavbar = SharedPresetNavbar | undefined;

export type OptionsPluginOptionsOverridesFooter = SharedPresetFooter | undefined;

export type OptionsPluginOptionsOverrides = {
  colors: OptionsPluginOptionsOverridesColors;
  fonts: OptionsPluginOptionsOverridesFonts;
  shape: OptionsPluginOptionsOverridesShape;
  depth: OptionsPluginOptionsOverridesDepth;
  motion: OptionsPluginOptionsOverridesMotion;
  navbar: OptionsPluginOptionsOverridesNavbar;
  footer: OptionsPluginOptionsOverridesFooter;
};

export type OptionsPluginOptionsProgressBar = boolean | Record<string, unknown>;

export type OptionsPluginOptionsSearchLanguage = string[];

export type OptionsPluginOptionsSearchIndexDocs = boolean;

export type OptionsPluginOptionsSearchIndexBlog = boolean;

export type OptionsPluginOptionsSearchIndexPages = boolean;

export type OptionsPluginOptionsSearchHashed = boolean;

export type OptionsPluginOptionsSearchResultLimits = number;

export type OptionsPluginOptionsSearchHighlightSearchTermsOnTargetPage = boolean;

export type OptionsPluginOptionsSearchBarShortcutKeymap = string;

export type OptionsPluginOptionsSearchFuzzyMatchingDistance = number;

export type OptionsPluginOptionsSearchIgnorePatterns = string[];

export type OptionsPluginOptionsSearchDocsRouteBasePath = string;

export type OptionsPluginOptionsSearchConfig = {
  language?: OptionsPluginOptionsSearchLanguage;
  indexDocs?: OptionsPluginOptionsSearchIndexDocs;
  indexBlog?: OptionsPluginOptionsSearchIndexBlog;
  indexPages?: OptionsPluginOptionsSearchIndexPages;
  hashed?: OptionsPluginOptionsSearchHashed;
  searchResultLimits?: OptionsPluginOptionsSearchResultLimits;
  highlightSearchTermsOnTargetPage?: OptionsPluginOptionsSearchHighlightSearchTermsOnTargetPage;
  searchBarShortcutKeymap?: OptionsPluginOptionsSearchBarShortcutKeymap;
  fuzzyMatchingDistance?: OptionsPluginOptionsSearchFuzzyMatchingDistance;
  ignorePatterns?: OptionsPluginOptionsSearchIgnorePatterns;
  docsRouteBasePath?: OptionsPluginOptionsSearchDocsRouteBasePath;
  [key: string]: unknown;
};

export type OptionsPluginOptionsSearch = OptionsPluginOptionsSearchConfig | false;

/**
 * Options - Plugin Options Analytics.
 *
 * @since 0.15.0
 */
export type OptionsPluginOptionsAnalyticsGtmContainerId = string;

export type OptionsPluginOptionsAnalyticsGtm = {
  containerId: OptionsPluginOptionsAnalyticsGtmContainerId;
} | undefined;

export type OptionsPluginOptionsAnalytics = {
  gtm: OptionsPluginOptionsAnalyticsGtm;
};

/**
 * Options - Plugin Options Plugins.
 *
 * @since 0.15.0
 */
export type OptionsPluginOptionsPluginsDocs = Record<string, unknown> | undefined;

export type OptionsPluginOptionsPluginsBlog = Record<string, unknown> | false | undefined;

export type OptionsPluginOptionsPluginsPages = Record<string, unknown> | false | undefined;

export type OptionsPluginOptionsPluginsSitemap = Record<string, unknown> | false | undefined;

export type OptionsPluginOptionsPlugins = {
  docs: OptionsPluginOptionsPluginsDocs;
  blog: OptionsPluginOptionsPluginsBlog;
  pages: OptionsPluginOptionsPluginsPages;
  sitemap: OptionsPluginOptionsPluginsSitemap;
};

export type OptionsPluginOptions = {
  preset: OptionsPluginOptionsPreset;
  overrides: OptionsPluginOptionsOverrides;
  plugins: OptionsPluginOptionsPlugins;
  analytics: OptionsPluginOptionsAnalytics;
  progressBar: OptionsPluginOptionsProgressBar;
  search: OptionsPluginOptionsSearch;
};

/**
 * Options - Plugin Options Schema.
 *
 * @since 0.15.0
 */

/**
 * Options - Resolve Preset.
 *
 * @since 0.15.0
 */
export type OptionsResolvePresetOptions = OptionsPluginOptions;

export type OptionsResolvePresetReturns = SharedPreset;

export type OptionsResolvePresetBasePreset = SharedPreset;

export type OptionsResolvePresetResolvedLogo = SharedPresetLogo;

export type OptionsResolvePresetResolvedColorsPrimary = SharedHexColor;

export type OptionsResolvePresetResolvedColorsAccent = SharedHexColor;

export type OptionsResolvePresetResolvedColorsNeutral = SharedHexColor;

export type OptionsResolvePresetResolvedFontsDisplay = SharedPresetFontsDisplay;

export type OptionsResolvePresetResolvedFontsBody = SharedPresetFontsBody;

export type OptionsResolvePresetResolvedFontsCode = SharedPresetFontsCode;

export type OptionsResolvePresetResolvedShapeRadius = SharedPresetShapeRadius;

export type OptionsResolvePresetResolvedShapeDensity = SharedPresetShapeDensity;

export type OptionsResolvePresetResolvedDepthCards = SharedPresetDepthCards;

export type OptionsResolvePresetResolvedDepthCodeBlocks = SharedPresetDepthCodeBlocks;

export type OptionsResolvePresetResolvedMotionSpeed = SharedPresetMotionSpeed;

export type OptionsResolvePresetResolvedMotionStaggeredReveals = SharedPresetMotionStaggeredReveals;

export type OptionsResolvePresetResolvedMotionHoverEffects = SharedPresetMotionHoverEffects;

export type OptionsResolvePresetResolvedNavbar = SharedPresetNavbar;

export type OptionsResolvePresetResolvedFooter = SharedPresetFooter;

/**
 * Options - Theme Config Schema.
 *
 * @since 0.15.0
 */

/**
 * Options - Validate Options.
 *
 * @since 0.15.0
 */
export type OptionsValidateOptionsDataValidate = (schema: unknown, options: unknown) => OptionsPluginOptions;

export type OptionsValidateOptionsDataOptions = Record<string, unknown>;

export type OptionsValidateOptionsData = {
  validate: OptionsValidateOptionsDataValidate;
  options: OptionsValidateOptionsDataOptions;
};

export type OptionsValidateOptionsValidate = (schema: unknown, options: unknown) => OptionsPluginOptions;

export type OptionsValidateOptionsInput = Record<string, unknown>;

export type OptionsValidateOptionsReturns = OptionsPluginOptions;

/**
 * Options - Validate Theme Config.
 *
 * @since 0.15.0
 */
export type OptionsValidateThemeConfigDataValidate = (schema: unknown, themeConfig: unknown) => Record<string, unknown>;

export type OptionsValidateThemeConfigDataThemeConfig = Record<string, unknown>;

export type OptionsValidateThemeConfigData = {
  validate: OptionsValidateThemeConfigDataValidate;
  themeConfig: OptionsValidateThemeConfigDataThemeConfig;
};

export type OptionsValidateThemeConfigValidate = (schema: unknown, themeConfig: unknown) => Record<string, unknown>;

export type OptionsValidateThemeConfigInput = Record<string, unknown>;

export type OptionsValidateThemeConfigReturns = Record<string, unknown>;
