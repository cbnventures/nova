import type { PromptObject } from 'prompts';

import type { Shared_MonorepoContext } from '../../../shared.d.ts';

/**
 * CLI - Scaffold - Starter - Base - Run.
 *
 * @since 0.15.0
 */
export type Cli_Scaffold_Starter_Base_Runner_Run_Options_DryRun = true;

export type Cli_Scaffold_Starter_Base_Runner_Run_Options_Install = boolean;

export type Cli_Scaffold_Starter_Base_Runner_Run_Options_Name = string;

export type Cli_Scaffold_Starter_Base_Runner_Run_Options_NonInteractive = true;

export type Cli_Scaffold_Starter_Base_Runner_Run_Options_Output = string;

export type Cli_Scaffold_Starter_Base_Runner_Run_Options = {
  dryRun?: Cli_Scaffold_Starter_Base_Runner_Run_Options_DryRun;
  install?: Cli_Scaffold_Starter_Base_Runner_Run_Options_Install;
  name?: Cli_Scaffold_Starter_Base_Runner_Run_Options_Name;
  nonInteractive?: Cli_Scaffold_Starter_Base_Runner_Run_Options_NonInteractive;
  output?: Cli_Scaffold_Starter_Base_Runner_Run_Options_Output;
};

export type Cli_Scaffold_Starter_Base_Runner_Run_Returns = Promise<void>;

export type Cli_Scaffold_Starter_Base_Runner_Run_CurrentDirectory = string;

export type Cli_Scaffold_Starter_Base_Runner_Run_IsDryRun = boolean;

export type Cli_Scaffold_Starter_Base_Runner_Run_IsNonInteractive = boolean;

export type Cli_Scaffold_Starter_Base_Runner_Run_Context = Shared_MonorepoContext;

export type Cli_Scaffold_Starter_Base_Runner_Run_Cancelled = boolean;

export type Cli_Scaffold_Starter_Base_Runner_Run_NameQuestions = PromptObject<string>[];

export type Cli_Scaffold_Starter_Base_Runner_Run_NameAnswers = Record<string, unknown>;

export type Cli_Scaffold_Starter_Base_Runner_Run_ResolvedName = string;

export type Cli_Scaffold_Starter_Base_Runner_Run_OutputDirectory = string;

export type Cli_Scaffold_Starter_Base_Runner_Run_PlannedPaths = string[];

export type Cli_Scaffold_Starter_Base_Runner_Run_ConflictingPaths = string[];

export type Cli_Scaffold_Starter_Base_Runner_Run_ConflictMessage = string;

export type Cli_Scaffold_Starter_Base_Runner_Run_DisplayPath = string;

export type Cli_Scaffold_Starter_Base_Runner_Run_ShouldInstall = boolean;

export type Cli_Scaffold_Starter_Base_Runner_Run_Confirmed = boolean;

export type Cli_Scaffold_Starter_Base_Runner_Run_ProgressTotal = number;

export type Cli_Scaffold_Starter_Base_Runner_Run_Progress_Clear = () => void;

export type Cli_Scaffold_Starter_Base_Runner_Run_Progress_Complete = () => Promise<void>;

export type Cli_Scaffold_Starter_Base_Runner_Run_Progress_Finish_Label = string;

export type Cli_Scaffold_Starter_Base_Runner_Run_Progress_Finish = (label: Cli_Scaffold_Starter_Base_Runner_Run_Progress_Finish_Label) => void;

export type Cli_Scaffold_Starter_Base_Runner_Run_Progress_Start_Label = string;

export type Cli_Scaffold_Starter_Base_Runner_Run_Progress_Start_Detail = string;

export type Cli_Scaffold_Starter_Base_Runner_Run_Progress_Start = (label: Cli_Scaffold_Starter_Base_Runner_Run_Progress_Start_Label, detail?: Cli_Scaffold_Starter_Base_Runner_Run_Progress_Start_Detail) => void;

export type Cli_Scaffold_Starter_Base_Runner_Run_Progress = {
  clear: Cli_Scaffold_Starter_Base_Runner_Run_Progress_Clear;
  complete: Cli_Scaffold_Starter_Base_Runner_Run_Progress_Complete;
  finish: Cli_Scaffold_Starter_Base_Runner_Run_Progress_Finish;
  start: Cli_Scaffold_Starter_Base_Runner_Run_Progress_Start;
};

export type Cli_Scaffold_Starter_Base_Runner_Run_InstallSucceeded = boolean;

export type Cli_Scaffold_Starter_Base_Runner_Run_InstallResult_Output = string;

export type Cli_Scaffold_Starter_Base_Runner_Run_InstallResult_Succeeded = boolean;

export type Cli_Scaffold_Starter_Base_Runner_Run_InstallResult = {
  output: Cli_Scaffold_Starter_Base_Runner_Run_InstallResult_Output;
  succeeded: Cli_Scaffold_Starter_Base_Runner_Run_InstallResult_Succeeded;
};

export type Cli_Scaffold_Starter_Base_Runner_Run_InstallOutput = string;
