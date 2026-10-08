import type {
  Shared_ScaffoldTemplateQuestions,
  Shared_ScaffoldTemplateResolution_Answers,
} from '../../../shared.d.ts';

/**
 * CLI - Scaffold - Package - Homebridge - Template Questions.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_Package_Homebridge_TemplateQuestions = Shared_ScaffoldTemplateQuestions;

/**
 * CLI - Scaffold - Package - Homebridge - Resolve Workspace Template Subpaths.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_Package_Homebridge_ResolveWorkspaceTemplateSubpaths_Answers = Shared_ScaffoldTemplateResolution_Answers;
export type Cli_Scaffold_Package_Homebridge_ResolveWorkspaceTemplateSubpaths_Returns = string[];

/**
 * CLI - Scaffold - Package - Homebridge - Run.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_Package_Homebridge_Runner_Run_Options_DryRun = true;
export type Cli_Scaffold_Package_Homebridge_Runner_Run_Options_CustomUi = true;
export type Cli_Scaffold_Package_Homebridge_Runner_Run_Options_Name = string;
export type Cli_Scaffold_Package_Homebridge_Runner_Run_Options_NonInteractive = true;
export type Cli_Scaffold_Package_Homebridge_Runner_Run_Options_Output = string;
export type Cli_Scaffold_Package_Homebridge_Runner_Run_Options_WorkspaceName = string;
export type Cli_Scaffold_Package_Homebridge_Runner_Run_Options = {
  customUi?: Cli_Scaffold_Package_Homebridge_Runner_Run_Options_CustomUi;
  dryRun?: Cli_Scaffold_Package_Homebridge_Runner_Run_Options_DryRun;
  name?: Cli_Scaffold_Package_Homebridge_Runner_Run_Options_Name;
  nonInteractive?: Cli_Scaffold_Package_Homebridge_Runner_Run_Options_NonInteractive;
  output?: Cli_Scaffold_Package_Homebridge_Runner_Run_Options_Output;
  workspaceName?: Cli_Scaffold_Package_Homebridge_Runner_Run_Options_WorkspaceName;
};

export type Cli_Scaffold_Package_Homebridge_Runner_Run_Returns = Promise<void>;
