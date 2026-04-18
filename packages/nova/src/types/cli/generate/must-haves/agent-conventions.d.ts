/**
 * CLI - Generate - Must Haves - Agent Conventions - Run.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesAgentConventionsRunOptionsDryRun = true;

export type CliGenerateMustHavesAgentConventionsRunOptionsReplaceFile = true;

export type CliGenerateMustHavesAgentConventionsRunOptions = {
  dryRun?: CliGenerateMustHavesAgentConventionsRunOptionsDryRun;
  replaceFile?: CliGenerateMustHavesAgentConventionsRunOptionsReplaceFile;
};

export type CliGenerateMustHavesAgentConventionsRunReturns = Promise<void>;

export type CliGenerateMustHavesAgentConventionsRunCurrentDirectory = string;

export type CliGenerateMustHavesAgentConventionsRunIsAtProjectRoot = boolean;

export type CliGenerateMustHavesAgentConventionsRunIsDryRun = boolean;

export type CliGenerateMustHavesAgentConventionsRunIsReplaceFile = boolean;

export type CliGenerateMustHavesAgentConventionsRunReplaceFileNotice = string;

export type CliGenerateMustHavesAgentConventionsRunTemplateDirectory = string;

export type CliGenerateMustHavesAgentConventionsRunRootFiles = string[];

export type CliGenerateMustHavesAgentConventionsRunUserEditedFiles = Set<string>;

export type CliGenerateMustHavesAgentConventionsRunConventionFiles = string[];

export type CliGenerateMustHavesAgentConventionsRunTemplatePath = string;

export type CliGenerateMustHavesAgentConventionsRunTargetPath = string;

export type CliGenerateMustHavesAgentConventionsRunContent = string;

export type CliGenerateMustHavesAgentConventionsRunDisplayPath = string;

export type CliGenerateMustHavesAgentConventionsRunNextStepsMessage = string;
