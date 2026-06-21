import type {
  Lib_RehypeShiki_RehypeShiki_Options,
  Lib_RehypeShiki_RehypeShiki_Returns,
} from './lib/rehype-shiki.d.ts';
import type {
  Options_PluginOptions_Preset,
  Options_PluginOptions_Search,
} from './options.d.ts';

/**
 * Preset - Preset.
 *
 * @since 0.15.0
 */
export type Preset_Preset_ContextSiteDirectory = string;

export type Preset_Preset_Context = {
  siteDir: Preset_Preset_ContextSiteDirectory;
  [key: string]: unknown;
};

export type Preset_Preset_OptionsPreset = Options_PluginOptions_Preset;

export type Preset_Preset_OptionsOverrides = Record<string, unknown> | undefined;

export type Preset_Preset_OptionsPluginsDocs = Record<string, unknown> | undefined;

export type Preset_Preset_OptionsPluginsBlog = Record<string, unknown> | false | undefined;

export type Preset_Preset_OptionsPluginsPages = Record<string, unknown> | false | undefined;

export type Preset_Preset_OptionsPluginsSitemap = Record<string, unknown> | false | undefined;

export type Preset_Preset_OptionsPlugins = {
  docs: Preset_Preset_OptionsPluginsDocs;
  blog: Preset_Preset_OptionsPluginsBlog;
  pages: Preset_Preset_OptionsPluginsPages;
  sitemap: Preset_Preset_OptionsPluginsSitemap;
};

export type Preset_Preset_OptionsAnalyticsGtm = Record<string, unknown> | undefined;

export type Preset_Preset_OptionsAnalytics = {
  gtm: Preset_Preset_OptionsAnalyticsGtm;
};

export type Preset_Preset_OptionsSearch = Record<string, unknown> | false | undefined;

export type Preset_Preset_OptionsProgressBar = boolean | undefined;

export type Preset_Preset_OptionsIconSafelist = string[] | undefined;

export type Preset_Preset_OptionsMaxBundleFileSize = number | false | undefined;

export type Preset_Preset_Options = {
  preset: Preset_Preset_OptionsPreset;
  overrides: Preset_Preset_OptionsOverrides;
  plugins: Preset_Preset_OptionsPlugins;
  analytics: Preset_Preset_OptionsAnalytics;
  search: Preset_Preset_OptionsSearch;
  progressBar: Preset_Preset_OptionsProgressBar;
  iconSafelist?: Preset_Preset_OptionsIconSafelist;
  maxBundleFileSize?: Preset_Preset_OptionsMaxBundleFileSize;
  [key: string]: unknown;
};

export type Preset_Preset_Plugin = [string, Record<string, unknown>] | string;

export type Preset_Preset_Theme = [string, Record<string, unknown>] | string;

export type Preset_Preset_ReturnsPlugins = Preset_Preset_Plugin[];

export type Preset_Preset_ReturnsThemes = Preset_Preset_Theme[];

export type Preset_Preset_Returns = {
  plugins: Preset_Preset_ReturnsPlugins;
  themes: Preset_Preset_ReturnsThemes;
};

export type Preset_Preset_Plugins = Preset_Preset_Plugin[];

export type Preset_Preset_Themes = Preset_Preset_Theme[];

export type Preset_Preset_CurrentDirectory = string;

export type Preset_Preset_ShikiThemes_Light = string;

export type Preset_Preset_ShikiThemes_Dark = string;

export type Preset_Preset_ShikiThemes = {
  light: Preset_Preset_ShikiThemes_Light;
  dark: Preset_Preset_ShikiThemes_Dark;
};

export type Preset_Preset_RehypePluginFunction = (options: Lib_RehypeShiki_RehypeShiki_Options) => Lib_RehypeShiki_RehypeShiki_Returns;

export type Preset_Preset_RehypePlugin = [Preset_Preset_RehypePluginFunction, Preset_Preset_ShikiThemes];

export type Preset_Preset_DocsRehypePlugins = unknown[];

export type Preset_Preset_MergedDocsBeforeDefaultRehypePlugins = unknown[];

export type Preset_Preset_MergedDocsOptions = Record<string, unknown>;

export type Preset_Preset_DocsPlugin = Preset_Preset_Plugin;

export type Preset_Preset_BlogRehypePlugins = unknown[];

export type Preset_Preset_MergedBlogBeforeDefaultRehypePlugins = unknown[];

export type Preset_Preset_MergedBlogOptions = Record<string, unknown>;

export type Preset_Preset_BlogPlugin = Preset_Preset_Plugin;

export type Preset_Preset_PagesRehypePlugins = unknown[];

export type Preset_Preset_MergedPagesBeforeDefaultRehypePlugins = unknown[];

export type Preset_Preset_MergedPagesOptions = Record<string, unknown>;

export type Preset_Preset_PagesPlugin = Preset_Preset_Plugin;

export type Preset_Preset_SitemapPlugin = Preset_Preset_Plugin;

export type Preset_Preset_SvgrPlugin = Preset_Preset_Plugin;

export type Preset_Preset_MermaidTooltipPlugin = string;

export type Preset_Preset_IconsPlugin = Preset_Preset_Plugin;

export type Preset_Preset_BundleGuardPlugin = Preset_Preset_Plugin;

export type Preset_Preset_GtmPlugin = Preset_Preset_Plugin;

export type Preset_Preset_ThemeOptionsPreset = Options_PluginOptions_Preset;

export type Preset_Preset_ThemeOptionsOverrides = Preset_Preset_OptionsOverrides;

export type Preset_Preset_ThemeOptionsProgressBar = Preset_Preset_OptionsProgressBar;

export type Preset_Preset_ThemeOptionsSearch = Options_PluginOptions_Search | undefined;

export type Preset_Preset_ThemeOptions = {
  preset: Preset_Preset_ThemeOptionsPreset;
  overrides: Preset_Preset_ThemeOptionsOverrides;
  progressBar: Preset_Preset_ThemeOptionsProgressBar;
  search: Preset_Preset_ThemeOptionsSearch;
};

export type Preset_Preset_ThemePath = string;

export type Preset_Preset_NovaTheme = Preset_Preset_Theme;
