import type { Options_PluginOptions } from '../options.d.ts';

/**
 * Tests - Options.
 *
 * @since 0.15.0
 */
export type Tests_Options_ValidatedResult = Options_PluginOptions;

export type Tests_Options_PresetValue = string;

export type Tests_Options_ThemeConfigValidatedResult = Record<string, unknown>;

export type Tests_Options_ResolvedFontsDisplay = string;

export type Tests_Options_ResolvedFontsBody = string;

export type Tests_Options_ResolvedColorsPrimary_Light = string;

export type Tests_Options_ResolvedColorsPrimary_Dark = string;

export type Tests_Options_ResolvedColorsPrimary = {
  light: Tests_Options_ResolvedColorsPrimary_Light;
  dark: Tests_Options_ResolvedColorsPrimary_Dark;
};

export type Tests_Options_ResolvedColorsAccent_Light = string;

export type Tests_Options_ResolvedColorsAccent_Dark = string;

export type Tests_Options_ResolvedColorsAccent = {
  light: Tests_Options_ResolvedColorsAccent_Light;
  dark: Tests_Options_ResolvedColorsAccent_Dark;
};

export type Tests_Options_ResolvedNavbar = string;

export type Tests_Options_ResolvedFooter = string;

/**
 * Tests - Options - Resolve Preset - Applies Color Override When Provided.
 *
 * @since 0.15.0
 */
export type Tests_Options_ResolvePreset_AppliesColorOverrideWhenProvided_Result_Colors_Primary_Light = string;

export type Tests_Options_ResolvePreset_AppliesColorOverrideWhenProvided_Result_Colors_Primary_Dark = string;

export type Tests_Options_ResolvePreset_AppliesColorOverrideWhenProvided_Result_Colors_Primary = {
  light: Tests_Options_ResolvePreset_AppliesColorOverrideWhenProvided_Result_Colors_Primary_Light;
  dark: Tests_Options_ResolvePreset_AppliesColorOverrideWhenProvided_Result_Colors_Primary_Dark;
};

export type Tests_Options_ResolvePreset_AppliesColorOverrideWhenProvided_Result_Colors_Accent_Light = string;

export type Tests_Options_ResolvePreset_AppliesColorOverrideWhenProvided_Result_Colors_Accent_Dark = string;

export type Tests_Options_ResolvePreset_AppliesColorOverrideWhenProvided_Result_Colors_Accent = {
  light: Tests_Options_ResolvePreset_AppliesColorOverrideWhenProvided_Result_Colors_Accent_Light;
  dark: Tests_Options_ResolvePreset_AppliesColorOverrideWhenProvided_Result_Colors_Accent_Dark;
};

export type Tests_Options_ResolvePreset_AppliesColorOverrideWhenProvided_Result_Colors = {
  primary: Tests_Options_ResolvePreset_AppliesColorOverrideWhenProvided_Result_Colors_Primary;
  accent: Tests_Options_ResolvePreset_AppliesColorOverrideWhenProvided_Result_Colors_Accent;
};

export type Tests_Options_ResolvePreset_AppliesColorOverrideWhenProvided_Result = {
  colors: Tests_Options_ResolvePreset_AppliesColorOverrideWhenProvided_Result_Colors;
};

/**
 * Tests - Options - Resolve Preset - Applies Font Override When Provided.
 *
 * @since 0.15.0
 */
export type Tests_Options_ResolvePreset_AppliesFontOverrideWhenProvided_Result_Fonts_Display = string;

export type Tests_Options_ResolvePreset_AppliesFontOverrideWhenProvided_Result_Fonts = {
  display: Tests_Options_ResolvePreset_AppliesFontOverrideWhenProvided_Result_Fonts_Display;
};

export type Tests_Options_ResolvePreset_AppliesFontOverrideWhenProvided_Result = {
  fonts: Tests_Options_ResolvePreset_AppliesFontOverrideWhenProvided_Result_Fonts;
};

/**
 * Tests - Options - Resolve Preset - Applies Navbar Override When Provided.
 *
 * @since 0.15.0
 */
export type Tests_Options_ResolvePreset_AppliesNavbarOverrideWhenProvided_Result_Navbar = string;

export type Tests_Options_ResolvePreset_AppliesNavbarOverrideWhenProvided_Result_Footer = string;

export type Tests_Options_ResolvePreset_AppliesNavbarOverrideWhenProvided_Result = {
  navbar: Tests_Options_ResolvePreset_AppliesNavbarOverrideWhenProvided_Result_Navbar;
  footer: Tests_Options_ResolvePreset_AppliesNavbarOverrideWhenProvided_Result_Footer;
};

/**
 * Tests - Options - Resolve Preset - Rejects Invalid Navbar Variant.
 *
 * @since 0.15.0
 */
export type Tests_Options_ResolvePreset_RejectsInvalidNavbarVariant_JoiSchema_Validate = (value: unknown) => Tests_Options_ResolvePreset_RejectsInvalidNavbarVariant_Validated;

export type Tests_Options_ResolvePreset_RejectsInvalidNavbarVariant_JoiSchema = {
  validate: Tests_Options_ResolvePreset_RejectsInvalidNavbarVariant_JoiSchema_Validate;
};

export type Tests_Options_ResolvePreset_RejectsInvalidNavbarVariant_Validated_Value = unknown;

export type Tests_Options_ResolvePreset_RejectsInvalidNavbarVariant_Validated = {
  value: Tests_Options_ResolvePreset_RejectsInvalidNavbarVariant_Validated_Value;
  error?: Error;
};

/**
 * Tests - Options - Resolve Preset - Returns Base Preset When No Overrides Are Provided.
 *
 * @since 0.15.0
 */
export type Tests_Options_ResolvePreset_ReturnsBasePresetWhenNoOverridesAreProvided_Result_Fonts_Display = string;

export type Tests_Options_ResolvePreset_ReturnsBasePresetWhenNoOverridesAreProvided_Result_Fonts_Body = string;

export type Tests_Options_ResolvePreset_ReturnsBasePresetWhenNoOverridesAreProvided_Result_Fonts = {
  display: Tests_Options_ResolvePreset_ReturnsBasePresetWhenNoOverridesAreProvided_Result_Fonts_Display;
  body: Tests_Options_ResolvePreset_ReturnsBasePresetWhenNoOverridesAreProvided_Result_Fonts_Body;
};

export type Tests_Options_ResolvePreset_ReturnsBasePresetWhenNoOverridesAreProvided_Result = {
  fonts: Tests_Options_ResolvePreset_ReturnsBasePresetWhenNoOverridesAreProvided_Result_Fonts;
};

/**
 * Tests - Options - Validate Options - Accepts Valid Preset Name.
 *
 * @since 0.15.0
 */
export type Tests_Options_ValidateOptions_AcceptsValidPresetName_Result_Preset = string;

export type Tests_Options_ValidateOptions_AcceptsValidPresetName_Result_Overrides = unknown;

export type Tests_Options_ValidateOptions_AcceptsValidPresetName_Result_Plugins = unknown;

export type Tests_Options_ValidateOptions_AcceptsValidPresetName_Result_Analytics = unknown;

export type Tests_Options_ValidateOptions_AcceptsValidPresetName_Result_ProgressBar = unknown;

export type Tests_Options_ValidateOptions_AcceptsValidPresetName_Result_Search = unknown;

export type Tests_Options_ValidateOptions_AcceptsValidPresetName_Result = {
  preset: Tests_Options_ValidateOptions_AcceptsValidPresetName_Result_Preset;
  overrides: Tests_Options_ValidateOptions_AcceptsValidPresetName_Result_Overrides;
  plugins: Tests_Options_ValidateOptions_AcceptsValidPresetName_Result_Plugins;
  analytics: Tests_Options_ValidateOptions_AcceptsValidPresetName_Result_Analytics;
  progressBar: Tests_Options_ValidateOptions_AcceptsValidPresetName_Result_ProgressBar;
  search: Tests_Options_ValidateOptions_AcceptsValidPresetName_Result_Search;
};

export type Tests_Options_ValidateOptions_AcceptsValidPresetName_JoiSchema_Validate = (value: unknown) => Tests_Options_ValidateOptions_AcceptsValidPresetName_Validated;

export type Tests_Options_ValidateOptions_AcceptsValidPresetName_JoiSchema = {
  validate: Tests_Options_ValidateOptions_AcceptsValidPresetName_JoiSchema_Validate;
};

export type Tests_Options_ValidateOptions_AcceptsValidPresetName_Validated_Value = unknown;

export type Tests_Options_ValidateOptions_AcceptsValidPresetName_Validated = {
  value: Tests_Options_ValidateOptions_AcceptsValidPresetName_Validated_Value;
  error?: Error;
};

/**
 * Tests - Options - Validate Options - Rejects Invalid Hex Color.
 *
 * @since 0.15.0
 */
export type Tests_Options_ValidateOptions_RejectsInvalidHexColor_JoiSchema_Validate = (value: unknown) => Tests_Options_ValidateOptions_RejectsInvalidHexColor_Validated;

export type Tests_Options_ValidateOptions_RejectsInvalidHexColor_JoiSchema = {
  validate: Tests_Options_ValidateOptions_RejectsInvalidHexColor_JoiSchema_Validate;
};

export type Tests_Options_ValidateOptions_RejectsInvalidHexColor_Validated_Value = unknown;

export type Tests_Options_ValidateOptions_RejectsInvalidHexColor_Validated = {
  value: Tests_Options_ValidateOptions_RejectsInvalidHexColor_Validated_Value;
  error?: Error;
};

/**
 * Tests - Options - Validate Options - Rejects Invalid Preset Name.
 *
 * @since 0.15.0
 */
export type Tests_Options_ValidateOptions_RejectsInvalidPresetName_JoiSchema_Validate = (value: unknown) => Tests_Options_ValidateOptions_RejectsInvalidPresetName_Validated;

export type Tests_Options_ValidateOptions_RejectsInvalidPresetName_JoiSchema = {
  validate: Tests_Options_ValidateOptions_RejectsInvalidPresetName_JoiSchema_Validate;
};

export type Tests_Options_ValidateOptions_RejectsInvalidPresetName_Validated_Value = unknown;

export type Tests_Options_ValidateOptions_RejectsInvalidPresetName_Validated = {
  value: Tests_Options_ValidateOptions_RejectsInvalidPresetName_Validated_Value;
  error?: Error;
};

/**
 * Tests - Options - Validate Options - Rejects When Preset Is Not Provided.
 *
 * @since 0.15.0
 */
export type Tests_Options_ValidateOptions_RejectsWhenPresetIsNotProvided_JoiSchema_Validate = (value: unknown) => Tests_Options_ValidateOptions_RejectsWhenPresetIsNotProvided_Validated;

export type Tests_Options_ValidateOptions_RejectsWhenPresetIsNotProvided_JoiSchema = {
  validate: Tests_Options_ValidateOptions_RejectsWhenPresetIsNotProvided_JoiSchema_Validate;
};

export type Tests_Options_ValidateOptions_RejectsWhenPresetIsNotProvided_Validated_Value = unknown;

export type Tests_Options_ValidateOptions_RejectsWhenPresetIsNotProvided_Validated = {
  value: Tests_Options_ValidateOptions_RejectsWhenPresetIsNotProvided_Validated_Value;
  error?: Error;
};

/**
 * Tests - Options - Validate Options - Returns Defaults When Only Preset Is Provided.
 *
 * @since 0.15.0
 */
export type Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Result_Preset = string;

export type Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Result_Overrides = unknown;

export type Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Result_Plugins = unknown;

export type Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Result_Analytics = unknown;

export type Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Result_ProgressBar = unknown;

export type Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Result_Search = unknown;

export type Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Result = {
  preset: Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Result_Preset;
  overrides: Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Result_Overrides;
  plugins: Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Result_Plugins;
  analytics: Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Result_Analytics;
  progressBar: Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Result_ProgressBar;
  search: Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Result_Search;
};

export type Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_JoiSchema_Validate = (value: unknown) => Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Validated;

export type Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_JoiSchema = {
  validate: Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_JoiSchema_Validate;
};

export type Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Validated_Value = unknown;

export type Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Validated = {
  value: Tests_Options_ValidateOptions_ReturnsDefaultsWhenOnlyPresetIsProvided_Validated_Value;
  error?: Error;
};

/**
 * Tests - Options - Validate Theme Config - Accepts An Empty Error Pages Object.
 *
 * @since 0.15.0
 */
export type Tests_Options_ValidateThemeConfig_AcceptsAnEmptyErrorPagesObject_Result = Record<string, unknown>;

export type Tests_Options_ValidateThemeConfig_AcceptsAnEmptyErrorPagesObject_JoiSchema_Validate = (value: unknown) => Tests_Options_ValidateThemeConfig_AcceptsAnEmptyErrorPagesObject_Validated;

export type Tests_Options_ValidateThemeConfig_AcceptsAnEmptyErrorPagesObject_JoiSchema = {
  validate: Tests_Options_ValidateThemeConfig_AcceptsAnEmptyErrorPagesObject_JoiSchema_Validate;
};

export type Tests_Options_ValidateThemeConfig_AcceptsAnEmptyErrorPagesObject_Validated_Value = unknown;

export type Tests_Options_ValidateThemeConfig_AcceptsAnEmptyErrorPagesObject_Validated = {
  value: Tests_Options_ValidateThemeConfig_AcceptsAnEmptyErrorPagesObject_Validated_Value;
  error?: Error;
};

export type Tests_Options_ValidateThemeConfig_AcceptsAnEmptyErrorPagesObject_ErrorPages = Record<string, unknown>;

/**
 * Tests - Options - Validate Theme Config - Accepts A Partial Error Pages Config Single Field.
 *
 * @since 0.15.0
 */
export type Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_Result = Record<string, unknown>;

export type Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_JoiSchema_Validate = (value: unknown) => Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_Validated;

export type Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_JoiSchema = {
  validate: Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_JoiSchema_Validate;
};

export type Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_Validated_Value = unknown;

export type Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_Validated = {
  value: Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_Validated_Value;
  error?: Error;
};

export type Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_ErrorPages = Record<string, unknown>;

export type Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_NotFound = Record<string, unknown>;

export type Tests_Options_ValidateThemeConfig_AcceptsAPartialErrorPagesConfigSingleField_NotFoundTitle = string;

/**
 * Tests - Options - Validate Theme Config - Accepts Blog Layout Instead Of Blog Layout.
 *
 * @since 0.15.0
 */
export type Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_Result = Record<string, unknown>;

export type Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_JoiSchema_Validate = (value: unknown) => Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_Validated;

export type Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_JoiSchema = {
  validate: Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_JoiSchema_Validate;
};

export type Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_Validated_Value = unknown;

export type Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_Validated = {
  value: Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_Validated_Value;
  error?: Error;
};

export type Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_Blog = Record<string, unknown>;

export type Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_BlogLayout = Record<string, unknown>;

export type Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_BlogLayoutHeading = string;

export type Tests_Options_ValidateThemeConfig_AcceptsBlogLayoutInsteadOfBlogLayout_BlogLayoutDescription = string;

/**
 * Tests - Options - Validate Theme Config - Accepts Error Pages With All Surfaces And Fields Populated.
 *
 * @since 0.15.0
 */
export type Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_Result = Record<string, unknown>;

export type Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_JoiSchema_Validate = (value: unknown) => Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_Validated;

export type Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_JoiSchema = {
  validate: Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_JoiSchema_Validate;
};

export type Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_Validated_Value = unknown;

export type Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_Validated = {
  value: Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_Validated_Value;
  error?: Error;
};

export type Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_ErrorPages = Record<string, unknown>;

export type Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_NotFound = Record<string, unknown>;

export type Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_NotFoundTitle = string;

export type Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_ErrorPageContent = Record<string, unknown>;

export type Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_ErrorPageContentTitle = string;

export type Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_Error = Record<string, unknown>;

export type Tests_Options_ValidateThemeConfig_AcceptsErrorPagesWithAllSurfacesAndFieldsPopulated_ErrorRetryLabel = string;

/**
 * Tests - Options - Validate Theme Config - Accepts Navbar Hide On Scroll.
 *
 * @since 0.15.0
 */
export type Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_Result = Record<string, unknown>;

export type Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_JoiSchema_Validate = (value: unknown) => Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_Validated;

export type Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_JoiSchema = {
  validate: Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_JoiSchema_Validate;
};

export type Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_Validated_Value = unknown;

export type Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_Validated = {
  value: Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_Validated_Value;
  error?: Error;
};

export type Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_Navbar = Record<string, unknown>;

export type Tests_Options_ValidateThemeConfig_AcceptsNavbarHideOnScroll_NavbarHideOnScroll = boolean;

/**
 * Tests - Options - Validate Theme Config - Accepts Site Namespace With Title And Metadata.
 *
 * @since 0.15.0
 */
export type Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_Result = Record<string, unknown>;

export type Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_JoiSchema_Validate = (value: unknown) => Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_Validated;

export type Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_JoiSchema = {
  validate: Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_JoiSchema_Validate;
};

export type Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_Validated_Value = unknown;

export type Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_Validated = {
  value: Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_Validated_Value;
  error?: Error;
};

export type Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_Site = Record<string, unknown>;

export type Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_SiteTitle = string;

export type Tests_Options_ValidateThemeConfig_AcceptsSiteNamespaceWithTitleAndMetadata_SiteMetadata = unknown[];

/**
 * Tests - Options - Validate Theme Config - Rejects Error Pages Not Found Title When Not A String.
 *
 * @since 0.15.0
 */
export type Tests_Options_ValidateThemeConfig_RejectsErrorPagesNotFoundTitleWhenNotAString_JoiSchema_Validate = (value: unknown) => Tests_Options_ValidateThemeConfig_RejectsErrorPagesNotFoundTitleWhenNotAString_Validated;

export type Tests_Options_ValidateThemeConfig_RejectsErrorPagesNotFoundTitleWhenNotAString_JoiSchema = {
  validate: Tests_Options_ValidateThemeConfig_RejectsErrorPagesNotFoundTitleWhenNotAString_JoiSchema_Validate;
};

export type Tests_Options_ValidateThemeConfig_RejectsErrorPagesNotFoundTitleWhenNotAString_Validated_Value = unknown;

export type Tests_Options_ValidateThemeConfig_RejectsErrorPagesNotFoundTitleWhenNotAString_Validated = {
  value: Tests_Options_ValidateThemeConfig_RejectsErrorPagesNotFoundTitleWhenNotAString_Validated_Value;
  error?: Error;
};
