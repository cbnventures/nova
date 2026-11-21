import { Runner as ApiGithub } from '../../../api/github.js';
import { Logger } from '../../../toolkit/index.js';
import { executeGhCommands } from './gh-commands.js';
import { ghPrecheck } from './gh-precheck.js';

import type {
  Cli_Recipe_Github_SyncSecurity_Runner_Run_Commands,
  Cli_Recipe_Github_SyncSecurity_Runner_Run_DidSucceed,
  Cli_Recipe_Github_SyncSecurity_Runner_Run_Github,
  Cli_Recipe_Github_SyncSecurity_Runner_Run_IsDryRun,
  Cli_Recipe_Github_SyncSecurity_Runner_Run_Options,
  Cli_Recipe_Github_SyncSecurity_Runner_Run_Owner,
  Cli_Recipe_Github_SyncSecurity_Runner_Run_Precheck,
  Cli_Recipe_Github_SyncSecurity_Runner_Run_Repo,
  Cli_Recipe_Github_SyncSecurity_Runner_Run_Returns,
  Cli_Recipe_Github_SyncSecurity_Runner_Run_Security,
} from '../../../types/cli/recipe/github/sync-security.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Security.
 *
 * Reconciles vulnerability alerts, Dependabot security updates, secret scanning,
 * and push protection with the repository settings in nova.config.json.
 *
 * @since 0.26.0
 */
export class Runner {
  /**
   * CLI - Recipe - GitHub - Sync Security - Run.
   *
   * Validates the GitHub context, builds dependency-safe security mutations, and
   * executes them in order through the authenticated GitHub CLI.
   *
   * @param {Cli_Recipe_Github_SyncSecurity_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_Github_SyncSecurity_Runner_Run_Returns}
   *
   * @since 0.26.0
   */
  public static async run(options: Cli_Recipe_Github_SyncSecurity_Runner_Run_Options): Cli_Recipe_Github_SyncSecurity_Runner_Run_Returns {
    const precheck: Cli_Recipe_Github_SyncSecurity_Runner_Run_Precheck = await ghPrecheck('sync-security', options);

    if (precheck === undefined) {
      return;
    }

    const github: Cli_Recipe_Github_SyncSecurity_Runner_Run_Github = precheck['github'];
    const owner: Cli_Recipe_Github_SyncSecurity_Runner_Run_Owner = precheck['owner'];
    const repo: Cli_Recipe_Github_SyncSecurity_Runner_Run_Repo = precheck['repo'];
    const isDryRun: Cli_Recipe_Github_SyncSecurity_Runner_Run_IsDryRun = precheck['isDryRun'];
    const security: Cli_Recipe_Github_SyncSecurity_Runner_Run_Security = github['security'];

    if (security === undefined) {
      Logger.warn('Skipping sync-security. No values found under "github.security" in the "nova.config.json" file.');

      return;
    }

    if (
      security['pushProtection'] === true
      && security['secretScanning'] !== true
    ) {
      Logger.error('Invalid "github.security": "secretScanning" must be true when "pushProtection" is true.');

      process.exitCode = 1;

      return;
    }

    if (
      security['dependabotSecurityUpdates'] === true
      && security['vulnerabilityAlerts'] !== true
    ) {
      Logger.error('Invalid "github.security": "vulnerabilityAlerts" must be true when "dependabotSecurityUpdates" is true.');

      process.exitCode = 1;

      return;
    }

    const commands: Cli_Recipe_Github_SyncSecurity_Runner_Run_Commands = [];

    if (security['vulnerabilityAlerts'] !== undefined) {
      commands.push(ApiGithub.buildVulnerabilityAlertsCommand(owner, repo, security['vulnerabilityAlerts']));
    }

    if (security['dependabotSecurityUpdates'] !== undefined) {
      commands.push(ApiGithub.buildAutomatedSecurityFixesCommand(owner, repo, security['dependabotSecurityUpdates']));
    }

    // Push protection depends on secret scanning, so it turns off first and on last.
    if (security['pushProtection'] === false) {
      commands.push(ApiGithub.buildPushProtectionCommand(owner, repo, false));
    }

    if (security['secretScanning'] !== undefined) {
      commands.push(ApiGithub.buildSecretScanningCommand(owner, repo, security['secretScanning']));
    }

    if (security['pushProtection'] === true) {
      commands.push(ApiGithub.buildPushProtectionCommand(owner, repo, true));
    }

    if (commands.length === 0) {
      Logger.warn('Skipping sync-security. No values found under "github.security" in the "nova.config.json" file.');

      return;
    }

    const didSucceed: Cli_Recipe_Github_SyncSecurity_Runner_Run_DidSucceed = await executeGhCommands(commands, 'sync-security', isDryRun);

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
