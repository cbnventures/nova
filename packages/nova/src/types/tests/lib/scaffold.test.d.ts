import type { vi } from 'vitest';

import type {
  Shared_MonorepoContext,
  Shared_ScaffoldConfig,
  Shared_ScaffoldTemplateQuestions,
  Shared_ScaffoldTemplateResolution,
} from '../../shared.d.ts';

/**
 * Tests - Lib - Scaffold - Template Questions.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_TemplateQuestions = Shared_ScaffoldTemplateQuestions;

export type Tests_Lib_Scaffold_OptionalTemplateQuestions = Shared_ScaffoldTemplateQuestions;

/**
 * Tests - Lib - Scaffold - Detect Monorepo Context.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Scaffold_DetectMonorepoContext_OriginalCwd = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_TemporaryDirectory = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_TemporaryPrefix = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_SandboxRoot = string;

/**
 * Tests - Lib - Scaffold - Detect Monorepo Context - Detects Invalid Package Json Before Scaffolding.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsInvalidPackageJsonBeforeScaffolding_ProjectDirectory = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsInvalidPackageJsonBeforeScaffolding_PackageJsonPath = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsInvalidPackageJsonBeforeScaffolding_ResolvedDirectory = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsInvalidPackageJsonBeforeScaffolding_Result = Shared_MonorepoContext;

/**
 * Tests - Lib - Scaffold - Detect Monorepo Context - Detects Monorepo Mode In Empty Directory.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_ProjectDirectory = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_ResolvedDirectory = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_Result_Context = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_Result = Readonly<{
  context: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_Result_Context;
}>;

/**
 * Tests - Lib - Scaffold - Detect Monorepo Context - Detects Standalone Project.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_ProjectDirectory = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_PackageJson = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_PackageContents = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_PackageJsonPath = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_ResolvedDirectory = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_Result_Context = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_Result = Readonly<{
  context: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_Result_Context;
}>;

/**
 * Tests - Lib - Scaffold - Detect Monorepo Context - Detects Workspace Mode At Monorepo Root.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_ProjectDirectory = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_PackageJson = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_PackageContents = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_PackageJsonPath = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_ResolvedDirectory = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_Result_Context = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_Result = Readonly<{
  context: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_Result_Context;
}>;

/**
 * Tests - Lib - Scaffold - Is Windows Reserved Path Segment - Accepts Names Outside The Windows Device Range.
 *
 * @since 0.34.0
 */
export type Tests_Lib_Scaffold_IsWindowsReservedPathSegment_AcceptsNamesOutsideTheWindowsDeviceRange_Returns = void;

/**
 * Tests - Lib - Scaffold - Is Windows Reserved Path Segment - Rejects Windows Device Names And Normalized Variants.
 *
 * @since 0.34.0
 */
export type Tests_Lib_Scaffold_IsWindowsReservedPathSegment_RejectsWindowsDeviceNamesAndNormalizedVariants_Returns = void;

/**
 * Tests - Lib - Scaffold - Prompts Mock Module.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_Prompts_MockModule_Default = ReturnType<typeof vi['fn']>;

export type Tests_Lib_Scaffold_Prompts_MockModule = Readonly<{
  default: Tests_Lib_Scaffold_Prompts_MockModule_Default;
}>;

/**
 * Tests - Lib - Scaffold - Prompt Scaffold Options - Defaults New Monorepo To Named Directory Without Prompting.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_PromptScaffoldOptions_DefaultsNewMonorepoToNamedDirectoryWithoutPrompting_Result = Shared_ScaffoldConfig | undefined;

/**
 * Tests - Lib - Scaffold - Resolve Scaffold Install Invocation - Routes Managers Through Supported Clients.
 *
 * @since 0.31.0
 */
export type Tests_Lib_Scaffold_ResolveScaffoldInstallInvocation_RoutesManagersThroughSupportedClients_Returns = void;

/**
 * Tests - Lib - Scaffold - Resolve Template Answers - Prompts For A Missing Interactive Value.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_ResolveTemplateAnswers_PromptsForAMissingInteractiveValue_Result = Shared_ScaffoldTemplateResolution | undefined;

/**
 * Tests - Lib - Scaffold - Resolve Template Answers - Rejects A Missing Non Interactive Value.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_ResolveTemplateAnswers_RejectsAMissingNonInteractiveValue_Result = Shared_ScaffoldTemplateResolution | undefined;

/**
 * Tests - Lib - Scaffold - Resolve Template Answers - Rejects An Invalid Provided Value.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_ResolveTemplateAnswers_RejectsAnInvalidProvidedValue_Result = Shared_ScaffoldTemplateResolution | undefined;

/**
 * Tests - Lib - Scaffold - Resolve Template Answers - Rejects Values Passed To Boolean Only Flags.
 *
 * @since 0.29.0
 */
export type Tests_Lib_Scaffold_ResolveTemplateAnswers_RejectsValuesPassedToBooleanOnlyFlags_Result = Shared_ScaffoldTemplateResolution | undefined;

/**
 * Tests - Lib - Scaffold - Resolve Template Answers - Resolves Boolean Flags And Active Dependent Choices.
 *
 * @since 0.29.0
 */
export type Tests_Lib_Scaffold_ResolveTemplateAnswers_ResolvesBooleanFlagsAndActiveDependentChoices_Result = Shared_ScaffoldTemplateResolution | undefined;

/**
 * Tests - Lib - Scaffold - Resolve Template Answers - Uses A Valid Non Interactive Value Without Prompting.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_ResolveTemplateAnswers_UsesAValidNonInteractiveValueWithoutPrompting_Result = Shared_ScaffoldTemplateResolution | undefined;

/**
 * Tests - Lib - Scaffold - Resolve Template Answers - Uses Non Interactive Defaults Without Requiring Optional Flags.
 *
 * @since 0.29.0
 */
export type Tests_Lib_Scaffold_ResolveTemplateAnswers_UsesNonInteractiveDefaultsWithoutRequiringOptionalFlags_Result = Shared_ScaffoldTemplateResolution | undefined;

/**
 * Tests - Lib - Scaffold - Workspace Contract - Derives Non Overlapping Environment Prefixes.
 *
 * @since 0.39.0
 */
export type Tests_Lib_Scaffold_WorkspaceContract_DerivesNonOverlappingEnvironmentPrefixes_Returns = Promise<void>;

/**
 * Tests - Lib - Scaffold - Workspace Contract - Derives Role Based Package Names.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_WorkspaceContract_DerivesRoleBasedPackageNames_Returns = void;

/**
 * Tests - Lib - Scaffold - Workspace Contract - Disables PfSense Updates For Non GitHub Repositories.
 *
 * @since 0.39.0
 */
export type Tests_Lib_Scaffold_WorkspaceContract_DisablesPfSenseUpdatesForNonGitHubRepositories_ProjectDirectory = string;

export type Tests_Lib_Scaffold_WorkspaceContract_DisablesPfSenseUpdatesForNonGitHubRepositories_ConfigPath = string;

export type Tests_Lib_Scaffold_WorkspaceContract_DisablesPfSenseUpdatesForNonGitHubRepositories_ResolveReplacements = (workspaceName: string, configRoot: string) => Promise<Map<RegExp, string> | undefined>;

export type Tests_Lib_Scaffold_WorkspaceContract_DisablesPfSenseUpdatesForNonGitHubRepositories_Replacements = Map<RegExp, string> | undefined;

/**
 * Tests - Lib - Scaffold - Workspace Contract - Merges Required Platforms When Registering Workspaces.
 *
 * @since 0.33.0
 */
export type Tests_Lib_Scaffold_WorkspaceContract_MergesRequiredPlatformsWhenRegisteringWorkspaces_ProjectDirectory = string;

export type Tests_Lib_Scaffold_WorkspaceContract_MergesRequiredPlatformsWhenRegisteringWorkspaces_WorkspaceDirectory = string;

export type Tests_Lib_Scaffold_WorkspaceContract_MergesRequiredPlatformsWhenRegisteringWorkspaces_ConfigPath = string;

export type Tests_Lib_Scaffold_WorkspaceContract_MergesRequiredPlatformsWhenRegisteringWorkspaces_ConfigContents = string;

export type Tests_Lib_Scaffold_WorkspaceContract_MergesRequiredPlatformsWhenRegisteringWorkspaces_ConfigRaw = string;

export type Tests_Lib_Scaffold_WorkspaceContract_MergesRequiredPlatformsWhenRegisteringWorkspaces_Config = Record<string, unknown>;

export type Tests_Lib_Scaffold_WorkspaceContract_MergesRequiredPlatformsWhenRegisteringWorkspaces_Project = Record<string, unknown>;

/**
 * Tests - Lib - Scaffold - Workspace Contract - Normalizes Only Workspace Paths Inside The Root.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_WorkspaceContract_NormalizesOnlyWorkspacePathsInsideTheRoot_Returns = void;

/**
 * Tests - Lib - Scaffold - Workspace Contract - Registers A Publish Deploy Target.
 *
 * @since 0.39.0
 */
export type Tests_Lib_Scaffold_WorkspaceContract_RegistersAPublishDeployTarget_ProjectDirectory = string;

export type Tests_Lib_Scaffold_WorkspaceContract_RegistersAPublishDeployTarget_WorkspaceDirectory = string;

export type Tests_Lib_Scaffold_WorkspaceContract_RegistersAPublishDeployTarget_ConfigPath = string;

export type Tests_Lib_Scaffold_WorkspaceContract_RegistersAPublishDeployTarget_ConfigContents = string;

export type Tests_Lib_Scaffold_WorkspaceContract_RegistersAPublishDeployTarget_ConfigRaw = string;

export type Tests_Lib_Scaffold_WorkspaceContract_RegistersAPublishDeployTarget_Config = Record<string, unknown>;

/**
 * Tests - Lib - Scaffold - Workspace Contract - Rejects PfSense Without Author Email.
 *
 * @since 0.39.0
 */

export type Tests_Lib_Scaffold_WorkspaceContract_RejectsPfSenseWithoutAuthorEmail_ProjectDirectory = string;

export type Tests_Lib_Scaffold_WorkspaceContract_RejectsPfSenseWithoutAuthorEmail_ConfigPath = string;

export type Tests_Lib_Scaffold_WorkspaceContract_RejectsPfSenseWithoutAuthorEmail_ResolveReplacements = (workspaceName: string, configRoot: string) => Promise<Map<RegExp, string> | undefined>;

export type Tests_Lib_Scaffold_WorkspaceContract_RejectsPfSenseWithoutAuthorEmail_Result = Map<RegExp, string> | undefined;

/**
 * Tests - Lib - Scaffold - Workspace Contract - Resolves PfSense Project Metadata.
 *
 * @since 0.39.0
 */
export type Tests_Lib_Scaffold_WorkspaceContract_ResolvesPfSenseProjectMetadata_ProjectDirectory = string;

export type Tests_Lib_Scaffold_WorkspaceContract_ResolvesPfSenseProjectMetadata_ConfigPath = string;

export type Tests_Lib_Scaffold_WorkspaceContract_ResolvesPfSenseProjectMetadata_ResolveReplacements = (workspaceName: string, configRoot: string) => Promise<Map<RegExp, string> | undefined>;

export type Tests_Lib_Scaffold_WorkspaceContract_ResolvesPfSenseProjectMetadata_Replacements = Map<RegExp, string> | undefined;
