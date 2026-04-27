import { LIB_GH_MIN_VERSION } from '../../../lib/constants.js';
import { LibNovaConfig } from '../../../lib/nova-config.js';
import { LIB_REGEX_PATTERN_GH_VERSION } from '../../../lib/regex.js';
import {
  compareSemver,
  executeShell,
  isCommandExists,
  isProjectRoot,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';
import { handleGhFailure } from './handle-gh-failure.js';

import type {
  CliRecipeGithubSyncFeaturesRunAuthStatus,
  CliRecipeGithubSyncFeaturesRunCommand,
  CliRecipeGithubSyncFeaturesRunCurrentDirectory,
  CliRecipeGithubSyncFeaturesRunFeatures,
  CliRecipeGithubSyncFeaturesRunFlags,
  CliRecipeGithubSyncFeaturesRunGhVersion,
  CliRecipeGithubSyncFeaturesRunGhVersionMatch,
  CliRecipeGithubSyncFeaturesRunGhVersionOutput,
  CliRecipeGithubSyncFeaturesRunGhVersionPattern,
  CliRecipeGithubSyncFeaturesRunGithub,
  CliRecipeGithubSyncFeaturesRunIsAtProjectRoot,
  CliRecipeGithubSyncFeaturesRunIsCommandOnPath,
  CliRecipeGithubSyncFeaturesRunIsDryRun,
  CliRecipeGithubSyncFeaturesRunOptions,
  CliRecipeGithubSyncFeaturesRunOwner,
  CliRecipeGithubSyncFeaturesRunPermission,
  CliRecipeGithubSyncFeaturesRunRecipes,
  CliRecipeGithubSyncFeaturesRunRepo,
  CliRecipeGithubSyncFeaturesRunResult,
  CliRecipeGithubSyncFeaturesRunReturns,
  CliRecipeGithubSyncFeaturesRunViewerPermission,
  CliRecipeGithubSyncFeaturesRunViewerPermissionParsed,
  CliRecipeGithubSyncFeaturesRunViewResult,
  CliRecipeGithubSyncFeaturesRunWorkingFile,
} from '../../../types/cli/recipe/github/sync-features.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Features.
 *
 * Pushes github.features.{issues, wiki, projects, discussions} from
 * nova.config.json to a GitHub repository using the gh CLI.
 *
 * @since 0.22.0
 */
export class CliRecipeGithubSyncFeatures {
  /**
   * CLI - Recipe - GitHub - Sync Features - Run.
   *
   * Runs precheck steps then invokes gh repo edit to sync repository
   * feature flags to the configured repository.
   *
   * @param {CliRecipeGithubSyncFeaturesRunOptions} options - Options.
   *
   * @returns {CliRecipeGithubSyncFeaturesRunReturns}
   *
   * @since 0.22.0
   */
  public static async run(options: CliRecipeGithubSyncFeaturesRunOptions): CliRecipeGithubSyncFeaturesRunReturns {
    const currentDirectory: CliRecipeGithubSyncFeaturesRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliRecipeGithubSyncFeaturesRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: CliRecipeGithubSyncFeaturesRunIsDryRun = options['dryRun'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliRecipeGithubSyncFeatures.run',
        purpose: 'options',
      }).warn('Dry run enabled. gh commands will not be executed in this session.');
    }

    const workingFile: CliRecipeGithubSyncFeaturesRunWorkingFile = await new LibNovaConfig().load();
    const github: CliRecipeGithubSyncFeaturesRunGithub = workingFile['github'];

    if (github === undefined) {
      Logger.warn('Skipping sync-features. The "github" block was not found in the "nova.config.json" file.');

      return;
    }

    const recipes: CliRecipeGithubSyncFeaturesRunRecipes = github['recipes'];

    if (
      recipes === undefined
      || recipes['sync-features'] !== true
    ) {
      return;
    }

    const owner: CliRecipeGithubSyncFeaturesRunOwner = github['owner'];
    const repo: CliRecipeGithubSyncFeaturesRunRepo = github['repo'];

    if (
      owner === undefined
      || repo === undefined
    ) {
      Logger.warn('Skipping sync-features. "github.owner" and "github.repo" must both be set in the "nova.config.json" file.');

      return;
    }

    const isCommandOnPath: CliRecipeGithubSyncFeaturesRunIsCommandOnPath = await isCommandExists('gh');

    if (isCommandOnPath !== true) {
      Logger.error('Skipping sync-features. The "gh" CLI is not installed.');

      process.exitCode = 1;

      return;
    }

    const ghVersionOutput: CliRecipeGithubSyncFeaturesRunGhVersionOutput = await executeShell('gh --version');
    const ghVersionPattern: CliRecipeGithubSyncFeaturesRunGhVersionPattern = new RegExp(LIB_REGEX_PATTERN_GH_VERSION.source);
    const ghVersionMatch: CliRecipeGithubSyncFeaturesRunGhVersionMatch = ghVersionOutput['textOut'].match(ghVersionPattern);

    if (ghVersionMatch === null) {
      Logger.error('Skipping sync-features. Could not determine the "gh" CLI version.');

      process.exitCode = 1;

      return;
    }

    const ghVersion: CliRecipeGithubSyncFeaturesRunGhVersion = ghVersionMatch[1] ?? '';

    if (compareSemver(ghVersion, LIB_GH_MIN_VERSION) < 0) {
      Logger.error(`Skipping sync-features. The "gh" CLI version ${ghVersion} is below the required minimum ${LIB_GH_MIN_VERSION}.`);

      process.exitCode = 1;

      return;
    }

    const authStatus: CliRecipeGithubSyncFeaturesRunAuthStatus = await executeShell('gh auth status');

    if (authStatus['code'] !== 0) {
      Logger.error('Skipping sync-features. The "gh" CLI is not authenticated.');

      process.exitCode = 1;

      return;
    }

    const viewResult: CliRecipeGithubSyncFeaturesRunViewResult = await executeShell(`gh repo view ${owner}/${repo} --json viewerPermission`);

    if (viewResult['code'] !== 0) {
      Logger.error(`Skipping sync-features. Cannot access ${owner}/${repo}.`);

      process.exitCode = 1;

      return;
    }

    let viewerPermission: CliRecipeGithubSyncFeaturesRunViewerPermission = undefined;

    try {
      const parsed: CliRecipeGithubSyncFeaturesRunViewerPermissionParsed = JSON.parse(viewResult['textOut']) as CliRecipeGithubSyncFeaturesRunViewerPermissionParsed;

      viewerPermission = parsed['viewerPermission'];
    } catch {
      Logger.customize({
        name: 'CliRecipeGithubSyncFeatures.run',
        purpose: 'precheck',
      }).error(`Skipping sync-features. Could not parse "gh repo view" output for ${owner}/${repo}.`);

      process.exitCode = 1;

      return;
    }

    if (viewerPermission === undefined) {
      Logger.customize({
        name: 'CliRecipeGithubSyncFeatures.run',
        purpose: 'precheck',
      }).error(`Skipping sync-features. Could not determine permission for ${owner}/${repo}.`);

      process.exitCode = 1;

      return;
    }

    const permission: CliRecipeGithubSyncFeaturesRunPermission = [
      'WRITE',
      'MAINTAIN',
      'ADMIN',
    ];

    if (permission.includes(viewerPermission) !== true) {
      Logger.error(`Skipping sync-features. The authenticated user does not have write access to ${owner}/${repo}.`);

      process.exitCode = 1;

      return;
    }

    const features: CliRecipeGithubSyncFeaturesRunFeatures = github['features'];

    if (features === undefined) {
      Logger.warn('Skipping sync-features. No values found under "github.features" in the "nova.config.json" file.');

      return;
    }

    const flags: CliRecipeGithubSyncFeaturesRunFlags = [];

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

    if (flags.length === 0) {
      Logger.warn('Skipping sync-features. No values found under "github.features" in the "nova.config.json" file.');

      return;
    }

    const command: CliRecipeGithubSyncFeaturesRunCommand = `gh repo edit ${owner}/${repo} ${flags.join(' ')}`;

    Logger.customize({
      name: 'CliRecipeGithubSyncFeatures.run',
      purpose: 'command',
    }).info(`Command: ${command}`);

    if (isDryRun === true) {
      return;
    }

    const result: CliRecipeGithubSyncFeaturesRunResult = await executeShell(command);

    if (result['code'] !== 0) {
      handleGhFailure(result, 'sync-features');

      return;
    }

    Logger.customize({
      name: 'CliRecipeGithubSyncFeatures.run',
      purpose: 'summary',
    }).info(`Updated ${owner}/${repo}.`);

    return;
  }
}
