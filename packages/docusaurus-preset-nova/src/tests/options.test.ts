import { deepStrictEqual, strictEqual, throws } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { resolvePreset, validateOptions, validateThemeConfig } from '../options.js';

import type {
  Tests_Options_PresetValue,
  Tests_Options_ResolvedColorsAccent,
  Tests_Options_ResolvedColorsPrimary,
  Tests_Options_ResolvedFontsBody,
  Tests_Options_ResolvedFontsDisplay,
  Tests_Options_ResolvedFooter,
  Tests_Options_ResolvedNavbar,
  Tests_Options_ResolvePreset_AppliesColorOverrideWhenProvided_Result,
  Tests_Options_ResolvePreset_AppliesFontOverrideWhenProvided_Result,
  Tests_Options_ResolvePreset_AppliesNavbarOverrideWhenProvided_Result,
  Tests_Options_ResolvePreset_RejectsInvalidNavbarVariant_JoiSchema,
  Tests_Options_ResolvePreset_RejectsInvalidNavbarVariant_Validated,
  Tests_Options_ResolvePreset_ReturnsBasePresetWhenNoOverridesAreProvided_Result,
  Tests_Options_ThemeConfigValidatedResult,
  Tests_Options_ValidatedResult,
  Tests_Options_ValidateOptions_AcceptsValidPresetName_JoiSchema,
  Tests_Options_ValidateOptions_AcceptsValidPresetName_Result,
  Tests_Options_ValidateOptions_AcceptsValidPresetName_Validated,
  Tests_Options_ValidateOptions_RejectsInvalidHexColor_JoiSchema,
  Tests_Options_ValidateOptions_RejectsInvalidHexColor_Validated,
  Tests_Options_ValidateOptions_RejectsInvalidPresetName_JoiSchema,
  Tests_Options_ValidateOptions_RejectsInvalidPresetName_Validated,
  Tests_Options_ValidateOptions_RejectsWhenPresetIsNotProvided_JoiSchema,
  Tests_Options_ValidateOptions_RejectsWhenPresetIsNotProvided_Validated,
  Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_JoiSchema,
  Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Result,
  Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Validated,
  Tests_Options_ValidateThemeConfig_AcceptsAnEmptyErrorPagesObject_ErrorPages,
  Tests_Options_ValidateThemeConfig_AcceptsAnEmptyErrorPagesObject_JoiSchema,
  Tests_Options_ValidateThemeConfig_AcceptsAnEmptyErrorPagesObject_Result,
  Tests_Options_ValidateThemeConfig_AcceptsAnEmptyErrorPagesObject_Validated,
  Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_ErrorPages,
  Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_JoiSchema,
  Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_NotFound,
  Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_NotFoundTitle,
  Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_Result,
  Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_Validated,
  Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_Blog,
  Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_BlogLayout,
  Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_BlogLayoutDescription,
  Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_BlogLayoutHeading,
  Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_JoiSchema,
  Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_Result,
  Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_Validated,
  Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_Error,
  Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_ErrorPageContent,
  Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_ErrorPageContentTitle,
  Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_ErrorPages,
  Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_ErrorRetryLabel,
  Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_JoiSchema,
  Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_NotFound,
  Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_NotFoundTitle,
  Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_Result,
  Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_Validated,
  Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_JoiSchema,
  Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_Navbar,
  Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_NavbarHideOnScroll,
  Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_Result,
  Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_Validated,
  Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_JoiSchema,
  Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_Result,
  Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_Site,
  Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_SiteMetadata,
  Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_Validated,
  Tests_Options_ValidateThemeConfig_RejectsErrorPagesNotFoundTitleWhenNotAString_JoiSchema,
  Tests_Options_ValidateThemeConfig_RejectsErrorPagesNotFoundTitleWhenNotAString_Validated,
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
          const joiSchema: Tests_Options_ValidateOptions_RejectsWhenPresetIsNotProvided_JoiSchema = schema as Tests_Options_ValidateOptions_RejectsWhenPresetIsNotProvided_JoiSchema;
          const validated: Tests_Options_ValidateOptions_RejectsWhenPresetIsNotProvided_Validated = joiSchema.validate(options);

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
    const result: Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Result = validateOptions({
      validate: (schema, options) => {
        const joiSchema: Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_JoiSchema = schema as Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_JoiSchema;
        const validated: Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Validated = joiSchema.validate(options);

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
    const result: Tests_Options_ValidateOptions_AcceptsValidPresetName_Result = validateOptions({
      validate: (schema, options) => {
        const joiSchema: Tests_Options_ValidateOptions_AcceptsValidPresetName_JoiSchema = schema as Tests_Options_ValidateOptions_AcceptsValidPresetName_JoiSchema;
        const validated: Tests_Options_ValidateOptions_AcceptsValidPresetName_Validated = joiSchema.validate(options);

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
          const joiSchema: Tests_Options_ValidateOptions_RejectsInvalidPresetName_JoiSchema = schema as Tests_Options_ValidateOptions_RejectsInvalidPresetName_JoiSchema;
          const validated: Tests_Options_ValidateOptions_RejectsInvalidPresetName_Validated = joiSchema.validate(options);

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
          const joiSchema: Tests_Options_ValidateOptions_RejectsInvalidHexColor_JoiSchema = schema as Tests_Options_ValidateOptions_RejectsInvalidHexColor_JoiSchema;
          const validated: Tests_Options_ValidateOptions_RejectsInvalidHexColor_Validated = joiSchema.validate(options);

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
    const result: Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_Result = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_JoiSchema = schema as Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_JoiSchema;
        const validated: Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_Validated = joiSchema.validate(themeConfig);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as Tests_Options_ThemeConfigValidatedResult;
      },
      themeConfig: {
        site: {
          metadata: [{
            name: 'robots',
            content: 'noindex',
          }],
        },
      },
    });

    const site: Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_Site = result['site'] as Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_Site;
    const siteMetadata: Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_SiteMetadata = site['metadata'] as Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_SiteMetadata;

    strictEqual(siteMetadata.length, 1);

    return;
  });

  it('accepts blog layout instead of blogLayout', () => {
    const result: Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_Result = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_JoiSchema = schema as Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_JoiSchema;
        const validated: Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_Validated = joiSchema.validate(themeConfig);

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

    const blog: Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_Blog = result['blog'] as Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_Blog;
    const blogLayout: Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_BlogLayout = blog['layout'] as Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_BlogLayout;
    const blogLayoutHeading: Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_BlogLayoutHeading = blogLayout['heading'] as Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_BlogLayoutHeading;
    const blogLayoutDescription: Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_BlogLayoutDescription = blogLayout['description'] as Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_BlogLayoutDescription;

    strictEqual(blogLayoutHeading, 'Updates');
    strictEqual(blogLayoutDescription, 'Latest news.');

    return;
  });

  it('accepts navbar hideOnScroll', () => {
    const result: Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_Result = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_JoiSchema = schema as Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_JoiSchema;
        const validated: Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_Validated = joiSchema.validate(themeConfig);

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

    const navbar: Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_Navbar = result['navbar'] as Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_Navbar;
    const navbarHideOnScroll: Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_NavbarHideOnScroll = navbar['hideOnScroll'] as Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_NavbarHideOnScroll;

    strictEqual(navbarHideOnScroll, true);

    return;
  });

  it('accepts errorPages with all surfaces and fields populated', () => {
    const result: Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_Result = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_JoiSchema = schema as Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_JoiSchema;
        const validated: Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_Validated = joiSchema.validate(themeConfig);

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

    const errorPages: Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_ErrorPages = result['errorPages'] as Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_ErrorPages;
    const notFound: Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_NotFound = errorPages['notFound'] as Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_NotFound;
    const notFoundTitle: Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_NotFoundTitle = notFound['title'] as Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_NotFoundTitle;
    const errorPageContent: Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_ErrorPageContent = errorPages['errorPageContent'] as Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_ErrorPageContent;
    const errorPageContentTitle: Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_ErrorPageContentTitle = errorPageContent['title'] as Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_ErrorPageContentTitle;
    const error: Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_Error = errorPages['error'] as Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_Error;
    const errorRetryLabel: Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_ErrorRetryLabel = error['retryLabel'] as Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_ErrorRetryLabel;

    strictEqual(notFoundTitle, 'Lost in deployment.');
    strictEqual(errorPageContentTitle, 'Pipeline interrupted.');
    strictEqual(errorRetryLabel, 'Restart');

    return;
  });

  it('accepts a partial errorPages config (single field)', () => {
    const result: Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_Result = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_JoiSchema = schema as Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_JoiSchema;
        const validated: Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_Validated = joiSchema.validate(themeConfig);

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

    const errorPages: Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_ErrorPages = result['errorPages'] as Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_ErrorPages;
    const notFound: Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_NotFound = errorPages['notFound'] as Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_NotFound;
    const notFoundTitle: Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_NotFoundTitle = notFound['title'] as Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_NotFoundTitle;

    strictEqual(notFoundTitle, 'Signal lost.');

    return;
  });

  it('accepts an empty errorPages object', () => {
    const result: Tests_Options_ValidateThemeConfig_AcceptsAnEmptyErrorPagesObject_Result = validateThemeConfig({
      validate: (schema, themeConfig) => {
        const joiSchema: Tests_Options_ValidateThemeConfig_AcceptsAnEmptyErrorPagesObject_JoiSchema = schema as Tests_Options_ValidateThemeConfig_AcceptsAnEmptyErrorPagesObject_JoiSchema;
        const validated: Tests_Options_ValidateThemeConfig_AcceptsAnEmptyErrorPagesObject_Validated = joiSchema.validate(themeConfig);

        if (validated['error'] !== undefined) {
          throw validated['error'];
        }

        return validated['value'] as Tests_Options_ThemeConfigValidatedResult;
      },
      themeConfig: {
        errorPages: {},
      },
    });

    const errorPages: Tests_Options_ValidateThemeConfig_AcceptsAnEmptyErrorPagesObject_ErrorPages = result['errorPages'] as Tests_Options_ValidateThemeConfig_AcceptsAnEmptyErrorPagesObject_ErrorPages;

    strictEqual(typeof errorPages, 'object');

    return;
  });

  it('rejects errorPages.notFound.title when not a string', () => {
    throws(() => {
      validateThemeConfig({
        validate: (schema, themeConfig) => {
          const joiSchema: Tests_Options_ValidateThemeConfig_RejectsErrorPagesNotFoundTitleWhenNotAString_JoiSchema = schema as Tests_Options_ValidateThemeConfig_RejectsErrorPagesNotFoundTitleWhenNotAString_JoiSchema;
          const validated: Tests_Options_ValidateThemeConfig_RejectsErrorPagesNotFoundTitleWhenNotAString_Validated = joiSchema.validate(themeConfig);

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
    const result: Tests_Options_ResolvePreset_ReturnsBasePresetWhenNoOverridesAreProvided_Result = resolvePreset({
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
    const result: Tests_Options_ResolvePreset_AppliesFontOverrideWhenProvided_Result = resolvePreset({
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
    const result: Tests_Options_ResolvePreset_AppliesColorOverrideWhenProvided_Result = resolvePreset({
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
    const result: Tests_Options_ResolvePreset_AppliesNavbarOverrideWhenProvided_Result = resolvePreset({
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
          const joiSchema: Tests_Options_ResolvePreset_RejectsInvalidNavbarVariant_JoiSchema = schema as Tests_Options_ResolvePreset_RejectsInvalidNavbarVariant_JoiSchema;
          const validated: Tests_Options_ResolvePreset_RejectsInvalidNavbarVariant_Validated = joiSchema.validate(options);

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
