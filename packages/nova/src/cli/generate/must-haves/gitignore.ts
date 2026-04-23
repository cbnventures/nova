import { promises as fs } from 'fs';
import { join } from 'path';

import prompts from 'prompts';

import { LIB_REGEX_PATTERN_HASH_BORDER_LINE } from '../../../lib/regex.js';
import {
  isProjectRoot,
  resolveTemplatePath,
  saveGeneratedFile,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  CliGenerateMustHavesGitignoreAddPatternContent,
  CliGenerateMustHavesGitignoreAddPatternEndsWithNewline,
  CliGenerateMustHavesGitignoreAddPatternPattern,
  CliGenerateMustHavesGitignoreAddPatternReturns,
  CliGenerateMustHavesGitignoreDeletePatternContent,
  CliGenerateMustHavesGitignoreDeletePatternLine,
  CliGenerateMustHavesGitignoreDeletePatternLines,
  CliGenerateMustHavesGitignoreDeletePatternMarkerIndex,
  CliGenerateMustHavesGitignoreDeletePatternPattern,
  CliGenerateMustHavesGitignoreDeletePatternReturns,
  CliGenerateMustHavesGitignoreDeletePatternSectionStart,
  CliGenerateMustHavesGitignoreEditPatternContent,
  CliGenerateMustHavesGitignoreEditPatternLines,
  CliGenerateMustHavesGitignoreEditPatternNewPattern,
  CliGenerateMustHavesGitignoreEditPatternOldPattern,
  CliGenerateMustHavesGitignoreEditPatternReplaced,
  CliGenerateMustHavesGitignoreEditPatternReturns,
  CliGenerateMustHavesGitignoreParseAllPatternsContent,
  CliGenerateMustHavesGitignoreParseAllPatternsReturns,
  CliGenerateMustHavesGitignoreParseAllPatternsTrimmed,
  CliGenerateMustHavesGitignoreParseProjectExcludesContent,
  CliGenerateMustHavesGitignoreParseProjectExcludesLine,
  CliGenerateMustHavesGitignoreParseProjectExcludesLines,
  CliGenerateMustHavesGitignoreParseProjectExcludesMarkerIndex,
  CliGenerateMustHavesGitignoreParseProjectExcludesReturns,
  CliGenerateMustHavesGitignoreParseProjectExcludesStartIndex,
  CliGenerateMustHavesGitignoreParseProjectExcludesTrimmed,
  CliGenerateMustHavesGitignorePromptManageMenuAction,
  CliGenerateMustHavesGitignorePromptManageMenuActionOutputKey,
  CliGenerateMustHavesGitignorePromptManageMenuActionOutputValue,
  CliGenerateMustHavesGitignorePromptManageMenuAddPatternOutputKey,
  CliGenerateMustHavesGitignorePromptManageMenuAddPatternOutputValue,
  CliGenerateMustHavesGitignorePromptManageMenuAddPatternValidateValue,
  CliGenerateMustHavesGitignorePromptManageMenuAllPatterns,
  CliGenerateMustHavesGitignorePromptManageMenuChoices,
  CliGenerateMustHavesGitignorePromptManageMenuContent,
  CliGenerateMustHavesGitignorePromptManageMenuCurrentContent,
  CliGenerateMustHavesGitignorePromptManageMenuCurrentPatterns,
  CliGenerateMustHavesGitignorePromptManageMenuDeleteChoices,
  CliGenerateMustHavesGitignorePromptManageMenuDeleteSelectedPattern,
  CliGenerateMustHavesGitignorePromptManageMenuDeleteSelectOutput,
  CliGenerateMustHavesGitignorePromptManageMenuDeleteSelectOutputKey,
  CliGenerateMustHavesGitignorePromptManageMenuDeleteSelectOutputValue,
  CliGenerateMustHavesGitignorePromptManageMenuEditChoices,
  CliGenerateMustHavesGitignorePromptManageMenuEditNewPatternOutputKey,
  CliGenerateMustHavesGitignorePromptManageMenuEditNewPatternOutputValue,
  CliGenerateMustHavesGitignorePromptManageMenuEditPatternValidateValue,
  CliGenerateMustHavesGitignorePromptManageMenuEditSelectOutputKey,
  CliGenerateMustHavesGitignorePromptManageMenuEditSelectOutputValue,
  CliGenerateMustHavesGitignorePromptManageMenuExistingPatterns,
  CliGenerateMustHavesGitignorePromptManageMenuHasPendingChanges,
  CliGenerateMustHavesGitignorePromptManageMenuIsDryRun,
  CliGenerateMustHavesGitignorePromptManageMenuIsReplaceFile,
  CliGenerateMustHavesGitignorePromptManageMenuMenuOutput,
  CliGenerateMustHavesGitignorePromptManageMenuNewPattern,
  CliGenerateMustHavesGitignorePromptManageMenuNewPatternOutput,
  CliGenerateMustHavesGitignorePromptManageMenuOptions,
  CliGenerateMustHavesGitignorePromptManageMenuPatternName,
  CliGenerateMustHavesGitignorePromptManageMenuPatternOutput,
  CliGenerateMustHavesGitignorePromptManageMenuProjectExcludes,
  CliGenerateMustHavesGitignorePromptManageMenuReconstructed,
  CliGenerateMustHavesGitignorePromptManageMenuReservedPatterns,
  CliGenerateMustHavesGitignorePromptManageMenuReturns,
  CliGenerateMustHavesGitignorePromptManageMenuSelectedPattern,
  CliGenerateMustHavesGitignorePromptManageMenuSelectOutput,
  CliGenerateMustHavesGitignorePromptManageMenuTargetPath,
  CliGenerateMustHavesGitignorePromptManageMenuTemplateContent,
  CliGenerateMustHavesGitignorePromptManageMenuTemplateDirectory,
  CliGenerateMustHavesGitignorePromptManageMenuTemplateFilePath,
  CliGenerateMustHavesGitignorePromptManageMenuTrimmedNewPattern,
  CliGenerateMustHavesGitignorePromptManageMenuTrimmedPatternName,
  CliGenerateMustHavesGitignorePromptManageMenuTrimmedValue,
  CliGenerateMustHavesGitignorePromptManageMenuUpdatedContent,
  CliGenerateMustHavesGitignorePromptManageMenuUserPatterns,
  CliGenerateMustHavesGitignorePromptRegenerateAddMore,
  CliGenerateMustHavesGitignorePromptRegenerateCancelled,
  CliGenerateMustHavesGitignorePromptRegenerateContent,
  CliGenerateMustHavesGitignorePromptRegenerateCurrentDirectory,
  CliGenerateMustHavesGitignorePromptRegenerateCustomEntries,
  CliGenerateMustHavesGitignorePromptRegenerateEntryOutput,
  CliGenerateMustHavesGitignorePromptRegenerateEntryOutputKey,
  CliGenerateMustHavesGitignorePromptRegenerateEntryOutputResult,
  CliGenerateMustHavesGitignorePromptRegenerateEntryOutputValue,
  CliGenerateMustHavesGitignorePromptRegenerateFinalContent,
  CliGenerateMustHavesGitignorePromptRegenerateIsDryRun,
  CliGenerateMustHavesGitignorePromptRegenerateIsReplaceFile,
  CliGenerateMustHavesGitignorePromptRegenerateOptions,
  CliGenerateMustHavesGitignorePromptRegenerateReturns,
  CliGenerateMustHavesGitignorePromptRegenerateTargetPath,
  CliGenerateMustHavesGitignorePromptRegenerateTemplateDirectory,
  CliGenerateMustHavesGitignorePromptRegenerateTemplatePath,
  CliGenerateMustHavesGitignorePromptRegenerateTrimmedEntry,
  CliGenerateMustHavesGitignorePromptWithCancelCancelled,
  CliGenerateMustHavesGitignorePromptWithCancelQuestions,
  CliGenerateMustHavesGitignorePromptWithCancelResult,
  CliGenerateMustHavesGitignorePromptWithCancelReturns,
  CliGenerateMustHavesGitignoreRunCurrentDirectory,
  CliGenerateMustHavesGitignoreRunFileExists,
  CliGenerateMustHavesGitignoreRunIsAtProjectRoot,
  CliGenerateMustHavesGitignoreRunIsDryRun,
  CliGenerateMustHavesGitignoreRunIsReplaceFile,
  CliGenerateMustHavesGitignoreRunManageResult,
  CliGenerateMustHavesGitignoreRunModeChoices,
  CliGenerateMustHavesGitignoreRunModeOutput,
  CliGenerateMustHavesGitignoreRunModeOutputKey,
  CliGenerateMustHavesGitignoreRunModeOutputResult,
  CliGenerateMustHavesGitignoreRunModeOutputValue,
  CliGenerateMustHavesGitignoreRunOptions,
  CliGenerateMustHavesGitignoreRunReplaceFileNotice,
  CliGenerateMustHavesGitignoreRunResult,
  CliGenerateMustHavesGitignoreRunReturns,
  CliGenerateMustHavesGitignoreRunTargetPath,
  CliGenerateMustHavesGitignoreRunTemplateDirectory,
} from '../../../types/cli/generate/must-haves/gitignore.d.ts';

/**
 * CLI - Generate - Must Haves - Gitignore.
 *
 * Generates and manages the root .gitignore file from
 * a bundled template. Supports regeneration with custom
 * entries and interactive pattern management.
 *
 * @since 0.15.0
 */
export class CliGenerateMustHavesGitignore {
  /**
   * CLI - Generate - Must Haves - Gitignore - Run.
   *
   * Called by the CLI index via executeCommand. Checks for an existing .gitignore and
   * routes to manage or regenerate mode based on user selection.
   *
   * @param {CliGenerateMustHavesGitignoreRunOptions} options - Options.
   *
   * @returns {CliGenerateMustHavesGitignoreRunReturns}
   *
   * @since 0.15.0
   */
  public static async run(options: CliGenerateMustHavesGitignoreRunOptions): CliGenerateMustHavesGitignoreRunReturns {
    const currentDirectory: CliGenerateMustHavesGitignoreRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliGenerateMustHavesGitignoreRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: CliGenerateMustHavesGitignoreRunIsDryRun = options['dryRun'] === true;
    const isReplaceFile: CliGenerateMustHavesGitignoreRunIsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliGenerateMustHavesGitignore.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: CliGenerateMustHavesGitignoreRunReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CliGenerateMustHavesGitignore.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const templateDirectory: CliGenerateMustHavesGitignoreRunTemplateDirectory = resolveTemplatePath(import.meta.url, 'generators/must-haves/gitignore');
    const targetPath: CliGenerateMustHavesGitignoreRunTargetPath = join(currentDirectory, '.gitignore');

    // Check if file already exists.
    let fileExists: CliGenerateMustHavesGitignoreRunFileExists = false;

    try {
      await fs.access(targetPath);

      fileExists = true;
    } catch {
      // File does not exist.
    }

    // Prompt for mode if file exists.
    if (fileExists === true) {
      while (true) {
        const modeChoices: CliGenerateMustHavesGitignoreRunModeChoices = [
          {
            title: 'Manage existing patterns',
            value: 'manage',
          },
          {
            title: 'Regenerate from template',
            value: 'regenerate',
          },
        ];

        const modeOutput: CliGenerateMustHavesGitignoreRunModeOutput = await CliGenerateMustHavesGitignore.promptWithCancel<CliGenerateMustHavesGitignoreRunModeOutputKey, CliGenerateMustHavesGitignoreRunModeOutputValue>({
          type: 'select',
          name: 'mode',
          message: '.gitignore already exists. What would you like to do?',
          choices: modeChoices,
          initial: 0,
        });

        if (modeOutput['cancelled'] === true) {
          return 'cancelled';
        }

        const modeOutputResult: CliGenerateMustHavesGitignoreRunModeOutputResult = modeOutput['result'];
        const selectedMode: CliGenerateMustHavesGitignoreRunModeOutputValue = modeOutputResult.mode;

        if (selectedMode === undefined) {
          return 'cancelled';
        }

        if (selectedMode === 'manage') {
          const manageResult: CliGenerateMustHavesGitignoreRunManageResult = await CliGenerateMustHavesGitignore.promptManageMenu({
            templateDirectory,
            targetPath,
            isDryRun,
            isReplaceFile,
          });

          if (manageResult === 'exit') {
            return 'completed';
          }

          // "Back" from manage menu returns here, loop back to mode selection.
          continue;
        }

        // "Regenerate" selected — run regenerate flow.
        const result: CliGenerateMustHavesGitignoreRunResult = await CliGenerateMustHavesGitignore.promptRegenerate({
          templateDirectory,
          currentDirectory,
          isDryRun,
          isReplaceFile,
        });

        if (result === 'cancelled') {
          continue;
        }

        return 'completed';
      }
    }

    // No file exists — go straight to regenerate.
    const result: CliGenerateMustHavesGitignoreRunResult = await CliGenerateMustHavesGitignore.promptRegenerate({
      templateDirectory,
      currentDirectory,
      isDryRun,
      isReplaceFile,
    });

    return (result === 'cancelled') ? 'cancelled' : 'completed';
  }

  /**
   * CLI - Generate - Must Haves - Gitignore - Prompt Regenerate.
   *
   * Rebuilds the .gitignore from the bundled template and prompts the user to add custom
   * ignore patterns appended under the Project Excludes section.
   *
   * @param {CliGenerateMustHavesGitignorePromptRegenerateOptions} options - Options.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesGitignorePromptRegenerateReturns}
   *
   * @since 0.15.0
   */
  private static async promptRegenerate(options: CliGenerateMustHavesGitignorePromptRegenerateOptions): CliGenerateMustHavesGitignorePromptRegenerateReturns {
    const templateDirectory: CliGenerateMustHavesGitignorePromptRegenerateTemplateDirectory = options['templateDirectory'];
    const currentDirectory: CliGenerateMustHavesGitignorePromptRegenerateCurrentDirectory = options['currentDirectory'];
    const isDryRun: CliGenerateMustHavesGitignorePromptRegenerateIsDryRun = options['isDryRun'];
    const isReplaceFile: CliGenerateMustHavesGitignorePromptRegenerateIsReplaceFile = options['isReplaceFile'];

    const customEntries: CliGenerateMustHavesGitignorePromptRegenerateCustomEntries = [];
    let addMore: CliGenerateMustHavesGitignorePromptRegenerateAddMore = true;
    let cancelled: CliGenerateMustHavesGitignorePromptRegenerateCancelled = false;

    while (addMore === true) {
      const entryOutput: CliGenerateMustHavesGitignorePromptRegenerateEntryOutput = await CliGenerateMustHavesGitignore.promptWithCancel<CliGenerateMustHavesGitignorePromptRegenerateEntryOutputKey, CliGenerateMustHavesGitignorePromptRegenerateEntryOutputValue>({
        type: 'text',
        name: 'entry',
        message: 'Pattern to ignore (leave empty to finish):',
      });

      if (entryOutput['cancelled'] === true) {
        cancelled = true;

        break;
      }

      const entryOutputResult: CliGenerateMustHavesGitignorePromptRegenerateEntryOutputResult = entryOutput['result'];

      if (entryOutputResult.entry === undefined || entryOutputResult.entry.trim() === '') {
        addMore = false;

        continue;
      }

      const trimmedEntry: CliGenerateMustHavesGitignorePromptRegenerateTrimmedEntry = entryOutputResult.entry.trim();

      customEntries.push(trimmedEntry);
    }

    if (cancelled === true) {
      return 'cancelled';
    }

    const templatePath: CliGenerateMustHavesGitignorePromptRegenerateTemplatePath = join(templateDirectory, '.gitignore');
    const targetPath: CliGenerateMustHavesGitignorePromptRegenerateTargetPath = join(currentDirectory, '.gitignore');

    let content: CliGenerateMustHavesGitignorePromptRegenerateContent = undefined;

    try {
      content = await fs.readFile(templatePath, 'utf-8');
    } catch {
      Logger.customize({
        name: 'CliGenerateMustHavesGitignore.promptRegenerate',
        purpose: 'read',
      }).error(`Failed to read template "${templatePath}".`);

      return 'completed';
    }

    // Append custom patterns under the project excludes section.
    let finalContent: CliGenerateMustHavesGitignorePromptRegenerateFinalContent = content;

    if (customEntries.length > 0) {
      finalContent = `${content}${customEntries.join('\n')}\n`;
    }

    if (isDryRun === true) {
      return 'completed';
    }

    await saveGeneratedFile(targetPath, finalContent, isReplaceFile, {
      command: 'nova generate must-haves gitignore',
      docsSlug: 'cli/generators/must-haves/gitignore',
      mode: 'strict',
    });

    return 'completed';
  }

  /**
   * CLI - Generate - Must Haves - Gitignore - Parse All Patterns.
   *
   * Extracts every non-empty, non-comment line from a
   * .gitignore file. Used by promptManageMenu to build
   * the reserved patterns set and detect duplicates.
   *
   * @param {CliGenerateMustHavesGitignoreParseAllPatternsContent} content - Content.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesGitignoreParseAllPatternsReturns}
   *
   * @since 0.15.0
   */
  private static parseAllPatterns(content: CliGenerateMustHavesGitignoreParseAllPatternsContent): CliGenerateMustHavesGitignoreParseAllPatternsReturns {
    const patterns: CliGenerateMustHavesGitignoreParseAllPatternsReturns = [];

    for (const line of content.split('\n')) {
      const trimmed: CliGenerateMustHavesGitignoreParseAllPatternsTrimmed = line.trim();

      if (trimmed !== '' && trimmed.startsWith('#') === false) {
        patterns.push(trimmed);
      }
    }

    return patterns;
  }

  /**
   * CLI - Generate - Must Haves - Gitignore - Parse Project Excludes.
   *
   * Returns only the user-added patterns that appear after the "Project Excludes" marker.
   * Separates editable entries from the template-managed section.
   *
   * @param {CliGenerateMustHavesGitignoreParseProjectExcludesContent} content - Content.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesGitignoreParseProjectExcludesReturns}
   *
   * @since 0.15.0
   */
  private static parseProjectExcludes(content: CliGenerateMustHavesGitignoreParseProjectExcludesContent): CliGenerateMustHavesGitignoreParseProjectExcludesReturns {
    const lines: CliGenerateMustHavesGitignoreParseProjectExcludesLines = content.split('\n');
    let markerIndex: CliGenerateMustHavesGitignoreParseProjectExcludesMarkerIndex = -1;

    for (let i = 0; i < lines.length; i += 1) {
      const line: CliGenerateMustHavesGitignoreParseProjectExcludesLine = lines[i];

      if (line !== undefined && line.includes('#### Project Excludes ####') === true) {
        markerIndex = i;

        break;
      }
    }

    if (markerIndex === -1) {
      return [];
    }

    // Skip the marker line and the closing border line.
    const startIndex: CliGenerateMustHavesGitignoreParseProjectExcludesStartIndex = markerIndex + 2;
    const patterns: CliGenerateMustHavesGitignoreParseProjectExcludesReturns = [];

    for (let i = startIndex; i < lines.length; i += 1) {
      const line: CliGenerateMustHavesGitignoreParseProjectExcludesLine = lines[i];

      if (line === undefined) {
        continue;
      }

      const trimmed: CliGenerateMustHavesGitignoreParseProjectExcludesTrimmed = line.trim();

      if (
        trimmed !== ''
        && trimmed.startsWith('#') === false
        && LIB_REGEX_PATTERN_HASH_BORDER_LINE.test(line) === false
      ) {
        patterns.push(trimmed);
      }
    }

    return patterns;
  }

  /**
   * CLI - Generate - Must Haves - Gitignore - Add Pattern.
   *
   * Appends a new ignore pattern to the end of the file content. Ensures a trailing newline
   * exists before inserting the new entry.
   *
   * @param {CliGenerateMustHavesGitignoreAddPatternContent} content - Content.
   * @param {CliGenerateMustHavesGitignoreAddPatternPattern} pattern - Pattern.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesGitignoreAddPatternReturns}
   *
   * @since 0.15.0
   */
  private static addPattern(content: CliGenerateMustHavesGitignoreAddPatternContent, pattern: CliGenerateMustHavesGitignoreAddPatternPattern): CliGenerateMustHavesGitignoreAddPatternReturns {
    const endsWithNewline: CliGenerateMustHavesGitignoreAddPatternEndsWithNewline = content.endsWith('\n');

    return (endsWithNewline === true) ? `${content}${pattern}\n` : [
      `${content}\n`,
      `${pattern}\n`,
    ].join('');
  }

  /**
   * CLI - Generate - Must Haves - Gitignore - Edit Pattern.
   *
   * Replaces the first occurrence of a trimmed line matching the old pattern. Only the first
   * match is replaced to avoid unintended edits.
   *
   * @param {CliGenerateMustHavesGitignoreEditPatternContent}    content    - Content.
   * @param {CliGenerateMustHavesGitignoreEditPatternOldPattern} oldPattern - Old pattern.
   * @param {CliGenerateMustHavesGitignoreEditPatternNewPattern} newPattern - New pattern.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesGitignoreEditPatternReturns}
   *
   * @since 0.15.0
   */
  private static editPattern(content: CliGenerateMustHavesGitignoreEditPatternContent, oldPattern: CliGenerateMustHavesGitignoreEditPatternOldPattern, newPattern: CliGenerateMustHavesGitignoreEditPatternNewPattern): CliGenerateMustHavesGitignoreEditPatternReturns {
    const lines: CliGenerateMustHavesGitignoreEditPatternLines = content.split('\n');
    let replaced: CliGenerateMustHavesGitignoreEditPatternReplaced = false;

    return lines.map((line) => {
      if (replaced !== true && line.trim() === oldPattern) {
        replaced = true;

        return newPattern;
      }

      return line;
    }).join('\n');
  }

  /**
   * CLI - Generate - Must Haves - Gitignore - Delete Pattern.
   *
   * Removes lines matching the given pattern, but only from the Project Excludes section.
   * Template-managed lines above the marker are never removed.
   *
   * @param {CliGenerateMustHavesGitignoreDeletePatternContent} content - Content.
   * @param {CliGenerateMustHavesGitignoreDeletePatternPattern} pattern - Pattern.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesGitignoreDeletePatternReturns}
   *
   * @since 0.15.0
   */
  private static deletePattern(content: CliGenerateMustHavesGitignoreDeletePatternContent, pattern: CliGenerateMustHavesGitignoreDeletePatternPattern): CliGenerateMustHavesGitignoreDeletePatternReturns {
    const lines: CliGenerateMustHavesGitignoreDeletePatternLines = content.split('\n');
    let markerIndex: CliGenerateMustHavesGitignoreDeletePatternMarkerIndex = -1;

    for (let i = 0; i < lines.length; i += 1) {
      const line: CliGenerateMustHavesGitignoreDeletePatternLine = lines[i];

      if (line !== undefined && line.includes('#### Project Excludes ####') === true) {
        markerIndex = i;

        break;
      }
    }

    if (markerIndex === -1) {
      return content;
    }

    // Only remove from the Project Excludes section.
    const sectionStart: CliGenerateMustHavesGitignoreDeletePatternSectionStart = markerIndex + 2;

    return lines.filter((line, i) => {
      if (i < sectionStart) {
        return true;
      }

      return line.trim() !== pattern;
    }).join('\n');
  }

  /**
   * CLI - Generate - Must Haves - Gitignore - Prompt Manage Menu.
   *
   * Presents an interactive loop for adding, editing,
   * or deleting patterns in the Project Excludes section.
   * Reconstructs the file from the template on entry.
   *
   * @param {CliGenerateMustHavesGitignorePromptManageMenuOptions} options - Options.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesGitignorePromptManageMenuReturns}
   *
   * @since 0.15.0
   */
  private static async promptManageMenu(options: CliGenerateMustHavesGitignorePromptManageMenuOptions): CliGenerateMustHavesGitignorePromptManageMenuReturns {
    const templateDirectory: CliGenerateMustHavesGitignorePromptManageMenuTemplateDirectory = options['templateDirectory'];
    const targetPath: CliGenerateMustHavesGitignorePromptManageMenuTargetPath = options['targetPath'];
    const isDryRun: CliGenerateMustHavesGitignorePromptManageMenuIsDryRun = options['isDryRun'];
    const isReplaceFile: CliGenerateMustHavesGitignorePromptManageMenuIsReplaceFile = options['isReplaceFile'];

    const templateFilePath: CliGenerateMustHavesGitignorePromptManageMenuTemplateFilePath = join(templateDirectory, '.gitignore');
    const templateContent: CliGenerateMustHavesGitignorePromptManageMenuTemplateContent = await fs.readFile(templateFilePath, 'utf-8');
    const reservedPatterns: CliGenerateMustHavesGitignorePromptManageMenuReservedPatterns = new Set(CliGenerateMustHavesGitignore.parseAllPatterns(templateContent));

    // Reconstruct file in memory: template + user's custom patterns under Project Excludes.
    let currentContent: CliGenerateMustHavesGitignorePromptManageMenuCurrentContent = '';

    try {
      currentContent = await fs.readFile(targetPath, 'utf-8');
    } catch {
      // File may not exist.
    }

    const currentPatterns: CliGenerateMustHavesGitignorePromptManageMenuCurrentPatterns = CliGenerateMustHavesGitignore.parseAllPatterns(currentContent);
    const userPatterns: CliGenerateMustHavesGitignorePromptManageMenuUserPatterns = currentPatterns.filter(
      (pattern) => reservedPatterns.has(pattern) !== true,
    );

    let reconstructed: CliGenerateMustHavesGitignorePromptManageMenuReconstructed = templateContent;

    if (userPatterns.length > 0) {
      reconstructed += `${userPatterns.join('\n')}\n`;
    }

    let hasPendingChanges: CliGenerateMustHavesGitignorePromptManageMenuHasPendingChanges = false;

    while (true) {
      // Use in-memory buffer instead of reading from disk.
      const content: CliGenerateMustHavesGitignorePromptManageMenuContent = reconstructed;

      const allPatterns: CliGenerateMustHavesGitignorePromptManageMenuAllPatterns = CliGenerateMustHavesGitignore.parseAllPatterns(content);
      const projectExcludes: CliGenerateMustHavesGitignorePromptManageMenuProjectExcludes = CliGenerateMustHavesGitignore.parseProjectExcludes(content);

      // Build menu choices.
      const choices: CliGenerateMustHavesGitignorePromptManageMenuChoices = [{
        title: 'Add a pattern',
        description: 'Add a new ignore pattern to Project Excludes',
        value: 'add',
      }];

      if (projectExcludes.length > 0) {
        choices.push({
          title: 'Edit a pattern',
          description: 'Update an existing pattern in Project Excludes',
          value: 'edit',
        });
      }

      if (projectExcludes.length > 0) {
        choices.push({
          title: 'Delete a pattern',
          description: 'Remove a pattern from Project Excludes',
          value: 'delete',
        });
      }

      choices.push({
        title: 'Save & Exit',
        description: 'Save changes and exit',
        value: 'exit',
      });

      choices.push({
        title: 'Back',
        description: 'Return to the previous menu',
        value: 'back',
      });

      const menuOutput: CliGenerateMustHavesGitignorePromptManageMenuMenuOutput = await CliGenerateMustHavesGitignore.promptWithCancel<CliGenerateMustHavesGitignorePromptManageMenuActionOutputKey, CliGenerateMustHavesGitignorePromptManageMenuActionOutputValue>({
        type: 'select',
        name: 'action',
        message: 'Select an action.',
        choices,
      });

      if (menuOutput['cancelled'] === true) {
        return 'back';
      }

      const action: CliGenerateMustHavesGitignorePromptManageMenuAction = menuOutput['result'].action;

      if (action === undefined || action === 'back') {
        return 'back';
      }

      if (action === 'exit') {
        if (hasPendingChanges === true && isDryRun !== true) {
          await saveGeneratedFile(targetPath, reconstructed, isReplaceFile, {
            command: 'nova generate must-haves gitignore',
            docsSlug: 'cli/generators/must-haves/gitignore',
            mode: 'strict',
          });
        }

        return 'exit';
      }

      // Add a pattern.
      if (action === 'add') {
        const existingPatterns: CliGenerateMustHavesGitignorePromptManageMenuExistingPatterns = new Set(allPatterns);

        const patternOutput: CliGenerateMustHavesGitignorePromptManageMenuPatternOutput = await CliGenerateMustHavesGitignore.promptWithCancel<CliGenerateMustHavesGitignorePromptManageMenuAddPatternOutputKey, CliGenerateMustHavesGitignorePromptManageMenuAddPatternOutputValue>({
          type: 'text',
          name: 'pattern',
          message: 'Pattern to ignore (e.g. logs/):',
          validate: (value: CliGenerateMustHavesGitignorePromptManageMenuAddPatternValidateValue) => {
            if (typeof value !== 'string' || value.trim() === '') {
              return 'Enter a pattern.';
            }

            const trimmedValue: CliGenerateMustHavesGitignorePromptManageMenuTrimmedValue = value.trim();

            if (trimmedValue.startsWith('#') === true) {
              return 'Comments are not allowed.';
            }

            if (existingPatterns.has(trimmedValue) === true) {
              return `"${trimmedValue}" already exists.`;
            }

            if (reservedPatterns.has(trimmedValue) === true) {
              return `"${trimmedValue}" is a reserved pattern and cannot be added.`;
            }

            return true;
          },
        });

        if (patternOutput['cancelled'] === true) {
          continue;
        }

        const patternName: CliGenerateMustHavesGitignorePromptManageMenuPatternName = patternOutput['result'].pattern;

        if (patternName === undefined) {
          continue;
        }

        const trimmedPatternName: CliGenerateMustHavesGitignorePromptManageMenuTrimmedPatternName = patternName.trim();
        const updatedContent: CliGenerateMustHavesGitignorePromptManageMenuUpdatedContent = CliGenerateMustHavesGitignore.addPattern(content, trimmedPatternName);

        reconstructed = updatedContent;
        hasPendingChanges = true;

        Logger.customize({
          name: 'CliGenerateMustHavesGitignore.promptManageMenu',
          purpose: 'add',
        }).info(`Added "${patternName.trim()}" to .gitignore.`);

        continue;
      }

      // Edit a pattern.
      if (action === 'edit') {
        const editChoices: CliGenerateMustHavesGitignorePromptManageMenuEditChoices = projectExcludes.map((pattern) => ({
          title: pattern,
          value: pattern,
        }));

        const selectOutput: CliGenerateMustHavesGitignorePromptManageMenuSelectOutput = await CliGenerateMustHavesGitignore.promptWithCancel<CliGenerateMustHavesGitignorePromptManageMenuEditSelectOutputKey, CliGenerateMustHavesGitignorePromptManageMenuEditSelectOutputValue>({
          type: 'select',
          name: 'pattern',
          message: 'Select a pattern to edit.',
          choices: editChoices,
        });

        if (selectOutput['cancelled'] === true) {
          continue;
        }

        const selectedPattern: CliGenerateMustHavesGitignorePromptManageMenuSelectedPattern = selectOutput['result'].pattern;

        if (selectedPattern === undefined) {
          continue;
        }

        const newPatternOutput: CliGenerateMustHavesGitignorePromptManageMenuNewPatternOutput = await CliGenerateMustHavesGitignore.promptWithCancel<CliGenerateMustHavesGitignorePromptManageMenuEditNewPatternOutputKey, CliGenerateMustHavesGitignorePromptManageMenuEditNewPatternOutputValue>({
          type: 'text',
          name: 'newPattern',
          message: `New pattern (current: "${selectedPattern}"):`,
          initial: selectedPattern,
          validate: (value: CliGenerateMustHavesGitignorePromptManageMenuEditPatternValidateValue) => {
            if (typeof value !== 'string' || value.trim() === '') {
              return 'Enter a pattern.';
            }

            if (value.trim().startsWith('#') === true) {
              return 'Comments are not allowed.';
            }

            return true;
          },
        });

        if (newPatternOutput['cancelled'] === true) {
          continue;
        }

        const newPattern: CliGenerateMustHavesGitignorePromptManageMenuNewPattern = newPatternOutput['result'].newPattern;

        if (newPattern === undefined) {
          continue;
        }

        const trimmedNewPattern: CliGenerateMustHavesGitignorePromptManageMenuTrimmedNewPattern = newPattern.trim();
        const updatedContent: CliGenerateMustHavesGitignorePromptManageMenuUpdatedContent = CliGenerateMustHavesGitignore.editPattern(content, selectedPattern, trimmedNewPattern);

        reconstructed = updatedContent;
        hasPendingChanges = true;

        Logger.customize({
          name: 'CliGenerateMustHavesGitignore.promptManageMenu',
          purpose: 'edit',
        }).info(`Updated "${selectedPattern}" to "${newPattern.trim()}" in .gitignore.`);

        continue;
      }

      // Delete a pattern.
      if (action === 'delete') {
        const deleteChoices: CliGenerateMustHavesGitignorePromptManageMenuDeleteChoices = projectExcludes.map((pattern) => ({
          title: pattern,
          value: pattern,
        }));

        const selectOutput: CliGenerateMustHavesGitignorePromptManageMenuDeleteSelectOutput = await CliGenerateMustHavesGitignore.promptWithCancel<CliGenerateMustHavesGitignorePromptManageMenuDeleteSelectOutputKey, CliGenerateMustHavesGitignorePromptManageMenuDeleteSelectOutputValue>({
          type: 'select',
          name: 'pattern',
          message: 'Select a pattern to delete.',
          choices: deleteChoices,
        });

        if (selectOutput['cancelled'] === true) {
          continue;
        }

        const selectedPattern: CliGenerateMustHavesGitignorePromptManageMenuDeleteSelectedPattern = selectOutput['result'].pattern;

        if (selectedPattern === undefined) {
          continue;
        }

        const updatedContent: CliGenerateMustHavesGitignorePromptManageMenuUpdatedContent = CliGenerateMustHavesGitignore.deletePattern(content, selectedPattern);

        reconstructed = updatedContent;
        hasPendingChanges = true;

        Logger.customize({
          name: 'CliGenerateMustHavesGitignore.promptManageMenu',
          purpose: 'delete',
        }).info(`Deleted "${selectedPattern}" from .gitignore.`);

        continue;
      }
    }
  }

  /**
   * CLI - Generate - Must Haves - Gitignore - Prompt With Cancel.
   *
   * Wraps the prompts library to detect Ctrl-C cancel events. Returns a discriminated union so
   * callers can distinguish cancelled from answered.
   *
   * @param {CliGenerateMustHavesGitignorePromptWithCancelQuestions} questions - Questions.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesGitignorePromptWithCancelReturns}
   *
   * @since 0.15.0
   */
  private static async promptWithCancel<Keys extends string, Result>(questions: CliGenerateMustHavesGitignorePromptWithCancelQuestions<Keys>): CliGenerateMustHavesGitignorePromptWithCancelReturns<Keys, Result> {
    let cancelled: CliGenerateMustHavesGitignorePromptWithCancelCancelled = false;

    const result: CliGenerateMustHavesGitignorePromptWithCancelResult<Keys, Result> = await prompts<Keys>(questions, {
      onCancel: () => false,
    });

    if (Object.keys(result).length === 0) {
      cancelled = true;
    }

    if (cancelled === true) {
      return {
        cancelled: true,
      };
    }

    return {
      cancelled: false,
      result,
    };
  }
}
