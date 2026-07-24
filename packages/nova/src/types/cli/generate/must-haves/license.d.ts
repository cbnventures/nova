import type { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';

import type { Shared_GeneratorRunResult, Shared_NovaConfig, Shared_NovaConfig_Project_License } from '../../../shared.d.ts';

/**
 * CLI - Generate - Must Haves - License - Run.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_License_Runner_Run_Options_DryRun = true;

export type Cli_Generate_MustHaves_License_Runner_Run_Options_ReplaceFile = true;

export type Cli_Generate_MustHaves_License_Runner_Run_Options = {
  dryRun?: Cli_Generate_MustHaves_License_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Generate_MustHaves_License_Runner_Run_Options_ReplaceFile;
};

export type Cli_Generate_MustHaves_License_Runner_Run_Returns = Promise<Shared_GeneratorRunResult>;

export type Cli_Generate_MustHaves_License_Runner_Run_CurrentDirectory = string;

export type Cli_Generate_MustHaves_License_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Generate_MustHaves_License_Runner_Run_IsDryRun = boolean;

export type Cli_Generate_MustHaves_License_Runner_Run_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_License_Runner_Run_ReplaceFileNotice = string;

export type Cli_Generate_MustHaves_License_Runner_Run_NovaConfig = LibNovaConfig;

export type Cli_Generate_MustHaves_License_Runner_Run_WorkingFile = Shared_NovaConfig;

export type Cli_Generate_MustHaves_License_Runner_Run_Project = Shared_NovaConfig['project'];

export type Cli_Generate_MustHaves_License_Runner_Run_EntityName = string;

export type Cli_Generate_MustHaves_License_Runner_Run_CurrentYear = number;

export type Cli_Generate_MustHaves_License_Runner_Run_StartingYear = number;

export type Cli_Generate_MustHaves_License_Runner_Run_YearRange = string;

export type Cli_Generate_MustHaves_License_Runner_Run_LicenseId = Shared_NovaConfig_Project_License | undefined;

export type Cli_Generate_MustHaves_License_Runner_Run_TemplateDirectory = string;

export type Cli_Generate_MustHaves_License_Runner_Run_TemplatePath = string;

export type Cli_Generate_MustHaves_License_Runner_Run_Template = string;

export type Cli_Generate_MustHaves_License_Runner_Run_Content = string;

export type Cli_Generate_MustHaves_License_Runner_Run_TargetPath = string;

export type Cli_Generate_MustHaves_License_Runner_Run_ConsumerWorkspacePaths = string[];
