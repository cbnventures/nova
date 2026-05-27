import { runScaffold } from '../../../lib/scaffold.js';

import type {
  Cli_Scaffold_App_Vite_Runner_Run_Options,
  Cli_Scaffold_App_Vite_Runner_Run_Returns,
} from '../../../types/cli/scaffold/app/vite.d.ts';

/**
 * CLI - Scaffold - App - Vite.
 *
 * Scaffolds a Vite application as a workspace inside an existing or new monorepo using the
 * shared runScaffold pipeline.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Scaffold - App - Vite - Run.
   *
   * Entry point invoked by the CLI nova scaffold app vite command. Delegates to runScaffold
   * with the Vite template subpath.
   *
   * @param {Cli_Scaffold_App_Vite_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_App_Vite_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Scaffold_App_Vite_Runner_Run_Options): Cli_Scaffold_App_Vite_Runner_Run_Returns {
    await runScaffold(options, 'app', 'vite', 'scaffold/app/vite', import.meta.url);

    return;
  }
}
