import chalk from 'chalk';

import { LibNovaConfig } from '../../../lib/nova-config.js';
import { LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER } from '../../../lib/regex.js';
import {
  isPlainObject,
  isProjectRoot,
  loadWorkspaceManifests,
  saveWorkspaceManifest,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  CliRecipePackageJsonNormalizeDependenciesHandleBundledDependencies,
  CliRecipePackageJsonNormalizeDependenciesHandleBundleDependencies,
  CliRecipePackageJsonNormalizeDependenciesHandleFileContents,
  CliRecipePackageJsonNormalizeDependenciesHandleManifest,
  CliRecipePackageJsonNormalizeDependenciesHandleMergedBundleDependencies,
  CliRecipePackageJsonNormalizeDependenciesHandlePackageBundledDependencies,
  CliRecipePackageJsonNormalizeDependenciesHandlePackageBundleDependencies,
  CliRecipePackageJsonNormalizeDependenciesHandlePackageDependencies,
  CliRecipePackageJsonNormalizeDependenciesHandlePackageDevDependencies,
  CliRecipePackageJsonNormalizeDependenciesHandlePackageOptionalDependencies,
  CliRecipePackageJsonNormalizeDependenciesHandlePackageOverrides,
  CliRecipePackageJsonNormalizeDependenciesHandlePackagePeerDependencies,
  CliRecipePackageJsonNormalizeDependenciesHandlePackagePeerDependenciesMeta,
  CliRecipePackageJsonNormalizeDependenciesHandleReturns,
  CliRecipePackageJsonNormalizeDependenciesHandleWorkspace,
  CliRecipePackageJsonNormalizeDependenciesIsEmptyReturns,
  CliRecipePackageJsonNormalizeDependenciesIsEmptyValue,
  CliRecipePackageJsonNormalizeDependenciesPinDependenciesDepGroups,
  CliRecipePackageJsonNormalizeDependenciesPinDependenciesDepName,
  CliRecipePackageJsonNormalizeDependenciesPinDependenciesDeps,
  CliRecipePackageJsonNormalizeDependenciesPinDependenciesDepVersion,
  CliRecipePackageJsonNormalizeDependenciesPinDependenciesPinDependencyVersions,
  CliRecipePackageJsonNormalizeDependenciesPinDependenciesPinDevDependencyVersions,
  CliRecipePackageJsonNormalizeDependenciesPinDependenciesPinned,
  CliRecipePackageJsonNormalizeDependenciesPinDependenciesReturns,
  CliRecipePackageJsonNormalizeDependenciesPinDependenciesStripped,
  CliRecipePackageJsonNormalizeDependenciesPinDependenciesUnpinnable,
  CliRecipePackageJsonNormalizeDependenciesPinDependenciesWorkspace,
  CliRecipePackageJsonNormalizeDependenciesRunCount,
  CliRecipePackageJsonNormalizeDependenciesRunCurrentDirectory,
  CliRecipePackageJsonNormalizeDependenciesRunEligibleWorkspaces,
  CliRecipePackageJsonNormalizeDependenciesRunHasUnpinnable,
  CliRecipePackageJsonNormalizeDependenciesRunIsAtProjectRoot,
  CliRecipePackageJsonNormalizeDependenciesRunIsDryRun,
  CliRecipePackageJsonNormalizeDependenciesRunIsReplaceFile,
  CliRecipePackageJsonNormalizeDependenciesRunOptions,
  CliRecipePackageJsonNormalizeDependenciesRunPinDependencyVersions,
  CliRecipePackageJsonNormalizeDependenciesRunPinDevDependencyVersions,
  CliRecipePackageJsonNormalizeDependenciesRunRecipes,
  CliRecipePackageJsonNormalizeDependenciesRunRecipeSettings,
  CliRecipePackageJsonNormalizeDependenciesRunRecipeTuple,
  CliRecipePackageJsonNormalizeDependenciesRunRecipeTupleFilter,
  CliRecipePackageJsonNormalizeDependenciesRunReplaceFileNotice,
  CliRecipePackageJsonNormalizeDependenciesRunReturns,
  CliRecipePackageJsonNormalizeDependenciesRunWorkingFile,
  CliRecipePackageJsonNormalizeDependenciesRunWorkingFileWorkspaces,
  CliRecipePackageJsonNormalizeDependenciesRunWorkspaceConfigFilter,
  CliRecipePackageJsonNormalizeDependenciesRunWorkspaceRecipesFilter,
  CliRecipePackageJsonNormalizeDependenciesRunWorkspaces,
  CliRecipePackageJsonNormalizeDependenciesStripPrefixMatch,
  CliRecipePackageJsonNormalizeDependenciesStripPrefixReturns,
  CliRecipePackageJsonNormalizeDependenciesStripPrefixVersion,
} from '../../../types/cli/recipe/package-json/normalize-dependencies.d.ts';

/**
 * CLI - Recipe - package.json - Normalize Dependencies.
 *
 * Cleans up dependency fields by removing empty groups, merging bundledDependencies into
 * bundleDependencies, and optionally pinning version ranges.
 *
 * @since 0.14.0
 */
export class CliRecipePackageJsonNormalizeDependencies {
  /**
   * CLI - Recipe - package.json - Normalize Dependencies - Run.
   *
   * Loads nova.config.json, filters eligible workspaces, then normalizes dependency fields and
   * pins versions when configured. Sets exit code.
   *
   * @param {CliRecipePackageJsonNormalizeDependenciesRunOptions} options - Options.
   *
   * @returns {CliRecipePackageJsonNormalizeDependenciesRunReturns}
   *
   * @since 0.14.0
   */
  public static async run(options: CliRecipePackageJsonNormalizeDependenciesRunOptions): CliRecipePackageJsonNormalizeDependenciesRunReturns {
    const currentDirectory: CliRecipePackageJsonNormalizeDependenciesRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliRecipePackageJsonNormalizeDependenciesRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: CliRecipePackageJsonNormalizeDependenciesRunIsDryRun = options['dryRun'] === true;
    const isReplaceFile: CliRecipePackageJsonNormalizeDependenciesRunIsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeDependencies.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: CliRecipePackageJsonNormalizeDependenciesRunReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeDependencies.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: CliRecipePackageJsonNormalizeDependenciesRunWorkingFile = await new LibNovaConfig().load();
    const workingFileWorkspaces: CliRecipePackageJsonNormalizeDependenciesRunWorkingFileWorkspaces = Object.entries(workingFile['workspaces'] ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeDependencies.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-dependencies. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces: CliRecipePackageJsonNormalizeDependenciesRunEligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig: CliRecipePackageJsonNormalizeDependenciesRunWorkspaceConfigFilter = workspace[1];
      const workspaceRecipes: CliRecipePackageJsonNormalizeDependenciesRunWorkspaceRecipesFilter = workspaceConfig['recipes'];

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple: CliRecipePackageJsonNormalizeDependenciesRunRecipeTupleFilter = workspaceRecipes['normalize-dependencies'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeDependencies.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-dependencies. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces: CliRecipePackageJsonNormalizeDependenciesRunWorkspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeDependencies.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-dependencies. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CliRecipePackageJsonNormalizeDependencies.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for normalize-dependencies.`);

    let hasUnpinnable: CliRecipePackageJsonNormalizeDependenciesRunHasUnpinnable = false;

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeDependencies.run',
        purpose: 'iteration',
      }).info(`Running normalize-dependencies for the "${workspace['manifest']['name']}" workspace ...`);

      await CliRecipePackageJsonNormalizeDependencies.handle(workspace);

      // Check if version pinning is enabled in the recipe settings.
      const recipes: CliRecipePackageJsonNormalizeDependenciesRunRecipes = workspace['manifest']['recipes'];
      const recipeTuple: CliRecipePackageJsonNormalizeDependenciesRunRecipeTuple = (recipes !== undefined) ? recipes['normalize-dependencies'] : undefined;
      const recipeSettings: CliRecipePackageJsonNormalizeDependenciesRunRecipeSettings = (recipeTuple !== undefined && recipeTuple.length > 1) ? recipeTuple[1] : undefined;
      const pinDependencyVersions: CliRecipePackageJsonNormalizeDependenciesRunPinDependencyVersions = (recipeSettings !== undefined && recipeSettings['pinDependencyVersions'] === true);
      const pinDevDependencyVersions: CliRecipePackageJsonNormalizeDependenciesRunPinDevDependencyVersions = (recipeSettings !== undefined && recipeSettings['pinDevDependencyVersions'] === true);

      if (pinDependencyVersions === true || pinDevDependencyVersions === true) {
        const count: CliRecipePackageJsonNormalizeDependenciesRunCount = CliRecipePackageJsonNormalizeDependencies.pinDependencies(workspace, pinDependencyVersions, pinDevDependencyVersions);

        if (count < 0) {
          hasUnpinnable = true;
        }
      }

      if (isDryRun === true) {
        continue;
      }

      await saveWorkspaceManifest(workspace, isReplaceFile);
    }

    if (hasUnpinnable === true) {
      process.exitCode = 1;
    }

    return;
  }

  /**
   * CLI - Recipe - package.json - Normalize Dependencies - Handle.
   *
   * Removes empty dependency groups, merges the legacy bundledDependencies alias into
   * bundleDependencies, and cleans up empty overrides for one workspace.
   *
   * @param {CliRecipePackageJsonNormalizeDependenciesHandleWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CliRecipePackageJsonNormalizeDependenciesHandleReturns}
   *
   * @since 0.14.0
   */
  private static async handle(workspace: CliRecipePackageJsonNormalizeDependenciesHandleWorkspace): CliRecipePackageJsonNormalizeDependenciesHandleReturns {
    const fileContents: CliRecipePackageJsonNormalizeDependenciesHandleFileContents = workspace['fileContents'];
    const manifest: CliRecipePackageJsonNormalizeDependenciesHandleManifest = workspace['manifest'];

    const packageDependencies: CliRecipePackageJsonNormalizeDependenciesHandlePackageDependencies = fileContents['dependencies'];
    const packageDevDependencies: CliRecipePackageJsonNormalizeDependenciesHandlePackageDevDependencies = fileContents['devDependencies'];
    const packagePeerDependencies: CliRecipePackageJsonNormalizeDependenciesHandlePackagePeerDependencies = fileContents['peerDependencies'];
    const packagePeerDependenciesMeta: CliRecipePackageJsonNormalizeDependenciesHandlePackagePeerDependenciesMeta = fileContents['peerDependenciesMeta'];
    const packageBundleDependencies: CliRecipePackageJsonNormalizeDependenciesHandlePackageBundleDependencies = fileContents['bundleDependencies'];
    const packageBundledDependencies: CliRecipePackageJsonNormalizeDependenciesHandlePackageBundledDependencies = fileContents['bundledDependencies'];
    const packageOptionalDependencies: CliRecipePackageJsonNormalizeDependenciesHandlePackageOptionalDependencies = fileContents['optionalDependencies'];
    const packageOverrides: CliRecipePackageJsonNormalizeDependenciesHandlePackageOverrides = fileContents['overrides'];

    // Sync the "dependencies" field (Conditional).
    if (
      packageDependencies !== undefined // Package "dependencies" is defined.
      && CliRecipePackageJsonNormalizeDependencies.isEmpty(packageDependencies) === true // Package "dependencies" is empty.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeDependencies.handle',
        purpose: 'dependencies',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "dependencies" ...`);

      Reflect.deleteProperty(fileContents, 'dependencies');
    }

    // Sync the "devDependencies" field (Conditional).
    if (
      packageDevDependencies !== undefined // Package "devDependencies" is defined.
      && CliRecipePackageJsonNormalizeDependencies.isEmpty(packageDevDependencies) === true // Package "devDependencies" is empty.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeDependencies.handle',
        purpose: 'devDependencies',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "devDependencies" ...`);

      Reflect.deleteProperty(fileContents, 'devDependencies');
    }

    // Sync the "peerDependencies" field (Conditional).
    if (
      packagePeerDependencies !== undefined // Package "peerDependencies" is defined.
      && CliRecipePackageJsonNormalizeDependencies.isEmpty(packagePeerDependencies) === true // Package "peerDependencies" is empty.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeDependencies.handle',
        purpose: 'peerDependencies',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "peerDependencies" ...`);

      Reflect.deleteProperty(fileContents, 'peerDependencies');
    }

    // Sync the "peerDependenciesMeta" field (Conditional).
    if (
      packagePeerDependenciesMeta !== undefined // Package "peerDependenciesMeta" is defined.
      && CliRecipePackageJsonNormalizeDependencies.isEmpty(packagePeerDependenciesMeta) === true // Package "peerDependenciesMeta" is empty.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeDependencies.handle',
        purpose: 'peerDependenciesMeta',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "peerDependenciesMeta" ...`);

      Reflect.deleteProperty(fileContents, 'peerDependenciesMeta');
    }

    // Sync the "bundledDependencies" → "bundleDependencies" merge.
    if (
      packageBundledDependencies !== undefined // Package "bundledDependencies" is defined.
    ) {
      const bundleDependencies: CliRecipePackageJsonNormalizeDependenciesHandleBundleDependencies = (Array.isArray(packageBundleDependencies) === true) ? packageBundleDependencies : [];
      const bundledDependencies: CliRecipePackageJsonNormalizeDependenciesHandleBundledDependencies = (Array.isArray(packageBundledDependencies) === true) ? packageBundledDependencies : [];
      const mergedBundleDependencies: CliRecipePackageJsonNormalizeDependenciesHandleMergedBundleDependencies = [...new Set([
        ...bundleDependencies,
        ...bundledDependencies,
      ])];

      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeDependencies.handle',
        purpose: 'bundleDependencies',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Merging "bundledDependencies" into "bundleDependencies" ...`);

      Reflect.set(fileContents, 'bundleDependencies', mergedBundleDependencies);

      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeDependencies.handle',
        purpose: 'bundledDependencies',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "bundledDependencies". "bundledDependencies" is an alias of "bundleDependencies".`);

      Reflect.deleteProperty(fileContents, 'bundledDependencies');
    }

    // Sync the "bundleDependencies" field (Conditional).
    if (
      fileContents['bundleDependencies'] !== undefined // Package "bundleDependencies" is defined.
      && CliRecipePackageJsonNormalizeDependencies.isEmpty(fileContents['bundleDependencies']) === true // Package "bundleDependencies" is empty.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeDependencies.handle',
        purpose: 'bundleDependencies',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "bundleDependencies" ...`);

      Reflect.deleteProperty(fileContents, 'bundleDependencies');
    }

    // Sync the "optionalDependencies" field (Conditional).
    if (
      packageOptionalDependencies !== undefined // Package "optionalDependencies" is defined.
      && CliRecipePackageJsonNormalizeDependencies.isEmpty(packageOptionalDependencies) === true // Package "optionalDependencies" is empty.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeDependencies.handle',
        purpose: 'optionalDependencies',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "optionalDependencies" ...`);

      Reflect.deleteProperty(fileContents, 'optionalDependencies');
    }

    // Sync the "overrides" field (Conditional).
    if (
      packageOverrides !== undefined // Package "overrides" is defined.
      && CliRecipePackageJsonNormalizeDependencies.isEmpty(packageOverrides) === true // Package "overrides" is empty.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeDependencies.handle',
        purpose: 'overrides',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "overrides" ...`);

      Reflect.deleteProperty(fileContents, 'overrides');
    }

    return;
  }

  /**
   * CLI - Recipe - package.json - Normalize Dependencies - Pin Dependencies.
   *
   * Strips range prefixes like ^ and ~ from version strings in dependencies and
   * devDependencies. Returns a negative count when unpinnable.
   *
   * @param {CliRecipePackageJsonNormalizeDependenciesPinDependenciesWorkspace}                workspace                - Workspace.
   * @param {CliRecipePackageJsonNormalizeDependenciesPinDependenciesPinDependencyVersions}    pinDependencyVersions    - Pin dependency versions.
   * @param {CliRecipePackageJsonNormalizeDependenciesPinDependenciesPinDevDependencyVersions} pinDevDependencyVersions - Pin dev dependency versions.
   *
   * @private
   *
   * @returns {CliRecipePackageJsonNormalizeDependenciesPinDependenciesReturns}
   *
   * @since 0.14.0
   */
  private static pinDependencies(workspace: CliRecipePackageJsonNormalizeDependenciesPinDependenciesWorkspace, pinDependencyVersions: CliRecipePackageJsonNormalizeDependenciesPinDependenciesPinDependencyVersions, pinDevDependencyVersions: CliRecipePackageJsonNormalizeDependenciesPinDependenciesPinDevDependencyVersions): CliRecipePackageJsonNormalizeDependenciesPinDependenciesReturns {
    const depGroups: CliRecipePackageJsonNormalizeDependenciesPinDependenciesDepGroups = [];

    if (pinDependencyVersions === true) {
      depGroups.push('dependencies');
    }

    if (pinDevDependencyVersions === true) {
      depGroups.push('devDependencies');
    }

    let pinned: CliRecipePackageJsonNormalizeDependenciesPinDependenciesPinned = 0;
    let unpinnable: CliRecipePackageJsonNormalizeDependenciesPinDependenciesUnpinnable = 0;

    for (const depGroup of depGroups) {
      const deps: CliRecipePackageJsonNormalizeDependenciesPinDependenciesDeps = workspace['fileContents'][depGroup];

      if (isPlainObject(deps) === false) {
        continue;
      }

      for (const depEntry of Object.entries(deps)) {
        const depName: CliRecipePackageJsonNormalizeDependenciesPinDependenciesDepName = depEntry[0];
        const depVersion: CliRecipePackageJsonNormalizeDependenciesPinDependenciesDepVersion = depEntry[1];

        if (typeof depVersion !== 'string') {
          continue;
        }

        const stripped: CliRecipePackageJsonNormalizeDependenciesPinDependenciesStripped = CliRecipePackageJsonNormalizeDependencies.stripPrefix(depVersion);

        // Unpinnable version (e.g. "*" or "latest").
        if (stripped === undefined) {
          Logger.customize({
            name: 'CliRecipePackageJsonNormalizeDependencies.pinDependencies',
            purpose: depGroup,
          }).error(`${chalk.magenta(`"${workspace['manifest']['name']}" workspace`)} → "${depName}" has unpinnable version "${depVersion}".`);

          unpinnable += 1;

          continue;
        }

        // Version was already pinned or is a local reference.
        if (stripped === depVersion) {
          continue;
        }

        // Pin the version.
        Reflect.set(deps, depName, stripped);

        Logger.customize({
          name: 'CliRecipePackageJsonNormalizeDependencies.pinDependencies',
          purpose: depGroup,
        }).info(`${chalk.magenta(`"${workspace['manifest']['name']}" workspace`)} → Pinned "${depName}" from "${depVersion}" to "${stripped}".`);

        pinned += 1;
      }
    }

    if (pinned === 0 && unpinnable === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeDependencies.pinDependencies',
        purpose: 'summary',
      }).info(`${chalk.magenta(`"${workspace['manifest']['name']}" workspace`)} → All versions are already pinned.`);
    }

    // Return negative if there were unpinnable versions.
    if (unpinnable > 0) {
      return -unpinnable;
    }

    return pinned;
  }

  /**
   * CLI - Recipe - package.json - Normalize Dependencies - Strip Prefix.
   *
   * Removes the ^, ~, or >= range prefix from a semver string. Returns undefined for wildcard
   * and latest values that cannot be pinned.
   *
   * @param {CliRecipePackageJsonNormalizeDependenciesStripPrefixVersion} version - Version.
   *
   * @private
   *
   * @returns {CliRecipePackageJsonNormalizeDependenciesStripPrefixReturns}
   *
   * @since 0.14.0
   */
  private static stripPrefix(version: CliRecipePackageJsonNormalizeDependenciesStripPrefixVersion): CliRecipePackageJsonNormalizeDependenciesStripPrefixReturns {
    // Local file references are always valid.
    if (version.startsWith('file:') === true) {
      return version;
    }

    // Wildcard and "latest" are unpinnable.
    if (version === '*' || version === 'latest') {
      return undefined;
    }

    // Strip range prefix if present.
    const match: CliRecipePackageJsonNormalizeDependenciesStripPrefixMatch = version.match(LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    if (match !== null && match[1] !== undefined) {
      return match[1];
    }

    // Already pinned (starts with a digit or is some other format).
    return version;
  }

  /**
   * CLI - Recipe - package.json - Normalize Dependencies - Is Empty.
   *
   * Checks whether a value is null, undefined, a blank
   * string, an empty array, or an object with no keys.
   * Used by handle to decide when to remove fields.
   *
   * @param {CliRecipePackageJsonNormalizeDependenciesIsEmptyValue} value - Value.
   *
   * @private
   *
   * @returns {CliRecipePackageJsonNormalizeDependenciesIsEmptyReturns}
   *
   * @since 0.14.0
   */
  private static isEmpty(value: CliRecipePackageJsonNormalizeDependenciesIsEmptyValue): CliRecipePackageJsonNormalizeDependenciesIsEmptyReturns {
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
