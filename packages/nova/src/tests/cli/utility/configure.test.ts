import { deepStrictEqual, ok, strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import prompts from 'prompts';
import {
  afterAll,
  beforeEach,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliUtilityConfigure } from '../../../cli/utility/configure.js';
import { libEnvGithub } from '../../../lib/env-github.js';
import { libEnvReconcile } from '../../../lib/env-reconcile.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import * as toolkit from '../../../toolkit/index.js';

import type {
  Tests_Cli_Utility_Configure_CliUtilityConfigureIsNonEmptyLiteralInput_ReturnsTheErrorMessageForAnEmptyString_Result,
  Tests_Cli_Utility_Configure_CliUtilityConfigureIsNonEmptyLiteralInput_ReturnsTheErrorMessageForNonStringInput_Result,
  Tests_Cli_Utility_Configure_CliUtilityConfigureIsNonEmptyLiteralInput_ReturnsTheErrorMessageForWhitespaceOnlyInput_Result,
  Tests_Cli_Utility_Configure_CliUtilityConfigureIsNonEmptyLiteralInput_ReturnsTrueForANonEmptyString_Result,
  Tests_Cli_Utility_Configure_CliUtilityConfigureRun_OriginalCwd,
  Tests_Cli_Utility_Configure_CliUtilityConfigureRun_SandboxRoot,
  Tests_Cli_Utility_Configure_CliUtilityConfigureRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory,
  Tests_Cli_Utility_Configure_CliUtilityConfigureRun_TemporaryDirectory,
  Tests_Cli_Utility_Configure_CliUtilityConfigureRun_TemporaryPrefix,
  Tests_Cli_Utility_Configure_ConfigFieldCoverage,
  Tests_Cli_Utility_Configure_PromptAgents_RemovesTheOptionalFieldWhenNoToolsAreSelected_Config,
  Tests_Cli_Utility_Configure_PromptAgents_RemovesTheOptionalFieldWhenNoToolsAreSelected_PromptAgents,
  Tests_Cli_Utility_Configure_PromptAgents_RemovesTheOptionalFieldWhenNoToolsAreSelected_Result,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_AddsAGlobalSecretValue_Config,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_AddsAGlobalSecretValue_GlobalVariables,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_AddsAGlobalSecretValue_Next,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_AddsAGlobalSecretValue_PromptEnvironment,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_AddsAGlobalSecretValue_Responses,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_CapturedQuestions,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Config,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Next,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_PromptEnvironment,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Question,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Responses,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_RootBlock,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_RootQuestion,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_CapturedQuestions,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Config,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_GlobalBlock,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Next,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_PromptEnvironment,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Question,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_RemoveQuestion,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Responses,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_Config,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_ErrorCalls,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_LoggerCustomizeReturn,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_LoggerCustomizeSpy,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_Next,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_PromptEnvironment,
  Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_Responses,
  Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_CapturedQuestions,
  Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_CategoryChoices,
  Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_CategoryQuestion,
  Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_Config,
  Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_ConfiguredChoices,
  Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_Next,
  Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_PromptFlow,
  Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_Question,
  Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_Result,
  Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_Values,
  Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_Config,
  Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_Github,
  Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_GithubRecipes,
  Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_Next,
  Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_PromptGithub,
  Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_Recipes,
  Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_Responses,
  Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_Result,
  Tests_Cli_Utility_Configure_PromptGitHubActions_EditsEveryActionsField_Config,
  Tests_Cli_Utility_Configure_PromptGitHubActions_EditsEveryActionsField_PromptGithubActions,
  Tests_Cli_Utility_Configure_PromptGitHubActions_EditsEveryActionsField_Result,
  Tests_Cli_Utility_Configure_PromptGitHubLabels_ReordersLabels_Config,
  Tests_Cli_Utility_Configure_PromptGitHubLabels_ReordersLabels_Github,
  Tests_Cli_Utility_Configure_PromptGitHubLabels_ReordersLabels_Next,
  Tests_Cli_Utility_Configure_PromptGitHubLabels_ReordersLabels_PromptGithubLabels,
  Tests_Cli_Utility_Configure_PromptGitHubLabels_ReordersLabels_Responses,
  Tests_Cli_Utility_Configure_PromptGitHubLabels_ReordersLabels_Result,
  Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_Config,
  Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_PoliciesResult,
  Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_PromptGithubPolicies,
  Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_PromptGithubRulesets,
  Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_PromptGithubSecurity,
  Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_RulesetsResult,
  Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_SecurityResult,
  Tests_Cli_Utility_Configure_PromptIgnoreFiles_AddsBundlesAndPatternsForAPhysicalIgnoreFile_Config,
  Tests_Cli_Utility_Configure_PromptIgnoreFiles_AddsBundlesAndPatternsForAPhysicalIgnoreFile_Next,
  Tests_Cli_Utility_Configure_PromptIgnoreFiles_AddsBundlesAndPatternsForAPhysicalIgnoreFile_PromptIgnoreFiles,
  Tests_Cli_Utility_Configure_PromptIgnoreFiles_AddsBundlesAndPatternsForAPhysicalIgnoreFile_Responses,
  Tests_Cli_Utility_Configure_PromptIgnoreFiles_AddsBundlesAndPatternsForAPhysicalIgnoreFile_Result,
  Tests_Cli_Utility_Configure_PromptRecipes_EditsClosedOperatingSystemCleanupSettings_Config,
  Tests_Cli_Utility_Configure_PromptRecipes_EditsClosedOperatingSystemCleanupSettings_Next,
  Tests_Cli_Utility_Configure_PromptRecipes_EditsClosedOperatingSystemCleanupSettings_PromptRecipes,
  Tests_Cli_Utility_Configure_PromptRecipes_EditsClosedOperatingSystemCleanupSettings_Recipes,
  Tests_Cli_Utility_Configure_PromptRecipes_EditsClosedOperatingSystemCleanupSettings_Responses,
  Tests_Cli_Utility_Configure_PromptRecipes_EditsClosedOperatingSystemCleanupSettings_Result,
  Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_Config,
  Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_GithubRecipes,
  Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_Next,
  Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_PromptRecipes,
  Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_Recipes,
  Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_Responses,
  Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_Result,
  Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_ChangelogContent,
  Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_ChangelogPath,
  Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_Config,
  Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_CwdSpy,
  Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_PromptSettings,
  Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_Result,
  Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_SandboxRoot,
  Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_WorkspaceDirectory,
  Tests_Cli_Utility_Configure_PromptWorkflows_PreservesWorkflowRunTriggerObjectsWhenSyncingExistingWorkflows_Config,
  Tests_Cli_Utility_Configure_PromptWorkflows_PreservesWorkflowRunTriggerObjectsWhenSyncingExistingWorkflows_Next,
  Tests_Cli_Utility_Configure_PromptWorkflows_PreservesWorkflowRunTriggerObjectsWhenSyncingExistingWorkflows_PromptWorkflows,
  Tests_Cli_Utility_Configure_PromptWorkflows_PreservesWorkflowRunTriggerObjectsWhenSyncingExistingWorkflows_Responses,
  Tests_Cli_Utility_Configure_PromptWorkflows_PreservesWorkflowRunTriggerObjectsWhenSyncingExistingWorkflows_Result,
  Tests_Cli_Utility_Configure_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_FormResult,
  Tests_Cli_Utility_Configure_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_Next,
  Tests_Cli_Utility_Configure_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_PackageJsonRecipes,
  Tests_Cli_Utility_Configure_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_PromptWorkspacesForm,
  Tests_Cli_Utility_Configure_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_Responses,
  Tests_Cli_Utility_Configure_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_Workspace,
  Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_CapturedQuestions,
  Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_ExistingPackageJsonRecipes,
  Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_FormResult,
  Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_IdentityQuestion,
  Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Next,
  Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_PackageJsonRecipes,
  Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_PromptWorkspacesForm,
  Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Question,
  Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Responses,
  Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_AppDirectory,
  Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_Config,
  Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_CwdSpy,
  Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_EnvContents,
  Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_Filled,
  Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_ReadLocalFilledKeys,
  Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_SandboxRoot,
  Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_ApplySpy,
  Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_Config,
  Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock,
  Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_LoggerCustomizeReturn,
  Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_LoggerCustomizeSpy,
  Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_PromptEnvironmentReconcile,
  Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_ReadSpy,
  Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_WarnCalls,
  Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_CheckPathSpy,
  Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_CheckPathTarget,
  Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_Config,
  Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_LoadSpy,
  Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_ReadSpy,
  Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_Runner,
  Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_SaveSpy,
} from '../../../types/tests/cli/utility/configure.test.d.ts';

vi.mock('prompts', () => {
  return {
    default: vi.fn(),
  };
});

/**
 * Tests - CLI - Utility - Configure - Config Field Coverage.
 *
 * Assigns every config field to the configure editor that owns it. The mapped
 * type makes additions to Shared_NovaConfig fail the test type-check until this
 * contract and the corresponding editor are updated.
 *
 * @since 0.32.0
 */
const configFieldCoverage: Tests_Cli_Utility_Configure_ConfigFieldCoverage = {
  project: {
    name: {
      slug: 'promptProject',
      title: 'promptProject',
    },
    description: {
      short: 'promptProject',
      long: 'promptProject',
    },
    keywords: { $item: 'promptProject' },
    legalName: 'promptProject',
    pronouns: 'promptProject',
    platforms: { $item: 'promptProject' },
    startingYear: 'promptProject',
    license: 'promptProject',
  },
  entities: {
    $item: {
      name: 'promptEntities',
      email: 'promptEntities',
      url: 'promptEntities',
      roles: { $item: 'promptEntities' },
    },
  },
  emails: {
    bugs: 'promptEmails',
  },
  github: {
    owner: 'promptGithub',
    repo: 'promptGithub',
    topics: { $item: 'promptGithub' },
    features: {
      issues: 'promptGithub',
      wiki: 'promptGithub',
      projects: 'promptGithub',
      discussions: 'promptGithub',
      sponsorships: 'promptGithub',
    },
    policies: {
      visibility: 'promptGithubPolicies',
      defaultBranch: 'promptGithubPolicies',
      mergeMethods: {
        merge: 'promptGithubPolicies',
        squash: 'promptGithubPolicies',
        rebase: 'promptGithubPolicies',
      },
      mergeCommit: {
        title: 'promptGithubPolicies',
        message: 'promptGithubPolicies',
      },
      squashMerge: {
        title: 'promptGithubPolicies',
        message: 'promptGithubPolicies',
      },
      autoDeleteHeadBranch: 'promptGithubPolicies',
      autoMerge: 'promptGithubPolicies',
      allowUpdateBranch: 'promptGithubPolicies',
      webCommitSignoffRequired: 'promptGithubPolicies',
    },
    security: {
      vulnerabilityAlerts: 'promptGithubSecurity',
      dependabotSecurityUpdates: 'promptGithubSecurity',
      secretScanning: 'promptGithubSecurity',
      pushProtection: 'promptGithubSecurity',
    },
    rulesets: {
      defaultBranch: {
        enforcement: 'promptGithubRulesets',
        blockDeletions: 'promptGithubRulesets',
        blockForcePushes: 'promptGithubRulesets',
        requireLinearHistory: 'promptGithubRulesets',
        requireSignedCommits: 'promptGithubRulesets',
        requirePullRequest: 'promptGithubRulesets',
        allowedMergeMethods: { $item: 'promptGithubRulesets' },
        dismissStaleReviews: 'promptGithubRulesets',
        requireCodeOwnerReview: 'promptGithubRulesets',
        requireLastPushApproval: 'promptGithubRulesets',
        requiredApprovals: 'promptGithubRulesets',
        requireConversationResolution: 'promptGithubRulesets',
        requiredStatusChecks: { $item: 'promptGithubRulesets' },
        requireBranchesToBeUpToDate: 'promptGithubRulesets',
      },
    },
    actions: {
      enabled: 'promptGithubActions',
      allowedActions: 'promptGithubActions',
      shaPinningRequired: 'promptGithubActions',
      selectedActions: {
        githubOwned: 'promptGithubActions',
        verified: 'promptGithubActions',
        patterns: { $item: 'promptGithubActions' },
      },
      defaultWorkflowPermissions: 'promptGithubActions',
      canApprovePullRequestReviews: 'promptGithubActions',
      artifactRetentionDays: 'promptGithubActions',
    },
    labels: {
      $item: {
        name: 'promptGithubLabels',
        color: 'promptGithubLabels',
        description: 'promptGithubLabels',
      },
    },
    issueTemplate: {
      bugReportFields: { $item: 'promptGithub' },
    },
  },
  workflows: {
    $item: {
      template: 'promptWorkflowsForm',
      name: 'promptWorkflowsForm',
      triggers: {
        $item: {
          name: 'promptWorkflowsForm',
          branches: { $item: 'promptWorkflowsForm' },
          paths: { $item: 'promptWorkflowsForm' },
          tags: { $item: 'promptWorkflowsForm' },
          workflows: { $item: 'promptWorkflowsForm' },
        },
      },
      build: { $item: 'promptWorkflowsForm' },
      deploy: {
        $item: {
          to: 'promptWorkflowsForm',
          path: 'promptWorkflowsForm',
          after: { $item: 'promptWorkflowsForm' },
          with: { $entry: 'promptWorkflowsForm' },
        },
      },
      with: { $entry: 'promptWorkflowsForm' },
    },
  },
  urls: {
    homepage: 'promptUrls',
    repository: 'promptUrls',
    bugs: 'promptUrls',
    license: 'promptUrls',
    logo: 'promptUrls',
    docker: 'promptUrls',
    documentation: 'promptUrls',
    npm: 'promptUrls',
    fundSources: { $item: 'promptUrls' },
    privacyPolicy: 'promptUrls',
    termsOfUse: 'promptUrls',
  },
  readme: {
    badges: { $item: 'promptReadMe' },
  },
  workspaces: {
    $entry: {
      name: 'promptWorkspacesForm',
      role: 'promptWorkspacesForm',
      policy: 'promptWorkspacesForm',
    },
  },
  ignoreFiles: {
    $entry: {
      bundles: { $item: 'promptIgnoreFileBundles' },
      patterns: { $item: 'promptGitignore' },
    },
  },
  agents: { $item: 'promptAgents' },
  recipes: {
    'github': {
      'sync-actions': {
        enabled: 'promptRecipeEntries',
        settings: { $entry: 'promptRecipeEntries' },
      },
      'sync-features': {
        enabled: 'promptRecipeEntries',
        settings: { $entry: 'promptRecipeEntries' },
      },
      'sync-identity': {
        enabled: 'promptRecipeEntries',
        settings: { $entry: 'promptRecipeEntries' },
      },
      'sync-labels': {
        enabled: 'promptRecipeEntries',
        settings: { $entry: 'promptRecipeEntries' },
      },
      'sync-policies': {
        enabled: 'promptRecipeEntries',
        settings: { $entry: 'promptRecipeEntries' },
      },
      'sync-rulesets': {
        enabled: 'promptRecipeEntries',
        settings: { $entry: 'promptRecipeEntries' },
      },
      'sync-security': {
        enabled: 'promptRecipeEntries',
        settings: { $entry: 'promptRecipeEntries' },
      },
    },
    'license': {
      'update-copyright': {
        enabled: 'promptRecipeEntries',
        settings: { $entry: 'promptRecipeEntries' },
      },
    },
    'miscellaneous': {
      'remove-operating-system-files': {
        enabled: 'promptMiscellaneousRecipes',
        settings: {
          linux: {},
          macos: {
            appleDouble: 'promptMiscellaneousRecipes',
            desktopServicesStore: 'promptMiscellaneousRecipes',
          },
          windows: {
            enhancedThumbnailDatabase: 'promptMiscellaneousRecipes',
            enhancedVistaThumbnailDatabase: 'promptMiscellaneousRecipes',
            thumbnailDatabase: 'promptMiscellaneousRecipes',
          },
        },
      },
    },
    'read-me': {
      'update-badges': {
        enabled: 'promptRecipeEntries',
        settings: { $entry: 'promptRecipeEntries' },
      },
      'update-credits': {
        enabled: 'promptRecipeEntries',
        settings: { $entry: 'promptRecipeEntries' },
      },
      'update-documentation': {
        enabled: 'promptRecipeEntries',
        settings: { $entry: 'promptRecipeEntries' },
      },
      'update-header': {
        enabled: 'promptRecipeEntries',
        settings: { $entry: 'promptRecipeEntries' },
      },
      'update-introduction': {
        enabled: 'promptRecipeEntries',
        settings: { $entry: 'promptRecipeEntries' },
      },
    },
    'package-json': {
      $entry: {
        'cleanup': {
          enabled: 'promptRecipeEntries',
          settings: { $entry: 'promptRecipeEntries' },
        },
        'normalize-artifacts': {
          enabled: 'promptRecipeEntries',
          settings: { $entry: 'promptRecipeEntries' },
        },
        'normalize-bundler': {
          enabled: 'promptRecipeEntries',
          settings: { $entry: 'promptRecipeEntries' },
        },
        'normalize-dependencies': {
          enabled: 'promptRecipeEntries',
          settings: { $entry: 'promptRecipeEntries' },
        },
        'normalize-modules': {
          enabled: 'promptRecipeEntries',
          settings: { $entry: 'promptRecipeEntries' },
        },
        'normalize-tooling': {
          enabled: 'promptRecipeEntries',
          settings: { $entry: 'promptRecipeEntries' },
        },
        'sync-environment': {
          enabled: 'promptRecipeEntries',
          settings: { $entry: 'promptRecipeEntries' },
        },
        'sync-identity': {
          enabled: 'promptRecipeEntries',
          settings: { $entry: 'promptRecipeEntries' },
        },
        'sync-ownership': {
          enabled: 'promptRecipeEntries',
          settings: { $entry: 'promptRecipeEntries' },
        },
      },
    },
  },
  environment: {
    project: {
      prefix: 'promptEnvironmentProject',
      variables: {
        $item: {
          key: 'promptEnvironmentValueForm',
          reach: 'promptEnvironmentValueForm',
          secret: 'promptEnvironmentValueForm',
          defaultValue: 'promptEnvironmentValueForm',
        },
      },
    },
    workspaces: {
      $entry: {
        prefix: 'promptEnvironmentWorkspace',
        variables: {
          $item: {
            key: 'promptEnvironmentValueForm',
            reach: 'promptEnvironmentValueForm',
            secret: 'promptEnvironmentValueForm',
            defaultValue: 'promptEnvironmentValueForm',
          },
        },
      },
    },
    workflows: {
      $entry: {
        prefix: 'promptEnvironmentWorkflow',
      },
    },
  },
  settings: {
    lockStepVersioning: 'promptSettings',
    runWorkspaces: {
      cache: {
        directory: 'promptSettings',
        enabled: 'promptSettings',
        scripts: { $item: 'promptSettings' },
      },
    },
    versionStrategy: 'promptSettings',
  },
};

beforeEach(() => {
  vi.mocked(prompts).mockReset();

  return;
});

/**
 * Tests - CLI - Utility - Configure - Run.
 *
 * @since 0.14.0
 */
describe('CliUtilityConfigure.run', async () => {
  const originalCwd: Tests_Cli_Utility_Configure_CliUtilityConfigureRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Utility_Configure_CliUtilityConfigureRun_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_Cli_Utility_Configure_CliUtilityConfigureRun_TemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Utility_Configure_CliUtilityConfigureRun_SandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: Tests_Cli_Utility_Configure_CliUtilityConfigureRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliUtilityConfigure.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Configure - Is Non Empty Literal Input.
 *
 * @since 0.18.0
 */
describe('CliUtilityConfigure.isNonEmptyLiteralInput', () => {
  it('returns the error message for an empty string', () => {
    const result: Tests_Cli_Utility_Configure_CliUtilityConfigureIsNonEmptyLiteralInput_ReturnsTheErrorMessageForAnEmptyString_Result = CliUtilityConfigure.isNonEmptyLiteralInput('');

    strictEqual(result, 'This field is required.');

    return;
  });

  it('returns the error message for whitespace-only input', () => {
    const result: Tests_Cli_Utility_Configure_CliUtilityConfigureIsNonEmptyLiteralInput_ReturnsTheErrorMessageForWhitespaceOnlyInput_Result = CliUtilityConfigure.isNonEmptyLiteralInput('   ');

    strictEqual(result, 'This field is required.');

    return;
  });

  it('returns true for a non-empty string', () => {
    const result: Tests_Cli_Utility_Configure_CliUtilityConfigureIsNonEmptyLiteralInput_ReturnsTrueForANonEmptyString_Result = CliUtilityConfigure.isNonEmptyLiteralInput('./action.yml');

    strictEqual(result, true);

    return;
  });

  it('returns the error message for non-string input', () => {
    const result: Tests_Cli_Utility_Configure_CliUtilityConfigureIsNonEmptyLiteralInput_ReturnsTheErrorMessageForNonStringInput_Result = CliUtilityConfigure.isNonEmptyLiteralInput(undefined);

    strictEqual(result, 'This field is required.');

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Configure - Prompt Environment Section.
 *
 * @since 0.21.0
 */
describe('prompt environment section', () => {
  it('adds a global secret value', async () => {
    const responses: Tests_Cli_Utility_Configure_PromptEnvironmentSection_AddsAGlobalSecretValue_Responses = [
      {
        action: {
          kind: 'scope',
          scope: 'project',
        },
      },
      { action: { kind: 'prefix' } },
      { prefix: 'ACME_' },
      { action: { kind: 'add' } },
      { key: 'MY_SECRET' },
      { secret: true },
    ];

    vi.mocked(prompts).mockImplementation(() => {
      const next: Tests_Cli_Utility_Configure_PromptEnvironmentSection_AddsAGlobalSecretValue_Next = responses.shift();

      return Promise.resolve((next !== undefined) ? next : {});
    });

    const config: Tests_Cli_Utility_Configure_PromptEnvironmentSection_AddsAGlobalSecretValue_Config = {};
    const promptEnvironment: Tests_Cli_Utility_Configure_PromptEnvironmentSection_AddsAGlobalSecretValue_PromptEnvironment = Reflect.get(CliUtilityConfigure, 'promptEnvironment') as Tests_Cli_Utility_Configure_PromptEnvironmentSection_AddsAGlobalSecretValue_PromptEnvironment;

    await promptEnvironment(config);

    const globalVariables: Tests_Cli_Utility_Configure_PromptEnvironmentSection_AddsAGlobalSecretValue_GlobalVariables = (config['environment'] !== undefined && config['environment']['project'] !== undefined) ? config['environment']['project']['variables'] : undefined;

    deepStrictEqual(globalVariables, [{
      key: 'MY_SECRET',
      reach: 'managed',
      secret: true,
    }]);

    return;
  });

  it('prompts before removing a value', async () => {
    const responses: Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Responses = [
      {
        action: {
          kind: 'scope',
          scope: 'project',
        },
      },
      {
        action: {
          kind: 'remove',
          index: 0,
        },
      },
      { confirm: true },
      { dropLocal: false },
    ];
    const capturedQuestions: Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_CapturedQuestions = [];

    vi.mocked(prompts).mockImplementation((questions) => {
      const question: Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Question = (Array.isArray(questions) === true) ? questions[0] as Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Question : questions;

      capturedQuestions.push(question);

      const next: Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Next = responses.shift();

      return Promise.resolve((next !== undefined) ? next : {});
    });

    const config: Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Config = {
      environment: {
        project: {
          prefix: 'G_',
          variables: [{
            key: 'OLD',
            reach: 'managed',
            secret: true,
          }],
        },
      },
    };
    const promptEnvironment: Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_PromptEnvironment = Reflect.get(CliUtilityConfigure, 'promptEnvironment') as Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_PromptEnvironment;

    await promptEnvironment(config);

    const removeQuestion: Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_RemoveQuestion = capturedQuestions.find((entry) => entry['type'] === 'confirm' && String(entry['message']).includes('Remove'));
    const globalBlock: Tests_Cli_Utility_Configure_PromptEnvironmentSection_PromptsBeforeRemovingAValue_GlobalBlock = (config['environment'] !== undefined) ? config['environment']['project'] : undefined;

    ok(removeQuestion !== undefined, 'Expected a removal confirmation prompt before deleting the value');
    ok(globalBlock !== undefined && globalBlock['variables'] === undefined, 'Expected the removed value to be gone from the project block');

    return;
  });

  it('offers the repo root workspace and adds its namespace', async () => {
    const responses: Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Responses = [
      {
        action: {
          kind: 'scope',
          scope: 'workspace',
          appPath: './',
        },
      },
      { action: { kind: 'prefix' } },
      { prefix: 'ROOT_' },
    ];
    const capturedQuestions: Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_CapturedQuestions = [];

    vi.mocked(prompts).mockImplementation((questions) => {
      const question: Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Question = (Array.isArray(questions) === true) ? questions[0] as Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Question : questions;

      capturedQuestions.push(question);

      const next: Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Next = responses.shift();

      return Promise.resolve((next !== undefined) ? next : {});
    });

    const config: Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Config = {
      workspaces: {
        './': {
          name: 'project',
          role: 'project',
          policy: 'freezable',
        },
        './packages/lib': {
          name: 'lib',
          role: 'package',
          policy: 'distributable',
        },
      },
    };
    const promptEnvironment: Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_PromptEnvironment = Reflect.get(CliUtilityConfigure, 'promptEnvironment') as Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_PromptEnvironment;

    await promptEnvironment(config);

    const rootQuestion: Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_RootQuestion = capturedQuestions.find((entry) => entry['type'] === 'select' && JSON.stringify(entry['choices']).includes('"appPath":"./"') === true);
    const rootBlock: Tests_Cli_Utility_Configure_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_RootBlock = (config['environment'] !== undefined && config['environment']['workspaces'] !== undefined) ? config['environment']['workspaces']['./'] : undefined;

    ok(rootQuestion !== undefined, 'Expected the environment menu to offer the repo root "./" workspace');
    ok(rootBlock !== undefined && rootBlock['prefix'] === 'ROOT_', 'Expected the repo root namespace to be saved with its prefix');

    return;
  });

  it('rejects adding a value when the namespace has no prefix', async () => {
    const responses: Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_Responses = [
      {
        action: {
          kind: 'scope',
          scope: 'project',
        },
      },
      { action: { kind: 'add' } },
      { action: { kind: 'back' } },
    ];

    vi.mocked(prompts).mockImplementation(() => {
      const next: Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_Next = responses.shift();

      return Promise.resolve((next !== undefined) ? next : {});
    });

    const customizedLoggerMock: Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };
    const loggerCustomizeSpy: Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_LoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_LoggerCustomizeReturn);
    const config: Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_Config = {};
    const promptEnvironment: Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_PromptEnvironment = Reflect.get(CliUtilityConfigure, 'promptEnvironment') as Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_PromptEnvironment;

    await promptEnvironment(config);

    const errorCalls: Tests_Cli_Utility_Configure_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_ErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    loggerCustomizeSpy.mockRestore();

    ok(
      errorCalls.some((call) => typeof call[0] === 'string' && call[0].includes('prefix') === true),
      'Expected a rejection telling the user to set a prefix before adding values',
    );
    ok(config['environment'] === undefined, 'Expected no namespace to persist without a prefix');

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Configure - Standalone Environment Status.
 *
 * @since 0.21.0
 */
describe('standalone environment status', () => {
  it('runs the status computation without entering the interactive flow', async () => {
    const config: Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_Config = {
      environment: {
        project: {
          prefix: 'ACME_',
          variables: [{
            key: 'TOKEN',
            reach: 'managed',
            secret: true,
          }],
        },
      },
    };
    const runner: Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_Runner = CliUtilityConfigure;
    const checkPathSpy: Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_CheckPathSpy = vi.spyOn(runner as Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_CheckPathTarget, 'checkPath').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue(config);
    const saveSpy: Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_SaveSpy = vi.spyOn(LibNovaConfig.prototype, 'save').mockResolvedValue(undefined);
    const readSpy: Tests_Cli_Utility_Configure_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_ReadSpy = vi.spyOn(libEnvGithub, 'read').mockResolvedValue({
      available: true,
      variables: [],
      secrets: [],
    });

    vi.mocked(prompts).mockResolvedValue({ lockStepVersioning: true });

    await CliUtilityConfigure.run({ status: true });

    ok(readSpy.mock.calls.length > 0, 'Expected the standalone status to compute the GitHub status');
    ok(vi.mocked(prompts).mock.calls.length === 0, 'Expected the read-only status to skip the interactive menu');
    ok(saveSpy.mock.calls.length === 0, 'Expected the read-only status to write nothing');

    checkPathSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    readSpy.mockRestore();

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Configure - Reconcile Stub Notice.
 *
 * @since 0.21.0
 */
describe('reconcile stub notice', () => {
  it('lists the created placeholder stubs and tells the user to set real values', async () => {
    const config: Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_Config = {
      environment: {
        project: {
          prefix: 'ACME_',
          variables: [{
            key: 'TOKEN',
            reach: 'managed',
            secret: true,
          }],
        },
      },
    };
    const readSpy: Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_ReadSpy = vi.spyOn(libEnvGithub, 'read').mockResolvedValue({
      available: true,
      variables: [],
      secrets: [],
    });

    // Bypass the confirm-gated gh channel and hand back a created result so the assertion targets
    // the notice surfacing alone; the real plan still classifies "ACME_TOKEN" as a created stub.
    const applySpy: Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_ApplySpy = vi.spyOn(libEnvReconcile, 'apply').mockResolvedValue({
      available: true,
      done: ['ACME_TOKEN'],
      remaining: [],
    });
    const customizedLoggerMock: Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };
    const loggerCustomizeSpy: Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_LoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_LoggerCustomizeReturn);
    const promptEnvironmentReconcile: Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_PromptEnvironmentReconcile = Reflect.get(CliUtilityConfigure, 'promptEnvironmentReconcile') as Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_PromptEnvironmentReconcile;

    await promptEnvironmentReconcile(config, true);

    const warnCalls: Tests_Cli_Utility_Configure_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_WarnCalls = customizedLoggerMock['warn']['mock']['calls'];

    ok(
      warnCalls.some((call) => (
        typeof call[0] === 'string'
        && call[0].includes('ACME_TOKEN') === true
        && call[0].includes('before deploying') === true
      )),
      'Expected a notice listing the created placeholder stub and instructing the user to set real values before deploying',
    );

    readSpy.mockRestore();

    applySpy.mockRestore();

    loggerCustomizeSpy.mockRestore();

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Configure - Read Local Filled Keys.
 *
 * @since 0.21.0
 */
describe('read local filled keys', () => {
  it('returns only genuinely filled keys', async () => {
    const sandboxRoot: Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_SandboxRoot = await mkdtemp(join(tmpdir(), `nova-${'test'}-`));
    const appDirectory: Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_AppDirectory = join(sandboxRoot, 'apps', 'site');

    await mkdir(appDirectory, { recursive: true });

    // A filled line is kept; empty-quoted, empty-bare, and whitespace-only are dropped. LOG_LEVEL
    // is a reserved scaffold default written empty, so it drops here too (the reserved-key exemption
    // for filled values lives downstream in libEnvStatus.localOrphans, not in this reader).
    const envContents: Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_EnvContents = [
      'API_KEY="filled-value"',
      'EMPTY_QUOTED=""',
      'EMPTY_BARE=',
      'WHITESPACE_ONLY=    ',
      'LOG_LEVEL=""',
    ].join('\n');

    await writeFile(join(appDirectory, '.env'), envContents, 'utf-8');

    const config: Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_Config = {
      environment: {
        workspaces: {
          './apps/site': {
            prefix: 'CBN_',
            variables: [],
          },
        },
      },
    };
    const cwdSpy: Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_CwdSpy = vi.spyOn(process, 'cwd').mockReturnValue(sandboxRoot);
    const readLocalFilledKeys: Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_ReadLocalFilledKeys = Reflect.get(CliUtilityConfigure, 'readLocalFilledKeys') as Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_ReadLocalFilledKeys;
    const filled: Tests_Cli_Utility_Configure_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_Filled = await readLocalFilledKeys(config);

    cwdSpy.mockRestore();

    deepStrictEqual(filled['./apps/site'], ['API_KEY'], 'only the filled non-reserved key is returned');

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Configure - Prompt Flow.
 *
 * @since 0.32.0
 */
describe('prompt flow', () => {
  it('exposes every top-level config category', async () => {
    const capturedQuestions: Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_CapturedQuestions = [];

    vi.mocked(prompts).mockImplementation((questions) => {
      const question: Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_Question = (Array.isArray(questions) === true) ? questions[0] as Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_Question : questions;

      capturedQuestions.push(question);

      const next: Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_Next = { action: 'cancel' };

      return Promise.resolve(next);
    });

    const config: Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_Config = {};
    const promptFlow: Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_PromptFlow = Reflect.get(CliUtilityConfigure, 'promptFlow') as Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_PromptFlow;
    const result: Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_Result = await promptFlow(config);
    const categoryQuestion: Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_CategoryQuestion = capturedQuestions[0];

    ok(categoryQuestion !== undefined);

    const configuredChoices: Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_ConfiguredChoices = categoryQuestion['choices'];
    const categoryChoices: Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_CategoryChoices = (Array.isArray(configuredChoices) === true) ? configuredChoices : [];
    const values: Tests_Cli_Utility_Configure_PromptFlow_ExposesEveryTopLevelConfigCategory_Values = categoryChoices.map((choice) => {
      if (
        typeof choice === 'object'
        && choice !== null
        && 'value' in choice
      ) {
        return choice.value;
      }

      return undefined;
    });

    strictEqual(result, 'cancel');
    deepStrictEqual(values, [
      'project',
      'entities',
      'emails',
      'github',
      'workflows',
      'urls',
      'readme',
      'workspaces',
      'ignoreFiles',
      'agents',
      'recipes',
      'environment',
      'settings',
      'save',
      'cancel',
    ]);
    deepStrictEqual(Object.keys(configFieldCoverage), values.slice(0, -2));

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Configure - Prompt GitHub.
 *
 * @since 0.32.0
 */
describe('prompt GitHub', () => {
  it('edits every basic GitHub field without dropping focused sections', async () => {
    const responses: Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_Responses = [
      { githubOwner: 'new-owner' },
      { githubRepo: 'new-repository' },
      {
        githubRecipeSyncActions: true,
        githubRecipeSyncFeatures: true,
        githubRecipeSyncIdentity: true,
        githubRecipeSyncLabels: true,
        githubRecipeSyncPolicies: true,
        githubRecipeSyncRulesets: true,
        githubRecipeSyncSecurity: true,
      },
      { githubTopics: 'nova, tooling' },
      {
        githubFeaturesIssues: true,
        githubFeaturesWiki: false,
        githubFeaturesProjects: true,
        githubFeaturesDiscussions: false,
        githubFeaturesSponsorships: true,
      },
      { githubPoliciesVisibility: 'public' },
      { githubPoliciesDefaultBranch: 'main' },
      {
        githubPoliciesMergeMethodsMerge: false,
        githubPoliciesMergeMethodsSquash: true,
        githubPoliciesMergeMethodsRebase: false,
      },
      { githubPoliciesAutoDeleteHeadBranch: true },
      {
        bugReportFields: [
          'nodejs',
          'screenshots',
        ],
      },
    ];

    vi.mocked(prompts).mockImplementation(() => {
      const next: Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_Next = responses.shift();

      return Promise.resolve((next !== undefined) ? next : {});
    });

    const config: Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_Config = {
      github: {
        owner: 'old-owner',
        repo: 'old-repository',
        topics: ['old'],
        policies: {
          defaultBranch: 'develop',
          mergeCommit: {
            title: 'pull-request-title',
          },
          autoMerge: true,
        },
        actions: {
          enabled: true,
        },
        labels: [{
          name: 'bug',
          color: 'ff0000',
        }],
        rulesets: {
          defaultBranch: {
            enforcement: 'active',
          },
        },
        security: {
          vulnerabilityAlerts: true,
        },
      },
      recipes: {
        github: {
          'sync-labels': {
            enabled: false,
            settings: {
              includeArchived: true,
            },
          },
        },
      },
    };
    const promptGithub: Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_PromptGithub = Reflect.get(CliUtilityConfigure, 'promptGithub') as Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_PromptGithub;
    const result: Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_Result = await promptGithub(config);
    const github: Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_Github = config['github'];
    const recipes: Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_Recipes = config['recipes'];

    strictEqual(result, 'back');
    ok(github !== undefined);
    ok(recipes !== undefined);
    const githubRecipes: Tests_Cli_Utility_Configure_PromptGitHub_EditsEveryBasicGitHubFieldWithoutDroppingFocusedSections_GithubRecipes = recipes['github'];

    ok(githubRecipes !== undefined);
    deepStrictEqual(github, {
      owner: 'new-owner',
      repo: 'new-repository',
      topics: [
        'nova',
        'tooling',
      ],
      features: {
        issues: true,
        wiki: false,
        projects: true,
        discussions: false,
        sponsorships: true,
      },
      policies: {
        visibility: 'public',
        defaultBranch: 'main',
        mergeMethods: {
          merge: false,
          squash: true,
          rebase: false,
        },
        mergeCommit: {
          title: 'pull-request-title',
        },
        autoDeleteHeadBranch: true,
        autoMerge: true,
      },
      security: {
        vulnerabilityAlerts: true,
      },
      rulesets: {
        defaultBranch: {
          enforcement: 'active',
        },
      },
      actions: {
        enabled: true,
      },
      labels: [{
        name: 'bug',
        color: 'ff0000',
      }],
      issueTemplate: {
        bugReportFields: [
          'nodejs',
          'screenshots',
        ],
      },
    });
    deepStrictEqual(githubRecipes['sync-actions'], { enabled: true });
    deepStrictEqual(githubRecipes['sync-labels'], {
      enabled: true,
      settings: {
        includeArchived: true,
      },
    });

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Configure - Prompt Agents.
 *
 * @since 0.32.0
 */
describe('prompt agents', () => {
  it('removes the optional field when no tools are selected', async () => {
    vi.mocked(prompts).mockResolvedValue({ agents: [] });

    const config: Tests_Cli_Utility_Configure_PromptAgents_RemovesTheOptionalFieldWhenNoToolsAreSelected_Config = {
      agents: [
        'claude-code',
        'codex',
      ],
    };
    const promptAgents: Tests_Cli_Utility_Configure_PromptAgents_RemovesTheOptionalFieldWhenNoToolsAreSelected_PromptAgents = Reflect.get(CliUtilityConfigure, 'promptAgents') as Tests_Cli_Utility_Configure_PromptAgents_RemovesTheOptionalFieldWhenNoToolsAreSelected_PromptAgents;
    const result: Tests_Cli_Utility_Configure_PromptAgents_RemovesTheOptionalFieldWhenNoToolsAreSelected_Result = await promptAgents(config);

    strictEqual(result, 'back');
    strictEqual('agents' in config, false);

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Configure - Prompt GitHub Actions.
 *
 * @since 0.32.0
 */
describe('prompt GitHub actions', () => {
  it('edits every actions field', async () => {
    vi.mocked(prompts).mockResolvedValue({
      enabled: true,
      allowedActions: 'selected',
      shaPinningRequired: true,
      selectedActionsGithubOwned: true,
      selectedActionsVerified: false,
      selectedActionsPatterns: 'example/action@*, another/action@*',
      defaultWorkflowPermissions: 'read',
      canApprovePullRequestReviews: false,
      artifactRetentionDays: '14',
    });

    const config: Tests_Cli_Utility_Configure_PromptGitHubActions_EditsEveryActionsField_Config = {
      github: {
        owner: 'example',
      },
    };
    const promptGithubActions: Tests_Cli_Utility_Configure_PromptGitHubActions_EditsEveryActionsField_PromptGithubActions = Reflect.get(CliUtilityConfigure, 'promptGithubActions') as Tests_Cli_Utility_Configure_PromptGitHubActions_EditsEveryActionsField_PromptGithubActions;
    const result: Tests_Cli_Utility_Configure_PromptGitHubActions_EditsEveryActionsField_Result = await promptGithubActions(config);

    strictEqual(result, 'back');
    deepStrictEqual(config['github'], {
      owner: 'example',
      actions: {
        enabled: true,
        allowedActions: 'selected',
        shaPinningRequired: true,
        selectedActions: {
          githubOwned: true,
          verified: false,
          patterns: [
            'example/action@*',
            'another/action@*',
          ],
        },
        defaultWorkflowPermissions: 'read',
        canApprovePullRequestReviews: false,
        artifactRetentionDays: 14,
      },
    });

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Configure - Prompt GitHub Labels.
 *
 * @since 0.32.0
 */
describe('prompt GitHub labels', () => {
  it('reorders labels', async () => {
    const responses: Tests_Cli_Utility_Configure_PromptGitHubLabels_ReordersLabels_Responses = [
      { action: 'move-down:0' },
      { action: 'back' },
    ];

    vi.mocked(prompts).mockImplementation(() => {
      const next: Tests_Cli_Utility_Configure_PromptGitHubLabels_ReordersLabels_Next = responses.shift();

      return Promise.resolve((next !== undefined) ? next : {});
    });

    const config: Tests_Cli_Utility_Configure_PromptGitHubLabels_ReordersLabels_Config = {
      github: {
        labels: [
          {
            name: 'first',
            color: '111111',
          },
          {
            name: 'second',
            color: '222222',
          },
        ],
      },
    };
    const promptGithubLabels: Tests_Cli_Utility_Configure_PromptGitHubLabels_ReordersLabels_PromptGithubLabels = Reflect.get(CliUtilityConfigure, 'promptGithubLabels') as Tests_Cli_Utility_Configure_PromptGitHubLabels_ReordersLabels_PromptGithubLabels;
    const result: Tests_Cli_Utility_Configure_PromptGitHubLabels_ReordersLabels_Result = await promptGithubLabels(config);
    const github: Tests_Cli_Utility_Configure_PromptGitHubLabels_ReordersLabels_Github = config['github'];

    strictEqual(result, 'back');
    ok(github !== undefined);
    deepStrictEqual(github['labels'], [
      {
        name: 'second',
        color: '222222',
      },
      {
        name: 'first',
        color: '111111',
      },
    ]);

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Configure - Prompt GitHub Repository Contracts.
 *
 * @since 0.32.0
 */
describe('prompt GitHub repository contracts', () => {
  it('edits every policy, ruleset, and security field', async () => {
    vi.mocked(prompts)
      .mockResolvedValueOnce({
        visibility: 'private',
        defaultBranch: 'develop',
        merge: true,
        squash: false,
        rebase: true,
        mergeCommitTitle: 'merge-message',
        mergeCommitMessage: 'pull-request-title',
        squashMergeTitle: 'commit-or-pull-request-title',
        squashMergeMessage: 'commit-messages',
        autoDeleteHeadBranch: true,
        autoMerge: false,
        allowUpdateBranch: true,
        webCommitSignoffRequired: false,
      })
      .mockResolvedValueOnce({
        enforcement: 'active',
        blockDeletions: true,
        blockForcePushes: false,
        requireLinearHistory: true,
        requireSignedCommits: false,
        requirePullRequest: true,
        allowedMergeMethods: [
          'squash',
          'rebase',
        ],
        dismissStaleReviews: true,
        requireCodeOwnerReview: false,
        requireLastPushApproval: true,
        requiredApprovals: '2',
        requireConversationResolution: true,
        requiredStatusChecks: 'check, build',
        requireBranchesToBeUpToDate: false,
      })
      .mockResolvedValueOnce({
        vulnerabilityAlerts: true,
        dependabotSecurityUpdates: false,
        secretScanning: true,
        pushProtection: false,
      });

    const config: Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_Config = {
      github: {
        owner: 'example',
      },
    };
    const promptGithubPolicies: Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_PromptGithubPolicies = Reflect.get(CliUtilityConfigure, 'promptGithubPolicies') as Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_PromptGithubPolicies;
    const promptGithubRulesets: Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_PromptGithubRulesets = Reflect.get(CliUtilityConfigure, 'promptGithubRulesets') as Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_PromptGithubRulesets;
    const promptGithubSecurity: Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_PromptGithubSecurity = Reflect.get(CliUtilityConfigure, 'promptGithubSecurity') as Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_PromptGithubSecurity;
    const policiesResult: Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_PoliciesResult = await promptGithubPolicies(config);
    const rulesetsResult: Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_RulesetsResult = await promptGithubRulesets(config);
    const securityResult: Tests_Cli_Utility_Configure_PromptGitHubRepositoryContracts_EditsEveryPolicyRulesetAndSecurityField_SecurityResult = await promptGithubSecurity(config);

    strictEqual(policiesResult, 'back');
    strictEqual(rulesetsResult, 'back');
    strictEqual(securityResult, 'back');
    deepStrictEqual(config['github'], {
      owner: 'example',
      policies: {
        visibility: 'private',
        defaultBranch: 'develop',
        mergeMethods: {
          merge: true,
          squash: false,
          rebase: true,
        },
        mergeCommit: {
          title: 'merge-message',
          message: 'pull-request-title',
        },
        squashMerge: {
          title: 'commit-or-pull-request-title',
          message: 'commit-messages',
        },
        autoDeleteHeadBranch: true,
        autoMerge: false,
        allowUpdateBranch: true,
        webCommitSignoffRequired: false,
      },
      rulesets: {
        defaultBranch: {
          enforcement: 'active',
          blockDeletions: true,
          blockForcePushes: false,
          requireLinearHistory: true,
          requireSignedCommits: false,
          requirePullRequest: true,
          allowedMergeMethods: [
            'squash',
            'rebase',
          ],
          dismissStaleReviews: true,
          requireCodeOwnerReview: false,
          requireLastPushApproval: true,
          requiredApprovals: 2,
          requireConversationResolution: true,
          requiredStatusChecks: [
            'check',
            'build',
          ],
          requireBranchesToBeUpToDate: false,
        },
      },
      security: {
        vulnerabilityAlerts: true,
        dependabotSecurityUpdates: false,
        secretScanning: true,
        pushProtection: false,
      },
    });

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Configure - Prompt Ignore Files.
 *
 * @since 0.32.0
 */
describe('prompt ignore files', () => {
  it('adds bundles and patterns for a physical ignore file', async () => {
    const responses: Tests_Cli_Utility_Configure_PromptIgnoreFiles_AddsBundlesAndPatternsForAPhysicalIgnoreFile_Responses = [
      { action: 'add' },
      { path: './containers/.dockerignore' },
      { bundles: ['nova'] },
      { action: 'patterns:./containers/.dockerignore' },
      { action: { kind: 'add' } },
      { pattern: 'tmp/' },
      { action: { kind: 'back' } },
      { action: 'back' },
    ];

    vi.mocked(prompts).mockImplementation(() => {
      const next: Tests_Cli_Utility_Configure_PromptIgnoreFiles_AddsBundlesAndPatternsForAPhysicalIgnoreFile_Next = responses.shift();

      return Promise.resolve((next !== undefined) ? next : {});
    });

    const config: Tests_Cli_Utility_Configure_PromptIgnoreFiles_AddsBundlesAndPatternsForAPhysicalIgnoreFile_Config = {};
    const promptIgnoreFiles: Tests_Cli_Utility_Configure_PromptIgnoreFiles_AddsBundlesAndPatternsForAPhysicalIgnoreFile_PromptIgnoreFiles = Reflect.get(CliUtilityConfigure, 'promptIgnoreFiles') as Tests_Cli_Utility_Configure_PromptIgnoreFiles_AddsBundlesAndPatternsForAPhysicalIgnoreFile_PromptIgnoreFiles;
    const result: Tests_Cli_Utility_Configure_PromptIgnoreFiles_AddsBundlesAndPatternsForAPhysicalIgnoreFile_Result = await promptIgnoreFiles(config);

    strictEqual(result, 'back');
    deepStrictEqual(config['ignoreFiles'], {
      './containers/.dockerignore': {
        bundles: ['nova'],
        patterns: ['tmp/'],
      },
    });

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Configure - Prompt Recipes.
 *
 * @since 0.32.0
 */
describe('prompt recipes', () => {
  it('edits closed operating-system cleanup settings', async () => {
    const responses: Tests_Cli_Utility_Configure_PromptRecipes_EditsClosedOperatingSystemCleanupSettings_Responses = [
      { target: 'miscellaneous' },
      { enabled: true },
      { fileNames: ['appleDouble'] },
      { fileNames: ['thumbnailDatabase'] },
      { target: 'back' },
    ];

    vi.mocked(prompts).mockImplementation(() => {
      const next: Tests_Cli_Utility_Configure_PromptRecipes_EditsClosedOperatingSystemCleanupSettings_Next = responses.shift();

      return Promise.resolve((next !== undefined) ? next : {});
    });

    const config: Tests_Cli_Utility_Configure_PromptRecipes_EditsClosedOperatingSystemCleanupSettings_Config = {};
    const promptRecipes: Tests_Cli_Utility_Configure_PromptRecipes_EditsClosedOperatingSystemCleanupSettings_PromptRecipes = Reflect.get(CliUtilityConfigure, 'promptRecipes') as Tests_Cli_Utility_Configure_PromptRecipes_EditsClosedOperatingSystemCleanupSettings_PromptRecipes;
    const result: Tests_Cli_Utility_Configure_PromptRecipes_EditsClosedOperatingSystemCleanupSettings_Result = await promptRecipes(config);
    const recipes: Tests_Cli_Utility_Configure_PromptRecipes_EditsClosedOperatingSystemCleanupSettings_Recipes = config['recipes'];

    strictEqual(result, 'back');
    ok(recipes !== undefined);
    deepStrictEqual(recipes['miscellaneous'], {
      'remove-operating-system-files': {
        enabled: true,
        settings: {
          linux: {},
          macos: {
            appleDouble: true,
            desktopServicesStore: false,
          },
          windows: {
            enhancedThumbnailDatabase: false,
            enhancedVistaThumbnailDatabase: false,
            thumbnailDatabase: true,
          },
        },
      },
    });

    return;
  });

  it('edits recipe settings without dropping other categories', async () => {
    const responses: Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_Responses = [
      { target: 'github' },
      { enabledRecipes: ['sync-labels'] },
      { settingsRecipes: ['sync-labels'] },
      { recipeSettings: '{"includeArchived":true}' },
      { target: 'back' },
    ];

    vi.mocked(prompts).mockImplementation(() => {
      const next: Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_Next = responses.shift();

      return Promise.resolve((next !== undefined) ? next : {});
    });

    const config: Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_Config = {
      recipes: {
        license: {
          'update-copyright': { enabled: true },
        },
      },
    };
    const promptRecipes: Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_PromptRecipes = Reflect.get(CliUtilityConfigure, 'promptRecipes') as Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_PromptRecipes;
    const result: Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_Result = await promptRecipes(config);
    const recipes: Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_Recipes = config['recipes'];

    strictEqual(result, 'back');
    ok(recipes !== undefined);
    deepStrictEqual(recipes['license'], {
      'update-copyright': { enabled: true },
    });
    const githubRecipes: Tests_Cli_Utility_Configure_PromptRecipes_EditsRecipeSettingsWithoutDroppingOtherCategories_GithubRecipes = recipes['github'];

    ok(githubRecipes !== undefined);
    deepStrictEqual(githubRecipes['sync-labels'], {
      enabled: true,
      settings: {
        includeArchived: true,
      },
    });

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Configure - Prompt Settings.
 *
 * @since 0.26.0
 */
describe('prompt settings', () => {
  it('locks version strategy from workspace history', async () => {
    const sandboxRoot: Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_SandboxRoot = await mkdtemp(join(tmpdir(), `nova-${'settings-history'}-`));
    const workspaceDirectory: Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_WorkspaceDirectory = join(sandboxRoot, 'apps', 'demo');

    await mkdir(workspaceDirectory, { recursive: true });

    const changelogPath: Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_ChangelogPath = join(workspaceDirectory, 'CHANGELOG.md');
    const changelogContent: Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_ChangelogContent = [
      '# Demo Changelog',
      '',
      '## 2026.8.5',
      '',
    ].join('\n');

    await writeFile(changelogPath, changelogContent, 'utf-8');

    const config: Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_Config = {
      workspaces: {
        './apps/demo': {
          name: 'app-demo',
          role: 'app',
          policy: 'trackable',
        },
      },
      settings: {
        versionStrategy: 'calver',
      },
    };
    const cwdSpy: Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_CwdSpy = vi.spyOn(process, 'cwd').mockReturnValue(sandboxRoot);
    const promptSettings: Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_PromptSettings = Reflect.get(CliUtilityConfigure, 'promptSettings') as Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_PromptSettings;

    vi.mocked(prompts)
      .mockResolvedValueOnce({ lockStepVersioning: true })
      .mockResolvedValueOnce({ cacheEnabled: true })
      .mockResolvedValueOnce({ cacheDirectory: './node_modules/.cache/nova/run-workspaces' })
      .mockResolvedValueOnce({ cacheScripts: 'build, check' });

    const result: Tests_Cli_Utility_Configure_PromptSettings_LocksVersionStrategyFromWorkspaceHistory_Result = await promptSettings(config);

    cwdSpy.mockRestore();

    strictEqual(result, 'back');
    strictEqual(vi.mocked(prompts).mock.calls.length, 4);
    deepStrictEqual(config['settings'], {
      lockStepVersioning: true,
      runWorkspaces: {
        cache: {
          directory: './node_modules/.cache/nova/run-workspaces',
          enabled: true,
          scripts: [
            'build',
            'check',
          ],
        },
      },
      versionStrategy: 'calver',
    });

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Configure - Prompt Workflows.
 *
 * @since 0.26.0
 */
describe('prompt workflows', () => {
  it('preserves workflow-run trigger objects when syncing existing workflows', async () => {
    const responses: Tests_Cli_Utility_Configure_PromptWorkflows_PreservesWorkflowRunTriggerObjectsWhenSyncingExistingWorkflows_Responses = [{
      action: { kind: 'back' },
    }];

    vi.mocked(prompts).mockImplementation(() => {
      const next: Tests_Cli_Utility_Configure_PromptWorkflows_PreservesWorkflowRunTriggerObjectsWhenSyncingExistingWorkflows_Next = responses.shift();

      return Promise.resolve((next !== undefined) ? next : {});
    });

    const config: Tests_Cli_Utility_Configure_PromptWorkflows_PreservesWorkflowRunTriggerObjectsWhenSyncingExistingWorkflows_Config = {
      workflows: [
        {
          template: 'publish',
          name: 'core',
          triggers: ['release'],
        },
        {
          template: 'zz-custom-publish',
          name: 'preset',
          triggers: [{
            name: 'workflow-run-success',
            workflows: ['publish-core'],
            branches: ['main'],
            paths: ['packages/preset/**'],
          }],
          build: ['./packages/preset'],
          deploy: [{
            to: 'custom-target',
            path: './packages/preset',
            after: ['./packages/core'],
            with: {
              channel: 'stable',
            },
          }],
          with: {
            CUSTOM_TOKEN: 'CUSTOM_TOKEN',
          },
        },
      ],
    };
    const promptWorkflows: Tests_Cli_Utility_Configure_PromptWorkflows_PreservesWorkflowRunTriggerObjectsWhenSyncingExistingWorkflows_PromptWorkflows = Reflect.get(CliUtilityConfigure, 'promptWorkflows') as Tests_Cli_Utility_Configure_PromptWorkflows_PreservesWorkflowRunTriggerObjectsWhenSyncingExistingWorkflows_PromptWorkflows;
    const result: Tests_Cli_Utility_Configure_PromptWorkflows_PreservesWorkflowRunTriggerObjectsWhenSyncingExistingWorkflows_Result = await promptWorkflows(config);

    strictEqual(result, 'back');
    deepStrictEqual(config['workflows'], [
      {
        template: 'publish',
        name: 'core',
        triggers: ['release'],
      },
      {
        template: 'zz-custom-publish',
        name: 'preset',
        triggers: [{
          name: 'workflow-run-success',
          workflows: ['publish-core'],
          branches: ['main'],
          paths: ['packages/preset/**'],
        }],
        build: ['./packages/preset'],
        deploy: [{
          to: 'custom-target',
          path: './packages/preset',
          after: ['./packages/core'],
          with: {
            channel: 'stable',
          },
        }],
        with: {
          CUSTOM_TOKEN: 'CUSTOM_TOKEN',
        },
      },
    ], 'Expected configure to keep object-form workflow-run triggers and their upstream references');

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Configure - Prompt Workspaces Form.
 *
 * @since 0.22.0
 */
describe('prompt workspaces form', () => {
  it('builds the workspace from role, policy, name, and recipe selection', async () => {
    const responses: Tests_Cli_Utility_Configure_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_Responses = [
      { workspaceRole: 'package' },
      { workspacePolicy: 'trackable' },
      { workspaceName: 'my-lib' },
      { workspaceRecipes: ['normalize-bundler'] },
    ];

    vi.mocked(prompts).mockImplementation(() => {
      const next: Tests_Cli_Utility_Configure_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_Next = responses.shift();

      return Promise.resolve((next !== undefined) ? next : {});
    });

    const promptWorkspacesForm: Tests_Cli_Utility_Configure_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_PromptWorkspacesForm = Reflect.get(CliUtilityConfigure, 'promptWorkspacesForm') as Tests_Cli_Utility_Configure_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_PromptWorkspacesForm;
    const formResult: Tests_Cli_Utility_Configure_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_FormResult = await promptWorkspacesForm({
      workspacePath: './packages/my-lib',
      existingWorkspace: undefined,
      existingPackageJsonRecipes: undefined,
      projectSlug: undefined,
    });
    const workspace: Tests_Cli_Utility_Configure_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_Workspace = (formResult['action'] === 'apply') ? formResult['workspace'] : undefined;
    const packageJsonRecipes: Tests_Cli_Utility_Configure_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_PackageJsonRecipes = (formResult['action'] === 'apply') ? formResult['packageJsonRecipes'] : undefined;

    deepStrictEqual(workspace, {
      name: 'my-lib',
      role: 'package',
      policy: 'trackable',
    }, 'Expected the role, policy, and normalized name to be captured from the prompts');

    deepStrictEqual(packageJsonRecipes, {
      'normalize-bundler': {
        enabled: true,
      },
    }, 'Expected the selected recipe to be recorded as enabled');

    return;
  });

  it('offers and preserves displayName for an enabled sync-identity workspace', async () => {
    const responses: Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Responses = [
      { workspaceRole: 'package' },
      { workspacePolicy: 'distributable' },
      { workspaceName: 'my-lib' },
      { workspaceRecipes: ['sync-identity'] },
      { workspaceRecipeSettings: ['displayName'] },
    ];
    const capturedQuestions: Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_CapturedQuestions = [];

    vi.mocked(prompts).mockImplementation((questions) => {
      const question: Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Question = (Array.isArray(questions) === true) ? questions[0] as Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Question : questions;

      capturedQuestions.push(question);

      const next: Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Next = responses.shift();

      return Promise.resolve((next !== undefined) ? next : {});
    });

    const existingPackageJsonRecipes: Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_ExistingPackageJsonRecipes = {
      'sync-identity': {
        enabled: true,
        settings: {
          displayName: true,
        },
      },
    };

    const promptWorkspacesForm: Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_PromptWorkspacesForm = Reflect.get(CliUtilityConfigure, 'promptWorkspacesForm') as Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_PromptWorkspacesForm;
    const formResult: Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_FormResult = await promptWorkspacesForm({
      workspacePath: './packages/my-lib',
      existingWorkspace: undefined,
      existingPackageJsonRecipes,
      projectSlug: undefined,
    });
    const packageJsonRecipes: Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_PackageJsonRecipes = (formResult['action'] === 'apply') ? formResult['packageJsonRecipes'] : undefined;

    const identityQuestion: Tests_Cli_Utility_Configure_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_IdentityQuestion = capturedQuestions.find((entry) => entry['name'] === 'workspaceRecipeSettings' && JSON.stringify(entry['choices']).includes('"value":"displayName"') === true);

    ok(identityQuestion !== undefined, 'Expected the sync-identity settings prompt to offer a "displayName" choice');
    ok(JSON.stringify(identityQuestion['choices']).includes('"title":"displayName","value":"displayName","selected":true') === true, 'Expected the "displayName" choice to start pre-selected when already enabled');

    deepStrictEqual(packageJsonRecipes, {
      'sync-identity': {
        enabled: true,
        settings: {
          displayName: true,
        },
      },
    }, 'Expected the selected "displayName" setting to be recorded as enabled');

    return;
  });

  return;
});
