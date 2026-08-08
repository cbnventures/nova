import type { PromptObject } from 'prompts';

import type { vi } from 'vitest';

import type {
  Cli_Utility_Initialize_Runner_CheckPath_CurrentDirectory,
  Cli_Utility_Initialize_Runner_CheckPath_Returns,
  Cli_Utility_Initialize_Runner_PromptEnvironment_Config,
  Cli_Utility_Initialize_Runner_PromptEnvironment_Returns,
  Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_Config,
  Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_Mutate,
  Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_Returns,
  Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options,
  Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Returns,
  Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply,
  Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply_PackageJsonRecipes,
  Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply_Workspace,
  Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsBack,
  Cli_Utility_Initialize_Runner_ReadLocalFilledKeys_Config,
  Cli_Utility_Initialize_Runner_ReadLocalFilledKeys_Returns,
} from '../../../cli/utility/initialize.d.ts';
import type {
  Shared_NovaConfig,
  Shared_NovaConfig_Recipes_PackageJsonWorkspace,
  Shared_NovaConfigEnvironmentProject,
  Shared_NovaConfigEnvironmentValue,
  Shared_NovaConfigEnvironmentWorkspace,
} from '../../../shared.d.ts';
import type { Toolkit_Logger_Runner_Customize_Returns } from '../../../toolkit/logger.d.ts';

/**
 * Tests - CLI - Utility - Initialize - Is Non Empty Literal Input - Returns The Error Message For An Empty String.
 *
 * @since 0.18.0
 */
export type Tests_Cli_Utility_Initialize_CliUtilityInitializeIsNonEmptyLiteralInput_ReturnsTheErrorMessageForAnEmptyString_Result = true | string;

/**
 * Tests - CLI - Utility - Initialize - Is Non Empty Literal Input - Returns The Error Message For Non String Input.
 *
 * @since 0.18.0
 */
export type Tests_Cli_Utility_Initialize_CliUtilityInitializeIsNonEmptyLiteralInput_ReturnsTheErrorMessageForNonStringInput_Result = true | string;

/**
 * Tests - CLI - Utility - Initialize - Is Non Empty Literal Input - Returns The Error Message For Whitespace Only Input.
 *
 * @since 0.18.0
 */
export type Tests_Cli_Utility_Initialize_CliUtilityInitializeIsNonEmptyLiteralInput_ReturnsTheErrorMessageForWhitespaceOnlyInput_Result = true | string;

/**
 * Tests - CLI - Utility - Initialize - Is Non Empty Literal Input - Returns True For A Non Empty String.
 *
 * @since 0.18.0
 */
export type Tests_Cli_Utility_Initialize_CliUtilityInitializeIsNonEmptyLiteralInput_ReturnsTrueForANonEmptyString_Result = true | string;

/**
 * Tests - CLI - Utility - Initialize - Run.
 *
 * @since 0.14.0
 */
export type Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_OriginalCwd = string;

export type Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_TemporaryDirectory = string;

export type Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_TemporaryPrefix = string;

export type Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_SandboxRoot = string;

/**
 * Tests - CLI - Utility - Initialize - Run - Sets Exit Code When Not At Project Root.
 *
 * @since 0.14.0
 */
export type Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory = string;

/**
 * Tests - CLI - Utility - Initialize - Prompt Environment Section - Adds A Global Secret Value.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_AddsAGlobalSecretValue_Responses = Record<string, unknown>[];

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_AddsAGlobalSecretValue_Next = Record<string, unknown> | undefined;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_AddsAGlobalSecretValue_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_AddsAGlobalSecretValue_PromptEnvironment = (config: Cli_Utility_Initialize_Runner_PromptEnvironment_Config) => Cli_Utility_Initialize_Runner_PromptEnvironment_Returns;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_AddsAGlobalSecretValue_GlobalVariables = Shared_NovaConfigEnvironmentValue[] | undefined;

/**
 * Tests - CLI - Utility - Initialize - Prompt Environment Section - Offers The Repo Root Workspace And Adds Its Namespace.
 *
 * @since 0.22.0
 */
export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Responses = Record<string, unknown>[];

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_CapturedQuestions = PromptObject[];

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Question = PromptObject;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Next = Record<string, unknown> | undefined;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_PromptEnvironment = (config: Cli_Utility_Initialize_Runner_PromptEnvironment_Config) => Cli_Utility_Initialize_Runner_PromptEnvironment_Returns;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_RootQuestion = PromptObject | undefined;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_RootBlock = Shared_NovaConfigEnvironmentWorkspace | undefined;

/**
 * Tests - CLI - Utility - Initialize - Prompt Environment Section - Prompts Before Removing A Value.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Responses = Record<string, unknown>[];

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_CapturedQuestions = PromptObject[];

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Question = PromptObject;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Next = Record<string, unknown> | undefined;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_PromptEnvironment = (config: Cli_Utility_Initialize_Runner_PromptEnvironment_Config) => Cli_Utility_Initialize_Runner_PromptEnvironment_Returns;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_RemoveQuestion = PromptObject | undefined;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_GlobalBlock = Shared_NovaConfigEnvironmentProject | undefined;

/**
 * Tests - CLI - Utility - Initialize - Prompt Environment Section - Rejects Adding A Value When The Namespace Has No Prefix.
 *
 * @since 0.22.0
 */
export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_Responses = Record<string, unknown>[];

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_Next = Record<string, unknown> | undefined;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Debug = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Dev = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Info = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Warn = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Error = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock = {
  debug: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Debug;
  dev: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Dev;
  info: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Info;
  warn: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Warn;
  error: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Error;
};

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_LoggerCustomizeSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_LoggerCustomizeReturn = Toolkit_Logger_Runner_Customize_Returns;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_PromptEnvironment = (config: Cli_Utility_Initialize_Runner_PromptEnvironment_Config) => Cli_Utility_Initialize_Runner_PromptEnvironment_Returns;

export type Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_ErrorCalls = unknown[][];

/**
 * Tests - CLI - Utility - Initialize - Prompts.
 *
 * @since 0.14.0
 */
export type Tests_Cli_Utility_Initialize_Prompts_MockModule_Default = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Initialize_Prompts_MockModule = Readonly<{
  default: Tests_Cli_Utility_Initialize_Prompts_MockModule_Default;
}>;

/**
 * Tests - CLI - Utility - Initialize - Prompt Workspaces Form - Builds The Workspace From Role, Policy, Name, And Recipe Selection.
 *
 * @since 0.22.0
 */
export type Tests_Cli_Utility_Initialize_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_Responses = Record<string, unknown>[];

export type Tests_Cli_Utility_Initialize_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_Next = Record<string, unknown> | undefined;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_PromptWorkspacesForm = (options: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options) => Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Returns;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_FormResult = Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply | Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsBack;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_Workspace = Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply_Workspace | undefined;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_PackageJsonRecipes = Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply_PackageJsonRecipes | undefined;

/**
 * Tests - CLI - Utility - Initialize - Prompt Workspaces Form - Offers And Preserves Display Name For An Enabled Sync Identity Workspace.
 *
 * @since 0.22.0
 */
export type Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Responses = Record<string, unknown>[];

export type Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_CapturedQuestions = PromptObject[];

export type Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Question = PromptObject;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Next = Record<string, unknown> | undefined;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_ExistingPackageJsonRecipes = Shared_NovaConfig_Recipes_PackageJsonWorkspace;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_PromptWorkspacesForm = (options: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options) => Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Returns;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_FormResult = Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply | Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsBack;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_PackageJsonRecipes = Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply_PackageJsonRecipes | undefined;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_IdentityQuestion = PromptObject | undefined;

/**
 * Tests - CLI - Utility - Initialize - Read Local Filled Keys - Returns Only Genuinely Filled Keys.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_SandboxRoot = string;

export type Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_AppDirectory = string;

export type Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_EnvContents = string;

export type Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_CwdSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_ReadLocalFilledKeys = (config: Cli_Utility_Initialize_Runner_ReadLocalFilledKeys_Config) => Cli_Utility_Initialize_Runner_ReadLocalFilledKeys_Returns;

export type Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_Filled = {
  [key: string]: string[];
};

/**
 * Tests - CLI - Utility - Initialize - Reconcile Stub Notice - Lists The Created Placeholder Stubs And Tells The User To Set Real Values.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_ReadSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_ApplySpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Debug = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Dev = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Info = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Warn = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Error = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock = {
  debug: Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Debug;
  dev: Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Dev;
  info: Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Info;
  warn: Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Warn;
  error: Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Error;
};

export type Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_LoggerCustomizeSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_LoggerCustomizeReturn = Toolkit_Logger_Runner_Customize_Returns;

export type Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_PromptEnvironmentReconcile = (config: Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_Config, mutate: Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_Mutate) => Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_Returns;

export type Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_WarnCalls = unknown[][];

/**
 * Tests - CLI - Utility - Initialize - Standalone Environment Status - Runs The Status Computation Without Entering The Interactive Flow.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_Runner = unknown;

export type Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_CheckPathTarget_CheckPath = (currentDirectory: Cli_Utility_Initialize_Runner_CheckPath_CurrentDirectory) => Cli_Utility_Initialize_Runner_CheckPath_Returns;

export type Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_CheckPathTarget = {
  checkPath: Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_CheckPathTarget_CheckPath;
};

export type Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_CheckPathSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_LoadSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_SaveSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_ReadSpy = ReturnType<typeof vi['spyOn']>;
