import { executeShell } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';
import { ghPrecheck } from './gh-precheck.js';
import { handleGhFailure } from './handle-gh-failure.js';

import type {
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Command,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Features,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Flags,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Github,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_IsDryRun,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Options,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Owner,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Precheck,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Repo,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Result,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Returns,
} from '../../../types/cli/recipe/github/sync-features.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Features.
 *
 * Pushes github.features.{issues, wiki, projects, discussions} from
 * nova.config.json to a GitHub repository using the gh CLI.
 *
 * @since 0.18.0
 */
export class Runner {
  /**
   * CLI - Recipe - GitHub - Sync Features - Run.
   *
   * Runs precheck steps then invokes gh repo edit to sync repository
   * feature flags to the configured repository.
   *
   * @param {Cli_Recipe_Github_SyncFeatures_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_Github_SyncFeatures_Runner_Run_Returns}
   *
   * @since 0.18.0
   */
  public static async run(options: Cli_Recipe_Github_SyncFeatures_Runner_Run_Options): Cli_Recipe_Github_SyncFeatures_Runner_Run_Returns {
    const precheck: Cli_Recipe_Github_SyncFeatures_Runner_Run_Precheck = await ghPrecheck('sync-features', options);

    if (precheck === undefined) {
      return;
    }

    const github: Cli_Recipe_Github_SyncFeatures_Runner_Run_Github = precheck['github'];
    const owner: Cli_Recipe_Github_SyncFeatures_Runner_Run_Owner = precheck['owner'];
    const repo: Cli_Recipe_Github_SyncFeatures_Runner_Run_Repo = precheck['repo'];
    const isDryRun: Cli_Recipe_Github_SyncFeatures_Runner_Run_IsDryRun = precheck['isDryRun'];

    const features: Cli_Recipe_Github_SyncFeatures_Runner_Run_Features = github['features'];

    if (features === undefined) {
      Logger.warn('Skipping sync-features. No values found under "github.features" in the "nova.config.json" file.');

      return;
    }

    const flags: Cli_Recipe_Github_SyncFeatures_Runner_Run_Flags = [];

    if (features['issues'] !== undefined) {
      flags.push(`--enable-issues=${features['issues']}`);
    }

    if (features['wiki'] !== undefined) {
      flags.push(`--enable-wiki=${features['wiki']}`);
    }

    if (features['projects'] !== undefined) {
      flags.push(`--enable-projects=${features['projects']}`);
    }

    if (features['discussions'] !== undefined) {
      flags.push(`--enable-discussions=${features['discussions']}`);
    }

    if (flags.length === 0) {
      Logger.warn('Skipping sync-features. No values found under "github.features" in the "nova.config.json" file.');

      return;
    }

    const command: Cli_Recipe_Github_SyncFeatures_Runner_Run_Command = `gh repo edit ${owner}/${repo} ${flags.join(' ')}`;

    Logger.customize({
      name: 'Runner.run',
      purpose: 'command',
    }).info(`Command: ${command}`);

    if (isDryRun === true) {
      return;
    }

    const result: Cli_Recipe_Github_SyncFeatures_Runner_Run_Result = await executeShell(command);

    if (result['code'] !== 0) {
      handleGhFailure(result, 'sync-features');

      return;
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'summary',
    }).info(`Updated ${owner}/${repo}.`);

    return;
  }
}
