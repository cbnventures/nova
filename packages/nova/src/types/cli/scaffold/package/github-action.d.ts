import type { Shared_DescriptionDestination, Shared_NovaConfig } from '../../../shared.d.ts';

/**
 * CLI - Scaffold - Package - GitHub Action - Finalize Workspace.
 *
 * @since 0.49.0
 */
export type Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_WorkspaceDirectory = string;

export type Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_ConfigRoot = string;

export type Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_Returns = Promise<void>;

export type Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_Config = Shared_NovaConfig;

export type Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_ActionFilePath = string;

export type Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_WorkspacePath = string;

/**
 * CLI - Scaffold - Package - GitHub Action - Resolve Replacements.
 *
 * @since 0.49.0
 */
export type Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_WorkspaceName = string;

export type Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_ConfigRoot = string;

export type Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_Returns = Promise<Map<RegExp, string> | undefined>;

export type Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_Config = Shared_NovaConfig;

export type Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_DescriptionDestination = Shared_DescriptionDestination;

export type Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_Description = string | undefined;

export type Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_DescriptionLimitMessage = string | undefined;

/**
 * CLI - Scaffold - Package - GitHub Action - Run.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_Package_GithubAction_Runner_Run_Options_DryRun = true;

export type Cli_Scaffold_Package_GithubAction_Runner_Run_Options_Install = boolean;
export type Cli_Scaffold_Package_GithubAction_Runner_Run_Options_Name = string;
export type Cli_Scaffold_Package_GithubAction_Runner_Run_Options_NonInteractive = true;
export type Cli_Scaffold_Package_GithubAction_Runner_Run_Options_Output = string;
export type Cli_Scaffold_Package_GithubAction_Runner_Run_Options_WorkspaceName = string;
export type Cli_Scaffold_Package_GithubAction_Runner_Run_Options = {
  dryRun?: Cli_Scaffold_Package_GithubAction_Runner_Run_Options_DryRun;
  install?: Cli_Scaffold_Package_GithubAction_Runner_Run_Options_Install;
  name?: Cli_Scaffold_Package_GithubAction_Runner_Run_Options_Name;
  nonInteractive?: Cli_Scaffold_Package_GithubAction_Runner_Run_Options_NonInteractive;
  output?: Cli_Scaffold_Package_GithubAction_Runner_Run_Options_Output;
  workspaceName?: Cli_Scaffold_Package_GithubAction_Runner_Run_Options_WorkspaceName;
};

export type Cli_Scaffold_Package_GithubAction_Runner_Run_Returns = Promise<void>;
