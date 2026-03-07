import chalk from 'chalk';

import { NodeReleases } from '@/api/node-releases.js';
import { NovaConfig } from '@/lib/nova-config.js';
import {
  PATTERN_DIGITS,
  PATTERN_NAME_AT_VERSION,
  PATTERN_RANGE_GREATER_EQUAL_MAJOR,
  PATTERN_RANGE_MAJOR,
} from '@/lib/regex.js';
import {
  isPlainObject,
  isProjectRoot,
  loadWorkspaceManifests,
  saveWorkspaceManifest,
} from '@/lib/utility.js';
import { Logger } from '@/toolkit/index.js';

import type {
  CLIRecipePackageJsonSyncEnvironmentHandleCorepackReturns,
  CLIRecipePackageJsonSyncEnvironmentHandleCorepackWorkspace,
  CLIRecipePackageJsonSyncEnvironmentHandleReturns,
  CLIRecipePackageJsonSyncEnvironmentHandleWorkspace,
  CLIRecipePackageJsonSyncEnvironmentIsEmptyReturns,
  CLIRecipePackageJsonSyncEnvironmentIsEmptyValue,
  CLIRecipePackageJsonSyncEnvironmentRunOptions,
  CLIRecipePackageJsonSyncEnvironmentRunReturns,
  CLIRecipePackageJsonSyncEnvironmentSyncNodeConstraintConstraint,
  CLIRecipePackageJsonSyncEnvironmentSyncNodeConstraintReturns,
  CLIRecipePackageJsonSyncEnvironmentSyncNodeConstraintWorkspace,
} from '@/types/cli/recipe/package-json/sync-environment.d.ts';

/**
 * CLI Recipe - package.json - Sync Environment.
 *
 * @since 1.0.0
 */
export class CLIRecipePackageJsonSyncEnvironment {
  /**
   * CLI Recipe - package.json - Sync Environment - Run.
   *
   * @param {CLIRecipePackageJsonSyncEnvironmentRunOptions} options - Options.
   *
   * @returns {CLIRecipePackageJsonSyncEnvironmentRunReturns}
   *
   * @since 1.0.0
   */
  public static async run(options: CLIRecipePackageJsonSyncEnvironmentRunOptions): CLIRecipePackageJsonSyncEnvironmentRunReturns {
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
        name: 'CLIRecipePackageJsonSyncEnvironment.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice = (isDryRun) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CLIRecipePackageJsonSyncEnvironment.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const novaConfig = new NovaConfig();
    const workingFile = await novaConfig.load();
    const workingFileWorkspaces = Object.entries(workingFile.workspaces ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncEnvironment.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-environment. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig = workspace[1];
      const workspaceRecipes = workspaceConfig.recipes;

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple = workspaceRecipes['sync-environment'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncEnvironment.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-environment. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncEnvironment.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-environment. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CLIRecipePackageJsonSyncEnvironment.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for sync-environment.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncEnvironment.run',
        purpose: 'iteration',
      }).info(`Running sync-environment for the "${workspace.manifest.name}" workspace ...`);

      CLIRecipePackageJsonSyncEnvironment.handleCorepack(workspace);

      await CLIRecipePackageJsonSyncEnvironment.handle(workspace);

      if (isDryRun === true) {
        continue;
      }

      await saveWorkspaceManifest(workspace, isReplaceFile);
    }
  }

  /**
   * CLI Recipe - package.json - Sync Environment - Handle.
   *
   * @param {CLIRecipePackageJsonSyncEnvironmentHandleWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonSyncEnvironmentHandleReturns}
   *
   * @since 1.0.0
   */
  private static async handle(workspace: CLIRecipePackageJsonSyncEnvironmentHandleWorkspace): CLIRecipePackageJsonSyncEnvironmentHandleReturns {
    const fileContents = workspace.fileContents;
    const manifest = workspace.manifest;

    const packageEngines = fileContents['engines'];
    const packageOs = fileContents['os'];
    const packageCpu = fileContents['cpu'];
    const packageLibc = fileContents['libc'];
    const packageDevEngines = fileContents['devEngines'];

    // Sync the "engines" field (Required).
    const ltsConstraint = await NodeReleases.fetchLtsVersions();

    if (
      packageEngines === undefined // Package "engines" is missing.
    ) {
      if (ltsConstraint !== undefined) {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncEnvironment.handle',
          purpose: 'engines',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Adding "engines" with "node" set to "${ltsConstraint}" ...`);

        Reflect.set(fileContents, 'engines', {
          node: ltsConstraint,
        });
      } else {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncEnvironment.handle',
          purpose: 'engines',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Adding "engines" as an empty object ...`);

        Reflect.set(fileContents, 'engines', {});
      }
    } else {
      if (
        isPlainObject(packageEngines) // Package "engines" is an object.
        && packageEngines['node'] === undefined // Package "engines.node" is missing.
        && ltsConstraint !== undefined // LTS constraint is available.
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncEnvironment.handle',
          purpose: 'engines',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Adding "engines.node" set to "${ltsConstraint}" ...`);

        Reflect.set(packageEngines, 'node', ltsConstraint);
      }
    }

    // Check if "trackNodeLtsVersions" is enabled in the recipe settings.
    const recipes = manifest.recipes;
    const recipeTuple = (recipes !== undefined) ? recipes['sync-environment'] : undefined;
    const recipeSettings = (recipeTuple !== undefined && recipeTuple.length > 1) ? recipeTuple[1] : undefined;
    const trackNodeLtsVersions = (recipeSettings !== undefined && recipeSettings['trackNodeLtsVersions'] === true);

    // Warn if "engines.node" does not cover all active LTS versions (only when trackNodeLtsVersions is enabled).
    if (
      trackNodeLtsVersions === true // Workspace has opted into LTS engine tracking.
      && isPlainObject(fileContents['engines']) // Package "engines" is an object.
      && typeof fileContents['engines']['node'] === 'string' // Package "engines.node" is a string.
      && ltsConstraint !== undefined // LTS constraint is available.
    ) {
      const existingNode = fileContents['engines']['node'];
      const ltsMatches = [...ltsConstraint.matchAll(new RegExp(PATTERN_DIGITS.source, 'g'))];

      if (ltsMatches.length > 0) {
        const ltsMajors = ltsMatches.map((ltsMatch) => {
          return parseInt(ltsMatch[0], 10);
        });

        const branches = existingNode.split('||').map((branch) => branch.trim());

        // Check if every active LTS major is covered by at least one branch.
        const coversAll = ltsMajors.every((ltsMajor) => {
          return branches.some((branch) => {
            // Wildcard: covers everything.
            if (branch === '*') {
              return true;
            }

            // >=N pattern: covers major if N <= major.
            const geMatch = branch.match(PATTERN_RANGE_GREATER_EQUAL_MAJOR);

            if (geMatch !== null) {
              return parseInt(geMatch[1] ?? '', 10) <= ltsMajor;
            }

            // ^N, ~N, or N.x pattern: covers major if N === major.
            const majorMatch = branch.match(PATTERN_RANGE_MAJOR);

            if (majorMatch !== null) {
              return parseInt(majorMatch[1] ?? '', 10) === ltsMajor;
            }

            return false;
          });
        });

        if (coversAll !== true) {
          Logger.customize({
            name: 'CLIRecipePackageJsonSyncEnvironment.handle',
            purpose: 'engines',
          }).warn(`${chalk.magenta(`"${manifest.name}" workspace`)} → "engines.node" is "${existingNode}" but must cover all active LTS versions (${ltsMajors.join(', ')}). Run "nova recipe package-json sync-environment" with "trackNodeLtsVersions" enabled to update.`);
        }
      }
    }

    // Sync "engines.node" to match the LTS constraint (only when trackNodeLtsVersions is enabled).
    if (
      trackNodeLtsVersions === true // Workspace has opted into LTS engine tracking.
      && ltsConstraint !== undefined // LTS constraint is available.
    ) {
      CLIRecipePackageJsonSyncEnvironment.syncNodeConstraint(workspace, ltsConstraint);
    }

    // Sync the "os" field (Conditional).
    if (
      packageOs !== undefined // Package "os" is defined.
      && CLIRecipePackageJsonSyncEnvironment.isEmpty(packageOs) // Package "os" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncEnvironment.handle',
        purpose: 'os',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "os" ...`);

      Reflect.deleteProperty(fileContents, 'os');
    }

    // Sync the "cpu" field (Conditional).
    if (
      packageCpu !== undefined // Package "cpu" is defined.
      && CLIRecipePackageJsonSyncEnvironment.isEmpty(packageCpu) // Package "cpu" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncEnvironment.handle',
        purpose: 'cpu',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "cpu" ...`);

      Reflect.deleteProperty(fileContents, 'cpu');
    }

    // Sync the "libc" field (Conditional).
    if (
      packageLibc !== undefined // Package "libc" is defined.
      && !(
        Array.isArray(fileContents['os']) // Package "os" is an array.
        && fileContents['os'].includes('linux') // Package "os" includes "linux".
      )
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncEnvironment.handle',
        purpose: 'libc',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "libc". Package "os" does not include "linux".`);

      Reflect.deleteProperty(fileContents, 'libc');
    } else {
      if (
        packageLibc === undefined // Package "libc" is missing.
        && (
          Array.isArray(fileContents['os']) // Package "os" is an array.
          && fileContents['os'].includes('linux') // Package "os" includes "linux".
        )
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncEnvironment.handle',
          purpose: 'libc',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Adding "libc" as "glibc" ...`);

        Reflect.set(fileContents, 'libc', ['glibc']);
      }
    }

    // Sync the "devEngines" field (Conditional).
    if (
      packageDevEngines !== undefined // Package "devEngines" is defined.
      && CLIRecipePackageJsonSyncEnvironment.isEmpty(packageDevEngines) // Package "devEngines" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncEnvironment.handle',
        purpose: 'devEngines',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "devEngines" ...`);

      Reflect.deleteProperty(fileContents, 'devEngines');
    }
  }

  /**
   * CLI Recipe - package.json - Sync Environment - Handle corepack.
   *
   * @param {CLIRecipePackageJsonSyncEnvironmentHandleCorepackWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonSyncEnvironmentHandleCorepackReturns}
   *
   * @since 1.0.0
   */
  private static handleCorepack(workspace: CLIRecipePackageJsonSyncEnvironmentHandleCorepackWorkspace): CLIRecipePackageJsonSyncEnvironmentHandleCorepackReturns {
    const fileContents = workspace.fileContents;
    const manifest = workspace.manifest;

    const packageManager = fileContents['packageManager'];

    // Sync the "packageManager" field.
    if (
      packageManager !== undefined // Package "packageManager" is defined.
      && manifest.role !== 'project' // Workspace role is not "project".
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncEnvironment.handleCorepack',
        purpose: 'packageManager',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "packageManager". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'packageManager');
    } else {
      if (
        manifest.role === 'project' // Workspace role is "project".
        && packageManager !== undefined // Package "packageManager" is defined.
        && (
          typeof packageManager !== 'string' // Package "packageManager" is not a string.
          || !PATTERN_NAME_AT_VERSION.test(packageManager) // Package "packageManager" is not valid format (<name>@<version>).
        )
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncEnvironment.handleCorepack',
          purpose: 'packageManager',
        }).warn(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "packageManager". Invalid format detected.`);

        Reflect.deleteProperty(fileContents, 'packageManager');
      }
    }
  }

  /**
   * CLI Recipe - package.json - Sync Environment - Sync node constraint.
   *
   * @param {CLIRecipePackageJsonSyncEnvironmentSyncNodeConstraintWorkspace}  workspace  - Workspace.
   * @param {CLIRecipePackageJsonSyncEnvironmentSyncNodeConstraintConstraint} constraint - Constraint.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonSyncEnvironmentSyncNodeConstraintReturns}
   *
   * @since 1.0.0
   */
  private static syncNodeConstraint(workspace: CLIRecipePackageJsonSyncEnvironmentSyncNodeConstraintWorkspace, constraint: CLIRecipePackageJsonSyncEnvironmentSyncNodeConstraintConstraint): CLIRecipePackageJsonSyncEnvironmentSyncNodeConstraintReturns {
    const engines = workspace.fileContents['engines'];

    // If "engines" does not exist, create it with the constraint.
    if (engines === undefined) {
      Reflect.set(workspace.fileContents, 'engines', { node: constraint });

      Logger.customize({
        name: 'CLIRecipePackageJsonSyncEnvironment.syncNodeConstraint',
        purpose: 'engines',
      }).info(`${chalk.magenta(`"${workspace.manifest.name}" workspace`)} → Created "engines.node" with "${constraint}".`);

      return;
    }

    // If "engines" exists but is not a plain object, warn and skip.
    if (!isPlainObject(engines)) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncEnvironment.syncNodeConstraint',
        purpose: 'engines',
      }).warn(`${chalk.magenta(`"${workspace.manifest.name}" workspace`)} → "engines" is not a plain object. Skipping.`);

      return;
    }

    const currentNode = engines['node'];

    // If "engines.node" already matches the constraint, skip.
    if (currentNode === constraint) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncEnvironment.syncNodeConstraint',
        purpose: 'engines',
      }).info(`${chalk.magenta(`"${workspace.manifest.name}" workspace`)} → "engines.node" is already up to date.`);

      return;
    }

    // Update "engines.node" to the constraint.
    Reflect.set(engines, 'node', constraint);

    const previous = (typeof currentNode === 'string') ? currentNode : String(currentNode ?? 'undefined');

    Logger.customize({
      name: 'CLIRecipePackageJsonSyncEnvironment.syncNodeConstraint',
      purpose: 'engines',
    }).info(`${chalk.magenta(`"${workspace.manifest.name}" workspace`)} → Updated "engines.node" from "${previous}" to "${constraint}".`);
  }

  /**
   * CLI Recipe - package.json - Sync Environment - Is empty.
   *
   * @param {CLIRecipePackageJsonSyncEnvironmentIsEmptyValue} value - Value.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonSyncEnvironmentIsEmptyReturns}
   *
   * @since 1.0.0
   */
  private static isEmpty(value: CLIRecipePackageJsonSyncEnvironmentIsEmptyValue): CLIRecipePackageJsonSyncEnvironmentIsEmptyReturns {
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
