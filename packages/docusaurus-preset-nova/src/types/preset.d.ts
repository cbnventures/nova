import type {
  Lib_RehypeShiki_RehypeShiki_Options,
  Lib_RehypeShiki_RehypeShiki_Returns,
} from './lib/rehype-shiki.d.ts';
import type { Lib_ShikiThemes_GetShikiThemes_Returns } from './lib/shiki-themes.d.ts';
import type {
  Options_PluginOptions_Preset,
  Options_PluginOptions_Search,
} from './options.d.ts';

/**
 * Preset - Preset.
 *
 * @since 0.15.0
 */
export type PresetPresetContextSiteDirectory = string;

export type PresetPresetContext = {
  siteDir: PresetPresetContextSiteDirectory;
  [key: string]: unknown;
};

export type PresetPresetOptionsPreset = Options_PluginOptions_Preset;

export type PresetPresetOptionsOverrides = Record<string, unknown> | undefined;

export type PresetPresetOptionsPluginsDocs = Record<string, unknown> | undefined;

export type PresetPresetOptionsPluginsBlog = Record<string, unknown> | false | undefined;

export type PresetPresetOptionsPluginsPages = Record<string, unknown> | false | undefined;

export type PresetPresetOptionsPluginsSitemap = Record<string, unknown> | false | undefined;

export type PresetPresetOptionsPlugins = {
  docs: PresetPresetOptionsPluginsDocs;
  blog: PresetPresetOptionsPluginsBlog;
  pages: PresetPresetOptionsPluginsPages;
  sitemap: PresetPresetOptionsPluginsSitemap;
};

export type PresetPresetOptionsAnalyticsGtm = Record<string, unknown> | undefined;

export type PresetPresetOptionsAnalytics = {
  gtm: PresetPresetOptionsAnalyticsGtm;
};

export type PresetPresetOptionsSearch = Record<string, unknown> | false | undefined;

export type PresetPresetOptionsProgressBar = boolean | undefined;

export type PresetPresetOptions = {
  preset: PresetPresetOptionsPreset;
  overrides: PresetPresetOptionsOverrides;
  plugins: PresetPresetOptionsPlugins;
  analytics: PresetPresetOptionsAnalytics;
  search: PresetPresetOptionsSearch;
  progressBar: PresetPresetOptionsProgressBar;
  [key: string]: unknown;
};

export type PresetPresetReturnsPlugins = PresetPresetPlugin[];

export type PresetPresetReturnsThemes = PresetPresetTheme[];

export type PresetPresetReturns = {
  plugins: PresetPresetReturnsPlugins;
  themes: PresetPresetReturnsThemes;
};

export type PresetPresetPlugin = [string, Record<string, unknown>] | string;

export type PresetPresetPlugins = PresetPresetPlugin[];

export type PresetPresetTheme = [string, Record<string, unknown>] | string;

export type PresetPresetThemes = PresetPresetTheme[];

export type PresetPresetThemePath = string;

export type PresetPresetShikiThemes = Lib_ShikiThemes_GetShikiThemes_Returns;

export type PresetPresetRehypePluginFunction = (options: Lib_RehypeShiki_RehypeShiki_Options) => Lib_RehypeShiki_RehypeShiki_Returns;

export type PresetPresetRehypePlugin = [PresetPresetRehypePluginFunction, PresetPresetShikiThemes];

export type PresetPresetDocsRehypePlugins = unknown[];

export type PresetPresetMergedDocsOptionsBeforeDefaultRehypePlugins = unknown[];

export type PresetPresetMergedDocsOptions = Record<string, unknown>;

export type PresetPresetDocsPlugin = PresetPresetPlugin;

export type PresetPresetBlogRehypePlugins = unknown[];

export type PresetPresetMergedBlogOptionsBeforeDefaultRehypePlugins = unknown[];

export type PresetPresetMergedBlogOptions = Record<string, unknown>;

export type PresetPresetBlogPlugin = PresetPresetPlugin;

export type PresetPresetPagesRehypePlugins = unknown[];

export type PresetPresetMergedPagesOptionsBeforeDefaultRehypePlugins = unknown[];

export type PresetPresetMergedPagesOptions = Record<string, unknown>;

export type PresetPresetPagesPlugin = PresetPresetPlugin;

export type PresetPresetSitemapPlugin = PresetPresetPlugin;

export type PresetPresetSvgrPlugin = PresetPresetPlugin;

export type PresetPresetMermaidTooltipPlugin = string;

export type PresetPresetGtmPlugin = PresetPresetPlugin;

export type PresetPresetThemeOptionsPreset = Options_PluginOptions_Preset;

export type PresetPresetThemeOptionsOverrides = PresetPresetOptionsOverrides;

export type PresetPresetThemeOptionsProgressBar = PresetPresetOptionsProgressBar;

export type PresetPresetThemeOptionsSearch = Options_PluginOptions_Search | undefined;

export type PresetPresetThemeOptions = {
  preset: PresetPresetThemeOptionsPreset;
  overrides: PresetPresetThemeOptionsOverrides;
  progressBar: PresetPresetThemeOptionsProgressBar;
  search: PresetPresetThemeOptionsSearch;
};

export type PresetPresetNovaTheme = PresetPresetTheme;
