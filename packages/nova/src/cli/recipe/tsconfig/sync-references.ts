import { promises as fs } from 'node:fs';
import { join } from 'node:path';

import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  isPlainObject,
  isProjectRoot,
  pathExists,
  renameFileWithDate,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_CurrentDirectory,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_IsAtProjectRoot,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_IsDryRun,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_IsReplaceFile,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_Options,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_ReplaceFileNotice,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_Result,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_Returns,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_SkippedCount,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_SyncReferences,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_TsconfigRecipes,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_UpdatedCount,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_UpToDateCount,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_WorkingFile,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_WorkspacePaths,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Content,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Directory,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_DisplayPath,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Entries,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_IsDryRun,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_IsReferenceOnly,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_IsReplaceFile,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Next,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Parsed,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Raw,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_References,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_RelativePath,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Returns,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Siblings,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_TsconfigExists,
  Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_TsconfigPath,
} from '../../../types/cli/recipe/tsconfig/sync-references.d.ts';

/**
 * CLI - Recipe - Tsconfig - Sync References.
 *
 * Keeps each reference-only "tsconfig.json" pointing at every sibling "tsconfig.*.json"
 * project, so the editor's TypeScript server finds all of a workspace's projects.
 *
 * @since 0.49.0
 */
export class Runner {
  /**
   * CLI - Recipe - Tsconfig - Sync References - Run.
   *
   * Verifies the working directory is a project root, then syncs the "references" list of
   * the project root's and every workspace's reference-only "tsconfig.json". A tsconfig.json
   * that compiles files is never edited.
   *
   * @param {Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_Returns}
   *
   * @since 0.49.0
   */
  public static async run(options: Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_Options): Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_Returns {
    const currentDirectory: Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const workingFile: Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_WorkingFile = await new LibNovaConfig().load();
    const tsconfigRecipes: Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_TsconfigRecipes = (workingFile['recipes'] !== undefined) ? workingFile['recipes']['tsconfig'] : undefined;
    const syncReferences: Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_SyncReferences = (tsconfigRecipes !== undefined) ? tsconfigRecipes['sync-references'] : undefined;

    if (syncReferences === undefined || syncReferences['enabled'] !== true) {
      Logger.warn('Skipping sync-references. The recipe is not enabled in the "nova.config.json" file.');

      return;
    }

    const isDryRun: Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workspacePaths: Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_WorkspacePaths = [...new Set([
      './',
      ...Object.keys(workingFile['workspaces'] ?? {}),
    ])];

    let updatedCount: Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_UpdatedCount = 0;
    let upToDateCount: Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_UpToDateCount = 0;
    let skippedCount: Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_SkippedCount = 0;

    for (const workspacePath of workspacePaths) {
      const result: Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_Result = await Runner.syncDirectory(join(currentDirectory, workspacePath), workspacePath, isDryRun, isReplaceFile);

      if (result === 'updated') {
        updatedCount += 1;
      } else if (result === 'up-to-date') {
        upToDateCount += 1;
      } else {
        skippedCount += 1;
      }
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'tsconfig',
    }).info(`sync-references summary: ${updatedCount} updated, ${upToDateCount} already up to date, ${skippedCount} skipped.`);

    return;
  }

  /**
   * CLI - Recipe - Tsconfig - Sync References - Sync Directory.
   *
   * Sets the "references" of one directory's "tsconfig.json" to its sorted siblings.
   * Only a reference-only file, where "files" is an empty array and there is no "include",
   * is edited, and every other key keeps its value and position.
   *
   * @param {Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Directory}     directory     - Directory.
   * @param {Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_DisplayPath}   displayPath   - Display path.
   * @param {Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_IsDryRun}      isDryRun      - Is dry run.
   * @param {Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_IsReplaceFile} isReplaceFile - Is replace file.
   *
   * @private
   *
   * @returns {Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Returns}
   *
   * @since 0.49.0
   */
  private static async syncDirectory(directory: Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Directory, displayPath: Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_DisplayPath, isDryRun: Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_IsDryRun, isReplaceFile: Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_IsReplaceFile): Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Returns {
    const tsconfigPath: Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_TsconfigPath = join(directory, 'tsconfig.json');
    const relativePath: Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_RelativePath = (displayPath === './') ? './tsconfig.json' : `${displayPath}/tsconfig.json`;
    const tsconfigExists: Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_TsconfigExists = await pathExists(tsconfigPath);

    if (tsconfigExists !== true) {
      return 'skipped';
    }

    const raw: Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Raw = await fs.readFile(tsconfigPath, 'utf-8');
    let parsed: Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Parsed = undefined;

    try {
      parsed = JSON.parse(raw);
    } catch {
      Logger.customize({
        name: 'Runner.syncDirectory',
        purpose: 'parse',
      }).warn(`Skipping "${relativePath}". The file is not plain JSON.`);

      return 'skipped';
    }

    if (isPlainObject(parsed) === false) {
      return 'skipped';
    }

    const isReferenceOnly: Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_IsReferenceOnly = Array.isArray(parsed['files']) === true
      && parsed['files'].length === 0
      && parsed['include'] === undefined;

    // A tsconfig.json that compiles files belongs to its own project, so it is never edited.
    if (isReferenceOnly === false) {
      return 'skipped';
    }

    const entries: Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Entries = await fs.readdir(directory);
    const siblings: Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Siblings = entries
      .filter((entry) => (
        entry.startsWith('tsconfig.') === true
        && entry.endsWith('.json') === true
        && entry !== 'tsconfig.json'
      ))
      .sort();
    const references: Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_References = siblings.map((sibling) => ({
      path: `./${sibling}`,
    }));
    const next: Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Next = (Object.prototype.hasOwnProperty.call(parsed, 'references') === true) ? {
      ...parsed,
      references,
    } : {
      references,
      ...parsed,
    };
    const content: Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Content = `${JSON.stringify(next, null, 2)}\n`;

    if (content === raw) {
      return 'up-to-date';
    }

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.syncDirectory',
        purpose: 'tsconfig',
      }).info(`Would update the "${relativePath}" references.`);

      return 'updated';
    }

    if (isReplaceFile === false) {
      await renameFileWithDate(tsconfigPath);
    }

    await fs.writeFile(tsconfigPath, content, 'utf-8');

    Logger.customize({
      name: 'Runner.syncDirectory',
      purpose: 'tsconfig',
    }).info(`Updated the "${relativePath}" references.`);

    return 'updated';
  }
}
