import { runScaffold } from '../../../lib/scaffold.js';

import type {
  Cli_Scaffold_Package_Pfsense_Runner_Run_Options,
  Cli_Scaffold_Package_Pfsense_Runner_Run_Returns,
} from '../../../types/cli/scaffold/package/pfsense.d.ts';

/**
 * CLI - Scaffold - Package - Pfsense.
 *
 * Scaffolds a pfSense package with WebGUI settings, a cron-oriented PHP task,
 * FreeBSD port sources, and GitHub Release packaging.
 *
 * @since 0.29.0
 */
export class Runner {
  /**
   * CLI - Scaffold - Package - Pfsense - Run.
   *
   * Delegates to the shared scaffold pipeline with workspace-specific port
   * filenames and a companion repository workflow for FreeBSD packaging.
   *
   * @param {Cli_Scaffold_Package_Pfsense_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_Package_Pfsense_Runner_Run_Returns}
   *
   * @since 0.29.0
   */
  public static async run(options: Cli_Scaffold_Package_Pfsense_Runner_Run_Options): Cli_Scaffold_Package_Pfsense_Runner_Run_Returns {
    await runScaffold(options, {
      category: 'package',
      importMetaUrl: import.meta.url,
      rootTemplateSubpath: 'scaffold/package/pfsense-root',
      templateSubpath: 'scaffold/package/pfsense',
      typeName: 'pfsense',
      workspacePackageNamePrefix: 'pfsense-pkg-',
    });

    return;
  }
}
