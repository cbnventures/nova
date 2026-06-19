import type { TranslationFile } from '@docusaurus/types';

import type {
  Options_PluginOptions,
  Options_PluginOptions_Search,
} from './options.d.ts';
import type { Shared_Preset } from './shared.d.ts';

/**
 * Index - Docusaurus Theme Nova - Default.
 *
 * @since 0.15.0
 */
export type Index_Runner_Default_Context_SiteDir = string;

export type Index_Runner_Default_Context = {
  siteDir: Index_Runner_Default_Context_SiteDir;
  [key: string]: unknown;
};

export type Index_Runner_Default_Options = Options_PluginOptions;

export type Index_Runner_Default_Returns_Name = string;

export type Index_Runner_Default_Returns_GetThemePath = () => string;

export type Index_Runner_Default_Returns_GetTypeScriptThemePath = () => string;

export type Index_Runner_Default_Returns_GetClientModules = () => string[];

export type Index_Runner_Default_Returns_GetPathsToWatch = () => string[];

export type Index_Runner_Default_ReturnsInjectHtmlTagsHeadTags = Index_Runner_Default_InjectHtmlTags_HeadTags;

export type Index_Runner_Default_ReturnsInjectHtmlTagsPreBodyTags = Index_Runner_Default_InjectHtmlTags_PreBodyTags;

export type Index_Runner_Default_Returns_InjectHtmlTags = () => {
  headTags: Index_Runner_Default_ReturnsInjectHtmlTagsHeadTags;
  preBodyTags: Index_Runner_Default_ReturnsInjectHtmlTagsPreBodyTags;
};

export type Index_Runner_Default_ReturnsConfigurePostCssPostCssOptions_Plugins = unknown[];

export type Index_Runner_Default_ReturnsConfigurePostCssPostCssOptions = {
  plugins: Index_Runner_Default_ReturnsConfigurePostCssPostCssOptions_Plugins;
  [key: string]: unknown;
};

export type Index_Runner_Default_ReturnsConfigurePostCssReturns_Plugins = unknown[];

export type Index_Runner_Default_ReturnsConfigurePostCssReturns = {
  plugins: Index_Runner_Default_ReturnsConfigurePostCssReturns_Plugins;
  [key: string]: unknown;
};

export type Index_Runner_Default_Returns_ConfigurePostCss = (postCssOptions: Index_Runner_Default_ReturnsConfigurePostCssPostCssOptions) => Index_Runner_Default_ReturnsConfigurePostCssReturns;

export type Index_Runner_Default_ReturnsConfigureWebpackReturns_Resolve_Alias = Record<string, string>;

export type Index_Runner_Default_ReturnsConfigureWebpackReturns_Resolve = {
  alias: Index_Runner_Default_ReturnsConfigureWebpackReturns_Resolve_Alias;
};

export type Index_Runner_Default_ReturnsConfigureWebpackReturns = {
  resolve: Index_Runner_Default_ReturnsConfigureWebpackReturns_Resolve;
};

export type Index_Runner_Default_Returns_ConfigureWebpack = () => Index_Runner_Default_ReturnsConfigureWebpackReturns;

export type Index_Runner_Default_Returns_GetTranslationFiles = () => TranslationFile[];

export type Index_Runner_Default_Returns_GetDefaultCodeTranslationMessages = () => Promise<Record<string, string>>;

export type Index_Runner_Default_ReturnsTranslateThemeConfigParams_ThemeConfig = Record<string, unknown>;

export type Index_Runner_Default_ReturnsTranslateThemeConfigParams_TranslationFiles = TranslationFile[];

export type Index_Runner_Default_ReturnsTranslateThemeConfigParams = {
  themeConfig: Index_Runner_Default_ReturnsTranslateThemeConfigParams_ThemeConfig;
  translationFiles: Index_Runner_Default_ReturnsTranslateThemeConfigParams_TranslationFiles;
};

export type Index_Runner_Default_Returns_TranslateThemeConfig = (params: Index_Runner_Default_ReturnsTranslateThemeConfigParams) => Record<string, unknown>;

export type Index_Runner_Default_Returns_PostBuild = (postBuildArgs: Index_Runner_Default_PostBuild_Args) => Promise<void>;

export type Index_Runner_Default_Returns_ContentLoaded = (contentLoadedArgs: Index_Runner_Default_ContentLoaded_Args) => Promise<void>;

export type Index_Runner_Default_Returns_AllContentLoaded = (allContentLoadedArgs: Index_Runner_Default_AllContentLoaded_Args) => Promise<void>;

export type Index_Runner_Default_Returns = {
  name: Index_Runner_Default_Returns_Name;
  getThemePath: Index_Runner_Default_Returns_GetThemePath;
  getTypeScriptThemePath: Index_Runner_Default_Returns_GetTypeScriptThemePath;
  getClientModules: Index_Runner_Default_Returns_GetClientModules;
  getPathsToWatch: Index_Runner_Default_Returns_GetPathsToWatch;
  injectHtmlTags: Index_Runner_Default_Returns_InjectHtmlTags;
  configurePostCss: Index_Runner_Default_Returns_ConfigurePostCss;
  configureWebpack: Index_Runner_Default_Returns_ConfigureWebpack;
  getTranslationFiles: Index_Runner_Default_Returns_GetTranslationFiles;
  getDefaultCodeTranslationMessages: Index_Runner_Default_Returns_GetDefaultCodeTranslationMessages;
  translateThemeConfig: Index_Runner_Default_Returns_TranslateThemeConfig;
  postBuild: Index_Runner_Default_Returns_PostBuild;
  contentLoaded: Index_Runner_Default_Returns_ContentLoaded;
  allContentLoaded: Index_Runner_Default_Returns_AllContentLoaded;
};

export type Index_Runner_Default_ResolvedPreset = Pick<Shared_Preset, 'logo' | 'colors' | 'fonts' | 'shape' | 'depth' | 'motion' | 'navbar' | 'footer' | 'cta'>;

export type Index_Runner_Default_GeneratedCss = string;

export type Index_Runner_Default_SiteDirectory = string;

export type Index_Runner_Default_GeneratedCssDirectory = string;

export type Index_Runner_Default_GeneratedCssPath = string;

export type Index_Runner_Default_GoogleFontsUrl = string;

export type Index_Runner_Default_PresetName = 'envoy' | 'foundry' | 'lantern' | 'marshal' | 'sentinel' | 'signal';

export type Index_Runner_Default_CurrentDirectory = string;

export type Index_Runner_Default_PresetLogoSrc = string;

export type Index_Runner_Default_AssetsDirectory = string;

export type Index_Runner_Default_PresetLogoPath = string;

export type Index_Runner_Default_PresetLogoContent = string;

export type Index_Runner_Default_PresetLogoDataUri = string;

export type Index_Runner_Default_ThemePath = string;

export type Index_Runner_Default_TypeScriptThemePath = string;

export type Index_Runner_Default_BlocksPath = string;

export type Index_Runner_Default_LibPath = string;

export type Index_Runner_Default_PathsToWatch = string[];

export type Index_Runner_Default_CssResetPath = string;

export type Index_Runner_Default_CssGridPath = string;

export type Index_Runner_Default_CssAccessibilityPath = string;

export type Index_Runner_Default_CssUtilitiesPath = string;

export type Index_Runner_Default_CssBlocksDirectory = string;

export type Index_Runner_Default_CssBlockFiles = string[];

export type Index_Runner_Default_CssBlockFileName = string | Buffer;

export type Index_Runner_Default_CssThemeDirectory = string;

export type Index_Runner_Default_CssThemeFiles = string[];

export type Index_Runner_Default_CssThemeFileName = string | Buffer;

export type Index_Runner_Default_CssPresetDirectory = string;

export type Index_Runner_Default_CssPresetPath = string;

export type Index_Runner_Default_CssPresetBlocksDirectory = string;

export type Index_Runner_Default_CssPresetBlockFiles = string[];

export type Index_Runner_Default_CssPresetBlockFileName = string | Buffer;

export type Index_Runner_Default_CssPresetThemeDirectory = string;

export type Index_Runner_Default_ActiveNavbarPrefix = string;

export type Index_Runner_Default_ActiveFooterPrefix = string;

export type Index_Runner_Default_CssPresetThemeFiles = string[];

export type Index_Runner_Default_CssPresetThemeFileName = string | Buffer;

export type Index_Runner_Default_I18nConfig_CurrentLocale = string;

export type Index_Runner_Default_I18nConfig_LocaleConfigs = Record<string, unknown>;

export type Index_Runner_Default_I18nConfig = {
  currentLocale: Index_Runner_Default_I18nConfig_CurrentLocale;
  localeConfigs: Index_Runner_Default_I18nConfig_LocaleConfigs;
  [key: string]: unknown;
};

export type Index_Runner_Default_CurrentLocale = string;

export type Index_Runner_Default_LocaleConfigs = Record<string, unknown>;

export type Index_Runner_Default_LocaleConfig_Direction = string;

export type Index_Runner_Default_LocaleConfig = {
  direction: Index_Runner_Default_LocaleConfig_Direction;
  [key: string]: unknown;
};

export type Index_Runner_Default_LocaleDirection = string;

export type Index_Runner_Default_IsRtl = boolean;

export type Index_Runner_Default_SiteStorage_Type = string;

export type Index_Runner_Default_SiteStorage_Namespace = string;

export type Index_Runner_Default_SiteStorage = {
  type: Index_Runner_Default_SiteStorage_Type;
  namespace: Index_Runner_Default_SiteStorage_Namespace;
};

export type Index_Runner_Default_SiteConfig_ThemeConfig = Record<string, unknown>;

export type Index_Runner_Default_SiteConfig = {
  themeConfig: Index_Runner_Default_SiteConfig_ThemeConfig;
  [key: string]: unknown;
};

export type Index_Runner_Default_ThemeConfig = Record<string, unknown>;

export type Index_Runner_Default_AnnouncementBar = Record<string, unknown> | undefined;

export type Index_Runner_Default_ProgressBarConfig = boolean | Record<string, unknown>;

export type Index_Runner_Default_NprogressCssPath = string;

export type Index_Runner_Default_SearchConfig = Options_PluginOptions_Search | undefined;

/**
 * Index - Docusaurus Theme Nova - Default - All Content Loaded.
 *
 * @since 0.15.0
 */
export type Index_Runner_Default_AllContentLoaded_Args_AllContent = Index_Runner_Default_AllContentLoaded_AllContent;

export type Index_Runner_Default_AllContentLoaded_Args_Actions = Record<string, unknown>;

export type Index_Runner_Default_AllContentLoaded_Args = {
  allContent: Index_Runner_Default_AllContentLoaded_Args_AllContent;
  actions: Index_Runner_Default_AllContentLoaded_Args_Actions;
  [key: string]: unknown;
};

export type Index_Runner_Default_AllContentLoaded_AllContent = Record<string, Record<string, unknown>>;

export type Index_Runner_Default_AllContentLoaded_Actions_SetGlobalDataData = Record<string, unknown>;

export type Index_Runner_Default_AllContentLoaded_Actions_SetGlobalData = (data: Index_Runner_Default_AllContentLoaded_Actions_SetGlobalDataData) => void;

export type Index_Runner_Default_AllContentLoaded_Actions = {
  setGlobalData: Index_Runner_Default_AllContentLoaded_Actions_SetGlobalData;
  [key: string]: unknown;
};

export type Index_Runner_Default_AllContentLoaded_DocDescriptions = Record<string, string>;

export type Index_Runner_Default_AllContentLoaded_DocsPluginData = Record<string, unknown> | undefined;

export type Index_Runner_Default_AllContentLoaded_DocsPluginContent_LoadedVersions = Index_Runner_Default_AllContentLoaded_DocsLoadedVersions;

export type Index_Runner_Default_AllContentLoaded_DocsPluginContent = {
  loadedVersions?: Index_Runner_Default_AllContentLoaded_DocsPluginContent_LoadedVersions;
  [key: string]: unknown;
} | undefined;

export type Index_Runner_Default_AllContentLoaded_DocsLoadedVersion_Docs = Index_Runner_Default_AllContentLoaded_DocsVersionDocs;

export type Index_Runner_Default_AllContentLoaded_DocsLoadedVersion = {
  docs?: Index_Runner_Default_AllContentLoaded_DocsLoadedVersion_Docs;
  [key: string]: unknown;
};

export type Index_Runner_Default_AllContentLoaded_DocsLoadedVersions = Index_Runner_Default_AllContentLoaded_DocsLoadedVersion[];

export type Index_Runner_Default_AllContentLoaded_DocsVersionDoc = Record<string, unknown>;

export type Index_Runner_Default_AllContentLoaded_DocsVersionDocs = Index_Runner_Default_AllContentLoaded_DocsVersionDoc[];

export type Index_Runner_Default_AllContentLoaded_PermalinkValue = string;

export type Index_Runner_Default_AllContentLoaded_DescriptionValue = string;

export type Index_Runner_Default_AllContentLoaded_BlogPost_Title = string;

export type Index_Runner_Default_AllContentLoaded_BlogPost_Description = string;

export type Index_Runner_Default_AllContentLoaded_BlogPost_Permalink = string;

export type Index_Runner_Default_AllContentLoaded_BlogPost_Date = string;

export type Index_Runner_Default_AllContentLoaded_BlogPost = {
  title: Index_Runner_Default_AllContentLoaded_BlogPost_Title;
  description: Index_Runner_Default_AllContentLoaded_BlogPost_Description;
  permalink: Index_Runner_Default_AllContentLoaded_BlogPost_Permalink;
  date: Index_Runner_Default_AllContentLoaded_BlogPost_Date;
};

export type Index_Runner_Default_AllContentLoaded_BlogPosts = Index_Runner_Default_AllContentLoaded_BlogPost[];

export type Index_Runner_Default_AllContentLoaded_BlogSeenPostPermalinks = Set<string>;

export type Index_Runner_Default_AllContentLoaded_BlogAuthor_ImageURL = string | undefined;

export type Index_Runner_Default_AllContentLoaded_BlogAuthor_Key = string;

export type Index_Runner_Default_AllContentLoaded_BlogAuthor_Name = string | undefined;

export type Index_Runner_Default_AllContentLoaded_BlogAuthor_Permalink = string | undefined;

export type Index_Runner_Default_AllContentLoaded_BlogAuthor = {
  imageURL: Index_Runner_Default_AllContentLoaded_BlogAuthor_ImageURL;
  key: Index_Runner_Default_AllContentLoaded_BlogAuthor_Key;
  name: Index_Runner_Default_AllContentLoaded_BlogAuthor_Name;
  permalink: Index_Runner_Default_AllContentLoaded_BlogAuthor_Permalink;
};

export type Index_Runner_Default_AllContentLoaded_BlogAuthors = Index_Runner_Default_AllContentLoaded_BlogAuthor[];

export type Index_Runner_Default_AllContentLoaded_BlogSeenAuthorKeys = Set<string>;

export type Index_Runner_Default_AllContentLoaded_BlogPluginData = Record<string, unknown> | undefined;

export type Index_Runner_Default_AllContentLoaded_BlogPluginContent_BlogPosts = Index_Runner_Default_AllContentLoaded_BlogPluginPosts;

export type Index_Runner_Default_AllContentLoaded_BlogPluginContent = {
  blogPosts?: Index_Runner_Default_AllContentLoaded_BlogPluginContent_BlogPosts;
  [key: string]: unknown;
} | undefined;

export type Index_Runner_Default_AllContentLoaded_BlogPluginPost_Metadata = Index_Runner_Default_AllContentLoaded_BlogPostMetadata;

export type Index_Runner_Default_AllContentLoaded_BlogPluginPost = {
  metadata?: Index_Runner_Default_AllContentLoaded_BlogPluginPost_Metadata;
  [key: string]: unknown;
};

export type Index_Runner_Default_AllContentLoaded_BlogPluginPosts = Index_Runner_Default_AllContentLoaded_BlogPluginPost[];

export type Index_Runner_Default_AllContentLoaded_BlogPostMetadata = Record<string, unknown>;

export type Index_Runner_Default_AllContentLoaded_BlogTitleValue = string;

export type Index_Runner_Default_AllContentLoaded_BlogPermalinkValue = string;

export type Index_Runner_Default_AllContentLoaded_BlogDescriptionValue = string;

export type Index_Runner_Default_AllContentLoaded_BlogDateValue = string;

export type Index_Runner_Default_AllContentLoaded_AuthorRaw = Record<string, unknown>;

export type Index_Runner_Default_AllContentLoaded_BlogPostAuthors = Index_Runner_Default_AllContentLoaded_AuthorRaw[];

export type Index_Runner_Default_AllContentLoaded_AuthorKey = string | undefined;

export type Index_Runner_Default_AllContentLoaded_AuthorName = string | undefined;

export type Index_Runner_Default_AllContentLoaded_AuthorImageUrl = string | undefined;

export type Index_Runner_Default_AllContentLoaded_AuthorPage = Record<string, unknown> | undefined;

export type Index_Runner_Default_AllContentLoaded_AuthorPermalink = string | undefined;

export type Index_Runner_Default_AllContentLoaded_NotFoundBundleCount = number;

export type Index_Runner_Default_AllContentLoaded_ErrorPageContentTitleCount = number;

export type Index_Runner_Default_AllContentLoaded_CreditPhraseCount = number;

export type Index_Runner_Default_AllContentLoaded_NotFoundBundleIndex = number;

export type Index_Runner_Default_AllContentLoaded_ErrorPageContentTitleIndex = number;

export type Index_Runner_Default_AllContentLoaded_CreditPhraseIndex = number;

/**
 * Index - Docusaurus Theme Nova - Default - Configure Post Css.
 *
 * @since 0.15.0
 */
export type Index_Runner_Default_ConfigurePostCss_PostCssOptions_Plugins = unknown[];

export type Index_Runner_Default_ConfigurePostCss_PostCssOptions = {
  plugins: Index_Runner_Default_ConfigurePostCss_PostCssOptions_Plugins;
  [key: string]: unknown;
};

export type Index_Runner_Default_ConfigurePostCss_RtlPlugin_PostcssPlugin = string;

export type Index_Runner_Default_ConfigurePostCss_RtlPlugin_Prepare = (result: unknown) => Record<string, unknown>;

export type Index_Runner_Default_ConfigurePostCss_RtlPlugin = {
  postcssPlugin: Index_Runner_Default_ConfigurePostCss_RtlPlugin_PostcssPlugin;
  prepare: Index_Runner_Default_ConfigurePostCss_RtlPlugin_Prepare;
};

/**
 * Index - Docusaurus Theme Nova - Default - Configure Webpack.
 *
 * @since 0.15.0
 */
export type Index_Runner_Default_ConfigureWebpack_AssetsDirectory = string;

/**
 * Index - Docusaurus Theme Nova - Default - Content Loaded.
 *
 * @since 0.15.0
 */
export type Index_Runner_Default_ContentLoaded_Args_Actions = Index_Runner_Default_ContentLoaded_Actions;

export type Index_Runner_Default_ContentLoaded_Args = {
  actions: Index_Runner_Default_ContentLoaded_Args_Actions;
  [key: string]: unknown;
};

export type Index_Runner_Default_ContentLoaded_ActionsAddRouteConfig_Path = string;

export type Index_Runner_Default_ContentLoaded_ActionsAddRouteConfig_Component = string;

export type Index_Runner_Default_ContentLoaded_ActionsAddRouteConfig = {
  path: Index_Runner_Default_ContentLoaded_ActionsAddRouteConfig_Path;
  component: Index_Runner_Default_ContentLoaded_ActionsAddRouteConfig_Component;
  exact?: boolean;
  [key: string]: unknown;
};

export type Index_Runner_Default_ContentLoaded_Actions_AddRoute = (config: Index_Runner_Default_ContentLoaded_ActionsAddRouteConfig) => void;

export type Index_Runner_Default_ContentLoaded_Actions = {
  addRoute: Index_Runner_Default_ContentLoaded_Actions_AddRoute;
  [key: string]: unknown;
};

/**
 * Index - Docusaurus Theme Nova - Default - Get Client Modules.
 *
 * @since 0.15.0
 */
export type Index_Runner_Default_GetClientModules_StickyLayoutPath = string;

export type Index_Runner_Default_GetClientModules_ClientModules = string[];

export type Index_Runner_Default_GetClientModules_NprogressCssModule = string;

/**
 * Index - Docusaurus Theme Nova - Default - Get Default Code Translation Messages.
 *
 * @since 0.15.0
 */
export type Index_Runner_Default_GetDefaultCodeTranslationMessages_NovaTranslationsDirPath = string;

export type Index_Runner_Default_GetDefaultCodeTranslationMessages_ThemeCommonMessages = Record<string, string>;

export type Index_Runner_Default_GetDefaultCodeTranslationMessages_ThemeNovaMessages = Record<string, string>;

/**
 * Index - Docusaurus Theme Nova - Default - Get Paths To Watch.
 *
 * @since 0.18.0
 */
export type Index_Runner_Default_GetPathsToWatch_BlocksPath = string;

export type Index_Runner_Default_GetPathsToWatch_LibPath = string;

export type Index_Runner_Default_GetPathsToWatch_Paths = string[];

/**
 * Index - Docusaurus Theme Nova - Default - Get Theme Path.
 *
 * @since 0.15.0
 */
export type Index_Runner_Default_GetThemePath_Returns = string;

/**
 * Index - Docusaurus Theme Nova - Default - Get Translation Files.
 *
 * @since 0.15.0
 */
export type Index_Runner_Default_GetTranslationFiles_Returns = TranslationFile[];

/**
 * Index - Docusaurus Theme Nova - Default - Get TypeScript Theme Path.
 *
 * @since 0.15.0
 */
export type Index_Runner_Default_GetTypeScriptThemePath_Returns = string;

/**
 * Index - Docusaurus Theme Nova - Default - Inject HTML Tags.
 *
 * @since 0.15.0
 */
export type Index_Runner_Default_InjectHtmlTags_HeadTags = Array<{
  tagName: string;
  attributes?: Record<string, string | boolean>;
  innerHTML?: string;
}>;

export type Index_Runner_Default_InjectHtmlTags_PreBodyTags = Array<{
  tagName: string;
  attributes?: Record<string, string | boolean>;
  innerHTML?: string;
}>;

export type Index_Runner_Default_InjectHtmlTags_ColorModeScript = string;

export type Index_Runner_Default_InjectHtmlTags_PreBodyScriptEntries = Array<{
  tagName: string;
  innerHTML: string;
}>;

export type Index_Runner_Default_InjectHtmlTags_PresetVariantInit = string;

export type Index_Runner_Default_InjectHtmlTags_AnnouncementBarScript = string;

/**
 * Index - Docusaurus Theme Nova - Default - Post Build.
 *
 * @since 0.15.0
 */
export type Index_Runner_Default_PostBuild_Args_OutDir = string;

export type Index_Runner_Default_PostBuild_Args_RoutesPaths = string[];

export type Index_Runner_Default_PostBuild_Args_SiteConfig_BaseUrl = string;

export type Index_Runner_Default_PostBuild_Args_SiteConfig = {
  baseUrl: Index_Runner_Default_PostBuild_Args_SiteConfig_BaseUrl;
  [key: string]: unknown;
};

export type Index_Runner_Default_PostBuild_Args = {
  outDir: Index_Runner_Default_PostBuild_Args_OutDir;
  routesPaths: Index_Runner_Default_PostBuild_Args_RoutesPaths;
  siteConfig: Index_Runner_Default_PostBuild_Args_SiteConfig;
  [key: string]: unknown;
};

export type Index_Runner_Default_PostBuild_SearchConfigCast = Record<string, unknown>;

/**
 * Index - Docusaurus Theme Nova - Default - Translate Theme Config.
 *
 * @since 0.15.0
 */
export type Index_Runner_Default_TranslateThemeConfig_Params_ThemeConfig = Record<string, unknown>;

export type Index_Runner_Default_TranslateThemeConfig_Params_TranslationFiles = TranslationFile[];

export type Index_Runner_Default_TranslateThemeConfig_Params = {
  themeConfig: Index_Runner_Default_TranslateThemeConfig_Params_ThemeConfig;
  translationFiles: Index_Runner_Default_TranslateThemeConfig_Params_TranslationFiles;
};
