import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import { dirname, resolve } from 'path';

import { readDefaultCodeTranslationMessages } from '@docusaurus/theme-translations';

import { CssGenerator } from './lib/css-generator.js';
import { LIB_REGEX_CHARACTER_SPACE } from './lib/regex.js';
import { buildSearchIndex } from './lib/search/indexer.js';
import { resolvePreset } from './options.js';
import { announcementBarInit } from './scripts/announcement-bar-init.js';
import { colorModeInit } from './scripts/color-mode-init.js';
import { dataAttributeQuery } from './scripts/data-attribute-query.js';

import type {
  IndexDocusaurusThemeNovaBuildGoogleFontsUrlBodyFamily,
  IndexDocusaurusThemeNovaBuildGoogleFontsUrlCodeFamily,
  IndexDocusaurusThemeNovaBuildGoogleFontsUrlDisplayFamily,
  IndexDocusaurusThemeNovaBuildGoogleFontsUrlFamilies,
  IndexDocusaurusThemeNovaBuildGoogleFontsUrlPreset,
  IndexDocusaurusThemeNovaBuildGoogleFontsUrlQuery,
  IndexDocusaurusThemeNovaBuildGoogleFontsUrlReturns,
  IndexDocusaurusThemeNovaBuildGoogleFontsUrlSpacePattern,
  IndexDocusaurusThemeNovaDefaultActiveFooterPrefix,
  IndexDocusaurusThemeNovaDefaultActiveNavbarPrefix,
  IndexDocusaurusThemeNovaDefaultAnnouncementBar,
  IndexDocusaurusThemeNovaDefaultConfigurePostCssPostCssOptions,
  IndexDocusaurusThemeNovaDefaultConfigurePostCssRtlPlugin,
  IndexDocusaurusThemeNovaDefaultConfigureWebpackAssetsDirectory,
  IndexDocusaurusThemeNovaDefaultContentLoadedActions,
  IndexDocusaurusThemeNovaDefaultContentLoadedArgs,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthor,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorImageUrl,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorKey,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorName,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorPage,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorPermalink,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthors,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogDataDirectory,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogDataFileContent,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogDataFileParsed,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogDataFilePath,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogDataFiles,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogDateValue,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogDescriptionValue,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogFileAuthor,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogFileAuthors,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogHasDate,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogHasDescription,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogHasPermalink,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogHasTitle,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogIsNotEmpty,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogPermalinkValue,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogPost,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogPosts,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogSeenAuthorKeys,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogSeenPostPermalinks,
  IndexDocusaurusThemeNovaDefaultContentLoadedBlogTitleValue,
  IndexDocusaurusThemeNovaDefaultContentLoadedDescriptionValue,
  IndexDocusaurusThemeNovaDefaultContentLoadedDocDescriptions,
  IndexDocusaurusThemeNovaDefaultContentLoadedDocsDataDirectory,
  IndexDocusaurusThemeNovaDefaultContentLoadedDocsDataFileContent,
  IndexDocusaurusThemeNovaDefaultContentLoadedDocsDataFileParsed,
  IndexDocusaurusThemeNovaDefaultContentLoadedDocsDataFilePath,
  IndexDocusaurusThemeNovaDefaultContentLoadedDocsDataFiles,
  IndexDocusaurusThemeNovaDefaultContentLoadedHasDescription,
  IndexDocusaurusThemeNovaDefaultContentLoadedHasPermalink,
  IndexDocusaurusThemeNovaDefaultContentLoadedIsJsonFile,
  IndexDocusaurusThemeNovaDefaultContentLoadedIsNotEmpty,
  IndexDocusaurusThemeNovaDefaultContentLoadedPermalinkValue,
  IndexDocusaurusThemeNovaDefaultContext,
  IndexDocusaurusThemeNovaDefaultCssAccessibilityPath,
  IndexDocusaurusThemeNovaDefaultCssComponentFileName,
  IndexDocusaurusThemeNovaDefaultCssComponentFiles,
  IndexDocusaurusThemeNovaDefaultCssComponentsDirectory,
  IndexDocusaurusThemeNovaDefaultCssGridPath,
  IndexDocusaurusThemeNovaDefaultCssPresetComponentFileName,
  IndexDocusaurusThemeNovaDefaultCssPresetComponentFiles,
  IndexDocusaurusThemeNovaDefaultCssPresetComponentsDirectory,
  IndexDocusaurusThemeNovaDefaultCssPresetDirectory,
  IndexDocusaurusThemeNovaDefaultCssPresetPath,
  IndexDocusaurusThemeNovaDefaultCssPresetThemeDirectory,
  IndexDocusaurusThemeNovaDefaultCssPresetThemeFileName,
  IndexDocusaurusThemeNovaDefaultCssPresetThemeFileNameString,
  IndexDocusaurusThemeNovaDefaultCssPresetThemeFiles,
  IndexDocusaurusThemeNovaDefaultCssResetPath,
  IndexDocusaurusThemeNovaDefaultCssThemeDirectory,
  IndexDocusaurusThemeNovaDefaultCssThemeFileName,
  IndexDocusaurusThemeNovaDefaultCssThemeFiles,
  IndexDocusaurusThemeNovaDefaultCssUtilitiesPath,
  IndexDocusaurusThemeNovaDefaultCurrentDirectory,
  IndexDocusaurusThemeNovaDefaultCurrentLocale,
  IndexDocusaurusThemeNovaDefaultGeneratedCss,
  IndexDocusaurusThemeNovaDefaultGeneratedCssDirectory,
  IndexDocusaurusThemeNovaDefaultGeneratedCssPath,
  IndexDocusaurusThemeNovaDefaultGetClientModulesClientModules,
  IndexDocusaurusThemeNovaDefaultGetClientModulesNprogressCssPath,
  IndexDocusaurusThemeNovaDefaultGoogleFontsUrl,
  IndexDocusaurusThemeNovaDefaultI18nConfig,
  IndexDocusaurusThemeNovaDefaultInjectHtmlTagsAnnouncementBarInit,
  IndexDocusaurusThemeNovaDefaultInjectHtmlTagsColorModeInit,
  IndexDocusaurusThemeNovaDefaultInjectHtmlTagsHeadTags,
  IndexDocusaurusThemeNovaDefaultInjectHtmlTagsPreBodyScriptEntries,
  IndexDocusaurusThemeNovaDefaultInjectHtmlTagsPreBodyTags,
  IndexDocusaurusThemeNovaDefaultInjectHtmlTagsPresetVariantInit,
  IndexDocusaurusThemeNovaDefaultIsRtl,
  IndexDocusaurusThemeNovaDefaultLocaleConfig,
  IndexDocusaurusThemeNovaDefaultLocaleConfigs,
  IndexDocusaurusThemeNovaDefaultLocaleDirection,
  IndexDocusaurusThemeNovaDefaultNprogressCssPath,
  IndexDocusaurusThemeNovaDefaultOptions,
  IndexDocusaurusThemeNovaDefaultPostBuildArgs,
  IndexDocusaurusThemeNovaDefaultPostBuildSearchConfigCast,
  IndexDocusaurusThemeNovaDefaultPresetLogoContent,
  IndexDocusaurusThemeNovaDefaultPresetLogoDataUri,
  IndexDocusaurusThemeNovaDefaultPresetLogoPath,
  IndexDocusaurusThemeNovaDefaultPresetLogoSrc,
  IndexDocusaurusThemeNovaDefaultPresetName,
  IndexDocusaurusThemeNovaDefaultProgressBarConfig,
  IndexDocusaurusThemeNovaDefaultResolvedPreset,
  IndexDocusaurusThemeNovaDefaultReturns,
  IndexDocusaurusThemeNovaDefaultSearchConfig,
  IndexDocusaurusThemeNovaDefaultSiteConfig,
  IndexDocusaurusThemeNovaDefaultSiteDirectory,
  IndexDocusaurusThemeNovaDefaultSiteStorage,
  IndexDocusaurusThemeNovaDefaultStickyLayoutPath,
  IndexDocusaurusThemeNovaDefaultThemeConfig,
  IndexDocusaurusThemeNovaDefaultThemePath,
  IndexDocusaurusThemeNovaDefaultTranslateThemeConfigParams,
  IndexDocusaurusThemeNovaDefaultTypeScriptThemePath,
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
export class DocusaurusThemeNova {
  /**
   * Index - Docusaurus Theme Nova - Default.
   *
   * Docusaurus plugin factory function that resolves the preset, generates
   * CSS from the resolved configuration, and returns the plugin object with
   * theme, translation, PostCSS, and asset hooks.
   *
   * @param {IndexDocusaurusThemeNovaDefaultContext} context - Context.
   * @param {IndexDocusaurusThemeNovaDefaultOptions} options - Options.
   *
   * @returns {IndexDocusaurusThemeNovaDefaultReturns}
   *
   * @since 0.15.0
   */
  public static default(context: IndexDocusaurusThemeNovaDefaultContext, options: IndexDocusaurusThemeNovaDefaultOptions): IndexDocusaurusThemeNovaDefaultReturns {
    const resolvedPreset: IndexDocusaurusThemeNovaDefaultResolvedPreset = resolvePreset(options);

    const generatedCss: IndexDocusaurusThemeNovaDefaultGeneratedCss = CssGenerator.generate({
      preset: resolvedPreset,
    });

    // Write generated CSS to a static file so webpack can bundle and cache it.
    const siteDirectory: IndexDocusaurusThemeNovaDefaultSiteDirectory = context['siteDir'];
    const generatedCssDirectory: IndexDocusaurusThemeNovaDefaultGeneratedCssDirectory = resolve(siteDirectory, '.docusaurus/docusaurus-theme-nova');
    const generatedCssPath: IndexDocusaurusThemeNovaDefaultGeneratedCssPath = resolve(generatedCssDirectory, 'nova-generated.css');

    mkdirSync(generatedCssDirectory, { recursive: true });

    writeFileSync(generatedCssPath, generatedCss, 'utf-8');

    const googleFontsUrl: IndexDocusaurusThemeNovaDefaultGoogleFontsUrl = DocusaurusThemeNova.buildGoogleFontsUrl(resolvedPreset);

    const presetName: IndexDocusaurusThemeNovaDefaultPresetName = options['preset'];
    const currentDirectory: IndexDocusaurusThemeNovaDefaultCurrentDirectory = dirname(__filename);

    // Resolve preset logo to a data URI so it works as an <img src> at runtime.
    const presetLogoSrc: IndexDocusaurusThemeNovaDefaultPresetLogoSrc = resolvedPreset['logo']['src'];
    const assetsDirectory: IndexDocusaurusThemeNovaDefaultConfigureWebpackAssetsDirectory = resolve(currentDirectory, '../../assets');
    const presetLogoPath: IndexDocusaurusThemeNovaDefaultPresetLogoPath = resolve(assetsDirectory, presetLogoSrc.replace('@nova-assets/', ''));
    const presetLogoContent: IndexDocusaurusThemeNovaDefaultPresetLogoContent = readFileSync(presetLogoPath, 'utf-8');
    const presetLogoDataUri: IndexDocusaurusThemeNovaDefaultPresetLogoDataUri = `data:image/svg+xml;base64,${Buffer.from(presetLogoContent).toString('base64')}`;

    const themePath: IndexDocusaurusThemeNovaDefaultThemePath = `${currentDirectory}/theme`;
    const typeScriptThemePath: IndexDocusaurusThemeNovaDefaultTypeScriptThemePath = resolve(currentDirectory, '../src/theme');

    // Global CSS files.
    const cssResetPath: IndexDocusaurusThemeNovaDefaultCssResetPath = resolve(currentDirectory, 'styles/reset.css');
    const cssGridPath: IndexDocusaurusThemeNovaDefaultCssGridPath = resolve(currentDirectory, 'styles/grid.css');
    const cssAccessibilityPath: IndexDocusaurusThemeNovaDefaultCssAccessibilityPath = resolve(currentDirectory, 'styles/accessibility.css');
    const cssUtilitiesPath: IndexDocusaurusThemeNovaDefaultCssUtilitiesPath = resolve(currentDirectory, 'styles/utilities.css');

    // Shared component and theme CSS files.
    const cssComponentsDirectory: IndexDocusaurusThemeNovaDefaultCssComponentsDirectory = resolve(currentDirectory, 'styles/components');
    const cssComponentFiles: IndexDocusaurusThemeNovaDefaultCssComponentFiles = readdirSync(cssComponentsDirectory, { recursive: true }).filter((fileName: IndexDocusaurusThemeNovaDefaultCssComponentFileName) => String(fileName).endsWith('style.css')).sort().map((fileName: IndexDocusaurusThemeNovaDefaultCssComponentFileName) => resolve(cssComponentsDirectory, String(fileName)));
    const cssThemeDirectory: IndexDocusaurusThemeNovaDefaultCssThemeDirectory = resolve(currentDirectory, 'styles/theme');
    const cssThemeFiles: IndexDocusaurusThemeNovaDefaultCssThemeFiles = readdirSync(cssThemeDirectory, { recursive: true }).filter((fileName: IndexDocusaurusThemeNovaDefaultCssThemeFileName) => String(fileName).endsWith('style.css')).sort().map((fileName: IndexDocusaurusThemeNovaDefaultCssThemeFileName) => resolve(cssThemeDirectory, String(fileName)));

    // Preset CSS files.
    const cssPresetDirectory: IndexDocusaurusThemeNovaDefaultCssPresetDirectory = resolve(currentDirectory, `styles/presets/${presetName}`);
    const cssPresetPath: IndexDocusaurusThemeNovaDefaultCssPresetPath = resolve(cssPresetDirectory, 'preset.css');
    const cssPresetComponentsDirectory: IndexDocusaurusThemeNovaDefaultCssPresetComponentsDirectory = resolve(cssPresetDirectory, 'components');
    const cssPresetComponentFiles: IndexDocusaurusThemeNovaDefaultCssPresetComponentFiles = readdirSync(cssPresetComponentsDirectory, { recursive: true }).filter((fileName: IndexDocusaurusThemeNovaDefaultCssPresetComponentFileName) => String(fileName).endsWith('style.css')).sort().map((fileName: IndexDocusaurusThemeNovaDefaultCssPresetComponentFileName) => resolve(cssPresetComponentsDirectory, String(fileName)));
    const cssPresetThemeDirectory: IndexDocusaurusThemeNovaDefaultCssPresetThemeDirectory = resolve(cssPresetDirectory, 'theme');
    const activeNavbarPrefix: IndexDocusaurusThemeNovaDefaultActiveNavbarPrefix = `Navbar/${resolvedPreset['navbar'].charAt(0).toUpperCase()}${resolvedPreset['navbar'].slice(1)}/`;
    const activeFooterPrefix: IndexDocusaurusThemeNovaDefaultActiveFooterPrefix = `Footer/${resolvedPreset['footer'].charAt(0).toUpperCase()}${resolvedPreset['footer'].slice(1)}/`;
    const cssPresetThemeFiles: IndexDocusaurusThemeNovaDefaultCssPresetThemeFiles = readdirSync(cssPresetThemeDirectory, { recursive: true }).filter(
      (fileName: IndexDocusaurusThemeNovaDefaultCssPresetThemeFileName) => {
        const name: IndexDocusaurusThemeNovaDefaultCssPresetThemeFileNameString = String(fileName);

        if (name.endsWith('style.css') === false) {
          return false;
        }

        if (name.startsWith('Navbar/') === true) {
          return name.startsWith(activeNavbarPrefix);
        }

        if (name.startsWith('Footer/') === true) {
          return name.startsWith(activeFooterPrefix);
        }

        return true;
      },
    ).sort().map((fileName: IndexDocusaurusThemeNovaDefaultCssPresetThemeFileName) => resolve(cssPresetThemeDirectory, String(fileName)));

    const i18nConfig: IndexDocusaurusThemeNovaDefaultI18nConfig = context['i18n'] as IndexDocusaurusThemeNovaDefaultI18nConfig;
    const currentLocale: IndexDocusaurusThemeNovaDefaultCurrentLocale = i18nConfig['currentLocale'];
    const localeConfigs: IndexDocusaurusThemeNovaDefaultLocaleConfigs = i18nConfig['localeConfigs'];
    const localeConfig: IndexDocusaurusThemeNovaDefaultLocaleConfig = localeConfigs[currentLocale] as IndexDocusaurusThemeNovaDefaultLocaleConfig;
    const localeDirection: IndexDocusaurusThemeNovaDefaultLocaleDirection = localeConfig['direction'];
    const isRtl: IndexDocusaurusThemeNovaDefaultIsRtl = localeDirection === 'rtl';
    const siteStorage: IndexDocusaurusThemeNovaDefaultSiteStorage = context['siteStorage'] as IndexDocusaurusThemeNovaDefaultSiteStorage;
    const siteConfig: IndexDocusaurusThemeNovaDefaultSiteConfig = context['siteConfig'] as IndexDocusaurusThemeNovaDefaultSiteConfig;
    const themeConfig: IndexDocusaurusThemeNovaDefaultThemeConfig = siteConfig['themeConfig'] as IndexDocusaurusThemeNovaDefaultThemeConfig;
    const announcementBar: IndexDocusaurusThemeNovaDefaultAnnouncementBar = themeConfig['announcementBar'] as IndexDocusaurusThemeNovaDefaultAnnouncementBar;

    const progressBarConfig: IndexDocusaurusThemeNovaDefaultProgressBarConfig = options['progressBar'];
    const nprogressCssPath: IndexDocusaurusThemeNovaDefaultNprogressCssPath = require.resolve('nprogress/nprogress.css');
    const searchConfig: IndexDocusaurusThemeNovaDefaultSearchConfig = options['search'] as IndexDocusaurusThemeNovaDefaultSearchConfig;

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
       * Index - Docusaurus Theme Nova - Default - Get Client Modules.
       *
       * Returns the list of CSS asset paths that Docusaurus injects as client
       * modules including global resets, shared component and theme styles, preset
       * identity and overrides, and optionally the NProgress progress bar stylesheet.
       *
       * @returns {string[]}
       *
       * @since 0.15.0
       */
      getClientModules() {
        const stickyLayoutPath: IndexDocusaurusThemeNovaDefaultStickyLayoutPath = resolve(currentDirectory, 'lib/sticky-layout.js');

        const clientModules: IndexDocusaurusThemeNovaDefaultGetClientModulesClientModules = [
          cssResetPath,
          cssGridPath,
          cssAccessibilityPath,
          cssUtilitiesPath,
          generatedCssPath,
          ...cssComponentFiles,
          ...cssThemeFiles,
          cssPresetPath,
          ...cssPresetComponentFiles,
          ...cssPresetThemeFiles,
          stickyLayoutPath,
        ];

        if (progressBarConfig !== false) {
          const nprogressCssModule: IndexDocusaurusThemeNovaDefaultGetClientModulesNprogressCssPath = resolve(nprogressCssPath);

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
       * @returns {{ headTags: IndexDocusaurusThemeNovaDefaultInjectHtmlTagsHeadTags, preBodyTags: IndexDocusaurusThemeNovaDefaultInjectHtmlTagsPreBodyTags }}
       *
       * @since 0.15.0
       */
      injectHtmlTags() {
        const headTags: IndexDocusaurusThemeNovaDefaultInjectHtmlTagsHeadTags = [
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

        const colorModeScript: IndexDocusaurusThemeNovaDefaultInjectHtmlTagsColorModeInit = colorModeInit({
          siteStorage,
          themeConfig,
        });

        const preBodyScriptEntries: IndexDocusaurusThemeNovaDefaultInjectHtmlTagsPreBodyScriptEntries = [
          {
            tagName: 'script',
            innerHTML: colorModeScript,
          },
          {
            tagName: 'script',
            innerHTML: dataAttributeQuery,
          },
        ];

        const presetVariantInit: IndexDocusaurusThemeNovaDefaultInjectHtmlTagsPresetVariantInit = [
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
          const announcementBarScript: IndexDocusaurusThemeNovaDefaultInjectHtmlTagsAnnouncementBarInit = announcementBarInit({
            siteStorage,
          });

          preBodyScriptEntries.push({
            tagName: 'script',
            innerHTML: announcementBarScript,
          });
        }

        const preBodyTags: IndexDocusaurusThemeNovaDefaultInjectHtmlTagsPreBodyTags = preBodyScriptEntries;

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
       * @param {IndexDocusaurusThemeNovaDefaultConfigurePostCssPostCssOptions} postCssOptions - Post css options.
       *
       * @returns {IndexDocusaurusThemeNovaDefaultConfigurePostCssPostCssOptions}
       *
       * @since 0.15.0
       */
      configurePostCss(postCssOptions: IndexDocusaurusThemeNovaDefaultConfigurePostCssPostCssOptions) {
        if (isRtl === true) {
          const rtlPlugin: IndexDocusaurusThemeNovaDefaultConfigurePostCssRtlPlugin = require('rtlcss');

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
       * Returns an empty array as a placeholder for future locale-specific
       * translation file support.
       *
       * @returns {never[]}
       *
       * @since 0.15.0
       */
      getTranslationFiles() {
        return [];
      },

      /**
       * Index - Docusaurus Theme Nova - Default - Get Default Code Translation Messages.
       *
       * Loads the default code translation messages for the current locale
       * from the Docusaurus theme-common translation bundle.
       *
       * @returns {Promise<Record<string, string>>}
       *
       * @since 0.15.0
       */
      getDefaultCodeTranslationMessages() {
        return readDefaultCodeTranslationMessages({
          locale: currentLocale,
          name: 'theme-common',
        });
      },

      /**
       * Index - Docusaurus Theme Nova - Default - Translate Theme Config.
       *
       * Returns the theme configuration unchanged as a placeholder for future
       * locale-specific theme configuration translation support.
       *
       * @param {IndexDocusaurusThemeNovaDefaultTranslateThemeConfigParams} params - Params.
       *
       * @returns {Record<string, unknown>}
       *
       * @since 0.15.0
       */
      translateThemeConfig(params: IndexDocusaurusThemeNovaDefaultTranslateThemeConfigParams) {
        return params['themeConfig'];
      },

      /**
       * Index - Docusaurus Theme Nova - Default - Post Build.
       *
       * Invokes the search index builder when search is enabled, writing
       * the serialized lunr index, document manifest, and worker script
       * to the build output directory.
       *
       * @param {IndexDocusaurusThemeNovaDefaultPostBuildArgs} postBuildArgs - Post build args.
       *
       * @returns {Promise<void>}
       *
       * @since 0.15.0
       */
      async postBuild(postBuildArgs: IndexDocusaurusThemeNovaDefaultPostBuildArgs) {
        if (searchConfig !== undefined && searchConfig !== false) {
          buildSearchIndex({
            outDir: postBuildArgs['outDir'],
            routesPaths: postBuildArgs['routesPaths'],
            baseUrl: postBuildArgs['siteConfig']['baseUrl'],
            searchConfig: searchConfig as IndexDocusaurusThemeNovaDefaultPostBuildSearchConfigCast,
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
       * @param {IndexDocusaurusThemeNovaDefaultContentLoadedArgs} contentLoadedArgs - Content loaded args.
       *
       * @returns {Promise<void>}
       *
       * @since 0.15.0
       */
      async contentLoaded(contentLoadedArgs: IndexDocusaurusThemeNovaDefaultContentLoadedArgs) {
        const actions: IndexDocusaurusThemeNovaDefaultContentLoadedActions = contentLoadedArgs['actions'];

        if (searchConfig !== undefined && searchConfig !== false) {
          actions.addRoute({
            path: '/search',
            component: '@theme/SearchPage',
            exact: true,
          });
        }

        // Build a permalink-to-description map by reading generated doc JSON
        // files from the docs plugin. The docs plugin's contentLoaded runs before
        // the theme's, so these files are already written to .docusaurus.
        const docDescriptions: IndexDocusaurusThemeNovaDefaultContentLoadedDocDescriptions = {};
        const docsDataDirectory: IndexDocusaurusThemeNovaDefaultContentLoadedDocsDataDirectory = resolve(siteDirectory, '.docusaurus/docusaurus-plugin-content-docs/default');

        if (existsSync(docsDataDirectory) === true) {
          const docsDataFiles: IndexDocusaurusThemeNovaDefaultContentLoadedDocsDataFiles = readdirSync(docsDataDirectory);

          for (const docsDataFile of docsDataFiles) {
            const isJsonFile: IndexDocusaurusThemeNovaDefaultContentLoadedIsJsonFile = docsDataFile.startsWith('site-') && docsDataFile.endsWith('.json');

            if (isJsonFile === false) {
              continue;
            }

            const docsDataFilePath: IndexDocusaurusThemeNovaDefaultContentLoadedDocsDataFilePath = resolve(docsDataDirectory, docsDataFile);
            const docsDataFileContent: IndexDocusaurusThemeNovaDefaultContentLoadedDocsDataFileContent = readFileSync(docsDataFilePath, 'utf-8');

            if (docsDataFileContent === '') {
              continue;
            }

            const docsDataFileParsed: IndexDocusaurusThemeNovaDefaultContentLoadedDocsDataFileParsed = JSON.parse(docsDataFileContent) as IndexDocusaurusThemeNovaDefaultContentLoadedDocsDataFileParsed;
            const hasPermalink: IndexDocusaurusThemeNovaDefaultContentLoadedHasPermalink = docsDataFileParsed['permalink'] !== undefined;
            const hasDescription: IndexDocusaurusThemeNovaDefaultContentLoadedHasDescription = docsDataFileParsed['description'] !== undefined;
            const isNotEmpty: IndexDocusaurusThemeNovaDefaultContentLoadedIsNotEmpty = docsDataFileParsed['description'] !== '';

            if (
              hasPermalink === true
              && hasDescription === true
              && isNotEmpty === true
            ) {
              const permalinkValue: IndexDocusaurusThemeNovaDefaultContentLoadedPermalinkValue = docsDataFileParsed['permalink'] as IndexDocusaurusThemeNovaDefaultContentLoadedPermalinkValue;
              const descriptionValue: IndexDocusaurusThemeNovaDefaultContentLoadedDescriptionValue = docsDataFileParsed['description'] as IndexDocusaurusThemeNovaDefaultContentLoadedDescriptionValue;

              Reflect.set(docDescriptions, permalinkValue, descriptionValue);
            }
          }
        }

        // Build a blog posts array and unique authors list
        // by reading generated blog JSON files from the blog plugin.
        const blogPosts: IndexDocusaurusThemeNovaDefaultContentLoadedBlogPosts = [];
        const blogSeenPostPermalinks: IndexDocusaurusThemeNovaDefaultContentLoadedBlogSeenPostPermalinks = new Set();
        const blogAuthors: IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthors = [];
        const blogDataDirectory: IndexDocusaurusThemeNovaDefaultContentLoadedBlogDataDirectory = resolve(siteDirectory, '.docusaurus/docusaurus-plugin-content-blog/default');
        const blogSeenAuthorKeys: IndexDocusaurusThemeNovaDefaultContentLoadedBlogSeenAuthorKeys = new Set();

        if (existsSync(blogDataDirectory) === true) {
          const blogDataFiles: IndexDocusaurusThemeNovaDefaultContentLoadedBlogDataFiles = readdirSync(blogDataDirectory) as IndexDocusaurusThemeNovaDefaultContentLoadedBlogDataFiles;

          for (const blogDataFile of blogDataFiles) {
            if (blogDataFile.startsWith('site-') === false || blogDataFile.endsWith('.json') === false) {
              continue;
            }

            const blogDataFilePath: IndexDocusaurusThemeNovaDefaultContentLoadedBlogDataFilePath = resolve(blogDataDirectory, blogDataFile);
            const blogDataFileContent: IndexDocusaurusThemeNovaDefaultContentLoadedBlogDataFileContent = readFileSync(blogDataFilePath, 'utf-8');

            if (blogDataFileContent === '') {
              continue;
            }

            const blogDataFileParsed: IndexDocusaurusThemeNovaDefaultContentLoadedBlogDataFileParsed = JSON.parse(blogDataFileContent) as IndexDocusaurusThemeNovaDefaultContentLoadedBlogDataFileParsed;
            const blogHasPermalink: IndexDocusaurusThemeNovaDefaultContentLoadedBlogHasPermalink = blogDataFileParsed['permalink'] !== undefined;
            const blogHasDescription: IndexDocusaurusThemeNovaDefaultContentLoadedBlogHasDescription = blogDataFileParsed['description'] !== undefined;
            const blogIsNotEmpty: IndexDocusaurusThemeNovaDefaultContentLoadedBlogIsNotEmpty = blogDataFileParsed['description'] !== '';
            const blogHasTitle: IndexDocusaurusThemeNovaDefaultContentLoadedBlogHasTitle = blogDataFileParsed['title'] !== undefined;
            const blogHasDate: IndexDocusaurusThemeNovaDefaultContentLoadedBlogHasDate = blogDataFileParsed['date'] !== undefined;

            if (
              blogHasPermalink === true
              && blogHasDescription === true
              && blogIsNotEmpty === true
              && blogHasTitle === true
              && blogHasDate === true
            ) {
              const blogTitleValue: IndexDocusaurusThemeNovaDefaultContentLoadedBlogTitleValue = blogDataFileParsed['title'] as IndexDocusaurusThemeNovaDefaultContentLoadedBlogTitleValue;
              const blogPermalinkValue: IndexDocusaurusThemeNovaDefaultContentLoadedBlogPermalinkValue = blogDataFileParsed['permalink'] as IndexDocusaurusThemeNovaDefaultContentLoadedBlogPermalinkValue;
              const blogDescriptionValue: IndexDocusaurusThemeNovaDefaultContentLoadedBlogDescriptionValue = blogDataFileParsed['description'] as IndexDocusaurusThemeNovaDefaultContentLoadedBlogDescriptionValue;
              const blogDateValue: IndexDocusaurusThemeNovaDefaultContentLoadedBlogDateValue = blogDataFileParsed['date'] as IndexDocusaurusThemeNovaDefaultContentLoadedBlogDateValue;

              if (blogSeenPostPermalinks.has(blogPermalinkValue) === false) {
                blogSeenPostPermalinks.add(blogPermalinkValue);

                const blogPost: IndexDocusaurusThemeNovaDefaultContentLoadedBlogPost = {
                  title: blogTitleValue,
                  description: blogDescriptionValue,
                  permalink: blogPermalinkValue,
                  date: blogDateValue,
                };

                blogPosts.push(blogPost);
              }
            }

            const blogFileAuthors: IndexDocusaurusThemeNovaDefaultContentLoadedBlogFileAuthors = (blogDataFileParsed['authors'] ?? []) as IndexDocusaurusThemeNovaDefaultContentLoadedBlogFileAuthors;

            for (const blogFileAuthor of blogFileAuthors) {
              const authorRaw: IndexDocusaurusThemeNovaDefaultContentLoadedBlogFileAuthor = blogFileAuthor;
              const authorKey: IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorKey = authorRaw['key'] as IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorKey;

              if (authorKey === undefined || blogSeenAuthorKeys.has(authorKey) === true) {
                continue;
              }

              blogSeenAuthorKeys.add(authorKey);

              const authorName: IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorName = authorRaw['name'] as IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorName;
              const authorImageUrl: IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorImageUrl = authorRaw['imageURL'] as IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorImageUrl;
              const authorPage: IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorPage = authorRaw['page'] as IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorPage;
              const authorPermalink: IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorPermalink = (authorPage !== undefined && authorPage !== null) ? authorPage['permalink'] as IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthorPermalink : undefined;

              const blogAuthor: IndexDocusaurusThemeNovaDefaultContentLoadedBlogAuthor = {
                imageURL: authorImageUrl,
                key: authorKey,
                name: authorName,
                permalink: authorPermalink,
              };

              blogAuthors.push(blogAuthor);
            }
          }
        }

        actions.setGlobalData({
          blogAuthors,
          blogPosts,
          docDescriptions,
          navbarVariant: resolvedPreset['navbar'],
          footerVariant: resolvedPreset['footer'],
          presetLogo: {
            title: resolvedPreset['logo']['title'],
            alt: resolvedPreset['logo']['alt'],
            src: presetLogoDataUri,
          },
        });

        return;
      },
    };
  }

  /**
   * Index - Docusaurus Theme Nova - Build Google Fonts URL.
   *
   * Constructs a Google Fonts CSS API URL from the resolved preset
   * font families with appropriate weight ranges for display, body,
   * and code typefaces.
   *
   * @param {IndexDocusaurusThemeNovaBuildGoogleFontsUrlPreset} preset - Preset.
   *
   * @private
   *
   * @returns {IndexDocusaurusThemeNovaBuildGoogleFontsUrlReturns}
   *
   * @since 0.15.0
   */
  private static buildGoogleFontsUrl(preset: IndexDocusaurusThemeNovaBuildGoogleFontsUrlPreset): IndexDocusaurusThemeNovaBuildGoogleFontsUrlReturns {
    const spacePattern: IndexDocusaurusThemeNovaBuildGoogleFontsUrlSpacePattern = new RegExp(LIB_REGEX_CHARACTER_SPACE, 'g');

    const displayFamily: IndexDocusaurusThemeNovaBuildGoogleFontsUrlDisplayFamily = `family=${preset['fonts']['display'].replace(spacePattern, '+')}:wght@400;600;700`;
    const bodyFamily: IndexDocusaurusThemeNovaBuildGoogleFontsUrlBodyFamily = `family=${preset['fonts']['body'].replace(spacePattern, '+')}:wght@400;500;700`;
    const codeFamily: IndexDocusaurusThemeNovaBuildGoogleFontsUrlCodeFamily = `family=${preset['fonts']['code'].replace(spacePattern, '+')}:wght@400;500`;

    const families: IndexDocusaurusThemeNovaBuildGoogleFontsUrlFamilies = [
      displayFamily,
      bodyFamily,
      codeFamily,
    ];

    const query: IndexDocusaurusThemeNovaBuildGoogleFontsUrlQuery = families.join('&');

    return `https://fonts.googleapis.com/css2?${query}&display=block`;
  }
}

export { getSwizzleConfig } from './get-swizzle-config.js';
export { validateOptions, validateThemeConfig } from './options.js';

export default DocusaurusThemeNova['default'];
