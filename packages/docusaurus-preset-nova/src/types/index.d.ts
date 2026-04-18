import type {
  OptionsPluginOptions,
  OptionsPluginOptionsProgressBar,
  OptionsPluginOptionsSearch,
} from './options.d.ts';
import type {
  SharedPreset,
  SharedPresetFooter,
  SharedPresetLogo,
  SharedPresetName,
  SharedPresetNavbar,
} from './shared.d.ts';

/**
 * Index - Docusaurus Theme Nova - Build Google Fonts URL.
 *
 * @since 0.15.0
 */
export type IndexDocusaurusThemeNovaBuildGoogleFontsUrlPreset = SharedPreset;

export type IndexDocusaurusThemeNovaBuildGoogleFontsUrlReturns = string;

export type IndexDocusaurusThemeNovaBuildGoogleFontsUrlSpacePattern = RegExp;

export type IndexDocusaurusThemeNovaBuildGoogleFontsUrlDisplayFamily = string;

export type IndexDocusaurusThemeNovaBuildGoogleFontsUrlBodyFamily = string;

export type IndexDocusaurusThemeNovaBuildGoogleFontsUrlCodeFamily = string;

export type IndexDocusaurusThemeNovaBuildGoogleFontsUrlFamilies = string[];

export type IndexDocusaurusThemeNovaBuildGoogleFontsUrlQuery = string;

/**
 * Index - Docusaurus Theme Nova - Default.
 *
 * @since 0.15.0
 */
export type IndexDocusaurusThemeNovaDefaultContextSiteDir = string;

export type IndexDocusaurusThemeNovaDefaultContext = {
  siteDir: IndexDocusaurusThemeNovaDefaultContextSiteDir;
  [key: string]: unknown;
};

export type IndexDocusaurusThemeNovaDefaultOptions = OptionsPluginOptions;

export type IndexDocusaurusThemeNovaDefaultReturnsName = string;

export type IndexDocusaurusThemeNovaDefaultReturnsGetThemePath = () => string;

export type IndexDocusaurusThemeNovaDefaultReturnsGetTypeScriptThemePath = () => string;

export type IndexDocusaurusThemeNovaDefaultReturnsGetClientModules = () => string[];

export type IndexDocusaurusThemeNovaDefaultReturnsInjectHtmlTagsHeadTags = IndexDocusaurusThemeNovaDefaultInjectHtmlTagsHeadTags;

export type IndexDocusaurusThemeNovaDefaultReturnsInjectHtmlTagsPreBodyTags = IndexDocusaurusThemeNovaDefaultInjectHtmlTagsPreBodyTags;

export type IndexDocusaurusThemeNovaDefaultReturnsInjectHtmlTags = () => {
  headTags: IndexDocusaurusThemeNovaDefaultReturnsInjectHtmlTagsHeadTags;
  preBodyTags: IndexDocusaurusThemeNovaDefaultReturnsInjectHtmlTagsPreBodyTags;
};

export type IndexDocusaurusThemeNovaDefaultReturnsConfigurePostCssPostCssOptionsPlugins = unknown[];

export type IndexDocusaurusThemeNovaDefaultReturnsConfigurePostCssPostCssOptions = {
  plugins: IndexDocusaurusThemeNovaDefaultReturnsConfigurePostCssPostCssOptionsPlugins;
  [key: string]: unknown;
};

export type IndexDocusaurusThemeNovaDefaultReturnsConfigurePostCssReturnsPlugins = unknown[];

export type IndexDocusaurusThemeNovaDefaultReturnsConfigurePostCssReturns = {
  plugins: IndexDocusaurusThemeNovaDefaultReturnsConfigurePostCssReturnsPlugins;
  [key: string]: unknown;
};

export type IndexDocusaurusThemeNovaDefaultReturnsConfigurePostCss = (postCssOptions: IndexDocusaurusThemeNovaDefaultReturnsConfigurePostCssPostCssOptions) => IndexDocusaurusThemeNovaDefaultReturnsConfigurePostCssReturns;

export type IndexDocusaurusThemeNovaDefaultReturnsConfigureWebpackReturnsResolveAlias = Record<string, string>;

export type IndexDocusaurusThemeNovaDefaultReturnsConfigureWebpackReturnsResolve = {
  alias: IndexDocusaurusThemeNovaDefaultReturnsConfigureWebpackReturnsResolveAlias;
};

export type IndexDocusaurusThemeNovaDefaultReturnsConfigureWebpackReturns = {
  resolve: IndexDocusaurusThemeNovaDefaultReturnsConfigureWebpackReturnsResolve;
};

export type IndexDocusaurusThemeNovaDefaultReturnsConfigureWebpack = () => IndexDocusaurusThemeNovaDefaultReturnsConfigureWebpackReturns;

export type IndexDocusaurusThemeNovaDefaultReturnsGetTranslationFiles = () => never[];

export type IndexDocusaurusThemeNovaDefaultReturnsGetDefaultCodeTranslationMessages = () => Promise<Record<string, string>>;

export type IndexDocusaurusThemeNovaDefaultReturnsTranslateThemeConfigParamsThemeConfig = Record<string, unknown>;

export type IndexDocusaurusThemeNovaDefaultReturnsTranslateThemeConfigParamsTranslationFiles = unknown[];

export type IndexDocusaurusThemeNovaDefaultReturnsTranslateThemeConfigParams = {
  themeConfig: IndexDocusaurusThemeNovaDefaultReturnsTranslateThemeConfigParamsThemeConfig;
  translationFiles: IndexDocusaurusThemeNovaDefaultReturnsTranslateThemeConfigParamsTranslationFiles;
};

export type IndexDocusaurusThemeNovaDefaultReturnsTranslateThemeConfig = (params: IndexDocusaurusThemeNovaDefaultReturnsTranslateThemeConfigParams) => Record<string, unknown>;

export type IndexDocusaurusThemeNovaDefaultReturnsPostBuild = (postBuildArgs: IndexDocusaurusThemeNovaDefaultPostBuildArgs) => Promise<void>;

export type IndexDocusaurusThemeNovaDefaultReturnsContentLoaded = (contentLoadedArgs: IndexDocusaurusThemeNovaDefaultContentLoadedArgs) => Promise<void>;

export type IndexDocusaurusThemeNovaDefaultReturns = {
  name: IndexDocusaurusThemeNovaDefaultReturnsName;
  getThemePath: IndexDocusaurusThemeNovaDefaultReturnsGetThemePath;
  getTypeScriptThemePath: IndexDocusaurusThemeNovaDefaultReturnsGetTypeScriptThemePath;
  getClientModules: IndexDocusaurusThemeNovaDefaultReturnsGetClientModules;
  injectHtmlTags: IndexDocusaurusThemeNovaDefaultReturnsInjectHtmlTags;
  configurePostCss: IndexDocusaurusThemeNovaDefaultReturnsConfigurePostCss;
  configureWebpack: IndexDocusaurusThemeNovaDefaultReturnsConfigureWebpack;
  getTranslationFiles: IndexDocusaurusThemeNovaDefaultReturnsGetTranslationFiles;
  getDefaultCodeTranslationMessages: IndexDocusaurusThemeNovaDefaultReturnsGetDefaultCodeTranslationMessages;
  translateThemeConfig: IndexDocusaurusThemeNovaDefaultReturnsTranslateThemeConfig;
  postBuild: IndexDocusaurusThemeNovaDefaultReturnsPostBuild;
  contentLoaded: IndexDocusaurusThemeNovaDefaultReturnsContentLoaded;
};

export type IndexDocusaurusThemeNovaDefaultResolvedPreset = SharedPreset;

export type IndexDocusaurusThemeNovaDefaultGeneratedCss = string;

export type IndexDocusaurusThemeNovaDefaultSiteDirectory = string;

export type IndexDocusaurusThemeNovaDefaultGeneratedCssDirectory = string;

export type IndexDocusaurusThemeNovaDefaultGeneratedCssPath = string;

export type IndexDocusaurusThemeNovaDefaultGoogleFontsUrl = string;

export type IndexDocusaurusThemeNovaDefaultPresetName = SharedPresetName;

export type IndexDocusaurusThemeNovaDefaultCurrentDirectory = string;

export type IndexDocusaurusThemeNovaDefaultThemePath = string;

export type IndexDocusaurusThemeNovaDefaultTypeScriptThemePath = string;

export type IndexDocusaurusThemeNovaDefaultCssResetPath = string;

export type IndexDocusaurusThemeNovaDefaultCssGridPath = string;

export type IndexDocusaurusThemeNovaDefaultCssAccessibilityPath = string;

export type IndexDocusaurusThemeNovaDefaultCssUtilitiesPath = string;

export type IndexDocusaurusThemeNovaDefaultCssComponentsDirectory = string;

export type IndexDocusaurusThemeNovaDefaultCssComponentFiles = string[];

export type IndexDocusaurusThemeNovaDefaultCssComponentFileName = string | Buffer;

export type IndexDocusaurusThemeNovaDefaultCssThemeDirectory = string;

export type IndexDocusaurusThemeNovaDefaultCssThemeFiles = string[];

export type IndexDocusaurusThemeNovaDefaultCssThemeFileName = string | Buffer;

export type IndexDocusaurusThemeNovaDefaultCssPresetDirectory = string;

export type IndexDocusaurusThemeNovaDefaultCssPresetPath = string;

export type IndexDocusaurusThemeNovaDefaultCssPresetComponentsDirectory = string;

export type IndexDocusaurusThemeNovaDefaultCssPresetComponentFiles = string[];

export type IndexDocusaurusThemeNovaDefaultCssPresetComponentFileName = string | Buffer;

export type IndexDocusaurusThemeNovaDefaultCssPresetThemeDirectory = string;

export type IndexDocusaurusThemeNovaDefaultActiveNavbarPrefix = string;

export type IndexDocusaurusThemeNovaDefaultActiveFooterPrefix = string;

export type IndexDocusaurusThemeNovaDefaultCssPresetThemeFiles = string[];

export type IndexDocusaurusThemeNovaDefaultCssPresetThemeFileName = string | Buffer;

export type IndexDocusaurusThemeNovaDefaultCssPresetThemeFileNameString = string;

export type IndexDocusaurusThemeNovaDefaultI18nConfigCurrentLocale = string;

export type IndexDocusaurusThemeNovaDefaultI18nConfigLocaleConfigs = Record<string, unknown>;

export type IndexDocusaurusThemeNovaDefaultI18nConfig = {
  currentLocale: IndexDocusaurusThemeNovaDefaultI18nConfigCurrentLocale;
  localeConfigs: IndexDocusaurusThemeNovaDefaultI18nConfigLocaleConfigs;
  [key: string]: unknown;
};

export type IndexDocusaurusThemeNovaDefaultCurrentLocale = string;

export type IndexDocusaurusThemeNovaDefaultLocaleConfigs = Record<string, unknown>;

export type IndexDocusaurusThemeNovaDefaultLocaleConfigDirection = string;

export type IndexDocusaurusThemeNovaDefaultLocaleConfig = {
  direction: IndexDocusaurusThemeNovaDefaultLocaleConfigDirection;
  [key: string]: unknown;
};

export type IndexDocusaurusThemeNovaDefaultLocaleDirection = string;

export type IndexDocusaurusThemeNovaDefaultIsRtl = boolean;

export type IndexDocusaurusThemeNovaDefaultSiteStorageType = string;

export type IndexDocusaurusThemeNovaDefaultSiteStorageNamespace = string;

export type IndexDocusaurusThemeNovaDefaultSiteStorage = {
  type: IndexDocusaurusThemeNovaDefaultSiteStorageType;
  namespace: IndexDocusaurusThemeNovaDefaultSiteStorageNamespace;
};

export type IndexDocusaurusThemeNovaDefaultSiteConfigThemeConfig = Record<string, unknown>;

export type IndexDocusaurusThemeNovaDefaultSiteConfig = {
  themeConfig: IndexDocusaurusThemeNovaDefaultSiteConfigThemeConfig;
  [key: string]: unknown;
};

export type IndexDocusaurusThemeNovaDefaultThemeConfig = Record<string, unknown>;

export type IndexDocusaurusThemeNovaDefaultAnnouncementBar = Record<string, unknown> | undefined;

export type IndexDocusaurusThemeNovaDefaultProgressBarConfig = OptionsPluginOptionsProgressBar;

export type IndexDocusaurusThemeNovaDefaultNprogressCssPath = string;

export type IndexDocusaurusThemeNovaDefaultSearchConfig = OptionsPluginOptionsSearch | undefined;

/**
 * Index - Docusaurus Theme Nova - Default - Configure Post Css.
 *
 * @since 0.15.0
 */
export type IndexDocusaurusThemeNovaDefaultConfigurePostCssPostCssOptionsPlugins = unknown[];

export type IndexDocusaurusThemeNovaDefaultConfigurePostCssPostCssOptions = {
  plugins: IndexDocusaurusThemeNovaDefaultConfigurePostCssPostCssOptionsPlugins;
  [key: string]: unknown;
};

export type IndexDocusaurusThemeNovaDefaultConfigurePostCssRtlPluginPostcssPlugin = string;

export type IndexDocusaurusThemeNovaDefaultConfigurePostCssRtlPluginPrepare = (result: unknown) => Record<string, unknown>;

export type IndexDocusaurusThemeNovaDefaultConfigurePostCssRtlPlugin = {
  postcssPlugin: IndexDocusaurusThemeNovaDefaultConfigurePostCssRtlPluginPostcssPlugin;
  prepare: IndexDocusaurusThemeNovaDefaultConfigurePostCssRtlPluginPrepare;
};

/**
 * Index - Docusaurus Theme Nova - Default - Configure Webpack.
 *
 * @since 0.15.0
 */
export type IndexDocusaurusThemeNovaDefaultConfigureWebpackAssetsDirectory = string;

/**
 * Index - Docusaurus Theme Nova - Default - Content Loaded.
 *
 * @since 0.15.0
 */
export type IndexDocusaurusThemeNovaDefaultContentLoadedArgsActions = IndexDocusaurusThemeNovaDefaultContentLoadedActions;

export type IndexDocusaurusThemeNovaDefaultContentLoadedArgs = {
  actions: IndexDocusaurusThemeNovaDefaultContentLoadedArgsActions;
  [key: string]: unknown;
};

export type IndexDocusaurusThemeNovaDefaultContentLoadedActionsAddRoute = (config: IndexDocusaurusThemeNovaDefaultContentLoadedActionsAddRouteConfig) => void;

export type IndexDocusaurusThemeNovaDefaultContentLoadedActionsSetGlobalData = (data: IndexDocusaurusThemeNovaDefaultContentLoadedGlobalData) => void;

export type IndexDocusaurusThemeNovaDefaultContentLoadedActions = {
  addRoute: IndexDocusaurusThemeNovaDefaultContentLoadedActionsAddRoute;
  setGlobalData: IndexDocusaurusThemeNovaDefaultContentLoadedActionsSetGlobalData;
  [key: string]: unknown;
};

export type IndexDocusaurusThemeNovaDefaultContentLoadedGlobalDataBlogAuthors = IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthor[];

export type IndexDocusaurusThemeNovaDefaultContentLoadedGlobalDataBlogPosts = IndexDocusaurusThemeNovaDefaultContentLoadedBlogPosts;

export type IndexDocusaurusThemeNovaDefaultContentLoadedGlobalDataDocDescriptions = IndexDocusaurusThemeNovaDefaultContentLoadedDocDescriptions;

export type IndexDocusaurusThemeNovaDefaultContentLoadedGlobalDataNavbarVariant = SharedPresetNavbar;

export type IndexDocusaurusThemeNovaDefaultContentLoadedGlobalDataFooterVariant = SharedPresetFooter;

export type IndexDocusaurusThemeNovaDefaultContentLoadedGlobalDataPresetLogo = SharedPresetLogo;

export type IndexDocusaurusThemeNovaDefaultContentLoadedGlobalData = {
  blogAuthors: IndexDocusaurusThemeNovaDefaultContentLoadedGlobalDataBlogAuthors;
  blogPosts: IndexDocusaurusThemeNovaDefaultContentLoadedGlobalDataBlogPosts;
  docDescriptions: IndexDocusaurusThemeNovaDefaultContentLoadedGlobalDataDocDescriptions;
  navbarVariant: IndexDocusaurusThemeNovaDefaultContentLoadedGlobalDataNavbarVariant;
  footerVariant: IndexDocusaurusThemeNovaDefaultContentLoadedGlobalDataFooterVariant;
  presetLogo: IndexDocusaurusThemeNovaDefaultContentLoadedGlobalDataPresetLogo;
};

export type IndexDocusaurusThemeNovaDefaultContentLoadedDocDescriptions = Record<string, string>;

export type IndexDocusaurusThemeNovaDefaultContentLoadedDocsDataDirectory = string;

export type IndexDocusaurusThemeNovaDefaultContentLoadedDocsDataFiles = string[];

export type IndexDocusaurusThemeNovaDefaultContentLoadedIsJsonFile = boolean;

export type IndexDocusaurusThemeNovaDefaultContentLoadedDocsDataFilePath = string;

export type IndexDocusaurusThemeNovaDefaultContentLoadedDocsDataFileContent = string;

export type IndexDocusaurusThemeNovaDefaultContentLoadedDocsDataFileParsed = Record<string, unknown>;

export type IndexDocusaurusThemeNovaDefaultContentLoadedHasPermalink = boolean;

export type IndexDocusaurusThemeNovaDefaultContentLoadedHasDescription = boolean;

export type IndexDocusaurusThemeNovaDefaultContentLoadedIsNotEmpty = boolean;

export type IndexDocusaurusThemeNovaDefaultContentLoadedPermalinkValue = string;

export type IndexDocusaurusThemeNovaDefaultContentLoadedDescriptionValue = string;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogPosts = IndexDocusaurusThemeNovaDefaultContentLoadedBlogPost[];

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogSeenPostPermalinks = Set<string>;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthors = IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthor[];

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogDataDirectory = string;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogSeenAuthorKeys = Set<string>;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogDataFiles = string[];

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogDataFilePath = string;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogDataFileContent = string;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogDataFileParsed = Record<string, unknown>;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogHasPermalink = boolean;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogHasDescription = boolean;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogIsNotEmpty = boolean;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogHasTitle = boolean;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogHasDate = boolean;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogTitleValue = string;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogPermalinkValue = string;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogDescriptionValue = string;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogDateValue = string;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogPostTitle = string;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogPostDescription = string;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogPostPermalink = string;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogPostDate = string;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogPost = {
  title: IndexDocusaurusThemeNovaDefaultContentLoadedBlogPostTitle;
  description: IndexDocusaurusThemeNovaDefaultContentLoadedBlogPostDescription;
  permalink: IndexDocusaurusThemeNovaDefaultContentLoadedBlogPostPermalink;
  date: IndexDocusaurusThemeNovaDefaultContentLoadedBlogPostDate;
};

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogFileAuthors = Record<string, unknown>[];

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogFileAuthor = Record<string, unknown>;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorKey = string;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorName = string | undefined;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorImageUrl = string | undefined;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorPage = Record<string, unknown> | undefined;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorPermalink = string | undefined;

export type IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthor = {
  imageURL: IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorImageUrl;
  key: IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorKey;
  name: IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorName;
  permalink: IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorPermalink;
};

export type IndexDocusaurusThemeNovaDefaultContentLoadedActionsAddRouteConfigPath = string;

export type IndexDocusaurusThemeNovaDefaultContentLoadedActionsAddRouteConfigComponent = string;

export type IndexDocusaurusThemeNovaDefaultContentLoadedActionsAddRouteConfig = {
  path: IndexDocusaurusThemeNovaDefaultContentLoadedActionsAddRouteConfigPath;
  component: IndexDocusaurusThemeNovaDefaultContentLoadedActionsAddRouteConfigComponent;
  exact?: boolean;
  [key: string]: unknown;
};

/**
 * Index - Docusaurus Theme Nova - Default - Get Client Modules.
 *
 * @since 0.15.0
 */
export type IndexDocusaurusThemeNovaDefaultStickyLayoutPath = string;

export type IndexDocusaurusThemeNovaDefaultGetClientModulesClientModules = string[];

export type IndexDocusaurusThemeNovaDefaultGetClientModulesNprogressCssPath = string;

/**
 * Index - Docusaurus Theme Nova - Default - Get Default Code Translation Messages.
 *
 * @since 0.15.0
 */

/**
 * Index - Docusaurus Theme Nova - Default - Get Theme Path.
 *
 * @since 0.15.0
 */

/**
 * Index - Docusaurus Theme Nova - Default - Get Translation Files.
 *
 * @since 0.15.0
 */

/**
 * Index - Docusaurus Theme Nova - Default - Get TypeScript Theme Path.
 *
 * @since 0.15.0
 */

/**
 * Index - Docusaurus Theme Nova - Default - Inject HTML Tags.
 *
 * @since 0.15.0
 */
export type IndexDocusaurusThemeNovaDefaultInjectHtmlTagsHeadTags = Array<{
  tagName: string;
  attributes?: Record<string, string | boolean>;
  innerHTML?: string;
}>;

export type IndexDocusaurusThemeNovaDefaultInjectHtmlTagsPreBodyTags = Array<{
  tagName: string;
  attributes?: Record<string, string | boolean>;
  innerHTML?: string;
}>;

export type IndexDocusaurusThemeNovaDefaultInjectHtmlTagsColorModeInit = string;

export type IndexDocusaurusThemeNovaDefaultInjectHtmlTagsPreBodyScriptEntries = Array<{
  tagName: string;
  innerHTML: string;
}>;

export type IndexDocusaurusThemeNovaDefaultInjectHtmlTagsPresetVariantInit = string;

export type IndexDocusaurusThemeNovaDefaultInjectHtmlTagsAnnouncementBarInit = string;

/**
 * Index - Docusaurus Theme Nova - Default - Post Build.
 *
 * @since 0.15.0
 */
export type IndexDocusaurusThemeNovaDefaultPostBuildArgsOutDir = string;

export type IndexDocusaurusThemeNovaDefaultPostBuildArgsRoutesPaths = string[];

export type IndexDocusaurusThemeNovaDefaultPostBuildArgsSiteConfigBaseUrl = string;

export type IndexDocusaurusThemeNovaDefaultPostBuildArgsSiteConfig = {
  baseUrl: IndexDocusaurusThemeNovaDefaultPostBuildArgsSiteConfigBaseUrl;
  [key: string]: unknown;
};

export type IndexDocusaurusThemeNovaDefaultPostBuildArgs = {
  outDir: IndexDocusaurusThemeNovaDefaultPostBuildArgsOutDir;
  routesPaths: IndexDocusaurusThemeNovaDefaultPostBuildArgsRoutesPaths;
  siteConfig: IndexDocusaurusThemeNovaDefaultPostBuildArgsSiteConfig;
  [key: string]: unknown;
};

export type IndexDocusaurusThemeNovaDefaultPostBuildSearchConfigCast = Record<string, unknown>;

/**
 * Index - Docusaurus Theme Nova - Default - Preset Logo Content.
 *
 * @since 0.15.0
 */
export type IndexDocusaurusThemeNovaDefaultPresetLogoContent = string;

/**
 * Index - Docusaurus Theme Nova - Default - Preset Logo Data Uri.
 *
 * @since 0.15.0
 */
export type IndexDocusaurusThemeNovaDefaultPresetLogoDataUri = string;

/**
 * Index - Docusaurus Theme Nova - Default - Preset Logo Path.
 *
 * @since 0.15.0
 */
export type IndexDocusaurusThemeNovaDefaultPresetLogoPath = string;

/**
 * Index - Docusaurus Theme Nova - Default - Preset Logo Src.
 *
 * @since 0.15.0
 */
export type IndexDocusaurusThemeNovaDefaultPresetLogoSrc = string;

/**
 * Index - Docusaurus Theme Nova - Default - Translate Theme Config.
 *
 * @since 0.15.0
 */
export type IndexDocusaurusThemeNovaDefaultTranslateThemeConfigParamsThemeConfig = Record<string, unknown>;

export type IndexDocusaurusThemeNovaDefaultTranslateThemeConfigParamsTranslationFiles = unknown[];

export type IndexDocusaurusThemeNovaDefaultTranslateThemeConfigParams = {
  themeConfig: IndexDocusaurusThemeNovaDefaultTranslateThemeConfigParamsThemeConfig;
  translationFiles: IndexDocusaurusThemeNovaDefaultTranslateThemeConfigParamsTranslationFiles;
};
