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
  Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_Content,
  Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_EndsWithNewline,
  Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_Key,
  Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_NewLine,
  Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_Returns,
  Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_Value,
  Cli_Generate_MustHaves_Dotenv_Runner_DeleteEnvLine_Content,
  Cli_Generate_MustHaves_Dotenv_Runner_DeleteEnvLine_Key,
  Cli_Generate_MustHaves_Dotenv_Runner_DeleteEnvLine_Lines,
  Cli_Generate_MustHaves_Dotenv_Runner_DeleteEnvLine_Match,
  Cli_Generate_MustHaves_Dotenv_Runner_DeleteEnvLine_Returns,
  Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_Content,
  Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_Key,
  Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_Match,
  Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_RawValue,
  Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_Returns,
  Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_Value,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Action,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_ActionOutputKey,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_ActionOutputValue,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddDefaultValue,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddDefaultValueOutput,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddDefaultValueOutputKey,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddDefaultValueOutputValue,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddExistingKeys,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddKeyName,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddKeyOutput,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddKeyOutputKey,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddKeyOutputValue,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddTrimmedDefaultValue,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddTrimmedKeyName,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddTrimmedValue,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddUpdatedEnv,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddUpdatedSample,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddValidateValue,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_BufferEnv,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_BufferEnvSample,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Choices,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeletableEntries,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteChoices,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteSelectedKey,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteSelectOutput,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteSelectOutputKey,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteSelectOutputValue,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteUpdatedEnv,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteUpdatedSample,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditChoices,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditCurrentEnvEntry,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditCurrentSampleEntry,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditEnvValueOutput,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditEnvValueOutputKey,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditEnvValueOutputValue,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditNewEnvValue,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditNewSampleValue,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSampleValueOutput,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSampleValueOutputKey,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSampleValueOutputValue,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSelectedKey,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSelectOutput,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSelectOutputKey,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSelectOutputValue,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditUpdatedEnv,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditUpdatedSample,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EnvContent,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EnvEntries,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EnvPath,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EnvSampleContent,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EnvSampleEntries,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EnvSamplePath,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_HasPendingChanges,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_IsDryRun,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_IsReplaceFile,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_MenuOutput,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Options,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_ReservedKeys,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Returns,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_TemplateContent,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_TemplateDirectory,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_TemplateFilePath,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_AddMore,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_AppendSection,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Cancelled,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Content,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_CurrentDirectory,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_DefaultValueOutput,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_DefaultValueOutputKey,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_DefaultValueOutputResult,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_DefaultValueOutputValue,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_EnvLines,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Files,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_IsDryRun,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_IsReplaceFile,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_KeyOutput,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_KeyOutputKey,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_KeyOutputResult,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_KeyOutputValue,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Options,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Returns,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_SampleLines,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_TargetPath,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_TemplateDirectory,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_TemplateFileName,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_TemplatePath,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_TrimmedValue,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_ValidateValue,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptWithCancel_Cancelled,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptWithCancel_Questions,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptWithCancel_Result,
  Cli_Generate_MustHaves_Dotenv_Runner_PromptWithCancel_Returns,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_CurrentDirectory,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_CustomSection,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvPath,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvPathExists,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvSamplePath,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvSamplePathExists,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvVars,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_IsAtProjectRoot,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_IsDryRun,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_IsReplaceFile,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_ManageResult,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeChoices,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeOutput,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeOutputKey,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeOutputResult,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeOutputValue,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_Options,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_ReplaceFileNotice,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_Result,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_Returns,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_SelectedMode,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_TemplateDirectory,
  Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_Content,
  Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_Key,
  Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_Lines,
  Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_Match,
  Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_NewValue,
  Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_Returns,
} from '../../../types/cli/generate/must-haves/dotenv.d.ts';

/**
 * CLI - Generate - Must Haves - Dotenv.
 *
 * Generates and manages paired .env and .env.sample files from bundled templates. Keeps both
 * files in sync when adding or deleting variables.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Generate - Must Haves - Dotenv - Run.
   *
   * Called by the CLI index via executeCommand. Checks for existing .env files and routes to
   * manage or regenerate mode based on user selection.
   *
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Generate_MustHaves_Dotenv_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Generate_MustHaves_Dotenv_Runner_Run_Options): Cli_Generate_MustHaves_Dotenv_Runner_Run_Returns {
    const currentDirectory: Cli_Generate_MustHaves_Dotenv_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Generate_MustHaves_Dotenv_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: Cli_Generate_MustHaves_Dotenv_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Generate_MustHaves_Dotenv_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Generate_MustHaves_Dotenv_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const templateDirectory: Cli_Generate_MustHaves_Dotenv_Runner_Run_TemplateDirectory = resolveTemplatePath(import.meta.url, 'generators/must-haves/dotenv');
    const envPath: Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvPath = join(currentDirectory, '.env');
    const envSamplePath: Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvSamplePath = join(currentDirectory, '.env.sample');

    // Check if files already exist.
    let envPathExists: Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvPathExists = false;
    let envSamplePathExists: Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvSamplePathExists = false;

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
        const modeChoices: Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeChoices = [
          {
            title: 'Manage existing variables',
            value: 'manage',
          },
          {
            title: 'Regenerate from template',
            value: 'regenerate',
          },
        ];

        const modeOutput: Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeOutput = await Runner.promptWithCancel<Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeOutputValue>({
          type: 'select',
          name: 'mode',
          message: 'Existing .env file(s) found. What would you like to do?',
          choices: modeChoices,
          initial: 0,
        });

        if (modeOutput['cancelled'] === true) {
          return 'cancelled';
        }

        const modeOutputResult: Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeOutputResult = modeOutput['result'];
        const selectedMode: Cli_Generate_MustHaves_Dotenv_Runner_Run_SelectedMode = modeOutputResult.mode;

        if (selectedMode === undefined) {
          return 'cancelled';
        }

        if (selectedMode === 'manage') {
          const manageResult: Cli_Generate_MustHaves_Dotenv_Runner_Run_ManageResult = await Runner.promptManageMenu({
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

        // "Regenerate" selected - run regenerate flow.
        const result: Cli_Generate_MustHaves_Dotenv_Runner_Run_Result = await Runner.promptRegenerate({
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

    // No files exist - go straight to regenerate.
    const result: Cli_Generate_MustHaves_Dotenv_Runner_Run_Result = await Runner.promptRegenerate({
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
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Options} options - Options.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Returns}
   *
   * @since 0.15.0
   */
  private static async promptRegenerate(options: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Options): Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Returns {
    const templateDirectory: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_TemplateDirectory = options['templateDirectory'];
    const currentDirectory: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_CurrentDirectory = options['currentDirectory'];
    const isDryRun: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_IsDryRun = options['isDryRun'];
    const isReplaceFile: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_IsReplaceFile = options['isReplaceFile'];

    const files: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Files = [
      '.env',
      '.env.sample',
    ];
    const envVars: Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvVars = [];
    let addMore: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_AddMore = true;
    let cancelled: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Cancelled = false;

    while (addMore === true) {
      const keyOutput: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_KeyOutput = await Runner.promptWithCancel<Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_KeyOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_KeyOutputValue>({
        type: 'text',
        name: 'key',
        message: 'Variable name (leave empty to finish):',
        validate: (value: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_ValidateValue) => {
          if (typeof value !== 'string' || value.trim() === '') {
            return true;
          }

          const trimmedValue: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_TrimmedValue = value.trim();

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

      const keyOutputResult: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_KeyOutputResult = keyOutput['result'];

      if (keyOutputResult.key === undefined || keyOutputResult.key.trim() === '') {
        addMore = false;

        continue;
      }

      // Prompt for the default value.
      const defaultValueOutput: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_DefaultValueOutput = await Runner.promptWithCancel<Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_DefaultValueOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_DefaultValueOutputValue>({
        type: 'text',
        name: 'defaultValue',
        message: 'Default value (leave empty for none):',
        initial: '',
      });

      if (defaultValueOutput['cancelled'] === true) {
        cancelled = true;

        break;
      }

      const defaultValueOutputResult: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_DefaultValueOutputResult = defaultValueOutput['result'];

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
    let customSection: Cli_Generate_MustHaves_Dotenv_Runner_Run_CustomSection = '';
    let customSectionSample: Cli_Generate_MustHaves_Dotenv_Runner_Run_CustomSection = '';

    if (envVars.length > 0) {
      const envLines: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_EnvLines = [];

      for (const envVar of envVars) {
        envLines.push(`${envVar['key']}=""`);
      }

      customSection = envLines.join('\n');

      const sampleLines: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_SampleLines = [];

      for (const envVar of envVars) {
        sampleLines.push(`${envVar['key']}="${envVar['defaultValue']}"`);
      }

      customSectionSample = sampleLines.join('\n');
    }

    for (const fileName of files) {
      const templateFileName: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_TemplateFileName = fileName.replace(LIB_REGEX_PATTERN_LEADING_DOT, '');
      const templatePath: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_TemplatePath = join(templateDirectory, templateFileName);
      const targetPath: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_TargetPath = join(currentDirectory, fileName);

      let content: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Content = undefined;

      try {
        content = await fs.readFile(templatePath, 'utf-8');
      } catch {
        Logger.customize({
          name: 'Runner.promptRegenerate',
          purpose: 'read',
        }).error(`Failed to read template "${templatePath}". Skipping ...`);

        continue;
      }

      // Append custom variables under the project variables section.
      const appendSection: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_AppendSection = (fileName === '.env.sample') ? customSectionSample : customSection;

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
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_Content} content - Content.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_Returns}
   *
   * @since 0.15.0
   */
  private static parseEnvFile(content: Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_Content): Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_Returns {
    const entries: Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_Returns = [];

    for (const line of content.split('\n')) {
      const match: Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_Match = line.match(LIB_REGEX_PATTERN_ENV_VAR_KEY);

      if (match !== null && match[1] !== undefined) {
        const key: Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_Key = match[1];
        const rawValue: Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_RawValue = line.slice(line.indexOf('=') + 1);
        const value: Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_Value = rawValue.replace(LIB_REGEX_PATTERN_DOUBLE_QUOTED_STRING_CAPTURE, '$1');

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
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_Content}  content  - Content.
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_Key}      key      - Key.
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_NewValue} newValue - New value.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_Returns}
   *
   * @since 0.15.0
   */
  private static updateEnvLine(content: Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_Content, key: Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_Key, newValue: Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_NewValue): Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_Returns {
    const lines: Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_Lines = content.split('\n');

    return lines.map((line) => {
      const match: Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_Match = line.match(LIB_REGEX_PATTERN_ENV_VAR_KEY);

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
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_DeleteEnvLine_Content} content - Content.
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_DeleteEnvLine_Key}     key     - Key.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Dotenv_Runner_DeleteEnvLine_Returns}
   *
   * @since 0.15.0
   */
  private static deleteEnvLine(content: Cli_Generate_MustHaves_Dotenv_Runner_DeleteEnvLine_Content, key: Cli_Generate_MustHaves_Dotenv_Runner_DeleteEnvLine_Key): Cli_Generate_MustHaves_Dotenv_Runner_DeleteEnvLine_Returns {
    const lines: Cli_Generate_MustHaves_Dotenv_Runner_DeleteEnvLine_Lines = content.split('\n');

    return lines.filter((line) => {
      const match: Cli_Generate_MustHaves_Dotenv_Runner_DeleteEnvLine_Match = line.match(LIB_REGEX_PATTERN_ENV_VAR_KEY);

      return !(match !== null && match[1] === key);
    }).join('\n');
  }

  /**
   * CLI - Generate - Must Haves - Dotenv - Add Env Line.
   *
   * Appends a new KEY="value" line to the end of the file content. Ensures a trailing newline
   * exists before inserting the new entry.
   *
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_Content} content - Content.
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_Key}     key     - Key.
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_Value}   value   - Value.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_Returns}
   *
   * @since 0.15.0
   */
  private static addEnvLine(content: Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_Content, key: Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_Key, value: Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_Value): Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_Returns {
    const endsWithNewline: Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_EndsWithNewline = content.endsWith('\n');

    const newLine: Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_NewLine = `${key}="${value}"`;

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
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Options} options - Options.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Returns}
   *
   * @since 0.15.0
   */
  private static async promptManageMenu(options: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Options): Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Returns {
    const templateDirectory: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_TemplateDirectory = options['templateDirectory'];
    const envPath: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EnvPath = options['envPath'];
    const envSamplePath: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EnvSamplePath = options['envSamplePath'];
    const isDryRun: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_IsDryRun = options['isDryRun'];
    const isReplaceFile: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_IsReplaceFile = options['isReplaceFile'];

    const templateFilePath: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_TemplateFilePath = join(templateDirectory, 'env');
    const templateContent: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_TemplateContent = await fs.readFile(templateFilePath, 'utf-8');
    const reservedKeys: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_ReservedKeys = new Set(Runner.parseEnvFile(templateContent).map((entry) => entry['key']));

    // Initialize in-memory buffers from existing files or templates.
    let bufferEnv: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_BufferEnv = '';
    let bufferEnvSample: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_BufferEnvSample = '';

    try {
      bufferEnv = await fs.readFile(envPath, 'utf-8');
    } catch {
      // File does not exist - use template as initial buffer.
      try {
        bufferEnv = await fs.readFile(join(templateDirectory, 'env'), 'utf-8');
      } catch {
        // Template also missing.
      }
    }

    try {
      bufferEnvSample = await fs.readFile(envSamplePath, 'utf-8');
    } catch {
      // File does not exist - use template as initial buffer.
      try {
        bufferEnvSample = await fs.readFile(join(templateDirectory, 'env.sample'), 'utf-8');
      } catch {
        // Template also missing.
      }
    }

    let hasPendingChanges: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_HasPendingChanges = false;

    while (true) {
      // Use in-memory buffers instead of reading from disk.
      const envContent: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EnvContent = bufferEnv;
      const envSampleContent: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EnvSampleContent = bufferEnvSample;

      const envEntries: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EnvEntries = Runner.parseEnvFile(envContent);
      const envSampleEntries: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EnvSampleEntries = Runner.parseEnvFile(envSampleContent);
      const deletableEntries: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeletableEntries = envEntries.filter(
        (entry) => reservedKeys.has(entry['key']) !== true,
      );

      // Build menu choices.
      const choices: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Choices = [{
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

      const menuOutput: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_MenuOutput = await Runner.promptWithCancel<Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_ActionOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_ActionOutputValue>({
        type: 'select',
        name: 'action',
        message: 'Select an action.',
        choices,
      });

      if (menuOutput['cancelled'] === true) {
        return 'back';
      }

      const action: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Action = menuOutput['result'].action;

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
        const existingKeys: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddExistingKeys = new Set(envEntries.map((entry) => entry['key']));

        const keyOutput: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddKeyOutput = await Runner.promptWithCancel<Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddKeyOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddKeyOutputValue>({
          type: 'text',
          name: 'key',
          message: 'Variable name (e.g. API_KEY):',
          validate: (value: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddValidateValue) => {
            if (typeof value !== 'string' || value.trim() === '') {
              return 'Enter a variable name.';
            }

            const trimmedValue: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddTrimmedValue = value.trim();

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

        const keyName: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddKeyName = keyOutput['result'].key;

        if (keyName === undefined) {
          continue;
        }

        const defaultValueOutput: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddDefaultValueOutput = await Runner.promptWithCancel<Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddDefaultValueOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddDefaultValueOutputValue>({
          type: 'text',
          name: 'defaultValue',
          message: 'Default value for .env.sample (leave empty for none):',
          initial: '',
        });

        if (defaultValueOutput['cancelled'] === true) {
          continue;
        }

        const defaultValue: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddDefaultValue = defaultValueOutput['result'].defaultValue ?? '';
        const trimmedKeyName: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddTrimmedKeyName = keyName.trim();
        const trimmedDefaultValue: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddTrimmedDefaultValue = defaultValue.trim();
        const updatedEnv: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddUpdatedEnv = Runner.addEnvLine(envContent, trimmedKeyName, '');
        const updatedSample: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddUpdatedSample = Runner.addEnvLine(envSampleContent, trimmedKeyName, trimmedDefaultValue);

        bufferEnv = updatedEnv;
        bufferEnvSample = updatedSample;
        hasPendingChanges = true;

        Logger.customize({
          name: 'Runner.promptManageMenu',
          purpose: 'add',
        }).info(`Added "${keyName.trim()}" to both files.`);

        continue;
      }

      // Edit a variable.
      if (action === 'edit') {
        const editChoices: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditChoices = envEntries.map((entry) => ({
          title: entry['key'],
          description: `Current value: "${entry['value']}"`,
          value: entry['key'],
        }));

        const selectOutput: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSelectOutput = await Runner.promptWithCancel<Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSelectOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSelectOutputValue>({
          type: 'select',
          name: 'variable',
          message: 'Select a variable to edit.',
          choices: editChoices,
        });

        if (selectOutput['cancelled'] === true) {
          continue;
        }

        const selectedKey: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSelectedKey = selectOutput['result'].variable;

        if (selectedKey === undefined) {
          continue;
        }

        // Look up current values in both files.
        const currentEnvEntry: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditCurrentEnvEntry = envEntries.find((entry) => entry['key'] === selectedKey);
        const currentSampleEntry: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditCurrentSampleEntry = envSampleEntries.find((entry) => entry['key'] === selectedKey);

        const envValueOutput: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditEnvValueOutput = await Runner.promptWithCancel<Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditEnvValueOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditEnvValueOutputValue>({
          type: 'text',
          name: 'value',
          message: `New value for .env (${selectedKey}):`,
          initial: (currentEnvEntry !== undefined) ? currentEnvEntry['value'] : '',
        });

        if (envValueOutput['cancelled'] === true) {
          continue;
        }

        const newEnvValue: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditNewEnvValue = envValueOutput['result'].value ?? '';

        const sampleValueOutput: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSampleValueOutput = await Runner.promptWithCancel<Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSampleValueOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSampleValueOutputValue>({
          type: 'text',
          name: 'defaultValue',
          message: `New default value for .env.sample (${selectedKey}):`,
          initial: (currentSampleEntry !== undefined) ? currentSampleEntry['value'] : '',
        });

        if (sampleValueOutput['cancelled'] === true) {
          continue;
        }

        const newSampleValue: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditNewSampleValue = sampleValueOutput['result'].defaultValue ?? '';
        const updatedEnv: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditUpdatedEnv = Runner.updateEnvLine(envContent, selectedKey, newEnvValue);
        const updatedSample: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditUpdatedSample = Runner.updateEnvLine(envSampleContent, selectedKey, newSampleValue);

        bufferEnv = updatedEnv;
        bufferEnvSample = updatedSample;
        hasPendingChanges = true;

        Logger.customize({
          name: 'Runner.promptManageMenu',
          purpose: 'edit',
        }).info(`Updated "${selectedKey}" in both files.`);

        continue;
      }

      // Delete a variable.
      if (action === 'delete') {
        const deleteChoices: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteChoices = deletableEntries.map((entry) => ({
          title: entry['key'],
          description: `Current value: "${entry['value']}"`,
          value: entry['key'],
        }));

        const selectOutput: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteSelectOutput = await Runner.promptWithCancel<Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteSelectOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteSelectOutputValue>({
          type: 'select',
          name: 'variable',
          message: 'Select a variable to delete.',
          choices: deleteChoices,
        });

        if (selectOutput['cancelled'] === true) {
          continue;
        }

        const selectedKey: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteSelectedKey = selectOutput['result'].variable;

        if (selectedKey === undefined) {
          continue;
        }

        const updatedEnv: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteUpdatedEnv = Runner.deleteEnvLine(envContent, selectedKey);
        const updatedSample: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteUpdatedSample = Runner.deleteEnvLine(envSampleContent, selectedKey);

        bufferEnv = updatedEnv;
        bufferEnvSample = updatedSample;
        hasPendingChanges = true;

        Logger.customize({
          name: 'Runner.promptManageMenu',
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
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_PromptWithCancel_Questions} questions - Questions.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Dotenv_Runner_PromptWithCancel_Returns}
   *
   * @since 0.15.0
   */
  private static async promptWithCancel<Keys extends string, Result>(questions: Cli_Generate_MustHaves_Dotenv_Runner_PromptWithCancel_Questions<Keys>): Cli_Generate_MustHaves_Dotenv_Runner_PromptWithCancel_Returns<Keys, Result> {
    let cancelled: Cli_Generate_MustHaves_Dotenv_Runner_PromptWithCancel_Cancelled = false;

    const result: Cli_Generate_MustHaves_Dotenv_Runner_PromptWithCancel_Result<Keys> = await prompts<Keys>(questions, {
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
