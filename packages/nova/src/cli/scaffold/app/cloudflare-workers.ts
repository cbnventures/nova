import { runScaffold } from '../../../lib/scaffold.js';

import type {
  Cli_Scaffold_App_CloudflareWorkers_Runner_Run_Options,
  Cli_Scaffold_App_CloudflareWorkers_Runner_Run_Returns,
} from '../../../types/cli/scaffold/app/cloudflare-workers.d.ts';

/**
 * CLI - Scaffold - App - Cloudflare Workers.
 *
 * Scaffolds a Cloudflare Workers application as a
 * workspace inside an existing or new monorepo using
 * the shared runScaffold pipeline.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Scaffold - App - Cloudflare Workers - Run.
   *
   * Entry point invoked by the CLI nova scaffold app cloudflare-workers command. Delegates to
   * runScaffold with the Cloudflare Workers template subpath.
   *
   * @param {Cli_Scaffold_App_CloudflareWorkers_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_App_CloudflareWorkers_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Scaffold_App_CloudflareWorkers_Runner_Run_Options): Cli_Scaffold_App_CloudflareWorkers_Runner_Run_Returns {
    await runScaffold(options, {
      category: 'app',
      importMetaUrl: import.meta.url,
      templateSubpath: 'scaffold/app/cloudflare-workers',
      typeName: 'cloudflare-workers',
    });

    return;
  }
}
