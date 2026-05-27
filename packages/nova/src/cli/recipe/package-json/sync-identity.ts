import {
  dirname,
  join,
  relative,
} from 'path';

import chalk from 'chalk';

import { Runner as ApiSpdxLicenses } from '../../../api/spdx-licenses.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import { LIB_REGEX_PATTERN_SEMVER_STRICT } from '../../../lib/regex.js';
import {
  isProjectRoot,
  loadWorkspaceManifests,
  pathExists,
  saveWorkspaceManifest,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_FallbackLicense,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_FileContents,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_FilePath,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_LicenseCandidates,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_Manifest,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_NormalizedLicenseReference,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageDescription,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageDirectory,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageKeywords,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageLicense,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageName,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageVersion,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_ProjectRoot,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_Recipes,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_RecipeSettings,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_RecipeTuple,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_RelativeLicensePath,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_ResolvedLicensePath,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_Returns,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_SpdxLicenses,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_ValidDescription,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_ValidKeywords,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_ValidVersion,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_WorkingFile,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_Workspace,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_CurrentDirectory,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_EligibleWorkspaces,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_IsAtProjectRoot,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_IsDryRun,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_IsReplaceFile,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_Options,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_RecipeTupleFilter,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_ReplaceFileNotice,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_Returns,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_WorkingFile,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_WorkingFileWorkspaces,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_WorkspaceConfigFilter,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_WorkspaceRecipesFilter,
  Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_Workspaces,
} from '../../../types/cli/recipe/package-json/sync-identity.d.ts';

/**
 * CLI - Recipe - package.json - Sync Identity.
 *
 * Enforces name, version, description, keywords,
 * and license fields from nova.config.json and workspace
 * policy. Validates SPDX licenses via API.
 *
 * @since 0.14.0
 */
export class Runner {
  /**
   * CLI - Recipe - package.json - Sync Identity - Run.
   *
   * Loads nova.config.json, filters eligible workspaces, then syncs identity fields in each
   * manifest from the project config.
   *
   * @param {Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_Returns}
   *
   * @since 0.14.0
   */
  public static async run(options: Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_Options): Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_Returns {
    const currentDirectory: Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_WorkingFile = await new LibNovaConfig().load();
    const workingFileWorkspaces: Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_WorkingFileWorkspaces = Object.entries(workingFile['workspaces'] ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-identity. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces: Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_EligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig: Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_WorkspaceConfigFilter = workspace[1];
      const workspaceRecipes: Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_WorkspaceRecipesFilter = workspaceConfig['recipes'];

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple: Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_RecipeTupleFilter = workspaceRecipes['sync-identity'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-identity. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces: Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_Workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-identity. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for sync-identity.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'iteration',
      }).info(`Running sync-identity for the "${workspace['manifest']['name']}" workspace ...`);

      await Runner.handle(workspace, workingFile);

      if (isDryRun === true) {
        continue;
      }

      await saveWorkspaceManifest(workspace, isReplaceFile);
    }

    return;
  }

  /**
   * CLI - Recipe - package.json - Sync Identity - Handle.
   *
   * Processes one workspace manifest to sync name, version, description, keywords, and
   * license. Resolves license paths and validates SPDX.
   *
   * @param {Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_Workspace}   workspace   - Workspace.
   * @param {Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_WorkingFile} workingFile - Working file.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_Returns}
   *
   * @since 0.14.0
   */
  private static async handle(workspace: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_Workspace, workingFile: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_WorkingFile): Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_Returns {
    const fileContents: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_FileContents = workspace['fileContents'];
    const filePath: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_FilePath = workspace['filePath'];
    const manifest: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_Manifest = workspace['manifest'];

    const packageName: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageName = fileContents['name'];
    const packageVersion: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageVersion = fileContents['version'];
    const packageDescription: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageDescription = fileContents['description'];
    const packageKeywords: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageKeywords = fileContents['keywords'];
    const packageLicense: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageLicense = fileContents['license'];

    // Get recipe settings for this workspace.
    const recipes: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_Recipes = manifest['recipes'];
    const recipeTuple: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_RecipeTuple = (recipes !== undefined) ? recipes['sync-identity'] : undefined;
    const recipeSettings: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_RecipeSettings = (recipeTuple !== undefined && recipeTuple.length > 1) ? recipeTuple[1] : undefined;

    // Sync the "name" field.
    if (
      typeof packageName !== 'string' // Package "name" is not a string.
      || packageName !== manifest['name'] // Package "name" must match the workspace manifest name.
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'name',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Syncing "name" from workspace manifest ...`);

      Reflect.set(fileContents, 'name', manifest['name']);
    }

    // Sync the "version" field.
    if (
      typeof packageVersion !== 'string' // Package "version" is not a string.
      || LIB_REGEX_PATTERN_SEMVER_STRICT.test(packageVersion) === false // Package "version" must be valid semver.
      || (
        ['freezable'].includes(manifest['policy']) === true // Workspace policy is "freezable".
        && packageVersion !== '0.0.0' // Freezable workspaces must stay on "0.0.0".
      ) || (
        [
          'trackable',
          'distributable',
        ].includes(manifest['policy']) === true // Workspace policy is "trackable" or "distributable".
        && packageVersion === '0.0.0' // "trackable" or "distributable" workspaces cannot stay on "0.0.0".
      )
    ) {
      const validVersion: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_ValidVersion = (manifest['policy'] === 'freezable') ? '0.0.0' : '0.0.1';

      Logger.customize({
        name: 'Runner.handle',
        purpose: 'version',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Invalid version detected. Setting it to "${validVersion}" ...`);

      Reflect.set(fileContents, 'version', validVersion);
    }

    // Sync the "description" field.
    if (
      packageDescription !== undefined // Package "description" is defined.
      && manifest['policy'] !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'description',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "description". Workspace policy "${manifest['policy']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'description');
    } else {
      const validDescription: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_ValidDescription = (workingFile['project'] !== undefined && workingFile['project']['description'] !== undefined) ? workingFile['project']['description']['short'] : undefined;

      if (
        (
          manifest['policy'] === 'distributable' // Workspace policy is "distributable".
          && recipeSettings !== undefined // Recipe settings are defined.
          && recipeSettings['description'] === true // Recipe settings includes "description".
          && validDescription !== undefined // Nova config "project.description.short" setting is set.
        )
        && (
          typeof packageDescription !== 'string' // Package "description" is not a string.
          || packageDescription !== validDescription // Package "description" differs from "validDescription".
        )
      ) {
        Logger.customize({
          name: 'Runner.handle',
          purpose: 'description',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Syncing "description" from workspace manifest ...`);

        Reflect.set(fileContents, 'description', validDescription);
      }

      if (
        manifest['policy'] === 'distributable' // Workspace policy is "distributable".
        && recipeSettings !== undefined // Recipe settings are defined.
        && recipeSettings['description'] === true // Recipe settings includes "description".
        && validDescription === undefined // Nova config "project.description.short" setting is not set.
      ) {
        Logger.customize({
          name: 'Runner.handle',
          purpose: 'description',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "description". No description is defined.`);

        Reflect.deleteProperty(fileContents, 'description');
      }
    }

    // Sync the "keywords" field.
    if (
      packageKeywords !== undefined // Package "keywords" is defined.
      && manifest['policy'] !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'keywords',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "keywords". Workspace policy "${manifest['policy']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'keywords');
    } else {
      const validKeywords: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_ValidKeywords = (workingFile['project'] !== undefined) ? workingFile['project']['keywords'] : undefined;

      if (
        (
          manifest['policy'] === 'distributable' // Workspace policy is "distributable".
          && recipeSettings !== undefined // Recipe settings are defined.
          && recipeSettings['keywords'] === true // Recipe settings includes "keywords".
          && validKeywords !== undefined // Nova config "project.keywords" setting is set.
        )
        && (
          JSON.stringify(packageKeywords) !== JSON.stringify(validKeywords)
        )
      ) {
        Logger.customize({
          name: 'Runner.handle',
          purpose: 'keywords',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Syncing "keywords" from workspace manifest ...`);

        Reflect.set(fileContents, 'keywords', validKeywords);
      }

      if (
        manifest['policy'] === 'distributable' // Workspace policy is "distributable".
        && recipeSettings !== undefined // Recipe settings are defined.
        && recipeSettings['keywords'] === true // Recipe settings includes "keywords".
        && validKeywords === undefined // Nova config "project.keywords" setting is not set.
      ) {
        Logger.customize({
          name: 'Runner.handle',
          purpose: 'keywords',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "keywords". No keywords are defined.`);

        Reflect.deleteProperty(fileContents, 'keywords');
      }
    }

    // Sync the "license" field.
    const spdxLicenses: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_SpdxLicenses = await ApiSpdxLicenses.fetchLicenses();

    if (
      typeof packageLicense !== 'string' // Package "license" is not a string.
      || (
        spdxLicenses !== undefined // SPDX license list is available.
        && spdxLicenses.has(packageLicense) === false // Package "license" is not within SPDX specification.
      )
    ) {
      const packageDirectory: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageDirectory = dirname(filePath);
      const projectRoot: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_ProjectRoot = process.cwd();
      const licenseCandidates: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_LicenseCandidates = [
        join(packageDirectory, 'LICENSE'),
        join(packageDirectory, 'LICENSE.md'),
        join(projectRoot, 'LICENSE'),
        join(projectRoot, 'LICENSE.md'),
      ];

      let resolvedLicensePath: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_ResolvedLicensePath = undefined;

      for (const candidate of licenseCandidates) {
        if (await pathExists(candidate) === true) {
          resolvedLicensePath = candidate;

          break;
        }
      }

      const relativeLicensePath: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_RelativeLicensePath = (resolvedLicensePath !== undefined) ? relative(packageDirectory, resolvedLicensePath) : undefined;
      let normalizedLicenseReference: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_NormalizedLicenseReference = undefined;

      if (relativeLicensePath !== undefined) {
        normalizedLicenseReference = (relativeLicensePath.startsWith('.') === true) ? relativeLicensePath : `./${relativeLicensePath}`;
      }

      const fallbackLicense: Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_FallbackLicense = (normalizedLicenseReference !== undefined) ? `SEE LICENSE IN ${normalizedLicenseReference}` : 'UNLICENSED';

      if (packageLicense === fallbackLicense) {
        return;
      }

      Logger.customize({
        name: 'Runner.handle',
        purpose: 'license',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Syncing "license" to "${fallbackLicense}" ...`);

      Reflect.set(fileContents, 'license', fallbackLicense);
    }

    return;
  }
}
