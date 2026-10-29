import type { PromptObject } from 'prompts';

import type { vi } from 'vitest';

import type {
  Cli_Utility_Configure_Runner_CheckPath_CurrentDirectory,
  Cli_Utility_Configure_Runner_CheckPath_Returns,
  Cli_Utility_Configure_Runner_PromptAgents_Config,
  Cli_Utility_Configure_Runner_PromptAgents_Returns,
  Cli_Utility_Configure_Runner_PromptEnvironment_Config,
  Cli_Utility_Configure_Runner_PromptEnvironment_Returns,
  Cli_Utility_Configure_Runner_PromptEnvironmentReconcile_Config,
  Cli_Utility_Configure_Runner_PromptEnvironmentReconcile_Mutate,
  Cli_Utility_Configure_Runner_PromptEnvironmentReconcile_Returns,
  Cli_Utility_Configure_Runner_PromptFlow_Config,
  Cli_Utility_Configure_Runner_PromptFlow_Returns,
  Cli_Utility_Configure_Runner_PromptGithub_Config,
  Cli_Utility_Configure_Runner_PromptGithub_Returns,
  Cli_Utility_Configure_Runner_PromptGithubActions_Config,
  Cli_Utility_Configure_Runner_PromptGithubActions_Returns,
  Cli_Utility_Configure_Runner_PromptGithubLabels_Config,
  Cli_Utility_Configure_Runner_PromptGithubLabels_Returns,
  Cli_Utility_Configure_Runner_PromptGithubPolicies_Config,
  Cli_Utility_Configure_Runner_PromptGithubPolicies_Returns,
  Cli_Utility_Configure_Runner_PromptGithubRulesets_Config,
  Cli_Utility_Configure_Runner_PromptGithubRulesets_Returns,
  Cli_Utility_Configure_Runner_PromptGithubSecurity_Config,
  Cli_Utility_Configure_Runner_PromptGithubSecurity_Returns,
  Cli_Utility_Configure_Runner_PromptIgnoreFiles_Config,
  Cli_Utility_Configure_Runner_PromptIgnoreFiles_Returns,
  Cli_Utility_Configure_Runner_PromptRecipes_Config,
  Cli_Utility_Configure_Runner_PromptRecipes_Returns,
  Cli_Utility_Configure_Runner_PromptSettings_Config,
  Cli_Utility_Configure_Runner_PromptSettings_Returns,
  Cli_Utility_Configure_Runner_PromptWorkflows_Config,
  Cli_Utility_Configure_Runner_PromptWorkflows_Returns,
  Cli_Utility_Configure_Runner_PromptWorkflowsForm_Returns,
  Cli_Utility_Configure_Runner_PromptWorkspacesForm_Options,
  Cli_Utility_Configure_Runner_PromptWorkspacesForm_Returns,
  Cli_Utility_Configure_Runner_PromptWorkspacesForm_ReturnsApply,
  Cli_Utility_Configure_Runner_PromptWorkspacesForm_ReturnsApply_PackageJsonRecipes,
  Cli_Utility_Configure_Runner_PromptWorkspacesForm_ReturnsApply_Workspace,
  Cli_Utility_Configure_Runner_PromptWorkspacesForm_ReturnsBack,
  Cli_Utility_Configure_Runner_ReadLocalFilledKeys_Config,
  Cli_Utility_Configure_Runner_ReadLocalFilledKeys_Returns,
} from '../../../cli/utility/configure.d.ts';
import type {
  Shared_BlueprintConfig_Workflows,
  Shared_BlueprintConfigWorkflow,
  Shared_NovaConfig,
  Shared_NovaConfig_Github,
  Shared_NovaConfig_Recipes,
  Shared_NovaConfig_Recipes_PackageJsonWorkspace,
  Shared_NovaConfigEnvironmentProject,
  Shared_NovaConfigEnvironmentValue,
  Shared_NovaConfigEnvironmentWorkspace,
} from '../../../shared.d.ts';
import type { Toolkit_Logger_Runner_Customize_Returns } from '../../../toolkit/logger.d.ts';

/**
 * Tests - CLI - Utility - Configure - Config Field Coverage.
 *
 * Converts the complete config contract into a required editor map. Arrays use
 * "$item", while string-keyed records use "$entry" as the representative
 * value shape. Adding a config field therefore breaks the test type-check until
 * the field is assigned to its configure editor.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_Configure_ConfigFieldCoverage_UnionToIntersection<Value> = (
  Value extends unknown ? (input: Value) => void : never
) extends ((input: infer Intersection) => void) ? Intersection : never;

export type Tests_Cli_Utility_Configure_ConfigFieldCoverage_Object<Value> = Extract<NonNullable<Value>, object>;

export type Tests_Cli_Utility_Configure_ConfigFieldCoverage_Intersection<Value> = Tests_Cli_Utility_Configure_ConfigFieldCoverage_UnionToIntersection<Tests_Cli_Utility_Configure_ConfigFieldCoverage_Object<Value>>;

export type Tests_Cli_Utility_Configure_ConfigFieldCoverage_Value<Value, Key extends PropertyKey> = Key extends keyof Tests_Cli_Utility_Configure_ConfigFieldCoverage_Intersection<Value> ? Tests_Cli_Utility_Configure_ConfigFieldCoverage_Intersection<Value>[Key] : never;

export type Tests_Cli_Utility_Configure_ConfigFieldCoverage_Editor =
  'promptAgents'
  | 'promptEmails'
  | 'promptEntities'
  | 'promptEnvironment'
  | 'promptEnvironmentProject'
  | 'promptEnvironmentValueForm'
  | 'promptEnvironmentWorkflow'
  | 'promptEnvironmentWorkspace'
  | 'promptGithub'
  | 'promptGithubActions'
  | 'promptGithubLabels'
  | 'promptGithubPolicies'
  | 'promptGithubRulesets'
  | 'promptGithubSecurity'
  | 'promptGitignore'
  | 'promptIgnoreFileBundles'
  | 'promptMiscellaneousRecipes'
  | 'promptProject'
  | 'promptReadMe'
  | 'promptRecipeEntries'
  | 'promptSettings'
  | 'promptUrls'
  | 'promptWorkflowsForm'
  | 'promptWorkspacesForm';

export type Tests_Cli_Utility_Configure_BuildConfigFieldCoverage<Value> = [NonNullable<Value>] extends [readonly (infer Item)[]]
  ? {
      $item: Tests_Cli_Utility_Configure_BuildConfigFieldCoverage<Item>;
    }
  : [Tests_Cli_Utility_Configure_ConfigFieldCoverage_Object<Value>] extends [never]
      ? Tests_Cli_Utility_Configure_ConfigFieldCoverage_Editor
      : {
          [Key in keyof Required<Tests_Cli_Utility_Configure_ConfigFieldCoverage_Intersection<Value>>]: Tests_Cli_Utility_Configure_BuildConfigFieldCoverage<Tests_Cli_Utility_Configure_ConfigFieldCoverage_Value<Value, Key>>;
        };

export type Tests_Cli_Utility_Configure_ConfigFieldCoverage = Tests_Cli_Utility_Configure_BuildConfigFieldCoverage<Shared_NovaConfig>;

/**
 * Tests - CLI - Utility - Configure - Is Ignore File Path Input.
 *
 * @since 0.34.0
 */
export type Tests_Cli_Utility_Configure_CliUtilityConfigureIsIgnoreFilePathInput_AcceptsRootDockerAndNestedGitOrAssetPaths_Results = (true | string)[];

export type Tests_Cli_Utility_Configure_CliUtilityConfigureIsIgnoreFilePathInput_RejectsAWorkspaceLocalDockerignore_Result = true | string;

/**
 * Tests - CLI - Utility - Configure - Is Non Empty Literal Input - Returns The Error Message For An Empty String.
 *
 * @since 0.18.0
 */
export type Tests_Cli_Utility_Configure_CliUtilityConfigureIsNonEmptyLiteralInput_ReturnsTheErrorMessageForAnEmptyString_Result = true | string;

/**
 * Tests - CLI - Utility - Configure - Is Non Empty Literal Input - Returns The Error Message For Non String Input.
 *
 * @since 0.18.0
 */
export type Tests_Cli_Utility_Configure_CliUtilityConfigureIsNonEmptyLiteralInput_ReturnsTheErrorMessageForNonStringInput_Result = true | string;

/**
 * Tests - CLI - Utility - Configure - Is Non Empty Literal Input - Returns The Error Message For Whitespace Only Input.
 *
 * @since 0.18.0
 */
export type Tests_Cli_Utility_Configure_CliUtilityConfigureIsNonEmptyLiteralInput_ReturnsTheErrorMessageForWhitespaceOnlyInput_Result = true | string;

/**
 * Tests - CLI - Utility - Configure - Is Non Empty Literal Input - Returns True For A Non Empty String.
 *
 * @since 0.18.0
 */
export type Tests_Cli_Utility_Configure_CliUtilityConfigureIsNonEmptyLiteralInput_ReturnsTrueForANonEmptyString_Result = true | string;

/**
 * Tests - CLI - Utility - Configure - Is Optional Workflow Timeout Input - Accepts Blank Input And Whole Numbers From 1 Through 360.
 *
 * @since 0.33.0
 */
export type Tests_Cli_Utility_Configure_CliUtilityConfigureIsOptionalWorkflowTimeoutInput_AcceptsBlankInputAndWholeNumbersFrom1Through360_Result = (true | string)[];

/**
 * Tests - CLI - Utility - Configure - Is Optional Workflow Timeout Input - Rejects Values Outside The Supported GitHub Range.
 *
 * @since 0.33.0
 */
export type Tests_Cli_Utility_Configure_CliUtilityConfigureIsOptionalWorkflowTimeoutInput_RejectsValuesOutsideTheSupportedGitHubRange_Result = (true | string)[];

/**
 * Tests - CLI - Utility - Configure - Run.
 *
 * @since 0.14.0
 */
export type Tests_Cli_Utility_Configure_CliUtilityConfigureRun_OriginalCwd = string;

export type Tests_Cli_Utility_Configure_CliUtilityConfigureRun_TemporaryDirectory = string;

export type Tests_Cli_Utility_Configure_CliUtilityConfigureRun_TemporaryPrefix = string;

export type Tests_Cli_Utility_Configure_CliUtilityConfigureRun_SandboxRoot = string;

/**
 * Tests - CLI - Utility - Configure - Run - Sets Exit Code When Not At Project Root.
 *
 * @since 0.14.0
 */
export type Tests_Cli_Utility_Configure_CliUtilityConfigureRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory = string;

/**
 * Tests - CLI - Utility - Configure - Prompt Agents - Removes The Optional Field When No Tools Are Selected.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_Configure_PromptAgents_RemovesTheOptionalFieldWhenNoToolsAreSelected_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_PromptAgents_RemovesTheOptionalFieldWhenNoToolsAreSelected_PromptAgents = (config: Cli_Utility_Configure_Runner_PromptAgents_Config) => Cli_Utility_Configure_Runner_PromptAgents_Returns;

export type Tests_Cli_Utility_Configure_PromptAgents_RemovesTheOptionalFieldWhenNoToolsAreSelected_Result = Awaited<Cli_Utility_Configure_Runner_PromptAgents_Returns>;

/**
 * Tests - CLI - Utility - Configure - Prompt Environment Section - Adds A Global Secret Value.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_AddsAGlobalSecretValue_Responses = Record<string, unknown>[];

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_AddsAGlobalSecretValue_Next = Record<string, unknown> | undefined;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_AddsAGlobalSecretValue_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_AddsAGlobalSecretValue_PromptEnvironment = (config: Cli_Utility_Configure_Runner_PromptEnvironment_Config) => Cli_Utility_Configure_Runner_PromptEnvironment_Returns;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_AddsAGlobalSecretValue_GlobalVariables = Shared_NovaConfigEnvironmentValue[] | undefined;

/**
 * Tests - CLI - Utility - Configure - Prompt Environment Section - Offers The Repo Root Workspace And Adds Its Namespace.
 *
 * @since 0.22.0
 */
export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Responses = Record<string, unknown>[];

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_CapturedQuestions = PromptObject[];

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Question = PromptObject;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Next = Record<string, unknown> | undefined;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_PromptEnvironment = (config: Cli_Utility_Configure_Runner_PromptEnvironment_Config) => Cli_Utility_Configure_Runner_PromptEnvironment_Returns;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_RootQuestion = PromptObject | undefined;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_RootBlock = Shared_NovaConfigEnvironmentWorkspace | undefined;

/**
 * Tests - CLI - Utility - Configure - Prompt Environment Section - Prompts Before Removing A Value.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Responses = Record<string, unknown>[];

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_CapturedQuestions = PromptObject[];

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Question = PromptObject;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Next = Record<string, unknown> | undefined;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_PromptEnvironment = (config: Cli_Utility_Configure_Runner_PromptEnvironment_Config) => Cli_Utility_Configure_Runner_PromptEnvironment_Returns;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_RemoveQuestion = PromptObject | undefined;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_GlobalBlock = Shared_NovaConfigEnvironmentProject | undefined;

/**
 * Tests - CLI - Utility - Configure - Prompt Environment Section - Rejects Adding A Value When The Namespace Has No Prefix.
 *
 * @since 0.22.0
 */
export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_Responses = Record<string, unknown>[];

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_Next = Record<string, unknown> | undefined;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Debug = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Dev = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Info = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Warn = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Error = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock = {
  debug: Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Debug;
  dev: Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Dev;
  info: Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Info;
  warn: Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Warn;
  error: Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock_Error;
};

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_LoggerCustomizeSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_LoggerCustomizeReturn = Toolkit_Logger_Runner_Customize_Returns;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_PromptEnvironment = (config: Cli_Utility_Configure_Runner_PromptEnvironment_Config) => Cli_Utility_Configure_Runner_PromptEnvironment_Returns;

export type Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_ErrorCalls = unknown[][];

/**
 * Tests - CLI - Utility - Configure - Prompt Flow - Exposes Every Top Level Config Category.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_CapturedQuestions = PromptObject[];

export type Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_Question = PromptObject;

export type Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_Next = Record<string, unknown>;

export type Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_PromptFlow = (config: Cli_Utility_Configure_Runner_PromptFlow_Config) => Cli_Utility_Configure_Runner_PromptFlow_Returns;

export type Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_Result = Awaited<Cli_Utility_Configure_Runner_PromptFlow_Returns>;

export type Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_CategoryQuestion = PromptObject | undefined;

export type Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_ConfiguredChoices = PromptObject['choices'];

export type Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_CategoryChoices = unknown[];

export type Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_Values = unknown[];

/**
 * Tests - CLI - Utility - Configure - Prompt GitHub - Edits Every Basic GitHub Field Without Dropping Focused Sections.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_Responses = Record<string, unknown>[];

export type Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_Next = Record<string, unknown> | undefined;

export type Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_PromptGithub = (config: Cli_Utility_Configure_Runner_PromptGithub_Config) => Cli_Utility_Configure_Runner_PromptGithub_Returns;

export type Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_Result = Awaited<Cli_Utility_Configure_Runner_PromptGithub_Returns>;

export type Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_Github = Shared_NovaConfig_Github | undefined;

export type Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_Recipes = Shared_NovaConfig_Recipes | undefined;

export type Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_GithubRecipes = Shared_NovaConfig_Recipes['github'];

/**
 * Tests - CLI - Utility - Configure - Prompt GitHub Actions - Edits Every Actions Field.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_Configure_PromptGitHubActions_EditsEveryActionsField_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_PromptGitHubActions_EditsEveryActionsField_PromptGithubActions = (config: Cli_Utility_Configure_Runner_PromptGithubActions_Config) => Cli_Utility_Configure_Runner_PromptGithubActions_Returns;

export type Tests_Cli_Utility_Configure_PromptGitHubActions_EditsEveryActionsField_Result = Awaited<Cli_Utility_Configure_Runner_PromptGithubActions_Returns>;

/**
 * Tests - CLI - Utility - Configure - Prompt GitHub Labels - Reorders Labels.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_Configure_PromptGitHubLabels_ReordersLabels_Responses = Record<string, unknown>[];

export type Tests_Cli_Utility_Configure_PromptGitHubLabels_ReordersLabels_Next = Record<string, unknown> | undefined;

export type Tests_Cli_Utility_Configure_PromptGitHubLabels_ReordersLabels_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_PromptGitHubLabels_ReordersLabels_PromptGithubLabels = (config: Cli_Utility_Configure_Runner_PromptGithubLabels_Config) => Cli_Utility_Configure_Runner_PromptGithubLabels_Returns;

export type Tests_Cli_Utility_Configure_PromptGitHubLabels_ReordersLabels_Result = Awaited<Cli_Utility_Configure_Runner_PromptGithubLabels_Returns>;

export type Tests_Cli_Utility_Configure_PromptGitHubLabels_ReordersLabels_Github = Shared_NovaConfig_Github | undefined;

/**
 * Tests - CLI - Utility - Configure - Prompt GitHub Repository Contracts - Edits Every Policy Ruleset And Security Field.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_PromptGithubPolicies = (config: Cli_Utility_Configure_Runner_PromptGithubPolicies_Config) => Cli_Utility_Configure_Runner_PromptGithubPolicies_Returns;

export type Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_PromptGithubRulesets = (config: Cli_Utility_Configure_Runner_PromptGithubRulesets_Config) => Cli_Utility_Configure_Runner_PromptGithubRulesets_Returns;

export type Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_PromptGithubSecurity = (config: Cli_Utility_Configure_Runner_PromptGithubSecurity_Config) => Cli_Utility_Configure_Runner_PromptGithubSecurity_Returns;

export type Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_PoliciesResult = Awaited<Cli_Utility_Configure_Runner_PromptGithubPolicies_Returns>;

export type Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_RulesetsResult = Awaited<Cli_Utility_Configure_Runner_PromptGithubRulesets_Returns>;

export type Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_SecurityResult = Awaited<Cli_Utility_Configure_Runner_PromptGithubSecurity_Returns>;

/**
 * Tests - CLI - Utility - Configure - Prompt GitHub Repository Contracts - Preserves And Unsets Explicit Empty Required Status Checks.
 *
 * @since 0.33.0
 */
export type Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_PreservesAndUnsetsExplicitEmptyRequiredStatusChecks_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_PreservesAndUnsetsExplicitEmptyRequiredStatusChecks_PromptGithubRulesets = (config: Cli_Utility_Configure_Runner_PromptGithubRulesets_Config) => Cli_Utility_Configure_Runner_PromptGithubRulesets_Returns;

export type Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_PreservesAndUnsetsExplicitEmptyRequiredStatusChecks_Result = Awaited<Cli_Utility_Configure_Runner_PromptGithubRulesets_Returns>;

export type Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_PreservesAndUnsetsExplicitEmptyRequiredStatusChecks_PromptCall = readonly [PromptObject | PromptObject[], ...unknown[]] | undefined;

export type Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_PreservesAndUnsetsExplicitEmptyRequiredStatusChecks_Questions = PromptObject | PromptObject[] | undefined;

export type Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_PreservesAndUnsetsExplicitEmptyRequiredStatusChecks_ModeQuestion = PromptObject | undefined;

export type Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_PreservesAndUnsetsExplicitEmptyRequiredStatusChecks_UnsetConfig = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_PreservesAndUnsetsExplicitEmptyRequiredStatusChecks_UnsetResult = Awaited<Cli_Utility_Configure_Runner_PromptGithubRulesets_Returns>;

/**
 * Tests - CLI - Utility - Configure - Prompt Ignore Files - Adds Bundles And Patterns For A Physical Ignore File.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_Configure_PromptIgnoreFiles_AddsBundlesAndPatternsForAPhysicalIgnoreFile_Responses = Record<string, unknown>[];

export type Tests_Cli_Utility_Configure_PromptIgnoreFiles_AddsBundlesAndPatternsForAPhysicalIgnoreFile_Next = Record<string, unknown> | undefined;

export type Tests_Cli_Utility_Configure_PromptIgnoreFiles_AddsBundlesAndPatternsForAPhysicalIgnoreFile_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_PromptIgnoreFiles_AddsBundlesAndPatternsForAPhysicalIgnoreFile_PromptIgnoreFiles = (config: Cli_Utility_Configure_Runner_PromptIgnoreFiles_Config) => Cli_Utility_Configure_Runner_PromptIgnoreFiles_Returns;

export type Tests_Cli_Utility_Configure_PromptIgnoreFiles_AddsBundlesAndPatternsForAPhysicalIgnoreFile_Result = Awaited<Cli_Utility_Configure_Runner_PromptIgnoreFiles_Returns>;

/**
 * Tests - CLI - Utility - Configure - Prompt Recipes - Edits Closed Operating System Cleanup Settings.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_Configure_PromptRecipes_EditsClosedOperatingSystemCleanupSettings_Responses = Record<string, unknown>[];

export type Tests_Cli_Utility_Configure_PromptRecipes_EditsClosedOperatingSystemCleanupSettings_Next = Record<string, unknown> | undefined;

export type Tests_Cli_Utility_Configure_PromptRecipes_EditsClosedOperatingSystemCleanupSettings_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_PromptRecipes_EditsClosedOperatingSystemCleanupSettings_PromptRecipes = (config: Cli_Utility_Configure_Runner_PromptRecipes_Config) => Cli_Utility_Configure_Runner_PromptRecipes_Returns;

export type Tests_Cli_Utility_Configure_PromptRecipes_EditsClosedOperatingSystemCleanupSettings_Result = Awaited<Cli_Utility_Configure_Runner_PromptRecipes_Returns>;

export type Tests_Cli_Utility_Configure_PromptRecipes_EditsClosedOperatingSystemCleanupSettings_Recipes = Shared_NovaConfig_Recipes | undefined;

/**
 * Tests - CLI - Utility - Configure - Prompt Recipes - Edits Nova Config Recipe Toggles.
 *
 * @since 0.33.0
 */
export type Tests_Cli_Utility_Configure_PromptRecipes_EditsNovaConfigRecipeToggles_Responses = Record<string, unknown>[];

export type Tests_Cli_Utility_Configure_PromptRecipes_EditsNovaConfigRecipeToggles_Next = Record<string, unknown> | undefined;

export type Tests_Cli_Utility_Configure_PromptRecipes_EditsNovaConfigRecipeToggles_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_PromptRecipes_EditsNovaConfigRecipeToggles_PromptRecipes = (config: Cli_Utility_Configure_Runner_PromptRecipes_Config) => Cli_Utility_Configure_Runner_PromptRecipes_Returns;

export type Tests_Cli_Utility_Configure_PromptRecipes_EditsNovaConfigRecipeToggles_Result = Awaited<Cli_Utility_Configure_Runner_PromptRecipes_Returns>;

export type Tests_Cli_Utility_Configure_PromptRecipes_EditsNovaConfigRecipeToggles_Recipes = Shared_NovaConfig_Recipes | undefined;

/**
 * Tests - CLI - Utility - Configure - Prompt Recipes - Edits Recipe Settings Without Dropping Other Categories.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_Responses = Record<string, unknown>[];

export type Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_Next = Record<string, unknown> | undefined;

export type Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_PromptRecipes = (config: Cli_Utility_Configure_Runner_PromptRecipes_Config) => Cli_Utility_Configure_Runner_PromptRecipes_Returns;

export type Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_Result = Awaited<Cli_Utility_Configure_Runner_PromptRecipes_Returns>;

export type Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_Recipes = Shared_NovaConfig_Recipes | undefined;

export type Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_GithubRecipes = Shared_NovaConfig_Recipes['github'];

/**
 * Tests - CLI - Utility - Configure - Prompts.
 *
 * @since 0.14.0
 */
export type Tests_Cli_Utility_Configure_Prompts_MockModule_Default = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Configure_Prompts_MockModule = Readonly<{
  default: Tests_Cli_Utility_Configure_Prompts_MockModule_Default;
}>;

/**
 * Tests - CLI - Utility - Configure - Prompt Settings - Locks Version Strategy From Workspace History.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_SandboxRoot = string;

export type Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_WorkspaceDirectory = string;

export type Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_ChangelogPath = string;

export type Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_ChangelogContent = string;

export type Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_CwdSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_PromptSettings = (config: Cli_Utility_Configure_Runner_PromptSettings_Config) => Cli_Utility_Configure_Runner_PromptSettings_Returns;

export type Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_Result = Awaited<Cli_Utility_Configure_Runner_PromptSettings_Returns>;

/**
 * Tests - CLI - Utility - Configure - Prompt Workflows - Does Not Offer Container Targets When Another Workflow Owns The Image.
 *
 * @since 0.34.0
 */
export type Tests_Cli_Utility_Configure_PromptWorkflows_DoesNotOfferContainerTargetsWhenAnotherWorkflowOwnsTheImage_Response = Record<string, unknown>;

export type Tests_Cli_Utility_Configure_PromptWorkflows_DoesNotOfferContainerTargetsWhenAnotherWorkflowOwnsTheImage_Responses = Tests_Cli_Utility_Configure_PromptWorkflows_DoesNotOfferContainerTargetsWhenAnotherWorkflowOwnsTheImage_Response[];

export type Tests_Cli_Utility_Configure_PromptWorkflows_DoesNotOfferContainerTargetsWhenAnotherWorkflowOwnsTheImage_CapturedQuestions = PromptObject[];

export type Tests_Cli_Utility_Configure_PromptWorkflows_DoesNotOfferContainerTargetsWhenAnotherWorkflowOwnsTheImage_QuestionList = PromptObject[];

export type Tests_Cli_Utility_Configure_PromptWorkflows_DoesNotOfferContainerTargetsWhenAnotherWorkflowOwnsTheImage_Next = Tests_Cli_Utility_Configure_PromptWorkflows_DoesNotOfferContainerTargetsWhenAnotherWorkflowOwnsTheImage_Response | undefined;

export type Tests_Cli_Utility_Configure_PromptWorkflows_DoesNotOfferContainerTargetsWhenAnotherWorkflowOwnsTheImage_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_PromptWorkflows_DoesNotOfferContainerTargetsWhenAnotherWorkflowOwnsTheImage_ContainerWorkflow = Shared_BlueprintConfigWorkflow;

export type Tests_Cli_Utility_Configure_PromptWorkflows_DoesNotOfferContainerTargetsWhenAnotherWorkflowOwnsTheImage_Workflow = Shared_BlueprintConfigWorkflow;

export type Tests_Cli_Utility_Configure_PromptWorkflows_DoesNotOfferContainerTargetsWhenAnotherWorkflowOwnsTheImage_PromptWorkflowsForm = (workflow: Shared_BlueprintConfigWorkflow | undefined, mode: 'create' | 'update', workflows: Shared_BlueprintConfigWorkflow[], config: Shared_NovaConfig) => Cli_Utility_Configure_Runner_PromptWorkflowsForm_Returns;

export type Tests_Cli_Utility_Configure_PromptWorkflows_DoesNotOfferContainerTargetsWhenAnotherWorkflowOwnsTheImage_Result = Awaited<Cli_Utility_Configure_Runner_PromptWorkflowsForm_Returns>;

export type Tests_Cli_Utility_Configure_PromptWorkflows_DoesNotOfferContainerTargetsWhenAnotherWorkflowOwnsTheImage_TargetTypeQuestion = PromptObject | undefined;

/**
 * Tests - CLI - Utility - Configure - Prompt Workflows - Keeps Container Identity Target Local While Pages Stay Additive.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Utility_Configure_PromptWorkflows_KeepsContainerIdentityTargetLocalWhilePagesStayAdditive_Response = Record<string, unknown>;

export type Tests_Cli_Utility_Configure_PromptWorkflows_KeepsContainerIdentityTargetLocalWhilePagesStayAdditive_Responses = Tests_Cli_Utility_Configure_PromptWorkflows_KeepsContainerIdentityTargetLocalWhilePagesStayAdditive_Response[];

export type Tests_Cli_Utility_Configure_PromptWorkflows_KeepsContainerIdentityTargetLocalWhilePagesStayAdditive_CapturedQuestions = PromptObject[];

export type Tests_Cli_Utility_Configure_PromptWorkflows_KeepsContainerIdentityTargetLocalWhilePagesStayAdditive_QuestionList = PromptObject[];

export type Tests_Cli_Utility_Configure_PromptWorkflows_KeepsContainerIdentityTargetLocalWhilePagesStayAdditive_Next = Tests_Cli_Utility_Configure_PromptWorkflows_KeepsContainerIdentityTargetLocalWhilePagesStayAdditive_Response | undefined;

export type Tests_Cli_Utility_Configure_PromptWorkflows_KeepsContainerIdentityTargetLocalWhilePagesStayAdditive_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_PromptWorkflows_KeepsContainerIdentityTargetLocalWhilePagesStayAdditive_Workflow = Shared_BlueprintConfigWorkflow;

export type Tests_Cli_Utility_Configure_PromptWorkflows_KeepsContainerIdentityTargetLocalWhilePagesStayAdditive_PromptWorkflowsForm = (workflow: Shared_BlueprintConfigWorkflow | undefined, mode: 'create' | 'update', workflows: Shared_BlueprintConfigWorkflow[], config: Shared_NovaConfig) => Cli_Utility_Configure_Runner_PromptWorkflowsForm_Returns;

export type Tests_Cli_Utility_Configure_PromptWorkflows_KeepsContainerIdentityTargetLocalWhilePagesStayAdditive_Result = Awaited<Cli_Utility_Configure_Runner_PromptWorkflowsForm_Returns>;

export type Tests_Cli_Utility_Configure_PromptWorkflows_KeepsContainerIdentityTargetLocalWhilePagesStayAdditive_TargetWorkingDirQuestions = PromptObject[];

export type Tests_Cli_Utility_Configure_PromptWorkflows_KeepsContainerIdentityTargetLocalWhilePagesStayAdditive_TargetTypeQuestions = PromptObject[];

export type Tests_Cli_Utility_Configure_PromptWorkflows_KeepsContainerIdentityTargetLocalWhilePagesStayAdditive_ScopesQuestion = PromptObject | undefined;

/**
 * Tests - CLI - Utility - Configure - Prompt Workflows - Preserves Workflow Run Trigger Objects When Syncing Existing Workflows.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Utility_Configure_PromptWorkflows_PreservesWorkflowRunTriggerObjectsWhenSyncingExistingWorkflows_Responses = Record<string, unknown>[];

export type Tests_Cli_Utility_Configure_PromptWorkflows_PreservesWorkflowRunTriggerObjectsWhenSyncingExistingWorkflows_Next = Record<string, unknown> | undefined;

export type Tests_Cli_Utility_Configure_PromptWorkflows_PreservesWorkflowRunTriggerObjectsWhenSyncingExistingWorkflows_Config_Workflows = Shared_BlueprintConfig_Workflows;

export type Tests_Cli_Utility_Configure_PromptWorkflows_PreservesWorkflowRunTriggerObjectsWhenSyncingExistingWorkflows_Config = {
  workflows?: Tests_Cli_Utility_Configure_PromptWorkflows_PreservesWorkflowRunTriggerObjectsWhenSyncingExistingWorkflows_Config_Workflows;
};

export type Tests_Cli_Utility_Configure_PromptWorkflows_PreservesWorkflowRunTriggerObjectsWhenSyncingExistingWorkflows_PromptWorkflows = (config: Cli_Utility_Configure_Runner_PromptWorkflows_Config) => Cli_Utility_Configure_Runner_PromptWorkflows_Returns;

export type Tests_Cli_Utility_Configure_PromptWorkflows_PreservesWorkflowRunTriggerObjectsWhenSyncingExistingWorkflows_Result = Awaited<Cli_Utility_Configure_Runner_PromptWorkflows_Returns>;

/**
 * Tests - CLI - Utility - Configure - Prompt Workspaces Form - Builds The Workspace From Role, Policy, Name, And Recipe Selection.
 *
 * @since 0.22.0
 */
export type Tests_Cli_Utility_Configure_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_Responses = Record<string, unknown>[];

export type Tests_Cli_Utility_Configure_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_Next = Record<string, unknown> | undefined;

export type Tests_Cli_Utility_Configure_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_PromptWorkspacesForm = (options: Cli_Utility_Configure_Runner_PromptWorkspacesForm_Options) => Cli_Utility_Configure_Runner_PromptWorkspacesForm_Returns;

export type Tests_Cli_Utility_Configure_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_FormResult = Cli_Utility_Configure_Runner_PromptWorkspacesForm_ReturnsApply | Cli_Utility_Configure_Runner_PromptWorkspacesForm_ReturnsBack;

export type Tests_Cli_Utility_Configure_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_Workspace = Cli_Utility_Configure_Runner_PromptWorkspacesForm_ReturnsApply_Workspace | undefined;

export type Tests_Cli_Utility_Configure_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_PackageJsonRecipes = Cli_Utility_Configure_Runner_PromptWorkspacesForm_ReturnsApply_PackageJsonRecipes | undefined;

/**
 * Tests - CLI - Utility - Configure - Prompt Workspaces Form - Offers And Preserves Display Name For An Enabled Sync Identity Workspace.
 *
 * @since 0.22.0
 */
export type Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Responses = Record<string, unknown>[];

export type Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_CapturedQuestions = PromptObject[];

export type Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Question = PromptObject;

export type Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Next = Record<string, unknown> | undefined;

export type Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_ExistingPackageJsonRecipes = Shared_NovaConfig_Recipes_PackageJsonWorkspace;

export type Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_PromptWorkspacesForm = (options: Cli_Utility_Configure_Runner_PromptWorkspacesForm_Options) => Cli_Utility_Configure_Runner_PromptWorkspacesForm_Returns;

export type Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_FormResult = Cli_Utility_Configure_Runner_PromptWorkspacesForm_ReturnsApply | Cli_Utility_Configure_Runner_PromptWorkspacesForm_ReturnsBack;

export type Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_PackageJsonRecipes = Cli_Utility_Configure_Runner_PromptWorkspacesForm_ReturnsApply_PackageJsonRecipes | undefined;

export type Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_IdentityQuestion = PromptObject | undefined;

/**
 * Tests - CLI - Utility - Configure - Read Local Filled Keys - Returns Only Genuinely Filled Keys.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_SandboxRoot = string;

export type Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_AppDirectory = string;

export type Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_EnvContents = string;

export type Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_CwdSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_ReadLocalFilledKeys = (config: Cli_Utility_Configure_Runner_ReadLocalFilledKeys_Config) => Cli_Utility_Configure_Runner_ReadLocalFilledKeys_Returns;

export type Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_Filled = {
  [key: string]: string[];
};

/**
 * Tests - CLI - Utility - Configure - Reconcile Stub Notice - Lists The Created Placeholder Stubs And Tells The User To Set Real Values.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_ReadSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_ApplySpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Debug = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Dev = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Info = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Warn = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Error = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock = {
  debug: Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Debug;
  dev: Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Dev;
  info: Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Info;
  warn: Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Warn;
  error: Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock_Error;
};

export type Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_LoggerCustomizeSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_LoggerCustomizeReturn = Toolkit_Logger_Runner_Customize_Returns;

export type Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_PromptEnvironmentReconcile = (config: Cli_Utility_Configure_Runner_PromptEnvironmentReconcile_Config, mutate: Cli_Utility_Configure_Runner_PromptEnvironmentReconcile_Mutate) => Cli_Utility_Configure_Runner_PromptEnvironmentReconcile_Returns;

export type Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_WarnCalls = unknown[][];

/**
 * Tests - CLI - Utility - Configure - Standalone Environment Status - Runs The Status Computation Without Entering The Interactive Flow.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_Config = Shared_NovaConfig;

export type Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_Runner = unknown;

export type Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_CheckPathTarget_CheckPath = (currentDirectory: Cli_Utility_Configure_Runner_CheckPath_CurrentDirectory) => Cli_Utility_Configure_Runner_CheckPath_Returns;

export type Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_CheckPathTarget = {
  checkPath: Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_CheckPathTarget_CheckPath;
};

export type Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_CheckPathSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_LoadSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_SaveSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_ReadSpy = ReturnType<typeof vi['spyOn']>;
