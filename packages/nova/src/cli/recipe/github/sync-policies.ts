import { LIB_GH_MIN_VERSION } from '../../../lib/constants.js';
import { LibNovaConfig } from '../../../lib/nova-config.js';
import { LIB_REGEX_PATTERN_GH_VERSION } from '../../../lib/regex.js';
import {
  compareSemver,
  executeShell,
  isCommandExists,
  isProjectRoot,
  shellQuote,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';
import { handleGhFailure } from './handle-gh-failure.js';

import type {
  CliRecipeGithubSyncPoliciesRunAuthStatus,
  CliRecipeGithubSyncPoliciesRunCommand,
  CliRecipeGithubSyncPoliciesRunCurrentDirectory,
  CliRecipeGithubSyncPoliciesRunFlags,
  CliRecipeGithubSyncPoliciesRunGhVersion,
  CliRecipeGithubSyncPoliciesRunGhVersionMatch,
  CliRecipeGithubSyncPoliciesRunGhVersionOutput,
  CliRecipeGithubSyncPoliciesRunGhVersionPattern,
  CliRecipeGithubSyncPoliciesRunGithub,
  CliRecipeGithubSyncPoliciesRunIsAtProjectRoot,
  CliRecipeGithubSyncPoliciesRunIsCommandOnPath,
  CliRecipeGithubSyncPoliciesRunIsDryRun,
  CliRecipeGithubSyncPoliciesRunMergeMethods,
  CliRecipeGithubSyncPoliciesRunOptions,
  CliRecipeGithubSyncPoliciesRunOwner,
  CliRecipeGithubSyncPoliciesRunPermission,
  CliRecipeGithubSyncPoliciesRunPolicies,
  CliRecipeGithubSyncPoliciesRunRecipes,
  CliRecipeGithubSyncPoliciesRunRepo,
  CliRecipeGithubSyncPoliciesRunResult,
  CliRecipeGithubSyncPoliciesRunReturns,
  CliRecipeGithubSyncPoliciesRunViewerPermission,
  CliRecipeGithubSyncPoliciesRunViewerPermissionParsed,
  CliRecipeGithubSyncPoliciesRunViewResult,
  CliRecipeGithubSyncPoliciesRunWorkingFile,
} from '../../../types/cli/recipe/github/sync-policies.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Policies.
 *
 * Pushes github.policies.{visibility, defaultBranch, mergeMethods.{merge, squash, rebase},
 * autoDeleteHeadBranch} from nova.config.json to a GitHub repository using the gh CLI.
 *
 * @since 0.22.0
 */
export class CliRecipeGithubSyncPolicies {
  /**
   * CLI - Recipe - GitHub - Sync Policies - Run.
   *
   * Runs precheck steps then invokes gh repo edit to sync repository
   * policy settings to the configured repository.
   *
   * @param {CliRecipeGithubSyncPoliciesRunOptions} options - Options.
   *
   * @returns {CliRecipeGithubSyncPoliciesRunReturns}
   *
   * @since 0.22.0
   */
  public static async run(options: CliRecipeGithubSyncPoliciesRunOptions): CliRecipeGithubSyncPoliciesRunReturns {
    const currentDirectory: CliRecipeGithubSyncPoliciesRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliRecipeGithubSyncPoliciesRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: CliRecipeGithubSyncPoliciesRunIsDryRun = options['dryRun'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliRecipeGithubSyncPolicies.run',
        purpose: 'options',
      }).warn('Dry run enabled. gh commands will not be executed in this session.');
    }

    const workingFile: CliRecipeGithubSyncPoliciesRunWorkingFile = await new LibNovaConfig().load();
    const github: CliRecipeGithubSyncPoliciesRunGithub = workingFile['github'];

    if (github === undefined) {
      Logger.warn('Skipping sync-policies. The "github" block was not found in the "nova.config.json" file.');

      return;
    }

    const recipes: CliRecipeGithubSyncPoliciesRunRecipes = github['recipes'];

    if (
      recipes === undefined
      || recipes['sync-policies'] !== true
    ) {
      return;
    }

    const owner: CliRecipeGithubSyncPoliciesRunOwner = github['owner'];
    const repo: CliRecipeGithubSyncPoliciesRunRepo = github['repo'];

    if (
      owner === undefined
      || repo === undefined
    ) {
      Logger.warn('Skipping sync-policies. "github.owner" and "github.repo" must both be set in the "nova.config.json" file.');

      return;
    }

    const isCommandOnPath: CliRecipeGithubSyncPoliciesRunIsCommandOnPath = await isCommandExists('gh');

    if (isCommandOnPath !== true) {
      Logger.error('Skipping sync-policies. The "gh" CLI is not installed.');

      process.exitCode = 1;

      return;
    }

    const ghVersionOutput: CliRecipeGithubSyncPoliciesRunGhVersionOutput = await executeShell('gh --version');
    const ghVersionPattern: CliRecipeGithubSyncPoliciesRunGhVersionPattern = new RegExp(LIB_REGEX_PATTERN_GH_VERSION.source);
    const ghVersionMatch: CliRecipeGithubSyncPoliciesRunGhVersionMatch = ghVersionOutput['textOut'].match(ghVersionPattern);

    if (ghVersionMatch === null) {
      Logger.error('Skipping sync-policies. Could not determine the "gh" CLI version.');

      process.exitCode = 1;

      return;
    }

    const ghVersion: CliRecipeGithubSyncPoliciesRunGhVersion = ghVersionMatch[1] ?? '';

    if (compareSemver(ghVersion, LIB_GH_MIN_VERSION) < 0) {
      Logger.error(`Skipping sync-policies. The "gh" CLI version ${ghVersion} is below the required minimum ${LIB_GH_MIN_VERSION}.`);

      process.exitCode = 1;

      return;
    }

    const authStatus: CliRecipeGithubSyncPoliciesRunAuthStatus = await executeShell('gh auth status');

    if (authStatus['code'] !== 0) {
      Logger.error('Skipping sync-policies. The "gh" CLI is not authenticated.');

      process.exitCode = 1;

      return;
    }

    const viewResult: CliRecipeGithubSyncPoliciesRunViewResult = await executeShell(`gh repo view ${owner}/${repo} --json viewerPermission`);

    if (viewResult['code'] !== 0) {
      Logger.error(`Skipping sync-policies. Cannot access ${owner}/${repo}.`);

      process.exitCode = 1;

      return;
    }

    let viewerPermission: CliRecipeGithubSyncPoliciesRunViewerPermission = undefined;

    try {
      const parsed: CliRecipeGithubSyncPoliciesRunViewerPermissionParsed = JSON.parse(viewResult['textOut']) as CliRecipeGithubSyncPoliciesRunViewerPermissionParsed;

      viewerPermission = parsed['viewerPermission'];
    } catch {
      Logger.customize({
        name: 'CliRecipeGithubSyncPolicies.run',
        purpose: 'precheck',
      }).error(`Skipping sync-policies. Could not parse "gh repo view" output for ${owner}/${repo}.`);

      process.exitCode = 1;

      return;
    }

    if (viewerPermission === undefined) {
      Logger.customize({
        name: 'CliRecipeGithubSyncPolicies.run',
        purpose: 'precheck',
      }).error(`Skipping sync-policies. Could not determine permission for ${owner}/${repo}.`);

      process.exitCode = 1;

      return;
    }

    const permission: CliRecipeGithubSyncPoliciesRunPermission = [
      'WRITE',
      'MAINTAIN',
      'ADMIN',
    ];

    if (permission.includes(viewerPermission) !== true) {
      Logger.error(`Skipping sync-policies. The authenticated user does not have write access to ${owner}/${repo}.`);

      process.exitCode = 1;

      return;
    }

    const policies: CliRecipeGithubSyncPoliciesRunPolicies = github['policies'];

    if (policies === undefined) {
      Logger.warn('Skipping sync-policies. No values found under "github.policies" in the "nova.config.json" file.');

      return;
    }

    const flags: CliRecipeGithubSyncPoliciesRunFlags = [];

    if (policies['visibility'] !== undefined) {
      flags.push(`--visibility=${policies['visibility']}`);
    }

    if (policies['defaultBranch'] !== undefined) {
      flags.push(`--default-branch=${shellQuote(policies['defaultBranch'])}`);
    }

    const mergeMethods: CliRecipeGithubSyncPoliciesRunMergeMethods = policies['mergeMethods'];

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

    const command: CliRecipeGithubSyncPoliciesRunCommand = `gh repo edit ${owner}/${repo} ${flags.join(' ')}`;

    Logger.customize({
      name: 'CliRecipeGithubSyncPolicies.run',
      purpose: 'command',
    }).info(`Command: ${command}`);

    if (isDryRun === true) {
      return;
    }

    const result: CliRecipeGithubSyncPoliciesRunResult = await executeShell(command);

    if (result['code'] !== 0) {
      handleGhFailure(result, 'sync-policies');

      return;
    }

    Logger.customize({
      name: 'CliRecipeGithubSyncPolicies.run',
      purpose: 'summary',
    }).info(`Updated ${owner}/${repo}.`);

    return;
  }
}
