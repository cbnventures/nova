import type {
  Shared_HexColor,
  Shared_Preset,
  Shared_Preset_Fonts_Body,
  Shared_Preset_Fonts_Code,
  Shared_Preset_Fonts_Display,
  Shared_Preset_Footer,
  Shared_Preset_Logo,
  Shared_PresetName,
  Shared_Preset_Navbar,
} from './shared.d.ts';

export type Options_PluginOptions_Preset = Shared_PresetName;

export type Options_PluginOptions_Overrides_Colors_Primary_Light = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Primary_Dark = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Primary = {
  light: Options_PluginOptions_Overrides_Colors_Primary_Light;
  dark: Options_PluginOptions_Overrides_Colors_Primary_Dark;
} | undefined;

export type Options_PluginOptions_Overrides_Colors_Secondary_Light = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Secondary_Dark = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Secondary = {
  light: Options_PluginOptions_Overrides_Colors_Secondary_Light;
  dark: Options_PluginOptions_Overrides_Colors_Secondary_Dark;
} | undefined;

export type Options_PluginOptions_Overrides_Colors_Text_Light = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Text_Dark = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Text = {
  light: Options_PluginOptions_Overrides_Colors_Text_Light;
  dark: Options_PluginOptions_Overrides_Colors_Text_Dark;
} | undefined;

export type Options_PluginOptions_Overrides_Colors_Border_Light = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Border_Dark = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Border = {
  light: Options_PluginOptions_Overrides_Colors_Border_Light;
  dark: Options_PluginOptions_Overrides_Colors_Border_Dark;
} | undefined;

export type Options_PluginOptions_Overrides_Colors_Warning_Light = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Warning_Dark = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Warning = {
  light: Options_PluginOptions_Overrides_Colors_Warning_Light;
  dark: Options_PluginOptions_Overrides_Colors_Warning_Dark;
} | undefined;

export type Options_PluginOptions_Overrides_Colors_Danger_Light = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Danger_Dark = Shared_HexColor | undefined;

export type Options_PluginOptions_Overrides_Colors_Danger = {
  light: Options_PluginOptions_Overrides_Colors_Danger_Light;
  dark: Options_PluginOptions_Overrides_Colors_Danger_Dark;
} | undefined;

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
export type Options_PluginOptions_Analytics_Gtm_ContainerId = string;

export type Options_PluginOptions_Analytics_Gtm = {
  containerId: Options_PluginOptions_Analytics_Gtm_ContainerId;
} | undefined;

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

export type Options_PluginOptions = {
  preset: Options_PluginOptions_Preset;
  overrides: Options_PluginOptions_Overrides;
  plugins: Options_PluginOptions_Plugins;
  analytics: Options_PluginOptions_Analytics;
  progressBar: Options_PluginOptions_ProgressBar;
  search: Options_PluginOptions_Search;
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
export type Options_ResolvePreset_Options = Options_PluginOptions;

export type Options_ResolvePreset_Returns = Shared_Preset;

export type Options_ResolvePreset_BasePreset = Shared_Preset;

export type Options_ResolvePreset_ResolvedLogo = Shared_Preset_Logo;

export type Options_ResolvePreset_ResolvedColorsPrimary_Light = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsPrimary_Dark = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsPrimary = {
  light: Options_ResolvePreset_ResolvedColorsPrimary_Light;
  dark: Options_ResolvePreset_ResolvedColorsPrimary_Dark;
};

export type Options_ResolvePreset_ResolvedColorsAccent_Light = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsAccent_Dark = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsAccent = {
  light: Options_ResolvePreset_ResolvedColorsAccent_Light;
  dark: Options_ResolvePreset_ResolvedColorsAccent_Dark;
};

export type Options_ResolvePreset_ResolvedColorsText_Light = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsText_Dark = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsText = {
  light: Options_ResolvePreset_ResolvedColorsText_Light;
  dark: Options_ResolvePreset_ResolvedColorsText_Dark;
};

export type Options_ResolvePreset_ResolvedColorsBorder_Light = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsBorder_Dark = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsBorder = {
  light: Options_ResolvePreset_ResolvedColorsBorder_Light;
  dark: Options_ResolvePreset_ResolvedColorsBorder_Dark;
};

export type Options_ResolvePreset_ResolvedColorsWarning_Light = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsWarning_Dark = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsWarning = {
  light: Options_ResolvePreset_ResolvedColorsWarning_Light;
  dark: Options_ResolvePreset_ResolvedColorsWarning_Dark;
};

export type Options_ResolvePreset_ResolvedColorsDanger_Light = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsDanger_Dark = Shared_HexColor;

export type Options_ResolvePreset_ResolvedColorsDanger = {
  light: Options_ResolvePreset_ResolvedColorsDanger_Light;
  dark: Options_ResolvePreset_ResolvedColorsDanger_Dark;
};

export type Options_ResolvePreset_ResolvedFontsDisplay = Shared_Preset_Fonts_Display;

export type Options_ResolvePreset_ResolvedFontsBody = Shared_Preset_Fonts_Body;

export type Options_ResolvePreset_ResolvedFontsCode = Shared_Preset_Fonts_Code;

export type Options_ResolvePreset_ResolvedNavbar = Shared_Preset_Navbar;

export type Options_ResolvePreset_ResolvedFooter = Shared_Preset_Footer;

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
export type Options_ValidateOptions_Data_Validate = (schema: unknown, options: unknown) => Options_PluginOptions;

export type Options_ValidateOptions_Data_Options = Record<string, unknown>;

export type Options_ValidateOptions_Data = {
  validate: Options_ValidateOptions_Data_Validate;
  options: Options_ValidateOptions_Data_Options;
};

export type Options_ValidateOptions_Validate = (schema: unknown, options: unknown) => Options_PluginOptions;

export type Options_ValidateOptions_Input = Record<string, unknown>;

export type Options_ValidateOptions_Returns = Options_PluginOptions;

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
