/**
 * CLI - Scaffold - Docs - Docusaurus - Run.
 *
 * @since 0.15.0
 */
export type CliScaffoldDocsDocusaurusRunOptionsDryRun = true;

export type CliScaffoldDocsDocusaurusRunOptionsName = string;

export type CliScaffoldDocsDocusaurusRunOptionsOutput = string;

export type CliScaffoldDocsDocusaurusRunOptionsWorkspaceName = string;

export type CliScaffoldDocsDocusaurusRunOptions = {
  dryRun?: CliScaffoldDocsDocusaurusRunOptionsDryRun;
  name?: CliScaffoldDocsDocusaurusRunOptionsName;
  output?: CliScaffoldDocsDocusaurusRunOptionsOutput;
  workspaceName?: CliScaffoldDocsDocusaurusRunOptionsWorkspaceName;
};

export type CliScaffoldDocsDocusaurusRunReturns = Promise<void>;
