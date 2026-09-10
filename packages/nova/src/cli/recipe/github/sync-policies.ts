import {
  executeShell,
  shellQuote,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';
import { ghPrecheck } from './gh-precheck.js';
import { handleGhFailure } from './handle-gh-failure.js';

import type {
  Cli_Recipe_Github_SyncPolicies_Runner_Run_ApiCommand,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_ApiFlags,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_ApiResult,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_BranchResult,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_Flags,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_Github,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_IsDryRun,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_MergeCommit,
  Cli_Recipe_Github_SyncPolicies_Runner_Run_MergeMethods,
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

    if (policies['autoMerge'] !== undefined) {
      flags.push(`--enable-auto-merge=${policies['autoMerge']}`);
    }

    if (policies['allowUpdateBranch'] !== undefined) {
      flags.push(`--allow-update-branch=${policies['allowUpdateBranch']}`);
    }

    const apiFlags: Cli_Recipe_Github_SyncPolicies_Runner_Run_ApiFlags = [];
    const mergeCommit: Cli_Recipe_Github_SyncPolicies_Runner_Run_MergeCommit = policies['mergeCommit'];

    if (mergeCommit !== undefined) {
      if (
        mergeCommit['message'] !== undefined
        && mergeCommit['title'] === undefined
      ) {
        Logger.error('Invalid "github.policies.mergeCommit": "title" is required when "message" is set.');

        process.exitCode = 1;

        return;
      }

      if (mergeCommit['title'] === 'pull-request-title') {
        apiFlags.push('-f merge_commit_title=PR_TITLE');
      }

      if (mergeCommit['title'] === 'merge-message') {
        apiFlags.push('-f merge_commit_title=MERGE_MESSAGE');
      }

      if (mergeCommit['message'] === 'pull-request-body') {
        apiFlags.push('-f merge_commit_message=PR_BODY');
      }

      if (mergeCommit['message'] === 'pull-request-title') {
        apiFlags.push('-f merge_commit_message=PR_TITLE');
      }

      if (mergeCommit['message'] === 'blank') {
        apiFlags.push('-f merge_commit_message=BLANK');
      }
    }

    const squashMerge: Cli_Recipe_Github_SyncPolicies_Runner_Run_SquashMerge = policies['squashMerge'];

    if (squashMerge !== undefined) {
      if (
        squashMerge['message'] !== undefined
        && squashMerge['title'] === undefined
      ) {
        Logger.error('Invalid "github.policies.squashMerge": "title" is required when "message" is set.');

        process.exitCode = 1;

        return;
      }

      if (squashMerge['title'] === 'pull-request-title') {
        apiFlags.push('-f squash_merge_commit_title=PR_TITLE');
      }

      if (squashMerge['title'] === 'commit-or-pull-request-title') {
        apiFlags.push('-f squash_merge_commit_title=COMMIT_OR_PR_TITLE');
      }

      if (squashMerge['message'] === 'pull-request-body') {
        apiFlags.push('-f squash_merge_commit_message=PR_BODY');
      }

      if (squashMerge['message'] === 'commit-messages') {
        apiFlags.push('-f squash_merge_commit_message=COMMIT_MESSAGES');
      }

      if (squashMerge['message'] === 'blank') {
        apiFlags.push('-f squash_merge_commit_message=BLANK');
      }
    }

    if (policies['webCommitSignoffRequired'] !== undefined) {
      apiFlags.push(`-F web_commit_signoff_required=${policies['webCommitSignoffRequired']}`);
    }

    if (
      flags.length === 0
      && apiFlags.length === 0
    ) {
      Logger.warn('Skipping sync-policies. No values found under "github.policies" in the "nova.config.json" file.');

      return;
    }

    let repoEditCommand: Cli_Recipe_Github_SyncPolicies_Runner_Run_RepoEditCommand = undefined;

    if (flags.length > 0) {
      repoEditCommand = `gh repo edit ${owner}/${repo} ${flags.join(' ')}`;

      Logger.customize({
        name: 'Runner.run',
        purpose: 'command',
      }).info(`Command: ${repoEditCommand}`);
    }

    let apiCommand: Cli_Recipe_Github_SyncPolicies_Runner_Run_ApiCommand = undefined;

    if (apiFlags.length > 0) {
      apiCommand = `gh api --method PATCH repos/${owner}/${repo} ${apiFlags.join(' ')}`;

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
