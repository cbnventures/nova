/**
 * Tests - Token Map - Expectations.
 *
 * @since 0.18.0
 */
export type Tests_TokenMap_Expectation = {
  readonly file: string;
  readonly tokens: readonly string[];
};

export type Tests_TokenMap_Expectations = readonly Tests_TokenMap_Expectation[];

/**
 * Tests - Token Map - Admonition.
 *
 * @since 0.18.0
 */
export type Tests_TokenMap_Admonition_Preset = string;

export type Tests_TokenMap_Admonition_Type = string;

export type Tests_TokenMap_Admonition_Types = readonly Tests_TokenMap_Admonition_Type[];

export type Tests_TokenMap_Admonition_Facet = string;

export type Tests_TokenMap_Admonition_Facets = readonly Tests_TokenMap_Admonition_Facet[];

export type Tests_TokenMap_Admonition_Returns = readonly string[];

export type Tests_TokenMap_Admonition_Suffixes = readonly string[];

/**
 * Tests - Token Map - Assert Tokens Present.
 *
 * @since 0.18.0
 */
export type Tests_TokenMap_AssertTokensPresent_RelativeFile = string;

export type Tests_TokenMap_AssertTokensPresent_Tokens = readonly string[];

export type Tests_TokenMap_AssertTokensPresent_Returns = Promise<void>;

export type Tests_TokenMap_AssertTokensPresent_FilePath = string;

export type Tests_TokenMap_AssertTokensPresent_Content = string;

export type Tests_TokenMap_AssertTokensPresent_Missing = string[];

export type Tests_TokenMap_AssertTokensPresent_TokenName = string;

export type Tests_TokenMap_AssertTokensPresent_Pattern = RegExp;

export type Tests_TokenMap_AssertTokensPresent_Matches = RegExpMatchArray | null;

export type Tests_TokenMap_AssertTokensPresent_Message = string;

/**
 * Tests - Token Map - Blog Description.
 *
 * @since 0.18.0
 */
export type Tests_TokenMap_BlogDescription_Preset = string;

export type Tests_TokenMap_BlogDescription_Returns = readonly string[];

/**
 * Tests - Token Map - Blog Post Typography.
 *
 * @since 0.18.0
 */
export type Tests_TokenMap_BlogPostTypography_Preset = string;

export type Tests_TokenMap_BlogPostTypography_Returns = readonly string[];

/**
 * Tests - Token Map - Blog Typography.
 *
 * @since 0.18.0
 */
export type Tests_TokenMap_BlogTypography_Preset = string;

export type Tests_TokenMap_BlogTypography_Returns = readonly string[];

/**
 * Tests - Token Map - Color Bg.
 *
 * @since 0.18.0
 */
export type Tests_TokenMap_ColorBg_Preset = string;

export type Tests_TokenMap_ColorBg_Semantic = string;

export type Tests_TokenMap_ColorBg_Semantics = readonly Tests_TokenMap_ColorBg_Semantic[];

export type Tests_TokenMap_ColorBg_Returns = readonly string[];

/**
 * Tests - Token Map - Color Scale.
 *
 * @since 0.18.0
 */
export type Tests_TokenMap_ColorScale_Preset = string;

export type Tests_TokenMap_ColorScale_Semantic = string;

export type Tests_TokenMap_ColorScale_Semantics = readonly Tests_TokenMap_ColorScale_Semantic[];

export type Tests_TokenMap_ColorScale_Level = string;

export type Tests_TokenMap_ColorScale_Levels = readonly Tests_TokenMap_ColorScale_Level[];

export type Tests_TokenMap_ColorScale_Returns = readonly string[];

export type Tests_TokenMap_ColorScale_Suffixes = readonly string[];

/**
 * Tests - Token Map - Depth.
 *
 * @since 0.18.0
 */
export type Tests_TokenMap_Depth_Preset = string;

export type Tests_TokenMap_Depth_Suffix = string;

export type Tests_TokenMap_Depth_Suffixes = readonly Tests_TokenMap_Depth_Suffix[];

export type Tests_TokenMap_Depth_Returns = readonly string[];

/**
 * Tests - Token Map - Get Package Root.
 *
 * @since 0.18.0
 */
export type Tests_TokenMap_GetPackageRoot_Returns = string;

export type Tests_TokenMap_GetPackageRoot_CurrentFilePath = string;

export type Tests_TokenMap_GetPackageRoot_CurrentFileDirectory = string;

/**
 * Tests - Token Map - Grid.
 *
 * @since 0.18.0
 */
export type Tests_TokenMap_Grid_Preset = string;

export type Tests_TokenMap_Grid_Suffix = string;

export type Tests_TokenMap_Grid_Suffixes = readonly Tests_TokenMap_Grid_Suffix[];

export type Tests_TokenMap_Grid_Returns = readonly string[];

/**
 * Tests - Token Map - Layout.
 *
 * @since 0.18.0
 */
export type Tests_TokenMap_Layout_Preset = string;

export type Tests_TokenMap_Layout_Suffix = string;

export type Tests_TokenMap_Layout_Suffixes = readonly Tests_TokenMap_Layout_Suffix[];

export type Tests_TokenMap_Layout_Returns = readonly string[];

/**
 * Tests - Token Map - Mermaid.
 *
 * @since 0.18.0
 */
export type Tests_TokenMap_Mermaid_Preset = string;

export type Tests_TokenMap_Mermaid_Facet = string;

export type Tests_TokenMap_Mermaid_Facets = readonly Tests_TokenMap_Mermaid_Facet[];

export type Tests_TokenMap_Mermaid_Returns = readonly string[];

/**
 * Tests - Token Map - Rename.
 *
 * @since 0.18.0
 */
export type Tests_TokenMap_Rename_Preset = string;

export type Tests_TokenMap_Rename_Suffix = string;

export type Tests_TokenMap_Rename_Suffixes = readonly Tests_TokenMap_Rename_Suffix[];

export type Tests_TokenMap_Rename_Returns = readonly string[];

/**
 * Tests - Token Map - Section Gap.
 *
 * @since 0.18.0
 */
export type Tests_TokenMap_SectionGap_Preset = string;

export type Tests_TokenMap_SectionGap_Returns = readonly string[];

/**
 * Tests - Token Map - Skip.
 *
 * @since 0.18.0
 */
export type Tests_TokenMap_Skip_Preset = string;

export type Tests_TokenMap_Skip_Returns = readonly string[];

/**
 * Tests - Token Map - Token Map.
 *
 * @since 0.18.0
 */
export type Tests_TokenMap_TokenMap_File = string;

export type Tests_TokenMap_TokenMap_Tokens = readonly string[];
