import type { Stats } from 'node:fs';

/**
 * Tests - Lib - Utility - BuildGeneratedFileHeader - ProducesAnHTMLCommentStrictBannerForAMdPath.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAnHTMLCommentStrictBannerForAMdPath_Result = string;

/**
 * Tests - Lib - Utility - BuildGeneratedFileHeader - ProducesAPrefixedFillableBannerForAEnvBasename.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAPrefixedFillableBannerForAEnvBasename_Result = string;

/**
 * Tests - Lib - Utility - BuildGeneratedFileHeader - ProducesAPrefixedStrictBannerForAEnvSampleBasename.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAPrefixedStrictBannerForAEnvSampleBasename_Result = string;

/**
 * Tests - Lib - Utility - BuildGeneratedFileHeader - ProducesAPrefixedStrictBannerForAGitignoreBasename.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAPrefixedStrictBannerForAGitignoreBasename_Result = string;

/**
 * Tests - Lib - Utility - BuildGeneratedFileHeader - ProducesAPrefixedStrictBannerForAnEditorconfigBasename.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAPrefixedStrictBannerForAnEditorconfigBasename_Result = string;

/**
 * Tests - Lib - Utility - BuildGeneratedFileHeader - ProducesAPrefixedStrictBannerForAYamlPath.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAPrefixedStrictBannerForAYamlPath_Result = string;

/**
 * Tests - Lib - Utility - BuildGeneratedFileHeader - ProducesAPrefixedStrictBannerForAYmlPath.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_BuildGeneratedFileHeader_ProducesAPrefixedStrictBannerForAYmlPath_Result = string;

/**
 * Tests - Lib - Utility - BuildGeneratedFileHeader - ThrowsWhenTheTargetPathHasAnUnsupportedExtension.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_BuildGeneratedFileHeader_ThrowsWhenTheTargetPathHasAnUnsupportedExtension_Threw = boolean;

/**
 * Tests - Lib - Utility - CompareSemver - ComparesNumericallyNotLexically.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_CompareSemver_ComparesNumericallyNotLexically_Result = number;

/**
 * Tests - Lib - Utility - CompareSemver - ReturnsNegativeWhenFirstVersionIsLower.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_CompareSemver_ReturnsNegativeWhenFirstVersionIsLower_Result = number;

/**
 * Tests - Lib - Utility - CompareSemver - ReturnsPositiveWhenFirstVersionIsHigher.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_CompareSemver_ReturnsPositiveWhenFirstVersionIsHigher_Result = number;

/**
 * Tests - Lib - Utility - CompareSemver - ReturnsZeroWhenVersionsAreEqual.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_CompareSemver_ReturnsZeroWhenVersionsAreEqual_Result = number;

/**
 * Tests - Lib - Utility - CompareSemver - TreatsMissingPartsAsZero.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_CompareSemver_TreatsMissingPartsAsZero_Result = number;

/**
 * Tests - Lib - Utility - CurrentTimestamp - MatchesExpectedTimestampFormat.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_CurrentTimestamp_MatchesExpectedTimestampFormat_Result = string;

export type Tests_Lib_Utility_CurrentTimestamp_MatchesExpectedTimestampFormat_Pattern = RegExp;

/**
 * Tests - Lib - Utility - CurrentTimestamp - ProducesDifferentMillisecondsOnConsecutiveCalls.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_CurrentTimestamp_ProducesDifferentMillisecondsOnConsecutiveCalls_Results = Set<string>;

export type Tests_Lib_Utility_CurrentTimestamp_ProducesDifferentMillisecondsOnConsecutiveCalls_Timestamp = string;

/**
 * Tests - Lib - Utility - CurrentTimestamp - ReturnsABracketedTimestampString.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_CurrentTimestamp_ReturnsABracketedTimestampString_Result = string;

export type Tests_Lib_Utility_CurrentTimestamp_ReturnsABracketedTimestampString_StartsWithBracket = boolean;

export type Tests_Lib_Utility_CurrentTimestamp_ReturnsABracketedTimestampString_EndsWithBracket = boolean;

/**
 * Tests - Lib - Utility - DetectShell - ReturnsAKnownShellPath.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_DetectShell_ReturnsAKnownShellPath_Result = string;

export type Tests_Lib_Utility_DetectShell_ReturnsAKnownShellPath_KnownShells = string[];

export type Tests_Lib_Utility_DetectShell_ReturnsAKnownShellPath_IsKnownShell = boolean;

/**
 * Tests - Lib - Utility - DetectShell - ReturnsANonEmptyString.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_DetectShell_ReturnsANonEmptyString_Result = string;

/**
 * Tests - Lib - Utility - DiscoverPathsWithFile.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_DiscoverPathsWithFile_OriginalCwd = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_TemporaryDirectory = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_SandboxPrefix = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_SandboxRoot = string;

/**
 * Tests - Lib - Utility - DiscoverPathsWithFile - ClimbsToParentPackageJsonFilesWhenTraversingBackward.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_ProjectRoot = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_AppRoot = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_AppStuffRoot = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_ProjectPackage = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_AppPackage = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_RealProjectRoot = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_RealAppStuffRoot = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_AbsolutePaths = string[];

export type Tests_Lib_Utility_DiscoverPathsWithFile_ClimbsToParentPackageJsonFilesWhenTraversingBackward_RelativePaths = string[];

/**
 * Tests - Lib - Utility - DiscoverPathsWithFile - FindsEveryPackageJsonWhenTraversingForward.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_ProjectRoot = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_AppRoot = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_PackageRoot = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_NodeRoot = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_DotHiddenRoot = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_ProjectPackage = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_AppPackage = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_PackagePackage = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_NodePackage = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_DotHiddenPackage = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_RealProjectRoot = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_AbsolutePaths = string[];

export type Tests_Lib_Utility_DiscoverPathsWithFile_FindsEveryPackageJsonWhenTraversingForward_RelativePaths = string[];

/**
 * Tests - Lib - Utility - ExecuteShell - ReturnsNonZeroCodeForFailingCommand.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ExecuteShell_ReturnsNonZeroCodeForFailingCommand_Result_TextOut = string;

export type Tests_Lib_Utility_ExecuteShell_ReturnsNonZeroCodeForFailingCommand_Result_TextError = string;

export type Tests_Lib_Utility_ExecuteShell_ReturnsNonZeroCodeForFailingCommand_Result_Code = number;

export type Tests_Lib_Utility_ExecuteShell_ReturnsNonZeroCodeForFailingCommand_Result = Readonly<{
  textOut: Tests_Lib_Utility_ExecuteShell_ReturnsNonZeroCodeForFailingCommand_Result_TextOut;
  textError: Tests_Lib_Utility_ExecuteShell_ReturnsNonZeroCodeForFailingCommand_Result_TextError;
  code: Tests_Lib_Utility_ExecuteShell_ReturnsNonZeroCodeForFailingCommand_Result_Code;
}>;

/**
 * Tests - Lib - Utility - ExecuteShell - RunsASimpleEchoCommand.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ExecuteShell_RunsASimpleEchoCommand_Result_TextOut = string;

export type Tests_Lib_Utility_ExecuteShell_RunsASimpleEchoCommand_Result_TextError = string;

export type Tests_Lib_Utility_ExecuteShell_RunsASimpleEchoCommand_Result_Code = number;

export type Tests_Lib_Utility_ExecuteShell_RunsASimpleEchoCommand_Result = Readonly<{
  textOut: Tests_Lib_Utility_ExecuteShell_RunsASimpleEchoCommand_Result_TextOut;
  textError: Tests_Lib_Utility_ExecuteShell_RunsASimpleEchoCommand_Result_TextError;
  code: Tests_Lib_Utility_ExecuteShell_RunsASimpleEchoCommand_Result_Code;
}>;

export type Tests_Lib_Utility_ExecuteShell_RunsASimpleEchoCommand_IncludesHello = boolean;

/**
 * Tests - Lib - Utility - IsCommandExists - ReturnsFalseForANonExistentCommand.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsCommandExists_ReturnsFalseForANonExistentCommand_Result = boolean;

/**
 * Tests - Lib - Utility - IsCommandExists - ReturnsTrueForAnExistingCommand.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsCommandExists_ReturnsTrueForAnExistingCommand_Result = boolean;

/**
 * Tests - Lib - Utility - IsExecuteShellError - ReturnsFalseForEmptyObject.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsExecuteShellError_ReturnsFalseForEmptyObject_Result = boolean;

/**
 * Tests - Lib - Utility - IsExecuteShellError - ReturnsFalseForNull.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsExecuteShellError_ReturnsFalseForNull_Result = boolean;

/**
 * Tests - Lib - Utility - IsExecuteShellError - ReturnsFalseForNumber.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsExecuteShellError_ReturnsFalseForNumber_Result = boolean;

/**
 * Tests - Lib - Utility - IsExecuteShellError - ReturnsFalseForObjectWithWrongPropertyTypes.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsExecuteShellError_ReturnsFalseForObjectWithWrongPropertyTypes_Result = boolean;

/**
 * Tests - Lib - Utility - IsExecuteShellError - ReturnsFalseForString.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsExecuteShellError_ReturnsFalseForString_Result = boolean;

/**
 * Tests - Lib - Utility - IsExecuteShellError - ReturnsFalseForUndefined.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsExecuteShellError_ReturnsFalseForUndefined_Result = boolean;

/**
 * Tests - Lib - Utility - IsExecuteShellError - ReturnsTrueForObjectWithCmdProperty.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithCmdProperty_Result = boolean;

/**
 * Tests - Lib - Utility - IsExecuteShellError - ReturnsTrueForObjectWithCodeProperty.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithCodeProperty_Result = boolean;

/**
 * Tests - Lib - Utility - IsExecuteShellError - ReturnsTrueForObjectWithKilledProperty.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithKilledProperty_Result = boolean;

/**
 * Tests - Lib - Utility - IsExecuteShellError - ReturnsTrueForObjectWithMultipleExecProperties.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithMultipleExecProperties_Error = Record<string, unknown>;

export type Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithMultipleExecProperties_Result = boolean;

/**
 * Tests - Lib - Utility - IsExecuteShellError - ReturnsTrueForObjectWithSignalProperty.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithSignalProperty_Result = boolean;

/**
 * Tests - Lib - Utility - IsExecuteShellError - ReturnsTrueForObjectWithStderrProperty.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithStderrProperty_Result = boolean;

/**
 * Tests - Lib - Utility - IsExecuteShellError - ReturnsTrueForObjectWithStdoutProperty.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsExecuteShellError_ReturnsTrueForObjectWithStdoutProperty_Result = boolean;

/**
 * Tests - Lib - Utility - IsFileIdentical.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsFileIdentical_TemporaryDirectory = string;

export type Tests_Lib_Utility_IsFileIdentical_SandboxPrefix = string;

export type Tests_Lib_Utility_IsFileIdentical_SandboxRoot = string;

/**
 * Tests - Lib - Utility - IsFileIdentical - ReturnsFalseWhenFileDoesNotExist.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenFileDoesNotExist_FilePath = string;

export type Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenFileDoesNotExist_Result = boolean;

/**
 * Tests - Lib - Utility - IsFileIdentical - ReturnsFalseWhenObjectContentDiffersFromJSONFile.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenObjectContentDiffersFromJSONFile_FilePath = string;

export type Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenObjectContentDiffersFromJSONFile_ExistingContents = Record<string, unknown>;

export type Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenObjectContentDiffersFromJSONFile_ProposedContents = Record<string, unknown>;

export type Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenObjectContentDiffersFromJSONFile_ExistingJson = string;

export type Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenObjectContentDiffersFromJSONFile_Result = boolean;

/**
 * Tests - Lib - Utility - IsFileIdentical - ReturnsFalseWhenStringContentDiffersFromFile.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenStringContentDiffersFromFile_FilePath = string;

export type Tests_Lib_Utility_IsFileIdentical_ReturnsFalseWhenStringContentDiffersFromFile_Result = boolean;

/**
 * Tests - Lib - Utility - IsFileIdentical - ReturnsTrueWhenObjectContentMatchesJSONFile.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsFileIdentical_ReturnsTrueWhenObjectContentMatchesJSONFile_FilePath = string;

export type Tests_Lib_Utility_IsFileIdentical_ReturnsTrueWhenObjectContentMatchesJSONFile_Contents = Record<string, unknown>;

export type Tests_Lib_Utility_IsFileIdentical_ReturnsTrueWhenObjectContentMatchesJSONFile_ContentsJson = string;

export type Tests_Lib_Utility_IsFileIdentical_ReturnsTrueWhenObjectContentMatchesJSONFile_Result = boolean;

/**
 * Tests - Lib - Utility - IsFileIdentical - ReturnsTrueWhenStringContentMatchesFile.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsFileIdentical_ReturnsTrueWhenStringContentMatchesFile_FilePath = string;

export type Tests_Lib_Utility_IsFileIdentical_ReturnsTrueWhenStringContentMatchesFile_Result = boolean;

/**
 * Tests - Lib - Utility - IsPlainObject - ReturnsFalseForArray.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsPlainObject_ReturnsFalseForArray_Result = boolean;

/**
 * Tests - Lib - Utility - IsPlainObject - ReturnsFalseForBoolean.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsPlainObject_ReturnsFalseForBoolean_Result = boolean;

/**
 * Tests - Lib - Utility - IsPlainObject - ReturnsFalseForClassInstance.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsPlainObject_ReturnsFalseForClassInstance_Result = boolean;

/**
 * Tests - Lib - Utility - IsPlainObject - ReturnsFalseForDateInstance.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsPlainObject_ReturnsFalseForDateInstance_Result = boolean;

/**
 * Tests - Lib - Utility - IsPlainObject - ReturnsFalseForMapInstance.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsPlainObject_ReturnsFalseForMapInstance_Result = boolean;

/**
 * Tests - Lib - Utility - IsPlainObject - ReturnsFalseForNull.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsPlainObject_ReturnsFalseForNull_Result = boolean;

/**
 * Tests - Lib - Utility - IsPlainObject - ReturnsFalseForNumber.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsPlainObject_ReturnsFalseForNumber_Result = boolean;

/**
 * Tests - Lib - Utility - IsPlainObject - ReturnsFalseForRegExpInstance.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsPlainObject_ReturnsFalseForRegExpInstance_Result = boolean;

/**
 * Tests - Lib - Utility - IsPlainObject - ReturnsFalseForSetInstance.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsPlainObject_ReturnsFalseForSetInstance_Result = boolean;

/**
 * Tests - Lib - Utility - IsPlainObject - ReturnsFalseForString.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsPlainObject_ReturnsFalseForString_Result = boolean;

/**
 * Tests - Lib - Utility - IsPlainObject - ReturnsFalseForUndefined.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsPlainObject_ReturnsFalseForUndefined_Result = boolean;

/**
 * Tests - Lib - Utility - IsPlainObject - ReturnsTrueForEmptyObjectLiteral.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsPlainObject_ReturnsTrueForEmptyObjectLiteral_Result = boolean;

/**
 * Tests - Lib - Utility - IsPlainObject - ReturnsTrueForObjectCreateNull.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsPlainObject_ReturnsTrueForObjectCreateNull_NullPrototypeObject = Record<string, unknown>;

export type Tests_Lib_Utility_IsPlainObject_ReturnsTrueForObjectCreateNull_Result = boolean;

/**
 * Tests - Lib - Utility - IsPlainObject - ReturnsTrueForObjectWithProperties.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsPlainObject_ReturnsTrueForObjectWithProperties_PlainObject = Record<string, unknown>;

export type Tests_Lib_Utility_IsPlainObject_ReturnsTrueForObjectWithProperties_Result = boolean;

/**
 * Tests - Lib - Utility - IsProjectRoot.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsProjectRoot_OriginalCwd = string;

export type Tests_Lib_Utility_IsProjectRoot_TemporaryDirectory = string;

export type Tests_Lib_Utility_IsProjectRoot_SandboxPrefix = string;

export type Tests_Lib_Utility_IsProjectRoot_SandboxRoot = string;

/**
 * Tests - Lib - Utility - IsProjectRoot - ReturnsFalseWhenCwdHasNoPackageJsonAbove.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenCwdHasNoPackageJsonAbove_EmptyDirectory = string;

export type Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenCwdHasNoPackageJsonAbove_RealEmptyDirectory = string;

export type Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenCwdHasNoPackageJsonAbove_Result = boolean;

/**
 * Tests - Lib - Utility - IsProjectRoot - ReturnsFalseWhenMultiplePackageJsonFilesFoundAbove.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenMultiplePackageJsonFilesFoundAbove_ProjectRoot = string;

export type Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenMultiplePackageJsonFilesFoundAbove_AppRoot = string;

export type Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenMultiplePackageJsonFilesFoundAbove_ProjectPackage = string;

export type Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenMultiplePackageJsonFilesFoundAbove_AppPackage = string;

export type Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenMultiplePackageJsonFilesFoundAbove_RealAppRoot = string;

export type Tests_Lib_Utility_IsProjectRoot_ReturnsFalseWhenMultiplePackageJsonFilesFoundAbove_Result = boolean;

/**
 * Tests - Lib - Utility - IsProjectRoot - ReturnsTrueWhenCwdIsProjectRootWithSinglePackageJson.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsProjectRoot_ReturnsTrueWhenCwdIsProjectRootWithSinglePackageJson_ProjectRoot = string;

export type Tests_Lib_Utility_IsProjectRoot_ReturnsTrueWhenCwdIsProjectRootWithSinglePackageJson_PackageJsonPath = string;

export type Tests_Lib_Utility_IsProjectRoot_ReturnsTrueWhenCwdIsProjectRootWithSinglePackageJson_RealProjectRoot = string;

export type Tests_Lib_Utility_IsProjectRoot_ReturnsTrueWhenCwdIsProjectRootWithSinglePackageJson_Result = boolean;

/**
 * Tests - Lib - Utility - LoadWorkspaceManifests.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_LoadWorkspaceManifests_TemporaryDirectory = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_SandboxPrefix = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_SandboxRoot = string;

/**
 * Tests - Lib - Utility - LoadWorkspaceManifests - LoadsPackageJsonForConfiguredWorkspaces.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_ProjectRoot = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_PackageDirectory = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_RootPackageJson = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_CorePackageJson = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_RootPackagePath = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_CorePackagePath = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_Result_Element_Manifest = Record<string, unknown>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_Result_Element_FilePath = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_Result_Element_FileContents = Record<string, unknown>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_Result_Element = Readonly<{
  manifest: Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_Result_Element_Manifest;
  filePath: Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_Result_Element_FilePath;
  fileContents: Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_Result_Element_FileContents;
}>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_Result = ReadonlyArray<Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_Result_Element>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_FirstWorkspace_Workspace_Manifest = Record<string, unknown>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_FirstWorkspace_Workspace_FilePath = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_FirstWorkspace_Workspace_FileContents = Record<string, unknown>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_FirstWorkspace_Workspace = Readonly<{
  manifest: Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_FirstWorkspace_Workspace_Manifest;
  filePath: Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_FirstWorkspace_Workspace_FilePath;
  fileContents: Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_FirstWorkspace_Workspace_FileContents;
}>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_FirstWorkspace = Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_FirstWorkspace_Workspace | undefined;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_SecondWorkspace_Workspace_Manifest = Record<string, unknown>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_SecondWorkspace_Workspace_FilePath = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_SecondWorkspace_Workspace_FileContents = Record<string, unknown>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_SecondWorkspace_Workspace = Readonly<{
  manifest: Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_SecondWorkspace_Workspace_Manifest;
  filePath: Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_SecondWorkspace_Workspace_FilePath;
  fileContents: Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_SecondWorkspace_Workspace_FileContents;
}>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_SecondWorkspace = Tests_Lib_Utility_LoadWorkspaceManifests_LoadsPackageJsonForConfiguredWorkspaces_SecondWorkspace_Workspace | undefined;

/**
 * Tests - Lib - Utility - LoadWorkspaceManifests - ReturnsEmptyArrayWhenNoWorkspacesProvided.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_LoadWorkspaceManifests_ReturnsEmptyArrayWhenNoWorkspacesProvided_Result_Element_Manifest = Record<string, unknown>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_ReturnsEmptyArrayWhenNoWorkspacesProvided_Result_Element_FilePath = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_ReturnsEmptyArrayWhenNoWorkspacesProvided_Result_Element_FileContents = Record<string, unknown>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_ReturnsEmptyArrayWhenNoWorkspacesProvided_Result_Element = Readonly<{
  manifest: Tests_Lib_Utility_LoadWorkspaceManifests_ReturnsEmptyArrayWhenNoWorkspacesProvided_Result_Element_Manifest;
  filePath: Tests_Lib_Utility_LoadWorkspaceManifests_ReturnsEmptyArrayWhenNoWorkspacesProvided_Result_Element_FilePath;
  fileContents: Tests_Lib_Utility_LoadWorkspaceManifests_ReturnsEmptyArrayWhenNoWorkspacesProvided_Result_Element_FileContents;
}>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_ReturnsEmptyArrayWhenNoWorkspacesProvided_Result = ReadonlyArray<Tests_Lib_Utility_LoadWorkspaceManifests_ReturnsEmptyArrayWhenNoWorkspacesProvided_Result_Element>;

/**
 * Tests - Lib - Utility - LoadWorkspaceManifests - SkipsWorkspaceWithMissingPackageJson.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_ProjectRoot = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_RootPackageJson = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_RootPackagePath = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_Result_Element_Manifest = Record<string, unknown>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_Result_Element_FilePath = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_Result_Element_FileContents = Record<string, unknown>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_Result_Element = Readonly<{
  manifest: Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_Result_Element_Manifest;
  filePath: Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_Result_Element_FilePath;
  fileContents: Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_Result_Element_FileContents;
}>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_Result = ReadonlyArray<Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_Result_Element>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_OnlyWorkspace_Workspace_Manifest = Record<string, unknown>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_OnlyWorkspace_Workspace_FilePath = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_OnlyWorkspace_Workspace_FileContents = Record<string, unknown>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_OnlyWorkspace_Workspace = Readonly<{
  manifest: Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_OnlyWorkspace_Workspace_Manifest;
  filePath: Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_OnlyWorkspace_Workspace_FilePath;
  fileContents: Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_OnlyWorkspace_Workspace_FileContents;
}>;

export type Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_OnlyWorkspace = Tests_Lib_Utility_LoadWorkspaceManifests_SkipsWorkspaceWithMissingPackageJson_OnlyWorkspace_Workspace | undefined;

/**
 * Tests - Lib - Utility - NormalizeRouteSegment.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_NormalizeRouteSegment_Case_Input = string;

export type Tests_Lib_Utility_NormalizeRouteSegment_Case_Expected = string;

export type Tests_Lib_Utility_NormalizeRouteSegment_Case_Description = string;

export type Tests_Lib_Utility_NormalizeRouteSegment_Case = Readonly<{
  input: Tests_Lib_Utility_NormalizeRouteSegment_Case_Input;
  expected: Tests_Lib_Utility_NormalizeRouteSegment_Case_Expected;
  description: Tests_Lib_Utility_NormalizeRouteSegment_Case_Description;
}>;

export type Tests_Lib_Utility_NormalizeRouteSegment_Cases = ReadonlyArray<Tests_Lib_Utility_NormalizeRouteSegment_Case>;

export type Tests_Lib_Utility_NormalizeRouteSegment_Result = string;

/**
 * Tests - Lib - Utility - ParseLinuxOsReleaseText - HandlesCRLFLineEndings.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ParseLinuxOsReleaseText_HandlesCRLFLineEndings_Text = string;

export type Tests_Lib_Utility_ParseLinuxOsReleaseText_HandlesCRLFLineEndings_Result = Record<string, string>;

export type Tests_Lib_Utility_ParseLinuxOsReleaseText_HandlesCRLFLineEndings_ResultKeys = string[];

/**
 * Tests - Lib - Utility - ParseLinuxOsReleaseText - HandlesValuesContainingEqualsSign.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ParseLinuxOsReleaseText_HandlesValuesContainingEqualsSign_Text = string;

export type Tests_Lib_Utility_ParseLinuxOsReleaseText_HandlesValuesContainingEqualsSign_Result = Record<string, string>;

/**
 * Tests - Lib - Utility - ParseLinuxOsReleaseText - ParsesAlpineOsReleaseText.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ParseLinuxOsReleaseText_ParsesAlpineOsReleaseText_Text = string;

export type Tests_Lib_Utility_ParseLinuxOsReleaseText_ParsesAlpineOsReleaseText_Result = Record<string, string>;

/**
 * Tests - Lib - Utility - ParseLinuxOsReleaseText - ParsesDebianOsReleaseText.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ParseLinuxOsReleaseText_ParsesDebianOsReleaseText_Text = string;

export type Tests_Lib_Utility_ParseLinuxOsReleaseText_ParsesDebianOsReleaseText_Result = Record<string, string>;

/**
 * Tests - Lib - Utility - ParseLinuxOsReleaseText - ParsesUbuntuOsReleaseText.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ParseLinuxOsReleaseText_ParsesUbuntuOsReleaseText_Text = string;

export type Tests_Lib_Utility_ParseLinuxOsReleaseText_ParsesUbuntuOsReleaseText_Result = Record<string, string>;

/**
 * Tests - Lib - Utility - ParseLinuxOsReleaseText - PreservesUnquotedValues.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ParseLinuxOsReleaseText_PreservesUnquotedValues_Text = string;

export type Tests_Lib_Utility_ParseLinuxOsReleaseText_PreservesUnquotedValues_Result = Record<string, string>;

/**
 * Tests - Lib - Utility - ParseLinuxOsReleaseText - ReturnsEmptyObjectForEmptyString.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ParseLinuxOsReleaseText_ReturnsEmptyObjectForEmptyString_Result = Record<string, string>;

/**
 * Tests - Lib - Utility - ParseLinuxOsReleaseText - SkipsCommentLines.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ParseLinuxOsReleaseText_SkipsCommentLines_Text = string;

export type Tests_Lib_Utility_ParseLinuxOsReleaseText_SkipsCommentLines_Result = Record<string, string>;

export type Tests_Lib_Utility_ParseLinuxOsReleaseText_SkipsCommentLines_ResultKeys = string[];

/**
 * Tests - Lib - Utility - ParseLinuxOsReleaseText - SkipsEmptyLines.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ParseLinuxOsReleaseText_SkipsEmptyLines_Text = string;

export type Tests_Lib_Utility_ParseLinuxOsReleaseText_SkipsEmptyLines_Result = Record<string, string>;

export type Tests_Lib_Utility_ParseLinuxOsReleaseText_SkipsEmptyLines_ResultKeys = string[];

/**
 * Tests - Lib - Utility - ParseLinuxOsReleaseText - StripsDoubleQuotedValues.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ParseLinuxOsReleaseText_StripsDoubleQuotedValues_Text = string;

export type Tests_Lib_Utility_ParseLinuxOsReleaseText_StripsDoubleQuotedValues_Result = Record<string, string>;

/**
 * Tests - Lib - Utility - ParseWindowsRegistryText - HandlesLFLineEndings.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_Text = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_Result_Entry_Type = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_Result_Entry_Data = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_Result_Entry = Readonly<{
  type: Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_Result_Entry_Type;
  data: Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_Result_Entry_Data;
}>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_Result = Record<string, Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_Result_Entry>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_ResultKeys = string[];

export type Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_ProductName_Entry_Type = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_ProductName_Entry_Data = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_ProductName_Entry = Readonly<{
  type: Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_ProductName_Entry_Type;
  data: Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_ProductName_Entry_Data;
}>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_ProductName = Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_ProductName_Entry | undefined;

export type Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_CurrentBuild_Entry_Type = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_CurrentBuild_Entry_Data = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_CurrentBuild_Entry = Readonly<{
  type: Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_CurrentBuild_Entry_Type;
  data: Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_CurrentBuild_Entry_Data;
}>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_CurrentBuild = Tests_Lib_Utility_ParseWindowsRegistryText_HandlesLFLineEndings_CurrentBuild_Entry | undefined;

/**
 * Tests - Lib - Utility - ParseWindowsRegistryText - ParsesMixedRegistryTypes.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_Text = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_Result_Entry_Type = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_Result_Entry_Data = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_Result_Entry = Readonly<{
  type: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_Result_Entry_Type;
  data: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_Result_Entry_Data;
}>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_Result = Record<string, Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_Result_Entry>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_ResultKeys = string[];

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_ProductName_Entry_Type = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_ProductName_Entry_Data = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_ProductName_Entry = Readonly<{
  type: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_ProductName_Entry_Type;
  data: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_ProductName_Entry_Data;
}>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_ProductName = Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_ProductName_Entry | undefined;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_CurrentBuild_Entry_Type = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_CurrentBuild_Entry_Data = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_CurrentBuild_Entry = Readonly<{
  type: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_CurrentBuild_Entry_Type;
  data: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_CurrentBuild_Entry_Data;
}>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_CurrentBuild = Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_CurrentBuild_Entry | undefined;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_CurrentMajorVersionNumber_Entry_Type = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_CurrentMajorVersionNumber_Entry_Data = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_CurrentMajorVersionNumber_Entry = Readonly<{
  type: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_CurrentMajorVersionNumber_Entry_Type;
  data: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_CurrentMajorVersionNumber_Entry_Data;
}>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_CurrentMajorVersionNumber = Tests_Lib_Utility_ParseWindowsRegistryText_ParsesMixedRegistryTypes_CurrentMajorVersionNumber_Entry | undefined;

/**
 * Tests - Lib - Utility - ParseWindowsRegistryText - ParsesREGDWORDValues.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_Text = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_Result_Entry_Type = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_Result_Entry_Data = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_Result_Entry = Readonly<{
  type: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_Result_Entry_Type;
  data: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_Result_Entry_Data;
}>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_Result = Record<string, Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_Result_Entry>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_CurrentMajorVersionNumber_Entry_Type = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_CurrentMajorVersionNumber_Entry_Data = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_CurrentMajorVersionNumber_Entry = Readonly<{
  type: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_CurrentMajorVersionNumber_Entry_Type;
  data: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_CurrentMajorVersionNumber_Entry_Data;
}>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_CurrentMajorVersionNumber = Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGDWORDValues_CurrentMajorVersionNumber_Entry | undefined;

/**
 * Tests - Lib - Utility - ParseWindowsRegistryText - ParsesREGSZValues.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_Text = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_Result_Entry_Type = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_Result_Entry_Data = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_Result_Entry = Readonly<{
  type: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_Result_Entry_Type;
  data: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_Result_Entry_Data;
}>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_Result = Record<string, Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_Result_Entry>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_ProductName_Entry_Type = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_ProductName_Entry_Data = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_ProductName_Entry = Readonly<{
  type: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_ProductName_Entry_Type;
  data: Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_ProductName_Entry_Data;
}>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_ProductName = Tests_Lib_Utility_ParseWindowsRegistryText_ParsesREGSZValues_ProductName_Entry | undefined;

/**
 * Tests - Lib - Utility - ParseWindowsRegistryText - ReturnsEmptyObjectForEmptyString.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ParseWindowsRegistryText_ReturnsEmptyObjectForEmptyString_Result_Entry_Type = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ReturnsEmptyObjectForEmptyString_Result_Entry_Data = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ReturnsEmptyObjectForEmptyString_Result_Entry = Readonly<{
  type: Tests_Lib_Utility_ParseWindowsRegistryText_ReturnsEmptyObjectForEmptyString_Result_Entry_Type;
  data: Tests_Lib_Utility_ParseWindowsRegistryText_ReturnsEmptyObjectForEmptyString_Result_Entry_Data;
}>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ReturnsEmptyObjectForEmptyString_Result = Record<string, Tests_Lib_Utility_ParseWindowsRegistryText_ReturnsEmptyObjectForEmptyString_Result_Entry>;

/**
 * Tests - Lib - Utility - ParseWindowsRegistryText - SkipsNonMatchingLines.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_Text = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_Result_Entry_Type = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_Result_Entry_Data = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_Result_Entry = Readonly<{
  type: Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_Result_Entry_Type;
  data: Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_Result_Entry_Data;
}>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_Result = Record<string, Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_Result_Entry>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_ResultKeys = string[];

export type Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_ProductName_Entry_Type = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_ProductName_Entry_Data = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_ProductName_Entry = Readonly<{
  type: Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_ProductName_Entry_Type;
  data: Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_ProductName_Entry_Data;
}>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_ProductName = Tests_Lib_Utility_ParseWindowsRegistryText_SkipsNonMatchingLines_ProductName_Entry | undefined;

/**
 * Tests - Lib - Utility - ParseWindowsRegistryText - TrimsTrailingWhitespaceFromData.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_Text = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_Result_Entry_Type = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_Result_Entry_Data = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_Result_Entry = Readonly<{
  type: Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_Result_Entry_Type;
  data: Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_Result_Entry_Data;
}>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_Result = Record<string, Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_Result_Entry>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_ProductName_Entry_Type = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_ProductName_Entry_Data = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_ProductName_Entry = Readonly<{
  type: Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_ProductName_Entry_Type;
  data: Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_ProductName_Entry_Data;
}>;

export type Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_ProductName = Tests_Lib_Utility_ParseWindowsRegistryText_TrimsTrailingWhitespaceFromData_ProductName_Entry | undefined;

/**
 * Tests - Lib - Utility - PathExists - ReturnsFalseForNonExistentPath.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_PathExists_ReturnsFalseForNonExistentPath_TemporaryDirectory = string;

export type Tests_Lib_Utility_PathExists_ReturnsFalseForNonExistentPath_NonExistentPath = string;

export type Tests_Lib_Utility_PathExists_ReturnsFalseForNonExistentPath_Result = boolean;

/**
 * Tests - Lib - Utility - PathExists - ReturnsTrueForExistingDirectory.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_PathExists_ReturnsTrueForExistingDirectory_TemporaryDirectory = string;

export type Tests_Lib_Utility_PathExists_ReturnsTrueForExistingDirectory_TemporaryPrefix = string;

export type Tests_Lib_Utility_PathExists_ReturnsTrueForExistingDirectory_SandboxDirectory = string;

export type Tests_Lib_Utility_PathExists_ReturnsTrueForExistingDirectory_Result = boolean;

/**
 * Tests - Lib - Utility - PathExists - ReturnsTrueForExistingFile.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_PathExists_ReturnsTrueForExistingFile_TemporaryDirectory = string;

export type Tests_Lib_Utility_PathExists_ReturnsTrueForExistingFile_TemporaryPrefix = string;

export type Tests_Lib_Utility_PathExists_ReturnsTrueForExistingFile_SandboxDirectory = string;

export type Tests_Lib_Utility_PathExists_ReturnsTrueForExistingFile_TemporaryFile = string;

export type Tests_Lib_Utility_PathExists_ReturnsTrueForExistingFile_Result = boolean;

/**
 * Tests - Lib - Utility - RenameFileWithDate.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_RenameFileWithDate_TemporaryDirectory = string;

export type Tests_Lib_Utility_RenameFileWithDate_SandboxPrefix = string;

export type Tests_Lib_Utility_RenameFileWithDate_SandboxRoot = string;

/**
 * Tests - Lib - Utility - RenameFileWithDate - IncrementsCounterWhenTargetFileAlreadyExists.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_SubDirectory = string;

export type Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_FilePath = string;

export type Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_Now = Date;

export type Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_Timestamp = string;

export type Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_ExistingName = string;

export type Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_ExistingFilePath = string;

export type Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_Result = boolean;

export type Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_Files = string[];

export type Tests_Lib_Utility_RenameFileWithDate_IncrementsCounterWhenTargetFileAlreadyExists_SecondFile = string | undefined;

/**
 * Tests - Lib - Utility - RenameFileWithDate - RenamesAFileWithADateStampedName.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_RenameFileWithDate_RenamesAFileWithADateStampedName_FilePath = string;

export type Tests_Lib_Utility_RenameFileWithDate_RenamesAFileWithADateStampedName_Result = boolean;

export type Tests_Lib_Utility_RenameFileWithDate_RenamesAFileWithADateStampedName_OriginalExists = boolean;

export type Tests_Lib_Utility_RenameFileWithDate_RenamesAFileWithADateStampedName_Files = string[];

export type Tests_Lib_Utility_RenameFileWithDate_RenamesAFileWithADateStampedName_RenamedFile = string | undefined;

export type Tests_Lib_Utility_RenameFileWithDate_RenamesAFileWithADateStampedName_MatchesBackupPattern = boolean;

/**
 * Tests - Lib - Utility - RenameFileWithDate - ReturnsFalseWhenSourceFileDoesNotExist.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_RenameFileWithDate_ReturnsFalseWhenSourceFileDoesNotExist_FilePath = string;

export type Tests_Lib_Utility_RenameFileWithDate_ReturnsFalseWhenSourceFileDoesNotExist_Result = boolean;

/**
 * Tests - Lib - Utility - SaveGeneratedFileWithHeader.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_OriginalCwd = string;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_SandboxRoot = string;

/**
 * Tests - Lib - Utility - SaveGeneratedFileWithHeader - PrependsTheBannerBeforeWritingWhenHeaderIsSupplied.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_PrependsTheBannerBeforeWritingWhenHeaderIsSupplied_ProjectDirectory = string;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_PrependsTheBannerBeforeWritingWhenHeaderIsSupplied_TargetPath = string;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_PrependsTheBannerBeforeWritingWhenHeaderIsSupplied_Written = string;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_PrependsTheBannerBeforeWritingWhenHeaderIsSupplied_ExpectedHeader = string;

/**
 * Tests - Lib - Utility - SaveGeneratedFileWithHeader - PreservesExistingBehaviorWhenHeaderIsOmitted.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_PreservesExistingBehaviorWhenHeaderIsOmitted_ProjectDirectory = string;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_PreservesExistingBehaviorWhenHeaderIsOmitted_TargetPath = string;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_PreservesExistingBehaviorWhenHeaderIsOmitted_Written = string;

/**
 * Tests - Lib - Utility - SaveGeneratedFileWithHeader - SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_ProjectDirectory = string;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_TargetPath = string;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_HeaderOptions_Command = string;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_HeaderOptions_DocsSlug = string;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_HeaderOptions_Mode = 'strict' | 'fillable';

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_HeaderOptions = Readonly<{
  command: Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_HeaderOptions_Command;
  docsSlug: Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_HeaderOptions_DocsSlug;
  mode: Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_HeaderOptions_Mode;
}>;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_FirstWrite = Stats;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_SkipsTheWriteWhenTheHeaderPrefixedContentAlreadyMatchesDisk_SecondWrite = Stats;

/**
 * Tests - Lib - Utility - SaveWorkspaceManifest.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_SaveWorkspaceManifest_TemporaryDirectory = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_SandboxPrefix = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_SandboxRoot = string;

/**
 * Tests - Lib - Utility - SaveWorkspaceManifest - CreatesBackupWhenReplaceFileIsFalse.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_SubDirectory = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_FilePath = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_Original = Record<string, unknown>;

export type Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_OriginalJson = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_Modified = Record<string, unknown>;

export type Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_Files = string[];

export type Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_BackupFile = string | undefined;

export type Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_WrittenRaw = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_CreatesBackupWhenReplaceFileIsFalse_Written = Record<string, unknown>;

/**
 * Tests - Lib - Utility - SaveWorkspaceManifest - SkipsWritingWhenFileContentsAreIdentical.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_SaveWorkspaceManifest_SkipsWritingWhenFileContentsAreIdentical_FilePath = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_SkipsWritingWhenFileContentsAreIdentical_FileDirectory = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_SkipsWritingWhenFileContentsAreIdentical_Contents = Record<string, unknown>;

export type Tests_Lib_Utility_SaveWorkspaceManifest_SkipsWritingWhenFileContentsAreIdentical_ContentsJson = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_SkipsWritingWhenFileContentsAreIdentical_StatBefore = Stats;

export type Tests_Lib_Utility_SaveWorkspaceManifest_SkipsWritingWhenFileContentsAreIdentical_StatAfter = Stats;

/**
 * Tests - Lib - Utility - SaveWorkspaceManifest - WritesChangedFileContents.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_FilePath = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_FileDirectory = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_Original = Record<string, unknown>;

export type Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_OriginalJson = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_Modified = Record<string, unknown>;

export type Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_WrittenRaw = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_WritesChangedFileContents_Written = Record<string, unknown>;

/**
 * Tests - Lib - Utility - ShellQuote - EscapesACommandSubstitutionPayloadSafely.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ShellQuote_EscapesACommandSubstitutionPayloadSafely_Result = string;

/**
 * Tests - Lib - Utility - ShellQuote - EscapesBackslashWithDoubleBackslash.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ShellQuote_EscapesBackslashWithDoubleBackslash_Result = string;

/**
 * Tests - Lib - Utility - ShellQuote - EscapesBackticksToPreventCommandSubstitution.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ShellQuote_EscapesBackticksToPreventCommandSubstitution_Result = string;

/**
 * Tests - Lib - Utility - ShellQuote - EscapesDollarSignToPreventVariableExpansion.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ShellQuote_EscapesDollarSignToPreventVariableExpansion_Result = string;

/**
 * Tests - Lib - Utility - ShellQuote - EscapesEmbeddedDoubleQuotesWithBackslash.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ShellQuote_EscapesEmbeddedDoubleQuotesWithBackslash_Result = string;

/**
 * Tests - Lib - Utility - ShellQuote - HandlesAnEmptyString.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ShellQuote_HandlesAnEmptyString_Result = string;

/**
 * Tests - Lib - Utility - ShellQuote - PreservesSingleQuotesUnchanged.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ShellQuote_PreservesSingleQuotesUnchanged_Result = string;

/**
 * Tests - Lib - Utility - ShellQuote - PreservesSpacesInsideTheQuotedValue.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ShellQuote_PreservesSpacesInsideTheQuotedValue_Result = string;

/**
 * Tests - Lib - Utility - ShellQuote - WrapsPlainValuesInDoubleQuotes.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ShellQuote_WrapsPlainValuesInDoubleQuotes_Result = string;
