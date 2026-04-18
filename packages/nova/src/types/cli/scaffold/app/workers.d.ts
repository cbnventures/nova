/**
 * CLI - Scaffold - App - Workers - Run.
 *
 * @since 0.15.0
 */
export type CliScaffoldAppWorkersRunOptionsDryRun = true;

export type CliScaffoldAppWorkersRunOptionsName = string;

export type CliScaffoldAppWorkersRunOptionsOutput = string;

export type CliScaffoldAppWorkersRunOptionsWorkspaceName = string;

export type CliScaffoldAppWorkersRunOptions = {
  dryRun?: CliScaffoldAppWorkersRunOptionsDryRun;
  name?: CliScaffoldAppWorkersRunOptionsName;
  output?: CliScaffoldAppWorkersRunOptionsOutput;
  workspaceName?: CliScaffoldAppWorkersRunOptionsWorkspaceName;
};

export type CliScaffoldAppWorkersRunReturns = Promise<void>;
