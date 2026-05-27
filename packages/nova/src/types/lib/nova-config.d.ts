import type {
  Shared_NovaConfig,
  Shared_NovaConfig_Emails,
  Shared_NovaConfig_Entities,
  Shared_NovaConfig_Github,
  Shared_NovaConfig_Github_Features,
  Shared_NovaConfig_Github_Policies,
  Shared_NovaConfig_Github_Policies_MergeMethods,
  Shared_NovaConfig_Github_Recipes,
  Shared_NovaConfig_Github_Topics,
  Shared_NovaConfig_Project,
  Shared_NovaConfig_Project_Description,
  Shared_NovaConfig_Project_License,
  Shared_NovaConfig_Project_Name,
  Shared_NovaConfig_Project_Name_Slug,
  Shared_NovaConfig_Urls,
  Shared_NovaConfig_Workflows,
  Shared_NovaConfig_Workspaces,
  Shared_NovaConfigConfig,
  Shared_NovaConfigEntity,
  Shared_NovaConfigEntityRole,
  Shared_NovaConfigProjectPlatform,
  Shared_NovaConfigWorkflow,
  Shared_NovaConfigWorkflow_Scopes,
  Shared_NovaConfigWorkflow_Settings,
  Shared_NovaConfigWorkflow_Targets,
  Shared_NovaConfigWorkflowTarget,
  Shared_NovaConfigWorkflowTarget_Needs,
  Shared_NovaConfigWorkspace_Name,
  Shared_NovaConfigWorkspace_Policy,
  Shared_NovaConfigWorkspace_Recipes,
  Shared_NovaConfigWorkspace_Role,
  Shared_NovaConfigWorkspaceRecipeName,
  Shared_NovaConfigWorkspaceRecipeSettings,
  Shared_UrlProtocol,
} from '../shared.d.ts';

import type {
  Lib_Item_EmailFields,
  Lib_Item_GenericProtocols,
  Lib_Item_RepositoryProtocols,
  Lib_Item_UrlFields,
} from './item.d.ts';

/**
 * Lib - Nova Config - Config.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_Config = Shared_NovaConfigConfig;

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
export type Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Value = unknown;

export type Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Field = Shared_UrlProtocol;

export type Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Returns = string[] | undefined;

export type Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Items = string[];

export type Lib_NovaConfig_Runner_GetArrayOfHttpUrls_TypeGuard = string;

/**
 * Lib - Nova Config - Get Array Of Non Empty Strings.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Value = unknown;

export type Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Returns = string[] | undefined;

export type Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Items = string[];

export type Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_TypeGuard = string;

/**
 * Lib - Nova Config - Get Email.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_GetEmail_Value = unknown;

export type Lib_NovaConfig_Runner_GetEmail_Returns = string | undefined;

export type Lib_NovaConfig_Runner_GetEmail_Email = string | undefined;

/**
 * Lib - Nova Config - Get GitHub Features.
 *
 * @since 0.22.0
 */
export type Lib_NovaConfig_Runner_GetGithubFeatures_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Returns = Shared_NovaConfig_Github_Features | undefined;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Result = Shared_NovaConfig_Github_Features;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Issues = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Wiki = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Projects = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Discussions = boolean | undefined;

/**
 * Lib - Nova Config - Get GitHub Policies.
 *
 * @since 0.22.0
 */
export type Lib_NovaConfig_Runner_GetGithubPolicies_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubPolicies_Returns = Shared_NovaConfig_Github_Policies | undefined;

export type Lib_NovaConfig_Runner_GetGithubPolicies_Result = Shared_NovaConfig_Github_Policies;

export type Lib_NovaConfig_Runner_GetGithubPolicies_Visibility = 'public' | 'private' | 'internal' | undefined;

export type Lib_NovaConfig_Runner_GetGithubPolicies_DefaultBranch = string | undefined;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods = Shared_NovaConfig_Github_Policies_MergeMethods | undefined;

export type Lib_NovaConfig_Runner_GetGithubPolicies_AutoDeleteHeadBranch = boolean | undefined;

/**
 * Lib - Nova Config - Get GitHub Policies Merge Methods.
 *
 * @since 0.22.0
 */
export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Returns = Shared_NovaConfig_Github_Policies_MergeMethods | undefined;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Result = Shared_NovaConfig_Github_Policies_MergeMethods;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Merge = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Squash = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Rebase = boolean | undefined;

/**
 * Lib - Nova Config - Get GitHub Recipes.
 *
 * @since 0.22.0
 */
export type Lib_NovaConfig_Runner_GetGithubRecipes_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubRecipes_Returns = Shared_NovaConfig_Github_Recipes | undefined;

export type Lib_NovaConfig_Runner_GetGithubRecipes_Result = Shared_NovaConfig_Github_Recipes;

export type Lib_NovaConfig_Runner_GetGithubRecipes_SyncIdentity = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubRecipes_SyncFeatures = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubRecipes_SyncPolicies = boolean | undefined;

/**
 * Lib - Nova Config - Get GitHub Topics.
 *
 * @since 0.22.0
 */
export type Lib_NovaConfig_Runner_GetGithubTopics_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubTopics_Returns = Shared_NovaConfig_Github_Topics | undefined;

export type Lib_NovaConfig_Runner_GetGithubTopics_TypeGuard = string;

/**
 * Lib - Nova Config - Get Non Empty String.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_GetNonEmptyString_Value = unknown;

export type Lib_NovaConfig_Runner_GetNonEmptyString_Returns = string | undefined;

export type Lib_NovaConfig_Runner_GetNonEmptyString_String = string;

/**
 * Lib - Nova Config - Get URL.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_GetUrl_Value = unknown;

export type Lib_NovaConfig_Runner_GetUrl_Field = Shared_UrlProtocol;

export type Lib_NovaConfig_Runner_GetUrl_Returns = string | undefined;

export type Lib_NovaConfig_Runner_GetUrl_CandidateUrl = string | undefined;

export type Lib_NovaConfig_Runner_GetUrl_Url = URL;

export type Lib_NovaConfig_Runner_GetUrl_AllowedProtocols = Lib_Item_GenericProtocols | Lib_Item_RepositoryProtocols;

export type Lib_NovaConfig_Runner_GetUrl_IsAllowed = boolean;

/**
 * Lib - Nova Config - Is Entity Role.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_IsEntityRole_Value = unknown;

export type Lib_NovaConfig_Runner_IsEntityRole_TypeGuard = Shared_NovaConfigEntityRole;

/**
 * Lib - Nova Config - Load.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_Load_Returns = Promise<Shared_NovaConfigConfig>;

export type Lib_NovaConfig_Runner_Load_CurrentDirectory = string;

export type Lib_NovaConfig_Runner_Load_ConfigFileName = string;

export type Lib_NovaConfig_Runner_Load_ConfigPath = string;

export type Lib_NovaConfig_Runner_Load_RawFile = string;

export type Lib_NovaConfig_Runner_Load_ParsedFile = unknown;

/**
 * Lib - Nova Config - Parse.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_Parse_Value = unknown;

export type Lib_NovaConfig_Runner_Parse_Returns = Shared_NovaConfig;

export type Lib_NovaConfig_Runner_Parse_Result = Shared_NovaConfig;

export type Lib_NovaConfig_Runner_ParseProject = Shared_NovaConfig_Project | undefined;

export type Lib_NovaConfig_Runner_ParseEntities = Shared_NovaConfig_Entities | undefined;

export type Lib_NovaConfig_Runner_ParseEmails = Shared_NovaConfig_Emails | undefined;

export type Lib_NovaConfig_Runner_ParseGithub = Shared_NovaConfig_Github | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows = Shared_NovaConfig_Workflows | undefined;

export type Lib_NovaConfig_Runner_ParseUrls = Shared_NovaConfig_Urls | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces = Shared_NovaConfig_Workspaces | undefined;

/**
 * Lib - Nova Config - Parse Emails.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_ParseEmails_Value = unknown;

export type Lib_NovaConfig_Runner_ParseEmails_Returns = Shared_NovaConfig_Emails | undefined;

export type Lib_NovaConfig_Runner_ParseEmails_Emails = Shared_NovaConfig_Emails;

export type Lib_NovaConfig_Runner_ParseEmails_EmailFields = Lib_Item_EmailFields;

export type Lib_NovaConfig_Runner_ParseEmails_ParsedEmail = string | undefined;

/**
 * Lib - Nova Config - Parse Entities.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_ParseEntities_Value = unknown;

export type Lib_NovaConfig_Runner_ParseEntities_Returns = Shared_NovaConfig_Entities | undefined;

export type Lib_NovaConfig_Runner_ParseEntities_Entities = Shared_NovaConfigEntity[];

export type Lib_NovaConfig_Runner_ParseEntities_ParsedEntity = Shared_NovaConfigEntity;

export type Lib_NovaConfig_Runner_ParseEntities_Name = string | undefined;

export type Lib_NovaConfig_Runner_ParseEntities_Email = string | undefined;

export type Lib_NovaConfig_Runner_ParseEntities_Url = string | undefined;

export type Lib_NovaConfig_Runner_ParseEntities_Roles = unknown;

export type Lib_NovaConfig_Runner_ParseEntities_ParsedRoles = Shared_NovaConfigEntityRole[];

export type Lib_NovaConfig_Runner_ParseEntities_SortNameA = string;

export type Lib_NovaConfig_Runner_ParseEntities_SortNameB = string;

/**
 * Lib - Nova Config - Parse GitHub.
 *
 * @since 0.22.0
 */
export type Lib_NovaConfig_Runner_ParseGithub_Value = unknown;

export type Lib_NovaConfig_Runner_ParseGithub_Returns = Shared_NovaConfig_Github | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Result = Shared_NovaConfig_Github;

export type Lib_NovaConfig_Runner_ParseGithub_OwnerCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Owner = string | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_RepoCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Repo = string | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Recipes = Shared_NovaConfig_Github_Recipes | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Topics = Shared_NovaConfig_Github_Topics | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Features = Shared_NovaConfig_Github_Features | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Policies = Shared_NovaConfig_Github_Policies | undefined;

/**
 * Lib - Nova Config - Parse Project.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_ParseProject_Value = unknown;

export type Lib_NovaConfig_Runner_ParseProject_Returns = Shared_NovaConfig_Project | undefined;

export type Lib_NovaConfig_Runner_ParseProject_Project = Shared_NovaConfig_Project;

export type Lib_NovaConfig_Runner_ParseProject_ValueName = unknown;

export type Lib_NovaConfig_Runner_ParseProject_ValueDescription = unknown;

export type Lib_NovaConfig_Runner_ParseProject_ValueKeywords = string[] | undefined;

export type Lib_NovaConfig_Runner_ParseProject_Name = Shared_NovaConfig_Project_Name;

export type Lib_NovaConfig_Runner_ParseProject_Slug = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_Title = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_Description = Shared_NovaConfig_Project_Description;

export type Lib_NovaConfig_Runner_ParseProject_Short = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_Long = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_ValueLegalName = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_ValuePronouns = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_ValuePlatforms = unknown;

export type Lib_NovaConfig_Runner_ParseProject_AllowedPlatforms = Set<string>;

export type Lib_NovaConfig_Runner_ParseProject_ParsedPlatforms = Shared_NovaConfigProjectPlatform[];

export type Lib_NovaConfig_Runner_ParseProject_Platform = Shared_NovaConfigProjectPlatform;

export type Lib_NovaConfig_Runner_ParseProject_ValueStartingYear = unknown;

export type Lib_NovaConfig_Runner_ParseProject_ValueLicense = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_AllowedLicenses = Set<string>;

export type Lib_NovaConfig_Runner_ParseProject_License = Shared_NovaConfig_Project_License;

/**
 * Lib - Nova Config - Parse URLs.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_ParseUrls_Value = unknown;

export type Lib_NovaConfig_Runner_ParseUrls_Returns = Shared_NovaConfig_Urls | undefined;

export type Lib_NovaConfig_Runner_ParseUrls_Urls = Shared_NovaConfig_Urls;

export type Lib_NovaConfig_Runner_ParseUrls_UrlFields = Lib_Item_UrlFields;

export type Lib_NovaConfig_Runner_ParseUrls_UrlFieldsFundSourcesIndex = number;

export type Lib_NovaConfig_Runner_ParseUrls_LoopIndex = number;

export type Lib_NovaConfig_Runner_ParseUrls_FundSources = string[] | undefined;

export type Lib_NovaConfig_Runner_ParseUrls_UrlField = string;

export type Lib_NovaConfig_Runner_ParseUrls_ParsedUrl = string | undefined;

/**
 * Lib - Nova Config - Parse Workflows.
 *
 * @since 0.20.0
 */
export type Lib_NovaConfig_Runner_ParseWorkflows_Value = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Returns = Shared_NovaConfig_Workflows | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_Workflows = Shared_NovaConfigWorkflow[];

export type Lib_NovaConfig_Runner_ParseWorkflows_Item = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Template = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_Suffix = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_RawTriggers = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Triggers = string[];

export type Lib_NovaConfig_Runner_ParseWorkflows_TriggerValue = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_RawDependsOn = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_DependsOn = string[];

export type Lib_NovaConfig_Runner_ParseWorkflows_RawScopes = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Scopes = Shared_NovaConfigWorkflow_Scopes;

export type Lib_NovaConfig_Runner_ParseWorkflows_RawTargets = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Targets = Shared_NovaConfigWorkflow_Targets;

export type Lib_NovaConfig_Runner_ParseWorkflows_RawTarget = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_TargetType = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_TargetWorkingDir = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_TargetRawNeeds = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_TargetNeeds = Shared_NovaConfigWorkflowTarget_Needs;

export type Lib_NovaConfig_Runner_ParseWorkflows_Target = Shared_NovaConfigWorkflowTarget;

export type Lib_NovaConfig_Runner_ParseWorkflows_Settings = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Workflow = Shared_NovaConfigWorkflow;

export type Lib_NovaConfig_Runner_ParseWorkflows_ParsedSettings = Shared_NovaConfigWorkflow_Settings;

export type Lib_NovaConfig_Runner_ParseWorkflows_SortedSettingsEntries = [string, unknown][];

export type Lib_NovaConfig_Runner_ParseWorkflows_SettingsKey = string;

export type Lib_NovaConfig_Runner_ParseWorkflows_SettingsValue = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_SortTemplateCompare = number;

export type Lib_NovaConfig_Runner_ParseWorkflows_SortSuffixA = string;

export type Lib_NovaConfig_Runner_ParseWorkflows_SortSuffixB = string;

/**
 * Lib - Nova Config - Parse Workspaces.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_ParseWorkspaces_Value = unknown;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Slug = Shared_NovaConfig_Project_Name_Slug | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Returns = Shared_NovaConfig_Workspaces | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Workspaces = Shared_NovaConfig_Workspaces;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Path = string;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Options = unknown;

export type Lib_NovaConfig_Runner_ParseWorkspaces_NameCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_DisplayNameCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_RoleCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_PolicyCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Role = Shared_NovaConfigWorkspace_Role | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_AllowedPolicies = Shared_NovaConfigWorkspace_Policy[];

export type Lib_NovaConfig_Runner_ParseWorkspaces_Policy = Shared_NovaConfigWorkspace_Policy | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Recipes = Shared_NovaConfigWorkspace_Recipes | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_RecipesCandidate = unknown;

export type Lib_NovaConfig_Runner_ParseWorkspaces_AllowedRecipes = Set<Shared_NovaConfigWorkspaceRecipeName>;

export type Lib_NovaConfig_Runner_ParseWorkspaces_RecipeName = string;

export type Lib_NovaConfig_Runner_ParseWorkspaces_RecipeTuple = unknown;

export type Lib_NovaConfig_Runner_ParseWorkspaces_MatchedRecipe = Shared_NovaConfigWorkspaceRecipeName | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Enabled = unknown;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Settings = unknown;

export type Lib_NovaConfig_Runner_ParseWorkspaces_ParsedSettings = Shared_NovaConfigWorkspaceRecipeSettings;

export type Lib_NovaConfig_Runner_ParseWorkspaces_SettingKey = string;

export type Lib_NovaConfig_Runner_ParseWorkspaces_SettingValue = unknown;

export type Lib_NovaConfig_Runner_ParseWorkspaces_WorkspaceKeys = string[];

export type Lib_NovaConfig_Runner_ParseWorkspaces_SortedWorkspaces = Shared_NovaConfig_Workspaces;

/**
 * Lib - Nova Config - Parse Workspaces - Is Name Allowed.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Role = Shared_NovaConfigWorkspace_Role;

export type Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Name = Shared_NovaConfigWorkspace_Name;

export type Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Returns = boolean;

export type Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed = (role: Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Role, name: Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Name) => Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Returns;

export type Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Base = string;

export type Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Descriptor = string;

/**
 * Lib - Nova Config - Save.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_Save_ReplaceFile = boolean;

export type Lib_NovaConfig_Runner_Save_Returns = Promise<void>;

export type Lib_NovaConfig_Runner_Save_CurrentDirectory = string;

export type Lib_NovaConfig_Runner_Save_ConfigPath = string;

export type Lib_NovaConfig_Runner_Save_ConfigJson = string;

export type Lib_NovaConfig_Runner_Save_ConfigContents = string;

/**
 * Lib - Nova Config - Set.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_Set_Config = Shared_NovaConfigConfig;

export type Lib_NovaConfig_Runner_Set_Returns = void;
