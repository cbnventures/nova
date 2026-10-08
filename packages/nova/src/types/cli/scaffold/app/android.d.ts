import type { ChildProcess } from 'node:child_process';

/**
 * CLI - Scaffold - App - Android - Prepare Workspace.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_App_Android_Runner_PrepareWorkspace_WorkspaceDirectory = string;
export type Cli_Scaffold_App_Android_Runner_PrepareWorkspace_WorkspaceName = string;
export type Cli_Scaffold_App_Android_Runner_PrepareWorkspace_ProvidedApplicationId = string | undefined;
export type Cli_Scaffold_App_Android_Runner_PrepareWorkspace_Returns = Promise<void>;
export type Cli_Scaffold_App_Android_Runner_PrepareWorkspace_ApplicationIdSegmentBase = string;
export type Cli_Scaffold_App_Android_Runner_PrepareWorkspace_ApplicationIdSegment = string;
export type Cli_Scaffold_App_Android_Runner_PrepareWorkspace_ApplicationId = string;
export type Cli_Scaffold_App_Android_Runner_PrepareWorkspace_ApplicationNameSegments = string[];
export type Cli_Scaffold_App_Android_Runner_PrepareWorkspace_ApplicationName = string;
export type Cli_Scaffold_App_Android_Runner_PrepareWorkspace_Child = ChildProcess;
export type Cli_Scaffold_App_Android_Runner_PrepareWorkspace_Exit_Returns = void;

/**
 * CLI - Scaffold - App - Android - Run.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_App_Android_Runner_Run_Options_ApplicationId = string;
export type Cli_Scaffold_App_Android_Runner_Run_Options_DryRun = true;
export type Cli_Scaffold_App_Android_Runner_Run_Options_Name = string;
export type Cli_Scaffold_App_Android_Runner_Run_Options_NonInteractive = true;
export type Cli_Scaffold_App_Android_Runner_Run_Options_Output = string;
export type Cli_Scaffold_App_Android_Runner_Run_Options_WorkspaceName = string;
export type Cli_Scaffold_App_Android_Runner_Run_Options = {
  applicationId?: Cli_Scaffold_App_Android_Runner_Run_Options_ApplicationId;
  dryRun?: Cli_Scaffold_App_Android_Runner_Run_Options_DryRun;
  name?: Cli_Scaffold_App_Android_Runner_Run_Options_Name;
  nonInteractive?: Cli_Scaffold_App_Android_Runner_Run_Options_NonInteractive;
  output?: Cli_Scaffold_App_Android_Runner_Run_Options_Output;
  workspaceName?: Cli_Scaffold_App_Android_Runner_Run_Options_WorkspaceName;
};

export type Cli_Scaffold_App_Android_Runner_Run_Returns = Promise<void>;
