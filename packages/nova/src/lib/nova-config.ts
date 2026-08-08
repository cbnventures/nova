import { promises as fs } from 'node:fs';
import { join } from 'node:path';

import { Logger } from '../toolkit/index.js';
import { libEnvNamespace } from './env-namespace.js';
import {
  libItemAllowedAgents,
  libItemAllowedPoliciesByRole,
  libItemAllowedRoles,
  libItemEmailFields,
  libItemGenericProtocols,
  libItemRecipesByCategory,
  libItemRepositoryProtocols,
  libItemUrlFields,
} from './item.js';
import {
  LIB_REGEX_PATTERN_EMAIL_SIMPLE,
  LIB_REGEX_PATTERN_GITHUB_OWNER,
  LIB_REGEX_PATTERN_GITHUB_REPO,
  LIB_REGEX_PATTERN_SLUG_SCOPED,
  LIB_REGEX_PATTERN_SLUG_SIMPLE,
} from './regex.js';
import {
  isFileIdentical,
  isPlainObject,
  pathExists,
  renameFileWithDate,
} from './utility.js';
import { libWorkflowTemplatesMetadata } from './workflow-templates.js';

import type {
  Lib_NovaConfig_Runner_Config,
  Lib_NovaConfig_Runner_Constructor_Config,
  Lib_NovaConfig_Runner_Diagnostics,
  Lib_NovaConfig_Runner_Diagnostics_Returns,
  Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Field,
  Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Items,
  Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Returns,
  Lib_NovaConfig_Runner_GetArrayOfHttpUrls_TypeGuard,
  Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Value,
  Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Items,
  Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Returns,
  Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_TypeGuard,
  Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Value,
  Lib_NovaConfig_Runner_GetEmail_Email,
  Lib_NovaConfig_Runner_GetEmail_Returns,
  Lib_NovaConfig_Runner_GetEmail_Value,
  Lib_NovaConfig_Runner_GetGithubFeatures_Discussions,
  Lib_NovaConfig_Runner_GetGithubFeatures_Issues,
  Lib_NovaConfig_Runner_GetGithubFeatures_Projects,
  Lib_NovaConfig_Runner_GetGithubFeatures_Result,
  Lib_NovaConfig_Runner_GetGithubFeatures_Returns,
  Lib_NovaConfig_Runner_GetGithubFeatures_Value,
  Lib_NovaConfig_Runner_GetGithubFeatures_Wiki,
  Lib_NovaConfig_Runner_GetGithubIssueTemplate_BugReportFields,
  Lib_NovaConfig_Runner_GetGithubIssueTemplate_Result,
  Lib_NovaConfig_Runner_GetGithubIssueTemplate_Returns,
  Lib_NovaConfig_Runner_GetGithubIssueTemplate_Value,
  Lib_NovaConfig_Runner_GetGithubPolicies_AutoDeleteHeadBranch,
  Lib_NovaConfig_Runner_GetGithubPolicies_DefaultBranch,
  Lib_NovaConfig_Runner_GetGithubPolicies_MergeMethods,
  Lib_NovaConfig_Runner_GetGithubPolicies_Result,
  Lib_NovaConfig_Runner_GetGithubPolicies_Returns,
  Lib_NovaConfig_Runner_GetGithubPolicies_Value,
  Lib_NovaConfig_Runner_GetGithubPolicies_Visibility,
  Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Merge,
  Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Rebase,
  Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Result,
  Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Returns,
  Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Squash,
  Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Value,
  Lib_NovaConfig_Runner_GetGithubTopics_Returns,
  Lib_NovaConfig_Runner_GetGithubTopics_TypeGuard,
  Lib_NovaConfig_Runner_GetGithubTopics_Value,
  Lib_NovaConfig_Runner_GetNonEmptyString_Returns,
  Lib_NovaConfig_Runner_GetNonEmptyString_String,
  Lib_NovaConfig_Runner_GetNonEmptyString_Value,
  Lib_NovaConfig_Runner_GetPackageJsonRecipes_Entries,
  Lib_NovaConfig_Runner_GetPackageJsonRecipes_Result,
  Lib_NovaConfig_Runner_GetPackageJsonRecipes_Returns,
  Lib_NovaConfig_Runner_GetPackageJsonRecipes_Value,
  Lib_NovaConfig_Runner_GetPackageJsonRecipes_WorkspacePath,
  Lib_NovaConfig_Runner_GetPackageJsonRecipes_WorkspaceValue,
  Lib_NovaConfig_Runner_GetRecipeEntries_AllowedNames,
  Lib_NovaConfig_Runner_GetRecipeEntries_Entry,
  Lib_NovaConfig_Runner_GetRecipeEntries_Result,
  Lib_NovaConfig_Runner_GetRecipeEntries_Returns,
  Lib_NovaConfig_Runner_GetRecipeEntries_Value,
  Lib_NovaConfig_Runner_GetRecipeEntry_Enabled,
  Lib_NovaConfig_Runner_GetRecipeEntry_Result,
  Lib_NovaConfig_Runner_GetRecipeEntry_Returns,
  Lib_NovaConfig_Runner_GetRecipeEntry_SettingKey,
  Lib_NovaConfig_Runner_GetRecipeEntry_Settings,
  Lib_NovaConfig_Runner_GetRecipeEntry_SettingsCandidate,
  Lib_NovaConfig_Runner_GetRecipeEntry_SettingValue,
  Lib_NovaConfig_Runner_GetRecipeEntry_Value,
  Lib_NovaConfig_Runner_GetUrl_AllowedProtocols,
  Lib_NovaConfig_Runner_GetUrl_CandidateUrl,
  Lib_NovaConfig_Runner_GetUrl_Field,
  Lib_NovaConfig_Runner_GetUrl_IsAllowed,
  Lib_NovaConfig_Runner_GetUrl_Returns,
  Lib_NovaConfig_Runner_GetUrl_Url,
  Lib_NovaConfig_Runner_GetUrl_Value,
  Lib_NovaConfig_Runner_IsEntityRole_TypeGuard,
  Lib_NovaConfig_Runner_IsEntityRole_Value,
  Lib_NovaConfig_Runner_Load_ConfigFileName,
  Lib_NovaConfig_Runner_Load_ConfigPath,
  Lib_NovaConfig_Runner_Load_CurrentDirectory,
  Lib_NovaConfig_Runner_Load_ParsedFile,
  Lib_NovaConfig_Runner_Load_RawFile,
  Lib_NovaConfig_Runner_Load_Returns,
  Lib_NovaConfig_Runner_Parse_Agents,
  Lib_NovaConfig_Runner_Parse_Emails,
  Lib_NovaConfig_Runner_Parse_Entities,
  Lib_NovaConfig_Runner_Parse_Environment,
  Lib_NovaConfig_Runner_Parse_Github,
  Lib_NovaConfig_Runner_Parse_Gitignore,
  Lib_NovaConfig_Runner_Parse_Project,
  Lib_NovaConfig_Runner_Parse_Recipes,
  Lib_NovaConfig_Runner_Parse_Result,
  Lib_NovaConfig_Runner_Parse_Returns,
  Lib_NovaConfig_Runner_Parse_Settings,
  Lib_NovaConfig_Runner_Parse_Urls,
  Lib_NovaConfig_Runner_Parse_Value,
  Lib_NovaConfig_Runner_Parse_Workflows,
  Lib_NovaConfig_Runner_Parse_Workspaces,
  Lib_NovaConfig_Runner_ParseAgents_Agents,
  Lib_NovaConfig_Runner_ParseAgents_Returns,
  Lib_NovaConfig_Runner_ParseAgents_Value,
  Lib_NovaConfig_Runner_ParseEmails_EmailFields,
  Lib_NovaConfig_Runner_ParseEmails_Emails,
  Lib_NovaConfig_Runner_ParseEmails_ParsedEmail,
  Lib_NovaConfig_Runner_ParseEmails_Returns,
  Lib_NovaConfig_Runner_ParseEmails_Value,
  Lib_NovaConfig_Runner_ParseEntities_Email,
  Lib_NovaConfig_Runner_ParseEntities_Entities,
  Lib_NovaConfig_Runner_ParseEntities_Name,
  Lib_NovaConfig_Runner_ParseEntities_NameA,
  Lib_NovaConfig_Runner_ParseEntities_NameB,
  Lib_NovaConfig_Runner_ParseEntities_ParsedEntity,
  Lib_NovaConfig_Runner_ParseEntities_ParsedRoles,
  Lib_NovaConfig_Runner_ParseEntities_Returns,
  Lib_NovaConfig_Runner_ParseEntities_Roles,
  Lib_NovaConfig_Runner_ParseEntities_Url,
  Lib_NovaConfig_Runner_ParseEntities_Value,
  Lib_NovaConfig_Runner_ParseEnvironment_CollectedPrefixes,
  Lib_NovaConfig_Runner_ParseEnvironment_I,
  Lib_NovaConfig_Runner_ParseEnvironment_J,
  Lib_NovaConfig_Runner_ParseEnvironment_MatchCount,
  Lib_NovaConfig_Runner_ParseEnvironment_PrefixA,
  Lib_NovaConfig_Runner_ParseEnvironment_PrefixB,
  Lib_NovaConfig_Runner_ParseEnvironment_ProjectPrefix,
  Lib_NovaConfig_Runner_ParseEnvironment_ProjectResult,
  Lib_NovaConfig_Runner_ParseEnvironment_ProjectValue,
  Lib_NovaConfig_Runner_ParseEnvironment_ProjectVariables,
  Lib_NovaConfig_Runner_ParseEnvironment_Result,
  Lib_NovaConfig_Runner_ParseEnvironment_Returns,
  Lib_NovaConfig_Runner_ParseEnvironment_Value,
  Lib_NovaConfig_Runner_ParseEnvironment_WorkflowName,
  Lib_NovaConfig_Runner_ParseEnvironment_WorkflowNames,
  Lib_NovaConfig_Runner_ParseEnvironment_WorkflowOptions,
  Lib_NovaConfig_Runner_ParseEnvironment_WorkflowPrefix,
  Lib_NovaConfig_Runner_ParseEnvironment_Workflows,
  Lib_NovaConfig_Runner_ParseEnvironment_WorkflowsResult,
  Lib_NovaConfig_Runner_ParseEnvironment_WorkflowsValue,
  Lib_NovaConfig_Runner_ParseEnvironment_WorkspaceOptions,
  Lib_NovaConfig_Runner_ParseEnvironment_WorkspacePath,
  Lib_NovaConfig_Runner_ParseEnvironment_WorkspacePaths,
  Lib_NovaConfig_Runner_ParseEnvironment_WorkspacePrefix,
  Lib_NovaConfig_Runner_ParseEnvironment_WorkspaceResult,
  Lib_NovaConfig_Runner_ParseEnvironment_Workspaces,
  Lib_NovaConfig_Runner_ParseEnvironment_WorkspacesResult,
  Lib_NovaConfig_Runner_ParseEnvironment_WorkspacesValue,
  Lib_NovaConfig_Runner_ParseEnvironment_WorkspaceVariables,
  Lib_NovaConfig_Runner_ParseEnvironmentValues_Context,
  Lib_NovaConfig_Runner_ParseEnvironmentValues_DefaultValueCandidate,
  Lib_NovaConfig_Runner_ParseEnvironmentValues_FoldedName,
  Lib_NovaConfig_Runner_ParseEnvironmentValues_HasError,
  Lib_NovaConfig_Runner_ParseEnvironmentValues_IsLocal,
  Lib_NovaConfig_Runner_ParseEnvironmentValues_Key,
  Lib_NovaConfig_Runner_ParseEnvironmentValues_Name,
  Lib_NovaConfig_Runner_ParseEnvironmentValues_Prefix,
  Lib_NovaConfig_Runner_ParseEnvironmentValues_Raw,
  Lib_NovaConfig_Runner_ParseEnvironmentValues_RawVariables,
  Lib_NovaConfig_Runner_ParseEnvironmentValues_ReachCandidate,
  Lib_NovaConfig_Runner_ParseEnvironmentValues_ReachValues,
  Lib_NovaConfig_Runner_ParseEnvironmentValues_Returns,
  Lib_NovaConfig_Runner_ParseEnvironmentValues_SecretCandidate,
  Lib_NovaConfig_Runner_ParseEnvironmentValues_SeenNames,
  Lib_NovaConfig_Runner_ParseEnvironmentValues_Value,
  Lib_NovaConfig_Runner_ParseEnvironmentValues_Values,
  Lib_NovaConfig_Runner_ParseGithub_Features,
  Lib_NovaConfig_Runner_ParseGithub_IssueTemplate,
  Lib_NovaConfig_Runner_ParseGithub_Owner,
  Lib_NovaConfig_Runner_ParseGithub_OwnerCandidate,
  Lib_NovaConfig_Runner_ParseGithub_Policies,
  Lib_NovaConfig_Runner_ParseGithub_Repo,
  Lib_NovaConfig_Runner_ParseGithub_RepoCandidate,
  Lib_NovaConfig_Runner_ParseGithub_Result,
  Lib_NovaConfig_Runner_ParseGithub_Returns,
  Lib_NovaConfig_Runner_ParseGithub_Topics,
  Lib_NovaConfig_Runner_ParseGithub_Value,
  Lib_NovaConfig_Runner_ParseGitignore_ProjectExcludes,
  Lib_NovaConfig_Runner_ParseGitignore_Result,
  Lib_NovaConfig_Runner_ParseGitignore_Returns,
  Lib_NovaConfig_Runner_ParseGitignore_Value,
  Lib_NovaConfig_Runner_ParseProject_AllowedLicenses,
  Lib_NovaConfig_Runner_ParseProject_AllowedPlatforms,
  Lib_NovaConfig_Runner_ParseProject_Description,
  Lib_NovaConfig_Runner_ParseProject_License,
  Lib_NovaConfig_Runner_ParseProject_Long,
  Lib_NovaConfig_Runner_ParseProject_Name,
  Lib_NovaConfig_Runner_ParseProject_ParsedPlatforms,
  Lib_NovaConfig_Runner_ParseProject_Platform,
  Lib_NovaConfig_Runner_ParseProject_Project,
  Lib_NovaConfig_Runner_ParseProject_Returns,
  Lib_NovaConfig_Runner_ParseProject_Short,
  Lib_NovaConfig_Runner_ParseProject_Slug,
  Lib_NovaConfig_Runner_ParseProject_Title,
  Lib_NovaConfig_Runner_ParseProject_Value,
  Lib_NovaConfig_Runner_ParseProject_ValueDescription,
  Lib_NovaConfig_Runner_ParseProject_ValueKeywords,
  Lib_NovaConfig_Runner_ParseProject_ValueLegalName,
  Lib_NovaConfig_Runner_ParseProject_ValueLicense,
  Lib_NovaConfig_Runner_ParseProject_ValueName,
  Lib_NovaConfig_Runner_ParseProject_ValuePlatforms,
  Lib_NovaConfig_Runner_ParseProject_ValuePronouns,
  Lib_NovaConfig_Runner_ParseProject_ValueStartingYear,
  Lib_NovaConfig_Runner_ParseRecipes_Github,
  Lib_NovaConfig_Runner_ParseRecipes_License,
  Lib_NovaConfig_Runner_ParseRecipes_PackageJson,
  Lib_NovaConfig_Runner_ParseRecipes_ReadMe,
  Lib_NovaConfig_Runner_ParseRecipes_Result,
  Lib_NovaConfig_Runner_ParseRecipes_Returns,
  Lib_NovaConfig_Runner_ParseRecipes_Value,
  Lib_NovaConfig_Runner_ParseSettings_LockStepVersioning,
  Lib_NovaConfig_Runner_ParseSettings_Result,
  Lib_NovaConfig_Runner_ParseSettings_Returns,
  Lib_NovaConfig_Runner_ParseSettings_Value,
  Lib_NovaConfig_Runner_ParseUrls_FundSources,
  Lib_NovaConfig_Runner_ParseUrls_LoopIndex,
  Lib_NovaConfig_Runner_ParseUrls_ParsedUrl,
  Lib_NovaConfig_Runner_ParseUrls_Returns,
  Lib_NovaConfig_Runner_ParseUrls_UrlField,
  Lib_NovaConfig_Runner_ParseUrls_UrlFields,
  Lib_NovaConfig_Runner_ParseUrls_UrlFieldsFundSourcesIndex,
  Lib_NovaConfig_Runner_ParseUrls_Urls,
  Lib_NovaConfig_Runner_ParseUrls_Value,
  Lib_NovaConfig_Runner_ParseWorkflows_Build,
  Lib_NovaConfig_Runner_ParseWorkflows_CastItem,
  Lib_NovaConfig_Runner_ParseWorkflows_DependsOn,
  Lib_NovaConfig_Runner_ParseWorkflows_Deploy,
  Lib_NovaConfig_Runner_ParseWorkflows_DeployAfter,
  Lib_NovaConfig_Runner_ParseWorkflows_DeployPath,
  Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget,
  Lib_NovaConfig_Runner_ParseWorkflows_DeployTo,
  Lib_NovaConfig_Runner_ParseWorkflows_DeployWith,
  Lib_NovaConfig_Runner_ParseWorkflows_Name,
  Lib_NovaConfig_Runner_ParseWorkflows_NameA,
  Lib_NovaConfig_Runner_ParseWorkflows_NameB,
  Lib_NovaConfig_Runner_ParseWorkflows_ParsedDeployWith,
  Lib_NovaConfig_Runner_ParseWorkflows_ParsedWith,
  Lib_NovaConfig_Runner_ParseWorkflows_RawBuild,
  Lib_NovaConfig_Runner_ParseWorkflows_RawDependsOn,
  Lib_NovaConfig_Runner_ParseWorkflows_RawDeploy,
  Lib_NovaConfig_Runner_ParseWorkflows_RawDeployAfter,
  Lib_NovaConfig_Runner_ParseWorkflows_RawDeployValue,
  Lib_NovaConfig_Runner_ParseWorkflows_RawTriggers,
  Lib_NovaConfig_Runner_ParseWorkflows_Returns,
  Lib_NovaConfig_Runner_ParseWorkflows_Template,
  Lib_NovaConfig_Runner_ParseWorkflows_TemplateCompare,
  Lib_NovaConfig_Runner_ParseWorkflows_Triggers,
  Lib_NovaConfig_Runner_ParseWorkflows_TriggerValue,
  Lib_NovaConfig_Runner_ParseWorkflows_Value,
  Lib_NovaConfig_Runner_ParseWorkflows_WithMap,
  Lib_NovaConfig_Runner_ParseWorkflows_Workflow,
  Lib_NovaConfig_Runner_ParseWorkflows_Workflows,
  Lib_NovaConfig_Runner_ParseWorkflowWith_EntryKey,
  Lib_NovaConfig_Runner_ParseWorkflowWith_EntryValue,
  Lib_NovaConfig_Runner_ParseWorkflowWith_Parsed,
  Lib_NovaConfig_Runner_ParseWorkflowWith_Returns,
  Lib_NovaConfig_Runner_ParseWorkflowWith_SortedEntries,
  Lib_NovaConfig_Runner_ParseWorkflowWith_Value,
  Lib_NovaConfig_Runner_ParseWorkspaces_AllowedPolicies,
  Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed,
  Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Base,
  Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Descriptor,
  Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Returns,
  Lib_NovaConfig_Runner_ParseWorkspaces_MatchedRole,
  Lib_NovaConfig_Runner_ParseWorkspaces_Name,
  Lib_NovaConfig_Runner_ParseWorkspaces_NameCandidate,
  Lib_NovaConfig_Runner_ParseWorkspaces_Options,
  Lib_NovaConfig_Runner_ParseWorkspaces_Path,
  Lib_NovaConfig_Runner_ParseWorkspaces_Policy,
  Lib_NovaConfig_Runner_ParseWorkspaces_PolicyCandidate,
  Lib_NovaConfig_Runner_ParseWorkspaces_Returns,
  Lib_NovaConfig_Runner_ParseWorkspaces_Role,
  Lib_NovaConfig_Runner_ParseWorkspaces_RoleCandidate,
  Lib_NovaConfig_Runner_ParseWorkspaces_Slug,
  Lib_NovaConfig_Runner_ParseWorkspaces_SortedWorkspaces,
  Lib_NovaConfig_Runner_ParseWorkspaces_Value,
  Lib_NovaConfig_Runner_ParseWorkspaces_WorkspaceKeys,
  Lib_NovaConfig_Runner_ParseWorkspaces_Workspaces,
  Lib_NovaConfig_Runner_PushError_Message,
  Lib_NovaConfig_Runner_PushError_Name,
  Lib_NovaConfig_Runner_PushError_Purpose,
  Lib_NovaConfig_Runner_PushError_Returns,
  Lib_NovaConfig_Runner_PushWarning_Message,
  Lib_NovaConfig_Runner_PushWarning_Name,
  Lib_NovaConfig_Runner_PushWarning_Purpose,
  Lib_NovaConfig_Runner_PushWarning_Returns,
  Lib_NovaConfig_Runner_Save_ConfigExists,
  Lib_NovaConfig_Runner_Save_ConfigPath,
  Lib_NovaConfig_Runner_Save_CurrentDirectory,
  Lib_NovaConfig_Runner_Save_ReplaceFile,
  Lib_NovaConfig_Runner_Save_Returns,
  Lib_NovaConfig_Runner_Set_Config,
  Lib_NovaConfig_Runner_Set_Returns,
  Lib_NovaConfig_Runner_ValidateCredContributors_DeployEntry,
  Lib_NovaConfig_Runner_ValidateCredContributors_DeployList,
  Lib_NovaConfig_Runner_ValidateCredContributors_DeployTargets,
  Lib_NovaConfig_Runner_ValidateCredContributors_Environment,
  Lib_NovaConfig_Runner_ValidateCredContributors_HasProjectPrefix,
  Lib_NovaConfig_Runner_ValidateCredContributors_HasRuntimeValue,
  Lib_NovaConfig_Runner_ValidateCredContributors_Message,
  Lib_NovaConfig_Runner_ValidateCredContributors_OwnsConfigKeys,
  Lib_NovaConfig_Runner_ValidateCredContributors_Path,
  Lib_NovaConfig_Runner_ValidateCredContributors_ProjectGroup,
  Lib_NovaConfig_Runner_ValidateCredContributors_RawWorkflow,
  Lib_NovaConfig_Runner_ValidateCredContributors_RawWorkflows,
  Lib_NovaConfig_Runner_ValidateCredContributors_Reported,
  Lib_NovaConfig_Runner_ValidateCredContributors_Returns,
  Lib_NovaConfig_Runner_ValidateCredContributors_RuntimeWorkspace,
  Lib_NovaConfig_Runner_ValidateCredContributors_RuntimeWorkspacePath,
  Lib_NovaConfig_Runner_ValidateCredContributors_Scope,
  Lib_NovaConfig_Runner_ValidateCredContributors_ServerBearingWorkspaces,
  Lib_NovaConfig_Runner_ValidateCredContributors_TargetEntry,
  Lib_NovaConfig_Runner_ValidateCredContributors_TargetList,
  Lib_NovaConfig_Runner_ValidateCredContributors_TargetMeta,
  Lib_NovaConfig_Runner_ValidateCredContributors_TargetVariables,
  Lib_NovaConfig_Runner_ValidateCredContributors_Template,
  Lib_NovaConfig_Runner_ValidateCredContributors_TemplateMeta,
  Lib_NovaConfig_Runner_ValidateCredContributors_TemplateTargets,
  Lib_NovaConfig_Runner_ValidateCredContributors_To,
  Lib_NovaConfig_Runner_ValidateCredContributors_Type,
  Lib_NovaConfig_Runner_ValidateCredContributors_VariableMeta,
  Lib_NovaConfig_Runner_ValidateCredContributors_VariableName,
  Lib_NovaConfig_Runner_ValidateCredContributors_WorkflowGroup,
  Lib_NovaConfig_Runner_ValidateCredContributors_WorkflowMessage,
  Lib_NovaConfig_Runner_ValidateCredContributors_WorkflowName,
  Lib_NovaConfig_Runner_ValidateCredContributors_WorkflowsGroup,
  Lib_NovaConfig_Runner_ValidateCredContributors_WorkingDir,
  Lib_NovaConfig_Runner_ValidateCredContributors_Workspace,
  Lib_NovaConfig_Runner_ValidateCredContributors_WorkspaceMessage,
  Lib_NovaConfig_Runner_ValidateCredContributors_WorkspacesGroup,
} from '../types/lib/nova-config.d.ts';

/**
 * Lib - Nova Config.
 *
 * Loads, parses, and saves the nova.config.json file that drives all CLI commands. Every
 * generator, recipe, and scaffold reads config through this class.
 *
 * @since 0.11.0
 */
export class Runner {
  /**
   * Lib - Nova Config - Config.
   *
   * Holds the parsed nova.config.json object in memory between load, set,
   * and save operations so the config state persists across method calls.
   *
   * @private
   *
   * @since 0.11.0
   */
  #config: Lib_NovaConfig_Runner_Config;

  /**
   * Lib - Nova Config - Diagnostics.
   *
   * Accumulates config-shape errors recorded during the most recent parse so a caller can
   * fail on invalid config. Unlike the warn-drop path, these are retained and retrievable.
   *
   * @private
   *
   * @since 0.21.0
   */
  #diagnostics: Lib_NovaConfig_Runner_Diagnostics = [];

  /**
   * Lib - Nova Config - Constructor.
   *
   * Initializes the config store as an empty object. Callers must follow up
   * with load or set before the config contains usable data.
   *
   * @since 0.11.0
   */
  public constructor() {
    const config: Lib_NovaConfig_Runner_Constructor_Config = {};

    this.#config = config;

    return;
  }

  /**
   * Lib - Nova Config - Load.
   *
   * Reads nova.config.json and runs the salvage-first parser so invalid fields are
   * dropped rather than causing failures. Dropped workspaces and reserved dotenv-key
   * collisions warn; other salvaged fields are dropped silently.
   *
   * @returns {Lib_NovaConfig_Runner_Load_Returns}
   *
   * @since 0.11.0
   */
  public async load(): Lib_NovaConfig_Runner_Load_Returns {
    const currentDirectory: Lib_NovaConfig_Runner_Load_CurrentDirectory = process.cwd();
    const configFileName: Lib_NovaConfig_Runner_Load_ConfigFileName = 'nova.config.json';
    const configPath: Lib_NovaConfig_Runner_Load_ConfigPath = join(currentDirectory, configFileName);

    try {
      const rawFile: Lib_NovaConfig_Runner_Load_RawFile = await fs.readFile(configPath, 'utf-8');
      const parsedFile: Lib_NovaConfig_Runner_Load_ParsedFile = JSON.parse(rawFile);

      // Salvage-first method.
      this.#config = this.parse(parsedFile);
    } catch {
      /* empty */
    }

    return this.#config;
  }

  /**
   * Lib - Nova Config - Set.
   *
   * Replaces the in-memory config with a parsed copy of the given object. Called by
   * the initialize command after the user completes the prompt flow.
   *
   * @param {Lib_NovaConfig_Runner_Set_Config} config - Config.
   *
   * @returns {Lib_NovaConfig_Runner_Set_Returns}
   *
   * @since 0.11.0
   */
  public set(config: Lib_NovaConfig_Runner_Set_Config): Lib_NovaConfig_Runner_Set_Returns {
    this.#config = this.parse(config);

    return;
  }

  /**
   * Lib - Nova Config - Save.
   *
   * Writes the parsed config to nova.config.json in the working directory. Skips
   * the write when the file already matches the in-memory state.
   *
   * @param {Lib_NovaConfig_Runner_Save_ReplaceFile} replaceFile - Replace file.
   *
   * @returns {Lib_NovaConfig_Runner_Save_Returns}
   *
   * @since 0.11.0
   */
  public async save(replaceFile: Lib_NovaConfig_Runner_Save_ReplaceFile): Lib_NovaConfig_Runner_Save_Returns {
    this.#config = this.parse(this.#config);

    const currentDirectory: Lib_NovaConfig_Runner_Save_CurrentDirectory = process.cwd();
    const configPath: Lib_NovaConfig_Runner_Save_ConfigPath = join(currentDirectory, 'nova.config.json');

    const configExists: Lib_NovaConfig_Runner_Save_ConfigExists = await pathExists(configPath);

    // No changes detected, skip touching the filesystem.
    if (
      configExists === true // Config file exists on disk.
      && await isFileIdentical(configPath, this.#config) === true // Existing file matches in-memory state.
    ) {
      return;
    }

    // Rename existing file if user chooses not to replace file.
    if (
      configExists === true // Config file exists on disk.
      && replaceFile === false // User chose not to replace the file.
    ) {
      await renameFileWithDate(configPath);
    }

    await fs.writeFile(
      configPath,
      `${JSON.stringify(this.#config, null, 2)}\n`,
      'utf-8',
    );

    return;
  }

  /**
   * Lib - Nova Config - Diagnostics.
   *
   * Returns a copy of the config-shape errors recorded during the most recent parse.
   * Callers can inspect these and fail instead of proceeding on invalid config.
   *
   * @returns {Lib_NovaConfig_Runner_Diagnostics_Returns}
   *
   * @since 0.21.0
   */
  public diagnostics(): Lib_NovaConfig_Runner_Diagnostics_Returns {
    return [...this.#diagnostics];
  }

  /**
   * Lib - Nova Config - Parse.
   *
   * Orchestrates section-level parsers for project, entities, emails, urls, and
   * workspaces. Uses a salvage-first strategy to keep valid fields.
   *
   * @param {Lib_NovaConfig_Runner_Parse_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_Parse_Returns}
   *
   * @since 0.11.0
   */
  private parse(value: Lib_NovaConfig_Runner_Parse_Value): Lib_NovaConfig_Runner_Parse_Returns {
    const result: Lib_NovaConfig_Runner_Parse_Result = {};

    // Reset the diagnostics channel so it reflects only the most recent parse.
    this.#diagnostics = [];

    if (isPlainObject(value) === false) {
      return result;
    }

    const project: Lib_NovaConfig_Runner_Parse_Project = this.parseProject(value['project']);
    const entities: Lib_NovaConfig_Runner_Parse_Entities = this.parseEntities(value['entities']);
    const emails: Lib_NovaConfig_Runner_Parse_Emails = this.parseEmails(value['emails']);
    const github: Lib_NovaConfig_Runner_Parse_Github = this.parseGithub(value['github']);
    const workflows: Lib_NovaConfig_Runner_Parse_Workflows = this.parseWorkflows(value['workflows']);
    const urls: Lib_NovaConfig_Runner_Parse_Urls = this.parseUrls(value['urls']);
    const workspaces: Lib_NovaConfig_Runner_Parse_Workspaces = this.parseWorkspaces(
      value['workspaces'],
      (project !== undefined && project['name'] !== undefined) ? project['name']['slug'] : undefined,
    );
    const gitignore: Lib_NovaConfig_Runner_Parse_Gitignore = this.parseGitignore(value['gitignore']);
    const agents: Lib_NovaConfig_Runner_Parse_Agents = this.parseAgents(value['agents']);
    const recipes: Lib_NovaConfig_Runner_Parse_Recipes = this.parseRecipes(value['recipes']);
    const environment: Lib_NovaConfig_Runner_Parse_Environment = this.parseEnvironment(value['environment'], workspaces, workflows);
    const settings: Lib_NovaConfig_Runner_Parse_Settings = this.parseSettings(value['settings']);

    // Cross-check deploy-credential scope against the environment namespaces so a
    // scoped target without its required prefix fails at load instead of silently
    // resolving to an unprefixed default name in the generated workflow.
    this.validateCredContributors(value['workflows'], environment);

    if (project !== undefined) {
      result.project = project;
    }

    if (entities !== undefined) {
      result.entities = entities;
    }

    if (emails !== undefined) {
      result.emails = emails;
    }

    if (github !== undefined) {
      result.github = github;
    }

    if (workflows !== undefined) {
      result.workflows = workflows;
    }

    if (urls !== undefined) {
      result.urls = urls;
    }

    if (workspaces !== undefined) {
      result.workspaces = workspaces;
    }

    if (gitignore !== undefined) {
      result.gitignore = gitignore;
    }

    if (agents !== undefined) {
      result.agents = agents;
    }

    if (recipes !== undefined) {
      result.recipes = recipes;
    }

    if (environment !== undefined) {
      result.environment = environment;
    }

    if (settings !== undefined) {
      result.settings = settings;
    }

    return result;
  }

  /**
   * Lib - Nova Config - Push Error.
   *
   * Records a config-shape error as a retrievable diagnostic and emits it at error severity.
   * Mirrors the warn-drop logging pattern but keeps the diagnostic so a caller can fail.
   *
   * @param {Lib_NovaConfig_Runner_PushError_Name}    name    - Name.
   * @param {Lib_NovaConfig_Runner_PushError_Purpose} purpose - Purpose.
   * @param {Lib_NovaConfig_Runner_PushError_Message} message - Message.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_PushError_Returns}
   *
   * @since 0.21.0
   */
  private pushError(name: Lib_NovaConfig_Runner_PushError_Name, purpose: Lib_NovaConfig_Runner_PushError_Purpose, message: Lib_NovaConfig_Runner_PushError_Message): Lib_NovaConfig_Runner_PushError_Returns {
    this.#diagnostics.push({
      severity: 'error',
      message,
    });

    Logger.customize({
      name,
      purpose,
    }).error(message);

    return;
  }

  /**
   * Lib - Nova Config - Push Warning.
   *
   * Records a config-shape warning as a retrievable diagnostic and emits it at warn severity.
   * Unlike an error, a warning keeps the value; it only flags a likely misclassification.
   *
   * @param {Lib_NovaConfig_Runner_PushWarning_Name}    name    - Name.
   * @param {Lib_NovaConfig_Runner_PushWarning_Purpose} purpose - Purpose.
   * @param {Lib_NovaConfig_Runner_PushWarning_Message} message - Message.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_PushWarning_Returns}
   *
   * @since 0.21.0
   */
  private pushWarning(name: Lib_NovaConfig_Runner_PushWarning_Name, purpose: Lib_NovaConfig_Runner_PushWarning_Purpose, message: Lib_NovaConfig_Runner_PushWarning_Message): Lib_NovaConfig_Runner_PushWarning_Returns {
    this.#diagnostics.push({
      severity: 'warning',
      message,
    });

    Logger.customize({
      name,
      purpose,
    }).warn(message);

    return;
  }

  /**
   * Lib - Nova Config - Parse Project.
   *
   * Extracts name, description, keywords, license, platforms, and other identity
   * fields. Downstream commands use these to populate package manifests.
   *
   * @param {Lib_NovaConfig_Runner_ParseProject_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseProject_Returns}
   *
   * @since 0.11.0
   */
  private parseProject(value: Lib_NovaConfig_Runner_ParseProject_Value): Lib_NovaConfig_Runner_ParseProject_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const project: Lib_NovaConfig_Runner_ParseProject_Project = {};

    const valueName: Lib_NovaConfig_Runner_ParseProject_ValueName = value['name'];
    const valueDescription: Lib_NovaConfig_Runner_ParseProject_ValueDescription = value['description'];
    const valueKeywords: Lib_NovaConfig_Runner_ParseProject_ValueKeywords = this.getArrayOfNonEmptyStrings(value['keywords']);

    if (isPlainObject(valueName) === true) {
      const name: Lib_NovaConfig_Runner_ParseProject_Name = {};

      const slug: Lib_NovaConfig_Runner_ParseProject_Slug = this.getNonEmptyString(valueName['slug']);
      const title: Lib_NovaConfig_Runner_ParseProject_Title = this.getNonEmptyString(valueName['title']);

      if (title !== undefined) {
        name.title = title;
      }

      if (slug !== undefined) {
        name.slug = slug;
      }

      if (Object.keys(name).length > 0) {
        project.name = name;
      }
    }

    if (isPlainObject(valueDescription) === true) {
      const description: Lib_NovaConfig_Runner_ParseProject_Description = {};

      const short: Lib_NovaConfig_Runner_ParseProject_Short = this.getNonEmptyString(valueDescription['short']);
      const long: Lib_NovaConfig_Runner_ParseProject_Long = this.getNonEmptyString(valueDescription['long']);

      if (short !== undefined) {
        description.short = short;
      }

      if (long !== undefined) {
        description.long = long;
      }

      if (Object.keys(description).length > 0) {
        project.description = description;
      }
    }

    if (valueKeywords !== undefined) {
      project.keywords = valueKeywords;
    }

    const valueLegalName: Lib_NovaConfig_Runner_ParseProject_ValueLegalName = this.getNonEmptyString(value['legalName']);

    if (valueLegalName !== undefined) {
      project.legalName = valueLegalName;
    }

    const valuePronouns: Lib_NovaConfig_Runner_ParseProject_ValuePronouns = this.getNonEmptyString(value['pronouns']);

    if (valuePronouns === 'personal' || valuePronouns === 'business') {
      project.pronouns = valuePronouns;
    }

    const valuePlatforms: Lib_NovaConfig_Runner_ParseProject_ValuePlatforms = value['platforms'];

    if (Array.isArray(valuePlatforms) === true) {
      const allowedPlatforms: Lib_NovaConfig_Runner_ParseProject_AllowedPlatforms = new Set([
        'nodejs',
        'swift',
        'android',
        'java',
        'kotlin',
        'csharp',
        'php',
        'python',
        'macos',
        'linux',
        'windows',
      ]);
      const parsedPlatforms: Lib_NovaConfig_Runner_ParseProject_ParsedPlatforms = valuePlatforms
        .filter((item): item is Lib_NovaConfig_Runner_ParseProject_Platform => typeof item === 'string' && allowedPlatforms.has(item));

      if (parsedPlatforms.length > 0) {
        project.platforms = parsedPlatforms;
      }
    }

    const valueStartingYear: Lib_NovaConfig_Runner_ParseProject_ValueStartingYear = value['startingYear'];

    if (
      typeof valueStartingYear === 'number'
      && Number.isInteger(valueStartingYear) === true
      && valueStartingYear >= 1970
    ) {
      project.startingYear = valueStartingYear;
    }

    const valueLicense: Lib_NovaConfig_Runner_ParseProject_ValueLicense = this.getNonEmptyString(value['license']);
    const allowedLicenses: Lib_NovaConfig_Runner_ParseProject_AllowedLicenses = new Set([
      'AGPL-3.0',
      'Apache-2.0',
      'BSD-2-Clause',
      'BSD-3-Clause',
      'BSL-1.0',
      'CC0-1.0',
      'EPL-2.0',
      'GPL-2.0',
      'GPL-3.0',
      'LGPL-2.1',
      'MIT',
      'MPL-2.0',
      'Proprietary',
      'Unlicense',
    ]);

    if (valueLicense !== undefined && allowedLicenses.has(valueLicense) === true) {
      project.license = valueLicense as Lib_NovaConfig_Runner_ParseProject_License;
    }

    return (Object.keys(project).length > 0) ? project : undefined;
  }

  /**
   * Lib - Nova Config - Parse Entities.
   *
   * Validates each entity object for name, email, url, and roles. The sync-ownership
   * recipe consumes entities to populate package.json author fields.
   *
   * @param {Lib_NovaConfig_Runner_ParseEntities_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseEntities_Returns}
   *
   * @since 0.11.0
   */
  private parseEntities(value: Lib_NovaConfig_Runner_ParseEntities_Value): Lib_NovaConfig_Runner_ParseEntities_Returns {
    if (Array.isArray(value) === false) {
      return undefined;
    }

    const entities: Lib_NovaConfig_Runner_ParseEntities_Entities = value
      .filter(isPlainObject)
      .map((entity) => {
        const parsedEntity: Lib_NovaConfig_Runner_ParseEntities_ParsedEntity = {};

        const name: Lib_NovaConfig_Runner_ParseEntities_Name = this.getNonEmptyString(entity['name']);
        const email: Lib_NovaConfig_Runner_ParseEntities_Email = this.getEmail(entity['email']);
        const url: Lib_NovaConfig_Runner_ParseEntities_Url = this.getUrl(entity['url']);
        const roles: Lib_NovaConfig_Runner_ParseEntities_Roles = entity['roles'];

        if (name !== undefined) {
          parsedEntity.name = name;
        }

        if (email !== undefined) {
          parsedEntity.email = email;
        }

        if (url !== undefined) {
          parsedEntity.url = url;
        }

        if (Array.isArray(roles) === true) {
          const parsedRoles: Lib_NovaConfig_Runner_ParseEntities_ParsedRoles = roles.filter(this['isEntityRole']);

          if (parsedRoles.length > 0) {
            parsedEntity.roles = parsedRoles;
          }
        }

        return (Object.keys(parsedEntity).length > 0) ? parsedEntity : null;
      })
      .filter((entity): entity is Lib_NovaConfig_Runner_ParseEntities_ParsedEntity => entity !== null);

    if (entities.length === 0) {
      return undefined;
    }

    entities.sort((a, b) => {
      const nameA: Lib_NovaConfig_Runner_ParseEntities_NameA = a['name'] ?? '';
      const nameB: Lib_NovaConfig_Runner_ParseEntities_NameB = b['name'] ?? '';

      return nameA.localeCompare(nameB);
    });

    return entities;
  }

  /**
   * Lib - Nova Config - Parse Emails.
   *
   * Iterates over the allowed email field names from libItemEmailFields and validates
   * each address. Currently only the bugs email field is supported.
   *
   * @param {Lib_NovaConfig_Runner_ParseEmails_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseEmails_Returns}
   *
   * @since 0.11.0
   */
  private parseEmails(value: Lib_NovaConfig_Runner_ParseEmails_Value): Lib_NovaConfig_Runner_ParseEmails_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const emails: Lib_NovaConfig_Runner_ParseEmails_Emails = {};
    const emailFields: Lib_NovaConfig_Runner_ParseEmails_EmailFields = libItemEmailFields;

    for (const emailField of emailFields) {
      const parsedEmail: Lib_NovaConfig_Runner_ParseEmails_ParsedEmail = this.getEmail(value[emailField]);

      if (parsedEmail !== undefined) {
        Reflect.set(emails, emailField, parsedEmail);
      }
    }

    return (Object.keys(emails).length > 0) ? emails : undefined;
  }

  /**
   * Lib - Nova Config - Parse URLs.
   *
   * Validates url fields like homepage, repository, bugs, license, and logo. Also
   * parses the fundSources array used by the funding generator.
   *
   * @param {Lib_NovaConfig_Runner_ParseUrls_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseUrls_Returns}
   *
   * @since 0.11.0
   */
  private parseUrls(value: Lib_NovaConfig_Runner_ParseUrls_Value): Lib_NovaConfig_Runner_ParseUrls_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const urls: Lib_NovaConfig_Runner_ParseUrls_Urls = {};
    const urlFields: Lib_NovaConfig_Runner_ParseUrls_UrlFields = libItemUrlFields;
    const urlFieldsFundSourcesIndex: Lib_NovaConfig_Runner_ParseUrls_UrlFieldsFundSourcesIndex = urlFields.indexOf('privacyPolicy');

    for (let i: Lib_NovaConfig_Runner_ParseUrls_LoopIndex = 0; i < urlFields.length; i += 1) {
      // Insert fundSources before privacyPolicy to match prompt order.
      if (i === urlFieldsFundSourcesIndex) {
        const fundSources: Lib_NovaConfig_Runner_ParseUrls_FundSources = this.getArrayOfHttpUrls(value['fundSources']);

        if (fundSources !== undefined) {
          urls.fundSources = fundSources;
        }
      }

      const urlField: Lib_NovaConfig_Runner_ParseUrls_UrlField = urlFields[i]!;
      const parsedUrl: Lib_NovaConfig_Runner_ParseUrls_ParsedUrl = this.getUrl(value[urlField], (urlField === 'repository') ? 'repository' : 'generic');

      if (parsedUrl !== undefined) {
        Reflect.set(urls, urlField, parsedUrl);
      }
    }

    return (Object.keys(urls).length > 0) ? urls : undefined;
  }

  /**
   * Lib - Nova Config - Parse Workspaces.
   *
   * Maps workspace paths to their name, role, and policy. Enforces naming conventions
   * that depend on the project slug.
   *
   * @param {Lib_NovaConfig_Runner_ParseWorkspaces_Value} value - Value.
   * @param {Lib_NovaConfig_Runner_ParseWorkspaces_Slug}  slug  - Slug.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseWorkspaces_Returns}
   *
   * @since 0.11.0
   */
  private parseWorkspaces(value: Lib_NovaConfig_Runner_ParseWorkspaces_Value, slug: Lib_NovaConfig_Runner_ParseWorkspaces_Slug): Lib_NovaConfig_Runner_ParseWorkspaces_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const workspaces: Lib_NovaConfig_Runner_ParseWorkspaces_Workspaces = {};

    /**
     * Lib - Nova Config - Parse Workspaces - Is Name Allowed.
     *
     * Checks that a workspace name follows the naming pattern required by its role.
     * Singular roles need exact matches while others need a suffix.
     *
     * @param {Lib_NovaConfig_Runner_ParseWorkspaces_Role} role - Role.
     * @param {Lib_NovaConfig_Runner_ParseWorkspaces_Name} name - Name.
     *
     * @private
     *
     * @returns {Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Returns}
     *
     * @since 0.11.0
     */
    const isNameAllowed: Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed = (role: Lib_NovaConfig_Runner_ParseWorkspaces_Role, name: Lib_NovaConfig_Runner_ParseWorkspaces_Name): Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Returns => {
      switch (role) {
        case 'project': {
          if (slug !== undefined) {
            return name === `${slug}-project`;
          }

          return name === 'project';
        }

        case 'docs': {
          if (slug !== undefined) {
            return name === `${slug}-docs`;
          }

          return name === 'docs';
        }

        case 'tool':
        case 'config':
        case 'app': {
          const base: Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Base = (slug !== undefined) ? `${slug}-${role}` : role;

          if (name.startsWith(`${base}-`) === false) {
            return false;
          }

          const descriptor: Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Descriptor = name.slice(base.length + 1);

          return descriptor.length > 0 && LIB_REGEX_PATTERN_SLUG_SIMPLE.test(descriptor);
        }

        case 'template':
        case 'package': {
          return LIB_REGEX_PATTERN_SLUG_SIMPLE.test(name) || LIB_REGEX_PATTERN_SLUG_SCOPED.test(name);
        }

        default: {
          return false;
        }
      }
    };

    for (const valueEntry of Object.entries(value)) {
      const path: Lib_NovaConfig_Runner_ParseWorkspaces_Path = valueEntry[0];
      const options: Lib_NovaConfig_Runner_ParseWorkspaces_Options = valueEntry[1];

      if (isPlainObject(options) === false) {
        Logger.customize({
          name: 'Runner.parseWorkspaces',
          purpose: 'workspaces',
        }).warn(`Workspace "${path}" is not an object. Skipping ...`);

        continue;
      }

      const nameCandidate: Lib_NovaConfig_Runner_ParseWorkspaces_NameCandidate = this.getNonEmptyString(options['name']);
      const roleCandidate: Lib_NovaConfig_Runner_ParseWorkspaces_RoleCandidate = this.getNonEmptyString(options['role']);
      const policyCandidate: Lib_NovaConfig_Runner_ParseWorkspaces_PolicyCandidate = this.getNonEmptyString(options['policy']);

      if (nameCandidate === undefined) {
        Logger.customize({
          name: 'Runner.parseWorkspaces',
          purpose: 'workspaces',
        }).warn(`Workspace "${path}" has no valid name. Skipping ...`);

        continue;
      }

      if (roleCandidate === undefined) {
        Logger.customize({
          name: 'Runner.parseWorkspaces',
          purpose: 'workspaces',
        }).warn(`Workspace "${path}" has no role. Skipping ...`);

        continue;
      }

      const matchedRole: Lib_NovaConfig_Runner_ParseWorkspaces_MatchedRole = libItemAllowedRoles.find((itemAllowedRole) => itemAllowedRole === roleCandidate);

      if (matchedRole === undefined) {
        Logger.customize({
          name: 'Runner.parseWorkspaces',
          purpose: 'workspaces',
        }).warn(`Workspace "${path}" has an unrecognized role "${roleCandidate}". Skipping ...`);

        continue;
      }

      if (policyCandidate === undefined) {
        Logger.customize({
          name: 'Runner.parseWorkspaces',
          purpose: 'workspaces',
        }).warn(`Workspace "${path}" has no policy. Skipping ...`);

        continue;
      }

      const allowedPolicies: Lib_NovaConfig_Runner_ParseWorkspaces_AllowedPolicies = libItemAllowedPoliciesByRole[matchedRole];
      const policy: Lib_NovaConfig_Runner_ParseWorkspaces_Policy = allowedPolicies.find((allowedPolicy) => allowedPolicy === policyCandidate);

      if (policy === undefined) {
        Logger.customize({
          name: 'Runner.parseWorkspaces',
          purpose: 'workspaces',
        }).warn(`Workspace "${path}" policy "${policyCandidate}" is not allowed for role "${matchedRole}". Skipping ...`);

        continue;
      }

      if (isNameAllowed(matchedRole, nameCandidate) === false) {
        Logger.customize({
          name: 'Runner.parseWorkspaces',
          purpose: 'workspaces',
        }).warn(`Workspace "${path}" name "${nameCandidate}" does not match the required pattern for role "${matchedRole}". Skipping ...`);

        continue;
      }

      Reflect.set(workspaces, path, {
        role: matchedRole,
        policy,
        name: nameCandidate,
      });
    }

    const workspaceKeys: Lib_NovaConfig_Runner_ParseWorkspaces_WorkspaceKeys = Object.keys(workspaces);

    if (workspaceKeys.length === 0) {
      return undefined;
    }

    const sortedWorkspaces: Lib_NovaConfig_Runner_ParseWorkspaces_SortedWorkspaces = {};

    workspaceKeys.sort((a, b) => a.localeCompare(b));

    for (const key of workspaceKeys) {
      Reflect.set(sortedWorkspaces, key, Reflect.get(workspaces, key));
    }

    return sortedWorkspaces;
  }

  /**
   * Lib - Nova Config - Parse Environment.
   *
   * Validates the top-level environment block against the config-load rules for prefixes,
   * references, overlap, and per-value delivery, recording diagnostics instead of throwing.
   *
   * @param {Lib_NovaConfig_Runner_ParseEnvironment_Value}      value      - Value.
   * @param {Lib_NovaConfig_Runner_ParseEnvironment_Workspaces} workspaces - Workspaces.
   * @param {Lib_NovaConfig_Runner_ParseEnvironment_Workflows}  workflows  - Workflows.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseEnvironment_Returns}
   *
   * @since 0.21.0
   */
  private parseEnvironment(value: Lib_NovaConfig_Runner_ParseEnvironment_Value, workspaces: Lib_NovaConfig_Runner_ParseEnvironment_Workspaces, workflows: Lib_NovaConfig_Runner_ParseEnvironment_Workflows): Lib_NovaConfig_Runner_ParseEnvironment_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const result: Lib_NovaConfig_Runner_ParseEnvironment_Result = {};
    const workspacePaths: Lib_NovaConfig_Runner_ParseEnvironment_WorkspacePaths = (workspaces !== undefined) ? Object.keys(workspaces) : [];
    const workflowNames: Lib_NovaConfig_Runner_ParseEnvironment_WorkflowNames = (workflows !== undefined) ? workflows.map((workflow) => workflow['name']) : [];
    const collectedPrefixes: Lib_NovaConfig_Runner_ParseEnvironment_CollectedPrefixes = [];

    // Project keys carry a prefix and optional values; in practice they are reach "managed".
    const projectValue: Lib_NovaConfig_Runner_ParseEnvironment_ProjectValue = value['project'];

    if (isPlainObject(projectValue) === true) {
      const projectPrefix: Lib_NovaConfig_Runner_ParseEnvironment_ProjectPrefix = this.getNonEmptyString(projectValue['prefix']);

      if (projectPrefix === undefined) {
        this.pushError('Runner.parseEnvironment', 'environment', 'Environment "project" has no prefix. Skipping ...');
      } else if (libEnvNamespace.isReservedPrefix(projectPrefix) === true) {
        this.pushError('Runner.parseEnvironment', 'environment', `Environment "project" prefix "${projectPrefix}" is reserved and cannot be used. Skipping ...`);
      } else {
        collectedPrefixes.push(projectPrefix);

        const projectVariables: Lib_NovaConfig_Runner_ParseEnvironment_ProjectVariables = this.parseEnvironmentValues(projectValue['variables'], projectPrefix, 'project');
        const projectResult: Lib_NovaConfig_Runner_ParseEnvironment_ProjectResult = { prefix: projectPrefix };

        if (projectVariables !== undefined) {
          projectResult.variables = projectVariables;
        }

        result.project = projectResult;
      }
    }

    // Per-workspace keys must reference a real workspace path and carry both storage and delivery axes.
    const workspacesValue: Lib_NovaConfig_Runner_ParseEnvironment_WorkspacesValue = value['workspaces'];

    if (isPlainObject(workspacesValue) === true) {
      const workspacesResult: Lib_NovaConfig_Runner_ParseEnvironment_WorkspacesResult = {};

      for (const workspaceEntry of Object.entries(workspacesValue)) {
        const workspacePath: Lib_NovaConfig_Runner_ParseEnvironment_WorkspacePath = workspaceEntry[0];
        const workspaceOptions: Lib_NovaConfig_Runner_ParseEnvironment_WorkspaceOptions = workspaceEntry[1];

        if (isPlainObject(workspaceOptions) === false) {
          continue;
        }

        if (workspacePaths.includes(workspacePath) === false) {
          this.pushError('Runner.parseEnvironment', 'environment', `Environment workspace "${workspacePath}" does not match a configured workspace. Skipping ...`);

          continue;
        }

        // Every workspace entry must carry a prefix so a value that later flips from reach
        // "local" to a managed reach already has a valid, prefixed GitHub name.
        const workspacePrefix: Lib_NovaConfig_Runner_ParseEnvironment_WorkspacePrefix = this.getNonEmptyString(workspaceOptions['prefix']);

        if (workspacePrefix === undefined) {
          this.pushError('Runner.parseEnvironment', 'environment', `Environment workspace "${workspacePath}" has no prefix. Skipping ...`);

          continue;
        }

        if (libEnvNamespace.isReservedPrefix(workspacePrefix) === true) {
          this.pushError('Runner.parseEnvironment', 'environment', `Environment workspace "${workspacePath}" prefix "${workspacePrefix}" is reserved and cannot be used. Skipping ...`);

          continue;
        }

        collectedPrefixes.push(workspacePrefix);

        const workspaceVariables: Lib_NovaConfig_Runner_ParseEnvironment_WorkspaceVariables = this.parseEnvironmentValues(workspaceOptions['variables'], workspacePrefix, `workspace "${workspacePath}"`);
        const workspaceResult: Lib_NovaConfig_Runner_ParseEnvironment_WorkspaceResult = { prefix: workspacePrefix };

        if (workspaceVariables !== undefined) {
          workspaceResult.variables = workspaceVariables;
        }

        Reflect.set(workspacesResult, workspacePath, workspaceResult);
      }

      if (Object.keys(workspacesResult).length > 0) {
        result.workspaces = workspacesResult;
      }
    }

    // Per-workflow keys must reference exactly one configured workflow and carry only a prefix.
    const workflowsValue: Lib_NovaConfig_Runner_ParseEnvironment_WorkflowsValue = value['workflows'];

    if (isPlainObject(workflowsValue) === true) {
      const workflowsResult: Lib_NovaConfig_Runner_ParseEnvironment_WorkflowsResult = {};

      for (const workflowEntry of Object.entries(workflowsValue)) {
        const workflowName: Lib_NovaConfig_Runner_ParseEnvironment_WorkflowName = workflowEntry[0];
        const workflowOptions: Lib_NovaConfig_Runner_ParseEnvironment_WorkflowOptions = workflowEntry[1];

        if (isPlainObject(workflowOptions) === false) {
          continue;
        }

        const matchCount: Lib_NovaConfig_Runner_ParseEnvironment_MatchCount = workflowNames.filter((name) => name === workflowName).length;

        if (matchCount === 0) {
          this.pushError('Runner.parseEnvironment', 'environment', `Environment workflow "${workflowName}" does not match a configured workflow. Skipping ...`);

          continue;
        }

        if (matchCount > 1) {
          this.pushError('Runner.parseEnvironment', 'environment', `Environment workflow "${workflowName}" matches more than one configured workflow. Skipping ...`);

          continue;
        }

        const workflowPrefix: Lib_NovaConfig_Runner_ParseEnvironment_WorkflowPrefix = this.getNonEmptyString(workflowOptions['prefix']);

        if (workflowPrefix === undefined) {
          this.pushError('Runner.parseEnvironment', 'environment', `Environment workflow "${workflowName}" has no prefix. Skipping ...`);

          continue;
        }

        if (libEnvNamespace.isReservedPrefix(workflowPrefix) === true) {
          this.pushError('Runner.parseEnvironment', 'environment', `Environment workflow "${workflowName}" prefix "${workflowPrefix}" is reserved and cannot be used. Skipping ...`);

          continue;
        }

        collectedPrefixes.push(workflowPrefix);

        Reflect.set(workflowsResult, workflowName, { prefix: workflowPrefix });
      }

      if (Object.keys(workflowsResult).length > 0) {
        result.workflows = workflowsResult;
      }
    }

    // Every accepted prefix must be disjoint from every other, so a name maps to one namespace.
    for (let i: Lib_NovaConfig_Runner_ParseEnvironment_I = 0; i < collectedPrefixes.length; i += 1) {
      for (let j: Lib_NovaConfig_Runner_ParseEnvironment_J = i + 1; j < collectedPrefixes.length; j += 1) {
        const prefixA: Lib_NovaConfig_Runner_ParseEnvironment_PrefixA = collectedPrefixes[i] as Lib_NovaConfig_Runner_ParseEnvironment_PrefixA;
        const prefixB: Lib_NovaConfig_Runner_ParseEnvironment_PrefixB = collectedPrefixes[j] as Lib_NovaConfig_Runner_ParseEnvironment_PrefixB;

        if (libEnvNamespace.prefixesOverlap(prefixA, prefixB) === true) {
          this.pushError('Runner.parseEnvironment', 'environment', `Environment prefixes "${prefixA}" and "${prefixB}" overlap. Skipping ...`);
        }
      }
    }

    if (Object.keys(result).length === 0) {
      return undefined;
    }

    return result;
  }

  /**
   * Lib - Nova Config - Parse Environment Values.
   *
   * Validates one group's environment values against the per-value rules for the required
   * reach discriminant, the secret flag, defaultValue, prefix repetition, and GitHub name;
   * drops invalid values.
   *
   * @param {Lib_NovaConfig_Runner_ParseEnvironmentValues_RawVariables} rawVariables - Raw variables.
   * @param {Lib_NovaConfig_Runner_ParseEnvironmentValues_Prefix}       prefix       - Prefix.
   * @param {Lib_NovaConfig_Runner_ParseEnvironmentValues_Context}      context      - Context.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseEnvironmentValues_Returns}
   *
   * @since 0.21.0
   */
  private parseEnvironmentValues(rawVariables: Lib_NovaConfig_Runner_ParseEnvironmentValues_RawVariables, prefix: Lib_NovaConfig_Runner_ParseEnvironmentValues_Prefix, context: Lib_NovaConfig_Runner_ParseEnvironmentValues_Context): Lib_NovaConfig_Runner_ParseEnvironmentValues_Returns {
    if (Array.isArray(rawVariables) === false) {
      return undefined;
    }

    const values: Lib_NovaConfig_Runner_ParseEnvironmentValues_Values = [];
    const seenNames: Lib_NovaConfig_Runner_ParseEnvironmentValues_SeenNames = new Set();

    for (const rawItem of rawVariables) {
      const raw: Lib_NovaConfig_Runner_ParseEnvironmentValues_Raw = rawItem;

      if (isPlainObject(raw) === false) {
        continue;
      }

      const key: Lib_NovaConfig_Runner_ParseEnvironmentValues_Key = this.getNonEmptyString(raw['key']);

      if (key === undefined) {
        this.pushError('Runner.parseEnvironmentValues', 'environment', `Environment ${context} has a value with no valid key. Skipping ...`);

        continue;
      }

      // Reach names where the key travels and is the required discriminant; without a valid
      // one the value cannot be routed (spec 2.1).
      const reachValues: Lib_NovaConfig_Runner_ParseEnvironmentValues_ReachValues = [
        'local',
        'managed',
        'build',
        'runtime',
      ];
      const reachCandidate: Lib_NovaConfig_Runner_ParseEnvironmentValues_ReachCandidate = reachValues.find((reachValue) => reachValue === raw['reach']);

      if (reachCandidate === undefined) {
        this.pushError('Runner.parseEnvironmentValues', 'environment', `Environment ${context} value "${key}" has no valid "reach" (local | managed | build | runtime). Skipping ...`);

        continue;
      }

      const isLocal: Lib_NovaConfig_Runner_ParseEnvironmentValues_IsLocal = reachCandidate === 'local';

      // Secret is the storage axis and applies only once a key reaches GitHub, so a non-local
      // value must declare it while a local value must not (spec 2.2).
      const secretCandidate: Lib_NovaConfig_Runner_ParseEnvironmentValues_SecretCandidate = (typeof raw['secret'] === 'boolean') ? raw['secret'] : undefined;

      if (isLocal === false && secretCandidate === undefined) {
        this.pushError('Runner.parseEnvironmentValues', 'environment', `Environment ${context} value "${key}" has no boolean "secret" flag. Skipping ...`);

        continue;
      }

      // A browser-exposed key marked secret would leak if the framework inlines it into client
      // output; the key stays valid, but Nova warns about the likely misclassification (spec 3.1).
      if (
        secretCandidate === true
        && (
          key.startsWith('PUBLIC_') === true
          || key.startsWith('NEXT_PUBLIC_') === true
        )
      ) {
        this.pushWarning('Runner.parseEnvironmentValues', 'environment', `Environment ${context} value "${key}" is a browser-exposed key marked secret and would leak if inlined into client output.`);
      }

      let hasError: Lib_NovaConfig_Runner_ParseEnvironmentValues_HasError = false;

      if (isLocal === true && secretCandidate !== undefined) {
        this.pushError('Runner.parseEnvironmentValues', 'environment', `Environment ${context} value "${key}" is reach "local" and cannot declare "secret". Skipping ...`);

        hasError = true;
      }

      const defaultValueCandidate: Lib_NovaConfig_Runner_ParseEnvironmentValues_DefaultValueCandidate = (typeof raw['defaultValue'] === 'string') ? raw['defaultValue'] : undefined;

      // A managed key never reaches a ".env" or a build, so it carries no default (spec 5).
      if (reachCandidate === 'managed' && defaultValueCandidate !== undefined) {
        this.pushError('Runner.parseEnvironmentValues', 'environment', `Environment ${context} value "${key}" is reach "managed" and cannot declare a "defaultValue". Skipping ...`);

        hasError = true;
      }

      if (secretCandidate === true && defaultValueCandidate !== undefined) {
        this.pushError('Runner.parseEnvironmentValues', 'environment', `Environment ${context} value "${key}" is a secret and cannot declare a "defaultValue". Skipping ...`);

        hasError = true;
      }

      // Prefix, GitHub name, and within-namespace uniqueness only apply to a key that gets a
      // GitHub name; a local key has none, so these checks are skipped for it (spec 2.4).
      if (isLocal === false) {
        if (libEnvNamespace.startsWithPrefix(key, prefix) === true) {
          this.pushError('Runner.parseEnvironmentValues', 'environment', `Environment ${context} value "${key}" starts with its own prefix "${prefix}". Skipping ...`);

          hasError = true;
        }

        const name: Lib_NovaConfig_Runner_ParseEnvironmentValues_Name = libEnvNamespace.githubName(prefix, key);

        if (libEnvNamespace.isGithubLegalName(name) === false) {
          this.pushError('Runner.parseEnvironmentValues', 'environment', `Environment ${context} value "${key}" resolves to GitHub name "${name}" which is not a valid GitHub variable or secret name. Skipping ...`);

          hasError = true;
        }

        // GitHub folds case, so two keys in one namespace resolving to the same case-folded name
        // would collide; the second is dropped (spec 3.3 within-prefix uniqueness).
        const foldedName: Lib_NovaConfig_Runner_ParseEnvironmentValues_FoldedName = name.toUpperCase();

        if (seenNames.has(foldedName) === true) {
          this.pushError('Runner.parseEnvironmentValues', 'environment', `Environment ${context} value "${key}" resolves to GitHub name "${name}" which duplicates another value in the same namespace. Skipping ...`);

          hasError = true;
        }

        if (hasError === false) {
          seenNames.add(foldedName);
        }
      }

      if (hasError === true) {
        continue;
      }

      // Assemble the value for its reach variant; the discriminant is validated runtime data,
      // so the object is built dynamically and cast to the union once.
      const value: Lib_NovaConfig_Runner_ParseEnvironmentValues_Value = {
        key,
        reach: reachCandidate,
      } as Lib_NovaConfig_Runner_ParseEnvironmentValues_Value;

      if (isLocal === false) {
        Reflect.set(value, 'secret', secretCandidate);
      }

      if (reachCandidate !== 'managed' && defaultValueCandidate !== undefined) {
        Reflect.set(value, 'defaultValue', defaultValueCandidate);
      }

      values.push(value);
    }

    return (values.length > 0) ? values : undefined;
  }

  /**
   * Lib - Nova Config - Validate Cred Contributors.
   *
   * Rejects a config whose deploy targets need a scoped credential the
   * environment cannot name: an account credential without a global prefix or an app
   * credential without that app's prefix, matching the generator's resolution.
   *
   * @param {Lib_NovaConfig_Runner_ValidateCredContributors_RawWorkflows} rawWorkflows - Raw workflows.
   * @param {Lib_NovaConfig_Runner_ValidateCredContributors_Environment}  environment  - Environment.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ValidateCredContributors_Returns}
   *
   * @since 0.21.0
   */
  private validateCredContributors(rawWorkflows: Lib_NovaConfig_Runner_ValidateCredContributors_RawWorkflows, environment: Lib_NovaConfig_Runner_ValidateCredContributors_Environment): Lib_NovaConfig_Runner_ValidateCredContributors_Returns {
    if (Array.isArray(rawWorkflows) === false) {
      return;
    }

    // The environment model is opt-in per repo: these credential-contributor checks only
    // apply once a config declares an "environment" block. A config with none lets its keys
    // and creds fall back to naked GitHub names (the working legacy behavior), so skip.
    if (environment === undefined) {
      return;
    }

    // A validated project group is only present when its prefix passed parsing, so
    // its mere existence proves an account credential can resolve a namespace.
    const projectGroup: Lib_NovaConfig_Runner_ValidateCredContributors_ProjectGroup = (environment !== undefined) ? environment['project'] : undefined;
    const hasProjectPrefix: Lib_NovaConfig_Runner_ValidateCredContributors_HasProjectPrefix = projectGroup !== undefined;
    const workspacesGroup: Lib_NovaConfig_Runner_ValidateCredContributors_WorkspacesGroup = (environment !== undefined) ? environment['workspaces'] : undefined;
    const workflowsGroup: Lib_NovaConfig_Runner_ValidateCredContributors_WorkflowsGroup = (environment !== undefined) ? environment['workflows'] : undefined;
    const reported: Lib_NovaConfig_Runner_ValidateCredContributors_Reported = new Set();
    const serverBearingWorkspaces: Lib_NovaConfig_Runner_ValidateCredContributors_ServerBearingWorkspaces = new Set();

    for (const rawWorkflowItem of rawWorkflows) {
      const rawWorkflow: Lib_NovaConfig_Runner_ValidateCredContributors_RawWorkflow = rawWorkflowItem;

      if (isPlainObject(rawWorkflow) === false) {
        continue;
      }

      const template: Lib_NovaConfig_Runner_ValidateCredContributors_Template = this.getNonEmptyString(rawWorkflow['template']);

      if (template === undefined) {
        continue;
      }

      const templateMeta: Lib_NovaConfig_Runner_ValidateCredContributors_TemplateMeta = libWorkflowTemplatesMetadata.find((entry) => entry['name'] === template);

      if (templateMeta === undefined) {
        continue;
      }

      // A template that owns config keys (non-auto, non-literal template-level variables) needs a
      // workflow prefix, else those keys resolve to naked GitHub names (spec 3.3 zero-are-naked, 7).
      const workflowName: Lib_NovaConfig_Runner_ValidateCredContributors_WorkflowName = this.getNonEmptyString(rawWorkflow['name']);
      const ownsConfigKeys: Lib_NovaConfig_Runner_ValidateCredContributors_OwnsConfigKeys = Object.values(templateMeta['variables']).some((variableMeta) => variableMeta['auto'] !== true && variableMeta['format'] !== 'literal');
      const workflowGroup: Lib_NovaConfig_Runner_ValidateCredContributors_WorkflowGroup = (workflowsGroup !== undefined && workflowName !== undefined) ? workflowsGroup[workflowName] : undefined;

      if (
        ownsConfigKeys === true
        && workflowName !== undefined
        && workflowGroup === undefined
      ) {
        const workflowMessage: Lib_NovaConfig_Runner_ValidateCredContributors_WorkflowMessage = `Environment workflow "${workflowName}" contributes config keys, but has no "workflows" entry with a prefix. Skipping ...`;

        if (reported.has(workflowMessage) === false) {
          reported.add(workflowMessage);

          this.pushError('Runner.validateCredContributors', 'environment', workflowMessage);
        }
      }

      const templateTargets: Lib_NovaConfig_Runner_ValidateCredContributors_TemplateTargets = templateMeta['targets'];

      if (templateTargets === undefined) {
        continue;
      }

      const deployTargets: Lib_NovaConfig_Runner_ValidateCredContributors_DeployTargets = [];

      // Blueprint deploy shape ({ to, path }) is what real nova.config.json files carry.
      const deployList: Lib_NovaConfig_Runner_ValidateCredContributors_DeployList = rawWorkflow['deploy'];

      if (Array.isArray(deployList) === true) {
        for (const deployItem of deployList) {
          const deployEntry: Lib_NovaConfig_Runner_ValidateCredContributors_DeployEntry = deployItem;

          if (isPlainObject(deployEntry) === false) {
            continue;
          }

          const to: Lib_NovaConfig_Runner_ValidateCredContributors_To = this.getNonEmptyString(deployEntry['to']);
          const path: Lib_NovaConfig_Runner_ValidateCredContributors_Path = this.getNonEmptyString(deployEntry['path']);

          if (to !== undefined && path !== undefined) {
            deployTargets.push({
              targetType: to,
              appPath: path,
            });
          }
        }
      }

      // Nova targets shape ({ type, workingDir }) is the parsed-workflow equivalent.
      const targetList: Lib_NovaConfig_Runner_ValidateCredContributors_TargetList = rawWorkflow['targets'];

      if (Array.isArray(targetList) === true) {
        for (const targetItem of targetList) {
          const targetEntry: Lib_NovaConfig_Runner_ValidateCredContributors_TargetEntry = targetItem;

          if (isPlainObject(targetEntry) === false) {
            continue;
          }

          const type: Lib_NovaConfig_Runner_ValidateCredContributors_Type = this.getNonEmptyString(targetEntry['type']);
          const workingDir: Lib_NovaConfig_Runner_ValidateCredContributors_WorkingDir = this.getNonEmptyString(targetEntry['workingDir']);

          if (type !== undefined && workingDir !== undefined) {
            deployTargets.push({
              targetType: type,
              appPath: workingDir,
            });
          }
        }
      }

      for (const deployTarget of deployTargets) {
        const targetMeta: Lib_NovaConfig_Runner_ValidateCredContributors_TargetMeta = templateTargets[deployTarget['targetType']];

        if (targetMeta === undefined) {
          continue;
        }

        // A target that syncs runtime secrets gives its workspace a live server env, so a reach
        // "runtime" value declared for that workspace has somewhere to land (spec 7).
        if (targetMeta['supportsRuntimeSecretSync'] === true) {
          serverBearingWorkspaces.add(deployTarget['appPath']);
        }

        const targetVariables: Lib_NovaConfig_Runner_ValidateCredContributors_TargetVariables = targetMeta['variables'];

        for (const variableEntry of Object.entries(targetVariables)) {
          const variableName: Lib_NovaConfig_Runner_ValidateCredContributors_VariableName = variableEntry[0];
          const variableMeta: Lib_NovaConfig_Runner_ValidateCredContributors_VariableMeta = variableEntry[1];
          const scope: Lib_NovaConfig_Runner_ValidateCredContributors_Scope = variableMeta['scope'];

          if (scope === 'account' && hasProjectPrefix === false) {
            const message: Lib_NovaConfig_Runner_ValidateCredContributors_Message = `Environment deploy target "${deployTarget['targetType']}" needs the account credential "${variableName}", but "project" has no prefix. Skipping ...`;

            if (reported.has(message) === false) {
              reported.add(message);

              this.pushError('Runner.validateCredContributors', 'environment', message);
            }
          } else if (scope === 'app') {
            const workspace: Lib_NovaConfig_Runner_ValidateCredContributors_Workspace = (workspacesGroup !== undefined) ? workspacesGroup[deployTarget['appPath']] : undefined;

            if (workspace === undefined) {
              const workspaceMessage: Lib_NovaConfig_Runner_ValidateCredContributors_WorkspaceMessage = `Environment deploy target "${deployTarget['targetType']}" needs the app credential "${variableName}" for "${deployTarget['appPath']}", but that workspace has no prefix. Skipping ...`;

              if (reported.has(workspaceMessage) === false) {
                reported.add(workspaceMessage);

                this.pushError('Runner.validateCredContributors', 'environment', workspaceMessage);
              }
            }
          }
        }
      }
    }

    // A reach "runtime" value needs a live server env to land in; a workspace declaring one but
    // deploying to no server-bearing target would deliver it nowhere (spec 7).
    if (workspacesGroup !== undefined) {
      for (const workspaceEntry of Object.entries(workspacesGroup)) {
        const runtimeWorkspacePath: Lib_NovaConfig_Runner_ValidateCredContributors_RuntimeWorkspacePath = workspaceEntry[0];
        const runtimeWorkspace: Lib_NovaConfig_Runner_ValidateCredContributors_RuntimeWorkspace = workspaceEntry[1];
        const hasRuntimeValue: Lib_NovaConfig_Runner_ValidateCredContributors_HasRuntimeValue = (runtimeWorkspace['variables'] ?? []).some((variable) => variable['reach'] === 'runtime');

        if (hasRuntimeValue === true && serverBearingWorkspaces.has(runtimeWorkspacePath) === false) {
          this.pushError('Runner.validateCredContributors', 'environment', `Environment workspace "${runtimeWorkspacePath}" declares a reach "runtime" value, but deploys to no server-bearing target. Skipping ...`);
        }
      }
    }

    return;
  }

  /**
   * Lib - Nova Config - Parse Workflows.
   *
   * Validates each workflow object for template, optional suffix, triggers,
   * optional depends-on, and optional settings. Settings values must be strings;
   * non-string values are dropped.
   *
   * @param {Lib_NovaConfig_Runner_ParseWorkflows_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseWorkflows_Returns}
   *
   * @since 0.18.0
   */
  private parseWorkflows(value: Lib_NovaConfig_Runner_ParseWorkflows_Value): Lib_NovaConfig_Runner_ParseWorkflows_Returns {
    if (Array.isArray(value) === false) {
      return undefined;
    }

    const workflows: Lib_NovaConfig_Runner_ParseWorkflows_Workflows = [];

    for (const item of value) {
      const castItem: Lib_NovaConfig_Runner_ParseWorkflows_CastItem = item;

      if (isPlainObject(castItem) === false) {
        continue;
      }

      const template: Lib_NovaConfig_Runner_ParseWorkflows_Template = this.getNonEmptyString(castItem['template']);

      if (template === undefined) {
        continue;
      }

      const name: Lib_NovaConfig_Runner_ParseWorkflows_Name = this.getNonEmptyString(castItem['name']);

      if (name === undefined) {
        continue;
      }

      const rawTriggers: Lib_NovaConfig_Runner_ParseWorkflows_RawTriggers = castItem['triggers'];

      if (Array.isArray(rawTriggers) === false) {
        continue;
      }

      const triggers: Lib_NovaConfig_Runner_ParseWorkflows_Triggers = [];

      for (const trigger of rawTriggers) {
        const triggerValue: Lib_NovaConfig_Runner_ParseWorkflows_TriggerValue = this.getNonEmptyString(trigger);

        if (triggerValue !== undefined) {
          triggers.push(triggerValue);
        }
      }

      const rawDependsOn: Lib_NovaConfig_Runner_ParseWorkflows_RawDependsOn = castItem['depends-on'];
      const dependsOn: Lib_NovaConfig_Runner_ParseWorkflows_DependsOn = (Array.isArray(rawDependsOn) === true) ? rawDependsOn.filter((entry) => typeof entry === 'string' && entry.trim() !== '') as Lib_NovaConfig_Runner_ParseWorkflows_DependsOn : [];
      const rawBuild: Lib_NovaConfig_Runner_ParseWorkflows_RawBuild = castItem['build'];
      const build: Lib_NovaConfig_Runner_ParseWorkflows_Build = (Array.isArray(rawBuild) === true) ? rawBuild.filter((entry) => typeof entry === 'string' && entry.trim() !== '') as Lib_NovaConfig_Runner_ParseWorkflows_Build : [];
      const rawDeploy: Lib_NovaConfig_Runner_ParseWorkflows_RawDeploy = castItem['deploy'];
      const deploy: Lib_NovaConfig_Runner_ParseWorkflows_Deploy = [];

      if (Array.isArray(rawDeploy) === true) {
        for (const rawDeployEntry of rawDeploy) {
          const rawDeployValue: Lib_NovaConfig_Runner_ParseWorkflows_RawDeployValue = rawDeployEntry;

          if (isPlainObject(rawDeployValue) === false) {
            continue;
          }

          const deployTo: Lib_NovaConfig_Runner_ParseWorkflows_DeployTo = this.getNonEmptyString(rawDeployValue['to']);
          const deployPath: Lib_NovaConfig_Runner_ParseWorkflows_DeployPath = this.getNonEmptyString(rawDeployValue['path']);

          if (deployTo === undefined || deployPath === undefined) {
            continue;
          }

          const rawDeployAfter: Lib_NovaConfig_Runner_ParseWorkflows_RawDeployAfter = rawDeployValue['after'];
          const deployAfter: Lib_NovaConfig_Runner_ParseWorkflows_DeployAfter = (Array.isArray(rawDeployAfter) === true) ? rawDeployAfter.filter((entry) => typeof entry === 'string' && entry.trim() !== '') as Lib_NovaConfig_Runner_ParseWorkflows_DeployAfter : [];

          const deployTarget: Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget = {
            to: deployTo,
            path: deployPath,
          };

          if (deployAfter.length > 0) {
            Reflect.set(deployTarget, 'after', deployAfter);
          }

          const deployWith: Lib_NovaConfig_Runner_ParseWorkflows_DeployWith = rawDeployValue['with'];
          const parsedDeployWith: Lib_NovaConfig_Runner_ParseWorkflows_ParsedDeployWith = this.parseWorkflowWith(deployWith);

          if (parsedDeployWith !== undefined) {
            Reflect.set(deployTarget, 'with', parsedDeployWith);
          }

          deploy.push(deployTarget);
        }
      }

      const withMap: Lib_NovaConfig_Runner_ParseWorkflows_WithMap = castItem['with'];

      // Build workflow object with properties in type-definition order: template, name, triggers, depends-on, build, deploy, with.
      const workflow: Lib_NovaConfig_Runner_ParseWorkflows_Workflow = {
        template,
        name,
        triggers,
      };

      if (dependsOn.length > 0) {
        Reflect.set(workflow, 'depends-on', dependsOn);
      }

      if (build.length > 0) {
        Reflect.set(workflow, 'build', build);
      }

      if (deploy.length > 0) {
        Reflect.set(workflow, 'deploy', deploy);
      }

      const parsedWith: Lib_NovaConfig_Runner_ParseWorkflows_ParsedWith = this.parseWorkflowWith(withMap);

      if (parsedWith !== undefined) {
        workflow.with = parsedWith;
      }

      workflows.push(workflow);
    }

    if (workflows.length === 0) {
      return undefined;
    }

    // Sort workflows by template, then by name.
    workflows.sort((a, b) => {
      const templateCompare: Lib_NovaConfig_Runner_ParseWorkflows_TemplateCompare = a['template'].localeCompare(b['template']);

      if (templateCompare !== 0) {
        return templateCompare;
      }

      const nameA: Lib_NovaConfig_Runner_ParseWorkflows_NameA = a['name'] ?? '';
      const nameB: Lib_NovaConfig_Runner_ParseWorkflows_NameB = b['name'] ?? '';

      return nameA.localeCompare(nameB);
    });

    return workflows;
  }

  /**
   * Lib - Nova Config - Parse Workflow With.
   *
   * Parses a workflow or deploy-target "with" block into a key-sorted map of string
   * values. Returns undefined when the block is absent, not a plain object, or holds
   * no string values.
   *
   * @param {Lib_NovaConfig_Runner_ParseWorkflowWith_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseWorkflowWith_Returns}
   *
   * @since 0.22.0
   */
  private parseWorkflowWith(value: Lib_NovaConfig_Runner_ParseWorkflowWith_Value): Lib_NovaConfig_Runner_ParseWorkflowWith_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const parsed: Lib_NovaConfig_Runner_ParseWorkflowWith_Parsed = {};
    const sortedEntries: Lib_NovaConfig_Runner_ParseWorkflowWith_SortedEntries = Object.entries(value).sort(
      (a, b) => a[0].localeCompare(b[0]),
    );

    for (const entry of sortedEntries) {
      const entryKey: Lib_NovaConfig_Runner_ParseWorkflowWith_EntryKey = entry[0];
      const entryValue: Lib_NovaConfig_Runner_ParseWorkflowWith_EntryValue = entry[1];

      if (typeof entryValue === 'string') {
        Reflect.set(parsed, entryKey, entryValue);
      }
    }

    if (Object.keys(parsed).length === 0) {
      return undefined;
    }

    return parsed;
  }

  /**
   * Lib - Nova Config - Parse GitHub.
   *
   * Parses the github block from the config, extracting
   * owner, repo, topics, features, and policies. Returns undefined
   * when the block is absent or not a plain object.
   *
   * @param {Lib_NovaConfig_Runner_ParseGithub_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseGithub_Returns}
   *
   * @since 0.18.0
   */
  private parseGithub(value: Lib_NovaConfig_Runner_ParseGithub_Value): Lib_NovaConfig_Runner_ParseGithub_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const result: Lib_NovaConfig_Runner_ParseGithub_Result = {};

    const ownerCandidate: Lib_NovaConfig_Runner_ParseGithub_OwnerCandidate = this.getNonEmptyString(value['owner']);
    const owner: Lib_NovaConfig_Runner_ParseGithub_Owner = (ownerCandidate !== undefined && LIB_REGEX_PATTERN_GITHUB_OWNER.test(ownerCandidate) === true) ? ownerCandidate : undefined;

    if (owner !== undefined) {
      result.owner = owner;
    }

    const repoCandidate: Lib_NovaConfig_Runner_ParseGithub_RepoCandidate = this.getNonEmptyString(value['repo']);
    const repo: Lib_NovaConfig_Runner_ParseGithub_Repo = (repoCandidate !== undefined && LIB_REGEX_PATTERN_GITHUB_REPO.test(repoCandidate) === true) ? repoCandidate : undefined;

    if (repo !== undefined) {
      result.repo = repo;
    }

    const topics: Lib_NovaConfig_Runner_ParseGithub_Topics = this.getGithubTopics(value['topics']);

    if (topics !== undefined) {
      result.topics = topics;
    }

    const features: Lib_NovaConfig_Runner_ParseGithub_Features = this.getGithubFeatures(value['features']);

    if (features !== undefined) {
      result.features = features;
    }

    const policies: Lib_NovaConfig_Runner_ParseGithub_Policies = this.getGithubPolicies(value['policies']);

    if (policies !== undefined) {
      result.policies = policies;
    }

    const issueTemplate: Lib_NovaConfig_Runner_ParseGithub_IssueTemplate = this.getGithubIssueTemplate(value['issueTemplate']);

    if (issueTemplate !== undefined) {
      result.issueTemplate = issueTemplate;
    }

    return (Object.keys(result).length > 0) ? result : undefined;
  }

  /**
   * Lib - Nova Config - Parse Recipes.
   *
   * Parses the unified recipes block into its four categories, validating each entry
   * against the canonical recipe names. Returns undefined when the block is absent or empty.
   *
   * @param {Lib_NovaConfig_Runner_ParseRecipes_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseRecipes_Returns}
   *
   * @since 0.21.0
   */
  private parseRecipes(value: Lib_NovaConfig_Runner_ParseRecipes_Value): Lib_NovaConfig_Runner_ParseRecipes_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const result: Lib_NovaConfig_Runner_ParseRecipes_Result = {};

    const github: Lib_NovaConfig_Runner_ParseRecipes_Github = this.getRecipeEntries(value['github'], libItemRecipesByCategory['github']);

    if (github !== undefined) {
      result.github = github;
    }

    const license: Lib_NovaConfig_Runner_ParseRecipes_License = this.getRecipeEntries(value['license'], libItemRecipesByCategory['license']);

    if (license !== undefined) {
      result.license = license;
    }

    const readMe: Lib_NovaConfig_Runner_ParseRecipes_ReadMe = this.getRecipeEntries(value['read-me'], libItemRecipesByCategory['read-me']);

    if (readMe !== undefined) {
      Reflect.set(result, 'read-me', readMe);
    }

    const packageJson: Lib_NovaConfig_Runner_ParseRecipes_PackageJson = this.getPackageJsonRecipes(value['package-json']);

    if (packageJson !== undefined) {
      Reflect.set(result, 'package-json', packageJson);
    }

    return (Object.keys(result).length > 0) ? result : undefined;
  }

  /**
   * Lib - Nova Config - Get Recipe Entries.
   *
   * Builds a validated recipe-entry map for one project-scoped category, keeping only the
   * allowed names whose value is a well-formed entry. Returns undefined when none remain.
   *
   * @param {Lib_NovaConfig_Runner_GetRecipeEntries_Value}        value        - Value.
   * @param {Lib_NovaConfig_Runner_GetRecipeEntries_AllowedNames} allowedNames - Allowed names.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetRecipeEntries_Returns}
   *
   * @since 0.21.0
   */
  private getRecipeEntries(value: Lib_NovaConfig_Runner_GetRecipeEntries_Value, allowedNames: Lib_NovaConfig_Runner_GetRecipeEntries_AllowedNames): Lib_NovaConfig_Runner_GetRecipeEntries_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const result: Lib_NovaConfig_Runner_GetRecipeEntries_Result = {};

    for (const name of allowedNames) {
      const entry: Lib_NovaConfig_Runner_GetRecipeEntries_Entry = this.getRecipeEntry(Reflect.get(value, name));

      if (entry !== undefined) {
        Reflect.set(result, name, entry);
      }
    }

    return (Object.keys(result).length > 0) ? result : undefined;
  }

  /**
   * Lib - Nova Config - Get package.json Recipes.
   *
   * Builds the workspace-keyed recipe map for the package-json category, validating each
   * workspace with getRecipeEntries. Returns undefined when no workspace declares an entry.
   *
   * @param {Lib_NovaConfig_Runner_GetPackageJsonRecipes_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetPackageJsonRecipes_Returns}
   *
   * @since 0.21.0
   */
  private getPackageJsonRecipes(value: Lib_NovaConfig_Runner_GetPackageJsonRecipes_Value): Lib_NovaConfig_Runner_GetPackageJsonRecipes_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const result: Lib_NovaConfig_Runner_GetPackageJsonRecipes_Result = {};

    for (const valueEntry of Object.entries(value)) {
      const workspacePath: Lib_NovaConfig_Runner_GetPackageJsonRecipes_WorkspacePath = valueEntry[0];
      const workspaceValue: Lib_NovaConfig_Runner_GetPackageJsonRecipes_WorkspaceValue = valueEntry[1];
      const entries: Lib_NovaConfig_Runner_GetPackageJsonRecipes_Entries = this.getRecipeEntries(workspaceValue, libItemRecipesByCategory['package-json']);

      if (entries !== undefined) {
        Reflect.set(result, workspacePath, entries);
      }
    }

    return (Object.keys(result).length > 0) ? result : undefined;
  }

  /**
   * Lib - Nova Config - Get Recipe Entry.
   *
   * Validates a single recipe entry, requiring a boolean "enabled" and keeping only boolean
   * "settings" values. Returns undefined when the entry is not a well-formed object.
   *
   * @param {Lib_NovaConfig_Runner_GetRecipeEntry_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetRecipeEntry_Returns}
   *
   * @since 0.21.0
   */
  private getRecipeEntry(value: Lib_NovaConfig_Runner_GetRecipeEntry_Value): Lib_NovaConfig_Runner_GetRecipeEntry_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const enabled: Lib_NovaConfig_Runner_GetRecipeEntry_Enabled = value['enabled'];

    if (typeof enabled !== 'boolean') {
      return undefined;
    }

    const result: Lib_NovaConfig_Runner_GetRecipeEntry_Result = {
      enabled,
    };

    const settingsCandidate: Lib_NovaConfig_Runner_GetRecipeEntry_SettingsCandidate = value['settings'];

    if (isPlainObject(settingsCandidate) === true) {
      const settings: Lib_NovaConfig_Runner_GetRecipeEntry_Settings = {};

      for (const settingsEntry of Object.entries(settingsCandidate)) {
        const settingKey: Lib_NovaConfig_Runner_GetRecipeEntry_SettingKey = settingsEntry[0];
        const settingValue: Lib_NovaConfig_Runner_GetRecipeEntry_SettingValue = settingsEntry[1];

        if (typeof settingValue === 'boolean') {
          Reflect.set(settings, settingKey, settingValue);
        }
      }

      if (Object.keys(settings).length > 0) {
        result.settings = settings;
      }
    }

    return result;
  }

  /**
   * Lib - Nova Config - Parse Gitignore.
   *
   * Parses the gitignore block from the config, extracting the projectExcludes
   * list of additional ignore patterns. Returns undefined when the block is absent
   * or not a plain object.
   *
   * @param {Lib_NovaConfig_Runner_ParseGitignore_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseGitignore_Returns}
   *
   * @since 0.20.0
   */
  private parseGitignore(value: Lib_NovaConfig_Runner_ParseGitignore_Value): Lib_NovaConfig_Runner_ParseGitignore_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const result: Lib_NovaConfig_Runner_ParseGitignore_Result = {};
    const projectExcludes: Lib_NovaConfig_Runner_ParseGitignore_ProjectExcludes = this.getArrayOfNonEmptyStrings(value['projectExcludes']);

    if (projectExcludes !== undefined) {
      result.projectExcludes = projectExcludes;
    }

    return (Object.keys(result).length > 0) ? result : undefined;
  }

  /**
   * Lib - Nova Config - Parse Settings.
   *
   * Parses the top-level "settings" field into project-wide behavior toggles.
   * Returns undefined when the input is not a plain object or holds no recognized keys.
   *
   * @param {Lib_NovaConfig_Runner_ParseSettings_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseSettings_Returns}
   *
   * @since 0.22.0
   */
  private parseSettings(value: Lib_NovaConfig_Runner_ParseSettings_Value): Lib_NovaConfig_Runner_ParseSettings_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const result: Lib_NovaConfig_Runner_ParseSettings_Result = {};
    const lockStepVersioning: Lib_NovaConfig_Runner_ParseSettings_LockStepVersioning = (value['lockStepVersioning'] === true) ? true : undefined;

    if (lockStepVersioning !== undefined) {
      result.lockStepVersioning = lockStepVersioning;
    }

    return (Object.keys(result).length > 0) ? result : undefined;
  }

  /**
   * Lib - Nova Config - Parse Agents.
   *
   * Parses the top-level "agents" field into a list of AI-tool ids, validating each
   * entry against libItemAllowedAgents and dropping unknown ids. Returns undefined when
   * the input is not an array or holds no valid ids.
   *
   * @param {Lib_NovaConfig_Runner_ParseAgents_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseAgents_Returns}
   *
   * @since 0.20.0
   */
  private parseAgents(value: Lib_NovaConfig_Runner_ParseAgents_Value): Lib_NovaConfig_Runner_ParseAgents_Returns {
    if (Array.isArray(value) === false) {
      return undefined;
    }

    const agents: Lib_NovaConfig_Runner_ParseAgents_Agents = [];

    // Rebuild in the canonical libItemAllowedAgents order so the serialized config
    // stays stable regardless of the input order and drops unknown ids.
    for (const allowedAgent of libItemAllowedAgents) {
      if (value.some((item) => item === allowedAgent) === true) {
        agents.push(allowedAgent);
      }
    }

    return (agents.length > 0) ? agents : undefined;
  }

  /**
   * Lib - Nova Config - Get GitHub Features.
   *
   * Parses the github.features block for boolean feature flags: issues, wiki,
   * projects, and discussions. Returns undefined when the input is not a plain object.
   *
   * @param {Lib_NovaConfig_Runner_GetGithubFeatures_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetGithubFeatures_Returns}
   *
   * @since 0.18.0
   */
  private getGithubFeatures(value: Lib_NovaConfig_Runner_GetGithubFeatures_Value): Lib_NovaConfig_Runner_GetGithubFeatures_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const result: Lib_NovaConfig_Runner_GetGithubFeatures_Result = {};

    const issues: Lib_NovaConfig_Runner_GetGithubFeatures_Issues = (typeof value['issues'] === 'boolean') ? value['issues'] : undefined;

    if (issues !== undefined) {
      result.issues = issues;
    }

    const wiki: Lib_NovaConfig_Runner_GetGithubFeatures_Wiki = (typeof value['wiki'] === 'boolean') ? value['wiki'] : undefined;

    if (wiki !== undefined) {
      result.wiki = wiki;
    }

    const projects: Lib_NovaConfig_Runner_GetGithubFeatures_Projects = (typeof value['projects'] === 'boolean') ? value['projects'] : undefined;

    if (projects !== undefined) {
      result.projects = projects;
    }

    const discussions: Lib_NovaConfig_Runner_GetGithubFeatures_Discussions = (typeof value['discussions'] === 'boolean') ? value['discussions'] : undefined;

    if (discussions !== undefined) {
      result.discussions = discussions;
    }

    return (Object.keys(result).length > 0) ? result : undefined;
  }

  /**
   * Lib - Nova Config - Get GitHub Issue Template.
   *
   * Parses the github.issueTemplate block for the bugReportFields list of form
   * field file names. Returns undefined when the input is not a plain object.
   *
   * @param {Lib_NovaConfig_Runner_GetGithubIssueTemplate_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetGithubIssueTemplate_Returns}
   *
   * @since 0.20.0
   */
  private getGithubIssueTemplate(value: Lib_NovaConfig_Runner_GetGithubIssueTemplate_Value): Lib_NovaConfig_Runner_GetGithubIssueTemplate_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const result: Lib_NovaConfig_Runner_GetGithubIssueTemplate_Result = {};
    const bugReportFields: Lib_NovaConfig_Runner_GetGithubIssueTemplate_BugReportFields = this.getArrayOfNonEmptyStrings(value['bugReportFields']);

    if (bugReportFields !== undefined) {
      result.bugReportFields = bugReportFields;
    }

    return (Object.keys(result).length > 0) ? result : undefined;
  }

  /**
   * Lib - Nova Config - Get GitHub Policies.
   *
   * Parses the github.policies block for visibility, defaultBranch, mergeMethods,
   * and autoDeleteHeadBranch. Returns undefined when the input is not a plain object.
   *
   * @param {Lib_NovaConfig_Runner_GetGithubPolicies_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetGithubPolicies_Returns}
   *
   * @since 0.18.0
   */
  private getGithubPolicies(value: Lib_NovaConfig_Runner_GetGithubPolicies_Value): Lib_NovaConfig_Runner_GetGithubPolicies_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const result: Lib_NovaConfig_Runner_GetGithubPolicies_Result = {};

    let visibility: Lib_NovaConfig_Runner_GetGithubPolicies_Visibility = undefined;

    if (
      value['visibility'] === 'public'
      || value['visibility'] === 'private'
      || value['visibility'] === 'internal'
    ) {
      visibility = value['visibility'];
    }

    if (visibility !== undefined) {
      result.visibility = visibility;
    }

    const defaultBranch: Lib_NovaConfig_Runner_GetGithubPolicies_DefaultBranch = this.getNonEmptyString(value['defaultBranch']);

    if (defaultBranch !== undefined) {
      result.defaultBranch = defaultBranch;
    }

    const mergeMethods: Lib_NovaConfig_Runner_GetGithubPolicies_MergeMethods = this.getGithubPoliciesMergeMethods(value['mergeMethods']);

    if (mergeMethods !== undefined) {
      result.mergeMethods = mergeMethods;
    }

    const autoDeleteHeadBranch: Lib_NovaConfig_Runner_GetGithubPolicies_AutoDeleteHeadBranch = (typeof value['autoDeleteHeadBranch'] === 'boolean') ? value['autoDeleteHeadBranch'] : undefined;

    if (autoDeleteHeadBranch !== undefined) {
      result.autoDeleteHeadBranch = autoDeleteHeadBranch;
    }

    return (Object.keys(result).length > 0) ? result : undefined;
  }

  /**
   * Lib - Nova Config - Get GitHub Policies Merge Methods.
   *
   * Parses the github.policies.mergeMethods block for merge, squash, and rebase
   * boolean flags. Returns undefined when the input is not a plain object.
   *
   * @param {Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Returns}
   *
   * @since 0.18.0
   */
  private getGithubPoliciesMergeMethods(value: Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Value): Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const result: Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Result = {};

    const merge: Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Merge = (typeof value['merge'] === 'boolean') ? value['merge'] : undefined;

    if (merge !== undefined) {
      result.merge = merge;
    }

    const squash: Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Squash = (typeof value['squash'] === 'boolean') ? value['squash'] : undefined;

    if (squash !== undefined) {
      result.squash = squash;
    }

    const rebase: Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Rebase = (typeof value['rebase'] === 'boolean') ? value['rebase'] : undefined;

    if (rebase !== undefined) {
      result.rebase = rebase;
    }

    return (Object.keys(result).length > 0) ? result : undefined;
  }

  /**
   * Lib - Nova Config - Get GitHub Topics.
   *
   * Filters an array down to string-only entries for the github.topics field.
   * Returns undefined when the input is not an array; returns the filtered array
   * even when empty because an empty topics list is meaningful.
   *
   * @param {Lib_NovaConfig_Runner_GetGithubTopics_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetGithubTopics_Returns}
   *
   * @since 0.18.0
   */
  private getGithubTopics(value: Lib_NovaConfig_Runner_GetGithubTopics_Value): Lib_NovaConfig_Runner_GetGithubTopics_Returns {
    if (Array.isArray(value) === false) {
      return undefined;
    }

    return value.filter((item): item is Lib_NovaConfig_Runner_GetGithubTopics_TypeGuard => typeof item === 'string');
  }

  /**
   * Lib - Nova Config - Is Entity Role.
   *
   * Type guard that narrows a value to one of the three allowed entity roles: author,
   * contributor, or supporter. Used by parseEntities as a filter.
   *
   * @param {Lib_NovaConfig_Runner_IsEntityRole_Value} value - Value.
   *
   * @private
   *
   * @returns {boolean}
   *
   * @since 0.11.0
   */
  private isEntityRole(value: Lib_NovaConfig_Runner_IsEntityRole_Value): value is Lib_NovaConfig_Runner_IsEntityRole_TypeGuard {
    return (
      value === 'author'
      || value === 'contributor'
      || value === 'supporter'
    );
  }

  /**
   * Lib - Nova Config - Get Array Of Non Empty Strings.
   *
   * Filters an array down to trimmed non-empty string entries. Used by parseProject
   * to validate the keywords list in the project section.
   *
   * @param {Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Returns}
   *
   * @since 0.11.0
   */
  private getArrayOfNonEmptyStrings(value: Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Value): Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Returns {
    if (Array.isArray(value) === false) {
      return undefined;
    }

    const items: Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Items = value
      .map((item) => this.getNonEmptyString(item))
      .filter((item): item is Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_TypeGuard => item !== undefined);

    return (items.length > 0) ? items : undefined;
  }

  /**
   * Lib - Nova Config - Get Array Of HTTP URLs.
   *
   * Validates each array entry as a URL through getUrl and discards invalid ones. Used by
   * parseUrls to parse the fundSources list for Sponsors.
   *
   * @param {Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Value} value   - Value.
   * @param {Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Field} [field] - Field.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Returns}
   *
   * @since 0.11.0
   */
  private getArrayOfHttpUrls(value: Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Value, field?: Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Field): Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Returns {
    if (Array.isArray(value) === false) {
      return undefined;
    }

    const items: Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Items = value
      .map((item) => this.getUrl(item, field))
      .filter((item): item is Lib_NovaConfig_Runner_GetArrayOfHttpUrls_TypeGuard => item !== undefined);

    return (items.length > 0) ? items : undefined;
  }

  /**
   * Lib - Nova Config - Get Email.
   *
   * Returns the trimmed value only when it passes the simple email regex check. Called by
   * parseEmails for config fields and parseEntities for people.
   *
   * @param {Lib_NovaConfig_Runner_GetEmail_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetEmail_Returns}
   *
   * @since 0.11.0
   */
  private getEmail(value: Lib_NovaConfig_Runner_GetEmail_Value): Lib_NovaConfig_Runner_GetEmail_Returns {
    const email: Lib_NovaConfig_Runner_GetEmail_Email = this.getNonEmptyString(value);

    if (email === undefined) {
      return undefined;
    }

    if (LIB_REGEX_PATTERN_EMAIL_SIMPLE.test(email) === false) {
      return undefined;
    }

    return email;
  }

  /**
   * Lib - Nova Config - Get URL.
   *
   * Parses the value as a URL and checks its protocol against the allowed list.
   * Repository fields allow git protocols while others only allow http.
   *
   * @param {Lib_NovaConfig_Runner_GetUrl_Value} value   - Value.
   * @param {Lib_NovaConfig_Runner_GetUrl_Field} [field] - Field.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetUrl_Returns}
   *
   * @since 0.11.0
   */
  private getUrl(value: Lib_NovaConfig_Runner_GetUrl_Value, field?: Lib_NovaConfig_Runner_GetUrl_Field): Lib_NovaConfig_Runner_GetUrl_Returns {
    const candidateUrl: Lib_NovaConfig_Runner_GetUrl_CandidateUrl = this.getNonEmptyString(value);

    if (candidateUrl === undefined) {
      return undefined;
    }

    try {
      const url: Lib_NovaConfig_Runner_GetUrl_Url = new URL(candidateUrl);

      const allowedProtocols: Lib_NovaConfig_Runner_GetUrl_AllowedProtocols = (field === 'repository') ? libItemRepositoryProtocols : libItemGenericProtocols;
      const isAllowed: Lib_NovaConfig_Runner_GetUrl_IsAllowed = allowedProtocols.some(
        (allowedProtocol) => allowedProtocol === url.protocol,
      );

      return (isAllowed === true) ? candidateUrl : undefined;
    } catch {
      return undefined;
    }
  }

  /**
   * Lib - Nova Config - Get Non Empty String.
   *
   * Trims and returns a string only when the result is non-empty. Serves as the
   * base validator for nearly every scalar field in the config file.
   *
   * @param {Lib_NovaConfig_Runner_GetNonEmptyString_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetNonEmptyString_Returns}
   *
   * @since 0.11.0
   */
  private getNonEmptyString(value: Lib_NovaConfig_Runner_GetNonEmptyString_Value): Lib_NovaConfig_Runner_GetNonEmptyString_Returns {
    if (typeof value !== 'string') {
      return undefined;
    }

    const string: Lib_NovaConfig_Runner_GetNonEmptyString_String = value.trim();

    return (string.length > 0) ? string : undefined;
  }
}
