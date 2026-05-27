import { deepStrictEqual, strictEqual, throws } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { resolvePreset, validateOptions, validateThemeConfig } from '../options.js';

import type {
  Tests_Options_JoiSchema,
  Tests_Options_JoiSchemaValidateResult,
  Tests_Options_PresetValue,
  Tests_Options_ResolvedColorsAccent,
  Tests_Options_ResolvedColorsPrimary,
  Tests_Options_ResolvedFontsBody,
  Tests_Options_ResolvedFontsDisplay,
  Tests_Options_ResolvedFooter,
  Tests_Options_ResolvedNavbar,
  Tests_Options_ResolvePreset_Result,
  Tests_Options_ThemeConfigJoiSchema,
  Tests_Options_ThemeConfigJoiSchemaValidateResult,
  Tests_Options_ThemeConfigValidatedBlog,
  Tests_Options_ThemeConfigValidatedBlogLayout,
  Tests_Options_ThemeConfigValidatedBlogLayoutDescription,
  Tests_Options_ThemeConfigValidatedBlogLayoutHeading,
  Tests_Options_ThemeConfigValidatedErrorPages,
  Tests_Options_ThemeConfigValidatedErrorPagesError,
  Tests_Options_ThemeConfigValidatedErrorPagesErrorPageContent,
  Tests_Options_ThemeConfigValidatedErrorPagesErrorPageContentTitle,
  Tests_Options_ThemeConfigValidatedErrorPagesErrorRetryLabel,
  Tests_Options_ThemeConfigValidatedErrorPagesNotFound,
  Tests_Options_ThemeConfigValidatedErrorPagesNotFoundTitle,
  Tests_Options_ThemeConfigValidatedNavbar,
  Tests_Options_ThemeConfigValidatedNavbarHideOnScroll,
  Tests_Options_ThemeConfigValidatedResult,
  Tests_Options_ThemeConfigValidatedSite,
  Tests_Options_ThemeConfigValidatedSiteMetadata,
  Tests_Options_ThemeConfigValidatedSiteTitle,
  Tests_Options_ValidatedResult,
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
          const joiSchema: Tests_Options_JoiSchema = schema as Tests_Options_JoiSchema;
          const validated: Tests_Options_JoiSchemaValidateResult = joiSchema.validate(options);

          if (validated['error'] !== undefined) {
            throw validated['error'];
          }

          return validated['value'] as Tests_Options_ValidatedResult;
        },
        options: {},
      });

      return;
    });

    return;
  });

  it('returns defaults when only preset is provided', () => {
    const result: Tests_Options_ValidatedResult = validateOptions({
      validate: (schema, options) => {
        const joiSchema: Tests_Options_JoiSchema = schema as Tests_Options_JoiSchema;
        const validated: Tests_Options_JoiSchemaValidateResult = joiSchema.validate(options);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as Tests_Options_ValidatedResult;
      },
      options: {
        preset: 'foundry',
      },
    });

    const presetValue: Tests_Options_PresetValue = result['preset'];

    strictEqual(presetValue, 'foundry');

    return;
  });

  it('accepts valid preset name', () => {
    const result: Tests_Options_ValidatedResult = validateOptions({
      validate: (schema, options) => {
        const joiSchema: Tests_Options_JoiSchema = schema as Tests_Options_JoiSchema;
        const validated: Tests_Options_JoiSchemaValidateResult = joiSchema.validate(options);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as Tests_Options_ValidatedResult;
      },
      options: {
        preset: 'sentinel',
      },
    });

    const presetValue: Tests_Options_PresetValue = result['preset'];

    strictEqual(presetValue, 'sentinel');

    return;
  });

  it('rejects invalid preset name', () => {
    throws(() => {
      validateOptions({
        validate: (schema, options) => {
          const joiSchema: Tests_Options_JoiSchema = schema as Tests_Options_JoiSchema;
          const validated: Tests_Options_JoiSchemaValidateResult = joiSchema.validate(options);

          if (validated['error'] !== undefined) {
            throw validated['error'];
          }

          return validated['value'] as Tests_Options_ValidatedResult;
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
          const joiSchema: Tests_Options_JoiSchema = schema as Tests_Options_JoiSchema;
          const validated: Tests_Options_JoiSchemaValidateResult = joiSchema.validate(options);

          if (validated['error'] !== undefined) {
            throw validated['error'];
          }

          return validated['value'] as Tests_Options_ValidatedResult;
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
    const result: Tests_Options_ThemeConfigValidatedResult = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: Tests_Options_ThemeConfigJoiSchema = schema as Tests_Options_ThemeConfigJoiSchema;
        const validated: Tests_Options_ThemeConfigJoiSchemaValidateResult = joiSchema.validate(themeConfig);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as Tests_Options_ThemeConfigValidatedResult;
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

    const site: Tests_Options_ThemeConfigValidatedSite = result['site'] as Tests_Options_ThemeConfigValidatedSite;
    const siteTitle: Tests_Options_ThemeConfigValidatedSiteTitle = site['title'] as Tests_Options_ThemeConfigValidatedSiteTitle;
    const siteMetadata: Tests_Options_ThemeConfigValidatedSiteMetadata = site['metadata'] as Tests_Options_ThemeConfigValidatedSiteMetadata;

    strictEqual(siteTitle, 'Nova Docs');
    strictEqual(siteMetadata.length, 1);

    return;
  });

  it('accepts blog layout instead of blogLayout', () => {
    const result: Tests_Options_ThemeConfigValidatedResult = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: Tests_Options_ThemeConfigJoiSchema = schema as Tests_Options_ThemeConfigJoiSchema;
        const validated: Tests_Options_ThemeConfigJoiSchemaValidateResult = joiSchema.validate(themeConfig);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as Tests_Options_ThemeConfigValidatedResult;
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

    const blog: Tests_Options_ThemeConfigValidatedBlog = result['blog'] as Tests_Options_ThemeConfigValidatedBlog;
    const blogLayout: Tests_Options_ThemeConfigValidatedBlogLayout = blog['layout'] as Tests_Options_ThemeConfigValidatedBlogLayout;
    const blogLayoutHeading: Tests_Options_ThemeConfigValidatedBlogLayoutHeading = blogLayout['heading'] as Tests_Options_ThemeConfigValidatedBlogLayoutHeading;
    const blogLayoutDescription: Tests_Options_ThemeConfigValidatedBlogLayoutDescription = blogLayout['description'] as Tests_Options_ThemeConfigValidatedBlogLayoutDescription;

    strictEqual(blogLayoutHeading, 'Updates');
    strictEqual(blogLayoutDescription, 'Latest news.');

    return;
  });

  it('accepts navbar hideOnScroll', () => {
    const result: Tests_Options_ThemeConfigValidatedResult = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: Tests_Options_ThemeConfigJoiSchema = schema as Tests_Options_ThemeConfigJoiSchema;
        const validated: Tests_Options_ThemeConfigJoiSchemaValidateResult = joiSchema.validate(themeConfig);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as Tests_Options_ThemeConfigValidatedResult;
      },
      themeConfig: {
        navbar: {
          hideOnScroll: true,
        },
      },
    });

    const navbar: Tests_Options_ThemeConfigValidatedNavbar = result['navbar'] as Tests_Options_ThemeConfigValidatedNavbar;
    const navbarHideOnScroll: Tests_Options_ThemeConfigValidatedNavbarHideOnScroll = navbar['hideOnScroll'] as Tests_Options_ThemeConfigValidatedNavbarHideOnScroll;

    strictEqual(navbarHideOnScroll, true);

    return;
  });

  it('accepts errorPages with all surfaces and fields populated', () => {
    const result: Tests_Options_ThemeConfigValidatedResult = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: Tests_Options_ThemeConfigJoiSchema = schema as Tests_Options_ThemeConfigJoiSchema;
        const validated: Tests_Options_ThemeConfigJoiSchemaValidateResult = joiSchema.validate(themeConfig);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as Tests_Options_ThemeConfigValidatedResult;
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

    const errorPages: Tests_Options_ThemeConfigValidatedErrorPages = result['errorPages'] as Tests_Options_ThemeConfigValidatedErrorPages;
    const notFound: Tests_Options_ThemeConfigValidatedErrorPagesNotFound = errorPages['notFound'] as Tests_Options_ThemeConfigValidatedErrorPagesNotFound;
    const notFoundTitle: Tests_Options_ThemeConfigValidatedErrorPagesNotFoundTitle = notFound['title'] as Tests_Options_ThemeConfigValidatedErrorPagesNotFoundTitle;
    const errorPageContent: Tests_Options_ThemeConfigValidatedErrorPagesErrorPageContent = errorPages['errorPageContent'] as Tests_Options_ThemeConfigValidatedErrorPagesErrorPageContent;
    const errorPageContentTitle: Tests_Options_ThemeConfigValidatedErrorPagesErrorPageContentTitle = errorPageContent['title'] as Tests_Options_ThemeConfigValidatedErrorPagesErrorPageContentTitle;
    const error: Tests_Options_ThemeConfigValidatedErrorPagesError = errorPages['error'] as Tests_Options_ThemeConfigValidatedErrorPagesError;
    const errorRetryLabel: Tests_Options_ThemeConfigValidatedErrorPagesErrorRetryLabel = error['retryLabel'] as Tests_Options_ThemeConfigValidatedErrorPagesErrorRetryLabel;

    strictEqual(notFoundTitle, 'Lost in deployment.');
    strictEqual(errorPageContentTitle, 'Pipeline interrupted.');
    strictEqual(errorRetryLabel, 'Restart');

    return;
  });

  it('accepts a partial errorPages config (single field)', () => {
    const result: Tests_Options_ThemeConfigValidatedResult = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: Tests_Options_ThemeConfigJoiSchema = schema as Tests_Options_ThemeConfigJoiSchema;
        const validated: Tests_Options_ThemeConfigJoiSchemaValidateResult = joiSchema.validate(themeConfig);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as Tests_Options_ThemeConfigValidatedResult;
      },
      themeConfig: {
        errorPages: {
          notFound: {
            title: 'Signal lost.',
          },
        },
      },
    });

    const errorPages: Tests_Options_ThemeConfigValidatedErrorPages = result['errorPages'] as Tests_Options_ThemeConfigValidatedErrorPages;
    const notFound: Tests_Options_ThemeConfigValidatedErrorPagesNotFound = errorPages['notFound'] as Tests_Options_ThemeConfigValidatedErrorPagesNotFound;
    const notFoundTitle: Tests_Options_ThemeConfigValidatedErrorPagesNotFoundTitle = notFound['title'] as Tests_Options_ThemeConfigValidatedErrorPagesNotFoundTitle;

    strictEqual(notFoundTitle, 'Signal lost.');

    return;
  });

  it('accepts an empty errorPages object', () => {
    const result: Tests_Options_ThemeConfigValidatedResult = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: Tests_Options_ThemeConfigJoiSchema = schema as Tests_Options_ThemeConfigJoiSchema;
        const validated: Tests_Options_ThemeConfigJoiSchemaValidateResult = joiSchema.validate(themeConfig);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as Tests_Options_ThemeConfigValidatedResult;
      },
      themeConfig: {
        errorPages: {},
      },
    });

    const errorPages: Tests_Options_ThemeConfigValidatedErrorPages = result['errorPages'] as Tests_Options_ThemeConfigValidatedErrorPages;

    strictEqual(typeof errorPages, 'object');

    return;
  });

  it('rejects errorPages.notFound.title when not a string', () => {
    throws(() => {
      validateThemeConfig({
        validate: (schema, themeConfig) => {
          const joiSchema: Tests_Options_ThemeConfigJoiSchema = schema as Tests_Options_ThemeConfigJoiSchema;
          const validated: Tests_Options_ThemeConfigJoiSchemaValidateResult = joiSchema.validate(themeConfig);

          if (validated['error'] !== undefined) {
            throw validated['error'];
          }

          return validated['value'] as Tests_Options_ThemeConfigValidatedResult;
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
    const result: Tests_Options_ResolvePreset_Result = resolvePreset({
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

    const resolvedFontsDisplay: Tests_Options_ResolvedFontsDisplay = result['fonts']['display'];
    const resolvedFontsBody: Tests_Options_ResolvedFontsBody = result['fonts']['body'];

    strictEqual(resolvedFontsDisplay, 'Plus Jakarta Sans');
    strictEqual(resolvedFontsBody, 'Inter');

    return;
  });

  it('applies font override when provided', () => {
    const result: Tests_Options_ResolvePreset_Result = resolvePreset({
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

    const resolvedFontsDisplay: Tests_Options_ResolvedFontsDisplay = result['fonts']['display'];

    strictEqual(resolvedFontsDisplay, 'Inter');

    return;
  });

  it('applies color override when provided', () => {
    const result: Tests_Options_ResolvePreset_Result = resolvePreset({
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

    const resolvedColorsPrimary: Tests_Options_ResolvedColorsPrimary = result['colors']['primary'];
    const resolvedColorsAccent: Tests_Options_ResolvedColorsAccent = result['colors']['accent'];

    deepStrictEqual(resolvedColorsPrimary, {
      light: '#DC2626', dark: '#DC2626',
    });
    deepStrictEqual(resolvedColorsAccent, {
      light: '#fbbf24', dark: '#fbbf24',
    });

    return;
  });

  it('applies navbar override when provided', () => {
    const result: Tests_Options_ResolvePreset_Result = resolvePreset({
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

    const resolvedNavbar: Tests_Options_ResolvedNavbar = result['navbar'];
    const resolvedFooter: Tests_Options_ResolvedFooter = result['footer'];

    strictEqual(resolvedNavbar, 'monolith');
    strictEqual(resolvedFooter, 'commons');

    return;
  });

  it('rejects invalid navbar variant', () => {
    throws(() => {
      validateOptions({
        validate: (schema, options) => {
          const joiSchema: Tests_Options_JoiSchema = schema as Tests_Options_JoiSchema;
          const validated: Tests_Options_JoiSchemaValidateResult = joiSchema.validate(options);

          if (validated['error'] !== undefined) {
            throw validated['error'];
          }

          return validated['value'] as Tests_Options_ValidatedResult;
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
