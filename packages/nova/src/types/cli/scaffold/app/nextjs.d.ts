import type { Shared_ScaffoldTemplateQuestions } from '../../../shared.d.ts';

/**
 * CLI - Scaffold - App - Next.js - Template Questions.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_App_Nextjs_TemplateQuestions = Shared_ScaffoldTemplateQuestions;

/**
 * CLI - Scaffold - App - Next.js - Run.
 *
 * @since 0.15.0
 */
export type Cli_Scaffold_App_Nextjs_Runner_Run_Options_DryRun = true;

export type Cli_Scaffold_App_Nextjs_Runner_Run_Options_DockerImage = true;

export type Cli_Scaffold_App_Nextjs_Runner_Run_Options_Name = string;

export type Cli_Scaffold_App_Nextjs_Runner_Run_Options_NonInteractive = true;

export type Cli_Scaffold_App_Nextjs_Runner_Run_Options_Output = string;

export type Cli_Scaffold_App_Nextjs_Runner_Run_Options_WorkspaceName = string;

export type Cli_Scaffold_App_Nextjs_Runner_Run_Options = {
  dockerImage?: Cli_Scaffold_App_Nextjs_Runner_Run_Options_DockerImage;
  dryRun?: Cli_Scaffold_App_Nextjs_Runner_Run_Options_DryRun;
  name?: Cli_Scaffold_App_Nextjs_Runner_Run_Options_Name;
  nonInteractive?: Cli_Scaffold_App_Nextjs_Runner_Run_Options_NonInteractive;
  output?: Cli_Scaffold_App_Nextjs_Runner_Run_Options_Output;
  workspaceName?: Cli_Scaffold_App_Nextjs_Runner_Run_Options_WorkspaceName;
};

export type Cli_Scaffold_App_Nextjs_Runner_Run_Returns = Promise<void>;
