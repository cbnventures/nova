import type { Answers } from 'prompts';

import type {
  Shared_GeneratorRunResult,
  Shared_NovaConfig,
  Shared_NovaConfig_Environment,
  Shared_NovaConfigEnvironment_Workspaces,
  Shared_NovaConfigEnvironmentWorkspace,
  Shared_NovaConfigEnvironmentWorkspace_Variables,
} from '../../../shared.d.ts';

/**
 * CLI - Generate - Must Haves - Dotenv - Confirm Prune.
 *
 * @since 0.21.0
 */
export type Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_FilePath = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_Keys = string[];

export type Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_Returns = Promise<boolean>;

export type Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_Response = Answers<'confirm'>;

/**
 * CLI - Generate - Must Haves - Dotenv - Run.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Options_DryRun = true;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Options_ReplaceFile = true;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Options_Prune = true;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Options = {
  dryRun?: Cli_Generate_MustHaves_Dotenv_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Generate_MustHaves_Dotenv_Runner_Run_Options_ReplaceFile;
  prune?: Cli_Generate_MustHaves_Dotenv_Runner_Run_Options_Prune;
};

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Returns = Promise<Shared_GeneratorRunResult>;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_CurrentDirectory = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_IsDryRun = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_IsPrune = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_ReplaceFileNotice = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_WorkingFile = Shared_NovaConfig;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Environment = Shared_NovaConfig_Environment;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Workspaces = Shared_NovaConfigEnvironment_Workspaces;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_GeneratedCount = number;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_WorkspacePath = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Workspace = Shared_NovaConfigEnvironmentWorkspace;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Variables = Shared_NovaConfigEnvironmentWorkspace_Variables;
