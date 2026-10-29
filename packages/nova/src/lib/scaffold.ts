import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import {
  dirname,
  isAbsolute,
  join,
  relative,
  resolve,
  sep,
} from 'node:path';
import { fileURLToPath } from 'node:url';

import { minimatch } from 'minimatch';
import prompts from 'prompts';

import novaPackageJson from '../../package.json' with { type: 'json' };

import { Logger } from '../toolkit/index.js';
import { Runner as LibCorepack } from './corepack.js';
import { writeDotenvFiles } from './dotenv.js';
import { libEnvNamespace } from './env-namespace.js';
import { renderIgnoreFile } from './ignore-files.js';
import { libItemAllowedRecipes } from './item.js';
import { normalizeNovaConfigTopLevelOrder } from './nova-config-order.js';
import { Runner as LibNovaConfig } from './nova-config.js';
import {
  LIB_REGEX_PATTERN_NON_ALPHANUMERIC_RUN,
  LIB_REGEX_PATTERN_SLUG_SIMPLE,
  LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
  LIB_REGEX_PLACEHOLDER_WORKSPACE_IDENTIFIER,
  LIB_REGEX_PLACEHOLDER_WORKSPACE_NAME,
  LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
  LIB_REGEX_PLACEHOLDER_WORKSPACE_RELATIVE_PATH,
  LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
  LIB_REGEX_PLACEHOLDER_WORKSPACE_VERSION,
} from './regex.js';
import {
  mergeScaffoldAllowScripts,
  resolveScaffoldAllowScripts,
} from './scaffold-allow-scripts.js';
import {
  confirmScaffoldPlan,
  createScaffoldProgress,
  reportScaffoldCompletion,
  reportScaffoldPlan,
  resolveDisplayPath,
  resolveScaffoldInstall,
} from './scaffold-presentation.js';
import {
  applyScaffoldVersionReplacements,
  getScaffoldVersion,
} from './scaffold-versions.js';
import {
  discoverPathsWithFile,
  isPlainObject,
  pathExists,
  resolveTemplatePath,
  saveGeneratedFile,
} from './utility.js';
import { Runner as LibVersionContract } from './version-contract.js';

import type {
  Lib_Scaffold_ApplyTemplateReplacements_Input,
  Lib_Scaffold_ApplyTemplateReplacements_Output,
  Lib_Scaffold_ApplyTemplateReplacements_Pattern,
  Lib_Scaffold_ApplyTemplateReplacements_Replacements,
  Lib_Scaffold_ApplyTemplateReplacements_Returns,
  Lib_Scaffold_ApplyTemplateReplacements_Value,
  Lib_Scaffold_CollectFiles_Directory,
  Lib_Scaffold_CollectFiles_Entries,
  Lib_Scaffold_CollectFiles_EntryPath,
  Lib_Scaffold_CollectFiles_Files,
  Lib_Scaffold_CollectFiles_Prefix,
  Lib_Scaffold_CollectFiles_Returns,
  Lib_Scaffold_CreateMonorepoRoot_AllowScripts,
  Lib_Scaffold_CreateMonorepoRoot_AppsDirectory,
  Lib_Scaffold_CreateMonorepoRoot_NovaConfigContent,
  Lib_Scaffold_CreateMonorepoRoot_NovaConfigPath,
  Lib_Scaffold_CreateMonorepoRoot_OutputDirectory,
  Lib_Scaffold_CreateMonorepoRoot_PackageJsonContent,
  Lib_Scaffold_CreateMonorepoRoot_PackageJsonPath,
  Lib_Scaffold_CreateMonorepoRoot_PackagesDirectory,
  Lib_Scaffold_CreateMonorepoRoot_Platforms,
  Lib_Scaffold_CreateMonorepoRoot_ProjectSlug,
  Lib_Scaffold_CreateMonorepoRoot_ProjectTitle,
  Lib_Scaffold_CreateMonorepoRoot_Replacements,
  Lib_Scaffold_CreateMonorepoRoot_Returns,
  Lib_Scaffold_CreateMonorepoRoot_RootTemplateDirectory,
  Lib_Scaffold_CreateWorkspaceDirectory_BasePath,
  Lib_Scaffold_CreateWorkspaceDirectory_Returns,
  Lib_Scaffold_CreateWorkspaceDirectory_WorkspaceDirectory,
  Lib_Scaffold_CreateWorkspaceDirectory_WorkspaceName,
  Lib_Scaffold_DetectMonorepoContext_CurrentWorkingDirectory,
  Lib_Scaffold_DetectMonorepoContext_Locations,
  Lib_Scaffold_DetectMonorepoContext_PackageJsonPath,
  Lib_Scaffold_DetectMonorepoContext_PackageJsonRaw,
  Lib_Scaffold_DetectMonorepoContext_ParsedPackageJson,
  Lib_Scaffold_DetectMonorepoContext_Returns,
  Lib_Scaffold_FindFileConflicts_Exists,
  Lib_Scaffold_FindFileConflicts_PlannedPaths,
  Lib_Scaffold_FindFileConflicts_Returns,
  Lib_Scaffold_GetMonorepoRootPlannedPaths_OutputDirectory,
  Lib_Scaffold_GetMonorepoRootPlannedPaths_Returns,
  Lib_Scaffold_GetMonorepoRootPlannedPaths_TemplateDirectory,
  Lib_Scaffold_GetMonorepoRootPlannedPaths_TemplateEntries,
  Lib_Scaffold_InstallScaffoldDependencies_Command,
  Lib_Scaffold_InstallScaffoldDependencies_CommandArguments,
  Lib_Scaffold_InstallScaffoldDependencies_Executor,
  Lib_Scaffold_InstallScaffoldDependencies_Executor_AppendOutput,
  Lib_Scaffold_InstallScaffoldDependencies_Executor_ChildProcess,
  Lib_Scaffold_InstallScaffoldDependencies_Executor_HandleClose,
  Lib_Scaffold_InstallScaffoldDependencies_Executor_HandleError,
  Lib_Scaffold_InstallScaffoldDependencies_Invocation,
  Lib_Scaffold_InstallScaffoldDependencies_Output,
  Lib_Scaffold_InstallScaffoldDependencies_PackageManager,
  Lib_Scaffold_InstallScaffoldDependencies_Returns,
  Lib_Scaffold_InstallScaffoldDependencies_RootDirectory,
  Lib_Scaffold_InstallScaffoldDependencies_SpawnInvocation,
  Lib_Scaffold_IsWindowsReservedPathSegment_BaseName,
  Lib_Scaffold_IsWindowsReservedPathSegment_DeviceNumber,
  Lib_Scaffold_IsWindowsReservedPathSegment_DevicePrefix,
  Lib_Scaffold_IsWindowsReservedPathSegment_NormalizedPath,
  Lib_Scaffold_IsWindowsReservedPathSegment_NormalizedSegment,
  Lib_Scaffold_IsWindowsReservedPathSegment_Returns,
  Lib_Scaffold_IsWindowsReservedPathSegment_Segments,
  Lib_Scaffold_IsWindowsReservedPathSegment_SegmentWithoutStream,
  Lib_Scaffold_IsWindowsReservedPathSegment_Value,
  Lib_Scaffold_LoadExistingRoot_Config,
  Lib_Scaffold_LoadExistingRoot_ConfigFilePath,
  Lib_Scaffold_LoadExistingRoot_ConfigRaw,
  Lib_Scaffold_LoadExistingRoot_ConfigWorkspaces,
  Lib_Scaffold_LoadExistingRoot_ConfigWorkspacesValue,
  Lib_Scaffold_LoadExistingRoot_PackageJson,
  Lib_Scaffold_LoadExistingRoot_PackageJsonPath,
  Lib_Scaffold_LoadExistingRoot_PackageJsonRaw,
  Lib_Scaffold_LoadExistingRoot_ParsedConfig,
  Lib_Scaffold_LoadExistingRoot_ParsedPackageJson,
  Lib_Scaffold_LoadExistingRoot_Project,
  Lib_Scaffold_LoadExistingRoot_ProjectName,
  Lib_Scaffold_LoadExistingRoot_ProjectNameValue,
  Lib_Scaffold_LoadExistingRoot_ProjectSlug,
  Lib_Scaffold_LoadExistingRoot_ProjectSlugValue,
  Lib_Scaffold_LoadExistingRoot_ProjectValue,
  Lib_Scaffold_LoadExistingRoot_Returns,
  Lib_Scaffold_LoadExistingRoot_RootDirectory,
  Lib_Scaffold_LoadExistingRoot_WorkspacePatterns,
  Lib_Scaffold_LoadExistingRoot_WorkspacePatternsResolved,
  Lib_Scaffold_LoadExistingRoot_WorkspacePatternsValue,
  Lib_Scaffold_LoadExistingRoot_WorkspacesObject,
  Lib_Scaffold_LoadExistingRoot_WorkspacesValue,
  Lib_Scaffold_NormalizeWorkspaceRelativePath_NormalizedPath,
  Lib_Scaffold_NormalizeWorkspaceRelativePath_RelativePath,
  Lib_Scaffold_NormalizeWorkspaceRelativePath_Returns,
  Lib_Scaffold_NormalizeWorkspaceRelativePath_RootDirectory,
  Lib_Scaffold_NormalizeWorkspaceRelativePath_WorkspaceDirectory,
  Lib_Scaffold_PromptScaffoldOptions_Cancelled,
  Lib_Scaffold_PromptScaffoldOptions_Context,
  Lib_Scaffold_PromptScaffoldOptions_CurrentDirectory,
  Lib_Scaffold_PromptScaffoldOptions_Defaults,
  Lib_Scaffold_PromptScaffoldOptions_InitialAnswers,
  Lib_Scaffold_PromptScaffoldOptions_InitialPrev,
  Lib_Scaffold_PromptScaffoldOptions_MonorepoNameValue,
  Lib_Scaffold_PromptScaffoldOptions_MonorepoOutputValue,
  Lib_Scaffold_PromptScaffoldOptions_MonorepoPromptsAnswers,
  Lib_Scaffold_PromptScaffoldOptions_MonorepoQuestions,
  Lib_Scaffold_PromptScaffoldOptions_MonorepoResolvedName,
  Lib_Scaffold_PromptScaffoldOptions_MonorepoResolvedWorkspaceName,
  Lib_Scaffold_PromptScaffoldOptions_MonorepoWorkspaceNameValue,
  Lib_Scaffold_PromptScaffoldOptions_NameValue,
  Lib_Scaffold_PromptScaffoldOptions_OutputValue,
  Lib_Scaffold_PromptScaffoldOptions_PromptsAnswers,
  Lib_Scaffold_PromptScaffoldOptions_Questions,
  Lib_Scaffold_PromptScaffoldOptions_ResolvedName,
  Lib_Scaffold_PromptScaffoldOptions_ResolvedOutput,
  Lib_Scaffold_PromptScaffoldOptions_ResolvedOutputDirectory,
  Lib_Scaffold_PromptScaffoldOptions_ResolvedWorkspaceName,
  Lib_Scaffold_PromptScaffoldOptions_ResolveInitialOutput,
  Lib_Scaffold_PromptScaffoldOptions_ResolveInitialOutput_ResolvedInitialWorkspaceName,
  Lib_Scaffold_PromptScaffoldOptions_ResolveInitialOutput_Returns,
  Lib_Scaffold_PromptScaffoldOptions_Returns,
  Lib_Scaffold_PromptScaffoldOptions_WorkspaceNameValue,
  Lib_Scaffold_RegisterWorkspaceInConfig_AssetsignoreConfigPath,
  Lib_Scaffold_RegisterWorkspaceInConfig_AssetsignorePath,
  Lib_Scaffold_RegisterWorkspaceInConfig_Category,
  Lib_Scaffold_RegisterWorkspaceInConfig_ConfigFilePath,
  Lib_Scaffold_RegisterWorkspaceInConfig_ConfigName,
  Lib_Scaffold_RegisterWorkspaceInConfig_ConfigRoot,
  Lib_Scaffold_RegisterWorkspaceInConfig_DockerignoreConfigPath,
  Lib_Scaffold_RegisterWorkspaceInConfig_DockerignorePath,
  Lib_Scaffold_RegisterWorkspaceInConfig_DocumentationUrl,
  Lib_Scaffold_RegisterWorkspaceInConfig_Environment,
  Lib_Scaffold_RegisterWorkspaceInConfig_EnvironmentVariables,
  Lib_Scaffold_RegisterWorkspaceInConfig_EnvironmentWorkspace,
  Lib_Scaffold_RegisterWorkspaceInConfig_EnvironmentWorkspaces,
  Lib_Scaffold_RegisterWorkspaceInConfig_IgnoreFiles,
  Lib_Scaffold_RegisterWorkspaceInConfig_NormalizedConfig,
  Lib_Scaffold_RegisterWorkspaceInConfig_PackageJsonRecipes,
  Lib_Scaffold_RegisterWorkspaceInConfig_ParsedConfig,
  Lib_Scaffold_RegisterWorkspaceInConfig_ParsedEnvironment,
  Lib_Scaffold_RegisterWorkspaceInConfig_ParsedEnvironmentWorkspaces,
  Lib_Scaffold_RegisterWorkspaceInConfig_ParsedIgnoreFiles,
  Lib_Scaffold_RegisterWorkspaceInConfig_ParsedPackageJsonRecipes,
  Lib_Scaffold_RegisterWorkspaceInConfig_ParsedPlatforms,
  Lib_Scaffold_RegisterWorkspaceInConfig_ParsedRecipes,
  Lib_Scaffold_RegisterWorkspaceInConfig_ParsedUrls,
  Lib_Scaffold_RegisterWorkspaceInConfig_ParsedWorkspaces,
  Lib_Scaffold_RegisterWorkspaceInConfig_Platforms,
  Lib_Scaffold_RegisterWorkspaceInConfig_PlatformsMerged,
  Lib_Scaffold_RegisterWorkspaceInConfig_Policy,
  Lib_Scaffold_RegisterWorkspaceInConfig_Project,
  Lib_Scaffold_RegisterWorkspaceInConfig_ProjectName,
  Lib_Scaffold_RegisterWorkspaceInConfig_ProjectSlug,
  Lib_Scaffold_RegisterWorkspaceInConfig_Raw,
  Lib_Scaffold_RegisterWorkspaceInConfig_Recipes,
  Lib_Scaffold_RegisterWorkspaceInConfig_Returns,
  Lib_Scaffold_RegisterWorkspaceInConfig_Role,
  Lib_Scaffold_RegisterWorkspaceInConfig_Urls,
  Lib_Scaffold_RegisterWorkspaceInConfig_WorkspaceDirectory,
  Lib_Scaffold_RegisterWorkspaceInConfig_WorkspaceName,
  Lib_Scaffold_RegisterWorkspaceInConfig_WorkspacePackageName,
  Lib_Scaffold_RegisterWorkspaceInConfig_WorkspaceRelPath,
  Lib_Scaffold_RegisterWorkspaceInConfig_Workspaces,
  Lib_Scaffold_ReportError_Message,
  Lib_Scaffold_ReportError_Returns,
  Lib_Scaffold_ResolveMonorepoRootTemplateDirectory_CurrentDirectory,
  Lib_Scaffold_ResolveMonorepoRootTemplateDirectory_Returns,
  Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_BasePrefix,
  Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_Candidate,
  Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_CandidateIndex,
  Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_Entry,
  Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_EntryValues,
  Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_Environment,
  Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_ExistingPrefixes,
  Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_HasConflict,
  Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_PrefixValue,
  Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_Returns,
  Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_Scope,
  Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_ScopeValue,
  Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_WorkspaceName,
  Lib_Scaffold_ResolveScaffoldGitignoreEntry_Bundles,
  Lib_Scaffold_ResolveScaffoldGitignoreEntry_BundlesValue,
  Lib_Scaffold_ResolveScaffoldGitignoreEntry_Config,
  Lib_Scaffold_ResolveScaffoldGitignoreEntry_Entry,
  Lib_Scaffold_ResolveScaffoldGitignoreEntry_EntryValue,
  Lib_Scaffold_ResolveScaffoldGitignoreEntry_IgnoreFiles,
  Lib_Scaffold_ResolveScaffoldGitignoreEntry_IgnoreFilesValue,
  Lib_Scaffold_ResolveScaffoldGitignoreEntry_Patterns,
  Lib_Scaffold_ResolveScaffoldGitignoreEntry_PatternsValue,
  Lib_Scaffold_ResolveScaffoldGitignoreEntry_Returns,
  Lib_Scaffold_ResolveScaffoldInstallInvocation_Command,
  Lib_Scaffold_ResolveScaffoldInstallInvocation_CommandArguments,
  Lib_Scaffold_ResolveScaffoldInstallInvocation_PackageManager,
  Lib_Scaffold_ResolveScaffoldInstallInvocation_Returns,
  Lib_Scaffold_ResolveScaffoldPackageJsonRecipes_Recipe,
  Lib_Scaffold_ResolveScaffoldPackageJsonRecipes_Recipes,
  Lib_Scaffold_ResolveScaffoldPackageJsonRecipes_Returns,
  Lib_Scaffold_ResolveScaffoldPolicy_Category,
  Lib_Scaffold_ResolveScaffoldPolicy_Returns,
  Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Config,
  Lib_Scaffold_ResolveScaffoldWorkspaceVersion_ConfigRoot,
  Lib_Scaffold_ResolveScaffoldWorkspaceVersion_CurrentVersion,
  Lib_Scaffold_ResolveScaffoldWorkspaceVersion_ExistingRoot,
  Lib_Scaffold_ResolveScaffoldWorkspaceVersion_LockStepVersioning,
  Lib_Scaffold_ResolveScaffoldWorkspaceVersion_PackageJson,
  Lib_Scaffold_ResolveScaffoldWorkspaceVersion_PackageJsonPath,
  Lib_Scaffold_ResolveScaffoldWorkspaceVersion_PackageJsonRaw,
  Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Policy,
  Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Returns,
  Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Settings,
  Lib_Scaffold_ResolveScaffoldWorkspaceVersion_SettingsValue,
  Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Strategy,
  Lib_Scaffold_ResolveScaffoldWorkspaceVersion_StrategyValue,
  Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Versions,
  Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Workspace,
  Lib_Scaffold_ResolveScaffoldWorkspaceVersion_WorkspaceConfig,
  Lib_Scaffold_ResolveScaffoldWorkspaceVersion_WorkspacePath,
  Lib_Scaffold_ResolveTemplateAnswers_Answer,
  Lib_Scaffold_ResolveTemplateAnswers_Answers,
  Lib_Scaffold_ResolveTemplateAnswers_DependencyValue,
  Lib_Scaffold_ResolveTemplateAnswers_FlagValue,
  Lib_Scaffold_ResolveTemplateAnswers_InactiveAllowedValues,
  Lib_Scaffold_ResolveTemplateAnswers_InactiveDefaultChoice,
  Lib_Scaffold_ResolveTemplateAnswers_InactiveDefaultChoiceDefinition,
  Lib_Scaffold_ResolveTemplateAnswers_IsActive,
  Lib_Scaffold_ResolveTemplateAnswers_IsNonInteractive,
  Lib_Scaffold_ResolveTemplateAnswers_NonInteractiveDefaultChoice,
  Lib_Scaffold_ResolveTemplateAnswers_Options,
  Lib_Scaffold_ResolveTemplateAnswers_ProvidedAllowedValues,
  Lib_Scaffold_ResolveTemplateAnswers_ProvidedValue,
  Lib_Scaffold_ResolveTemplateAnswers_Questions,
  Lib_Scaffold_ResolveTemplateAnswers_Replacements,
  Lib_Scaffold_ResolveTemplateAnswers_ReplacementValue,
  Lib_Scaffold_ResolveTemplateAnswers_ResolvedAllowedValues,
  Lib_Scaffold_ResolveTemplateAnswers_ResolvedAnswers,
  Lib_Scaffold_ResolveTemplateAnswers_ResolvedChoiceDefinition,
  Lib_Scaffold_ResolveTemplateAnswers_ResolvedValue,
  Lib_Scaffold_ResolveTemplateAnswers_Returns,
  Lib_Scaffold_ResolveWorkspacePackageName_Category,
  Lib_Scaffold_ResolveWorkspacePackageName_ProjectSlug,
  Lib_Scaffold_ResolveWorkspacePackageName_Returns,
  Lib_Scaffold_ResolveWorkspacePackageName_WorkspaceName,
  Lib_Scaffold_RunScaffold_AllowScriptProfiles,
  Lib_Scaffold_RunScaffold_AllowScripts,
  Lib_Scaffold_RunScaffold_Config,
  Lib_Scaffold_RunScaffold_ConfigFilePath,
  Lib_Scaffold_RunScaffold_ConfigNameDefault,
  Lib_Scaffold_RunScaffold_ConfigRoot,
  Lib_Scaffold_RunScaffold_Confirmed,
  Lib_Scaffold_RunScaffold_ConflictingPaths,
  Lib_Scaffold_RunScaffold_ConflictMessage,
  Lib_Scaffold_RunScaffold_Context,
  Lib_Scaffold_RunScaffold_CoreReplacements,
  Lib_Scaffold_RunScaffold_CurrentDirectory,
  Lib_Scaffold_RunScaffold_Definition,
  Lib_Scaffold_RunScaffold_Destination,
  Lib_Scaffold_RunScaffold_Environment,
  Lib_Scaffold_RunScaffold_EnvironmentVariables,
  Lib_Scaffold_RunScaffold_ErrorMessage,
  Lib_Scaffold_RunScaffold_ExistingRoot,
  Lib_Scaffold_RunScaffold_ExistingRootPackageJsonChanged,
  Lib_Scaffold_RunScaffold_ExistingWorkspace,
  Lib_Scaffold_RunScaffold_ExistingWorkspaceEntries,
  Lib_Scaffold_RunScaffold_ExistingWorkspaceName,
  Lib_Scaffold_RunScaffold_ExistingWorkspaceNormalizedPath,
  Lib_Scaffold_RunScaffold_ExistingWorkspacePath,
  Lib_Scaffold_RunScaffold_ExistingWorkspaceRole,
  Lib_Scaffold_RunScaffold_ExistingWorkspaceValue,
  Lib_Scaffold_RunScaffold_InstallOutput,
  Lib_Scaffold_RunScaffold_InstallResult,
  Lib_Scaffold_RunScaffold_InstallSucceeded,
  Lib_Scaffold_RunScaffold_IsDryRun,
  Lib_Scaffold_RunScaffold_IsNonInteractive,
  Lib_Scaffold_RunScaffold_IsWorkspaceCovered,
  Lib_Scaffold_RunScaffold_NormalizedWorkspacePattern,
  Lib_Scaffold_RunScaffold_NormalizedWorkspaceRelPath,
  Lib_Scaffold_RunScaffold_Options,
  Lib_Scaffold_RunScaffold_OutputRelativePath,
  Lib_Scaffold_RunScaffold_PackageManager,
  Lib_Scaffold_RunScaffold_PackageManagerDescriptor,
  Lib_Scaffold_RunScaffold_PackageManagerValue,
  Lib_Scaffold_RunScaffold_PlannedPaths,
  Lib_Scaffold_RunScaffold_Platforms,
  Lib_Scaffold_RunScaffold_PresentationOptions,
  Lib_Scaffold_RunScaffold_PrimaryScript,
  Lib_Scaffold_RunScaffold_ProfilesEnabled,
  Lib_Scaffold_RunScaffold_Progress,
  Lib_Scaffold_RunScaffold_ProgressTotal,
  Lib_Scaffold_RunScaffold_ProjectFinalizerError,
  Lib_Scaffold_RunScaffold_ProjectRoot,
  Lib_Scaffold_RunScaffold_ProjectSlug,
  Lib_Scaffold_RunScaffold_RegisteredConfig,
  Lib_Scaffold_RunScaffold_ReplacementResolution,
  Lib_Scaffold_RunScaffold_Replacements,
  Lib_Scaffold_RunScaffold_ResolvedReplacements,
  Lib_Scaffold_RunScaffold_Returns,
  Lib_Scaffold_RunScaffold_RootGitignorePath,
  Lib_Scaffold_RunScaffold_RootPackageJsonContents,
  Lib_Scaffold_RunScaffold_RootPackageJsonPath,
  Lib_Scaffold_RunScaffold_RootPlannedPathGroups,
  Lib_Scaffold_RunScaffold_RootTemplateDirectories,
  Lib_Scaffold_RunScaffold_RootTemplateEntries,
  Lib_Scaffold_RunScaffold_RootTemplateSubpaths,
  Lib_Scaffold_RunScaffold_RootTemplateWrites,
  Lib_Scaffold_RunScaffold_RootWorkspacesObject,
  Lib_Scaffold_RunScaffold_RootWorkspacesValue,
  Lib_Scaffold_RunScaffold_ScaffoldGitignoreEntry,
  Lib_Scaffold_RunScaffold_ShouldCreateRootGitignore,
  Lib_Scaffold_RunScaffold_ShouldInstall,
  Lib_Scaffold_RunScaffold_TemplateAnswers,
  Lib_Scaffold_RunScaffold_TemplateEntries,
  Lib_Scaffold_RunScaffold_TemplateReplacements,
  Lib_Scaffold_RunScaffold_TemplateResolution,
  Lib_Scaffold_RunScaffold_TemplateValidationError,
  Lib_Scaffold_RunScaffold_WorkspaceBaseDirectory,
  Lib_Scaffold_RunScaffold_WorkspaceDirectory,
  Lib_Scaffold_RunScaffold_WorkspaceFinalizerError,
  Lib_Scaffold_RunScaffold_WorkspaceIdentifier,
  Lib_Scaffold_RunScaffold_WorkspaceNameSegments,
  Lib_Scaffold_RunScaffold_WorkspacePackageName,
  Lib_Scaffold_RunScaffold_WorkspacePackageNameBase,
  Lib_Scaffold_RunScaffold_WorkspacePackageNamePrefix,
  Lib_Scaffold_RunScaffold_WorkspacePlannedPathGroups,
  Lib_Scaffold_RunScaffold_WorkspacePolicy,
  Lib_Scaffold_RunScaffold_WorkspaceRelPath,
  Lib_Scaffold_RunScaffold_WorkspaceTemplateDirectories,
  Lib_Scaffold_RunScaffold_WorkspaceTemplateSubpaths,
  Lib_Scaffold_RunScaffold_WorkspaceTemplateWrites,
  Lib_Scaffold_RunScaffold_WorkspaceTitle,
  Lib_Scaffold_RunScaffold_WorkspaceVersion,
  Lib_Scaffold_UpdateScaffoldPackageJson_Content,
  Lib_Scaffold_UpdateScaffoldPackageJson_IsSortedSection,
  Lib_Scaffold_UpdateScaffoldPackageJson_OrderedScriptEntries,
  Lib_Scaffold_UpdateScaffoldPackageJson_PackageJson,
  Lib_Scaffold_UpdateScaffoldPackageJson_PackageJsonPath,
  Lib_Scaffold_UpdateScaffoldPackageJson_Parsed,
  Lib_Scaffold_UpdateScaffoldPackageJson_Raw,
  Lib_Scaffold_UpdateScaffoldPackageJson_Returns,
  Lib_Scaffold_UpdateScaffoldPackageJson_Section,
  Lib_Scaffold_UpdateScaffoldPackageJson_SectionEntries,
  Lib_Scaffold_UpdateScaffoldPackageJson_SectionOutput,
  Lib_Scaffold_UpdateScaffoldPackageJson_SectionValue,
  Lib_Scaffold_UpdateScaffoldPackageJson_Updates,
  Lib_Scaffold_UpdateScaffoldPackageJson_UsedScriptKeys,
  Lib_Scaffold_UpdateScaffoldPackageJson_WorkspaceDirectory,
  Lib_Scaffold_WriteScaffoldGitignore_Content,
  Lib_Scaffold_WriteScaffoldGitignore_Entry,
  Lib_Scaffold_WriteScaffoldGitignore_Returns,
  Lib_Scaffold_WriteScaffoldGitignore_RootDirectory,
  Lib_Scaffold_WriteScaffoldGitignore_TargetPath,
  Lib_Scaffold_WriteTemplateFiles_Content,
  Lib_Scaffold_WriteTemplateFiles_Entries,
  Lib_Scaffold_WriteTemplateFiles_IsBinary,
  Lib_Scaffold_WriteTemplateFiles_Replacements,
  Lib_Scaffold_WriteTemplateFiles_Returns,
  Lib_Scaffold_WriteTemplateFiles_SourceContent,
  Lib_Scaffold_WriteTemplateFiles_SourcePath,
  Lib_Scaffold_WriteTemplateFiles_SourceStats,
  Lib_Scaffold_WriteTemplateFiles_TargetDirectory,
  Lib_Scaffold_WriteTemplateFiles_TargetEntry,
  Lib_Scaffold_WriteTemplateFiles_TargetPath,
  Lib_Scaffold_WriteTemplateFiles_TemplateDirectory,
} from '../types/lib/scaffold.d.ts';

/**
 * Lib - Scaffold - Apply Template Replacements.
 *
 * Applies the scaffold replacement map to either template contents or a
 * template-relative path so generated files can use workspace-specific names.
 *
 * @param {Lib_Scaffold_ApplyTemplateReplacements_Input}        input        - Input.
 * @param {Lib_Scaffold_ApplyTemplateReplacements_Replacements} replacements - Replacements.
 *
 * @returns {Lib_Scaffold_ApplyTemplateReplacements_Returns}
 *
 * @since 0.29.0
 */
function applyTemplateReplacements(input: Lib_Scaffold_ApplyTemplateReplacements_Input, replacements: Lib_Scaffold_ApplyTemplateReplacements_Replacements): Lib_Scaffold_ApplyTemplateReplacements_Returns {
  let output: Lib_Scaffold_ApplyTemplateReplacements_Output = applyScaffoldVersionReplacements(input);

  for (const replacement of replacements) {
    const pattern: Lib_Scaffold_ApplyTemplateReplacements_Pattern = replacement[0];
    const value: Lib_Scaffold_ApplyTemplateReplacements_Value = replacement[1];

    output = output.replace(new RegExp(pattern.source, 'g'), value);
  }

  return output;
}

/**
 * Lib - Scaffold - Report Error.
 *
 * Emits one consistent scaffold validation error and marks the command as
 * unsuccessful before returning control to the caller.
 *
 * @param {Lib_Scaffold_ReportError_Message} message - Message.
 *
 * @returns {Lib_Scaffold_ReportError_Returns}
 *
 * @since 0.26.0
 */
function reportError(message: Lib_Scaffold_ReportError_Message): Lib_Scaffold_ReportError_Returns {
  Logger.customize({
    name: 'CliScaffold.run',
    purpose: 'validate',
  }).error(message);

  process.exitCode = 1;

  return;
}

/**
 * Lib - Scaffold - Resolve Scaffold Install Invocation.
 *
 * Selects npm directly while routing pnpm and Yarn through Corepack.
 * Keeps the displayed package manager and executed client in lockstep.
 *
 * @param {Lib_Scaffold_ResolveScaffoldInstallInvocation_PackageManager} packageManager - Package manager.
 *
 * @returns {Lib_Scaffold_ResolveScaffoldInstallInvocation_Returns}
 *
 * @since 0.31.0
 */
export function resolveScaffoldInstallInvocation(packageManager: Lib_Scaffold_ResolveScaffoldInstallInvocation_PackageManager): Lib_Scaffold_ResolveScaffoldInstallInvocation_Returns {
  const command: Lib_Scaffold_ResolveScaffoldInstallInvocation_Command = (packageManager === 'npm') ? 'npm' : 'corepack';
  const commandArguments: Lib_Scaffold_ResolveScaffoldInstallInvocation_CommandArguments = (packageManager === 'npm') ? ['install'] : [
    packageManager,
    'install',
  ];

  return {
    command,
    commandArguments,
  };
}

/**
 * Lib - Scaffold - Install Scaffold Dependencies.
 *
 * Installs the generated monorepo with the exact Corepack manager from package.json.
 * Output stays attached so warnings and lifecycle failures remain visible.
 *
 * @param {Lib_Scaffold_InstallScaffoldDependencies_RootDirectory}  rootDirectory  - Root directory.
 * @param {Lib_Scaffold_InstallScaffoldDependencies_PackageManager} packageManager - Package manager.
 *
 * @returns {Lib_Scaffold_InstallScaffoldDependencies_Returns}
 *
 * @since 0.31.0
 */
export async function installScaffoldDependencies(rootDirectory: Lib_Scaffold_InstallScaffoldDependencies_RootDirectory, packageManager: Lib_Scaffold_InstallScaffoldDependencies_PackageManager): Lib_Scaffold_InstallScaffoldDependencies_Returns {
  const invocation: Lib_Scaffold_InstallScaffoldDependencies_Invocation = resolveScaffoldInstallInvocation(packageManager);
  const spawnInvocation: Lib_Scaffold_InstallScaffoldDependencies_SpawnInvocation = LibCorepack.resolveSpawnInvocation(invocation['command'], invocation['commandArguments']);
  const command: Lib_Scaffold_InstallScaffoldDependencies_Command = spawnInvocation['command'];
  const commandArguments: Lib_Scaffold_InstallScaffoldDependencies_CommandArguments = spawnInvocation['commandArguments'];
  let output: Lib_Scaffold_InstallScaffoldDependencies_Output = '';

  /**
   * Lib - Scaffold - Install Scaffold Dependencies - Executor.
   *
   * Starts the selected package manager without a shell and captures its output.
   * Resolves the installation result after the child process exits or fails to start.
   *
   * @param {Lib_Scaffold_InstallScaffoldDependencies_Executor_PromiseResolve} promiseResolve - Promise resolve.
   *
   * @private
   *
   * @returns {Lib_Scaffold_InstallScaffoldDependencies_Executor_Returns}
   *
   * @since 0.31.0
   */
  const executor: Lib_Scaffold_InstallScaffoldDependencies_Executor = (promiseResolve) => {
    const childProcess: Lib_Scaffold_InstallScaffoldDependencies_Executor_ChildProcess = spawn(command, commandArguments, {
      cwd: rootDirectory,
      env: {
        ...process.env,
        COREPACK_ENABLE_STRICT: '0',
      },
      stdio: [
        'inherit',
        'pipe',
        'pipe',
      ],
    });

    /**
     * Lib - Scaffold - Install Scaffold Dependencies - Append Output.
     *
     * Collects package-manager output so successful installs stay quiet and
     * failed installs can replay the complete diagnostic stream.
     *
     * @param {Lib_Scaffold_InstallScaffoldDependencies_Executor_AppendOutput_Chunk} chunk - Chunk.
     *
     * @private
     *
     * @returns {Lib_Scaffold_InstallScaffoldDependencies_Executor_AppendOutput_Returns}
     *
     * @since 0.31.0
     */
    const appendOutput: Lib_Scaffold_InstallScaffoldDependencies_Executor_AppendOutput = (chunk) => {
      output += String(chunk);

      return;
    };

    /**
     * Lib - Scaffold - Install Scaffold Dependencies - Handle Close.
     *
     * Converts the package-manager exit code into the scaffold success result.
     * Only a normal zero exit code is treated as a completed installation.
     *
     * @param {Lib_Scaffold_InstallScaffoldDependencies_Executor_HandleClose_Code} code - Code.
     *
     * @private
     *
     * @returns {Lib_Scaffold_InstallScaffoldDependencies_Executor_HandleClose_Returns}
     *
     * @since 0.31.0
     */
    const handleClose: Lib_Scaffold_InstallScaffoldDependencies_Executor_HandleClose = (code) => {
      promiseResolve({
        output,
        succeeded: code === 0,
      });

      return;
    };

    /**
     * Lib - Scaffold - Install Scaffold Dependencies - Handle Error.
     *
     * Records child-process startup failures for debug output.
     * Resolves the installation as unsuccessful without throwing.
     *
     * @param {Lib_Scaffold_InstallScaffoldDependencies_Executor_HandleError_Error} error - Error.
     *
     * @private
     *
     * @returns {Lib_Scaffold_InstallScaffoldDependencies_Executor_HandleError_Returns}
     *
     * @since 0.31.0
     */
    const handleError: Lib_Scaffold_InstallScaffoldDependencies_Executor_HandleError = (error) => {
      Logger.customize({
        name: 'installScaffoldDependencies',
        purpose: 'spawn',
      }).debug(error);

      output += `${error.message}\n`;

      promiseResolve({
        output,
        succeeded: false,
      });

      return;
    };

    if (childProcess.stdout !== null) {
      childProcess.stdout.setEncoding('utf-8');

      childProcess.stdout.on('data', appendOutput);
    }

    if (childProcess.stderr !== null) {
      childProcess.stderr.setEncoding('utf-8');

      childProcess.stderr.on('data', appendOutput);
    }

    childProcess.once('error', handleError);
    childProcess.once('close', handleClose);

    return;
  };

  return new Promise(executor);
}

/**
 * Lib - Scaffold - Is Windows Reserved Path Segment.
 *
 * Detects DOS device names that Windows reserves in every path segment,
 * including names with extensions, alternate data streams, or ignored trailing
 * spaces and periods.
 *
 * @param {Lib_Scaffold_IsWindowsReservedPathSegment_Value} value - Value.
 *
 * @returns {Lib_Scaffold_IsWindowsReservedPathSegment_Returns}
 *
 * @since 0.34.0
 */
export function isWindowsReservedPathSegment(value: Lib_Scaffold_IsWindowsReservedPathSegment_Value): Lib_Scaffold_IsWindowsReservedPathSegment_Returns {
  const normalizedPath: Lib_Scaffold_IsWindowsReservedPathSegment_NormalizedPath = value.replaceAll('\\', '/');
  const segments: Lib_Scaffold_IsWindowsReservedPathSegment_Segments = normalizedPath.split('/');

  for (const segment of segments) {
    let normalizedSegment: Lib_Scaffold_IsWindowsReservedPathSegment_NormalizedSegment = segment;

    while (
      normalizedSegment.endsWith('.') === true
      || normalizedSegment.endsWith(' ') === true
    ) {
      normalizedSegment = normalizedSegment.slice(0, -1);
    }

    const segmentWithoutStream: Lib_Scaffold_IsWindowsReservedPathSegment_SegmentWithoutStream = normalizedSegment.split(':')[0] ?? '';
    const baseName: Lib_Scaffold_IsWindowsReservedPathSegment_BaseName = (segmentWithoutStream.split('.')[0] ?? '').trimEnd().toUpperCase();

    if (
      baseName === 'CON'
      || baseName === 'PRN'
      || baseName === 'AUX'
      || baseName === 'NUL'
    ) {
      return true;
    }

    const devicePrefix: Lib_Scaffold_IsWindowsReservedPathSegment_DevicePrefix = baseName.slice(0, 3);
    const deviceNumber: Lib_Scaffold_IsWindowsReservedPathSegment_DeviceNumber = baseName.slice(3);

    if (
      devicePrefix !== 'COM'
      && devicePrefix !== 'LPT'
    ) {
      continue;
    }

    if (
      deviceNumber.length === 1
      && deviceNumber >= '1'
      && deviceNumber <= '9'
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Lib - Scaffold - Resolve Workspace Package Name.
 *
 * Applies Nova's role-based naming contract to app, documentation, package,
 * and tool workspaces. The result is shared by package.json and nova.config.json.
 *
 * @param {Lib_Scaffold_ResolveWorkspacePackageName_ProjectSlug}   projectSlug   - Project slug.
 * @param {Lib_Scaffold_ResolveWorkspacePackageName_WorkspaceName} workspaceName - Workspace name.
 * @param {Lib_Scaffold_ResolveWorkspacePackageName_Category}      category      - Category.
 *
 * @returns {Lib_Scaffold_ResolveWorkspacePackageName_Returns}
 *
 * @since 0.26.0
 */
export function resolveWorkspacePackageName(projectSlug: Lib_Scaffold_ResolveWorkspacePackageName_ProjectSlug, workspaceName: Lib_Scaffold_ResolveWorkspacePackageName_WorkspaceName, category: Lib_Scaffold_ResolveWorkspacePackageName_Category): Lib_Scaffold_ResolveWorkspacePackageName_Returns {
  if (category === 'package') {
    return workspaceName;
  }

  if (category === 'tool') {
    return `${projectSlug}-tool-${workspaceName}`;
  }

  return (category === 'docs') ? `${projectSlug}-docs` : `${projectSlug}-app-${workspaceName}`;
}

/**
 * Lib - Scaffold - Normalize Workspace Relative Path.
 *
 * Converts an absolute workspace target into Nova's portable, root-relative
 * path format. Targets outside the root and the root itself are rejected.
 *
 * @param {Lib_Scaffold_NormalizeWorkspaceRelativePath_RootDirectory}      rootDirectory      - Root directory.
 * @param {Lib_Scaffold_NormalizeWorkspaceRelativePath_WorkspaceDirectory} workspaceDirectory - Workspace directory.
 *
 * @returns {Lib_Scaffold_NormalizeWorkspaceRelativePath_Returns}
 *
 * @since 0.26.0
 */
export function normalizeWorkspaceRelativePath(rootDirectory: Lib_Scaffold_NormalizeWorkspaceRelativePath_RootDirectory, workspaceDirectory: Lib_Scaffold_NormalizeWorkspaceRelativePath_WorkspaceDirectory): Lib_Scaffold_NormalizeWorkspaceRelativePath_Returns {
  const relativePath: Lib_Scaffold_NormalizeWorkspaceRelativePath_RelativePath = relative(rootDirectory, workspaceDirectory);

  if (
    relativePath === ''
    || relativePath === '..'
    || relativePath.startsWith(`..${sep}`) === true
    || isAbsolute(relativePath) === true
  ) {
    return undefined;
  }

  const normalizedPath: Lib_Scaffold_NormalizeWorkspaceRelativePath_NormalizedPath = relativePath.split(sep).join('/');

  return `./${normalizedPath}`;
}

/**
 * Lib - Scaffold - Find File Conflicts.
 *
 * Checks every file a scaffold plans to own before the first write. Existing
 * unrelated files are allowed, while any file Nova would replace is returned.
 *
 * @param {Lib_Scaffold_FindFileConflicts_PlannedPaths} plannedPaths - Planned paths.
 *
 * @returns {Lib_Scaffold_FindFileConflicts_Returns}
 *
 * @since 0.26.0
 */
export async function findFileConflicts(plannedPaths: Lib_Scaffold_FindFileConflicts_PlannedPaths): Lib_Scaffold_FindFileConflicts_Returns {
  const exists: Lib_Scaffold_FindFileConflicts_Exists = await Promise.all(plannedPaths.map((plannedPath) => pathExists(plannedPath)));

  return plannedPaths.filter((_plannedPath, index) => exists[index] === true);
}

/**
 * Lib - Scaffold - Load Existing Root.
 *
 * Loads the two files required to add a workspace to an existing project and
 * validates the small contract scaffolding depends on before any files change.
 *
 * @param {Lib_Scaffold_LoadExistingRoot_RootDirectory} rootDirectory - Root directory.
 *
 * @returns {Lib_Scaffold_LoadExistingRoot_Returns}
 *
 * @since 0.26.0
 */
export async function loadExistingRoot(rootDirectory: Lib_Scaffold_LoadExistingRoot_RootDirectory): Lib_Scaffold_LoadExistingRoot_Returns {
  const packageJsonPath: Lib_Scaffold_LoadExistingRoot_PackageJsonPath = join(rootDirectory, 'package.json');
  const configFilePath: Lib_Scaffold_LoadExistingRoot_ConfigFilePath = join(rootDirectory, 'nova.config.json');

  let parsedPackageJson: Lib_Scaffold_LoadExistingRoot_ParsedPackageJson = undefined;

  try {
    const packageJsonRaw: Lib_Scaffold_LoadExistingRoot_PackageJsonRaw = await fs.readFile(packageJsonPath, 'utf-8');

    parsedPackageJson = JSON.parse(packageJsonRaw) as Lib_Scaffold_LoadExistingRoot_ParsedPackageJson;
  } catch (error) {
    reportError('The root package.json is missing or contains invalid JSON. No scaffold files were written.');

    Logger.customize({
      name: 'loadExistingRoot',
      purpose: 'packageJson',
    }).debug(error);

    return undefined;
  }

  if (isPlainObject(parsedPackageJson) === false) {
    reportError('The root package.json must contain a JSON object. No scaffold files were written.');

    return undefined;
  }

  const packageJson: Lib_Scaffold_LoadExistingRoot_PackageJson = parsedPackageJson;
  const workspacesValue: Lib_Scaffold_LoadExistingRoot_WorkspacesValue = packageJson['workspaces'];
  let workspacePatterns: Lib_Scaffold_LoadExistingRoot_WorkspacePatterns = undefined;

  if (
    Array.isArray(workspacesValue) === true
    && workspacesValue.every((workspacePattern) => typeof workspacePattern === 'string' && workspacePattern.trim() !== '') === true
  ) {
    workspacePatterns = workspacesValue as Lib_Scaffold_LoadExistingRoot_WorkspacePatternsResolved;
  } else if (isPlainObject(workspacesValue) === true) {
    const workspacesObject: Lib_Scaffold_LoadExistingRoot_WorkspacesObject = workspacesValue;
    const workspacePatternsValue: Lib_Scaffold_LoadExistingRoot_WorkspacePatternsValue = workspacesObject['packages'];

    if (
      Array.isArray(workspacePatternsValue) === true
      && workspacePatternsValue.every((workspacePattern) => typeof workspacePattern === 'string' && workspacePattern.trim() !== '') === true
    ) {
      workspacePatterns = workspacePatternsValue as Lib_Scaffold_LoadExistingRoot_WorkspacePatternsResolved;
    }
  }

  if (workspacePatterns === undefined) {
    reportError('The root package.json "workspaces" field must be a string array or an object with a string "packages" array. No scaffold files were written.');

    return undefined;
  }

  let parsedConfig: Lib_Scaffold_LoadExistingRoot_ParsedConfig = undefined;

  try {
    const configRaw: Lib_Scaffold_LoadExistingRoot_ConfigRaw = await fs.readFile(configFilePath, 'utf-8');

    parsedConfig = JSON.parse(configRaw) as Lib_Scaffold_LoadExistingRoot_ParsedConfig;
  } catch (error) {
    reportError('A readable nova.config.json is required at the monorepo root. Run "nova utility configure" before adding a workspace. No scaffold files were written.');

    Logger.customize({
      name: 'loadExistingRoot',
      purpose: 'novaConfig',
    }).debug(error);

    return undefined;
  }

  if (isPlainObject(parsedConfig) === false) {
    reportError('The root nova.config.json must contain a JSON object. No scaffold files were written.');

    return undefined;
  }

  const config: Lib_Scaffold_LoadExistingRoot_Config = parsedConfig;
  const projectValue: Lib_Scaffold_LoadExistingRoot_ProjectValue = config['project'];

  if (isPlainObject(projectValue) === false) {
    reportError('The root nova.config.json must define project.name.slug before adding a workspace. No scaffold files were written.');

    return undefined;
  }

  const project: Lib_Scaffold_LoadExistingRoot_Project = projectValue;
  const projectNameValue: Lib_Scaffold_LoadExistingRoot_ProjectNameValue = project['name'];

  if (isPlainObject(projectNameValue) === false) {
    reportError('The root nova.config.json must define project.name.slug before adding a workspace. No scaffold files were written.');

    return undefined;
  }

  const projectName: Lib_Scaffold_LoadExistingRoot_ProjectName = projectNameValue;
  const projectSlugValue: Lib_Scaffold_LoadExistingRoot_ProjectSlugValue = projectName['slug'];

  if (typeof projectSlugValue !== 'string' || LIB_REGEX_PATTERN_SLUG_SIMPLE.test(projectSlugValue) === false) {
    reportError('The root nova.config.json project.name.slug must be a lowercase slug before adding a workspace. No scaffold files were written.');

    return undefined;
  }

  const projectSlug: Lib_Scaffold_LoadExistingRoot_ProjectSlug = projectSlugValue;
  const configWorkspacesValue: Lib_Scaffold_LoadExistingRoot_ConfigWorkspacesValue = config['workspaces'];

  if (configWorkspacesValue !== undefined && isPlainObject(configWorkspacesValue) === false) {
    reportError('The root nova.config.json "workspaces" field must be an object. No scaffold files were written.');

    return undefined;
  }

  const configWorkspaces: Lib_Scaffold_LoadExistingRoot_ConfigWorkspaces = (configWorkspacesValue === undefined) ? {} : configWorkspacesValue as Lib_Scaffold_LoadExistingRoot_ConfigWorkspaces;

  return {
    config,
    packageJson,
    projectSlug,
    workspacePatterns,
    workspaces: configWorkspaces,
  };
}

/**
 * Lib - Scaffold - Detect Monorepo Context.
 *
 * Walks backward from the current directory to find package.json files and determines
 * whether this is a monorepo root, a nested workspace, or standalone.
 *
 * @param {Lib_Scaffold_DetectMonorepoContext_CurrentWorkingDirectory} currentWorkingDirectory - Current working directory.
 *
 * @returns {Lib_Scaffold_DetectMonorepoContext_Returns}
 *
 * @since 0.15.0
 */
export async function detectMonorepoContext(currentWorkingDirectory: Lib_Scaffold_DetectMonorepoContext_CurrentWorkingDirectory): Lib_Scaffold_DetectMonorepoContext_Returns {
  const locations: Lib_Scaffold_DetectMonorepoContext_Locations = await discoverPathsWithFile('package.json', 'backward');

  // No package.json found anywhere - safe to create a new monorepo.
  if (locations.length === 0) {
    return { context: 'monorepo' };
  }

  // Current directory is inside a child workspace.
  if (
    locations.length > 1
    || (
      locations.length === 1
      && locations[0] !== currentWorkingDirectory
    )
  ) {
    return { context: 'nested' };
  }

  // Package.json is in currentWorkingDirectory - check for workspaces field.
  const packageJsonPath: Lib_Scaffold_DetectMonorepoContext_PackageJsonPath = join(currentWorkingDirectory, 'package.json');

  let parsedPackageJson: Lib_Scaffold_DetectMonorepoContext_ParsedPackageJson = {};

  try {
    const packageJsonRaw: Lib_Scaffold_DetectMonorepoContext_PackageJsonRaw = await fs.readFile(packageJsonPath, 'utf-8');

    parsedPackageJson = JSON.parse(packageJsonRaw) as Lib_Scaffold_DetectMonorepoContext_ParsedPackageJson;
  } catch {
    return {
      context: 'invalid',
      reason: 'The current package.json contains invalid JSON.',
    };
  }

  if (isPlainObject(parsedPackageJson) === false) {
    return {
      context: 'invalid',
      reason: 'The current package.json must contain a JSON object.',
    };
  }

  if (parsedPackageJson['workspaces'] !== undefined) {
    return {
      context: 'workspace',
      root: currentWorkingDirectory,
    };
  }

  return { context: 'standalone' };
}

/**
 * Lib - Scaffold - Prompt Scaffold Options.
 *
 * Collects project and workspace names through interactive prompts. New monorepos
 * use a dedicated project directory while workspace mode resolves its own path.
 *
 * @param {Lib_Scaffold_PromptScaffoldOptions_Context}  context  - Context.
 * @param {Lib_Scaffold_PromptScaffoldOptions_Defaults} defaults - Defaults.
 *
 * @returns {Lib_Scaffold_PromptScaffoldOptions_Returns}
 *
 * @since 0.15.0
 */
export async function promptScaffoldOptions(context: Lib_Scaffold_PromptScaffoldOptions_Context, defaults: Lib_Scaffold_PromptScaffoldOptions_Defaults): Lib_Scaffold_PromptScaffoldOptions_Returns {
  const currentDirectory: Lib_Scaffold_PromptScaffoldOptions_CurrentDirectory = process.cwd();

  let cancelled: Lib_Scaffold_PromptScaffoldOptions_Cancelled = false;

  if (context['context'] === 'monorepo') {
    // Monorepo mode - prompt for project and workspace names.
    const monorepoNameValue: Lib_Scaffold_PromptScaffoldOptions_MonorepoNameValue = defaults['name'] ?? undefined;
    const monorepoOutputValue: Lib_Scaffold_PromptScaffoldOptions_MonorepoOutputValue = defaults['output'] ?? undefined;
    const monorepoWorkspaceNameValue: Lib_Scaffold_PromptScaffoldOptions_MonorepoWorkspaceNameValue = defaults['workspaceName'] ?? undefined;

    const monorepoQuestions: Lib_Scaffold_PromptScaffoldOptions_MonorepoQuestions = [];

    if (monorepoNameValue === undefined) {
      monorepoQuestions.push({
        type: 'text' as const,
        name: 'name',
        message: 'Project name (slug):',
        initial: defaults['typeName'],
      });
    }

    if (monorepoWorkspaceNameValue === undefined) {
      monorepoQuestions.push({
        type: 'text' as const,
        name: 'workspaceName',
        message: 'Workspace name (slug):',
        initial: defaults['typeName'],
      });
    }

    let monorepoPromptsAnswers: Lib_Scaffold_PromptScaffoldOptions_MonorepoPromptsAnswers = {};

    if (monorepoQuestions.length > 0) {
      monorepoPromptsAnswers = await prompts(monorepoQuestions, {
        onCancel: () => false,
      });
    }

    if (monorepoNameValue === undefined && monorepoPromptsAnswers['name'] === undefined) {
      cancelled = true;
    }

    if (monorepoWorkspaceNameValue === undefined && monorepoPromptsAnswers['workspaceName'] === undefined) {
      cancelled = true;
    }

    if (cancelled === true) {
      return undefined;
    }

    const monorepoResolvedName: Lib_Scaffold_PromptScaffoldOptions_MonorepoResolvedName = (monorepoNameValue ?? monorepoPromptsAnswers['name']) as Lib_Scaffold_PromptScaffoldOptions_MonorepoResolvedName;
    const monorepoResolvedWorkspaceName: Lib_Scaffold_PromptScaffoldOptions_MonorepoResolvedWorkspaceName = (monorepoWorkspaceNameValue ?? monorepoPromptsAnswers['workspaceName']) as Lib_Scaffold_PromptScaffoldOptions_MonorepoResolvedWorkspaceName;

    const resolvedOutputDirectory: Lib_Scaffold_PromptScaffoldOptions_ResolvedOutputDirectory = resolve(currentDirectory, monorepoOutputValue ?? `./${monorepoResolvedName}`);

    return {
      mode: 'monorepo',
      name: monorepoResolvedName,
      workspaceName: monorepoResolvedWorkspaceName,
      outputDirectory: resolvedOutputDirectory,
    };
  }

  // Workspace mode - reuse the root project slug and prompt for workspace-specific values.
  const nameValue: Lib_Scaffold_PromptScaffoldOptions_NameValue = defaults['name'] ?? undefined;
  const outputValue: Lib_Scaffold_PromptScaffoldOptions_OutputValue = defaults['output'] ?? undefined;
  const workspaceNameValue: Lib_Scaffold_PromptScaffoldOptions_WorkspaceNameValue = defaults['workspaceName'] ?? undefined;

  const questions: Lib_Scaffold_PromptScaffoldOptions_Questions = [];

  if (nameValue === undefined) {
    questions.push({
      type: 'text' as const,
      name: 'name',
      message: 'Project name (slug):',
      initial: defaults['typeName'],
    });
  }

  if (workspaceNameValue === undefined) {
    questions.push({
      type: 'text' as const,
      name: 'workspaceName',
      message: 'Workspace name (slug):',
      initial: defaults['typeName'],
    });
  }

  /**
   * Lib - Scaffold - Prompt Scaffold Options - Resolve Initial Output.
   *
   * Computes the initial output directory value shown in the prompt by combining the
   * resolved workspace name into an apps-relative path.
   *
   * @param {Lib_Scaffold_PromptScaffoldOptions_InitialPrev}    _initialPrev   - Initial prev.
   * @param {Lib_Scaffold_PromptScaffoldOptions_InitialAnswers} initialAnswers - Initial answers.
   *
   * @private
   *
   * @returns {Lib_Scaffold_PromptScaffoldOptions_ResolveInitialOutput_Returns}
   *
   * @since 0.21.0
   */
  const resolveInitialOutput: Lib_Scaffold_PromptScaffoldOptions_ResolveInitialOutput = (_initialPrev: Lib_Scaffold_PromptScaffoldOptions_InitialPrev, initialAnswers: Lib_Scaffold_PromptScaffoldOptions_InitialAnswers): Lib_Scaffold_PromptScaffoldOptions_ResolveInitialOutput_Returns => {
    const resolvedInitialWorkspaceName: Lib_Scaffold_PromptScaffoldOptions_ResolveInitialOutput_ResolvedInitialWorkspaceName = (workspaceNameValue ?? initialAnswers['workspaceName']) as Lib_Scaffold_PromptScaffoldOptions_ResolveInitialOutput_ResolvedInitialWorkspaceName;

    return `./${defaults['workspaceBaseDirectory']}/${resolvedInitialWorkspaceName}`;
  };

  if (outputValue === undefined) {
    questions.push({
      type: 'text' as const,
      name: 'output',
      message: 'Output directory:',
      initial: resolveInitialOutput,
    });
  }

  let promptsAnswers: Lib_Scaffold_PromptScaffoldOptions_PromptsAnswers = {};

  if (questions.length > 0) {
    promptsAnswers = await prompts(questions, {
      onCancel: () => false,
    });
  }

  if (nameValue === undefined && promptsAnswers['name'] === undefined) {
    cancelled = true;
  }

  if (workspaceNameValue === undefined && promptsAnswers['workspaceName'] === undefined) {
    cancelled = true;
  }

  if (outputValue === undefined && promptsAnswers['output'] === undefined) {
    cancelled = true;
  }

  if (cancelled === true) {
    return undefined;
  }

  const resolvedName: Lib_Scaffold_PromptScaffoldOptions_ResolvedName = (nameValue ?? promptsAnswers['name']) as Lib_Scaffold_PromptScaffoldOptions_ResolvedName;
  const resolvedWorkspaceName: Lib_Scaffold_PromptScaffoldOptions_ResolvedWorkspaceName = (workspaceNameValue ?? promptsAnswers['workspaceName']) as Lib_Scaffold_PromptScaffoldOptions_ResolvedWorkspaceName;
  const resolvedOutput: Lib_Scaffold_PromptScaffoldOptions_ResolvedOutput = (outputValue ?? promptsAnswers['output']) as Lib_Scaffold_PromptScaffoldOptions_ResolvedOutput;

  return {
    mode: 'workspace',
    name: resolvedName,
    workspaceName: resolvedWorkspaceName,
    outputDirectory: resolve(currentDirectory, resolvedOutput),
  };
}

/**
 * Lib - Scaffold - Resolve Template Answers.
 *
 * Resolves scaffold-specific template values from command flags or interactive
 * choices, validating them before a non-interactive run can write any files.
 *
 * @param {Lib_Scaffold_ResolveTemplateAnswers_Options}          options          - Options.
 * @param {Lib_Scaffold_ResolveTemplateAnswers_Questions}        questions        - Questions.
 * @param {Lib_Scaffold_ResolveTemplateAnswers_IsNonInteractive} isNonInteractive - Is non interactive.
 *
 * @returns {Lib_Scaffold_ResolveTemplateAnswers_Returns}
 *
 * @since 0.26.0
 */
export async function resolveTemplateAnswers(options: Lib_Scaffold_ResolveTemplateAnswers_Options, questions: Lib_Scaffold_ResolveTemplateAnswers_Questions, isNonInteractive: Lib_Scaffold_ResolveTemplateAnswers_IsNonInteractive): Lib_Scaffold_ResolveTemplateAnswers_Returns {
  const resolvedAnswers: Lib_Scaffold_ResolveTemplateAnswers_ResolvedAnswers = new Map();
  const replacements: Lib_Scaffold_ResolveTemplateAnswers_Replacements = new Map();

  for (const question of questions) {
    let isActive: Lib_Scaffold_ResolveTemplateAnswers_IsActive = true;

    if (question['dependsOn'] !== undefined) {
      const dependencyValue: Lib_Scaffold_ResolveTemplateAnswers_DependencyValue = resolvedAnswers.get(question['dependsOn']['name']);

      isActive = dependencyValue !== undefined && question['dependsOn']['values'].some((value) => value === dependencyValue);
    }

    if (isActive === false) {
      const inactiveDefaultChoice: Lib_Scaffold_ResolveTemplateAnswers_InactiveDefaultChoice = question['defaultValue'];

      if (inactiveDefaultChoice !== undefined) {
        const inactiveDefaultChoiceDefinition: Lib_Scaffold_ResolveTemplateAnswers_InactiveDefaultChoiceDefinition = question['choices'].find((choice) => choice['value'] === inactiveDefaultChoice);

        if (inactiveDefaultChoiceDefinition === undefined) {
          const inactiveAllowedValues: Lib_Scaffold_ResolveTemplateAnswers_InactiveAllowedValues = question['choices'].map((choice) => choice['value']).join(', ');

          Logger.customize({
            name: 'resolveTemplateAnswers',
            purpose: 'validate',
          }).error(`Invalid default for ${question['flag']}: "${inactiveDefaultChoice}". Expected one of: ${inactiveAllowedValues}.`);

          process.exitCode = 1;

          return undefined;
        }

        resolvedAnswers.set(question['name'], inactiveDefaultChoice);

        replacements.set(question['placeholder'], inactiveDefaultChoiceDefinition['replacement'] ?? inactiveDefaultChoice);
      }

      continue;
    }

    const providedValue: Lib_Scaffold_ResolveTemplateAnswers_ProvidedValue = Reflect.get(options, question['name']);
    const flagValue: Lib_Scaffold_ResolveTemplateAnswers_FlagValue = question['flagValue'];

    let resolvedValue: Lib_Scaffold_ResolveTemplateAnswers_ResolvedValue = undefined;

    if (flagValue !== undefined && providedValue === true) {
      resolvedValue = flagValue;
    } else if (
      flagValue !== undefined
      && providedValue !== undefined
      && providedValue !== false
    ) {
      Logger.customize({
        name: 'resolveTemplateAnswers',
        purpose: 'validate',
      }).error(`Invalid ${question['flag']} value "${String(providedValue)}". This option is a boolean flag.`);

      process.exitCode = 1;

      return undefined;
    } else if (flagValue === undefined && providedValue !== undefined) {
      if (
        typeof providedValue !== 'string'
        || question['choices'].some((choice) => choice['value'] === providedValue) !== true
      ) {
        const providedAllowedValues: Lib_Scaffold_ResolveTemplateAnswers_ProvidedAllowedValues = question['choices'].map((choice) => choice['value']).join(', ');

        Logger.customize({
          name: 'resolveTemplateAnswers',
          purpose: 'validate',
        }).error(`Invalid ${question['flag']} value "${String(providedValue)}". Expected one of: ${providedAllowedValues}.`);

        process.exitCode = 1;

        return undefined;
      }

      resolvedValue = providedValue;
    } else if (isNonInteractive === true) {
      const nonInteractiveDefaultChoice: Lib_Scaffold_ResolveTemplateAnswers_NonInteractiveDefaultChoice = question['defaultValue'];

      if (nonInteractiveDefaultChoice === undefined) {
        Logger.customize({
          name: 'resolveTemplateAnswers',
          purpose: 'validate',
        }).error(`Non-interactive scaffolding requires ${question['flag']}.`);

        process.exitCode = 1;

        return undefined;
      }

      resolvedValue = nonInteractiveDefaultChoice;
    } else {
      const answers: Lib_Scaffold_ResolveTemplateAnswers_Answers = await prompts({
        type: 'select',
        name: question['name'],
        message: question['message'],
        choices: question['choices'],
        initial: question['initial'],
      }, {
        onCancel: () => false,
      });
      const answer: Lib_Scaffold_ResolveTemplateAnswers_Answer = answers[question['name']];

      if (typeof answer !== 'string') {
        return undefined;
      }

      resolvedValue = answer;
    }

    if (question['choices'].some((choice) => choice['value'] === resolvedValue) !== true) {
      const resolvedAllowedValues: Lib_Scaffold_ResolveTemplateAnswers_ResolvedAllowedValues = question['choices'].map((choice) => choice['value']).join(', ');

      Logger.customize({
        name: 'resolveTemplateAnswers',
        purpose: 'validate',
      }).error(`Invalid default for ${question['flag']}: "${String(resolvedValue)}". Expected one of: ${resolvedAllowedValues}.`);

      process.exitCode = 1;

      return undefined;
    }

    const resolvedChoiceDefinition: Lib_Scaffold_ResolveTemplateAnswers_ResolvedChoiceDefinition = question['choices'].find((choice) => choice['value'] === resolvedValue);
    const replacementValue: Lib_Scaffold_ResolveTemplateAnswers_ReplacementValue = (resolvedChoiceDefinition === undefined) ? resolvedValue : (resolvedChoiceDefinition['replacement'] ?? resolvedValue);

    resolvedAnswers.set(question['name'], resolvedValue);

    replacements.set(question['placeholder'], replacementValue);
  }

  return {
    answers: resolvedAnswers,
    replacements,
  };
}

/**
 * Lib - Scaffold - Create Workspace Directory.
 *
 * Creates the target directory for a new workspace under the given base path using
 * the workspace name as the folder name.
 *
 * @param {Lib_Scaffold_CreateWorkspaceDirectory_BasePath}      basePath      - Base path.
 * @param {Lib_Scaffold_CreateWorkspaceDirectory_WorkspaceName} workspaceName - Workspace name.
 *
 * @returns {Lib_Scaffold_CreateWorkspaceDirectory_Returns}
 *
 * @since 0.15.0
 */
export async function createWorkspaceDirectory(basePath: Lib_Scaffold_CreateWorkspaceDirectory_BasePath, workspaceName: Lib_Scaffold_CreateWorkspaceDirectory_WorkspaceName): Lib_Scaffold_CreateWorkspaceDirectory_Returns {
  const workspaceDirectory: Lib_Scaffold_CreateWorkspaceDirectory_WorkspaceDirectory = join(basePath, workspaceName);

  await fs.mkdir(workspaceDirectory, { recursive: true });

  Logger.customize({
    name: 'createWorkspaceDirectory',
    purpose: 'created',
  }).info(`Created directory "${workspaceDirectory}".`);

  return workspaceDirectory;
}

/**
 * Lib - Scaffold - Write Template Files.
 *
 * Reads every file from the template directory, applies placeholder replacements,
 * and writes the results into the target directory using saveGeneratedFile.
 *
 * @param {Lib_Scaffold_WriteTemplateFiles_TemplateDirectory} templateDirectory - Template directory.
 * @param {Lib_Scaffold_WriteTemplateFiles_TargetDirectory}   targetDirectory   - Target directory.
 * @param {Lib_Scaffold_WriteTemplateFiles_Replacements}      replacements      - Replacements.
 *
 * @returns {Lib_Scaffold_WriteTemplateFiles_Returns}
 *
 * @since 0.15.0
 */
export async function writeTemplateFiles(templateDirectory: Lib_Scaffold_WriteTemplateFiles_TemplateDirectory, targetDirectory: Lib_Scaffold_WriteTemplateFiles_TargetDirectory, replacements: Lib_Scaffold_WriteTemplateFiles_Replacements): Lib_Scaffold_WriteTemplateFiles_Returns {
  const entries: Lib_Scaffold_WriteTemplateFiles_Entries = await collectFiles(templateDirectory, '');

  for (const entry of entries) {
    const sourcePath: Lib_Scaffold_WriteTemplateFiles_SourcePath = join(templateDirectory, entry);
    const targetEntry: Lib_Scaffold_WriteTemplateFiles_TargetEntry = applyTemplateReplacements(entry, replacements);
    const targetPath: Lib_Scaffold_WriteTemplateFiles_TargetPath = join(targetDirectory, targetEntry);
    const sourceContent: Lib_Scaffold_WriteTemplateFiles_SourceContent = await fs.readFile(sourcePath);
    const sourceStats: Lib_Scaffold_WriteTemplateFiles_SourceStats = await fs.stat(sourcePath);
    const isBinary: Lib_Scaffold_WriteTemplateFiles_IsBinary = sourceContent.includes(0);
    const content: Lib_Scaffold_WriteTemplateFiles_Content = (isBinary === true) ? sourceContent : applyTemplateReplacements(sourceContent.toString('utf-8'), replacements);

    await fs.mkdir(dirname(targetPath), { recursive: true });

    await fs.writeFile(targetPath, content);

    await fs.chmod(targetPath, sourceStats.mode);
  }

  return;
}

/**
 * Lib - Scaffold - Update Scaffold package.json.
 *
 * Merges framework-specific dependency and script entries into a freshly
 * generated workspace manifest while preserving its canonical section order.
 *
 * @param {Lib_Scaffold_UpdateScaffoldPackageJson_WorkspaceDirectory} workspaceDirectory - Workspace directory.
 * @param {Lib_Scaffold_UpdateScaffoldPackageJson_Updates}            updates            - Updates.
 *
 * @returns {Lib_Scaffold_UpdateScaffoldPackageJson_Returns}
 *
 * @since 0.29.0
 */
export async function updateScaffoldPackageJson(workspaceDirectory: Lib_Scaffold_UpdateScaffoldPackageJson_WorkspaceDirectory, updates: Lib_Scaffold_UpdateScaffoldPackageJson_Updates): Lib_Scaffold_UpdateScaffoldPackageJson_Returns {
  const packageJsonPath: Lib_Scaffold_UpdateScaffoldPackageJson_PackageJsonPath = join(workspaceDirectory, 'package.json');
  const raw: Lib_Scaffold_UpdateScaffoldPackageJson_Raw = await fs.readFile(packageJsonPath, 'utf-8');
  const parsed: Lib_Scaffold_UpdateScaffoldPackageJson_Parsed = JSON.parse(raw);

  if (isPlainObject(parsed) === false) {
    throw new Error(`The scaffold package manifest at "${packageJsonPath}" must contain a JSON object.`);
  }

  const packageJson: Lib_Scaffold_UpdateScaffoldPackageJson_PackageJson = parsed;

  for (const updateEntry of Object.entries(updates)) {
    const sectionValue: Lib_Scaffold_UpdateScaffoldPackageJson_SectionValue = packageJson[updateEntry[0]];

    if (sectionValue !== undefined && isPlainObject(sectionValue) === false) {
      throw new Error(`The "${updateEntry[0]}" field in "${packageJsonPath}" must contain a JSON object.`);
    }

    const section: Lib_Scaffold_UpdateScaffoldPackageJson_Section = (isPlainObject(sectionValue) === true) ? sectionValue : {};

    for (const valueEntry of Object.entries(updateEntry[1])) {
      Reflect.set(section, valueEntry[0], valueEntry[1]);
    }

    const isSortedSection: Lib_Scaffold_UpdateScaffoldPackageJson_IsSortedSection = [
      'dependencies',
      'devDependencies',
      'optionalDependencies',
      'peerDependencies',
    ].includes(updateEntry[0]);
    let sectionOutput: Lib_Scaffold_UpdateScaffoldPackageJson_SectionOutput = section;

    if (updateEntry[0] === 'scripts') {
      const sectionEntries: Lib_Scaffold_UpdateScaffoldPackageJson_SectionEntries = Object.entries(section);
      const orderedScriptEntries: Lib_Scaffold_UpdateScaffoldPackageJson_OrderedScriptEntries = [];
      const usedScriptKeys: Lib_Scaffold_UpdateScaffoldPackageJson_UsedScriptKeys = new Set();

      for (const sectionEntry of sectionEntries) {
        if (sectionEntry[0].includes(':') === true) {
          continue;
        }

        orderedScriptEntries.push(sectionEntry);

        usedScriptKeys.add(sectionEntry[0]);

        for (const childEntry of sectionEntries) {
          if (childEntry[0].startsWith(`${sectionEntry[0]}:`) === true) {
            orderedScriptEntries.push(childEntry);

            usedScriptKeys.add(childEntry[0]);
          }
        }
      }

      for (const sectionEntry of sectionEntries) {
        if (usedScriptKeys.has(sectionEntry[0]) === false) {
          orderedScriptEntries.push(sectionEntry);
        }
      }

      sectionOutput = Object.fromEntries(orderedScriptEntries);
    } else if (isSortedSection === true) {
      sectionOutput = Object.fromEntries(Object.entries(section).sort((firstEntry, secondEntry) => firstEntry[0].localeCompare(secondEntry[0])));
    }

    Reflect.set(packageJson, updateEntry[0], sectionOutput);
  }

  const content: Lib_Scaffold_UpdateScaffoldPackageJson_Content = `${JSON.stringify(packageJson, null, 2)}\n`;

  await fs.writeFile(packageJsonPath, content, 'utf-8');

  return;
}

/**
 * Lib - Scaffold - Collect Files.
 *
 * Recursively lists all files in a template directory for scaffold copying and
 * conflict planning.
 *
 * @param {Lib_Scaffold_CollectFiles_Directory} directory - Directory.
 * @param {Lib_Scaffold_CollectFiles_Prefix}    prefix    - Prefix.
 *
 * @private
 *
 * @returns {Lib_Scaffold_CollectFiles_Returns}
 *
 * @since 0.15.0
 */
async function collectFiles(directory: Lib_Scaffold_CollectFiles_Directory, prefix: Lib_Scaffold_CollectFiles_Prefix): Lib_Scaffold_CollectFiles_Returns {
  const entries: Lib_Scaffold_CollectFiles_Entries = await fs.readdir(directory, { withFileTypes: true });
  const files: Lib_Scaffold_CollectFiles_Files = [];

  for (const entry of entries) {
    const entryPath: Lib_Scaffold_CollectFiles_EntryPath = (prefix === '') ? entry.name : `${prefix}/${entry.name}`;

    if (entry.isDirectory() === true) {
      files.push(...await collectFiles(join(directory, entry.name), entryPath));
    } else {
      files.push(entryPath);
    }
  }

  return files;
}

/**
 * Lib - Scaffold - Resolve Monorepo Root Template Directory.
 *
 * Locates the root TypeScript, ESLint, and Vitest foundation from both the
 * source tree and Nova's compiled package layout.
 *
 * @private
 *
 * @returns {Lib_Scaffold_ResolveMonorepoRootTemplateDirectory_Returns}
 *
 * @since 0.29.0
 */
function resolveMonorepoRootTemplateDirectory(): Lib_Scaffold_ResolveMonorepoRootTemplateDirectory_Returns {
  const currentDirectory: Lib_Scaffold_ResolveMonorepoRootTemplateDirectory_CurrentDirectory = dirname(fileURLToPath(import.meta.url));

  return join(currentDirectory, '..', '..', 'templates', 'scaffold', 'starter', 'base');
}

/**
 * Lib - Scaffold - Resolve Scaffold Gitignore Entry.
 *
 * Reads the configured root ignore-file entry. Missing or invalid entries use
 * Nova's canonical root bundle without project-owned patterns.
 *
 * @param {Lib_Scaffold_ResolveScaffoldGitignoreEntry_Config} config - Config.
 *
 * @private
 *
 * @returns {Lib_Scaffold_ResolveScaffoldGitignoreEntry_Returns}
 *
 * @since 0.32.0
 */
function resolveScaffoldGitignoreEntry(config: Lib_Scaffold_ResolveScaffoldGitignoreEntry_Config): Lib_Scaffold_ResolveScaffoldGitignoreEntry_Returns {
  const ignoreFilesValue: Lib_Scaffold_ResolveScaffoldGitignoreEntry_IgnoreFilesValue = config['ignoreFiles'];

  if (isPlainObject(ignoreFilesValue) === true) {
    const ignoreFiles: Lib_Scaffold_ResolveScaffoldGitignoreEntry_IgnoreFiles = ignoreFilesValue;
    const entryValue: Lib_Scaffold_ResolveScaffoldGitignoreEntry_EntryValue = ignoreFiles['./.gitignore'];

    if (isPlainObject(entryValue) === true) {
      const entry: Lib_Scaffold_ResolveScaffoldGitignoreEntry_Entry = entryValue;
      const bundlesValue: Lib_Scaffold_ResolveScaffoldGitignoreEntry_BundlesValue = entry['bundles'];
      const patternsValue: Lib_Scaffold_ResolveScaffoldGitignoreEntry_PatternsValue = entry['patterns'];

      if (
        Array.isArray(bundlesValue) === true
        && bundlesValue.every((bundle) => typeof bundle === 'string' && bundle.trim() !== '') === true
        && (
          patternsValue === undefined
          || (
            Array.isArray(patternsValue) === true
            && patternsValue.every((pattern) => typeof pattern === 'string' && pattern.trim() !== '') === true
          )
        )
      ) {
        const bundles: Lib_Scaffold_ResolveScaffoldGitignoreEntry_Bundles = [...bundlesValue];
        const patterns: Lib_Scaffold_ResolveScaffoldGitignoreEntry_Patterns = (patternsValue === undefined) ? [] : [...patternsValue];

        return {
          bundles,
          patterns,
        };
      }
    }
  }

  return {
    bundles: ['nova'],
    patterns: [],
  };
}

/**
 * Lib - Scaffold - Resolve Scaffold package.json Recipes.
 *
 * Enables every package.json recipe for a scaffolded workspace and applies
 * Nova's reviewed defaults for recipes with configurable behavior.
 *
 * @private
 *
 * @returns {Lib_Scaffold_ResolveScaffoldPackageJsonRecipes_Returns}
 *
 * @since 0.33.0
 */
function resolveScaffoldPackageJsonRecipes(): Lib_Scaffold_ResolveScaffoldPackageJsonRecipes_Returns {
  const recipes: Lib_Scaffold_ResolveScaffoldPackageJsonRecipes_Recipes = {};

  for (const recipeName of libItemAllowedRecipes) {
    const recipe: Lib_Scaffold_ResolveScaffoldPackageJsonRecipes_Recipe = { enabled: true };

    Reflect.set(recipes, recipeName, recipe);
  }

  Reflect.set(recipes, 'cleanup', {
    enabled: true,
    settings: {
      removeUnknownKeys: true,
      reorderKeys: true,
    },
  });
  Reflect.set(recipes, 'normalize-dependencies', {
    enabled: true,
    settings: {
      pinDependencyVersions: true,
      pinDevDependencyVersions: true,
    },
  });
  Reflect.set(recipes, 'sync-environment', {
    enabled: true,
    settings: {
      trackNodeLtsVersions: true,
    },
  });

  return recipes;
}

/**
 * Lib - Scaffold - Write Scaffold Gitignore.
 *
 * Generates a root .gitignore from Nova's canonical template without emitting
 * generator logs that would interrupt the scaffold progress display.
 *
 * @param {Lib_Scaffold_WriteScaffoldGitignore_RootDirectory} rootDirectory - Root directory.
 * @param {Lib_Scaffold_WriteScaffoldGitignore_Entry}         entry         - Entry.
 *
 * @private
 *
 * @returns {Lib_Scaffold_WriteScaffoldGitignore_Returns}
 *
 * @since 0.31.0
 */
async function writeScaffoldGitignore(rootDirectory: Lib_Scaffold_WriteScaffoldGitignore_RootDirectory, entry: Lib_Scaffold_WriteScaffoldGitignore_Entry = {
  bundles: ['nova'],
  patterns: [],
}): Lib_Scaffold_WriteScaffoldGitignore_Returns {
  const content: Lib_Scaffold_WriteScaffoldGitignore_Content = await renderIgnoreFile('./.gitignore', entry);
  const targetPath: Lib_Scaffold_WriteScaffoldGitignore_TargetPath = join(rootDirectory, '.gitignore');

  await saveGeneratedFile(targetPath, content, false, {
    command: 'nova generate must-haves ignore-files',
    docsSlug: 'cli/generators/must-haves/ignore-files',
    mode: 'strict',
  }, false);

  return;
}

/**
 * Lib - Scaffold - Get Monorepo Root Planned Paths.
 *
 * Lists every root file owned by the base scaffold so conflict detection and
 * actual generation always use the same source of truth.
 *
 * @param {Lib_Scaffold_GetMonorepoRootPlannedPaths_OutputDirectory} outputDirectory - Output directory.
 *
 * @returns {Lib_Scaffold_GetMonorepoRootPlannedPaths_Returns}
 *
 * @since 0.29.0
 */
export async function getMonorepoRootPlannedPaths(outputDirectory: Lib_Scaffold_GetMonorepoRootPlannedPaths_OutputDirectory): Lib_Scaffold_GetMonorepoRootPlannedPaths_Returns {
  const templateDirectory: Lib_Scaffold_GetMonorepoRootPlannedPaths_TemplateDirectory = resolveMonorepoRootTemplateDirectory();
  const templateEntries: Lib_Scaffold_GetMonorepoRootPlannedPaths_TemplateEntries = await collectFiles(templateDirectory, '');

  return [
    join(outputDirectory, '.env'),
    join(outputDirectory, '.env.sample'),
    join(outputDirectory, '.gitignore'),
    join(outputDirectory, 'package.json'),
    join(outputDirectory, 'nova.config.json'),
    ...templateEntries.map((templateEntry) => join(outputDirectory, templateEntry)),
  ];
}

/**
 * Lib - Scaffold - Create Monorepo Root.
 *
 * Creates apps and packages directories with the root project manifests while
 * installing Nova's complete root workspace script dispatchers alongside the shared
 * TypeScript, ESLint, and Vitest tooling for repository-owned files.
 *
 * @param {Lib_Scaffold_CreateMonorepoRoot_OutputDirectory} outputDirectory - Output directory.
 * @param {Lib_Scaffold_CreateMonorepoRoot_ProjectSlug}     projectSlug     - Project slug.
 * @param {Lib_Scaffold_CreateMonorepoRoot_Platforms}       platforms       - Platforms.
 * @param {Lib_Scaffold_CreateMonorepoRoot_AllowScripts}    allowScripts    - Allow scripts.
 *
 * @returns {Lib_Scaffold_CreateMonorepoRoot_Returns}
 *
 * @since 0.15.0
 */
export async function createMonorepoRoot(outputDirectory: Lib_Scaffold_CreateMonorepoRoot_OutputDirectory, projectSlug: Lib_Scaffold_CreateMonorepoRoot_ProjectSlug, platforms: Lib_Scaffold_CreateMonorepoRoot_Platforms, allowScripts: Lib_Scaffold_CreateMonorepoRoot_AllowScripts): Lib_Scaffold_CreateMonorepoRoot_Returns {
  await fs.mkdir(outputDirectory, { recursive: true });

  const appsDirectory: Lib_Scaffold_CreateMonorepoRoot_AppsDirectory = join(outputDirectory, 'apps');

  await fs.mkdir(appsDirectory, { recursive: true });

  const packagesDirectory: Lib_Scaffold_CreateMonorepoRoot_PackagesDirectory = join(outputDirectory, 'packages');

  await fs.mkdir(packagesDirectory, { recursive: true });

  // Create root package.json.
  const packageJsonContent: Lib_Scaffold_CreateMonorepoRoot_PackageJsonContent = {
    name: `${projectSlug}-project`,
    version: '0.0.0',
    type: 'module',
    private: true,
    scripts: {
      'dev': 'nova utility run-workspaces --node-env development dev',
      'prod': 'nova utility run-workspaces --node-env production prod',
      'check': 'nova utility run-workspaces check',
      'check:lint': 'eslint ./ --max-warnings=0',
      'check:types-config': 'nova utility type-check --project tsconfig.config.json',
      'check:types-tests': 'nova utility type-check --project tsconfig.tests.json',
      'check:test': 'vitest run',
      'build': 'nova utility run-workspaces --node-env production build',
      'deploy': 'nova utility run-workspaces --node-env production deploy',
      'clean': 'nova utility run-workspaces clean',
      'changelog': 'nova utility changelog',
      'recipes': 'nova utility run-recipes --replace-file',
    },
    allowScripts,
    workspaces: [
      'apps/*',
      'packages/*',
    ],
    packageManager: getScaffoldVersion('npmPackageManager'),
    engines: {
      node: getScaffoldVersion('nodeEngine'),
    },
    dependencies: {
      '@cbnventures/nova': novaPackageJson['version'],
    },
    devDependencies: {
      '@types/node': getScaffoldVersion('typesNode24'),
      'eslint': getScaffoldVersion('eslint'),
      'jiti': getScaffoldVersion('jiti'),
      'typescript': getScaffoldVersion('typescript'),
      'vitest': getScaffoldVersion('vitest'),
    },
  };

  const packageJsonPath: Lib_Scaffold_CreateMonorepoRoot_PackageJsonPath = join(outputDirectory, 'package.json');

  await fs.writeFile(packageJsonPath, `${JSON.stringify(packageJsonContent, null, 2)}\n`, 'utf-8');

  // Create baseline nova.config.json.
  const projectTitle: Lib_Scaffold_CreateMonorepoRoot_ProjectTitle = projectSlug
    .split('-')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');

  const novaConfigContent: Lib_Scaffold_CreateMonorepoRoot_NovaConfigContent = {
    project: {
      name: {
        slug: projectSlug,
        title: projectTitle,
      },
      legalName: 'Example Company',
      platforms,
      startingYear: new Date().getFullYear(),
    },
    workspaces: {
      './': {
        name: `${projectSlug}-project`,
        role: 'project',
        policy: 'freezable',
      },
    },
    ignoreFiles: {
      './.gitignore': {
        bundles: ['nova'],
        patterns: [],
      },
    },
    recipes: {
      'miscellaneous': {
        'fix-markdown-tables': {
          enabled: true,
        },
        'remove-operating-system-files': {
          enabled: false,
          settings: {
            linux: {},
            macos: {
              appleDouble: false,
              desktopServicesStore: false,
            },
            windows: {
              enhancedThumbnailDatabase: false,
              enhancedVistaThumbnailDatabase: false,
              thumbnailDatabase: false,
            },
          },
        },
      },
      'nova-config': {
        'normalize-order': {
          enabled: true,
        },
      },
      'package-json': {
        './': resolveScaffoldPackageJsonRecipes(),
      },
    },
    environment: {
      workspaces: {
        './': {
          prefix: 'ROOT_',
        },
      },
    },
    settings: {
      versionStrategy: 'semver',
      runWorkspaces: {
        concurrency: {
          build: 2,
          check: 2,
          deploy: 2,
        },
      },
    },
  };

  const novaConfigPath: Lib_Scaffold_CreateMonorepoRoot_NovaConfigPath = join(outputDirectory, 'nova.config.json');

  await fs.writeFile(novaConfigPath, `${JSON.stringify(novaConfigContent, null, 2)}\n`, 'utf-8');

  const rootTemplateDirectory: Lib_Scaffold_CreateMonorepoRoot_RootTemplateDirectory = resolveMonorepoRootTemplateDirectory();
  const replacements: Lib_Scaffold_CreateMonorepoRoot_Replacements = new Map([[
    LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
    projectSlug,
  ]]);

  await writeTemplateFiles(rootTemplateDirectory, outputDirectory, replacements);

  await writeScaffoldGitignore(outputDirectory);

  await writeDotenvFiles({
    report: false,
    targetDirectory: outputDirectory,
    variables: [],
  });

  return;
}

/**
 * Lib - Scaffold - Resolve Scaffold Environment Prefix.
 *
 * Derives a readable workspace prefix and falls back to a numbered namespace
 * when it would overlap any project, workspace, or workflow prefix already in use.
 *
 * @param {Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_Environment}   environment   - Environment.
 * @param {Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_WorkspaceName} workspaceName - Workspace name.
 *
 * @returns {Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_Returns}
 *
 * @since 0.31.0
 */
export function resolveScaffoldEnvironmentPrefix(environment: Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_Environment, workspaceName: Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_WorkspaceName): Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_Returns {
  const existingPrefixes: Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_ExistingPrefixes = [];

  for (const scopeName of [
    'project',
    'workspaces',
    'workflows',
  ]) {
    const scopeValue: Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_ScopeValue = environment[scopeName];

    if (isPlainObject(scopeValue) === false) {
      continue;
    }

    const scope: Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_Scope = scopeValue;
    const entryValues: Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_EntryValues = (scopeName === 'project') ? [scope] : Object.values(scope);

    for (const entryValue of entryValues) {
      if (isPlainObject(entryValue) === false) {
        continue;
      }

      const entry: Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_Entry = entryValue;
      const prefixValue: Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_PrefixValue = entry['prefix'];

      if (typeof prefixValue === 'string') {
        existingPrefixes.push(prefixValue);
      }
    }
  }

  const basePrefix: Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_BasePrefix = `${workspaceName.toUpperCase().replace(LIB_REGEX_PATTERN_NON_ALPHANUMERIC_RUN, '_')}_`;
  let candidate: Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_Candidate = basePrefix;
  let candidateIndex: Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_CandidateIndex = 1;
  let hasConflict: Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_HasConflict = true;

  while (hasConflict === true) {
    hasConflict = libEnvNamespace.isReservedPrefix(candidate);

    if (hasConflict === false) {
      for (const existingPrefix of existingPrefixes) {
        if (libEnvNamespace.prefixesOverlap(candidate, existingPrefix) === true) {
          hasConflict = true;

          break;
        }
      }
    }

    if (hasConflict === true) {
      candidate = `W${candidateIndex}_${basePrefix}`;
      candidateIndex += 1;
    }
  }

  return candidate;
}

/**
 * Lib - Scaffold - Resolve Scaffold Policy.
 *
 * Maps the public scaffold category to the workspace policy registered in
 * nova.config.json and used to select its initial version.
 *
 * @param {Lib_Scaffold_ResolveScaffoldPolicy_Category} category - Category.
 *
 * @returns {Lib_Scaffold_ResolveScaffoldPolicy_Returns}
 *
 * @since 0.34.0
 */
function resolveScaffoldPolicy(category: Lib_Scaffold_ResolveScaffoldPolicy_Category): Lib_Scaffold_ResolveScaffoldPolicy_Returns {
  if (category === 'package' || category === 'tool') {
    return 'distributable';
  }

  if (category === 'docs') {
    return 'freezable';
  }

  return 'trackable';
}

/**
 * Lib - Scaffold - Resolve Scaffold Workspace Version.
 *
 * Resolves a strategy-aware initial version and inherits the established
 * shared version when an existing project uses lock-step versioning.
 *
 * @param {Lib_Scaffold_ResolveScaffoldWorkspaceVersion_ExistingRoot} existingRoot - Existing root.
 * @param {Lib_Scaffold_ResolveScaffoldWorkspaceVersion_ConfigRoot}   configRoot   - Config root.
 * @param {Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Policy}       policy       - Policy.
 *
 * @returns {Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Returns}
 *
 * @since 0.34.0
 */
async function resolveScaffoldWorkspaceVersion(existingRoot: Lib_Scaffold_ResolveScaffoldWorkspaceVersion_ExistingRoot, configRoot: Lib_Scaffold_ResolveScaffoldWorkspaceVersion_ConfigRoot, policy: Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Policy): Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Returns {
  const config: Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Config = (existingRoot === undefined) ? {} : existingRoot['config'];
  const settingsValue: Lib_Scaffold_ResolveScaffoldWorkspaceVersion_SettingsValue = config['settings'];

  if (settingsValue !== undefined && isPlainObject(settingsValue) === false) {
    throw new Error('The root nova.config.json "settings" field must be an object before adding a workspace.');
  }

  const settings: Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Settings = (settingsValue === undefined) ? {} : settingsValue as Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Settings;
  const strategyValue: Lib_Scaffold_ResolveScaffoldWorkspaceVersion_StrategyValue = settings['versionStrategy'];

  if (
    strategyValue !== undefined
    && strategyValue !== 'semver'
    && strategyValue !== 'calver'
  ) {
    throw new Error('The root nova.config.json "settings.versionStrategy" field must be "semver" or "calver" before adding a workspace.');
  }

  const strategy: Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Strategy = strategyValue ?? 'semver';

  if (existingRoot === undefined || policy === 'freezable') {
    return LibVersionContract.getInitialVersion(policy, strategy);
  }

  const lockStepVersioning: Lib_Scaffold_ResolveScaffoldWorkspaceVersion_LockStepVersioning = settings['lockStepVersioning'] === true;

  if (lockStepVersioning === false) {
    return LibVersionContract.getInitialVersion(policy, strategy);
  }

  const versions: Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Versions = new Set();

  for (const workspaceEntry of Object.entries(existingRoot['workspaces'])) {
    const workspacePath: Lib_Scaffold_ResolveScaffoldWorkspaceVersion_WorkspacePath = workspaceEntry[0];
    const workspace: Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Workspace = workspaceEntry[1];

    if (isPlainObject(workspace) === false) {
      throw new Error(`The nova.config.json workspace "${workspacePath}" must be an object before adding a workspace.`);
    }

    const workspaceConfig: Lib_Scaffold_ResolveScaffoldWorkspaceVersion_WorkspaceConfig = workspace as Lib_Scaffold_ResolveScaffoldWorkspaceVersion_WorkspaceConfig;

    if (workspaceConfig['policy'] === 'freezable') {
      continue;
    }

    if (workspaceConfig['policy'] !== 'trackable' && workspaceConfig['policy'] !== 'distributable') {
      throw new Error(`The nova.config.json workspace "${workspacePath}" must define a supported policy before adding a workspace.`);
    }

    const packageJsonPath: Lib_Scaffold_ResolveScaffoldWorkspaceVersion_PackageJsonPath = resolve(configRoot, workspacePath, 'package.json');
    let packageJsonRaw: Lib_Scaffold_ResolveScaffoldWorkspaceVersion_PackageJsonRaw = undefined;

    try {
      packageJsonRaw = await fs.readFile(packageJsonPath, 'utf-8');
    } catch {
      throw new Error(`Unable to read "${packageJsonPath}" while resolving the lock-step scaffold version.`);
    }

    let packageJson: Lib_Scaffold_ResolveScaffoldWorkspaceVersion_PackageJson = undefined;

    try {
      packageJson = JSON.parse(packageJsonRaw) as Lib_Scaffold_ResolveScaffoldWorkspaceVersion_PackageJson;
    } catch {
      throw new Error(`Unable to parse "${packageJsonPath}" while resolving the lock-step scaffold version.`);
    }

    const currentVersion: Lib_Scaffold_ResolveScaffoldWorkspaceVersion_CurrentVersion = (isPlainObject(packageJson) === true && typeof packageJson['version'] === 'string') ? packageJson['version'] : undefined;

    if (currentVersion === undefined) {
      throw new Error(`No string "version" field was found in "${packageJsonPath}" while resolving the lock-step scaffold version.`);
    }

    LibVersionContract.validate(currentVersion, workspaceConfig['policy'], strategy, packageJsonPath);

    versions.add(currentVersion);
  }

  if (versions.size > 1) {
    throw new Error(`Lock-step versioning requires every non-freezable workspace to use one version before scaffolding. Found: ${[...versions].join(', ')}.`);
  }

  return [...versions][0] ?? LibVersionContract.getInitialVersion(policy, strategy);
}

/**
 * Lib - Scaffold - Register Workspace In Config.
 *
 * Adds a workspace entry to nova.config.json so the CLI recognizes the new workspace for
 * recipes, generators, and other project-wide operations.
 *
 * @param {Lib_Scaffold_RegisterWorkspaceInConfig_ConfigFilePath}       configFilePath       - Config file path.
 * @param {Lib_Scaffold_RegisterWorkspaceInConfig_WorkspaceRelPath}     workspaceRelPath     - Workspace rel path.
 * @param {Lib_Scaffold_RegisterWorkspaceInConfig_WorkspacePackageName} workspacePackageName - Workspace package name.
 * @param {Lib_Scaffold_RegisterWorkspaceInConfig_WorkspaceName}        workspaceName        - Workspace name.
 * @param {Lib_Scaffold_RegisterWorkspaceInConfig_Category}             category             - Category.
 * @param {Lib_Scaffold_RegisterWorkspaceInConfig_EnvironmentVariables} environmentVariables - Environment variables.
 * @param {Lib_Scaffold_RegisterWorkspaceInConfig_Platforms}            platforms            - Platforms.
 *
 * @returns {Lib_Scaffold_RegisterWorkspaceInConfig_Returns}
 *
 * @since 0.15.0
 */
export async function registerWorkspaceInConfig(configFilePath: Lib_Scaffold_RegisterWorkspaceInConfig_ConfigFilePath, workspaceRelPath: Lib_Scaffold_RegisterWorkspaceInConfig_WorkspaceRelPath, workspacePackageName: Lib_Scaffold_RegisterWorkspaceInConfig_WorkspacePackageName, workspaceName: Lib_Scaffold_RegisterWorkspaceInConfig_WorkspaceName, category: Lib_Scaffold_RegisterWorkspaceInConfig_Category, environmentVariables: Lib_Scaffold_RegisterWorkspaceInConfig_EnvironmentVariables, platforms: Lib_Scaffold_RegisterWorkspaceInConfig_Platforms): Lib_Scaffold_RegisterWorkspaceInConfig_Returns {
  let parsedConfig: Lib_Scaffold_RegisterWorkspaceInConfig_ParsedConfig = undefined;

  try {
    const raw: Lib_Scaffold_RegisterWorkspaceInConfig_Raw = await fs.readFile(configFilePath, 'utf-8');

    parsedConfig = JSON.parse(raw) as Lib_Scaffold_RegisterWorkspaceInConfig_ParsedConfig;
  } catch (error) {
    reportError('Unable to read nova.config.json while registering the scaffolded workspace.');

    Logger.customize({
      name: 'registerWorkspaceInConfig',
      purpose: 'config',
    }).debug(error);

    return;
  }

  if (isPlainObject(parsedConfig) === false) {
    reportError('The root nova.config.json must contain a JSON object.');

    return;
  }

  // Get project slug from config.
  const project: Lib_Scaffold_RegisterWorkspaceInConfig_Project = parsedConfig['project'] as Lib_Scaffold_RegisterWorkspaceInConfig_Project;
  const projectName: Lib_Scaffold_RegisterWorkspaceInConfig_ProjectName = (project !== undefined) ? project['name'] as Lib_Scaffold_RegisterWorkspaceInConfig_ProjectName : undefined;
  const projectSlug: Lib_Scaffold_RegisterWorkspaceInConfig_ProjectSlug = (projectName !== undefined) ? projectName['slug'] as Lib_Scaffold_RegisterWorkspaceInConfig_ProjectSlug : undefined;

  if (
    project === undefined
    || typeof projectSlug !== 'string'
    || LIB_REGEX_PATTERN_SLUG_SIMPLE.test(projectSlug) === false
  ) {
    reportError('The root nova.config.json must define a valid project.name.slug before registering a workspace.');

    return;
  }

  const parsedPlatforms: Lib_Scaffold_RegisterWorkspaceInConfig_ParsedPlatforms = project['platforms'] as Lib_Scaffold_RegisterWorkspaceInConfig_ParsedPlatforms;

  if (parsedPlatforms !== undefined && Array.isArray(parsedPlatforms) === false) {
    reportError('The root nova.config.json "project.platforms" field must be an array.');

    return;
  }

  const platformsMerged: Lib_Scaffold_RegisterWorkspaceInConfig_PlatformsMerged = [...new Set([
    ...((Array.isArray(parsedPlatforms) === true) ? parsedPlatforms : []),
    ...platforms,
  ])];

  Reflect.set(project, 'platforms', platformsMerged);

  // Determine role and config name based on category.
  const role: Lib_Scaffold_RegisterWorkspaceInConfig_Role = (category === 'package') ? 'package' : category;
  const policy: Lib_Scaffold_RegisterWorkspaceInConfig_Policy = resolveScaffoldPolicy(category);

  const configName: Lib_Scaffold_RegisterWorkspaceInConfig_ConfigName = workspacePackageName;

  // Add workspace entry.
  const parsedWorkspaces: Lib_Scaffold_RegisterWorkspaceInConfig_ParsedWorkspaces = parsedConfig['workspaces'] as Lib_Scaffold_RegisterWorkspaceInConfig_ParsedWorkspaces;

  if (parsedWorkspaces !== undefined && isPlainObject(parsedWorkspaces) === false) {
    reportError('The root nova.config.json "workspaces" field must be an object.');

    return;
  }

  const workspaces: Lib_Scaffold_RegisterWorkspaceInConfig_Workspaces = parsedWorkspaces ?? {};

  Reflect.set(workspaces, workspaceRelPath, {
    name: configName,
    role,
    policy,
  });

  Reflect.set(parsedConfig, 'workspaces', workspaces);

  if (category === 'docs') {
    const parsedUrls: Lib_Scaffold_RegisterWorkspaceInConfig_ParsedUrls = parsedConfig['urls'] as Lib_Scaffold_RegisterWorkspaceInConfig_ParsedUrls;

    if (parsedUrls !== undefined && isPlainObject(parsedUrls) === false) {
      reportError('The root nova.config.json "urls" field must be an object.');

      return;
    }

    const urls: Lib_Scaffold_RegisterWorkspaceInConfig_Urls = parsedUrls ?? {};
    const documentationUrl: Lib_Scaffold_RegisterWorkspaceInConfig_DocumentationUrl = 'https://www.example.com';

    if (urls['homepage'] === undefined) {
      Reflect.set(urls, 'homepage', documentationUrl);
    }

    if (urls['documentation'] === undefined) {
      Reflect.set(urls, 'documentation', documentationUrl);
    }

    Reflect.set(parsedConfig, 'urls', urls);
  }

  const parsedRecipes: Lib_Scaffold_RegisterWorkspaceInConfig_ParsedRecipes = parsedConfig['recipes'] as Lib_Scaffold_RegisterWorkspaceInConfig_ParsedRecipes;

  if (parsedRecipes !== undefined && isPlainObject(parsedRecipes) === false) {
    reportError('The root nova.config.json "recipes" field must be an object.');

    return;
  }

  const recipes: Lib_Scaffold_RegisterWorkspaceInConfig_Recipes = parsedRecipes ?? {};
  const parsedPackageJsonRecipes: Lib_Scaffold_RegisterWorkspaceInConfig_ParsedPackageJsonRecipes = recipes['package-json'];

  if (parsedPackageJsonRecipes !== undefined && isPlainObject(parsedPackageJsonRecipes) === false) {
    reportError('The root nova.config.json "recipes.package-json" field must be an object.');

    return;
  }

  const packageJsonRecipes: Lib_Scaffold_RegisterWorkspaceInConfig_PackageJsonRecipes = parsedPackageJsonRecipes ?? {};

  Reflect.set(packageJsonRecipes, workspaceRelPath, resolveScaffoldPackageJsonRecipes());
  Reflect.set(recipes, 'package-json', packageJsonRecipes);
  Reflect.set(parsedConfig, 'recipes', recipes);

  const parsedIgnoreFiles: Lib_Scaffold_RegisterWorkspaceInConfig_ParsedIgnoreFiles = parsedConfig['ignoreFiles'] as Lib_Scaffold_RegisterWorkspaceInConfig_ParsedIgnoreFiles;

  if (parsedIgnoreFiles !== undefined && isPlainObject(parsedIgnoreFiles) === false) {
    reportError('The root nova.config.json "ignoreFiles" field must be an object.');

    return;
  }

  const ignoreFiles: Lib_Scaffold_RegisterWorkspaceInConfig_IgnoreFiles = parsedIgnoreFiles ?? {};

  if (ignoreFiles['./.gitignore'] === undefined) {
    Reflect.set(ignoreFiles, './.gitignore', resolveScaffoldGitignoreEntry(parsedConfig));
  }

  const configRoot: Lib_Scaffold_RegisterWorkspaceInConfig_ConfigRoot = dirname(configFilePath);
  const workspaceDirectory: Lib_Scaffold_RegisterWorkspaceInConfig_WorkspaceDirectory = resolve(configRoot, workspaceRelPath);
  const dockerignorePath: Lib_Scaffold_RegisterWorkspaceInConfig_DockerignorePath = join(workspaceDirectory, '.dockerignore');
  const dockerignoreConfigPath: Lib_Scaffold_RegisterWorkspaceInConfig_DockerignoreConfigPath = `${workspaceRelPath}/.dockerignore`;

  if (await pathExists(dockerignorePath) === true) {
    Reflect.set(ignoreFiles, dockerignoreConfigPath, {
      bundles: ['nova'],
      patterns: [],
    });
  }

  const assetsignorePath: Lib_Scaffold_RegisterWorkspaceInConfig_AssetsignorePath = join(workspaceDirectory, 'public', '.assetsignore');
  const assetsignoreConfigPath: Lib_Scaffold_RegisterWorkspaceInConfig_AssetsignoreConfigPath = `${workspaceRelPath}/public/.assetsignore`;

  if (await pathExists(assetsignorePath) === true) {
    Reflect.set(ignoreFiles, assetsignoreConfigPath, {
      bundles: ['cloudflare-astro'],
      patterns: [],
    });
  }

  Reflect.set(parsedConfig, 'ignoreFiles', ignoreFiles);

  const parsedEnvironment: Lib_Scaffold_RegisterWorkspaceInConfig_ParsedEnvironment = parsedConfig['environment'] as Lib_Scaffold_RegisterWorkspaceInConfig_ParsedEnvironment;

  if (parsedEnvironment !== undefined && isPlainObject(parsedEnvironment) === false) {
    reportError('The root nova.config.json "environment" field must be an object.');

    return;
  }

  const environment: Lib_Scaffold_RegisterWorkspaceInConfig_Environment = parsedEnvironment ?? {};
  const parsedEnvironmentWorkspaces: Lib_Scaffold_RegisterWorkspaceInConfig_ParsedEnvironmentWorkspaces = environment['workspaces'] as Lib_Scaffold_RegisterWorkspaceInConfig_ParsedEnvironmentWorkspaces;

  if (parsedEnvironmentWorkspaces !== undefined && isPlainObject(parsedEnvironmentWorkspaces) === false) {
    reportError('The root nova.config.json "environment.workspaces" field must be an object.');

    return;
  }

  const environmentWorkspaces: Lib_Scaffold_RegisterWorkspaceInConfig_EnvironmentWorkspaces = parsedEnvironmentWorkspaces ?? {};
  const environmentWorkspace: Lib_Scaffold_RegisterWorkspaceInConfig_EnvironmentWorkspace = {
    prefix: resolveScaffoldEnvironmentPrefix(environment, workspaceName),
  };

  if (environmentVariables.length > 0) {
    Reflect.set(environmentWorkspace, 'variables', environmentVariables);
  }

  Reflect.set(environmentWorkspaces, workspaceRelPath, environmentWorkspace);
  Reflect.set(environment, 'workspaces', environmentWorkspaces);
  Reflect.set(parsedConfig, 'environment', environment);

  const normalizedConfig: Lib_Scaffold_RegisterWorkspaceInConfig_NormalizedConfig = normalizeNovaConfigTopLevelOrder(parsedConfig);

  // Write back.
  await fs.writeFile(configFilePath, `${JSON.stringify(normalizedConfig, null, 2)}\n`, 'utf-8');

  return;
}

/**
 * Lib - Scaffold - Run Scaffold.
 *
 * Orchestrates the full scaffold workflow: detects context, prompts for options,
 * writes template files, registers the workspace, and runs generators.
 *
 * @param {Lib_Scaffold_RunScaffold_Options}    options    - Options.
 * @param {Lib_Scaffold_RunScaffold_Definition} definition - Definition.
 *
 * @returns {Lib_Scaffold_RunScaffold_Returns}
 *
 * @since 0.15.0
 */
export async function runScaffold(options: Lib_Scaffold_RunScaffold_Options, definition: Lib_Scaffold_RunScaffold_Definition): Lib_Scaffold_RunScaffold_Returns {
  const currentDirectory: Lib_Scaffold_RunScaffold_CurrentDirectory = process.cwd();
  const isDryRun: Lib_Scaffold_RunScaffold_IsDryRun = options['dryRun'] === true;
  const isNonInteractive: Lib_Scaffold_RunScaffold_IsNonInteractive = options['nonInteractive'] === true;

  if (isDryRun === true) {
    Logger.customize({
      name: 'CliScaffold.run',
      purpose: 'options',
    }).warn('Dry run enabled. File changes will not be made in this session.');
  }

  // Detect Monorepo Context.
  const context: Lib_Scaffold_RunScaffold_Context = await detectMonorepoContext(currentDirectory);

  if (context['context'] === 'invalid') {
    reportError(`${context['reason']} No scaffold files were written.`);

    return;
  }

  if (context['context'] === 'nested') {
    reportError('Re-run this command from the monorepo root directory. No scaffold files were written.');

    return;
  }

  if (context['context'] === 'standalone') {
    reportError('Found a standalone project. Run from an empty directory to create a new monorepo, or add a valid "workspaces" field to use workspace mode. No scaffold files were written.');

    return;
  }

  let existingRoot: Lib_Scaffold_RunScaffold_ExistingRoot = undefined;

  if (context['context'] === 'workspace') {
    existingRoot = await loadExistingRoot(context['root']);

    if (existingRoot === undefined) {
      return;
    }

    if (options['name'] !== undefined && options['name'] !== existingRoot['projectSlug']) {
      reportError(`This monorepo's project slug is "${existingRoot['projectSlug']}", not "${options['name']}". Omit --name when adding a workspace. No scaffold files were written.`);

      return;
    }
  }

  if (
    isNonInteractive === true
    && options['workspaceName'] === undefined
  ) {
    reportError('Non-interactive scaffolding requires --workspace-name. No scaffold files were written.');

    return;
  }

  if (
    isNonInteractive === true
    && context['context'] === 'workspace'
    && options['output'] === undefined
  ) {
    reportError('Adding a workspace non-interactively also requires --output. No scaffold files were written.');

    return;
  }

  if (
    isNonInteractive === true
    && context['context'] === 'monorepo'
    && options['name'] === undefined
  ) {
    reportError('Creating a new monorepo non-interactively also requires --name. No scaffold files were written.');

    return;
  }

  // Prompt for scaffold configuration.
  let configNameDefault: Lib_Scaffold_RunScaffold_ConfigNameDefault = options['name'];

  if (context['context'] === 'workspace' && existingRoot !== undefined) {
    configNameDefault = existingRoot['projectSlug'];
  }
  const config: Lib_Scaffold_RunScaffold_Config = await promptScaffoldOptions(context, {
    name: configNameDefault,
    output: options['output'],
    typeName: definition['typeName'],
    workspaceBaseDirectory: (definition['category'] === 'package' || definition['category'] === 'tool') ? 'packages' : 'apps',
    workspaceName: options['workspaceName'],
  });

  if (config === undefined) {
    Logger.customize({
      name: 'CliScaffold.run',
      purpose: 'cancelled',
    }).warn('Scaffold cancelled.');

    return;
  }

  if (config['mode'] === 'monorepo' && config['outputDirectory'] === currentDirectory) {
    reportError('A new project must be created in a new directory, not the current working directory. Choose a different --output path. No scaffold files were written.');

    return;
  }

  if (isWindowsReservedPathSegment(config['name']) === true) {
    reportError('The project name must not use a Windows reserved device name (CON, PRN, AUX, NUL, COM1-COM9, or LPT1-LPT9). No scaffold files were written.');

    return;
  }

  if (isWindowsReservedPathSegment(config['workspaceName']) === true) {
    reportError('The workspace name must not use a Windows reserved device name (CON, PRN, AUX, NUL, COM1-COM9, or LPT1-LPT9). No scaffold files were written.');

    return;
  }

  if (LIB_REGEX_PATTERN_SLUG_SIMPLE.test(config['name']) === false) {
    reportError('The project name must be a lowercase slug containing only letters, numbers, hyphens, or underscores. No scaffold files were written.');

    return;
  }

  if (LIB_REGEX_PATTERN_SLUG_SIMPLE.test(config['workspaceName']) === false) {
    reportError('The workspace name must be a lowercase slug containing only letters, numbers, hyphens, or underscores. No scaffold files were written.');

    return;
  }

  const outputRelativePath: Lib_Scaffold_RunScaffold_OutputRelativePath = relative(currentDirectory, config['outputDirectory']);

  if (isWindowsReservedPathSegment(outputRelativePath) === true) {
    reportError('The scaffold output path must not contain a Windows reserved device name (CON, PRN, AUX, NUL, COM1-COM9, or LPT1-LPT9). No scaffold files were written.');

    return;
  }

  if (await pathExists(config['outputDirectory']) === true) {
    if (config['mode'] === 'monorepo') {
      reportError(`The project destination "${resolveDisplayPath(currentDirectory, config['outputDirectory'])}" already exists. A new project scaffold requires a new directory; choose a different --output path. No scaffold files were written.`);
    } else {
      reportError(`The workspace destination "${resolveDisplayPath(currentDirectory, config['outputDirectory'])}" already exists. Choose a different --output path for the new workspace. No scaffold files were written.`);
    }

    return;
  }

  const projectSlug: Lib_Scaffold_RunScaffold_ProjectSlug = config['name'];
  const workspacePackageNameBase: Lib_Scaffold_RunScaffold_WorkspacePackageNameBase = resolveWorkspacePackageName(projectSlug, config['workspaceName'], definition['category']);
  const workspacePackageNamePrefix: Lib_Scaffold_RunScaffold_WorkspacePackageNamePrefix = definition['workspacePackageNamePrefix'] ?? '';
  const workspacePackageName: Lib_Scaffold_RunScaffold_WorkspacePackageName = (workspacePackageNamePrefix !== '' && workspacePackageNameBase.startsWith(workspacePackageNamePrefix) === false) ? `${workspacePackageNamePrefix}${workspacePackageNameBase}` : workspacePackageNameBase;
  const configRoot: Lib_Scaffold_RunScaffold_ConfigRoot = (config['mode'] === 'monorepo') ? config['outputDirectory'] : currentDirectory;
  const configFilePath: Lib_Scaffold_RunScaffold_ConfigFilePath = join(configRoot, 'nova.config.json');
  const rootGitignorePath: Lib_Scaffold_RunScaffold_RootGitignorePath = join(configRoot, '.gitignore');
  const shouldCreateRootGitignore: Lib_Scaffold_RunScaffold_ShouldCreateRootGitignore = config['mode'] === 'workspace' && await pathExists(rootGitignorePath) === false;
  const scaffoldGitignoreEntry: Lib_Scaffold_RunScaffold_ScaffoldGitignoreEntry = (existingRoot === undefined) ? {
    bundles: ['nova'],
    patterns: [],
  } : resolveScaffoldGitignoreEntry(existingRoot['config']);
  const workspaceBaseDirectory: Lib_Scaffold_RunScaffold_WorkspaceBaseDirectory = (definition['category'] === 'package' || definition['category'] === 'tool') ? 'packages' : 'apps';
  const workspaceDirectory: Lib_Scaffold_RunScaffold_WorkspaceDirectory = (config['mode'] === 'monorepo') ? join(configRoot, workspaceBaseDirectory, config['workspaceName']) : config['outputDirectory'];
  const workspaceRelPath: Lib_Scaffold_RunScaffold_WorkspaceRelPath = normalizeWorkspaceRelativePath(configRoot, workspaceDirectory);

  if (workspaceRelPath === undefined) {
    reportError('The workspace output must be a child directory of the monorepo root. No scaffold files were written.');

    return;
  }

  const normalizedWorkspaceRelPath: Lib_Scaffold_RunScaffold_NormalizedWorkspaceRelPath = workspaceRelPath.slice(2);
  const workspaceNameSegments: Lib_Scaffold_RunScaffold_WorkspaceNameSegments = config['workspaceName'].split(LIB_REGEX_PATTERN_NON_ALPHANUMERIC_RUN);
  const workspaceTitle: Lib_Scaffold_RunScaffold_WorkspaceTitle = workspaceNameSegments.map((workspaceNameSegment) => `${workspaceNameSegment.charAt(0).toUpperCase()}${workspaceNameSegment.slice(1)}`).join(' ');
  const workspaceIdentifier: Lib_Scaffold_RunScaffold_WorkspaceIdentifier = workspaceNameSegments.map((workspaceNameSegment) => `${workspaceNameSegment.charAt(0).toUpperCase()}${workspaceNameSegment.slice(1)}`).join('');
  const workspacePolicy: Lib_Scaffold_RunScaffold_WorkspacePolicy = resolveScaffoldPolicy(definition['category']);
  let workspaceVersion: Lib_Scaffold_RunScaffold_WorkspaceVersion = undefined;

  try {
    workspaceVersion = await resolveScaffoldWorkspaceVersion(existingRoot, configRoot, workspacePolicy);
  } catch (error) {
    const errorMessage: Lib_Scaffold_RunScaffold_ErrorMessage = (error instanceof Error) ? error.message : 'Unable to resolve the scaffold workspace version.';

    reportError(`${errorMessage} No scaffold files were written.`);

    return;
  }

  const coreReplacements: Lib_Scaffold_RunScaffold_CoreReplacements = new Map([
    [
      LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
      projectSlug,
    ],
    [
      LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
      workspacePackageName,
    ],
    [
      LIB_REGEX_PLACEHOLDER_WORKSPACE_IDENTIFIER,
      workspaceIdentifier,
    ],
    [
      LIB_REGEX_PLACEHOLDER_WORKSPACE_NAME,
      config['workspaceName'],
    ],
    [
      LIB_REGEX_PLACEHOLDER_WORKSPACE_RELATIVE_PATH,
      normalizedWorkspaceRelPath,
    ],
    [
      LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
      workspaceTitle,
    ],
    [
      LIB_REGEX_PLACEHOLDER_WORKSPACE_VERSION,
      workspaceVersion,
    ],
  ]);

  if (existingRoot !== undefined) {
    const existingWorkspaceEntries: Lib_Scaffold_RunScaffold_ExistingWorkspaceEntries = Object.entries(existingRoot['workspaces']);

    for (const existingWorkspaceEntry of existingWorkspaceEntries) {
      const existingWorkspacePath: Lib_Scaffold_RunScaffold_ExistingWorkspacePath = existingWorkspaceEntry[0];
      const existingWorkspaceValue: Lib_Scaffold_RunScaffold_ExistingWorkspaceValue = existingWorkspaceEntry[1];
      const existingWorkspaceNormalizedPath: Lib_Scaffold_RunScaffold_ExistingWorkspaceNormalizedPath = resolve(configRoot, existingWorkspacePath);

      if (existingWorkspaceNormalizedPath === workspaceDirectory) {
        reportError(`The workspace path "${workspaceRelPath}" is already registered in nova.config.json. No scaffold files were written.`);

        return;
      }

      if (
        existingWorkspaceNormalizedPath !== configRoot
        && (
          workspaceDirectory.startsWith(`${existingWorkspaceNormalizedPath}${sep}`) === true
          || existingWorkspaceNormalizedPath.startsWith(`${workspaceDirectory}${sep}`) === true
        )
      ) {
        reportError(`The workspace path "${workspaceRelPath}" overlaps the registered workspace "${existingWorkspacePath}". Workspaces cannot be nested inside one another. No scaffold files were written.`);

        return;
      }

      if (isPlainObject(existingWorkspaceValue) === false) {
        reportError(`The nova.config.json workspace "${existingWorkspacePath}" must be an object. No scaffold files were written.`);

        return;
      }

      const existingWorkspace: Lib_Scaffold_RunScaffold_ExistingWorkspace = existingWorkspaceValue;
      const existingWorkspaceName: Lib_Scaffold_RunScaffold_ExistingWorkspaceName = existingWorkspace['name'];
      const existingWorkspaceRole: Lib_Scaffold_RunScaffold_ExistingWorkspaceRole = existingWorkspace['role'];

      if (typeof existingWorkspaceName !== 'string' || typeof existingWorkspaceRole !== 'string') {
        reportError(`The nova.config.json workspace "${existingWorkspacePath}" must define string name and role fields. No scaffold files were written.`);

        return;
      }

      if (definition['category'] === 'docs' && existingWorkspaceRole === 'docs') {
        reportError(`A documentation workspace is already registered at "${existingWorkspacePath}". Nova projects support one canonical docs workspace. No scaffold files were written.`);

        return;
      }

      if (existingWorkspaceName === workspacePackageName) {
        reportError(`The workspace package name "${workspacePackageName}" is already registered in nova.config.json. No scaffold files were written.`);

        return;
      }
    }
  }

  const templateResolution: Lib_Scaffold_RunScaffold_TemplateResolution = await resolveTemplateAnswers(options, definition['templateQuestions'] ?? [], isNonInteractive);

  if (templateResolution === undefined) {
    if (process.exitCode !== 1) {
      Logger.customize({
        name: 'CliScaffold.run',
        purpose: 'cancelled',
      }).warn('Scaffold cancelled.');
    }

    return;
  }

  const templateAnswers: Lib_Scaffold_RunScaffold_TemplateAnswers = templateResolution['answers'];
  const templateReplacements: Lib_Scaffold_RunScaffold_TemplateReplacements = templateResolution['replacements'];
  let resolvedReplacements: Lib_Scaffold_RunScaffold_ResolvedReplacements = new Map();
  const templateValidationError: Lib_Scaffold_RunScaffold_TemplateValidationError = (definition['validateTemplateAnswers'] === undefined) ? undefined : definition.validateTemplateAnswers(templateAnswers);

  if (definition['resolveReplacements'] !== undefined) {
    const replacementResolution: Lib_Scaffold_RunScaffold_ReplacementResolution = await definition.resolveReplacements(config['workspaceName']);

    if (replacementResolution === undefined) {
      if (process.exitCode !== 1) {
        Logger.customize({
          name: 'CliScaffold.run',
          purpose: 'cancelled',
        }).warn('Scaffold cancelled.');
      }

      return;
    }

    resolvedReplacements = replacementResolution;
  }

  if (templateValidationError !== undefined) {
    reportError(`${templateValidationError} No scaffold files were written.`);

    return;
  }

  const shouldInstall: Lib_Scaffold_RunScaffold_ShouldInstall = resolveScaffoldInstall(options['install']);
  const environmentVariables: Lib_Scaffold_RunScaffold_EnvironmentVariables = definition['environmentVariables'] ?? [];
  const platforms: Lib_Scaffold_RunScaffold_Platforms = [...new Set([
    ...definition['platforms'],
    ...((definition['resolvePlatforms'] === undefined) ? [] : definition.resolvePlatforms(templateAnswers)),
  ])];
  const allowScriptProfiles: Lib_Scaffold_RunScaffold_AllowScriptProfiles = [
    ...definition['allowScriptProfiles'],
    ...((definition['resolveAllowScriptProfiles'] === undefined) ? [] : definition.resolveAllowScriptProfiles(templateAnswers)),
  ];
  const allowScripts: Lib_Scaffold_RunScaffold_AllowScripts = resolveScaffoldAllowScripts(allowScriptProfiles);
  let existingRootPackageJsonChanged: Lib_Scaffold_RunScaffold_ExistingRootPackageJsonChanged = false;

  if (existingRoot !== undefined) {
    existingRootPackageJsonChanged = mergeScaffoldAllowScripts(existingRoot['packageJson'], allowScripts);
  }

  let packageManagerValue: Lib_Scaffold_RunScaffold_PackageManagerValue = getScaffoldVersion('npmPackageManager');

  if (existingRoot !== undefined) {
    packageManagerValue = existingRoot['packageJson']['packageManager'];
  }

  const packageManagerDescriptor: Lib_Scaffold_RunScaffold_PackageManagerDescriptor = LibCorepack.parsePackageManager(packageManagerValue);

  if (shouldInstall === true && packageManagerDescriptor === undefined) {
    reportError('Installing scaffold dependencies requires an exact npm, pnpm, or Yarn Corepack descriptor in the root package.json "packageManager" field. No scaffold files were written.');

    return;
  }

  let packageManager: Lib_Scaffold_RunScaffold_PackageManager = 'npm';

  if (packageManagerDescriptor !== undefined) {
    packageManager = packageManagerDescriptor['name'];
  }

  const replacements: Lib_Scaffold_RunScaffold_Replacements = new Map([
    ...coreReplacements,
    ...templateReplacements,
    ...resolvedReplacements,
  ]);
  const workspaceTemplateSubpaths: Lib_Scaffold_RunScaffold_WorkspaceTemplateSubpaths = [definition['templateSubpath']];

  if (definition['resolveWorkspaceTemplateSubpaths'] !== undefined) {
    workspaceTemplateSubpaths.push(...definition.resolveWorkspaceTemplateSubpaths(templateAnswers));
  }

  const workspaceTemplateDirectories: Lib_Scaffold_RunScaffold_WorkspaceTemplateDirectories = workspaceTemplateSubpaths.map((workspaceTemplateSubpath) => resolveTemplatePath(definition['importMetaUrl'], workspaceTemplateSubpath));
  const workspacePlannedPathGroups: Lib_Scaffold_RunScaffold_WorkspacePlannedPathGroups = await Promise.all(workspaceTemplateDirectories.map(async (workspaceTemplateDirectory) => {
    const templateEntries: Lib_Scaffold_RunScaffold_TemplateEntries = await collectFiles(workspaceTemplateDirectory, '');

    return templateEntries.map((templateEntry) => join(workspaceDirectory, applyTemplateReplacements(templateEntry, replacements)));
  }));
  const rootTemplateSubpaths: Lib_Scaffold_RunScaffold_RootTemplateSubpaths = [];

  if (definition['rootTemplateSubpath'] !== undefined) {
    rootTemplateSubpaths.push(definition['rootTemplateSubpath']);
  }

  if (definition['resolveRootTemplateSubpaths'] !== undefined) {
    rootTemplateSubpaths.push(...definition.resolveRootTemplateSubpaths(templateAnswers));
  }

  const rootTemplateDirectories: Lib_Scaffold_RunScaffold_RootTemplateDirectories = rootTemplateSubpaths.map((rootTemplateSubpath) => resolveTemplatePath(definition['importMetaUrl'], rootTemplateSubpath));
  const rootPlannedPathGroups: Lib_Scaffold_RunScaffold_RootPlannedPathGroups = await Promise.all(rootTemplateDirectories.map(async (rootTemplateDirectory) => {
    const rootTemplateEntries: Lib_Scaffold_RunScaffold_RootTemplateEntries = await collectFiles(rootTemplateDirectory, '');

    return rootTemplateEntries.map((rootTemplateEntry) => join(configRoot, applyTemplateReplacements(rootTemplateEntry, replacements)));
  }));
  const plannedPaths: Lib_Scaffold_RunScaffold_PlannedPaths = [
    ...workspacePlannedPathGroups.flat(),
    ...rootPlannedPathGroups.flat(),
  ];

  if (config['mode'] === 'monorepo') {
    plannedPaths.push(...await getMonorepoRootPlannedPaths(configRoot));
  }

  const conflictingPaths: Lib_Scaffold_RunScaffold_ConflictingPaths = await findFileConflicts(plannedPaths);

  if (conflictingPaths.length > 0) {
    const conflictMessage: Lib_Scaffold_RunScaffold_ConflictMessage = conflictingPaths.map((conflictingPath) => relative(configRoot, conflictingPath)).join(', ');

    reportError(`Scaffolding found existing files at paths it needs to create: ${conflictMessage}. Move those files or choose a different destination, then run the command again. No scaffold files were written.`);

    return;
  }

  let isWorkspaceCovered: Lib_Scaffold_RunScaffold_IsWorkspaceCovered = existingRoot === undefined;

  if (existingRoot !== undefined) {
    for (const workspacePattern of existingRoot['workspacePatterns']) {
      const normalizedWorkspacePattern: Lib_Scaffold_RunScaffold_NormalizedWorkspacePattern = (workspacePattern.startsWith('./') === true) ? workspacePattern.slice(2) : workspacePattern;

      if (minimatch(normalizedWorkspaceRelPath, normalizedWorkspacePattern, { dot: true }) === true) {
        isWorkspaceCovered = true;

        break;
      }
    }
  }

  const destination: Lib_Scaffold_RunScaffold_Destination = resolveDisplayPath(currentDirectory, workspaceDirectory);
  const projectRoot: Lib_Scaffold_RunScaffold_ProjectRoot = resolveDisplayPath(currentDirectory, configRoot);
  const primaryScript: Lib_Scaffold_RunScaffold_PrimaryScript = definition['primaryScript'] ?? 'dev';
  let presentationOptions: Lib_Scaffold_RunScaffold_PresentationOptions = [];

  if (definition['resolvePresentationOptions'] !== undefined) {
    presentationOptions = definition.resolvePresentationOptions(config['workspaceName']);
  }

  if (shouldCreateRootGitignore === true) {
    presentationOptions.push({
      flag: 'Root .gitignore',
      value: 'Generate missing file',
    });
  }

  presentationOptions.push({
    flag: 'Dependencies',
    value: (shouldInstall === true) ? `Install with ${packageManager}` : 'Skip installation',
  });

  reportScaffoldPlan({
    additionalOptions: presentationOptions,
    answers: templateAnswers,
    displayName: definition['displayName'],
    destination,
    mode: config['mode'],
    project: projectSlug,
    questions: definition['templateQuestions'] ?? [],
    workspacePackageName,
  });

  const confirmed: Lib_Scaffold_RunScaffold_Confirmed = await confirmScaffoldPlan(isNonInteractive, isDryRun);

  if (confirmed === false) {
    Logger.customize({
      name: 'CliScaffold.run',
      purpose: 'cancelled',
    }).warn('Scaffold cancelled. No files were written.');

    return;
  }

  if (isDryRun === true) {
    if (config['mode'] === 'monorepo') {
      Logger.customize({
        name: 'CliScaffold.run',
        purpose: 'dryRunRoot',
      }).info(`Would create monorepo root at "${configRoot}".`);
    } else if (shouldCreateRootGitignore === true) {
      Logger.customize({
        name: 'CliScaffold.run',
        purpose: 'dryRunGitignore',
      }).info(`Would create the missing root .gitignore at "${rootGitignorePath}".`);
    }

    Logger.customize({
      name: 'CliScaffold.run',
      purpose: 'dryRunWorkspace',
    }).info(`Would create workspace at "${workspaceDirectory}" and register "${workspaceRelPath}".`);

    Logger.customize({
      name: 'CliScaffold.run',
      purpose: 'dryRunDotenv',
    }).info(`Would create Nova's baseline .env and .env.sample files at "${workspaceDirectory}".`);

    if (rootTemplateDirectories.length > 0) {
      Logger.customize({
        name: 'CliScaffold.run',
        purpose: 'dryRunRootFiles',
      }).info(`Would create companion files at the monorepo root "${configRoot}".`);
    }

    if (existingRoot !== undefined && isWorkspaceCovered === false) {
      Logger.customize({
        name: 'CliScaffold.run',
        purpose: 'dryRunWorkspaces',
      }).info(`Would add "${normalizedWorkspaceRelPath}" to the root package.json workspaces.`);
    }

    if (existingRoot !== undefined && existingRootPackageJsonChanged === true) {
      Logger.customize({
        name: 'CliScaffold.run',
        purpose: 'dryRunAllowScripts',
      }).info('Would add the scaffold\'s missing lifecycle-script decisions to the root package.json allowScripts policy.');
    }

    reportScaffoldCompletion({
      completionNotes: definition['completionNotes'] ?? [],
      dependenciesInstalled: false,
      displayName: definition['displayName'],
      dryRun: true,
      packageManager,
      primaryScript,
      projectRoot,
      shouldConfigure: config['mode'] === 'monorepo',
      workspacePackageName,
    });

    return;
  }

  const progressTotal: Lib_Scaffold_RunScaffold_ProgressTotal = 3
    + ((config['mode'] === 'monorepo') ? 1 : 0)
    + ((shouldCreateRootGitignore === true) ? 1 : 0)
    + ((shouldInstall === true) ? 1 : 0);
  const progress: Lib_Scaffold_RunScaffold_Progress = createScaffoldProgress(progressTotal);

  // Create monorepo root structure if needed.
  if (config['mode'] === 'monorepo') {
    progress.start('Preparing monorepo root', projectRoot);

    await createMonorepoRoot(configRoot, projectSlug, platforms, allowScripts);

    await progress.complete();
  }

  if (shouldCreateRootGitignore === true) {
    progress.start('Generating root .gitignore', projectRoot);

    if (await pathExists(rootGitignorePath) === false) {
      await writeScaffoldGitignore(configRoot, scaffoldGitignoreEntry);
    }

    await progress.complete();
  }

  progress.start(`Writing ${definition['displayName']} workspace`, destination);

  await fs.mkdir(workspaceDirectory, { recursive: true });

  const workspaceTemplateWrites: Lib_Scaffold_RunScaffold_WorkspaceTemplateWrites = workspaceTemplateDirectories.map((workspaceTemplateDirectory) => writeTemplateFiles(workspaceTemplateDirectory, workspaceDirectory, replacements));
  const rootTemplateWrites: Lib_Scaffold_RunScaffold_RootTemplateWrites = rootTemplateDirectories.map((rootTemplateDirectory) => writeTemplateFiles(rootTemplateDirectory, configRoot, replacements));

  await Promise.all([
    ...workspaceTemplateWrites,
    ...rootTemplateWrites,
  ]);

  if (definition['workspaceFinalizer'] !== undefined) {
    try {
      await definition.workspaceFinalizer(workspaceDirectory, config['workspaceName'], configRoot, templateAnswers, replacements);
    } catch (error) {
      const workspaceFinalizerError: Lib_Scaffold_RunScaffold_WorkspaceFinalizerError = error;

      Logger.customize({
        name: 'CliScaffold.run',
        purpose: 'workspaceFinalizer',
      }).debug(workspaceFinalizerError);

      progress.clear();

      reportError(`The ${definition['typeName']} framework could not finish preparing the workspace. The generated files were left in place for inspection, but the workspace was not registered.`);

      return;
    }
  }

  if (existingRoot !== undefined && isWorkspaceCovered === false) {
    existingRoot['workspacePatterns'].push(normalizedWorkspaceRelPath);

    const rootWorkspacesValue: Lib_Scaffold_RunScaffold_RootWorkspacesValue = existingRoot['packageJson']['workspaces'];

    if (isPlainObject(rootWorkspacesValue) === true) {
      const rootWorkspacesObject: Lib_Scaffold_RunScaffold_RootWorkspacesObject = rootWorkspacesValue;

      Reflect.set(rootWorkspacesObject, 'packages', existingRoot['workspacePatterns']);
    } else {
      Reflect.set(existingRoot['packageJson'], 'workspaces', existingRoot['workspacePatterns']);
    }

    existingRootPackageJsonChanged = true;
  }

  if (existingRoot !== undefined && existingRootPackageJsonChanged === true) {
    const rootPackageJsonPath: Lib_Scaffold_RunScaffold_RootPackageJsonPath = join(configRoot, 'package.json');
    const rootPackageJsonContents: Lib_Scaffold_RunScaffold_RootPackageJsonContents = `${JSON.stringify(existingRoot['packageJson'], null, 2)}\n`;

    await fs.writeFile(rootPackageJsonPath, rootPackageJsonContents, 'utf-8');
  }

  if (definition['projectFinalizer'] !== undefined) {
    try {
      await definition.projectFinalizer(workspaceDirectory, config['workspaceName'], configRoot, templateAnswers, replacements);
    } catch (error) {
      const projectFinalizerError: Lib_Scaffold_RunScaffold_ProjectFinalizerError = error;

      Logger.customize({
        name: 'CliScaffold.run',
        purpose: 'projectFinalizer',
      }).debug(projectFinalizerError);

      progress.clear();

      reportError(`The ${definition['typeName']} framework could not finish preparing the project. The generated files were left in place for inspection, but the workspace was not registered.`);

      return;
    }
  }

  await progress.complete();

  progress.start('Registering workspace', workspacePackageName);

  await registerWorkspaceInConfig(configFilePath, workspaceRelPath, workspacePackageName, config['workspaceName'], definition['category'], environmentVariables, platforms);

  await progress.complete();

  progress.start('Generating environment files', destination);

  const registeredConfig: Lib_Scaffold_RunScaffold_RegisteredConfig = await new LibNovaConfig().load(configRoot);
  const environment: Lib_Scaffold_RunScaffold_Environment = registeredConfig['environment'];
  const profilesEnabled: Lib_Scaffold_RunScaffold_ProfilesEnabled = environment !== undefined
    && environment['profiles'] !== undefined
    && environment['profiles']['enabled'] === true;

  await writeDotenvFiles({
    report: false,
    targetDirectory: workspaceDirectory,
    variables: environmentVariables,
    profilesEnabled,
  });

  await progress.complete();

  let installSucceeded: Lib_Scaffold_RunScaffold_InstallSucceeded = false;

  if (shouldInstall === true) {
    progress.start(`Installing dependencies with ${packageManager}`, projectRoot);

    const installResult: Lib_Scaffold_RunScaffold_InstallResult = await installScaffoldDependencies(configRoot, packageManager);

    if (installResult['succeeded'] === false) {
      progress.clear();

      const installOutput: Lib_Scaffold_RunScaffold_InstallOutput = installResult['output'].trim();

      if (installOutput !== '') {
        process.stderr.write(`\n${installOutput}\n`);
      }

      reportError(`Dependency installation failed. The scaffold files remain available at "${configRoot}". Run "${packageManager} install" from that directory after resolving the package-manager error.`);

      return;
    }

    installSucceeded = true;

    await progress.complete();
  }

  progress.finish(`${definition['displayName']} scaffold ready`);

  reportScaffoldCompletion({
    completionNotes: definition['completionNotes'] ?? [],
    dependenciesInstalled: installSucceeded,
    displayName: definition['displayName'],
    dryRun: false,
    packageManager,
    primaryScript,
    projectRoot,
    shouldConfigure: config['mode'] === 'monorepo',
    workspacePackageName,
  });

  return;
}
