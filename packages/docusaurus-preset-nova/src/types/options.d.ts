import type {
  Shared_HexColor,
  Shared_Preset,
  Shared_Preset_Colors,
  Shared_Preset_Cta,
  Shared_Preset_Depth,
  Shared_Preset_Fonts,
  Shared_Preset_Fonts_Body,
  Shared_Preset_Fonts_Code,
  Shared_Preset_Fonts_Display,
  Shared_Preset_Footer,
  Shared_Preset_Logo,
  Shared_Preset_Motion,
  Shared_Preset_Navbar,
  Shared_Preset_Shape,
  Shared_PresetName,
} from './shared.d.ts';

export type Options_PluginOptions_Preset = Shared_PresetName;

export type Options_PluginOptions_Overrides_Colors_Primary_Value_Light = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Primary_Value_Dark = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Primary_Value = {
  light: Options_PluginOptions_Overrides_Colors_Primary_Value_Light;
  dark: Options_PluginOptions_Overrides_Colors_Primary_Value_Dark;
};

export type Options_PluginOptions_Overrides_Colors_Primary = Options_PluginOptions_Overrides_Colors_Primary_Value | undefined;

export type Options_PluginOptions_Overrides_Colors_Secondary_Value_Light = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Secondary_Value_Dark = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Secondary_Value = {
  light: Options_PluginOptions_Overrides_Colors_Secondary_Value_Light;
  dark: Options_PluginOptions_Overrides_Colors_Secondary_Value_Dark;
};

export type Options_PluginOptions_Overrides_Colors_Secondary = Options_PluginOptions_Overrides_Colors_Secondary_Value | undefined;

export type Options_PluginOptions_Overrides_Colors_Text_Value_Light = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Text_Value_Dark = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Text_Value = {
  light: Options_PluginOptions_Overrides_Colors_Text_Value_Light;
  dark: Options_PluginOptions_Overrides_Colors_Text_Value_Dark;
};

export type Options_PluginOptions_Overrides_Colors_Text = Options_PluginOptions_Overrides_Colors_Text_Value | undefined;

export type Options_PluginOptions_Overrides_Colors_Border_Value_Light = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Border_Value_Dark = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Border_Value = {
  light: Options_PluginOptions_Overrides_Colors_Border_Value_Light;
  dark: Options_PluginOptions_Overrides_Colors_Border_Value_Dark;
};

export type Options_PluginOptions_Overrides_Colors_Border = Options_PluginOptions_Overrides_Colors_Border_Value | undefined;

export type Options_PluginOptions_Overrides_Colors_Warning_Value_Light = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Warning_Value_Dark = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Warning_Value = {
  light: Options_PluginOptions_Overrides_Colors_Warning_Value_Light;
  dark: Options_PluginOptions_Overrides_Colors_Warning_Value_Dark;
};

export type Options_PluginOptions_Overrides_Colors_Warning = Options_PluginOptions_Overrides_Colors_Warning_Value | undefined;

export type Options_PluginOptions_Overrides_Colors_Danger_Value_Light = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Danger_Value_Dark = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Danger_Value = {
  light: Options_PluginOptions_Overrides_Colors_Danger_Value_Light;
  dark: Options_PluginOptions_Overrides_Colors_Danger_Value_Dark;
};

export type Options_PluginOptions_Overrides_Colors_Danger = Options_PluginOptions_Overrides_Colors_Danger_Value | undefined;

export type Options_PluginOptions_Overrides_Colors = {
  primary: Options_PluginOptions_Overrides_Colors_Primary;
  secondary: Options_PluginOptions_Overrides_Colors_Secondary;
  text: Options_PluginOptions_Overrides_Colors_Text;
  border: Options_PluginOptions_Overrides_Colors_Border;
  warning: Options_PluginOptions_Overrides_Colors_Warning;
  danger: Options_PluginOptions_Overrides_Colors_Danger;
};

export type Options_PluginOptions_Overrides_Fonts_Display = Shared_Preset_Fonts_Display | undefined;

export type Options_PluginOptions_Overrides_Fonts_Body = Shared_Preset_Fonts_Body | undefined;

export type Options_PluginOptions_Overrides_Fonts_Code = Shared_Preset_Fonts_Code | undefined;

export type Options_PluginOptions_Overrides_Fonts = {
  display: Options_PluginOptions_Overrides_Fonts_Display;
  body: Options_PluginOptions_Overrides_Fonts_Body;
  code: Options_PluginOptions_Overrides_Fonts_Code;
};

export type Options_PluginOptions_Overrides_Navbar = Shared_Preset_Navbar | undefined;

export type Options_PluginOptions_Overrides_Footer = Shared_Preset_Footer | undefined;

export type Options_PluginOptions_Overrides = {
  colors: Options_PluginOptions_Overrides_Colors;
  fonts: Options_PluginOptions_Overrides_Fonts;
  navbar: Options_PluginOptions_Overrides_Navbar;
  footer: Options_PluginOptions_Overrides_Footer;
};

export type Options_PluginOptions_ProgressBar = boolean | Record<string, unknown>;

export type Options_PluginOptionsSearchConfig_Language = string[];

export type Options_PluginOptionsSearchConfig_IndexDocs = boolean;

export type Options_PluginOptionsSearchConfig_IndexBlog = boolean;

export type Options_PluginOptionsSearchConfig_IndexPages = boolean;

export type Options_PluginOptionsSearchConfig_Hashed = boolean;

export type Options_PluginOptionsSearchConfig_SearchResultLimits = number;

export type Options_PluginOptionsSearchConfig_HighlightSearchTermsOnTargetPage = boolean;

export type Options_PluginOptionsSearchConfig_SearchBarShortcutKeymap = string;

export type Options_PluginOptionsSearchConfig_FuzzyMatchingDistance = number;

export type Options_PluginOptionsSearchConfig_IgnorePatterns = string[];

export type Options_PluginOptionsSearchConfig_DocsRouteBasePath = string;

export type Options_PluginOptionsSearchConfig = {
  language?: Options_PluginOptionsSearchConfig_Language;
  indexDocs?: Options_PluginOptionsSearchConfig_IndexDocs;
  indexBlog?: Options_PluginOptionsSearchConfig_IndexBlog;
  indexPages?: Options_PluginOptionsSearchConfig_IndexPages;
  hashed?: Options_PluginOptionsSearchConfig_Hashed;
  searchResultLimits?: Options_PluginOptionsSearchConfig_SearchResultLimits;
  highlightSearchTermsOnTargetPage?: Options_PluginOptionsSearchConfig_HighlightSearchTermsOnTargetPage;
  searchBarShortcutKeymap?: Options_PluginOptionsSearchConfig_SearchBarShortcutKeymap;
  fuzzyMatchingDistance?: Options_PluginOptionsSearchConfig_FuzzyMatchingDistance;
  ignorePatterns?: Options_PluginOptionsSearchConfig_IgnorePatterns;
  docsRouteBasePath?: Options_PluginOptionsSearchConfig_DocsRouteBasePath;
  [key: string]: unknown;
};

export type Options_PluginOptions_Search = Options_PluginOptionsSearchConfig | false;

/**
 * Options - Plugin Options Analytics.
 *
 * @since 0.15.0
 */
export type Options_PluginOptions_Analytics_Gtm_Value_ContainerId = string;

export type Options_PluginOptions_Analytics_Gtm_Value = {
  containerId: Options_PluginOptions_Analytics_Gtm_Value_ContainerId;
};

export type Options_PluginOptions_Analytics_Gtm = Options_PluginOptions_Analytics_Gtm_Value | undefined;

export type Options_PluginOptions_Analytics = {
  gtm: Options_PluginOptions_Analytics_Gtm;
};

/**
 * Options - Plugin Options Plugins.
 *
 * @since 0.15.0
 */
export type Options_PluginOptions_Plugins_Docs = Record<string, unknown> | undefined;

export type Options_PluginOptions_Plugins_Blog = Record<string, unknown> | false | undefined;

export type Options_PluginOptions_Plugins_Pages = Record<string, unknown> | false | undefined;

export type Options_PluginOptions_Plugins_Sitemap = Record<string, unknown> | false | undefined;

export type Options_PluginOptions_Plugins = {
  docs: Options_PluginOptions_Plugins_Docs;
  blog: Options_PluginOptions_Plugins_Blog;
  pages: Options_PluginOptions_Plugins_Pages;
  sitemap: Options_PluginOptions_Plugins_Sitemap;
};

export type Options_PluginOptions_IconSafelist = string[];

export type Options_PluginOptions_MaxBundleFileSize = number | false;

export type Options_PluginOptions = {
  preset: Options_PluginOptions_Preset;
  overrides: Options_PluginOptions_Overrides;
  plugins: Options_PluginOptions_Plugins;
  analytics: Options_PluginOptions_Analytics;
  progressBar: Options_PluginOptions_ProgressBar;
  search: Options_PluginOptions_Search;
  iconSafelist: Options_PluginOptions_IconSafelist;
  maxBundleFileSize: Options_PluginOptions_MaxBundleFileSize;
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
export type Options_ResolvePreset_Options_Preset = Shared_PresetName;

export type Options_ResolvePreset_Options_Overrides_Colors_Primary_Value_Light = Shared_HexColor | undefined;

export type Options_ResolvePreset_Options_Overrides_Colors_Primary_Value_Dark = Shared_HexColor | undefined;

export type Options_ResolvePreset_Options_Overrides_Colors_Primary_Value = {
  light: Options_ResolvePreset_Options_Overrides_Colors_Primary_Value_Light;
  dark: Options_ResolvePreset_Options_Overrides_Colors_Primary_Value_Dark;
};

export type Options_ResolvePreset_Options_Overrides_Colors_Primary = Options_ResolvePreset_Options_Overrides_Colors_Primary_Value | undefined;

export type Options_ResolvePreset_Options_Overrides_Colors_Secondary_Value_Light = Shared_HexColor | undefined;

export type Options_ResolvePreset_Options_Overrides_Colors_Secondary_Value_Dark = Shared_HexColor | undefined;

export type Options_ResolvePreset_Options_Overrides_Colors_Secondary_Value = {
  light: Options_ResolvePreset_Options_Overrides_Colors_Secondary_Value_Light;
  dark: Options_ResolvePreset_Options_Overrides_Colors_Secondary_Value_Dark;
};

export type Options_ResolvePreset_Options_Overrides_Colors_Secondary = Options_ResolvePreset_Options_Overrides_Colors_Secondary_Value | undefined;

export type Options_ResolvePreset_Options_Overrides_Colors_Text_Value_Light = Shared_HexColor | undefined;

export type Options_ResolvePreset_Options_Overrides_Colors_Text_Value_Dark = Shared_HexColor | undefined;

export type Options_ResolvePreset_Options_Overrides_Colors_Text_Value = {
  light: Options_ResolvePreset_Options_Overrides_Colors_Text_Value_Light;
  dark: Options_ResolvePreset_Options_Overrides_Colors_Text_Value_Dark;
};

export type Options_ResolvePreset_Options_Overrides_Colors_Text = Options_ResolvePreset_Options_Overrides_Colors_Text_Value | undefined;

export type Options_ResolvePreset_Options_Overrides_Colors_Border_Value_Light = Shared_HexColor | undefined;

export type Options_ResolvePreset_Options_Overrides_Colors_Border_Value_Dark = Shared_HexColor | undefined;

export type Options_ResolvePreset_Options_Overrides_Colors_Border_Value = {
  light: Options_ResolvePreset_Options_Overrides_Colors_Border_Value_Light;
  dark: Options_ResolvePreset_Options_Overrides_Colors_Border_Value_Dark;
};

export type Options_ResolvePreset_Options_Overrides_Colors_Border = Options_ResolvePreset_Options_Overrides_Colors_Border_Value | undefined;

export type Options_ResolvePreset_Options_Overrides_Colors_Warning_Value_Light = Shared_HexColor | undefined;

export type Options_ResolvePreset_Options_Overrides_Colors_Warning_Value_Dark = Shared_HexColor | undefined;

export type Options_ResolvePreset_Options_Overrides_Colors_Warning_Value = {
  light: Options_ResolvePreset_Options_Overrides_Colors_Warning_Value_Light;
  dark: Options_ResolvePreset_Options_Overrides_Colors_Warning_Value_Dark;
};

export type Options_ResolvePreset_Options_Overrides_Colors_Warning = Options_ResolvePreset_Options_Overrides_Colors_Warning_Value | undefined;

export type Options_ResolvePreset_Options_Overrides_Colors_Danger_Value_Light = Shared_HexColor | undefined;

export type Options_ResolvePreset_Options_Overrides_Colors_Danger_Value_Dark = Shared_HexColor | undefined;

export type Options_ResolvePreset_Options_Overrides_Colors_Danger_Value = {
  light: Options_ResolvePreset_Options_Overrides_Colors_Danger_Value_Light;
  dark: Options_ResolvePreset_Options_Overrides_Colors_Danger_Value_Dark;
};

export type Options_ResolvePreset_Options_Overrides_Colors_Danger = Options_ResolvePreset_Options_Overrides_Colors_Danger_Value | undefined;

export type Options_ResolvePreset_Options_Overrides_Colors = {
  primary: Options_ResolvePreset_Options_Overrides_Colors_Primary;
  secondary: Options_ResolvePreset_Options_Overrides_Colors_Secondary;
  text: Options_ResolvePreset_Options_Overrides_Colors_Text;
  border: Options_ResolvePreset_Options_Overrides_Colors_Border;
  warning: Options_ResolvePreset_Options_Overrides_Colors_Warning;
  danger: Options_ResolvePreset_Options_Overrides_Colors_Danger;
};

export type Options_ResolvePreset_Options_Overrides_Fonts_Display = Shared_Preset_Fonts_Display | undefined;

export type Options_ResolvePreset_Options_Overrides_Fonts_Body = Shared_Preset_Fonts_Body | undefined;

export type Options_ResolvePreset_Options_Overrides_Fonts_Code = Shared_Preset_Fonts_Code | undefined;

export type Options_ResolvePreset_Options_Overrides_Fonts = {
  display: Options_ResolvePreset_Options_Overrides_Fonts_Display;
  body: Options_ResolvePreset_Options_Overrides_Fonts_Body;
  code: Options_ResolvePreset_Options_Overrides_Fonts_Code;
};

export type Options_ResolvePreset_Options_Overrides_Navbar = Shared_Preset_Navbar | undefined;

export type Options_ResolvePreset_Options_Overrides_Footer = Shared_Preset_Footer | undefined;

export type Options_ResolvePreset_Options_Overrides = {
  colors: Options_ResolvePreset_Options_Overrides_Colors;
  fonts: Options_ResolvePreset_Options_Overrides_Fonts;
  navbar: Options_ResolvePreset_Options_Overrides_Navbar;
  footer: Options_ResolvePreset_Options_Overrides_Footer;
};

export type Options_ResolvePreset_Options_Plugins_Docs = Record<string, unknown> | undefined;

export type Options_ResolvePreset_Options_Plugins_Blog = Record<string, unknown> | false | undefined;

export type Options_ResolvePreset_Options_Plugins_Pages = Record<string, unknown> | false | undefined;

export type Options_ResolvePreset_Options_Plugins_Sitemap = Record<string, unknown> | false | undefined;

export type Options_ResolvePreset_Options_Plugins = {
  docs: Options_ResolvePreset_Options_Plugins_Docs;
  blog: Options_ResolvePreset_Options_Plugins_Blog;
  pages: Options_ResolvePreset_Options_Plugins_Pages;
  sitemap: Options_ResolvePreset_Options_Plugins_Sitemap;
};

export type Options_ResolvePreset_Options_Analytics_Gtm_Value_ContainerId = string;

export type Options_ResolvePreset_Options_Analytics_Gtm_Value = {
  containerId: Options_ResolvePreset_Options_Analytics_Gtm_Value_ContainerId;
};

export type Options_ResolvePreset_Options_Analytics_Gtm = Options_ResolvePreset_Options_Analytics_Gtm_Value | undefined;

export type Options_ResolvePreset_Options_Analytics = {
  gtm: Options_ResolvePreset_Options_Analytics_Gtm;
};

export type Options_ResolvePreset_Options_ProgressBar = boolean | Record<string, unknown>;

export type Options_ResolvePreset_Options_Search_Config_Language = string[];

export type Options_ResolvePreset_Options_Search_Config_IndexDocs = boolean;

export type Options_ResolvePreset_Options_Search_Config_IndexBlog = boolean;

export type Options_ResolvePreset_Options_Search_Config_IndexPages = boolean;

export type Options_ResolvePreset_Options_Search_Config_Hashed = boolean;

export type Options_ResolvePreset_Options_Search_Config_SearchResultLimits = number;

export type Options_ResolvePreset_Options_Search_Config_HighlightSearchTermsOnTargetPage = boolean;

export type Options_ResolvePreset_Options_Search_Config_SearchBarShortcutKeymap = string;

export type Options_ResolvePreset_Options_Search_Config_FuzzyMatchingDistance = number;

export type Options_ResolvePreset_Options_Search_Config_IgnorePatterns = string[];

export type Options_ResolvePreset_Options_Search_Config_DocsRouteBasePath = string;

export type Options_ResolvePreset_Options_Search_Config = {
  language?: Options_ResolvePreset_Options_Search_Config_Language;
  indexDocs?: Options_ResolvePreset_Options_Search_Config_IndexDocs;
  indexBlog?: Options_ResolvePreset_Options_Search_Config_IndexBlog;
  indexPages?: Options_ResolvePreset_Options_Search_Config_IndexPages;
  hashed?: Options_ResolvePreset_Options_Search_Config_Hashed;
  searchResultLimits?: Options_ResolvePreset_Options_Search_Config_SearchResultLimits;
  highlightSearchTermsOnTargetPage?: Options_ResolvePreset_Options_Search_Config_HighlightSearchTermsOnTargetPage;
  searchBarShortcutKeymap?: Options_ResolvePreset_Options_Search_Config_SearchBarShortcutKeymap;
  fuzzyMatchingDistance?: Options_ResolvePreset_Options_Search_Config_FuzzyMatchingDistance;
  ignorePatterns?: Options_ResolvePreset_Options_Search_Config_IgnorePatterns;
  docsRouteBasePath?: Options_ResolvePreset_Options_Search_Config_DocsRouteBasePath;
  [key: string]: unknown;
};

export type Options_ResolvePreset_Options_Search = Options_ResolvePreset_Options_Search_Config | false;

export type Options_ResolvePreset_Options = {
  preset: Options_ResolvePreset_Options_Preset;
  overrides: Options_ResolvePreset_Options_Overrides;
  plugins: Options_ResolvePreset_Options_Plugins;
  analytics: Options_ResolvePreset_Options_Analytics;
  progressBar: Options_ResolvePreset_Options_ProgressBar;
  search: Options_ResolvePreset_Options_Search;
};

export type Options_ResolvePreset_Returns = Shared_Preset;

export type Options_ResolvePreset_BasePreset_Logo = Shared_Preset_Logo;

export type Options_ResolvePreset_BasePreset_Colors = Shared_Preset_Colors;

export type Options_ResolvePreset_BasePreset_Fonts = Shared_Preset_Fonts;

export type Options_ResolvePreset_BasePreset_Shape = Shared_Preset_Shape;

export type Options_ResolvePreset_BasePreset_Depth = Shared_Preset_Depth;

export type Options_ResolvePreset_BasePreset_Motion = Shared_Preset_Motion;

export type Options_ResolvePreset_BasePreset_Navbar = Shared_Preset_Navbar;

export type Options_ResolvePreset_BasePreset_Footer = Shared_Preset_Footer;

export type Options_ResolvePreset_BasePreset_Cta = Shared_Preset_Cta;

export type Options_ResolvePreset_BasePreset = {
  logo: Options_ResolvePreset_BasePreset_Logo;
  colors: Options_ResolvePreset_BasePreset_Colors;
  fonts: Options_ResolvePreset_BasePreset_Fonts;
  shape: Options_ResolvePreset_BasePreset_Shape;
  depth: Options_ResolvePreset_BasePreset_Depth;
  motion: Options_ResolvePreset_BasePreset_Motion;
  navbar: Options_ResolvePreset_BasePreset_Navbar;
  footer: Options_ResolvePreset_BasePreset_Footer;
  cta: Options_ResolvePreset_BasePreset_Cta;
};

export type Options_ResolvePreset_ResolvedLogo_Alt = string;

export type Options_ResolvePreset_ResolvedLogo_Src = string;

export type Options_ResolvePreset_ResolvedLogo = {
  alt: Options_ResolvePreset_ResolvedLogo_Alt;
  src: Options_ResolvePreset_ResolvedLogo_Src;
};

export type Options_ResolvePreset_OverridePrimary_Value_Light = Shared_HexColor | undefined;

export type Options_ResolvePreset_OverridePrimary_Value_Dark = Shared_HexColor | undefined;

export type Options_ResolvePreset_OverridePrimary_Value = {
  light: Options_ResolvePreset_OverridePrimary_Value_Light;
  dark: Options_ResolvePreset_OverridePrimary_Value_Dark;
};

export type Options_ResolvePreset_OverridePrimary = Options_ResolvePreset_OverridePrimary_Value | undefined;

export type Options_ResolvePreset_ResolvedColorsPrimary_Light = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsPrimary_Dark = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsPrimary = {
  light: Options_ResolvePreset_ResolvedColorsPrimary_Light;
  dark: Options_ResolvePreset_ResolvedColorsPrimary_Dark;
};

export type Options_ResolvePreset_OverrideSecondary_Value_Light = Shared_HexColor | undefined;

export type Options_ResolvePreset_OverrideSecondary_Value_Dark = Shared_HexColor | undefined;

export type Options_ResolvePreset_OverrideSecondary_Value = {
  light: Options_ResolvePreset_OverrideSecondary_Value_Light;
  dark: Options_ResolvePreset_OverrideSecondary_Value_Dark;
};

export type Options_ResolvePreset_OverrideSecondary = Options_ResolvePreset_OverrideSecondary_Value | undefined;

export type Options_ResolvePreset_ResolvedColorsAccent_Light = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsAccent_Dark = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsAccent = {
  light: Options_ResolvePreset_ResolvedColorsAccent_Light;
  dark: Options_ResolvePreset_ResolvedColorsAccent_Dark;
};

export type Options_ResolvePreset_OverrideText_Value_Light = Shared_HexColor | undefined;

export type Options_ResolvePreset_OverrideText_Value_Dark = Shared_HexColor | undefined;

export type Options_ResolvePreset_OverrideText_Value = {
  light: Options_ResolvePreset_OverrideText_Value_Light;
  dark: Options_ResolvePreset_OverrideText_Value_Dark;
};

export type Options_ResolvePreset_OverrideText = Options_ResolvePreset_OverrideText_Value | undefined;

export type Options_ResolvePreset_ResolvedColorsText_Light = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsText_Dark = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsText = {
  light: Options_ResolvePreset_ResolvedColorsText_Light;
  dark: Options_ResolvePreset_ResolvedColorsText_Dark;
};

export type Options_ResolvePreset_OverrideBorder_Value_Light = Shared_HexColor | undefined;

export type Options_ResolvePreset_OverrideBorder_Value_Dark = Shared_HexColor | undefined;

export type Options_ResolvePreset_OverrideBorder_Value = {
  light: Options_ResolvePreset_OverrideBorder_Value_Light;
  dark: Options_ResolvePreset_OverrideBorder_Value_Dark;
};

export type Options_ResolvePreset_OverrideBorder = Options_ResolvePreset_OverrideBorder_Value | undefined;

export type Options_ResolvePreset_ResolvedColorsBorder_Light = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsBorder_Dark = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsBorder = {
  light: Options_ResolvePreset_ResolvedColorsBorder_Light;
  dark: Options_ResolvePreset_ResolvedColorsBorder_Dark;
};

export type Options_ResolvePreset_OverrideWarning_Value_Light = Shared_HexColor | undefined;

export type Options_ResolvePreset_OverrideWarning_Value_Dark = Shared_HexColor | undefined;

export type Options_ResolvePreset_OverrideWarning_Value = {
  light: Options_ResolvePreset_OverrideWarning_Value_Light;
  dark: Options_ResolvePreset_OverrideWarning_Value_Dark;
};

export type Options_ResolvePreset_OverrideWarning = Options_ResolvePreset_OverrideWarning_Value | undefined;

export type Options_ResolvePreset_ResolvedColorsWarning_Light = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsWarning_Dark = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsWarning = {
  light: Options_ResolvePreset_ResolvedColorsWarning_Light;
  dark: Options_ResolvePreset_ResolvedColorsWarning_Dark;
};

export type Options_ResolvePreset_OverrideDanger_Value_Light = Shared_HexColor | undefined;

export type Options_ResolvePreset_OverrideDanger_Value_Dark = Shared_HexColor | undefined;

export type Options_ResolvePreset_OverrideDanger_Value = {
  light: Options_ResolvePreset_OverrideDanger_Value_Light;
  dark: Options_ResolvePreset_OverrideDanger_Value_Dark;
};

export type Options_ResolvePreset_OverrideDanger = Options_ResolvePreset_OverrideDanger_Value | undefined;

export type Options_ResolvePreset_ResolvedColorsDanger_Light = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsDanger_Dark = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsDanger = {
  light: Options_ResolvePreset_ResolvedColorsDanger_Light;
  dark: Options_ResolvePreset_ResolvedColorsDanger_Dark;
};

export type Options_ResolvePreset_ResolvedFontsDisplay = string;

export type Options_ResolvePreset_ResolvedFontsBody = string;

export type Options_ResolvePreset_ResolvedFontsCode = string;

export type Options_ResolvePreset_ResolvedNavbar = 'bridge' | 'canopy' | 'monolith' | 'compass';

export type Options_ResolvePreset_ResolvedFooter = 'commons' | 'embassy' | 'ledger' | 'launchpad';

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
export type Options_ValidateOptions_Data_Validate = (schema: unknown, options: unknown) => Options_ValidateOptions_Returns;

export type Options_ValidateOptions_Data_Options = Record<string, unknown>;

export type Options_ValidateOptions_Data = {
  validate: Options_ValidateOptions_Data_Validate;
  options: Options_ValidateOptions_Data_Options;
};

export type Options_ValidateOptions_Returns_Preset = Shared_PresetName;

export type Options_ValidateOptions_Returns_Overrides_Colors_Primary_Value_Light = Shared_HexColor | undefined;

export type Options_ValidateOptions_Returns_Overrides_Colors_Primary_Value_Dark = Shared_HexColor | undefined;

export type Options_ValidateOptions_Returns_Overrides_Colors_Primary_Value = {
  light: Options_ValidateOptions_Returns_Overrides_Colors_Primary_Value_Light;
  dark: Options_ValidateOptions_Returns_Overrides_Colors_Primary_Value_Dark;
};

export type Options_ValidateOptions_Returns_Overrides_Colors_Primary = Options_ValidateOptions_Returns_Overrides_Colors_Primary_Value | undefined;

export type Options_ValidateOptions_Returns_Overrides_Colors_Secondary_Value_Light = Shared_HexColor | undefined;

export type Options_ValidateOptions_Returns_Overrides_Colors_Secondary_Value_Dark = Shared_HexColor | undefined;

export type Options_ValidateOptions_Returns_Overrides_Colors_Secondary_Value = {
  light: Options_ValidateOptions_Returns_Overrides_Colors_Secondary_Value_Light;
  dark: Options_ValidateOptions_Returns_Overrides_Colors_Secondary_Value_Dark;
};

export type Options_ValidateOptions_Returns_Overrides_Colors_Secondary = Options_ValidateOptions_Returns_Overrides_Colors_Secondary_Value | undefined;

export type Options_ValidateOptions_Returns_Overrides_Colors_Text_Value_Light = Shared_HexColor | undefined;

export type Options_ValidateOptions_Returns_Overrides_Colors_Text_Value_Dark = Shared_HexColor | undefined;

export type Options_ValidateOptions_Returns_Overrides_Colors_Text_Value = {
  light: Options_ValidateOptions_Returns_Overrides_Colors_Text_Value_Light;
  dark: Options_ValidateOptions_Returns_Overrides_Colors_Text_Value_Dark;
};

export type Options_ValidateOptions_Returns_Overrides_Colors_Text = Options_ValidateOptions_Returns_Overrides_Colors_Text_Value | undefined;

export type Options_ValidateOptions_Returns_Overrides_Colors_Border_Value_Light = Shared_HexColor | undefined;

export type Options_ValidateOptions_Returns_Overrides_Colors_Border_Value_Dark = Shared_HexColor | undefined;

export type Options_ValidateOptions_Returns_Overrides_Colors_Border_Value = {
  light: Options_ValidateOptions_Returns_Overrides_Colors_Border_Value_Light;
  dark: Options_ValidateOptions_Returns_Overrides_Colors_Border_Value_Dark;
};

export type Options_ValidateOptions_Returns_Overrides_Colors_Border = Options_ValidateOptions_Returns_Overrides_Colors_Border_Value | undefined;

export type Options_ValidateOptions_Returns_Overrides_Colors_Warning_Value_Light = Shared_HexColor | undefined;

export type Options_ValidateOptions_Returns_Overrides_Colors_Warning_Value_Dark = Shared_HexColor | undefined;

export type Options_ValidateOptions_Returns_Overrides_Colors_Warning_Value = {
  light: Options_ValidateOptions_Returns_Overrides_Colors_Warning_Value_Light;
  dark: Options_ValidateOptions_Returns_Overrides_Colors_Warning_Value_Dark;
};

export type Options_ValidateOptions_Returns_Overrides_Colors_Warning = Options_ValidateOptions_Returns_Overrides_Colors_Warning_Value | undefined;

export type Options_ValidateOptions_Returns_Overrides_Colors_Danger_Value_Light = Shared_HexColor | undefined;

export type Options_ValidateOptions_Returns_Overrides_Colors_Danger_Value_Dark = Shared_HexColor | undefined;

export type Options_ValidateOptions_Returns_Overrides_Colors_Danger_Value = {
  light: Options_ValidateOptions_Returns_Overrides_Colors_Danger_Value_Light;
  dark: Options_ValidateOptions_Returns_Overrides_Colors_Danger_Value_Dark;
};

export type Options_ValidateOptions_Returns_Overrides_Colors_Danger = Options_ValidateOptions_Returns_Overrides_Colors_Danger_Value | undefined;

export type Options_ValidateOptions_Returns_Overrides_Colors = {
  primary: Options_ValidateOptions_Returns_Overrides_Colors_Primary;
  secondary: Options_ValidateOptions_Returns_Overrides_Colors_Secondary;
  text: Options_ValidateOptions_Returns_Overrides_Colors_Text;
  border: Options_ValidateOptions_Returns_Overrides_Colors_Border;
  warning: Options_ValidateOptions_Returns_Overrides_Colors_Warning;
  danger: Options_ValidateOptions_Returns_Overrides_Colors_Danger;
};

export type Options_ValidateOptions_Returns_Overrides_Fonts_Display = Shared_Preset_Fonts_Display | undefined;

export type Options_ValidateOptions_Returns_Overrides_Fonts_Body = Shared_Preset_Fonts_Body | undefined;

export type Options_ValidateOptions_Returns_Overrides_Fonts_Code = Shared_Preset_Fonts_Code | undefined;

export type Options_ValidateOptions_Returns_Overrides_Fonts = {
  display: Options_ValidateOptions_Returns_Overrides_Fonts_Display;
  body: Options_ValidateOptions_Returns_Overrides_Fonts_Body;
  code: Options_ValidateOptions_Returns_Overrides_Fonts_Code;
};

export type Options_ValidateOptions_Returns_Overrides_Navbar = Shared_Preset_Navbar | undefined;

export type Options_ValidateOptions_Returns_Overrides_Footer = Shared_Preset_Footer | undefined;

export type Options_ValidateOptions_Returns_Overrides = {
  colors: Options_ValidateOptions_Returns_Overrides_Colors;
  fonts: Options_ValidateOptions_Returns_Overrides_Fonts;
  navbar: Options_ValidateOptions_Returns_Overrides_Navbar;
  footer: Options_ValidateOptions_Returns_Overrides_Footer;
};

export type Options_ValidateOptions_Returns_Plugins_Docs = Record<string, unknown> | undefined;

export type Options_ValidateOptions_Returns_Plugins_Blog = Record<string, unknown> | false | undefined;

export type Options_ValidateOptions_Returns_Plugins_Pages = Record<string, unknown> | false | undefined;

export type Options_ValidateOptions_Returns_Plugins_Sitemap = Record<string, unknown> | false | undefined;

export type Options_ValidateOptions_Returns_Plugins = {
  docs: Options_ValidateOptions_Returns_Plugins_Docs;
  blog: Options_ValidateOptions_Returns_Plugins_Blog;
  pages: Options_ValidateOptions_Returns_Plugins_Pages;
  sitemap: Options_ValidateOptions_Returns_Plugins_Sitemap;
};

export type Options_ValidateOptions_Returns_Analytics_Gtm_Value_ContainerId = string;

export type Options_ValidateOptions_Returns_Analytics_Gtm_Value = {
  containerId: Options_ValidateOptions_Returns_Analytics_Gtm_Value_ContainerId;
};

export type Options_ValidateOptions_Returns_Analytics_Gtm = Options_ValidateOptions_Returns_Analytics_Gtm_Value | undefined;

export type Options_ValidateOptions_Returns_Analytics = {
  gtm: Options_ValidateOptions_Returns_Analytics_Gtm;
};

export type Options_ValidateOptions_Returns_ProgressBar = boolean | Record<string, unknown>;

export type Options_ValidateOptions_Returns_Search_Config_Language = string[];

export type Options_ValidateOptions_Returns_Search_Config_IndexDocs = boolean;

export type Options_ValidateOptions_Returns_Search_Config_IndexBlog = boolean;

export type Options_ValidateOptions_Returns_Search_Config_IndexPages = boolean;

export type Options_ValidateOptions_Returns_Search_Config_Hashed = boolean;

export type Options_ValidateOptions_Returns_Search_Config_SearchResultLimits = number;

export type Options_ValidateOptions_Returns_Search_Config_HighlightSearchTermsOnTargetPage = boolean;

export type Options_ValidateOptions_Returns_Search_Config_SearchBarShortcutKeymap = string;

export type Options_ValidateOptions_Returns_Search_Config_FuzzyMatchingDistance = number;

export type Options_ValidateOptions_Returns_Search_Config_IgnorePatterns = string[];

export type Options_ValidateOptions_Returns_Search_Config_DocsRouteBasePath = string;

export type Options_ValidateOptions_Returns_Search_Config = {
  language?: Options_ValidateOptions_Returns_Search_Config_Language;
  indexDocs?: Options_ValidateOptions_Returns_Search_Config_IndexDocs;
  indexBlog?: Options_ValidateOptions_Returns_Search_Config_IndexBlog;
  indexPages?: Options_ValidateOptions_Returns_Search_Config_IndexPages;
  hashed?: Options_ValidateOptions_Returns_Search_Config_Hashed;
  searchResultLimits?: Options_ValidateOptions_Returns_Search_Config_SearchResultLimits;
  highlightSearchTermsOnTargetPage?: Options_ValidateOptions_Returns_Search_Config_HighlightSearchTermsOnTargetPage;
  searchBarShortcutKeymap?: Options_ValidateOptions_Returns_Search_Config_SearchBarShortcutKeymap;
  fuzzyMatchingDistance?: Options_ValidateOptions_Returns_Search_Config_FuzzyMatchingDistance;
  ignorePatterns?: Options_ValidateOptions_Returns_Search_Config_IgnorePatterns;
  docsRouteBasePath?: Options_ValidateOptions_Returns_Search_Config_DocsRouteBasePath;
  [key: string]: unknown;
};

export type Options_ValidateOptions_Returns_Search = Options_ValidateOptions_Returns_Search_Config | false;

export type Options_ValidateOptions_Returns_IconSafelist = string[];

export type Options_ValidateOptions_Returns_MaxBundleFileSize = number | false;

export type Options_ValidateOptions_Returns = {
  preset: Options_ValidateOptions_Returns_Preset;
  overrides: Options_ValidateOptions_Returns_Overrides;
  plugins: Options_ValidateOptions_Returns_Plugins;
  analytics: Options_ValidateOptions_Returns_Analytics;
  progressBar: Options_ValidateOptions_Returns_ProgressBar;
  search: Options_ValidateOptions_Returns_Search;
  iconSafelist: Options_ValidateOptions_Returns_IconSafelist;
  maxBundleFileSize: Options_ValidateOptions_Returns_MaxBundleFileSize;
};

export type Options_ValidateOptions_Validate = (schema: unknown, options: unknown) => Options_ValidateOptions_Returns;

export type Options_ValidateOptions_Input = Record<string, unknown>;

/**
 * Options - Validate Theme Config.
 *
 * @since 0.15.0
 */
export type Options_ValidateThemeConfig_Data_Validate = (schema: unknown, themeConfig: unknown) => Record<string, unknown>;

export type Options_ValidateThemeConfig_Data_ThemeConfig = Record<string, unknown>;

export type Options_ValidateThemeConfig_Data = {
  validate: Options_ValidateThemeConfig_Data_Validate;
  themeConfig: Options_ValidateThemeConfig_Data_ThemeConfig;
};

export type Options_ValidateThemeConfig_Validate = (schema: unknown, themeConfig: unknown) => Record<string, unknown>;

export type Options_ValidateThemeConfig_Input = Record<string, unknown>;

export type Options_ValidateThemeConfig_Returns = Record<string, unknown>;
