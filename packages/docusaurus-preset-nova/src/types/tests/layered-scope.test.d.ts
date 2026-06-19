/**
 * Tests - Layered Scope.
 *
 * @since 0.18.0
 */
export type Tests_LayeredScope_LayeredScopeFamilies = readonly {
  readonly umbrella: string; readonly sharedUmbrellaFile: string; readonly perPresetUmbrellaGlob: string; readonly members: readonly {
    readonly class: string; readonly tsx: string; readonly sharedFile: string; readonly perPresetGlob: string;
  }[];
}[];

/**
 * Tests - Layered Scope - Extract Rule Triples.
 *
 * @since 0.18.0
 */
export type Tests_LayeredScope_ExtractRuleTriples_Source = string;

export type Tests_LayeredScope_ExtractRuleTriples_Returns = readonly {
  readonly selector: string; readonly property: string; readonly value: string;
}[];

export type Tests_LayeredScope_ExtractRuleTriples_Stripped = string;

export type Tests_LayeredScope_ExtractRuleTriples_Triples = {
  readonly selector: string; readonly property: string; readonly value: string;
}[];

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

export type Tests_LayeredScope_ExtractRuleTriples_ClosePrelude = string;

export type Tests_LayeredScope_ExtractRuleTriples_Body = string;

export type Tests_LayeredScope_ExtractRuleTriples_Selector = string;

export type Tests_LayeredScope_ExtractRuleTriples_DeclarationText = string;

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
export type Tests_LayeredScope_LayeredScope_FamilyContext = {
  readonly umbrella: string; readonly sharedUmbrellaFile: string; readonly perPresetUmbrellaGlob: string; readonly members: readonly {
    readonly class: string; readonly tsx: string; readonly sharedFile: string; readonly perPresetGlob: string;
  }[];
};

export type Tests_LayeredScope_LayeredScope_FamilyParam = {
  readonly umbrella: string; readonly sharedUmbrellaFile: string; readonly perPresetUmbrellaGlob: string; readonly members: readonly {
    readonly class: string; readonly tsx: string; readonly sharedFile: string; readonly perPresetGlob: string;
  }[];
};

export type Tests_LayeredScope_LayeredScope_Missing = string[];

export type Tests_LayeredScope_LayeredScope_MemberParam = {
  readonly class: string; readonly tsx: string; readonly sharedFile: string; readonly perPresetGlob: string;
};

export type Tests_LayeredScope_LayeredScope_TsxPath = string;

export type Tests_LayeredScope_LayeredScope_Literals = readonly string[];

export type Tests_LayeredScope_LayeredScope_HasUmbrellaAndMember = boolean;

export type Tests_LayeredScope_LayeredScope_Tokens = readonly string[];

export type Tests_LayeredScope_LayeredScope_MembershipMessage = string;

export type Tests_LayeredScope_LayeredScope_DryFamilyParam = {
  readonly umbrella: string; readonly sharedUmbrellaFile: string; readonly perPresetUmbrellaGlob: string; readonly members: readonly {
    readonly class: string; readonly tsx: string; readonly sharedFile: string; readonly perPresetGlob: string;
  }[];
};

export type Tests_LayeredScope_LayeredScope_SharedUmbrellaPath = string;

export type Tests_LayeredScope_LayeredScope_SharedUmbrellaTriples = readonly {
  readonly selector: string; readonly property: string; readonly value: string;
}[];

export type Tests_LayeredScope_LayeredScope_SharedUmbrellaKeys = Set<string>;

export type Tests_LayeredScope_LayeredScope_Duplicates = string[];

export type Tests_LayeredScope_LayeredScope_PresetPathPattern = RegExp;

export type Tests_LayeredScope_LayeredScope_PerPresetUmbrellaFiles = string[];

export type Tests_LayeredScope_LayeredScope_PerPresetUmbrellaByPreset = Map<string, readonly {
  readonly selector: string; readonly property: string; readonly value: string;
}[]>;

export type Tests_LayeredScope_LayeredScope_PerPresetUmbrellaRelative = string;

export type Tests_LayeredScope_LayeredScope_PresetMatch = RegExpMatchArray | null;

export type Tests_LayeredScope_LayeredScope_Preset = string;

export type Tests_LayeredScope_LayeredScope_Triples = readonly {
  readonly selector: string; readonly property: string; readonly value: string;
}[];

export type Tests_LayeredScope_LayeredScope_DryMemberParam = {
  readonly class: string; readonly tsx: string; readonly sharedFile: string; readonly perPresetGlob: string;
};

export type Tests_LayeredScope_LayeredScope_SharedMemberPath = string;

export type Tests_LayeredScope_LayeredScope_SharedMemberTriples = readonly {
  readonly selector: string; readonly property: string; readonly value: string;
}[];

export type Tests_LayeredScope_LayeredScope_PerPresetMemberFiles = string[];

export type Tests_LayeredScope_LayeredScope_PerPresetMemberRelative = string;

export type Tests_LayeredScope_LayeredScope_MemberPresetMatch = RegExpMatchArray | null;

export type Tests_LayeredScope_LayeredScope_MemberPreset = string;

export type Tests_LayeredScope_LayeredScope_PerPresetUmbrellaTriples = readonly {
  readonly selector: string; readonly property: string; readonly value: string;
}[];

export type Tests_LayeredScope_LayeredScope_CombinedKeys = Set<string>;

export type Tests_LayeredScope_LayeredScope_PerPresetMemberTriples = readonly {
  readonly selector: string; readonly property: string; readonly value: string;
}[];

export type Tests_LayeredScope_LayeredScope_DryMessage = string;

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

export type Tests_LayeredScope_ReadTriples_Returns = Promise<readonly {
  readonly selector: string; readonly property: string; readonly value: string;
}[]>;

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
export type Tests_LayeredScope_TripleKey_Triple = {
  readonly selector: string; readonly property: string; readonly value: string;
};

export type Tests_LayeredScope_TripleKey_Returns = string;
