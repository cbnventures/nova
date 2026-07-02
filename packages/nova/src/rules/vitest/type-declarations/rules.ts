import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  relative,
  sep,
} from 'node:path';

import { it } from 'vitest';

import {
  LIB_REGEX_PATTERN_EXPORT_TYPE_NAME,
  LIB_REGEX_PATTERN_EXT_CJS_SUFFIX,
  LIB_REGEX_PATTERN_EXT_CTS_SUFFIX,
  LIB_REGEX_PATTERN_EXT_D_CTS_SUFFIX,
  LIB_REGEX_PATTERN_EXT_D_MTS_SUFFIX,
  LIB_REGEX_PATTERN_EXT_D_TS_SUFFIX,
  LIB_REGEX_PATTERN_EXT_JS_SUFFIX,
  LIB_REGEX_PATTERN_EXT_JSX_SUFFIX,
  LIB_REGEX_PATTERN_EXT_MJS_SUFFIX,
  LIB_REGEX_PATTERN_EXT_MTS_SUFFIX,
  LIB_REGEX_PATTERN_EXT_TS_SUFFIX,
  LIB_REGEX_PATTERN_EXT_TSX_SUFFIX,
  LIB_REGEX_PATTERN_EXTENSION_TEST_SUFFIX,
  LIB_REGEX_PATTERN_KEBAB_CASE_SEGMENT,
  LIB_REGEX_PATTERN_PASCAL_CASE_SEGMENT,
  LIB_REGEX_PATTERN_PASCAL_CASE_UNDERSCORE_TYPE_NAME,
  LIB_REGEX_PATTERN_THREE_CONSECUTIVE_CAPS,
} from '../../../lib/regex.js';
import {
  buildDtsSections,
  buildSourceSectionMap,
  checkTypeNameUniqueness,
  deriveClassPrefix,
  deriveSourcePath,
  detectInlineTypedCallbacks,
  discoverSourceFiles,
  discoverTypeFiles,
  extractArrayTypes,
  extractBodyDeclarations,
  extractFunctionParams,
  extractFunctionReturns,
  extractImportedNames,
  extractObjectTypes,
  extractReferencedTypes,
  extractTopLevelIdentifiers,
  extractTypeNames,
  fileExists,
  findFirstOccurrence,
  isAliasToForeignType,
  isLocallyDefined,
  isReservedSuffix,
  stripUnderscorePrefix,
  validateLeaf,
  validateReturnType,
} from '../../../lib/type-declaration-engine.js';
import { isEnabled } from '../enable.js';

import type {
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_ClassPrefix,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Config,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Content,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_CrossSectionCurrentDirectory,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_CrossSectionRelativePath,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_CurrentSectionPrefix,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Enable,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Files,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_ImportedNames,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_IsImported,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_IsOtherSection,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_IsSameSection,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Lines,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_ReferencedTypes,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Returns,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_SectionMap,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_SectionPrefixes,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Sections,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_SourceContent,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_SourceExists,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_SourcePath,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_SourceSectionSet,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Violation,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_ViolationMessage,
  Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Violations,
  Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_AllFiles,
  Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_Cleaned,
  Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_Config,
  Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_DtsFiles,
  Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_Enable,
  Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_FilenameValidationCurrentDirectory,
  Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_FilenameValidationRelativePath,
  Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_MatchesKebab,
  Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_MatchesPascal,
  Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_PascalCasePattern,
  Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_Pattern,
  Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_Returns,
  Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_Segments,
  Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_SourceFiles,
  Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_Violation,
  Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_ViolationMessage,
  Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_Violations,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Actual,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_ArrayElementTypeNames,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_ArrayTypesForOrder,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_ClassPrefix,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Config,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_DtsContent,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_DtsLines,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Enable,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Expected,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Files,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_J,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_ObjectPropertyTypeNames,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_ObjectTypes,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_OrderCurrentDirectory,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_OrderRelativePath,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Returns,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_SectionMap,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Sections,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_SortedPositions,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_SourceContent,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_SourceExists,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_SourceLineIndex,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_SourceLines,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_SourcePath,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_SourcePathAlternative,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_SourceSectionSet,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_TypeNames,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_TypePositions,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Violation,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_ViolationMessage,
  Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Violations,
  Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_ClassPrefix,
  Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Config,
  Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Content,
  Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Enable,
  Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_FileName,
  Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Files,
  Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Identifiers,
  Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_IdentifierVsFileNameCurrentDirectory,
  Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_IdentifierVsFileNameRelativePath,
  Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Returns,
  Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Segments,
  Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Violation,
  Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_ViolationMessage,
  Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Violations,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_ArrayTypes,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_ClassPrefix,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Config,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Content,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_DefinedTypes,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_DefMatch,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_ElementLine,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Enable,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Files,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_I,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_ImportedNames,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Line,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Line2,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Lines,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_ObjectPropsCurrentDirectory,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_ObjectPropsRelativePath,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_ObjectTypes,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_PropertyExpectedPrefix,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Returns,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_TypeDefLines,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_TypeDefMatch,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Violation,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Violation2,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Violation3,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Violation4,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_ViolationMessage,
  Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Violations,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_ClassPrefix,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_CompareResult,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Config,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Content,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Current,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Enable,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Files,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_I,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Lines,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Previous,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Returns,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_SectionMap,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_SectionOrderCurrentDirectory,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_SectionOrderRelativePath,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Sections,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_SourceContent,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_SourceExists,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_SourcePath,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_SourceSectionSet,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Violation,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_ViolationMessage,
  Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Violations,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_ClassPrefix,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_Config,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_CoverageCurrentDirectory,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_CoverageRelativePath,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_DtsContent,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_DtsLines,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_DtsSectionPrefixes,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_DtsSections,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_Enable,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_Files,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_IsParent,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_Returns,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_ReverseAfterClassPrefix,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_ReverseChunks,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_ReverseExpectedMethodSection,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_ReverseMatch,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_ReverseTypeName,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SectionMap,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SingleChunkAfterClassPrefix,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SingleChunkMatch,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SingleChunkTopLevelTypes,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SingleChunkTypeName,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SourceContent,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SourceExists,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SourcePath,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SourcePathAlternative,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SourceSectionSet,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_Violation,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_Violation2,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_ViolationMessage,
  Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_Violations,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_ArrayTypes,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_BrandCasePattern,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Config,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Content,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_ElementLine,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Enable,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_ExpectedPropertyPrefix,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_FirstChunk,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_I,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Lines,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_LineToScan,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_LocalTypeSet,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_ObjectTypes,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_PascalCasePattern,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_PositionMatch,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_PrimitiveSet,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Returns,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_SourceClassPrefix,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_StandaloneCurrentDirectory,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_StandaloneDtsFiles,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_StandaloneFiles,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_StandaloneRelativePath,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_StandaloneSourceFiles,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_TopLevelPathPrefixes,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_TypeLines,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_TypeNames,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_TypePositions,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Violation,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Violation2,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Violation3,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Violation4,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Violation5,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_ViolationMessage,
  Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Violations,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_BodyDecls,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_ClassPrefix,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_CleanedDtsPath,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_CleanedDtsPath2,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Config,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Content,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_DtsContent,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_DtsExists,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_DtsPath,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Enable,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_ExpectedNames,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Files,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_FnReturnRecords,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_InlineCallbacks,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_LeafResult,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_LeafResult2,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Lines,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Params,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_RelativeDtsPath,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_RelativeDtsPath2,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Returns,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_ReturnValidationReason,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_SectionMap,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_SourceSection,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_SourceSection2,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Stripped,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Stripped2,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_SymmetryCurrentDirectory,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_SymmetryMapping,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_SymmetryRelativePath,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_TitleVar,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_TitleVar2,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_UniquenessViolations,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violation,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violation2,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violation3,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violation4,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violation5,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violation6,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violation7,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violation8,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violation9,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_ViolationMessage,
  Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violations,
} from '../../../types/rules/vitest/type-declarations/rules.d.ts';

/**
 * Rules - Vitest - Type Declarations - Rules - Cross Section References.
 *
 * Inspector rule `inspector-cross-section-references`: a `.d.ts` section may only reference
 * types from its own section or imported names; cross-section references must be promoted to
 * a shared type file.
 *
 * @param {Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Config} config - Config.
 * @param {Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Returns}
 *
 * @since 0.20.0
 */
export async function crossSectionReferences(config: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Config, enable: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Enable): Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Returns {
  if (isEnabled('inspector-cross-section-references', enable) === false) {
    return;
  }

  const files: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Files = await discoverTypeFiles(config);
  const crossSectionCurrentDirectory: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_CrossSectionCurrentDirectory = config['packageRoot'] ?? process.cwd();

  for (const file of files) {
    const crossSectionRelativePath: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_CrossSectionRelativePath = relative(crossSectionCurrentDirectory, file);

    it(`no cross-section references in ${crossSectionRelativePath}`, async () => {
      if (config['standaloneTypeFiles'].some((pattern) => file.endsWith(pattern)) === true) {
        return;
      }

      const sourcePath: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_SourcePath = deriveSourcePath(file);
      const sourceExists: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_SourceExists = await fileExists(sourcePath);

      if (sourceExists === false) {
        return;
      }

      const content: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Content = await readFile(file, 'utf-8');
      const lines: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Lines = content.split('\n');
      const sourceContent: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_SourceContent = await readFile(sourcePath, 'utf-8');
      const classPrefix: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_ClassPrefix = deriveClassPrefix(file, config);
      const sectionMap: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_SectionMap = buildSourceSectionMap(sourcePath, sourceContent, classPrefix);
      const sourceSectionSet: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_SourceSectionSet = new Set<string>(sectionMap.values());
      const importedNames: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_ImportedNames = extractImportedNames(lines);
      const sections: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Sections = buildDtsSections(lines, sourceSectionSet, classPrefix);
      const sectionPrefixes: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_SectionPrefixes = sections.map((section) => section['prefix']);
      const violations: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Violations = [];

      for (const section of sections) {
        const currentSectionPrefix: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_CurrentSectionPrefix = section['prefix'];

        for (const line of section['typeLines']) {
          const referencedTypes: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_ReferencedTypes = extractReferencedTypes(line, classPrefix);

          for (const referencedType of referencedTypes) {
            const isSameSection: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_IsSameSection = referencedType.startsWith(currentSectionPrefix) === true;
            const isImported: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_IsImported = importedNames.has(referencedType) === true;
            const isOtherSection: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_IsOtherSection = sectionPrefixes.some((sectionPrefix) => {
              return referencedType.startsWith(sectionPrefix) === true && sectionPrefix !== currentSectionPrefix;
            });

            if (
              isOtherSection === true
              && isSameSection === false
              && isImported === false
            ) {
              const violation: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_Violation = `Section "${currentSectionPrefix}" references "${referencedType}" from another section. Move shared types to a shared type file (e.g., shared.d.ts).`;

              violations.push(violation);
            }
          }
        }
      }

      const violationMessage: Rules_Vitest_TypeDeclarations_Rules_CrossSectionReferences_ViolationMessage = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Type Declarations - Rules - Section Alphabetical Order.
 *
 * Inspector rule `inspector-section-alphabetical`: sections in a `.d.ts` file must appear in
 * alphabetical order by their section prefix.
 *
 * @param {Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Config} config - Config.
 * @param {Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Returns}
 *
 * @since 0.20.0
 */
export async function sectionAlphabeticalOrder(config: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Config, enable: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Enable): Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Returns {
  if (isEnabled('inspector-section-alphabetical', enable) === false) {
    return;
  }

  const files: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Files = await discoverTypeFiles(config);
  const sectionOrderCurrentDirectory: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_SectionOrderCurrentDirectory = config['packageRoot'] ?? process.cwd();

  for (const file of files) {
    const sectionOrderRelativePath: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_SectionOrderRelativePath = relative(sectionOrderCurrentDirectory, file);

    it(`sections alphabetical in ${sectionOrderRelativePath}`, async () => {
      if (config['standaloneTypeFiles'].some((pattern) => file.endsWith(pattern)) === true) {
        return;
      }

      const sourcePath: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_SourcePath = deriveSourcePath(file);
      const sourceExists: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_SourceExists = await fileExists(sourcePath);

      if (sourceExists === false) {
        return;
      }

      const content: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Content = await readFile(file, 'utf-8');
      const lines: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Lines = content.split('\n');
      const sourceContent: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_SourceContent = await readFile(sourcePath, 'utf-8');
      const classPrefix: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_ClassPrefix = deriveClassPrefix(file, config);
      const sectionMap: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_SectionMap = buildSourceSectionMap(sourcePath, sourceContent, classPrefix);
      const sourceSectionSet: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_SourceSectionSet = new Set<string>(sectionMap.values());
      const sections: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Sections = buildDtsSections(lines, sourceSectionSet, classPrefix);
      const violations: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Violations = [];

      for (let i: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_I = 1; i < sections.length; i += 1) {
        const previous: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Previous = sections[i - 1] as Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Previous;
        const current: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Current = sections[i] as Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Current;

        if (previous === undefined || current === undefined) {
          continue;
        }

        const compareResult: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_CompareResult = previous['prefix'].localeCompare(current['prefix']);

        if (compareResult > 0) {
          const violation: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_Violation = `Section "${current['prefix']}" appears after section "${previous['prefix']}" but should come before it. Sections in a .d.ts file must be alphabetical by section prefix; move "${current['prefix']}"'s types above "${previous['prefix']}"'s types.`;

          violations.push(violation);
        }
      }

      const violationMessage: Rules_Vitest_TypeDeclarations_Rules_SectionAlphabeticalOrder_ViolationMessage = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Type Declarations - Rules - First Come First Serve Order.
 *
 * Inspector rule `inspector-first-come-first-serve-order`: types within a `.d.ts`
 * section must appear in the order their identifiers first occur in the source file.
 *
 * @param {Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Config} config - Config.
 * @param {Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Returns}
 *
 * @since 0.20.0
 */
export async function firstComeFirstServeOrder(config: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Config, enable: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Enable): Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Returns {
  if (isEnabled('inspector-first-come-first-serve-order', enable) === false) {
    return;
  }

  const files: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Files = await discoverTypeFiles(config);
  const orderCurrentDirectory: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_OrderCurrentDirectory = config['packageRoot'] ?? process.cwd();

  for (const file of files) {
    const orderRelativePath: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_OrderRelativePath = relative(orderCurrentDirectory, file);

    it(`types match source order in ${orderRelativePath}`, async () => {
      if (config['standaloneTypeFiles'].some((pattern) => file.endsWith(pattern)) === true) {
        return;
      }

      let sourcePath: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_SourcePath = deriveSourcePath(file);
      let sourceExists: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_SourceExists = await fileExists(sourcePath);

      if (sourceExists === false) {
        const sourcePathAlternative: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_SourcePathAlternative = sourcePath.replace('.ts', '.tsx');

        sourcePath = sourcePathAlternative;
        sourceExists = await fileExists(sourcePath);

        if (sourceExists === false) {
          strictEqual(sourceExists, true, `Missing source file for ${orderRelativePath}. Expected: ${relative(orderCurrentDirectory, sourcePath)}`);

          return;
        }
      }

      const sourceContent: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_SourceContent = await readFile(sourcePath, 'utf-8');
      const sourceLines: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_SourceLines = sourceContent.split('\n');
      const dtsContent: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_DtsContent = await readFile(file, 'utf-8');
      const dtsLines: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_DtsLines = dtsContent.split('\n');
      const classPrefix: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_ClassPrefix = deriveClassPrefix(file, config);
      const sectionMap: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_SectionMap = buildSourceSectionMap(sourcePath, sourceContent, classPrefix);
      const sourceSectionSet: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_SourceSectionSet = new Set<string>(sectionMap.values());
      const sections: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Sections = buildDtsSections(dtsLines, sourceSectionSet, classPrefix);
      const objectTypes: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_ObjectTypes = extractObjectTypes(dtsLines, classPrefix);
      const objectPropertyTypeNames: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_ObjectPropertyTypeNames = new Set<string>();
      const arrayElementTypeNames: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_ArrayElementTypeNames = new Set<string>();

      for (const objectType of objectTypes) {
        for (const property of objectType['properties']) {
          objectPropertyTypeNames.add(property['valueType']);
        }
      }

      const arrayTypesForOrder: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_ArrayTypesForOrder = extractArrayTypes(dtsLines);

      for (const arrayType of arrayTypesForOrder) {
        arrayElementTypeNames.add(arrayType['elementTypeName']);
      }

      const violations: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Violations = [];

      for (const section of sections) {
        const typeNames: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_TypeNames = extractTypeNames(section['typeLines']);
        const typePositions: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_TypePositions = [];

        for (const typeName of typeNames) {
          // Skip object property types - validated by object property test.
          if (objectPropertyTypeNames.has(typeName) === true) {
            continue;
          }

          // Skip array element types - validated by object property test (array extension).
          if (arrayElementTypeNames.has(typeName) === true) {
            continue;
          }

          const sourceLineIndex: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_SourceLineIndex = findFirstOccurrence(sourceLines, typeName);

          if (sourceLineIndex === -1) {
            continue;
          }

          typePositions.push({
            name: typeName,
            sourceLine: sourceLineIndex,
          });
        }

        const sortedPositions: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_SortedPositions = [...typePositions].sort((positionA, positionB) => positionA['sourceLine'] - positionB['sourceLine']);

        for (let j: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_J = 0; j < typePositions.length; j += 1) {
          const actual: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Actual = typePositions[j] as Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Actual;
          const expected: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Expected = sortedPositions[j] as Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Expected;

          if (actual === undefined || expected === undefined) {
            continue;
          }

          if (actual['name'] !== expected['name']) {
            const violation: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_Violation = `Section "${section['prefix']}": at .d.ts position ${j + 1}, found "${actual['name']}" (first appears at source line ${actual['sourceLine'] + 1}) but expected "${expected['name']}" (first appears at source line ${expected['sourceLine'] + 1}, which comes earlier in source). Move "${expected['name']}" to position ${j + 1} so the .d.ts mirrors the source's first-come-first-serve order.`;

            violations.push(violation);
          }
        }
      }

      const violationMessage: Rules_Vitest_TypeDeclarations_Rules_FirstComeFirstServeOrder_ViolationMessage = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Type Declarations - Rules - Object Property Types.
 *
 * Inspector rule `inspector-object-property-types`: object-type properties must use
 * named types that start with the parent's name and are defined before the object type.
 *
 * @param {Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Config} config - Config.
 * @param {Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Returns}
 *
 * @since 0.20.0
 */
export async function objectPropertyTypes(config: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Config, enable: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Enable): Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Returns {
  if (isEnabled('inspector-object-property-types', enable) === false) {
    return;
  }

  const files: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Files = await discoverTypeFiles(config);
  const objectPropsCurrentDirectory: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_ObjectPropsCurrentDirectory = config['packageRoot'] ?? process.cwd();

  for (const file of files) {
    const objectPropsRelativePath: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_ObjectPropsRelativePath = relative(objectPropsCurrentDirectory, file);

    it(`object properties use named types in ${objectPropsRelativePath}`, async () => {
      const content: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Content = await readFile(file, 'utf-8');
      const lines: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Lines = content.split('\n');
      const classPrefix: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_ClassPrefix = deriveClassPrefix(file, config);
      const violations: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Violations = [];
      const definedTypes: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_DefinedTypes = new Set<string>();

      for (let i: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_I = 0; i < lines.length; i += 1) {
        const line: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Line = lines[i] as Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Line;

        if (line === undefined) {
          continue;
        }

        const typeDefMatch: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_TypeDefMatch = line.match(LIB_REGEX_PATTERN_EXPORT_TYPE_NAME);

        if (typeDefMatch !== null && typeDefMatch[1] !== undefined) {
          definedTypes.add(typeDefMatch[1]);
        }
      }

      const objectTypes: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_ObjectTypes = extractObjectTypes(lines, classPrefix);

      for (const objectType of objectTypes) {
        for (const property of objectType['properties']) {
          const propertyExpectedPrefix: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_PropertyExpectedPrefix = objectType['name'];

          if (property['valueType'].startsWith(propertyExpectedPrefix) === false) {
            const violation: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Violation = `"${objectType['name']}": property "${property['key']}" must use a named type starting with "${propertyExpectedPrefix}" but found "${property['valueType']}".`;

            violations.push(violation);

            continue;
          }

          if (definedTypes.has(property['valueType']) === false) {
            const violation2: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Violation2 = `"${objectType['name']}": property type "${property['valueType']}" is not defined in this file.`;

            violations.push(violation2);

            continue;
          }

          if (property['typeLineIndex'] > objectType['lineIndex']) {
            const violation3: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Violation3 = `"${objectType['name']}": property type "${property['valueType']}" (line ${property['typeLineIndex'] + 1}) must be defined before the object type (line ${objectType['lineIndex'] + 1}).`;

            violations.push(violation3);
          }
        }
      }

      const importedNames: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_ImportedNames = extractImportedNames(lines);
      const arrayTypes: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_ArrayTypes = extractArrayTypes(lines);
      const typeDefLines: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_TypeDefLines = new Map<string, number>();

      for (let i: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_I = 0; i < lines.length; i += 1) {
        const line2: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Line2 = lines[i] as Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Line2;

        if (line2 === undefined) {
          continue;
        }

        const defMatch: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_DefMatch = line2.match(LIB_REGEX_PATTERN_EXPORT_TYPE_NAME);

        if (
          defMatch !== null
          && defMatch[1] !== undefined
          && typeDefLines.has(defMatch[1]) === false
        ) {
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

        const elementLine: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_ElementLine = typeDefLines.get(arrayType['elementTypeName']) ?? -1;

        if (elementLine === -1) {
          continue;
        }

        if (elementLine > arrayType['lineIndex']) {
          const violation4: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_Violation4 = `"${arrayType['arrayTypeName']}" (line ${arrayType['lineIndex'] + 1}): array element type "${arrayType['elementTypeName']}" (line ${elementLine + 1}) must be defined before the array type.`;

          violations.push(violation4);
        }
      }

      const violationMessage: Rules_Vitest_TypeDeclarations_Rules_ObjectPropertyTypes_ViolationMessage = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Type Declarations - Rules - Section Coverage.
 *
 * Inspector rule `inspector-section-coverage`: every source section must have matching
 * `.d.ts` types, and every `.d.ts` section must map back to a real source section.
 *
 * @param {Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_Config} config - Config.
 * @param {Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_Returns}
 *
 * @since 0.20.0
 */
export async function sectionCoverage(config: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_Config, enable: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_Enable): Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_Returns {
  if (isEnabled('inspector-section-coverage', enable) === false) {
    return;
  }

  const files: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_Files = await discoverTypeFiles(config);
  const coverageCurrentDirectory: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_CoverageCurrentDirectory = config['packageRoot'] ?? process.cwd();

  for (const file of files) {
    const coverageRelativePath: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_CoverageRelativePath = relative(coverageCurrentDirectory, file);

    it(`source sections have matching .d.ts sections in ${coverageRelativePath}`, async () => {
      if (config['standaloneTypeFiles'].some((pattern) => file.endsWith(pattern)) === true) {
        return;
      }

      let sourcePath: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SourcePath = deriveSourcePath(file);
      let sourceExists: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SourceExists = await fileExists(sourcePath);

      if (sourceExists === false) {
        const sourcePathAlternative: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SourcePathAlternative = sourcePath.replace('.ts', '.tsx');

        sourcePath = sourcePathAlternative;
        sourceExists = await fileExists(sourcePath);

        if (sourceExists === false) {
          return;
        }
      }

      const sourceContent: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SourceContent = await readFile(sourcePath, 'utf-8');
      const dtsContent: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_DtsContent = await readFile(file, 'utf-8');
      const dtsLines: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_DtsLines = dtsContent.split('\n');
      const classPrefix: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_ClassPrefix = deriveClassPrefix(file, config);
      const sectionMap: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SectionMap = buildSourceSectionMap(sourcePath, sourceContent, classPrefix);
      const sourceSectionSet: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SourceSectionSet = new Set<string>(sectionMap.values());
      const dtsSections: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_DtsSections = buildDtsSections(dtsLines, sourceSectionSet, classPrefix);
      const dtsSectionPrefixes: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_DtsSectionPrefixes = new Set<string>(dtsSections.map((section) => section['prefix']));
      const violations: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_Violations = [];

      // Forward direction: every non-classPrefix source section should have at least one .d.ts type belonging to it.
      // (If a method has no body-var types in .d.ts, it doesn't need a section. So we only fire when the source
      // section is a "leaf" - no child section under it - and the .d.ts has zero types under that section.)
      for (const sourceSectionPrefix of sourceSectionSet) {
        if (sourceSectionPrefix === classPrefix) {
          continue;
        }

        const isParent: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_IsParent = Array.from(sourceSectionSet).some((otherSection) => {
          return otherSection !== sourceSectionPrefix && otherSection.startsWith(`${sourceSectionPrefix}_`) === true;
        });

        if (isParent === true) {
          continue;
        }

        if (dtsSectionPrefixes.has(sourceSectionPrefix) === false) {
          const violation: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_Violation = `Source has section "${sourceSectionPrefix}" but .d.ts has no types belonging to it. Add an "export type" with that prefix, or remove the corresponding source identifier.`;

          violations.push(violation);
        }
      }

      // Reverse direction: every .d.ts type whose prefix begins with classPrefix must map to a real source section.
      // Loose types (one chunk after classPrefix) are OK. Multi-chunk types must have their second chunk match a real method.
      // Exemption: property-hierarchy types - if a single-chunk type `${classPrefix}_X` exists in the .d.ts, then
      // multi-chunk types `${classPrefix}_X_*` are treated as its E1-style property types (Parent_Property form),
      // not as an implied source section. Covers patterns like `testConfig: { standaloneTypeFiles, typeRoots }`
      // where the parent is an object-typed const (no source section) but the property types are well-formed.
      const singleChunkTopLevelTypes: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SingleChunkTopLevelTypes = new Set();

      for (const line of dtsLines) {
        if (line.startsWith('export type ') === false) {
          continue;
        }

        const singleChunkMatch: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SingleChunkMatch = line.match(LIB_REGEX_PATTERN_EXPORT_TYPE_NAME);

        if (singleChunkMatch === null || singleChunkMatch[1] === undefined) {
          continue;
        }

        const singleChunkTypeName: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SingleChunkTypeName = singleChunkMatch[1];

        if (singleChunkTypeName.startsWith(`${classPrefix}_`) === false) {
          continue;
        }

        const singleChunkAfterClassPrefix: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_SingleChunkAfterClassPrefix = singleChunkTypeName.slice(classPrefix.length + 1);

        if (singleChunkAfterClassPrefix.includes('_') === false) {
          singleChunkTopLevelTypes.add(singleChunkTypeName);
        }
      }

      for (const line of dtsLines) {
        if (line.startsWith('export type ') === false) {
          continue;
        }

        const reverseMatch: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_ReverseMatch = line.match(LIB_REGEX_PATTERN_EXPORT_TYPE_NAME);

        if (reverseMatch === null || reverseMatch[1] === undefined) {
          continue;
        }

        const reverseTypeName: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_ReverseTypeName = reverseMatch[1];

        if (reverseTypeName.startsWith(`${classPrefix}_`) === false) {
          continue;
        }

        const reverseAfterClassPrefix: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_ReverseAfterClassPrefix = reverseTypeName.slice(classPrefix.length + 1);
        const reverseChunks: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_ReverseChunks = reverseAfterClassPrefix.split('_');

        if (reverseChunks.length <= 1) {
          continue;
        }

        const reverseExpectedMethodSection: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_ReverseExpectedMethodSection = `${classPrefix}_${reverseChunks[0]}`;

        // Property-hierarchy exemption: if `${classPrefix}_${firstChunk}` exists as a single-chunk top-level type
        // in this .d.ts, the multi-chunk type is a property of that parent (Parent_Property form), not a section.
        if (singleChunkTopLevelTypes.has(reverseExpectedMethodSection) === true) {
          continue;
        }

        if (sourceSectionSet.has(reverseExpectedMethodSection) === false) {
          const violation2: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_Violation2 = `.d.ts type "${reverseTypeName}" expects source section "${reverseExpectedMethodSection}" but no class/method/function/(string, fn) call by that name exists in the source file. Fix options: (a) rename the .d.ts type to match an existing source section, (b) add a matching source identifier (class, method, top-level function, or function-typed const), or (c) add this file to standaloneTypeFiles if the .d.ts is a domain type file with no source mirror.`;

          violations.push(violation2);
        }
      }

      const violationMessage: Rules_Vitest_TypeDeclarations_Rules_SectionCoverage_ViolationMessage = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Type Declarations - Rules - Variable Type Symmetry.
 *
 * Inspector rule `inspector-variable-type-symmetry`: body vars, params, and returns in
 * a source file must follow the Mode 2 naming rules (7.1-7.8) and mirror the paired d.ts.
 *
 * @param {Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Config} config - Config.
 * @param {Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Returns}
 *
 * @since 0.20.0
 */
export async function variableTypeSymmetry(config: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Config, enable: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Enable): Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Returns {
  if (isEnabled('inspector-variable-type-symmetry', enable) === false) {
    return;
  }

  const files: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Files = await discoverSourceFiles(config);
  const symmetryCurrentDirectory: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_SymmetryCurrentDirectory = config['packageRoot'] ?? process.cwd();
  const symmetryMapping: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_SymmetryMapping = config['mapping'];

  for (const file of files) {
    const symmetryRelativePath: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_SymmetryRelativePath = relative(symmetryCurrentDirectory, file);

    it(`variable type symmetry in ${symmetryRelativePath}`, async () => {
      const content: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Content = await readFile(file, 'utf-8');
      const lines: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Lines = content.split('\n');
      const classPrefix: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_ClassPrefix = deriveClassPrefix(file, config);
      const sectionMap: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_SectionMap = buildSourceSectionMap(file, content, classPrefix);
      const dtsPath: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_DtsPath = symmetryMapping.sourceToDts(file);
      const dtsExists: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_DtsExists = await fileExists(dtsPath);
      const dtsContent: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_DtsContent = (dtsExists === true) ? await readFile(dtsPath, 'utf-8') : '';
      const violations: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violations = [];

      // Rule 7.4: Inline typed callbacks forbidden.
      const inlineCallbacks: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_InlineCallbacks = detectInlineTypedCallbacks(file, content);

      for (const callback of inlineCallbacks) {
        const violation: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violation = `${symmetryRelativePath}:${callback['lineNumber']}: rule 7.4 violation: inline typed callback param "${callback['paramName']}: ${callback['typeName']}" is forbidden. Extract the callback to a named const so it follows rule 7.1.`;

        violations.push(violation);
      }

      // Rules 7.1, 7.2, 7.3 - body declarations.
      const bodyDecls: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_BodyDecls = extractBodyDeclarations(lines);
      const expectedNames: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_ExpectedNames = [];

      for (const decl of bodyDecls) {
        const sourceSection: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_SourceSection = sectionMap.get(decl['lineNumber']) ?? classPrefix;

        // Rule 7.3: banned suffixes at body var position.
        if (isReservedSuffix(decl['typeName']) === true) {
          const violation2: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violation2 = `${symmetryRelativePath}:${decl['lineNumber']}: rule 7.3 violation: body var "${decl['varName']}: ${decl['typeName']}" uses a return-position-only suffix (Returns/TypeGuard/Return). Use a different type name without that suffix.`;

          violations.push(violation2);

          continue;
        }

        // Rule 7.1: leaf must match title-cased var name.
        const leafResult: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_LeafResult = validateLeaf(decl['varName'], decl['typeName'], sourceSection, classPrefix);

        if (leafResult !== null) {
          const violation3: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violation3 = `${symmetryRelativePath}:${decl['lineNumber']}: rule 7.1 violation: body var "${decl['varName']}: ${decl['typeName']}" -- expected leaf "${leafResult['expectedLeaf']}" but found "${leafResult['actualLeaf']}". Rename the type to "${sourceSection}_${leafResult['expectedLeaf']}" or "${classPrefix}_${leafResult['expectedLeaf']}".`;

          violations.push(violation3);
        }

        // Rule 7.2 (Mode 2): body var types must be locally defined and not aliases to foreign types.
        if (dtsExists === true) {
          if (isLocallyDefined(decl['typeName'], dtsContent) === false) {
            const relativeDtsPath: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_RelativeDtsPath = dtsPath.replace(symmetryCurrentDirectory, '');
            const cleanedDtsPath: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_CleanedDtsPath = (relativeDtsPath.startsWith('/') === true) ? relativeDtsPath.slice(1) : relativeDtsPath;
            const violation4: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violation4 = `${symmetryRelativePath}:${decl['lineNumber']}: rule 7.2 violation: body var type "${decl['typeName']}" is not defined in the corresponding .d.ts. Cross-module body-var types are forbidden -- define the type concretely in ${cleanedDtsPath}, or promote the shape to shared.d.ts, or skip the typed body var.`;

            violations.push(violation4);
          } else if (isAliasToForeignType(decl['typeName'], dtsContent, classPrefix) === true) {
            const relativeDtsPath2: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_RelativeDtsPath2 = dtsPath.replace(symmetryCurrentDirectory, '');
            const cleanedDtsPath2: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_CleanedDtsPath2 = (relativeDtsPath2.startsWith('/') === true) ? relativeDtsPath2.slice(1) : relativeDtsPath2;
            const violation5: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violation5 = `${symmetryRelativePath}:${decl['lineNumber']}: rule 7.2 violation: body var type "${decl['typeName']}" is locally defined but only as an alias to a foreign type. Cross-module body-var types are forbidden -- escape hatches: (a) promote the shape to shared.d.ts, (b) redefine the concrete shape in ${cleanedDtsPath2}, or (c) inline the call to skip the typed body var.`;

            violations.push(violation5);
          }
        }

        // Collect expected name for rule 7.8.
        const stripped: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Stripped = stripUnderscorePrefix(decl['varName']);
        const titleVar: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_TitleVar = stripped.charAt(0).toUpperCase() + stripped.slice(1);

        expectedNames.push({
          name: decl['varName'],
          typeName: `${sourceSection}_${titleVar}`,
          lineNumber: decl['lineNumber'],
        });
      }

      // Rules 7.1, 7.3 - function params.
      const params: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Params = extractFunctionParams(file, content);

      for (const param of params) {
        const sourceSection2: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_SourceSection2 = sectionMap.get(param['lineNumber']) ?? classPrefix;

        // Rule 7.3: banned suffixes at param position.
        if (isReservedSuffix(param['typeName']) === true) {
          const violation6: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violation6 = `${symmetryRelativePath}:${param['lineNumber']}: rule 7.3 violation: param "${param['paramName']}: ${param['typeName']}" uses a return-position-only suffix (Returns/TypeGuard/Return). Use a different type name without that suffix.`;

          violations.push(violation6);

          continue;
        }

        // Rule 7.1: leaf must match title-cased param name.
        const leafResult2: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_LeafResult2 = validateLeaf(param['paramName'], param['typeName'], sourceSection2, classPrefix);

        if (leafResult2 !== null) {
          const violation7: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violation7 = `${symmetryRelativePath}:${param['lineNumber']}: rule 7.1 violation: param "${param['paramName']}: ${param['typeName']}" -- expected leaf "${leafResult2['expectedLeaf']}" but found "${leafResult2['actualLeaf']}". Rename the type to "${sourceSection2}_${leafResult2['expectedLeaf']}" or "${classPrefix}_${leafResult2['expectedLeaf']}".`;

          violations.push(violation7);
        }

        // Collect expected name for rule 7.8.
        const stripped2: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Stripped2 = stripUnderscorePrefix(param['paramName']);
        const titleVar2: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_TitleVar2 = stripped2.charAt(0).toUpperCase() + stripped2.slice(1);

        expectedNames.push({
          name: param['paramName'],
          typeName: `${sourceSection2}_${titleVar2}`,
          lineNumber: param['lineNumber'],
        });
      }

      // Rules 7.5, 7.6, 7.7 - function returns.
      const fnReturnRecords: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_FnReturnRecords = extractFunctionReturns(file, content);

      for (const ret of fnReturnRecords) {
        const returnValidationReason: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_ReturnValidationReason = validateReturnType(ret['returnType'], ret['isTypeGuard']);

        if (returnValidationReason !== null) {
          const violation8: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violation8 = `${symmetryRelativePath}:${ret['lineNumber']}: rule 7.5/7.6/7.7 violation: ${returnValidationReason}`;

          violations.push(violation8);
        }
      }

      // Rule 7.8: uniqueness of expected type names across all body vars + params.
      const uniquenessViolations: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_UniquenessViolations = checkTypeNameUniqueness(expectedNames);

      for (const uniquenessViolation of uniquenessViolations) {
        const violation9: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_Violation9 = `${symmetryRelativePath}: rule 7.8 violation: ${uniquenessViolation}`;

        violations.push(violation9);
      }

      const violationMessage: Rules_Vitest_TypeDeclarations_Rules_VariableTypeSymmetry_ViolationMessage = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Type Declarations - Rules - Identifier Vs File Name.
 *
 * Inspector rule `inspector-identifier-vs-filename` (Mode 2 rules C1/C2/C3): a top-level
 * class/function/function-typed-const name must not equal the file name.
 *
 * @param {Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Config} config - Config.
 * @param {Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Returns}
 *
 * @since 0.20.0
 */
export async function identifierVsFileName(config: Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Config, enable: Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Enable): Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Returns {
  if (isEnabled('inspector-identifier-vs-filename', enable) === false) {
    return;
  }

  const files: Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Files = await discoverSourceFiles(config);
  const identifierVsFileNameCurrentDirectory: Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_IdentifierVsFileNameCurrentDirectory = config['packageRoot'] ?? process.cwd();

  for (const file of files) {
    const identifierVsFileNameRelativePath: Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_IdentifierVsFileNameRelativePath = relative(identifierVsFileNameCurrentDirectory, file);

    it(`top-level identifiers in ${identifierVsFileNameRelativePath} do not equal file name`, async () => {
      const content: Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Content = await readFile(file, 'utf-8');
      const classPrefix: Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_ClassPrefix = deriveClassPrefix(file, config);
      const segments: Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Segments = classPrefix.split('_');
      const fileName: Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_FileName = segments[segments.length - 1] ?? '';
      const identifiers: Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Identifiers = extractTopLevelIdentifiers(file, content);
      const violations: Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Violations = [];

      for (const identifier of identifiers) {
        if (identifier['name'] === fileName) {
          const violation: Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_Violation = `${identifierVsFileNameRelativePath}:${identifier['lineNumber']}: rule C1/C2/C3 violation: top-level ${identifier['kind']} name "${identifier['name']}" equals file name "${fileName}". Rename the ${identifier['kind']} (use a barrel re-export if consumers need to import the file-name as the public name).`;

          violations.push(violation);
        }
      }

      const violationMessage: Rules_Vitest_TypeDeclarations_Rules_IdentifierVsFileName_ViolationMessage = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Type Declarations - Rules - Filename Validation.
 *
 * Inspector rule `inspector-filename-validation` (Mode 2 rules EC19/EC20/EC21): each
 * path segment must be kebab-case or PascalCase after stripping the recognized suffixes.
 * Mission is mirror-engine path-token validity; file naming is require-kebab-case-filename.
 *
 * @param {Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_Config} config - Config.
 * @param {Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_Returns}
 *
 * @since 0.20.0
 */
export async function filenameValidation(config: Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_Config, enable: Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_Enable): Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_Returns {
  if (isEnabled('inspector-filename-validation', enable) === false) {
    return;
  }

  const sourceFiles: Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_SourceFiles = await discoverSourceFiles(config);
  const dtsFiles: Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_DtsFiles = await discoverTypeFiles(config);
  const allFiles: Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_AllFiles = [
    ...sourceFiles,
    ...dtsFiles,
  ];
  const filenameValidationCurrentDirectory: Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_FilenameValidationCurrentDirectory = config['packageRoot'] ?? process.cwd();

  for (const file of allFiles) {
    const filenameValidationRelativePath: Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_FilenameValidationRelativePath = relative(filenameValidationCurrentDirectory, file);

    it(`filename and path segments in ${filenameValidationRelativePath} are valid`, () => {
      let cleaned: Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_Cleaned = filenameValidationRelativePath;

      for (const typeRoot of config['typeRoots']) {
        cleaned = cleaned.replace(`${typeRoot}/types/`, '');
        cleaned = cleaned.replace(`${typeRoot}/`, '');
      }

      cleaned = cleaned.replace(LIB_REGEX_PATTERN_EXT_D_TS_SUFFIX, '');
      cleaned = cleaned.replace(LIB_REGEX_PATTERN_EXT_D_MTS_SUFFIX, '');
      cleaned = cleaned.replace(LIB_REGEX_PATTERN_EXT_D_CTS_SUFFIX, '');
      cleaned = cleaned.replace(LIB_REGEX_PATTERN_EXT_TSX_SUFFIX, '');
      cleaned = cleaned.replace(LIB_REGEX_PATTERN_EXT_TS_SUFFIX, '');
      cleaned = cleaned.replace(LIB_REGEX_PATTERN_EXT_MTS_SUFFIX, '');
      cleaned = cleaned.replace(LIB_REGEX_PATTERN_EXT_CTS_SUFFIX, '');
      cleaned = cleaned.replace(LIB_REGEX_PATTERN_EXT_JSX_SUFFIX, '');
      cleaned = cleaned.replace(LIB_REGEX_PATTERN_EXT_JS_SUFFIX, '');
      cleaned = cleaned.replace(LIB_REGEX_PATTERN_EXT_MJS_SUFFIX, '');
      cleaned = cleaned.replace(LIB_REGEX_PATTERN_EXT_CJS_SUFFIX, '');
      cleaned = cleaned.replace(LIB_REGEX_PATTERN_EXTENSION_TEST_SUFFIX, '');

      const segments: Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_Segments = cleaned.split(sep).join('/').split('/').filter((segment) => segment.length > 0);
      const pattern: Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_Pattern = LIB_REGEX_PATTERN_KEBAB_CASE_SEGMENT;
      const pascalCasePattern: Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_PascalCasePattern = LIB_REGEX_PATTERN_PASCAL_CASE_SEGMENT;
      const violations: Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_Violations = [];

      for (const segment of segments) {
        const matchesKebab: Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_MatchesKebab = pattern.test(segment);
        const matchesPascal: Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_MatchesPascal = pascalCasePattern.test(segment);

        if (matchesKebab === false && matchesPascal === false) {
          const violation: Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_Violation = `${filenameValidationRelativePath}: invalid path segment "${segment}". Path segments must be kebab-case (/^[a-z][a-z0-9-]*$/) or PascalCase (/^[A-Z][A-Za-z0-9]*$/). Recognized strippable suffixes: .d.ts, .d.mts, .d.cts, .tsx, .ts, .mts, .cts, .jsx, .js, .mjs, .cjs, .test. Underscores, dots, spaces, camelCase, and leading digits are rejected.`;

          violations.push(violation);
        }
      }

      const violationMessage: Rules_Vitest_TypeDeclarations_Rules_FilenameValidation_ViolationMessage = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Type Declarations - Rules - Standalone Type Files.
 *
 * Inspector rule `inspector-standalone-type-files` (Mode 2 rules S1/S2/S3/S4): files in
 * `standaloneTypeFiles` are validated as domain type files rather than source mirrors.
 *
 * @param {Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Config} config - Config.
 * @param {Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Returns}
 *
 * @since 0.20.0
 */
export async function standaloneTypeFiles(config: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Config, enable: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Enable): Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Returns {
  if (isEnabled('inspector-standalone-type-files', enable) === false) {
    return;
  }

  const standaloneSourceFiles: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_StandaloneSourceFiles = await discoverSourceFiles(config);
  const standaloneDtsFiles: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_StandaloneDtsFiles = await discoverTypeFiles(config);
  const topLevelPathPrefixes: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_TopLevelPathPrefixes = new Set<string>();

  for (const sourceFile of standaloneSourceFiles) {
    const sourceClassPrefix: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_SourceClassPrefix = deriveClassPrefix(sourceFile, config);
    const firstChunk: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_FirstChunk = sourceClassPrefix.split('_')[0];

    if (firstChunk !== undefined && firstChunk !== '') {
      topLevelPathPrefixes.add(firstChunk);
    }
  }

  const standaloneFiles: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_StandaloneFiles = standaloneDtsFiles.filter((dtsFile) => config['standaloneTypeFiles'].some((pattern) => dtsFile.endsWith(pattern)));
  const standaloneCurrentDirectory: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_StandaloneCurrentDirectory = config['packageRoot'] ?? process.cwd();

  // A consumer may legitimately have no standalone type files (e.g. no shared.d.ts). Register a
  // trivially-passing test so the suite is non-empty (vitest errors on a suite that yields zero tests).
  // The description is templated (like the per-file `standalone file rules in ${...}` tests below) so it
  // attributes to the describe-level section and needs no dedicated .d.ts coverage type.
  if (standaloneFiles.length === 0) {
    it(`standalone file rules in ${standaloneCurrentDirectory} (no standalone type files configured)`, () => {
      return;
    });
  }

  for (const file of standaloneFiles) {
    const standaloneRelativePath: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_StandaloneRelativePath = relative(standaloneCurrentDirectory, file);

    it(`standalone file rules in ${standaloneRelativePath}`, async () => {
      const content: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Content = await readFile(file, 'utf-8');
      const lines: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Lines = content.split('\n');
      const typeLines: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_TypeLines = lines.filter((line) => line.startsWith('export type '));
      const typeNames: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_TypeNames = extractTypeNames(typeLines);
      const localTypeSet: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_LocalTypeSet = new Set<string>(typeNames);
      const primitiveSet: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_PrimitiveSet = new Set<string>([
        'string',
        'number',
        'boolean',
        'unknown',
        'never',
        'void',
        'null',
        'undefined',
        'any',
        'object',
        'symbol',
        'bigint',
      ]);
      const pascalCasePattern: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_PascalCasePattern = LIB_REGEX_PATTERN_PASCAL_CASE_UNDERSCORE_TYPE_NAME;
      const brandCasePattern: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_BrandCasePattern = LIB_REGEX_PATTERN_THREE_CONSECUTIVE_CAPS;
      const violations: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Violations = [];

      for (const typeName of typeNames) {
        if (pascalCasePattern.test(typeName) === false) {
          const violation: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Violation = `${standaloneRelativePath}: rule S1 violation: type "${typeName}" is not PascalCase. Standalone-file types must be PascalCase, optionally underscore-separated for nested properties (e.g., EntryItem, EntryItem_Category).`;

          violations.push(violation);

          continue;
        }

        if (brandCasePattern.test(typeName) === true) {
          const violation2: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Violation2 = `${standaloneRelativePath}: rule S1 violation: type "${typeName}" uses brand casing (3+ consecutive uppercase letters). Use Pascal-cased acronyms instead (e.g., Url, Api, Cli -- not URL, API, CLI).`;

          violations.push(violation2);
        }
      }

      for (const typeName of typeNames) {
        for (const pathPrefix of topLevelPathPrefixes) {
          if (typeName.startsWith(`${pathPrefix}_`) === true) {
            const violation3: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Violation3 = `${standaloneRelativePath}: rule S2 violation: type "${typeName}" looks like a path-prefix-style name (starts with "${pathPrefix}_" -- a known source-file top-level segment). Standalone-file types must be domain concepts, not path-derived.`;

            violations.push(violation3);
            break;
          }
        }
      }

      const objectTypes: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_ObjectTypes = extractObjectTypes(lines, '');

      for (const objectType of objectTypes) {
        const expectedPropertyPrefix: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_ExpectedPropertyPrefix = `${objectType['name']}_`;

        for (const property of objectType['properties']) {
          if (primitiveSet.has(property['valueType']) === true) {
            continue;
          }

          if (localTypeSet.has(property['valueType']) === false) {
            continue;
          }

          if (property['valueType'].startsWith(expectedPropertyPrefix) === false) {
            const violation4: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Violation4 = `${standaloneRelativePath}: rule S3 violation: object type "${objectType['name']}" property "${property['key']}" uses local type "${property['valueType']}" which does not start with "${expectedPropertyPrefix}". Add an intermediate alias (e.g., "${expectedPropertyPrefix}${property['key'].charAt(0).toUpperCase() + property['key'].slice(1)} = ${property['valueType']};") to use the Parent_Property nesting form.`;

            violations.push(violation4);
          }
        }
      }

      const arrayTypes: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_ArrayTypes = extractArrayTypes(lines);
      const typePositions: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_TypePositions = new Map<string, number>();

      for (let i: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_I = 0; i < lines.length; i += 1) {
        const lineToScan: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_LineToScan = lines[i] as Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_LineToScan;

        if (lineToScan === undefined) {
          continue;
        }

        const positionMatch: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_PositionMatch = lineToScan.match(LIB_REGEX_PATTERN_EXPORT_TYPE_NAME);

        if (
          positionMatch !== null
          && positionMatch[1] !== undefined
          && typePositions.has(positionMatch[1]) === false
        ) {
          typePositions.set(positionMatch[1], i);
        }
      }

      for (const arrayType of arrayTypes) {
        const elementLine: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_ElementLine = typePositions.get(arrayType['elementTypeName']) ?? -1;

        if (elementLine === -1) {
          continue;
        }

        if (elementLine >= arrayType['lineIndex']) {
          const violation5: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_Violation5 = `${standaloneRelativePath}:${arrayType['lineIndex'] + 1}: rule S4 violation: array type "${arrayType['arrayTypeName']}" defined before its element type "${arrayType['elementTypeName']}" (element at line ${elementLine + 1}). Define element types before arrays.`;

          violations.push(violation5);
        }
      }

      const violationMessage: Rules_Vitest_TypeDeclarations_Rules_StandaloneTypeFiles_ViolationMessage = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
}
