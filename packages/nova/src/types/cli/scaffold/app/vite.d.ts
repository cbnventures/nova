import type {
  Shared_ScaffoldTemplateQuestions,
  Shared_ScaffoldTemplateResolution_Answers,
} from '../../../shared.d.ts';

/**
 * CLI - Scaffold - App - Vite - Template Questions.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_App_Vite_TemplateQuestions = Shared_ScaffoldTemplateQuestions;

/**
 * CLI - Scaffold - App - Vite - Resolve Workspace Template Subpaths.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_App_Vite_ResolveWorkspaceTemplateSubpaths_Answers = Shared_ScaffoldTemplateResolution_Answers;
export type Cli_Scaffold_App_Vite_ResolveWorkspaceTemplateSubpaths_Returns = string[];
export type Cli_Scaffold_App_Vite_ResolveWorkspaceTemplateSubpaths_Framework = string;
export type Cli_Scaffold_App_Vite_ResolveWorkspaceTemplateSubpaths_Pwa = string;

/**
 * CLI - Scaffold - App - Vite - Run.
 *
 * @since 0.15.0
 */
export type Cli_Scaffold_App_Vite_Runner_Run_Options_DryRun = true;

export type Cli_Scaffold_App_Vite_Runner_Run_Options_DockerImage = true;

export type Cli_Scaffold_App_Vite_Runner_Run_Options_Framework = string;

export type Cli_Scaffold_App_Vite_Runner_Run_Options_Name = string;

export type Cli_Scaffold_App_Vite_Runner_Run_Options_NonInteractive = true;

export type Cli_Scaffold_App_Vite_Runner_Run_Options_Output = string;

export type Cli_Scaffold_App_Vite_Runner_Run_Options_Pwa = true;

export type Cli_Scaffold_App_Vite_Runner_Run_Options_WorkspaceName = string;

export type Cli_Scaffold_App_Vite_Runner_Run_Options = {
  dockerImage?: Cli_Scaffold_App_Vite_Runner_Run_Options_DockerImage;
  dryRun?: Cli_Scaffold_App_Vite_Runner_Run_Options_DryRun;
  framework?: Cli_Scaffold_App_Vite_Runner_Run_Options_Framework;
  name?: Cli_Scaffold_App_Vite_Runner_Run_Options_Name;
  nonInteractive?: Cli_Scaffold_App_Vite_Runner_Run_Options_NonInteractive;
  output?: Cli_Scaffold_App_Vite_Runner_Run_Options_Output;
  pwa?: Cli_Scaffold_App_Vite_Runner_Run_Options_Pwa;
  workspaceName?: Cli_Scaffold_App_Vite_Runner_Run_Options_WorkspaceName;
};

export type Cli_Scaffold_App_Vite_Runner_Run_Returns = Promise<void>;
export type Cli_Scaffold_App_Vite_Runner_Run_Framework = string | undefined;
export type Cli_Scaffold_App_Vite_Runner_Run_Dependencies = Record<string, string>;
export type Cli_Scaffold_App_Vite_Runner_Run_DevDependencies = Record<string, string>;
