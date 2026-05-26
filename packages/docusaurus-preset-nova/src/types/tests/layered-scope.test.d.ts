/* Shared data structure type - referenced across sections. Declared before
 * any section header so it is exempt from the section ordering and
 * cross-section reference rules enforced by type-declarations.test.ts. */

export type TestsLayeredScopeCssRuleTripleSelector = string;

export type TestsLayeredScopeCssRuleTripleProperty = string;

export type TestsLayeredScopeCssRuleTripleValue = string;

export type TestsLayeredScopeCssRuleTriple = {
  readonly selector: TestsLayeredScopeCssRuleTripleSelector;
  readonly property: TestsLayeredScopeCssRuleTripleProperty;
  readonly value: TestsLayeredScopeCssRuleTripleValue;
};

/**
 * Tests - Layered Scope - Extract Rule Triples.
 *
 * @since 0.18.0
 */
export type TestsLayeredScopeExtractRuleTriplesSource = string;

export type TestsLayeredScopeExtractRuleTriplesReturns = readonly TestsLayeredScopeCssRuleTriple[];

export type TestsLayeredScopeExtractRuleTriplesStripped = string;

export type TestsLayeredScopeExtractRuleTriplesTriples = TestsLayeredScopeCssRuleTriple[];

export type TestsLayeredScopeExtractRuleTriplesAllowDuplicatePattern = RegExp;

export type TestsLayeredScopeExtractRuleTriplesWhitespacePattern = RegExp;

export type TestsLayeredScopeExtractRuleTriplesDepth = number;

export type TestsLayeredScopeExtractRuleTriplesBlockStart = number;

export type TestsLayeredScopeExtractRuleTriplesPreludeStart = number;

export type TestsLayeredScopeExtractRuleTriplesAllowed = boolean;

export type TestsLayeredScopeExtractRuleTriplesIndex = number;

export type TestsLayeredScopeExtractRuleTriplesChar = string;

export type TestsLayeredScopeExtractRuleTriplesPrelude = string;

export type TestsLayeredScopeExtractRuleTriplesNested = number;

export type TestsLayeredScopeExtractRuleTriplesInner = string;

export type TestsLayeredScopeExtractRuleTriplesBody = string;

export type TestsLayeredScopeExtractRuleTriplesSelector = string;

export type TestsLayeredScopeExtractRuleTriplesDeclaration = string;

export type TestsLayeredScopeExtractRuleTriplesColon = number;

export type TestsLayeredScopeExtractRuleTriplesProperty = string;

export type TestsLayeredScopeExtractRuleTriplesRawValue = string;

export type TestsLayeredScopeExtractRuleTriplesValue = string;

/**
 * Tests - Layered Scope - Get Package Root.
 *
 * @since 0.18.0
 */
export type TestsLayeredScopeGetPackageRootReturns = string;

export type TestsLayeredScopeGetPackageRootCurrentFilePath = string;

export type TestsLayeredScopeGetPackageRootCurrentFileDirectory = string;

/**
 * Tests - Layered Scope - Layered Scope.
 *
 * @since 0.18.0
 */
export type TestsLayeredScopeLayeredScopeFamily = TestsLayeredScopeLayeredScopeFamiliesFamily;

export type TestsLayeredScopeLayeredScopeFamilyParam = TestsLayeredScopeLayeredScopeFamiliesFamily;

export type TestsLayeredScopeLayeredScopeMissing = string[];

export type TestsLayeredScopeLayeredScopeMemberParam = TestsLayeredScopeLayeredScopeFamiliesFamilyMember;

export type TestsLayeredScopeLayeredScopeTsxPath = string;

export type TestsLayeredScopeLayeredScopeLiterals = readonly string[];

export type TestsLayeredScopeLayeredScopeHasUmbrellaAndMember = boolean;

export type TestsLayeredScopeLayeredScopeTokens = readonly string[];

export type TestsLayeredScopeLayeredScopeMembershipMessage = string;

export type TestsLayeredScopeLayeredScopeSharedUmbrellaPath = string;

export type TestsLayeredScopeLayeredScopeSharedUmbrellaTriples = readonly TestsLayeredScopeCssRuleTriple[];

export type TestsLayeredScopeLayeredScopeSharedUmbrellaKeys = Set<string>;

export type TestsLayeredScopeLayeredScopeDuplicates = string[];

export type TestsLayeredScopeLayeredScopePresetPathPattern = RegExp;

export type TestsLayeredScopeLayeredScopePerPresetUmbrellaFiles = string[];

export type TestsLayeredScopeLayeredScopePerPresetUmbrellaByPreset = Map<string, readonly TestsLayeredScopeCssRuleTriple[]>;

export type TestsLayeredScopeLayeredScopePerPresetUmbrella = string;

export type TestsLayeredScopeLayeredScopePresetMatch = RegExpMatchArray | null;

export type TestsLayeredScopeLayeredScopePreset = string;

export type TestsLayeredScopeLayeredScopePerPresetUmbrellaTriples = readonly TestsLayeredScopeCssRuleTriple[];

export type TestsLayeredScopeLayeredScopeMember = TestsLayeredScopeLayeredScopeFamiliesFamilyMember;

export type TestsLayeredScopeLayeredScopeSharedMemberPath = string;

export type TestsLayeredScopeLayeredScopeSharedMemberTriples = readonly TestsLayeredScopeCssRuleTriple[];

export type TestsLayeredScopeLayeredScopePerPresetMemberFiles = string[];

export type TestsLayeredScopeLayeredScopePerPresetMember = string;

export type TestsLayeredScopeLayeredScopeCombinedKeys = Set<string>;

export type TestsLayeredScopeLayeredScopePerPresetMemberTriples = readonly TestsLayeredScopeCssRuleTriple[];

export type TestsLayeredScopeLayeredScopeDryMessage = string;

/**
 * Tests - Layered Scope - Layered Scope Families.
 *
 * @since 0.18.0
 */
export type TestsLayeredScopeLayeredScopeFamiliesFamilyMemberClass = string;

export type TestsLayeredScopeLayeredScopeFamiliesFamilyMemberTsx = string;

export type TestsLayeredScopeLayeredScopeFamiliesFamilyMemberSharedFile = string;

export type TestsLayeredScopeLayeredScopeFamiliesFamilyMemberPerPresetGlob = string;

export type TestsLayeredScopeLayeredScopeFamiliesFamilyMember = {
  readonly class: TestsLayeredScopeLayeredScopeFamiliesFamilyMemberClass;
  readonly tsx: TestsLayeredScopeLayeredScopeFamiliesFamilyMemberTsx;
  readonly sharedFile: TestsLayeredScopeLayeredScopeFamiliesFamilyMemberSharedFile;
  readonly perPresetGlob: TestsLayeredScopeLayeredScopeFamiliesFamilyMemberPerPresetGlob;
};

export type TestsLayeredScopeLayeredScopeFamiliesFamilyUmbrella = string;

export type TestsLayeredScopeLayeredScopeFamiliesFamilySharedUmbrellaFile = string;

export type TestsLayeredScopeLayeredScopeFamiliesFamilyPerPresetUmbrellaGlob = string;

export type TestsLayeredScopeLayeredScopeFamiliesFamilyMembers = readonly TestsLayeredScopeLayeredScopeFamiliesFamilyMember[];

export type TestsLayeredScopeLayeredScopeFamiliesFamily = {
  readonly umbrella: TestsLayeredScopeLayeredScopeFamiliesFamilyUmbrella;
  readonly sharedUmbrellaFile: TestsLayeredScopeLayeredScopeFamiliesFamilySharedUmbrellaFile;
  readonly perPresetUmbrellaGlob: TestsLayeredScopeLayeredScopeFamiliesFamilyPerPresetUmbrellaGlob;
  readonly members: TestsLayeredScopeLayeredScopeFamiliesFamilyMembers;
};

export type TestsLayeredScopeLayeredScopeFamilies = readonly TestsLayeredScopeLayeredScopeFamiliesFamily[];

/**
 * Tests - Layered Scope - Read Class Name Literals.
 *
 * @since 0.18.0
 */
export type TestsLayeredScopeReadClassNameLiteralsFilePath = string;

export type TestsLayeredScopeReadClassNameLiteralsReturns = Promise<readonly string[]>;

export type TestsLayeredScopeReadClassNameLiteralsContent = string;

export type TestsLayeredScopeReadClassNameLiteralsPattern = RegExp;

export type TestsLayeredScopeReadClassNameLiteralsMergePattern = RegExp;

export type TestsLayeredScopeReadClassNameLiteralsWhitespacePattern = RegExp;

export type TestsLayeredScopeReadClassNameLiteralsLiterals = string[];

export type TestsLayeredScopeReadClassNameLiteralsMatch = RegExpExecArray | null;

export type TestsLayeredScopeReadClassNameLiteralsCapture = string | undefined;

export type TestsLayeredScopeReadClassNameLiteralsMergeMatch = RegExpExecArray | null;

export type TestsLayeredScopeReadClassNameLiteralsMergeCapture = string | undefined;

/**
 * Tests - Layered Scope - Read Triples.
 *
 * @since 0.18.0
 */
export type TestsLayeredScopeReadTriplesFilePath = string;

export type TestsLayeredScopeReadTriplesReturns = Promise<readonly TestsLayeredScopeCssRuleTriple[]>;

export type TestsLayeredScopeReadTriplesContent = string;

/**
 * Tests - Layered Scope - Strip Block Comments.
 *
 * @since 0.18.0
 */
export type TestsLayeredScopeStripBlockCommentsSource = string;

export type TestsLayeredScopeStripBlockCommentsReturns = string;

export type TestsLayeredScopeStripBlockCommentsPattern = RegExp;

/**
 * Tests - Layered Scope - Triple Key.
 *
 * @since 0.18.0
 */
export type TestsLayeredScopeTripleKeyTriple = TestsLayeredScopeCssRuleTriple;

export type TestsLayeredScopeTripleKeyReturns = string;
