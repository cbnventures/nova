import {
  joi,
  normalizePluginOptions,
  normalizeThemeConfig,
} from './lib/docusaurus-utils-validation.js';
import { progressBarDefaults } from './lib/progress-bar.js';
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
 * @since 0.37.0
 */
export const pluginOptionsSchema = joi.object({
  preset: joi.string()
    .valid(...presetsIndexNames)
    .required(),
  overrides: joi.object({
    colors: joi.object({
      primary: joi.object({
        light: joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
        dark: joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
      }).optional(),
      secondary: joi.object({
        light: joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
        dark: joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
      }).optional(),
      text: joi.object({
        light: joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
        dark: joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
      }).optional(),
      border: joi.object({
        light: joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
        dark: joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
      }).optional(),
      warning: joi.object({
        light: joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
        dark: joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
      }).optional(),
      danger: joi.object({
        light: joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
        dark: joi.string().pattern(LIB_REGEX_HEX_COLOR).optional(),
      }).optional(),
    }).default(),
    fonts: joi.object({
      display: joi.string().optional(),
      body: joi.string().optional(),
      code: joi.string().optional(),
    }).default(),
    navbar: joi.string().valid('bridge', 'canopy', 'monolith', 'compass').optional(),
    footer: joi.string().valid('commons', 'embassy', 'ledger', 'launchpad').optional(),
  }).default(),
  plugins: joi.object({
    docs: joi.object().unknown(true).optional(),
    blog: joi.alternatives()
      .try(joi.boolean().valid(false), joi.object().unknown(true))
      .optional(),
    pages: joi.alternatives()
      .try(joi.boolean().valid(false), joi.object().unknown(true))
      .optional(),
    sitemap: joi.alternatives()
      .try(joi.boolean().valid(false), joi.object().unknown(true))
      .optional(),
  }).default(),
  analytics: joi.object({
    gtm: joi.object({
      containerId: joi.string().required(),
    }).optional(),
  }).default(),
  persistentCache: joi.boolean().default(false),
  progressBar: joi.alternatives()
    .try(
      joi.boolean(),
      joi.object({
        minimum: joi.number().min(0).max(1).default(progressBarDefaults['minimum']),
        easing: joi.string().default(progressBarDefaults['easing']),
        positionUsing: joi.string().valid('', 'translate3d', 'translate', 'margin').default(progressBarDefaults['positionUsing']),
        speed: joi.number().integer().min(0).default(progressBarDefaults['speed']),
        trickle: joi.boolean().default(progressBarDefaults['trickle']),
        trickleRate: joi.number().min(0).max(1).default(progressBarDefaults['trickleRate']),
        trickleSpeed: joi.number().integer().min(0).default(progressBarDefaults['trickleSpeed']),
        showSpinner: joi.boolean().default(progressBarDefaults['showSpinner']),
        barSelector: joi.string().default(progressBarDefaults['barSelector']),
        spinnerSelector: joi.string().default(progressBarDefaults['spinnerSelector']),
        parent: joi.string().default(progressBarDefaults['parent']),
        template: joi.string().default(progressBarDefaults['template']),
      }).unknown(true),
    )
    .default(false),
  search: joi.alternatives()
    .try(
      joi.boolean().valid(false),
      joi.object({
        language: joi.array().items(joi.string()).default(['en']),
        indexDocs: joi.boolean().default(true),
        indexBlog: joi.boolean().default(true),
        indexPages: joi.boolean().default(false),
        hashed: joi.boolean().default(true),
        searchResultLimits: joi.number().integer().default(8),
        highlightSearchTermsOnTargetPage: joi.boolean().default(true),
        searchBarShortcutKeymap: joi.string().default('mod+k'),
        fuzzyMatchingDistance: joi.number().integer().default(1),
        ignorePatterns: joi.array().items(joi.string()).default([]),
        docsRouteBasePath: joi.string().default('docs'),
      }).unknown(true),
    )
    .default(false),
  iconSafelist: joi.array().items(joi.string()).default([]),
  maxBundleFileSize: joi.alternatives()
    .try(
      joi.number().positive(),
      joi.boolean().valid(false),
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
const themeConfigSchema = joi.object({
  site: joi.object({
    logo: joi.object({
      alt: joi.string().optional(),
      src: joi.object({
        light: joi.string().optional(),
        dark: joi.string().optional(),
      }).default(),
      href: joi.string().optional(),
      target: joi.string().optional(),
      rel: joi.string().optional(),
      ariaLabel: joi.string().optional(),
      wordmark: joi.object({
        light: joi.string().optional(),
        dark: joi.string().optional(),
      }).default(),
    }).default(),
    image: joi.string().allow('').default(''),
    metadata: joi.array().default([]),
  }).default(),
  colorMode: joi.object({
    defaultMode: joi.string().valid('system', 'light', 'dark').default('system'),
    disableSwitch: joi.boolean().default(false),
    respectPrefersColorScheme: joi.forbidden(),
  }).unknown(true).default(),
  navbar: joi.object({
    hideOnScroll: joi.boolean().default(false),
    items: joi.array().default([]),
  }).unknown(true).default(),
  docs: joi.object({
    versionPersistence: joi.string().default('localStorage'),
    sidebar: joi.object({
      hideable: joi.boolean().default(false),
      autoCollapseCategories: joi.boolean().default(false),
    }).unknown(true).default(),
  }).unknown(true).default(),
  blog: joi.object({
    sidebar: joi.object({
      groupByYear: joi.boolean().default(true),
    }).unknown(true).default(),
    layout: joi.object({
      heading: joi.string().default('Blog'),
      description: joi.string().allow('').default(''),
    }).unknown(true).default(),
    share: joi.object({
      platforms: joi.array().items(joi.string().valid('x', 'facebook', 'linkedin', 'reddit', 'copy')).default([]),
    }).unknown(true).default(),
  }).unknown(true).default(),
  tableOfContents: joi.object({
    minHeadingLevel: joi.number().integer().min(2).max(6).default(2),
    maxHeadingLevel: joi.number().integer().min(2).max(6).default(3),
  }).unknown(true).default(),
  announcementBar: joi.object({
    id: joi.string().required(),
    content: joi.string().required(),
    backgroundColor: joi.string().optional(),
    textColor: joi.string().optional(),
    isCloseable: joi.boolean().default(true),
  }).optional(),
  backToTopButton: joi.boolean().default(true),
  errorPages: joi.object({
    notFound: joi.object({
      title: joi.string().optional(),
      description: joi.string().optional(),
      backHomeLabel: joi.string().optional(),
      backHomeHref: joi.string().optional(),
    }).optional(),
    errorPageContent: joi.object({
      title: joi.string().optional(),
      retryLabel: joi.string().optional(),
    }).optional(),
    error: joi.object({
      retryLabel: joi.string().optional(),
    }).optional(),
  }).optional(),
  footer: joi.alternatives()
    .try(
      joi.boolean().valid(false),
      joi.object({
        cta: joi.alternatives()
          .try(
            joi.string(),
            joi.object({
              label: joi.string().required(),
              href: joi.string().required(),
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
 * Validates raw plugin options with the normalizer that owns the schema's Joi
 * instance, preventing linked consumers from mixing incompatible schemas.
 *
 * @param {Options_ValidateOptions_Data} data - Data.
 *
 * @returns {Options_ValidateOptions_Returns}
 *
 * @since 0.37.0
 */
export function validateOptions(data: Options_ValidateOptions_Data): Options_ValidateOptions_Returns {
  return normalizePluginOptions(pluginOptionsSchema, data['options']) as Options_ValidateOptions_Returns;
}

/**
 * Options - Validate Theme Config.
 *
 * Validates theme configuration with the normalizer that owns the schema's Joi
 * instance while retaining unknown configuration owned by other themes.
 *
 * @param {Options_ValidateThemeConfig_Data} data - Data.
 *
 * @returns {Options_ValidateThemeConfig_Returns}
 *
 * @since 0.37.0
 */
export function validateThemeConfig(data: Options_ValidateThemeConfig_Data): Options_ValidateThemeConfig_Returns {
  return normalizeThemeConfig(themeConfigSchema, data['themeConfig']) as Options_ValidateThemeConfig_Returns;
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
