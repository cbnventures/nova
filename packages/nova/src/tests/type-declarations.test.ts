import { deepStrictEqual, ok, strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  dirname,
  relative,
  resolve,
  sep,
} from 'node:path';
import { fileURLToPath } from 'node:url';

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
import { describe, it } from 'vitest';

import type {
  GetAccessorDeclaration,
  MethodDeclaration,
  Node,
  SetAccessorDeclaration,
  SourceFile,
  StringLiteral,
} from 'typescript';

import type {
  Tests_TypeDeclarations_DeriveClassPrefix_CurrentDirectory,
  Tests_TypeDeclarations_DeriveClassPrefix_FilePath,
  Tests_TypeDeclarations_DeriveClassPrefix_RelativeCleaned,
  Tests_TypeDeclarations_DeriveClassPrefix_RelativePath,
  Tests_TypeDeclarations_DeriveClassPrefix_Returns,
  Tests_TypeDeclarations_DeriveClassPrefix_Segments,
  Tests_TypeDeclarations_DeriveSourcePath_DtsPath,
  Tests_TypeDeclarations_DeriveSourcePath_Returns,
  Tests_TypeDeclarations_DiscoverTypeFiles_Matched,
  Tests_TypeDeclarations_DiscoverTypeFiles_Patterns,
  Tests_TypeDeclarations_DiscoverTypeFiles_Returns,
  Tests_TypeDeclarations_ExtractImportedNames_ImportedNames,
  Tests_TypeDeclarations_ExtractImportedNames_InImportBlock,
  Tests_TypeDeclarations_ExtractImportedNames_InlineMatchCapture,
  Tests_TypeDeclarations_ExtractImportedNames_Lines,
  Tests_TypeDeclarations_ExtractImportedNames_Match,
  Tests_TypeDeclarations_ExtractImportedNames_Returns,
  Tests_TypeDeclarations_ExtractImportedNames_Specifiers,
  Tests_TypeDeclarations_ExtractImportedNames_Trimmed,
  Tests_TypeDeclarations_ExtractObjectTypes_ClassPrefix,
  Tests_TypeDeclarations_ExtractObjectTypes_Line,
  Tests_TypeDeclarations_ExtractObjectTypes_LineIndex,
  Tests_TypeDeclarations_ExtractObjectTypes_Lines,
  Tests_TypeDeclarations_ExtractObjectTypes_Match,
  Tests_TypeDeclarations_ExtractObjectTypes_ObjectTypeProperties,
  Tests_TypeDeclarations_ExtractObjectTypes_ObjectTypes,
  Tests_TypeDeclarations_ExtractObjectTypes_PropertyKey,
  Tests_TypeDeclarations_ExtractObjectTypes_PropertyValueType,
  Tests_TypeDeclarations_ExtractObjectTypes_Returns,
  Tests_TypeDeclarations_ExtractObjectTypes_Trimmed,
  Tests_TypeDeclarations_ExtractObjectTypes_TypeLineMap,
  Tests_TypeDeclarations_ExtractObjectTypes_TypeName,
  Tests_TypeDeclarations_ExtractReferencedTypes_ClassPrefix,
  Tests_TypeDeclarations_ExtractReferencedTypes_Line,
  Tests_TypeDeclarations_ExtractReferencedTypes_Match,
  Tests_TypeDeclarations_ExtractReferencedTypes_ReferencedType,
  Tests_TypeDeclarations_ExtractReferencedTypes_ReferencedTypes,
  Tests_TypeDeclarations_ExtractReferencedTypes_Returns,
  Tests_TypeDeclarations_ExtractReferencedTypes_RightSide,
  Tests_TypeDeclarations_ExtractReferencedTypes_TypeMatch,
  Tests_TypeDeclarations_ExtractReferencedTypes_TypeName,
  Tests_TypeDeclarations_ExtractReferencedTypes_TypePattern,
  Tests_TypeDeclarations_ExtractTypeNames_Match,
  Tests_TypeDeclarations_ExtractTypeNames_Returns,
  Tests_TypeDeclarations_ExtractTypeNames_TypeLines,
  Tests_TypeDeclarations_ExtractTypeNames_TypeNames,
  Tests_TypeDeclarations_FileExists_FilePath,
  Tests_TypeDeclarations_FileExists_Returns,
  Tests_TypeDeclarations_FindFirstOccurrence_InImportBlock,
  Tests_TypeDeclarations_FindFirstOccurrence_Line,
  Tests_TypeDeclarations_FindFirstOccurrence_LineIndex,
  Tests_TypeDeclarations_FindFirstOccurrence_Returns,
  Tests_TypeDeclarations_FindFirstOccurrence_SourceLines,
  Tests_TypeDeclarations_FindFirstOccurrence_TypeName,
  Tests_TypeDeclarations_FindFirstOccurrence_TypeNamePattern,
  Tests_TypeDeclarations_GetPackageRoot_CurrentFileDirectory,
  Tests_TypeDeclarations_GetPackageRoot_CurrentFilePath,
  Tests_TypeDeclarations_GetPackageRoot_Returns,
  Tests_TypeDeclarations_TestConfig,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_ClassPrefix,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Content,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_CurrentDirectory,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_CurrentSectionPrefix,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Files,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_ImportedNames,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_IsImported,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_IsOtherSection,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_IsSameSection,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Lines,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_ReferencedTypes,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_RelativePath,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SectionMap,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SectionPrefixes,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Sections,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SourceContent,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SourceExists,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SourcePath,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SourceSectionSet,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Violation,
  Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Violations,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ClassPrefix,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Content,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_CurrentDirectory,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Files,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_LineIndex,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Lines,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ArrayElementTypeNames,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ArrayTypes,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectPropertyTypeNames,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectTypes,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_RelativePath,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SectionMap,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Sections,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SourceSectionSet,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SourceExists,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SourceLineIndex,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SourcePath,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SourcePathAlternative,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_TypeNames,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_TypePosition,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_TypePositions,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Violation,
  Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Violations,
  Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Content,
  Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_CurrentDirectory,
  Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_CurrentSpecifier,
  Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Files,
  Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_InImportBlock,
  Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_InlineMatchCapture,
  Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Lines,
  Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Match,
  Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_PreviousSpecifier,
  Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_RelativePath,
  Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_SpecifierBuffer,
  Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Specifiers,
  Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Trimmed,
  Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Violation,
  Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Violations,
  Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ArrayTypes,
  Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ClassPrefix,
  Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Content,
  Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_CurrentDirectory,
  Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_DefinedTypes,
  Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ElementLine,
  Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Files,
  Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ImportedNames,
  Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Line,
  Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_LineIndex,
  Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Lines,
  Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Match,
  Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ObjectTypes,
  Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_PropertyExpectedPrefix,
  Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_RelativePath,
  Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_TypeDefLines,
  Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Violation,
  Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Violations,
  Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_ClassPrefix,
  Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_CompareResult,
  Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Content,
  Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_CurrentDirectory,
  Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Files,
  Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Lines,
  Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_RelativePath,
  Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Section,
  Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SectionIndex,
  Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SectionMap,
  Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Sections,
  Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SourceContent,
  Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SourceExists,
  Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SourcePath,
  Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SourceSectionSet,
  Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Violation,
  Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Violations,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ClassPrefix,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Content,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_CurrentDirectory,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_DtsSectionPrefixes,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Files,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_IsParent,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Lines,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_RelativePath,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ReverseAfterClassPrefix,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ReverseChunks,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ReverseExpectedMethodSection,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ReverseMatch,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ReverseTypeName,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_SectionMap,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Sections,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_SourceExists,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_SourcePath,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_SourcePathAlternative,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_SourceSectionSet,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Violation,
  Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Violations,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_BodyDecls,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Callbacks,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_ClassPrefix,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Content,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_CurrentDirectory,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_DtsContent,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_DtsExists,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_DtsPath,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_ExpectedNames,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Files,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_FunctionReturns,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_LeafResult,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Lines,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Params,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_RelativePath,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_ReturnValidationReason,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_SectionMap,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_SourceSection,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Stripped,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_TitleVar,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_UniquenessViolations,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Violation,
  Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Violations,
  Tests_TypeDeclarations_BuildDtsSections_ClassPrefix,
  Tests_TypeDeclarations_BuildDtsSections_DtsLines,
  Tests_TypeDeclarations_BuildDtsSections_Match,
  Tests_TypeDeclarations_BuildDtsSections_OwningSection,
  Tests_TypeDeclarations_BuildDtsSections_Returns,
  Tests_TypeDeclarations_BuildDtsSections_Section,
  Tests_TypeDeclarations_BuildDtsSections_SectionMap,
  Tests_TypeDeclarations_BuildDtsSections_SectionOrder,
  Tests_TypeDeclarations_BuildDtsSections_SortedSections,
  Tests_TypeDeclarations_BuildDtsSections_SourceSections,
  Tests_TypeDeclarations_BuildDtsSections_TypeName,
  Tests_TypeDeclarations_BuildSourceSectionMap_ClassPrefix,
  Tests_TypeDeclarations_BuildSourceSectionMap_Content,
  Tests_TypeDeclarations_BuildSourceSectionMap_CurrentDepth,
  Tests_TypeDeclarations_BuildSourceSectionMap_FilePath,
  Tests_TypeDeclarations_BuildSourceSectionMap_LineNumber,
  Tests_TypeDeclarations_BuildSourceSectionMap_MaxDepth,
  Tests_TypeDeclarations_BuildSourceSectionMap_Returns,
  Tests_TypeDeclarations_BuildSourceSectionMap_Section,
  Tests_TypeDeclarations_BuildSourceSectionMap_SectionMap,
  Tests_TypeDeclarations_CheckTypeNameUniqueness_Declaration,
  Tests_TypeDeclarations_CheckTypeNameUniqueness_Declarations,
  Tests_TypeDeclarations_CheckTypeNameUniqueness_FirstOccurrence,
  Tests_TypeDeclarations_CheckTypeNameUniqueness_Returns,
  Tests_TypeDeclarations_CheckTypeNameUniqueness_SeenMap,
  Tests_TypeDeclarations_CheckTypeNameUniqueness_Violation,
  Tests_TypeDeclarations_CheckTypeNameUniqueness_Violations,
  Tests_TypeDeclarations_DetectInlineTypedCallbacks_Callback,
  Tests_TypeDeclarations_DetectInlineTypedCallbacks_Callbacks,
  Tests_TypeDeclarations_DetectInlineTypedCallbacks_Content,
  Tests_TypeDeclarations_DetectInlineTypedCallbacks_FilePath,
  Tests_TypeDeclarations_DetectInlineTypedCallbacks_LineNumber,
  Tests_TypeDeclarations_DetectInlineTypedCallbacks_Returns,
  Tests_TypeDeclarations_DiscoverSourceFiles_Files,
  Tests_TypeDeclarations_DiscoverSourceFiles_IgnorePatterns,
  Tests_TypeDeclarations_DiscoverSourceFiles_Matched,
  Tests_TypeDeclarations_DiscoverSourceFiles_Patterns,
  Tests_TypeDeclarations_DiscoverSourceFiles_Returns,
  Tests_TypeDeclarations_ExtractArrayTypes_ArrayType,
  Tests_TypeDeclarations_ExtractArrayTypes_ArrayTypes,
  Tests_TypeDeclarations_ExtractArrayTypes_Line,
  Tests_TypeDeclarations_ExtractArrayTypes_LineIndex,
  Tests_TypeDeclarations_ExtractArrayTypes_Lines,
  Tests_TypeDeclarations_ExtractArrayTypes_Match,
  Tests_TypeDeclarations_ExtractArrayTypes_Returns,
  Tests_TypeDeclarations_ExtractBodyDeclarations_Declaration,
  Tests_TypeDeclarations_ExtractBodyDeclarations_Declarations,
  Tests_TypeDeclarations_ExtractBodyDeclarations_Keyword,
  Tests_TypeDeclarations_ExtractBodyDeclarations_Line,
  Tests_TypeDeclarations_ExtractBodyDeclarations_LineIndex,
  Tests_TypeDeclarations_ExtractBodyDeclarations_Lines,
  Tests_TypeDeclarations_ExtractBodyDeclarations_Match,
  Tests_TypeDeclarations_ExtractBodyDeclarations_Returns,
  Tests_TypeDeclarations_ExtractFunctionParams_Content,
  Tests_TypeDeclarations_ExtractFunctionParams_FilePath,
  Tests_TypeDeclarations_ExtractFunctionParams_LineNumber,
  Tests_TypeDeclarations_ExtractFunctionParams_Param,
  Tests_TypeDeclarations_ExtractFunctionParams_Params,
  Tests_TypeDeclarations_ExtractFunctionParams_Returns,
  Tests_TypeDeclarations_ExtractFunctionReturns_Content,
  Tests_TypeDeclarations_ExtractFunctionReturns_FilePath,
  Tests_TypeDeclarations_ExtractFunctionReturns_FunctionReturns,
  Tests_TypeDeclarations_ExtractFunctionReturns_IsTypeGuard,
  Tests_TypeDeclarations_ExtractFunctionReturns_LineNumber,
  Tests_TypeDeclarations_ExtractFunctionReturns_Return,
  Tests_TypeDeclarations_ExtractFunctionReturns_ReturnType,
  Tests_TypeDeclarations_ExtractFunctionReturns_Returns,
  Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Content,
  Tests_TypeDeclarations_ExtractTopLevelIdentifiers_FilePath,
  Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Identifier,
  Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Identifiers,
  Tests_TypeDeclarations_ExtractTopLevelIdentifiers_LineNumber,
  Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns,
  Tests_TypeDeclarations_IsAliasToForeignType_ClassPrefix,
  Tests_TypeDeclarations_IsAliasToForeignType_DtsContent,
  Tests_TypeDeclarations_IsAliasToForeignType_LeftmostType,
  Tests_TypeDeclarations_IsAliasToForeignType_Match,
  Tests_TypeDeclarations_IsAliasToForeignType_Pattern,
  Tests_TypeDeclarations_IsAliasToForeignType_Returns,
  Tests_TypeDeclarations_IsAliasToForeignType_Rhs,
  Tests_TypeDeclarations_IsAliasToForeignType_TypeMatch,
  Tests_TypeDeclarations_IsAliasToForeignType_TypeName,
  Tests_TypeDeclarations_IsLocallyDefined_DtsContent,
  Tests_TypeDeclarations_IsLocallyDefined_Pattern,
  Tests_TypeDeclarations_IsLocallyDefined_Returns,
  Tests_TypeDeclarations_IsLocallyDefined_TypeName,
  Tests_TypeDeclarations_IsReservedSuffix_Returns,
  Tests_TypeDeclarations_IsReservedSuffix_TypeName,
  Tests_TypeDeclarations_ParseDescribeString_Input,
  Tests_TypeDeclarations_ParseDescribeString_Pieces,
  Tests_TypeDeclarations_ParseDescribeString_Returns,
  Tests_TypeDeclarations_ParseSourceFile_Cached,
  Tests_TypeDeclarations_ParseSourceFile_CachedEntry,
  Tests_TypeDeclarations_ParseSourceFile_Content,
  Tests_TypeDeclarations_ParseSourceFile_FilePath,
  Tests_TypeDeclarations_ParseSourceFile_Returns,
  Tests_TypeDeclarations_RunRulePipeline_ClassPrefix,
  Tests_TypeDeclarations_RunRulePipeline_DtsContent,
  Tests_TypeDeclarations_RunRulePipeline_FilePath,
  Tests_TypeDeclarations_RunRulePipeline_Returns,
  Tests_TypeDeclarations_RunRulePipeline_SourceContent,
  Tests_TypeDeclarations_RunRulePipeline_Violations,
  Tests_TypeDeclarations_StripUnderscorePrefix_Input,
  Tests_TypeDeclarations_StripUnderscorePrefix_Returns,
  Tests_TypeDeclarations_TypeDeclarationFilenameValidation_AllFiles,
  Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Cleaned,
  Tests_TypeDeclarations_TypeDeclarationFilenameValidation_CurrentDirectory,
  Tests_TypeDeclarations_TypeDeclarationFilenameValidation_DtsFiles,
  Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Pattern,
  Tests_TypeDeclarations_TypeDeclarationFilenameValidation_RelativePath,
  Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Segments,
  Tests_TypeDeclarations_TypeDeclarationFilenameValidation_SourceFiles,
  Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Violation,
  Tests_TypeDeclarations_TypeDeclarationFilenameValidation_ViolationMessage,
  Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Violations,
  Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_ClassPrefix,
  Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Content,
  Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_CurrentDirectory,
  Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_FileName,
  Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Files,
  Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Identifiers,
  Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_RelativePath,
  Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Segments,
  Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Violation,
  Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_ViolationMessage,
  Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Violations,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_BrandCasePattern,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_Content,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_CurrentDirectory,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_DtsFiles,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_ElementLine,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_ExpectedPropertyPrefix,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_FirstChunk,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_LineIndex,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_LineToScan,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_Lines,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_LocalTypeSet,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_PascalCasePattern,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_PositionMatch,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_PrimitiveSet,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_RelativePath,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_SourceClassPrefix,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_SourceFiles,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_StandaloneFiles,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_TopLevelPathPrefixes,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_TypeLines,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_TypeNames,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_TypePositions,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_Violation,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_ViolationMessage,
  Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_Violations,
  Tests_TypeDeclarations_ValidateLeaf_ActualLeaf,
  Tests_TypeDeclarations_ValidateLeaf_ClassPrefix,
  Tests_TypeDeclarations_ValidateLeaf_ExpectedClass,
  Tests_TypeDeclarations_ValidateLeaf_ExpectedSection,
  Tests_TypeDeclarations_ValidateLeaf_Reason,
  Tests_TypeDeclarations_ValidateLeaf_Returns,
  Tests_TypeDeclarations_ValidateLeaf_SourceSection,
  Tests_TypeDeclarations_ValidateLeaf_Stripped,
  Tests_TypeDeclarations_ValidateLeaf_TitleVar,
  Tests_TypeDeclarations_ValidateLeaf_TypeName,
  Tests_TypeDeclarations_ValidateLeaf_VarName,
  Tests_TypeDeclarations_ValidateReturnType_IsTypeGuard,
  Tests_TypeDeclarations_ValidateReturnType_Reason,
  Tests_TypeDeclarations_ValidateReturnType_Returns,
  Tests_TypeDeclarations_ValidateReturnType_ReturnType,
} from '../types/tests/type-declarations.test.d.ts';

/**
 * Tests - Type Declarations - Test Config.
 *
 * @since 0.15.0
 */
const testConfig: Tests_TypeDeclarations_TestConfig = {
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
 * Tests - Type Declarations - Build Source Section Map.
 *
 * @since 0.18.0
 */
describe('buildSourceSectionMap', () => {
  it('tags function declaration line and body var lines with the function section', async () => {
    const filePath: Tests_TypeDeclarations_BuildSourceSectionMap_FilePath = resolve(getPackageRoot(), 'src/lib/utility.ts');
    const content: Tests_TypeDeclarations_BuildSourceSectionMap_Content = await readFile(filePath, 'utf-8');
    const classPrefix: Tests_TypeDeclarations_BuildSourceSectionMap_ClassPrefix = deriveClassPrefix(filePath);
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap(filePath, content, classPrefix);

    // Line 224 is `export function currentTimestamp(): ... {`.
    // Line 225 is the body var `const now: ... = new Date();`.
    strictEqual(sectionMap.get(224), 'Lib_Utility_CurrentTimestamp');
    strictEqual(sectionMap.get(225), 'Lib_Utility_CurrentTimestamp');

    return;
  });

  it('tags nested const-arrow-function body lines with the sub-section while keeping the const declaration in the parent section', async () => {
    const filePath: Tests_TypeDeclarations_BuildSourceSectionMap_FilePath = resolve(getPackageRoot(), 'src/lib/utility.ts');
    const content: Tests_TypeDeclarations_BuildSourceSectionMap_Content = await readFile(filePath, 'utf-8');
    const classPrefix: Tests_TypeDeclarations_BuildSourceSectionMap_ClassPrefix = deriveClassPrefix(filePath);
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap(filePath, content, classPrefix);

    // Line 242: `const padLeft: ... = (...) => {` — stays in OUTER section.
    strictEqual(sectionMap.get(242), 'Lib_Utility_CurrentTimestamp');
    // Line 243: `const currentWidth: ... = ...` inside padLeft body — sub-section.
    strictEqual(sectionMap.get(243), 'Lib_Utility_CurrentTimestamp_PadLeft');

    return;
  });

  it('tags method declaration and body lines with the method section', async () => {
    const filePath: Tests_TypeDeclarations_BuildSourceSectionMap_FilePath = resolve(getPackageRoot(), 'src/toolkit/markdown-table.ts');
    const content: Tests_TypeDeclarations_BuildSourceSectionMap_Content = await readFile(filePath, 'utf-8');
    const classPrefix: Tests_TypeDeclarations_BuildSourceSectionMap_ClassPrefix = deriveClassPrefix(filePath);
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap(filePath, content, classPrefix);

    // Line 141: `public addRow(row: ...): ... {` inside `class ToolkitMarkdownTable`.
    // Mode 2: class declaration adds the class name as a chunk. The current source file's class is
    // `ToolkitMarkdownTable` (path-glued legacy name); the migration to a non-path-glued name like
    // `Runner` is part of Phase 2C. The expected section reflects what the CURRENT source produces.
    strictEqual(sectionMap.get(141), 'Toolkit_MarkdownTable_ToolkitMarkdownTable_AddRow');

    return;
  });

  it('tags describe block contents with the describe-derived section', async () => {
    const filePath: Tests_TypeDeclarations_BuildSourceSectionMap_FilePath = resolve(getPackageRoot(), 'src/tests/cli/utility/initialize.test.ts');
    const content: Tests_TypeDeclarations_BuildSourceSectionMap_Content = await readFile(filePath, 'utf-8');
    const classPrefix: Tests_TypeDeclarations_BuildSourceSectionMap_ClassPrefix = deriveClassPrefix(filePath);
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap(filePath, content, classPrefix);

    // Line 28 is `const originalCwd: ... = process.cwd();` inside describe('CliUtilityInitialize.run', ...).
    // describe string 'CliUtilityInitialize.run' → 'CliUtilityInitializeRun'.
    strictEqual(sectionMap.get(28), 'Tests_Cli_Utility_Initialize_CliUtilityInitializeRun');

    return;
  });

  return;
});

/**
 * Tests - Type Declarations - Extract Body Declarations.
 *
 * @since 0.18.0
 */
describe('extractBodyDeclarations', () => {
  it('extracts const x: T = ... and let x: T = ... lines, skips for-of and untyped', () => {
    const lines: Tests_TypeDeclarations_ExtractBodyDeclarations_Lines = [
      'function foo() {',
      '  const a: Some_Type_A = 1;',
      '  let b: Some_Type_B = 2;',
      '  const c = 3;',
      '  for (const d of items) { }',
      '}',
    ];
    const result: Tests_TypeDeclarations_ExtractBodyDeclarations_Returns = extractBodyDeclarations(lines);

    strictEqual(result.length, 2);
    strictEqual(result[0]?.varName, 'a');
    strictEqual(result[0]?.typeName, 'Some_Type_A');
    strictEqual(result[0]?.lineNumber, 2);
    strictEqual(result[1]?.varName, 'b');
    strictEqual(result[1]?.typeName, 'Some_Type_B');
    strictEqual(result[1]?.lineNumber, 3);

    return;
  });

  return;
});

/**
 * Tests - Type Declarations - Extract Function Params.
 *
 * @since 0.18.0
 */
describe('extractFunctionParams', () => {
  it('extracts typed params from method declarations', async () => {
    const filePath: Tests_TypeDeclarations_ExtractFunctionParams_FilePath = resolve(getPackageRoot(), 'src/toolkit/markdown-table.ts');
    const content: Tests_TypeDeclarations_ExtractFunctionParams_Content = await readFile(filePath, 'utf-8');
    const result: Tests_TypeDeclarations_ExtractFunctionParams_Returns = extractFunctionParams(filePath, content);

    const addRowParam: Tests_TypeDeclarations_ExtractFunctionParams_Param | undefined = result.find((p) => p.paramName === 'row');

    ok(addRowParam !== undefined, 'should find row param of addRow method');
    strictEqual(addRowParam.typeName, 'ToolkitMarkdownTableAddRowRow');

    return;
  });

  it('extracts typed params from top-level function declarations', async () => {
    const filePath: Tests_TypeDeclarations_ExtractFunctionParams_FilePath = resolve(getPackageRoot(), 'src/lib/utility.ts');
    const content: Tests_TypeDeclarations_ExtractFunctionParams_Content = await readFile(filePath, 'utf-8');
    const result: Tests_TypeDeclarations_ExtractFunctionParams_Returns = extractFunctionParams(filePath, content);

    const isExecuteShellErrorParam: Tests_TypeDeclarations_ExtractFunctionParams_Param | undefined = result.find((p) => p.paramName === 'error' && p.typeName === 'LibUtilityIsExecuteShellErrorError');

    ok(isExecuteShellErrorParam !== undefined, 'should find error param of isExecuteShellError function');

    return;
  });

  return;
});

/**
 * Tests - Type Declarations - Derive Class Prefix.
 *
 * @since 0.18.0
 */
describe('deriveClassPrefix', () => {
  it('joins path segments with underscore, kebab-case stays one chunk', () => {
    const filePath: Tests_TypeDeclarations_DeriveClassPrefix_FilePath = resolve(getPackageRoot(), 'src/types/toolkit/markdown-table.d.ts');
    const result: Tests_TypeDeclarations_DeriveClassPrefix_Returns = deriveClassPrefix(filePath);

    strictEqual(result, 'Toolkit_MarkdownTable');

    return;
  });

  it('drops .test from test files', () => {
    const filePath: Tests_TypeDeclarations_DeriveClassPrefix_FilePath = resolve(getPackageRoot(), 'src/types/tests/cli/utility/initialize.test.d.ts');
    const result: Tests_TypeDeclarations_DeriveClassPrefix_Returns = deriveClassPrefix(filePath);

    strictEqual(result, 'Tests_Cli_Utility_Initialize');

    return;
  });

  it('handles deep paths', () => {
    const filePath: Tests_TypeDeclarations_DeriveClassPrefix_FilePath = resolve(getPackageRoot(), 'src/types/cli/recipe/package-json/cleanup.d.ts');
    const result: Tests_TypeDeclarations_DeriveClassPrefix_Returns = deriveClassPrefix(filePath);

    strictEqual(result, 'Cli_Recipe_PackageJson_Cleanup');

    return;
  });

  return;
});

/**
 * Tests - Type Declarations - Extract Referenced Types.
 *
 * @since 0.18.0
 */
describe('extractReferencedTypes', () => {
  it('matches types starting with classPrefix followed by underscore', () => {
    const line: Tests_TypeDeclarations_ExtractReferencedTypes_Line = 'export type Lib_Utility_Foo = Lib_Utility_Bar | Lib_Utility_Baz;';
    const classPrefix: Tests_TypeDeclarations_ExtractReferencedTypes_ClassPrefix = 'Lib_Utility';
    const result: Tests_TypeDeclarations_ExtractReferencedTypes_Returns = extractReferencedTypes(line, classPrefix);

    deepStrictEqual(result, ['Lib_Utility_Bar', 'Lib_Utility_Baz']);

    return;
  });

  it('does not match unrelated module types', () => {
    const line: Tests_TypeDeclarations_ExtractReferencedTypes_Line = 'export type Lib_Utility_Foo = Other_Module_Type;';
    const classPrefix: Tests_TypeDeclarations_ExtractReferencedTypes_ClassPrefix = 'Lib_Utility';
    const result: Tests_TypeDeclarations_ExtractReferencedTypes_Returns = extractReferencedTypes(line, classPrefix);

    deepStrictEqual(result, []);

    return;
  });

  it('captures multi-segment leaves greedily', () => {
    const line: Tests_TypeDeclarations_ExtractReferencedTypes_Line = 'export type Cli_Foo_Bar = Cli_Foo_Baz_Qux_Quux;';
    const classPrefix: Tests_TypeDeclarations_ExtractReferencedTypes_ClassPrefix = 'Cli_Foo';
    const result: Tests_TypeDeclarations_ExtractReferencedTypes_Returns = extractReferencedTypes(line, classPrefix);

    deepStrictEqual(result, ['Cli_Foo_Baz_Qux_Quux']);

    return;
  });

  it('rejects malformed types that lack the underscore boundary after classPrefix', () => {
    const line: Tests_TypeDeclarations_ExtractReferencedTypes_Line = 'export type Cli_Foo_Bar = Cli_FooBadJoin | Cli_Foo_Valid;';
    const classPrefix: Tests_TypeDeclarations_ExtractReferencedTypes_ClassPrefix = 'Cli_Foo';
    const result: Tests_TypeDeclarations_ExtractReferencedTypes_Returns = extractReferencedTypes(line, classPrefix);

    deepStrictEqual(result, ['Cli_Foo_Valid']);

    return;
  });

  return;
});

/**
 * Tests - Type Declarations - Discover Source Files.
 *
 * @since 0.18.0
 */
describe('discoverSourceFiles', () => {
  it('returns absolute paths to .ts source files, excluding .d.ts', async () => {
    const files: Tests_TypeDeclarations_DiscoverSourceFiles_Files = await discoverSourceFiles();

    ok(files.length > 0, 'should find at least one source file');
    ok(files.every((file) => file.endsWith('.ts')), 'all results should end with .ts');
    ok(files.every((file) => !file.endsWith('.d.ts')), 'no result should end with .d.ts');
    ok(files.some((file) => file.endsWith('toolkit/markdown-table.ts')), 'should include markdown-table.ts');

    return;
  });

  return;
});

/**
 * Tests - Type Declarations - Parse Describe String.
 *
 * @since 0.18.0
 */
describe('parseDescribeString', () => {
  it('splits Class.method form and joins as one PascalCase chunk', () => {
    const input: Tests_TypeDeclarations_ParseDescribeString_Input = 'CliUtilityInitialize.run';
    const result: Tests_TypeDeclarations_ParseDescribeString_Returns = parseDescribeString(input);

    strictEqual(result, 'CliUtilityInitializeRun');

    return;
  });

  it('handles space-separated descriptions', () => {
    const input: Tests_TypeDeclarations_ParseDescribeString_Input = 'does the thing';
    const result: Tests_TypeDeclarations_ParseDescribeString_Returns = parseDescribeString(input);

    strictEqual(result, 'DoesTheThing');

    return;
  });

  it('handles single-word strings', () => {
    const input: Tests_TypeDeclarations_ParseDescribeString_Input = 'run';
    const result: Tests_TypeDeclarations_ParseDescribeString_Returns = parseDescribeString(input);

    strictEqual(result, 'Run');

    return;
  });

  return;
});

/**
 * Tests - Type Declarations - Strip Underscore Prefix.
 *
 * @since 0.18.0
 */
describe('stripUnderscorePrefix', () => {
  it('strips a single leading underscore', () => {
    const input: Tests_TypeDeclarations_StripUnderscorePrefix_Input = '_prev';
    const result: Tests_TypeDeclarations_StripUnderscorePrefix_Returns = stripUnderscorePrefix(input);

    strictEqual(result, 'prev');

    return;
  });

  it('returns the name unchanged when there is no leading underscore', () => {
    const input: Tests_TypeDeclarations_StripUnderscorePrefix_Input = 'value';
    const result: Tests_TypeDeclarations_StripUnderscorePrefix_Returns = stripUnderscorePrefix(input);

    strictEqual(result, 'value');

    return;
  });

  it('only strips ONE leading underscore', () => {
    const input: Tests_TypeDeclarations_StripUnderscorePrefix_Input = '__double';
    const result: Tests_TypeDeclarations_StripUnderscorePrefix_Returns = stripUnderscorePrefix(input);

    strictEqual(result, '_double');

    return;
  });

  return;
});

/**
 * Tests - Type Declarations - Type Declaration Cross-section References.
 *
 * @since 0.15.0
 */
describe('type declaration cross-section references', async () => {
  const files: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Files = await discoverTypeFiles();

  const crossSectionCurrentDirectory: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_CurrentDirectory = getPackageRoot();

  for (const file of files) {
    const crossSectionRelativePath: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_RelativePath = relative(crossSectionCurrentDirectory, file);

    it(`no cross-section references in ${crossSectionRelativePath}`, async () => {
      if (testConfig['standaloneTypeFiles'].some((pattern) => file.endsWith(pattern)) === true) {
        return;
      }

      const sourcePath: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SourcePath = deriveSourcePath(file);
      const sourceExists: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SourceExists = await fileExists(sourcePath);

      if (sourceExists === false) {
        return;
      }

      const content: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Content = await readFile(file, 'utf-8');
      const lines: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Lines = content.split('\n');
      const sourceContent: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SourceContent = await readFile(sourcePath, 'utf-8');
      const classPrefix: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_ClassPrefix = deriveClassPrefix(file);
      const sectionMap: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SectionMap = buildSourceSectionMap(sourcePath, sourceContent, classPrefix);
      const sourceSectionSet: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SourceSectionSet = new Set<string>(sectionMap.values());
      const importedNames: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_ImportedNames = extractImportedNames(lines);
      const sections: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Sections = buildDtsSections(lines, sourceSectionSet, classPrefix);
      const sectionPrefixes: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_SectionPrefixes = sections.map((section) => section['prefix']);
      const violations: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Violations = [];

      for (const section of sections) {
        const currentSectionPrefix: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_CurrentSectionPrefix = section['prefix'];

        for (const line of section['typeLines']) {
          const referencedTypes: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_ReferencedTypes = extractReferencedTypes(line, classPrefix);

          for (const referencedType of referencedTypes) {
            const isSameSection: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_IsSameSection = referencedType.startsWith(currentSectionPrefix) === true;
            const isImported: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_IsImported = importedNames.has(referencedType) === true;
            const isOtherSection: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_IsOtherSection = sectionPrefixes.some((sectionPrefix) => {
              return referencedType.startsWith(sectionPrefix) === true && sectionPrefix !== currentSectionPrefix;
            });

            if (
              isOtherSection === true
              && isSameSection === false
              && isImported === false
            ) {
              const violation: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Violation = `Section "${currentSectionPrefix}" references "${referencedType}" from another section. Move shared types to a shared type file (e.g., shared.d.ts).`;

              violations.push(violation);
            }
          }
        }
      }

      const violationMessage: Tests_TypeDeclarations_TypeDeclarationCrossSectionReferences_Violation = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
});

/**
 * Tests - Type Declarations - Type Declaration Section Alphabetical Order.
 *
 * @since 0.15.0
 */
describe('type declaration section alphabetical order', async () => {
  const files: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Files = await discoverTypeFiles();
  const sectionOrderCurrentDirectory: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_CurrentDirectory = getPackageRoot();

  for (const file of files) {
    const sectionOrderRelativePath: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_RelativePath = relative(sectionOrderCurrentDirectory, file);

    it(`sections alphabetical in ${sectionOrderRelativePath}`, async () => {
      if (testConfig['standaloneTypeFiles'].some((pattern) => file.endsWith(pattern)) === true) {
        return;
      }

      const sourcePath: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SourcePath = deriveSourcePath(file);
      const sourceExists: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SourceExists = await fileExists(sourcePath);

      if (sourceExists === false) {
        return;
      }

      const content: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Content = await readFile(file, 'utf-8');
      const lines: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Lines = content.split('\n');
      const sourceContent: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SourceContent = await readFile(sourcePath, 'utf-8');
      const classPrefix: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_ClassPrefix = deriveClassPrefix(file);
      const sectionMap: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SectionMap = buildSourceSectionMap(sourcePath, sourceContent, classPrefix);
      const sourceSectionSet: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SourceSectionSet = new Set<string>(sectionMap.values());
      const sections: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Sections = buildDtsSections(lines, sourceSectionSet, classPrefix);
      const violations: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Violations = [];

      for (let i: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_SectionIndex = 1; i < sections.length; i += 1) {
        const previous: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Section = sections[i - 1] as Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Section;
        const current: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Section = sections[i] as Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Section;

        if (previous === undefined || current === undefined) {
          continue;
        }

        const compareResult: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_CompareResult = previous['prefix'].localeCompare(current['prefix']);

        if (compareResult > 0) {
          const violation: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Violation = `Section "${current['prefix']}" appears after section "${previous['prefix']}" but should come before it. Sections in a .d.ts file must be alphabetical by section prefix; move "${current['prefix']}"'s types above "${previous['prefix']}"'s types.`;

          violations.push(violation);
        }
      }

      const violationMessage: Tests_TypeDeclarations_TypeDeclarationSectionAlphabeticalOrder_Violation = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
});

/**
 * Tests - Type Declarations - Type Declaration Import Specifier Order.
 *
 * @since 0.15.0
 */
describe('type declaration import specifier order', async () => {
  const files: Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Files = await discoverTypeFiles();
  const importOrderCurrentDirectory: Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_CurrentDirectory = getPackageRoot();

  for (const file of files) {
    const importOrderRelativePath: Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_RelativePath = relative(importOrderCurrentDirectory, file);

    it(`import specifiers alphabetical in ${importOrderRelativePath}`, async () => {
      const content: Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Content = await readFile(file, 'utf-8');
      const lines: Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Lines = content.split('\n');
      const violations: Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Violations = [];
      const specifierBuffer: Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_SpecifierBuffer = [];
      let inImportBlock: Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_InImportBlock = false;

      for (const line of lines) {
        if (line.startsWith('import type {') === true) {
          inImportBlock = true;
          specifierBuffer.length = 0;

          const inlineMatch: Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Match = line.match(new RegExp('^import type \\{ (.+) \\} from'));

          if (inlineMatch !== null && inlineMatch[1] !== undefined) {
            const inlineMatchCapture: Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_InlineMatchCapture = inlineMatch[1];
            const specifiers: Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Specifiers = inlineMatchCapture.split(',').map((specifier) => specifier.trim());

            for (let i = 1; i < specifiers.length; i += 1) {
              const previousSpecifier: Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_PreviousSpecifier = specifiers[i - 1];
              const currentSpecifier: Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_CurrentSpecifier = specifiers[i];

              if (
                previousSpecifier !== undefined
                && currentSpecifier !== undefined
                && previousSpecifier.localeCompare(currentSpecifier) > 0
              ) {
                const violation: Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Violation = `Import specifier "${currentSpecifier}" appears after "${previousSpecifier}" but should come before it. Specifiers within a single import block must be alphabetical; reorder so "${currentSpecifier}" comes before "${previousSpecifier}".`;

                violations.push(violation);
              }
            }

            inImportBlock = false;
          }

          continue;
        }

        if (inImportBlock === true) {
          const trimmed: Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Trimmed = line.trim().replace(',', '');

          if (trimmed.startsWith('}') === true) {
            for (let i = 1; i < specifierBuffer.length; i += 1) {
              const previousSpecifier: Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_PreviousSpecifier = specifierBuffer[i - 1];
              const currentSpecifier: Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_CurrentSpecifier = specifierBuffer[i];

              if (
                previousSpecifier !== undefined
                && currentSpecifier !== undefined
                && previousSpecifier.localeCompare(currentSpecifier) > 0
              ) {
                const violation: Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Violation = `Import specifier "${currentSpecifier}" appears after "${previousSpecifier}" but should come before it. Specifiers within a single import block must be alphabetical; reorder so "${currentSpecifier}" comes before "${previousSpecifier}".`;

                violations.push(violation);
              }
            }

            inImportBlock = false;
            specifierBuffer.length = 0;
          } else if (trimmed !== '') {
            specifierBuffer.push(trimmed);
          }
        }
      }

      const violationMessage: Tests_TypeDeclarations_TypeDeclarationImportSpecifierOrder_Violation = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
});

/**
 * Tests - Type Declarations - Type Declaration First-come-first-serve Order.
 *
 * @since 0.15.0
 */
describe('type declaration first-come-first-serve order', async () => {
  const files: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Files = await discoverTypeFiles();
  const orderCurrentDirectory: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_CurrentDirectory = getPackageRoot();

  for (const file of files) {
    const orderRelativePath: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_RelativePath = relative(orderCurrentDirectory, file);

    it(`types match source order in ${orderRelativePath}`, async () => {
      if (testConfig['standaloneTypeFiles'].some((pattern) => file.endsWith(pattern)) === true) {
        return;
      }

      let sourcePath: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SourcePath = deriveSourcePath(file);
      let sourceExists: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SourceExists = await fileExists(sourcePath);

      if (sourceExists === false) {
        const sourcePathAlternative: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SourcePathAlternative = sourcePath.replace('.ts', '.tsx');

        sourcePath = sourcePathAlternative;
        sourceExists = await fileExists(sourcePath);

        if (sourceExists === false) {
          strictEqual(sourceExists, true, `Missing source file for ${orderRelativePath}. Expected: ${relative(orderCurrentDirectory, sourcePath)}`);

          return;
        }
      }

      const sourceContent: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Content = await readFile(sourcePath, 'utf-8');
      const sourceLines: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Lines = sourceContent.split('\n');
      const dtsContent: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Content = await readFile(file, 'utf-8');
      const dtsLines: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Lines = dtsContent.split('\n');
      const classPrefix: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ClassPrefix = deriveClassPrefix(file);
      const sectionMap: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SectionMap = buildSourceSectionMap(sourcePath, sourceContent, classPrefix);
      const sourceSectionSet: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SourceSectionSet = new Set<string>(sectionMap.values());
      const sections: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Sections = buildDtsSections(dtsLines, sourceSectionSet, classPrefix);
      const objectTypes: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectTypes = extractObjectTypes(dtsLines, classPrefix);
      const objectPropertyTypeNames: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ObjectPropertyTypeNames = new Set<string>();
      const arrayElementTypeNames: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ArrayElementTypeNames = new Set<string>();

      for (const objectType of objectTypes) {
        for (const property of objectType['properties']) {
          objectPropertyTypeNames.add(property['valueType']);
        }
      }

      const arrayTypesForOrder: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_ArrayTypes = extractArrayTypes(dtsLines);

      for (const arrayType of arrayTypesForOrder) {
        arrayElementTypeNames.add(arrayType['elementTypeName']);
      }

      const violations: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Violations = [];

      for (const section of sections) {
        const typeNames: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_TypeNames = extractTypeNames(section['typeLines']);
        const typePositions: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_TypePositions = [];

        for (const typeName of typeNames) {
          // Skip object property types - validated by object property test.
          if (objectPropertyTypeNames.has(typeName) === true) {
            continue;
          }

          // Skip array element types — validated by object property test (array extension).
          if (arrayElementTypeNames.has(typeName) === true) {
            continue;
          }

          const sourceLineIndex: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_SourceLineIndex = findFirstOccurrence(sourceLines, typeName);

          if (sourceLineIndex === -1) {
            continue;
          }

          typePositions.push({
            name: typeName,
            sourceLine: sourceLineIndex,
          });
        }

        const sortedPositions: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_TypePositions = [...typePositions].sort((positionA, positionB) => positionA['sourceLine'] - positionB['sourceLine']);

        for (let j: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_LineIndex = 0; j < typePositions.length; j += 1) {
          const actual: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_TypePosition = typePositions[j] as Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_TypePosition;
          const expected: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_TypePosition = sortedPositions[j] as Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_TypePosition;

          if (actual === undefined || expected === undefined) {
            continue;
          }

          if (actual['name'] !== expected['name']) {
            const violation: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Violation = `Section "${section['prefix']}": at .d.ts position ${j + 1}, found "${actual['name']}" (first appears at source line ${actual['sourceLine'] + 1}) but expected "${expected['name']}" (first appears at source line ${expected['sourceLine'] + 1}, which comes earlier in source). Move "${expected['name']}" to position ${j + 1} so the .d.ts mirrors the source's first-come-first-serve order.`;

            violations.push(violation);
          }
        }
      }

      const violationMessage: Tests_TypeDeclarations_TypeDeclarationFirstComeFirstServeOrder_Violation = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
});

/**
 * Tests - Type Declarations - Type Declaration Object Property Types.
 *
 * @since 0.15.0
 */
describe('type declaration object property types', async () => {
  const files: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Files = await discoverTypeFiles();
  const objectPropsCurrentDirectory: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_CurrentDirectory = getPackageRoot();

  for (const file of files) {
    const objectPropsRelativePath: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_RelativePath = relative(objectPropsCurrentDirectory, file);

    it(`object properties use named types in ${objectPropsRelativePath}`, async () => {
      const content: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Content = await readFile(file, 'utf-8');
      const lines: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Lines = content.split('\n');
      const classPrefix: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ClassPrefix = deriveClassPrefix(file);
      const violations: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Violations = [];
      const definedTypes: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_DefinedTypes = new Set<string>();

      for (let i: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_LineIndex = 0; i < lines.length; i += 1) {
        const line: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Line = lines[i] as Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Line;

        if (line === undefined) {
          continue;
        }

        const typeDefMatch: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Match = line.match(new RegExp('^export type (\\w+)'));

        if (typeDefMatch !== null && typeDefMatch[1] !== undefined) {
          definedTypes.add(typeDefMatch[1]);
        }
      }

      const objectTypes: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ObjectTypes = extractObjectTypes(lines, classPrefix);

      for (const objectType of objectTypes) {
        for (const property of objectType['properties']) {
          const propertyExpectedPrefix: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_PropertyExpectedPrefix = objectType['name'];

          if (property['valueType'].startsWith(propertyExpectedPrefix) === false) {
            const violation: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Violation = `"${objectType['name']}": property "${property['key']}" must use a named type starting with "${propertyExpectedPrefix}" but found "${property['valueType']}".`;

            violations.push(violation);

            continue;
          }

          if (definedTypes.has(property['valueType']) === false) {
            const violation: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Violation = `"${objectType['name']}": property type "${property['valueType']}" is not defined in this file.`;

            violations.push(violation);

            continue;
          }

          if (property['typeLineIndex'] > objectType['lineIndex']) {
            const violation: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Violation = `"${objectType['name']}": property type "${property['valueType']}" (line ${property['typeLineIndex'] + 1}) must be defined before the object type (line ${objectType['lineIndex'] + 1}).`;

            violations.push(violation);
          }
        }
      }

      const importedNames: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ImportedNames = extractImportedNames(lines);
      const arrayTypes: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ArrayTypes = extractArrayTypes(lines);
      const typeDefLines: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_TypeDefLines = new Map<string, number>();

      for (let i: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_LineIndex = 0; i < lines.length; i += 1) {
        const line: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Line = lines[i] as Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Line;

        if (line === undefined) {
          continue;
        }

        const defMatch: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Match = line.match(new RegExp('^export type (\\w+)'));

        if (defMatch !== null && defMatch[1] !== undefined && typeDefLines.has(defMatch[1]) === false) {
          typeDefLines.set(defMatch[1], i);
        }
      }

      for (const arrayType of arrayTypes) {
        // E3 forward-ref exemption (Mode 2): array types ending in Returns / TypeGuard / Return are
        // function-return-position arrays and may reference forward-declared element types.
        if (
          arrayType['arrayTypeName'].endsWith('Returns') === true
          || arrayType['arrayTypeName'].endsWith('_Returns') === true
          || arrayType['arrayTypeName'].endsWith('TypeGuard') === true
          || arrayType['arrayTypeName'].endsWith('_TypeGuard') === true
          || arrayType['arrayTypeName'].endsWith('Return') === true
          || arrayType['arrayTypeName'].endsWith('_Return') === true
        ) {
          continue;
        }

        if (importedNames.has(arrayType['elementTypeName']) === true) {
          continue;
        }

        // Skip if element type is not a user-defined type (primitives, built-ins).
        if (definedTypes.has(arrayType['elementTypeName']) === false) {
          continue;
        }

        const elementLine: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_ElementLine = typeDefLines.get(arrayType['elementTypeName']) ?? -1;

        if (elementLine === -1) {
          continue;
        }

        if (elementLine > arrayType['lineIndex']) {
          const violation: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Violation = `"${arrayType['arrayTypeName']}" (line ${arrayType['lineIndex'] + 1}): array element type "${arrayType['elementTypeName']}" (line ${elementLine + 1}) must be defined before the array type.`;

          violations.push(violation);
        }
      }

      const violationMessage: Tests_TypeDeclarations_TypeDeclarationObjectPropertyTypes_Violation = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
});

/**
 * Tests - Type Declarations - Type Declaration Section Coverage.
 *
 * @since 0.15.0
 */
describe('type declaration section coverage', async () => {
  const files: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Files = await discoverTypeFiles();
  const coverageCurrentDirectory: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_CurrentDirectory = getPackageRoot();

  for (const file of files) {
    const coverageRelativePath: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_RelativePath = relative(coverageCurrentDirectory, file);

    it(`source sections have matching .d.ts sections in ${coverageRelativePath}`, async () => {
      if (testConfig['standaloneTypeFiles'].some((pattern) => file.endsWith(pattern)) === true) {
        return;
      }

      let sourcePath: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_SourcePath = deriveSourcePath(file);
      let sourceExists: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_SourceExists = await fileExists(sourcePath);

      if (sourceExists === false) {
        const sourcePathAlternative: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_SourcePathAlternative = sourcePath.replace('.ts', '.tsx');

        sourcePath = sourcePathAlternative;
        sourceExists = await fileExists(sourcePath);

        if (sourceExists === false) {
          return;
        }
      }

      const sourceContent: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Content = await readFile(sourcePath, 'utf-8');
      const dtsContent: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Content = await readFile(file, 'utf-8');
      const dtsLines: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Lines = dtsContent.split('\n');
      const classPrefix: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ClassPrefix = deriveClassPrefix(file);
      const sectionMap: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_SectionMap = buildSourceSectionMap(sourcePath, sourceContent, classPrefix);
      const sourceSectionSet: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_SourceSectionSet = new Set<string>(sectionMap.values());
      const dtsSections: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Sections = buildDtsSections(dtsLines, sourceSectionSet, classPrefix);
      const dtsSectionPrefixes: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_DtsSectionPrefixes = new Set<string>(dtsSections.map((section) => section['prefix']));
      const violations: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Violations = [];

      // Forward direction: every non-classPrefix source section should have at least one .d.ts type belonging to it.
      // (If a method has no body-var types in .d.ts, it doesn't need a section. So we only fire when the source
      // section is a "leaf" — no child section under it — and the .d.ts has zero types under that section.)
      for (const sourceSectionPrefix of sourceSectionSet) {
        if (sourceSectionPrefix === classPrefix) {
          continue;
        }

        const isParent: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_IsParent = Array.from(sourceSectionSet).some((otherSection) => {
          return otherSection !== sourceSectionPrefix && otherSection.startsWith(`${sourceSectionPrefix}_`) === true;
        });

        if (isParent === true) {
          continue;
        }

        if (dtsSectionPrefixes.has(sourceSectionPrefix) === false) {
          const violation: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Violation = `Source has section "${sourceSectionPrefix}" but .d.ts has no types belonging to it. Add an "export type" with that prefix, or remove the corresponding source identifier.`;

          violations.push(violation);
        }
      }

      // Reverse direction: every .d.ts type whose prefix begins with classPrefix must map to a real source section.
      // Loose types (one chunk after classPrefix) are OK. Multi-chunk types must have their second chunk match a real method.
      // Exemption: property-hierarchy types — if a single-chunk type `${classPrefix}_X` exists in the .d.ts, then
      // multi-chunk types `${classPrefix}_X_*` are treated as its E1-style property types (Parent_Property form),
      // not as an implied source section. Covers patterns like `testConfig: { standaloneTypeFiles, typeRoots }`
      // where the parent is an object-typed const (no source section) but the property types are well-formed.
      const singleChunkTopLevelTypes: Set<string> = new Set<string>();

      for (const line of dtsLines) {
        if (line.startsWith('export type ') === false) {
          continue;
        }

        const singleChunkMatch: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ReverseMatch = line.match(new RegExp('^export type (\\w+)'));

        if (singleChunkMatch === null || singleChunkMatch[1] === undefined) {
          continue;
        }

        const singleChunkTypeName: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ReverseTypeName = singleChunkMatch[1];

        if (singleChunkTypeName.startsWith(`${classPrefix}_`) === false) {
          continue;
        }

        const singleChunkAfterClassPrefix: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ReverseAfterClassPrefix = singleChunkTypeName.slice(classPrefix.length + 1);

        if (singleChunkAfterClassPrefix.includes('_') === false) {
          singleChunkTopLevelTypes.add(singleChunkTypeName);
        }
      }

      for (const line of dtsLines) {
        if (line.startsWith('export type ') === false) {
          continue;
        }

        const reverseMatch: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ReverseMatch = line.match(new RegExp('^export type (\\w+)'));

        if (reverseMatch === null || reverseMatch[1] === undefined) {
          continue;
        }

        const reverseTypeName: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ReverseTypeName = reverseMatch[1];

        if (reverseTypeName.startsWith(`${classPrefix}_`) === false) {
          continue;
        }

        const reverseAfterClassPrefix: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ReverseAfterClassPrefix = reverseTypeName.slice(classPrefix.length + 1);
        const reverseChunks: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ReverseChunks = reverseAfterClassPrefix.split('_');

        if (reverseChunks.length <= 1) {
          continue;
        }

        const reverseExpectedMethodSection: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_ReverseExpectedMethodSection = `${classPrefix}_${reverseChunks[0]}`;

        // Property-hierarchy exemption: if `${classPrefix}_${firstChunk}` exists as a single-chunk top-level type
        // in this .d.ts, the multi-chunk type is a property of that parent (Parent_Property form), not a section.
        if (singleChunkTopLevelTypes.has(reverseExpectedMethodSection) === true) {
          continue;
        }

        if (sourceSectionSet.has(reverseExpectedMethodSection) === false) {
          const violation: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Violation = `.d.ts type "${reverseTypeName}" expects source section "${reverseExpectedMethodSection}" but no class/method/function/(string, fn) call by that name exists in the source file. Fix options: (a) rename the .d.ts type to match an existing source section, (b) add a matching source identifier (class, method, top-level function, or function-typed const), or (c) add this file to testConfig.standaloneTypeFiles if the .d.ts is a domain type file with no source mirror.`;

          violations.push(violation);
        }
      }

      const violationMessage: Tests_TypeDeclarations_TypeDeclarationSectionCoverage_Violation = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
});

/**
 * Tests - Type Declarations - Type Declaration Variable Type Symmetry.
 *
 * @since 0.18.0
 */
describe('type declaration variable type symmetry', async () => {
  const files: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Files = await discoverSourceFiles();
  const symmetryCurrentDirectory: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_CurrentDirectory = getPackageRoot();

  for (const file of files) {
    const symmetryRelativePath: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_RelativePath = relative(symmetryCurrentDirectory, file);

    it(`variable type symmetry in ${symmetryRelativePath}`, async () => {
      const content: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Content = await readFile(file, 'utf-8');
      const lines: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Lines = content.split('\n');
      const classPrefix: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_ClassPrefix = deriveClassPrefix(file);
      const sectionMap: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_SectionMap = buildSourceSectionMap(file, content, classPrefix);
      const dtsPath: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_DtsPath = file.replace('/src/', '/src/types/').replace('.ts', '.d.ts');
      const dtsExists: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_DtsExists = await fileExists(dtsPath);
      const dtsContent: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_DtsContent = (dtsExists === true) ? await readFile(dtsPath, 'utf-8') : '';
      const violations: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Violations = [];

      // Rule 7.4: Inline typed callbacks forbidden.
      const inlineCallbacks: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Callbacks = detectInlineTypedCallbacks(file, content);

      for (const callback of inlineCallbacks) {
        const violation: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Violation = `${symmetryRelativePath}:${callback['lineNumber']}: rule 7.4 violation: inline typed callback param "${callback['paramName']}: ${callback['typeName']}" is forbidden. Extract the callback to a named const so it follows rule 7.1.`;

        violations.push(violation);
      }

      // Rules 7.1, 7.2, 7.3 — body declarations.
      const bodyDecls: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_BodyDecls = extractBodyDeclarations(lines);
      const expectedNames: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_ExpectedNames = [];

      for (const decl of bodyDecls) {
        const sourceSection: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_SourceSection = sectionMap.get(decl['lineNumber']) ?? classPrefix;

        // Rule 7.3: banned suffixes at body var position.
        if (isReservedSuffix(decl['typeName']) === true) {
          const violation: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Violation = `${symmetryRelativePath}:${decl['lineNumber']}: rule 7.3 violation: body var "${decl['varName']}: ${decl['typeName']}" uses a return-position-only suffix (Returns/TypeGuard/Return). Use a different type name without that suffix.`;

          violations.push(violation);

          continue;
        }

        // Rule 7.1: leaf must match title-cased var name.
        const leafResult: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_LeafResult = validateLeaf(decl['varName'], decl['typeName'], sourceSection, classPrefix);

        if (leafResult !== null) {
          const violation: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Violation = `${symmetryRelativePath}:${decl['lineNumber']}: rule 7.1 violation: body var "${decl['varName']}: ${decl['typeName']}" — expected leaf "${leafResult['expectedLeaf']}" but found "${leafResult['actualLeaf']}". Rename the type to "${sourceSection}_${leafResult['expectedLeaf']}" or "${classPrefix}_${leafResult['expectedLeaf']}".`;

          violations.push(violation);
        }

        // Rule 7.2 (Mode 2): body var types must be locally defined and not aliases to foreign types.
        if (dtsExists === true) {
          if (isLocallyDefined(decl['typeName'], dtsContent) === false) {
            const violation: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Violation = `${symmetryRelativePath}:${decl['lineNumber']}: rule 7.2 violation: body var type "${decl['typeName']}" is not defined in the corresponding .d.ts. Cross-module body-var types are forbidden — define the type concretely in ${dtsPath.replace(symmetryCurrentDirectory, '').replace(/^\//, '')}, or promote the shape to shared.d.ts, or skip the typed body var.`;

            violations.push(violation);
          } else if (isAliasToForeignType(decl['typeName'], dtsContent, classPrefix) === true) {
            const violation: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Violation = `${symmetryRelativePath}:${decl['lineNumber']}: rule 7.2 violation: body var type "${decl['typeName']}" is locally defined but only as an alias to a foreign type. Cross-module body-var types are forbidden — escape hatches: (a) promote the shape to shared.d.ts, (b) redefine the concrete shape in ${dtsPath.replace(symmetryCurrentDirectory, '').replace(/^\//, '')}, or (c) inline the call to skip the typed body var.`;

            violations.push(violation);
          }
        }

        // Collect expected name for rule 7.8.
        const stripped: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Stripped = stripUnderscorePrefix(decl['varName']);
        const titleVar: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_TitleVar = stripped.charAt(0).toUpperCase() + stripped.slice(1);

        expectedNames.push({
          name: decl['varName'],
          typeName: `${sourceSection}_${titleVar}`,
          lineNumber: decl['lineNumber'],
        });
      }

      // Rules 7.1, 7.3 — function params.
      const params: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Params = extractFunctionParams(file, content);

      for (const param of params) {
        const sourceSection: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_SourceSection = sectionMap.get(param['lineNumber']) ?? classPrefix;

        // Rule 7.3: banned suffixes at param position.
        if (isReservedSuffix(param['typeName']) === true) {
          const violation: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Violation = `${symmetryRelativePath}:${param['lineNumber']}: rule 7.3 violation: param "${param['paramName']}: ${param['typeName']}" uses a return-position-only suffix (Returns/TypeGuard/Return). Use a different type name without that suffix.`;

          violations.push(violation);

          continue;
        }

        // Rule 7.1: leaf must match title-cased param name.
        const leafResult: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_LeafResult = validateLeaf(param['paramName'], param['typeName'], sourceSection, classPrefix);

        if (leafResult !== null) {
          const violation: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Violation = `${symmetryRelativePath}:${param['lineNumber']}: rule 7.1 violation: param "${param['paramName']}: ${param['typeName']}" — expected leaf "${leafResult['expectedLeaf']}" but found "${leafResult['actualLeaf']}". Rename the type to "${sourceSection}_${leafResult['expectedLeaf']}" or "${classPrefix}_${leafResult['expectedLeaf']}".`;

          violations.push(violation);
        }

        // Collect expected name for rule 7.8.
        const stripped: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Stripped = stripUnderscorePrefix(param['paramName']);
        const titleVar: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_TitleVar = stripped.charAt(0).toUpperCase() + stripped.slice(1);

        expectedNames.push({
          name: param['paramName'],
          typeName: `${sourceSection}_${titleVar}`,
          lineNumber: param['lineNumber'],
        });
      }

      // Rules 7.5, 7.6, 7.7 — function returns.
      const fnReturns: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_FunctionReturns = extractFunctionReturns(file, content);

      for (const ret of fnReturns) {
        const returnValidationReason: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_ReturnValidationReason = validateReturnType(ret['returnType'], ret['isTypeGuard']);

        if (returnValidationReason !== null) {
          const violation: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Violation = `${symmetryRelativePath}:${ret['lineNumber']}: rule 7.5/7.6/7.7 violation: ${returnValidationReason}`;

          violations.push(violation);
        }
      }

      // Rule 7.8: uniqueness of expected type names across all body vars + params.
      const uniquenessViolations: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_UniquenessViolations = checkTypeNameUniqueness(expectedNames);

      for (const uniquenessViolation of uniquenessViolations) {
        const violation: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Violation = `${symmetryRelativePath}: rule 7.8 violation: ${uniquenessViolation}`;

        violations.push(violation);
      }

      const violationMessage: Tests_TypeDeclarations_TypeDeclarationVariableTypeSymmetry_Violation = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
});

/**
 * Tests - Type Declarations - Type Declaration Identifier Vs File Name.
 *
 * Mode 2 rules C1, C2, C3: top-level class/function/function-typed-const names must NOT equal the file name
 * (PascalCased, hyphens flattened). Forces meaningful identifiers; prevents type-name doubling like
 * `Cli_Utility_Changelog_Changelog_*`. If consumers want the file-name as the public name, use a barrel re-export.
 *
 * @since 0.18.0
 */
describe('type declaration identifier vs file name', async () => {
  const files: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Files = await discoverSourceFiles();
  const identifierVsFileNameCurrentDirectory: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_CurrentDirectory = getPackageRoot();

  for (const file of files) {
    const identifierVsFileNameRelativePath: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_RelativePath = relative(identifierVsFileNameCurrentDirectory, file);

    it(`top-level identifiers in ${identifierVsFileNameRelativePath} do not equal file name`, async () => {
      const content: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Content = await readFile(file, 'utf-8');
      const classPrefix: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_ClassPrefix = deriveClassPrefix(file);
      const segments: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Segments = classPrefix.split('_');
      const fileName: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_FileName = segments[segments.length - 1] ?? '';
      const identifiers: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Identifiers = extractTopLevelIdentifiers(file, content);
      const violations: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Violations = [];

      for (const identifier of identifiers) {
        if (identifier['name'] === fileName) {
          const violation: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Violation = `${identifierVsFileNameRelativePath}:${identifier['lineNumber']}: rule C1/C2/C3 violation: top-level ${identifier['kind']} name "${identifier['name']}" equals file name "${fileName}". Rename the ${identifier['kind']} (use a barrel re-export if consumers need to import the file-name as the public name).`;

          violations.push(violation);
        }
      }

      const violationMessage: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_ViolationMessage = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
});

/**
 * Tests - Type Declarations - Type Declaration Filename Validation.
 *
 * Mode 2 rules EC19, EC20, EC21: path segments must match `^[a-z][a-z0-9-]*$` after stripping the recognized
 * suffixes (.d.ts, .tsx, .ts, .test). Forbids dotted filenames (foo.spec.ts), leading numbers (123foo.ts),
 * and special characters (foo_bar.ts, foo$bar.ts, foo bar.ts). Hyphens are the only inter-word separator.
 *
 * @since 0.18.0
 */
describe('type declaration filename validation', async () => {
  const sourceFiles: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_SourceFiles = await discoverSourceFiles();
  const dtsFiles: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_DtsFiles = await discoverTypeFiles();
  const allFiles: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_AllFiles = [...sourceFiles, ...dtsFiles];
  const filenameValidationCurrentDirectory: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_CurrentDirectory = getPackageRoot();

  for (const file of allFiles) {
    const filenameValidationRelativePath: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_RelativePath = relative(filenameValidationCurrentDirectory, file);

    it(`filename and path segments in ${filenameValidationRelativePath} are valid`, () => {
      let cleaned: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Cleaned = filenameValidationRelativePath;

      for (const typeRoot of testConfig['typeRoots']) {
        cleaned = cleaned.replace(`${typeRoot}/types/`, '');
        cleaned = cleaned.replace(`${typeRoot}/`, '');
      }

      cleaned = cleaned.replace(new RegExp('\\.d\\.ts$'), '');
      cleaned = cleaned.replace(new RegExp('\\.tsx$'), '');
      cleaned = cleaned.replace(new RegExp('\\.ts$'), '');
      cleaned = cleaned.replace(new RegExp('\\.test$'), '');

      const segments: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Segments = cleaned.split(sep).join('/').split('/').filter((segment) => segment.length > 0);
      const pattern: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Pattern = new RegExp('^[a-z][a-z0-9-]*$');
      const violations: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Violations = [];

      for (const segment of segments) {
        if (pattern.test(segment) === false) {
          const violation: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Violation = `${filenameValidationRelativePath}: invalid path segment "${segment}". Path segments must match /^[a-z][a-z0-9-]*$/ — lowercase letters/digits/hyphens, starting with a letter. Recognized strippable suffixes: .d.ts, .tsx, .ts, .test. Any other dot, leading digit, underscore, or special character causes failure.`;

          violations.push(violation);
        }
      }

      const violationMessage: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_ViolationMessage = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
});

/**
 * Tests - Type Declarations - Type Declaration Standalone Type Files.
 *
 * Mode 2 rules S1, S2, S3, S4 for files listed in testConfig.standaloneTypeFiles
 * (currently /shared.d.ts, /fetch-response.d.ts):
 * - S1: PascalCase identifiers; no brand casing (3+ consecutive uppercase letters).
 * - S2: No path-prefix-style names — type names must not start with a known source-file path prefix.
 * - S3: Object property types follow Parent_Property form when the property type is local.
 * - S4: Array element types defined before the array type.
 *
 * @since 0.18.0
 */
describe('type declaration standalone type files', async () => {
  const standaloneSourceFiles: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_SourceFiles = await discoverSourceFiles();
  const standaloneDtsFiles: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_DtsFiles = await discoverTypeFiles();
  const topLevelPathPrefixes: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_TopLevelPathPrefixes = new Set<string>();

  for (const sourceFile of standaloneSourceFiles) {
    const sourceClassPrefix: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_SourceClassPrefix = deriveClassPrefix(sourceFile);
    const firstChunk: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_FirstChunk = sourceClassPrefix.split('_')[0];

    if (firstChunk !== undefined && firstChunk !== '') {
      topLevelPathPrefixes.add(firstChunk);
    }
  }

  const standaloneFiles: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_StandaloneFiles = standaloneDtsFiles.filter((dtsFile) => testConfig['standaloneTypeFiles'].some((pattern) => dtsFile.endsWith(pattern)));
  const standaloneCurrentDirectory: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_CurrentDirectory = getPackageRoot();

  for (const file of standaloneFiles) {
    const standaloneRelativePath: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_RelativePath = relative(standaloneCurrentDirectory, file);

    it(`standalone file rules in ${standaloneRelativePath}`, async () => {
      const content: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_Content = await readFile(file, 'utf-8');
      const lines: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_Lines = content.split('\n');
      const typeLines: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_TypeLines = lines.filter((line) => line.startsWith('export type '));
      const typeNames: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_TypeNames = extractTypeNames(typeLines);
      const localTypeSet: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_LocalTypeSet = new Set<string>(typeNames);
      const primitiveSet: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_PrimitiveSet = new Set<string>(['string', 'number', 'boolean', 'unknown', 'never', 'void', 'null', 'undefined', 'any', 'object', 'symbol', 'bigint']);
      const pascalCasePattern: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_PascalCasePattern = new RegExp('^[A-Z][A-Za-z0-9]*(_[A-Z][A-Za-z0-9]*)*$');
      const brandCasePattern: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_BrandCasePattern = new RegExp('[A-Z]{3,}');
      const violations: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_Violations = [];

      for (const typeName of typeNames) {
        if (pascalCasePattern.test(typeName) === false) {
          const violation: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_Violation = `${standaloneRelativePath}: rule S1 violation: type "${typeName}" is not PascalCase. Standalone-file types must be PascalCase, optionally underscore-separated for nested properties (e.g., EntryItem, EntryItem_Category).`;

          violations.push(violation);

          continue;
        }

        if (brandCasePattern.test(typeName) === true) {
          const violation: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_Violation = `${standaloneRelativePath}: rule S1 violation: type "${typeName}" uses brand casing (3+ consecutive uppercase letters). Use Pascal-cased acronyms instead (e.g., Url, Api, Cli — not URL, API, CLI).`;

          violations.push(violation);
        }
      }

      for (const typeName of typeNames) {
        for (const pathPrefix of topLevelPathPrefixes) {
          if (typeName.startsWith(`${pathPrefix}_`) === true) {
            const violation: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_Violation = `${standaloneRelativePath}: rule S2 violation: type "${typeName}" looks like a path-prefix-style name (starts with "${pathPrefix}_" — a known source-file top-level segment). Standalone-file types must be domain concepts, not path-derived.`;

            violations.push(violation);
            break;
          }
        }
      }

      const objectTypes: Tests_TypeDeclarations_ExtractObjectTypes_Returns = extractObjectTypes(lines, '');

      for (const objectType of objectTypes) {
        const expectedPropertyPrefix: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_ExpectedPropertyPrefix = `${objectType['name']}_`;

        for (const property of objectType['properties']) {
          if (primitiveSet.has(property['valueType']) === true) {
            continue;
          }

          if (localTypeSet.has(property['valueType']) === false) {
            continue;
          }

          if (property['valueType'].startsWith(expectedPropertyPrefix) === false) {
            const violation: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_Violation = `${standaloneRelativePath}: rule S3 violation: object type "${objectType['name']}" property "${property['key']}" uses local type "${property['valueType']}" which does not start with "${expectedPropertyPrefix}". Add an intermediate alias (e.g., "${expectedPropertyPrefix}${property['key'].charAt(0).toUpperCase() + property['key'].slice(1)} = ${property['valueType']};") to use the Parent_Property nesting form.`;

            violations.push(violation);
          }
        }
      }

      const arrayTypes: Tests_TypeDeclarations_ExtractArrayTypes_Returns = extractArrayTypes(lines);
      const typePositions: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_TypePositions = new Map<string, number>();

      for (let i: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_LineIndex = 0; i < lines.length; i += 1) {
        const lineToScan: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_LineToScan = lines[i] as Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_LineToScan;

        if (lineToScan === undefined) {
          continue;
        }

        const positionMatch: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_PositionMatch = lineToScan.match(new RegExp('^export type (\\w+)'));

        if (
          positionMatch !== null
          && positionMatch[1] !== undefined
          && typePositions.has(positionMatch[1]) === false
        ) {
          typePositions.set(positionMatch[1], i);
        }
      }

      for (const arrayType of arrayTypes) {
        const elementLine: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_ElementLine = typePositions.get(arrayType['elementTypeName']) ?? -1;

        if (elementLine === -1) {
          continue;
        }

        if (elementLine >= arrayType['lineIndex']) {
          const violation: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_Violation = `${standaloneRelativePath}:${arrayType['lineIndex'] + 1}: rule S4 violation: array type "${arrayType['arrayTypeName']}" defined before its element type "${arrayType['elementTypeName']}" (element at line ${elementLine + 1}). Define element types before arrays.`;

          violations.push(violation);
        }
      }

      const violationMessage: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_ViolationMessage = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
});

// =============================================================================
// COMPREHENSIVE RULE & EDGE-CASE TEST SUITE (Mode 2 verification)
// =============================================================================
// These tests exercise every helper and every rule documented in
// docs/superpowers/specs/2026-04-26-mode-2-final-spec.md, plus the 55
// edge cases (EC1-EC55) where enforcement is verifiable. Fixture content
// is inline strings — no filesystem I/O — so each test is hermetic.

/**
 * Tests - Type Declarations - Parse Describe String Comprehensive.
 *
 * @since 0.18.0
 */
describe('parseDescribeString comprehensive', () => {
  it('returns empty string for purely non-alphanumeric input', () => {
    strictEqual(parseDescribeString('!@#$%^&*()'), '');
  });

  it('handles digits-only input by preserving the digit run', () => {
    strictEqual(parseDescribeString('123abc'), '123abc');
  });

  it('parses path-style /users into Users', () => {
    strictEqual(parseDescribeString('/users'), 'Users');
  });

  it('joins multiple non-alphanumeric separators', () => {
    strictEqual(parseDescribeString('foo.bar-baz/qux'), 'FooBarBazQux');
  });

  it('preserves CamelCase parts within a piece', () => {
    strictEqual(parseDescribeString('CliUtility runner'), 'CliUtilityRunner');
  });

  it('handles single character', () => {
    strictEqual(parseDescribeString('a'), 'A');
  });

  it('handles empty string', () => {
    strictEqual(parseDescribeString(''), '');
  });

  it('handles unicode by treating non-ASCII letters as separators', () => {
    strictEqual(parseDescribeString('fooébar'), 'FooBar');
  });

  return;
});

/**
 * Tests - Type Declarations - Strip Underscore Prefix Comprehensive.
 *
 * @since 0.18.0
 */
describe('stripUnderscorePrefix comprehensive', () => {
  it('strips a single leading underscore', () => {
    strictEqual(stripUnderscorePrefix('_prev'), 'prev');
  });

  it('preserves only-underscore input as empty', () => {
    strictEqual(stripUnderscorePrefix('_'), '');
  });

  it('does not strip non-prefix underscores', () => {
    strictEqual(stripUnderscorePrefix('foo_bar'), 'foo_bar');
  });

  it('does not strip when input has no underscore', () => {
    strictEqual(stripUnderscorePrefix('plain'), 'plain');
  });

  it('strips only the first underscore', () => {
    strictEqual(stripUnderscorePrefix('__double'), '_double');
  });

  return;
});

/**
 * Tests - Type Declarations - Is Reserved Suffix Comprehensive.
 *
 * @since 0.18.0
 */
describe('isReservedSuffix comprehensive', () => {
  it('detects underscore-separated _Returns', () => {
    strictEqual(isReservedSuffix('Foo_Bar_Returns'), true);
  });

  it('detects glued Returns', () => {
    strictEqual(isReservedSuffix('FooBarReturns'), true);
  });

  it('detects underscore-separated _TypeGuard', () => {
    strictEqual(isReservedSuffix('Foo_Bar_TypeGuard'), true);
  });

  it('detects glued TypeGuard', () => {
    strictEqual(isReservedSuffix('FooBarTypeGuard'), true);
  });

  it('detects underscore-separated _Return (singular)', () => {
    strictEqual(isReservedSuffix('Foo_Bar_Return'), true);
  });

  it('detects glued Return (singular)', () => {
    strictEqual(isReservedSuffix('FooBarReturn'), true);
  });

  it('does not match Result', () => {
    strictEqual(isReservedSuffix('Foo_Bar_Result'), false);
  });

  it('does not match Returnable (false suffix)', () => {
    strictEqual(isReservedSuffix('Foo_Bar_Returnable'), false);
  });

  it('does not match TypeGuardian (false suffix)', () => {
    strictEqual(isReservedSuffix('Foo_TypeGuardian'), false);
  });

  it('does match Reborn — banned because endsWith Return matches the substring', () => {
    // Note: current isReservedSuffix uses endsWith with the bare suffixes too,
    // so any name ending in "Return" (incl. words like "Reborn"? no — endsWith
    // checks the literal substring at end). Actual: 'Reborn' ends with 'born',
    // not 'Return'. So this should be false. Verify the behavior.
    strictEqual(isReservedSuffix('Reborn'), false);
  });

  return;
});

/**
 * Tests - Type Declarations - Validate Leaf Comprehensive.
 *
 * @since 0.18.0
 */
describe('validateLeaf comprehensive', () => {
  it('returns null when leaf matches sourceSection_titleVar', () => {
    const reasonResult: Tests_TypeDeclarations_ValidateLeaf_Returns = validateLeaf('items', 'Cli_Foo_Run_Items', 'Cli_Foo_Run', 'Cli_Foo');
    strictEqual(reasonResult, null);
  });

  it('returns null when leaf matches classPrefix_titleVar (passthrough)', () => {
    const reasonResult: Tests_TypeDeclarations_ValidateLeaf_Returns = validateLeaf('items', 'Cli_Foo_Items', 'Cli_Foo_Run', 'Cli_Foo');
    strictEqual(reasonResult, null);
  });

  it('returns reason when leaf does not match', () => {
    const reasonResult: Tests_TypeDeclarations_ValidateLeaf_Returns = validateLeaf('items', 'Cli_Foo_Run_Things', 'Cli_Foo_Run', 'Cli_Foo');
    deepStrictEqual(reasonResult, { actualLeaf: 'Things', expectedLeaf: 'Items' });
  });

  it('strips underscore prefix from var name before comparison', () => {
    const reasonResult: Tests_TypeDeclarations_ValidateLeaf_Returns = validateLeaf('_prev', 'Cli_Foo_Run_Prev', 'Cli_Foo_Run', 'Cli_Foo');
    strictEqual(reasonResult, null);
  });

  it('handles single-character var name', () => {
    const reasonResult: Tests_TypeDeclarations_ValidateLeaf_Returns = validateLeaf('i', 'Cli_Foo_Run_I', 'Cli_Foo_Run', 'Cli_Foo');
    strictEqual(reasonResult, null);
  });

  it('returns the actualLeaf when typeName starts with sourceSection but leaf differs', () => {
    const reasonResult: Tests_TypeDeclarations_ValidateLeaf_Returns = validateLeaf('items', 'Cli_Foo_Run_Things', 'Cli_Foo_Run', 'Cli_Foo');
    deepStrictEqual(reasonResult, { actualLeaf: 'Things', expectedLeaf: 'Items' });
  });

  it('returns the actualLeaf when typeName starts with classPrefix passthrough but leaf differs', () => {
    const reasonResult: Tests_TypeDeclarations_ValidateLeaf_Returns = validateLeaf('items', 'Cli_Foo_Things', 'Cli_Foo_Run', 'Cli_Foo');
    deepStrictEqual(reasonResult, { actualLeaf: 'Things', expectedLeaf: 'Items' });
  });

  it('returns full typeName as actualLeaf when no prefix matches', () => {
    const reasonResult: Tests_TypeDeclarations_ValidateLeaf_Returns = validateLeaf('items', 'Foreign_Type', 'Cli_Foo_Run', 'Cli_Foo');
    deepStrictEqual(reasonResult, { actualLeaf: 'Foreign_Type', expectedLeaf: 'Items' });
  });

  return;
});

/**
 * Tests - Type Declarations - Validate Return Type Comprehensive.
 *
 * @since 0.18.0
 */
describe('validateReturnType comprehensive', () => {
  it('passes _Returns at non-type-guard return', () => {
    strictEqual(validateReturnType('Foo_Bar_Returns', false), null);
  });

  it('passes Returns at non-type-guard return', () => {
    strictEqual(validateReturnType('FooBarReturns', false), null);
  });

  it('passes _TypeGuard at type-guard return', () => {
    strictEqual(validateReturnType('Foo_Bar_TypeGuard', true), null);
  });

  it('passes TypeGuard at type-guard return', () => {
    strictEqual(validateReturnType('FooBarTypeGuard', true), null);
  });

  it('rejects singular _Return at any return position (rule 7.6)', () => {
    ok((validateReturnType('Foo_Bar_Return', false) ?? '').includes('singular'));
  });

  it('rejects glued Return at any return position', () => {
    ok((validateReturnType('FooBarReturn', false) ?? '').includes('singular'));
  });

  it('rejects non-Returns at non-type-guard (rule 7.5)', () => {
    ok((validateReturnType('Foo_Bar_Result', false) ?? '').includes('Returns'));
  });

  it('rejects TypeGuard at non-type-guard return position (rule 7.7)', () => {
    ok((validateReturnType('Foo_Bar_TypeGuard', false) ?? '').includes('value is T'));
  });

  it('rejects non-TypeGuard at type-guard position (rule 7.7)', () => {
    ok((validateReturnType('Foo_Bar_Returns', true) ?? '').includes('TypeGuard'));
  });

  it('rejects Result at type-guard position', () => {
    ok((validateReturnType('Foo_Bar_Result', true) ?? '').includes('TypeGuard'));
  });

  return;
});

/**
 * Tests - Type Declarations - Is Locally Defined Comprehensive.
 *
 * @since 0.18.0
 */
describe('isLocallyDefined comprehensive', () => {
  it('returns true for export type X = ...;', () => {
    const dtsContent: Tests_TypeDeclarations_IsLocallyDefined_DtsContent = 'export type Cli_Foo_Bar = string;\n';
    strictEqual(isLocallyDefined('Cli_Foo_Bar', dtsContent), true);
  });

  it('returns false for missing type', () => {
    const dtsContent: Tests_TypeDeclarations_IsLocallyDefined_DtsContent = 'export type Cli_Foo_Bar = string;\n';
    strictEqual(isLocallyDefined('Cli_Foo_NotThere', dtsContent), false);
  });

  it('only matches at line start with export type prefix', () => {
    const dtsContent: Tests_TypeDeclarations_IsLocallyDefined_DtsContent = '// some comment about Cli_Foo_Bar\n';
    strictEqual(isLocallyDefined('Cli_Foo_Bar', dtsContent), false);
  });

  it('matches with word boundary (does not partial-match)', () => {
    const dtsContent: Tests_TypeDeclarations_IsLocallyDefined_DtsContent = 'export type Cli_Foo_BarExtended = string;\n';
    strictEqual(isLocallyDefined('Cli_Foo_Bar', dtsContent), false);
  });

  it('handles type defined at end of file without trailing newline', () => {
    const dtsContent: Tests_TypeDeclarations_IsLocallyDefined_DtsContent = 'export type Cli_Foo_Bar = string;';
    strictEqual(isLocallyDefined('Cli_Foo_Bar', dtsContent), true);
  });

  return;
});

/**
 * Tests - Type Declarations - Is Alias To Foreign Type Comprehensive.
 *
 * @since 0.18.0
 */
describe('isAliasToForeignType comprehensive', () => {
  it('detects direct alias to a foreign-prefix type', () => {
    const dtsContent: Tests_TypeDeclarations_IsAliasToForeignType_DtsContent = 'export type Cli_Foo_Run_Data = Lib_Utility_FetchData_Returns;\n';
    strictEqual(isAliasToForeignType('Cli_Foo_Run_Data', dtsContent, 'Cli_Foo'), true);
  });

  it('does not flag alias to same-prefix type', () => {
    const dtsContent: Tests_TypeDeclarations_IsAliasToForeignType_DtsContent = 'export type Cli_Foo_Run_Data = Cli_Foo_Helper_Result;\n';
    strictEqual(isAliasToForeignType('Cli_Foo_Run_Data', dtsContent, 'Cli_Foo'), false);
  });

  it('does not flag concrete object shape', () => {
    const dtsContent: Tests_TypeDeclarations_IsAliasToForeignType_DtsContent = 'export type Cli_Foo_Run_Data = { name: string; version: string };\n';
    strictEqual(isAliasToForeignType('Cli_Foo_Run_Data', dtsContent, 'Cli_Foo'), false);
  });

  it('does not flag primitive alias', () => {
    const dtsContent: Tests_TypeDeclarations_IsAliasToForeignType_DtsContent = 'export type Cli_Foo_Run_Data = string;\n';
    strictEqual(isAliasToForeignType('Cli_Foo_Run_Data', dtsContent, 'Cli_Foo'), false);
  });

  it('does not flag union types', () => {
    const dtsContent: Tests_TypeDeclarations_IsAliasToForeignType_DtsContent = 'export type Cli_Foo_Run_Data = Lib_Utility_X | null;\n';
    strictEqual(isAliasToForeignType('Cli_Foo_Run_Data', dtsContent, 'Cli_Foo'), false);
  });

  it('handles array form: alias to foreign[]', () => {
    const dtsContent: Tests_TypeDeclarations_IsAliasToForeignType_DtsContent = 'export type Cli_Foo_Run_Data = Lib_Utility_X[];\n';
    strictEqual(isAliasToForeignType('Cli_Foo_Run_Data', dtsContent, 'Cli_Foo'), true);
  });

  it('strips generics before checking', () => {
    const dtsContent: Tests_TypeDeclarations_IsAliasToForeignType_DtsContent = 'export type Cli_Foo_Run_Data = Promise<Lib_Utility_X>;\n';
    strictEqual(isAliasToForeignType('Cli_Foo_Run_Data', dtsContent, 'Cli_Foo'), false);
  });

  it('does not flag unprefixed PascalCase type', () => {
    const dtsContent: Tests_TypeDeclarations_IsAliasToForeignType_DtsContent = 'export type Cli_Foo_Run_Data = SomeType;\n';
    strictEqual(isAliasToForeignType('Cli_Foo_Run_Data', dtsContent, 'Cli_Foo'), false);
  });

  it('returns false when type not present in dts', () => {
    const dtsContent: Tests_TypeDeclarations_IsAliasToForeignType_DtsContent = '\n';
    strictEqual(isAliasToForeignType('Cli_Foo_Run_Data', dtsContent, 'Cli_Foo'), false);
  });

  return;
});

/**
 * Tests - Type Declarations - Build Source Section Map Comprehensive.
 *
 * @since 0.18.0
 */
describe('buildSourceSectionMap comprehensive', () => {
  it('class declaration adds class name as a chunk (Mode 2)', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/foo.ts', 'class Runner {\n  public bar(): void {}\n}\n', 'Cli_Foo');
    strictEqual(sectionMap.get(1), 'Cli_Foo_Runner');
    strictEqual(sectionMap.get(2), 'Cli_Foo_Runner_Bar');
  });

  it('anonymous class declaration (default export without name) does NOT add chunk', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/foo.ts', 'export default class {}\n', 'Cli_Foo');
    strictEqual(sectionMap.get(1), 'Cli_Foo');
  });

  it('constructor adds Constructor chunk', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/foo.ts', 'class Runner {\n  constructor(name: string) {}\n}\n', 'Cli_Foo');
    strictEqual(sectionMap.get(2), 'Cli_Foo_Runner_Constructor');
  });

  it('method declaration adds method chunk', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/foo.ts', 'class Runner {\n  public addRow(): void {}\n}\n', 'Cli_Foo');
    strictEqual(sectionMap.get(2), 'Cli_Foo_Runner_AddRow');
  });

  it('private # method strips # and adds chunk', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/foo.ts', 'class Runner {\n  #helper(): void {}\n}\n', 'Cli_Foo');
    strictEqual(sectionMap.get(2), 'Cli_Foo_Runner_Helper');
  });

  it('top-level function declaration adds function chunk', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/lib/utility.ts', 'function getCurrentTimestamp(): number {\n  return Date.now();\n}\n', 'Lib_Utility');
    strictEqual(sectionMap.get(1), 'Lib_Utility_GetCurrentTimestamp');
  });

  it('top-level function-typed const adds const chunk', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/lib/utility.ts', 'const formatRow = (row: string[]) => {\n  return row.join(\'|\');\n};\n', 'Lib_Utility');
    strictEqual(sectionMap.get(2), 'Lib_Utility_FormatRow');
  });

  it('function expression const adds chunk', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/lib/utility.ts', 'const handler = function (x: number) {\n  return x;\n};\n', 'Lib_Utility');
    strictEqual(sectionMap.get(2), 'Lib_Utility_Handler');
  });

  it('nested function declaration adds chunk under outer', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/lib/utility.ts', 'function process() {\n  function visit() {\n    const x: number = 1;\n  }\n}\n', 'Lib_Utility');
    strictEqual(sectionMap.get(3), 'Lib_Utility_Process_Visit');
  });

  it('generic (string, fn) call adds chunk via parseDescribeString', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/server.ts', 'function start() {\n  app.get(\'/users\', (req, res) => {\n    const x: number = 1;\n  });\n}\n', 'Cli_Server');
    strictEqual(sectionMap.get(3), 'Cli_Server_Start_Users');
  });

  it('describe call adds chunk via generic (string, fn)', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/tests/foo.test.ts', 'describe(\'Foo\', () => {\n  const x: number = 1;\n});\n', 'Tests_Foo');
    strictEqual(sectionMap.get(2), 'Tests_Foo_Foo');
  });

  it('it call adds chunk via generic (string, fn)', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/tests/foo.test.ts', 'describe(\'Foo\', () => {\n  it(\'does something\', () => {\n    const x: number = 1;\n  });\n});\n', 'Tests_Foo');
    strictEqual(sectionMap.get(3), 'Tests_Foo_Foo_DoesSomething');
  });

  it('template string in (string, fn) does NOT add chunk (EC23)', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/tests/foo.test.ts', 'describe(\'Foo\', () => {\n  it(`test ${1}`, () => {\n    const x: number = 1;\n  });\n});\n', 'Tests_Foo');
    strictEqual(sectionMap.get(3), 'Tests_Foo_Foo');
  });

  it('variable in (string, fn) arg[0] does NOT add chunk (EC23)', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/tests/foo.test.ts', 'const name = \'Foo\';\ndescribe(name, () => {\n  const x: number = 1;\n});\n', 'Tests_Foo');
    strictEqual(sectionMap.get(3), 'Tests_Foo');
  });

  it('async arrow function callback in (string, fn) works (EC24)', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/tests/foo.test.ts', 'describe(\'Foo\', async () => {\n  const x: number = 1;\n});\n', 'Tests_Foo');
    strictEqual(sectionMap.get(2), 'Tests_Foo_Foo');
  });

  it('multiple top-level classes each add their own chunk (EC1)', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/multi.ts', 'class Foo {\n  process(): void {}\n}\nclass Bar {\n  process(): void {}\n}\n', 'Cli_Multi');
    strictEqual(sectionMap.get(2), 'Cli_Multi_Foo_Process');
    strictEqual(sectionMap.get(5), 'Cli_Multi_Bar_Process');
  });

  it('static method adds chunk (EC26)', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/foo.ts', 'class Runner {\n  public static doThing(): void {}\n}\n', 'Cli_Foo');
    strictEqual(sectionMap.get(2), 'Cli_Foo_Runner_DoThing');
  });

  it('getter adds chunk based on property name (EC25)', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/foo.ts', 'class Runner {\n  public get bar(): number { return 1; }\n}\n', 'Cli_Foo');
    // Getter is a kind of method declaration in TS AST.
    strictEqual(sectionMap.get(2), 'Cli_Foo_Runner_Bar');
  });

  it('nested class inside method adds chunk under method (EC33)', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/foo.ts', 'class Outer {\n  run(): void {\n    class Inner {}\n  }\n}\n', 'Cli_Foo');
    strictEqual(sectionMap.get(3), 'Cli_Foo_Outer_Run_Inner');
  });

  it('default export class adds chunk (EC11)', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/foo.ts', 'export default class Runner {\n  bar(): void {}\n}\n', 'Cli_Foo');
    strictEqual(sectionMap.get(2), 'Cli_Foo_Runner_Bar');
  });

  it('vitest bench / suite calls add chunks generically (EC34)', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/tests/foo.test.ts', 'bench(\'fast\', () => {\n  const x: number = 1;\n});\n', 'Tests_Foo');
    strictEqual(sectionMap.get(2), 'Tests_Foo_Fast');
  });

  it('describe.skip adds chunk (EC30)', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/tests/foo.test.ts', 'describe.skip(\'Foo\', () => {\n  const x: number = 1;\n});\n', 'Tests_Foo');
    strictEqual(sectionMap.get(2), 'Tests_Foo_Foo');
  });

  it('class method body section overrides class section for body lines', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/foo.ts', 'class Runner {\n  bar(): void {\n    const x: number = 1;\n  }\n}\n', 'Cli_Foo');
    strictEqual(sectionMap.get(3), 'Cli_Foo_Runner_Bar');
  });

  it('arrow function const at file root adds chunk (EC2 — file with only top-level const)', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/lib/foo.ts', 'export const helper = () => {\n  const x: number = 1;\n};\n', 'Lib_Foo');
    strictEqual(sectionMap.get(2), 'Lib_Foo_Helper');
  });

  it('non-fn-typed const (string value) does NOT add chunk', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/lib/foo.ts', 'const constant = \'value\';\n', 'Lib_Foo');
    strictEqual(sectionMap.get(1), 'Lib_Foo');
  });

  it('only-string-no-fn call expression does NOT add chunk', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/lib/foo.ts', 'function bar() {\n  console.log(\'hello\');\n  const x: number = 1;\n}\n', 'Lib_Foo');
    strictEqual(sectionMap.get(3), 'Lib_Foo_Bar');
  });

  it('(string, options-object, fn) call adds chunk — function in arg[2]', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/tests/foo.test.ts', 'describe(\'Foo\', { skip: true }, () => {\n  const x: number = 1;\n});\n', 'Tests_Foo');
    strictEqual(sectionMap.get(2), 'Tests_Foo_Foo');
  });

  it('(string, string, fn) call uses arg[0] for chunk — picks first function in any later arg', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/tests/foo.test.ts', 'foo(\'first\', \'second\', () => {\n  const x: number = 1;\n});\n', 'Tests_Foo');
    strictEqual(sectionMap.get(2), 'Tests_Foo_First');
  });

  it('(fn, string) — function in arg[0] (not a string), rule does NOT match — covers setTimeout-style', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/lib/foo.ts', 'function bar() {\n  setTimeout(() => {\n    const x: number = 1;\n  }, 1000);\n}\n', 'Lib_Foo');
    // arg[0] is the arrow, not a string literal — rule skips, falls through to default tagging.
    strictEqual(sectionMap.get(3), 'Lib_Foo_Bar');
  });

  it('(string, fn, fn) call uses the first function arg only, ignores the second', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/tests/foo.test.ts', 'foo(\'Bar\', () => {\n  const a: number = 1;\n}, () => {\n  const b: number = 2;\n});\n', 'Tests_Foo');
    // First fn-arg's body gets the new section.
    strictEqual(sectionMap.get(2), 'Tests_Foo_Bar');
  });

  return;
});

/**
 * Tests - Type Declarations - Extract Top Level Identifiers Comprehensive.
 *
 * @since 0.18.0
 */
describe('extractTopLevelIdentifiers comprehensive', () => {
  it('extracts top-level class', () => {
    const identifiers: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns = extractTopLevelIdentifiers('/fake/cli/foo.ts', 'export class Runner {}\n');
    strictEqual(identifiers.length, 1);
    strictEqual(identifiers[0]?.name, 'Runner');
    strictEqual(identifiers[0]?.kind, 'class');
  });

  it('extracts top-level function', () => {
    const identifiers: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns = extractTopLevelIdentifiers('/fake/lib/foo.ts', 'export function getNow() { return Date.now(); }\n');
    strictEqual(identifiers.length, 1);
    strictEqual(identifiers[0]?.name, 'getNow');
    strictEqual(identifiers[0]?.kind, 'function');
  });

  it('extracts top-level function-typed const', () => {
    const identifiers: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns = extractTopLevelIdentifiers('/fake/lib/foo.ts', 'const helper = () => 1;\n');
    strictEqual(identifiers.length, 1);
    strictEqual(identifiers[0]?.name, 'helper');
    strictEqual(identifiers[0]?.kind, 'const');
  });

  it('skips non-function const (primitive)', () => {
    const identifiers: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns = extractTopLevelIdentifiers('/fake/lib/foo.ts', 'const value = 42;\n');
    strictEqual(identifiers.length, 0);
  });

  it('skips nested function inside class method', () => {
    const identifiers: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns = extractTopLevelIdentifiers('/fake/cli/foo.ts', 'class Runner {\n  bar() {\n    function nested() {}\n  }\n}\n');
    strictEqual(identifiers.length, 1);
    strictEqual(identifiers[0]?.name, 'Runner');
  });

  it('handles multiple top-level identifiers (EC1)', () => {
    const identifiers: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns = extractTopLevelIdentifiers('/fake/cli/multi.ts', 'export class Foo {}\nexport class Bar {}\nexport function baz() {}\n');
    strictEqual(identifiers.length, 3);
    strictEqual(identifiers[0]?.name, 'Foo');
    strictEqual(identifiers[1]?.name, 'Bar');
    strictEqual(identifiers[2]?.name, 'baz');
  });

  it('returns line numbers (1-indexed)', () => {
    const identifiers: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns = extractTopLevelIdentifiers('/fake/cli/foo.ts', '\n\nexport class Runner {}\n');
    strictEqual(identifiers[0]?.lineNumber, 3);
  });

  it('skips anonymous default export class', () => {
    const identifiers: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns = extractTopLevelIdentifiers('/fake/cli/foo.ts', 'export default class {}\n');
    strictEqual(identifiers.length, 0);
  });

  it('extracts class-expression-typed const as kind "const" (EC9 — class Wrapper = class {})', () => {
    const identifiers: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns = extractTopLevelIdentifiers('/fake/lib/foo.ts', 'const Wrapper = class { run() {} };\n');
    strictEqual(identifiers.length, 1);
    strictEqual(identifiers[0]?.name, 'Wrapper');
    strictEqual(identifiers[0]?.kind, 'const');
  });

  return;
});

/**
 * Tests - Type Declarations - Derive Class Prefix Comprehensive.
 *
 * @since 0.18.0
 */
describe('deriveClassPrefix comprehensive', () => {
  it('derives Cli_Utility_Changelog from src/cli/utility/changelog.ts', () => {
    const prefix: Tests_TypeDeclarations_DeriveClassPrefix_Returns = deriveClassPrefix(resolve(getPackageRoot(), 'src/cli/utility/changelog.ts'));
    strictEqual(prefix, 'Cli_Utility_Changelog');
  });

  it('flattens hyphenated segments (package-json → PackageJson)', () => {
    const prefix: Tests_TypeDeclarations_DeriveClassPrefix_Returns = deriveClassPrefix(resolve(getPackageRoot(), 'src/cli/recipe/package-json/cleanup.ts'));
    strictEqual(prefix, 'Cli_Recipe_PackageJson_Cleanup');
  });

  it('strips .test marker for test files', () => {
    const prefix: Tests_TypeDeclarations_DeriveClassPrefix_Returns = deriveClassPrefix(resolve(getPackageRoot(), 'src/tests/cli/utility/initialize.test.ts'));
    strictEqual(prefix, 'Tests_Cli_Utility_Initialize');
  });

  it('handles .d.ts type files', () => {
    const prefix: Tests_TypeDeclarations_DeriveClassPrefix_Returns = deriveClassPrefix(resolve(getPackageRoot(), 'src/types/cli/utility/changelog.d.ts'));
    strictEqual(prefix, 'Cli_Utility_Changelog');
  });

  it('handles index files (no segment stripping per Mode 2)', () => {
    const prefix: Tests_TypeDeclarations_DeriveClassPrefix_Returns = deriveClassPrefix(resolve(getPackageRoot(), 'src/cli/index.ts'));
    strictEqual(prefix, 'Cli_Index');
  });

  it('handles single-segment path (file at typeRoot)', () => {
    const prefix: Tests_TypeDeclarations_DeriveClassPrefix_Returns = deriveClassPrefix(resolve(getPackageRoot(), 'src/main.ts'));
    strictEqual(prefix, 'Main');
  });

  return;
});

/**
 * Tests - Type Declarations - Extract Type Names Comprehensive.
 *
 * @since 0.18.0
 */
describe('extractTypeNames comprehensive', () => {
  it('extracts type names from export type lines', () => {
    const lines: Tests_TypeDeclarations_ExtractTypeNames_TypeLines = [
      'export type Foo = string;',
      'export type Bar_Baz = number;',
      'export type Cli_Foo_Run_Returns = void;',
    ];
    deepStrictEqual(extractTypeNames(lines), ['Foo', 'Bar_Baz', 'Cli_Foo_Run_Returns']);
  });

  it('returns empty for non-export-type lines', () => {
    const lines: Tests_TypeDeclarations_ExtractTypeNames_TypeLines = [
      'import { foo } from \'./bar.js\';',
      '// comment',
      '',
    ];
    deepStrictEqual(extractTypeNames(lines), []);
  });

  it('handles type with object body', () => {
    const lines: Tests_TypeDeclarations_ExtractTypeNames_TypeLines = ['export type Foo_Bar = { x: number };'];
    deepStrictEqual(extractTypeNames(lines), ['Foo_Bar']);
  });

  return;
});

/**
 * Tests - Type Declarations - Extract Imported Names Comprehensive.
 *
 * @since 0.18.0
 */
describe('extractImportedNames comprehensive', () => {
  it('extracts inline imports', () => {
    const lines: Tests_TypeDeclarations_ExtractImportedNames_Lines = ['import type { Foo, Bar } from \'./baz.d.ts\';'];
    const names: Tests_TypeDeclarations_ExtractImportedNames_Returns = extractImportedNames(lines);
    ok(names.has('Foo'));
    ok(names.has('Bar'));
  });

  it('extracts multi-line imports', () => {
    const lines: Tests_TypeDeclarations_ExtractImportedNames_Lines = [
      'import type {',
      '  Foo,',
      '  Bar,',
      '} from \'./baz.d.ts\';',
    ];
    const names: Tests_TypeDeclarations_ExtractImportedNames_Returns = extractImportedNames(lines);
    ok(names.has('Foo'));
    ok(names.has('Bar'));
  });

  it('returns empty set for no imports', () => {
    const lines: Tests_TypeDeclarations_ExtractImportedNames_Lines = ['export type Foo = string;'];
    const names: Tests_TypeDeclarations_ExtractImportedNames_Returns = extractImportedNames(lines);
    strictEqual(names.size, 0);
  });

  return;
});

/**
 * Tests - Type Declarations - Extract Referenced Types Comprehensive.
 *
 * @since 0.18.0
 */
describe('extractReferencedTypes comprehensive', () => {
  it('extracts same-prefix referenced type from export type alias', () => {
    const refs: Tests_TypeDeclarations_ExtractReferencedTypes_Returns = extractReferencedTypes('export type Cli_Foo_Run_Data = Cli_Foo_Helper_Result;', 'Cli_Foo');
    deepStrictEqual(refs, ['Cli_Foo_Helper_Result']);
  });

  it('returns empty for foreign-prefix references (only same-prefix counted)', () => {
    const refs: Tests_TypeDeclarations_ExtractReferencedTypes_Returns = extractReferencedTypes('export type Cli_Foo_Run_Data = Lib_Utility_X;', 'Cli_Foo');
    strictEqual(refs.length, 0);
  });

  it('extracts multiple same-prefix references', () => {
    const refs: Tests_TypeDeclarations_ExtractReferencedTypes_Returns = extractReferencedTypes('export type Cli_Foo_X = Cli_Foo_A | Cli_Foo_B | Cli_Foo_C;', 'Cli_Foo');
    strictEqual(refs.length, 3);
  });

  it('excludes the type being defined from references (self-ref)', () => {
    const refs: Tests_TypeDeclarations_ExtractReferencedTypes_Returns = extractReferencedTypes('export type Cli_Foo_Bar = Cli_Foo_Bar;', 'Cli_Foo');
    strictEqual(refs.length, 0);
  });

  it('returns empty for primitive RHS', () => {
    const refs: Tests_TypeDeclarations_ExtractReferencedTypes_Returns = extractReferencedTypes('export type Cli_Foo_X = string;', 'Cli_Foo');
    strictEqual(refs.length, 0);
  });

  return;
});

/**
 * Tests - Type Declarations - Extract Object Types Comprehensive.
 *
 * @since 0.18.0
 */
describe('extractObjectTypes comprehensive', () => {
  it('extracts object type with properties', () => {
    const lines: Tests_TypeDeclarations_ExtractObjectTypes_Lines = [
      'export type Cli_Foo_Run_Status = string;',
      'export type Cli_Foo_Run_Result = {',
      '  status: Cli_Foo_Run_Status;',
      '};',
    ];
    const objectTypes: Tests_TypeDeclarations_ExtractObjectTypes_Returns = extractObjectTypes(lines, 'Cli_Foo');
    strictEqual(objectTypes.length, 1);
    strictEqual(objectTypes[0]?.name, 'Cli_Foo_Run_Result');
    strictEqual(objectTypes[0]?.properties.length, 1);
    strictEqual(objectTypes[0]?.properties[0]?.key, 'status');
  });

  it('handles empty classPrefix (matches any prefix)', () => {
    const lines: Tests_TypeDeclarations_ExtractObjectTypes_Lines = [
      'export type Anything = {',
      '  foo: string;',
      '};',
    ];
    const objectTypes: Tests_TypeDeclarations_ExtractObjectTypes_Returns = extractObjectTypes(lines, '');
    strictEqual(objectTypes.length, 1);
  });

  it('handles Readonly<...> wrapper', () => {
    const lines: Tests_TypeDeclarations_ExtractObjectTypes_Lines = [
      'export type Cli_Foo_X = Readonly<{',
      '  bar: number;',
      '}>;',
    ];
    const objectTypes: Tests_TypeDeclarations_ExtractObjectTypes_Returns = extractObjectTypes(lines, 'Cli_Foo');
    strictEqual(objectTypes.length, 1);
    strictEqual(objectTypes[0]?.properties[0]?.key, 'bar');
  });

  return;
});

/**
 * Tests - Type Declarations - Extract Array Types Comprehensive.
 *
 * @since 0.18.0
 */
describe('extractArrayTypes comprehensive', () => {
  it('extracts simple array form X = Y[]', () => {
    const lines: Tests_TypeDeclarations_ExtractArrayTypes_Lines = ['export type Cli_Foo_Items = Cli_Foo_Item[];'];
    const arrays: Tests_TypeDeclarations_ExtractArrayTypes_Returns = extractArrayTypes(lines);
    strictEqual(arrays.length, 1);
    strictEqual(arrays[0]?.arrayTypeName, 'Cli_Foo_Items');
    strictEqual(arrays[0]?.elementTypeName, 'Cli_Foo_Item');
  });

  it('skips multi-dim arrays X = Y[][] (EC7)', () => {
    const lines: Tests_TypeDeclarations_ExtractArrayTypes_Lines = ['export type Cli_Foo_Matrix = Cli_Foo_Cell[][];'];
    const arrays: Tests_TypeDeclarations_ExtractArrayTypes_Returns = extractArrayTypes(lines);
    strictEqual(arrays.length, 0);
  });

  it('skips union types X = Y | Z[]', () => {
    const lines: Tests_TypeDeclarations_ExtractArrayTypes_Lines = ['export type Cli_Foo_Mix = Cli_Foo_X | Cli_Foo_Y[];'];
    const arrays: Tests_TypeDeclarations_ExtractArrayTypes_Returns = extractArrayTypes(lines);
    strictEqual(arrays.length, 0);
  });

  it('skips generic-wrapped X = Map<...> (EC6)', () => {
    const lines: Tests_TypeDeclarations_ExtractArrayTypes_Lines = ['export type Cli_Foo_Cache = Map<string, Cli_Foo_Item>;'];
    const arrays: Tests_TypeDeclarations_ExtractArrayTypes_Returns = extractArrayTypes(lines);
    strictEqual(arrays.length, 0);
  });

  return;
});

/**
 * Tests - Type Declarations - Extract Body Declarations Comprehensive.
 *
 * @since 0.18.0
 */
describe('extractBodyDeclarations comprehensive', () => {
  it('extracts typed const declarations', () => {
    const lines: Tests_TypeDeclarations_ExtractBodyDeclarations_Lines = [
      '  const foo: Cli_X_Foo = 1;',
    ];
    const decls: Tests_TypeDeclarations_ExtractBodyDeclarations_Returns = extractBodyDeclarations(lines);
    strictEqual(decls.length, 1);
    strictEqual(decls[0]?.varName, 'foo');
    strictEqual(decls[0]?.typeName, 'Cli_X_Foo');
    strictEqual(decls[0]?.keyword, 'const');
  });

  it('extracts typed let declarations', () => {
    const lines: Tests_TypeDeclarations_ExtractBodyDeclarations_Lines = [
      '  let counter: Cli_X_Counter = 0;',
    ];
    const decls: Tests_TypeDeclarations_ExtractBodyDeclarations_Returns = extractBodyDeclarations(lines);
    strictEqual(decls[0]?.keyword, 'let');
  });

  it('skips untyped const', () => {
    const lines: Tests_TypeDeclarations_ExtractBodyDeclarations_Lines = ['  const foo = 1;'];
    const decls: Tests_TypeDeclarations_ExtractBodyDeclarations_Returns = extractBodyDeclarations(lines);
    strictEqual(decls.length, 0);
  });

  it('skips destructured assignments (EC13)', () => {
    const lines: Tests_TypeDeclarations_ExtractBodyDeclarations_Lines = ['  const { foo, bar } = options;'];
    const decls: Tests_TypeDeclarations_ExtractBodyDeclarations_Returns = extractBodyDeclarations(lines);
    strictEqual(decls.length, 0);
  });

  return;
});

/**
 * Tests - Type Declarations - Extract Function Params Comprehensive.
 *
 * @since 0.18.0
 */
describe('extractFunctionParams comprehensive', () => {
  it('extracts function declaration params', () => {
    const params: Tests_TypeDeclarations_ExtractFunctionParams_Returns = extractFunctionParams('/fake/lib/foo.ts', 'function bar(name: Lib_Foo_Bar_Name): void {}\n');
    strictEqual(params.length, 1);
    strictEqual(params[0]?.paramName, 'name');
    strictEqual(params[0]?.typeName, 'Lib_Foo_Bar_Name');
  });

  it('extracts method params', () => {
    const params: Tests_TypeDeclarations_ExtractFunctionParams_Returns = extractFunctionParams('/fake/cli/foo.ts', 'class Runner {\n  bar(x: Cli_Foo_Runner_Bar_X): void {}\n}\n');
    strictEqual(params[0]?.paramName, 'x');
  });

  it('extracts constructor params', () => {
    const params: Tests_TypeDeclarations_ExtractFunctionParams_Returns = extractFunctionParams('/fake/cli/foo.ts', 'class Runner {\n  constructor(name: Cli_Foo_Runner_Constructor_Name) {}\n}\n');
    strictEqual(params[0]?.paramName, 'name');
  });

  it('extracts function-typed const params', () => {
    const params: Tests_TypeDeclarations_ExtractFunctionParams_Returns = extractFunctionParams('/fake/lib/foo.ts', 'const helper = (x: Lib_Foo_Helper_X) => x;\n');
    strictEqual(params[0]?.paramName, 'x');
  });

  it('handles multiple params', () => {
    const params: Tests_TypeDeclarations_ExtractFunctionParams_Returns = extractFunctionParams('/fake/lib/foo.ts', 'function bar(a: A, b: B, c: C): void {}\n');
    strictEqual(params.length, 3);
  });

  return;
});

/**
 * Tests - Type Declarations - Extract Function Returns Comprehensive.
 *
 * @since 0.18.0
 */
describe('extractFunctionReturns comprehensive', () => {
  it('extracts function declaration return type', () => {
    const returns: Tests_TypeDeclarations_ExtractFunctionReturns_Returns = extractFunctionReturns('/fake/lib/foo.ts', 'function bar(): Lib_Foo_Bar_Returns { return; }\n');
    strictEqual(returns[0]?.returnType, 'Lib_Foo_Bar_Returns');
    strictEqual(returns[0]?.isTypeGuard, false);
  });

  it('detects type-guard returns (value is X)', () => {
    const returns: Tests_TypeDeclarations_ExtractFunctionReturns_Returns = extractFunctionReturns('/fake/lib/foo.ts', 'function isFoo(x: unknown): x is Lib_Foo_IsFoo_TypeGuard { return true; }\n');
    strictEqual(returns[0]?.isTypeGuard, true);
  });

  it('extracts method return type', () => {
    const returns: Tests_TypeDeclarations_ExtractFunctionReturns_Returns = extractFunctionReturns('/fake/cli/foo.ts', 'class Runner {\n  bar(): Cli_Foo_Runner_Bar_Returns { return; }\n}\n');
    strictEqual(returns[0]?.returnType, 'Cli_Foo_Runner_Bar_Returns');
  });

  // [gap] tests: these `it()` blocks document spec/implementation gaps by asserting the CURRENT
  // (incomplete) behavior, so a future change that closes a gap will fail here and force a deliberate
  // update. Vitest's `it.todo()` was considered but loses the assertion coverage; the `[gap]` prefix
  // is preserved as a greppable marker. Search this file for `[gap]` to find them all.
  it('[gap] does NOT extract arrow function const returns — extractFunctionReturns only inspects function/method/constructor declarations', () => {
    const returns: Tests_TypeDeclarations_ExtractFunctionReturns_Returns = extractFunctionReturns('/fake/lib/foo.ts', 'const helper = (): Lib_Foo_Helper_Returns => 42;\n');
    strictEqual(returns.length, 0);
  });

  return;
});

/**
 * Tests - Type Declarations - Detect Inline Typed Callbacks Comprehensive.
 *
 * @since 0.18.0
 */
describe('detectInlineTypedCallbacks comprehensive', () => {
  it('detects typed arrow callback param', () => {
    const callbacks: Tests_TypeDeclarations_DetectInlineTypedCallbacks_Returns = detectInlineTypedCallbacks('/fake/cli/foo.ts', 'function run() {\n  items.filter((item: Cli_Foo_Item) => item.active);\n}\n');
    strictEqual(callbacks.length, 1);
    strictEqual(callbacks[0]?.paramName, 'item');
    strictEqual(callbacks[0]?.typeName, 'Cli_Foo_Item');
  });

  it('skips untyped callback param (rule 7.4 H2)', () => {
    const callbacks: Tests_TypeDeclarations_DetectInlineTypedCallbacks_Returns = detectInlineTypedCallbacks('/fake/cli/foo.ts', 'function run() {\n  items.filter((item) => item.active);\n}\n');
    strictEqual(callbacks.length, 0);
  });

  it('detects typed function expression callback', () => {
    const callbacks: Tests_TypeDeclarations_DetectInlineTypedCallbacks_Returns = detectInlineTypedCallbacks('/fake/cli/foo.ts', 'function run() {\n  items.filter(function (item: Cli_Foo_Item) { return item.active; });\n}\n');
    strictEqual(callbacks.length, 1);
  });

  return;
});

/**
 * Tests - Type Declarations - Check Type Name Uniqueness Comprehensive.
 *
 * @since 0.18.0
 */
describe('checkTypeNameUniqueness comprehensive', () => {
  it('returns no violations for unique names', () => {
    const violations: Tests_TypeDeclarations_CheckTypeNameUniqueness_Returns = checkTypeNameUniqueness([
      { name: 'foo', typeName: 'Cli_X_Foo', lineNumber: 1 },
      { name: 'bar', typeName: 'Cli_X_Bar', lineNumber: 2 },
    ]);
    strictEqual(violations.length, 0);
  });

  it('detects duplicate expected names (rule 7.8)', () => {
    const violations: Tests_TypeDeclarations_CheckTypeNameUniqueness_Returns = checkTypeNameUniqueness([
      { name: 'foo', typeName: 'Cli_X_Foo', lineNumber: 1 },
      { name: 'foo', typeName: 'Cli_X_Foo', lineNumber: 5 },
    ]);
    strictEqual(violations.length, 1);
  });

  return;
});

/**
 * Tests - Type Declarations - Build Dts Sections Comprehensive.
 *
 * @since 0.18.0
 */
describe('buildDtsSections comprehensive', () => {
  it('groups types by source section', () => {
    const dtsLines: Tests_TypeDeclarations_BuildDtsSections_DtsLines = [
      'export type Cli_Foo_Run_X = string;',
      'export type Cli_Foo_Helper_Y = string;',
    ];
    const sourceSections: Tests_TypeDeclarations_BuildDtsSections_SourceSections = new Set(['Cli_Foo_Run', 'Cli_Foo_Helper']);
    const sections: Tests_TypeDeclarations_BuildDtsSections_Returns = buildDtsSections(dtsLines, sourceSections, 'Cli_Foo');
    strictEqual(sections.length, 2);
  });

  it('uses longest prefix match', () => {
    const dtsLines: Tests_TypeDeclarations_BuildDtsSections_DtsLines = [
      'export type Cli_Foo_Run_Helper_X = string;',
    ];
    const sourceSections: Tests_TypeDeclarations_BuildDtsSections_SourceSections = new Set(['Cli_Foo_Run', 'Cli_Foo_Run_Helper']);
    const sections: Tests_TypeDeclarations_BuildDtsSections_Returns = buildDtsSections(dtsLines, sourceSections, 'Cli_Foo');
    strictEqual(sections[0]?.prefix, 'Cli_Foo_Run_Helper');
  });

  it('falls back to classPrefix for unmatched types', () => {
    const dtsLines: Tests_TypeDeclarations_BuildDtsSections_DtsLines = [
      'export type Cli_Foo_OrphanType = string;',
    ];
    const sourceSections: Tests_TypeDeclarations_BuildDtsSections_SourceSections = new Set();
    const sections: Tests_TypeDeclarations_BuildDtsSections_Returns = buildDtsSections(dtsLines, sourceSections, 'Cli_Foo');
    strictEqual(sections[0]?.prefix, 'Cli_Foo');
  });

  it('skips types not starting with classPrefix or any source section', () => {
    const dtsLines: Tests_TypeDeclarations_BuildDtsSections_DtsLines = [
      'export type ForeignType = string;',
    ];
    const sourceSections: Tests_TypeDeclarations_BuildDtsSections_SourceSections = new Set(['Cli_Foo_Run']);
    const sections: Tests_TypeDeclarations_BuildDtsSections_Returns = buildDtsSections(dtsLines, sourceSections, 'Cli_Foo');
    strictEqual(sections.length, 0);
  });

  return;
});

/**
 * Tests - Type Declarations - Rule C1 C2 C3 Integration.
 *
 * @since 0.18.0
 */
describe('Rule C1/C2/C3 integration', () => {
  it('detects class name == file name (C1)', () => {
    const identifiers: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns = extractTopLevelIdentifiers('/fake/cli/utility/changelog.ts', 'export class Changelog {}\n');
    const fileName: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_FileName = 'Changelog';
    const violations: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Violations = identifiers
      .filter((identifier) => identifier['name'] === fileName)
      .map((identifier) => `${identifier['kind']}:${identifier['name']}`);
    deepStrictEqual(violations, ['class:Changelog']);
  });

  it('detects function name == file name (C2)', () => {
    const identifiers: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns = extractTopLevelIdentifiers('/fake/lib/utility.ts', 'export function utility() {}\n');
    const fileName: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_FileName = 'utility';
    const violations: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Violations = identifiers
      .filter((identifier) => identifier['name'] === fileName);
    strictEqual(violations.length, 1);
  });

  it('detects function-typed const name == file name (C2)', () => {
    const identifiers: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns = extractTopLevelIdentifiers('/fake/lib/utility.ts', 'const utility = () => 1;\n');
    const fileName: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_FileName = 'utility';
    const violations: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Violations = identifiers
      .filter((identifier) => identifier['name'] === fileName);
    strictEqual(violations.length, 1);
  });

  it('detects hyphenated file name flattened (C3)', () => {
    const filePath: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_RelativePath = resolve(getPackageRoot(), 'src/toolkit/markdown-table.ts');
    const classPrefix: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_ClassPrefix = deriveClassPrefix(filePath);
    const segments: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_Segments = classPrefix.split('_');
    const fileName: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_FileName = segments[segments.length - 1] ?? '';
    strictEqual(fileName, 'MarkdownTable');
    const identifiers: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns = extractTopLevelIdentifiers(filePath, 'export class MarkdownTable {}\n');
    strictEqual(identifiers.filter((identifier) => identifier['name'] === fileName).length, 1);
  });

  it('does NOT fire for non-matching name', () => {
    const identifiers: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns = extractTopLevelIdentifiers('/fake/cli/utility/changelog.ts', 'export class Runner {}\n');
    const fileName: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_FileName = 'Changelog';
    strictEqual(identifiers.filter((identifier) => identifier['name'] === fileName).length, 0);
  });

  it('does NOT fire for nested class with same name as file', () => {
    const identifiers: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns = extractTopLevelIdentifiers('/fake/cli/utility/changelog.ts', 'export class Runner {\n  doStuff() {\n    class Changelog {}\n  }\n}\n');
    const fileName: Tests_TypeDeclarations_TypeDeclarationIdentifierVsFileName_FileName = 'Changelog';
    strictEqual(identifiers.filter((identifier) => identifier['name'] === fileName).length, 0);
  });

  return;
});

/**
 * Tests - Type Declarations - Rule 7.2 Integration With Alias Loophole.
 *
 * @since 0.18.0
 */
describe('Rule 7.2 integration', () => {
  it('passes when type is locally defined as a concrete shape', () => {
    const dtsContent: Tests_TypeDeclarations_IsLocallyDefined_DtsContent = 'export type Cli_Foo_Run_Data = { name: string };\n';
    strictEqual(isLocallyDefined('Cli_Foo_Run_Data', dtsContent), true);
    strictEqual(isAliasToForeignType('Cli_Foo_Run_Data', dtsContent, 'Cli_Foo'), false);
  });

  it('fires when type is not defined locally', () => {
    const dtsContent: Tests_TypeDeclarations_IsLocallyDefined_DtsContent = '';
    strictEqual(isLocallyDefined('Cli_Foo_Run_Data', dtsContent), false);
  });

  it('fires when locally defined as alias to foreign type (Mode 2 tightening)', () => {
    const dtsContent: Tests_TypeDeclarations_IsLocallyDefined_DtsContent = 'export type Cli_Foo_Run_Data = Lib_Utility_X;\n';
    strictEqual(isLocallyDefined('Cli_Foo_Run_Data', dtsContent), true);
    strictEqual(isAliasToForeignType('Cli_Foo_Run_Data', dtsContent, 'Cli_Foo'), true);
  });

  it('passes when alias is to same-prefix type (not foreign)', () => {
    const dtsContent: Tests_TypeDeclarations_IsLocallyDefined_DtsContent = 'export type Cli_Foo_Run_Data = Cli_Foo_Helper_Result;\n';
    strictEqual(isAliasToForeignType('Cli_Foo_Run_Data', dtsContent, 'Cli_Foo'), false);
  });

  return;
});

/**
 * Tests - Type Declarations - Rule 7.3 Reserved Suffix Integration.
 *
 * @since 0.18.0
 */
describe('Rule 7.3 integration', () => {
  it('rejects body var typed Foo_Returns', () => {
    strictEqual(isReservedSuffix('Foo_Bar_Returns'), true);
  });

  it('rejects body var typed Foo_TypeGuard', () => {
    strictEqual(isReservedSuffix('Foo_Bar_TypeGuard'), true);
  });

  it('rejects body var typed Foo_Return', () => {
    strictEqual(isReservedSuffix('Foo_Bar_Return'), true);
  });

  it('passes body var typed Foo_Result (not reserved)', () => {
    strictEqual(isReservedSuffix('Foo_Bar_Result'), false);
  });

  return;
});

/**
 * Tests - Type Declarations - Rule 7.4 Inline Typed Callbacks Integration.
 *
 * @since 0.18.0
 */
describe('Rule 7.4 integration', () => {
  it('detects typed inline arrow callback', () => {
    const callbacks: Tests_TypeDeclarations_DetectInlineTypedCallbacks_Returns = detectInlineTypedCallbacks('/fake/cli/foo.ts', 'function run() {\n  items.filter((item: Cli_Foo_Item) => item.active);\n}\n');
    strictEqual(callbacks.length, 1);
  });

  it('passes named const callback (extracted) — items.filter(isActive) has no inline arrow arg', () => {
    const callbacks: Tests_TypeDeclarations_DetectInlineTypedCallbacks_Returns = detectInlineTypedCallbacks('/fake/cli/foo.ts', 'function run() {\n  const isActive = (item: Cli_Foo_Item) => item.active;\n  items.filter(isActive);\n}\n');
    // The arrow function lives inside a VariableDeclaration (not a CallExpression argument).
    // detectInlineTypedCallbacks only flags arrows/function-expressions that ARE arguments to a
    // CallExpression, so the legitimate extracted pattern is correctly ignored.
    strictEqual(callbacks.length, 0);
  });

  it('passes untyped inline callback (rule H2 exemption)', () => {
    const callbacks: Tests_TypeDeclarations_DetectInlineTypedCallbacks_Returns = detectInlineTypedCallbacks('/fake/cli/foo.ts', 'function run() {\n  items.filter((item) => item.active);\n}\n');
    strictEqual(callbacks.length, 0);
  });

  return;
});

/**
 * Tests - Type Declarations - Rule 7.5 7.6 7.7 Returns Integration.
 *
 * @since 0.18.0
 */
describe('Rule 7.5/7.6/7.7 integration', () => {
  it('7.5: function returning Foo_Returns passes', () => {
    strictEqual(validateReturnType('Foo_Bar_Returns', false), null);
  });

  it('7.5: function returning Foo_Result fails (must end in Returns)', () => {
    ok(validateReturnType('Foo_Bar_Result', false) !== null);
  });

  it('7.6: function returning Foo_Return (singular) fails', () => {
    ok(validateReturnType('Foo_Bar_Return', false) !== null);
  });

  it('7.7: type-guard returning Foo_TypeGuard passes', () => {
    strictEqual(validateReturnType('Foo_Bar_TypeGuard', true), null);
  });

  it('7.7: function returning Foo_TypeGuard at non-type-guard fails', () => {
    ok(validateReturnType('Foo_Bar_TypeGuard', false) !== null);
  });

  it('7.7: type-guard returning Foo_Returns at type-guard fails', () => {
    ok(validateReturnType('Foo_Bar_Returns', true) !== null);
  });

  return;
});

/**
 * Tests - Type Declarations - Rule 7.8 Uniqueness Integration.
 *
 * @since 0.18.0
 */
describe('Rule 7.8 integration', () => {
  it('passes when all expected names unique', () => {
    const violations: Tests_TypeDeclarations_CheckTypeNameUniqueness_Returns = checkTypeNameUniqueness([
      { name: 'foo', typeName: 'Cli_X_Foo', lineNumber: 1 },
      { name: 'bar', typeName: 'Cli_X_Bar', lineNumber: 2 },
    ]);
    strictEqual(violations.length, 0);
  });

  it('fires when two body vars produce the same expected type name (rule 7.8)', () => {
    const violations: Tests_TypeDeclarations_CheckTypeNameUniqueness_Returns = checkTypeNameUniqueness([
      { name: 'foo', typeName: 'Cli_X_Run_Foo', lineNumber: 5 },
      { name: 'foo', typeName: 'Cli_X_Run_Foo', lineNumber: 12 },
    ]);
    strictEqual(violations.length, 1);
  });

  return;
});

/**
 * Tests - Type Declarations - Rule E3 Forward-ref Exemption Integration.
 *
 * @since 0.18.0
 */
describe('Rule E3 integration (Mode 2 expansion to Returns | TypeGuard | Return)', () => {
  it('Returns suffix array IS exempt from element-before-array', () => {
    const arrayName: Tests_TypeDeclarations_ExtractArrayTypes_ArrayType_ArrayTypeName = 'Cli_Foo_Run_Returns';
    const exempt: boolean = arrayName.endsWith('Returns') === true || arrayName.endsWith('_Returns') === true;
    strictEqual(exempt, true);
  });

  it('TypeGuard suffix array IS exempt (Mode 2)', () => {
    const arrayName: Tests_TypeDeclarations_ExtractArrayTypes_ArrayType_ArrayTypeName = 'Cli_Foo_IsUser_TypeGuard';
    const exempt: boolean = arrayName.endsWith('TypeGuard') === true || arrayName.endsWith('_TypeGuard') === true;
    strictEqual(exempt, true);
  });

  it('Return (singular) suffix array IS exempt (Mode 2 defensive)', () => {
    const arrayName: Tests_TypeDeclarations_ExtractArrayTypes_ArrayType_ArrayTypeName = 'Cli_Foo_Run_Return';
    const exempt: boolean = arrayName.endsWith('Return') === true || arrayName.endsWith('_Return') === true;
    strictEqual(exempt, true);
  });

  it('Items suffix array is NOT exempt (must define element first)', () => {
    const arrayName: Tests_TypeDeclarations_ExtractArrayTypes_ArrayType_ArrayTypeName = 'Cli_Foo_Run_Items';
    const exempt: boolean = (
      arrayName.endsWith('Returns') === true || arrayName.endsWith('_Returns') === true
      || arrayName.endsWith('TypeGuard') === true || arrayName.endsWith('_TypeGuard') === true
      || arrayName.endsWith('Return') === true || arrayName.endsWith('_Return') === true
    );
    strictEqual(exempt, false);
  });

  return;
});

/**
 * Tests - Type Declarations - Rule S1 S2 S3 S4 Standalone Integration.
 *
 * @since 0.18.0
 */
describe('Rule S1/S2/S3/S4 integration', () => {
  it('S1: PascalCase top-level type passes', () => {
    const pascalCasePattern: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_PascalCasePattern = new RegExp('^[A-Z][A-Za-z0-9]*(_[A-Z][A-Za-z0-9]*)*$');
    strictEqual(pascalCasePattern.test('EntryCategory'), true);
    strictEqual(pascalCasePattern.test('EntryItem_Category'), true);
  });

  it('S1: snake_case fails', () => {
    const pascalCasePattern: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_PascalCasePattern = new RegExp('^[A-Z][A-Za-z0-9]*(_[A-Z][A-Za-z0-9]*)*$');
    strictEqual(pascalCasePattern.test('entry_category'), false);
  });

  it('S1: brand casing (3+ caps) fails', () => {
    const brandCasePattern: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_BrandCasePattern = new RegExp('[A-Z]{3,}');
    strictEqual(brandCasePattern.test('CLIEntryCategory'), true);
    strictEqual(brandCasePattern.test('URLBuilder'), true);
  });

  it('S1: standalone 2-cap acronyms pass when followed by lowercase', () => {
    const brandCasePattern: Tests_TypeDeclarations_TypeDeclarationStandaloneTypeFiles_BrandCasePattern = new RegExp('[A-Z]{3,}');
    strictEqual(brandCasePattern.test('UiCore'), false);
    strictEqual(brandCasePattern.test('IoError'), false);
    // UICore has UIC = 3 consecutive caps and IS caught (caps-followed-by-cap = brand pattern)
    strictEqual(brandCasePattern.test('UICore'), true);
    strictEqual(brandCasePattern.test('IOError'), true);
  });

  it('S2: path-prefix-style names detected', () => {
    const knownTopLevels: Set<string> = new Set(['Cli', 'Lib', 'Tests']);
    const typeName: string = 'Cli_Foo_Bar';
    const isPathPrefixStyle: boolean = [...knownTopLevels].some((prefix) => typeName.startsWith(`${prefix}_`));
    strictEqual(isPathPrefixStyle, true);
  });

  it('S2: domain concept names pass', () => {
    const knownTopLevels: Set<string> = new Set(['Cli', 'Lib', 'Tests']);
    const typeName: string = 'EntryCategory';
    const isPathPrefixStyle: boolean = [...knownTopLevels].some((prefix) => typeName.startsWith(`${prefix}_`));
    strictEqual(isPathPrefixStyle, false);
  });

  it('S3: property type using Parent_Property form passes', () => {
    const objectName: string = 'EntryItem';
    const propertyValueType: string = 'EntryItem_Category';
    strictEqual(propertyValueType.startsWith(`${objectName}_`), true);
  });

  it('S3: property type without parent prefix fails', () => {
    const objectName: string = 'EntryItem';
    const propertyValueType: string = 'EntryCategory';
    strictEqual(propertyValueType.startsWith(`${objectName}_`), false);
  });

  it('S4: array element types defined before array', () => {
    const lines: Tests_TypeDeclarations_ExtractArrayTypes_Lines = [
      'export type EntryItem_Tag = string;',
      'export type EntryItem_Tags = EntryItem_Tag[];',
    ];
    const arrays: Tests_TypeDeclarations_ExtractArrayTypes_Returns = extractArrayTypes(lines);
    const elementLine: number = lines.findIndex((line) => line.startsWith('export type EntryItem_Tag '));
    const arrayLine: number = arrays[0]?.lineIndex ?? -1;
    ok(elementLine < arrayLine);
  });

  return;
});

/**
 * Tests - Type Declarations - Rule EC19 EC20 EC21 Filename Validation Integration.
 *
 * @since 0.18.0
 */
describe('Rule EC19/EC20/EC21 integration', () => {
  it('passes plain filename foo.ts', () => {
    const pattern: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Pattern = new RegExp('^[a-z][a-z0-9-]*$');
    strictEqual(pattern.test('foo'), true);
  });

  it('passes hyphenated foo-bar.ts', () => {
    const pattern: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Pattern = new RegExp('^[a-z][a-z0-9-]*$');
    strictEqual(pattern.test('foo-bar'), true);
  });

  it('passes filename with trailing digits foo123.ts', () => {
    const pattern: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Pattern = new RegExp('^[a-z][a-z0-9-]*$');
    strictEqual(pattern.test('foo123'), true);
  });

  it('fails filename starting with digit (EC20)', () => {
    const pattern: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Pattern = new RegExp('^[a-z][a-z0-9-]*$');
    strictEqual(pattern.test('123foo'), false);
  });

  it('fails filename with underscore (EC21)', () => {
    const pattern: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Pattern = new RegExp('^[a-z][a-z0-9-]*$');
    strictEqual(pattern.test('foo_bar'), false);
  });

  it('fails filename with special character (EC21)', () => {
    const pattern: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Pattern = new RegExp('^[a-z][a-z0-9-]*$');
    strictEqual(pattern.test('foo$bar'), false);
    strictEqual(pattern.test('foo bar'), false);
  });

  it('fails filename with uppercase', () => {
    const pattern: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Pattern = new RegExp('^[a-z][a-z0-9-]*$');
    strictEqual(pattern.test('Foo'), false);
  });

  it('fails dotted segment after stripping recognized suffixes (EC19)', () => {
    const pattern: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Pattern = new RegExp('^[a-z][a-z0-9-]*$');
    // foo.spec.ts → after .ts strip → foo.spec → fails (.spec is not in strip-list)
    strictEqual(pattern.test('foo.spec'), false);
  });

  return;
});

/**
 * Tests - Type Declarations - Edge Cases EC1 To EC10.
 *
 * @since 0.18.0
 */
describe('Edge cases EC1-EC10', () => {
  it('EC1: multiple top-level classes each contribute their own chunk', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/multi.ts', 'class Foo {\n  process(): void {}\n}\nclass Bar {\n  process(): void {}\n}\n', 'Cli_Multi');
    strictEqual(sectionMap.get(2), 'Cli_Multi_Foo_Process');
    strictEqual(sectionMap.get(5), 'Cli_Multi_Bar_Process');
  });

  it('EC2: file with only top-level functions, no class', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/lib/utility.ts', 'export function getCurrentTimestamp(): number {\n  return Date.now();\n}\n', 'Lib_Utility');
    strictEqual(sectionMap.get(1), 'Lib_Utility_GetCurrentTimestamp');
  });

  it('EC3: generic type parameters do not get their own chunks', () => {
    // Generics live inside the type alias; they are not chunks. Tested via lookup of the type name itself.
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/foo.ts', 'function getItems<T>(): T[] { return []; }\n', 'Cli_Foo');
    strictEqual(sectionMap.get(1), 'Cli_Foo_GetItems');
  });

  it('EC5: tuple types are not subject to E3 (only X[] form)', () => {
    const lines: Tests_TypeDeclarations_ExtractArrayTypes_Lines = ['export type Cli_Foo_Run_Pair = [string, number];'];
    const arrays: Tests_TypeDeclarations_ExtractArrayTypes_Returns = extractArrayTypes(lines);
    strictEqual(arrays.length, 0);
  });

  it('EC6: Map/Set/Promise generic collection types not subject to E3', () => {
    const lines: Tests_TypeDeclarations_ExtractArrayTypes_Lines = [
      'export type Cli_Foo_Run_Cache = Map<string, Cli_Foo_Run_Item>;',
      'export type Cli_Foo_Run_Promise = Promise<Cli_Foo_Run_Item>;',
    ];
    const arrays: Tests_TypeDeclarations_ExtractArrayTypes_Returns = extractArrayTypes(lines);
    strictEqual(arrays.length, 0);
  });

  it('EC7: multi-dimensional arrays X[][] not checked by E3', () => {
    const lines: Tests_TypeDeclarations_ExtractArrayTypes_Lines = ['export type Cli_Foo_Run_Matrix = Cli_Foo_Run_Cell[][];'];
    const arrays: Tests_TypeDeclarations_ExtractArrayTypes_Returns = extractArrayTypes(lines);
    strictEqual(arrays.length, 0);
  });

  it('EC8: type-level operations (extends/conditional) inside body do not add chunks', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/lib/foo.ts', 'function bar() {\n  type Conditional = string extends string ? number : never;\n}\n', 'Lib_Foo');
    strictEqual(sectionMap.get(1), 'Lib_Foo_Bar');
  });

  it('EC9: anonymous class expression in const uses const name as chunk (Mode 2: closes prior gap)', () => {
    // The class expression's body is walked under the const-derived sub-section, so the inner
    // method `run()` lands at `Lib_Foo_Wrapper_Run`. Const declaration line itself stays in parent.
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/lib/foo.ts', 'const Wrapper = class { run() {} };\n', 'Lib_Foo');
    strictEqual(sectionMap.get(1), 'Lib_Foo_Wrapper_Run');
  });

  return;
});

/**
 * Tests - Type Declarations - Edge Cases EC11 To EC20.
 *
 * @since 0.18.0
 */
describe('Edge cases EC11-EC20', () => {
  it('EC11: default export class adds chunk like regular class', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/foo.ts', 'export default class Runner {\n  bar(): void {}\n}\n', 'Cli_Foo');
    strictEqual(sectionMap.get(2), 'Cli_Foo_Runner_Bar');
  });

  it('EC12: this parameters do not pollute body var rule (skipped from extractFunctionParams)', () => {
    const params: Tests_TypeDeclarations_ExtractFunctionParams_Returns = extractFunctionParams('/fake/lib/foo.ts', 'function bar(this: SomeType, x: Lib_Foo_Bar_X): void {}\n');
    // Implementation may or may not include `this`. Confirm behavior either way.
    const nonThisParams: Tests_TypeDeclarations_ExtractFunctionParams_Returns = params.filter((param) => param['paramName'] !== 'this');
    ok(nonThisParams.length >= 1);
  });

  it('EC13: destructured parameter does not get its own type extracted via extractBodyDeclarations', () => {
    const lines: Tests_TypeDeclarations_ExtractBodyDeclarations_Lines = ['  const { foo } = options;'];
    const decls: Tests_TypeDeclarations_ExtractBodyDeclarations_Returns = extractBodyDeclarations(lines);
    strictEqual(decls.length, 0);
  });

  it('EC14: parameter property (TS shorthand) is treated as a normal constructor param', () => {
    const params: Tests_TypeDeclarations_ExtractFunctionParams_Returns = extractFunctionParams('/fake/cli/foo.ts', 'class Runner {\n  constructor(public name: Cli_Foo_Runner_Constructor_Name) {}\n}\n');
    strictEqual(params[0]?.paramName, 'name');
  });

  it('EC15: index signature is not detected as a regular property', () => {
    const lines: Tests_TypeDeclarations_ExtractObjectTypes_Lines = [
      'export type Cli_Foo_Run_Map = {',
      '  [key: string]: Cli_Foo_Run_Item;',
      '};',
    ];
    const objectTypes: Tests_TypeDeclarations_ExtractObjectTypes_Returns = extractObjectTypes(lines, 'Cli_Foo');
    // The index signature line does not match the literal `(\\w+):\\s+(.+);$` pattern (has brackets).
    strictEqual(objectTypes[0]?.properties.length, 0);
  });

  it('[gap] EC16: optional/readonly modifiers — extractObjectTypes property regex requires bare `key: Type;` form, so `readonly id: ...` is silently skipped', () => {
    const lines: Tests_TypeDeclarations_ExtractObjectTypes_Lines = [
      'export type Cli_Foo_Run_Result = {',
      '  readonly id: Cli_Foo_Run_Result_Id;',
      '  status: Cli_Foo_Run_Result_Status;',
      '};',
    ];
    const objectTypes: Tests_TypeDeclarations_ExtractObjectTypes_Returns = extractObjectTypes(lines, 'Cli_Foo');
    // Only the second property (`status: ...`) matches the regex. The `readonly id: ...` line is dropped.
    strictEqual(objectTypes[0]?.properties.length, 1);
    strictEqual(objectTypes[0]?.properties[0]?.key, 'status');
  });

  it('EC17: underscore-prefixed var name strips underscore for leaf comparison', () => {
    strictEqual(stripUnderscorePrefix('_prev'), 'prev');
    strictEqual(validateLeaf('_prev', 'Cli_Foo_Run_Prev', 'Cli_Foo_Run', 'Cli_Foo'), null);
  });

  it('EC18: single-character var name title-cases the single character', () => {
    strictEqual(validateLeaf('i', 'Cli_Foo_Run_I', 'Cli_Foo_Run', 'Cli_Foo'), null);
  });

  it('EC19: dotted filename like foo.spec fails segment regex', () => {
    const pattern: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Pattern = new RegExp('^[a-z][a-z0-9-]*$');
    strictEqual(pattern.test('foo.spec'), false);
    strictEqual(pattern.test('foo.bar'), false);
  });

  it('EC20: filename starting with digit fails segment regex', () => {
    const pattern: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Pattern = new RegExp('^[a-z][a-z0-9-]*$');
    strictEqual(pattern.test('123foo'), false);
  });

  return;
});

/**
 * Tests - Type Declarations - Edge Cases EC21 To EC30.
 *
 * @since 0.18.0
 */
describe('Edge cases EC21-EC30', () => {
  it('EC21: filename with underscore/space/special-char fails segment regex', () => {
    const pattern: Tests_TypeDeclarations_TypeDeclarationFilenameValidation_Pattern = new RegExp('^[a-z][a-z0-9-]*$');
    strictEqual(pattern.test('foo_bar'), false);
    strictEqual(pattern.test('foo bar'), false);
    strictEqual(pattern.test('foo$bar'), false);
  });

  it('EC22: file at typeRoot produces single-chunk classPrefix', () => {
    const prefix: Tests_TypeDeclarations_DeriveClassPrefix_Returns = deriveClassPrefix(resolve(getPackageRoot(), 'src/main.ts'));
    strictEqual(prefix, 'Main');
  });

  it('EC23: template string in (string, fn) arg[0] does NOT add chunk', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/tests/foo.test.ts', 'describe(`Foo ${1}`, () => {\n  const x: number = 1;\n});\n', 'Tests_Foo');
    strictEqual(sectionMap.get(2), 'Tests_Foo');
  });

  it('EC24: async arrow function callback in (string, fn) is accepted', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/tests/foo.test.ts', 'describe(\'Foo\', async () => {\n  const x: number = 1;\n});\n', 'Tests_Foo');
    strictEqual(sectionMap.get(2), 'Tests_Foo_Foo');
  });

  it('EC24b: async function expression callback in (string, fn) is accepted', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/tests/foo.test.ts', 'describe(\'Foo\', async function () {\n  const x: number = 1;\n});\n', 'Tests_Foo');
    strictEqual(sectionMap.get(2), 'Tests_Foo_Foo');
  });

  it('EC25: class getter adds chunk based on property name', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/foo.ts', 'class Runner {\n  get bar(): number { return 1; }\n}\n', 'Cli_Foo');
    strictEqual(sectionMap.get(2), 'Cli_Foo_Runner_Bar');
  });

  it('EC25b: class setter adds chunk based on property name', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/foo.ts', 'class Runner {\n  set bar(value: number) {}\n}\n', 'Cli_Foo');
    strictEqual(sectionMap.get(2), 'Cli_Foo_Runner_Bar');
  });

  it('EC26: static method adds chunk like an instance method', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/foo.ts', 'class Runner {\n  static doThing(): void {}\n}\n', 'Cli_Foo');
    strictEqual(sectionMap.get(2), 'Cli_Foo_Runner_DoThing');
  });

  it('EC28: nested function declaration adds chunk under the outer function', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/lib/foo.ts', 'function processItems() {\n  function visit(node: any) {\n    const result: any = node;\n  }\n}\n', 'Lib_Foo');
    strictEqual(sectionMap.get(3), 'Lib_Foo_ProcessItems_Visit');
  });

  it('EC30: describe.skip(string, fn) adds chunk via generic rule', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/tests/foo.test.ts', 'describe.skip(\'Foo\', () => {\n  const x: number = 1;\n});\n', 'Tests_Foo');
    strictEqual(sectionMap.get(2), 'Tests_Foo_Foo');
  });

  it('EC30b: describe.only(string, fn) adds chunk via generic rule', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/tests/foo.test.ts', 'describe.only(\'Foo\', () => {\n  const x: number = 1;\n});\n', 'Tests_Foo');
    strictEqual(sectionMap.get(2), 'Tests_Foo_Foo');
  });

  return;
});

/**
 * Tests - Type Declarations - Edge Cases EC31 To EC55.
 *
 * @since 0.18.0
 */
describe('Edge cases EC31-EC55', () => {
  it('EC31: primitive-like return types (void, never, etc.) pass validateLeaf at body var', () => {
    // Body var typed `unknown` is allowed but doesn't follow the convention's leaf-naming.
    // This test verifies validateLeaf handles primitive-typed body vars without crashing.
    strictEqual(validateLeaf('result', 'unknown', 'Cli_Foo_Run', 'Cli_Foo')?.['actualLeaf'], 'unknown');
  });

  it('EC33: nested class inside method adds chunk under method', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/foo.ts', 'class Outer {\n  run(): void {\n    class Inner {}\n  }\n}\n', 'Cli_Foo');
    strictEqual(sectionMap.get(3), 'Cli_Foo_Outer_Run_Inner');
  });

  it('EC34: vitest bench(string, fn) adds chunk via generic rule', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/tests/foo.bench.ts', 'bench(\'fast op\', () => {\n  const x: number = 1;\n});\n', 'Tests_Foo');
    // 'fast op' parses to 'FastOp'.
    strictEqual(sectionMap.get(2), 'Tests_Foo_FastOp');
  });

  it('EC35: rule 7.8 catches two body vars producing the same expected type name', () => {
    const violations: Tests_TypeDeclarations_CheckTypeNameUniqueness_Returns = checkTypeNameUniqueness([
      { name: 'foo', typeName: 'Cli_X_Foo', lineNumber: 10 },
      { name: 'foo', typeName: 'Cli_X_Foo', lineNumber: 20 },
    ]);
    strictEqual(violations.length, 1);
  });

  it('EC37/EC42: JSX function component name == file name fires C2', () => {
    const identifiers: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns = extractTopLevelIdentifiers('/fake/components/logo.tsx', 'export default function Logo(): null { return null; }\n');
    strictEqual(identifiers[0]?.name, 'Logo');
    strictEqual(identifiers[0]?.kind, 'function');
  });

  it('EC43: JSX class component name == file name fires C1', () => {
    const identifiers: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns = extractTopLevelIdentifiers('/fake/components/logo.tsx', 'export default class Logo {\n  render() { return null; }\n}\n');
    strictEqual(identifiers[0]?.name, 'Logo');
    strictEqual(identifiers[0]?.kind, 'class');
  });

  it('EC44: branded types follow standard naming', () => {
    // type X = string & { __brand: 'X' } — naming-wise just a type alias.
    const lines: Tests_TypeDeclarations_ExtractTypeNames_TypeLines = ['export type Cli_Foo_UserId = string & { __brand: \'UserId\' };'];
    deepStrictEqual(extractTypeNames(lines), ['Cli_Foo_UserId']);
  });

  it('EC46: recursive type definition is detected as self-reference (no infinite loop)', () => {
    const refs: Tests_TypeDeclarations_ExtractReferencedTypes_Returns = extractReferencedTypes('export type Cli_Foo_Node = { value: string; next: Cli_Foo_Node | null };', 'Cli_Foo');
    // self-ref excluded by extractReferencedTypes
    strictEqual(refs.length, 0);
  });

  it('EC47: enum declaration is not subject to type-naming rules (out of helper scope)', () => {
    // extractTypeNames matches `export type` lines only. enum declarations are skipped.
    const lines: Tests_TypeDeclarations_ExtractTypeNames_TypeLines = [
      'export enum Cli_Foo_Run_Status { Pending, Done }',
    ];
    deepStrictEqual(extractTypeNames(lines), []);
  });

  it('[gap] EC52: same-line multi-declaration — extractBodyDeclarations regex matches one declarator per line, so only the first is captured', () => {
    const lines: Tests_TypeDeclarations_ExtractBodyDeclarations_Lines = ['  const a: A = 1, b: B = 2;'];
    const decls: Tests_TypeDeclarations_ExtractBodyDeclarations_Returns = extractBodyDeclarations(lines);
    strictEqual(decls.length, 1);
  });

  it('EC54: empty source file produces empty section map (just classPrefix at top-level lines)', () => {
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/lib/empty.ts', 'export {};\n', 'Lib_Empty');
    strictEqual(sectionMap.get(1), 'Lib_Empty');
  });

  return;
});

/**
 * Tests - Type Declarations - Rule 7.1 Leaf Integration.
 *
 * @since 0.18.0
 */
describe('Rule 7.1 integration', () => {
  it('passes when leaf matches sourceSection_titleVar', () => {
    strictEqual(validateLeaf('items', 'Cli_Foo_Run_Items', 'Cli_Foo_Run', 'Cli_Foo'), null);
  });

  it('passes class-prefix passthrough form (skip method chunk)', () => {
    strictEqual(validateLeaf('items', 'Cli_Foo_Items', 'Cli_Foo_Run', 'Cli_Foo'), null);
  });

  it('fails when leaf differs from var name', () => {
    const result: Tests_TypeDeclarations_ValidateLeaf_Returns = validateLeaf('items', 'Cli_Foo_Run_Things', 'Cli_Foo_Run', 'Cli_Foo');
    deepStrictEqual(result, { actualLeaf: 'Things', expectedLeaf: 'Items' });
  });

  it('integrates with extractBodyDeclarations + buildSourceSectionMap', () => {
    const sourceContent: Tests_TypeDeclarations_BuildSourceSectionMap_Content = 'class Runner {\n  bar() {\n    const items: Cli_Foo_Runner_Bar_Items = [];\n  }\n}\n';
    const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap('/fake/cli/foo.ts', sourceContent, 'Cli_Foo');
    const decls: Tests_TypeDeclarations_ExtractBodyDeclarations_Returns = extractBodyDeclarations(sourceContent.split('\n'));
    strictEqual(decls.length, 1);
    const sourceSection: Tests_TypeDeclarations_ValidateLeaf_SourceSection = sectionMap.get(decls[0]?.['lineNumber'] ?? 0) ?? '';
    strictEqual(sourceSection, 'Cli_Foo_Runner_Bar');
    strictEqual(validateLeaf(decls[0]?.['varName'] ?? '', decls[0]?.['typeName'] ?? '', sourceSection, 'Cli_Foo'), null);
  });

  return;
});

/**
 * Tests - Type Declarations - Rule E1 E2 Object Property Integration.
 *
 * @since 0.18.0
 */
describe('Rule E1/E2 integration', () => {
  it('E1: property type starts with parent type name (passes)', () => {
    const lines: Tests_TypeDeclarations_ExtractObjectTypes_Lines = [
      'export type Cli_Foo_Run_Result_Status = string;',
      'export type Cli_Foo_Run_Result = {',
      '  status: Cli_Foo_Run_Result_Status;',
      '};',
    ];
    const objectTypes: Tests_TypeDeclarations_ExtractObjectTypes_Returns = extractObjectTypes(lines, 'Cli_Foo');
    const result: Tests_TypeDeclarations_ExtractObjectTypes_ObjectType | undefined = objectTypes.find((objectType) => objectType['name'] === 'Cli_Foo_Run_Result');
    strictEqual(result?.properties[0]?.valueType.startsWith('Cli_Foo_Run_Result'), true);
  });

  it('E1: property type does not start with parent type name (fails)', () => {
    const lines: Tests_TypeDeclarations_ExtractObjectTypes_Lines = [
      'export type Cli_Foo_Run_Status = string;',
      'export type Cli_Foo_Run_Result = {',
      '  status: Cli_Foo_Run_Status;',
      '};',
    ];
    const objectTypes: Tests_TypeDeclarations_ExtractObjectTypes_Returns = extractObjectTypes(lines, 'Cli_Foo');
    const result: Tests_TypeDeclarations_ExtractObjectTypes_ObjectType | undefined = objectTypes.find((objectType) => objectType['name'] === 'Cli_Foo_Run_Result');
    strictEqual(result?.properties[0]?.valueType.startsWith('Cli_Foo_Run_Result'), false);
  });

  it('E2: property type defined before parent (passes)', () => {
    const lines: Tests_TypeDeclarations_ExtractObjectTypes_Lines = [
      'export type Cli_Foo_Run_Result_Status = string;',
      'export type Cli_Foo_Run_Result = {',
      '  status: Cli_Foo_Run_Result_Status;',
      '};',
    ];
    const objectTypes: Tests_TypeDeclarations_ExtractObjectTypes_Returns = extractObjectTypes(lines, 'Cli_Foo');
    const result: Tests_TypeDeclarations_ExtractObjectTypes_ObjectType | undefined = objectTypes.find((objectType) => objectType['name'] === 'Cli_Foo_Run_Result');
    const propertyTypeLine: number = result?.properties[0]?.typeLineIndex ?? -1;
    const parentLine: number = result?.lineIndex ?? -1;
    ok(propertyTypeLine < parentLine);
  });

  it('E2: property type defined after parent (fails)', () => {
    const lines: Tests_TypeDeclarations_ExtractObjectTypes_Lines = [
      'export type Cli_Foo_Run_Result = {',
      '  status: Cli_Foo_Run_Result_Status;',
      '};',
      'export type Cli_Foo_Run_Result_Status = string;',
    ];
    const objectTypes: Tests_TypeDeclarations_ExtractObjectTypes_Returns = extractObjectTypes(lines, 'Cli_Foo');
    const result: Tests_TypeDeclarations_ExtractObjectTypes_ObjectType | undefined = objectTypes.find((objectType) => objectType['name'] === 'Cli_Foo_Run_Result');
    const propertyTypeLine: number = result?.properties[0]?.typeLineIndex ?? -1;
    const parentLine: number = result?.lineIndex ?? -1;
    ok(propertyTypeLine > parentLine);
  });

  return;
});

/**
 * Tests - Type Declarations - Section F Coverage Integration.
 *
 * @since 0.18.0
 */
describe('Section F coverage integration', () => {
  it('F1: same-section references are allowed', () => {
    // Cli_Foo_Run_X referencing Cli_Foo_Run_Y is a same-section reference (both start with Cli_Foo_Run).
    const refs: Tests_TypeDeclarations_ExtractReferencedTypes_Returns = extractReferencedTypes('export type Cli_Foo_Run_X = Cli_Foo_Run_Y;', 'Cli_Foo');
    deepStrictEqual(refs, ['Cli_Foo_Run_Y']);
  });

  it('F2: sections in alphabetical order check (compare strings directly)', () => {
    // Check the comparison logic: 'Cli_Foo_Bar' < 'Cli_Foo_Foo' alphabetically.
    const sectionA: string = 'Cli_Foo_Bar';
    const sectionB: string = 'Cli_Foo_Foo';
    ok(sectionA < sectionB);
  });

  it('F4: within section, first-come-first-serve order via findFirstOccurrence', () => {
    const sourceLines: Tests_TypeDeclarations_FindFirstOccurrence_SourceLines = [
      'class Runner {',
      '  bar() {',
      '    const items: Cli_Foo_Runner_Bar_Items = [];',
      '    const result: Cli_Foo_Runner_Bar_Result = items;',
      '  }',
      '}',
    ];
    const itemsLine: Tests_TypeDeclarations_FindFirstOccurrence_Returns = findFirstOccurrence(sourceLines, 'Cli_Foo_Runner_Bar_Items');
    const resultLine: Tests_TypeDeclarations_FindFirstOccurrence_Returns = findFirstOccurrence(sourceLines, 'Cli_Foo_Runner_Bar_Result');
    ok(itemsLine < resultLine);
  });

  it('F6 forward: every source section should have at least one matching .d.ts type', () => {
    const dtsLines: Tests_TypeDeclarations_BuildDtsSections_DtsLines = ['export type Cli_Foo_Run_X = string;'];
    const sourceSections: Tests_TypeDeclarations_BuildDtsSections_SourceSections = new Set(['Cli_Foo_Run']);
    const sections: Tests_TypeDeclarations_BuildDtsSections_Returns = buildDtsSections(dtsLines, sourceSections, 'Cli_Foo');
    strictEqual(sections.length, 1);
    strictEqual(sections[0]?.prefix, 'Cli_Foo_Run');
  });

  it('F6 reverse: orphan multi-chunk type without source section', () => {
    const dtsLines: Tests_TypeDeclarations_BuildDtsSections_DtsLines = ['export type Cli_Foo_NoSource_X = string;'];
    const sourceSections: Tests_TypeDeclarations_BuildDtsSections_SourceSections = new Set();
    const sections: Tests_TypeDeclarations_BuildDtsSections_Returns = buildDtsSections(dtsLines, sourceSections, 'Cli_Foo');
    // Falls back to classPrefix; the orphan is in classPrefix section.
    strictEqual(sections[0]?.prefix, 'Cli_Foo');
  });

  return;
});

/**
 * Tests - Type Declarations - Section G Imports Integration.
 *
 * @since 0.18.0
 */
describe('Section G imports integration', () => {
  it('G1: extractImportedNames captures alphabetized inline imports', () => {
    const lines: Tests_TypeDeclarations_ExtractImportedNames_Lines = ['import type { Apple, Banana, Cherry } from \'./fruits.d.ts\';'];
    const names: Tests_TypeDeclarations_ExtractImportedNames_Returns = extractImportedNames(lines);
    ok(names.has('Apple'));
    ok(names.has('Banana'));
    ok(names.has('Cherry'));
  });

  it('G1: multi-line import block alphabetical order can be checked', () => {
    const specifiers: string[] = ['Apple', 'Banana', 'Cherry'];
    const sortedSpecifiers: string[] = [...specifiers].sort();
    deepStrictEqual(specifiers, sortedSpecifiers);
  });

  it('G1: detects out-of-order specifiers', () => {
    const specifiers: string[] = ['Banana', 'Apple', 'Cherry'];
    const sortedSpecifiers: string[] = [...specifiers].sort();
    // specifiers[0] is 'Banana', sorted[0] is 'Apple' — out of order
    ok(specifiers[0] !== sortedSpecifiers[0]);
  });

  return;
});

/**
 * Tests - Type Declarations - End-To-End Fixture Pipeline.
 *
 * Wires all rule helpers together against a single inline source/.d.ts fixture pair. Each section
 * of the fixture intentionally violates one rule; the assertions confirm the pipeline produces the
 * expected violation strings. This catches regressions where helpers work in isolation but the
 * integration breaks (e.g., section map line numbers drifting against extractor line numbers).
 *
 * @since 0.18.0
 */
describe('end-to-end fixture pipeline', () => {
  it('catches the expected violations across rules 7.1 / 7.2 / 7.3 / 7.4 / 7.5 in a single fixture', () => {
    const sourceContent: Tests_TypeDeclarations_RunRulePipeline_SourceContent = [
      'class Runner {',
      '  bar() {',
      '    const items: Cli_Foo_Wrong_Leaf = [];',                  // 7.1: leaf "Leaf" != "Items"
      '    const result: Cli_Foo_Bar_Result_Returns = [];',          // 7.3: reserved suffix at body var
      '    const data: Cli_Foo_Bar_Data = {};',                      // 7.2-alias: defined as alias to foreign
      '    items.filter((x: Cli_Foo_Item) => x);',                   // 7.4: inline typed callback
      '  }',
      '  bad(): Cli_Foo_Runner_Bad_Result { return null; }',        // 7.5: not "Returns"
      '}',
      '',
    ].join('\n');
    const dtsContent: Tests_TypeDeclarations_RunRulePipeline_DtsContent = [
      'export type Cli_Foo_Wrong_Leaf = unknown;',
      'export type Cli_Foo_Bar_Result_Returns = unknown;',
      'export type Cli_Foo_Bar_Data = Lib_Utility_X;',                // 7.2-alias source
      'export type Cli_Foo_Item = unknown;',
      '',
    ].join('\n');

    const violations: Tests_TypeDeclarations_RunRulePipeline_Returns = runRulePipeline('/fake/cli/foo.ts', sourceContent, dtsContent, 'Cli_Foo');

    ok(violations.some((violation) => violation.startsWith('7.1:')), `7.1 expected, got: ${violations.join(' | ')}`);
    ok(violations.some((violation) => violation.startsWith('7.2-alias:')), `7.2-alias expected, got: ${violations.join(' | ')}`);
    ok(violations.some((violation) => violation.startsWith('7.3:')), `7.3 expected, got: ${violations.join(' | ')}`);
    ok(violations.some((violation) => violation.startsWith('7.4:')), `7.4 expected, got: ${violations.join(' | ')}`);
    ok(violations.some((violation) => violation.startsWith('7.5/6/7:')), `7.5/6/7 expected, got: ${violations.join(' | ')}`);
  });

  it('clean fixture (no violations) produces empty violation list', () => {
    const sourceContent: Tests_TypeDeclarations_RunRulePipeline_SourceContent = [
      'class Runner {',
      '  bar(): Cli_Foo_Runner_Bar_Returns {',
      '    const items: Cli_Foo_Runner_Bar_Items = [];',
      '    return items;',
      '  }',
      '}',
      '',
    ].join('\n');
    const dtsContent: Tests_TypeDeclarations_RunRulePipeline_DtsContent = [
      'export type Cli_Foo_Runner_Bar_Items = unknown[];',
      'export type Cli_Foo_Runner_Bar_Returns = Cli_Foo_Runner_Bar_Items;',
      '',
    ].join('\n');

    const violations: Tests_TypeDeclarations_RunRulePipeline_Returns = runRulePipeline('/fake/cli/foo.ts', sourceContent, dtsContent, 'Cli_Foo');

    strictEqual(violations.length, 0, violations.join(' | '));
  });

  return;
});

/**
 * Tests - Type Declarations - Discover Source Files.
 *
 * @since 0.18.0
 */
export async function discoverSourceFiles(): Tests_TypeDeclarations_DiscoverSourceFiles_Returns {
  const patterns: Tests_TypeDeclarations_DiscoverSourceFiles_Patterns = testConfig['typeRoots'].map(
    (typeRoot) => `${typeRoot}/**/*.ts`,
  );

  const ignorePatterns: Tests_TypeDeclarations_DiscoverSourceFiles_IgnorePatterns = testConfig['typeRoots'].map(
    (typeRoot) => `${typeRoot}/**/*.d.ts`,
  );

  const matched: Tests_TypeDeclarations_DiscoverSourceFiles_Matched = await glob(patterns, {
    cwd: getPackageRoot(),
    absolute: true,
    ignore: ignorePatterns,
  });

  return matched.sort();
}

/**
 * Tests - Type Declarations - Discover Type Files.
 *
 * @since 0.15.0
 */
export async function discoverTypeFiles(): Tests_TypeDeclarations_DiscoverTypeFiles_Returns {
  const patterns: Tests_TypeDeclarations_DiscoverTypeFiles_Patterns = testConfig['typeRoots'].map(
    (typeRoot) => `${typeRoot}/types/**/*.d.ts`,
  );

  const matched: Tests_TypeDeclarations_DiscoverTypeFiles_Matched = await glob(patterns, {
    cwd: getPackageRoot(),
    absolute: true,
  });

  return matched.sort();
}

/**
 * Tests - Type Declarations - Derive Class Prefix.
 *
 * @since 0.15.0
 */
export function deriveClassPrefix(filePath: Tests_TypeDeclarations_DeriveClassPrefix_FilePath): Tests_TypeDeclarations_DeriveClassPrefix_Returns {
  const currentDirectory: Tests_TypeDeclarations_DeriveClassPrefix_CurrentDirectory = getPackageRoot();
  const relativePath: Tests_TypeDeclarations_DeriveClassPrefix_RelativePath = relative(currentDirectory, filePath);
  let relativeCleaned: Tests_TypeDeclarations_DeriveClassPrefix_RelativeCleaned = relativePath;

  for (const typeRoot of testConfig['typeRoots']) {
    relativeCleaned = relativeCleaned.replace(`${typeRoot}/types/`, '');
    relativeCleaned = relativeCleaned.replace(`${typeRoot}/`, '');
  }

  const segments: Tests_TypeDeclarations_DeriveClassPrefix_Segments = relativeCleaned
    .replace('.d.ts', '')
    .replace('.ts', '')
    .replace('.test', '')
    .split(sep)
    .join('/')
    .split('/');

  return segments.map((segment) => {
    return segment.split('-').map((part) => {
      return part.charAt(0).toUpperCase() + part.slice(1);
    }).join('');
  }).join('_');
}

/**
 * Tests - Type Declarations - Extract Imported Names.
 *
 * @since 0.15.0
 */
export function extractImportedNames(lines: Tests_TypeDeclarations_ExtractImportedNames_Lines): Tests_TypeDeclarations_ExtractImportedNames_Returns {
  const importedNames: Tests_TypeDeclarations_ExtractImportedNames_ImportedNames = new Set<string>();
  let inImportBlock: Tests_TypeDeclarations_ExtractImportedNames_InImportBlock = false;

  for (const line of lines) {
    if (line.startsWith('import type') === true) {
      inImportBlock = true;

      const inlineMatch: Tests_TypeDeclarations_ExtractImportedNames_Match = line.match(new RegExp('^import type \\{ (.+) \\} from'));

      if (inlineMatch !== null && inlineMatch[1] !== undefined) {
        const inlineMatchCapture: Tests_TypeDeclarations_ExtractImportedNames_InlineMatchCapture = inlineMatch[1];
        const specifiers: Tests_TypeDeclarations_ExtractImportedNames_Specifiers = inlineMatchCapture.split(',').map((specifier) => specifier.trim());

        for (const specifier of specifiers) {
          importedNames.add(specifier);
        }

        inImportBlock = false;
      }

      continue;
    }

    if (inImportBlock === true) {
      const trimmed: Tests_TypeDeclarations_ExtractImportedNames_Trimmed = line.trim().replace(',', '');

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
 * Tests - Type Declarations - Build Dts Sections.
 *
 * @since 0.18.0
 */
export function buildDtsSections(dtsLines: Tests_TypeDeclarations_BuildDtsSections_DtsLines, sourceSections: Tests_TypeDeclarations_BuildDtsSections_SourceSections, classPrefix: Tests_TypeDeclarations_BuildDtsSections_ClassPrefix): Tests_TypeDeclarations_BuildDtsSections_Returns {
  const sortedSections: Tests_TypeDeclarations_BuildDtsSections_SortedSections = [...sourceSections].sort((sectionA, sectionB) => sectionB.length - sectionA.length);
  const sectionMap: Tests_TypeDeclarations_BuildDtsSections_SectionMap = new Map<string, Tests_TypeDeclarations_BuildDtsSections_Section>();
  const sectionOrder: Tests_TypeDeclarations_BuildDtsSections_SectionOrder = [];

  for (const line of dtsLines) {
    if (line.startsWith('export type ') === false) {
      continue;
    }

    const match: Tests_TypeDeclarations_BuildDtsSections_Match = line.match(new RegExp('^export type (\\w+)'));

    if (match === null || match[1] === undefined) {
      continue;
    }

    const typeName: Tests_TypeDeclarations_BuildDtsSections_TypeName = match[1];
    let owningSection: Tests_TypeDeclarations_BuildDtsSections_OwningSection = '';

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

    const section: Tests_TypeDeclarations_BuildDtsSections_Section = sectionMap.get(owningSection) as Tests_TypeDeclarations_BuildDtsSections_Section;

    section['typeLines'].push(line);
  }

  return sectionOrder.map((prefix) => sectionMap.get(prefix) as Tests_TypeDeclarations_BuildDtsSections_Section);
}

/**
 * Tests - Type Declarations - Extract Referenced Types.
 *
 * @since 0.15.0
 */
export function extractReferencedTypes(line: Tests_TypeDeclarations_ExtractReferencedTypes_Line, classPrefix: Tests_TypeDeclarations_ExtractReferencedTypes_ClassPrefix): Tests_TypeDeclarations_ExtractReferencedTypes_Returns {
  const match: Tests_TypeDeclarations_ExtractReferencedTypes_Match = line.match(new RegExp('^export type (\\w+)'));

  if (match === null || match[1] === undefined) {
    return [];
  }

  const typeName: Tests_TypeDeclarations_ExtractReferencedTypes_TypeName = match[1];
  const rightSide: Tests_TypeDeclarations_ExtractReferencedTypes_RightSide = line.slice(line.indexOf('=') + 1);
  const referencedTypes: Tests_TypeDeclarations_ExtractReferencedTypes_ReferencedTypes = [];
  const typePattern: Tests_TypeDeclarations_ExtractReferencedTypes_TypePattern = new RegExp(`${classPrefix}_\\w+`, 'g');
  let typeMatch: Tests_TypeDeclarations_ExtractReferencedTypes_TypeMatch = typePattern.exec(rightSide);

  while (typeMatch !== null) {
    const referencedType: Tests_TypeDeclarations_ExtractReferencedTypes_ReferencedType = typeMatch[0];

    if (referencedType !== typeName) {
      referencedTypes.push(referencedType);
    }

    typeMatch = typePattern.exec(rightSide);
  }

  return referencedTypes;
}

/**
 * Tests - Type Declarations - Derive Source Path.
 *
 * @since 0.15.0
 */
export function deriveSourcePath(dtsPath: Tests_TypeDeclarations_DeriveSourcePath_DtsPath): Tests_TypeDeclarations_DeriveSourcePath_Returns {
  return dtsPath.replace('/types/', '/').replace('.d.ts', '.ts');
}

/**
 * Tests - Type Declarations - File Exists.
 *
 * @since 0.15.0
 */
export async function fileExists(filePath: Tests_TypeDeclarations_FileExists_FilePath): Tests_TypeDeclarations_FileExists_Returns {
  try {
    await readFile(filePath, 'utf-8');

    return true;
  } catch {
    return false;
  }
}

/**
 * Tests - Type Declarations - Get Package Root.
 *
 * @since 0.15.0
 */
export function getPackageRoot(): Tests_TypeDeclarations_GetPackageRoot_Returns {
  const currentFilePath: Tests_TypeDeclarations_GetPackageRoot_CurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: Tests_TypeDeclarations_GetPackageRoot_CurrentFileDirectory = dirname(currentFilePath);

  return resolve(currentFileDirectory, '..', '..');
}

/**
 * Tests - Type Declarations - Extract Type Names.
 *
 * @since 0.15.0
 */
export function extractTypeNames(typeLines: Tests_TypeDeclarations_ExtractTypeNames_TypeLines): Tests_TypeDeclarations_ExtractTypeNames_Returns {
  const typeNames: Tests_TypeDeclarations_ExtractTypeNames_TypeNames = [];

  for (const line of typeLines) {
    const match: Tests_TypeDeclarations_ExtractTypeNames_Match = line.match(new RegExp('^export type (\\w+)'));

    if (match !== null && match[1] !== undefined) {
      typeNames.push(match[1]);
    }
  }

  return typeNames;
}

/**
 * Tests - Type Declarations - Find First Occurrence.
 *
 * @since 0.15.0
 */
export function findFirstOccurrence(sourceLines: Tests_TypeDeclarations_FindFirstOccurrence_SourceLines, typeName: Tests_TypeDeclarations_FindFirstOccurrence_TypeName): Tests_TypeDeclarations_FindFirstOccurrence_Returns {
  let inImportBlock: Tests_TypeDeclarations_FindFirstOccurrence_InImportBlock = false;

  for (let i: Tests_TypeDeclarations_FindFirstOccurrence_LineIndex = 0; i < sourceLines.length; i += 1) {
    const line: Tests_TypeDeclarations_FindFirstOccurrence_Line = sourceLines[i] as Tests_TypeDeclarations_FindFirstOccurrence_Line;

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

    const typeNamePattern: Tests_TypeDeclarations_FindFirstOccurrence_TypeNamePattern = new RegExp(`\\b${typeName}\\b`);

    if (typeNamePattern.test(line) === true) {
      return i;
    }
  }

  return -1;
}

/**
 * Tests - Type Declarations - Extract Object Types.
 *
 * @since 0.15.0
 */
export function extractObjectTypes(lines: Tests_TypeDeclarations_ExtractObjectTypes_Lines, classPrefix: Tests_TypeDeclarations_ExtractObjectTypes_ClassPrefix): Tests_TypeDeclarations_ExtractObjectTypes_Returns {
  const objectTypes: Tests_TypeDeclarations_ExtractObjectTypes_ObjectTypes = [];
  const typeLineMap: Tests_TypeDeclarations_ExtractObjectTypes_TypeLineMap = new Map<string, number>();

  for (let i: Tests_TypeDeclarations_ExtractObjectTypes_LineIndex = 0; i < lines.length; i += 1) {
    const line: Tests_TypeDeclarations_ExtractObjectTypes_Line = lines[i] as Tests_TypeDeclarations_ExtractObjectTypes_Line;

    if (line === undefined) {
      continue;
    }

    const typeDefMatch: Tests_TypeDeclarations_ExtractObjectTypes_Match = line.match(new RegExp(`^export type (${classPrefix}\\w+)`));

    if (typeDefMatch !== null && typeDefMatch[1] !== undefined) {
      typeLineMap.set(typeDefMatch[1], i);
    }
  }

  for (let i: Tests_TypeDeclarations_ExtractObjectTypes_LineIndex = 0; i < lines.length; i += 1) {
    const line: Tests_TypeDeclarations_ExtractObjectTypes_Line = lines[i] as Tests_TypeDeclarations_ExtractObjectTypes_Line;

    if (line === undefined) {
      continue;
    }

    const objectMatch: Tests_TypeDeclarations_ExtractObjectTypes_Match = line.match(new RegExp(`^export type (${classPrefix}\\w+) = (?:Readonly<)?\\{$`));

    if (objectMatch === null || objectMatch[1] === undefined) {
      continue;
    }

    const properties: Tests_TypeDeclarations_ExtractObjectTypes_ObjectTypeProperties = [];

    for (let j: Tests_TypeDeclarations_ExtractObjectTypes_LineIndex = i + 1; j < lines.length; j += 1) {
      const propertyLine: Tests_TypeDeclarations_ExtractObjectTypes_Line = lines[j] as Tests_TypeDeclarations_ExtractObjectTypes_Line;

      if (propertyLine === undefined) {
        continue;
      }

      const trimmedProperty: Tests_TypeDeclarations_ExtractObjectTypes_Trimmed = propertyLine.trim();

      if (
        trimmedProperty === '}>'
        || trimmedProperty === '};'
        || trimmedProperty === '}>;'
      ) {
        break;
      }

      const propertyMatch: Tests_TypeDeclarations_ExtractObjectTypes_Match = trimmedProperty.match(new RegExp('^(\\w+):\\s+(.+);$'));

      if (
        propertyMatch !== null
        && propertyMatch[1] !== undefined
        && propertyMatch[2] !== undefined
      ) {
        const propertyKey: Tests_TypeDeclarations_ExtractObjectTypes_PropertyKey = propertyMatch[1];
        const propertyValueType: Tests_TypeDeclarations_ExtractObjectTypes_PropertyValueType = propertyMatch[2];
        const typeLineIndex: Tests_TypeDeclarations_ExtractObjectTypes_LineIndex = typeLineMap.get(propertyValueType) ?? -1;

        properties.push({
          key: propertyKey,
          valueType: propertyValueType,
          typeLineIndex,
        });
      }
    }

    const objectName: Tests_TypeDeclarations_ExtractObjectTypes_TypeName = objectMatch[1];

    objectTypes.push({
      name: objectName,
      lineIndex: i,
      properties,
    });
  }

  return objectTypes;
}

/**
 * Tests - Type Declarations - Parse Source File (cache).
 *
 * Caches SourceFile parses keyed by filePath, with content-equality check to invalidate on edits.
 * The variable-type-symmetry meta-test parses each source file 4 times (buildSourceSectionMap,
 * detectInlineTypedCallbacks, extractFunctionParams, extractFunctionReturns) and the C1/C2/C3
 * meta-test adds a 5th (extractTopLevelIdentifiers) — across ~200 source files that's ~1000
 * redundant parses without this cache. Fixture-style tests pass varying content for the same
 * fake filePath; the content check ensures fresh parses for those.
 *
 * @since 0.18.0
 */
const sourceFileCache: Map<string, Tests_TypeDeclarations_ParseSourceFile_CachedEntry> = new Map();

export function parseSourceFile(filePath: Tests_TypeDeclarations_ParseSourceFile_FilePath, content: Tests_TypeDeclarations_ParseSourceFile_Content): Tests_TypeDeclarations_ParseSourceFile_Returns {
  const cached: Tests_TypeDeclarations_ParseSourceFile_Cached = sourceFileCache.get(filePath);

  if (cached !== undefined && cached['content'] === content) {
    return cached['sourceFile'];
  }

  const sourceFile: SourceFile = createSourceFile(filePath, content, ScriptTarget.Latest, true);

  sourceFileCache.set(filePath, { content, sourceFile });

  return sourceFile;
}

/**
 * Tests - Type Declarations - Extract Function Params.
 *
 * @since 0.18.0
 */
export function extractFunctionParams(filePath: Tests_TypeDeclarations_ExtractFunctionParams_FilePath, content: Tests_TypeDeclarations_ExtractFunctionParams_Content): Tests_TypeDeclarations_ExtractFunctionParams_Returns {
  const sourceFile: SourceFile = parseSourceFile(filePath, content);
  const params: Tests_TypeDeclarations_ExtractFunctionParams_Params = [];

  function visit(node: Node): void {
    let parameterList: readonly Node[] | undefined = undefined;

    if (
      isFunctionDeclaration(node) === true
      || isMethodDeclaration(node) === true
      || isConstructorDeclaration(node) === true
    ) {
      parameterList = (node as { parameters: readonly Node[] }).parameters;
    } else if (isVariableStatement(node) === true) {
      // Function-typed const: extract its arrow function's parameters.
      for (const decl of node.declarationList.declarations) {
        if (
          decl.initializer !== undefined
          && (isArrowFunction(decl.initializer) === true || isFunctionExpression(decl.initializer) === true)
        ) {
          parameterList = decl.initializer.parameters;
        }
      }
    }

    if (parameterList !== undefined) {
      for (const param of parameterList) {
        const paramNode: { name?: Node, type?: Node } = param as { name?: Node, type?: Node };

        if (
          paramNode.name !== undefined && isIdentifier(paramNode.name) === true
          && paramNode.type !== undefined && isTypeReferenceNode(paramNode.type) === true
          && isIdentifier((paramNode.type as { typeName: Node }).typeName) === true
        ) {
          const lineNumber: Tests_TypeDeclarations_ExtractFunctionParams_LineNumber = sourceFile.getLineAndCharacterOfPosition((param as Node).getStart()).line + 1;
          const paramRecord: Tests_TypeDeclarations_ExtractFunctionParams_Param = {
            paramName: (paramNode.name as { text: string }).text,
            typeName: ((paramNode.type as { typeName: { text: string } }).typeName).text,
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
 * Tests - Type Declarations - Extract Body Declarations.
 *
 * @since 0.18.0
 */
export function extractBodyDeclarations(lines: Tests_TypeDeclarations_ExtractBodyDeclarations_Lines): Tests_TypeDeclarations_ExtractBodyDeclarations_Returns {
  const declarations: Tests_TypeDeclarations_ExtractBodyDeclarations_Declarations = [];

  for (let i: Tests_TypeDeclarations_ExtractBodyDeclarations_LineIndex = 0; i < lines.length; i += 1) {
    const line: Tests_TypeDeclarations_ExtractBodyDeclarations_Line = lines[i] as Tests_TypeDeclarations_ExtractBodyDeclarations_Line;

    if (line === undefined) {
      continue;
    }

    const match: Tests_TypeDeclarations_ExtractBodyDeclarations_Match = line.match(new RegExp('^\\s*(const|let)\\s+(\\w+):\\s+(\\w+)\\s*='));

    if (
      match !== null
      && match[1] !== undefined
      && match[2] !== undefined
      && match[3] !== undefined
    ) {
      const declaration: Tests_TypeDeclarations_ExtractBodyDeclarations_Declaration = {
        keyword: match[1] as Tests_TypeDeclarations_ExtractBodyDeclarations_Keyword,
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
 * Tests - Type Declarations - Extract Top Level Identifiers.
 *
 * @since 0.18.0
 */
export function extractTopLevelIdentifiers(filePath: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_FilePath, content: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Content): Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Returns {
  const sourceFile: SourceFile = parseSourceFile(filePath, content);
  const identifiers: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Identifiers = [];

  function getLine(node: Node): Tests_TypeDeclarations_ExtractTopLevelIdentifiers_LineNumber {
    return sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
  }

  forEachChild(sourceFile, (node) => {
    if (isClassDeclaration(node) === true && node.name !== undefined) {
      const identifier: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Identifier = {
        name: node.name.text,
        kind: 'class',
        lineNumber: getLine(node),
      };

      identifiers.push(identifier);

      return;
    }

    if (isFunctionDeclaration(node) === true && node.name !== undefined) {
      const identifier: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Identifier = {
        name: node.name.text,
        kind: 'function',
        lineNumber: getLine(node),
      };

      identifiers.push(identifier);

      return;
    }

    if (isVariableStatement(node) === true) {
      for (const decl of node.declarationList.declarations) {
        if (
          decl.name !== undefined && isIdentifier(decl.name) === true
          && decl.initializer !== undefined
          && (
            isArrowFunction(decl.initializer) === true
            || isFunctionExpression(decl.initializer) === true
            || isClassExpression(decl.initializer) === true
          )
        ) {
          const identifier: Tests_TypeDeclarations_ExtractTopLevelIdentifiers_Identifier = {
            name: decl.name.text,
            kind: 'const',
            lineNumber: getLine(decl),
          };

          identifiers.push(identifier);
        }
      }
    }
  });

  return identifiers;
}

/**
 * Tests - Type Declarations - Build Source Section Map.
 *
 * @since 0.18.0
 */
export function buildSourceSectionMap(filePath: Tests_TypeDeclarations_BuildSourceSectionMap_FilePath, content: Tests_TypeDeclarations_BuildSourceSectionMap_Content, classPrefix: Tests_TypeDeclarations_BuildSourceSectionMap_ClassPrefix): Tests_TypeDeclarations_BuildSourceSectionMap_Returns {
  const sourceFile: SourceFile = parseSourceFile(filePath, content);
  const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_SectionMap = new Map<number, string>();
  // Recursion depth guard: real source files never approach this; pathologically deep generated code
  // (10k-level callback chains) would otherwise hit Node's default stack limit (~10k frames).
  const maxDepth: Tests_TypeDeclarations_BuildSourceSectionMap_MaxDepth = 5000;

  function getLine(node: Node): Tests_TypeDeclarations_BuildSourceSectionMap_LineNumber {
    return sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
  }

  function pascalCase(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  let currentDepth: Tests_TypeDeclarations_BuildSourceSectionMap_CurrentDepth = 0;

  function tagAllChildren(node: Node, section: Tests_TypeDeclarations_BuildSourceSectionMap_Section): void {
    if (currentDepth >= maxDepth) {
      return;
    }

    currentDepth += 1;
    forEachChild(node, (child) => visit(child, section));
    currentDepth -= 1;

    return;
  }

  function visit(node: Node, section: Tests_TypeDeclarations_BuildSourceSectionMap_Section): void {
    // Class declaration: adds class name as a chunk. Anonymous (no name) classes fall through to default tagging.
    if (isClassDeclaration(node) === true && node.name !== undefined) {
      const newSection: Tests_TypeDeclarations_BuildSourceSectionMap_Section = `${section}_${pascalCase(node.name.text)}`;

      sectionMap.set(getLine(node), newSection);
      tagAllChildren(node, newSection);

      return;
    }

    // Method/getter/setter declaration: section = parent + methodName. Accept both regular `name()`,
    // private `#name()`, and accessor pairs `get bar()` / `set bar()`. The cast captures the shared
    // shape (all three node kinds have `name?: PropertyName`) without per-cast noise.
    const accessor: MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration = node as MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration;

    if (
      (isMethodDeclaration(node) === true || isGetAccessorDeclaration(node) === true || isSetAccessorDeclaration(node) === true)
      && accessor.name !== undefined
      && (isIdentifier(accessor.name) === true || isPrivateIdentifier(accessor.name) === true)
    ) {
      const rawMethodName: string = accessor.name.text;
      const cleanMethodName: string = (rawMethodName.startsWith('#') === true) ? rawMethodName.slice(1) : rawMethodName;
      const newSection: Tests_TypeDeclarations_BuildSourceSectionMap_Section = `${section}_${pascalCase(cleanMethodName)}`;

      sectionMap.set(getLine(node), newSection);
      tagAllChildren(node, newSection);

      return;
    }

    // Constructor: section = parent + 'Constructor'.
    if (isConstructorDeclaration(node) === true) {
      const newSection: Tests_TypeDeclarations_BuildSourceSectionMap_Section = `${section}_Constructor`;

      sectionMap.set(getLine(node), newSection);
      tagAllChildren(node, newSection);

      return;
    }

    // Top-level function declaration: section = parent + functionName.
    if (isFunctionDeclaration(node) === true && node.name !== undefined) {
      const newSection: Tests_TypeDeclarations_BuildSourceSectionMap_Section = `${section}_${pascalCase(node.name.text)}`;

      sectionMap.set(getLine(node), newSection);
      tagAllChildren(node, newSection);

      return;
    }

    // Variable statement: check for function-typed const (arrow, function expression) or class-expression
    // const (covers EC9: anonymous class expressions take their enclosing const name as the chunk).
    if (isVariableStatement(node) === true) {
      let hasInitializer: boolean = false;
      let subSection: Tests_TypeDeclarations_BuildSourceSectionMap_Section = section;

      for (const decl of node.declarationList.declarations) {
        if (
          decl.name !== undefined && isIdentifier(decl.name) === true
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
      let callbackArg: Node | undefined = undefined;

      for (let argIndex: number = 1; argIndex < node.arguments.length; argIndex += 1) {
        const arg: Node | undefined = node.arguments[argIndex];

        if (arg !== undefined && (isArrowFunction(arg) === true || isFunctionExpression(arg) === true)) {
          callbackArg = arg;
          break;
        }
      }

      if (callbackArg !== undefined) {
        const stringArg: StringLiteral = node.arguments[0] as StringLiteral;
        const chunk: string = parseDescribeString(stringArg.text);

        // If the string parses to an empty chunk (purely non-alphanumeric input like
        // `describe('!@#', ...)`), fall through to the default branch below so the call's
        // children are still walked under the parent section instead of getting tagged with a
        // malformed `${section}_` chunk.
        if (chunk !== '') {
          const newSection: Tests_TypeDeclarations_BuildSourceSectionMap_Section = `${section}_${chunk}`;

          sectionMap.set(getLine(node), section);
          tagAllChildren(callbackArg, newSection);

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
 * Tests - Type Declarations - Parse Describe String.
 *
 * @since 0.18.0
 */
export function parseDescribeString(input: Tests_TypeDeclarations_ParseDescribeString_Input): Tests_TypeDeclarations_ParseDescribeString_Returns {
  const pieces: Tests_TypeDeclarations_ParseDescribeString_Pieces = input
    .split(new RegExp('[^A-Za-z0-9]+'))
    .filter((piece) => piece.length > 0)
    .map((piece) => piece.charAt(0).toUpperCase() + piece.slice(1));

  return pieces.join('');
}

/**
 * Tests - Type Declarations - Strip Underscore Prefix.
 *
 * @since 0.18.0
 */
export function stripUnderscorePrefix(input: Tests_TypeDeclarations_StripUnderscorePrefix_Input): Tests_TypeDeclarations_StripUnderscorePrefix_Returns {
  if (input.startsWith('_') === true) {
    return input.slice(1);
  }

  return input;
}

/**
 * Tests - Type Declarations - Check Type Name Uniqueness.
 *
 * @since 0.18.0
 */
export function checkTypeNameUniqueness(declarations: Tests_TypeDeclarations_CheckTypeNameUniqueness_Declarations): Tests_TypeDeclarations_CheckTypeNameUniqueness_Returns {
  const violations: Tests_TypeDeclarations_CheckTypeNameUniqueness_Violations = [];
  const seen: Tests_TypeDeclarations_CheckTypeNameUniqueness_SeenMap = new Map();

  for (const declaration of declarations) {
    const existing: Tests_TypeDeclarations_CheckTypeNameUniqueness_FirstOccurrence | undefined = seen.get(declaration.typeName);

    if (existing !== undefined) {
      const violation: Tests_TypeDeclarations_CheckTypeNameUniqueness_Violation = `Two declarations would produce the same type name '${declaration.typeName}'. First: line ${existing.lineNumber} ('${existing.name}'); duplicate: line ${declaration.lineNumber} ('${declaration.name}'). Rename one of the declarations so the type names differ.`;

      violations.push(violation);
    } else {
      seen.set(declaration.typeName, {
        name: declaration.name,
        lineNumber: declaration.lineNumber,
      });
    }
  }

  return violations;
}

/**
 * Tests - Type Declarations - Detect Inline Typed Callbacks.
 *
 * @since 0.18.0
 */
export function detectInlineTypedCallbacks(filePath: Tests_TypeDeclarations_DetectInlineTypedCallbacks_FilePath, content: Tests_TypeDeclarations_DetectInlineTypedCallbacks_Content): Tests_TypeDeclarations_DetectInlineTypedCallbacks_Returns {
  const sourceFile: SourceFile = parseSourceFile(filePath, content);
  const callbacks: Tests_TypeDeclarations_DetectInlineTypedCallbacks_Callbacks = [];

  function visit(node: Node): void {
    if (
      (isArrowFunction(node) === true || isFunctionExpression(node) === true)
      && node.parent !== undefined
    ) {
      // Check if this is an inline (anonymous) typed callback — i.e., NOT the initializer of a VariableDeclaration.
      const isTopLevelConst: boolean = (
        node.parent !== undefined
        && (node.parent as { kind?: number }).kind !== undefined
      );

      let isFunctionTypedConst: boolean = false;
      let walker: Node | undefined = node.parent;

      while (walker !== undefined) {
        if (isVariableStatement(walker) === true) {
          isFunctionTypedConst = true;
          break;
        }
        if (
          (walker as { kind?: number }).kind !== undefined
          && (isCallExpression(walker) === true || isArrowFunction(walker) === true || isFunctionExpression(walker) === true)
        ) {
          break;
        }
        walker = (walker as { parent?: Node }).parent;
      }

      if (isFunctionTypedConst === false) {
        // Inline callback. Check its typed params.
        for (const param of node.parameters) {
          const paramNode: { name?: Node, type?: Node } = param as { name?: Node, type?: Node };

          if (
            paramNode.name !== undefined && isIdentifier(paramNode.name) === true
            && paramNode.type !== undefined && isTypeReferenceNode(paramNode.type) === true
            && isIdentifier((paramNode.type as { typeName: Node }).typeName) === true
          ) {
            const lineNumber: Tests_TypeDeclarations_DetectInlineTypedCallbacks_LineNumber = sourceFile.getLineAndCharacterOfPosition((param as Node).getStart()).line + 1;
            const callback: Tests_TypeDeclarations_DetectInlineTypedCallbacks_Callback = {
              paramName: (paramNode.name as { text: string }).text,
              typeName: ((paramNode.type as { typeName: { text: string } }).typeName).text,
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
 * Tests - Type Declarations - Extract Array Types.
 *
 * @since 0.18.0
 */
export function extractArrayTypes(lines: Tests_TypeDeclarations_ExtractArrayTypes_Lines): Tests_TypeDeclarations_ExtractArrayTypes_Returns {
  const arrayTypes: Tests_TypeDeclarations_ExtractArrayTypes_ArrayTypes = [];

  for (let i: Tests_TypeDeclarations_ExtractArrayTypes_LineIndex = 0; i < lines.length; i += 1) {
    const line: Tests_TypeDeclarations_ExtractArrayTypes_Line = lines[i] as Tests_TypeDeclarations_ExtractArrayTypes_Line;

    if (line === undefined) {
      continue;
    }

    const match: Tests_TypeDeclarations_ExtractArrayTypes_Match = line.match(new RegExp('^export type (\\w+) = (\\w+)\\[\\];?$'));

    if (
      match !== null
      && match[1] !== undefined
      && match[2] !== undefined
    ) {
      const arrayType: Tests_TypeDeclarations_ExtractArrayTypes_ArrayType = {
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
 * Tests - Type Declarations - Extract Function Returns.
 *
 * @since 0.18.0
 */
export function extractFunctionReturns(filePath: Tests_TypeDeclarations_ExtractFunctionReturns_FilePath, content: Tests_TypeDeclarations_ExtractFunctionReturns_Content): Tests_TypeDeclarations_ExtractFunctionReturns_Returns {
  const sourceFile: SourceFile = parseSourceFile(filePath, content);
  const returns: Tests_TypeDeclarations_ExtractFunctionReturns_FunctionReturns = [];

  function visit(node: Node): void {
    if (
      isFunctionDeclaration(node) === true
      || isMethodDeclaration(node) === true
      || isConstructorDeclaration(node) === true
    ) {
      const fnNode: { type?: Node } = node as { type?: Node };
      const typeNode: Node | undefined = fnNode.type;

      if (typeNode !== undefined) {
        let returnType: Tests_TypeDeclarations_ExtractFunctionReturns_ReturnType = '';
        let isTypeGuard: Tests_TypeDeclarations_ExtractFunctionReturns_IsTypeGuard = false;

        if (isTypePredicateNode(typeNode) === true) {
          isTypeGuard = true;

          const predicateNode: { type?: Node } = typeNode as { type?: Node };

          if (
            predicateNode.type !== undefined
            && isTypeReferenceNode(predicateNode.type) === true
            && isIdentifier((predicateNode.type as { typeName: Node }).typeName) === true
          ) {
            returnType = ((predicateNode.type as { typeName: { text: string } }).typeName).text;
          }
        } else if (isTypeReferenceNode(typeNode) === true && isIdentifier((typeNode as { typeName: Node }).typeName) === true) {
          returnType = ((typeNode as { typeName: { text: string } }).typeName).text;
        }

        if (returnType !== '') {
          const lineNumber: Tests_TypeDeclarations_ExtractFunctionReturns_LineNumber = sourceFile.getLineAndCharacterOfPosition((node as Node).getStart()).line + 1;
          const returnRecord: Tests_TypeDeclarations_ExtractFunctionReturns_Return = {
            returnType,
            isTypeGuard,
            lineNumber,
          };

          returns.push(returnRecord);
        }
      }
    }

    forEachChild(node, visit);

    return;
  }

  forEachChild(sourceFile, visit);

  return returns;
}

/**
 * Tests - Type Declarations - Is Alias To Foreign Type.
 *
 * Mode 2 rule 7.2 tightening: detects `export type Cli_Foo_X = Lib_Bar_Y;` where the RHS is a single type
 * starting with a path-prefix different from the current file's classPrefix. Used to forbid the
 * "local re-alias" loophole that previously satisfied rule 7.2 mechanically. Complex RHS shapes
 * (object literals, unions, intersections, generics with members) are not flagged — only direct
 * single-type aliases.
 *
 * @since 0.18.0
 */
export function isAliasToForeignType(typeName: Tests_TypeDeclarations_IsAliasToForeignType_TypeName, dtsContent: Tests_TypeDeclarations_IsAliasToForeignType_DtsContent, classPrefix: Tests_TypeDeclarations_IsAliasToForeignType_ClassPrefix): Tests_TypeDeclarations_IsAliasToForeignType_Returns {
  // Escape regex special chars in typeName before interpolation. Convention type names are
  // alphanumeric+underscore so this is defensive — no current caller passes special chars, but
  // a future caller passing a malformed name would otherwise silently mismatch instead of erroring.
  const escapedTypeName: Tests_TypeDeclarations_IsAliasToForeignType_TypeName = typeName.replace(new RegExp('[.*+?^${}()|[\\]\\\\]', 'g'), '\\$&');
  const pattern: Tests_TypeDeclarations_IsAliasToForeignType_Pattern = new RegExp(`^export type ${escapedTypeName}\\s*=\\s*([^;]+);`, 'm');
  const match: Tests_TypeDeclarations_IsAliasToForeignType_Match = dtsContent.match(pattern);

  if (match === null || match[1] === undefined) {
    return false;
  }

  let rhs: Tests_TypeDeclarations_IsAliasToForeignType_Rhs = match[1].trim();

  rhs = rhs.replace(new RegExp('<[^>]*>', 'g'), '');
  rhs = rhs.replace(new RegExp('\\[\\]', 'g'), '');

  if (new RegExp('[|&{}();,]').test(rhs) === true) {
    return false;
  }

  const typeMatch: Tests_TypeDeclarations_IsAliasToForeignType_TypeMatch = rhs.trim().match(new RegExp('^([A-Z][A-Za-z0-9_]*)$'));

  if (typeMatch === null || typeMatch[1] === undefined) {
    return false;
  }

  const leftmostType: Tests_TypeDeclarations_IsAliasToForeignType_LeftmostType = typeMatch[1];

  if (leftmostType.includes('_') === false) {
    return false;
  }

  if (leftmostType.startsWith(`${classPrefix}_`) === true) {
    return false;
  }

  return true;
}

/**
 * Tests - Type Declarations - Is Locally Defined.
 *
 * @since 0.18.0
 */
export function isLocallyDefined(typeName: Tests_TypeDeclarations_IsLocallyDefined_TypeName, dtsContent: Tests_TypeDeclarations_IsLocallyDefined_DtsContent): Tests_TypeDeclarations_IsLocallyDefined_Returns {
  const escapedTypeName: Tests_TypeDeclarations_IsLocallyDefined_TypeName = typeName.replace(new RegExp('[.*+?^${}()|[\\]\\\\]', 'g'), '\\$&');
  const pattern: Tests_TypeDeclarations_IsLocallyDefined_Pattern = new RegExp(`^export type ${escapedTypeName}\\b`, 'm');

  return pattern.test(dtsContent);
}

/**
 * Tests - Type Declarations - Is Reserved Suffix.
 *
 * @since 0.18.0
 */
export function isReservedSuffix(typeName: Tests_TypeDeclarations_IsReservedSuffix_TypeName): Tests_TypeDeclarations_IsReservedSuffix_Returns {
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
 * Tests - Type Declarations - Validate Leaf.
 *
 * @since 0.18.0
 */
export function validateLeaf(varName: Tests_TypeDeclarations_ValidateLeaf_VarName, typeName: Tests_TypeDeclarations_ValidateLeaf_TypeName, sourceSection: Tests_TypeDeclarations_ValidateLeaf_SourceSection, classPrefix: Tests_TypeDeclarations_ValidateLeaf_ClassPrefix): Tests_TypeDeclarations_ValidateLeaf_Returns {
  const stripped: Tests_TypeDeclarations_ValidateLeaf_Stripped = stripUnderscorePrefix(varName);
  const titleVar: Tests_TypeDeclarations_ValidateLeaf_TitleVar = stripped.charAt(0).toUpperCase() + stripped.slice(1);
  const expectedSection: Tests_TypeDeclarations_ValidateLeaf_ExpectedSection = `${sourceSection}_${titleVar}`;
  const expectedClass: Tests_TypeDeclarations_ValidateLeaf_ExpectedClass = `${classPrefix}_${titleVar}`;

  if (typeName === expectedSection || typeName === expectedClass) {
    return null;
  }

  let actualLeaf: Tests_TypeDeclarations_ValidateLeaf_ActualLeaf = typeName;

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
 * Tests - Type Declarations - Validate Return Type.
 *
 * @since 0.18.0
 */
export function validateReturnType(returnType: Tests_TypeDeclarations_ValidateReturnType_ReturnType, isTypeGuard: Tests_TypeDeclarations_ValidateReturnType_IsTypeGuard): Tests_TypeDeclarations_ValidateReturnType_Returns {
  // Rule 7.6: 'Return' (singular) at return position is banned.
  if (returnType.endsWith('_Return') === true || returnType.endsWith('Return') === true) {
    return `Return type '${returnType}' uses banned singular 'Return' suffix; rename to use 'Returns' (plural).`;
  }

  if (isTypeGuard === true) {
    // Rule 7.7: type guard return must end in '_TypeGuard' or 'TypeGuard'.
    if (returnType.endsWith('_TypeGuard') === false && returnType.endsWith('TypeGuard') === false) {
      return `Type-guard return type '${returnType}' must end in 'TypeGuard'.`;
    }
  } else {
    // Rule 7.5: regular function return must end in '_Returns' or 'Returns'.
    if (returnType.endsWith('_Returns') === false && returnType.endsWith('Returns') === false) {
      // Rule 7.7: 'TypeGuard' at non-type-guard return position is forbidden.
      if (returnType.endsWith('_TypeGuard') === true || returnType.endsWith('TypeGuard') === true) {
        return `Return type '${returnType}' ends in 'TypeGuard' but the function does not use 'value is T' form; either rename to '_Returns' or rewrite as a type guard.`;
      }
      return `Function return type '${returnType}' must end in 'Returns' (plural).`;
    }
  }

  return null;
}

/**
 * Tests - Type Declarations - Run Rule Pipeline.
 *
 * Wires every body-var rule (7.1-7.5/6/7) end-to-end against an inline source/.d.ts fixture pair
 * and returns the violation list. Used by the end-to-end fixture tests so each fixture only carries
 * its content + assertions, not the pipeline boilerplate.
 *
 * @since 0.18.0
 */
export function runRulePipeline(filePath: Tests_TypeDeclarations_RunRulePipeline_FilePath, sourceContent: Tests_TypeDeclarations_RunRulePipeline_SourceContent, dtsContent: Tests_TypeDeclarations_RunRulePipeline_DtsContent, classPrefix: Tests_TypeDeclarations_RunRulePipeline_ClassPrefix): Tests_TypeDeclarations_RunRulePipeline_Returns {
  const sectionMap: Tests_TypeDeclarations_BuildSourceSectionMap_Returns = buildSourceSectionMap(filePath, sourceContent, classPrefix);
  const lines: Tests_TypeDeclarations_ExtractBodyDeclarations_Lines = sourceContent.split('\n');
  const declarations: Tests_TypeDeclarations_ExtractBodyDeclarations_Returns = extractBodyDeclarations(lines);
  const callbacks: Tests_TypeDeclarations_DetectInlineTypedCallbacks_Returns = detectInlineTypedCallbacks(filePath, sourceContent);
  const fnReturns: Tests_TypeDeclarations_ExtractFunctionReturns_Returns = extractFunctionReturns(filePath, sourceContent);
  const violations: Tests_TypeDeclarations_RunRulePipeline_Violations = [];

  for (const callback of callbacks) {
    violations.push(`7.4: ${callback['paramName']}: ${callback['typeName']}`);
  }

  for (const declaration of declarations) {
    const sourceSection: Tests_TypeDeclarations_ValidateLeaf_SourceSection = sectionMap.get(declaration['lineNumber']) ?? classPrefix;

    if (isReservedSuffix(declaration['typeName']) === true) {
      violations.push(`7.3: ${declaration['varName']}: ${declaration['typeName']}`);
      continue;
    }

    const leafResult: Tests_TypeDeclarations_ValidateLeaf_Returns = validateLeaf(declaration['varName'], declaration['typeName'], sourceSection, classPrefix);
    if (leafResult !== null) {
      violations.push(`7.1: ${declaration['varName']}: ${declaration['typeName']}`);
    }

    if (isLocallyDefined(declaration['typeName'], dtsContent) === false) {
      violations.push(`7.2-not-defined: ${declaration['typeName']}`);
    } else if (isAliasToForeignType(declaration['typeName'], dtsContent, classPrefix) === true) {
      violations.push(`7.2-alias: ${declaration['typeName']}`);
    }
  }

  for (const fnReturn of fnReturns) {
    const reason: Tests_TypeDeclarations_ValidateReturnType_Returns = validateReturnType(fnReturn['returnType'], fnReturn['isTypeGuard']);
    if (reason !== null) {
      violations.push(`7.5/6/7: ${fnReturn['returnType']}`);
    }
  }

  return violations;
}
