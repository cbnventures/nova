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
  Cli_Generate_MustHaves_Gitignore_Runner_AddPattern_Content,
  Cli_Generate_MustHaves_Gitignore_Runner_AddPattern_EndsWithNewline,
  Cli_Generate_MustHaves_Gitignore_Runner_AddPattern_Pattern,
  Cli_Generate_MustHaves_Gitignore_Runner_AddPattern_Returns,
  Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_Content,
  Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_Line,
  Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_Lines,
  Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_MarkerIndex,
  Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_Pattern,
  Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_Returns,
  Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_SectionStart,
  Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_Content,
  Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_Lines,
  Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_NewPattern,
  Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_OldPattern,
  Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_Replaced,
  Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_Returns,
  Cli_Generate_MustHaves_Gitignore_Runner_ParseAllPatterns_Content,
  Cli_Generate_MustHaves_Gitignore_Runner_ParseAllPatterns_Patterns,
  Cli_Generate_MustHaves_Gitignore_Runner_ParseAllPatterns_Returns,
  Cli_Generate_MustHaves_Gitignore_Runner_ParseAllPatterns_Trimmed,
  Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_Content,
  Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_ExcludeLine,
  Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_Line,
  Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_Lines,
  Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_MarkerIndex,
  Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_Patterns,
  Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_Returns,
  Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_StartIndex,
  Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_Trimmed,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Action,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ActionOutputKey,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ActionOutputValue,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_AddedContent,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_AddPatternOutputKey,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_AddPatternOutputValue,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_AddValue,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_AllPatterns,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Choices,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Content,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_CurrentContent,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_CurrentPatterns,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteChoices,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeletedContent,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteSelectedPattern,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteSelectOutput,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteSelectOutputKey,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteSelectOutputValue,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditChoices,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditedContent,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditNewPatternOutputKey,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditNewPatternOutputValue,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditSelectedPattern,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditSelectOutput,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditSelectOutputKey,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditSelectOutputValue,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditValue,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ExistingPatterns,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_HasPendingChanges,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_IsDryRun,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_IsReplaceFile,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_MenuOutput,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_NewPattern,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_NewPatternOutput,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Options,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_PatternName,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_PatternOutput,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ProjectExcludes,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Reconstructed,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ReservedPatterns,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Returns,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_TargetPath,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_TemplateContent,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_TemplateDirectory,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_TemplateFilePath,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_TrimmedNewPattern,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_TrimmedPatternName,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_UserPatterns,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ValidateAddPattern,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ValidateAddPattern_Returns,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ValidateAddPattern_TrimmedValue,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ValidateEditPattern,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ValidateEditPattern_Returns,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_AddMore,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Cancelled,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Content,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_CurrentDirectory,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_CustomEntries,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_EntryOutput,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_EntryOutputKey,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_EntryOutputResult,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_EntryOutputValue,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_FinalContent,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_IsDryRun,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_IsReplaceFile,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Options,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Returns,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_TargetPath,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_TemplateDirectory,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_TemplatePath,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_TrimmedEntry,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptWithCancel_Cancelled,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptWithCancel_Questions,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptWithCancel_Result,
  Cli_Generate_MustHaves_Gitignore_Runner_PromptWithCancel_Returns,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_CurrentDirectory,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_FileExists,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_IsAtProjectRoot,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_IsDryRun,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_IsReplaceFile,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_ManageResult,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeChoices,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeOutput,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeOutputKey,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeOutputResult,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeOutputValue,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_Options,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_RegenerateResult,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_ReplaceFileNotice,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_Result,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_Returns,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_SelectedMode,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_TargetPath,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_TemplateDirectory,
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
export class Runner {
  /**
   * CLI - Generate - Must Haves - Gitignore - Run.
   *
   * Called by the CLI index via executeCommand. Checks for an existing .gitignore and
   * routes to manage or regenerate mode based on user selection.
   *
   * @param {Cli_Generate_MustHaves_Gitignore_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Generate_MustHaves_Gitignore_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Generate_MustHaves_Gitignore_Runner_Run_Options): Cli_Generate_MustHaves_Gitignore_Runner_Run_Returns {
    const currentDirectory: Cli_Generate_MustHaves_Gitignore_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Generate_MustHaves_Gitignore_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: Cli_Generate_MustHaves_Gitignore_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Generate_MustHaves_Gitignore_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Generate_MustHaves_Gitignore_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const templateDirectory: Cli_Generate_MustHaves_Gitignore_Runner_Run_TemplateDirectory = resolveTemplatePath(import.meta.url, 'generators/must-haves/gitignore');
    const targetPath: Cli_Generate_MustHaves_Gitignore_Runner_Run_TargetPath = join(currentDirectory, '.gitignore');

    // Check if file already exists.
    let fileExists: Cli_Generate_MustHaves_Gitignore_Runner_Run_FileExists = false;

    try {
      await fs.access(targetPath);

      fileExists = true;
    } catch {
      // File does not exist.
    }

    // Prompt for mode if file exists.
    if (fileExists === true) {
      while (true) {
        const modeChoices: Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeChoices = [
          {
            title: 'Manage existing patterns',
            value: 'manage',
          },
          {
            title: 'Regenerate from template',
            value: 'regenerate',
          },
        ];

        const modeOutput: Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeOutput = await Runner.promptWithCancel<Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeOutputKey, Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeOutputValue>({
          type: 'select',
          name: 'mode',
          message: '.gitignore already exists. What would you like to do?',
          choices: modeChoices,
          initial: 0,
        });

        if (modeOutput['cancelled'] === true) {
          return 'cancelled';
        }

        const modeOutputResult: Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeOutputResult = modeOutput['result'];
        const selectedMode: Cli_Generate_MustHaves_Gitignore_Runner_Run_SelectedMode = modeOutputResult.mode;

        if (selectedMode === undefined) {
          return 'cancelled';
        }

        if (selectedMode === 'manage') {
          const manageResult: Cli_Generate_MustHaves_Gitignore_Runner_Run_ManageResult = await Runner.promptManageMenu({
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

        // "Regenerate" selected - run regenerate flow.
        const regenerateResult: Cli_Generate_MustHaves_Gitignore_Runner_Run_RegenerateResult = await Runner.promptRegenerate({
          templateDirectory,
          currentDirectory,
          isDryRun,
          isReplaceFile,
        });

        if (regenerateResult === 'cancelled') {
          continue;
        }

        return 'completed';
      }
    }

    // No file exists - go straight to regenerate.
    const result: Cli_Generate_MustHaves_Gitignore_Runner_Run_Result = await Runner.promptRegenerate({
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
   * @param {Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Options} options - Options.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Returns}
   *
   * @since 0.15.0
   */
  private static async promptRegenerate(options: Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Options): Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Returns {
    const templateDirectory: Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_TemplateDirectory = options['templateDirectory'];
    const currentDirectory: Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_CurrentDirectory = options['currentDirectory'];
    const isDryRun: Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_IsDryRun = options['isDryRun'];
    const isReplaceFile: Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_IsReplaceFile = options['isReplaceFile'];

    const customEntries: Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_CustomEntries = [];
    let addMore: Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_AddMore = true;
    let cancelled: Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Cancelled = false;

    while (addMore === true) {
      const entryOutput: Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_EntryOutput = await Runner.promptWithCancel<Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_EntryOutputKey, Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_EntryOutputValue>({
        type: 'text',
        name: 'entry',
        message: 'Pattern to ignore (leave empty to finish):',
      });

      if (entryOutput['cancelled'] === true) {
        cancelled = true;

        break;
      }

      const entryOutputResult: Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_EntryOutputResult = entryOutput['result'];

      if (entryOutputResult.entry === undefined || entryOutputResult.entry.trim() === '') {
        addMore = false;

        continue;
      }

      const trimmedEntry: Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_TrimmedEntry = entryOutputResult.entry.trim();

      customEntries.push(trimmedEntry);
    }

    if (cancelled === true) {
      return 'cancelled';
    }

    const templatePath: Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_TemplatePath = join(templateDirectory, 'gitignore');
    const targetPath: Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_TargetPath = join(currentDirectory, '.gitignore');

    let content: Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Content = undefined;

    try {
      content = await fs.readFile(templatePath, 'utf-8');
    } catch {
      Logger.customize({
        name: 'Runner.promptRegenerate',
        purpose: 'read',
      }).error(`Failed to read template "${templatePath}".`);

      return 'completed';
    }

    // Append custom patterns under the project excludes section.
    let finalContent: Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_FinalContent = content;

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
   * @param {Cli_Generate_MustHaves_Gitignore_Runner_ParseAllPatterns_Content} content - Content.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Gitignore_Runner_ParseAllPatterns_Returns}
   *
   * @since 0.15.0
   */
  private static parseAllPatterns(content: Cli_Generate_MustHaves_Gitignore_Runner_ParseAllPatterns_Content): Cli_Generate_MustHaves_Gitignore_Runner_ParseAllPatterns_Returns {
    const patterns: Cli_Generate_MustHaves_Gitignore_Runner_ParseAllPatterns_Patterns = [];

    for (const line of content.split('\n')) {
      const trimmed: Cli_Generate_MustHaves_Gitignore_Runner_ParseAllPatterns_Trimmed = line.trim();

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
   * @param {Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_Content} content - Content.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_Returns}
   *
   * @since 0.15.0
   */
  private static parseProjectExcludes(content: Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_Content): Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_Returns {
    const lines: Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_Lines = content.split('\n');
    let markerIndex: Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_MarkerIndex = -1;

    for (let i = 0; i < lines.length; i += 1) {
      const line: Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_Line = lines[i];

      if (line !== undefined && line.includes('#### Project Excludes ####') === true) {
        markerIndex = i;

        break;
      }
    }

    if (markerIndex === -1) {
      return [];
    }

    // Skip the marker line and the closing border line.
    const startIndex: Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_StartIndex = markerIndex + 2;
    const patterns: Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_Patterns = [];

    for (let i = startIndex; i < lines.length; i += 1) {
      const excludeLine: Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_ExcludeLine = lines[i];

      if (excludeLine === undefined) {
        continue;
      }

      const trimmed: Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_Trimmed = excludeLine.trim();

      if (
        trimmed !== ''
        && trimmed.startsWith('#') === false
        && LIB_REGEX_PATTERN_HASH_BORDER_LINE.test(excludeLine) === false
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
   * @param {Cli_Generate_MustHaves_Gitignore_Runner_AddPattern_Content} content - Content.
   * @param {Cli_Generate_MustHaves_Gitignore_Runner_AddPattern_Pattern} pattern - Pattern.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Gitignore_Runner_AddPattern_Returns}
   *
   * @since 0.15.0
   */
  private static addPattern(content: Cli_Generate_MustHaves_Gitignore_Runner_AddPattern_Content, pattern: Cli_Generate_MustHaves_Gitignore_Runner_AddPattern_Pattern): Cli_Generate_MustHaves_Gitignore_Runner_AddPattern_Returns {
    const endsWithNewline: Cli_Generate_MustHaves_Gitignore_Runner_AddPattern_EndsWithNewline = content.endsWith('\n');

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
   * @param {Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_Content}    content    - Content.
   * @param {Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_OldPattern} oldPattern - Old pattern.
   * @param {Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_NewPattern} newPattern - New pattern.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_Returns}
   *
   * @since 0.15.0
   */
  private static editPattern(content: Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_Content, oldPattern: Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_OldPattern, newPattern: Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_NewPattern): Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_Returns {
    const lines: Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_Lines = content.split('\n');
    let replaced: Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_Replaced = false;

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
   * @param {Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_Content} content - Content.
   * @param {Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_Pattern} pattern - Pattern.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_Returns}
   *
   * @since 0.15.0
   */
  private static deletePattern(content: Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_Content, pattern: Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_Pattern): Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_Returns {
    const lines: Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_Lines = content.split('\n');
    let markerIndex: Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_MarkerIndex = -1;

    for (let i = 0; i < lines.length; i += 1) {
      const line: Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_Line = lines[i];

      if (line !== undefined && line.includes('#### Project Excludes ####') === true) {
        markerIndex = i;

        break;
      }
    }

    if (markerIndex === -1) {
      return content;
    }

    // Only remove from the Project Excludes section.
    const sectionStart: Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_SectionStart = markerIndex + 2;

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
   * @param {Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Options} options - Options.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Returns}
   *
   * @since 0.15.0
   */
  private static async promptManageMenu(options: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Options): Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Returns {
    const templateDirectory: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_TemplateDirectory = options['templateDirectory'];
    const targetPath: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_TargetPath = options['targetPath'];
    const isDryRun: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_IsDryRun = options['isDryRun'];
    const isReplaceFile: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_IsReplaceFile = options['isReplaceFile'];

    const templateFilePath: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_TemplateFilePath = join(templateDirectory, 'gitignore');
    const templateContent: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_TemplateContent = await fs.readFile(templateFilePath, 'utf-8');
    const reservedPatterns: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ReservedPatterns = new Set(Runner.parseAllPatterns(templateContent));

    // Reconstruct file in memory: template + user's custom patterns under Project Excludes.
    let currentContent: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_CurrentContent = '';

    try {
      currentContent = await fs.readFile(targetPath, 'utf-8');
    } catch {
      // File may not exist.
    }

    const currentPatterns: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_CurrentPatterns = Runner.parseAllPatterns(currentContent);
    const userPatterns: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_UserPatterns = currentPatterns.filter(
      (pattern) => reservedPatterns.has(pattern) !== true,
    );

    let reconstructed: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Reconstructed = templateContent;

    if (userPatterns.length > 0) {
      reconstructed += `${userPatterns.join('\n')}\n`;
    }

    let hasPendingChanges: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_HasPendingChanges = false;

    while (true) {
      // Use in-memory buffer instead of reading from disk.
      const content: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Content = reconstructed;

      const allPatterns: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_AllPatterns = Runner.parseAllPatterns(content);
      const projectExcludes: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ProjectExcludes = Runner.parseProjectExcludes(content);

      // Build menu choices.
      const choices: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Choices = [{
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

      const menuOutput: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_MenuOutput = await Runner.promptWithCancel<Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ActionOutputKey, Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ActionOutputValue>({
        type: 'select',
        name: 'action',
        message: 'Select an action.',
        choices,
      });

      if (menuOutput['cancelled'] === true) {
        return 'back';
      }

      const action: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Action = menuOutput['result'].action;

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
        const existingPatterns: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ExistingPatterns = new Set(allPatterns);

        const validateAddPattern: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ValidateAddPattern = (addValue: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_AddValue): Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ValidateAddPattern_Returns => {
          if (typeof addValue !== 'string' || addValue.trim() === '') {
            return 'Enter a pattern.';
          }

          const trimmedValue: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ValidateAddPattern_TrimmedValue = addValue.trim();

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
        };

        const patternOutput: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_PatternOutput = await Runner.promptWithCancel<Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_AddPatternOutputKey, Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_AddPatternOutputValue>({
          type: 'text',
          name: 'pattern',
          message: 'Pattern to ignore (e.g. logs/):',
          validate: validateAddPattern,
        });

        if (patternOutput['cancelled'] === true) {
          continue;
        }

        const patternName: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_PatternName = patternOutput['result'].pattern;

        if (patternName === undefined) {
          continue;
        }

        const trimmedPatternName: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_TrimmedPatternName = patternName.trim();
        const addedContent: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_AddedContent = Runner.addPattern(content, trimmedPatternName);

        reconstructed = addedContent;
        hasPendingChanges = true;

        Logger.customize({
          name: 'Runner.promptManageMenu',
          purpose: 'add',
        }).info(`Added "${patternName.trim()}" to .gitignore.`);

        continue;
      }

      // Edit a pattern.
      if (action === 'edit') {
        const editChoices: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditChoices = projectExcludes.map((pattern) => ({
          title: pattern,
          value: pattern,
        }));

        const editSelectOutput: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditSelectOutput = await Runner.promptWithCancel<Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditSelectOutputKey, Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditSelectOutputValue>({
          type: 'select',
          name: 'pattern',
          message: 'Select a pattern to edit.',
          choices: editChoices,
        });

        if (editSelectOutput['cancelled'] === true) {
          continue;
        }

        const editSelectedPattern: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditSelectedPattern = editSelectOutput['result'].pattern;

        if (editSelectedPattern === undefined) {
          continue;
        }

        const validateEditPattern: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ValidateEditPattern = (editValue: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditValue): Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ValidateEditPattern_Returns => {
          if (typeof editValue !== 'string' || editValue.trim() === '') {
            return 'Enter a pattern.';
          }

          if (editValue.trim().startsWith('#') === true) {
            return 'Comments are not allowed.';
          }

          return true;
        };

        const newPatternOutput: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_NewPatternOutput = await Runner.promptWithCancel<Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditNewPatternOutputKey, Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditNewPatternOutputValue>({
          type: 'text',
          name: 'newPattern',
          message: `New pattern (current: "${editSelectedPattern}"):`,
          initial: editSelectedPattern,
          validate: validateEditPattern,
        });

        if (newPatternOutput['cancelled'] === true) {
          continue;
        }

        const newPattern: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_NewPattern = newPatternOutput['result'].newPattern;

        if (newPattern === undefined) {
          continue;
        }

        const trimmedNewPattern: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_TrimmedNewPattern = newPattern.trim();
        const editedContent: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditedContent = Runner.editPattern(content, editSelectedPattern, trimmedNewPattern);

        reconstructed = editedContent;
        hasPendingChanges = true;

        Logger.customize({
          name: 'Runner.promptManageMenu',
          purpose: 'edit',
        }).info(`Updated "${editSelectedPattern}" to "${newPattern.trim()}" in .gitignore.`);

        continue;
      }

      // Delete a pattern.
      if (action === 'delete') {
        const deleteChoices: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteChoices = projectExcludes.map((pattern) => ({
          title: pattern,
          value: pattern,
        }));

        const deleteSelectOutput: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteSelectOutput = await Runner.promptWithCancel<Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteSelectOutputKey, Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteSelectOutputValue>({
          type: 'select',
          name: 'pattern',
          message: 'Select a pattern to delete.',
          choices: deleteChoices,
        });

        if (deleteSelectOutput['cancelled'] === true) {
          continue;
        }

        const deleteSelectedPattern: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteSelectedPattern = deleteSelectOutput['result'].pattern;

        if (deleteSelectedPattern === undefined) {
          continue;
        }

        const deletedContent: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeletedContent = Runner.deletePattern(content, deleteSelectedPattern);

        reconstructed = deletedContent;
        hasPendingChanges = true;

        Logger.customize({
          name: 'Runner.promptManageMenu',
          purpose: 'delete',
        }).info(`Deleted "${deleteSelectedPattern}" from .gitignore.`);

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
   * @param {Cli_Generate_MustHaves_Gitignore_Runner_PromptWithCancel_Questions} questions - Questions.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Gitignore_Runner_PromptWithCancel_Returns}
   *
   * @since 0.15.0
   */
  private static async promptWithCancel<Keys extends string, Result>(questions: Cli_Generate_MustHaves_Gitignore_Runner_PromptWithCancel_Questions<Keys>): Cli_Generate_MustHaves_Gitignore_Runner_PromptWithCancel_Returns<Keys, Result> {
    let cancelled: Cli_Generate_MustHaves_Gitignore_Runner_PromptWithCancel_Cancelled = false;

    const result: Cli_Generate_MustHaves_Gitignore_Runner_PromptWithCancel_Result<Keys, Result> = await prompts<Keys>(questions, {
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
