import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { validateOptions, validateThemeConfig } from '../options.js';

import type {
  TestsConfigDriftAnalytics,
  TestsConfigDriftAnalyticsGtmContainerId,
  TestsConfigDriftJoiSchema,
  TestsConfigDriftJoiSchemaValidateResult,
  TestsConfigDriftOverrides,
  TestsConfigDriftOverridesColorsPrimary,
  TestsConfigDriftOverridesColorsSecondary,
  TestsConfigDriftOverridesFontsBody,
  TestsConfigDriftOverridesFontsCode,
  TestsConfigDriftOverridesFontsDisplay,
  TestsConfigDriftOverridesFooter,
  TestsConfigDriftOverridesNavbar,
  TestsConfigDriftPlugins,
  TestsConfigDriftPluginsBlog,
  TestsConfigDriftPluginsDocs,
  TestsConfigDriftPluginsPages,
  TestsConfigDriftPluginsSitemap,
  TestsConfigDriftPresetValue,
  TestsConfigDriftProgressBar,
  TestsConfigDriftSearch,
  TestsConfigDriftSearchBarShortcutKeymap,
  TestsConfigDriftSearchDocsRouteBasePath,
  TestsConfigDriftSearchFuzzyMatchingDistance,
  TestsConfigDriftSearchHashed,
  TestsConfigDriftSearchHighlightSearchTermsOnTargetPage,
  TestsConfigDriftSearchIgnorePatterns,
  TestsConfigDriftSearchIndexBlog,
  TestsConfigDriftSearchIndexDocs,
  TestsConfigDriftSearchIndexPages,
  TestsConfigDriftSearchLanguage,
  TestsConfigDriftSearchResultLimits,
  TestsConfigDriftThemeConfigAnnouncementBar,
  TestsConfigDriftThemeConfigAnnouncementBarBackgroundColor,
  TestsConfigDriftThemeConfigAnnouncementBarContent,
  TestsConfigDriftThemeConfigAnnouncementBarId,
  TestsConfigDriftThemeConfigAnnouncementBarIsCloseable,
  TestsConfigDriftThemeConfigAnnouncementBarTextColor,
  TestsConfigDriftThemeConfigBlog,
  TestsConfigDriftThemeConfigBlogLayout,
  TestsConfigDriftThemeConfigBlogLayoutDescription,
  TestsConfigDriftThemeConfigBlogLayoutHeading,
  TestsConfigDriftThemeConfigBlogShare,
  TestsConfigDriftThemeConfigBlogSharePlatforms,
  TestsConfigDriftThemeConfigBlogSidebar,
  TestsConfigDriftThemeConfigBlogSidebarGroupByYear,
  TestsConfigDriftThemeConfigColorMode,
  TestsConfigDriftThemeConfigColorModeDefaultMode,
  TestsConfigDriftThemeConfigColorModeDisableSwitch,
  TestsConfigDriftThemeConfigDocs,
  TestsConfigDriftThemeConfigDocsSidebar,
  TestsConfigDriftThemeConfigDocsSidebarAutoCollapseCategories,
  TestsConfigDriftThemeConfigDocsSidebarHideable,
  TestsConfigDriftThemeConfigDocsVersionPersistence,
  TestsConfigDriftThemeConfigErrorPages,
  TestsConfigDriftThemeConfigErrorPagesError,
  TestsConfigDriftThemeConfigErrorPagesErrorPageContent,
  TestsConfigDriftThemeConfigErrorPagesErrorPageContentRetryLabel,
  TestsConfigDriftThemeConfigErrorPagesErrorPageContentTitle,
  TestsConfigDriftThemeConfigErrorPagesErrorRetryLabel,
  TestsConfigDriftThemeConfigErrorPagesNotFound,
  TestsConfigDriftThemeConfigErrorPagesNotFoundBackHomeHref,
  TestsConfigDriftThemeConfigErrorPagesNotFoundBackHomeLabel,
  TestsConfigDriftThemeConfigErrorPagesNotFoundDescription,
  TestsConfigDriftThemeConfigErrorPagesNotFoundTitle,
  TestsConfigDriftThemeConfigFooter,
  TestsConfigDriftThemeConfigFooterCta,
  TestsConfigDriftThemeConfigFooterCtaObject,
  TestsConfigDriftThemeConfigFooterCtaObjectHref,
  TestsConfigDriftThemeConfigFooterCtaObjectLabel,
  TestsConfigDriftThemeConfigJoiSchema,
  TestsConfigDriftThemeConfigJoiSchemaValidateResult,
  TestsConfigDriftThemeConfigNavbar,
  TestsConfigDriftThemeConfigNavbarHideOnScroll,
  TestsConfigDriftThemeConfigNavbarItems,
  TestsConfigDriftThemeConfigSite,
  TestsConfigDriftThemeConfigSiteImage,
  TestsConfigDriftThemeConfigSiteLogo,
  TestsConfigDriftThemeConfigSiteLogoAlt,
  TestsConfigDriftThemeConfigSiteLogoHref,
  TestsConfigDriftThemeConfigSiteLogoSrc,
  TestsConfigDriftThemeConfigSiteLogoSrcDark,
  TestsConfigDriftThemeConfigSiteLogoSrcLight,
  TestsConfigDriftThemeConfigSiteLogoTitle,
  TestsConfigDriftThemeConfigSiteLogoWordmark,
  TestsConfigDriftThemeConfigSiteLogoWordmarkDark,
  TestsConfigDriftThemeConfigSiteLogoWordmarkLight,
  TestsConfigDriftThemeConfigSiteMetadata,
  TestsConfigDriftThemeConfigSiteTitle,
  TestsConfigDriftThemeConfigTableOfContents,
  TestsConfigDriftThemeConfigTableOfContentsMaxHeadingLevel,
  TestsConfigDriftThemeConfigTableOfContentsMinHeadingLevel,
  TestsConfigDriftThemeConfigValidatedResult,
  TestsConfigDriftValidatedResult,
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
    const result: TestsConfigDriftValidatedResult = validateOptions({
      validate: (schema, options) => {
        const joiSchema: TestsConfigDriftJoiSchema = schema as TestsConfigDriftJoiSchema;
        const validated: TestsConfigDriftJoiSchemaValidateResult = joiSchema.validate(options);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as TestsConfigDriftValidatedResult;
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

    const presetValue: TestsConfigDriftPresetValue = result['preset'];

    strictEqual(presetValue, 'sentinel');

    const overrides: TestsConfigDriftOverrides = result['overrides'];
    const overridesColorsPrimary: TestsConfigDriftOverridesColorsPrimary = overrides['colors']['primary'];
    const overridesColorsSecondary: TestsConfigDriftOverridesColorsSecondary = overrides['colors']['secondary'];

    deepStrictEqual(overridesColorsPrimary, {
      light: '#DC2626', dark: '#DC2626',
    });
    deepStrictEqual(overridesColorsSecondary, {
      light: '#FBBF24', dark: '#FBBF24',
    });

    const overridesFontsDisplay: TestsConfigDriftOverridesFontsDisplay = overrides['fonts']['display'];
    const overridesFontsBody: TestsConfigDriftOverridesFontsBody = overrides['fonts']['body'];
    const overridesFontsCode: TestsConfigDriftOverridesFontsCode = overrides['fonts']['code'];

    strictEqual(overridesFontsDisplay, 'Plus Jakarta Sans');
    strictEqual(overridesFontsBody, 'Inter');
    strictEqual(overridesFontsCode, 'JetBrains Mono');

    const overridesNavbar: TestsConfigDriftOverridesNavbar = overrides['navbar'];
    const overridesFooter: TestsConfigDriftOverridesFooter = overrides['footer'];

    strictEqual(overridesNavbar, 'canopy');
    strictEqual(overridesFooter, 'embassy');

    const plugins: TestsConfigDriftPlugins = result['plugins'];
    const pluginsDocs: TestsConfigDriftPluginsDocs = plugins['docs'];
    const pluginsBlog: TestsConfigDriftPluginsBlog = plugins['blog'];
    const pluginsPages: TestsConfigDriftPluginsPages = plugins['pages'];
    const pluginsSitemap: TestsConfigDriftPluginsSitemap = plugins['sitemap'];

    strictEqual(pluginsDocs !== undefined, true);
    strictEqual(pluginsBlog !== undefined && pluginsBlog !== false, true);
    strictEqual(pluginsPages !== undefined && pluginsPages !== false, true);
    strictEqual(pluginsSitemap !== undefined && pluginsSitemap !== false, true);

    const analytics: TestsConfigDriftAnalytics = result['analytics'];
    const analyticsGtmContainerId: TestsConfigDriftAnalyticsGtmContainerId = analytics['gtm']!['containerId'];

    strictEqual(analyticsGtmContainerId, 'GTM-XXXXXX');

    const progressBar: TestsConfigDriftProgressBar = result['progressBar'];

    strictEqual(typeof progressBar, 'object');

    const search: TestsConfigDriftSearch = result['search'];

    strictEqual(search !== false, true);

    if (search !== false) {
      const searchLanguage: TestsConfigDriftSearchLanguage = search['language']!;
      const searchIndexDocs: TestsConfigDriftSearchIndexDocs = search['indexDocs']!;
      const searchIndexBlog: TestsConfigDriftSearchIndexBlog = search['indexBlog']!;
      const searchIndexPages: TestsConfigDriftSearchIndexPages = search['indexPages']!;
      const searchHashed: TestsConfigDriftSearchHashed = search['hashed']!;
      const searchResultLimits: TestsConfigDriftSearchResultLimits = search['searchResultLimits']!;
      const searchHighlight: TestsConfigDriftSearchHighlightSearchTermsOnTargetPage = search['highlightSearchTermsOnTargetPage']!;
      const searchShortcut: TestsConfigDriftSearchBarShortcutKeymap = search['searchBarShortcutKeymap']!;
      const searchFuzzy: TestsConfigDriftSearchFuzzyMatchingDistance = search['fuzzyMatchingDistance']!;
      const searchIgnore: TestsConfigDriftSearchIgnorePatterns = search['ignorePatterns']!;
      const searchDocsRoute: TestsConfigDriftSearchDocsRouteBasePath = search['docsRouteBasePath']!;

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
    const result: TestsConfigDriftThemeConfigValidatedResult = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: TestsConfigDriftThemeConfigJoiSchema = schema as TestsConfigDriftThemeConfigJoiSchema;
        const validated: TestsConfigDriftThemeConfigJoiSchemaValidateResult = joiSchema.validate(themeConfig);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as TestsConfigDriftThemeConfigValidatedResult;
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

    const site: TestsConfigDriftThemeConfigSite = result['site'] as TestsConfigDriftThemeConfigSite;
    const siteTitle: TestsConfigDriftThemeConfigSiteTitle = site['title'] as TestsConfigDriftThemeConfigSiteTitle;
    const siteLogo: TestsConfigDriftThemeConfigSiteLogo = site['logo'] as TestsConfigDriftThemeConfigSiteLogo;
    const siteLogoAlt: TestsConfigDriftThemeConfigSiteLogoAlt = siteLogo['alt'] as TestsConfigDriftThemeConfigSiteLogoAlt;
    const siteLogoSrc: TestsConfigDriftThemeConfigSiteLogoSrc = siteLogo['src'] as TestsConfigDriftThemeConfigSiteLogoSrc;
    const siteLogoSrcLight: TestsConfigDriftThemeConfigSiteLogoSrcLight = siteLogoSrc['light'] as TestsConfigDriftThemeConfigSiteLogoSrcLight;
    const siteLogoSrcDark: TestsConfigDriftThemeConfigSiteLogoSrcDark = siteLogoSrc['dark'] as TestsConfigDriftThemeConfigSiteLogoSrcDark;
    const siteLogoHref: TestsConfigDriftThemeConfigSiteLogoHref = siteLogo['href'] as TestsConfigDriftThemeConfigSiteLogoHref;
    const siteLogoWordmark: TestsConfigDriftThemeConfigSiteLogoWordmark = siteLogo['wordmark'] as TestsConfigDriftThemeConfigSiteLogoWordmark;
    const siteLogoWordmarkLight: TestsConfigDriftThemeConfigSiteLogoWordmarkLight = siteLogoWordmark['light'] as TestsConfigDriftThemeConfigSiteLogoWordmarkLight;
    const siteLogoWordmarkDark: TestsConfigDriftThemeConfigSiteLogoWordmarkDark = siteLogoWordmark['dark'] as TestsConfigDriftThemeConfigSiteLogoWordmarkDark;
    const siteLogoTitle: TestsConfigDriftThemeConfigSiteLogoTitle = siteLogo['title'] as TestsConfigDriftThemeConfigSiteLogoTitle;
    const siteImage: TestsConfigDriftThemeConfigSiteImage = site['image'] as TestsConfigDriftThemeConfigSiteImage;
    const siteMetadata: TestsConfigDriftThemeConfigSiteMetadata = site['metadata'] as TestsConfigDriftThemeConfigSiteMetadata;

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

    const colorMode: TestsConfigDriftThemeConfigColorMode = result['colorMode'] as TestsConfigDriftThemeConfigColorMode;
    const colorModeDefaultMode: TestsConfigDriftThemeConfigColorModeDefaultMode = colorMode['defaultMode'] as TestsConfigDriftThemeConfigColorModeDefaultMode;
    const colorModeDisableSwitch: TestsConfigDriftThemeConfigColorModeDisableSwitch = colorMode['disableSwitch'] as TestsConfigDriftThemeConfigColorModeDisableSwitch;

    strictEqual(colorModeDefaultMode, 'dark');
    strictEqual(colorModeDisableSwitch, false);

    const navbar: TestsConfigDriftThemeConfigNavbar = result['navbar'] as TestsConfigDriftThemeConfigNavbar;
    const navbarHideOnScroll: TestsConfigDriftThemeConfigNavbarHideOnScroll = navbar['hideOnScroll'] as TestsConfigDriftThemeConfigNavbarHideOnScroll;
    const navbarItems: TestsConfigDriftThemeConfigNavbarItems = navbar['items'] as TestsConfigDriftThemeConfigNavbarItems;

    strictEqual(navbarHideOnScroll, true);
    strictEqual(navbarItems.length, 1);

    const docs: TestsConfigDriftThemeConfigDocs = result['docs'] as TestsConfigDriftThemeConfigDocs;
    const docsVersionPersistence: TestsConfigDriftThemeConfigDocsVersionPersistence = docs['versionPersistence'] as TestsConfigDriftThemeConfigDocsVersionPersistence;
    const docsSidebar: TestsConfigDriftThemeConfigDocsSidebar = docs['sidebar'] as TestsConfigDriftThemeConfigDocsSidebar;
    const docsSidebarHideable: TestsConfigDriftThemeConfigDocsSidebarHideable = docsSidebar['hideable'] as TestsConfigDriftThemeConfigDocsSidebarHideable;
    const docsSidebarAutoCollapse: TestsConfigDriftThemeConfigDocsSidebarAutoCollapseCategories = docsSidebar['autoCollapseCategories'] as TestsConfigDriftThemeConfigDocsSidebarAutoCollapseCategories;

    strictEqual(docsVersionPersistence, 'localStorage');
    strictEqual(docsSidebarHideable, true);
    strictEqual(docsSidebarAutoCollapse, true);

    const blog: TestsConfigDriftThemeConfigBlog = result['blog'] as TestsConfigDriftThemeConfigBlog;
    const blogSidebar: TestsConfigDriftThemeConfigBlogSidebar = blog['sidebar'] as TestsConfigDriftThemeConfigBlogSidebar;
    const blogSidebarGroupByYear: TestsConfigDriftThemeConfigBlogSidebarGroupByYear = blogSidebar['groupByYear'] as TestsConfigDriftThemeConfigBlogSidebarGroupByYear;
    const blogLayout: TestsConfigDriftThemeConfigBlogLayout = blog['layout'] as TestsConfigDriftThemeConfigBlogLayout;
    const blogLayoutHeading: TestsConfigDriftThemeConfigBlogLayoutHeading = blogLayout['heading'] as TestsConfigDriftThemeConfigBlogLayoutHeading;
    const blogLayoutDescription: TestsConfigDriftThemeConfigBlogLayoutDescription = blogLayout['description'] as TestsConfigDriftThemeConfigBlogLayoutDescription;

    strictEqual(blogSidebarGroupByYear, false);
    strictEqual(blogLayoutHeading, 'Updates');
    strictEqual(blogLayoutDescription, 'Latest news and releases.');

    const blogShare: TestsConfigDriftThemeConfigBlogShare = blog['share'] as TestsConfigDriftThemeConfigBlogShare;
    const blogSharePlatforms: TestsConfigDriftThemeConfigBlogSharePlatforms = blogShare['platforms'] as TestsConfigDriftThemeConfigBlogSharePlatforms;

    strictEqual(blogSharePlatforms['length'], 3);
    strictEqual(blogSharePlatforms[0], 'x');
    strictEqual(blogSharePlatforms[1], 'linkedin');
    strictEqual(blogSharePlatforms[2], 'copy');

    const tableOfContents: TestsConfigDriftThemeConfigTableOfContents = result['tableOfContents'] as TestsConfigDriftThemeConfigTableOfContents;
    const tableOfContentsMinHeadingLevel: TestsConfigDriftThemeConfigTableOfContentsMinHeadingLevel = tableOfContents['minHeadingLevel'] as TestsConfigDriftThemeConfigTableOfContentsMinHeadingLevel;
    const tableOfContentsMaxHeadingLevel: TestsConfigDriftThemeConfigTableOfContentsMaxHeadingLevel = tableOfContents['maxHeadingLevel'] as TestsConfigDriftThemeConfigTableOfContentsMaxHeadingLevel;

    strictEqual(tableOfContentsMinHeadingLevel, 2);
    strictEqual(tableOfContentsMaxHeadingLevel, 4);

    const announcementBar: TestsConfigDriftThemeConfigAnnouncementBar = result['announcementBar'] as TestsConfigDriftThemeConfigAnnouncementBar;
    const announcementBarId: TestsConfigDriftThemeConfigAnnouncementBarId = announcementBar['id'] as TestsConfigDriftThemeConfigAnnouncementBarId;
    const announcementBarContent: TestsConfigDriftThemeConfigAnnouncementBarContent = announcementBar['content'] as TestsConfigDriftThemeConfigAnnouncementBarContent;
    const announcementBarBackgroundColor: TestsConfigDriftThemeConfigAnnouncementBarBackgroundColor = announcementBar['backgroundColor'] as TestsConfigDriftThemeConfigAnnouncementBarBackgroundColor;
    const announcementBarTextColor: TestsConfigDriftThemeConfigAnnouncementBarTextColor = announcementBar['textColor'] as TestsConfigDriftThemeConfigAnnouncementBarTextColor;
    const announcementBarIsCloseable: TestsConfigDriftThemeConfigAnnouncementBarIsCloseable = announcementBar['isCloseable'] as TestsConfigDriftThemeConfigAnnouncementBarIsCloseable;

    strictEqual(announcementBarId, 'announcement-1');
    strictEqual(announcementBarContent, 'New release available!');
    strictEqual(announcementBarBackgroundColor, '#1e293b');
    strictEqual(announcementBarTextColor, '#f8fafc');
    strictEqual(announcementBarIsCloseable, true);

    const errorPages: TestsConfigDriftThemeConfigErrorPages = result['errorPages'] as TestsConfigDriftThemeConfigErrorPages;
    const errorPagesNotFound: TestsConfigDriftThemeConfigErrorPagesNotFound = errorPages['notFound'] as TestsConfigDriftThemeConfigErrorPagesNotFound;
    const errorPagesNotFoundTitle: TestsConfigDriftThemeConfigErrorPagesNotFoundTitle = errorPagesNotFound['title'] as TestsConfigDriftThemeConfigErrorPagesNotFoundTitle;
    const errorPagesNotFoundDescription: TestsConfigDriftThemeConfigErrorPagesNotFoundDescription = errorPagesNotFound['description'] as TestsConfigDriftThemeConfigErrorPagesNotFoundDescription;
    const errorPagesNotFoundBackHomeLabel: TestsConfigDriftThemeConfigErrorPagesNotFoundBackHomeLabel = errorPagesNotFound['backHomeLabel'] as TestsConfigDriftThemeConfigErrorPagesNotFoundBackHomeLabel;
    const errorPagesNotFoundBackHomeHref: TestsConfigDriftThemeConfigErrorPagesNotFoundBackHomeHref = errorPagesNotFound['backHomeHref'] as TestsConfigDriftThemeConfigErrorPagesNotFoundBackHomeHref;
    const errorPagesErrorPageContent: TestsConfigDriftThemeConfigErrorPagesErrorPageContent = errorPages['errorPageContent'] as TestsConfigDriftThemeConfigErrorPagesErrorPageContent;
    const errorPagesErrorPageContentTitle: TestsConfigDriftThemeConfigErrorPagesErrorPageContentTitle = errorPagesErrorPageContent['title'] as TestsConfigDriftThemeConfigErrorPagesErrorPageContentTitle;
    const errorPagesErrorPageContentRetryLabel: TestsConfigDriftThemeConfigErrorPagesErrorPageContentRetryLabel = errorPagesErrorPageContent['retryLabel'] as TestsConfigDriftThemeConfigErrorPagesErrorPageContentRetryLabel;
    const errorPagesError: TestsConfigDriftThemeConfigErrorPagesError = errorPages['error'] as TestsConfigDriftThemeConfigErrorPagesError;
    const errorPagesErrorRetryLabel: TestsConfigDriftThemeConfigErrorPagesErrorRetryLabel = errorPagesError['retryLabel'] as TestsConfigDriftThemeConfigErrorPagesErrorRetryLabel;

    strictEqual(errorPagesNotFoundTitle, 'Lost in deployment.');
    strictEqual(errorPagesNotFoundDescription, 'This route did not roll out.');
    strictEqual(errorPagesNotFoundBackHomeLabel, 'Back to projects');
    strictEqual(errorPagesNotFoundBackHomeHref, '/');
    strictEqual(errorPagesErrorPageContentTitle, 'Pipeline interrupted.');
    strictEqual(errorPagesErrorPageContentRetryLabel, 'Re-run');
    strictEqual(errorPagesErrorRetryLabel, 'Restart');

    const footer: TestsConfigDriftThemeConfigFooter = result['footer'] as TestsConfigDriftThemeConfigFooter;
    const footerCta: TestsConfigDriftThemeConfigFooterCta = footer['cta'] as TestsConfigDriftThemeConfigFooterCta;
    const footerCtaObject: TestsConfigDriftThemeConfigFooterCtaObject = footerCta as TestsConfigDriftThemeConfigFooterCtaObject;
    const footerCtaLabel: TestsConfigDriftThemeConfigFooterCtaObjectLabel = footerCtaObject['label'];
    const footerCtaHref: TestsConfigDriftThemeConfigFooterCtaObjectHref = footerCtaObject['href'];

    strictEqual(footerCtaLabel, 'Get Started');
    strictEqual(footerCtaHref, '/docs/intro');

    return;
  });

  return;
});
