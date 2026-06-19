import {
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import { dirname, resolve } from 'path';

import { readDefaultCodeTranslationMessages } from '@docusaurus/theme-translations';

import { comparePresetThemeFiles } from './lib/compare-preset-theme-files.js';
import { Runner as LibCssGenerator } from './lib/css-generator.js';
import { filterPresetThemeFile } from './lib/filter-preset-theme-file.js';
import { buildGoogleFontsUrl } from './lib/google-fonts-url.js';
import { buildSearchIndex } from './lib/search/indexer.js';
import { Runner as LibTranslations } from './lib/translations.js';
import { resolvePreset } from './options.js';
import { announcementBarInit } from './scripts/announcement-bar-init.js';
import { colorModeInit } from './scripts/color-mode-init.js';
import { dataAttributeQuery } from './scripts/data-attribute-query.js';

import type {
  Index_Runner_Default_ActiveFooterPrefix,
  Index_Runner_Default_ActiveNavbarPrefix,
  Index_Runner_Default_AllContentLoaded_Actions,
  Index_Runner_Default_AllContentLoaded_AllContent,
  Index_Runner_Default_AllContentLoaded_Args,
  Index_Runner_Default_AllContentLoaded_AuthorImageUrl,
  Index_Runner_Default_AllContentLoaded_AuthorKey,
  Index_Runner_Default_AllContentLoaded_AuthorName,
  Index_Runner_Default_AllContentLoaded_AuthorPage,
  Index_Runner_Default_AllContentLoaded_AuthorPermalink,
  Index_Runner_Default_AllContentLoaded_AuthorRaw,
  Index_Runner_Default_AllContentLoaded_BlogAuthor,
  Index_Runner_Default_AllContentLoaded_BlogAuthors,
  Index_Runner_Default_AllContentLoaded_BlogDateValue,
  Index_Runner_Default_AllContentLoaded_BlogDescriptionValue,
  Index_Runner_Default_AllContentLoaded_BlogPermalinkValue,
  Index_Runner_Default_AllContentLoaded_BlogPluginContent,
  Index_Runner_Default_AllContentLoaded_BlogPluginData,
  Index_Runner_Default_AllContentLoaded_BlogPluginPosts,
  Index_Runner_Default_AllContentLoaded_BlogPost,
  Index_Runner_Default_AllContentLoaded_BlogPostAuthors,
  Index_Runner_Default_AllContentLoaded_BlogPostMetadata,
  Index_Runner_Default_AllContentLoaded_BlogPosts,
  Index_Runner_Default_AllContentLoaded_BlogSeenAuthorKeys,
  Index_Runner_Default_AllContentLoaded_BlogSeenPostPermalinks,
  Index_Runner_Default_AllContentLoaded_BlogTitleValue,
  Index_Runner_Default_AllContentLoaded_CreditPhraseCount,
  Index_Runner_Default_AllContentLoaded_CreditPhraseIndex,
  Index_Runner_Default_AllContentLoaded_DescriptionValue,
  Index_Runner_Default_AllContentLoaded_DocDescriptions,
  Index_Runner_Default_AllContentLoaded_DocsLoadedVersions,
  Index_Runner_Default_AllContentLoaded_DocsPluginContent,
  Index_Runner_Default_AllContentLoaded_DocsPluginData,
  Index_Runner_Default_AllContentLoaded_DocsVersionDocs,
  Index_Runner_Default_AllContentLoaded_ErrorPageContentTitleCount,
  Index_Runner_Default_AllContentLoaded_ErrorPageContentTitleIndex,
  Index_Runner_Default_AllContentLoaded_NotFoundBundleCount,
  Index_Runner_Default_AllContentLoaded_NotFoundBundleIndex,
  Index_Runner_Default_AllContentLoaded_PermalinkValue,
  Index_Runner_Default_AnnouncementBar,
  Index_Runner_Default_AssetsDirectory,
  Index_Runner_Default_BlocksPath,
  Index_Runner_Default_ConfigurePostCss_PostCssOptions,
  Index_Runner_Default_ConfigurePostCss_RtlPlugin,
  Index_Runner_Default_ContentLoaded_Actions,
  Index_Runner_Default_ContentLoaded_Args,
  Index_Runner_Default_Context,
  Index_Runner_Default_CssAccessibilityPath,
  Index_Runner_Default_CssBlockFiles,
  Index_Runner_Default_CssBlocksDirectory,
  Index_Runner_Default_CssGridPath,
  Index_Runner_Default_CssPresetBlockFiles,
  Index_Runner_Default_CssPresetBlocksDirectory,
  Index_Runner_Default_CssPresetDirectory,
  Index_Runner_Default_CssPresetPath,
  Index_Runner_Default_CssPresetThemeDirectory,
  Index_Runner_Default_CssPresetThemeFiles,
  Index_Runner_Default_CssResetPath,
  Index_Runner_Default_CssThemeDirectory,
  Index_Runner_Default_CssThemeFiles,
  Index_Runner_Default_CssUtilitiesPath,
  Index_Runner_Default_CurrentDirectory,
  Index_Runner_Default_CurrentLocale,
  Index_Runner_Default_GeneratedCss,
  Index_Runner_Default_GeneratedCssDirectory,
  Index_Runner_Default_GeneratedCssPath,
  Index_Runner_Default_GetClientModules_ClientModules,
  Index_Runner_Default_GetClientModules_NprogressCssModule,
  Index_Runner_Default_GetClientModules_StickyLayoutPath,
  Index_Runner_Default_GetDefaultCodeTranslationMessages_NovaTranslationsDirPath,
  Index_Runner_Default_GetDefaultCodeTranslationMessages_ThemeCommonMessages,
  Index_Runner_Default_GetDefaultCodeTranslationMessages_ThemeNovaMessages,
  Index_Runner_Default_GoogleFontsUrl,
  Index_Runner_Default_I18nConfig,
  Index_Runner_Default_InjectHtmlTags_AnnouncementBarScript,
  Index_Runner_Default_InjectHtmlTags_ColorModeScript,
  Index_Runner_Default_InjectHtmlTags_HeadTags,
  Index_Runner_Default_InjectHtmlTags_PreBodyScriptEntries,
  Index_Runner_Default_InjectHtmlTags_PreBodyTags,
  Index_Runner_Default_InjectHtmlTags_PresetVariantInit,
  Index_Runner_Default_IsRtl,
  Index_Runner_Default_LibPath,
  Index_Runner_Default_LocaleConfig,
  Index_Runner_Default_LocaleConfigs,
  Index_Runner_Default_LocaleDirection,
  Index_Runner_Default_NprogressCssPath,
  Index_Runner_Default_Options,
  Index_Runner_Default_PathsToWatch,
  Index_Runner_Default_PostBuild_Args,
  Index_Runner_Default_PostBuild_SearchConfigCast,
  Index_Runner_Default_PresetLogoContent,
  Index_Runner_Default_PresetLogoDataUri,
  Index_Runner_Default_PresetLogoPath,
  Index_Runner_Default_PresetLogoSrc,
  Index_Runner_Default_PresetName,
  Index_Runner_Default_ProgressBarConfig,
  Index_Runner_Default_ResolvedPreset,
  Index_Runner_Default_Returns,
  Index_Runner_Default_SearchConfig,
  Index_Runner_Default_SiteConfig,
  Index_Runner_Default_SiteDirectory,
  Index_Runner_Default_SiteStorage,
  Index_Runner_Default_ThemeConfig,
  Index_Runner_Default_ThemePath,
  Index_Runner_Default_TranslateThemeConfig_Params,
  Index_Runner_Default_TypeScriptThemePath,
} from './types/index.d.ts';

/**
 * Docusaurus Theme Nova.
 *
 * Plugin entry class that resolves preset configuration, generates
 * CSS custom properties, and returns the Docusaurus plugin object
 * with theme path and injected assets.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * Index - Docusaurus Theme Nova - Default.
   *
   * Docusaurus plugin factory function that resolves the preset, generates
   * CSS from the resolved configuration, and returns the plugin object with
   * theme, translation, PostCSS, and asset hooks.
   *
   * @param {Index_Runner_Default_Context} context - Context.
   * @param {Index_Runner_Default_Options} options - Options.
   *
   * @returns {Index_Runner_Default_Returns}
   *
   * @since 0.15.0
   */
  public static default(context: Index_Runner_Default_Context, options: Index_Runner_Default_Options): Index_Runner_Default_Returns {
    const resolvedPreset: Index_Runner_Default_ResolvedPreset = resolvePreset(options);

    const generatedCss: Index_Runner_Default_GeneratedCss = LibCssGenerator.generate({
      preset: resolvedPreset,
    });

    // Write generated CSS to a static file so webpack can bundle and cache it.
    const siteDirectory: Index_Runner_Default_SiteDirectory = context['siteDir'];
    const generatedCssDirectory: Index_Runner_Default_GeneratedCssDirectory = resolve(siteDirectory, '.docusaurus/docusaurus-theme-nova');
    const generatedCssPath: Index_Runner_Default_GeneratedCssPath = resolve(generatedCssDirectory, 'nova-generated.css');

    mkdirSync(generatedCssDirectory, { recursive: true });

    writeFileSync(generatedCssPath, generatedCss, 'utf-8');

    const googleFontsUrl: Index_Runner_Default_GoogleFontsUrl = buildGoogleFontsUrl(
      [
        {
          name: resolvedPreset['fonts']['display'],
          axis: 'wght@400;600;700',
        },
        {
          name: resolvedPreset['fonts']['body'],
          axis: 'wght@400;500;700',
        },
        {
          name: resolvedPreset['fonts']['code'],
          axis: 'wght@400;500',
        },
      ],
      'block',
    );

    const presetName: Index_Runner_Default_PresetName = options['preset'];
    const currentDirectory: Index_Runner_Default_CurrentDirectory = dirname(__filename);

    // Resolve preset logo to a data URI so it works as an <img src> at runtime.
    const presetLogoSrc: Index_Runner_Default_PresetLogoSrc = resolvedPreset['logo']['src'];
    const assetsDirectory: Index_Runner_Default_AssetsDirectory = resolve(currentDirectory, '../../assets');
    const presetLogoPath: Index_Runner_Default_PresetLogoPath = resolve(assetsDirectory, presetLogoSrc.replace('@nova-assets/', ''));
    const presetLogoContent: Index_Runner_Default_PresetLogoContent = readFileSync(presetLogoPath, 'utf-8');
    const presetLogoDataUri: Index_Runner_Default_PresetLogoDataUri = `data:image/svg+xml;base64,${Buffer.from(presetLogoContent).toString('base64')}`;

    const themePath: Index_Runner_Default_ThemePath = `${currentDirectory}/theme`;
    const typeScriptThemePath: Index_Runner_Default_TypeScriptThemePath = resolve(currentDirectory, '../src/theme');
    const blocksPath: Index_Runner_Default_BlocksPath = `${currentDirectory}/blocks`;
    const libPath: Index_Runner_Default_LibPath = `${currentDirectory}/lib`;
    const pathsToWatch: Index_Runner_Default_PathsToWatch = [
      blocksPath,
      libPath,
    ];

    // Global CSS files.
    const cssResetPath: Index_Runner_Default_CssResetPath = resolve(currentDirectory, 'styles/reset.css');
    const cssGridPath: Index_Runner_Default_CssGridPath = resolve(currentDirectory, 'styles/grid.css');
    const cssAccessibilityPath: Index_Runner_Default_CssAccessibilityPath = resolve(currentDirectory, 'styles/accessibility.css');
    const cssUtilitiesPath: Index_Runner_Default_CssUtilitiesPath = resolve(currentDirectory, 'styles/utilities.css');

    // Shared block and theme CSS files.
    const cssBlocksDirectory: Index_Runner_Default_CssBlocksDirectory = resolve(currentDirectory, 'styles/blocks');
    const cssBlockFiles: Index_Runner_Default_CssBlockFiles = readdirSync(cssBlocksDirectory, { recursive: true }).filter((fileName) => String(fileName).endsWith('style.css')).sort().map((fileName) => resolve(cssBlocksDirectory, String(fileName)));
    const cssThemeDirectory: Index_Runner_Default_CssThemeDirectory = resolve(currentDirectory, 'styles/theme');
    const cssThemeFiles: Index_Runner_Default_CssThemeFiles = readdirSync(cssThemeDirectory, { recursive: true }).filter((fileName) => String(fileName).endsWith('style.css')).sort().map((fileName) => resolve(cssThemeDirectory, String(fileName)));

    // Preset CSS files.
    const cssPresetDirectory: Index_Runner_Default_CssPresetDirectory = resolve(currentDirectory, `styles/presets/${presetName}`);
    const cssPresetPath: Index_Runner_Default_CssPresetPath = resolve(cssPresetDirectory, 'preset.css');
    const cssPresetBlocksDirectory: Index_Runner_Default_CssPresetBlocksDirectory = resolve(cssPresetDirectory, 'blocks');
    const cssPresetBlockFiles: Index_Runner_Default_CssPresetBlockFiles = readdirSync(cssPresetBlocksDirectory, { recursive: true }).filter((fileName) => String(fileName).endsWith('style.css')).sort().map((fileName) => resolve(cssPresetBlocksDirectory, String(fileName)));
    const cssPresetThemeDirectory: Index_Runner_Default_CssPresetThemeDirectory = resolve(cssPresetDirectory, 'theme');
    const activeNavbarPrefix: Index_Runner_Default_ActiveNavbarPrefix = `Navbar/${resolvedPreset['navbar'].charAt(0).toUpperCase()}${resolvedPreset['navbar'].slice(1)}/`;
    const activeFooterPrefix: Index_Runner_Default_ActiveFooterPrefix = `Footer/${resolvedPreset['footer'].charAt(0).toUpperCase()}${resolvedPreset['footer'].slice(1)}/`;
    const cssPresetThemeFiles: Index_Runner_Default_CssPresetThemeFiles = readdirSync(cssPresetThemeDirectory, { recursive: true }).filter(
      (fileName) => filterPresetThemeFile(String(fileName), activeNavbarPrefix, activeFooterPrefix),
    ).sort(
      (a, b) => comparePresetThemeFiles(String(a), String(b)),
    ).map((fileName) => resolve(cssPresetThemeDirectory, String(fileName)));

    const i18nConfig: Index_Runner_Default_I18nConfig = context['i18n'] as Index_Runner_Default_I18nConfig;
    const currentLocale: Index_Runner_Default_CurrentLocale = i18nConfig['currentLocale'];
    const localeConfigs: Index_Runner_Default_LocaleConfigs = i18nConfig['localeConfigs'];
    const localeConfig: Index_Runner_Default_LocaleConfig = localeConfigs[currentLocale] as Index_Runner_Default_LocaleConfig;
    const localeDirection: Index_Runner_Default_LocaleDirection = localeConfig['direction'];
    const isRtl: Index_Runner_Default_IsRtl = localeDirection === 'rtl';
    const siteStorage: Index_Runner_Default_SiteStorage = context['siteStorage'] as Index_Runner_Default_SiteStorage;
    const siteConfig: Index_Runner_Default_SiteConfig = context['siteConfig'] as Index_Runner_Default_SiteConfig;
    const themeConfig: Index_Runner_Default_ThemeConfig = siteConfig['themeConfig'] as Index_Runner_Default_ThemeConfig;
    const announcementBar: Index_Runner_Default_AnnouncementBar = themeConfig['announcementBar'] as Index_Runner_Default_AnnouncementBar;

    const progressBarConfig: Index_Runner_Default_ProgressBarConfig = options['progressBar'];
    const nprogressCssPath: Index_Runner_Default_NprogressCssPath = require.resolve('nprogress/nprogress.css');
    const searchConfig: Index_Runner_Default_SearchConfig = options['search'] as Index_Runner_Default_SearchConfig;

    return {
      name: 'docusaurus-theme-nova',

      /**
       * Index - Docusaurus Theme Nova - Default - Get Theme Path.
       *
       * Returns the absolute path to the compiled theme directory containing
       * the built React components that Docusaurus loads at runtime.
       *
       * @returns {string}
       *
       * @since 0.15.0
       */
      getThemePath() {
        return themePath;
      },

      /**
       * Index - Docusaurus Theme Nova - Default - Get TypeScript Theme Path.
       *
       * Returns the absolute path to the source theme directory containing
       * the original TypeScript components for swizzle with the typescript flag.
       *
       * @returns {string}
       *
       * @since 0.15.0
       */
      getTypeScriptThemePath() {
        return typeScriptThemePath;
      },

      /**
       * Index - Docusaurus Theme Nova - Default - Get Paths To Watch.
       *
       * Returns preset source paths that Docusaurus walks during translation
       * extraction in addition to `getThemePath()`, so `translate()` calls in
       * `blocks/` and `lib/` get picked up by `docusaurus write-translations`.
       *
       * @returns {Index_Runner_Default_PathsToWatch}
       *
       * @since 0.18.0
       */
      getPathsToWatch() {
        return pathsToWatch;
      },

      /**
       * Index - Docusaurus Theme Nova - Default - Get Client Modules.
       *
       * Returns the list of CSS asset paths that Docusaurus injects as client
       * modules including global resets, shared block and theme styles, preset
       * identity and overrides, and optionally the NProgress progress bar stylesheet.
       *
       * @returns {string[]}
       *
       * @since 0.15.0
       */
      getClientModules() {
        const stickyLayoutPath: Index_Runner_Default_GetClientModules_StickyLayoutPath = resolve(currentDirectory, 'lib/sticky-layout.js');

        const clientModules: Index_Runner_Default_GetClientModules_ClientModules = [
          cssResetPath,
          cssGridPath,
          cssAccessibilityPath,
          cssUtilitiesPath,
          generatedCssPath,
          ...cssBlockFiles,
          ...cssThemeFiles,
          cssPresetPath,
          ...cssPresetBlockFiles,
          ...cssPresetThemeFiles,
          stickyLayoutPath,
        ];

        if (progressBarConfig !== false) {
          const nprogressCssModule: Index_Runner_Default_GetClientModules_NprogressCssModule = resolve(nprogressCssPath);

          clientModules.push(nprogressCssModule);
        }

        return clientModules;
      },

      /**
       * Index - Docusaurus Theme Nova - Default - Inject HTML Tags.
       *
       * Returns head tags for Google Fonts and pre-body tags for inline
       * scripts that initialize color mode, announcement bar dismiss
       * state, data attribute query strings, and preset variants.
       *
       * @returns {{ headTags: Index_Runner_Default_InjectHtmlTags_HeadTags, preBodyTags: Index_Runner_Default_InjectHtmlTags_PreBodyTags }}
       *
       * @since 0.15.0
       */
      injectHtmlTags() {
        const headTags: Index_Runner_Default_InjectHtmlTags_HeadTags = [
          {
            tagName: 'link',
            attributes: {
              rel: 'preconnect',
              href: 'https://fonts.googleapis.com',
            },
          },
          {
            tagName: 'link',
            attributes: {
              rel: 'preconnect',
              href: 'https://fonts.gstatic.com',
              crossorigin: 'anonymous',
            },
          },

          {
            tagName: 'link',
            attributes: {
              rel: 'stylesheet',
              href: googleFontsUrl,
            },
          },
        ];

        const colorModeScript: Index_Runner_Default_InjectHtmlTags_ColorModeScript = colorModeInit({
          siteStorage,
          themeConfig,
        });

        const preBodyScriptEntries: Index_Runner_Default_InjectHtmlTags_PreBodyScriptEntries = [
          {
            tagName: 'script',
            innerHTML: colorModeScript,
          },
          {
            tagName: 'script',
            innerHTML: dataAttributeQuery,
          },
        ];

        const presetVariantInit: Index_Runner_Default_InjectHtmlTags_PresetVariantInit = [
          '(function() {',
          `  document.documentElement.setAttribute('data-navbar-variant', '${resolvedPreset['navbar']}');`,
          `  document.documentElement.setAttribute('data-footer-variant', '${resolvedPreset['footer']}');`,
          '})();',
        ].join('\n');

        preBodyScriptEntries.push({
          tagName: 'script',
          innerHTML: presetVariantInit,
        });

        if (announcementBar !== undefined) {
          const announcementBarScript: Index_Runner_Default_InjectHtmlTags_AnnouncementBarScript = announcementBarInit({
            siteStorage,
          });

          preBodyScriptEntries.push({
            tagName: 'script',
            innerHTML: announcementBarScript,
          });
        }

        const preBodyTags: Index_Runner_Default_InjectHtmlTags_PreBodyTags = preBodyScriptEntries;

        return {
          headTags,
          preBodyTags,
        };
      },

      /**
       * Index - Docusaurus Theme Nova - Default - Configure Post Css.
       *
       * Appends an RTL CSS transformation plugin to the PostCSS pipeline
       * when the current locale direction is right-to-left.
       *
       * @param {Index_Runner_Default_ConfigurePostCss_PostCssOptions} postCssOptions - Post css options.
       *
       * @returns {Index_Runner_Default_ConfigurePostCss_PostCssOptions}
       *
       * @since 0.15.0
       */
      configurePostCss(postCssOptions: Index_Runner_Default_ConfigurePostCss_PostCssOptions) {
        if (isRtl === true) {
          const rtlPlugin: Index_Runner_Default_ConfigurePostCss_RtlPlugin = require('rtlcss');

          postCssOptions['plugins'].push(rtlPlugin);
        }

        return postCssOptions;
      },

      /**
       * Index - Docusaurus Theme Nova - Default - Configure Webpack.
       *
       * Returns a webpack configuration fragment that registers a module
       * alias mapping at-nova-assets to the package assets directory so
       * preset logo files can be imported by path.
       *
       * @returns {{ resolve: { alias: Record<string, string> } }}
       *
       * @since 0.15.0
       */
      configureWebpack() {
        return {
          resolve: {
            alias: {
              '@nova-assets': assetsDirectory,
            },
          },
        };
      },

      /**
       * Index - Docusaurus Theme Nova - Default - Get Translation Files.
       *
       * Extracts translatable strings from the resolved theme configuration
       * into per-area `TranslationFile` bundles (navbar, announcementBar,
       * footer, blog) for `docusaurus write-translations` to scaffold.
       *
       * @returns {TranslationFile[]}
       *
       * @since 0.15.0
       */
      getTranslationFiles() {
        return LibTranslations.extract({ themeConfig });
      },

      /**
       * Index - Docusaurus Theme Nova - Default - Get Default Code Translation Messages.
       *
       * Loads the default code translation messages for the current locale by
       * reading both the upstream Docusaurus theme-common bundle and Nova's own
       * theme-nova bundle, then merging them with Nova taking precedence.
       *
       * @returns {Promise<Record<string, string>>}
       *
       * @since 0.15.0
       */
      async getDefaultCodeTranslationMessages() {
        const novaTranslationsDirPath: Index_Runner_Default_GetDefaultCodeTranslationMessages_NovaTranslationsDirPath = resolve(currentDirectory, '../../translations/locales');

        const themeCommonMessages: Index_Runner_Default_GetDefaultCodeTranslationMessages_ThemeCommonMessages = await readDefaultCodeTranslationMessages({
          locale: currentLocale,
          name: 'theme-common',
        });

        const themeNovaMessages: Index_Runner_Default_GetDefaultCodeTranslationMessages_ThemeNovaMessages = await readDefaultCodeTranslationMessages({
          dirPath: novaTranslationsDirPath,
          locale: currentLocale,
          name: 'theme-nova',
        });

        return {
          ...themeCommonMessages,
          ...themeNovaMessages,
        };
      },

      /**
       * Index - Docusaurus Theme Nova - Default - Translate Theme Config.
       *
       * Returns a deep-cloned theme configuration with translated strings
       * spliced into the navbar, announcement bar, footer, and blog areas,
       * falling back to source strings when a translation key is missing.
       *
       * @param {Index_Runner_Default_TranslateThemeConfig_Params} params - Params.
       *
       * @returns {Record<string, unknown>}
       *
       * @since 0.15.0
       */
      translateThemeConfig(params: Index_Runner_Default_TranslateThemeConfig_Params) {
        return LibTranslations.apply({
          themeConfig: params['themeConfig'],
          translationFiles: params['translationFiles'],
        });
      },

      /**
       * Index - Docusaurus Theme Nova - Default - Post Build.
       *
       * Invokes the search index builder when search is enabled, writing
       * the serialized lunr index, document manifest, and worker script
       * to the build output directory.
       *
       * @param {Index_Runner_Default_PostBuild_Args} args - Args.
       *
       * @returns {Promise<void>}
       *
       * @since 0.15.0
       */
      async postBuild(args: Index_Runner_Default_PostBuild_Args) {
        if (searchConfig !== undefined && searchConfig !== false) {
          buildSearchIndex({
            outDir: args['outDir'],
            routesPaths: args['routesPaths'],
            baseUrl: args['siteConfig']['baseUrl'],
            searchConfig: searchConfig as Index_Runner_Default_PostBuild_SearchConfigCast,
          });
        }

        return;
      },

      /**
       * Index - Docusaurus Theme Nova - Default - Content Loaded.
       *
       * Registers the /search route pointing to the SearchPage theme
       * component when search is enabled in the plugin options.
       *
       * @param {Index_Runner_Default_ContentLoaded_Args} args - Args.
       *
       * @returns {Promise<void>}
       *
       * @since 0.15.0
       */
      async contentLoaded(args: Index_Runner_Default_ContentLoaded_Args) {
        const actions: Index_Runner_Default_ContentLoaded_Actions = args['actions'];

        if (searchConfig !== undefined && searchConfig !== false) {
          actions.addRoute({
            path: '/search',
            component: '@theme/SearchPage',
            exact: true,
          });
        }

        return;
      },

      /**
       * Index - Docusaurus Theme Nova - Default - All Content Loaded.
       *
       * Aggregates doc descriptions, blog posts, and blog authors from
       * the in-memory content of the docs and blog plugins, then writes
       * the combined global data used by theme components.
       *
       * @param {Index_Runner_Default_AllContentLoaded_Args} args - Args.
       *
       * @returns {Promise<void>}
       *
       * @since 0.15.0
       */
      async allContentLoaded(args: Index_Runner_Default_AllContentLoaded_Args) {
        const allContent: Index_Runner_Default_AllContentLoaded_AllContent = args['allContent'];
        const actions: Index_Runner_Default_AllContentLoaded_Actions = args['actions'] as Index_Runner_Default_AllContentLoaded_Actions;

        // Build a permalink-to-description map from the docs plugin's
        // in-memory loaded versions.
        const docDescriptions: Index_Runner_Default_AllContentLoaded_DocDescriptions = {};
        const docsPluginData: Index_Runner_Default_AllContentLoaded_DocsPluginData = allContent['docusaurus-plugin-content-docs'];
        const docsPluginContent: Index_Runner_Default_AllContentLoaded_DocsPluginContent = (docsPluginData !== undefined) ? docsPluginData['default'] as Index_Runner_Default_AllContentLoaded_DocsPluginContent : undefined;
        const docsLoadedVersions: Index_Runner_Default_AllContentLoaded_DocsLoadedVersions = (docsPluginContent !== undefined && docsPluginContent['loadedVersions'] !== undefined) ? docsPluginContent['loadedVersions'] : [];

        for (const docsLoadedVersion of docsLoadedVersions) {
          const docsVersionDocs: Index_Runner_Default_AllContentLoaded_DocsVersionDocs = (docsLoadedVersion['docs'] !== undefined) ? docsLoadedVersion['docs'] : [];

          for (const docEntry of docsVersionDocs) {
            const permalinkValue: Index_Runner_Default_AllContentLoaded_PermalinkValue = docEntry['permalink'] as Index_Runner_Default_AllContentLoaded_PermalinkValue;
            const descriptionValue: Index_Runner_Default_AllContentLoaded_DescriptionValue = docEntry['description'] as Index_Runner_Default_AllContentLoaded_DescriptionValue;

            if (
              permalinkValue !== undefined
              && descriptionValue !== undefined
              && descriptionValue !== ''
            ) {
              Reflect.set(docDescriptions, permalinkValue, descriptionValue);
            }
          }
        }

        // Build a blog posts array and unique authors list
        // from the blog plugin's in-memory posts.
        const blogPosts: Index_Runner_Default_AllContentLoaded_BlogPosts = [];
        const blogSeenPostPermalinks: Index_Runner_Default_AllContentLoaded_BlogSeenPostPermalinks = new Set();
        const blogAuthors: Index_Runner_Default_AllContentLoaded_BlogAuthors = [];
        const blogSeenAuthorKeys: Index_Runner_Default_AllContentLoaded_BlogSeenAuthorKeys = new Set();

        const blogPluginData: Index_Runner_Default_AllContentLoaded_BlogPluginData = allContent['docusaurus-plugin-content-blog'];
        const blogPluginContent: Index_Runner_Default_AllContentLoaded_BlogPluginContent = (blogPluginData !== undefined) ? blogPluginData['default'] as Index_Runner_Default_AllContentLoaded_BlogPluginContent : undefined;
        const blogPluginPosts: Index_Runner_Default_AllContentLoaded_BlogPluginPosts = (blogPluginContent !== undefined && blogPluginContent['blogPosts'] !== undefined) ? blogPluginContent['blogPosts'] : [];

        for (const blogPluginPost of blogPluginPosts) {
          const blogPostMetadata: Index_Runner_Default_AllContentLoaded_BlogPostMetadata = (blogPluginPost['metadata'] !== undefined) ? blogPluginPost['metadata'] : {};
          const blogTitleValue: Index_Runner_Default_AllContentLoaded_BlogTitleValue = blogPostMetadata['title'] as Index_Runner_Default_AllContentLoaded_BlogTitleValue;
          const blogPermalinkValue: Index_Runner_Default_AllContentLoaded_BlogPermalinkValue = blogPostMetadata['permalink'] as Index_Runner_Default_AllContentLoaded_BlogPermalinkValue;
          const blogDescriptionValue: Index_Runner_Default_AllContentLoaded_BlogDescriptionValue = blogPostMetadata['description'] as Index_Runner_Default_AllContentLoaded_BlogDescriptionValue;
          const blogDateValue: Index_Runner_Default_AllContentLoaded_BlogDateValue = blogPostMetadata['date'] as Index_Runner_Default_AllContentLoaded_BlogDateValue;

          if (
            blogTitleValue !== undefined
            && blogPermalinkValue !== undefined
            && blogDescriptionValue !== undefined
            && blogDescriptionValue !== ''
            && blogDateValue !== undefined
            && blogSeenPostPermalinks.has(blogPermalinkValue) === false
          ) {
            blogSeenPostPermalinks.add(blogPermalinkValue);

            const blogPost: Index_Runner_Default_AllContentLoaded_BlogPost = {
              title: blogTitleValue,
              description: blogDescriptionValue,
              permalink: blogPermalinkValue,
              date: blogDateValue,
            };

            blogPosts.push(blogPost);
          }

          const blogPostAuthors: Index_Runner_Default_AllContentLoaded_BlogPostAuthors = (blogPostMetadata['authors'] !== undefined) ? blogPostMetadata['authors'] as Index_Runner_Default_AllContentLoaded_BlogPostAuthors : [];

          for (const blogPostAuthor of blogPostAuthors) {
            const authorRaw: Index_Runner_Default_AllContentLoaded_AuthorRaw = blogPostAuthor;
            const authorKey: Index_Runner_Default_AllContentLoaded_AuthorKey = authorRaw['key'] as Index_Runner_Default_AllContentLoaded_AuthorKey;

            if (authorKey === undefined || blogSeenAuthorKeys.has(authorKey) === true) {
              continue;
            }

            blogSeenAuthorKeys.add(authorKey);

            const authorName: Index_Runner_Default_AllContentLoaded_AuthorName = authorRaw['name'] as Index_Runner_Default_AllContentLoaded_AuthorName;
            const authorImageUrl: Index_Runner_Default_AllContentLoaded_AuthorImageUrl = authorRaw['imageURL'] as Index_Runner_Default_AllContentLoaded_AuthorImageUrl;
            const authorPage: Index_Runner_Default_AllContentLoaded_AuthorPage = authorRaw['page'] as Index_Runner_Default_AllContentLoaded_AuthorPage;
            const authorPermalink: Index_Runner_Default_AllContentLoaded_AuthorPermalink = (authorPage !== undefined && authorPage !== null) ? authorPage['permalink'] as Index_Runner_Default_AllContentLoaded_AuthorPermalink : undefined;

            const blogAuthor: Index_Runner_Default_AllContentLoaded_BlogAuthor = {
              imageURL: authorImageUrl,
              key: authorKey,
              name: authorName,
              permalink: authorPermalink,
            };

            blogAuthors.push(blogAuthor);
          }
        }

        // Build-time random indices for surfaces that pick from a phrase pool.
        // Computed once per build so SSR HTML matches client hydration - no
        // visible flash from useEffect-time randomization.
        const notFoundBundleCount: Index_Runner_Default_AllContentLoaded_NotFoundBundleCount = 5;
        const errorPageContentTitleCount: Index_Runner_Default_AllContentLoaded_ErrorPageContentTitleCount = 5;
        const creditPhraseCount: Index_Runner_Default_AllContentLoaded_CreditPhraseCount = 10;

        const notFoundBundleIndex: Index_Runner_Default_AllContentLoaded_NotFoundBundleIndex = Math.floor(Math.random() * notFoundBundleCount);
        const errorPageContentTitleIndex: Index_Runner_Default_AllContentLoaded_ErrorPageContentTitleIndex = Math.floor(Math.random() * errorPageContentTitleCount);
        const creditPhraseIndex: Index_Runner_Default_AllContentLoaded_CreditPhraseIndex = Math.floor(Math.random() * creditPhraseCount);

        actions.setGlobalData({
          blogAuthors,
          blogPosts,
          docDescriptions,
          navbarVariant: resolvedPreset['navbar'],
          footerVariant: resolvedPreset['footer'],
          presetCta: resolvedPreset['cta'],
          presetLogo: {
            title: resolvedPreset['logo']['title'],
            alt: resolvedPreset['logo']['alt'],
            src: presetLogoDataUri,
          },
          notFoundBundleIndex,
          errorPageContentTitleIndex,
          creditPhraseIndex,
        });

        return;
      },
    };
  }
}

export { getSwizzleConfig } from './get-swizzle-config.js';
export { validateOptions, validateThemeConfig } from './options.js';

export default Runner['default'];
