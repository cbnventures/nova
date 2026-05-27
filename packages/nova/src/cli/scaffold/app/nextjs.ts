import { runScaffold } from '../../../lib/scaffold.js';

import type {
  Cli_Scaffold_App_Nextjs_Runner_Run_Options,
  Cli_Scaffold_App_Nextjs_Runner_Run_Returns,
} from '../../../types/cli/scaffold/app/nextjs.d.ts';

/**
 * CLI - Scaffold - App - Next.js.
 *
 * Scaffolds a Next.js application as a workspace
 * inside an existing or new monorepo using the shared
 * runScaffold pipeline.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Scaffold - App - Next.js - Run.
   *
   * Entry point invoked by the CLI nova scaffold app nextjs command. Delegates to runScaffold
   * with the Next.js template subpath.
   *
   * @param {Cli_Scaffold_App_Nextjs_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_App_Nextjs_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Scaffold_App_Nextjs_Runner_Run_Options): Cli_Scaffold_App_Nextjs_Runner_Run_Returns {
    await runScaffold(options, 'app', 'nextjs', 'scaffold/app/nextjs', import.meta.url);

    return;
  }
}
