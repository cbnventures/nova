import { runScaffold } from '../../../lib/scaffold.js';

import type {
  Cli_Scaffold_App_Workers_Runner_Run_Options,
  Cli_Scaffold_App_Workers_Runner_Run_Returns,
} from '../../../types/cli/scaffold/app/workers.d.ts';

/**
 * CLI - Scaffold - App - Workers.
 *
 * Scaffolds a Cloudflare Workers application as a
 * workspace inside an existing or new monorepo using
 * the shared runScaffold pipeline.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Scaffold - App - Workers - Run.
   *
   * Entry point invoked by the CLI nova scaffold app workers command. Delegates to runScaffold
   * with the Workers template subpath.
   *
   * @param {Cli_Scaffold_App_Workers_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_App_Workers_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Scaffold_App_Workers_Runner_Run_Options): Cli_Scaffold_App_Workers_Runner_Run_Returns {
    await runScaffold(options, 'app', 'workers', 'scaffold/app/workers', import.meta.url);

    return;
  }
}
