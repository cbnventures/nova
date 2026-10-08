import { runScaffold } from '../../../lib/scaffold.js';

import type {
  Cli_Scaffold_App_Apple_Runner_Run_Options,
  Cli_Scaffold_App_Apple_Runner_Run_Returns,
} from '../../../types/cli/scaffold/app/apple.d.ts';

/**
 * CLI - Scaffold - App - Apple.
 *
 * Scaffolds a SwiftUI Apple application backed by an XcodeGen project
 * definition through the shared workspace pipeline.
 *
 * @since 0.29.0
 */
export class Runner {
  /**
   * CLI - Scaffold - App - Apple - Run.
   *
   * Delegates to the shared scaffold pipeline with the Apple application
   * template so root creation and workspace additions follow one contract.
   *
   * @param {Cli_Scaffold_App_Apple_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_App_Apple_Runner_Run_Returns}
   *
   * @since 0.29.0
   */
  public static async run(options: Cli_Scaffold_App_Apple_Runner_Run_Options): Cli_Scaffold_App_Apple_Runner_Run_Returns {
    await runScaffold(options, {
      category: 'app',
      importMetaUrl: import.meta.url,
      templateSubpath: 'scaffold/app/apple',
      typeName: 'apple',
    });

    return;
  }
}
