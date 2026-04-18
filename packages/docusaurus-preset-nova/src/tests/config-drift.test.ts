import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { validateOptions, validateThemeConfig } from '../options.js';

import type {
  TestsConfigDriftAnalytics,
  TestsConfigDriftAnalyticsGtmContainerId,
  TestsConfigDriftJoiSchema,
  TestsConfigDriftJoiSchemaValidateResult,
  TestsConfigDriftOverrides,
  TestsConfigDriftOverridesColorsAccent,
  TestsConfigDriftOverridesColorsNeutral,
  TestsConfigDriftOverridesColorsPrimary,
  TestsConfigDriftOverridesDepthCards,
  TestsConfigDriftOverridesDepthCodeBlocks,
  TestsConfigDriftOverridesFontsBody,
  TestsConfigDriftOverridesFontsCode,
  TestsConfigDriftOverridesFontsDisplay,
  TestsConfigDriftOverridesFooter,
  TestsConfigDriftOverridesMotionHoverEffects,
  TestsConfigDriftOverridesMotionSpeed,
  TestsConfigDriftOverridesMotionStaggeredReveals,
  TestsConfigDriftOverridesNavbar,
  TestsConfigDriftOverridesShapeDensity,
  TestsConfigDriftOverridesShapeRadius,
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
  TestsConfigDriftThemeConfigFooter,
  TestsConfigDriftThemeConfigFooterCta,
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
  TestsConfigDriftThemeConfigSiteLogoTitle,
  TestsConfigDriftThemeConfigSiteLogoWordmark,
  TestsConfigDriftThemeConfigSiteLogoWordmarkDark,
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
            primary: '#DC2626',
            accent: '#FBBF24',
            neutral: '#78716C',
          },
          fonts: {
            display: 'Plus Jakarta Sans',
            body: 'Inter',
            code: 'JetBrains Mono',
          },
          shape: {
            radius: 'pill',
            density: 'spacious',
          },
          depth: {
            cards: 'glass',
            codeBlocks: 'elevated',
          },
          motion: {
            speed: 'expressive',
            staggeredReveals: true,
            hoverEffects: true,
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
    const overridesColorsAccent: TestsConfigDriftOverridesColorsAccent = overrides['colors']['accent'];
    const overridesColorsNeutral: TestsConfigDriftOverridesColorsNeutral = overrides['colors']['neutral'];

    strictEqual(overridesColorsPrimary, '#DC2626');
    strictEqual(overridesColorsAccent, '#FBBF24');
    strictEqual(overridesColorsNeutral, '#78716C');

    const overridesFontsDisplay: TestsConfigDriftOverridesFontsDisplay = overrides['fonts']['display'];
    const overridesFontsBody: TestsConfigDriftOverridesFontsBody = overrides['fonts']['body'];
    const overridesFontsCode: TestsConfigDriftOverridesFontsCode = overrides['fonts']['code'];

    strictEqual(overridesFontsDisplay, 'Plus Jakarta Sans');
    strictEqual(overridesFontsBody, 'Inter');
    strictEqual(overridesFontsCode, 'JetBrains Mono');

    const overridesShapeRadius: TestsConfigDriftOverridesShapeRadius = overrides['shape']['radius'];
    const overridesShapeDensity: TestsConfigDriftOverridesShapeDensity = overrides['shape']['density'];

    strictEqual(overridesShapeRadius, 'pill');
    strictEqual(overridesShapeDensity, 'spacious');

    const overridesDepthCards: TestsConfigDriftOverridesDepthCards = overrides['depth']['cards'];
    const overridesDepthCodeBlocks: TestsConfigDriftOverridesDepthCodeBlocks = overrides['depth']['codeBlocks'];

    strictEqual(overridesDepthCards, 'glass');
    strictEqual(overridesDepthCodeBlocks, 'elevated');

    const overridesMotionSpeed: TestsConfigDriftOverridesMotionSpeed = overrides['motion']['speed'];
    const overridesMotionStaggeredReveals: TestsConfigDriftOverridesMotionStaggeredReveals = overrides['motion']['staggeredReveals'];
    const overridesMotionHoverEffects: TestsConfigDriftOverridesMotionHoverEffects = overrides['motion']['hoverEffects'];

    strictEqual(overridesMotionSpeed, 'expressive');
    strictEqual(overridesMotionStaggeredReveals, true);
    strictEqual(overridesMotionHoverEffects, true);

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
            src: '/img/logo.svg',
            srcDark: '/img/logo-dark.svg',
            href: '/',
            wordmark: '/img/wordmark.svg',
            wordmarkDark: '/img/wordmark-dark.svg',
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
        footer: {
          cta: 'Get Started',
        },
      },
    });

    const site: TestsConfigDriftThemeConfigSite = result['site'] as TestsConfigDriftThemeConfigSite;
    const siteTitle: TestsConfigDriftThemeConfigSiteTitle = site['title'] as TestsConfigDriftThemeConfigSiteTitle;
    const siteLogo: TestsConfigDriftThemeConfigSiteLogo = site['logo'] as TestsConfigDriftThemeConfigSiteLogo;
    const siteLogoAlt: TestsConfigDriftThemeConfigSiteLogoAlt = siteLogo['alt'] as TestsConfigDriftThemeConfigSiteLogoAlt;
    const siteLogoSrc: TestsConfigDriftThemeConfigSiteLogoSrc = siteLogo['src'] as TestsConfigDriftThemeConfigSiteLogoSrc;
    const siteLogoSrcDark: TestsConfigDriftThemeConfigSiteLogoSrcDark = siteLogo['srcDark'] as TestsConfigDriftThemeConfigSiteLogoSrcDark;
    const siteLogoHref: TestsConfigDriftThemeConfigSiteLogoHref = siteLogo['href'] as TestsConfigDriftThemeConfigSiteLogoHref;
    const siteLogoWordmark: TestsConfigDriftThemeConfigSiteLogoWordmark = siteLogo['wordmark'] as TestsConfigDriftThemeConfigSiteLogoWordmark;
    const siteLogoWordmarkDark: TestsConfigDriftThemeConfigSiteLogoWordmarkDark = siteLogo['wordmarkDark'] as TestsConfigDriftThemeConfigSiteLogoWordmarkDark;
    const siteLogoTitle: TestsConfigDriftThemeConfigSiteLogoTitle = siteLogo['title'] as TestsConfigDriftThemeConfigSiteLogoTitle;
    const siteImage: TestsConfigDriftThemeConfigSiteImage = site['image'] as TestsConfigDriftThemeConfigSiteImage;
    const siteMetadata: TestsConfigDriftThemeConfigSiteMetadata = site['metadata'] as TestsConfigDriftThemeConfigSiteMetadata;

    strictEqual(siteTitle, 'Nova Docs');
    strictEqual(siteLogoAlt, 'Nova Logo');
    strictEqual(siteLogoSrc, '/img/logo.svg');
    strictEqual(siteLogoSrcDark, '/img/logo-dark.svg');
    strictEqual(siteLogoHref, '/');
    strictEqual(siteLogoWordmark, '/img/wordmark.svg');
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

    const footer: TestsConfigDriftThemeConfigFooter = result['footer'] as TestsConfigDriftThemeConfigFooter;
    const footerCta: TestsConfigDriftThemeConfigFooterCta = footer['cta'] as TestsConfigDriftThemeConfigFooterCta;

    strictEqual(footerCta, 'Get Started');

    return;
  });

  return;
});
