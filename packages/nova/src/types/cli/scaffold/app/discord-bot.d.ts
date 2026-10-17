/**
 * CLI - Scaffold - App - Discord Bot - Completion Notes.
 *
 * @since 0.31.0
 */
export type Cli_Scaffold_App_DiscordBot_CompletionNote = string;

export type Cli_Scaffold_App_DiscordBot_CompletionNotes = Cli_Scaffold_App_DiscordBot_CompletionNote[];

/**
 * CLI - Scaffold - App - Discord Bot - Run.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_App_DiscordBot_Runner_Run_Options_DockerImage = true;
export type Cli_Scaffold_App_DiscordBot_Runner_Run_Options_DryRun = true;
export type Cli_Scaffold_App_DiscordBot_Runner_Run_Options_Install = boolean;
export type Cli_Scaffold_App_DiscordBot_Runner_Run_Options_Name = string;
export type Cli_Scaffold_App_DiscordBot_Runner_Run_Options_NonInteractive = true;
export type Cli_Scaffold_App_DiscordBot_Runner_Run_Options_Output = string;
export type Cli_Scaffold_App_DiscordBot_Runner_Run_Options_WorkspaceName = string;
export type Cli_Scaffold_App_DiscordBot_Runner_Run_Options = {
  dockerImage?: Cli_Scaffold_App_DiscordBot_Runner_Run_Options_DockerImage;
  dryRun?: Cli_Scaffold_App_DiscordBot_Runner_Run_Options_DryRun;
  install?: Cli_Scaffold_App_DiscordBot_Runner_Run_Options_Install;
  name?: Cli_Scaffold_App_DiscordBot_Runner_Run_Options_Name;
  nonInteractive?: Cli_Scaffold_App_DiscordBot_Runner_Run_Options_NonInteractive;
  output?: Cli_Scaffold_App_DiscordBot_Runner_Run_Options_Output;
  workspaceName?: Cli_Scaffold_App_DiscordBot_Runner_Run_Options_WorkspaceName;
};

export type Cli_Scaffold_App_DiscordBot_Runner_Run_Returns = Promise<void>;
