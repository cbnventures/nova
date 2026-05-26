/* Shared data structure type - referenced across sections. Declared before
 * any section header so it is exempt from the section ordering and
 * cross-section reference rules enforced by type-declarations.test.ts. */

export type TestsCascadeDefensiveCssRuleTripleSelector = string;

export type TestsCascadeDefensiveCssRuleTripleProperty = string;

export type TestsCascadeDefensiveCssRuleTripleValue = string;

export type TestsCascadeDefensiveCssRuleTripleDefensive = boolean;

export type TestsCascadeDefensiveCssRuleTriple = {
  readonly selector: TestsCascadeDefensiveCssRuleTripleSelector;
  readonly property: TestsCascadeDefensiveCssRuleTripleProperty;
  readonly value: TestsCascadeDefensiveCssRuleTripleValue;
  readonly defensive: TestsCascadeDefensiveCssRuleTripleDefensive;
};

/**
 * Tests - Cascade Defensive - Cascade Defensive.
 *
 * @since 0.18.0
 */
export type TestsCascadeDefensiveCascadeDefensiveTsxPaths = readonly string[];

export type TestsCascadeDefensiveCascadeDefensiveAnchorClasses = ReadonlySet<string>;

export type TestsCascadeDefensiveCascadeDefensiveTriplesByFile = ReadonlyMap<string, readonly TestsCascadeDefensiveCssRuleTriple[]>;

export type TestsCascadeDefensiveCascadeDefensiveBareTextDecorationNoneClasses = Map<string, string>;

export type TestsCascadeDefensiveCascadeDefensiveGuardedHoverClasses = Set<string>;

export type TestsCascadeDefensiveCascadeDefensiveGuardedFocusClasses = Set<string>;

export type TestsCascadeDefensiveCascadeDefensiveBareClassPattern = RegExp;

export type TestsCascadeDefensiveCascadeDefensiveHoverClassPattern = RegExp;

export type TestsCascadeDefensiveCascadeDefensiveFocusClassPattern = RegExp;

export type TestsCascadeDefensiveCascadeDefensiveHoverPseudoSuffix = ':hover';

export type TestsCascadeDefensiveCascadeDefensiveFocusPseudoSuffix = ':focus-visible';

export type TestsCascadeDefensiveCascadeDefensiveFilePath = string;

export type TestsCascadeDefensiveCascadeDefensiveFileTriples = readonly TestsCascadeDefensiveCssRuleTriple[];

export type TestsCascadeDefensiveCascadeDefensivePart = string;

export type TestsCascadeDefensiveCascadeDefensiveBareClassMatch = RegExpMatchArray | null;

export type TestsCascadeDefensiveCascadeDefensiveBareClass = string;

export type TestsCascadeDefensiveCascadeDefensiveHoverClassMatch = RegExpMatchArray | null;

export type TestsCascadeDefensiveCascadeDefensiveHoverClass = string;

export type TestsCascadeDefensiveCascadeDefensiveFocusClassMatch = RegExpMatchArray | null;

export type TestsCascadeDefensiveCascadeDefensiveFocusClass = string;

export type TestsCascadeDefensiveCascadeDefensiveMissingGuards = string[];

export type TestsCascadeDefensiveCascadeDefensiveClassName = string;

export type TestsCascadeDefensiveCascadeDefensiveDeclaringFile = string;

export type TestsCascadeDefensiveCascadeDefensiveMissingGuardsMessage = string;

export type TestsCascadeDefensiveCascadeDefensiveClassPlusPseudoPattern = RegExp;

export type TestsCascadeDefensiveCascadeDefensiveRedundancies = string[];

export type TestsCascadeDefensiveCascadeDefensiveBareValueLookup = Map<string, string>;

export type TestsCascadeDefensiveCascadeDefensiveLookupKey = string;

export type TestsCascadeDefensiveCascadeDefensiveDarkStrippedSelector = string | null;

export type TestsCascadeDefensiveCascadeDefensiveDarkLookupKey = string;

export type TestsCascadeDefensiveCascadeDefensiveBareValue = string | undefined;

export type TestsCascadeDefensiveCascadeDefensiveDarkClassMatch = RegExpMatchArray | null;

export type TestsCascadeDefensiveCascadeDefensiveDarkClass = string;

export type TestsCascadeDefensiveCascadeDefensiveRedundanciesMessage = string;

export type TestsCascadeDefensiveCascadeDefensiveBareColorClasses = Map<string, string>;

export type TestsCascadeDefensiveCascadeDefensiveEndsHoverClassPattern = RegExp;

export type TestsCascadeDefensiveCascadeDefensiveEndsFocusClassPattern = RegExp;

export type TestsCascadeDefensiveCascadeDefensiveColorProperty = 'color';

export type TestsCascadeDefensiveCascadeDefensiveEndsHoverClassMatch = RegExpMatchArray | null;

export type TestsCascadeDefensiveCascadeDefensiveEndsHoverClass = string;

export type TestsCascadeDefensiveCascadeDefensiveEndsFocusClassMatch = RegExpMatchArray | null;

export type TestsCascadeDefensiveCascadeDefensiveEndsFocusClass = string;

/**
 * Tests - Cascade Defensive - Extract Anchor Classes.
 *
 * @since 0.18.0
 */
export type TestsCascadeDefensiveExtractAnchorClassesContent = string;

export type TestsCascadeDefensiveExtractAnchorClassesReturns = ReadonlySet<string>;

export type TestsCascadeDefensiveExtractAnchorClassesClasses = Set<string>;

export type TestsCascadeDefensiveExtractAnchorClassesAnchorOpenPattern = RegExp;

export type TestsCascadeDefensiveExtractAnchorClassesStaticPattern = RegExp;

export type TestsCascadeDefensiveExtractAnchorClassesMergePattern = RegExp;

export type TestsCascadeDefensiveExtractAnchorClassesWhitespacePattern = RegExp;

export type TestsCascadeDefensiveExtractAnchorClassesTagMatch = RegExpExecArray | null;

export type TestsCascadeDefensiveExtractAnchorClassesTagName = string;

export type TestsCascadeDefensiveExtractAnchorClassesEndIndex = number;

export type TestsCascadeDefensiveExtractAnchorClassesBraceDepth = number;

export type TestsCascadeDefensiveExtractAnchorClassesScanChar = string;

export type TestsCascadeDefensiveExtractAnchorClassesOpeningTag = string;

export type TestsCascadeDefensiveExtractAnchorClassesStaticMatch = RegExpMatchArray | null;

export type TestsCascadeDefensiveExtractAnchorClassesStaticCapture = string;

export type TestsCascadeDefensiveExtractAnchorClassesClassToken = string;

export type TestsCascadeDefensiveExtractAnchorClassesMergeMatch = RegExpMatchArray | null;

export type TestsCascadeDefensiveExtractAnchorClassesMergeCapture = string;

/**
 * Tests - Cascade Defensive - Extract Rule Triples.
 *
 * @since 0.18.0
 */
export type TestsCascadeDefensiveExtractRuleTriplesSource = string;

export type TestsCascadeDefensiveExtractRuleTriplesReturns = readonly TestsCascadeDefensiveCssRuleTriple[];

export type TestsCascadeDefensiveExtractRuleTriplesStripped = string;

export type TestsCascadeDefensiveExtractRuleTriplesTriples = TestsCascadeDefensiveCssRuleTriple[];

export type TestsCascadeDefensiveExtractRuleTriplesDefensivePattern = RegExp;

export type TestsCascadeDefensiveExtractRuleTriplesWhitespacePattern = RegExp;

export type TestsCascadeDefensiveExtractRuleTriplesDepth = number;

export type TestsCascadeDefensiveExtractRuleTriplesBlockStart = number;

export type TestsCascadeDefensiveExtractRuleTriplesPreludeStart = number;

export type TestsCascadeDefensiveExtractRuleTriplesDefensive = boolean;

export type TestsCascadeDefensiveExtractRuleTriplesIndex = number;

export type TestsCascadeDefensiveExtractRuleTriplesChar = string;

export type TestsCascadeDefensiveExtractRuleTriplesPrelude = string;

export type TestsCascadeDefensiveExtractRuleTriplesNested = number;

export type TestsCascadeDefensiveExtractRuleTriplesInner = string;

export type TestsCascadeDefensiveExtractRuleTriplesBody = string;

export type TestsCascadeDefensiveExtractRuleTriplesSelector = string;

export type TestsCascadeDefensiveExtractRuleTriplesDeclaration = string;

export type TestsCascadeDefensiveExtractRuleTriplesColon = number;

export type TestsCascadeDefensiveExtractRuleTriplesProperty = string;

export type TestsCascadeDefensiveExtractRuleTriplesRawValue = string;

export type TestsCascadeDefensiveExtractRuleTriplesValue = string;

/**
 * Tests - Cascade Defensive - Get Package Root.
 *
 * @since 0.18.0
 */
export type TestsCascadeDefensiveGetPackageRootReturns = string;

export type TestsCascadeDefensiveGetPackageRootCurrentFilePath = string;

export type TestsCascadeDefensiveGetPackageRootCurrentFileDirectory = string;

/**
 * Tests - Cascade Defensive - List Theme And Block Tsx.
 *
 * @since 0.18.0
 */
export type TestsCascadeDefensiveListThemeAndBlockTsxReturns = Promise<readonly string[]>;

export type TestsCascadeDefensiveListThemeAndBlockTsxThemeRoot = string;

export type TestsCascadeDefensiveListThemeAndBlockTsxBlocksRoot = string;

export type TestsCascadeDefensiveListThemeAndBlockTsxThemeFiles = readonly string[];

export type TestsCascadeDefensiveListThemeAndBlockTsxBlocksFiles = readonly string[];

export type TestsCascadeDefensiveListThemeAndBlockTsxAbsolute = string[];

/**
 * Tests - Cascade Defensive - Read Anchor Classes.
 *
 * @since 0.18.0
 */
export type TestsCascadeDefensiveReadAnchorClassesTsxPaths = readonly string[];

export type TestsCascadeDefensiveReadAnchorClassesReturns = Promise<ReadonlySet<string>>;

export type TestsCascadeDefensiveReadAnchorClassesAnchorClasses = Set<string>;

export type TestsCascadeDefensiveReadAnchorClassesContent = string;

export type TestsCascadeDefensiveReadAnchorClassesPerFileClasses = ReadonlySet<string>;

export type TestsCascadeDefensiveReadAnchorClassesClassName = string;

/**
 * Tests - Cascade Defensive - Read Css Triples By File.
 *
 * @since 0.18.0
 */
export type TestsCascadeDefensiveReadCssTriplesByFileReturns = Promise<ReadonlyMap<string, readonly TestsCascadeDefensiveCssRuleTriple[]>>;

export type TestsCascadeDefensiveReadCssTriplesByFileStylesRoot = string;

export type TestsCascadeDefensiveReadCssTriplesByFileRelativePaths = readonly string[];

export type TestsCascadeDefensiveReadCssTriplesByFileTriplesByFile = Map<string, readonly TestsCascadeDefensiveCssRuleTriple[]>;

export type TestsCascadeDefensiveReadCssTriplesByFileAbsolutePath = string;

export type TestsCascadeDefensiveReadCssTriplesByFileContent = string;

/**
 * Tests - Cascade Defensive - Strip Block Comments.
 *
 * @since 0.18.0
 */
export type TestsCascadeDefensiveStripBlockCommentsSource = string;

export type TestsCascadeDefensiveStripBlockCommentsReturns = string;

export type TestsCascadeDefensiveStripBlockCommentsPattern = RegExp;

/**
 * Tests - Cascade Defensive - Strip Dark Selector Prefix.
 *
 * @since 0.18.0
 */
export type TestsCascadeDefensiveStripDarkSelectorPrefixSelector = string;

export type TestsCascadeDefensiveStripDarkSelectorPrefixReturns = string | null;

export type TestsCascadeDefensiveStripDarkSelectorPrefixPattern = RegExp;

/**
 * Tests - Cascade Defensive - Triple Key.
 *
 * @since 0.18.0
 */
export type TestsCascadeDefensiveTripleKeyTriple = TestsCascadeDefensiveCssRuleTriple;

export type TestsCascadeDefensiveTripleKeyReturns = string;
