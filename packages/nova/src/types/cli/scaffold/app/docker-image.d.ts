import type {
  Shared_ScaffoldTemplateQuestions,
  Shared_ScaffoldTemplateResolution_Answers,
} from '../../../shared.d.ts';

/**
 * CLI - Scaffold - App - Docker Image - Template Questions.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_App_DockerImage_TemplateQuestions = Shared_ScaffoldTemplateQuestions;

/**
 * CLI - Scaffold - App - Docker Image - Resolve Root Template Subpaths.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_App_DockerImage_ResolveRootTemplateSubpaths_Answers = Shared_ScaffoldTemplateResolution_Answers;
export type Cli_Scaffold_App_DockerImage_ResolveRootTemplateSubpaths_Returns = string[];
export type Cli_Scaffold_App_DockerImage_ResolveRootTemplateSubpaths_Publish = string | undefined;

/**
 * CLI - Scaffold - App - Docker Image - Run.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_App_DockerImage_Runner_Run_Options_DryRun = true;
export type Cli_Scaffold_App_DockerImage_Runner_Run_Options_Architectures = string;
export type Cli_Scaffold_App_DockerImage_Runner_Run_Options_Name = string;
export type Cli_Scaffold_App_DockerImage_Runner_Run_Options_NonInteractive = true;
export type Cli_Scaffold_App_DockerImage_Runner_Run_Options_Output = string;
export type Cli_Scaffold_App_DockerImage_Runner_Run_Options_Publish = string;
export type Cli_Scaffold_App_DockerImage_Runner_Run_Options_WorkspaceName = string;
export type Cli_Scaffold_App_DockerImage_Runner_Run_Options = {
  architectures?: Cli_Scaffold_App_DockerImage_Runner_Run_Options_Architectures;
  dryRun?: Cli_Scaffold_App_DockerImage_Runner_Run_Options_DryRun;
  name?: Cli_Scaffold_App_DockerImage_Runner_Run_Options_Name;
  nonInteractive?: Cli_Scaffold_App_DockerImage_Runner_Run_Options_NonInteractive;
  output?: Cli_Scaffold_App_DockerImage_Runner_Run_Options_Output;
  publish?: Cli_Scaffold_App_DockerImage_Runner_Run_Options_Publish;
  workspaceName?: Cli_Scaffold_App_DockerImage_Runner_Run_Options_WorkspaceName;
};

export type Cli_Scaffold_App_DockerImage_Runner_Run_Returns = Promise<void>;
