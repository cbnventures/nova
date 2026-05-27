/* Shared data structure type - referenced across sections. Declared before
 * any section header so it is exempt from the section ordering and
 * cross-section reference rules enforced by type-declarations.test.ts. */

export type Tests_LayeredScope_CssRuleTripleSelector = string;

export type Tests_LayeredScope_CssRuleTripleProperty = string;

export type Tests_LayeredScope_CssRuleTripleValue = string;

export type Tests_LayeredScope_CssRuleTriple = {
  readonly selector: Tests_LayeredScope_CssRuleTripleSelector;
  readonly property: Tests_LayeredScope_CssRuleTripleProperty;
  readonly value: Tests_LayeredScope_CssRuleTripleValue;
};

/**
 * Tests - Layered Scope - Extract Rule Triples.
 *
 * @since 0.18.0
 */
export type Tests_LayeredScope_ExtractRuleTriples_Source = string;

export type Tests_LayeredScope_ExtractRuleTriples_Returns = readonly Tests_LayeredScope_CssRuleTriple[];

export type Tests_LayeredScope_ExtractRuleTriples_Stripped = string;

export type Tests_LayeredScope_ExtractRuleTriples_Triples = Tests_LayeredScope_CssRuleTriple[];

export type Tests_LayeredScope_ExtractRuleTriples_AllowDuplicatePattern = RegExp;

export type Tests_LayeredScope_ExtractRuleTriples_WhitespacePattern = RegExp;

export type Tests_LayeredScope_ExtractRuleTriples_Depth = number;

export type Tests_LayeredScope_ExtractRuleTriples_BlockStart = number;

export type Tests_LayeredScope_ExtractRuleTriples_PreludeStart = number;

export type Tests_LayeredScope_ExtractRuleTriples_Allowed = boolean;

export type Tests_LayeredScope_ExtractRuleTriples_Index = number;

export type Tests_LayeredScope_ExtractRuleTriples_Char = string;

export type Tests_LayeredScope_ExtractRuleTriples_Prelude = string;

export type Tests_LayeredScope_ExtractRuleTriples_Nested = number;

export type Tests_LayeredScope_ExtractRuleTriples_Inner = string;

export type Tests_LayeredScope_ExtractRuleTriples_Body = string;

export type Tests_LayeredScope_ExtractRuleTriples_Selector = string;

export type Tests_LayeredScope_ExtractRuleTriples_Declaration = string;

export type Tests_LayeredScope_ExtractRuleTriples_Colon = number;

export type Tests_LayeredScope_ExtractRuleTriples_Property = string;

export type Tests_LayeredScope_ExtractRuleTriples_RawValue = string;

export type Tests_LayeredScope_ExtractRuleTriples_Value = string;

/**
 * Tests - Layered Scope - Get Package Root.
 *
 * @since 0.18.0
 */
export type Tests_LayeredScope_GetPackageRoot_Returns = string;

export type Tests_LayeredScope_GetPackageRoot_CurrentFilePath = string;

export type Tests_LayeredScope_GetPackageRoot_CurrentFileDirectory = string;

/**
 * Tests - Layered Scope - Layered Scope.
 *
 * @since 0.18.0
 */
export type Tests_LayeredScope_LayeredScope_Family = Tests_LayeredScope_LayeredScope_FamiliesFamily;

export type Tests_LayeredScope_LayeredScope_FamilyParam = Tests_LayeredScope_LayeredScope_FamiliesFamily;

export type Tests_LayeredScope_LayeredScope_Missing = string[];

export type Tests_LayeredScope_LayeredScope_MemberParam = Tests_LayeredScope_LayeredScope_FamiliesFamilyMember;

export type Tests_LayeredScope_LayeredScope_TsxPath = string;

export type Tests_LayeredScope_LayeredScope_Literals = readonly string[];

export type Tests_LayeredScope_LayeredScope_HasUmbrellaAndMember = boolean;

export type Tests_LayeredScope_LayeredScope_Tokens = readonly string[];

export type Tests_LayeredScope_LayeredScope_MembershipMessage = string;

export type Tests_LayeredScope_LayeredScope_SharedUmbrellaPath = string;

export type Tests_LayeredScope_LayeredScope_SharedUmbrellaTriples = readonly Tests_LayeredScope_CssRuleTriple[];

export type Tests_LayeredScope_LayeredScope_SharedUmbrellaKeys = Set<string>;

export type Tests_LayeredScope_LayeredScope_Duplicates = string[];

export type Tests_LayeredScope_LayeredScope_PresetPathPattern = RegExp;

export type Tests_LayeredScope_LayeredScope_PerPresetUmbrellaFiles = string[];

export type Tests_LayeredScope_LayeredScope_PerPresetUmbrellaByPreset = Map<string, readonly Tests_LayeredScope_CssRuleTriple[]>;

export type Tests_LayeredScope_LayeredScope_PerPresetUmbrella = string;

export type Tests_LayeredScope_LayeredScope_PresetMatch = RegExpMatchArray | null;

export type Tests_LayeredScope_LayeredScope_Preset = string;

export type Tests_LayeredScope_LayeredScope_PerPresetUmbrellaTriples = readonly Tests_LayeredScope_CssRuleTriple[];

export type Tests_LayeredScope_LayeredScope_Member = Tests_LayeredScope_LayeredScope_FamiliesFamilyMember;

export type Tests_LayeredScope_LayeredScope_SharedMemberPath = string;

export type Tests_LayeredScope_LayeredScope_SharedMemberTriples = readonly Tests_LayeredScope_CssRuleTriple[];

export type Tests_LayeredScope_LayeredScope_PerPresetMemberFiles = string[];

export type Tests_LayeredScope_LayeredScope_PerPresetMember = string;

export type Tests_LayeredScope_LayeredScope_CombinedKeys = Set<string>;

export type Tests_LayeredScope_LayeredScope_PerPresetMemberTriples = readonly Tests_LayeredScope_CssRuleTriple[];

export type Tests_LayeredScope_LayeredScope_DryMessage = string;

/**
 * Tests - Layered Scope - Layered Scope Families.
 *
 * @since 0.18.0
 */
export type Tests_LayeredScope_LayeredScope_FamiliesFamilyMemberClass = string;

export type Tests_LayeredScope_LayeredScope_FamiliesFamilyMemberTsx = string;

export type Tests_LayeredScope_LayeredScope_FamiliesFamilyMemberSharedFile = string;

export type Tests_LayeredScope_LayeredScope_FamiliesFamilyMemberPerPresetGlob = string;

export type Tests_LayeredScope_LayeredScope_FamiliesFamilyMember = {
  readonly class: Tests_LayeredScope_LayeredScope_FamiliesFamilyMemberClass;
  readonly tsx: Tests_LayeredScope_LayeredScope_FamiliesFamilyMemberTsx;
  readonly sharedFile: Tests_LayeredScope_LayeredScope_FamiliesFamilyMemberSharedFile;
  readonly perPresetGlob: Tests_LayeredScope_LayeredScope_FamiliesFamilyMemberPerPresetGlob;
};

export type Tests_LayeredScope_LayeredScope_FamiliesFamilyUmbrella = string;

export type Tests_LayeredScope_LayeredScope_FamiliesFamilySharedUmbrellaFile = string;

export type Tests_LayeredScope_LayeredScope_FamiliesFamilyPerPresetUmbrellaGlob = string;

export type Tests_LayeredScope_LayeredScope_FamiliesFamilyMembers = readonly Tests_LayeredScope_LayeredScope_FamiliesFamilyMember[];

export type Tests_LayeredScope_LayeredScope_FamiliesFamily = {
  readonly umbrella: Tests_LayeredScope_LayeredScope_FamiliesFamilyUmbrella;
  readonly sharedUmbrellaFile: Tests_LayeredScope_LayeredScope_FamiliesFamilySharedUmbrellaFile;
  readonly perPresetUmbrellaGlob: Tests_LayeredScope_LayeredScope_FamiliesFamilyPerPresetUmbrellaGlob;
  readonly members: Tests_LayeredScope_LayeredScope_FamiliesFamilyMembers;
};

export type Tests_LayeredScope_LayeredScope_Families = readonly Tests_LayeredScope_LayeredScope_FamiliesFamily[];

/**
 * Tests - Layered Scope - Read Class Name Literals.
 *
 * @since 0.18.0
 */
export type Tests_LayeredScope_ReadClassNameLiterals_FilePath = string;

export type Tests_LayeredScope_ReadClassNameLiterals_Returns = Promise<readonly string[]>;

export type Tests_LayeredScope_ReadClassNameLiterals_Content = string;

export type Tests_LayeredScope_ReadClassNameLiterals_Pattern = RegExp;

export type Tests_LayeredScope_ReadClassNameLiterals_MergePattern = RegExp;

export type Tests_LayeredScope_ReadClassNameLiterals_WhitespacePattern = RegExp;

export type Tests_LayeredScope_ReadClassNameLiterals_Literals = string[];

export type Tests_LayeredScope_ReadClassNameLiterals_Match = RegExpExecArray | null;

export type Tests_LayeredScope_ReadClassNameLiterals_Capture = string | undefined;

export type Tests_LayeredScope_ReadClassNameLiterals_MergeMatch = RegExpExecArray | null;

export type Tests_LayeredScope_ReadClassNameLiterals_MergeCapture = string | undefined;

/**
 * Tests - Layered Scope - Read Triples.
 *
 * @since 0.18.0
 */
export type Tests_LayeredScope_ReadTriples_FilePath = string;

export type Tests_LayeredScope_ReadTriples_Returns = Promise<readonly Tests_LayeredScope_CssRuleTriple[]>;

export type Tests_LayeredScope_ReadTriples_Content = string;

/**
 * Tests - Layered Scope - Strip Block Comments.
 *
 * @since 0.18.0
 */
export type Tests_LayeredScope_StripBlockComments_Source = string;

export type Tests_LayeredScope_StripBlockComments_Returns = string;

export type Tests_LayeredScope_StripBlockComments_Pattern = RegExp;

/**
 * Tests - Layered Scope - Triple Key.
 *
 * @since 0.18.0
 */
export type Tests_LayeredScope_TripleKey_Triple = Tests_LayeredScope_CssRuleTriple;

export type Tests_LayeredScope_TripleKey_Returns = string;
