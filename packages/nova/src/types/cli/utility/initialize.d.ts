import type { PromptObject } from 'prompts';

import type { Runner as LibNovaConfig } from '../../../lib/nova-config.js';

import type {
  Lib_WorkflowTemplates_Entry as LibWorkflowTemplatesEntry,
  Lib_WorkflowTemplates_Targets as LibWorkflowTemplatesTargets,
  Lib_WorkflowTemplates_Variable as LibWorkflowTemplatesVariable,
  Lib_WorkflowTemplates_Variables as LibWorkflowTemplatesVariables,
} from '../../lib/workflow-templates.d.ts';

import type {
  Shared_DialogAction as SharedDialogAction,
  Shared_EntityMenuAction as SharedEntityMenuAction,
  Shared_NormalizedResult as SharedNormalizedResult,
  Shared_NormalizedResult_Sanitized as SharedNormalizedResultSanitized,
  Shared_NovaConfig as SharedNovaConfig,
  Shared_NovaConfig_Emails as SharedNovaConfigEmails,
  Shared_NovaConfig_Entities as SharedNovaConfigEntities,
  Shared_NovaConfig_Github as SharedNovaConfigGithub,
  Shared_NovaConfig_Github_Features as SharedNovaConfigGithubFeatures,
  Shared_NovaConfig_Github_Policies as SharedNovaConfigGithubPolicies,
  Shared_NovaConfig_Github_Policies_MergeMethods as SharedNovaConfigGithubPoliciesMergeMethods,
  Shared_NovaConfig_Github_Recipes as SharedNovaConfigGithubRecipes,
  Shared_NovaConfig_Github_Topics as SharedNovaConfigGithubTopics,
  Shared_NovaConfig_Project_Description as SharedNovaConfigProjectDescription,
  Shared_NovaConfig_Project_Keywords as SharedNovaConfigProjectKeywords,
  Shared_NovaConfig_Project_LegalName as SharedNovaConfigProjectLegalName,
  Shared_NovaConfig_Project_License as SharedNovaConfigProjectLicense,
  Shared_NovaConfig_Project_Name as SharedNovaConfigProjectName,
  Shared_NovaConfig_Project_Name_Slug as SharedNovaConfigProjectNameSlug,
  Shared_NovaConfig_Project_Platforms as SharedNovaConfigProjectPlatforms,
  Shared_NovaConfig_Project_Pronouns as SharedNovaConfigProjectPronouns,
  Shared_NovaConfig_Project_StartingYear as SharedNovaConfigProjectStartingYear,
  Shared_NovaConfig_Urls as SharedNovaConfigUrls,
  Shared_NovaConfig_Workflows as SharedNovaConfigWorkflows,
  Shared_NovaConfig_Workspaces as SharedNovaConfigWorkspaces,
  Shared_NovaConfigCategory as SharedNovaConfigCategory,
  Shared_NovaConfigEntity as SharedNovaConfigEntity,
  Shared_NovaConfigEntity_Roles as SharedNovaConfigEntityRoles,
  Shared_NovaConfigEntityRole as SharedNovaConfigEntityRole,
  Shared_NovaConfigProjectPlatform as SharedNovaConfigProjectPlatform,
  Shared_NovaConfigWorkflow as SharedNovaConfigWorkflow,
  Shared_NovaConfigWorkflow_DependsOn as SharedNovaConfigWorkflowDependsOn,
  Shared_NovaConfigWorkflow_Scopes as SharedNovaConfigWorkflowScopes,
  Shared_NovaConfigWorkflow_Targets as SharedNovaConfigWorkflowTargets,
  Shared_NovaConfigWorkflow_Triggers as SharedNovaConfigWorkflowTriggers,
  Shared_NovaConfigWorkflowScope as SharedNovaConfigWorkflowScope,
  Shared_NovaConfigWorkflowTarget as SharedNovaConfigWorkflowTarget,
  Shared_NovaConfigWorkflowTarget_Needs as SharedNovaConfigWorkflowTargetNeeds,
  Shared_NovaConfigWorkflowTrigger as SharedNovaConfigWorkflowTrigger,
  Shared_NovaConfigWorkspace as SharedNovaConfigWorkspace,
  Shared_NovaConfigWorkspace_Policy as SharedNovaConfigWorkspacePolicy,
  Shared_NovaConfigWorkspace_Recipes as SharedNovaConfigWorkspaceRecipes,
  Shared_NovaConfigWorkspace_Role as SharedNovaConfigWorkspaceRole,
  Shared_NovaConfigWorkspaceRecipeName as SharedNovaConfigWorkspaceRecipeName,
  Shared_NovaConfigWorkspaceRecipeSettings as SharedNovaConfigWorkspaceRecipeSettings,
  Shared_NovaConfigWorkspaceRecipeTuple as SharedNovaConfigWorkspaceRecipeTuple,
  Shared_PromptWithCancelReject as SharedPromptWithCancelReject,
  Shared_PromptWithCancelResolved as SharedPromptWithCancelResolved,
  Shared_UrlProtocol as SharedUrlProtocol,
} from '../../shared.d.ts';

/**
 * CLI - Utility - Initialize - Check Path.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_CheckPath_CurrentDirectory = string;

export type Cli_Utility_Initialize_Runner_CheckPath_Returns = Promise<boolean>;

export type Cli_Utility_Initialize_Runner_CheckPath_Locations = string[];

export type Cli_Utility_Initialize_Runner_CheckPath_LessThanOneMessage = string;

export type Cli_Utility_Initialize_Runner_CheckPath_GreaterThanOneMessage = string;

export type Cli_Utility_Initialize_Runner_CheckPath_NotProjectRootDirectoryMessage = string;

/**
 * CLI - Utility - Initialize - Is Non Empty Literal Input.
 *
 * @since 0.18.0
 */
export type Cli_Utility_Initialize_Runner_IsNonEmptyLiteralInput_Value = unknown;

export type Cli_Utility_Initialize_Runner_IsNonEmptyLiteralInput_Returns = true | string;

/**
 * CLI - Utility - Initialize - Normalize Email.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_NormalizeEmail_Value = unknown;

export type Cli_Utility_Initialize_Runner_NormalizeEmail_Returns = SharedNormalizedResult<string>;

export type Cli_Utility_Initialize_Runner_NormalizeEmail_TrimmedValue = string;

/**
 * CLI - Utility - Initialize - Normalize Project Slug.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_NormalizeProjectSlug_Value = unknown;

export type Cli_Utility_Initialize_Runner_NormalizeProjectSlug_Returns = SharedNormalizedResult<string>;

export type Cli_Utility_Initialize_Runner_NormalizeProjectSlug_TrimmedValue = string;

/**
 * CLI - Utility - Initialize - Normalize Text.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_NormalizeText_Value = unknown;

export type Cli_Utility_Initialize_Runner_NormalizeText_MaxLength = number;

export type Cli_Utility_Initialize_Runner_NormalizeText_Returns = SharedNormalizedResult<string>;

export type Cli_Utility_Initialize_Runner_NormalizeText_TrimmedValue = string;

/**
 * CLI - Utility - Initialize - Normalize Text Array.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_NormalizeTextArray_Value = unknown;

export type Cli_Utility_Initialize_Runner_NormalizeTextArray_MaxLengthPerItem = number;

export type Cli_Utility_Initialize_Runner_NormalizeTextArray_Returns = SharedNormalizedResult<string[]>;

export type Cli_Utility_Initialize_Runner_NormalizeTextArray_TrimmedValue = string;

export type Cli_Utility_Initialize_Runner_NormalizeTextArray_Items = string[];

export type Cli_Utility_Initialize_Runner_NormalizeTextArray_NormalizedText = SharedNormalizedResult<string>;

export type Cli_Utility_Initialize_Runner_NormalizeTextArray_Result = true | string;

export type Cli_Utility_Initialize_Runner_NormalizeTextArray_Sanitized = SharedNormalizedResultSanitized<string>;

/**
 * CLI - Utility - Initialize - Normalize URL.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_NormalizeUrl_Value = unknown;

export type Cli_Utility_Initialize_Runner_NormalizeUrl_Protocol = SharedUrlProtocol;

export type Cli_Utility_Initialize_Runner_NormalizeUrl_Returns = SharedNormalizedResult<string>;

export type Cli_Utility_Initialize_Runner_NormalizeUrl_TrimmedValue = string;

export type Cli_Utility_Initialize_Runner_NormalizeUrl_Rules_Generic_Allowed = string[];

export type Cli_Utility_Initialize_Runner_NormalizeUrl_Rules_Generic_Message = string;

export type Cli_Utility_Initialize_Runner_NormalizeUrl_Rules_Generic = {
  allowed: Cli_Utility_Initialize_Runner_NormalizeUrl_Rules_Generic_Allowed;
  message: Cli_Utility_Initialize_Runner_NormalizeUrl_Rules_Generic_Message;
};

export type Cli_Utility_Initialize_Runner_NormalizeUrl_Rules = {
  generic: Cli_Utility_Initialize_Runner_NormalizeUrl_Rules_Generic;
  repository: Cli_Utility_Initialize_Runner_NormalizeUrl_Rules_Generic;
};

export type Cli_Utility_Initialize_Runner_NormalizeUrl_Allowed = string[];

export type Cli_Utility_Initialize_Runner_NormalizeUrl_ErrorMessage = string;

export type Cli_Utility_Initialize_Runner_NormalizeUrl_Url = URL;

/**
 * CLI - Utility - Initialize - Normalize URL Array.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_NormalizeUrlArray_Value = unknown;

export type Cli_Utility_Initialize_Runner_NormalizeUrlArray_Protocol = SharedUrlProtocol;

export type Cli_Utility_Initialize_Runner_NormalizeUrlArray_Returns = SharedNormalizedResult<string[]>;

export type Cli_Utility_Initialize_Runner_NormalizeUrlArray_TrimmedValue = string;

export type Cli_Utility_Initialize_Runner_NormalizeUrlArray_Items = string[];

export type Cli_Utility_Initialize_Runner_NormalizeUrlArray_NormalizedUrl = SharedNormalizedResult<string>;

export type Cli_Utility_Initialize_Runner_NormalizeUrlArray_Result = true | string;

export type Cli_Utility_Initialize_Runner_NormalizeUrlArray_Sanitized = SharedNormalizedResultSanitized<string>;

export type Cli_Utility_Initialize_Runner_NormalizeUrlArray_ErrorMessages_Generic = string;

export type Cli_Utility_Initialize_Runner_NormalizeUrlArray_ErrorMessages_Repository = string;

export type Cli_Utility_Initialize_Runner_NormalizeUrlArray_ErrorMessages = {
  generic: Cli_Utility_Initialize_Runner_NormalizeUrlArray_ErrorMessages_Generic;
  repository: Cli_Utility_Initialize_Runner_NormalizeUrlArray_ErrorMessages_Repository;
};

export type Cli_Utility_Initialize_Runner_NormalizeUrlArray_ErrorMessage = string;

/**
 * CLI - Utility - Initialize - Normalize Workspace Name.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_NormalizeWorkspaceName_Value = unknown;

export type Cli_Utility_Initialize_Runner_NormalizeWorkspaceName_Role = SharedNovaConfigWorkspaceRole;

export type Cli_Utility_Initialize_Runner_NormalizeWorkspaceName_Base = string;

export type Cli_Utility_Initialize_Runner_NormalizeWorkspaceName_Returns = SharedNormalizedResult<string>;

export type Cli_Utility_Initialize_Runner_NormalizeWorkspaceName_TrimmedValue = string;

export type Cli_Utility_Initialize_Runner_NormalizeWorkspaceName_ExpectedPrefix = string;

export type Cli_Utility_Initialize_Runner_NormalizeWorkspaceName_Descriptor = string;

/**
 * CLI - Utility - Initialize - Prompt Emails.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptEmails_Config = SharedNovaConfig;

export type Cli_Utility_Initialize_Runner_PromptEmails_Returns = Promise<Extract<SharedDialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptEmails_ExistingEmails = SharedNovaConfigEmails | undefined;

export type Cli_Utility_Initialize_Runner_PromptEmails_Emails = Partial<SharedNovaConfigEmails>;

export type Cli_Utility_Initialize_Runner_PromptEmails_QuestionsOutputKey =
  'emailsBugs';

export type Cli_Utility_Initialize_Runner_PromptEmails_QuestionsOutputValue = string;

export type Cli_Utility_Initialize_Runner_PromptEmails_QuestionsOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptEmails_QuestionsOutputKey, Cli_Utility_Initialize_Runner_PromptEmails_QuestionsOutputValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptEmails_ValidateValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptEmails_QuestionsOutputResult = Record<Cli_Utility_Initialize_Runner_PromptEmails_QuestionsOutputKey, Cli_Utility_Initialize_Runner_PromptEmails_QuestionsOutputValue>;

export type Cli_Utility_Initialize_Runner_PromptEmails_EmailsBugsInput = SharedNormalizedResultSanitized<string>;

/**
 * CLI - Utility - Initialize - Prompt Entities.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptEntities_Config = SharedNovaConfig;

export type Cli_Utility_Initialize_Runner_PromptEntities_Returns = Promise<Extract<SharedDialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptEntities_Entities = SharedNovaConfigEntities;

export type Cli_Utility_Initialize_Runner_PromptEntities_ClonedEntity = SharedNovaConfigEntity;

export type Cli_Utility_Initialize_Runner_PromptEntities_Choice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_Choice_Description = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_Choice_Value = SharedEntityMenuAction;

export type Cli_Utility_Initialize_Runner_PromptEntities_Choice = {
  title: Cli_Utility_Initialize_Runner_PromptEntities_Choice_Title;
  description: Cli_Utility_Initialize_Runner_PromptEntities_Choice_Description;
  value: Cli_Utility_Initialize_Runner_PromptEntities_Choice_Value;
};

export type Cli_Utility_Initialize_Runner_PromptEntities_NormalizedEntities = SharedNovaConfigEntities;

export type Cli_Utility_Initialize_Runner_PromptEntities_NormalizedEntity = SharedNovaConfigEntity;

export type Cli_Utility_Initialize_Runner_PromptEntities_SortNameA = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_SortNameB = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_Choices = Cli_Utility_Initialize_Runner_PromptEntities_Choice[];

export type Cli_Utility_Initialize_Runner_PromptEntities_Entity = SharedNovaConfigEntity | undefined;

export type Cli_Utility_Initialize_Runner_PromptEntities_EntityName = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_EntityEmail = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_EntityRoles = SharedNovaConfigEntityRoles;

export type Cli_Utility_Initialize_Runner_PromptEntities_Label = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_DescriptionParts = string[];

export type Cli_Utility_Initialize_Runner_PromptEntities_NormalizedRoles = string[];

export type Cli_Utility_Initialize_Runner_PromptEntities_NormalizedRolesReduce = string[];

export type Cli_Utility_Initialize_Runner_PromptEntities_JoinedRoles = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_Description = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_MenuOutputKey = 'action';

export type Cli_Utility_Initialize_Runner_PromptEntities_MenuOutputResult = SharedEntityMenuAction;

export type Cli_Utility_Initialize_Runner_PromptEntities_MenuOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptEntities_MenuOutputKey, Cli_Utility_Initialize_Runner_PromptEntities_MenuOutputResult> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptEntities_MenuOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptEntities_MenuOutputKey, Cli_Utility_Initialize_Runner_PromptEntities_MenuOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptEntities_Result = Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsApply | Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsBack;

export type Cli_Utility_Initialize_Runner_PromptEntities_EntityIndex = number;

export type Cli_Utility_Initialize_Runner_PromptEntities_EntityToEdit = SharedNovaConfigEntity | undefined;

export type Cli_Utility_Initialize_Runner_PromptEntities_EntityResult = Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsApply | Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsBack;

export type Cli_Utility_Initialize_Runner_PromptEntities_EntityToRemove = SharedNovaConfigEntity | undefined;

export type Cli_Utility_Initialize_Runner_PromptEntities_EntityLabel = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_ShouldRemove = boolean;

/**
 * CLI - Utility - Initialize - Prompt Entities Delete Form.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_Label = string;

export type Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_Returns = Promise<boolean>;

export type Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_ConfirmOutputKey = 'confirm';

export type Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_ConfirmOutputValue = boolean;

export type Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_ConfirmOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_ConfirmOutputKey, Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_ConfirmOutputValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_ConfirmOutputResult = Record<Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_ConfirmOutputKey, Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_ConfirmOutputValue>;

/**
 * CLI - Utility - Initialize - Prompt Entities Form.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_Entity = SharedNovaConfigEntity | undefined;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_Mode = 'create' | 'update';

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsApply_Action = 'apply';

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsApply_Entity = SharedNovaConfigEntity;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsApply = {
  action: Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsApply_Action;
  entity: Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsApply_Entity;
};

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsBack_Action = Extract<SharedDialogAction, 'back'>;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsBack = {
  action: Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsBack_Action;
};

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_Returns = Promise<Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsApply | Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsBack>;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ValidRoles = SharedNovaConfigEntityRole[];

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ExistingName = string;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ExistingEmail = string;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ExistingUrl = string;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ExistingRoles = SharedNovaConfigEntityRole[];

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputKey = 'entityName' | 'entityEmail' | 'entityUrl' | 'entityRoles';

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputValue<Key extends Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputKey> = Key extends 'entityRoles' ? SharedNovaConfigEntityRole[] : string;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputKey, Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputValue<Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputKey>> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ValidateValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputResult = Record<Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputKey, Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputValue<Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputKey>>;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_EntityNameInput = SharedNormalizedResultSanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_EntityEmailInput = SharedNormalizedResultSanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_EntityUrlInput = SharedNormalizedResultSanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_EntityRolesInput = SharedNovaConfigEntityRoles;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ResolvedEntity = SharedNovaConfigEntity;

/**
 * CLI - Utility - Initialize - Prompt Entities - Sync.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptEntities_Sync_Returns = void;

export type Cli_Utility_Initialize_Runner_PromptEntities_Sync = () => Cli_Utility_Initialize_Runner_PromptEntities_Sync_Returns;

/**
 * CLI - Utility - Initialize - Prompt Flow.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptFlow_Config = SharedNovaConfig;

export type Cli_Utility_Initialize_Runner_PromptFlow_Returns = Promise<Exclude<SharedDialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptFlow_CategoryType_Label = string;

export type Cli_Utility_Initialize_Runner_PromptFlow_CategoryType_Description = string;

export type Cli_Utility_Initialize_Runner_PromptFlow_CategoryType_Handler = (config: SharedNovaConfig) => Promise<Extract<SharedDialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptFlow_CategoryType = {
  label: Cli_Utility_Initialize_Runner_PromptFlow_CategoryType_Label;
  description: Cli_Utility_Initialize_Runner_PromptFlow_CategoryType_Description;
  handler: Cli_Utility_Initialize_Runner_PromptFlow_CategoryType_Handler;
};

export type Cli_Utility_Initialize_Runner_PromptFlow_Category = Record<SharedNovaConfigCategory, Cli_Utility_Initialize_Runner_PromptFlow_CategoryType>;

export type Cli_Utility_Initialize_Runner_PromptFlow_Choice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptFlow_Choice_Description = string;

export type Cli_Utility_Initialize_Runner_PromptFlow_Choice_Value = SharedNovaConfigCategory | Exclude<SharedDialogAction, 'back'>;

export type Cli_Utility_Initialize_Runner_PromptFlow_Choice = {
  title: Cli_Utility_Initialize_Runner_PromptFlow_Choice_Title;
  description: Cli_Utility_Initialize_Runner_PromptFlow_Choice_Description;
  value: Cli_Utility_Initialize_Runner_PromptFlow_Choice_Value;
};

export type Cli_Utility_Initialize_Runner_PromptFlow_CategoryKeys = SharedNovaConfigCategory[];

export type Cli_Utility_Initialize_Runner_PromptFlow_Choices = Cli_Utility_Initialize_Runner_PromptFlow_Choice[];

export type Cli_Utility_Initialize_Runner_PromptFlow_SelectMenuOutputKey = 'action';

export type Cli_Utility_Initialize_Runner_PromptFlow_SelectMenuOutputResult = SharedNovaConfigCategory | Exclude<SharedDialogAction, 'back'>;

export type Cli_Utility_Initialize_Runner_PromptFlow_MenuOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptFlow_SelectMenuOutputKey, Cli_Utility_Initialize_Runner_PromptFlow_SelectMenuOutputResult> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptFlow_MenuOutputResult = Record<Cli_Utility_Initialize_Runner_PromptFlow_SelectMenuOutputKey, Cli_Utility_Initialize_Runner_PromptFlow_SelectMenuOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptFlow_CategoryKey = SharedNovaConfigCategory;

export type Cli_Utility_Initialize_Runner_PromptFlow_CategoryHandler = Cli_Utility_Initialize_Runner_PromptFlow_CategoryType_Handler;

/**
 * CLI - Utility - Initialize - Prompt GitHub.
 *
 * @since 0.16.0
 */
export type Cli_Utility_Initialize_Runner_PromptGithub_Config = SharedNovaConfig;

export type Cli_Utility_Initialize_Runner_PromptGithub_Returns = Promise<Extract<SharedDialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingGithub = SharedNovaConfigGithub | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_Github = Partial<SharedNovaConfigGithub>;

export type Cli_Utility_Initialize_Runner_PromptGithub_OwnerOutput = SharedPromptWithCancelResolved<'githubOwner', string> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_ValidateValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptGithub_OwnerTrimmed = string;

export type Cli_Utility_Initialize_Runner_PromptGithub_OwnerOutputResult = Record<'githubOwner', string>;

export type Cli_Utility_Initialize_Runner_PromptGithub_OwnerInput = string;

export type Cli_Utility_Initialize_Runner_PromptGithub_RepoOutput = SharedPromptWithCancelResolved<'githubRepo', string> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_RepoTrimmed = string;

export type Cli_Utility_Initialize_Runner_PromptGithub_RepoOutputResult = Record<'githubRepo', string>;

export type Cli_Utility_Initialize_Runner_PromptGithub_RepoInput = string;

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingRecipes = SharedNovaConfigGithubRecipes | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_SyncIdentityInitial = boolean;

export type Cli_Utility_Initialize_Runner_PromptGithub_SyncFeaturesInitial = boolean;

export type Cli_Utility_Initialize_Runner_PromptGithub_SyncPoliciesInitial = boolean;

export type Cli_Utility_Initialize_Runner_PromptGithub_RecipesOutputKey =
  'githubRecipeSyncIdentity'
  | 'githubRecipeSyncFeatures'
  | 'githubRecipeSyncPolicies';

export type Cli_Utility_Initialize_Runner_PromptGithub_RecipesOutputValue = boolean;

export type Cli_Utility_Initialize_Runner_PromptGithub_RecipesOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptGithub_RecipesOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_RecipesOutputValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_RecipesOutputResult = Record<Cli_Utility_Initialize_Runner_PromptGithub_RecipesOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_RecipesOutputValue>;

export type Cli_Utility_Initialize_Runner_PromptGithub_RecipesInput = SharedNovaConfigGithubRecipes;

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingTopics = SharedNovaConfigGithubTopics | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsHasExisting = boolean;

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsTitle = string;

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsValue = SharedNovaConfigGithubTopics | Cli_Utility_Initialize_Runner_PromptGithub_TopicsSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsOutputKey = 'githubTopics';

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptGithub_TopicsOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_TopicsValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsSkip = 'skip';

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsOutputResult = Record<Cli_Utility_Initialize_Runner_PromptGithub_TopicsOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_TopicsValue>;

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsInput = SharedNovaConfigGithubTopics | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsText = string;

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsParsed = string[];

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingFeatures = SharedNovaConfigGithubFeatures | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_FeatureIssuesInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_FeatureWikiInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_FeatureProjectsInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_FeatureDiscussionsInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_FeaturesValue = boolean | Cli_Utility_Initialize_Runner_PromptGithub_FeaturesSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_FeaturesOutputKey =
  'githubFeaturesIssues'
  | 'githubFeaturesWiki'
  | 'githubFeaturesProjects'
  | 'githubFeaturesDiscussions';

export type Cli_Utility_Initialize_Runner_PromptGithub_FeaturesOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptGithub_FeaturesOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_FeaturesValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_FeaturesSkip = 'skip';

export type Cli_Utility_Initialize_Runner_PromptGithub_FeaturesOutputResult = Record<Cli_Utility_Initialize_Runner_PromptGithub_FeaturesOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_FeaturesValue>;

export type Cli_Utility_Initialize_Runner_PromptGithub_FeaturesInput = SharedNovaConfigGithubFeatures | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingPolicies = SharedNovaConfigGithubPolicies | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingVisibility = string | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_VisibilityOrder = string[];

export type Cli_Utility_Initialize_Runner_PromptGithub_VisibilityInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesVisibilityValue = 'public' | 'private' | 'internal' | Cli_Utility_Initialize_Runner_PromptGithub_PoliciesVisibilitySkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesVisibilityOutputKey = 'githubPoliciesVisibility';

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesVisibilityOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptGithub_PoliciesVisibilityOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_PoliciesVisibilityValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesVisibilitySkip = 'skip';

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesVisibilityOutputResult = Record<Cli_Utility_Initialize_Runner_PromptGithub_PoliciesVisibilityOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_PoliciesVisibilityValue>;

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingDefaultBranch = string | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_DefaultBranchTitle = string;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchValue = string | Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_DefaultBranchInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchOutputKey = 'githubPoliciesDefaultBranch';

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchSkip = 'skip';

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchOutputResult = Record<Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchValue>;

export type Cli_Utility_Initialize_Runner_PromptGithub_DefaultBranchRaw = string;

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingMergeMethodsObj = SharedNovaConfigGithubPoliciesMergeMethods | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_MergeMethodMergeInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_MergeMethodSquashInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_MergeMethodRebaseInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsValue = boolean | Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsOutputKey =
  'githubPoliciesMergeMethodsMerge'
  | 'githubPoliciesMergeMethodsSquash'
  | 'githubPoliciesMergeMethodsRebase';

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsSkip = 'skip';

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsOutputResult = Record<Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsValue>;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsInput = SharedNovaConfigGithubPoliciesMergeMethods | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingAutoDelete = boolean | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_AutoDeleteInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesAutoDeleteHeadBranchValue = boolean | Cli_Utility_Initialize_Runner_PromptGithub_PoliciesAutoDeleteHeadBranchSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesAutoDeleteHeadBranchOutputKey = 'githubPoliciesAutoDeleteHeadBranch';

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesAutoDeleteHeadBranchOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptGithub_PoliciesAutoDeleteHeadBranchOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_PoliciesAutoDeleteHeadBranchValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesAutoDeleteHeadBranchSkip = 'skip';

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesAutoDeleteHeadBranchOutputResult = Record<Cli_Utility_Initialize_Runner_PromptGithub_PoliciesAutoDeleteHeadBranchOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_PoliciesAutoDeleteHeadBranchValue>;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesInput = SharedNovaConfigGithubPolicies | undefined;

/**
 * CLI - Utility - Initialize - Prompt Project.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptProject_Config = SharedNovaConfig;

export type Cli_Utility_Initialize_Runner_PromptProject_Returns = Promise<Extract<SharedDialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptProject_ExistingProject = SharedNovaConfig['project'];

export type Cli_Utility_Initialize_Runner_PromptProject_ExistingProjectName = SharedNovaConfigProjectName | undefined;

export type Cli_Utility_Initialize_Runner_PromptProject_ExistingProjectDescription = SharedNovaConfigProjectDescription | undefined;

export type Cli_Utility_Initialize_Runner_PromptProject_ExistingProjectKeywords = SharedNovaConfigProjectKeywords | undefined;

export type Cli_Utility_Initialize_Runner_PromptProject_ExistingProjectLegalName = SharedNovaConfigProjectLegalName | undefined;

export type Cli_Utility_Initialize_Runner_PromptProject_ExistingProjectPronouns = SharedNovaConfigProjectPronouns | undefined;

export type Cli_Utility_Initialize_Runner_PromptProject_ExistingProjectPlatforms = SharedNovaConfigProjectPlatforms | undefined;

export type Cli_Utility_Initialize_Runner_PromptProject_ExistingProjectStartingYear = SharedNovaConfigProjectStartingYear | undefined;

export type Cli_Utility_Initialize_Runner_PromptProject_ExistingProjectLicense = SharedNovaConfigProjectLicense | undefined;

export type Cli_Utility_Initialize_Runner_PromptProject_Project = Partial<SharedNovaConfig['project'] & object>;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectName = Partial<SharedNovaConfigProjectName>;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectDescription = Partial<SharedNovaConfigProjectDescription>;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectKeywords = SharedNovaConfigProjectKeywords;

export type Cli_Utility_Initialize_Runner_PromptProject_QuestionsOutputKey =
  'projectNameTitle'
  | 'projectNameSlug'
  | 'projectDescriptionShort'
  | 'projectDescriptionLong'
  | 'projectKeywords';

export type Cli_Utility_Initialize_Runner_PromptProject_QuestionsOutputResult = string;

export type Cli_Utility_Initialize_Runner_PromptProject_QuestionsOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptProject_QuestionsOutputKey, Cli_Utility_Initialize_Runner_PromptProject_QuestionsOutputResult> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptProject_ValidateValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptProject_QuestionsOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptProject_QuestionsOutputKey, Cli_Utility_Initialize_Runner_PromptProject_QuestionsOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectNameTitleInput = SharedNormalizedResultSanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectNameSlugInput = SharedNormalizedResultSanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectDescriptionShortInput = SharedNormalizedResultSanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectDescriptionLongInput = SharedNormalizedResultSanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectKeywordsInput = SharedNormalizedResultSanitized<string[]>;

export type Cli_Utility_Initialize_Runner_PromptProject_LegalNameOutputKey = 'projectLegalName';

export type Cli_Utility_Initialize_Runner_PromptProject_LegalNameOutputResult = string;

export type Cli_Utility_Initialize_Runner_PromptProject_LegalNameOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptProject_LegalNameOutputKey, Cli_Utility_Initialize_Runner_PromptProject_LegalNameOutputResult> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectLegalNameInput = SharedNormalizedResultSanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptProject_PronounsOutputKey = 'projectPronouns';

export type Cli_Utility_Initialize_Runner_PromptProject_PronounsOutputResult = SharedNovaConfigProjectPronouns;

export type Cli_Utility_Initialize_Runner_PromptProject_PronounsOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptProject_PronounsOutputKey, Cli_Utility_Initialize_Runner_PromptProject_PronounsOutputResult> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectPronounsInput = SharedNovaConfigProjectPronouns;

export type Cli_Utility_Initialize_Runner_PromptProject_PlatformChoice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptProject_PlatformChoice_Value = SharedNovaConfigProjectPlatform;

export type Cli_Utility_Initialize_Runner_PromptProject_PlatformChoice_Selected = boolean;

export type Cli_Utility_Initialize_Runner_PromptProject_PlatformChoice = {
  title: Cli_Utility_Initialize_Runner_PromptProject_PlatformChoice_Title;
  value: Cli_Utility_Initialize_Runner_PromptProject_PlatformChoice_Value;
  selected: Cli_Utility_Initialize_Runner_PromptProject_PlatformChoice_Selected;
};

export type Cli_Utility_Initialize_Runner_PromptProject_PlatformChoices = Cli_Utility_Initialize_Runner_PromptProject_PlatformChoice[];

export type Cli_Utility_Initialize_Runner_PromptProject_PlatformsOutputKey = 'projectPlatforms';

export type Cli_Utility_Initialize_Runner_PromptProject_PlatformsOutputResult = SharedNovaConfigProjectPlatform[];

export type Cli_Utility_Initialize_Runner_PromptProject_PlatformsOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptProject_PlatformsOutputKey, Cli_Utility_Initialize_Runner_PromptProject_PlatformsOutputResult> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectPlatformsInput = SharedNovaConfigProjectPlatforms;

export type Cli_Utility_Initialize_Runner_PromptProject_StartingYearOutputKey = 'projectStartingYear';

export type Cli_Utility_Initialize_Runner_PromptProject_StartingYearOutputResult = string;

export type Cli_Utility_Initialize_Runner_PromptProject_StartingYearOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptProject_StartingYearOutputKey, Cli_Utility_Initialize_Runner_PromptProject_StartingYearOutputResult> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptProject_Trimmed = string;

export type Cli_Utility_Initialize_Runner_PromptProject_Parsed = number;

export type Cli_Utility_Initialize_Runner_PromptProject_StartingYearRaw = string;

export type Cli_Utility_Initialize_Runner_PromptProject_StartingYearParsed = number | undefined;

export type Cli_Utility_Initialize_Runner_PromptProject_LicenseChoice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptProject_LicenseChoice_Value = SharedNovaConfigProjectLicense;

export type Cli_Utility_Initialize_Runner_PromptProject_LicenseChoice = {
  title: Cli_Utility_Initialize_Runner_PromptProject_LicenseChoice_Title;
  value: Cli_Utility_Initialize_Runner_PromptProject_LicenseChoice_Value;
};

export type Cli_Utility_Initialize_Runner_PromptProject_LicenseChoices = Cli_Utility_Initialize_Runner_PromptProject_LicenseChoice[];

export type Cli_Utility_Initialize_Runner_PromptProject_LicenseInitialIndex = number;

export type Cli_Utility_Initialize_Runner_PromptProject_LicenseOutputKey = 'projectLicense';

export type Cli_Utility_Initialize_Runner_PromptProject_LicenseOutputResult = SharedNovaConfigProjectLicense;

export type Cli_Utility_Initialize_Runner_PromptProject_LicenseOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptProject_LicenseOutputKey, Cli_Utility_Initialize_Runner_PromptProject_LicenseOutputResult> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectLicenseInput = SharedNovaConfigProjectLicense;

export type Cli_Utility_Initialize_Runner_PromptProject_PreviousSlug = string;

export type Cli_Utility_Initialize_Runner_PromptProject_CurrentSlug = string;

export type Cli_Utility_Initialize_Runner_PromptProject_SlugChanged = boolean;

export type Cli_Utility_Initialize_Runner_PromptProject_RolesToSync = SharedNovaConfigWorkspaceRole[];

export type Cli_Utility_Initialize_Runner_PromptProject_SlugPrefix = RegExp;

export type Cli_Utility_Initialize_Runner_PromptProject_PreviousLabel = string;

export type Cli_Utility_Initialize_Runner_PromptProject_CurrentLabel = string;

export type Cli_Utility_Initialize_Runner_PromptProject_Name2 = string;

/**
 * CLI - Utility - Initialize - Prompt URLs.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptUrls_Config = SharedNovaConfig;

export type Cli_Utility_Initialize_Runner_PromptUrls_Returns = Promise<Extract<SharedDialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptUrls_ExistingUrls = SharedNovaConfigUrls | undefined;

export type Cli_Utility_Initialize_Runner_PromptUrls_Urls = Partial<SharedNovaConfigUrls>;

export type Cli_Utility_Initialize_Runner_PromptUrls_QuestionsOutputKey =
  'urlsHomepage'
  | 'urlsRepository'
  | 'urlsBugs'
  | 'urlsLicense'
  | 'urlsLogo'
  | 'urlsDocumentation'
  | 'urlsNpm'
  | 'urlsDocker'
  | 'urlsFundSources'
  | 'urlsPrivacyPolicy'
  | 'urlsTermsOfUse';

export type Cli_Utility_Initialize_Runner_PromptUrls_QuestionsOutputValue = string;

export type Cli_Utility_Initialize_Runner_PromptUrls_QuestionsOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptUrls_QuestionsOutputKey, Cli_Utility_Initialize_Runner_PromptUrls_QuestionsOutputValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptUrls_QuestionsOutputResult = Record<Cli_Utility_Initialize_Runner_PromptUrls_QuestionsOutputKey, Cli_Utility_Initialize_Runner_PromptUrls_QuestionsOutputValue>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsHomepageInput = SharedNormalizedResultSanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsRepositoryInput = SharedNormalizedResultSanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsBugsInput = SharedNormalizedResultSanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsLicenseInput = SharedNormalizedResultSanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsLogoInput = SharedNormalizedResultSanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsDocumentationInput = SharedNormalizedResultSanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsNpmInput = SharedNormalizedResultSanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsDockerInput = SharedNormalizedResultSanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsFundSourcesInput = SharedNormalizedResultSanitized<string[]>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsPrivacyPolicyInput = SharedNormalizedResultSanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsTermsOfUseInput = SharedNormalizedResultSanitized<string>;

/**
 * CLI - Utility - Initialize - Prompt With Cancel.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptWithCancel_Questions<Keys extends string> = PromptObject<Keys> | PromptObject<Keys>[];

export type Cli_Utility_Initialize_Runner_PromptWithCancel_Returns<Keys extends string, Result> = Promise<SharedPromptWithCancelResolved<Keys, Result> | SharedPromptWithCancelReject>;

export type Cli_Utility_Initialize_Runner_PromptWithCancel_Cancelled = boolean;

export type Cli_Utility_Initialize_Runner_PromptWithCancel_Result<Keys extends string, Result> = Record<Keys, Result>;

/**
 * CLI - Utility - Initialize - Prompt Workflows.
 *
 * @since 0.15.0
 */
export type Cli_Utility_Initialize_Runner_PromptWorkflows_Config = SharedNovaConfig;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Returns = Promise<Extract<SharedDialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Workflows = SharedNovaConfigWorkflows;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_ClonedWorkflow = SharedNovaConfigWorkflow;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Choice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Choice_Description = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueAdd_Kind = 'add';

export type Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueAdd = {
  kind: Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueAdd_Kind;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueEdit_Kind = 'edit';

export type Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueEdit_Index = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueEdit = {
  kind: Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueEdit_Kind;
  index: Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueEdit_Index;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueRemove_Kind = 'remove';

export type Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueRemove_Index = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueRemove = {
  kind: Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueRemove_Kind;
  index: Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueRemove_Index;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueBack_Kind = 'back';

export type Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueBack = {
  kind: Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueBack_Kind;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Choice_Value =
  Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueAdd
  | Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueEdit
  | Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueRemove
  | Cli_Utility_Initialize_Runner_PromptWorkflows_ChoiceValueBack;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Choice = {
  title: Cli_Utility_Initialize_Runner_PromptWorkflows_Choice_Title;
  description: Cli_Utility_Initialize_Runner_PromptWorkflows_Choice_Description;
  value: Cli_Utility_Initialize_Runner_PromptWorkflows_Choice_Value;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflows_SortTemplateA = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_SortTemplateB = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_SortTemplateCompare = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_SortSuffixA = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_SortSuffixB = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Choices = Cli_Utility_Initialize_Runner_PromptWorkflows_Choice[];

export type Cli_Utility_Initialize_Runner_PromptWorkflows_MenuWorkflow = SharedNovaConfigWorkflow | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_MenuTemplate = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_MenuSuffix = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_MenuTriggers = SharedNovaConfigWorkflowTriggers;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Label = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_TriggersLabel = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_OutputFileName = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Description = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_MenuOutputKey = 'action';

export type Cli_Utility_Initialize_Runner_PromptWorkflows_MenuOutputResult = Cli_Utility_Initialize_Runner_PromptWorkflows_Choice_Value;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_MenuOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflows_MenuOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflows_MenuOutputResult> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_MenuOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflows_MenuOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflows_MenuOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Result = Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsApply | Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsBack;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_WorkflowIndex = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_WorkflowToEdit = SharedNovaConfigWorkflow | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_WorkflowToRemove = SharedNovaConfigWorkflow | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_RemoveTemplate = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_RemoveSuffix = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_ShouldRemove = boolean;

/**
 * CLI - Utility - Initialize - Prompt Workflows Delete Form.
 *
 * @since 0.15.0
 */
export type Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_Label = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_Returns = Promise<boolean>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_ConfirmOutputKey = 'confirm';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_ConfirmOutputValue = boolean;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_ConfirmOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_ConfirmOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_ConfirmOutputValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_ConfirmOutputResult = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_ConfirmOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_ConfirmOutputValue>;

/**
 * CLI - Utility - Initialize - Prompt Workflows Form.
 *
 * @since 0.15.0
 */
export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_Workflow = SharedNovaConfigWorkflow | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_Mode = 'create' | 'update';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_Workflows = SharedNovaConfigWorkflows;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_Config = SharedNovaConfig;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsApply_Action = 'apply';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsApply_Workflow = SharedNovaConfigWorkflow;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsApply = {
  action: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsApply_Action;
  workflow: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsApply_Workflow;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsBack_Action = Extract<SharedDialogAction, 'back'>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsBack = {
  action: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsBack_Action;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_Returns = Promise<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsApply | Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsBack>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateChoice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateChoice_Description = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateChoice_Value = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateChoice = {
  title: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateChoice_Title;
  description: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateChoice_Description;
  value: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateChoice_Value;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExistingTemplate = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExistingSuffix = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExistingTriggers = SharedNovaConfigWorkflowTriggers;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExistingDependsOn = SharedNovaConfigWorkflowDependsOn;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExistingTargets = SharedNovaConfigWorkflowTargets;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExistingScopes = SharedNovaConfigWorkflowScopes;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateChoices = Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateChoice[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateInitialIndex = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_FoundIndex = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateOutputKey = 'template';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateOutputResult = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateOutputResult> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SelectedTemplate = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SuffixOutputKey = 'suffix';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SuffixOutputResult = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SuffixOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SuffixOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SuffixOutputResult> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SelectedSuffix = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_CompositeKey = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_EditIndex = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_IsDuplicate = boolean;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SuffixOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SuffixOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SuffixOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersDir = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersDirExists = boolean;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SelectedTriggers = SharedNovaConfigWorkflowTriggers;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersFiles = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerChoice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerChoice_Value = SharedNovaConfigWorkflowTrigger;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerChoice_Selected = boolean;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerChoice = {
  title: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerChoice_Title;
  value: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerChoice_Value;
  selected: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerChoice_Selected;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerChoices = Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerChoice[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerName = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersOutputKey = 'triggers';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersOutputResult = SharedNovaConfigWorkflowTrigger[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersOutputResult> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScheduleVariants = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SelectedDependsOn = string[] | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnChoice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnChoice_Value = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnChoice_Selected = boolean;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnChoice = {
  title: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnChoice_Title;
  value: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnChoice_Value;
  selected: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnChoice_Selected;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnChoices = Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnChoice[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnOutputKey = 'dependsOn';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnOutputResult = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnOutputResult> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_MatchedMetadata = LibWorkflowTemplatesEntry | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_WorkspaceKeys = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SelectedTargets = SharedNovaConfigWorkflowTargets;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetsMetadata = LibWorkflowTemplatesTargets;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetAvailableTypes = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueAdd_Kind = 'add';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueAdd = {
  kind: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueAdd_Kind;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueEdit_Kind = 'edit';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueEdit_Index = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueEdit = {
  kind: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueEdit_Kind;
  index: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueEdit_Index;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueRemove_Kind = 'remove';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueRemove_Index = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueRemove = {
  kind: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueRemove_Kind;
  index: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueRemove_Index;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueDone_Kind = 'done';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueDone = {
  kind: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueDone_Kind;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoice_Value =
  Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueAdd
  | Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueEdit
  | Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueRemove
  | Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoiceValueDone;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoice = {
  title: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoice_Title;
  value: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoice_Value;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoices = Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoice[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuCurrentTarget = SharedNovaConfigWorkflowTarget | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuCurrentTargetType = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuCurrentTargetWorkingDir = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuOutputKey = 'targetAction';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuOutputResult = Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoice_Value;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuOutputResult> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetToRemoveIndex = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetEditIndex = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetToEdit = SharedNovaConfigWorkflowTarget | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetTypeInitial = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetTypeChoice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetTypeChoice_Value = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetTypeChoice = {
  title: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetTypeChoice_Title;
  value: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetTypeChoice_Value;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetTypeChoices = Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetTypeChoice[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetTypeOutputKey = 'targetType';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetTypeOutputResult = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetTypeOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetTypeOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetTypeOutputResult> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetTypeOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetTypeOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetTypeOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SelectedTargetType = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirInitial = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirChoice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirChoice_Value = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirChoice = {
  title: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirChoice_Title;
  value: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirChoice_Value;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirChoices = Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirChoice[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirOutputKey = 'targetWorkingDir';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirOutputResult = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirOutputResult> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SelectedTargetWorkingDir = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetIsDuplicate = boolean;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SelectedTargetNeeds = SharedNovaConfigWorkflowTargetNeeds | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetToEditExistingNeeds = SharedNovaConfigWorkflowTargetNeeds;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsChoice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsChoice_Value = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsChoice_Selected = boolean;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsChoice = {
  title: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsChoice_Title;
  value: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsChoice_Value;
  selected: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsChoice_Selected;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsChoices = Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsChoice[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsOutputKey = 'targetNeeds';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsOutputResult = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsOutputResult> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetEntry_Type = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetEntry_WorkingDir = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetEntry_Needs = SharedNovaConfigWorkflowTargetNeeds;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetEntry = {
  type: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetEntry_Type;
  workingDir: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetEntry_WorkingDir;
  needs?: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetEntry_Needs;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SelectedScopes = SharedNovaConfigWorkflowScopes;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_LockedPaths = Set<string>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExtraWorkspaceKeys = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopeChoice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopeChoice_Value = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopeChoice_Selected = boolean;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopeChoice = {
  title: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopeChoice_Title;
  value: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopeChoice_Value;
  selected: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopeChoice_Selected;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopeChoices = Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopeChoice[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopesOutputKey = 'scopes';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopesOutputResult = SharedNovaConfigWorkflowScope[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopesOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopesOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopesOutputResult> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopesOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopesOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopesOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_Settings = Record<string, string>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_MergedVariables = LibWorkflowTemplatesVariables;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_VariableNameToTargetWorkingDir = Record<string, string>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetVariables = LibWorkflowTemplatesVariables;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetVariableEntry = [string, LibWorkflowTemplatesVariable];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetVariableEntries = Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetVariableEntry[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetVariableKey = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetVariableValue = LibWorkflowTemplatesVariable;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetVariableNames = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetVariableNameKey = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_MergedVariableEntries = [string, LibWorkflowTemplatesVariable][];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_VariableEntries = [string, LibWorkflowTemplatesVariable][];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_VariableEntry = [string, LibWorkflowTemplatesVariable];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_VariableName = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_VariableConfig = LibWorkflowTemplatesVariable;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_PromptMessage = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_InitialValue = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_VariableDescriptionParts = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExampleRaw = LibWorkflowTemplatesVariable['example'];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExampleWorkingDir = string | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExampleResolved = LibWorkflowTemplatesVariable['example'];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SettingsOutputKey = 'settingValue';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SettingsOutputResult = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SettingsOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SettingsOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SettingsOutputResult> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SettingsOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SettingsOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SettingsOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SettingValue = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ResolvedWorkflow = SharedNovaConfigWorkflow;

/**
 * CLI - Utility - Initialize - Prompt Workflows - Sync.
 *
 * @since 0.15.0
 */
export type Cli_Utility_Initialize_Runner_PromptWorkflows_Sync_Returns = void;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Sync = () => Cli_Utility_Initialize_Runner_PromptWorkflows_Sync_Returns;

/**
 * CLI - Utility - Initialize - Prompt Workspaces.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptWorkspaces_Config = SharedNovaConfig;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_Returns = Promise<Extract<SharedDialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces = SharedNovaConfigWorkspaces;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_RawWorkspacePaths = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_WorkspacePaths = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_CurrentWorkingDirectory = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_RelativePath = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_Choice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_Choice_Description = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_Choice_Value = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_Choice = {
  title: Cli_Utility_Initialize_Runner_PromptWorkspaces_Choice_Title;
  description: Cli_Utility_Initialize_Runner_PromptWorkspaces_Choice_Description;
  value: Cli_Utility_Initialize_Runner_PromptWorkspaces_Choice_Value;
};

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_Choices = Cli_Utility_Initialize_Runner_PromptWorkspaces_Choice[];

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_Workspace = SharedNovaConfigWorkspace | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_SummaryParts = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_MenuOutputKey = 'workspacePath';

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_MenuOutputValue = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_MenuOutput = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkspaces_MenuOutputKey, Cli_Utility_Initialize_Runner_PromptWorkspaces_MenuOutputValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_MenuOutputResult = Record<Cli_Utility_Initialize_Runner_PromptWorkspaces_MenuOutputKey, Cli_Utility_Initialize_Runner_PromptWorkspaces_MenuOutputValue>;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_WorkspacePath = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Result = Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply | Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsBack;

/**
 * CLI - Utility - Initialize - Prompt Workspaces Form.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options_WorkspacePath = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options_ExistingWorkspace = SharedNovaConfigWorkspace | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options_ProjectSlug = SharedNovaConfigProjectNameSlug | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options = {
  workspacePath: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options_WorkspacePath;
  existingWorkspace: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options_ExistingWorkspace;
  projectSlug: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options_ProjectSlug;
};

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply_Action = 'apply';

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply_Workspace = SharedNovaConfigWorkspace;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply = {
  action: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply_Action;
  workspace: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply_Workspace;
};

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsBack_Action = Extract<SharedDialogAction, 'back'>;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsBack = {
  action: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsBack_Action;
};

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Returns = Promise<Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply | Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsBack>;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_AllowedRole_Title = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_AllowedRole_Description = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_AllowedRole_Value = SharedNovaConfigWorkspaceRole;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_AllowedRole = {
  title: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_AllowedRole_Title;
  description: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_AllowedRole_Description;
  value: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_AllowedRole_Value;
};

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_AllowedRoles = Cli_Utility_Initialize_Runner_PromptWorkspacesForm_AllowedRole[];

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyType_Label = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyType_Description = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyType = {
  label: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyType_Label;
  description: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyType_Description;
};

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Policy = Record<SharedNovaConfigWorkspacePolicy, Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyType>;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ExistingRoleIndex = number;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RolePromptKey = 'workspaceRole';

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RolePromptValue = SharedNovaConfigWorkspaceRole;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RolePrompt = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RolePromptKey, Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RolePromptValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_SelectedRole = SharedNovaConfigWorkspaceRole;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_AllowedPolicies = SharedNovaConfigWorkspacePolicy[];

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ExistingPolicyIndex = number;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyPromptKey = 'workspacePolicy';

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyPromptValue = SharedNovaConfigWorkspacePolicy;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyPrompt = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyPromptKey, Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyPromptValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyEntry = Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyType;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_SelectedPolicy = SharedNovaConfigWorkspacePolicy;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolvedName = string | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_DisplayNamePromptKey = 'workspaceDisplayName';

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_DisplayNamePromptValue = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_DisplayNamePrompt = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkspacesForm_DisplayNamePromptKey, Cli_Utility_Initialize_Runner_PromptWorkspacesForm_DisplayNamePromptValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_DisplayNameValidateValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_WorkspaceDisplayNameInput = SharedNormalizedResultSanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ExistingRecipes = SharedNovaConfigWorkspaceRecipes | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipesPromptKey = 'workspaceRecipes';

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipesPromptValue = SharedNovaConfigWorkspaceRecipeName[];

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipesPrompt = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipesPromptKey, Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipesPromptValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeTuple = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeSelected = boolean;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_SelectedRecipes = SharedNovaConfigWorkspaceRecipeName[];

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Recipes = SharedNovaConfigWorkspaceRecipes;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ExistingTupleRaw = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ExistingTuple = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ExistingSettings = SharedNovaConfigWorkspaceRecipeSettings | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeSettingsPromptKey = 'workspaceRecipeSettings';

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeSettingsPromptValue = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_SettingsPrompt = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeSettingsPromptKey, Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeSettingsPromptValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_SelectedSettings = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeSettings = SharedNovaConfigWorkspaceRecipeSettings;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Settings = SharedNovaConfigWorkspaceRecipeSettings;

/**
 * CLI - Utility - Initialize - Prompt Workspaces Form - Resolve Name.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_Role = SharedNovaConfigWorkspaceRole;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_Returns = Promise<string | undefined>;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName = (role: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_Role) => Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_Returns;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_Base = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_PromptKey = 'workspaceName';

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_PromptValue = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_NamePrompt = SharedPromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_PromptKey, Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_PromptValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_ValidateValue = unknown;

/**
 * CLI - Utility - Initialize - Run.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_Run_Options_DryRun = true;

export type Cli_Utility_Initialize_Runner_Run_Options_ReplaceFile = true;

export type Cli_Utility_Initialize_Runner_Run_Options = {
  dryRun?: Cli_Utility_Initialize_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Utility_Initialize_Runner_Run_Options_ReplaceFile;
};

export type Cli_Utility_Initialize_Runner_Run_Returns = Promise<void>;

export type Cli_Utility_Initialize_Runner_Run_CurrentDirectory = string;

export type Cli_Utility_Initialize_Runner_Run_IsProjectRoot = boolean;

export type Cli_Utility_Initialize_Runner_Run_IsDryRun = boolean;

export type Cli_Utility_Initialize_Runner_Run_IsReplaceFile = boolean;

export type Cli_Utility_Initialize_Runner_Run_ReplaceFileNotice = string;

export type Cli_Utility_Initialize_Runner_Run_NovaConfig = LibNovaConfig;

export type Cli_Utility_Initialize_Runner_Run_WorkingFile = SharedNovaConfig;

export type Cli_Utility_Initialize_Runner_Run_PromptFlowResult = Exclude<SharedDialogAction, 'back'>;
