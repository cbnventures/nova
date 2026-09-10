import { shellQuote } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';
import { executeGhCommands } from './gh-commands.js';
import { ghPrecheck } from './gh-precheck.js';

import type {
  Cli_Recipe_Github_SyncLabels_Runner_Run_Commands,
  Cli_Recipe_Github_SyncLabels_Runner_Run_Description,
  Cli_Recipe_Github_SyncLabels_Runner_Run_DidSucceed,
  Cli_Recipe_Github_SyncLabels_Runner_Run_Github,
  Cli_Recipe_Github_SyncLabels_Runner_Run_IsDryRun,
  Cli_Recipe_Github_SyncLabels_Runner_Run_Labels,
  Cli_Recipe_Github_SyncLabels_Runner_Run_Options,
  Cli_Recipe_Github_SyncLabels_Runner_Run_Owner,
  Cli_Recipe_Github_SyncLabels_Runner_Run_Precheck,
  Cli_Recipe_Github_SyncLabels_Runner_Run_Repo,
  Cli_Recipe_Github_SyncLabels_Runner_Run_Returns,
} from '../../../types/cli/recipe/github/sync-labels.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Labels.
 *
 * Creates or updates configured repository labels while leaving labels that Nova
 * does not manage untouched.
 *
 * @since 0.26.0
 */
export class Runner {
  /**
   * CLI - Recipe - GitHub - Sync Labels - Run.
   *
   * Converts every configured label to an idempotent gh label create --force
   * command and applies the list in configuration order.
   *
   * @param {Cli_Recipe_Github_SyncLabels_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_Github_SyncLabels_Runner_Run_Returns}
   *
   * @since 0.26.0
   */
  public static async run(options: Cli_Recipe_Github_SyncLabels_Runner_Run_Options): Cli_Recipe_Github_SyncLabels_Runner_Run_Returns {
    const precheck: Cli_Recipe_Github_SyncLabels_Runner_Run_Precheck = await ghPrecheck('sync-labels', options);

    if (precheck === undefined) {
      return;
    }

    const github: Cli_Recipe_Github_SyncLabels_Runner_Run_Github = precheck['github'];
    const owner: Cli_Recipe_Github_SyncLabels_Runner_Run_Owner = precheck['owner'];
    const repo: Cli_Recipe_Github_SyncLabels_Runner_Run_Repo = precheck['repo'];
    const isDryRun: Cli_Recipe_Github_SyncLabels_Runner_Run_IsDryRun = precheck['isDryRun'];
    const labels: Cli_Recipe_Github_SyncLabels_Runner_Run_Labels = github['labels'];

    if (labels === undefined) {
      Logger.warn('Skipping sync-labels. No value found at "github.labels" in the "nova.config.json" file.');

      return;
    }

    if (labels.length === 0) {
      return;
    }

    const commands: Cli_Recipe_Github_SyncLabels_Runner_Run_Commands = [];

    for (const label of labels) {
      const description: Cli_Recipe_Github_SyncLabels_Runner_Run_Description = label['description'] ?? '';

      commands.push(`gh label create ${shellQuote(label['name'])} --repo ${owner}/${repo} --color ${shellQuote(label['color'])} --description ${shellQuote(description)} --force`);
    }

    const didSucceed: Cli_Recipe_Github_SyncLabels_Runner_Run_DidSucceed = await executeGhCommands(commands, 'sync-labels', isDryRun);

    if (
      didSucceed === false
      || isDryRun === true
    ) {
      return;
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'summary',
    }).info(`Updated ${labels.length} labels on ${owner}/${repo}.`);

    return;
  }
}
