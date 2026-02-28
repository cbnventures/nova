import type { PromptObject } from 'prompts';

import type {
  DialogAction,
  EntityMenuAction,
  NormalizedResult,
  NovaConfig,
  NovaConfigCategory,
  NovaConfigEntities,
  NovaConfigEntity,
  NovaConfigEntityRole,
  NovaConfigWorkspace,
  NovaConfigWorkspacePolicy,
  NovaConfigWorkspaceRole,
  NovaConfigWorkspaces,
  NovaConfigWorkspaceSyncProperty,
  UrlProtocol,
} from '@/types/shared.d.ts';

/**
 * CLI Utility - Initialize - Check path.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializeCheckPathCurrentDirectory = string;

export type CLIUtilityInitializeCheckPathReturns = Promise<boolean>;

/**
 * CLI Utility - Initialize - Normalize email.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializeNormalizeEmailValue = unknown;

export type CLIUtilityInitializeNormalizeEmailReturns = NormalizedResult<string>;

/**
 * CLI Utility - Initialize - Normalize project slug.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializeNormalizeProjectSlugValue = unknown;

export type CLIUtilityInitializeNormalizeProjectSlugReturns = NormalizedResult<string>;

/**
 * CLI Utility - Initialize - Normalize text.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializeNormalizeTextValue = unknown;

export type CLIUtilityInitializeNormalizeTextMaxLength = number;

export type CLIUtilityInitializeNormalizeTextReturns = NormalizedResult<string>;

/**
 * CLI Utility - Initialize - Normalize text array.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializeNormalizeTextArrayValue = unknown;

export type CLIUtilityInitializeNormalizeTextArrayMaxLengthPerItem = number;

export type CLIUtilityInitializeNormalizeTextArrayReturns = NormalizedResult<string[]>;

/**
 * CLI Utility - Initialize - Normalize url.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializeNormalizeUrlValue = unknown;

export type CLIUtilityInitializeNormalizeUrlProtocol = UrlProtocol;

export type CLIUtilityInitializeNormalizeUrlReturns = NormalizedResult<string>;

/**
 * CLI Utility - Initialize - Normalize url array.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializeNormalizeUrlArrayValue = unknown;

export type CLIUtilityInitializeNormalizeUrlArrayProtocol = UrlProtocol;

export type CLIUtilityInitializeNormalizeUrlArrayReturns = NormalizedResult<string[]>;

/**
 * CLI Utility - Initialize - Normalize workspace name.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializeNormalizeWorkspaceNameValue = unknown;

export type CLIUtilityInitializeNormalizeWorkspaceNameRole = NovaConfigWorkspaceRole;

export type CLIUtilityInitializeNormalizeWorkspaceNameBase = string;

export type CLIUtilityInitializeNormalizeWorkspaceNameReturns = NormalizedResult<string>;

/**
 * CLI Utility - Initialize - Prompt emails.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializePromptEmailsConfig = NovaConfig;

export type CLIUtilityInitializePromptEmailsReturns = Promise<Extract<DialogAction, 'back'>>;

export type CLIUtilityInitializePromptEmailsQuestionsOutputKey =
  'emailsBugs';

export type CLIUtilityInitializePromptEmailsQuestionsOutputValue = string;

/**
 * CLI Utility - Initialize - Prompt entities.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializePromptEntitiesConfig = NovaConfig;

export type CLIUtilityInitializePromptEntitiesReturns = Promise<Extract<DialogAction, 'back'>>;

export type CLIUtilityInitializePromptEntitiesEntities = NovaConfigEntities;

export type CLIUtilityInitializePromptEntitiesChoiceTitle = string;

export type CLIUtilityInitializePromptEntitiesChoiceDescription = string;

export type CLIUtilityInitializePromptEntitiesChoiceValue = EntityMenuAction;

export type CLIUtilityInitializePromptEntitiesChoice = {
  title: CLIUtilityInitializePromptEntitiesChoiceTitle;
  description: CLIUtilityInitializePromptEntitiesChoiceDescription;
  value: CLIUtilityInitializePromptEntitiesChoiceValue;
};

export type CLIUtilityInitializePromptEntitiesChoices = CLIUtilityInitializePromptEntitiesChoice[];

export type CLIUtilityInitializePromptEntitiesDescriptionParts = string[];

export type CLIUtilityInitializePromptEntitiesNormalizedRolesReduce = string[];

export type CLIUtilityInitializePromptEntitiesMenuOutputKeys = 'action';

export type CLIUtilityInitializePromptEntitiesMenuOutputResult = EntityMenuAction;

/**
 * CLI Utility - Initialize - Prompt entities - Sync.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializePromptEntitiesSyncReturns = void;

/**
 * CLI Utility - Initialize - Prompt entities delete form.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializePromptEntitiesDeleteFormLabel = string;

export type CLIUtilityInitializePromptEntitiesDeleteFormReturns = Promise<boolean>;

export type CLIUtilityInitializePromptEntitiesDeleteFormConfirmOutputKey = 'confirm';

export type CLIUtilityInitializePromptEntitiesDeleteFormConfirmOutputValue = boolean;

/**
 * CLI Utility - Initialize - Prompt entities form.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializePromptEntitiesFormEntity = NovaConfigEntity | undefined;

export type CLIUtilityInitializePromptEntitiesFormMode = 'create' | 'update';

export type CLIUtilityInitializePromptEntitiesFormReturnsApplyAction = 'apply';

export type CLIUtilityInitializePromptEntitiesFormReturnsApplyEntity = NovaConfigEntity;

export type CLIUtilityInitializePromptEntitiesFormReturnsApply = {
  action: CLIUtilityInitializePromptEntitiesFormReturnsApplyAction;
  entity: CLIUtilityInitializePromptEntitiesFormReturnsApplyEntity;
};

export type CLIUtilityInitializePromptEntitiesFormReturnsBackAction = Extract<DialogAction, 'back'>;

export type CLIUtilityInitializePromptEntitiesFormReturnsBack = {
  action: CLIUtilityInitializePromptEntitiesFormReturnsBackAction;
};

export type CLIUtilityInitializePromptEntitiesFormReturns = Promise<CLIUtilityInitializePromptEntitiesFormReturnsApply | CLIUtilityInitializePromptEntitiesFormReturnsBack>;

export type CLIUtilityInitializePromptEntitiesFormValidRoles = NovaConfigEntityRole[];

export type CLIUtilityInitializePromptEntitiesFormExistingRoles = NovaConfigEntityRole[];

export type CLIUtilityInitializePromptEntitiesFormQuestionsOutputKey = 'entityName' | 'entityEmail' | 'entityUrl' | 'entityRoles';

export type CLIUtilityInitializePromptEntitiesFormQuestionsOutputValue<Key extends CLIUtilityInitializePromptEntitiesFormQuestionsOutputKey> = Key extends 'entityRoles' ? NovaConfigEntityRole[] : string;

export type CLIUtilityInitializePromptEntitiesFormResolvedEntity = NovaConfigEntity;

/**
 * CLI Utility - Initialize - Prompt flow.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializePromptFlowConfig = NovaConfig;

export type CLIUtilityInitializePromptFlowReturns = Promise<Exclude<DialogAction, 'back'>>;

export type CLIUtilityInitializePromptFlowCategoryTypeLabel = string;

export type CLIUtilityInitializePromptFlowCategoryTypeDescription = string;

export type CLIUtilityInitializePromptFlowCategoryTypeHandler = (config: NovaConfig) => Promise<Extract<DialogAction, 'back'>>;

export type CLIUtilityInitializePromptFlowCategoryType = {
  label: CLIUtilityInitializePromptFlowCategoryTypeLabel;
  description: CLIUtilityInitializePromptFlowCategoryTypeDescription;
  handler: CLIUtilityInitializePromptFlowCategoryTypeHandler;
};

export type CLIUtilityInitializePromptFlowCategory = Record<NovaConfigCategory, CLIUtilityInitializePromptFlowCategoryType>;

export type CLIUtilityInitializePromptFlowChoiceTitle = string;

export type CLIUtilityInitializePromptFlowChoiceDescription = string;

export type CLIUtilityInitializePromptFlowChoiceValue = NovaConfigCategory | Exclude<DialogAction, 'back'>;

export type CLIUtilityInitializePromptFlowChoice = {
  title: CLIUtilityInitializePromptFlowChoiceTitle;
  description: CLIUtilityInitializePromptFlowChoiceDescription;
  value: CLIUtilityInitializePromptFlowChoiceValue;
};

export type CLIUtilityInitializePromptFlowChoices = CLIUtilityInitializePromptFlowChoice[];

export type CLIUtilityInitializePromptFlowSelectMenuOutputKeys = 'action';

export type CLIUtilityInitializePromptFlowSelectMenuOutputResult = NovaConfigCategory | Exclude<DialogAction, 'back'>;

/**
 * CLI Utility - Initialize - Prompt project.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializePromptProjectConfig = NovaConfig;

export type CLIUtilityInitializePromptProjectReturns = Promise<Extract<DialogAction, 'back'>>;

export type CLIUtilityInitializePromptProjectQuestionsOutputKeys =
  'projectNameTitle'
  | 'projectNameSlug'
  | 'projectDescriptionShort'
  | 'projectDescriptionLong'
  | 'projectKeywords';

export type CLIUtilityInitializePromptProjectQuestionsOutputResult = string;

export type CLIUtilityInitializePromptProjectRolesToSync = NovaConfigWorkspaceRole[];

/**
 * CLI Utility - Initialize - Prompt urls.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializePromptUrlsConfig = NovaConfig;

export type CLIUtilityInitializePromptUrlsReturns = Promise<Extract<DialogAction, 'back'>>;

export type CLIUtilityInitializePromptUrlsQuestionsOutputKey =
  'urlsHomepage'
  | 'urlsRepository'
  | 'urlsBugs'
  | 'urlsLicense'
  | 'urlsLogo'
  | 'urlsDocumentation'
  | 'urlsGithub'
  | 'urlsNpm'
  | 'urlsFundSources';

export type CLIUtilityInitializePromptUrlsQuestionsOutputValue = string;

/**
 * CLI Utility - Initialize - Prompt with cancel.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializePromptWithCancelQuestions<Keys extends string> = PromptObject<Keys> | PromptObject<Keys>[];

export type CLIUtilityInitializePromptWithCancelReturnsResolvedCancelled = false;

export type CLIUtilityInitializePromptWithCancelReturnsResolvedResult<Keys extends string, Result> = Record<Keys, Result>;

export type CLIUtilityInitializePromptWithCancelReturnsResolved<Keys extends string, Result> = {
  cancelled: CLIUtilityInitializePromptWithCancelReturnsResolvedCancelled;
  result: CLIUtilityInitializePromptWithCancelReturnsResolvedResult<Keys, Result>;
};

export type CLIUtilityInitializePromptWithCancelReturnsRejectCancelled = true;

export type CLIUtilityInitializePromptWithCancelReturnsReject = {
  cancelled: CLIUtilityInitializePromptWithCancelReturnsRejectCancelled;
};

export type CLIUtilityInitializePromptWithCancelReturns<Keys extends string, Result> = Promise<CLIUtilityInitializePromptWithCancelReturnsResolved<Keys, Result> | CLIUtilityInitializePromptWithCancelReturnsReject>;

/**
 * CLI Utility - Initialize - Prompt workspaces.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializePromptWorkspacesConfig = NovaConfig;

export type CLIUtilityInitializePromptWorkspacesReturns = Promise<Extract<DialogAction, 'back'>>;

export type CLIUtilityInitializePromptWorkspaces = NovaConfigWorkspaces;

export type CLIUtilityInitializePromptWorkspacesSummaryParts = string[];

export type CLIUtilityInitializePromptWorkspacesMenuOutputKey = 'workspacePath';

export type CLIUtilityInitializePromptWorkspacesMenuOutputValue = string;

/**
 * CLI Utility - Initialize - Prompt workspaces form.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializePromptWorkspacesFormOptionsWorkspacePath = string;

export type CLIUtilityInitializePromptWorkspacesFormOptionsExistingWorkspace = NovaConfigWorkspace | undefined;

export type CLIUtilityInitializePromptWorkspacesFormOptionsProjectSlug = string | undefined;

export type CLIUtilityInitializePromptWorkspacesFormOptions = {
  workspacePath: CLIUtilityInitializePromptWorkspacesFormOptionsWorkspacePath;
  existingWorkspace: CLIUtilityInitializePromptWorkspacesFormOptionsExistingWorkspace;
  projectSlug: CLIUtilityInitializePromptWorkspacesFormOptionsProjectSlug;
};

export type CLIUtilityInitializePromptWorkspacesFormReturnsApplyAction = 'apply';

export type CLIUtilityInitializePromptWorkspacesFormReturnsApplyWorkspace = NovaConfigWorkspace;

export type CLIUtilityInitializePromptWorkspacesFormReturnsApply = {
  action: CLIUtilityInitializePromptWorkspacesFormReturnsApplyAction;
  workspace: CLIUtilityInitializePromptWorkspacesFormReturnsApplyWorkspace;
};

export type CLIUtilityInitializePromptWorkspacesFormReturnsBackAction = Extract<DialogAction, 'back'>;

export type CLIUtilityInitializePromptWorkspacesFormReturnsBack = {
  action: CLIUtilityInitializePromptWorkspacesFormReturnsBackAction;
};

export type CLIUtilityInitializePromptWorkspacesFormReturns = Promise<CLIUtilityInitializePromptWorkspacesFormReturnsApply | CLIUtilityInitializePromptWorkspacesFormReturnsBack>;

export type CLIUtilityInitializePromptWorkspacesFormAllowedRoleTitle = string;

export type CLIUtilityInitializePromptWorkspacesFormAllowedRoleDescription = string;

export type CLIUtilityInitializePromptWorkspacesFormAllowedRoleValue = NovaConfigWorkspaceRole;

export type CLIUtilityInitializePromptWorkspacesFormAllowedRole = {
  title: CLIUtilityInitializePromptWorkspacesFormAllowedRoleTitle;
  description: CLIUtilityInitializePromptWorkspacesFormAllowedRoleDescription;
  value: CLIUtilityInitializePromptWorkspacesFormAllowedRoleValue;
};

export type CLIUtilityInitializePromptWorkspacesFormAllowedRoles = CLIUtilityInitializePromptWorkspacesFormAllowedRole[];

export type CLIUtilityInitializePromptWorkspacesFormPolicyTypeLabel = string;

export type CLIUtilityInitializePromptWorkspacesFormPolicyTypeDescription = string;

export type CLIUtilityInitializePromptWorkspacesFormPolicyType = {
  label: CLIUtilityInitializePromptWorkspacesFormPolicyTypeLabel;
  description: CLIUtilityInitializePromptWorkspacesFormPolicyTypeDescription;
};

export type CLIUtilityInitializePromptWorkspacesFormPolicy = Record<NovaConfigWorkspacePolicy, CLIUtilityInitializePromptWorkspacesFormPolicyType>;

export type CLIUtilityInitializePromptWorkspacesFormRolePromptKey = 'workspaceRole';

export type CLIUtilityInitializePromptWorkspacesFormRolePromptValue = NovaConfigWorkspaceRole;

export type CLIUtilityInitializePromptWorkspacesFormPolicyPromptKey = 'workspacePolicy';

export type CLIUtilityInitializePromptWorkspacesFormPolicyPromptValue = NovaConfigWorkspacePolicy;

export type CLIUtilityInitializePromptWorkspacesFormSyncPropertiesPromptKey = 'workspaceSyncProperties';

export type CLIUtilityInitializePromptWorkspacesFormSyncPropertiesPromptValue = NovaConfigWorkspaceSyncProperty[];

export type CLIUtilityInitializePromptWorkspacesFormPinVersionsPromptKey = 'workspacePinVersions';

export type CLIUtilityInitializePromptWorkspacesFormPinVersionsPromptValue = boolean;

export type CLIUtilityInitializePromptWorkspacesFormSyncLtsEnginesPromptKey = 'workspaceSyncLtsEngines';

export type CLIUtilityInitializePromptWorkspacesFormSyncLtsEnginesPromptValue = boolean;

/**
 * CLI Utility - Initialize - Prompt workspaces form - Resolve name.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializePromptWorkspacesFormResolveNameRole = NovaConfigWorkspaceRole;

export type CLIUtilityInitializePromptWorkspacesFormResolveNameReturns = Promise<string | undefined>;

/**
 * CLI Utility - Initialize - Run.
 *
 * @since 1.0.0
 */
export type CLIUtilityInitializeRunOptionsDryRun = true;

export type CLIUtilityInitializeRunOptionsReplaceFile = true;

export type CLIUtilityInitializeRunOptions = {
  dryRun?: CLIUtilityInitializeRunOptionsDryRun;
  replaceFile?: CLIUtilityInitializeRunOptionsReplaceFile;
};

export type CLIUtilityInitializeRunReturns = Promise<void>;
