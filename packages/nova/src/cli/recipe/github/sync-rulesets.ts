import {
  executeShell,
  shellQuote,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';
import { executeGhCommands } from './gh-commands.js';
import { ghPrecheck } from './gh-precheck.js';
import { handleGhFailure } from './handle-gh-failure.js';

import type {
  Cli_Recipe_Github_SyncRulesets_Runner_Run_AllowedMergeMethods,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Command,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Commands,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_DefaultBranch,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_DidSucceed,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Endpoint,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Enforcement,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Flags,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Github,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_IsDryRun,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_LookupCommand,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_LookupResult,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Method,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Options,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Owner,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Precheck,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Query,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Repo,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_RequiredStatusChecks,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Returns,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_RuleCount,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_RulesetId,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_RulesetIdCandidate,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_RulesetIdNumber,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_RulesetName,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Rulesets,
} from '../../../types/cli/recipe/github/sync-rulesets.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Rulesets.
 *
 * Creates or updates Nova's named default-branch ruleset without changing any
 * repository or organization rulesets owned by someone else.
 *
 * @since 0.26.0
 */
export class Runner {
  /**
   * CLI - Recipe - GitHub - Sync Rulesets - Run.
   *
   * Builds the complete desired rule list, locates Nova's managed ruleset, and
   * chooses the GitHub create or update endpoint without pruning other rulesets.
   *
   * @param {Cli_Recipe_Github_SyncRulesets_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_Github_SyncRulesets_Runner_Run_Returns}
   *
   * @since 0.26.0
   */
  public static async run(options: Cli_Recipe_Github_SyncRulesets_Runner_Run_Options): Cli_Recipe_Github_SyncRulesets_Runner_Run_Returns {
    const precheck: Cli_Recipe_Github_SyncRulesets_Runner_Run_Precheck = await ghPrecheck('sync-rulesets', options);

    if (precheck === undefined) {
      return;
    }

    const github: Cli_Recipe_Github_SyncRulesets_Runner_Run_Github = precheck['github'];
    const owner: Cli_Recipe_Github_SyncRulesets_Runner_Run_Owner = precheck['owner'];
    const repo: Cli_Recipe_Github_SyncRulesets_Runner_Run_Repo = precheck['repo'];
    const isDryRun: Cli_Recipe_Github_SyncRulesets_Runner_Run_IsDryRun = precheck['isDryRun'];
    const rulesets: Cli_Recipe_Github_SyncRulesets_Runner_Run_Rulesets = github['rulesets'];
    const defaultBranch: Cli_Recipe_Github_SyncRulesets_Runner_Run_DefaultBranch = (rulesets !== undefined) ? rulesets['defaultBranch'] : undefined;

    if (defaultBranch === undefined) {
      Logger.warn('Skipping sync-rulesets. No value found at "github.rulesets.defaultBranch" in the "nova.config.json" file.');

      return;
    }

    const allowedMergeMethods: Cli_Recipe_Github_SyncRulesets_Runner_Run_AllowedMergeMethods = defaultBranch['allowedMergeMethods'];

    if (
      defaultBranch['requirePullRequest'] === true
      && (
        allowedMergeMethods === undefined
        || allowedMergeMethods.length === 0
      )
    ) {
      Logger.error('Invalid "github.rulesets.defaultBranch": "allowedMergeMethods" must contain at least one method when "requirePullRequest" is true.');

      process.exitCode = 1;

      return;
    }

    if (
      defaultBranch['requirePullRequest'] !== true
      && (
        allowedMergeMethods !== undefined
        || defaultBranch['dismissStaleReviews'] !== undefined
        || defaultBranch['requireCodeOwnerReview'] !== undefined
        || defaultBranch['requireLastPushApproval'] !== undefined
        || defaultBranch['requiredApprovals'] !== undefined
        || defaultBranch['requireConversationResolution'] !== undefined
      )
    ) {
      Logger.error('Invalid "github.rulesets.defaultBranch": pull-request review settings require "requirePullRequest" to be true.');

      process.exitCode = 1;

      return;
    }

    const requiredStatusChecks: Cli_Recipe_Github_SyncRulesets_Runner_Run_RequiredStatusChecks = defaultBranch['requiredStatusChecks'];

    if (
      defaultBranch['requireBranchesToBeUpToDate'] === true
      && (
        requiredStatusChecks === undefined
        || requiredStatusChecks.length === 0
      )
    ) {
      Logger.error('Invalid "github.rulesets.defaultBranch": "requiredStatusChecks" must contain at least one check when "requireBranchesToBeUpToDate" is true.');

      process.exitCode = 1;

      return;
    }

    const rulesetName: Cli_Recipe_Github_SyncRulesets_Runner_Run_RulesetName = 'Nova default branch';
    const enforcement: Cli_Recipe_Github_SyncRulesets_Runner_Run_Enforcement = defaultBranch['enforcement'] ?? 'active';
    const flags: Cli_Recipe_Github_SyncRulesets_Runner_Run_Flags = [
      `-f ${shellQuote(`name=${rulesetName}`)}`,
      '-f target=branch',
      `-f enforcement=${enforcement}`,
      `-f ${shellQuote('conditions[ref_name][include][]=~DEFAULT_BRANCH')}`,
      `-F ${shellQuote('conditions[ref_name][exclude][]')}`,
    ];
    let ruleCount: Cli_Recipe_Github_SyncRulesets_Runner_Run_RuleCount = 0;

    if (defaultBranch['blockDeletions'] === true) {
      flags.push(`-f ${shellQuote('rules[][type]=deletion')}`);
      ruleCount += 1;
    }

    if (defaultBranch['blockForcePushes'] === true) {
      flags.push(`-f ${shellQuote('rules[][type]=non_fast_forward')}`);
      ruleCount += 1;
    }

    if (defaultBranch['requireLinearHistory'] === true) {
      flags.push(`-f ${shellQuote('rules[][type]=required_linear_history')}`);
      ruleCount += 1;
    }

    if (defaultBranch['requireSignedCommits'] === true) {
      flags.push(`-f ${shellQuote('rules[][type]=required_signatures')}`);
      ruleCount += 1;
    }

    if (
      defaultBranch['requirePullRequest'] === true
      && allowedMergeMethods !== undefined
    ) {
      flags.push(`-f ${shellQuote('rules[][type]=pull_request')}`);

      for (const allowedMergeMethod of allowedMergeMethods) {
        flags.push(`-f ${shellQuote(`rules[][parameters][allowed_merge_methods][]=${allowedMergeMethod}`)}`);
      }

      flags.push(`-F ${shellQuote(`rules[][parameters][dismiss_stale_reviews_on_push]=${defaultBranch['dismissStaleReviews'] ?? false}`)}`);
      flags.push(`-F ${shellQuote(`rules[][parameters][require_code_owner_review]=${defaultBranch['requireCodeOwnerReview'] ?? false}`)}`);
      flags.push(`-F ${shellQuote(`rules[][parameters][require_last_push_approval]=${defaultBranch['requireLastPushApproval'] ?? false}`)}`);
      flags.push(`-F ${shellQuote(`rules[][parameters][required_approving_review_count]=${defaultBranch['requiredApprovals'] ?? 0}`)}`);
      flags.push(`-F ${shellQuote(`rules[][parameters][required_review_thread_resolution]=${defaultBranch['requireConversationResolution'] ?? false}`)}`);

      ruleCount += 1;
    }

    if (requiredStatusChecks !== undefined && requiredStatusChecks.length > 0) {
      flags.push(`-f ${shellQuote('rules[][type]=required_status_checks')}`);

      for (const requiredStatusCheck of requiredStatusChecks) {
        flags.push(`-f ${shellQuote(`rules[][parameters][required_status_checks][][context]=${requiredStatusCheck}`)}`);
      }

      flags.push(`-F ${shellQuote('rules[][parameters][do_not_enforce_on_create]=false')}`);
      flags.push(`-F ${shellQuote(`rules[][parameters][strict_required_status_checks_policy]=${defaultBranch['requireBranchesToBeUpToDate'] ?? false}`)}`);

      ruleCount += 1;
    }

    if (ruleCount === 0) {
      Logger.error('Invalid "github.rulesets.defaultBranch": at least one protection rule must be enabled.');

      process.exitCode = 1;

      return;
    }

    const query: Cli_Recipe_Github_SyncRulesets_Runner_Run_Query = `flatten | map(select(.name == "${rulesetName}" and .source_type == "Repository")) | first | .id // empty`;
    const lookupCommand: Cli_Recipe_Github_SyncRulesets_Runner_Run_LookupCommand = `gh api repos/${owner}/${repo}/rulesets --paginate --slurp --jq ${shellQuote(query)}`;
    const lookupResult: Cli_Recipe_Github_SyncRulesets_Runner_Run_LookupResult = await executeShell(lookupCommand);

    if (lookupResult['code'] !== 0) {
      handleGhFailure(lookupResult, 'sync-rulesets');

      return;
    }

    const rulesetIdCandidate: Cli_Recipe_Github_SyncRulesets_Runner_Run_RulesetIdCandidate = lookupResult['textOut'];
    const rulesetIdNumber: Cli_Recipe_Github_SyncRulesets_Runner_Run_RulesetIdNumber = Number(rulesetIdCandidate);
    let rulesetId: Cli_Recipe_Github_SyncRulesets_Runner_Run_RulesetId = undefined;

    if (rulesetIdCandidate !== '') {
      if (
        Number.isInteger(rulesetIdNumber) === false
        || rulesetIdNumber <= 0
      ) {
        Logger.error(`Unable to parse the Nova-managed GitHub ruleset ID for ${owner}/${repo}.`);

        process.exitCode = 1;

        return;
      }

      rulesetId = String(rulesetIdNumber);
    }

    const method: Cli_Recipe_Github_SyncRulesets_Runner_Run_Method = (rulesetId === undefined) ? 'POST' : 'PUT';
    const endpoint: Cli_Recipe_Github_SyncRulesets_Runner_Run_Endpoint = (rulesetId === undefined) ? `repos/${owner}/${repo}/rulesets` : `repos/${owner}/${repo}/rulesets/${rulesetId}`;
    const command: Cli_Recipe_Github_SyncRulesets_Runner_Run_Command = `gh api --method ${method} ${endpoint} ${flags.join(' ')} --silent`;
    const commands: Cli_Recipe_Github_SyncRulesets_Runner_Run_Commands = [command];
    const didSucceed: Cli_Recipe_Github_SyncRulesets_Runner_Run_DidSucceed = await executeGhCommands(commands, 'sync-rulesets', isDryRun);

    if (
      didSucceed === false
      || isDryRun === true
    ) {
      return;
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'summary',
    }).info(`Updated ${rulesetName} on ${owner}/${repo}.`);

    return;
  }
}
