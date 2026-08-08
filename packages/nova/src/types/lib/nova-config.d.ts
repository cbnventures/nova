import type {
  Shared_NovaConfig,
  Shared_NovaConfig_Agents,
  Shared_NovaConfig_Emails,
  Shared_NovaConfig_Entities,
  Shared_NovaConfig_Environment,
  Shared_NovaConfig_Github,
  Shared_NovaConfig_Github_Features,
  Shared_NovaConfig_Github_IssueTemplate,
  Shared_NovaConfig_Github_IssueTemplate_BugReportFields,
  Shared_NovaConfig_Github_Policies,
  Shared_NovaConfig_Github_Policies_MergeMethods,
  Shared_NovaConfig_Github_Topics,
  Shared_NovaConfig_Gitignore,
  Shared_NovaConfig_Gitignore_ProjectExcludes,
  Shared_NovaConfig_Project,
  Shared_NovaConfig_Project_Description,
  Shared_NovaConfig_Project_License,
  Shared_NovaConfig_Project_Name,
  Shared_NovaConfig_Project_Name_Slug,
  Shared_NovaConfig_RecipeEntry,
  Shared_NovaConfig_RecipeEntry_Settings,
  Shared_NovaConfig_Recipes,
  Shared_NovaConfig_Recipes_Github,
  Shared_NovaConfig_Recipes_License,
  Shared_NovaConfig_Recipes_PackageJson,
  Shared_NovaConfig_Recipes_ReadMe,
  Shared_NovaConfig_Settings,
  Shared_NovaConfig_Urls,
  Shared_NovaConfig_Workflows,
  Shared_NovaConfig_Workspaces,
  Shared_NovaConfigConfig,
  Shared_NovaConfigEntityRole,
  Shared_NovaConfigEnvironment,
  Shared_NovaConfigEnvironment_Workflows,
  Shared_NovaConfigEnvironment_Workspaces,
  Shared_NovaConfigEnvironmentProject,
  Shared_NovaConfigEnvironmentValue,
  Shared_NovaConfigEnvironmentValue_Reach,
  Shared_NovaConfigEnvironmentWorkflow,
  Shared_NovaConfigEnvironmentWorkspace,
  Shared_NovaConfigProjectPlatform,
  Shared_NovaConfigWorkflowDeployTarget,
  Shared_NovaConfigWorkspace,
  Shared_NovaConfigWorkspace_Name,
  Shared_NovaConfigWorkspace_Policy,
  Shared_NovaConfigWorkspace_Role,
  Shared_UrlProtocol,
  Shared_WorkflowTemplateTarget,
  Shared_WorkflowTemplateTargets,
  Shared_WorkflowTemplateVariable,
  Shared_WorkflowTemplateVariable_Scope,
  Shared_WorkflowTemplateVariables,
} from '../shared.d.ts';

import type {
  Lib_Item_GenericProtocols,
  Lib_Item_RepositoryProtocols,
} from './item.d.ts';
import type { Lib_WorkflowTemplates_Entry } from './workflow-templates.d.ts';

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
 * Lib - Nova Config - Diagnostics.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_Diagnostics_Severity = 'error' | 'warning';

export type Lib_NovaConfig_Runner_Diagnostics_Message = string;

export type Lib_NovaConfig_Runner_Diagnostics = {
  severity: Lib_NovaConfig_Runner_Diagnostics_Severity;
  message: Lib_NovaConfig_Runner_Diagnostics_Message;
}[];

export type Lib_NovaConfig_Runner_Diagnostics_Returns = Lib_NovaConfig_Runner_Diagnostics;

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
  issues?: boolean;
  wiki?: boolean;
  projects?: boolean;
  discussions?: boolean;
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
  visibility?: 'public' | 'private' | 'internal';
  defaultBranch?: string;
  mergeMethods?: Shared_NovaConfig_Github_Policies_MergeMethods;
  autoDeleteHeadBranch?: boolean;
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
  merge?: boolean;
  squash?: boolean;
  rebase?: boolean;
};

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Merge = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Squash = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Rebase = boolean | undefined;

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
 * Lib - Nova Config - Get Package JSON Recipes.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_GetPackageJsonRecipes_Value = unknown;

export type Lib_NovaConfig_Runner_GetPackageJsonRecipes_Returns = Shared_NovaConfig_Recipes_PackageJson | undefined;

export type Lib_NovaConfig_Runner_GetPackageJsonRecipes_Result = Shared_NovaConfig_Recipes_PackageJson;

export type Lib_NovaConfig_Runner_GetPackageJsonRecipes_WorkspacePath = string;

export type Lib_NovaConfig_Runner_GetPackageJsonRecipes_WorkspaceValue = unknown;

export type Lib_NovaConfig_Runner_GetPackageJsonRecipes_Entries = {
  [recipeName: string]: Shared_NovaConfig_RecipeEntry;
} | undefined;

/**
 * Lib - Nova Config - Get Recipe Entries.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_GetRecipeEntries_Value = unknown;

export type Lib_NovaConfig_Runner_GetRecipeEntries_AllowedNames = readonly string[];

export type Lib_NovaConfig_Runner_GetRecipeEntries_Returns = Lib_NovaConfig_Runner_GetRecipeEntries_Result | undefined;

export type Lib_NovaConfig_Runner_GetRecipeEntries_Result = {
  [recipeName: string]: Shared_NovaConfig_RecipeEntry;
};

export type Lib_NovaConfig_Runner_GetRecipeEntries_Entry = Shared_NovaConfig_RecipeEntry | undefined;

/**
 * Lib - Nova Config - Get Recipe Entry.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_GetRecipeEntry_Value = unknown;

export type Lib_NovaConfig_Runner_GetRecipeEntry_Returns = Shared_NovaConfig_RecipeEntry | undefined;

export type Lib_NovaConfig_Runner_GetRecipeEntry_Enabled = unknown;

export type Lib_NovaConfig_Runner_GetRecipeEntry_Result = Shared_NovaConfig_RecipeEntry;

export type Lib_NovaConfig_Runner_GetRecipeEntry_SettingsCandidate = unknown;

export type Lib_NovaConfig_Runner_GetRecipeEntry_Settings = Shared_NovaConfig_RecipeEntry_Settings;

export type Lib_NovaConfig_Runner_GetRecipeEntry_SettingKey = string;

export type Lib_NovaConfig_Runner_GetRecipeEntry_SettingValue = unknown;

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
  project?: Shared_NovaConfig_Project;
  entities?: Shared_NovaConfig_Entities;
  emails?: Shared_NovaConfig_Emails;
  github?: Shared_NovaConfig_Github;
  workflows?: Shared_NovaConfig_Workflows;
  urls?: Shared_NovaConfig_Urls;
  workspaces?: Shared_NovaConfig_Workspaces;
  gitignore?: Shared_NovaConfig_Gitignore;
  agents?: Shared_NovaConfig_Agents;
  recipes?: Shared_NovaConfig_Recipes;
  environment?: Shared_NovaConfig_Environment;
  settings?: Shared_NovaConfig_Settings;
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

export type Lib_NovaConfig_Runner_Parse_Recipes = Shared_NovaConfig_Recipes | undefined;

export type Lib_NovaConfig_Runner_Parse_Environment = Shared_NovaConfig_Environment | undefined;

export type Lib_NovaConfig_Runner_Parse_Settings = Shared_NovaConfig_Settings | undefined;

/**
 * Lib - Nova Config - Parse Agents.
 *
 * @since 0.20.0
 */
export type Lib_NovaConfig_Runner_ParseAgents_Value = unknown;

export type Lib_NovaConfig_Runner_ParseAgents_Returns = Shared_NovaConfig_Agents | undefined;

export type Lib_NovaConfig_Runner_ParseAgents_Agents = ('claude-code' | 'codex')[];

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
  name?: string;
  email?: string;
  url?: string;
  roles?: Shared_NovaConfigEntityRole[];
}[];

export type Lib_NovaConfig_Runner_ParseEntities_ParsedEntity = {
  name?: string;
  email?: string;
  url?: string;
  roles?: Shared_NovaConfigEntityRole[];
};

export type Lib_NovaConfig_Runner_ParseEntities_Name = string | undefined;

export type Lib_NovaConfig_Runner_ParseEntities_Email = string | undefined;

export type Lib_NovaConfig_Runner_ParseEntities_Url = string | undefined;

export type Lib_NovaConfig_Runner_ParseEntities_Roles = unknown;

export type Lib_NovaConfig_Runner_ParseEntities_ParsedRoles = ('author' | 'contributor' | 'supporter')[];

export type Lib_NovaConfig_Runner_ParseEntities_NameA = string;

export type Lib_NovaConfig_Runner_ParseEntities_NameB = string;

/**
 * Lib - Nova Config - Parse Environment.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_ParseEnvironment_Value = unknown;

export type Lib_NovaConfig_Runner_ParseEnvironment_Workspaces = Shared_NovaConfig_Workspaces | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironment_Workflows = Shared_NovaConfig_Workflows | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironment_Returns = Shared_NovaConfigEnvironment | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironment_Result = Shared_NovaConfigEnvironment;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkspacePaths = string[];

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkflowNames = string[];

export type Lib_NovaConfig_Runner_ParseEnvironment_CollectedPrefixes = string[];

export type Lib_NovaConfig_Runner_ParseEnvironment_ProjectValue = unknown;

export type Lib_NovaConfig_Runner_ParseEnvironment_ProjectPrefix = string | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironment_ProjectVariables = Shared_NovaConfigEnvironmentValue[] | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironment_ProjectResult = Shared_NovaConfigEnvironmentProject;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkspacesValue = unknown;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkspacesResult = Shared_NovaConfigEnvironment_Workspaces;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkspacePath = string;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkspaceOptions = unknown;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkspacePrefix = string | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkspaceVariables = Shared_NovaConfigEnvironmentValue[] | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkspaceResult = Shared_NovaConfigEnvironmentWorkspace;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkflowsValue = unknown;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkflowsResult = Shared_NovaConfigEnvironment_Workflows;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkflowName = string;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkflowOptions = unknown;

export type Lib_NovaConfig_Runner_ParseEnvironment_MatchCount = number;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkflowPrefix = string | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironment_I = number;

export type Lib_NovaConfig_Runner_ParseEnvironment_J = number;

export type Lib_NovaConfig_Runner_ParseEnvironment_PrefixA = string;

export type Lib_NovaConfig_Runner_ParseEnvironment_PrefixB = string;

/**
 * Lib - Nova Config - Parse Environment Values.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_ParseEnvironmentValues_RawVariables = unknown;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_Prefix = string;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_Context = string;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_Returns = Shared_NovaConfigEnvironmentValue[] | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_Values = Shared_NovaConfigEnvironmentValue[];

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_SeenNames = Set<string>;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_Raw = unknown;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_Key = string | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_ReachValues = Shared_NovaConfigEnvironmentValue_Reach[];

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_ReachCandidate = Shared_NovaConfigEnvironmentValue_Reach | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_IsLocal = boolean;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_SecretCandidate = boolean | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_HasError = boolean;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_DefaultValueCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_Name = string;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_FoldedName = string;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_Value = Shared_NovaConfigEnvironmentValue;

/**
 * Lib - Nova Config - Parse GitHub.
 *
 * @since 0.18.0
 */
export type Lib_NovaConfig_Runner_ParseGithub_Value = unknown;

export type Lib_NovaConfig_Runner_ParseGithub_Returns = Shared_NovaConfig_Github | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Result = {
  owner?: string;
  repo?: string;
  topics?: string[];
  features?: Shared_NovaConfig_Github_Features;
  policies?: Shared_NovaConfig_Github_Policies;
  issueTemplate?: Shared_NovaConfig_Github_IssueTemplate;
};

export type Lib_NovaConfig_Runner_ParseGithub_OwnerCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Owner = string | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_RepoCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Repo = string | undefined;

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
  name?: Shared_NovaConfig_Project_Name;
  description?: Shared_NovaConfig_Project_Description;
  keywords?: string[];
  legalName?: string;
  pronouns?: 'personal' | 'business';
  platforms?: Shared_NovaConfigProjectPlatform[];
  startingYear?: number;
  license?: Shared_NovaConfig_Project_License;
};

export type Lib_NovaConfig_Runner_ParseProject_ValueName = unknown;

export type Lib_NovaConfig_Runner_ParseProject_ValueDescription = unknown;

export type Lib_NovaConfig_Runner_ParseProject_ValueKeywords = string[] | undefined;

export type Lib_NovaConfig_Runner_ParseProject_Name = {
  slug?: Shared_NovaConfig_Project_Name_Slug;
  title?: string;
};

export type Lib_NovaConfig_Runner_ParseProject_Slug = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_Title = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_Description = {
  short?: string;
  long?: string;
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
 * Lib - Nova Config - Parse Recipes.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_ParseRecipes_Value = unknown;

export type Lib_NovaConfig_Runner_ParseRecipes_Returns = Shared_NovaConfig_Recipes | undefined;

export type Lib_NovaConfig_Runner_ParseRecipes_Result = Shared_NovaConfig_Recipes;

export type Lib_NovaConfig_Runner_ParseRecipes_Github = Shared_NovaConfig_Recipes_Github | undefined;

export type Lib_NovaConfig_Runner_ParseRecipes_License = Shared_NovaConfig_Recipes_License | undefined;

export type Lib_NovaConfig_Runner_ParseRecipes_ReadMe = Shared_NovaConfig_Recipes_ReadMe | undefined;

export type Lib_NovaConfig_Runner_ParseRecipes_PackageJson = Shared_NovaConfig_Recipes_PackageJson | undefined;

/**
 * Lib - Nova Config - Parse Settings.
 *
 * @since 0.22.0
 */
export type Lib_NovaConfig_Runner_ParseSettings_Value = unknown;

export type Lib_NovaConfig_Runner_ParseSettings_Returns = Shared_NovaConfig_Settings | undefined;

export type Lib_NovaConfig_Runner_ParseSettings_Result = {
  lockStepVersioning?: boolean;
};

export type Lib_NovaConfig_Runner_ParseSettings_LockStepVersioning = boolean | undefined;

/**
 * Lib - Nova Config - Parse URLs.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_ParseUrls_Value = unknown;

export type Lib_NovaConfig_Runner_ParseUrls_Returns = Shared_NovaConfig_Urls | undefined;

export type Lib_NovaConfig_Runner_ParseUrls_Urls = {
  homepage?: string;
  repository?: string;
  bugs?: string;
  license?: string;
  logo?: string;
  docker?: string;
  documentation?: string;
  npm?: string;
  fundSources?: string[];
  privacyPolicy?: string;
  termsOfUse?: string;
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
  'name': string;
  'triggers': string[];
  'depends-on'?: string[];
  'build'?: string[];
  'deploy'?: Shared_NovaConfigWorkflowDeployTarget[];
  'with'?: Record<string, string>;
};

export type Lib_NovaConfig_Runner_ParseWorkflows_Workflows = Lib_NovaConfig_Runner_ParseWorkflows_Workflows_Element[];

export type Lib_NovaConfig_Runner_ParseWorkflows_CastItem = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Template = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_Name = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_RawTriggers = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Triggers = string[];

export type Lib_NovaConfig_Runner_ParseWorkflows_TriggerValue = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_RawDependsOn = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_DependsOn = string[];

export type Lib_NovaConfig_Runner_ParseWorkflows_RawBuild = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Build = string[];

export type Lib_NovaConfig_Runner_ParseWorkflows_RawDeploy = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element_To = string;

export type Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element_Path = string;

export type Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element_After = string[];

export type Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element_With = Record<string, string>;

export type Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element = {
  to: Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element_To;
  path: Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element_Path;
  after?: Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element_After;
  with?: Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element_With;
};

export type Lib_NovaConfig_Runner_ParseWorkflows_Deploy = Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element[];

export type Lib_NovaConfig_Runner_ParseWorkflows_RawDeployValue = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_DeployTo = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_DeployPath = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_RawDeployAfter = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_DeployAfter = string[];

export type Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget_To = string;

export type Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget_Path = string;

export type Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget_After = string[];

export type Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget_With = Record<string, string>;

export type Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget = {
  to: Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget_To;
  path: Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget_Path;
  after?: Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget_After;
  with?: Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget_With;
};

export type Lib_NovaConfig_Runner_ParseWorkflows_DeployWith = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_ParsedDeployWith = Record<string, string> | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_WithMap = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Workflow = {
  'template': string;
  'name': string;
  'triggers': string[];
  'depends-on'?: string[];
  'build'?: string[];
  'deploy'?: Shared_NovaConfigWorkflowDeployTarget[];
  'with'?: Record<string, string>;
};

export type Lib_NovaConfig_Runner_ParseWorkflows_ParsedWith = Record<string, string> | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_TemplateCompare = number;

export type Lib_NovaConfig_Runner_ParseWorkflows_NameA = string;

export type Lib_NovaConfig_Runner_ParseWorkflows_NameB = string;

/**
 * Lib - Nova Config - Parse Workflow With.
 *
 * @since 0.22.0
 */
export type Lib_NovaConfig_Runner_ParseWorkflowWith_Value = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflowWith_Returns = Record<string, string> | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflowWith_Parsed = Record<string, string>;

export type Lib_NovaConfig_Runner_ParseWorkflowWith_SortedEntries = [string, unknown][];

export type Lib_NovaConfig_Runner_ParseWorkflowWith_EntryKey = string;

export type Lib_NovaConfig_Runner_ParseWorkflowWith_EntryValue = unknown;

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

export type Lib_NovaConfig_Runner_ParseWorkspaces_RoleCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_PolicyCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_MatchedRole = Shared_NovaConfigWorkspace_Role | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_AllowedPolicies = ('freezable' | 'trackable' | 'distributable')[];

export type Lib_NovaConfig_Runner_ParseWorkspaces_Policy = Shared_NovaConfigWorkspace_Policy | undefined;

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
 * Lib - Nova Config - Push Error.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_PushError_Name = string;

export type Lib_NovaConfig_Runner_PushError_Purpose = string;

export type Lib_NovaConfig_Runner_PushError_Message = string;

export type Lib_NovaConfig_Runner_PushError_Returns = void;

/**
 * Lib - Nova Config - Push Warning.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_PushWarning_Name = string;

export type Lib_NovaConfig_Runner_PushWarning_Purpose = string;

export type Lib_NovaConfig_Runner_PushWarning_Message = string;

export type Lib_NovaConfig_Runner_PushWarning_Returns = void;

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
 * Lib - Nova Config - Save.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_Save_ConfigExists = boolean;

/**
 * Lib - Nova Config - Set.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_Set_Config = Shared_NovaConfigConfig;

export type Lib_NovaConfig_Runner_Set_Returns = void;

/**
 * Lib - Nova Config - Validate Cred Contributors.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_ValidateCredContributors_RawWorkflows = unknown;

export type Lib_NovaConfig_Runner_ValidateCredContributors_Environment = Shared_NovaConfigEnvironment | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_Returns = void;

export type Lib_NovaConfig_Runner_ValidateCredContributors_ProjectGroup = Shared_NovaConfigEnvironmentProject | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_HasProjectPrefix = boolean;

export type Lib_NovaConfig_Runner_ValidateCredContributors_WorkspacesGroup = Shared_NovaConfigEnvironment_Workspaces | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_WorkflowsGroup = Shared_NovaConfigEnvironment_Workflows | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_Reported = Set<string>;

export type Lib_NovaConfig_Runner_ValidateCredContributors_ServerBearingWorkspaces = Set<string>;

export type Lib_NovaConfig_Runner_ValidateCredContributors_RawWorkflow = unknown;

export type Lib_NovaConfig_Runner_ValidateCredContributors_Template = string | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_TemplateMeta = Lib_WorkflowTemplates_Entry | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_WorkflowName = string | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_OwnsConfigKeys = boolean;

export type Lib_NovaConfig_Runner_ValidateCredContributors_WorkflowGroup = Shared_NovaConfigEnvironmentWorkflow | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_WorkflowMessage = string;

export type Lib_NovaConfig_Runner_ValidateCredContributors_TemplateTargets = Shared_WorkflowTemplateTargets | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_DeployTarget_TargetType = string;

export type Lib_NovaConfig_Runner_ValidateCredContributors_DeployTarget_AppPath = string;

export type Lib_NovaConfig_Runner_ValidateCredContributors_DeployTarget = {
  targetType: Lib_NovaConfig_Runner_ValidateCredContributors_DeployTarget_TargetType;
  appPath: Lib_NovaConfig_Runner_ValidateCredContributors_DeployTarget_AppPath;
};

export type Lib_NovaConfig_Runner_ValidateCredContributors_DeployTargets = Lib_NovaConfig_Runner_ValidateCredContributors_DeployTarget[];

export type Lib_NovaConfig_Runner_ValidateCredContributors_DeployList = unknown;

export type Lib_NovaConfig_Runner_ValidateCredContributors_DeployEntry = unknown;

export type Lib_NovaConfig_Runner_ValidateCredContributors_To = string | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_Path = string | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_TargetList = unknown;

export type Lib_NovaConfig_Runner_ValidateCredContributors_TargetEntry = unknown;

export type Lib_NovaConfig_Runner_ValidateCredContributors_Type = string | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_WorkingDir = string | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_TargetMeta = Shared_WorkflowTemplateTarget | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_TargetVariables = Shared_WorkflowTemplateVariables;

export type Lib_NovaConfig_Runner_ValidateCredContributors_VariableName = string;

export type Lib_NovaConfig_Runner_ValidateCredContributors_VariableMeta = Shared_WorkflowTemplateVariable;

export type Lib_NovaConfig_Runner_ValidateCredContributors_Scope = Shared_WorkflowTemplateVariable_Scope | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_Message = string;

export type Lib_NovaConfig_Runner_ValidateCredContributors_Workspace = Shared_NovaConfigEnvironmentWorkspace | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_WorkspaceMessage = string;

export type Lib_NovaConfig_Runner_ValidateCredContributors_RuntimeWorkspacePath = string;

export type Lib_NovaConfig_Runner_ValidateCredContributors_RuntimeWorkspace = Shared_NovaConfigEnvironmentWorkspace;

export type Lib_NovaConfig_Runner_ValidateCredContributors_HasRuntimeValue = boolean;
