import type { PromptObject } from 'prompts';

import type { Shared_MonorepoContext as SharedMonorepoContext } from '../../../shared.d.ts';

/**
 * CLI - Scaffold - Starter - Base - Run.
 *
 * @since 0.15.0
 */
export type Cli_Scaffold_Starter_Base_Runner_Run_Options_DryRun = true;

export type Cli_Scaffold_Starter_Base_Runner_Run_Options_Name = string;

export type Cli_Scaffold_Starter_Base_Runner_Run_Options_Output = string;

export type Cli_Scaffold_Starter_Base_Runner_Run_Options = {
  dryRun?: Cli_Scaffold_Starter_Base_Runner_Run_Options_DryRun;
  name?: Cli_Scaffold_Starter_Base_Runner_Run_Options_Name;
  output?: Cli_Scaffold_Starter_Base_Runner_Run_Options_Output;
};

export type Cli_Scaffold_Starter_Base_Runner_Run_Returns = Promise<void>;

export type Cli_Scaffold_Starter_Base_Runner_Run_CurrentDirectory = string;

export type Cli_Scaffold_Starter_Base_Runner_Run_IsDryRun = boolean;

export type Cli_Scaffold_Starter_Base_Runner_Run_Context = SharedMonorepoContext;

export type Cli_Scaffold_Starter_Base_Runner_Run_Cancelled = boolean;

export type Cli_Scaffold_Starter_Base_Runner_Run_NameQuestions = PromptObject<string>[];

export type Cli_Scaffold_Starter_Base_Runner_Run_NameAnswers = Record<string, unknown>;

export type Cli_Scaffold_Starter_Base_Runner_Run_ResolvedName = string;

export type Cli_Scaffold_Starter_Base_Runner_Run_OutputDirectory = string | undefined;

export type Cli_Scaffold_Starter_Base_Runner_Run_DirectoryChoiceItem_Title = string;

export type Cli_Scaffold_Starter_Base_Runner_Run_DirectoryChoiceItem_Value = 'new-directory' | 'current-directory';

export type Cli_Scaffold_Starter_Base_Runner_Run_DirectoryChoiceItem = {
  title: Cli_Scaffold_Starter_Base_Runner_Run_DirectoryChoiceItem_Title;
  value: Cli_Scaffold_Starter_Base_Runner_Run_DirectoryChoiceItem_Value;
};

export type Cli_Scaffold_Starter_Base_Runner_Run_DirectoryChoices = Cli_Scaffold_Starter_Base_Runner_Run_DirectoryChoiceItem[];

export type Cli_Scaffold_Starter_Base_Runner_Run_DirectoryAnswers = Record<string, unknown>;

export type Cli_Scaffold_Starter_Base_Runner_Run_SelectedDirectoryChoice = string;

export type Cli_Scaffold_Starter_Base_Runner_Run_OutputAnswers = Record<string, unknown>;

export type Cli_Scaffold_Starter_Base_Runner_Run_ResolvedOutput = string;
