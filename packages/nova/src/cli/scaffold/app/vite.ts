import { runScaffold } from '../../../lib/scaffold.js';

import type {
  CliScaffoldAppViteRunOptions,
  CliScaffoldAppViteRunReturns,
} from '../../../types/cli/scaffold/app/vite.d.ts';

/**
 * CLI - Scaffold - App - Vite.
 *
 * Scaffolds a Vite application as a workspace inside an existing or new monorepo using the
 * shared runScaffold pipeline.
 *
 * @since 0.15.0
 */
export class CliScaffoldAppVite {
  /**
   * CLI - Scaffold - App - Vite - Run.
   *
   * Entry point invoked by the CLI nova scaffold app vite command. Delegates to runScaffold
   * with the Vite template subpath.
   *
   * @param {CliScaffoldAppViteRunOptions} options - Options.
   *
   * @returns {CliScaffoldAppViteRunReturns}
   *
   * @since 0.15.0
   */
  public static async run(options: CliScaffoldAppViteRunOptions): CliScaffoldAppViteRunReturns {
    await runScaffold(options, 'app', 'vite', 'scaffold/app/vite', import.meta.url);

    return;
  }
}
