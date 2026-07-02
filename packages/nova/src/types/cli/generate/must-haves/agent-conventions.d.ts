import type {
  Shared_GeneratorRunResult as SharedGeneratorRunResult,
  Shared_NovaConfig as SharedNovaConfig,
} from '../../../shared.d.ts';

/**
 * CLI - Generate - Must Haves - Agent Conventions - Run.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_Options_DryRun = true;

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_Options_ReplaceFile = true;

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_Options = {
  dryRun?: Cli_Generate_MustHaves_AgentConventions_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Generate_MustHaves_AgentConventions_Runner_Run_Options_ReplaceFile;
};

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_Returns = Promise<SharedGeneratorRunResult>;

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_CurrentDirectory = string;

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_IsDryRun = boolean;

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_ReplaceFileNotice = string;

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_WorkingFile = SharedNovaConfig;

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_Agents = ('claude-code' | 'codex')[];

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_TemplateDirectory = string;

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_RootFiles = string[];

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_UserEditedFiles = Set<string>;

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_ConventionFiles = string[];

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_TemplateFileName = string;

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_TemplatePath = string;

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_TargetPath = string;

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_Content = string;

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_ConventionTemplatePath = string;

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_ConventionTargetPath = string;

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_DisplayPath = string;

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_ConventionContent = string;

export type Cli_Generate_MustHaves_AgentConventions_Runner_Run_NextStepsMessage = string;
