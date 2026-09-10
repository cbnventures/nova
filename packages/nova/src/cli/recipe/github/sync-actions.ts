import { shellQuote } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';
import { executeGhCommands } from './gh-commands.js';
import { ghPrecheck } from './gh-precheck.js';

import type {
  Cli_Recipe_Github_SyncActions_Runner_Run_Actions,
  Cli_Recipe_Github_SyncActions_Runner_Run_Commands,
  Cli_Recipe_Github_SyncActions_Runner_Run_DidSucceed,
  Cli_Recipe_Github_SyncActions_Runner_Run_Github,
  Cli_Recipe_Github_SyncActions_Runner_Run_IsDryRun,
  Cli_Recipe_Github_SyncActions_Runner_Run_Options,
  Cli_Recipe_Github_SyncActions_Runner_Run_Owner,
  Cli_Recipe_Github_SyncActions_Runner_Run_PermissionFlags,
  Cli_Recipe_Github_SyncActions_Runner_Run_Precheck,
  Cli_Recipe_Github_SyncActions_Runner_Run_Repo,
  Cli_Recipe_Github_SyncActions_Runner_Run_Returns,
  Cli_Recipe_Github_SyncActions_Runner_Run_SelectedActionFlags,
  Cli_Recipe_Github_SyncActions_Runner_Run_SelectedActions,
  Cli_Recipe_Github_SyncActions_Runner_Run_WorkflowFlags,
} from '../../../types/cli/recipe/github/sync-actions.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Actions.
 *
 * Reconciles repository Actions availability, allowlists, workflow token defaults,
 * review permissions, and artifact retention from nova.config.json.
 *
 * @since 0.26.0
 */
export class Runner {
  /**
   * CLI - Recipe - GitHub - Sync Actions - Run.
   *
   * Validates dependent settings, converts Nova names to GitHub API fields, and
   * sends the configured repository-level Actions policies in dependency order.
   *
   * @param {Cli_Recipe_Github_SyncActions_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_Github_SyncActions_Runner_Run_Returns}
   *
   * @since 0.26.0
   */
  public static async run(options: Cli_Recipe_Github_SyncActions_Runner_Run_Options): Cli_Recipe_Github_SyncActions_Runner_Run_Returns {
    const precheck: Cli_Recipe_Github_SyncActions_Runner_Run_Precheck = await ghPrecheck('sync-actions', options);

    if (precheck === undefined) {
      return;
    }

    const github: Cli_Recipe_Github_SyncActions_Runner_Run_Github = precheck['github'];
    const owner: Cli_Recipe_Github_SyncActions_Runner_Run_Owner = precheck['owner'];
    const repo: Cli_Recipe_Github_SyncActions_Runner_Run_Repo = precheck['repo'];
    const isDryRun: Cli_Recipe_Github_SyncActions_Runner_Run_IsDryRun = precheck['isDryRun'];
    const actions: Cli_Recipe_Github_SyncActions_Runner_Run_Actions = github['actions'];

    if (actions === undefined) {
      Logger.warn('Skipping sync-actions. No values found under "github.actions" in the "nova.config.json" file.');

      return;
    }

    if (
      actions['enabled'] === undefined
      && (
        actions['allowedActions'] !== undefined
        || actions['shaPinningRequired'] !== undefined
      )
    ) {
      Logger.error('Invalid "github.actions": "enabled" is required when "allowedActions" or "shaPinningRequired" is set.');

      process.exitCode = 1;

      return;
    }

    const selectedActions: Cli_Recipe_Github_SyncActions_Runner_Run_SelectedActions = actions['selectedActions'];

    if (
      selectedActions !== undefined
      && actions['allowedActions'] !== 'selected'
    ) {
      Logger.error('Invalid "github.actions.selectedActions": "allowedActions" must be "selected".');

      process.exitCode = 1;

      return;
    }

    const commands: Cli_Recipe_Github_SyncActions_Runner_Run_Commands = [];
    const permissionFlags: Cli_Recipe_Github_SyncActions_Runner_Run_PermissionFlags = [];

    if (actions['enabled'] !== undefined) {
      permissionFlags.push(`-F enabled=${actions['enabled']}`);
    }

    if (actions['allowedActions'] === 'all') {
      permissionFlags.push('-f allowed_actions=all');
    }

    if (actions['allowedActions'] === 'local-only') {
      permissionFlags.push('-f allowed_actions=local_only');
    }

    if (actions['allowedActions'] === 'selected') {
      permissionFlags.push('-f allowed_actions=selected');
    }

    if (actions['shaPinningRequired'] !== undefined) {
      permissionFlags.push(`-F sha_pinning_required=${actions['shaPinningRequired']}`);
    }

    if (permissionFlags.length > 0) {
      commands.push(`gh api --method PUT repos/${owner}/${repo}/actions/permissions ${permissionFlags.join(' ')} --silent`);
    }

    if (selectedActions !== undefined) {
      const selectedActionFlags: Cli_Recipe_Github_SyncActions_Runner_Run_SelectedActionFlags = [];

      if (selectedActions['githubOwned'] !== undefined) {
        selectedActionFlags.push(`-F github_owned_allowed=${selectedActions['githubOwned']}`);
      }

      if (selectedActions['verified'] !== undefined) {
        selectedActionFlags.push(`-F verified_allowed=${selectedActions['verified']}`);
      }

      if (selectedActions['patterns'] !== undefined) {
        if (selectedActions['patterns'].length === 0) {
          selectedActionFlags.push(`-F ${shellQuote('patterns_allowed[]')}`);
        }

        for (const pattern of selectedActions['patterns']) {
          selectedActionFlags.push(`-f ${shellQuote(`patterns_allowed[]=${pattern}`)}`);
        }
      }

      if (selectedActionFlags.length > 0) {
        commands.push(`gh api --method PUT repos/${owner}/${repo}/actions/permissions/selected-actions ${selectedActionFlags.join(' ')} --silent`);
      }
    }

    const workflowFlags: Cli_Recipe_Github_SyncActions_Runner_Run_WorkflowFlags = [];

    if (actions['defaultWorkflowPermissions'] !== undefined) {
      workflowFlags.push(`-f default_workflow_permissions=${actions['defaultWorkflowPermissions']}`);
    }

    if (actions['canApprovePullRequestReviews'] !== undefined) {
      workflowFlags.push(`-F can_approve_pull_request_reviews=${actions['canApprovePullRequestReviews']}`);
    }

    if (workflowFlags.length > 0) {
      commands.push(`gh api --method PUT repos/${owner}/${repo}/actions/permissions/workflow ${workflowFlags.join(' ')} --silent`);
    }

    if (actions['artifactRetentionDays'] !== undefined) {
      commands.push(`gh api --method PUT repos/${owner}/${repo}/actions/permissions/artifact-and-log-retention -F days=${actions['artifactRetentionDays']} --silent`);
    }

    if (commands.length === 0) {
      Logger.warn('Skipping sync-actions. No values found under "github.actions" in the "nova.config.json" file.');

      return;
    }

    const didSucceed: Cli_Recipe_Github_SyncActions_Runner_Run_DidSucceed = await executeGhCommands(commands, 'sync-actions', isDryRun);

    if (
      didSucceed === false
      || isDryRun === true
    ) {
      return;
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'summary',
    }).info(`Updated ${owner}/${repo}.`);

    return;
  }
}
