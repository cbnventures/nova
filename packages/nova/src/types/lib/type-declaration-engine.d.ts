import type {
  GetAccessorDeclaration,
  MethodDeclaration,
  Node,
  SetAccessorDeclaration,
  SourceFile,
  StringLiteral,
} from 'typescript';

import type {
  Shared_TypeDeclarationDtsMapping,
  Shared_TypeDeclarationEngineConfig,
} from '../shared.d.ts';

/**
 * Lib - Type Declaration Engine.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_TestConfig_StandaloneTypeFiles = string[];

export type Lib_TypeDeclarationEngine_TestConfig_TypeRoots = string[];

export type Lib_TypeDeclarationEngine_TestConfig = {
  standaloneTypeFiles: Lib_TypeDeclarationEngine_TestConfig_StandaloneTypeFiles;
  typeRoots: Lib_TypeDeclarationEngine_TestConfig_TypeRoots;
};

export type Lib_TypeDeclarationEngine_SourceFileCache = Map<string, Lib_TypeDeclarationEngine_CachedEntry>;

export type Lib_TypeDeclarationEngine_CachedEntry_Content = string;

export type Lib_TypeDeclarationEngine_CachedEntry_SourceFile = SourceFile;

export type Lib_TypeDeclarationEngine_CachedEntry = {
  content: Lib_TypeDeclarationEngine_CachedEntry_Content;
  sourceFile: Lib_TypeDeclarationEngine_CachedEntry_SourceFile;
};

/**
 * Lib - Type Declaration Engine - Build Dts Sections.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_BuildDtsSections_ClassPrefix = string;

export type Lib_TypeDeclarationEngine_BuildDtsSections_DtsLines = string[];

export type Lib_TypeDeclarationEngine_BuildDtsSections_Section_Prefix = string;

export type Lib_TypeDeclarationEngine_BuildDtsSections_Section_TypeLines = string[];

export type Lib_TypeDeclarationEngine_BuildDtsSections_Section = {
  prefix: Lib_TypeDeclarationEngine_BuildDtsSections_Section_Prefix;
  typeLines: Lib_TypeDeclarationEngine_BuildDtsSections_Section_TypeLines;
};

export type Lib_TypeDeclarationEngine_BuildDtsSections_Returns = Lib_TypeDeclarationEngine_BuildDtsSections_Section[];

export type Lib_TypeDeclarationEngine_BuildDtsSections_SourceSections = Set<string>;

export type Lib_TypeDeclarationEngine_BuildDtsSections_SortedSections = string[];

export type Lib_TypeDeclarationEngine_BuildDtsSections_SectionMap = Map<string, Lib_TypeDeclarationEngine_BuildDtsSections_Section>;

export type Lib_TypeDeclarationEngine_BuildDtsSections_SectionOrder = string[];

export type Lib_TypeDeclarationEngine_BuildDtsSections_Match = RegExpMatchArray | null;

export type Lib_TypeDeclarationEngine_BuildDtsSections_TypeName = string;

export type Lib_TypeDeclarationEngine_BuildDtsSections_OwningSection = string;

/**
 * Lib - Type Declaration Engine - Build Source Section Map.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_ClassPrefix = string;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_Content = string;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_FilePath = string;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_Returns = Map<number, string>;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_SourceFile = SourceFile;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_SectionMap = Map<number, string>;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_MaxDepth = number;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_PascalCaseReturns = string;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_CurrentDepth = number;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_TagAllChildrenReturns = void;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_VisitReturns = void;

/**
 * Lib - Type Declaration Engine - Build Source Section Map - Get Line.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_GetLine_Node = Node;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_GetLine_Returns = number;

/**
 * Lib - Type Declaration Engine - Build Source Section Map - Pascal Case.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_PascalCase_Name = string;

/**
 * Lib - Type Declaration Engine - Build Source Section Map - Tag All Children.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_TagAllChildren_Node = Node;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_TagAllChildren_Section = string;

/**
 * Lib - Type Declaration Engine - Build Source Section Map - Visit.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_Node = Node;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_Section = string;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_NewSection = string;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_Accessor = MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_RawMethodName = string;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_CleanMethodName = string;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_NewSection2 = string;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_NewSection3 = string;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_NewSection4 = string;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_HasInitializer = boolean;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_SubSection = string;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_CallbackArg = Node | undefined;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_Arg = Node | undefined;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_StringArg = StringLiteral;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_Chunk = string;

export type Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_NewSection5 = string;

/**
 * Lib - Type Declaration Engine - Check Type Name Uniqueness.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Declaration_Name = string;

export type Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Declaration_TypeName = string;

export type Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Declaration_LineNumber = number;

export type Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Declaration = {
  name: Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Declaration_Name;
  typeName: Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Declaration_TypeName;
  lineNumber: Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Declaration_LineNumber;
};

export type Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Declarations = Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Declaration[];

export type Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Returns = Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Violations;

export type Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Violation = string;

export type Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Violations = Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Violation[];

export type Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Seen = Map<Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Declaration_TypeName, Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_FirstOccurrence>;

export type Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Existing = Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_FirstOccurrence | undefined;

export type Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_FirstOccurrence_Name = string;

export type Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_FirstOccurrence_LineNumber = number;

export type Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_FirstOccurrence = {
  name: Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_FirstOccurrence_Name;
  lineNumber: Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_FirstOccurrence_LineNumber;
};

/**
 * Lib - Type Declaration Engine - Derive Class Prefix.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_DeriveClassPrefix_FilePath = string;

export type Lib_TypeDeclarationEngine_DeriveClassPrefix_Config = Shared_TypeDeclarationEngineConfig;

export type Lib_TypeDeclarationEngine_DeriveClassPrefix_Returns = string;

export type Lib_TypeDeclarationEngine_DeriveClassPrefix_PackageRoot = string;

export type Lib_TypeDeclarationEngine_DeriveClassPrefix_TypeRoots = string[];

export type Lib_TypeDeclarationEngine_DeriveClassPrefix_CurrentDirectory = string;

export type Lib_TypeDeclarationEngine_DeriveClassPrefix_RelativePath = string;

export type Lib_TypeDeclarationEngine_DeriveClassPrefix_RelativeCleaned = string;

export type Lib_TypeDeclarationEngine_DeriveClassPrefix_Segments = string[];

export type Lib_TypeDeclarationEngine_DeriveClassPrefix_CamelCaseWordsPattern = RegExp;

export type Lib_TypeDeclarationEngine_DeriveClassPrefix_Words = string[] | null;

/**
 * Lib - Type Declaration Engine - Derive Dts Mapping.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_DeriveDtsMapping_TypeRoots = string[];

export type Lib_TypeDeclarationEngine_DeriveDtsMapping_Returns = Shared_TypeDeclarationDtsMapping;

export type Lib_TypeDeclarationEngine_DeriveDtsMapping_Mapped = string;

/**
 * Lib - Type Declaration Engine - Derive Source Path.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_DeriveSourcePath_DtsPath = string;

export type Lib_TypeDeclarationEngine_DeriveSourcePath_Returns = string;

/**
 * Lib - Type Declaration Engine - Detect Inline Typed Callbacks.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Content = string;

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_FilePath = string;

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Callback_ParamName = string;

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Callback_TypeName = string;

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Callback_LineNumber = number;

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Callback = {
  paramName: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Callback_ParamName;
  typeName: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Callback_TypeName;
  lineNumber: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Callback_LineNumber;
};

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Returns = Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Callback[];

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_SourceFile = SourceFile;

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Callbacks = Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Callback[];

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_VisitReturns = void;

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithKindShape = {
  kind?: number;
};

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithParentShape = {
  parent?: Node;
};

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithTypeNameShape_TypeName = Node;

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithTypeNameShape = {
  typeName: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithTypeNameShape_TypeName;
};

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithTextShape_Text = string;

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithTextShape = {
  text: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithTextShape_Text;
};

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithTypeNameTextShape_TypeName_Text = string;

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithTypeNameTextShape_TypeName = {
  text: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithTypeNameTextShape_TypeName_Text;
};

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithTypeNameTextShape = {
  typeName: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithTypeNameTextShape_TypeName;
};

/**
 * Lib - Type Declaration Engine - Detect Inline Typed Callbacks - Visit.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_Node = Node;

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_IsFunctionTypedConst = boolean;

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_Walker = Node | undefined;

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_ParamNode = {
  name?: Node;
  type?: Node;
};

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_LineNumber = number;

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_Callback_ParamName = string;

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_Callback_TypeName = string;

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_Callback_LineNumber = number;

export type Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_Callback = {
  paramName: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_Callback_ParamName;
  typeName: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_Callback_TypeName;
  lineNumber: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_Callback_LineNumber;
};

/**
 * Lib - Type Declaration Engine - Discover Source Files.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_DiscoverSourceFiles_Config = Shared_TypeDeclarationEngineConfig;

export type Lib_TypeDeclarationEngine_DiscoverSourceFiles_Returns = Promise<string[]>;

export type Lib_TypeDeclarationEngine_DiscoverSourceFiles_PackageRoot = string;

export type Lib_TypeDeclarationEngine_DiscoverSourceFiles_TypeRoots = string[];

export type Lib_TypeDeclarationEngine_DiscoverSourceFiles_Patterns = string[];

export type Lib_TypeDeclarationEngine_DiscoverSourceFiles_IgnorePatterns = string[];

export type Lib_TypeDeclarationEngine_DiscoverSourceFiles_Matched = string[];

/**
 * Lib - Type Declaration Engine - Discover Type Files.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_DiscoverTypeFiles_Config = Shared_TypeDeclarationEngineConfig;

export type Lib_TypeDeclarationEngine_DiscoverTypeFiles_Returns = Promise<string[]>;

export type Lib_TypeDeclarationEngine_DiscoverTypeFiles_PackageRoot = string;

export type Lib_TypeDeclarationEngine_DiscoverTypeFiles_TypeRoots = string[];

export type Lib_TypeDeclarationEngine_DiscoverTypeFiles_Patterns = string[];

export type Lib_TypeDeclarationEngine_DiscoverTypeFiles_Matched = string[];

/**
 * Lib - Type Declaration Engine - Extract Array Types.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_ExtractArrayTypes_Lines = string[];

export type Lib_TypeDeclarationEngine_ExtractArrayTypes_ArrayType_ArrayTypeName = string;

export type Lib_TypeDeclarationEngine_ExtractArrayTypes_ArrayType_ElementTypeName = string;

export type Lib_TypeDeclarationEngine_ExtractArrayTypes_ArrayType_LineIndex = number;

export type Lib_TypeDeclarationEngine_ExtractArrayTypes_ArrayType = {
  arrayTypeName: Lib_TypeDeclarationEngine_ExtractArrayTypes_ArrayType_ArrayTypeName;
  elementTypeName: Lib_TypeDeclarationEngine_ExtractArrayTypes_ArrayType_ElementTypeName;
  lineIndex: Lib_TypeDeclarationEngine_ExtractArrayTypes_ArrayType_LineIndex;
};

export type Lib_TypeDeclarationEngine_ExtractArrayTypes_Returns = Lib_TypeDeclarationEngine_ExtractArrayTypes_ArrayType[];

export type Lib_TypeDeclarationEngine_ExtractArrayTypes_ArrayTypes = Lib_TypeDeclarationEngine_ExtractArrayTypes_ArrayType[];

export type Lib_TypeDeclarationEngine_ExtractArrayTypes_I = number;

export type Lib_TypeDeclarationEngine_ExtractArrayTypes_Line = string;

export type Lib_TypeDeclarationEngine_ExtractArrayTypes_Match = RegExpMatchArray | null;

/**
 * Lib - Type Declaration Engine - Extract Body Declarations.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Lines = string[];

export type Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Declaration_Keyword = 'const' | 'let';

export type Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Declaration_VarName = string;

export type Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Declaration_TypeName = string;

export type Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Declaration_LineNumber = number;

export type Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Declaration = {
  keyword: Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Declaration_Keyword;
  varName: Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Declaration_VarName;
  typeName: Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Declaration_TypeName;
  lineNumber: Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Declaration_LineNumber;
};

export type Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Returns = Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Declaration[];

export type Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Declarations = Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Declaration[];

export type Lib_TypeDeclarationEngine_ExtractBodyDeclarations_I = number;

export type Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Line = string;

export type Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Match = RegExpMatchArray | null;

export type Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Keyword = 'const' | 'let';

/**
 * Lib - Type Declaration Engine - Extract Function Params.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_ExtractFunctionParams_Content = string;

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_FilePath = string;

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_Param_ParamName = string;

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_Param_TypeName = string;

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_Param_LineNumber = number;

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_Param = {
  paramName: Lib_TypeDeclarationEngine_ExtractFunctionParams_Param_ParamName;
  typeName: Lib_TypeDeclarationEngine_ExtractFunctionParams_Param_TypeName;
  lineNumber: Lib_TypeDeclarationEngine_ExtractFunctionParams_Param_LineNumber;
};

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_Returns = Lib_TypeDeclarationEngine_ExtractFunctionParams_Param[];

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_SourceFile = SourceFile;

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_Params = Lib_TypeDeclarationEngine_ExtractFunctionParams_Param[];

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_VisitReturns = void;

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithParametersShape_Parameters = readonly Node[];

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithParametersShape = {
  parameters: Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithParametersShape_Parameters;
};

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithTypeNameShape_TypeName = Node;

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithTypeNameShape = {
  typeName: Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithTypeNameShape_TypeName;
};

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithTextShape_Text = string;

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithTextShape = {
  text: Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithTextShape_Text;
};

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithTypeNameTextShape_TypeName_Text = string;

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithTypeNameTextShape_TypeName = {
  text: Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithTypeNameTextShape_TypeName_Text;
};

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithTypeNameTextShape = {
  typeName: Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithTypeNameTextShape_TypeName;
};

/**
 * Lib - Type Declaration Engine - Extract Function Params - Visit.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_Node = Node;

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_ParameterList = readonly Node[] | undefined;

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_ParamNode = {
  name?: Node;
  type?: Node;
};

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_LineNumber = number;

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_ParamRecord_ParamName = string;

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_ParamRecord_TypeName = string;

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_ParamRecord_LineNumber = number;

export type Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_ParamRecord = {
  paramName: Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_ParamRecord_ParamName;
  typeName: Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_ParamRecord_TypeName;
  lineNumber: Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_ParamRecord_LineNumber;
};

/**
 * Lib - Type Declaration Engine - Extract Function Returns.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_Content = string;

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_FilePath = string;

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_Return_ReturnType = string;

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_Return_IsTypeGuard = boolean;

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_Return_LineNumber = number;

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_Return = {
  returnType: Lib_TypeDeclarationEngine_ExtractFunctionReturns_Return_ReturnType;
  isTypeGuard: Lib_TypeDeclarationEngine_ExtractFunctionReturns_Return_IsTypeGuard;
  lineNumber: Lib_TypeDeclarationEngine_ExtractFunctionReturns_Return_LineNumber;
};

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_Returns = Lib_TypeDeclarationEngine_ExtractFunctionReturns_Return[];

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_SourceFile = SourceFile;

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_ReturnRecords = Lib_TypeDeclarationEngine_ExtractFunctionReturns_Return[];

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_VisitReturns = void;

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_NodeWithTypeNameShape_TypeName = Node;

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_NodeWithTypeNameShape = {
  typeName: Lib_TypeDeclarationEngine_ExtractFunctionReturns_NodeWithTypeNameShape_TypeName;
};

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_NodeWithTypeNameTextShape_TypeName_Text = string;

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_NodeWithTypeNameTextShape_TypeName = {
  text: Lib_TypeDeclarationEngine_ExtractFunctionReturns_NodeWithTypeNameTextShape_TypeName_Text;
};

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_NodeWithTypeNameTextShape = {
  typeName: Lib_TypeDeclarationEngine_ExtractFunctionReturns_NodeWithTypeNameTextShape_TypeName;
};

/**
 * Lib - Type Declaration Engine - Extract Function Returns - Visit.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_Node = Node;

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_FnNode = {
  type?: Node;
};

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_TypeNode = Node | undefined;

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_ReturnType = string;

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_TypeGuardFlag = boolean;

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_PredicateNode = {
  type?: Node;
};

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_LineNumber = number;

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_ReturnRecord_ReturnType = string;

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_ReturnRecord_IsTypeGuard = boolean;

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_ReturnRecord_LineNumber = number;

export type Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_ReturnRecord = {
  returnType: Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_ReturnRecord_ReturnType;
  isTypeGuard: Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_ReturnRecord_IsTypeGuard;
  lineNumber: Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_ReturnRecord_LineNumber;
};

/**
 * Lib - Type Declaration Engine - Extract Imported Names.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_ExtractImportedNames_Lines = string[];

export type Lib_TypeDeclarationEngine_ExtractImportedNames_Returns = Set<string>;

export type Lib_TypeDeclarationEngine_ExtractImportedNames_ImportedNames = Set<string>;

export type Lib_TypeDeclarationEngine_ExtractImportedNames_InImportBlock = boolean;

export type Lib_TypeDeclarationEngine_ExtractImportedNames_InlineMatch = RegExpMatchArray | null;

export type Lib_TypeDeclarationEngine_ExtractImportedNames_InlineMatchCapture = string;

export type Lib_TypeDeclarationEngine_ExtractImportedNames_Specifiers = string[];

export type Lib_TypeDeclarationEngine_ExtractImportedNames_Trimmed = string;

/**
 * Lib - Type Declaration Engine - Extract Object Types.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_ExtractObjectTypes_ClassPrefix = string;

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_Lines = string[];

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectType_Name = string;

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectType_LineIndex = number;

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectProperty_Key = string;

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectProperty_ValueType = string;

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectProperty_TypeLineIndex = number;

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectProperty = {
  key: Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectProperty_Key;
  valueType: Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectProperty_ValueType;
  typeLineIndex: Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectProperty_TypeLineIndex;
};

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectType_Properties = Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectProperty[];

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectType = {
  name: Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectType_Name;
  lineIndex: Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectType_LineIndex;
  properties: Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectType_Properties;
};

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_Returns = Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectType[];

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectTypes = Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectType[];

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_TypeLineMap = Map<string, number>;

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_I = number;

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_Line = string;

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_TypeDefMatch = RegExpMatchArray | null;

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_Line2 = string;

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectMatch = RegExpMatchArray | null;

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_Properties = Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectProperty[];

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_J = number;

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_PropertyLine = string;

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_TrimmedProperty = string;

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_PropertyMatch = RegExpMatchArray | null;

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_PropertyKey = string;

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_PropertyValueType = string;

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_TypeLineIndex = number;

export type Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectName = string;

/**
 * Lib - Type Declaration Engine - Extract Referenced Types.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_ExtractReferencedTypes_ClassPrefix = string;

export type Lib_TypeDeclarationEngine_ExtractReferencedTypes_Line = string;

export type Lib_TypeDeclarationEngine_ExtractReferencedTypes_Returns = string[];

export type Lib_TypeDeclarationEngine_ExtractReferencedTypes_Match = RegExpMatchArray | null;

export type Lib_TypeDeclarationEngine_ExtractReferencedTypes_TypeName = string;

export type Lib_TypeDeclarationEngine_ExtractReferencedTypes_RightSide = string;

export type Lib_TypeDeclarationEngine_ExtractReferencedTypes_ReferencedTypes = string[];

export type Lib_TypeDeclarationEngine_ExtractReferencedTypes_TypePattern = RegExp;

export type Lib_TypeDeclarationEngine_ExtractReferencedTypes_TypeMatch = RegExpExecArray | null;

export type Lib_TypeDeclarationEngine_ExtractReferencedTypes_ReferencedType = string;

/**
 * Lib - Type Declaration Engine - Extract Top Level Identifiers.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Content = string;

export type Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_FilePath = string;

export type Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier_Name = string;

export type Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier_Kind = 'class' | 'function' | 'const';

export type Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier_LineNumber = number;

export type Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier = {
  name: Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier_Name;
  kind: Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier_Kind;
  lineNumber: Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier_LineNumber;
};

export type Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Returns = Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier[];

export type Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_SourceFile = SourceFile;

export type Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifiers = Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier[];

export type Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier2_Name = string;

export type Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier2_Kind = 'class' | 'function' | 'const';

export type Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier2_LineNumber = number;

export type Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier2 = {
  name: Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier2_Name;
  kind: Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier2_Kind;
  lineNumber: Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier2_LineNumber;
};

export type Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier3_Name = string;

export type Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier3_Kind = 'class' | 'function' | 'const';

export type Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier3_LineNumber = number;

export type Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier3 = {
  name: Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier3_Name;
  kind: Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier3_Kind;
  lineNumber: Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier3_LineNumber;
};

/**
 * Lib - Type Declaration Engine - Extract Top Level Identifiers - Get Line.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_GetLine_Node = Node;

export type Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_GetLine_Returns = number;

/**
 * Lib - Type Declaration Engine - Extract Type Names.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_ExtractTypeNames_Returns = string[];

export type Lib_TypeDeclarationEngine_ExtractTypeNames_TypeLines = string[];

export type Lib_TypeDeclarationEngine_ExtractTypeNames_TypeNames = string[];

export type Lib_TypeDeclarationEngine_ExtractTypeNames_Match = RegExpMatchArray | null;

/**
 * Lib - Type Declaration Engine - File Exists.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_FileExists_FilePath = string;

export type Lib_TypeDeclarationEngine_FileExists_Returns = Promise<boolean>;

/**
 * Lib - Type Declaration Engine - Find First Occurrence.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_FindFirstOccurrence_Returns = number;

export type Lib_TypeDeclarationEngine_FindFirstOccurrence_SourceLines = string[];

export type Lib_TypeDeclarationEngine_FindFirstOccurrence_TypeName = string;

export type Lib_TypeDeclarationEngine_FindFirstOccurrence_InImportBlock = boolean;

export type Lib_TypeDeclarationEngine_FindFirstOccurrence_I = number;

export type Lib_TypeDeclarationEngine_FindFirstOccurrence_Line = string;

export type Lib_TypeDeclarationEngine_FindFirstOccurrence_TypeNamePattern = RegExp;

/**
 * Lib - Type Declaration Engine - Is Alias To Foreign Type.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_IsAliasToForeignType_ClassPrefix = string;

export type Lib_TypeDeclarationEngine_IsAliasToForeignType_DtsContent = string;

export type Lib_TypeDeclarationEngine_IsAliasToForeignType_Returns = boolean;

export type Lib_TypeDeclarationEngine_IsAliasToForeignType_TypeName = string;

export type Lib_TypeDeclarationEngine_IsAliasToForeignType_EscapedTypeName = string;

export type Lib_TypeDeclarationEngine_IsAliasToForeignType_Pattern = RegExp;

export type Lib_TypeDeclarationEngine_IsAliasToForeignType_Match = RegExpMatchArray | null;

export type Lib_TypeDeclarationEngine_IsAliasToForeignType_Rhs = string;

export type Lib_TypeDeclarationEngine_IsAliasToForeignType_TypeMatch = RegExpMatchArray | null;

export type Lib_TypeDeclarationEngine_IsAliasToForeignType_LeftmostType = string;

/**
 * Lib - Type Declaration Engine - Is Locally Defined.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_IsLocallyDefined_DtsContent = string;

export type Lib_TypeDeclarationEngine_IsLocallyDefined_Returns = boolean;

export type Lib_TypeDeclarationEngine_IsLocallyDefined_TypeName = string;

export type Lib_TypeDeclarationEngine_IsLocallyDefined_EscapedTypeName = string;

export type Lib_TypeDeclarationEngine_IsLocallyDefined_Pattern = RegExp;

/**
 * Lib - Type Declaration Engine - Is Reserved Suffix.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_IsReservedSuffix_Returns = boolean;

export type Lib_TypeDeclarationEngine_IsReservedSuffix_TypeName = string;

/**
 * Lib - Type Declaration Engine - Parse Describe String.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_ParseDescribeString_Input = string;

export type Lib_TypeDeclarationEngine_ParseDescribeString_Returns = string;

export type Lib_TypeDeclarationEngine_ParseDescribeString_Pieces = string[];

/**
 * Lib - Type Declaration Engine - Parse Source File.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_ParseSourceFile_Content = string;

export type Lib_TypeDeclarationEngine_ParseSourceFile_FilePath = string;

export type Lib_TypeDeclarationEngine_ParseSourceFile_Returns = SourceFile;

export type Lib_TypeDeclarationEngine_ParseSourceFile_Cached = Lib_TypeDeclarationEngine_ParseSourceFile_CachedEntry | undefined;

export type Lib_TypeDeclarationEngine_ParseSourceFile_SourceFile = SourceFile;

export type Lib_TypeDeclarationEngine_ParseSourceFile_CachedEntry_Content = string;

export type Lib_TypeDeclarationEngine_ParseSourceFile_CachedEntry_SourceFile = SourceFile;

export type Lib_TypeDeclarationEngine_ParseSourceFile_CachedEntry = {
  content: Lib_TypeDeclarationEngine_ParseSourceFile_CachedEntry_Content;
  sourceFile: Lib_TypeDeclarationEngine_ParseSourceFile_CachedEntry_SourceFile;
};

/**
 * Lib - Type Declaration Engine - Run Rule Pipeline.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_RunRulePipeline_ClassPrefix = string;

export type Lib_TypeDeclarationEngine_RunRulePipeline_DtsContent = string;

export type Lib_TypeDeclarationEngine_RunRulePipeline_FilePath = string;

export type Lib_TypeDeclarationEngine_RunRulePipeline_Returns = string[];

export type Lib_TypeDeclarationEngine_RunRulePipeline_SourceContent = string;

export type Lib_TypeDeclarationEngine_RunRulePipeline_SectionMap = Map<number, string>;

export type Lib_TypeDeclarationEngine_RunRulePipeline_Lines = string[];

export type Lib_TypeDeclarationEngine_RunRulePipeline_Declaration_Keyword = 'const' | 'let';

export type Lib_TypeDeclarationEngine_RunRulePipeline_Declaration_VarName = string;

export type Lib_TypeDeclarationEngine_RunRulePipeline_Declaration_TypeName = string;

export type Lib_TypeDeclarationEngine_RunRulePipeline_Declaration_LineNumber = number;

export type Lib_TypeDeclarationEngine_RunRulePipeline_Declaration = {
  keyword: Lib_TypeDeclarationEngine_RunRulePipeline_Declaration_Keyword;
  varName: Lib_TypeDeclarationEngine_RunRulePipeline_Declaration_VarName;
  typeName: Lib_TypeDeclarationEngine_RunRulePipeline_Declaration_TypeName;
  lineNumber: Lib_TypeDeclarationEngine_RunRulePipeline_Declaration_LineNumber;
};

export type Lib_TypeDeclarationEngine_RunRulePipeline_Declarations = Lib_TypeDeclarationEngine_RunRulePipeline_Declaration[];

export type Lib_TypeDeclarationEngine_RunRulePipeline_Callback_ParamName = string;

export type Lib_TypeDeclarationEngine_RunRulePipeline_Callback_TypeName = string;

export type Lib_TypeDeclarationEngine_RunRulePipeline_Callback_LineNumber = number;

export type Lib_TypeDeclarationEngine_RunRulePipeline_Callback = {
  paramName: Lib_TypeDeclarationEngine_RunRulePipeline_Callback_ParamName;
  typeName: Lib_TypeDeclarationEngine_RunRulePipeline_Callback_TypeName;
  lineNumber: Lib_TypeDeclarationEngine_RunRulePipeline_Callback_LineNumber;
};

export type Lib_TypeDeclarationEngine_RunRulePipeline_Callbacks = Lib_TypeDeclarationEngine_RunRulePipeline_Callback[];

export type Lib_TypeDeclarationEngine_RunRulePipeline_Return_ReturnType = string;

export type Lib_TypeDeclarationEngine_RunRulePipeline_Return_IsTypeGuard = boolean;

export type Lib_TypeDeclarationEngine_RunRulePipeline_Return_LineNumber = number;

export type Lib_TypeDeclarationEngine_RunRulePipeline_Return = {
  returnType: Lib_TypeDeclarationEngine_RunRulePipeline_Return_ReturnType;
  isTypeGuard: Lib_TypeDeclarationEngine_RunRulePipeline_Return_IsTypeGuard;
  lineNumber: Lib_TypeDeclarationEngine_RunRulePipeline_Return_LineNumber;
};

export type Lib_TypeDeclarationEngine_RunRulePipeline_FnReturnRecords = Lib_TypeDeclarationEngine_RunRulePipeline_Return[];

export type Lib_TypeDeclarationEngine_RunRulePipeline_Violations = string[];

export type Lib_TypeDeclarationEngine_RunRulePipeline_SourceSection = string;

export type Lib_TypeDeclarationEngine_RunRulePipeline_LeafResultReason_ActualLeaf = string;

export type Lib_TypeDeclarationEngine_RunRulePipeline_LeafResultReason_ExpectedLeaf = string;

export type Lib_TypeDeclarationEngine_RunRulePipeline_LeafResultReason = {
  actualLeaf: Lib_TypeDeclarationEngine_RunRulePipeline_LeafResultReason_ActualLeaf;
  expectedLeaf: Lib_TypeDeclarationEngine_RunRulePipeline_LeafResultReason_ExpectedLeaf;
};

export type Lib_TypeDeclarationEngine_RunRulePipeline_LeafResult = Lib_TypeDeclarationEngine_RunRulePipeline_LeafResultReason | null;

export type Lib_TypeDeclarationEngine_RunRulePipeline_Reason = Lib_TypeDeclarationEngine_RunRulePipeline_ReasonValidateReturnType | null;

export type Lib_TypeDeclarationEngine_RunRulePipeline_ReasonValidateReturnType = string;

/**
 * Lib - Type Declaration Engine - Strip Underscore Prefix.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_StripUnderscorePrefix_Input = string;

export type Lib_TypeDeclarationEngine_StripUnderscorePrefix_Returns = string;

/**
 * Lib - Type Declaration Engine - Validate Leaf.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_ValidateLeaf_ClassPrefix = string;

export type Lib_TypeDeclarationEngine_ValidateLeaf_Returns = Lib_TypeDeclarationEngine_ValidateLeaf_Reason | null;

export type Lib_TypeDeclarationEngine_ValidateLeaf_SourceSection = string;

export type Lib_TypeDeclarationEngine_ValidateLeaf_TypeName = string;

export type Lib_TypeDeclarationEngine_ValidateLeaf_VarName = string;

export type Lib_TypeDeclarationEngine_ValidateLeaf_Stripped = string;

export type Lib_TypeDeclarationEngine_ValidateLeaf_TitleVar = string;

export type Lib_TypeDeclarationEngine_ValidateLeaf_ExpectedSection = string;

export type Lib_TypeDeclarationEngine_ValidateLeaf_ExpectedClass = string;

export type Lib_TypeDeclarationEngine_ValidateLeaf_ActualLeaf = string;

export type Lib_TypeDeclarationEngine_ValidateLeaf_Reason_ActualLeaf = string;

export type Lib_TypeDeclarationEngine_ValidateLeaf_Reason_ExpectedLeaf = string;

export type Lib_TypeDeclarationEngine_ValidateLeaf_Reason = {
  actualLeaf: Lib_TypeDeclarationEngine_ValidateLeaf_Reason_ActualLeaf;
  expectedLeaf: Lib_TypeDeclarationEngine_ValidateLeaf_Reason_ExpectedLeaf;
};

/**
 * Lib - Type Declaration Engine - Validate Return Type.
 *
 * @since 0.18.0
 */
export type Lib_TypeDeclarationEngine_ValidateReturnType_ReturnType = string;

export type Lib_TypeDeclarationEngine_ValidateReturnType_Returns = Lib_TypeDeclarationEngine_ValidateReturnType_Reason | null;

export type Lib_TypeDeclarationEngine_ValidateReturnType_TypeGuardFlag = boolean;

export type Lib_TypeDeclarationEngine_ValidateReturnType_Reason = string;
