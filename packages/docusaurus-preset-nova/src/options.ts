import { Joi } from '@docusaurus/utils-validation';

import { LIB_REGEX_HEX_COLOR } from './lib/regex.js';
import { presetsIndexNames, presetsIndexPresets } from './presets/index.js';

import type {
  Options_ResolvePreset_BasePreset,
  Options_ResolvePreset_Options,
  Options_ResolvePreset_OverrideBorder,
  Options_ResolvePreset_OverrideDanger,
  Options_ResolvePreset_OverridePrimary,
  Options_ResolvePreset_OverrideSecondary,
  Options_ResolvePreset_OverrideText,
  Options_ResolvePreset_OverrideWarning,
  Options_ResolvePreset_ResolvedColorsAccent,
  Options_ResolvePreset_ResolvedColorsBorder,
  Options_ResolvePreset_ResolvedColorsDanger,
  Options_ResolvePreset_ResolvedColorsPrimary,
  Options_ResolvePreset_ResolvedColorsText,
  Options_ResolvePreset_ResolvedColorsWarning,
  Options_ResolvePreset_ResolvedFontsBody,
  Options_ResolvePreset_ResolvedFontsCode,
  Options_ResolvePreset_ResolvedFontsDisplay,
  Options_ResolvePreset_ResolvedFooter,
  Options_ResolvePreset_ResolvedLogo,
  Options_ResolvePreset_ResolvedNavbar,
  Options_ResolvePreset_Returns,
  Options_ValidateOptions_Data,
  Options_ValidateOptions_Returns,
  Options_ValidateThemeConfig_Data,
  Options_ValidateThemeConfig_Returns,
} from './types/options.d.ts';

/**
 * Options - Plugin Options Schema.
 *
 * Defines the Joi validation schema for the theme plugin options
 * including preset name, hex color values, optional overrides
 * for each preset configuration category, and custom CSS paths.
 *
 * @since 0.15.0
 */
const pluginOptionsSchema = Joi.object({
  preset: Joi.string()
    .valid(...presetsIndexNames)
    .required(),
  overrides: Joi.object({
    colors: Joi.object({
      primary: Joi.object({
        light: Joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
        dark: Joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
      }).optional(),
      secondary: Joi.object({
        light: Joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
        dark: Joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
      }).optional(),
      text: Joi.object({
        light: Joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
        dark: Joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
      }).optional(),
      border: Joi.object({
        light: Joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
        dark: Joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
      }).optional(),
      warning: Joi.object({
        light: Joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
        dark: Joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
      }).optional(),
      danger: Joi.object({
        light: Joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
        dark: Joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
      }).optional(),
    }).default(),
    fonts: Joi.object({
      display: Joi.string().optional(),
      body: Joi.string().optional(),
      code: Joi.string().optional(),
    }).default(),
    navbar: Joi.string().valid('bridge', 'canopy', 'monolith', 'compass').optional(),
    footer: Joi.string().valid('commons', 'embassy', 'ledger', 'launchpad').optional(),
  }).default(),
  plugins: Joi.object({
    docs: Joi.object().unknown(true).optional(),
    blog: Joi.alternatives()
      .try(Joi.boolean().valid(false), Joi.object().unknown(true))
      .optional(),
    pages: Joi.alternatives()
      .try(Joi.boolean().valid(false), Joi.object().unknown(true))
      .optional(),
    sitemap: Joi.alternatives()
      .try(Joi.boolean().valid(false), Joi.object().unknown(true))
      .optional(),
  }).default(),
  analytics: Joi.object({
    gtm: Joi.object({
      containerId: Joi.string().required(),
    }).optional(),
  }).default(),
  progressBar: Joi.alternatives()
    .try(
      Joi.boolean(),
      Joi.object().unknown(true),
    )
    .default(false),
  search: Joi.alternatives()
    .try(
      Joi.boolean().valid(false),
      Joi.object({
        language: Joi.array().items(Joi.string()).default(['en']),
        indexDocs: Joi.boolean().default(true),
        indexBlog: Joi.boolean().default(true),
        indexPages: Joi.boolean().default(false),
        hashed: Joi.boolean().default(true),
        searchResultLimits: Joi.number().integer().default(8),
        highlightSearchTermsOnTargetPage: Joi.boolean().default(true),
        searchBarShortcutKeymap: Joi.string().default('mod+k'),
        fuzzyMatchingDistance: Joi.number().integer().default(1),
        ignorePatterns: Joi.array().items(Joi.string()).default([]),
        docsRouteBasePath: Joi.string().default('docs'),
      }).unknown(true),
    )
    .default(false),
  iconSafelist: Joi.array().items(Joi.string()).default([]),
  maxBundleFileSize: Joi.alternatives()
    .try(
      Joi.number().positive(),
      Joi.boolean().valid(false),
    )
    .default(3),
});

/**
 * Options - Theme Config Schema.
 *
 * Defines the Joi validation schema for the theme configuration
 * section with site identity, color mode, navbar, docs sidebar,
 * blog layout, table of contents, announcement bar, and footer.
 *
 * @since 0.15.0
 */
const themeConfigSchema = Joi.object({
  site: Joi.object({
    logo: Joi.object({
      alt: Joi.string().optional(),
      src: Joi.object({
        light: Joi.string().optional(),
        dark: Joi.string().optional(),
      }).default(),
      href: Joi.string().optional(),
      target: Joi.string().optional(),
      rel: Joi.string().optional(),
      ariaLabel: Joi.string().optional(),
      wordmark: Joi.object({
        light: Joi.string().optional(),
        dark: Joi.string().optional(),
      }).default(),
    }).default(),
    image: Joi.string().allow('').default(''),
    metadata: Joi.array().default([]),
  }).default(),
  colorMode: Joi.object({
    defaultMode: Joi.string().valid('system', 'light', 'dark').default('system'),
    disableSwitch: Joi.boolean().default(false),
    respectPrefersColorScheme: Joi.forbidden(),
  }).unknown(true).default(),
  navbar: Joi.object({
    hideOnScroll: Joi.boolean().default(false),
    items: Joi.array().default([]),
  }).unknown(true).default(),
  docs: Joi.object({
    versionPersistence: Joi.string().default('localStorage'),
    sidebar: Joi.object({
      hideable: Joi.boolean().default(false),
      autoCollapseCategories: Joi.boolean().default(false),
    }).unknown(true).default(),
  }).unknown(true).default(),
  blog: Joi.object({
    sidebar: Joi.object({
      groupByYear: Joi.boolean().default(true),
    }).unknown(true).default(),
    layout: Joi.object({
      heading: Joi.string().default('Blog'),
      description: Joi.string().allow('').default(''),
    }).unknown(true).default(),
    share: Joi.object({
      platforms: Joi.array().items(Joi.string().valid('x', 'facebook', 'linkedin', 'reddit', 'copy')).default([]),
    }).unknown(true).default(),
  }).unknown(true).default(),
  tableOfContents: Joi.object({
    minHeadingLevel: Joi.number().integer().min(2).max(6).default(2),
    maxHeadingLevel: Joi.number().integer().min(2).max(6).default(3),
  }).unknown(true).default(),
  announcementBar: Joi.object({
    id: Joi.string().required(),
    content: Joi.string().required(),
    backgroundColor: Joi.string().optional(),
    textColor: Joi.string().optional(),
    isCloseable: Joi.boolean().default(true),
  }).optional(),
  backToTopButton: Joi.boolean().default(true),
  errorPages: Joi.object({
    notFound: Joi.object({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      backHomeLabel: Joi.string().optional(),
      backHomeHref: Joi.string().optional(),
    }).optional(),
    errorPageContent: Joi.object({
      title: Joi.string().optional(),
      retryLabel: Joi.string().optional(),
    }).optional(),
    error: Joi.object({
      retryLabel: Joi.string().optional(),
    }).optional(),
  }).optional(),
  footer: Joi.alternatives()
    .try(
      Joi.boolean().valid(false),
      Joi.object({
        cta: Joi.alternatives()
          .try(
            Joi.string(),
            Joi.object({
              label: Joi.string().required(),
              href: Joi.string().required(),
            }),
          )
          .optional(),
      }).unknown(true),
    )
    .default(false),
}).unknown(true);

/**
 * Options - Validate Options.
 *
 * Validates the raw plugin options object against the schema and
 * returns the normalized result with defaults applied for any
 * omitted fields.
 *
 * @param {Options_ValidateOptions_Data} data - Data.
 *
 * @returns {Options_ValidateOptions_Returns}
 *
 * @since 0.15.0
 */
export function validateOptions(data: Options_ValidateOptions_Data): Options_ValidateOptions_Returns {
  return data.validate(pluginOptionsSchema, data['options']);
}

/**
 * Options - Validate Theme Config.
 *
 * Validates the theme configuration section and merges it with the existing site-wide theme
 * configuration object.
 *
 * @param {Options_ValidateThemeConfig_Data} data - Data.
 *
 * @returns {Options_ValidateThemeConfig_Returns}
 *
 * @since 0.15.0
 */
export function validateThemeConfig(data: Options_ValidateThemeConfig_Data): Options_ValidateThemeConfig_Returns {
  return data.validate(themeConfigSchema, data['themeConfig']);
}

/**
 * Options - Resolve Preset.
 *
 * Merges the base preset configuration with any user-provided overrides to produce a fully
 * resolved preset object ready for CSS generation.
 *
 * @param {Options_ResolvePreset_Options} options - Options.
 *
 * @returns {Options_ResolvePreset_Returns}
 *
 * @since 0.15.0
 */
export function resolvePreset(options: Options_ResolvePreset_Options): Options_ResolvePreset_Returns {
  const basePreset: Options_ResolvePreset_BasePreset = presetsIndexPresets[options['preset']];

  const resolvedLogo: Options_ResolvePreset_ResolvedLogo = basePreset['logo'];

  const overridePrimary: Options_ResolvePreset_OverridePrimary = options['overrides']['colors']['primary'];
  const resolvedColorsPrimary: Options_ResolvePreset_ResolvedColorsPrimary = {
    light: (overridePrimary !== undefined && overridePrimary['light'] !== undefined) ? overridePrimary['light'] : basePreset['colors']['primary']['light'],
    dark: (overridePrimary !== undefined && overridePrimary['dark'] !== undefined) ? overridePrimary['dark'] : basePreset['colors']['primary']['dark'],
  };

  const overrideSecondary: Options_ResolvePreset_OverrideSecondary = options['overrides']['colors']['secondary'];
  const resolvedColorsAccent: Options_ResolvePreset_ResolvedColorsAccent = {
    light: (overrideSecondary !== undefined && overrideSecondary['light'] !== undefined) ? overrideSecondary['light'] : basePreset['colors']['accent']['light'],
    dark: (overrideSecondary !== undefined && overrideSecondary['dark'] !== undefined) ? overrideSecondary['dark'] : basePreset['colors']['accent']['dark'],
  };

  const overrideText: Options_ResolvePreset_OverrideText = options['overrides']['colors']['text'];
  const resolvedColorsText: Options_ResolvePreset_ResolvedColorsText = {
    light: (overrideText !== undefined && overrideText['light'] !== undefined) ? overrideText['light'] : basePreset['colors']['text']['light'],
    dark: (overrideText !== undefined && overrideText['dark'] !== undefined) ? overrideText['dark'] : basePreset['colors']['text']['dark'],
  };

  const overrideBorder: Options_ResolvePreset_OverrideBorder = options['overrides']['colors']['border'];
  const resolvedColorsBorder: Options_ResolvePreset_ResolvedColorsBorder = {
    light: (overrideBorder !== undefined && overrideBorder['light'] !== undefined) ? overrideBorder['light'] : basePreset['colors']['border']['light'],
    dark: (overrideBorder !== undefined && overrideBorder['dark'] !== undefined) ? overrideBorder['dark'] : basePreset['colors']['border']['dark'],
  };

  const overrideWarning: Options_ResolvePreset_OverrideWarning = options['overrides']['colors']['warning'];
  const resolvedColorsWarning: Options_ResolvePreset_ResolvedColorsWarning = {
    light: (overrideWarning !== undefined && overrideWarning['light'] !== undefined) ? overrideWarning['light'] : basePreset['colors']['warning']['light'],
    dark: (overrideWarning !== undefined && overrideWarning['dark'] !== undefined) ? overrideWarning['dark'] : basePreset['colors']['warning']['dark'],
  };

  const overrideDanger: Options_ResolvePreset_OverrideDanger = options['overrides']['colors']['danger'];
  const resolvedColorsDanger: Options_ResolvePreset_ResolvedColorsDanger = {
    light: (overrideDanger !== undefined && overrideDanger['light'] !== undefined) ? overrideDanger['light'] : basePreset['colors']['danger']['light'],
    dark: (overrideDanger !== undefined && overrideDanger['dark'] !== undefined) ? overrideDanger['dark'] : basePreset['colors']['danger']['dark'],
  };

  let resolvedFontsDisplay: Options_ResolvePreset_ResolvedFontsDisplay = basePreset['fonts']['display'];

  if (options['overrides']['fonts']['display'] !== undefined) {
    resolvedFontsDisplay = options['overrides']['fonts']['display'];
  }

  let resolvedFontsBody: Options_ResolvePreset_ResolvedFontsBody = basePreset['fonts']['body'];

  if (options['overrides']['fonts']['body'] !== undefined) {
    resolvedFontsBody = options['overrides']['fonts']['body'];
  }

  let resolvedFontsCode: Options_ResolvePreset_ResolvedFontsCode = basePreset['fonts']['code'];

  if (options['overrides']['fonts']['code'] !== undefined) {
    resolvedFontsCode = options['overrides']['fonts']['code'];
  }

  let resolvedNavbar: Options_ResolvePreset_ResolvedNavbar = basePreset['navbar'];

  if (options['overrides']['navbar'] !== undefined) {
    resolvedNavbar = options['overrides']['navbar'];
  }

  let resolvedFooter: Options_ResolvePreset_ResolvedFooter = basePreset['footer'];

  if (options['overrides']['footer'] !== undefined) {
    resolvedFooter = options['overrides']['footer'];
  }

  return {
    logo: resolvedLogo,
    colors: {
      primary: resolvedColorsPrimary,
      accent: resolvedColorsAccent,
      text: resolvedColorsText,
      border: resolvedColorsBorder,
      warning: resolvedColorsWarning,
      danger: resolvedColorsDanger,
    },
    fonts: {
      display: resolvedFontsDisplay,
      body: resolvedFontsBody,
      code: resolvedFontsCode,
    },
    shape: basePreset['shape'],
    depth: basePreset['depth'],
    motion: basePreset['motion'],
    navbar: resolvedNavbar,
    footer: resolvedFooter,
    cta: {
      contained: basePreset['cta']['contained'],
    },
  };
}
