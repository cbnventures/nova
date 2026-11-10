import { Runner as DockerHub } from '../../../api/docker-hub.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import { isProjectRoot } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Credentials,
  Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_CurrentDirectory,
  Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_DockerHub,
  Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_DockerHubRecipes,
  Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_IsAtProjectRoot,
  Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_IsDryRun,
  Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Namespace,
  Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Options,
  Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_RecipeEntry,
  Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_RecipeName,
  Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Recipes,
  Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Repository,
  Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_RepositoryName,
  Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_RepositoryResponse,
  Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Returns,
  Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Token,
  Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_WorkingFile,
} from '../../../types/cli/recipe/docker-hub/docker-hub-precheck.d.ts';

/**
 * CLI - Recipe - Docker Hub - Docker Hub Precheck - Docker Hub Precheck.
 *
 * Validates config, credentials, repository access, and write permission before
 * a Docker Hub recipe computes changes.
 *
 * @param {Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_RecipeName} recipeName - Recipe name.
 * @param {Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Options}    options    - Options.
 *
 * @returns {Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Returns}
 *
 * @since 0.40.0
 */
export async function dockerHubPrecheck(recipeName: Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_RecipeName, options: Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Options): Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Returns {
  const currentDirectory: Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_CurrentDirectory = process.cwd();
  const isAtProjectRoot: Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_IsAtProjectRoot = await isProjectRoot(currentDirectory);

  if (isAtProjectRoot !== true) {
    process.exitCode = 1;

    return undefined;
  }

  const workingFile: Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_WorkingFile = await new LibNovaConfig().load();
  const dockerHub: Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_DockerHub = workingFile['dockerHub'];

  if (dockerHub === undefined) {
    Logger.warn(`Skipping ${recipeName}. The "dockerHub" block was not found in the "nova.config.json" file.`);

    return undefined;
  }

  const recipes: Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Recipes = workingFile['recipes'];
  const dockerHubRecipes: Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_DockerHubRecipes = (recipes !== undefined) ? recipes['docker-hub'] : undefined;
  const recipeEntry: Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_RecipeEntry = (dockerHubRecipes !== undefined) ? dockerHubRecipes[recipeName] : undefined;

  if (recipeEntry === undefined || recipeEntry['enabled'] !== true) {
    return undefined;
  }

  const isDryRun: Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_IsDryRun = options['dryRun'] === true;

  if (isDryRun === true) {
    Logger.customize({
      name: 'Runner.run',
      purpose: 'options',
    }).warn('Dry run enabled. Docker Hub changes will not be sent in this session.');
  }

  const credentials: Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Credentials = DockerHub.findCredentials();

  if (credentials === undefined) {
    Logger.error('No Docker Hub login found. Run "docker login".');

    process.exitCode = 1;

    return undefined;
  }

  const token: Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Token = await DockerHub.login(credentials);

  if (token === undefined) {
    Logger.error('Unable to authenticate with Docker Hub using the stored login.');

    process.exitCode = 1;

    return undefined;
  }

  const namespace: Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Namespace = dockerHub['namespace'];
  const repositoryName: Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_RepositoryName = dockerHub['repository'];
  const repositoryResponse: Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_RepositoryResponse = await DockerHub.getRepository(namespace, repositoryName, token);

  if (repositoryResponse['status'] === 404) {
    Logger.error(`Docker Hub repository ${namespace}/${repositoryName} does not exist. Push the first image, then run the recipe again.`);

    process.exitCode = 1;

    return undefined;
  }

  const repository: Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Repository = repositoryResponse['body'];

  if (repositoryResponse['ok'] === false || repository === undefined) {
    Logger.error(`Unable to read Docker Hub repository ${namespace}/${repositoryName}. HTTP status: ${repositoryResponse['status']}`);

    process.exitCode = 1;

    return undefined;
  }

  if (repository['permissions']['write'] !== true) {
    Logger.error(`The Docker Hub login does not have write access to ${namespace}/${repositoryName}.`);

    process.exitCode = 1;

    return undefined;
  }

  return {
    workingFile,
    dockerHub,
    namespace,
    repositoryName,
    token,
    repository,
    isDryRun,
  };
}
