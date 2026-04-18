import chalk from 'chalk';

import { ApiNodeReleases } from '../../../api/node-releases.js';
import { LibNovaConfig } from '../../../lib/nova-config.js';
import {
  LIB_REGEX_PATTERN_DIGITS,
  LIB_REGEX_PATTERN_NAME_AT_VERSION,
  LIB_REGEX_PATTERN_RANGE_GREATER_EQUAL_MAJOR,
  LIB_REGEX_PATTERN_RANGE_MAJOR,
} from '../../../lib/regex.js';
import {
  isPlainObject,
  isProjectRoot,
  loadWorkspaceManifests,
  saveWorkspaceManifest,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  CliRecipePackageJsonSyncEnvironmentHandleBranches,
  CliRecipePackageJsonSyncEnvironmentHandleCorepackFileContents,
  CliRecipePackageJsonSyncEnvironmentHandleCorepackManifest,
  CliRecipePackageJsonSyncEnvironmentHandleCorepackPackageManager,
  CliRecipePackageJsonSyncEnvironmentHandleCorepackReturns,
  CliRecipePackageJsonSyncEnvironmentHandleCorepackWorkspace,
  CliRecipePackageJsonSyncEnvironmentHandleCoversAll,
  CliRecipePackageJsonSyncEnvironmentHandleExistingNode,
  CliRecipePackageJsonSyncEnvironmentHandleFileContents,
  CliRecipePackageJsonSyncEnvironmentHandleGeMatch,
  CliRecipePackageJsonSyncEnvironmentHandleLtsConstraint,
  CliRecipePackageJsonSyncEnvironmentHandleLtsMajors,
  CliRecipePackageJsonSyncEnvironmentHandleLtsMatches,
  CliRecipePackageJsonSyncEnvironmentHandleMajorMatch,
  CliRecipePackageJsonSyncEnvironmentHandleManifest,
  CliRecipePackageJsonSyncEnvironmentHandlePackageCpu,
  CliRecipePackageJsonSyncEnvironmentHandlePackageDevEngines,
  CliRecipePackageJsonSyncEnvironmentHandlePackageEngines,
  CliRecipePackageJsonSyncEnvironmentHandlePackageLibc,
  CliRecipePackageJsonSyncEnvironmentHandlePackageOs,
  CliRecipePackageJsonSyncEnvironmentHandleRecipes,
  CliRecipePackageJsonSyncEnvironmentHandleRecipeSettings,
  CliRecipePackageJsonSyncEnvironmentHandleRecipeTuple,
  CliRecipePackageJsonSyncEnvironmentHandleReturns,
  CliRecipePackageJsonSyncEnvironmentHandleTrackNodeLtsVersions,
  CliRecipePackageJsonSyncEnvironmentHandleWorkspace,
  CliRecipePackageJsonSyncEnvironmentIsEmptyReturns,
  CliRecipePackageJsonSyncEnvironmentIsEmptyValue,
  CliRecipePackageJsonSyncEnvironmentRunCurrentDirectory,
  CliRecipePackageJsonSyncEnvironmentRunEligibleWorkspaces,
  CliRecipePackageJsonSyncEnvironmentRunIsAtProjectRoot,
  CliRecipePackageJsonSyncEnvironmentRunIsDryRun,
  CliRecipePackageJsonSyncEnvironmentRunIsReplaceFile,
  CliRecipePackageJsonSyncEnvironmentRunOptions,
  CliRecipePackageJsonSyncEnvironmentRunRecipeTupleFilter,
  CliRecipePackageJsonSyncEnvironmentRunReplaceFileNotice,
  CliRecipePackageJsonSyncEnvironmentRunReturns,
  CliRecipePackageJsonSyncEnvironmentRunWorkingFile,
  CliRecipePackageJsonSyncEnvironmentRunWorkingFileWorkspaces,
  CliRecipePackageJsonSyncEnvironmentRunWorkspaceConfigFilter,
  CliRecipePackageJsonSyncEnvironmentRunWorkspaceRecipesFilter,
  CliRecipePackageJsonSyncEnvironmentRunWorkspaces,
  CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintConstraint,
  CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintCurrentNode,
  CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintEngines,
  CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintPrevious,
  CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintReturns,
  CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintWorkspace,
} from '../../../types/cli/recipe/package-json/sync-environment.d.ts';

/**
 * CLI - Recipe - package.json - Sync Environment.
 *
 * Aligns engines, os, cpu, libc, devEngines, and
 * packageManager fields across all workspace manifests.
 * Called by the recipe registry during run-recipes.
 *
 * @since 0.14.0
 */
export class CliRecipePackageJsonSyncEnvironment {
  /**
   * CLI - Recipe - package.json - Sync Environment - Run.
   *
   * Loads nova.config.json, filters eligible workspaces,
   * then iterates each manifest to sync environment fields.
   * Supports dry-run and replace-file modes.
   *
   * @param {CliRecipePackageJsonSyncEnvironmentRunOptions} options - Options.
   *
   * @returns {CliRecipePackageJsonSyncEnvironmentRunReturns}
   *
   * @since 0.14.0
   */
  public static async run(options: CliRecipePackageJsonSyncEnvironmentRunOptions): CliRecipePackageJsonSyncEnvironmentRunReturns {
    const currentDirectory: CliRecipePackageJsonSyncEnvironmentRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliRecipePackageJsonSyncEnvironmentRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: CliRecipePackageJsonSyncEnvironmentRunIsDryRun = options['dryRun'] === true;
    const isReplaceFile: CliRecipePackageJsonSyncEnvironmentRunIsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncEnvironment.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: CliRecipePackageJsonSyncEnvironmentRunReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CliRecipePackageJsonSyncEnvironment.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: CliRecipePackageJsonSyncEnvironmentRunWorkingFile = await new LibNovaConfig().load();
    const workingFileWorkspaces: CliRecipePackageJsonSyncEnvironmentRunWorkingFileWorkspaces = Object.entries(workingFile['workspaces'] ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncEnvironment.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-environment. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces: CliRecipePackageJsonSyncEnvironmentRunEligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig: CliRecipePackageJsonSyncEnvironmentRunWorkspaceConfigFilter = workspace[1];
      const workspaceRecipes: CliRecipePackageJsonSyncEnvironmentRunWorkspaceRecipesFilter = workspaceConfig['recipes'];

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple: CliRecipePackageJsonSyncEnvironmentRunRecipeTupleFilter = workspaceRecipes['sync-environment'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncEnvironment.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-environment. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces: CliRecipePackageJsonSyncEnvironmentRunWorkspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncEnvironment.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-environment. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CliRecipePackageJsonSyncEnvironment.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for sync-environment.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncEnvironment.run',
        purpose: 'iteration',
      }).info(`Running sync-environment for the "${workspace['manifest']['name']}" workspace ...`);

      CliRecipePackageJsonSyncEnvironment.handleCorepack(workspace);

      await CliRecipePackageJsonSyncEnvironment.handle(workspace);

      if (isDryRun === true) {
        continue;
      }

      await saveWorkspaceManifest(workspace, isReplaceFile);
    }

    return;
  }

  /**
   * CLI - Recipe - package.json - Sync Environment - Handle.
   *
   * Processes a single workspace manifest to enforce
   * engines, os, cpu, libc, and devEngines constraints.
   * Fetches active LTS versions from the Node API.
   *
   * @param {CliRecipePackageJsonSyncEnvironmentHandleWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CliRecipePackageJsonSyncEnvironmentHandleReturns}
   *
   * @since 0.14.0
   */
  private static async handle(workspace: CliRecipePackageJsonSyncEnvironmentHandleWorkspace): CliRecipePackageJsonSyncEnvironmentHandleReturns {
    const fileContents: CliRecipePackageJsonSyncEnvironmentHandleFileContents = workspace['fileContents'];
    const manifest: CliRecipePackageJsonSyncEnvironmentHandleManifest = workspace['manifest'];

    const packageEngines: CliRecipePackageJsonSyncEnvironmentHandlePackageEngines = fileContents['engines'];
    const packageOs: CliRecipePackageJsonSyncEnvironmentHandlePackageOs = fileContents['os'];
    const packageCpu: CliRecipePackageJsonSyncEnvironmentHandlePackageCpu = fileContents['cpu'];
    const packageLibc: CliRecipePackageJsonSyncEnvironmentHandlePackageLibc = fileContents['libc'];
    const packageDevEngines: CliRecipePackageJsonSyncEnvironmentHandlePackageDevEngines = fileContents['devEngines'];

    // Sync the "engines" field (Required).
    const ltsConstraint: CliRecipePackageJsonSyncEnvironmentHandleLtsConstraint = await ApiNodeReleases.fetchLtsVersions();

    if (
      packageEngines === undefined // Package "engines" is missing.
    ) {
      if (ltsConstraint !== undefined) {
        Logger.customize({
          name: 'CliRecipePackageJsonSyncEnvironment.handle',
          purpose: 'engines',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Adding "engines" with "node" set to "${ltsConstraint}" ...`);

        Reflect.set(fileContents, 'engines', {
          node: ltsConstraint,
        });
      } else {
        Logger.customize({
          name: 'CliRecipePackageJsonSyncEnvironment.handle',
          purpose: 'engines',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Adding "engines" as an empty object ...`);

        Reflect.set(fileContents, 'engines', {});
      }
    } else if (
      isPlainObject(packageEngines) === true // Package "engines" is an object.
      && packageEngines['node'] === undefined // Package "engines.node" is missing.
      && ltsConstraint !== undefined // LTS constraint is available.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncEnvironment.handle',
        purpose: 'engines',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Adding "engines.node" set to "${ltsConstraint}" ...`);

      Reflect.set(packageEngines, 'node', ltsConstraint);
    }

    // Check if "trackNodeLtsVersions" is enabled in the recipe settings.
    const recipes: CliRecipePackageJsonSyncEnvironmentHandleRecipes = manifest['recipes'];
    const recipeTuple: CliRecipePackageJsonSyncEnvironmentHandleRecipeTuple = (recipes !== undefined) ? recipes['sync-environment'] : undefined;
    const recipeSettings: CliRecipePackageJsonSyncEnvironmentHandleRecipeSettings = (recipeTuple !== undefined && recipeTuple.length > 1) ? recipeTuple[1] : undefined;
    const trackNodeLtsVersions: CliRecipePackageJsonSyncEnvironmentHandleTrackNodeLtsVersions = (recipeSettings !== undefined && recipeSettings['trackNodeLtsVersions'] === true);

    // Warn if "engines.node" does not cover all active LTS versions (only when trackNodeLtsVersions is enabled).
    if (
      trackNodeLtsVersions === true // Workspace has opted into LTS engine tracking.
      && isPlainObject(fileContents['engines']) === true // Package "engines" is an object.
      && typeof fileContents['engines']['node'] === 'string' // Package "engines.node" is a string.
      && ltsConstraint !== undefined // LTS constraint is available.
    ) {
      const existingNode: CliRecipePackageJsonSyncEnvironmentHandleExistingNode = fileContents['engines']['node'];
      const ltsMatches: CliRecipePackageJsonSyncEnvironmentHandleLtsMatches = [...ltsConstraint.matchAll(new RegExp(LIB_REGEX_PATTERN_DIGITS.source, 'g'))];

      if (ltsMatches.length > 0) {
        const ltsMajors: CliRecipePackageJsonSyncEnvironmentHandleLtsMajors = ltsMatches.map((ltsMatch) => {
          return parseInt(ltsMatch[0], 10);
        });

        const branches: CliRecipePackageJsonSyncEnvironmentHandleBranches = existingNode.split('||').map((branch) => branch.trim());

        // Check if every active LTS major is covered by at least one branch.
        const coversAll: CliRecipePackageJsonSyncEnvironmentHandleCoversAll = ltsMajors.every((ltsMajor) => {
          return branches.some((branch) => {
            // Wildcard: covers everything.
            if (branch === '*') {
              return true;
            }

            // >=N pattern: covers major if N <= major.
            const geMatch: CliRecipePackageJsonSyncEnvironmentHandleGeMatch = branch.match(LIB_REGEX_PATTERN_RANGE_GREATER_EQUAL_MAJOR);

            if (geMatch !== null) {
              return parseInt(geMatch[1] ?? '', 10) <= ltsMajor;
            }

            // ^N, ~N, or N.x pattern: covers major if N === major.
            const majorMatch: CliRecipePackageJsonSyncEnvironmentHandleMajorMatch = branch.match(LIB_REGEX_PATTERN_RANGE_MAJOR);

            if (majorMatch !== null) {
              return parseInt(majorMatch[1] ?? '', 10) === ltsMajor;
            }

            return false;
          });
        });

        if (coversAll !== true) {
          Logger.customize({
            name: 'CliRecipePackageJsonSyncEnvironment.handle',
            purpose: 'engines',
          }).warn(`${chalk.magenta(`"${manifest['name']}" workspace`)} → "engines.node" is "${existingNode}" but must cover all active LTS versions (${ltsMajors.join(', ')}). Run "nova recipe package-json sync-environment" with "trackNodeLtsVersions" enabled to update.`);
        }
      }
    }

    // Sync "engines.node" to match the LTS constraint (only when trackNodeLtsVersions is enabled).
    if (
      trackNodeLtsVersions === true // Workspace has opted into LTS engine tracking.
      && ltsConstraint !== undefined // LTS constraint is available.
    ) {
      CliRecipePackageJsonSyncEnvironment.syncNodeConstraint(workspace, ltsConstraint);
    }

    // Sync the "os" field (Conditional).
    if (
      packageOs !== undefined // Package "os" is defined.
      && CliRecipePackageJsonSyncEnvironment.isEmpty(packageOs) === true // Package "os" is empty.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncEnvironment.handle',
        purpose: 'os',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "os" ...`);

      Reflect.deleteProperty(fileContents, 'os');
    }

    // Sync the "cpu" field (Conditional).
    if (
      packageCpu !== undefined // Package "cpu" is defined.
      && CliRecipePackageJsonSyncEnvironment.isEmpty(packageCpu) === true // Package "cpu" is empty.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncEnvironment.handle',
        purpose: 'cpu',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "cpu" ...`);

      Reflect.deleteProperty(fileContents, 'cpu');
    }

    // Sync the "libc" field (Conditional).
    if (
      packageLibc !== undefined // Package "libc" is defined.
      && (
        Array.isArray(fileContents['os']) === false // Package "os" is not an array.
        || fileContents['os'].includes('linux') === false // Package "os" does not include "linux".
      )
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncEnvironment.handle',
        purpose: 'libc',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "libc". Package "os" does not include "linux".`);

      Reflect.deleteProperty(fileContents, 'libc');
    } else if (
      packageLibc === undefined // Package "libc" is missing.
      && (
        Array.isArray(fileContents['os']) === true // Package "os" is an array.
        && fileContents['os'].includes('linux') === true // Package "os" includes "linux".
      )
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncEnvironment.handle',
        purpose: 'libc',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Adding "libc" as "glibc" ...`);

      Reflect.set(fileContents, 'libc', ['glibc']);
    }

    // Sync the "devEngines" field (Conditional).
    if (
      packageDevEngines !== undefined // Package "devEngines" is defined.
      && CliRecipePackageJsonSyncEnvironment.isEmpty(packageDevEngines) === true // Package "devEngines" is empty.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncEnvironment.handle',
        purpose: 'devEngines',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "devEngines" ...`);

      Reflect.deleteProperty(fileContents, 'devEngines');
    }

    return;
  }

  /**
   * CLI - Recipe - package.json - Sync Environment - Handle Corepack.
   *
   * Validates the packageManager field for corepack compatibility. Only project-role
   * workspaces may keep the field; all others have it removed.
   *
   * @param {CliRecipePackageJsonSyncEnvironmentHandleCorepackWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CliRecipePackageJsonSyncEnvironmentHandleCorepackReturns}
   *
   * @since 0.14.0
   */
  private static handleCorepack(workspace: CliRecipePackageJsonSyncEnvironmentHandleCorepackWorkspace): CliRecipePackageJsonSyncEnvironmentHandleCorepackReturns {
    const fileContents: CliRecipePackageJsonSyncEnvironmentHandleCorepackFileContents = workspace['fileContents'];
    const manifest: CliRecipePackageJsonSyncEnvironmentHandleCorepackManifest = workspace['manifest'];

    const packageManager: CliRecipePackageJsonSyncEnvironmentHandleCorepackPackageManager = fileContents['packageManager'];

    // Sync the "packageManager" field.
    if (
      packageManager !== undefined // Package "packageManager" is defined.
      && manifest['role'] !== 'project' // Workspace role is not "project".
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncEnvironment.handleCorepack',
        purpose: 'packageManager',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "packageManager". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'packageManager');
    } else if (
      manifest['role'] === 'project' // Workspace role is "project".
      && packageManager !== undefined // Package "packageManager" is defined.
      && (
        typeof packageManager !== 'string' // Package "packageManager" is not a string.
        || LIB_REGEX_PATTERN_NAME_AT_VERSION.test(packageManager) === false // Package "packageManager" is not valid format (<name>@<version>).
      )
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncEnvironment.handleCorepack',
        purpose: 'packageManager',
      }).warn(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "packageManager". Invalid format detected.`);

      Reflect.deleteProperty(fileContents, 'packageManager');
    }

    return;
  }

  /**
   * CLI - Recipe - package.json - Sync Environment - Sync Node Constraint.
   *
   * Updates engines.node to match the computed LTS constraint. Only runs when
   * trackNodeLtsVersions is enabled in the recipe settings.
   *
   * @param {CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintWorkspace}  workspace  - Workspace.
   * @param {CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintConstraint} constraint - Constraint.
   *
   * @private
   *
   * @returns {CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintReturns}
   *
   * @since 0.14.0
   */
  private static syncNodeConstraint(workspace: CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintWorkspace, constraint: CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintConstraint): CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintReturns {
    const engines: CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintEngines = workspace['fileContents']['engines'];

    // If "engines" does not exist, create it with the constraint.
    if (engines === undefined) {
      Reflect.set(workspace['fileContents'], 'engines', { node: constraint });

      Logger.customize({
        name: 'CliRecipePackageJsonSyncEnvironment.syncNodeConstraint',
        purpose: 'engines',
      }).info(`${chalk.magenta(`"${workspace['manifest']['name']}" workspace`)} → Created "engines.node" with "${constraint}".`);

      return;
    }

    // If "engines" exists but is not a plain object, warn and skip.
    if (isPlainObject(engines) === false) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncEnvironment.syncNodeConstraint',
        purpose: 'engines',
      }).warn(`${chalk.magenta(`"${workspace['manifest']['name']}" workspace`)} → "engines" is not a plain object. Skipping.`);

      return;
    }

    const currentNode: CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintCurrentNode = engines['node'];

    // If "engines.node" already matches the constraint, skip.
    if (currentNode === constraint) {
      Logger.customize({
        name: 'CliRecipePackageJsonSyncEnvironment.syncNodeConstraint',
        purpose: 'engines',
      }).info(`${chalk.magenta(`"${workspace['manifest']['name']}" workspace`)} → "engines.node" is already up to date.`);

      return;
    }

    // Update "engines.node" to the constraint.
    Reflect.set(engines, 'node', constraint);

    const previous: CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintPrevious = (typeof currentNode === 'string') ? currentNode : String(currentNode ?? 'undefined');

    Logger.customize({
      name: 'CliRecipePackageJsonSyncEnvironment.syncNodeConstraint',
      purpose: 'engines',
    }).info(`${chalk.magenta(`"${workspace['manifest']['name']}" workspace`)} → Updated "engines.node" from "${previous}" to "${constraint}".`);

    return;
  }

  /**
   * CLI - Recipe - package.json - Sync Environment - Is Empty.
   *
   * Checks whether a value is null, undefined, a blank
   * string, an empty array, or an object with no keys.
   * Used by handle to decide when to remove fields.
   *
   * @param {CliRecipePackageJsonSyncEnvironmentIsEmptyValue} value - Value.
   *
   * @private
   *
   * @returns {CliRecipePackageJsonSyncEnvironmentIsEmptyReturns}
   *
   * @since 0.14.0
   */
  private static isEmpty(value: CliRecipePackageJsonSyncEnvironmentIsEmptyValue): CliRecipePackageJsonSyncEnvironmentIsEmptyReturns {
    if (value === null || value === undefined) {
      return true;
    }

    if (typeof value === 'string') {
      return value.trim() === '';
    }

    if (Array.isArray(value) === true) {
      return value.length === 0;
    }

    if (typeof value === 'object') {
      return Object.keys(value).length === 0;
    }

    return false;
  }
}
