import chalk from 'chalk';

import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import { LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER } from '../../../lib/regex.js';
import {
  isPlainObject,
  isProjectRoot,
  loadWorkspaceManifests,
  saveWorkspaceManifest,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_BundledDependencies,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_BundleDependencies,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_FileContents,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_Manifest,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_MergedBundleDependencies,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackageBundledDependencies,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackageBundleDependencies,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackageDependencies,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackageDevDependencies,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackageOptionalDependencies,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackageOverrides,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackagePeerDependencies,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackagePeerDependenciesMeta,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_Returns,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_Workspace,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_IsEmpty_Returns,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_IsEmpty_Value,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_DepGroups,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_DepName,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Deps,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_DepVersion,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_PinDependencyVersions,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_PinDevDependencyVersions,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Pinned,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Returns,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Stripped,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Unpinnable,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Workspace,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Count,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_CurrentDirectory,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_EligibleWorkspaces,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_HasUnpinnable,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_IsAtProjectRoot,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_IsDryRun,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_IsReplaceFile,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Options,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_PinDependencyVersions,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_PinDevDependencyVersions,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Recipes,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_RecipeSettings,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_RecipeTuple,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_RecipeTupleFilter,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_ReplaceFileNotice,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Returns,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_WorkingFile,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_WorkingFileWorkspaces,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_WorkspaceConfigFilter,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_WorkspaceRecipesFilter,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Workspaces,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_StripPrefix_Match,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_StripPrefix_Returns,
  Cli_Recipe_PackageJson_NormalizeDependencies_Runner_StripPrefix_Version,
} from '../../../types/cli/recipe/package-json/normalize-dependencies.d.ts';

/**
 * CLI - Recipe - package.json - Normalize Dependencies.
 *
 * Cleans up dependency fields by removing empty groups, merging bundledDependencies into
 * bundleDependencies, and optionally pinning version ranges.
 *
 * @since 0.14.0
 */
export class Runner {
  /**
   * CLI - Recipe - package.json - Normalize Dependencies - Run.
   *
   * Loads nova.config.json, filters eligible workspaces, then normalizes dependency fields and
   * pins versions when configured. Sets exit code.
   *
   * @param {Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Returns}
   *
   * @since 0.14.0
   */
  public static async run(options: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Options): Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Returns {
    const currentDirectory: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_WorkingFile = await new LibNovaConfig().load();
    const workingFileWorkspaces: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_WorkingFileWorkspaces = Object.entries(workingFile['workspaces'] ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-dependencies. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_EligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_WorkspaceConfigFilter = workspace[1];
      const workspaceRecipes: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_WorkspaceRecipesFilter = workspaceConfig['recipes'];

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_RecipeTupleFilter = workspaceRecipes['normalize-dependencies'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-dependencies. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-dependencies. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for normalize-dependencies.`);

    let hasUnpinnable: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_HasUnpinnable = false;

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'iteration',
      }).info(`Running normalize-dependencies for the "${workspace['manifest']['name']}" workspace ...`);

      await Runner.handle(workspace);

      // Check if version pinning is enabled in the recipe settings.
      const recipes: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Recipes = workspace['manifest']['recipes'];
      const recipeTuple: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_RecipeTuple = (recipes !== undefined) ? recipes['normalize-dependencies'] : undefined;
      const recipeSettings: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_RecipeSettings = (recipeTuple !== undefined && recipeTuple.length > 1) ? recipeTuple[1] : undefined;
      const pinDependencyVersions: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_PinDependencyVersions = (recipeSettings !== undefined && recipeSettings['pinDependencyVersions'] === true);
      const pinDevDependencyVersions: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_PinDevDependencyVersions = (recipeSettings !== undefined && recipeSettings['pinDevDependencyVersions'] === true);

      if (pinDependencyVersions === true || pinDevDependencyVersions === true) {
        const count: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Count = Runner.pinDependencies(workspace, pinDependencyVersions, pinDevDependencyVersions);

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
   * @param {Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_Workspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_Returns}
   *
   * @since 0.14.0
   */
  private static async handle(workspace: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_Workspace): Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_Returns {
    const fileContents: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_FileContents = workspace['fileContents'];
    const manifest: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_Manifest = workspace['manifest'];

    const packageDependencies: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackageDependencies = fileContents['dependencies'];
    const packageDevDependencies: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackageDevDependencies = fileContents['devDependencies'];
    const packagePeerDependencies: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackagePeerDependencies = fileContents['peerDependencies'];
    const packagePeerDependenciesMeta: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackagePeerDependenciesMeta = fileContents['peerDependenciesMeta'];
    const packageBundleDependencies: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackageBundleDependencies = fileContents['bundleDependencies'];
    const packageBundledDependencies: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackageBundledDependencies = fileContents['bundledDependencies'];
    const packageOptionalDependencies: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackageOptionalDependencies = fileContents['optionalDependencies'];
    const packageOverrides: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackageOverrides = fileContents['overrides'];

    // Sync the "dependencies" field (Conditional).
    if (
      packageDependencies !== undefined // Package "dependencies" is defined.
      && Runner.isEmpty(packageDependencies) === true // Package "dependencies" is empty.
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'dependencies',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "dependencies" ...`);

      Reflect.deleteProperty(fileContents, 'dependencies');
    }

    // Sync the "devDependencies" field (Conditional).
    if (
      packageDevDependencies !== undefined // Package "devDependencies" is defined.
      && Runner.isEmpty(packageDevDependencies) === true // Package "devDependencies" is empty.
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'devDependencies',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "devDependencies" ...`);

      Reflect.deleteProperty(fileContents, 'devDependencies');
    }

    // Sync the "peerDependencies" field (Conditional).
    if (
      packagePeerDependencies !== undefined // Package "peerDependencies" is defined.
      && Runner.isEmpty(packagePeerDependencies) === true // Package "peerDependencies" is empty.
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'peerDependencies',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "peerDependencies" ...`);

      Reflect.deleteProperty(fileContents, 'peerDependencies');
    }

    // Sync the "peerDependenciesMeta" field (Conditional).
    if (
      packagePeerDependenciesMeta !== undefined // Package "peerDependenciesMeta" is defined.
      && Runner.isEmpty(packagePeerDependenciesMeta) === true // Package "peerDependenciesMeta" is empty.
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'peerDependenciesMeta',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "peerDependenciesMeta" ...`);

      Reflect.deleteProperty(fileContents, 'peerDependenciesMeta');
    }

    // Sync the "bundledDependencies" -> "bundleDependencies" merge.
    if (
      packageBundledDependencies !== undefined // Package "bundledDependencies" is defined.
    ) {
      const bundleDependencies: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_BundleDependencies = (Array.isArray(packageBundleDependencies) === true) ? packageBundleDependencies : [];
      const bundledDependencies: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_BundledDependencies = (Array.isArray(packageBundledDependencies) === true) ? packageBundledDependencies : [];
      const mergedBundleDependencies: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_MergedBundleDependencies = [...new Set([
        ...bundleDependencies,
        ...bundledDependencies,
      ])];

      Logger.customize({
        name: 'Runner.handle',
        purpose: 'bundleDependencies',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Merging "bundledDependencies" into "bundleDependencies" ...`);

      Reflect.set(fileContents, 'bundleDependencies', mergedBundleDependencies);

      Logger.customize({
        name: 'Runner.handle',
        purpose: 'bundledDependencies',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "bundledDependencies". "bundledDependencies" is an alias of "bundleDependencies".`);

      Reflect.deleteProperty(fileContents, 'bundledDependencies');
    }

    // Sync the "bundleDependencies" field (Conditional).
    if (
      fileContents['bundleDependencies'] !== undefined // Package "bundleDependencies" is defined.
      && Runner.isEmpty(fileContents['bundleDependencies']) === true // Package "bundleDependencies" is empty.
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'bundleDependencies',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "bundleDependencies" ...`);

      Reflect.deleteProperty(fileContents, 'bundleDependencies');
    }

    // Sync the "optionalDependencies" field (Conditional).
    if (
      packageOptionalDependencies !== undefined // Package "optionalDependencies" is defined.
      && Runner.isEmpty(packageOptionalDependencies) === true // Package "optionalDependencies" is empty.
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'optionalDependencies',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "optionalDependencies" ...`);

      Reflect.deleteProperty(fileContents, 'optionalDependencies');
    }

    // Sync the "overrides" field (Conditional).
    if (
      packageOverrides !== undefined // Package "overrides" is defined.
      && Runner.isEmpty(packageOverrides) === true // Package "overrides" is empty.
    ) {
      Logger.customize({
        name: 'Runner.handle',
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
   * @param {Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Workspace}                workspace                - Workspace.
   * @param {Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_PinDependencyVersions}    pinDependencyVersions    - Pin dependency versions.
   * @param {Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_PinDevDependencyVersions} pinDevDependencyVersions - Pin dev dependency versions.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Returns}
   *
   * @since 0.14.0
   */
  private static pinDependencies(workspace: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Workspace, pinDependencyVersions: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_PinDependencyVersions, pinDevDependencyVersions: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_PinDevDependencyVersions): Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Returns {
    const depGroups: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_DepGroups = [];

    if (pinDependencyVersions === true) {
      depGroups.push('dependencies');
    }

    if (pinDevDependencyVersions === true) {
      depGroups.push('devDependencies');
    }

    let pinned: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Pinned = 0;
    let unpinnable: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Unpinnable = 0;

    for (const depGroup of depGroups) {
      const deps: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Deps = workspace['fileContents'][depGroup];

      if (isPlainObject(deps) === false) {
        continue;
      }

      for (const depEntry of Object.entries(deps)) {
        const depName: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_DepName = depEntry[0];
        const depVersion: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_DepVersion = depEntry[1];

        if (typeof depVersion !== 'string') {
          continue;
        }

        const stripped: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Stripped = Runner.stripPrefix(depVersion);

        // Unpinnable version (e.g. "*" or "latest").
        if (stripped === undefined) {
          Logger.customize({
            name: 'Runner.pinDependencies',
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
          name: 'Runner.pinDependencies',
          purpose: depGroup,
        }).info(`${chalk.magenta(`"${workspace['manifest']['name']}" workspace`)} → Pinned "${depName}" from "${depVersion}" to "${stripped}".`);

        pinned += 1;
      }
    }

    if (pinned === 0 && unpinnable === 0) {
      Logger.customize({
        name: 'Runner.pinDependencies',
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
   * @param {Cli_Recipe_PackageJson_NormalizeDependencies_Runner_StripPrefix_Version} version - Version.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_NormalizeDependencies_Runner_StripPrefix_Returns}
   *
   * @since 0.14.0
   */
  private static stripPrefix(version: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_StripPrefix_Version): Cli_Recipe_PackageJson_NormalizeDependencies_Runner_StripPrefix_Returns {
    // Local file references are always valid.
    if (version.startsWith('file:') === true) {
      return version;
    }

    // Wildcard and "latest" are unpinnable.
    if (version === '*' || version === 'latest') {
      return undefined;
    }

    // Strip range prefix if present.
    const match: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_StripPrefix_Match = version.match(LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

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
   * @param {Cli_Recipe_PackageJson_NormalizeDependencies_Runner_IsEmpty_Value} value - Value.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_NormalizeDependencies_Runner_IsEmpty_Returns}
   *
   * @since 0.14.0
   */
  private static isEmpty(value: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_IsEmpty_Value): Cli_Recipe_PackageJson_NormalizeDependencies_Runner_IsEmpty_Returns {
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
