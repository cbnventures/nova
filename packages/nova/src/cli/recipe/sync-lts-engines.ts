import chalk from 'chalk';

import { NodeReleases } from '@/api/node-releases.js';
import { NovaConfig } from '@/lib/nova-config.js';
import {
  isPlainObject,
  isProjectRoot,
  loadWorkspaceManifests,
  saveWorkspaceManifest,
} from '@/lib/utility.js';
import { Logger } from '@/toolkit/index.js';

import type {
  CLIRecipeSyncLtsEnginesRunOptions,
  CLIRecipeSyncLtsEnginesRunReturns,
  CLIRecipeSyncLtsEnginesSyncNodeConstraintConstraint,
  CLIRecipeSyncLtsEnginesSyncNodeConstraintReturns,
  CLIRecipeSyncLtsEnginesSyncNodeConstraintWorkspace,
} from '@/types/cli/recipe/sync-lts-engines.d.ts';

/**
 * CLI Recipe - Sync LTS Engines.
 *
 * @since 1.0.0
 */
export class CLIRecipeSyncLtsEngines {
  /**
   * CLI Recipe - Sync LTS Engines - Run.
   *
   * @param {CLIRecipeSyncLtsEnginesRunOptions} options - Options.
   *
   * @returns {CLIRecipeSyncLtsEnginesRunReturns}
   *
   * @since 1.0.0
   */
  public static async run(options: CLIRecipeSyncLtsEnginesRunOptions): CLIRecipeSyncLtsEnginesRunReturns {
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
        name: 'CLIRecipeSyncLtsEngines.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice = (isDryRun) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CLIRecipeSyncLtsEngines.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const novaConfig = new NovaConfig();
    const workingFile = await novaConfig.load();
    const workingFileWorkspaces = Object.entries(workingFile.workspaces ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipeSyncLtsEngines.run',
        purpose: 'workspaces',
      }).warn('Skipping LTS engine sync. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have LTS engine sync enabled.
    const eligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig = workspace[1];

      return workspaceConfig.syncLtsEngines === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipeSyncLtsEngines.run',
        purpose: 'workspaces',
      }).warn('Skipping LTS engine sync. No workspaces have "syncLtsEngines" enabled in the "nova.config.json" file.');

      return;
    }

    // Fetch the current LTS constraint from the Node.js release schedule.
    const constraint = await NodeReleases.fetchLtsVersions();

    if (constraint === undefined) {
      Logger.customize({
        name: 'CLIRecipeSyncLtsEngines.run',
        purpose: 'constraint',
      }).warn('Skipping LTS engine sync. Unable to determine active Node.js LTS versions.');

      return;
    }

    const workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipeSyncLtsEngines.run',
        purpose: 'workspaces',
      }).warn('Skipping LTS engine sync. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CLIRecipeSyncLtsEngines.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for LTS engine sync.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'CLIRecipeSyncLtsEngines.run',
        purpose: 'iteration',
      }).info(`Syncing LTS engine constraint for the "${workspace.manifest.name}" workspace ...`);

      CLIRecipeSyncLtsEngines.syncNodeConstraint(workspace, constraint);

      if (isDryRun === true) {
        continue;
      }

      await saveWorkspaceManifest(workspace, isReplaceFile);
    }
  }

  /**
   * CLI Recipe - Sync LTS Engines - Sync node constraint.
   *
   * @param {CLIRecipeSyncLtsEnginesSyncNodeConstraintWorkspace}  workspace  - Workspace.
   * @param {CLIRecipeSyncLtsEnginesSyncNodeConstraintConstraint} constraint - Constraint.
   *
   * @private
   *
   * @returns {CLIRecipeSyncLtsEnginesSyncNodeConstraintReturns}
   *
   * @since 1.0.0
   */
  private static syncNodeConstraint(workspace: CLIRecipeSyncLtsEnginesSyncNodeConstraintWorkspace, constraint: CLIRecipeSyncLtsEnginesSyncNodeConstraintConstraint): CLIRecipeSyncLtsEnginesSyncNodeConstraintReturns {
    const engines = workspace.fileContents['engines'];

    // If "engines" does not exist, create it with the constraint.
    if (engines === undefined) {
      Reflect.set(workspace.fileContents, 'engines', { node: constraint });

      Logger.customize({
        name: 'CLIRecipeSyncLtsEngines.syncNodeConstraint',
        purpose: 'engines',
      }).info(`${chalk.magenta(`"${workspace.manifest.name}" workspace`)} → Created "engines.node" with "${constraint}".`);

      return;
    }

    // If "engines" exists but is not a plain object, warn and skip.
    if (!isPlainObject(engines)) {
      Logger.customize({
        name: 'CLIRecipeSyncLtsEngines.syncNodeConstraint',
        purpose: 'engines',
      }).warn(`${chalk.magenta(`"${workspace.manifest.name}" workspace`)} → "engines" is not a plain object. Skipping.`);

      return;
    }

    const currentNode = engines['node'];

    // If "engines.node" already matches the constraint, skip.
    if (currentNode === constraint) {
      Logger.customize({
        name: 'CLIRecipeSyncLtsEngines.syncNodeConstraint',
        purpose: 'engines',
      }).info(`${chalk.magenta(`"${workspace.manifest.name}" workspace`)} → "engines.node" is already up to date.`);

      return;
    }

    // Update "engines.node" to the constraint.
    Reflect.set(engines, 'node', constraint);

    const previous = (typeof currentNode === 'string') ? currentNode : String(currentNode ?? 'undefined');

    Logger.customize({
      name: 'CLIRecipeSyncLtsEngines.syncNodeConstraint',
      purpose: 'engines',
    }).info(`${chalk.magenta(`"${workspace.manifest.name}" workspace`)} → Updated "engines.node" from "${previous}" to "${constraint}".`);
  }
}
