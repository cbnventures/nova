import type {
  Shared_ScaffoldTemplateQuestions,
  Shared_ScaffoldTemplateResolution_Answers,
} from '../../../shared.d.ts';

/**
 * CLI - Scaffold - App - Astro - Template Questions.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_App_Astro_TemplateQuestions = Shared_ScaffoldTemplateQuestions;

/**
 * CLI - Scaffold - App - Astro - Resolve Workspace Template Subpaths.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_App_Astro_ResolveWorkspaceTemplateSubpaths_Answers = Shared_ScaffoldTemplateResolution_Answers;
export type Cli_Scaffold_App_Astro_ResolveWorkspaceTemplateSubpaths_Returns = string[];

/**
 * CLI - Scaffold - App - Astro - Run.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_App_Astro_Runner_Run_Options_DryRun = true;
export type Cli_Scaffold_App_Astro_Runner_Run_Options_Adapter = string;
export type Cli_Scaffold_App_Astro_Runner_Run_Options_DockerImage = true;
export type Cli_Scaffold_App_Astro_Runner_Run_Options_Name = string;
export type Cli_Scaffold_App_Astro_Runner_Run_Options_NonInteractive = true;
export type Cli_Scaffold_App_Astro_Runner_Run_Options_Output = string;
export type Cli_Scaffold_App_Astro_Runner_Run_Options_Rendering = string;
export type Cli_Scaffold_App_Astro_Runner_Run_Options_WorkspaceName = string;
export type Cli_Scaffold_App_Astro_Runner_Run_Options = {
  adapter?: Cli_Scaffold_App_Astro_Runner_Run_Options_Adapter;
  dockerImage?: Cli_Scaffold_App_Astro_Runner_Run_Options_DockerImage;
  dryRun?: Cli_Scaffold_App_Astro_Runner_Run_Options_DryRun;
  name?: Cli_Scaffold_App_Astro_Runner_Run_Options_Name;
  nonInteractive?: Cli_Scaffold_App_Astro_Runner_Run_Options_NonInteractive;
  output?: Cli_Scaffold_App_Astro_Runner_Run_Options_Output;
  rendering?: Cli_Scaffold_App_Astro_Runner_Run_Options_Rendering;
  workspaceName?: Cli_Scaffold_App_Astro_Runner_Run_Options_WorkspaceName;
};

export type Cli_Scaffold_App_Astro_Runner_Run_Returns = Promise<void>;
export type Cli_Scaffold_App_Astro_Runner_Run_Adapter = string | undefined;
