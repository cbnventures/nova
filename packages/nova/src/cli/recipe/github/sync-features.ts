import {
  executeShell,
  shellQuote,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';
import { ghPrecheck } from './gh-precheck.js';
import { handleGhFailure } from './handle-gh-failure.js';

import type {
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Features,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Flags,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Github,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_IsDryRun,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Options,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Owner,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Precheck,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Repo,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_RepoEditCommand,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_RepoEditResult,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_RepositoryId,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_RepositoryIdCommand,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_RepositoryIdResult,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Returns,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Sponsorships,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_SponsorshipsCommand,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_SponsorshipsMutation,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_SponsorshipsResult,
} from '../../../types/cli/recipe/github/sync-features.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Features.
 *
 * Pushes github.features.{issues, wiki, projects, discussions, sponsorships} from
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

    const sponsorships: Cli_Recipe_Github_SyncFeatures_Runner_Run_Sponsorships = features['sponsorships'];

    if (
      flags.length === 0
      && sponsorships === undefined
    ) {
      Logger.warn('Skipping sync-features. No values found under "github.features" in the "nova.config.json" file.');

      return;
    }

    let repoEditCommand: Cli_Recipe_Github_SyncFeatures_Runner_Run_RepoEditCommand = undefined;

    if (flags.length > 0) {
      repoEditCommand = `gh repo edit ${owner}/${repo} ${flags.join(' ')}`;

      Logger.customize({
        name: 'Runner.run',
        purpose: 'command',
      }).info(`Command: ${repoEditCommand}`);
    }

    let sponsorshipsCommand: Cli_Recipe_Github_SyncFeatures_Runner_Run_SponsorshipsCommand = undefined;

    if (sponsorships !== undefined) {
      const repositoryIdCommand: Cli_Recipe_Github_SyncFeatures_Runner_Run_RepositoryIdCommand = `gh repo view ${owner}/${repo} --json id --jq .id`;
      const repositoryIdResult: Cli_Recipe_Github_SyncFeatures_Runner_Run_RepositoryIdResult = await executeShell(repositoryIdCommand);

      if (repositoryIdResult['code'] !== 0) {
        handleGhFailure(repositoryIdResult, 'sync-features');

        return;
      }

      const repositoryId: Cli_Recipe_Github_SyncFeatures_Runner_Run_RepositoryId = repositoryIdResult['textOut'];

      if (repositoryId === '') {
        Logger.error(`Unable to resolve the GitHub GraphQL repository ID for ${owner}/${repo}.`);

        process.exitCode = 1;

        return;
      }

      const sponsorshipsMutation: Cli_Recipe_Github_SyncFeatures_Runner_Run_SponsorshipsMutation = 'mutation($repositoryId: ID!, $enabled: Boolean!) { updateRepository(input: { repositoryId: $repositoryId, hasSponsorshipsEnabled: $enabled }) { repository { id } } }';

      sponsorshipsCommand = `gh api graphql -f query=${shellQuote(sponsorshipsMutation)} -F repositoryId=${shellQuote(repositoryId)} -F enabled=${sponsorships}`;

      Logger.customize({
        name: 'Runner.run',
        purpose: 'command',
      }).info(`Command: ${sponsorshipsCommand}`);
    }

    if (isDryRun === true) {
      return;
    }

    if (repoEditCommand !== undefined) {
      const repoEditResult: Cli_Recipe_Github_SyncFeatures_Runner_Run_RepoEditResult = await executeShell(repoEditCommand);

      if (repoEditResult['code'] !== 0) {
        handleGhFailure(repoEditResult, 'sync-features');

        return;
      }
    }

    if (sponsorshipsCommand !== undefined) {
      const sponsorshipsResult: Cli_Recipe_Github_SyncFeatures_Runner_Run_SponsorshipsResult = await executeShell(sponsorshipsCommand);

      if (sponsorshipsResult['code'] !== 0) {
        handleGhFailure(sponsorshipsResult, 'sync-features');

        return;
      }
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'summary',
    }).info(`Updated ${owner}/${repo}.`);

    return;
  }
}
