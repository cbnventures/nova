import type {
  SharedHexColor,
  SharedPreset,
  SharedPresetFontsBody,
  SharedPresetFontsCode,
  SharedPresetFontsDisplay,
  SharedPresetFooter,
  SharedPresetLogo,
  SharedPresetName,
  SharedPresetNavbar,
} from './shared.d.ts';

export type OptionsPluginOptionsPreset = SharedPresetName;

export type OptionsPluginOptionsOverridesColorsPrimaryLight = SharedHexColor | undefined;

export type OptionsPluginOptionsOverridesColorsPrimaryDark = SharedHexColor | undefined;

export type OptionsPluginOptionsOverridesColorsPrimary = {
  light: OptionsPluginOptionsOverridesColorsPrimaryLight;
  dark: OptionsPluginOptionsOverridesColorsPrimaryDark;
} | undefined;

export type OptionsPluginOptionsOverridesColorsSecondaryLight = SharedHexColor | undefined;

export type OptionsPluginOptionsOverridesColorsSecondaryDark = SharedHexColor | undefined;

export type OptionsPluginOptionsOverridesColorsSecondary = {
  light: OptionsPluginOptionsOverridesColorsSecondaryLight;
  dark: OptionsPluginOptionsOverridesColorsSecondaryDark;
} | undefined;

export type OptionsPluginOptionsOverridesColorsTextLight = SharedHexColor | undefined;

export type OptionsPluginOptionsOverridesColorsTextDark = SharedHexColor | undefined;

export type OptionsPluginOptionsOverridesColorsText = {
  light: OptionsPluginOptionsOverridesColorsTextLight;
  dark: OptionsPluginOptionsOverridesColorsTextDark;
} | undefined;

export type OptionsPluginOptionsOverridesColorsBorderLight = SharedHexColor | undefined;

export type OptionsPluginOptionsOverridesColorsBorderDark = SharedHexColor | undefined;

export type OptionsPluginOptionsOverridesColorsBorder = {
  light: OptionsPluginOptionsOverridesColorsBorderLight;
  dark: OptionsPluginOptionsOverridesColorsBorderDark;
} | undefined;

export type OptionsPluginOptionsOverridesColorsWarningLight = SharedHexColor | undefined;

export type OptionsPluginOptionsOverridesColorsWarningDark = SharedHexColor | undefined;

export type OptionsPluginOptionsOverridesColorsWarning = {
  light: OptionsPluginOptionsOverridesColorsWarningLight;
  dark: OptionsPluginOptionsOverridesColorsWarningDark;
} | undefined;

export type OptionsPluginOptionsOverridesColorsDangerLight = SharedHexColor | undefined;

export type OptionsPluginOptionsOverridesColorsDangerDark = SharedHexColor | undefined;

export type OptionsPluginOptionsOverridesColorsDanger = {
  light: OptionsPluginOptionsOverridesColorsDangerLight;
  dark: OptionsPluginOptionsOverridesColorsDangerDark;
} | undefined;

export type OptionsPluginOptionsOverridesColors = {
  primary: OptionsPluginOptionsOverridesColorsPrimary;
  secondary: OptionsPluginOptionsOverridesColorsSecondary;
  text: OptionsPluginOptionsOverridesColorsText;
  border: OptionsPluginOptionsOverridesColorsBorder;
  warning: OptionsPluginOptionsOverridesColorsWarning;
  danger: OptionsPluginOptionsOverridesColorsDanger;
};

export type OptionsPluginOptionsOverridesFontsDisplay = SharedPresetFontsDisplay | undefined;

export type OptionsPluginOptionsOverridesFontsBody = SharedPresetFontsBody | undefined;

export type OptionsPluginOptionsOverridesFontsCode = SharedPresetFontsCode | undefined;

export type OptionsPluginOptionsOverridesFonts = {
  display: OptionsPluginOptionsOverridesFontsDisplay;
  body: OptionsPluginOptionsOverridesFontsBody;
  code: OptionsPluginOptionsOverridesFontsCode;
};

export type OptionsPluginOptionsOverridesNavbar = SharedPresetNavbar | undefined;

export type OptionsPluginOptionsOverridesFooter = SharedPresetFooter | undefined;

export type OptionsPluginOptionsOverrides = {
  colors: OptionsPluginOptionsOverridesColors;
  fonts: OptionsPluginOptionsOverridesFonts;
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

export type OptionsResolvePresetResolvedColorsPrimaryLight = SharedHexColor;

export type OptionsResolvePresetResolvedColorsPrimaryDark = SharedHexColor;

export type OptionsResolvePresetResolvedColorsPrimary = {
  light: OptionsResolvePresetResolvedColorsPrimaryLight;
  dark: OptionsResolvePresetResolvedColorsPrimaryDark;
};

export type OptionsResolvePresetResolvedColorsAccentLight = SharedHexColor;

export type OptionsResolvePresetResolvedColorsAccentDark = SharedHexColor;

export type OptionsResolvePresetResolvedColorsAccent = {
  light: OptionsResolvePresetResolvedColorsAccentLight;
  dark: OptionsResolvePresetResolvedColorsAccentDark;
};

export type OptionsResolvePresetResolvedColorsTextLight = SharedHexColor;

export type OptionsResolvePresetResolvedColorsTextDark = SharedHexColor;

export type OptionsResolvePresetResolvedColorsText = {
  light: OptionsResolvePresetResolvedColorsTextLight;
  dark: OptionsResolvePresetResolvedColorsTextDark;
};

export type OptionsResolvePresetResolvedColorsBorderLight = SharedHexColor;

export type OptionsResolvePresetResolvedColorsBorderDark = SharedHexColor;

export type OptionsResolvePresetResolvedColorsBorder = {
  light: OptionsResolvePresetResolvedColorsBorderLight;
  dark: OptionsResolvePresetResolvedColorsBorderDark;
};

export type OptionsResolvePresetResolvedColorsWarningLight = SharedHexColor;

export type OptionsResolvePresetResolvedColorsWarningDark = SharedHexColor;

export type OptionsResolvePresetResolvedColorsWarning = {
  light: OptionsResolvePresetResolvedColorsWarningLight;
  dark: OptionsResolvePresetResolvedColorsWarningDark;
};

export type OptionsResolvePresetResolvedColorsDangerLight = SharedHexColor;

export type OptionsResolvePresetResolvedColorsDangerDark = SharedHexColor;

export type OptionsResolvePresetResolvedColorsDanger = {
  light: OptionsResolvePresetResolvedColorsDangerLight;
  dark: OptionsResolvePresetResolvedColorsDangerDark;
};

export type OptionsResolvePresetResolvedFontsDisplay = SharedPresetFontsDisplay;

export type OptionsResolvePresetResolvedFontsBody = SharedPresetFontsBody;

export type OptionsResolvePresetResolvedFontsCode = SharedPresetFontsCode;

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
