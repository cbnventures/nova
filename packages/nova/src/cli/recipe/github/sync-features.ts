import { LIB_GH_MIN_VERSION } from '../../../lib/constants.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
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
  Cli_Recipe_Github_SyncFeatures_Runner_Run_AuthStatus,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Command,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_CurrentDirectory,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Features,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Flags,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_GhVersion,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_GhVersionMatch,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_GhVersionOutput,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_GhVersionPattern,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Github,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_IsAtProjectRoot,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_IsCommandOnPath,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_IsDryRun,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Options,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Owner,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Parsed,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Permission,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Recipes,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Repo,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Result,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_Returns,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_ViewerPermission,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_ViewResult,
  Cli_Recipe_Github_SyncFeatures_Runner_Run_WorkingFile,
} from '../../../types/cli/recipe/github/sync-features.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Features.
 *
 * Pushes github.features.{issues, wiki, projects, discussions} from
 * nova.config.json to a GitHub repository using the gh CLI.
 *
 * @since 0.18.0
 */
export class Runner {
  /**
   * CLI - Recipe - GitHub - Sync Features - Run.
   *
   * Runs precheck steps then invokes gh repo edit to sync repository
   * feature flags to the configured repository.
   *
   * @param {Cli_Recipe_Github_SyncFeatures_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_Github_SyncFeatures_Runner_Run_Returns}
   *
   * @since 0.18.0
   */
  public static async run(options: Cli_Recipe_Github_SyncFeatures_Runner_Run_Options): Cli_Recipe_Github_SyncFeatures_Runner_Run_Returns {
    const currentDirectory: Cli_Recipe_Github_SyncFeatures_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Recipe_Github_SyncFeatures_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: Cli_Recipe_Github_SyncFeatures_Runner_Run_IsDryRun = options['dryRun'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. gh commands will not be executed in this session.');
    }

    const workingFile: Cli_Recipe_Github_SyncFeatures_Runner_Run_WorkingFile = await new LibNovaConfig().load();
    const github: Cli_Recipe_Github_SyncFeatures_Runner_Run_Github = workingFile['github'];

    if (github === undefined) {
      Logger.warn('Skipping sync-features. The "github" block was not found in the "nova.config.json" file.');

      return;
    }

    const recipes: Cli_Recipe_Github_SyncFeatures_Runner_Run_Recipes = github['recipes'];

    if (
      recipes === undefined
      || recipes['sync-features'] !== true
    ) {
      return;
    }

    const owner: Cli_Recipe_Github_SyncFeatures_Runner_Run_Owner = github['owner'];
    const repo: Cli_Recipe_Github_SyncFeatures_Runner_Run_Repo = github['repo'];

    if (
      owner === undefined
      || repo === undefined
    ) {
      Logger.warn('Skipping sync-features. "github.owner" and "github.repo" must both be set in the "nova.config.json" file.');

      return;
    }

    const isCommandOnPath: Cli_Recipe_Github_SyncFeatures_Runner_Run_IsCommandOnPath = await isCommandExists('gh');

    if (isCommandOnPath !== true) {
      Logger.error('Skipping sync-features. The "gh" CLI is not installed.');

      process.exitCode = 1;

      return;
    }

    const ghVersionOutput: Cli_Recipe_Github_SyncFeatures_Runner_Run_GhVersionOutput = await executeShell('gh --version');
    const ghVersionPattern: Cli_Recipe_Github_SyncFeatures_Runner_Run_GhVersionPattern = new RegExp(LIB_REGEX_PATTERN_GH_VERSION.source);
    const ghVersionMatch: Cli_Recipe_Github_SyncFeatures_Runner_Run_GhVersionMatch = ghVersionOutput['textOut'].match(ghVersionPattern);

    if (ghVersionMatch === null) {
      Logger.error('Skipping sync-features. Could not determine the "gh" CLI version.');

      process.exitCode = 1;

      return;
    }

    const ghVersion: Cli_Recipe_Github_SyncFeatures_Runner_Run_GhVersion = ghVersionMatch[1] ?? '';

    if (compareSemver(ghVersion, LIB_GH_MIN_VERSION) < 0) {
      Logger.error(`Skipping sync-features. The "gh" CLI version ${ghVersion} is below the required minimum ${LIB_GH_MIN_VERSION}.`);

      process.exitCode = 1;

      return;
    }

    const authStatus: Cli_Recipe_Github_SyncFeatures_Runner_Run_AuthStatus = await executeShell('gh auth status');

    if (authStatus['code'] !== 0) {
      Logger.error('Skipping sync-features. The "gh" CLI is not authenticated.');

      process.exitCode = 1;

      return;
    }

    const viewResult: Cli_Recipe_Github_SyncFeatures_Runner_Run_ViewResult = await executeShell(`gh repo view ${owner}/${repo} --json viewerPermission`);

    if (viewResult['code'] !== 0) {
      Logger.error(`Skipping sync-features. Cannot access ${owner}/${repo}.`);

      process.exitCode = 1;

      return;
    }

    let viewerPermission: Cli_Recipe_Github_SyncFeatures_Runner_Run_ViewerPermission = undefined;

    try {
      const parsed: Cli_Recipe_Github_SyncFeatures_Runner_Run_Parsed = JSON.parse(viewResult['textOut']) as Cli_Recipe_Github_SyncFeatures_Runner_Run_Parsed;

      viewerPermission = parsed['viewerPermission'];
    } catch {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'precheck',
      }).error(`Skipping sync-features. Could not parse "gh repo view" output for ${owner}/${repo}.`);

      process.exitCode = 1;

      return;
    }

    if (viewerPermission === undefined) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'precheck',
      }).error(`Skipping sync-features. Could not determine permission for ${owner}/${repo}.`);

      process.exitCode = 1;

      return;
    }

    const permission: Cli_Recipe_Github_SyncFeatures_Runner_Run_Permission = [
      'WRITE',
      'MAINTAIN',
      'ADMIN',
    ];

    if (permission.includes(viewerPermission) !== true) {
      Logger.error(`Skipping sync-features. The authenticated user does not have write access to ${owner}/${repo}.`);

      process.exitCode = 1;

      return;
    }

    const features: Cli_Recipe_Github_SyncFeatures_Runner_Run_Features = github['features'];

    if (features === undefined) {
      Logger.warn('Skipping sync-features. No values found under "github.features" in the "nova.config.json" file.');

      return;
    }

    const flags: Cli_Recipe_Github_SyncFeatures_Runner_Run_Flags = [];

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

    const command: Cli_Recipe_Github_SyncFeatures_Runner_Run_Command = `gh repo edit ${owner}/${repo} ${flags.join(' ')}`;

    Logger.customize({
      name: 'Runner.run',
      purpose: 'command',
    }).info(`Command: ${command}`);

    if (isDryRun === true) {
      return;
    }

    const result: Cli_Recipe_Github_SyncFeatures_Runner_Run_Result = await executeShell(command);

    if (result['code'] !== 0) {
      handleGhFailure(result, 'sync-features');

      return;
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'summary',
    }).info(`Updated ${owner}/${repo}.`);

    return;
  }
}
