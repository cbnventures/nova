import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { validateOptions, validateThemeConfig } from '../options.js';

import type {
  Tests_ConfigDrift_Analytics,
  Tests_ConfigDrift_AnalyticsGtmContainerId,
  Tests_ConfigDrift_JoiSchema,
  Tests_ConfigDrift_JoiSchemaValidateResult,
  Tests_ConfigDrift_Overrides,
  Tests_ConfigDrift_OverridesColorsPrimary,
  Tests_ConfigDrift_OverridesColorsSecondary,
  Tests_ConfigDrift_OverridesFontsBody,
  Tests_ConfigDrift_OverridesFontsCode,
  Tests_ConfigDrift_OverridesFontsDisplay,
  Tests_ConfigDrift_OverridesFooter,
  Tests_ConfigDrift_OverridesNavbar,
  Tests_ConfigDrift_Plugins,
  Tests_ConfigDrift_PluginsBlog,
  Tests_ConfigDrift_PluginsDocs,
  Tests_ConfigDrift_PluginsPages,
  Tests_ConfigDrift_PluginsSitemap,
  Tests_ConfigDrift_PresetValue,
  Tests_ConfigDrift_ProgressBar,
  Tests_ConfigDrift_Search,
  Tests_ConfigDrift_SearchBarShortcutKeymap,
  Tests_ConfigDrift_SearchDocsRouteBasePath,
  Tests_ConfigDrift_SearchFuzzyMatchingDistance,
  Tests_ConfigDrift_SearchHashed,
  Tests_ConfigDrift_SearchHighlightSearchTermsOnTargetPage,
  Tests_ConfigDrift_SearchIgnorePatterns,
  Tests_ConfigDrift_SearchIndexBlog,
  Tests_ConfigDrift_SearchIndexDocs,
  Tests_ConfigDrift_SearchIndexPages,
  Tests_ConfigDrift_SearchLanguage,
  Tests_ConfigDrift_SearchResultLimits,
  Tests_ConfigDrift_ThemeConfigAnnouncementBar,
  Tests_ConfigDrift_ThemeConfigAnnouncementBarBackgroundColor,
  Tests_ConfigDrift_ThemeConfigAnnouncementBarContent,
  Tests_ConfigDrift_ThemeConfigAnnouncementBarId,
  Tests_ConfigDrift_ThemeConfigAnnouncementBarIsCloseable,
  Tests_ConfigDrift_ThemeConfigAnnouncementBarTextColor,
  Tests_ConfigDrift_ThemeConfigBlog,
  Tests_ConfigDrift_ThemeConfigBlogLayout,
  Tests_ConfigDrift_ThemeConfigBlogLayoutDescription,
  Tests_ConfigDrift_ThemeConfigBlogLayoutHeading,
  Tests_ConfigDrift_ThemeConfigBlogShare,
  Tests_ConfigDrift_ThemeConfigBlogSharePlatforms,
  Tests_ConfigDrift_ThemeConfigBlogSidebar,
  Tests_ConfigDrift_ThemeConfigBlogSidebarGroupByYear,
  Tests_ConfigDrift_ThemeConfigColorMode,
  Tests_ConfigDrift_ThemeConfigColorModeDefaultMode,
  Tests_ConfigDrift_ThemeConfigColorModeDisableSwitch,
  Tests_ConfigDrift_ThemeConfigDocs,
  Tests_ConfigDrift_ThemeConfigDocsSidebar,
  Tests_ConfigDrift_ThemeConfigDocsSidebarAutoCollapseCategories,
  Tests_ConfigDrift_ThemeConfigDocsSidebarHideable,
  Tests_ConfigDrift_ThemeConfigDocsVersionPersistence,
  Tests_ConfigDrift_ThemeConfigErrorPages,
  Tests_ConfigDrift_ThemeConfigErrorPagesError,
  Tests_ConfigDrift_ThemeConfigErrorPagesErrorPageContent,
  Tests_ConfigDrift_ThemeConfigErrorPagesErrorPageContentRetryLabel,
  Tests_ConfigDrift_ThemeConfigErrorPagesErrorPageContentTitle,
  Tests_ConfigDrift_ThemeConfigErrorPagesErrorRetryLabel,
  Tests_ConfigDrift_ThemeConfigErrorPagesNotFound,
  Tests_ConfigDrift_ThemeConfigErrorPagesNotFoundBackHomeHref,
  Tests_ConfigDrift_ThemeConfigErrorPagesNotFoundBackHomeLabel,
  Tests_ConfigDrift_ThemeConfigErrorPagesNotFoundDescription,
  Tests_ConfigDrift_ThemeConfigErrorPagesNotFoundTitle,
  Tests_ConfigDrift_ThemeConfigFooter,
  Tests_ConfigDrift_ThemeConfigFooterCta,
  Tests_ConfigDrift_ThemeConfigFooterCtaObject,
  Tests_ConfigDrift_ThemeConfigFooterCtaObject_Href,
  Tests_ConfigDrift_ThemeConfigFooterCtaObject_Label,
  Tests_ConfigDrift_ThemeConfigJoiSchema,
  Tests_ConfigDrift_ThemeConfigJoiSchemaValidateResult,
  Tests_ConfigDrift_ThemeConfigNavbar,
  Tests_ConfigDrift_ThemeConfigNavbarHideOnScroll,
  Tests_ConfigDrift_ThemeConfigNavbarItems,
  Tests_ConfigDrift_ThemeConfigSite,
  Tests_ConfigDrift_ThemeConfigSiteImage,
  Tests_ConfigDrift_ThemeConfigSiteLogo,
  Tests_ConfigDrift_ThemeConfigSiteLogoAlt,
  Tests_ConfigDrift_ThemeConfigSiteLogoHref,
  Tests_ConfigDrift_ThemeConfigSiteLogoSrc,
  Tests_ConfigDrift_ThemeConfigSiteLogoSrcDark,
  Tests_ConfigDrift_ThemeConfigSiteLogoSrcLight,
  Tests_ConfigDrift_ThemeConfigSiteLogoTitle,
  Tests_ConfigDrift_ThemeConfigSiteLogoWordmark,
  Tests_ConfigDrift_ThemeConfigSiteLogoWordmarkDark,
  Tests_ConfigDrift_ThemeConfigSiteLogoWordmarkLight,
  Tests_ConfigDrift_ThemeConfigSiteMetadata,
  Tests_ConfigDrift_ThemeConfigSiteTitle,
  Tests_ConfigDrift_ThemeConfigTableOfContents,
  Tests_ConfigDrift_ThemeConfigTableOfContentsMaxHeadingLevel,
  Tests_ConfigDrift_ThemeConfigTableOfContentsMinHeadingLevel,
  Tests_ConfigDrift_ThemeConfigValidatedResult,
  Tests_ConfigDrift_ValidatedResult,
} from '../types/tests/config-drift.test.d.ts';

/**
 * Tests - Config Drift - ConfigDrift ValidateOptions.
 *
 * Exercises every field in the consumer NovaPresetOptions type by
 * passing a fully-populated object through the Joi schema and
 * asserting that the validated result retains all fields.
 *
 * @since 0.15.0
 */
describe('configDrift validateOptions', async () => {
  it('validates a fully-populated preset options object', () => {
    const result: Tests_ConfigDrift_ValidatedResult = validateOptions({
      validate: (schema, options) => {
        const joiSchema: Tests_ConfigDrift_JoiSchema = schema as Tests_ConfigDrift_JoiSchema;
        const validated: Tests_ConfigDrift_JoiSchemaValidateResult = joiSchema.validate(options);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as Tests_ConfigDrift_ValidatedResult;
      },
      options: {
        preset: 'sentinel',
        overrides: {
          colors: {
            primary: {
              light: '#DC2626', dark: '#DC2626',
            },
            secondary: {
              light: '#FBBF24', dark: '#FBBF24',
            },
            text: {
              light: '#1c1917', dark: '#e7e5e4',
            },
            border: {
              light: '#d6d3d1', dark: '#44403c',
            },
            warning: {
              light: '#f59e0b', dark: '#fbbf24',
            },
            danger: {
              light: '#ef4444', dark: '#f87171',
            },
          },
          fonts: {
            display: 'Plus Jakarta Sans',
            body: 'Inter',
            code: 'JetBrains Mono',
          },
          navbar: 'canopy',
          footer: 'embassy',
        },
        plugins: {
          docs: { routeBasePath: 'docs' },
          blog: { routeBasePath: 'blog' },
          pages: { path: 'src/pages' },
          sitemap: { changefreq: 'weekly' },
        },
        analytics: {
          gtm: {
            containerId: 'GTM-XXXXXX',
          },
        },
        progressBar: {
          color: '#DC2626',
        },
        search: {
          language: [
            'en',
            'fr',
          ],
          indexDocs: true,
          indexBlog: true,
          indexPages: true,
          hashed: true,
          searchResultLimits: 10,
          highlightSearchTermsOnTargetPage: true,
          searchBarShortcutKeymap: 'mod+k',
          fuzzyMatchingDistance: 2,
          ignorePatterns: ['/api/'],
          docsRouteBasePath: 'docs',
        },
      },
    });

    const presetValue: Tests_ConfigDrift_PresetValue = result['preset'];

    strictEqual(presetValue, 'sentinel');

    const overrides: Tests_ConfigDrift_Overrides = result['overrides'];
    const overridesColorsPrimary: Tests_ConfigDrift_OverridesColorsPrimary = overrides['colors']['primary'];
    const overridesColorsSecondary: Tests_ConfigDrift_OverridesColorsSecondary = overrides['colors']['secondary'];

    deepStrictEqual(overridesColorsPrimary, {
      light: '#DC2626', dark: '#DC2626',
    });
    deepStrictEqual(overridesColorsSecondary, {
      light: '#FBBF24', dark: '#FBBF24',
    });

    const overridesFontsDisplay: Tests_ConfigDrift_OverridesFontsDisplay = overrides['fonts']['display'];
    const overridesFontsBody: Tests_ConfigDrift_OverridesFontsBody = overrides['fonts']['body'];
    const overridesFontsCode: Tests_ConfigDrift_OverridesFontsCode = overrides['fonts']['code'];

    strictEqual(overridesFontsDisplay, 'Plus Jakarta Sans');
    strictEqual(overridesFontsBody, 'Inter');
    strictEqual(overridesFontsCode, 'JetBrains Mono');

    const overridesNavbar: Tests_ConfigDrift_OverridesNavbar = overrides['navbar'];
    const overridesFooter: Tests_ConfigDrift_OverridesFooter = overrides['footer'];

    strictEqual(overridesNavbar, 'canopy');
    strictEqual(overridesFooter, 'embassy');

    const plugins: Tests_ConfigDrift_Plugins = result['plugins'];
    const pluginsDocs: Tests_ConfigDrift_PluginsDocs = plugins['docs'];
    const pluginsBlog: Tests_ConfigDrift_PluginsBlog = plugins['blog'];
    const pluginsPages: Tests_ConfigDrift_PluginsPages = plugins['pages'];
    const pluginsSitemap: Tests_ConfigDrift_PluginsSitemap = plugins['sitemap'];

    strictEqual(pluginsDocs !== undefined, true);
    strictEqual(pluginsBlog !== undefined && pluginsBlog !== false, true);
    strictEqual(pluginsPages !== undefined && pluginsPages !== false, true);
    strictEqual(pluginsSitemap !== undefined && pluginsSitemap !== false, true);

    const analytics: Tests_ConfigDrift_Analytics = result['analytics'];
    const analyticsGtmContainerId: Tests_ConfigDrift_AnalyticsGtmContainerId = analytics['gtm']!['containerId'];

    strictEqual(analyticsGtmContainerId, 'GTM-XXXXXX');

    const progressBar: Tests_ConfigDrift_ProgressBar = result['progressBar'];

    strictEqual(typeof progressBar, 'object');

    const search: Tests_ConfigDrift_Search = result['search'];

    strictEqual(search !== false, true);

    if (search !== false) {
      const searchLanguage: Tests_ConfigDrift_SearchLanguage = search['language']!;
      const searchIndexDocs: Tests_ConfigDrift_SearchIndexDocs = search['indexDocs']!;
      const searchIndexBlog: Tests_ConfigDrift_SearchIndexBlog = search['indexBlog']!;
      const searchIndexPages: Tests_ConfigDrift_SearchIndexPages = search['indexPages']!;
      const searchHashed: Tests_ConfigDrift_SearchHashed = search['hashed']!;
      const searchResultLimits: Tests_ConfigDrift_SearchResultLimits = search['searchResultLimits']!;
      const searchHighlight: Tests_ConfigDrift_SearchHighlightSearchTermsOnTargetPage = search['highlightSearchTermsOnTargetPage']!;
      const searchShortcut: Tests_ConfigDrift_SearchBarShortcutKeymap = search['searchBarShortcutKeymap']!;
      const searchFuzzy: Tests_ConfigDrift_SearchFuzzyMatchingDistance = search['fuzzyMatchingDistance']!;
      const searchIgnore: Tests_ConfigDrift_SearchIgnorePatterns = search['ignorePatterns']!;
      const searchDocsRoute: Tests_ConfigDrift_SearchDocsRouteBasePath = search['docsRouteBasePath']!;

      strictEqual(searchLanguage.length, 2);
      strictEqual(searchIndexDocs, true);
      strictEqual(searchIndexBlog, true);
      strictEqual(searchIndexPages, true);
      strictEqual(searchHashed, true);
      strictEqual(searchResultLimits, 10);
      strictEqual(searchHighlight, true);
      strictEqual(searchShortcut, 'mod+k');
      strictEqual(searchFuzzy, 2);
      strictEqual(searchIgnore.length, 1);
      strictEqual(searchDocsRoute, 'docs');
    }

    return;
  });

  return;
});

/**
 * Tests - Config Drift - ConfigDrift ValidateThemeConfig.
 *
 * Exercises every field in the consumer NovaThemeConfig type by
 * passing a fully-populated object through the Joi schema and
 * asserting that the validated result retains all fields.
 *
 * @since 0.15.0
 */
describe('configDrift validateThemeConfig', async () => {
  it('validates a fully-populated theme config object', () => {
    const result: Tests_ConfigDrift_ThemeConfigValidatedResult = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: Tests_ConfigDrift_ThemeConfigJoiSchema = schema as Tests_ConfigDrift_ThemeConfigJoiSchema;
        const validated: Tests_ConfigDrift_ThemeConfigJoiSchemaValidateResult = joiSchema.validate(themeConfig);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as Tests_ConfigDrift_ThemeConfigValidatedResult;
      },
      themeConfig: {
        site: {
          title: 'Nova Docs',
          logo: {
            alt: 'Nova Logo',
            src: {
              light: '/img/logo.svg',
              dark: '/img/logo-dark.svg',
            },
            href: '/',
            wordmark: {
              light: '/img/wordmark.svg',
              dark: '/img/wordmark-dark.svg',
            },
            title: 'Nova',
          },
          image: '/img/social-card.png',
          metadata: [{
            name: 'robots',
            content: 'index,follow',
          }],
        },
        colorMode: {
          defaultMode: 'dark',
          disableSwitch: false,
        },
        navbar: {
          hideOnScroll: true,
          items: [{
            label: 'Docs',
            to: '/docs',
          }],
        },
        docs: {
          versionPersistence: 'localStorage',
          sidebar: {
            hideable: true,
            autoCollapseCategories: true,
          },
        },
        blog: {
          sidebar: {
            groupByYear: false,
          },
          layout: {
            heading: 'Updates',
            description: 'Latest news and releases.',
          },
          share: {
            platforms: [
              'x',
              'linkedin',
              'copy',
            ],
          },
        },
        tableOfContents: {
          minHeadingLevel: 2,
          maxHeadingLevel: 4,
        },
        announcementBar: {
          id: 'announcement-1',
          content: 'New release available!',
          backgroundColor: '#1e293b',
          textColor: '#f8fafc',
          isCloseable: true,
        },
        errorPages: {
          notFound: {
            title: 'Lost in deployment.',
            description: 'This route did not roll out.',
            backHomeLabel: 'Back to projects',
            backHomeHref: '/',
          },
          errorPageContent: {
            title: 'Pipeline interrupted.',
            retryLabel: 'Re-run',
          },
          error: {
            retryLabel: 'Restart',
          },
        },
        footer: {
          cta: {
            label: 'Get Started', href: '/docs/intro',
          },
        },
      },
    });

    const site: Tests_ConfigDrift_ThemeConfigSite = result['site'] as Tests_ConfigDrift_ThemeConfigSite;
    const siteTitle: Tests_ConfigDrift_ThemeConfigSiteTitle = site['title'] as Tests_ConfigDrift_ThemeConfigSiteTitle;
    const siteLogo: Tests_ConfigDrift_ThemeConfigSiteLogo = site['logo'] as Tests_ConfigDrift_ThemeConfigSiteLogo;
    const siteLogoAlt: Tests_ConfigDrift_ThemeConfigSiteLogoAlt = siteLogo['alt'] as Tests_ConfigDrift_ThemeConfigSiteLogoAlt;
    const siteLogoSrc: Tests_ConfigDrift_ThemeConfigSiteLogoSrc = siteLogo['src'] as Tests_ConfigDrift_ThemeConfigSiteLogoSrc;
    const siteLogoSrcLight: Tests_ConfigDrift_ThemeConfigSiteLogoSrcLight = siteLogoSrc['light'] as Tests_ConfigDrift_ThemeConfigSiteLogoSrcLight;
    const siteLogoSrcDark: Tests_ConfigDrift_ThemeConfigSiteLogoSrcDark = siteLogoSrc['dark'] as Tests_ConfigDrift_ThemeConfigSiteLogoSrcDark;
    const siteLogoHref: Tests_ConfigDrift_ThemeConfigSiteLogoHref = siteLogo['href'] as Tests_ConfigDrift_ThemeConfigSiteLogoHref;
    const siteLogoWordmark: Tests_ConfigDrift_ThemeConfigSiteLogoWordmark = siteLogo['wordmark'] as Tests_ConfigDrift_ThemeConfigSiteLogoWordmark;
    const siteLogoWordmarkLight: Tests_ConfigDrift_ThemeConfigSiteLogoWordmarkLight = siteLogoWordmark['light'] as Tests_ConfigDrift_ThemeConfigSiteLogoWordmarkLight;
    const siteLogoWordmarkDark: Tests_ConfigDrift_ThemeConfigSiteLogoWordmarkDark = siteLogoWordmark['dark'] as Tests_ConfigDrift_ThemeConfigSiteLogoWordmarkDark;
    const siteLogoTitle: Tests_ConfigDrift_ThemeConfigSiteLogoTitle = siteLogo['title'] as Tests_ConfigDrift_ThemeConfigSiteLogoTitle;
    const siteImage: Tests_ConfigDrift_ThemeConfigSiteImage = site['image'] as Tests_ConfigDrift_ThemeConfigSiteImage;
    const siteMetadata: Tests_ConfigDrift_ThemeConfigSiteMetadata = site['metadata'] as Tests_ConfigDrift_ThemeConfigSiteMetadata;

    strictEqual(siteTitle, 'Nova Docs');
    strictEqual(siteLogoAlt, 'Nova Logo');
    strictEqual(siteLogoSrcLight, '/img/logo.svg');
    strictEqual(siteLogoSrcDark, '/img/logo-dark.svg');
    strictEqual(siteLogoHref, '/');
    strictEqual(siteLogoWordmarkLight, '/img/wordmark.svg');
    strictEqual(siteLogoWordmarkDark, '/img/wordmark-dark.svg');
    strictEqual(siteLogoTitle, 'Nova');
    strictEqual(siteImage, '/img/social-card.png');
    strictEqual(siteMetadata.length, 1);

    const colorMode: Tests_ConfigDrift_ThemeConfigColorMode = result['colorMode'] as Tests_ConfigDrift_ThemeConfigColorMode;
    const colorModeDefaultMode: Tests_ConfigDrift_ThemeConfigColorModeDefaultMode = colorMode['defaultMode'] as Tests_ConfigDrift_ThemeConfigColorModeDefaultMode;
    const colorModeDisableSwitch: Tests_ConfigDrift_ThemeConfigColorModeDisableSwitch = colorMode['disableSwitch'] as Tests_ConfigDrift_ThemeConfigColorModeDisableSwitch;

    strictEqual(colorModeDefaultMode, 'dark');
    strictEqual(colorModeDisableSwitch, false);

    const navbar: Tests_ConfigDrift_ThemeConfigNavbar = result['navbar'] as Tests_ConfigDrift_ThemeConfigNavbar;
    const navbarHideOnScroll: Tests_ConfigDrift_ThemeConfigNavbarHideOnScroll = navbar['hideOnScroll'] as Tests_ConfigDrift_ThemeConfigNavbarHideOnScroll;
    const navbarItems: Tests_ConfigDrift_ThemeConfigNavbarItems = navbar['items'] as Tests_ConfigDrift_ThemeConfigNavbarItems;

    strictEqual(navbarHideOnScroll, true);
    strictEqual(navbarItems.length, 1);

    const docs: Tests_ConfigDrift_ThemeConfigDocs = result['docs'] as Tests_ConfigDrift_ThemeConfigDocs;
    const docsVersionPersistence: Tests_ConfigDrift_ThemeConfigDocsVersionPersistence = docs['versionPersistence'] as Tests_ConfigDrift_ThemeConfigDocsVersionPersistence;
    const docsSidebar: Tests_ConfigDrift_ThemeConfigDocsSidebar = docs['sidebar'] as Tests_ConfigDrift_ThemeConfigDocsSidebar;
    const docsSidebarHideable: Tests_ConfigDrift_ThemeConfigDocsSidebarHideable = docsSidebar['hideable'] as Tests_ConfigDrift_ThemeConfigDocsSidebarHideable;
    const docsSidebarAutoCollapse: Tests_ConfigDrift_ThemeConfigDocsSidebarAutoCollapseCategories = docsSidebar['autoCollapseCategories'] as Tests_ConfigDrift_ThemeConfigDocsSidebarAutoCollapseCategories;

    strictEqual(docsVersionPersistence, 'localStorage');
    strictEqual(docsSidebarHideable, true);
    strictEqual(docsSidebarAutoCollapse, true);

    const blog: Tests_ConfigDrift_ThemeConfigBlog = result['blog'] as Tests_ConfigDrift_ThemeConfigBlog;
    const blogSidebar: Tests_ConfigDrift_ThemeConfigBlogSidebar = blog['sidebar'] as Tests_ConfigDrift_ThemeConfigBlogSidebar;
    const blogSidebarGroupByYear: Tests_ConfigDrift_ThemeConfigBlogSidebarGroupByYear = blogSidebar['groupByYear'] as Tests_ConfigDrift_ThemeConfigBlogSidebarGroupByYear;
    const blogLayout: Tests_ConfigDrift_ThemeConfigBlogLayout = blog['layout'] as Tests_ConfigDrift_ThemeConfigBlogLayout;
    const blogLayoutHeading: Tests_ConfigDrift_ThemeConfigBlogLayoutHeading = blogLayout['heading'] as Tests_ConfigDrift_ThemeConfigBlogLayoutHeading;
    const blogLayoutDescription: Tests_ConfigDrift_ThemeConfigBlogLayoutDescription = blogLayout['description'] as Tests_ConfigDrift_ThemeConfigBlogLayoutDescription;

    strictEqual(blogSidebarGroupByYear, false);
    strictEqual(blogLayoutHeading, 'Updates');
    strictEqual(blogLayoutDescription, 'Latest news and releases.');

    const blogShare: Tests_ConfigDrift_ThemeConfigBlogShare = blog['share'] as Tests_ConfigDrift_ThemeConfigBlogShare;
    const blogSharePlatforms: Tests_ConfigDrift_ThemeConfigBlogSharePlatforms = blogShare['platforms'] as Tests_ConfigDrift_ThemeConfigBlogSharePlatforms;

    strictEqual(blogSharePlatforms['length'], 3);
    strictEqual(blogSharePlatforms[0], 'x');
    strictEqual(blogSharePlatforms[1], 'linkedin');
    strictEqual(blogSharePlatforms[2], 'copy');

    const tableOfContents: Tests_ConfigDrift_ThemeConfigTableOfContents = result['tableOfContents'] as Tests_ConfigDrift_ThemeConfigTableOfContents;
    const tableOfContentsMinHeadingLevel: Tests_ConfigDrift_ThemeConfigTableOfContentsMinHeadingLevel = tableOfContents['minHeadingLevel'] as Tests_ConfigDrift_ThemeConfigTableOfContentsMinHeadingLevel;
    const tableOfContentsMaxHeadingLevel: Tests_ConfigDrift_ThemeConfigTableOfContentsMaxHeadingLevel = tableOfContents['maxHeadingLevel'] as Tests_ConfigDrift_ThemeConfigTableOfContentsMaxHeadingLevel;

    strictEqual(tableOfContentsMinHeadingLevel, 2);
    strictEqual(tableOfContentsMaxHeadingLevel, 4);

    const announcementBar: Tests_ConfigDrift_ThemeConfigAnnouncementBar = result['announcementBar'] as Tests_ConfigDrift_ThemeConfigAnnouncementBar;
    const announcementBarId: Tests_ConfigDrift_ThemeConfigAnnouncementBarId = announcementBar['id'] as Tests_ConfigDrift_ThemeConfigAnnouncementBarId;
    const announcementBarContent: Tests_ConfigDrift_ThemeConfigAnnouncementBarContent = announcementBar['content'] as Tests_ConfigDrift_ThemeConfigAnnouncementBarContent;
    const announcementBarBackgroundColor: Tests_ConfigDrift_ThemeConfigAnnouncementBarBackgroundColor = announcementBar['backgroundColor'] as Tests_ConfigDrift_ThemeConfigAnnouncementBarBackgroundColor;
    const announcementBarTextColor: Tests_ConfigDrift_ThemeConfigAnnouncementBarTextColor = announcementBar['textColor'] as Tests_ConfigDrift_ThemeConfigAnnouncementBarTextColor;
    const announcementBarIsCloseable: Tests_ConfigDrift_ThemeConfigAnnouncementBarIsCloseable = announcementBar['isCloseable'] as Tests_ConfigDrift_ThemeConfigAnnouncementBarIsCloseable;

    strictEqual(announcementBarId, 'announcement-1');
    strictEqual(announcementBarContent, 'New release available!');
    strictEqual(announcementBarBackgroundColor, '#1e293b');
    strictEqual(announcementBarTextColor, '#f8fafc');
    strictEqual(announcementBarIsCloseable, true);

    const errorPages: Tests_ConfigDrift_ThemeConfigErrorPages = result['errorPages'] as Tests_ConfigDrift_ThemeConfigErrorPages;
    const errorPagesNotFound: Tests_ConfigDrift_ThemeConfigErrorPagesNotFound = errorPages['notFound'] as Tests_ConfigDrift_ThemeConfigErrorPagesNotFound;
    const errorPagesNotFoundTitle: Tests_ConfigDrift_ThemeConfigErrorPagesNotFoundTitle = errorPagesNotFound['title'] as Tests_ConfigDrift_ThemeConfigErrorPagesNotFoundTitle;
    const errorPagesNotFoundDescription: Tests_ConfigDrift_ThemeConfigErrorPagesNotFoundDescription = errorPagesNotFound['description'] as Tests_ConfigDrift_ThemeConfigErrorPagesNotFoundDescription;
    const errorPagesNotFoundBackHomeLabel: Tests_ConfigDrift_ThemeConfigErrorPagesNotFoundBackHomeLabel = errorPagesNotFound['backHomeLabel'] as Tests_ConfigDrift_ThemeConfigErrorPagesNotFoundBackHomeLabel;
    const errorPagesNotFoundBackHomeHref: Tests_ConfigDrift_ThemeConfigErrorPagesNotFoundBackHomeHref = errorPagesNotFound['backHomeHref'] as Tests_ConfigDrift_ThemeConfigErrorPagesNotFoundBackHomeHref;
    const errorPagesErrorPageContent: Tests_ConfigDrift_ThemeConfigErrorPagesErrorPageContent = errorPages['errorPageContent'] as Tests_ConfigDrift_ThemeConfigErrorPagesErrorPageContent;
    const errorPagesErrorPageContentTitle: Tests_ConfigDrift_ThemeConfigErrorPagesErrorPageContentTitle = errorPagesErrorPageContent['title'] as Tests_ConfigDrift_ThemeConfigErrorPagesErrorPageContentTitle;
    const errorPagesErrorPageContentRetryLabel: Tests_ConfigDrift_ThemeConfigErrorPagesErrorPageContentRetryLabel = errorPagesErrorPageContent['retryLabel'] as Tests_ConfigDrift_ThemeConfigErrorPagesErrorPageContentRetryLabel;
    const errorPagesError: Tests_ConfigDrift_ThemeConfigErrorPagesError = errorPages['error'] as Tests_ConfigDrift_ThemeConfigErrorPagesError;
    const errorPagesErrorRetryLabel: Tests_ConfigDrift_ThemeConfigErrorPagesErrorRetryLabel = errorPagesError['retryLabel'] as Tests_ConfigDrift_ThemeConfigErrorPagesErrorRetryLabel;

    strictEqual(errorPagesNotFoundTitle, 'Lost in deployment.');
    strictEqual(errorPagesNotFoundDescription, 'This route did not roll out.');
    strictEqual(errorPagesNotFoundBackHomeLabel, 'Back to projects');
    strictEqual(errorPagesNotFoundBackHomeHref, '/');
    strictEqual(errorPagesErrorPageContentTitle, 'Pipeline interrupted.');
    strictEqual(errorPagesErrorPageContentRetryLabel, 'Re-run');
    strictEqual(errorPagesErrorRetryLabel, 'Restart');

    const footer: Tests_ConfigDrift_ThemeConfigFooter = result['footer'] as Tests_ConfigDrift_ThemeConfigFooter;
    const footerCta: Tests_ConfigDrift_ThemeConfigFooterCta = footer['cta'] as Tests_ConfigDrift_ThemeConfigFooterCta;
    const footerCtaObject: Tests_ConfigDrift_ThemeConfigFooterCtaObject = footerCta as Tests_ConfigDrift_ThemeConfigFooterCtaObject;
    const footerCtaLabel: Tests_ConfigDrift_ThemeConfigFooterCtaObject_Label = footerCtaObject['label'];
    const footerCtaHref: Tests_ConfigDrift_ThemeConfigFooterCtaObject_Href = footerCtaObject['href'];

    strictEqual(footerCtaLabel, 'Get Started');
    strictEqual(footerCtaHref, '/docs/intro');

    return;
  });

  return;
});
