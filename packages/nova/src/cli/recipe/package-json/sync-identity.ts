import {
  dirname,
  join,
  relative,
} from 'path';

import chalk from 'chalk';

import { ApiSpdxLicenses } from '../../../api/spdx-licenses.js';
import { LibNovaConfig } from '../../../lib/nova-config.js';
import { LIB_REGEX_PATTERN_SEMVER_STRICT } from '../../../lib/regex.js';
import {
  isProjectRoot,
  loadWorkspaceManifests,
  pathExists,
  saveWorkspaceManifest,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  CliRecipePackageJsonSyncIdentityHandleFallbackLicense,
  CliRecipePackageJsonSyncIdentityHandleFileContents,
  CliRecipePackageJsonSyncIdentityHandleFilePath,
  CliRecipePackageJsonSyncIdentityHandleLicenseCandidates,
  CliRecipePackageJsonSyncIdentityHandleManifest,
  CliRecipePackageJsonSyncIdentityHandleNormalizedLicenseReference,
  CliRecipePackageJsonSyncIdentityHandlePackageDescription,
  CliRecipePackageJsonSyncIdentityHandlePackageDirectory,
  CliRecipePackageJsonSyncIdentityHandlePackageKeywords,
  CliRecipePackageJsonSyncIdentityHandlePackageLicense,
  CliRecipePackageJsonSyncIdentityHandlePackageName,
  CliRecipePackageJsonSyncIdentityHandlePackageVersion,
  CliRecipePackageJsonSyncIdentityHandleProjectRoot,
  CliRecipePackageJsonSyncIdentityHandleRecipes,
  CliRecipePackageJsonSyncIdentityHandleRecipeSettings,
  CliRecipePackageJsonSyncIdentityHandleRecipeTuple,
  CliRecipePackageJsonSyncIdentityHandleRelativeLicensePath,
  CliRecipePackageJsonSyncIdentityHandleResolvedLicensePath,
  CliRecipePackageJsonSyncIdentityHandleReturns,
  CliRecipePackageJsonSyncIdentityHandleSpdxLicenses,
  CliRecipePackageJsonSyncIdentityHandleValidDescription,
  CliRecipePackageJsonSyncIdentityHandleValidKeywords,
  CliRecipePackageJsonSyncIdentityHandleValidVersion,
  CliRecipePackageJsonSyncIdentityHandleWorkingFile,
  CliRecipePackageJsonSyncIdentityHandleWorkspace,
  CliRecipePackageJsonSyncIdentityRunCurrentDirectory,
  CliRecipePackageJsonSyncIdentityRunEligibleWorkspaces,
  CliRecipePackageJsonSyncIdentityRunIsAtProjectRoot,
  CliRecipePackageJsonSyncIdentityRunIsDryRun,
  CliRecipePackageJsonSyncIdentityRunIsReplaceFile,
  CliRecipePackageJsonSyncIdentityRunOptions,
  CliRecipePackageJsonSyncIdentityRunRecipeTupleFilter,
  CliRecipePackageJsonSyncIdentityRunReplaceFileNotice,
  CliRecipePackageJsonSyncIdentityRunReturns,
  CliRecipePackageJsonSyncIdentityRunWorkingFile,
  CliRecipePackageJsonSyncIdentityRunWorkingFileWorkspaces,
  CliRecipePackageJsonSyncIdentityRunWorkspaceConfigFilter,
  CliRecipePackageJsonSyncIdentityRunWorkspaceRecipesFilter,
  CliRecipePackageJsonSyncIdentityRunWorkspaces,
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
export class CliRecipePackageJsonSyncIdentity {
  /**
   * CLI - Recipe - package.json - Sync Identity - Run.
   *
   * Loads nova.config.json, filters eligible workspaces, then syncs identity fields in each
   * manifest from the project config.
   *
   * @param {CliRecipePackageJsonSyncIdentityRunOptions} options - Options.
   *
   * @returns {CliRecipePackageJsonSyncIdentityRunReturns}
   *
   * @since 0.14.0
   */
  public static async run(options: CliRecipePackageJsonSyncIdentityRunOptions): CliRecipePackageJsonSyncIdentityRunReturns {
    const currentDirectory: CliRecipePackageJsonSyncIdentityRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliRecipePackageJsonSyncIdentityRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: CliRecipePackageJsonSyncIdentityRunIsDryRun = options['dryRun'] === true;
    const isReplaceFile: CliRecipePackageJsonSyncIdentityRunIsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncIdentity.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: CliRecipePackageJsonSyncIdentityRunReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CliRecipePackageJsonSyncIdentity.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: CliRecipePackageJsonSyncIdentityRunWorkingFile = await new LibNovaConfig().load();
    const workingFileWorkspaces: CliRecipePackageJsonSyncIdentityRunWorkingFileWorkspaces = Object.entries(workingFile['workspaces'] ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncIdentity.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-identity. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces: CliRecipePackageJsonSyncIdentityRunEligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig: CliRecipePackageJsonSyncIdentityRunWorkspaceConfigFilter = workspace[1];
      const workspaceRecipes: CliRecipePackageJsonSyncIdentityRunWorkspaceRecipesFilter = workspaceConfig['recipes'];

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple: CliRecipePackageJsonSyncIdentityRunRecipeTupleFilter = workspaceRecipes['sync-identity'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncIdentity.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-identity. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces: CliRecipePackageJsonSyncIdentityRunWorkspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncIdentity.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-identity. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CliRecipePackageJsonSyncIdentity.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for sync-identity.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncIdentity.run',
        purpose: 'iteration',
      }).info(`Running sync-identity for the "${workspace['manifest']['name']}" workspace ...`);

      await CliRecipePackageJsonSyncIdentity.handle(workspace, workingFile);

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
   * @param {CliRecipePackageJsonSyncIdentityHandleWorkspace}   workspace   - Workspace.
   * @param {CliRecipePackageJsonSyncIdentityHandleWorkingFile} workingFile - Working file.
   *
   * @private
   *
   * @returns {CliRecipePackageJsonSyncIdentityHandleReturns}
   *
   * @since 0.14.0
   */
  private static async handle(workspace: CliRecipePackageJsonSyncIdentityHandleWorkspace, workingFile: CliRecipePackageJsonSyncIdentityHandleWorkingFile): CliRecipePackageJsonSyncIdentityHandleReturns {
    const fileContents: CliRecipePackageJsonSyncIdentityHandleFileContents = workspace['fileContents'];
    const filePath: CliRecipePackageJsonSyncIdentityHandleFilePath = workspace['filePath'];
    const manifest: CliRecipePackageJsonSyncIdentityHandleManifest = workspace['manifest'];

    const packageName: CliRecipePackageJsonSyncIdentityHandlePackageName = fileContents['name'];
    const packageVersion: CliRecipePackageJsonSyncIdentityHandlePackageVersion = fileContents['version'];
    const packageDescription: CliRecipePackageJsonSyncIdentityHandlePackageDescription = fileContents['description'];
    const packageKeywords: CliRecipePackageJsonSyncIdentityHandlePackageKeywords = fileContents['keywords'];
    const packageLicense: CliRecipePackageJsonSyncIdentityHandlePackageLicense = fileContents['license'];

    // Get recipe settings for this workspace.
    const recipes: CliRecipePackageJsonSyncIdentityHandleRecipes = manifest['recipes'];
    const recipeTuple: CliRecipePackageJsonSyncIdentityHandleRecipeTuple = (recipes !== undefined) ? recipes['sync-identity'] : undefined;
    const recipeSettings: CliRecipePackageJsonSyncIdentityHandleRecipeSettings = (recipeTuple !== undefined && recipeTuple.length > 1) ? recipeTuple[1] : undefined;

    // Sync the "name" field.
    if (
      typeof packageName !== 'string' // Package "name" is not a string.
      || packageName !== manifest['name'] // Package "name" must match the workspace manifest name.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncIdentity.handle',
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
      const validVersion: CliRecipePackageJsonSyncIdentityHandleValidVersion = (manifest['policy'] === 'freezable') ? '0.0.0' : '0.0.1';

      Logger.customize({
        name: 'CliRecipePackageJsonSyncIdentity.handle',
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
        name: 'CliRecipePackageJsonSyncIdentity.handle',
        purpose: 'description',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "description". Workspace policy "${manifest['policy']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'description');
    } else {
      const validDescription: CliRecipePackageJsonSyncIdentityHandleValidDescription = (workingFile['project'] !== undefined && workingFile['project']['description'] !== undefined) ? workingFile['project']['description']['short'] : undefined;

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
          name: 'CliRecipePackageJsonSyncIdentity.handle',
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
          name: 'CliRecipePackageJsonSyncIdentity.handle',
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
        name: 'CliRecipePackageJsonSyncIdentity.handle',
        purpose: 'keywords',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "keywords". Workspace policy "${manifest['policy']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'keywords');
    } else {
      const validKeywords: CliRecipePackageJsonSyncIdentityHandleValidKeywords = (workingFile['project'] !== undefined) ? workingFile['project']['keywords'] : undefined;

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
          name: 'CliRecipePackageJsonSyncIdentity.handle',
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
          name: 'CliRecipePackageJsonSyncIdentity.handle',
          purpose: 'keywords',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "keywords". No keywords are defined.`);

        Reflect.deleteProperty(fileContents, 'keywords');
      }
    }

    // Sync the "license" field.
    const spdxLicenses: CliRecipePackageJsonSyncIdentityHandleSpdxLicenses = await ApiSpdxLicenses.fetchLicenses();

    if (
      typeof packageLicense !== 'string' // Package "license" is not a string.
      || (
        spdxLicenses !== undefined // SPDX license list is available.
        && spdxLicenses.has(packageLicense) === false // Package "license" is not within SPDX specification.
      )
    ) {
      const packageDirectory: CliRecipePackageJsonSyncIdentityHandlePackageDirectory = dirname(filePath);
      const projectRoot: CliRecipePackageJsonSyncIdentityHandleProjectRoot = process.cwd();
      const licenseCandidates: CliRecipePackageJsonSyncIdentityHandleLicenseCandidates = [
        join(packageDirectory, 'LICENSE'),
        join(packageDirectory, 'LICENSE.md'),
        join(projectRoot, 'LICENSE'),
        join(projectRoot, 'LICENSE.md'),
      ];

      let resolvedLicensePath: CliRecipePackageJsonSyncIdentityHandleResolvedLicensePath = undefined;

      for (const candidate of licenseCandidates) {
        if (await pathExists(candidate) === true) {
          resolvedLicensePath = candidate;

          break;
        }
      }

      const relativeLicensePath: CliRecipePackageJsonSyncIdentityHandleRelativeLicensePath = (resolvedLicensePath !== undefined) ? relative(packageDirectory, resolvedLicensePath) : undefined;
      let normalizedLicenseReference: CliRecipePackageJsonSyncIdentityHandleNormalizedLicenseReference = undefined;

      if (relativeLicensePath !== undefined) {
        normalizedLicenseReference = (relativeLicensePath.startsWith('.') === true) ? relativeLicensePath : `./${relativeLicensePath}`;
      }

      const fallbackLicense: CliRecipePackageJsonSyncIdentityHandleFallbackLicense = (normalizedLicenseReference !== undefined) ? `SEE LICENSE IN ${normalizedLicenseReference}` : 'UNLICENSED';

      if (packageLicense === fallbackLicense) {
        return;
      }

      Logger.customize({
        name: 'CliRecipePackageJsonSyncIdentity.handle',
        purpose: 'license',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Syncing "license" to "${fallbackLicense}" ...`);

      Reflect.set(fileContents, 'license', fallbackLicense);
    }

    return;
  }
}
