import { Runner as ApiGithub } from '../../../api/github.js';
import { executeShell } from '../../../lib/utility.js';
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
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Github,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_IsDryRun,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_LookupCommand,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_LookupResult,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Options,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Owner,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_PlanCommand,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_PlanResult,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Precheck,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Repo,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_RequiredStatusChecks,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Returns,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_RuleCount,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_RulesetId,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_RulesetIdCandidate,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_RulesetIdNumber,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_RulesetName,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Rulesets,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_Visibility,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_VisibilityCommand,
  Cli_Recipe_Github_SyncRulesets_Runner_Run_VisibilityResult,
  Cli_Recipe_Github_SyncRulesets_Runner_WarnUnsupportedPlan_Owner,
  Cli_Recipe_Github_SyncRulesets_Runner_WarnUnsupportedPlan_Repo,
  Cli_Recipe_Github_SyncRulesets_Runner_WarnUnsupportedPlan_Returns,
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
    let ruleCount: Cli_Recipe_Github_SyncRulesets_Runner_Run_RuleCount = 0;

    if (defaultBranch['blockDeletions'] === true) {
      ruleCount += 1;
    }

    if (defaultBranch['blockForcePushes'] === true) {
      ruleCount += 1;
    }

    if (defaultBranch['requireLinearHistory'] === true) {
      ruleCount += 1;
    }

    if (defaultBranch['requireSignedCommits'] === true) {
      ruleCount += 1;
    }

    if (
      defaultBranch['requirePullRequest'] === true
      && allowedMergeMethods !== undefined
    ) {
      ruleCount += 1;
    }

    if (requiredStatusChecks !== undefined && requiredStatusChecks.length > 0) {
      ruleCount += 1;
    }

    if (ruleCount === 0) {
      Logger.error('Invalid "github.rulesets.defaultBranch": at least one protection rule must be enabled.');

      process.exitCode = 1;

      return;
    }

    const visibilityCommand: Cli_Recipe_Github_SyncRulesets_Runner_Run_VisibilityCommand = ApiGithub.buildRepositoryVisibilityCommand(owner, repo);
    const visibilityResult: Cli_Recipe_Github_SyncRulesets_Runner_Run_VisibilityResult = await executeShell(visibilityCommand);

    if (visibilityResult['code'] !== 0) {
      handleGhFailure(visibilityResult, 'sync-rulesets');

      return;
    }

    const visibility: Cli_Recipe_Github_SyncRulesets_Runner_Run_Visibility = ApiGithub.parseRepositoryVisibility(visibilityResult['textOut']);

    if (visibility['isPrivate'] === true) {
      const planCommand: Cli_Recipe_Github_SyncRulesets_Runner_Run_PlanCommand = ApiGithub.buildOwnerPlanCommand(owner, visibility['ownerType']);
      const planResult: Cli_Recipe_Github_SyncRulesets_Runner_Run_PlanResult = await executeShell(planCommand);

      // An unreadable plan is not proof of a free plan, so only a readable "free" skips here.
      if (
        planResult['code'] === 0
        && ApiGithub.isRulesetPlanUnsupported(planResult['textOut']) === true
      ) {
        Runner.warnUnsupportedPlan(owner, repo);

        return;
      }
    }

    const lookupCommand: Cli_Recipe_Github_SyncRulesets_Runner_Run_LookupCommand = ApiGithub.buildRulesetLookupCommand(owner, repo, rulesetName);
    const lookupResult: Cli_Recipe_Github_SyncRulesets_Runner_Run_LookupResult = await executeShell(lookupCommand);

    if (lookupResult['code'] !== 0) {
      if (
        visibility['isPrivate'] === true
        && ApiGithub.isRulesetPlanError(lookupResult['textError']) === true
      ) {
        Runner.warnUnsupportedPlan(owner, repo);

        return;
      }

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

    const command: Cli_Recipe_Github_SyncRulesets_Runner_Run_Command = ApiGithub.buildRulesetSaveCommand(owner, repo, rulesetId, rulesetName, defaultBranch);
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

  /**
   * CLI - Recipe - GitHub - Sync Rulesets - Warn Unsupported Plan.
   *
   * Explains why a private repository on GitHub's free plan is skipped. The skip
   * is not a failure, so the exit code stays unchanged.
   *
   * @param {Cli_Recipe_Github_SyncRulesets_Runner_WarnUnsupportedPlan_Owner} owner - Owner.
   * @param {Cli_Recipe_Github_SyncRulesets_Runner_WarnUnsupportedPlan_Repo}  repo  - Repo.
   *
   * @private
   *
   * @returns {Cli_Recipe_Github_SyncRulesets_Runner_WarnUnsupportedPlan_Returns}
   *
   * @since 0.49.0
   */
  private static warnUnsupportedPlan(owner: Cli_Recipe_Github_SyncRulesets_Runner_WarnUnsupportedPlan_Owner, repo: Cli_Recipe_Github_SyncRulesets_Runner_WarnUnsupportedPlan_Repo): Cli_Recipe_Github_SyncRulesets_Runner_WarnUnsupportedPlan_Returns {
    Logger.customize({
      name: 'Runner.warnUnsupportedPlan',
      purpose: 'plan',
    }).warn(`Skipping sync-rulesets. ${owner}/${repo} is private, and its GitHub plan cannot use rulesets on private repositories. Make the repository public, or move it to GitHub Pro, Team, or Enterprise.`);

    return;
  }
}
