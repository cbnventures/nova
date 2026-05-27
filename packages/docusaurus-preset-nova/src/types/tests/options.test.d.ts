import type { Options_PluginOptions } from '../options.d.ts';
import type {
  Shared_Preset,
  Shared_Preset_Colors_Accent,
  Shared_Preset_Colors_Primary,
  Shared_Preset_Footer,
  Shared_Preset_Navbar,
} from '../shared.d.ts';

/**
 * Tests - Options - Resolve Preset.
 *
 * @since 0.15.0
 */
export type Tests_Options_ResolvePreset_Result = Shared_Preset;

export type Tests_Options_ResolvedFontsDisplay = string;

export type Tests_Options_ResolvedFontsBody = string;

export type Tests_Options_ResolvedColorsPrimary = Shared_Preset_Colors_Primary;

export type Tests_Options_ResolvedColorsAccent = Shared_Preset_Colors_Accent;

export type Tests_Options_ResolvedNavbar = Shared_Preset_Navbar;

export type Tests_Options_ResolvedFooter = Shared_Preset_Footer;

/**
 * Tests - Options - Validate Options.
 *
 * @since 0.15.0
 */
export type Tests_Options_JoiSchema_Validate = (value: unknown) => Tests_Options_JoiSchemaValidateResult;

export type Tests_Options_JoiSchema = {
  validate: Tests_Options_JoiSchema_Validate;
};

export type Tests_Options_JoiSchemaValidateResult_Value = unknown;

export type Tests_Options_JoiSchemaValidateResult = {
  value: Tests_Options_JoiSchemaValidateResult_Value;
  error?: Error;
};

export type Tests_Options_ValidatedResult = Options_PluginOptions;

export type Tests_Options_PresetValue = string;

/**
 * Tests - Options - Validate Theme Config.
 *
 * @since 0.15.0
 */
export type Tests_Options_ThemeConfigValidatedResult = Record<string, unknown>;

export type Tests_Options_ThemeConfigJoiSchema_Validate = (value: unknown) => Tests_Options_ThemeConfigJoiSchemaValidateResult;

export type Tests_Options_ThemeConfigJoiSchema = {
  validate: Tests_Options_ThemeConfigJoiSchema_Validate;
};

export type Tests_Options_ThemeConfigJoiSchemaValidateResult_Value = unknown;

export type Tests_Options_ThemeConfigJoiSchemaValidateResult = {
  value: Tests_Options_ThemeConfigJoiSchemaValidateResult_Value;
  error?: Error;
};

export type Tests_Options_ThemeConfigValidatedSite = Record<string, unknown>;

export type Tests_Options_ThemeConfigValidatedSiteTitle = string;

export type Tests_Options_ThemeConfigValidatedSiteMetadata = unknown[];

export type Tests_Options_ThemeConfigValidatedBlog = Record<string, unknown>;

export type Tests_Options_ThemeConfigValidatedBlogLayout = Record<string, unknown>;

export type Tests_Options_ThemeConfigValidatedBlogLayoutHeading = string;

export type Tests_Options_ThemeConfigValidatedBlogLayoutDescription = string;

export type Tests_Options_ThemeConfigValidatedNavbar = Record<string, unknown>;

export type Tests_Options_ThemeConfigValidatedNavbarHideOnScroll = boolean;

export type Tests_Options_ThemeConfigValidatedErrorPages = Record<string, unknown>;

export type Tests_Options_ThemeConfigValidatedErrorPagesNotFound = Record<string, unknown>;

export type Tests_Options_ThemeConfigValidatedErrorPagesNotFoundTitle = string;

export type Tests_Options_ThemeConfigValidatedErrorPagesErrorPageContent = Record<string, unknown>;

export type Tests_Options_ThemeConfigValidatedErrorPagesErrorPageContentTitle = string;

export type Tests_Options_ThemeConfigValidatedErrorPagesError = Record<string, unknown>;

export type Tests_Options_ThemeConfigValidatedErrorPagesErrorRetryLabel = string;
