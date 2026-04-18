import type { OptionsPluginOptions } from '../options.d.ts';
import type { SharedPreset, SharedPresetFooter, SharedPresetNavbar } from '../shared.d.ts';

/**
 * Tests - Options - Resolve Preset.
 *
 * @since 0.15.0
 */
export type TestsOptionsResolvePresetResult = SharedPreset;

export type TestsOptionsResolvedFontsDisplay = string;

export type TestsOptionsResolvedFontsBody = string;

export type TestsOptionsResolvedShapeRadius = string;

export type TestsOptionsResolvedMotionSpeed = string;

export type TestsOptionsResolvedColorsPrimary = string;

export type TestsOptionsResolvedColorsAccent = string;

export type TestsOptionsResolvedColorsNeutral = string;

export type TestsOptionsResolvedNavbar = SharedPresetNavbar;

export type TestsOptionsResolvedFooter = SharedPresetFooter;

/**
 * Tests - Options - Validate Options.
 *
 * @since 0.15.0
 */
export type TestsOptionsJoiSchemaValidate = (value: unknown) => TestsOptionsJoiSchemaValidateResult;

export type TestsOptionsJoiSchema = {
  validate: TestsOptionsJoiSchemaValidate;
};

export type TestsOptionsJoiSchemaValidateResultValue = unknown;

export type TestsOptionsJoiSchemaValidateResult = {
  value: TestsOptionsJoiSchemaValidateResultValue;
  error?: Error;
};

export type TestsOptionsValidatedResult = OptionsPluginOptions;

export type TestsOptionsPresetValue = string;

/**
 * Tests - Options - Validate Theme Config.
 *
 * @since 0.15.0
 */
export type TestsOptionsThemeConfigValidatedResult = Record<string, unknown>;

export type TestsOptionsThemeConfigJoiSchemaValidate = (value: unknown) => TestsOptionsThemeConfigJoiSchemaValidateResult;

export type TestsOptionsThemeConfigJoiSchema = {
  validate: TestsOptionsThemeConfigJoiSchemaValidate;
};

export type TestsOptionsThemeConfigJoiSchemaValidateResultValue = unknown;

export type TestsOptionsThemeConfigJoiSchemaValidateResult = {
  value: TestsOptionsThemeConfigJoiSchemaValidateResultValue;
  error?: Error;
};

export type TestsOptionsThemeConfigValidatedSite = Record<string, unknown>;

export type TestsOptionsThemeConfigValidatedSiteTitle = string;

export type TestsOptionsThemeConfigValidatedSiteMetadata = unknown[];

export type TestsOptionsThemeConfigValidatedBlog = Record<string, unknown>;

export type TestsOptionsThemeConfigValidatedBlogLayout = Record<string, unknown>;

export type TestsOptionsThemeConfigValidatedBlogLayoutHeading = string;

export type TestsOptionsThemeConfigValidatedBlogLayoutDescription = string;

export type TestsOptionsThemeConfigValidatedNavbar = Record<string, unknown>;

export type TestsOptionsThemeConfigValidatedNavbarHideOnScroll = boolean;
