import chalk from 'chalk';

import { LibNovaConfig } from '../../../lib/nova-config.js';
import {
  isPlainObject,
  isProjectRoot,
  loadWorkspaceManifests,
  saveWorkspaceManifest,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  CliRecipePackageJsonNormalizeModulesHandleCurrentPackageExports,
  CliRecipePackageJsonNormalizeModulesHandleFileContents,
  CliRecipePackageJsonNormalizeModulesHandleManifest,
  CliRecipePackageJsonNormalizeModulesHandlePackageBrowser,
  CliRecipePackageJsonNormalizeModulesHandlePackageExports,
  CliRecipePackageJsonNormalizeModulesHandlePackageImports,
  CliRecipePackageJsonNormalizeModulesHandlePackageMain,
  CliRecipePackageJsonNormalizeModulesHandlePackageType,
  CliRecipePackageJsonNormalizeModulesHandleReturns,
  CliRecipePackageJsonNormalizeModulesHandleWorkspace,
  CliRecipePackageJsonNormalizeModulesRunCurrentDirectory,
  CliRecipePackageJsonNormalizeModulesRunEligibleWorkspaces,
  CliRecipePackageJsonNormalizeModulesRunIsAtProjectRoot,
  CliRecipePackageJsonNormalizeModulesRunIsDryRun,
  CliRecipePackageJsonNormalizeModulesRunIsReplaceFile,
  CliRecipePackageJsonNormalizeModulesRunOptions,
  CliRecipePackageJsonNormalizeModulesRunRecipeTupleFilter,
  CliRecipePackageJsonNormalizeModulesRunReplaceFileNotice,
  CliRecipePackageJsonNormalizeModulesRunReturns,
  CliRecipePackageJsonNormalizeModulesRunWorkingFile,
  CliRecipePackageJsonNormalizeModulesRunWorkingFileWorkspaces,
  CliRecipePackageJsonNormalizeModulesRunWorkspaceConfigFilter,
  CliRecipePackageJsonNormalizeModulesRunWorkspaceRecipesFilter,
  CliRecipePackageJsonNormalizeModulesRunWorkspaces,
} from '../../../types/cli/recipe/package-json/normalize-modules.d.ts';

/**
 * CLI - Recipe - package.json - Normalize Modules.
 *
 * Enforces exports, main, type, browser, and imports fields based on workspace role.
 * Normalizes string exports into condition map objects.
 *
 * @since 0.14.0
 */
export class CliRecipePackageJsonNormalizeModules {
  /**
   * CLI - Recipe - package.json - Normalize Modules - Run.
   *
   * Loads nova.config.json, filters eligible workspaces, then normalizes module resolution
   * fields in each manifest. Supports dry-run mode.
   *
   * @param {CliRecipePackageJsonNormalizeModulesRunOptions} options - Options.
   *
   * @returns {CliRecipePackageJsonNormalizeModulesRunReturns}
   *
   * @since 0.14.0
   */
  public static async run(options: CliRecipePackageJsonNormalizeModulesRunOptions): CliRecipePackageJsonNormalizeModulesRunReturns {
    const currentDirectory: CliRecipePackageJsonNormalizeModulesRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliRecipePackageJsonNormalizeModulesRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: CliRecipePackageJsonNormalizeModulesRunIsDryRun = options['dryRun'] === true;
    const isReplaceFile: CliRecipePackageJsonNormalizeModulesRunIsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeModules.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: CliRecipePackageJsonNormalizeModulesRunReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeModules.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: CliRecipePackageJsonNormalizeModulesRunWorkingFile = await new LibNovaConfig().load();
    const workingFileWorkspaces: CliRecipePackageJsonNormalizeModulesRunWorkingFileWorkspaces = Object.entries(workingFile['workspaces'] ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeModules.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-modules. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces: CliRecipePackageJsonNormalizeModulesRunEligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig: CliRecipePackageJsonNormalizeModulesRunWorkspaceConfigFilter = workspace[1];
      const workspaceRecipes: CliRecipePackageJsonNormalizeModulesRunWorkspaceRecipesFilter = workspaceConfig['recipes'];

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple: CliRecipePackageJsonNormalizeModulesRunRecipeTupleFilter = workspaceRecipes['normalize-modules'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeModules.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-modules. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces: CliRecipePackageJsonNormalizeModulesRunWorkspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeModules.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-modules. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CliRecipePackageJsonNormalizeModules.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for normalize-modules.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeModules.run',
        purpose: 'iteration',
      }).info(`Running normalize-modules for the "${workspace['manifest']['name']}" workspace ...`);

      CliRecipePackageJsonNormalizeModules.handle(workspace);

      if (isDryRun === true) {
        continue;
      }

      await saveWorkspaceManifest(workspace, isReplaceFile);
    }

    return;
  }

  /**
   * CLI - Recipe - package.json - Normalize Modules - Handle.
   *
   * Processes exports, main, type, browser, and imports for one workspace. Keeps main and
   * exports in sync and normalizes strings to objects.
   *
   * @param {CliRecipePackageJsonNormalizeModulesHandleWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CliRecipePackageJsonNormalizeModulesHandleReturns}
   *
   * @since 0.14.0
   */
  private static handle(workspace: CliRecipePackageJsonNormalizeModulesHandleWorkspace): CliRecipePackageJsonNormalizeModulesHandleReturns {
    const fileContents: CliRecipePackageJsonNormalizeModulesHandleFileContents = workspace['fileContents'];
    const manifest: CliRecipePackageJsonNormalizeModulesHandleManifest = workspace['manifest'];

    const packageExports: CliRecipePackageJsonNormalizeModulesHandlePackageExports = fileContents['exports'];
    const packageMain: CliRecipePackageJsonNormalizeModulesHandlePackageMain = fileContents['main'];
    const packageType: CliRecipePackageJsonNormalizeModulesHandlePackageType = fileContents['type'];
    const packageBrowser: CliRecipePackageJsonNormalizeModulesHandlePackageBrowser = fileContents['browser'];
    const packageImports: CliRecipePackageJsonNormalizeModulesHandlePackageImports = fileContents['imports'];

    // Sync the "exports" field.
    if (
      packageExports !== undefined // Package "exports" is defined.
      && [
        'config',
        'package',
        'tool',
      ].includes(manifest['role']) === false // Workspace role is not "config", "package", or "tool".
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeModules.handle',
        purpose: 'exports',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "exports". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'exports');
    } else if (
      manifest['role'] === 'config' // Workspace role is "config".
      || manifest['role'] === 'package' // Workspace role is "package".
      || manifest['role'] === 'tool' // Workspace role is "tool".
    ) {
      // If "exports" is a string, normalize it into an object.
      if (typeof packageExports === 'string') {
        Logger.customize({
          name: 'CliRecipePackageJsonNormalizeModules.handle',
          purpose: 'exports',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Normalizing "exports" from string to object ...`);

        Reflect.set(fileContents, 'exports', {
          '.': {
            default: packageExports,
          },
        });
      }
    }

    // Sync the "main" field.
    if (
      packageMain !== undefined // Package "main" is defined.
      && [
        'config',
        'app',
        'package',
        'tool',
      ].includes(manifest['role']) === false // Workspace role is not "config", "app", "package", or "tool".
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeModules.handle',
        purpose: 'main',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "main". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'main');
    } else if (
      manifest['role'] === 'config' // Workspace role is "config".
      || manifest['role'] === 'app' // Workspace role is "app".
      || manifest['role'] === 'package' // Workspace role is "package".
      || manifest['role'] === 'tool' // Workspace role is "tool".
    ) {
      const currentPackageExports: CliRecipePackageJsonNormalizeModulesHandleCurrentPackageExports = fileContents['exports'];

      if (
        typeof packageMain === 'string' // Package "main" is a string.
        && (
          isPlainObject(currentPackageExports) === true // Package "exports" is an object.
          && isPlainObject(currentPackageExports['.']) === true // Package "exports['.']" is an object.
          && typeof currentPackageExports['.']['require'] === 'string' // Package "exports['.'].require" is a string.
        )
        && packageMain !== currentPackageExports['.']['require'] // Package "main" differs from package "exports['.'].require".
      ) {
        Logger.customize({
          name: 'CliRecipePackageJsonNormalizeModules.handle',
          purpose: 'main',
        }).warn(`${chalk.magenta(`"${manifest['name']}" workspace`)} → "main" differs from "exports['.'].require". No changes applied.`);
      } else if (
        typeof packageMain === 'string' // Package "main" is a string.
        && (
          isPlainObject(currentPackageExports) === true // Package "exports" is an object.
          && isPlainObject(currentPackageExports['.']) === true // Package "exports['.']" is an object.
        )
        && typeof currentPackageExports['.']['require'] !== 'string' // Package "exports['.'].require" is not a string.
      ) {
        Logger.customize({
          name: 'CliRecipePackageJsonNormalizeModules.handle',
          purpose: 'main',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Syncing "exports['.'].require" from "main" ...`);

        Reflect.set(currentPackageExports['.'], 'require', packageMain);
      } else if (
        (
          isPlainObject(currentPackageExports) === true // Package "exports" is an object.
          && isPlainObject(currentPackageExports['.']) === true // Package "exports['.']" is an object.
          && typeof currentPackageExports['.']['require'] === 'string' // Package "exports['.'].require" is a string.
        )
        && typeof packageMain !== 'string' // Package "main" is not a string.
      ) {
        Logger.customize({
          name: 'CliRecipePackageJsonNormalizeModules.handle',
          purpose: 'main',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Syncing "main" from "exports['.'].require" ...`);

        Reflect.set(fileContents, 'main', currentPackageExports['.']['require']);
      } else if (
        typeof packageMain === 'string' // Package "main" is a string.
        && isPlainObject(currentPackageExports) === true // Package "exports" is an object.
        && typeof currentPackageExports['.'] === 'string' // Package "exports['.']" is a string.
      ) {
        Logger.customize({
          name: 'CliRecipePackageJsonNormalizeModules.handle',
          purpose: 'main',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Normalizing "exports['.']" from string to object ...`);

        Reflect.set(currentPackageExports, '.', {
          default: currentPackageExports['.'],
          require: packageMain,
        });
      }
    }

    // Sync the "type" field.
    if (
      packageType !== undefined // Package "type" is defined.
      && [
        'config',
        'app',
        'package',
        'tool',
      ].includes(manifest['role']) === false // Workspace role is not "config", "app", "package", or "tool".
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeModules.handle',
        purpose: 'type',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "type". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'type');
    }

    // Sync the "browser" field.
    if (
      packageBrowser !== undefined // Package "browser" is defined.
      && ['package'].includes(manifest['role']) === false // Workspace role is not "package".
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeModules.handle',
        purpose: 'browser',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "browser". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'browser');
    } else if (
      manifest['role'] === 'package' // Workspace role is "package".
    ) {
      const currentPackageExports: CliRecipePackageJsonNormalizeModulesHandleCurrentPackageExports = fileContents['exports'];

      if (
        typeof packageBrowser === 'string' // Package "browser" is a string.
        && (
          isPlainObject(currentPackageExports) === true // Package "exports" is an object.
          && isPlainObject(currentPackageExports['.']) === true // Package "exports['.']" is an object.
          && typeof currentPackageExports['.']['browser'] === 'string' // Package "exports['.'].browser" is a string.
        )
        && packageBrowser !== currentPackageExports['.']['browser'] // Package "browser" differs from "exports['.'].browser".
      ) {
        Logger.customize({
          name: 'CliRecipePackageJsonNormalizeModules.handle',
          purpose: 'browser',
        }).warn(`${chalk.magenta(`"${manifest['name']}" workspace`)} → "browser" differs from "exports['.'].browser". No changes applied.`);
      } else if (
        typeof packageBrowser === 'string' // Package "browser" is a string.
        && (
          isPlainObject(currentPackageExports) === true // Package "exports" is an object.
          && isPlainObject(currentPackageExports['.']) === true // Package "exports['.']" is an object.
        )
        && typeof currentPackageExports['.']['browser'] !== 'string' // Package "exports['.'].browser" is not a string.
      ) {
        Logger.customize({
          name: 'CliRecipePackageJsonNormalizeModules.handle',
          purpose: 'browser',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Syncing "exports['.'].browser" from "browser" ...`);

        Reflect.set(currentPackageExports['.'], 'browser', packageBrowser);
      } else if (
        (
          isPlainObject(currentPackageExports) === true // Package "exports" is an object.
          && isPlainObject(currentPackageExports['.']) === true // Package "exports['.']" is an object.
          && typeof currentPackageExports['.']['browser'] === 'string' // Package "exports['.'].browser" is a string.
        )
        && typeof packageBrowser !== 'string' // Package "browser" is not a string.
        && isPlainObject(packageBrowser) === false // Package "browser" is not a plain object.
      ) {
        Logger.customize({
          name: 'CliRecipePackageJsonNormalizeModules.handle',
          purpose: 'browser',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Syncing "browser" from "exports['.'].browser" ...`);

        Reflect.set(fileContents, 'browser', currentPackageExports['.']['browser']);
      } else if (
        typeof packageBrowser === 'string' // Package "browser" is a string.
        && isPlainObject(currentPackageExports) === true // Package "exports" is an object.
        && typeof currentPackageExports['.'] === 'string' // Package "exports['.']" is a string.
      ) {
        Logger.customize({
          name: 'CliRecipePackageJsonNormalizeModules.handle',
          purpose: 'browser',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Normalizing "exports['.']" from string to object ...`);

        Reflect.set(currentPackageExports, '.', {
          default: currentPackageExports['.'],
          browser: packageBrowser,
        });
      }
    }

    // Sync the "imports" field.
    if (
      packageImports !== undefined // Package "imports" is defined.
      && [
        'config',
        'app',
        'package',
        'tool',
      ].includes(manifest['role']) === false // Workspace role is not "config", "app", "package", or "tool".
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeModules.handle',
        purpose: 'imports',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "imports". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'imports');
    }

    return;
  }
}
