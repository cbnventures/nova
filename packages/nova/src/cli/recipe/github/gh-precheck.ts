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

import type {
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_AuthStatus,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_CurrentDirectory,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_GhVersion,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_GhVersionMatch,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_GhVersionOutput,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_GhVersionPattern,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_Github,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_GithubRecipes,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_IsAtProjectRoot,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_IsCommandOnPath,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_IsDryRun,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_Options,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_Owner,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_Parsed,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_Permission,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_RecipeEntry,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_RecipeName,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_Recipes,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_Repo,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_Returns,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_ViewerPermission,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_ViewResult,
  Cli_Recipe_Github_GhPrecheck_GhPrecheck_WorkingFile,
} from '../../../types/cli/recipe/github/gh-precheck.d.ts';

/**
 * CLI - Recipe - GitHub - Gh Precheck - Gh Precheck.
 *
 * Validates project root, loads config, checks recipe enablement, verifies gh CLI
 * availability, version, authentication, and repository write permission. Returns
 * the resolved context or undefined when any check fails.
 *
 * @param {Cli_Recipe_Github_GhPrecheck_GhPrecheck_RecipeName} recipeName - Recipe name.
 * @param {Cli_Recipe_Github_GhPrecheck_GhPrecheck_Options}    options    - Options.
 *
 * @returns {Cli_Recipe_Github_GhPrecheck_GhPrecheck_Returns}
 *
 * @since 0.23.0
 */
export async function ghPrecheck(recipeName: Cli_Recipe_Github_GhPrecheck_GhPrecheck_RecipeName, options: Cli_Recipe_Github_GhPrecheck_GhPrecheck_Options): Cli_Recipe_Github_GhPrecheck_GhPrecheck_Returns {
  const currentDirectory: Cli_Recipe_Github_GhPrecheck_GhPrecheck_CurrentDirectory = process.cwd();
  const isAtProjectRoot: Cli_Recipe_Github_GhPrecheck_GhPrecheck_IsAtProjectRoot = await isProjectRoot(currentDirectory);

  if (isAtProjectRoot !== true) {
    process.exitCode = 1;

    return undefined;
  }

  const isDryRun: Cli_Recipe_Github_GhPrecheck_GhPrecheck_IsDryRun = options['dryRun'] === true;

  if (isDryRun === true) {
    Logger.customize({
      name: 'Runner.run',
      purpose: 'options',
    }).warn('Dry run enabled. gh commands will not be executed in this session.');
  }

  const workingFile: Cli_Recipe_Github_GhPrecheck_GhPrecheck_WorkingFile = await new LibNovaConfig().load();
  const github: Cli_Recipe_Github_GhPrecheck_GhPrecheck_Github = workingFile['github'];

  if (github === undefined) {
    Logger.warn(`Skipping ${recipeName}. The "github" block was not found in the "nova.config.json" file.`);

    return undefined;
  }

  const recipes: Cli_Recipe_Github_GhPrecheck_GhPrecheck_Recipes = workingFile['recipes'];
  const githubRecipes: Cli_Recipe_Github_GhPrecheck_GhPrecheck_GithubRecipes = (recipes !== undefined) ? recipes['github'] : undefined;
  const recipeEntry: Cli_Recipe_Github_GhPrecheck_GhPrecheck_RecipeEntry = (githubRecipes !== undefined) ? githubRecipes[recipeName] : undefined;

  if (
    recipeEntry === undefined
    || recipeEntry['enabled'] !== true
  ) {
    return undefined;
  }

  const owner: Cli_Recipe_Github_GhPrecheck_GhPrecheck_Owner = github['owner'];
  const repo: Cli_Recipe_Github_GhPrecheck_GhPrecheck_Repo = github['repo'];

  if (
    owner === undefined
    || repo === undefined
  ) {
    Logger.warn(`Skipping ${recipeName}. "github.owner" and "github.repo" must both be set in the "nova.config.json" file.`);

    return undefined;
  }

  const isCommandOnPath: Cli_Recipe_Github_GhPrecheck_GhPrecheck_IsCommandOnPath = await isCommandExists('gh');

  if (isCommandOnPath !== true) {
    Logger.error(`Skipping ${recipeName}. The "gh" CLI is not installed.`);

    process.exitCode = 1;

    return undefined;
  }

  const ghVersionOutput: Cli_Recipe_Github_GhPrecheck_GhPrecheck_GhVersionOutput = await executeShell('gh --version');
  const ghVersionPattern: Cli_Recipe_Github_GhPrecheck_GhPrecheck_GhVersionPattern = new RegExp(LIB_REGEX_PATTERN_GH_VERSION.source);
  const ghVersionMatch: Cli_Recipe_Github_GhPrecheck_GhPrecheck_GhVersionMatch = ghVersionOutput['textOut'].match(ghVersionPattern);

  if (ghVersionMatch === null) {
    Logger.error(`Skipping ${recipeName}. Could not determine the "gh" CLI version.`);

    process.exitCode = 1;

    return undefined;
  }

  const ghVersion: Cli_Recipe_Github_GhPrecheck_GhPrecheck_GhVersion = ghVersionMatch[1] ?? '';

  if (compareSemver(ghVersion, LIB_GH_MIN_VERSION) < 0) {
    Logger.error(`Skipping ${recipeName}. The "gh" CLI version ${ghVersion} is below the required minimum ${LIB_GH_MIN_VERSION}.`);

    process.exitCode = 1;

    return undefined;
  }

  const authStatus: Cli_Recipe_Github_GhPrecheck_GhPrecheck_AuthStatus = await executeShell('gh auth status');

  if (authStatus['code'] !== 0) {
    Logger.error(`Skipping ${recipeName}. The "gh" CLI is not authenticated.`);

    process.exitCode = 1;

    return undefined;
  }

  const viewResult: Cli_Recipe_Github_GhPrecheck_GhPrecheck_ViewResult = await executeShell(`gh repo view ${owner}/${repo} --json viewerPermission`);

  if (viewResult['code'] !== 0) {
    Logger.error(`Skipping ${recipeName}. Cannot access ${owner}/${repo}.`);

    process.exitCode = 1;

    return undefined;
  }

  let viewerPermission: Cli_Recipe_Github_GhPrecheck_GhPrecheck_ViewerPermission = undefined;

  try {
    const parsed: Cli_Recipe_Github_GhPrecheck_GhPrecheck_Parsed = JSON.parse(viewResult['textOut']) as Cli_Recipe_Github_GhPrecheck_GhPrecheck_Parsed;

    viewerPermission = parsed['viewerPermission'];
  } catch {
    Logger.customize({
      name: 'Runner.run',
      purpose: 'precheck',
    }).error(`Skipping ${recipeName}. Could not parse "gh repo view" output for ${owner}/${repo}.`);

    process.exitCode = 1;

    return undefined;
  }

  if (viewerPermission === undefined) {
    Logger.customize({
      name: 'Runner.run',
      purpose: 'precheck',
    }).error(`Skipping ${recipeName}. Could not determine permission for ${owner}/${repo}.`);

    process.exitCode = 1;

    return undefined;
  }

  const permission: Cli_Recipe_Github_GhPrecheck_GhPrecheck_Permission = [
    'WRITE',
    'MAINTAIN',
    'ADMIN',
  ];

  if (permission.includes(viewerPermission) !== true) {
    Logger.error(`Skipping ${recipeName}. The authenticated user does not have write access to ${owner}/${repo}.`);

    process.exitCode = 1;

    return undefined;
  }

  return {
    workingFile,
    github,
    owner,
    repo,
    isDryRun,
  };
}
