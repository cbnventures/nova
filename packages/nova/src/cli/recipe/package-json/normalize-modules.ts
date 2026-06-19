import chalk from 'chalk';

import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  isPlainObject,
  isProjectRoot,
  loadWorkspaceManifests,
  saveWorkspaceManifest,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_CurrentExportsBrowser,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_CurrentPackageExports,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_FileContents,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_Manifest,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_PackageBrowser,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_PackageExports,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_PackageImports,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_PackageMain,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_PackageType,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_Returns,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_Workspace,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_CurrentDirectory,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_EligibleWorkspaces,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_IsAtProjectRoot,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_IsDryRun,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_IsReplaceFile,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_Options,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_RecipeTupleFilter,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_ReplaceFileNotice,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_Returns,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_WorkingFile,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_WorkingFileWorkspaces,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_WorkspaceConfigFilter,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_WorkspaceRecipesFilter,
  Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_Workspaces,
} from '../../../types/cli/recipe/package-json/normalize-modules.d.ts';

/**
 * CLI - Recipe - package.json - Normalize Modules.
 *
 * Enforces exports, main, type, browser, and imports fields based on workspace role.
 * Normalizes string exports into condition map objects.
 *
 * @since 0.14.0
 */
export class Runner {
  /**
   * CLI - Recipe - package.json - Normalize Modules - Run.
   *
   * Loads nova.config.json, filters eligible workspaces, then normalizes module resolution
   * fields in each manifest. Supports dry-run mode.
   *
   * @param {Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_Returns}
   *
   * @since 0.14.0
   */
  public static async run(options: Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_Options): Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_Returns {
    const currentDirectory: Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_WorkingFile = await new LibNovaConfig().load();
    const workingFileWorkspaces: Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_WorkingFileWorkspaces = Object.entries(workingFile['workspaces'] ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-modules. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces: Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_EligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfigFilter: Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_WorkspaceConfigFilter = workspace[1];
      const workspaceRecipesFilter: Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_WorkspaceRecipesFilter = workspaceConfigFilter['recipes'];

      if (workspaceRecipesFilter === undefined) {
        return false;
      }

      const recipeTupleFilter: Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_RecipeTupleFilter = workspaceRecipesFilter['normalize-modules'];

      if (recipeTupleFilter === undefined) {
        return false;
      }

      return recipeTupleFilter[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-modules. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces: Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_Workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-modules. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for normalize-modules.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'iteration',
      }).info(`Running normalize-modules for the "${workspace['manifest']['name']}" workspace ...`);

      Runner.handle(workspace);

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
   * @param {Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_Workspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_Returns}
   *
   * @since 0.14.0
   */
  private static handle(workspace: Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_Workspace): Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_Returns {
    const fileContents: Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_FileContents = workspace['fileContents'];
    const manifest: Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_Manifest = workspace['manifest'];

    const packageExports: Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_PackageExports = fileContents['exports'];
    const packageMain: Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_PackageMain = fileContents['main'];
    const packageType: Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_PackageType = fileContents['type'];
    const packageBrowser: Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_PackageBrowser = fileContents['browser'];
    const packageImports: Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_PackageImports = fileContents['imports'];

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
        name: 'Runner.handle',
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
          name: 'Runner.handle',
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
        name: 'Runner.handle',
        purpose: 'main',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "main". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'main');
    } else if (
      manifest['role'] === 'config' // Workspace role is "config".
      || manifest['role'] === 'app' // Workspace role is "app".
      || manifest['role'] === 'package' // Workspace role is "package".
      || manifest['role'] === 'tool' // Workspace role is "tool".
    ) {
      const currentPackageExports: Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_CurrentPackageExports = fileContents['exports'];

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
          name: 'Runner.handle',
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
          name: 'Runner.handle',
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
          name: 'Runner.handle',
          purpose: 'main',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Syncing "main" from "exports['.'].require" ...`);

        Reflect.set(fileContents, 'main', currentPackageExports['.']['require']);
      } else if (
        typeof packageMain === 'string' // Package "main" is a string.
        && isPlainObject(currentPackageExports) === true // Package "exports" is an object.
        && typeof currentPackageExports['.'] === 'string' // Package "exports['.']" is a string.
      ) {
        Logger.customize({
          name: 'Runner.handle',
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
        name: 'Runner.handle',
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
        name: 'Runner.handle',
        purpose: 'browser',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "browser". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'browser');
    } else if (
      manifest['role'] === 'package' // Workspace role is "package".
    ) {
      const currentExportsBrowser: Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_CurrentExportsBrowser = fileContents['exports'];

      if (
        typeof packageBrowser === 'string' // Package "browser" is a string.
        && (
          isPlainObject(currentExportsBrowser) === true // Package "exports" is an object.
          && isPlainObject(currentExportsBrowser['.']) === true // Package "exports['.']" is an object.
          && typeof currentExportsBrowser['.']['browser'] === 'string' // Package "exports['.'].browser" is a string.
        )
        && packageBrowser !== currentExportsBrowser['.']['browser'] // Package "browser" differs from "exports['.'].browser".
      ) {
        Logger.customize({
          name: 'Runner.handle',
          purpose: 'browser',
        }).warn(`${chalk.magenta(`"${manifest['name']}" workspace`)} → "browser" differs from "exports['.'].browser". No changes applied.`);
      } else if (
        typeof packageBrowser === 'string' // Package "browser" is a string.
        && (
          isPlainObject(currentExportsBrowser) === true // Package "exports" is an object.
          && isPlainObject(currentExportsBrowser['.']) === true // Package "exports['.']" is an object.
        )
        && typeof currentExportsBrowser['.']['browser'] !== 'string' // Package "exports['.'].browser" is not a string.
      ) {
        Logger.customize({
          name: 'Runner.handle',
          purpose: 'browser',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Syncing "exports['.'].browser" from "browser" ...`);

        Reflect.set(currentExportsBrowser['.'], 'browser', packageBrowser);
      } else if (
        (
          isPlainObject(currentExportsBrowser) === true // Package "exports" is an object.
          && isPlainObject(currentExportsBrowser['.']) === true // Package "exports['.']" is an object.
          && typeof currentExportsBrowser['.']['browser'] === 'string' // Package "exports['.'].browser" is a string.
        )
        && typeof packageBrowser !== 'string' // Package "browser" is not a string.
        && isPlainObject(packageBrowser) === false // Package "browser" is not a plain object.
      ) {
        Logger.customize({
          name: 'Runner.handle',
          purpose: 'browser',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Syncing "browser" from "exports['.'].browser" ...`);

        Reflect.set(fileContents, 'browser', currentExportsBrowser['.']['browser']);
      } else if (
        typeof packageBrowser === 'string' // Package "browser" is a string.
        && isPlainObject(currentExportsBrowser) === true // Package "exports" is an object.
        && typeof currentExportsBrowser['.'] === 'string' // Package "exports['.']" is a string.
      ) {
        Logger.customize({
          name: 'Runner.handle',
          purpose: 'browser',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Normalizing "exports['.']" from string to object ...`);

        Reflect.set(currentExportsBrowser, '.', {
          default: currentExportsBrowser['.'],
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
        name: 'Runner.handle',
        purpose: 'imports',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "imports". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'imports');
    }

    return;
  }
}
