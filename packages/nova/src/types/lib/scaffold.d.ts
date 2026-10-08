import type { Dirent } from 'node:fs';

import type { PromptObject } from 'prompts';

import type * as FundingModule from '../../cli/generate/github/funding.js';

import type * as IssueTemplateModule from '../../cli/generate/github/issue-template.js';

import type * as WorkflowsModule from '../../cli/generate/github/workflows-blueprint.js';

import type * as AgentConventionsModule from '../../cli/generate/must-haves/agent-conventions.js';

import type * as DotenvModule from '../../cli/generate/must-haves/dotenv.js';

import type * as EditorconfigModule from '../../cli/generate/must-haves/editorconfig.js';

import type * as GitignoreModule from '../../cli/generate/must-haves/gitignore.js';

import type * as LicenseModule from '../../cli/generate/must-haves/license.js';

import type * as ReadMeModule from '../../cli/generate/must-haves/read-me.js';

import type {
  Shared_GeneratorRunResult,
  Shared_MonorepoContext,
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

export type Lib_Scaffold_CreateMonorepoRoot_Returns = Promise<void>;

export type Lib_Scaffold_CreateMonorepoRoot_CurrentDirectory = string;

export type Lib_Scaffold_CreateMonorepoRoot_AppsDirectory = string;

export type Lib_Scaffold_CreateMonorepoRoot_PackagesDirectory = string;

export type Lib_Scaffold_CreateMonorepoRoot_PackageJsonContent = Record<string, unknown>;

export type Lib_Scaffold_CreateMonorepoRoot_PackageJson = string;

export type Lib_Scaffold_CreateMonorepoRoot_PackageJsonContents = string;

export type Lib_Scaffold_CreateMonorepoRoot_PackageJsonPath = string;

export type Lib_Scaffold_CreateMonorepoRoot_PackageJsonRelativePath = string;

export type Lib_Scaffold_CreateMonorepoRoot_TurboJsonContent = Record<string, unknown>;

export type Lib_Scaffold_CreateMonorepoRoot_TurboJsonPath = string;

export type Lib_Scaffold_CreateMonorepoRoot_TurboJsonRelativePath = string;

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
 * Lib - Scaffold - Load Generator.
 *
 * @since 0.15.0
 */
export type Lib_Scaffold_LoadGenerator_Name = string;

export type Lib_Scaffold_LoadGenerator_Returns = Promise<((options: {
  replaceFile: true;
}) => Promise<Shared_GeneratorRunResult>) | undefined>;

export type Lib_Scaffold_LoadGenerator_EditorconfigModule = typeof EditorconfigModule;

export type Lib_Scaffold_LoadGenerator_GitignoreModule = typeof GitignoreModule;

export type Lib_Scaffold_LoadGenerator_DotenvModule = typeof DotenvModule;

export type Lib_Scaffold_LoadGenerator_LicenseModule = typeof LicenseModule;

export type Lib_Scaffold_LoadGenerator_ReadMeModule = typeof ReadMeModule;

export type Lib_Scaffold_LoadGenerator_AgentConventionsModule = typeof AgentConventionsModule;

export type Lib_Scaffold_LoadGenerator_FundingModule = typeof FundingModule;

export type Lib_Scaffold_LoadGenerator_IssueTemplateModule = typeof IssueTemplateModule;

export type Lib_Scaffold_LoadGenerator_WorkflowsModule = typeof WorkflowsModule;

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
 * Lib - Scaffold - Prompt Post Scaffold Generators.
 *
 * @since 0.15.0
 */
export type Lib_Scaffold_PromptPostScaffoldGenerators_OutputDirectory = string;

export type Lib_Scaffold_PromptPostScaffoldGenerators_Returns = Promise<void>;

export type Lib_Scaffold_PromptPostScaffoldGenerators_Cancelled = boolean;

export type Lib_Scaffold_PromptPostScaffoldGenerators_GeneratorChoice_Title = string;

export type Lib_Scaffold_PromptPostScaffoldGenerators_GeneratorChoice_Description = string;

export type Lib_Scaffold_PromptPostScaffoldGenerators_GeneratorChoice_Value = string;

export type Lib_Scaffold_PromptPostScaffoldGenerators_GeneratorChoice = {
  title: Lib_Scaffold_PromptPostScaffoldGenerators_GeneratorChoice_Title;
  description: Lib_Scaffold_PromptPostScaffoldGenerators_GeneratorChoice_Description;
  value: Lib_Scaffold_PromptPostScaffoldGenerators_GeneratorChoice_Value;
};

export type Lib_Scaffold_PromptPostScaffoldGenerators_GeneratorChoices = Lib_Scaffold_PromptPostScaffoldGenerators_GeneratorChoice[];

export type Lib_Scaffold_PromptPostScaffoldGenerators_Answers = Record<string, unknown>;

export type Lib_Scaffold_PromptPostScaffoldGenerators_Selected = string[];

export type Lib_Scaffold_PromptPostScaffoldGenerators_OriginalCwd = string;

export type Lib_Scaffold_PromptPostScaffoldGenerators_GeneratorModule = ((options: {
  replaceFile: true;
}) => Promise<Shared_GeneratorRunResult>) | undefined;

export type Lib_Scaffold_PromptPostScaffoldGenerators_GeneratorResult = Shared_GeneratorRunResult;

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

export type Lib_Scaffold_PromptScaffoldOptions_DirectoryChoices_Title = string;

export type Lib_Scaffold_PromptScaffoldOptions_DirectoryChoices_Value = string;

export type Lib_Scaffold_PromptScaffoldOptions_DirectoryChoices = {
  title: Lib_Scaffold_PromptScaffoldOptions_DirectoryChoices_Title;
  value: Lib_Scaffold_PromptScaffoldOptions_DirectoryChoices_Value;
}[];

export type Lib_Scaffold_PromptScaffoldOptions_DirectoryAnswers = Record<string, unknown>;

export type Lib_Scaffold_PromptScaffoldOptions_DirectoryChoice = string;

export type Lib_Scaffold_PromptScaffoldOptions_OutputAnswers = Record<string, unknown>;

export type Lib_Scaffold_PromptScaffoldOptions_MonorepoResolvedOutput = string;

export type Lib_Scaffold_PromptScaffoldOptions_NameValue = string | undefined;

export type Lib_Scaffold_PromptScaffoldOptions_OutputValue = string | undefined;

export type Lib_Scaffold_PromptScaffoldOptions_WorkspaceNameValue = string | undefined;

export type Lib_Scaffold_PromptScaffoldOptions_Questions = PromptObject<string>[];

export type Lib_Scaffold_PromptScaffoldOptions_InitialPrev = string;

export type Lib_Scaffold_PromptScaffoldOptions_InitialAnswers = Record<string, string>;

export type Lib_Scaffold_PromptScaffoldOptions_ResolveInitialOutput = (initialPrev: Lib_Scaffold_PromptScaffoldOptions_InitialPrev, initialAnswers: Lib_Scaffold_PromptScaffoldOptions_InitialAnswers) => string;

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

export type Lib_Scaffold_RegisterWorkspaceInConfig_Category = 'app' | 'docs' | 'package';

export type Lib_Scaffold_RegisterWorkspaceInConfig_Returns = Promise<void>;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ParsedConfig = Record<string, unknown> | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Raw = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Project = Record<string, unknown> | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ProjectName = Record<string, unknown> | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ProjectSlug = string | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Role = 'app' | 'docs' | 'package';

export type Lib_Scaffold_RegisterWorkspaceInConfig_Policy = 'distributable' | 'freezable' | 'trackable';

export type Lib_Scaffold_RegisterWorkspaceInConfig_ConfigName = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ParsedWorkspaces = Lib_Scaffold_RegisterWorkspaceInConfig_Workspaces | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Workspaces = Record<string, unknown>;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Json = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_JsonContents = string;

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

export type Lib_Scaffold_ResolveWorkspacePackageName_Category = 'app' | 'docs' | 'package';

export type Lib_Scaffold_ResolveWorkspacePackageName_Returns = string;

/**
 * Lib - Scaffold - Run Scaffold.
 *
 * @since 0.15.0
 */
export type Lib_Scaffold_RunScaffold_Options_DryRun = true;

export type Lib_Scaffold_RunScaffold_Options_Name = string;

export type Lib_Scaffold_RunScaffold_Options_NonInteractive = true;

export type Lib_Scaffold_RunScaffold_Options_Output = string;

export type Lib_Scaffold_RunScaffold_Options_WorkspaceName = string;

export type Lib_Scaffold_RunScaffold_Options = {
  dryRun?: Lib_Scaffold_RunScaffold_Options_DryRun;
  name?: Lib_Scaffold_RunScaffold_Options_Name;
  nonInteractive?: Lib_Scaffold_RunScaffold_Options_NonInteractive;
  output?: Lib_Scaffold_RunScaffold_Options_Output;
  workspaceName?: Lib_Scaffold_RunScaffold_Options_WorkspaceName;
};

export type Lib_Scaffold_RunScaffold_Definition_Category = 'app' | 'docs' | 'package';

export type Lib_Scaffold_RunScaffold_Definition_ImportMetaUrl = string;

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
  category: Lib_Scaffold_RunScaffold_Definition_Category;
  importMetaUrl: Lib_Scaffold_RunScaffold_Definition_ImportMetaUrl;
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

export type Lib_Scaffold_RunScaffold_ProjectSlug = string;

export type Lib_Scaffold_RunScaffold_WorkspacePackageNameBase = string;

export type Lib_Scaffold_RunScaffold_WorkspacePackageNamePrefix = string;

export type Lib_Scaffold_RunScaffold_WorkspacePackageName = string;

export type Lib_Scaffold_RunScaffold_ConfigRoot = string;

export type Lib_Scaffold_RunScaffold_ConfigFilePath = string;

export type Lib_Scaffold_RunScaffold_WorkspaceBaseDirectory = 'apps' | 'packages';

export type Lib_Scaffold_RunScaffold_WorkspaceDirectory = string;

export type Lib_Scaffold_RunScaffold_WorkspaceRelPath = string | undefined;

export type Lib_Scaffold_RunScaffold_NormalizedWorkspaceRelPath = string;

export type Lib_Scaffold_RunScaffold_WorkspaceNameSegments = string[];

export type Lib_Scaffold_RunScaffold_WorkspaceTitle = string;

export type Lib_Scaffold_RunScaffold_WorkspaceIdentifier = string;

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

export type Lib_Scaffold_RunScaffold_TemplateValidationError = string | undefined;

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

export type Lib_Scaffold_RunScaffold_WorkspaceTemplateWrites = Promise<void>[];

export type Lib_Scaffold_RunScaffold_RootTemplateWrites = Promise<void>[];

export type Lib_Scaffold_RunScaffold_WorkspaceFinalizerError = unknown;

export type Lib_Scaffold_RunScaffold_RootPackageJsonPath = string;

export type Lib_Scaffold_RunScaffold_RootWorkspacesValue = unknown;

export type Lib_Scaffold_RunScaffold_RootWorkspacesObject = Record<string, unknown>;

export type Lib_Scaffold_RunScaffold_RootPackageJsonContents = string;

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

export type Lib_Scaffold_UpdateScaffoldPackageJson_Content = string;

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

export type Lib_Scaffold_WriteTemplateFiles_SourceContent = string;

export type Lib_Scaffold_WriteTemplateFiles_Content = string;

export type Lib_Scaffold_WriteTemplateFiles_Pattern = RegExp;

export type Lib_Scaffold_WriteTemplateFiles_Value = string;

export type Lib_Scaffold_WriteTemplateFiles_RelativePath = string;
