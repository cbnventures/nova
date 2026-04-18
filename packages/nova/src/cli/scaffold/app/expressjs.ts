import { runScaffold } from '../../../lib/scaffold.js';

import type {
  CliScaffoldAppExpressjsRunOptions,
  CliScaffoldAppExpressjsRunReturns,
} from '../../../types/cli/scaffold/app/expressjs.d.ts';

/**
 * CLI - Scaffold - App - Express.js.
 *
 * Scaffolds an Express.js application as a workspace
 * inside an existing or new monorepo using the shared
 * runScaffold pipeline.
 *
 * @since 0.15.0
 */
export class CliScaffoldAppExpressjs {
  /**
   * CLI - Scaffold - App - Express.js - Run.
   *
   * Entry point invoked by the CLI nova scaffold app expressjs command. Delegates to
   * runScaffold with the Express.js template subpath.
   *
   * @param {CliScaffoldAppExpressjsRunOptions} options - Options.
   *
   * @returns {CliScaffoldAppExpressjsRunReturns}
   *
   * @since 0.15.0
   */
  public static async run(options: CliScaffoldAppExpressjsRunOptions): CliScaffoldAppExpressjsRunReturns {
    await runScaffold(options, 'app', 'express', 'scaffold/app/express', import.meta.url);

    return;
  }
}
