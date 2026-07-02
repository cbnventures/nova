import { readFile } from 'node:fs/promises';
import {
  relative,
  sep,
} from 'node:path';

import { glob } from 'glob';
import {
  createSourceFile,
  forEachChild,
  isArrowFunction,
  isCallExpression,
  isClassDeclaration,
  isClassExpression,
  isConstructorDeclaration,
  isFunctionDeclaration,
  isFunctionExpression,
  isGetAccessorDeclaration,
  isIdentifier,
  isMethodDeclaration,
  isPrivateIdentifier,
  isSetAccessorDeclaration,
  isStringLiteral,
  isTypePredicateNode,
  isTypeReferenceNode,
  isVariableStatement,
  ScriptTarget,
} from 'typescript';

import {
  LIB_REGEX_PATTERN_ANGLE_BRACKET_GENERIC,
  LIB_REGEX_PATTERN_CAMEL_CASE_WORDS,
  LIB_REGEX_PATTERN_COMPLEX_TYPE_RHS_CHARS,
  LIB_REGEX_PATTERN_DTS_ARRAY_ALIAS,
  LIB_REGEX_PATTERN_DTS_PROPERTY_LINE,
  LIB_REGEX_PATTERN_EMPTY_ARRAY_BRACKETS,
  LIB_REGEX_PATTERN_EXPORT_TYPE_NAME,
  LIB_REGEX_PATTERN_IMPORT_TYPE_BLOCK,
  LIB_REGEX_PATTERN_NON_ALPHANUMERIC_RUN,
  LIB_REGEX_PATTERN_REGEX_SPECIAL_CHARS,
  LIB_REGEX_PATTERN_SINGLE_PASCAL_TYPE,
  LIB_REGEX_PATTERN_TYPED_BODY_DECLARATION,
} from './regex.js';

import type { Node } from 'typescript';

import type {
  Lib_TypeDeclarationEngine_BuildDtsSections_ClassPrefix,
  Lib_TypeDeclarationEngine_BuildDtsSections_DtsLines,
  Lib_TypeDeclarationEngine_BuildDtsSections_Match,
  Lib_TypeDeclarationEngine_BuildDtsSections_OwningSection,
  Lib_TypeDeclarationEngine_BuildDtsSections_Returns,
  Lib_TypeDeclarationEngine_BuildDtsSections_Section,
  Lib_TypeDeclarationEngine_BuildDtsSections_SectionMap,
  Lib_TypeDeclarationEngine_BuildDtsSections_SectionOrder,
  Lib_TypeDeclarationEngine_BuildDtsSections_SortedSections,
  Lib_TypeDeclarationEngine_BuildDtsSections_SourceSections,
  Lib_TypeDeclarationEngine_BuildDtsSections_TypeName,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_ClassPrefix,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_Content,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_CurrentDepth,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_FilePath,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_GetLine_Node,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_GetLine_Returns,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_MaxDepth,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_PascalCase_Name,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_PascalCaseReturns,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_Returns,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_SectionMap,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_SourceFile,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_TagAllChildren_Node,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_TagAllChildren_Section,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_TagAllChildrenReturns,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_Accessor,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_Arg,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_CallbackArg,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_Chunk,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_CleanMethodName,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_HasInitializer,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_NewSection,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_NewSection2,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_NewSection3,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_NewSection4,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_NewSection5,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_Node,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_RawMethodName,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_Section,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_StringArg,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_SubSection,
  Lib_TypeDeclarationEngine_BuildSourceSectionMap_VisitReturns,
  Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Declarations,
  Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Existing,
  Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Returns,
  Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Seen,
  Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Violation,
  Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Violations,
  Lib_TypeDeclarationEngine_DeriveClassPrefix_CamelCaseWordsPattern,
  Lib_TypeDeclarationEngine_DeriveClassPrefix_Config,
  Lib_TypeDeclarationEngine_DeriveClassPrefix_CurrentDirectory,
  Lib_TypeDeclarationEngine_DeriveClassPrefix_FilePath,
  Lib_TypeDeclarationEngine_DeriveClassPrefix_PackageRoot,
  Lib_TypeDeclarationEngine_DeriveClassPrefix_RelativeCleaned,
  Lib_TypeDeclarationEngine_DeriveClassPrefix_RelativePath,
  Lib_TypeDeclarationEngine_DeriveClassPrefix_Returns,
  Lib_TypeDeclarationEngine_DeriveClassPrefix_Segments,
  Lib_TypeDeclarationEngine_DeriveClassPrefix_TypeRoots,
  Lib_TypeDeclarationEngine_DeriveClassPrefix_Words,
  Lib_TypeDeclarationEngine_DeriveDtsMapping_Mapped,
  Lib_TypeDeclarationEngine_DeriveDtsMapping_Returns,
  Lib_TypeDeclarationEngine_DeriveDtsMapping_TypeRoots,
  Lib_TypeDeclarationEngine_DeriveSourcePath_DtsPath,
  Lib_TypeDeclarationEngine_DeriveSourcePath_Returns,
  Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Callbacks,
  Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Content,
  Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_FilePath,
  Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithKindShape,
  Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithParentShape,
  Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithTextShape,
  Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithTypeNameShape,
  Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithTypeNameTextShape,
  Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Returns,
  Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_SourceFile,
  Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_Callback,
  Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_IsFunctionTypedConst,
  Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_LineNumber,
  Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_Node,
  Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_ParamNode,
  Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_Walker,
  Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_VisitReturns,
  Lib_TypeDeclarationEngine_DiscoverSourceFiles_Config,
  Lib_TypeDeclarationEngine_DiscoverSourceFiles_IgnorePatterns,
  Lib_TypeDeclarationEngine_DiscoverSourceFiles_Matched,
  Lib_TypeDeclarationEngine_DiscoverSourceFiles_PackageRoot,
  Lib_TypeDeclarationEngine_DiscoverSourceFiles_Patterns,
  Lib_TypeDeclarationEngine_DiscoverSourceFiles_Returns,
  Lib_TypeDeclarationEngine_DiscoverSourceFiles_TypeRoots,
  Lib_TypeDeclarationEngine_DiscoverTypeFiles_Config,
  Lib_TypeDeclarationEngine_DiscoverTypeFiles_Matched,
  Lib_TypeDeclarationEngine_DiscoverTypeFiles_PackageRoot,
  Lib_TypeDeclarationEngine_DiscoverTypeFiles_Patterns,
  Lib_TypeDeclarationEngine_DiscoverTypeFiles_Returns,
  Lib_TypeDeclarationEngine_DiscoverTypeFiles_TypeRoots,
  Lib_TypeDeclarationEngine_ExtractArrayTypes_ArrayType,
  Lib_TypeDeclarationEngine_ExtractArrayTypes_ArrayTypes,
  Lib_TypeDeclarationEngine_ExtractArrayTypes_I,
  Lib_TypeDeclarationEngine_ExtractArrayTypes_Line,
  Lib_TypeDeclarationEngine_ExtractArrayTypes_Lines,
  Lib_TypeDeclarationEngine_ExtractArrayTypes_Match,
  Lib_TypeDeclarationEngine_ExtractArrayTypes_Returns,
  Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Declaration,
  Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Declarations,
  Lib_TypeDeclarationEngine_ExtractBodyDeclarations_I,
  Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Keyword,
  Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Line,
  Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Lines,
  Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Match,
  Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Returns,
  Lib_TypeDeclarationEngine_ExtractFunctionParams_Content,
  Lib_TypeDeclarationEngine_ExtractFunctionParams_FilePath,
  Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithParametersShape,
  Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithTextShape,
  Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithTypeNameShape,
  Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithTypeNameTextShape,
  Lib_TypeDeclarationEngine_ExtractFunctionParams_Params,
  Lib_TypeDeclarationEngine_ExtractFunctionParams_Returns,
  Lib_TypeDeclarationEngine_ExtractFunctionParams_SourceFile,
  Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_LineNumber,
  Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_Node,
  Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_ParameterList,
  Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_ParamNode,
  Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_ParamRecord,
  Lib_TypeDeclarationEngine_ExtractFunctionParams_VisitReturns,
  Lib_TypeDeclarationEngine_ExtractFunctionReturns_Content,
  Lib_TypeDeclarationEngine_ExtractFunctionReturns_FilePath,
  Lib_TypeDeclarationEngine_ExtractFunctionReturns_NodeWithTypeNameShape,
  Lib_TypeDeclarationEngine_ExtractFunctionReturns_NodeWithTypeNameTextShape,
  Lib_TypeDeclarationEngine_ExtractFunctionReturns_ReturnRecords,
  Lib_TypeDeclarationEngine_ExtractFunctionReturns_Returns,
  Lib_TypeDeclarationEngine_ExtractFunctionReturns_SourceFile,
  Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_FnNode,
  Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_LineNumber,
  Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_Node,
  Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_PredicateNode,
  Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_ReturnRecord,
  Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_ReturnType,
  Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_TypeGuardFlag,
  Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_TypeNode,
  Lib_TypeDeclarationEngine_ExtractFunctionReturns_VisitReturns,
  Lib_TypeDeclarationEngine_ExtractImportedNames_ImportedNames,
  Lib_TypeDeclarationEngine_ExtractImportedNames_InImportBlock,
  Lib_TypeDeclarationEngine_ExtractImportedNames_InlineMatch,
  Lib_TypeDeclarationEngine_ExtractImportedNames_InlineMatchCapture,
  Lib_TypeDeclarationEngine_ExtractImportedNames_Lines,
  Lib_TypeDeclarationEngine_ExtractImportedNames_Returns,
  Lib_TypeDeclarationEngine_ExtractImportedNames_Specifiers,
  Lib_TypeDeclarationEngine_ExtractImportedNames_Trimmed,
  Lib_TypeDeclarationEngine_ExtractObjectTypes_ClassPrefix,
  Lib_TypeDeclarationEngine_ExtractObjectTypes_I,
  Lib_TypeDeclarationEngine_ExtractObjectTypes_J,
  Lib_TypeDeclarationEngine_ExtractObjectTypes_Line,
  Lib_TypeDeclarationEngine_ExtractObjectTypes_Line2,
  Lib_TypeDeclarationEngine_ExtractObjectTypes_Lines,
  Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectMatch,
  Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectName,
  Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectTypes,
  Lib_TypeDeclarationEngine_ExtractObjectTypes_Properties,
  Lib_TypeDeclarationEngine_ExtractObjectTypes_PropertyKey,
  Lib_TypeDeclarationEngine_ExtractObjectTypes_PropertyLine,
  Lib_TypeDeclarationEngine_ExtractObjectTypes_PropertyMatch,
  Lib_TypeDeclarationEngine_ExtractObjectTypes_PropertyValueType,
  Lib_TypeDeclarationEngine_ExtractObjectTypes_Returns,
  Lib_TypeDeclarationEngine_ExtractObjectTypes_TrimmedProperty,
  Lib_TypeDeclarationEngine_ExtractObjectTypes_TypeDefMatch,
  Lib_TypeDeclarationEngine_ExtractObjectTypes_TypeLineIndex,
  Lib_TypeDeclarationEngine_ExtractObjectTypes_TypeLineMap,
  Lib_TypeDeclarationEngine_ExtractReferencedTypes_ClassPrefix,
  Lib_TypeDeclarationEngine_ExtractReferencedTypes_Line,
  Lib_TypeDeclarationEngine_ExtractReferencedTypes_Match,
  Lib_TypeDeclarationEngine_ExtractReferencedTypes_ReferencedType,
  Lib_TypeDeclarationEngine_ExtractReferencedTypes_ReferencedTypes,
  Lib_TypeDeclarationEngine_ExtractReferencedTypes_Returns,
  Lib_TypeDeclarationEngine_ExtractReferencedTypes_RightSide,
  Lib_TypeDeclarationEngine_ExtractReferencedTypes_TypeMatch,
  Lib_TypeDeclarationEngine_ExtractReferencedTypes_TypeName,
  Lib_TypeDeclarationEngine_ExtractReferencedTypes_TypePattern,
  Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Content,
  Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_FilePath,
  Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_GetLine_Node,
  Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_GetLine_Returns,
  Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier,
  Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier2,
  Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier3,
  Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifiers,
  Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Returns,
  Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_SourceFile,
  Lib_TypeDeclarationEngine_ExtractTypeNames_Match,
  Lib_TypeDeclarationEngine_ExtractTypeNames_Returns,
  Lib_TypeDeclarationEngine_ExtractTypeNames_TypeLines,
  Lib_TypeDeclarationEngine_ExtractTypeNames_TypeNames,
  Lib_TypeDeclarationEngine_FileExists_FilePath,
  Lib_TypeDeclarationEngine_FileExists_Returns,
  Lib_TypeDeclarationEngine_FindFirstOccurrence_I,
  Lib_TypeDeclarationEngine_FindFirstOccurrence_InImportBlock,
  Lib_TypeDeclarationEngine_FindFirstOccurrence_Line,
  Lib_TypeDeclarationEngine_FindFirstOccurrence_Returns,
  Lib_TypeDeclarationEngine_FindFirstOccurrence_SourceLines,
  Lib_TypeDeclarationEngine_FindFirstOccurrence_TypeName,
  Lib_TypeDeclarationEngine_FindFirstOccurrence_TypeNamePattern,
  Lib_TypeDeclarationEngine_IsAliasToForeignType_ClassPrefix,
  Lib_TypeDeclarationEngine_IsAliasToForeignType_DtsContent,
  Lib_TypeDeclarationEngine_IsAliasToForeignType_EscapedTypeName,
  Lib_TypeDeclarationEngine_IsAliasToForeignType_LeftmostType,
  Lib_TypeDeclarationEngine_IsAliasToForeignType_Match,
  Lib_TypeDeclarationEngine_IsAliasToForeignType_Pattern,
  Lib_TypeDeclarationEngine_IsAliasToForeignType_Returns,
  Lib_TypeDeclarationEngine_IsAliasToForeignType_Rhs,
  Lib_TypeDeclarationEngine_IsAliasToForeignType_TypeMatch,
  Lib_TypeDeclarationEngine_IsAliasToForeignType_TypeName,
  Lib_TypeDeclarationEngine_IsLocallyDefined_DtsContent,
  Lib_TypeDeclarationEngine_IsLocallyDefined_EscapedTypeName,
  Lib_TypeDeclarationEngine_IsLocallyDefined_Pattern,
  Lib_TypeDeclarationEngine_IsLocallyDefined_Returns,
  Lib_TypeDeclarationEngine_IsLocallyDefined_TypeName,
  Lib_TypeDeclarationEngine_IsReservedSuffix_Returns,
  Lib_TypeDeclarationEngine_IsReservedSuffix_TypeName,
  Lib_TypeDeclarationEngine_ParseDescribeString_Input,
  Lib_TypeDeclarationEngine_ParseDescribeString_Pieces,
  Lib_TypeDeclarationEngine_ParseDescribeString_Returns,
  Lib_TypeDeclarationEngine_ParseSourceFile_Cached,
  Lib_TypeDeclarationEngine_ParseSourceFile_Content,
  Lib_TypeDeclarationEngine_ParseSourceFile_FilePath,
  Lib_TypeDeclarationEngine_ParseSourceFile_Returns,
  Lib_TypeDeclarationEngine_ParseSourceFile_SourceFile,
  Lib_TypeDeclarationEngine_RunRulePipeline_Callbacks,
  Lib_TypeDeclarationEngine_RunRulePipeline_ClassPrefix,
  Lib_TypeDeclarationEngine_RunRulePipeline_Declarations,
  Lib_TypeDeclarationEngine_RunRulePipeline_DtsContent,
  Lib_TypeDeclarationEngine_RunRulePipeline_FilePath,
  Lib_TypeDeclarationEngine_RunRulePipeline_FnReturnRecords,
  Lib_TypeDeclarationEngine_RunRulePipeline_LeafResult,
  Lib_TypeDeclarationEngine_RunRulePipeline_Lines,
  Lib_TypeDeclarationEngine_RunRulePipeline_Reason,
  Lib_TypeDeclarationEngine_RunRulePipeline_Returns,
  Lib_TypeDeclarationEngine_RunRulePipeline_SectionMap,
  Lib_TypeDeclarationEngine_RunRulePipeline_SourceContent,
  Lib_TypeDeclarationEngine_RunRulePipeline_SourceSection,
  Lib_TypeDeclarationEngine_RunRulePipeline_Violations,
  Lib_TypeDeclarationEngine_SourceFileCache,
  Lib_TypeDeclarationEngine_StripUnderscorePrefix_Input,
  Lib_TypeDeclarationEngine_StripUnderscorePrefix_Returns,
  Lib_TypeDeclarationEngine_TestConfig,
  Lib_TypeDeclarationEngine_ValidateLeaf_ActualLeaf,
  Lib_TypeDeclarationEngine_ValidateLeaf_ClassPrefix,
  Lib_TypeDeclarationEngine_ValidateLeaf_ExpectedClass,
  Lib_TypeDeclarationEngine_ValidateLeaf_ExpectedSection,
  Lib_TypeDeclarationEngine_ValidateLeaf_Returns,
  Lib_TypeDeclarationEngine_ValidateLeaf_SourceSection,
  Lib_TypeDeclarationEngine_ValidateLeaf_Stripped,
  Lib_TypeDeclarationEngine_ValidateLeaf_TitleVar,
  Lib_TypeDeclarationEngine_ValidateLeaf_TypeName,
  Lib_TypeDeclarationEngine_ValidateLeaf_VarName,
  Lib_TypeDeclarationEngine_ValidateReturnType_Returns,
  Lib_TypeDeclarationEngine_ValidateReturnType_ReturnType,
  Lib_TypeDeclarationEngine_ValidateReturnType_TypeGuardFlag,
} from '../types/lib/type-declaration-engine.d.ts';

/**
 * Lib - Type Declaration Engine - Test Config.
 *
 * Nova's scan settings: the type roots to discover and the standalone d.ts files
 * exempt from the source-mirror rules. Threaded into the discovery and prefix helpers.
 *
 * @since 0.15.0
 */
export const testConfig: Lib_TypeDeclarationEngine_TestConfig = {
  standaloneTypeFiles: [
    '/fetch-response.d.ts',
    '/shared.d.ts',
  ],
  typeRoots: [
    'src',
    'utils',
  ],
};

/**
 * Lib - Type Declaration Engine - Discover Source Files.
 *
 * Globs every `.ts` source file under the configured type roots, excluding `.d.ts`
 * mirrors. The rule pipeline walks this list to audit each source against its types.
 * The scan root is injected via `config.packageRoot` (default `process.cwd()`).
 *
 * @since 0.18.0
 */
export async function discoverSourceFiles(config: Lib_TypeDeclarationEngine_DiscoverSourceFiles_Config = {}): Lib_TypeDeclarationEngine_DiscoverSourceFiles_Returns {
  const packageRoot: Lib_TypeDeclarationEngine_DiscoverSourceFiles_PackageRoot = config['packageRoot'] ?? process.cwd();
  const typeRoots: Lib_TypeDeclarationEngine_DiscoverSourceFiles_TypeRoots = config['typeRoots'] ?? ['src'];

  const patterns: Lib_TypeDeclarationEngine_DiscoverSourceFiles_Patterns = typeRoots.map(
    (typeRoot) => `${typeRoot}/**/*.ts`,
  );

  const ignorePatterns: Lib_TypeDeclarationEngine_DiscoverSourceFiles_IgnorePatterns = typeRoots.map(
    (typeRoot) => `${typeRoot}/**/*.d.ts`,
  );

  const matched: Lib_TypeDeclarationEngine_DiscoverSourceFiles_Matched = await glob(patterns, {
    cwd: packageRoot,
    absolute: true,
    ignore: ignorePatterns,
  });

  return matched.sort();
}

/**
 * Lib - Type Declaration Engine - Discover Type Files.
 *
 * Globs every `<root>/types/**` d.ts mirror under the configured type roots. The
 * coverage and symmetry rules pair these against their source files. The scan root
 * is injected via `config.packageRoot` (default `process.cwd()`).
 *
 * @since 0.15.0
 */
export async function discoverTypeFiles(config: Lib_TypeDeclarationEngine_DiscoverTypeFiles_Config = {}): Lib_TypeDeclarationEngine_DiscoverTypeFiles_Returns {
  const packageRoot: Lib_TypeDeclarationEngine_DiscoverTypeFiles_PackageRoot = config['packageRoot'] ?? process.cwd();
  const typeRoots: Lib_TypeDeclarationEngine_DiscoverTypeFiles_TypeRoots = config['typeRoots'] ?? ['src'];

  const patterns: Lib_TypeDeclarationEngine_DiscoverTypeFiles_Patterns = typeRoots.map(
    (typeRoot) => `${typeRoot}/types/**/*.d.ts`,
  );

  const matched: Lib_TypeDeclarationEngine_DiscoverTypeFiles_Matched = await glob(patterns, {
    cwd: packageRoot,
    absolute: true,
  });

  return matched.sort();
}

/**
 * Lib - Type Declaration Engine - Derive Class Prefix.
 *
 * Turns a file path into its Mode 2 type-name prefix by stripping the type roots and
 * PascalCasing each segment. The anchoring root + type roots are injected via `config`
 * (default `process.cwd()` and `['src']`).
 *
 * @since 0.15.0
 */
export function deriveClassPrefix(filePath: Lib_TypeDeclarationEngine_DeriveClassPrefix_FilePath, config: Lib_TypeDeclarationEngine_DeriveClassPrefix_Config = {}): Lib_TypeDeclarationEngine_DeriveClassPrefix_Returns {
  const packageRoot: Lib_TypeDeclarationEngine_DeriveClassPrefix_PackageRoot = config['packageRoot'] ?? process.cwd();
  const typeRoots: Lib_TypeDeclarationEngine_DeriveClassPrefix_TypeRoots = config['typeRoots'] ?? ['src'];
  const currentDirectory: Lib_TypeDeclarationEngine_DeriveClassPrefix_CurrentDirectory = packageRoot;
  const relativePath: Lib_TypeDeclarationEngine_DeriveClassPrefix_RelativePath = relative(currentDirectory, filePath);
  let relativeCleaned: Lib_TypeDeclarationEngine_DeriveClassPrefix_RelativeCleaned = relativePath;

  for (const typeRoot of typeRoots) {
    relativeCleaned = relativeCleaned.replace(`${typeRoot}/types/`, '');
    relativeCleaned = relativeCleaned.replace(`${typeRoot}/`, '');
  }

  const segments: Lib_TypeDeclarationEngine_DeriveClassPrefix_Segments = relativeCleaned
    .replace('.d.ts', '')
    .replace('.ts', '')
    .replace('.test', '')
    .split(sep)
    .join('/')
    .split('/');

  // Mirrors LIB_REGEX_PATTERN_CAMEL_CASE_WORDS in src/lib/regex.ts -- used by the
  // production require-type-naming rule to normalize PascalCase filenames like
  // MDXComponents into Mdx + Components. Kept inline so the test file remains
  // self-contained (test files don't import from other source modules).
  const camelCaseWordsPattern: Lib_TypeDeclarationEngine_DeriveClassPrefix_CamelCaseWordsPattern = new RegExp(LIB_REGEX_PATTERN_CAMEL_CASE_WORDS.source, 'g');

  return segments.map((segment) => {
    // PascalCase segments (e.g., MDXComponents) -- normalize abbreviations.
    if (
      segment.includes('-') === false
      && segment.charAt(0) === segment.charAt(0).toUpperCase()
      && segment.length > 0
    ) {
      const words: Lib_TypeDeclarationEngine_DeriveClassPrefix_Words = segment.match(camelCaseWordsPattern);

      if (words !== null) {
        return words.map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join('');
      }
    }

    return segment.split('-').map((part) => {
      return part.charAt(0).toUpperCase() + part.slice(1);
    }).join('');
  }).join('_');
}

/**
 * Lib - Type Declaration Engine - Extract Imported Names.
 *
 * Collects every identifier brought in by import statements so the cross-section rule
 * can tell an imported type from a same-file forward reference.
 *
 * @since 0.15.0
 */
export function extractImportedNames(lines: Lib_TypeDeclarationEngine_ExtractImportedNames_Lines): Lib_TypeDeclarationEngine_ExtractImportedNames_Returns {
  const importedNames: Lib_TypeDeclarationEngine_ExtractImportedNames_ImportedNames = new Set<string>();
  let inImportBlock: Lib_TypeDeclarationEngine_ExtractImportedNames_InImportBlock = false;

  for (const line of lines) {
    if (line.startsWith('import type') === true) {
      inImportBlock = true;

      const inlineMatch: Lib_TypeDeclarationEngine_ExtractImportedNames_InlineMatch = line.match(LIB_REGEX_PATTERN_IMPORT_TYPE_BLOCK);

      if (inlineMatch !== null && inlineMatch[1] !== undefined) {
        const inlineMatchCapture: Lib_TypeDeclarationEngine_ExtractImportedNames_InlineMatchCapture = inlineMatch[1];
        const specifiers: Lib_TypeDeclarationEngine_ExtractImportedNames_Specifiers = inlineMatchCapture.split(',').map((specifier) => specifier.trim());

        for (const specifier of specifiers) {
          importedNames.add(specifier);
        }

        inImportBlock = false;
      }

      continue;
    }

    if (inImportBlock === true) {
      const trimmed: Lib_TypeDeclarationEngine_ExtractImportedNames_Trimmed = line.trim().replace(',', '');

      if (trimmed.startsWith('}') === true) {
        inImportBlock = false;
      } else if (trimmed !== '' && trimmed.startsWith('//') === false) {
        importedNames.add(trimmed);
      }
    }
  }

  return importedNames;
}

/**
 * Lib - Type Declaration Engine - Build Dts Sections.
 *
 * Groups the d.ts lines into ordered sections keyed by the source section each type
 * belongs to. The alphabetical and first-come-first-serve rules walk these sections.
 *
 * @since 0.18.0
 */
export function buildDtsSections(dtsLines: Lib_TypeDeclarationEngine_BuildDtsSections_DtsLines, sourceSections: Lib_TypeDeclarationEngine_BuildDtsSections_SourceSections, classPrefix: Lib_TypeDeclarationEngine_BuildDtsSections_ClassPrefix): Lib_TypeDeclarationEngine_BuildDtsSections_Returns {
  const sortedSections: Lib_TypeDeclarationEngine_BuildDtsSections_SortedSections = [...sourceSections].sort((sectionA, sectionB) => sectionB.length - sectionA.length);
  const sectionMap: Lib_TypeDeclarationEngine_BuildDtsSections_SectionMap = new Map<string, Lib_TypeDeclarationEngine_BuildDtsSections_Section>();
  const sectionOrder: Lib_TypeDeclarationEngine_BuildDtsSections_SectionOrder = [];

  for (const line of dtsLines) {
    if (line.startsWith('export type ') === false) {
      continue;
    }

    const match: Lib_TypeDeclarationEngine_BuildDtsSections_Match = line.match(LIB_REGEX_PATTERN_EXPORT_TYPE_NAME);

    if (match === null || match[1] === undefined) {
      continue;
    }

    const typeName: Lib_TypeDeclarationEngine_BuildDtsSections_TypeName = match[1];
    let owningSection: Lib_TypeDeclarationEngine_BuildDtsSections_OwningSection = '';

    for (const candidate of sortedSections) {
      if (typeName.startsWith(`${candidate}_`) === true) {
        owningSection = candidate;
        break;
      }
    }

    if (owningSection === '' && typeName.startsWith(`${classPrefix}_`) === true) {
      owningSection = classPrefix;
    }

    if (owningSection === '') {
      continue;
    }

    if (sectionMap.has(owningSection) === false) {
      sectionMap.set(owningSection, {
        prefix: owningSection,
        typeLines: [],
      });

      sectionOrder.push(owningSection);
    }

    const section: Lib_TypeDeclarationEngine_BuildDtsSections_Section = sectionMap.get(owningSection) as Lib_TypeDeclarationEngine_BuildDtsSections_Section;

    section['typeLines'].push(line);
  }

  return sectionOrder.map((prefix) => sectionMap.get(prefix) as Lib_TypeDeclarationEngine_BuildDtsSections_Section);
}

/**
 * Lib - Type Declaration Engine - Extract Referenced Types.
 *
 * Pulls the same-prefix type names a single d.ts line references. The cross-section
 * rule uses these edges to detect references that cross section boundaries.
 *
 * @since 0.15.0
 */
export function extractReferencedTypes(line: Lib_TypeDeclarationEngine_ExtractReferencedTypes_Line, classPrefix: Lib_TypeDeclarationEngine_ExtractReferencedTypes_ClassPrefix): Lib_TypeDeclarationEngine_ExtractReferencedTypes_Returns {
  const match: Lib_TypeDeclarationEngine_ExtractReferencedTypes_Match = line.match(LIB_REGEX_PATTERN_EXPORT_TYPE_NAME);

  if (match === null || match[1] === undefined) {
    return [];
  }

  const typeName: Lib_TypeDeclarationEngine_ExtractReferencedTypes_TypeName = match[1];
  const rightSide: Lib_TypeDeclarationEngine_ExtractReferencedTypes_RightSide = line.slice(line.indexOf('=') + 1);
  const referencedTypes: Lib_TypeDeclarationEngine_ExtractReferencedTypes_ReferencedTypes = [];
  const typePattern: Lib_TypeDeclarationEngine_ExtractReferencedTypes_TypePattern = new RegExp(`${classPrefix}_\\w+`, 'g');
  let typeMatch: Lib_TypeDeclarationEngine_ExtractReferencedTypes_TypeMatch = typePattern.exec(rightSide);

  while (typeMatch !== null) {
    const referencedType: Lib_TypeDeclarationEngine_ExtractReferencedTypes_ReferencedType = typeMatch[0];

    if (referencedType !== typeName) {
      referencedTypes.push(referencedType);
    }

    typeMatch = typePattern.exec(rightSide);
  }

  return referencedTypes;
}

/**
 * Lib - Type Declaration Engine - Derive Dts Mapping.
 *
 * Builds the unified source<->d.ts path mapping off the injected type roots, replacing
 * the old hardcoded `/src/`->`/src/types/` of the variable-type-symmetry rule. Non-`src`
 * layouts map correctly because the mirror segment is derived from each type root.
 *
 * @since 0.18.0
 */
export function deriveDtsMapping(typeRoots: Lib_TypeDeclarationEngine_DeriveDtsMapping_TypeRoots): Lib_TypeDeclarationEngine_DeriveDtsMapping_Returns {
  return {
    sourceToDts: (file) => {
      let mapped: Lib_TypeDeclarationEngine_DeriveDtsMapping_Mapped = file;

      for (const typeRoot of typeRoots) {
        if (file.includes(`/${typeRoot}/`) === true) {
          mapped = file.replace(`/${typeRoot}/`, `/${typeRoot}/types/`);
          break;
        }
      }

      return mapped.replace('.ts', '.d.ts');
    },
    dtsToSource: (file) => {
      return file.replace('/types/', '/').replace('.d.ts', '.ts');
    },
  };
}

/**
 * Lib - Type Declaration Engine - Derive Source Path.
 *
 * Maps a d.ts mirror path back to its source `.ts` path by dropping the `/types/`
 * segment. The coverage rule uses it to check each d.ts has a matching source file.
 *
 * @since 0.15.0
 */
export function deriveSourcePath(dtsPath: Lib_TypeDeclarationEngine_DeriveSourcePath_DtsPath): Lib_TypeDeclarationEngine_DeriveSourcePath_Returns {
  return dtsPath.replace('/types/', '/').replace('.d.ts', '.ts');
}

/**
 * Lib - Type Declaration Engine - File Exists.
 *
 * Async existence check via a read attempt, returning a boolean instead of throwing.
 * The coverage rule uses it to decide whether a derived source path is real.
 *
 * @since 0.15.0
 */
export async function fileExists(filePath: Lib_TypeDeclarationEngine_FileExists_FilePath): Lib_TypeDeclarationEngine_FileExists_Returns {
  try {
    await readFile(filePath, 'utf-8');

    return true;
  } catch {
    return false;
  }
}

/**
 * Lib - Type Declaration Engine - Extract Type Names.
 *
 * Pulls the declared name from each `export type` line. Downstream rules index types
 * by name to check locality, ordering, and uniqueness.
 *
 * @since 0.15.0
 */
export function extractTypeNames(typeLines: Lib_TypeDeclarationEngine_ExtractTypeNames_TypeLines): Lib_TypeDeclarationEngine_ExtractTypeNames_Returns {
  const typeNames: Lib_TypeDeclarationEngine_ExtractTypeNames_TypeNames = [];

  for (const line of typeLines) {
    const match: Lib_TypeDeclarationEngine_ExtractTypeNames_Match = line.match(LIB_REGEX_PATTERN_EXPORT_TYPE_NAME);

    if (match !== null && match[1] !== undefined) {
      typeNames.push(match[1]);
    }
  }

  return typeNames;
}

/**
 * Lib - Type Declaration Engine - Find First Occurrence.
 *
 * Returns the first source line a type name appears on, skipping the import block.
 * The first-come-first-serve rule uses it to order types by source appearance.
 *
 * @since 0.15.0
 */
export function findFirstOccurrence(sourceLines: Lib_TypeDeclarationEngine_FindFirstOccurrence_SourceLines, typeName: Lib_TypeDeclarationEngine_FindFirstOccurrence_TypeName): Lib_TypeDeclarationEngine_FindFirstOccurrence_Returns {
  let inImportBlock: Lib_TypeDeclarationEngine_FindFirstOccurrence_InImportBlock = false;

  for (let i: Lib_TypeDeclarationEngine_FindFirstOccurrence_I = 0; i < sourceLines.length; i += 1) {
    const line: Lib_TypeDeclarationEngine_FindFirstOccurrence_Line = sourceLines[i] as Lib_TypeDeclarationEngine_FindFirstOccurrence_Line;

    if (line === undefined) {
      continue;
    }

    if (line.startsWith('import ') === true || line.startsWith('import type') === true) {
      inImportBlock = true;
    }

    if (inImportBlock === true) {
      if (line.includes(' from ') === true) {
        inImportBlock = false;
      }

      continue;
    }

    const typeNamePattern: Lib_TypeDeclarationEngine_FindFirstOccurrence_TypeNamePattern = new RegExp(`\\b${typeName}\\b`);

    if (typeNamePattern.test(line) === true) {
      return i;
    }
  }

  return -1;
}

/**
 * Lib - Type Declaration Engine - Extract Object Types.
 *
 * Parses object-type literals and their property lines from the d.ts. The property
 * hierarchy rule checks each property type is parent-prefixed and defined first.
 *
 * @since 0.15.0
 */
export function extractObjectTypes(lines: Lib_TypeDeclarationEngine_ExtractObjectTypes_Lines, classPrefix: Lib_TypeDeclarationEngine_ExtractObjectTypes_ClassPrefix): Lib_TypeDeclarationEngine_ExtractObjectTypes_Returns {
  const objectTypes: Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectTypes = [];
  const typeLineMap: Lib_TypeDeclarationEngine_ExtractObjectTypes_TypeLineMap = new Map<string, number>();

  for (let i: Lib_TypeDeclarationEngine_ExtractObjectTypes_I = 0; i < lines.length; i += 1) {
    const line: Lib_TypeDeclarationEngine_ExtractObjectTypes_Line = lines[i] as Lib_TypeDeclarationEngine_ExtractObjectTypes_Line;

    if (line === undefined) {
      continue;
    }

    const typeDefMatch: Lib_TypeDeclarationEngine_ExtractObjectTypes_TypeDefMatch = line.match(new RegExp(`^export type (${classPrefix}\\w+)`));

    if (typeDefMatch !== null && typeDefMatch[1] !== undefined) {
      typeLineMap.set(typeDefMatch[1], i);
    }
  }

  for (let i: Lib_TypeDeclarationEngine_ExtractObjectTypes_I = 0; i < lines.length; i += 1) {
    const line2: Lib_TypeDeclarationEngine_ExtractObjectTypes_Line2 = lines[i] as Lib_TypeDeclarationEngine_ExtractObjectTypes_Line2;

    if (line2 === undefined) {
      continue;
    }

    const objectMatch: Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectMatch = line2.match(new RegExp(`^export type (${classPrefix}\\w+) = (?:Readonly<)?\\{$`));

    if (objectMatch === null || objectMatch[1] === undefined) {
      continue;
    }

    const properties: Lib_TypeDeclarationEngine_ExtractObjectTypes_Properties = [];

    for (let j: Lib_TypeDeclarationEngine_ExtractObjectTypes_J = i + 1; j < lines.length; j += 1) {
      const propertyLine: Lib_TypeDeclarationEngine_ExtractObjectTypes_PropertyLine = lines[j] as Lib_TypeDeclarationEngine_ExtractObjectTypes_PropertyLine;

      if (propertyLine === undefined) {
        continue;
      }

      const trimmedProperty: Lib_TypeDeclarationEngine_ExtractObjectTypes_TrimmedProperty = propertyLine.trim();

      // Object closings take several forms: `};`, `}>`, `}>;`, plus union/array/intersection
      // tails like `} | undefined;`, `}[];`, `} & Other;` (optionally readonly: `}> | ...`, `}>[];`).
      // A property line is always `key: Type;`, so any trimmed line starting with `}` is a closing;
      // breaking on all of them stops the scanner from over-reading into the next type.
      if (trimmedProperty.startsWith('}') === true) {
        break;
      }

      const propertyMatch: Lib_TypeDeclarationEngine_ExtractObjectTypes_PropertyMatch = trimmedProperty.match(LIB_REGEX_PATTERN_DTS_PROPERTY_LINE);

      if (
        propertyMatch !== null
        && propertyMatch[1] !== undefined
        && propertyMatch[2] !== undefined
      ) {
        const propertyKey: Lib_TypeDeclarationEngine_ExtractObjectTypes_PropertyKey = propertyMatch[1];
        const propertyValueType: Lib_TypeDeclarationEngine_ExtractObjectTypes_PropertyValueType = propertyMatch[2];
        const typeLineIndex: Lib_TypeDeclarationEngine_ExtractObjectTypes_TypeLineIndex = typeLineMap.get(propertyValueType) ?? -1;

        properties.push({
          key: propertyKey,
          valueType: propertyValueType,
          typeLineIndex,
        });
      }
    }

    const objectName: Lib_TypeDeclarationEngine_ExtractObjectTypes_ObjectName = objectMatch[1];

    objectTypes.push({
      name: objectName,
      lineIndex: i,
      properties,
    });
  }

  return objectTypes;
}

/**
 * Lib - Type Declaration Engine - Source File Cache.
 *
 * Caches SourceFile parses by filePath with a content check to invalidate on edits.
 * The suite parses each file 5 times across rules, so this avoids ~1000 reparses;
 * fixture tests reuse a fake filePath, so the content check forces fresh parses.
 *
 * @since 0.18.0
 */
const sourceFileCache: Lib_TypeDeclarationEngine_SourceFileCache = new Map();

export function parseSourceFile(filePath: Lib_TypeDeclarationEngine_ParseSourceFile_FilePath, content: Lib_TypeDeclarationEngine_ParseSourceFile_Content): Lib_TypeDeclarationEngine_ParseSourceFile_Returns {
  const cached: Lib_TypeDeclarationEngine_ParseSourceFile_Cached = sourceFileCache.get(filePath);

  if (cached !== undefined && cached['content'] === content) {
    return cached['sourceFile'];
  }

  const sourceFile: Lib_TypeDeclarationEngine_ParseSourceFile_SourceFile = createSourceFile(filePath, content, ScriptTarget.Latest, true);

  sourceFileCache.set(filePath, {
    content, sourceFile,
  });

  return sourceFile;
}

/**
 * Lib - Type Declaration Engine - Extract Function Params.
 *
 * Walks the AST for every function, method, and constructor parameter with a type.
 * The leaf-naming rule checks each param's type leaf matches the param name.
 *
 * @since 0.18.0
 */
export function extractFunctionParams(filePath: Lib_TypeDeclarationEngine_ExtractFunctionParams_FilePath, content: Lib_TypeDeclarationEngine_ExtractFunctionParams_Content): Lib_TypeDeclarationEngine_ExtractFunctionParams_Returns {
  const sourceFile: Lib_TypeDeclarationEngine_ExtractFunctionParams_SourceFile = parseSourceFile(filePath, content);
  const params: Lib_TypeDeclarationEngine_ExtractFunctionParams_Params = [];

  function visit(node: Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_Node): Lib_TypeDeclarationEngine_ExtractFunctionParams_VisitReturns {
    let parameterList: Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_ParameterList = undefined;

    if (
      isFunctionDeclaration(node) === true
      || isMethodDeclaration(node) === true
      || isConstructorDeclaration(node) === true
    ) {
      parameterList = (node as Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithParametersShape)['parameters'];
    } else if (isVariableStatement(node) === true) {
      // Function-typed const: extract its arrow function's parameters.
      for (const decl of node.declarationList.declarations) {
        if (
          decl.initializer !== undefined
          && (
            isArrowFunction(decl.initializer) === true
            || isFunctionExpression(decl.initializer) === true
          )
        ) {
          parameterList = decl.initializer.parameters;
        }
      }
    }

    if (parameterList !== undefined) {
      for (const param of parameterList) {
        const paramNode: Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_ParamNode = param as Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_ParamNode;

        if (
          paramNode['name'] !== undefined
          && isIdentifier(paramNode['name']) === true
          && paramNode['type'] !== undefined
          && isTypeReferenceNode(paramNode['type']) === true
          && isIdentifier((paramNode['type'] as Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithTypeNameShape)['typeName']) === true
        ) {
          const lineNumber: Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_LineNumber = sourceFile.getLineAndCharacterOfPosition((param).getStart()).line + 1;
          const paramRecord: Lib_TypeDeclarationEngine_ExtractFunctionParams_Visit_ParamRecord = {
            paramName: (paramNode['name'] as Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithTextShape)['text'],
            typeName: (paramNode['type'] as Lib_TypeDeclarationEngine_ExtractFunctionParams_NodeWithTypeNameTextShape)['typeName']['text'],
            lineNumber,
          };

          params.push(paramRecord);
        }
      }
    }

    forEachChild(node, visit);

    return;
  }

  forEachChild(sourceFile, visit);

  return params;
}

/**
 * Lib - Type Declaration Engine - Extract Body Declarations.
 *
 * Pulls typed `const`/`let` body variables (skipping for-of and untyped) from source
 * lines. The leaf-naming and locality rules audit each declared body variable.
 *
 * @since 0.18.0
 */
export function extractBodyDeclarations(lines: Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Lines): Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Returns {
  const declarations: Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Declarations = [];

  for (let i: Lib_TypeDeclarationEngine_ExtractBodyDeclarations_I = 0; i < lines.length; i += 1) {
    const line: Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Line = lines[i] as Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Line;

    if (line === undefined) {
      continue;
    }

    const match: Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Match = line.match(LIB_REGEX_PATTERN_TYPED_BODY_DECLARATION);

    if (
      match !== null
      && match[1] !== undefined
      && match[2] !== undefined
      && match[3] !== undefined
    ) {
      const declaration: Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Declaration = {
        keyword: match[1] as Lib_TypeDeclarationEngine_ExtractBodyDeclarations_Keyword,
        varName: match[2],
        typeName: match[3],
        lineNumber: i + 1,
      };

      declarations.push(declaration);
    }
  }

  return declarations;
}

/**
 * Lib - Type Declaration Engine - Extract Top Level Identifiers.
 *
 * Lists top-level class, function, and function-typed const names with line numbers.
 * The C1/C2/C3 rule checks none of these equal the file name.
 *
 * @since 0.18.0
 */
export function extractTopLevelIdentifiers(filePath: Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_FilePath, content: Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Content): Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Returns {
  const sourceFile: Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_SourceFile = parseSourceFile(filePath, content);
  const identifiers: Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifiers = [];

  function getLine(node: Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_GetLine_Node): Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_GetLine_Returns {
    return sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
  }

  forEachChild(sourceFile, (node) => {
    if (isClassDeclaration(node) === true && node.name !== undefined) {
      const identifier: Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier = {
        name: node.name.text,
        kind: 'class',
        lineNumber: getLine(node),
      };

      identifiers.push(identifier);

      return;
    }

    if (isFunctionDeclaration(node) === true && node.name !== undefined) {
      const identifier2: Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier2 = {
        name: node.name.text,
        kind: 'function',
        lineNumber: getLine(node),
      };

      identifiers.push(identifier2);

      return;
    }

    if (isVariableStatement(node) === true) {
      for (const decl of node.declarationList.declarations) {
        if (
          decl.name !== undefined
          && isIdentifier(decl.name) === true
          && decl.initializer !== undefined
          && (
            isArrowFunction(decl.initializer) === true
            || isFunctionExpression(decl.initializer) === true
            || isClassExpression(decl.initializer) === true
          )
        ) {
          const identifier3: Lib_TypeDeclarationEngine_ExtractTopLevelIdentifiers_Identifier3 = {
            name: decl.name.text,
            kind: 'const',
            lineNumber: getLine(decl),
          };

          identifiers.push(identifier3);
        }
      }
    }

    return;
  });

  return identifiers;
}

/**
 * Lib - Type Declaration Engine - Build Source Section Map.
 *
 * Tags every source line with the section (class/method/function/describe) it sits in.
 * This map is how the rules know which section prefix a line's type should carry.
 *
 * @since 0.18.0
 */
export function buildSourceSectionMap(filePath: Lib_TypeDeclarationEngine_BuildSourceSectionMap_FilePath, content: Lib_TypeDeclarationEngine_BuildSourceSectionMap_Content, classPrefix: Lib_TypeDeclarationEngine_BuildSourceSectionMap_ClassPrefix): Lib_TypeDeclarationEngine_BuildSourceSectionMap_Returns {
  const sourceFile: Lib_TypeDeclarationEngine_BuildSourceSectionMap_SourceFile = parseSourceFile(filePath, content);
  const sectionMap: Lib_TypeDeclarationEngine_BuildSourceSectionMap_SectionMap = new Map<number, string>();

  // Recursion depth guard: real source files never approach this; pathologically deep generated code
  // (10k-level callback chains) would otherwise hit Node's default stack limit (~10k frames).
  const maxDepth: Lib_TypeDeclarationEngine_BuildSourceSectionMap_MaxDepth = 5000;

  function getLine(node: Lib_TypeDeclarationEngine_BuildSourceSectionMap_GetLine_Node): Lib_TypeDeclarationEngine_BuildSourceSectionMap_GetLine_Returns {
    return sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
  }

  function pascalCase(name: Lib_TypeDeclarationEngine_BuildSourceSectionMap_PascalCase_Name): Lib_TypeDeclarationEngine_BuildSourceSectionMap_PascalCaseReturns {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  let currentDepth: Lib_TypeDeclarationEngine_BuildSourceSectionMap_CurrentDepth = 0;

  function tagAllChildren(node: Lib_TypeDeclarationEngine_BuildSourceSectionMap_TagAllChildren_Node, section: Lib_TypeDeclarationEngine_BuildSourceSectionMap_TagAllChildren_Section): Lib_TypeDeclarationEngine_BuildSourceSectionMap_TagAllChildrenReturns {
    if (currentDepth >= maxDepth) {
      return;
    }

    currentDepth += 1;
    forEachChild(node, (child) => visit(child, section));
    currentDepth -= 1;

    return;
  }

  function visit(node: Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_Node, section: Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_Section): Lib_TypeDeclarationEngine_BuildSourceSectionMap_VisitReturns {
    // Class declaration: adds class name as a chunk. Anonymous (no name) classes fall through to default tagging.
    if (isClassDeclaration(node) === true && node.name !== undefined) {
      const newSection: Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_NewSection = `${section}_${pascalCase(node.name.text)}`;

      sectionMap.set(getLine(node), newSection);

      tagAllChildren(node, newSection);

      return;
    }

    // Method/getter/setter declaration: section = parent + methodName. Accept both regular `name()`,
    // private `#name()`, and accessor pairs `get bar()` / `set bar()`. The cast captures the shared
    // shape (all three node kinds have `name?: PropertyName`) without per-cast noise.
    const accessor: Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_Accessor = node as Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_Accessor;

    if (
      (
        isMethodDeclaration(node) === true
        || isGetAccessorDeclaration(node) === true
        || isSetAccessorDeclaration(node) === true
      )
      && accessor.name !== undefined
      && (
        isIdentifier(accessor.name) === true
        || isPrivateIdentifier(accessor.name) === true
      )
    ) {
      const rawMethodName: Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_RawMethodName = accessor.name.text;
      const cleanMethodName: Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_CleanMethodName = (rawMethodName.startsWith('#') === true) ? rawMethodName.slice(1) : rawMethodName;
      const newSection2: Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_NewSection2 = `${section}_${pascalCase(cleanMethodName)}`;

      sectionMap.set(getLine(node), newSection2);

      tagAllChildren(node, newSection2);

      return;
    }

    // Constructor: section = parent + 'Constructor'.
    if (isConstructorDeclaration(node) === true) {
      const newSection3: Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_NewSection3 = `${section}_Constructor`;

      sectionMap.set(getLine(node), newSection3);

      tagAllChildren(node, newSection3);

      return;
    }

    // Top-level function declaration: section = parent + functionName.
    if (isFunctionDeclaration(node) === true && node.name !== undefined) {
      const newSection4: Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_NewSection4 = `${section}_${pascalCase(node.name.text)}`;

      sectionMap.set(getLine(node), newSection4);

      tagAllChildren(node, newSection4);

      return;
    }

    // Variable statement: check for function-typed const (arrow, function expression) or class-expression
    // const (covers EC9: anonymous class expressions take their enclosing const name as the chunk).
    if (isVariableStatement(node) === true) {
      let hasInitializer: Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_HasInitializer = false;
      let subSection: Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_SubSection = section;

      for (const decl of node.declarationList.declarations) {
        if (
          decl.name !== undefined
          && isIdentifier(decl.name) === true
          && decl.initializer !== undefined
          && (
            isArrowFunction(decl.initializer) === true
            || isFunctionExpression(decl.initializer) === true
            || isClassExpression(decl.initializer) === true
          )
        ) {
          hasInitializer = true;
          subSection = `${section}_${pascalCase(decl.name.text)}`;
        }
      }

      // The const declaration line itself is in the PARENT section.
      sectionMap.set(getLine(node), section);

      if (hasInitializer === true) {
        // Walk the initializer body in sub-section. For arrow / function expression, walk the .body.
        // For class expression, walk the entire class (its members get the sub-section, methods chain).
        for (const decl of node.declarationList.declarations) {
          if (decl.initializer === undefined) {
            continue;
          }

          if (isArrowFunction(decl.initializer) === true || isFunctionExpression(decl.initializer) === true) {
            if (decl.initializer.body !== undefined) {
              tagAllChildren(decl.initializer.body, subSection);
            }
          } else if (isClassExpression(decl.initializer) === true) {
            tagAllChildren(decl.initializer, subSection);
          }
        }
      } else {
        tagAllChildren(node, section);
      }

      return;
    }

    // Generic (string, fn) call expression: any call where arg[0] is a string literal and any later arg
    // is a function expression. Covers describe/it/test, beforeEach/setup, app.get('/path', handler),
    // db.transaction('init', tx => ...), etc. Recursively at any depth.
    if (
      isCallExpression(node) === true
      && node.arguments.length >= 2
      && node.arguments[0] !== undefined
      && isStringLiteral(node.arguments[0]) === true
    ) {
      let callbackArg: Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_CallbackArg = undefined;

      for (let argIndex = 1; argIndex < node.arguments.length; argIndex += 1) {
        const arg: Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_Arg = node.arguments[argIndex];

        if (
          arg !== undefined
          && (
            isArrowFunction(arg) === true
            || isFunctionExpression(arg) === true
          )
        ) {
          callbackArg = arg;
          break;
        }
      }

      if (callbackArg !== undefined) {
        const stringArg: Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_StringArg = node.arguments[0];
        const chunk: Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_Chunk = parseDescribeString(stringArg.text);

        // If the string parses to an empty chunk (purely non-alphanumeric input like
        // `describe('!@#', ...)`), fall through to the default branch below so the call's
        // children are still walked under the parent section instead of getting tagged with a
        // malformed `${section}_` chunk.
        if (chunk !== '') {
          const newSection5: Lib_TypeDeclarationEngine_BuildSourceSectionMap_Visit_NewSection5 = `${section}_${chunk}`;

          sectionMap.set(getLine(node), section);

          tagAllChildren(callbackArg, newSection5);

          return;
        }
      }
    }

    // Default: tag this line with current section, walk children with same section.
    sectionMap.set(getLine(node), section);

    tagAllChildren(node, section);

    return;
  }

  forEachChild(sourceFile, (child) => visit(child, classPrefix));

  return sectionMap;
}

/**
 * Lib - Type Declaration Engine - Parse Describe String.
 *
 * Turns a `(string, fn)` call argument into a PascalCase chunk by splitting on
 * non-word characters. This is how describe/it strings become section name chunks.
 *
 * @since 0.18.0
 */
export function parseDescribeString(input: Lib_TypeDeclarationEngine_ParseDescribeString_Input): Lib_TypeDeclarationEngine_ParseDescribeString_Returns {
  const pieces: Lib_TypeDeclarationEngine_ParseDescribeString_Pieces = input
    .split(LIB_REGEX_PATTERN_NON_ALPHANUMERIC_RUN)
    .filter((piece) => piece.length > 0)
    .map((piece) => piece.charAt(0).toUpperCase() + piece.slice(1));

  return pieces.join('');
}

/**
 * Lib - Type Declaration Engine - Strip Underscore Prefix.
 *
 * Drops a single leading underscore from a variable name before leaf comparison, so
 * an intentionally-unused `_foo` still maps to the `Foo` leaf.
 *
 * @since 0.18.0
 */
export function stripUnderscorePrefix(input: Lib_TypeDeclarationEngine_StripUnderscorePrefix_Input): Lib_TypeDeclarationEngine_StripUnderscorePrefix_Returns {
  if (input.startsWith('_') === true) {
    return input.slice(1);
  }

  return input;
}

/**
 * Lib - Type Declaration Engine - Check Type Name Uniqueness.
 *
 * Flags two declarations in one file that would produce the same expected type name.
 * Rule 7.8 catches this before a duplicate `export type` reaches the d.ts.
 *
 * @since 0.18.0
 */
export function checkTypeNameUniqueness(declarations: Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Declarations): Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Returns {
  const violations: Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Violations = [];
  const seen: Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Seen = new Map();

  for (const declaration of declarations) {
    const existing: Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Existing = seen.get(declaration['typeName']);

    if (existing !== undefined) {
      const violation: Lib_TypeDeclarationEngine_CheckTypeNameUniqueness_Violation = `Two declarations would produce the same type name '${declaration['typeName']}'. First: line ${existing['lineNumber']} ('${existing['name']}'); duplicate: line ${declaration['lineNumber']} ('${declaration['name']}'). Rename one of the declarations so the type names differ.`;

      violations.push(violation);
    } else {
      seen.set(declaration['typeName'], {
        name: declaration['name'],
        lineNumber: declaration['lineNumber'],
      });
    }
  }

  return violations;
}

/**
 * Lib - Type Declaration Engine - Detect Inline Typed Callbacks.
 *
 * Finds anonymous arrow/function callbacks that carry a typed parameter. Rule 7.4
 * forbids these; they must be extracted to a named const instead.
 *
 * @since 0.18.0
 */
export function detectInlineTypedCallbacks(filePath: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_FilePath, content: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Content): Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Returns {
  const sourceFile: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_SourceFile = parseSourceFile(filePath, content);
  const callbacks: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Callbacks = [];

  function visit(node: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_Node): Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_VisitReturns {
    if (
      (
        isArrowFunction(node) === true
        || isFunctionExpression(node) === true
      )
      && node.parent !== undefined
    ) {
      // Check if this is an inline (anonymous) typed callback -- i.e., NOT the initializer of a VariableDeclaration.
      let isFunctionTypedConst: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_IsFunctionTypedConst = false;
      let walker: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_Walker = node.parent;

      while (walker !== undefined) {
        if (isVariableStatement(walker) === true) {
          isFunctionTypedConst = true;
          break;
        }
        if (
          (walker as Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithKindShape)['kind'] !== undefined
          && (
            isCallExpression(walker) === true
            || isArrowFunction(walker) === true
            || isFunctionExpression(walker) === true
          )
        ) {
          break;
        }
        walker = (walker as Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithParentShape)['parent'];
      }

      if (isFunctionTypedConst === false) {
        // Inline callback. Check its typed params.
        for (const param of node.parameters) {
          const paramNode: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_ParamNode = param as Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_ParamNode;

          if (
            paramNode['name'] !== undefined
            && isIdentifier(paramNode['name']) === true
            && paramNode['type'] !== undefined
            && isTypeReferenceNode(paramNode['type']) === true
            && isIdentifier((paramNode['type'] as Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithTypeNameShape)['typeName']) === true
          ) {
            const lineNumber: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_LineNumber = sourceFile.getLineAndCharacterOfPosition((param as Node).getStart()).line + 1;
            const callback: Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_Visit_Callback = {
              paramName: (paramNode['name'] as Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithTextShape)['text'],
              typeName: (paramNode['type'] as Lib_TypeDeclarationEngine_DetectInlineTypedCallbacks_NodeWithTypeNameTextShape)['typeName']['text'],
              lineNumber,
            };

            callbacks.push(callback);
          }
        }
      }
    }

    forEachChild(node, visit);

    return;
  }

  forEachChild(sourceFile, visit);

  return callbacks;
}

/**
 * Lib - Type Declaration Engine - Extract Array Types.
 *
 * Pulls plain `X = Y[]` array aliases (skipping generics, unions, multi-dim) from the
 * d.ts. The element-before-array rule checks the element type is defined first.
 *
 * @since 0.18.0
 */
export function extractArrayTypes(lines: Lib_TypeDeclarationEngine_ExtractArrayTypes_Lines): Lib_TypeDeclarationEngine_ExtractArrayTypes_Returns {
  const arrayTypes: Lib_TypeDeclarationEngine_ExtractArrayTypes_ArrayTypes = [];

  for (let i: Lib_TypeDeclarationEngine_ExtractArrayTypes_I = 0; i < lines.length; i += 1) {
    const line: Lib_TypeDeclarationEngine_ExtractArrayTypes_Line = lines[i] as Lib_TypeDeclarationEngine_ExtractArrayTypes_Line;

    if (line === undefined) {
      continue;
    }

    const match: Lib_TypeDeclarationEngine_ExtractArrayTypes_Match = line.match(LIB_REGEX_PATTERN_DTS_ARRAY_ALIAS);

    if (
      match !== null
      && match[1] !== undefined
      && match[2] !== undefined
    ) {
      const arrayType: Lib_TypeDeclarationEngine_ExtractArrayTypes_ArrayType = {
        arrayTypeName: match[1],
        elementTypeName: match[2],
        lineIndex: i,
      };

      arrayTypes.push(arrayType);
    }
  }

  return arrayTypes;
}

/**
 * Lib - Type Declaration Engine - Extract Function Returns.
 *
 * Walks the AST for each function/method return type and whether it is a type guard.
 * Rules 7.5/7.6/7.7 validate the Returns/TypeGuard suffixes against these records.
 *
 * @since 0.18.0
 */
export function extractFunctionReturns(filePath: Lib_TypeDeclarationEngine_ExtractFunctionReturns_FilePath, content: Lib_TypeDeclarationEngine_ExtractFunctionReturns_Content): Lib_TypeDeclarationEngine_ExtractFunctionReturns_Returns {
  const sourceFile: Lib_TypeDeclarationEngine_ExtractFunctionReturns_SourceFile = parseSourceFile(filePath, content);
  const returnRecords: Lib_TypeDeclarationEngine_ExtractFunctionReturns_ReturnRecords = [];

  function visit(node: Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_Node): Lib_TypeDeclarationEngine_ExtractFunctionReturns_VisitReturns {
    if (
      isFunctionDeclaration(node) === true
      || isMethodDeclaration(node) === true
      || isConstructorDeclaration(node) === true
    ) {
      const fnNode: Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_FnNode = node as Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_FnNode;
      const typeNode: Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_TypeNode = fnNode['type'];

      if (typeNode !== undefined) {
        let returnType: Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_ReturnType = '';
        let typeGuardFlag: Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_TypeGuardFlag = false;

        if (isTypePredicateNode(typeNode) === true) {
          typeGuardFlag = true;

          const predicateNode: Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_PredicateNode = typeNode as Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_PredicateNode;

          if (
            predicateNode['type'] !== undefined
            && isTypeReferenceNode(predicateNode['type']) === true
            && isIdentifier((predicateNode['type'] as Lib_TypeDeclarationEngine_ExtractFunctionReturns_NodeWithTypeNameShape)['typeName']) === true
          ) {
            returnType = (predicateNode['type'] as Lib_TypeDeclarationEngine_ExtractFunctionReturns_NodeWithTypeNameTextShape)['typeName']['text'];
          }
        } else if (isTypeReferenceNode(typeNode) === true && isIdentifier((typeNode as Lib_TypeDeclarationEngine_ExtractFunctionReturns_NodeWithTypeNameShape)['typeName']) === true) {
          returnType = (typeNode as Lib_TypeDeclarationEngine_ExtractFunctionReturns_NodeWithTypeNameTextShape)['typeName']['text'];
        }

        if (returnType !== '') {
          const lineNumber: Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_LineNumber = sourceFile.getLineAndCharacterOfPosition((node as Node).getStart()).line + 1;
          const returnRecord: Lib_TypeDeclarationEngine_ExtractFunctionReturns_Visit_ReturnRecord = {
            returnType,
            isTypeGuard: typeGuardFlag,
            lineNumber,
          };

          returnRecords.push(returnRecord);
        }
      }
    }

    forEachChild(node, visit);

    return;
  }

  forEachChild(sourceFile, visit);

  return returnRecords;
}

/**
 * Lib - Type Declaration Engine - Is Alias To Foreign Type.
 *
 * Rule 7.2 tightening: detects a local alias whose RHS is a single foreign path-prefixed
 * type, forbidding the "local re-alias" loophole that satisfied 7.2 mechanically. Complex
 * RHS shapes (objects, unions, generics) are not flagged, only direct single-type aliases.
 *
 * @since 0.18.0
 */
export function isAliasToForeignType(typeName: Lib_TypeDeclarationEngine_IsAliasToForeignType_TypeName, dtsContent: Lib_TypeDeclarationEngine_IsAliasToForeignType_DtsContent, classPrefix: Lib_TypeDeclarationEngine_IsAliasToForeignType_ClassPrefix): Lib_TypeDeclarationEngine_IsAliasToForeignType_Returns {
  // Escape regex special chars in typeName before interpolation. Convention type names are
  // alphanumeric+underscore so this is defensive - no current caller passes special chars, but
  // a future caller passing a malformed name would otherwise silently mismatch instead of erroring.
  const escapedTypeName: Lib_TypeDeclarationEngine_IsAliasToForeignType_EscapedTypeName = typeName.replace(new RegExp(LIB_REGEX_PATTERN_REGEX_SPECIAL_CHARS.source, 'g'), '\\$&');
  const pattern: Lib_TypeDeclarationEngine_IsAliasToForeignType_Pattern = new RegExp(`^export type ${escapedTypeName}\\s*=\\s*([^;]+);`, 'm');
  const match: Lib_TypeDeclarationEngine_IsAliasToForeignType_Match = dtsContent.match(pattern);

  if (match === null || match[1] === undefined) {
    return false;
  }

  let rhs: Lib_TypeDeclarationEngine_IsAliasToForeignType_Rhs = match[1].trim();

  rhs = rhs.replace(new RegExp(LIB_REGEX_PATTERN_ANGLE_BRACKET_GENERIC.source, 'g'), '');
  rhs = rhs.replace(new RegExp(LIB_REGEX_PATTERN_EMPTY_ARRAY_BRACKETS.source, 'g'), '');

  if (LIB_REGEX_PATTERN_COMPLEX_TYPE_RHS_CHARS.test(rhs) === true) {
    return false;
  }

  const typeMatch: Lib_TypeDeclarationEngine_IsAliasToForeignType_TypeMatch = rhs.trim().match(LIB_REGEX_PATTERN_SINGLE_PASCAL_TYPE);

  if (typeMatch === null || typeMatch[1] === undefined) {
    return false;
  }

  const leftmostType: Lib_TypeDeclarationEngine_IsAliasToForeignType_LeftmostType = typeMatch[1];

  if (leftmostType.includes('_') === false) {
    return false;
  }

  if (leftmostType.startsWith(`${classPrefix}_`) === true) {
    return false;
  }

  return true;
}

/**
 * Lib - Type Declaration Engine - Is Locally Defined.
 *
 * Checks whether a type name is declared in the given d.ts content via an exact
 * `export type X` line match. Rule 7.2 requires body-var types to be locally defined.
 *
 * @since 0.18.0
 */
export function isLocallyDefined(typeName: Lib_TypeDeclarationEngine_IsLocallyDefined_TypeName, dtsContent: Lib_TypeDeclarationEngine_IsLocallyDefined_DtsContent): Lib_TypeDeclarationEngine_IsLocallyDefined_Returns {
  const escapedTypeName: Lib_TypeDeclarationEngine_IsLocallyDefined_EscapedTypeName = typeName.replace(new RegExp(LIB_REGEX_PATTERN_REGEX_SPECIAL_CHARS.source, 'g'), '\\$&');
  const pattern: Lib_TypeDeclarationEngine_IsLocallyDefined_Pattern = new RegExp(`^export type ${escapedTypeName}\\b`, 'm');

  return pattern.test(dtsContent);
}

/**
 * Lib - Type Declaration Engine - Is Reserved Suffix.
 *
 * Reports whether a type name ends in a return-only suffix (Returns/TypeGuard/Return).
 * Rule 7.3 bans these suffixes at body-variable and parameter positions.
 *
 * @since 0.18.0
 */
export function isReservedSuffix(typeName: Lib_TypeDeclarationEngine_IsReservedSuffix_TypeName): Lib_TypeDeclarationEngine_IsReservedSuffix_Returns {
  return (
    typeName.endsWith('_Returns') === true
    || typeName.endsWith('_TypeGuard') === true
    || typeName.endsWith('_Return') === true
    || typeName.endsWith('Returns') === true
    || typeName.endsWith('TypeGuard') === true
    || typeName.endsWith('Return') === true
  );
}

/**
 * Lib - Type Declaration Engine - Validate Leaf.
 *
 * Checks a variable's type leaf equals its title-cased name under the right section
 * prefix. This is the core of rule 7.1; returns a reason string or null on pass.
 *
 * @since 0.18.0
 */
export function validateLeaf(varName: Lib_TypeDeclarationEngine_ValidateLeaf_VarName, typeName: Lib_TypeDeclarationEngine_ValidateLeaf_TypeName, sourceSection: Lib_TypeDeclarationEngine_ValidateLeaf_SourceSection, classPrefix: Lib_TypeDeclarationEngine_ValidateLeaf_ClassPrefix): Lib_TypeDeclarationEngine_ValidateLeaf_Returns {
  const stripped: Lib_TypeDeclarationEngine_ValidateLeaf_Stripped = stripUnderscorePrefix(varName);
  const titleVar: Lib_TypeDeclarationEngine_ValidateLeaf_TitleVar = stripped.charAt(0).toUpperCase() + stripped.slice(1);
  const expectedSection: Lib_TypeDeclarationEngine_ValidateLeaf_ExpectedSection = `${sourceSection}_${titleVar}`;
  const expectedClass: Lib_TypeDeclarationEngine_ValidateLeaf_ExpectedClass = `${classPrefix}_${titleVar}`;

  if (typeName === expectedSection || typeName === expectedClass) {
    return null;
  }

  let actualLeaf: Lib_TypeDeclarationEngine_ValidateLeaf_ActualLeaf = typeName;

  if (typeName.startsWith(`${sourceSection}_`) === true) {
    actualLeaf = typeName.slice(sourceSection.length + 1);
  } else if (typeName.startsWith(`${classPrefix}_`) === true) {
    actualLeaf = typeName.slice(classPrefix.length + 1);
  }

  return {
    actualLeaf,
    expectedLeaf: titleVar,
  };
}

/**
 * Lib - Type Declaration Engine - Validate Return Type.
 *
 * Checks a function return type uses Returns (or TypeGuard for `value is T`) and not
 * the banned singular Return. Implements rules 7.5/7.6/7.7; returns a reason or null.
 *
 * @since 0.18.0
 */
export function validateReturnType(returnType: Lib_TypeDeclarationEngine_ValidateReturnType_ReturnType, typeGuardFlag: Lib_TypeDeclarationEngine_ValidateReturnType_TypeGuardFlag): Lib_TypeDeclarationEngine_ValidateReturnType_Returns {
  // Rule 7.6: 'Return' (singular) at return position is banned.
  if (returnType.endsWith('_Return') === true || returnType.endsWith('Return') === true) {
    return `Return type '${returnType}' uses banned singular 'Return' suffix; rename to use 'Returns' (plural).`;
  }

  if (typeGuardFlag === true) {
    // Rule 7.7: type guard return must end in '_TypeGuard' or 'TypeGuard'.
    if (returnType.endsWith('_TypeGuard') === false && returnType.endsWith('TypeGuard') === false) {
      return `Type-guard return type '${returnType}' must end in 'TypeGuard'.`;
    }
  } else if (returnType.endsWith('_Returns') === false && returnType.endsWith('Returns') === false) {
    // Rule 7.5: regular function return must end in '_Returns' or 'Returns'.
    // Rule 7.7: 'TypeGuard' at non-type-guard return position is forbidden.
    if (returnType.endsWith('_TypeGuard') === true || returnType.endsWith('TypeGuard') === true) {
      return `Return type '${returnType}' ends in 'TypeGuard' but the function does not use 'value is T' form; either rename to '_Returns' or rewrite as a type guard.`;
    }
    return `Function return type '${returnType}' must end in 'Returns' (plural).`;
  }

  return null;
}

/**
 * Lib - Type Declaration Engine - Run Rule Pipeline.
 *
 * Wires every body-var rule (7.1-7.5/6/7) end-to-end against an inline source/.d.ts
 * fixture pair and returns the violation list. Used by the end-to-end fixture tests so
 * each fixture only carries its content and assertions, not the pipeline boilerplate.
 *
 * @since 0.18.0
 */
export function runRulePipeline(filePath: Lib_TypeDeclarationEngine_RunRulePipeline_FilePath, sourceContent: Lib_TypeDeclarationEngine_RunRulePipeline_SourceContent, dtsContent: Lib_TypeDeclarationEngine_RunRulePipeline_DtsContent, classPrefix: Lib_TypeDeclarationEngine_RunRulePipeline_ClassPrefix): Lib_TypeDeclarationEngine_RunRulePipeline_Returns {
  const sectionMap: Lib_TypeDeclarationEngine_RunRulePipeline_SectionMap = buildSourceSectionMap(filePath, sourceContent, classPrefix);
  const lines: Lib_TypeDeclarationEngine_RunRulePipeline_Lines = sourceContent.split('\n');
  const declarations: Lib_TypeDeclarationEngine_RunRulePipeline_Declarations = extractBodyDeclarations(lines);
  const callbacks: Lib_TypeDeclarationEngine_RunRulePipeline_Callbacks = detectInlineTypedCallbacks(filePath, sourceContent);
  const fnReturnRecords: Lib_TypeDeclarationEngine_RunRulePipeline_FnReturnRecords = extractFunctionReturns(filePath, sourceContent);
  const violations: Lib_TypeDeclarationEngine_RunRulePipeline_Violations = [];

  for (const callback of callbacks) {
    violations.push(`7.4: ${callback['paramName']}: ${callback['typeName']}`);
  }

  for (const declaration of declarations) {
    const sourceSection: Lib_TypeDeclarationEngine_RunRulePipeline_SourceSection = sectionMap.get(declaration['lineNumber']) ?? classPrefix;

    if (isReservedSuffix(declaration['typeName']) === true) {
      violations.push(`7.3: ${declaration['varName']}: ${declaration['typeName']}`);
      continue;
    }

    const leafResult: Lib_TypeDeclarationEngine_RunRulePipeline_LeafResult = validateLeaf(declaration['varName'], declaration['typeName'], sourceSection, classPrefix);
    if (leafResult !== null) {
      violations.push(`7.1: ${declaration['varName']}: ${declaration['typeName']}`);
    }

    if (isLocallyDefined(declaration['typeName'], dtsContent) === false) {
      violations.push(`7.2-not-defined: ${declaration['typeName']}`);
    } else if (isAliasToForeignType(declaration['typeName'], dtsContent, classPrefix) === true) {
      violations.push(`7.2-alias: ${declaration['typeName']}`);
    }
  }

  for (const fnReturn of fnReturnRecords) {
    const reason: Lib_TypeDeclarationEngine_RunRulePipeline_Reason = validateReturnType(fnReturn['returnType'], fnReturn['isTypeGuard']);
    if (reason !== null) {
      violations.push(`7.5/6/7: ${fnReturn['returnType']}`);
    }
  }

  return violations;
}
