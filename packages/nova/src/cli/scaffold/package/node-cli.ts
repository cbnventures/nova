import { runScaffold } from '../../../lib/scaffold.js';

import type {
  Cli_Scaffold_Package_NodeCli_Runner_Run_Options,
  Cli_Scaffold_Package_NodeCli_Runner_Run_Returns,
} from '../../../types/cli/scaffold/package/node-cli.d.ts';

/**
 * CLI - Scaffold - Package - Node CLI.
 *
 * Scaffolds a publishable TypeScript command-line package through the shared
 * workspace pipeline with Nova's CLI presentation conventions.
 *
 * @since 0.29.0
 */
export class Runner {
  /**
   * CLI - Scaffold - Package - Node CLI - Run.
   *
   * Delegates to the shared scaffold pipeline with the Node.js CLI
   * template so distributable package registration remains centralized.
   *
   * @param {Cli_Scaffold_Package_NodeCli_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_Package_NodeCli_Runner_Run_Returns}
   *
   * @since 0.29.0
   */
  public static async run(options: Cli_Scaffold_Package_NodeCli_Runner_Run_Options): Cli_Scaffold_Package_NodeCli_Runner_Run_Returns {
    await runScaffold(options, {
      category: 'package',
      importMetaUrl: import.meta.url,
      templateSubpath: 'scaffold/package/node-cli',
      typeName: 'node-cli',
    });

    return;
  }
}
