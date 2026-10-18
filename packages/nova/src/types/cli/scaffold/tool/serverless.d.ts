import type {
  Shared_ScaffoldTemplateQuestions,
  Shared_ScaffoldTemplateResolution_Answers,
} from '../../../shared.d.ts';

/**
 * CLI - Scaffold - Tool - Serverless - Template Questions.
 *
 * @since 0.32.0
 */
export type Cli_Scaffold_Tool_Serverless_TemplateQuestions = Shared_ScaffoldTemplateQuestions;

/**
 * CLI - Scaffold - Tool - Serverless - Resolve Workspace Template Subpaths.
 *
 * @since 0.32.0
 */
export type Cli_Scaffold_Tool_Serverless_ResolveWorkspaceTemplateSubpaths_Answers = Shared_ScaffoldTemplateResolution_Answers;

export type Cli_Scaffold_Tool_Serverless_ResolveWorkspaceTemplateSubpaths_Returns = string[];

/**
 * CLI - Scaffold - Tool - Serverless - Run.
 *
 * @since 0.32.0
 */
export type Cli_Scaffold_Tool_Serverless_Runner_Run_Options_DryRun = true;

export type Cli_Scaffold_Tool_Serverless_Runner_Run_Options_Install = boolean;

export type Cli_Scaffold_Tool_Serverless_Runner_Run_Options_Name = string;

export type Cli_Scaffold_Tool_Serverless_Runner_Run_Options_NonInteractive = true;

export type Cli_Scaffold_Tool_Serverless_Runner_Run_Options_Output = string;

export type Cli_Scaffold_Tool_Serverless_Runner_Run_Options_Target = string;

export type Cli_Scaffold_Tool_Serverless_Runner_Run_Options_WorkspaceName = string;

export type Cli_Scaffold_Tool_Serverless_Runner_Run_Options = {
  dryRun?: Cli_Scaffold_Tool_Serverless_Runner_Run_Options_DryRun;
  install?: Cli_Scaffold_Tool_Serverless_Runner_Run_Options_Install;
  name?: Cli_Scaffold_Tool_Serverless_Runner_Run_Options_Name;
  nonInteractive?: Cli_Scaffold_Tool_Serverless_Runner_Run_Options_NonInteractive;
  output?: Cli_Scaffold_Tool_Serverless_Runner_Run_Options_Output;
  target?: Cli_Scaffold_Tool_Serverless_Runner_Run_Options_Target;
  workspaceName?: Cli_Scaffold_Tool_Serverless_Runner_Run_Options_WorkspaceName;
};

export type Cli_Scaffold_Tool_Serverless_Runner_Run_Returns = Promise<void>;
