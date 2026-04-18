import type { PromptObject } from 'prompts';

import type { LibNovaConfig } from '../../../lib/nova-config.js';

import type {
  LibWorkflowTemplatesEntry,
  LibWorkflowTemplatesVariable,
} from '../../lib/workflow-templates.d.ts';

import type {
  SharedDialogAction,
  SharedEntityMenuAction,
  SharedNormalizedResult,
  SharedNormalizedResultSanitized,
  SharedNovaConfig,
  SharedNovaConfigCategory,
  SharedNovaConfigEmails,
  SharedNovaConfigEntities,
  SharedNovaConfigEntity,
  SharedNovaConfigEntityRole,
  SharedNovaConfigEntityRoles,
  SharedNovaConfigProjectDescription,
  SharedNovaConfigProjectKeywords,
  SharedNovaConfigProjectLegalName,
  SharedNovaConfigProjectLicense,
  SharedNovaConfigProjectName,
  SharedNovaConfigProjectNameSlug,
  SharedNovaConfigProjectPlatform,
  SharedNovaConfigProjectPlatforms,
  SharedNovaConfigProjectPronouns,
  SharedNovaConfigProjectStartingYear,
  SharedNovaConfigUrls,
  SharedNovaConfigWorkflow,
  SharedNovaConfigWorkflowDependsOn,
  SharedNovaConfigWorkflows,
  SharedNovaConfigWorkflowTrigger,
  SharedNovaConfigWorkflowTriggers,
  SharedNovaConfigWorkspace,
  SharedNovaConfigWorkspacePolicy,
  SharedNovaConfigWorkspaceRecipeName,
  SharedNovaConfigWorkspaceRecipes,
  SharedNovaConfigWorkspaceRecipeSettings,
  SharedNovaConfigWorkspaceRecipeTuple,
  SharedNovaConfigWorkspaceRole,
  SharedNovaConfigWorkspaces,
  SharedPromptWithCancelReject,
  SharedPromptWithCancelResolved,
  SharedUrlProtocol,
} from '../../shared.d.ts';

/**
 * CLI - Utility - Initialize - Check Path.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializeCheckPathCurrentDirectory = string;

export type CliUtilityInitializeCheckPathReturns = Promise<boolean>;

export type CliUtilityInitializeCheckPathLocations = string[];

export type CliUtilityInitializeCheckPathLessThanOneMessage = string;

export type CliUtilityInitializeCheckPathGreaterThanOneMessage = string;

export type CliUtilityInitializeCheckPathNotProjectRootDirectoryMessage = string;

/**
 * CLI - Utility - Initialize - Normalize Email.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializeNormalizeEmailValue = unknown;

export type CliUtilityInitializeNormalizeEmailReturns = SharedNormalizedResult<string>;

export type CliUtilityInitializeNormalizeEmailTrimmedValue = string;

/**
 * CLI - Utility - Initialize - Normalize Project Slug.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializeNormalizeProjectSlugValue = unknown;

export type CliUtilityInitializeNormalizeProjectSlugReturns = SharedNormalizedResult<string>;

export type CliUtilityInitializeNormalizeProjectSlugTrimmedValue = string;

/**
 * CLI - Utility - Initialize - Normalize Text.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializeNormalizeTextValue = unknown;

export type CliUtilityInitializeNormalizeTextMaxLength = number;

export type CliUtilityInitializeNormalizeTextReturns = SharedNormalizedResult<string>;

export type CliUtilityInitializeNormalizeTextTrimmedValue = string;

/**
 * CLI - Utility - Initialize - Normalize Text Array.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializeNormalizeTextArrayValue = unknown;

export type CliUtilityInitializeNormalizeTextArrayMaxLengthPerItem = number;

export type CliUtilityInitializeNormalizeTextArrayReturns = SharedNormalizedResult<string[]>;

export type CliUtilityInitializeNormalizeTextArrayTrimmedValue = string;

export type CliUtilityInitializeNormalizeTextArrayItems = string[];

export type CliUtilityInitializeNormalizeTextArrayNormalizedText = SharedNormalizedResult<string>;

export type CliUtilityInitializeNormalizeTextArrayResult = true | string;

export type CliUtilityInitializeNormalizeTextArraySanitized = SharedNormalizedResultSanitized<string>;

/**
 * CLI - Utility - Initialize - Normalize URL.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializeNormalizeUrlValue = unknown;

export type CliUtilityInitializeNormalizeUrlProtocol = SharedUrlProtocol;

export type CliUtilityInitializeNormalizeUrlReturns = SharedNormalizedResult<string>;

export type CliUtilityInitializeNormalizeUrlTrimmedValue = string;

export type CliUtilityInitializeNormalizeUrlRulesEntryAllowed = string[];

export type CliUtilityInitializeNormalizeUrlRulesEntryMessage = string;

export type CliUtilityInitializeNormalizeUrlRulesEntry = {
  allowed: CliUtilityInitializeNormalizeUrlRulesEntryAllowed;
  message: CliUtilityInitializeNormalizeUrlRulesEntryMessage;
};

export type CliUtilityInitializeNormalizeUrlRules = {
  generic: CliUtilityInitializeNormalizeUrlRulesEntry;
  repository: CliUtilityInitializeNormalizeUrlRulesEntry;
};

export type CliUtilityInitializeNormalizeUrlAllowed = string[];

export type CliUtilityInitializeNormalizeUrlErrorMessage = string;

export type CliUtilityInitializeNormalizeUrlUrl = URL;

/**
 * CLI - Utility - Initialize - Normalize URL Array.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializeNormalizeUrlArrayValue = unknown;

export type CliUtilityInitializeNormalizeUrlArrayProtocol = SharedUrlProtocol;

export type CliUtilityInitializeNormalizeUrlArrayReturns = SharedNormalizedResult<string[]>;

export type CliUtilityInitializeNormalizeUrlArrayTrimmedValue = string;

export type CliUtilityInitializeNormalizeUrlArrayItems = string[];

export type CliUtilityInitializeNormalizeUrlArrayNormalizedUrl = SharedNormalizedResult<string>;

export type CliUtilityInitializeNormalizeUrlArrayResult = true | string;

export type CliUtilityInitializeNormalizeUrlArraySanitized = SharedNormalizedResultSanitized<string>;

export type CliUtilityInitializeNormalizeUrlArrayErrorMessagesGeneric = string;

export type CliUtilityInitializeNormalizeUrlArrayErrorMessagesRepository = string;

export type CliUtilityInitializeNormalizeUrlArrayErrorMessages = {
  generic: CliUtilityInitializeNormalizeUrlArrayErrorMessagesGeneric;
  repository: CliUtilityInitializeNormalizeUrlArrayErrorMessagesRepository;
};

export type CliUtilityInitializeNormalizeUrlArrayErrorMessage = string;

/**
 * CLI - Utility - Initialize - Normalize Workspace Name.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializeNormalizeWorkspaceNameValue = unknown;

export type CliUtilityInitializeNormalizeWorkspaceNameRole = SharedNovaConfigWorkspaceRole;

export type CliUtilityInitializeNormalizeWorkspaceNameBase = string;

export type CliUtilityInitializeNormalizeWorkspaceNameReturns = SharedNormalizedResult<string>;

export type CliUtilityInitializeNormalizeWorkspaceNameTrimmedValue = string;

export type CliUtilityInitializeNormalizeWorkspaceNameExpectedPrefix = string;

export type CliUtilityInitializeNormalizeWorkspaceNameDescriptor = string;

/**
 * CLI - Utility - Initialize - Prompt Emails.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializePromptEmailsConfig = SharedNovaConfig;

export type CliUtilityInitializePromptEmailsReturns = Promise<Extract<SharedDialogAction, 'back'>>;

export type CliUtilityInitializePromptEmailsExistingEmails = SharedNovaConfigEmails | undefined;

export type CliUtilityInitializePromptEmailsEmails = Partial<SharedNovaConfigEmails>;

export type CliUtilityInitializePromptEmailsQuestionsOutputKey =
  'emailsBugs';

export type CliUtilityInitializePromptEmailsQuestionsOutputValue = string;

export type CliUtilityInitializePromptEmailsQuestionsOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptEmailsQuestionsOutputKey, CliUtilityInitializePromptEmailsQuestionsOutputValue> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptEmailsValidateValue = unknown;

export type CliUtilityInitializePromptEmailsQuestionsOutputResult = Record<CliUtilityInitializePromptEmailsQuestionsOutputKey, CliUtilityInitializePromptEmailsQuestionsOutputValue>;

export type CliUtilityInitializePromptEmailsEmailsBugsInput = SharedNormalizedResultSanitized<string>;

/**
 * CLI - Utility - Initialize - Prompt Entities.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializePromptEntitiesConfig = SharedNovaConfig;

export type CliUtilityInitializePromptEntitiesReturns = Promise<Extract<SharedDialogAction, 'back'>>;

export type CliUtilityInitializePromptEntitiesEntities = SharedNovaConfigEntities;

export type CliUtilityInitializePromptEntitiesClonedEntity = SharedNovaConfigEntity;

export type CliUtilityInitializePromptEntitiesChoiceTitle = string;

export type CliUtilityInitializePromptEntitiesChoiceDescription = string;

export type CliUtilityInitializePromptEntitiesChoiceValue = SharedEntityMenuAction;

export type CliUtilityInitializePromptEntitiesChoice = {
  title: CliUtilityInitializePromptEntitiesChoiceTitle;
  description: CliUtilityInitializePromptEntitiesChoiceDescription;
  value: CliUtilityInitializePromptEntitiesChoiceValue;
};

export type CliUtilityInitializePromptEntitiesNormalizedEntities = SharedNovaConfigEntities;

export type CliUtilityInitializePromptEntitiesNormalizedEntity = SharedNovaConfigEntity;

export type CliUtilityInitializePromptEntitiesSortNameA = string;

export type CliUtilityInitializePromptEntitiesSortNameB = string;

export type CliUtilityInitializePromptEntitiesChoices = CliUtilityInitializePromptEntitiesChoice[];

export type CliUtilityInitializePromptEntitiesEntity = SharedNovaConfigEntity | undefined;

export type CliUtilityInitializePromptEntitiesEntityName = string;

export type CliUtilityInitializePromptEntitiesEntityEmail = string;

export type CliUtilityInitializePromptEntitiesEntityRoles = SharedNovaConfigEntityRoles;

export type CliUtilityInitializePromptEntitiesLabel = string;

export type CliUtilityInitializePromptEntitiesDescriptionParts = string[];

export type CliUtilityInitializePromptEntitiesNormalizedRoles = string[];

export type CliUtilityInitializePromptEntitiesNormalizedRolesReduce = string[];

export type CliUtilityInitializePromptEntitiesJoinedRoles = string;

export type CliUtilityInitializePromptEntitiesDescription = string;

export type CliUtilityInitializePromptEntitiesMenuOutputKey = 'action';

export type CliUtilityInitializePromptEntitiesMenuOutputResult = SharedEntityMenuAction;

export type CliUtilityInitializePromptEntitiesMenuOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptEntitiesMenuOutputKey, CliUtilityInitializePromptEntitiesMenuOutputResult> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptEntitiesMenuOutputResultValue = Record<CliUtilityInitializePromptEntitiesMenuOutputKey, CliUtilityInitializePromptEntitiesMenuOutputResult>;

export type CliUtilityInitializePromptEntitiesResult = CliUtilityInitializePromptEntitiesFormReturnsApply | CliUtilityInitializePromptEntitiesFormReturnsBack;

export type CliUtilityInitializePromptEntitiesEntityIndex = number;

export type CliUtilityInitializePromptEntitiesEntityToEdit = SharedNovaConfigEntity | undefined;

export type CliUtilityInitializePromptEntitiesEntityResult = CliUtilityInitializePromptEntitiesFormReturnsApply | CliUtilityInitializePromptEntitiesFormReturnsBack;

export type CliUtilityInitializePromptEntitiesEntityToRemove = SharedNovaConfigEntity | undefined;

export type CliUtilityInitializePromptEntitiesEntityLabel = string;

export type CliUtilityInitializePromptEntitiesShouldRemove = boolean;

/**
 * CLI - Utility - Initialize - Prompt Entities Delete Form.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializePromptEntitiesDeleteFormLabel = string;

export type CliUtilityInitializePromptEntitiesDeleteFormReturns = Promise<boolean>;

export type CliUtilityInitializePromptEntitiesDeleteFormConfirmOutputKey = 'confirm';

export type CliUtilityInitializePromptEntitiesDeleteFormConfirmOutputValue = boolean;

export type CliUtilityInitializePromptEntitiesDeleteFormConfirmOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptEntitiesDeleteFormConfirmOutputKey, CliUtilityInitializePromptEntitiesDeleteFormConfirmOutputValue> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptEntitiesDeleteFormConfirmOutputResult = Record<CliUtilityInitializePromptEntitiesDeleteFormConfirmOutputKey, CliUtilityInitializePromptEntitiesDeleteFormConfirmOutputValue>;

/**
 * CLI - Utility - Initialize - Prompt Entities Form.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializePromptEntitiesFormEntity = SharedNovaConfigEntity | undefined;

export type CliUtilityInitializePromptEntitiesFormMode = 'create' | 'update';

export type CliUtilityInitializePromptEntitiesFormReturnsApplyAction = 'apply';

export type CliUtilityInitializePromptEntitiesFormReturnsApplyEntity = SharedNovaConfigEntity;

export type CliUtilityInitializePromptEntitiesFormReturnsApply = {
  action: CliUtilityInitializePromptEntitiesFormReturnsApplyAction;
  entity: CliUtilityInitializePromptEntitiesFormReturnsApplyEntity;
};

export type CliUtilityInitializePromptEntitiesFormReturnsBackAction = Extract<SharedDialogAction, 'back'>;

export type CliUtilityInitializePromptEntitiesFormReturnsBack = {
  action: CliUtilityInitializePromptEntitiesFormReturnsBackAction;
};

export type CliUtilityInitializePromptEntitiesFormReturns = Promise<CliUtilityInitializePromptEntitiesFormReturnsApply | CliUtilityInitializePromptEntitiesFormReturnsBack>;

export type CliUtilityInitializePromptEntitiesFormValidRoles = SharedNovaConfigEntityRole[];

export type CliUtilityInitializePromptEntitiesFormExistingName = string;

export type CliUtilityInitializePromptEntitiesFormExistingEmail = string;

export type CliUtilityInitializePromptEntitiesFormExistingUrl = string;

export type CliUtilityInitializePromptEntitiesFormExistingRoles = SharedNovaConfigEntityRole[];

export type CliUtilityInitializePromptEntitiesFormQuestionsOutputKey = 'entityName' | 'entityEmail' | 'entityUrl' | 'entityRoles';

export type CliUtilityInitializePromptEntitiesFormQuestionsOutputValue<Key extends CliUtilityInitializePromptEntitiesFormQuestionsOutputKey> = Key extends 'entityRoles' ? SharedNovaConfigEntityRole[] : string;

export type CliUtilityInitializePromptEntitiesFormQuestionsOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptEntitiesFormQuestionsOutputKey, CliUtilityInitializePromptEntitiesFormQuestionsOutputValue<CliUtilityInitializePromptEntitiesFormQuestionsOutputKey>> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptEntitiesFormValidateValue = unknown;

export type CliUtilityInitializePromptEntitiesFormQuestionsOutputResult = Record<CliUtilityInitializePromptEntitiesFormQuestionsOutputKey, CliUtilityInitializePromptEntitiesFormQuestionsOutputValue<CliUtilityInitializePromptEntitiesFormQuestionsOutputKey>>;

export type CliUtilityInitializePromptEntitiesFormEntityNameInput = SharedNormalizedResultSanitized<string>;

export type CliUtilityInitializePromptEntitiesFormEntityEmailInput = SharedNormalizedResultSanitized<string>;

export type CliUtilityInitializePromptEntitiesFormEntityUrlInput = SharedNormalizedResultSanitized<string>;

export type CliUtilityInitializePromptEntitiesFormEntityRolesInput = SharedNovaConfigEntityRoles;

export type CliUtilityInitializePromptEntitiesFormResolvedEntity = SharedNovaConfigEntity;

/**
 * CLI - Utility - Initialize - Prompt Entities - Sync.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializePromptEntitiesSyncReturns = void;

export type CliUtilityInitializePromptEntitiesSync = () => CliUtilityInitializePromptEntitiesSyncReturns;

/**
 * CLI - Utility - Initialize - Prompt Flow.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializePromptFlowConfig = SharedNovaConfig;

export type CliUtilityInitializePromptFlowReturns = Promise<Exclude<SharedDialogAction, 'back'>>;

export type CliUtilityInitializePromptFlowCategoryTypeLabel = string;

export type CliUtilityInitializePromptFlowCategoryTypeDescription = string;

export type CliUtilityInitializePromptFlowCategoryTypeHandler = (config: SharedNovaConfig) => Promise<Extract<SharedDialogAction, 'back'>>;

export type CliUtilityInitializePromptFlowCategoryType = {
  label: CliUtilityInitializePromptFlowCategoryTypeLabel;
  description: CliUtilityInitializePromptFlowCategoryTypeDescription;
  handler: CliUtilityInitializePromptFlowCategoryTypeHandler;
};

export type CliUtilityInitializePromptFlowCategory = Record<SharedNovaConfigCategory, CliUtilityInitializePromptFlowCategoryType>;

export type CliUtilityInitializePromptFlowChoiceTitle = string;

export type CliUtilityInitializePromptFlowChoiceDescription = string;

export type CliUtilityInitializePromptFlowChoiceValue = SharedNovaConfigCategory | Exclude<SharedDialogAction, 'back'>;

export type CliUtilityInitializePromptFlowChoice = {
  title: CliUtilityInitializePromptFlowChoiceTitle;
  description: CliUtilityInitializePromptFlowChoiceDescription;
  value: CliUtilityInitializePromptFlowChoiceValue;
};

export type CliUtilityInitializePromptFlowCategoryKeys = SharedNovaConfigCategory[];

export type CliUtilityInitializePromptFlowChoices = CliUtilityInitializePromptFlowChoice[];

export type CliUtilityInitializePromptFlowSelectMenuOutputKey = 'action';

export type CliUtilityInitializePromptFlowSelectMenuOutputResult = SharedNovaConfigCategory | Exclude<SharedDialogAction, 'back'>;

export type CliUtilityInitializePromptFlowMenuOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptFlowSelectMenuOutputKey, CliUtilityInitializePromptFlowSelectMenuOutputResult> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptFlowMenuOutputResult = Record<CliUtilityInitializePromptFlowSelectMenuOutputKey, CliUtilityInitializePromptFlowSelectMenuOutputResult>;

export type CliUtilityInitializePromptFlowCategoryKey = SharedNovaConfigCategory;

export type CliUtilityInitializePromptFlowCategoryHandler = CliUtilityInitializePromptFlowCategoryTypeHandler;

/**
 * CLI - Utility - Initialize - Prompt Project.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializePromptProjectConfig = SharedNovaConfig;

export type CliUtilityInitializePromptProjectReturns = Promise<Extract<SharedDialogAction, 'back'>>;

export type CliUtilityInitializePromptProjectExistingProject = SharedNovaConfig['project'];

export type CliUtilityInitializePromptProjectExistingProjectName = SharedNovaConfigProjectName | undefined;

export type CliUtilityInitializePromptProjectExistingProjectDescription = SharedNovaConfigProjectDescription | undefined;

export type CliUtilityInitializePromptProjectExistingProjectKeywords = SharedNovaConfigProjectKeywords | undefined;

export type CliUtilityInitializePromptProjectExistingProjectLegalName = SharedNovaConfigProjectLegalName | undefined;

export type CliUtilityInitializePromptProjectExistingProjectPronouns = SharedNovaConfigProjectPronouns | undefined;

export type CliUtilityInitializePromptProjectExistingProjectPlatforms = SharedNovaConfigProjectPlatforms | undefined;

export type CliUtilityInitializePromptProjectExistingProjectStartingYear = SharedNovaConfigProjectStartingYear | undefined;

export type CliUtilityInitializePromptProjectExistingProjectLicense = SharedNovaConfigProjectLicense | undefined;

export type CliUtilityInitializePromptProjectProject = Partial<SharedNovaConfig['project'] & object>;

export type CliUtilityInitializePromptProjectProjectName = Partial<SharedNovaConfigProjectName>;

export type CliUtilityInitializePromptProjectProjectDescription = Partial<SharedNovaConfigProjectDescription>;

export type CliUtilityInitializePromptProjectProjectKeywords = SharedNovaConfigProjectKeywords;

export type CliUtilityInitializePromptProjectQuestionsOutputKey =
  'projectNameTitle'
  | 'projectNameSlug'
  | 'projectDescriptionShort'
  | 'projectDescriptionLong'
  | 'projectKeywords';

export type CliUtilityInitializePromptProjectQuestionsOutputResult = string;

export type CliUtilityInitializePromptProjectQuestionsOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptProjectQuestionsOutputKey, CliUtilityInitializePromptProjectQuestionsOutputResult> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptProjectValidateValue = unknown;

export type CliUtilityInitializePromptProjectQuestionsOutputResultValue = Record<CliUtilityInitializePromptProjectQuestionsOutputKey, CliUtilityInitializePromptProjectQuestionsOutputResult>;

export type CliUtilityInitializePromptProjectProjectNameTitleInput = SharedNormalizedResultSanitized<string>;

export type CliUtilityInitializePromptProjectProjectNameSlugInput = SharedNormalizedResultSanitized<string>;

export type CliUtilityInitializePromptProjectProjectDescriptionShortInput = SharedNormalizedResultSanitized<string>;

export type CliUtilityInitializePromptProjectProjectDescriptionLongInput = SharedNormalizedResultSanitized<string>;

export type CliUtilityInitializePromptProjectProjectKeywordsInput = SharedNormalizedResultSanitized<string[]>;

export type CliUtilityInitializePromptProjectLegalNameOutputKey = 'projectLegalName';

export type CliUtilityInitializePromptProjectLegalNameOutputResult = string;

export type CliUtilityInitializePromptProjectLegalNameOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptProjectLegalNameOutputKey, CliUtilityInitializePromptProjectLegalNameOutputResult> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptProjectProjectLegalNameInput = SharedNormalizedResultSanitized<string>;

export type CliUtilityInitializePromptProjectPronounsOutputKey = 'projectPronouns';

export type CliUtilityInitializePromptProjectPronounsOutputResult = SharedNovaConfigProjectPronouns;

export type CliUtilityInitializePromptProjectPronounsOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptProjectPronounsOutputKey, CliUtilityInitializePromptProjectPronounsOutputResult> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptProjectProjectPronounsInput = SharedNovaConfigProjectPronouns;

export type CliUtilityInitializePromptProjectPlatformChoiceTitle = string;

export type CliUtilityInitializePromptProjectPlatformChoiceValue = SharedNovaConfigProjectPlatform;

export type CliUtilityInitializePromptProjectPlatformChoiceSelected = boolean;

export type CliUtilityInitializePromptProjectPlatformChoice = {
  title: CliUtilityInitializePromptProjectPlatformChoiceTitle;
  value: CliUtilityInitializePromptProjectPlatformChoiceValue;
  selected: CliUtilityInitializePromptProjectPlatformChoiceSelected;
};

export type CliUtilityInitializePromptProjectPlatformChoices = CliUtilityInitializePromptProjectPlatformChoice[];

export type CliUtilityInitializePromptProjectPlatformsOutputKey = 'projectPlatforms';

export type CliUtilityInitializePromptProjectPlatformsOutputResult = SharedNovaConfigProjectPlatform[];

export type CliUtilityInitializePromptProjectPlatformsOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptProjectPlatformsOutputKey, CliUtilityInitializePromptProjectPlatformsOutputResult> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptProjectProjectPlatformsInput = SharedNovaConfigProjectPlatforms;

export type CliUtilityInitializePromptProjectStartingYearOutputKey = 'projectStartingYear';

export type CliUtilityInitializePromptProjectStartingYearOutputResult = string;

export type CliUtilityInitializePromptProjectStartingYearOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptProjectStartingYearOutputKey, CliUtilityInitializePromptProjectStartingYearOutputResult> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptProjectTrimmed = string;

export type CliUtilityInitializePromptProjectParsed = number;

export type CliUtilityInitializePromptProjectStartingYearRaw = string;

export type CliUtilityInitializePromptProjectStartingYearParsed = number | undefined;

export type CliUtilityInitializePromptProjectLicenseChoiceTitle = string;

export type CliUtilityInitializePromptProjectLicenseChoiceValue = SharedNovaConfigProjectLicense;

export type CliUtilityInitializePromptProjectLicenseChoice = {
  title: CliUtilityInitializePromptProjectLicenseChoiceTitle;
  value: CliUtilityInitializePromptProjectLicenseChoiceValue;
};

export type CliUtilityInitializePromptProjectLicenseChoices = CliUtilityInitializePromptProjectLicenseChoice[];

export type CliUtilityInitializePromptProjectLicenseInitialIndex = number;

export type CliUtilityInitializePromptProjectLicenseOutputKey = 'projectLicense';

export type CliUtilityInitializePromptProjectLicenseOutputResult = SharedNovaConfigProjectLicense;

export type CliUtilityInitializePromptProjectLicenseOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptProjectLicenseOutputKey, CliUtilityInitializePromptProjectLicenseOutputResult> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptProjectProjectLicenseInput = SharedNovaConfigProjectLicense;

export type CliUtilityInitializePromptProjectPreviousSlug = string;

export type CliUtilityInitializePromptProjectCurrentSlug = string;

export type CliUtilityInitializePromptProjectSlugChanged = boolean;

export type CliUtilityInitializePromptProjectRolesToSync = SharedNovaConfigWorkspaceRole[];

export type CliUtilityInitializePromptProjectSlugPrefix = RegExp;

export type CliUtilityInitializePromptProjectPreviousLabel = string;

export type CliUtilityInitializePromptProjectCurrentLabel = string;

export type CliUtilityInitializePromptProjectName2 = string;

/**
 * CLI - Utility - Initialize - Prompt URLs.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializePromptUrlsConfig = SharedNovaConfig;

export type CliUtilityInitializePromptUrlsReturns = Promise<Extract<SharedDialogAction, 'back'>>;

export type CliUtilityInitializePromptUrlsExistingUrls = SharedNovaConfigUrls | undefined;

export type CliUtilityInitializePromptUrlsUrls = Partial<SharedNovaConfigUrls>;

export type CliUtilityInitializePromptUrlsQuestionsOutputKey =
  'urlsHomepage'
  | 'urlsRepository'
  | 'urlsBugs'
  | 'urlsLicense'
  | 'urlsLogo'
  | 'urlsDocumentation'
  | 'urlsGithub'
  | 'urlsNpm'
  | 'urlsDocker'
  | 'urlsFundSources'
  | 'urlsPrivacyPolicy'
  | 'urlsTermsOfUse';

export type CliUtilityInitializePromptUrlsQuestionsOutputValue = string;

export type CliUtilityInitializePromptUrlsQuestionsOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptUrlsQuestionsOutputKey, CliUtilityInitializePromptUrlsQuestionsOutputValue> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptUrlsValidateValue = unknown;

export type CliUtilityInitializePromptUrlsQuestionsOutputResult = Record<CliUtilityInitializePromptUrlsQuestionsOutputKey, CliUtilityInitializePromptUrlsQuestionsOutputValue>;

export type CliUtilityInitializePromptUrlsUrlsHomepageInput = SharedNormalizedResultSanitized<string>;

export type CliUtilityInitializePromptUrlsUrlsRepositoryInput = SharedNormalizedResultSanitized<string>;

export type CliUtilityInitializePromptUrlsUrlsBugsInput = SharedNormalizedResultSanitized<string>;

export type CliUtilityInitializePromptUrlsUrlsLicenseInput = SharedNormalizedResultSanitized<string>;

export type CliUtilityInitializePromptUrlsUrlsLogoInput = SharedNormalizedResultSanitized<string>;

export type CliUtilityInitializePromptUrlsUrlsDocumentationInput = SharedNormalizedResultSanitized<string>;

export type CliUtilityInitializePromptUrlsUrlsGithubInput = SharedNormalizedResultSanitized<string>;

export type CliUtilityInitializePromptUrlsUrlsNpmInput = SharedNormalizedResultSanitized<string>;

export type CliUtilityInitializePromptUrlsUrlsDockerInput = SharedNormalizedResultSanitized<string>;

export type CliUtilityInitializePromptUrlsUrlsFundSourcesInput = SharedNormalizedResultSanitized<string[]>;

export type CliUtilityInitializePromptUrlsUrlsPrivacyPolicyInput = SharedNormalizedResultSanitized<string>;

export type CliUtilityInitializePromptUrlsUrlsTermsOfUseInput = SharedNormalizedResultSanitized<string>;

/**
 * CLI - Utility - Initialize - Prompt With Cancel.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializePromptWithCancelQuestions<Keys extends string> = PromptObject<Keys> | PromptObject<Keys>[];

export type CliUtilityInitializePromptWithCancelReturns<Keys extends string, Result> = Promise<SharedPromptWithCancelResolved<Keys, Result> | SharedPromptWithCancelReject>;

export type CliUtilityInitializePromptWithCancelCancelled = boolean;

export type CliUtilityInitializePromptWithCancelResult<Keys extends string, Result> = Record<Keys, Result>;

/**
 * CLI - Utility - Initialize - Prompt Workflows.
 *
 * @since 0.15.0
 */
export type CliUtilityInitializePromptWorkflowsConfig = SharedNovaConfig;

export type CliUtilityInitializePromptWorkflowsReturns = Promise<Extract<SharedDialogAction, 'back'>>;

export type CliUtilityInitializePromptWorkflowsWorkflows = SharedNovaConfigWorkflows;

export type CliUtilityInitializePromptWorkflowsClonedWorkflow = SharedNovaConfigWorkflow;

export type CliUtilityInitializePromptWorkflowsChoiceTitle = string;

export type CliUtilityInitializePromptWorkflowsChoiceDescription = string;

export type CliUtilityInitializePromptWorkflowsChoiceValueAddKind = 'add';

export type CliUtilityInitializePromptWorkflowsChoiceValueAdd = {
  kind: CliUtilityInitializePromptWorkflowsChoiceValueAddKind;
};

export type CliUtilityInitializePromptWorkflowsChoiceValueEditKind = 'edit';

export type CliUtilityInitializePromptWorkflowsChoiceValueEditIndex = number;

export type CliUtilityInitializePromptWorkflowsChoiceValueEdit = {
  kind: CliUtilityInitializePromptWorkflowsChoiceValueEditKind;
  index: CliUtilityInitializePromptWorkflowsChoiceValueEditIndex;
};

export type CliUtilityInitializePromptWorkflowsChoiceValueRemoveKind = 'remove';

export type CliUtilityInitializePromptWorkflowsChoiceValueRemoveIndex = number;

export type CliUtilityInitializePromptWorkflowsChoiceValueRemove = {
  kind: CliUtilityInitializePromptWorkflowsChoiceValueRemoveKind;
  index: CliUtilityInitializePromptWorkflowsChoiceValueRemoveIndex;
};

export type CliUtilityInitializePromptWorkflowsChoiceValueBackKind = 'back';

export type CliUtilityInitializePromptWorkflowsChoiceValueBack = {
  kind: CliUtilityInitializePromptWorkflowsChoiceValueBackKind;
};

export type CliUtilityInitializePromptWorkflowsChoiceValue =
  CliUtilityInitializePromptWorkflowsChoiceValueAdd
  | CliUtilityInitializePromptWorkflowsChoiceValueEdit
  | CliUtilityInitializePromptWorkflowsChoiceValueRemove
  | CliUtilityInitializePromptWorkflowsChoiceValueBack;

export type CliUtilityInitializePromptWorkflowsChoice = {
  title: CliUtilityInitializePromptWorkflowsChoiceTitle;
  description: CliUtilityInitializePromptWorkflowsChoiceDescription;
  value: CliUtilityInitializePromptWorkflowsChoiceValue;
};

export type CliUtilityInitializePromptWorkflowsSortTemplateA = string;

export type CliUtilityInitializePromptWorkflowsSortTemplateB = string;

export type CliUtilityInitializePromptWorkflowsSortTemplateCompare = number;

export type CliUtilityInitializePromptWorkflowsSortSuffixA = string;

export type CliUtilityInitializePromptWorkflowsSortSuffixB = string;

export type CliUtilityInitializePromptWorkflowsChoices = CliUtilityInitializePromptWorkflowsChoice[];

export type CliUtilityInitializePromptWorkflowsMenuWorkflow = SharedNovaConfigWorkflow | undefined;

export type CliUtilityInitializePromptWorkflowsMenuTemplate = string;

export type CliUtilityInitializePromptWorkflowsMenuSuffix = string;

export type CliUtilityInitializePromptWorkflowsMenuTriggers = SharedNovaConfigWorkflowTriggers;

export type CliUtilityInitializePromptWorkflowsLabel = string;

export type CliUtilityInitializePromptWorkflowsTriggersLabel = string;

export type CliUtilityInitializePromptWorkflowsOutputFileName = string;

export type CliUtilityInitializePromptWorkflowsDescription = string;

export type CliUtilityInitializePromptWorkflowsMenuOutputKey = 'action';

export type CliUtilityInitializePromptWorkflowsMenuOutputResult = CliUtilityInitializePromptWorkflowsChoiceValue;

export type CliUtilityInitializePromptWorkflowsMenuOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptWorkflowsMenuOutputKey, CliUtilityInitializePromptWorkflowsMenuOutputResult> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptWorkflowsMenuOutputResultValue = Record<CliUtilityInitializePromptWorkflowsMenuOutputKey, CliUtilityInitializePromptWorkflowsMenuOutputResult>;

export type CliUtilityInitializePromptWorkflowsResult = CliUtilityInitializePromptWorkflowsFormReturnsApply | CliUtilityInitializePromptWorkflowsFormReturnsBack;

export type CliUtilityInitializePromptWorkflowsWorkflowIndex = number;

export type CliUtilityInitializePromptWorkflowsWorkflowToEdit = SharedNovaConfigWorkflow | undefined;

export type CliUtilityInitializePromptWorkflowsWorkflowToRemove = SharedNovaConfigWorkflow | undefined;

export type CliUtilityInitializePromptWorkflowsRemoveTemplate = string;

export type CliUtilityInitializePromptWorkflowsRemoveSuffix = string;

export type CliUtilityInitializePromptWorkflowsShouldRemove = boolean;

/**
 * CLI - Utility - Initialize - Prompt Workflows Delete Form.
 *
 * @since 0.15.0
 */
export type CliUtilityInitializePromptWorkflowsDeleteFormLabel = string;

export type CliUtilityInitializePromptWorkflowsDeleteFormReturns = Promise<boolean>;

export type CliUtilityInitializePromptWorkflowsDeleteFormConfirmOutputKey = 'confirm';

export type CliUtilityInitializePromptWorkflowsDeleteFormConfirmOutputValue = boolean;

export type CliUtilityInitializePromptWorkflowsDeleteFormConfirmOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptWorkflowsDeleteFormConfirmOutputKey, CliUtilityInitializePromptWorkflowsDeleteFormConfirmOutputValue> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptWorkflowsDeleteFormConfirmOutputResult = Record<CliUtilityInitializePromptWorkflowsDeleteFormConfirmOutputKey, CliUtilityInitializePromptWorkflowsDeleteFormConfirmOutputValue>;

/**
 * CLI - Utility - Initialize - Prompt Workflows Form.
 *
 * @since 0.15.0
 */
export type CliUtilityInitializePromptWorkflowsFormWorkflow = SharedNovaConfigWorkflow | undefined;

export type CliUtilityInitializePromptWorkflowsFormMode = 'create' | 'update';

export type CliUtilityInitializePromptWorkflowsFormWorkflows = SharedNovaConfigWorkflows;

export type CliUtilityInitializePromptWorkflowsFormReturnsApplyAction = 'apply';

export type CliUtilityInitializePromptWorkflowsFormReturnsApplyWorkflow = SharedNovaConfigWorkflow;

export type CliUtilityInitializePromptWorkflowsFormReturnsApply = {
  action: CliUtilityInitializePromptWorkflowsFormReturnsApplyAction;
  workflow: CliUtilityInitializePromptWorkflowsFormReturnsApplyWorkflow;
};

export type CliUtilityInitializePromptWorkflowsFormReturnsBackAction = Extract<SharedDialogAction, 'back'>;

export type CliUtilityInitializePromptWorkflowsFormReturnsBack = {
  action: CliUtilityInitializePromptWorkflowsFormReturnsBackAction;
};

export type CliUtilityInitializePromptWorkflowsFormReturns = Promise<CliUtilityInitializePromptWorkflowsFormReturnsApply | CliUtilityInitializePromptWorkflowsFormReturnsBack>;

export type CliUtilityInitializePromptWorkflowsFormTemplateChoiceTitle = string;

export type CliUtilityInitializePromptWorkflowsFormTemplateChoiceDescription = string;

export type CliUtilityInitializePromptWorkflowsFormTemplateChoiceValue = string;

export type CliUtilityInitializePromptWorkflowsFormTemplateChoice = {
  title: CliUtilityInitializePromptWorkflowsFormTemplateChoiceTitle;
  description: CliUtilityInitializePromptWorkflowsFormTemplateChoiceDescription;
  value: CliUtilityInitializePromptWorkflowsFormTemplateChoiceValue;
};

export type CliUtilityInitializePromptWorkflowsFormExistingTemplate = string;

export type CliUtilityInitializePromptWorkflowsFormExistingSuffix = string;

export type CliUtilityInitializePromptWorkflowsFormExistingTriggers = SharedNovaConfigWorkflowTriggers;

export type CliUtilityInitializePromptWorkflowsFormExistingDependsOn = SharedNovaConfigWorkflowDependsOn;

export type CliUtilityInitializePromptWorkflowsFormTemplateChoices = CliUtilityInitializePromptWorkflowsFormTemplateChoice[];

export type CliUtilityInitializePromptWorkflowsFormTemplateInitialIndex = number;

export type CliUtilityInitializePromptWorkflowsFormFoundIndex = number;

export type CliUtilityInitializePromptWorkflowsFormTemplateOutputKey = 'template';

export type CliUtilityInitializePromptWorkflowsFormTemplateOutputResult = string;

export type CliUtilityInitializePromptWorkflowsFormTemplateOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptWorkflowsFormTemplateOutputKey, CliUtilityInitializePromptWorkflowsFormTemplateOutputResult> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptWorkflowsFormTemplateOutputResultValue = Record<CliUtilityInitializePromptWorkflowsFormTemplateOutputKey, CliUtilityInitializePromptWorkflowsFormTemplateOutputResult>;

export type CliUtilityInitializePromptWorkflowsFormSelectedTemplate = string;

export type CliUtilityInitializePromptWorkflowsFormSuffixOutputKey = 'suffix';

export type CliUtilityInitializePromptWorkflowsFormSuffixOutputResult = string;

export type CliUtilityInitializePromptWorkflowsFormSuffixOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptWorkflowsFormSuffixOutputKey, CliUtilityInitializePromptWorkflowsFormSuffixOutputResult> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptWorkflowsFormSelectedSuffix = string;

export type CliUtilityInitializePromptWorkflowsFormCompositeKey = string;

export type CliUtilityInitializePromptWorkflowsFormEditIndex = number;

export type CliUtilityInitializePromptWorkflowsFormIsDuplicate = boolean;

export type CliUtilityInitializePromptWorkflowsFormSuffixOutputResultValue = Record<CliUtilityInitializePromptWorkflowsFormSuffixOutputKey, CliUtilityInitializePromptWorkflowsFormSuffixOutputResult>;

export type CliUtilityInitializePromptWorkflowsFormTriggersDir = string;

export type CliUtilityInitializePromptWorkflowsFormTriggersDirExists = boolean;

export type CliUtilityInitializePromptWorkflowsFormSelectedTriggers = SharedNovaConfigWorkflowTriggers;

export type CliUtilityInitializePromptWorkflowsFormTriggersFiles = string[];

export type CliUtilityInitializePromptWorkflowsFormTriggerChoiceTitle = string;

export type CliUtilityInitializePromptWorkflowsFormTriggerChoiceValue = SharedNovaConfigWorkflowTrigger;

export type CliUtilityInitializePromptWorkflowsFormTriggerChoiceSelected = boolean;

export type CliUtilityInitializePromptWorkflowsFormTriggerChoice = {
  title: CliUtilityInitializePromptWorkflowsFormTriggerChoiceTitle;
  value: CliUtilityInitializePromptWorkflowsFormTriggerChoiceValue;
  selected: CliUtilityInitializePromptWorkflowsFormTriggerChoiceSelected;
};

export type CliUtilityInitializePromptWorkflowsFormTriggerChoices = CliUtilityInitializePromptWorkflowsFormTriggerChoice[];

export type CliUtilityInitializePromptWorkflowsFormTriggerName = string;

export type CliUtilityInitializePromptWorkflowsFormTriggersOutputKey = 'triggers';

export type CliUtilityInitializePromptWorkflowsFormTriggersOutputResult = SharedNovaConfigWorkflowTrigger[];

export type CliUtilityInitializePromptWorkflowsFormTriggersOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptWorkflowsFormTriggersOutputKey, CliUtilityInitializePromptWorkflowsFormTriggersOutputResult> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptWorkflowsFormTriggersOutputResultValue = Record<CliUtilityInitializePromptWorkflowsFormTriggersOutputKey, CliUtilityInitializePromptWorkflowsFormTriggersOutputResult>;

export type CliUtilityInitializePromptWorkflowsFormSelectedDependsOn = string[] | undefined;

export type CliUtilityInitializePromptWorkflowsFormDependsOnChoiceTitle = string;

export type CliUtilityInitializePromptWorkflowsFormDependsOnChoiceValue = string;

export type CliUtilityInitializePromptWorkflowsFormDependsOnChoiceSelected = boolean;

export type CliUtilityInitializePromptWorkflowsFormDependsOnChoice = {
  title: CliUtilityInitializePromptWorkflowsFormDependsOnChoiceTitle;
  value: CliUtilityInitializePromptWorkflowsFormDependsOnChoiceValue;
  selected: CliUtilityInitializePromptWorkflowsFormDependsOnChoiceSelected;
};

export type CliUtilityInitializePromptWorkflowsFormDependsOnChoices = CliUtilityInitializePromptWorkflowsFormDependsOnChoice[];

export type CliUtilityInitializePromptWorkflowsFormDependsOnOutputKey = 'dependsOn';

export type CliUtilityInitializePromptWorkflowsFormDependsOnOutputResult = string[];

export type CliUtilityInitializePromptWorkflowsFormDependsOnOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptWorkflowsFormDependsOnOutputKey, CliUtilityInitializePromptWorkflowsFormDependsOnOutputResult> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptWorkflowsFormDependsOnOutputResultValue = Record<CliUtilityInitializePromptWorkflowsFormDependsOnOutputKey, CliUtilityInitializePromptWorkflowsFormDependsOnOutputResult>;

export type CliUtilityInitializePromptWorkflowsFormMatchedMetadata = LibWorkflowTemplatesEntry | undefined;

export type CliUtilityInitializePromptWorkflowsFormSettings = Record<string, string>;

export type CliUtilityInitializePromptWorkflowsFormVariableEntries = [string, LibWorkflowTemplatesVariable][];

export type CliUtilityInitializePromptWorkflowsFormVariableEntry = [string, LibWorkflowTemplatesVariable];

export type CliUtilityInitializePromptWorkflowsFormVariableName = string;

export type CliUtilityInitializePromptWorkflowsFormVariableConfig = LibWorkflowTemplatesVariable;

export type CliUtilityInitializePromptWorkflowsFormPromptMessage = string;

export type CliUtilityInitializePromptWorkflowsFormInitialValue = string;

export type CliUtilityInitializePromptWorkflowsFormVariableDescriptionParts = string[];

export type CliUtilityInitializePromptWorkflowsFormSettingsOutputKey = 'settingValue';

export type CliUtilityInitializePromptWorkflowsFormSettingsOutputResult = string;

export type CliUtilityInitializePromptWorkflowsFormSettingsOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptWorkflowsFormSettingsOutputKey, CliUtilityInitializePromptWorkflowsFormSettingsOutputResult> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptWorkflowsFormSettingsOutputResultValue = Record<CliUtilityInitializePromptWorkflowsFormSettingsOutputKey, CliUtilityInitializePromptWorkflowsFormSettingsOutputResult>;

export type CliUtilityInitializePromptWorkflowsFormSettingValue = string;

export type CliUtilityInitializePromptWorkflowsFormResolvedWorkflow = SharedNovaConfigWorkflow;

/**
 * CLI - Utility - Initialize - Prompt Workflows - Sync.
 *
 * @since 0.15.0
 */
export type CliUtilityInitializePromptWorkflowsSyncReturns = void;

export type CliUtilityInitializePromptWorkflowsSync = () => CliUtilityInitializePromptWorkflowsSyncReturns;

/**
 * CLI - Utility - Initialize - Prompt Workspaces.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializePromptWorkspacesConfig = SharedNovaConfig;

export type CliUtilityInitializePromptWorkspacesReturns = Promise<Extract<SharedDialogAction, 'back'>>;

export type CliUtilityInitializePromptWorkspaces = SharedNovaConfigWorkspaces;

export type CliUtilityInitializePromptWorkspacesRawWorkspacePaths = string[];

export type CliUtilityInitializePromptWorkspacesWorkspacePaths = string[];

export type CliUtilityInitializePromptWorkspacesCurrentWorkingDirectory = string;

export type CliUtilityInitializePromptWorkspacesRelativePath = string;

export type CliUtilityInitializePromptWorkspacesChoiceTitle = string;

export type CliUtilityInitializePromptWorkspacesChoiceDescription = string;

export type CliUtilityInitializePromptWorkspacesChoiceValue = string;

export type CliUtilityInitializePromptWorkspacesChoice = {
  title: CliUtilityInitializePromptWorkspacesChoiceTitle;
  description: CliUtilityInitializePromptWorkspacesChoiceDescription;
  value: CliUtilityInitializePromptWorkspacesChoiceValue;
};

export type CliUtilityInitializePromptWorkspacesChoices = CliUtilityInitializePromptWorkspacesChoice[];

export type CliUtilityInitializePromptWorkspacesWorkspace = SharedNovaConfigWorkspace | undefined;

export type CliUtilityInitializePromptWorkspacesSummaryParts = string[];

export type CliUtilityInitializePromptWorkspacesMenuOutputKey = 'workspacePath';

export type CliUtilityInitializePromptWorkspacesMenuOutputValue = string;

export type CliUtilityInitializePromptWorkspacesMenuOutput = SharedPromptWithCancelResolved<CliUtilityInitializePromptWorkspacesMenuOutputKey, CliUtilityInitializePromptWorkspacesMenuOutputValue> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptWorkspacesMenuOutputResult = Record<CliUtilityInitializePromptWorkspacesMenuOutputKey, CliUtilityInitializePromptWorkspacesMenuOutputValue>;

export type CliUtilityInitializePromptWorkspacesWorkspacePath = string;

export type CliUtilityInitializePromptWorkspacesFormResult = CliUtilityInitializePromptWorkspacesFormReturnsApply | CliUtilityInitializePromptWorkspacesFormReturnsBack;

/**
 * CLI - Utility - Initialize - Prompt Workspaces Form.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializePromptWorkspacesFormOptionsWorkspacePath = string;

export type CliUtilityInitializePromptWorkspacesFormOptionsExistingWorkspace = SharedNovaConfigWorkspace | undefined;

export type CliUtilityInitializePromptWorkspacesFormOptionsProjectSlug = SharedNovaConfigProjectNameSlug | undefined;

export type CliUtilityInitializePromptWorkspacesFormOptions = {
  workspacePath: CliUtilityInitializePromptWorkspacesFormOptionsWorkspacePath;
  existingWorkspace: CliUtilityInitializePromptWorkspacesFormOptionsExistingWorkspace;
  projectSlug: CliUtilityInitializePromptWorkspacesFormOptionsProjectSlug;
};

export type CliUtilityInitializePromptWorkspacesFormReturnsApplyAction = 'apply';

export type CliUtilityInitializePromptWorkspacesFormReturnsApplyWorkspace = SharedNovaConfigWorkspace;

export type CliUtilityInitializePromptWorkspacesFormReturnsApply = {
  action: CliUtilityInitializePromptWorkspacesFormReturnsApplyAction;
  workspace: CliUtilityInitializePromptWorkspacesFormReturnsApplyWorkspace;
};

export type CliUtilityInitializePromptWorkspacesFormReturnsBackAction = Extract<SharedDialogAction, 'back'>;

export type CliUtilityInitializePromptWorkspacesFormReturnsBack = {
  action: CliUtilityInitializePromptWorkspacesFormReturnsBackAction;
};

export type CliUtilityInitializePromptWorkspacesFormReturns = Promise<CliUtilityInitializePromptWorkspacesFormReturnsApply | CliUtilityInitializePromptWorkspacesFormReturnsBack>;

export type CliUtilityInitializePromptWorkspacesFormAllowedRoleTitle = string;

export type CliUtilityInitializePromptWorkspacesFormAllowedRoleDescription = string;

export type CliUtilityInitializePromptWorkspacesFormAllowedRoleValue = SharedNovaConfigWorkspaceRole;

export type CliUtilityInitializePromptWorkspacesFormAllowedRole = {
  title: CliUtilityInitializePromptWorkspacesFormAllowedRoleTitle;
  description: CliUtilityInitializePromptWorkspacesFormAllowedRoleDescription;
  value: CliUtilityInitializePromptWorkspacesFormAllowedRoleValue;
};

export type CliUtilityInitializePromptWorkspacesFormAllowedRoles = CliUtilityInitializePromptWorkspacesFormAllowedRole[];

export type CliUtilityInitializePromptWorkspacesFormPolicyTypeLabel = string;

export type CliUtilityInitializePromptWorkspacesFormPolicyTypeDescription = string;

export type CliUtilityInitializePromptWorkspacesFormPolicyType = {
  label: CliUtilityInitializePromptWorkspacesFormPolicyTypeLabel;
  description: CliUtilityInitializePromptWorkspacesFormPolicyTypeDescription;
};

export type CliUtilityInitializePromptWorkspacesFormPolicy = Record<SharedNovaConfigWorkspacePolicy, CliUtilityInitializePromptWorkspacesFormPolicyType>;

export type CliUtilityInitializePromptWorkspacesFormExistingRoleIndex = number;

export type CliUtilityInitializePromptWorkspacesFormRolePromptKey = 'workspaceRole';

export type CliUtilityInitializePromptWorkspacesFormRolePromptValue = SharedNovaConfigWorkspaceRole;

export type CliUtilityInitializePromptWorkspacesFormRolePrompt = SharedPromptWithCancelResolved<CliUtilityInitializePromptWorkspacesFormRolePromptKey, CliUtilityInitializePromptWorkspacesFormRolePromptValue> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptWorkspacesFormSelectedRole = SharedNovaConfigWorkspaceRole;

export type CliUtilityInitializePromptWorkspacesFormAllowedPolicies = SharedNovaConfigWorkspacePolicy[];

export type CliUtilityInitializePromptWorkspacesFormExistingPolicyIndex = number;

export type CliUtilityInitializePromptWorkspacesFormPolicyPromptKey = 'workspacePolicy';

export type CliUtilityInitializePromptWorkspacesFormPolicyPromptValue = SharedNovaConfigWorkspacePolicy;

export type CliUtilityInitializePromptWorkspacesFormPolicyPrompt = SharedPromptWithCancelResolved<CliUtilityInitializePromptWorkspacesFormPolicyPromptKey, CliUtilityInitializePromptWorkspacesFormPolicyPromptValue> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptWorkspacesFormPolicyEntry = CliUtilityInitializePromptWorkspacesFormPolicyType;

export type CliUtilityInitializePromptWorkspacesFormSelectedPolicy = SharedNovaConfigWorkspacePolicy;

export type CliUtilityInitializePromptWorkspacesFormResolvedName = string | undefined;

export type CliUtilityInitializePromptWorkspacesFormExistingRecipes = SharedNovaConfigWorkspaceRecipes | undefined;

export type CliUtilityInitializePromptWorkspacesFormRecipesPromptKey = 'workspaceRecipes';

export type CliUtilityInitializePromptWorkspacesFormRecipesPromptValue = SharedNovaConfigWorkspaceRecipeName[];

export type CliUtilityInitializePromptWorkspacesFormRecipesPrompt = SharedPromptWithCancelResolved<CliUtilityInitializePromptWorkspacesFormRecipesPromptKey, CliUtilityInitializePromptWorkspacesFormRecipesPromptValue> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptWorkspacesFormRecipeTuple = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type CliUtilityInitializePromptWorkspacesFormRecipeSelected = boolean;

export type CliUtilityInitializePromptWorkspacesFormSelectedRecipes = SharedNovaConfigWorkspaceRecipeName[];

export type CliUtilityInitializePromptWorkspacesFormRecipes = SharedNovaConfigWorkspaceRecipes;

export type CliUtilityInitializePromptWorkspacesFormExistingTupleRaw = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type CliUtilityInitializePromptWorkspacesFormExistingTuple = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type CliUtilityInitializePromptWorkspacesFormExistingSettings = SharedNovaConfigWorkspaceRecipeSettings | undefined;

export type CliUtilityInitializePromptWorkspacesFormRecipeSettingsPromptKey = 'workspaceRecipeSettings';

export type CliUtilityInitializePromptWorkspacesFormRecipeSettingsPromptValue = string[];

export type CliUtilityInitializePromptWorkspacesFormSettingsPrompt = SharedPromptWithCancelResolved<CliUtilityInitializePromptWorkspacesFormRecipeSettingsPromptKey, CliUtilityInitializePromptWorkspacesFormRecipeSettingsPromptValue> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptWorkspacesFormSelectedSettings = string[];

export type CliUtilityInitializePromptWorkspacesFormRecipeSettings = SharedNovaConfigWorkspaceRecipeSettings;

export type CliUtilityInitializePromptWorkspacesFormSettings = SharedNovaConfigWorkspaceRecipeSettings;

/**
 * CLI - Utility - Initialize - Prompt Workspaces Form - Resolve Name.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializePromptWorkspacesFormResolveNameRole = SharedNovaConfigWorkspaceRole;

export type CliUtilityInitializePromptWorkspacesFormResolveNameReturns = Promise<string | undefined>;

export type CliUtilityInitializePromptWorkspacesFormResolveName = (role: CliUtilityInitializePromptWorkspacesFormResolveNameRole) => CliUtilityInitializePromptWorkspacesFormResolveNameReturns;

export type CliUtilityInitializePromptWorkspacesFormResolveNameBase = string;

export type CliUtilityInitializePromptWorkspacesFormResolveNamePromptKey = 'workspaceName';

export type CliUtilityInitializePromptWorkspacesFormResolveNamePromptValue = string;

export type CliUtilityInitializePromptWorkspacesFormResolveNameNamePrompt = SharedPromptWithCancelResolved<CliUtilityInitializePromptWorkspacesFormResolveNamePromptKey, CliUtilityInitializePromptWorkspacesFormResolveNamePromptValue> | SharedPromptWithCancelReject;

export type CliUtilityInitializePromptWorkspacesFormResolveNameValidateValue = unknown;

/**
 * CLI - Utility - Initialize - Run.
 *
 * @since 0.11.0
 */
export type CliUtilityInitializeRunOptionsDryRun = true;

export type CliUtilityInitializeRunOptionsReplaceFile = true;

export type CliUtilityInitializeRunOptions = {
  dryRun?: CliUtilityInitializeRunOptionsDryRun;
  replaceFile?: CliUtilityInitializeRunOptionsReplaceFile;
};

export type CliUtilityInitializeRunReturns = Promise<void>;

export type CliUtilityInitializeRunCurrentDirectory = string;

export type CliUtilityInitializeRunIsProjectRoot = boolean;

export type CliUtilityInitializeRunIsDryRun = boolean;

export type CliUtilityInitializeRunIsReplaceFile = boolean;

export type CliUtilityInitializeRunReplaceFileNotice = string;

export type CliUtilityInitializeRunNovaConfig = LibNovaConfig;

export type CliUtilityInitializeRunWorkingFile = SharedNovaConfig;

export type CliUtilityInitializeRunPromptFlowResult = Exclude<SharedDialogAction, 'back'>;
