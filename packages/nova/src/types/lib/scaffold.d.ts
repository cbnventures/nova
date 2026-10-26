import type { ChildProcess } from 'node:child_process';
import type {
  Dirent,
  Stats,
} from 'node:fs';

import type { PromptObject } from 'prompts';

import type {
  Shared_CorepackCommand,
  Shared_CorepackPackageManager,
  Shared_CorepackPackageManagerDescriptor,
  Shared_CorepackSpawnInvocation,
  Shared_MonorepoContext,
  Shared_NovaConfig_IgnoreFile,
  Shared_NovaConfig_IgnoreFile_Bundles,
  Shared_NovaConfig_IgnoreFile_Patterns,
  Shared_NovaConfig_IgnoreFiles,
  Shared_NovaConfig_Project_Platforms,
  Shared_NovaConfig_RecipeEntry,
  Shared_NovaConfig_Recipes,
  Shared_NovaConfig_Recipes_PackageJson,
  Shared_NovaConfig_Recipes_PackageJsonWorkspace,
  Shared_NovaConfig_Urls,
  Shared_NovaConfigEnvironmentValue,
  Shared_NovaConfigSettings_VersionStrategy,
  Shared_NovaConfigWorkspace_Policy,
  Shared_ScaffoldConfig,
  Shared_ScaffoldExistingRoot,
  Shared_ScaffoldTemplateQuestionChoice,
  Shared_ScaffoldTemplateQuestions,
  Shared_ScaffoldTemplateResolution,
  Shared_ScaffoldTemplateResolution_Answers,
} from '../shared.d.ts';

/**
 * Lib - Scaffold - Apply Template Replacements.
 *
 * @since 0.29.0
 */
export type Lib_Scaffold_ApplyTemplateReplacements_Input = string;

export type Lib_Scaffold_ApplyTemplateReplacements_Replacements = Map<RegExp, string>;

export type Lib_Scaffold_ApplyTemplateReplacements_Returns = string;

export type Lib_Scaffold_ApplyTemplateReplacements_Output = string;

export type Lib_Scaffold_ApplyTemplateReplacements_Pattern = RegExp;

export type Lib_Scaffold_ApplyTemplateReplacements_Value = string;

/**
 * Lib - Scaffold - Collect Files.
 *
 * @since 0.15.0
 */
export type Lib_Scaffold_CollectFiles_Directory = string;

export type Lib_Scaffold_CollectFiles_Prefix = string;

export type Lib_Scaffold_CollectFiles_Returns = Promise<string[]>;

export type Lib_Scaffold_CollectFiles_Entries = Dirent[];

export type Lib_Scaffold_CollectFiles_Files = string[];

export type Lib_Scaffold_CollectFiles_EntryPath = string;

export type Lib_Scaffold_CollectFiles_NestedDirectory = string;

export type Lib_Scaffold_CollectFiles_Nested = string[];

/**
 * Lib - Scaffold - Create Monorepo Root.
 *
 * @since 0.15.0
 */
export type Lib_Scaffold_CreateMonorepoRoot_OutputDirectory = string;

export type Lib_Scaffold_CreateMonorepoRoot_ProjectSlug = string;

export type Lib_Scaffold_CreateMonorepoRoot_Platforms = Shared_NovaConfig_Project_Platforms;

export type Lib_Scaffold_CreateMonorepoRoot_AllowScripts = Record<string, boolean>;

export type Lib_Scaffold_CreateMonorepoRoot_Returns = Promise<void>;

export type Lib_Scaffold_CreateMonorepoRoot_CurrentDirectory = string;

export type Lib_Scaffold_CreateMonorepoRoot_AppsDirectory = string;

export type Lib_Scaffold_CreateMonorepoRoot_PackagesDirectory = string;

export type Lib_Scaffold_CreateMonorepoRoot_PackageJsonContent = Record<string, unknown>;

export type Lib_Scaffold_CreateMonorepoRoot_PackageJson = string;

export type Lib_Scaffold_CreateMonorepoRoot_PackageJsonContents = string;

export type Lib_Scaffold_CreateMonorepoRoot_PackageJsonPath = string;

export type Lib_Scaffold_CreateMonorepoRoot_PackageJsonRelativePath = string;

export type Lib_Scaffold_CreateMonorepoRoot_ProjectTitle = string;

export type Lib_Scaffold_CreateMonorepoRoot_NovaConfigContent = Record<string, unknown>;

export type Lib_Scaffold_CreateMonorepoRoot_NovaConfig = string;

export type Lib_Scaffold_CreateMonorepoRoot_NovaConfigContents = string;

export type Lib_Scaffold_CreateMonorepoRoot_NovaConfigPath = string;

export type Lib_Scaffold_CreateMonorepoRoot_NovaConfigRelativePath = string;

export type Lib_Scaffold_CreateMonorepoRoot_RootTemplateDirectory = string;

export type Lib_Scaffold_CreateMonorepoRoot_Replacements = Map<RegExp, string>;

/**
 * Lib - Scaffold - Create Workspace Directory.
 *
 * @since 0.15.0
 */
export type Lib_Scaffold_CreateWorkspaceDirectory_BasePath = string;

export type Lib_Scaffold_CreateWorkspaceDirectory_WorkspaceName = string;

export type Lib_Scaffold_CreateWorkspaceDirectory_Returns = Promise<string>;

export type Lib_Scaffold_CreateWorkspaceDirectory_WorkspaceDirectory = string;

/**
 * Lib - Scaffold - Detect Monorepo Context.
 *
 * @since 0.15.0
 */
export type Lib_Scaffold_DetectMonorepoContext_CurrentWorkingDirectory = string;

export type Lib_Scaffold_DetectMonorepoContext_Returns = Promise<Shared_MonorepoContext>;

export type Lib_Scaffold_DetectMonorepoContext_Locations = string[];

export type Lib_Scaffold_DetectMonorepoContext_PackageJsonPath = string;

export type Lib_Scaffold_DetectMonorepoContext_ParsedPackageJson = Record<string, unknown>;

export type Lib_Scaffold_DetectMonorepoContext_PackageJsonRaw = string;

/**
 * Lib - Scaffold - Find File Conflicts.
 *
 * @since 0.26.0
 */
export type Lib_Scaffold_FindFileConflicts_PlannedPaths = string[];

export type Lib_Scaffold_FindFileConflicts_Returns = Promise<string[]>;

export type Lib_Scaffold_FindFileConflicts_Exists = boolean[];

/**
 * Lib - Scaffold - Get Monorepo Root Planned Paths.
 *
 * @since 0.29.0
 */
export type Lib_Scaffold_GetMonorepoRootPlannedPaths_OutputDirectory = string;

export type Lib_Scaffold_GetMonorepoRootPlannedPaths_Returns = Promise<string[]>;

export type Lib_Scaffold_GetMonorepoRootPlannedPaths_TemplateDirectory = string;

export type Lib_Scaffold_GetMonorepoRootPlannedPaths_TemplateEntries = string[];

/**
 * Lib - Scaffold - Install Scaffold Dependencies.
 *
 * @since 0.31.0
 */
export type Lib_Scaffold_InstallScaffoldDependencies_RootDirectory = string;

export type Lib_Scaffold_InstallScaffoldDependencies_PackageManager = Shared_CorepackPackageManager;

export type Lib_Scaffold_InstallScaffoldDependencies_ReturnValue_Output = string;

export type Lib_Scaffold_InstallScaffoldDependencies_ReturnValue_Succeeded = boolean;

export type Lib_Scaffold_InstallScaffoldDependencies_ReturnValue = {
  output: Lib_Scaffold_InstallScaffoldDependencies_ReturnValue_Output;
  succeeded: Lib_Scaffold_InstallScaffoldDependencies_ReturnValue_Succeeded;
};

export type Lib_Scaffold_InstallScaffoldDependencies_Returns = Promise<Lib_Scaffold_InstallScaffoldDependencies_ReturnValue>;

export type Lib_Scaffold_InstallScaffoldDependencies_Invocation_Command = Shared_CorepackCommand;

export type Lib_Scaffold_InstallScaffoldDependencies_Invocation_CommandArguments = string[];

export type Lib_Scaffold_InstallScaffoldDependencies_Invocation = {
  command: Lib_Scaffold_InstallScaffoldDependencies_Invocation_Command;
  commandArguments: Lib_Scaffold_InstallScaffoldDependencies_Invocation_CommandArguments;
};

export type Lib_Scaffold_InstallScaffoldDependencies_SpawnInvocation = Shared_CorepackSpawnInvocation;

export type Lib_Scaffold_InstallScaffoldDependencies_Command = string;

export type Lib_Scaffold_InstallScaffoldDependencies_CommandArguments = string[];

export type Lib_Scaffold_InstallScaffoldDependencies_Output = string;

export type Lib_Scaffold_InstallScaffoldDependencies_Executor_PromiseResolve_Value_Output = string;

export type Lib_Scaffold_InstallScaffoldDependencies_Executor_PromiseResolve_Value_Succeeded = boolean;

export type Lib_Scaffold_InstallScaffoldDependencies_Executor_PromiseResolve_Value = {
  output: Lib_Scaffold_InstallScaffoldDependencies_Executor_PromiseResolve_Value_Output;
  succeeded: Lib_Scaffold_InstallScaffoldDependencies_Executor_PromiseResolve_Value_Succeeded;
};

export type Lib_Scaffold_InstallScaffoldDependencies_Executor_PromiseResolve = (value: Lib_Scaffold_InstallScaffoldDependencies_Executor_PromiseResolve_Value) => void;

export type Lib_Scaffold_InstallScaffoldDependencies_Executor_Returns = void;

export type Lib_Scaffold_InstallScaffoldDependencies_Executor = (promiseResolve: Lib_Scaffold_InstallScaffoldDependencies_Executor_PromiseResolve) => Lib_Scaffold_InstallScaffoldDependencies_Executor_Returns;

export type Lib_Scaffold_InstallScaffoldDependencies_Executor_ChildProcess = ChildProcess;

/**
 * Lib - Scaffold - Install Scaffold Dependencies - Executor - Append Output.
 *
 * @since 0.31.0
 */
export type Lib_Scaffold_InstallScaffoldDependencies_Executor_AppendOutput_Chunk = unknown;

export type Lib_Scaffold_InstallScaffoldDependencies_Executor_AppendOutput_Returns = void;

export type Lib_Scaffold_InstallScaffoldDependencies_Executor_AppendOutput = (chunk: Lib_Scaffold_InstallScaffoldDependencies_Executor_AppendOutput_Chunk) => Lib_Scaffold_InstallScaffoldDependencies_Executor_AppendOutput_Returns;

/**
 * Lib - Scaffold - Install Scaffold Dependencies - Executor - Handle Close.
 *
 * @since 0.31.0
 */
export type Lib_Scaffold_InstallScaffoldDependencies_Executor_HandleClose_Code = number | null;

export type Lib_Scaffold_InstallScaffoldDependencies_Executor_HandleClose_Returns = void;

export type Lib_Scaffold_InstallScaffoldDependencies_Executor_HandleClose = (code: Lib_Scaffold_InstallScaffoldDependencies_Executor_HandleClose_Code) => Lib_Scaffold_InstallScaffoldDependencies_Executor_HandleClose_Returns;

/**
 * Lib - Scaffold - Install Scaffold Dependencies - Executor - Handle Error.
 *
 * @since 0.31.0
 */
export type Lib_Scaffold_InstallScaffoldDependencies_Executor_HandleError_Error = Error;

export type Lib_Scaffold_InstallScaffoldDependencies_Executor_HandleError_Returns = void;

export type Lib_Scaffold_InstallScaffoldDependencies_Executor_HandleError = (error: Lib_Scaffold_InstallScaffoldDependencies_Executor_HandleError_Error) => Lib_Scaffold_InstallScaffoldDependencies_Executor_HandleError_Returns;

/**
 * Lib - Scaffold - Is Windows Reserved Path Segment.
 *
 * @since 0.34.0
 */
export type Lib_Scaffold_IsWindowsReservedPathSegment_Value = string;

export type Lib_Scaffold_IsWindowsReservedPathSegment_Returns = boolean;

export type Lib_Scaffold_IsWindowsReservedPathSegment_NormalizedPath = string;

export type Lib_Scaffold_IsWindowsReservedPathSegment_Segments = string[];

export type Lib_Scaffold_IsWindowsReservedPathSegment_NormalizedSegment = string;

export type Lib_Scaffold_IsWindowsReservedPathSegment_SegmentWithoutStream = string;

export type Lib_Scaffold_IsWindowsReservedPathSegment_BaseName = string;

export type Lib_Scaffold_IsWindowsReservedPathSegment_DevicePrefix = string;

export type Lib_Scaffold_IsWindowsReservedPathSegment_DeviceNumber = string;

/**
 * Lib - Scaffold - Load Existing Root.
 *
 * @since 0.26.0
 */
export type Lib_Scaffold_LoadExistingRoot_RootDirectory = string;

export type Lib_Scaffold_LoadExistingRoot_Returns = Promise<Shared_ScaffoldExistingRoot | undefined>;

export type Lib_Scaffold_LoadExistingRoot_PackageJsonPath = string;

export type Lib_Scaffold_LoadExistingRoot_ConfigFilePath = string;

export type Lib_Scaffold_LoadExistingRoot_ParsedPackageJson = unknown;

export type Lib_Scaffold_LoadExistingRoot_PackageJsonRaw = string;

export type Lib_Scaffold_LoadExistingRoot_PackageJson = Record<string, unknown>;

export type Lib_Scaffold_LoadExistingRoot_WorkspacesValue = unknown;

export type Lib_Scaffold_LoadExistingRoot_WorkspacePatterns = string[] | undefined;

export type Lib_Scaffold_LoadExistingRoot_WorkspacePatternsResolved = string[];

export type Lib_Scaffold_LoadExistingRoot_WorkspacesObject = Record<string, unknown>;

export type Lib_Scaffold_LoadExistingRoot_WorkspacePatternsValue = unknown;

export type Lib_Scaffold_LoadExistingRoot_ParsedConfig = unknown;

export type Lib_Scaffold_LoadExistingRoot_ConfigRaw = string;

export type Lib_Scaffold_LoadExistingRoot_Config = Record<string, unknown>;

export type Lib_Scaffold_LoadExistingRoot_ProjectValue = unknown;

export type Lib_Scaffold_LoadExistingRoot_Project = Record<string, unknown>;

export type Lib_Scaffold_LoadExistingRoot_ProjectNameValue = unknown;

export type Lib_Scaffold_LoadExistingRoot_ProjectName = Record<string, unknown>;

export type Lib_Scaffold_LoadExistingRoot_ProjectSlugValue = unknown;

export type Lib_Scaffold_LoadExistingRoot_ProjectSlug = string;

export type Lib_Scaffold_LoadExistingRoot_ConfigWorkspacesValue = unknown;

export type Lib_Scaffold_LoadExistingRoot_ConfigWorkspaces = Record<string, unknown>;

/**
 * Lib - Scaffold - Normalize Workspace Relative Path.
 *
 * @since 0.26.0
 */
export type Lib_Scaffold_NormalizeWorkspaceRelativePath_RootDirectory = string;

export type Lib_Scaffold_NormalizeWorkspaceRelativePath_WorkspaceDirectory = string;

export type Lib_Scaffold_NormalizeWorkspaceRelativePath_Returns = string | undefined;

export type Lib_Scaffold_NormalizeWorkspaceRelativePath_RelativePath = string;

export type Lib_Scaffold_NormalizeWorkspaceRelativePath_NormalizedPath = string;

/**
 * Lib - Scaffold - Prompt Scaffold Options.
 *
 * @since 0.15.0
 */
export type Lib_Scaffold_PromptScaffoldOptions_Context = Shared_MonorepoContext;

export type Lib_Scaffold_PromptScaffoldOptions_Defaults_Name = string | undefined;

export type Lib_Scaffold_PromptScaffoldOptions_Defaults_Output = string | undefined;

export type Lib_Scaffold_PromptScaffoldOptions_Defaults_TypeName = string;

export type Lib_Scaffold_PromptScaffoldOptions_Defaults_WorkspaceBaseDirectory = 'apps' | 'packages';

export type Lib_Scaffold_PromptScaffoldOptions_Defaults_WorkspaceName = string | undefined;

export type Lib_Scaffold_PromptScaffoldOptions_Defaults = {
  name: Lib_Scaffold_PromptScaffoldOptions_Defaults_Name;
  output: Lib_Scaffold_PromptScaffoldOptions_Defaults_Output;
  typeName: Lib_Scaffold_PromptScaffoldOptions_Defaults_TypeName;
  workspaceBaseDirectory: Lib_Scaffold_PromptScaffoldOptions_Defaults_WorkspaceBaseDirectory;
  workspaceName: Lib_Scaffold_PromptScaffoldOptions_Defaults_WorkspaceName;
};

export type Lib_Scaffold_PromptScaffoldOptions_Returns = Promise<Shared_ScaffoldConfig | undefined>;

export type Lib_Scaffold_PromptScaffoldOptions_CurrentDirectory = string;

export type Lib_Scaffold_PromptScaffoldOptions_Cancelled = boolean;

export type Lib_Scaffold_PromptScaffoldOptions_MonorepoNameValue = string | undefined;

export type Lib_Scaffold_PromptScaffoldOptions_MonorepoOutputValue = string | undefined;

export type Lib_Scaffold_PromptScaffoldOptions_MonorepoWorkspaceNameValue = string | undefined;

export type Lib_Scaffold_PromptScaffoldOptions_MonorepoQuestions = PromptObject<string>[];

export type Lib_Scaffold_PromptScaffoldOptions_MonorepoPromptsAnswers = Record<string, unknown>;

export type Lib_Scaffold_PromptScaffoldOptions_MonorepoResolvedName = string;

export type Lib_Scaffold_PromptScaffoldOptions_MonorepoResolvedWorkspaceName = string;

export type Lib_Scaffold_PromptScaffoldOptions_ResolvedOutputDirectory = string;

export type Lib_Scaffold_PromptScaffoldOptions_NameValue = string | undefined;

export type Lib_Scaffold_PromptScaffoldOptions_OutputValue = string | undefined;

export type Lib_Scaffold_PromptScaffoldOptions_WorkspaceNameValue = string | undefined;

export type Lib_Scaffold_PromptScaffoldOptions_Questions = PromptObject<string>[];

export type Lib_Scaffold_PromptScaffoldOptions_InitialPrev = string;

export type Lib_Scaffold_PromptScaffoldOptions_InitialAnswers = Record<string, string>;

export type Lib_Scaffold_PromptScaffoldOptions_ResolveInitialOutput = (initialPrev: Lib_Scaffold_PromptScaffoldOptions_InitialPrev, initialAnswers: Lib_Scaffold_PromptScaffoldOptions_InitialAnswers) => Lib_Scaffold_PromptScaffoldOptions_ResolveInitialOutput_Returns;

export type Lib_Scaffold_PromptScaffoldOptions_ResolveInitialOutput_Returns = string;

export type Lib_Scaffold_PromptScaffoldOptions_PromptsAnswers = Record<string, unknown>;

export type Lib_Scaffold_PromptScaffoldOptions_ResolvedName = string;

export type Lib_Scaffold_PromptScaffoldOptions_ResolvedWorkspaceName = string;

export type Lib_Scaffold_PromptScaffoldOptions_ResolvedOutput = string;

/**
 * Lib - Scaffold - Prompt Scaffold Options - Resolve Initial Output.
 *
 * @since 0.15.0
 */
export type Lib_Scaffold_PromptScaffoldOptions_ResolveInitialOutput_ResolvedInitialWorkspaceName = string;

/**
 * Lib - Scaffold - Register Workspace In Config.
 *
 * @since 0.15.0
 */
export type Lib_Scaffold_RegisterWorkspaceInConfig_ConfigFilePath = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_WorkspaceRelPath = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_WorkspacePackageName = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_WorkspaceName = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Category = 'app' | 'docs' | 'package' | 'tool';

export type Lib_Scaffold_RegisterWorkspaceInConfig_EnvironmentVariables = Shared_NovaConfigEnvironmentValue[];

export type Lib_Scaffold_RegisterWorkspaceInConfig_Platforms = Shared_NovaConfig_Project_Platforms;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Returns = Promise<void>;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ParsedConfig = Record<string, unknown> | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Raw = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Project = Record<string, unknown> | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ProjectName = Record<string, unknown> | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ProjectSlug = string | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ParsedPlatforms = Shared_NovaConfig_Project_Platforms | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_PlatformsMerged = Shared_NovaConfig_Project_Platforms;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Role = 'app' | 'docs' | 'package' | 'tool';

export type Lib_Scaffold_RegisterWorkspaceInConfig_Policy = 'distributable' | 'freezable' | 'trackable';

export type Lib_Scaffold_RegisterWorkspaceInConfig_ConfigName = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ParsedWorkspaces = Lib_Scaffold_RegisterWorkspaceInConfig_Workspaces | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Workspaces = Record<string, unknown>;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ParsedUrls = Shared_NovaConfig_Urls | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Urls = Shared_NovaConfig_Urls;

export type Lib_Scaffold_RegisterWorkspaceInConfig_DocumentationUrl = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ParsedRecipes = Shared_NovaConfig_Recipes | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Recipes = Shared_NovaConfig_Recipes;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ParsedPackageJsonRecipes = Shared_NovaConfig_Recipes_PackageJson | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_PackageJsonRecipes = Shared_NovaConfig_Recipes_PackageJson;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ParsedIgnoreFiles = Shared_NovaConfig_IgnoreFiles | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_IgnoreFiles = Shared_NovaConfig_IgnoreFiles;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ConfigRoot = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_WorkspaceDirectory = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_DockerignorePath = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_DockerignoreConfigPath = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_AssetsignorePath = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_AssetsignoreConfigPath = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ParsedEnvironment = Lib_Scaffold_RegisterWorkspaceInConfig_Environment | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Environment = Record<string, unknown>;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ParsedEnvironmentWorkspaces = Lib_Scaffold_RegisterWorkspaceInConfig_EnvironmentWorkspaces | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_EnvironmentWorkspaces = Record<string, unknown>;

export type Lib_Scaffold_RegisterWorkspaceInConfig_EnvironmentWorkspace = Record<string, unknown>;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Json = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_JsonContents = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_NormalizedConfig = Record<string, unknown>;

/**
 * Lib - Scaffold - Report Error.
 *
 * @since 0.26.0
 */
export type Lib_Scaffold_ReportError_Message = string;

export type Lib_Scaffold_ReportError_Returns = void;

/**
 * Lib - Scaffold - Resolve Monorepo Root Template Directory.
 *
 * @since 0.29.0
 */
export type Lib_Scaffold_ResolveMonorepoRootTemplateDirectory_Returns = string;

export type Lib_Scaffold_ResolveMonorepoRootTemplateDirectory_CurrentDirectory = string;

/**
 * Lib - Scaffold - Resolve Scaffold Environment Prefix.
 *
 * @since 0.31.0
 */
export type Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_Environment = Record<string, unknown>;

export type Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_WorkspaceName = string;

export type Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_Returns = string;

export type Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_ExistingPrefixes = string[];

export type Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_ScopeValue = unknown;

export type Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_Scope = Record<string, unknown>;

export type Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_EntryValue = unknown;

export type Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_EntryValues = Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_EntryValue[];

export type Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_Entry = Record<string, unknown>;

export type Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_PrefixValue = unknown;

export type Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_BasePrefix = string;

export type Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_Candidate = string;

export type Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_CandidateIndex = number;

export type Lib_Scaffold_ResolveScaffoldEnvironmentPrefix_HasConflict = boolean;

/**
 * Lib - Scaffold - Resolve Scaffold Gitignore Entry.
 *
 * @since 0.32.0
 */
export type Lib_Scaffold_ResolveScaffoldGitignoreEntry_Config = Record<string, unknown>;

export type Lib_Scaffold_ResolveScaffoldGitignoreEntry_Returns = Shared_NovaConfig_IgnoreFile;

export type Lib_Scaffold_ResolveScaffoldGitignoreEntry_IgnoreFilesValue = unknown;

export type Lib_Scaffold_ResolveScaffoldGitignoreEntry_IgnoreFiles = Record<string, unknown>;

export type Lib_Scaffold_ResolveScaffoldGitignoreEntry_EntryValue = unknown;

export type Lib_Scaffold_ResolveScaffoldGitignoreEntry_Entry = Record<string, unknown>;

export type Lib_Scaffold_ResolveScaffoldGitignoreEntry_BundlesValue = unknown;

export type Lib_Scaffold_ResolveScaffoldGitignoreEntry_PatternsValue = unknown;

export type Lib_Scaffold_ResolveScaffoldGitignoreEntry_Bundles = Shared_NovaConfig_IgnoreFile_Bundles;

export type Lib_Scaffold_ResolveScaffoldGitignoreEntry_Patterns = Shared_NovaConfig_IgnoreFile_Patterns;

/**
 * Lib - Scaffold - Resolve Scaffold Install Invocation.
 *
 * @since 0.31.0
 */
export type Lib_Scaffold_ResolveScaffoldInstallInvocation_PackageManager = Shared_CorepackPackageManager;

export type Lib_Scaffold_ResolveScaffoldInstallInvocation_Returns_Command = Shared_CorepackCommand;

export type Lib_Scaffold_ResolveScaffoldInstallInvocation_Returns_CommandArguments = string[];

export type Lib_Scaffold_ResolveScaffoldInstallInvocation_Returns = {
  command: Lib_Scaffold_ResolveScaffoldInstallInvocation_Returns_Command;
  commandArguments: Lib_Scaffold_ResolveScaffoldInstallInvocation_Returns_CommandArguments;
};

export type Lib_Scaffold_ResolveScaffoldInstallInvocation_Command = Shared_CorepackCommand;

export type Lib_Scaffold_ResolveScaffoldInstallInvocation_CommandArguments = string[];

/**
 * Lib - Scaffold - Resolve Scaffold package.json Recipes.
 *
 * @since 0.33.0
 */
export type Lib_Scaffold_ResolveScaffoldPackageJsonRecipes_Returns = Shared_NovaConfig_Recipes_PackageJsonWorkspace;

export type Lib_Scaffold_ResolveScaffoldPackageJsonRecipes_Recipes = Shared_NovaConfig_Recipes_PackageJsonWorkspace;

export type Lib_Scaffold_ResolveScaffoldPackageJsonRecipes_Recipe = Shared_NovaConfig_RecipeEntry;

/**
 * Lib - Scaffold - Resolve Scaffold Policy.
 *
 * @since 0.34.0
 */
export type Lib_Scaffold_ResolveScaffoldPolicy_Category = 'app' | 'docs' | 'package' | 'tool';

export type Lib_Scaffold_ResolveScaffoldPolicy_Returns = Shared_NovaConfigWorkspace_Policy;

/**
 * Lib - Scaffold - Resolve Scaffold Workspace Version.
 *
 * @since 0.34.0
 */
export type Lib_Scaffold_ResolveScaffoldWorkspaceVersion_ExistingRoot = Shared_ScaffoldExistingRoot | undefined;

export type Lib_Scaffold_ResolveScaffoldWorkspaceVersion_ConfigRoot = string;

export type Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Policy = Shared_NovaConfigWorkspace_Policy;

export type Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Returns = Promise<string>;

export type Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Config = Record<string, unknown>;

export type Lib_Scaffold_ResolveScaffoldWorkspaceVersion_SettingsValue = unknown;

export type Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Settings = Record<string, unknown>;

export type Lib_Scaffold_ResolveScaffoldWorkspaceVersion_StrategyValue = unknown;

export type Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Strategy = Shared_NovaConfigSettings_VersionStrategy;

export type Lib_Scaffold_ResolveScaffoldWorkspaceVersion_LockStepVersioning = boolean;

export type Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Versions = Set<string>;

export type Lib_Scaffold_ResolveScaffoldWorkspaceVersion_WorkspacePath = string;

export type Lib_Scaffold_ResolveScaffoldWorkspaceVersion_Workspace = unknown;

export type Lib_Scaffold_ResolveScaffoldWorkspaceVersion_WorkspaceConfig = Record<string, unknown> & {
  policy: Shared_NovaConfigWorkspace_Policy;
};

export type Lib_Scaffold_ResolveScaffoldWorkspaceVersion_PackageJsonPath = string;

export type Lib_Scaffold_ResolveScaffoldWorkspaceVersion_PackageJsonRaw = string | undefined;

export type Lib_Scaffold_ResolveScaffoldWorkspaceVersion_PackageJson = Record<string, unknown> | undefined;

export type Lib_Scaffold_ResolveScaffoldWorkspaceVersion_CurrentVersion = string | undefined;

/**
 * Lib - Scaffold - Resolve Template Answers.
 *
 * @since 0.26.0
 */
export type Lib_Scaffold_ResolveTemplateAnswers_Options = object;

export type Lib_Scaffold_ResolveTemplateAnswers_Questions = Shared_ScaffoldTemplateQuestions;

export type Lib_Scaffold_ResolveTemplateAnswers_IsNonInteractive = boolean;

export type Lib_Scaffold_ResolveTemplateAnswers_Returns = Promise<Shared_ScaffoldTemplateResolution | undefined>;

export type Lib_Scaffold_ResolveTemplateAnswers_ResolvedAnswers = Shared_ScaffoldTemplateResolution_Answers;

export type Lib_Scaffold_ResolveTemplateAnswers_Replacements = Map<RegExp, string>;

export type Lib_Scaffold_ResolveTemplateAnswers_IsActive = boolean;

export type Lib_Scaffold_ResolveTemplateAnswers_DependencyValue = string | undefined;

export type Lib_Scaffold_ResolveTemplateAnswers_InactiveDefaultChoice = string | undefined;

export type Lib_Scaffold_ResolveTemplateAnswers_InactiveDefaultChoiceDefinition = Shared_ScaffoldTemplateQuestionChoice | undefined;

export type Lib_Scaffold_ResolveTemplateAnswers_InactiveAllowedValues = string;

export type Lib_Scaffold_ResolveTemplateAnswers_ProvidedValue = unknown;

export type Lib_Scaffold_ResolveTemplateAnswers_FlagValue = string | undefined;

export type Lib_Scaffold_ResolveTemplateAnswers_ResolvedValue = string | undefined;

export type Lib_Scaffold_ResolveTemplateAnswers_ProvidedAllowedValues = string;

export type Lib_Scaffold_ResolveTemplateAnswers_NonInteractiveDefaultChoice = string | undefined;

export type Lib_Scaffold_ResolveTemplateAnswers_Answers = Record<string, unknown>;

export type Lib_Scaffold_ResolveTemplateAnswers_Answer = unknown;

export type Lib_Scaffold_ResolveTemplateAnswers_ResolvedAllowedValues = string;

export type Lib_Scaffold_ResolveTemplateAnswers_ResolvedChoiceDefinition = Shared_ScaffoldTemplateQuestionChoice | undefined;

export type Lib_Scaffold_ResolveTemplateAnswers_ReplacementValue = string;

/**
 * Lib - Scaffold - Resolve Workspace Package Name.
 *
 * @since 0.26.0
 */
export type Lib_Scaffold_ResolveWorkspacePackageName_ProjectSlug = string;

export type Lib_Scaffold_ResolveWorkspacePackageName_WorkspaceName = string;

export type Lib_Scaffold_ResolveWorkspacePackageName_Category = 'app' | 'docs' | 'package' | 'tool';

export type Lib_Scaffold_ResolveWorkspacePackageName_Returns = string;

/**
 * Lib - Scaffold - Run Scaffold.
 *
 * @since 0.15.0
 */
export type Lib_Scaffold_RunScaffold_Options_DryRun = true;

export type Lib_Scaffold_RunScaffold_Options_Install = boolean;

export type Lib_Scaffold_RunScaffold_Options_Name = string;

export type Lib_Scaffold_RunScaffold_Options_NonInteractive = true;

export type Lib_Scaffold_RunScaffold_Options_Output = string;

export type Lib_Scaffold_RunScaffold_Options_WorkspaceName = string;

export type Lib_Scaffold_RunScaffold_Options = {
  dryRun?: Lib_Scaffold_RunScaffold_Options_DryRun;
  install?: Lib_Scaffold_RunScaffold_Options_Install;
  name?: Lib_Scaffold_RunScaffold_Options_Name;
  nonInteractive?: Lib_Scaffold_RunScaffold_Options_NonInteractive;
  output?: Lib_Scaffold_RunScaffold_Options_Output;
  workspaceName?: Lib_Scaffold_RunScaffold_Options_WorkspaceName;
};

export type Lib_Scaffold_RunScaffold_Definition_AllowScriptProfile = 'cloudflare' | 'docusaurus' | 'esbuild' | 'file-watching';

export type Lib_Scaffold_RunScaffold_Definition_AllowScriptProfiles = Lib_Scaffold_RunScaffold_Definition_AllowScriptProfile[];

export type Lib_Scaffold_RunScaffold_Definition_Category = 'app' | 'docs' | 'package' | 'tool';

export type Lib_Scaffold_RunScaffold_Definition_CompletionNote = string;

export type Lib_Scaffold_RunScaffold_Definition_CompletionNotes = Lib_Scaffold_RunScaffold_Definition_CompletionNote[];

export type Lib_Scaffold_RunScaffold_Definition_DisplayName = string;

export type Lib_Scaffold_RunScaffold_Definition_EnvironmentVariables = Shared_NovaConfigEnvironmentValue[];

export type Lib_Scaffold_RunScaffold_Definition_ImportMetaUrl = string;

export type Lib_Scaffold_RunScaffold_Definition_Platforms = Shared_NovaConfig_Project_Platforms;

export type Lib_Scaffold_RunScaffold_Definition_PrimaryScript = string;

export type Lib_Scaffold_RunScaffold_Definition_ProjectFinalizer = (workspaceDirectory: string, workspaceName: string, configRoot: string, answers: Shared_ScaffoldTemplateResolution_Answers, replacements: Map<RegExp, string>) => Promise<void>;

export type Lib_Scaffold_RunScaffold_Definition_ResolveAllowScriptProfiles = (answers: Shared_ScaffoldTemplateResolution_Answers) => Lib_Scaffold_RunScaffold_Definition_AllowScriptProfiles;

export type Lib_Scaffold_RunScaffold_Definition_ResolvePlatforms = (answers: Shared_ScaffoldTemplateResolution_Answers) => Shared_NovaConfig_Project_Platforms;

export type Lib_Scaffold_RunScaffold_Definition_ResolvePresentationOptions_WorkspaceName = string;

export type Lib_Scaffold_RunScaffold_Definition_ResolvePresentationOptions = (workspaceName: Lib_Scaffold_RunScaffold_Definition_ResolvePresentationOptions_WorkspaceName) => Lib_Scaffold_RunScaffold_PresentationOptions;

export type Lib_Scaffold_RunScaffold_Definition_ResolveReplacements_WorkspaceName = string;

export type Lib_Scaffold_RunScaffold_Definition_ResolveReplacements_Returns = Map<RegExp, string> | Promise<Map<RegExp, string> | undefined> | undefined;

export type Lib_Scaffold_RunScaffold_Definition_ResolveReplacements = (workspaceName: Lib_Scaffold_RunScaffold_Definition_ResolveReplacements_WorkspaceName) => Lib_Scaffold_RunScaffold_Definition_ResolveReplacements_Returns;

export type Lib_Scaffold_RunScaffold_Definition_ResolveRootTemplateSubpaths = (answers: Shared_ScaffoldTemplateResolution_Answers) => string[];

export type Lib_Scaffold_RunScaffold_Definition_ResolveWorkspaceTemplateSubpaths = (answers: Shared_ScaffoldTemplateResolution_Answers) => string[];

export type Lib_Scaffold_RunScaffold_Definition_RootTemplateSubpath = string;

export type Lib_Scaffold_RunScaffold_Definition_TemplateQuestions = Shared_ScaffoldTemplateQuestions;

export type Lib_Scaffold_RunScaffold_Definition_TemplateSubpath = string;

export type Lib_Scaffold_RunScaffold_Definition_TypeName = string;

export type Lib_Scaffold_RunScaffold_Definition_ValidateTemplateAnswers = (answers: Shared_ScaffoldTemplateResolution_Answers) => string | undefined;

export type Lib_Scaffold_RunScaffold_Definition_WorkspaceFinalizer = (workspaceDirectory: string, workspaceName: string, configRoot: string, answers: Shared_ScaffoldTemplateResolution_Answers, replacements: Map<RegExp, string>) => Promise<void>;

export type Lib_Scaffold_RunScaffold_Definition_WorkspacePackageNamePrefix = string;

export type Lib_Scaffold_RunScaffold_Definition = {
  allowScriptProfiles: Lib_Scaffold_RunScaffold_Definition_AllowScriptProfiles;
  category: Lib_Scaffold_RunScaffold_Definition_Category;
  completionNotes?: Lib_Scaffold_RunScaffold_Definition_CompletionNotes;
  displayName: Lib_Scaffold_RunScaffold_Definition_DisplayName;
  environmentVariables?: Lib_Scaffold_RunScaffold_Definition_EnvironmentVariables;
  importMetaUrl: Lib_Scaffold_RunScaffold_Definition_ImportMetaUrl;
  platforms: Lib_Scaffold_RunScaffold_Definition_Platforms;
  primaryScript?: Lib_Scaffold_RunScaffold_Definition_PrimaryScript;
  projectFinalizer?: Lib_Scaffold_RunScaffold_Definition_ProjectFinalizer;
  resolveAllowScriptProfiles?: Lib_Scaffold_RunScaffold_Definition_ResolveAllowScriptProfiles;
  resolvePlatforms?: Lib_Scaffold_RunScaffold_Definition_ResolvePlatforms;
  resolvePresentationOptions?: Lib_Scaffold_RunScaffold_Definition_ResolvePresentationOptions;
  resolveReplacements?: Lib_Scaffold_RunScaffold_Definition_ResolveReplacements;
  resolveRootTemplateSubpaths?: Lib_Scaffold_RunScaffold_Definition_ResolveRootTemplateSubpaths;
  resolveWorkspaceTemplateSubpaths?: Lib_Scaffold_RunScaffold_Definition_ResolveWorkspaceTemplateSubpaths;
  rootTemplateSubpath?: Lib_Scaffold_RunScaffold_Definition_RootTemplateSubpath;
  templateQuestions?: Lib_Scaffold_RunScaffold_Definition_TemplateQuestions;
  templateSubpath: Lib_Scaffold_RunScaffold_Definition_TemplateSubpath;
  typeName: Lib_Scaffold_RunScaffold_Definition_TypeName;
  validateTemplateAnswers?: Lib_Scaffold_RunScaffold_Definition_ValidateTemplateAnswers;
  workspaceFinalizer?: Lib_Scaffold_RunScaffold_Definition_WorkspaceFinalizer;
  workspacePackageNamePrefix?: Lib_Scaffold_RunScaffold_Definition_WorkspacePackageNamePrefix;
};

export type Lib_Scaffold_RunScaffold_Returns = Promise<void>;

export type Lib_Scaffold_RunScaffold_CurrentDirectory = string;

export type Lib_Scaffold_RunScaffold_IsDryRun = boolean;

export type Lib_Scaffold_RunScaffold_IsNonInteractive = boolean;

export type Lib_Scaffold_RunScaffold_Context = Shared_MonorepoContext;

export type Lib_Scaffold_RunScaffold_ExistingRoot = Shared_ScaffoldExistingRoot | undefined;

export type Lib_Scaffold_RunScaffold_ConfigNameDefault = string | undefined;

export type Lib_Scaffold_RunScaffold_Config = Shared_ScaffoldConfig | undefined;

export type Lib_Scaffold_RunScaffold_OutputRelativePath = string;

export type Lib_Scaffold_RunScaffold_ProjectSlug = string;

export type Lib_Scaffold_RunScaffold_WorkspacePackageNameBase = string;

export type Lib_Scaffold_RunScaffold_WorkspacePackageNamePrefix = string;

export type Lib_Scaffold_RunScaffold_WorkspacePackageName = string;

export type Lib_Scaffold_RunScaffold_ConfigRoot = string;

export type Lib_Scaffold_RunScaffold_ConfigFilePath = string;

export type Lib_Scaffold_RunScaffold_RootGitignorePath = string;

export type Lib_Scaffold_RunScaffold_ShouldCreateRootGitignore = boolean;

export type Lib_Scaffold_RunScaffold_ScaffoldGitignoreEntry = Shared_NovaConfig_IgnoreFile;

export type Lib_Scaffold_RunScaffold_WorkspaceBaseDirectory = 'apps' | 'packages';

export type Lib_Scaffold_RunScaffold_WorkspaceDirectory = string;

export type Lib_Scaffold_RunScaffold_WorkspaceRelPath = string | undefined;

export type Lib_Scaffold_RunScaffold_NormalizedWorkspaceRelPath = string;

export type Lib_Scaffold_RunScaffold_WorkspaceNameSegments = string[];

export type Lib_Scaffold_RunScaffold_WorkspaceTitle = string;

export type Lib_Scaffold_RunScaffold_WorkspaceIdentifier = string;

export type Lib_Scaffold_RunScaffold_WorkspacePolicy = Shared_NovaConfigWorkspace_Policy;

export type Lib_Scaffold_RunScaffold_WorkspaceVersion = string | undefined;

export type Lib_Scaffold_RunScaffold_ErrorMessage = string;

export type Lib_Scaffold_RunScaffold_CoreReplacements = Map<RegExp, string>;

export type Lib_Scaffold_RunScaffold_ExistingWorkspaceEntries = [string, unknown][];

export type Lib_Scaffold_RunScaffold_ExistingWorkspacePath = string;

export type Lib_Scaffold_RunScaffold_ExistingWorkspaceValue = unknown;

export type Lib_Scaffold_RunScaffold_ExistingWorkspaceNormalizedPath = string;

export type Lib_Scaffold_RunScaffold_ExistingWorkspace = Record<string, unknown>;

export type Lib_Scaffold_RunScaffold_ExistingWorkspaceName = unknown;

export type Lib_Scaffold_RunScaffold_ExistingWorkspaceRole = unknown;

export type Lib_Scaffold_RunScaffold_TemplateResolution = Shared_ScaffoldTemplateResolution | undefined;

export type Lib_Scaffold_RunScaffold_TemplateAnswers = Shared_ScaffoldTemplateResolution_Answers;

export type Lib_Scaffold_RunScaffold_TemplateReplacements = Map<RegExp, string>;

export type Lib_Scaffold_RunScaffold_ResolvedReplacements = Map<RegExp, string>;

export type Lib_Scaffold_RunScaffold_TemplateValidationError = string | undefined;

export type Lib_Scaffold_RunScaffold_ReplacementResolution = Map<RegExp, string> | undefined;

export type Lib_Scaffold_RunScaffold_ShouldInstall = boolean;

export type Lib_Scaffold_RunScaffold_EnvironmentVariables = Shared_NovaConfigEnvironmentValue[];

export type Lib_Scaffold_RunScaffold_Platforms = Shared_NovaConfig_Project_Platforms;

export type Lib_Scaffold_RunScaffold_AllowScriptProfiles = ('cloudflare' | 'docusaurus' | 'esbuild' | 'file-watching')[];

export type Lib_Scaffold_RunScaffold_AllowScripts = Record<string, boolean>;

export type Lib_Scaffold_RunScaffold_ExistingRootPackageJsonChanged = boolean;

export type Lib_Scaffold_RunScaffold_PackageManagerValue = unknown;

export type Lib_Scaffold_RunScaffold_PackageManagerDescriptor = Shared_CorepackPackageManagerDescriptor | undefined;

export type Lib_Scaffold_RunScaffold_PackageManager = Shared_CorepackPackageManager;

export type Lib_Scaffold_RunScaffold_Replacements = Map<RegExp, string>;

export type Lib_Scaffold_RunScaffold_WorkspaceTemplateSubpath = string;

export type Lib_Scaffold_RunScaffold_WorkspaceTemplateSubpaths = Lib_Scaffold_RunScaffold_WorkspaceTemplateSubpath[];

export type Lib_Scaffold_RunScaffold_WorkspaceTemplateDirectory = string;

export type Lib_Scaffold_RunScaffold_WorkspaceTemplateDirectories = Lib_Scaffold_RunScaffold_WorkspaceTemplateDirectory[];

export type Lib_Scaffold_RunScaffold_WorkspacePlannedPath = string;

export type Lib_Scaffold_RunScaffold_WorkspacePlannedPathGroup = Lib_Scaffold_RunScaffold_WorkspacePlannedPath[];

export type Lib_Scaffold_RunScaffold_WorkspacePlannedPathGroups = Lib_Scaffold_RunScaffold_WorkspacePlannedPathGroup[];

export type Lib_Scaffold_RunScaffold_TemplateDirectory = string;

export type Lib_Scaffold_RunScaffold_TemplateEntries = string[];

export type Lib_Scaffold_RunScaffold_RootTemplateSubpath = string;

export type Lib_Scaffold_RunScaffold_RootTemplateSubpaths = Lib_Scaffold_RunScaffold_RootTemplateSubpath[];

export type Lib_Scaffold_RunScaffold_RootTemplateDirectory = string;

export type Lib_Scaffold_RunScaffold_RootTemplateDirectories = Lib_Scaffold_RunScaffold_RootTemplateDirectory[];

export type Lib_Scaffold_RunScaffold_RootPlannedPath = string;

export type Lib_Scaffold_RunScaffold_RootPlannedPathGroup = Lib_Scaffold_RunScaffold_RootPlannedPath[];

export type Lib_Scaffold_RunScaffold_RootPlannedPathGroups = Lib_Scaffold_RunScaffold_RootPlannedPathGroup[];

export type Lib_Scaffold_RunScaffold_RootTemplateEntries = string[];

export type Lib_Scaffold_RunScaffold_PlannedPaths = string[];

export type Lib_Scaffold_RunScaffold_ConflictingPaths = string[];

export type Lib_Scaffold_RunScaffold_ConflictMessage = string;

export type Lib_Scaffold_RunScaffold_IsWorkspaceCovered = boolean;

export type Lib_Scaffold_RunScaffold_NormalizedWorkspacePattern = string;

export type Lib_Scaffold_RunScaffold_Destination = string;

export type Lib_Scaffold_RunScaffold_ProjectRoot = string;

export type Lib_Scaffold_RunScaffold_PrimaryScript = string;

export type Lib_Scaffold_RunScaffold_PresentationOption_Flag = string;

export type Lib_Scaffold_RunScaffold_PresentationOption_Value = string;

export type Lib_Scaffold_RunScaffold_PresentationOption = {
  flag: Lib_Scaffold_RunScaffold_PresentationOption_Flag;
  value: Lib_Scaffold_RunScaffold_PresentationOption_Value;
};

export type Lib_Scaffold_RunScaffold_PresentationOptions = Lib_Scaffold_RunScaffold_PresentationOption[];

export type Lib_Scaffold_RunScaffold_Confirmed = boolean;

export type Lib_Scaffold_RunScaffold_ProgressTotal = number;

export type Lib_Scaffold_RunScaffold_Progress_Clear = () => void;

export type Lib_Scaffold_RunScaffold_Progress_Complete = () => Promise<void>;

export type Lib_Scaffold_RunScaffold_Progress_Finish_Label = string;

export type Lib_Scaffold_RunScaffold_Progress_Finish = (label: Lib_Scaffold_RunScaffold_Progress_Finish_Label) => void;

export type Lib_Scaffold_RunScaffold_Progress_Start_Label = string;

export type Lib_Scaffold_RunScaffold_Progress_Start_Detail = string;

export type Lib_Scaffold_RunScaffold_Progress_Start = (label: Lib_Scaffold_RunScaffold_Progress_Start_Label, detail?: Lib_Scaffold_RunScaffold_Progress_Start_Detail) => void;

export type Lib_Scaffold_RunScaffold_Progress = {
  clear: Lib_Scaffold_RunScaffold_Progress_Clear;
  complete: Lib_Scaffold_RunScaffold_Progress_Complete;
  finish: Lib_Scaffold_RunScaffold_Progress_Finish;
  start: Lib_Scaffold_RunScaffold_Progress_Start;
};

export type Lib_Scaffold_RunScaffold_WorkspaceTemplateWrites = Promise<void>[];

export type Lib_Scaffold_RunScaffold_RootTemplateWrites = Promise<void>[];

export type Lib_Scaffold_RunScaffold_WorkspaceFinalizerError = unknown;

export type Lib_Scaffold_RunScaffold_RootWorkspacesValue = unknown;

export type Lib_Scaffold_RunScaffold_RootWorkspacesObject = Record<string, unknown>;

export type Lib_Scaffold_RunScaffold_RootPackageJsonPath = string;

export type Lib_Scaffold_RunScaffold_RootPackageJsonContents = string;

export type Lib_Scaffold_RunScaffold_ProjectFinalizerError = unknown;

export type Lib_Scaffold_RunScaffold_InstallSucceeded = boolean;

export type Lib_Scaffold_RunScaffold_InstallResult_Output = string;

export type Lib_Scaffold_RunScaffold_InstallResult_Succeeded = boolean;

export type Lib_Scaffold_RunScaffold_InstallResult = {
  output: Lib_Scaffold_RunScaffold_InstallResult_Output;
  succeeded: Lib_Scaffold_RunScaffold_InstallResult_Succeeded;
};

export type Lib_Scaffold_RunScaffold_InstallOutput = string;

/**
 * Lib - Scaffold - Update Scaffold Package JSON.
 *
 * @since 0.29.0
 */
export type Lib_Scaffold_UpdateScaffoldPackageJson_WorkspaceDirectory = string;

export type Lib_Scaffold_UpdateScaffoldPackageJson_Updates = Record<string, Record<string, string>>;

export type Lib_Scaffold_UpdateScaffoldPackageJson_Returns = Promise<void>;

export type Lib_Scaffold_UpdateScaffoldPackageJson_PackageJsonPath = string;

export type Lib_Scaffold_UpdateScaffoldPackageJson_Raw = string;

export type Lib_Scaffold_UpdateScaffoldPackageJson_Parsed = unknown;

export type Lib_Scaffold_UpdateScaffoldPackageJson_PackageJson = Record<string, unknown>;

export type Lib_Scaffold_UpdateScaffoldPackageJson_SectionValue = unknown;

export type Lib_Scaffold_UpdateScaffoldPackageJson_Section = Record<string, unknown>;

export type Lib_Scaffold_UpdateScaffoldPackageJson_IsSortedSection = boolean;

export type Lib_Scaffold_UpdateScaffoldPackageJson_SectionOutput = Record<string, unknown>;

export type Lib_Scaffold_UpdateScaffoldPackageJson_SectionEntry = [string, unknown];

export type Lib_Scaffold_UpdateScaffoldPackageJson_SectionEntries = Lib_Scaffold_UpdateScaffoldPackageJson_SectionEntry[];

export type Lib_Scaffold_UpdateScaffoldPackageJson_OrderedScriptEntries = Lib_Scaffold_UpdateScaffoldPackageJson_SectionEntry[];

export type Lib_Scaffold_UpdateScaffoldPackageJson_UsedScriptKeys = Set<string>;

export type Lib_Scaffold_UpdateScaffoldPackageJson_Content = string;

/**
 * Lib - Scaffold - Write Scaffold Gitignore.
 *
 * @since 0.31.0
 */
export type Lib_Scaffold_WriteScaffoldGitignore_RootDirectory = string;

export type Lib_Scaffold_WriteScaffoldGitignore_Entry = Shared_NovaConfig_IgnoreFile;

export type Lib_Scaffold_WriteScaffoldGitignore_Returns = Promise<void>;

export type Lib_Scaffold_WriteScaffoldGitignore_Content = string;

export type Lib_Scaffold_WriteScaffoldGitignore_TargetPath = string;

/**
 * Lib - Scaffold - Write Template Files.
 *
 * @since 0.15.0
 */
export type Lib_Scaffold_WriteTemplateFiles_TemplateDirectory = string;

export type Lib_Scaffold_WriteTemplateFiles_TargetDirectory = string;

export type Lib_Scaffold_WriteTemplateFiles_Replacements = Map<RegExp, string>;

export type Lib_Scaffold_WriteTemplateFiles_Returns = Promise<void>;

export type Lib_Scaffold_WriteTemplateFiles_CurrentDirectory = string;

export type Lib_Scaffold_WriteTemplateFiles_Entries = string[];

export type Lib_Scaffold_WriteTemplateFiles_SourcePath = string;

export type Lib_Scaffold_WriteTemplateFiles_TargetEntry = string;

export type Lib_Scaffold_WriteTemplateFiles_TargetPath = string;

export type Lib_Scaffold_WriteTemplateFiles_SourceContent = Buffer;

export type Lib_Scaffold_WriteTemplateFiles_SourceStats = Stats;

export type Lib_Scaffold_WriteTemplateFiles_IsBinary = boolean;

export type Lib_Scaffold_WriteTemplateFiles_Content = Buffer | string;

export type Lib_Scaffold_WriteTemplateFiles_Pattern = RegExp;

export type Lib_Scaffold_WriteTemplateFiles_Value = string;

export type Lib_Scaffold_WriteTemplateFiles_RelativePath = string;
