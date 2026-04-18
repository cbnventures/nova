/**
 * CLI - Scaffold - App - Next.js - Run.
 *
 * @since 0.15.0
 */
export type CliScaffoldAppNextjsRunOptionsDryRun = true;

export type CliScaffoldAppNextjsRunOptionsName = string;

export type CliScaffoldAppNextjsRunOptionsOutput = string;

export type CliScaffoldAppNextjsRunOptionsWorkspaceName = string;

export type CliScaffoldAppNextjsRunOptions = {
  dryRun?: CliScaffoldAppNextjsRunOptionsDryRun;
  name?: CliScaffoldAppNextjsRunOptionsName;
  output?: CliScaffoldAppNextjsRunOptionsOutput;
  workspaceName?: CliScaffoldAppNextjsRunOptionsWorkspaceName;
};

export type CliScaffoldAppNextjsRunReturns = Promise<void>;
