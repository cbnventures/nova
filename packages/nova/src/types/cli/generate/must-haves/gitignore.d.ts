import type {
  Shared_GeneratorRunResult as SharedGeneratorRunResult,
  Shared_NovaConfig as SharedNovaConfig,
  Shared_NovaConfig_Gitignore as SharedNovaConfigGitignore,
  Shared_NovaConfig_Gitignore_ProjectExcludes as SharedNovaConfigGitignoreProjectExcludes,
} from '../../../shared.d.ts';

/**
 * CLI - Generate - Must Haves - Gitignore - Run.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Gitignore_Runner_Run_Options_DryRun = true;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_Options_ReplaceFile = true;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_Options = {
  dryRun?: Cli_Generate_MustHaves_Gitignore_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Generate_MustHaves_Gitignore_Runner_Run_Options_ReplaceFile;
};

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_Returns = Promise<SharedGeneratorRunResult>;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_CurrentDirectory = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_IsDryRun = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_ReplaceFileNotice = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_TemplateDirectory = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_TargetPath = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_TemplatePath = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_Content = string | undefined;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_WorkingFile = SharedNovaConfig;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_Gitignore = SharedNovaConfigGitignore | undefined;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_ProjectExcludes = SharedNovaConfigGitignoreProjectExcludes;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_FinalContent = string;
