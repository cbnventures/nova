import {
  executeShell,
  shellQuote,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';
import { ghPrecheck } from './gh-precheck.js';
import { handleGhFailure } from './handle-gh-failure.js';

import type {
  Cli_Recipe_Github_SyncPolicies_Runner_Run_BranchResult,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_Command,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_Flags,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_Github,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_IsDryRun,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_MergeMethods,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_Options,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_Owner,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_Policies,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_Precheck,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_Repo,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_Result,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_Returns,
} from '../../../types/cli/recipe/github/sync-policies.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Policies.
 *
 * Pushes github.policies.{visibility, defaultBranch, mergeMethods.{merge, squash, rebase},
 * autoDeleteHeadBranch} from nova.config.json to a GitHub repository using the gh CLI.
 *
 * @since 0.18.0
 */
export class Runner {
  /**
   * CLI - Recipe - GitHub - Sync Policies - Run.
   *
   * Runs precheck steps then invokes gh repo edit to sync repository
   * policy settings to the configured repository.
   *
   * @param {Cli_Recipe_Github_SyncPolicies_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_Github_SyncPolicies_Runner_Run_Returns}
   *
   * @since 0.18.0
   */
  public static async run(options: Cli_Recipe_Github_SyncPolicies_Runner_Run_Options): Cli_Recipe_Github_SyncPolicies_Runner_Run_Returns {
    const precheck: Cli_Recipe_Github_SyncPolicies_Runner_Run_Precheck = await ghPrecheck('sync-policies', options);

    if (precheck === undefined) {
      return;
    }

    const github: Cli_Recipe_Github_SyncPolicies_Runner_Run_Github = precheck['github'];
    const owner: Cli_Recipe_Github_SyncPolicies_Runner_Run_Owner = precheck['owner'];
    const repo: Cli_Recipe_Github_SyncPolicies_Runner_Run_Repo = precheck['repo'];
    const isDryRun: Cli_Recipe_Github_SyncPolicies_Runner_Run_IsDryRun = precheck['isDryRun'];

    const policies: Cli_Recipe_Github_SyncPolicies_Runner_Run_Policies = github['policies'];

    if (policies === undefined) {
      Logger.warn('Skipping sync-policies. No values found under "github.policies" in the "nova.config.json" file.');

      return;
    }

    const flags: Cli_Recipe_Github_SyncPolicies_Runner_Run_Flags = [];

    if (policies['visibility'] !== undefined) {
      flags.push(`--visibility=${policies['visibility']}`);
      flags.push('--accept-visibility-change-consequences');
    }

    if (policies['defaultBranch'] !== undefined) {
      const branchResult: Cli_Recipe_Github_SyncPolicies_Runner_Run_BranchResult = await executeShell(`gh api repos/${owner}/${repo}/branches/${shellQuote(policies['defaultBranch'])}`);

      if (branchResult['code'] === 0) {
        flags.push(`--default-branch=${shellQuote(policies['defaultBranch'])}`);
      } else {
        Logger.warn(`Skipping "--default-branch" for sync-policies. The branch "${policies['defaultBranch']}" does not exist on ${owner}/${repo} yet.`);
      }
    }

    const mergeMethods: Cli_Recipe_Github_SyncPolicies_Runner_Run_MergeMethods = policies['mergeMethods'];

    if (mergeMethods !== undefined) {
      if (mergeMethods['merge'] !== undefined) {
        flags.push(`--enable-merge-commit=${mergeMethods['merge']}`);
      }

      if (mergeMethods['squash'] !== undefined) {
        flags.push(`--enable-squash-merge=${mergeMethods['squash']}`);
      }

      if (mergeMethods['rebase'] !== undefined) {
        flags.push(`--enable-rebase-merge=${mergeMethods['rebase']}`);
      }
    }

    if (policies['autoDeleteHeadBranch'] !== undefined) {
      flags.push(`--delete-branch-on-merge=${policies['autoDeleteHeadBranch']}`);
    }

    if (flags.length === 0) {
      Logger.warn('Skipping sync-policies. No values found under "github.policies" in the "nova.config.json" file.');

      return;
    }

    const command: Cli_Recipe_Github_SyncPolicies_Runner_Run_Command = `gh repo edit ${owner}/${repo} ${flags.join(' ')}`;

    Logger.customize({
      name: 'Runner.run',
      purpose: 'command',
    }).info(`Command: ${command}`);

    if (isDryRun === true) {
      return;
    }

    const result: Cli_Recipe_Github_SyncPolicies_Runner_Run_Result = await executeShell(command);

    if (result['code'] !== 0) {
      handleGhFailure(result, 'sync-policies');

      return;
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'summary',
    }).info(`Updated ${owner}/${repo}.`);

    return;
  }
}
