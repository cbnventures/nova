/* Shared data structure type - referenced across sections. Declared before
 * any section header so it is exempt from the section ordering and
 * cross-section reference rules enforced by type-declarations.test.ts. */

export type Tests_CascadeDefensive_CssRuleTripleSelector = string;

export type Tests_CascadeDefensive_CssRuleTripleProperty = string;

export type Tests_CascadeDefensive_CssRuleTripleValue = string;

export type Tests_CascadeDefensive_CssRuleTripleDefensive = boolean;

export type Tests_CascadeDefensive_CssRuleTriple = {
  readonly selector: Tests_CascadeDefensive_CssRuleTripleSelector;
  readonly property: Tests_CascadeDefensive_CssRuleTripleProperty;
  readonly value: Tests_CascadeDefensive_CssRuleTripleValue;
  readonly defensive: Tests_CascadeDefensive_CssRuleTripleDefensive;
};

/**
 * Tests - Cascade Defensive - Cascade Defensive.
 *
 * @since 0.18.0
 */
export type Tests_CascadeDefensive_CascadeDefensive_TsxPaths = readonly string[];

export type Tests_CascadeDefensive_CascadeDefensive_AnchorClasses = ReadonlySet<string>;

export type Tests_CascadeDefensive_CascadeDefensive_TriplesByFile = ReadonlyMap<string, readonly Tests_CascadeDefensive_CssRuleTriple[]>;

export type Tests_CascadeDefensive_CascadeDefensive_BareTextDecorationNoneClasses = Map<string, string>;

export type Tests_CascadeDefensive_CascadeDefensive_GuardedHoverClasses = Set<string>;

export type Tests_CascadeDefensive_CascadeDefensive_GuardedFocusClasses = Set<string>;

export type Tests_CascadeDefensive_CascadeDefensive_BareClassPattern = RegExp;

export type Tests_CascadeDefensive_CascadeDefensive_HoverClassPattern = RegExp;

export type Tests_CascadeDefensive_CascadeDefensive_FocusClassPattern = RegExp;

export type Tests_CascadeDefensive_CascadeDefensive_HoverPseudoSuffix = ':hover';

export type Tests_CascadeDefensive_CascadeDefensive_FocusPseudoSuffix = ':focus-visible';

export type Tests_CascadeDefensive_CascadeDefensive_FilePath = string;

export type Tests_CascadeDefensive_CascadeDefensive_FileTriples = readonly Tests_CascadeDefensive_CssRuleTriple[];

export type Tests_CascadeDefensive_CascadeDefensive_Part = string;

export type Tests_CascadeDefensive_CascadeDefensive_BareClassMatch = RegExpMatchArray | null;

export type Tests_CascadeDefensive_CascadeDefensive_BareClass = string;

export type Tests_CascadeDefensive_CascadeDefensive_HoverClassMatch = RegExpMatchArray | null;

export type Tests_CascadeDefensive_CascadeDefensive_HoverClass = string;

export type Tests_CascadeDefensive_CascadeDefensive_FocusClassMatch = RegExpMatchArray | null;

export type Tests_CascadeDefensive_CascadeDefensive_FocusClass = string;

export type Tests_CascadeDefensive_CascadeDefensive_MissingGuards = string[];

export type Tests_CascadeDefensive_CascadeDefensive_ClassName = string;

export type Tests_CascadeDefensive_CascadeDefensive_DeclaringFile = string;

export type Tests_CascadeDefensive_CascadeDefensive_MissingGuardsMessage = string;

export type Tests_CascadeDefensive_CascadeDefensive_ClassPlusPseudoPattern = RegExp;

export type Tests_CascadeDefensive_CascadeDefensive_Redundancies = string[];

export type Tests_CascadeDefensive_CascadeDefensive_BareValueLookup = Map<string, string>;

export type Tests_CascadeDefensive_CascadeDefensive_LookupKey = string;

export type Tests_CascadeDefensive_CascadeDefensive_DarkStrippedSelector = string | null;

export type Tests_CascadeDefensive_CascadeDefensive_DarkLookupKey = string;

export type Tests_CascadeDefensive_CascadeDefensive_BareValue = string | undefined;

export type Tests_CascadeDefensive_CascadeDefensive_DarkClassMatch = RegExpMatchArray | null;

export type Tests_CascadeDefensive_CascadeDefensive_DarkClass = string;

export type Tests_CascadeDefensive_CascadeDefensive_RedundanciesMessage = string;

export type Tests_CascadeDefensive_CascadeDefensive_BareColorClasses = Map<string, string>;

export type Tests_CascadeDefensive_CascadeDefensive_EndsHoverClassPattern = RegExp;

export type Tests_CascadeDefensive_CascadeDefensive_EndsFocusClassPattern = RegExp;

export type Tests_CascadeDefensive_CascadeDefensive_ColorProperty = 'color';

export type Tests_CascadeDefensive_CascadeDefensive_EndsHoverClassMatch = RegExpMatchArray | null;

export type Tests_CascadeDefensive_CascadeDefensive_EndsHoverClass = string;

export type Tests_CascadeDefensive_CascadeDefensive_EndsFocusClassMatch = RegExpMatchArray | null;

export type Tests_CascadeDefensive_CascadeDefensive_EndsFocusClass = string;

/**
 * Tests - Cascade Defensive - Extract Anchor Classes.
 *
 * @since 0.18.0
 */
export type Tests_CascadeDefensive_ExtractAnchorClasses_Content = string;

export type Tests_CascadeDefensive_ExtractAnchorClasses_Returns = ReadonlySet<string>;

export type Tests_CascadeDefensive_ExtractAnchorClasses_Classes = Set<string>;

export type Tests_CascadeDefensive_ExtractAnchorClasses_AnchorOpenPattern = RegExp;

export type Tests_CascadeDefensive_ExtractAnchorClasses_StaticPattern = RegExp;

export type Tests_CascadeDefensive_ExtractAnchorClasses_MergePattern = RegExp;

export type Tests_CascadeDefensive_ExtractAnchorClasses_WhitespacePattern = RegExp;

export type Tests_CascadeDefensive_ExtractAnchorClasses_TagMatch = RegExpExecArray | null;

export type Tests_CascadeDefensive_ExtractAnchorClasses_TagName = string;

export type Tests_CascadeDefensive_ExtractAnchorClasses_EndIndex = number;

export type Tests_CascadeDefensive_ExtractAnchorClasses_BraceDepth = number;

export type Tests_CascadeDefensive_ExtractAnchorClasses_ScanChar = string;

export type Tests_CascadeDefensive_ExtractAnchorClasses_OpeningTag = string;

export type Tests_CascadeDefensive_ExtractAnchorClasses_StaticMatch = RegExpMatchArray | null;

export type Tests_CascadeDefensive_ExtractAnchorClasses_StaticCapture = string;

export type Tests_CascadeDefensive_ExtractAnchorClasses_ClassToken = string;

export type Tests_CascadeDefensive_ExtractAnchorClasses_MergeMatch = RegExpMatchArray | null;

export type Tests_CascadeDefensive_ExtractAnchorClasses_MergeCapture = string;

/**
 * Tests - Cascade Defensive - Extract Rule Triples.
 *
 * @since 0.18.0
 */
export type Tests_CascadeDefensive_ExtractRuleTriples_Source = string;

export type Tests_CascadeDefensive_ExtractRuleTriples_Returns = readonly Tests_CascadeDefensive_CssRuleTriple[];

export type Tests_CascadeDefensive_ExtractRuleTriples_Stripped = string;

export type Tests_CascadeDefensive_ExtractRuleTriples_Triples = Tests_CascadeDefensive_CssRuleTriple[];

export type Tests_CascadeDefensive_ExtractRuleTriples_DefensivePattern = RegExp;

export type Tests_CascadeDefensive_ExtractRuleTriples_WhitespacePattern = RegExp;

export type Tests_CascadeDefensive_ExtractRuleTriples_Depth = number;

export type Tests_CascadeDefensive_ExtractRuleTriples_BlockStart = number;

export type Tests_CascadeDefensive_ExtractRuleTriples_PreludeStart = number;

export type Tests_CascadeDefensive_ExtractRuleTriples_Defensive = boolean;

export type Tests_CascadeDefensive_ExtractRuleTriples_Index = number;

export type Tests_CascadeDefensive_ExtractRuleTriples_Char = string;

export type Tests_CascadeDefensive_ExtractRuleTriples_Prelude = string;

export type Tests_CascadeDefensive_ExtractRuleTriples_Nested = number;

export type Tests_CascadeDefensive_ExtractRuleTriples_Inner = string;

export type Tests_CascadeDefensive_ExtractRuleTriples_Body = string;

export type Tests_CascadeDefensive_ExtractRuleTriples_Selector = string;

export type Tests_CascadeDefensive_ExtractRuleTriples_Declaration = string;

export type Tests_CascadeDefensive_ExtractRuleTriples_Colon = number;

export type Tests_CascadeDefensive_ExtractRuleTriples_Property = string;

export type Tests_CascadeDefensive_ExtractRuleTriples_RawValue = string;

export type Tests_CascadeDefensive_ExtractRuleTriples_Value = string;

/**
 * Tests - Cascade Defensive - Get Package Root.
 *
 * @since 0.18.0
 */
export type Tests_CascadeDefensive_GetPackageRoot_Returns = string;

export type Tests_CascadeDefensive_GetPackageRoot_CurrentFilePath = string;

export type Tests_CascadeDefensive_GetPackageRoot_CurrentFileDirectory = string;

/**
 * Tests - Cascade Defensive - List Theme And Block Tsx.
 *
 * @since 0.18.0
 */
export type Tests_CascadeDefensive_ListThemeAndBlockTsx_Returns = Promise<readonly string[]>;

export type Tests_CascadeDefensive_ListThemeAndBlockTsx_ThemeRoot = string;

export type Tests_CascadeDefensive_ListThemeAndBlockTsx_BlocksRoot = string;

export type Tests_CascadeDefensive_ListThemeAndBlockTsx_ThemeFiles = readonly string[];

export type Tests_CascadeDefensive_ListThemeAndBlockTsx_BlocksFiles = readonly string[];

export type Tests_CascadeDefensive_ListThemeAndBlockTsx_Absolute = string[];

/**
 * Tests - Cascade Defensive - Read Anchor Classes.
 *
 * @since 0.18.0
 */
export type Tests_CascadeDefensive_ReadAnchorClasses_TsxPaths = readonly string[];

export type Tests_CascadeDefensive_ReadAnchorClasses_Returns = Promise<ReadonlySet<string>>;

export type Tests_CascadeDefensive_ReadAnchorClasses_AnchorClasses = Set<string>;

export type Tests_CascadeDefensive_ReadAnchorClasses_Content = string;

export type Tests_CascadeDefensive_ReadAnchorClasses_PerFileClasses = ReadonlySet<string>;

export type Tests_CascadeDefensive_ReadAnchorClasses_ClassName = string;

/**
 * Tests - Cascade Defensive - Read Css Triples By File.
 *
 * @since 0.18.0
 */
export type Tests_CascadeDefensive_ReadCssTriplesByFile_Returns = Promise<ReadonlyMap<string, readonly Tests_CascadeDefensive_CssRuleTriple[]>>;

export type Tests_CascadeDefensive_ReadCssTriplesByFile_StylesRoot = string;

export type Tests_CascadeDefensive_ReadCssTriplesByFile_RelativePaths = readonly string[];

export type Tests_CascadeDefensive_ReadCssTriplesByFile_TriplesByFile = Map<string, readonly Tests_CascadeDefensive_CssRuleTriple[]>;

export type Tests_CascadeDefensive_ReadCssTriplesByFile_AbsolutePath = string;

export type Tests_CascadeDefensive_ReadCssTriplesByFile_Content = string;

/**
 * Tests - Cascade Defensive - Strip Block Comments.
 *
 * @since 0.18.0
 */
export type Tests_CascadeDefensive_StripBlockComments_Source = string;

export type Tests_CascadeDefensive_StripBlockComments_Returns = string;

export type Tests_CascadeDefensive_StripBlockComments_Pattern = RegExp;

/**
 * Tests - Cascade Defensive - Strip Dark Selector Prefix.
 *
 * @since 0.18.0
 */
export type Tests_CascadeDefensive_StripDarkSelectorPrefix_Selector = string;

export type Tests_CascadeDefensive_StripDarkSelectorPrefix_Returns = string | null;

export type Tests_CascadeDefensive_StripDarkSelectorPrefix_Pattern = RegExp;

/**
 * Tests - Cascade Defensive - Triple Key.
 *
 * @since 0.18.0
 */
export type Tests_CascadeDefensive_TripleKey_Triple = Tests_CascadeDefensive_CssRuleTriple;

export type Tests_CascadeDefensive_TripleKey_Returns = string;
