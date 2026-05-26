import { deepStrictEqual, strictEqual, throws } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { resolvePreset, validateOptions, validateThemeConfig } from '../options.js';

import type {
  TestsOptionsJoiSchema,
  TestsOptionsJoiSchemaValidateResult,
  TestsOptionsPresetValue,
  TestsOptionsResolvedColorsAccent,
  TestsOptionsResolvedColorsPrimary,
  TestsOptionsResolvedFontsBody,
  TestsOptionsResolvedFontsDisplay,
  TestsOptionsResolvedFooter,
  TestsOptionsResolvedNavbar,
  TestsOptionsResolvePresetResult,
  TestsOptionsThemeConfigJoiSchema,
  TestsOptionsThemeConfigJoiSchemaValidateResult,
  TestsOptionsThemeConfigValidatedBlog,
  TestsOptionsThemeConfigValidatedBlogLayout,
  TestsOptionsThemeConfigValidatedBlogLayoutDescription,
  TestsOptionsThemeConfigValidatedBlogLayoutHeading,
  TestsOptionsThemeConfigValidatedErrorPages,
  TestsOptionsThemeConfigValidatedErrorPagesError,
  TestsOptionsThemeConfigValidatedErrorPagesErrorPageContent,
  TestsOptionsThemeConfigValidatedErrorPagesErrorPageContentTitle,
  TestsOptionsThemeConfigValidatedErrorPagesErrorRetryLabel,
  TestsOptionsThemeConfigValidatedErrorPagesNotFound,
  TestsOptionsThemeConfigValidatedErrorPagesNotFoundTitle,
  TestsOptionsThemeConfigValidatedNavbar,
  TestsOptionsThemeConfigValidatedNavbarHideOnScroll,
  TestsOptionsThemeConfigValidatedResult,
  TestsOptionsThemeConfigValidatedSite,
  TestsOptionsThemeConfigValidatedSiteMetadata,
  TestsOptionsThemeConfigValidatedSiteTitle,
  TestsOptionsValidatedResult,
} from '../types/tests/options.test.d.ts';

/**
 * Tests - Options - Validate Options.
 *
 * @since 0.15.0
 */
describe('validateOptions', async () => {
  it('rejects when preset is not provided', () => {
    throws(() => {
      validateOptions({
        validate: (schema, options) => {
          const joiSchema: TestsOptionsJoiSchema = schema as TestsOptionsJoiSchema;
          const validated: TestsOptionsJoiSchemaValidateResult = joiSchema.validate(options);

          if (validated['error'] !== undefined) {
            throw validated['error'];
          }

          return validated['value'] as TestsOptionsValidatedResult;
        },
        options: {},
      });

      return;
    });

    return;
  });

  it('returns defaults when only preset is provided', () => {
    const result: TestsOptionsValidatedResult = validateOptions({
      validate: (schema, options) => {
        const joiSchema: TestsOptionsJoiSchema = schema as TestsOptionsJoiSchema;
        const validated: TestsOptionsJoiSchemaValidateResult = joiSchema.validate(options);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as TestsOptionsValidatedResult;
      },
      options: {
        preset: 'foundry',
      },
    });

    const presetValue: TestsOptionsPresetValue = result['preset'];

    strictEqual(presetValue, 'foundry');

    return;
  });

  it('accepts valid preset name', () => {
    const result: TestsOptionsValidatedResult = validateOptions({
      validate: (schema, options) => {
        const joiSchema: TestsOptionsJoiSchema = schema as TestsOptionsJoiSchema;
        const validated: TestsOptionsJoiSchemaValidateResult = joiSchema.validate(options);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as TestsOptionsValidatedResult;
      },
      options: {
        preset: 'sentinel',
      },
    });

    const presetValue: TestsOptionsPresetValue = result['preset'];

    strictEqual(presetValue, 'sentinel');

    return;
  });

  it('rejects invalid preset name', () => {
    throws(() => {
      validateOptions({
        validate: (schema, options) => {
          const joiSchema: TestsOptionsJoiSchema = schema as TestsOptionsJoiSchema;
          const validated: TestsOptionsJoiSchemaValidateResult = joiSchema.validate(options);

          if (validated['error'] !== undefined) {
            throw validated['error'];
          }

          return validated['value'] as TestsOptionsValidatedResult;
        },
        options: {
          preset: 'nonexistent',
        },
      });

      return;
    });

    return;
  });

  it('rejects invalid hex color', () => {
    throws(() => {
      validateOptions({
        validate: (schema, options) => {
          const joiSchema: TestsOptionsJoiSchema = schema as TestsOptionsJoiSchema;
          const validated: TestsOptionsJoiSchemaValidateResult = joiSchema.validate(options);

          if (validated['error'] !== undefined) {
            throw validated['error'];
          }

          return validated['value'] as TestsOptionsValidatedResult;
        },
        options: {
          overrides: {
            colors: {
              primary: 'not-a-color',
            },
          },
        },
      });

      return;
    });

    return;
  });

  return;
});

/**
 * Tests - Options - Validate Theme Config.
 *
 * @since 0.15.0
 */
describe('validateThemeConfig', async () => {
  it('accepts site namespace with title and metadata', () => {
    const result: TestsOptionsThemeConfigValidatedResult = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: TestsOptionsThemeConfigJoiSchema = schema as TestsOptionsThemeConfigJoiSchema;
        const validated: TestsOptionsThemeConfigJoiSchemaValidateResult = joiSchema.validate(themeConfig);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as TestsOptionsThemeConfigValidatedResult;
      },
      themeConfig: {
        site: {
          title: 'Nova Docs',
          metadata: [{
            name: 'robots',
            content: 'noindex',
          }],
        },
      },
    });

    const site: TestsOptionsThemeConfigValidatedSite = result['site'] as TestsOptionsThemeConfigValidatedSite;
    const siteTitle: TestsOptionsThemeConfigValidatedSiteTitle = site['title'] as TestsOptionsThemeConfigValidatedSiteTitle;
    const siteMetadata: TestsOptionsThemeConfigValidatedSiteMetadata = site['metadata'] as TestsOptionsThemeConfigValidatedSiteMetadata;

    strictEqual(siteTitle, 'Nova Docs');
    strictEqual(siteMetadata.length, 1);

    return;
  });

  it('accepts blog layout instead of blogLayout', () => {
    const result: TestsOptionsThemeConfigValidatedResult = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: TestsOptionsThemeConfigJoiSchema = schema as TestsOptionsThemeConfigJoiSchema;
        const validated: TestsOptionsThemeConfigJoiSchemaValidateResult = joiSchema.validate(themeConfig);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as TestsOptionsThemeConfigValidatedResult;
      },
      themeConfig: {
        blog: {
          layout: {
            heading: 'Updates',
            description: 'Latest news.',
          },
        },
      },
    });

    const blog: TestsOptionsThemeConfigValidatedBlog = result['blog'] as TestsOptionsThemeConfigValidatedBlog;
    const blogLayout: TestsOptionsThemeConfigValidatedBlogLayout = blog['layout'] as TestsOptionsThemeConfigValidatedBlogLayout;
    const blogLayoutHeading: TestsOptionsThemeConfigValidatedBlogLayoutHeading = blogLayout['heading'] as TestsOptionsThemeConfigValidatedBlogLayoutHeading;
    const blogLayoutDescription: TestsOptionsThemeConfigValidatedBlogLayoutDescription = blogLayout['description'] as TestsOptionsThemeConfigValidatedBlogLayoutDescription;

    strictEqual(blogLayoutHeading, 'Updates');
    strictEqual(blogLayoutDescription, 'Latest news.');

    return;
  });

  it('accepts navbar hideOnScroll', () => {
    const result: TestsOptionsThemeConfigValidatedResult = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: TestsOptionsThemeConfigJoiSchema = schema as TestsOptionsThemeConfigJoiSchema;
        const validated: TestsOptionsThemeConfigJoiSchemaValidateResult = joiSchema.validate(themeConfig);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as TestsOptionsThemeConfigValidatedResult;
      },
      themeConfig: {
        navbar: {
          hideOnScroll: true,
        },
      },
    });

    const navbar: TestsOptionsThemeConfigValidatedNavbar = result['navbar'] as TestsOptionsThemeConfigValidatedNavbar;
    const navbarHideOnScroll: TestsOptionsThemeConfigValidatedNavbarHideOnScroll = navbar['hideOnScroll'] as TestsOptionsThemeConfigValidatedNavbarHideOnScroll;

    strictEqual(navbarHideOnScroll, true);

    return;
  });

  it('accepts errorPages with all surfaces and fields populated', () => {
    const result: TestsOptionsThemeConfigValidatedResult = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: TestsOptionsThemeConfigJoiSchema = schema as TestsOptionsThemeConfigJoiSchema;
        const validated: TestsOptionsThemeConfigJoiSchemaValidateResult = joiSchema.validate(themeConfig);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as TestsOptionsThemeConfigValidatedResult;
      },
      themeConfig: {
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
      },
    });

    const errorPages: TestsOptionsThemeConfigValidatedErrorPages = result['errorPages'] as TestsOptionsThemeConfigValidatedErrorPages;
    const notFound: TestsOptionsThemeConfigValidatedErrorPagesNotFound = errorPages['notFound'] as TestsOptionsThemeConfigValidatedErrorPagesNotFound;
    const notFoundTitle: TestsOptionsThemeConfigValidatedErrorPagesNotFoundTitle = notFound['title'] as TestsOptionsThemeConfigValidatedErrorPagesNotFoundTitle;
    const errorPageContent: TestsOptionsThemeConfigValidatedErrorPagesErrorPageContent = errorPages['errorPageContent'] as TestsOptionsThemeConfigValidatedErrorPagesErrorPageContent;
    const errorPageContentTitle: TestsOptionsThemeConfigValidatedErrorPagesErrorPageContentTitle = errorPageContent['title'] as TestsOptionsThemeConfigValidatedErrorPagesErrorPageContentTitle;
    const error: TestsOptionsThemeConfigValidatedErrorPagesError = errorPages['error'] as TestsOptionsThemeConfigValidatedErrorPagesError;
    const errorRetryLabel: TestsOptionsThemeConfigValidatedErrorPagesErrorRetryLabel = error['retryLabel'] as TestsOptionsThemeConfigValidatedErrorPagesErrorRetryLabel;

    strictEqual(notFoundTitle, 'Lost in deployment.');
    strictEqual(errorPageContentTitle, 'Pipeline interrupted.');
    strictEqual(errorRetryLabel, 'Restart');

    return;
  });

  it('accepts a partial errorPages config (single field)', () => {
    const result: TestsOptionsThemeConfigValidatedResult = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: TestsOptionsThemeConfigJoiSchema = schema as TestsOptionsThemeConfigJoiSchema;
        const validated: TestsOptionsThemeConfigJoiSchemaValidateResult = joiSchema.validate(themeConfig);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as TestsOptionsThemeConfigValidatedResult;
      },
      themeConfig: {
        errorPages: {
          notFound: {
            title: 'Signal lost.',
          },
        },
      },
    });

    const errorPages: TestsOptionsThemeConfigValidatedErrorPages = result['errorPages'] as TestsOptionsThemeConfigValidatedErrorPages;
    const notFound: TestsOptionsThemeConfigValidatedErrorPagesNotFound = errorPages['notFound'] as TestsOptionsThemeConfigValidatedErrorPagesNotFound;
    const notFoundTitle: TestsOptionsThemeConfigValidatedErrorPagesNotFoundTitle = notFound['title'] as TestsOptionsThemeConfigValidatedErrorPagesNotFoundTitle;

    strictEqual(notFoundTitle, 'Signal lost.');

    return;
  });

  it('accepts an empty errorPages object', () => {
    const result: TestsOptionsThemeConfigValidatedResult = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: TestsOptionsThemeConfigJoiSchema = schema as TestsOptionsThemeConfigJoiSchema;
        const validated: TestsOptionsThemeConfigJoiSchemaValidateResult = joiSchema.validate(themeConfig);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as TestsOptionsThemeConfigValidatedResult;
      },
      themeConfig: {
        errorPages: {},
      },
    });

    const errorPages: TestsOptionsThemeConfigValidatedErrorPages = result['errorPages'] as TestsOptionsThemeConfigValidatedErrorPages;

    strictEqual(typeof errorPages, 'object');

    return;
  });

  it('rejects errorPages.notFound.title when not a string', () => {
    throws(() => {
      validateThemeConfig({
        validate: (schema, themeConfig) => {
          const joiSchema: TestsOptionsThemeConfigJoiSchema = schema as TestsOptionsThemeConfigJoiSchema;
          const validated: TestsOptionsThemeConfigJoiSchemaValidateResult = joiSchema.validate(themeConfig);

          if (validated['error'] !== undefined) {
            throw validated['error'];
          }

          return validated['value'] as TestsOptionsThemeConfigValidatedResult;
        },
        themeConfig: {
          errorPages: {
            notFound: {
              title: 123,
            },
          },
        },
      });

      return;
    });

    return;
  });

  return;
});

/**
 * Tests - Options - Resolve Preset.
 *
 * @since 0.15.0
 */
describe('resolvePreset', async () => {
  it('returns base preset when no overrides are provided', () => {
    const result: TestsOptionsResolvePresetResult = resolvePreset({
      preset: 'foundry',
      overrides: {
        colors: {
          primary: undefined,
          secondary: undefined,
          text: undefined,
          border: undefined,
          warning: undefined,
          danger: undefined,
        },
        fonts: {
          display: undefined,
          body: undefined,
          code: undefined,
        },
        navbar: undefined,
        footer: undefined,
      },
      plugins: {
        docs: undefined,
        blog: undefined,
        pages: undefined,
        sitemap: undefined,
      },
      analytics: {
        gtm: undefined,
      },
      progressBar: true,
      search: false,
    });

    const resolvedFontsDisplay: TestsOptionsResolvedFontsDisplay = result['fonts']['display'];
    const resolvedFontsBody: TestsOptionsResolvedFontsBody = result['fonts']['body'];

    strictEqual(resolvedFontsDisplay, 'Plus Jakarta Sans');
    strictEqual(resolvedFontsBody, 'Inter');

    return;
  });

  it('applies font override when provided', () => {
    const result: TestsOptionsResolvePresetResult = resolvePreset({
      preset: 'foundry',
      overrides: {
        colors: {
          primary: undefined,
          secondary: undefined,
          text: undefined,
          border: undefined,
          warning: undefined,
          danger: undefined,
        },
        fonts: {
          display: 'Inter',
          body: undefined,
          code: undefined,
        },
        navbar: undefined,
        footer: undefined,
      },
      plugins: {
        docs: undefined,
        blog: undefined,
        pages: undefined,
        sitemap: undefined,
      },
      analytics: {
        gtm: undefined,
      },
      progressBar: true,
      search: false,
    });

    const resolvedFontsDisplay: TestsOptionsResolvedFontsDisplay = result['fonts']['display'];

    strictEqual(resolvedFontsDisplay, 'Inter');

    return;
  });

  it('applies color override when provided', () => {
    const result: TestsOptionsResolvePresetResult = resolvePreset({
      preset: 'foundry',
      overrides: {
        colors: {
          primary: {
            light: '#DC2626', dark: '#DC2626',
          },
          secondary: undefined,
          text: undefined,
          border: undefined,
          warning: undefined,
          danger: undefined,
        },
        fonts: {
          display: undefined,
          body: undefined,
          code: undefined,
        },
        navbar: undefined,
        footer: undefined,
      },
      plugins: {
        docs: undefined,
        blog: undefined,
        pages: undefined,
        sitemap: undefined,
      },
      analytics: {
        gtm: undefined,
      },
      progressBar: true,
      search: false,
    });

    const resolvedColorsPrimary: TestsOptionsResolvedColorsPrimary = result['colors']['primary'];
    const resolvedColorsAccent: TestsOptionsResolvedColorsAccent = result['colors']['accent'];

    deepStrictEqual(resolvedColorsPrimary, {
      light: '#DC2626', dark: '#DC2626',
    });
    deepStrictEqual(resolvedColorsAccent, {
      light: '#fbbf24', dark: '#fbbf24',
    });

    return;
  });

  it('applies navbar override when provided', () => {
    const result: TestsOptionsResolvePresetResult = resolvePreset({
      preset: 'foundry',
      overrides: {
        colors: {
          primary: undefined,
          secondary: undefined,
          text: undefined,
          border: undefined,
          warning: undefined,
          danger: undefined,
        },
        fonts: {
          display: undefined,
          body: undefined,
          code: undefined,
        },
        navbar: 'monolith',
        footer: undefined,
      },
      plugins: {
        docs: undefined,
        blog: undefined,
        pages: undefined,
        sitemap: undefined,
      },
      analytics: {
        gtm: undefined,
      },
      progressBar: true,
      search: false,
    });

    const resolvedNavbar: TestsOptionsResolvedNavbar = result['navbar'];
    const resolvedFooter: TestsOptionsResolvedFooter = result['footer'];

    strictEqual(resolvedNavbar, 'monolith');
    strictEqual(resolvedFooter, 'commons');

    return;
  });

  it('rejects invalid navbar variant', () => {
    throws(() => {
      validateOptions({
        validate: (schema, options) => {
          const joiSchema: TestsOptionsJoiSchema = schema as TestsOptionsJoiSchema;
          const validated: TestsOptionsJoiSchemaValidateResult = joiSchema.validate(options);

          if (validated['error'] !== undefined) {
            throw validated['error'];
          }

          return validated['value'] as TestsOptionsValidatedResult;
        },
        options: {
          overrides: {
            navbar: 'nonexistent',
          },
        },
      });

      return;
    });

    return;
  });

  return;
});
