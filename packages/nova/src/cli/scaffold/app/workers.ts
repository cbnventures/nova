import { runScaffold } from '../../../lib/scaffold.js';

import type {
  CliScaffoldAppWorkersRunOptions,
  CliScaffoldAppWorkersRunReturns,
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
export class CliScaffoldAppWorkers {
  /**
   * CLI - Scaffold - App - Workers - Run.
   *
   * Entry point invoked by the CLI nova scaffold app workers command. Delegates to runScaffold
   * with the Workers template subpath.
   *
   * @param {CliScaffoldAppWorkersRunOptions} options - Options.
   *
   * @returns {CliScaffoldAppWorkersRunReturns}
   *
   * @since 0.15.0
   */
  public static async run(options: CliScaffoldAppWorkersRunOptions): CliScaffoldAppWorkersRunReturns {
    await runScaffold(options, 'app', 'workers', 'scaffold/app/workers', import.meta.url);

    return;
  }
}
