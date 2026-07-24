import { promises as fs } from 'node:fs';
import { join } from 'node:path';

import { Runner as CliGenerateMustHavesReadMe } from '../../../cli/generate/must-haves/read-me.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import { spliceReadMeRegion } from '../../../lib/read-me-regions.js';
import {
  collectConsumerWorkspacePaths,
  isProjectRoot,
  pathExists,
  saveGeneratedFile,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_AlreadyCurrentCount,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_CurrentDirectory,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_IsAtProjectRoot,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_IsDryRun,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_IsReplaceFile,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_NewInnerContent,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_NotFoundCount,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_Options,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_ReadMeRecipes,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_Recipes,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_ReplaceFileNotice,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_Result,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_Returns,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_RootPath,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_SkippedCount,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_TargetPaths,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_UpdatedCount,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_UpdateIntroduction,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_WorkingFile,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_CurrentContent,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_FilePath,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_IsDryRun,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_IsReplaceFile,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_NewInnerContent,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_Returns,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_Spliced,
  Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_TargetExists,
} from '../../../types/cli/recipe/read-me/update-introduction.d.ts';

/**
 * CLI - Recipe - Read Me - Update Introduction.
 *
 * Refreshes the "introduction" region of the project README.md in place from nova.config,
 * splicing regenerated content between the region markers without touching outside them.
 *
 * @since 0.21.0
 */
export class Runner {
  /**
   * CLI - Recipe - Read Me - Update Introduction - Run.
   *
   * Verifies the working directory is a project root, then replaces only the marked
   * "introduction" region of the root README.md and every consumer-workspace copy, leaving a
   * non-nova README untouched.
   *
   * @param {Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_Returns}
   *
   * @since 0.21.0
   */
  public static async run(options: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_Options): Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_Returns {
    const currentDirectory: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_WorkingFile = await new LibNovaConfig().load();

    const recipes: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_Recipes = workingFile['recipes'];
    const readMeRecipes: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_ReadMeRecipes = (recipes !== undefined) ? recipes['read-me'] : undefined;
    const updateIntroduction: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_UpdateIntroduction = (readMeRecipes !== undefined) ? readMeRecipes['update-introduction'] : undefined;

    if (
      updateIntroduction === undefined
      || updateIntroduction['enabled'] !== true
    ) {
      Logger.warn('Skipping update-introduction. The recipe is not enabled in the "nova.config.json" file.');

      return;
    }

    // Regenerate the inner introduction content once from config using the same builder the
    // generator uses. The content is identical for the root copy and every consumer copy.
    const newInnerContent: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_NewInnerContent = CliGenerateMustHavesReadMe.buildIntroductionRegionContent(workingFile);

    if (newInnerContent === undefined) {
      Logger.warn('Skipping update-introduction. No introduction applies for the current "nova.config.json" file.');

      return;
    }

    // The generator fans a single README out to the root plus every consumer-facing workspace
    // (app, package, tool, config). Refresh every copy the generator writes so no consumer copy
    // drifts. Each copy is gated independently below.
    const rootPath: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_RootPath = join(currentDirectory, 'README.md');
    const targetPaths: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_TargetPaths = [
      rootPath,
      ...collectConsumerWorkspacePaths(currentDirectory, workingFile['workspaces'], 'README.md'),
    ];

    let updatedCount: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_UpdatedCount = 0;
    let skippedCount: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_SkippedCount = 0;
    let alreadyCurrentCount: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_AlreadyCurrentCount = 0;
    let notFoundCount: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_NotFoundCount = 0;

    // Gate and refresh each README copy independently. A consumer copy that lacks the region
    // markers is skipped and left byte-identical while a pristine root copy is still refreshed,
    // and vice-versa. The anti-mangle splice runs against each file's own current content, never
    // once against the root and blindly across the rest.
    for (const targetPath of targetPaths) {
      const result: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_Run_Result = await Runner.updateReadMeFile(targetPath, newInnerContent, isDryRun, isReplaceFile);

      if (result === 'updated') {
        updatedCount += 1;
      } else if (result === 'skipped') {
        skippedCount += 1;
      } else if (result === 'already-current') {
        alreadyCurrentCount += 1;
      } else {
        notFoundCount += 1;
      }
    }

    // When not a single target README exists on disk, there is nothing to refresh anywhere.
    // Warn and return, matching the pre-fan-out behavior for a missing root README.
    if (notFoundCount === targetPaths.length) {
      Logger.warn('Skipping update-introduction. No README.md file was found in the project root.');

      return;
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'read-me',
    }).info(`update-introduction summary: ${updatedCount} updated, ${skippedCount} skipped, ${alreadyCurrentCount} already current, ${notFoundCount} not found.`);

    return;
  }

  /**
   * CLI - Recipe - Read Me - Update Introduction - Update Read Me File.
   *
   * Refreshes the "introduction" region of a single README copy independently. It reads
   * the file's own content and splices the regenerated inner content between the markers,
   * rewriting only when the markers are present, so a hand-edited copy is untouched.
   *
   * @param {Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_FilePath}        filePath        - File path.
   * @param {Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_NewInnerContent} newInnerContent - New inner content.
   * @param {Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_IsDryRun}        isDryRun        - Is dry run.
   * @param {Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_IsReplaceFile}   isReplaceFile   - Is replace file.
   *
   * @private
   *
   * @returns {Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_Returns}
   *
   * @since 0.21.0
   */
  private static async updateReadMeFile(filePath: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_FilePath, newInnerContent: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_NewInnerContent, isDryRun: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_IsDryRun, isReplaceFile: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_IsReplaceFile): Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_Returns {
    const targetExists: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_TargetExists = await pathExists(filePath);

    if (targetExists !== true) {
      Logger.customize({
        name: 'Runner.updateReadMeFile',
        purpose: 'read-me',
      }).warn(`Skipping "${filePath}". No README.md file was found at this location.`);

      return 'not-found';
    }

    const currentContent: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_CurrentContent = await fs.readFile(filePath, 'utf-8');
    const spliced: Cli_Recipe_ReadMe_UpdateIntroduction_Runner_UpdateReadMeFile_Spliced = spliceReadMeRegion(currentContent, 'introduction', newInnerContent);

    // Anti-mangle gate. When the markers are absent or misordered the README was not generated by
    // Nova or lacks this region, so the file is left untouched. The gate is evaluated against this
    // file's own content, so each copy stands on its own.
    if (spliced === undefined) {
      Logger.customize({
        name: 'Runner.updateReadMeFile',
        purpose: 'read-me',
      }).warn(`Skipping "${filePath}". The "introduction" region markers were not found in the README.md file.`);

      return 'skipped';
    }

    if (spliced === currentContent) {
      Logger.customize({
        name: 'Runner.updateReadMeFile',
        purpose: 'read-me',
      }).info(`Skipping "${filePath}". The README.md introduction is already up to date.`);

      return 'already-current';
    }

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.updateReadMeFile',
        purpose: 'read-me',
      }).info(`Would update the "${filePath}" introduction region.`);

      return 'updated';
    }

    await saveGeneratedFile(filePath, spliced, isReplaceFile);

    return 'updated';
  }
}
