import { Runner as ApiGithub } from '../../../api/github.js';
import { executeShell } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';
import { ghPrecheck } from './gh-precheck.js';
import { handleGhFailure } from './handle-gh-failure.js';

import type {
  Cli_Recipe_Github_SyncPolicies_Runner_Run_ApiCommand,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_ApiResult,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_BranchCommand,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_BranchResult,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_DefaultBranch,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_Github,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_IsDryRun,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_MergeCommit,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_Options,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_Owner,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_Policies,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_Precheck,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_Repo,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_RepoEditCommand,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_RepoEditResult,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_Returns,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_SquashMerge,
} from '../../../types/cli/recipe/github/sync-policies.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Policies.
 *
 * Pushes repository visibility, branch, merge, update, and web-signoff policies
 * from nova.config.json to a GitHub repository using the gh CLI.
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

    let defaultBranch: Cli_Recipe_Github_SyncPolicies_Runner_Run_DefaultBranch = undefined;

    if (policies['defaultBranch'] !== undefined) {
      const branchCommand: Cli_Recipe_Github_SyncPolicies_Runner_Run_BranchCommand = ApiGithub.buildBranchLookupCommand(owner, repo, policies['defaultBranch']);
      const branchResult: Cli_Recipe_Github_SyncPolicies_Runner_Run_BranchResult = await executeShell(branchCommand);

      if (branchResult['code'] === 0) {
        defaultBranch = policies['defaultBranch'];
      } else {
        Logger.warn(`Skipping "--default-branch" for sync-policies. The branch "${policies['defaultBranch']}" does not exist on ${owner}/${repo} yet.`);
      }
    }

    const mergeCommit: Cli_Recipe_Github_SyncPolicies_Runner_Run_MergeCommit = policies['mergeCommit'];

    if (
      mergeCommit !== undefined
      && mergeCommit['message'] !== undefined
      && mergeCommit['title'] === undefined
    ) {
      Logger.error('Invalid "github.policies.mergeCommit": "title" is required when "message" is set.');

      process.exitCode = 1;

      return;
    }

    const squashMerge: Cli_Recipe_Github_SyncPolicies_Runner_Run_SquashMerge = policies['squashMerge'];

    if (
      squashMerge !== undefined
      && squashMerge['message'] !== undefined
      && squashMerge['title'] === undefined
    ) {
      Logger.error('Invalid "github.policies.squashMerge": "title" is required when "message" is set.');

      process.exitCode = 1;

      return;
    }

    const repoEditCommand: Cli_Recipe_Github_SyncPolicies_Runner_Run_RepoEditCommand = ApiGithub.buildPoliciesEditCommand(owner, repo, policies, defaultBranch);
    const apiCommand: Cli_Recipe_Github_SyncPolicies_Runner_Run_ApiCommand = ApiGithub.buildPoliciesUpdateCommand(owner, repo, policies);

    if (
      repoEditCommand === undefined
      && apiCommand === undefined
    ) {
      Logger.warn('Skipping sync-policies. No values found under "github.policies" in the "nova.config.json" file.');

      return;
    }

    if (repoEditCommand !== undefined) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'command',
      }).info(`Command: ${repoEditCommand}`);
    }

    if (apiCommand !== undefined) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'command',
      }).info(`Command: ${apiCommand}`);
    }

    if (isDryRun === true) {
      return;
    }

    if (repoEditCommand !== undefined) {
      const repoEditResult: Cli_Recipe_Github_SyncPolicies_Runner_Run_RepoEditResult = await executeShell(repoEditCommand);

      if (repoEditResult['code'] !== 0) {
        handleGhFailure(repoEditResult, 'sync-policies');

        return;
      }
    }

    if (apiCommand !== undefined) {
      const apiResult: Cli_Recipe_Github_SyncPolicies_Runner_Run_ApiResult = await executeShell(apiCommand);

      if (apiResult['code'] !== 0) {
        handleGhFailure(apiResult, 'sync-policies');

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
