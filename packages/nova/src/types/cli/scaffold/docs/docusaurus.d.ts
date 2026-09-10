import type { Shared_ScaffoldTemplateQuestions } from '../../../shared.d.ts';

/**
 * CLI - Scaffold - Docs - Docusaurus - Template Questions.
 *
 * @since 0.26.0
 */
export type Cli_Scaffold_Docs_Docusaurus_TemplateQuestions = Shared_ScaffoldTemplateQuestions;

/**
 * CLI - Scaffold - Docs - Docusaurus - Run.
 *
 * @since 0.15.0
 */
export type Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_DryRun = true;

export type Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_Name = string;

export type Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_NonInteractive = true;

export type Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_Output = string;

export type Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_Preset = string;

export type Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_WorkspaceName = string;

export type Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options = {
  dryRun?: Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_DryRun;
  name?: Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_Name;
  nonInteractive?: Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_NonInteractive;
  output?: Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_Output;
  preset?: Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_Preset;
  workspaceName?: Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_WorkspaceName;
};

export type Cli_Scaffold_Docs_Docusaurus_Runner_Run_Returns = Promise<void>;
