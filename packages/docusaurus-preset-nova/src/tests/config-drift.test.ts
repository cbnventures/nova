import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { validateOptions, validateThemeConfig } from '../options.js';

import type {
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_Analytics,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_AnalyticsGtmContainerId,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_JoiSchema,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_Overrides,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_OverridesColorsPrimary,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_OverridesColorsSecondary,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_OverridesFontsBody,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_OverridesFontsCode,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_OverridesFontsDisplay,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_OverridesFooter,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_OverridesNavbar,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_Plugins,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_PluginsBlog,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_PluginsDocs,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_PluginsPages,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_PluginsSitemap,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_PresetValue,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_ProgressBar,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_Result,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_Search,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchDocsRoute,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchFuzzy,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchHashed,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchHighlight,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchIgnore,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchIndexBlog,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchIndexDocs,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchIndexPages,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchLanguage,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchResultLimits,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchShortcut,
  Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_Validated,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_AnnouncementBar,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_AnnouncementBarBackgroundColor,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_AnnouncementBarContent,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_AnnouncementBarId,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_AnnouncementBarIsCloseable,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_AnnouncementBarTextColor,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Blog,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogLayout,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogLayoutDescription,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogLayoutHeading,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogShare,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogSharePlatforms,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogSidebar,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogSidebarGroupByYear,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ColorMode,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ColorModeDefaultMode,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ColorModeDisableSwitch,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Docs,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_DocsSidebar,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_DocsSidebarAutoCollapse,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_DocsSidebarHideable,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_DocsVersionPersistence,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPages,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesError,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesErrorPageContent,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesErrorPageContentRetryLabel,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesErrorPageContentTitle,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesErrorRetryLabel,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesNotFound,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesNotFoundBackHomeHref,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesNotFoundBackHomeLabel,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesNotFoundDescription,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesNotFoundTitle,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Footer,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_FooterCta,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_FooterCtaHref,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_FooterCtaLabel,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_FooterCtaObject,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_JoiSchema,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Navbar,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_NavbarHideOnScroll,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_NavbarItems,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Result,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Site,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteImage,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogo,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoAlt,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoHref,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoSrc,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoSrcDark,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoSrcLight,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoTitle,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoWordmark,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoWordmarkDark,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoWordmarkLight,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteMetadata,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteTitle,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_TableOfContents,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_TableOfContentsMaxHeadingLevel,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_TableOfContentsMinHeadingLevel,
  Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Validated,
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
    const result: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_Result = validateOptions({
      validate: (schema, options) => {
        const joiSchema: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_JoiSchema = schema as Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_JoiSchema;
        const validated: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_Validated = joiSchema.validate(options);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_Result;
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

    const presetValue: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_PresetValue = result['preset'];

    strictEqual(presetValue, 'sentinel');

    const overrides: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_Overrides = result['overrides'];
    const overridesColorsPrimary: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_OverridesColorsPrimary = overrides['colors']['primary'];
    const overridesColorsSecondary: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_OverridesColorsSecondary = overrides['colors']['secondary'];

    deepStrictEqual(overridesColorsPrimary, {
      light: '#DC2626', dark: '#DC2626',
    });
    deepStrictEqual(overridesColorsSecondary, {
      light: '#FBBF24', dark: '#FBBF24',
    });

    const overridesFontsDisplay: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_OverridesFontsDisplay = overrides['fonts']['display'];
    const overridesFontsBody: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_OverridesFontsBody = overrides['fonts']['body'];
    const overridesFontsCode: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_OverridesFontsCode = overrides['fonts']['code'];

    strictEqual(overridesFontsDisplay, 'Plus Jakarta Sans');
    strictEqual(overridesFontsBody, 'Inter');
    strictEqual(overridesFontsCode, 'JetBrains Mono');

    const overridesNavbar: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_OverridesNavbar = overrides['navbar'];
    const overridesFooter: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_OverridesFooter = overrides['footer'];

    strictEqual(overridesNavbar, 'canopy');
    strictEqual(overridesFooter, 'embassy');

    const plugins: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_Plugins = result['plugins'];
    const pluginsDocs: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_PluginsDocs = plugins['docs'];
    const pluginsBlog: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_PluginsBlog = plugins['blog'];
    const pluginsPages: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_PluginsPages = plugins['pages'];
    const pluginsSitemap: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_PluginsSitemap = plugins['sitemap'];

    strictEqual(pluginsDocs !== undefined, true);
    strictEqual(pluginsBlog !== undefined && pluginsBlog !== false, true);
    strictEqual(pluginsPages !== undefined && pluginsPages !== false, true);
    strictEqual(pluginsSitemap !== undefined && pluginsSitemap !== false, true);

    const analytics: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_Analytics = result['analytics'];
    const analyticsGtmContainerId: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_AnalyticsGtmContainerId = analytics['gtm']!['containerId'];

    strictEqual(analyticsGtmContainerId, 'GTM-XXXXXX');

    const progressBar: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_ProgressBar = result['progressBar'];

    strictEqual(typeof progressBar, 'object');

    const search: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_Search = result['search'];

    strictEqual(search !== false, true);

    if (search !== false) {
      const searchLanguage: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchLanguage = search['language']!;
      const searchIndexDocs: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchIndexDocs = search['indexDocs']!;
      const searchIndexBlog: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchIndexBlog = search['indexBlog']!;
      const searchIndexPages: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchIndexPages = search['indexPages']!;
      const searchHashed: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchHashed = search['hashed']!;
      const searchResultLimits: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchResultLimits = search['searchResultLimits']!;
      const searchHighlight: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchHighlight = search['highlightSearchTermsOnTargetPage']!;
      const searchShortcut: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchShortcut = search['searchBarShortcutKeymap']!;
      const searchFuzzy: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchFuzzy = search['fuzzyMatchingDistance']!;
      const searchIgnore: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchIgnore = search['ignorePatterns']!;
      const searchDocsRoute: Tests_ConfigDrift_ConfigDriftValidateOptions_ValidatesAFullyPopulatedPresetOptionsObject_SearchDocsRoute = search['docsRouteBasePath']!;

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
    const result: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Result = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_JoiSchema = schema as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_JoiSchema;
        const validated: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Validated = joiSchema.validate(themeConfig);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Result;
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

    const site: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Site = result['site'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Site;
    const siteTitle: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteTitle = site['title'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteTitle;
    const siteLogo: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogo = site['logo'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogo;
    const siteLogoAlt: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoAlt = siteLogo['alt'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoAlt;
    const siteLogoSrc: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoSrc = siteLogo['src'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoSrc;
    const siteLogoSrcLight: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoSrcLight = siteLogoSrc['light'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoSrcLight;
    const siteLogoSrcDark: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoSrcDark = siteLogoSrc['dark'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoSrcDark;
    const siteLogoHref: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoHref = siteLogo['href'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoHref;
    const siteLogoWordmark: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoWordmark = siteLogo['wordmark'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoWordmark;
    const siteLogoWordmarkLight: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoWordmarkLight = siteLogoWordmark['light'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoWordmarkLight;
    const siteLogoWordmarkDark: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoWordmarkDark = siteLogoWordmark['dark'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoWordmarkDark;
    const siteLogoTitle: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoTitle = siteLogo['title'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteLogoTitle;
    const siteImage: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteImage = site['image'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteImage;
    const siteMetadata: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteMetadata = site['metadata'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_SiteMetadata;

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

    const colorMode: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ColorMode = result['colorMode'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ColorMode;
    const colorModeDefaultMode: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ColorModeDefaultMode = colorMode['defaultMode'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ColorModeDefaultMode;
    const colorModeDisableSwitch: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ColorModeDisableSwitch = colorMode['disableSwitch'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ColorModeDisableSwitch;

    strictEqual(colorModeDefaultMode, 'dark');
    strictEqual(colorModeDisableSwitch, false);

    const navbar: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Navbar = result['navbar'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Navbar;
    const navbarHideOnScroll: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_NavbarHideOnScroll = navbar['hideOnScroll'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_NavbarHideOnScroll;
    const navbarItems: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_NavbarItems = navbar['items'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_NavbarItems;

    strictEqual(navbarHideOnScroll, true);
    strictEqual(navbarItems.length, 1);

    const docs: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Docs = result['docs'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Docs;
    const docsVersionPersistence: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_DocsVersionPersistence = docs['versionPersistence'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_DocsVersionPersistence;
    const docsSidebar: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_DocsSidebar = docs['sidebar'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_DocsSidebar;
    const docsSidebarHideable: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_DocsSidebarHideable = docsSidebar['hideable'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_DocsSidebarHideable;
    const docsSidebarAutoCollapse: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_DocsSidebarAutoCollapse = docsSidebar['autoCollapseCategories'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_DocsSidebarAutoCollapse;

    strictEqual(docsVersionPersistence, 'localStorage');
    strictEqual(docsSidebarHideable, true);
    strictEqual(docsSidebarAutoCollapse, true);

    const blog: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Blog = result['blog'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Blog;
    const blogSidebar: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogSidebar = blog['sidebar'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogSidebar;
    const blogSidebarGroupByYear: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogSidebarGroupByYear = blogSidebar['groupByYear'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogSidebarGroupByYear;
    const blogLayout: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogLayout = blog['layout'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogLayout;
    const blogLayoutHeading: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogLayoutHeading = blogLayout['heading'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogLayoutHeading;
    const blogLayoutDescription: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogLayoutDescription = blogLayout['description'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogLayoutDescription;

    strictEqual(blogSidebarGroupByYear, false);
    strictEqual(blogLayoutHeading, 'Updates');
    strictEqual(blogLayoutDescription, 'Latest news and releases.');

    const blogShare: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogShare = blog['share'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogShare;
    const blogSharePlatforms: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogSharePlatforms = blogShare['platforms'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_BlogSharePlatforms;

    strictEqual(blogSharePlatforms['length'], 3);
    strictEqual(blogSharePlatforms[0], 'x');
    strictEqual(blogSharePlatforms[1], 'linkedin');
    strictEqual(blogSharePlatforms[2], 'copy');

    const tableOfContents: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_TableOfContents = result['tableOfContents'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_TableOfContents;
    const tableOfContentsMinHeadingLevel: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_TableOfContentsMinHeadingLevel = tableOfContents['minHeadingLevel'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_TableOfContentsMinHeadingLevel;
    const tableOfContentsMaxHeadingLevel: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_TableOfContentsMaxHeadingLevel = tableOfContents['maxHeadingLevel'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_TableOfContentsMaxHeadingLevel;

    strictEqual(tableOfContentsMinHeadingLevel, 2);
    strictEqual(tableOfContentsMaxHeadingLevel, 4);

    const announcementBar: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_AnnouncementBar = result['announcementBar'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_AnnouncementBar;
    const announcementBarId: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_AnnouncementBarId = announcementBar['id'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_AnnouncementBarId;
    const announcementBarContent: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_AnnouncementBarContent = announcementBar['content'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_AnnouncementBarContent;
    const announcementBarBackgroundColor: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_AnnouncementBarBackgroundColor = announcementBar['backgroundColor'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_AnnouncementBarBackgroundColor;
    const announcementBarTextColor: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_AnnouncementBarTextColor = announcementBar['textColor'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_AnnouncementBarTextColor;
    const announcementBarIsCloseable: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_AnnouncementBarIsCloseable = announcementBar['isCloseable'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_AnnouncementBarIsCloseable;

    strictEqual(announcementBarId, 'announcement-1');
    strictEqual(announcementBarContent, 'New release available!');
    strictEqual(announcementBarBackgroundColor, '#1e293b');
    strictEqual(announcementBarTextColor, '#f8fafc');
    strictEqual(announcementBarIsCloseable, true);

    const errorPages: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPages = result['errorPages'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPages;
    const errorPagesNotFound: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesNotFound = errorPages['notFound'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesNotFound;
    const errorPagesNotFoundTitle: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesNotFoundTitle = errorPagesNotFound['title'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesNotFoundTitle;
    const errorPagesNotFoundDescription: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesNotFoundDescription = errorPagesNotFound['description'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesNotFoundDescription;
    const errorPagesNotFoundBackHomeLabel: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesNotFoundBackHomeLabel = errorPagesNotFound['backHomeLabel'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesNotFoundBackHomeLabel;
    const errorPagesNotFoundBackHomeHref: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesNotFoundBackHomeHref = errorPagesNotFound['backHomeHref'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesNotFoundBackHomeHref;
    const errorPagesErrorPageContent: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesErrorPageContent = errorPages['errorPageContent'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesErrorPageContent;
    const errorPagesErrorPageContentTitle: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesErrorPageContentTitle = errorPagesErrorPageContent['title'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesErrorPageContentTitle;
    const errorPagesErrorPageContentRetryLabel: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesErrorPageContentRetryLabel = errorPagesErrorPageContent['retryLabel'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesErrorPageContentRetryLabel;
    const errorPagesError: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesError = errorPages['error'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesError;
    const errorPagesErrorRetryLabel: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesErrorRetryLabel = errorPagesError['retryLabel'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_ErrorPagesErrorRetryLabel;

    strictEqual(errorPagesNotFoundTitle, 'Lost in deployment.');
    strictEqual(errorPagesNotFoundDescription, 'This route did not roll out.');
    strictEqual(errorPagesNotFoundBackHomeLabel, 'Back to projects');
    strictEqual(errorPagesNotFoundBackHomeHref, '/');
    strictEqual(errorPagesErrorPageContentTitle, 'Pipeline interrupted.');
    strictEqual(errorPagesErrorPageContentRetryLabel, 'Re-run');
    strictEqual(errorPagesErrorRetryLabel, 'Restart');

    const footer: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Footer = result['footer'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_Footer;
    const footerCta: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_FooterCta = footer['cta'] as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_FooterCta;
    const footerCtaObject: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_FooterCtaObject = footerCta as Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_FooterCtaObject;
    const footerCtaLabel: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_FooterCtaLabel = footerCtaObject['label'];
    const footerCtaHref: Tests_ConfigDrift_ConfigDriftValidateThemeConfig_ValidatesAFullyPopulatedThemeConfigObject_FooterCtaHref = footerCtaObject['href'];

    strictEqual(footerCtaLabel, 'Get Started');
    strictEqual(footerCtaHref, '/docs/intro');

    return;
  });

  return;
});
