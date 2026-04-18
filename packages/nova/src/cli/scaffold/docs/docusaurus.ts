import { runScaffold } from '../../../lib/scaffold.js';

import type {
  CliScaffoldDocsDocusaurusRunOptions,
  CliScaffoldDocsDocusaurusRunReturns,
} from '../../../types/cli/scaffold/docs/docusaurus.d.ts';

/**
 * CLI - Scaffold - Docs - Docusaurus.
 *
 * Scaffolds a Docusaurus documentation site as a
 * workspace inside an existing or new monorepo using
 * the shared runScaffold pipeline.
 *
 * @since 0.15.0
 */
export class CliScaffoldDocsDocusaurus {
  /**
   * CLI - Scaffold - Docs - Docusaurus - Run.
   *
   * Entry point invoked by the CLI nova scaffold docs docusaurus command. Delegates to
   * runScaffold with the Docusaurus template subpath.
   *
   * @param {CliScaffoldDocsDocusaurusRunOptions} options - Options.
   *
   * @returns {CliScaffoldDocsDocusaurusRunReturns}
   *
   * @since 0.15.0
   */
  public static async run(options: CliScaffoldDocsDocusaurusRunOptions): CliScaffoldDocsDocusaurusRunReturns {
    await runScaffold(options, 'docs', 'docusaurus', 'scaffold/docs/docusaurus', import.meta.url);

    return;
  }
}
