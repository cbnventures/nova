import { Runner as ApiGithub } from '../../../api/github.js';
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
  Cli_Recipe_Github_SyncActions_Runner_Run_PermissionsCommand,
  Cli_Recipe_Github_SyncActions_Runner_Run_Precheck,
  Cli_Recipe_Github_SyncActions_Runner_Run_Repo,
  Cli_Recipe_Github_SyncActions_Runner_Run_Returns,
  Cli_Recipe_Github_SyncActions_Runner_Run_SelectedActions,
  Cli_Recipe_Github_SyncActions_Runner_Run_SelectedActionsCommand,
  Cli_Recipe_Github_SyncActions_Runner_Run_WorkflowCommand,
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
    const permissionsCommand: Cli_Recipe_Github_SyncActions_Runner_Run_PermissionsCommand = ApiGithub.buildActionsPermissionsCommand(owner, repo, actions);

    if (permissionsCommand !== undefined) {
      commands.push(permissionsCommand);
    }

    if (selectedActions !== undefined) {
      const selectedActionsCommand: Cli_Recipe_Github_SyncActions_Runner_Run_SelectedActionsCommand = ApiGithub.buildSelectedActionsCommand(owner, repo, selectedActions);

      if (selectedActionsCommand !== undefined) {
        commands.push(selectedActionsCommand);
      }
    }

    const workflowCommand: Cli_Recipe_Github_SyncActions_Runner_Run_WorkflowCommand = ApiGithub.buildWorkflowPermissionsCommand(owner, repo, actions);

    if (workflowCommand !== undefined) {
      commands.push(workflowCommand);
    }

    if (actions['artifactRetentionDays'] !== undefined) {
      commands.push(ApiGithub.buildArtifactRetentionCommand(owner, repo, actions['artifactRetentionDays']));
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
