import type { SourceFile } from 'typescript';

/**
 * Tests - Type Declarations - Test Config.
 *
 * @since 0.15.0
 */
export type Tests_TypeDeclarations_TestConfig_StandaloneTypeFiles = string[];

export type Tests_TypeDeclarations_TestConfig_TypeRoots = string[];

export type Tests_TypeDeclarations_TestConfig = {
  standaloneTypeFiles: Tests_TypeDeclarations_TestConfig_StandaloneTypeFiles;
  typeRoots: Tests_TypeDeclarations_TestConfig_TypeRoots;
};

/**
 * Tests - Type Declarations - Build Dts Sections.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_BuildDtsSections_DtsLines = string[];

export type Tests_TypeDeclarations_BuildDtsSections_SourceSections = Set<string>;

export type Tests_TypeDeclarations_BuildDtsSections_ClassPrefix = string;

export type Tests_TypeDeclarations_BuildDtsSections_Section_Prefix = string;

export type Tests_TypeDeclarations_BuildDtsSections_Section_TypeLines = string[];

export type Tests_TypeDeclarations_BuildDtsSections_Section = {
  prefix: Tests_TypeDeclarations_BuildDtsSections_Section_Prefix;
  typeLines: Tests_TypeDeclarations_BuildDtsSections_Section_TypeLines;
};

export type Tests_TypeDeclarations_BuildDtsSections_Returns = Tests_TypeDeclarations_BuildDtsSections_Section[];

export type Tests_TypeDeclarations_BuildDtsSections_SortedSections = string[];

export type Tests_TypeDeclarations_BuildDtsSections_SectionMap = Map<string, Tests_TypeDeclarations_BuildDtsSections_Section>;

export type Tests_TypeDeclarations_BuildDtsSections_SectionOrder = string[];

export type Tests_TypeDeclarations_BuildDtsSections_Match = RegExpMatchArray | null;

export type Tests_TypeDeclarations_BuildDtsSections_TypeName = string;

export type Tests_TypeDeclarations_BuildDtsSections_OwningSection = string;

/**
 * Tests - Type Declarations - Build Source Section Map.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_BuildSourceSectionMap_FilePath = string;

export type Tests_TypeDeclarations_BuildSourceSectionMap_Content = string;

export type Tests_TypeDeclarations_BuildSourceSectionMap_ClassPrefix = string;

export type Tests_TypeDeclarations_BuildSourceSectionMap_Returns = Map<number, string>;

export type Tests_TypeDeclarations_BuildSourceSectionMap_SectionMap = Map<number, string>;

export type Tests_TypeDeclarations_BuildSourceSectionMap_LineNumber = number;

export type Tests_TypeDeclarations_BuildSourceSectionMap_MaxDepth = number;

export type Tests_TypeDeclarations_BuildSourceSectionMap_CurrentDepth = number;

export type Tests_TypeDeclarations_BuildSourceSectionMap_Section = string;

/**
 * Tests - Type Declarations - Check Type Name Uniqueness.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_CheckTypeNameUniqueness_Declaration_Name = string;

export type Tests_TypeDeclarations_CheckTypeNameUniqueness_Declaration_TypeName = string;

export type Tests_TypeDeclarations_CheckTypeNameUniqueness_Declaration_LineNumber = number;

export type Tests_TypeDeclarations_CheckTypeNameUniqueness_Declaration = {
  name: Tests_TypeDeclarations_CheckTypeNameUniqueness_Declaration_Name;
  typeName: Tests_TypeDeclarations_CheckTypeNameUniqueness_Declaration_TypeName;
  lineNumber: Tests_TypeDeclarations_CheckTypeNameUniqueness_Declaration_LineNumber;
};

export type Tests_TypeDeclarations_CheckTypeNameUniqueness_Declarations = Tests_TypeDeclarations_CheckTypeNameUniqueness_Declaration[];

export type Tests_TypeDeclarations_CheckTypeNameUniqueness_Violation = string;

export type Tests_TypeDeclarations_CheckTypeNameUniqueness_Returns = Tests_TypeDeclarations_CheckTypeNameUniqueness_Violations;

export type Tests_TypeDeclarations_CheckTypeNameUniqueness_Violations = Tests_TypeDeclarations_CheckTypeNameUniqueness_Violation[];

export type Tests_TypeDeclarations_CheckTypeNameUniqueness_SeenMap = Map<Tests_TypeDeclarations_CheckTypeNameUniqueness_Declaration_TypeName, Tests_TypeDeclarations_CheckTypeNameUniqueness_FirstOccurrence>;

export type Tests_TypeDeclarations_CheckTypeNameUniqueness_FirstOccurrence_Name = string;

export type Tests_TypeDeclarations_CheckTypeNameUniqueness_FirstOccurrence_LineNumber = number;

export type Tests_TypeDeclarations_CheckTypeNameUniqueness_FirstOccurrence = {
  name: Tests_TypeDeclarations_CheckTypeNameUniqueness_FirstOccurrence_Name;
  lineNumber: Tests_TypeDeclarations_CheckTypeNameUniqueness_FirstOccurrence_LineNumber;
};

/**
 * Tests - Type Declarations - Derive Class Prefix.
 *
 * @since 0.15.0
 */
export type Tests_TypeDeclarations_DeriveClassPrefix_FilePath = string;

export type Tests_TypeDeclarations_DeriveClassPrefix_Returns = string;

export type Tests_TypeDeclarations_DeriveClassPrefix_CurrentDirectory = string;

export type Tests_TypeDeclarations_DeriveClassPrefix_RelativePath = string;

export type Tests_TypeDeclarations_DeriveClassPrefix_RelativeCleaned = string;

export type Tests_TypeDeclarations_DeriveClassPrefix_Segments = string[];

/**
 * Tests - Type Declarations - Derive Source Path.
 *
 * @since 0.15.0
 */
export type Tests_TypeDeclarations_DeriveSourcePath_DtsPath = string;

export type Tests_TypeDeclarations_DeriveSourcePath_Returns = string;

/**
 * Tests - Type Declarations - Detect Inline Typed Callbacks.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_DetectInlineTypedCallbacks_Callback_ParamName = string;

export type Tests_TypeDeclarations_DetectInlineTypedCallbacks_Callback_TypeName = string;

export type Tests_TypeDeclarations_DetectInlineTypedCallbacks_Callback_LineNumber = number;

export type Tests_TypeDeclarations_DetectInlineTypedCallbacks_Callback = {
  paramName: Tests_TypeDeclarations_DetectInlineTypedCallbacks_Callback_ParamName;
  typeName: Tests_TypeDeclarations_DetectInlineTypedCallbacks_Callback_TypeName;
  lineNumber: Tests_TypeDeclarations_DetectInlineTypedCallbacks_Callback_LineNumber;
};

export type Tests_TypeDeclarations_DetectInlineTypedCallbacks_FilePath = string;

export type Tests_TypeDeclarations_DetectInlineTypedCallbacks_Content = string;

export type Tests_TypeDeclarations_DetectInlineTypedCallbacks_Returns = Tests_TypeDeclarations_DetectInlineTypedCallbacks_Callback[];

export type Tests_TypeDeclarations_DetectInlineTypedCallbacks_Callbacks = Tests_TypeDeclarations_DetectInlineTypedCallbacks_Callback[];

export type Tests_TypeDeclarations_DetectInlineTypedCallbacks_LineNumber = number;

/**
 * Tests - Type Declarations - Discover Source Files.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_DiscoverSourceFiles_Files = string[];

export type Tests_TypeDeclarations_DiscoverSourceFiles_Returns = Promise<string[]>;

export type Tests_TypeDeclarations_DiscoverSourceFiles_Patterns = string[];

export type Tests_TypeDeclarations_DiscoverSourceFiles_IgnorePatterns = string[];

export type Tests_TypeDeclarations_DiscoverSourceFiles_Matched = string[];

/**
 * Tests - Type Declarations - Discover Type Files.
 *
 * @since 0.15.0
 */
export type Tests_TypeDeclarations_DiscoverTypeFiles_Returns = Promise<string[]>;

export type Tests_TypeDeclarations_DiscoverTypeFiles_Patterns = string[];

export type Tests_TypeDeclarations_DiscoverTypeFiles_Matched = string[];

/**
 * Tests - Type Declarations - Extract Array Types.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_ExtractArrayTypes_ArrayType_ArrayTypeName = string;

export type Tests_TypeDeclarations_ExtractArrayTypes_ArrayType_ElementTypeName = string;

export type Tests_TypeDeclarations_ExtractArrayTypes_ArrayType_LineIndex = number;

export type Tests_TypeDeclarations_ExtractArrayTypes_ArrayType = {
  arrayTypeName: Tests_TypeDeclarations_ExtractArrayTypes_ArrayType_ArrayTypeName;
  elementTypeName: Tests_TypeDeclarations_ExtractArrayTypes_ArrayType_ElementTypeName;
  lineIndex: Tests_TypeDeclarations_ExtractArrayTypes_ArrayType_LineIndex;
};

export type Tests_TypeDeclarations_ExtractArrayTypes_Lines = string[];

export type Tests_TypeDeclarations_ExtractArrayTypes_Returns = Tests_TypeDeclarations_ExtractArrayTypes_ArrayType[];

export type Tests_TypeDeclarations_ExtractArrayTypes_ArrayTypes = Tests_TypeDeclarations_ExtractArrayTypes_ArrayType[];

export type Tests_TypeDeclarations_ExtractArrayTypes_LineIndex = number;

export type Tests_TypeDeclarations_ExtractArrayTypes_Line = string;

export type Tests_TypeDeclarations_ExtractArrayTypes_Match = RegExpMatchArray | null;

/**
 * Tests - Type Declarations - Extract Body Declarations.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_ExtractBodyDeclarations_Declaration_Keyword = 'const' | 'let';

export type Tests_TypeDeclarations_ExtractBodyDeclarations_Declaration_VarName = string;

export type Tests_TypeDeclarations_ExtractBodyDeclarations_Declaration_TypeName = string;

export type Tests_TypeDeclarations_ExtractBodyDeclarations_Declaration_LineNumber = number;

export type Tests_TypeDeclarations_ExtractBodyDeclarations_Declaration = {
  keyword: Tests_TypeDeclarations_ExtractBodyDeclarations_Declaration_Keyword;
  varName: Tests_TypeDeclarations_ExtractBodyDeclarations_Declaration_VarName;
  typeName: Tests_TypeDeclarations_ExtractBodyDeclarations_Declaration_TypeName;
  lineNumber: Tests_TypeDeclarations_ExtractBodyDeclarations_Declaration_LineNumber;
};

export type Tests_TypeDeclarations_ExtractBodyDeclarations_Lines = string[];

export type Tests_TypeDeclarations_ExtractBodyDeclarations_Returns = Tests_TypeDeclarations_ExtractBodyDeclarations_Declaration[];

export type Tests_TypeDeclarations_ExtractBodyDeclarations_Declarations = Tests_TypeDeclarations_ExtractBodyDeclarations_Declaration[];

export type Tests_TypeDeclarations_ExtractBodyDeclarations_LineIndex = number;

export type Tests_TypeDeclarations_ExtractBodyDeclarations_Line = string;

export type Tests_TypeDeclarations_ExtractBodyDeclarations_Match = RegExpMatchArray | null;

export type Tests_TypeDeclarations_ExtractBodyDeclarations_Keyword = 'const' | 'let';

/**
 * Tests - Type Declarations - Extract Function Params.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_ExtractFunctionParams_Param_ParamName = string;

export type Tests_TypeDeclarations_ExtractFunctionParams_Param_TypeName = string;

export type Tests_TypeDeclarations_ExtractFunctionParams_Param_LineNumber = number;

export type Tests_TypeDeclarations_ExtractFunctionParams_Param = {
  paramName: Tests_TypeDeclarations_ExtractFunctionParams_Param_ParamName;
  typeName: Tests_TypeDeclarations_ExtractFunctionParams_Param_TypeName;
  lineNumber: Tests_TypeDeclarations_ExtractFunctionParams_Param_LineNumber;
};

export type Tests_TypeDeclarations_ExtractFunctionParams_FilePath = string;

export type Tests_TypeDeclarations_ExtractFunctionParams_Content = string;

export type Tests_TypeDeclarations_ExtractFunctionParams_Returns = Tests_TypeDeclarations_ExtractFunctionParams_Param[];

export type Tests_TypeDeclarations_ExtractFunctionParams_Params = Tests_TypeDeclarations_ExtractFunctionParams_Param[];

export type Tests_TypeDeclarations_ExtractFunctionParams_LineNumber = number;

/**
 * Tests - Type Declarations - Extract Function Returns.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_ExtractFunctionReturns_Return_ReturnType = string;

export type Tests_TypeDeclarations_ExtractFunctionReturns_Return_IsTypeGuard = boolean;

export type Tests_TypeDeclarations_ExtractFunctionReturns_Return_LineNumber = number;

export type Tests_TypeDeclarations_ExtractFunctionReturns_Return = {
  returnType: Tests_TypeDeclarations_ExtractFunctionReturns_Return_ReturnType;
  isTypeGuard: Tests_TypeDeclarations_ExtractFunctionReturns_Return_IsTypeGuard;
  lineNumber: Tests_TypeDeclarations_ExtractFunctionReturns_Return_LineNumber;
};

export type Tests_TypeDeclarations_ExtractFunctionReturns_FilePath = string;

export type Tests_TypeDeclarations_ExtractFunctionReturns_Content = string;

export type Tests_TypeDeclarations_ExtractFunctionReturns_Returns = Tests_TypeDeclarations_ExtractFunctionReturns_Return[];

export type Tests_TypeDeclarations_ExtractFunctionReturns_FunctionReturns = Tests_TypeDeclarations_ExtractFunctionReturns_Return[];

export type Tests_TypeDeclarations_ExtractFunctionReturns_ReturnType = string;

export type Tests_TypeDeclarations_ExtractFunctionReturns_IsTypeGuard = boolean;

export type Tests_TypeDeclarations_ExtractFunctionReturns_LineNumber = number;

/**
 * Tests - Type Declarations - Extract Imported Names.
 *
 * @since 0.15.0
 */
export type Tests_TypeDeclarations_ExtractImportedNames_Lines = string[];

export type Tests_TypeDeclarations_ExtractImportedNames_Returns = Set<string>;

export type Tests_TypeDeclarations_ExtractImportedNames_ImportedNames = Set<string>;

export type Tests_TypeDeclarations_ExtractImportedNames_InImportBlock = boolean;

export type Tests_TypeDeclarations_ExtractImportedNames_Match = RegExpMatchArray | null;

export type Tests_TypeDeclarations_ExtractImportedNames_InlineMatchCapture = string;

export type Tests_TypeDeclarations_ExtractImportedNames_Specifiers = string[];

export type Tests_TypeDeclarations_ExtractImportedNames_Trimmed = string;

/**
 * Tests - Type Declarations - Extract Object Types.
 *
 * @since 0.15.0
 */
export type Tests_TypeDeclarations_ExtractObjectTypes_Lines = string[];

export type Tests_TypeDeclarations_ExtractObjectTypes_ClassPrefix = string;

export type Tests_TypeDeclarations_ExtractObjectTypes_ObjectPropertyKey = string;

export type Tests_TypeDeclarations_ExtractObjectTypes_ObjectPropertyValueType = string;

export type Tests_TypeDeclarations_ExtractObjectTypes_ObjectPropertyLineIndex = number;

export type Tests_TypeDeclarations_ExtractObjectTypes_ObjectProperty = {
  key: Tests_TypeDeclarations_ExtractObjectTypes_ObjectPropertyKey;
  valueType: Tests_TypeDeclarations_ExtractObjectTypes_ObjectPropertyValueType;
  typeLineIndex: Tests_TypeDeclarations_ExtractObjectTypes_ObjectPropertyLineIndex;
};

export type Tests_TypeDeclarations_ExtractObjectTypes_ObjectTypeProperties = Tests_TypeDeclarations_ExtractObjectTypes_ObjectProperty[];

export type Tests_TypeDeclarations_ExtractObjectTypes_ObjectTypeName = string;

export type Tests_TypeDeclarations_ExtractObjectTypes_ObjectTypeLineIndex = number;

export type Tests_TypeDeclarations_ExtractObjectTypes_ObjectType = {
  name: Tests_TypeDeclarations_ExtractObjectTypes_ObjectTypeName;
  lineIndex: Tests_TypeDeclarations_ExtractObjectTypes_ObjectTypeLineIndex;
  properties: Tests_TypeDeclarations_ExtractObjectTypes_ObjectTypeProperties;
};

export type Tests_TypeDeclarations_ExtractObjectTypes_Returns = Tests_TypeDeclarations_ExtractObjectTypes_ObjectType[];

export type Tests_TypeDeclarations_ExtractObjectTypes_ObjectTypes = Tests_TypeDeclarations_ExtractObjectTypes_ObjectType[];

export type Tests_TypeDeclarations_ExtractObjectTypes_TypeLineMap = Map<string, number>;

export type Tests_TypeDeclarations_ExtractObjectTypes_LineIndex = number;

export type Tests_TypeDeclarations_ExtractObjectTypes_Line = string;

export type Tests_TypeDeclarations_ExtractObjectTypes_Match = RegExpMatchArray | null;

export type Tests_TypeDeclarations_ExtractObjectTypes_Trimmed = string;

export type Tests_TypeDeclarations_ExtractObjectTypes_PropertyKey = string;

export type Tests_TypeDeclarations_ExtractObjectTypes_PropertyValueType = string;

export type Tests_TypeDeclarations_ExtractObjectTypes_TypeName = string;

/**
 * Tests - Type Declarations - Extract Referenced Types.
 *
 * @since 0.15.0
 */
export type Tests_TypeDeclarations_ExtractReferencedTypes_Line = string;

export type Tests_TypeDeclarations_ExtractReferencedTypes_ClassPrefix = string;

export type Tests_TypeDeclarations_ExtractReferencedTypes_Returns = string[];

export type Tests_TypeDeclarations_ExtractReferencedTypes_Match = RegExpMatchArray | null;

export type Tests_TypeDeclarations_ExtractReferencedTypes_TypeName = string;

export type Tests_TypeDeclarations_ExtractReferencedTypes_RightSide = string;

export type Tests_TypeDeclarations_ExtractReferencedTypes_ReferencedTypes = string[];

export type Tests_TypeDeclarations_ExtractReferencedTypes_TypePattern = RegExp;

export type Tests_TypeDeclarations_ExtractReferencedTypes_TypeMatch = RegExpExecArray | null;

export type Tests_TypeDeclarations_ExtractReferencedTypes_ReferencedType = string;

/**
 * Tests - Type Declarations - Extract Top Level Identifiers.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_ExtractTopLevelIdentifiers_FilePath = string;

export type Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Content = string;

export type Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Identifier_Name = string;

export type Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Identifier_Kind = 'class' | 'function' | 'const';

export type Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Identifier_LineNumber = number;

export type Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Identifier = {
  name: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Identifier_Name;
  kind: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Identifier_Kind;
  lineNumber: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Identifier_LineNumber;
};

export type Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Identifiers = Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Identifier[];

export type Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns = Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Identifier[];

export type Tests_TypeDeclarations_ExtractTopLevelIdentifiers_LineNumber = number;

/**
 * Tests - Type Declarations - Extract Type Names.
 *
 * @since 0.15.0
 */
export type Tests_TypeDeclarations_ExtractTypeNames_TypeLines = string[];

export type Tests_TypeDeclarations_ExtractTypeNames_Returns = string[];

export type Tests_TypeDeclarations_ExtractTypeNames_TypeNames = string[];

export type Tests_TypeDeclarations_ExtractTypeNames_Match = RegExpMatchArray | null;

/**
 * Tests - Type Declarations - File Exists.
 *
 * @since 0.15.0
 */
export type Tests_TypeDeclarations_FileExists_FilePath = string;

export type Tests_TypeDeclarations_FileExists_Returns = Promise<boolean>;

/**
 * Tests - Type Declarations - Find First Occurrence.
 *
 * @since 0.15.0
 */
export type Tests_TypeDeclarations_FindFirstOccurrence_SourceLines = string[];

export type Tests_TypeDeclarations_FindFirstOccurrence_TypeName = string;

export type Tests_TypeDeclarations_FindFirstOccurrence_Returns = number;

export type Tests_TypeDeclarations_FindFirstOccurrence_InImportBlock = boolean;

export type Tests_TypeDeclarations_FindFirstOccurrence_LineIndex = number;

export type Tests_TypeDeclarations_FindFirstOccurrence_Line = string;

export type Tests_TypeDeclarations_FindFirstOccurrence_TypeNamePattern = RegExp;

/**
 * Tests - Type Declarations - Get Package Root.
 *
 * @since 0.15.0
 */
export type Tests_TypeDeclarations_GetPackageRoot_Returns = string;

export type Tests_TypeDeclarations_GetPackageRoot_CurrentFilePath = string;

export type Tests_TypeDeclarations_GetPackageRoot_CurrentFileDirectory = string;

/**
 * Tests - Type Declarations - Is Alias To Foreign Type.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_IsAliasToForeignType_TypeName = string;

export type Tests_TypeDeclarations_IsAliasToForeignType_DtsContent = string;

export type Tests_TypeDeclarations_IsAliasToForeignType_ClassPrefix = string;

export type Tests_TypeDeclarations_IsAliasToForeignType_Returns = boolean;

export type Tests_TypeDeclarations_IsAliasToForeignType_Pattern = RegExp;

export type Tests_TypeDeclarations_IsAliasToForeignType_Match = RegExpMatchArray | null;

export type Tests_TypeDeclarations_IsAliasToForeignType_Rhs = string;

export type Tests_TypeDeclarations_IsAliasToForeignType_TypeMatch = RegExpMatchArray | null;

export type Tests_TypeDeclarations_IsAliasToForeignType_LeftmostType = string;

/**
 * Tests - Type Declarations - Is Locally Defined.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_IsLocallyDefined_TypeName = string;

export type Tests_TypeDeclarations_IsLocallyDefined_DtsContent = string;

export type Tests_TypeDeclarations_IsLocallyDefined_Returns = boolean;

export type Tests_TypeDeclarations_IsLocallyDefined_Pattern = RegExp;

/**
 * Tests - Type Declarations - Is Reserved Suffix.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_IsReservedSuffix_TypeName = string;

export type Tests_TypeDeclarations_IsReservedSuffix_Returns = boolean;

/**
 * Tests - Type Declarations - Parse Describe String.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_ParseDescribeString_Input = string;

export type Tests_TypeDeclarations_ParseDescribeString_Returns = string;

export type Tests_TypeDeclarations_ParseDescribeString_Pieces = string[];

/**
 * Tests - Type Declarations - Parse Source File.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_ParseSourceFile_FilePath = string;

export type Tests_TypeDeclarations_ParseSourceFile_Content = string;

export type Tests_TypeDeclarations_ParseSourceFile_Returns = SourceFile;

export type Tests_TypeDeclarations_ParseSourceFile_CachedEntry_Content = string;

export type Tests_TypeDeclarations_ParseSourceFile_CachedEntry_SourceFile = SourceFile;

export type Tests_TypeDeclarations_ParseSourceFile_CachedEntry = {
  content: Tests_TypeDeclarations_ParseSourceFile_CachedEntry_Content;
  sourceFile: Tests_TypeDeclarations_ParseSourceFile_CachedEntry_SourceFile;
};

export type Tests_TypeDeclarations_ParseSourceFile_Cached = Tests_TypeDeclarations_ParseSourceFile_CachedEntry | undefined;

/**
 * Tests - Type Declarations - Run Rule Pipeline.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_RunRulePipeline_FilePath = string;

export type Tests_TypeDeclarations_RunRulePipeline_SourceContent = string;

export type Tests_TypeDeclarations_RunRulePipeline_DtsContent = string;

export type Tests_TypeDeclarations_RunRulePipeline_ClassPrefix = string;

export type Tests_TypeDeclarations_RunRulePipeline_Returns = string[];

export type Tests_TypeDeclarations_RunRulePipeline_Violations = string[];

/**
 * Tests - Type Declarations - Strip Underscore Prefix.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_StripUnderscorePrefix_Input = string;

export type Tests_TypeDeclarations_StripUnderscorePrefix_Returns = string;

/**
 * Tests - Type Declarations - Type Declaration Cross-section References.
 *
 * @since 0.15.0
 */
export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Files = string[];

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_CurrentDirectory = string;

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_RelativePath = string;

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SourcePath = string;

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SourceExists = boolean;

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Content = string;

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Lines = string[];

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SourceContent = string;

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_ClassPrefix = string;

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SectionMap = Map<number, string>;

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SourceSectionSet = Set<string>;

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_ImportedNames = Set<string>;

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SectionPrefix = string;

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SectionTypeLines = string[];

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Section = {
  prefix: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SectionPrefix;
  typeLines: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SectionTypeLines;
};

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Sections = Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Section[];

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SectionPrefixes = string[];

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Violations = string[];

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_CurrentSectionPrefix = string;

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_ReferencedTypes = string[];

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_IsSameSection = boolean;

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_IsImported = boolean;

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_IsOtherSection = boolean;

export type Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Violation = string;

/**
 * Tests - Type Declarations - Type Declaration Filename Validation.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_TypeDeclarationFilenameValidation_SourceFiles = string[];

export type Tests_TypeDeclarations_TypeDeclarationFilenameValidation_DtsFiles = string[];

export type Tests_TypeDeclarations_TypeDeclarationFilenameValidation_AllFiles = string[];

export type Tests_TypeDeclarations_TypeDeclarationFilenameValidation_CurrentDirectory = string;

export type Tests_TypeDeclarations_TypeDeclarationFilenameValidation_RelativePath = string;

export type Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Cleaned = string;

export type Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Segments = string[];

export type Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Pattern = RegExp;

export type Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Violations = string[];

export type Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Violation = string;

export type Tests_TypeDeclarations_TypeDeclarationFilenameValidation_ViolationMessage = string;

/**
 * Tests - Type Declarations - Type Declaration First-come-first-serve Order.
 *
 * @since 0.15.0
 */
export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Files = string[];

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_CurrentDirectory = string;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_RelativePath = string;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SourcePath = string;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SourceExists = boolean;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SourcePathAlternative = string;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Content = string;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Lines = string[];

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SectionPrefix = string;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SectionTypeLines = string[];

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Section = {
  prefix: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SectionPrefix;
  typeLines: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SectionTypeLines;
};

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Sections = Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Section[];

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ClassPrefix = string;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SectionMap = Map<number, string>;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SourceSectionSet = Set<string>;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectPropertyKey = string;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectPropertyValueType = string;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectPropertyLineIndex = number;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectProperty = {
  key: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectPropertyKey;
  valueType: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectPropertyValueType;
  typeLineIndex: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectPropertyLineIndex;
};

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectTypeProperties = Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectProperty[];

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectTypeName = string;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectTypeLineIndex = number;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectType = {
  name: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectTypeName;
  lineIndex: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectTypeLineIndex;
  properties: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectTypeProperties;
};

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectTypes = Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectType[];

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectPropertyTypeNames = Set<string>;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ArrayElementTypeNames = Set<string>;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ArrayTypes = Tests_TypeDeclarations_ExtractArrayTypes_ArrayType[];

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Violations = string[];

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_TypeNames = string[];

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_TypePositionName = string;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_TypePositionSourceLine = number;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_TypePosition = {
  name: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_TypePositionName;
  sourceLine: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_TypePositionSourceLine;
};

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_TypePositions = Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_TypePosition[];

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SourceLineIndex = number;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_LineIndex = number;

export type Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Violation = string;

/**
 * Tests - Type Declarations - Type Declaration Identifier Vs File Name.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Files = string[];

export type Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_CurrentDirectory = string;

export type Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_RelativePath = string;

export type Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Content = string;

export type Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_ClassPrefix = string;

export type Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Segments = string[];

export type Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_FileName = string;

export type Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Identifier_Name = string;

export type Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Identifier_Kind = 'class' | 'function' | 'const';

export type Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Identifier_LineNumber = number;

export type Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Identifier = {
  name: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Identifier_Name;
  kind: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Identifier_Kind;
  lineNumber: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Identifier_LineNumber;
};

export type Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Identifiers = Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Identifier[];

export type Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Violations = string[];

export type Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Violation = string;

export type Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_ViolationMessage = string;

/**
 * Tests - Type Declarations - Type Declaration Import Specifier Order.
 *
 * @since 0.15.0
 */
export type Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Files = string[];

export type Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_CurrentDirectory = string;

export type Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_RelativePath = string;

export type Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Content = string;

export type Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Lines = string[];

export type Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Violations = string[];

export type Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_SpecifierBuffer = string[];

export type Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_InImportBlock = boolean;

export type Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Match = RegExpMatchArray | null;

export type Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_InlineMatchCapture = string;

export type Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Specifiers = string[];

export type Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_PreviousSpecifier = string | undefined;

export type Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_CurrentSpecifier = string | undefined;

export type Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Violation = string;

export type Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Trimmed = string;

/**
 * Tests - Type Declarations - Type Declaration Object Property Types.
 *
 * @since 0.15.0
 */
export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Files = string[];

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_CurrentDirectory = string;

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_RelativePath = string;

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Content = string;

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Lines = string[];

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ClassPrefix = string;

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Violations = string[];

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_DefinedTypes = Set<string>;

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_LineIndex = number;

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Line = string;

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Match = RegExpMatchArray | null;

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ObjectPropertyKey = string;

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ObjectPropertyValueType = string;

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ObjectPropertyLineIndex = number;

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ObjectProperty = {
  key: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ObjectPropertyKey;
  valueType: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ObjectPropertyValueType;
  typeLineIndex: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ObjectPropertyLineIndex;
};

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ObjectTypeProperties = Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ObjectProperty[];

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ObjectTypeName = string;

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ObjectTypeLineIndex = number;

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ObjectType = {
  name: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ObjectTypeName;
  lineIndex: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ObjectTypeLineIndex;
  properties: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ObjectTypeProperties;
};

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ObjectTypes = Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ObjectType[];

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_PropertyExpectedPrefix = string;

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ImportedNames = Set<string>;

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ArrayTypes = Tests_TypeDeclarations_ExtractArrayTypes_ArrayType[];

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_TypeDefLines = Map<string, number>;

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ElementLine = number;

export type Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Violation = string;

/**
 * Tests - Type Declarations - Type Declaration Section Alphabetical Order.
 *
 * @since 0.15.0
 */
export type Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Files = string[];

export type Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_CurrentDirectory = string;

export type Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_RelativePath = string;

export type Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SourcePath = string;

export type Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SourceExists = boolean;

export type Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Content = string;

export type Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Lines = string[];

export type Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SourceContent = string;

export type Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_ClassPrefix = string;

export type Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SectionMap = Map<number, string>;

export type Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SourceSectionSet = Set<string>;

export type Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SectionPrefix = string;

export type Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SectionTypeLines = string[];

export type Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Section = {
  prefix: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SectionPrefix;
  typeLines: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SectionTypeLines;
};

export type Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Sections = Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Section[];

export type Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Violations = string[];

export type Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SectionIndex = number;

export type Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_CompareResult = number;

export type Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Violation = string;

/**
 * Tests - Type Declarations - Type Declaration Section Coverage.
 *
 * @since 0.15.0
 */
export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Files = string[];

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_CurrentDirectory = string;

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_RelativePath = string;

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_SourcePath = string;

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_SourceExists = boolean;

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_SourcePathAlternative = string;

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Content = string;

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Lines = string[];

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ClassPrefix = string;

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_SectionMap = Map<number, string>;

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_SourceSectionSet = Set<string>;

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_SectionPrefix = string;

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_SectionTypeLines = string[];

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Section = {
  prefix: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_SectionPrefix;
  typeLines: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_SectionTypeLines;
};

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Sections = Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Section[];

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_DtsSectionPrefixes = Set<string>;

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Violations = string[];

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_IsParent = boolean;

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ReverseMatch = RegExpMatchArray | null;

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ReverseTypeName = string;

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ReverseAfterClassPrefix = string;

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ReverseChunks = string[];

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ReverseExpectedMethodSection = string;

export type Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Violation = string;

/**
 * Tests - Type Declarations - Type Declaration Standalone Type Files.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_SourceFiles = string[];

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_DtsFiles = string[];

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_TopLevelPathPrefixes = Set<string>;

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_SourceClassPrefix = string;

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_FirstChunk = string | undefined;

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_StandaloneFiles = string[];

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_CurrentDirectory = string;

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_RelativePath = string;

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_Content = string;

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_Lines = string[];

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_TypeLines = string[];

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_TypeNames = string[];

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_LocalTypeSet = Set<string>;

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_PrimitiveSet = Set<string>;

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_PascalCasePattern = RegExp;

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_BrandCasePattern = RegExp;

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_Violations = string[];

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_Violation = string;

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_ViolationMessage = string;

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_ExpectedPropertyPrefix = string;

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_TypePositions = Map<string, number>;

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_LineIndex = number;

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_LineToScan = string;

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_PositionMatch = RegExpMatchArray | null;

export type Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_ElementLine = number;

/**
 * Tests - Type Declarations - Type Declaration Variable Type Symmetry.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Files = string[];

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_CurrentDirectory = string;

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_RelativePath = string;

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Content = string;

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Lines = string[];

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_ClassPrefix = string;

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_SectionMap = Tests_TypeDeclarations_BuildSourceSectionMap_Returns;

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_DtsPath = string;

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_DtsExists = boolean;

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_DtsContent = string;

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Violations = string[];

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Callbacks = Tests_TypeDeclarations_DetectInlineTypedCallbacks_Returns;

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_BodyDecls = Tests_TypeDeclarations_ExtractBodyDeclarations_Returns;

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_ExpectedNames = Tests_TypeDeclarations_CheckTypeNameUniqueness_Declarations;

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_SourceSection = string;

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_LeafResult = Tests_TypeDeclarations_ValidateLeaf_Returns;

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Stripped = string;

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_TitleVar = string;

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Params = Tests_TypeDeclarations_ExtractFunctionParams_Returns;

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_FunctionReturns = Tests_TypeDeclarations_ExtractFunctionReturns_Returns;

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_ReturnValidationReason = Tests_TypeDeclarations_ValidateReturnType_Returns;

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_UniquenessViolations = Tests_TypeDeclarations_CheckTypeNameUniqueness_Returns;

export type Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Violation = string;

/**
 * Tests - Type Declarations - Validate Leaf.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_ValidateLeaf_VarName = string;

export type Tests_TypeDeclarations_ValidateLeaf_TypeName = string;

export type Tests_TypeDeclarations_ValidateLeaf_SourceSection = string;

export type Tests_TypeDeclarations_ValidateLeaf_ClassPrefix = string;

export type Tests_TypeDeclarations_ValidateLeaf_Returns = Tests_TypeDeclarations_ValidateLeaf_Reason | null;

export type Tests_TypeDeclarations_ValidateLeaf_Stripped = string;

export type Tests_TypeDeclarations_ValidateLeaf_TitleVar = string;

export type Tests_TypeDeclarations_ValidateLeaf_ExpectedSection = string;

export type Tests_TypeDeclarations_ValidateLeaf_ExpectedClass = string;

export type Tests_TypeDeclarations_ValidateLeaf_ActualLeaf = string;

export type Tests_TypeDeclarations_ValidateLeaf_Reason_ActualLeaf = string;

export type Tests_TypeDeclarations_ValidateLeaf_Reason_ExpectedLeaf = string;

export type Tests_TypeDeclarations_ValidateLeaf_Reason = {
  actualLeaf: Tests_TypeDeclarations_ValidateLeaf_Reason_ActualLeaf;
  expectedLeaf: Tests_TypeDeclarations_ValidateLeaf_Reason_ExpectedLeaf;
};

/**
 * Tests - Type Declarations - Validate Return Type.
 *
 * @since 0.18.0
 */
export type Tests_TypeDeclarations_ValidateReturnType_ReturnType = string;

export type Tests_TypeDeclarations_ValidateReturnType_IsTypeGuard = boolean;

export type Tests_TypeDeclarations_ValidateReturnType_Reason = string;

export type Tests_TypeDeclarations_ValidateReturnType_Returns = Tests_TypeDeclarations_ValidateReturnType_Reason | null;
