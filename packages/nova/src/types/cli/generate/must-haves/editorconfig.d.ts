import type { Shared_GeneratorRunResult as SharedGeneratorRunResult } from '../../../shared.d.ts';

/**
 * CLI - Generate - Must Haves - Editorconfig - Run.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Editorconfig_Runner_Run_Options_DryRun = true;

export type Cli_Generate_MustHaves_Editorconfig_Runner_Run_Options_ReplaceFile = true;

export type Cli_Generate_MustHaves_Editorconfig_Runner_Run_Options = {
  dryRun?: Cli_Generate_MustHaves_Editorconfig_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Generate_MustHaves_Editorconfig_Runner_Run_Options_ReplaceFile;
};

export type Cli_Generate_MustHaves_Editorconfig_Runner_Run_Returns = Promise<SharedGeneratorRunResult>;

export type Cli_Generate_MustHaves_Editorconfig_Runner_Run_CurrentDirectory = string;

export type Cli_Generate_MustHaves_Editorconfig_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Generate_MustHaves_Editorconfig_Runner_Run_IsDryRun = boolean;

export type Cli_Generate_MustHaves_Editorconfig_Runner_Run_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_Editorconfig_Runner_Run_ReplaceFileNotice = string;

export type Cli_Generate_MustHaves_Editorconfig_Runner_Run_TemplateDirectory = string;

export type Cli_Generate_MustHaves_Editorconfig_Runner_Run_TemplatePath = string;

export type Cli_Generate_MustHaves_Editorconfig_Runner_Run_Content = string;

export type Cli_Generate_MustHaves_Editorconfig_Runner_Run_TargetPath = string;
