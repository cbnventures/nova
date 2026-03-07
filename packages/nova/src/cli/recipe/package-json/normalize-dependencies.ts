import chalk from 'chalk';

import { NovaConfig } from '@/lib/nova-config.js';
import { PATTERN_RANGE_CAPTURE_REMAINDER } from '@/lib/regex.js';
import {
  isPlainObject,
  isProjectRoot,
  loadWorkspaceManifests,
  saveWorkspaceManifest,
} from '@/lib/utility.js';
import { Logger } from '@/toolkit/index.js';

import type {
  CLIRecipePackageJsonNormalizeDependenciesHandleReturns,
  CLIRecipePackageJsonNormalizeDependenciesHandleWorkspace,
  CLIRecipePackageJsonNormalizeDependenciesIsEmptyReturns,
  CLIRecipePackageJsonNormalizeDependenciesIsEmptyValue,
  CLIRecipePackageJsonNormalizeDependenciesPinDependenciesDepGroups,
  CLIRecipePackageJsonNormalizeDependenciesPinDependenciesPinDependencyVersions,
  CLIRecipePackageJsonNormalizeDependenciesPinDependenciesPinDevDependencyVersions,
  CLIRecipePackageJsonNormalizeDependenciesPinDependenciesReturns,
  CLIRecipePackageJsonNormalizeDependenciesPinDependenciesWorkspace,
  CLIRecipePackageJsonNormalizeDependenciesRunOptions,
  CLIRecipePackageJsonNormalizeDependenciesRunReturns,
  CLIRecipePackageJsonNormalizeDependenciesStripPrefixReturns,
  CLIRecipePackageJsonNormalizeDependenciesStripPrefixVersion,
} from '@/types/cli/recipe/package-json/normalize-dependencies.d.ts';

/**
 * CLI Recipe - package.json - Normalize Dependencies.
 *
 * @since 1.0.0
 */
export class CLIRecipePackageJsonNormalizeDependencies {
  /**
   * CLI Recipe - package.json - Normalize Dependencies - Run.
   *
   * @param {CLIRecipePackageJsonNormalizeDependenciesRunOptions} options - Options.
   *
   * @returns {CLIRecipePackageJsonNormalizeDependenciesRunReturns}
   *
   * @since 1.0.0
   */
  public static async run(options: CLIRecipePackageJsonNormalizeDependenciesRunOptions): CLIRecipePackageJsonNormalizeDependenciesRunReturns {
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
        name: 'CLIRecipePackageJsonNormalizeDependencies.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice = (isDryRun) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeDependencies.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const novaConfig = new NovaConfig();
    const workingFile = await novaConfig.load();
    const workingFileWorkspaces = Object.entries(workingFile.workspaces ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeDependencies.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-dependencies. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig = workspace[1];
      const workspaceRecipes = workspaceConfig.recipes;

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple = workspaceRecipes['normalize-dependencies'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeDependencies.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-dependencies. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeDependencies.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-dependencies. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CLIRecipePackageJsonNormalizeDependencies.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for normalize-dependencies.`);

    let hasUnpinnable = false;

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeDependencies.run',
        purpose: 'iteration',
      }).info(`Running normalize-dependencies for the "${workspace.manifest.name}" workspace ...`);

      await CLIRecipePackageJsonNormalizeDependencies.handle(workspace);

      // Check if version pinning is enabled in the recipe settings.
      const recipes = workspace.manifest.recipes;
      const recipeTuple = (recipes !== undefined) ? recipes['normalize-dependencies'] : undefined;
      const recipeSettings = (recipeTuple !== undefined && recipeTuple.length > 1) ? recipeTuple[1] : undefined;
      const pinDependencyVersions = (recipeSettings !== undefined && recipeSettings['pinDependencyVersions'] === true);
      const pinDevDependencyVersions = (recipeSettings !== undefined && recipeSettings['pinDevDependencyVersions'] === true);

      if (pinDependencyVersions === true || pinDevDependencyVersions === true) {
        const count = CLIRecipePackageJsonNormalizeDependencies.pinDependencies(workspace, pinDependencyVersions, pinDevDependencyVersions);

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
  }

  /**
   * CLI Recipe - package.json - Normalize Dependencies - Handle.
   *
   * @param {CLIRecipePackageJsonNormalizeDependenciesHandleWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonNormalizeDependenciesHandleReturns}
   *
   * @since 1.0.0
   */
  private static async handle(workspace: CLIRecipePackageJsonNormalizeDependenciesHandleWorkspace): CLIRecipePackageJsonNormalizeDependenciesHandleReturns {
    const fileContents = workspace.fileContents;
    const manifest = workspace.manifest;

    const packageDependencies = fileContents['dependencies'];
    const packageDevDependencies = fileContents['devDependencies'];
    const packagePeerDependencies = fileContents['peerDependencies'];
    const packagePeerDependenciesMeta = fileContents['peerDependenciesMeta'];
    const packageBundleDependencies = fileContents['bundleDependencies'];
    const packageBundledDependencies = fileContents['bundledDependencies'];
    const packageOptionalDependencies = fileContents['optionalDependencies'];
    const packageOverrides = fileContents['overrides'];

    // Sync the "dependencies" field (Conditional).
    if (
      packageDependencies !== undefined // Package "dependencies" is defined.
      && CLIRecipePackageJsonNormalizeDependencies.isEmpty(packageDependencies) // Package "dependencies" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeDependencies.handle',
        purpose: 'dependencies',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "dependencies" ...`);

      Reflect.deleteProperty(fileContents, 'dependencies');
    }

    // Sync the "devDependencies" field (Conditional).
    if (
      packageDevDependencies !== undefined // Package "devDependencies" is defined.
      && CLIRecipePackageJsonNormalizeDependencies.isEmpty(packageDevDependencies) // Package "devDependencies" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeDependencies.handle',
        purpose: 'devDependencies',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "devDependencies" ...`);

      Reflect.deleteProperty(fileContents, 'devDependencies');
    }

    // Sync the "peerDependencies" field (Conditional).
    if (
      packagePeerDependencies !== undefined // Package "peerDependencies" is defined.
      && CLIRecipePackageJsonNormalizeDependencies.isEmpty(packagePeerDependencies) // Package "peerDependencies" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeDependencies.handle',
        purpose: 'peerDependencies',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "peerDependencies" ...`);

      Reflect.deleteProperty(fileContents, 'peerDependencies');
    }

    // Sync the "peerDependenciesMeta" field (Conditional).
    if (
      packagePeerDependenciesMeta !== undefined // Package "peerDependenciesMeta" is defined.
      && CLIRecipePackageJsonNormalizeDependencies.isEmpty(packagePeerDependenciesMeta) // Package "peerDependenciesMeta" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeDependencies.handle',
        purpose: 'peerDependenciesMeta',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "peerDependenciesMeta" ...`);

      Reflect.deleteProperty(fileContents, 'peerDependenciesMeta');
    }

    // Sync the "bundledDependencies" → "bundleDependencies" merge.
    if (
      packageBundledDependencies !== undefined // Package "bundledDependencies" is defined.
    ) {
      const bundleDependencies = Array.isArray(packageBundleDependencies) ? packageBundleDependencies : [];
      const bundledDependencies = Array.isArray(packageBundledDependencies) ? packageBundledDependencies : [];
      const mergedBundleDependencies = [...new Set([...bundleDependencies, ...bundledDependencies])];

      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeDependencies.handle',
        purpose: 'bundleDependencies',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Merging "bundledDependencies" into "bundleDependencies" ...`);

      Reflect.set(fileContents, 'bundleDependencies', mergedBundleDependencies);

      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeDependencies.handle',
        purpose: 'bundledDependencies',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "bundledDependencies". "bundledDependencies" is an alias of "bundleDependencies".`);

      Reflect.deleteProperty(fileContents, 'bundledDependencies');
    }

    // Sync the "bundleDependencies" field (Conditional).
    if (
      fileContents['bundleDependencies'] !== undefined // Package "bundleDependencies" is defined.
      && CLIRecipePackageJsonNormalizeDependencies.isEmpty(fileContents['bundleDependencies']) // Package "bundleDependencies" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeDependencies.handle',
        purpose: 'bundleDependencies',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "bundleDependencies" ...`);

      Reflect.deleteProperty(fileContents, 'bundleDependencies');
    }

    // Sync the "optionalDependencies" field (Conditional).
    if (
      packageOptionalDependencies !== undefined // Package "optionalDependencies" is defined.
      && CLIRecipePackageJsonNormalizeDependencies.isEmpty(packageOptionalDependencies) // Package "optionalDependencies" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeDependencies.handle',
        purpose: 'optionalDependencies',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "optionalDependencies" ...`);

      Reflect.deleteProperty(fileContents, 'optionalDependencies');
    }

    // Sync the "overrides" field (Conditional).
    if (
      packageOverrides !== undefined // Package "overrides" is defined.
      && CLIRecipePackageJsonNormalizeDependencies.isEmpty(packageOverrides) // Package "overrides" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeDependencies.handle',
        purpose: 'overrides',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "overrides" ...`);

      Reflect.deleteProperty(fileContents, 'overrides');
    }
  }

  /**
   * CLI Recipe - package.json - Normalize Dependencies - Pin dependencies.
   *
   * @param {CLIRecipePackageJsonNormalizeDependenciesPinDependenciesWorkspace}                workspace                - Workspace.
   * @param {CLIRecipePackageJsonNormalizeDependenciesPinDependenciesPinDependencyVersions}    pinDependencyVersions    - Pin dependency versions.
   * @param {CLIRecipePackageJsonNormalizeDependenciesPinDependenciesPinDevDependencyVersions} pinDevDependencyVersions - Pin dev dependency versions.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonNormalizeDependenciesPinDependenciesReturns}
   *
   * @since 1.0.0
   */
  private static pinDependencies(workspace: CLIRecipePackageJsonNormalizeDependenciesPinDependenciesWorkspace, pinDependencyVersions: CLIRecipePackageJsonNormalizeDependenciesPinDependenciesPinDependencyVersions, pinDevDependencyVersions: CLIRecipePackageJsonNormalizeDependenciesPinDependenciesPinDevDependencyVersions): CLIRecipePackageJsonNormalizeDependenciesPinDependenciesReturns {
    const depGroups: CLIRecipePackageJsonNormalizeDependenciesPinDependenciesDepGroups = [];

    if (pinDependencyVersions === true) {
      depGroups.push('dependencies');
    }

    if (pinDevDependencyVersions === true) {
      depGroups.push('devDependencies');
    }

    let pinned = 0;
    let unpinnable = 0;

    for (const depGroup of depGroups) {
      const deps = workspace.fileContents[depGroup];

      if (!isPlainObject(deps)) {
        continue;
      }

      for (const [depName, depVersion] of Object.entries(deps)) {
        if (typeof depVersion !== 'string') {
          continue;
        }

        const stripped = CLIRecipePackageJsonNormalizeDependencies.stripPrefix(depVersion);

        // Unpinnable version (e.g. "*" or "latest").
        if (stripped === undefined) {
          Logger.customize({
            name: 'CLIRecipePackageJsonNormalizeDependencies.pinDependencies',
            purpose: depGroup,
          }).error(`${chalk.magenta(`"${workspace.manifest.name}" workspace`)} → "${depName}" has unpinnable version "${depVersion}".`);

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
          name: 'CLIRecipePackageJsonNormalizeDependencies.pinDependencies',
          purpose: depGroup,
        }).info(`${chalk.magenta(`"${workspace.manifest.name}" workspace`)} → Pinned "${depName}" from "${depVersion}" to "${stripped}".`);

        pinned += 1;
      }
    }

    if (pinned === 0 && unpinnable === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeDependencies.pinDependencies',
        purpose: 'summary',
      }).info(`${chalk.magenta(`"${workspace.manifest.name}" workspace`)} → All versions are already pinned.`);
    }

    // Return negative if there were unpinnable versions.
    if (unpinnable > 0) {
      return -unpinnable;
    }

    return pinned;
  }

  /**
   * CLI Recipe - package.json - Normalize Dependencies - Strip prefix.
   *
   * @param {CLIRecipePackageJsonNormalizeDependenciesStripPrefixVersion} version - Version.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonNormalizeDependenciesStripPrefixReturns}
   *
   * @since 1.0.0
   */
  private static stripPrefix(version: CLIRecipePackageJsonNormalizeDependenciesStripPrefixVersion): CLIRecipePackageJsonNormalizeDependenciesStripPrefixReturns {
    // Local file references are always valid.
    if (version.startsWith('file:')) {
      return version;
    }

    // Wildcard and "latest" are unpinnable.
    if (version === '*' || version === 'latest') {
      return undefined;
    }

    // Strip range prefix if present.
    const match = version.match(PATTERN_RANGE_CAPTURE_REMAINDER);

    if (match !== null && match[1] !== undefined) {
      return match[1];
    }

    // Already pinned (starts with a digit or is some other format).
    return version;
  }

  /**
   * CLI Recipe - package.json - Normalize Dependencies - Is empty.
   *
   * @param {CLIRecipePackageJsonNormalizeDependenciesIsEmptyValue} value - Value.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonNormalizeDependenciesIsEmptyReturns}
   *
   * @since 1.0.0
   */
  private static isEmpty(value: CLIRecipePackageJsonNormalizeDependenciesIsEmptyValue): CLIRecipePackageJsonNormalizeDependenciesIsEmptyReturns {
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
