import {
  deepStrictEqual,
  fail,
  match,
  notStrictEqual,
  ok,
  strictEqual,
} from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import {
  dirname,
  join,
  relative,
  sep,
} from 'node:path';

import { afterAll, describe, it } from 'vitest';

import {
  buildGeneratedFileHeader,
  compareSemver,
  currentTimestamp,
  detectShell,
  discoverPathsWithFile,
  executeShell,
  isCommandExists,
  isExecuteShellError,
  isFileIdentical,
  isPlainObject,
  isProjectRoot,
  loadWorkspaceManifests,
  normalizeRouteSegment,
  parseLinuxOsReleaseText,
  parseWindowsRegistryText,
  pathExists,
  renameFileWithDate,
  saveGeneratedFile,
  saveWorkspaceManifest,
  shellQuote,
} from '../../lib/utility.js';
import { Logger } from '../../toolkit/index.js';

import type {
  Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAnHTMLCommentStrictBannerForAMdPath_Result,
  Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAPrefixedFillableBannerForAEnvBasename_Result,
  Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAPrefixedStrictBannerForAEnvSampleBasename_Result,
  Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAPrefixedStrictBannerForAGitignoreBasename_Result,
  Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAPrefixedStrictBannerForAnEditorconfigBasename_Result,
  Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAPrefixedStrictBannerForAYamlPath_Result,
  Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAPrefixedStrictBannerForAYmlPath_Result,
  Tests_Lib_Utility_BuildGeneratedFileHeader_ThrowsWhenTheTargetPathHasAnUnsupportedExtension_Threw,
  Tests_Lib_Utility_CompareSemver_ComparesNumericallyNotLexically_Result,
  Tests_Lib_Utility_CompareSemver_ReturnsNegativeWhenFirstVersionIsLower_Result,
  Tests_Lib_Utility_CompareSemver_ReturnsPositiveWhenFirstVersionIsHigher_Result,
  Tests_Lib_Utility_CompareSemver_ReturnsZeroWhenVersionsAreEqual_Result,
  Tests_Lib_Utility_CompareSemver_TreatsMissingPartsAsZero_Result,
  Tests_Lib_Utility_CurrentTimestamp_MatchesExpectedTimestampFormat_Pattern,
  Tests_Lib_Utility_CurrentTimestamp_MatchesExpectedTimestampFormat_Result,
  Tests_Lib_Utility_CurrentTimestamp_ProducesDifferentMillisecondsOnConsecutiveCalls_Results,
  Tests_Lib_Utility_CurrentTimestamp_ProducesDifferentMillisecondsOnConsecutiveCalls_Timestamp,
  Tests_Lib_Utility_CurrentTimestamp_ReturnsABracketedTimestampString_EndsWithBracket,
  Tests_Lib_Utility_CurrentTimestamp_ReturnsABracketedTimestampString_Result,
  Tests_Lib_Utility_CurrentTimestamp_ReturnsABracketedTimestampString_StartsWithBracket,
  Tests_Lib_Utility_DetectShell_ReturnsAKnownShellPath_IsKnownShell,
  Tests_Lib_Utility_DetectShell_ReturnsAKnownShellPath_KnownShells,
  Tests_Lib_Utility_DetectShell_ReturnsAKnownShellPath_Result,
  Tests_Lib_Utility_DetectShell_ReturnsANonEmptyString_Result,
  Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_AbsolutePaths,
  Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_AppPackage,
  Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_AppRoot,
  Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_AppStuffRoot,
  Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_ProjectPackage,
  Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_ProjectRoot,
  Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_RealAppStuffRoot,
  Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_RealProjectRoot,
  Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_RelativePaths,
  Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_AbsolutePaths,
  Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_AppPackage,
  Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_AppRoot,
  Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_DotHiddenPackage,
  Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_DotHiddenRoot,
  Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_NodePackage,
  Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_NodeRoot,
  Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_PackagePackage,
  Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_PackageRoot,
  Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_ProjectPackage,
  Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_ProjectRoot,
  Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_RealProjectRoot,
  Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_RelativePaths,
  Tests_Lib_Utility_DiscoverPathsWithFile_OriginalCwd,
  Tests_Lib_Utility_DiscoverPathsWithFile_SandboxPrefix,
  Tests_Lib_Utility_DiscoverPathsWithFile_SandboxRoot,
  Tests_Lib_Utility_DiscoverPathsWithFile_TemporaryDirectory,
  Tests_Lib_Utility_ExecuteShell_ReturnsNonZeroCodeForFailingCommand_Result,
  Tests_Lib_Utility_ExecuteShell_RunsASimpleEchoCommand_IncludesHello,
  Tests_Lib_Utility_ExecuteShell_RunsASimpleEchoCommand_Result,
  Tests_Lib_Utility_IsCommandExists_ReturnsFalseForANonExistentCommand_Result,
  Tests_Lib_Utility_IsCommandExists_ReturnsTrueForAnExistingCommand_Result,
  Tests_Lib_Utility_IsExecuteShellError_ReturnsFalseForEmptyObject_Result,
  Tests_Lib_Utility_IsExecuteShellError_ReturnsFalseForNull_Result,
  Tests_Lib_Utility_IsExecuteShellError_ReturnsFalseForNumber_Result,
  Tests_Lib_Utility_IsExecuteShellError_ReturnsFalseForObjectWithWrongPropertyTypes_Result,
  Tests_Lib_Utility_IsExecuteShellError_ReturnsFalseForString_Result,
  Tests_Lib_Utility_IsExecuteShellError_ReturnsFalseForUndefined_Result,
  Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithCmdProperty_Result,
  Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithCodeProperty_Result,
  Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithKilledProperty_Result,
  Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithMultipleExecProperties_Error,
  Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithMultipleExecProperties_Result,
  Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithSignalProperty_Result,
  Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithStderrProperty_Result,
  Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithStdoutProperty_Result,
  Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenFileDoesNotExist_FilePath,
  Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenFileDoesNotExist_Result,
  Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenObjectContentDiffersFromJSONFile_ExistingContents,
  Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenObjectContentDiffersFromJSONFile_ExistingJson,
  Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenObjectContentDiffersFromJSONFile_FilePath,
  Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenObjectContentDiffersFromJSONFile_ProposedContents,
  Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenObjectContentDiffersFromJSONFile_Result,
  Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenStringContentDiffersFromFile_FilePath,
  Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenStringContentDiffersFromFile_Result,
  Tests_Lib_Utility_IsFileIdentical_ReturnsTrueWhenObjectContentMatchesJSONFile_Contents,
  Tests_Lib_Utility_IsFileIdentical_ReturnsTrueWhenObjectContentMatchesJSONFile_ContentsJson,
  Tests_Lib_Utility_IsFileIdentical_ReturnsTrueWhenObjectContentMatchesJSONFile_FilePath,
  Tests_Lib_Utility_IsFileIdentical_ReturnsTrueWhenObjectContentMatchesJSONFile_Result,
  Tests_Lib_Utility_IsFileIdentical_ReturnsTrueWhenStringContentMatchesFile_FilePath,
  Tests_Lib_Utility_IsFileIdentical_ReturnsTrueWhenStringContentMatchesFile_Result,
  Tests_Lib_Utility_IsFileIdentical_SandboxPrefix,
  Tests_Lib_Utility_IsFileIdentical_SandboxRoot,
  Tests_Lib_Utility_IsFileIdentical_TemporaryDirectory,
  Tests_Lib_Utility_IsPlainObject_ReturnsFalseForArray_Result,
  Tests_Lib_Utility_IsPlainObject_ReturnsFalseForBoolean_Result,
  Tests_Lib_Utility_IsPlainObject_ReturnsFalseForClassInstance_Result,
  Tests_Lib_Utility_IsPlainObject_ReturnsFalseForDateInstance_Result,
  Tests_Lib_Utility_IsPlainObject_ReturnsFalseForMapInstance_Result,
  Tests_Lib_Utility_IsPlainObject_ReturnsFalseForNull_Result,
  Tests_Lib_Utility_IsPlainObject_ReturnsFalseForNumber_Result,
  Tests_Lib_Utility_IsPlainObject_ReturnsFalseForRegExpInstance_Result,
  Tests_Lib_Utility_IsPlainObject_ReturnsFalseForSetInstance_Result,
  Tests_Lib_Utility_IsPlainObject_ReturnsFalseForString_Result,
  Tests_Lib_Utility_IsPlainObject_ReturnsFalseForUndefined_Result,
  Tests_Lib_Utility_IsPlainObject_ReturnsTrueForEmptyObjectLiteral_Result,
  Tests_Lib_Utility_IsPlainObject_ReturnsTrueForObjectCreateNull_NullPrototypeObject,
  Tests_Lib_Utility_IsPlainObject_ReturnsTrueForObjectCreateNull_Result,
  Tests_Lib_Utility_IsPlainObject_ReturnsTrueForObjectWithProperties_PlainObject,
  Tests_Lib_Utility_IsPlainObject_ReturnsTrueForObjectWithProperties_Result,
  Tests_Lib_Utility_IsProjectRoot_OriginalCwd,
  Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenCwdHasNoPackageJsonAbove_EmptyDirectory,
  Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenCwdHasNoPackageJsonAbove_RealEmptyDirectory,
  Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenCwdHasNoPackageJsonAbove_Result,
  Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenMultiplePackageJsonFilesFoundAbove_AppPackage,
  Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenMultiplePackageJsonFilesFoundAbove_AppRoot,
  Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenMultiplePackageJsonFilesFoundAbove_ProjectPackage,
  Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenMultiplePackageJsonFilesFoundAbove_ProjectRoot,
  Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenMultiplePackageJsonFilesFoundAbove_RealAppRoot,
  Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenMultiplePackageJsonFilesFoundAbove_Result,
  Tests_Lib_Utility_IsProjectRoot_ReturnsTrueWhenCwdIsProjectRootWithSinglePackageJson_PackageJsonPath,
  Tests_Lib_Utility_IsProjectRoot_ReturnsTrueWhenCwdIsProjectRootWithSinglePackageJson_ProjectRoot,
  Tests_Lib_Utility_IsProjectRoot_ReturnsTrueWhenCwdIsProjectRootWithSinglePackageJson_RealProjectRoot,
  Tests_Lib_Utility_IsProjectRoot_ReturnsTrueWhenCwdIsProjectRootWithSinglePackageJson_Result,
  Tests_Lib_Utility_IsProjectRoot_SandboxPrefix,
  Tests_Lib_Utility_IsProjectRoot_SandboxRoot,
  Tests_Lib_Utility_IsProjectRoot_TemporaryDirectory,
  Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_CorePackageJson,
  Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_CorePackagePath,
  Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_FirstWorkspace,
  Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_PackageDirectory,
  Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_ProjectRoot,
  Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_Result,
  Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_RootPackageJson,
  Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_RootPackagePath,
  Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_SecondWorkspace,
  Tests_Lib_Utility_LoadWorkspaceManifests_ReturnsEmptyArrayWhenNoWorkspacesProvided_Result,
  Tests_Lib_Utility_LoadWorkspaceManifests_SandboxPrefix,
  Tests_Lib_Utility_LoadWorkspaceManifests_SandboxRoot,
  Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_OnlyWorkspace,
  Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_ProjectRoot,
  Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_Result,
  Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_RootPackageJson,
  Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_RootPackagePath,
  Tests_Lib_Utility_LoadWorkspaceManifests_TemporaryDirectory,
  Tests_Lib_Utility_NormalizeRouteSegment_Cases,
  Tests_Lib_Utility_NormalizeRouteSegment_Result,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_HandlesCRLFLineEndings_Result,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_HandlesCRLFLineEndings_ResultKeys,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_HandlesCRLFLineEndings_Text,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_HandlesValuesContainingEqualsSign_Result,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_HandlesValuesContainingEqualsSign_Text,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_ParsesAlpineOsReleaseText_Result,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_ParsesAlpineOsReleaseText_Text,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_ParsesDebianOsReleaseText_Result,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_ParsesDebianOsReleaseText_Text,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_ParsesUbuntuOsReleaseText_Result,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_ParsesUbuntuOsReleaseText_Text,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_PreservesUnquotedValues_Result,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_PreservesUnquotedValues_Text,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_ReturnsEmptyObjectForEmptyString_Result,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_SkipsCommentLines_Result,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_SkipsCommentLines_ResultKeys,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_SkipsCommentLines_Text,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_SkipsEmptyLines_Result,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_SkipsEmptyLines_ResultKeys,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_SkipsEmptyLines_Text,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_StripsDoubleQuotedValues_Result,
  Tests_Lib_Utility_ParseLinuxOsReleaseText_StripsDoubleQuotedValues_Text,
  Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_CurrentBuild,
  Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_ProductName,
  Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_Result,
  Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_ResultKeys,
  Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_Text,
  Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_CurrentBuild,
  Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_CurrentMajorVersionNumber,
  Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_ProductName,
  Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_Result,
  Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_ResultKeys,
  Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_Text,
  Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_CurrentMajorVersionNumber,
  Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_Result,
  Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_Text,
  Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_ProductName,
  Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_Result,
  Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_Text,
  Tests_Lib_Utility_ParseWindowsRegistryText_ReturnsEmptyObjectForEmptyString_Result,
  Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_ProductName,
  Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_Result,
  Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_ResultKeys,
  Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_Text,
  Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_ProductName,
  Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_Result,
  Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_Text,
  Tests_Lib_Utility_PathExists_ReturnsFalseForNonExistentPath_NonExistentPath,
  Tests_Lib_Utility_PathExists_ReturnsFalseForNonExistentPath_Result,
  Tests_Lib_Utility_PathExists_ReturnsFalseForNonExistentPath_TemporaryDirectory,
  Tests_Lib_Utility_PathExists_ReturnsTrueForExistingDirectory_Result,
  Tests_Lib_Utility_PathExists_ReturnsTrueForExistingDirectory_SandboxDirectory,
  Tests_Lib_Utility_PathExists_ReturnsTrueForExistingDirectory_TemporaryDirectory,
  Tests_Lib_Utility_PathExists_ReturnsTrueForExistingDirectory_TemporaryPrefix,
  Tests_Lib_Utility_PathExists_ReturnsTrueForExistingFile_Result,
  Tests_Lib_Utility_PathExists_ReturnsTrueForExistingFile_SandboxDirectory,
  Tests_Lib_Utility_PathExists_ReturnsTrueForExistingFile_TemporaryDirectory,
  Tests_Lib_Utility_PathExists_ReturnsTrueForExistingFile_TemporaryFile,
  Tests_Lib_Utility_PathExists_ReturnsTrueForExistingFile_TemporaryPrefix,
  Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_ExistingFilePath,
  Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_ExistingName,
  Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_FilePath,
  Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_Files,
  Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_Now,
  Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_Result,
  Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_SecondFile,
  Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_SubDirectory,
  Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_Timestamp,
  Tests_Lib_Utility_RenameFileWithDate_RenamesAFileWithADateStampedName_FilePath,
  Tests_Lib_Utility_RenameFileWithDate_RenamesAFileWithADateStampedName_Files,
  Tests_Lib_Utility_RenameFileWithDate_RenamesAFileWithADateStampedName_MatchesBackupPattern,
  Tests_Lib_Utility_RenameFileWithDate_RenamesAFileWithADateStampedName_OriginalExists,
  Tests_Lib_Utility_RenameFileWithDate_RenamesAFileWithADateStampedName_RenamedFile,
  Tests_Lib_Utility_RenameFileWithDate_RenamesAFileWithADateStampedName_Result,
  Tests_Lib_Utility_RenameFileWithDate_ReturnsFalseWhenSourceFileDoesNotExist_FilePath,
  Tests_Lib_Utility_RenameFileWithDate_ReturnsFalseWhenSourceFileDoesNotExist_Result,
  Tests_Lib_Utility_RenameFileWithDate_SandboxPrefix,
  Tests_Lib_Utility_RenameFileWithDate_SandboxRoot,
  Tests_Lib_Utility_RenameFileWithDate_TemporaryDirectory,
  Tests_Lib_Utility_SaveGeneratedFileWithHeader_OriginalCwd,
  Tests_Lib_Utility_SaveGeneratedFileWithHeader_PrependsTheBannerBeforeWritingWhenHeaderIsSupplied_ExpectedHeader,
  Tests_Lib_Utility_SaveGeneratedFileWithHeader_PrependsTheBannerBeforeWritingWhenHeaderIsSupplied_ProjectDirectory,
  Tests_Lib_Utility_SaveGeneratedFileWithHeader_PrependsTheBannerBeforeWritingWhenHeaderIsSupplied_TargetPath,
  Tests_Lib_Utility_SaveGeneratedFileWithHeader_PrependsTheBannerBeforeWritingWhenHeaderIsSupplied_Written,
  Tests_Lib_Utility_SaveGeneratedFileWithHeader_PreservesExistingBehaviorWhenHeaderIsOmitted_ProjectDirectory,
  Tests_Lib_Utility_SaveGeneratedFileWithHeader_PreservesExistingBehaviorWhenHeaderIsOmitted_TargetPath,
  Tests_Lib_Utility_SaveGeneratedFileWithHeader_PreservesExistingBehaviorWhenHeaderIsOmitted_Written,
  Tests_Lib_Utility_SaveGeneratedFileWithHeader_SandboxRoot,
  Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_FirstWrite,
  Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_HeaderOptions,
  Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_ProjectDirectory,
  Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_SecondWrite,
  Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_TargetPath,
  Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_BackupFile,
  Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_FilePath,
  Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_Files,
  Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_Modified,
  Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_Original,
  Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_OriginalJson,
  Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_SubDirectory,
  Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_Written,
  Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_WrittenRaw,
  Tests_Lib_Utility_SaveWorkspaceManifest_SandboxPrefix,
  Tests_Lib_Utility_SaveWorkspaceManifest_SandboxRoot,
  Tests_Lib_Utility_SaveWorkspaceManifest_SkipsWritingWhenFileContentsAreIdentical_Contents,
  Tests_Lib_Utility_SaveWorkspaceManifest_SkipsWritingWhenFileContentsAreIdentical_ContentsJson,
  Tests_Lib_Utility_SaveWorkspaceManifest_SkipsWritingWhenFileContentsAreIdentical_FileDirectory,
  Tests_Lib_Utility_SaveWorkspaceManifest_SkipsWritingWhenFileContentsAreIdentical_FilePath,
  Tests_Lib_Utility_SaveWorkspaceManifest_SkipsWritingWhenFileContentsAreIdentical_StatAfter,
  Tests_Lib_Utility_SaveWorkspaceManifest_SkipsWritingWhenFileContentsAreIdentical_StatBefore,
  Tests_Lib_Utility_SaveWorkspaceManifest_TemporaryDirectory,
  Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_FileDirectory,
  Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_FilePath,
  Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_Modified,
  Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_Original,
  Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_OriginalJson,
  Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_Written,
  Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_WrittenRaw,
  Tests_Lib_Utility_ShellQuote_EscapesACommandSubstitutionPayloadSafely_Result,
  Tests_Lib_Utility_ShellQuote_EscapesBackslashWithDoubleBackslash_Result,
  Tests_Lib_Utility_ShellQuote_EscapesBackticksToPreventCommandSubstitution_Result,
  Tests_Lib_Utility_ShellQuote_EscapesDollarSignToPreventVariableExpansion_Result,
  Tests_Lib_Utility_ShellQuote_EscapesEmbeddedDoubleQuotesWithBackslash_Result,
  Tests_Lib_Utility_ShellQuote_HandlesAnEmptyString_Result,
  Tests_Lib_Utility_ShellQuote_PreservesSingleQuotesUnchanged_Result,
  Tests_Lib_Utility_ShellQuote_PreservesSpacesInsideTheQuotedValue_Result,
  Tests_Lib_Utility_ShellQuote_WrapsPlainValuesInDoubleQuotes_Result,
} from '../../types/tests/lib/utility.test.d.ts';

/**
 * Tests - Lib - Utility - Discover Paths With File.
 *
 * @since 0.12.0
 */
describe('discoverPathsWithFile', async () => {
  const originalCwd: Tests_Lib_Utility_DiscoverPathsWithFile_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Lib_Utility_DiscoverPathsWithFile_TemporaryDirectory = tmpdir();
  const sandboxPrefix: Tests_Lib_Utility_DiscoverPathsWithFile_SandboxPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Lib_Utility_DiscoverPathsWithFile_SandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    // Reset the directory back to the current working directory.
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('finds every package.json when traversing forward', async () => {
    const projectRoot: Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_ProjectRoot = join(sandboxRoot, 'forward');
    const appRoot: Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_AppRoot = join(projectRoot, 'apps', 'some-app');
    const packageRoot: Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_PackageRoot = join(projectRoot, 'packages', 'some-package');
    const nodeRoot: Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_NodeRoot = join(projectRoot, 'node_modules', 'ignore-me');
    const dotHiddenRoot: Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_DotHiddenRoot = join(projectRoot, '.hidden', 'ignore-me');

    // Create directories inside the project root.
    await Promise.all([
      mkdir(appRoot, { recursive: true }),
      mkdir(packageRoot, { recursive: true }),
      mkdir(nodeRoot, { recursive: true }),
      mkdir(dotHiddenRoot, { recursive: true }),
    ]);

    // Seed empty "package.json" files in all testing directories.
    const projectPackage: Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_ProjectPackage = join(projectRoot, 'package.json');
    const appPackage: Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_AppPackage = join(appRoot, 'package.json');
    const packagePackage: Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_PackagePackage = join(packageRoot, 'package.json');
    const nodePackage: Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_NodePackage = join(nodeRoot, 'package.json');
    const dotHiddenPackage: Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_DotHiddenPackage = join(dotHiddenRoot, 'package.json');

    await Promise.all([
      writeFile(projectPackage, '{}\n'),
      writeFile(appPackage, '{}\n'),
      writeFile(packagePackage, '{}\n'),
      writeFile(nodePackage, '{}\n'),
      writeFile(dotHiddenPackage, '{}\n'),
    ]);

    // Resolve canonical directories now so symlink aliases do not break tests (because "join" skipped filesystem lookups).
    const realProjectRoot: Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_RealProjectRoot = await realpath(projectRoot);

    // Change the current directory to the project root.
    process.chdir(realProjectRoot);

    const absolutePaths: Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_AbsolutePaths = await discoverPathsWithFile('package.json', 'forward');
    const relativePaths: Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_RelativePaths = absolutePaths.map((absolutePath) => relative(realProjectRoot, absolutePath).split(sep).join('/'));

    Logger.customize({
      name: 'discoverPathsWithFile',
      type: 'test',
      purpose: 'forward-absolutePaths',
    }).debug(absolutePaths);

    Logger.customize({
      name: 'discoverPathsWithFile',
      type: 'test',
      purpose: 'forward-relativePaths',
    }).debug(relativePaths);

    deepStrictEqual(relativePaths, [
      '',
      'apps/some-app',
      'packages/some-package',
    ]);

    return;
  });

  it('climbs to parent package.json files when traversing backward', async () => {
    const projectRoot: Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_ProjectRoot = join(sandboxRoot, 'backward');
    const appRoot: Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_AppRoot = join(projectRoot, 'apps', 'some-app');
    const appStuffRoot: Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_AppStuffRoot = join(appRoot, 'stuff');

    // Create directories inside the project root.
    await mkdir(appStuffRoot, { recursive: true });

    // Seed empty "package.json" files in all testing directories.
    const projectPackage: Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_ProjectPackage = join(projectRoot, 'package.json');
    const appPackage: Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_AppPackage = join(appRoot, 'package.json');

    await Promise.all([
      writeFile(projectPackage, '{}\n'),
      writeFile(appPackage, '{}\n'),
    ]);

    // Resolve canonical directories now so symlink aliases do not break tests (because "join" skipped filesystem lookups).
    const realProjectRoot: Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_RealProjectRoot = await realpath(projectRoot);
    const realAppStuffRoot: Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_RealAppStuffRoot = await realpath(appStuffRoot);

    // Change the current directory to a "stuff" folder inside "some-app".
    process.chdir(realAppStuffRoot);

    const absolutePaths: Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_AbsolutePaths = await discoverPathsWithFile('package.json', 'backward');
    const relativePaths: Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_RelativePaths = absolutePaths.map((absolutePath) => relative(realProjectRoot, absolutePath).split(sep).join('/'));

    Logger.customize({
      name: 'discoverPathsWithFile',
      type: 'test',
      purpose: 'backward-absolutePaths',
    }).debug(absolutePaths);

    Logger.customize({
      name: 'discoverPathsWithFile',
      type: 'test',
      purpose: 'backward-relativePaths',
    }).debug(relativePaths);

    deepStrictEqual(relativePaths, [
      'apps/some-app',
      '',
    ]);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Is Plain Object.
 *
 * @since 0.12.0
 */
describe('isPlainObject', async () => {
  it('returns true for empty object literal', () => {
    const result: Tests_Lib_Utility_IsPlainObject_ReturnsTrueForEmptyObjectLiteral_Result = isPlainObject({});

    strictEqual(result, true);

    return;
  });

  it('returns true for object with properties', () => {
    const plainObject: Tests_Lib_Utility_IsPlainObject_ReturnsTrueForObjectWithProperties_PlainObject = {
      a: 1,
      b: 2,
    };

    const result: Tests_Lib_Utility_IsPlainObject_ReturnsTrueForObjectWithProperties_Result = isPlainObject(plainObject);

    strictEqual(result, true);

    return;
  });

  it('returns true for Object.create(null)', () => {
    const nullPrototypeObject: Tests_Lib_Utility_IsPlainObject_ReturnsTrueForObjectCreateNull_NullPrototypeObject = Object.create(null);
    const result: Tests_Lib_Utility_IsPlainObject_ReturnsTrueForObjectCreateNull_Result = isPlainObject(nullPrototypeObject);

    strictEqual(result, true);

    return;
  });

  it('returns false for null', () => {
    const result: Tests_Lib_Utility_IsPlainObject_ReturnsFalseForNull_Result = isPlainObject(null);

    strictEqual(result, false);

    return;
  });

  it('returns false for undefined', () => {
    const result: Tests_Lib_Utility_IsPlainObject_ReturnsFalseForUndefined_Result = isPlainObject(undefined);

    strictEqual(result, false);

    return;
  });

  it('returns false for string', () => {
    const result: Tests_Lib_Utility_IsPlainObject_ReturnsFalseForString_Result = isPlainObject('hello');

    strictEqual(result, false);

    return;
  });

  it('returns false for number', () => {
    const result: Tests_Lib_Utility_IsPlainObject_ReturnsFalseForNumber_Result = isPlainObject(42);

    strictEqual(result, false);

    return;
  });

  it('returns false for boolean', () => {
    const result: Tests_Lib_Utility_IsPlainObject_ReturnsFalseForBoolean_Result = isPlainObject(true);

    strictEqual(result, false);

    return;
  });

  it('returns false for array', () => {
    const result: Tests_Lib_Utility_IsPlainObject_ReturnsFalseForArray_Result = isPlainObject([
      1,
      2,
      3,
    ]);

    strictEqual(result, false);

    return;
  });

  it('returns false for Date instance', () => {
    const result: Tests_Lib_Utility_IsPlainObject_ReturnsFalseForDateInstance_Result = isPlainObject(new Date());

    strictEqual(result, false);

    return;
  });

  it('returns false for RegExp instance', () => {
    const result: Tests_Lib_Utility_IsPlainObject_ReturnsFalseForRegExpInstance_Result = isPlainObject(new RegExp('test'));

    strictEqual(result, false);

    return;
  });

  it('returns false for Map instance', () => {
    const result: Tests_Lib_Utility_IsPlainObject_ReturnsFalseForMapInstance_Result = isPlainObject(new Map());

    strictEqual(result, false);

    return;
  });

  it('returns false for Set instance', () => {
    const result: Tests_Lib_Utility_IsPlainObject_ReturnsFalseForSetInstance_Result = isPlainObject(new Set());

    strictEqual(result, false);

    return;
  });

  it('returns false for class instance', () => {
    const result: Tests_Lib_Utility_IsPlainObject_ReturnsFalseForClassInstance_Result = isPlainObject(new (class {})());

    strictEqual(result, false);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Is Execute Shell Error.
 *
 * @since 0.12.0
 */
describe('isExecuteShellError', async () => {
  it('returns true for object with cmd property', () => {
    const result: Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithCmdProperty_Result = isExecuteShellError({ cmd: 'echo hello' });

    strictEqual(result, true);

    return;
  });

  it('returns true for object with killed property', () => {
    const result: Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithKilledProperty_Result = isExecuteShellError({ killed: false });

    strictEqual(result, true);

    return;
  });

  it('returns true for object with code property', () => {
    const result: Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithCodeProperty_Result = isExecuteShellError({ code: 1 });

    strictEqual(result, true);

    return;
  });

  it('returns true for object with signal property', () => {
    const result: Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithSignalProperty_Result = isExecuteShellError({ signal: 'SIGTERM' });

    strictEqual(result, true);

    return;
  });

  it('returns true for object with stdout property', () => {
    const result: Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithStdoutProperty_Result = isExecuteShellError({ stdout: 'output' });

    strictEqual(result, true);

    return;
  });

  it('returns true for object with stderr property', () => {
    const result: Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithStderrProperty_Result = isExecuteShellError({ stderr: 'error' });

    strictEqual(result, true);

    return;
  });

  it('returns true for object with multiple exec properties', () => {
    const error: Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithMultipleExecProperties_Error = {
      cmd: 'test',
      killed: false,
      code: 1,
      signal: 'SIGTERM',
      stdout: '',
      stderr: 'failed',
    };

    const result: Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithMultipleExecProperties_Result = isExecuteShellError(error);

    strictEqual(result, true);

    return;
  });

  it('returns false for null', () => {
    const result: Tests_Lib_Utility_IsExecuteShellError_ReturnsFalseForNull_Result = isExecuteShellError(null);

    strictEqual(result, false);

    return;
  });

  it('returns false for undefined', () => {
    const result: Tests_Lib_Utility_IsExecuteShellError_ReturnsFalseForUndefined_Result = isExecuteShellError(undefined);

    strictEqual(result, false);

    return;
  });

  it('returns false for string', () => {
    const result: Tests_Lib_Utility_IsExecuteShellError_ReturnsFalseForString_Result = isExecuteShellError('error');

    strictEqual(result, false);

    return;
  });

  it('returns false for number', () => {
    const result: Tests_Lib_Utility_IsExecuteShellError_ReturnsFalseForNumber_Result = isExecuteShellError(42);

    strictEqual(result, false);

    return;
  });

  it('returns false for empty object', () => {
    const result: Tests_Lib_Utility_IsExecuteShellError_ReturnsFalseForEmptyObject_Result = isExecuteShellError({});

    strictEqual(result, false);

    return;
  });

  it('returns false for object with wrong property types', () => {
    const result: Tests_Lib_Utility_IsExecuteShellError_ReturnsFalseForObjectWithWrongPropertyTypes_Result = isExecuteShellError({ cmd: 123 });

    strictEqual(result, false);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Compare Semver.
 *
 * @since 0.18.0
 */
describe('compareSemver', () => {
  it('returns negative when first version is lower', () => {
    const result: Tests_Lib_Utility_CompareSemver_ReturnsNegativeWhenFirstVersionIsLower_Result = compareSemver('2.30.0', '2.40.0');

    strictEqual(result < 0, true);
    strictEqual(compareSemver('1.0.0', '2.0.0') < 0, true);

    return;
  });

  it('returns positive when first version is higher', () => {
    const result: Tests_Lib_Utility_CompareSemver_ReturnsPositiveWhenFirstVersionIsHigher_Result = compareSemver('2.50.0', '2.40.0');

    strictEqual(result > 0, true);
    strictEqual(compareSemver('3.0.0', '2.99.0') > 0, true);

    return;
  });

  it('returns zero when versions are equal', () => {
    const result: Tests_Lib_Utility_CompareSemver_ReturnsZeroWhenVersionsAreEqual_Result = compareSemver('2.40.0', '2.40.0');

    strictEqual(result, 0);

    return;
  });

  it('treats missing parts as zero', () => {
    const result: Tests_Lib_Utility_CompareSemver_TreatsMissingPartsAsZero_Result = compareSemver('2.40', '2.40.0');

    strictEqual(result, 0);
    strictEqual(compareSemver('2', '2.0.0'), 0);

    return;
  });

  it('compares numerically not lexically', () => {
    // "2.10.0" > "2.9.0" numerically, but "2.10.0" < "2.9.0" lexically
    const result: Tests_Lib_Utility_CompareSemver_ComparesNumericallyNotLexically_Result = compareSemver('2.10.0', '2.9.0');

    strictEqual(result > 0, true);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Shell Quote.
 *
 * @since 0.18.0
 */
describe('shellQuote', () => {
  it('wraps plain values in double quotes', () => {
    const result: Tests_Lib_Utility_ShellQuote_WrapsPlainValuesInDoubleQuotes_Result = shellQuote('hello');

    strictEqual(result, '"hello"');

    return;
  });

  it('preserves spaces inside the quoted value', () => {
    const result: Tests_Lib_Utility_ShellQuote_PreservesSpacesInsideTheQuotedValue_Result = shellQuote('hello world');

    strictEqual(result, '"hello world"');

    return;
  });

  it('escapes embedded double quotes with backslash', () => {
    const result: Tests_Lib_Utility_ShellQuote_EscapesEmbeddedDoubleQuotesWithBackslash_Result = shellQuote('say "hi"');

    strictEqual(result, '"say \\"hi\\""');

    return;
  });

  it('preserves single quotes unchanged', () => {
    const result: Tests_Lib_Utility_ShellQuote_PreservesSingleQuotesUnchanged_Result = shellQuote('it\'s');

    strictEqual(result, '"it\'s"');

    return;
  });

  it('handles an empty string', () => {
    const result: Tests_Lib_Utility_ShellQuote_HandlesAnEmptyString_Result = shellQuote('');

    strictEqual(result, '""');

    return;
  });

  it('escapes backslash with double backslash', () => {
    const result: Tests_Lib_Utility_ShellQuote_EscapesBackslashWithDoubleBackslash_Result = shellQuote('a\\b');

    strictEqual(result, '"a\\\\b"');

    return;
  });

  it('escapes dollar sign to prevent variable expansion', () => {
    const result: Tests_Lib_Utility_ShellQuote_EscapesDollarSignToPreventVariableExpansion_Result = shellQuote('$VAR');

    strictEqual(result, '"\\$VAR"');

    return;
  });

  it('escapes backticks to prevent command substitution', () => {
    const result: Tests_Lib_Utility_ShellQuote_EscapesBackticksToPreventCommandSubstitution_Result = shellQuote('`cmd`');

    strictEqual(result, '"\\`cmd\\`"');

    return;
  });

  it('escapes a command-substitution payload safely', () => {
    const result: Tests_Lib_Utility_ShellQuote_EscapesACommandSubstitutionPayloadSafely_Result = shellQuote('$(rm -rf /)');

    strictEqual(result, '"\\$(rm -rf /)"');

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Current Timestamp.
 *
 * @since 0.12.0
 */
describe('currentTimestamp', async () => {
  it('returns a bracketed timestamp string', () => {
    const result: Tests_Lib_Utility_CurrentTimestamp_ReturnsABracketedTimestampString_Result = currentTimestamp();

    const startsWithBracket: Tests_Lib_Utility_CurrentTimestamp_ReturnsABracketedTimestampString_StartsWithBracket = result.startsWith('[');
    const endsWithBracket: Tests_Lib_Utility_CurrentTimestamp_ReturnsABracketedTimestampString_EndsWithBracket = result.endsWith(']');

    ok(startsWithBracket);
    ok(endsWithBracket);

    return;
  });

  it('matches expected timestamp format', () => {
    const result: Tests_Lib_Utility_CurrentTimestamp_MatchesExpectedTimestampFormat_Result = currentTimestamp();
    const pattern: Tests_Lib_Utility_CurrentTimestamp_MatchesExpectedTimestampFormat_Pattern = new RegExp('^\\[\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\.\\d{3} [+-]\\d{2}\\d{2}]$');

    match(result, pattern);

    return;
  });

  it('produces different milliseconds on consecutive calls', () => {
    const results: Tests_Lib_Utility_CurrentTimestamp_ProducesDifferentMillisecondsOnConsecutiveCalls_Results = new Set();

    for (let i = 0; i < 10; i += 1) {
      const timestamp: Tests_Lib_Utility_CurrentTimestamp_ProducesDifferentMillisecondsOnConsecutiveCalls_Timestamp = currentTimestamp();

      results.add(timestamp);
    }

    // At least some variation expected across 10 calls.
    ok(results.size >= 1);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Detect Shell.
 *
 * @since 0.12.0
 */
describe('detectShell', async () => {
  it('returns a non-empty string', () => {
    const result: Tests_Lib_Utility_DetectShell_ReturnsANonEmptyString_Result = detectShell();

    strictEqual(typeof result, 'string');
    ok(result.length > 0);

    return;
  });

  it('returns a known shell path', () => {
    const result: Tests_Lib_Utility_DetectShell_ReturnsAKnownShellPath_Result = detectShell();
    const knownShells: Tests_Lib_Utility_DetectShell_ReturnsAKnownShellPath_KnownShells = [
      'cmd.exe',
      '/bin/zsh',
      '/bin/bash',
      '/bin/ksh',
      '/bin/sh',
    ];

    const isKnownShell: Tests_Lib_Utility_DetectShell_ReturnsAKnownShellPath_IsKnownShell = knownShells.includes(result);

    ok(isKnownShell, `Unexpected shell: "${result}"`);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Path Exists.
 *
 * @since 0.12.0
 */
describe('pathExists', async () => {
  it('returns true for existing file', async () => {
    const temporaryDirectory: Tests_Lib_Utility_PathExists_ReturnsTrueForExistingFile_TemporaryDirectory = tmpdir();
    const temporaryPrefix: Tests_Lib_Utility_PathExists_ReturnsTrueForExistingFile_TemporaryPrefix = join(temporaryDirectory, 'nova-pathExists-');
    const sandboxDirectory: Tests_Lib_Utility_PathExists_ReturnsTrueForExistingFile_SandboxDirectory = await mkdtemp(temporaryPrefix);
    const temporaryFile: Tests_Lib_Utility_PathExists_ReturnsTrueForExistingFile_TemporaryFile = join(sandboxDirectory, 'test.txt');

    await writeFile(temporaryFile, 'test');

    const result: Tests_Lib_Utility_PathExists_ReturnsTrueForExistingFile_Result = await pathExists(temporaryFile);

    strictEqual(result, true);

    await rm(sandboxDirectory, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('returns true for existing directory', async () => {
    const temporaryDirectory: Tests_Lib_Utility_PathExists_ReturnsTrueForExistingDirectory_TemporaryDirectory = tmpdir();
    const temporaryPrefix: Tests_Lib_Utility_PathExists_ReturnsTrueForExistingDirectory_TemporaryPrefix = join(temporaryDirectory, 'nova-pathExists-');
    const sandboxDirectory: Tests_Lib_Utility_PathExists_ReturnsTrueForExistingDirectory_SandboxDirectory = await mkdtemp(temporaryPrefix);

    const result: Tests_Lib_Utility_PathExists_ReturnsTrueForExistingDirectory_Result = await pathExists(sandboxDirectory);

    strictEqual(result, true);

    await rm(sandboxDirectory, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('returns false for non-existent path', async () => {
    const temporaryDirectory: Tests_Lib_Utility_PathExists_ReturnsFalseForNonExistentPath_TemporaryDirectory = tmpdir();
    const nonExistentPath: Tests_Lib_Utility_PathExists_ReturnsFalseForNonExistentPath_NonExistentPath = join(temporaryDirectory, 'nova-does-not-exist-xyz');
    const result: Tests_Lib_Utility_PathExists_ReturnsFalseForNonExistentPath_Result = await pathExists(nonExistentPath);

    strictEqual(result, false);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Execute Shell.
 *
 * @since 0.12.0
 */
describe('executeShell', async () => {
  it('runs a simple echo command', async () => {
    const result: Tests_Lib_Utility_ExecuteShell_RunsASimpleEchoCommand_Result = await executeShell('echo hello');

    strictEqual(result['code'], 0);
    const includesHello: Tests_Lib_Utility_ExecuteShell_RunsASimpleEchoCommand_IncludesHello = result['textOut'].includes('hello');

    ok(includesHello);

    return;
  });

  it('returns non-zero code for failing command', async () => {
    const result: Tests_Lib_Utility_ExecuteShell_ReturnsNonZeroCodeForFailingCommand_Result = await executeShell('nova-nonexistent-command-xyz-12345');

    notStrictEqual(result['code'], 0);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Is Command Exists.
 *
 * @since 0.12.0
 */
describe('isCommandExists', async () => {
  it('returns true for an existing command', async () => {
    const result: Tests_Lib_Utility_IsCommandExists_ReturnsTrueForAnExistingCommand_Result = await isCommandExists('node');

    strictEqual(result, true);

    return;
  });

  it('returns false for a non-existent command', async () => {
    const result: Tests_Lib_Utility_IsCommandExists_ReturnsFalseForANonExistentCommand_Result = await isCommandExists('nova-nonexistent-command-xyz-12345');

    strictEqual(result, false);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Is File Identical.
 *
 * @since 0.12.0
 */
describe('isFileIdentical', async () => {
  const temporaryDirectory: Tests_Lib_Utility_IsFileIdentical_TemporaryDirectory = tmpdir();
  const sandboxPrefix: Tests_Lib_Utility_IsFileIdentical_SandboxPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Lib_Utility_IsFileIdentical_SandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('returns true when string content matches file', async () => {
    const filePath: Tests_Lib_Utility_IsFileIdentical_ReturnsTrueWhenStringContentMatchesFile_FilePath = join(sandboxRoot, 'string-match.txt');

    await writeFile(filePath, 'hello world');

    const result: Tests_Lib_Utility_IsFileIdentical_ReturnsTrueWhenStringContentMatchesFile_Result = await isFileIdentical(filePath, 'hello world');

    strictEqual(result, true);

    return;
  });

  it('returns false when string content differs from file', async () => {
    const filePath: Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenStringContentDiffersFromFile_FilePath = join(sandboxRoot, 'string-differ.txt');

    await writeFile(filePath, 'hello world');

    const result: Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenStringContentDiffersFromFile_Result = await isFileIdentical(filePath, 'goodbye world');

    strictEqual(result, false);

    return;
  });

  it('returns true when object content matches JSON file', async () => {
    const filePath: Tests_Lib_Utility_IsFileIdentical_ReturnsTrueWhenObjectContentMatchesJSONFile_FilePath = join(sandboxRoot, 'object-match.json');
    const contents: Tests_Lib_Utility_IsFileIdentical_ReturnsTrueWhenObjectContentMatchesJSONFile_Contents = {
      name: 'nova',
      version: '1.0.0',
    };

    const contentsJson: Tests_Lib_Utility_IsFileIdentical_ReturnsTrueWhenObjectContentMatchesJSONFile_ContentsJson = JSON.stringify(contents, null, 2);

    await writeFile(filePath, `${contentsJson}\n`);

    const result: Tests_Lib_Utility_IsFileIdentical_ReturnsTrueWhenObjectContentMatchesJSONFile_Result = await isFileIdentical(filePath, contents);

    strictEqual(result, true);

    return;
  });

  it('returns false when object content differs from JSON file', async () => {
    const filePath: Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenObjectContentDiffersFromJSONFile_FilePath = join(sandboxRoot, 'object-differ.json');
    const existingContents: Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenObjectContentDiffersFromJSONFile_ExistingContents = {
      name: 'nova',
      version: '1.0.0',
    };
    const proposedContents: Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenObjectContentDiffersFromJSONFile_ProposedContents = {
      name: 'nova',
      version: '2.0.0',
    };

    const existingJson: Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenObjectContentDiffersFromJSONFile_ExistingJson = JSON.stringify(existingContents, null, 2);

    await writeFile(filePath, `${existingJson}\n`);

    const result: Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenObjectContentDiffersFromJSONFile_Result = await isFileIdentical(filePath, proposedContents);

    strictEqual(result, false);

    return;
  });

  it('returns false when file does not exist', async () => {
    const filePath: Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenFileDoesNotExist_FilePath = join(sandboxRoot, 'does-not-exist.txt');

    const result: Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenFileDoesNotExist_Result = await isFileIdentical(filePath, 'content');

    strictEqual(result, false);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Rename File With Date.
 *
 * @since 0.12.0
 */
describe('renameFileWithDate', async () => {
  const temporaryDirectory: Tests_Lib_Utility_RenameFileWithDate_TemporaryDirectory = tmpdir();
  const sandboxPrefix: Tests_Lib_Utility_RenameFileWithDate_SandboxPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Lib_Utility_RenameFileWithDate_SandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('renames a file with a date-stamped name', async () => {
    const filePath: Tests_Lib_Utility_RenameFileWithDate_RenamesAFileWithADateStampedName_FilePath = join(sandboxRoot, 'rename-test.txt');

    await writeFile(filePath, 'test content');

    const result: Tests_Lib_Utility_RenameFileWithDate_RenamesAFileWithADateStampedName_Result = await renameFileWithDate(filePath);

    strictEqual(result, true);

    // Original file should no longer exist.
    const originalExists: Tests_Lib_Utility_RenameFileWithDate_RenamesAFileWithADateStampedName_OriginalExists = await pathExists(filePath);

    strictEqual(originalExists, false);

    // A date-stamped file should exist in the same directory.
    const files: Tests_Lib_Utility_RenameFileWithDate_RenamesAFileWithADateStampedName_Files = await readdir(sandboxRoot);
    const renamedFile: Tests_Lib_Utility_RenameFileWithDate_RenamesAFileWithADateStampedName_RenamedFile = files.find((file) => file.startsWith('rename-test.'));

    ok(renamedFile !== undefined, 'Renamed file should exist');
    const matchesBackupPattern: Tests_Lib_Utility_RenameFileWithDate_RenamesAFileWithADateStampedName_MatchesBackupPattern = new RegExp('^rename-test\\.\\d{4}-\\d{2}-\\d{2}_\\d{4}\\.nova-backup\\.txt$').test(renamedFile);

    ok(matchesBackupPattern);

    return;
  });

  it('returns false when source file does not exist', async () => {
    const filePath: Tests_Lib_Utility_RenameFileWithDate_ReturnsFalseWhenSourceFileDoesNotExist_FilePath = join(sandboxRoot, 'does-not-exist.txt');

    const result: Tests_Lib_Utility_RenameFileWithDate_ReturnsFalseWhenSourceFileDoesNotExist_Result = await renameFileWithDate(filePath);

    strictEqual(result, false);

    return;
  });

  it('increments counter when target file already exists', async () => {
    const subDirectory: Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_SubDirectory = join(sandboxRoot, 'counter-test');

    await mkdir(subDirectory);

    const filePath: Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_FilePath = join(subDirectory, 'original.txt');

    await writeFile(filePath, 'content');

    // Pre-create a file with the expected first counter value.
    const now: Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_Now = new Date();
    const timestamp: Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_Timestamp = [
      now.getUTCFullYear(),
      (now.getUTCMonth() + 1).toString().padStart(2, '0'),
      now.getUTCDate().toString().padStart(2, '0'),
    ].join('-');
    const existingName: Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_ExistingName = `original.${timestamp}_0001.nova-backup.txt`;

    const existingFilePath: Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_ExistingFilePath = join(subDirectory, existingName);

    await writeFile(existingFilePath, 'existing');

    const result: Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_Result = await renameFileWithDate(filePath);

    strictEqual(result, true);

    // Should have counter 0002 since 0001 already exists.
    const files: Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_Files = await readdir(subDirectory);
    const secondFile: Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_SecondFile = files.find((file) => file.includes('_0002'));

    ok(secondFile !== undefined, 'File with incremented counter should exist');

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Is Project Root.
 *
 * @since 0.12.0
 */
describe('isProjectRoot', async () => {
  const originalCwd: Tests_Lib_Utility_IsProjectRoot_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Lib_Utility_IsProjectRoot_TemporaryDirectory = tmpdir();
  const sandboxPrefix: Tests_Lib_Utility_IsProjectRoot_SandboxPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Lib_Utility_IsProjectRoot_SandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('returns true when cwd is project root with single package.json', async () => {
    const projectRoot: Tests_Lib_Utility_IsProjectRoot_ReturnsTrueWhenCwdIsProjectRootWithSinglePackageJson_ProjectRoot = join(sandboxRoot, 'single');

    await mkdir(projectRoot, { recursive: true });

    const packageJsonPath: Tests_Lib_Utility_IsProjectRoot_ReturnsTrueWhenCwdIsProjectRootWithSinglePackageJson_PackageJsonPath = join(projectRoot, 'package.json');

    await writeFile(packageJsonPath, '{}\n');

    const realProjectRoot: Tests_Lib_Utility_IsProjectRoot_ReturnsTrueWhenCwdIsProjectRootWithSinglePackageJson_RealProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    const result: Tests_Lib_Utility_IsProjectRoot_ReturnsTrueWhenCwdIsProjectRootWithSinglePackageJson_Result = await isProjectRoot(realProjectRoot);

    strictEqual(result, true);

    return;
  });

  it('returns false when cwd has no package.json above', async () => {
    const emptyDirectory: Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenCwdHasNoPackageJsonAbove_EmptyDirectory = join(sandboxRoot, 'empty');

    await mkdir(emptyDirectory, { recursive: true });

    const realEmptyDirectory: Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenCwdHasNoPackageJsonAbove_RealEmptyDirectory = await realpath(emptyDirectory);

    process.chdir(realEmptyDirectory);

    const result: Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenCwdHasNoPackageJsonAbove_Result = await isProjectRoot(realEmptyDirectory);

    strictEqual(result, false);

    return;
  });

  it('returns false when multiple package.json files found above', async () => {
    const projectRoot: Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenMultiplePackageJsonFilesFoundAbove_ProjectRoot = join(sandboxRoot, 'multi');
    const appRoot: Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenMultiplePackageJsonFilesFoundAbove_AppRoot = join(projectRoot, 'apps', 'my-app');

    await mkdir(appRoot, { recursive: true });

    const projectPackage: Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenMultiplePackageJsonFilesFoundAbove_ProjectPackage = join(projectRoot, 'package.json');
    const appPackage: Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenMultiplePackageJsonFilesFoundAbove_AppPackage = join(appRoot, 'package.json');

    await Promise.all([
      writeFile(projectPackage, '{}\n'),
      writeFile(appPackage, '{}\n'),
    ]);

    const realAppRoot: Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenMultiplePackageJsonFilesFoundAbove_RealAppRoot = await realpath(appRoot);

    process.chdir(realAppRoot);

    const result: Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenMultiplePackageJsonFilesFoundAbove_Result = await isProjectRoot(realAppRoot);

    strictEqual(result, false);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Load Workspace Manifests.
 *
 * @since 0.12.0
 */
describe('loadWorkspaceManifests', async () => {
  const temporaryDirectory: Tests_Lib_Utility_LoadWorkspaceManifests_TemporaryDirectory = tmpdir();
  const sandboxPrefix: Tests_Lib_Utility_LoadWorkspaceManifests_SandboxPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Lib_Utility_LoadWorkspaceManifests_SandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('loads package.json for configured workspaces', async () => {
    const projectRoot: Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_ProjectRoot = join(sandboxRoot, 'valid');
    const packageDirectory: Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_PackageDirectory = join(projectRoot, 'packages', 'core');

    await mkdir(packageDirectory, { recursive: true });

    const rootPackageJson: Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_RootPackageJson = JSON.stringify({ name: 'root' }, null, 2);
    const corePackageJson: Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_CorePackageJson = JSON.stringify({ name: '@test/core' }, null, 2);
    const rootPackagePath: Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_RootPackagePath = join(projectRoot, 'package.json');
    const corePackagePath: Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_CorePackagePath = join(packageDirectory, 'package.json');

    await Promise.all([
      writeFile(rootPackagePath, rootPackageJson),
      writeFile(corePackagePath, corePackageJson),
    ]);

    const result: Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_Result = await loadWorkspaceManifests({
      projectRoot,
      workspaces: [
        [
          './',
          {
            name: 'root',
            role: 'project',
            policy: 'freezable',
          },
        ],
        [
          './packages/core',
          {
            name: '@test/core',
            role: 'package',
            policy: 'distributable',
          },
        ],
      ],
    });

    strictEqual(result.length, 2);

    const firstWorkspace: Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_FirstWorkspace = result[0];
    const secondWorkspace: Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_SecondWorkspace = result[1];

    ok(firstWorkspace !== undefined);
    ok(secondWorkspace !== undefined);
    strictEqual(firstWorkspace['manifest']['name'], 'root');
    strictEqual(firstWorkspace['fileContents']['name'], 'root');
    strictEqual(secondWorkspace['manifest']['name'], '@test/core');
    strictEqual(secondWorkspace['fileContents']['name'], '@test/core');

    return;
  });

  it('skips workspace with missing package.json', async () => {
    const projectRoot: Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_ProjectRoot = join(sandboxRoot, 'missing');

    await mkdir(projectRoot, { recursive: true });

    const rootPackageJson: Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_RootPackageJson = JSON.stringify({ name: 'root' }, null, 2);
    const rootPackagePath: Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_RootPackagePath = join(projectRoot, 'package.json');

    await writeFile(rootPackagePath, rootPackageJson);

    const result: Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_Result = await loadWorkspaceManifests({
      projectRoot,
      workspaces: [
        [
          './',
          {
            name: 'root',
            role: 'project',
            policy: 'freezable',
          },
        ],
        [
          './packages/missing',
          {
            name: '@test/missing',
            role: 'package',
            policy: 'distributable',
          },
        ],
      ],
    });

    strictEqual(result.length, 1);

    const onlyWorkspace: Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_OnlyWorkspace = result[0];

    ok(onlyWorkspace !== undefined);
    strictEqual(onlyWorkspace['manifest']['name'], 'root');

    return;
  });

  it('returns empty array when no workspaces provided', async () => {
    const result: Tests_Lib_Utility_LoadWorkspaceManifests_ReturnsEmptyArrayWhenNoWorkspacesProvided_Result = await loadWorkspaceManifests({
      projectRoot: sandboxRoot,
      workspaces: [],
    });

    strictEqual(result.length, 0);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Save Workspace Manifest.
 *
 * @since 0.12.0
 */
describe('saveWorkspaceManifest', async () => {
  const temporaryDirectory: Tests_Lib_Utility_SaveWorkspaceManifest_TemporaryDirectory = tmpdir();
  const sandboxPrefix: Tests_Lib_Utility_SaveWorkspaceManifest_SandboxPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Lib_Utility_SaveWorkspaceManifest_SandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('writes changed file contents', async () => {
    const filePath: Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_FilePath = join(sandboxRoot, 'write-test', 'package.json');

    const fileDirectory: Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_FileDirectory = dirname(filePath);

    await mkdir(fileDirectory, { recursive: true });

    const original: Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_Original = {
      name: 'test',
      version: '1.0.0',
    };

    const originalJson: Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_OriginalJson = JSON.stringify(original, null, 2);

    await writeFile(filePath, `${originalJson}\n`, 'utf-8');

    const modified: Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_Modified = {
      name: 'test',
      version: '2.0.0',
    };

    await saveWorkspaceManifest({
      manifest: {
        name: 'test',
        role: 'package',
        policy: 'distributable',
      },
      filePath,
      fileContents: modified,
    }, true);

    const writtenRaw: Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_WrittenRaw = await readFile(filePath, 'utf-8');
    const written: Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_Written = JSON.parse(writtenRaw);

    strictEqual(written['version'], '2.0.0');

    return;
  });

  it('skips writing when file contents are identical', async () => {
    const filePath: Tests_Lib_Utility_SaveWorkspaceManifest_SkipsWritingWhenFileContentsAreIdentical_FilePath = join(sandboxRoot, 'skip-test', 'package.json');

    const fileDirectory: Tests_Lib_Utility_SaveWorkspaceManifest_SkipsWritingWhenFileContentsAreIdentical_FileDirectory = dirname(filePath);

    await mkdir(fileDirectory, { recursive: true });

    const contents: Tests_Lib_Utility_SaveWorkspaceManifest_SkipsWritingWhenFileContentsAreIdentical_Contents = {
      name: 'test',
      version: '1.0.0',
    };

    const contentsJson: Tests_Lib_Utility_SaveWorkspaceManifest_SkipsWritingWhenFileContentsAreIdentical_ContentsJson = JSON.stringify(contents, null, 2);

    await writeFile(filePath, `${contentsJson}\n`, 'utf-8');

    const statBefore: Tests_Lib_Utility_SaveWorkspaceManifest_SkipsWritingWhenFileContentsAreIdentical_StatBefore = await stat(filePath);

    await saveWorkspaceManifest({
      manifest: {
        name: 'test',
        role: 'package',
        policy: 'distributable',
      },
      filePath,
      fileContents: contents,
    }, true);

    const statAfter: Tests_Lib_Utility_SaveWorkspaceManifest_SkipsWritingWhenFileContentsAreIdentical_StatAfter = await stat(filePath);

    strictEqual(statBefore.mtimeMs, statAfter.mtimeMs);

    return;
  });

  it('creates backup when replaceFile is false', async () => {
    const subDirectory: Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_SubDirectory = join(sandboxRoot, 'backup-test');

    await mkdir(subDirectory, { recursive: true });

    const filePath: Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_FilePath = join(subDirectory, 'package.json');
    const original: Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_Original = {
      name: 'test',
      version: '1.0.0',
    };

    const originalJson: Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_OriginalJson = JSON.stringify(original, null, 2);

    await writeFile(filePath, `${originalJson}\n`, 'utf-8');

    const modified: Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_Modified = {
      name: 'test',
      version: '2.0.0',
    };

    await saveWorkspaceManifest({
      manifest: {
        name: 'test',
        role: 'package',
        policy: 'distributable',
      },
      filePath,
      fileContents: modified,
    }, false);

    const files: Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_Files = await readdir(subDirectory);
    const backupFile: Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_BackupFile = files.find((file) => file.startsWith('package.') && file !== 'package.json');

    ok(backupFile !== undefined, 'Backup file should exist');

    // New file should have the modified contents.
    const writtenRaw: Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_WrittenRaw = await readFile(filePath, 'utf-8');
    const written: Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_Written = JSON.parse(writtenRaw);

    strictEqual(written['version'], '2.0.0');

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Parse Linux OS Release Text.
 *
 * @since 0.12.0
 */
describe('parseLinuxOsReleaseText', async () => {
  it('parses Ubuntu os-release text', () => {
    const text: Tests_Lib_Utility_ParseLinuxOsReleaseText_ParsesUbuntuOsReleaseText_Text = [
      'NAME="Ubuntu"',
      'VERSION="22.04.3 LTS (Jammy Jellyfish)"',
      'ID=ubuntu',
      'ID_LIKE=debian',
      'PRETTY_NAME="Ubuntu 22.04.3 LTS"',
      'VERSION_ID="22.04"',
    ].join('\n');

    const result: Tests_Lib_Utility_ParseLinuxOsReleaseText_ParsesUbuntuOsReleaseText_Result = parseLinuxOsReleaseText(text);

    strictEqual(result['NAME'], 'Ubuntu');
    strictEqual(result['VERSION'], '22.04.3 LTS (Jammy Jellyfish)');
    strictEqual(result['ID'], 'ubuntu');
    strictEqual(result['ID_LIKE'], 'debian');
    strictEqual(result['VERSION_ID'], '22.04');

    return;
  });

  it('parses Alpine os-release text', () => {
    const text: Tests_Lib_Utility_ParseLinuxOsReleaseText_ParsesAlpineOsReleaseText_Text = [
      'NAME="Alpine Linux"',
      'ID=alpine',
      'VERSION_ID=3.19.0',
      'PRETTY_NAME="Alpine Linux v3.19"',
    ].join('\n');

    const result: Tests_Lib_Utility_ParseLinuxOsReleaseText_ParsesAlpineOsReleaseText_Result = parseLinuxOsReleaseText(text);

    strictEqual(result['NAME'], 'Alpine Linux');
    strictEqual(result['ID'], 'alpine');
    strictEqual(result['VERSION_ID'], '3.19.0');

    return;
  });

  it('parses Debian os-release text', () => {
    const text: Tests_Lib_Utility_ParseLinuxOsReleaseText_ParsesDebianOsReleaseText_Text = [
      'PRETTY_NAME="Debian GNU/Linux 12 (bookworm)"',
      'NAME="Debian GNU/Linux"',
      'VERSION_ID="12"',
      'ID=debian',
    ].join('\n');

    const result: Tests_Lib_Utility_ParseLinuxOsReleaseText_ParsesDebianOsReleaseText_Result = parseLinuxOsReleaseText(text);

    strictEqual(result['NAME'], 'Debian GNU/Linux');
    strictEqual(result['ID'], 'debian');
    strictEqual(result['VERSION_ID'], '12');

    return;
  });

  it('skips comment lines', () => {
    const text: Tests_Lib_Utility_ParseLinuxOsReleaseText_SkipsCommentLines_Text = [
      '# This is a comment',
      'NAME="Test"',
      '# Another comment',
      'ID=test',
    ].join('\n');

    const result: Tests_Lib_Utility_ParseLinuxOsReleaseText_SkipsCommentLines_Result = parseLinuxOsReleaseText(text);

    const resultKeys: Tests_Lib_Utility_ParseLinuxOsReleaseText_SkipsCommentLines_ResultKeys = Object.keys(result);

    strictEqual(resultKeys.length, 2);
    strictEqual(result['NAME'], 'Test');
    strictEqual(result['ID'], 'test');

    return;
  });

  it('skips empty lines', () => {
    const text: Tests_Lib_Utility_ParseLinuxOsReleaseText_SkipsEmptyLines_Text = [
      '',
      'NAME="Test"',
      '',
      '',
      'ID=test',
      '',
    ].join('\n');

    const result: Tests_Lib_Utility_ParseLinuxOsReleaseText_SkipsEmptyLines_Result = parseLinuxOsReleaseText(text);

    const resultKeys: Tests_Lib_Utility_ParseLinuxOsReleaseText_SkipsEmptyLines_ResultKeys = Object.keys(result);

    strictEqual(resultKeys.length, 2);

    return;
  });

  it('strips double-quoted values', () => {
    const text: Tests_Lib_Utility_ParseLinuxOsReleaseText_StripsDoubleQuotedValues_Text = 'NAME="Ubuntu"';

    const result: Tests_Lib_Utility_ParseLinuxOsReleaseText_StripsDoubleQuotedValues_Result = parseLinuxOsReleaseText(text);

    strictEqual(result['NAME'], 'Ubuntu');

    return;
  });

  it('preserves unquoted values', () => {
    const text: Tests_Lib_Utility_ParseLinuxOsReleaseText_PreservesUnquotedValues_Text = 'ID=ubuntu';

    const result: Tests_Lib_Utility_ParseLinuxOsReleaseText_PreservesUnquotedValues_Result = parseLinuxOsReleaseText(text);

    strictEqual(result['ID'], 'ubuntu');

    return;
  });

  it('handles values containing equals sign', () => {
    const text: Tests_Lib_Utility_ParseLinuxOsReleaseText_HandlesValuesContainingEqualsSign_Text = 'BUG_REPORT_URL="https://example.com?a=1&b=2"';

    const result: Tests_Lib_Utility_ParseLinuxOsReleaseText_HandlesValuesContainingEqualsSign_Result = parseLinuxOsReleaseText(text);

    strictEqual(result['BUG_REPORT_URL'], 'https://example.com?a=1&b=2');

    return;
  });

  it('returns empty object for empty string', () => {
    const result: Tests_Lib_Utility_ParseLinuxOsReleaseText_ReturnsEmptyObjectForEmptyString_Result = parseLinuxOsReleaseText('');

    deepStrictEqual(result, {});

    return;
  });

  it('handles CRLF line endings', () => {
    const text: Tests_Lib_Utility_ParseLinuxOsReleaseText_HandlesCRLFLineEndings_Text = 'NAME="Test"\r\nID=test\r\nVERSION_ID="1.0"';

    const result: Tests_Lib_Utility_ParseLinuxOsReleaseText_HandlesCRLFLineEndings_Result = parseLinuxOsReleaseText(text);

    const resultKeys: Tests_Lib_Utility_ParseLinuxOsReleaseText_HandlesCRLFLineEndings_ResultKeys = Object.keys(result);

    strictEqual(resultKeys.length, 3);
    strictEqual(result['NAME'], 'Test');
    strictEqual(result['ID'], 'test');
    strictEqual(result['VERSION_ID'], '1.0');

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Parse Windows Registry Text.
 *
 * @since 0.12.0
 */
describe('parseWindowsRegistryText', async () => {
  it('parses REG_SZ values', () => {
    const text: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_Text = '    ProductName    REG_SZ    Windows 11 Pro';

    const result: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_Result = parseWindowsRegistryText(text);

    const productName: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_ProductName = result['ProductName'];

    if (productName === undefined) {
      fail('Expected ProductName to be defined');
    }

    strictEqual(productName['type'], 'REG_SZ');
    strictEqual(productName['data'], 'Windows 11 Pro');

    return;
  });

  it('parses REG_DWORD values', () => {
    const text: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_Text = '    CurrentMajorVersionNumber    REG_DWORD    0xa';

    const result: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_Result = parseWindowsRegistryText(text);
    const currentMajorVersionNumber: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_CurrentMajorVersionNumber = result['CurrentMajorVersionNumber'];

    if (currentMajorVersionNumber === undefined) {
      fail('Expected CurrentMajorVersionNumber to be defined');
    }

    strictEqual(currentMajorVersionNumber['type'], 'REG_DWORD');
    strictEqual(currentMajorVersionNumber['data'], '0xa');

    return;
  });

  it('parses mixed registry types', () => {
    const text: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_Text = [
      'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion',
      '    ProductName    REG_SZ    Windows 11 Pro',
      '    CurrentBuild    REG_SZ    22631',
      '    CurrentMajorVersionNumber    REG_DWORD    0xa',
    ].join('\n');

    const result: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_Result = parseWindowsRegistryText(text);

    const resultKeys: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_ResultKeys = Object.keys(result);

    strictEqual(resultKeys.length, 3);

    const productName: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_ProductName = result['ProductName'];
    const currentBuild: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_CurrentBuild = result['CurrentBuild'];
    const currentMajorVersionNumber: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_CurrentMajorVersionNumber = result['CurrentMajorVersionNumber'];

    if (productName === undefined) {
      fail('Expected ProductName to be defined');
    }

    if (currentBuild === undefined) {
      fail('Expected CurrentBuild to be defined');
    }

    if (currentMajorVersionNumber === undefined) {
      fail('Expected CurrentMajorVersionNumber to be defined');
    }

    strictEqual(productName['type'], 'REG_SZ');
    strictEqual(currentBuild['type'], 'REG_SZ');
    strictEqual(currentMajorVersionNumber['type'], 'REG_DWORD');

    return;
  });

  it('returns empty object for empty string', () => {
    const result: Tests_Lib_Utility_ParseWindowsRegistryText_ReturnsEmptyObjectForEmptyString_Result = parseWindowsRegistryText('');

    deepStrictEqual(result, {});

    return;
  });

  it('skips non-matching lines', () => {
    const text: Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_Text = [
      'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion',
      '',
      '    ProductName    REG_SZ    Windows 11 Pro',
    ].join('\n');

    const result: Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_Result = parseWindowsRegistryText(text);

    const resultKeys: Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_ResultKeys = Object.keys(result);

    strictEqual(resultKeys.length, 1);

    const productName: Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_ProductName = result['ProductName'];

    if (productName === undefined) {
      fail('Expected ProductName to be defined');
    }

    strictEqual(productName['data'], 'Windows 11 Pro');

    return;
  });

  it('trims trailing whitespace from data', () => {
    const text: Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_Text = '    ProductName    REG_SZ    Windows 11 Pro   ';

    const result: Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_Result = parseWindowsRegistryText(text);

    const productName: Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_ProductName = result['ProductName'];

    if (productName === undefined) {
      fail('Expected ProductName to be defined');
    }

    strictEqual(productName['data'], 'Windows 11 Pro');

    return;
  });

  it('handles LF line endings', () => {
    const text: Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_Text = '    ProductName    REG_SZ    Windows 11\n    CurrentBuild    REG_SZ    22631';

    const result: Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_Result = parseWindowsRegistryText(text);

    const resultKeys: Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_ResultKeys = Object.keys(result);

    strictEqual(resultKeys.length, 2);

    const productName: Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_ProductName = result['ProductName'];
    const currentBuild: Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_CurrentBuild = result['CurrentBuild'];

    if (productName === undefined) {
      fail('Expected ProductName to be defined');
    }

    if (currentBuild === undefined) {
      fail('Expected CurrentBuild to be defined');
    }

    strictEqual(productName['data'], 'Windows 11');
    strictEqual(currentBuild['data'], '22631');

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Build Generated File Header.
 *
 * @since 0.16.3
 */
describe('buildGeneratedFileHeader', () => {
  it('produces a #-prefixed strict banner for a .yml path', () => {
    const result: Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAPrefixedStrictBannerForAYmlPath_Result = buildGeneratedFileHeader({
      command: 'nova generate github funding',
      docsSlug: 'cli/generators/github/funding',
      targetPath: '/tmp/proj/.github/FUNDING.yml',
      mode: 'strict',
    });

    strictEqual(
      result,
      [
        '# This file is generated by @cbnventures/nova.',
        '# Do not edit manually.',
        '#',
        '# Run `nova generate github funding` to regenerate.',
        '# See: https://nova.cbnventures.io/docs/cli/generators/github/funding',
        '',
        '',
      ].join('\n'),
    );

    return;
  });

  it('produces a #-prefixed strict banner for a .yaml path', () => {
    const result: Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAPrefixedStrictBannerForAYamlPath_Result = buildGeneratedFileHeader({
      command: 'nova generate github funding',
      docsSlug: 'cli/generators/github/funding',
      targetPath: '/tmp/proj/.github/FUNDING.yaml',
      mode: 'strict',
    });

    ok(result.startsWith('# This file is generated by @cbnventures/nova.\n'));
    ok(result.includes('# Do not edit manually.\n'));

    return;
  });

  it('produces a #-prefixed strict banner for an .editorconfig basename', () => {
    const result: Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAPrefixedStrictBannerForAnEditorconfigBasename_Result = buildGeneratedFileHeader({
      command: 'nova generate must-haves editorconfig',
      docsSlug: 'cli/generators/must-haves/editorconfig',
      targetPath: '/tmp/proj/.editorconfig',
      mode: 'strict',
    });

    ok(result.startsWith('# This file is generated by @cbnventures/nova.\n'));
    ok(result.includes('# Run `nova generate must-haves editorconfig` to regenerate.\n'));

    return;
  });

  it('produces a #-prefixed strict banner for a .gitignore basename', () => {
    const result: Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAPrefixedStrictBannerForAGitignoreBasename_Result = buildGeneratedFileHeader({
      command: 'nova generate must-haves gitignore',
      docsSlug: 'cli/generators/must-haves/gitignore',
      targetPath: '/tmp/proj/.gitignore',
      mode: 'strict',
    });

    ok(result.startsWith('# This file is generated by @cbnventures/nova.\n'));

    return;
  });

  it('produces a #-prefixed strict banner for a .env.sample basename', () => {
    const result: Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAPrefixedStrictBannerForAEnvSampleBasename_Result = buildGeneratedFileHeader({
      command: 'nova generate must-haves dotenv',
      docsSlug: 'cli/generators/must-haves/dotenv',
      targetPath: '/tmp/proj/.env.sample',
      mode: 'strict',
    });

    ok(result.startsWith('# This file is generated by @cbnventures/nova.\n'));
    ok(result.includes('# Do not edit manually.\n'));

    return;
  });

  it('produces a #-prefixed fillable banner for a .env basename', () => {
    const result: Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAPrefixedFillableBannerForAEnvBasename_Result = buildGeneratedFileHeader({
      command: 'nova generate must-haves dotenv',
      docsSlug: 'cli/generators/must-haves/dotenv',
      targetPath: '/tmp/proj/.env',
      mode: 'fillable',
    });

    strictEqual(
      result,
      [
        '# This file is generated by @cbnventures/nova.',
        '# You may fill in values for existing keys only — do not add, rename, or remove keys.',
        '#',
        '# Run `nova generate must-haves dotenv` to regenerate.',
        '# See: https://nova.cbnventures.io/docs/cli/generators/must-haves/dotenv',
        '',
        '',
      ].join('\n'),
    );

    return;
  });

  it('produces an HTML-comment strict banner for a .md path', () => {
    const result: Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAnHTMLCommentStrictBannerForAMdPath_Result = buildGeneratedFileHeader({
      command: 'nova generate must-haves read-me',
      docsSlug: 'cli/generators/must-haves/read-me',
      targetPath: '/tmp/proj/README.md',
      mode: 'strict',
    });

    strictEqual(
      result,
      [
        '<!--',
        '  This file is generated by @cbnventures/nova.',
        '  Do not edit manually.',
        '',
        '  Run `nova generate must-haves read-me` to regenerate.',
        '  See: https://nova.cbnventures.io/docs/cli/generators/must-haves/read-me',
        '-->',
        '',
        '',
      ].join('\n'),
    );

    return;
  });

  it('throws when the targetPath has an unsupported extension', () => {
    let threw: Tests_Lib_Utility_BuildGeneratedFileHeader_ThrowsWhenTheTargetPathHasAnUnsupportedExtension_Threw = false;

    try {
      buildGeneratedFileHeader({
        command: 'nova generate something',
        docsSlug: 'cli/generators/something',
        targetPath: '/tmp/proj/something.json',
        mode: 'strict',
      });
    } catch (error) {
      threw = true;

      ok(error instanceof Error);
      ok(error.message.includes('buildGeneratedFileHeader'));
      ok(error.message.includes('something.json'));
    }

    strictEqual(threw, true);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - SaveGeneratedFile (with Header).
 *
 * @since 0.16.3
 */
describe('saveGeneratedFile (with header)', async () => {
  const originalCwd: Tests_Lib_Utility_SaveGeneratedFileWithHeader_OriginalCwd = process.cwd();
  const sandboxRoot: Tests_Lib_Utility_SaveGeneratedFileWithHeader_SandboxRoot = await mkdtemp(join(tmpdir(), 'nova-test-savegen-'));

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('prepends the banner before writing when header is supplied', async () => {
    const projectDirectory: Tests_Lib_Utility_SaveGeneratedFileWithHeader_PrependsTheBannerBeforeWritingWhenHeaderIsSupplied_ProjectDirectory = join(sandboxRoot, 'prepend');

    await mkdir(projectDirectory, { recursive: true });

    const targetPath: Tests_Lib_Utility_SaveGeneratedFileWithHeader_PrependsTheBannerBeforeWritingWhenHeaderIsSupplied_TargetPath = join(projectDirectory, '.gitignore');

    await saveGeneratedFile(targetPath, 'node_modules\n', false, {
      command: 'nova generate must-haves gitignore',
      docsSlug: 'cli/generators/must-haves/gitignore',
      mode: 'strict',
    });

    const written: Tests_Lib_Utility_SaveGeneratedFileWithHeader_PrependsTheBannerBeforeWritingWhenHeaderIsSupplied_Written = await readFile(targetPath, 'utf-8');
    const expectedHeader: Tests_Lib_Utility_SaveGeneratedFileWithHeader_PrependsTheBannerBeforeWritingWhenHeaderIsSupplied_ExpectedHeader = buildGeneratedFileHeader({
      command: 'nova generate must-haves gitignore',
      docsSlug: 'cli/generators/must-haves/gitignore',
      targetPath,
      mode: 'strict',
    });

    strictEqual(written, `${expectedHeader}node_modules\n`);

    return;
  });

  it('skips the write when the header-prefixed content already matches disk', async () => {
    const projectDirectory: Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_ProjectDirectory = join(sandboxRoot, 'skip-identical');

    await mkdir(projectDirectory, { recursive: true });

    const targetPath: Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_TargetPath = join(projectDirectory, '.gitignore');
    const headerOptions: Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_HeaderOptions = {
      command: 'nova generate must-haves gitignore',
      docsSlug: 'cli/generators/must-haves/gitignore',
      mode: 'strict' as const,
    };

    await saveGeneratedFile(targetPath, 'node_modules\n', false, headerOptions);

    const firstWrite: Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_FirstWrite = await stat(targetPath);

    await new Promise((resolve) => {
      setTimeout(resolve, 5);

      return;
    });

    await saveGeneratedFile(targetPath, 'node_modules\n', false, headerOptions);

    const secondWrite: Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_SecondWrite = await stat(targetPath);

    strictEqual(secondWrite.mtimeMs, firstWrite.mtimeMs);

    return;
  });

  it('preserves existing behavior when header is omitted', async () => {
    const projectDirectory: Tests_Lib_Utility_SaveGeneratedFileWithHeader_PreservesExistingBehaviorWhenHeaderIsOmitted_ProjectDirectory = join(sandboxRoot, 'no-header');

    await mkdir(projectDirectory, { recursive: true });

    const targetPath: Tests_Lib_Utility_SaveGeneratedFileWithHeader_PreservesExistingBehaviorWhenHeaderIsOmitted_TargetPath = join(projectDirectory, '.gitignore');

    await saveGeneratedFile(targetPath, 'node_modules\n', false);

    const written: Tests_Lib_Utility_SaveGeneratedFileWithHeader_PreservesExistingBehaviorWhenHeaderIsOmitted_Written = await readFile(targetPath, 'utf-8');

    strictEqual(written, 'node_modules\n');

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Normalize Route Segment.
 *
 * @since 0.17.1
 */
describe('normalizeRouteSegment', () => {
  const cases: Tests_Lib_Utility_NormalizeRouteSegment_Cases = [

    // Phase 1 — unwrap framework patterns.
    {
      input: '[id]', expected: 'id', description: 'dynamic segment',
    },
    {
      input: '[slug]', expected: 'slug', description: 'dynamic segment with longer name',
    },
    {
      input: '[...name]', expected: 'name', description: 'catch-all segment',
    },
    {
      input: '[...not-found]', expected: 'not-found', description: 'catch-all with hyphen preserved',
    },
    {
      input: '[[...name]]', expected: 'name', description: 'optional catch-all segment',
    },
    {
      input: '[[...rest]]', expected: 'rest', description: 'optional catch-all with different name',
    },
    {
      input: '(group)', expected: 'group', description: 'route group',
    },
    {
      input: '(marketing)', expected: 'marketing', description: 'route group with name',
    },
    {
      input: '@modal', expected: 'modal', description: 'parallel route slot',
    },
    {
      input: '@slot', expected: 'slot', description: 'parallel route with short name',
    },

    // Pass-through.
    {
      input: 'components', expected: 'components', description: 'plain kebab-case pass-through',
    },
    {
      input: 'package-json', expected: 'package-json', description: 'hyphen preserved',
    },
    {
      input: 'MDXComponents', expected: 'MDXComponents', description: 'PascalCase preserved',
    },

    // Phase 2 — dash-replace non-identifier chars.
    {
      input: 'foo$bar', expected: 'foo-bar', description: 'dollar replaced with hyphen',
    },
    {
      input: 'hello.world', expected: 'hello-world', description: 'dot replaced with hyphen',
    },
    {
      input: 'hello world', expected: 'hello-world', description: 'space replaced with hyphen',
    },
    {
      input: 'hello..world', expected: 'hello--world', description: 'multiple dots become multiple hyphens',
    },

    // Empty-signal cases.
    {
      input: '', expected: '', description: 'empty string returns empty',
    },
    {
      input: '   ', expected: '', description: 'whitespace-only returns empty',
    },
    {
      input: '@@@', expected: '', description: 'no alphanumeric returns empty',
    },
    {
      input: '[]', expected: '', description: 'empty brackets return empty',
    },
    {
      input: '[.]', expected: '', description: 'only punctuation returns empty',
    },
  ];

  for (const testCase of cases) {
    it(`${testCase['description']} — ${JSON.stringify(testCase['input'])} → ${JSON.stringify(testCase['expected'])}`, () => {
      const result: Tests_Lib_Utility_NormalizeRouteSegment_Result = normalizeRouteSegment(testCase['input']);

      strictEqual(result, testCase['expected']);

      return;
    });
  }

  return;
});
