import { runScaffold } from '../../../lib/scaffold.js';

import type {
  Cli_Scaffold_Package_GithubAction_Runner_Run_Options,
  Cli_Scaffold_Package_GithubAction_Runner_Run_Returns,
} from '../../../types/cli/scaffold/package/github-action.d.ts';

/**
 * CLI - Scaffold - Package - GitHub Action.
 *
 * Scaffolds a bundled TypeScript GitHub Action package through the shared
 * workspace pipeline with its repository-level action manifest.
 *
 * @since 0.29.0
 */
export class Runner {
  /**
   * CLI - Scaffold - Package - GitHub Action - Run.
   *
   * Delegates to the shared scaffold pipeline with both the package template
   * and the companion root action manifest required by GitHub.
   *
   * @param {Cli_Scaffold_Package_GithubAction_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_Package_GithubAction_Runner_Run_Returns}
   *
   * @since 0.29.0
   */
  public static async run(options: Cli_Scaffold_Package_GithubAction_Runner_Run_Options): Cli_Scaffold_Package_GithubAction_Runner_Run_Returns {
    await runScaffold(options, {
      category: 'package',
      importMetaUrl: import.meta.url,
      rootTemplateSubpath: 'scaffold/package/github-action-root',
      templateSubpath: 'scaffold/package/github-action',
      typeName: 'github-action',
    });

    return;
  }
}
