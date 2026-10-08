import type {
  Shared_ScaffoldTemplateQuestions,
  Shared_ScaffoldTemplateResolution_Answers,
} from '../../../shared.d.ts';

/**
 * CLI - Scaffold - Docs - Docusaurus - Template Questions.
 *
 * @since 0.26.0
 */
export type Cli_Scaffold_Docs_Docusaurus_TemplateQuestions = Shared_ScaffoldTemplateQuestions;

/**
 * CLI - Scaffold - Docs - Docusaurus - Resolve Workspace Template Subpaths.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_Docs_Docusaurus_ResolveWorkspaceTemplateSubpaths_Answers = Shared_ScaffoldTemplateResolution_Answers;
export type Cli_Scaffold_Docs_Docusaurus_ResolveWorkspaceTemplateSubpaths_Returns = string[];

/**
 * CLI - Scaffold - Docs - Docusaurus - Run.
 *
 * @since 0.15.0
 */
export type Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_DryRun = true;

export type Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_Content = string;

export type Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_DockerImage = true;

export type Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_Name = string;

export type Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_NonInteractive = true;

export type Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_Output = string;

export type Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_Preset = string;

export type Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_Search = true;

export type Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_WorkspaceName = string;

export type Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options = {
  content?: Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_Content;
  dockerImage?: Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_DockerImage;
  dryRun?: Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_DryRun;
  name?: Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_Name;
  nonInteractive?: Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_NonInteractive;
  output?: Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_Output;
  preset?: Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_Preset;
  search?: Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_Search;
  workspaceName?: Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options_WorkspaceName;
};

export type Cli_Scaffold_Docs_Docusaurus_Runner_Run_Returns = Promise<void>;
