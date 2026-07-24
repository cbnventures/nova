import type { PromptObject } from 'prompts';

import type { Runner as LibNovaConfig } from '../../../lib/nova-config.js';

import type { Lib_WorkflowTemplates_Entry } from '../../lib/workflow-templates.d.ts';

import type {
  Shared_BlueprintConfig_Workflows,
  Shared_BlueprintConfigDeployTarget,
  Shared_BlueprintConfigDeployTarget_After,
  Shared_BlueprintConfigTriggerObject_Workflows,
  Shared_BlueprintConfigWorkflow,
  Shared_BlueprintConfigWorkflow_Build,
  Shared_BlueprintConfigWorkflow_Deploy,
  Shared_BlueprintConfigWorkflow_Triggers,
  Shared_DialogAction,
  Shared_EntityMenuAction,
  Shared_NormalizedResult,
  Shared_NormalizedResult_Sanitized,
  Shared_NovaConfig,
  Shared_NovaConfig_Emails,
  Shared_NovaConfig_Entities,
  Shared_NovaConfig_Github,
  Shared_NovaConfig_Github_Features,
  Shared_NovaConfig_Github_IssueTemplate,
  Shared_NovaConfig_Github_IssueTemplate_BugReportFields,
  Shared_NovaConfig_Github_Policies,
  Shared_NovaConfig_Github_Policies_MergeMethods,
  Shared_NovaConfig_Github_Topics,
  Shared_NovaConfig_Gitignore,
  Shared_NovaConfig_Project_Description,
  Shared_NovaConfig_Project_Keywords,
  Shared_NovaConfig_Project_LegalName,
  Shared_NovaConfig_Project_License,
  Shared_NovaConfig_Project_Name,
  Shared_NovaConfig_Project_Name_Slug,
  Shared_NovaConfig_Project_Platforms,
  Shared_NovaConfig_Project_Pronouns,
  Shared_NovaConfig_Project_StartingYear,
  Shared_NovaConfig_RecipeEntry,
  Shared_NovaConfig_RecipeEntry_Settings,
  Shared_NovaConfig_Recipes,
  Shared_NovaConfig_Recipes_Github,
  Shared_NovaConfig_Recipes_PackageJson,
  Shared_NovaConfig_Recipes_PackageJsonWorkspace,
  Shared_NovaConfig_Urls,
  Shared_NovaConfig_Workspaces,
  Shared_NovaConfigAgent,
  Shared_NovaConfigCategory,
  Shared_NovaConfigEntity,
  Shared_NovaConfigEntity_Roles,
  Shared_NovaConfigEntityRole,
  Shared_NovaConfigEnvironment,
  Shared_NovaConfigEnvironment_Apps,
  Shared_NovaConfigEnvironmentApp,
  Shared_NovaConfigEnvironmentGlobal,
  Shared_NovaConfigEnvironmentValue,
  Shared_NovaConfigProjectPlatform,
  Shared_NovaConfigWorkflow_Triggers,
  Shared_NovaConfigWorkflowScope,
  Shared_NovaConfigWorkflowTarget_Needs,
  Shared_NovaConfigWorkflowTrigger,
  Shared_NovaConfigWorkspace,
  Shared_NovaConfigWorkspace_Policy,
  Shared_NovaConfigWorkspace_Role,
  Shared_NovaConfigWorkspaceRecipeName,
  Shared_NovaConfigWorkspaceRecipeSettings,
  Shared_PromptWithCancelReject,
  Shared_PromptWithCancelResolved,
  Shared_UrlProtocol,
  Shared_WorkflowTemplateTargets,
  Shared_WorkflowTemplateVariable,
  Shared_WorkflowTemplateVariables,
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
 * CLI - Utility - Initialize - Import Gitignore Excludes.
 *
 * @since 0.20.0
 */
export type Cli_Utility_Initialize_Runner_ImportGitignoreExcludes_Returns = Promise<string[]>;

export type Cli_Utility_Initialize_Runner_ImportGitignoreExcludes_GitignorePath = string;

export type Cli_Utility_Initialize_Runner_ImportGitignoreExcludes_Exists = boolean;

export type Cli_Utility_Initialize_Runner_ImportGitignoreExcludes_Raw = string;

export type Cli_Utility_Initialize_Runner_ImportGitignoreExcludes_Lines = string[];

export type Cli_Utility_Initialize_Runner_ImportGitignoreExcludes_MarkerIndex = number;

export type Cli_Utility_Initialize_Runner_ImportGitignoreExcludes_Result = string[];

export type Cli_Utility_Initialize_Runner_ImportGitignoreExcludes_Trimmed = string;

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

export type Cli_Utility_Initialize_Runner_NormalizeEmail_Returns = Shared_NormalizedResult<string>;

export type Cli_Utility_Initialize_Runner_NormalizeEmail_TrimmedValue = string;

/**
 * CLI - Utility - Initialize - Normalize Project Slug.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_NormalizeProjectSlug_Value = unknown;

export type Cli_Utility_Initialize_Runner_NormalizeProjectSlug_Returns = Shared_NormalizedResult<string>;

export type Cli_Utility_Initialize_Runner_NormalizeProjectSlug_TrimmedValue = string;

/**
 * CLI - Utility - Initialize - Normalize Text.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_NormalizeText_Value = unknown;

export type Cli_Utility_Initialize_Runner_NormalizeText_MaxLength = number;

export type Cli_Utility_Initialize_Runner_NormalizeText_Returns = Shared_NormalizedResult<string>;

export type Cli_Utility_Initialize_Runner_NormalizeText_TrimmedValue = string;

/**
 * CLI - Utility - Initialize - Normalize Text Array.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_NormalizeTextArray_Value = unknown;

export type Cli_Utility_Initialize_Runner_NormalizeTextArray_MaxLengthPerItem = number;

export type Cli_Utility_Initialize_Runner_NormalizeTextArray_Returns = Shared_NormalizedResult<string[]>;

export type Cli_Utility_Initialize_Runner_NormalizeTextArray_TrimmedValue = string;

export type Cli_Utility_Initialize_Runner_NormalizeTextArray_Items = string[];

export type Cli_Utility_Initialize_Runner_NormalizeTextArray_NormalizedText = Shared_NormalizedResult<string>;

export type Cli_Utility_Initialize_Runner_NormalizeTextArray_Result = true | string;

export type Cli_Utility_Initialize_Runner_NormalizeTextArray_Sanitized = Shared_NormalizedResult_Sanitized<string>;

/**
 * CLI - Utility - Initialize - Normalize URL.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_NormalizeUrl_Value = unknown;

export type Cli_Utility_Initialize_Runner_NormalizeUrl_Protocol = Shared_UrlProtocol;

export type Cli_Utility_Initialize_Runner_NormalizeUrl_Returns = Shared_NormalizedResult<string>;

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

export type Cli_Utility_Initialize_Runner_NormalizeUrlArray_Protocol = Shared_UrlProtocol;

export type Cli_Utility_Initialize_Runner_NormalizeUrlArray_Returns = Shared_NormalizedResult<string[]>;

export type Cli_Utility_Initialize_Runner_NormalizeUrlArray_TrimmedValue = string;

export type Cli_Utility_Initialize_Runner_NormalizeUrlArray_Items = string[];

export type Cli_Utility_Initialize_Runner_NormalizeUrlArray_NormalizedUrl = Shared_NormalizedResult<string>;

export type Cli_Utility_Initialize_Runner_NormalizeUrlArray_Result = true | string;

export type Cli_Utility_Initialize_Runner_NormalizeUrlArray_Sanitized = Shared_NormalizedResult_Sanitized<string>;

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

export type Cli_Utility_Initialize_Runner_NormalizeWorkspaceName_Role = Shared_NovaConfigWorkspace_Role;

export type Cli_Utility_Initialize_Runner_NormalizeWorkspaceName_Base = string;

export type Cli_Utility_Initialize_Runner_NormalizeWorkspaceName_Returns = Shared_NormalizedResult<string>;

export type Cli_Utility_Initialize_Runner_NormalizeWorkspaceName_TrimmedValue = string;

export type Cli_Utility_Initialize_Runner_NormalizeWorkspaceName_ExpectedPrefix = string;

export type Cli_Utility_Initialize_Runner_NormalizeWorkspaceName_Descriptor = string;

/**
 * CLI - Utility - Initialize - Prompt Agents.
 *
 * @since 0.20.0
 */
export type Cli_Utility_Initialize_Runner_PromptAgents_Config = Shared_NovaConfig;

export type Cli_Utility_Initialize_Runner_PromptAgents_Returns = Promise<Extract<Shared_DialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptAgents_Existing = ('claude-code' | 'codex')[];

export type Cli_Utility_Initialize_Runner_PromptAgents_Choice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptAgents_Choice_Value = Shared_NovaConfigAgent;

export type Cli_Utility_Initialize_Runner_PromptAgents_Choice_Selected = boolean;

export type Cli_Utility_Initialize_Runner_PromptAgents_Choice = {
  title: Cli_Utility_Initialize_Runner_PromptAgents_Choice_Title;
  value: Cli_Utility_Initialize_Runner_PromptAgents_Choice_Value;
  selected: Cli_Utility_Initialize_Runner_PromptAgents_Choice_Selected;
};

export type Cli_Utility_Initialize_Runner_PromptAgents_Choices = Cli_Utility_Initialize_Runner_PromptAgents_Choice[];

export type Cli_Utility_Initialize_Runner_PromptAgents_AgentsOutputKey = 'agents';

export type Cli_Utility_Initialize_Runner_PromptAgents_AgentsOutputResult = ('claude-code' | 'codex')[];

export type Cli_Utility_Initialize_Runner_PromptAgents_AgentsOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptAgents_AgentsOutputKey, Cli_Utility_Initialize_Runner_PromptAgents_AgentsOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptAgents_AgentsInput = ('claude-code' | 'codex')[];

export type Cli_Utility_Initialize_Runner_PromptAgents_Agents = ('claude-code' | 'codex')[];

/**
 * CLI - Utility - Initialize - Prompt Emails.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptEmails_Config = Shared_NovaConfig;

export type Cli_Utility_Initialize_Runner_PromptEmails_Returns = Promise<Extract<Shared_DialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptEmails_ExistingEmails = Shared_NovaConfig_Emails | undefined;

export type Cli_Utility_Initialize_Runner_PromptEmails_Emails = Partial<Shared_NovaConfig_Emails>;

export type Cli_Utility_Initialize_Runner_PromptEmails_EmailsBugsValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptEmails_ValidateEmailsBugs = (emailsBugsValue: Cli_Utility_Initialize_Runner_PromptEmails_EmailsBugsValue) => Cli_Utility_Initialize_Runner_PromptEmails_ValidateEmailsBugs_Result;

export type Cli_Utility_Initialize_Runner_PromptEmails_ValidateEmailsBugs_Result = Shared_NormalizedResult<string>['result'];

export type Cli_Utility_Initialize_Runner_PromptEmails_QuestionsOutputKey =
  'emailsBugs';

export type Cli_Utility_Initialize_Runner_PromptEmails_QuestionsOutputValue = string;

export type Cli_Utility_Initialize_Runner_PromptEmails_QuestionsOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptEmails_QuestionsOutputKey, Cli_Utility_Initialize_Runner_PromptEmails_QuestionsOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptEmails_QuestionsOutputResult = Record<Cli_Utility_Initialize_Runner_PromptEmails_QuestionsOutputKey, Cli_Utility_Initialize_Runner_PromptEmails_QuestionsOutputValue>;

export type Cli_Utility_Initialize_Runner_PromptEmails_EmailsBugsInput = Shared_NormalizedResult_Sanitized<string>;

/**
 * CLI - Utility - Initialize - Prompt Entities.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptEntities_Config = Shared_NovaConfig;

export type Cli_Utility_Initialize_Runner_PromptEntities_Returns = Promise<Extract<Shared_DialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptEntities_Entities = Shared_NovaConfig_Entities;

export type Cli_Utility_Initialize_Runner_PromptEntities_ClonedEntity = Shared_NovaConfigEntity;

export type Cli_Utility_Initialize_Runner_PromptEntities_Choice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_Choice_Description = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_Choice_Value = Shared_EntityMenuAction;

export type Cli_Utility_Initialize_Runner_PromptEntities_Choice = {
  title: Cli_Utility_Initialize_Runner_PromptEntities_Choice_Title;
  description: Cli_Utility_Initialize_Runner_PromptEntities_Choice_Description;
  value: Cli_Utility_Initialize_Runner_PromptEntities_Choice_Value;
};

export type Cli_Utility_Initialize_Runner_PromptEntities_Sync = () => Cli_Utility_Initialize_Runner_PromptEntities_Sync_Returns;

export type Cli_Utility_Initialize_Runner_PromptEntities_NameA = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_NameB = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_Choices = Cli_Utility_Initialize_Runner_PromptEntities_Choice[];

export type Cli_Utility_Initialize_Runner_PromptEntities_Entity = Shared_NovaConfigEntity | undefined;

export type Cli_Utility_Initialize_Runner_PromptEntities_EntityName = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_EntityEmail = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_EntityRoles = Shared_NovaConfigEntity_Roles;

export type Cli_Utility_Initialize_Runner_PromptEntities_Label = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_DescriptionParts = string[];

export type Cli_Utility_Initialize_Runner_PromptEntities_NormalizedRoles = string[];

export type Cli_Utility_Initialize_Runner_PromptEntities_NormalizedRolesReduce = string[];

export type Cli_Utility_Initialize_Runner_PromptEntities_JoinedRoles = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_Description = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_MenuOutputKey = 'action';

export type Cli_Utility_Initialize_Runner_PromptEntities_MenuOutputResult = Shared_EntityMenuAction;

export type Cli_Utility_Initialize_Runner_PromptEntities_MenuOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptEntities_MenuOutputKey, Cli_Utility_Initialize_Runner_PromptEntities_MenuOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptEntities_MenuOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptEntities_MenuOutputKey, Cli_Utility_Initialize_Runner_PromptEntities_MenuOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptEntities_Result = Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsApply | Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsBack;

export type Cli_Utility_Initialize_Runner_PromptEntities_EntityIndex = number;

export type Cli_Utility_Initialize_Runner_PromptEntities_EntityToEdit = Shared_NovaConfigEntity | undefined;

export type Cli_Utility_Initialize_Runner_PromptEntities_EntityResult = Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsApply | Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsBack;

export type Cli_Utility_Initialize_Runner_PromptEntities_RemoveEntityIndex = number;

export type Cli_Utility_Initialize_Runner_PromptEntities_EntityToRemove = Shared_NovaConfigEntity | undefined;

export type Cli_Utility_Initialize_Runner_PromptEntities_RemoveEntityName = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_RemoveEntityEmail = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_EntityLabel = string;

export type Cli_Utility_Initialize_Runner_PromptEntities_ShouldRemove = boolean;

/**
 * CLI - Utility - Initialize - Prompt Entities - Sync.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptEntities_Sync_Returns = void;

export type Cli_Utility_Initialize_Runner_PromptEntities_Sync_NormalizedEntities = Shared_NovaConfig_Entities;

export type Cli_Utility_Initialize_Runner_PromptEntities_Sync_NormalizedEntity = Shared_NovaConfigEntity;

/**
 * CLI - Utility - Initialize - Prompt Entities Delete Form.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_Label = string;

export type Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_Returns = Promise<boolean>;

export type Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_ConfirmOutputKey = 'confirm';

export type Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_ConfirmOutputValue = boolean;

export type Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_ConfirmOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_ConfirmOutputKey, Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_ConfirmOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_ConfirmOutputResult = Record<Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_ConfirmOutputKey, Cli_Utility_Initialize_Runner_PromptEntitiesDeleteForm_ConfirmOutputValue>;

/**
 * CLI - Utility - Initialize - Prompt Entities Form.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_Entity = Shared_NovaConfigEntity | undefined;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_Mode = 'create' | 'update';

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsApply_Action = 'apply';

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsApply_Entity = Shared_NovaConfigEntity;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsApply = {
  action: Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsApply_Action;
  entity: Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsApply_Entity;
};

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsBack_Action = Extract<Shared_DialogAction, 'back'>;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsBack = {
  action: Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsBack_Action;
};

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_Returns = Promise<Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsApply | Cli_Utility_Initialize_Runner_PromptEntitiesForm_ReturnsBack>;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ValidRoles = Shared_NovaConfigEntityRole[];

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ExistingName = string;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ExistingEmail = string;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ExistingUrl = string;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ExistingRoles = Shared_NovaConfigEntityRole[];

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_EntityNameValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ValidateEntityName = (entityNameValue: Cli_Utility_Initialize_Runner_PromptEntitiesForm_EntityNameValue) => Cli_Utility_Initialize_Runner_PromptEntitiesForm_ValidateEntityName_Result;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_EntityEmailValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ValidateEntityEmail = (entityEmailValue: Cli_Utility_Initialize_Runner_PromptEntitiesForm_EntityEmailValue) => Cli_Utility_Initialize_Runner_PromptEntitiesForm_ValidateEntityEmail_Result;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_EntityUrlValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ValidateEntityUrl = (entityUrlValue: Cli_Utility_Initialize_Runner_PromptEntitiesForm_EntityUrlValue) => Cli_Utility_Initialize_Runner_PromptEntitiesForm_ValidateEntityUrl_Result;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ValidateEntityEmail_Result = Shared_NormalizedResult<string>['result'];

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ValidateEntityName_Result = Shared_NormalizedResult<string>['result'];

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ValidateEntityUrl_Result = Shared_NormalizedResult<string>['result'];

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputKey = 'entityName' | 'entityEmail' | 'entityUrl' | 'entityRoles';

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputValue<Key extends Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputKey> = Key extends 'entityRoles' ? Shared_NovaConfigEntityRole[] : string;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputKey, Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputValue<Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputKey>> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputResult = Record<Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputKey, Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputValue<Cli_Utility_Initialize_Runner_PromptEntitiesForm_QuestionsOutputKey>>;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_EntityNameInput = Shared_NormalizedResult_Sanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_EntityEmailInput = Shared_NormalizedResult_Sanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_EntityUrlInput = Shared_NormalizedResult_Sanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_EntityRolesInput = Shared_NovaConfigEntity_Roles;

export type Cli_Utility_Initialize_Runner_PromptEntitiesForm_ResolvedEntity = Shared_NovaConfigEntity;

/**
 * CLI - Utility - Initialize - Prompt Environment.
 *
 * @since 0.21.0
 */
export type Cli_Utility_Initialize_Runner_PromptEnvironment_Config = Shared_NovaConfig;

export type Cli_Utility_Initialize_Runner_PromptEnvironment_Returns = Promise<Extract<Shared_DialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptEnvironment_Environment = Shared_NovaConfigEnvironment;

export type Cli_Utility_Initialize_Runner_PromptEnvironment_GlobalScope = Shared_NovaConfigEnvironmentGlobal | undefined;

export type Cli_Utility_Initialize_Runner_PromptEnvironment_Apps = Shared_NovaConfigEnvironment_Apps;

export type Cli_Utility_Initialize_Runner_PromptEnvironment_Workspaces = Shared_NovaConfig_Workspaces;

export type Cli_Utility_Initialize_Runner_PromptEnvironment_AppPaths = string[];

export type Cli_Utility_Initialize_Runner_PromptEnvironment_Choice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironment_Choice_Description = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueScope_Kind = 'scope';

export type Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueScope_Scope = 'global' | 'app';

export type Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueScope_AppPath = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueScope = {
  kind: Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueScope_Kind;
  scope: Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueScope_Scope;
  appPath?: Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueScope_AppPath;
};

export type Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueStatus_Kind = 'status';

export type Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueStatus = {
  kind: Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueStatus_Kind;
};

export type Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueReconcile_Kind = 'reconcile';

export type Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueReconcile = {
  kind: Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueReconcile_Kind;
};

export type Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueBack_Kind = 'back';

export type Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueBack = {
  kind: Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueBack_Kind;
};

export type Cli_Utility_Initialize_Runner_PromptEnvironment_Choice_Value =
  Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueScope
  | Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueStatus
  | Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueReconcile
  | Cli_Utility_Initialize_Runner_PromptEnvironment_ChoiceValueBack;

export type Cli_Utility_Initialize_Runner_PromptEnvironment_Choice = {
  title: Cli_Utility_Initialize_Runner_PromptEnvironment_Choice_Title;
  description: Cli_Utility_Initialize_Runner_PromptEnvironment_Choice_Description;
  value: Cli_Utility_Initialize_Runner_PromptEnvironment_Choice_Value;
};

export type Cli_Utility_Initialize_Runner_PromptEnvironment_Choices = Cli_Utility_Initialize_Runner_PromptEnvironment_Choice[];

export type Cli_Utility_Initialize_Runner_PromptEnvironment_GlobalVariables = Shared_NovaConfigEnvironmentValue[];

export type Cli_Utility_Initialize_Runner_PromptEnvironment_GlobalSummary = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironment_AppScope = Shared_NovaConfigEnvironmentApp | undefined;

export type Cli_Utility_Initialize_Runner_PromptEnvironment_AppVariables = Shared_NovaConfigEnvironmentValue[];

export type Cli_Utility_Initialize_Runner_PromptEnvironment_AppSummary = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironment_MenuOutputKey = 'action';

export type Cli_Utility_Initialize_Runner_PromptEnvironment_MenuOutputResult = Cli_Utility_Initialize_Runner_PromptEnvironment_Choice_Value;

export type Cli_Utility_Initialize_Runner_PromptEnvironment_MenuOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptEnvironment_MenuOutputKey, Cli_Utility_Initialize_Runner_PromptEnvironment_MenuOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptEnvironment_MenuOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptEnvironment_MenuOutputKey, Cli_Utility_Initialize_Runner_PromptEnvironment_MenuOutputResult>;

/**
 * CLI - Utility - Initialize - Prompt Environment Reconcile.
 *
 * @since 0.21.0
 */
export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_Config = Shared_NovaConfig;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_Mutate = boolean;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_Returns = Promise<void>;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_Environment = Shared_NovaConfigEnvironment;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_ManagedEntry_Name = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_ManagedEntry_Secret = boolean;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_ManagedEntry_Kind = 'app' | 'global' | 'workflow' | 'deploy-cred';

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_ManagedEntry = {
  name: Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_ManagedEntry_Name;
  secret: Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_ManagedEntry_Secret;
  kind: Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_ManagedEntry_Kind;
};

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_ManagedSet = Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_ManagedEntry[];

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_GithubState_Available = boolean;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_GithubState_Variables = string[];

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_GithubState_Secrets = string[];

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_GithubState = {
  available: Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_GithubState_Available;
  variables?: Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_GithubState_Variables;
  secrets?: Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_GithubState_Secrets;
};

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_StatusEntry_Name = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_StatusEntry_State = 'declared' | 'missing' | 'stale' | 'type-mismatch' | 'unmanaged' | 'empty-bake' | 'local-orphan' | 'optional-absent';

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_StatusEntry = {
  name: Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_StatusEntry_Name;
  state: Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_StatusEntry_State;
};

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_Status = Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_StatusEntry[];

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_StatusLines = string[];

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_LocalEnv = {
  [key: string]: string[];
};

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_LocalOrphanEntries = Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_StatusEntry[];

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_LocalOrphanLines = string[];

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_CombinedLines = string[];

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_StatusMessage = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_Plan_Create = string[];

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_Plan_Delete = string[];

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_Plan_Restore = string[];

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_Plan = {
  create: Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_Plan_Create;
  delete: Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_Plan_Delete;
  restore: Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_Plan_Restore;
};

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_SecretByName = Record<string, boolean>;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_ApplyResult_Available = boolean;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_ApplyResult_Done = string[];

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_ApplyResult_Remaining = string[];

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_ApplyResult = {
  available: Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_ApplyResult_Available;
  done: Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_ApplyResult_Done;
  remaining: Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_ApplyResult_Remaining;
};

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_ResultMessage = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_CreatedStubs = string[];

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcile_StubNotice = string;

/**
 * CLI - Utility - Initialize - Prompt Environment Reconcile Confirm.
 *
 * @since 0.21.0
 */
export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcileConfirm_PendingPlan_Create = string[];

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcileConfirm_PendingPlan_Delete = string[];

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcileConfirm_PendingPlan_Restore = string[];

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcileConfirm_PendingPlan = {
  create: Cli_Utility_Initialize_Runner_PromptEnvironmentReconcileConfirm_PendingPlan_Create;
  delete: Cli_Utility_Initialize_Runner_PromptEnvironmentReconcileConfirm_PendingPlan_Delete;
  restore: Cli_Utility_Initialize_Runner_PromptEnvironmentReconcileConfirm_PendingPlan_Restore;
};

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcileConfirm_Returns = Promise<boolean>;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcileConfirm_Summary = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcileConfirm_ConfirmOutputKey = 'confirm';

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcileConfirm_ConfirmOutputValue = boolean;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentReconcileConfirm_ConfirmOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptEnvironmentReconcileConfirm_ConfirmOutputKey, Cli_Utility_Initialize_Runner_PromptEnvironmentReconcileConfirm_ConfirmOutputValue> | Shared_PromptWithCancelReject;

/**
 * CLI - Utility - Initialize - Prompt Environment Scope.
 *
 * @since 0.21.0
 */
export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Config = Shared_NovaConfig;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Options_Scope = 'global' | 'app';

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Options_AppPath = string | undefined;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Options = {
  scope: Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Options_Scope;
  appPath: Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Options_AppPath;
};

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Returns = Promise<Extract<Shared_DialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_IsApp = boolean;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_AppPath = string | undefined;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Environment = Shared_NovaConfigEnvironment;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ExistingApps = Shared_NovaConfigEnvironment_Apps;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ExistingBlock = Shared_NovaConfigEnvironmentApp | Shared_NovaConfigEnvironmentGlobal | undefined;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Prefix = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Variables = Shared_NovaConfigEnvironmentValue[];

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Sync = () => Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Sync_Returns;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Choice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Choice_Description = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValuePrefix_Kind = 'prefix';

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValuePrefix = {
  kind: Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValuePrefix_Kind;
};

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueEdit_Kind = 'edit';

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueEdit_Index = number;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueEdit = {
  kind: Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueEdit_Kind;
  index: Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueEdit_Index;
};

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueRemove_Kind = 'remove';

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueRemove_Index = number;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueRemove = {
  kind: Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueRemove_Kind;
  index: Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueRemove_Index;
};

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueAdd_Kind = 'add';

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueAdd = {
  kind: Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueAdd_Kind;
};

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueBack_Kind = 'back';

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueBack = {
  kind: Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueBack_Kind;
};

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Choice_Value =
  Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValuePrefix
  | Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueEdit
  | Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueRemove
  | Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueAdd
  | Cli_Utility_Initialize_Runner_PromptEnvironmentScope_ChoiceValueBack;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Choice = {
  title: Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Choice_Title;
  description: Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Choice_Description;
  value: Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Choice_Value;
};

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Choices = Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Choice[];

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_PrefixDisplay = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Variable = Shared_NovaConfigEnvironmentValue | undefined;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_VariableKind = 'secret' | 'variable';

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_VariableLabel = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_MenuOutputKey = 'action';

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_MenuOutputResult = Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Choice_Value;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_MenuOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptEnvironmentScope_MenuOutputKey, Cli_Utility_Initialize_Runner_PromptEnvironmentScope_MenuOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_MenuOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptEnvironmentScope_MenuOutputKey, Cli_Utility_Initialize_Runner_PromptEnvironmentScope_MenuOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_PrefixOutputKey = 'prefix';

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_PrefixOutputValue = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_PrefixOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptEnvironmentScope_PrefixOutputKey, Cli_Utility_Initialize_Runner_PromptEnvironmentScope_PrefixOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_PrefixInput = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_AddValue = Shared_NovaConfigEnvironmentValue | undefined;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_EditIndex = number;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_EditValue = Shared_NovaConfigEnvironmentValue | undefined;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_RemoveIndex = number;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_VariableToRemove = Shared_NovaConfigEnvironmentValue | undefined;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_RemoveOutputKey = 'confirm';

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_RemoveOutputValue = boolean;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_RemoveOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptEnvironmentScope_RemoveOutputKey, Cli_Utility_Initialize_Runner_PromptEnvironmentScope_RemoveOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_DropLocalOutputKey = 'dropLocal';

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_DropLocalOutputValue = boolean;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_DropLocalOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptEnvironmentScope_DropLocalOutputKey, Cli_Utility_Initialize_Runner_PromptEnvironmentScope_DropLocalOutputValue> | Shared_PromptWithCancelReject;

/**
 * CLI - Utility - Initialize - Prompt Environment Scope - Sync.
 *
 * @since 0.21.0
 */
export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Sync_Returns = void;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Sync_HasContent = boolean;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Sync_NextEnvironment = Shared_NovaConfigEnvironment;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Sync_NextApps = Shared_NovaConfigEnvironment_Apps;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Sync_AppBlock = Shared_NovaConfigEnvironmentApp;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentScope_Sync_GlobalBlock = Shared_NovaConfigEnvironmentGlobal;

/**
 * CLI - Utility - Initialize - Prompt Environment Value Form.
 *
 * @since 0.21.0
 */
export type Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_Existing = Shared_NovaConfigEnvironmentValue | undefined;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_IsApp = boolean;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_Returns = Promise<Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_Value | undefined>;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_KeyOutputKey = 'key';

export type Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_KeyOutputValue = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_KeyOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_KeyOutputKey, Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_KeyOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_Key = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_SecretOutputKey = 'secret';

export type Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_SecretOutputValue = boolean;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_SecretOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_SecretOutputKey, Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_SecretOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_Secret = boolean;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_Value = Shared_NovaConfigEnvironmentValue;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_BuildOnlyOutputKey = 'buildOnly';

export type Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_BuildOnlyOutputValue = boolean;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_BuildOnlyOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_BuildOnlyOutputKey, Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_BuildOnlyOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_DefaultValueOutputKey = 'defaultValue';

export type Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_DefaultValueOutputValue = string;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_DefaultValueOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_DefaultValueOutputKey, Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_DefaultValueOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptEnvironmentValueForm_DefaultValue = string;

/**
 * CLI - Utility - Initialize - Prompt Flow.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptFlow_Config = Shared_NovaConfig;

export type Cli_Utility_Initialize_Runner_PromptFlow_Returns = Promise<Exclude<Shared_DialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptFlow_CategoryType_Label = string;

export type Cli_Utility_Initialize_Runner_PromptFlow_CategoryType_Description = string;

export type Cli_Utility_Initialize_Runner_PromptFlow_CategoryType_Handler = (config: Shared_NovaConfig) => Promise<Extract<Shared_DialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptFlow_CategoryType = {
  label: Cli_Utility_Initialize_Runner_PromptFlow_CategoryType_Label;
  description: Cli_Utility_Initialize_Runner_PromptFlow_CategoryType_Description;
  handler: Cli_Utility_Initialize_Runner_PromptFlow_CategoryType_Handler;
};

export type Cli_Utility_Initialize_Runner_PromptFlow_Category = Record<Shared_NovaConfigCategory, Cli_Utility_Initialize_Runner_PromptFlow_CategoryType>;

export type Cli_Utility_Initialize_Runner_PromptFlow_Choice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptFlow_Choice_Description = string;

export type Cli_Utility_Initialize_Runner_PromptFlow_Choice_Value = Shared_NovaConfigCategory | Exclude<Shared_DialogAction, 'back'>;

export type Cli_Utility_Initialize_Runner_PromptFlow_Choice = {
  title: Cli_Utility_Initialize_Runner_PromptFlow_Choice_Title;
  description: Cli_Utility_Initialize_Runner_PromptFlow_Choice_Description;
  value: Cli_Utility_Initialize_Runner_PromptFlow_Choice_Value;
};

export type Cli_Utility_Initialize_Runner_PromptFlow_CategoryKeys = Shared_NovaConfigCategory[];

export type Cli_Utility_Initialize_Runner_PromptFlow_Choices = Cli_Utility_Initialize_Runner_PromptFlow_Choice[];

export type Cli_Utility_Initialize_Runner_PromptFlow_SelectMenuOutputKey = 'action';

export type Cli_Utility_Initialize_Runner_PromptFlow_SelectMenuOutputResult = Shared_NovaConfigCategory | Exclude<Shared_DialogAction, 'back'>;

export type Cli_Utility_Initialize_Runner_PromptFlow_MenuOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptFlow_SelectMenuOutputKey, Cli_Utility_Initialize_Runner_PromptFlow_SelectMenuOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptFlow_MenuOutputResult = Record<Cli_Utility_Initialize_Runner_PromptFlow_SelectMenuOutputKey, Cli_Utility_Initialize_Runner_PromptFlow_SelectMenuOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptFlow_CategoryKey = Shared_NovaConfigCategory;

export type Cli_Utility_Initialize_Runner_PromptFlow_CategoryHandler = Cli_Utility_Initialize_Runner_PromptFlow_CategoryType_Handler;

/**
 * CLI - Utility - Initialize - Prompt GitHub.
 *
 * @since 0.16.0
 */
export type Cli_Utility_Initialize_Runner_PromptGithub_Config = Shared_NovaConfig;

export type Cli_Utility_Initialize_Runner_PromptGithub_Returns = Promise<Extract<Shared_DialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingGithub = Shared_NovaConfig_Github | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_Github = Partial<Shared_NovaConfig_Github>;

export type Cli_Utility_Initialize_Runner_PromptGithub_GithubOwnerValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptGithub_ValidateGithubOwner = (githubOwnerValue: Cli_Utility_Initialize_Runner_PromptGithub_GithubOwnerValue) => true | string;

export type Cli_Utility_Initialize_Runner_PromptGithub_OwnerOutput = Shared_PromptWithCancelResolved<'githubOwner', string> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_OwnerOutputResult = Record<'githubOwner', string>;

export type Cli_Utility_Initialize_Runner_PromptGithub_GithubOwnerInput = string;

export type Cli_Utility_Initialize_Runner_PromptGithub_GithubRepoValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptGithub_ValidateGithubRepo = (githubRepoValue: Cli_Utility_Initialize_Runner_PromptGithub_GithubRepoValue) => true | string;

export type Cli_Utility_Initialize_Runner_PromptGithub_RepoOutput = Shared_PromptWithCancelResolved<'githubRepo', string> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_RepoOutputResult = Record<'githubRepo', string>;

export type Cli_Utility_Initialize_Runner_PromptGithub_GithubRepoInput = string;

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingRecipes = Shared_NovaConfig_Recipes_Github | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_SyncIdentityInitial = boolean;

export type Cli_Utility_Initialize_Runner_PromptGithub_SyncFeaturesInitial = boolean;

export type Cli_Utility_Initialize_Runner_PromptGithub_SyncPoliciesInitial = boolean;

export type Cli_Utility_Initialize_Runner_PromptGithub_RecipesOutputKey =
  'githubRecipeSyncIdentity'
  | 'githubRecipeSyncFeatures'
  | 'githubRecipeSyncPolicies';

export type Cli_Utility_Initialize_Runner_PromptGithub_RecipesOutputValue = boolean;

export type Cli_Utility_Initialize_Runner_PromptGithub_RecipesOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptGithub_RecipesOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_RecipesOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_RecipesOutputResult = Record<Cli_Utility_Initialize_Runner_PromptGithub_RecipesOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_RecipesOutputValue>;

export type Cli_Utility_Initialize_Runner_PromptGithub_GithubRecipesInput = Shared_NovaConfig_Recipes_Github;

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingTopics = Shared_NovaConfig_Github_Topics | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsHasExisting = boolean;

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsTitle = string;

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsValue = Shared_NovaConfig_Github_Topics | Cli_Utility_Initialize_Runner_PromptGithub_TopicsSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsOutputKey = 'githubTopics';

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptGithub_TopicsOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_TopicsValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsSkip = 'skip';

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsOutputResult = Record<Cli_Utility_Initialize_Runner_PromptGithub_TopicsOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_TopicsValue>;

export type Cli_Utility_Initialize_Runner_PromptGithub_GithubTopicsInput = Shared_NovaConfig_Github_Topics | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_TopicsTextOutput = Shared_PromptWithCancelResolved<'githubOwner', string> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_RawTopics = string;

export type Cli_Utility_Initialize_Runner_PromptGithub_ParsedTopics = string[];

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingFeatures = Shared_NovaConfig_Github_Features | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_FeaturesIssuesInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_FeaturesWikiInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_FeaturesProjectsInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_FeaturesDiscussionsInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_FeaturesOutputKey =
  'githubFeaturesIssues'
  | 'githubFeaturesWiki'
  | 'githubFeaturesProjects'
  | 'githubFeaturesDiscussions';

export type Cli_Utility_Initialize_Runner_PromptGithub_FeaturesValue = boolean | Cli_Utility_Initialize_Runner_PromptGithub_FeaturesSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_FeaturesOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptGithub_FeaturesOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_FeaturesValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_FeaturesSkip = 'skip';

export type Cli_Utility_Initialize_Runner_PromptGithub_FeaturesOutputResult = Record<Cli_Utility_Initialize_Runner_PromptGithub_FeaturesOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_FeaturesValue>;

export type Cli_Utility_Initialize_Runner_PromptGithub_GithubFeaturesInput = Shared_NovaConfig_Github_Features | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_FeaturesIssuesValue = boolean | Cli_Utility_Initialize_Runner_PromptGithub_FeaturesSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_FeaturesWikiValue = boolean | Cli_Utility_Initialize_Runner_PromptGithub_FeaturesSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_FeaturesProjectsValue = boolean | Cli_Utility_Initialize_Runner_PromptGithub_FeaturesSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_FeaturesDiscussionsValue = boolean | Cli_Utility_Initialize_Runner_PromptGithub_FeaturesSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingPolicies = Shared_NovaConfig_Github_Policies | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingVisibility = string | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_VisibilityOrder = string[];

export type Cli_Utility_Initialize_Runner_PromptGithub_VisibilityInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesVisibilityOutputKey = 'githubPoliciesVisibility';

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesVisibilityValue = 'public' | 'private' | 'internal' | Cli_Utility_Initialize_Runner_PromptGithub_PoliciesVisibilitySkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_VisibilityOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptGithub_PoliciesVisibilityOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_PoliciesVisibilityValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesVisibilitySkip = 'skip';

export type Cli_Utility_Initialize_Runner_PromptGithub_VisibilityOutputResult = Record<Cli_Utility_Initialize_Runner_PromptGithub_PoliciesVisibilityOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_PoliciesVisibilityValue>;

export type Cli_Utility_Initialize_Runner_PromptGithub_GithubPoliciesVisibilityValue = 'public' | 'private' | 'internal' | Cli_Utility_Initialize_Runner_PromptGithub_PoliciesVisibilitySkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingDefaultBranch = string | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_DefaultBranchTitle = string;

export type Cli_Utility_Initialize_Runner_PromptGithub_DefaultBranchChoiceValue = string | Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_DefaultBranchInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchOutputKey = 'githubPoliciesDefaultBranch';

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchValue = string | Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_DefaultBranchOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchSkip = 'skip';

export type Cli_Utility_Initialize_Runner_PromptGithub_DefaultBranchOutputResult = Record<Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchValue>;

export type Cli_Utility_Initialize_Runner_PromptGithub_GithubPoliciesDefaultBranchValue = string | Cli_Utility_Initialize_Runner_PromptGithub_PoliciesDefaultBranchSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_DefaultBranchTextOutput = Shared_PromptWithCancelResolved<'githubRepo', string> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_RawDefaultBranch = string;

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingMergeMethods = Shared_NovaConfig_Github_Policies | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingMergeMethodsObj = Shared_NovaConfig_Github_Policies_MergeMethods | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_MergeInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_SquashInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_RebaseInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsOutputKey =
  'githubPoliciesMergeMethodsMerge'
  | 'githubPoliciesMergeMethodsSquash'
  | 'githubPoliciesMergeMethodsRebase';

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsValue = boolean | Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_MergeMethodsOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsSkip = 'skip';

export type Cli_Utility_Initialize_Runner_PromptGithub_MergeMethodsOutputResult = Record<Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsValue>;

export type Cli_Utility_Initialize_Runner_PromptGithub_GithubPoliciesMergeMethodsInput = Shared_NovaConfig_Github_Policies_MergeMethods | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_MergeMethodsMergeValue = boolean | Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_MergeMethodsSquashValue = boolean | Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_MergeMethodsRebaseValue = boolean | Cli_Utility_Initialize_Runner_PromptGithub_PoliciesMergeMethodsSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingAutoDelete = boolean | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_AutoDeleteInitial = number;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesAutoDeleteHeadBranchOutputKey = 'githubPoliciesAutoDeleteHeadBranch';

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesAutoDeleteHeadBranchValue = boolean | Cli_Utility_Initialize_Runner_PromptGithub_PoliciesAutoDeleteHeadBranchSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_AutoDeleteOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptGithub_PoliciesAutoDeleteHeadBranchOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_PoliciesAutoDeleteHeadBranchValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_PoliciesAutoDeleteHeadBranchSkip = 'skip';

export type Cli_Utility_Initialize_Runner_PromptGithub_AutoDeleteOutputResult = Record<Cli_Utility_Initialize_Runner_PromptGithub_PoliciesAutoDeleteHeadBranchOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_PoliciesAutoDeleteHeadBranchValue>;

export type Cli_Utility_Initialize_Runner_PromptGithub_GithubPoliciesAutoDeleteValue = boolean | Cli_Utility_Initialize_Runner_PromptGithub_PoliciesAutoDeleteHeadBranchSkip;

export type Cli_Utility_Initialize_Runner_PromptGithub_GithubPoliciesInput = Shared_NovaConfig_Github_Policies | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingGithubForIssueTemplate = Shared_NovaConfig_Github_IssueTemplate | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_ExistingBugReportFields = Shared_NovaConfig_Github_IssueTemplate_BugReportFields;

export type Cli_Utility_Initialize_Runner_PromptGithub_BugReportFieldsOutputKey = 'bugReportFields';

export type Cli_Utility_Initialize_Runner_PromptGithub_BugReportFieldsResult = Shared_NovaConfig_Github_IssueTemplate_BugReportFields;

export type Cli_Utility_Initialize_Runner_PromptGithub_IssueTemplateOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptGithub_BugReportFieldsOutputKey, Cli_Utility_Initialize_Runner_PromptGithub_BugReportFieldsResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGithub_BugReportFields = Shared_NovaConfig_Github_IssueTemplate_BugReportFields;

export type Cli_Utility_Initialize_Runner_PromptGithub_IssueTemplateInput = Shared_NovaConfig_Github_IssueTemplate | undefined;

export type Cli_Utility_Initialize_Runner_PromptGithub_GithubConfig = Partial<Shared_NovaConfig_Github>;

export type Cli_Utility_Initialize_Runner_PromptGithub_RecipesConfig = Shared_NovaConfig_Recipes;

/**
 * CLI - Utility - Initialize - Prompt GitHub - Validate GitHub Owner.
 *
 * @since 0.16.0
 */
export type Cli_Utility_Initialize_Runner_PromptGithub_ValidateGithubOwner_Trimmed = string;

/**
 * CLI - Utility - Initialize - Prompt GitHub - Validate GitHub Repo.
 *
 * @since 0.16.0
 */
export type Cli_Utility_Initialize_Runner_PromptGithub_ValidateGithubRepo_Trimmed = string;

/**
 * CLI - Utility - Initialize - Prompt Gitignore.
 *
 * @since 0.20.0
 */
export type Cli_Utility_Initialize_Runner_PromptGitignore_Config = Shared_NovaConfig;

export type Cli_Utility_Initialize_Runner_PromptGitignore_Returns = Promise<Extract<Shared_DialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptGitignore_Existing = Shared_NovaConfig_Gitignore | undefined;

export type Cli_Utility_Initialize_Runner_PromptGitignore_Excludes = string[];

export type Cli_Utility_Initialize_Runner_PromptGitignore_Imported = string[];

export type Cli_Utility_Initialize_Runner_PromptGitignore_Sync = () => Cli_Utility_Initialize_Runner_PromptGitignore_Sync_Returns;

export type Cli_Utility_Initialize_Runner_PromptGitignore_Choice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptGitignore_Choice_Description = string;

export type Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueAdd_Kind = 'add';

export type Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueAdd = {
  kind: Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueAdd_Kind;
};

export type Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueEdit_Kind = 'edit';

export type Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueEdit_Index = number;

export type Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueEdit = {
  kind: Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueEdit_Kind;
  index: Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueEdit_Index;
};

export type Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueRemove_Kind = 'remove';

export type Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueRemove_Index = number;

export type Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueRemove = {
  kind: Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueRemove_Kind;
  index: Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueRemove_Index;
};

export type Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueBack_Kind = 'back';

export type Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueBack = {
  kind: Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueBack_Kind;
};

export type Cli_Utility_Initialize_Runner_PromptGitignore_Choice_Value =
  Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueAdd
  | Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueEdit
  | Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueRemove
  | Cli_Utility_Initialize_Runner_PromptGitignore_ChoiceValueBack;

export type Cli_Utility_Initialize_Runner_PromptGitignore_Choice = {
  title: Cli_Utility_Initialize_Runner_PromptGitignore_Choice_Title;
  description: Cli_Utility_Initialize_Runner_PromptGitignore_Choice_Description;
  value: Cli_Utility_Initialize_Runner_PromptGitignore_Choice_Value;
};

export type Cli_Utility_Initialize_Runner_PromptGitignore_Choices = Cli_Utility_Initialize_Runner_PromptGitignore_Choice[];

export type Cli_Utility_Initialize_Runner_PromptGitignore_Pattern = string | undefined;

export type Cli_Utility_Initialize_Runner_PromptGitignore_MenuOutputKey = 'action';

export type Cli_Utility_Initialize_Runner_PromptGitignore_MenuOutputResult = Cli_Utility_Initialize_Runner_PromptGitignore_Choice_Value;

export type Cli_Utility_Initialize_Runner_PromptGitignore_MenuOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptGitignore_MenuOutputKey, Cli_Utility_Initialize_Runner_PromptGitignore_MenuOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGitignore_MenuOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptGitignore_MenuOutputKey, Cli_Utility_Initialize_Runner_PromptGitignore_MenuOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptGitignore_AddOutputKey = 'pattern';

export type Cli_Utility_Initialize_Runner_PromptGitignore_AddOutputValue = string;

export type Cli_Utility_Initialize_Runner_PromptGitignore_AddOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptGitignore_AddOutputKey, Cli_Utility_Initialize_Runner_PromptGitignore_AddOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGitignore_AddOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptGitignore_AddOutputKey, Cli_Utility_Initialize_Runner_PromptGitignore_AddOutputValue>;

export type Cli_Utility_Initialize_Runner_PromptGitignore_AddPattern = string;

export type Cli_Utility_Initialize_Runner_PromptGitignore_EditIndex = number;

export type Cli_Utility_Initialize_Runner_PromptGitignore_PatternToEdit = string | undefined;

export type Cli_Utility_Initialize_Runner_PromptGitignore_EditOutputKey = 'pattern';

export type Cli_Utility_Initialize_Runner_PromptGitignore_EditOutputValue = string;

export type Cli_Utility_Initialize_Runner_PromptGitignore_EditOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptGitignore_EditOutputKey, Cli_Utility_Initialize_Runner_PromptGitignore_EditOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGitignore_EditOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptGitignore_EditOutputKey, Cli_Utility_Initialize_Runner_PromptGitignore_EditOutputValue>;

export type Cli_Utility_Initialize_Runner_PromptGitignore_EditPattern = string;

export type Cli_Utility_Initialize_Runner_PromptGitignore_RemoveIndex = number;

export type Cli_Utility_Initialize_Runner_PromptGitignore_PatternToRemove = string | undefined;

export type Cli_Utility_Initialize_Runner_PromptGitignore_RemoveOutputKey = 'confirm';

export type Cli_Utility_Initialize_Runner_PromptGitignore_RemoveOutputValue = boolean;

export type Cli_Utility_Initialize_Runner_PromptGitignore_RemoveOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptGitignore_RemoveOutputKey, Cli_Utility_Initialize_Runner_PromptGitignore_RemoveOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptGitignore_RemoveOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptGitignore_RemoveOutputKey, Cli_Utility_Initialize_Runner_PromptGitignore_RemoveOutputValue>;

/**
 * CLI - Utility - Initialize - Prompt Gitignore - Sync.
 *
 * @since 0.20.0
 */
export type Cli_Utility_Initialize_Runner_PromptGitignore_Sync_Returns = void;

/**
 * CLI - Utility - Initialize - Prompt Project.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptProject_Config = Shared_NovaConfig;

export type Cli_Utility_Initialize_Runner_PromptProject_Returns = Promise<Extract<Shared_DialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptProject_ExistingProject = Shared_NovaConfig['project'];

export type Cli_Utility_Initialize_Runner_PromptProject_ExistingProjectName = Shared_NovaConfig_Project_Name | undefined;

export type Cli_Utility_Initialize_Runner_PromptProject_ExistingProjectDescription = Shared_NovaConfig_Project_Description | undefined;

export type Cli_Utility_Initialize_Runner_PromptProject_ExistingProjectKeywords = Shared_NovaConfig_Project_Keywords | undefined;

export type Cli_Utility_Initialize_Runner_PromptProject_ExistingProjectLegalName = Shared_NovaConfig_Project_LegalName | undefined;

export type Cli_Utility_Initialize_Runner_PromptProject_ExistingProjectPronouns = Shared_NovaConfig_Project_Pronouns | undefined;

export type Cli_Utility_Initialize_Runner_PromptProject_ExistingProjectPlatforms = Shared_NovaConfig_Project_Platforms | undefined;

export type Cli_Utility_Initialize_Runner_PromptProject_ExistingProjectStartingYear = Shared_NovaConfig_Project_StartingYear | undefined;

export type Cli_Utility_Initialize_Runner_PromptProject_ExistingProjectLicense = Shared_NovaConfig_Project_License | undefined;

export type Cli_Utility_Initialize_Runner_PromptProject_Project = Partial<Shared_NovaConfig['project'] & object>;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectName = Partial<Shared_NovaConfig_Project_Name>;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectDescription = Partial<Shared_NovaConfig_Project_Description>;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectKeywords = Shared_NovaConfig_Project_Keywords;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectNameTitleValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptProject_ValidateProjectNameTitle = (projectNameTitleValue: Cli_Utility_Initialize_Runner_PromptProject_ProjectNameTitleValue) => Cli_Utility_Initialize_Runner_PromptProject_ValidateProjectNameTitle_Result;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectNameSlugValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptProject_ValidateProjectNameSlug = (projectNameSlugValue: Cli_Utility_Initialize_Runner_PromptProject_ProjectNameSlugValue) => Cli_Utility_Initialize_Runner_PromptProject_ValidateProjectNameSlug_Result;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectDescriptionShortValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptProject_ValidateProjectDescriptionShort = (projectDescriptionShortValue: Cli_Utility_Initialize_Runner_PromptProject_ProjectDescriptionShortValue) => Cli_Utility_Initialize_Runner_PromptProject_ValidateProjectDescriptionShort_Result;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectDescriptionLongValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptProject_ValidateProjectDescriptionLong = (projectDescriptionLongValue: Cli_Utility_Initialize_Runner_PromptProject_ProjectDescriptionLongValue) => Cli_Utility_Initialize_Runner_PromptProject_ValidateProjectDescriptionLong_Result;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectKeywordsValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptProject_ValidateProjectKeywords = (projectKeywordsValue: Cli_Utility_Initialize_Runner_PromptProject_ProjectKeywordsValue) => Cli_Utility_Initialize_Runner_PromptProject_ValidateProjectKeywords_Result;

export type Cli_Utility_Initialize_Runner_PromptProject_ValidateProjectDescriptionLong_Result = Shared_NormalizedResult<string>['result'];

export type Cli_Utility_Initialize_Runner_PromptProject_ValidateProjectDescriptionShort_Result = Shared_NormalizedResult<string>['result'];

export type Cli_Utility_Initialize_Runner_PromptProject_ValidateProjectKeywords_Result = Shared_NormalizedResult<string[]>['result'];

export type Cli_Utility_Initialize_Runner_PromptProject_ValidateProjectNameSlug_Result = Shared_NormalizedResult<string>['result'];

export type Cli_Utility_Initialize_Runner_PromptProject_ValidateProjectNameTitle_Result = Shared_NormalizedResult<string>['result'];

export type Cli_Utility_Initialize_Runner_PromptProject_QuestionsOutputKey =
  'projectNameTitle'
  | 'projectNameSlug'
  | 'projectDescriptionShort'
  | 'projectDescriptionLong'
  | 'projectKeywords';

export type Cli_Utility_Initialize_Runner_PromptProject_QuestionsOutputResult = string;

export type Cli_Utility_Initialize_Runner_PromptProject_QuestionsOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptProject_QuestionsOutputKey, Cli_Utility_Initialize_Runner_PromptProject_QuestionsOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptProject_QuestionsOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptProject_QuestionsOutputKey, Cli_Utility_Initialize_Runner_PromptProject_QuestionsOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectNameTitleInput = Shared_NormalizedResult_Sanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectNameSlugInput = Shared_NormalizedResult_Sanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectDescriptionShortInput = Shared_NormalizedResult_Sanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectDescriptionLongInput = Shared_NormalizedResult_Sanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectKeywordsInput = Shared_NormalizedResult_Sanitized<string[]>;

export type Cli_Utility_Initialize_Runner_PromptProject_LegalNameOutputKey = 'projectLegalName';

export type Cli_Utility_Initialize_Runner_PromptProject_LegalNameOutputResult = string;

export type Cli_Utility_Initialize_Runner_PromptProject_LegalNameOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptProject_LegalNameOutputKey, Cli_Utility_Initialize_Runner_PromptProject_LegalNameOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectLegalNameInput = Shared_NormalizedResult_Sanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptProject_PronounsOutputKey = 'projectPronouns';

export type Cli_Utility_Initialize_Runner_PromptProject_PronounsOutputResult = Shared_NovaConfig_Project_Pronouns;

export type Cli_Utility_Initialize_Runner_PromptProject_PronounsOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptProject_PronounsOutputKey, Cli_Utility_Initialize_Runner_PromptProject_PronounsOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectPronounsInput = Shared_NovaConfig_Project_Pronouns;

export type Cli_Utility_Initialize_Runner_PromptProject_PlatformChoice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptProject_PlatformChoice_Value = Shared_NovaConfigProjectPlatform;

export type Cli_Utility_Initialize_Runner_PromptProject_PlatformChoice_Selected = boolean;

export type Cli_Utility_Initialize_Runner_PromptProject_PlatformChoice = {
  title: Cli_Utility_Initialize_Runner_PromptProject_PlatformChoice_Title;
  value: Cli_Utility_Initialize_Runner_PromptProject_PlatformChoice_Value;
  selected: Cli_Utility_Initialize_Runner_PromptProject_PlatformChoice_Selected;
};

export type Cli_Utility_Initialize_Runner_PromptProject_PlatformChoices = Cli_Utility_Initialize_Runner_PromptProject_PlatformChoice[];

export type Cli_Utility_Initialize_Runner_PromptProject_PlatformsOutputKey = 'projectPlatforms';

export type Cli_Utility_Initialize_Runner_PromptProject_PlatformsOutputResult = Shared_NovaConfigProjectPlatform[];

export type Cli_Utility_Initialize_Runner_PromptProject_PlatformsOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptProject_PlatformsOutputKey, Cli_Utility_Initialize_Runner_PromptProject_PlatformsOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectPlatformsInput = Shared_NovaConfig_Project_Platforms;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectStartingYearValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptProject_ValidateProjectStartingYear = (projectStartingYearValue: Cli_Utility_Initialize_Runner_PromptProject_ProjectStartingYearValue) => true | string;

export type Cli_Utility_Initialize_Runner_PromptProject_ValidateProjectStartingYear_Trimmed = string;

export type Cli_Utility_Initialize_Runner_PromptProject_ValidateProjectStartingYear_Parsed = number;

export type Cli_Utility_Initialize_Runner_PromptProject_StartingYearOutputKey = 'projectStartingYear';

export type Cli_Utility_Initialize_Runner_PromptProject_StartingYearOutputResult = string;

export type Cli_Utility_Initialize_Runner_PromptProject_StartingYearOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptProject_StartingYearOutputKey, Cli_Utility_Initialize_Runner_PromptProject_StartingYearOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptProject_StartingYearRaw = string;

export type Cli_Utility_Initialize_Runner_PromptProject_StartingYearParsed = number | undefined;

export type Cli_Utility_Initialize_Runner_PromptProject_LicenseChoice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptProject_LicenseChoice_Value = Shared_NovaConfig_Project_License;

export type Cli_Utility_Initialize_Runner_PromptProject_LicenseChoice = {
  title: Cli_Utility_Initialize_Runner_PromptProject_LicenseChoice_Title;
  value: Cli_Utility_Initialize_Runner_PromptProject_LicenseChoice_Value;
};

export type Cli_Utility_Initialize_Runner_PromptProject_LicenseChoices = Cli_Utility_Initialize_Runner_PromptProject_LicenseChoice[];

export type Cli_Utility_Initialize_Runner_PromptProject_LicenseInitialIndex = number;

export type Cli_Utility_Initialize_Runner_PromptProject_LicenseOutputKey = 'projectLicense';

export type Cli_Utility_Initialize_Runner_PromptProject_LicenseOutputResult = Shared_NovaConfig_Project_License;

export type Cli_Utility_Initialize_Runner_PromptProject_LicenseOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptProject_LicenseOutputKey, Cli_Utility_Initialize_Runner_PromptProject_LicenseOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptProject_ProjectLicenseInput = Shared_NovaConfig_Project_License;

export type Cli_Utility_Initialize_Runner_PromptProject_PreviousSlug = string;

export type Cli_Utility_Initialize_Runner_PromptProject_CurrentSlug = string;

export type Cli_Utility_Initialize_Runner_PromptProject_SlugChanged = boolean;

export type Cli_Utility_Initialize_Runner_PromptProject_RolesToSync = Shared_NovaConfigWorkspace_Role[];

export type Cli_Utility_Initialize_Runner_PromptProject_SlugPrefix = RegExp;

export type Cli_Utility_Initialize_Runner_PromptProject_PreviousLabel = string;

export type Cli_Utility_Initialize_Runner_PromptProject_CurrentLabel = string;

export type Cli_Utility_Initialize_Runner_PromptProject_Name = string;

/**
 * CLI - Utility - Initialize - Prompt URLs.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptUrls_Config = Shared_NovaConfig;

export type Cli_Utility_Initialize_Runner_PromptUrls_Returns = Promise<Extract<Shared_DialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptUrls_ExistingUrls = Shared_NovaConfig_Urls | undefined;

export type Cli_Utility_Initialize_Runner_PromptUrls_Urls = Partial<Shared_NovaConfig_Urls>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsHomepageValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsHomepage = (urlsHomepageValue: Cli_Utility_Initialize_Runner_PromptUrls_UrlsHomepageValue) => Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsHomepage_Result;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsRepositoryValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsRepository = (urlsRepositoryValue: Cli_Utility_Initialize_Runner_PromptUrls_UrlsRepositoryValue) => Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsRepository_Result;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsBugsValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsBugs = (urlsBugsValue: Cli_Utility_Initialize_Runner_PromptUrls_UrlsBugsValue) => Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsBugs_Result;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsLicenseValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsLicense = (urlsLicenseValue: Cli_Utility_Initialize_Runner_PromptUrls_UrlsLicenseValue) => Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsLicense_Result;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsLogoValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsLogo = (urlsLogoValue: Cli_Utility_Initialize_Runner_PromptUrls_UrlsLogoValue) => Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsLogo_Result;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsDocumentationValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsDocumentation = (urlsDocumentationValue: Cli_Utility_Initialize_Runner_PromptUrls_UrlsDocumentationValue) => Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsDocumentation_Result;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsNpmValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsNpm = (urlsNpmValue: Cli_Utility_Initialize_Runner_PromptUrls_UrlsNpmValue) => Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsNpm_Result;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsDockerValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsDocker = (urlsDockerValue: Cli_Utility_Initialize_Runner_PromptUrls_UrlsDockerValue) => Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsDocker_Result;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsFundSourcesValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsFundSources = (urlsFundSourcesValue: Cli_Utility_Initialize_Runner_PromptUrls_UrlsFundSourcesValue) => Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsFundSources_Result;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsPrivacyPolicyValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsPrivacyPolicy = (urlsPrivacyPolicyValue: Cli_Utility_Initialize_Runner_PromptUrls_UrlsPrivacyPolicyValue) => Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsPrivacyPolicy_Result;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsTermsOfUseValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsTermsOfUse = (urlsTermsOfUseValue: Cli_Utility_Initialize_Runner_PromptUrls_UrlsTermsOfUseValue) => Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsTermsOfUse_Result;

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsBugs_Result = Shared_NormalizedResult<string>['result'];

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsDocker_Result = Shared_NormalizedResult<string>['result'];

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsDocumentation_Result = Shared_NormalizedResult<string>['result'];

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsFundSources_Result = Shared_NormalizedResult<string[]>['result'];

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsHomepage_Result = Shared_NormalizedResult<string>['result'];

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsLicense_Result = Shared_NormalizedResult<string>['result'];

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsLogo_Result = Shared_NormalizedResult<string>['result'];

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsNpm_Result = Shared_NormalizedResult<string>['result'];

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsPrivacyPolicy_Result = Shared_NormalizedResult<string>['result'];

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsRepository_Result = Shared_NormalizedResult<string>['result'];

export type Cli_Utility_Initialize_Runner_PromptUrls_ValidateUrlsTermsOfUse_Result = Shared_NormalizedResult<string>['result'];

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

export type Cli_Utility_Initialize_Runner_PromptUrls_QuestionsOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptUrls_QuestionsOutputKey, Cli_Utility_Initialize_Runner_PromptUrls_QuestionsOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptUrls_QuestionsOutputResult = Record<Cli_Utility_Initialize_Runner_PromptUrls_QuestionsOutputKey, Cli_Utility_Initialize_Runner_PromptUrls_QuestionsOutputValue>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsHomepageInput = Shared_NormalizedResult_Sanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsRepositoryInput = Shared_NormalizedResult_Sanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsBugsInput = Shared_NormalizedResult_Sanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsLicenseInput = Shared_NormalizedResult_Sanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsLogoInput = Shared_NormalizedResult_Sanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsDocumentationInput = Shared_NormalizedResult_Sanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsNpmInput = Shared_NormalizedResult_Sanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsDockerInput = Shared_NormalizedResult_Sanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsFundSourcesInput = Shared_NormalizedResult_Sanitized<string[]>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsPrivacyPolicyInput = Shared_NormalizedResult_Sanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptUrls_UrlsTermsOfUseInput = Shared_NormalizedResult_Sanitized<string>;

/**
 * CLI - Utility - Initialize - Prompt With Cancel.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptWithCancel_Questions<Keys extends string> = PromptObject<Keys> | PromptObject<Keys>[];

export type Cli_Utility_Initialize_Runner_PromptWithCancel_Returns<Keys extends string, Result> = Promise<Shared_PromptWithCancelResolved<Keys, Result> | Shared_PromptWithCancelReject>;

export type Cli_Utility_Initialize_Runner_PromptWithCancel_Cancelled = boolean;

export type Cli_Utility_Initialize_Runner_PromptWithCancel_Result<Keys extends string, Result> = Record<Keys, Result>;

/**
 * CLI - Utility - Initialize - Prompt Workflows.
 *
 * @since 0.15.0
 */
export type Cli_Utility_Initialize_Runner_PromptWorkflows_Config = Shared_NovaConfig;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Returns = Promise<Extract<Shared_DialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Workflows = Shared_BlueprintConfig_Workflows;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_ConfigWorkflowsRaw = unknown;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_ConfigWorkflows = Shared_BlueprintConfig_Workflows;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_ClonedWorkflow = Shared_BlueprintConfigWorkflow;

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

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Sync = () => Cli_Utility_Initialize_Runner_PromptWorkflows_Sync_Returns;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_TemplateA = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_TemplateB = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_TemplateCompare = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_SuffixA = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_SuffixB = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Choices = Cli_Utility_Initialize_Runner_PromptWorkflows_Choice[];

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Workflow = Shared_BlueprintConfigWorkflow | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Template = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Suffix = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Triggers = Shared_BlueprintConfigWorkflow_Triggers;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_TriggerNames = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Label = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_TriggersLabel = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_OutputFileName = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Description = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_MenuOutputKey = 'action';

export type Cli_Utility_Initialize_Runner_PromptWorkflows_MenuOutputResult = Cli_Utility_Initialize_Runner_PromptWorkflows_Choice_Value;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_MenuOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflows_MenuOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflows_MenuOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_MenuOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflows_MenuOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflows_MenuOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Result = Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsApply | Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsBack;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_WorkflowIndex = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_WorkflowToEdit = Shared_BlueprintConfigWorkflow | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_WorkflowResult = Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsApply | Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsBack;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_RemoveWorkflowIndex = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_WorkflowToRemove = Shared_BlueprintConfigWorkflow | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_RemoveTemplate = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_RemoveSuffix = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_WorkflowLabel = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_ShouldRemove = boolean;

/**
 * CLI - Utility - Initialize - Prompt Workflows - Sync.
 *
 * @since 0.15.0
 */
export type Cli_Utility_Initialize_Runner_PromptWorkflows_Sync_Returns = void;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Sync_NormalizedWorkflows = Shared_BlueprintConfig_Workflows;

export type Cli_Utility_Initialize_Runner_PromptWorkflows_Sync_NormalizedWorkflow = Shared_BlueprintConfigWorkflow;

/**
 * CLI - Utility - Initialize - Prompt Workflows Delete Form.
 *
 * @since 0.15.0
 */
export type Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_Label = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_Returns = Promise<boolean>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_ConfirmOutputKey = 'confirm';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_ConfirmOutputValue = boolean;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_ConfirmOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_ConfirmOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_ConfirmOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_ConfirmOutputResult = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_ConfirmOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsDeleteForm_ConfirmOutputValue>;

/**
 * CLI - Utility - Initialize - Prompt Workflows Form.
 *
 * @since 0.15.0
 */
export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_Workflow = Shared_BlueprintConfigWorkflow | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_Mode = 'create' | 'update';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_Workflows = Shared_BlueprintConfig_Workflows;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_Config = Shared_NovaConfig;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsApply_Action = 'apply';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsApply_Workflow = Shared_BlueprintConfigWorkflow;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsApply = {
  action: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsApply_Action;
  workflow: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsApply_Workflow;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ReturnsBack_Action = Extract<Shared_DialogAction, 'back'>;

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

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExistingTriggers = Shared_BlueprintConfigWorkflow_Triggers;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExistingTriggerNames = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExistingDependsOn = Shared_BlueprintConfigTriggerObject_Workflows;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExistingTargets = Shared_BlueprintConfigWorkflow_Deploy;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExistingScopes = Shared_BlueprintConfigWorkflow_Build;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateChoices = Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateChoice[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateInitialIndex = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_FoundIndex = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateOutputKey = 'template';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateOutputResult = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TemplateOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SelectedTemplate = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SuffixOutputKey = 'suffix';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SuffixOutputResult = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SuffixOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SuffixOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SuffixOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_Trimmed = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_CompositeKey = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_EditIndex = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_IsDuplicate = boolean;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExistingKey = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SuffixOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SuffixOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SuffixOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SelectedSuffix = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersDir = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersDirExists = boolean;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SelectedTriggers = Shared_NovaConfigWorkflow_Triggers;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersFiles = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerChoice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerChoice_Value = Shared_NovaConfigWorkflowTrigger;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerChoice_Selected = boolean;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerChoice = {
  title: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerChoice_Title;
  value: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerChoice_Value;
  selected: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerChoice_Selected;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerChoices = Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerChoice[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggerName = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersOutputKey = 'triggers';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersOutputResult = Shared_NovaConfigWorkflowTrigger[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TriggersOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScheduleVariants = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SelectedDependsOn = Shared_BlueprintConfigTriggerObject_Workflows | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnChoice_Title = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnChoice_Value = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnChoice_Selected = boolean;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnChoice = {
  title: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnChoice_Title;
  value: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnChoice_Value;
  selected: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnChoice_Selected;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnChoices = Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnChoice[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnKey = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnOutputKey = 'dependsOn';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnOutputResult = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_DependsOnOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_MatchedMetadata = Lib_WorkflowTemplates_Entry | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_WorkspaceKeys = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SelectedTargets = Shared_BlueprintConfigWorkflow_Deploy;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_AvailableTargetTypes = string[];

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

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_CurrentTarget = Shared_BlueprintConfigDeployTarget | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_CurrentTargetType = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_CurrentTargetWorkingDir = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuOutputKey = 'targetAction';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuOutputResult = Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoice_Value;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuAction = Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMenuChoice_Value;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetToRemoveIndex = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetEditIndex = number;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetToEdit = Shared_BlueprintConfigDeployTarget | undefined;

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

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetTypeOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetTypeOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetTypeOutputResult> | Shared_PromptWithCancelReject;

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

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDirOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SelectedTargetWorkingDir = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetIsDuplicate = boolean;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SelectedTargetNeeds = Shared_BlueprintConfigDeployTarget_After | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetToEditExistingNeeds = Shared_BlueprintConfigDeployTarget_After;

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

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetNeedsOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetEntry_Type = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetEntry_WorkingDir = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetEntry_Needs = Shared_NovaConfigWorkflowTarget_Needs;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_NewTarget = Shared_BlueprintConfigDeployTarget;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetEntry = {
  type: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetEntry_Type;
  workingDir: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetEntry_WorkingDir;
  needs?: Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetEntry_Needs;
};

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SelectedScopes = Shared_BlueprintConfigWorkflow_Build;

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

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopesOutputResult = Shared_NovaConfigWorkflowScope[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopesOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopesOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopesOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopesOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopesOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ScopesOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExtraScopes = Shared_NovaConfigWorkflowScope[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_Settings = Record<string, string>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_MergedVariables = Shared_WorkflowTemplateVariables;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_VariableNameToTargetWorkingDir = Record<string, string>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetType = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetWorkingDir = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetMetadata = Shared_WorkflowTemplateTargets;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetVariables = Shared_WorkflowTemplateVariables;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetVariableEntry = [string, Shared_WorkflowTemplateVariable];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetVarEntries = Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetVariableEntry[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetVarKey = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetVarValue = Shared_WorkflowTemplateVariable;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetVariableNames = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_TargetVariableNameKey = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_VariableEntries = [string, Shared_WorkflowTemplateVariable][];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_VariableEntry = [string, Shared_WorkflowTemplateVariable];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_VariableName = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_VariableConfig = Shared_WorkflowTemplateVariable;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_PromptMessage = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_InitialValue = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_Parts = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExampleRaw = Shared_WorkflowTemplateVariable['example'];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExampleWorkingDir = string | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ExampleResolved = Shared_WorkflowTemplateVariable['example'];

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SettingsOutputKey = 'settingValue';

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SettingsOutputResult = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SettingsOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SettingsOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SettingsOutputResult> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SettingsOutputResultValue = Record<Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SettingsOutputKey, Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SettingsOutputResult>;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_SettingValue = string;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_IsDefaultRootWorkingDir = boolean;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ResolvedTriggers = Shared_BlueprintConfigWorkflow_Triggers;

export type Cli_Utility_Initialize_Runner_PromptWorkflowsForm_ResolvedWorkflow = Shared_BlueprintConfigWorkflow;

/**
 * CLI - Utility - Initialize - Prompt Workspaces.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptWorkspaces_Config = Shared_NovaConfig;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_Returns = Promise<Extract<Shared_DialogAction, 'back'>>;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_Workspaces = Shared_NovaConfig_Workspaces;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_Recipes = Shared_NovaConfig_Recipes;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_PackageJsonRecipes = Shared_NovaConfig_Recipes_PackageJson;

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

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_Workspace = Shared_NovaConfigWorkspace | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_SummaryParts = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_MenuOutputKey = 'workspacePath';

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_MenuOutputValue = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_MenuOutput = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkspaces_MenuOutputKey, Cli_Utility_Initialize_Runner_PromptWorkspaces_MenuOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_MenuOutputResult = Record<Cli_Utility_Initialize_Runner_PromptWorkspaces_MenuOutputKey, Cli_Utility_Initialize_Runner_PromptWorkspaces_MenuOutputValue>;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_WorkspacePath = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspaces_FormResult = Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply | Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsBack;

/**
 * CLI - Utility - Initialize - Prompt Workspaces Form.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options_WorkspacePath = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options_ExistingWorkspace = Shared_NovaConfigWorkspace | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options_ExistingPackageJsonRecipes = Shared_NovaConfig_Recipes_PackageJsonWorkspace | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options_ProjectSlug = Shared_NovaConfig_Project_Name_Slug | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options = {
  workspacePath: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options_WorkspacePath;
  existingWorkspace: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options_ExistingWorkspace;
  existingPackageJsonRecipes: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options_ExistingPackageJsonRecipes;
  projectSlug: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options_ProjectSlug;
};

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply_Action = 'apply';

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply_Workspace = Shared_NovaConfigWorkspace;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply_PackageJsonRecipes = Shared_NovaConfig_Recipes_PackageJsonWorkspace;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply = {
  action: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply_Action;
  workspace: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply_Workspace;
  packageJsonRecipes: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply_PackageJsonRecipes;
};

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsBack_Action = Extract<Shared_DialogAction, 'back'>;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsBack = {
  action: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsBack_Action;
};

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Returns = Promise<Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsApply | Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ReturnsBack>;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_AllowedRole_Title = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_AllowedRole_Description = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_AllowedRole_Value = Shared_NovaConfigWorkspace_Role;

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

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Policy = Record<Shared_NovaConfigWorkspace_Policy, Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyType>;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Role = Shared_NovaConfigWorkspace_Role;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName = (role: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Role) => Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_Returns;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ExistingRoleIndex = number;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RolePromptKey = 'workspaceRole';

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RolePromptValue = Shared_NovaConfigWorkspace_Role;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RolePrompt = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RolePromptKey, Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RolePromptValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_SelectedRole = Shared_NovaConfigWorkspace_Role;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_AllowedPolicies = Shared_NovaConfigWorkspace_Policy[];

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ExistingPolicyIndex = number;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyPromptKey = 'workspacePolicy';

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyPromptValue = Shared_NovaConfigWorkspace_Policy;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyPrompt = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyPromptKey, Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyPromptValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyEntry = Cli_Utility_Initialize_Runner_PromptWorkspacesForm_PolicyType;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_SelectedPolicy = Shared_NovaConfigWorkspace_Policy;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolvedName = string | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_WorkspaceDisplayNameValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ValidateWorkspaceDisplayName = (workspaceDisplayNameValue: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_WorkspaceDisplayNameValue) => Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ValidateWorkspaceDisplayName_Result;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_DisplayNamePromptKey = 'workspaceDisplayName';

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_DisplayNamePromptValue = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_DisplayNamePrompt = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkspacesForm_DisplayNamePromptKey, Cli_Utility_Initialize_Runner_PromptWorkspacesForm_DisplayNamePromptValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_WorkspaceDisplayNameInput = Shared_NormalizedResult_Sanitized<string>;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ExistingRecipes = Shared_NovaConfig_Recipes_PackageJsonWorkspace | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipesPromptKey = 'workspaceRecipes';

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipesPromptValue = Shared_NovaConfigWorkspaceRecipeName[];

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipesPrompt = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipesPromptKey, Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipesPromptValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeEntry = Shared_NovaConfig_RecipeEntry | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeSelected = boolean;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_SelectedRecipes = Shared_NovaConfigWorkspaceRecipeName[];

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Recipes = Shared_NovaConfig_Recipes_PackageJsonWorkspace;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ExistingEntry = Shared_NovaConfig_RecipeEntry | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ExistingSettings = Shared_NovaConfig_RecipeEntry_Settings | undefined;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeSettingsPromptKey = 'workspaceRecipeSettings';

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeSettingsPromptValue = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_IdentitySettingsPrompt = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeSettingsPromptKey, Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeSettingsPromptValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_IdentitySelectedSettings = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_IdentitySettings = Shared_NovaConfigWorkspaceRecipeSettings;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_OwnershipSettingsPrompt = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeSettingsPromptKey, Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeSettingsPromptValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_OwnershipSelectedSettings = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_OwnershipSettings = Shared_NovaConfigWorkspaceRecipeSettings;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_EnvironmentSettingsPrompt = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeSettingsPromptKey, Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeSettingsPromptValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_EnvironmentSelectedSettings = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_EnvironmentSettings = Shared_NovaConfigWorkspaceRecipeSettings;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_CleanupSettingsPrompt = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeSettingsPromptKey, Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeSettingsPromptValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_CleanupSelectedSettings = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_CleanupSettings = Shared_NovaConfigWorkspaceRecipeSettings;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_DependenciesSettingsPrompt = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeSettingsPromptKey, Cli_Utility_Initialize_Runner_PromptWorkspacesForm_RecipeSettingsPromptValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_DependenciesSelectedSettings = string[];

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_DependenciesSettings = Shared_NovaConfigWorkspaceRecipeSettings;

/**
 * CLI - Utility - Initialize - Prompt Workspaces Form - Resolve Name.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_Returns = Promise<string | undefined>;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_Base = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_WorkspaceNameValue = unknown;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_ValidateWorkspaceName = (workspaceNameValue: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_WorkspaceNameValue) => Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_ValidateWorkspaceName_Result;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_PromptKey = 'workspaceName';

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_PromptValue = string;

export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_NamePrompt = Shared_PromptWithCancelResolved<Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_PromptKey, Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_PromptValue> | Shared_PromptWithCancelReject;

/**
 * CLI - Utility - Initialize - Prompt Workspaces Form - Resolve Name - Validate Workspace Name.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ResolveName_ValidateWorkspaceName_Result = Shared_NormalizedResult<string>['result'];

/**
 * CLI - Utility - Initialize - Prompt Workspaces Form - Validate Workspace Display Name.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_PromptWorkspacesForm_ValidateWorkspaceDisplayName_Result = Shared_NormalizedResult<string>['result'];

/**
 * CLI - Utility - Initialize - Read Local Filled Keys.
 *
 * @since 0.21.0
 */
export type Cli_Utility_Initialize_Runner_ReadLocalFilledKeys_Config = Shared_NovaConfig;

export type Cli_Utility_Initialize_Runner_ReadLocalFilledKeys_Returns = Promise<Cli_Utility_Initialize_Runner_ReadLocalFilledKeys_Result>;

export type Cli_Utility_Initialize_Runner_ReadLocalFilledKeys_Environment = Shared_NovaConfigEnvironment;

export type Cli_Utility_Initialize_Runner_ReadLocalFilledKeys_Apps = Shared_NovaConfigEnvironment_Apps;

export type Cli_Utility_Initialize_Runner_ReadLocalFilledKeys_Result = {
  [key: string]: string[];
};

export type Cli_Utility_Initialize_Runner_ReadLocalFilledKeys_Filled = string[];

export type Cli_Utility_Initialize_Runner_ReadLocalFilledKeys_EnvPath = string;

export type Cli_Utility_Initialize_Runner_ReadLocalFilledKeys_Raw = string;

export type Cli_Utility_Initialize_Runner_ReadLocalFilledKeys_KeyMatch = RegExpMatchArray | null;

export type Cli_Utility_Initialize_Runner_ReadLocalFilledKeys_SeparatorIndex = number;

export type Cli_Utility_Initialize_Runner_ReadLocalFilledKeys_RawValue = string;

export type Cli_Utility_Initialize_Runner_ReadLocalFilledKeys_Inner = string;

/**
 * CLI - Utility - Initialize - Run.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Initialize_Runner_Run_Options_DryRun = true;

export type Cli_Utility_Initialize_Runner_Run_Options_ReplaceFile = true;

export type Cli_Utility_Initialize_Runner_Run_Options_Status = true;

export type Cli_Utility_Initialize_Runner_Run_Options = {
  dryRun?: Cli_Utility_Initialize_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Utility_Initialize_Runner_Run_Options_ReplaceFile;
  status?: Cli_Utility_Initialize_Runner_Run_Options_Status;
};

export type Cli_Utility_Initialize_Runner_Run_Returns = Promise<void>;

export type Cli_Utility_Initialize_Runner_Run_CurrentDirectory = string;

export type Cli_Utility_Initialize_Runner_Run_IsProjectRoot = boolean;

export type Cli_Utility_Initialize_Runner_Run_IsDryRun = boolean;

export type Cli_Utility_Initialize_Runner_Run_IsReplaceFile = boolean;

export type Cli_Utility_Initialize_Runner_Run_ReplaceFileNotice = string;

export type Cli_Utility_Initialize_Runner_Run_NovaConfig = LibNovaConfig;

export type Cli_Utility_Initialize_Runner_Run_WorkingFile = Shared_NovaConfig;

export type Cli_Utility_Initialize_Runner_Run_PromptFlowResult = Exclude<Shared_DialogAction, 'back'>;
