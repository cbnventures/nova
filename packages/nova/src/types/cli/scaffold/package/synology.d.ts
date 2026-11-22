import type {
  Shared_NovaConfig,
  Shared_NovaConfig_Project,
  Shared_NovaConfig_Urls,
  Shared_ScaffoldTemplateQuestions,
  Shared_ScaffoldTemplateResolution_Answers,
} from '../../../shared.d.ts';

/**
 * CLI - Scaffold - Package - Synology - Template Questions.
 *
 * @since 0.50.0
 */
export type Cli_Scaffold_Package_Synology_TemplateQuestions = Shared_ScaffoldTemplateQuestions;

/**
 * CLI - Scaffold - Package - Synology - Resolve Workspace Template Subpaths.
 *
 * @since 0.50.0
 */
export type Cli_Scaffold_Package_Synology_ResolveWorkspaceTemplateSubpaths_Answers = Shared_ScaffoldTemplateResolution_Answers;

export type Cli_Scaffold_Package_Synology_ResolveWorkspaceTemplateSubpaths_Returns = string[];

/**
 * CLI - Scaffold - Package - Synology - Escape Info Value.
 *
 * @since 0.50.0
 */
export type Cli_Scaffold_Package_Synology_Runner_EscapeInfoValue_Value = string;

export type Cli_Scaffold_Package_Synology_Runner_EscapeInfoValue_Returns = string;

/**
 * CLI - Scaffold - Package - Synology - Resolve Replacements.
 *
 * @since 0.50.0
 */
export type Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_WorkspaceName = string;

export type Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_ConfigRoot = string;

export type Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_Returns = Promise<Map<RegExp, string>>;

export type Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_Config = Shared_NovaConfig;

export type Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_Project = Shared_NovaConfig_Project | undefined;

export type Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_Urls = Shared_NovaConfig_Urls;

export type Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_Maintainer = string;

export type Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_Description = string;

export type Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_MaintainerUrl = string;

export type Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_SupportUrl = string;

/**
 * CLI - Scaffold - Package - Synology - Run.
 *
 * @since 0.50.0
 */
export type Cli_Scaffold_Package_Synology_Runner_Run_Options_DryRun = true;

export type Cli_Scaffold_Package_Synology_Runner_Run_Options_Install = boolean;

export type Cli_Scaffold_Package_Synology_Runner_Run_Options_Name = string;

export type Cli_Scaffold_Package_Synology_Runner_Run_Options_NonInteractive = true;

export type Cli_Scaffold_Package_Synology_Runner_Run_Options_Output = string;

export type Cli_Scaffold_Package_Synology_Runner_Run_Options_UsrLocalLink = true;

export type Cli_Scaffold_Package_Synology_Runner_Run_Options_WorkspaceName = string;

export type Cli_Scaffold_Package_Synology_Runner_Run_Options = {
  dryRun?: Cli_Scaffold_Package_Synology_Runner_Run_Options_DryRun;
  install?: Cli_Scaffold_Package_Synology_Runner_Run_Options_Install;
  name?: Cli_Scaffold_Package_Synology_Runner_Run_Options_Name;
  nonInteractive?: Cli_Scaffold_Package_Synology_Runner_Run_Options_NonInteractive;
  output?: Cli_Scaffold_Package_Synology_Runner_Run_Options_Output;
  usrLocalLink?: Cli_Scaffold_Package_Synology_Runner_Run_Options_UsrLocalLink;
  workspaceName?: Cli_Scaffold_Package_Synology_Runner_Run_Options_WorkspaceName;
};

export type Cli_Scaffold_Package_Synology_Runner_Run_Returns = Promise<void>;
