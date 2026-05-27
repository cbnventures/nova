/**
 * CLI - Scaffold - App - Vite - Run.
 *
 * @since 0.15.0
 */
export type Cli_Scaffold_App_Vite_Runner_Run_Options_DryRun = true;

export type Cli_Scaffold_App_Vite_Runner_Run_Options_Name = string;

export type Cli_Scaffold_App_Vite_Runner_Run_Options_Output = string;

export type Cli_Scaffold_App_Vite_Runner_Run_Options_WorkspaceName = string;

export type Cli_Scaffold_App_Vite_Runner_Run_Options = {
  dryRun?: Cli_Scaffold_App_Vite_Runner_Run_Options_DryRun;
  name?: Cli_Scaffold_App_Vite_Runner_Run_Options_Name;
  output?: Cli_Scaffold_App_Vite_Runner_Run_Options_Output;
  workspaceName?: Cli_Scaffold_App_Vite_Runner_Run_Options_WorkspaceName;
};

export type Cli_Scaffold_App_Vite_Runner_Run_Returns = Promise<void>;
