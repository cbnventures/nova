import { promises as fs } from 'fs';
import { join } from 'path';

import prompts from 'prompts';

import {
  LIB_REGEX_PATTERN_DOUBLE_QUOTED_STRING_CAPTURE,
  LIB_REGEX_PATTERN_ENV_VAR_KEY,
  LIB_REGEX_PATTERN_ENV_VAR_KEY_SCREAMING_SNAKE,
  LIB_REGEX_PATTERN_LEADING_DOT,
} from '../../../lib/regex.js';
import {
  isProjectRoot,
  resolveTemplatePath,
  saveGeneratedFile,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  CliGenerateMustHavesDotenvAddEnvLineContent,
  CliGenerateMustHavesDotenvAddEnvLineEndsWithNewline,
  CliGenerateMustHavesDotenvAddEnvLineKey,
  CliGenerateMustHavesDotenvAddEnvLineNewLine,
  CliGenerateMustHavesDotenvAddEnvLineReturns,
  CliGenerateMustHavesDotenvAddEnvLineValue,
  CliGenerateMustHavesDotenvDeleteEnvLineContent,
  CliGenerateMustHavesDotenvDeleteEnvLineKey,
  CliGenerateMustHavesDotenvDeleteEnvLineLines,
  CliGenerateMustHavesDotenvDeleteEnvLineMatch,
  CliGenerateMustHavesDotenvDeleteEnvLineReturns,
  CliGenerateMustHavesDotenvParseEnvFileContent,
  CliGenerateMustHavesDotenvParseEnvFileKey,
  CliGenerateMustHavesDotenvParseEnvFileMatch,
  CliGenerateMustHavesDotenvParseEnvFileRawValue,
  CliGenerateMustHavesDotenvParseEnvFileReturns,
  CliGenerateMustHavesDotenvParseEnvFileValue,
  CliGenerateMustHavesDotenvPromptManageMenuAction,
  CliGenerateMustHavesDotenvPromptManageMenuActionOutputKey,
  CliGenerateMustHavesDotenvPromptManageMenuActionOutputValue,
  CliGenerateMustHavesDotenvPromptManageMenuAddDefaultValue,
  CliGenerateMustHavesDotenvPromptManageMenuAddDefaultValueOutput,
  CliGenerateMustHavesDotenvPromptManageMenuAddDefaultValueOutputKey,
  CliGenerateMustHavesDotenvPromptManageMenuAddDefaultValueOutputValue,
  CliGenerateMustHavesDotenvPromptManageMenuAddExistingKeys,
  CliGenerateMustHavesDotenvPromptManageMenuAddKeyName,
  CliGenerateMustHavesDotenvPromptManageMenuAddKeyOutput,
  CliGenerateMustHavesDotenvPromptManageMenuAddKeyOutputKey,
  CliGenerateMustHavesDotenvPromptManageMenuAddKeyOutputValue,
  CliGenerateMustHavesDotenvPromptManageMenuAddTrimmedDefaultValue,
  CliGenerateMustHavesDotenvPromptManageMenuAddTrimmedKeyName,
  CliGenerateMustHavesDotenvPromptManageMenuAddTrimmedValue,
  CliGenerateMustHavesDotenvPromptManageMenuAddUpdatedEnv,
  CliGenerateMustHavesDotenvPromptManageMenuAddUpdatedSample,
  CliGenerateMustHavesDotenvPromptManageMenuAddValidateValue,
  CliGenerateMustHavesDotenvPromptManageMenuBufferEnv,
  CliGenerateMustHavesDotenvPromptManageMenuBufferEnvSample,
  CliGenerateMustHavesDotenvPromptManageMenuChoices,
  CliGenerateMustHavesDotenvPromptManageMenuDeletableEntries,
  CliGenerateMustHavesDotenvPromptManageMenuDeleteChoices,
  CliGenerateMustHavesDotenvPromptManageMenuDeleteSelectedKey,
  CliGenerateMustHavesDotenvPromptManageMenuDeleteSelectOutput,
  CliGenerateMustHavesDotenvPromptManageMenuDeleteSelectOutputKey,
  CliGenerateMustHavesDotenvPromptManageMenuDeleteSelectOutputValue,
  CliGenerateMustHavesDotenvPromptManageMenuDeleteUpdatedEnv,
  CliGenerateMustHavesDotenvPromptManageMenuDeleteUpdatedSample,
  CliGenerateMustHavesDotenvPromptManageMenuEditChoices,
  CliGenerateMustHavesDotenvPromptManageMenuEditCurrentEnvEntry,
  CliGenerateMustHavesDotenvPromptManageMenuEditCurrentSampleEntry,
  CliGenerateMustHavesDotenvPromptManageMenuEditEnvValueOutput,
  CliGenerateMustHavesDotenvPromptManageMenuEditEnvValueOutputKey,
  CliGenerateMustHavesDotenvPromptManageMenuEditEnvValueOutputValue,
  CliGenerateMustHavesDotenvPromptManageMenuEditNewEnvValue,
  CliGenerateMustHavesDotenvPromptManageMenuEditNewSampleValue,
  CliGenerateMustHavesDotenvPromptManageMenuEditSampleValueOutput,
  CliGenerateMustHavesDotenvPromptManageMenuEditSampleValueOutputKey,
  CliGenerateMustHavesDotenvPromptManageMenuEditSampleValueOutputValue,
  CliGenerateMustHavesDotenvPromptManageMenuEditSelectedKey,
  CliGenerateMustHavesDotenvPromptManageMenuEditSelectOutput,
  CliGenerateMustHavesDotenvPromptManageMenuEditSelectOutputKey,
  CliGenerateMustHavesDotenvPromptManageMenuEditSelectOutputValue,
  CliGenerateMustHavesDotenvPromptManageMenuEditUpdatedEnv,
  CliGenerateMustHavesDotenvPromptManageMenuEditUpdatedSample,
  CliGenerateMustHavesDotenvPromptManageMenuEnvContent,
  CliGenerateMustHavesDotenvPromptManageMenuEnvEntries,
  CliGenerateMustHavesDotenvPromptManageMenuEnvPath,
  CliGenerateMustHavesDotenvPromptManageMenuEnvSampleContent,
  CliGenerateMustHavesDotenvPromptManageMenuEnvSampleEntries,
  CliGenerateMustHavesDotenvPromptManageMenuEnvSamplePath,
  CliGenerateMustHavesDotenvPromptManageMenuHasPendingChanges,
  CliGenerateMustHavesDotenvPromptManageMenuIsDryRun,
  CliGenerateMustHavesDotenvPromptManageMenuIsReplaceFile,
  CliGenerateMustHavesDotenvPromptManageMenuMenuOutput,
  CliGenerateMustHavesDotenvPromptManageMenuOptions,
  CliGenerateMustHavesDotenvPromptManageMenuReservedKeys,
  CliGenerateMustHavesDotenvPromptManageMenuReturns,
  CliGenerateMustHavesDotenvPromptManageMenuTemplateContent,
  CliGenerateMustHavesDotenvPromptManageMenuTemplateDirectory,
  CliGenerateMustHavesDotenvPromptManageMenuTemplateFilePath,
  CliGenerateMustHavesDotenvPromptRegenerateAddMore,
  CliGenerateMustHavesDotenvPromptRegenerateAppendSection,
  CliGenerateMustHavesDotenvPromptRegenerateCancelled,
  CliGenerateMustHavesDotenvPromptRegenerateContent,
  CliGenerateMustHavesDotenvPromptRegenerateCurrentDirectory,
  CliGenerateMustHavesDotenvPromptRegenerateDefaultValueOutput,
  CliGenerateMustHavesDotenvPromptRegenerateDefaultValueOutputKey,
  CliGenerateMustHavesDotenvPromptRegenerateDefaultValueOutputResult,
  CliGenerateMustHavesDotenvPromptRegenerateDefaultValueOutputValue,
  CliGenerateMustHavesDotenvPromptRegenerateEnvLines,
  CliGenerateMustHavesDotenvPromptRegenerateFiles,
  CliGenerateMustHavesDotenvPromptRegenerateIsDryRun,
  CliGenerateMustHavesDotenvPromptRegenerateIsReplaceFile,
  CliGenerateMustHavesDotenvPromptRegenerateKeyOutput,
  CliGenerateMustHavesDotenvPromptRegenerateKeyOutputKey,
  CliGenerateMustHavesDotenvPromptRegenerateKeyOutputResult,
  CliGenerateMustHavesDotenvPromptRegenerateKeyOutputValue,
  CliGenerateMustHavesDotenvPromptRegenerateOptions,
  CliGenerateMustHavesDotenvPromptRegenerateReturns,
  CliGenerateMustHavesDotenvPromptRegenerateSampleLines,
  CliGenerateMustHavesDotenvPromptRegenerateTargetPath,
  CliGenerateMustHavesDotenvPromptRegenerateTemplateDirectory,
  CliGenerateMustHavesDotenvPromptRegenerateTemplateFileName,
  CliGenerateMustHavesDotenvPromptRegenerateTemplatePath,
  CliGenerateMustHavesDotenvPromptRegenerateTrimmedValue,
  CliGenerateMustHavesDotenvPromptRegenerateValidateValue,
  CliGenerateMustHavesDotenvPromptWithCancelCancelled,
  CliGenerateMustHavesDotenvPromptWithCancelQuestions,
  CliGenerateMustHavesDotenvPromptWithCancelResult,
  CliGenerateMustHavesDotenvPromptWithCancelReturns,
  CliGenerateMustHavesDotenvRunCurrentDirectory,
  CliGenerateMustHavesDotenvRunCustomSection,
  CliGenerateMustHavesDotenvRunEnvPath,
  CliGenerateMustHavesDotenvRunEnvPathExists,
  CliGenerateMustHavesDotenvRunEnvSamplePath,
  CliGenerateMustHavesDotenvRunEnvSamplePathExists,
  CliGenerateMustHavesDotenvRunEnvVars,
  CliGenerateMustHavesDotenvRunIsAtProjectRoot,
  CliGenerateMustHavesDotenvRunIsDryRun,
  CliGenerateMustHavesDotenvRunIsReplaceFile,
  CliGenerateMustHavesDotenvRunManageResult,
  CliGenerateMustHavesDotenvRunModeChoices,
  CliGenerateMustHavesDotenvRunModeOutput,
  CliGenerateMustHavesDotenvRunModeOutputKey,
  CliGenerateMustHavesDotenvRunModeOutputResult,
  CliGenerateMustHavesDotenvRunModeOutputValue,
  CliGenerateMustHavesDotenvRunOptions,
  CliGenerateMustHavesDotenvRunReplaceFileNotice,
  CliGenerateMustHavesDotenvRunResult,
  CliGenerateMustHavesDotenvRunReturns,
  CliGenerateMustHavesDotenvRunSelectedMode,
  CliGenerateMustHavesDotenvRunTemplateDirectory,
  CliGenerateMustHavesDotenvUpdateEnvLineContent,
  CliGenerateMustHavesDotenvUpdateEnvLineKey,
  CliGenerateMustHavesDotenvUpdateEnvLineLines,
  CliGenerateMustHavesDotenvUpdateEnvLineMatch,
  CliGenerateMustHavesDotenvUpdateEnvLineNewValue,
  CliGenerateMustHavesDotenvUpdateEnvLineReturns,
} from '../../../types/cli/generate/must-haves/dotenv.d.ts';

/**
 * CLI - Generate - Must Haves - Dotenv.
 *
 * Generates and manages paired .env and .env.sample files from bundled templates. Keeps both
 * files in sync when adding or deleting variables.
 *
 * @since 0.15.0
 */
export class CliGenerateMustHavesDotenv {
  /**
   * CLI - Generate - Must Haves - Dotenv - Run.
   *
   * Called by the CLI index via executeCommand. Checks for existing .env files and routes to
   * manage or regenerate mode based on user selection.
   *
   * @param {CliGenerateMustHavesDotenvRunOptions} options - Options.
   *
   * @returns {CliGenerateMustHavesDotenvRunReturns}
   *
   * @since 0.15.0
   */
  public static async run(options: CliGenerateMustHavesDotenvRunOptions): CliGenerateMustHavesDotenvRunReturns {
    const currentDirectory: CliGenerateMustHavesDotenvRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliGenerateMustHavesDotenvRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: CliGenerateMustHavesDotenvRunIsDryRun = options['dryRun'] === true;
    const isReplaceFile: CliGenerateMustHavesDotenvRunIsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliGenerateMustHavesDotenv.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: CliGenerateMustHavesDotenvRunReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CliGenerateMustHavesDotenv.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const templateDirectory: CliGenerateMustHavesDotenvRunTemplateDirectory = resolveTemplatePath(import.meta.url, 'generators/must-haves/dotenv');
    const envPath: CliGenerateMustHavesDotenvRunEnvPath = join(currentDirectory, '.env');
    const envSamplePath: CliGenerateMustHavesDotenvRunEnvSamplePath = join(currentDirectory, '.env.sample');

    // Check if files already exist.
    let envPathExists: CliGenerateMustHavesDotenvRunEnvPathExists = false;
    let envSamplePathExists: CliGenerateMustHavesDotenvRunEnvSamplePathExists = false;

    try {
      await fs.access(envPath);

      envPathExists = true;
    } catch {
      // File does not exist.
    }

    try {
      await fs.access(envSamplePath);

      envSamplePathExists = true;
    } catch {
      // File does not exist.
    }

    // Prompt for mode if files exist.
    if (envPathExists === true || envSamplePathExists === true) {
      while (true) {
        const modeChoices: CliGenerateMustHavesDotenvRunModeChoices = [
          {
            title: 'Manage existing variables',
            value: 'manage',
          },
          {
            title: 'Regenerate from template',
            value: 'regenerate',
          },
        ];

        const modeOutput: CliGenerateMustHavesDotenvRunModeOutput = await CliGenerateMustHavesDotenv.promptWithCancel<CliGenerateMustHavesDotenvRunModeOutputKey, CliGenerateMustHavesDotenvRunModeOutputValue>({
          type: 'select',
          name: 'mode',
          message: 'Existing .env file(s) found. What would you like to do?',
          choices: modeChoices,
          initial: 0,
        });

        if (modeOutput['cancelled'] === true) {
          return 'cancelled';
        }

        const modeOutputResult: CliGenerateMustHavesDotenvRunModeOutputResult = modeOutput['result'];
        const selectedMode: CliGenerateMustHavesDotenvRunSelectedMode = modeOutputResult.mode;

        if (selectedMode === undefined) {
          return 'cancelled';
        }

        if (selectedMode === 'manage') {
          const manageResult: CliGenerateMustHavesDotenvRunManageResult = await CliGenerateMustHavesDotenv.promptManageMenu({
            templateDirectory,
            envPath,
            envSamplePath,
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
        const result: CliGenerateMustHavesDotenvRunResult = await CliGenerateMustHavesDotenv.promptRegenerate({
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

    // No files exist — go straight to regenerate.
    const result: CliGenerateMustHavesDotenvRunResult = await CliGenerateMustHavesDotenv.promptRegenerate({
      templateDirectory,
      currentDirectory,
      isDryRun,
      isReplaceFile,
    });

    return (result === 'cancelled') ? 'cancelled' : 'completed';
  }

  /**
   * CLI - Generate - Must Haves - Dotenv - Prompt Regenerate.
   *
   * Rebuilds both .env and .env.sample from templates.
   * Prompts for custom variable names and default values
   * that are appended after the template content.
   *
   * @param {CliGenerateMustHavesDotenvPromptRegenerateOptions} options - Options.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesDotenvPromptRegenerateReturns}
   *
   * @since 0.15.0
   */
  private static async promptRegenerate(options: CliGenerateMustHavesDotenvPromptRegenerateOptions): CliGenerateMustHavesDotenvPromptRegenerateReturns {
    const templateDirectory: CliGenerateMustHavesDotenvPromptRegenerateTemplateDirectory = options['templateDirectory'];
    const currentDirectory: CliGenerateMustHavesDotenvPromptRegenerateCurrentDirectory = options['currentDirectory'];
    const isDryRun: CliGenerateMustHavesDotenvPromptRegenerateIsDryRun = options['isDryRun'];
    const isReplaceFile: CliGenerateMustHavesDotenvPromptRegenerateIsReplaceFile = options['isReplaceFile'];

    const files: CliGenerateMustHavesDotenvPromptRegenerateFiles = [
      '.env',
      '.env.sample',
    ];
    const envVars: CliGenerateMustHavesDotenvRunEnvVars = [];
    let addMore: CliGenerateMustHavesDotenvPromptRegenerateAddMore = true;
    let cancelled: CliGenerateMustHavesDotenvPromptRegenerateCancelled = false;

    while (addMore === true) {
      const keyOutput: CliGenerateMustHavesDotenvPromptRegenerateKeyOutput = await CliGenerateMustHavesDotenv.promptWithCancel<CliGenerateMustHavesDotenvPromptRegenerateKeyOutputKey, CliGenerateMustHavesDotenvPromptRegenerateKeyOutputValue>({
        type: 'text',
        name: 'key',
        message: 'Variable name (leave empty to finish):',
        validate: (value: CliGenerateMustHavesDotenvPromptRegenerateValidateValue) => {
          if (typeof value !== 'string' || value.trim() === '') {
            return true;
          }

          const trimmedValue: CliGenerateMustHavesDotenvPromptRegenerateTrimmedValue = value.trim();

          if (LIB_REGEX_PATTERN_ENV_VAR_KEY_SCREAMING_SNAKE.test(trimmedValue) !== true) {
            return 'Use SCREAMING_SNAKE_CASE (e.g. API_KEY).';
          }

          return true;
        },
      });

      if (keyOutput['cancelled'] === true) {
        cancelled = true;

        break;
      }

      const keyOutputResult: CliGenerateMustHavesDotenvPromptRegenerateKeyOutputResult = keyOutput['result'];

      if (keyOutputResult.key === undefined || keyOutputResult.key.trim() === '') {
        addMore = false;

        continue;
      }

      // Prompt for the default value.
      const defaultValueOutput: CliGenerateMustHavesDotenvPromptRegenerateDefaultValueOutput = await CliGenerateMustHavesDotenv.promptWithCancel<CliGenerateMustHavesDotenvPromptRegenerateDefaultValueOutputKey, CliGenerateMustHavesDotenvPromptRegenerateDefaultValueOutputValue>({
        type: 'text',
        name: 'defaultValue',
        message: 'Default value (leave empty for none):',
        initial: '',
      });

      if (defaultValueOutput['cancelled'] === true) {
        cancelled = true;

        break;
      }

      const defaultValueOutputResult: CliGenerateMustHavesDotenvPromptRegenerateDefaultValueOutputResult = defaultValueOutput['result'];

      if (defaultValueOutputResult.defaultValue === undefined) {
        cancelled = true;

        break;
      }

      envVars.push({
        key: keyOutputResult.key.trim(),
        defaultValue: defaultValueOutputResult.defaultValue.trim(),
      });
    }

    if (cancelled === true) {
      return 'cancelled';
    }

    // Build the custom variables lines.
    let customSection: CliGenerateMustHavesDotenvRunCustomSection = '';
    let customSectionSample: CliGenerateMustHavesDotenvRunCustomSection = '';

    if (envVars.length > 0) {
      const envLines: CliGenerateMustHavesDotenvPromptRegenerateEnvLines = [];

      for (const envVar of envVars) {
        envLines.push(`${envVar['key']}=""`);
      }

      customSection = envLines.join('\n');

      const sampleLines: CliGenerateMustHavesDotenvPromptRegenerateSampleLines = [];

      for (const envVar of envVars) {
        sampleLines.push(`${envVar['key']}="${envVar['defaultValue']}"`);
      }

      customSectionSample = sampleLines.join('\n');
    }

    for (const fileName of files) {
      const templateFileName: CliGenerateMustHavesDotenvPromptRegenerateTemplateFileName = fileName.replace(LIB_REGEX_PATTERN_LEADING_DOT, '');
      const templatePath: CliGenerateMustHavesDotenvPromptRegenerateTemplatePath = join(templateDirectory, templateFileName);
      const targetPath: CliGenerateMustHavesDotenvPromptRegenerateTargetPath = join(currentDirectory, fileName);

      let content: CliGenerateMustHavesDotenvPromptRegenerateContent = undefined;

      try {
        content = await fs.readFile(templatePath, 'utf-8');
      } catch {
        Logger.customize({
          name: 'CliGenerateMustHavesDotenv.promptRegenerate',
          purpose: 'read',
        }).error(`Failed to read template "${templatePath}". Skipping ...`);

        continue;
      }

      // Append custom variables under the project variables section.
      const appendSection: CliGenerateMustHavesDotenvPromptRegenerateAppendSection = (fileName === '.env.sample') ? customSectionSample : customSection;

      if (appendSection !== '') {
        content = `${content}${appendSection}\n`;
      }

      if (isDryRun === true) {
        continue;
      }

      await saveGeneratedFile(targetPath, content, isReplaceFile, {
        command: 'nova generate must-haves dotenv',
        docsSlug: 'cli/generators/must-haves/dotenv',
        mode: (fileName === '.env') ? 'fillable' : 'strict',
      });
    }

    return 'completed';
  }

  /**
   * CLI - Generate - Must Haves - Dotenv - Parse Env File.
   *
   * Extracts key-value pairs from .env file content using regex matching. Used by
   * promptManageMenu to populate edit choices and detect reserved keys.
   *
   * @param {CliGenerateMustHavesDotenvParseEnvFileContent} content - Content.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesDotenvParseEnvFileReturns}
   *
   * @since 0.15.0
   */
  private static parseEnvFile(content: CliGenerateMustHavesDotenvParseEnvFileContent): CliGenerateMustHavesDotenvParseEnvFileReturns {
    const entries: CliGenerateMustHavesDotenvParseEnvFileReturns = [];

    for (const line of content.split('\n')) {
      const match: CliGenerateMustHavesDotenvParseEnvFileMatch = line.match(LIB_REGEX_PATTERN_ENV_VAR_KEY);

      if (match !== null && match[1] !== undefined) {
        const key: CliGenerateMustHavesDotenvParseEnvFileKey = match[1];
        const rawValue: CliGenerateMustHavesDotenvParseEnvFileRawValue = line.slice(line.indexOf('=') + 1);
        const value: CliGenerateMustHavesDotenvParseEnvFileValue = rawValue.replace(LIB_REGEX_PATTERN_DOUBLE_QUOTED_STRING_CAPTURE, '$1');

        entries.push({
          key,
          value,
        });
      }
    }

    return entries;
  }

  /**
   * CLI - Generate - Must Haves - Dotenv - Update Env Line.
   *
   * Replaces the value of an existing environment variable by matching its key. Called by the
   * edit action in promptManageMenu for both files.
   *
   * @param {CliGenerateMustHavesDotenvUpdateEnvLineContent}  content  - Content.
   * @param {CliGenerateMustHavesDotenvUpdateEnvLineKey}      key      - Key.
   * @param {CliGenerateMustHavesDotenvUpdateEnvLineNewValue} newValue - New value.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesDotenvUpdateEnvLineReturns}
   *
   * @since 0.15.0
   */
  private static updateEnvLine(content: CliGenerateMustHavesDotenvUpdateEnvLineContent, key: CliGenerateMustHavesDotenvUpdateEnvLineKey, newValue: CliGenerateMustHavesDotenvUpdateEnvLineNewValue): CliGenerateMustHavesDotenvUpdateEnvLineReturns {
    const lines: CliGenerateMustHavesDotenvUpdateEnvLineLines = content.split('\n');

    return lines.map((line) => {
      const match: CliGenerateMustHavesDotenvUpdateEnvLineMatch = line.match(LIB_REGEX_PATTERN_ENV_VAR_KEY);

      if (match !== null && match[1] === key) {
        return `${key}="${newValue}"`;
      }

      return line;
    }).join('\n');
  }

  /**
   * CLI - Generate - Must Haves - Dotenv - Delete Env Line.
   *
   * Filters out all lines matching the given key from the file content. Called by the delete
   * action in promptManageMenu for both files.
   *
   * @param {CliGenerateMustHavesDotenvDeleteEnvLineContent} content - Content.
   * @param {CliGenerateMustHavesDotenvDeleteEnvLineKey}     key     - Key.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesDotenvDeleteEnvLineReturns}
   *
   * @since 0.15.0
   */
  private static deleteEnvLine(content: CliGenerateMustHavesDotenvDeleteEnvLineContent, key: CliGenerateMustHavesDotenvDeleteEnvLineKey): CliGenerateMustHavesDotenvDeleteEnvLineReturns {
    const lines: CliGenerateMustHavesDotenvDeleteEnvLineLines = content.split('\n');

    return lines.filter((line) => {
      const match: CliGenerateMustHavesDotenvDeleteEnvLineMatch = line.match(LIB_REGEX_PATTERN_ENV_VAR_KEY);

      return !(match !== null && match[1] === key);
    }).join('\n');
  }

  /**
   * CLI - Generate - Must Haves - Dotenv - Add Env Line.
   *
   * Appends a new KEY="value" line to the end of the file content. Ensures a trailing newline
   * exists before inserting the new entry.
   *
   * @param {CliGenerateMustHavesDotenvAddEnvLineContent} content - Content.
   * @param {CliGenerateMustHavesDotenvAddEnvLineKey}     key     - Key.
   * @param {CliGenerateMustHavesDotenvAddEnvLineValue}   value   - Value.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesDotenvAddEnvLineReturns}
   *
   * @since 0.15.0
   */
  private static addEnvLine(content: CliGenerateMustHavesDotenvAddEnvLineContent, key: CliGenerateMustHavesDotenvAddEnvLineKey, value: CliGenerateMustHavesDotenvAddEnvLineValue): CliGenerateMustHavesDotenvAddEnvLineReturns {
    const endsWithNewline: CliGenerateMustHavesDotenvAddEnvLineEndsWithNewline = content.endsWith('\n');

    const newLine: CliGenerateMustHavesDotenvAddEnvLineNewLine = `${key}="${value}"`;

    return (endsWithNewline === true) ? `${content}${newLine}\n` : [
      `${content}\n`,
      `${newLine}\n`,
    ].join('');
  }

  /**
   * CLI - Generate - Must Haves - Dotenv - Prompt Manage Menu.
   *
   * Presents an interactive loop for adding, editing, or deleting variables across both .env
   * files. Template-defined keys are protected.
   *
   * @param {CliGenerateMustHavesDotenvPromptManageMenuOptions} options - Options.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesDotenvPromptManageMenuReturns}
   *
   * @since 0.15.0
   */
  private static async promptManageMenu(options: CliGenerateMustHavesDotenvPromptManageMenuOptions): CliGenerateMustHavesDotenvPromptManageMenuReturns {
    const templateDirectory: CliGenerateMustHavesDotenvPromptManageMenuTemplateDirectory = options['templateDirectory'];
    const envPath: CliGenerateMustHavesDotenvPromptManageMenuEnvPath = options['envPath'];
    const envSamplePath: CliGenerateMustHavesDotenvPromptManageMenuEnvSamplePath = options['envSamplePath'];
    const isDryRun: CliGenerateMustHavesDotenvPromptManageMenuIsDryRun = options['isDryRun'];
    const isReplaceFile: CliGenerateMustHavesDotenvPromptManageMenuIsReplaceFile = options['isReplaceFile'];

    const templateFilePath: CliGenerateMustHavesDotenvPromptManageMenuTemplateFilePath = join(templateDirectory, 'env');
    const templateContent: CliGenerateMustHavesDotenvPromptManageMenuTemplateContent = await fs.readFile(templateFilePath, 'utf-8');
    const reservedKeys: CliGenerateMustHavesDotenvPromptManageMenuReservedKeys = new Set(CliGenerateMustHavesDotenv.parseEnvFile(templateContent).map((entry) => entry['key']));

    // Initialize in-memory buffers from existing files or templates.
    let bufferEnv: CliGenerateMustHavesDotenvPromptManageMenuBufferEnv = '';
    let bufferEnvSample: CliGenerateMustHavesDotenvPromptManageMenuBufferEnvSample = '';

    try {
      bufferEnv = await fs.readFile(envPath, 'utf-8');
    } catch {
      // File does not exist — use template as initial buffer.
      try {
        bufferEnv = await fs.readFile(join(templateDirectory, 'env'), 'utf-8');
      } catch {
        // Template also missing.
      }
    }

    try {
      bufferEnvSample = await fs.readFile(envSamplePath, 'utf-8');
    } catch {
      // File does not exist — use template as initial buffer.
      try {
        bufferEnvSample = await fs.readFile(join(templateDirectory, 'env.sample'), 'utf-8');
      } catch {
        // Template also missing.
      }
    }

    let hasPendingChanges: CliGenerateMustHavesDotenvPromptManageMenuHasPendingChanges = false;

    while (true) {
      // Use in-memory buffers instead of reading from disk.
      const envContent: CliGenerateMustHavesDotenvPromptManageMenuEnvContent = bufferEnv;
      const envSampleContent: CliGenerateMustHavesDotenvPromptManageMenuEnvSampleContent = bufferEnvSample;

      const envEntries: CliGenerateMustHavesDotenvPromptManageMenuEnvEntries = CliGenerateMustHavesDotenv.parseEnvFile(envContent);
      const envSampleEntries: CliGenerateMustHavesDotenvPromptManageMenuEnvSampleEntries = CliGenerateMustHavesDotenv.parseEnvFile(envSampleContent);
      const deletableEntries: CliGenerateMustHavesDotenvPromptManageMenuDeletableEntries = envEntries.filter(
        (entry) => reservedKeys.has(entry['key']) !== true,
      );

      // Build menu choices.
      const choices: CliGenerateMustHavesDotenvPromptManageMenuChoices = [{
        title: 'Add a variable',
        description: 'Add a new environment variable to both files',
        value: 'add',
      }];

      if (envEntries.length > 0) {
        choices.push({
          title: 'Edit a variable',
          description: 'Update the value of an existing variable',
          value: 'edit',
        });
      }

      if (deletableEntries.length > 0) {
        choices.push({
          title: 'Delete a variable',
          description: 'Remove a variable from both files',
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

      const menuOutput: CliGenerateMustHavesDotenvPromptManageMenuMenuOutput = await CliGenerateMustHavesDotenv.promptWithCancel<CliGenerateMustHavesDotenvPromptManageMenuActionOutputKey, CliGenerateMustHavesDotenvPromptManageMenuActionOutputValue>({
        type: 'select',
        name: 'action',
        message: 'Select an action.',
        choices,
      });

      if (menuOutput['cancelled'] === true) {
        return 'back';
      }

      const action: CliGenerateMustHavesDotenvPromptManageMenuAction = menuOutput['result'].action;

      if (action === undefined || action === 'back') {
        return 'back';
      }

      if (action === 'exit') {
        if (hasPendingChanges === true && isDryRun !== true) {
          await saveGeneratedFile(envPath, bufferEnv, isReplaceFile, {
            command: 'nova generate must-haves dotenv',
            docsSlug: 'cli/generators/must-haves/dotenv',
            mode: 'fillable',
          });
          await saveGeneratedFile(envSamplePath, bufferEnvSample, isReplaceFile, {
            command: 'nova generate must-haves dotenv',
            docsSlug: 'cli/generators/must-haves/dotenv',
            mode: 'strict',
          });
        }

        return 'exit';
      }

      // Add a variable.
      if (action === 'add') {
        const existingKeys: CliGenerateMustHavesDotenvPromptManageMenuAddExistingKeys = new Set(envEntries.map((entry) => entry['key']));

        const keyOutput: CliGenerateMustHavesDotenvPromptManageMenuAddKeyOutput = await CliGenerateMustHavesDotenv.promptWithCancel<CliGenerateMustHavesDotenvPromptManageMenuAddKeyOutputKey, CliGenerateMustHavesDotenvPromptManageMenuAddKeyOutputValue>({
          type: 'text',
          name: 'key',
          message: 'Variable name (e.g. API_KEY):',
          validate: (value: CliGenerateMustHavesDotenvPromptManageMenuAddValidateValue) => {
            if (typeof value !== 'string' || value.trim() === '') {
              return 'Enter a variable name.';
            }

            const trimmedValue: CliGenerateMustHavesDotenvPromptManageMenuAddTrimmedValue = value.trim();

            if (LIB_REGEX_PATTERN_ENV_VAR_KEY_SCREAMING_SNAKE.test(trimmedValue) !== true) {
              return 'Use SCREAMING_SNAKE_CASE (e.g. API_KEY).';
            }

            if (existingKeys.has(trimmedValue) === true) {
              return `"${trimmedValue}" already exists.`;
            }

            if (reservedKeys.has(trimmedValue) === true) {
              return `"${trimmedValue}" is a reserved variable and cannot be added.`;
            }

            return true;
          },
        });

        if (keyOutput['cancelled'] === true) {
          continue;
        }

        const keyName: CliGenerateMustHavesDotenvPromptManageMenuAddKeyName = keyOutput['result'].key;

        if (keyName === undefined) {
          continue;
        }

        const defaultValueOutput: CliGenerateMustHavesDotenvPromptManageMenuAddDefaultValueOutput = await CliGenerateMustHavesDotenv.promptWithCancel<CliGenerateMustHavesDotenvPromptManageMenuAddDefaultValueOutputKey, CliGenerateMustHavesDotenvPromptManageMenuAddDefaultValueOutputValue>({
          type: 'text',
          name: 'defaultValue',
          message: 'Default value for .env.sample (leave empty for none):',
          initial: '',
        });

        if (defaultValueOutput['cancelled'] === true) {
          continue;
        }

        const defaultValue: CliGenerateMustHavesDotenvPromptManageMenuAddDefaultValue = defaultValueOutput['result'].defaultValue ?? '';
        const trimmedKeyName: CliGenerateMustHavesDotenvPromptManageMenuAddTrimmedKeyName = keyName.trim();
        const trimmedDefaultValue: CliGenerateMustHavesDotenvPromptManageMenuAddTrimmedDefaultValue = defaultValue.trim();
        const updatedEnv: CliGenerateMustHavesDotenvPromptManageMenuAddUpdatedEnv = CliGenerateMustHavesDotenv.addEnvLine(envContent, trimmedKeyName, '');
        const updatedSample: CliGenerateMustHavesDotenvPromptManageMenuAddUpdatedSample = CliGenerateMustHavesDotenv.addEnvLine(envSampleContent, trimmedKeyName, trimmedDefaultValue);

        bufferEnv = updatedEnv;
        bufferEnvSample = updatedSample;
        hasPendingChanges = true;

        Logger.customize({
          name: 'CliGenerateMustHavesDotenv.promptManageMenu',
          purpose: 'add',
        }).info(`Added "${keyName.trim()}" to both files.`);

        continue;
      }

      // Edit a variable.
      if (action === 'edit') {
        const editChoices: CliGenerateMustHavesDotenvPromptManageMenuEditChoices = envEntries.map((entry) => ({
          title: entry['key'],
          description: `Current value: "${entry['value']}"`,
          value: entry['key'],
        }));

        const selectOutput: CliGenerateMustHavesDotenvPromptManageMenuEditSelectOutput = await CliGenerateMustHavesDotenv.promptWithCancel<CliGenerateMustHavesDotenvPromptManageMenuEditSelectOutputKey, CliGenerateMustHavesDotenvPromptManageMenuEditSelectOutputValue>({
          type: 'select',
          name: 'variable',
          message: 'Select a variable to edit.',
          choices: editChoices,
        });

        if (selectOutput['cancelled'] === true) {
          continue;
        }

        const selectedKey: CliGenerateMustHavesDotenvPromptManageMenuEditSelectedKey = selectOutput['result'].variable;

        if (selectedKey === undefined) {
          continue;
        }

        // Look up current values in both files.
        const currentEnvEntry: CliGenerateMustHavesDotenvPromptManageMenuEditCurrentEnvEntry = envEntries.find((entry) => entry['key'] === selectedKey);
        const currentSampleEntry: CliGenerateMustHavesDotenvPromptManageMenuEditCurrentSampleEntry = envSampleEntries.find((entry) => entry['key'] === selectedKey);

        const envValueOutput: CliGenerateMustHavesDotenvPromptManageMenuEditEnvValueOutput = await CliGenerateMustHavesDotenv.promptWithCancel<CliGenerateMustHavesDotenvPromptManageMenuEditEnvValueOutputKey, CliGenerateMustHavesDotenvPromptManageMenuEditEnvValueOutputValue>({
          type: 'text',
          name: 'value',
          message: `New value for .env (${selectedKey}):`,
          initial: (currentEnvEntry !== undefined) ? currentEnvEntry['value'] : '',
        });

        if (envValueOutput['cancelled'] === true) {
          continue;
        }

        const newEnvValue: CliGenerateMustHavesDotenvPromptManageMenuEditNewEnvValue = envValueOutput['result'].value ?? '';

        const sampleValueOutput: CliGenerateMustHavesDotenvPromptManageMenuEditSampleValueOutput = await CliGenerateMustHavesDotenv.promptWithCancel<CliGenerateMustHavesDotenvPromptManageMenuEditSampleValueOutputKey, CliGenerateMustHavesDotenvPromptManageMenuEditSampleValueOutputValue>({
          type: 'text',
          name: 'defaultValue',
          message: `New default value for .env.sample (${selectedKey}):`,
          initial: (currentSampleEntry !== undefined) ? currentSampleEntry['value'] : '',
        });

        if (sampleValueOutput['cancelled'] === true) {
          continue;
        }

        const newSampleValue: CliGenerateMustHavesDotenvPromptManageMenuEditNewSampleValue = sampleValueOutput['result'].defaultValue ?? '';
        const updatedEnv: CliGenerateMustHavesDotenvPromptManageMenuEditUpdatedEnv = CliGenerateMustHavesDotenv.updateEnvLine(envContent, selectedKey, newEnvValue);
        const updatedSample: CliGenerateMustHavesDotenvPromptManageMenuEditUpdatedSample = CliGenerateMustHavesDotenv.updateEnvLine(envSampleContent, selectedKey, newSampleValue);

        bufferEnv = updatedEnv;
        bufferEnvSample = updatedSample;
        hasPendingChanges = true;

        Logger.customize({
          name: 'CliGenerateMustHavesDotenv.promptManageMenu',
          purpose: 'edit',
        }).info(`Updated "${selectedKey}" in both files.`);

        continue;
      }

      // Delete a variable.
      if (action === 'delete') {
        const deleteChoices: CliGenerateMustHavesDotenvPromptManageMenuDeleteChoices = deletableEntries.map((entry) => ({
          title: entry['key'],
          description: `Current value: "${entry['value']}"`,
          value: entry['key'],
        }));

        const selectOutput: CliGenerateMustHavesDotenvPromptManageMenuDeleteSelectOutput = await CliGenerateMustHavesDotenv.promptWithCancel<CliGenerateMustHavesDotenvPromptManageMenuDeleteSelectOutputKey, CliGenerateMustHavesDotenvPromptManageMenuDeleteSelectOutputValue>({
          type: 'select',
          name: 'variable',
          message: 'Select a variable to delete.',
          choices: deleteChoices,
        });

        if (selectOutput['cancelled'] === true) {
          continue;
        }

        const selectedKey: CliGenerateMustHavesDotenvPromptManageMenuDeleteSelectedKey = selectOutput['result'].variable;

        if (selectedKey === undefined) {
          continue;
        }

        const updatedEnv: CliGenerateMustHavesDotenvPromptManageMenuDeleteUpdatedEnv = CliGenerateMustHavesDotenv.deleteEnvLine(envContent, selectedKey);
        const updatedSample: CliGenerateMustHavesDotenvPromptManageMenuDeleteUpdatedSample = CliGenerateMustHavesDotenv.deleteEnvLine(envSampleContent, selectedKey);

        bufferEnv = updatedEnv;
        bufferEnvSample = updatedSample;
        hasPendingChanges = true;

        Logger.customize({
          name: 'CliGenerateMustHavesDotenv.promptManageMenu',
          purpose: 'delete',
        }).info(`Deleted "${selectedKey}" from both files.`);

        continue;
      }
    }
  }

  /**
   * CLI - Generate - Must Haves - Dotenv - Prompt With Cancel.
   *
   * Wraps the prompts library to detect Ctrl-C cancel events. Returns a discriminated union so
   * callers can distinguish cancelled from answered.
   *
   * @param {CliGenerateMustHavesDotenvPromptWithCancelQuestions} questions - Questions.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesDotenvPromptWithCancelReturns}
   *
   * @since 0.15.0
   */
  private static async promptWithCancel<Keys extends string, Result>(questions: CliGenerateMustHavesDotenvPromptWithCancelQuestions<Keys>): CliGenerateMustHavesDotenvPromptWithCancelReturns<Keys, Result> {
    let cancelled: CliGenerateMustHavesDotenvPromptWithCancelCancelled = false;

    const result: CliGenerateMustHavesDotenvPromptWithCancelResult<Keys> = await prompts<Keys>(questions, {
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
