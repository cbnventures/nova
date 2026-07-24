import type {
  Shared_GeneratorRunResult,
  Shared_NovaConfig,
  Shared_NovaConfig_Gitignore,
  Shared_NovaConfig_Gitignore_ProjectExcludes,
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

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_Returns = Promise<Shared_GeneratorRunResult>;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_CurrentDirectory = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_IsDryRun = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_ReplaceFileNotice = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_TemplateDirectory = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_TargetPath = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_TemplatePath = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_Content = string | undefined;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_WorkingFile = Shared_NovaConfig;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_Gitignore = Shared_NovaConfig_Gitignore | undefined;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_ProjectExcludes = Shared_NovaConfig_Gitignore_ProjectExcludes;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_FinalContent = string;
