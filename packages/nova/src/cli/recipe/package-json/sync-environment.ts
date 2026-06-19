import chalk from 'chalk';

import { Runner as ApiNodeReleases } from '../../../api/node-releases.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
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
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_Branches,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_CoversAll,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_ExistingNode,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_FileContents,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_GeMatch,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_LtsConstraint,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_LtsMajors,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_LtsMatches,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_MajorMatch,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_Manifest,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_PackageCpu,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_PackageDevEngines,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_PackageEngines,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_PackageLibc,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_PackageOs,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_Recipes,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_RecipeSettings,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_RecipeTuple,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_Returns,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_TrackNodeLtsVersions,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_Workspace,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_HandleCorepack_FileContents,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_HandleCorepack_Manifest,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_HandleCorepack_PackageManager,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_HandleCorepack_Returns,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_HandleCorepack_Workspace,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_IsEmpty_Returns,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_IsEmpty_Value,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_CurrentDirectory,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_EligibleWorkspaces,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_IsAtProjectRoot,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_IsDryRun,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_IsReplaceFile,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_Options,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_RecipeTupleFilter,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_ReplaceFileNotice,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_Returns,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_WorkingFile,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_WorkingFileWorkspaces,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_WorkspaceConfigFilter,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_WorkspaceRecipesFilter,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_Workspaces,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_Constraint,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_CurrentNode,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_Engines,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_Previous,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_Returns,
  Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_Workspace,
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
export class Runner {
  /**
   * CLI - Recipe - package.json - Sync Environment - Run.
   *
   * Loads nova.config.json, filters eligible workspaces,
   * then iterates each manifest to sync environment fields.
   * Supports dry-run and replace-file modes.
   *
   * @param {Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_Returns}
   *
   * @since 0.14.0
   */
  public static async run(options: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_Options): Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_Returns {
    const currentDirectory: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_WorkingFile = await new LibNovaConfig().load();
    const workingFileWorkspaces: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_WorkingFileWorkspaces = Object.entries(workingFile['workspaces'] ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-environment. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_EligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfigFilter: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_WorkspaceConfigFilter = workspace[1];
      const workspaceRecipesFilter: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_WorkspaceRecipesFilter = workspaceConfigFilter['recipes'];

      if (workspaceRecipesFilter === undefined) {
        return false;
      }

      const recipeTupleFilter: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_RecipeTupleFilter = workspaceRecipesFilter['sync-environment'];

      if (recipeTupleFilter === undefined) {
        return false;
      }

      return recipeTupleFilter[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-environment. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_Workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-environment. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for sync-environment.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'iteration',
      }).info(`Running sync-environment for the "${workspace['manifest']['name']}" workspace ...`);

      Runner.handleCorepack(workspace);

      await Runner.handle(workspace);

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
   * @param {Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_Workspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_Returns}
   *
   * @since 0.14.0
   */
  private static async handle(workspace: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_Workspace): Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_Returns {
    const fileContents: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_FileContents = workspace['fileContents'];
    const manifest: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_Manifest = workspace['manifest'];

    const packageEngines: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_PackageEngines = fileContents['engines'];
    const packageOs: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_PackageOs = fileContents['os'];
    const packageCpu: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_PackageCpu = fileContents['cpu'];
    const packageLibc: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_PackageLibc = fileContents['libc'];
    const packageDevEngines: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_PackageDevEngines = fileContents['devEngines'];

    // Sync the "engines" field (Required).
    const ltsConstraint: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_LtsConstraint = await ApiNodeReleases.fetchLtsVersions();

    if (
      packageEngines === undefined // Package "engines" is missing.
    ) {
      if (ltsConstraint !== undefined) {
        Logger.customize({
          name: 'Runner.handle',
          purpose: 'engines',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Adding "engines" with "node" set to "${ltsConstraint}" ...`);

        Reflect.set(fileContents, 'engines', {
          node: ltsConstraint,
        });
      } else {
        Logger.customize({
          name: 'Runner.handle',
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
        name: 'Runner.handle',
        purpose: 'engines',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Adding "engines.node" set to "${ltsConstraint}" ...`);

      Reflect.set(packageEngines, 'node', ltsConstraint);
    }

    // Check if "trackNodeLtsVersions" is enabled in the recipe settings.
    const recipes: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_Recipes = manifest['recipes'];
    const recipeTuple: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_RecipeTuple = (recipes !== undefined) ? recipes['sync-environment'] : undefined;
    const recipeSettings: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_RecipeSettings = (recipeTuple !== undefined && recipeTuple.length > 1) ? recipeTuple[1] : undefined;
    const trackNodeLtsVersions: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_TrackNodeLtsVersions = (recipeSettings !== undefined && recipeSettings['trackNodeLtsVersions'] === true);

    // Warn if "engines.node" does not cover all active LTS versions (only when trackNodeLtsVersions is enabled).
    if (
      trackNodeLtsVersions === true // Workspace has opted into LTS engine tracking.
      && isPlainObject(fileContents['engines']) === true // Package "engines" is an object.
      && typeof fileContents['engines']['node'] === 'string' // Package "engines.node" is a string.
      && ltsConstraint !== undefined // LTS constraint is available.
    ) {
      const existingNode: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_ExistingNode = fileContents['engines']['node'];
      const ltsMatches: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_LtsMatches = [...ltsConstraint.matchAll(new RegExp(LIB_REGEX_PATTERN_DIGITS.source, 'g'))];

      if (ltsMatches.length > 0) {
        const ltsMajors: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_LtsMajors = ltsMatches.map((ltsMatch) => {
          return parseInt(ltsMatch[0], 10);
        });

        const branches: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_Branches = existingNode.split('||').map((branch) => branch.trim());

        // Check if every active LTS major is covered by at least one branch.
        const coversAll: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_CoversAll = ltsMajors.every((ltsMajor) => {
          return branches.some((branch) => {
            // Wildcard: covers everything.
            if (branch === '*') {
              return true;
            }

            // >=N pattern: covers major if N <= major.
            const geMatch: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_GeMatch = branch.match(LIB_REGEX_PATTERN_RANGE_GREATER_EQUAL_MAJOR);

            if (geMatch !== null) {
              return parseInt(geMatch[1] ?? '', 10) <= ltsMajor;
            }

            // ^N, ~N, or N.x pattern: covers major if N === major.
            const majorMatch: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_MajorMatch = branch.match(LIB_REGEX_PATTERN_RANGE_MAJOR);

            if (majorMatch !== null) {
              return parseInt(majorMatch[1] ?? '', 10) === ltsMajor;
            }

            return false;
          });
        });

        if (coversAll !== true) {
          Logger.customize({
            name: 'Runner.handle',
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
      Runner.syncNodeConstraint(workspace, ltsConstraint);
    }

    // Sync the "os" field (Conditional).
    if (
      packageOs !== undefined // Package "os" is defined.
      && Runner.isEmpty(packageOs) === true // Package "os" is empty.
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'os',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "os" ...`);

      Reflect.deleteProperty(fileContents, 'os');
    }

    // Sync the "cpu" field (Conditional).
    if (
      packageCpu !== undefined // Package "cpu" is defined.
      && Runner.isEmpty(packageCpu) === true // Package "cpu" is empty.
    ) {
      Logger.customize({
        name: 'Runner.handle',
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
        name: 'Runner.handle',
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
        name: 'Runner.handle',
        purpose: 'libc',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Adding "libc" as "glibc" ...`);

      Reflect.set(fileContents, 'libc', ['glibc']);
    }

    // Sync the "devEngines" field (Conditional).
    if (
      packageDevEngines !== undefined // Package "devEngines" is defined.
      && Runner.isEmpty(packageDevEngines) === true // Package "devEngines" is empty.
    ) {
      Logger.customize({
        name: 'Runner.handle',
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
   * @param {Cli_Recipe_PackageJson_SyncEnvironment_Runner_HandleCorepack_Workspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_SyncEnvironment_Runner_HandleCorepack_Returns}
   *
   * @since 0.14.0
   */
  private static handleCorepack(workspace: Cli_Recipe_PackageJson_SyncEnvironment_Runner_HandleCorepack_Workspace): Cli_Recipe_PackageJson_SyncEnvironment_Runner_HandleCorepack_Returns {
    const fileContents: Cli_Recipe_PackageJson_SyncEnvironment_Runner_HandleCorepack_FileContents = workspace['fileContents'];
    const manifest: Cli_Recipe_PackageJson_SyncEnvironment_Runner_HandleCorepack_Manifest = workspace['manifest'];

    const packageManager: Cli_Recipe_PackageJson_SyncEnvironment_Runner_HandleCorepack_PackageManager = fileContents['packageManager'];

    // Sync the "packageManager" field.
    if (
      packageManager !== undefined // Package "packageManager" is defined.
      && manifest['role'] !== 'project' // Workspace role is not "project".
    ) {
      Logger.customize({
        name: 'Runner.handleCorepack',
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
        name: 'Runner.handleCorepack',
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
   * @param {Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_Workspace}  workspace  - Workspace.
   * @param {Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_Constraint} constraint - Constraint.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_Returns}
   *
   * @since 0.14.0
   */
  private static syncNodeConstraint(workspace: Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_Workspace, constraint: Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_Constraint): Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_Returns {
    const engines: Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_Engines = workspace['fileContents']['engines'];

    // If "engines" does not exist, create it with the constraint.
    if (engines === undefined) {
      Reflect.set(workspace['fileContents'], 'engines', { node: constraint });

      Logger.customize({
        name: 'Runner.syncNodeConstraint',
        purpose: 'engines',
      }).info(`${chalk.magenta(`"${workspace['manifest']['name']}" workspace`)} → Created "engines.node" with "${constraint}".`);

      return;
    }

    // If "engines" exists but is not a plain object, warn and skip.
    if (isPlainObject(engines) === false) {
      Logger.customize({
        name: 'Runner.syncNodeConstraint',
        purpose: 'engines',
      }).warn(`${chalk.magenta(`"${workspace['manifest']['name']}" workspace`)} → "engines" is not a plain object. Skipping.`);

      return;
    }

    const currentNode: Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_CurrentNode = engines['node'];

    // If "engines.node" already matches the constraint, skip.
    if (currentNode === constraint) {
      Logger.customize({
        name: 'Runner.syncNodeConstraint',
        purpose: 'engines',
      }).info(`${chalk.magenta(`"${workspace['manifest']['name']}" workspace`)} → "engines.node" is already up to date.`);

      return;
    }

    // Update "engines.node" to the constraint.
    Reflect.set(engines, 'node', constraint);

    const previous: Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_Previous = (typeof currentNode === 'string') ? currentNode : String(currentNode ?? 'undefined');

    Logger.customize({
      name: 'Runner.syncNodeConstraint',
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
   * @param {Cli_Recipe_PackageJson_SyncEnvironment_Runner_IsEmpty_Value} value - Value.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_SyncEnvironment_Runner_IsEmpty_Returns}
   *
   * @since 0.14.0
   */
  private static isEmpty(value: Cli_Recipe_PackageJson_SyncEnvironment_Runner_IsEmpty_Value): Cli_Recipe_PackageJson_SyncEnvironment_Runner_IsEmpty_Returns {
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
