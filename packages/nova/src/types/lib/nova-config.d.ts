import type {
  Shared_NovaConfig,
  Shared_NovaConfig_Agents,
  Shared_NovaConfig_Emails,
  Shared_NovaConfig_Entities,
  Shared_NovaConfig_Github,
  Shared_NovaConfig_Github_Features,
  Shared_NovaConfig_Github_IssueTemplate,
  Shared_NovaConfig_Github_IssueTemplate_BugReportFields,
  Shared_NovaConfig_Github_Policies,
  Shared_NovaConfig_Github_Policies_MergeMethods,
  Shared_NovaConfig_Github_Recipes,
  Shared_NovaConfig_Github_Topics,
  Shared_NovaConfig_Gitignore,
  Shared_NovaConfig_Gitignore_ProjectExcludes,
  Shared_NovaConfig_Project,
  Shared_NovaConfig_Project_Description,
  Shared_NovaConfig_Project_License,
  Shared_NovaConfig_Project_Name,
  Shared_NovaConfig_Project_Name_Slug,
  Shared_NovaConfig_Urls,
  Shared_NovaConfig_Workflows,
  Shared_NovaConfig_Workspaces,
  Shared_NovaConfigConfig,
  Shared_NovaConfigDotenvVariable,
  Shared_NovaConfigDotenvVariable_DefaultValue,
  Shared_NovaConfigDotenvVariable_Key,
  Shared_NovaConfigEntityRole,
  Shared_NovaConfigProjectPlatform,
  Shared_NovaConfigWorkflowTarget,
  Shared_NovaConfigWorkspace,
  Shared_NovaConfigWorkspace_Dotenv,
  Shared_NovaConfigWorkspace_Name,
  Shared_NovaConfigWorkspace_Policy,
  Shared_NovaConfigWorkspace_Recipes,
  Shared_NovaConfigWorkspace_Role,
  Shared_NovaConfigWorkspaceRecipeTuple,
  Shared_UrlProtocol,
} from '../shared.d.ts';

import type {
  Lib_Item_GenericProtocols,
  Lib_Item_RepositoryProtocols,
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
export type Lib_NovaConfig_Runner_Constructor_Config = {};

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
 * @since 0.18.0
 */
export type Lib_NovaConfig_Runner_GetGithubFeatures_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Returns = Shared_NovaConfig_Github_Features | undefined;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Result = {
  issues?: boolean; wiki?: boolean; projects?: boolean; discussions?: boolean;
};

export type Lib_NovaConfig_Runner_GetGithubFeatures_Issues = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Wiki = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Projects = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Discussions = boolean | undefined;

/**
 * Lib - Nova Config - Get GitHub Issue Template.
 *
 * @since 0.20.0
 */
export type Lib_NovaConfig_Runner_GetGithubIssueTemplate_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubIssueTemplate_Returns = Shared_NovaConfig_Github_IssueTemplate | undefined;

export type Lib_NovaConfig_Runner_GetGithubIssueTemplate_Result = {
  bugReportFields?: Shared_NovaConfig_Github_IssueTemplate_BugReportFields;
};

export type Lib_NovaConfig_Runner_GetGithubIssueTemplate_BugReportFields = Shared_NovaConfig_Github_IssueTemplate_BugReportFields | undefined;

/**
 * Lib - Nova Config - Get GitHub Policies.
 *
 * @since 0.18.0
 */
export type Lib_NovaConfig_Runner_GetGithubPolicies_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubPolicies_Returns = Shared_NovaConfig_Github_Policies | undefined;

export type Lib_NovaConfig_Runner_GetGithubPolicies_Result = {
  visibility?: 'public' | 'private' | 'internal'; defaultBranch?: string; mergeMethods?: Shared_NovaConfig_Github_Policies_MergeMethods; autoDeleteHeadBranch?: boolean;
};

export type Lib_NovaConfig_Runner_GetGithubPolicies_Visibility = 'public' | 'private' | 'internal' | undefined;

export type Lib_NovaConfig_Runner_GetGithubPolicies_DefaultBranch = string | undefined;

export type Lib_NovaConfig_Runner_GetGithubPolicies_MergeMethods = Shared_NovaConfig_Github_Policies_MergeMethods | undefined;

export type Lib_NovaConfig_Runner_GetGithubPolicies_AutoDeleteHeadBranch = boolean | undefined;

/**
 * Lib - Nova Config - Get GitHub Policies Merge Methods.
 *
 * @since 0.18.0
 */
export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Returns = Shared_NovaConfig_Github_Policies_MergeMethods | undefined;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Result = {
  merge?: boolean; squash?: boolean; rebase?: boolean;
};

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Merge = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Squash = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Rebase = boolean | undefined;

/**
 * Lib - Nova Config - Get GitHub Recipes.
 *
 * @since 0.18.0
 */
export type Lib_NovaConfig_Runner_GetGithubRecipes_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubRecipes_Returns = Shared_NovaConfig_Github_Recipes | undefined;

export type Lib_NovaConfig_Runner_GetGithubRecipes_Result = {
  'sync-features'?: boolean; 'sync-identity'?: boolean; 'sync-policies'?: boolean;
};

export type Lib_NovaConfig_Runner_GetGithubRecipes_SyncIdentity = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubRecipes_SyncFeatures = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubRecipes_SyncPolicies = boolean | undefined;

/**
 * Lib - Nova Config - Get GitHub Topics.
 *
 * @since 0.18.0
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

export type Lib_NovaConfig_Runner_Parse_Result = {
  project?: Shared_NovaConfig_Project; entities?: Shared_NovaConfig_Entities; emails?: Shared_NovaConfig_Emails; github?: Shared_NovaConfig_Github; workflows?: Shared_NovaConfig_Workflows; urls?: Shared_NovaConfig_Urls; workspaces?: Shared_NovaConfig_Workspaces; gitignore?: Shared_NovaConfig_Gitignore; agents?: Shared_NovaConfig_Agents;
};

export type Lib_NovaConfig_Runner_Parse_Project = Shared_NovaConfig_Project | undefined;

export type Lib_NovaConfig_Runner_Parse_Entities = Shared_NovaConfig_Entities | undefined;

export type Lib_NovaConfig_Runner_Parse_Emails = Shared_NovaConfig_Emails | undefined;

export type Lib_NovaConfig_Runner_Parse_Github = Shared_NovaConfig_Github | undefined;

export type Lib_NovaConfig_Runner_Parse_Workflows = Shared_NovaConfig_Workflows | undefined;

export type Lib_NovaConfig_Runner_Parse_Urls = Shared_NovaConfig_Urls | undefined;

export type Lib_NovaConfig_Runner_Parse_Workspaces = Shared_NovaConfig_Workspaces | undefined;

export type Lib_NovaConfig_Runner_Parse_Gitignore = Shared_NovaConfig_Gitignore | undefined;

export type Lib_NovaConfig_Runner_Parse_Agents = Shared_NovaConfig_Agents | undefined;

/**
 * Lib - Nova Config - Parse Agents.
 *
 * @since 0.20.0
 */
export type Lib_NovaConfig_Runner_ParseAgents_Value = unknown;

export type Lib_NovaConfig_Runner_ParseAgents_Returns = Shared_NovaConfig_Agents | undefined;

export type Lib_NovaConfig_Runner_ParseAgents_Agents = ('claude-code' | 'codex')[];

/**
 * Lib - Nova Config - Parse Dotenv.
 *
 * @since 0.20.0
 */
export type Lib_NovaConfig_Runner_ParseDotenv_Value = unknown;

export type Lib_NovaConfig_Runner_ParseDotenv_Returns = Shared_NovaConfigDotenvVariable[] | undefined;

export type Lib_NovaConfig_Runner_ParseDotenv_RawVariables = unknown;

export type Lib_NovaConfig_Runner_ParseDotenv_Variables_Key = string;

export type Lib_NovaConfig_Runner_ParseDotenv_Variables_DefaultValue = string;

export type Lib_NovaConfig_Runner_ParseDotenv_Variables = {
  key: Lib_NovaConfig_Runner_ParseDotenv_Variables_Key;
  defaultValue: Lib_NovaConfig_Runner_ParseDotenv_Variables_DefaultValue;
}[];

export type Lib_NovaConfig_Runner_ParseDotenv_VariablesByKey = Map<string, Shared_NovaConfigDotenvVariable>;

export type Lib_NovaConfig_Runner_ParseDotenv_RawVariable = unknown;

export type Lib_NovaConfig_Runner_ParseDotenv_Key = Shared_NovaConfigDotenvVariable_Key | undefined;

export type Lib_NovaConfig_Runner_ParseDotenv_IsReservedKey = boolean;

export type Lib_NovaConfig_Runner_ParseDotenv_DefaultValueCandidate = Shared_NovaConfigDotenvVariable_DefaultValue | undefined;

export type Lib_NovaConfig_Runner_ParseDotenv_DefaultValue = string;

/**
 * Lib - Nova Config - Parse Emails.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_ParseEmails_Value = unknown;

export type Lib_NovaConfig_Runner_ParseEmails_Returns = Shared_NovaConfig_Emails | undefined;

export type Lib_NovaConfig_Runner_ParseEmails_Emails = {
  bugs?: string;
};

export type Lib_NovaConfig_Runner_ParseEmails_EmailFields = readonly ['bugs'];

export type Lib_NovaConfig_Runner_ParseEmails_ParsedEmail = string | undefined;

/**
 * Lib - Nova Config - Parse Entities.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_ParseEntities_Value = unknown;

export type Lib_NovaConfig_Runner_ParseEntities_Returns = Shared_NovaConfig_Entities | undefined;

export type Lib_NovaConfig_Runner_ParseEntities_Entities = {
  name?: string; email?: string; url?: string; roles?: Shared_NovaConfigEntityRole[];
}[];

export type Lib_NovaConfig_Runner_ParseEntities_ParsedEntity = {
  name?: string; email?: string; url?: string; roles?: Shared_NovaConfigEntityRole[];
};

export type Lib_NovaConfig_Runner_ParseEntities_Name = string | undefined;

export type Lib_NovaConfig_Runner_ParseEntities_Email = string | undefined;

export type Lib_NovaConfig_Runner_ParseEntities_Url = string | undefined;

export type Lib_NovaConfig_Runner_ParseEntities_Roles = unknown;

export type Lib_NovaConfig_Runner_ParseEntities_ParsedRoles = ('author' | 'contributor' | 'supporter')[];

export type Lib_NovaConfig_Runner_ParseEntities_NameA = string;

export type Lib_NovaConfig_Runner_ParseEntities_NameB = string;

/**
 * Lib - Nova Config - Parse GitHub.
 *
 * @since 0.18.0
 */
export type Lib_NovaConfig_Runner_ParseGithub_Value = unknown;

export type Lib_NovaConfig_Runner_ParseGithub_Returns = Shared_NovaConfig_Github | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Result = {
  owner?: string; repo?: string; recipes?: Shared_NovaConfig_Github_Recipes; topics?: string[]; features?: Shared_NovaConfig_Github_Features; policies?: Shared_NovaConfig_Github_Policies; issueTemplate?: Shared_NovaConfig_Github_IssueTemplate;
};

export type Lib_NovaConfig_Runner_ParseGithub_OwnerCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Owner = string | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_RepoCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Repo = string | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Recipes = Shared_NovaConfig_Github_Recipes | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Topics = Shared_NovaConfig_Github_Topics | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Features = Shared_NovaConfig_Github_Features | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Policies = Shared_NovaConfig_Github_Policies | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_IssueTemplate = Shared_NovaConfig_Github_IssueTemplate | undefined;

/**
 * Lib - Nova Config - Parse Gitignore.
 *
 * @since 0.20.0
 */
export type Lib_NovaConfig_Runner_ParseGitignore_Value = unknown;

export type Lib_NovaConfig_Runner_ParseGitignore_Returns = Shared_NovaConfig_Gitignore | undefined;

export type Lib_NovaConfig_Runner_ParseGitignore_Result = {
  projectExcludes?: Shared_NovaConfig_Gitignore_ProjectExcludes;
};

export type Lib_NovaConfig_Runner_ParseGitignore_ProjectExcludes = Shared_NovaConfig_Gitignore_ProjectExcludes | undefined;

/**
 * Lib - Nova Config - Parse Project.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_ParseProject_Value = unknown;

export type Lib_NovaConfig_Runner_ParseProject_Returns = Shared_NovaConfig_Project | undefined;

export type Lib_NovaConfig_Runner_ParseProject_Project = {
  name?: Shared_NovaConfig_Project_Name; description?: Shared_NovaConfig_Project_Description; keywords?: string[]; legalName?: string; pronouns?: 'personal' | 'business'; platforms?: Shared_NovaConfigProjectPlatform[]; startingYear?: number; license?: Shared_NovaConfig_Project_License;
};

export type Lib_NovaConfig_Runner_ParseProject_ValueName = unknown;

export type Lib_NovaConfig_Runner_ParseProject_ValueDescription = unknown;

export type Lib_NovaConfig_Runner_ParseProject_ValueKeywords = string[] | undefined;

export type Lib_NovaConfig_Runner_ParseProject_Name = {
  slug?: Shared_NovaConfig_Project_Name_Slug; title?: string;
};

export type Lib_NovaConfig_Runner_ParseProject_Slug = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_Title = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_Description = {
  short?: string; long?: string;
};

export type Lib_NovaConfig_Runner_ParseProject_Short = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_Long = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_ValueLegalName = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_ValuePronouns = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_ValuePlatforms = unknown;

export type Lib_NovaConfig_Runner_ParseProject_AllowedPlatforms = Set<string>;

export type Lib_NovaConfig_Runner_ParseProject_ParsedPlatforms = ('nodejs' | 'swift' | 'android' | 'java' | 'kotlin' | 'csharp' | 'php' | 'python' | 'macos' | 'linux' | 'windows')[];

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

export type Lib_NovaConfig_Runner_ParseUrls_Urls = {
  homepage?: string; repository?: string; bugs?: string; license?: string; logo?: string; docker?: string; documentation?: string; npm?: string; fundSources?: string[]; privacyPolicy?: string; termsOfUse?: string;
};

export type Lib_NovaConfig_Runner_ParseUrls_UrlFields = readonly ['homepage', 'repository', 'bugs', 'license', 'logo', 'documentation', 'npm', 'docker', 'privacyPolicy', 'termsOfUse'];

export type Lib_NovaConfig_Runner_ParseUrls_UrlFieldsFundSourcesIndex = number;

export type Lib_NovaConfig_Runner_ParseUrls_LoopIndex = number;

export type Lib_NovaConfig_Runner_ParseUrls_FundSources = string[] | undefined;

export type Lib_NovaConfig_Runner_ParseUrls_UrlField = string;

export type Lib_NovaConfig_Runner_ParseUrls_ParsedUrl = string | undefined;

/**
 * Lib - Nova Config - Parse Workflows.
 *
 * @since 0.18.0
 */
export type Lib_NovaConfig_Runner_ParseWorkflows_Value = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Returns = Shared_NovaConfig_Workflows | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_Workflows_Element = {
  'template': string;
  'suffix': string;
  'triggers': string[];
  'depends-on'?: string[];
  'scopes'?: string[];
  'targets'?: Shared_NovaConfigWorkflowTarget[];
  'settings'?: Record<string, string>;
};

export type Lib_NovaConfig_Runner_ParseWorkflows_Workflows = Lib_NovaConfig_Runner_ParseWorkflows_Workflows_Element[];

export type Lib_NovaConfig_Runner_ParseWorkflows_CastItem = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Template = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_Suffix = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_RawTriggers = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Triggers = string[];

export type Lib_NovaConfig_Runner_ParseWorkflows_TriggerValue = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_RawDependsOn = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_DependsOn = string[];

export type Lib_NovaConfig_Runner_ParseWorkflows_RawScopes = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Scopes = string[];

export type Lib_NovaConfig_Runner_ParseWorkflows_RawTargets = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Targets_Element_Type = string;

export type Lib_NovaConfig_Runner_ParseWorkflows_Targets_Element_WorkingDir = string;

export type Lib_NovaConfig_Runner_ParseWorkflows_Targets_Element_Needs = string[];

export type Lib_NovaConfig_Runner_ParseWorkflows_Targets_Element = {
  type: Lib_NovaConfig_Runner_ParseWorkflows_Targets_Element_Type;
  workingDir: Lib_NovaConfig_Runner_ParseWorkflows_Targets_Element_WorkingDir;
  needs?: Lib_NovaConfig_Runner_ParseWorkflows_Targets_Element_Needs;
};

export type Lib_NovaConfig_Runner_ParseWorkflows_Targets = Lib_NovaConfig_Runner_ParseWorkflows_Targets_Element[];

export type Lib_NovaConfig_Runner_ParseWorkflows_RawTargetValue = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_TargetType = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_TargetWorkingDir = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_RawTargetNeeds = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_TargetNeeds = string[];

export type Lib_NovaConfig_Runner_ParseWorkflows_Target_Type = string;

export type Lib_NovaConfig_Runner_ParseWorkflows_Target_WorkingDir = string;

export type Lib_NovaConfig_Runner_ParseWorkflows_Target_Needs = string[];

export type Lib_NovaConfig_Runner_ParseWorkflows_Target = {
  type: Lib_NovaConfig_Runner_ParseWorkflows_Target_Type;
  workingDir: Lib_NovaConfig_Runner_ParseWorkflows_Target_WorkingDir;
  needs?: Lib_NovaConfig_Runner_ParseWorkflows_Target_Needs;
};

export type Lib_NovaConfig_Runner_ParseWorkflows_Settings = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Workflow = {
  'template': string;
  'suffix': string;
  'triggers': string[];
  'depends-on'?: string[];
  'scopes'?: string[];
  'targets'?: Shared_NovaConfigWorkflowTarget[];
  'settings'?: Record<string, string>;
};

export type Lib_NovaConfig_Runner_ParseWorkflows_ParsedSettings = Record<string, string>;

export type Lib_NovaConfig_Runner_ParseWorkflows_SortedSettingsEntries = [string, unknown][];

export type Lib_NovaConfig_Runner_ParseWorkflows_SettingsKey = string;

export type Lib_NovaConfig_Runner_ParseWorkflows_SettingsValue = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_TemplateCompare = number;

export type Lib_NovaConfig_Runner_ParseWorkflows_SuffixA = string;

export type Lib_NovaConfig_Runner_ParseWorkflows_SuffixB = string;

/**
 * Lib - Nova Config - Parse Workspace Dotenv.
 *
 * @since 0.20.0
 */
export type Lib_NovaConfig_Runner_ParseWorkspaceDotenv_Value = unknown;

export type Lib_NovaConfig_Runner_ParseWorkspaceDotenv_Returns = Shared_NovaConfigWorkspace_Dotenv | undefined;

/**
 * Lib - Nova Config - Parse Workspaces.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_ParseWorkspaces_Value = unknown;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Slug = Shared_NovaConfig_Project_Name_Slug | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Returns = Shared_NovaConfig_Workspaces | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Workspaces = {
  [key: string]: Shared_NovaConfigWorkspace;
};

export type Lib_NovaConfig_Runner_ParseWorkspaces_Role = 'project' | 'docs' | 'config' | 'app' | 'package' | 'tool' | 'template';

export type Lib_NovaConfig_Runner_ParseWorkspaces_Name = Shared_NovaConfigWorkspace_Name;

export type Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed = (role: Lib_NovaConfig_Runner_ParseWorkspaces_Role, name: Lib_NovaConfig_Runner_ParseWorkspaces_Name) => Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Returns;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Path = string;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Options = unknown;

export type Lib_NovaConfig_Runner_ParseWorkspaces_NameCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_DisplayNameCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_RoleCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_PolicyCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_MatchedRole = Shared_NovaConfigWorkspace_Role | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_AllowedPolicies = ('freezable' | 'trackable' | 'distributable')[];

export type Lib_NovaConfig_Runner_ParseWorkspaces_Policy = Shared_NovaConfigWorkspace_Policy | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Recipes = Shared_NovaConfigWorkspace_Recipes | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_RecipesCandidate = unknown;

export type Lib_NovaConfig_Runner_ParseWorkspaces_ParsedRecipes = {
  [key: string]: Shared_NovaConfigWorkspaceRecipeTuple;
};

export type Lib_NovaConfig_Runner_ParseWorkspaces_RecipeTuple = unknown;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Enabled = unknown;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Settings = unknown;

export type Lib_NovaConfig_Runner_ParseWorkspaces_ParsedSettings = Record<string, boolean>;

export type Lib_NovaConfig_Runner_ParseWorkspaces_SettingKey = string;

export type Lib_NovaConfig_Runner_ParseWorkspaces_SettingValue = unknown;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Dotenv = Shared_NovaConfigWorkspace_Dotenv | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_WorkspaceKeys = string[];

export type Lib_NovaConfig_Runner_ParseWorkspaces_SortedWorkspaces = {
  [key: string]: Shared_NovaConfigWorkspace;
};

/**
 * Lib - Nova Config - Parse Workspaces - Is Name Allowed.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Returns = boolean;

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
