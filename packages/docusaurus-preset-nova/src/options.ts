import { Joi } from '@docusaurus/utils-validation';

import { LIB_REGEX_HEX_COLOR } from './lib/regex.js';
import { presetsIndexNames, presetsIndexPresets } from './presets/index.js';

import type {
  OptionsResolvePresetBasePreset,
  OptionsResolvePresetOptions,
  OptionsResolvePresetResolvedColorsAccent,
  OptionsResolvePresetResolvedColorsNeutral,
  OptionsResolvePresetResolvedColorsPrimary,
  OptionsResolvePresetResolvedDepthCards,
  OptionsResolvePresetResolvedDepthCodeBlocks,
  OptionsResolvePresetResolvedFontsBody,
  OptionsResolvePresetResolvedFontsCode,
  OptionsResolvePresetResolvedFontsDisplay,
  OptionsResolvePresetResolvedFooter,
  OptionsResolvePresetResolvedLogo,
  OptionsResolvePresetResolvedMotionHoverEffects,
  OptionsResolvePresetResolvedMotionSpeed,
  OptionsResolvePresetResolvedMotionStaggeredReveals,
  OptionsResolvePresetResolvedNavbar,
  OptionsResolvePresetResolvedShapeDensity,
  OptionsResolvePresetResolvedShapeRadius,
  OptionsResolvePresetReturns,
  OptionsValidateOptionsData,
  OptionsValidateOptionsReturns,
  OptionsValidateThemeConfigData,
  OptionsValidateThemeConfigReturns,
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
      primary: Joi.string()
        .pattern(LIB_REGEX_HEX_COLOR)
        .optional(),
      accent: Joi.string()
        .pattern(LIB_REGEX_HEX_COLOR)
        .optional(),
      neutral: Joi.string()
        .pattern(LIB_REGEX_HEX_COLOR)
        .optional(),
    }).default(),
    fonts: Joi.object({
      display: Joi.string().optional(),
      body: Joi.string().optional(),
      code: Joi.string().optional(),
    }).default(),
    shape: Joi.object({
      radius: Joi.string().valid('sharp', 'rounded', 'pill').optional(),
      density: Joi.string().valid('compact', 'comfortable', 'spacious').optional(),
    }).default(),
    depth: Joi.object({
      cards: Joi.string().valid('flat', 'elevated', 'glass').optional(),
      codeBlocks: Joi.string().valid('flat', 'bordered', 'elevated').optional(),
    }).default(),
    motion: Joi.object({
      speed: Joi.string().valid('none', 'subtle', 'normal', 'expressive').optional(),
      staggeredReveals: Joi.boolean().optional(),
      hoverEffects: Joi.boolean().optional(),
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
    title: Joi.string().allow('').default(''),
    logo: Joi.object({
      alt: Joi.string().optional(),
      src: Joi.string().optional(),
      srcDark: Joi.string().optional(),
      href: Joi.string().optional(),
      wordmark: Joi.string().optional(),
      wordmarkDark: Joi.string().optional(),
      title: Joi.string().optional(),
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
  footer: Joi.alternatives()
    .try(
      Joi.boolean().valid(false),
      Joi.object({
        cta: Joi.string().optional(),
      }).unknown(true),
    )
    .default(false),
  mermaid: Joi.object({
    theme: Joi.object({
      dark: Joi.string().default('dark'),
      light: Joi.string().default('default'),
    }).default(),
    options: Joi.object().unknown(true).default({}),
  }).default(),
}).unknown(true);

/**
 * Options - Validate Options.
 *
 * Validates the raw plugin options object against the schema and
 * returns the normalized result with defaults applied for any
 * omitted fields.
 *
 * @param {OptionsValidateOptionsData} data - Data.
 *
 * @returns {OptionsValidateOptionsReturns}
 *
 * @since 0.15.0
 */
export function validateOptions(data: OptionsValidateOptionsData): OptionsValidateOptionsReturns {
  return data.validate(pluginOptionsSchema, data['options']);
}

/**
 * Options - Validate Theme Config.
 *
 * Validates the theme configuration section and merges it with the existing site-wide theme
 * configuration object.
 *
 * @param {OptionsValidateThemeConfigData} data - Data.
 *
 * @returns {OptionsValidateThemeConfigReturns}
 *
 * @since 0.15.0
 */
export function validateThemeConfig(data: OptionsValidateThemeConfigData): OptionsValidateThemeConfigReturns {
  return data.validate(themeConfigSchema, data['themeConfig']);
}

/**
 * Options - Resolve Preset.
 *
 * Merges the base preset configuration with any user-provided overrides to produce a fully
 * resolved preset object ready for CSS generation.
 *
 * @param {OptionsResolvePresetOptions} options - Options.
 *
 * @returns {OptionsResolvePresetReturns}
 *
 * @since 0.15.0
 */
export function resolvePreset(options: OptionsResolvePresetOptions): OptionsResolvePresetReturns {
  const basePreset: OptionsResolvePresetBasePreset = presetsIndexPresets[options['preset']];

  const resolvedLogo: OptionsResolvePresetResolvedLogo = basePreset['logo'];

  let resolvedColorsPrimary: OptionsResolvePresetResolvedColorsPrimary = basePreset['colors']['primary'];

  if (options['overrides']['colors']['primary'] !== undefined) {
    resolvedColorsPrimary = options['overrides']['colors']['primary'];
  }

  let resolvedColorsAccent: OptionsResolvePresetResolvedColorsAccent = basePreset['colors']['accent'];

  if (options['overrides']['colors']['accent'] !== undefined) {
    resolvedColorsAccent = options['overrides']['colors']['accent'];
  }

  let resolvedColorsNeutral: OptionsResolvePresetResolvedColorsNeutral = basePreset['colors']['neutral'];

  if (options['overrides']['colors']['neutral'] !== undefined) {
    resolvedColorsNeutral = options['overrides']['colors']['neutral'];
  }

  let resolvedFontsDisplay: OptionsResolvePresetResolvedFontsDisplay = basePreset['fonts']['display'];

  if (options['overrides']['fonts']['display'] !== undefined) {
    resolvedFontsDisplay = options['overrides']['fonts']['display'];
  }

  let resolvedFontsBody: OptionsResolvePresetResolvedFontsBody = basePreset['fonts']['body'];

  if (options['overrides']['fonts']['body'] !== undefined) {
    resolvedFontsBody = options['overrides']['fonts']['body'];
  }

  let resolvedFontsCode: OptionsResolvePresetResolvedFontsCode = basePreset['fonts']['code'];

  if (options['overrides']['fonts']['code'] !== undefined) {
    resolvedFontsCode = options['overrides']['fonts']['code'];
  }

  let resolvedShapeRadius: OptionsResolvePresetResolvedShapeRadius = basePreset['shape']['radius'];

  if (options['overrides']['shape']['radius'] !== undefined) {
    resolvedShapeRadius = options['overrides']['shape']['radius'];
  }

  let resolvedShapeDensity: OptionsResolvePresetResolvedShapeDensity = basePreset['shape']['density'];

  if (options['overrides']['shape']['density'] !== undefined) {
    resolvedShapeDensity = options['overrides']['shape']['density'];
  }

  let resolvedDepthCards: OptionsResolvePresetResolvedDepthCards = basePreset['depth']['cards'];

  if (options['overrides']['depth']['cards'] !== undefined) {
    resolvedDepthCards = options['overrides']['depth']['cards'];
  }

  let resolvedDepthCodeBlocks: OptionsResolvePresetResolvedDepthCodeBlocks = basePreset['depth']['codeBlocks'];

  if (options['overrides']['depth']['codeBlocks'] !== undefined) {
    resolvedDepthCodeBlocks = options['overrides']['depth']['codeBlocks'];
  }

  let resolvedMotionSpeed: OptionsResolvePresetResolvedMotionSpeed = basePreset['motion']['speed'];

  if (options['overrides']['motion']['speed'] !== undefined) {
    resolvedMotionSpeed = options['overrides']['motion']['speed'];
  }

  let resolvedMotionStaggeredReveals: OptionsResolvePresetResolvedMotionStaggeredReveals = basePreset['motion']['staggeredReveals'];

  if (options['overrides']['motion']['staggeredReveals'] !== undefined) {
    resolvedMotionStaggeredReveals = options['overrides']['motion']['staggeredReveals'];
  }

  let resolvedMotionHoverEffects: OptionsResolvePresetResolvedMotionHoverEffects = basePreset['motion']['hoverEffects'];

  if (options['overrides']['motion']['hoverEffects'] !== undefined) {
    resolvedMotionHoverEffects = options['overrides']['motion']['hoverEffects'];
  }

  let resolvedNavbar: OptionsResolvePresetResolvedNavbar = basePreset['navbar'];

  if (options['overrides']['navbar'] !== undefined) {
    resolvedNavbar = options['overrides']['navbar'];
  }

  let resolvedFooter: OptionsResolvePresetResolvedFooter = basePreset['footer'];

  if (options['overrides']['footer'] !== undefined) {
    resolvedFooter = options['overrides']['footer'];
  }

  return {
    logo: resolvedLogo,
    colors: {
      primary: resolvedColorsPrimary,
      accent: resolvedColorsAccent,
      neutral: resolvedColorsNeutral,
    },
    fonts: {
      display: resolvedFontsDisplay,
      body: resolvedFontsBody,
      code: resolvedFontsCode,
    },
    shape: {
      radius: resolvedShapeRadius,
      density: resolvedShapeDensity,
    },
    depth: {
      cards: resolvedDepthCards,
      codeBlocks: resolvedDepthCodeBlocks,
    },
    motion: {
      speed: resolvedMotionSpeed,
      staggeredReveals: resolvedMotionStaggeredReveals,
      hoverEffects: resolvedMotionHoverEffects,
    },
    navbar: resolvedNavbar,
    footer: resolvedFooter,
  };
}
