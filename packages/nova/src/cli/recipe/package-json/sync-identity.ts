import {
  dirname,
  join,
  relative,
} from 'path';

import chalk from 'chalk';

import { SpdxLicenses } from '@/api/spdx-licenses.js';
import { NovaConfig } from '@/lib/nova-config.js';
import { PATTERN_SEMVER_STRICT } from '@/lib/regex.js';
import {
  isProjectRoot,
  loadWorkspaceManifests,
  pathExists,
  saveWorkspaceManifest,
} from '@/lib/utility.js';
import { Logger } from '@/toolkit/index.js';

import type {
  CLIRecipePackageJsonSyncIdentityHandleNormalizedLicenseReference,
  CLIRecipePackageJsonSyncIdentityHandleReturns,
  CLIRecipePackageJsonSyncIdentityHandleWorkingFile,
  CLIRecipePackageJsonSyncIdentityHandleWorkspace,
  CLIRecipePackageJsonSyncIdentityRunOptions,
  CLIRecipePackageJsonSyncIdentityRunReturns,
} from '@/types/cli/recipe/package-json/sync-identity.d.ts';

/**
 * CLI Recipe - package.json - Sync Identity.
 *
 * @since 1.0.0
 */
export class CLIRecipePackageJsonSyncIdentity {
  /**
   * CLI Recipe - package.json - Sync Identity - Run.
   *
   * @param {CLIRecipePackageJsonSyncIdentityRunOptions} options - Options.
   *
   * @returns {CLIRecipePackageJsonSyncIdentityRunReturns}
   *
   * @since 1.0.0
   */
  public static async run(options: CLIRecipePackageJsonSyncIdentityRunOptions): CLIRecipePackageJsonSyncIdentityRunReturns {
    const currentDirectory = process.cwd();
    const isAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun = options.dryRun === true;
    const isReplaceFile = options.replaceFile === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncIdentity.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice = (isDryRun) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CLIRecipePackageJsonSyncIdentity.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const novaConfig = new NovaConfig();
    const workingFile = await novaConfig.load();
    const workingFileWorkspaces = Object.entries(workingFile.workspaces ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncIdentity.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-identity. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig = workspace[1];
      const workspaceRecipes = workspaceConfig.recipes;

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple = workspaceRecipes['sync-identity'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncIdentity.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-identity. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncIdentity.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-identity. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CLIRecipePackageJsonSyncIdentity.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for sync-identity.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncIdentity.run',
        purpose: 'iteration',
      }).info(`Running sync-identity for the "${workspace.manifest.name}" workspace ...`);

      await CLIRecipePackageJsonSyncIdentity.handle(workspace, workingFile);

      if (isDryRun === true) {
        continue;
      }

      await saveWorkspaceManifest(workspace, isReplaceFile);
    }
  }

  /**
   * CLI Recipe - package.json - Sync Identity - Handle.
   *
   * @param {CLIRecipePackageJsonSyncIdentityHandleWorkspace}   workspace   - Workspace.
   * @param {CLIRecipePackageJsonSyncIdentityHandleWorkingFile} workingFile - Working file.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonSyncIdentityHandleReturns}
   *
   * @since 1.0.0
   */
  private static async handle(workspace: CLIRecipePackageJsonSyncIdentityHandleWorkspace, workingFile: CLIRecipePackageJsonSyncIdentityHandleWorkingFile): CLIRecipePackageJsonSyncIdentityHandleReturns {
    const fileContents = workspace.fileContents;
    const filePath = workspace.filePath;
    const manifest = workspace.manifest;

    const packageName = fileContents['name'];
    const packageVersion = fileContents['version'];
    const packageDescription = fileContents['description'];
    const packageKeywords = fileContents['keywords'];
    const packageLicense = fileContents['license'];

    // Get recipe settings for this workspace.
    const recipes = manifest.recipes;
    const recipeTuple = (recipes !== undefined) ? recipes['sync-identity'] : undefined;
    const recipeSettings = (recipeTuple !== undefined && recipeTuple.length > 1) ? recipeTuple[1] : undefined;

    // Sync the "name" field.
    if (
      typeof packageName !== 'string' // Package "name" is not a string.
      || packageName !== manifest.name // Package "name" must match the workspace manifest name.
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncIdentity.handle',
        purpose: 'name',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "name" from workspace manifest ...`);

      Reflect.set(fileContents, 'name', manifest.name);
    }

    // Sync the "version" field.
    if (
      typeof packageVersion !== 'string' // Package "version" is not a string.
      || !PATTERN_SEMVER_STRICT.test(packageVersion) // Package "version" must be valid semver.
      || (
        ['freezable'].includes(manifest.policy) // Workspace policy is "freezable".
        && packageVersion !== '0.0.0' // Freezable workspaces must stay on "0.0.0".
      ) || (
        ['trackable', 'distributable'].includes(manifest.policy) // Workspace policy is "trackable" or "distributable".
        && packageVersion === '0.0.0' // "trackable" or "distributable" workspaces cannot stay on "0.0.0".
      )
    ) {
      const validVersion = (manifest.policy === 'freezable') ? '0.0.0' : '0.0.1';

      Logger.customize({
        name: 'CLIRecipePackageJsonSyncIdentity.handle',
        purpose: 'version',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Invalid version detected. Setting it to "${validVersion}" ...`);

      Reflect.set(fileContents, 'version', validVersion);
    }

    // Sync the "description" field.
    if (
      packageDescription !== undefined // Package "description" is defined.
      && manifest.policy !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncIdentity.handle',
        purpose: 'description',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "description". Workspace policy "${manifest.policy}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'description');
    } else {
      const validDescription = (workingFile.project !== undefined && workingFile.project.description !== undefined) ? workingFile.project.description.short : undefined;

      if (
        (
          manifest.policy === 'distributable' // Workspace policy is "distributable".
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
          name: 'CLIRecipePackageJsonSyncIdentity.handle',
          purpose: 'description',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "description" from workspace manifest ...`);

        Reflect.set(fileContents, 'description', validDescription);
      }

      if (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && recipeSettings !== undefined // Recipe settings are defined.
        && recipeSettings['description'] === true // Recipe settings includes "description".
        && validDescription === undefined // Nova config "project.description.short" setting is not set.
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncIdentity.handle',
          purpose: 'description',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "description". No description is defined.`);

        Reflect.deleteProperty(fileContents, 'description');
      }
    }

    // Sync the "keywords" field.
    if (
      packageKeywords !== undefined // Package "keywords" is defined.
      && manifest.policy !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncIdentity.handle',
        purpose: 'keywords',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "keywords". Workspace policy "${manifest.policy}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'keywords');
    } else {
      const validKeywords = (workingFile.project !== undefined) ? workingFile.project.keywords : undefined;

      if (
        (
          manifest.policy === 'distributable' // Workspace policy is "distributable".
          && recipeSettings !== undefined // Recipe settings are defined.
          && recipeSettings['keywords'] === true // Recipe settings includes "keywords".
          && validKeywords !== undefined // Nova config "project.keywords" setting is set.
        )
        && (
          JSON.stringify(packageKeywords) !== JSON.stringify(validKeywords)
        )
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncIdentity.handle',
          purpose: 'keywords',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "keywords" from workspace manifest ...`);

        Reflect.set(fileContents, 'keywords', validKeywords);
      }

      if (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && recipeSettings !== undefined // Recipe settings are defined.
        && recipeSettings['keywords'] === true // Recipe settings includes "keywords".
        && validKeywords === undefined // Nova config "project.keywords" setting is not set.
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncIdentity.handle',
          purpose: 'keywords',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "keywords". No keywords are defined.`);

        Reflect.deleteProperty(fileContents, 'keywords');
      }
    }

    // Sync the "license" field.
    const spdxLicenses = await SpdxLicenses.fetchLicenses();

    if (
      typeof packageLicense !== 'string' // Package "license" is not a string.
      || (spdxLicenses !== undefined && !spdxLicenses.has(packageLicense)) // Package "license" is not within SPDX specification.
    ) {
      const packageDirectory = dirname(filePath);
      const projectRoot = process.cwd();
      const licenseCandidates = [
        join(packageDirectory, 'LICENSE'),
        join(packageDirectory, 'LICENSE.md'),
        join(projectRoot, 'LICENSE'),
        join(projectRoot, 'LICENSE.md'),
      ];

      let resolvedLicensePath;

      for (const candidate of licenseCandidates) {
        if (await pathExists(candidate)) {
          resolvedLicensePath = candidate;

          break;
        }
      }

      const relativeLicensePath = (resolvedLicensePath !== undefined) ? relative(packageDirectory, resolvedLicensePath) : undefined;
      let normalizedLicenseReference: CLIRecipePackageJsonSyncIdentityHandleNormalizedLicenseReference;

      if (relativeLicensePath !== undefined) {
        normalizedLicenseReference = (relativeLicensePath.startsWith('.')) ? relativeLicensePath : `./${relativeLicensePath}`;
      }

      const fallbackLicense = (normalizedLicenseReference !== undefined) ? `SEE LICENSE IN ${normalizedLicenseReference}` : 'UNLICENSED';

      if (packageLicense === fallbackLicense) {
        return;
      }

      Logger.customize({
        name: 'CLIRecipePackageJsonSyncIdentity.handle',
        purpose: 'license',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "license" to "${fallbackLicense}" ...`);

      Reflect.set(fileContents, 'license', fallbackLicense);
    }
  }
}
