import chalk from 'chalk';

import { NovaConfig } from '@/lib/nova-config.js';
import {
  isPlainObject,
  isProjectRoot,
  loadWorkspaceManifests,
  saveWorkspaceManifest,
} from '@/lib/utility.js';
import { Logger } from '@/toolkit/index.js';

import type {
  CLIRecipePackageJsonNormalizeModulesHandleReturns,
  CLIRecipePackageJsonNormalizeModulesHandleWorkspace,
  CLIRecipePackageJsonNormalizeModulesRunOptions,
  CLIRecipePackageJsonNormalizeModulesRunReturns,
} from '@/types/cli/recipe/package-json/normalize-modules.d.ts';

/**
 * CLI Recipe - package.json - Normalize Modules.
 *
 * @since 1.0.0
 */
export class CLIRecipePackageJsonNormalizeModules {
  /**
   * CLI Recipe - package.json - Normalize Modules - Run.
   *
   * @param {CLIRecipePackageJsonNormalizeModulesRunOptions} options - Options.
   *
   * @returns {CLIRecipePackageJsonNormalizeModulesRunReturns}
   *
   * @since 1.0.0
   */
  public static async run(options: CLIRecipePackageJsonNormalizeModulesRunOptions): CLIRecipePackageJsonNormalizeModulesRunReturns {
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
        name: 'CLIRecipePackageJsonNormalizeModules.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice = (isDryRun) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeModules.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const novaConfig = new NovaConfig();
    const workingFile = await novaConfig.load();
    const workingFileWorkspaces = Object.entries(workingFile.workspaces ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeModules.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-modules. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig = workspace[1];
      const workspaceRecipes = workspaceConfig.recipes;

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple = workspaceRecipes['normalize-modules'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeModules.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-modules. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeModules.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-modules. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CLIRecipePackageJsonNormalizeModules.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for normalize-modules.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeModules.run',
        purpose: 'iteration',
      }).info(`Running normalize-modules for the "${workspace.manifest.name}" workspace ...`);

      CLIRecipePackageJsonNormalizeModules.handle(workspace);

      if (isDryRun === true) {
        continue;
      }

      await saveWorkspaceManifest(workspace, isReplaceFile);
    }
  }

  /**
   * CLI Recipe - package.json - Normalize Modules - Handle.
   *
   * @param {CLIRecipePackageJsonNormalizeModulesHandleWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonNormalizeModulesHandleReturns}
   *
   * @since 1.0.0
   */
  private static handle(workspace: CLIRecipePackageJsonNormalizeModulesHandleWorkspace): CLIRecipePackageJsonNormalizeModulesHandleReturns {
    const fileContents = workspace.fileContents;
    const manifest = workspace.manifest;

    const packageExports = fileContents['exports'];
    const packageMain = fileContents['main'];
    const packageType = fileContents['type'];
    const packageBrowser = fileContents['browser'];
    const packageImports = fileContents['imports'];

    // Sync the "exports" field.
    if (
      packageExports !== undefined // Package "exports" is defined.
      && ['config', 'package', 'tool'].includes(manifest.role) === false // Workspace role is not "config", "package", or "tool".
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeModules.handle',
        purpose: 'exports',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "exports". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'exports');
    } else {
      if (
        manifest.role === 'config' // Workspace role is "config".
        || manifest.role === 'package' // Workspace role is "package".
        || manifest.role === 'tool' // Workspace role is "tool".
      ) {
        // If "exports" is a string, normalize it into an object.
        if (typeof packageExports === 'string') {
          Logger.customize({
            name: 'CLIRecipePackageJsonNormalizeModules.handle',
            purpose: 'exports',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Normalizing "exports" from string to object ...`);

          Reflect.set(fileContents, 'exports', {
            '.': {
              default: packageExports,
            },
          });
        }
      }
    }

    // Sync the "main" field.
    if (
      packageMain !== undefined // Package "main" is defined.
      && ['config', 'app', 'package', 'tool'].includes(manifest.role) === false // Workspace role is not "config", "app", "package", or "tool".
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeModules.handle',
        purpose: 'main',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "main". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'main');
    } else {
      if (
        manifest.role === 'config' // Workspace role is "config".
        || manifest.role === 'app' // Workspace role is "app".
        || manifest.role === 'package' // Workspace role is "package".
        || manifest.role === 'tool' // Workspace role is "tool".
      ) {
        const currentPackageExports = fileContents['exports'];

        if (
          typeof packageMain === 'string' // Package "main" is a string.
          && (
            isPlainObject(currentPackageExports) // Package "exports" is an object.
            && isPlainObject(currentPackageExports['.']) // Package "exports['.']" is an object.
            && typeof currentPackageExports['.']['require'] === 'string' // Package "exports['.'].require" is a string.
          )
          && packageMain !== currentPackageExports['.']['require'] // Package "main" differs from package "exports['.'].require".
        ) {
          Logger.customize({
            name: 'CLIRecipePackageJsonNormalizeModules.handle',
            purpose: 'main',
          }).warn(`${chalk.magenta(`"${manifest.name}" workspace`)} → "main" differs from "exports['.'].require". No changes applied.`);
        } else if (
          typeof packageMain === 'string' // Package "main" is a string.
          && (
            isPlainObject(currentPackageExports) // Package "exports" is an object.
            && isPlainObject(currentPackageExports['.']) // Package "exports['.']" is an object.
          )
          && typeof currentPackageExports['.']['require'] !== 'string' // Package "exports['.'].require" is not a string.
        ) {
          Logger.customize({
            name: 'CLIRecipePackageJsonNormalizeModules.handle',
            purpose: 'main',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "exports['.'].require" from "main" ...`);

          Reflect.set(currentPackageExports['.'], 'require', packageMain);
        } else if (
          (
            isPlainObject(currentPackageExports) // Package "exports" is an object.
            && isPlainObject(currentPackageExports['.']) // Package "exports['.']" is an object.
            && typeof currentPackageExports['.']['require'] === 'string' // Package "exports['.'].require" is a string.
          )
          && typeof packageMain !== 'string' // Package "main" is not a string.
        ) {
          Logger.customize({
            name: 'CLIRecipePackageJsonNormalizeModules.handle',
            purpose: 'main',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "main" from "exports['.'].require" ...`);

          Reflect.set(fileContents, 'main', currentPackageExports['.']['require']);
        } else if (
          typeof packageMain === 'string' // Package "main" is a string.
          && isPlainObject(currentPackageExports) // Package "exports" is an object.
          && typeof currentPackageExports['.'] === 'string' // Package "exports['.']" is a string.
        ) {
          Logger.customize({
            name: 'CLIRecipePackageJsonNormalizeModules.handle',
            purpose: 'main',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Normalizing "exports['.']" from string to object ...`);

          Reflect.set(currentPackageExports, '.', {
            default: currentPackageExports['.'],
            require: packageMain,
          });
        }
      }
    }

    // Sync the "type" field.
    if (
      packageType !== undefined // Package "type" is defined.
      && ['config', 'app', 'package', 'tool'].includes(manifest.role) === false // Workspace role is not "config", "app", "package", or "tool".
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeModules.handle',
        purpose: 'type',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "type". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'type');
    }

    // Sync the "browser" field.
    if (
      packageBrowser !== undefined // Package "browser" is defined.
      && ['package'].includes(manifest.role) === false // Workspace role is not "package".
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeModules.handle',
        purpose: 'browser',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "browser". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'browser');
    } else {
      if (
        manifest.role === 'package' // Workspace role is "package".
      ) {
        const currentPackageExports = fileContents['exports'];

        if (
          typeof packageBrowser === 'string' // Package "browser" is a string.
          && (
            isPlainObject(currentPackageExports) // Package "exports" is an object.
            && isPlainObject(currentPackageExports['.']) // Package "exports['.']" is an object.
            && typeof currentPackageExports['.']['browser'] === 'string' // Package "exports['.'].browser" is a string.
          )
          && packageBrowser !== currentPackageExports['.']['browser'] // Package "browser" differs from "exports['.'].browser".
        ) {
          Logger.customize({
            name: 'CLIRecipePackageJsonNormalizeModules.handle',
            purpose: 'browser',
          }).warn(`${chalk.magenta(`"${manifest.name}" workspace`)} → "browser" differs from "exports['.'].browser". No changes applied.`);
        } else if (
          typeof packageBrowser === 'string' // Package "browser" is a string.
          && (
            isPlainObject(currentPackageExports) // Package "exports" is an object.
            && isPlainObject(currentPackageExports['.']) // Package "exports['.']" is an object.
          )
          && typeof currentPackageExports['.']['browser'] !== 'string' // Package "exports['.'].browser" is not a string.
        ) {
          Logger.customize({
            name: 'CLIRecipePackageJsonNormalizeModules.handle',
            purpose: 'browser',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "exports['.'].browser" from "browser" ...`);

          Reflect.set(currentPackageExports['.'], 'browser', packageBrowser);
        } else if (
          (
            isPlainObject(currentPackageExports) // Package "exports" is an object.
            && isPlainObject(currentPackageExports['.']) // Package "exports['.']" is an object.
            && typeof currentPackageExports['.']['browser'] === 'string' // Package "exports['.'].browser" is a string.
          )
          && typeof packageBrowser !== 'string' // Package "browser" is not a string.
          && !isPlainObject(packageBrowser) // Package "browser" is not a plain object.
        ) {
          Logger.customize({
            name: 'CLIRecipePackageJsonNormalizeModules.handle',
            purpose: 'browser',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "browser" from "exports['.'].browser" ...`);

          Reflect.set(fileContents, 'browser', currentPackageExports['.']['browser']);
        } else if (
          typeof packageBrowser === 'string' // Package "browser" is a string.
          && isPlainObject(currentPackageExports) // Package "exports" is an object.
          && typeof currentPackageExports['.'] === 'string' // Package "exports['.']" is a string.
        ) {
          Logger.customize({
            name: 'CLIRecipePackageJsonNormalizeModules.handle',
            purpose: 'browser',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Normalizing "exports['.']" from string to object ...`);

          Reflect.set(currentPackageExports, '.', {
            default: currentPackageExports['.'],
            browser: packageBrowser,
          });
        }
      }
    }

    // Sync the "imports" field.
    if (
      packageImports !== undefined // Package "imports" is defined.
      && ['config', 'app', 'package', 'tool'].includes(manifest.role) === false // Workspace role is not "config", "app", "package", or "tool".
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeModules.handle',
        purpose: 'imports',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "imports". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'imports');
    }
  }
}
