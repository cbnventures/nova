import type { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import type {
  Shared_GeneratorRunResult,
  Shared_NovaConfig,
  Shared_NovaConfig_IgnoreFiles,
} from '../../../shared.d.ts';

/**
 * CLI - Generate - Must Haves - Ignore Files - Run.
 *
 * @since 0.32.0
 */
export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_Options_DryRun = true;

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_Options_ReplaceFile = true;

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_Options = {
  dryRun?: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_Options_ReplaceFile;
};

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_Returns = Promise<Shared_GeneratorRunResult>;

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_CurrentDirectory = string;

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_IsDryRun = boolean;

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_ReplaceFileNotice = string;

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_ConfigLoader = LibNovaConfig;

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_WorkingFile = Shared_NovaConfig;

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_ConfigDiagnostics = ReturnType<LibNovaConfig['diagnostics']>;

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_HasConfigErrors = boolean;

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_IgnoreFiles = Shared_NovaConfig_IgnoreFiles;

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_GenerationTasks = Promise<void>[];

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_ConfigPath = string;

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_Entry = Shared_NovaConfig_IgnoreFiles[string];

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_TargetPath = string;

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_Content = string;

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_GenerateError = unknown;

export type Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_ErrorMessage = string;
