import type {
  SharedNovaConfig,
  SharedNovaConfigConfig,
  SharedNovaConfigEmails,
  SharedNovaConfigEntities,
  SharedNovaConfigEntity,
  SharedNovaConfigEntityRole,
  SharedNovaConfigProject,
  SharedNovaConfigProjectDescription,
  SharedNovaConfigProjectLicense,
  SharedNovaConfigProjectName,
  SharedNovaConfigProjectNameSlug,
  SharedNovaConfigProjectPlatform,
  SharedNovaConfigUrls,
  SharedNovaConfigWorkflow,
  SharedNovaConfigWorkflows,
  SharedNovaConfigWorkflowSettings,
  SharedNovaConfigWorkspaceName,
  SharedNovaConfigWorkspacePolicy,
  SharedNovaConfigWorkspaceRecipeName,
  SharedNovaConfigWorkspaceRecipes,
  SharedNovaConfigWorkspaceRecipeSettings,
  SharedNovaConfigWorkspaceRole,
  SharedNovaConfigWorkspaces,
  SharedUrlProtocol,
} from '../shared.d.ts';

import type {
  LibItemEmailFields,
  LibItemGenericProtocols,
  LibItemRepositoryProtocols,
  LibItemUrlFields,
} from './item.d.ts';

/**
 * Lib - Nova Config - Config.
 *
 * @since 0.11.0
 */
export type LibNovaConfigConfig = SharedNovaConfigConfig;

/**
 * Lib - Nova Config - Constructor.
 *
 * @since 0.11.0
 */

/**
 * Lib - Nova Config - Get Array Of HTTP URLs.
 *
 * @since 0.11.0
 */
export type LibNovaConfigGetArrayOfHttpUrlsValue = unknown;

export type LibNovaConfigGetArrayOfHttpUrlsField = SharedUrlProtocol;

export type LibNovaConfigGetArrayOfHttpUrlsReturns = string[] | undefined;

export type LibNovaConfigGetArrayOfHttpUrlsItems = string[];

export type LibNovaConfigGetArrayOfHttpUrlsTypeGuard = string;

/**
 * Lib - Nova Config - Get Array Of Non Empty Strings.
 *
 * @since 0.11.0
 */
export type LibNovaConfigGetArrayOfNonEmptyStringsValue = unknown;

export type LibNovaConfigGetArrayOfNonEmptyStringsReturns = string[] | undefined;

export type LibNovaConfigGetArrayOfNonEmptyStringsItems = string[];

export type LibNovaConfigGetArrayOfNonEmptyStringsTypeGuard = string;

/**
 * Lib - Nova Config - Get Email.
 *
 * @since 0.11.0
 */
export type LibNovaConfigGetEmailValue = unknown;

export type LibNovaConfigGetEmailReturns = string | undefined;

export type LibNovaConfigGetEmailEmail = string | undefined;

/**
 * Lib - Nova Config - Get Non Empty String.
 *
 * @since 0.11.0
 */
export type LibNovaConfigGetNonEmptyStringValue = unknown;

export type LibNovaConfigGetNonEmptyStringReturns = string | undefined;

export type LibNovaConfigGetNonEmptyStringString = string;

/**
 * Lib - Nova Config - Get URL.
 *
 * @since 0.11.0
 */
export type LibNovaConfigGetUrlValue = unknown;

export type LibNovaConfigGetUrlField = SharedUrlProtocol;

export type LibNovaConfigGetUrlReturns = string | undefined;

export type LibNovaConfigGetUrlCandidateUrl = string | undefined;

export type LibNovaConfigGetUrlUrl = URL;

export type LibNovaConfigGetUrlAllowedProtocols = LibItemGenericProtocols | LibItemRepositoryProtocols;

export type LibNovaConfigGetUrlIsAllowed = boolean;

/**
 * Lib - Nova Config - Is Entity Role.
 *
 * @since 0.11.0
 */
export type LibNovaConfigIsEntityRoleValue = unknown;

export type LibNovaConfigIsEntityRoleTypeGuard = SharedNovaConfigEntityRole;

/**
 * Lib - Nova Config - Load.
 *
 * @since 0.11.0
 */
export type LibNovaConfigLoadReturns = Promise<SharedNovaConfigConfig>;

export type LibNovaConfigLoadCurrentDirectory = string;

export type LibNovaConfigLoadConfigFileName = string;

export type LibNovaConfigLoadConfigPath = string;

export type LibNovaConfigLoadRawFile = string;

export type LibNovaConfigLoadParsedFile = unknown;

/**
 * Lib - Nova Config - Parse.
 *
 * @since 0.11.0
 */
export type LibNovaConfigParseValue = unknown;

export type LibNovaConfigParseReturns = SharedNovaConfig;

export type LibNovaConfigParseResult = SharedNovaConfig;

export type LibNovaConfigParseProject = SharedNovaConfigProject | undefined;

export type LibNovaConfigParseEntities = SharedNovaConfigEntities | undefined;

export type LibNovaConfigParseEmails = SharedNovaConfigEmails | undefined;

export type LibNovaConfigParseWorkflows = SharedNovaConfigWorkflows | undefined;

export type LibNovaConfigParseUrls = SharedNovaConfigUrls | undefined;

export type LibNovaConfigParseWorkspaces = SharedNovaConfigWorkspaces | undefined;

/**
 * Lib - Nova Config - Parse Emails.
 *
 * @since 0.11.0
 */
export type LibNovaConfigParseEmailsValue = unknown;

export type LibNovaConfigParseEmailsReturns = SharedNovaConfigEmails | undefined;

export type LibNovaConfigParseEmailsEmails = SharedNovaConfigEmails;

export type LibNovaConfigParseEmailsEmailFields = LibItemEmailFields;

export type LibNovaConfigParseEmailsParsedEmail = string | undefined;

/**
 * Lib - Nova Config - Parse Entities.
 *
 * @since 0.11.0
 */
export type LibNovaConfigParseEntitiesValue = unknown;

export type LibNovaConfigParseEntitiesReturns = SharedNovaConfigEntities | undefined;

export type LibNovaConfigParseEntitiesEntities = SharedNovaConfigEntity[];

export type LibNovaConfigParseEntitiesParsedEntity = SharedNovaConfigEntity;

export type LibNovaConfigParseEntitiesName = string | undefined;

export type LibNovaConfigParseEntitiesEmail = string | undefined;

export type LibNovaConfigParseEntitiesUrl = string | undefined;

export type LibNovaConfigParseEntitiesRoles = unknown;

export type LibNovaConfigParseEntitiesParsedRoles = SharedNovaConfigEntityRole[];

export type LibNovaConfigParseEntitiesSortNameA = string;

export type LibNovaConfigParseEntitiesSortNameB = string;

/**
 * Lib - Nova Config - Parse Project.
 *
 * @since 0.11.0
 */
export type LibNovaConfigParseProjectValue = unknown;

export type LibNovaConfigParseProjectReturns = SharedNovaConfigProject | undefined;

export type LibNovaConfigParseProjectProject = SharedNovaConfigProject;

export type LibNovaConfigParseProjectValueName = unknown;

export type LibNovaConfigParseProjectValueDescription = unknown;

export type LibNovaConfigParseProjectValueKeywords = string[] | undefined;

export type LibNovaConfigParseProjectName = SharedNovaConfigProjectName;

export type LibNovaConfigParseProjectSlug = string | undefined;

export type LibNovaConfigParseProjectTitle = string | undefined;

export type LibNovaConfigParseProjectDescription = SharedNovaConfigProjectDescription;

export type LibNovaConfigParseProjectShort = string | undefined;

export type LibNovaConfigParseProjectLong = string | undefined;

export type LibNovaConfigParseProjectValueLegalName = string | undefined;

export type LibNovaConfigParseProjectValuePronouns = string | undefined;

export type LibNovaConfigParseProjectValuePlatforms = unknown;

export type LibNovaConfigParseProjectAllowedPlatforms = Set<string>;

export type LibNovaConfigParseProjectParsedPlatforms = SharedNovaConfigProjectPlatform[];

export type LibNovaConfigParseProjectPlatform = SharedNovaConfigProjectPlatform;

export type LibNovaConfigParseProjectValueStartingYear = unknown;

export type LibNovaConfigParseProjectValueLicense = string | undefined;

export type LibNovaConfigParseProjectAllowedLicenses = Set<string>;

export type LibNovaConfigParseProjectLicense = SharedNovaConfigProjectLicense;

/**
 * Lib - Nova Config - Parse URLs.
 *
 * @since 0.11.0
 */
export type LibNovaConfigParseUrlsValue = unknown;

export type LibNovaConfigParseUrlsReturns = SharedNovaConfigUrls | undefined;

export type LibNovaConfigParseUrlsUrls = SharedNovaConfigUrls;

export type LibNovaConfigParseUrlsUrlFields = LibItemUrlFields;

export type LibNovaConfigParseUrlsUrlFieldsFundSourcesIndex = number;

export type LibNovaConfigParseUrlsLoopIndex = number;

export type LibNovaConfigParseUrlsFundSources = string[] | undefined;

export type LibNovaConfigParseUrlsUrlField = string;

export type LibNovaConfigParseUrlsParsedUrl = string | undefined;

/**
 * Lib - Nova Config - Parse Workflows.
 *
 * @since 0.20.0
 */
export type LibNovaConfigParseWorkflowsValue = unknown;

export type LibNovaConfigParseWorkflowsReturns = SharedNovaConfigWorkflows | undefined;

export type LibNovaConfigParseWorkflowsWorkflows = SharedNovaConfigWorkflow[];

export type LibNovaConfigParseWorkflowsItem = unknown;

export type LibNovaConfigParseWorkflowsTemplate = string | undefined;

export type LibNovaConfigParseWorkflowsSuffix = string | undefined;

export type LibNovaConfigParseWorkflowsRawTriggers = unknown;

export type LibNovaConfigParseWorkflowsTriggers = string[];

export type LibNovaConfigParseWorkflowsTriggerValue = string | undefined;

export type LibNovaConfigParseWorkflowsRawDependsOn = unknown;

export type LibNovaConfigParseWorkflowsDependsOn = string[];

export type LibNovaConfigParseWorkflowsSettings = unknown;

export type LibNovaConfigParseWorkflowsWorkflow = SharedNovaConfigWorkflow;

export type LibNovaConfigParseWorkflowsParsedSettings = SharedNovaConfigWorkflowSettings;

export type LibNovaConfigParseWorkflowsSortedSettingsEntries = [string, unknown][];

export type LibNovaConfigParseWorkflowsSettingsKey = string;

export type LibNovaConfigParseWorkflowsSettingsValue = unknown;

export type LibNovaConfigParseWorkflowsSortTemplateCompare = number;

export type LibNovaConfigParseWorkflowsSortSuffixA = string;

export type LibNovaConfigParseWorkflowsSortSuffixB = string;

/**
 * Lib - Nova Config - Parse Workspaces.
 *
 * @since 0.11.0
 */
export type LibNovaConfigParseWorkspacesValue = unknown;

export type LibNovaConfigParseWorkspacesSlug = SharedNovaConfigProjectNameSlug | undefined;

export type LibNovaConfigParseWorkspacesReturns = SharedNovaConfigWorkspaces | undefined;

export type LibNovaConfigParseWorkspacesWorkspaces = SharedNovaConfigWorkspaces;

export type LibNovaConfigParseWorkspacesPath = string;

export type LibNovaConfigParseWorkspacesOptions = unknown;

export type LibNovaConfigParseWorkspacesNameCandidate = string | undefined;

export type LibNovaConfigParseWorkspacesRoleCandidate = string | undefined;

export type LibNovaConfigParseWorkspacesPolicyCandidate = string | undefined;

export type LibNovaConfigParseWorkspacesRole = SharedNovaConfigWorkspaceRole | undefined;

export type LibNovaConfigParseWorkspacesAllowedPolicies = SharedNovaConfigWorkspacePolicy[];

export type LibNovaConfigParseWorkspacesPolicy = SharedNovaConfigWorkspacePolicy | undefined;

export type LibNovaConfigParseWorkspacesRecipes = SharedNovaConfigWorkspaceRecipes | undefined;

export type LibNovaConfigParseWorkspacesRecipesCandidate = unknown;

export type LibNovaConfigParseWorkspacesAllowedRecipes = Set<SharedNovaConfigWorkspaceRecipeName>;

export type LibNovaConfigParseWorkspacesRecipeName = string;

export type LibNovaConfigParseWorkspacesRecipeTuple = unknown;

export type LibNovaConfigParseWorkspacesMatchedRecipe = SharedNovaConfigWorkspaceRecipeName | undefined;

export type LibNovaConfigParseWorkspacesEnabled = unknown;

export type LibNovaConfigParseWorkspacesSettings = unknown;

export type LibNovaConfigParseWorkspacesParsedSettings = SharedNovaConfigWorkspaceRecipeSettings;

export type LibNovaConfigParseWorkspacesSettingKey = string;

export type LibNovaConfigParseWorkspacesSettingValue = unknown;

export type LibNovaConfigParseWorkspacesWorkspaceKeys = string[];

export type LibNovaConfigParseWorkspacesSortedWorkspaces = SharedNovaConfigWorkspaces;

/**
 * Lib - Nova Config - Parse Workspaces - Is Name Allowed.
 *
 * @since 0.11.0
 */
export type LibNovaConfigParseWorkspacesIsNameAllowedRole = SharedNovaConfigWorkspaceRole;

export type LibNovaConfigParseWorkspacesIsNameAllowedName = SharedNovaConfigWorkspaceName;

export type LibNovaConfigParseWorkspacesIsNameAllowedReturns = boolean;

export type LibNovaConfigParseWorkspacesIsNameAllowed = (role: LibNovaConfigParseWorkspacesIsNameAllowedRole, name: LibNovaConfigParseWorkspacesIsNameAllowedName) => LibNovaConfigParseWorkspacesIsNameAllowedReturns;

export type LibNovaConfigParseWorkspacesIsNameAllowedBase = string;

export type LibNovaConfigParseWorkspacesIsNameAllowedDescriptor = string;

/**
 * Lib - Nova Config - Save.
 *
 * @since 0.11.0
 */
export type LibNovaConfigSaveReplaceFile = boolean;

export type LibNovaConfigSaveReturns = Promise<void>;

export type LibNovaConfigSaveCurrentDirectory = string;

export type LibNovaConfigSaveConfigPath = string;

export type LibNovaConfigSaveConfigJson = string;

export type LibNovaConfigSaveConfigContents = string;

/**
 * Lib - Nova Config - Set.
 *
 * @since 0.11.0
 */
export type LibNovaConfigSetConfig = SharedNovaConfigConfig;

export type LibNovaConfigSetReturns = void;
