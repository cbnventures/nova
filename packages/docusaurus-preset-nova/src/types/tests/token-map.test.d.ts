/**
 * Tests - Token Map - Admonition.
 *
 * @since 0.18.0
 */
export type TestsTokenMapAdmonitionPreset = string;

export type TestsTokenMapAdmonitionType = string;

export type TestsTokenMapAdmonitionTypes = readonly TestsTokenMapAdmonitionType[];

export type TestsTokenMapAdmonitionFacet = string;

export type TestsTokenMapAdmonitionFacets = readonly TestsTokenMapAdmonitionFacet[];

export type TestsTokenMapAdmonitionReturns = readonly string[];

export type TestsTokenMapAdmonitionSuffixes = readonly string[];

/**
 * Tests - Token Map - Assert Tokens Present.
 *
 * @since 0.18.0
 */
export type TestsTokenMapAssertTokensPresentRelativeFile = string;

export type TestsTokenMapAssertTokensPresentTokens = readonly string[];

export type TestsTokenMapAssertTokensPresentReturns = Promise<void>;

export type TestsTokenMapAssertTokensPresentFilePath = string;

export type TestsTokenMapAssertTokensPresentContent = string;

export type TestsTokenMapAssertTokensPresentMissing = string[];

export type TestsTokenMapAssertTokensPresentToken = string;

export type TestsTokenMapAssertTokensPresentPattern = RegExp;

export type TestsTokenMapAssertTokensPresentMatches = RegExpMatchArray | null;

export type TestsTokenMapAssertTokensPresentMessage = string;

/**
 * Tests - Token Map - Blog Description.
 *
 * @since 0.18.0
 */
export type TestsTokenMapBlogDescriptionPreset = string;

export type TestsTokenMapBlogDescriptionReturns = readonly string[];

/**
 * Tests - Token Map - Blog Post Typography.
 *
 * @since 0.18.0
 */
export type TestsTokenMapBlogPostTypographyPreset = string;

export type TestsTokenMapBlogPostTypographyReturns = readonly string[];

/**
 * Tests - Token Map - Blog Typography.
 *
 * @since 0.18.0
 */
export type TestsTokenMapBlogTypographyPreset = string;

export type TestsTokenMapBlogTypographyReturns = readonly string[];

/**
 * Tests - Token Map - Color Bg.
 *
 * @since 0.18.0
 */
export type TestsTokenMapColorBgPreset = string;

export type TestsTokenMapColorBgSemantic = string;

export type TestsTokenMapColorBgSemantics = readonly TestsTokenMapColorBgSemantic[];

export type TestsTokenMapColorBgReturns = readonly string[];

/**
 * Tests - Token Map - Color Scale.
 *
 * @since 0.18.0
 */
export type TestsTokenMapColorScalePreset = string;

export type TestsTokenMapColorScaleSemantic = string;

export type TestsTokenMapColorScaleSemantics = readonly TestsTokenMapColorScaleSemantic[];

export type TestsTokenMapColorScaleLevel = string;

export type TestsTokenMapColorScaleLevels = readonly TestsTokenMapColorScaleLevel[];

export type TestsTokenMapColorScaleReturns = readonly string[];

export type TestsTokenMapColorScaleSuffixes = readonly string[];

/**
 * Tests - Token Map - Depth.
 *
 * @since 0.18.0
 */
export type TestsTokenMapDepthPreset = string;

export type TestsTokenMapDepthSuffix = string;

export type TestsTokenMapDepthSuffixes = readonly TestsTokenMapDepthSuffix[];

export type TestsTokenMapDepthReturns = readonly string[];

/**
 * Tests - Token Map - Expectations.
 *
 * @since 0.18.0
 */
export type TestsTokenMapExpectation = {
  readonly file: string;
  readonly tokens: readonly string[];
};

export type TestsTokenMapExpectations = readonly TestsTokenMapExpectation[];

/**
 * Tests - Token Map - Get Package Root.
 *
 * @since 0.18.0
 */
export type TestsTokenMapGetPackageRootReturns = string;

export type TestsTokenMapGetPackageRootCurrentFilePath = string;

export type TestsTokenMapGetPackageRootCurrentFileDirectory = string;

/**
 * Tests - Token Map - Grid.
 *
 * @since 0.18.0
 */
export type TestsTokenMapGridPreset = string;

export type TestsTokenMapGridSuffix = string;

export type TestsTokenMapGridSuffixes = readonly TestsTokenMapGridSuffix[];

export type TestsTokenMapGridReturns = readonly string[];

/**
 * Tests - Token Map - Layout.
 *
 * @since 0.18.0
 */
export type TestsTokenMapLayoutPreset = string;

export type TestsTokenMapLayoutSuffix = string;

export type TestsTokenMapLayoutSuffixes = readonly TestsTokenMapLayoutSuffix[];

export type TestsTokenMapLayoutReturns = readonly string[];

/**
 * Tests - Token Map - Mermaid.
 *
 * @since 0.18.0
 */
export type TestsTokenMapMermaidPreset = string;

export type TestsTokenMapMermaidFacet = string;

export type TestsTokenMapMermaidFacets = readonly TestsTokenMapMermaidFacet[];

export type TestsTokenMapMermaidReturns = readonly string[];

/**
 * Tests - Token Map - Rename.
 *
 * @since 0.18.0
 */
export type TestsTokenMapRenamePreset = string;

export type TestsTokenMapRenameSuffix = string;

export type TestsTokenMapRenameSuffixes = readonly TestsTokenMapRenameSuffix[];

export type TestsTokenMapRenameReturns = readonly string[];

/**
 * Tests - Token Map - Section Gap.
 *
 * @since 0.18.0
 */
export type TestsTokenMapSectionGapPreset = string;

export type TestsTokenMapSectionGapReturns = readonly string[];

/**
 * Tests - Token Map - Skip.
 *
 * @since 0.18.0
 */
export type TestsTokenMapSkipPreset = string;

export type TestsTokenMapSkipReturns = readonly string[];

/**
 * Tests - Token Map - Token Map.
 *
 * @since 0.18.0
 */
export type TestsTokenMapTokenMapFile = string;

export type TestsTokenMapTokenMapTokens = readonly string[];
