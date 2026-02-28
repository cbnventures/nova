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
  CLIRecipePinVersionsPinDependenciesReturns,
  CLIRecipePinVersionsPinDependenciesWorkspace,
  CLIRecipePinVersionsRunOptions,
  CLIRecipePinVersionsRunReturns,
  CLIRecipePinVersionsStripPrefixReturns,
  CLIRecipePinVersionsStripPrefixVersion,
} from '@/types/cli/recipe/pin-versions.d.ts';

/**
 * CLI Recipe - Pin Versions.
 *
 * @since 1.0.0
 */
export class CLIRecipePinVersions {
  /**
   * CLI Recipe - Pin Versions - Run.
   *
   * @param {CLIRecipePinVersionsRunOptions} options - Options.
   *
   * @returns {CLIRecipePinVersionsRunReturns}
   *
   * @since 1.0.0
   */
  public static async run(options: CLIRecipePinVersionsRunOptions): CLIRecipePinVersionsRunReturns {
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
        name: 'CLIRecipePinVersions.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice = (isDryRun) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CLIRecipePinVersions.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const novaConfig = new NovaConfig();
    const workingFile = await novaConfig.load();
    const workingFileWorkspaces = Object.entries(workingFile.workspaces ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePinVersions.run',
        purpose: 'workspaces',
      }).warn('Skipping version pinning. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have version pinning enabled.
    const eligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig = workspace[1];

      return workspaceConfig.pinVersions === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePinVersions.run',
        purpose: 'workspaces',
      }).warn('Skipping version pinning. No workspaces have "pinVersions" enabled in the "nova.config.json" file.');

      return;
    }

    const workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePinVersions.run',
        purpose: 'workspaces',
      }).warn('Skipping version pinning. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CLIRecipePinVersions.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for version pinning.`);

    let hasUnpinnable = false;

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'CLIRecipePinVersions.run',
        purpose: 'iteration',
      }).info(`Pinning versions for the "${workspace.manifest.name}" workspace ...`);

      const count = CLIRecipePinVersions.pinDependencies(workspace);

      if (count < 0) {
        hasUnpinnable = true;
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
   * CLI Recipe - Pin Versions - Pin dependencies.
   *
   * @param {CLIRecipePinVersionsPinDependenciesWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipePinVersionsPinDependenciesReturns}
   *
   * @since 1.0.0
   */
  private static pinDependencies(workspace: CLIRecipePinVersionsPinDependenciesWorkspace): CLIRecipePinVersionsPinDependenciesReturns {
    const depGroups = [
      'dependencies',
      'devDependencies',
    ];

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

        const stripped = CLIRecipePinVersions.stripPrefix(depVersion);

        // Unpinnable version (e.g. "*" or "latest").
        if (stripped === undefined) {
          Logger.customize({
            name: 'CLIRecipePinVersions.pinDependencies',
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
          name: 'CLIRecipePinVersions.pinDependencies',
          purpose: depGroup,
        }).info(`${chalk.magenta(`"${workspace.manifest.name}" workspace`)} → Pinned "${depName}" from "${depVersion}" to "${stripped}".`);

        pinned += 1;
      }
    }

    if (pinned === 0 && unpinnable === 0) {
      Logger.customize({
        name: 'CLIRecipePinVersions.pinDependencies',
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
   * CLI Recipe - Pin Versions - Strip prefix.
   *
   * @param {CLIRecipePinVersionsStripPrefixVersion} version - Version.
   *
   * @private
   *
   * @returns {CLIRecipePinVersionsStripPrefixReturns}
   *
   * @since 1.0.0
   */
  private static stripPrefix(version: CLIRecipePinVersionsStripPrefixVersion): CLIRecipePinVersionsStripPrefixReturns {
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
}
