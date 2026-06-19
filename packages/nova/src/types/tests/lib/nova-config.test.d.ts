import type { Runner as LibNovaConfig } from '../../../lib/nova-config.js';

import type {
  Shared_NovaConfig_Entities,
  Shared_NovaConfig_Github,
  Shared_NovaConfig_Github_Features,
  Shared_NovaConfig_Github_Policies,
  Shared_NovaConfig_Github_Policies_MergeMethods,
  Shared_NovaConfig_Github_Recipes,
  Shared_NovaConfig_Github_Topics,
  Shared_NovaConfig_Project,
  Shared_NovaConfig_Project_Name,
  Shared_NovaConfig_Urls,
  Shared_NovaConfig_Workflows,
  Shared_NovaConfig_Workspaces,
  Shared_NovaConfigConfig,
  Shared_NovaConfigEntity,
  Shared_NovaConfigWorkflow,
  Shared_NovaConfigWorkspace,
  Shared_NovaConfigWorkspace_Recipes,
} from '../../shared.d.ts';

/**
 * Tests - Lib - Nova Config - ParseGithubViaLoad.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_ParseGithubViaLoad_OriginalCwd = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_TemporaryDirectory = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_SandboxPrefix = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_SandboxRoot = string;

/**
 * Tests - Lib - Nova Config - ParseGithubViaLoad - AcceptsValidOwnerAndRepoWithHyphensDotsAndUnderscores.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_ParseGithubViaLoad_AcceptsValidOwnerAndRepoWithHyphensDotsAndUnderscores_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_AcceptsValidOwnerAndRepoWithHyphensDotsAndUnderscores_ConfigPath = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_AcceptsValidOwnerAndRepoWithHyphensDotsAndUnderscores_ConfigContents = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_AcceptsValidOwnerAndRepoWithHyphensDotsAndUnderscores_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_AcceptsValidOwnerAndRepoWithHyphensDotsAndUnderscores_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_AcceptsValidOwnerAndRepoWithHyphensDotsAndUnderscores_LoadedGithub = Shared_NovaConfig_Github | undefined;

/**
 * Tests - Lib - Nova Config - ParseGithubViaLoad - DropsMalformedFieldValuesAndKeepsValidOnes.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_ParseGithubViaLoad_DropsMalformedFieldValuesAndKeepsValidOnes_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_DropsMalformedFieldValuesAndKeepsValidOnes_ConfigPath = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_DropsMalformedFieldValuesAndKeepsValidOnes_ConfigContents = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_DropsMalformedFieldValuesAndKeepsValidOnes_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_DropsMalformedFieldValuesAndKeepsValidOnes_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_DropsMalformedFieldValuesAndKeepsValidOnes_LoadedGithub = Shared_NovaConfig_Github | undefined;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_DropsMalformedFieldValuesAndKeepsValidOnes_LoadedFeatures = Shared_NovaConfig_Github_Features | undefined;

/**
 * Tests - Lib - Nova Config - ParseGithubViaLoad - IgnoresStaleUrlsGithubFieldSilently.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_ParseGithubViaLoad_IgnoresStaleUrlsGithubFieldSilently_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_IgnoresStaleUrlsGithubFieldSilently_ConfigPath = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_IgnoresStaleUrlsGithubFieldSilently_ConfigContents = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_IgnoresStaleUrlsGithubFieldSilently_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_IgnoresStaleUrlsGithubFieldSilently_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_IgnoresStaleUrlsGithubFieldSilently_LoadedUrls = Shared_NovaConfig_Github | undefined;

/**
 * Tests - Lib - Nova Config - ParseGithubViaLoad - ParsesFullGithubBlockWithAllFields.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ParsesFullGithubBlockWithAllFields_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ParsesFullGithubBlockWithAllFields_ConfigPath = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ParsesFullGithubBlockWithAllFields_ConfigContents = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ParsesFullGithubBlockWithAllFields_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ParsesFullGithubBlockWithAllFields_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ParsesFullGithubBlockWithAllFields_LoadedGithub = Shared_NovaConfig_Github | undefined;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ParsesFullGithubBlockWithAllFields_LoadedRecipes = Shared_NovaConfig_Github_Recipes | undefined;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ParsesFullGithubBlockWithAllFields_LoadedTopics = Shared_NovaConfig_Github_Topics | undefined;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ParsesFullGithubBlockWithAllFields_LoadedFeatures = Shared_NovaConfig_Github_Features | undefined;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ParsesFullGithubBlockWithAllFields_LoadedPolicies = Shared_NovaConfig_Github_Policies | undefined;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ParsesFullGithubBlockWithAllFields_LoadedMergeMethods = Shared_NovaConfig_Github_Policies_MergeMethods | undefined;

/**
 * Tests - Lib - Nova Config - ParseGithubViaLoad - ParsesPartialGithubBlockWithMissingOwnerAndRepo.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ParsesPartialGithubBlockWithMissingOwnerAndRepo_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ParsesPartialGithubBlockWithMissingOwnerAndRepo_ConfigPath = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ParsesPartialGithubBlockWithMissingOwnerAndRepo_ConfigContents = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ParsesPartialGithubBlockWithMissingOwnerAndRepo_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ParsesPartialGithubBlockWithMissingOwnerAndRepo_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ParsesPartialGithubBlockWithMissingOwnerAndRepo_LoadedGithub = Shared_NovaConfig_Github | undefined;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ParsesPartialGithubBlockWithMissingOwnerAndRepo_LoadedTopics = Shared_NovaConfig_Github_Topics | undefined;

/**
 * Tests - Lib - Nova Config - ParseGithubViaLoad - RejectsMalformedOwnerWithShellMetacharacters.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_ParseGithubViaLoad_RejectsMalformedOwnerWithShellMetacharacters_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_RejectsMalformedOwnerWithShellMetacharacters_ConfigPath = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_RejectsMalformedOwnerWithShellMetacharacters_ConfigContents = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_RejectsMalformedOwnerWithShellMetacharacters_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_RejectsMalformedOwnerWithShellMetacharacters_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_RejectsMalformedOwnerWithShellMetacharacters_LoadedGithub = Shared_NovaConfig_Github | undefined;

/**
 * Tests - Lib - Nova Config - ParseGithubViaLoad - RejectsMalformedRepoWithPathTraversal.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_ParseGithubViaLoad_RejectsMalformedRepoWithPathTraversal_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_RejectsMalformedRepoWithPathTraversal_ConfigPath = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_RejectsMalformedRepoWithPathTraversal_ConfigContents = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_RejectsMalformedRepoWithPathTraversal_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_RejectsMalformedRepoWithPathTraversal_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_RejectsMalformedRepoWithPathTraversal_LoadedGithub = Shared_NovaConfig_Github | undefined;

/**
 * Tests - Lib - Nova Config - ParseGithubViaLoad - ReturnsUndefinedForMissingGithubBlock.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ReturnsUndefinedForMissingGithubBlock_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ReturnsUndefinedForMissingGithubBlock_ConfigPath = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ReturnsUndefinedForMissingGithubBlock_ConfigContents = string;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ReturnsUndefinedForMissingGithubBlock_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_ParseGithubViaLoad_ReturnsUndefinedForMissingGithubBlock_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

/**
 * Tests - Lib - Nova Config - ParseWorkflowsViaLoad.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_OriginalCwd = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_TemporaryDirectory = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_SandboxPrefix = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_SandboxRoot = string;

/**
 * Tests - Lib - Nova Config - ParseWorkflowsViaLoad - DropsInvalidWorkflowEntriesSilently.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_DropsInvalidWorkflowEntriesSilently_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_DropsInvalidWorkflowEntriesSilently_ConfigPath = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_DropsInvalidWorkflowEntriesSilently_ConfigContents = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_DropsInvalidWorkflowEntriesSilently_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_DropsInvalidWorkflowEntriesSilently_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_DropsInvalidWorkflowEntriesSilently_LoadedWorkflows = Shared_NovaConfig_Workflows | undefined;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_DropsInvalidWorkflowEntriesSilently_FirstWorkflow = Shared_NovaConfigWorkflow | undefined;

/**
 * Tests - Lib - Nova Config - ParseWorkflowsViaLoad - DropsNonStringSettingsValues.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_DropsNonStringSettingsValues_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_DropsNonStringSettingsValues_ConfigPath = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_DropsNonStringSettingsValues_ConfigContents = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_DropsNonStringSettingsValues_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_DropsNonStringSettingsValues_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_DropsNonStringSettingsValues_LoadedWorkflows = Shared_NovaConfig_Workflows | undefined;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_DropsNonStringSettingsValues_FirstWorkflow = Shared_NovaConfigWorkflow | undefined;

/**
 * Tests - Lib - Nova Config - ParseWorkflowsViaLoad - LoadAllowsEmptyTriggersArray.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadAllowsEmptyTriggersArray_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadAllowsEmptyTriggersArray_ConfigPath = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadAllowsEmptyTriggersArray_ConfigContents = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadAllowsEmptyTriggersArray_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadAllowsEmptyTriggersArray_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadAllowsEmptyTriggersArray_LoadedWorkflows = Shared_NovaConfig_Workflows | undefined;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadAllowsEmptyTriggersArray_FirstWorkflow = Shared_NovaConfigWorkflow | undefined;

/**
 * Tests - Lib - Nova Config - ParseWorkflowsViaLoad - LoadParsesDependsOnFieldAsArray.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadParsesDependsOnFieldAsArray_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadParsesDependsOnFieldAsArray_ConfigPath = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadParsesDependsOnFieldAsArray_ConfigContents = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadParsesDependsOnFieldAsArray_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadParsesDependsOnFieldAsArray_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadParsesDependsOnFieldAsArray_LoadedWorkflows = Shared_NovaConfig_Workflows | undefined;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadParsesDependsOnFieldAsArray_SecondWorkflow = Shared_NovaConfigWorkflow | undefined;

/**
 * Tests - Lib - Nova Config - ParseWorkflowsViaLoad - LoadParsesWorkflowWithTemplateSuffixTriggersAndDependsOn.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadParsesWorkflowWithTemplateSuffixTriggersAndDependsOn_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadParsesWorkflowWithTemplateSuffixTriggersAndDependsOn_ConfigPath = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadParsesWorkflowWithTemplateSuffixTriggersAndDependsOn_ConfigContents = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadParsesWorkflowWithTemplateSuffixTriggersAndDependsOn_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadParsesWorkflowWithTemplateSuffixTriggersAndDependsOn_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadParsesWorkflowWithTemplateSuffixTriggersAndDependsOn_LoadedWorkflows = Shared_NovaConfig_Workflows | undefined;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadParsesWorkflowWithTemplateSuffixTriggersAndDependsOn_FirstWorkflow = Shared_NovaConfigWorkflow | undefined;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadParsesWorkflowWithTemplateSuffixTriggersAndDependsOn_SecondWorkflow = Shared_NovaConfigWorkflow | undefined;

/**
 * Tests - Lib - Nova Config - ParseWorkflowsViaLoad - LoadSkipsWorkflowEntryMissingTriggers.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadSkipsWorkflowEntryMissingTriggers_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadSkipsWorkflowEntryMissingTriggers_ConfigPath = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadSkipsWorkflowEntryMissingTriggers_ConfigContents = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadSkipsWorkflowEntryMissingTriggers_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadSkipsWorkflowEntryMissingTriggers_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadSkipsWorkflowEntryMissingTriggers_LoadedWorkflows = Shared_NovaConfig_Workflows | undefined;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadSkipsWorkflowEntryMissingTriggers_FirstWorkflow = Shared_NovaConfigWorkflow | undefined;

/**
 * Tests - Lib - Nova Config - ParseWorkflowsViaLoad - LoadSkipsWorkflowEntryWithoutSuffix.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadSkipsWorkflowEntryWithoutSuffix_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadSkipsWorkflowEntryWithoutSuffix_ConfigPath = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadSkipsWorkflowEntryWithoutSuffix_ConfigContents = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadSkipsWorkflowEntryWithoutSuffix_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadSkipsWorkflowEntryWithoutSuffix_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadSkipsWorkflowEntryWithoutSuffix_LoadedWorkflows = Shared_NovaConfig_Workflows | undefined;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_LoadSkipsWorkflowEntryWithoutSuffix_FirstWorkflow = Shared_NovaConfigWorkflow | undefined;

/**
 * Tests - Lib - Nova Config - ParseWorkflowsViaLoad - ReturnsUndefinedForNonArrayWorkflows.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_ReturnsUndefinedForNonArrayWorkflows_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_ReturnsUndefinedForNonArrayWorkflows_ConfigPath = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_ReturnsUndefinedForNonArrayWorkflows_ConfigContents = string;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_ReturnsUndefinedForNonArrayWorkflows_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_ParseWorkflowsViaLoad_ReturnsUndefinedForNonArrayWorkflows_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigConstructor - CreatesInstanceWithoutErrors.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigConstructor_CreatesInstanceWithoutErrors_Config = LibNovaConfig;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigConstructor - InstanceHasExpectedPublicMethods.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigConstructor_InstanceHasExpectedPublicMethods_Config = LibNovaConfig;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_OriginalCwd = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_TemporaryDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_SandboxPrefix = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_SandboxRoot = string;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadAcceptsAllSupportedLicenses.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsAllSupportedLicenses_Licenses = readonly string[];

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsAllSupportedLicenses_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsAllSupportedLicenses_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsAllSupportedLicenses_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsAllSupportedLicenses_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsAllSupportedLicenses_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsAllSupportedLicenses_LoadedProject = Shared_NovaConfig_Project | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadAcceptsBusinessPronounsValue.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsBusinessPronounsValue_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsBusinessPronounsValue_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsBusinessPronounsValue_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsBusinessPronounsValue_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsBusinessPronounsValue_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsBusinessPronounsValue_LoadedProject = Shared_NovaConfig_Project | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadAcceptsGitProtocolForRepositoryField.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsGitProtocolForRepositoryField_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsGitProtocolForRepositoryField_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsGitProtocolForRepositoryField_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsGitProtocolForRepositoryField_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsGitProtocolForRepositoryField_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsGitProtocolForRepositoryField_LoadedUrls = Shared_NovaConfig_Urls | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadAcceptsPrivacyPolicyUrl.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsPrivacyPolicyUrl_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsPrivacyPolicyUrl_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsPrivacyPolicyUrl_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsPrivacyPolicyUrl_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsPrivacyPolicyUrl_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsPrivacyPolicyUrl_LoadedUrls = Shared_NovaConfig_Urls | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadAcceptsStartingYearAtMinimumBoundary.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsStartingYearAtMinimumBoundary_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsStartingYearAtMinimumBoundary_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsStartingYearAtMinimumBoundary_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsStartingYearAtMinimumBoundary_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsStartingYearAtMinimumBoundary_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsStartingYearAtMinimumBoundary_LoadedProject = Shared_NovaConfig_Project | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadAcceptsTermsOfUseUrl.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsTermsOfUseUrl_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsTermsOfUseUrl_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsTermsOfUseUrl_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsTermsOfUseUrl_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsTermsOfUseUrl_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsTermsOfUseUrl_LoadedUrls = Shared_NovaConfig_Urls | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadAcceptsValidLegalNameValue.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidLegalNameValue_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidLegalNameValue_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidLegalNameValue_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidLegalNameValue_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidLegalNameValue_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidLegalNameValue_LoadedProject = Shared_NovaConfig_Project | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadAcceptsValidLicense.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidLicense_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidLicense_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidLicense_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidLicense_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidLicense_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidLicense_LoadedProject = Shared_NovaConfig_Project | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadAcceptsValidPlatformsArray.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidPlatformsArray_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidPlatformsArray_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidPlatformsArray_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidPlatformsArray_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidPlatformsArray_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidPlatformsArray_LoadedProject = Shared_NovaConfig_Project | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadAcceptsValidPronounsValue.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidPronounsValue_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidPronounsValue_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidPronounsValue_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidPronounsValue_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidPronounsValue_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidPronounsValue_LoadedProject = Shared_NovaConfig_Project | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadAcceptsValidStartingYear.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidStartingYear_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidStartingYear_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidStartingYear_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidStartingYear_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidStartingYear_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadAcceptsValidStartingYear_LoadedProject = Shared_NovaConfig_Project | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadDropsInvalidDisplayNameFromWorkspaceConfig.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadDropsInvalidDisplayNameFromWorkspaceConfig_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadDropsInvalidDisplayNameFromWorkspaceConfig_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadDropsInvalidDisplayNameFromWorkspaceConfig_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadDropsInvalidDisplayNameFromWorkspaceConfig_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadDropsInvalidDisplayNameFromWorkspaceConfig_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadDropsInvalidDisplayNameFromWorkspaceConfig_LoadedWorkspaces = Shared_NovaConfig_Workspaces | undefined;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadDropsInvalidDisplayNameFromWorkspaceConfig_RootWorkspace = Shared_NovaConfigWorkspace | undefined;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadDropsInvalidDisplayNameFromWorkspaceConfig_CoreWorkspace = Shared_NovaConfigWorkspace | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadFiltersInvalidEmailFormat.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidEmailFormat_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidEmailFormat_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidEmailFormat_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidEmailFormat_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidEmailFormat_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidEmailFormat_LoadedEntities = Shared_NovaConfig_Entities | undefined;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidEmailFormat_FirstEntity = Shared_NovaConfigEntity | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadFiltersInvalidEntityRoles.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidEntityRoles_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidEntityRoles_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidEntityRoles_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidEntityRoles_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidEntityRoles_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidEntityRoles_LoadedEntities = Shared_NovaConfig_Entities | undefined;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidEntityRoles_FirstEntity = Shared_NovaConfigEntity | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadFiltersInvalidPlatformEntries.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidPlatformEntries_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidPlatformEntries_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidPlatformEntries_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidPlatformEntries_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidPlatformEntries_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersInvalidPlatformEntries_LoadedProject = Shared_NovaConfig_Project | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadFiltersNonBooleanRecipeSettings.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersNonBooleanRecipeSettings_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersNonBooleanRecipeSettings_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersNonBooleanRecipeSettings_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersNonBooleanRecipeSettings_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersNonBooleanRecipeSettings_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersNonBooleanRecipeSettings_LoadedWorkspaces = Shared_NovaConfig_Workspaces | undefined;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersNonBooleanRecipeSettings_RootWorkspace = Shared_NovaConfigWorkspace | undefined;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadFiltersNonBooleanRecipeSettings_RootRecipes = Shared_NovaConfigWorkspace_Recipes | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadHandlesNonObjectConfigGracefully.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadHandlesNonObjectConfigGracefully_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadHandlesNonObjectConfigGracefully_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadHandlesNonObjectConfigGracefully_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadHandlesNonObjectConfigGracefully_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadIgnoresInvalidRecipeTuples.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadIgnoresInvalidRecipeTuples_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadIgnoresInvalidRecipeTuples_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadIgnoresInvalidRecipeTuples_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadIgnoresInvalidRecipeTuples_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadIgnoresInvalidRecipeTuples_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadIgnoresInvalidRecipeTuples_LoadedWorkspaces = Shared_NovaConfig_Workspaces | undefined;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadIgnoresInvalidRecipeTuples_RootWorkspace = Shared_NovaConfigWorkspace | undefined;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadIgnoresInvalidRecipeTuples_RootRecipes = Shared_NovaConfigWorkspace_Recipes | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadIgnoresUnknownRecipeNames.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadIgnoresUnknownRecipeNames_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadIgnoresUnknownRecipeNames_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadIgnoresUnknownRecipeNames_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadIgnoresUnknownRecipeNames_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadIgnoresUnknownRecipeNames_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadIgnoresUnknownRecipeNames_LoadedWorkspaces = Shared_NovaConfig_Workspaces | undefined;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadIgnoresUnknownRecipeNames_RootWorkspace = Shared_NovaConfigWorkspace | undefined;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadIgnoresUnknownRecipeNames_RootRecipes = Shared_NovaConfigWorkspace_Recipes | undefined;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadIgnoresUnknownRecipeNames_RecipeKeys = string[];

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadParsesDisplayNameFromWorkspaceConfig.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadParsesDisplayNameFromWorkspaceConfig_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadParsesDisplayNameFromWorkspaceConfig_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadParsesDisplayNameFromWorkspaceConfig_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadParsesDisplayNameFromWorkspaceConfig_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadParsesDisplayNameFromWorkspaceConfig_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadParsesDisplayNameFromWorkspaceConfig_LoadedWorkspaces = Shared_NovaConfig_Workspaces | undefined;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadParsesDisplayNameFromWorkspaceConfig_RootWorkspace = Shared_NovaConfigWorkspace | undefined;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadParsesDisplayNameFromWorkspaceConfig_CoreWorkspace = Shared_NovaConfigWorkspace | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadParsesRecipesFromWorkspaceConfig.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadParsesRecipesFromWorkspaceConfig_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadParsesRecipesFromWorkspaceConfig_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadParsesRecipesFromWorkspaceConfig_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadParsesRecipesFromWorkspaceConfig_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadParsesRecipesFromWorkspaceConfig_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadParsesRecipesFromWorkspaceConfig_LoadedWorkspaces = Shared_NovaConfig_Workspaces | undefined;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadParsesRecipesFromWorkspaceConfig_RootWorkspace = Shared_NovaConfigWorkspace | undefined;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadParsesRecipesFromWorkspaceConfig_CoreWorkspace = Shared_NovaConfigWorkspace | undefined;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadParsesRecipesFromWorkspaceConfig_RootRecipes = Shared_NovaConfigWorkspace_Recipes | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadReadsConfigFromFilesystem.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadReadsConfigFromFilesystem_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadReadsConfigFromFilesystem_ConfigData = Record<string, unknown>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadReadsConfigFromFilesystem_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadReadsConfigFromFilesystem_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadReadsConfigFromFilesystem_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadReadsConfigFromFilesystem_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadReadsConfigFromFilesystem_LoadedProject = Shared_NovaConfig_Project | undefined;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadReadsConfigFromFilesystem_LoadedProjectName = Shared_NovaConfig_Project_Name | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadRejectsInvalidPrivacyPolicyUrlProtocol.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsInvalidPrivacyPolicyUrlProtocol_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsInvalidPrivacyPolicyUrlProtocol_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsInvalidPrivacyPolicyUrlProtocol_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsInvalidPrivacyPolicyUrlProtocol_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsInvalidPrivacyPolicyUrlProtocol_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadRejectsInvalidUrlProtocol.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsInvalidUrlProtocol_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsInvalidUrlProtocol_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsInvalidUrlProtocol_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsInvalidUrlProtocol_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsInvalidUrlProtocol_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadRejectsWorkspaceWithInvalidPolicyForRole.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsWorkspaceWithInvalidPolicyForRole_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsWorkspaceWithInvalidPolicyForRole_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsWorkspaceWithInvalidPolicyForRole_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsWorkspaceWithInvalidPolicyForRole_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsWorkspaceWithInvalidPolicyForRole_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadRejectsWorkspaceWithInvalidRole.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsWorkspaceWithInvalidRole_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsWorkspaceWithInvalidRole_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsWorkspaceWithInvalidRole_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsWorkspaceWithInvalidRole_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadRejectsWorkspaceWithInvalidRole_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadReturnsEmptyObjectWhenConfigFileIsMissing.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadReturnsEmptyObjectWhenConfigFileIsMissing_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadReturnsEmptyObjectWhenConfigFileIsMissing_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadReturnsEmptyObjectWhenConfigFileIsMissing_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadStripsEmptyLegalNameValue.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsEmptyLegalNameValue_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsEmptyLegalNameValue_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsEmptyLegalNameValue_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsEmptyLegalNameValue_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsEmptyLegalNameValue_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsEmptyLegalNameValue_LoadedProject = Shared_NovaConfig_Project | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadStripsEmptyStringsFromConfig.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsEmptyStringsFromConfig_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsEmptyStringsFromConfig_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsEmptyStringsFromConfig_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsEmptyStringsFromConfig_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsEmptyStringsFromConfig_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsEmptyStringsFromConfig_LoadedProject = Shared_NovaConfig_Project | undefined;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsEmptyStringsFromConfig_LoadedProjectName = Shared_NovaConfig_Project_Name | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadStripsInvalidLicense.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsInvalidLicense_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsInvalidLicense_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsInvalidLicense_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsInvalidLicense_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsInvalidLicense_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsInvalidLicense_LoadedProject = Shared_NovaConfig_Project | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadStripsInvalidPronounsValue.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsInvalidPronounsValue_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsInvalidPronounsValue_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsInvalidPronounsValue_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsInvalidPronounsValue_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsInvalidPronounsValue_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsInvalidPronounsValue_LoadedProject = Shared_NovaConfig_Project | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadStripsNonIntegerStartingYear.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsNonIntegerStartingYear_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsNonIntegerStartingYear_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsNonIntegerStartingYear_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsNonIntegerStartingYear_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsNonIntegerStartingYear_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsNonIntegerStartingYear_LoadedProject = Shared_NovaConfig_Project | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadStripsNonNumberStartingYear.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsNonNumberStartingYear_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsNonNumberStartingYear_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsNonNumberStartingYear_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsNonNumberStartingYear_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsNonNumberStartingYear_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsNonNumberStartingYear_LoadedProject = Shared_NovaConfig_Project | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadStripsPlatformsWhenAllEntriesAreInvalid.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsPlatformsWhenAllEntriesAreInvalid_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsPlatformsWhenAllEntriesAreInvalid_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsPlatformsWhenAllEntriesAreInvalid_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsPlatformsWhenAllEntriesAreInvalid_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsPlatformsWhenAllEntriesAreInvalid_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsPlatformsWhenAllEntriesAreInvalid_LoadedProject = Shared_NovaConfig_Project | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadStripsStartingYearBelow1970.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsStartingYearBelow1970_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsStartingYearBelow1970_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsStartingYearBelow1970_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsStartingYearBelow1970_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsStartingYearBelow1970_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsStartingYearBelow1970_LoadedProject = Shared_NovaConfig_Project | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigLoad - LoadStripsUnknownFieldsFromConfigFile.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsUnknownFieldsFromConfigFile_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsUnknownFieldsFromConfigFile_ConfigPath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsUnknownFieldsFromConfigFile_ConfigContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsUnknownFieldsFromConfigFile_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsUnknownFieldsFromConfigFile_Loaded = Pick<Shared_NovaConfigConfig, 'project' | 'workspaces' | 'entities' | 'urls' | 'github' | 'workflows'>;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsUnknownFieldsFromConfigFile_LoadedProject = Shared_NovaConfig_Project | undefined;

export type Tests_Lib_NovaConfig_SharedNovaConfigLoad_LoadStripsUnknownFieldsFromConfigFile_LoadedProjectName = Shared_NovaConfig_Project_Name | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigSetAndSave.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_OriginalCwd = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_TemporaryDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SandboxPrefix = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SandboxRoot = string;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigSetAndSave - SetAcceptsValidConfigAndSaveWritesFile.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidConfigAndSaveWritesFile_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidConfigAndSaveWritesFile_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidConfigAndSaveWritesFile_FilePath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidConfigAndSaveWritesFile_FileContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidConfigAndSaveWritesFile_Parsed = Record<string, unknown>;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidConfigAndSaveWritesFile_ParsedProject = Record<string, unknown>;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidConfigAndSaveWritesFile_ParsedProjectName = Record<string, unknown>;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidConfigAndSaveWritesFile_ParsedProjectDescription = Record<string, unknown>;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigSetAndSave - SetAcceptsValidEntitiesConfig.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidEntitiesConfig_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidEntitiesConfig_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidEntitiesConfig_FilePath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidEntitiesConfig_FileContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidEntitiesConfig_Parsed = Record<string, unknown>;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidEntitiesConfig_ParsedEntities = Record<string, unknown>[];

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidEntitiesConfig_ParsedFirstEntity = Record<string, unknown>;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigSetAndSave - SetAcceptsValidUrlsConfig.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidUrlsConfig_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidUrlsConfig_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidUrlsConfig_FilePath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidUrlsConfig_FileContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidUrlsConfig_Parsed = Record<string, unknown>;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidUrlsConfig_ParsedUrls = Record<string, unknown>;

/**
 * Tests - Lib - Nova Config - SharedNovaConfigSetAndSave - SetAcceptsValidWorkspaceConfig.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidWorkspaceConfig_ProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidWorkspaceConfig_Config = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidWorkspaceConfig_FilePath = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidWorkspaceConfig_FileContents = string;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidWorkspaceConfig_Parsed = Record<string, unknown>;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidWorkspaceConfig_ParsedWorkspaces = Record<string, unknown>;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidWorkspaceConfig_ParsedRootWorkspace = Record<string, unknown>;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidWorkspaceConfig_ParsedDocsWorkspace = Record<string, unknown>;

export type Tests_Lib_NovaConfig_SharedNovaConfigSetAndSave_SetAcceptsValidWorkspaceConfig_ParsedNovaWorkspace = Record<string, unknown>;
