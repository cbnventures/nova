/**
 * CLI - Scaffold - App - Vite - Run.
 *
 * @since 0.15.0
 */
export type CliScaffoldAppViteRunOptionsDryRun = true;

export type CliScaffoldAppViteRunOptionsName = string;

export type CliScaffoldAppViteRunOptionsOutput = string;

export type CliScaffoldAppViteRunOptionsWorkspaceName = string;

export type CliScaffoldAppViteRunOptions = {
  dryRun?: CliScaffoldAppViteRunOptionsDryRun;
  name?: CliScaffoldAppViteRunOptionsName;
  output?: CliScaffoldAppViteRunOptionsOutput;
  workspaceName?: CliScaffoldAppViteRunOptionsWorkspaceName;
};

export type CliScaffoldAppViteRunReturns = Promise<void>;
