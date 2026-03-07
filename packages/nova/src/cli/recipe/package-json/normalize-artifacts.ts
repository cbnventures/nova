import chalk from 'chalk';

import { NovaConfig } from '@/lib/nova-config.js';
import {
  isProjectRoot,
  loadWorkspaceManifests,
  saveWorkspaceManifest,
} from '@/lib/utility.js';
import { Logger } from '@/toolkit/index.js';

import type {
  CLIRecipePackageJsonNormalizeArtifactsHandlePublishReturns,
  CLIRecipePackageJsonNormalizeArtifactsHandlePublishWorkspace,
  CLIRecipePackageJsonNormalizeArtifactsHandleReturns,
  CLIRecipePackageJsonNormalizeArtifactsHandleWorkspace,
  CLIRecipePackageJsonNormalizeArtifactsIsEmptyReturns,
  CLIRecipePackageJsonNormalizeArtifactsIsEmptyValue,
  CLIRecipePackageJsonNormalizeArtifactsRunOptions,
  CLIRecipePackageJsonNormalizeArtifactsRunReturns,
} from '@/types/cli/recipe/package-json/normalize-artifacts.d.ts';

/**
 * CLI Recipe - package.json - Normalize Artifacts.
 *
 * @since 1.0.0
 */
export class CLIRecipePackageJsonNormalizeArtifacts {
  /**
   * CLI Recipe - package.json - Normalize Artifacts - Run.
   *
   * @param {CLIRecipePackageJsonNormalizeArtifactsRunOptions} options - Options.
   *
   * @returns {CLIRecipePackageJsonNormalizeArtifactsRunReturns}
   *
   * @since 1.0.0
   */
  public static async run(options: CLIRecipePackageJsonNormalizeArtifactsRunOptions): CLIRecipePackageJsonNormalizeArtifactsRunReturns {
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
        name: 'CLIRecipePackageJsonNormalizeArtifacts.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice = (isDryRun) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeArtifacts.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const novaConfig = new NovaConfig();
    const workingFile = await novaConfig.load();
    const workingFileWorkspaces = Object.entries(workingFile.workspaces ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeArtifacts.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-artifacts. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig = workspace[1];
      const workspaceRecipes = workspaceConfig.recipes;

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple = workspaceRecipes['normalize-artifacts'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeArtifacts.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-artifacts. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeArtifacts.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-artifacts. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CLIRecipePackageJsonNormalizeArtifacts.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for normalize-artifacts.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeArtifacts.run',
        purpose: 'iteration',
      }).info(`Running normalize-artifacts for the "${workspace.manifest.name}" workspace ...`);

      await CLIRecipePackageJsonNormalizeArtifacts.handle(workspace);

      await CLIRecipePackageJsonNormalizeArtifacts.handlePublish(workspace);

      if (isDryRun === true) {
        continue;
      }

      await saveWorkspaceManifest(workspace, isReplaceFile);
    }
  }

  /**
   * CLI Recipe - package.json - Normalize Artifacts - Handle.
   *
   * @param {CLIRecipePackageJsonNormalizeArtifactsHandleWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonNormalizeArtifactsHandleReturns}
   *
   * @since 1.0.0
   */
  private static async handle(workspace: CLIRecipePackageJsonNormalizeArtifactsHandleWorkspace): CLIRecipePackageJsonNormalizeArtifactsHandleReturns {
    const fileContents = workspace.fileContents;
    const manifest = workspace.manifest;

    const packageFiles = fileContents['files'];
    const packageBin = fileContents['bin'];
    const packageMan = fileContents['man'];
    const packageDirectories = fileContents['directories'];

    // Sync the "files" field.
    if (
      packageFiles !== undefined // Package "files" is defined.
      && ['package', 'tool'].includes(manifest.role) === false // Workspace role is not "package" or "tool".
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeArtifacts.handle',
        purpose: 'files',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "files". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'files');
    } else {
      if (
        (manifest.role === 'package' || manifest.role === 'tool') // Workspace role is "package" or "tool".
        && packageFiles !== undefined // Package "files" is defined.
        && CLIRecipePackageJsonNormalizeArtifacts.isEmpty(packageFiles) // Package "files" is empty.
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonNormalizeArtifacts.handle',
          purpose: 'files',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "files" ...`);

        Reflect.deleteProperty(fileContents, 'files');
      }
    }

    // Sync the "bin" field.
    if (
      packageBin !== undefined // Package "bin" is defined.
      && ['package', 'tool'].includes(manifest.role) === false // Workspace role is not "package" or "tool".
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeArtifacts.handle',
        purpose: 'bin',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "bin". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'bin');
    } else {
      if (
        (manifest.role === 'package' || manifest.role === 'tool') // Workspace role is "package" or "tool".
        && packageBin !== undefined // Package "bin" is defined.
      ) {
        if (
          typeof packageBin === 'string' // Package "bin" is a string.
        ) {
          const packageName = manifest.name;
          const binName = (packageName.includes('/')) ? packageName.split('/').pop() : packageName;

          Logger.customize({
            name: 'CLIRecipePackageJsonNormalizeArtifacts.handle',
            purpose: 'bin',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Normalizing "bin" from string to object ...`);

          Reflect.set(fileContents, 'bin', {
            [binName ?? packageName]: packageBin,
          });
        } else if (CLIRecipePackageJsonNormalizeArtifacts.isEmpty(packageBin)) {
          Logger.customize({
            name: 'CLIRecipePackageJsonNormalizeArtifacts.handle',
            purpose: 'bin',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "bin" ...`);

          Reflect.deleteProperty(fileContents, 'bin');
        }
      }
    }

    // Sync the "man" field.
    if (
      packageMan !== undefined // Package "man" is defined.
      && ['package', 'tool'].includes(manifest.role) === false // Workspace role is not "package" or "tool".
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeArtifacts.handle',
        purpose: 'man',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "man". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'man');
    } else {
      if (
        (manifest.role === 'package' || manifest.role === 'tool') // Workspace role is "package" or "tool".
        && packageMan !== undefined // Package "man" is defined.
      ) {
        if (
          typeof packageMan === 'string' // Package "man" is a string.
        ) {
          Logger.customize({
            name: 'CLIRecipePackageJsonNormalizeArtifacts.handle',
            purpose: 'man',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Normalizing "man" from string to array ...`);

          Reflect.set(fileContents, 'man', [packageMan]);
        } else if (CLIRecipePackageJsonNormalizeArtifacts.isEmpty(packageMan)) {
          Logger.customize({
            name: 'CLIRecipePackageJsonNormalizeArtifacts.handle',
            purpose: 'man',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "man" ...`);

          Reflect.deleteProperty(fileContents, 'man');
        }
      }
    }

    // Sync the "directories" field.
    if (
      packageDirectories !== undefined // Package "directories" is defined.
      && ['package', 'tool'].includes(manifest.role) === false // Workspace role is not "package" or "tool".
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeArtifacts.handle',
        purpose: 'directories',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "directories". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'directories');
    } else {
      if (
        (manifest.role === 'package' || manifest.role === 'tool') // Workspace role is "package" or "tool".
        && packageDirectories !== undefined // Package "directories" is defined.
        && CLIRecipePackageJsonNormalizeArtifacts.isEmpty(packageDirectories) // Package "directories" is empty.
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonNormalizeArtifacts.handle',
          purpose: 'directories',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "directories" ...`);

        Reflect.deleteProperty(fileContents, 'directories');
      }
    }
  }

  /**
   * CLI Recipe - package.json - Normalize Artifacts - Handle publish.
   *
   * @param {CLIRecipePackageJsonNormalizeArtifactsHandlePublishWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonNormalizeArtifactsHandlePublishReturns}
   *
   * @since 1.0.0
   */
  private static async handlePublish(workspace: CLIRecipePackageJsonNormalizeArtifactsHandlePublishWorkspace): CLIRecipePackageJsonNormalizeArtifactsHandlePublishReturns {
    const fileContents = workspace.fileContents;
    const manifest = workspace.manifest;

    const packagePrivate = fileContents['private'];
    const packagePublishConfig = fileContents['publishConfig'];

    // Sync the "private" field.
    if (
      typeof packagePrivate !== 'boolean' // Package "private" is not a boolean.
      || (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && packagePrivate === true // Package "private" is "true"
      )
      || (
        manifest.policy !== 'distributable' // Workspace policy is not "distributable"
        && packagePrivate !== true // Package "private" is not "true".
      )
    ) {
      const privateValue = (manifest.policy !== 'distributable');

      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeArtifacts.handlePublish',
        purpose: 'private',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "private" to "${privateValue}" ...`);

      Reflect.set(fileContents, 'private', privateValue);
    }

    // Sync the "publishConfig" field.
    if (
      packagePublishConfig !== undefined // Package "publishConfig" is defined.
      && manifest.policy !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeArtifacts.handlePublish',
        purpose: 'publishConfig',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "publishConfig". Workspace policy "${manifest.policy}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'publishConfig');
    } else {
      if (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && packagePublishConfig !== undefined // Package "publishConfig" is defined.
        && CLIRecipePackageJsonNormalizeArtifacts.isEmpty(packagePublishConfig) // Package "publishConfig" is empty.
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonNormalizeArtifacts.handlePublish',
          purpose: 'publishConfig',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "publishConfig" ...`);

        Reflect.deleteProperty(fileContents, 'publishConfig');
      }
    }
  }

  /**
   * CLI Recipe - package.json - Normalize Artifacts - Is empty.
   *
   * @param {CLIRecipePackageJsonNormalizeArtifactsIsEmptyValue} value - Value.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonNormalizeArtifactsIsEmptyReturns}
   *
   * @since 1.0.0
   */
  private static isEmpty(value: CLIRecipePackageJsonNormalizeArtifactsIsEmptyValue): CLIRecipePackageJsonNormalizeArtifactsIsEmptyReturns {
    if (value === null || value === undefined) {
      return true;
    }

    if (typeof value === 'string') {
      return value.trim() === '';
    }

    if (Array.isArray(value)) {
      return value.length === 0;
    }

    if (typeof value === 'object') {
      return Object.keys(value).length === 0;
    }

    return false;
  }
}
