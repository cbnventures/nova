import { runScaffold } from '../../../lib/scaffold.js';

import type {
  Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options,
  Cli_Scaffold_Docs_Docusaurus_Runner_Run_Returns,
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
export class Runner {
  /**
   * CLI - Scaffold - Docs - Docusaurus - Run.
   *
   * Entry point invoked by the CLI nova scaffold docs docusaurus command. Delegates to
   * runScaffold with the Docusaurus template subpath.
   *
   * @param {Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_Docs_Docusaurus_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options): Cli_Scaffold_Docs_Docusaurus_Runner_Run_Returns {
    await runScaffold(options, 'docs', 'docusaurus', 'scaffold/docs/docusaurus', import.meta.url);

    return;
  }
}
