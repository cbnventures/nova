import type { PromptObject } from 'prompts';

import type { Shared_GeneratorRunResult, Shared_MonorepoContext, Shared_ScaffoldConfig } from '../shared.d.ts';

/**
 * Lib - Scaffold - Collect Files.
 *
 * @since 0.15.0
 */
export type Lib_Scaffold_CollectFiles_Directory = string;

export type Lib_Scaffold_CollectFiles_Prefix = string;

export type Lib_Scaffold_CollectFiles_Returns = Promise<string[]>;

export type Lib_Scaffold_CollectFiles_Entries = import('fs').Dirent[];

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

export type Lib_Scaffold_CreateMonorepoRoot_ProjectTitle = string;

export type Lib_Scaffold_CreateMonorepoRoot_NovaConfigContent = Record<string, unknown>;

export type Lib_Scaffold_CreateMonorepoRoot_NovaConfig = string;

export type Lib_Scaffold_CreateMonorepoRoot_NovaConfigContents = string;

export type Lib_Scaffold_CreateMonorepoRoot_NovaConfigPath = string;

export type Lib_Scaffold_CreateMonorepoRoot_NovaConfigRelativePath = string;

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

export type Lib_Scaffold_DetectMonorepoContext_PackageJsonRaw = string;

export type Lib_Scaffold_DetectMonorepoContext_ParsedPackageJson = Record<string, unknown>;

/**
 * Lib - Scaffold - Load Generator.
 *
 * @since 0.15.0
 */
export type Lib_Scaffold_LoadGenerator_Name = string;

export type Lib_Scaffold_LoadGenerator_Returns = Promise<((options: {
  replaceFile: true;
}) => Promise<Shared_GeneratorRunResult>) | undefined>;

export type Lib_Scaffold_LoadGenerator_EditorconfigModule = typeof import('../../cli/generate/must-haves/editorconfig.js');

export type Lib_Scaffold_LoadGenerator_GitignoreModule = typeof import('../../cli/generate/must-haves/gitignore.js');

export type Lib_Scaffold_LoadGenerator_DotenvModule = typeof import('../../cli/generate/must-haves/dotenv.js');

export type Lib_Scaffold_LoadGenerator_LicenseModule = typeof import('../../cli/generate/must-haves/license.js');

export type Lib_Scaffold_LoadGenerator_ReadMeModule = typeof import('../../cli/generate/must-haves/read-me.js');

export type Lib_Scaffold_LoadGenerator_AgentConventionsModule = typeof import('../../cli/generate/must-haves/agent-conventions.js');

export type Lib_Scaffold_LoadGenerator_FundingModule = typeof import('../../cli/generate/github/funding.js');

export type Lib_Scaffold_LoadGenerator_IssueTemplateModule = typeof import('../../cli/generate/github/issue-template.js');

export type Lib_Scaffold_LoadGenerator_WorkflowsModule = typeof import('../../cli/generate/github/workflows.js');

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

export type Lib_Scaffold_PromptScaffoldOptions_Defaults_WorkspaceName = string | undefined;

export type Lib_Scaffold_PromptScaffoldOptions_Defaults = {
  name: Lib_Scaffold_PromptScaffoldOptions_Defaults_Name;
  output: Lib_Scaffold_PromptScaffoldOptions_Defaults_Output;
  typeName: Lib_Scaffold_PromptScaffoldOptions_Defaults_TypeName;
  workspaceName: Lib_Scaffold_PromptScaffoldOptions_Defaults_WorkspaceName;
};

export type Lib_Scaffold_PromptScaffoldOptions_Returns = Promise<Shared_ScaffoldConfig | undefined>;

export type Lib_Scaffold_PromptScaffoldOptions_CurrentDirectory = string;

export type Lib_Scaffold_PromptScaffoldOptions_Cancelled = boolean;

export type Lib_Scaffold_PromptScaffoldOptions_NameValue = string | undefined;

export type Lib_Scaffold_PromptScaffoldOptions_OutputValue = string | undefined;

export type Lib_Scaffold_PromptScaffoldOptions_WorkspaceNameValue = string | undefined;

export type Lib_Scaffold_PromptScaffoldOptions_Questions = PromptObject<string>[];

export type Lib_Scaffold_PromptScaffoldOptions_PromptsAnswers = Record<string, unknown>;

export type Lib_Scaffold_PromptScaffoldOptions_ResolvedName = string;

export type Lib_Scaffold_PromptScaffoldOptions_ResolvedWorkspaceName = string;

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

export type Lib_Scaffold_PromptScaffoldOptions_ResolvedOutput = string;

export type Lib_Scaffold_PromptScaffoldOptions_InitialPrev = string;

export type Lib_Scaffold_PromptScaffoldOptions_InitialAnswers = Record<string, string>;

export type Lib_Scaffold_PromptScaffoldOptions_ResolvedInitialWorkspaceName = string;

/**
 * Lib - Scaffold - Register Workspace In Config.
 *
 * @since 0.15.0
 */
export type Lib_Scaffold_RegisterWorkspaceInConfig_ConfigFilePath = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_WorkspaceRelPath = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_WorkspaceName = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Category = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Returns = Promise<void>;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ParsedConfig = Record<string, unknown> | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Raw = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Project = Record<string, unknown> | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ProjectName = Record<string, unknown> | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ProjectSlug = string | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Role = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ConfigName = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Workspaces = Record<string, unknown>;

export type Lib_Scaffold_RegisterWorkspaceInConfig_ParsedWorkspaces = Lib_Scaffold_RegisterWorkspaceInConfig_Workspaces | undefined;

export type Lib_Scaffold_RegisterWorkspaceInConfig_Json = string;

export type Lib_Scaffold_RegisterWorkspaceInConfig_JsonContents = string;

/**
 * Lib - Scaffold - Run Scaffold.
 *
 * @since 0.15.0
 */
export type Lib_Scaffold_RunScaffold_Options_DryRun = true;

export type Lib_Scaffold_RunScaffold_Options_Name = string;

export type Lib_Scaffold_RunScaffold_Options_Output = string;

export type Lib_Scaffold_RunScaffold_Options_WorkspaceName = string;

export type Lib_Scaffold_RunScaffold_Options = {
  dryRun?: Lib_Scaffold_RunScaffold_Options_DryRun;
  name?: Lib_Scaffold_RunScaffold_Options_Name;
  output?: Lib_Scaffold_RunScaffold_Options_Output;
  workspaceName?: Lib_Scaffold_RunScaffold_Options_WorkspaceName;
};

export type Lib_Scaffold_RunScaffold_Category = string;

export type Lib_Scaffold_RunScaffold_TypeName = string;

export type Lib_Scaffold_RunScaffold_TemplateSubpath = string;

export type Lib_Scaffold_RunScaffold_ImportMetaUrl = string;

export type Lib_Scaffold_RunScaffold_Returns = Promise<void>;

export type Lib_Scaffold_RunScaffold_CurrentDirectory = string;

export type Lib_Scaffold_RunScaffold_IsDryRun = boolean;

export type Lib_Scaffold_RunScaffold_Context = Shared_MonorepoContext;

export type Lib_Scaffold_RunScaffold_Config = Shared_ScaffoldConfig | undefined;

export type Lib_Scaffold_RunScaffold_ModePrefix = string;

export type Lib_Scaffold_RunScaffold_WorkspaceDirectory = string;

export type Lib_Scaffold_RunScaffold_TemplateDirectory = string;

export type Lib_Scaffold_RunScaffold_Replacements = Map<RegExp, string>;

export type Lib_Scaffold_RunScaffold_ConfigRoot = string;

export type Lib_Scaffold_RunScaffold_ConfigFilePath = string;

export type Lib_Scaffold_RunScaffold_WorkspaceRelPath = string;

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

export type Lib_Scaffold_WriteTemplateFiles_TargetPath = string;

export type Lib_Scaffold_WriteTemplateFiles_Content = string;

export type Lib_Scaffold_WriteTemplateFiles_Pattern = RegExp;

export type Lib_Scaffold_WriteTemplateFiles_Value = string;

export type Lib_Scaffold_WriteTemplateFiles_RelativePath = string;
