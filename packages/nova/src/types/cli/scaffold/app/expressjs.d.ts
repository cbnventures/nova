/**
 * CLI - Scaffold - App - Express.js - Run.
 *
 * @since 0.15.0
 */
export type CliScaffoldAppExpressjsRunOptionsDryRun = true;

export type CliScaffoldAppExpressjsRunOptionsName = string;

export type CliScaffoldAppExpressjsRunOptionsOutput = string;

export type CliScaffoldAppExpressjsRunOptionsWorkspaceName = string;

export type CliScaffoldAppExpressjsRunOptions = {
  dryRun?: CliScaffoldAppExpressjsRunOptionsDryRun;
  name?: CliScaffoldAppExpressjsRunOptionsName;
  output?: CliScaffoldAppExpressjsRunOptionsOutput;
  workspaceName?: CliScaffoldAppExpressjsRunOptionsWorkspaceName;
};

export type CliScaffoldAppExpressjsRunReturns = Promise<void>;
